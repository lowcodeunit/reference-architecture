import * as signalR from '@aspnet/signalr';
import { ObservableContextService } from '../api/observable-context/observable-context.service';
import { StateAction } from './state-action.model';
import { Injector, EventEmitter, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { RealTimeConnection } from './../api/real-time/real-time.connection';
import { LCUServiceSettings } from '@lcu/common';

//  TODO:  Need to manage reconnection to hub scenarios here

export abstract class StateContext<T> extends ObservableContextService<T> {
  //  Fields
  protected rt: RealTimeConnection;

  protected startSub: Subscription;

  //  Properties
  public ReconnectionAttempt: Subject<boolean>;

  public Settings: LCUServiceSettings;

  //  Constructors
  constructor(protected injector: Injector) {
    super();

    this.ReconnectionAttempt = new Subject<boolean>();

    this.Settings = injector.get(LCUServiceSettings);

    const rtUrl = this.buildHubUrl('');

    this.rt = new RealTimeConnection(rtUrl);

    this.setup();

    this.rt.ReconnectionAttempt.subscribe((val: boolean) => {
      this.ReconnectionAttempt.next(val);
    });
  }

  //  API Methods
  public Execute(action: StateAction) {
    return this.executeAction(action);
  }

  public async Start(shouldUpdate: boolean) {
    if (!this.startSub) {
      this.startSub = this.rt.Started.subscribe(async () => {
        await this.setupReceiveState();

        await this.connectToState(shouldUpdate);

        this.$Refresh();
      });
    }
  }

  public $Refresh(args: any = {}) {
    this.Execute({
      Arguments: args,
      Type: '$refresh'
    });
  }

  //  Helpers
  protected buildHubUrl(urlRoot: string) {
    const url = this.loadHubUrl(urlRoot);

    return url;
  }

  protected async connectToState(shouldUpdate: boolean) {
    const stateKey = await this.loadStateKey();

    const stateName = await this.loadStateName();

    const env = await this.loadEnvironment();

    const unMock = await this.loadUsernameMock();

    return this.rt
      .Invoke('ConnectToState', {
        ShouldSend: shouldUpdate,
        Key: stateKey,
        State: stateName,
        Environment: env,
        UsernameMock: unMock
      })
      .subscribe();
  }

  protected defaultValue(): T {
    return <T>{};
  }

  protected async executeAction(action: StateAction) {
    const stateKey = await this.loadStateKey();

    const stateName = await this.loadStateName();

    return this.rt
      .Invoke('ExecuteAction', { ...action, Key: stateKey, State: stateName })
      .subscribe();
  }

  protected async loadEnvironment() {
    return this.Settings.StateConfig
      ? this.Settings.StateConfig.Environment
      : null;
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
      : '/state';
  }
  protected async loadUsernameMock() {
    return this.Settings.StateConfig
      ? this.Settings.StateConfig.UsernameMock
      : null;
  }

  protected setup() {
    this.Start(false).then();
  }

  protected async setupReceiveState() {
    const stateKey = await this.loadStateKey();

    const stateName = await this.loadStateName();

    this.rt
      .RegisterHandler(`ReceiveState${stateName}${stateKey}`)
      .subscribe(req => {
        this.subject.next(req.State);
      });
  }
}