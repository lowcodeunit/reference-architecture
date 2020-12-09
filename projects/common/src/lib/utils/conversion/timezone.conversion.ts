// @dynamic

/**
 * @dynamic is used because this class contains static properties
 */

export class TimezoneConversion {
/**
     * Convert gmt time zone to actual timezone
     * @param val fahrenheit value
     */
    public static GMTTimezoneConversion(gmt: string): string {
        switch(gmt){
            case 'GMT':
                return 'GMT';

            case 'GMT+1:00':
                return 'ECT';
            
            case 'GMT+2:00':
                return 'EET';

            case 'GMT+3:00':
                return 'EAT';

            case 'GMT+3:30':
                return 'MET';

            case 'GMT+4:00':
                return 'NET';

            case 'GMT+5:00':
                return 'PLT';

            case 'GMT+5:30':
                return 'IST';

            case 'GMT+6:00':
                return 'BST';

            case 'GMT+7:00':
                return 'VST';

            case 'GMT+8:00':
                return 'CTT';

            case 'GMT+9:00':
                return 'JST';

            case 'GMT+9:30':
                return 'ACT';

            case 'GMT+10:00':
                return 'AET';

            case 'GMT+11:00':
                return 'SST';

            case 'GMT+12:00':
                return 'NST';

            case 'GMT-11:00':
                return 'MIT';

            case 'GMT-10:00':
                return 'HST';

            case 'GMT-9:00':
                return 'AST';

            case 'GMT-8:00':
                return 'PST';

            case 'GMT-7:00':
                return 'MST';

            case 'GMT-6:00':
                return 'CST';

            case 'GMT-5:00':
                return 'EST';

            case 'GMT-4:00':
                return 'PRT';

            case 'GMT-3:30':
                return 'CNT';

            case 'GMT-3:00':
                return 'AGT';

            case 'GMT-1:00':
                return 'CAT';

            default:
                return gmt;

        }
    }

}