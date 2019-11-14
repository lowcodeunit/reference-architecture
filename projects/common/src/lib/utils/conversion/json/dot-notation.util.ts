// @dynamic

/**
 * @dynamic is used because this class contains static properties
 */

export class DotNotationUtil {

    /**
     * Using dot notation, iterate the object and change the key value
     *
     * @param schema JSON object
     *
     * @param dotPath Dot notation path
     *
     * @param newVal Changed value
     */
    public static ValueChange(json: JSON | object, dotPath: string, newVal: string): void {
        return dotPath.split('.').reduce( (prev, curr, idx, arr) => {
          if ( idx === (arr.length - 1) && prev ) {
              prev[curr] = newVal;
          }
          return prev ? prev[curr] : null;
      }, json);
    }

    /**
     * Drill down to find nested objects
     *
     * @param json object to test
     *
     * @param pathArr array of names used to drill into objects
     */
    public static GetValue(json: JSON | object, pathArr: Array<string>): any {
        const val = pathArr.reduce((obj, key) =>
            (obj && obj[key] !== 'undefined') ? obj[key] : undefined, json);

        return val;
    }
}
