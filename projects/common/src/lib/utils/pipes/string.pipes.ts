import { PipeTransform, Pipe } from '@angular/core';
import { StringPipeConstants } from '../constants/string-pipe.constants';

@Pipe({
  name: 'stringPipes'
})

/**
 * Pipes for string values
 */
export class StringPipes implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }

    /**
     * Return given string formatted as 'thisIsCamelCase'.
     *
     * For example, 'test-string' or 'Test String' would be converted to 'testString'.
     */
    if (args.toLowerCase() === StringPipeConstants.PIPE_CAMEL_CASE) {
      value = value.toString();
      return value.toLowerCase()
                  .replace(/[^a-zA-Z0-9]+(.)/g, (_: string, chr: string) => chr.toUpperCase());
    }

    /**
     * Return given string formatted as 'this-is-kebab-case'.
     *
     * For example, 'TestString' would be converted to 'test-string'.
     */
    if (args.toLowerCase() === StringPipeConstants.PIPE_KEBAB_CASE) {
      return value.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
                  .map((x: string) => x.toLowerCase())
                  .join('-');
    }

    /**
     * Return given string formatted as 'ThisIsPascalCase'.
     *
     * For example, 'testString' would be converted to 'Teststring'.
     * For example, 'test string' would be converted to 'Test String'.
     */
    if (args.toLowerCase() === StringPipeConstants.PIPE_PASCAL_CASE) {
      return value.replace(/\w\S*/g, (m: string) => m.charAt(0).toUpperCase() + m.substr(1).toLowerCase());
    }

    /**
     * Return given string formatted as 'this_is_snake_case'.
     *
     * For example, 'TestString' would be converted to 'test_string'.
     */
    if (args.toLowerCase() === StringPipeConstants.PIPE_SNAKE_CASE) {
      return value.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
                  .map((x: string) => x.toLowerCase())
                  .join('_');
    }

    /**
     * If none of the above work, return the original value.
     */
    return value;
  }
}
