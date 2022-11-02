// @dynamic

import * as moment from 'moment';

/**
 * @dynamic is used because this class contains static properties
 */

export class TimezoneConversion {
    /**
         * Convert gmt time zone to actual timezone
         * @param val gmt timezone value
         */
    public static GMTTimezoneConversion(gmt: string): string {
        if (moment().isDST()) {
            const num = gmt.slice(-1);
            const newNum = parseInt(num) + 1;
            gmt = gmt.replace(num, newNum.toString());
        }
        switch (gmt) {
            case 'GMT':
                return 'GMT';

            case 'GMT+1':
                return 'ECT';

            case 'GMT+2':
                return 'EET';

            case 'GMT+3':
                return 'EAT';

            case 'GMT+3:30':
                return 'MET';

            case 'GMT+4':
                return 'NET';

            case 'GMT+5':
                return 'PLT';

            case 'GMT+5:30':
                return 'IST';

            case 'GMT+6':
                return 'BST';

            case 'GMT+7':
                return 'VST';

            case 'GMT+8':
                return 'CTT';

            case 'GMT+9':
                return 'JST';

            case 'GMT+9:30':
                return 'ACT';

            case 'GMT+10':
                return 'AET';

            case 'GMT+11':
                return 'SST';

            case 'GMT+12':
                return 'NST';

            case 'GMT-11':
                return 'MIT';

            case 'GMT-10':
                return 'HST';

            case 'GMT-9':
                return 'AST';

            case 'GMT-8':
                return 'PST';

            case 'GMT-7':
                return 'MST';

            case 'GMT-6':
                return 'CST';

            case 'GMT-5':
                return 'EST';

            case 'GMT-4':
                return 'PRT';

            case 'GMT-3:30':
                return 'CNT';

            case 'GMT-3':
                return 'AGT';

            case 'GMT-1':
                return 'CAT';

            default:
                return gmt;

        }
    }

}