/**
 * Retry Utilities
 */

export async function retryWithExponentialBackoff<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  delayFn: (attempt: number) => number = exponentialBackoffDelay
): Promise<T> {
  let attempt = 0;
  while (true) {
    try {
      return await fn();
    } catch (err) {
      attempt++;
      if (attempt >= maxRetries) throw err;
      const delay = delayFn(attempt);
      await new Promise(res => setTimeout(res, delay));
    }
  }
}

export async function retryWithJitter<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  baseDelay = 1000
): Promise<T> {
  return retryWithExponentialBackoff(fn, maxRetries, (attempt) => {
    const exp = Math.pow(2, attempt) * baseDelay;
    return exp / 2 + Math.random() * (exp / 2); // 50% jitter
  });
}

export function exponentialBackoffDelay(attempt: number, baseDelay = 1000): number {
  return Math.pow(2, attempt) * baseDelay;
}

export function linearBackoffDelay(attempt: number, baseDelay = 1000): number {
  return attempt * baseDelay;
}

export function isRetryableError(error: any): boolean {
  if (!error) return false;
  // Generic network errors are usually retryable
  if (error.code === 'ECONNRESET' || error.code === 'ETIMEDOUT' || error.code === 'ECONNREFUSED') return true;
  // HTTP 5xx or 429
  if (error.status >= 500 || error.status === 429) return true;
  return false;
}
