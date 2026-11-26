/**
 * OptiKit Interval — Numeric interval algebra, sweep-line algorithms,
 * gap finding, timeline partitioning, and range utilities.
 */

export interface Interval {
  readonly start: number;
  readonly end: number;
}

/** Creates a normalized closed interval `[min, max]`. */
export function createInterval(start: number, end: number): Interval {
  return start <= end ? { start, end } : { start: end, end: start };
}

/** Checks whether a point or sub-interval is contained within `interval`. */
export function intervalContains(interval: Interval, value: number | Interval): boolean {
  if (typeof value === 'number') {
    return value >= interval.start && value <= interval.end;
  }
  return value.start >= interval.start && value.end <= interval.end;
}

/** Checks whether two intervals overlap (share at least one point). */
export function intervalOverlaps(a: Interval, b: Interval): boolean {
  return a.start <= b.end && b.start <= a.end;
}

/** Checks whether two intervals touch at their boundaries without overlapping interior. */
export function intervalAdjacent(a: Interval, b: Interval): boolean {
  return a.end === b.start || b.end === a.start;
}

/** Merges two overlapping or adjacent intervals, or returns `null` if disjoint. */
export function intervalMerge(a: Interval, b: Interval): Interval | null {
  if (!intervalOverlaps(a, b) && !intervalAdjacent(a, b)) return null;
  return { start: Math.min(a.start, b.start), end: Math.max(a.end, b.end) };
}

/** Merges a list of intervals into minimal sorted disjoint intervals. */
export function mergeAllIntervals(intervals: readonly Interval[]): Interval[] {
  if (intervals.length === 0) return [];
  const sorted = [...intervals].sort((a, b) => a.start - b.start || a.end - b.end);
  const merged: Interval[] = [{ ...sorted[0] }];
  for (let i = 1; i < sorted.length; i++) {
    const last = merged[merged.length - 1];
    const curr = sorted[i];
    if (curr.start <= last.end) {
      merged[merged.length - 1] = { start: last.start, end: Math.max(last.end, curr.end) };
    } else {
      merged.push({ ...curr });
    }
  }
  return merged;
}

/** Returns the intersection of two intervals, or `null` if disjoint. */
export function intervalIntersect(a: Interval, b: Interval): Interval | null {
  const start = Math.max(a.start, b.start);
  const end = Math.min(a.end, b.end);
  return start <= end ? { start, end } : null;
}

/** Subtracts interval `b` from `a`, returning 0, 1, or 2 remaining intervals. */
export function intervalDifference(a: Interval, b: Interval): Interval[] {
  if (!intervalOverlaps(a, b)) return [{ ...a }];
  const result: Interval[] = [];
  if (a.start < b.start) result.push({ start: a.start, end: b.start });
  if (a.end > b.end) result.push({ start: b.end, end: a.end });
  return result;
}

/** Computes the complement of `intervals` within `bounds`. */
export function intervalComplement(
  intervals: readonly Interval[],
  bounds: Interval
): Interval[] {
  const merged = mergeAllIntervals(intervals);
  const gaps: Interval[] = [];
  let cursor = bounds.start;
  for (const iv of merged) {
    if (iv.end <= bounds.start) continue;
    if (iv.start >= bounds.end) break;
    if (iv.start > cursor) {
      gaps.push({ start: cursor, end: Math.min(iv.start, bounds.end) });
    }
    cursor = Math.max(cursor, iv.end);
  }
  if (cursor < bounds.end) {
    gaps.push({ start: cursor, end: bounds.end });
  }
  return gaps;
}

/** Returns the union of two intervals as 1 merged or 2 sorted intervals. */
export function intervalUnion(a: Interval, b: Interval): Interval[] {
  return mergeAllIntervals([a, b]);
}

/** Returns the length (`end - start`) of an interval. */
export function intervalLength(interval: Interval): number {
  return Math.max(0, interval.end - interval.start);
}

/** Returns the midpoint of an interval. */
export function intervalMidpoint(interval: Interval): number {
  return (interval.start + interval.end) / 2;
}

/** Clamps a numeric value to the bounds of an interval. */
export function intervalClamp(interval: Interval, value: number): number {
  return Math.min(Math.max(value, interval.start), interval.end);
}

