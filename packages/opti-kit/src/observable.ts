/**
 * OptiKit Observable — Zero-dependency, ultra-lightweight reactive stream primitives (RxJS-lite).
 * Provides Observable, Subject, BehaviorSubject, and functional stream operators.
 */

export interface Observer<T> {
  next: (value: T) => void;
  error?: (err: any) => void;
  complete?: () => void;
}

export interface Subscription {
  unsubscribe: () => void;
  readonly closed: boolean;
}

export type OperatorFunction<T, R> = (source: Observable<T>) => Observable<R>;

/**
 * Cold reactive data stream that pushes values to observers.
 */
export class Observable<T> {
  constructor(
    private _subscribe: (observer: Observer<T>) => (() => void) | void | Subscription
  ) {}

  public subscribe(
    observerOrNext: Observer<T> | ((val: T) => void),
    onError?: (err: any) => void,
    onComplete?: () => void
  ): Subscription {
    let isClosed = false;

    const observer: Observer<T> = typeof observerOrNext === 'function'
      ? { next: observerOrNext, error: onError, complete: onComplete }
      : observerOrNext;

    const safeObserver: Observer<T> = {
      next: (val: T) => {
        if (!isClosed) {
          try {
            observer.next(val);
          } catch (err) {
            safeObserver.error?.(err);
          }
        }
      },
      error: (err: any) => {
        if (!isClosed) {
          isClosed = true;
          if (observer.error) {
            observer.error(err);
          } else {
            console.error('Unhandled Observable error:', err);
          }
        }
      },
      complete: () => {
        if (!isClosed) {
          isClosed = true;
          observer.complete?.();
        }
      }
    };

    let cleanup: (() => void) | void | Subscription;
    try {
      cleanup = this._subscribe(safeObserver);
    } catch (err) {
      safeObserver.error?.(err);
    }

    return {
      get closed() {
        return isClosed;
      },
      unsubscribe: () => {
        if (!isClosed) {
          isClosed = true;
          if (typeof cleanup === 'function') {
            cleanup();
          } else if (cleanup && typeof cleanup.unsubscribe === 'function') {
            cleanup.unsubscribe();
          }
        }
      }
    };
  }

  public pipe<A>(op1: OperatorFunction<T, A>): Observable<A>;
  public pipe<A, B>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>): Observable<B>;
  public pipe<A, B, C>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>): Observable<C>;
  public pipe<A, B, C, D>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>): Observable<D>;
  public pipe(...operations: OperatorFunction<any, any>[]): Observable<any> {
    return operations.reduce((source: Observable<any>, op) => op(source), this);
  }
}

/**
 * Multicast reactive Subject that acts as both an Observer and an Observable.
 */
export class Subject<T> extends Observable<T> implements Observer<T> {
  private _observers = new Set<Observer<T>>();
  private _isCompleted = false;
  private _error: any = null;

  constructor() {
    super((observer) => {
      if (this._error) {
        observer.error?.(this._error);
        return;
      }
      if (this._isCompleted) {
        observer.complete?.();
        return;
      }
      this._observers.add(observer);
      return () => {
        this._observers.delete(observer);
      };
    });
  }

  public next(value: T): void {
    if (this._isCompleted || this._error) return;
    for (const obs of Array.from(this._observers)) {
      obs.next(value);
    }
  }

  public error(err: any): void {
    if (this._isCompleted || this._error) return;
    this._error = err;
    for (const obs of Array.from(this._observers)) {
      obs.error?.(err);
    }
    this._observers.clear();
  }

  public complete(): void {
    if (this._isCompleted || this._error) return;
    this._isCompleted = true;
    for (const obs of Array.from(this._observers)) {
      obs.complete?.();
    }
    this._observers.clear();
  }
}

/**
 * Subject variant that stores its current value and immediately emits it to new subscribers.
 */
export class BehaviorSubject<T> extends Subject<T> {
  private _value: T;

  constructor(initialValue: T) {
    super();
    this._value = initialValue;
  }

  public get value(): T {
    return this._value;
  }

  public override next(value: T): void {
    this._value = value;
    super.next(value);
  }

