import { describe, it, expect, vi } from "vitest";
import {
  identity,
  flip,
  tap,
  memoize,
  pipe,
  compose,
} from "../functional";
import { once, retry } from "../async";


describe("Functional Module", () => {
  it("identity", () => {
    expect(identity(5)).toBe(5);
    const obj = { a: 1 };
    expect(identity(obj)).toBe(obj);
  });

  it("flip", () => {
    const fn = (a: string, b: string, c: string) => a + b + c;
    const flipped = flip(fn);
    expect(flipped("1", "2", "3")).toBe("321");
  });

  it("tap", () => {
    let intercepted = 0;
    const result = tap(5, (val) => {
      intercepted = val * 2;
    });
    expect(result).toBe(5);
    expect(intercepted).toBe(10);
  });

  it("once", () => {
    const fn = vi.fn((x: number) => x * 2);
    const onceFn = once(fn);
    
    expect(onceFn(5)).toBe(10);
    expect(onceFn(10)).toBe(10);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("memoize", () => {
    const fn = vi.fn((a: number, b: number) => a + b);
    const memoized = memoize(fn, (a, b) => `${a}_${b}`);

    expect(memoized(1, 2)).toBe(3);
    expect(memoized(1, 2)).toBe(3);
    expect(fn).toHaveBeenCalledTimes(1);

    expect(memoized(2, 3)).toBe(5);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("pipe", () => {
    const add1 = (x: number) => x + 1;
    const double = (x: number) => x * 2;
    const piped = pipe(add1, double);
    expect(piped(5)).toBe(12); // (5 + 1) * 2
  });

  it("compose", () => {
    const add1 = (x: number) => x + 1;
    const double = (x: number) => x * 2;
    const composed = compose(add1, double);
    expect(composed(5)).toBe(11); // (5 * 2) + 1
  });

  it("retry - success", async () => {
    const fn = vi.fn().mockResolvedValue("success");
    const result = await retry(fn, 3);
    expect(result).toBe("success");
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("retry - fail then succeed", async () => {
    let attempts = 0;
    const fn = vi.fn().mockImplementation(async () => {
      attempts++;
      if (attempts < 3) throw new Error("fail");
      return "success";
    });

    const result = await retry(fn, 3, 10);
    expect(result).toBe("success");
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it("retry - exhaust retries", async () => {
    const fn = vi.fn().mockRejectedValue(new Error("fail"));
    await expect(retry(fn, 3, 10)).rejects.toThrow("fail");
    expect(fn).toHaveBeenCalledTimes(3);
  });
});
