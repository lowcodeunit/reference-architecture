import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { LCUInterceptor } from '../api/daf/lcu.interceptor';
import { RealTimeService } from '../api/real-time/real-time.service';
import { LCUServiceSettings } from '../api/lcu-service-settings';

import 'hammerjs';

export function winAny(): any {
  return window;
}

@NgModule({
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  exports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  providers: [],
  entryComponents: []
})
export class FathymSharedModule {
  //  Fields

  //  API Methods
  static DefaultServiceSettings(environment: { production: boolean }, apiRoot?: string) {
    return <LCUServiceSettings>{
      APIRoot: apiRoot || (environment.production ? `` : winAny().LCU ? winAny().LCU.APIRoot : 'http://localhost:52235'),
      AppConfig: {
        ID: winAny().LCU && winAny().LCU.Application ? winAny().LCU.Application.ID : 'test-app',
        EnterpriseAPIKey:
          winAny().LCU && winAny().LCU.Application.EnterprisePrimaryAPIKey ? winAny().LCU.Application.EnterprisePrimaryAPIKey : 'test-app'
      }
    };
  }

  static forRoot(environment: { production: boolean }, apiRoot?: string): ModuleWithProviders {
    console.log(winAny().LCU);
    return {
      ngModule: FathymSharedModule,
      providers: [
        RealTimeService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LCUInterceptor,
          multi: true,
          deps: [LCUServiceSettings]
        }
      ]
    };
  }
}
