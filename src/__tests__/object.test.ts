import { describe, it, expect } from "vitest";
import { pick, omit, get, deepClone, deepMerge } from "../object";

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
});
