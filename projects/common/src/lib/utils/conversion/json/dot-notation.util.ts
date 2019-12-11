import { JSONSchema } from './../../../json-schema';
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
    public static GetValue(obj: JSON | object, propertyPath: string): string | object | Array<any> {
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
          return acc[curr];
        }
        // return a new accumulator to the reduce callback(starts the loop with the next curr value)
        return acc ? acc[curr] : null;

      // inital value to use as the first argument(this is the item to start the iteration with)
    }, obj);
  }
  public static SetKeyValue(json: JSON | JSONSchema, propertyPath: string, oldKey: string, newKey: string, objToChange: string): any {

    // for top level properties
    if (propertyPath.split('.').length === 1) {
      return Object.keys(json).reduce( (acc, curr, idx, arr) =>
        curr === oldKey ? ({ ...acc, [newKey]: json[oldKey] }) : ({...acc, [curr]: json[curr]}), {} );
    }

    // for nested properties
    if (propertyPath.split('.').length > 1) {
      return propertyPath.split('.').reduce( (acc, curr, idx, arr) => {
          if ( idx === (arr.length - 1) && acc ) {

            const idxPos: number = arr.indexOf(objToChange);
            const idxPosArr: Array<string> = [ ...arr.splice(0, idxPos + 1) ];

            DotNotationUtil.SetValue(json, idxPosArr.join('.'), this.RenameKeys({[oldKey]: newKey}, acc));

            return json;
            // return {
            //   ...schema, [objToChange]: this.renameKeys({[oldKey]: newKey}, acc)
            // };
          }
          return acc ? acc[curr] : null; // if acc, then start additional iterations with acc[curr]
      }, json); // first item to start the loop
    }
  }

  /**
   * Rename property keys
   */
  public static RenameKeys(keysMap, obj): any {
    return Object
            .keys(obj)
            .reduce((acc, key) => {
              const renamedObject = {
                [keysMap[key] || key]: obj[key]
              };
              return {
                ...acc,
                ...renamedObject
              };
            }, {});
  }
}
