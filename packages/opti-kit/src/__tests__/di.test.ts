import { describe, it, expect, vi } from 'vitest';
import {
  createContainer, createToken, singleton, transient, scoped, valueBinding,
  factoryBinding, aliasBinding, resolve, resolveOptional, resolveAll,
  hasBinding, overrideBinding, createScope, disposeContainer, lazyResolve,
  injectable, getDependencyGraph, validateContainer, clearContainer,
} from '../di';

describe('Dependency Injection Container', () => {
  it('resolves singleton, transient, value, factory, and alias bindings', () => {
    const CFG = createToken<{ port: number }>('Config');
    const COUNTER = createToken<{ n: number }>('Counter');
    const RAND = createToken<number>('Rand');
    const ALIAS = createToken<{ port: number }>('AliasCfg');

    let count = 0;
    const c = createContainer()
      .register(valueBinding(CFG, { port: 8080 }))
      .register(singleton(COUNTER, () => ({ n: ++count })))
      .register(transient(RAND, () => Math.random()))
      .register(aliasBinding(ALIAS, CFG));

    expect(hasBinding(c, CFG)).toBe(true);
    expect(resolve(c, ALIAS).port).toBe(8080);
    expect(resolve(c, COUNTER)).toBe(resolve(c, COUNTER));
    expect(resolve(c, RAND)).not.toBe(resolve(c, RAND));
    expect(resolveOptional(c, createToken<string>('Missing'))).toBeUndefined();
    expect(resolveAll(c, [CFG, ALIAS]).length).toBe(2);

    const lazy = lazyResolve(c, CFG);
    expect(lazy().port).toBe(8080);
  });

  it('supports scopes, disposal, overrides, injectable, and validation', () => {
    const DEP = createToken<string>('Dep');
    const SVC = createToken<{ dep: string }>('Svc');
    const SCOPED = createToken<{ id: number }>('Scoped');
    const disposeSpy = vi.fn();

    class Service {
      constructor(public dep: string) {}
    }

    let sid = 0;
    const root = createContainer()
      .register(valueBinding(DEP, 'hello'))
      .register(singleton(SVC, injectable(Service, [DEP]), [DEP]))
      .register(scoped(SCOPED, () => ({ id: ++sid }), [], disposeSpy));

    expect(validateContainer(root).valid).toBe(true);
    expect(getDependencyGraph(root).Svc).toEqual(['Dep']);
    expect(resolve(root, SVC).dep).toBe('hello');

    const s1 = createScope(root);
    const s2 = createScope(root);
    expect(resolve(s1, SCOPED)).toBe(resolve(s1, SCOPED));
    expect(resolve(s1, SCOPED)).not.toBe(resolve(s2, SCOPED));

    overrideBinding(root, factoryBinding(DEP, () => 'world'));
    expect(resolve(root, DEP)).toBe('world');

    disposeContainer(s1);
    expect(disposeSpy).toHaveBeenCalledTimes(1);
    clearContainer(root);
    expect(hasBinding(root, DEP)).toBe(false);
  });

  it('detects circular dependencies', () => {
    const A = createToken<unknown>('A');
    const B = createToken<unknown>('B');
    const c = createContainer()
      .register(transient(A, (cnt) => cnt.resolve(B)))
      .register(transient(B, (cnt) => cnt.resolve(A)));

    expect(() => resolve(c, A)).toThrow(/Circular dependency/);
  });
});
