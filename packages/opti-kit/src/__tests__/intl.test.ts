import { describe, it, expect } from 'vitest';
import { formatCurrency, formatNumber, formatDateTime, formatPercentage, formatCompactNumber, formatList } from '../intl';

describe('intl utilities', () => {
  it('formatCurrency formats currency correctly', () => {
    const formatted = formatCurrency(1234.56, 'USD', 'en-US');
    expect(formatted).toMatch(/\$1,234\.56/);
  });

  it('formatNumber formats numbers correctly', () => {
    const formatted = formatNumber(1234.56, 'en-US');
    expect(formatted).toBe('1,234.56');
  });

  it('formatDateTime formats date correctly', () => {
    const date = new Date(2024, 0, 1);
    const formatted = formatDateTime(date, 'en-US', { dateStyle: 'short' });
    expect(formatted).toBe('1/1/24');
  });

  it('formatPercentage formats percentage correctly', () => {
    const formatted = formatPercentage(0.45, 'en-US');
    expect(formatted).toBe('45%');
  });

  it('formatCompactNumber formats compact numbers correctly', () => {
    const formatted = formatCompactNumber(1200, 'en-US');
    expect(formatted).toBe('1.2K');
  });

  it('formatList formats lists correctly', () => {
    const formatted = formatList(['Apple', 'Banana', 'Orange'], 'en-US');
    // It could be 'Apple, Banana, and Orange'
    expect(formatted).toContain('Apple');
    expect(formatted).toContain('Banana');
    expect(formatted).toContain('Orange');
  });
});
