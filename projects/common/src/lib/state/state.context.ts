import * as signalR from '@aspnet/signalr';
import { ObservableContextService } from '../api/observable-context/observable-context.service';
import { StateAction } from './state-action.model';
import { Injector, EventEmitter, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { RealTimeConnection } from './../api/real-time/real-time.connection';
import { LCUServiceSettings } from '../api/lcu-service-settings';
import { HttpClient } from '@angular/common/http';

//  TODO:  Need to manage reconnection to hub scenarios here

export abstract class StateContext<T> extends ObservableContextService<T> {
  //  Fields
  protected groupName: string;

  protected http: HttpClient;

  protected rt: RealTimeConnection;

  protected startSub: Subscription;

  //  Properties
  public ReconnectionAttempt: Subject<boolean>;

  public Settings: LCUServiceSettings;

  //  Constructors
  constructor(protected injector: Injector) {
    super();

    this.http = injector.get(HttpClient);

    this.ReconnectionAttempt = new Subject<boolean>();

    this.Settings = injector.get(LCUServiceSettings);

    const rtUrl = this.buildHubUrl('');

    const actionUrl = this.loadActionUrl('');

    this.rt = new RealTimeConnection(this.http, rtUrl, actionUrl);

    this.rt.ReconnectionAttempt.subscribe((val: boolean) => {
      this.ReconnectionAttempt.next(val);
    });

    this.setup();
  }

  //  API Methods
  public Execute(action: StateAction) {
    return this.executeAction(action);
  }

  public $Refresh(args: any = {}) {
    this.Execute({
      Arguments: args,
      Type: 'Refresh'
    });
  }

  public async Start(shouldUpdate: boolean) {
    if (!this.startSub) {
      this.startSub = this.rt.Started.subscribe(async () => {
        this.setupReceiveState();

        await this.connectToState(shouldUpdate);

        this.$Refresh();
      });

      this.rt.Start();
    }
  }

  //  Helpers
  protected buildActionUrl(urlRoot: string) {
    const url = this.loadActionUrl(urlRoot);

    return url;
  }

  protected buildHubUrl(urlRoot: string) {
    const url = this.loadHubUrl(urlRoot);

    return url;
  }

  protected async connectToState(shouldUpdate: boolean): Promise<string> {
    const stateKey = this.loadStateKey();

    const stateName = this.loadStateName();

    const env = this.loadEnvironment();

    return new Promise<string>((resolve, reject) => {
      this.rt
        .InvokeAction('ConnectToState', this.loadHeaders(), {
          ShouldSend: shouldUpdate,
          Key: stateKey,
          State: stateName,
          Environment: env
        })
        .subscribe({
          next: (req: any) => {
            if (req.status && req.status.code === 0) {
              resolve(req.groupName);
            } else {
              reject(
                req.status
                  ? req.status.message
                  : 'Unknown issue connecting to state.'
              );
            }
          },
          error: err => reject(err)
          // complete: () => console.log('Observer got a complete notification'),
        });
    });
  }

  protected defaultValue(): T {
    return <T>{};
  }

  protected async executeAction(action: StateAction) {
    const stateKey = this.loadStateKey();

    const stateName = this.loadStateName();

    return this.rt
      .InvokeAction(action.Type, this.loadHeaders(), {
        ...action,
        Key: stateKey,
        State: stateName
      })
      .subscribe();
  }

  protected loadActionPath() {
    const actionRoot = this.loadStateActionRoot();

    return `${actionRoot}`; // ?lcu-app-id=${this.Settings.AppConfig.ID}&lcu-app-ent-api-key=${this.Settings.AppConfig.EnterpriseAPIKey}`;
  }

  protected loadActionUrl(urlRoot: string) {
    const apiRoot = this.Settings ? this.Settings.APIRoot || '' : '';

    const actionPath = this.loadActionPath();

    return `${apiRoot}${urlRoot || ''}${actionPath}`;
  }

  protected loadEnvironment() {
    let env = this.Settings.StateConfig
      ? this.Settings.StateConfig.Environment
      : null;

    if (!env) {
      env = '';
    }

    return env;
  }

  protected loadHeaders(): { [header: string]: string | string[] } {
    return {
      'lcu-ent-api-key': this.Settings.AppConfig.EnterpriseAPIKey,
      'lcu-hub-name': this.loadStateName(),
      'lcu-state-key': this.loadStateKey(),
      'lcu-environment': this.loadEnvironment(),
      'lcu-username-mock': this.loadUsernameMock()
    };
  }

  protected loadHubPath() {
    const stateRoot = this.loadStateRoot();

    const env = this.loadEnvironment();

    const unmock = this.loadUsernameMock();

    return `${stateRoot}?lcu-app-id=${this.Settings.AppConfig.ID}&lcu-app-ent-api-key=${this.Settings.AppConfig.EnterpriseAPIKey}&lcu-environment=${env}&lcu-username-mock=${unmock}`;
  }

  protected loadHubUrl(urlRoot: string) {
    const apiRoot = this.Settings ? this.Settings.APIRoot || '' : '';

    const hubPath = this.loadHubPath();

    return `${apiRoot}${urlRoot || ''}${hubPath}`;
  }

  protected abstract loadStateKey(): string;

  protected abstract loadStateName(): string;

  protected loadStateRoot() {
    const stateRoot =
      this.Settings.StateConfig && this.Settings.StateConfig.Root !== undefined
        ? this.Settings.StateConfig.Root
        : '';

    return `${stateRoot}/${this.loadStateName()}`;
  }

  protected loadStateActionRoot() {
    const stateActinRoot =
      this.Settings.StateConfig &&
      this.Settings.StateConfig.ActionRoot !== undefined
        ? this.Settings.StateConfig.ActionRoot
        : '';

    return `${stateActinRoot}/${this.loadStateName()}`;
  }

  protected loadUsernameMock() {
    return this.Settings.StateConfig ? this.Settings.StateConfig.UsernameMock : '';
  }

  protected setup() {
    this.Start(false).then();
  }

  protected setupReceiveState() {
    this.rt.RegisterHandler(`ReceiveState`).subscribe(req => {
      this.subject.next(req);
    });
  }
}
