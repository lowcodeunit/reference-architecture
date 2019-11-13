import { IsDataTypeUtil } from './../../type/is-data-type.util';
import { JSONSchema } from '../../../json-schema';
import { JSONSchemaItemModel } from '../../../models/json/json-schema-item.model';

// @dynamic

/**
 * @dynamic is used because this class contains static properties
 */

/**
 * Flatten and Unflatten JSON
 *
 * Original Code Example: http://jsfiddle.net/crl/WSzec/154/
 */
export class JSONFlattenUnflatten {

  /**
   * Flatten a standard JSON Object
   *
   * @param json JSON object to be flattened
   *
   * @param map recursive map data
   *
   * @param prefix dotnotated path
   */
  public static Flatten(json: JSON | JSONSchema, map = {}, prefix = ''): object {
    if (Array.isArray(json)) {
      json.forEach((itm, idx) => {
        if (IsDataTypeUtil.IsObject(json[itm]) && json[itm]) {
          this.Flatten(json[itm], map, prefix + '[' + itm + ']');
        } else {
          map[prefix + '[' + itm + ']'] = json[itm];
        }
      });

      return map;
    }

    Object.entries(json).forEach(([key, value]) => {
      if (IsDataTypeUtil.IsObject(json[key]) && json[key]) {
        this.Flatten(json[key], map, (prefix ? prefix + '.' : '') + key);
      } else {
        map[(prefix ? prefix + '.' : '') + key] = json[key];
      }
    });

    return map;
  }

  /**
   * Flatten JSON into a map
   *
   * @param json JSON object to be flattened
   *
   * @param map recursive map data
   *
   * @param prefix dotnotated path
   */
  public static FlattenMap(json: JSON | JSONSchema, map = new Map(), prefix: string = ''): Map<string, string> {
    if (Array.isArray(json)) {
      json.forEach((itm, idx) => {
        if (IsDataTypeUtil.IsObject(json[itm]) && json[itm]) {
          this.FlattenMap(json[itm], map, prefix + '[' + itm + ']');
        } else {
          map.set(prefix + '[' + itm + ']', json[itm]);
        }
      });

      return map;
    }

    Object.entries(json).forEach(([key, value]) => {
      if (IsDataTypeUtil.IsObject(json[key]) && json[key]) {
        if (Object.entries(json[key]).length === 0) { return; }
        this.FlattenMap(json[key], map, (prefix ? prefix + '.' : '') + key);
      } else {
       map.set((prefix ? prefix + '.' : '') + key, json[key]);
      }
    });

    return map;
  }

  /**
   * Flatten JSON into a map
   *
   * @param json JSON object to be flattened
   *
   * @param map recursive map data
   *
   * @param prefix dotnotated path
   */
  public static FlattenMapTest(json: JSON | JSONSchema, map = new Map(), prefix: string = ''): Map<string, string> {
    if (Array.isArray(json)) {
      json.forEach((itm, idx) => {
        if (IsDataTypeUtil.IsObject(json[itm]) && json[itm]) {
          this.FlattenMap(json[itm], map, prefix + '[' + itm + ']');
        } else {
          map.set(prefix + '[' + itm + ']', json[itm]);
        }
      });

      return map;
    }

    Object.entries(json).forEach(([key, value]) => {
      if (IsDataTypeUtil.IsObject(json[key]) && json[key]) {
        if (Object.entries(json[key]).length === 0) { return; }
        this.FlattenMapTest(json[key], map, (prefix ? prefix + '.' : '') + key);
      } else {
      map.set((prefix ? prefix + '.' : '') + key, json[key]);
      }
    });

    return map;
  }

  /**
   * Flatten JSON into a map
   *
   * @param json JSON object to be flattened
   *
   * @param map recursive map data
   *
   * @param prefix dotnotated path
   */
  public static FlattenMapJSONSchemaItem(
    json: JSON | JSONSchema, map = new Map(), prefix: string = ''): Map<string, JSONSchemaItemModel> {

    if (Array.isArray(json)) {
      json.forEach((itm, idx) => {
        if (IsDataTypeUtil.IsObject(json[itm]) && json[itm]) {
          this.FlattenMap(json[itm], map, prefix + '[' + itm + ']');
        } else {
          map.set(prefix + '[' + itm + ']', json[itm]);
        }
      });

      return map;
    }

    Object.entries(json).forEach(([key, value]) => {
      if (IsDataTypeUtil.IsObject(json[key]) && json[key]) {
        this.FlattenMap(json[key], map, (prefix ? prefix + '.' : '') + key);
      } else {
       map.set((prefix ? prefix + '.' : '') + key, json[key]);
      }
    });

    return map;
  }

  /**
   * Unflatten an already flatten JSON object
   *
   * @param map object to unflatten
   */
  public static Unflatten(map: object): object {
    const returnObject: object = {};

    Object.entries(map).forEach(([key, value]) => {
      const keysRegEx: RegExp = /(?:\.?([^.[]+))|(\[\d+\])/g;
      let match: RegExpExecArray | null;
      let oi: object = returnObject; // ref to returnObject, modified in loop below

      // tslint:disable-next-line:no-conditional-assignment
      while (match = keysRegEx.exec(key)) { // method executes a search for a match in a specified string. Returns a result array,
        const prefix: string = key[match.index + match[0].length];
        let keyName: string = match[1];

        if (!prefix) { // nothing more, store value in oi[keyName]
          oi[keyName] = value;
      } else {
          if (keyName) {
            if (!oi.hasOwnProperty(keyName)) {
              oi[keyName] = prefix === '[' ? [] : {};
            }
        } else {
          keyName = match[2].slice(1, -1);
          if (!oi.hasOwnProperty(keyName)) {
            oi[keyName] = prefix === '[' ? [] : {};
          }
        }
      }
        oi = oi[keyName];
    }
  });
    return returnObject;
 }

    /**
     * Unflatten map data
     *
     * @param map map data
     */
    public static UnflattenMap(map: any): object {

      const returnObject: object = {};

      map.forEach((value: string, key: string) => {
          const keysRegEx: RegExp = /(?:\.?([^.[]+))|(\[\d+\])/g;
          let match: RegExpExecArray | null;
          let oi: object = returnObject; // ref to returnObject, modified in loop below

          // tslint:disable-next-line:no-conditional-assignment
          while (match = keysRegEx.exec(key)) { // method executes a search for a match in a specified string. Returns a result array,

          const prefix: string = key[match.index + match[0].length];
          let keyName: string = match[1];

          if (!prefix) { // nothing more, store value in oi[keyName]
              oi[keyName] = value;
          } else {
              if (keyName) {
                if (!oi.hasOwnProperty(keyName)) {
                  oi[keyName] = prefix === '[' ? [] : {};
                }
            } else {
              keyName = match[2].slice(1, -1);
              if (!oi.hasOwnProperty(keyName)) {
                oi[keyName] = prefix === '[' ? [] : {};
              }
            }
          }
          oi = oi[keyName];
        }
      });
      return returnObject;
    }
 }
