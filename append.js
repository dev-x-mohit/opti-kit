const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'packages', 'opti-kit', 'src');

const arrayContent = `
/**
 * Zips two arrays together.
 */
export function zip<T, U>(a: T[], b: U[]): [T, U][] {
  const minLength = Math.min(a.length, b.length);
  const result: [T, U][] = [];
  for (let i = 0; i < minLength; i++) {
    result.push([a[i], b[i]]);
  }
  return result;
}

/**
 * Unzips an array of tuples into a tuple of arrays.
 */
export function unzip<T, U>(zipped: [T, U][]): [T[], U[]] {
  const a: T[] = [];
  const b: U[] = [];
  for (const [x, y] of zipped) {
    a.push(x);
    b.push(y);
  }
  return [a, b];
}

/**
 * Returns an array of elements present in all given arrays.
 */
export function intersection<T>(...arrays: T[][]): T[] {
  if (arrays.length === 0) return [];
  return arrays.reduce((acc, current) => {
    const set = new Set(current);
    return acc.filter(item => set.has(item));
  });
}

/**
 * Returns an array of elements present in the first array but not in the rest.
 */
export function difference<T>(base: T[], ...others: T[][]): T[] {
  const othersSet = new Set(others.flat());
  return base.filter(item => !othersSet.has(item));
}

/**
 * Returns an array of elements that are present in either array but not both.
 */
export function symmetricDifference<T>(a: T[], b: T[]): T[] {
  const aSet = new Set(a);
  const bSet = new Set(b);
  const aDiff = a.filter(x => !bSet.has(x));
  const bDiff = b.filter(x => !aSet.has(x));
  return [...aDiff, ...bDiff];
}

/**
 * Gets a random sample of \`n\` elements from an array.
 */
export function sampleSize<T>(arr: T[], n: number = 1): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result.slice(0, Math.max(0, n));
}

/**
 * Creates an object composed of keys generated from the results of running each element through the iteratee.
 */
export function countBy<T>(arr: T[], iteratee: (item: T) => string | number): Record<string, number> {
  const result: Record<string, number> = {};
  for (const item of arr) {
    const key = iteratee(item);
    result[key] = (result[key] || 0) + 1;
  }
  return result;
}

/**
 * Groups elements of an array based on a grouping function.
 */
export function groupBy<T, K extends string | number | symbol>(arr: T[], iteratee: (item: T) => K): Record<K, T[]> {
  const result = {} as Record<K, T[]>;
  for (const item of arr) {
    const key = iteratee(item);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
  }
  return result;
}
`;

fs.appendFileSync(path.join(srcDir, 'array.ts'), arrayContent);

const stringContent = `
/**
 * Strips HTML tags from a string.
 */
export function stripTags(str: string): string {
  return str.replace(/<[^>]*>?/gm, '');
}

/**
 * Pads a string on both sides.
 */
export function pad(str: string, length: number, chars: string = ' '): string {
  if (str.length >= length) return str;
  const padLen = length - str.length;
  const left = Math.floor(padLen / 2);
  const right = Math.ceil(padLen / 2);
  return chars.repeat(Math.ceil(left / chars.length)).slice(0, left) + str + chars.repeat(Math.ceil(right / chars.length)).slice(0, right);
}

/**
 * Removes diacritics/accents from a string.
 */
export function stripAccents(str: string): string {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/**
 * Counts words in a string.
 */
export function wordCount(str: string): number {
  const matches = str.match(/\S+/g);
  return matches ? matches.length : 0;
}

/**
 * Reverses a string.
 */
export function reverse(str: string): string {
  return str.split('').reverse().join('');
}

/**
 * Truncates a string to a certain number of words.
 */
export function truncateWords(str: string, limit: number, suffix = '...'): string {
  const words = str.split(/\s+/);
  if (words.length <= limit) return str;
  return words.slice(0, limit).join(' ') + suffix;
}
`;

fs.appendFileSync(path.join(srcDir, 'string.ts'), stringContent);

