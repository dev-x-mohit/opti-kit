import { describe, it, expect } from "vitest";
import {
  invertMap,
  setUnion,
  setIntersection,
  setDifference,
} from "../collection";

describe("Collection Module", () => {
  it("invertMap", () => {
    const obj = { a: 1, b: 2, c: 1 };
    // 'c' overwrites 'a' since both have value 1
    expect(invertMap(obj)).toEqual({ '1': 'c', '2': 'b' });
  });

  it("setUnion", () => {
    const a = new Set([1, 2, 3]);
    const b = new Set([3, 4, 5]);
    expect(Array.from(setUnion(a, b))).toEqual([1, 2, 3, 4, 5]);
  });

  it("setIntersection", () => {
    const a = new Set([1, 2, 3]);
    const b = new Set([3, 4, 5]);
    expect(Array.from(setIntersection(a, b))).toEqual([3]);
  });

  it("setDifference", () => {
    const a = new Set([1, 2, 3]);
    const b = new Set([3, 4, 5]);
    expect(Array.from(setDifference(a, b))).toEqual([1, 2]);
  });
});
