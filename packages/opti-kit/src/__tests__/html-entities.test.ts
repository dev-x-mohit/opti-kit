import { describe, it, expect } from 'vitest';
import { encodeHtmlEntities, decodeHtmlEntities, stripHtmlTags } from '../html-entities';

describe('HTML Entities utilities', () => {
  it('should escape and unescape', () => {
    expect(encodeHtmlEntities('<div>')).toBe('&lt;div&gt;');
    expect(decodeHtmlEntities('&lt;div&gt;')).toBe('<div>');
    expect(stripHtmlTags('<div>test</div>')).toBe('test');
  });
});
