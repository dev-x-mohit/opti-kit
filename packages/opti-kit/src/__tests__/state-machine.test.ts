import { describe, it, expect } from 'vitest';
import {
  createStateMachine, interpretMachine, guardTransition, withEntry, withExit,
  canMachineTransition, getValidEvents, isInState, matchesState, assertValidState,
  serializeMachine, restoreMachine, visualizeMachine, createToggleMachine,
  createAsyncMachine, createStepMachine, createRetryMachine, parallelStates,
} from '../state-machine';

describe('State Machine', () => {
  it('supports guards, entry/exit hooks, serialization, and visualization', () => {
    const def = createStateMachine<{ count: number }, { type: 'INC' } | { type: 'LOCK' }>({
      id: 'counter',
      initial: 'active',
      context: { count: 0 },
      states: {
        active: withExit(
          withEntry(
            {
              on: {
                INC: guardTransition('active', (c) => c.count < 2, (c) => ({ count: c.count + 1 })),
                LOCK: 'locked',
              },
            },
            (c) => c
          ),
          (c) => c
        ),
        locked: {},
      },
    });

    const m = interpretMachine(def);
    expect(isInState(m, 'active')).toBe(true);
    expect(canMachineTransition(m, 'INC')).toBe(true);
    expect(getValidEvents(m)).toEqual(['INC', 'LOCK']);

    m.send('INC');
    m.send('INC');
    expect(m.getContext().count).toBe(2);
    expect(canMachineTransition(m, 'INC')).toBe(false);

    const saved = serializeMachine(m);
    const restored = restoreMachine(def, saved);
    expect(restored.getContext().count).toBe(2);

    m.send('LOCK');
    expect(matchesState(m, ['locked', 'done'])).toBe(true);
    assertValidState(m, 'locked');
    expect(visualizeMachine(def)).toContain('stateDiagram-v2');
  });

  it('provides toggle, async, step, retry, and parallel helpers', () => {
    const toggle = createToggleMachine();
    toggle.send('TOGGLE');
    expect(toggle.getState()).toBe('on');

    const asyncM = createAsyncMachine<number, string>();
    asyncM.send({ type: 'FETCH' });
    asyncM.send({ type: 'RESOLVE', data: 123 });
    expect(asyncM.getState()).toBe('success');
    expect(asyncM.getContext().data).toBe(123);

    const steps = createStepMachine(['one', 'two', 'three']);
    steps.send('NEXT');
    expect(steps.getState()).toBe('two');
    steps.send('PREV');
    expect(steps.getState()).toBe('one');

    const retry = createRetryMachine(2);
    retry.send('START');
    retry.send('FAIL');
    expect(retry.getState()).toBe('retrying');
    retry.send('START');
    retry.send('FAIL');
    expect(retry.getState()).toBe('running'); // guard blocked because attempts == maxRetries

    const par = parallelStates({ a: createToggleMachine(), b: createToggleMachine('on') });
    expect(par.getStates()).toEqual({ a: 'off', b: 'on' });
    par.sendAll('TOGGLE');
    expect(par.getStates()).toEqual({ a: 'on', b: 'off' });
  });
});
