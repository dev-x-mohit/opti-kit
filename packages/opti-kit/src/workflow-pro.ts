/**
 * OptiKit Workflow Pro — Rule Engine, Feature Flags & Rollouts, Safe Expression Evaluator,
 * Filter Query Matcher, RBAC/ABAC Policy Enforcer, Decision Tables, Specifications, & Plugin Hooks.
 */

export interface WorkflowRule<TFact, TResult = string> {
  name: string;
  when: (fact: TFact) => boolean;
  then: (fact: TFact) => TResult;
  priority?: number;
}

/** Evaluates a single rule against a fact, returning `{ matched, result }`. */
export function evaluateRule<TFact, TResult>(
  rule: WorkflowRule<TFact, TResult>,
  fact: TFact
): { matched: boolean; result?: TResult } {
  if (!rule.when(fact)) return { matched: false };
  return { matched: true, result: rule.then(fact) };
}

/** Creates a prioritized Rule Engine supporting `evaluateAll` and `evaluateFirst`. */
export function createRuleEngine<TFact, TResult = string>(rules: readonly WorkflowRule<TFact, TResult>[]) {
  const sorted = [...rules].sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
  return {
    evaluateAll(fact: TFact): { name: string; result: TResult }[] {
      const hits: { name: string; result: TResult }[] = [];
      for (const r of sorted) {
        if (r.when(fact)) hits.push({ name: r.name, result: r.then(fact) });
      }
      return hits;
    },
    evaluateFirst(fact: TFact): { name: string; result: TResult } | null {
      for (const r of sorted) {
        if (r.when(fact)) return { name: r.name, result: r.then(fact) };
      }
      return null;
    },
  };
}

export interface FeatureFlagConfig {
  enabled: boolean;
  rolloutPercent?: number;
  allowUsers?: readonly string[];
}

/** Deterministically evaluates a percentage rollout (`0..100`) using FNV-1a hashing. */
export function evaluateRolloutPercent(key: string, percent: number): boolean {
  if (percent <= 0) return false;
  if (percent >= 100) return true;
  let h = 0x811c9dc5;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  const bucket = ((h >>> 0) % 10000) / 100;
  return bucket < percent;
}

/** Evaluates whether a feature flag is enabled for an optional `userId`. */
export function isFeatureEnabled(
  flag: FeatureFlagConfig | undefined,
  flagName: string,
  userId?: string
): boolean {
  if (!flag || !flag.enabled) return false;
  if (userId && flag.allowUsers?.includes(userId)) return true;
  if (flag.rolloutPercent !== undefined) {
    return evaluateRolloutPercent(`${flagName}:${userId ?? 'anon'}`, flag.rolloutPercent);
  }
  return true;
}

/** Creates a Feature Flag client from a flag configuration map. */
export function createFeatureFlagClient(initialFlags: Record<string, FeatureFlagConfig>) {
  const flags = { ...initialFlags };
  return {
    isEnabled: (name: string, userId?: string) => isFeatureEnabled(flags[name], name, userId),
    setFlag: (name: string, config: FeatureFlagConfig) => {
      flags[name] = config;
    },
    listFlags: () => ({ ...flags }),
  };
}

/** Safely evaluates a numeric/boolean arithmetic expression without `eval()`. */
export function evaluateExpression(
  expr: string,
  vars: Record<string, number> = {}
): number {
  const tokens = expr.match(/\d+(?:\.\d+)?|[A-Za-z_][A-Za-z0-9_]*|[()+\-*/%]/g) ?? [];
  let pos = 0;
  const peek = () => tokens[pos];
  const consume = () => tokens[pos++];

  const parseExpr = (): number => {
    let left = parseTerm();
    while (peek() === '+' || peek() === '-') {
      const op = consume();
      const right = parseTerm();
      left = op === '+' ? left + right : left - right;
    }
    return left;
  };
  const parseTerm = (): number => {
    let left = parseFactor();
    while (peek() === '*' || peek() === '/' || peek() === '%') {
      const op = consume();
      const right = parseFactor();
      if (op === '*') left *= right;
      else if (op === '/') left /= right;
      else left %= right;
    }
    return left;
  };
  const parseFactor = (): number => {
    const tok = peek();
    if (tok === '-') {
      consume();
      return -parseFactor();
    }
    if (tok === '(') {
      consume();
      const val = parseExpr();
      if (consume() !== ')') throw new Error('Expected closing parenthesis');
      return val;
    }
    consume();
    if (tok !== undefined && /^\d/.test(tok)) return Number(tok);
    if (tok !== undefined && tok in vars) return vars[tok];
    throw new Error(`Unexpected token "${tok}"`);
  };

  return parseExpr();
}

