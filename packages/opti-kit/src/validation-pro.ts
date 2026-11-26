/**
 * OptiKit Validation Pro — Financial, networking, identifier, format, and security
 * validators and sanitizers (Luhn, IBAN, BIC, ISBN, VIN, CIDR, IPv6, JWT, Semver, etc.).
 */

/** Validates a credit/debit card number using the Luhn mod-10 algorithm. */
export function isCreditCardLuhn(cardNumber: string): boolean {
  const digits = cardNumber.replace(/[\s-]/g, '');
  if (!/^\d{13,19}$/.test(digits)) return false;
  let sum = 0;
  let alt = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let n = Number(digits[i]);
    if (alt) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alt = !alt;
  }
  return sum % 10 === 0;
}

/** Detects the card network brand (`visa`, `mastercard`, `amex`, `discover`, `unknown`). */
export function detectCardBrand(
  cardNumber: string
): 'visa' | 'mastercard' | 'amex' | 'discover' | 'unknown' {
  const d = cardNumber.replace(/[\s-]/g, '');
  if (/^4\d{12}(\d{3})?(\d{3})?$/.test(d)) return 'visa';
  if (/^(5[1-5]\d{14}|2(2[2-9]\d{12}|[3-6]\d{13}|7[01]\d{12}|720\d{12}))$/.test(d)) return 'mastercard';
  if (/^3[47]\d{13}$/.test(d)) return 'amex';
  if (/^6(?:011|5\d{2})\d{12}$/.test(d)) return 'discover';
  return 'unknown';
}

/** Validates an International Bank Account Number (IBAN) via mod-97 check. */
export function isIban(iban: string): boolean {
  const clean = iban.replace(/\s+/g, '').toUpperCase();
  if (!/^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/.test(clean)) return false;
  const rearranged = clean.slice(4) + clean.slice(0, 4);
  let remainder = 0;
  for (const ch of rearranged) {
    const val = ch >= 'A' && ch <= 'Z' ? String(ch.charCodeAt(0) - 55) : ch;
    for (const digit of val) {
      remainder = (remainder * 10 + Number(digit)) % 97;
    }
  }
  return remainder === 1;
}

/** Validates a SWIFT/BIC bank identifier code (8 or 11 characters). */
export function isBicSwift(bic: string): boolean {
  return /^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(bic.trim().toUpperCase());
}

/** Validates an ISBN-10 code with check digit. */
export function isIsbn10(isbn: string): boolean {
  const clean = isbn.replace(/[-\s]/g, '').toUpperCase();
  if (!/^\d{9}[\dX]$/.test(clean)) return false;
  let sum = 0;
  for (let i = 0; i < 10; i++) {
    const val = clean[i] === 'X' ? 10 : Number(clean[i]);
    sum += val * (10 - i);
  }
  return sum % 11 === 0;
}

/** Validates an ISBN-13 code with mod-10 check digit. */
export function isIsbn13(isbn: string): boolean {
  const clean = isbn.replace(/[-\s]/g, '');
  if (!/^(978|979)\d{10}$/.test(clean)) return false;
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += Number(clean[i]) * (i % 2 === 0 ? 1 : 3);
  }
  const check = (10 - (sum % 10)) % 10;
  return check === Number(clean[12]);
}

/** Validates an ISSN serial publication identifier. */
export function isIssn(issn: string): boolean {
  const clean = issn.replace(/[-\s]/g, '').toUpperCase();
  if (!/^\d{7}[\dX]$/.test(clean)) return false;
  let sum = 0;
  for (let i = 0; i < 8; i++) {
    const val = clean[i] === 'X' ? 10 : Number(clean[i]);
    sum += val * (8 - i);
  }
  return sum % 11 === 0;
}

/** Validates an EAN-13 barcode check digit. */
export function isEan13(code: string): boolean {
  const clean = code.replace(/\s+/g, '');
  if (!/^\d{13}$/.test(clean)) return false;
  let sum = 0;
  for (let i = 0; i < 12; i++) sum += Number(clean[i]) * (i % 2 === 0 ? 1 : 3);
  return (10 - (sum % 10)) % 10 === Number(clean[12]);
}

