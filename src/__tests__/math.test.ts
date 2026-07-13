import { describe, it, expect } from "vitest";
import { clamp, lerp, random, round, sum, mean } from "../math";

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
});
