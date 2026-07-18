/**
 * Safe client-side clipboard writer. Returns true if successful, false otherwise.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (
    typeof window === "undefined" ||
    typeof navigator === "undefined" ||
    !navigator.clipboard
  ) {
    return false;
  }
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/**
 * Returns a key-value record of query parameters from a URL or window.location.
 */
export function getQueryParams(url?: string): Record<string, string> {
  if (typeof window === "undefined" && !url) {
    return {};
  }
  try {
    const searchString = url
      ? new URL(url).search
      : typeof window !== "undefined"
        ? window.location.search
        : "";
    const params = new URLSearchParams(searchString);
    const result: Record<string, string> = {};
    params.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  } catch {
    return {};
  }
}
