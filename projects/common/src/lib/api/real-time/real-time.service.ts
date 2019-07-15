import * as signalR from '@aspnet/signalr';
import { NgZone, Output, EventEmitter } from '@angular/core';
import { Injectable, Injector } from '@angular/core';
import { LCUServiceSettings } from '../lcu-service-settings';
import { Observable, BehaviorSubject, ReplaySubject, Observer, Subject } from 'rxjs';

//  TODO:  Need to manage reconnection to hub scenarios here

@Injectable({
  providedIn: 'root'
})
export class RealTimeService {
  //  Fields

  protected attemptingToReconnect: boolean;

  protected connectionAttempts: number;

  protected hub: signalR.HubConnection;

  protected showConnectionError: boolean;

  protected started: ReplaySubject<signalR.HubConnection>;

  protected url: string;

  private zone: NgZone;

  //  Properties

  public ReconnectionAttempt: Subject<boolean>;

  public Settings: LCUServiceSettings;

  public Started: Observable<signalR.HubConnection>;

  //  Constructors
  constructor(protected injector: Injector) {
    this.ReconnectionAttempt = new Subject<boolean>();
    this.connectionAttempts = 0;

    try {
      this.Settings = injector.get(LCUServiceSettings);

      this.zone = injector.get(NgZone);
    } catch (err) {}

    this.started = new ReplaySubject();

    this.Started = this.started.asObservable();

    this.start();
  }

  //  API Methods
  public Start() {
    return new Promise<signalR.HubConnection>((resolve, reject) => {
      this.buildHub('').then((hub: signalR.HubConnection) => {
        this.hub = hub;

        this.hub.onclose(err => {
          console.log('onclose: ' + err);

          this.retryConnection();
        });

        try {
          this.hub
            .start()
            .then(() => {
              this.connectionAttempts = 0;

              console.log(`Connection started`);

              resolve(this.hub);
            })
            .catch(err => {
              this.retryConnection();

              if (this.showConnectionError) {
                reject(err);
                console.log('Error while starting connection: ' + err);
                this.showConnectionError = false;
              }
            });
        } catch (err) {
          console.log('Error while starting connection 02: ' + err);

          this.retryConnection();
        }
      });
    });
  }

  public RegisterHandler(methodName: string) {
    return this.WithHub(hub => {
      return Observable.create(obs => {
        try {
          hub.on(methodName, req => {
            obs.next(req);

            this.zone.run(() => {});
          });
        } catch (err) {
          console.log(`Error while handling ${methodName}: ` + err);

          obs.error(err);

          this.retryConnection();
        }
      });
    });
  }

  public Invoke(methodName: string, ...args: any[]) {
    return this.WithHub(hub => {
      return Observable.create(obs => {
        try {
          hub
            .invoke(methodName, ...args)
            .then(res => {
              obs.next(res);

              this.zone.run(() => {});
            })
            .catch(e => {
              obs.error(e);
            });
        } catch (err) {
          console.log(`Error while invoking ${methodName}: ` + err);

          obs.error(err);

          this.retryConnection();
        }
      });
    });
  }

  public WithHub(action: (hub: signalR.HubConnection) => void | Observable<any>): Observable<any> {
    try {
      return Observable.create(obs => {
        if (this.hub.state !== signalR.HubConnectionState.Connected) {
          this.Start().then(hub => {
            console.log('Restarting connection in flight...');

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

    return (
      new signalR.HubConnectionBuilder()
        .configureLogging(signalR.LogLevel.Information)
        .withUrl(this.url)
        // .withUrl(this.url, {
        //   transport: signalR.HttpTransportType.LongPolling
        // })
        .build()
    );
  }

  protected buildHubUrl(urlRoot: string) {
    const url = this.loadHubUrl(urlRoot);

    return url;
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

  protected async loadStateRoot() {
    return this.Settings.StateConfig && this.Settings.StateConfig.Root !== undefined ? this.Settings.StateConfig.Root : '/state';
  }

  protected runWithHub(obs: Observer<any>, action: (hub: signalR.HubConnection) => void | Observable<any>) {
    const res = action(this.hub);

    if (res) {
      res.subscribe(
        r => {
          obs.next(r);

          this.zone.run(() => {});
        },
        e => {
          obs.error(e);
        }
      );
    }
  }

  protected start() {
    setTimeout(() => {
      this.Start().then(hub => this.started.next(hub));
    }, 50);
  }

  protected stop(): void {
    // this.hub.stop();
    this.showConnectionError = true;
  }

  /**
   * Retry connection
   */
  protected retryConnection(): void {
    if (this.connectionAttempts < 5) {
      console.log(`Retring connection attempt ${this.connectionAttempts}`);

      this.connectionAttempts += 1;

      this.reconnect();
    } else if (this.connectionAttempts >= 5) {
      this.stopReconnection();
    }
  }

  /**
   * Attempt to reconnect
   */
  protected reconnect(): void {
    this.attemptingToReconnect = true;

    this.reconnectionMessage();
    this.start();
  }

  /**
   * Stop trying to reconnect
   */
  protected stopReconnection(): void {
    this.attemptingToReconnect = false;

    this.reconnectionMessage();
    this.stop();
  }

  /**
   * Notify user of reconnection attempt(s)
   */
  protected reconnectionMessage(): void {
    this.ReconnectionAttempt.next(this.attemptingToReconnect);
  }
}
