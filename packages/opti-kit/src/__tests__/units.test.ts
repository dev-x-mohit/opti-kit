import { describe, it, expect } from "vitest";
import {
  celsiusToFahrenheit,
  fahrenheitToCelsius,
  milesToKilometers,
  kilometersToMiles,
  poundsToKilograms,
  kilogramsToPounds,
  degreesToRadians,
  radiansToDegrees,
} from "../units";

describe("Units Module", () => {
  it("celsiusToFahrenheit", () => {
    expect(celsiusToFahrenheit(0)).toBe(32);
    expect(celsiusToFahrenheit(100)).toBe(212);
  });

  it("fahrenheitToCelsius", () => {
    expect(fahrenheitToCelsius(32)).toBe(0);
    expect(fahrenheitToCelsius(212)).toBe(100);
  });

  it("milesToKilometers", () => {
    expect(milesToKilometers(1)).toBeCloseTo(1.60934);
  });

  it("kilometersToMiles", () => {
    expect(kilometersToMiles(1.609344)).toBe(1);
  });

  it("poundsToKilograms", () => {
    expect(poundsToKilograms(1)).toBeCloseTo(0.45359);
  });

  it("kilogramsToPounds", () => {
    expect(kilogramsToPounds(0.45359237)).toBe(1);
  });

  it("degreesToRadians", () => {
    expect(degreesToRadians(180)).toBe(Math.PI);
    expect(degreesToRadians(90)).toBe(Math.PI / 2);
  });

  it("radiansToDegrees", () => {
    expect(radiansToDegrees(Math.PI)).toBe(180);
    expect(radiansToDegrees(Math.PI / 2)).toBe(90);
  });
});
