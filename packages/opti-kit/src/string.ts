/**
 * Splits a string into an array of words (handling camelCase, snake_case, spaces, etc.).
 */
function words(str: string): string[] {
  return (
    str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g) || []
  );
}

/**
 * Capitalizes the first character of a string.
 */
export function capitalize(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Converts a string into a URL-friendly slug with customization options.
 */
export function slugify(
  str: string,
  options?: { lower?: boolean; replacement?: string }
): string {
  if (!str) return "";
  const lower = options?.lower !== false;
  const replacement = options?.replacement ?? "-";

  let result = str.trim();
  if (lower) {
    result = result.toLowerCase();
  }

  const escapedReplacement = replacement.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");

  return result
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, replacement)
    .replace(new RegExp(`^${escapedReplacement}+|${escapedReplacement}+$`, "g"), "");
}

/**
 * Truncates a string to a specified length with customizable separator and suffix.
 */
export function truncate(
  str: string,
  length: number,
  options?: string | { suffix?: string; separator?: RegExp | string }
): string {
  if (!str) return "";
  if (str.length <= length) return str;

  let suffix = "...";
  let separator: RegExp | string | undefined;

  if (typeof options === "string") {
    suffix = options;
  } else if (options && typeof options === "object") {
    if (options.suffix !== undefined) suffix = options.suffix;
    if (options.separator !== undefined) separator = options.separator;
  }

  const actualLength = length - suffix.length;
  if (actualLength <= 0) return suffix.slice(0, length);

  let result = str.slice(0, actualLength);

  if (separator) {
    if (separator instanceof RegExp) {
      const matches = [...result.matchAll(new RegExp(separator.source, "g"))];
      if (matches.length > 0) {
        const lastMatch = matches[matches.length - 1];
        if (lastMatch.index !== undefined) {
          result = result.slice(0, lastMatch.index);
        }
      }
    } else {
      const lastIdx = result.lastIndexOf(separator);
      if (lastIdx !== -1) {
        result = result.slice(0, lastIdx);
      }
    }
  }

  return result + suffix;
}

/**
 * Converts a string to camelCase.
 */
export function camelCase(str: string): string {
  const parts = words(str);
  if (parts.length === 0) return "";
  return parts
    .map((word, index) => {
      const lower = word.toLowerCase();
      if (index === 0) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join("");
}

/**
 * Converts a string to kebab-case.
 */
export function kebabCase(str: string): string {
  return words(str)
    .map((word) => word.toLowerCase())
    .join("-");
}

/**
 * Converts a string to snake_case.
 */
export function snakeCase(str: string): string {
  return words(str)
    .map((word) => word.toLowerCase())
    .join("_");
}

const htmlEscapes: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

const htmlUnescapes: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
};

/**
 * Escapes HTML characters: &, <, >, ", and ' in a string.
 */
export function escapeHtml(str: string): string {
  if (!str) return "";
  return str.replace(/[&<>"']/g, (match) => htmlEscapes[match]);
}

/**
 * Unescapes HTML entities back to characters.
 */
export function unescapeHtml(str: string): string {
  if (!str) return "";
  return str.replace(/&(?:amp|lt|gt|quot|#39);/g, (match) => htmlUnescapes[match]);
}

/**
 * Removes all HTML tags from a string.
 */
export function stripHtml(str: string): string {
  if (!str) return "";
  return str.replace(/<[^>]*>/g, "");
}

/**
 * Counts the number of words in a string.
 */
export function wordCount(str: string): number {
  if (!str) return 0;
  return words(str).length;
}
