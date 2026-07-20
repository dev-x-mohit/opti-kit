import { describe, it, expect, vi } from "vitest";
import {
  delay,
  debounce,
  throttle,
  once,
  retry,
  timeout,
  defer,
  sequence,
  tryCatchAsync,
  pMap,
  pFilter,
  everyAsync,
  someAsync,
  pReduce,
  pProps,
  waitUntil,
  sleep,
  asyncPool,
  retryWithBackoff,
} from "../async";

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

  it("timeout", async () => {
    const slowPromise = delay(100).then(() => "done");
    await expect(timeout(slowPromise, 50)).rejects.toThrow("Timeout");

    const fastPromise = delay(10).then(() => "done");
    await expect(timeout(fastPromise, 50)).resolves.toBe("done");
  });

  it("defer", async () => {
    const { promise, resolve } = defer<string>();
    setTimeout(() => resolve("deferred"), 10);
    const result = await promise;
    expect(result).toBe("deferred");
  });

  it("sequence", async () => {
    const tasks = [
      () => delay(10).then(() => 1),
      () => delay(10).then(() => 2),
      () => delay(10).then(() => 3),
    ];
    const results = await sequence(tasks);
    expect(results).toEqual([1, 2, 3]);
  });

  it("tryCatchAsync", async () => {
    const success = delay(10).then(() => "ok");
    const [err1, res1] = await tryCatchAsync(success);
    expect(err1).toBeNull();
    expect(res1).toBe("ok");

    const fail = delay(10).then(() => {
      throw new Error("fail");
    });
    const [err2, res2] = await tryCatchAsync(fail);
    expect(err2?.message).toBe("fail");
    expect(res2).toBeNull();
  });

  it("pMap and pFilter", async () => {
    const nums = [1, 2, 3];
    const mapped = await pMap(nums, async (n) => {
      await delay(5);
      return n * 2;
    });
    expect(mapped).toEqual([2, 4, 6]);

    const filtered = await pFilter(nums, async (n) => {
      await delay(5);
      return n % 2 !== 0;
    });
    expect(filtered).toEqual([1, 3]);
  });

  it("everyAsync and someAsync", async () => {
    const nums = [1, 2, 3];
    const allPositive = await everyAsync(nums, async (n) => {
      await delay(5);
      return n > 0;
    });
    expect(allPositive).toBe(true);

    const someEven = await someAsync(nums, async (n) => {
      await delay(5);
      return n % 2 === 0;
    });
    expect(someEven).toBe(true);

    const someNegative = await someAsync(nums, async (n) => {
      await delay(5);
      return n < 0;
    });
    expect(someNegative).toBe(false);
  });

  it("pReduce and pProps", async () => {
    const nums = [1, 2, 3];
    const sum = await pReduce(nums, async (acc, n) => {
      await delay(5);
      return acc + n;
    }, 0);
    expect(sum).toBe(6);

    const props = await pProps({
      a: delay(5).then(() => 1),
      b: delay(5).then(() => "hello"),
    });
    expect(props).toEqual({ a: 1, b: "hello" });
  });

  it("sleep and waitUntil", async () => {
    const start = Date.now();
    await sleep(20);
    expect(Date.now() - start).toBeGreaterThanOrEqual(15);

    let flag = false;
    setTimeout(() => { flag = true; }, 30);
    await waitUntil(() => flag, { timeoutMs: 100, intervalMs: 10 });
    expect(flag).toBe(true);
  });

  it("asyncPool and retryWithBackoff", async () => {
    const results = await asyncPool(2, [1, 2, 3], async (n) => {
      await delay(10);
      return n * 2;
    });
    expect(results).toEqual([2, 4, 6]);

    let attempts = 0;
    const fn = async () => {
      attempts++;
      if (attempts < 2) throw new Error("fail");
      return "ok";
    };
    const res = await retryWithBackoff(fn, { retries: 2, initialDelayMs: 10 });
    expect(res).toBe("ok");
    expect(attempts).toBe(2);
  });
});