/** Splits an interval into `parts` equal sub-intervals. */
export function intervalSplit(interval: Interval, parts: number): Interval[] {
  const count = Math.max(1, Math.floor(parts));
  const step = (interval.end - interval.start) / count;
  const out: Interval[] = [];
  for (let i = 0; i < count; i++) {
    out.push({
      start: interval.start + i * step,
      end: i === count - 1 ? interval.end : interval.start + (i + 1) * step,
    });
  }
  return out;
}

/** Shifts an interval by `delta`. */
export function intervalShift(interval: Interval, delta: number): Interval {
  return { start: interval.start + delta, end: interval.end + delta };
}

/** Scales an interval around its midpoint by `factor`. */
export function intervalScale(interval: Interval, factor: number): Interval {
  const mid = intervalMidpoint(interval);
  const half = (intervalLength(interval) * factor) / 2;
  return { start: mid - half, end: mid + half };
}

/** Checks exact equality of two intervals. */
export function intervalEquals(a: Interval, b: Interval): boolean {
  return a.start === b.start && a.end === b.end;
}

/** Checks if `inner` is a subset of `outer`. */
export function intervalIsSubset(inner: Interval, outer: Interval): boolean {
  return inner.start >= outer.start && inner.end <= outer.end;
}

/** Finds all uncovered gaps between a list of intervals. */
export function findGaps(intervals: readonly Interval[]): Interval[] {
  const merged = mergeAllIntervals(intervals);
  const gaps: Interval[] = [];
  for (let i = 1; i < merged.length; i++) {
    gaps.push({ start: merged[i - 1].end, end: merged[i].start });
  }
  return gaps;
}

/** Converts intervals into sorted sweep-line events (`+1` start, `-1` end). */
export function sweepLineEvents(
  intervals: readonly Interval[]
): { position: number; delta: 1 | -1 }[] {
  const events: { position: number; delta: 1 | -1 }[] = [];
  for (const iv of intervals) {
    events.push({ position: iv.start, delta: 1 });
    events.push({ position: iv.end, delta: -1 });
  }
  return events.sort((a, b) => a.position - b.position || a.delta - b.delta);
}

/** Computes the maximum number of concurrently overlapping intervals. */
export function maxConcurrentIntervals(intervals: readonly Interval[]): number {
  let active = 0;
  let max = 0;
  for (const ev of sweepLineEvents(intervals)) {
    active += ev.delta;
    if (active > max) max = active;
  }
  return max;
}

/** Partitions a timeline into elementary segments with the count of active intervals in each. */
export function partitionTimeline(
  intervals: readonly Interval[]
): { interval: Interval; count: number }[] {
  const points = Array.from(
    new Set(intervals.flatMap((iv) => [iv.start, iv.end]))
  ).sort((a, b) => a - b);
  const segments: { interval: Interval; count: number }[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const start = points[i];
    const end = points[i + 1];
    const mid = (start + end) / 2;
    const count = intervals.filter((iv) => mid >= iv.start && mid <= iv.end).length;
    if (count > 0) {
      segments.push({ interval: { start, end }, count });
    }
  }
  return segments;
}

/** Snaps a number to the nearest grid step. */
export function snapToGrid(value: number, step: number): number {
  if (step <= 0) return value;
  return Math.round(value / step) * step;
}

/** Creates a lazy generator iterating from `start` to `end` by `step`. */
export function* rangeIterator(start: number, end: number, step = 1): Generator<number> {
  if (step === 0) throw new Error('Step cannot be zero');
  if (step > 0) {
    for (let i = start; i <= end; i += step) yield i;
  } else {
    for (let i = start; i >= end; i += step) yield i;
  }
}

/** Splits an integer range `[start, end]` into chunks of size `chunkSize`. */
export function chunkRange(start: number, end: number, chunkSize: number): Interval[] {
  const size = Math.max(1, Math.floor(chunkSize));
  const out: Interval[] = [];
  for (let cur = start; cur <= end; cur += size) {
    out.push({ start: cur, end: Math.min(end, cur + size - 1) });
  }
  return out;
}
