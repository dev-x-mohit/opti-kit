/**
 * OptiKit Diff & Patch — High-performance deep object diffing, array diffing,
 * RFC 6902 JSON Patch creation & application, and text diffing.
 */

export interface ObjectDiff {
  added: Record<string, any>;
  removed: Record<string, any>;
  updated: Record<string, { oldValue: any; newValue: any }>;
  hasChanges: boolean;
}

export interface ArrayDiff<T> {
  added: T[];
  removed: T[];
  unchanged: T[];
  hasChanges: boolean;
}

export type JsonPatchOperationType = 'add' | 'remove' | 'replace' | 'move' | 'copy' | 'test';

export interface JsonPatchOperation {
  op: JsonPatchOperationType;
  path: string;
  value?: any;
  from?: string;
}

export interface TextDiffPart {
  value: string;
  type: 'added' | 'removed' | 'unchanged';
}

function isPlainObject(val: unknown): val is Record<string, any> {
  return typeof val === 'object' && val !== null && !Array.isArray(val) && !(val instanceof Date) && !(val instanceof RegExp);
}

/**
 * Recursively diffs two objects and returns added, removed, and updated fields.
 *
 * @example
 * ```ts
 * const a = { name: 'Alice', age: 25 };
 * const b = { name: 'Alice', age: 26, city: 'London' };
 * const diff = diffObjects(a, b);
 * // → { added: { city: 'London' }, removed: {}, updated: { age: { oldValue: 25, newValue: 26 } }, hasChanges: true }
 * ```
 */
export function diffObjects<T extends Record<string, any>>(original: T, updated: T): ObjectDiff {
  const added: Record<string, any> = {};
  const removed: Record<string, any> = {};
  const changes: Record<string, { oldValue: any; newValue: any }> = {};

  const origKeys = Object.keys(original || {});
  const updKeys = Object.keys(updated || {});
  const allKeys = new Set([...origKeys, ...updKeys]);

  for (const key of allKeys) {
    const hasOrig = key in (original || {});
    const hasUpd = key in (updated || {});

    if (!hasOrig && hasUpd) {
      added[key] = updated[key];
    } else if (hasOrig && !hasUpd) {
      removed[key] = original[key];
    } else {
      const val1 = original[key];
      const val2 = updated[key];

      if (isPlainObject(val1) && isPlainObject(val2)) {
        const nested = diffObjects(val1, val2);
        if (nested.hasChanges) {
          changes[key] = { oldValue: val1, newValue: val2 };
        }
      } else if (!Object.is(val1, val2)) {
        changes[key] = { oldValue: val1, newValue: val2 };
      }
    }
  }

  const hasChanges = Object.keys(added).length > 0 || Object.keys(removed).length > 0 || Object.keys(changes).length > 0;

  return {
    added,
    removed,
    updated: changes,
    hasChanges
  };
}

/**
 * Applies an ObjectDiff to a target object and returns the resulting object.
 *
 * @example
 * ```ts
 * const obj = { name: 'Alice', age: 25 };
 * const updated = patchObject(obj, diff);
 * ```
 */
export function patchObject<T extends Record<string, any>>(target: T, diff: ObjectDiff): T {
  const result: any = { ...target };

  // Remove keys
  for (const key of Object.keys(diff.removed)) {
    delete result[key];
  }

  // Add keys
  for (const [key, val] of Object.entries(diff.added)) {
    result[key] = val;
  }

  // Update keys
  for (const [key, change] of Object.entries(diff.updated)) {
    result[key] = change.newValue;
  }

  return result as T;
}

/**
 * Compares two arrays and produces added, removed, and unchanged elements.
 *
 * @example
 * ```ts
 * const diff = diffArrays([1, 2, 3], [2, 3, 4]);
 * // → { added: [4], removed: [1], unchanged: [2, 3], hasChanges: true }
 * ```
 */
