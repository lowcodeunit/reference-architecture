import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataPipes } from './../utils/pipes/data.pipes';
import { SanitizeHtmlPipe } from './../utils/pipes/sanitze-html.pipe';
import { DecamelizePipe } from '../utils/pipes/decamelize.pipe';

@NgModule({
    declarations: [DataPipes, SanitizeHtmlPipe, DecamelizePipe],
    imports: [CommonModule],
    exports: [DataPipes, SanitizeHtmlPipe, DecamelizePipe]
})

export class PipeModule {
    static forRoot(): ModuleWithProviders<PipeModule> {
    return {
        ngModule: PipeModule,
        providers: [],
    };
}
}
