import { describe, it, expect, vi } from 'vitest';
import {
  createReactiveStore, createAction, createReducer, createSlice, combineReducers,
  createSelector, createUndoableStore, applyMiddleware, loggerMiddleware,
  thunkMiddleware, persistMiddleware, bindActionCreators, createEntityAdapter,
  selectAllEntities, selectEntityById, upsertEntity, removeEntity,
  createEventSourcedStore, replayEvents, snapshotStore, subscribeSelector,
  batchDispatch, resetStore,
} from '../reactive-store';

describe('Reactive Store', () => {
  it('supports slices, combineReducers, selectors, middleware, and subscriptions', () => {
    const counterSlice = createSlice({
      name: 'counter',
      initialState: { value: 0 },
      reducers: {
        inc: (s) => ({ value: s.value + 1 }),
        add: (s, n: number) => ({ value: s.value + n }),
      },
    });
    const root = combineReducers({ counter: counterSlice.reducer });
    const logs: string[] = [];
    const saved: unknown[] = [];
    const store = createReactiveStore(
      root,
      { counter: { value: 0 } },
      applyMiddleware(
        loggerMiddleware((t) => logs.push(t)),
        thunkMiddleware(),
        persistMiddleware((s) => saved.push(s))
      )
    );

    const selectDouble = createSelector(
      (s: { counter: { value: number } }) => s.counter.value,
      (v) => v * 2
    );
    const spy = vi.fn();
    subscribeSelector(store, selectDouble, spy);

    const bound = bindActionCreators(counterSlice.actions, store.dispatch);
    bound.inc();
    batchDispatch(store, [counterSlice.actions.add(4), counterSlice.actions.inc()]);
    expect(selectDouble(store.getState())).toBe(12);
    expect(spy).toHaveBeenCalledTimes(3);
    expect(logs.length).toBe(3);
    expect(saved.length).toBe(3);
    expect(snapshotStore(store)).toEqual({ counter: { value: 6 } });

    const act = createAction<number>('SET');
    const customReducer = createReducer(0, { [act.type]: (_, a) => a.payload as number });
    expect(customReducer(0, act(42))).toBe(42);
    resetStore(store);
  });

  it('supports undoable store, entity adapter, and event sourcing', () => {
    const undoable = createUndoableStore(1);
    undoable.setState(2);
    undoable.setState(3);
    expect(undoable.canUndo()).toBe(true);
    undoable.undo();
    expect(undoable.getState()).toBe(2);
    undoable.redo();
    expect(undoable.getState()).toBe(3);

    const adapter = createEntityAdapter<{ id: number; name: string }>((u) => u.id);
    let st = adapter.getInitialState();
    st = upsertEntity(st, { id: 1, name: 'A' }, (u) => u.id);
    st = upsertEntity(st, { id: 2, name: 'B' }, (u) => u.id);
    expect(selectAllEntities(st).length).toBe(2);
    expect(selectEntityById(st, 1)?.name).toBe('A');
    st = removeEntity(st, 1);
    expect(selectAllEntities(st).length).toBe(1);

    const es = createEventSourcedStore<number, number>(0, (s, ev) => s + ev);
    es.append(5);
    es.append(10);
    expect(es.getState()).toBe(15);
    expect(replayEvents(0, es.getEvents(), (s, ev) => s + ev)).toBe(15);
  });
});
