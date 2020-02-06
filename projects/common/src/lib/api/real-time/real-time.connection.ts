import * as signalR from '@aspnet/signalr';
import { NgZone, Output, EventEmitter } from '@angular/core';
import { Injectable, Injector } from '@angular/core';
import { LCUServiceSettings } from '../lcu-service-settings';
import {
  Observable,
  BehaviorSubject,
  ReplaySubject,
  Observer,
  Subject
} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class RealTimeConnection {
  //  Fields
  protected actionUrl: string;

  protected connectionAttempts: number;

  protected rtUrl: string;

  //  Properties
  public ConnectionError: EventEmitter<any>;

  public Hub: signalR.HubConnection;

  public MaxConnectionRetryAttempts: number;

  public ReconnectionAttempt: EventEmitter<number>;

  public Started: EventEmitter<signalR.HubConnection>;

  //  Constructors
  constructor(protected http: HttpClient, rtUrl: string, actionUrl: string, maxConnectionRetryAttempts: number = 10) {
    this.actionUrl = actionUrl;

    this.connectionAttempts = 0;

    this.rtUrl = rtUrl;

    this.ConnectionError = new EventEmitter<any>();

    this.ReconnectionAttempt = new EventEmitter<number>();

    this.MaxConnectionRetryAttempts = maxConnectionRetryAttempts;

    this.Started = new EventEmitter<signalR.HubConnection>();
  }

  //  API Methods
  public Start(
    transport: signalR.HttpTransportType = signalR.HttpTransportType.WebSockets
  ) {
    this.buildHub(transport).then((hub: signalR.HubConnection) => {
      this.Hub = hub;

      this.Hub.serverTimeoutInMilliseconds = 600000;

      this.Hub.onclose(err => {
        console.log('onclose: ' + err);

        this.retryConnection();
      });

      try {
        this.Hub.start()
          .then(() => {
            this.connectionAttempts = 0;

            console.log(`Connection started`);

            this.Started.emit(this.Hub);
          })
          .catch(err => {
            console.log('Error while starting connection: ' + err);

            this.ConnectionError.emit(err);

            this.retryConnection();
          });
      } catch (err) {
        console.log('Error while starting connection: ' + err);

        this.retryConnection();
      }
    });
  }

  public RegisterHandler(methodName: string): Observable<any> {
    return new Observable(obs => {
      if (this.Hub) {
        try {
          this.Hub.on(methodName, req => {
            obs.next(req);
          });
        } catch (err) {
          console.log(`Error while handling ${methodName}: ` + err);

          obs.error(err);
        }
      } else {
        obs.error(
          'The hub must be started and configured before registering a handler.'
        );
      }
    });
  }

  public InvokeAction(methodName: string, headers: HttpHeaders | { [header: string]: string | string[]; }, args: {}) {
    const url = `${this.actionUrl}/${methodName}`;

    return this.http.post(url, args, {
      headers,
      withCredentials: true
    });
  }

  public Invoke(methodName: string, ...args: any[]) {
    return new Observable(obs => {
      if (this.Hub) {
        try {
          this.Hub.invoke(methodName, ...args)
            .then(res => {
              obs.next(res);
            })
            .catch(e => {
              obs.error(e);
            });
        } catch (err) {
          console.log(`Error while invoking ${methodName}: ` + err);

          obs.error(err);
        }
      } else {
        obs.error('The hub must be started and configured before invoking.');
      }
    });
  }

  //  Helpers
  protected async buildHub(transport: signalR.HttpTransportType) {
    return new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl(this.rtUrl, {
        transport
      })
      .build();
  }

  protected stop(): Promise<void> {
    return this.Hub.stop();
  }

  /**
   * Retry connection
   */
  protected retryConnection(): void {
    if (this.connectionAttempts < this.MaxConnectionRetryAttempts) {
      console.log(`Retrying connection attempt ${this.connectionAttempts}`);

      this.connectionAttempts += 1;

      setTimeout(() => {
        this.reconnect();
      }, 1000);
    } else if (this.connectionAttempts >= this.MaxConnectionRetryAttempts) {
      this.stop().then();

      this.ConnectionError.emit(
        'The maximum number of connection retries has been met.'
      );
    }
  }

  /**
   * Attempt to reconnect
   */
  protected reconnect(): void {
    this.ReconnectionAttempt.emit(this.connectionAttempts);

    this.Start();
  }
}
