/**
 * OptiKit Encoding Pro — Varint, ZigZag, LEB128, TLV, Netstring, BSON-lite,
 * strict QueryString, bitstrings, and Uint8Array binary manipulation.
 */

/** Encodes a non-negative 32-bit integer into unsigned Varint bytes. */
export function encodeVarint(value: number): Uint8Array {
  let v = value >>> 0;
  const bytes: number[] = [];
  while (v >= 0x80) {
    bytes.push((v & 0x7f) | 0x80);
    v >>>= 7;
  }
  bytes.push(v);
  return new Uint8Array(bytes);
}

/** Decodes an unsigned Varint from `bytes` at `offset`, returning `{ value, bytesRead }`. */
export function decodeVarint(bytes: Uint8Array, offset = 0): { value: number; bytesRead: number } {
  let result = 0;
  let shift = 0;
  let i = offset;
  while (i < bytes.length) {
    const b = bytes[i++];
    result |= (b & 0x7f) << shift;
    if ((b & 0x80) === 0) return { value: result >>> 0, bytesRead: i - offset };
    shift += 7;
  }
  throw new Error('Truncated Varint');
}

/** ZigZag-encodes a signed 32-bit integer into an unsigned integer. */
export function encodeZigZag(n: number): number {
  return ((n << 1) ^ (n >> 31)) >>> 0;
}

/** Decodes a ZigZag-encoded unsigned integer back to a signed 32-bit integer. */
export function decodeZigZag(n: number): number {
  return (n >>> 1) ^ -(n & 1);
}

/** Encodes a Type-Length-Value (TLV) frame (`1-byte tag + varint length + payload`). */
export function encodeTlv(tag: number, value: Uint8Array): Uint8Array {
  const lenBytes = encodeVarint(value.length);
  const out = new Uint8Array(1 + lenBytes.length + value.length);
  out[0] = tag & 0xff;
  out.set(lenBytes, 1);
  out.set(value, 1 + lenBytes.length);
  return out;
}

/** Decodes a TLV frame from `bytes` at `offset`. */
export function decodeTlv(
  bytes: Uint8Array,
  offset = 0
): { tag: number; value: Uint8Array; bytesRead: number } {
  const tag = bytes[offset];
  const { value: len, bytesRead } = decodeVarint(bytes, offset + 1);
  const start = offset + 1 + bytesRead;
  return {
    tag,
    value: bytes.slice(start, start + len),
    bytesRead: 1 + bytesRead + len,
  };
}

/** Encodes a BigInt using unsigned LEB128. */
export function encodeLeb128(value: bigint): Uint8Array {
  let v = value;
  const out: number[] = [];
  do {
    let byte = Number(v & 0x7fn);
    v >>= 7n;
    if (v !== 0n) byte |= 0x80;
    out.push(byte);
  } while (v !== 0n);
  return new Uint8Array(out);
}

/** Decodes unsigned LEB128 bytes into a BigInt. */
export function decodeLeb128(bytes: Uint8Array, offset = 0): { value: bigint; bytesRead: number } {
  let result = 0n;
  let shift = 0n;
  let i = offset;
  while (i < bytes.length) {
    const b = BigInt(bytes[i++]);
    result |= (b & 0x7fn) << shift;
    if ((b & 0x80n) === 0n) return { value: result, bytesRead: i - offset };
    shift += 7n;
  }
  throw new Error('Truncated LEB128');
}

/** Packs a JSON-compatible object into a compact binary BSON-lite buffer. */
export function packBsonLite(obj: unknown): Uint8Array {
  const te = new TextEncoder();
  const payload = te.encode(JSON.stringify(obj));
  const out = new Uint8Array(4 + payload.length);
  new DataView(out.buffer).setUint32(0, payload.length, false);
  out.set(payload, 4);
  return out;
}

/** Unpacks a BSON-lite buffer back into a JavaScript value. */
export function unpackBsonLite<T = unknown>(bytes: Uint8Array): T {
  const len = new DataView(bytes.buffer, bytes.byteOffset, 4).getUint32(0, false);
  const td = new TextDecoder();
  return JSON.parse(td.decode(bytes.slice(4, 4 + len))) as T;
}

