const HTML_ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

const REVERSE_HTML_ENTITIES: Record<string, string> = Object.entries(HTML_ENTITIES).reduce(
  (acc, [char, entity]) => {
    acc[entity] = char;
    return acc;
  },
  {} as Record<string, string>
);

/**
 * Encodes special characters in a string to HTML entities.
 */
export function encodeHtmlEntities(str: string): string {
  return str.replace(/[&<>"'`=\/]/g, s => HTML_ENTITIES[s]);
}

/**
 * Decodes HTML entities in a string back to characters.
 */
export function decodeHtmlEntities(str: string): string {
  return str.replace(/&(amp|lt|gt|quot|#39|#x2F|#x60|#x3D);/g, s => REVERSE_HTML_ENTITIES[s] || s);
}

/**
 * Strips HTML tags from a string.
 */
export function stripHtmlTags(str: string): string {
  return str.replace(/<\/?[^>]+(>|$)/g, "");
}

/**
 * Checks if a string contains any HTML tags.
 */
export function hasHtmlTags(str: string): boolean {
  return /<\/?[^>]+(>|$)/.test(str);
}

/**
 * Truncates a string by character count while attempting to preserve whole HTML tags.
 * (Simple implementation - strips HTML for the visible length check).
 */
export function truncateHtml(str: string, maxLength: number, suffix = '...'): string {
  const stripped = stripHtmlTags(str);
  if (stripped.length <= maxLength) return str;
  return stripped.slice(0, maxLength) + suffix; // Fallback to stripped truncation
}
