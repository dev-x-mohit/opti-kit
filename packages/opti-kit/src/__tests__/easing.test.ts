import { describe, it, expect } from 'vitest';
import { linear, easeInQuad, easeOutQuad, easeInOutQuad } from '../easing';

describe('easing utilities', () => {
  it('linear easing', () => {
    expect(linear(0)).toBe(0);
    expect(linear(0.5)).toBe(0.5);
    expect(linear(1)).toBe(1);
  });

  it('easeInQuad easing', () => {
    expect(easeInQuad(0)).toBe(0);
    expect(easeInQuad(0.5)).toBe(0.25);
    expect(easeInQuad(1)).toBe(1);
  });

  it('easeOutQuad easing', () => {
    expect(easeOutQuad(0)).toBe(0);
    expect(easeOutQuad(0.5)).toBe(0.75);
    expect(easeOutQuad(1)).toBe(1);
  });

  it('easeInOutQuad easing', () => {
    expect(easeInOutQuad(0)).toBe(0);
    expect(easeInOutQuad(0.5)).toBe(0.5);
    expect(easeInOutQuad(1)).toBe(1);
  });
});
