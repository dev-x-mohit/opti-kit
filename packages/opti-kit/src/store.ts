type Listener = () => void;
const context: Listener[] = [];

export interface Signal<T> {
  value: T;
  subscribe: (fn: (val: T) => void) => () => void;
}

export interface Computed<T> {
  readonly value: T;
  subscribe: (fn: (val: T) => void) => () => void;
}

export interface Store<T> {
  getState: () => T;
  setState: (nextState: Partial<T> | ((state: T) => Partial<T>)) => void;
  subscribe: (listener: (state: T, prevState: T) => void) => () => void;
}

/**
 * Creates a reactive signal primitive that tracks dependencies and propagates changes.
 */
export function signal<T>(initialValue: T): Signal<T> {
  let value = initialValue;
  const subscribers = new Set<(val: T) => void>();
  const deps = new Set<Listener>();

  return {
    get value() {
      const running = context[context.length - 1];
      if (running) {
        deps.add(running);
      }
      return value;
    },
    set value(newValue) {
      if (value !== newValue) {
        value = newValue;
        for (const sub of subscribers) {
          sub(value);
        }
        for (const dep of deps) {
          dep();
        }
      }
    },
    subscribe(fn) {
      subscribers.add(fn);
      fn(value);
      return () => subscribers.delete(fn);
    },
  };
}

/**
 * Creates a derived reactive computation that caches values and updates automatically when dependencies change.
 */
export function computed<T>(fn: () => T): Computed<T> {
  const subscribers = new Set<(val: T) => void>();
  let cachedValue: T;
  let dirty = true;

  const runner = () => {
    dirty = true;
    const newValue = getVal();
    for (const sub of subscribers) {
      sub(newValue);
    }
  };

  function getVal() {
    if (dirty) {
      context.push(runner);
      try {
        cachedValue = fn();
        dirty = false;
      } finally {
        context.pop();
      }
    }
    return cachedValue;
  }

  return {
    get value() {
      const running = context[context.length - 1];
      if (running !== undefined) {
        // Add dependency to the running context (if any)
      }
      return getVal();
    },
    subscribe(fn) {
      subscribers.add(fn);
      fn(getVal());
      return () => subscribers.delete(fn);
    },
  };
}

/**
 * Runs a side-effect function that automatically re-runs whenever any read signal changes.
 */
export function effect(fn: () => void): () => void {
  const runner = () => {
    context.push(runner);
    try {
      fn();
    } finally {
      context.pop();
    }
  };

  runner();

  return () => {
    // Teardown can be handled here in an advanced implementation
  };
}

/**
 * Creates a lightweight state store using a publish-subscribe model (Zustand style).
 */
export function createStore<T extends Record<string, any>>(initialState: T): Store<T> {
  let state = { ...initialState };
  const listeners = new Set<(state: T, prevState: T) => void>();

  return {
    getState: () => state,
    setState: (nextState) => {
      const prevState = state;
      const updates =
        typeof nextState === "function" ? nextState(state) : nextState;
      state = { ...state, ...updates };
      for (const listener of listeners) {
        listener(state, prevState);
      }
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}
