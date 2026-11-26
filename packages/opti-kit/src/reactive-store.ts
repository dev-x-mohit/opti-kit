/**
 * OptiKit Reactive Store — Redux/Zustand-style immutable state management with slices,
 * memoized selectors, middleware, undo/redo history, entity adapters, and event sourcing.
 */

export type StoreAction<T = unknown> = { type: string; payload?: T };
export type Reducer<S, A extends StoreAction = StoreAction> = (state: S, action: A) => S;
export type Middleware<S> = (api: { getState: () => S; dispatch: (a: StoreAction) => void }) =>
  (next: (a: StoreAction) => void) => (action: StoreAction) => void;

export interface ReactiveStore<S, A extends StoreAction = StoreAction> {
  getState(): S;
  dispatch(action: A): A;
  subscribe(listener: (state: S) => void): () => void;
  replaceReducer(nextReducer: Reducer<S, A>): void;
}

/** Creates a Redux-style reactive store with optional middleware enhancer. */
export function createReactiveStore<S, A extends StoreAction = StoreAction>(
  reducer: Reducer<S, A>,
  initialState: S,
  middlewares: readonly Middleware<S>[] = []
): ReactiveStore<S, A> {
  let currentReducer = reducer;
  let state = initialState;
  const listeners = new Set<(state: S) => void>();

  const baseDispatch = (action: A): A => {
    state = currentReducer(state, action);
    for (const l of listeners) l(state);
    return action;
  };

  let dispatchFn: (action: StoreAction) => void = baseDispatch as unknown as (a: StoreAction) => void;
  if (middlewares.length > 0) {
    const api = { getState: () => state, dispatch: (a: StoreAction) => dispatchFn(a) };
    const chain = middlewares.map((mw) => mw(api));
    dispatchFn = chain.reduceRight<(a: StoreAction) => void>(
      (next, mw) => mw(next),
      baseDispatch as unknown as (a: StoreAction) => void
    );
  }

  return {
    getState: () => state,
    dispatch(action: A): A {
      dispatchFn(action);
      return action;
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    replaceReducer(nextReducer) {
      currentReducer = nextReducer;
    },
  };
}

/** Creates a typed action creator function. */
export function createAction<T = void>(type: string) {
  const creator = (payload: T): { type: string; payload: T } => ({ type, payload });
  creator.type = type;
  return creator;
}

/** Creates a reducer from a handler map `{ [actionType]: (state, action) => nextState }`. */
export function createReducer<S>(
  initialState: S,
  handlers: Record<string, (state: S, action: StoreAction<unknown>) => S>
): Reducer<S> {
  return (state = initialState, action) => {
    const handler = handlers[action.type];
    return handler ? handler(state, action) : state;
  };
}

/** Creates a slice with scoped action creators and a combined reducer. */
export function createSlice<S, R extends Record<string, (state: S, payload: never) => S>>(options: {
  name: string;
  initialState: S;
  reducers: R;
}) {
  const actions: Record<string, (payload?: unknown) => StoreAction> = {};
  const handlers: Record<string, (state: S, action: StoreAction<unknown>) => S> = {};
  for (const [key, fn] of Object.entries(options.reducers)) {
    const type = `${options.name}/${key}`;
    actions[key] = (payload?: unknown) => ({ type, payload });
    handlers[type] = (state, action) => fn(state, action.payload as never);
  }
  return {
    name: options.name,
    reducer: createReducer(options.initialState, handlers),
    actions: actions as { [K in keyof R]: (payload?: Parameters<R[K]>[1]) => StoreAction },
  };
}

/** Combines a map of slice reducers into a single root reducer. */
export function combineReducers<S extends Record<string, unknown>>(
  reducers: { [K in keyof S]: Reducer<S[K]> }
): Reducer<S> {
  const keys = Object.keys(reducers) as (keyof S)[];
  return (state = {} as S, action) => {
    let changed = false;
    const next = {} as S;
    for (const k of keys) {
      const prevSlice = state[k];
      const nextSlice = reducers[k](prevSlice, action);
      next[k] = nextSlice;
      if (nextSlice !== prevSlice) changed = true;
    }
    return changed ? next : state;
  };
}

/** Creates a memoized Reselect-style derived state selector. */
export function createSelector<S, R1, Out>(
  s1: (state: S) => R1,
  combiner: (r1: R1) => Out
): (state: S) => Out;
export function createSelector<S, R1, R2, Out>(
  s1: (state: S) => R1,
  s2: (state: S) => R2,
  combiner: (r1: R1, r2: R2) => Out
): (state: S) => Out;
export function createSelector<S, Out>(
  ...args: [...((state: S) => unknown)[], (...results: unknown[]) => Out]
): (state: S) => Out {
  const combiner = args[args.length - 1] as (...r: unknown[]) => Out;
  const selectors = args.slice(0, -1) as ((state: S) => unknown)[];
  let lastInputs: unknown[] | null = null;
  let lastResult: Out;
  return (state: S) => {
    const inputs = selectors.map((s) => s(state));
    if (lastInputs && inputs.every((v, i) => v === lastInputs![i])) {
      return lastResult;
    }
    lastInputs = inputs;
    lastResult = combiner(...inputs);
    return lastResult;
  };
}

/** Wraps a store with undo/redo history stacks. */
export function createUndoableStore<S>(initialState: S, maxHistory = 50) {
  let past: S[] = [];
  let present = initialState;
  let future: S[] = [];
  return {
    getState: () => present,
    setState(next: S) {
      past.push(present);
      if (past.length > maxHistory) past.shift();
      present = next;
      future = [];
    },
    undo(): boolean {
      if (past.length === 0) return false;
      future.unshift(present);
      present = past.pop()!;
      return true;
    },
    redo(): boolean {
      if (future.length === 0) return false;
      past.push(present);
      present = future.shift()!;
      return true;
    },
    canUndo: () => past.length > 0,
    canRedo: () => future.length > 0,
  };
}

/** Applies middleware functions to a store's dispatch (standalone helper). */
export function applyMiddleware<S>(...middlewares: Middleware<S>[]): Middleware<S>[] {
  return middlewares;
}

/** Creates a logging middleware that records dispatched actions to a callback. */
export function loggerMiddleware<S>(log: (msg: string, action: StoreAction) => void): Middleware<S> {
  return () => (next) => (action) => {
    log(action.type, action);
    next(action);
  };
}

/** Creates a thunk middleware supporting function actions `(dispatch, getState) => void`. */
export function thunkMiddleware<S>(): Middleware<S> {
  return (api) => (next) => (action) => {
    if (typeof action === 'function') {
      (action as (d: typeof api.dispatch, g: typeof api.getState) => void)(api.dispatch, api.getState);
      return;
    }
    next(action);
  };
}

/** Creates a persistence middleware that saves state on every action. */
export function persistMiddleware<S>(save: (state: S) => void): Middleware<S> {
  return (api) => (next) => (action) => {
    next(action);
    save(api.getState());
  };
}

/** Binds an object of action creators directly to a store's `dispatch`. */
export function bindActionCreators<
  T extends Record<string, (...args: never[]) => StoreAction>
>(creators: T, dispatch: (action: StoreAction) => void): T {
  const bound = {} as Record<string, (...args: never[]) => StoreAction>;
  for (const [k, fn] of Object.entries(creators)) {
    bound[k] = (...args: never[]) => {
      const action = fn(...args);
      dispatch(action);
      return action;
    };
  }
  return bound as T;
}

export interface EntityState<T> {
  ids: (string | number)[];
  entities: Record<string | number, T>;
}

/** Creates a normalized entity adapter (`{ ids, entities }`). */
export function createEntityAdapter<T>(selectId: (entity: T) => string | number) {
  const getInitialState = (): EntityState<T> => ({ ids: [], entities: {} });
  return {
    getInitialState,
    selectAll: (state: EntityState<T>) => selectAllEntities(state),
    selectById: (state: EntityState<T>, id: string | number) => selectEntityById(state, id),
    upsertOne: (state: EntityState<T>, entity: T) => upsertEntity(state, entity, selectId),
    removeOne: (state: EntityState<T>, id: string | number) => removeEntity(state, id),
  };
}

/** Selects all entities in insertion order from an EntityState. */
export function selectAllEntities<T>(state: EntityState<T>): T[] {
  return state.ids.map((id) => state.entities[id]);
}

/** Selects a single entity by ID from an EntityState. */
export function selectEntityById<T>(state: EntityState<T>, id: string | number): T | undefined {
  return state.entities[id];
}

/** Immutably inserts or updates an entity in an EntityState. */
export function upsertEntity<T>(
  state: EntityState<T>,
  entity: T,
  selectId: (entity: T) => string | number
): EntityState<T> {
  const id = selectId(entity);
  const exists = id in state.entities;
  return {
    ids: exists ? state.ids : [...state.ids, id],
    entities: { ...state.entities, [id]: entity },
  };
}

/** Immutably removes an entity by ID from an EntityState. */
export function removeEntity<T>(state: EntityState<T>, id: string | number): EntityState<T> {
  if (!(id in state.entities)) return state;
  const nextEntities = { ...state.entities };
  delete nextEntities[id];
  return {
    ids: state.ids.filter((x) => x !== id),
    entities: nextEntities,
  };
}

/** Creates an event-sourced store that appends events and derives state via projection. */
export function createEventSourcedStore<S, E>(
  initialState: S,
  applyEvent: (state: S, event: E) => S
) {
  const events: E[] = [];
  let state = initialState;
  return {
    append(event: E): S {
      events.push(event);
      state = applyEvent(state, event);
      return state;
    },
    getState: () => state,
    getEvents: () => [...events],
    replay: () => replayEvents(initialState, events, applyEvent),
  };
}

/** Replays a sequence of domain events from an initial state. */
export function replayEvents<S, E>(
  initialState: S,
  events: readonly E[],
  applyEvent: (state: S, event: E) => S
): S {
  let state = initialState;
  for (const ev of events) state = applyEvent(state, ev);
  return state;
}

/** Takes a JSON-cloned snapshot of a store's current state. */
export function snapshotStore<S>(store: { getState(): S }): S {
  return JSON.parse(JSON.stringify(store.getState())) as S;
}

/** Subscribes to a derived selector and only invokes `onChange` when the selected slice changes. */
export function subscribeSelector<S, T>(
  store: ReactiveStore<S>,
  selector: (state: S) => T,
  onChange: (value: T, prev: T) => void
): () => void {
  let prev = selector(store.getState());
  return store.subscribe((state) => {
    const next = selector(state);
    if (!Object.is(prev, next)) {
      const old = prev;
      prev = next;
      onChange(next, old);
    }
  });
}

/** Dispatches multiple actions sequentially on a store. */
export function batchDispatch<S, A extends StoreAction>(
  store: ReactiveStore<S, A>,
  actions: readonly A[]
): void {
  for (const a of actions) store.dispatch(a);
}

/** Dispatches a standard `@@RESET` action on a store. */
export function resetStore<S>(store: ReactiveStore<S>): void {
  store.dispatch({ type: '@@RESET' });
}
