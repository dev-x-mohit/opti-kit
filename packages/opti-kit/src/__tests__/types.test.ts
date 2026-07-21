import { describe, it, expect } from "vitest";
import {
  isNil, isObject, isFunction, isDate, isRegExp,
  isString, isNumber, isBoolean, isArray, isPromise,
  isMap, isSet, isSymbol, isError, isPrimitive
} from "../types";

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

  it("isString", () => {
    expect(isString("hello")).toBe(true);
    expect(isString("")).toBe(true);
    expect(isString(123)).toBe(false);
    expect(isString(null)).toBe(false);
  });

  it("isNumber", () => {
    expect(isNumber(42)).toBe(true);
    expect(isNumber(3.14)).toBe(true);
    expect(isNumber(NaN)).toBe(false);
    expect(isNumber(Infinity)).toBe(false);
    expect(isNumber("42")).toBe(false);
  });

  it("isBoolean", () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);
    expect(isBoolean(0)).toBe(false);
    expect(isBoolean("true")).toBe(false);
  });

  it("isArray", () => {
    expect(isArray([])).toBe(true);
    expect(isArray([1, 2, 3])).toBe(true);
    expect(isArray({})).toBe(false);
    expect(isArray("hello")).toBe(false);
  });

  it("isPromise", () => {
    expect(isPromise(Promise.resolve())).toBe(true);
    expect(isPromise({ then: () => {} })).toBe(true);
    expect(isPromise({})).toBe(false);
    expect(isPromise(null)).toBe(false);
  });

  it("isMap", () => {
    expect(isMap(new Map())).toBe(true);
    expect(isMap(new Map([["a", 1]]))).toBe(true);
    expect(isMap({})).toBe(false);
    expect(isMap(null)).toBe(false);
  });

  it("isSet", () => {
    expect(isSet(new Set())).toBe(true);
    expect(isSet(new Set([1, 2, 3]))).toBe(true);
    expect(isSet([])).toBe(false);
    expect(isSet(null)).toBe(false);
  });

  it("isSymbol", () => {
    expect(isSymbol(Symbol())).toBe(true);
    expect(isSymbol(Symbol("test"))).toBe(true);
    expect(isSymbol("symbol")).toBe(false);
    expect(isSymbol(null)).toBe(false);
  });

  it("isError", () => {
    expect(isError(new Error())).toBe(true);
    expect(isError(new TypeError("oops"))).toBe(true);
    expect(isError({ message: "not an error" })).toBe(false);
    expect(isError(null)).toBe(false);
  });

  it("isPrimitive", () => {
    expect(isPrimitive("hello")).toBe(true);
    expect(isPrimitive(42)).toBe(true);
    expect(isPrimitive(true)).toBe(true);
    expect(isPrimitive(undefined)).toBe(true);
    expect(isPrimitive(null)).toBe(true);
    expect(isPrimitive(Symbol("sym"))).toBe(true);
    expect(isPrimitive(10n)).toBe(true);

    expect(isPrimitive({})).toBe(false);
    expect(isPrimitive([])).toBe(false);
    expect(isPrimitive(() => {})).toBe(false);
    expect(isPrimitive(new Map())).toBe(false);
    expect(isPrimitive(new RegExp("abc"))).toBe(false);
  });
});


