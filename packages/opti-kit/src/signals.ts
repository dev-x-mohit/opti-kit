/**
 * OptiKit Signals — Zero-dependency, ultra-lightweight, and fine-grained reactive state primitive.
 *
 * Provides reactive signals, derived computed computations with lazy memoization,
 * automated dependency tracking, side-effect observers, and atomic batching.
 */

type CleanupFn = () => void;
type EffectFn = () => void | CleanupFn;

interface Subscriber {
  notify(): void;
}

let activeSubscriber: Subscriber | null = null;
let isBatching = false;
const pendingNotifications = new Set<Subscriber>();

/**
 * Executes a callback within a batch transaction.
 * Notifications are queued and flushed together once the batch completes.
 *
 * @example
 * ```ts
 * batch(() => {
 *   count.set(1);
 *   count.set(2);
 * });
 * // → effects fire only once after the batch finishes
 * ```
 */
export function batch<T>(fn: () => T): T {
  if (isBatching) {
    return fn();
  }
  isBatching = true;
  try {
    return fn();
  } finally {
    isBatching = false;
    const toNotify = Array.from(pendingNotifications);
    pendingNotifications.clear();
    for (const sub of toNotify) {
      sub.notify();
    }
  }
}

/**
 * Runs a function without tracking any signal access as dependencies.
 *
 * @example
 * ```ts
 * const value = untrack(() => mySignal.value);
 * ```
 */
export function untrack<T>(fn: () => T): T {
  const prev = activeSubscriber;
  activeSubscriber = null;
  try {
    return fn();
  } finally {
    activeSubscriber = prev;
  }
}

export interface ReadonlySignal<T> {
  readonly value: T;
  peek(): T;
  subscribe(fn: (val: T) => void): () => void;
  toString(): string;
  toJSON(): T;
  valueOf(): T;
}

export interface Signal<T> extends ReadonlySignal<T> {
  value: T;
  set(newValue: T): void;
  update(fn: (current: T) => T): void;
}

const SIGNAL_BRAND = Symbol('OptiKit.Signal');

/**
 * Checks whether a given value is an OptiKit Signal.
 */
export function isSignal(val: unknown): val is Signal<any> | ReadonlySignal<any> {
  return typeof val === 'object' && val !== null && (val as any)[SIGNAL_BRAND] === true;
}

class SignalImpl<T> implements Signal<T> {
  public [SIGNAL_BRAND] = true;
  private _value: T;
  private _subscribers = new Set<Subscriber>();

  constructor(initialValue: T) {
    this._value = initialValue;
  }

  get value(): T {
    if (activeSubscriber) {
      this._subscribers.add(activeSubscriber);
    }
    return this._value;
  }

  set value(newValue: T) {
    this.set(newValue);
  }

  public peek(): T {
    return this._value;
  }

  public set(newValue: T): void {
    if (!Object.is(this._value, newValue)) {
      this._value = newValue;
      this._notifySubscribers();
    }
  }

  public update(fn: (current: T) => T): void {
    this.set(fn(this._value));
  }

  public subscribe(fn: (val: T) => void): () => void {
    return effect(() => {
      fn(this.value);
    });
  }

  private _notifySubscribers(): void {
    for (const sub of this._subscribers) {
      if (isBatching) {
        pendingNotifications.add(sub);
      } else {
        sub.notify();
      }
    }
  }

  public _removeSubscriber(sub: Subscriber): void {
    this._subscribers.delete(sub);
  }

  public toString(): string {
    return String(this.value);
  }

  public toJSON(): T {
    return this.value;
  }

  public valueOf(): T {
    return this.value;
  }
}

/**
 * Creates a reactive signal holding a mutable state value.
 *
 * @example
 * ```ts
 * const count = signal(0);
 * count.value++; // or count.set(1)
 * // → 1
 * ```
 */
export function signal<T>(initialValue: T): Signal<T> {
  return new SignalImpl<T>(initialValue);
}

class ComputedImpl<T> implements ReadonlySignal<T>, Subscriber {
  public [SIGNAL_BRAND] = true;
  private _fn: () => T;
  private _value!: T;
  private _isDirty = true;
  private _subscribers = new Set<Subscriber>();
  private _dependencies = new Set<SignalImpl<any> | ComputedImpl<any>>();

  constructor(fn: () => T) {
    this._fn = fn;
  }

  get value(): T {
    if (activeSubscriber) {
      this._subscribers.add(activeSubscriber);
    }

    if (this._isDirty) {
      this._compute();
    }
    return this._value;
  }

  public peek(): T {
    if (this._isDirty) {
      this._compute();
    }
    return this._value;
  }

  private _compute(): void {
    // Clear old dependencies
    for (const dep of this._dependencies) {
      dep._removeSubscriber(this);
    }
    this._dependencies.clear();

    const prevSub = activeSubscriber;
    activeSubscriber = this;
    try {
      this._value = this._fn();
      this._isDirty = false;
    } finally {
      activeSubscriber = prevSub;
    }
  }

  public notify(): void {
    if (!this._isDirty) {
      this._isDirty = true;
      for (const sub of this._subscribers) {
        if (isBatching) {
          pendingNotifications.add(sub);
        } else {
          sub.notify();
        }
      }
    }
  }

  public subscribe(fn: (val: T) => void): () => void {
    return effect(() => {
      fn(this.value);
    });
  }

  public _removeSubscriber(sub: Subscriber): void {
    this._subscribers.delete(sub);
  }

  public toString(): string {
    return String(this.value);
  }

  public toJSON(): T {
    return this.value;
  }

  public valueOf(): T {
    return this.value;
  }
}

/**
 * Creates a memoized computed signal derived from other signals.
 * Lazily evaluated and automatically invalidates when dependencies change.
 *
 * @example
 * ```ts
 * const count = signal(2);
 * const double = computed(() => count.value * 2);
 * console.log(double.value); // → 4
 * ```
 */
export function computed<T>(fn: () => T): ReadonlySignal<T> {
  return new ComputedImpl<T>(fn);
}

class EffectImpl implements Subscriber {
  private _fn: EffectFn;
  private _cleanup: CleanupFn | void = undefined;
  private _isDisposed = false;

  constructor(fn: EffectFn) {
    this._fn = fn;
    this.run();
  }

  public run(): void {
    if (this._isDisposed) return;

    if (typeof this._cleanup === 'function') {
      try {
        this._cleanup();
      } catch (err) {
        console.error('Signal effect cleanup error:', err);
      }
      this._cleanup = undefined;
    }

    const prevSub = activeSubscriber;
    activeSubscriber = this;
    try {
      this._cleanup = this._fn();
    } finally {
      activeSubscriber = prevSub;
    }
  }

  public notify(): void {
    if (!this._isDisposed) {
      this.run();
    }
  }

  public dispose(): void {
    this._isDisposed = true;
    if (typeof this._cleanup === 'function') {
      try {
        this._cleanup();
      } catch (err) {
        console.error('Signal effect cleanup error:', err);
      }
      this._cleanup = undefined;
    }
  }
}

/**
 * Creates a reactive effect that runs immediately and re-executes whenever
 * any signal read inside its callback changes. Returns an unsubscribe function.
 *
 * @example
 * ```ts
 * const count = signal(0);
 * const stop = effect(() => {
 *   console.log('Count changed:', count.value);
 * });
 * count.value++; // logs "Count changed: 1"
 * stop(); // cleans up effect
 * ```
 */
export function effect(fn: EffectFn): () => void {
  const effectInstance = new EffectImpl(fn);
  return () => {
    effectInstance.dispose();
  };
}
