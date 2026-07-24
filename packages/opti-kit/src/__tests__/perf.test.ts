import { describe, it, expect } from 'vitest';
import { measureTime, benchmark, createFPSCounter } from '../perf';

describe('perf utilities', () => {
  it('measureTime measures execution time', () => {
    const [result, time] = measureTime(() => {
      let sum = 0;
      for (let i = 0; i < 1000; i++) sum += i;
      return sum;
    });
    expect(result).toBeGreaterThan(0);
    expect(time).toBeGreaterThanOrEqual(0);
  });

  it('benchmark returns average execution time', () => {
    const avgTime = benchmark(() => {
      let sum = 0;
      for (let i = 0; i < 100; i++) sum += i;
    }, 100);
    expect(avgTime).toBeGreaterThanOrEqual(0);
  });

  it('createFPSCounter tracks frames', () => {
    const counter = createFPSCounter();
    counter.tick();
    counter.tick();
    expect(counter.getFPS()).toBe(0); // Takes 1 sec to update
  });
});