/** Creates a reusable Expression Evaluator bound to helper functions/constants. */
export function createExpressionEvaluator(defaults: Record<string, number> = {}) {
  return (expr: string, vars: Record<string, number> = {}) =>
    evaluateExpression(expr, { ...defaults, ...vars });
}

export type FilterClause = { field: string; op: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'in'; value: unknown };

/** Parses a simple `key=val` / `key>val` space-separated filter query into clauses. */
export function parseFilterQuery(query: string): FilterClause[] {
  const parts = query.trim().split(/\s+/).filter(Boolean);
  const clauses: FilterClause[] = [];
  for (const p of parts) {
    const m = /^([A-Za-z0-9_.]+)(>=|<=|!=|=|>|<)(.+)$/.exec(p);
    if (!m) continue;
    const opMap: Record<string, FilterClause['op']> = {
      '=': 'eq', '!=': 'ne', '>': 'gt', '>=': 'gte', '<': 'lt', '<=': 'lte',
    };
    const rawVal = m[3];
    const num = Number(rawVal);
    const value = rawVal !== '' && !Number.isNaN(num) ? num : rawVal;
    clauses.push({ field: m[1], op: opMap[m[2]], value });
  }
  return clauses;
}

/** Checks whether a record satisfies all filter clauses. */
export function matchesFilterQuery(
  record: Record<string, unknown>,
  clauses: readonly FilterClause[]
): boolean {
  for (const c of clauses) {
    const v = record[c.field];
    if (c.op === 'eq' && v !== c.value) return false;
    if (c.op === 'ne' && v === c.value) return false;
    if (c.op === 'gt' && !(Number(v) > Number(c.value))) return false;
    if (c.op === 'gte' && !(Number(v) >= Number(c.value))) return false;
    if (c.op === 'lt' && !(Number(v) < Number(c.value))) return false;
    if (c.op === 'lte' && !(Number(v) <= Number(c.value))) return false;
    if (c.op === 'in' && (!Array.isArray(c.value) || !c.value.includes(v))) return false;
  }
  return true;
}

export interface PolicyRule {
  role: string;
  action: string;
  resource: string;
  effect: 'allow' | 'deny';
}

/** Checks RBAC permission against a list of policy rules (explicit `deny` overrides `allow`). */
export function checkPermission(
  policies: readonly PolicyRule[],
  role: string,
  action: string,
  resource: string
): boolean {
  let allowed = false;
  for (const p of policies) {
    const roleMatch = p.role === '*' || p.role === role;
    const actMatch = p.action === '*' || p.action === action;
    const resMatch = p.resource === '*' || p.resource === resource;
    if (roleMatch && actMatch && resMatch) {
      if (p.effect === 'deny') return false;
      if (p.effect === 'allow') allowed = true;
    }
  }
  return allowed;
}

/** Creates an RBAC Policy Enforcer instance. */
export function createPolicyEnforcer(initialPolicies: readonly PolicyRule[] = []) {
  const policies = [...initialPolicies];
  return {
    addPolicy: (rule: PolicyRule) => policies.push(rule),
    can: (role: string, action: string, resource: string) =>
      checkPermission(policies, role, action, resource),
  };
}

