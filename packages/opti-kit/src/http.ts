/**
 * Isomorphic network utility functions for fetch-based requests.
 * Fully compatible with Node.js, browsers, Bun, Deno, and serverless environments.
 */

/**
 * Performs a fetch request that automatically aborts if the timeout is reached.
 */
export function fetchWithTimeout(
  url: string,
  timeoutMs: number,
  options?: RequestInit
): Promise<Response> {
  if (typeof fetch === "undefined") {
    return Promise.reject(
      new Error("fetch is not supported in this environment")
    );
  }

  const controller = new AbortController();
  const signal = controller.signal;

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  return fetch(url, { ...options, signal })
    .then((res) => {
      clearTimeout(timeoutId);
      return res;
    })
    .catch((err) => {
      clearTimeout(timeoutId);
      throw err;
    });
}

/**
 * Performs a fetch request with a specified number of retries and a delay between attempts.
 */
export async function fetchWithRetry(
  url: string,
  options: RequestInit & { retries?: number; delay?: number } = {}
): Promise<Response> {
  const { retries = 3, delay = 1000, ...fetchOpts } = options;

  let attempt = 0;
  while (true) {
    try {
      const response = await fetch(url, fetchOpts);
      if (response.ok) return response;
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    } catch (err) {
      attempt++;
      if (attempt > retries) {
        throw err;
      }
      await new Promise((res) => setTimeout(res, delay));
    }
  }
}

/**
 * Safely fetches a URL and parses it as JSON. Supports timeout.
 */
export async function fetchJson<T = any>(
  url: string,
  options: RequestInit & { timeout?: number } = {}
): Promise<T> {
  const { timeout, ...fetchOpts } = options;

  const response =
    timeout !== undefined
      ? await fetchWithTimeout(url, timeout, fetchOpts)
      : await fetch(url, fetchOpts);

  if (!response.ok) {
    throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

/**
 * Type guard to check if an error is a network/connection failure or timeout.
 */
export function isNetworkError(err: any): boolean {
  if (!err) return false;
  const msg = String(err.message || "").toLowerCase();
  return (
    msg.includes("fetch failed") ||
    msg.includes("network error") ||
    msg.includes("failed to fetch") ||
    msg.includes("aborted") ||
    err.name === "AbortError"
  );
}

/**
 * Converts standard fetch HeadersInit into a clean key-value object representation.
 */
export function parseHeaders(headers?: HeadersInit): Record<string, string> {
  const result: Record<string, string> = {};
  if (!headers) return result;

  if (typeof Headers !== "undefined" && headers instanceof Headers) {
    headers.forEach((val, key) => {
      result[key] = val;
    });
    return result;
  }

  if (Array.isArray(headers)) {
    for (const [key, val] of headers) {
      result[key] = val;
    }
    return result;
  }

  return { ...headers } as Record<string, string>;
}
