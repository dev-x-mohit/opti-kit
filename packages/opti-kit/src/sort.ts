type CompareFn<T> = (a: T, b: T) => number;

function defaultCompare<T>(a: T, b: T): number {
  if (a === b) return 0;
  return a < b ? -1 : 1;
}

/**
 * Bubble Sort algorithm.
 */
export function bubbleSort<T>(arr: T[], compare: CompareFn<T> = defaultCompare): T[] {
  const result = [...arr];
  const n = result.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (compare(result[j], result[j + 1]) > 0) {
        const temp = result[j];
        result[j] = result[j + 1];
        result[j + 1] = temp;
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return result;
}

/**
 * Selection Sort algorithm.
 */
export function selectionSort<T>(arr: T[], compare: CompareFn<T> = defaultCompare): T[] {
  const result = [...arr];
  const n = result.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (compare(result[j], result[minIndex]) < 0) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      const temp = result[i];
      result[i] = result[minIndex];
      result[minIndex] = temp;
    }
  }
  return result;
}

/**
 * Insertion Sort algorithm.
 */
export function insertionSort<T>(arr: T[], compare: CompareFn<T> = defaultCompare): T[] {
  const result = [...arr];
  const n = result.length;
  for (let i = 1; i < n; i++) {
    const key = result[i];
    let j = i - 1;
    while (j >= 0 && compare(result[j], key) > 0) {
      result[j + 1] = result[j];
      j = j - 1;
    }
    result[j + 1] = key;
  }
  return result;
}

/**
 * Merge Sort algorithm.
 */
export function mergeSort<T>(arr: T[], compare: CompareFn<T> = defaultCompare): T[] {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid), compare);
  const right = mergeSort(arr.slice(mid), compare);
  
  return merge(left, right, compare);
}

function merge<T>(left: T[], right: T[], compare: CompareFn<T>): T[] {
  const result: T[] = [];
  let i = 0;
  let j = 0;
  
  while (i < left.length && j < right.length) {
    if (compare(left[i], right[j]) <= 0) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}

/**
 * Quick Sort algorithm.
 */
export function quickSort<T>(arr: T[], compare: CompareFn<T> = defaultCompare): T[] {
  if (arr.length <= 1) return arr;
  
  const result = [...arr];
  quickSortHelper(result, 0, result.length - 1, compare);
  return result;
}

function quickSortHelper<T>(arr: T[], low: number, high: number, compare: CompareFn<T>) {
  if (low < high) {
    const pi = partition(arr, low, high, compare);
    quickSortHelper(arr, low, pi - 1, compare);
    quickSortHelper(arr, pi + 1, high, compare);
  }
}

function partition<T>(arr: T[], low: number, high: number, compare: CompareFn<T>): number {
  const pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    if (compare(arr[j], pivot) < 0) {
      i++;
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }
  const temp = arr[i + 1];
  arr[i + 1] = arr[high];
  arr[high] = temp;
  
  return i + 1;
}

/**
 * Heap Sort algorithm.
 */
export function heapSort<T>(arr: T[], compare: CompareFn<T> = defaultCompare): T[] {
  const result = [...arr];
  const n = result.length;
  
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(result, n, i, compare);
  }
  
  for (let i = n - 1; i > 0; i--) {
    const temp = result[0];
    result[0] = result[i];
    result[i] = temp;
    heapify(result, i, 0, compare);
  }
  
  return result;
}

function heapify<T>(arr: T[], n: number, i: number, compare: CompareFn<T>) {
  let largest = i;
  const l = 2 * i + 1;
  const r = 2 * i + 2;
  
  if (l < n && compare(arr[l], arr[largest]) > 0) {
    largest = l;
  }
  if (r < n && compare(arr[r], arr[largest]) > 0) {
    largest = r;
  }
  if (largest !== i) {
    const temp = arr[i];
    arr[i] = arr[largest];
    arr[largest] = temp;
    heapify(arr, n, largest, compare);
  }
}

/**
 * Check if array is sorted.
 */
export function isSorted<T>(arr: T[], compare: CompareFn<T> = defaultCompare): boolean {
  for (let i = 0; i < arr.length - 1; i++) {
    if (compare(arr[i], arr[i + 1]) > 0) {
      return false;
    }
  }
  return true;
}
