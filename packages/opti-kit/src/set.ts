/**
 * Creates a new set containing elements present in either set A or set B.
 */
export function unionOfSets<T>(a: Set<T>, b: Set<T>): Set<T> {
  const result = new Set<T>(a);
  for (const item of b) {
    result.add(item);
  }
  return result;
}

/**
 * Creates a new set containing elements present in both set A and set B.
 */
export function intersectionOfSets<T>(a: Set<T>, b: Set<T>): Set<T> {
  const result = new Set<T>();
  for (const item of a) {
    if (b.has(item)) {
      result.add(item);
    }
  }
  return result;
}

/**
 * Creates a new set containing elements present in set A but not in set B.
 */
export function differenceOfSets<T>(a: Set<T>, b: Set<T>): Set<T> {
  const result = new Set<T>(a);
  for (const item of b) {
    result.delete(item);
  }
  return result;
}

/**
 * Creates a new set containing elements present in either set A or set B, but not both.
 */
export function setSymmetricDifference<T>(a: Set<T>, b: Set<T>): Set<T> {
  const result = new Set<T>(a);
  for (const item of b) {
    if (result.has(item)) {
      result.delete(item);
    } else {
      result.add(item);
    }
  }
  return result;
}

/**
 * Checks if set A is a subset of set B (all elements of A are in B).
 */
export function isSetSubset<T>(a: Set<T>, b: Set<T>): boolean {
  if (a.size > b.size) return false;
  for (const item of a) {
    if (!b.has(item)) return false;
  }
  return true;
}

/**
 * Checks if set A is a superset of set B (all elements of B are in A).
 */
export function isSetSuperset<T>(a: Set<T>, b: Set<T>): boolean {
  return isSetSubset(b, a);
}

/**
 * Checks if set A and set B have no elements in common.
 */
export function isDisjoint<T>(a: Set<T>, b: Set<T>): boolean {
  for (const item of a) {
    if (b.has(item)) return false;
  }
  return true;
}

/**
 * Maps over a set to produce a new set.
 */
export function mapSet<T, U>(set: Set<T>, mapper: (item: T) => U): Set<U> {
  const result = new Set<U>();
  for (const item of set) {
    result.add(mapper(item));
  }
  return result;
}

/**
 * Filters a set to produce a new set.
 */
export function filterSet<T>(set: Set<T>, predicate: (item: T) => boolean): Set<T> {
  const result = new Set<T>();
  for (const item of set) {
    if (predicate(item)) {
      result.add(item);
    }
  }
  return result;
}

/**
 * Creates the Cartesian product of two sets.
 */
export function cartesianProduct<T, U>(a: Set<T>, b: Set<U>): Set<[T, U]> {
  const result = new Set<[T, U]>();
  for (const itemA of a) {
    for (const itemB of b) {
      result.add([itemA, itemB]);
    }
  }
  return result;
}
