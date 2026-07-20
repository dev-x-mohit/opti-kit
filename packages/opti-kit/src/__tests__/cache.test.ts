import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { memoizeWithTTL, LRUCache } from "../cache";

describe("Cache Module", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("memoizeWithTTL", () => {
    it("caches result until TTL expires", () => {
      let callCount = 0;
      const fn = (x: number) => {
        callCount++;
        return x * 2;
      };
      
      const memoized = memoizeWithTTL(fn, 1000);

      expect(memoized(5)).toBe(10);
      expect(callCount).toBe(1);

      // Call again immediately (should hit cache)
      expect(memoized(5)).toBe(10);
      expect(callCount).toBe(1);

      // Advance time by 500ms
      vi.advanceTimersByTime(500);
      expect(memoized(5)).toBe(10);
      expect(callCount).toBe(1);

      // Advance time past 1000ms total
      vi.advanceTimersByTime(501);
      expect(memoized(5)).toBe(10);
      expect(callCount).toBe(2); // Recalculated
    });
  });

  describe("LRUCache", () => {
    it("evicts least recently used items", () => {
      const cache = new LRUCache<string, number>(3);
      cache.set("a", 1);
      cache.set("b", 2);
      cache.set("c", 3);

      expect(cache.get("a")).toBe(1); // 'a' is now most recently used

      cache.set("d", 4); // Evicts 'b' because 'a' was just accessed

      expect(cache.has("b")).toBe(false);
      expect(cache.get("a")).toBe(1);
      expect(cache.get("c")).toBe(3);
      expect(cache.get("d")).toBe(4);
    });

    it("throws on invalid capacity", () => {
      expect(() => new LRUCache(0)).toThrow("Capacity must be greater than 0");
    });
    
    it("can clear cache", () => {
      const cache = new LRUCache<string, number>(2);
      cache.set("a", 1);
      cache.clear();
      expect(cache.has("a")).toBe(false);
    });
  });
});
