import { JSONSchema } from '../../../json-schema';

export class DotNotationChangeUtil {

    /**
     * Using dot notation, iterate the object and change the key value
     *
     * @param schema JSON object
     *
     * @param dotPath Dot notation path
     *
     * @param newVal Changed value
     */
    public static ValueChange(json: JSON, dotPath: string, newVal: string): void {
        return dotPath.split('.').reduce( (prev, curr, idx, arr) => {
          if ( idx === (arr.length - 1) && prev ) {
              prev[curr] = newVal;
          }
          return prev ? prev[curr] : null;
      }, json);
    }
}
