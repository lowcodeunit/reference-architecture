import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, NavigationCancel, NavigationEnd, NavigationError, NavigationStart } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterHelpersService {
  // 	Constructors
  constructor(protected route: ActivatedRoute, protected router: Router) {}

  // 	API Methods
  public RunOnNavigation(action: Function, navEventType: any = null) {
    return this.router.events.subscribe((event: any) => {
      if (navEventType == null || event instanceof navEventType) {
        action(event);
      }
    });
  }

  public RunOnNavigationCancel(action: Function) {
    return this.RunOnNavigation(action, NavigationCancel);
  }

  public RunOnNavigationEnd(action: Function) {
    return this.RunOnNavigation(action, NavigationEnd);
  }

  public RunOnNavigationError(action: Function) {
    return this.RunOnNavigation(action, NavigationError);
  }

  public RunOnNavigationStart(action: Function) {
    return this.RunOnNavigation(action, NavigationStart);
  }

  public RunOnQueryParam(param: string, action: Function, checkVal: any = null) {
    return this.route.queryParams.subscribe((params: any) => {
      if ((checkVal == null && params[param] != null) || (checkVal != null && params[param] === checkVal)) {
        action(params);
      }
    });
  }

  public RunOnRouteParam(param: string, action: Function, checkVal: any = null) {
    return this.route.params.subscribe((params: any) => {
      if ((checkVal == null && params[param] != null) || (checkVal != null && params[param] === checkVal)) {
        action(params);
      }
    });
  }
}
