/**
 * Measures the execution time of a synchronous function.
 * @returns A tuple of [result, executionTimeInMilliseconds]
 */
export function measureTime<T>(fn: () => T): [T, number] {
  const start = typeof performance !== 'undefined' ? performance.now() : Date.now();
  const result = fn();
  const end = typeof performance !== 'undefined' ? performance.now() : Date.now();
  return [result, end - start];
}

/**
 * Measures the execution time of an asynchronous function.
 * @returns A tuple of [result, executionTimeInMilliseconds]
 */
export async function measureTimeAsync<T>(fn: () => Promise<T>): Promise<[T, number]> {
  const start = typeof performance !== 'undefined' ? performance.now() : Date.now();
  const result = await fn();
  const end = typeof performance !== 'undefined' ? performance.now() : Date.now();
  return [result, end - start];
}

/**
 * Benchmarks a function by running it multiple times and returning the average execution time.
 */
export function benchmark(fn: () => void, iterations = 1000): number {
  const start = typeof performance !== 'undefined' ? performance.now() : Date.now();
  for (let i = 0; i < iterations; i++) {
    fn();
  }
  const end = typeof performance !== 'undefined' ? performance.now() : Date.now();
  return (end - start) / iterations;
}

/**
 * Benchmarks an asynchronous function.
 */
export async function benchmarkAsync(fn: () => Promise<void>, iterations = 1000): Promise<number> {
  const start = typeof performance !== 'undefined' ? performance.now() : Date.now();
  for (let i = 0; i < iterations; i++) {
    await fn();
  }
  const end = typeof performance !== 'undefined' ? performance.now() : Date.now();
  return (end - start) / iterations;
}

/**
 * Creates a FPS (Frames Per Second) counter.
 * @returns An object with a `tick` method to call on each frame, and a `getFPS` method.
 */
export function createFPSCounter(): { tick: () => void; getFPS: () => number } {
  let frames = 0;
  let lastTime = typeof performance !== 'undefined' ? performance.now() : Date.now();
  let fps = 0;

  return {
    tick() {
      frames++;
      const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
      if (now >= lastTime + 1000) {
        fps = Math.round((frames * 1000) / (now - lastTime));
        frames = 0;
        lastTime = now;
      }
    },
    getFPS() {
      return fps;
    }
  };
}

/**
 * Ensures a function takes at least a specified amount of time to execute.
 * Useful to prevent UI flashing during fast async operations.
 */
export async function minDelay<T>(fn: () => Promise<T>, ms: number): Promise<T> {
  const start = Date.now();
  const result = await fn();
  const end = Date.now();
  const elapsed = end - start;
  if (elapsed < ms) {
    await new Promise(resolve => setTimeout(resolve, ms - elapsed));
  }
  return result;
}