  public override subscribe(
    observerOrNext: Observer<T> | ((val: T) => void),
    onError?: (err: any) => void,
    onComplete?: () => void
  ): Subscription {
    const sub = super.subscribe(observerOrNext, onError, onComplete);
    if (typeof observerOrNext === 'function') {
      observerOrNext(this._value);
    } else if (observerOrNext && observerOrNext.next) {
      observerOrNext.next(this._value);
    }
    return sub;
  }
}

// ==================== Observable Creation Functions ====================

/**
 * Creates an Observable that emits synchronous arguments sequentially and completes.
 */
export function of<T>(...items: T[]): Observable<T> {
  return new Observable<T>((observer) => {
    for (const item of items) {
      observer.next(item);
    }
    observer.complete?.();
  });
}

/**
 * Converts an Array, Iterable, or Promise into an Observable.
 */
export function from<T>(input: Iterable<T> | Promise<T>): Observable<T> {
  return new Observable<T>((observer) => {
    if (input && typeof (input as any).then === 'function') {
      (input as Promise<T>)
        .then((val) => {
          observer.next(val);
          observer.complete?.();
        })
        .catch((err) => {
          observer.error?.(err);
        });
      return;
    }

    if (input && typeof (input as any)[Symbol.iterator] === 'function') {
      for (const item of input as Iterable<T>) {
        observer.next(item);
      }
      observer.complete?.();
    }
  });
}

/**
 * Emits sequential integers at a specified millisecond interval.
 */
export function interval(periodMs: number): Observable<number> {
  return new Observable<number>((observer) => {
    let count = 0;
    const timer = setInterval(() => {
      observer.next(count++);
    }, periodMs);

    return () => {
      clearInterval(timer);
    };
  });
}

// ==================== Observable Operators ====================

/**
 * Transforms each emitted value using a projection function.
 */
export function mapObservable<T, R>(project: (value: T, index: number) => R): OperatorFunction<T, R> {
  return (source: Observable<T>) => {
    return new Observable<R>((observer) => {
      let index = 0;
      return source.subscribe({
        next: (val) => observer.next(project(val, index++)),
        error: (err) => observer.error?.(err),
        complete: () => observer.complete?.()
      });
    });
  };
}

/**
 * Emits only values that satisfy the predicate.
 */
export function filterObservable<T>(predicate: (value: T, index: number) => boolean): OperatorFunction<T, T> {
  return (source: Observable<T>) => {
    return new Observable<T>((observer) => {
      let index = 0;
      return source.subscribe({
        next: (val) => {
          if (predicate(val, index++)) {
            observer.next(val);
          }
        },
        error: (err) => observer.error?.(err),
        complete: () => observer.complete?.()
      });
    });
  };
}

/**
 * Emits only the first `count` values.
 */
export function takeObservable<T>(count: number): OperatorFunction<T, T> {
  return (source: Observable<T>) => {
    return new Observable<T>((observer) => {
      let seen = 0;
      let isUnsubscribed = false;
      let innerSub: Subscription | null = null;

      if (count <= 0) {
        observer.complete?.();
        return;
      }

      innerSub = source.subscribe({
        next: (val) => {
          if (isUnsubscribed) return;
          observer.next(val);
          seen++;
          if (seen >= count) {
            isUnsubscribed = true;
            if (innerSub) innerSub.unsubscribe();
            observer.complete?.();
          }
        },
        error: (err) => observer.error?.(err),
        complete: () => observer.complete?.()
      });

      return {
        get closed() {
          return isUnsubscribed;
        },
        unsubscribe: () => {
          isUnsubscribed = true;
          if (innerSub) innerSub.unsubscribe();
        }
      };
    });
  };
}

/**
 * Discards values that take place within `ms` milliseconds of another emission.
 */
export function debounceTimeObservable<T>(ms: number): OperatorFunction<T, T> {
  return (source: Observable<T>) => {
    return new Observable<T>((observer) => {
      let timeoutId: any = null;

      const sub = source.subscribe({
        next: (val) => {
          if (timeoutId) clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            observer.next(val);
          }, ms);
        },
        error: (err) => {
          if (timeoutId) clearTimeout(timeoutId);
          observer.error?.(err);
        },
        complete: () => {
          if (timeoutId) clearTimeout(timeoutId);
          observer.complete?.();
        }
      });

      return () => {
        if (timeoutId) clearTimeout(timeoutId);
        sub.unsubscribe();
      };
    });
  };
}
