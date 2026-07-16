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

/**
 * Validates whether a string is a valid standard phone number pattern.
 */
export function isPhone(val: string): boolean {
  const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;
  return phoneRegex.test(val);
}

/**
 * Validates password strength (minimum 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char).
 */
export function isStrongPassword(val: string): boolean {
  if (val.length < 8) return false;
  const hasUpper = /[A-Z]/.test(val);
  const hasLower = /[a-z]/.test(val);
  const hasDigit = /[0-9]/.test(val);
  const hasSpecial = /[^A-Za-z0-9]/.test(val);
  return hasUpper && hasLower && hasDigit && hasSpecial;
}

/**
 * Validates whether a string is a valid IPv4 or IPv6 address.
 */
export function isIP(val: string, version?: "4" | "6"): boolean {
  const ipv4Regex =
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const ipv6Regex =
    /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^(?:[0-9a-fA-F]{1,4}:){1,7}:|^(?:[0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}$|^(?:[0-9a-fA-F]{1,4}:){1,5}(?::[0-9a-fA-F]{1,4}){1,2}$|^(?:[0-9a-fA-F]{1,4}:){1,4}(?::[0-9a-fA-F]{1,4}){1,3}$|^(?:[0-9a-fA-F]{1,4}:){1,3}(?::[0-9a-fA-F]{1,4}){1,4}$|^(?:[0-9a-fA-F]{1,4}:){1,2}(?::[0-9a-fA-F]{1,4}){1,5}$|^[0-9a-fA-F]{1,4}:(?::[0-9a-fA-F]{1,4}){1,6}$|^:(?::[0-9a-fA-F]{1,4}){1,7}$/;

  if (version === "4") return ipv4Regex.test(val);
  if (version === "6") return ipv6Regex.test(val);
  return ipv4Regex.test(val) || ipv6Regex.test(val);
}

/**
 * Validates whether a string represents a valid, parseable calendar date.
 */
export function isDateValid(val: string): boolean {
  if (!val) return false;
  const time = Date.parse(val);
  return !isNaN(time);
}
