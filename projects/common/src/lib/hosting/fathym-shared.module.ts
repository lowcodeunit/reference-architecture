import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { LCUInterceptor } from '../api/daf/lcu.interceptor';
import { RealTimeService } from '../api/real-time/real-time.service';
import { LCUServiceSettings } from '../api/lcu-service-settings';

export const winAny: any = window;

@NgModule({
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  exports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  providers: [],
  entryComponents: []
})
export class FathymSharedModule {
  //  Fields

  //  API Methods
  static forRoot(environment: { production: boolean }, apiRoot?: string): ModuleWithProviders {
    return {
      ngModule: FathymSharedModule,
      providers: [
        RealTimeService,
        {
          provide: LCUServiceSettings,
          useValue: <LCUServiceSettings>{
            APIRoot: apiRoot || (environment.production ? `` : winAny.LCU ? winAny.LCU.APIRoot : 'http://localhost:52235'),
            AppConfig: {
              ID: winAny.LCU && winAny.LCU.Application ? winAny.LCU.Application.ID : 'test-app',
              EnterpriseAPIKey:
                winAny.LCU && winAny.LCU.Application.EnterprisePrimaryAPIKey ? winAny.LCU.Application.EnterprisePrimaryAPIKey : 'test-app'
            }
          }
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LCUInterceptor,
          multi: true,
          deps: [LCUServiceSettings]
        },
      ]
    };
  }
}
