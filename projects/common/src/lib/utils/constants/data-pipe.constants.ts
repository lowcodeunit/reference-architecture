// @dynamic
/**
 * @dynamic need this because there are static memebers
 *
 * Data pipe constants
 */

export class DataPipeConstants {
    public static readonly DATE_FMT = 'dd/MMM/yyyy';
    public static readonly DATE_SHORTDATE = 'M/d/yy';
    public static readonly DATE_MEDIUMDATE = 'MMM d, y';
    public static readonly DATE_FULLDATE = 'EEEE, MMMM d, y';
    public static readonly DATE_TIME_FMT = `${DataPipeConstants.DATE_FMT} hh:mm:ss`;
    public static readonly DATE_TIME_ZONE_FMT = 'MM/dd/yyyy hh:mm:ss a z';
    public static readonly DATE_DAY_TIME = 'EEE h a';
    public static readonly PIPE_DATE = 'date';
    public static readonly PIPE_SHORTDATE = 'shortdate';
    public static readonly PIPE_MEDIUMDATE = 'mediumdate';
    public static readonly PIPE_FULLDATE = 'fulldate';
    public static readonly PIPE_DECIMAL_TWO = 'decimalTwo';
    public static readonly PIPE_DECIMAL_FOUR = 'decimalfour';
    public static readonly PIPE_EPOCH = 'epoch';
    public static readonly PIPE_NUMBER = 'number';
    public static readonly PIPE_PERCENTAGE = 'percentage';
    public static readonly PIPE_PERCENTAGE_DECIMAL = 'percentagedecimal';
    public static readonly PIPE_TEMP_FAHRENHEIT = 'fahrenheit';
    public static readonly PIPE_TEMP_CELSIUS = 'celsius';
    public static readonly PIPE_TEMP_KELVIN = 'kelvin';
    public static readonly PIPE_MPH = 'mph';
}