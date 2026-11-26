import { describe, it, expect } from 'vitest';
import {
  createInterval, intervalContains, intervalOverlaps, intervalAdjacent, intervalMerge,
  mergeAllIntervals, intervalIntersect, intervalDifference, intervalComplement,
  intervalUnion, intervalLength, intervalMidpoint, intervalClamp, intervalSplit,
  intervalShift, intervalScale, intervalEquals, intervalIsSubset, findGaps,
  sweepLineEvents, maxConcurrentIntervals, partitionTimeline, snapToGrid,
  rangeIterator, chunkRange,
} from '../interval';

describe('Interval Algebra', () => {
  it('performs core interval set operations', () => {
    const a = createInterval(10, 2); // normalized to [2, 10]
    const b = createInterval(8, 15);
    expect(a).toEqual({ start: 2, end: 10 });
    expect(intervalContains(a, 5)).toBe(true);
    expect(intervalContains(a, { start: 3, end: 9 })).toBe(true);
    expect(intervalOverlaps(a, b)).toBe(true);
    expect(intervalAdjacent({ start: 1, end: 5 }, { start: 5, end: 8 })).toBe(true);
    expect(intervalMerge(a, b)).toEqual({ start: 2, end: 15 });
    expect(intervalIntersect(a, b)).toEqual({ start: 8, end: 10 });
    expect(intervalDifference(a, b)).toEqual([{ start: 2, end: 8 }]);
    expect(intervalUnion(a, b)).toEqual([{ start: 2, end: 15 }]);
    expect(intervalComplement([{ start: 2, end: 5 }, { start: 7, end: 9 }], { start: 0, end: 10 })).toEqual([
      { start: 0, end: 2 },
      { start: 5, end: 7 },
      { start: 9, end: 10 },
    ]);
  });

  it('supports measurements, transformations, and sweep-line algorithms', () => {
    const iv = createInterval(0, 10);
    expect(intervalLength(iv)).toBe(10);
    expect(intervalMidpoint(iv)).toBe(5);
    expect(intervalClamp(iv, 15)).toBe(10);
    expect(intervalSplit(iv, 2)).toEqual([{ start: 0, end: 5 }, { start: 5, end: 10 }]);
    expect(intervalShift(iv, 5)).toEqual({ start: 5, end: 15 });
    expect(intervalScale(iv, 2)).toEqual({ start: -5, end: 15 });
    expect(intervalEquals(iv, { start: 0, end: 10 })).toBe(true);
    expect(intervalIsSubset({ start: 2, end: 4 }, iv)).toBe(true);

    const list = [createInterval(1, 5), createInterval(2, 6), createInterval(8, 10)];
    expect(mergeAllIntervals(list)).toEqual([{ start: 1, end: 6 }, { start: 8, end: 10 }]);
    expect(findGaps(list)).toEqual([{ start: 6, end: 8 }]);
    expect(sweepLineEvents(list).length).toBe(6);
    expect(maxConcurrentIntervals(list)).toBe(2);
    expect(partitionTimeline(list).length).toBe(4);
    expect(snapToGrid(13, 5)).toBe(15);
    expect(Array.from(rangeIterator(0, 6, 2))).toEqual([0, 2, 4, 6]);
    expect(chunkRange(1, 5, 2)).toEqual([{ start: 1, end: 2 }, { start: 3, end: 4 }, { start: 5, end: 5 }]);
  });
});
