import { describe, it, expect } from "vitest";
import {
  pick,
  omit,
  get,
  deepClone,
  deepMerge,
  has,
  isEqual,
  size,
  invert,
  toPairs,
  fromPairs,
  clone,
  pickBy,
  omitBy,
  findKey,
  findLastKey,
  forOwn,
  invoke,
  keys,
  values,
  entries,
  fromEntries,
  isEmpty,
  defaults,
  filterKeys,
  filterValues,
  compactObject,
} from "../object";

describe("object utilities", () => {
  it("pick", () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(pick(obj, ["a", "c"])).toEqual({ a: 1, c: 3 });
    expect(pick(obj, ["d" as any])).toEqual({});
  });

  it("omit", () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(omit(obj, ["b"])).toEqual({ a: 1, c: 3 });
  });

  it("get", () => {
    const obj = { a: { b: { c: 42 } }, arr: [{ val: 100 }] };
    expect(get(obj, "a.b.c")).toBe(42);
    expect(get(obj, ["a", "b", "c"])).toBe(42);
    expect(get(obj, "arr[0].val")).toBe(100);
    expect(get(obj, "a.b.d", "default")).toBe("default");
    expect(get(null, "a.b.c", "default")).toBe("default");
  });

  it("deepClone", () => {
    const obj = {
      num: 1,
      str: "hello",
      date: new Date("2026-07-20T12:00:00Z"),
      reg: /abc/gi,
      arr: [1, { x: 2 }],
      nested: { y: 3 },
    };

    const clone = deepClone(obj);
    expect(clone).toEqual(obj);
    expect(clone).not.toBe(obj);
    expect(clone.date).not.toBe(obj.date);
    expect(clone.arr[1]).not.toBe(obj.arr[1]);
    expect(clone.nested).not.toBe(obj.nested);
  });

  it("deepMerge", () => {
    const target = { a: 1, b: { c: 2 } };
    const source1 = { b: { d: 3 } };
    const source2 = { e: 4 };

    const merged = deepMerge(target, source1, source2);
    expect(merged).toEqual({
      a: 1,
      b: { c: 2, d: 3 },
      e: 4,
    });
    expect(merged).toBe(target); // merging mutates target
  });

  it("has", () => {
    const obj = { a: { b: 2 } };
    expect(has(obj, "a")).toBe(true);
    expect(has(obj, "a.b")).toBe(true);
    expect(has(obj, ["a", "b"])).toBe(true);
    expect(has(obj, "a.c")).toBe(false);
    expect(has(null, "a")).toBe(false);
  });

  it("isEqual", () => {
    const obj1 = { a: 1, b: { c: 2 } };
    const obj2 = { a: 1, b: { c: 2 } };
    const obj3 = { a: 1, b: { c: 3 } };
    expect(isEqual(obj1, obj2)).toBe(true);
    expect(isEqual(obj1, obj3)).toBe(false);
    expect(isEqual("a", "a")).toBe(true);
    expect(isEqual(NaN, NaN)).toBe(true);
  });

  it("size", () => {
    expect(size({ a: 1, b: 2 })).toBe(2);
    expect(size([1, 2, 3])).toBe(3);
    expect(size("hello")).toBe(5);
    expect(size(null)).toBe(0);
  });

  it("invert", () => {
    const obj = { a: 1, b: 2, c: 1 };
    expect(invert(obj)).toEqual({ "1": "c", "2": "b" });
  });

  it("toPairs and fromPairs", () => {
    const obj = { a: 1, b: 2 };
    const pairs = toPairs(obj);
    expect(pairs).toEqual([["a", 1], ["b", 2]]);
    expect(fromPairs(pairs)).toEqual(obj);
  });

  it("clone", () => {
    const obj = { a: 1, b: { c: 2 } };
    const c = clone(obj);
    expect(c).toEqual(obj);
    expect(c).not.toBe(obj);
    expect(c.b).toBe(obj.b); // shallow clone
  });

  it("pickBy", () => {
    const obj = { a: 1, b: "2", c: 3 };
    expect(pickBy(obj, (v) => typeof v === "number")).toEqual({ a: 1, c: 3 });
  });

  it("omitBy", () => {
    const obj = { a: 1, b: "2", c: 3 };
    expect(omitBy(obj, (v) => typeof v === "number")).toEqual({ b: "2" });
  });

  it("findKey", () => {
    const users = {
      barney: { age: 36, active: true },
      fred: { age: 40, active: false },
      pebbles: { age: 1, active: true },
    };
    expect(findKey(users, (o) => o.age < 40)).toBe("barney");
  });

  it("findLastKey", () => {
    const users = {
      barney: { age: 36, active: true },
      fred: { age: 40, active: false },
      pebbles: { age: 1, active: true },
    };
    expect(findLastKey(users, (o) => o.age < 40)).toBe("pebbles");
  });

  it("forOwn", () => {
    const obj = { a: 1, b: 2 };
    let sum = 0;
    forOwn(obj, (v) => { sum += v; });
    expect(sum).toBe(3);
  });

  it("invoke", () => {
    const obj = { a: [{ b: { c: [1, 2, 3, 4] } }] };
    expect(invoke(obj, "a[0].b.c.slice", 1, 3)).toEqual([2, 3]);
    expect(invoke(obj, "a[0].b.d.slice")).toBeUndefined();
  });

  it("keys, values, entries, fromEntries", () => {
    const obj = { a: 1, b: 2 };
    expect(keys(obj)).toEqual(["a", "b"]);
    expect(values(obj)).toEqual([1, 2]);
    expect(entries(obj)).toEqual([["a", 1], ["b", 2]]);
    expect(fromEntries([["a", 1], ["b", 2]])).toEqual({ a: 1, b: 2 });
  });

  it("isEmpty", () => {
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
    expect(isEmpty("")).toBe(true);
    expect(isEmpty([])).toBe(true);
    expect(isEmpty({})).toBe(true);
    expect(isEmpty(new Set())).toBe(true);
    expect(isEmpty(new Map())).toBe(true);
    expect(isEmpty({ a: 1 })).toBe(false);
    expect(isEmpty("hello")).toBe(false);
    expect(isEmpty(42)).toBe(false);
  });

  it("defaults", () => {
    expect(defaults({ a: 1 }, { b: 2 }, { a: 10, c: 3 })).toEqual({ a: 1, b: 2, c: 3 });
  });

  it("filterKeys and filterValues", () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(filterKeys(obj, k => k !== "b")).toEqual({ a: 1, c: 3 });
    expect(filterValues(obj, v => v > 1)).toEqual({ b: 2, c: 3 });
  });

  it("compactObject", () => {
    const obj = { a: 1, b: null, c: undefined, d: "", e: 0, f: false };
    expect(compactObject(obj)).toEqual({ a: 1, e: 0, f: false });
  });
});
