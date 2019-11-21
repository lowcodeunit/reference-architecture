// @dynamic

/**
 * @dynamic is used because this class contains static properties
 */

export class DotNotationUtil {

    /**
     * Using dot notation, iterate the object and change the key's value
     *
     * @param obj object to test
     *
     * @param propertyPath Dot notation path
     *
     * @param newVal Changed value
     */
    public static SetValue(obj: JSON | object, propertyPath: string, newVal: string | object | Array<any>): void {
        /**
         * split propertyPath string into an array of strings and iterate each itm with reduce
         *
         * @param acc(accumulator) returned object to iterate
         *
         * @param curr(current value) current element being processed in the array
         *
         * @param idx index position of the current element being processed in the array
         *
         * @param arr array we created with the split function above
         *
         */
        return propertyPath.split('.').reduce( (acc, curr, idx, arr) => {
          if ( idx === (arr.length - 1) && acc ) {
            acc[curr] = newVal;
          }
          // return a new accumulator to the reduce callback(starts the loop with the next curr value)
          return acc ? acc[curr] : null;

        // inital value to use as the first argument(this is the item to start the iteration with)
      }, obj);
    }

    /**
     * Using dot notation, iterate the object and return the key's value
     *
     * @param obj object to test
     *
     * @param pathArr array of names used to drill into objects
     */
    public static GetValue(obj: JSON | object, propertyPath: Array<string>): string {
        /**
         * @param acc(accumulator) returned object to iterate
         *
         * @param curr(current value) current element being processed in the array
         */
        return propertyPath.reduce((acc, curr) =>
            (obj && obj[curr] !== 'undefined') ? obj[curr] : undefined, obj);
    }
}
