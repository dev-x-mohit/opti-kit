import { describe, it, expect } from 'vitest';
import {
  hmacSha256Pure, pbkdf2Pure, hkdfPure, generateHotp, generateTotp, verifyTotp,
  parseJwt, isJwtExpired, constantTimeEqual, generateApiKey, maskSecret,
  crc32c, xxhash32, siphash24, base32HexEncode, base32HexDecode,
  base85Encode, base85Decode, rot13, caesarCipher, xorCipher,
  generatePkceVerifier, generatePkceChallenge, entropyBits,
} from '../crypto-pro';

describe('Crypto Pro', () => {
  it('computes HMAC-SHA256, PBKDF2, HKDF, HOTP, and TOTP', () => {
    const mac = hmacSha256Pure('key', 'The quick brown fox jumps over the lazy dog');
    const hex = Array.from(mac).map((b) => b.toString(16).padStart(2, '0')).join('');
    expect(hex).toBe('f7bc83f430538424b13298e6aa6fb143ef4d59a14946175997479dbc2d1a3cd8');

    expect(pbkdf2Pure('pass', 'salt', 10, 16).length).toBe(16);
    expect(hkdfPure('ikm', 'salt', 'info', 32).length).toBe(32);

    const secret = new TextEncoder().encode('12345678901234567890');
    const code = generateHotp(secret, 1, 6);
    expect(code).toMatch(/^\d{6}$/);
    const totp = generateTotp(secret, 1_700_000_000_000);
    expect(verifyTotp(secret, totp, 1_700_000_000_000)).toBe(true);
  });

  it('handles JWT parsing, hashes, codecs, ciphers, and PKCE', () => {
    const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
    const payload = Buffer.from(JSON.stringify({ sub: '123', exp: 9999999999 })).toString('base64url');
    const jwt = `${header}.${payload}.sig`;
    expect(parseJwt<{ sub: string }>(jwt).payload.sub).toBe('123');
    expect(isJwtExpired(jwt, 1000)).toBe(false);

    expect(constantTimeEqual('abc', 'abc')).toBe(true);
    expect(constantTimeEqual('abc', 'abd')).toBe(false);
    expect(generateApiKey('sk_', 16).startsWith('sk_')).toBe(true);
    expect(maskSecret('secret_123456', 2, 2)).toBe('se*********56');

    expect(crc32c('123456789')).toBe(0xe3069283);
    expect(typeof xxhash32('hello world', 42)).toBe('number');
    expect(siphash24(new Uint8Array(16), 'hello')).toMatch(/^[0-9a-f]{16}$/);

    const raw = new TextEncoder().encode('OptiKit!');
    expect(base32HexDecode(base32HexEncode(raw))).toEqual(raw);
    expect(base85Decode(base85Encode(raw))).toEqual(raw);
    expect(rot13(rot13('Hello'))).toBe('Hello');
    expect(caesarCipher('ABC', 3)).toBe('DEF');
    const key = new TextEncoder().encode('k');
    expect(xorCipher(xorCipher(raw, key), key)).toEqual(raw);

    const verifier = generatePkceVerifier(48);
    expect(verifier.length).toBe(48);
    expect(generatePkceChallenge(verifier).length).toBeGreaterThan(20);
    expect(entropyBits('aaaa')).toBe(0);
    expect(entropyBits('abcd')).toBe(2);
  });
});
