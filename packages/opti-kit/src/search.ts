type CompareFn<T> = (a: T, b: T) => number;

function defaultCompare<T>(a: T, b: T): number {
  if (a === b) return 0;
  return a < b ? -1 : 1;
}

/**
 * Linear search: finds the index of the first matching element.
 */
export function linearSearch<T>(arr: T[], target: T, compare: CompareFn<T> = defaultCompare): number {
  for (let i = 0; i < arr.length; i++) {
    if (compare(arr[i], target) === 0) return i;
  }
  return -1;
}

/**
 * Binary search: efficiently finds the index of the target in a SORTED array.
 */
export function binarySearch<T>(arr: T[], target: T, compare: CompareFn<T> = defaultCompare): number {
  let low = 0;
  let high = arr.length - 1;
  
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const comparison = compare(arr[mid], target);
    
    if (comparison === 0) return mid;
    if (comparison < 0) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}

/**
 * Jump search: finds the index of the target in a SORTED array using block jumps.
 */
export function jumpSearch<T>(arr: T[], target: T, compare: CompareFn<T> = defaultCompare): number {
  const n = arr.length;
  let step = Math.floor(Math.sqrt(n));
  let prev = 0;
  
  while (compare(arr[Math.min(step, n) - 1], target) < 0) {
    prev = step;
    step += Math.floor(Math.sqrt(n));
    if (prev >= n) return -1;
  }
  
  while (compare(arr[prev], target) < 0) {
    prev++;
    if (prev === Math.min(step, n)) return -1;
  }
  
  if (compare(arr[prev], target) === 0) return prev;
  return -1;
}

/**
 * Exponential search: finds the index of the target in a SORTED array.
 */
export function exponentialSearch<T>(arr: T[], target: T, compare: CompareFn<T> = defaultCompare): number {
  const n = arr.length;
  if (n === 0) return -1;
  if (compare(arr[0], target) === 0) return 0;
  
  let i = 1;
  while (i < n && compare(arr[i], target) <= 0) {
    i *= 2;
  }
  
  return binarySearchRange(arr, target, Math.floor(i / 2), Math.min(i, n - 1), compare);
}

function binarySearchRange<T>(arr: T[], target: T, low: number, high: number, compare: CompareFn<T>): number {
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const comparison = compare(arr[mid], target);
    
    if (comparison === 0) return mid;
    if (comparison < 0) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}

/**
 * Interpolation search: finds the index of a number in a uniformly distributed SORTED array.
 */
export function interpolationSearch(arr: number[], target: number): number {
  let low = 0;
  let high = arr.length - 1;
  
  while (low <= high && target >= arr[low] && target <= arr[high]) {
    if (low === high) {
      if (arr[low] === target) return low;
      return -1;
    }
    
    const pos = low + Math.floor(((high - low) / (arr[high] - arr[low])) * (target - arr[low]));
    
    if (arr[pos] === target) return pos;
    if (arr[pos] < target) low = pos + 1;
    else high = pos - 1;
  }
  return -1;
}
