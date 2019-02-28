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

    this.Setup().then();
  }

  //  API Methods
  public Execute(action: StateAction) {
    this.executeAction(action);
  }

  public async Setup() {
    this.rt.Start().then(async () => {
      this.$Refresh();

      this.rt.RegisterHandler('ReceiveState').then(req => {
        this.subject.next(req.State);
      });

      await this.connectToState();
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

  protected executeAction(action: StateAction) {
    return this.rt.Invoke('ExecuteAction', { Type: action.Type, Arguments: action.Arguments });
  }

  protected abstract async loadStateKey();

  protected abstract async loadStateName();
}
