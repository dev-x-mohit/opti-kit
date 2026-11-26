/**
 * OptiKit DI — Zero-dependency Inversion of Control (IoC) & Dependency Injection container
 * with typed tokens, singleton/transient/scoped lifetimes, circular dependency detection, and scopes.
 */

export type Lifetime = 'singleton' | 'transient' | 'scoped';

export interface InjectionToken<T> {
  readonly id: symbol;
  readonly name: string;
  readonly _type?: T;
}

export interface BindingRecord<T = unknown> {
  token: InjectionToken<T>;
  lifetime: Lifetime;
  factory: (container: DIContainer) => T;
  dependencies?: readonly InjectionToken<unknown>[];
  dispose?: (instance: T) => void;
}

export interface DIContainer {
  register<T>(binding: BindingRecord<T>): DIContainer;
  resolve<T>(token: InjectionToken<T>): T;
  resolveOptional<T>(token: InjectionToken<T>): T | undefined;
  resolveAll<T>(tokens: readonly InjectionToken<T>[]): T[];
  has<T>(token: InjectionToken<T>): boolean;
  override<T>(binding: BindingRecord<T>): DIContainer;
  createScope(): DIContainer;
  dispose(): void;
  clear(): void;
  getGraph(): Record<string, string[]>;
}

/** Creates a strongly-typed injection token. */
export function createToken<T>(name: string): InjectionToken<T> {
  return { id: Symbol(name), name };
}

/** Creates a singleton binding (one shared instance per root container). */
export function singleton<T>(
  token: InjectionToken<T>,
  factory: (container: DIContainer) => T,
  dependencies?: readonly InjectionToken<unknown>[],
  dispose?: (instance: T) => void
): BindingRecord<T> {
  return { token, lifetime: 'singleton', factory, dependencies, dispose };
}

/** Creates a transient binding (new instance on every resolve). */
export function transient<T>(
  token: InjectionToken<T>,
  factory: (container: DIContainer) => T,
  dependencies?: readonly InjectionToken<unknown>[]
): BindingRecord<T> {
  return { token, lifetime: 'transient', factory, dependencies };
}

/** Creates a scoped binding (one instance per scope/child container). */
export function scoped<T>(
  token: InjectionToken<T>,
  factory: (container: DIContainer) => T,
  dependencies?: readonly InjectionToken<unknown>[],
  dispose?: (instance: T) => void
): BindingRecord<T> {
  return { token, lifetime: 'scoped', factory, dependencies, dispose };
}

/** Creates a constant value binding. */
export function valueBinding<T>(token: InjectionToken<T>, value: T): BindingRecord<T> {
  return { token, lifetime: 'singleton', factory: () => value };
}

/** Creates a factory binding (alias for transient factory). */
export function factoryBinding<T>(
  token: InjectionToken<T>,
  factory: (container: DIContainer) => T
): BindingRecord<T> {
  return transient(token, factory);
}

/** Creates an alias binding that delegates resolution to another token. */
export function aliasBinding<T>(
  token: InjectionToken<T>,
  targetToken: InjectionToken<T>
): BindingRecord<T> {
  return {
    token,
    lifetime: 'transient',
    factory: (c) => c.resolve(targetToken),
    dependencies: [targetToken],
  };
}

