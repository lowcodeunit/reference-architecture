import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe, DecimalPipe, PercentPipe } from '@angular/common';
import { DataPipeConstants } from '../constants/data-pipe.constants';
import { TemperatureConversion } from '../conversion/temperature.conversion';
import { TimezoneConversion } from '../conversion/timezone.conversion';


@Pipe({
  name: 'dataPipes'
})

/**
 * Custom transfomration pipes
 *
 * @param val value to be returned transformed
 * @param arg argument containing format string ('dd/MMM/yyyy')
 *
 * Ex.
 * // constants outside of a component need to be assigned
 * // to a local property in order to work
 *
 * const dateFmt: string = DataPipeConstants.DATE_FMT;
 * <span>{{ val | dataPipes:dateFmt }}</span>
 */
export class DataPipes implements PipeTransform {

  transform(val: any , arg?: string): any {

    if (!arg) {
      return val;
    }

    const format: string = arg.toLowerCase();

    /**
     * Return date M/d/YYYY
     */
    if (format === DataPipeConstants.PIPE_SHORTDATE) {

      const pipe = new DatePipe('en-US');

      const transformed = pipe.transform(val, DataPipeConstants.DATE_SHORTDATE);

      return transformed;
    }

    /**
     * Return date
     */
    if (format === DataPipeConstants.PIPE_DATE.toLowerCase()) {

      const pipe = new DatePipe('en-US');

      const transformed = pipe.transform(val, DataPipeConstants.DATE_FMT);

      return transformed;
    }

    /**
     * Return date MMM d, y
     */
    if (format === DataPipeConstants.PIPE_MEDIUMDATE.toLowerCase()) {

      const pipe = new DatePipe('en-US');

      const transformed = pipe.transform(val, 'MMM d, y');

      return transformed;
    }

    /**
     * Return date 'EEEE, MMMM d, y'
     */
    if (format === DataPipeConstants.PIPE_FULLDATE.toLowerCase()) {

      const pipe = new DatePipe('en-US');

      const transformed = pipe.transform(val, DataPipeConstants.DATE_FULLDATE);

      return transformed;
    }
    /**
     * Return MM/dd/yyyy hh:mm:ss a z
     */
    if (format === DataPipeConstants.DATE_TIME_ZONE_FMT.toLowerCase()) {

      const pipe = new DatePipe('en-US');

      const transformed = pipe.transform(val, DataPipeConstants.DATE_TIME_ZONE_FMT);

      const splittedString = transformed.toString().split(' ');

      splittedString[splittedString.length - 1 ] = TimezoneConversion.GMTTimezoneConversion(splittedString[splittedString.length-1]);

      let newDateString: string = '';

      splittedString.forEach(st => {
        if (splittedString.indexOf(st) < splittedString.length - 1) {
          newDateString += st + ' ';
        } else {
          newDateString += st;
        }
      });

      return newDateString;
    }

    /**
     * Return date from epoch val
     */
    if (format === DataPipeConstants.PIPE_EPOCH.toLowerCase()) {

      const pipe = new DatePipe('en-US');

      const transformed = pipe.transform(val * 1000, DataPipeConstants.DATE_DAY_TIME);
      
      return transformed;
    }

    /**
     * Return number with decimal
     */
    if (format === DataPipeConstants.PIPE_NUMBER.toLowerCase()) {

      const pipe = new DecimalPipe('en-US');

      const transformed = pipe.transform(val, '1.0-0');

      return transformed;
    }

    /**
     * Return return number with mph appended
     */
    if (format === DataPipeConstants.PIPE_MPH.toLowerCase()) {

      const pipe = new DecimalPipe('en-US');

      const transformed = pipe.transform(val, '1.0-0');

      return transformed + ' mph';
    }

    /**
     * Return percentage
     */
    if (format === DataPipeConstants.PIPE_PERCENTAGE.toLowerCase()) {
      
      const pipe = new PercentPipe('en-US');

      const transformed = pipe.transform(val);

      return transformed;
    }

    /**
     * Return percentage
     */
    if (format === DataPipeConstants.PIPE_PERCENTAGE_DECIMAL.toLowerCase()) {

      const pipe = new PercentPipe('en-US');

      const transformed = pipe.transform(val, '2.2-2');

      return transformed;
    }

    /**
     * Return percentage with two decimals
     */
    if (format === DataPipeConstants.PIPE_DECIMAL_TWO.toLowerCase()) {

      const pipe = new DecimalPipe('en-US');

      const transformed = pipe.transform(val, '1.2-2');

      return transformed;
    }

    /**
     * Return percentage with four decimals
     */
    if (format === DataPipeConstants.PIPE_DECIMAL_FOUR.toLowerCase()) {

      const pipe = new DecimalPipe('en-US');

      const transformed = pipe.transform(val, '1.4-4');

      return transformed;
    }

    /**
     * Return temperature in fahrenheit, append °F
     */
    if (format === DataPipeConstants.PIPE_TEMP_FAHRENHEIT.toLowerCase()) {

      const pipe = new DecimalPipe('en-US');

      // const temperature = (val * 32) + 1.8;

      const transformed = pipe.transform(val, '1.0-0');

      return transformed + ' °F';
    }

    /**
     * Return temperature in kelvin, append °K
     */
    if (format === DataPipeConstants.PIPE_TEMP_KELVIN.toLowerCase()) {

      const pipe = new DecimalPipe('en-US');

      // const temperature = (val * 32) + 1.8;

      const temperature = TemperatureConversion.FahrenheitToKelvin(val);

      const transformed = pipe.transform(temperature, '1.0-0');

      return transformed + ' °K';
    }

    /**
     * Return temperature in celsius, append °C
     */
    if (format === DataPipeConstants.PIPE_TEMP_CELSIUS.toLowerCase()) {

      const pipe = new DecimalPipe('en-US');

      const temperature = TemperatureConversion.FahrenheitToCelsius(val);

      const transformed = pipe.transform(temperature, '1.0-0');

      return transformed + ' °C';
    }

    /**
     * IF none of the above work, return the original val
     */
    return val;
  }
}
