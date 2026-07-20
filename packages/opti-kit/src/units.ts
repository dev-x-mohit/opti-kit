/**
 * Converts Celsius to Fahrenheit.
 */
export function celsiusToFahrenheit(c: number): number {
  return (c * 9) / 5 + 32;
}

/**
 * Converts Fahrenheit to Celsius.
 */
export function fahrenheitToCelsius(f: number): number {
  return ((f - 32) * 5) / 9;
}

/**
 * Converts miles to kilometers.
 */
export function milesToKilometers(miles: number): number {
  return miles * 1.609344;
}

/**
 * Converts kilometers to miles.
 */
export function kilometersToMiles(km: number): number {
  return km / 1.609344;
}

/**
 * Converts pounds to kilograms.
 */
export function poundsToKilograms(lbs: number): number {
  return lbs * 0.45359237;
}

/**
 * Converts kilograms to pounds.
 */
export function kilogramsToPounds(kg: number): number {
  return kg / 0.45359237;
}

/**
 * Converts degrees to radians.
 */
export function degreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/**
 * Converts radians to degrees.
 */
export function radiansToDegrees(radians: number): number {
  return (radians * 180) / Math.PI;
}
