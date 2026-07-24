/**
 * Resolves promises sequentially.
 */
export async function pMapSeries<T, R>(
  iterable: Iterable<T>,
  mapper: (item: T, index: number) => Promise<R> | R
): Promise<R[]> {
  const result: R[] = [];
  let index = 0;
  for (const item of iterable) {
    result.push(await mapper(item, index++));
  }
  return result;
}

/**
 * Passes the result of each promise sequentially to the next.
 */
export async function pWaterfall<T>(
  initialValue: T,
  tasks: Array<(arg: any) => Promise<any> | any>
): Promise<any> {
  let result = initialValue;
  for (const task of tasks) {
    result = await task(result);
  }
  return result;
}

/**
 * Promise-based mutex lock.
 */
export class Mutex {
  private _locked = false;
  private _queue: Array<() => void> = [];

  get isLocked() {
    return this._locked;
  }

  acquire(): Promise<() => void> {
    return new Promise(resolve => {
      const release = () => {
        if (this._queue.length > 0) {
          const next = this._queue.shift();
          next?.();
        } else {
          this._locked = false;
        }
      };

      if (!this._locked) {
        this._locked = true;
        resolve(release);
      } else {
        this._queue.push(() => resolve(release));
      }
    });
  }

  async runExclusive<T>(callback: () => Promise<T> | T): Promise<T> {
    const release = await this.acquire();
    try {
      return await callback();
    } finally {
      release();
    }
  }
}

/**
 * Concurrency limited queue.
 */
export class AsyncQueue<T> {
  private _queue: T[] = [];
  private _pendingPromise?: { resolve: (value: T) => void, reject: (err: any) => void };

  enqueue(item: T) {
    if (this._pendingPromise) {
      this._pendingPromise.resolve(item);
      this._pendingPromise = undefined;
    } else {
      this._queue.push(item);
    }
  }

  dequeue(): Promise<T> {
    if (this._queue.length > 0) {
      return Promise.resolve(this._queue.shift()!);
    }
    return new Promise((resolve, reject) => {
      this._pendingPromise = { resolve, reject };
    });
  }

  get length() {
    return this._queue.length;
  }
}

/**
 * Returns a promise that resolves when a condition is met.
 */
export async function pWaitFor(
  condition: () => Promise<boolean> | boolean,
  options: { interval?: number; timeout?: number } = {}
): Promise<void> {
  const { interval = 20, timeout = Number.POSITIVE_INFINITY } = options;
  const startTime = Date.now();

  return new Promise((resolve, reject) => {
    const check = async () => {
      try {
        if (await condition()) {
          resolve();
          return;
        }
      } catch (err) {
        reject(err);
        return;
      }

      if (Date.now() - startTime > timeout) {
        reject(new Error('Promise timeout'));
        return;
      }

      setTimeout(check, interval);
    };
    check();
  });
}

/**
 * Taps into a promise chain without affecting its value.
 */
export async function pTap<T>(
  promise: Promise<T>,
  onResolved: (val: T) => Promise<any> | any
): Promise<T> {
  const val = await promise;
  await onResolved(val);
  return val;
}

/**
 * Resolves an object of promises.
 */
export async function pResolveProps<K extends keyof any, V>(
  obj: Record<K, Promise<V> | V>
): Promise<Record<K, V>> {
  const keys = Object.keys(obj) as K[];
  const promises = keys.map(k => obj[k]);
  const results = await Promise.all(promises);
  
  const res = {} as Record<K, V>;
  for (let i = 0; i < keys.length; i++) {
    res[keys[i]] = results[i];
  }
  return res;
}
