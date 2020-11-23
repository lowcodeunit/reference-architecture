import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LCUServiceSettings } from '../lcu-service-settings';

export class LCUInterceptor implements HttpInterceptor {
  //  Constuctors
  constructor(protected settings: LCUServiceSettings) {}

  //  API Methods
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedRequest = req.clone({
      headers: req.headers
        .set('lcu-app-id', this.settings.Application.ID)
        .set('lcu-app-ent-lookup', this.settings.Application.EnterpriseLookup)
        .set('lcu-environment', this.settings.State.Environment || '')
        .set('lcu-username-mock', this.settings.State.UsernameMock || '')
    });

    // Pass the cloned request instead of the original request to the next handle
    return next.handle(clonedRequest);
  }
}
