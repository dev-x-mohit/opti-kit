/**
 * Generates an RFC4122 v4 compliant UUID.
 * Uses native crypto.randomUUID if available, falling back to a performant PRNG implementation.
 */
export function uuid(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Calculates a fast FNV-1a 32-bit non-cryptographic hash of a string.
 * Returns an unsigned 32-bit integer.
 */
export function fnv1a(str: string): number {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

/**
 * Generates a cryptographically secure random token of a specified length (hexadecimal).
 * Falls back to a high-entropy pseudo-random generator if Web Crypto is unavailable.
 */
export function generateToken(length = 32): string {
  const alphabet = "0123456789abcdef";
  if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
    const bytes = new Uint8Array(Math.ceil(length / 2));
    crypto.getRandomValues(bytes);
    let token = "";
    for (let i = 0; i < bytes.length; i++) {
      token += bytes[i].toString(16).padStart(2, "0");
    }
    return token.slice(0, length);
  }
  // Fallback
  let result = "";
  for (let i = 0; i < length; i++) {
    result += alphabet[Math.floor(Math.random() * 16)];
  }
  return result;
}

/**
 * Generates a SHA-256 hash of a string using Web Crypto API.
 * Returns a Promise resolving to a hexadecimal digest string.
 */
export async function sha256(message: string): Promise<string> {
  if (
    typeof crypto !== "undefined" &&
    crypto.subtle &&
    typeof crypto.subtle.digest === "function"
  ) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  throw new Error("SubtleCrypto SHA-256 is not supported in this environment.");
}

/**
 * Generates a SHA-1 hash of a string using Web Crypto API.
 * Returns a Promise resolving to a hexadecimal digest string.
 */
export async function sha1(message: string): Promise<string> {
  if (
    typeof crypto !== "undefined" &&
    crypto.subtle &&
    typeof crypto.subtle.digest === "function"
  ) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-1", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  throw new Error("SubtleCrypto SHA-1 is not supported in this environment.");
}

/**
 * Generates a SHA-384 hash of a string using Web Crypto API.
 * Returns a Promise resolving to a hexadecimal digest string.
 */
export async function sha384(message: string): Promise<string> {
  if (
    typeof crypto !== "undefined" &&
    crypto.subtle &&
    typeof crypto.subtle.digest === "function"
  ) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-384", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  throw new Error("SubtleCrypto SHA-384 is not supported in this environment.");
}

/**
 * Generates a SHA-512 hash of a string using Web Crypto API.
 * Returns a Promise resolving to a hexadecimal digest string.
 */
export async function sha512(message: string): Promise<string> {
  if (
    typeof crypto !== "undefined" &&
    crypto.subtle &&
    typeof crypto.subtle.digest === "function"
  ) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-512", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  throw new Error("SubtleCrypto SHA-512 is not supported in this environment.");
}

/**
 * Generates an HMAC-SHA-256 signature for a message and a secret key using Web Crypto API.
 * Returns a Promise resolving to a hexadecimal signature string.
 */
export async function hmacSha256(message: string, secret: string): Promise<string> {
  if (
    typeof crypto !== "undefined" &&
    crypto.subtle &&
    typeof crypto.subtle.importKey === "function"
  ) {
    const enc = new TextEncoder();
    const keyData = enc.encode(secret);
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const msgBuffer = enc.encode(message);
    const signatureBuffer = await crypto.subtle.sign("HMAC", cryptoKey, msgBuffer);
    const sigArray = Array.from(new Uint8Array(signatureBuffer));
    return sigArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  throw new Error("SubtleCrypto HMAC is not supported in this environment.");
}

/**
 * Generates a cryptographically secure random integer between min and max (inclusive).
 */
export function randomInt(min: number, max: number): number {
  if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
    const range = max - min + 1;
    const maxValid = Math.floor(4294967296 / range) * range;
    const buffer = new Uint32Array(1);
    
    let val: number;
    do {
      crypto.getRandomValues(buffer);
      val = buffer[0];
    } while (val >= maxValid);
    
    return min + (val % range);
  }
  // Fallback to Math.random if crypto is missing
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Calculates a fast, 53-bit non-cryptographic string hash using the cyrb53 algorithm.
 * Extremely fast and robust for generating short, unique keys or ids from strings.
 */
export function cyrb53(str: string, seed = 0): number {
  let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
  for(let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1  = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2  = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}
