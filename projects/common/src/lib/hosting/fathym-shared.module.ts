import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { LCUInterceptor } from '../api/daf/lcu.interceptor';
import { RealTimeService } from '../api/real-time/real-time.service';
import {
  LCUApplicationConfig,
  LCUServiceSettings,
  LCUSettingsConfig,
  LCUStateConfig,
} from '../api/lcu-service-settings';
import { SafePipe } from '../pipes/safe-pipe';
import { LoaderComponent } from '../controls/loader/loader.component';
import { ApiAccessComponent } from '../controls/api-access/api-access.component';

export const winAny = <any>window;

@NgModule({
  declarations: [SafePipe, LoaderComponent, ApiAccessComponent],
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  exports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    SafePipe,
    LoaderComponent,
    ApiAccessComponent,
  ],
  providers: [],
  entryComponents: [],
})
export class FathymSharedModule {
  //  Fields

  //  API Methods
  static DefaultServiceSettings(
    env: { production: boolean },
    apiRoot?: string
  ) {
    const lcuSvcSettings = <LCUServiceSettings>winAny.LCU;

    lcuSvcSettings.APIRoot = lcuSvcSettings.APIRoot || apiRoot || '';

    lcuSvcSettings.Application =
      lcuSvcSettings.Application || <LCUApplicationConfig>{ };

    lcuSvcSettings.Application.EnterpriseLookup =
      lcuSvcSettings.Application.EnterpriseLookup || 'test-app';

    lcuSvcSettings.Application.ID = lcuSvcSettings.Application.ID || 'test-app';

    lcuSvcSettings.State = lcuSvcSettings.State || <LCUStateConfig>{ };

    lcuSvcSettings.Settings = lcuSvcSettings.Settings || <LCUSettingsConfig>{ };

    return lcuSvcSettings;

    // return <LCUServiceSettings>{
    //   APIRoot: winAny.LCU && winAny.LCU.APIRoot ? winAny.LCU.APIRoot : '',
    //   Application: {
    //     ID: winAny.LCU && winAny.LCU.Application && winAny.LCU.Application.ID ? winAny.LCU.Application.ID : 'test-app',
    //     EnterpriseLookup:
    //       winAny.LCU && winAny.LCU.Application.EnterpriseLookup ? winAny.LCU.Application.EnterpriseLookup : 'test-app'
    //   },
    //   State: {
    //     Environment:winAny.LCU.State.Environment : '',
    //     ActionRoot: winAny.LCU.State ? winAny.LCU.State.Root : '',
    //     Root: winAny.LCU.State ? winAny.LCU.State.Root : '',
    //     UsernameMock: winAny.LCU.State ? winAny.LCU.State.UsernameMock : ''
    //   },
    //   Settings: winAny.LCU.Settings
    // };
  }

  static forRoot(): ModuleWithProviders<FathymSharedModule> {
    return {
      ngModule: FathymSharedModule,
      providers: [
        RealTimeService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LCUInterceptor,
          multi: true,
          deps: [LCUServiceSettings],
        },
      ],
    };
  }
}
