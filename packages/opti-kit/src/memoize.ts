/**
 * Memoizes a function that takes a single string or number argument.
 */
export function memoizeSimple<T, R>(fn: (arg: T) => R): (arg: T) => R {
  const cache = new Map<T, R>();
  return function(arg: T): R {
    if (cache.has(arg)) return cache.get(arg)!;
    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
}

/**
 * Memoizes a function taking any arguments using a custom resolver to generate the cache key.
 */
export function memoizeWithResolver<R>(
  fn: (...args: any[]) => R,
  resolver: (...args: any[]) => string
): (...args: any[]) => R {
  const cache = new Map<string, R>();
  return function(...args: any[]): R {
    const key = resolver(...args);
    if (cache.has(key)) return cache.get(key)!;
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

/**
 * Memoizes an asynchronous function.
 */
export function memoizeAsync<R>(
  fn: (...args: any[]) => Promise<R>,
  resolver: (...args: any[]) => string = (...args) => JSON.stringify(args)
): (...args: any[]) => Promise<R> {
  const cache = new Map<string, Promise<R>>();
  return function(...args: any[]): Promise<R> {
    const key = resolver(...args);
    if (cache.has(key)) return cache.get(key)!;
    
    const promise = fn(...args).catch(err => {
      cache.delete(key);
      throw err;
    });
    
    cache.set(key, promise);
    return promise;
  };
}

/**
 * Creates a memoized function that clears its cache after a TTL (time to live).
 */
export function memoizeTTL<R>(
  fn: (...args: any[]) => R,
  ttlMs: number,
  resolver: (...args: any[]) => string = (...args) => JSON.stringify(args)
): (...args: any[]) => R {
  const cache = new Map<string, { value: R; expiry: number }>();
  return function(...args: any[]): R {
    const key = resolver(...args);
    const cached = cache.get(key);
    
    if (cached && Date.now() < cached.expiry) {
      return cached.value;
    }
    
    const result = fn(...args);
    cache.set(key, { value: result, expiry: Date.now() + ttlMs });
    return result;
  };
}

/**
 * Memoizes a function with a maximum cache size (LRU-like cache clearing).
 */
export function memoizeMax<R>(
  fn: (...args: any[]) => R,
  maxSize: number,
  resolver: (...args: any[]) => string = (...args) => JSON.stringify(args)
): (...args: any[]) => R {
  const cache = new Map<string, R>();
  return function(...args: any[]): R {
    const key = resolver(...args);
    if (cache.has(key)) {
      // LRU refresh
      const value = cache.get(key)!;
      cache.delete(key);
      cache.set(key, value);
      return value;
    }
    
    const result = fn(...args);
    if (cache.size >= maxSize) {
      // Evict oldest (first inserted in Map)
      const firstKey = cache.keys().next().value;
      if (firstKey !== undefined) cache.delete(firstKey);
    }
    cache.set(key, result);
    return result;
  };
}

/**
 * Extends a memoized function with a method to clear the cache manually.
 */
export function withClearCache<T extends (...args: any[]) => any>(
  memoizedFn: T,
  cacheMap: Map<any, any>
): T & { clearCache: () => void } {
  const wrapper = (...args: any[]) => memoizedFn(...args);
  wrapper.clearCache = () => cacheMap.clear();
  return wrapper as any;
}
