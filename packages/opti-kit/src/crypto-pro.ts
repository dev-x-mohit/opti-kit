/**
 * OptiKit Crypto Pro — Pure JS/TS zero-dependency HMAC-SHA256, PBKDF2, HKDF,
 * HOTP/TOTP (RFC 4226 / 6238), JWT parsing, PKCE, SipHash/XXHash32/CRC32C, and ciphers.
 */

const SHA256_K = new Uint32Array([
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
]);

function sha256Bytes(data: Uint8Array): Uint8Array {
  const rotr = (x: number, n: number) => (x >>> n) | (x << (32 - n));
  const bitLen = data.length * 8;
  const paddedLen = Math.ceil((data.length + 9) / 64) * 64;
  const padded = new Uint8Array(paddedLen);
  padded.set(data);
  padded[data.length] = 0x80;
  const view = new DataView(padded.buffer);
  view.setUint32(paddedLen - 4, bitLen >>> 0, false);
  view.setUint32(paddedLen - 8, Math.floor(bitLen / 0x100000000), false);

  let h0 = 0x6a09e667, h1 = 0xbb67ae85, h2 = 0x3c6ef372, h3 = 0xa54ff53a;
  let h4 = 0x510e527f, h5 = 0x9b05688c, h6 = 0x1f83d9ab, h7 = 0x5be0cd19;
  const w = new Uint32Array(64);

  for (let offset = 0; offset < paddedLen; offset += 64) {
    for (let i = 0; i < 16; i++) w[i] = view.getUint32(offset + i * 4, false);
    for (let i = 16; i < 64; i++) {
      const s0 = rotr(w[i - 15], 7) ^ rotr(w[i - 15], 18) ^ (w[i - 15] >>> 3);
      const s1 = rotr(w[i - 2], 17) ^ rotr(w[i - 2], 19) ^ (w[i - 2] >>> 10);
      w[i] = (w[i - 16] + s0 + w[i - 7] + s1) >>> 0;
    }
    let a = h0, b = h1, c = h2, d = h3, e = h4, f = h5, g = h6, h = h7;
    for (let i = 0; i < 64; i++) {
      const S1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
      const ch = (e & f) ^ (~e & g);
      const temp1 = (h + S1 + ch + SHA256_K[i] + w[i]) >>> 0;
      const S0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const temp2 = (S0 + maj) >>> 0;
      h = g; g = f; f = e; e = (d + temp1) >>> 0;
      d = c; c = b; b = a; a = (temp1 + temp2) >>> 0;
    }
    h0 = (h0 + a) >>> 0; h1 = (h1 + b) >>> 0; h2 = (h2 + c) >>> 0; h3 = (h3 + d) >>> 0;
    h4 = (h4 + e) >>> 0; h5 = (h5 + f) >>> 0; h6 = (h6 + g) >>> 0; h7 = (h7 + h) >>> 0;
  }

  const out = new Uint8Array(32);
  const outView = new DataView(out.buffer);
  [h0, h1, h2, h3, h4, h5, h6, h7].forEach((val, i) => outView.setUint32(i * 4, val, false));
  return out;
}

const enc = new TextEncoder();
const toBytes = (v: string | Uint8Array): Uint8Array => (typeof v === 'string' ? enc.encode(v) : v);

/** Computes synchronous pure-JS HMAC-SHA256 returning a 32-byte `Uint8Array`. */
export function hmacSha256Pure(key: string | Uint8Array, message: string | Uint8Array): Uint8Array {
  let k = toBytes(key);
  if (k.length > 64) k = sha256Bytes(k);
  const blockKey = new Uint8Array(64);
  blockKey.set(k);
  const oPad = new Uint8Array(64);
  const iPad = new Uint8Array(64);
  for (let i = 0; i < 64; i++) {
    oPad[i] = blockKey[i] ^ 0x5c;
    iPad[i] = blockKey[i] ^ 0x36;
  }
  const msg = toBytes(message);
  const inner = new Uint8Array(64 + msg.length);
  inner.set(iPad);
  inner.set(msg, 64);
  const innerHash = sha256Bytes(inner);
  const outer = new Uint8Array(64 + 32);
  outer.set(oPad);
  outer.set(innerHash, 64);
  return sha256Bytes(outer);
}

