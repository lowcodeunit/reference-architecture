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

  public async Start(shouldUpdate: boolean) {
    if (!this.startSub) {
      this.startSub = this.rt.Started.subscribe(async () => {
        const groupName = await this.connectToState(shouldUpdate);

        this.setupReceiveState(groupName);

        this.$Refresh();
      });

      this.rt.Start();
    }
  }

  public $Refresh(args: any = {}) {
    this.Execute({
      Arguments: args,
      Type: '$refresh'
    });
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
    const stateKey = await this.loadStateKey();

    const stateName = await this.loadStateName();

    const env = await this.loadEnvironment();

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
            if (req.Status && req.Status.Code === 0) {
              resolve(req.GroupName);
            } else {
              reject(
                req.Status
                  ? req.Status.Message
                  : 'Unknonw issue connecting to state.'
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
    const stateKey = await this.loadStateKey();

    const stateName = await this.loadStateName();

    return this.rt
      .InvokeAction('ExecuteAction', this.loadHeaders(), {
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

  protected async loadEnvironment() {
    return this.Settings.StateConfig
      ? this.Settings.StateConfig.Environment
      : null;
  }

  protected loadHeaders() {
    return {
      'lcu-ent-api-key': this.Settings.AppConfig.EnterpriseAPIKey,
      'lcu-hub-name': this.loadStateName(),
      'lcu-state-key': this.loadStateKey(),
      'lcu-username-mock': this.loadUsernameMock()
    };
  }

  protected loadHubPath() {
    const stateRoot = this.loadStateRoot();

    return `${stateRoot}?lcu-app-id=${this.Settings.AppConfig.ID}&lcu-app-ent-api-key=${this.Settings.AppConfig.EnterpriseAPIKey}`;
  }

  protected loadHubUrl(urlRoot: string) {
    const apiRoot = this.Settings ? this.Settings.APIRoot || '' : '';

    const hubPath = this.loadHubPath();

    return `${apiRoot}${urlRoot || ''}${hubPath}`;
  }

  protected abstract async loadStateKey();

  protected abstract async loadStateName();

  protected loadStateRoot() {
    return this.Settings.StateConfig &&
      this.Settings.StateConfig.Root !== undefined
      ? this.Settings.StateConfig.Root
      : `/${this.loadStateName()}`;
  }

  protected loadStateActionRoot() {
    return this.Settings.StateConfig &&
      this.Settings.StateConfig.ActionRoot !== undefined
      ? this.Settings.StateConfig.ActionRoot
      : `/${this.loadStateName()}`;
  }

  protected async loadUsernameMock() {
    return this.Settings.StateConfig
      ? this.Settings.StateConfig.UsernameMock
      : null;
  }

  protected setup() {
    this.Start(false).then();
  }

  protected setupReceiveState(groupName: string) {
    this.rt.RegisterHandler(`ReceiveState=>${groupName}`).subscribe(req => {
      this.subject.next(req.State);
    });
  }
}
