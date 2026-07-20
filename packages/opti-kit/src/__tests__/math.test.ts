import { describe, it, expect } from "vitest";
import {
  clamp,
  lerp,
  random,
  round,
  sum,
  mean,
  max,
  min,
  add,
  subtract,
  multiply,
  divide,
  ceil,
  floor,
  factorial,
  fibonacci,
  isPrime,
  degreesToRadians,
  radiansToDegrees,
  mapRange,
  distance,
  dotProduct,
  euclideanDistance,
  cosineSimilarity,
  gcd,
  lcm,
  power,
  abs,
  sign,
  hypot,
  mode,
} from "../math";

describe("math utilities", () => {
  it("clamp", () => {
    expect(clamp(5, 1, 10)).toBe(5);
    expect(clamp(0, 1, 10)).toBe(1);
    expect(clamp(15, 1, 10)).toBe(10);
  });

  it("lerp", () => {
    expect(lerp(10, 20, 0.5)).toBe(15);
    expect(lerp(10, 20, 0)).toBe(10);
    expect(lerp(10, 20, 1)).toBe(20);
  });

  it("random", () => {
    const intVal = random(5, 10);
    expect(intVal).toBeGreaterThanOrEqual(5);
    expect(intVal).toBeLessThan(10);
    expect(Number.isInteger(intVal)).toBe(true);

    const floatVal = random(5, 10, true);
    expect(floatVal).toBeGreaterThanOrEqual(5);
    expect(floatVal).toBeLessThan(10);
  });

  it("round", () => {
    expect(round(1.2345, 2)).toBe(1.23);
    expect(round(1.2365, 2)).toBe(1.24);
    expect(round(1.5)).toBe(2);
  });

  it("sum", () => {
    expect(sum([1, 2, 3, 4])).toBe(10);
    expect(sum([])).toBe(0);
  });

  it("mean", () => {
    expect(mean([1, 2, 3, 4])).toBe(2.5);
    expect(mean([])).toBe(0);
  });

  it("max", () => {
    expect(max([4, 2, 8, 6])).toBe(8);
    expect(max([])).toBeUndefined();
  });

  it("min", () => {
    expect(min([4, 2, 8, 6])).toBe(2);
    expect(min([])).toBeUndefined();
  });

  it("add, subtract, multiply, divide", () => {
    expect(add(6, 4)).toBe(10);
    expect(subtract(6, 4)).toBe(2);
    expect(multiply(6, 4)).toBe(24);
    expect(divide(6, 4)).toBe(1.5);
  });

  it("ceil", () => {
    expect(ceil(4.006)).toBe(5);
    expect(ceil(6.014, 2)).toBe(6.02);
  });

  it("floor", () => {
    expect(floor(4.006)).toBe(4);
    expect(floor(0.046, 2)).toBe(0.04);
  });

  it("factorial", () => {
    expect(factorial(5)).toBe(120);
    expect(factorial(0)).toBe(1);
    expect(factorial(-1)).toBeNaN();
  });

  it("fibonacci", () => {
    expect(fibonacci(0)).toBe(0);
    expect(fibonacci(1)).toBe(1);
    expect(fibonacci(5)).toBe(5);
    expect(fibonacci(10)).toBe(55);
    expect(fibonacci(-1)).toBeNaN();
  });

  it("isPrime", () => {
    expect(isPrime(2)).toBe(true);
    expect(isPrime(4)).toBe(false);
    expect(isPrime(17)).toBe(true);
    expect(isPrime(1)).toBe(false);
    expect(isPrime(-5)).toBe(false);
  });

  it("degreesToRadians and radiansToDegrees", () => {
    expect(degreesToRadians(180)).toBeCloseTo(Math.PI);
    expect(radiansToDegrees(Math.PI)).toBeCloseTo(180);
  });

  it("mapRange", () => {
    expect(mapRange(5, 0, 10, 0, 100)).toBe(50);
  });

  it("distance", () => {
    expect(distance({ x: 0, y: 0 }, { x: 3, y: 4 })).toBe(5);
    expect(distance({ x: 0, y: 0, z: 0 }, { x: 1, y: 2, z: 2 })).toBe(3);
  });

  it("dotProduct", () => {
    expect(dotProduct([1, 2, 3], [4, -5, 6])).toBe(1 * 4 + 2 * -5 + 3 * 6);
    expect(() => dotProduct([1], [1, 2])).toThrow();
  });

  it("euclideanDistance", () => {
    expect(euclideanDistance([0, 0], [3, 4])).toBe(5);
    expect(() => euclideanDistance([1], [1, 2])).toThrow();
  });

  it("cosineSimilarity", () => {
    expect(cosineSimilarity([1, 2, 3], [2, 4, 6])).toBeCloseTo(1);
    expect(cosineSimilarity([1, 0], [0, 1])).toBeCloseTo(0);
    expect(cosineSimilarity([1, 2], [-1, -2])).toBeCloseTo(-1);
    expect(cosineSimilarity([0, 0], [1, 1])).toBe(0);
  });

  it("gcd and lcm", () => {
    expect(gcd(12, 18)).toBe(6);
    expect(gcd(-12, 18)).toBe(6);
    expect(lcm(4, 6)).toBe(12);
    expect(lcm(0, 5)).toBe(0);
  });

  it("power, abs, sign, hypot", () => {
    expect(power(2, 3)).toBe(8);
    expect(abs(-5)).toBe(5);
    expect(sign(-10)).toBe(-1);
    expect(sign(10)).toBe(1);
    expect(hypot(3, 4)).toBe(5);
  });

  it("mode", () => {
    expect(mode([1, 2, 2, 3, 4])).toEqual([2]);
    expect(mode([])).toEqual([]);
  });
});
