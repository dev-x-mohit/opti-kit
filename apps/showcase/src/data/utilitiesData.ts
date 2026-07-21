export interface UtilityMeta {
  id: string;
  name: string;
  module: string;
  description: string;
  signature: string;
  example: string;
  output: string;
}

export const utilitiesData: UtilityMeta[] = [
  {
    "id": "chunk",
    "name": "chunk",
    "module": "Array",
    "description": "Splits an array into chunks of a specified size.",
    "signature": "chunk<T>(arr: T[], size: number): T[][]",
    "example": "chunk(...)",
    "output": "..."
  },
  {
    "id": "unique",
    "name": "unique",
    "module": "Array",
    "description": "Returns a new array with unique values.",
    "signature": "unique<T>(arr: T[]): T[]",
    "example": "unique(...)",
    "output": "..."
  },
  {
    "id": "difference",
    "name": "difference",
    "module": "Array",
    "description": "Returns the elements in the first array that are not present in any of the other arrays.",
    "signature": "difference<T>(arr: T[], ...others: T[][]): T[]",
    "example": "difference(...)",
    "output": "..."
  },
  {
    "id": "intersection",
    "name": "intersection",
    "module": "Array",
    "description": "Returns the intersection of multiple arrays.",
    "signature": "intersection<T>(...arrs: T[][]): T[]",
    "example": "intersection(...)",
    "output": "..."
  },
  {
    "id": "groupby",
    "name": "groupBy",
    "module": "Array",
    "description": "Groups array elements based on a key returned by the iterator function.",
    "signature": "groupBy<T>( arr: T[], fn: (item: T) => string | number ): Record<string | number, T[]>",
    "example": "groupBy(...)",
    "output": "..."
  },
  {
    "id": "shuffle",
    "name": "shuffle",
    "module": "Array",
    "description": "Shuffles an array using the Fisher-Yates algorithm without modifying the original.",
    "signature": "shuffle<T>(arr: T[]): T[]",
    "example": "shuffle(...)",
    "output": "..."
  },
  {
    "id": "sample",
    "name": "sample",
    "module": "Array",
    "description": "Returns a random element from an array.",
    "signature": "sample<T>(arr: T[]): T | undefined",
    "example": "sample(...)",
    "output": "..."
  },
  {
    "id": "uniqueby",
    "name": "uniqueBy",
    "module": "Array",
    "description": "Returns a duplicate-free version of an array, based on a custom key or mapping function.",
    "signature": "uniqueBy<T>( arr: T[], iteratee: keyof T | ((item: T) => any) ): T[]",
    "example": "uniqueBy(...)",
    "output": "..."
  },
  {
    "id": "flatten",
    "name": "flatten",
    "module": "Array",
    "description": "Flattens an array of arrays by one level.",
    "signature": "flatten<T>(arr: T[][]): T[]",
    "example": "flatten(...)",
    "output": "..."
  },
  {
    "id": "countby",
    "name": "countBy",
    "module": "Array",
    "description": "Creates an object composed of keys generated from the results of running each element of collection thru iteratee.",
    "signature": "countBy<T>( arr: T[], iteratee: (item: T) => string | number ): Record<string | number, number>",
    "example": "countBy(...)",
    "output": "..."
  },
  {
    "id": "compact",
    "name": "compact",
    "module": "Array",
    "description": "Creates an array with all falsy values removed.",
    "signature": "compact<T>(arr: T[]): Exclude<T, false | null | 0 | \"\" | undefined>[]",
    "example": "compact(...)",
    "output": "..."
  },
  {
    "id": "drop",
    "name": "drop",
    "module": "Array",
    "description": "Creates a slice of array with n elements dropped from the beginning.",
    "signature": "drop<T>(arr: T[], n: number = 1): T[]",
    "example": "drop(...)",
    "output": "..."
  },
  {
    "id": "dropright",
    "name": "dropRight",
    "module": "Array",
    "description": "Creates a slice of array with n elements dropped from the end.",
    "signature": "dropRight<T>(arr: T[], n: number = 1): T[]",
    "example": "dropRight(...)",
    "output": "..."
  },
  {
    "id": "take",
    "name": "take",
    "module": "Array",
    "description": "Creates a slice of array with n elements taken from the beginning.",
    "signature": "take<T>(arr: T[], n: number = 1): T[]",
    "example": "take(...)",
    "output": "..."
  },
  {
    "id": "takeright",
    "name": "takeRight",
    "module": "Array",
    "description": "Creates a slice of array with n elements taken from the end.",
    "signature": "takeRight<T>(arr: T[], n: number = 1): T[]",
    "example": "takeRight(...)",
    "output": "..."
  },
  {
    "id": "initial",
    "name": "initial",
    "module": "Array",
    "description": "Gets all but the last element of array.",
    "signature": "initial<T>(arr: T[]): T[]",
    "example": "initial(...)",
    "output": "..."
  },
  {
    "id": "last",
    "name": "last",
    "module": "Array",
    "description": "Gets the last element of array.",
    "signature": "last<T>(arr: T[]): T | undefined",
    "example": "last(...)",
    "output": "..."
  },
  {
    "id": "first",
    "name": "first",
    "module": "Array",
    "description": "Gets the first element of array.",
    "signature": "first<T>(arr: T[]): T | undefined",
    "example": "first(...)",
    "output": "..."
  },
  {
    "id": "zip",
    "name": "zip",
    "module": "Array",
    "description": "Creates an array of grouped elements, the first of which contains the first elements of the given arrays.",
    "signature": "zip<T1, T2>(arr1: T1[], arr2: T2[]): [T1 | undefined, T2 | undefined][]",
    "example": "zip(...)",
    "output": "..."
  },
  {
    "id": "unzip",
    "name": "unzip",
    "module": "Array",
    "description": "Unzips an array of grouped elements into two arrays.",
    "signature": "unzip<T1, T2>(arr: [T1, T2][]): [T1[], T2[]]",
    "example": "unzip(...)",
    "output": "..."
  },
  {
    "id": "union",
    "name": "union",
    "module": "Array",
    "description": "Creates an array of unique values, in order, from all given arrays.",
    "signature": "union<T>(...arrs: T[][]): T[]",
    "example": "union(...)",
    "output": "..."
  },
  {
    "id": "partition",
    "name": "partition",
    "module": "Array",
    "description": "Splits an array into two groups: those that pass the predicate, and those that don't.",
    "signature": "partition<T>(arr: T[], predicate: (item: T) => boolean): [T[], T[]]",
    "example": "partition(...)",
    "output": "..."
  },
  {
    "id": "without",
    "name": "without",
    "module": "Array",
    "description": "Creates an array excluding all given values.",
    "signature": "without<T>(arr: T[], ...values: T[]): T[]",
    "example": "without(...)",
    "output": "..."
  },
  {
    "id": "reject",
    "name": "reject",
    "module": "Array",
    "description": "The opposite of filter; this method returns the elements of collection that predicate does not return truthy for.",
    "signature": "reject<T>(arr: T[], predicate: (item: T) => boolean): T[]",
    "example": "reject(...)",
    "output": "..."
  },
  {
    "id": "keyby",
    "name": "keyBy",
    "module": "Array",
    "description": "Creates an object composed of keys generated from the results of running each element of array thru iteratee.",
    "signature": "keyBy<T>(arr: T[], iteratee: keyof T | ((item: T) => string | number)): Record<string | number, T>",
    "example": "keyBy(...)",
    "output": "..."
  },
  {
    "id": "nth",
    "name": "nth",
    "module": "Array",
    "description": "Gets the element at index n of array. If n is negative, the nth element from the end is returned.",
    "signature": "nth<T>(arr: T[], n: number): T | undefined",
    "example": "nth(...)",
    "output": "..."
  },
  {
    "id": "samplesize",
    "name": "sampleSize",
    "module": "Array",
    "description": "Gets n random elements at unique keys from array up to the size of array.",
    "signature": "sampleSize<T>(arr: T[], n: number = 1): T[]",
    "example": "sampleSize(...)",
    "output": "..."
  },
  {
    "id": "sortby",
    "name": "sortBy",
    "module": "Array",
    "description": "Sorts an array based on an iteratee. Returns a new sorted array.",
    "signature": "sortBy<T>(arr: T[], iteratee: (item: T) => any): T[]",
    "example": "sortBy(...)",
    "output": "..."
  },
  {
    "id": "range",
    "name": "range",
    "module": "Array",
    "description": "Creates an array of numbers progressing from start up to, but not including, end.",
    "signature": "range(start: number, end?: number, step = 1): number[]",
    "example": "range(...)",
    "output": "..."
  },
  {
    "id": "rotate",
    "name": "rotate",
    "module": "Array",
    "description": "Rotates array elements by an offset position. Positive rotates right, negative rotates left.",
    "signature": "rotate<T>(arr: T[], offset: number): T[]",
    "example": "rotate(...)",
    "output": "..."
  },
  {
    "id": "minby",
    "name": "minBy",
    "module": "Array",
    "description": "Finds the element in an array that produces the minimum value when passed to iteratee.",
    "signature": "minBy<T>(arr: T[], iteratee: (item: T) => number): T | undefined",
    "example": "minBy(...)",
    "output": "..."
  },
  {
    "id": "maxby",
    "name": "maxBy",
    "module": "Array",
    "description": "Finds the element in an array that produces the maximum value when passed to iteratee.",
    "signature": "maxBy<T>(arr: T[], iteratee: (item: T) => number): T | undefined",
    "example": "maxBy(...)",
    "output": "..."
  },
  {
    "id": "sumby",
    "name": "sumBy",
    "module": "Array",
    "description": "Computes the sum of values produced by iteratee for each element in the array.",
    "signature": "sumBy<T>(arr: T[], iteratee: (item: T) => number): number",
    "example": "sumBy(...)",
    "output": "..."
  },
  {
    "id": "meanby",
    "name": "meanBy",
    "module": "Array",
    "description": "Computes the mean (average) of values produced by iteratee for each element in the array.",
    "signature": "meanBy<T>(arr: T[], iteratee: (item: T) => number): number",
    "example": "meanBy(...)",
    "output": "..."
  },
  {
    "id": "move",
    "name": "move",
    "module": "Array",
    "description": "Moves an element from one index to another in a new array.",
    "signature": "move<T>(arr: T[], fromIndex: number, toIndex: number): T[]",
    "example": "move(...)",
    "output": "..."
  },
  {
    "id": "swap",
    "name": "swap",
    "module": "Array",
    "description": "Swaps two elements in an array at specified indices in a new array.",
    "signature": "swap<T>(arr: T[], index1: number, index2: number): T[]",
    "example": "swap(...)",
    "output": "..."
  },
  {
    "id": "intersperse",
    "name": "intersperse",
    "module": "Array",
    "description": "Places a separator element between each element of an array.",
    "signature": "intersperse<T>(arr: T[], separator: T): T[]",
    "example": "intersperse(...)",
    "output": "..."
  },
  {
    "id": "scan",
    "name": "scan",
    "module": "Array",
    "description": "Returns cumulative accumulation values (running reduce history) for an array.",
    "signature": "scan<T, R>( arr: T[], fn: (acc: R, val: T, index: number) => R, initial: R ): R[]",
    "example": "scan(...)",
    "output": "..."
  },
  {
    "id": "pluck",
    "name": "pluck",
    "module": "Array",
    "description": "Extracts a property value from each object in an array.",
    "signature": "pluck<T, K extends keyof T>(arr: T[], key: K): T[K][]",
    "example": "pluck(...)",
    "output": "..."
  },
  {
    "id": "flatdeep",
    "name": "flatDeep",
    "module": "Array",
    "description": "Recursively flattens an array up to the specified depth (default: Infinity).",
    "signature": "flatDeep<T>(arr: any[], depth = Infinity): T[]",
    "example": "flatDeep(...)",
    "output": "..."
  },
  {
    "id": "delay",
    "name": "delay",
    "module": "Async",
    "description": "Returns a promise that resolves after a specified duration in milliseconds.",
    "signature": "delay(ms: number): Promise<void>",
    "example": "delay(...)",
    "output": "..."
  },
  {
    "id": "debounce",
    "name": "debounce",
    "module": "Async",
    "description": "Creates a debounced function that delays invoking the passed function until after `ms`",
    "signature": "debounce<T extends (...args: any[]) => any>( fn: T, ms: number, options?",
    "example": "debounce(...)",
    "output": "..."
  },
  {
    "id": "throttle",
    "name": "throttle",
    "module": "Async",
    "description": "Creates a throttled function that only invokes the passed function at most once per every",
    "signature": "throttle<T extends (...args: any[]) => any>( fn: T, ms: number, options?",
    "example": "throttle(...)",
    "output": "..."
  },
  {
    "id": "once",
    "name": "once",
    "module": "Async",
    "description": "Restricts a function call to only execute once. Subsequent calls return the first result.",
    "signature": "once<T extends (...args: any[]) => any>(fn: T): T",
    "example": "once(...)",
    "output": "..."
  },
  {
    "id": "retry",
    "name": "retry",
    "module": "Async",
    "description": "Retries a promise-returning function a specified number of times with a delay between failures.",
    "signature": "retry<T>( fn: () => Promise<T>, retries = 3, delayMs = 500 ): Promise<T>",
    "example": "retry(...)",
    "output": "..."
  },
  {
    "id": "timeout",
    "name": "timeout",
    "module": "Async",
    "description": "Returns a promise that rejects if the provided promise does not resolve within the specified timeout.",
    "signature": "timeout<T>(promise: Promise<T>, ms: number, fallbackError = new Error(\"Timeout\")): Promise<T>",
    "example": "timeout(...)",
    "output": "..."
  },
  {
    "id": "defer",
    "name": "defer",
    "module": "Async",
    "description": "Creates a deferred object containing a promise and its resolve/reject methods.",
    "signature": "defer<T>()",
    "example": "defer(...)",
    "output": "..."
  },
  {
    "id": "sequence",
    "name": "sequence",
    "module": "Async",
    "description": "Executes an array of async functions in sequence.",
    "signature": "sequence<T>(tasks: (() => Promise<T>)[]): Promise<T[]>",
    "example": "sequence(...)",
    "output": "..."
  },
  {
    "id": "trycatchasync",
    "name": "tryCatchAsync",
    "module": "Async",
    "description": "Wraps an async function and returns a tuple [error, result], safely catching errors.",
    "signature": "tryCatchAsync<T, E = Error>( promise: Promise<T> ): Promise<[E | null, T | null]>",
    "example": "tryCatchAsync(...)",
    "output": "..."
  },
  {
    "id": "pmap",
    "name": "pMap",
    "module": "Async",
    "description": "Maps over an array concurrently.",
    "signature": "pMap<T, R>( iterable: Iterable<T>, mapper: (item: T, index: number) => Promise<R> ): Promise<R[]>",
    "example": "pMap(...)",
    "output": "..."
  },
  {
    "id": "pfilter",
    "name": "pFilter",
    "module": "Async",
    "description": "Filters an array concurrently.",
    "signature": "pFilter<T>( iterable: Iterable<T>, filterer: (item: T, index: number) => Promise<boolean> ): Promise<T[]>",
    "example": "pFilter(...)",
    "output": "..."
  },
  {
    "id": "everyasync",
    "name": "everyAsync",
    "module": "Async",
    "description": "Asynchronously checks if every element satisfies the condition (sequential execution).",
    "signature": "everyAsync<T>( iterable: Iterable<T>, predicate: (item: T, index: number) => Promise<boolean> ): Promise<boolean>",
    "example": "everyAsync(...)",
    "output": "..."
  },
  {
    "id": "someasync",
    "name": "someAsync",
    "module": "Async",
    "description": "Asynchronously checks if some element satisfies the condition (sequential execution).",
    "signature": "someAsync<T>( iterable: Iterable<T>, predicate: (item: T, index: number) => Promise<boolean> ): Promise<boolean>",
    "example": "someAsync(...)",
    "output": "..."
  },
  {
    "id": "preduce",
    "name": "pReduce",
    "module": "Async",
    "description": "Asynchronously reduces an iterable in order.",
    "signature": "pReduce<T, R>( iterable: Iterable<T>, reducer: (acc: R, item: T, index: number) => Promise<R>, initialValue: R ): Promise<R>",
    "example": "pReduce(...)",
    "output": "..."
  },
  {
    "id": "pprops",
    "name": "pProps",
    "module": "Async",
    "description": "Resolves an object whose values are promises into an object with resolved values.",
    "signature": "pProps<T extends Record<string, Promise<any>>>( obj: T ): Promise<",
    "example": "pProps(...)",
    "output": "..."
  },
  {
    "id": "waituntil",
    "name": "waitUntil",
    "module": "Async",
    "description": "Waits until a predicate function evaluates to true or times out.",
    "signature": "waitUntil( predicate: () => boolean | Promise<boolean>, options?",
    "example": "waitUntil(...)",
    "output": "..."
  },
  {
    "id": "sleep",
    "name": "sleep",
    "module": "Async",
    "description": "Alias for delay - returns a promise that resolves after `ms` milliseconds.",
    "signature": "sleep(ms: number): Promise<void>",
    "example": "sleep(...)",
    "output": "..."
  },
  {
    "id": "asyncpool",
    "name": "asyncPool",
    "module": "Async",
    "description": "Runs an array of promise-returning functions with a specified concurrency limit.",
    "signature": "asyncPool<T, R>( concurrency: number, iterable: Iterable<T>, iteratorFn: (item: T) => Promise<R> ): Promise<R[]>",
    "example": "asyncPool(...)",
    "output": "..."
  },
  {
    "id": "retrywithbackoff",
    "name": "retryWithBackoff",
    "module": "Async",
    "description": "Retries an async function with exponential backoff on failure.",
    "signature": "retryWithBackoff<T>( fn: () => Promise<T>, options?",
    "example": "retryWithBackoff(...)",
    "output": "..."
  },
  {
    "id": "isbrowser",
    "name": "isBrowser",
    "module": "Browser",
    "description": "Safe client-side environment and browser feature detection utilities.",
    "signature": "isBrowser(): boolean",
    "example": "isBrowser(...)",
    "output": "..."
  },
  {
    "id": "isserver",
    "name": "isServer",
    "module": "Browser",
    "description": "Checks if the code is running in a server environment (e.g. Node.js, SSR).",
    "signature": "isServer(): boolean",
    "example": "isServer(...)",
    "output": "..."
  },
  {
    "id": "ischrome",
    "name": "isChrome",
    "module": "Browser",
    "description": "Checks if the current browser is Google Chrome.",
    "signature": "isChrome(): boolean",
    "example": "isChrome(...)",
    "output": "..."
  },
  {
    "id": "isfirefox",
    "name": "isFirefox",
    "module": "Browser",
    "description": "Checks if the current browser is Mozilla Firefox.",
    "signature": "isFirefox(): boolean",
    "example": "isFirefox(...)",
    "output": "..."
  },
  {
    "id": "issafari",
    "name": "isSafari",
    "module": "Browser",
    "description": "Checks if the current browser is Apple Safari.",
    "signature": "isSafari(): boolean",
    "example": "isSafari(...)",
    "output": "..."
  },
  {
    "id": "isedge",
    "name": "isEdge",
    "module": "Browser",
    "description": "Checks if the current browser is Microsoft Edge.",
    "signature": "isEdge(): boolean",
    "example": "isEdge(...)",
    "output": "..."
  },
  {
    "id": "isios",
    "name": "isIOS",
    "module": "Browser",
    "description": "Checks if the current operating system is iOS.",
    "signature": "isIOS(): boolean",
    "example": "isIOS(...)",
    "output": "..."
  },
  {
    "id": "isandroid",
    "name": "isAndroid",
    "module": "Browser",
    "description": "Checks if the current operating system is Android.",
    "signature": "isAndroid(): boolean",
    "example": "isAndroid(...)",
    "output": "..."
  },
  {
    "id": "ismobile",
    "name": "isMobile",
    "module": "Browser",
    "description": "Checks if the device is a mobile device (phone or tablet).",
    "signature": "isMobile(): boolean",
    "example": "isMobile(...)",
    "output": "..."
  },
  {
    "id": "isdesktop",
    "name": "isDesktop",
    "module": "Browser",
    "description": "Checks if the device is a desktop.",
    "signature": "isDesktop(): boolean",
    "example": "isDesktop(...)",
    "output": "..."
  },
  {
    "id": "istouchdevice",
    "name": "isTouchDevice",
    "module": "Browser",
    "description": "Checks if the device supports touch interaction.",
    "signature": "isTouchDevice(): boolean",
    "example": "isTouchDevice(...)",
    "output": "..."
  },
  {
    "id": "supportswebgl",
    "name": "supportsWebGL",
    "module": "Browser",
    "description": "Checks if the browser supports WebGL.",
    "signature": "supportsWebGL(): boolean",
    "example": "supportsWebGL(...)",
    "output": "..."
  },
  {
    "id": "supportsserviceworker",
    "name": "supportsServiceWorker",
    "module": "Browser",
    "description": "Checks if the browser supports Service Workers.",
    "signature": "supportsServiceWorker(): boolean",
    "example": "supportsServiceWorker(...)",
    "output": "..."
  },
  {
    "id": "getdevicepixelratio",
    "name": "getDevicePixelRatio",
    "module": "Browser",
    "description": "Returns the device pixel ratio (DPR). Falls back to 1 on the server.",
    "signature": "getDevicePixelRatio(): number",
    "example": "getDevicePixelRatio(...)",
    "output": "..."
  },
  {
    "id": "getpreferredlanguage",
    "name": "getPreferredLanguage",
    "module": "Browser",
    "description": "Returns the preferred language code of the client. Falls back to \"en\" on the server.",
    "signature": "getPreferredLanguage(): string",
    "example": "getPreferredLanguage(...)",
    "output": "..."
  },
  {
    "id": "isonline",
    "name": "isOnline",
    "module": "Browser",
    "description": "Checks if the client has an active internet connection. Falls back to true on the server.",
    "signature": "isOnline(): boolean",
    "example": "isOnline(...)",
    "output": "..."
  },
  {
    "id": "memoizewithttl",
    "name": "memoizeWithTTL",
    "module": "Cache",
    "description": "Memoizes a function, but invalidates the cache after TTL (time-to-live) milliseconds.",
    "signature": "memoizeWithTTL<T extends (...args: any[]) => any>( fn: T, ttl: number ): T",
    "example": "memoizeWithTTL(...)",
    "output": "..."
  },
  {
    "id": "invertmap",
    "name": "invertMap",
    "module": "Collection",
    "description": "Creates a new object composed of the inverted keys and values of the given object.",
    "signature": "invertMap(obj: Record<string, string | number>): Record<string, string>",
    "example": "invertMap(...)",
    "output": "..."
  },
  {
    "id": "setunion",
    "name": "setUnion",
    "module": "Collection",
    "description": "Returns a new Set containing all elements present in either Set A or Set B.",
    "signature": "setUnion<T>(setA: Set<T>, setB: Set<T>): Set<T>",
    "example": "setUnion(...)",
    "output": "..."
  },
  {
    "id": "setintersection",
    "name": "setIntersection",
    "module": "Collection",
    "description": "Returns a new Set containing all elements present in both Set A and Set B.",
    "signature": "setIntersection<T>(setA: Set<T>, setB: Set<T>): Set<T>",
    "example": "setIntersection(...)",
    "output": "..."
  },
  {
    "id": "setdifference",
    "name": "setDifference",
    "module": "Collection",
    "description": "Returns a new Set containing all elements present in Set A but not in Set B.",
    "signature": "setDifference<T>(setA: Set<T>, setB: Set<T>): Set<T>",
    "example": "setDifference(...)",
    "output": "..."
  },
  {
    "id": "symmetricdifference",
    "name": "symmetricDifference",
    "module": "Collection",
    "description": "Returns a new Set containing elements present in either set but not both.",
    "signature": "symmetricDifference<T>(setA: Set<T>, setB: Set<T>): Set<T>",
    "example": "symmetricDifference(...)",
    "output": "..."
  },
  {
    "id": "mergemaps",
    "name": "mergeMaps",
    "module": "Collection",
    "description": "Merges two Maps into a new Map. Values from the second map overwrite the first.",
    "signature": "mergeMaps<K, V>(mapA: Map<K, V>, mapB: Map<K, V>): Map<K, V>",
    "example": "mergeMaps(...)",
    "output": "..."
  },
  {
    "id": "frequencies",
    "name": "frequencies",
    "module": "Collection",
    "description": "Counts the frequency of each element in an array.",
    "signature": "frequencies<T>(arr: T[]): Map<T, number>",
    "example": "frequencies(...)",
    "output": "..."
  },
  {
    "id": "filtermap",
    "name": "filterMap",
    "module": "Collection",
    "description": "Maps and filters in a single pass. Returns only items where the callback does not return undefined.",
    "signature": "filterMap<T, R>(arr: T[], fn: (item: T, index: number) => R | undefined): R[]",
    "example": "filterMap(...)",
    "output": "..."
  },
  {
    "id": "maprecordvalues",
    "name": "mapRecordValues",
    "module": "Collection",
    "description": "Creates a new object with the same keys but with values transformed by the callback.",
    "signature": "mapRecordValues<V, R>( obj: Record<string, V>, fn: (value: V, key: string) => R ): Record<string, R>",
    "example": "mapRecordValues(...)",
    "output": "..."
  },
  {
    "id": "filterrecord",
    "name": "filterRecord",
    "module": "Collection",
    "description": "Creates a new object containing only the entries where the predicate returns true.",
    "signature": "filterRecord<V>( obj: Record<string, V>, fn: (value: V, key: string) => boolean ): Record<string, V>",
    "example": "filterRecord(...)",
    "output": "..."
  },
  {
    "id": "issubset",
    "name": "isSubset",
    "module": "Collection",
    "description": "Checks if a Set is a subset of another Set.",
    "signature": "isSubset<T>(subset: Set<T>, superset: Set<T>): boolean",
    "example": "isSubset(...)",
    "output": "..."
  },
  {
    "id": "issuperset",
    "name": "isSuperset",
    "module": "Collection",
    "description": "Checks if a Set is a superset of another Set.",
    "signature": "isSuperset<T>(superset: Set<T>, subset: Set<T>): boolean",
    "example": "isSuperset(...)",
    "output": "..."
  },
  {
    "id": "hextorgb",
    "name": "hexToRgb",
    "module": "Color",
    "description": "Converts a hex color string to an RGB object. Returns null if invalid.",
    "signature": "hexToRgb( hex: string )",
    "example": "hexToRgb(...)",
    "output": "..."
  },
  {
    "id": "rgbtohex",
    "name": "rgbToHex",
    "module": "Color",
    "description": "Converts RGB integer components (0-255) to a Hex color string.",
    "signature": "rgbToHex(r: number, g: number, b: number): string",
    "example": "rgbToHex(...)",
    "output": "..."
  },
  {
    "id": "hsltorgb",
    "name": "hslToRgb",
    "module": "Color",
    "description": "Converts HSL values (h: 0-360, s: 0-100, l: 0-100) to an RGB object.",
    "signature": "hslToRgb( h: number, s: number, l: number )",
    "example": "hslToRgb(...)",
    "output": "..."
  },
  {
    "id": "rgbtohsl",
    "name": "rgbToHsl",
    "module": "Color",
    "description": "Converts RGB components (0-255) to HSL values (h: 0-360, s: 0-100, l: 0-100).",
    "signature": "rgbToHsl( r: number, g: number, b: number )",
    "example": "rgbToHsl(...)",
    "output": "..."
  },
  {
    "id": "hextohsl",
    "name": "hexToHsl",
    "module": "Color",
    "description": "Converts a hex color string to HSL values.",
    "signature": "hexToHsl(hex: string)",
    "example": "hexToHsl(...)",
    "output": "..."
  },
  {
    "id": "hsltohex",
    "name": "hslToHex",
    "module": "Color",
    "description": "Converts HSL values to a hex color string.",
    "signature": "hslToHex(h: number, s: number, l: number): string",
    "example": "hslToHex(...)",
    "output": "..."
  },
  {
    "id": "lighten",
    "name": "lighten",
    "module": "Color",
    "description": "Lightens a hex color by a given amount (0 to 1).",
    "signature": "lighten(hex: string, amount: number): string",
    "example": "lighten(...)",
    "output": "..."
  },
  {
    "id": "darken",
    "name": "darken",
    "module": "Color",
    "description": "Darkens a hex color by a given amount (0 to 1).",
    "signature": "darken(hex: string, amount: number): string",
    "example": "darken(...)",
    "output": "..."
  },
  {
    "id": "isvalidhex",
    "name": "isValidHex",
    "module": "Color",
    "description": "Validates whether a string is a valid hex color (3 or 6 characters, with or without #).",
    "signature": "isValidHex(hex: string): boolean",
    "example": "isValidHex(...)",
    "output": "..."
  },
  {
    "id": "getcontrastratio",
    "name": "getContrastRatio",
    "module": "Color",
    "description": "Calculates the WCAG contrast ratio between two hex colors.",
    "signature": "getContrastRatio(hex1: string, hex2: string): number",
    "example": "getContrastRatio(...)",
    "output": "..."
  },
  {
    "id": "uuid",
    "name": "uuid",
    "module": "Crypto",
    "description": "Generates an RFC4122 v4 compliant UUID.",
    "signature": "uuid(): string",
    "example": "uuid(...)",
    "output": "..."
  },
  {
    "id": "fnv1a",
    "name": "fnv1a",
    "module": "Crypto",
    "description": "Calculates a fast FNV-1a 32-bit non-cryptographic hash of a string.",
    "signature": "fnv1a(str: string): number",
    "example": "fnv1a(...)",
    "output": "..."
  },
  {
    "id": "generatetoken",
    "name": "generateToken",
    "module": "Crypto",
    "description": "Generates a cryptographically secure random token of a specified length (hexadecimal).",
    "signature": "generateToken(length = 32): string",
    "example": "generateToken(...)",
    "output": "..."
  },
  {
    "id": "sha256",
    "name": "sha256",
    "module": "Crypto",
    "description": "Generates a SHA-256 hash of a string using Web Crypto API.",
    "signature": "sha256(message: string): Promise<string>",
    "example": "sha256(...)",
    "output": "..."
  },
  {
    "id": "sha1",
    "name": "sha1",
    "module": "Crypto",
    "description": "Generates a SHA-1 hash of a string using Web Crypto API.",
    "signature": "sha1(message: string): Promise<string>",
    "example": "sha1(...)",
    "output": "..."
  },
  {
    "id": "sha384",
    "name": "sha384",
    "module": "Crypto",
    "description": "Generates a SHA-384 hash of a string using Web Crypto API.",
    "signature": "sha384(message: string): Promise<string>",
    "example": "sha384(...)",
    "output": "..."
  },
  {
    "id": "sha512",
    "name": "sha512",
    "module": "Crypto",
    "description": "Generates a SHA-512 hash of a string using Web Crypto API.",
    "signature": "sha512(message: string): Promise<string>",
    "example": "sha512(...)",
    "output": "..."
  },
  {
    "id": "hmacsha256",
    "name": "hmacSha256",
    "module": "Crypto",
    "description": "Generates an HMAC-SHA-256 signature for a message and a secret key using Web Crypto API.",
    "signature": "hmacSha256(message: string, secret: string): Promise<string>",
    "example": "hmacSha256(...)",
    "output": "..."
  },
  {
    "id": "randomint",
    "name": "randomInt",
    "module": "Crypto",
    "description": "Generates a cryptographically secure random integer between min and max (inclusive).",
    "signature": "randomInt(min: number, max: number): number",
    "example": "randomInt(...)",
    "output": "..."
  },
  {
    "id": "cyrb53",
    "name": "cyrb53",
    "module": "Crypto",
    "description": "Calculates a fast, 53-bit non-cryptographic string hash using the cyrb53 algorithm.",
    "signature": "cyrb53(str: string, seed = 0): number",
    "example": "cyrb53(...)",
    "output": "..."
  },
  {
    "id": "csvparse",
    "name": "csvParse",
    "module": "Csv",
    "description": "Parses a CSV/TSV string into an array of objects (if headers are present) or raw string arrays.",
    "signature": "csvParse( csv: string, options: CsvParseOptions =",
    "example": "csvParse(...)",
    "output": "..."
  },
  {
    "id": "csvstringify",
    "name": "csvStringify",
    "module": "Csv",
    "description": "Stringifies an array of objects or an array of arrays into a CSV/TSV table.",
    "signature": "csvStringify( data: any[], options: CsvStringifyOptions =",
    "example": "csvStringify(...)",
    "output": "..."
  },
  {
    "id": "isleapyear",
    "name": "isLeapYear",
    "module": "Date",
    "description": "Checks if a given year is a leap year.",
    "signature": "isLeapYear(year: number): boolean",
    "example": "isLeapYear(...)",
    "output": "..."
  },
  {
    "id": "daysinmonth",
    "name": "daysInMonth",
    "module": "Date",
    "description": "Returns the number of days in a given month (0-indexed: 0 = January, 11 = December).",
    "signature": "daysInMonth(year: number, month: number): number",
    "example": "daysInMonth(...)",
    "output": "..."
  },
  {
    "id": "diffindays",
    "name": "diffInDays",
    "module": "Date",
    "description": "Calculates the difference in days between two Date instances.",
    "signature": "diffInDays(date1: Date, date2: Date): number",
    "example": "diffInDays(...)",
    "output": "..."
  },
  {
    "id": "relativetime",
    "name": "relativeTime",
    "module": "Date",
    "description": "Formats a date relative to a base date (defaults to now) into a human-readable string.",
    "signature": "relativeTime(date: Date, baseDate = new Date()): string",
    "example": "relativeTime(...)",
    "output": "..."
  },
  {
    "id": "isvaliddate",
    "name": "isValidDate",
    "module": "Date",
    "description": "Checks if a value is a valid Date object.",
    "signature": "isValidDate(date: any): boolean",
    "example": "isValidDate(...)",
    "output": "..."
  },
  {
    "id": "adddays",
    "name": "addDays",
    "module": "Date",
    "description": "Adds a specified number of days to a date.",
    "signature": "addDays(date: Date, days: number): Date",
    "example": "addDays(...)",
    "output": "..."
  },
  {
    "id": "subdays",
    "name": "subDays",
    "module": "Date",
    "description": "Subtracts a specified number of days from a date.",
    "signature": "subDays(date: Date, days: number): Date",
    "example": "subDays(...)",
    "output": "..."
  },
  {
    "id": "addmonths",
    "name": "addMonths",
    "module": "Date",
    "description": "Adds a specified number of months to a date.",
    "signature": "addMonths(date: Date, months: number): Date",
    "example": "addMonths(...)",
    "output": "..."
  },
  {
    "id": "submonths",
    "name": "subMonths",
    "module": "Date",
    "description": "Subtracts a specified number of months from a date.",
    "signature": "subMonths(date: Date, months: number): Date",
    "example": "subMonths(...)",
    "output": "..."
  },
  {
    "id": "addyears",
    "name": "addYears",
    "module": "Date",
    "description": "Adds a specified number of years to a date.",
    "signature": "addYears(date: Date, years: number): Date",
    "example": "addYears(...)",
    "output": "..."
  },
  {
    "id": "subyears",
    "name": "subYears",
    "module": "Date",
    "description": "Subtracts a specified number of years from a date.",
    "signature": "subYears(date: Date, years: number): Date",
    "example": "subYears(...)",
    "output": "..."
  },
  {
    "id": "isbefore",
    "name": "isBefore",
    "module": "Date",
    "description": "Checks if the first date is before the second date.",
    "signature": "isBefore(date1: Date, date2: Date): boolean",
    "example": "isBefore(...)",
    "output": "..."
  },
  {
    "id": "isafter",
    "name": "isAfter",
    "module": "Date",
    "description": "Checks if the first date is after the second date.",
    "signature": "isAfter(date1: Date, date2: Date): boolean",
    "example": "isAfter(...)",
    "output": "..."
  },
  {
    "id": "issameday",
    "name": "isSameDay",
    "module": "Date",
    "description": "Checks if two dates are on the same calendar day.",
    "signature": "isSameDay(date1: Date, date2: Date): boolean",
    "example": "isSameDay(...)",
    "output": "..."
  },
  {
    "id": "isweekend",
    "name": "isWeekend",
    "module": "Date",
    "description": "Checks if a date falls on a weekend (Saturday or Sunday).",
    "signature": "isWeekend(date: Date): boolean",
    "example": "isWeekend(...)",
    "output": "..."
  },
  {
    "id": "startofday",
    "name": "startOfDay",
    "module": "Date",
    "description": "Returns a new date at the start of the given date's day (00:00:00.000).",
    "signature": "startOfDay(date: Date): Date",
    "example": "startOfDay(...)",
    "output": "..."
  },
  {
    "id": "endofday",
    "name": "endOfDay",
    "module": "Date",
    "description": "Returns a new date at the end of the given date's day (23:59:59.999).",
    "signature": "endOfDay(date: Date): Date",
    "example": "endOfDay(...)",
    "output": "..."
  },
  {
    "id": "startofmonth",
    "name": "startOfMonth",
    "module": "Date",
    "description": "Returns a new date at the start of the given date's month.",
    "signature": "startOfMonth(date: Date): Date",
    "example": "startOfMonth(...)",
    "output": "..."
  },
  {
    "id": "endofmonth",
    "name": "endOfMonth",
    "module": "Date",
    "description": "Returns a new date at the end of the given date's month.",
    "signature": "endOfMonth(date: Date): Date",
    "example": "endOfMonth(...)",
    "output": "..."
  },
  {
    "id": "formatdate",
    "name": "formatDate",
    "module": "Date",
    "description": "Simple wrapper for Intl.DateTimeFormat to format dates easily.",
    "signature": "formatDate( date: Date, options?",
    "example": "formatDate(...)",
    "output": "..."
  },
  {
    "id": "copytoclipboard",
    "name": "copyToClipboard",
    "module": "Dom",
    "description": "Safe client-side clipboard writer. Returns true if successful, false otherwise.",
    "signature": "copyToClipboard(text: string): Promise<boolean>",
    "example": "copyToClipboard(...)",
    "output": "..."
  },
  {
    "id": "getqueryparams",
    "name": "getQueryParams",
    "module": "Dom",
    "description": "Returns a key-value record of query parameters from a URL or window.location.",
    "signature": "getQueryParams(url?: string): Record<string, string>",
    "example": "getQueryParams(...)",
    "output": "..."
  },
  {
    "id": "scrolltotop",
    "name": "scrollToTop",
    "module": "Dom",
    "description": "Smoothly scrolls the window to the top.",
    "signature": "scrollToTop(): void",
    "example": "scrollToTop(...)",
    "output": "..."
  },
  {
    "id": "getscrollposition",
    "name": "getScrollPosition",
    "module": "Dom",
    "description": "Gets the current scroll position of the window.",
    "signature": "getScrollPosition()",
    "example": "getScrollPosition(...)",
    "output": "..."
  },
  {
    "id": "iselementvisible",
    "name": "isElementVisible",
    "module": "Dom",
    "description": "Checks if a given HTML element is currently visible within the viewport.",
    "signature": "isElementVisible(el: HTMLElement | null): boolean",
    "example": "isElementVisible(...)",
    "output": "..."
  },
  {
    "id": "addclass",
    "name": "addClass",
    "module": "Dom",
    "description": "Safely adds a CSS class to an element.",
    "signature": "addClass(el: HTMLElement | null, className: string): void",
    "example": "addClass(...)",
    "output": "..."
  },
  {
    "id": "removeclass",
    "name": "removeClass",
    "module": "Dom",
    "description": "Safely removes a CSS class from an element.",
    "signature": "removeClass(el: HTMLElement | null, className: string): void",
    "example": "removeClass(...)",
    "output": "..."
  },
  {
    "id": "toggleclass",
    "name": "toggleClass",
    "module": "Dom",
    "description": "Safely toggles a CSS class on an element.",
    "signature": "toggleClass(el: HTMLElement | null, className: string): void",
    "example": "toggleClass(...)",
    "output": "..."
  },
  {
    "id": "hasclass",
    "name": "hasClass",
    "module": "Dom",
    "description": "Checks if an element has a specific CSS class.",
    "signature": "hasClass(el: HTMLElement | null, className: string): boolean",
    "example": "hasClass(...)",
    "output": "..."
  },
  {
    "id": "createelement",
    "name": "createElement",
    "module": "Dom",
    "description": "Creates a DOM element with optional attributes and text content.",
    "signature": "createElement<K extends keyof HTMLElementTagNameMap>( tag: K, attributes?: Record<string, string>, text?: string ): HTMLElementTagNameMap[K] | null",
    "example": "createElement(...)",
    "output": "..."
  },
  {
    "id": "removeelement",
    "name": "removeElement",
    "module": "Dom",
    "description": "Safely removes an element from the DOM.",
    "signature": "removeElement(el: HTMLElement | null): void",
    "example": "removeElement(...)",
    "output": "..."
  },
  {
    "id": "setcookie",
    "name": "setCookie",
    "module": "Dom",
    "description": "Sets a cookie in the browser environment.",
    "signature": "setCookie(name: string, value: string, days?: number): void",
    "example": "setCookie(...)",
    "output": "..."
  },
  {
    "id": "getcookie",
    "name": "getCookie",
    "module": "Dom",
    "description": "Gets a cookie value by name in the browser environment.",
    "signature": "getCookie(name: string): string | null",
    "example": "getCookie(...)",
    "output": "..."
  },
  {
    "id": "deletecookie",
    "name": "deleteCookie",
    "module": "Dom",
    "description": "Deletes a cookie by name in the browser environment.",
    "signature": "deleteCookie(name: string): void",
    "example": "deleteCookie(...)",
    "output": "..."
  },
  {
    "id": "base64encode",
    "name": "base64Encode",
    "module": "Encoding",
    "description": "Encodes a string to Base64 format.",
    "signature": "base64Encode(str: string): string",
    "example": "base64Encode(...)",
    "output": "..."
  },
  {
    "id": "base64decode",
    "name": "base64Decode",
    "module": "Encoding",
    "description": "Decodes a Base64 string back to its original string format.",
    "signature": "base64Decode(str: string): string",
    "example": "base64Decode(...)",
    "output": "..."
  },
  {
    "id": "utf8encode",
    "name": "utf8Encode",
    "module": "Encoding",
    "description": "Encodes a string into a Uint8Array using UTF-8 encoding.",
    "signature": "utf8Encode(str: string): Uint8Array",
    "example": "utf8Encode(...)",
    "output": "..."
  },
  {
    "id": "utf8decode",
    "name": "utf8Decode",
    "module": "Encoding",
    "description": "Decodes a Uint8Array back into a string using UTF-8 decoding.",
    "signature": "utf8Decode(bytes: Uint8Array): string",
    "example": "utf8Decode(...)",
    "output": "..."
  },
  {
    "id": "hexencode",
    "name": "hexEncode",
    "module": "Encoding",
    "description": "Encodes a string into a Hexadecimal format.",
    "signature": "hexEncode(str: string): string",
    "example": "hexEncode(...)",
    "output": "..."
  },
  {
    "id": "hexdecode",
    "name": "hexDecode",
    "module": "Encoding",
    "description": "Decodes a Hexadecimal string back into its original string format.",
    "signature": "hexDecode(hexStr: string): string",
    "example": "hexDecode(...)",
    "output": "..."
  },
  {
    "id": "urlencode",
    "name": "urlEncode",
    "module": "Encoding",
    "description": "Safely encodes a URI component.",
    "signature": "urlEncode(str: string): string",
    "example": "urlEncode(...)",
    "output": "..."
  },
  {
    "id": "urldecode",
    "name": "urlDecode",
    "module": "Encoding",
    "description": "Safely decodes a URI component.",
    "signature": "urlDecode(str: string): string",
    "example": "urlDecode(...)",
    "output": "..."
  },
  {
    "id": "buffertohex",
    "name": "bufferToHex",
    "module": "Encoding",
    "description": "Converts a Uint8Array buffer into a hexadecimal string.",
    "signature": "bufferToHex(bytes: Uint8Array): string",
    "example": "bufferToHex(...)",
    "output": "..."
  },
  {
    "id": "hextobuffer",
    "name": "hexToBuffer",
    "module": "Encoding",
    "description": "Converts a hexadecimal string into a Uint8Array buffer.",
    "signature": "hexToBuffer(hexStr: string): Uint8Array",
    "example": "hexToBuffer(...)",
    "output": "..."
  },
  {
    "id": "listen",
    "name": "listen",
    "module": "Events",
    "description": "A lightweight, high-performance event emitter class for managing pub-sub events.",
    "signature": "listen( target: EventTarget, event: string, handler: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions ): () => void",
    "example": "listen(...)",
    "output": "..."
  },
  {
    "id": "listenonce",
    "name": "listenOnce",
    "module": "Events",
    "description": "Attaches a one-time event listener to a target. Returns a function to remove it early.",
    "signature": "listenOnce( target: EventTarget, event: string, handler: EventListener, options?: boolean | AddEventListenerOptions ): () => void",
    "example": "listenOnce(...)",
    "output": "..."
  },
  {
    "id": "triggerevent",
    "name": "triggerEvent",
    "module": "Events",
    "description": "Triggers a custom event on a target with optional detail payload.",
    "signature": "triggerEvent( target: EventTarget, eventName: string, detail?: any ): boolean",
    "example": "triggerEvent(...)",
    "output": "..."
  },
  {
    "id": "delegateevent",
    "name": "delegateEvent",
    "module": "Events",
    "description": "Attaches an event listener that delegates to a specific child selector.",
    "signature": "delegateEvent( target: HTMLElement | Document, event: string, selector: string, handler: (e: Event, matchedTarget: HTMLElement) => void, options?: boolean | AddEventListenerOptions ): () => void",
    "example": "delegateEvent(...)",
    "output": "..."
  },
  {
    "id": "waitforevent",
    "name": "waitForEvent",
    "module": "Events",
    "description": "Returns a promise that resolves when the specified event is fired on the target.",
    "signature": "waitForEvent( target: EventTarget, event: string, timeoutMs?: number ): Promise<Event>",
    "example": "waitForEvent(...)",
    "output": "..."
  },
  {
    "id": "stopevent",
    "name": "stopEvent",
    "module": "Events",
    "description": "Prevents the default action and stops event propagation.",
    "signature": "stopEvent(e: Event): void",
    "example": "stopEvent(...)",
    "output": "..."
  },
  {
    "id": "formatduration",
    "name": "formatDuration",
    "module": "Format",
    "description": "Formats a duration in milliseconds to a human-readable string.",
    "signature": "formatDuration(ms: number): string",
    "example": "formatDuration(...)",
    "output": "..."
  },
  {
    "id": "formatphonenumber",
    "name": "formatPhoneNumber",
    "module": "Format",
    "description": "Formats a US phone number string.",
    "signature": "formatPhoneNumber(phone: string): string",
    "example": "formatPhoneNumber(...)",
    "output": "..."
  },
  {
    "id": "formatcreditcardnumber",
    "name": "formatCreditCardNumber",
    "module": "Format",
    "description": "Formats a credit card number with spaces every 4 digits.",
    "signature": "formatCreditCardNumber(num: string): string",
    "example": "formatCreditCardNumber(...)",
    "output": "..."
  },
  {
    "id": "formatpercentage",
    "name": "formatPercentage",
    "module": "Format",
    "description": "Formats a number as a percentage string.",
    "signature": "formatPercentage(value: number, decimals: number = 0): string",
    "example": "formatPercentage(...)",
    "output": "..."
  },
  {
    "id": "formatlistjoin",
    "name": "formatListJoin",
    "module": "Format",
    "description": "Joins an array of strings with a conjunction before the last item.",
    "signature": "formatListJoin(items: string[], conjunction: string = \"and\"): string",
    "example": "formatListJoin(...)",
    "output": "..."
  },
  {
    "id": "pluralize",
    "name": "pluralize",
    "module": "Format",
    "description": "Returns a count with a properly pluralized noun.",
    "signature": "pluralize(count: number, singular: string, plural?: string): string",
    "example": "pluralize(...)",
    "output": "..."
  },
  {
    "id": "maskstring",
    "name": "maskString",
    "module": "Format",
    "description": "Masks a string, showing only the last N characters.",
    "signature": "maskString(str: string, visibleChars: number = 4, maskChar: string = \"*\"): string",
    "example": "maskString(...)",
    "output": "..."
  },
  {
    "id": "truncatemiddle",
    "name": "truncateMiddle",
    "module": "Format",
    "description": "Truncates a string in the middle, preserving the beginning and end.",
    "signature": "truncateMiddle(str: string, maxLen: number, separator: string = \"…\"): string",
    "example": "truncateMiddle(...)",
    "output": "..."
  },
  {
    "id": "formatwithseparator",
    "name": "formatWithSeparator",
    "module": "Format",
    "description": "Formats a number with a thousands separator.",
    "signature": "formatWithSeparator(num: number, separator: string = \",\"): string",
    "example": "formatWithSeparator(...)",
    "output": "..."
  },
  {
    "id": "identity",
    "name": "identity",
    "module": "Functional",
    "description": "Creates a function that returns its first argument.",
    "signature": "identity<T>(val: T): T",
    "example": "identity(...)",
    "output": "..."
  },
  {
    "id": "flip",
    "name": "flip",
    "module": "Functional",
    "description": "Creates a function that invokes the provided function with its arguments reversed.",
    "signature": "flip<T extends (...args: any[]) => any>(fn: T)",
    "example": "flip(...)",
    "output": "..."
  },
  {
    "id": "tap",
    "name": "tap",
    "module": "Functional",
    "description": "Invokes an interceptor function with a value, and then returns the value.",
    "signature": "tap<T>(val: T, interceptor: (val: T) => void): T",
    "example": "tap(...)",
    "output": "..."
  },
  {
    "id": "memoize",
    "name": "memoize",
    "module": "Functional",
    "description": "Creates a function that memoizes the result of a given function.",
    "signature": "memoize<T extends (...args: any[]) => any>( fn: T, resolver?: (...args: Parameters<T>) => any )",
    "example": "memoize(...)",
    "output": "..."
  },
  {
    "id": "pipe",
    "name": "pipe",
    "module": "Functional",
    "description": "Performs left-to-right function composition.",
    "signature": "pipe(...fns: Array<(...args: any[]) => any>)",
    "example": "pipe(...)",
    "output": "..."
  },
  {
    "id": "compose",
    "name": "compose",
    "module": "Functional",
    "description": "Performs right-to-left function composition.",
    "signature": "compose(...fns: Array<(...args: any[]) => any>)",
    "example": "compose(...)",
    "output": "..."
  },
  {
    "id": "curry",
    "name": "curry",
    "module": "Functional",
    "description": "Creates a curried function.",
    "signature": "curry(fn: (...args: any[]) => any, arity = fn.length)",
    "example": "curry(...)",
    "output": "..."
  },
  {
    "id": "partial",
    "name": "partial",
    "module": "Functional",
    "description": "Creates a function that invokes fn with partials prepended to the arguments it receives.",
    "signature": "partial(fn: (...args: any[]) => any, ...partials: any[])",
    "example": "partial(...)",
    "output": "..."
  },
  {
    "id": "noop",
    "name": "noop",
    "module": "Functional",
    "description": "A no-operation function that does nothing.",
    "signature": "noop(): void",
    "example": "noop(...)",
    "output": "..."
  },
  {
    "id": "constant",
    "name": "constant",
    "module": "Functional",
    "description": "Creates a function that always returns the same value.",
    "signature": "constant<T>(val: T): () => T",
    "example": "constant(...)",
    "output": "..."
  },
  {
    "id": "not",
    "name": "not",
    "module": "Functional",
    "description": "Creates a function that negates the result of a predicate.",
    "signature": "not<T extends (...args: any[]) => any>( fn: T ): (...args: Parameters<T>) => boolean",
    "example": "not(...)",
    "output": "..."
  },
  {
    "id": "trampoline",
    "name": "trampoline",
    "module": "Functional",
    "description": "Trampoline for stack-safe recursion.",
    "signature": "trampoline<T>(fn: (...args: any[]) => T | (() => T)): (...args: any[]) => T",
    "example": "trampoline(...)",
    "output": "..."
  },
  {
    "id": "juxt",
    "name": "juxt",
    "module": "Functional",
    "description": "Applies multiple functions to the same arguments and returns an array of results.",
    "signature": "juxt<T extends any[]>( ...fns: Array<(...args: T) => any> ): (...args: T) => any[]",
    "example": "juxt(...)",
    "output": "..."
  },
  {
    "id": "oncefn",
    "name": "onceFn",
    "module": "Functional",
    "description": "Creates a function that is restricted to being called only once.",
    "signature": "onceFn<T extends (...args: any[]) => any>(fn: T): T",
    "example": "onceFn(...)",
    "output": "..."
  },
  {
    "id": "distance2d",
    "name": "distance2D",
    "module": "Geometry",
    "description": "Calculates the Euclidean distance between two 2D points.",
    "signature": "distance2D(x1: number, y1: number, x2: number, y2: number): number",
    "example": "distance2D(...)",
    "output": "..."
  },
  {
    "id": "distance3d",
    "name": "distance3D",
    "module": "Geometry",
    "description": "Calculates the Euclidean distance between two 3D points.",
    "signature": "distance3D(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): number",
    "example": "distance3D(...)",
    "output": "..."
  },
  {
    "id": "midpoint",
    "name": "midpoint",
    "module": "Geometry",
    "description": "Calculates the midpoint between two 2D points.",
    "signature": "midpoint(x1: number, y1: number, x2: number, y2: number)",
    "example": "midpoint(...)",
    "output": "..."
  },
  {
    "id": "anglebetween",
    "name": "angleBetween",
    "module": "Geometry",
    "description": "Calculates the angle in radians between two 2D points.",
    "signature": "angleBetween(x1: number, y1: number, x2: number, y2: number): number",
    "example": "angleBetween(...)",
    "output": "..."
  },
  {
    "id": "rotatepoint",
    "name": "rotatePoint",
    "module": "Geometry",
    "description": "Rotates a 2D point around an origin point by a given angle in radians.",
    "signature": "rotatePoint( px: number, py: number, cx: number, cy: number, angleRadians: number )",
    "example": "rotatePoint(...)",
    "output": "..."
  },
  {
    "id": "circlearea",
    "name": "circleArea",
    "module": "Geometry",
    "description": "Calculates the area of a circle given its radius.",
    "signature": "circleArea(radius: number): number",
    "example": "circleArea(...)",
    "output": "..."
  },
  {
    "id": "circlecircumference",
    "name": "circleCircumference",
    "module": "Geometry",
    "description": "Calculates the circumference of a circle given its radius.",
    "signature": "circleCircumference(radius: number): number",
    "example": "circleCircumference(...)",
    "output": "..."
  },
  {
    "id": "rectanglearea",
    "name": "rectangleArea",
    "module": "Geometry",
    "description": "Calculates the area of a rectangle.",
    "signature": "rectangleArea(width: number, height: number): number",
    "example": "rectangleArea(...)",
    "output": "..."
  },
  {
    "id": "trianglearea",
    "name": "triangleArea",
    "module": "Geometry",
    "description": "Calculates the area of a triangle given its base and height.",
    "signature": "triangleArea(base: number, height: number): number",
    "example": "triangleArea(...)",
    "output": "..."
  },
  {
    "id": "safejsonparse",
    "name": "safeJsonParse",
    "module": "Guard",
    "description": "Safely parses a JSON string. Returns the parsed value or the fallback on failure.",
    "signature": "safeJsonParse<T = any>(str: string, fallback?: T): T | null",
    "example": "safeJsonParse(...)",
    "output": "..."
  },
  {
    "id": "safejsonstringify",
    "name": "safeJsonStringify",
    "module": "Guard",
    "description": "Safely stringifies a value to JSON. Handles circular references gracefully.",
    "signature": "safeJsonStringify(val: any, fallback?: string): string",
    "example": "safeJsonStringify(...)",
    "output": "..."
  },
  {
    "id": "safeparseint",
    "name": "safeParseInt",
    "module": "Guard",
    "description": "Safely parses an integer. Returns the fallback (default 0) if parsing fails or produces NaN.",
    "signature": "safeParseInt(val: string, fallback: number = 0, radix: number = 10): number",
    "example": "safeParseInt(...)",
    "output": "..."
  },
  {
    "id": "safeparsefloat",
    "name": "safeParseFloat",
    "module": "Guard",
    "description": "Safely parses a float. Returns the fallback (default 0) if parsing fails or produces NaN.",
    "signature": "safeParseFloat(val: string, fallback: number = 0): number",
    "example": "safeParseFloat(...)",
    "output": "..."
  },
  {
    "id": "safeparsedate",
    "name": "safeParseDate",
    "module": "Guard",
    "description": "Safely parses a date string. Returns the fallback or null if parsing fails.",
    "signature": "safeParseDate(val: string, fallback?: Date): Date | null",
    "example": "safeParseDate(...)",
    "output": "..."
  },
  {
    "id": "coalesce",
    "name": "coalesce",
    "module": "Guard",
    "description": "Returns the first non-null and non-undefined value from the arguments.",
    "signature": "coalesce<T>(...values: (T | null | undefined)[]): T | undefined",
    "example": "coalesce(...)",
    "output": "..."
  },
  {
    "id": "attempt",
    "name": "attempt",
    "module": "Guard",
    "description": "Wraps a synchronous function call in a try/catch. Returns the fallback on failure.",
    "signature": "attempt<T>(fn: () => T, fallback?: T): T | undefined",
    "example": "attempt(...)",
    "output": "..."
  },
  {
    "id": "attemptasync",
    "name": "attemptAsync",
    "module": "Guard",
    "description": "Wraps an asynchronous function call in a try/catch. Returns the fallback on failure.",
    "signature": "attemptAsync<T>(fn: () => Promise<T>, fallback?: T): Promise<T | undefined>",
    "example": "attemptAsync(...)",
    "output": "..."
  },
  {
    "id": "invariant",
    "name": "invariant",
    "module": "Guard",
    "description": "Asserts that a condition is true. Throws an error with the given message if not.",
    "signature": "invariant(condition: boolean, message: string): asserts condition",
    "example": "invariant(...)",
    "output": "..."
  },
  {
    "id": "assertdefined",
    "name": "assertDefined",
    "module": "Guard",
    "description": "Asserts that a value is not null or undefined. Throws if it is.",
    "signature": "assertDefined<T>(val: T | null | undefined, name?: string): T",
    "example": "assertDefined(...)",
    "output": "..."
  },
  {
    "id": "assertnever",
    "name": "assertNever",
    "module": "Guard",
    "description": "Used for exhaustive checks in switch statements. Throws if called.",
    "signature": "assertNever(val: never): never",
    "example": "assertNever(...)",
    "output": "..."
  },
  {
    "id": "withdefault",
    "name": "withDefault",
    "module": "Guard",
    "description": "Returns the value if it is not null/undefined, otherwise returns the default value.",
    "signature": "withDefault<T>(val: T | null | undefined, defaultVal: T): T",
    "example": "withDefault(...)",
    "output": "..."
  },
  {
    "id": "fetchwithtimeout",
    "name": "fetchWithTimeout",
    "module": "Http",
    "description": "Isomorphic network utility functions for fetch-based requests.",
    "signature": "fetchWithTimeout( url: string, timeoutMs: number, options?: RequestInit ): Promise<Response>",
    "example": "fetchWithTimeout(...)",
    "output": "..."
  },
  {
    "id": "fetchwithretry",
    "name": "fetchWithRetry",
    "module": "Http",
    "description": "Performs a fetch request with a specified number of retries and a delay between attempts.",
    "signature": "fetchWithRetry( url: string, options: RequestInit &",
    "example": "fetchWithRetry(...)",
    "output": "..."
  },
  {
    "id": "fetchjson",
    "name": "fetchJson",
    "module": "Http",
    "description": "Safely fetches a URL and parses it as JSON. Supports timeout.",
    "signature": "fetchJson<T = any>( url: string, options: RequestInit &",
    "example": "fetchJson(...)",
    "output": "..."
  },
  {
    "id": "isnetworkerror",
    "name": "isNetworkError",
    "module": "Http",
    "description": "Type guard to check if an error is a network/connection failure or timeout.",
    "signature": "isNetworkError(err: any): boolean",
    "example": "isNetworkError(...)",
    "output": "..."
  },
  {
    "id": "parseheaders",
    "name": "parseHeaders",
    "module": "Http",
    "description": "Converts standard fetch HeadersInit into a clean key-value object representation.",
    "signature": "parseHeaders(headers?: HeadersInit): Record<string, string>",
    "example": "parseHeaders(...)",
    "output": "..."
  },
  {
    "id": "jsonclone",
    "name": "jsonClone",
    "module": "Json",
    "description": "Creates a fast JSON-based deep clone of a value.",
    "signature": "jsonClone<T>(obj: T): T",
    "example": "jsonClone(...)",
    "output": "..."
  },
  {
    "id": "jsonflatten",
    "name": "jsonFlatten",
    "module": "Json",
    "description": "Flattens a nested object or array into a single-level object with dot-notation and bracket-notation paths.",
    "signature": "jsonFlatten(obj: any, prefix = \"\"): Record<string, any>",
    "example": "jsonFlatten(...)",
    "output": "..."
  },
  {
    "id": "jsonunflatten",
    "name": "jsonUnflatten",
    "module": "Json",
    "description": "Reconstructs a flattened object (created by jsonFlatten) back into its nested structure.",
    "signature": "jsonUnflatten(flat: Record<string, any>): any",
    "example": "jsonUnflatten(...)",
    "output": "..."
  },
  {
    "id": "jsonpath",
    "name": "jsonPath",
    "module": "Json",
    "description": "Queries nested values in an object using path strings (e.g. \"users[0].address.city\").",
    "signature": "jsonPath(obj: any, pathStr: string, fallback?: any): any",
    "example": "jsonPath(...)",
    "output": "..."
  },
  {
    "id": "jsonmerge",
    "name": "jsonMerge",
    "module": "Json",
    "description": "Performs a deep merge of two JSON-serializable structures.",
    "signature": "jsonMerge(target: any, source: any): any",
    "example": "jsonMerge(...)",
    "output": "..."
  },
  {
    "id": "jsondiff",
    "name": "jsonDiff",
    "module": "Json",
    "description": "Computes structured differences between two JSON-serializable structures.",
    "signature": "jsonDiff(obj1: any, obj2: any): Record<string, JsonDiffEntry>",
    "example": "jsonDiff(...)",
    "output": "..."
  },
  {
    "id": "registershortcut",
    "name": "registerShortcut",
    "module": "Keyboard",
    "description": "Registers a global or target-specific keyboard shortcut listener.",
    "signature": "registerShortcut( shortcut: string, callback: (e: KeyboardEvent) => void, options: ShortcutOptions =",
    "example": "registerShortcut(...)",
    "output": "..."
  },
  {
    "id": "iskeypressed",
    "name": "isKeyPressed",
    "module": "Keyboard",
    "description": "Checks if a specific keyboard key is currently pressed down.",
    "signature": "isKeyPressed(key: string): boolean",
    "example": "isKeyPressed(...)",
    "output": "..."
  },
  {
    "id": "createlogger",
    "name": "createLogger",
    "module": "Log",
    "description": "Creates a customizable console logger with level-based filtering and optional color styling.",
    "signature": "createLogger(options: LoggerOptions =",
    "example": "createLogger(...)",
    "output": "..."
  },
  {
    "id": "clamp",
    "name": "clamp",
    "module": "Math",
    "description": "Clamps a number between a minimum and maximum value.",
    "signature": "clamp(val: number, min: number, max: number): number",
    "example": "clamp(...)",
    "output": "..."
  },
  {
    "id": "lerp",
    "name": "lerp",
    "module": "Math",
    "description": "Linearly interpolates between two numbers.",
    "signature": "lerp(start: number, end: number, amt: number): number",
    "example": "lerp(...)",
    "output": "..."
  },
  {
    "id": "random",
    "name": "random",
    "module": "Math",
    "description": "Generates a random number in a given range.",
    "signature": "random(min: number, max: number, float = false): number",
    "example": "random(...)",
    "output": "..."
  },
  {
    "id": "round",
    "name": "round",
    "module": "Math",
    "description": "Rounds a number to a specified decimal precision.",
    "signature": "round(val: number, precision = 0): number",
    "example": "round(...)",
    "output": "..."
  },
  {
    "id": "sum",
    "name": "sum",
    "module": "Math",
    "description": "Returns the sum of an array of numbers.",
    "signature": "sum(nums: number[]): number",
    "example": "sum(...)",
    "output": "..."
  },
  {
    "id": "mean",
    "name": "mean",
    "module": "Math",
    "description": "Returns the average (mean) of an array of numbers.",
    "signature": "mean(nums: number[]): number",
    "example": "mean(...)",
    "output": "..."
  },
  {
    "id": "median",
    "name": "median",
    "module": "Math",
    "description": "Returns the median value of an array of numbers.",
    "signature": "median(nums: number[]): number",
    "example": "median(...)",
    "output": "..."
  },
  {
    "id": "standarddeviation",
    "name": "standardDeviation",
    "module": "Math",
    "description": "Returns the standard deviation of an array of numbers.",
    "signature": "standardDeviation(nums: number[], population = false): number",
    "example": "standardDeviation(...)",
    "output": "..."
  },
  {
    "id": "percentage",
    "name": "percentage",
    "module": "Math",
    "description": "Calculates the percentage of a value relative to a total.",
    "signature": "percentage( value: number, total: number, options?",
    "example": "percentage(...)",
    "output": "..."
  },
  {
    "id": "inrange",
    "name": "inRange",
    "module": "Math",
    "description": "Checks whether a number falls within a range [min, max].",
    "signature": "inRange( val: number, min: number, max: number, exclusive = false ): boolean",
    "example": "inRange(...)",
    "output": "..."
  },
  {
    "id": "max",
    "name": "max",
    "module": "Math",
    "description": "Computes the maximum value of array. If array is empty or falsey, undefined is returned.",
    "signature": "max(nums: number[]): number | undefined",
    "example": "max(...)",
    "output": "..."
  },
  {
    "id": "min",
    "name": "min",
    "module": "Math",
    "description": "Computes the minimum value of array. If array is empty or falsey, undefined is returned.",
    "signature": "min(nums: number[]): number | undefined",
    "example": "min(...)",
    "output": "..."
  },
  {
    "id": "add",
    "name": "add",
    "module": "Math",
    "description": "Adds two numbers.",
    "signature": "add(augend: number, addend: number): number",
    "example": "add(...)",
    "output": "..."
  },
  {
    "id": "subtract",
    "name": "subtract",
    "module": "Math",
    "description": "Subtracts subtrahend from minuend.",
    "signature": "subtract(minuend: number, subtrahend: number): number",
    "example": "subtract(...)",
    "output": "..."
  },
  {
    "id": "multiply",
    "name": "multiply",
    "module": "Math",
    "description": "Multiplies two numbers.",
    "signature": "multiply(multiplier: number, multiplicand: number): number",
    "example": "multiply(...)",
    "output": "..."
  },
  {
    "id": "divide",
    "name": "divide",
    "module": "Math",
    "description": "Divides two numbers.",
    "signature": "divide(dividend: number, divisor: number): number",
    "example": "divide(...)",
    "output": "..."
  },
  {
    "id": "ceil",
    "name": "ceil",
    "module": "Math",
    "description": "Computes number rounded up to precision.",
    "signature": "ceil(val: number, precision = 0): number",
    "example": "ceil(...)",
    "output": "..."
  },
  {
    "id": "floor",
    "name": "floor",
    "module": "Math",
    "description": "Computes number rounded down to precision.",
    "signature": "floor(val: number, precision = 0): number",
    "example": "floor(...)",
    "output": "..."
  },
  {
    "id": "factorial",
    "name": "factorial",
    "module": "Math",
    "description": "Calculates the factorial of a non-negative integer n.",
    "signature": "factorial(n: number): number",
    "example": "factorial(...)",
    "output": "..."
  },
  {
    "id": "fibonacci",
    "name": "fibonacci",
    "module": "Math",
    "description": "Returns the nth Fibonacci number.",
    "signature": "fibonacci(n: number): number",
    "example": "fibonacci(...)",
    "output": "..."
  },
  {
    "id": "isprime",
    "name": "isPrime",
    "module": "Math",
    "description": "Checks if a number is a prime number.",
    "signature": "isPrime(n: number): boolean",
    "example": "isPrime(...)",
    "output": "..."
  },
  {
    "id": "maprange",
    "name": "mapRange",
    "module": "Math",
    "description": "Re-maps a number from one range to another.",
    "signature": "mapRange( val: number, inMin: number, inMax: number, outMin: number, outMax: number ): number",
    "example": "mapRange(...)",
    "output": "..."
  },
  {
    "id": "distance",
    "name": "distance",
    "module": "Math",
    "description": "Calculates the Euclidean distance between two points in 2D or 3D space.",
    "signature": "distance( p1",
    "example": "distance(...)",
    "output": "..."
  },
  {
    "id": "dotproduct",
    "name": "dotProduct",
    "module": "Math",
    "description": "Calculates the dot product of two vectors of equal length.",
    "signature": "dotProduct(vecA: number[], vecB: number[]): number",
    "example": "dotProduct(...)",
    "output": "..."
  },
  {
    "id": "euclideandistance",
    "name": "euclideanDistance",
    "module": "Math",
    "description": "Calculates the Euclidean distance between two numeric vectors.",
    "signature": "euclideanDistance(vecA: number[], vecB: number[]): number",
    "example": "euclideanDistance(...)",
    "output": "..."
  },
  {
    "id": "cosinesimilarity",
    "name": "cosineSimilarity",
    "module": "Math",
    "description": "Calculates the cosine similarity between two numeric vectors.",
    "signature": "cosineSimilarity(vecA: number[], vecB: number[]): number",
    "example": "cosineSimilarity(...)",
    "output": "..."
  },
  {
    "id": "gcd",
    "name": "gcd",
    "module": "Math",
    "description": "Calculates the Greatest Common Divisor (GCD) of two integers using Euclid's algorithm.",
    "signature": "gcd(a: number, b: number): number",
    "example": "gcd(...)",
    "output": "..."
  },
  {
    "id": "lcm",
    "name": "lcm",
    "module": "Math",
    "description": "Calculates the Least Common Multiple (LCM) of two integers.",
    "signature": "lcm(a: number, b: number): number",
    "example": "lcm(...)",
    "output": "..."
  },
  {
    "id": "power",
    "name": "power",
    "module": "Math",
    "description": "Returns base raised to exponent power.",
    "signature": "power(base: number, exponent: number): number",
    "example": "power(...)",
    "output": "..."
  },
  {
    "id": "abs",
    "name": "abs",
    "module": "Math",
    "description": "Returns absolute value of a number.",
    "signature": "abs(val: number): number",
    "example": "abs(...)",
    "output": "..."
  },
  {
    "id": "sign",
    "name": "sign",
    "module": "Math",
    "description": "Returns 1 for positive, -1 for negative, 0 for zero.",
    "signature": "sign(val: number): number",
    "example": "sign(...)",
    "output": "..."
  },
  {
    "id": "hypot",
    "name": "hypot",
    "module": "Math",
    "description": "Calculates square root of sum of squares of arguments.",
    "signature": "hypot(...values: number[]): number",
    "example": "hypot(...)",
    "output": "..."
  },
  {
    "id": "formatcurrency",
    "name": "formatCurrency",
    "module": "Number",
    "description": "Formats a number as a currency string.",
    "signature": "formatCurrency( val: number, currency = \"USD\", locale = \"en-US\" ): string",
    "example": "formatCurrency(...)",
    "output": "..."
  },
  {
    "id": "formatbytes",
    "name": "formatBytes",
    "module": "Number",
    "description": "Formats bytes into a human-readable size string (e.g., \"10.5 KB\", \"2.4 MB\").",
    "signature": "formatBytes(bytes: number, decimals = 2): string",
    "example": "formatBytes(...)",
    "output": "..."
  },
  {
    "id": "formatnumber",
    "name": "formatNumber",
    "module": "Number",
    "description": "Formats a number with locale-aware thousands separators and optional decimal places.",
    "signature": "formatNumber( val: number, options?",
    "example": "formatNumber(...)",
    "output": "..."
  },
  {
    "id": "formatcompact",
    "name": "formatCompact",
    "module": "Number",
    "description": "Formats a number in compact notation (e.g. 1000 → \"1K\", 1_500_000 → \"1.5M\").",
    "signature": "formatCompact( val: number, options?",
    "example": "formatCompact(...)",
    "output": "..."
  },
  {
    "id": "toordinal",
    "name": "toOrdinal",
    "module": "Number",
    "description": "Converts an integer to its ordinal string representation.",
    "signature": "toOrdinal(n: number): string",
    "example": "toOrdinal(...)",
    "output": "..."
  },
  {
    "id": "iseven",
    "name": "isEven",
    "module": "Number",
    "description": "Checks if a number is even.",
    "signature": "isEven(n: number): boolean",
    "example": "isEven(...)",
    "output": "..."
  },
  {
    "id": "isodd",
    "name": "isOdd",
    "module": "Number",
    "description": "Checks if a number is odd.",
    "signature": "isOdd(n: number): boolean",
    "example": "isOdd(...)",
    "output": "..."
  },
  {
    "id": "ispositive",
    "name": "isPositive",
    "module": "Number",
    "description": "Checks if a number is positive (greater than zero).",
    "signature": "isPositive(n: number): boolean",
    "example": "isPositive(...)",
    "output": "..."
  },
  {
    "id": "isnegative",
    "name": "isNegative",
    "module": "Number",
    "description": "Checks if a number is negative (less than zero).",
    "signature": "isNegative(n: number): boolean",
    "example": "isNegative(...)",
    "output": "..."
  },
  {
    "id": "isfloat",
    "name": "isFloat",
    "module": "Number",
    "description": "Checks if a value is a float (a number with a decimal part).",
    "signature": "isFloat(n: number): boolean",
    "example": "isFloat(...)",
    "output": "..."
  },
  {
    "id": "isinteger",
    "name": "isInteger",
    "module": "Number",
    "description": "Checks if a value is an integer.",
    "signature": "isInteger(n: number): boolean",
    "example": "isInteger(...)",
    "output": "..."
  },
  {
    "id": "parsenumber",
    "name": "parseNumber",
    "module": "Number",
    "description": "Parses a string to a number, returning a default value if NaN.",
    "signature": "parseNumber(val: any, fallback = 0): number",
    "example": "parseNumber(...)",
    "output": "..."
  },
  {
    "id": "tosafeinteger",
    "name": "toSafeInteger",
    "module": "Number",
    "description": "Converts a value to a safe integer.",
    "signature": "toSafeInteger(val: any): number",
    "example": "toSafeInteger(...)",
    "output": "..."
  },
  {
    "id": "roundtonearest",
    "name": "roundToNearest",
    "module": "Number",
    "description": "Rounds a number to the nearest multiple of a given step.",
    "signature": "roundToNearest(val: number, step: number): number",
    "example": "roundToNearest(...)",
    "output": "..."
  },
  {
    "id": "topercentage",
    "name": "toPercentage",
    "module": "Number",
    "description": "Converts a number to a percentage string.",
    "signature": "toPercentage(val: number, decimals = 0): string",
    "example": "toPercentage(...)",
    "output": "..."
  },
  {
    "id": "clampnumber",
    "name": "clampNumber",
    "module": "Number",
    "description": "Restricts a number between a minimum and maximum value.",
    "signature": "clampNumber(val: number, min: number, max: number): number",
    "example": "clampNumber(...)",
    "output": "..."
  },
  {
    "id": "isperfectsquare",
    "name": "isPerfectSquare",
    "module": "Number",
    "description": "Checks if a given number is a perfect square.",
    "signature": "isPerfectSquare(n: number): boolean",
    "example": "isPerfectSquare(...)",
    "output": "..."
  },
  {
    "id": "formatfilesize",
    "name": "formatFileSize",
    "module": "Number",
    "description": "Alias for formatBytes - Formats bytes into a human-readable size string.",
    "signature": "formatFileSize(bytes: number, decimals = 2): string",
    "example": "formatFileSize(...)",
    "output": "..."
  },
  {
    "id": "pick",
    "name": "pick",
    "module": "Object",
    "description": "Creates a new object composed of the picked object properties.",
    "signature": "pick<T extends object, K extends keyof T>( obj: T, keys: K[] ): Pick<T, K>",
    "example": "pick(...)",
    "output": "..."
  },
  {
    "id": "omit",
    "name": "omit",
    "module": "Object",
    "description": "Creates a new object omitting specified keys.",
    "signature": "omit<T extends object, K extends keyof T>( obj: T, keys: K[] ): Omit<T, K>",
    "example": "omit(...)",
    "output": "..."
  },
  {
    "id": "get",
    "name": "get",
    "module": "Object",
    "description": "Safely gets a nested property value from an object using a dot-path string or array of keys.",
    "signature": "get( obj: any, path: string | string[], defaultValue?: any ): any",
    "example": "get(...)",
    "output": "..."
  },
  {
    "id": "deepclone",
    "name": "deepClone",
    "module": "Object",
    "description": "Creates a deep copy of a value (handles Dates, RegExps, Arrays, and Plain Objects).",
    "signature": "deepClone<T>(val: T): T",
    "example": "deepClone(...)",
    "output": "..."
  },
  {
    "id": "deepmerge",
    "name": "deepMerge",
    "module": "Object",
    "description": "Deeply merges multiple source objects into a target object.",
    "signature": "deepMerge(target: any, ...sources: any[]): any",
    "example": "deepMerge(...)",
    "output": "..."
  },
  {
    "id": "flattenobject",
    "name": "flattenObject",
    "module": "Object",
    "description": "Flattens a nested object into a single-level object with dot-path keys.",
    "signature": "flattenObject( obj: Record<string, any>, options?",
    "example": "flattenObject(...)",
    "output": "..."
  },
  {
    "id": "set",
    "name": "set",
    "module": "Object",
    "description": "Safely sets a nested value in an object using a dot-path string.",
    "signature": "set(obj: any, path: string, value: any): any",
    "example": "set(...)",
    "output": "..."
  },
  {
    "id": "mapkeys",
    "name": "mapKeys",
    "module": "Object",
    "description": "Creates a new object by mapping keys through a transform function.",
    "signature": "mapKeys<T>( obj: Record<string, T>, iteratee: (key: string, val: T) => string ): Record<string, T>",
    "example": "mapKeys(...)",
    "output": "..."
  },
  {
    "id": "mapvalues",
    "name": "mapValues",
    "module": "Object",
    "description": "Creates a new object by mapping values through a transform function.",
    "signature": "mapValues<T, U>( obj: Record<string, T>, iteratee: (val: T, key: string) => U ): Record<string, U>",
    "example": "mapValues(...)",
    "output": "..."
  },
  {
    "id": "has",
    "name": "has",
    "module": "Object",
    "description": "Checks if a path exists in an object.",
    "signature": "has(obj: any, path: string | string[]): boolean",
    "example": "has(...)",
    "output": "..."
  },
  {
    "id": "isequal",
    "name": "isEqual",
    "module": "Object",
    "description": "Performs a deep comparison between two values to determine if they are equivalent.",
    "signature": "isEqual(value: any, other: any): boolean",
    "example": "isEqual(...)",
    "output": "..."
  },
  {
    "id": "size",
    "name": "size",
    "module": "Object",
    "description": "Gets the size of a collection (array, string, object).",
    "signature": "size(collection: any): number",
    "example": "size(...)",
    "output": "..."
  },
  {
    "id": "invert",
    "name": "invert",
    "module": "Object",
    "description": "Creates an object composed of the inverted keys and values of object.",
    "signature": "invert(obj: Record<string, string | number>): Record<string, string>",
    "example": "invert(...)",
    "output": "..."
  },
  {
    "id": "topairs",
    "name": "toPairs",
    "module": "Object",
    "description": "Creates an array of the own enumerable string keyed property key-value pairs of object.",
    "signature": "toPairs<T>(obj: Record<string, T>): [string, T][]",
    "example": "toPairs(...)",
    "output": "..."
  },
  {
    "id": "frompairs",
    "name": "fromPairs",
    "module": "Object",
    "description": "Creates an object from an array of key-value pairs.",
    "signature": "fromPairs<T>(pairs: [string, T][]): Record<string, T>",
    "example": "fromPairs(...)",
    "output": "..."
  },
  {
    "id": "clone",
    "name": "clone",
    "module": "Object",
    "description": "Creates a shallow clone of value.",
    "signature": "clone<T>(val: T): T",
    "example": "clone(...)",
    "output": "..."
  },
  {
    "id": "pickby",
    "name": "pickBy",
    "module": "Object",
    "description": "Creates an object composed of the object properties predicate returns truthy for.",
    "signature": "pickBy<T extends object>( obj: T, predicate: (value: T[keyof T], key: keyof T) => boolean ): Partial<T>",
    "example": "pickBy(...)",
    "output": "..."
  },
  {
    "id": "omitby",
    "name": "omitBy",
    "module": "Object",
    "description": "Creates an object composed of the object properties predicate does not return truthy for.",
    "signature": "omitBy<T extends object>( obj: T, predicate: (value: T[keyof T], key: keyof T) => boolean ): Partial<T>",
    "example": "omitBy(...)",
    "output": "..."
  },
  {
    "id": "findkey",
    "name": "findKey",
    "module": "Object",
    "description": "Returns the key of the first element predicate returns truthy for.",
    "signature": "findKey<T extends object>( obj: T, predicate: (value: T[keyof T], key: keyof T) => boolean ): keyof T | undefined",
    "example": "findKey(...)",
    "output": "..."
  },
  {
    "id": "findlastkey",
    "name": "findLastKey",
    "module": "Object",
    "description": "Returns the key of the last element predicate returns truthy for.",
    "signature": "findLastKey<T extends object>( obj: T, predicate: (value: T[keyof T], key: keyof T) => boolean ): keyof T | undefined",
    "example": "findLastKey(...)",
    "output": "..."
  },
  {
    "id": "forown",
    "name": "forOwn",
    "module": "Object",
    "description": "Iterates over own enumerable string keyed properties of an object and invokes iteratee for each property.",
    "signature": "forOwn<T extends object>( obj: T, iteratee: (value: T[keyof T], key: keyof T) => void ): void",
    "example": "forOwn(...)",
    "output": "..."
  },
  {
    "id": "invoke",
    "name": "invoke",
    "module": "Object",
    "description": "Invokes the method at path of object.",
    "signature": "invoke(obj: any, path: string | string[], ...args: any[]): any",
    "example": "invoke(...)",
    "output": "..."
  },
  {
    "id": "keys",
    "name": "keys",
    "module": "Object",
    "description": "Wrapper for Object.keys",
    "signature": "keys(obj: any): string[]",
    "example": "keys(...)",
    "output": "..."
  },
  {
    "id": "values",
    "name": "values",
    "module": "Object",
    "description": "Wrapper for Object.values",
    "signature": "values<T>(obj: Record<string, T>): T[]",
    "example": "values(...)",
    "output": "..."
  },
  {
    "id": "entries",
    "name": "entries",
    "module": "Object",
    "description": "Wrapper for Object.entries",
    "signature": "entries<T>(obj: Record<string, T>): [string, T][]",
    "example": "entries(...)",
    "output": "..."
  },
  {
    "id": "fromentries",
    "name": "fromEntries",
    "module": "Object",
    "description": "Creates an object from an array of key-value pairs.",
    "signature": "fromEntries<K extends PropertyKey, V>( entriesList: [K, V][] ): Record<K, V>",
    "example": "fromEntries(...)",
    "output": "..."
  },
  {
    "id": "isempty",
    "name": "isEmpty",
    "module": "Object",
    "description": "Checks if a value is empty (empty object, array, string, map, set, or null/undefined).",
    "signature": "isEmpty(val: any): boolean",
    "example": "isEmpty(...)",
    "output": "..."
  },
  {
    "id": "defaults",
    "name": "defaults",
    "module": "Object",
    "description": "Assigns own and inherited enumerable string keyed properties of source objects to the destination object for all destination properties that resolve to undefined.",
    "signature": "defaults<T extends Record<string, any>>( target: T, ...sources: Record<string, any>[] ): T",
    "example": "defaults(...)",
    "output": "..."
  },
  {
    "id": "filterkeys",
    "name": "filterKeys",
    "module": "Object",
    "description": "Filters an object's properties based on key predicate.",
    "signature": "filterKeys<T extends Record<string, any>>( obj: T, predicate: (key: keyof T) => boolean ): Partial<T>",
    "example": "filterKeys(...)",
    "output": "..."
  },
  {
    "id": "filtervalues",
    "name": "filterValues",
    "module": "Object",
    "description": "Filters an object's properties based on value predicate.",
    "signature": "filterValues<T extends Record<string, any>>( obj: T, predicate: (val: T[keyof T]) => boolean ): Partial<T>",
    "example": "filterValues(...)",
    "output": "..."
  },
  {
    "id": "compactobject",
    "name": "compactObject",
    "module": "Object",
    "description": "Removes null, undefined, and empty string values from an object.",
    "signature": "compactObject<T extends Record<string, any>>(obj: T): Partial<T>",
    "example": "compactObject(...)",
    "output": "..."
  },
  {
    "id": "randomuuid",
    "name": "randomUUID",
    "module": "Random",
    "description": "Generates a random UUID (v4) using the native crypto API.",
    "signature": "randomUUID(): string",
    "example": "randomUUID(...)",
    "output": "..."
  },
  {
    "id": "randomcolor",
    "name": "randomColor",
    "module": "Random",
    "description": "Generates a random hex color string.",
    "signature": "randomColor(): string",
    "example": "randomColor(...)",
    "output": "..."
  },
  {
    "id": "randomboolean",
    "name": "randomBoolean",
    "module": "Random",
    "description": "Returns a random boolean value.",
    "signature": "randomBoolean(): boolean",
    "example": "randomBoolean(...)",
    "output": "..."
  },
  {
    "id": "randomfloat",
    "name": "randomFloat",
    "module": "Random",
    "description": "Generates a random floating-point number between min and max (inclusive of min, exclusive of max).",
    "signature": "randomFloat(min: number, max: number): number",
    "example": "randomFloat(...)",
    "output": "..."
  },
  {
    "id": "randomitem",
    "name": "randomItem",
    "module": "Random",
    "description": "Returns a random item from an array.",
    "signature": "randomItem<T>(arr: T[]): T | undefined",
    "example": "randomItem(...)",
    "output": "..."
  },
  {
    "id": "randomintfast",
    "name": "randomIntFast",
    "module": "Random",
    "description": "Generates a random integer between min and max (inclusive) using Math.random (non-cryptographically secure).",
    "signature": "randomIntFast(min: number, max: number): number",
    "example": "randomIntFast(...)",
    "output": "..."
  },
  {
    "id": "randomstring",
    "name": "randomString",
    "module": "Random",
    "description": "Generates a random alphanumeric string of a given length.",
    "signature": "randomString(length: number, charset?: string): string",
    "example": "randomString(...)",
    "output": "..."
  },
  {
    "id": "randomsample",
    "name": "randomSample",
    "module": "Random",
    "description": "Returns N unique random items from an array (no repeats).",
    "signature": "randomSample<T>(arr: T[], n: number): T[]",
    "example": "randomSample(...)",
    "output": "..."
  },
  {
    "id": "weightedrandom",
    "name": "weightedRandom",
    "module": "Random",
    "description": "Selects a random item from a weighted list.",
    "signature": "weightedRandom<T>(items",
    "example": "weightedRandom(...)",
    "output": "..."
  },
  {
    "id": "validate",
    "name": "validate",
    "module": "Schema",
    "description": "Validates a single value against an array of rules.",
    "signature": "validate(val: any, rules: Rule[]): ValidationResult",
    "example": "validate(...)",
    "output": "..."
  },
  {
    "id": "isvalid",
    "name": "isValid",
    "module": "Schema",
    "description": "Checks if a value is valid against a list of rules (returns boolean).",
    "signature": "isValid(val: any, rules: Rule[]): boolean",
    "example": "isValid(...)",
    "output": "..."
  },
  {
    "id": "validateobject",
    "name": "validateObject",
    "module": "Schema",
    "description": "Validates an object against a schema of fields and their rules.",
    "signature": "validateObject( obj: Record<string, any>, schema: Record<string, Rule[]> ): ObjectValidationResult",
    "example": "validateObject(...)",
    "output": "..."
  },
  {
    "id": "required",
    "name": "required",
    "module": "Schema",
    "description": "Rule: Value must be present (not null, undefined, or empty string).",
    "signature": "required(msg?: string): Rule",
    "example": "required(...)",
    "output": "..."
  },
  {
    "id": "minlength",
    "name": "minLength",
    "module": "Schema",
    "description": "Rule: Value must have a minimum length (works for strings and arrays).",
    "signature": "minLength(len: number, msg?: string): Rule",
    "example": "minLength(...)",
    "output": "..."
  },
  {
    "id": "maxlength",
    "name": "maxLength",
    "module": "Schema",
    "description": "Rule: Value must have a maximum length (works for strings and arrays).",
    "signature": "maxLength(len: number, msg?: string): Rule",
    "example": "maxLength(...)",
    "output": "..."
  },
  {
    "id": "pattern",
    "name": "pattern",
    "module": "Schema",
    "description": "Rule: Value must match the regex pattern.",
    "signature": "pattern(regex: RegExp, msg?: string): Rule",
    "example": "pattern(...)",
    "output": "..."
  },
  {
    "id": "minvalue",
    "name": "minValue",
    "module": "Schema",
    "description": "Rule: Value must be >= limit.",
    "signature": "minValue(limit: number, msg?: string): Rule",
    "example": "minValue(...)",
    "output": "..."
  },
  {
    "id": "maxvalue",
    "name": "maxValue",
    "module": "Schema",
    "description": "Rule: Value must be <= limit.",
    "signature": "maxValue(limit: number, msg?: string): Rule",
    "example": "maxValue(...)",
    "output": "..."
  },
  {
    "id": "isin",
    "name": "isIn",
    "module": "Schema",
    "description": "Rule: Value must be one of the allowed values.",
    "signature": "isIn(allowed: any[], msg?: string): Rule",
    "example": "isIn(...)",
    "output": "..."
  },
  {
    "id": "istype",
    "name": "isType",
    "module": "Schema",
    "description": "Rule: Value must match the expected type.",
    "signature": "isType( expected: \"string\" | \"number\" | \"boolean\" | \"object\" | \"array\" | \"function\", msg?: string ): Rule",
    "example": "isType(...)",
    "output": "..."
  },
  {
    "id": "custom",
    "name": "custom",
    "module": "Schema",
    "description": "Rule: Value must satisfy a custom predicate.",
    "signature": "custom(fn: (val: any) => boolean, msg?: string): Rule",
    "example": "custom(...)",
    "output": "..."
  },
  {
    "id": "semverparse",
    "name": "semverParse",
    "module": "Semver",
    "description": "Parses a semantic version string into a SemVer object.",
    "signature": "semverParse(version: string): SemVer | null",
    "example": "semverParse(...)",
    "output": "..."
  },
  {
    "id": "semverclean",
    "name": "semverClean",
    "module": "Semver",
    "description": "Cleans the semantic version string, stripping leading \"v\" or whitespace.",
    "signature": "semverClean(version: string): string | null",
    "example": "semverClean(...)",
    "output": "..."
  },
  {
    "id": "semverisvalid",
    "name": "semverIsValid",
    "module": "Semver",
    "description": "Checks if a string is a valid SemVer format.",
    "signature": "semverIsValid(version: string): boolean",
    "example": "semverIsValid(...)",
    "output": "..."
  },
  {
    "id": "semvercompare",
    "name": "semverCompare",
    "module": "Semver",
    "description": "Compares two semantic version strings.",
    "signature": "semverCompare(v1: string, v2: string): number",
    "example": "semverCompare(...)",
    "output": "..."
  },
  {
    "id": "semversatisfies",
    "name": "semverSatisfies",
    "module": "Semver",
    "description": "Checks if a version satisfies a range expression (e.g. \"^1.2.3\", \">=1.0.0 <2.0.0\", \"~1.0.0 || ^2.0.0\").",
    "signature": "semverSatisfies(version: string, range: string): boolean",
    "example": "semverSatisfies(...)",
    "output": "..."
  },
  {
    "id": "mode",
    "name": "mode",
    "module": "Statistics",
    "description": "Returns the most frequently occurring value(s) in an array.",
    "signature": "mode(nums: number[]): number[]",
    "example": "mode(...)",
    "output": "..."
  },
  {
    "id": "variance",
    "name": "variance",
    "module": "Statistics",
    "description": "Calculates the variance of a dataset.",
    "signature": "variance(nums: number[], population = false): number",
    "example": "variance(...)",
    "output": "..."
  },
  {
    "id": "percentile",
    "name": "percentile",
    "module": "Statistics",
    "description": "Calculates the p-th percentile of an array of numbers.",
    "signature": "percentile(nums: number[], p: number): number",
    "example": "percentile(...)",
    "output": "..."
  },
  {
    "id": "quartiles",
    "name": "quartiles",
    "module": "Statistics",
    "description": "Returns the 1st (25%), 2nd (50%/median), and 3rd (75%) quartiles of an array.",
    "signature": "quartiles(nums: number[])",
    "example": "quartiles(...)",
    "output": "..."
  },
  {
    "id": "zscore",
    "name": "zScore",
    "module": "Statistics",
    "description": "Calculates the z-score for a specific value given a dataset.",
    "signature": "zScore(value: number, nums: number[], population = false): number",
    "example": "zScore(...)",
    "output": "..."
  },
  {
    "id": "covariance",
    "name": "covariance",
    "module": "Statistics",
    "description": "Calculates the covariance between two equally-sized arrays of numbers.",
    "signature": "covariance(nums1: number[], nums2: number[], population = false): number",
    "example": "covariance(...)",
    "output": "..."
  },
  {
    "id": "correlation",
    "name": "correlation",
    "module": "Statistics",
    "description": "Calculates the Pearson correlation coefficient between two arrays.",
    "signature": "correlation(nums1: number[], nums2: number[], population = false): number",
    "example": "correlation(...)",
    "output": "..."
  },
  {
    "id": "skewness",
    "name": "skewness",
    "module": "Statistics",
    "description": "Calculates the skewness (asymmetry) of a dataset.",
    "signature": "skewness(nums: number[]): number",
    "example": "skewness(...)",
    "output": "..."
  },
  {
    "id": "kurtosis",
    "name": "kurtosis",
    "module": "Statistics",
    "description": "Calculates the excess kurtosis (tailedness) of a dataset.",
    "signature": "kurtosis(nums: number[]): number",
    "example": "kurtosis(...)",
    "output": "..."
  },
  {
    "id": "movingaverage",
    "name": "movingAverage",
    "module": "Statistics",
    "description": "Calculates the simple moving average of an array with a given window size.",
    "signature": "movingAverage(nums: number[], windowSize: number): number[]",
    "example": "movingAverage(...)",
    "output": "..."
  },
  {
    "id": "weightedaverage",
    "name": "weightedAverage",
    "module": "Statistics",
    "description": "Calculates the weighted average of values with corresponding weights.",
    "signature": "weightedAverage(values: number[], weights: number[]): number",
    "example": "weightedAverage(...)",
    "output": "..."
  },
  {
    "id": "geometricmean",
    "name": "geometricMean",
    "module": "Statistics",
    "description": "Calculates the geometric mean of an array of positive numbers.",
    "signature": "geometricMean(nums: number[]): number",
    "example": "geometricMean(...)",
    "output": "..."
  },
  {
    "id": "signal",
    "name": "signal",
    "module": "Store",
    "description": "Creates a reactive signal primitive that tracks dependencies and propagates changes.",
    "signature": "signal<T>(initialValue: T): Signal<T>",
    "example": "signal(...)",
    "output": "..."
  },
  {
    "id": "computed",
    "name": "computed",
    "module": "Store",
    "description": "Creates a derived reactive computation that caches values and updates automatically when dependencies change.",
    "signature": "computed<T>(fn: () => T): Computed<T>",
    "example": "computed(...)",
    "output": "..."
  },
  {
    "id": "effect",
    "name": "effect",
    "module": "Store",
    "description": "Runs a side-effect function that automatically re-runs whenever any read signal changes.",
    "signature": "effect(fn: () => void): () => void",
    "example": "effect(...)",
    "output": "..."
  },
  {
    "id": "createstore",
    "name": "createStore",
    "module": "Store",
    "description": "Creates a lightweight state store using a publish-subscribe model (Zustand style).",
    "signature": "createStore<T extends Record<string, any>>(initialState: T): Store<T>",
    "example": "createStore(...)",
    "output": "..."
  },
  {
    "id": "capitalize",
    "name": "capitalize",
    "module": "String",
    "description": "Splits a string into an array of words (handling camelCase, snake_case, spaces, etc.).",
    "signature": "capitalize(str: string): string",
    "example": "capitalize(...)",
    "output": "..."
  },
  {
    "id": "slugify",
    "name": "slugify",
    "module": "String",
    "description": "Converts a string into a URL-friendly slug with customization options.",
    "signature": "slugify( str: string, options?",
    "example": "slugify(...)",
    "output": "..."
  },
  {
    "id": "truncate",
    "name": "truncate",
    "module": "String",
    "description": "Truncates a string to a specified length with customizable separator and suffix.",
    "signature": "truncate( str: string, length: number, options?: string |",
    "example": "truncate(...)",
    "output": "..."
  },
  {
    "id": "camelcase",
    "name": "camelCase",
    "module": "String",
    "description": "Converts a string to camelCase.",
    "signature": "camelCase(str: string): string",
    "example": "camelCase(...)",
    "output": "..."
  },
  {
    "id": "kebabcase",
    "name": "kebabCase",
    "module": "String",
    "description": "Converts a string to kebab-case.",
    "signature": "kebabCase(str: string): string",
    "example": "kebabCase(...)",
    "output": "..."
  },
  {
    "id": "snakecase",
    "name": "snakeCase",
    "module": "String",
    "description": "Converts a string to snake_case.",
    "signature": "snakeCase(str: string): string",
    "example": "snakeCase(...)",
    "output": "..."
  },
  {
    "id": "escapehtml",
    "name": "escapeHtml",
    "module": "String",
    "description": "Escapes HTML characters: &, <, >, \", and ' in a string.",
    "signature": "escapeHtml(str: string): string",
    "example": "escapeHtml(...)",
    "output": "..."
  },
  {
    "id": "unescapehtml",
    "name": "unescapeHtml",
    "module": "String",
    "description": "Unescapes HTML entities back to characters.",
    "signature": "unescapeHtml(str: string): string",
    "example": "unescapeHtml(...)",
    "output": "..."
  },
  {
    "id": "striphtml",
    "name": "stripHtml",
    "module": "String",
    "description": "Removes all HTML tags from a string.",
    "signature": "stripHtml(str: string): string",
    "example": "stripHtml(...)",
    "output": "..."
  },
  {
    "id": "wordcount",
    "name": "wordCount",
    "module": "String",
    "description": "Counts the number of words in a string.",
    "signature": "wordCount(str: string): number",
    "example": "wordCount(...)",
    "output": "..."
  },
  {
    "id": "pad",
    "name": "pad",
    "module": "String",
    "description": "Pads a string to a target length with a fill character.",
    "signature": "pad( str: string, length: number, options?",
    "example": "pad(...)",
    "output": "..."
  },
  {
    "id": "repeat",
    "name": "repeat",
    "module": "String",
    "description": "Repeats a string a given number of times with an optional separator.",
    "signature": "repeat(str: string, count: number, separator = \"\"): string",
    "example": "repeat(...)",
    "output": "..."
  },
  {
    "id": "reversewords",
    "name": "reverseWords",
    "module": "String",
    "description": "Reverses the order of words in a string.",
    "signature": "reverseWords(str: string): string",
    "example": "reverseWords(...)",
    "output": "..."
  },
  {
    "id": "titlecase",
    "name": "titleCase",
    "module": "String",
    "description": "Converts a string to Title Case.",
    "signature": "titleCase( str: string, options?",
    "example": "titleCase(...)",
    "output": "..."
  },
  {
    "id": "countoccurrences",
    "name": "countOccurrences",
    "module": "String",
    "description": "Counts how many times a substring appears in a string.",
    "signature": "countOccurrences( str: string, sub: string, options?",
    "example": "countOccurrences(...)",
    "output": "..."
  },
  {
    "id": "interpolate",
    "name": "interpolate",
    "module": "String",
    "description": "Interpolates template variables in a string using a data object.",
    "signature": "interpolate( template: string, data: Record<string, any>, options?",
    "example": "interpolate(\"Hello {{name}}!\", { name: \"Mohit\" })",
    "output": "\"Hello Mohit!\""
  },
  {
    "id": "pascalcase",
    "name": "pascalCase",
    "module": "String",
    "description": "Converts a string to PascalCase.",
    "signature": "pascalCase(str: string): string",
    "example": "pascalCase(...)",
    "output": "..."
  },
  {
    "id": "swapcase",
    "name": "swapCase",
    "module": "String",
    "description": "Swaps the casing of each character in a string.",
    "signature": "swapCase(str: string): string",
    "example": "swapCase(...)",
    "output": "..."
  },
  {
    "id": "trimall",
    "name": "trimAll",
    "module": "String",
    "description": "Removes all whitespace characters from a string.",
    "signature": "trimAll(str: string): string",
    "example": "trimAll(...)",
    "output": "..."
  },
  {
    "id": "chars",
    "name": "chars",
    "module": "String",
    "description": "Splits a string into an array of its characters.",
    "signature": "chars(str: string): string[]",
    "example": "chars(...)",
    "output": "..."
  },
  {
    "id": "chop",
    "name": "chop",
    "module": "String",
    "description": "Chops a string into pieces of a specific length.",
    "signature": "chop(str: string, step: number): string[]",
    "example": "chop(...)",
    "output": "..."
  },
  {
    "id": "endswithany",
    "name": "endsWithAny",
    "module": "String",
    "description": "Checks if a string ends with any of the provided suffixes.",
    "signature": "endsWithAny(str: string, suffixes: string[]): boolean",
    "example": "endsWithAny(...)",
    "output": "..."
  },
  {
    "id": "startswithany",
    "name": "startsWithAny",
    "module": "String",
    "description": "Checks if a string starts with any of the provided prefixes.",
    "signature": "startsWithAny(str: string, prefixes: string[]): boolean",
    "example": "startsWithAny(...)",
    "output": "..."
  },
  {
    "id": "insert",
    "name": "insert",
    "module": "String",
    "description": "Inserts a substring at a specific index.",
    "signature": "insert(str: string, index: number, sub: string): string",
    "example": "insert(...)",
    "output": "..."
  },
  {
    "id": "reverse",
    "name": "reverse",
    "module": "String",
    "description": "Reverses the characters in a string.",
    "signature": "reverse(str: string): string",
    "example": "reverse(...)",
    "output": "..."
  },
  {
    "id": "mask",
    "name": "mask",
    "module": "String",
    "description": "Masks a string with a character, leaving some characters visible.",
    "signature": "mask( str: string, maskChar = \"*\", visibleStart = 0, visibleEnd = 4 ): string",
    "example": "mask(...)",
    "output": "..."
  },
  {
    "id": "removenonwords",
    "name": "removeNonWords",
    "module": "String",
    "description": "Removes all non-word characters (everything except a-z, A-Z, 0-9, and _).",
    "signature": "removeNonWords(str: string): string",
    "example": "removeNonWords(...)",
    "output": "..."
  },
  {
    "id": "isblank",
    "name": "isBlank",
    "module": "String",
    "description": "Checks if a string is empty or contains only whitespace.",
    "signature": "isBlank(str: string): boolean",
    "example": "isBlank(...)",
    "output": "..."
  },
  {
    "id": "islower",
    "name": "isLower",
    "module": "String",
    "description": "Checks if a string is entirely lowercase.",
    "signature": "isLower(str: string): boolean",
    "example": "isLower(...)",
    "output": "..."
  },
  {
    "id": "isupper",
    "name": "isUpper",
    "module": "String",
    "description": "Checks if a string is entirely uppercase.",
    "signature": "isUpper(str: string): boolean",
    "example": "isUpper(...)",
    "output": "..."
  },
  {
    "id": "surround",
    "name": "surround",
    "module": "String",
    "description": "Surrounds a string with a prefix and suffix.",
    "signature": "surround(str: string, wrapper: string): string",
    "example": "surround(...)",
    "output": "..."
  },
  {
    "id": "ispalindrome",
    "name": "isPalindrome",
    "module": "String",
    "description": "Checks if a string is a palindrome.",
    "signature": "isPalindrome( str: string, options?",
    "example": "isPalindrome(...)",
    "output": "..."
  },
  {
    "id": "collapsewhitespace",
    "name": "collapseWhitespace",
    "module": "String",
    "description": "Collapses multiple consecutive whitespace characters into a single space and trims the result.",
    "signature": "collapseWhitespace(str: string): string",
    "example": "collapseWhitespace(...)",
    "output": "..."
  },
  {
    "id": "dotcase",
    "name": "dotCase",
    "module": "String",
    "description": "Converts a string to dot.case.",
    "signature": "dotCase(str: string): string",
    "example": "dotCase(...)",
    "output": "..."
  },
  {
    "id": "headercase",
    "name": "headerCase",
    "module": "String",
    "description": "Converts a string to Header-Case (Title-Kebab-Case).",
    "signature": "headerCase(str: string): string",
    "example": "headerCase(...)",
    "output": "..."
  },
  {
    "id": "ensureprefix",
    "name": "ensurePrefix",
    "module": "String",
    "description": "Ensures a string starts with the given prefix.",
    "signature": "ensurePrefix(str: string, prefix: string): string",
    "example": "ensurePrefix(...)",
    "output": "..."
  },
  {
    "id": "ensuresuffix",
    "name": "ensureSuffix",
    "module": "String",
    "description": "Ensures a string ends with the given suffix.",
    "signature": "ensureSuffix(str: string, suffix: string): string",
    "example": "ensureSuffix(...)",
    "output": "..."
  },
  {
    "id": "stripprefix",
    "name": "stripPrefix",
    "module": "String",
    "description": "Removes a prefix from the start of a string if present.",
    "signature": "stripPrefix(str: string, prefix: string): string",
    "example": "stripPrefix(...)",
    "output": "..."
  },
  {
    "id": "stripsuffix",
    "name": "stripSuffix",
    "module": "String",
    "description": "Removes a suffix from the end of a string if present.",
    "signature": "stripSuffix(str: string, suffix: string): string",
    "example": "stripSuffix(...)",
    "output": "..."
  },
  {
    "id": "lines",
    "name": "lines",
    "module": "String",
    "description": "Splits a multi-line string into an array of individual lines.",
    "signature": "lines(str: string): string[]",
    "example": "lines(...)",
    "output": "..."
  },
  {
    "id": "unlines",
    "name": "unlines",
    "module": "String",
    "description": "Joins an array of line strings into a single multi-line string.",
    "signature": "unlines(linesArr: string[]): string",
    "example": "unlines(...)",
    "output": "..."
  },
  {
    "id": "levenshteindistance",
    "name": "levenshteinDistance",
    "module": "String",
    "description": "Computes the Levenshtein distance (edit distance) between two strings.",
    "signature": "levenshteinDistance(a: string, b: string): number",
    "example": "levenshteinDistance(...)",
    "output": "..."
  },
  {
    "id": "stringsimilarity",
    "name": "stringSimilarity",
    "module": "String",
    "description": "Calculates string similarity score between 0 and 1 using Levenshtein distance.",
    "signature": "stringSimilarity(a: string, b: string): number",
    "example": "stringSimilarity(...)",
    "output": "..."
  },
  {
    "id": "getfileextension",
    "name": "getFileExtension",
    "module": "String",
    "description": "Extracts the file extension from a filename or path.",
    "signature": "getFileExtension(filename: string): string",
    "example": "getFileExtension(...)",
    "output": "..."
  },
  {
    "id": "getfilename",
    "name": "getFileName",
    "module": "String",
    "description": "Extracts the filename without its extension.",
    "signature": "getFileName(filename: string): string",
    "example": "getFileName(...)",
    "output": "..."
  },
  {
    "id": "render",
    "name": "render",
    "module": "Template",
    "description": "Renders a logic-less template string by interpolating data, loops, and conditionals.",
    "signature": "render(template: string, data: Record<string, any>): string",
    "example": "render(...)",
    "output": "..."
  },
  {
    "id": "compile",
    "name": "compile",
    "module": "Template",
    "description": "Pre-compiles a template string into a reusable rendering function for faster execution.",
    "signature": "compile( template: string ): (data: Record<string, any>) => string",
    "example": "compile(...)",
    "output": "..."
  },
  {
    "id": "arraytotree",
    "name": "arrayToTree",
    "module": "Tree",
    "description": "Converts a flat array of items with parent-child relationships into a nested tree structure.",
    "signature": "arrayToTree( list: FlatNode[], options",
    "example": "arrayToTree(...)",
    "output": "..."
  },
  {
    "id": "treetoarray",
    "name": "treeToArray",
    "module": "Tree",
    "description": "Flattens a nested tree structure back into a flat array of nodes.",
    "signature": "treeToArray( tree: TreeNode[], options",
    "example": "treeToArray(...)",
    "output": "..."
  },
  {
    "id": "celsiustofahrenheit",
    "name": "celsiusToFahrenheit",
    "module": "Units",
    "description": "Converts Celsius to Fahrenheit.",
    "signature": "celsiusToFahrenheit(c: number): number",
    "example": "celsiusToFahrenheit(...)",
    "output": "..."
  },
  {
    "id": "fahrenheittocelsius",
    "name": "fahrenheitToCelsius",
    "module": "Units",
    "description": "Converts Fahrenheit to Celsius.",
    "signature": "fahrenheitToCelsius(f: number): number",
    "example": "fahrenheitToCelsius(...)",
    "output": "..."
  },
  {
    "id": "milestokilometers",
    "name": "milesToKilometers",
    "module": "Units",
    "description": "Converts miles to kilometers.",
    "signature": "milesToKilometers(miles: number): number",
    "example": "milesToKilometers(...)",
    "output": "..."
  },
  {
    "id": "kilometerstomiles",
    "name": "kilometersToMiles",
    "module": "Units",
    "description": "Converts kilometers to miles.",
    "signature": "kilometersToMiles(km: number): number",
    "example": "kilometersToMiles(...)",
    "output": "..."
  },
  {
    "id": "poundstokilograms",
    "name": "poundsToKilograms",
    "module": "Units",
    "description": "Converts pounds to kilograms.",
    "signature": "poundsToKilograms(lbs: number): number",
    "example": "poundsToKilograms(...)",
    "output": "..."
  },
  {
    "id": "kilogramstopounds",
    "name": "kilogramsToPounds",
    "module": "Units",
    "description": "Converts kilograms to pounds.",
    "signature": "kilogramsToPounds(kg: number): number",
    "example": "kilogramsToPounds(...)",
    "output": "..."
  },
  {
    "id": "degreestoradians",
    "name": "degreesToRadians",
    "module": "Units",
    "description": "Converts degrees to radians.",
    "signature": "degreesToRadians(degrees: number): number",
    "example": "degreesToRadians(...)",
    "output": "..."
  },
  {
    "id": "radianstodegrees",
    "name": "radiansToDegrees",
    "module": "Units",
    "description": "Converts radians to degrees.",
    "signature": "radiansToDegrees(radians: number): number",
    "example": "radiansToDegrees(...)",
    "output": "..."
  },
  {
    "id": "joinpaths",
    "name": "joinPaths",
    "module": "Url",
    "description": "Joins multiple path segments safely without creating duplicate forward slashes.",
    "signature": "joinPaths(...parts: string[]): string",
    "example": "joinPaths(...)",
    "output": "..."
  },
  {
    "id": "parseurl",
    "name": "parseUrl",
    "module": "Url",
    "description": "Parses a URL string into structured parts. Falls back gracefully for malformed strings.",
    "signature": "parseUrl(urlStr: string)",
    "example": "parseUrl(...)",
    "output": "..."
  },
  {
    "id": "stringifyquery",
    "name": "stringifyQuery",
    "module": "Url",
    "description": "Converts a key-value object into a URL query string (e.g. \"?a=1&b=2\").",
    "signature": "stringifyQuery(query: Record<string, string | number | boolean>): string",
    "example": "stringifyQuery(...)",
    "output": "..."
  },
  {
    "id": "buildurl",
    "name": "buildUrl",
    "module": "Url",
    "description": "Constructs a full URL string given a base URL and an object of query parameters.",
    "signature": "buildUrl(baseUrl: string, query?: Record<string, string | number | boolean>): string",
    "example": "buildUrl(...)",
    "output": "..."
  },
  {
    "id": "isabsoluteurl",
    "name": "isAbsoluteUrl",
    "module": "Url",
    "description": "Checks whether a given string is an absolute URL (contains a protocol).",
    "signature": "isAbsoluteUrl(urlStr: string): boolean",
    "example": "isAbsoluteUrl(...)",
    "output": "..."
  },
  {
    "id": "getbaseurl",
    "name": "getBaseUrl",
    "module": "Url",
    "description": "Extracts the base URL (protocol + host) from a full URL string.",
    "signature": "getBaseUrl(urlStr: string): string",
    "example": "getBaseUrl(...)",
    "output": "..."
  },
  {
    "id": "removequery",
    "name": "removeQuery",
    "module": "Url",
    "description": "Removes all query parameters and hash fragments from a URL.",
    "signature": "removeQuery(urlStr: string): string",
    "example": "removeQuery(...)",
    "output": "..."
  },
  {
    "id": "addqueryparam",
    "name": "addQueryParam",
    "module": "Url",
    "description": "Adds or updates query parameters in an existing URL string.",
    "signature": "addQueryParam(urlStr: string, key: string | Record<string, string | number | boolean>, value?: string | number | boolean): string",
    "example": "addQueryParam(...)",
    "output": "..."
  },
  {
    "id": "isemail",
    "name": "isEmail",
    "module": "Validate",
    "description": "Validates whether a string is a properly formatted email.",
    "signature": "isEmail(val: string): boolean",
    "example": "isEmail(...)",
    "output": "..."
  },
  {
    "id": "isurl",
    "name": "isUrl",
    "module": "Validate",
    "description": "Validates whether a string is a valid absolute URL.",
    "signature": "isUrl(val: string): boolean",
    "example": "isUrl(...)",
    "output": "..."
  },
  {
    "id": "isuuid",
    "name": "isUuid",
    "module": "Validate",
    "description": "Validates whether a string is a standard UUID (v1-v5).",
    "signature": "isUuid(val: string): boolean",
    "example": "isUuid(...)",
    "output": "..."
  },
  {
    "id": "isphone",
    "name": "isPhone",
    "module": "Validate",
    "description": "Validates whether a string is a valid standard phone number pattern.",
    "signature": "isPhone(val: string): boolean",
    "example": "isPhone(...)",
    "output": "..."
  },
  {
    "id": "isstrongpassword",
    "name": "isStrongPassword",
    "module": "Validate",
    "description": "Validates password strength (minimum 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char).",
    "signature": "isStrongPassword(val: string): boolean",
    "example": "isStrongPassword(...)",
    "output": "..."
  },
  {
    "id": "isip",
    "name": "isIP",
    "module": "Validate",
    "description": "Validates whether a string is a valid IPv4 or IPv6 address.",
    "signature": "isIP(val: string, version?: \"4\" | \"6\"): boolean",
    "example": "isIP(...)",
    "output": "..."
  },
  {
    "id": "isdatevalid",
    "name": "isDateValid",
    "module": "Validate",
    "description": "Validates whether a string represents a valid, parseable calendar date.",
    "signature": "isDateValid(val: string): boolean",
    "example": "isDateValid(...)",
    "output": "..."
  },
  {
    "id": "isalpha",
    "name": "isAlpha",
    "module": "Validate",
    "description": "Validates whether a string contains only alphabetic characters.",
    "signature": "isAlpha(val: string): boolean",
    "example": "isAlpha(...)",
    "output": "..."
  },
  {
    "id": "isalphanumeric",
    "name": "isAlphanumeric",
    "module": "Validate",
    "description": "Validates whether a string contains only alphanumeric characters.",
    "signature": "isAlphanumeric(val: string): boolean",
    "example": "isAlphanumeric(...)",
    "output": "..."
  },
  {
    "id": "isnumeric",
    "name": "isNumeric",
    "module": "Validate",
    "description": "Validates whether a string contains only numbers.",
    "signature": "isNumeric(val: string): boolean",
    "example": "isNumeric(...)",
    "output": "..."
  },
  {
    "id": "ishexcolor",
    "name": "isHexColor",
    "module": "Validate",
    "description": "Validates whether a string is a valid Hex Color code.",
    "signature": "isHexColor(val: string): boolean",
    "example": "isHexColor(...)",
    "output": "..."
  },
  {
    "id": "isbase64",
    "name": "isBase64",
    "module": "Validate",
    "description": "Validates whether a string is valid Base64 encoding.",
    "signature": "isBase64(val: string): boolean",
    "example": "isBase64(...)",
    "output": "..."
  },
  {
    "id": "isjson",
    "name": "isJSON",
    "module": "Validate",
    "description": "Validates whether a string is valid JSON.",
    "signature": "isJSON(val: string): boolean",
    "example": "isJSON(...)",
    "output": "..."
  },
  {
    "id": "isjwt",
    "name": "isJWT",
    "module": "Validate",
    "description": "Validates whether a string is a valid JWT token.",
    "signature": "isJWT(val: string): boolean",
    "example": "isJWT(...)",
    "output": "..."
  },
  {
    "id": "iscreditcard",
    "name": "isCreditCard",
    "module": "Validate",
    "description": "Validates whether a string represents a valid Credit Card number using the Luhn algorithm.",
    "signature": "isCreditCard(val: string): boolean",
    "example": "isCreditCard(...)",
    "output": "..."
  },
  {
    "id": "ismacaddress",
    "name": "isMacAddress",
    "module": "Validate",
    "description": "Validates whether a string is a valid MAC address.",
    "signature": "isMacAddress(val: string): boolean",
    "example": "isMacAddress(...)",
    "output": "..."
  },
  {
    "id": "isascii",
    "name": "isAscii",
    "module": "Validate",
    "description": "Validates whether a string contains only ASCII characters.",
    "signature": "isAscii(val: string): boolean",
    "example": "isAscii(...)",
    "output": "..."
  },
  {
    "id": "isbooleanstring",
    "name": "isBooleanString",
    "module": "Validate",
    "description": "Validates whether a string represents a boolean (\"true\", \"false\", \"1\", \"0\").",
    "signature": "isBooleanString(val: string): boolean",
    "example": "isBooleanString(...)",
    "output": "..."
  },
  {
    "id": "isdatauri",
    "name": "isDataURI",
    "module": "Validate",
    "description": "Validates whether a string is a valid Data URI.",
    "signature": "isDataURI(val: string): boolean",
    "example": "isDataURI(...)",
    "output": "..."
  },
  {
    "id": "isport",
    "name": "isPort",
    "module": "Validate",
    "description": "Validates whether a value is a valid port number.",
    "signature": "isPort(val: string | number): boolean",
    "example": "isPort(...)",
    "output": "..."
  },
  {
    "id": "issemver",
    "name": "isSemVer",
    "module": "Validate",
    "description": "Validates whether a string is a Semantic Versioning (SemVer) string.",
    "signature": "isSemVer(val: string): boolean",
    "example": "isSemVer(...)",
    "output": "..."
  },
  {
    "id": "isslug",
    "name": "isSlug",
    "module": "Validate",
    "description": "Validates whether a string is a valid slug (kebab-case alphanumeric).",
    "signature": "isSlug(val: string): boolean",
    "example": "isSlug(...)",
    "output": "..."
  },
  {
    "id": "ishexadecimal",
    "name": "isHexadecimal",
    "module": "Validate",
    "description": "Validates whether a string is a hexadecimal value.",
    "signature": "isHexadecimal(val: string): boolean",
    "example": "isHexadecimal(...)",
    "output": "..."
  },
  {
    "id": "ismd5",
    "name": "isMD5",
    "module": "Validate",
    "description": "Validates whether a string is a valid MD5 hash.",
    "signature": "isMD5(val: string): boolean",
    "example": "isMD5(...)",
    "output": "..."
  },
  {
    "id": "issha256",
    "name": "isSHA256",
    "module": "Validate",
    "description": "Validates whether a string is a valid SHA256 hash.",
    "signature": "isSHA256(val: string): boolean",
    "example": "isSHA256(...)",
    "output": "..."
  },
  {
    "id": "islatitude",
    "name": "isLatitude",
    "module": "Validate",
    "description": "Validates whether a value is a valid latitude coordinate (-90 to 90).",
    "signature": "isLatitude(val: number | string): boolean",
    "example": "isLatitude(...)",
    "output": "..."
  },
  {
    "id": "islongitude",
    "name": "isLongitude",
    "module": "Validate",
    "description": "Validates whether a value is a valid longitude coordinate (-180 to 180).",
    "signature": "isLongitude(val: number | string): boolean",
    "example": "isLongitude(...)",
    "output": "..."
  },
  {
    "id": "islatlong",
    "name": "isLatLong",
    "module": "Validate",
    "description": "Validates whether a string is a valid \"lat,long\" or \"lat, long\" coordinate pair.",
    "signature": "isLatLong(val: string): boolean",
    "example": "isLatLong(...)",
    "output": "..."
  }
];
