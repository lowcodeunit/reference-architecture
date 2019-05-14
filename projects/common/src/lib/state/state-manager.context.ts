import * as signalR from '@aspnet/signalr';
import { ObservableContextService } from '../api/observable-context/observable-context.service';
import { StateAction } from './state-action.model';
import { Injector } from '@angular/core';
import { LCUServiceSettings } from '../api/lcu-service-settings';
import { RealTimeService } from '../api/real-time/real-time.service';
import { Subscription } from 'rxjs/internal/Subscription';

//  TODO:  Need to manage reconnection to hub scenarios here

export abstract class StateManagerContext<T> extends ObservableContextService<T> {
  //  Fields
  protected reconnectionMessage: Subscription;
  
  // protected rt: RealTimeService;
  protected get rt(): RealTimeService {
    return window['lcu:state:rt'];
  }

  protected set rt(value: RealTimeService) {
    window['lcu:state:rt'] = value;
  }

  //  Constructors
  constructor(protected injector: Injector) {
    super();

    if (!this.rt) {
      this.rt = injector.get(RealTimeService);
    }

    this.setup();

    this.reconnectionMessage = this.rt.ReconnectionMessage.subscribe((data: string) => {
      console.log('reconnect message', data);
    });
  }

  //  API Methods
  public Execute(action: StateAction) {
    return this.executeAction(action);
  }

  public async Setup() {
    this.rt.Started.subscribe(async () => {
      await this.setupReceiveState();

      await this.connectToState();

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
  protected async connectToState() {
    const stateKey = await this.loadStateKey();

    const stateName = await this.loadStateName();

    const env = await this.loadEnvironment();

    return this.rt.Invoke('ConnectToState', { Key: stateKey, State: stateName, Environment: env }).subscribe();
  }

  protected defaultValue(): T {
    return <T>{};
  }

  protected async executeAction(action: StateAction) {
    const stateKey = await this.loadStateKey();

    const stateName = await this.loadStateName();

    return this.rt.Invoke('ExecuteAction', { Type: action.Type, Arguments: action.Arguments, Key: stateKey, State: stateName }).subscribe();
  }

  protected async loadEnvironment() {
    return this.rt.Settings.StateConfig ? this.rt.Settings.StateConfig.Environment : null;
  }

  protected abstract async loadStateKey();

  protected abstract async loadStateName();

  protected setup() {
    this.Setup().then();
  }

  protected async setupReceiveState() {
    const stateKey = await this.loadStateKey();

    const stateName = await this.loadStateName();

    this.rt.RegisterHandler(`ReceiveState${stateName}${stateKey}`).subscribe(req => {
      this.subject.next(req.State);
    });
  }
}
