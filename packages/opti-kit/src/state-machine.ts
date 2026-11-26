/**
 * OptiKit State Machine — Typed finite state machines & statecharts with guards,
 * entry/exit hooks, context updates, history tracking, and Mermaid visualization.
 */

export type TransitionConfig<TContext, TEvent extends { type: string }> = {
  target: string;
  guard?: (context: TContext, event: TEvent) => boolean;
  action?: (context: TContext, event: TEvent) => TContext;
};

export type StateNodeConfig<TContext, TEvent extends { type: string }> = {
  on?: Record<string, string | TransitionConfig<TContext, TEvent>>;
  entry?: (context: TContext) => TContext | void;
  exit?: (context: TContext) => TContext | void;
};

export interface StateMachineDefinition<TContext, TEvent extends { type: string }> {
  id: string;
  initial: string;
  context: TContext;
  states: Record<string, StateNodeConfig<TContext, TEvent>>;
}

export interface MachineSnapshot<TContext> {
  value: string;
  context: TContext;
  history: string[];
}

export interface StateMachineInstance<TContext, TEvent extends { type: string }> {
  readonly id: string;
  getState(): string;
  getContext(): TContext;
  getSnapshot(): MachineSnapshot<TContext>;
  send(event: TEvent | TEvent['type']): MachineSnapshot<TContext>;
  can(eventType: TEvent['type']): boolean;
  getValidEvents(): string[];
  subscribe(listener: (snapshot: MachineSnapshot<TContext>) => void): () => void;
  reset(): void;
}

/** Creates a typed state machine definition. */
export function createStateMachine<TContext, TEvent extends { type: string } = { type: string }>(
  definition: StateMachineDefinition<TContext, TEvent>
): StateMachineDefinition<TContext, TEvent> {
  if (!definition.states[definition.initial]) {
    throw new Error(`Initial state "${definition.initial}" does not exist in machine "${definition.id}"`);
  }
  return definition;
}

/** Creates a guarded transition object. */
export function guardTransition<TContext, TEvent extends { type: string }>(
  target: string,
  guard: (context: TContext, event: TEvent) => boolean,
  action?: (context: TContext, event: TEvent) => TContext
): TransitionConfig<TContext, TEvent> {
  return { target, guard, action };
}

/** Attaches an entry hook to a state node config. */
export function withEntry<TContext, TEvent extends { type: string }>(
  node: StateNodeConfig<TContext, TEvent>,
  entry: (context: TContext) => TContext | void
): StateNodeConfig<TContext, TEvent> {
  return { ...node, entry };
}

/** Attaches an exit hook to a state node config. */
export function withExit<TContext, TEvent extends { type: string }>(
  node: StateNodeConfig<TContext, TEvent>,
  exit: (context: TContext) => TContext | void
): StateNodeConfig<TContext, TEvent> {
  return { ...node, exit };
}

