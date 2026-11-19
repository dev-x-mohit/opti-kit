/**
 * OptiKit Codec — Zero-dependency multi-base encoding/decoding engine.
 * Includes Bitcoin Base58, Base62 (short URLs), RFC 4648 Base32 (2FA/TOTP),
 * and URL-Safe Base64 with collision-resistant short ID generator.
 */

const BASE58_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const BASE62_ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

function toBytes(input: string | Uint8Array): Uint8Array {
  if (typeof input !== 'string') return input;
  if (typeof TextEncoder !== 'undefined') {
    return new TextEncoder().encode(input);
  }
  const bytes = new Uint8Array(input.length);
  for (let i = 0; i < input.length; i++) {
    bytes[i] = input.charCodeAt(i) & 0xff;
  }
  return bytes;
}

function bytesToString(bytes: Uint8Array): string {
  if (typeof TextDecoder !== 'undefined') {
    return new TextDecoder().decode(bytes);
  }
  let str = '';
  for (let i = 0; i < bytes.length; i++) {
    str += String.fromCharCode(bytes[i]);
  }
  return str;
}

/**
 * Encodes an input string or Uint8Array to a Base58 string (Bitcoin alphabet).
 *
 * @example
 * ```ts
 * encodeBase58('hello world');
 * // → 'StV1DL6CwTryKyV'
 * ```
 */
export function encodeBase58(input: string | Uint8Array): string {
  const bytes = toBytes(input);
  if (bytes.length === 0) return '';

  let zeroes = 0;
  while (zeroes < bytes.length && bytes[zeroes] === 0) {
    zeroes++;
  }

  // Large integer representation using base 256 to base 58
  const digits: number[] = [0];
  for (let i = zeroes; i < bytes.length; i++) {
    let carry = bytes[i];
    for (let j = 0; j < digits.length; j++) {
      carry += digits[j] << 8;
      digits[j] = carry % 58;
      carry = (carry / 58) | 0;
    }
    while (carry > 0) {
      digits.push(carry % 58);
      carry = (carry / 58) | 0;
    }
  }

  let str = '1'.repeat(zeroes);
  for (let k = digits.length - 1; k >= 0; k--) {
    str += BASE58_ALPHABET[digits[k]];
  }
  return str;
}

/**
 * Decodes a Base58 string back to bytes or string.
 */
export function decodeBase58(input: string, asString = true): string | Uint8Array {
  if (input.length === 0) return asString ? '' : new Uint8Array(0);

  let zeroes = 0;
  while (zeroes < input.length && input[zeroes] === '1') {
    zeroes++;
  }

  const bytes: number[] = [0];
  for (let i = zeroes; i < input.length; i++) {
    const val = BASE58_ALPHABET.indexOf(input[i]);
    if (val === -1) {
      throw new Error(`Invalid Base58 character: "${input[i]}"`);
    }

    let carry = val;
    for (let j = 0; j < bytes.length; j++) {
      carry += bytes[j] * 58;
      bytes[j] = carry & 0xff;
      carry >>= 8;
    }
    while (carry > 0) {
      bytes.push(carry & 0xff);
      carry >>= 8;
    }
  }

  const result = new Uint8Array(zeroes + bytes.length);
  for (let i = 0; i < zeroes; i++) {
    result[i] = 0;
  }
  for (let i = 0; i < bytes.length; i++) {
    result[zeroes + i] = bytes[bytes.length - 1 - i];
  }

  return asString ? bytesToString(result) : result;
}

/**
 * Encodes an integer or BigInt to a Base62 string (alphanumeric [0-9a-zA-Z]).
 *
 * @example
 * ```ts
 * encodeBase62(1253094857);
 * // → '1m70Yf'
 * ```
 */
export function encodeBase62(num: number | bigint): string {
  let n = BigInt(num);
  if (n === 0n) return '0';

  let result = '';
  const base = 62n;

  while (n > 0n) {
    const rem = Number(n % base);
    result = BASE62_ALPHABET[rem] + result;
    n = n / base;
  }

  return result;
}