export function diffArrays<T>(arr1: readonly T[], arr2: readonly T[], comparator?: (a: T, b: T) => boolean): ArrayDiff<T> {
  const cmp = comparator || ((a, b) => Object.is(a, b));
  const removed: T[] = [];
  const unchanged: T[] = [];
  const added: T[] = [];

  const matchedIn2 = new Set<number>();

  for (const item1 of arr1) {
    let found = false;
    for (let j = 0; j < arr2.length; j++) {
      if (!matchedIn2.has(j) && cmp(item1, arr2[j])) {
        matchedIn2.add(j);
        unchanged.push(item1);
        found = true;
        break;
      }
    }
    if (!found) {
      removed.push(item1);
    }
  }

  for (let j = 0; j < arr2.length; j++) {
    if (!matchedIn2.has(j)) {
      added.push(arr2[j]);
    }
  }

  return {
    added,
    removed,
    unchanged,
    hasChanges: added.length > 0 || removed.length > 0
  };
}

function escapeJsonPointer(str: string): string {
  return str.replace(/~/g, '~0').replace(/\//g, '~1');
}

function unescapeJsonPointer(str: string): string {
  return str.replace(/~1/g, '/').replace(/~0/g, '~');
}

/**
 * Generates an RFC 6902 JSON Patch representing the changes from original to target.
 *
 * @example
 * ```ts
 * const patch = createJsonPatch({ a: 1 }, { a: 2, b: 'hello' });
 * // → [
 * //   { op: 'replace', path: '/a', value: 2 },
 * //   { op: 'add', path: '/b', value: 'hello' }
 * // ]
 * ```
 */
export function createJsonPatch(original: any, target: any, basePath = ''): JsonPatchOperation[] {
  const patch: JsonPatchOperation[] = [];

  if (Object.is(original, target)) {
    return patch;
  }

  if (
    typeof original !== 'object' || original === null ||
    typeof target !== 'object' || target === null ||
    Array.isArray(original) !== Array.isArray(target)
  ) {
    patch.push({
      op: 'replace',
      path: basePath || '/',
      value: target
    });
    return patch;
  }

  if (Array.isArray(original) && Array.isArray(target)) {
    const minLen = Math.min(original.length, target.length);

    for (let i = 0; i < minLen; i++) {
      patch.push(...createJsonPatch(original[i], target[i], `${basePath}/${i}`));
    }

    if (target.length > original.length) {
      for (let i = minLen; i < target.length; i++) {
        patch.push({
          op: 'add',
          path: `${basePath}/${i}`,
          value: target[i]
        });
      }
    } else if (original.length > target.length) {
      for (let i = original.length - 1; i >= target.length; i--) {
        patch.push({
          op: 'remove',
          path: `${basePath}/${i}`
        });
      }
    }
    return patch;
  }

  const origKeys = Object.keys(original);
  const targetKeys = Object.keys(target);

  // Deleted keys
  for (const key of origKeys) {
    if (!(key in target)) {
      patch.push({
        op: 'remove',
        path: `${basePath}/${escapeJsonPointer(key)}`
      });
    }
  }

  // Added & changed keys
  for (const key of targetKeys) {
    const ptr = `${basePath}/${escapeJsonPointer(key)}`;
    if (!(key in original)) {
      patch.push({
        op: 'add',
        path: ptr,
        value: target[key]
      });
    } else {
      patch.push(...createJsonPatch(original[key], target[key], ptr));
    }
  }

  return patch;
}

/**
 * Applies an RFC 6902 JSON Patch to a document and returns a new document.
 *
 * @example
 * ```ts
 * const doc = { a: 1 };
 * const patch = [{ op: 'add', path: '/b', value: 2 }];
 * const result = applyJsonPatch(doc, patch);
 * // → { a: 1, b: 2 }
 * ```
 */
export function applyJsonPatch<T = any>(document: T, patch: readonly JsonPatchOperation[]): T {
  // Deep clone root doc
  let doc = JSON.parse(JSON.stringify(document));

  for (const operation of patch) {
    const { op, path, value, from } = operation;

    if (path === '' || path === '/') {
      if (op === 'replace' || op === 'add') {
        doc = value;
        continue;
      }
    }

    const segments = path.split('/').slice(1).map(unescapeJsonPointer);
    const parentSegments = segments.slice(0, -1);
    const lastKey = segments[segments.length - 1];

    let current = doc;
    for (const segment of parentSegments) {
      if (current === undefined || current === null) {
        throw new Error(`Invalid JSON Patch path: ${path}`);
      }
      current = current[segment];
    }

    switch (op) {
      case 'add': {
        if (Array.isArray(current)) {
          if (lastKey === '-') {
            current.push(value);
          } else {
            const index = Number(lastKey);
            current.splice(index, 0, value);
          }
        } else if (typeof current === 'object' && current !== null) {
          current[lastKey] = value;
        }
        break;
      }

      case 'remove': {
        if (Array.isArray(current)) {
          const index = Number(lastKey);
          current.splice(index, 1);
        } else if (typeof current === 'object' && current !== null) {
          delete current[lastKey];
        }
        break;
      }

      case 'replace': {
        if (Array.isArray(current)) {
          const index = Number(lastKey);
          current[index] = value;
        } else if (typeof current === 'object' && current !== null) {
          current[lastKey] = value;
        }
        break;
      }

      case 'test': {
        const actual = current[lastKey];
        if (JSON.stringify(actual) !== JSON.stringify(value)) {
          throw new Error(`JSON Patch test failed at path "${path}": expected ${JSON.stringify(value)}, got ${JSON.stringify(actual)}`);
        }
        break;
      }

      case 'copy':
      case 'move': {
        if (!from) throw new Error(`Missing 'from' parameter for patch op: ${op}`);
        const fromSegments = from.split('/').slice(1).map(unescapeJsonPointer);
        let fromCurrent = doc;
        for (const seg of fromSegments.slice(0, -1)) {
          fromCurrent = fromCurrent[seg];
        }
        const fromLastKey = fromSegments[fromSegments.length - 1];
        const valToCopy = fromCurrent[fromLastKey];

        if (op === 'move') {
          if (Array.isArray(fromCurrent)) {
            fromCurrent.splice(Number(fromLastKey), 1);
          } else {
            delete fromCurrent[fromLastKey];
          }
        }

        if (Array.isArray(current)) {
          if (lastKey === '-') {
            current.push(valToCopy);
          } else {
            current.splice(Number(lastKey), 0, valToCopy);
          }
        } else {
          current[lastKey] = valToCopy;
        }
        break;
      }

      default:
        throw new Error(`Unsupported JSON patch operation: ${op}`);
    }
  }

  return doc;
}


/**
 * Computes a word-by-word diff between two text strings.
 *
 * @example
 * ```ts
 * diffWords('hello old world', 'hello new world');
 * // → [
 * //   { type: 'unchanged', value: 'hello' },
 * //   { type: 'removed', value: 'old' },
 * //   { type: 'added', value: 'new' },
 * //   { type: 'unchanged', value: 'world' }
 * // ]
 * ```
 */
export function diffWords(text1: string, text2: string): TextDiffPart[] {
  const words1 = text1.split(/\s+/).filter(Boolean);
  const words2 = text2.split(/\s+/).filter(Boolean);

  const parts: TextDiffPart[] = [];
  let i = 0;
  let j = 0;

  while (i < words1.length || j < words2.length) {
    if (i < words1.length && j < words2.length && words1[i] === words2[j]) {
      parts.push({ type: 'unchanged', value: words1[i] });
      i++;
      j++;
    } else if (i < words1.length && (j >= words2.length || !words2.slice(j).includes(words1[i]))) {
      parts.push({ type: 'removed', value: words1[i] });
      i++;
    } else if (j < words2.length) {
      parts.push({ type: 'added', value: words2[j] });
      j++;
    }
  }

  return parts;
}
