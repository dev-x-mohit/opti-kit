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
