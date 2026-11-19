/**
 * Store & State Management Module
 *
 * Provides reactive signals, derived computed states, automated effects,
 * and a Zustand-inspired lightweight publish/subscribe store.
 */

export { signal, computed, effect, batch, untrack, isSignal, type Signal, type ReadonlySignal } from './signals';

export interface Store<T> {
  getState: () => T;
  setState: (nextState: Partial<T> | ((state: T) => Partial<T>)) => void;
  subscribe: (listener: (state: T, prevState: T) => void) => () => void;
}

/**
 * Creates a lightweight state store using a publish-subscribe model (Zustand style).
 *
 * @example
 * ```ts
 * const store = createStore({ count: 0 });
 * store.setState({ count: 1 });
 * store.getState(); // → { count: 1 }
 * ```
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
