import * as signalR from '@aspnet/signalr';
import { ObservableContextService } from '../api/observable-context/observable-context.service';
import { StateAction } from './state-action.model';
import { Injector, EventEmitter, Output } from '@angular/core';
import { RealTimeService } from '../api/real-time/real-time.service';
import { Subject } from 'rxjs';

//  TODO:  Need to manage reconnection to hub scenarios here

export abstract class StateManagerContext<T> extends ObservableContextService<T> {
  //  Fields

  protected rt: RealTimeService;
  // protected get rt(): RealTimeService {
  //   return window['lcu:state:rt'];
  // }

  // protected set rt(value: RealTimeService) {
  //   window['lcu:state:rt'] = value;
  // }

  public ReconnectionAttempt: Subject<boolean>;

  //  Constructors
  constructor(protected injector: Injector) {
    super();

    this.ReconnectionAttempt = new Subject<boolean>();

    if (!this.rt) {
      this.rt = injector.get(RealTimeService);
    }

    this.setup();

    this.rt.ReconnectionAttempt.subscribe((val: boolean) => {
      this.ReconnectionAttempt.next(val);
    });
  }

  //  API Methods
  public Execute(action: StateAction) {
    return this.executeAction(action);
  }

  public async Setup(shouldUpdate: boolean) {
    this.rt.Started.subscribe(async () => {
      await this.setupReceiveState();

      await this.connectToState(shouldUpdate);

      this.$Refresh();
    });
  }

  public $Refresh(args: any = {}) {
    this.Execute({
      Arguments: args,
      Type: '$refresh'
    });
  }

  //  Helpers
  protected async connectToState(shouldUpdate: boolean) {
    const stateKey = await this.loadStateKey();

    const stateName = await this.loadStateName();

    const env = await this.loadEnvironment();

    const unMock = await this.loadUsernameMock();

    return this.rt.Invoke('ConnectToState', {
      ShouldSend: shouldUpdate,
      Key: stateKey,
      State: stateName,
      Environment: env,
      UsernameMock: unMock
    }).subscribe();
  }

  protected defaultValue(): T {
    return <T>{};
  }

  protected async executeAction(action: StateAction) {
    const stateKey = await this.loadStateKey();

    const stateName = await this.loadStateName();

    return this.rt.Invoke('ExecuteAction', { ...action, Key: stateKey, State: stateName }).subscribe();
  }

  protected async loadEnvironment() {
    return this.rt.Settings.StateConfig ? this.rt.Settings.StateConfig.Environment : null;
  }

  protected abstract async loadStateKey();

  protected abstract async loadStateName();

  protected async loadUsernameMock() {
    return this.rt.Settings.StateConfig ? this.rt.Settings.StateConfig.UsernameMock : null;
  }

  protected setup() {
    this.Setup(false).then();
  }

  protected async setupReceiveState() {
    const stateKey = await this.loadStateKey();

    const stateName = await this.loadStateName();

    this.rt.RegisterHandler(`ReceiveState${stateName}${stateKey}`).subscribe(req => {
      this.subject.next(req.State);
    });
  }
}
