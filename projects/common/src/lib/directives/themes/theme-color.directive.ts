import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

/**
 * Directive for setting theme color to a element, color comes from
 * a local stylesheet
 *
 * @use as an attribute: lcuColor="primary-A700", sets the class
 * .primary-A700 {} to the host element
 */

/**
 * SCSS class types
 */
// type ColorClasses = 'primary-500' | 'accent-500' | 'warn-500';

@Directive({
  selector: '[lcuThemeColor]'
})

export class ThemeColorDirective {

/**
 * Set the current theme class to the element
 */
  @Input() set lcuThemeColor(val: string) {

    // this.renderer.removeClass(this.element.nativeElement, `${val}`);
    this.renderer.addClass(this.element.nativeElement, `${val}`);

    // this.readProperty('background-color');
  }

  constructor(
    protected element: ElementRef,
    protected renderer: Renderer2
  ) { }

  /**
   * Get the value of a specific style property
   *
   * @param property style property
   */
  protected readProperty(property: string): void {
    console.log('element', window.getComputedStyle(this.element.nativeElement).getPropertyValue(property));
    // console.log('element', window.getComputedStyle(this.element.nativeElement));
  }
}
