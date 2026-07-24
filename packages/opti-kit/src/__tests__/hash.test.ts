import { describe, it, expect } from 'vitest';
import { encodeHex, decodeHex } from '../hash';

describe('Hash utilities', () => {
  it('should encode/decode hex', () => {
    expect(encodeHex('hello')).toBe('68656c6c6f');
    expect(decodeHex('68656c6c6f')).toBe('hello');
  });
});
