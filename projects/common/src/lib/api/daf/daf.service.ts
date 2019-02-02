import { Observable, OperatorFunction, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseResponse } from '../base-response';
import { BaseModeledResponse } from '../base-modeled-response';

export class DAFServiceSettings {
  public APIRoot?: string;
}

export abstract class DAFService {
  // 	Fields
  protected http: HttpClient;

  protected settings: DAFServiceSettings;

  //  Constructors
  constructor(protected injector: Injector) {
    this.http = injector.get(HttpClient);

    try {
      this.settings = injector.get(DAFServiceSettings);
    } catch (err) {}
  }

  //  Helpers
  protected catchError(): OperatorFunction<any, any> {
    return catchError<any, any>(this.handleError);
  }

  protected delete(path: string): Observable<BaseResponse> {
    return this.http.delete<BaseResponse>(this.resolvePath(path)).pipe(this.catchError());
  }

  protected get<T>(path: string): Observable<BaseModeledResponse<T>> {
    return this.http.get<BaseModeledResponse<T>>(this.resolvePath(path)).pipe(this.catchError());
  }

  protected handleError(error: any): any {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    const errMsg = error.message ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';

    console.error(errMsg); // log to console instead

    return throwError(errMsg);
  }

  protected patch<T>(data: any, path: string): Observable<BaseModeledResponse<T>> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.patch<BaseModeledResponse<T>>(this.resolvePath(path), data, options).pipe(this.catchError());
  }

  protected post<T>(data: any, path: string): Observable<BaseModeledResponse<T>> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<BaseModeledResponse<T>>(this.resolvePath(path), data, options).pipe(this.catchError());
  }

  protected put<T>(data: any, path: string): Observable<BaseModeledResponse<T>> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.put<BaseModeledResponse<T>>(this.resolvePath(path), data, options).pipe(this.catchError());
  }

  protected resolvePath(path: string) {
    if (this.settings && this.settings.APIRoot) {
      if (this.settings.APIRoot.endsWith('/')) {
        this.settings.APIRoot = this.settings.APIRoot.substring(this.settings.APIRoot.length - 1);
      }

      if (path.startsWith('/')) {
        path = path.substring(1);
      }

      return `${this.settings.APIRoot}/${path}`;
    } else {
      return path;
    }
  }
}
