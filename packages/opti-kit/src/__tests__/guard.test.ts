import { describe, it, expect } from "vitest";
import {
  safeJsonParse,
  safeJsonStringify,
  safeParseInt,
  safeParseFloat,
  safeParseDate,
  coalesce,
  attempt,
  attemptAsync,
  invariant,
  assertDefined,
  assertNever,
  withDefault
} from "../guard";

describe("guard", () => {
  it("safeJsonParse", () => {
    expect(safeJsonParse('{"a":1}')).toEqual({ a: 1 });
    expect(safeJsonParse("invalid-json", { fallback: true })).toEqual({ fallback: true });
    expect(safeJsonParse("invalid-json")).toBeNull();
  });

  it("safeJsonStringify", () => {
    expect(safeJsonStringify({ a: 1 })).toBe('{"a":1}');
    const circular: any = {};
    circular.self = circular;
    expect(safeJsonStringify(circular, "fallback")).toBe("fallback");
  });

  it("safeParseInt", () => {
    expect(safeParseInt("42")).toBe(42);
    expect(safeParseInt("invalid", 10)).toBe(10);
  });

  it("safeParseFloat", () => {
    expect(safeParseFloat("3.14")).toBe(3.14);
    expect(safeParseFloat("invalid", 1.5)).toBe(1.5);
  });

  it("safeParseDate", () => {
    expect(safeParseDate("2026-07-21")?.getTime()).toBe(new Date("2026-07-21").getTime());
    const fallback = new Date();
    expect(safeParseDate("invalid-date", fallback)).toBe(fallback);
    expect(safeParseDate("invalid-date")).toBeNull();
  });

  it("coalesce", () => {
    expect(coalesce(null, undefined, 0, "hello")).toBe(0);
    expect(coalesce(null, undefined)).toBeUndefined();
  });

  it("attempt", () => {
    expect(attempt(() => 42)).toBe(42);
    expect(attempt(() => { throw new Error(); }, 10)).toBe(10);
  });

  it("attemptAsync", async () => {
    expect(await attemptAsync(async () => 42)).toBe(42);
    expect(await attemptAsync(async () => { throw new Error(); }, 10)).toBe(10);
  });

  it("invariant", () => {
    expect(() => invariant(true, "msg")).not.toThrow();
    expect(() => invariant(false, "test error")).toThrow("test error");
  });

  it("assertDefined", () => {
    expect(assertDefined("hello")).toBe("hello");
    expect(() => assertDefined(null, "myVal")).toThrow("Expected myVal to be defined");
  });

  it("assertNever", () => {
    expect(() => assertNever(undefined as never)).toThrow("Unexpected value:");
  });

  it("withDefault", () => {
    expect(withDefault("val", "default")).toBe("val");
    expect(withDefault(null, "default")).toBe("default");
    expect(withDefault(undefined, "default")).toBe("default");
  });
});
