/**
 * OptiKit Lens — Immutable functional optics (Lenses, Prisms, Isomorphisms, Traversals)
 * for composable deep reading and structural-sharing updates.
 */

export interface Lens<S, A> {
  get: (source: S) => A;
  set: (value: A) => (source: S) => S;
}

export interface Prism<S, A> {
  preview: (source: S) => A | undefined;
  review: (value: A) => S;
}

export interface Iso<S, A> {
  to: (source: S) => A;
  from: (value: A) => S;
}

export interface Traversal<S, A> {
  getAll: (source: S) => A[];
  modifyAll: (fn: (value: A) => A) => (source: S) => S;
}

/** Creates a custom Lens from a getter and immutable setter. */
export function lens<S, A>(
  get: (source: S) => A,
  set: (value: A) => (source: S) => S
): Lens<S, A> {
  return { get, set };
}

/** Creates a Lens focusing on a specific property of an object. */
export function lensProp<S extends Record<string, unknown>, K extends keyof S>(
  prop: K
): Lens<S, S[K]> {
  return {
    get: (source) => source[prop],
    set: (value) => (source) =>
      source[prop] === value ? source : { ...source, [prop]: value },
  };
}

/** Creates a Lens focusing on a nested path in an object/array structure. */
export function lensPath<S, A = unknown>(path: readonly (string | number)[]): Lens<S, A> {
  const get = (source: S): A => {
    let curr: unknown = source;
    for (const key of path) {
      if (curr == null) return undefined as A;
      curr = (curr as Record<string | number, unknown>)[key];
    }
    return curr as A;
  };

  const setAt = (obj: unknown, idx: number, value: unknown): unknown => {
    if (idx === path.length) return value;
    const key = path[idx];
    if (Array.isArray(obj)) {
      const next = [...obj];
      next[Number(key)] = setAt(obj[Number(key)], idx + 1, value);
      return next;
    }
    const rec = (obj && typeof obj === 'object' ? obj : {}) as Record<string | number, unknown>;
    return { ...rec, [key]: setAt(rec[key], idx + 1, value) };
  };

  return {
    get,
    set: (value) => (source) => setAt(source, 0, value) as S,
  };
}

/** Creates a Lens focusing on an array element at index `index`. */
export function lensIndex<T>(index: number): Lens<readonly T[], T | undefined> {
  return {
    get: (arr) => arr[index],
    set: (value) => (arr) => {
      if (index < 0 || index >= arr.length || value === undefined) return arr;
      const copy = [...arr];
      copy[index] = value;
      return copy;
    },
  };
}

/** Reads the focused value through a Lens. */
export function viewLens<S, A>(l: Lens<S, A>, source: S): A {
  return l.get(source);
}

/** Immutably sets the focused value through a Lens. */
export function setLens<S, A>(l: Lens<S, A>, value: A, source: S): S {
  return l.set(value)(source);
}

/** Immutably transforms the focused value through a Lens. */
export function overLens<S, A>(l: Lens<S, A>, fn: (value: A) => A, source: S): S {
  return l.set(fn(l.get(source)))(source);
}

/** Composes two Lenses left-to-right (`Lens<S, A>` + `Lens<A, B>` -> `Lens<S, B>`). */
export function composeLens<S, A, B>(outer: Lens<S, A>, inner: Lens<A, B>): Lens<S, B> {
  return {
    get: (source) => inner.get(outer.get(source)),
    set: (value) => (source) => outer.set(inner.set(value)(outer.get(source)))(source),
  };
}

/** Creates a Prism for sum types / optional branches. */
export function prism<S, A>(
  preview: (source: S) => A | undefined,
  review: (value: A) => S
): Prism<S, A> {
  return { preview, review };
}

/** Attempts to extract a value using a Prism. */
export function previewPrism<S, A>(p: Prism<S, A>, source: S): A | undefined {
  return p.preview(source);
}

/** Constructs a sum-type value from a Prism's focused type. */
export function reviewPrism<S, A>(p: Prism<S, A>, value: A): S {
  return p.review(value);
}

/** Creates a lossless bidirectional Isomorphism between `S` and `A`. */
export function iso<S, A>(to: (source: S) => A, from: (value: A) => S): Iso<S, A> {
  return { to, from };
}

/** Converts `S` to `A` via an Iso. */
export function toIso<S, A>(i: Iso<S, A>, source: S): A {
  return i.to(source);
}

/** Converts `A` back to `S` via an Iso. */
export function fromIso<S, A>(i: Iso<S, A>, value: A): S {
  return i.from(value);
}

/** Creates a Traversal over all elements of an array. */
export function traversal<T>(): Traversal<readonly T[], T> {
  return {
    getAll: (arr) => [...arr],
    modifyAll: (fn) => (arr) => arr.map(fn),
  };
}

/** Applies a transformation to all targets of a Traversal. */
export function overTraversal<S, A>(
  t: Traversal<S, A>,
  fn: (value: A) => A,
  source: S
): S {
  return t.modifyAll(fn)(source);
}

/** Collects all targets of a Traversal into an array. */
export function toListOf<S, A>(t: Traversal<S, A>, source: S): A[] {
  return t.getAll(source);
}

/** Creates a Traversal over array items matching a predicate. */
export function filteredLens<T>(predicate: (item: T) => boolean): Traversal<readonly T[], T> {
  return {
    getAll: (arr) => arr.filter(predicate),
    modifyAll: (fn) => (arr) => arr.map((item) => (predicate(item) ? fn(item) : item)),
  };
}

/** Wraps a Lens to safely handle `undefined` source objects on read. */
export function optionalLens<S, A>(l: Lens<S, A>): Lens<S | undefined, A | undefined> {
  return {
    get: (source) => (source === undefined ? undefined : l.get(source)),
    set: (value) => (source) =>
      source === undefined || value === undefined ? source : l.set(value)(source),
  };
}

/** Wraps a Lens with a fallback default value when the focused value is `undefined` or `null`. */
export function defaultLens<S, A>(l: Lens<S, A | undefined | null>, defaultValue: A): Lens<S, A> {
  return {
    get: (source) => l.get(source) ?? defaultValue,
    set: (value) => (source) => l.set(value)(source),
  };
}

/** Maps a Lens over every element of an array. */
export function mappedLens<S, A>(l: Lens<S, A>): Traversal<readonly S[], A> {
  return {
    getAll: (arr) => arr.map((item) => l.get(item)),
    modifyAll: (fn) => (arr) => arr.map((item) => l.set(fn(l.get(item)))(item)),
  };
}

/** Combines two Lenses on the same source into a tuple Lens. */
export function zipLens<S, A, B>(a: Lens<S, A>, b: Lens<S, B>): Lens<S, [A, B]> {
  return {
    get: (source) => [a.get(source), b.get(source)],
    set: ([va, vb]) => (source) => b.set(vb)(a.set(va)(source)),
  };
}

/** Convenience helper to read a dot-separated path from an object. */
export function focusPath<T = unknown>(source: unknown, dotPath: string): T {
  return lensPath<unknown, T>(dotPath.split('.')).get(source);
}

/** Convenience helper to immutably update a dot-separated path in an object. */
export function updateAtPath<S, A = unknown>(
  source: S,
  dotPath: string,
  updater: (current: A) => A
): S {
  const l = lensPath<S, A>(dotPath.split('.'));
  return overLens(l, updater, source);
}
