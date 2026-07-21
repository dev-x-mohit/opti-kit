/**
 * Isomorphic collection of standard data structures missing in native JavaScript.
 */

/**
 * Standard LIFO (Last-In-First-Out) Stack.
 */
export class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  size(): number {
    return this.items.length;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  clear(): void {
    this.items = [];
  }

  toArray(): T[] {
    return [...this.items];
  }
}

/**
 * Standard FIFO (First-In-First-Out) Queue.
 */
export class Queue<T> {
  private items: T[] = [];
  private offset = 0;

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    if (this.items.length === 0) return undefined;

    const item = this.items[this.offset];
    this.offset++;

    // Optimize memory layout: shrink array if offset gets too large
    if (this.offset * 2 >= this.items.length) {
      this.items = this.items.slice(this.offset);
      this.offset = 0;
    }

    return item;
  }

  peek(): T | undefined {
    if (this.items.length === 0) return undefined;
    return this.items[this.offset];
  }

  size(): number {
    return this.items.length - this.offset;
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }

  clear(): void {
    this.items = [];
    this.offset = 0;
  }

  toArray(): T[] {
    return this.items.slice(this.offset);
  }
}

/**
 * Highly performant binary-heap-based Priority Queue.
 * Supports custom comparators for min-heap (default) or max-heap behaviors.
 */
export class PriorityQueue<T> {
  private heap: T[] = [];
  private compare: (a: T, b: T) => number;

  constructor(compare?: (a: T, b: T) => number) {
    this.compare =
      compare || ((a: any, b: any) => (a < b ? -1 : a > b ? 1 : 0));
  }

  size(): number {
    return this.heap.length;
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  peek(): T | undefined {
    return this.heap[0];
  }

  insert(val: T): void {
    this.heap.push(val);
    this.up(this.heap.length - 1);
  }

  extract(): T | undefined {
    if (this.heap.length === 0) return undefined;
    const top = this.heap[0];
    const bottom = this.heap.pop()!;
    if (this.heap.length > 0) {
      this.heap[0] = bottom;
      this.down(0);
    }
    return top;
  }

  clear(): void {
    this.heap = [];
  }

  private up(pos: number): void {
    while (pos > 0) {
      const parent = (pos - 1) >> 1;
      if (this.compare(this.heap[pos], this.heap[parent]) < 0) {
        this.swap(pos, parent);
        pos = parent;
      } else {
        break;
      }
    }
  }

  private down(pos: number): void {
    const len = this.heap.length;
    const half = len >> 1;
    while (pos < half) {
      const left = (pos << 1) + 1;
      const right = left + 1;
      let best = left;

      if (
        right < len &&
        this.compare(this.heap[right], this.heap[left]) < 0
      ) {
        best = right;
      }

      if (this.compare(this.heap[best], this.heap[pos]) < 0) {
        this.swap(pos, best);
        pos = best;
      } else {
        break;
      }
    }
  }

  private swap(i: number, j: number): void {
    const temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  }
}

/**
 * Bidirectional 1-to-1 Map mapping unique keys to unique values.
 * Ensures bidirectional O(1) lookups.
 */
export class BiMap<K, V> {
  private keyToVal = new Map<K, V>();
  private valToKey = new Map<V, K>();

  set(key: K, value: V): void {
    // Delete any existing associations to enforce 1-to-1 mapping
    if (this.keyToVal.has(key)) {
      this.deleteByKey(key);
    }
    if (this.valToKey.has(value)) {
      this.deleteByValue(value);
    }

    this.keyToVal.set(key, value);
    this.valToKey.set(value, key);
  }

  getValue(key: K): V | undefined {
    return this.keyToVal.get(key);
  }

  getKey(value: V): K | undefined {
    return this.valToKey.get(value);
  }

  deleteByKey(key: K): boolean {
    if (!this.keyToVal.has(key)) return false;
    const value = this.keyToVal.get(key)!;
    this.keyToVal.delete(key);
    this.valToKey.delete(value);
    return true;
  }

  deleteByValue(value: V): boolean {
    if (!this.valToKey.has(value)) return false;
    const key = this.valToKey.get(value)!;
    this.valToKey.delete(value);
    this.keyToVal.delete(key);
    return true;
  }

  size(): number {
    return this.keyToVal.size;
  }

  clear(): void {
    this.keyToVal.clear();
    this.valToKey.clear();
  }
}
