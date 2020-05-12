import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeColorDirective } from '../directives/theme-color.directive';

@NgModule({
    declarations: [
        ThemeColorDirective
    ],
    imports: [CommonModule],
    exports: [ThemeColorDirective]
})

export class DirectivesModule {
    static forRoot(): ModuleWithProviders<DirectivesModule> {
    return {
        ngModule: DirectivesModule,
        providers: [],
    };
}
}
