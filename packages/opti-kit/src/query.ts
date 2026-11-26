/**
 * OptiKit Query — In-memory SQL-like / LINQ-style query, join, windowing,
 * aggregation, and pivot engine for typed object collections.
 */

export type SortDirection = 'asc' | 'desc';

/** Filters an array of records using a predicate. */
export function whereClause<T>(items: readonly T[], predicate: (item: T, index: number) => boolean): T[] {
  return items.filter(predicate);
}

/** Projects each record to only the specified keys. */
export function selectFields<T extends Record<string, unknown>, K extends keyof T>(
  items: readonly T[],
  fields: readonly K[]
): Pick<T, K>[] {
  return items.map((item) => {
    const out = {} as Pick<T, K>;
    for (const field of fields) {
      out[field] = item[field];
    }
    return out;
  });
}

/** Sorts records by multiple key/direction specifications without mutating the input. */
export function orderByMultiple<T>(
  items: readonly T[],
  specs: readonly { key: keyof T | ((item: T) => unknown); direction?: SortDirection }[]
): T[] {
  return [...items].sort((a, b) => {
    for (const spec of specs) {
      const dir = spec.direction === 'desc' ? -1 : 1;
      const va = typeof spec.key === 'function' ? spec.key(a) : a[spec.key];
      const vb = typeof spec.key === 'function' ? spec.key(b) : b[spec.key];
      if (va === vb) continue;
      if (va === null || va === undefined) return 1 * dir;
      if (vb === null || vb === undefined) return -1 * dir;
      if (va < vb) return -1 * dir;
      if (va > vb) return 1 * dir;
    }
    return 0;
  });
}

/** Groups records by a key selector function or property name. */
export function groupByKey<T, K extends PropertyKey>(
  items: readonly T[],
  keySelector: keyof T | ((item: T) => K)
): Record<K, T[]> {
  const groups = {} as Record<K, T[]>;
  for (const item of items) {
    const key = (typeof keySelector === 'function' ? keySelector(item) : item[keySelector]) as K;
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
  }
  return groups;
}

/** Filters grouped records using a predicate on `(groupItems, key)`. */
export function havingClause<T, K extends PropertyKey>(
  groups: Record<K, T[]>,
  predicate: (items: T[], key: string) => boolean
): Record<string, T[]> {
  const result: Record<string, T[]> = {};
  for (const [key, list] of Object.entries(groups) as [string, T[]][]) {
    if (predicate(list, key)) {
      result[key] = list;
    }
  }
  return result;
}

/** Performs an SQL-style INNER JOIN on two collections. */
export function innerJoin<L, R, K, Out = L & R>(
  left: readonly L[],
  right: readonly R[],
  leftKey: (l: L) => K,
  rightKey: (r: R) => K,
  merge: (l: L, r: R) => Out = (l, r) => ({ ...l, ...r }) as unknown as Out
): Out[] {
  const index = new Map<K, R[]>();
  for (const r of right) {
    const k = rightKey(r);
    const list = index.get(k);
    if (list) list.push(r);
    else index.set(k, [r]);
  }
  const out: Out[] = [];
  for (const l of left) {
    const matches = index.get(leftKey(l));
    if (matches) {
      for (const r of matches) out.push(merge(l, r));
    }
  }
  return out;
}

/** Performs an SQL-style LEFT JOIN on two collections. */
export function leftJoin<L, R, K, Out = L & Partial<R>>(
  left: readonly L[],
  right: readonly R[],
  leftKey: (l: L) => K,
  rightKey: (r: R) => K,
  merge: (l: L, r: R | undefined) => Out = (l, r) => ({ ...l, ...(r ?? {}) }) as unknown as Out
): Out[] {
  const index = new Map<K, R[]>();
  for (const r of right) {
    const k = rightKey(r);
    const list = index.get(k);
    if (list) list.push(r);
    else index.set(k, [r]);
  }
  const out: Out[] = [];
  for (const l of left) {
    const matches = index.get(leftKey(l));
    if (matches && matches.length > 0) {
      for (const r of matches) out.push(merge(l, r));
    } else {
      out.push(merge(l, undefined));
    }
  }
  return out;
}

/** Performs an SQL-style RIGHT JOIN on two collections. */
export function rightJoin<L, R, K, Out = Partial<L> & R>(
  left: readonly L[],
  right: readonly R[],
  leftKey: (l: L) => K,
  rightKey: (r: R) => K,
  merge: (l: L | undefined, r: R) => Out = (l, r) => ({ ...(l ?? {}), ...r }) as unknown as Out
): Out[] {
  const index = new Map<K, L[]>();
  for (const l of left) {
    const k = leftKey(l);
    const list = index.get(k);
    if (list) list.push(l);
    else index.set(k, [l]);
  }
  const out: Out[] = [];
  for (const r of right) {
    const matches = index.get(rightKey(r));
    if (matches && matches.length > 0) {
      for (const l of matches) out.push(merge(l, r));
    } else {
      out.push(merge(undefined, r));
    }
  }
  return out;
}

