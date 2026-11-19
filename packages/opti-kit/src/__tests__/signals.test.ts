import { describe, it, expect, vi } from 'vitest';
import { signal, computed, effect, batch, untrack, isSignal } from '../signals';

describe('Signals Reactive State Primitives', () => {
  it('should initialize and read signal values', () => {
    const count = signal(10);
    expect(count.value).toBe(10);
    expect(count.peek()).toBe(10);
    expect(isSignal(count)).toBe(true);
    expect(isSignal(10)).toBe(false);

    count.set(20);
    expect(count.value).toBe(20);

    count.update(n => n + 5);
    expect(count.value).toBe(25);
  });

  it('should compute derived values lazily and memoize', () => {
    const a = signal(2);
    const b = signal(3);
    const computeFn = vi.fn(() => a.value * b.value);

    const product = computed(computeFn);
    expect(computeFn).not.toHaveBeenCalled();

    // First read computes
    expect(product.value).toBe(6);
    expect(computeFn).toHaveBeenCalledTimes(1);

    // Second read uses cached value
    expect(product.value).toBe(6);
    expect(computeFn).toHaveBeenCalledTimes(1);

    // Changing dependency invalidates cache
    a.set(4);
    expect(product.value).toBe(12);
    expect(computeFn).toHaveBeenCalledTimes(2);
  });

  it('should trigger effects on signal mutation and allow disposal', () => {
    const name = signal('Alice');
    const logs: string[] = [];

    const stop = effect(() => {
      logs.push(`Hello, ${name.value}`);
    });

    expect(logs).toEqual(['Hello, Alice']);

    name.set('Bob');
    expect(logs).toEqual(['Hello, Alice', 'Hello, Bob']);

    stop();
    name.set('Charlie');
    // Effect should not trigger after stop
    expect(logs).toEqual(['Hello, Alice', 'Hello, Bob']);
  });

  it('should handle batch updates properly without multiple notifications', () => {
    const first = signal('John');
    const last = signal('Doe');
    const calls: string[] = [];

    effect(() => {
      calls.push(`${first.value} ${last.value}`);
    });

    expect(calls).toEqual(['John Doe']);

    batch(() => {
      first.set('Jane');
      last.set('Smith');
    });

    // Should only have re-run once after the batch finished
    expect(calls).toEqual(['John Doe', 'Jane Smith']);
  });

  it('should support untracked reads', () => {
    const a = signal(1);
    const b = signal(10);
    const runs: number[] = [];

    effect(() => {
      const valA = a.value;
      const valB = untrack(() => b.value);
      runs.push(valA + valB);
    });

    expect(runs).toEqual([11]);

    // Mutating b should NOT trigger effect because it was untracked
    b.set(20);
    expect(runs).toEqual([11]);

    // Mutating a should trigger effect and pick up current b
    a.set(2);
    expect(runs).toEqual([11, 22]);
  });
});