/** Encodes a flat record into an RFC 3986 strict query string (sorted keys). */
export function encodeQueryStringStrict(params: Record<string, string | number | boolean>): string {
  return Object.keys(params)
    .sort()
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(String(params[k]))}`)
    .join('&');
}

/** Decodes a query string into a key-value record. */
export function decodeQueryStringStrict(qs: string): Record<string, string> {
  const clean = qs.startsWith('?') ? qs.slice(1) : qs;
  const out: Record<string, string> = {};
  if (!clean) return out;
  for (const part of clean.split('&')) {
    const [k, v = ''] = part.split('=');
    if (k) out[decodeURIComponent(k)] = decodeURIComponent(v);
  }
  return out;
}

/** Encodes a string into a DJB Netstring (`<len>:<str>,`). */
export function encodeNetstring(data: string): string {
  return `${data.length}:${data},`;
}

/** Decodes a DJB Netstring (`<len>:<str>,`). */
export function decodeNetstring(frame: string): string {
  const colon = frame.indexOf(':');
  if (colon === -1) throw new Error('Invalid netstring: missing colon');
  const len = Number.parseInt(frame.slice(0, colon), 10);
  const payload = frame.slice(colon + 1, colon + 1 + len);
  if (frame[colon + 1 + len] !== ',') throw new Error('Invalid netstring: missing trailing comma');
  return payload;
}

/** Converts a `Uint8Array` to an 8-bit-per-byte binary string. */
export function bytesToBitString(bytes: Uint8Array): string {
  return Array.from(bytes, (b) => b.toString(2).padStart(8, '0')).join('');
}

/** Converts an 8-bit-aligned binary string back to a `Uint8Array`. */
export function bitStringToBytes(bits: string): Uint8Array {
  const clean = bits.replace(/\s+/g, '');
  const out = new Uint8Array(Math.ceil(clean.length / 8));
  for (let i = 0; i < out.length; i++) {
    out[i] = Number.parseInt(clean.slice(i * 8, i * 8 + 8).padEnd(8, '0'), 2);
  }
  return out;
}

/** Concatenates multiple `Uint8Array` buffers into one. */
export function uint8ArrayConcat(arrays: readonly Uint8Array[]): Uint8Array {
  const total = arrays.reduce((s, a) => s + a.length, 0);
  const out = new Uint8Array(total);
  let offset = 0;
  for (const a of arrays) {
    out.set(a, offset);
    offset += a.length;
  }
  return out;
}

/** Checks byte-for-byte equality of two `Uint8Array` instances. */
export function uint8ArrayEquals(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
  return true;
}

/** Finds the first index of `needle` sequence inside `haystack`, or `-1`. */
export function uint8ArrayIndexOf(haystack: Uint8Array, needle: Uint8Array, start = 0): number {
  if (needle.length === 0) return start;
  outer: for (let i = start; i <= haystack.length - needle.length; i++) {
    for (let j = 0; j < needle.length; j++) {
      if (haystack[i + j] !== needle[j]) continue outer;
    }
    return i;
  }
  return -1;
}

/** Splits a `Uint8Array` by a delimiter byte sequence. */
export function uint8ArraySplit(data: Uint8Array, delimiter: Uint8Array): Uint8Array[] {
  if (delimiter.length === 0) return [data];
  const parts: Uint8Array[] = [];
  let pos = 0;
  while (pos <= data.length) {
    const idx = uint8ArrayIndexOf(data, delimiter, pos);
    if (idx === -1) {
      parts.push(data.slice(pos));
      break;
    }
    parts.push(data.slice(pos, idx));
    pos = idx + delimiter.length;
  }
  return parts;
}

/** Encodes a 32-bit unsigned integer into 4 big-endian bytes. */
export function uint32ToBytesBE(n: number): Uint8Array {
  const out = new Uint8Array(4);
  new DataView(out.buffer).setUint32(0, n >>> 0, false);
  return out;
}

/** Decodes 4 big-endian bytes into an unsigned 32-bit integer. */
export function bytesToUint32BE(bytes: Uint8Array, offset = 0): number {
  return new DataView(bytes.buffer, bytes.byteOffset + offset, 4).getUint32(0, false);
}

/** Encodes a 64-bit IEEE-754 float into 8 big-endian bytes. */
export function float64ToBytesBE(n: number): Uint8Array {
  const out = new Uint8Array(8);
  new DataView(out.buffer).setFloat64(0, n, false);
  return out;
}

/** Decodes 8 big-endian bytes into a 64-bit IEEE-754 float. */
export function bytesToFloat64BE(bytes: Uint8Array, offset = 0): number {
  return new DataView(bytes.buffer, bytes.byteOffset + offset, 8).getFloat64(0, false);
}
