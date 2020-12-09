import { DataPipeConstants } from './../utils/constants/data-pipe.constants';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataPipes } from './../utils/pipes/data.pipes';
import { SanitizeHtmlPipe } from './../utils/pipes/sanitze-html.pipe';
import { DecamelizePipe } from '../utils/pipes/decamelize.pipe';
import { StringPipes } from '../utils/pipes/string.pipes';

@NgModule({
    declarations:
    [
        DataPipes,
        SanitizeHtmlPipe,
        DecamelizePipe,
        StringPipes
    ],
    imports:
    [
        CommonModule
    ],
    exports:
    [
        DataPipes,
        SanitizeHtmlPipe,
        DecamelizePipe,
        StringPipes,
        DataPipeConstants
    ]
})

export class PipeModule {
    static forRoot(): ModuleWithProviders<PipeModule> {
    return {
        ngModule: PipeModule,
        providers: [],
    };
}
}
