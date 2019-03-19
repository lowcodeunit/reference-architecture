import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export class LCUInterceptor implements HttpInterceptor {
  //  Fields
  protected get appId(): string {
    return this.window && this.window.LCU ? this.window.LCU.Application.ID : '';
  }

  protected get appEntApiKey(): string {
    return this.window && this.window.LCU ? this.window.LCU.Application.EnterprisePrimaryAPIKey : '';
  }

  protected get window(): any {
    return (<any>window);
  }

  //  API Methods
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedRequest = req.clone({
      headers: req.headers.set('lcu-app-id', this.appId).set('lcu-app-ent-api-key', this.appEntApiKey)
    });

    // Pass the cloned request instead of the original request to the next handle
    return next.handle(clonedRequest);
  }
}
