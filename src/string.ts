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
 * Converts a string into a URL-friendly slug.
 */
export function slugify(str: string): string {
  if (!str) return "";
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Truncates a string to a specified length and appends a suffix (defaulting to "...").
 */
export function truncate(str: string, length: number, suffix = "..."): string {
  if (!str) return "";
  if (str.length <= length) return str;
  const actualLength = length - suffix.length;
  if (actualLength <= 0) return suffix.slice(0, length);
  return str.slice(0, actualLength) + suffix;
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
