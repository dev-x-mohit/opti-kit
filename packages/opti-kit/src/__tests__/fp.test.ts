import { describe, it, expect } from 'vitest';
import {
  pipe,
  flow,
  compose,
  curry,
  map,
  filter,
  reduce,
  take,
  drop,
  compact,
  sortBy,
  groupBy,
  prop,
  path,
  pick,
  omit,
  assoc,
  dissoc,
  when,
  unless
} from '../fp';

describe('Data-Last Functional API (fp)', () => {
  it('should pipe values through functions', () => {
    const result = pipe(
      [1, 2, 3, 4, 5],
      filter((n: number) => n % 2 === 1),
      map((n: number) => n * 10),
      take(2)
    );

    expect(result).toEqual([10, 30]);
  });

  it('should compose reusable flow pipelines', () => {
    const sumEvens = flow(
      filter((n: number) => n % 2 === 0),
      reduce((acc: number, n: number) => acc + n, 0)
    );

    expect(sumEvens([1, 2, 3, 4, 5, 6])).toBe(12);
  });

  it('should compose functions right-to-left', () => {
    const fn = compose(
      (n: number) => n * 2,
      (n: number) => n + 3
    );

    expect(fn(4)).toBe(14);
  });

  it('should auto-curry multi-argument functions', () => {
    const multiply3 = curry((a: number, b: number, c: number) => a * b * c);
    expect(multiply3(2)(3)(4)).toBe(24);
    expect(multiply3(2, 3)(4)).toBe(24);
    expect(multiply3(2, 3, 4)).toBe(24);
  });

  it('should sort, compact and group arrays', () => {
    const items = [
      { id: 1, role: 'admin', age: 30 },
      { id: 2, role: 'user', age: 20 },
      { id: 3, role: 'user', age: 25 },
    ];

    const sorted = sortBy((u: typeof items[0]) => u.age, 'desc')(items);
    expect(sorted[0].age).toBe(30);

    const grouped = groupBy((u: typeof items[0]) => u.role)(items);
    expect(grouped.admin.length).toBe(1);
    expect(grouped.user.length).toBe(2);

    expect(compact()([0, 1, false, 2, '', 3, null, undefined])).toEqual([1, 2, 3]);
    expect(drop(2)([1, 2, 3, 4])).toEqual([3, 4]);
  });

  it('should manipulate objects with prop, path, pick, omit, assoc, dissoc', () => {
    const user = { name: 'Alice', address: { city: 'Tokyo', zip: '100-0001' }, role: 'admin', active: true };

    expect(prop('name')(user)).toBe('Alice');
    expect(path(['address', 'city'])(user)).toBe('Tokyo');
    expect(pick(['name', 'role'] as const)(user)).toEqual({ name: 'Alice', role: 'admin' });
    expect(omit(['address', 'active'] as const)(user)).toEqual({ name: 'Alice', role: 'admin' });

    const withOrg = assoc('org', 'Acme')(user);
    expect((withOrg as any).org).toBe('Acme');

    const withoutActive = dissoc('active')(user);
    expect('active' in withoutActive).toBe(false);
  });

  it('should conditionally transform with when and unless', () => {
    const doubleIfEven = when((n: number) => n % 2 === 0, (n: number) => n * 2);
    expect(doubleIfEven(4)).toBe(8);
    expect(doubleIfEven(5)).toBe(5);

    const capitalizeUnlessEmpty = unless((s: string) => s.length === 0, (s: string) => s.toUpperCase());
    expect(capitalizeUnlessEmpty('hi')).toBe('HI');
    expect(capitalizeUnlessEmpty('')).toBe('');
  });
});