/** Interprets and runs a state machine definition as a stateful instance. */
export function interpretMachine<TContext, TEvent extends { type: string } = { type: string }>(
  definition: StateMachineDefinition<TContext, TEvent>,
  initialSnapshot?: Partial<MachineSnapshot<TContext>>
): StateMachineInstance<TContext, TEvent> {
  let currentState = initialSnapshot?.value ?? definition.initial;
  let currentContext: TContext = initialSnapshot?.context ?? definition.context;
  const history: string[] = initialSnapshot?.history ? [...initialSnapshot.history] : [currentState];
  const listeners = new Set<(snapshot: MachineSnapshot<TContext>) => void>();

  const runEntry = (stateName: string, ctx: TContext): TContext => {
    const hook = definition.states[stateName]?.entry;
    if (!hook) return ctx;
    const res = hook(ctx);
    return res !== undefined ? res : ctx;
  };

  if (!initialSnapshot?.value) {
    currentContext = runEntry(currentState, currentContext);
  }

  const getSnapshot = (): MachineSnapshot<TContext> => ({
    value: currentState,
    context: currentContext,
    history: [...history],
  });

  const normalizeEvent = (ev: TEvent | TEvent['type']): TEvent =>
    typeof ev === 'string' ? ({ type: ev } as TEvent) : ev;

  const resolveTransition = (
    event: TEvent
  ): TransitionConfig<TContext, TEvent> | null => {
    const node = definition.states[currentState];
    const raw = node?.on?.[event.type];
    if (!raw) return null;
    const cfg: TransitionConfig<TContext, TEvent> =
      typeof raw === 'string' ? { target: raw } : raw;
    if (cfg.guard && !cfg.guard(currentContext, event)) return null;
    return cfg;
  };

  return {
    id: definition.id,
    getState: () => currentState,
    getContext: () => currentContext,
    getSnapshot,
    can(eventType: TEvent['type']): boolean {
      return resolveTransition({ type: eventType } as TEvent) !== null;
    },
    getValidEvents(): string[] {
      const node = definition.states[currentState];
      if (!node?.on) return [];
      return Object.keys(node.on).filter((type) =>
        resolveTransition({ type } as TEvent) !== null
      );
    },
    send(ev: TEvent | TEvent['type']): MachineSnapshot<TContext> {
      const event = normalizeEvent(ev);
      const cfg = resolveTransition(event);
      if (!cfg) return getSnapshot();

      const exitHook = definition.states[currentState]?.exit;
      if (exitHook) {
        const res = exitHook(currentContext);
        if (res !== undefined) currentContext = res;
      }

      if (cfg.action) {
        currentContext = cfg.action(currentContext, event);
      }

      currentState = cfg.target;
      history.push(currentState);
      currentContext = runEntry(currentState, currentContext);

      const snap = getSnapshot();
      for (const listener of listeners) listener(snap);
      return snap;
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    reset() {
      currentState = definition.initial;
      currentContext = runEntry(currentState, definition.context);
      history.length = 0;
      history.push(currentState);
      const snap = getSnapshot();
      for (const listener of listeners) listener(snap);
    },
  };
}

/** Checks if a machine can transition on the given event type. */
export function canMachineTransition<TContext, TEvent extends { type: string }>(
  instance: StateMachineInstance<TContext, TEvent>,
  eventType: TEvent['type']
): boolean {
  return instance.can(eventType);
}

/** Returns all currently valid event names for a machine instance. */
export function getValidEvents<TContext, TEvent extends { type: string }>(
  instance: StateMachineInstance<TContext, TEvent>
): string[] {
  return instance.getValidEvents();
}

/** Checks whether the machine is currently in the specified state. */
export function isInState<TContext, TEvent extends { type: string }>(
  instance: StateMachineInstance<TContext, TEvent>,
  state: string
): boolean {
  return instance.getState() === state;
}

/** Checks whether the machine's current state matches any of the given states. */
export function matchesState<TContext, TEvent extends { type: string }>(
  instance: StateMachineInstance<TContext, TEvent>,
  states: readonly string[]
): boolean {
  return states.includes(instance.getState());
}

/** Asserts that a machine is in an expected state, throwing if not. */
export function assertValidState<TContext, TEvent extends { type: string }>(
  instance: StateMachineInstance<TContext, TEvent>,
  expected: string
): void {
  const actual = instance.getState();
  if (actual !== expected) {
    throw new Error(`Expected machine "${instance.id}" to be in state "${expected}", got "${actual}"`);
  }
}

/** Serializes a machine snapshot to a JSON string. */
export function serializeMachine<TContext, TEvent extends { type: string }>(
  instance: StateMachineInstance<TContext, TEvent>
): string {
  return JSON.stringify(instance.getSnapshot());
}

/** Restores a machine instance from a serialized JSON snapshot. */
export function restoreMachine<TContext, TEvent extends { type: string }>(
  definition: StateMachineDefinition<TContext, TEvent>,
  serialized: string
): StateMachineInstance<TContext, TEvent> {
  const parsed = JSON.parse(serialized) as MachineSnapshot<TContext>;
  if (!definition.states[parsed.value]) {
    throw new Error(`Invalid serialized state "${parsed.value}" for machine "${definition.id}"`);
  }
  return interpretMachine(definition, parsed);
}

/** Generates a Mermaid `stateDiagram-v2` string from a machine definition. */
export function visualizeMachine<TContext, TEvent extends { type: string }>(
  definition: StateMachineDefinition<TContext, TEvent>
): string {
  const lines: string[] = ['stateDiagram-v2', `  [*] --> ${definition.initial}`];
  for (const [state, node] of Object.entries(definition.states)) {
    if (!node.on) continue;
    for (const [event, transition] of Object.entries(node.on)) {
      const target = typeof transition === 'string' ? transition : transition.target;
      lines.push(`  ${state} --> ${target}: ${event}`);
    }
  }
  return lines.join('\n');
}

/** Creates a simple two-state toggle machine (`off` <-> `on`). */
export function createToggleMachine(initial: 'on' | 'off' = 'off') {
  return interpretMachine(
    createStateMachine<{ count: number }, { type: 'TOGGLE' }>({
      id: 'toggle',
      initial,
      context: { count: 0 },
      states: {
        off: { on: { TOGGLE: { target: 'on', action: (c) => ({ count: c.count + 1 }) } } },
        on: { on: { TOGGLE: { target: 'off', action: (c) => ({ count: c.count + 1 }) } } },
      },
    })
  );
}

/** Creates a standard async request lifecycle machine (`idle` -> `loading` -> `success` | `error`). */
export function createAsyncMachine<TData = unknown, TError = string>() {
  type Ctx = { data?: TData; error?: TError };
  type Ev =
    | { type: 'FETCH' }
    | { type: 'RESOLVE'; data: TData }
    | { type: 'REJECT'; error: TError }
    | { type: 'RESET' };

  return interpretMachine(
    createStateMachine<Ctx, Ev>({
      id: 'async',
      initial: 'idle',
      context: {},
      states: {
        idle: { on: { FETCH: 'loading' } },
        loading: {
          on: {
            RESOLVE: { target: 'success', action: (_, e) => ({ data: e.type === 'RESOLVE' ? e.data : undefined }) },
            REJECT: { target: 'error', action: (_, e) => ({ error: e.type === 'REJECT' ? e.error : undefined }) },
          },
        },
        success: { on: { FETCH: 'loading', RESET: { target: 'idle', action: () => ({}) } } },
        error: { on: { FETCH: 'loading', RESET: { target: 'idle', action: () => ({}) } } },
      },
    })
  );
}

/** Creates a linear multi-step wizard machine with `NEXT`, `PREV`, and `RESET`. */
export function createStepMachine(steps: readonly string[]) {
  if (steps.length === 0) throw new Error('Step machine requires at least one step');
  const states: Record<string, StateNodeConfig<{ stepIndex: number }, { type: 'NEXT' | 'PREV' | 'RESET' }>> = {};
  steps.forEach((name, i) => {
    const on: Record<string, TransitionConfig<{ stepIndex: number }, { type: 'NEXT' | 'PREV' | 'RESET' }>> = {
      RESET: { target: steps[0], action: () => ({ stepIndex: 0 }) },
    };
    if (i < steps.length - 1) {
      on.NEXT = { target: steps[i + 1], action: () => ({ stepIndex: i + 1 }) };
    }
    if (i > 0) {
      on.PREV = { target: steps[i - 1], action: () => ({ stepIndex: i - 1 }) };
    }
    states[name] = { on };
  });
  return interpretMachine(
    createStateMachine({
      id: 'steps',
      initial: steps[0],
      context: { stepIndex: 0 },
      states,
    })
  );
}

/** Creates a retry-aware machine that tracks attempt count up to `maxRetries`. */
export function createRetryMachine(maxRetries = 3) {
  type Ctx = { attempts: number; maxRetries: number };
  type Ev = { type: 'START' } | { type: 'FAIL' } | { type: 'SUCCEED' } | { type: 'RESET' };
  return interpretMachine(
    createStateMachine<Ctx, Ev>({
      id: 'retry',
      initial: 'idle',
      context: { attempts: 0, maxRetries },
      states: {
        idle: { on: { START: { target: 'running', action: (c) => ({ ...c, attempts: 1 }) } } },
        running: {
          on: {
            SUCCEED: 'completed',
            FAIL: {
              target: 'retrying',
              guard: (c) => c.attempts < c.maxRetries,
            },
          },
        },
        retrying: {
          on: {
            START: { target: 'running', action: (c) => ({ ...c, attempts: c.attempts + 1 }) },
            FAIL: 'exhausted',
          },
        },
        completed: { on: { RESET: { target: 'idle', action: (c) => ({ ...c, attempts: 0 }) } } },
        exhausted: { on: { RESET: { target: 'idle', action: (c) => ({ ...c, attempts: 0 }) } } },
      },
    })
  );
}

/** Coordinates multiple independent state machine instances in parallel. */
export function parallelStates<T extends Record<string, StateMachineInstance<unknown, { type: string }>>>(
  machines: T
) {
  return {
    getStates(): { [K in keyof T]: string } {
      const result: Record<string, string> = {};
      for (const [k, m] of Object.entries(machines)) {
        result[k] = m.getState();
      }
      return result as { [K in keyof T]: string };
    },
    sendAll(event: { type: string } | string): void {
      for (const m of Object.values(machines)) {
        m.send(event);
      }
    },
    resetAll(): void {
      for (const m of Object.values(machines)) {
        m.reset();
      }
    },
  };
}
