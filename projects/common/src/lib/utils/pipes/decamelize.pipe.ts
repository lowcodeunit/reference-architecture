import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decamelize'
})
export class DecamelizePipe implements PipeTransform {
  transform(value: string, separator?: string): string {
    const sep = separator ? separator : ' ';

    return value
          .charAt(0).toUpperCase() + value.slice(1)
          .replace(/([a-z\d])([A-Z])/g, '$1' + sep + '$2')
          .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + sep + '$2');
  }
}
