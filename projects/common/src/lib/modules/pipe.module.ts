import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataPipes } from './../utils/pipes/data.pipes';

@NgModule({
    declarations: [DataPipes],
    imports: [CommonModule],
    exports: [DataPipes]
})

export class PipeModule {}
