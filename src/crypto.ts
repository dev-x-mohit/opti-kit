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
