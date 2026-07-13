/**
 * Validates whether a string is a properly formatted email.
 */
export function isEmail(val: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(val);
}

/**
 * Validates whether a string is a valid absolute URL.
 */
export function isUrl(val: string): boolean {
  if (!val) return false;
  try {
    new URL(val);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validates whether a string is a standard UUID (v1-v5).
 */
export function isUuid(val: string): boolean {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(val);
}
