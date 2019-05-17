import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { LCUInterceptor } from '../api/daf/lcu.interceptor';
import { RealTimeService } from '../api/real-time/real-time.service';
import { LCUServiceSettings } from '../api/lcu-service-settings';

import 'hammerjs';

export const winAny = <any>window;

@NgModule({
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  exports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  providers: [],
  entryComponents: []
})
export class FathymSharedModule {
  //  Fields

  //  API Methods
  static DefaultServiceSettings(env: { production: boolean }, apiRoot?: string) {
    return <LCUServiceSettings>{
      APIRoot: env.production ? `` : winAny.LCU && winAny.LCU.APIRoot ? winAny.LCU.APIRoot : 'http://localhost:52235',
      AppConfig: {
        ID: winAny.LCU && winAny.LCU.Application && winAny.LCU.Application.ID ? winAny.LCU.Application.ID : 'test-app',
        EnterpriseAPIKey:
          winAny.LCU && winAny.LCU.Application.EnterprisePrimaryAPIKey ? winAny.LCU.Application.EnterprisePrimaryAPIKey : 'test-app'
      },
      StateConfig: {
        Environment: winAny.LCU.State ? winAny.LCU.State.Environment : ''
      }
    };
  }

  static forRoot(): ModuleWithProviders {
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