/** Evaluates a DMN-style Decision Table and returns matching row outputs. */
export function evaluateDecisionTable<TInput extends Record<string, unknown>, TOutput>(
  rows: readonly { when: Partial<{ [K in keyof TInput]: TInput[K] | ((v: TInput[K]) => boolean) }>; output: TOutput }[],
  input: TInput
): TOutput | undefined {
  for (const row of rows) {
    let match = true;
    for (const [k, cond] of Object.entries(row.when)) {
      const actual = input[k];
      if (typeof cond === 'function') {
        if (!(cond as (v: unknown) => boolean)(actual)) { match = false; break; }
      } else if (actual !== cond) {
        match = false;
        break;
      }
    }
    if (match) return row.output;
  }
  return undefined;
}

/** Creates a reusable Decision Table evaluator. */
export function createDecisionTable<TInput extends Record<string, unknown>, TOutput>(
  rows: readonly { when: Partial<{ [K in keyof TInput]: TInput[K] | ((v: TInput[K]) => boolean) }>; output: TOutput }[]
) {
  return (input: TInput) => evaluateDecisionTable(rows, input);
}

export type Specification<T> = (candidate: T) => boolean;

/** Creates a Specification predicate. */
export function createSpecBuilder<T>(predicate: Specification<T>): Specification<T> {
  return predicate;
}

/** Combines specifications with logical AND. */
export function andSpec<T>(...specs: Specification<T>[]): Specification<T> {
  return (c) => specs.every((s) => s(c));
}

/** Combines specifications with logical OR. */
export function orSpec<T>(...specs: Specification<T>[]): Specification<T> {
  return (c) => specs.some((s) => s(c));
}

/** Negates a specification with logical NOT. */
export function notSpec<T>(spec: Specification<T>): Specification<T> {
  return (c) => !spec(c);
}

export type AsyncMiddleware<TContext> = (
  ctx: TContext,
  next: () => Promise<void>
) => Promise<void>;

/** Composes Koa-style async middleware functions into a single runner. */
export function composeAsyncMiddleware<TContext>(
  middlewares: readonly AsyncMiddleware<TContext>[]
): (ctx: TContext) => Promise<void> {
  return async (ctx: TContext) => {
    let index = -1;
    const dispatch = async (i: number): Promise<void> => {
      if (i <= index) throw new Error('next() called multiple times');
      index = i;
      const fn = middlewares[i];
      if (fn) await fn(ctx, () => dispatch(i + 1));
    };
    await dispatch(0);
  };
}

/** Creates a mutable async middleware chain. */
export function createMiddlewareChain<TContext>() {
  const list: AsyncMiddleware<TContext>[] = [];
  return {
    use(mw: AsyncMiddleware<TContext>) {
      list.push(mw);
      return this;
    },
    run(ctx: TContext) {
      return composeAsyncMiddleware(list)(ctx);
    },
  };
}

export interface PluginDefinition<THooks extends Record<string, (...args: never[]) => unknown>> {
  name: string;
  hooks: Partial<THooks>;
}

/** Creates a typed Plugin Registry with hook execution. */
export function createPluginRegistry<THooks extends Record<string, (...args: never[]) => unknown>>() {
  const plugins = new Map<string, PluginDefinition<THooks>>();
  return {
    register: (plugin: PluginDefinition<THooks>) => registerPlugin(plugins, plugin),
    execute: <K extends keyof THooks>(hookName: K, ...args: Parameters<THooks[K]>) =>
      executePluginHook(plugins, hookName, ...args),
    list: () => Array.from(plugins.keys()),
  };
}

/** Registers a plugin into a plugin map. */
export function registerPlugin<THooks extends Record<string, (...args: never[]) => unknown>>(
  registry: Map<string, PluginDefinition<THooks>>,
  plugin: PluginDefinition<THooks>
): void {
  registry.set(plugin.name, plugin);
}

/** Executes a named hook across all registered plugins, collecting return values. */
export function executePluginHook<
  THooks extends Record<string, (...args: never[]) => unknown>,
  K extends keyof THooks
>(
  registry: Map<string, PluginDefinition<THooks>>,
  hookName: K,
  ...args: Parameters<THooks[K]>
): ReturnType<THooks[K]>[] {
  const results: ReturnType<THooks[K]>[] = [];
  for (const plugin of registry.values()) {
    const fn = plugin.hooks[hookName];
    if (fn) results.push(fn(...args) as ReturnType<THooks[K]>);
  }
  return results;
}