/** Validates a UPC-A 12-digit barcode check digit. */
export function isUpcA(code: string): boolean {
  const clean = code.replace(/\s+/g, '');
  if (!/^\d{12}$/.test(clean)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(clean[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(clean[11]);
}

/** Validates a 17-character Vehicle Identification Number (VIN). */
export function isVin(vin: string): boolean {
  const clean = vin.trim().toUpperCase();
  return /^[A-HJ-NPR-Z0-9]{17}$/.test(clean);
}

/** Validates a MAC address (colon, hyphen, or dot-separated). */
export function isMacAddressStrict(mac: string): boolean {
  return /^([0-9A-Fa-f]{2}[:-]){5}[0-9A-Fa-f]{2}$|^([0-9A-Fa-f]{4}\.){2}[0-9A-Fa-f]{4}$/.test(mac);
}

/** Validates an IPv4 CIDR block (e.g. `192.168.1.0/24`). */
export function isIpv4Cidr(cidr: string): boolean {
  const [ip, maskStr] = cidr.split('/');
  if (!ip || maskStr === undefined) return false;
  const mask = Number(maskStr);
  if (!Number.isInteger(mask) || mask < 0 || mask > 32) return false;
  const parts = ip.split('.');
  return parts.length === 4 && parts.every((p) => /^\d+$/.test(p) && Number(p) >= 0 && Number(p) <= 255);
}

/** Validates an IPv6 address (full or compressed `::` notation). */
export function isIpv6(ip: string): boolean {
  return /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|::1|::)$/.test(
    ip.trim()
  );
}

/** Checks whether an IPv4 address falls inside an IPv4 CIDR range. */
export function ipInCidr(ip: string, cidr: string): boolean {
  if (!isIpv4Cidr(cidr)) return false;
  const toInt = (addr: string) =>
    addr.split('.').reduce((acc, oct) => ((acc << 8) | Number(oct)) >>> 0, 0);
  const [rangeIp, bitsStr] = cidr.split('/');
  const bits = Number(bitsStr);
  const mask = bits === 0 ? 0 : (0xffffffff << (32 - bits)) >>> 0;
  return (toInt(ip) & mask) === (toInt(rangeIp) & mask);
}

/** Validates a standard 5-field cron expression syntax. */
export function isCronExpression(expr: string): boolean {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) return false;
  const fieldRe = /^(\*|\d+(-\d+)?(\/\d+)?|\*\/\d+)(,(\*|\d+(-\d+)?(\/\d+)?|\*\/\d+))*$/;
  return parts.every((p) => fieldRe.test(p));
}

/** Validates structural JWT format (3 Base64URL segments). */
export function isJwtFormat(token: string): boolean {
  return /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(token.trim());
}

/** Validates basic SemVer range syntax (`^1.2.3`, `~1.0.0`, `>=1.0.0`, `1.2.x`, `*`). */
export function isSemverRange(range: string): boolean {
  return /^(\*|x|([~^]|>=|<=|>|<|=)?\d+(\.\d+|\.x|\.\*)?(\.\d+|\.x|\.\*)?(-[0-9A-Za-z.-]+)?)$/.test(
    range.trim()
  );
}

/** Validates a MIME media type string (e.g. `application/json`). */
export function isMimeType(mime: string): boolean {
  return /^[a-zA-Z0-9!#$&^_.+-]+\/[a-zA-Z0-9!#$&^_.+-]+(\s*;\s*[a-zA-Z0-9-]+=.+)*$/.test(
    mime.trim()
  );
}

/** Validates an RFC 2397 `data:` URI. */
export function isDataUri(uri: string): boolean {
  return /^data:([a-zA-Z0-9!#$&^_.+-]+\/[a-zA-Z0-9!#$&^_.+-]+)?(;charset=[a-zA-Z0-9-]+)?(;base64)?,.*$/.test(
    uri.trim()
  );
}

/** Validates a URL-safe lowercase slug (`my-slug-123`). */
export function isSlugStrict(value: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

/** Computes a 0-4 password strength score based on length and character classes. */
export function passwordStrengthScore(password: string): 0 | 1 | 2 | 3 | 4 {
  if (password.length < 6) return 0;
  let score = 0;
  if (password.length >= 8) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return Math.min(4, score) as 0 | 1 | 2 | 3 | 4;
}

/** Checks if a password meets strict enterprise strength requirements (score >= 3 and length >= 8). */
export function isStrongPasswordStrict(password: string): boolean {
  return password.length >= 8 && passwordStrengthScore(password) >= 3;
}

/** Validates an E.164 international phone number (`+14155552671`). */
export function isE164Phone(phone: string): boolean {
  return /^\+[1-9]\d{1,14}$/.test(phone.trim());
}

/** Validates an ISO 3166-1 alpha-2 country code format (`US`, `IN`, `GB`). */
export function isIso3166Alpha2(code: string): boolean {
  return /^[A-Z]{2}$/.test(code);
}

/** Validates an ISO 4217 3-letter currency code format (`USD`, `EUR`, `INR`). */
export function isIso4217Currency(code: string): boolean {
  return /^[A-Z]{3}$/.test(code);
}

/** Sanitizes an arbitrary string into a safe cross-platform filename. */
export function sanitizeFilename(name: string, replacement = '_'): string {
  return name
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, replacement)
    .replace(/^\.+|\.+$/g, '')
    .slice(0, 255) || 'file';
}

/** Escapes special RegExp metacharacters in a literal string. */
export function escapeRegExpStr(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Strips ASCII control characters (`0x00-0x1F`, `0x7F`) from a string. */
export function stripControlChars(str: string): string {
  return str.replace(/[\x00-\x1F\x7F]/g, '');
}

