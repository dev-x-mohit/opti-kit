import { describe, it, expect } from "vitest";
import {
  identity, flip, tap, memoize, pipe, compose,
  curry, partial, noop, constant, not, trampoline,
  juxt, onceFn
} from "../functional";

describe("functional", () => {
  it("identity", () => {
    expect(identity(42)).toBe(42);
    expect(identity("hello")).toBe("hello");
  });

  it("flip", () => {
    const sub = (a: number, b: number) => a - b;
    expect(flip(sub)(3, 10)).toBe(7);
  });

  it("tap", () => {
    let sideEffect = 0;
    const result = tap(42, (val) => { sideEffect = val; });
    expect(result).toBe(42);
    expect(sideEffect).toBe(42);
  });

  it("memoize", () => {
    let calls = 0;
    const fn = memoize((x: number) => { calls++; return x * 2; });
    expect(fn(5)).toBe(10);
    expect(fn(5)).toBe(10);
    expect(calls).toBe(1);
  });

  it("pipe", () => {
    const add1 = (x: number) => x + 1;
    const double = (x: number) => x * 2;
    expect(pipe(add1, double)(5)).toBe(12);
  });

  it("compose", () => {
    const add1 = (x: number) => x + 1;
    const double = (x: number) => x * 2;
    expect(compose(add1, double)(5)).toBe(11);
  });

  it("curry", () => {
    const add = curry((a: number, b: number, c: number) => a + b + c);
    expect(add(1)(2)(3)).toBe(6);
    expect(add(1, 2)(3)).toBe(6);
    expect(add(1, 2, 3)).toBe(6);
  });

  it("partial", () => {
    const greet = (greeting: string, name: string) => `${greeting}, ${name}!`;
    const hello = partial(greet, "Hello");
    expect(hello("World")).toBe("Hello, World!");
  });

  it("noop", () => {
    expect(noop()).toBeUndefined();
  });

  it("constant", () => {
    const always42 = constant(42);
    expect(always42()).toBe(42);
    expect(always42()).toBe(42);

    const alwaysNull = constant(null);
    expect(alwaysNull()).toBeNull();
  });

  it("not", () => {
    const isPositive = (x: number) => x > 0;
    const isNotPositive = not(isPositive);
    expect(isNotPositive(5)).toBe(false);
    expect(isNotPositive(-1)).toBe(true);
    expect(isNotPositive(0)).toBe(true);
  });

  it("trampoline", () => {
    // Stack-safe factorial using trampoline
    const factHelper = (n: number, acc: number): any => {
      if (n <= 1) return acc;
      return () => factHelper(n - 1, n * acc);
    };
    const fact = trampoline((n: number) => factHelper(n, 1));
    expect(fact(5)).toBe(120);
    expect(fact(1)).toBe(1);
    expect(fact(10)).toBe(3628800);
  });

  it("juxt", () => {
    const stats = juxt(Math.min, Math.max);
    expect(stats(1, 2, 3, 4, 5)).toEqual([1, 5]);

    const analyze = juxt(
      (x: number) => x * 2,
      (x: number) => x + 1
    );
    expect(analyze(5)).toEqual([10, 6]);
  });

  it("onceFn", () => {
    let count = 0;
    const inc = onceFn(() => ++count);
    expect(inc()).toBe(1);
    expect(inc()).toBe(1);
    expect(inc()).toBe(1);
    expect(count).toBe(1);
  });
});
