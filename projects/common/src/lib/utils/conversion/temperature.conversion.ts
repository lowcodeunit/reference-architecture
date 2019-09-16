// @dynamic

/**
 * @dynamic is used because this class contains static properties
 */

export class TemperatureConversion {

    /**
     * Convert fahrenheit to celsius
     * @param val fahrenheit value
     */
    public static FahrenheitToCelsius(val: number): number {
        return (val - 32) / 1.8;
    }

    /**
     * Convert fahrenheit to kelvin
     * @param val fahrenheit value
     */
    public static FahrenheitToKelvin(val: number): number {
        return ((val - 32) / 1.8) + 273.15;
    }

    /**
     * Convert celsius to fahrenheit
     * @param val celsius value
     */
    public static CelsiusToFahrenheit(val: number): number {
        return (val * 1.8) + 32;
    }

    /**
     * Convert celsius to kelvin
     * @param val celsius value
     */
    public static CelsiusToKelvin(val: number): number {
        return val + 273.15;
    }

    /**
     * Convert kelvin to fahrenheit
     * @param val kelvin value
     */
    public static KelvinToFahrenheit(val: number): number {
        return ((val - 273.15) * 1.8 ) + 32;
    }

    /**
     * Convert kelvin to celsius
     * @param val kelvin value
     */
    public static KelvinToCelsius(val: number): number {
        return val - 273.15;
    }
}