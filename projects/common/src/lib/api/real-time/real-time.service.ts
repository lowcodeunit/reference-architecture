import * as signalR from '@aspnet/signalr';
import { Injectable, Injector } from '@angular/core';
import { LCUServiceSettings } from '../lcu-service-settings';
import { Observable, BehaviorSubject, ReplaySubject, Observer } from 'rxjs';

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
      this.buildHub('').then(hub => {
        this.hub = hub;

        this.hub
          .start()
          .then(() => {
            console.log(`Connection started`);

            setTimeout(() => {
              resolve(this.hub);
            }, 750);
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
      return Observable.create(obs => {
        hub.on(methodName, req => {
          obs.next(req);
        });
      });
    });
  }

  public Invoke(methodName: string, ...args: any[]) {
    return this.WithHub(hub => {
      return Observable.create(obs => {
        hub
          .invoke(methodName, ...args)
          .then(res => {
            obs.next(res);
          })
          .catch(e => {
            obs.error(e);
          });
      });
    });
  }

  public WithHub(action: (hub: signalR.HubConnection) => void | Observable<any>): Observable<any> {
    try {
      return Observable.create(obs => {
        if (this.hub.state !== signalR.HubConnectionState.Connected) {
          this.Start().then(hub => {
            this.runWithHub(obs, action);
          });
        } else {
          this.runWithHub(obs, action);
        }
      });
    } catch (err) {
      return Observable.create(obs => {
        obs.error(err);

        obs.complete();
      });
    }
  }

  //  Helpers
  protected async buildHub(urlRoot: string) {
    this.url = this.buildHubUrl(urlRoot);

    return new signalR.HubConnectionBuilder().withUrl(this.url).build();
  }

  protected buildHubUrl(urlRoot: string) {
    const url = this.loadHubUrl(urlRoot);

    return url;
  }

  protected loadHubPath() {
    return `/state`;
  }

  protected loadHubUrl(urlRoot: string) {
    const apiRoot = this.settings ? this.settings.APIRoot || '' : '';

    const hubPath = this.loadHubPath();

    return `${apiRoot}${urlRoot || ''}${hubPath}`;
  }

  protected runWithHub(obs: Observer<any>, action: (hub: signalR.HubConnection) => void | Observable<any>) {
    const res = action(this.hub);

    if (res) {
      res.subscribe(
        r => {
          obs.next(r);
        },
        e => {
          obs.error(e);
        }
      );
    }
  }

  protected start() {
    this.Start().then(hub => this.started.next(hub));
  }
}
