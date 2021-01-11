import * as signalR from '@aspnet/signalr';
import { ObservableContextService } from '../api/observable-context/observable-context.service';
import { StateAction } from './state-action.model';
import { Injector, EventEmitter, Output } from '@angular/core';
import {
  Subject,
  Subscription,
  forkJoin,
  BehaviorSubject,
  Observable,
} from 'rxjs';
import { RealTimeConnection } from './../api/real-time/real-time.connection';
import { LCUServiceSettings } from '../api/lcu-service-settings';
import { HttpClient } from '@angular/common/http';
import { Status } from '../status';

//  TODO:  Need to manage reconnection to hub scenarios here

export abstract class StateContext<T> extends ObservableContextService<T> {
  //  Fields
  protected connectedToState: BehaviorSubject<Status>;

  protected groupName: string;

  protected http: HttpClient;

  protected rt: RealTimeConnection;

  protected startSub: Subscription;

  //  Properties
  public ConnectedToState: Observable<Status>;

  public ReconnectionAttempt: Subject<boolean>;

  public Settings: LCUServiceSettings;

  //  Constructors
  constructor(protected injector: Injector) {
    super();

    this.connectedToState = new BehaviorSubject<Status>(<Status>{
      Code: -1,
      Message: 'Initialized',
    });

    this.ConnectedToState = this.connectedToState.asObservable();

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
      Type: 'Refresh',
    });
  }

  public async Start(shouldUpdate: boolean) {
    if (!this.startSub) {
      this.startSub = this.rt.Started.subscribe(async () => {
        const groupName = await this.connectToState(shouldUpdate);

        this.setupReceiveState(groupName);

        this.connectedToState.next(<Status>{ Code: 0, Message: 'Success' });

        this.callRefresh();
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

  protected callRefresh() {
    this.$Refresh();
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
          Environment: env,
        })
        .subscribe({
          next: (req: any) => {
            if ((req.status && req.status.code === 0) || (req.Status && req.Status.Code === 0)) {
              resolve(req.groupName);
            } else {
              reject(
                req.status
                  ? req.status.message
                  : 'Unknown issue connecting to state.'
              );
            }
          },
          error: (err) => reject(err),
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
        State: stateName,
      });
  }

  protected loadActionPath() {
    const actionRoot = this.loadStateActionRoot();

    return `${actionRoot}`; // ?lcu-app-id=${this.Settings.AppConfig.ID}&lcu-app-ent-lookup=${this.Settings.AppConfig.EnterpriseLookup}`;
  }

  protected loadActionUrl(urlRoot: string) {
    const apiRoot = this.Settings ? this.Settings.APIRoot || '' : '';

    const actionPath = this.loadActionPath();

    return `${apiRoot}${urlRoot || ''}${actionPath}`;
  }

  protected loadEnvironment() {
    let env = this.Settings.State
      ? this.Settings.State.Environment
      : null;

    if (!env) {
      env = '';
    }

    return env;
  }

  protected loadHeaders(): { [header: string]: string | string[] } {
    return {
      'lcu-ent-lookup': this.Settings.Application.EnterpriseLookup,
      'lcu-hub-name': this.loadStateName(),
      'lcu-state-key': this.loadStateKey(),
      'lcu-environment': this.loadEnvironment(),
      'lcu-username-mock': this.loadUsernameMock(),
    };
  }

  protected loadHubPath() {
    const stateRoot = this.loadStateRoot();

    const env = this.loadEnvironment();

    const unmock = this.loadUsernameMock();

    return `${stateRoot}?lcu-app-ent-lookup=${this.Settings.Application.EnterpriseLookup}&lcu-environment=${env}&lcu-username-mock=${unmock}`;
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
      this.Settings.State && this.Settings.State.Root !== undefined
        ? this.Settings.State.Root
        : '';

    return `${stateRoot}/${this.loadStateName()}`;
  }

  protected loadStateActionRoot() {
    const stateActinRoot =
      this.Settings.State &&
      this.Settings.State.ActionRoot !== undefined
        ? this.Settings.State.ActionRoot
        : '';

    return `${stateActinRoot}/${this.loadStateName()}`;
  }

  protected loadUsernameMock() {
    return this.Settings.State && this.Settings.State.UsernameMock
      ? this.Settings.State.UsernameMock
      : '';
  }

  protected setup() {
    this.Start(false).then();
  }

  protected setupReceiveState(groupName: string) {
    this.rt.RegisterHandler(`ReceiveState=>${groupName}`).subscribe((req) => {
      console.log(`Handled state from ${groupName}`);

      this.subject.next(req);
    });
  }
}
