import { IsDataTypeUtil } from './../../type/is-data-type.util';
import { JSONSchema } from '../../../json-schema';

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
   * @param dotnotation dotnotated path
   */
  public static Flatten(json: JSON | JSONSchema, map = {}, dotnotation = ''): object {
    if (Array.isArray(json)) {
      json.forEach((itm, idx) => {
        if (IsDataTypeUtil.IsObject(json[itm]) && json[itm]) {
          this.Flatten(json[itm], map, dotnotation + '[' + itm + ']');
        } else {
          map[dotnotation + '[' + itm + ']'] = json[itm];
        }
      });

      return map;
    }

    Object.entries(json).forEach(([key, value]) => {
      if (IsDataTypeUtil.IsObject(json[key]) && json[key]) {
        this.Flatten(json[key], map, (dotnotation ? dotnotation + '.' : '') + key);
      } else {
        map[(dotnotation ? dotnotation + '.' : '') + key] = json[key];
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
   * @param dotnotation dotnotated path
   */
  public static FlattenMap(json: JSON | JSONSchema, map = new Map(), dotnotation: string = ''): object {
    if (Array.isArray(json)) {
      json.forEach((itm, idx) => {
        if (IsDataTypeUtil.IsObject(json[itm]) && json[itm]) {
          this.FlattenMap(json[itm], map, dotnotation + '[' + itm + ']');
        } else {
          map.set(dotnotation + '[' + itm + ']', json[itm]);
        }
      });

      return map;
    }

    Object.entries(json).forEach(([key, value]) => {
      if (IsDataTypeUtil.IsObject(json[key]) && json[key]) {
        this.FlattenMap(json[key], map, (dotnotation ? dotnotation + '.' : '') + key);
      } else {
       map.set((dotnotation ? dotnotation + '.' : '') + key, json[key]);
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
        const dotNotation: string = key[match.index + match[0].length];
        let keyName: string = match[1];

        if (!dotNotation) { // nothing more, store value in oi[keyName]
          oi[keyName] = value;
      } else {
          if (keyName) {
            if (!oi.hasOwnProperty(keyName)) {
              oi[keyName] = dotNotation === '[' ? [] : {};
            }
        } else {
          keyName = match[2].slice(1, -1);
          if (!oi.hasOwnProperty(keyName)) {
            oi[keyName] = dotNotation === '[' ? [] : {};
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

          const dotNotation: string = key[match.index + match[0].length];
          let keyName: string = match[1];

          if (!dotNotation) { // nothing more, store value in oi[keyName]
              oi[keyName] = value;
          } else {
              if (keyName) {
                if (!oi.hasOwnProperty(keyName)) {
                  oi[keyName] = dotNotation === '[' ? [] : {};
                }
            } else {
              keyName = match[2].slice(1, -1);
              if (!oi.hasOwnProperty(keyName)) {
                oi[keyName] = dotNotation === '[' ? [] : {};
              }
            }
          }
          oi = oi[keyName];
        }
      });
      return returnObject;
    }
 }