/** Derives a key using PBKDF2-HMAC-SHA256 (pure JS). */
export function pbkdf2Pure(
  password: string | Uint8Array,
  salt: string | Uint8Array,
  iterations: number,
  keyLen: number
): Uint8Array {
  const passBytes = toBytes(password);
  const saltBytes = toBytes(salt);
  const blockCount = Math.ceil(keyLen / 32);
  const out = new Uint8Array(blockCount * 32);
  for (let b = 1; b <= blockCount; b++) {
    const input = new Uint8Array(saltBytes.length + 4);
    input.set(saltBytes);
    new DataView(input.buffer).setUint32(saltBytes.length, b, false);
    let u = hmacSha256Pure(passBytes, input);
    const t = new Uint8Array(u);
    for (let i = 1; i < iterations; i++) {
      u = hmacSha256Pure(passBytes, u);
      for (let j = 0; j < 32; j++) t[j] ^= u[j];
    }
    out.set(t, (b - 1) * 32);
  }
  return out.slice(0, keyLen);
}

/** Derives key material using HKDF-SHA256 (RFC 5869). */
export function hkdfPure(
  ikm: string | Uint8Array,
  salt: string | Uint8Array = new Uint8Array(32),
  info: string | Uint8Array = new Uint8Array(0),
  length = 32
): Uint8Array {
  const prk = hmacSha256Pure(salt, ikm);
  const infoBytes = toBytes(info);
  const n = Math.ceil(length / 32);
  const okm = new Uint8Array(n * 32);
  let prev = new Uint8Array(0);
  for (let i = 1; i <= n; i++) {
    const input = new Uint8Array(prev.length + infoBytes.length + 1);
    input.set(prev);
    input.set(infoBytes, prev.length);
    input[input.length - 1] = i;
    prev = new Uint8Array(hmacSha256Pure(prk, input));
    okm.set(prev, (i - 1) * 32);
  }
  return okm.slice(0, length);
}

/** Generates an RFC 4226 HOTP code for a secret and counter. */
export function generateHotp(secret: Uint8Array, counter: number, digits = 6): string {
  const buf = new Uint8Array(8);
  const view = new DataView(buf.buffer);
  view.setUint32(0, Math.floor(counter / 0x100000000), false);
  view.setUint32(4, counter >>> 0, false);
  const hmac = hmacSha256Pure(secret, buf);
  const offset = hmac[hmac.length - 1] & 0x0f;
  const binCode =
    ((hmac[offset] & 0x7f) << 24) |
    ((hmac[offset + 1] & 0xff) << 16) |
    ((hmac[offset + 2] & 0xff) << 8) |
    (hmac[offset + 3] & 0xff);
  return String(binCode % 10 ** digits).padStart(digits, '0');
}

/** Generates an RFC 6238 TOTP code for a secret and timestamp. */
export function generateTotp(
  secret: Uint8Array,
  timestampMs = Date.now(),
  stepSeconds = 30,
  digits = 6
): string {
  const counter = Math.floor(timestampMs / 1000 / stepSeconds);
  return generateHotp(secret, counter, digits);
}

/** Verifies a TOTP code within a `window` of time steps. */
export function verifyTotp(
  secret: Uint8Array,
  token: string,
  timestampMs = Date.now(),
  stepSeconds = 30,
  window = 1
): boolean {
  const counter = Math.floor(timestampMs / 1000 / stepSeconds);
  for (let i = -window; i <= window; i++) {
    if (constantTimeEqual(generateHotp(secret, counter + i, token.length), token)) {
      return true;
    }
  }
  return false;
}

function base64UrlDecodeStr(str: string): string {
  const b64 = str.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(str.length / 4) * 4, '=');
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

