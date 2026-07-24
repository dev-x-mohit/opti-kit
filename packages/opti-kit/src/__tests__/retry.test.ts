import { describe, it, expect } from 'vitest';
import { exponentialBackoffDelay, isRetryableError } from '../retry';

describe('Retry utilities', () => {
  it('should delay', () => {
    expect(exponentialBackoffDelay(1)).toBe(2000);
  });
  it('should check retryable', () => {
    expect(isRetryableError({ code: 'ECONNRESET' })).toBe(true);
    expect(isRetryableError({ code: 'ENOENT' })).toBe(false);
  });
});
