import { describe, it, expect } from "vitest";
import {
  invertMap, setUnion, setIntersection, setDifference,
  symmetricDifference, mergeMaps, frequencies, filterMap,
  mapRecordValues, filterRecord, isSubset, isSuperset
} from "../collection";

describe("collection", () => {
  it("invertMap", () => {
    expect(invertMap({ a: "1", b: "2" })).toEqual({ "1": "a", "2": "b" });
  });

  it("setUnion", () => {
    expect(setUnion(new Set([1, 2]), new Set([2, 3]))).toEqual(new Set([1, 2, 3]));
  });

  it("setIntersection", () => {
    expect(setIntersection(new Set([1, 2, 3]), new Set([2, 3, 4]))).toEqual(new Set([2, 3]));
  });

  it("setDifference", () => {
    expect(setDifference(new Set([1, 2, 3]), new Set([2, 3]))).toEqual(new Set([1]));
  });

  it("symmetricDifference", () => {
    expect(symmetricDifference(new Set([1, 2, 3]), new Set([2, 3, 4]))).toEqual(new Set([1, 4]));
    expect(symmetricDifference(new Set([1, 2]), new Set([1, 2]))).toEqual(new Set());
  });

  it("mergeMaps", () => {
    const a = new Map([["x", 1], ["y", 2]]);
    const b = new Map([["y", 99], ["z", 3]]);
    const merged = mergeMaps(a, b);
    expect(merged.get("x")).toBe(1);
    expect(merged.get("y")).toBe(99);
    expect(merged.get("z")).toBe(3);
  });

  it("frequencies", () => {
    const freq = frequencies(["a", "b", "a", "c", "a", "b"]);
    expect(freq.get("a")).toBe(3);
    expect(freq.get("b")).toBe(2);
    expect(freq.get("c")).toBe(1);
  });

  it("filterMap", () => {
    const result = filterMap([1, 2, 3, 4, 5], (x) => (x % 2 === 0 ? x * 10 : undefined));
    expect(result).toEqual([20, 40]);
    expect(filterMap([], () => 1)).toEqual([]);
  });

  it("mapRecordValues", () => {
    expect(mapRecordValues({ a: 1, b: 2 }, (v) => v * 10)).toEqual({ a: 10, b: 20 });
  });

  it("filterRecord", () => {
    expect(filterRecord({ a: 1, b: 2, c: 3 }, (v) => v > 1)).toEqual({ b: 2, c: 3 });
  });

  it("isSubset", () => {
    expect(isSubset(new Set([1, 2]), new Set([1, 2, 3]))).toBe(true);
    expect(isSubset(new Set([1, 4]), new Set([1, 2, 3]))).toBe(false);
    expect(isSubset(new Set(), new Set([1]))).toBe(true);
  });

  it("isSuperset", () => {
    expect(isSuperset(new Set([1, 2, 3]), new Set([1, 2]))).toBe(true);
    expect(isSuperset(new Set([1, 2]), new Set([1, 2, 3]))).toBe(false);
  });
});
