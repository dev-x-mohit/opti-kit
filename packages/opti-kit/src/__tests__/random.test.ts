import { describe, it, expect } from "vitest";
import {
  randomUUID, randomColor, randomBoolean, randomFloat, randomItem,
  randomIntFast, randomString, randomSample, weightedRandom
} from "../random";

describe("random", () => {
  it("randomUUID", () => {
    const uuid = randomUUID();
    expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  });

  it("randomColor", () => {
    const color = randomColor();
    expect(color).toMatch(/^#[0-9a-f]{6}$/);
  });

  it("randomBoolean", () => {
    const result = randomBoolean();
    expect(typeof result).toBe("boolean");
  });

  it("randomFloat", () => {
    const val = randomFloat(1, 10);
    expect(val).toBeGreaterThanOrEqual(1);
    expect(val).toBeLessThan(10);
  });

  it("randomItem", () => {
    expect(randomItem([1, 2, 3])).toBeDefined();
    expect(randomItem([])).toBeUndefined();
  });

  it("randomIntFast", () => {
    for (let i = 0; i < 50; i++) {
      const val = randomIntFast(1, 10);
      expect(val).toBeGreaterThanOrEqual(1);
      expect(val).toBeLessThanOrEqual(10);
      expect(Number.isInteger(val)).toBe(true);
    }
  });

  it("randomString", () => {
    const str = randomString(16);
    expect(str).toHaveLength(16);
    expect(str).toMatch(/^[A-Za-z0-9]+$/);

    const custom = randomString(8, "abc");
    expect(custom).toHaveLength(8);
    expect(custom).toMatch(/^[abc]+$/);
  });

  it("randomSample", () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const sample = randomSample(arr, 3);
    expect(sample).toHaveLength(3);
    // All items should be unique
    expect(new Set(sample).size).toBe(3);
    // All items should come from the original array
    sample.forEach((s) => expect(arr).toContain(s));

    // Requesting more than array length returns all items
    const all = randomSample([1, 2], 5);
    expect(all).toHaveLength(2);
  });

  it("weightedRandom", () => {
    const items = [
      { value: "a", weight: 100 },
      { value: "b", weight: 0 },
    ];
    // With weight 100 vs 0, should almost always return "a"
    for (let i = 0; i < 20; i++) {
      expect(weightedRandom(items)).toBe("a");
    }
    expect(weightedRandom([])).toBeUndefined();
  });
});
