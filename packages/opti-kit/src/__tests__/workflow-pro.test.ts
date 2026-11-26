import { describe, it, expect } from 'vitest';
import {
  createRuleEngine, evaluateRule, createFeatureFlagClient, isFeatureEnabled,
  evaluateRolloutPercent, createExpressionEvaluator, evaluateExpression,
  parseFilterQuery, matchesFilterQuery, createPolicyEnforcer, checkPermission,
  createDecisionTable, evaluateDecisionTable, createSpecBuilder, andSpec,
  orSpec, notSpec, createMiddlewareChain, composeAsyncMiddleware,
  createPluginRegistry, registerPlugin, executePluginHook,
} from '../workflow-pro';

describe('Workflow Pro', () => {
  it('supports rule engine, feature flags, expressions, and filter queries', () => {
    const r1 = { name: 'vip', priority: 10, when: (u: { spend: number }) => u.spend > 100, then: () => 'gold' };
    expect(evaluateRule(r1, { spend: 150 })).toEqual({ matched: true, result: 'gold' });
    const engine = createRuleEngine([r1]);
    expect(engine.evaluateFirst({ spend: 150 })?.result).toBe('gold');
    expect(engine.evaluateAll({ spend: 50 })).toEqual([]);

    expect(evaluateRolloutPercent('user-1', 100)).toBe(true);
    expect(evaluateRolloutPercent('user-1', 0)).toBe(false);
    expect(isFeatureEnabled({ enabled: true, allowUsers: ['u1'] }, 'beta', 'u1')).toBe(true);
    const ff = createFeatureFlagClient({ darkMode: { enabled: true } });
    expect(ff.isEnabled('darkMode')).toBe(true);

    expect(evaluateExpression('2 + 3 * (4 - 1)')).toBe(11);
    const evalWithDefaults = createExpressionEvaluator({ tax: 0.1 });
    expect(evalWithDefaults('price * (1 + tax)', { price: 100 })).toBeCloseTo(110, 5);

    const clauses = parseFilterQuery('age>=18 role=admin');
    expect(matchesFilterQuery({ age: 25, role: 'admin' }, clauses)).toBe(true);
    expect(matchesFilterQuery({ age: 15, role: 'admin' }, clauses)).toBe(false);
  });

  it('supports RBAC policies, decision tables, specifications, middleware, and plugins', async () => {
    const enforcer = createPolicyEnforcer([
      { role: 'editor', action: 'write', resource: 'post', effect: 'allow' },
      { role: 'editor', action: 'delete', resource: 'post', effect: 'deny' },
    ]);
    expect(enforcer.can('editor', 'write', 'post')).toBe(true);
    expect(checkPermission([{ role: '*', action: '*', resource: '*', effect: 'deny' }], 'admin', 'read', 'db')).toBe(false);

    const dt = createDecisionTable<{ age: number; member: boolean }, number>([
      { when: { age: (a) => a >= 65 }, output: 20 },
      { when: { member: true }, output: 10 },
    ]);
    expect(dt({ age: 70, member: false })).toBe(20);
    expect(evaluateDecisionTable([{ when: { member: true }, output: 'yes' }], { member: true })).toBe('yes');

    const isEven = createSpecBuilder<number>((n) => n % 2 === 0);
    const isPos = createSpecBuilder<number>((n) => n > 0);
    expect(andSpec(isEven, isPos)(4)).toBe(true);
    expect(orSpec(isEven, isPos)(3)).toBe(true);
    expect(notSpec(isEven)(3)).toBe(true);

    const chain = createMiddlewareChain<{ log: string[] }>();
    chain.use(async (ctx, next) => {
      ctx.log.push('before');
      await next();
      ctx.log.push('after');
    });
    const ctx = { log: [] as string[] };
    await chain.run(ctx);
    expect(ctx.log).toEqual(['before', 'after']);
    await composeAsyncMiddleware([])(ctx);

    const reg = createPluginRegistry<{ onInit: (v: number) => number }>();
    reg.register({ name: 'p1', hooks: { onInit: (v) => v + 1 } });
    expect(reg.execute('onInit', 10)).toEqual([11]);
    const map = new Map();
    registerPlugin(map, { name: 'p2', hooks: { onInit: (v: number) => v * 2 } });
    expect(executePluginHook(map, 'onInit', 5)).toEqual([10]);
  });
});