/** Performs an SQL-style FULL OUTER JOIN on two collections. */
export function fullOuterJoin<L, R, K, Out = Partial<L> & Partial<R>>(
  left: readonly L[],
  right: readonly R[],
  leftKey: (l: L) => K,
  rightKey: (r: R) => K,
  merge: (l: L | undefined, r: R | undefined) => Out = (l, r) =>
    ({ ...(l ?? {}), ...(r ?? {}) }) as unknown as Out
): Out[] {
  const rightMatched = new Set<number>();
  const rightIndex = new Map<K, { item: R; idx: number }[]>();
  right.forEach((item, idx) => {
    const k = rightKey(item);
    const list = rightIndex.get(k);
    if (list) list.push({ item, idx });
    else rightIndex.set(k, [{ item, idx }]);
  });

  const out: Out[] = [];
  for (const l of left) {
    const matches = rightIndex.get(leftKey(l));
    if (matches && matches.length > 0) {
      for (const m of matches) {
        rightMatched.add(m.idx);
        out.push(merge(l, m.item));
      }
    } else {
      out.push(merge(l, undefined));
    }
  }
  right.forEach((r, idx) => {
    if (!rightMatched.has(idx)) {
      out.push(merge(undefined, r));
    }
  });
  return out;
}

/** Performs a Cartesian CROSS JOIN of two collections. */
export function crossJoin<L, R, Out = L & R>(
  left: readonly L[],
  right: readonly R[],
  merge: (l: L, r: R) => Out = (l, r) => ({ ...l, ...r }) as unknown as Out
): Out[] {
  const out: Out[] = [];
  for (const l of left) {
    for (const r of right) {
      out.push(merge(l, r));
    }
  }
  return out;
}

/** Deduplicates records by a key selector, keeping the first occurrence. */
export function distinctBy<T, K>(items: readonly T[], keySelector: (item: T) => K): T[] {
  const seen = new Set<K>();
  const out: T[] = [];
  for (const item of items) {
    const k = keySelector(item);
    if (!seen.has(k)) {
      seen.add(k);
      out.push(item);
    }
  }
  return out;
}

/** Paginates a collection and returns items with metadata. */
export function paginateQuery<T>(
  items: readonly T[],
  page: number,
  pageSize: number
): { items: T[]; page: number; pageSize: number; total: number; totalPages: number } {
  const safeSize = Math.max(1, Math.floor(pageSize));
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / safeSize));
  const safePage = Math.min(Math.max(1, Math.floor(page)), totalPages);
  const start = (safePage - 1) * safeSize;
  return {
    items: items.slice(start, start + safeSize),
    page: safePage,
    pageSize: safeSize,
    total,
    totalPages,
  };
}

/** Sums a numeric field or selector over a collection. */
export function aggregateSum<T>(items: readonly T[], selector: (item: T) => number): number {
  let total = 0;
  for (const item of items) total += selector(item);
  return total;
}

/** Computes the arithmetic mean of a numeric selector over a collection. */
export function aggregateAvg<T>(items: readonly T[], selector: (item: T) => number): number {
  if (items.length === 0) return 0;
  return aggregateSum(items, selector) / items.length;
}

/** Returns the minimum value of a numeric selector over a collection. */
export function aggregateMin<T>(items: readonly T[], selector: (item: T) => number): number | undefined {
  if (items.length === 0) return undefined;
  let min = Infinity;
  for (const item of items) {
    const v = selector(item);
    if (v < min) min = v;
  }
  return min;
}

/** Returns the maximum value of a numeric selector over a collection. */
export function aggregateMax<T>(items: readonly T[], selector: (item: T) => number): number | undefined {
  if (items.length === 0) return undefined;
  let max = -Infinity;
  for (const item of items) {
    const v = selector(item);
    if (v > max) max = v;
  }
  return max;
}

/** Counts records, optionally matching a predicate. */
export function aggregateCount<T>(
  items: readonly T[],
  predicate?: (item: T) => boolean
): number {
  if (!predicate) return items.length;
  let count = 0;
  for (const item of items) if (predicate(item)) count++;
  return count;
}

/** Pivots flat records into a 2D cross-tabulation table. */
export function pivotTable<T, V = number>(
  items: readonly T[],
  rowKey: (item: T) => string,
  colKey: (item: T) => string,
  aggregator: (bucket: T[]) => V
): Record<string, Record<string, V>> {
  const buckets = new Map<string, Map<string, T[]>>();
  for (const item of items) {
    const r = rowKey(item);
    const c = colKey(item);
    if (!buckets.has(r)) buckets.set(r, new Map());
    const rowMap = buckets.get(r)!;
    if (!rowMap.has(c)) rowMap.set(c, []);
    rowMap.get(c)!.push(item);
  }
  const result: Record<string, Record<string, V>> = {};
  for (const [r, cols] of buckets.entries()) {
    result[r] = {};
    for (const [c, bucket] of cols.entries()) {
      result[r][c] = aggregator(bucket);
    }
  }
  return result;
}

