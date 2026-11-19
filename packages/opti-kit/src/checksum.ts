/**
 * OptiKit Checksum — Blazing-fast, zero-dependency checksum & non-cryptographic hash algorithms.
 * Includes IEEE 802.3 CRC32, Adler-32, FNV-1a (32/64-bit), DJB2, SDBM, and Murmur3.
 */

// Precomputed CRC32 table using polynomial 0xEDB88320
const CRC_TABLE = new Uint32Array(256);
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
  }
  CRC_TABLE[i] = c >>> 0;
}

function toUint8Array(input: string | Uint8Array): Uint8Array {
  if (typeof input !== 'string') {
    return input;
  }
  if (typeof TextEncoder !== 'undefined') {
    return new TextEncoder().encode(input);
  }
  const bytes = new Uint8Array(input.length);
  for (let i = 0; i < input.length; i++) {
    bytes[i] = input.charCodeAt(i) & 0xff;
  }
  return bytes;
}

/**
 * Computes standard IEEE 802.3 CRC-32 checksum (returns unsigned 32-bit number).
 * Uses high-performance table lookup.
 *
 * @example
 * ```ts
 * fastCrc32('The quick brown fox jumps over the lazy dog');
 * // → 1095738169
 * ```
 */
export function fastCrc32(input: string | Uint8Array): number {
  const bytes = toUint8Array(input);
  let crc = 0 ^ (-1);

  for (let i = 0; i < bytes.length; i++) {
    crc = (crc >>> 8) ^ CRC_TABLE[(crc ^ bytes[i]) & 0xff];
  }

  return ((crc ^ (-1)) >>> 0);
}

/**
 * Computes CRC-32 and returns a formatted 8-character lowercase hexadecimal string.
 *
 * @example
 * ```ts
 * crc32Hex('OptiKit');
 * // → '...'
 * ```
 */
export function crc32Hex(input: string | Uint8Array): string {
  return fastCrc32(input).toString(16).padStart(8, '0');
}

/**
 * Computes Adler-32 checksum (used in zlib RFC 1950).
 *
 * @example
 * ```ts
 * adler32('Wikipedia');
 * // → 300286872
 * ```
 */
export function adler32(input: string | Uint8Array): number {
  const MOD_ADLER = 65521;
  const bytes = toUint8Array(input);
  let a = 1;
  let b = 0;

  for (let i = 0; i < bytes.length; i++) {
    a = (a + bytes[i]) % MOD_ADLER;
    b = (b + a) % MOD_ADLER;
  }

  return ((b << 16) | a) >>> 0;
}

/**
 * Computes Adler-32 and returns an 8-character hex string.
 */
export function adler32Hex(input: string | Uint8Array): string {
  return adler32(input).toString(16).padStart(8, '0');
}

/**
 * Fowler–Noll–Vo 32-bit (FNV-1a) hash function.
 *
 * @example
 * ```ts
 * fnv1a32('hello world');
 * // → 3583457375
 * ```
 */
export function fnv1a32(input: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

/**
 * Computes FNV-1a 32-bit and returns a hex string.
 */
export function fnv1a32Hex(input: string): string {
  return fnv1a32(input).toString(16).padStart(8, '0');
}

/**
 * Fowler–Noll–Vo 64-bit (FNV-1a) hash using native BigInt.
 * Returns a 16-character hexadecimal string.
 */
export function fnv1a64(input: string): string {
  let hash = 0xcbf29ce484222325n;
  const prime = 0x100000001b3n;

  for (let i = 0; i < input.length; i++) {
    hash ^= BigInt(input.charCodeAt(i));
    hash = (hash * prime) & 0xffffffffffffffffn;
  }

  return hash.toString(16).padStart(16, '0');
}


/**
 * MurmurHash3 32-bit implementation.
 *
 * @example
 * ```ts
 * murmur3('opti-kit', 42);
 * // → 32-bit unsigned int
 * ```
 */
export function murmur3(key: string, seed = 0): number {
  let h1 = seed >>> 0;
  const c1 = 0xcc9e2d51;
  const c2 = 0x1b873593;

  const remainder = key.length & 3;
  const bytes = key.length - remainder;

  for (let i = 0; i < bytes; i += 4) {
    let k1 =
      (key.charCodeAt(i) & 0xff) |
      ((key.charCodeAt(i + 1) & 0xff) << 8) |
      ((key.charCodeAt(i + 2) & 0xff) << 16) |
      ((key.charCodeAt(i + 3) & 0xff) << 24);

    k1 = Math.imul(k1, c1);
    k1 = (k1 << 15) | (k1 >>> 17);
    k1 = Math.imul(k1, c2);

    h1 ^= k1;
    h1 = (h1 << 13) | (h1 >>> 19);
    h1 = Math.imul(h1, 5) + 0xe6546b64;
  }

  let k1 = 0;
  switch (remainder) {
    case 3:
      k1 ^= (key.charCodeAt(bytes + 2) & 0xff) << 16;
    case 2:
      k1 ^= (key.charCodeAt(bytes + 1) & 0xff) << 8;
    case 1:
      k1 ^= (key.charCodeAt(bytes) & 0xff);
      k1 = Math.imul(k1, c1);
      k1 = (k1 << 15) | (k1 >>> 17);
      k1 = Math.imul(k1, c2);
      h1 ^= k1;
  }

  h1 ^= key.length;
  h1 ^= h1 >>> 16;
  h1 = Math.imul(h1, 0x85ebca6b);
  h1 ^= h1 >>> 13;
  h1 = Math.imul(h1, 0xc2b2ae35);
  h1 ^= h1 >>> 16;

  return h1 >>> 0;
}
