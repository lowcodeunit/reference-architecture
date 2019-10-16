import { SanitizeHtmlPipe } from './../utils/pipes/sanitze-html.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataPipes } from './../utils/pipes/data.pipes';

@NgModule({
    declarations: [DataPipes, SanitizeHtmlPipe],
    imports: [CommonModule],
    exports: [DataPipes, SanitizeHtmlPipe]
})

export class PipeModule {
    static forRoot() {
        return {
            ngModule: PipeModule,
            providers: [],
        };
     }
}
