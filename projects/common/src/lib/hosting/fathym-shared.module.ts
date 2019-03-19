import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import 'hammerjs';
import { LCUInterceptor } from '../api/daf/lcu.interceptor';

@NgModule({
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  exports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  providers: [],
  entryComponents: []
})
export class FathymSharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FathymSharedModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LCUInterceptor,
          multi: true
        }
      ]
    };
  }
}
