import { describe, it, expect, vi } from "vitest";
import { delay, debounce, throttle, once, retry } from "../async";

describe("async utilities", () => {
  it("delay", async () => {
    const start = Date.now();
    await delay(50);
    const duration = Date.now() - start;
    expect(duration).toBeGreaterThanOrEqual(40);
  });

  it("debounce", () => {
    vi.useFakeTimers();
    let counter = 0;
    const fn = debounce(() => {
      counter++;
    }, 100);

    fn();
    fn();
    fn();

    expect(counter).toBe(0);
    vi.advanceTimersByTime(100);
    expect(counter).toBe(1);
    vi.useRealTimers();
  });

  it("throttle", () => {
    vi.useFakeTimers();
    let counter = 0;
    const fn = throttle(() => {
      counter++;
    }, 100);

    fn(); // executes immediately (lastCall was 0)
    fn(); // throttled
    fn(); // throttled

    expect(counter).toBe(1);
    vi.advanceTimersByTime(100);
    fn(); // executes since time has elapsed
    expect(counter).toBe(2);
    vi.useRealTimers();
  });

  it("once", () => {
    let counter = 0;
    const fn = once((val: number) => {
      counter += val;
      return counter;
    });

    expect(fn(5)).toBe(5);
    expect(fn(10)).toBe(5); // does not re-execute, returns first result
    expect(counter).toBe(5);
  });

  it("retry success", async () => {
    let attempts = 0;
    const fn = async () => {
      attempts++;
      if (attempts < 3) {
        throw new Error("fail");
      }
      return "success";
    };

    const result = await retry(fn, 3, 5);
    expect(result).toBe("success");
    expect(attempts).toBe(3);
  });

  it("retry fail after max retries", async () => {
    const fn = async () => {
      throw new Error("permanent fail");
    };

    await expect(retry(fn, 2, 5)).rejects.toThrow("permanent fail");
  });

  it("debounce options", () => {
    vi.useFakeTimers();
    let counter = 0;
    const fn = debounce(() => {
      counter++;
    }, 100, { leading: true, trailing: false });

    fn(); // leading execution
    fn();
    fn();

    expect(counter).toBe(1);
    vi.advanceTimersByTime(100);
    expect(counter).toBe(1); // no trailing execution
    vi.useRealTimers();
  });

  it("throttle options", () => {
    vi.useFakeTimers();
    let counter = 0;
    const fn = throttle(() => {
      counter++;
    }, 100, { leading: false, trailing: true });

    fn(); // leading is false, does not execute immediately
    fn();
    fn();

    expect(counter).toBe(0);
    vi.advanceTimersByTime(100); // trailing execution triggers
    expect(counter).toBe(1);
    vi.useRealTimers();
  });
});