const objectContent = `
/**
 * Creates an object composed of the picked object properties that satisfy the predicate.
 */
export function pickBy<T extends object>(obj: T, predicate: (value: T[keyof T], key: keyof T) => boolean): Partial<T> {
  const result = {} as Partial<T>;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && predicate(obj[key], key)) {
      result[key] = obj[key];
    }
  }
  return result;
}

/**
 * Creates an object composed of the own and inherited enumerable string keyed properties of object that don't satisfy the predicate.
 */
export function omitBy<T extends object>(obj: T, predicate: (value: T[keyof T], key: keyof T) => boolean): Partial<T> {
  const result = {} as Partial<T>;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && !predicate(obj[key], key)) {
      result[key] = obj[key];
    }
  }
  return result;
}

/**
 * Creates an object composed of the inverted keys and values of object.
 */
export function invert(obj: Record<string, string | number>): Record<string, string> {
  const result: Record<string, string> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[obj[key]] = key;
    }
  }
  return result;
}

/**
 * Creates an object with the same values as object and keys generated by running each own enumerable string keyed property of object thru iteratee.
 */
export function mapKeys<T extends object>(obj: T, iteratee: (value: T[keyof T], key: keyof T) => string): Record<string, T[keyof T]> {
  const result: Record<string, T[keyof T]> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[iteratee(obj[key], key)] = obj[key];
    }
  }
  return result;
}

/**
 * Creates an object with the same keys as object and values generated by running each own enumerable string keyed property of object thru iteratee.
 */
export function mapValues<T extends object, V>(obj: T, iteratee: (value: T[keyof T], key: keyof T) => V): Record<keyof T, V> {
  const result = {} as Record<keyof T, V>;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = iteratee(obj[key], key);
    }
  }
  return result;
}

/**
 * Checks if a path exists in an object.
 */
export function hasPath(obj: any, path: string | (string | number)[]): boolean {
  if (obj == null) return false;
  const pathArr = Array.isArray(path) ? path : path.split(/[\.\[\]]/).filter(Boolean);
  let current = obj;
  for (const key of pathArr) {
    if (current != null && Object.prototype.hasOwnProperty.call(current, key)) {
      current = current[key];
    } else {
      return false;
    }
  }
  return true;
}
`;

fs.appendFileSync(path.join(srcDir, 'object.ts'), objectContent);

const asyncContent = `
/**
 * Wraps a promise with a timeout. If the promise does not resolve within the specified time, it rejects.
 * Alias for timeout.
 */
export function pTimeout<T>(promise: Promise<T>, ms: number, fallbackError = new Error("Timeout")): Promise<T> {
  return timeout(promise, ms, fallbackError);
}

/**
 * Resolves as soon as any of the given promises resolve. Rejects only if all promises reject.
 */
export function pAny<T>(promises: Promise<T>[]): Promise<T> {
  if (typeof Promise.any === 'function') {
    return Promise.any(promises);
  }
  
  return new Promise((resolve, reject) => {
    let rejections = 0;
    const errors: any[] = [];
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i])
        .then(resolve)
        .catch(err => {
          errors[i] = err;
          rejections++;
          if (rejections === promises.length) {
            reject(new AggregateError(errors, 'All promises were rejected'));
          }
        });
    }
  });
}

/**
 * A simple concurrency limit for promises.
 */
export function pLimit(concurrency: number): <T>(fn: () => Promise<T>) => Promise<T> {
  const queue: Array<() => void> = [];
  let activeCount = 0;

  const next = () => {
    activeCount--;
    if (queue.length > 0) {
      queue.shift()!();
    }
  };

  return <T>(fn: () => Promise<T>): Promise<T> => {
    return new Promise((resolve, reject) => {
      const run = () => {
        activeCount++;
        Promise.resolve(fn()).then(
          (val) => { resolve(val); next(); },
          (err) => { reject(err); next(); }
        );
      };

      if (activeCount < concurrency) {
        run();
      } else {
        queue.push(run);
      }
    });
  };
}
`;

fs.appendFileSync(path.join(srcDir, 'async.ts'), asyncContent);