/** Unpivots a 2D pivot table back into flat `{ row, col, value }` records. */
export function unpivotTable<V>(
  table: Record<string, Record<string, V>>
): { row: string; col: string; value: V }[] {
  const out: { row: string; col: string; value: V }[] = [];
  for (const [row, cols] of Object.entries(table)) {
    for (const [col, value] of Object.entries(cols)) {
      out.push({ row, col, value });
    }
  }
  return out;
}

/** Groups and summarizes records with a custom reducer per group. */
export function rollupGroup<T, K extends PropertyKey, R>(
  items: readonly T[],
  keySelector: (item: T) => K,
  reducer: (group: T[], key: K) => R
): Record<K, R> {
  const grouped = groupByKey(items, keySelector);
  const out = {} as Record<K, R>;
  for (const key of Object.keys(grouped) as K[]) {
    out[key] = reducer(grouped[key], key);
  }
  return out;
}

/** Assigns SQL-style dense/standard rank (`1, 1, 3`) to sorted items by score. */
export function windowRank<T>(
  items: readonly T[],
  scoreSelector: (item: T) => number,
  direction: SortDirection = 'desc'
): (T & { rank: number })[] {
  const sorted = orderByMultiple(items, [{ key: scoreSelector, direction }]);
  let currentRank = 1;
  return sorted.map((item, idx) => {
    if (idx > 0 && scoreSelector(sorted[idx - 1]) !== scoreSelector(item)) {
      currentRank = idx + 1;
    }
    return { ...item, rank: currentRank };
  });
}

/** Assigns 1-based sequential row numbers to items. */
export function windowRowNumber<T>(items: readonly T[]): (T & { rowNumber: number })[] {
  return items.map((item, idx) => ({ ...item, rowNumber: idx + 1 }));
}

/** Computes a running cumulative sum over a collection. */
export function windowRunningSum<T>(
  items: readonly T[],
  valueSelector: (item: T) => number
): (T & { runningSum: number })[] {
  let acc = 0;
  return items.map((item) => {
    acc += valueSelector(item);
    return { ...item, runningSum: acc };
  });
}

/** Computes a trailing moving average over a window of size `windowSize`. */
export function windowMovingAvg<T>(
  items: readonly T[],
  valueSelector: (item: T) => number,
  windowSize: number
): (T & { movingAvg: number })[] {
  const size = Math.max(1, Math.floor(windowSize));
  const values = items.map(valueSelector);
  let windowSum = 0;
  return items.map((item, idx) => {
    windowSum += values[idx];
    if (idx >= size) windowSum -= values[idx - size];
    const count = Math.min(idx + 1, size);
    return { ...item, movingAvg: windowSum / count };
  });
}

/** Returns the distinct union of two collections by key. */
export function unionQueries<T, K>(
  a: readonly T[],
  b: readonly T[],
  keySelector: (item: T) => K
): T[] {
  return distinctBy([...a, ...b], keySelector);
}

/** Returns items from `a` whose keys also appear in `b`. */
export function intersectQueries<T, K>(
  a: readonly T[],
  b: readonly T[],
  keySelector: (item: T) => K
): T[] {
  const bKeys = new Set(b.map(keySelector));
  return distinctBy(a.filter((item) => bKeys.has(keySelector(item))), keySelector);
}

/** Returns items from `a` whose keys do not appear in `b`. */
export function exceptQueries<T, K>(
  a: readonly T[],
  b: readonly T[],
  keySelector: (item: T) => K
): T[] {
  const bKeys = new Set(b.map(keySelector));
  return distinctBy(a.filter((item) => !bKeys.has(keySelector(item))), keySelector);
}

/** Fluent query builder wrapping all query operations. */
export function queryFrom<T>(items: readonly T[]) {
  return {
    where: (pred: (item: T, index: number) => boolean) => queryFrom(whereClause(items, pred)),
    select: <K extends keyof T>(fields: readonly K[]) =>
      queryFrom(selectFields(items as (T & Record<string, unknown>)[], fields)),
    orderBy: (specs: readonly { key: keyof T | ((item: T) => unknown); direction?: SortDirection }[]) =>
      queryFrom(orderByMultiple(items, specs)),
    distinctBy: <K>(keySelector: (item: T) => K) => queryFrom(distinctBy(items, keySelector)),
    paginate: (page: number, pageSize: number) => paginateQuery(items, page, pageSize),
    groupBy: <K extends PropertyKey>(keySelector: keyof T | ((item: T) => K)) =>
      groupByKey(items, keySelector),
    sum: (selector: (item: T) => number) => aggregateSum(items, selector),
    avg: (selector: (item: T) => number) => aggregateAvg(items, selector),
    min: (selector: (item: T) => number) => aggregateMin(items, selector),
    max: (selector: (item: T) => number) => aggregateMax(items, selector),
    count: (pred?: (item: T) => boolean) => aggregateCount(items, pred),
    toArray: () => [...items],
  };
}
