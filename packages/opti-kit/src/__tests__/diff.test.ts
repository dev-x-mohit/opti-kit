import { describe, it, expect } from 'vitest';
import {
  diffObjects,
  patchObject,
  diffArrays,
  createJsonPatch,
  applyJsonPatch,
  diffWords
} from '../diff';
import { levenshteinDistance } from '../string';

describe('Diff and Patch Utilities', () => {
  it('should detect added, removed, and updated fields in objects', () => {
    const a = { name: 'Alice', age: 30, city: 'London' };
    const b = { name: 'Alice', age: 31, country: 'UK' };

    const diff = diffObjects(a, b);
    expect(diff.hasChanges).toBe(true);
    expect(diff.added).toEqual({ country: 'UK' });
    expect(diff.removed).toEqual({ city: 'London' });
    expect(diff.updated).toEqual({
      age: { oldValue: 30, newValue: 31 }
    });

    const patched = patchObject(a, diff);
    expect(patched).toEqual(b);
  });

  it('should diff arrays accurately', () => {
    const arr1 = [1, 2, 3, 4];
    const arr2 = [2, 4, 5, 6];

    const diff = diffArrays(arr1, arr2);
    expect(diff.hasChanges).toBe(true);
    expect(diff.removed).toEqual([1, 3]);
    expect(diff.added).toEqual([5, 6]);
    expect(diff.unchanged).toEqual([2, 4]);
  });

  it('should create and apply RFC 6902 JSON patches', () => {
    const doc = {
      title: 'Post',
      author: { name: 'John' },
      tags: ['js', 'ts']
    };

    const target = {
      title: 'Article',
      author: { name: 'John', handle: '@john' },
      tags: ['js', 'ts', 'optikit']
    };

    const patch = createJsonPatch(doc, target);
    expect(patch.length).toBeGreaterThan(0);

    const patchedDoc = applyJsonPatch(doc, patch);
    expect(patchedDoc).toEqual(target);
  });

  it('should calculate Levenshtein distance', () => {
    expect(levenshteinDistance('kitten', 'sitting')).toBe(3);
    expect(levenshteinDistance('hello', 'hello')).toBe(0);
    expect(levenshteinDistance('', 'abc')).toBe(3);
  });

  it('should perform word-level diff', () => {
    const text1 = 'The quick brown fox';
    const text2 = 'The fast brown fox';

    const diff = diffWords(text1, text2);
    expect(diff).toEqual([
      { type: 'unchanged', value: 'The' },
      { type: 'removed', value: 'quick' },
      { type: 'added', value: 'fast' },
      { type: 'unchanged', value: 'brown' },
      { type: 'unchanged', value: 'fox' }
    ]);
  });
});
