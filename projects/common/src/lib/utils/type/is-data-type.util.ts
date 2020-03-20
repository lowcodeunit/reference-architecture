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
    public static IsString(value: any): boolean {
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
    public static IsNumber(value: any): boolean {
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
    public static IsArray(value: any): boolean {
        return value && typeof value === 'object' && value.constructor === Array;
    }

    /**
     * Check for function
     *
     * @param value value to test
     */
    public static IsFunction(value: any): boolean {
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
    public static IsObject(value: any): boolean {
        return value && typeof value === 'object' && value.constructor === Object;
    }

    /**
     * Check for null
     *
     * @param value value to test
     */
    public static IsNull(value: any): boolean {
        return value === null;
    }

    /**
     * Check for undefined
     *
     * @param value value to test
     */
    public static IsUndefined(value: any): boolean {
        return value === 'undefined';
    }

    /**
     * Check for boolean
     *
     * @param value value to test
     */
    public static IsBoolean(value: any): boolean {
        return typeof value === 'boolean';
    }

    /**
     * Check for regex
     *
     * RegEx's are object, so check against its constructor
     *
     * @param value value to test
     */
    public static IsRegEx(value: any): boolean {
        return value && typeof value === 'object' && value.constructor === RegExp;
    }

    /**
     * Check for Date
     *
     * Date ins't really a data type in JS, so to check a Date Object use 'instanceof.'
     *
     * @param value value to test
     */
    public static IsData(value: any): boolean {
        return value instanceof Date;
    }

    /**
     * Check for Symbol
     *
     * New datatype in ES6
     *
     * @param value value to test
     */
    public static IsSymbol(value: any): boolean {
        return typeof value === 'symbol';
    }

    /**
     * Find out what kind of datatype you have
     *
     * @param value value to test
     */
    public static GetDataType(value: any): string {
        if (this.IsArray(value)) { return 'array';
        } else if (this.IsBoolean(value)) { return 'boolean';
        } else if (this.IsData(value)) { return 'data';
        } else if (this.IsFunction(value)) { return 'function';
        } else if (this.IsNull(value)) { return 'null';
        } else if (this.IsNumber(value)) { return 'number';
        } else if (this.IsObject(value)) { return 'object';
        } else if (this.IsRegEx(value)) { return 'regex';
        } else if (this.IsString(value)) { return 'string';
        } else if (this.IsSymbol(value)) { return 'symbol';
        } else if (this.IsUndefined(value)) { return 'undefined';
        } else { throw new Error('No Datatype found'); }
    }
}
