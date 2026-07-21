export interface JsonDiffEntry {
  type: "add" | "update" | "remove";
  oldValue?: any;
  newValue?: any;
}

/**
 * Creates a fast JSON-based deep clone of a value.
 */
export function jsonClone<T>(obj: T): T {
  if (obj === undefined) return undefined as any;
  if (obj === null) return null as any;
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Flattens a nested object or array into a single-level object with dot-notation and bracket-notation paths.
 */
export function jsonFlatten(obj: any, prefix = ""): Record<string, any> {
  const result: Record<string, any> = {};
  if (obj === null || obj === undefined) return result;

  function recurse(current: any, prop: string) {
    if (Object(current) !== current) {
      result[prop] = current;
    } else if (Array.isArray(current)) {
      const l = current.length;
      for (let i = 0; i < l; i++) {
        recurse(current[i], prop ? `${prop}[${i}]` : `[${i}]`);
      }
      if (l === 0) {
        result[prop] = [];
      }
    } else {
      let isEmpty = true;
      for (const p in current) {
        if (Object.prototype.hasOwnProperty.call(current, p)) {
          isEmpty = false;
          recurse(current[p], prop ? `${prop}.${p}` : p);
        }
      }
      if (isEmpty && prop) {
        result[prop] = {};
      }
    }
  }

  recurse(obj, prefix);
  return result;
}

/**
 * Reconstructs a flattened object (created by jsonFlatten) back into its nested structure.
 */
export function jsonUnflatten(flat: Record<string, any>): any {
  const keys = Object.keys(flat);
  if (keys.length === 0) return {};

  const isRootArray = keys.every((key) => key.startsWith("["));
  const result: any = isRootArray ? [] : {};

  for (const [key, value] of Object.entries(flat)) {
    const segments: (string | number)[] = [];
    const parts = key.split(".");

    for (const part of parts) {
      const bracketIndex = part.indexOf("[");
      if (bracketIndex !== -1) {
        const propName = part.substring(0, bracketIndex);
        if (propName) segments.push(propName);

        const matches = part.match(/\[(\d+)\]/g);
        if (matches) {
          for (const match of matches) {
            const num = parseInt(match.replace(/[\[\]]/g, ""), 10);
            segments.push(num);
          }
        }
      } else {
        segments.push(part);
      }
    }

    let current = result;
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      const nextSegment = segments[i + 1];
      const isNextArray = typeof nextSegment === "number";

      if (i === segments.length - 1) {
        current[segment] = value;
      } else {
        if (current[segment] === undefined) {
          current[segment] = isNextArray ? [] : {};
        }
        current = current[segment];
      }
    }
  }
  return result;
}

/**
 * Queries nested values in an object using path strings (e.g. "users[0].address.city").
 */
export function jsonPath(obj: any, pathStr: string, fallback?: any): any {
  if (obj === null || obj === undefined) return fallback;
  const segments: (string | number)[] = [];
  const parts = pathStr.split(".");

  for (const part of parts) {
    const bracketIndex = part.indexOf("[");
    if (bracketIndex !== -1) {
      const propName = part.substring(0, bracketIndex);
      if (propName) segments.push(propName);

      const matches = part.match(/\[(\d+)\]/g);
      if (matches) {
        for (const match of matches) {
          const num = parseInt(match.replace(/[\[\]]/g, ""), 10);
          segments.push(num);
        }
      }
    } else {
      segments.push(part);
    }
  }

  let current = obj;
  for (const segment of segments) {
    if (current === null || current === undefined) {
      return fallback;
    }
    current = current[segment];
  }
  return current !== undefined ? current : fallback;
}

/**
 * Performs a deep merge of two JSON-serializable structures.
 */
export function jsonMerge(target: any, source: any): any {
  if (target === null || target === undefined) return jsonClone(source);
  if (source === null || source === undefined) return jsonClone(target);

  if (Array.isArray(target) && Array.isArray(source)) {
    return [...target, ...source].map((item) => jsonClone(item));
  }

  if (
    typeof target === "object" &&
    typeof source === "object" &&
    !Array.isArray(target) &&
    !Array.isArray(source)
  ) {
    const result = jsonClone(target);
    for (const [key, val] of Object.entries(source)) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        if (
          typeof val === "object" &&
          val !== null &&
          typeof result[key] === "object" &&
          result[key] !== null
        ) {
          result[key] = jsonMerge(result[key], val);
        } else {
          result[key] = jsonClone(val);
        }
      }
    }
    return result;
  }

  return jsonClone(source);
}

/**
 * Computes structured differences between two JSON-serializable structures.
 */
export function jsonDiff(obj1: any, obj2: any): Record<string, JsonDiffEntry> {
  const flat1 = jsonFlatten(obj1);
  const flat2 = jsonFlatten(obj2);
  const diff: Record<string, JsonDiffEntry> = {};

  const allKeys = new Set([...Object.keys(flat1), ...Object.keys(flat2)]);

  for (const key of allKeys) {
    const has1 = Object.prototype.hasOwnProperty.call(flat1, key);
    const has2 = Object.prototype.hasOwnProperty.call(flat2, key);

    if (has1 && !has2) {
      diff[key] = { type: "remove", oldValue: flat1[key] };
    } else if (!has1 && has2) {
      diff[key] = { type: "add", newValue: flat2[key] };
    } else if (flat1[key] !== flat2[key]) {
      diff[key] = {
        type: "update",
        oldValue: flat1[key],
        newValue: flat2[key],
      };
    }
  }

  return diff;
}
