/**
 * Deep Object Operations
 */

export function deepFreeze<T extends object>(obj: T): Readonly<T> {
  const propNames = Object.getOwnPropertyNames(obj);
  for (const name of propNames) {
    const value = (obj as any)[name];
    if (value && typeof value === 'object') {
      deepFreeze(value);
    }
  }
  return Object.freeze(obj);
}

export function deepSeal<T extends object>(obj: T): T {
  const propNames = Object.getOwnPropertyNames(obj);
  for (const name of propNames) {
    const value = (obj as any)[name];
    if (value && typeof value === 'object') {
      deepSeal(value);
    }
  }
  return Object.seal(obj);
}

export function flattenDeepObject(obj: Record<string, any>, prefix = ''): Record<string, any> {
  let res: Record<string, any> = {};
  for (const [k, v] of Object.entries(obj)) {
    const pre = prefix.length ? prefix + '.' : '';
    if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
      Object.assign(res, flattenDeepObject(v, pre + k));
    } else {
      res[pre + k] = v;
    }
  }
  return res;
}

export function unflattenObject(obj: Record<string, any>): Record<string, any> {
  const res: Record<string, any> = {};
  for (const [k, v] of Object.entries(obj)) {
    const keys = k.split('.');
    let cur = res;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!cur[keys[i]]) cur[keys[i]] = {};
      cur = cur[keys[i]];
    }
    cur[keys[keys.length - 1]] = v;
  }
  return res;
}

export function deepMapKeys(obj: any, fn: (key: string) => string): any {
  if (Array.isArray(obj)) return obj.map((v) => deepMapKeys(v, fn));
  if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      acc[fn(key)] = deepMapKeys(obj[key], fn);
      return acc;
    }, {} as any);
  }
  return obj;
}

export function deepMapValues(obj: any, fn: (val: any) => any): any {
  if (Array.isArray(obj)) return obj.map((v) => deepMapValues(v, fn));
  if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      acc[key] = deepMapValues(obj[key], fn);
      return acc;
    }, {} as any);
  }
  return fn(obj);
}

export function deepDiff(obj1: Record<string, any>, obj2: Record<string, any>): Record<string, any> {
  const diff: Record<string, any> = {};
  for (const key of Object.keys(obj1)) {
    if (obj1[key] !== obj2[key]) {
      if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
        const subDiff = deepDiff(obj1[key], obj2[key]);
        if (Object.keys(subDiff).length > 0) diff[key] = subDiff;
      } else {
        diff[key] = obj2[key];
      }
    }
  }
  for (const key of Object.keys(obj2)) {
    if (!(key in obj1)) diff[key] = obj2[key];
  }
  return diff;
}

export function deepOmit(obj: any, keysToOmit: string[]): any {
  if (Array.isArray(obj)) return obj.map((v) => deepOmit(v, keysToOmit));
  if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      if (!keysToOmit.includes(key)) {
        acc[key] = deepOmit(obj[key], keysToOmit);
      }
      return acc;
    }, {} as any);
  }
  return obj;
}
