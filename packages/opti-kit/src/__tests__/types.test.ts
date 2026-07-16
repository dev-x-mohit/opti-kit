import { describe, it, expect } from "vitest";
import { isNil, isObject, isFunction, isDate, isRegExp } from "../types";

describe("types", () => {
  it("isNil", () => {
    expect(isNil(null)).toBe(true);
    expect(isNil(undefined)).toBe(true);
    expect(isNil("")).toBe(false);
    expect(isNil(0)).toBe(false);
  });

  it("isObject", () => {
    expect(isObject({})).toBe(true);
    expect(isObject({ a: 1 })).toBe(true);
    expect(isObject([])).toBe(false);
    expect(isObject(null)).toBe(false);
    expect(isObject(5)).toBe(false);
  });

  it("isFunction", () => {
    expect(isFunction(() => {})).toBe(true);
    expect(isFunction(class {})).toBe(true);
    expect(isFunction({})).toBe(false);
  });

  it("isDate", () => {
    expect(isDate(new Date())).toBe(true);
    expect(isDate(new Date("invalid"))).toBe(false);
    expect(isDate("2026-07-20")).toBe(false);
  });

  it("isRegExp", () => {
    expect(isRegExp(/abc/)).toBe(true);
    expect(isRegExp(new RegExp("abc"))).toBe(true);
    expect(isRegExp("/abc/")).toBe(false);
  });
});