/** Parses an unverified JWT into `{ header, payload, signature }`. */
export function parseJwt<T = Record<string, unknown>>(token: string): {
  header: Record<string, unknown>;
  payload: T;
  signature: string;
} {
  const parts = token.split('.');
  if (parts.length !== 3) throw new Error('Invalid JWT format');
  return {
    header: JSON.parse(base64UrlDecodeStr(parts[0])),
    payload: JSON.parse(base64UrlDecodeStr(parts[1])) as T,
    signature: parts[2],
  };
}

/** Checks if a JWT's `exp` claim is expired relative to `nowSeconds`. */
export function isJwtExpired(token: string, nowSeconds = Math.floor(Date.now() / 1000)): boolean {
  const { payload } = parseJwt<{ exp?: number }>(token);
  if (typeof payload.exp !== 'number') return false;
  return payload.exp <= nowSeconds;
}

/** Performs constant-time string or byte-array comparison to mitigate timing attacks. */
export function constantTimeEqual(a: string | Uint8Array, b: string | Uint8Array): boolean {
  const ba = toBytes(a);
  const bb = toBytes(b);
  if (ba.length !== bb.length) return false;
  let diff = 0;
  for (let i = 0; i < ba.length; i++) diff |= ba[i] ^ bb[i];
  return diff === 0;
}

/** Generates a prefixed random API key using `crypto.getRandomValues` when available. */
export function generateApiKey(prefix = 'ok_live_', length = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const bytes = new Uint8Array(length);
  if (typeof globalThis.crypto?.getRandomValues === 'function') {
    globalThis.crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < length; i++) bytes[i] = Math.floor(Math.random() * 256);
  }
  let out = prefix;
  for (let i = 0; i < length; i++) out += chars[bytes[i] % chars.length];
  return out;
}

/** Masks a secret string, preserving `visibleStart` and `visibleEnd` characters. */
export function maskSecret(secret: string, visibleStart = 4, visibleEnd = 4): string {
  if (secret.length <= visibleStart + visibleEnd) return '*'.repeat(secret.length);
  return (
    secret.slice(0, visibleStart) +
    '*'.repeat(secret.length - visibleStart - visibleEnd) +
    secret.slice(secret.length - visibleEnd)
  );
}

/** Computes Castagnoli CRC-32C checksum over a byte array or string. */
export function crc32c(data: string | Uint8Array): number {
  const bytes = toBytes(data);
  let crc = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) {
    crc ^= bytes[i];
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0x82f63b78 : 0);
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

/** Computes 32-bit xxHash (XXH32) over a byte array or string. */
export function xxhash32(data: string | Uint8Array, seed = 0): number {
  const b = toBytes(data);
  const P1 = 0x9e3779b1, P2 = 0x85ebca77, P3 = 0xc2b2ae3d, P4 = 0x27d4eb2f, P5 = 0x165667b1;
  const rotl = (x: number, r: number) => ((x << r) | (x >>> (32 - r))) >>> 0;
  const len = b.length;
  let i = 0;
  let h32: number;
  if (len >= 16) {
    let v1 = (seed + P1 + P2) >>> 0, v2 = (seed + P2) >>> 0, v3 = seed >>> 0, v4 = (seed - P1) >>> 0;
    const limit = len - 16;
    while (i <= limit) {
      const r = (off: number) => (b[off] | (b[off + 1] << 8) | (b[off + 2] << 16) | (b[off + 3] << 24)) >>> 0;
      v1 = Math.imul(rotl((v1 + Math.imul(r(i), P2)) >>> 0, 13), P1) >>> 0;
      v2 = Math.imul(rotl((v2 + Math.imul(r(i + 4), P2)) >>> 0, 13), P1) >>> 0;
      v3 = Math.imul(rotl((v3 + Math.imul(r(i + 8), P2)) >>> 0, 13), P1) >>> 0;
      v4 = Math.imul(rotl((v4 + Math.imul(r(i + 12), P2)) >>> 0, 13), P1) >>> 0;
      i += 16;
    }
    h32 = (rotl(v1, 1) + rotl(v2, 7) + rotl(v3, 12) + rotl(v4, 18)) >>> 0;
  } else {
    h32 = (seed + P5) >>> 0;
  }
  h32 = (h32 + len) >>> 0;
  while (i + 4 <= len) {
    const k = (b[i] | (b[i + 1] << 8) | (b[i + 2] << 16) | (b[i + 3] << 24)) >>> 0;
    h32 = Math.imul(rotl((h32 + Math.imul(k, P3)) >>> 0, 17), P4) >>> 0;
    i += 4;
  }
  while (i < len) {
    h32 = Math.imul(rotl((h32 + Math.imul(b[i], P5)) >>> 0, 11), P1) >>> 0;
    i++;
  }
  h32 ^= h32 >>> 15;
  h32 = Math.imul(h32, P2) >>> 0;
  h32 ^= h32 >>> 13;
  h32 = Math.imul(h32, P3) >>> 0;
  h32 ^= h32 >>> 16;
  return h32 >>> 0;
}

