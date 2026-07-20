import { getQueryParams } from "./dom";

/**
 * Joins multiple path segments safely without creating duplicate forward slashes.
 */
export function joinPaths(...parts: string[]): string {
  return parts
    .map((part) => part.trim().replace(/(^\/|\/$)/g, ""))
    .filter(Boolean)
    .join("/");
}

/**
 * Parses a URL string into structured parts. Falls back gracefully for malformed strings.
 */
export function parseUrl(urlStr: string): {
  protocol: string;
  host: string;
  pathname: string;
  query: Record<string, string>;
  hash: string;
} {
  try {
    const url = new URL(urlStr);
    return {
      protocol: url.protocol,
      host: url.host,
      pathname: url.pathname,
      query: getQueryParams(urlStr),
      hash: url.hash,
    };
  } catch {
    return {
      protocol: "",
      host: "",
      pathname: urlStr,
      query: {},
      hash: "",
    };
  }
}

/**
 * Converts a key-value object into a URL query string (e.g. "?a=1&b=2").
 * Automatically encodes keys and values.
 */
export function stringifyQuery(query: Record<string, string | number | boolean>): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== null) {
      params.append(key, String(value));
    }
  }
  const str = params.toString();
  return str ? `?${str}` : "";
}

/**
 * Constructs a full URL string given a base URL and an object of query parameters.
 */
export function buildUrl(baseUrl: string, query?: Record<string, string | number | boolean>): string {
  if (!query) return baseUrl;
  const queryString = stringifyQuery(query);
  const hashIndex = baseUrl.indexOf("#");
  
  let base = baseUrl;
  let hash = "";
  if (hashIndex !== -1) {
    base = baseUrl.slice(0, hashIndex);
    hash = baseUrl.slice(hashIndex);
  }

  if (!queryString) return baseUrl;
  
  const separator = base.includes("?") ? "&" : "";
  const queryPart = separator === "&" ? queryString.replace("?", "") : queryString;
  return `${base}${separator}${queryPart}${hash}`;
}

/**
 * Checks whether a given string is an absolute URL (contains a protocol).
 */
export function isAbsoluteUrl(urlStr: string): boolean {
  return /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(urlStr);
}

/**
 * Extracts the base URL (protocol + host) from a full URL string.
 * Returns an empty string if the URL is invalid.
 */
export function getBaseUrl(urlStr: string): string {
  try {
    const url = new URL(urlStr);
    return url.origin;
  } catch {
    return "";
  }
}

/**
 * Removes all query parameters and hash fragments from a URL.
 */
export function removeQuery(urlStr: string): string {
  try {
    const url = new URL(urlStr);
    url.search = "";
    url.hash = "";
    return url.toString();
  } catch {
    const hashIndex = urlStr.indexOf("#");
    let base = hashIndex !== -1 ? urlStr.slice(0, hashIndex) : urlStr;
    const queryIndex = base.indexOf("?");
    return queryIndex !== -1 ? base.slice(0, queryIndex) : base;
  }
}

/**
 * Adds or updates query parameters in an existing URL string.
 */
export function addQueryParam(urlStr: string, key: string | Record<string, string | number | boolean>, value?: string | number | boolean): string {
  try {
    const url = new URL(urlStr);
    if (typeof key === "object") {
      for (const [k, v] of Object.entries(key)) {
        if (v !== undefined && v !== null) {
          url.searchParams.set(k, String(v));
        }
      }
    } else if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value));
    }
    return url.toString();
  } catch {
    let params: Record<string, string | number | boolean> = {};
    if (typeof key === "object") {
      params = { ...key };
    } else if (value !== undefined && value !== null) {
      params[key] = value;
    }
    return buildUrl(urlStr, params);
  }
}
