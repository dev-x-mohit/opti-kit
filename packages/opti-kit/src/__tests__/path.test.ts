import { describe, it, expect } from 'vitest';
import { normalize, join, dirname, basename, extname, isAbsolute } from '../path';

describe('path utilities', () => {
  it('normalize', () => {
    expect(normalize('/foo/bar//baz/asdf/quux/..')).toBe('/foo/bar/baz/asdf');
  });

  it('join', () => {
    expect(join('/foo', 'bar', 'baz/asdf', 'quux', '..')).toBe('/foo/bar/baz/asdf');
  });

  it('dirname', () => {
    expect(dirname('/foo/bar/baz/asdf/quux')).toBe('/foo/bar/baz/asdf');
  });

  it('basename', () => {
    expect(basename('/foo/bar/baz/asdf/quux.html')).toBe('quux.html');
    expect(basename('/foo/bar/baz/asdf/quux.html', '.html')).toBe('quux');
  });

  it('extname', () => {
    expect(extname('index.html')).toBe('.html');
    expect(extname('index.coffee.md')).toBe('.md');
  });

  it('isAbsolute', () => {
    expect(isAbsolute('/foo/bar')).toBe(true);
    expect(isAbsolute('foo/bar')).toBe(false);
  });
});
