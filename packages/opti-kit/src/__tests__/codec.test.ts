import { describe, it, expect } from 'vitest';
import {
  encodeBase58,
  decodeBase58,
  encodeBase62,
  decodeBase62,
  encodeBase32,
  decodeBase32,
  generateShortId,
  urlSafeBase64Encode,
  urlSafeBase64Decode
} from '../codec';

describe('Multi-Base Codecs & Short ID Generator', () => {
  it('should encode and decode Base58 (Bitcoin alphabet)', () => {
    const text = 'Hello OptiKit!';
    const encoded = encodeBase58(text);
    expect(typeof encoded).toBe('string');
    expect(encoded.length).toBeGreaterThan(0);

    const decoded = decodeBase58(encoded);
    expect(decoded).toBe(text);
  });

  it('should encode and decode Base62 for short IDs and numbers', () => {
    const num = 1253094857;
    const b62 = encodeBase62(num);
    expect(typeof b62).toBe('string');

    const decoded = decodeBase62(b62);
    expect(Number(decoded)).toBe(num);
  });

  it('should encode and decode RFC 4648 Base32 (2FA/TOTP)', () => {
    const text = 'OptiKitSecurity';
    const b32 = encodeBase32(text);
    expect(b32).toBeDefined();

    const decoded = decodeBase32(b32);
    expect(decoded).toBe(text);
  });

  it('should generate URL-friendly short IDs of requested length', () => {
    const id1 = generateShortId(12);
    const id2 = generateShortId(12);

    expect(id1.length).toBe(12);
    expect(id2.length).toBe(12);
    expect(id1).not.toBe(id2);
  });

  it('should encode and decode URL-Safe Base64', () => {
    const text = 'special+chars/and=padding?yes';
    const safe = urlSafeBase64Encode(text);
    expect(safe).not.toContain('+');
    expect(safe).not.toContain('/');
    expect(safe).not.toContain('=');

    const recovered = urlSafeBase64Decode(safe);
    expect(recovered).toBe(text);
  });
});