/** Computes a 64-bit SipHash-2-4 digest as a 16-char hex string using BigInt. */
export function siphash24(key16: Uint8Array, data: string | Uint8Array): string {
  if (key16.length !== 16) throw new Error('SipHash-2-4 requires a 16-byte key');
  const m = toBytes(data);
  const view = new DataView(key16.buffer, key16.byteOffset, 16);
  const k0 = view.getBigUint64(0, true);
  const k1 = view.getBigUint64(8, true);
  const MASK = 0xffffffffffffffffn;
  const rotl = (x: bigint, b: bigint) => ((x << b) | (x >> (64n - b))) & MASK;

  let v0 = k0 ^ 0x736f6d6570736575n;
  let v1 = k1 ^ 0x646f72616e646f6dn;
  let v2 = k0 ^ 0x6c7967656e657261n;
  let v3 = k1 ^ 0x7465646279746573n;

  const sipRound = () => {
    v0 = (v0 + v1) & MASK; v1 = rotl(v1, 13n); v1 ^= v0; v0 = rotl(v0, 32n);
    v2 = (v2 + v3) & MASK; v3 = rotl(v3, 16n); v3 ^= v2;
    v0 = (v0 + v3) & MASK; v3 = rotl(v3, 21n); v3 ^= v0;
    v2 = (v2 + v1) & MASK; v1 = rotl(v1, 17n); v1 ^= v2; v2 = rotl(v2, 32n);
  };

  const blocks = Math.floor(m.length / 8);
  for (let i = 0; i < blocks; i++) {
    let mi = 0n;
    for (let j = 0; j < 8; j++) mi |= BigInt(m[i * 8 + j]) << BigInt(j * 8);
    v3 ^= mi;
    sipRound(); sipRound();
    v0 ^= mi;
  }

  let b = BigInt(m.length & 0xff) << 56n;
  for (let j = 0; j < m.length % 8; j++) {
    b |= BigInt(m[blocks * 8 + j]) << BigInt(j * 8);
  }
  v3 ^= b;
  sipRound(); sipRound();
  v0 ^= b;
  v2 ^= 0xffn;
  sipRound(); sipRound(); sipRound(); sipRound();
  const out = (v0 ^ v1 ^ v2 ^ v3) & MASK;
  return out.toString(16).padStart(16, '0');
}

const B32HEX = '0123456789ABCDEFGHIJKLMNOPQRSTUV';

