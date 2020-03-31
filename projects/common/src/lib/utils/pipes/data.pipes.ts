import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe, DecimalPipe, PercentPipe } from '@angular/common';
import { DataPipeConstants } from '../constants/data-pipe.constants';
import { TemperatureConversion } from '../conversion/temperature.conversion';


@Pipe({
  name: 'dataPipes'
})

/**
 * Pipes for datagrid values
 */
export class DataPipes implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }

    /**
     * Return date
     */
    if (args.toLowerCase() === DataPipeConstants.PIPE_DATE) {
      const pipe = new DatePipe('en-US');
      const transformed = pipe.transform(value, DataPipeConstants.DATE_FMT);
      return transformed;
    }

    /**
     * Return date M/d/YYYY
     */
    if (args.toLowerCase() === DataPipeConstants.PIPE_SHORTDATE) {
      const pipe = new DatePipe('en-US');
      const transformed = pipe.transform(value, DataPipeConstants.DATE_SHORTDATE);
      return transformed;
    }

    /**
     * Return date MMM d, y
     */
    if (args.toLowerCase() === DataPipeConstants.PIPE_MEDIUMDATE) {
      const pipe = new DatePipe('en-US');
      const transformed = pipe.transform(value, DataPipeConstants.DATE_MEDIUMDATE);
      return transformed;
    }

    /**
     * Return date 'EEEE, MMMM d, y'
     */
    if (args.toLowerCase() === DataPipeConstants.PIPE_FULLDATE) {
      const pipe = new DatePipe('en-US');
      const transformed = pipe.transform(value, DataPipeConstants.DATE_FULLDATE);
      return transformed;
    }

    /**
     * Return date from epoch value
     */
    if (args.toLowerCase() === DataPipeConstants.PIPE_EPOCH) {
      const pipe = new DatePipe('en-US');
      const transformed = pipe.transform(value * 1000, DataPipeConstants.DATE_DAY_TIME);
      return transformed;
    }

    /**
     * Return number with decimal
     */
    if (args.toLowerCase() === DataPipeConstants.PIPE_NUMBER) {
      const pipe = new DecimalPipe('en-US');
      const transformed = pipe.transform(value, '1.0-0');
      return transformed;
    }

    /**
     * Return return number with mph appended
     */
    if (args.toLowerCase() === DataPipeConstants.PIPE_MPH) {
      const pipe = new DecimalPipe('en-US');
      const transformed = pipe.transform(value, '1.0-0');
      return transformed + ' mph';
    }

    /**
     * Return percentage
     */
    if (args.toLowerCase() === DataPipeConstants.PIPE_PERCENTAGE) {
      const pipe = new PercentPipe('en-US');
      const transformed = pipe.transform(value);
      return transformed;
    }

    /**
     * Return percentage
     */
    if (args.toLowerCase() === DataPipeConstants.PIPE_PERCENTAGE_DECIMAL) {
      const pipe = new PercentPipe('en-US');
      const transformed = pipe.transform(value, '2.2-2');
      return transformed;
    }

    /**
     * Return percentage with two decimals
     */
    if (args.toLowerCase() === DataPipeConstants.PIPE_DECIMAL_TWO) {
      const pipe = new DecimalPipe('en-US');
      const transformed = pipe.transform(value, '1.2-2');
      return transformed;
    }

    /**
     * Return percentage with four decimals
     */
    if (args.toLowerCase() === DataPipeConstants.PIPE_DECIMAL_FOUR) {
      const pipe = new DecimalPipe('en-US');
      const transformed = pipe.transform(value, '1.4-4');
      return transformed;
    }

    /**
     * Return temperature in fahrenheit, append °F
     */
    if (args.toLowerCase() === DataPipeConstants.PIPE_TEMP_FAHRENHEIT) {
      const pipe = new DecimalPipe('en-US');
      // const temperature = (value * 32) + 1.8;
      const transformed = pipe.transform(value, '1.0-0');

      return transformed + ' °F';
    }

    /**
     * Return temperature in kelvin, append °K
     */
    if (args.toLowerCase() === DataPipeConstants.PIPE_TEMP_KELVIN) {
      const pipe = new DecimalPipe('en-US');
      // const temperature = (value * 32) + 1.8;
      const temperature = TemperatureConversion.FahrenheitToKelvin(value);
      const transformed = pipe.transform(temperature, '1.0-0');

      return transformed + ' °K';
    }

    /**
     * Return temperature in celsius, append °C
     */
    if (args.toLowerCase() === DataPipeConstants.PIPE_TEMP_CELSIUS) {
      const pipe = new DecimalPipe('en-US');
      const temperature = TemperatureConversion.FahrenheitToCelsius(value);
      const transformed = pipe.transform(temperature, '1.0-0');

      return transformed + ' °C';
    }


    /**
     * IF none of the above work, return the original value
     */
    return value;
  }
}
