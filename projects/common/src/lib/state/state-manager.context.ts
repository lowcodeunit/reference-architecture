import * as signalR from '@aspnet/signalr';
import { ObservableContextService } from '../api/observable-context/observable-context.service';
import { StateAction } from './state-action.model';
import { Injector } from '@angular/core';
import { LCUServiceSettings } from '../api/lcu-service-settings';
import { RealTimeService } from '../api/real-time/real-time.service';

//  TODO:  Need to manage reconnection to hub scenarios here

export abstract class StateManagerContext<T> extends ObservableContextService<T> {
  //  Fields
  protected rt: RealTimeService;

  //  Constructors
  constructor(protected injector: Injector) {
    super();

    this.rt = injector.get(RealTimeService);

    this.setup();
  }

  //  API Methods
  public Execute(action: StateAction) {
    return this.executeAction(action);
  }

  public async Setup() {
    this.rt.Started.subscribe(async () => {
      this.setupReceiveState();

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

    return this.rt.Invoke('ConnectToState', { Key: stateKey, State: stateName });
  }

  protected defaultValue(): T {
    return <T>{};
  }

  protected async executeAction(action: StateAction) {
    const stateKey = await this.loadStateKey();

    const stateName = await this.loadStateName();

    return this.rt.Invoke('ExecuteAction', { Type: action.Type, Arguments: action.Arguments, Key: stateKey, State: stateName });
  }

  protected abstract async loadStateKey();

  protected abstract async loadStateName();

  protected setup() {
    this.Setup().then();
  }

  protected setupReceiveState() {
    this.rt.RegisterHandler('ReceiveState').then(req => {
      this.subject.next(req.State);
    });
  }
}