/** Encodes bytes to RFC 4648 Base32Hex. */
export function base32HexEncode(data: Uint8Array): string {
  let bits = 0, value = 0, out = '';
  for (const byte of data) {
    value = (value << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      out += B32HEX[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) out += B32HEX[(value << (5 - bits)) & 31];
  while (out.length % 8 !== 0) out += '=';
  return out;
}

/** Decodes an RFC 4648 Base32Hex string to bytes. */
export function base32HexDecode(str: string): Uint8Array {
  const clean = str.replace(/=+$/, '').toUpperCase();
  let bits = 0, value = 0;
  const out: number[] = [];
  for (const ch of clean) {
    const idx = B32HEX.indexOf(ch);
    if (idx === -1) throw new Error(`Invalid Base32Hex char: ${ch}`);
    value = (value << 5) | idx;
    bits += 5;
    if (bits >= 8) {
      out.push((value >>> (bits - 8)) & 0xff);
      bits -= 8;
    }
  }
  return new Uint8Array(out);
}

/** Encodes bytes to Ascii85 (Base85). */
export function base85Encode(data: Uint8Array): string {
  let out = '';
  for (let i = 0; i < data.length; i += 4) {
    const rem = Math.min(4, data.length - i);
    let val = 0;
    for (let j = 0; j < 4; j++) {
      val = val * 256 + (j < rem ? data[i + j] : 0);
    }
    const chars: string[] = [];
    for (let j = 0; j < 5; j++) {
      chars.unshift(String.fromCharCode((val % 85) + 33));
      val = Math.floor(val / 85);
    }
    out += chars.slice(0, rem + 1).join('');
  }
  return out;
}

/** Decodes an Ascii85 (Base85) string back to bytes. */
export function base85Decode(str: string): Uint8Array {
  const out: number[] = [];
  for (let i = 0; i < str.length; i += 5) {
    const rem = Math.min(5, str.length - i);
    let val = 0;
    for (let j = 0; j < 5; j++) {
      const code = j < rem ? str.charCodeAt(i + j) - 33 : 84;
      val = val * 85 + code;
    }
    const bytes = [(val >>> 24) & 0xff, (val >>> 16) & 0xff, (val >>> 8) & 0xff, val & 0xff];
    for (let j = 0; j < rem - 1; j++) out.push(bytes[j]);
  }
  return new Uint8Array(out);
}

/** Applies ROT13 substitution to ASCII letters. */
export function rot13(text: string): string {
  return text.replace(/[A-Za-z]/g, (c) => {
    const base = c <= 'Z' ? 65 : 97;
    return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
  });
}

/** Applies a Caesar shift cipher to ASCII letters. */
export function caesarCipher(text: string, shift: number): string {
  const norm = ((shift % 26) + 26) % 26;
  return text.replace(/[A-Za-z]/g, (c) => {
    const base = c <= 'Z' ? 65 : 97;
    return String.fromCharCode(((c.charCodeAt(0) - base + norm) % 26) + base);
  });
}

/** Applies repeating-key XOR cipher to a byte array or string. */
export function xorCipher(data: Uint8Array, key: Uint8Array): Uint8Array {
  if (key.length === 0) throw new Error('XOR key cannot be empty');
  const out = new Uint8Array(data.length);
  for (let i = 0; i < data.length; i++) out[i] = data[i] ^ key[i % key.length];
  return out;
}

/** Generates an OAuth 2.0 PKCE code verifier. */
export function generatePkceVerifier(length = 64): string {
  return generateApiKey('', Math.min(128, Math.max(43, length)));
}

/** Generates a Base64URL-encoded SHA-256 PKCE code challenge from a verifier. */
export function generatePkceChallenge(verifier: string): string {
  const hash = sha256Bytes(enc.encode(verifier));
  let bin = '';
  for (const b of hash) bin += String.fromCharCode(b);
  const b64 = btoa(bin);
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/** Computes Shannon entropy in bits per character for a string. */
export function entropyBits(text: string): number {
  if (text.length === 0) return 0;
  const freq = new Map<string, number>();
  for (const ch of text) freq.set(ch, (freq.get(ch) ?? 0) + 1);
  let entropy = 0;
  for (const count of freq.values()) {
    const p = count / text.length;
    entropy -= p * Math.log2(p);
  }
  return entropy;
}
