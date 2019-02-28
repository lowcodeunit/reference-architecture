import * as signalR from '@aspnet/signalr';
import { Injectable, Injector } from '@angular/core';
import { LCUServiceSettings } from '../lcu-service-settings';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';

//  TODO:  Need to manage reconnection to hub scenarios here

@Injectable({
  providedIn: 'root'
})
export class RealTimeService {
  //  Fields
  protected hub: signalR.HubConnection;

  protected settings: LCUServiceSettings;

  protected started: ReplaySubject<signalR.HubConnection>;

  protected url: string;

  //  Properties
  public Started: Observable<signalR.HubConnection>;

  //  Constructors
  constructor(protected injector: Injector) {
    try {
      this.settings = injector.get(LCUServiceSettings);
    } catch (err) {}

    this.started = new ReplaySubject();

    this.Started = this.started.asObservable();

    this.start();
  }

  //  API Methods
  public Start() {
    return new Promise<signalR.HubConnection>((resolve, reject) => {
      this.buildHub('').then(async hub => {
        this.hub = hub;

        this.hub
          .start()
          .then(() => {
            console.log(`Connection started`);

            resolve(this.hub);
          })
          .catch(err => {
            console.log('Error while starting connection: ' + err);

            reject(err);
          });
      });
    });
  }

  public RegisterHandler(methodName: string) {
    return this.WithHub(hub => {
      return new Promise<any>((resolve, reject) => {
        hub.on(methodName, req => {
          resolve(req);
        });
      });
    });
  }

  public Invoke(methodName: string, ...args: any[]) {
    return this.WithHub(hub => {
      return hub.invoke(methodName, ...args);
    });
  }

  public WithHub(action: (hub: signalR.HubConnection) => void | Promise<any>): Promise<any> {
    try {
      return new Promise<any>((resolve, reject) => {
        const res = action(this.hub);

        if (res) {
          res
            .then(r => {
              resolve(r);
            })
            .catch(e => {
              reject(e);
            });
        }
      });
    } catch (err) {
      return new Promise<any>((resolve, reject) => {
        reject(err);
      });
    }
  }

  //  Helpers
  protected async buildHub(urlRoot: string) {
    this.url = await this.buildHubUrl(urlRoot);

    return new signalR.HubConnectionBuilder().withUrl(this.url).build();
  }

  protected async buildHubUrl(urlRoot: string) {
    const url = await this.loadHubUrl(urlRoot);

    return url;
  }

  protected async loadHubPath() {
    return ``;
  }

  protected async loadHubUrl(urlRoot: string) {
    const apiRoot = this.settings ? this.settings.APIRoot || '' : '';

    const hubPath = await this.loadHubPath();

    return `${apiRoot}${urlRoot || ''}${hubPath}`;
  }

  protected start() {
    this.Start().then(hub => this.started.next(hub));
  }
}
