import { describe, it, expect } from 'vitest';
import {
  lens, lensProp, lensPath, lensIndex, viewLens, setLens, overLens, composeLens,
  prism, previewPrism, reviewPrism, iso, toIso, fromIso, traversal, overTraversal,
  toListOf, filteredLens, optionalLens, defaultLens, mappedLens, zipLens,
  focusPath, updateAtPath,
} from '../lens';

describe('Lens & Optics', () => {
  it('supports lenses, composition, and path updates', () => {
    const state = { user: { name: 'Alice', age: 30 }, tags: ['a', 'b'] };
    const userLens = lensProp<typeof state, 'user'>('user');
    const nameLens = lensProp<{ name: string; age: number }, 'name'>('name');
    const userNameLens = composeLens(userLens, nameLens);

    expect(viewLens(userNameLens, state)).toBe('Alice');
    const updated = setLens(userNameLens, 'Bob', state);
    expect(updated.user.name).toBe('Bob');
    expect(state.user.name).toBe('Alice');

    const upper = overLens(userNameLens, (n) => n.toUpperCase(), state);
    expect(upper.user.name).toBe('ALICE');

    const pathL = lensPath<typeof state, string>(['tags', 1]);
    expect(viewLens(pathL, state)).toBe('b');
    expect(setLens(pathL, 'c', state).tags).toEqual(['a', 'c']);

    const idxL = lensIndex<string>(0);
    expect(viewLens(idxL, ['x', 'y'])).toBe('x');
    expect(setLens(idxL, 'z', ['x', 'y'])).toEqual(['z', 'y']);

    expect(focusPath(state, 'user.age')).toBe(30);
    expect(updateAtPath<typeof state, number>(state, 'user.age', (a) => a + 1).user.age).toBe(31);
  });

  it('supports prisms, isos, traversals, and combinators', () => {
    type Shape = { kind: 'circle'; r: number } | { kind: 'square'; s: number };
    const circlePrism = prism<Shape, number>(
      (s) => (s.kind === 'circle' ? s.r : undefined),
      (r) => ({ kind: 'circle', r })
    );
    expect(previewPrism(circlePrism, { kind: 'circle', r: 5 })).toBe(5);
    expect(reviewPrism(circlePrism, 10)).toEqual({ kind: 'circle', r: 10 });

    const celsiusToFahrenheit = iso<number, number>(
      (c) => c * 1.8 + 32,
      (f) => (f - 32) / 1.8
    );
    expect(toIso(celsiusToFahrenheit, 100)).toBe(212);
    expect(fromIso(celsiusToFahrenheit, 212)).toBe(100);

    const t = traversal<number>();
    expect(toListOf(t, [1, 2, 3])).toEqual([1, 2, 3]);
    expect(overTraversal(t, (x) => x * 2, [1, 2, 3])).toEqual([2, 4, 6]);

    const evenT = filteredLens<number>((n) => n % 2 === 0);
    expect(overTraversal(evenT, (n) => n * 10, [1, 2, 3, 4])).toEqual([1, 20, 3, 40]);

    const custom = lens<{ v?: number }, number | undefined>(
      (s) => s.v,
      (v) => (s) => ({ ...s, v })
    );
    expect(viewLens(defaultLens(custom, 42), {})).toBe(42);
    expect(viewLens(optionalLens(custom), undefined)).toBeUndefined();

    const m = mappedLens(lensProp<{ a: number }, 'a'>('a'));
    expect(toListOf(m, [{ a: 1 }, { a: 2 }])).toEqual([1, 2]);

    const z = zipLens(lensProp<{ x: number; y: number }, 'x'>('x'), lensProp<{ x: number; y: number }, 'y'>('y'));
    expect(viewLens(z, { x: 1, y: 2 })).toEqual([1, 2]);
  });
});
