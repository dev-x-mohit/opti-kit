declare const Buffer: any;

/**
 * Encodes a string to Base64 format.
 * Supports both Browser (btoa) and Node.js (Buffer).
 */
export function base64Encode(str: string): string {
  if (typeof btoa === "function") {
    return btoa(unescape(encodeURIComponent(str)));
  }
  if (typeof Buffer !== "undefined") {
    return Buffer.from(str, "utf-8").toString("base64");
  }
  throw new Error("Base64 encoding not supported in this environment");
}

/**
 * Decodes a Base64 string back to its original string format.
 * Supports both Browser (atob) and Node.js (Buffer).
 */
export function base64Decode(str: string): string {
  if (typeof atob === "function") {
    return decodeURIComponent(escape(atob(str)));
  }
  if (typeof Buffer !== "undefined") {
    return Buffer.from(str, "base64").toString("utf-8");
  }
  throw new Error("Base64 decoding not supported in this environment");
}

/**
 * Encodes a string into a Uint8Array using UTF-8 encoding.
 */
export function utf8Encode(str: string): Uint8Array {
  if (typeof TextEncoder !== "undefined") {
    return new TextEncoder().encode(str);
  }
  if (typeof Buffer !== "undefined") {
    return new Uint8Array(Buffer.from(str, "utf-8"));
  }
  throw new Error("UTF-8 encoding not supported in this environment");
}

/**
 * Decodes a Uint8Array back into a string using UTF-8 decoding.
 */
export function utf8Decode(bytes: Uint8Array): string {
  if (typeof TextDecoder !== "undefined") {
    return new TextDecoder().decode(bytes);
  }
  if (typeof Buffer !== "undefined") {
    return Buffer.from(bytes).toString("utf-8");
  }
  throw new Error("UTF-8 decoding not supported in this environment");
}

/**
 * Encodes a string into a Hexadecimal format.
 */
export function hexEncode(str: string): string {
  const bytes = utf8Encode(str);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Decodes a Hexadecimal string back into its original string format.
 */
export function hexDecode(hexStr: string): string {
  if (hexStr.length % 2 !== 0) {
    throw new Error("Invalid hex string length");
  }
  const bytes = new Uint8Array(hexStr.length / 2);
  for (let i = 0; i < hexStr.length; i += 2) {
    bytes[i / 2] = parseInt(hexStr.substring(i, i + 2), 16);
  }
  return utf8Decode(bytes);
}

/**
 * Safely encodes a URI component.
 */
export function urlEncode(str: string): string {
  return encodeURIComponent(str);
}

/**
 * Safely decodes a URI component.
 */
export function urlDecode(str: string): string {
  try {
    return decodeURIComponent(str);
  } catch {
    return str;
  }
}


/**
 * Converts a Uint8Array buffer into a hexadecimal string.
 */
export function bufferToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Converts a hexadecimal string into a Uint8Array buffer.
 */
export function hexToBuffer(hexStr: string): Uint8Array {
  if (hexStr.length % 2 !== 0) {
    throw new Error("Invalid hex string length");
  }
  const bytes = new Uint8Array(hexStr.length / 2);
  for (let i = 0; i < hexStr.length; i += 2) {
    bytes[i / 2] = parseInt(hexStr.substring(i, i + 2), 16);
  }
  return bytes;
}


