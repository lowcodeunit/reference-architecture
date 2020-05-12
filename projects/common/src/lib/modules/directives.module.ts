import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeColorDirective } from '../directives/themes/theme-color.directive';

@NgModule({
    declarations: [
        ThemeColorDirective
    ],
    imports: [CommonModule],
    exports: [ThemeColorDirective]
})

export class DirectiveModule {
    static forRoot(): ModuleWithProviders<DirectiveModule> {
    return {
        ngModule: DirectiveModule,
        providers: [],
    };
}
}