/** Creates a new IoC DI container. */
export function createContainer(parent?: DIContainer, parentBindings?: Map<symbol, BindingRecord<unknown>>): DIContainer {
  const bindings = new Map<symbol, BindingRecord<unknown>>(parentBindings);
  const singletons = new Map<symbol, unknown>();
  const scopedInstances = new Map<symbol, unknown>();
  const resolvingStack = new Set<symbol>();

  const container: DIContainer = {
    register<T>(binding: BindingRecord<T>): DIContainer {
      bindings.set(binding.token.id, binding as BindingRecord<unknown>);
      return container;
    },

    override<T>(binding: BindingRecord<T>): DIContainer {
      singletons.delete(binding.token.id);
      scopedInstances.delete(binding.token.id);
      bindings.set(binding.token.id, binding as BindingRecord<unknown>);
      return container;
    },

    has<T>(token: InjectionToken<T>): boolean {
      return bindings.has(token.id) || (parent ? parent.has(token) : false);
    },

    resolve<T>(token: InjectionToken<T>): T {
      const record = bindings.get(token.id) as BindingRecord<T> | undefined;
      if (!record) {
        if (parent) return parent.resolve(token);
        throw new Error(`No binding registered for token "${token.name}"`);
      }

      if (resolvingStack.has(token.id)) {
        throw new Error(`Circular dependency detected while resolving "${token.name}"`);
      }

      if (record.lifetime === 'singleton') {
        if (parent && !bindings.has(token.id)) {
          return parent.resolve(token);
        }
        if (singletons.has(token.id)) {
          return singletons.get(token.id) as T;
        }
      }

      if (record.lifetime === 'scoped' && scopedInstances.has(token.id)) {
        return scopedInstances.get(token.id) as T;
      }

      resolvingStack.add(token.id);
      try {
        const instance = record.factory(container);
        if (record.lifetime === 'singleton') {
          singletons.set(token.id, instance);
        } else if (record.lifetime === 'scoped') {
          scopedInstances.set(token.id, instance);
        }
        return instance;
      } finally {
        resolvingStack.delete(token.id);
      }
    },

    resolveOptional<T>(token: InjectionToken<T>): T | undefined {
      return container.has(token) ? container.resolve(token) : undefined;
    },

    resolveAll<T>(tokens: readonly InjectionToken<T>[]): T[] {
      return tokens.map((t) => container.resolve(t));
    },

    createScope(): DIContainer {
      return createContainer(container, bindings);
    },

    dispose(): void {
      for (const [id, instance] of scopedInstances.entries()) {
        bindings.get(id)?.dispose?.(instance);
      }
      for (const [id, instance] of singletons.entries()) {
        bindings.get(id)?.dispose?.(instance);
      }
      scopedInstances.clear();
      singletons.clear();
    },

    clear(): void {
      container.dispose();
      bindings.clear();
    },

    getGraph(): Record<string, string[]> {
      const graph: Record<string, string[]> = {};
      for (const record of bindings.values()) {
        graph[record.token.name] = (record.dependencies ?? []).map((d) => d.name);
      }
      return graph;
    },
  };

  return container;
}

/** Resolves a token from a container. */
export function resolve<T>(container: DIContainer, token: InjectionToken<T>): T {
  return container.resolve(token);
}

/** Resolves a token optionally, returning `undefined` if unbound. */
export function resolveOptional<T>(container: DIContainer, token: InjectionToken<T>): T | undefined {
  return container.resolveOptional(token);
}

/** Resolves multiple tokens from a container. */
export function resolveAll<T>(container: DIContainer, tokens: readonly InjectionToken<T>[]): T[] {
  return container.resolveAll(tokens);
}

/** Checks if a token is registered in the container. */
export function hasBinding<T>(container: DIContainer, token: InjectionToken<T>): boolean {
  return container.has(token);
}

/** Overrides an existing binding in the container. */
export function overrideBinding<T>(container: DIContainer, binding: BindingRecord<T>): DIContainer {
  return container.override(binding);
}

/** Creates a child scope from a container. */
export function createScope(container: DIContainer): DIContainer {
  return container.createScope();
}

/** Disposes all singleton and scoped instances in a container. */
export function disposeContainer(container: DIContainer): void {
  container.dispose();
}

/** Clears all bindings and instances in a container. */
export function clearContainer(container: DIContainer): void {
  container.clear();
}

/** Returns a lazy resolver thunk for deferred dependency resolution. */
export function lazyResolve<T>(container: DIContainer, token: InjectionToken<T>): () => T {
  let cached: T | undefined;
  let resolved = false;
  return () => {
    if (!resolved) {
      cached = container.resolve(token);
      resolved = true;
    }
    return cached as T;
  };
}

/** Wraps a class constructor with its token dependencies for clean registration. */
export function injectable<T, Deps extends readonly InjectionToken<unknown>[]>(
  ctor: new (...args: never[]) => T,
  dependencies: Deps
): (container: DIContainer) => T {
  return (container: DIContainer) => {
    const args = dependencies.map((d) => container.resolve(d));
    return new ctor(...(args as never[]));
  };
}

/** Returns the dependency adjacency map for all registered tokens. */
export function getDependencyGraph(container: DIContainer): Record<string, string[]> {
  return container.getGraph();
}

/** Validates that all declared dependencies in the container have registered bindings. */
export function validateContainer(container: DIContainer): { valid: boolean; missing: string[] } {
  const graph = container.getGraph();
  const registered = new Set(Object.keys(graph));
  const missing: string[] = [];
  for (const [node, deps] of Object.entries(graph)) {
    for (const dep of deps) {
      if (!registered.has(dep)) {
        missing.push(`${node} -> ${dep}`);
      }
    }
  }
  return { valid: missing.length === 0, missing };
}
