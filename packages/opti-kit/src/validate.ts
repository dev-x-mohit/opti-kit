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

/**
 * Validates whether a string contains only alphabetic characters.
 */
export function isAlpha(val: string): boolean {
  return /^[a-zA-Z]+$/.test(val);
}

/**
 * Validates whether a string contains only alphanumeric characters.
 */
export function isAlphanumeric(val: string): boolean {
  return /^[a-zA-Z0-9]+$/.test(val);
}

/**
 * Validates whether a string contains only numbers.
 */
export function isNumeric(val: string): boolean {
  return /^[0-9]+$/.test(val);
}

/**
 * Validates whether a string is a valid Hex Color code.
 */
export function isHexColor(val: string): boolean {
  return /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(val);
}

/**
 * Validates whether a string is valid Base64 encoding.
 */
export function isBase64(val: string): boolean {
  const base64Regex = /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/;
  return base64Regex.test(val) && val.length % 4 === 0 && val.length > 0;
}

/**
 * Validates whether a string is valid JSON.
 */
export function isJSON(val: string): boolean {
  try {
    JSON.parse(val);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validates whether a string is a valid JWT token.
 */
export function isJWT(val: string): boolean {
  return /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/.test(val);
}

/**
 * Validates whether a string represents a valid Credit Card number using the Luhn algorithm.
 */
export function isCreditCard(val: string): boolean {
  const sanitized = val.replace(/[- ]+/g, "");
  if (!/^\d{13,19}$/.test(sanitized)) return false;

  let sum = 0;
  let shouldDouble = false;
  for (let i = sanitized.length - 1; i >= 0; i--) {
    let digit = parseInt(sanitized.charAt(i), 10);
    if (shouldDouble) {
      if ((digit *= 2) > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

/**
 * Validates whether a string is a valid MAC address.
 */
export function isMacAddress(val: string): boolean {
  return /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(val);
}

/**
 * Validates whether a string contains only ASCII characters.
 */
export function isAscii(val: string): boolean {
  return /^[\x00-\x7F]+$/.test(val);
}

/**
 * Validates whether a string represents a boolean ("true", "false", "1", "0").
 */
export function isBooleanString(val: string): boolean {
  return ["true", "false", "1", "0"].includes(val.toLowerCase());
}

/**
 * Validates whether a string is a valid Data URI.
 */
export function isDataURI(val: string): boolean {
  return /^\s*data:([a-z]+\/[a-z0-9\-\+]+(;[a-z\-]+\=[a-z0-9\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i.test(val);
}

/**
 * Validates whether a value is a valid port number.
 */
export function isPort(val: string | number): boolean {
  const port = typeof val === "string" ? parseInt(val, 10) : val;
  return Number.isInteger(port) && port >= 0 && port <= 65535;
}

/**
 * Validates whether a string is a Semantic Versioning (SemVer) string.
 */
export function isSemVer(val: string): boolean {
  return /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/.test(val);
}

/**
 * Validates whether a string is a valid slug (kebab-case alphanumeric).
 */
export function isSlug(val: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(val);
}

/**
 * Validates whether a string is a hexadecimal value.
 */
export function isHexadecimal(val: string): boolean {
  return /^(0x|0X)?[0-9a-fA-F]+$/.test(val);
}

/**
 * Validates whether a string is a valid MD5 hash.
 */
export function isMD5(val: string): boolean {
  return /^[a-fA-F0-9]{32}$/.test(val);
}

/**
 * Validates whether a string is a valid SHA256 hash.
 */
export function isSHA256(val: string): boolean {
  return /^[a-fA-F0-9]{64}$/.test(val);
}

/**
 * Validates whether a value is a valid latitude coordinate (-90 to 90).
 */
export function isLatitude(val: number | string): boolean {
  const lat = typeof val === "string" ? parseFloat(val) : val;
  return !isNaN(lat) && lat >= -90 && lat <= 90;
}

/**
 * Validates whether a value is a valid longitude coordinate (-180 to 180).
 */
export function isLongitude(val: number | string): boolean {
  const lon = typeof val === "string" ? parseFloat(val) : val;
  return !isNaN(lon) && lon >= -180 && lon <= 180;
}

/**
 * Validates whether a string is a valid "lat,long" or "lat, long" coordinate pair.
 */
export function isLatLong(val: string): boolean {
  const parts = val.split(",");
  if (parts.length !== 2) return false;
  return isLatitude(parts[0].trim()) && isLongitude(parts[1].trim());
}

