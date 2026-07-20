/**
 * Creates a new object composed of the inverted keys and values of the given object.
 * If the object contains duplicate values, subsequent values overwrite property assignments of previous values.
 */
export function invertMap(obj: Record<string, string | number>): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, val] of Object.entries(obj)) {
    result[String(val)] = key;
  }
  return result;
}

/**
 * Returns a new Set containing all elements present in either Set A or Set B.
 */
export function setUnion<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  const result = new Set<T>(setA);
  for (const elem of setB) {
    result.add(elem);
  }
  return result;
}

/**
 * Returns a new Set containing all elements present in both Set A and Set B.
 */
export function setIntersection<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  const result = new Set<T>();
  for (const elem of setB) {
    if (setA.has(elem)) {
      result.add(elem);
    }
  }
  return result;
}

/**
 * Returns a new Set containing all elements present in Set A but not in Set B.
 */
export function setDifference<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  const result = new Set<T>(setA);
  for (const elem of setB) {
    result.delete(elem);
  }
  return result;
}