const mathContent = `
/**
 * Calculates the Greatest Common Divisor.
 */
export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

/**
 * Calculates the Least Common Multiple.
 */
export function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd(a, b);
}

/**
 * Calculates the factorial of a number.
 */
export function factorial(n: number): number {
  if (n < 0) throw new Error("Factorial is not defined for negative numbers");
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

/**
 * Returns the nth Fibonacci number.
 */
export function fibonacci(n: number): number {
  if (n < 0) throw new Error("Fibonacci is not defined for negative numbers");
  if (n <= 1) return n;
  let a = 0, b = 1, temp;
  for (let i = 2; i <= n; i++) {
    temp = a + b;
    a = b;
    b = temp;
  }
  return b;
}

/**
 * Rounds a number to a specific precision.
 */
export function roundTo(num: number, precision: number = 0): number {
  const factor = Math.pow(10, precision);
  return Math.round(num * factor) / factor;
}
`;

fs.appendFileSync(path.join(srcDir, 'math.ts'), mathContent);

const validateContent = `
/**
 * Checks if a string is a valid MAC address.
 */
export function isMACAddress(str: string): boolean {
  return /^([0-9a-fA-F]{2}[:-]){5}([0-9a-fA-F]{2})$/.test(str);
}

/**
 * Checks if a string is a valid IP address (v4 or v6).
 */
export function isIP(str: string): boolean {
  const ipv4 = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const ipv6 = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
  return ipv4.test(str) || ipv6.test(str);
}

/**
 * Checks if a string is a valid port.
 */
export function isPort(str: string | number): boolean {
  const port = Number(str);
  return Number.isInteger(port) && port >= 0 && port <= 65535;
}

/**
 * Checks if a string is base64 encoded.
 */
export function isBase64(str: string): boolean {
  return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(str);
}

/**
 * Basic Credit Card format validation.
 */
export function isCreditCard(str: string): boolean {
  const sanitized = str.replace(/[^0-9]/g, '');
  if (sanitized.length < 13 || sanitized.length > 19) return false;
  
  let sum = 0;
  let shouldDouble = false;
  
  for (let i = sanitized.length - 1; i >= 0; i--) {
    let digit = parseInt(sanitized.charAt(i), 10);
    
    if (shouldDouble) {
      if ((digit *= 2) > 9) digit -= 9;
    }
    
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  
  return (sum % 10) === 0;
}
`;

fs.appendFileSync(path.join(srcDir, 'validate.ts'), validateContent);

const domContent = `
/**
 * Adds a class to a DOM element.
 */
export function addClass(el: HTMLElement | null, className: string): void {
  if (el && el.classList) {
    el.classList.add(...className.split(' ').filter(Boolean));
  }
}

/**
 * Removes a class from a DOM element.
 */
export function removeClass(el: HTMLElement | null, className: string): void {
  if (el && el.classList) {
    el.classList.remove(...className.split(' ').filter(Boolean));
  }
}

/**
 * Toggles a class on a DOM element.
 */
export function toggleClass(el: HTMLElement | null, className: string, force?: boolean): void {
  if (el && el.classList) {
    el.classList.toggle(className, force);
  }
}

/**
 * Gets all parent elements up to the document root.
 */
export function getParents(el: HTMLElement | null, selector?: string): HTMLElement[] {
  const parents: HTMLElement[] = [];
  let parent = el?.parentElement;
  
  while (parent) {
    if (!selector || (parent.matches && parent.matches(selector))) {
      parents.push(parent);
    }
    parent = parent.parentElement;
  }
  
  return parents;
}

/**
 * Polyfill-ish wrapper for Element.closest
 */
export function closest(el: HTMLElement | null, selector: string): HTMLElement | null {
  if (!el) return null;
  if (el.closest) return el.closest(selector);
  
  let parent: HTMLElement | null = el;
  while (parent) {
    if (parent.matches && parent.matches(selector)) return parent;
    parent = parent.parentElement;
  }
  return null;
}
`;

fs.appendFileSync(path.join(srcDir, 'dom.ts'), domContent);

const randomContent = `
/**
 * Generates a random boolean.
 */
export function randomBoolean(): boolean {
  return Math.random() >= 0.5;
}

/**
 * Generates a random alphanumeric string of given length.
 */
export function randomString(length = 10): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Generates a random hex color.
 */
export function randomColor(): string {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

/**
 * Generates a random date between start and end.
 */
export function randomDate(start: Date, end: Date = new Date()): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
`;

fs.appendFileSync(path.join(srcDir, 'random.ts'), randomContent);

console.log('Appended all new functions successfully.');
