/**
 * Builds a query string from an object.
 */
export function buildQueryString(params: Record<string, any>): string {
  const query = Object.keys(params)
    .filter(key => params[key] !== undefined && params[key] !== null)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(String(params[key]))}`)
    .join('&');
  return query ? `?${query}` : '';
}

/**
 * Parses a query string into an object.
 */
export function parseQueryString(queryString: string): Record<string, string> {
  if (!queryString) return {};
  const query = queryString.startsWith('?') ? queryString.slice(1) : queryString;
  return query.split('&').reduce((acc, pair) => {
    const [key, value] = pair.split('=');
    if (key) {
      acc[decodeURIComponent(key)] = decodeURIComponent(value || '');
    }
    return acc;
  }, {} as Record<string, string>);
}

/**
 * Checks if a HTTP status code represents a success (200-299).
 */
export function isSuccessStatus(statusCode: number): boolean {
  return statusCode >= 200 && statusCode < 300;
}

/**
 * Checks if a HTTP status code represents a client or server error (400-599).
 */
export function isErrorStatus(statusCode: number): boolean {
  return statusCode >= 400 && statusCode < 600;
}

export interface FetchOptions extends RequestInit {
  params?: Record<string, any>;
  timeout?: number;
}

/**
 * Wrapper around fetch that adds timeout and query params support.
 */
export async function fetchWithTimeout(url: string, options: FetchOptions = {}): Promise<Response> {
  const { params, timeout, ...fetchOptions } = options;
  const targetUrl = params ? `${url}${buildQueryString(params)}` : url;
  
  if (!timeout) {
    return fetch(targetUrl, fetchOptions);
  }

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(targetUrl, {
      ...fetchOptions,
      signal: controller.signal
    });
    return response;
  } finally {
    clearTimeout(id);
  }
}

/**
 * Perform a GET request.
 */
export async function get(url: string, options?: FetchOptions): Promise<Response> {
  return fetchWithTimeout(url, { ...options, method: 'GET' });
}

/**
 * Perform a POST request.
 */
export async function post(url: string, body: any, options?: FetchOptions): Promise<Response> {
  return fetchWithTimeout(url, {
    ...options,
    method: 'POST',
    body: typeof body === 'string' ? body : JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers
    }
  });
}

/**
 * Perform a PUT request.
 */
export async function put(url: string, body: any, options?: FetchOptions): Promise<Response> {
  return fetchWithTimeout(url, {
    ...options,
    method: 'PUT',
    body: typeof body === 'string' ? body : JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers
    }
  });
}

/**
 * Perform a PATCH request.
 */
export async function patch(url: string, body: any, options?: FetchOptions): Promise<Response> {
  return fetchWithTimeout(url, {
    ...options,
    method: 'PATCH',
    body: typeof body === 'string' ? body : JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers
    }
  });
}

/**
 * Perform a DELETE request.
 */
export async function del(url: string, options?: FetchOptions): Promise<Response> {
  return fetchWithTimeout(url, { ...options, method: 'DELETE' });
}
