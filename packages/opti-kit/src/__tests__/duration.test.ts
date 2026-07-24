import { describe, it, expect } from 'vitest';
import { parseDuration, formatTimeDuration } from '../duration';

describe('Duration utilities', () => {
  it('should parse/format', () => {
    expect(parseDuration('1m 30s')).toBe(90000);
    expect(formatTimeDuration(90000)).toBe('1m 30s');
  });
});
