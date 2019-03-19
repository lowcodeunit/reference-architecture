import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { LCUInterceptor } from '../api/daf/lcu.interceptor';
import { RealTimeService } from '../api/real-time/real-time.service';
import { LCUServiceSettings } from '../api/lcu-service-settings';

@NgModule({
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  exports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  providers: [],
  entryComponents: []
})
export class FathymSharedModule {
  //  Fields
  static get appId(): string {
    return this.window && this.window.LCU ? this.window.LCU.Application.ID : '';
  }

  static get appEntApiKey(): string {
    return this.window && this.window.LCU ? this.window.LCU.Application.EnterprisePrimaryAPIKey : '';
  }

  static get window(): any {
    return (<any>window);
  }

  //  API Methods
  static forRoot(environment: { production: boolean }, apiRoot?: string): ModuleWithProviders {
    return {
      ngModule: FathymSharedModule,
      providers: [
        RealTimeService,
        {
          provide: LCUServiceSettings,
          useValue: <LCUServiceSettings>{
            APIRoot: apiRoot || (environment.production ? `` : `http://localhost:52235`),
            AppConfig: {
              ID: this.appId,
              EnterpriseAPIKey: this.appEntApiKey
            }
          }
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LCUInterceptor,
          multi: true
        }
      ]
    };
  }
}
