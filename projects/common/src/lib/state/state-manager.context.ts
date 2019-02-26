import * as signalR from '@aspnet/signalr';
import { ObservableContextService } from '../api/observable-context/observable-context.service';
import { StateAction } from './state-action.model';
import { Injector } from '@angular/core';
import { LCUServiceSettings } from '../api/lcu-service-settings';

//  TODO:  Need to manage reconnection to hub scenarios here

export abstract class StateManagerContext<T> extends ObservableContextService<T> {
  //  Fields
  protected hub: signalR.HubConnection;

  protected settings: LCUServiceSettings;

  //  Constructors
  constructor(protected injector: Injector) {
    super();

    try {
      this.settings = injector.get(LCUServiceSettings);
    } catch (err) {}

    this.Load();
  }

  //  API Methods
  public Execute(action: StateAction) {
    this.executeAction(action);
  }

  public Load() {
    this.buildHub().then(hub => {
      this.hub = hub;

      this.hub
        .start()
        .then(() => {
          console.log('Connection started');

          this.$Refresh();
        })
        .catch(err => console.log('Error while starting connection: ' + err));

      this.hub.on('ReceiveState', req => {
        this.subject.next(req.State);
      });
    });
  }

  public $Refresh(args: any = {}) {
    this.Execute({
      Arguments: args,
      Type: '$refresh'
    });
  }

  //  Helpers
  protected async buildHub() {
    const url = await this.buildHubUrl();

    return new signalR.HubConnectionBuilder().withUrl(url).build();
  }

  protected async buildHubUrl() {
    const url = await this.loadHubUrl();

    const stateKey = await this.loadStateKey();

    const stateName = await this.loadStateName();

    const username = (await this.useUsername()) ? '&username' : '';

    return `${url}?state=${stateName}&key=${stateKey}${username}`;
  }

  protected defaultValue(): T {
    return <T>{};
  }

  protected async executeAction(action: StateAction) {
    return this.hub.invoke('ExecuteAction', { Type: action.Type, Arguments: action.Arguments });
  }

  protected async loadHubUrl() {
    const apiRoot = this.settings ? this.settings.APIRoot || '' : '';

    return `${apiRoot}/state`;
  }

  protected abstract async loadStateKey();

  protected abstract async loadStateName();

  protected async useUsername() {
    return false;
  }
}