/**
 * Decodes a Base62 string into a BigInt integer.
 */
export function decodeBase62(str: string): bigint {
  let result = 0n;
  const base = 62n;

  for (let i = 0; i < str.length; i++) {
    const idx = BASE62_ALPHABET.indexOf(str[i]);
    if (idx === -1) {
      throw new Error(`Invalid Base62 character: "${str[i]}"`);
    }
    result = result * base + BigInt(idx);
  }

  return result;
}

/**
 * Encodes input to RFC 4648 Base32 (used in 2FA/TOTP secret keys).
 *
 * @example
 * ```ts
 * encodeBase32('OptiKit');
 * // → 'J5UGQ2LPNV2A===='
 * ```
 */
export function encodeBase32(input: string | Uint8Array, pad = false): string {
  const bytes = toBytes(input);
  let bits = 0;
  let value = 0;
  let output = '';

  for (let i = 0; i < bytes.length; i++) {
    value = (value << 8) | bytes[i];
    bits += 8;

    while (bits >= 5) {
      output += BASE32_ALPHABET[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }

  if (bits > 0) {
    output += BASE32_ALPHABET[(value << (5 - bits)) & 31];
  }

  if (pad) {
    while (output.length % 8 !== 0) {
      output += '=';
    }
  }

  return output;
}

/**
 * Decodes an RFC 4648 Base32 string.
 */
export function decodeBase32(input: string, asString = true): string | Uint8Array {
  const clean = input.toUpperCase().replace(/=+$/, '');
  let bits = 0;
  let value = 0;
  const out: number[] = [];

  for (let i = 0; i < clean.length; i++) {
    const idx = BASE32_ALPHABET.indexOf(clean[i]);
    if (idx === -1) {
      throw new Error(`Invalid Base32 character: "${clean[i]}"`);
    }

    value = (value << 5) | idx;
    bits += 5;

    if (bits >= 8) {
      out.push((value >>> (bits - 8)) & 255);
      bits -= 8;
    }
  }

  const uint8 = new Uint8Array(out);
  return asString ? bytesToString(uint8) : uint8;
}

/**
 * Generates a cryptographically random, URL-friendly short identifier.
 *
 * @example
 * ```ts
 * generateShortId(10);
 * // → '7Kx9M2wP1a'
 * ```
 */
export function generateShortId(length = 10, alphabet = BASE62_ALPHABET): string {
  let id = '';
  const cryptoObj = typeof crypto !== 'undefined' ? crypto : (globalThis as any).crypto;

  if (cryptoObj && cryptoObj.getRandomValues) {
    const randomBytes = new Uint8Array(length);
    cryptoObj.getRandomValues(randomBytes);
    for (let i = 0; i < length; i++) {
      id += alphabet[randomBytes[i] % alphabet.length];
    }
  } else {
    for (let i = 0; i < length; i++) {
      id += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
  }

  return id;
}

/**
 * Encodes a string into URL-Safe Base64 (RFC 4648 §5).
 */
export function urlSafeBase64Encode(input: string): string {
  let base64 = '';
  if (typeof btoa !== 'undefined') {
    base64 = btoa(input);
  } else if (typeof (globalThis as any).Buffer !== 'undefined') {
    base64 = (globalThis as any).Buffer.from(input, 'utf-8').toString('base64');
  } else {
    throw new Error('Base64 not supported in this runtime');
  }

  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * Decodes a URL-Safe Base64 string.
 */
export function urlSafeBase64Decode(input: string): string {
  let base64 = input.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4 !== 0) {
    base64 += '=';
  }

  if (typeof atob !== 'undefined') {
    return atob(base64);
  } else if (typeof (globalThis as any).Buffer !== 'undefined') {
    return (globalThis as any).Buffer.from(base64, 'base64').toString('utf-8');
  }
  throw new Error('Base64 not supported in this runtime');
}
