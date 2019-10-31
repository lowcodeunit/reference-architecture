// @dynamic

/**
 * @dynamic is used because this class contains static properties
 */

/**
 * For checking data types
 */

export class IsDataTypeUtil {

    /**
     * Check for string
     *
     * (new string) typeof will return object, so check for that with instanceof
     *
     * @param value value to test
     */
    public static IsString(value): boolean {
        return typeof value === 'string' || value instanceof String;
    }

    /**
     * Check for number
     *
     * More than 'number' will be returned, like: 'NaN' and 'Infinity,' so to be sure
     * a value is a number use the function isFinite()
     *
     * @param value value to test
     */
    public static IsNumber(value): boolean {
        return typeof value === 'number' && isFinite(value);
    }

    /**
     * Check for array
     *
     * An array is returned as an object, to check if it's really an array
     * its constructor can be compared to 'Array.'
     *
     * ES5 has a method for this: Array.isArray(value)
     *
     * @param value value to test
     */
    public static IsArray(value): boolean {
        return value && typeof value === 'object' && value.constructor === Array;
    }

    /**
     * Check for function
     *
     * @param value value to test
     */
    public static IsFunction(value): boolean {
        return typeof value === 'function';
    }

    /**
     * Check for Object
     *
     * A lot of items can be objects, so to test that an item can have
     * properties and be looped through, compare its constructor with 'Object.'
     *
     * @param value value to test
     */
    public static IsObject(value): boolean {
        return value && typeof value === 'object' && value.constructor === Object;
    }

    /**
     * Check for null
     *
     * @param value value to test
     */
    public static IsNull(value): boolean {
        return value === null;
    }

    /**
     * Check for undefined
     *
     * @param value value to test
     */
    public static IsUndefined(value): boolean {
        return value === 'undefined';
    }

    /**
     * Check for boolean
     *
     * @param value value to test
     */
    public static IsBoolean(value): boolean {
        return typeof value === 'boolean';
    }

    /**
     * Check for regex
     *
     * RegEx's are object, so check against its constructor
     *
     * @param value value to test
     */
    public static IsRegEx(value): boolean {
        return value && typeof value === 'object' && value.constructor === RegExp;
    }

    /**
     * Check for Date
     *
     * Date ins't really a data type in JS, so to check a Date Object use 'instanceof.'
     *
     * @param value value to test
     */
    public static IsData(value): boolean {
        return value instanceof Date;
    }

    /**
     * Check for Symbol
     *
     * New datatype in ES6
     *
     * @param value value to test
     */
    public static IsSymbol(value): boolean {
        return typeof value === 'symbol';
    }

    /**
     * Find out what kind of datatype you have
     *
     * @param value value to test
     */
    public static WhatType(value): string {
        switch (value) {
            case this.IsArray(value): {
                return 'array';
                break;
            }

            case this.IsBoolean(value): {
                return 'boolean';
                break;
            }

            case this.IsData(value): {
                return 'data';
                break;
            }

            case this.IsFunction(value): {
                return 'function';
                break;
            }

            case this.IsNull(value): {
                return 'null';
                break;
            }

            case this.IsNumber(value): {
                return 'number';
                break;
            }

            case this.IsObject(value): {
                return 'string';
                break;
            }

            case this.IsRegEx(value): {
                return 'regex';
                break;
            }

            case this.IsString(value): {
                return 'boolean';
                break;
            }

            case this.IsSymbol(value): {
                return 'symbol';
                break;
            }

            case this.IsUndefined(value): {
                return 'undefined';
                break;
            }

            default: {
                throw new Error('No Datatype found');
            }
        }
    }
}
