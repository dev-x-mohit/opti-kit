export interface UtilityMeta {
  id: string;
  name: string;
  module: string;
  description: string;
  signature: string;
  example: string;
  output: string;
  benchmark?: {
    opti: string;
    lodash: string;
    multiplier: string;
    winner: string;
  };
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
    "signature": "groupBy<T>( arr: T[], fn: (item: T)",
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
    "signature": "uniqueBy<T>( arr: T[], iteratee: keyof T | ((item: T)",
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
    "signature": "countBy<T>( arr: T[], iteratee: (item: T)",
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
    "signature": "drop<T>(arr: T[], n: number",
    "example": "drop(...)",
    "output": "..."
  },
  {
    "id": "dropright",
    "name": "dropRight",
    "module": "Array",
    "description": "Creates a slice of array with n elements dropped from the end.",
    "signature": "dropRight<T>(arr: T[], n: number",
    "example": "dropRight(...)",
    "output": "..."
  },
  {
    "id": "take",
    "name": "take",
    "module": "Array",
    "description": "Creates a slice of array with n elements taken from the beginning.",
    "signature": "take<T>(arr: T[], n: number",
    "example": "take(...)",
    "output": "..."
  },
  {
    "id": "takeright",
    "name": "takeRight",
    "module": "Array",
    "description": "Creates a slice of array with n elements taken from the end.",
    "signature": "takeRight<T>(arr: T[], n: number",
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
    "signature": "partition<T>(arr: T[], predicate: (item: T)",
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
    "signature": "reject<T>(arr: T[], predicate: (item: T)",
    "example": "reject(...)",
    "output": "..."
  },
  {
    "id": "keyby",
    "name": "keyBy",
    "module": "Array",
    "description": "Creates an object composed of keys generated from the results of running each element of array thru iteratee.",
    "signature": "keyBy<T>(arr: T[], iteratee: keyof T | ((item: T)",
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
    "signature": "sampleSize<T>(arr: T[], n: number",
    "example": "sampleSize(...)",
    "output": "..."
  },
  {
    "id": "sortby",
    "name": "sortBy",
    "module": "Array",
    "description": "Sorts an array based on an iteratee. Returns a new sorted array.",
    "signature": "sortBy<T>(arr: T[], iteratee: (item: T)",
    "example": "sortBy(...)",
    "output": "..."
  },
  {
    "id": "range",
    "name": "range",
    "module": "Array",
    "description": "Creates an array of numbers progressing from start up to, but not including, end.",
    "signature": "range(start: number, end?: number, step",
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
    "signature": "minBy<T>(arr: T[], iteratee: (item: T)",
    "example": "minBy(...)",
    "output": "..."
  },
  {
    "id": "maxby",
    "name": "maxBy",
    "module": "Array",
    "description": "Finds the element in an array that produces the maximum value when passed to iteratee.",
    "signature": "maxBy<T>(arr: T[], iteratee: (item: T)",
    "example": "maxBy(...)",
    "output": "..."
  },
  {
    "id": "sumby",
    "name": "sumBy",
    "module": "Array",
    "description": "Computes the sum of values produced by iteratee for each element in the array.",
    "signature": "sumBy<T>(arr: T[], iteratee: (item: T)",
    "example": "sumBy(...)",
    "output": "..."
  },
  {
    "id": "meanby",
    "name": "meanBy",
    "module": "Array",
    "description": "Computes the mean (average) of values produced by iteratee for each element in the array.",
    "signature": "meanBy<T>(arr: T[], iteratee: (item: T)",
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
    "signature": "scan<T, R>( arr: T[], fn: (acc: R, val: T, index: number)",
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
    "signature": "flatDeep<T>(arr: any[], depth",
    "example": "flatDeep(...)",
    "output": "..."
  },
  {
    "id": "differenceby",
    "name": "differenceBy",
    "module": "Array",
    "description": "Creates an array of array values not included in the other given array using an iteratee.",
    "signature": "differenceBy<T, R>( arr: T[], other: T[], iteratee: keyof T | ((val: T)",
    "example": "differenceBy(...)",
    "output": "..."
  },
  {
    "id": "intersectionby",
    "name": "intersectionBy",
    "module": "Array",
    "description": "Creates an array of unique values that are included in all given arrays using an iteratee.",
    "signature": "intersectionBy<T, R>( arr: T[], other: T[], iteratee: keyof T | ((val: T)",
    "example": "intersectionBy(...)",
    "output": "..."
  },
  {
    "id": "xor",
    "name": "xor",
    "module": "Array",
    "description": "Creates an array of unique values that is the symmetric difference of the given arrays.",
    "signature": "xor<T>(...arrays: T[][]): T[]",
    "example": "xor(...)",
    "output": "..."
  },
  {
    "id": "dropwhile",
    "name": "dropWhile",
    "module": "Array",
    "description": "Creates a slice of array excluding elements dropped from the beginning until predicate returns falsy.",
    "signature": "dropWhile<T>(arr: T[], predicate: (val: T, index: number)",
    "example": "dropWhile(...)",
    "output": "..."
  },
  {
    "id": "takewhile",
    "name": "takeWhile",
    "module": "Array",
    "description": "Creates a slice of array with elements taken from the beginning until predicate returns falsy.",
    "signature": "takeWhile<T>(arr: T[], predicate: (val: T, index: number)",
    "example": "takeWhile(...)",
    "output": "..."
  },
  {
    "id": "unionby",
    "name": "unionBy",
    "module": "Array",
    "description": "Creates an array of unique values, in order, from all given arrays using an iteratee.",
    "signature": "unionBy<T, R>(iteratee: keyof T | ((val: T)",
    "example": "unionBy(...)",
    "output": "..."
  },
  {
    "id": "unionwith",
    "name": "unionWith",
    "module": "Array",
    "description": "Creates an array of unique values, in order, from all given arrays using a comparator.",
    "signature": "unionWith<T>(comparator: (a: T, b: T)",
    "example": "unionWith(...)",
    "output": "..."
  },
  {
    "id": "differencewith",
    "name": "differenceWith",
    "module": "Array",
    "description": "Creates an array of array values not included in the other given arrays using a comparator.",
    "signature": "differenceWith<T>(arr: T[], other: T[], comparator: (a: T, b: T)",
    "example": "differenceWith(...)",
    "output": "..."
  },
  {
    "id": "intersectionwith",
    "name": "intersectionWith",
    "module": "Array",
    "description": "Creates an array of unique values that are included in all given arrays using a comparator.",
    "signature": "intersectionWith<T>(arr: T[], other: T[], comparator: (a: T, b: T)",
    "example": "intersectionWith(...)",
    "output": "..."
  },
  {
    "id": "xorby",
    "name": "xorBy",
    "module": "Array",
    "description": "Creates an array of unique values that is the symmetric difference of the given arrays using an iteratee.",
    "signature": "xorBy<T, R>(iteratee: keyof T | ((val: T)",
    "example": "xorBy(...)",
    "output": "..."
  },
  {
    "id": "xorwith",
    "name": "xorWith",
    "module": "Array",
    "description": "Creates an array of unique values that is the symmetric difference of the given arrays using a comparator.",
    "signature": "xorWith<T>(comparator: (a: T, b: T)",
    "example": "xorWith(...)",
    "output": "..."
  },
  {
    "id": "zipobject",
    "name": "zipObject",
    "module": "Array",
    "description": "This method is like Object.fromEntries except that it accepts two arrays, one of property identifiers and one of corresponding values.",
    "signature": "zipObject<K extends string | number | symbol, V>(props: K[], values: V[]): Record<K, V>",
    "example": "zipObject(...)",
    "output": "..."
  },
  {
    "id": "pull",
    "name": "pull",
    "module": "Array",
    "description": "Removes all given values from array using strict equality.",
    "signature": "pull<T>(arr: T[], ...values: T[]): T[]",
    "example": "pull(...)",
    "output": "..."
  },
  {
    "id": "pullall",
    "name": "pullAll",
    "module": "Array",
    "description": "This method is like pull except that it accepts an array of values to remove.",
    "signature": "pullAll<T>(arr: T[], values: T[]): T[]",
    "example": "pullAll(...)",
    "output": "..."
  },
  {
    "id": "pullat",
    "name": "pullAt",
    "module": "Array",
    "description": "Removes elements from array corresponding to indexes and returns an array of remaining elements.",
    "signature": "pullAt<T>(arr: T[], indexes: number[]): T[]",
    "example": "pullAt(...)",
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
    "signature": "debounce<T extends (...args: any[])",
    "example": "debounce(...)",
    "output": "..."
  },
  {
    "id": "throttle",
    "name": "throttle",
    "module": "Async",
    "description": "Creates a throttled function that only invokes the passed function at most once per every",
    "signature": "throttle<T extends (...args: any[])",
    "example": "throttle(...)",
    "output": "..."
  },
  {
    "id": "once",
    "name": "once",
    "module": "Async",
    "description": "Restricts a function call to only execute once. Subsequent calls return the first result.",
    "signature": "once<T extends (...args: any[])",
    "example": "once(...)",
    "output": "..."
  },
  {
    "id": "retry",
    "name": "retry",
    "module": "Async",
    "description": "Retries a promise-returning function a specified number of times with a delay between failures.",
    "signature": "retry<T>( fn: ()",
    "example": "retry(...)",
    "output": "..."
  },
  {
    "id": "timeout",
    "name": "timeout",
    "module": "Async",
    "description": "Returns a promise that rejects if the provided promise does not resolve within the specified timeout.",
    "signature": "timeout<T>(promise: Promise<T>, ms: number, fallbackError",
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
    "signature": "sequence<T>(tasks: (()",
    "example": "sequence(...)",
    "output": "..."
  },
  {
    "id": "trycatchasync",
    "name": "tryCatchAsync",
    "module": "Async",
    "description": "Wraps an async function and returns a tuple [error, result], safely catching errors.",
    "signature": "tryCatchAsync<T, E",
    "example": "tryCatchAsync(...)",
    "output": "..."
  },
  {
    "id": "pmap",
    "name": "pMap",
    "module": "Async",
    "description": "Maps over an array concurrently.",
    "signature": "pMap<T, R>( iterable: Iterable<T>, mapper: (item: T, index: number)",
    "example": "pMap(...)",
    "output": "..."
  },
  {
    "id": "pfilter",
    "name": "pFilter",
    "module": "Async",
    "description": "Filters an array concurrently.",
    "signature": "pFilter<T>( iterable: Iterable<T>, filterer: (item: T, index: number)",
    "example": "pFilter(...)",
    "output": "..."
  },
  {
    "id": "everyasync",
    "name": "everyAsync",
    "module": "Async",
    "description": "Asynchronously checks if every element satisfies the condition (sequential execution).",
    "signature": "everyAsync<T>( iterable: Iterable<T>, predicate: (item: T, index: number)",
    "example": "everyAsync(...)",
    "output": "..."
  },
  {
    "id": "someasync",
    "name": "someAsync",
    "module": "Async",
    "description": "Asynchronously checks if some element satisfies the condition (sequential execution).",
    "signature": "someAsync<T>( iterable: Iterable<T>, predicate: (item: T, index: number)",
    "example": "someAsync(...)",
    "output": "..."
  },
  {
    "id": "preduce",
    "name": "pReduce",
    "module": "Async",
    "description": "Asynchronously reduces an iterable in order.",
    "signature": "pReduce<T, R>( iterable: Iterable<T>, reducer: (acc: R, item: T, index: number)",
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
    "signature": "waitUntil( predicate: ()",
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
    "signature": "asyncPool<T, R>( concurrency: number, iterable: Iterable<T>, iteratorFn: (item: T)",
    "example": "asyncPool(...)",
    "output": "..."
  },
  {
    "id": "retrywithbackoff",
    "name": "retryWithBackoff",
    "module": "Async",
    "description": "Retries an async function with exponential backoff on failure.",
    "signature": "retryWithBackoff<T>( fn: ()",
    "example": "retryWithBackoff(...)",
    "output": "..."
  },
  {
    "id": "stringtouint8array",
    "name": "stringToUint8Array",
    "module": "Binary",
    "description": "Converts a string to a Uint8Array.",
    "signature": "stringToUint8Array(str: string): Uint8Array",
    "example": "stringToUint8Array(...)",
    "output": "..."
  },
  {
    "id": "uint8arraytostring",
    "name": "uint8ArrayToString",
    "module": "Binary",
    "description": "Converts a Uint8Array back to a string.",
    "signature": "uint8ArrayToString(arr: Uint8Array): string",
    "example": "uint8ArrayToString(...)",
    "output": "..."
  },
  {
    "id": "buffertohex",
    "name": "bufferToHex",
    "module": "Binary",
    "description": "Converts an ArrayBuffer to a Hex string.",
    "signature": "bufferToHex(buffer: ArrayBuffer | Uint8Array): string",
    "example": "bufferToHex(...)",
    "output": "..."
  },
  {
    "id": "hextobuffer",
    "name": "hexToBuffer",
    "module": "Binary",
    "description": "Converts a Hex string to a Uint8Array.",
    "signature": "hexToBuffer(hex: string): Uint8Array",
    "example": "hexToBuffer(...)",
    "output": "..."
  },
  {
    "id": "concatuint8arrays",
    "name": "concatUint8Arrays",
    "module": "Binary",
    "description": "Concatenates multiple Uint8Arrays into one.",
    "signature": "concatUint8Arrays(arrays: Uint8Array[]): Uint8Array",
    "example": "concatUint8Arrays(...)",
    "output": "..."
  },
  {
    "id": "areuint8arraysequal",
    "name": "areUint8ArraysEqual",
    "module": "Binary",
    "description": "Compares two Uint8Arrays for equality.",
    "signature": "areUint8ArraysEqual(a: Uint8Array, b: Uint8Array): boolean",
    "example": "areUint8ArraysEqual(...)",
    "output": "..."
  },
  {
    "id": "base64tobuffer",
    "name": "base64ToBuffer",
    "module": "Binary",
    "description": "Converts a base64 string to a Uint8Array.",
    "signature": "base64ToBuffer(base64: string): Uint8Array",
    "example": "base64ToBuffer(...)",
    "output": "..."
  },
  {
    "id": "buffertobase64",
    "name": "bufferToBase64",
    "module": "Binary",
    "description": "Converts a Uint8Array to a base64 string.",
    "signature": "bufferToBase64(buffer: Uint8Array): string",
    "example": "bufferToBase64(...)",
    "output": "..."
  },
  {
    "id": "setbit",
    "name": "setBit",
    "module": "Bit",
    "description": "Sets the bit at the given position.",
    "signature": "setBit(number: number, position: number): number",
    "example": "setBit(...)",
    "output": "..."
  },
  {
    "id": "clearbit",
    "name": "clearBit",
    "module": "Bit",
    "description": "Clears the bit at the given position.",
    "signature": "clearBit(number: number, position: number): number",
    "example": "clearBit(...)",
    "output": "..."
  },
  {
    "id": "togglebit",
    "name": "toggleBit",
    "module": "Bit",
    "description": "Toggles the bit at the given position.",
    "signature": "toggleBit(number: number, position: number): number",
    "example": "toggleBit(...)",
    "output": "..."
  },
  {
    "id": "checkbit",
    "name": "checkBit",
    "module": "Bit",
    "description": "Checks if the bit at the given position is set (1).",
    "signature": "checkBit(number: number, position: number): boolean",
    "example": "checkBit(...)",
    "output": "..."
  },
  {
    "id": "updatebit",
    "name": "updateBit",
    "module": "Bit",
    "description": "Updates the bit at the given position with the specified value (0 or 1).",
    "signature": "updateBit(number: number, position: number, value: 0 | 1): number",
    "example": "updateBit(...)",
    "output": "..."
  },
  {
    "id": "countsetbits",
    "name": "countSetBits",
    "module": "Bit",
    "description": "Counts the number of set bits (1s) in a number (Brian Kernighan’s Algorithm).",
    "signature": "countSetBits(number: number): number",
    "example": "countSetBits(...)",
    "output": "..."
  },
  {
    "id": "ispoweroftwo",
    "name": "isPowerOfTwo",
    "module": "Bit",
    "description": "Checks if a number is a power of 2.",
    "signature": "isPowerOfTwo(number: number): boolean",
    "example": "isPowerOfTwo(...)",
    "output": "..."
  },
  {
    "id": "isolaterightmostbit",
    "name": "isolateRightmostBit",
    "module": "Bit",
    "description": "Isolates the rightmost 1-bit.",
    "signature": "isolateRightmostBit(number: number): number",
    "example": "isolateRightmostBit(...)",
    "output": "..."
  },
  {
    "id": "isolaterightmostzerobit",
    "name": "isolateRightmostZeroBit",
    "module": "Bit",
    "description": "Gets the rightmost 0-bit.",
    "signature": "isolateRightmostZeroBit(number: number): number",
    "example": "isolateRightmostZeroBit(...)",
    "output": "..."
  },
  {
    "id": "clearrightmostbit",
    "name": "clearRightmostBit",
    "module": "Bit",
    "description": "Clears the rightmost 1-bit.",
    "signature": "clearRightmostBit(number: number): number",
    "example": "clearRightmostBit(...)",
    "output": "..."
  },
  {
    "id": "flipbits",
    "name": "flipBits",
    "module": "Bit",
    "description": "Flips all bits.",
    "signature": "flipBits(number: number): number",
    "example": "flipBits(...)",
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
    "signature": "memoizeWithTTL<T extends (...args: any[])",
    "example": "memoizeWithTTL(...)",
    "output": "..."
  },
  {
    "id": "lrucache",
    "name": "LRUCache",
    "module": "Cache",
    "description": "A lightweight Least-Recently-Used (LRU) cache class.",
    "signature": "LRUCache<K, V>",
    "example": "LRUCache(...)",
    "output": "..."
  },
  {
    "id": "fastcrc32",
    "name": "fastCrc32",
    "module": "Checksum",
    "description": "OptiKit Checksum — Blazing-fast, zero-dependency checksum & non-cryptographic hash algorithms.",
    "signature": "fastCrc32(input: string | Uint8Array): number",
    "example": "```ts\nfastCrc32('The quick brown fox jumps over the lazy dog');\n```",
    "output": "1095738169"
  },
  {
    "id": "crc32hex",
    "name": "crc32Hex",
    "module": "Checksum",
    "description": "Computes CRC-32 and returns a formatted 8-character lowercase hexadecimal string.",
    "signature": "crc32Hex(input: string | Uint8Array): string",
    "example": "```ts\ncrc32Hex('OptiKit');\n```",
    "output": "'...'"
  },
  {
    "id": "adler32",
    "name": "adler32",
    "module": "Checksum",
    "description": "Computes Adler-32 checksum (used in zlib RFC 1950).",
    "signature": "adler32(input: string | Uint8Array): number",
    "example": "```ts\nadler32('Wikipedia');\n```",
    "output": "300286872"
  },
  {
    "id": "adler32hex",
    "name": "adler32Hex",
    "module": "Checksum",
    "description": "Computes Adler-32 and returns an 8-character hex string.",
    "signature": "adler32Hex(input: string | Uint8Array): string",
    "example": "adler32Hex(...)",
    "output": "..."
  },
  {
    "id": "fnv1a32",
    "name": "fnv1a32",
    "module": "Checksum",
    "description": "Fowler–Noll–Vo 32-bit (FNV-1a) hash function.",
    "signature": "fnv1a32(input: string): number",
    "example": "```ts\nfnv1a32('hello world');\n```",
    "output": "3583457375"
  },
  {
    "id": "fnv1a32hex",
    "name": "fnv1a32Hex",
    "module": "Checksum",
    "description": "Computes FNV-1a 32-bit and returns a hex string.",
    "signature": "fnv1a32Hex(input: string): string",
    "example": "fnv1a32Hex(...)",
    "output": "..."
  },
  {
    "id": "fnv1a64",
    "name": "fnv1a64",
    "module": "Checksum",
    "description": "Fowler–Noll–Vo 64-bit (FNV-1a) hash using native BigInt.",
    "signature": "fnv1a64(input: string): string",
    "example": "fnv1a64(...)",
    "output": "..."
  },
  {
    "id": "murmur3",
    "name": "murmur3",
    "module": "Checksum",
    "description": "MurmurHash3 32-bit implementation.",
    "signature": "murmur3(key: string, seed",
    "example": "```ts\nmurmur3('opti-kit', 42);\n```",
    "output": "32-bit unsigned int"
  },
  {
    "id": "encodebase58",
    "name": "encodeBase58",
    "module": "Codec",
    "description": "OptiKit Codec — Zero-dependency multi-base encoding/decoding engine.",
    "signature": "encodeBase58(input: string | Uint8Array): string",
    "example": "```ts\nencodeBase58('hello world');\n```",
    "output": "'StV1DL6CwTryKyV'"
  },
  {
    "id": "decodebase58",
    "name": "decodeBase58",
    "module": "Codec",
    "description": "Decodes a Base58 string back to bytes or string.",
    "signature": "decodeBase58(input: string, asString",
    "example": "decodeBase58(...)",
    "output": "..."
  },
  {
    "id": "encodebase62",
    "name": "encodeBase62",
    "module": "Codec",
    "description": "Encodes an integer or BigInt to a Base62 string (alphanumeric [0-9a-zA-Z]).",
    "signature": "encodeBase62(num: number | bigint): string",
    "example": "```ts\nencodeBase62(1253094857);\n```",
    "output": "'1m70Yf'"
  },
  {
    "id": "decodebase62",
    "name": "decodeBase62",
    "module": "Codec",
    "description": "Decodes a Base62 string into a BigInt integer.",
    "signature": "decodeBase62(str: string): bigint",
    "example": "decodeBase62(...)",
    "output": "..."
  },
  {
    "id": "encodebase32",
    "name": "encodeBase32",
    "module": "Codec",
    "description": "Encodes input to RFC 4648 Base32 (used in 2FA/TOTP secret keys).",
    "signature": "encodeBase32(input: string | Uint8Array, pad",
    "example": "```ts\nencodeBase32('OptiKit');\n```",
    "output": "'J5UGQ2LPNV2A===='"
  },
  {
    "id": "decodebase32",
    "name": "decodeBase32",
    "module": "Codec",
    "description": "Decodes an RFC 4648 Base32 string.",
    "signature": "decodeBase32(input: string, asString",
    "example": "decodeBase32(...)",
    "output": "..."
  },
  {
    "id": "generateshortid",
    "name": "generateShortId",
    "module": "Codec",
    "description": "Generates a cryptographically random, URL-friendly short identifier.",
    "signature": "generateShortId(length",
    "example": "```ts\ngenerateShortId(10);\n```",
    "output": "'7Kx9M2wP1a'"
  },
  {
    "id": "urlsafebase64encode",
    "name": "urlSafeBase64Encode",
    "module": "Codec",
    "description": "Encodes a string into URL-Safe Base64 (RFC 4648 §5).",
    "signature": "urlSafeBase64Encode(input: string): string",
    "example": "urlSafeBase64Encode(...)",
    "output": "..."
  },
  {
    "id": "urlsafebase64decode",
    "name": "urlSafeBase64Decode",
    "module": "Codec",
    "description": "Decodes a URL-Safe Base64 string.",
    "signature": "urlSafeBase64Decode(input: string): string",
    "example": "urlSafeBase64Decode(...)",
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
    "signature": "filterMap<T, R>(arr: T[], fn: (item: T, index: number)",
    "example": "filterMap(...)",
    "output": "..."
  },
  {
    "id": "maprecordvalues",
    "name": "mapRecordValues",
    "module": "Collection",
    "description": "Creates a new object with the same keys but with values transformed by the callback.",
    "signature": "mapRecordValues<V, R>( obj: Record<string, V>, fn: (value: V, key: string)",
    "example": "mapRecordValues(...)",
    "output": "..."
  },
  {
    "id": "filterrecord",
    "name": "filterRecord",
    "module": "Collection",
    "description": "Creates a new object containing only the entries where the predicate returns true.",
    "signature": "filterRecord<V>( obj: Record<string, V>, fn: (value: V, key: string)",
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
    "id": "rgbtooklab",
    "name": "rgbToOklab",
    "module": "Color-pro",
    "description": "OptiKit Color Pro — Perceptual color science (OKLab, OKLCH, XYZ, CIELAB, DeltaE 76/2000),",
    "signature": "rgbToOklab(",
    "example": "rgbToOklab(...)",
    "output": "..."
  },
  {
    "id": "oklabtorgb",
    "name": "oklabToRgb",
    "module": "Color-pro",
    "description": "Converts OKLab back to sRGB (`0..255`).",
    "signature": "oklabToRgb(",
    "example": "oklabToRgb(...)",
    "output": "..."
  },
  {
    "id": "oklabtooklch",
    "name": "oklabToOklch",
    "module": "Color-pro",
    "description": "Converts OKLab to cylindrical OKLCH.",
    "signature": "oklabToOklch(",
    "example": "oklabToOklch(...)",
    "output": "..."
  },
  {
    "id": "oklchtooklab",
    "name": "oklchToOklab",
    "module": "Color-pro",
    "description": "Converts cylindrical OKLCH to OKLab.",
    "signature": "oklchToOklab(",
    "example": "oklchToOklab(...)",
    "output": "..."
  },
  {
    "id": "rgbtoxyz",
    "name": "rgbToXyz",
    "module": "Color-pro",
    "description": "Converts sRGB to CIE XYZ (D65).",
    "signature": "rgbToXyz(",
    "example": "rgbToXyz(...)",
    "output": "..."
  },
  {
    "id": "xyztolab",
    "name": "xyzToLab",
    "module": "Color-pro",
    "description": "Converts CIE XYZ (D65) to CIELAB.",
    "signature": "xyzToLab(",
    "example": "xyzToLab(...)",
    "output": "..."
  },
  {
    "id": "labtorgb",
    "name": "labToRgb",
    "module": "Color-pro",
    "description": "Converts CIELAB (D65) back to sRGB.",
    "signature": "labToRgb(",
    "example": "labToRgb(...)",
    "output": "..."
  },
  {
    "id": "deltae76",
    "name": "deltaE76",
    "module": "Color-pro",
    "description": "Computes CIE76 Euclidean color difference (`Delta E`).",
    "signature": "deltaE76(c1: LabColor, c2: LabColor): number",
    "example": "deltaE76(...)",
    "output": "..."
  },
  {
    "id": "deltae2000",
    "name": "deltaE2000",
    "module": "Color-pro",
    "description": "Computes CIEDE2000 perceptual color difference.",
    "signature": "deltaE2000(c1: LabColor, c2: LabColor): number",
    "example": "deltaE2000(...)",
    "output": "..."
  },
  {
    "id": "wcagcontrastratio",
    "name": "wcagContrastRatio",
    "module": "Color-pro",
    "description": "Computes WCAG 2.1 relative contrast ratio (`1..21`).",
    "signature": "wcagContrastRatio(fg: RgbColor, bg: RgbColor): number",
    "example": "wcagContrastRatio(...)",
    "output": "..."
  },
  {
    "id": "wcagmeetsaa",
    "name": "wcagMeetsAA",
    "module": "Color-pro",
    "description": "Checks if foreground/background meet WCAG AA (`4.5:1` normal, `3:1` large text).",
    "signature": "wcagMeetsAA(fg: RgbColor, bg: RgbColor, largeText",
    "example": "wcagMeetsAA(...)",
    "output": "..."
  },
  {
    "id": "wcagmeetsaaa",
    "name": "wcagMeetsAAA",
    "module": "Color-pro",
    "description": "Checks if foreground/background meet WCAG AAA (`7:1` normal, `4.5:1` large text).",
    "signature": "wcagMeetsAAA(fg: RgbColor, bg: RgbColor, largeText",
    "example": "wcagMeetsAAA(...)",
    "output": "..."
  },
  {
    "id": "apcacontrast",
    "name": "apcaContrast",
    "module": "Color-pro",
    "description": "Computes simplified APCA perceptual lightness contrast (`Lc`, roughly `-108..106`).",
    "signature": "apcaContrast(textRgb: RgbColor, bgRgb: RgbColor): number",
    "example": "apcaContrast(...)",
    "output": "..."
  },
  {
    "id": "generatetonalscale",
    "name": "generateTonalScale",
    "module": "Color-pro",
    "description": "Generates a perceptual tonal scale of `steps` lightness shades in OKLCH.",
    "signature": "generateTonalScale(base: RgbColor, steps",
    "example": "generateTonalScale(...)",
    "output": "..."
  },
  {
    "id": "generatecomplementary",
    "name": "generateComplementary",
    "module": "Color-pro",
    "description": "Generates a complementary color (180° hue shift in OKLCH).",
    "signature": "generateComplementary(base: RgbColor): RgbColor",
    "example": "generateComplementary(...)",
    "output": "..."
  },
  {
    "id": "generatetriadic",
    "name": "generateTriadic",
    "module": "Color-pro",
    "description": "Generates a triadic color harmony (0°, +120°, +240°).",
    "signature": "generateTriadic(base: RgbColor): [RgbColor, RgbColor, RgbColor]",
    "example": "generateTriadic(...)",
    "output": "..."
  },
  {
    "id": "generateanalogous",
    "name": "generateAnalogous",
    "module": "Color-pro",
    "description": "Generates an analogous color harmony (-30°, 0°, +30°).",
    "signature": "generateAnalogous(base: RgbColor): [RgbColor, RgbColor, RgbColor]",
    "example": "generateAnalogous(...)",
    "output": "..."
  },
  {
    "id": "generatesplitcomplementary",
    "name": "generateSplitComplementary",
    "module": "Color-pro",
    "description": "Generates a split-complementary color harmony (0°, +150°, +210°).",
    "signature": "generateSplitComplementary(base: RgbColor): [RgbColor, RgbColor, RgbColor]",
    "example": "generateSplitComplementary(...)",
    "output": "..."
  },
  {
    "id": "mixcolorsoklab",
    "name": "mixColorsOklab",
    "module": "Color-pro",
    "description": "Perceptually mixes two sRGB colors in OKLab space at ratio `t` (`0..1`).",
    "signature": "mixColorsOklab(c1: RgbColor, c2: RgbColor, t",
    "example": "mixColorsOklab(...)",
    "output": "..."
  },
  {
    "id": "simulateprotanopia",
    "name": "simulateProtanopia",
    "module": "Color-pro",
    "description": "Simulates Protanopia (red-blind) color vision deficiency.",
    "signature": "simulateProtanopia(c: RgbColor): RgbColor",
    "example": "simulateProtanopia(...)",
    "output": "..."
  },
  {
    "id": "simulatedeuteranopia",
    "name": "simulateDeuteranopia",
    "module": "Color-pro",
    "description": "Simulates Deuteranopia (green-blind) color vision deficiency.",
    "signature": "simulateDeuteranopia(c: RgbColor): RgbColor",
    "example": "simulateDeuteranopia(...)",
    "output": "..."
  },
  {
    "id": "simulatetritanopia",
    "name": "simulateTritanopia",
    "module": "Color-pro",
    "description": "Simulates Tritanopia (blue-blind) color vision deficiency.",
    "signature": "simulateTritanopia(c: RgbColor): RgbColor",
    "example": "simulateTritanopia(...)",
    "output": "..."
  },
  {
    "id": "islightcolor",
    "name": "isLightColor",
    "module": "Color-pro",
    "description": "Checks whether a color is perceptually light (`luminance > 0.179`).",
    "signature": "isLightColor(c: RgbColor): boolean",
    "example": "isLightColor(...)",
    "output": "..."
  },
  {
    "id": "besttextcolor",
    "name": "bestTextColor",
    "module": "Color-pro",
    "description": "Returns `#000000` or `#ffffff` whichever achieves higher WCAG contrast on `bg`.",
    "signature": "bestTextColor(bg: RgbColor): '#000000' | '#ffffff'",
    "example": "bestTextColor(...)",
    "output": "..."
  },
  {
    "id": "hextorgb",
    "name": "hexToRgb",
    "module": "Color-space",
    "description": "Converts Hex string to RGB object.",
    "signature": "hexToRgb(hex: string): RGB | null",
    "example": "hexToRgb(...)",
    "output": "..."
  },
  {
    "id": "rgbtohex",
    "name": "rgbToHex",
    "module": "Color-space",
    "description": "Converts RGB object to Hex string.",
    "signature": "rgbToHex(rgb: RGB): string",
    "example": "rgbToHex(...)",
    "output": "..."
  },
  {
    "id": "rgbtohsl",
    "name": "rgbToHsl",
    "module": "Color-space",
    "description": "Converts RGB object to HSL object.",
    "signature": "rgbToHsl(rgb: RGB): HSL",
    "example": "rgbToHsl(...)",
    "output": "..."
  },
  {
    "id": "hsltorgb",
    "name": "hslToRgb",
    "module": "Color-space",
    "description": "Converts HSL object to RGB object.",
    "signature": "hslToRgb(hsl: HSL): RGB",
    "example": "hslToRgb(...)",
    "output": "..."
  },
  {
    "id": "rgbtohsv",
    "name": "rgbToHsv",
    "module": "Color-space",
    "description": "Converts RGB object to HSV object.",
    "signature": "rgbToHsv(rgb: RGB): HSV",
    "example": "rgbToHsv(...)",
    "output": "..."
  },
  {
    "id": "hsvtorgb",
    "name": "hsvToRgb",
    "module": "Color-space",
    "description": "Converts HSV object to RGB object.",
    "signature": "hsvToRgb(hsv: HSV): RGB",
    "example": "hsvToRgb(...)",
    "output": "..."
  },
  {
    "id": "luminance",
    "name": "luminance",
    "module": "Color-space",
    "description": "Calculates the relative luminance of a color.",
    "signature": "luminance(rgb: RGB): number",
    "example": "luminance(...)",
    "output": "..."
  },
  {
    "id": "contrast",
    "name": "contrast",
    "module": "Color-space",
    "description": "Calculates the contrast ratio between two colors.",
    "signature": "contrast(rgb1: RGB, rgb2: RGB): number",
    "example": "contrast(...)",
    "output": "..."
  },
  {
    "id": "isdark",
    "name": "isDark",
    "module": "Color-space",
    "description": "Checks if a color is perceived as dark.",
    "signature": "isDark(rgb: RGB): boolean",
    "example": "isDark(...)",
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
    "id": "compresslzw",
    "name": "compressLZW",
    "module": "Compression",
    "description": "OptiKit Compression — Zero-dependency client-side and isomorphic data compression.",
    "signature": "compressLZW(uncompressed: string): number[]",
    "example": "```ts\nconst compressed = compressLZW('TOBEORNOTTOBEORTOBEORNOT');\n```",
    "output": "..."
  },
  {
    "id": "decompresslzw",
    "name": "decompressLZW",
    "module": "Compression",
    "description": "Decompresses an LZW integer code array back into the original string.",
    "signature": "decompressLZW(compressed: readonly number[]): string",
    "example": "```ts\nconst text = decompressLZW(compressed);\n```",
    "output": "..."
  },
  {
    "id": "compressrle",
    "name": "compressRLE",
    "module": "Compression",
    "description": "Run-Length Encoding (RLE) string compression.",
    "signature": "compressRLE(input: string): string",
    "example": "compressRLE(...)",
    "output": "..."
  },
  {
    "id": "deltaencode",
    "name": "deltaEncode",
    "module": "Compression",
    "description": "Delta encoding for numeric series. Converts absolute values to relative differences.",
    "signature": "deltaEncode(numbers: readonly number[]): number[]",
    "example": "```ts\ndeltaEncode([100, 102, 105, 110]);\n```",
    "output": "[100, 2, 3, 5]"
  },
  {
    "id": "deltadecode",
    "name": "deltaDecode",
    "module": "Compression",
    "description": "Restores original numeric series from delta-encoded differences.",
    "signature": "deltaDecode(deltas: readonly number[]): number[]",
    "example": "```ts\ndeltaDecode([100, 2, 3, 5]);\n```",
    "output": "[100, 102, 105, 110]"
  },
  {
    "id": "pmapseries",
    "name": "pMapSeries",
    "module": "Concurrency",
    "description": "Resolves promises sequentially.",
    "signature": "pMapSeries<T, R>( iterable: Iterable<T>, mapper: (item: T, index: number)",
    "example": "pMapSeries(...)",
    "output": "..."
  },
  {
    "id": "pwaterfall",
    "name": "pWaterfall",
    "module": "Concurrency",
    "description": "Passes the result of each promise sequentially to the next.",
    "signature": "pWaterfall<T>( initialValue: T, tasks: Array<(arg: any)",
    "example": "pWaterfall(...)",
    "output": "..."
  },
  {
    "id": "mutex",
    "name": "Mutex",
    "module": "Concurrency",
    "description": "Promise-based mutex lock.",
    "signature": "Mutex",
    "example": "Mutex(...)",
    "output": "..."
  },
  {
    "id": "asyncqueue",
    "name": "AsyncQueue",
    "module": "Concurrency",
    "description": "Concurrency limited queue.",
    "signature": "AsyncQueue<T>",
    "example": "AsyncQueue(...)",
    "output": "..."
  },
  {
    "id": "pwaitfor",
    "name": "pWaitFor",
    "module": "Concurrency",
    "description": "Returns a promise that resolves when a condition is met.",
    "signature": "pWaitFor( condition: ()",
    "example": "pWaitFor(...)",
    "output": "..."
  },
  {
    "id": "ptap",
    "name": "pTap",
    "module": "Concurrency",
    "description": "Taps into a promise chain without affecting its value.",
    "signature": "pTap<T>( promise: Promise<T>, onResolved: (val: T)",
    "example": "pTap(...)",
    "output": "..."
  },
  {
    "id": "presolveprops",
    "name": "pResolveProps",
    "module": "Concurrency",
    "description": "Resolves an object of promises.",
    "signature": "pResolveProps<K extends keyof any, V>( obj: Record<K, Promise<V> | V> ): Promise<Record<K, V>>",
    "example": "pResolveProps(...)",
    "output": "..."
  },
  {
    "id": "isvalidcron",
    "name": "isValidCron",
    "module": "Cron",
    "description": "OptiKit Cron — Zero-dependency Cron expression parser, validator,",
    "signature": "isValidCron(expression: string): boolean",
    "example": "isValidCron(...)",
    "output": "..."
  },
  {
    "id": "parsecron",
    "name": "parseCron",
    "module": "Cron",
    "description": "Parses a standard 5-part cron expression into integer arrays.",
    "signature": "parseCron(expression: string): ParsedCron",
    "example": "```ts\nparseCron('*\\/15 9-17 * * 1-5');\n```",
    "output": "..."
  },
  {
    "id": "getnextcrondate",
    "name": "getNextCronDate",
    "module": "Cron",
    "description": "Calculates the next occurrence Date matching the cron expression after a reference date.",
    "signature": "getNextCronDate(expression: string, fromDate: Date",
    "example": "```ts\nconst next = getNextCronDate('0 0 * * *', new Date());\n```",
    "output": "..."
  },
  {
    "id": "getnextcrondates",
    "name": "getNextCronDates",
    "module": "Cron",
    "description": "Returns the next N occurrence dates matching the cron expression.",
    "signature": "getNextCronDates(expression: string, count",
    "example": "getNextCronDates(...)",
    "output": "..."
  },
  {
    "id": "describecron",
    "name": "describeCron",
    "module": "Cron",
    "description": "Generates a human-friendly English description of a standard 5-part cron expression.",
    "signature": "describeCron(expression: string): string",
    "example": "```ts\ndescribeCron('*\\/15 * * * *'); // 'Every 15 minutes'\ndescribeCron('0 9 * * 1-5');   // 'At 09:00 on Monday through Friday'\n```",
    "output": "..."
  },
  {
    "id": "hmacsha256pure",
    "name": "hmacSha256Pure",
    "module": "Crypto-pro",
    "description": "OptiKit Crypto Pro — Pure JS/TS zero-dependency HMAC-SHA256, PBKDF2, HKDF,",
    "signature": "hmacSha256Pure(key: string | Uint8Array, message: string | Uint8Array): Uint8Array",
    "example": "hmacSha256Pure(...)",
    "output": "..."
  },
  {
    "id": "pbkdf2pure",
    "name": "pbkdf2Pure",
    "module": "Crypto-pro",
    "description": "Derives a key using PBKDF2-HMAC-SHA256 (pure JS).",
    "signature": "pbkdf2Pure( password: string | Uint8Array, salt: string | Uint8Array, iterations: number, keyLen: number ): Uint8Array",
    "example": "pbkdf2Pure(...)",
    "output": "..."
  },
  {
    "id": "hkdfpure",
    "name": "hkdfPure",
    "module": "Crypto-pro",
    "description": "Derives key material using HKDF-SHA256 (RFC 5869).",
    "signature": "hkdfPure( ikm: string | Uint8Array, salt: string | Uint8Array",
    "example": "hkdfPure(...)",
    "output": "..."
  },
  {
    "id": "generatehotp",
    "name": "generateHotp",
    "module": "Crypto-pro",
    "description": "Generates an RFC 4226 HOTP code for a secret and counter.",
    "signature": "generateHotp(secret: Uint8Array, counter: number, digits",
    "example": "generateHotp(...)",
    "output": "..."
  },
  {
    "id": "generatetotp",
    "name": "generateTotp",
    "module": "Crypto-pro",
    "description": "Generates an RFC 6238 TOTP code for a secret and timestamp.",
    "signature": "generateTotp( secret: Uint8Array, timestampMs",
    "example": "generateTotp(...)",
    "output": "..."
  },
  {
    "id": "verifytotp",
    "name": "verifyTotp",
    "module": "Crypto-pro",
    "description": "Verifies a TOTP code within a `window` of time steps.",
    "signature": "verifyTotp( secret: Uint8Array, token: string, timestampMs",
    "example": "verifyTotp(...)",
    "output": "..."
  },
  {
    "id": "parsejwt",
    "name": "parseJwt",
    "module": "Crypto-pro",
    "description": "Parses an unverified JWT into `{ header, payload, signature }`.",
    "signature": "parseJwt<T",
    "example": "parseJwt(...)",
    "output": "..."
  },
  {
    "id": "isjwtexpired",
    "name": "isJwtExpired",
    "module": "Crypto-pro",
    "description": "Checks if a JWT's `exp` claim is expired relative to `nowSeconds`.",
    "signature": "isJwtExpired(token: string, nowSeconds",
    "example": "isJwtExpired(...)",
    "output": "..."
  },
  {
    "id": "constanttimeequal",
    "name": "constantTimeEqual",
    "module": "Crypto-pro",
    "description": "Performs constant-time string or byte-array comparison to mitigate timing attacks.",
    "signature": "constantTimeEqual(a: string | Uint8Array, b: string | Uint8Array): boolean",
    "example": "constantTimeEqual(...)",
    "output": "..."
  },
  {
    "id": "generateapikey",
    "name": "generateApiKey",
    "module": "Crypto-pro",
    "description": "Generates a prefixed random API key using `crypto.getRandomValues` when available.",
    "signature": "generateApiKey(prefix",
    "example": "generateApiKey(...)",
    "output": "..."
  },
  {
    "id": "masksecret",
    "name": "maskSecret",
    "module": "Crypto-pro",
    "description": "Masks a secret string, preserving `visibleStart` and `visibleEnd` characters.",
    "signature": "maskSecret(secret: string, visibleStart",
    "example": "maskSecret(...)",
    "output": "..."
  },
  {
    "id": "crc32c",
    "name": "crc32c",
    "module": "Crypto-pro",
    "description": "Computes Castagnoli CRC-32C checksum over a byte array or string.",
    "signature": "crc32c(data: string | Uint8Array): number",
    "example": "crc32c(...)",
    "output": "..."
  },
  {
    "id": "xxhash32",
    "name": "xxhash32",
    "module": "Crypto-pro",
    "description": "Computes 32-bit xxHash (XXH32) over a byte array or string.",
    "signature": "xxhash32(data: string | Uint8Array, seed",
    "example": "xxhash32(...)",
    "output": "..."
  },
  {
    "id": "siphash24",
    "name": "siphash24",
    "module": "Crypto-pro",
    "description": "Computes a 64-bit SipHash-2-4 digest as a 16-char hex string using BigInt.",
    "signature": "siphash24(key16: Uint8Array, data: string | Uint8Array): string",
    "example": "siphash24(...)",
    "output": "..."
  },
  {
    "id": "base32hexencode",
    "name": "base32HexEncode",
    "module": "Crypto-pro",
    "description": "Encodes bytes to RFC 4648 Base32Hex.",
    "signature": "base32HexEncode(data: Uint8Array): string",
    "example": "base32HexEncode(...)",
    "output": "..."
  },
  {
    "id": "base32hexdecode",
    "name": "base32HexDecode",
    "module": "Crypto-pro",
    "description": "Decodes an RFC 4648 Base32Hex string to bytes.",
    "signature": "base32HexDecode(str: string): Uint8Array",
    "example": "base32HexDecode(...)",
    "output": "..."
  },
  {
    "id": "base85encode",
    "name": "base85Encode",
    "module": "Crypto-pro",
    "description": "Encodes bytes to Ascii85 (Base85).",
    "signature": "base85Encode(data: Uint8Array): string",
    "example": "base85Encode(...)",
    "output": "..."
  },
  {
    "id": "base85decode",
    "name": "base85Decode",
    "module": "Crypto-pro",
    "description": "Decodes an Ascii85 (Base85) string back to bytes.",
    "signature": "base85Decode(str: string): Uint8Array",
    "example": "base85Decode(...)",
    "output": "..."
  },
  {
    "id": "rot13",
    "name": "rot13",
    "module": "Crypto-pro",
    "description": "Applies ROT13 substitution to ASCII letters.",
    "signature": "rot13(text: string): string",
    "example": "rot13(...)",
    "output": "..."
  },
  {
    "id": "caesarcipher",
    "name": "caesarCipher",
    "module": "Crypto-pro",
    "description": "Applies a Caesar shift cipher to ASCII letters.",
    "signature": "caesarCipher(text: string, shift: number): string",
    "example": "caesarCipher(...)",
    "output": "..."
  },
  {
    "id": "xorcipher",
    "name": "xorCipher",
    "module": "Crypto-pro",
    "description": "Applies repeating-key XOR cipher to a byte array or string.",
    "signature": "xorCipher(data: Uint8Array, key: Uint8Array): Uint8Array",
    "example": "xorCipher(...)",
    "output": "..."
  },
  {
    "id": "generatepkceverifier",
    "name": "generatePkceVerifier",
    "module": "Crypto-pro",
    "description": "Generates an OAuth 2.0 PKCE code verifier.",
    "signature": "generatePkceVerifier(length",
    "example": "generatePkceVerifier(...)",
    "output": "..."
  },
  {
    "id": "generatepkcechallenge",
    "name": "generatePkceChallenge",
    "module": "Crypto-pro",
    "description": "Generates a Base64URL-encoded SHA-256 PKCE code challenge from a verifier.",
    "signature": "generatePkceChallenge(verifier: string): string",
    "example": "generatePkceChallenge(...)",
    "output": "..."
  },
  {
    "id": "entropybits",
    "name": "entropyBits",
    "module": "Crypto-pro",
    "description": "Computes Shannon entropy in bits per character for a string.",
    "signature": "entropyBits(text: string): number",
    "example": "entropyBits(...)",
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
    "signature": "generateToken(length",
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
    "signature": "cyrb53(str: string, seed",
    "example": "cyrb53(...)",
    "output": "..."
  },
  {
    "id": "jsontocsv",
    "name": "jsonToCsv",
    "module": "Csv-extended",
    "description": "Extended CSV Utilities",
    "signature": "jsonToCsv(json: Record<string, any>[], delimiter",
    "example": "jsonToCsv(...)",
    "output": "..."
  },
  {
    "id": "csvparse",
    "name": "csvParse",
    "module": "Csv",
    "description": "Parses a CSV/TSV string into an array of objects (if headers are present) or raw string arrays.",
    "signature": "csvParse( csv: string, options: CsvParseOptions",
    "example": "csvParse(...)",
    "output": "..."
  },
  {
    "id": "csvstringify",
    "name": "csvStringify",
    "module": "Csv",
    "description": "Stringifies an array of objects or an array of arrays into a CSV/TSV table.",
    "signature": "csvStringify( data: any[], options: CsvStringifyOptions",
    "example": "csvStringify(...)",
    "output": "..."
  },
  {
    "id": "isyearleap",
    "name": "isYearLeap",
    "module": "Date-extended",
    "description": "Checks if a year is a leap year.",
    "signature": "isYearLeap(year: number): boolean",
    "example": "isYearLeap(...)",
    "output": "..."
  },
  {
    "id": "getdaysinmonth",
    "name": "getDaysInMonth",
    "module": "Date-extended",
    "description": "Gets the number of days in a month. (Month is 0-indexed: 0 = Jan, 11 = Dec).",
    "signature": "getDaysInMonth(year: number, month: number): number",
    "example": "getDaysInMonth(...)",
    "output": "..."
  },
  {
    "id": "adddaystodate",
    "name": "addDaysToDate",
    "module": "Date-extended",
    "description": "Adds a specific number of days to a Date.",
    "signature": "addDaysToDate(date: Date, days: number): Date",
    "example": "addDaysToDate(...)",
    "output": "..."
  },
  {
    "id": "subdaysfromdate",
    "name": "subDaysFromDate",
    "module": "Date-extended",
    "description": "Subtracts a specific number of days from a Date.",
    "signature": "subDaysFromDate(date: Date, days: number): Date",
    "example": "subDaysFromDate(...)",
    "output": "..."
  },
  {
    "id": "getstartofday",
    "name": "getStartOfDay",
    "module": "Date-extended",
    "description": "Returns the start of the day for a given date (00:00:00.000).",
    "signature": "getStartOfDay(date: Date): Date",
    "example": "getStartOfDay(...)",
    "output": "..."
  },
  {
    "id": "getendofday",
    "name": "getEndOfDay",
    "module": "Date-extended",
    "description": "Returns the end of the day for a given date (23:59:59.999).",
    "signature": "getEndOfDay(date: Date): Date",
    "example": "getEndOfDay(...)",
    "output": "..."
  },
  {
    "id": "issamecalendarday",
    "name": "isSameCalendarDay",
    "module": "Date-extended",
    "description": "Checks if two dates are the exact same day (ignoring time).",
    "signature": "isSameCalendarDay(dateLeft: Date, dateRight: Date): boolean",
    "example": "isSameCalendarDay(...)",
    "output": "..."
  },
  {
    "id": "isdatebefore",
    "name": "isDateBefore",
    "module": "Date-extended",
    "description": "Checks if the first date is before the second date.",
    "signature": "isDateBefore(date: Date, dateToCompare: Date): boolean",
    "example": "isDateBefore(...)",
    "output": "..."
  },
  {
    "id": "isdateafter",
    "name": "isDateAfter",
    "module": "Date-extended",
    "description": "Checks if the first date is after the second date.",
    "signature": "isDateAfter(date: Date, dateToCompare: Date): boolean",
    "example": "isDateAfter(...)",
    "output": "..."
  },
  {
    "id": "isbetween",
    "name": "isBetween",
    "module": "Date-extended",
    "description": "Checks if a date is between two other dates.",
    "signature": "isBetween(date: Date, start: Date, end: Date, inclusive",
    "example": "isBetween(...)",
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
    "signature": "relativeTime(date: Date, baseDate",
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
    "id": "parseisoduration",
    "name": "parseIsoDuration",
    "module": "Datetime-pro",
    "description": "OptiKit DateTime Pro — ISO 8601 duration parsing/formatting, business day math,",
    "signature": "parseIsoDuration(iso: string): IsoDuration",
    "example": "parseIsoDuration(...)",
    "output": "..."
  },
  {
    "id": "formatisoduration",
    "name": "formatIsoDuration",
    "module": "Datetime-pro",
    "description": "Formats an `IsoDuration` object into an ISO 8601 duration string.",
    "signature": "formatIsoDuration(d: IsoDuration): string",
    "example": "formatIsoDuration(...)",
    "output": "..."
  },
  {
    "id": "isweekenddate",
    "name": "isWeekendDate",
    "module": "Datetime-pro",
    "description": "Checks if a UTC date falls on Saturday or Sunday.",
    "signature": "isWeekendDate(date: Date): boolean",
    "example": "isWeekendDate(...)",
    "output": "..."
  },
  {
    "id": "isbusinessday",
    "name": "isBusinessDay",
    "module": "Datetime-pro",
    "description": "Checks if a UTC date is a business day (Mon–Fri and not in `holidays`).",
    "signature": "isBusinessDay(date: Date, holidays: readonly string[]",
    "example": "isBusinessDay(...)",
    "output": "..."
  },
  {
    "id": "addbusinessdays",
    "name": "addBusinessDays",
    "module": "Datetime-pro",
    "description": "Adds `days` business days (positive or negative) to a UTC date.",
    "signature": "addBusinessDays( date: Date, days: number, holidays: readonly string[]",
    "example": "addBusinessDays(...)",
    "output": "..."
  },
  {
    "id": "diffbusinessdays",
    "name": "diffBusinessDays",
    "module": "Datetime-pro",
    "description": "Counts business days strictly between `start` and `end` (excluding `start`, including `end`).",
    "signature": "diffBusinessDays( start: Date, end: Date, holidays: readonly string[]",
    "example": "diffBusinessDays(...)",
    "output": "..."
  },
  {
    "id": "isleapyearnum",
    "name": "isLeapYearNum",
    "module": "Datetime-pro",
    "description": "Checks if a Gregorian year is a leap year.",
    "signature": "isLeapYearNum(year: number): boolean",
    "example": "isLeapYearNum(...)",
    "output": "..."
  },
  {
    "id": "daysinmonthcount",
    "name": "daysInMonthCount",
    "module": "Datetime-pro",
    "description": "Returns the number of days in a given `(year, month1To12)`.",
    "signature": "daysInMonthCount(year: number, month1To12: number): number",
    "example": "daysInMonthCount(...)",
    "output": "..."
  },
  {
    "id": "daysinyear",
    "name": "daysInYear",
    "module": "Datetime-pro",
    "description": "Returns the number of days in a Gregorian year (`365` or `366`).",
    "signature": "daysInYear(year: number): number",
    "example": "daysInYear(...)",
    "output": "..."
  },
  {
    "id": "isoweeknumber",
    "name": "isoWeekNumber",
    "module": "Datetime-pro",
    "description": "Computes the ISO-8601 week number (`1..53`) of a UTC date.",
    "signature": "isoWeekNumber(date: Date): number",
    "example": "isoWeekNumber(...)",
    "output": "..."
  },
  {
    "id": "isoweekyear",
    "name": "isoWeekYear",
    "module": "Datetime-pro",
    "description": "Computes the ISO-8601 week-numbering year of a UTC date.",
    "signature": "isoWeekYear(date: Date): number",
    "example": "isoWeekYear(...)",
    "output": "..."
  },
  {
    "id": "getquarter",
    "name": "getQuarter",
    "module": "Datetime-pro",
    "description": "Returns the calendar quarter (`1..4`) of a UTC date.",
    "signature": "getQuarter(date: Date): 1 | 2 | 3 | 4",
    "example": "getQuarter(...)",
    "output": "..."
  },
  {
    "id": "startofquarter",
    "name": "startOfQuarter",
    "module": "Datetime-pro",
    "description": "Returns the UTC start of the quarter for a date.",
    "signature": "startOfQuarter(date: Date): Date",
    "example": "startOfQuarter(...)",
    "output": "..."
  },
  {
    "id": "endofquarter",
    "name": "endOfQuarter",
    "module": "Datetime-pro",
    "description": "Returns the UTC end of the quarter for a date (`23:59:59.999`).",
    "signature": "endOfQuarter(date: Date): Date",
    "example": "endOfQuarter(...)",
    "output": "..."
  },
  {
    "id": "generatedaterange",
    "name": "generateDateRange",
    "module": "Datetime-pro",
    "description": "Generates an array of UTC dates from `start` to `end` stepping by `stepDays`.",
    "signature": "generateDateRange(start: Date, end: Date, stepDays",
    "example": "generateDateRange(...)",
    "output": "..."
  },
  {
    "id": "generaterruledates",
    "name": "generateRRuleDates",
    "module": "Datetime-pro",
    "description": "Generates recurring dates for `daily` | `weekly` | `monthly` | `yearly` schedules.",
    "signature": "generateRRuleDates(options",
    "example": "generateRRuleDates(...)",
    "output": "..."
  },
  {
    "id": "issameutcday",
    "name": "isSameUtcDay",
    "module": "Datetime-pro",
    "description": "Checks if two UTC dates fall on the same calendar day.",
    "signature": "isSameUtcDay(a: Date, b: Date): boolean",
    "example": "isSameUtcDay(...)",
    "output": "..."
  },
  {
    "id": "issamemonth",
    "name": "isSameMonth",
    "module": "Datetime-pro",
    "description": "Checks if two UTC dates fall in the same year and month.",
    "signature": "isSameMonth(a: Date, b: Date): boolean",
    "example": "isSameMonth(...)",
    "output": "..."
  },
  {
    "id": "isbetweendates",
    "name": "isBetweenDates",
    "module": "Datetime-pro",
    "description": "Checks if `date` is inclusively between `start` and `end`.",
    "signature": "isBetweenDates(date: Date, start: Date, end: Date): boolean",
    "example": "isBetweenDates(...)",
    "output": "..."
  },
  {
    "id": "overlapdateranges",
    "name": "overlapDateRanges",
    "module": "Datetime-pro",
    "description": "Returns the overlapping Date range between `[aStart, aEnd]` and `[bStart, bEnd]`, or `null`.",
    "signature": "overlapDateRanges( aStart: Date, aEnd: Date, bStart: Date, bEnd: Date )",
    "example": "overlapDateRanges(...)",
    "output": "..."
  },
  {
    "id": "formatrelativestrict",
    "name": "formatRelativeStrict",
    "module": "Datetime-pro",
    "description": "Formats a deterministic relative time string (`\"5 minutes ago\"`, `\"in 2 days\"`).",
    "signature": "formatRelativeStrict(target: Date, base: Date",
    "example": "formatRelativeStrict(...)",
    "output": "..."
  },
  {
    "id": "getfiscalyear",
    "name": "getFiscalYear",
    "module": "Datetime-pro",
    "description": "Computes the fiscal year given a configurable `fiscalStartMonth` (`1..12`, default `4` = April).",
    "signature": "getFiscalYear(date: Date, fiscalStartMonth",
    "example": "getFiscalYear(...)",
    "output": "..."
  },
  {
    "id": "getfiscalquarter",
    "name": "getFiscalQuarter",
    "module": "Datetime-pro",
    "description": "Computes the fiscal quarter (`1..4`) given a `fiscalStartMonth` (`1..12`).",
    "signature": "getFiscalQuarter(date: Date, fiscalStartMonth",
    "example": "getFiscalQuarter(...)",
    "output": "..."
  },
  {
    "id": "nthweekdayofmonth",
    "name": "nthWeekdayOfMonth",
    "module": "Datetime-pro",
    "description": "Finds the `nth` (1-indexed) occurrence of `weekday` (`0=Sun..6=Sat`) in `(year, month1To12)`.",
    "signature": "nthWeekdayOfMonth( year: number, month1To12: number, weekday: number, nth: number ): Date | null",
    "example": "nthWeekdayOfMonth(...)",
    "output": "..."
  },
  {
    "id": "deepfreeze",
    "name": "deepFreeze",
    "module": "Deep",
    "description": "Deep Object Operations",
    "signature": "deepFreeze<T extends object>(obj: T): Readonly<T>",
    "example": "deepFreeze(...)",
    "output": "..."
  },
  {
    "id": "createtoken",
    "name": "createToken",
    "module": "Di",
    "description": "OptiKit DI — Zero-dependency Inversion of Control (IoC) & Dependency Injection container",
    "signature": "createToken<T>(name: string): InjectionToken<T>",
    "example": "createToken(...)",
    "output": "..."
  },
  {
    "id": "singleton",
    "name": "singleton",
    "module": "Di",
    "description": "Creates a singleton binding (one shared instance per root container).",
    "signature": "singleton<T>( token: InjectionToken<T>, factory: (container: DIContainer)",
    "example": "singleton(...)",
    "output": "..."
  },
  {
    "id": "transient",
    "name": "transient",
    "module": "Di",
    "description": "Creates a transient binding (new instance on every resolve).",
    "signature": "transient<T>( token: InjectionToken<T>, factory: (container: DIContainer)",
    "example": "transient(...)",
    "output": "..."
  },
  {
    "id": "scoped",
    "name": "scoped",
    "module": "Di",
    "description": "Creates a scoped binding (one instance per scope/child container).",
    "signature": "scoped<T>( token: InjectionToken<T>, factory: (container: DIContainer)",
    "example": "scoped(...)",
    "output": "..."
  },
  {
    "id": "valuebinding",
    "name": "valueBinding",
    "module": "Di",
    "description": "Creates a constant value binding.",
    "signature": "valueBinding<T>(token: InjectionToken<T>, value: T): BindingRecord<T>",
    "example": "valueBinding(...)",
    "output": "..."
  },
  {
    "id": "factorybinding",
    "name": "factoryBinding",
    "module": "Di",
    "description": "Creates a factory binding (alias for transient factory).",
    "signature": "factoryBinding<T>( token: InjectionToken<T>, factory: (container: DIContainer)",
    "example": "factoryBinding(...)",
    "output": "..."
  },
  {
    "id": "aliasbinding",
    "name": "aliasBinding",
    "module": "Di",
    "description": "Creates an alias binding that delegates resolution to another token.",
    "signature": "aliasBinding<T>( token: InjectionToken<T>, targetToken: InjectionToken<T> ): BindingRecord<T>",
    "example": "aliasBinding(...)",
    "output": "..."
  },
  {
    "id": "createcontainer",
    "name": "createContainer",
    "module": "Di",
    "description": "Creates a new IoC DI container.",
    "signature": "createContainer(parent?: DIContainer, parentBindings?: Map<symbol, BindingRecord<unknown>>): DIContainer",
    "example": "createContainer(...)",
    "output": "..."
  },
  {
    "id": "resolve",
    "name": "resolve",
    "module": "Di",
    "description": "Resolves a token from a container.",
    "signature": "resolve<T>(container: DIContainer, token: InjectionToken<T>): T",
    "example": "resolve(...)",
    "output": "..."
  },
  {
    "id": "resolveoptional",
    "name": "resolveOptional",
    "module": "Di",
    "description": "Resolves a token optionally, returning `undefined` if unbound.",
    "signature": "resolveOptional<T>(container: DIContainer, token: InjectionToken<T>): T | undefined",
    "example": "resolveOptional(...)",
    "output": "..."
  },
  {
    "id": "resolveall",
    "name": "resolveAll",
    "module": "Di",
    "description": "Resolves multiple tokens from a container.",
    "signature": "resolveAll<T>(container: DIContainer, tokens: readonly InjectionToken<T>[]): T[]",
    "example": "resolveAll(...)",
    "output": "..."
  },
  {
    "id": "hasbinding",
    "name": "hasBinding",
    "module": "Di",
    "description": "Checks if a token is registered in the container.",
    "signature": "hasBinding<T>(container: DIContainer, token: InjectionToken<T>): boolean",
    "example": "hasBinding(...)",
    "output": "..."
  },
  {
    "id": "overridebinding",
    "name": "overrideBinding",
    "module": "Di",
    "description": "Overrides an existing binding in the container.",
    "signature": "overrideBinding<T>(container: DIContainer, binding: BindingRecord<T>): DIContainer",
    "example": "overrideBinding(...)",
    "output": "..."
  },
  {
    "id": "createscope",
    "name": "createScope",
    "module": "Di",
    "description": "Creates a child scope from a container.",
    "signature": "createScope(container: DIContainer): DIContainer",
    "example": "createScope(...)",
    "output": "..."
  },
  {
    "id": "disposecontainer",
    "name": "disposeContainer",
    "module": "Di",
    "description": "Disposes all singleton and scoped instances in a container.",
    "signature": "disposeContainer(container: DIContainer): void",
    "example": "disposeContainer(...)",
    "output": "..."
  },
  {
    "id": "clearcontainer",
    "name": "clearContainer",
    "module": "Di",
    "description": "Clears all bindings and instances in a container.",
    "signature": "clearContainer(container: DIContainer): void",
    "example": "clearContainer(...)",
    "output": "..."
  },
  {
    "id": "lazyresolve",
    "name": "lazyResolve",
    "module": "Di",
    "description": "Returns a lazy resolver thunk for deferred dependency resolution.",
    "signature": "lazyResolve<T>(container: DIContainer, token: InjectionToken<T>): ()",
    "example": "lazyResolve(...)",
    "output": "..."
  },
  {
    "id": "injectable",
    "name": "injectable",
    "module": "Di",
    "description": "Wraps a class constructor with its token dependencies for clean registration.",
    "signature": "injectable<T, Deps extends readonly InjectionToken<unknown>[]>( ctor: new (...args: never[])",
    "example": "injectable(...)",
    "output": "..."
  },
  {
    "id": "getdependencygraph",
    "name": "getDependencyGraph",
    "module": "Di",
    "description": "Returns the dependency adjacency map for all registered tokens.",
    "signature": "getDependencyGraph(container: DIContainer): Record<string, string[]>",
    "example": "getDependencyGraph(...)",
    "output": "..."
  },
  {
    "id": "validatecontainer",
    "name": "validateContainer",
    "module": "Di",
    "description": "Validates that all declared dependencies in the container have registered bindings.",
    "signature": "validateContainer(container: DIContainer)",
    "example": "validateContainer(...)",
    "output": "..."
  },
  {
    "id": "diffobjects",
    "name": "diffObjects",
    "module": "Diff",
    "description": "OptiKit Diff & Patch — High-performance deep object diffing, array diffing,",
    "signature": "diffObjects<T extends Record<string, any>>(original: T, updated: T): ObjectDiff",
    "example": "```ts\nconst a = { name: 'Alice', age: 25 };\nconst b = { name: 'Alice', age: 26, city: 'London' };\nconst diff = diffObjects(a, b);\n```",
    "output": "{ added: { city: 'London' }, removed: {}, updated: { age: { oldValue: 25, newValue: 26 } }, hasChanges: true }"
  },
  {
    "id": "patchobject",
    "name": "patchObject",
    "module": "Diff",
    "description": "Applies an ObjectDiff to a target object and returns the resulting object.",
    "signature": "patchObject<T extends Record<string, any>>(target: T, diff: ObjectDiff): T",
    "example": "```ts\nconst obj = { name: 'Alice', age: 25 };\nconst updated = patchObject(obj, diff);\n```",
    "output": "..."
  },
  {
    "id": "diffarrays",
    "name": "diffArrays",
    "module": "Diff",
    "description": "Compares two arrays and produces added, removed, and unchanged elements.",
    "signature": "diffArrays<T>(arr1: readonly T[], arr2: readonly T[], comparator?: (a: T, b: T)",
    "example": "```ts\nconst diff = diffArrays([1, 2, 3], [2, 3, 4]);\n```",
    "output": "{ added: [4], removed: [1], unchanged: [2, 3], hasChanges: true }"
  },
  {
    "id": "createjsonpatch",
    "name": "createJsonPatch",
    "module": "Diff",
    "description": "Generates an RFC 6902 JSON Patch representing the changes from original to target.",
    "signature": "createJsonPatch(original: any, target: any, basePath",
    "example": "```ts\nconst patch = createJsonPatch({ a: 1 }, { a: 2, b: 'hello' });\n//   { op: 'replace', path: '/a', value: 2 },\n//   { op: 'add', path: '/b', value: 'hello' }\n// ]\n```",
    "output": "["
  },
  {
    "id": "applyjsonpatch",
    "name": "applyJsonPatch",
    "module": "Diff",
    "description": "Applies an RFC 6902 JSON Patch to a document and returns a new document.",
    "signature": "applyJsonPatch<T",
    "example": "```ts\nconst doc = { a: 1 };\nconst patch = [{ op: 'add', path: '/b', value: 2 }];\nconst result = applyJsonPatch(doc, patch);\n```",
    "output": "{ a: 1, b: 2 }"
  },
  {
    "id": "diffwords",
    "name": "diffWords",
    "module": "Diff",
    "description": "Computes a word-by-word diff between two text strings.",
    "signature": "diffWords(text1: string, text2: string): TextDiffPart[]",
    "example": "```ts\ndiffWords('hello old world', 'hello new world');\n//   { type: 'unchanged', value: 'hello' },\n//   { type: 'removed', value: 'old' },\n//   { type: 'added', value: 'new' },\n//   { type: 'unchanged', value: 'world' }\n// ]\n```",
    "output": "["
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
    "id": "stack",
    "name": "Stack",
    "module": "Ds",
    "description": "Isomorphic collection of standard data structures missing in native JavaScript.",
    "signature": "Stack<T>",
    "example": "Stack(...)",
    "output": "..."
  },
  {
    "id": "queue",
    "name": "Queue",
    "module": "Ds",
    "description": "Standard FIFO (First-In-First-Out) Queue.",
    "signature": "Queue<T>",
    "example": "Queue(...)",
    "output": "..."
  },
  {
    "id": "priorityqueue",
    "name": "PriorityQueue",
    "module": "Ds",
    "description": "Highly performant binary-heap-based Priority Queue.",
    "signature": "PriorityQueue<T>",
    "example": "PriorityQueue(...)",
    "output": "..."
  },
  {
    "id": "bimap",
    "name": "BiMap",
    "module": "Ds",
    "description": "Bidirectional 1-to-1 Map mapping unique keys to unique values.",
    "signature": "BiMap<K, V>",
    "example": "BiMap(...)",
    "output": "..."
  },
  {
    "id": "linear",
    "name": "linear",
    "module": "Easing",
    "description": "Standard animation easing functions.",
    "signature": "linear(t: number): number",
    "example": "linear(...)",
    "output": "..."
  },
  {
    "id": "encodevarint",
    "name": "encodeVarint",
    "module": "Encoding-pro",
    "description": "OptiKit Encoding Pro — Varint, ZigZag, LEB128, TLV, Netstring, BSON-lite,",
    "signature": "encodeVarint(value: number): Uint8Array",
    "example": "encodeVarint(...)",
    "output": "..."
  },
  {
    "id": "decodevarint",
    "name": "decodeVarint",
    "module": "Encoding-pro",
    "description": "Decodes an unsigned Varint from `bytes` at `offset`, returning `{ value, bytesRead }`.",
    "signature": "decodeVarint(bytes: Uint8Array, offset",
    "example": "decodeVarint(...)",
    "output": "..."
  },
  {
    "id": "encodezigzag",
    "name": "encodeZigZag",
    "module": "Encoding-pro",
    "description": "ZigZag-encodes a signed 32-bit integer into an unsigned integer.",
    "signature": "encodeZigZag(n: number): number",
    "example": "encodeZigZag(...)",
    "output": "..."
  },
  {
    "id": "decodezigzag",
    "name": "decodeZigZag",
    "module": "Encoding-pro",
    "description": "Decodes a ZigZag-encoded unsigned integer back to a signed 32-bit integer.",
    "signature": "decodeZigZag(n: number): number",
    "example": "decodeZigZag(...)",
    "output": "..."
  },
  {
    "id": "encodetlv",
    "name": "encodeTlv",
    "module": "Encoding-pro",
    "description": "Encodes a Type-Length-Value (TLV) frame (`1-byte tag + varint length + payload`).",
    "signature": "encodeTlv(tag: number, value: Uint8Array): Uint8Array",
    "example": "encodeTlv(...)",
    "output": "..."
  },
  {
    "id": "decodetlv",
    "name": "decodeTlv",
    "module": "Encoding-pro",
    "description": "Decodes a TLV frame from `bytes` at `offset`.",
    "signature": "decodeTlv( bytes: Uint8Array, offset",
    "example": "decodeTlv(...)",
    "output": "..."
  },
  {
    "id": "encodeleb128",
    "name": "encodeLeb128",
    "module": "Encoding-pro",
    "description": "Encodes a BigInt using unsigned LEB128.",
    "signature": "encodeLeb128(value: bigint): Uint8Array",
    "example": "encodeLeb128(...)",
    "output": "..."
  },
  {
    "id": "decodeleb128",
    "name": "decodeLeb128",
    "module": "Encoding-pro",
    "description": "Decodes unsigned LEB128 bytes into a BigInt.",
    "signature": "decodeLeb128(bytes: Uint8Array, offset",
    "example": "decodeLeb128(...)",
    "output": "..."
  },
  {
    "id": "packbsonlite",
    "name": "packBsonLite",
    "module": "Encoding-pro",
    "description": "Packs a JSON-compatible object into a compact binary BSON-lite buffer.",
    "signature": "packBsonLite(obj: unknown): Uint8Array",
    "example": "packBsonLite(...)",
    "output": "..."
  },
  {
    "id": "unpackbsonlite",
    "name": "unpackBsonLite",
    "module": "Encoding-pro",
    "description": "Unpacks a BSON-lite buffer back into a JavaScript value.",
    "signature": "unpackBsonLite<T",
    "example": "unpackBsonLite(...)",
    "output": "..."
  },
  {
    "id": "encodequerystringstrict",
    "name": "encodeQueryStringStrict",
    "module": "Encoding-pro",
    "description": "Encodes a flat record into an RFC 3986 strict query string (sorted keys).",
    "signature": "encodeQueryStringStrict(params: Record<string, string | number | boolean>): string",
    "example": "encodeQueryStringStrict(...)",
    "output": "..."
  },
  {
    "id": "decodequerystringstrict",
    "name": "decodeQueryStringStrict",
    "module": "Encoding-pro",
    "description": "Decodes a query string into a key-value record.",
    "signature": "decodeQueryStringStrict(qs: string): Record<string, string>",
    "example": "decodeQueryStringStrict(...)",
    "output": "..."
  },
  {
    "id": "encodenetstring",
    "name": "encodeNetstring",
    "module": "Encoding-pro",
    "description": "Encodes a string into a DJB Netstring (`<len>:<str>,`).",
    "signature": "encodeNetstring(data: string): string",
    "example": "encodeNetstring(...)",
    "output": "..."
  },
  {
    "id": "decodenetstring",
    "name": "decodeNetstring",
    "module": "Encoding-pro",
    "description": "Decodes a DJB Netstring (`<len>:<str>,`).",
    "signature": "decodeNetstring(frame: string): string",
    "example": "decodeNetstring(...)",
    "output": "..."
  },
  {
    "id": "bytestobitstring",
    "name": "bytesToBitString",
    "module": "Encoding-pro",
    "description": "Converts a `Uint8Array` to an 8-bit-per-byte binary string.",
    "signature": "bytesToBitString(bytes: Uint8Array): string",
    "example": "bytesToBitString(...)",
    "output": "..."
  },
  {
    "id": "bitstringtobytes",
    "name": "bitStringToBytes",
    "module": "Encoding-pro",
    "description": "Converts an 8-bit-aligned binary string back to a `Uint8Array`.",
    "signature": "bitStringToBytes(bits: string): Uint8Array",
    "example": "bitStringToBytes(...)",
    "output": "..."
  },
  {
    "id": "uint8arrayconcat",
    "name": "uint8ArrayConcat",
    "module": "Encoding-pro",
    "description": "Concatenates multiple `Uint8Array` buffers into one.",
    "signature": "uint8ArrayConcat(arrays: readonly Uint8Array[]): Uint8Array",
    "example": "uint8ArrayConcat(...)",
    "output": "..."
  },
  {
    "id": "uint8arrayequals",
    "name": "uint8ArrayEquals",
    "module": "Encoding-pro",
    "description": "Checks byte-for-byte equality of two `Uint8Array` instances.",
    "signature": "uint8ArrayEquals(a: Uint8Array, b: Uint8Array): boolean",
    "example": "uint8ArrayEquals(...)",
    "output": "..."
  },
  {
    "id": "uint8arrayindexof",
    "name": "uint8ArrayIndexOf",
    "module": "Encoding-pro",
    "description": "Finds the first index of `needle` sequence inside `haystack`, or `-1`.",
    "signature": "uint8ArrayIndexOf(haystack: Uint8Array, needle: Uint8Array, start",
    "example": "uint8ArrayIndexOf(...)",
    "output": "..."
  },
  {
    "id": "uint8arraysplit",
    "name": "uint8ArraySplit",
    "module": "Encoding-pro",
    "description": "Splits a `Uint8Array` by a delimiter byte sequence.",
    "signature": "uint8ArraySplit(data: Uint8Array, delimiter: Uint8Array): Uint8Array[]",
    "example": "uint8ArraySplit(...)",
    "output": "..."
  },
  {
    "id": "uint32tobytesbe",
    "name": "uint32ToBytesBE",
    "module": "Encoding-pro",
    "description": "Encodes a 32-bit unsigned integer into 4 big-endian bytes.",
    "signature": "uint32ToBytesBE(n: number): Uint8Array",
    "example": "uint32ToBytesBE(...)",
    "output": "..."
  },
  {
    "id": "bytestouint32be",
    "name": "bytesToUint32BE",
    "module": "Encoding-pro",
    "description": "Decodes 4 big-endian bytes into an unsigned 32-bit integer.",
    "signature": "bytesToUint32BE(bytes: Uint8Array, offset",
    "example": "bytesToUint32BE(...)",
    "output": "..."
  },
  {
    "id": "float64tobytesbe",
    "name": "float64ToBytesBE",
    "module": "Encoding-pro",
    "description": "Encodes a 64-bit IEEE-754 float into 8 big-endian bytes.",
    "signature": "float64ToBytesBE(n: number): Uint8Array",
    "example": "float64ToBytesBE(...)",
    "output": "..."
  },
  {
    "id": "bytestofloat64be",
    "name": "bytesToFloat64BE",
    "module": "Encoding-pro",
    "description": "Decodes 8 big-endian bytes into a 64-bit IEEE-754 float.",
    "signature": "bytesToFloat64BE(bytes: Uint8Array, offset",
    "example": "bytesToFloat64BE(...)",
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
    "id": "codeerror",
    "name": "CodeError",
    "module": "Error",
    "description": "Custom Error class with a code property.",
    "signature": "CodeError extends Error",
    "example": "CodeError(...)",
    "output": "..."
  },
  {
    "id": "httperror",
    "name": "HttpError",
    "module": "Error",
    "description": "Custom Error class for HTTP errors.",
    "signature": "HttpError extends Error",
    "example": "HttpError(...)",
    "output": "..."
  },
  {
    "id": "normalizeerror",
    "name": "normalizeError",
    "module": "Error",
    "description": "Safely parses an unknown error into a standard Error object.",
    "signature": "normalizeError(err: unknown): Error",
    "example": "normalizeError(...)",
    "output": "..."
  },
  {
    "id": "geterrormessage",
    "name": "getErrorMessage",
    "module": "Error",
    "description": "Attempts to extract a user-friendly error message from an unknown error.",
    "signature": "getErrorMessage(err: unknown, fallback",
    "example": "getErrorMessage(...)",
    "output": "..."
  },
  {
    "id": "parsestacktrace",
    "name": "parseStackTrace",
    "module": "Error",
    "description": "Parses a stack trace string into an array of call site strings.",
    "signature": "parseStackTrace(stack?: string): string[]",
    "example": "parseStackTrace(...)",
    "output": "..."
  },
  {
    "id": "trycatch",
    "name": "tryCatch",
    "module": "Error",
    "description": "Wraps a function to catch synchronous exceptions and return them as a result tuple [error, result].",
    "signature": "tryCatch<T, E",
    "example": "tryCatch(...)",
    "output": "..."
  },
  {
    "id": "eventemitter",
    "name": "EventEmitter",
    "module": "Events",
    "description": "A lightweight, high-performance event emitter class for managing pub-sub events.",
    "signature": "EventEmitter",
    "example": "EventEmitter(...)",
    "output": "..."
  },
  {
    "id": "listen",
    "name": "listen",
    "module": "Events",
    "description": "Registers a listener function for a specific event name.",
    "signature": "listen( target: EventTarget, event: string, handler: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions ): ()",
    "example": "listen(...)",
    "output": "..."
  },
  {
    "id": "listenonce",
    "name": "listenOnce",
    "module": "Events",
    "description": "Attaches a one-time event listener to a target. Returns a function to remove it early.",
    "signature": "listenOnce( target: EventTarget, event: string, handler: EventListener, options?: boolean | AddEventListenerOptions ): ()",
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
    "signature": "delegateEvent( target: HTMLElement | Document, event: string, selector: string, handler: (e: Event, matchedTarget: HTMLElement)",
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
    "id": "formatbytes",
    "name": "formatBytes",
    "module": "File",
    "description": "Formats a file size in bytes to a human-readable string.",
    "signature": "formatBytes(bytes: number, decimals",
    "example": "formatBytes(...)",
    "output": "..."
  },
  {
    "id": "getfileextension",
    "name": "getFileExtension",
    "module": "File",
    "description": "Extracts the extension from a file name.",
    "signature": "getFileExtension(filename: string): string",
    "example": "getFileExtension(...)",
    "output": "..."
  },
  {
    "id": "getbasename",
    "name": "getBaseName",
    "module": "File",
    "description": "Gets the base name of a file (name without extension).",
    "signature": "getBaseName(filename: string): string",
    "example": "getBaseName(...)",
    "output": "..."
  },
  {
    "id": "getmimetype",
    "name": "getMimeType",
    "module": "File",
    "description": "Attempts to guess the MIME type based on file extension.",
    "signature": "getMimeType(filename: string): string | undefined",
    "example": "getMimeType(...)",
    "output": "..."
  },
  {
    "id": "isimage",
    "name": "isImage",
    "module": "File",
    "description": "Checks if a file name represents an image.",
    "signature": "isImage(filename: string): boolean",
    "example": "isImage(...)",
    "output": "..."
  },
  {
    "id": "isvideo",
    "name": "isVideo",
    "module": "File",
    "description": "Checks if a file name represents a video.",
    "signature": "isVideo(filename: string): boolean",
    "example": "isVideo(...)",
    "output": "..."
  },
  {
    "id": "isaudio",
    "name": "isAudio",
    "module": "File",
    "description": "Checks if a file name represents audio.",
    "signature": "isAudio(filename: string): boolean",
    "example": "isAudio(...)",
    "output": "..."
  },
  {
    "id": "isdocument",
    "name": "isDocument",
    "module": "File",
    "description": "Checks if a file name represents a document.",
    "signature": "isDocument(filename: string): boolean",
    "example": "isDocument(...)",
    "output": "..."
  },
  {
    "id": "readasdataurl",
    "name": "readAsDataURL",
    "module": "File",
    "description": "Reads a File or Blob as a Data URL. (Browser only)",
    "signature": "readAsDataURL(file: Blob): Promise<string>",
    "example": "readAsDataURL(...)",
    "output": "..."
  },
  {
    "id": "readastext",
    "name": "readAsText",
    "module": "File",
    "description": "Reads a File or Blob as Text. (Browser only)",
    "signature": "readAsText(file: Blob, encoding",
    "example": "readAsText(...)",
    "output": "..."
  },
  {
    "id": "npv",
    "name": "npv",
    "module": "Finance-pro",
    "description": "OptiKit Finance Pro — Quantitative finance, discounted cash flow (NPV, IRR, MIRR, XNPV),",
    "signature": "npv(discountRate: number, cashFlows: readonly number[]): number",
    "example": "npv(...)",
    "output": "..."
  },
  {
    "id": "irr",
    "name": "irr",
    "module": "Finance-pro",
    "description": "Computes Internal Rate of Return (IRR) using Newton-Raphson with bisection fallback.",
    "signature": "irr(cashFlows: readonly number[], guess",
    "example": "irr(...)",
    "output": "..."
  },
  {
    "id": "mirr",
    "name": "mirr",
    "module": "Finance-pro",
    "description": "Computes Modified Internal Rate of Return (MIRR).",
    "signature": "mirr( cashFlows: readonly number[], financeRate: number, reinvestRate: number ): number",
    "example": "mirr(...)",
    "output": "..."
  },
  {
    "id": "xnpv",
    "name": "xnpv",
    "module": "Finance-pro",
    "description": "Computes Net Present Value for irregular cash flow dates (`XNPV`).",
    "signature": "xnpv( discountRate: number, cashFlows: readonly",
    "example": "xnpv(...)",
    "output": "..."
  },
  {
    "id": "pmt",
    "name": "pmt",
    "module": "Finance-pro",
    "description": "Computes fixed periodic loan payment (`PMT`).",
    "signature": "pmt(ratePerPeriod: number, totalPeriods: number, presentValue: number): number",
    "example": "pmt(...)",
    "output": "..."
  },
  {
    "id": "ipmt",
    "name": "ipmt",
    "module": "Finance-pro",
    "description": "Computes the interest portion of a loan payment for period `period` (1-indexed).",
    "signature": "ipmt( ratePerPeriod: number, period: number, totalPeriods: number, presentValue: number ): number",
    "example": "ipmt(...)",
    "output": "..."
  },
  {
    "id": "ppmt",
    "name": "ppmt",
    "module": "Finance-pro",
    "description": "Computes the principal portion of a loan payment for period `period` (1-indexed).",
    "signature": "ppmt( ratePerPeriod: number, period: number, totalPeriods: number, presentValue: number ): number",
    "example": "ppmt(...)",
    "output": "..."
  },
  {
    "id": "amortizationschedule",
    "name": "amortizationSchedule",
    "module": "Finance-pro",
    "description": "Generates a full loan amortization schedule.",
    "signature": "amortizationSchedule( principal: number, annualRate: number, months: number )",
    "example": "amortizationSchedule(...)",
    "output": "..."
  },
  {
    "id": "cagr",
    "name": "cagr",
    "module": "Finance-pro",
    "description": "Computes Compound Annual Growth Rate (CAGR).",
    "signature": "cagr(beginValue: number, endValue: number, years: number): number",
    "example": "cagr(...)",
    "output": "..."
  },
  {
    "id": "sharperatio",
    "name": "sharpeRatio",
    "module": "Finance-pro",
    "description": "Computes annualized or periodic Sharpe Ratio.",
    "signature": "sharpeRatio(returns: readonly number[], riskFreeRate",
    "example": "sharpeRatio(...)",
    "output": "..."
  },
  {
    "id": "sortinoratio",
    "name": "sortinoRatio",
    "module": "Finance-pro",
    "description": "Computes Sortino Ratio using downside deviation below `targetReturn`.",
    "signature": "sortinoRatio(returns: readonly number[], targetReturn",
    "example": "sortinoRatio(...)",
    "output": "..."
  },
  {
    "id": "maxdrawdown",
    "name": "maxDrawdown",
    "module": "Finance-pro",
    "description": "Computes Maximum Drawdown (as a positive fraction `0..1`) from an equity curve.",
    "signature": "maxDrawdown(equityCurve: readonly number[]): number",
    "example": "maxDrawdown(...)",
    "output": "..."
  },
  {
    "id": "calmarratio",
    "name": "calmarRatio",
    "module": "Finance-pro",
    "description": "Computes Calmar Ratio (`annualizedReturn / maxDrawdown`).",
    "signature": "calmarRatio(annualizedReturn: number, equityCurve: readonly number[]): number",
    "example": "calmarRatio(...)",
    "output": "..."
  },
  {
    "id": "valueatriskhistorical",
    "name": "valueAtRiskHistorical",
    "module": "Finance-pro",
    "description": "Computes historical Value at Risk (VaR) at `confidence` level (e.g. `0.95`).",
    "signature": "valueAtRiskHistorical(returns: readonly number[], confidence",
    "example": "valueAtRiskHistorical(...)",
    "output": "..."
  },
  {
    "id": "conditionalvar",
    "name": "conditionalVaR",
    "module": "Finance-pro",
    "description": "Computes Conditional Value at Risk (Expected Shortfall / CVaR).",
    "signature": "conditionalVaR(returns: readonly number[], confidence",
    "example": "conditionalVaR(...)",
    "output": "..."
  },
  {
    "id": "betacoefficient",
    "name": "betaCoefficient",
    "module": "Finance-pro",
    "description": "Computes portfolio Beta relative to benchmark returns.",
    "signature": "betaCoefficient(assetReturns: readonly number[], marketReturns: readonly number[]): number",
    "example": "betaCoefficient(...)",
    "output": "..."
  },
  {
    "id": "alphajensen",
    "name": "alphaJensen",
    "module": "Finance-pro",
    "description": "Computes Jensen's Alpha.",
    "signature": "alphaJensen( portfolioReturn: number, riskFreeRate: number, beta: number, marketReturn: number ): number",
    "example": "alphaJensen(...)",
    "output": "..."
  },
  {
    "id": "treynorratio",
    "name": "treynorRatio",
    "module": "Finance-pro",
    "description": "Computes Treynor Ratio (`(portfolioReturn - riskFreeRate) / beta`).",
    "signature": "treynorRatio(portfolioReturn: number, riskFreeRate: number, beta: number): number",
    "example": "treynorRatio(...)",
    "output": "..."
  },
  {
    "id": "blackscholescall",
    "name": "blackScholesCall",
    "module": "Finance-pro",
    "description": "Prices a European Call option using Black-Scholes-Merton.",
    "signature": "blackScholesCall( spot: number, strike: number, timeYears: number, riskFreeRate: number, volatility: number ): number",
    "example": "blackScholesCall(...)",
    "output": "..."
  },
  {
    "id": "blackscholesput",
    "name": "blackScholesPut",
    "module": "Finance-pro",
    "description": "Prices a European Put option using Black-Scholes-Merton.",
    "signature": "blackScholesPut( spot: number, strike: number, timeYears: number, riskFreeRate: number, volatility: number ): number",
    "example": "blackScholesPut(...)",
    "output": "..."
  },
  {
    "id": "optiondelta",
    "name": "optionDelta",
    "module": "Finance-pro",
    "description": "Computes Black-Scholes option Delta (`call` or `put`).",
    "signature": "optionDelta( type: 'call' | 'put', spot: number, strike: number, timeYears: number, riskFreeRate: number, volatility: number ): number",
    "example": "optionDelta(...)",
    "output": "..."
  },
  {
    "id": "bondprice",
    "name": "bondPrice",
    "module": "Finance-pro",
    "description": "Computes present value of a fixed-coupon bond.",
    "signature": "bondPrice( faceValue: number, couponRate: number, yieldRate: number, periods: number, frequency",
    "example": "bondPrice(...)",
    "output": "..."
  },
  {
    "id": "bondyieldtomaturity",
    "name": "bondYieldToMaturity",
    "module": "Finance-pro",
    "description": "Estimates Bond Yield to Maturity (YTM) via bisection.",
    "signature": "bondYieldToMaturity( price: number, faceValue: number, couponRate: number, periods: number, frequency",
    "example": "bondYieldToMaturity(...)",
    "output": "..."
  },
  {
    "id": "macaulayduration",
    "name": "macaulayDuration",
    "module": "Finance-pro",
    "description": "Computes Macaulay Duration (in years) of a fixed-coupon bond.",
    "signature": "macaulayDuration( faceValue: number, couponRate: number, yieldRate: number, periods: number, frequency",
    "example": "macaulayDuration(...)",
    "output": "..."
  },
  {
    "id": "calculatesimpleinterest",
    "name": "calculateSimpleInterest",
    "module": "Finance",
    "description": "Financial Math Utilities",
    "signature": "calculateSimpleInterest(principal: number, rate: number, time: number): number",
    "example": "calculateSimpleInterest(...)",
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
    "signature": "formatPercentage(value: number, decimals: number",
    "example": "formatPercentage(...)",
    "output": "..."
  },
  {
    "id": "formatlistjoin",
    "name": "formatListJoin",
    "module": "Format",
    "description": "Joins an array of strings with a conjunction before the last item.",
    "signature": "formatListJoin(items: string[], conjunction: string",
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
    "signature": "maskString(str: string, visibleChars: number",
    "example": "maskString(...)",
    "output": "..."
  },
  {
    "id": "truncatemiddle",
    "name": "truncateMiddle",
    "module": "Format",
    "description": "Truncates a string in the middle, preserving the beginning and end.",
    "signature": "truncateMiddle(str: string, maxLen: number, separator: string",
    "example": "truncateMiddle(...)",
    "output": "..."
  },
  {
    "id": "formatwithseparator",
    "name": "formatWithSeparator",
    "module": "Format",
    "description": "Formats a number with a thousands separator.",
    "signature": "formatWithSeparator(num: number, separator: string",
    "example": "formatWithSeparator(...)",
    "output": "..."
  },
  {
    "id": "pipe",
    "name": "pipe",
    "module": "Fp",
    "description": "OptiKit FP — Data-last, curried functional programming utilities.",
    "signature": "pipe<T>(value: T): T; export function pipe<T, A>(value: T, fn1: (arg: T)",
    "example": "```ts\nconst result = pipe(\n[1, 2, 3, 4],\nmap((n: number) => n * 2),\nfilter((n: number) => n > 4)\n);\n```",
    "output": "[6, 8]"
  },
  {
    "id": "flow",
    "name": "flow",
    "module": "Fp",
    "description": "Composes functions from left-to-right into a reusable pipeline function.",
    "signature": "flow<A, B>(fn1: (a: A)",
    "example": "```ts\nconst doubleAndFilter = flow(\nmap((n: number) => n * 2),\nfilter((n: number) => n > 4)\n);\ndoubleAndFilter([1, 2, 3, 4]);\n```",
    "output": "[6, 8]"
  },
  {
    "id": "compose",
    "name": "compose",
    "module": "Fp",
    "description": "Composes functions from right-to-left.",
    "signature": "compose(...fns: Array<(arg: any)",
    "example": "```ts\nconst addOneThenDouble = compose((n: number) => n * 2, (n: number) => n + 1);\naddOneThenDouble(3);\n```",
    "output": "8"
  },
  {
    "id": "curry",
    "name": "curry",
    "module": "Fp",
    "description": "Curries a function of any arity.",
    "signature": "curry(fn: (...args: any[])",
    "example": "```ts\nconst add3 = curry((a: number, b: number, c: number) => a + b + c);\nadd3(1)(2)(3);\n```",
    "output": "6"
  },
  {
    "id": "identity",
    "name": "identity",
    "module": "Fp",
    "description": "Identity combinator. Returns its argument unchanged.",
    "signature": "identity<T>(val: T): T",
    "example": "identity(...)",
    "output": "..."
  },
  {
    "id": "always",
    "name": "always",
    "module": "Fp",
    "description": "Always combinator. Returns a constant value getter.",
    "signature": "always<T>(val: T): ()",
    "example": "always(...)",
    "output": "..."
  },
  {
    "id": "tap",
    "name": "tap",
    "module": "Fp",
    "description": "Tap combinator. Executes a side-effect and returns the original value.",
    "signature": "tap<T>(sideEffect: (val: T)",
    "example": "tap(...)",
    "output": "..."
  },
  {
    "id": "when",
    "name": "when",
    "module": "Fp",
    "description": "When combinator. Runs a transformation if the predicate is true, otherwise returns original.",
    "signature": "when<T, R>(predicate: (val: T)",
    "example": "when(...)",
    "output": "..."
  },
  {
    "id": "unless",
    "name": "unless",
    "module": "Fp",
    "description": "Unless combinator. Runs a transformation if the predicate is false, otherwise returns original.",
    "signature": "unless<T, R>(predicate: (val: T)",
    "example": "unless(...)",
    "output": "..."
  },
  {
    "id": "map",
    "name": "map",
    "module": "Fp",
    "description": "Data-last map.",
    "signature": "map<T, R>(fn: (item: T, index: number)",
    "example": "```ts\nmap((x: number) => x * 2)([1, 2, 3]);\n```",
    "output": "[2, 4, 6]"
  },
  {
    "id": "filter",
    "name": "filter",
    "module": "Fp",
    "description": "Data-last filter.",
    "signature": "filter<T>(predicate: (item: T, index: number)",
    "example": "```ts\nfilter((x: number) => x % 2 === 0)([1, 2, 3, 4]);\n```",
    "output": "[2, 4]"
  },
  {
    "id": "reduce",
    "name": "reduce",
    "module": "Fp",
    "description": "Data-last reduce.",
    "signature": "reduce<T, R>(reducer: (acc: R, item: T, index: number)",
    "example": "```ts\nreduce((acc: number, n: number) => acc + n, 0)([1, 2, 3]);\n```",
    "output": "6"
  },
  {
    "id": "find",
    "name": "find",
    "module": "Fp",
    "description": "Data-last find.",
    "signature": "find<T>(predicate: (item: T, index: number)",
    "example": "find(...)",
    "output": "..."
  },
  {
    "id": "some",
    "name": "some",
    "module": "Fp",
    "description": "Data-last some.",
    "signature": "some<T>(predicate: (item: T)",
    "example": "some(...)",
    "output": "..."
  },
  {
    "id": "every",
    "name": "every",
    "module": "Fp",
    "description": "Data-last every.",
    "signature": "every<T>(predicate: (item: T)",
    "example": "every(...)",
    "output": "..."
  },
  {
    "id": "take",
    "name": "take",
    "module": "Fp",
    "description": "Data-last take (takes the first n elements).",
    "signature": "take<T>(count: number): (arr: readonly T[])",
    "example": "take(...)",
    "output": "..."
  },
  {
    "id": "drop",
    "name": "drop",
    "module": "Fp",
    "description": "Data-last drop (drops the first n elements).",
    "signature": "drop<T>(count: number): (arr: readonly T[])",
    "example": "drop(...)",
    "output": "..."
  },
  {
    "id": "compact",
    "name": "compact",
    "module": "Fp",
    "description": "Data-last compact (filters out falsy values).",
    "signature": "compact<T>(): (arr: readonly (T | null | undefined | false | 0 | '')[])",
    "example": "compact(...)",
    "output": "..."
  },
  {
    "id": "sortby",
    "name": "sortBy",
    "module": "Fp",
    "description": "Data-last sortBy.",
    "signature": "sortBy<T>(keyFn: (item: T)",
    "example": "sortBy(...)",
    "output": "..."
  },
  {
    "id": "groupby",
    "name": "groupBy",
    "module": "Fp",
    "description": "Data-last groupBy.",
    "signature": "groupBy<T, K extends string | number>(keyFn: (item: T)",
    "example": "groupBy(...)",
    "output": "..."
  },
  {
    "id": "prop",
    "name": "prop",
    "module": "Fp",
    "description": "Data-last property accessor.",
    "signature": "prop<T, K extends keyof T>(key: K): (obj: T)",
    "example": "```ts\nprop('name')({ name: 'Bob', age: 30 });\n```",
    "output": "'Bob'"
  },
  {
    "id": "path",
    "name": "path",
    "module": "Fp",
    "description": "Data-last nested path accessor.",
    "signature": "path(keys: readonly (string | number)[]): (obj: any)",
    "example": "```ts\npath(['user', 'address', 'city'])({ user: { address: { city: 'Tokyo' } } });\n```",
    "output": "'Tokyo'"
  },
  {
    "id": "pick",
    "name": "pick",
    "module": "Fp",
    "description": "Data-last pick. Picks specified keys from an object.",
    "signature": "pick<T extends Record<string, any>, K extends keyof T>(keys: readonly K[]): (obj: T)",
    "example": "pick(...)",
    "output": "..."
  },
  {
    "id": "omit",
    "name": "omit",
    "module": "Fp",
    "description": "Data-last omit. Omits specified keys from an object.",
    "signature": "omit<T extends Record<string, any>, K extends keyof T>(keys: readonly K[]): (obj: T)",
    "example": "omit(...)",
    "output": "..."
  },
  {
    "id": "assoc",
    "name": "assoc",
    "module": "Fp",
    "description": "Data-last assoc. Associates a key/value pair into an object immutably.",
    "signature": "assoc<T extends Record<string, any>, K extends string, V>(key: K, value: V): (obj: T)",
    "example": "assoc(...)",
    "output": "..."
  },
  {
    "id": "dissoc",
    "name": "dissoc",
    "module": "Fp",
    "description": "Data-last dissoc. Removes a key from an object immutably.",
    "signature": "dissoc<T extends Record<string, any>, K extends keyof T>(key: K): (obj: T)",
    "example": "dissoc(...)",
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
    "signature": "flip<T extends (...args: any[])",
    "example": "flip(...)",
    "output": "..."
  },
  {
    "id": "tap",
    "name": "tap",
    "module": "Functional",
    "description": "Invokes an interceptor function with a value, and then returns the value.",
    "signature": "tap<T>(val: T, interceptor: (val: T)",
    "example": "tap(...)",
    "output": "..."
  },
  {
    "id": "memoize",
    "name": "memoize",
    "module": "Functional",
    "description": "Creates a function that memoizes the result of a given function.",
    "signature": "memoize<T extends (...args: any[])",
    "example": "memoize(...)",
    "output": "..."
  },
  {
    "id": "pipe",
    "name": "pipe",
    "module": "Functional",
    "description": "Performs left-to-right function composition.",
    "signature": "pipe(...fns: Array<(...args: any[])",
    "example": "pipe(...)",
    "output": "..."
  },
  {
    "id": "compose",
    "name": "compose",
    "module": "Functional",
    "description": "Performs right-to-left function composition.",
    "signature": "compose(...fns: Array<(...args: any[])",
    "example": "compose(...)",
    "output": "..."
  },
  {
    "id": "curry",
    "name": "curry",
    "module": "Functional",
    "description": "Creates a curried function.",
    "signature": "curry(fn: (...args: any[])",
    "example": "curry(...)",
    "output": "..."
  },
  {
    "id": "partial",
    "name": "partial",
    "module": "Functional",
    "description": "Creates a function that invokes fn with partials prepended to the arguments it receives.",
    "signature": "partial(fn: (...args: any[])",
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
    "signature": "constant<T>(val: T): ()",
    "example": "constant(...)",
    "output": "..."
  },
  {
    "id": "not",
    "name": "not",
    "module": "Functional",
    "description": "Creates a function that negates the result of a predicate.",
    "signature": "not<T extends (...args: any[])",
    "example": "not(...)",
    "output": "..."
  },
  {
    "id": "trampoline",
    "name": "trampoline",
    "module": "Functional",
    "description": "Trampoline for stack-safe recursion.",
    "signature": "trampoline<T>(fn: (...args: any[])",
    "example": "trampoline(...)",
    "output": "..."
  },
  {
    "id": "juxt",
    "name": "juxt",
    "module": "Functional",
    "description": "Applies multiple functions to the same arguments and returns an array of results.",
    "signature": "juxt<T extends any[]>( ...fns: Array<(...args: T)",
    "example": "juxt(...)",
    "output": "..."
  },
  {
    "id": "oncefn",
    "name": "onceFn",
    "module": "Functional",
    "description": "Creates a function that is restricted to being called only once.",
    "signature": "onceFn<T extends (...args: any[])",
    "example": "onceFn(...)",
    "output": "..."
  },
  {
    "id": "polygonarea",
    "name": "polygonArea",
    "module": "Geometry-extended",
    "description": "Calculates the area of a polygon.",
    "signature": "polygonArea(polygon: Polygon): number",
    "example": "polygonArea(...)",
    "output": "..."
  },
  {
    "id": "pointinpolygon",
    "name": "pointInPolygon",
    "module": "Geometry-extended",
    "description": "Checks if a point is inside a polygon using ray casting.",
    "signature": "pointInPolygon(point: Point, polygon: Polygon): boolean",
    "example": "pointInPolygon(...)",
    "output": "..."
  },
  {
    "id": "pointincircle",
    "name": "pointInCircle",
    "module": "Geometry-extended",
    "description": "Checks if a point is inside a circle.",
    "signature": "pointInCircle(point: Point, circle: Circle): boolean",
    "example": "pointInCircle(...)",
    "output": "..."
  },
  {
    "id": "pointinrect",
    "name": "pointInRect",
    "module": "Geometry-extended",
    "description": "Checks if a point is inside a rectangle.",
    "signature": "pointInRect(point: Point, rect: Rect): boolean",
    "example": "pointInRect(...)",
    "output": "..."
  },
  {
    "id": "rectintersect",
    "name": "rectIntersect",
    "module": "Geometry-extended",
    "description": "Checks if two rectangles intersect.",
    "signature": "rectIntersect(r1: Rect, r2: Rect): boolean",
    "example": "rectIntersect(...)",
    "output": "..."
  },
  {
    "id": "circleintersect",
    "name": "circleIntersect",
    "module": "Geometry-extended",
    "description": "Checks if two circles intersect.",
    "signature": "circleIntersect(c1: Circle, c2: Circle): boolean",
    "example": "circleIntersect(...)",
    "output": "..."
  },
  {
    "id": "polygonboundingbox",
    "name": "polygonBoundingBox",
    "module": "Geometry-extended",
    "description": "Gets the bounding box of a polygon.",
    "signature": "polygonBoundingBox(polygon: Polygon): Rect",
    "example": "polygonBoundingBox(...)",
    "output": "..."
  },
  {
    "id": "bezierquadratic",
    "name": "bezierQuadratic",
    "module": "Geometry-extended",
    "description": "Computes a point on a quadratic Bezier curve.",
    "signature": "bezierQuadratic(p0: Point, p1: Point, p2: Point, t: number): Point",
    "example": "bezierQuadratic(...)",
    "output": "..."
  },
  {
    "id": "beziercubic",
    "name": "bezierCubic",
    "module": "Geometry-extended",
    "description": "Computes a point on a cubic Bezier curve.",
    "signature": "bezierCubic(p0: Point, p1: Point, p2: Point, p3: Point, t: number): Point",
    "example": "bezierCubic(...)",
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
    "id": "dijkstrashortestpath",
    "name": "dijkstraShortestPath",
    "module": "Graph-pro",
    "description": "OptiKit Graph Pro — Weighted shortest paths (Dijkstra, Bellman-Ford, Floyd-Warshall, A*),",
    "signature": "dijkstraShortestPath( graph: WeightedAdjList, start: string )",
    "example": "dijkstraShortestPath(...)",
    "output": "..."
  },
  {
    "id": "bellmanford",
    "name": "bellmanFord",
    "module": "Graph-pro",
    "description": "Computes single-source shortest paths supporting negative weights via Bellman-Ford.",
    "signature": "bellmanFord( nodes: readonly string[], edges: readonly WeightedEdge[], start: string )",
    "example": "bellmanFord(...)",
    "output": "..."
  },
  {
    "id": "floydwarshall",
    "name": "floydWarshall",
    "module": "Graph-pro",
    "description": "Computes all-pairs shortest path distances using Floyd-Warshall.",
    "signature": "floydWarshall( nodes: readonly string[], edges: readonly WeightedEdge[] ): Record<string, Record<string, number>>",
    "example": "floydWarshall(...)",
    "output": "..."
  },
  {
    "id": "astarsearch",
    "name": "aStarSearch",
    "module": "Graph-pro",
    "description": "Finds a shortest path from `start` to `goal` using A* search with heuristic `h`.",
    "signature": "aStarSearch( graph: WeightedAdjList, start: string, goal: string, heuristic: (node: string)",
    "example": "aStarSearch(...)",
    "output": "..."
  },
  {
    "id": "kruskalmst",
    "name": "kruskalMst",
    "module": "Graph-pro",
    "description": "Computes a Minimum Spanning Tree using Kruskal's algorithm with Union-Find.",
    "signature": "kruskalMst( nodes: readonly string[], edges: readonly WeightedEdge[] )",
    "example": "kruskalMst(...)",
    "output": "..."
  },
  {
    "id": "primmst",
    "name": "primMst",
    "module": "Graph-pro",
    "description": "Computes a Minimum Spanning Tree using Prim's algorithm.",
    "signature": "primMst( graph: WeightedAdjList, start?: string )",
    "example": "primMst(...)",
    "output": "..."
  },
  {
    "id": "tarjanscc",
    "name": "tarjanScc",
    "module": "Graph-pro",
    "description": "Finds Strongly Connected Components (SCC) in a directed graph using Tarjan's algorithm.",
    "signature": "tarjanScc(graph: Record<string, string[]>): string[][]",
    "example": "tarjanScc(...)",
    "output": "..."
  },
  {
    "id": "kosarajuscc",
    "name": "kosarajuScc",
    "module": "Graph-pro",
    "description": "Finds Strongly Connected Components using Kosaraju's two-pass DFS algorithm.",
    "signature": "kosarajuScc(graph: Record<string, string[]>): string[][]",
    "example": "kosarajuScc(...)",
    "output": "..."
  },
  {
    "id": "topologicalsortkahn",
    "name": "topologicalSortKahn",
    "module": "Graph-pro",
    "description": "Performs Kahn's topological sort; returns `null` if the graph contains a cycle.",
    "signature": "topologicalSortKahn(graph: Record<string, string[]>): string[] | null",
    "example": "topologicalSortKahn(...)",
    "output": "..."
  },
  {
    "id": "detectcycledirected",
    "name": "detectCycleDirected",
    "module": "Graph-pro",
    "description": "Detects whether a directed graph contains a cycle.",
    "signature": "detectCycleDirected(graph: Record<string, string[]>): boolean",
    "example": "detectCycleDirected(...)",
    "output": "..."
  },
  {
    "id": "detectcycleundirected",
    "name": "detectCycleUndirected",
    "module": "Graph-pro",
    "description": "Detects whether an undirected graph contains a cycle.",
    "signature": "detectCycleUndirected(graph: Record<string, string[]>): boolean",
    "example": "detectCycleUndirected(...)",
    "output": "..."
  },
  {
    "id": "findbridges",
    "name": "findBridges",
    "module": "Graph-pro",
    "description": "Finds all bridge edges in an undirected graph using Tarjan's bridge algorithm.",
    "signature": "findBridges(graph: Record<string, string[]>): [string, string][]",
    "example": "findBridges(...)",
    "output": "..."
  },
  {
    "id": "findarticulationpoints",
    "name": "findArticulationPoints",
    "module": "Graph-pro",
    "description": "Finds all articulation points (cut vertices) in an undirected graph.",
    "signature": "findArticulationPoints(graph: Record<string, string[]>): string[]",
    "example": "findArticulationPoints(...)",
    "output": "..."
  },
  {
    "id": "bipartitecheck",
    "name": "bipartiteCheck",
    "module": "Graph-pro",
    "description": "Checks if an undirected graph is bipartite (2-colorable).",
    "signature": "bipartiteCheck(graph: Record<string, string[]>): boolean",
    "example": "bipartiteCheck(...)",
    "output": "..."
  },
  {
    "id": "graphcoloringgreedy",
    "name": "graphColoringGreedy",
    "module": "Graph-pro",
    "description": "Greedily colors vertices of an undirected graph and returns `{ node: colorIndex }`.",
    "signature": "graphColoringGreedy(graph: Record<string, string[]>): Record<string, number>",
    "example": "graphColoringGreedy(...)",
    "output": "..."
  },
  {
    "id": "maxflowedmondskarp",
    "name": "maxFlowEdmondsKarp",
    "module": "Graph-pro",
    "description": "Computes Maximum Flow from `source` to `sink` using the Edmonds-Karp algorithm.",
    "signature": "maxFlowEdmondsKarp( capacityGraph: WeightedAdjList, source: string, sink: string ): number",
    "example": "maxFlowEdmondsKarp(...)",
    "output": "..."
  },
  {
    "id": "pagerank",
    "name": "pageRank",
    "module": "Graph-pro",
    "description": "Computes PageRank scores for a directed graph.",
    "signature": "pageRank( graph: Record<string, string[]>, damping",
    "example": "pageRank(...)",
    "output": "..."
  },
  {
    "id": "betweennesscentrality",
    "name": "betweennessCentrality",
    "module": "Graph-pro",
    "description": "Computes unweighted Betweenness Centrality for all nodes (Brandes' algorithm).",
    "signature": "betweennessCentrality(graph: Record<string, string[]>): Record<string, number>",
    "example": "betweennessCentrality(...)",
    "output": "..."
  },
  {
    "id": "clusteringcoefficient",
    "name": "clusteringCoefficient",
    "module": "Graph-pro",
    "description": "Computes the local clustering coefficient of a node in an undirected graph.",
    "signature": "clusteringCoefficient(graph: Record<string, string[]>, node: string): number",
    "example": "clusteringCoefficient(...)",
    "output": "..."
  },
  {
    "id": "allsimplepaths",
    "name": "allSimplePaths",
    "module": "Graph-pro",
    "description": "Enumerates all simple paths between `start` and `end`.",
    "signature": "allSimplePaths( graph: Record<string, string[]>, start: string, end: string ): string[][]",
    "example": "allSimplePaths(...)",
    "output": "..."
  },
  {
    "id": "connectedcomponents",
    "name": "connectedComponents",
    "module": "Graph-pro",
    "description": "Finds connected components in an undirected graph.",
    "signature": "connectedComponents(graph: Record<string, string[]>): string[][]",
    "example": "connectedComponents(...)",
    "output": "..."
  },
  {
    "id": "graphdiameter",
    "name": "graphDiameter",
    "module": "Graph-pro",
    "description": "Computes the unweighted diameter (longest shortest path) of a connected graph.",
    "signature": "graphDiameter(graph: Record<string, string[]>): number",
    "example": "graphDiameter(...)",
    "output": "..."
  },
  {
    "id": "bfs",
    "name": "bfs",
    "module": "Graph",
    "description": "Performs Breadth-First Search (BFS) on a graph.",
    "signature": "bfs(graph: AdjacencyList, start: string): string[]",
    "example": "bfs(...)",
    "output": "..."
  },
  {
    "id": "dfs",
    "name": "dfs",
    "module": "Graph",
    "description": "Performs Depth-First Search (DFS) on a graph.",
    "signature": "dfs(graph: AdjacencyList, start: string): string[]",
    "example": "dfs(...)",
    "output": "..."
  },
  {
    "id": "shortestpathbfs",
    "name": "shortestPathBFS",
    "module": "Graph",
    "description": "Finds the shortest path between two nodes using BFS (unweighted).",
    "signature": "shortestPathBFS(graph: AdjacencyList, start: string, target: string): string[] | null",
    "example": "shortestPathBFS(...)",
    "output": "..."
  },
  {
    "id": "topologicalsort",
    "name": "topologicalSort",
    "module": "Graph",
    "description": "Performs a topological sort of a Directed Acyclic Graph (DAG).",
    "signature": "topologicalSort(graph: AdjacencyList): string[]",
    "example": "topologicalSort(...)",
    "output": "..."
  },
  {
    "id": "addedge",
    "name": "addEdge",
    "module": "Graph",
    "description": "Adds an edge to an adjacency list.",
    "signature": "addEdge(graph: AdjacencyList, u: string, v: string, directed",
    "example": "addEdge(...)",
    "output": "..."
  },
  {
    "id": "hascycle",
    "name": "hasCycle",
    "module": "Graph",
    "description": "Detects if a directed graph contains a cycle.",
    "signature": "hasCycle(graph: AdjacencyList): boolean",
    "example": "hasCycle(...)",
    "output": "..."
  },
  {
    "id": "safejsonparse",
    "name": "safeJsonParse",
    "module": "Guard",
    "description": "Safely parses a JSON string. Returns the parsed value or the fallback on failure.",
    "signature": "safeJsonParse<T",
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
    "signature": "safeParseInt(val: string, fallback: number",
    "example": "safeParseInt(...)",
    "output": "..."
  },
  {
    "id": "safeparsefloat",
    "name": "safeParseFloat",
    "module": "Guard",
    "description": "Safely parses a float. Returns the fallback (default 0) if parsing fails or produces NaN.",
    "signature": "safeParseFloat(val: string, fallback: number",
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
    "signature": "attempt<T>(fn: ()",
    "example": "attempt(...)",
    "output": "..."
  },
  {
    "id": "attemptasync",
    "name": "attemptAsync",
    "module": "Guard",
    "description": "Wraps an asynchronous function call in a try/catch. Returns the fallback on failure.",
    "signature": "attemptAsync<T>(fn: ()",
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
    "id": "crc32",
    "name": "crc32",
    "module": "Hash",
    "description": "Hashing and Encoding Utilities",
    "signature": "crc32(str: string): number",
    "example": "crc32(...)",
    "output": "..."
  },
  {
    "id": "encodehtmlentities",
    "name": "encodeHtmlEntities",
    "module": "Html-entities",
    "description": "Encodes special characters in a string to HTML entities.",
    "signature": "encodeHtmlEntities(str: string): string",
    "example": "encodeHtmlEntities(...)",
    "output": "..."
  },
  {
    "id": "decodehtmlentities",
    "name": "decodeHtmlEntities",
    "module": "Html-entities",
    "description": "Decodes HTML entities in a string back to characters.",
    "signature": "decodeHtmlEntities(str: string): string",
    "example": "decodeHtmlEntities(...)",
    "output": "..."
  },
  {
    "id": "striphtmltags",
    "name": "stripHtmlTags",
    "module": "Html-entities",
    "description": "Strips HTML tags from a string.",
    "signature": "stripHtmlTags(str: string): string",
    "example": "stripHtmlTags(...)",
    "output": "..."
  },
  {
    "id": "hashtmltags",
    "name": "hasHtmlTags",
    "module": "Html-entities",
    "description": "Checks if a string contains any HTML tags.",
    "signature": "hasHtmlTags(str: string): boolean",
    "example": "hasHtmlTags(...)",
    "output": "..."
  },
  {
    "id": "truncatehtml",
    "name": "truncateHtml",
    "module": "Html-entities",
    "description": "Truncates a string by character count while attempting to preserve whole HTML tags.",
    "signature": "truncateHtml(str: string, maxLength: number, suffix",
    "example": "truncateHtml(...)",
    "output": "..."
  },
  {
    "id": "buildquerystring",
    "name": "buildQueryString",
    "module": "Http",
    "description": "Builds a query string from an object.",
    "signature": "buildQueryString(params: Record<string, any>): string",
    "example": "buildQueryString(...)",
    "output": "..."
  },
  {
    "id": "parsequerystring",
    "name": "parseQueryString",
    "module": "Http",
    "description": "Parses a query string into an object.",
    "signature": "parseQueryString(queryString: string): Record<string, string>",
    "example": "parseQueryString(...)",
    "output": "..."
  },
  {
    "id": "issuccessstatus",
    "name": "isSuccessStatus",
    "module": "Http",
    "description": "Checks if a HTTP status code represents a success (200-299).",
    "signature": "isSuccessStatus(statusCode: number): boolean",
    "example": "isSuccessStatus(...)",
    "output": "..."
  },
  {
    "id": "iserrorstatus",
    "name": "isErrorStatus",
    "module": "Http",
    "description": "Checks if a HTTP status code represents a client or server error (400-599).",
    "signature": "isErrorStatus(statusCode: number): boolean",
    "example": "isErrorStatus(...)",
    "output": "..."
  },
  {
    "id": "fetchwithtimeout",
    "name": "fetchWithTimeout",
    "module": "Http",
    "description": "Wrapper around fetch that adds timeout and query params support.",
    "signature": "fetchWithTimeout(url: string, options: FetchOptions",
    "example": "fetchWithTimeout(...)",
    "output": "..."
  },
  {
    "id": "get",
    "name": "get",
    "module": "Http",
    "description": "Perform a GET request.",
    "signature": "get(url: string, options?: FetchOptions): Promise<Response>",
    "example": "get(...)",
    "output": "..."
  },
  {
    "id": "post",
    "name": "post",
    "module": "Http",
    "description": "Perform a POST request.",
    "signature": "post(url: string, body: any, options?: FetchOptions): Promise<Response>",
    "example": "post(...)",
    "output": "..."
  },
  {
    "id": "put",
    "name": "put",
    "module": "Http",
    "description": "Perform a PUT request.",
    "signature": "put(url: string, body: any, options?: FetchOptions): Promise<Response>",
    "example": "put(...)",
    "output": "..."
  },
  {
    "id": "patch",
    "name": "patch",
    "module": "Http",
    "description": "Perform a PATCH request.",
    "signature": "patch(url: string, body: any, options?: FetchOptions): Promise<Response>",
    "example": "patch(...)",
    "output": "..."
  },
  {
    "id": "del",
    "name": "del",
    "module": "Http",
    "description": "Perform a DELETE request.",
    "signature": "del(url: string, options?: FetchOptions): Promise<Response>",
    "example": "del(...)",
    "output": "..."
  },
  {
    "id": "applybrightness",
    "name": "applyBrightness",
    "module": "Image",
    "description": "Image Processing Primitives (for pixel arrays [r,g,b,a,...])",
    "signature": "applyBrightness(pixels: number[], amount: number): number[]",
    "example": "applyBrightness(...)",
    "output": "..."
  },
  {
    "id": "createinterval",
    "name": "createInterval",
    "module": "Interval",
    "description": "OptiKit Interval — Numeric interval algebra, sweep-line algorithms,",
    "signature": "createInterval(start: number, end: number): Interval",
    "example": "createInterval(...)",
    "output": "..."
  },
  {
    "id": "intervalcontains",
    "name": "intervalContains",
    "module": "Interval",
    "description": "Checks whether a point or sub-interval is contained within `interval`.",
    "signature": "intervalContains(interval: Interval, value: number | Interval): boolean",
    "example": "intervalContains(...)",
    "output": "..."
  },
  {
    "id": "intervaloverlaps",
    "name": "intervalOverlaps",
    "module": "Interval",
    "description": "Checks whether two intervals overlap (share at least one point).",
    "signature": "intervalOverlaps(a: Interval, b: Interval): boolean",
    "example": "intervalOverlaps(...)",
    "output": "..."
  },
  {
    "id": "intervaladjacent",
    "name": "intervalAdjacent",
    "module": "Interval",
    "description": "Checks whether two intervals touch at their boundaries without overlapping interior.",
    "signature": "intervalAdjacent(a: Interval, b: Interval): boolean",
    "example": "intervalAdjacent(...)",
    "output": "..."
  },
  {
    "id": "intervalmerge",
    "name": "intervalMerge",
    "module": "Interval",
    "description": "Merges two overlapping or adjacent intervals, or returns `null` if disjoint.",
    "signature": "intervalMerge(a: Interval, b: Interval): Interval | null",
    "example": "intervalMerge(...)",
    "output": "..."
  },
  {
    "id": "mergeallintervals",
    "name": "mergeAllIntervals",
    "module": "Interval",
    "description": "Merges a list of intervals into minimal sorted disjoint intervals.",
    "signature": "mergeAllIntervals(intervals: readonly Interval[]): Interval[]",
    "example": "mergeAllIntervals(...)",
    "output": "..."
  },
  {
    "id": "intervalintersect",
    "name": "intervalIntersect",
    "module": "Interval",
    "description": "Returns the intersection of two intervals, or `null` if disjoint.",
    "signature": "intervalIntersect(a: Interval, b: Interval): Interval | null",
    "example": "intervalIntersect(...)",
    "output": "..."
  },
  {
    "id": "intervaldifference",
    "name": "intervalDifference",
    "module": "Interval",
    "description": "Subtracts interval `b` from `a`, returning 0, 1, or 2 remaining intervals.",
    "signature": "intervalDifference(a: Interval, b: Interval): Interval[]",
    "example": "intervalDifference(...)",
    "output": "..."
  },
  {
    "id": "intervalcomplement",
    "name": "intervalComplement",
    "module": "Interval",
    "description": "Computes the complement of `intervals` within `bounds`.",
    "signature": "intervalComplement( intervals: readonly Interval[], bounds: Interval ): Interval[]",
    "example": "intervalComplement(...)",
    "output": "..."
  },
  {
    "id": "intervalunion",
    "name": "intervalUnion",
    "module": "Interval",
    "description": "Returns the union of two intervals as 1 merged or 2 sorted intervals.",
    "signature": "intervalUnion(a: Interval, b: Interval): Interval[]",
    "example": "intervalUnion(...)",
    "output": "..."
  },
  {
    "id": "intervallength",
    "name": "intervalLength",
    "module": "Interval",
    "description": "Returns the length (`end - start`) of an interval.",
    "signature": "intervalLength(interval: Interval): number",
    "example": "intervalLength(...)",
    "output": "..."
  },
  {
    "id": "intervalmidpoint",
    "name": "intervalMidpoint",
    "module": "Interval",
    "description": "Returns the midpoint of an interval.",
    "signature": "intervalMidpoint(interval: Interval): number",
    "example": "intervalMidpoint(...)",
    "output": "..."
  },
  {
    "id": "intervalclamp",
    "name": "intervalClamp",
    "module": "Interval",
    "description": "Clamps a numeric value to the bounds of an interval.",
    "signature": "intervalClamp(interval: Interval, value: number): number",
    "example": "intervalClamp(...)",
    "output": "..."
  },
  {
    "id": "intervalsplit",
    "name": "intervalSplit",
    "module": "Interval",
    "description": "Splits an interval into `parts` equal sub-intervals.",
    "signature": "intervalSplit(interval: Interval, parts: number): Interval[]",
    "example": "intervalSplit(...)",
    "output": "..."
  },
  {
    "id": "intervalshift",
    "name": "intervalShift",
    "module": "Interval",
    "description": "Shifts an interval by `delta`.",
    "signature": "intervalShift(interval: Interval, delta: number): Interval",
    "example": "intervalShift(...)",
    "output": "..."
  },
  {
    "id": "intervalscale",
    "name": "intervalScale",
    "module": "Interval",
    "description": "Scales an interval around its midpoint by `factor`.",
    "signature": "intervalScale(interval: Interval, factor: number): Interval",
    "example": "intervalScale(...)",
    "output": "..."
  },
  {
    "id": "intervalequals",
    "name": "intervalEquals",
    "module": "Interval",
    "description": "Checks exact equality of two intervals.",
    "signature": "intervalEquals(a: Interval, b: Interval): boolean",
    "example": "intervalEquals(...)",
    "output": "..."
  },
  {
    "id": "intervalissubset",
    "name": "intervalIsSubset",
    "module": "Interval",
    "description": "Checks if `inner` is a subset of `outer`.",
    "signature": "intervalIsSubset(inner: Interval, outer: Interval): boolean",
    "example": "intervalIsSubset(...)",
    "output": "..."
  },
  {
    "id": "findgaps",
    "name": "findGaps",
    "module": "Interval",
    "description": "Finds all uncovered gaps between a list of intervals.",
    "signature": "findGaps(intervals: readonly Interval[]): Interval[]",
    "example": "findGaps(...)",
    "output": "..."
  },
  {
    "id": "sweeplineevents",
    "name": "sweepLineEvents",
    "module": "Interval",
    "description": "Converts intervals into sorted sweep-line events (`+1` start, `-1` end).",
    "signature": "sweepLineEvents( intervals: readonly Interval[] )",
    "example": "sweepLineEvents(...)",
    "output": "..."
  },
  {
    "id": "maxconcurrentintervals",
    "name": "maxConcurrentIntervals",
    "module": "Interval",
    "description": "Computes the maximum number of concurrently overlapping intervals.",
    "signature": "maxConcurrentIntervals(intervals: readonly Interval[]): number",
    "example": "maxConcurrentIntervals(...)",
    "output": "..."
  },
  {
    "id": "partitiontimeline",
    "name": "partitionTimeline",
    "module": "Interval",
    "description": "Partitions a timeline into elementary segments with the count of active intervals in each.",
    "signature": "partitionTimeline( intervals: readonly Interval[] )",
    "example": "partitionTimeline(...)",
    "output": "..."
  },
  {
    "id": "snaptogrid",
    "name": "snapToGrid",
    "module": "Interval",
    "description": "Snaps a number to the nearest grid step.",
    "signature": "snapToGrid(value: number, step: number): number",
    "example": "snapToGrid(...)",
    "output": "..."
  },
  {
    "id": "chunkrange",
    "name": "chunkRange",
    "module": "Interval",
    "description": "Creates a lazy generator iterating from `start` to `end` by `step`. */",
    "signature": "chunkRange(start: number, end: number, chunkSize: number): Interval[]",
    "example": "chunkRange(...)",
    "output": "..."
  },
  {
    "id": "formatcurrency",
    "name": "formatCurrency",
    "module": "Intl",
    "description": "Formats a number as a currency string.",
    "signature": "formatCurrency( value: number, currency",
    "example": "formatCurrency(...)",
    "output": "..."
  },
  {
    "id": "formatnumber",
    "name": "formatNumber",
    "module": "Intl",
    "description": "Formats a number with locale-specific separators.",
    "signature": "formatNumber( value: number, locale",
    "example": "formatNumber(...)",
    "output": "..."
  },
  {
    "id": "formatdatetime",
    "name": "formatDateTime",
    "module": "Intl",
    "description": "Formats a date using Intl.DateTimeFormat.",
    "signature": "formatDateTime( date: Date | number, locale",
    "example": "formatDateTime(...)",
    "output": "..."
  },
  {
    "id": "formatpercentage",
    "name": "formatPercentage",
    "module": "Intl",
    "description": "Formats a number as a percentage.",
    "signature": "formatPercentage( value: number, locale",
    "example": "formatPercentage(...)",
    "output": "..."
  },
  {
    "id": "formatcompactnumber",
    "name": "formatCompactNumber",
    "module": "Intl",
    "description": "Formats a number as a compact unit (e.g., 1.2K, 3M).",
    "signature": "formatCompactNumber( value: number, locale",
    "example": "formatCompactNumber(...)",
    "output": "..."
  },
  {
    "id": "getpluralrule",
    "name": "getPluralRule",
    "module": "Intl",
    "description": "Returns the plural rules for a specific number.",
    "signature": "getPluralRule( value: number, locale",
    "example": "getPluralRule(...)",
    "output": "..."
  },
  {
    "id": "formatlist",
    "name": "formatList",
    "module": "Intl",
    "description": "Formats a list of strings with conjunctions (e.g., \"A, B, and C\").",
    "signature": "formatList( list: string[], locale",
    "example": "formatList(...)",
    "output": "..."
  },
  {
    "id": "formatrelativetime",
    "name": "formatRelativeTime",
    "module": "Intl",
    "description": "Formats a relative time (e.g., \"3 days ago\").",
    "signature": "formatRelativeTime( value: number, unit: Intl.RelativeTimeFormatUnit, locale",
    "example": "formatRelativeTime(...)",
    "output": "..."
  },
  {
    "id": "reduce",
    "name": "reduce",
    "module": "Iter",
    "description": "Generator that yields values from start to end (exclusive) with a given step.",
    "signature": "reduce<T, U>(iterable: Iterable<T>, reducer: (acc: U, item: T, index: number)",
    "example": "reduce(...)",
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
    "signature": "jsonFlatten(obj: any, prefix",
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
    "signature": "registerShortcut( shortcut: string, callback: (e: KeyboardEvent)",
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
    "id": "lens",
    "name": "lens",
    "module": "Lens",
    "description": "OptiKit Lens — Immutable functional optics (Lenses, Prisms, Isomorphisms, Traversals)",
    "signature": "lens<S, A>( get: (source: S)",
    "example": "lens(...)",
    "output": "..."
  },
  {
    "id": "lensprop",
    "name": "lensProp",
    "module": "Lens",
    "description": "Creates a Lens focusing on a specific property of an object.",
    "signature": "lensProp<S extends Record<string, unknown>, K extends keyof S>( prop: K ): Lens<S, S[K]>",
    "example": "lensProp(...)",
    "output": "..."
  },
  {
    "id": "lenspath",
    "name": "lensPath",
    "module": "Lens",
    "description": "Creates a Lens focusing on a nested path in an object/array structure.",
    "signature": "lensPath<S, A",
    "example": "lensPath(...)",
    "output": "..."
  },
  {
    "id": "lensindex",
    "name": "lensIndex",
    "module": "Lens",
    "description": "Creates a Lens focusing on an array element at index `index`.",
    "signature": "lensIndex<T>(index: number): Lens<readonly T[], T | undefined>",
    "example": "lensIndex(...)",
    "output": "..."
  },
  {
    "id": "viewlens",
    "name": "viewLens",
    "module": "Lens",
    "description": "Reads the focused value through a Lens.",
    "signature": "viewLens<S, A>(l: Lens<S, A>, source: S): A",
    "example": "viewLens(...)",
    "output": "..."
  },
  {
    "id": "setlens",
    "name": "setLens",
    "module": "Lens",
    "description": "Immutably sets the focused value through a Lens.",
    "signature": "setLens<S, A>(l: Lens<S, A>, value: A, source: S): S",
    "example": "setLens(...)",
    "output": "..."
  },
  {
    "id": "overlens",
    "name": "overLens",
    "module": "Lens",
    "description": "Immutably transforms the focused value through a Lens.",
    "signature": "overLens<S, A>(l: Lens<S, A>, fn: (value: A)",
    "example": "overLens(...)",
    "output": "..."
  },
  {
    "id": "composelens",
    "name": "composeLens",
    "module": "Lens",
    "description": "Composes two Lenses left-to-right (`Lens<S, A>` + `Lens<A, B>` -> `Lens<S, B>`).",
    "signature": "composeLens<S, A, B>(outer: Lens<S, A>, inner: Lens<A, B>): Lens<S, B>",
    "example": "composeLens(...)",
    "output": "..."
  },
  {
    "id": "prism",
    "name": "prism",
    "module": "Lens",
    "description": "Creates a Prism for sum types / optional branches.",
    "signature": "prism<S, A>( preview: (source: S)",
    "example": "prism(...)",
    "output": "..."
  },
  {
    "id": "previewprism",
    "name": "previewPrism",
    "module": "Lens",
    "description": "Attempts to extract a value using a Prism.",
    "signature": "previewPrism<S, A>(p: Prism<S, A>, source: S): A | undefined",
    "example": "previewPrism(...)",
    "output": "..."
  },
  {
    "id": "reviewprism",
    "name": "reviewPrism",
    "module": "Lens",
    "description": "Constructs a sum-type value from a Prism's focused type.",
    "signature": "reviewPrism<S, A>(p: Prism<S, A>, value: A): S",
    "example": "reviewPrism(...)",
    "output": "..."
  },
  {
    "id": "iso",
    "name": "iso",
    "module": "Lens",
    "description": "Creates a lossless bidirectional Isomorphism between `S` and `A`.",
    "signature": "iso<S, A>(to: (source: S)",
    "example": "iso(...)",
    "output": "..."
  },
  {
    "id": "toiso",
    "name": "toIso",
    "module": "Lens",
    "description": "Converts `S` to `A` via an Iso.",
    "signature": "toIso<S, A>(i: Iso<S, A>, source: S): A",
    "example": "toIso(...)",
    "output": "..."
  },
  {
    "id": "fromiso",
    "name": "fromIso",
    "module": "Lens",
    "description": "Converts `A` back to `S` via an Iso.",
    "signature": "fromIso<S, A>(i: Iso<S, A>, value: A): S",
    "example": "fromIso(...)",
    "output": "..."
  },
  {
    "id": "traversal",
    "name": "traversal",
    "module": "Lens",
    "description": "Creates a Traversal over all elements of an array.",
    "signature": "traversal<T>(): Traversal<readonly T[], T>",
    "example": "traversal(...)",
    "output": "..."
  },
  {
    "id": "overtraversal",
    "name": "overTraversal",
    "module": "Lens",
    "description": "Applies a transformation to all targets of a Traversal.",
    "signature": "overTraversal<S, A>( t: Traversal<S, A>, fn: (value: A)",
    "example": "overTraversal(...)",
    "output": "..."
  },
  {
    "id": "tolistof",
    "name": "toListOf",
    "module": "Lens",
    "description": "Collects all targets of a Traversal into an array.",
    "signature": "toListOf<S, A>(t: Traversal<S, A>, source: S): A[]",
    "example": "toListOf(...)",
    "output": "..."
  },
  {
    "id": "filteredlens",
    "name": "filteredLens",
    "module": "Lens",
    "description": "Creates a Traversal over array items matching a predicate.",
    "signature": "filteredLens<T>(predicate: (item: T)",
    "example": "filteredLens(...)",
    "output": "..."
  },
  {
    "id": "optionallens",
    "name": "optionalLens",
    "module": "Lens",
    "description": "Wraps a Lens to safely handle `undefined` source objects on read.",
    "signature": "optionalLens<S, A>(l: Lens<S, A>): Lens<S | undefined, A | undefined>",
    "example": "optionalLens(...)",
    "output": "..."
  },
  {
    "id": "defaultlens",
    "name": "defaultLens",
    "module": "Lens",
    "description": "Wraps a Lens with a fallback default value when the focused value is `undefined` or `null`.",
    "signature": "defaultLens<S, A>(l: Lens<S, A | undefined | null>, defaultValue: A): Lens<S, A>",
    "example": "defaultLens(...)",
    "output": "..."
  },
  {
    "id": "mappedlens",
    "name": "mappedLens",
    "module": "Lens",
    "description": "Maps a Lens over every element of an array.",
    "signature": "mappedLens<S, A>(l: Lens<S, A>): Traversal<readonly S[], A>",
    "example": "mappedLens(...)",
    "output": "..."
  },
  {
    "id": "ziplens",
    "name": "zipLens",
    "module": "Lens",
    "description": "Combines two Lenses on the same source into a tuple Lens.",
    "signature": "zipLens<S, A, B>(a: Lens<S, A>, b: Lens<S, B>): Lens<S, [A, B]>",
    "example": "zipLens(...)",
    "output": "..."
  },
  {
    "id": "focuspath",
    "name": "focusPath",
    "module": "Lens",
    "description": "Convenience helper to read a dot-separated path from an object.",
    "signature": "focusPath<T",
    "example": "focusPath(...)",
    "output": "..."
  },
  {
    "id": "updateatpath",
    "name": "updateAtPath",
    "module": "Lens",
    "description": "Convenience helper to immutably update a dot-separated path in an object.",
    "signature": "updateAtPath<S, A",
    "example": "updateAtPath(...)",
    "output": "..."
  },
  {
    "id": "createlogger",
    "name": "createLogger",
    "module": "Log",
    "description": "Creates a customizable console logger with level-based filtering and optional color styling.",
    "signature": "createLogger(options: LoggerOptions",
    "example": "createLogger(...)",
    "output": "..."
  },
  {
    "id": "mapmapvalues",
    "name": "mapMapValues",
    "module": "Map",
    "description": "Maps over the values of a Map to produce a new Map with the same keys.",
    "signature": "mapMapValues<K, V, R>(map: Map<K, V>, mapper: (value: V, key: K)",
    "example": "mapMapValues(...)",
    "output": "..."
  },
  {
    "id": "mapmapkeys",
    "name": "mapMapKeys",
    "module": "Map",
    "description": "Maps over the keys of a Map to produce a new Map with the same values.",
    "signature": "mapMapKeys<K, V, R>(map: Map<K, V>, mapper: (key: K, value: V)",
    "example": "mapMapKeys(...)",
    "output": "..."
  },
  {
    "id": "filtermapentries",
    "name": "filterMapEntries",
    "module": "Map",
    "description": "Filters a Map to produce a new Map containing only entries that satisfy the predicate.",
    "signature": "filterMapEntries<K, V>(map: Map<K, V>, predicate: (value: V, key: K)",
    "example": "filterMapEntries(...)",
    "output": "..."
  },
  {
    "id": "mergemultiplemaps",
    "name": "mergeMultipleMaps",
    "module": "Map",
    "description": "Merges multiple Maps into a single new Map. Later maps overwrite earlier ones for duplicate keys.",
    "signature": "mergeMultipleMaps<K, V>(...maps: Map<K, V>[]): Map<K, V>",
    "example": "mergeMultipleMaps(...)",
    "output": "..."
  },
  {
    "id": "invertmapentries",
    "name": "invertMapEntries",
    "module": "Map",
    "description": "Inverts a Map by swapping its keys and values.",
    "signature": "invertMapEntries<K, V>(map: Map<K, V>): Map<V, K>",
    "example": "invertMapEntries(...)",
    "output": "..."
  },
  {
    "id": "groupbytomap",
    "name": "groupByToMap",
    "module": "Map",
    "description": "Groups elements of an iterable into a Map based on a grouping function.",
    "signature": "groupByToMap<T, K>(iterable: Iterable<T>, iteratee: (item: T)",
    "example": "groupByToMap(...)",
    "output": "..."
  },
  {
    "id": "findinmap",
    "name": "findInMap",
    "module": "Map",
    "description": "Finds the first entry in a Map that satisfies the predicate.",
    "signature": "findInMap<K, V>(map: Map<K, V>, predicate: (value: V, key: K)",
    "example": "findInMap(...)",
    "output": "..."
  },
  {
    "id": "everyinmap",
    "name": "everyInMap",
    "module": "Map",
    "description": "Checks if every entry in a Map satisfies the predicate.",
    "signature": "everyInMap<K, V>(map: Map<K, V>, predicate: (value: V, key: K)",
    "example": "everyInMap(...)",
    "output": "..."
  },
  {
    "id": "someinmap",
    "name": "someInMap",
    "module": "Map",
    "description": "Checks if some entry in a Map satisfies the predicate.",
    "signature": "someInMap<K, V>(map: Map<K, V>, predicate: (value: V, key: K)",
    "example": "someInMap(...)",
    "output": "..."
  },
  {
    "id": "objecttomap",
    "name": "objectToMap",
    "module": "Map",
    "description": "Converts an object to a Map.",
    "signature": "objectToMap<V>(obj: Record<string, V>): Map<string, V>",
    "example": "objectToMap(...)",
    "output": "..."
  },
  {
    "id": "maptoobject",
    "name": "mapToObject",
    "module": "Map",
    "description": "Converts a Map to an object.",
    "signature": "mapToObject<V>(map: Map<string, V>): Record<string, V>",
    "example": "mapToObject(...)",
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
    "signature": "random(min: number, max: number, float",
    "example": "random(...)",
    "output": "..."
  },
  {
    "id": "round",
    "name": "round",
    "module": "Math",
    "description": "Rounds a number to a specified decimal precision.",
    "signature": "round(val: number, precision",
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
    "signature": "standardDeviation(nums: number[], population",
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
    "signature": "inRange( val: number, min: number, max: number, exclusive",
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
    "signature": "ceil(val: number, precision",
    "example": "ceil(...)",
    "output": "..."
  },
  {
    "id": "floor",
    "name": "floor",
    "module": "Math",
    "description": "Computes number rounded down to precision.",
    "signature": "floor(val: number, precision",
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
    "id": "mat3identity",
    "name": "mat3Identity",
    "module": "Matrix",
    "description": "Creates an identity 3x3 matrix.",
    "signature": "mat3Identity(): Mat3",
    "example": "mat3Identity(...)",
    "output": "..."
  },
  {
    "id": "mat4identity",
    "name": "mat4Identity",
    "module": "Matrix",
    "description": "Creates an identity 4x4 matrix.",
    "signature": "mat4Identity(): Mat4",
    "example": "mat4Identity(...)",
    "output": "..."
  },
  {
    "id": "mat3mul",
    "name": "mat3Mul",
    "module": "Matrix",
    "description": "Multiplies two 3x3 matrices.",
    "signature": "mat3Mul(a: Mat3, b: Mat3): Mat3",
    "example": "mat3Mul(...)",
    "output": "..."
  },
  {
    "id": "mat4mul",
    "name": "mat4Mul",
    "module": "Matrix",
    "description": "Multiplies two 4x4 matrices.",
    "signature": "mat4Mul(a: Mat4, b: Mat4): Mat4",
    "example": "mat4Mul(...)",
    "output": "..."
  },
  {
    "id": "mat3transpose",
    "name": "mat3Transpose",
    "module": "Matrix",
    "description": "Transposes a 3x3 matrix.",
    "signature": "mat3Transpose(a: Mat3): Mat3",
    "example": "mat3Transpose(...)",
    "output": "..."
  },
  {
    "id": "mat4transpose",
    "name": "mat4Transpose",
    "module": "Matrix",
    "description": "Transposes a 4x4 matrix.",
    "signature": "mat4Transpose(a: Mat4): Mat4",
    "example": "mat4Transpose(...)",
    "output": "..."
  },
  {
    "id": "memoizesimple",
    "name": "memoizeSimple",
    "module": "Memoize",
    "description": "Memoizes a function that takes a single string or number argument.",
    "signature": "memoizeSimple<T, R>(fn: (arg: T)",
    "example": "memoizeSimple(...)",
    "output": "..."
  },
  {
    "id": "memoizewithresolver",
    "name": "memoizeWithResolver",
    "module": "Memoize",
    "description": "Memoizes a function taking any arguments using a custom resolver to generate the cache key.",
    "signature": "memoizeWithResolver<R>( fn: (...args: any[])",
    "example": "memoizeWithResolver(...)",
    "output": "..."
  },
  {
    "id": "memoizeasync",
    "name": "memoizeAsync",
    "module": "Memoize",
    "description": "Memoizes an asynchronous function.",
    "signature": "memoizeAsync<R>( fn: (...args: any[])",
    "example": "memoizeAsync(...)",
    "output": "..."
  },
  {
    "id": "memoizettl",
    "name": "memoizeTTL",
    "module": "Memoize",
    "description": "Creates a memoized function that clears its cache after a TTL (time to live).",
    "signature": "memoizeTTL<R>( fn: (...args: any[])",
    "example": "memoizeTTL(...)",
    "output": "..."
  },
  {
    "id": "memoizemax",
    "name": "memoizeMax",
    "module": "Memoize",
    "description": "Memoizes a function with a maximum cache size (LRU-like cache clearing).",
    "signature": "memoizeMax<R>( fn: (...args: any[])",
    "example": "memoizeMax(...)",
    "output": "..."
  },
  {
    "id": "withclearcache",
    "name": "withClearCache",
    "module": "Memoize",
    "description": "Extends a memoized function with a method to clear the cache manually.",
    "signature": "withClearCache<T extends (...args: any[])",
    "example": "withClearCache(...)",
    "output": "..."
  },
  {
    "id": "sigmoid",
    "name": "sigmoid",
    "module": "Ml",
    "description": "Machine Learning and Statistics Utilities",
    "signature": "sigmoid(t: number): number",
    "example": "sigmoid(...)",
    "output": "..."
  },
  {
    "id": "tokenizewords",
    "name": "tokenizeWords",
    "module": "Nlp",
    "description": "Natural Language Processing Utilities",
    "signature": "tokenizeWords(text: string): string[]",
    "example": "tokenizeWords(...)",
    "output": "..."
  },
  {
    "id": "formatcurrency",
    "name": "formatCurrency",
    "module": "Number",
    "description": "Formats a number as a currency string.",
    "signature": "formatCurrency( val: number, currency",
    "example": "formatCurrency(...)",
    "output": "..."
  },
  {
    "id": "formatbytes",
    "name": "formatBytes",
    "module": "Number",
    "description": "Formats bytes into a human-readable size string (e.g., \"10.5 KB\", \"2.4 MB\").",
    "signature": "formatBytes(bytes: number, decimals",
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
    "signature": "parseNumber(val: any, fallback",
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
    "signature": "toPercentage(val: number, decimals",
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
    "signature": "formatFileSize(bytes: number, decimals",
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
    "description": "Safely sets a nested value in an object using a dot-path string or array of keys.",
    "signature": "set(obj: any, path: string | (string | number)[], value: any): any",
    "example": "set(...)",
    "output": "..."
  },
  {
    "id": "unset",
    "name": "unset",
    "module": "Object",
    "description": "Removes the property at path of object.",
    "signature": "unset(obj: any, path: string | (string | number)[]): boolean",
    "example": "unset(...)",
    "output": "..."
  },
  {
    "id": "mapkeys",
    "name": "mapKeys",
    "module": "Object",
    "description": "Creates a new object by mapping keys through a transform function.",
    "signature": "mapKeys<T>( obj: Record<string, T>, iteratee: (key: string, val: T)",
    "example": "mapKeys(...)",
    "output": "..."
  },
  {
    "id": "mapvalues",
    "name": "mapValues",
    "module": "Object",
    "description": "Creates a new object by mapping values through a transform function.",
    "signature": "mapValues<T, U>( obj: Record<string, T>, iteratee: (val: T, key: string)",
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
    "signature": "pickBy<T extends object>( obj: T, predicate: (value: T[keyof T], key: keyof T)",
    "example": "pickBy(...)",
    "output": "..."
  },
  {
    "id": "omitby",
    "name": "omitBy",
    "module": "Object",
    "description": "Creates an object composed of the object properties predicate does not return truthy for.",
    "signature": "omitBy<T extends object>( obj: T, predicate: (value: T[keyof T], key: keyof T)",
    "example": "omitBy(...)",
    "output": "..."
  },
  {
    "id": "findkey",
    "name": "findKey",
    "module": "Object",
    "description": "Returns the key of the first element predicate returns truthy for.",
    "signature": "findKey<T extends object>( obj: T, predicate: (value: T[keyof T], key: keyof T)",
    "example": "findKey(...)",
    "output": "..."
  },
  {
    "id": "findlastkey",
    "name": "findLastKey",
    "module": "Object",
    "description": "Returns the key of the last element predicate returns truthy for.",
    "signature": "findLastKey<T extends object>( obj: T, predicate: (value: T[keyof T], key: keyof T)",
    "example": "findLastKey(...)",
    "output": "..."
  },
  {
    "id": "forown",
    "name": "forOwn",
    "module": "Object",
    "description": "Iterates over own enumerable string keyed properties of an object and invokes iteratee for each property.",
    "signature": "forOwn<T extends object>( obj: T, iteratee: (value: T[keyof T], key: keyof T)",
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
    "signature": "filterKeys<T extends Record<string, any>>( obj: T, predicate: (key: keyof T)",
    "example": "filterKeys(...)",
    "output": "..."
  },
  {
    "id": "filtervalues",
    "name": "filterValues",
    "module": "Object",
    "description": "Filters an object's properties based on value predicate.",
    "signature": "filterValues<T extends Record<string, any>>( obj: T, predicate: (val: T[keyof T])",
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
    "id": "observable",
    "name": "Observable",
    "module": "Observable",
    "description": "OptiKit Observable — Zero-dependency, ultra-lightweight reactive stream primitives (RxJS-lite).",
    "signature": "Observable<T>",
    "example": "Observable(...)",
    "output": "..."
  },
  {
    "id": "subject",
    "name": "Subject",
    "module": "Observable",
    "description": "Multicast reactive Subject that acts as both an Observer and an Observable.",
    "signature": "Subject<T> extends Observable<T> implements Observer<T>",
    "example": "Subject(...)",
    "output": "..."
  },
  {
    "id": "behaviorsubject",
    "name": "BehaviorSubject",
    "module": "Observable",
    "description": "Subject variant that stores its current value and immediately emits it to new subscribers.",
    "signature": "BehaviorSubject<T> extends Subject<T>",
    "example": "BehaviorSubject(...)",
    "output": "..."
  },
  {
    "id": "of",
    "name": "of",
    "module": "Observable",
    "description": "Creates an Observable that emits synchronous arguments sequentially and completes.",
    "signature": "of<T>(...items: T[]): Observable<T>",
    "example": "of(...)",
    "output": "..."
  },
  {
    "id": "from",
    "name": "from",
    "module": "Observable",
    "description": "Converts an Array, Iterable, or Promise into an Observable.",
    "signature": "from<T>(input: Iterable<T> | Promise<T>): Observable<T>",
    "example": "from(...)",
    "output": "..."
  },
  {
    "id": "interval",
    "name": "interval",
    "module": "Observable",
    "description": "Emits sequential integers at a specified millisecond interval.",
    "signature": "interval(periodMs: number): Observable<number>",
    "example": "interval(...)",
    "output": "..."
  },
  {
    "id": "mapobservable",
    "name": "mapObservable",
    "module": "Observable",
    "description": "Transforms each emitted value using a projection function.",
    "signature": "mapObservable<T, R>(project: (value: T, index: number)",
    "example": "mapObservable(...)",
    "output": "..."
  },
  {
    "id": "filterobservable",
    "name": "filterObservable",
    "module": "Observable",
    "description": "Emits only values that satisfy the predicate.",
    "signature": "filterObservable<T>(predicate: (value: T, index: number)",
    "example": "filterObservable(...)",
    "output": "..."
  },
  {
    "id": "takeobservable",
    "name": "takeObservable",
    "module": "Observable",
    "description": "Emits only the first `count` values.",
    "signature": "takeObservable<T>(count: number): OperatorFunction<T, T>",
    "example": "takeObservable(...)",
    "output": "..."
  },
  {
    "id": "debouncetimeobservable",
    "name": "debounceTimeObservable",
    "module": "Observable",
    "description": "Discards values that take place within `ms` milliseconds of another emission.",
    "signature": "debounceTimeObservable<T>(ms: number): OperatorFunction<T, T>",
    "example": "debounceTimeObservable(...)",
    "output": "..."
  },
  {
    "id": "runparser",
    "name": "runParser",
    "module": "Parser",
    "description": "OptiKit Parser — Zero-dependency monadic Parser Combinators for building",
    "signature": "runParser<T>(parser: Parser<T>, input: string): ParseOutcome<T>",
    "example": "runParser(...)",
    "output": "..."
  },
  {
    "id": "char",
    "name": "char",
    "module": "Parser",
    "description": "Matches a single exact character.",
    "signature": "char(expected: string): Parser<string>",
    "example": "char(...)",
    "output": "..."
  },
  {
    "id": "str",
    "name": "str",
    "module": "Parser",
    "description": "Matches an exact literal string.",
    "signature": "str(expected: string): Parser<string>",
    "example": "str(...)",
    "output": "..."
  },
  {
    "id": "regexmatch",
    "name": "regexMatch",
    "module": "Parser",
    "description": "Matches a regular expression anchored at the current index.",
    "signature": "regexMatch(pattern: RegExp, label",
    "example": "regexMatch(...)",
    "output": "..."
  },
  {
    "id": "seq",
    "name": "seq",
    "module": "Parser",
    "description": "Sequences multiple parsers and returns an array of their results.",
    "signature": "seq<T extends readonly Parser<unknown>[]>( ...parsers: T ): Parser<",
    "example": "seq(...)",
    "output": "..."
  },
  {
    "id": "alt",
    "name": "alt",
    "module": "Parser",
    "description": "Tries parsers in order and returns the first match.",
    "signature": "alt<T>(...parsers: Parser<T>[]): Parser<T>",
    "example": "alt(...)",
    "output": "..."
  },
  {
    "id": "choice",
    "name": "choice",
    "module": "Parser",
    "description": "Alias for `alt` — tries multiple parser choices.",
    "signature": "choice<T>(parsers: readonly Parser<T>[]): Parser<T>",
    "example": "choice(...)",
    "output": "..."
  },
  {
    "id": "many",
    "name": "many",
    "module": "Parser",
    "description": "Matches zero or more occurrences of a parser.",
    "signature": "many<T>(parser: Parser<T>): Parser<T[]>",
    "example": "many(...)",
    "output": "..."
  },
  {
    "id": "many1",
    "name": "many1",
    "module": "Parser",
    "description": "Matches one or more occurrences of a parser.",
    "signature": "many1<T>(parser: Parser<T>): Parser<T[]>",
    "example": "many1(...)",
    "output": "..."
  },
  {
    "id": "sepby",
    "name": "sepBy",
    "module": "Parser",
    "description": "Matches zero or more items separated by a delimiter parser.",
    "signature": "sepBy<T, S>(item: Parser<T>, sep: Parser<S>): Parser<T[]>",
    "example": "sepBy(...)",
    "output": "..."
  },
  {
    "id": "sepby1",
    "name": "sepBy1",
    "module": "Parser",
    "description": "Matches one or more items separated by a delimiter parser.",
    "signature": "sepBy1<T, S>(item: Parser<T>, sep: Parser<S>): Parser<T[]>",
    "example": "sepBy1(...)",
    "output": "..."
  },
  {
    "id": "between",
    "name": "between",
    "module": "Parser",
    "description": "Matches `content` surrounded by `open` and `close` parsers.",
    "signature": "between<O, T, C>( open: Parser<O>, close: Parser<C>, content: Parser<T> ): Parser<T>",
    "example": "between(...)",
    "output": "..."
  },
  {
    "id": "optionalparse",
    "name": "optionalParse",
    "module": "Parser",
    "description": "Matches a parser optionally, returning `undefined` if it fails.",
    "signature": "optionalParse<T>(parser: Parser<T>): Parser<T | undefined>",
    "example": "optionalParse(...)",
    "output": "..."
  },
  {
    "id": "mapparse",
    "name": "mapParse",
    "module": "Parser",
    "description": "Transforms the parsed output value.",
    "signature": "mapParse<A, B>(parser: Parser<A>, fn: (value: A)",
    "example": "mapParse(...)",
    "output": "..."
  },
  {
    "id": "flatmapparse",
    "name": "flatMapParse",
    "module": "Parser",
    "description": "Chains a parser based on the previously parsed value.",
    "signature": "flatMapParse<A, B>(parser: Parser<A>, fn: (value: A)",
    "example": "flatMapParse(...)",
    "output": "..."
  },
  {
    "id": "lookahead",
    "name": "lookahead",
    "module": "Parser",
    "description": "Positive lookahead: succeeds without consuming input if `parser` matches.",
    "signature": "lookahead<T>(parser: Parser<T>): Parser<T>",
    "example": "lookahead(...)",
    "output": "..."
  },
  {
    "id": "notfollowedby",
    "name": "notFollowedBy",
    "module": "Parser",
    "description": "Negative lookahead: succeeds without consuming input if `parser` fails.",
    "signature": "notFollowedBy<T>(parser: Parser<T>): Parser<null>",
    "example": "notFollowedBy(...)",
    "output": "..."
  },
  {
    "id": "eof",
    "name": "eof",
    "module": "Parser",
    "description": "Matches the end of the input string.",
    "signature": "eof: Parser<null>",
    "example": "eof(...)",
    "output": "..."
  },
  {
    "id": "whitespace",
    "name": "whitespace",
    "module": "Parser",
    "description": "Matches zero or more whitespace characters.",
    "signature": "whitespace: Parser<string>",
    "example": "whitespace(...)",
    "output": "..."
  },
  {
    "id": "lexeme",
    "name": "lexeme",
    "module": "Parser",
    "description": "Wraps a parser to skip trailing whitespace.",
    "signature": "lexeme<T>(parser: Parser<T>): Parser<T>",
    "example": "lexeme(...)",
    "output": "..."
  },
  {
    "id": "digits",
    "name": "digits",
    "module": "Parser",
    "description": "Matches one or more ASCII digits.",
    "signature": "digits: Parser<string>",
    "example": "digits(...)",
    "output": "..."
  },
  {
    "id": "integer",
    "name": "integer",
    "module": "Parser",
    "description": "Matches a signed integer and parses it to a `number`.",
    "signature": "integer: Parser<number>",
    "example": "integer(...)",
    "output": "..."
  },
  {
    "id": "floating",
    "name": "floating",
    "module": "Parser",
    "description": "Matches a signed floating-point number and parses it to a `number`.",
    "signature": "floating: Parser<number>",
    "example": "floating(...)",
    "output": "..."
  },
  {
    "id": "quotedstring",
    "name": "quotedString",
    "module": "Parser",
    "description": "Matches a double-quoted string literal (supporting `\\\"` escapes).",
    "signature": "quotedString: Parser<string>",
    "example": "quotedString(...)",
    "output": "..."
  },
  {
    "id": "identifier",
    "name": "identifier",
    "module": "Parser",
    "description": "Matches a standard programming identifier (`[A-Za-z_][A-Za-z0-9_]*`).",
    "signature": "identifier: Parser<string>",
    "example": "identifier(...)",
    "output": "..."
  },
  {
    "id": "lazyparser",
    "name": "lazyParser",
    "module": "Parser",
    "description": "Defers parser creation for recursive grammars.",
    "signature": "lazyParser<T>(factory: ()",
    "example": "lazyParser(...)",
    "output": "..."
  },
  {
    "id": "sep",
    "name": "sep",
    "module": "Path",
    "description": "Utilities for cross-platform path manipulation.",
    "signature": "sep",
    "example": "sep(...)",
    "output": "..."
  },
  {
    "id": "normalize",
    "name": "normalize",
    "module": "Path",
    "description": "Normalizes a path string, resolving '..' and '.'.",
    "signature": "normalize(path: string): string",
    "example": "normalize(...)",
    "output": "..."
  },
  {
    "id": "join",
    "name": "join",
    "module": "Path",
    "description": "Joins all given path segments together.",
    "signature": "join(...paths: string[]): string",
    "example": "join(...)",
    "output": "..."
  },
  {
    "id": "dirname",
    "name": "dirname",
    "module": "Path",
    "description": "Gets the directory name of a path.",
    "signature": "dirname(path: string): string",
    "example": "dirname(...)",
    "output": "..."
  },
  {
    "id": "basename",
    "name": "basename",
    "module": "Path",
    "description": "Gets the base name of a path.",
    "signature": "basename(path: string, ext?: string): string",
    "example": "basename(...)",
    "output": "..."
  },
  {
    "id": "extname",
    "name": "extname",
    "module": "Path",
    "description": "Gets the extension of a path.",
    "signature": "extname(path: string): string",
    "example": "extname(...)",
    "output": "..."
  },
  {
    "id": "isabsolute",
    "name": "isAbsolute",
    "module": "Path",
    "description": "Checks if a path is absolute.",
    "signature": "isAbsolute(path: string): boolean",
    "example": "isAbsolute(...)",
    "output": "..."
  },
  {
    "id": "measuretime",
    "name": "measureTime",
    "module": "Perf",
    "description": "Measures the execution time of a synchronous function.",
    "signature": "measureTime<T>(fn: ()",
    "example": "measureTime(...)",
    "output": "..."
  },
  {
    "id": "measuretimeasync",
    "name": "measureTimeAsync",
    "module": "Perf",
    "description": "Measures the execution time of an asynchronous function.",
    "signature": "measureTimeAsync<T>(fn: ()",
    "example": "measureTimeAsync(...)",
    "output": "..."
  },
  {
    "id": "benchmark",
    "name": "benchmark",
    "module": "Perf",
    "description": "Benchmarks a function by running it multiple times and returning the average execution time.",
    "signature": "benchmark(fn: ()",
    "example": "benchmark(...)",
    "output": "..."
  },
  {
    "id": "benchmarkasync",
    "name": "benchmarkAsync",
    "module": "Perf",
    "description": "Benchmarks an asynchronous function.",
    "signature": "benchmarkAsync(fn: ()",
    "example": "benchmarkAsync(...)",
    "output": "..."
  },
  {
    "id": "createfpscounter",
    "name": "createFPSCounter",
    "module": "Perf",
    "description": "Creates a FPS (Frames Per Second) counter.",
    "signature": "createFPSCounter()",
    "example": "createFPSCounter(...)",
    "output": "..."
  },
  {
    "id": "mindelay",
    "name": "minDelay",
    "module": "Perf",
    "description": "Ensures a function takes at least a specified amount of time to execute.",
    "signature": "minDelay<T>(fn: ()",
    "example": "minDelay(...)",
    "output": "..."
  },
  {
    "id": "createpipeline",
    "name": "createPipeline",
    "module": "Pipeline",
    "description": "OptiKit Pipeline — Resilient multi-step asynchronous workflow orchestrator",
    "signature": "createPipeline<TContext extends Record<string, any>>(): Pipeline<TContext>",
    "example": "```ts\npipeline.step('validateUser', async (ctx) => {\nreturn { isValid: true };\n});\n```\n/\npublic step(\nname: string,\naction: (ctx: TContext) => Partial<TContext> | void | Promise<Partial<TContext> | void>,\noptions?: StepOptions<TContext>\n): this {\nthis.steps.push({ name, action, options });\nreturn this;\n}\npublic onStepStart(fn: (stepName: string, ctx: TContext) => void): this {\nthis.onStepStartHook = fn;\nreturn this;\n}\npublic onStepEnd(fn: (stepName: string, ctx: TContext, durationMs: number) => void): this {\nthis.onStepEndHook = fn;\nreturn this;\n}\npublic onError(fn: (err: Error, stepName: string, ctx: TContext) => void): this {\nthis.onErrorHook = fn;\nreturn this;\n}\n/**\nExecutes the pipeline steps sequentially.\nIf a step fails, compensation handlers of previous completed steps are run in reverse.\n/\npublic async run(initialContext: TContext = {} as TContext): Promise<PipelineResult<TContext>> {\nconst startTime = Date.now();\nconst ctx: TContext = { ...initialContext };\nconst completedSteps: string[] = [];\nconst executedSteps: StepRecord<TContext>[] = [];\nfor (const stepRecord of this.steps) {\nconst { name, action, options } = stepRecord;\nconst stepStart = Date.now();\nif (this.onStepStartHook) {\nthis.onStepStartHook(name, ctx);\n}\nlet stepSuccess = false;\nlet lastError: Error | undefined;\nconst retries = options?.retries || 0;\nfor (let attempt = 0; attempt <= retries; attempt++) {\ntry {\nlet actionPromise = Promise.resolve(action(ctx));\nif (options?.timeoutMs && options.timeoutMs > 0) {\nactionPromise = Promise.race([\nactionPromise,\nnew Promise<never>((_, reject) =>\nsetTimeout(() => reject(new Error(`Step \"${name}\" timed out after ${options.timeoutMs}ms`)), options.timeoutMs)\n)\n]);\n}\nconst partialCtx = await actionPromise;\nif (partialCtx && typeof partialCtx === 'object') {\nObject.assign(ctx, partialCtx);\n}\nstepSuccess = true;\nbreak;\n} catch (err: any) {\nlastError = err instanceof Error ? err : new Error(String(err));\n}\n}\nif (!stepSuccess && options?.fallback) {\ntry {\nconst fallbackCtx = await Promise.resolve(options.fallback(lastError!, ctx));\nif (fallbackCtx && typeof fallbackCtx === 'object') {\nObject.assign(ctx, fallbackCtx);\n}\nstepSuccess = true;\n} catch (fbErr: any) {\nlastError = fbErr instanceof Error ? fbErr : new Error(String(fbErr));\n}\n}\nif (stepSuccess) {\ncompletedSteps.push(name);\nexecutedSteps.push(stepRecord);\nif (this.onStepEndHook) {\nthis.onStepEndHook(name, ctx, Date.now() - stepStart);\n}\n} else {\nif (this.onErrorHook) {\nthis.onErrorHook(lastError!, name, ctx);\n}\n// Compensation rollback (Saga pattern) in reverse order\nfor (let i = executedSteps.length - 1; i >= 0; i--) {\nconst prevStep = executedSteps[i];\nif (prevStep.options?.compensate) {\ntry {\nawait Promise.resolve(prevStep.options.compensate(ctx));\n} catch (compErr) {\nconsole.error(`Compensation error on step \"${prevStep.name}\":`, compErr);\n}\n}\n}\nreturn {\nsuccess: false,\ncontext: ctx,\ndurationMs: Date.now() - startTime,\ncompletedSteps,\nfailedStep: name,\nerror: lastError\n};\n}\n}\nreturn {\nsuccess: true,\ncontext: ctx,\ndurationMs: Date.now() - startTime,\ncompletedSteps\n};\n}\n}\n/**\nCreates a new resilient workflow pipeline.",
    "output": "..."
  },
  {
    "id": "whereclause",
    "name": "whereClause",
    "module": "Query",
    "description": "OptiKit Query — In-memory SQL-like / LINQ-style query, join, windowing,",
    "signature": "whereClause<T>(items: readonly T[], predicate: (item: T, index: number)",
    "example": "whereClause(...)",
    "output": "..."
  },
  {
    "id": "selectfields",
    "name": "selectFields",
    "module": "Query",
    "description": "Projects each record to only the specified keys.",
    "signature": "selectFields<T extends Record<string, unknown>, K extends keyof T>( items: readonly T[], fields: readonly K[] ): Pick<T, K>[]",
    "example": "selectFields(...)",
    "output": "..."
  },
  {
    "id": "orderbymultiple",
    "name": "orderByMultiple",
    "module": "Query",
    "description": "Sorts records by multiple key/direction specifications without mutating the input.",
    "signature": "orderByMultiple<T>( items: readonly T[], specs: readonly",
    "example": "orderByMultiple(...)",
    "output": "..."
  },
  {
    "id": "groupbykey",
    "name": "groupByKey",
    "module": "Query",
    "description": "Groups records by a key selector function or property name.",
    "signature": "groupByKey<T, K extends PropertyKey>( items: readonly T[], keySelector: keyof T | ((item: T)",
    "example": "groupByKey(...)",
    "output": "..."
  },
  {
    "id": "havingclause",
    "name": "havingClause",
    "module": "Query",
    "description": "Filters grouped records using a predicate on `(groupItems, key)`.",
    "signature": "havingClause<T, K extends PropertyKey>( groups: Record<K, T[]>, predicate: (items: T[], key: string)",
    "example": "havingClause(...)",
    "output": "..."
  },
  {
    "id": "innerjoin",
    "name": "innerJoin",
    "module": "Query",
    "description": "Performs an SQL-style INNER JOIN on two collections.",
    "signature": "innerJoin<L, R, K, Out",
    "example": "innerJoin(...)",
    "output": "..."
  },
  {
    "id": "leftjoin",
    "name": "leftJoin",
    "module": "Query",
    "description": "Performs an SQL-style LEFT JOIN on two collections.",
    "signature": "leftJoin<L, R, K, Out",
    "example": "leftJoin(...)",
    "output": "..."
  },
  {
    "id": "rightjoin",
    "name": "rightJoin",
    "module": "Query",
    "description": "Performs an SQL-style RIGHT JOIN on two collections.",
    "signature": "rightJoin<L, R, K, Out",
    "example": "rightJoin(...)",
    "output": "..."
  },
  {
    "id": "fullouterjoin",
    "name": "fullOuterJoin",
    "module": "Query",
    "description": "Performs an SQL-style FULL OUTER JOIN on two collections.",
    "signature": "fullOuterJoin<L, R, K, Out",
    "example": "fullOuterJoin(...)",
    "output": "..."
  },
  {
    "id": "crossjoin",
    "name": "crossJoin",
    "module": "Query",
    "description": "Performs a Cartesian CROSS JOIN of two collections.",
    "signature": "crossJoin<L, R, Out",
    "example": "crossJoin(...)",
    "output": "..."
  },
  {
    "id": "distinctby",
    "name": "distinctBy",
    "module": "Query",
    "description": "Deduplicates records by a key selector, keeping the first occurrence.",
    "signature": "distinctBy<T, K>(items: readonly T[], keySelector: (item: T)",
    "example": "distinctBy(...)",
    "output": "..."
  },
  {
    "id": "paginatequery",
    "name": "paginateQuery",
    "module": "Query",
    "description": "Paginates a collection and returns items with metadata.",
    "signature": "paginateQuery<T>( items: readonly T[], page: number, pageSize: number )",
    "example": "paginateQuery(...)",
    "output": "..."
  },
  {
    "id": "aggregatesum",
    "name": "aggregateSum",
    "module": "Query",
    "description": "Sums a numeric field or selector over a collection.",
    "signature": "aggregateSum<T>(items: readonly T[], selector: (item: T)",
    "example": "aggregateSum(...)",
    "output": "..."
  },
  {
    "id": "aggregateavg",
    "name": "aggregateAvg",
    "module": "Query",
    "description": "Computes the arithmetic mean of a numeric selector over a collection.",
    "signature": "aggregateAvg<T>(items: readonly T[], selector: (item: T)",
    "example": "aggregateAvg(...)",
    "output": "..."
  },
  {
    "id": "aggregatemin",
    "name": "aggregateMin",
    "module": "Query",
    "description": "Returns the minimum value of a numeric selector over a collection.",
    "signature": "aggregateMin<T>(items: readonly T[], selector: (item: T)",
    "example": "aggregateMin(...)",
    "output": "..."
  },
  {
    "id": "aggregatemax",
    "name": "aggregateMax",
    "module": "Query",
    "description": "Returns the maximum value of a numeric selector over a collection.",
    "signature": "aggregateMax<T>(items: readonly T[], selector: (item: T)",
    "example": "aggregateMax(...)",
    "output": "..."
  },
  {
    "id": "aggregatecount",
    "name": "aggregateCount",
    "module": "Query",
    "description": "Counts records, optionally matching a predicate.",
    "signature": "aggregateCount<T>( items: readonly T[], predicate?: (item: T)",
    "example": "aggregateCount(...)",
    "output": "..."
  },
  {
    "id": "pivottable",
    "name": "pivotTable",
    "module": "Query",
    "description": "Pivots flat records into a 2D cross-tabulation table.",
    "signature": "pivotTable<T, V",
    "example": "pivotTable(...)",
    "output": "..."
  },
  {
    "id": "unpivottable",
    "name": "unpivotTable",
    "module": "Query",
    "description": "Unpivots a 2D pivot table back into flat `{ row, col, value }` records.",
    "signature": "unpivotTable<V>( table: Record<string, Record<string, V>> )",
    "example": "unpivotTable(...)",
    "output": "..."
  },
  {
    "id": "rollupgroup",
    "name": "rollupGroup",
    "module": "Query",
    "description": "Groups and summarizes records with a custom reducer per group.",
    "signature": "rollupGroup<T, K extends PropertyKey, R>( items: readonly T[], keySelector: (item: T)",
    "example": "rollupGroup(...)",
    "output": "..."
  },
  {
    "id": "windowrank",
    "name": "windowRank",
    "module": "Query",
    "description": "Assigns SQL-style dense/standard rank (`1, 1, 3`) to sorted items by score.",
    "signature": "windowRank<T>( items: readonly T[], scoreSelector: (item: T)",
    "example": "windowRank(...)",
    "output": "..."
  },
  {
    "id": "windowrownumber",
    "name": "windowRowNumber",
    "module": "Query",
    "description": "Assigns 1-based sequential row numbers to items.",
    "signature": "windowRowNumber<T>(items: readonly T[]): (T &",
    "example": "windowRowNumber(...)",
    "output": "..."
  },
  {
    "id": "windowrunningsum",
    "name": "windowRunningSum",
    "module": "Query",
    "description": "Computes a running cumulative sum over a collection.",
    "signature": "windowRunningSum<T>( items: readonly T[], valueSelector: (item: T)",
    "example": "windowRunningSum(...)",
    "output": "..."
  },
  {
    "id": "windowmovingavg",
    "name": "windowMovingAvg",
    "module": "Query",
    "description": "Computes a trailing moving average over a window of size `windowSize`.",
    "signature": "windowMovingAvg<T>( items: readonly T[], valueSelector: (item: T)",
    "example": "windowMovingAvg(...)",
    "output": "..."
  },
  {
    "id": "unionqueries",
    "name": "unionQueries",
    "module": "Query",
    "description": "Returns the distinct union of two collections by key.",
    "signature": "unionQueries<T, K>( a: readonly T[], b: readonly T[], keySelector: (item: T)",
    "example": "unionQueries(...)",
    "output": "..."
  },
  {
    "id": "intersectqueries",
    "name": "intersectQueries",
    "module": "Query",
    "description": "Returns items from `a` whose keys also appear in `b`.",
    "signature": "intersectQueries<T, K>( a: readonly T[], b: readonly T[], keySelector: (item: T)",
    "example": "intersectQueries(...)",
    "output": "..."
  },
  {
    "id": "exceptqueries",
    "name": "exceptQueries",
    "module": "Query",
    "description": "Returns items from `a` whose keys do not appear in `b`.",
    "signature": "exceptQueries<T, K>( a: readonly T[], b: readonly T[], keySelector: (item: T)",
    "example": "exceptQueries(...)",
    "output": "..."
  },
  {
    "id": "queryfrom",
    "name": "queryFrom",
    "module": "Query",
    "description": "Fluent query builder wrapping all query operations.",
    "signature": "queryFrom<T>(items: readonly T[])",
    "example": "queryFrom(...)",
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
    "id": "tokenbucket",
    "name": "TokenBucket",
    "module": "Rate-limit",
    "description": "OptiKit Rate Limiter — Deterministic concurrency control, Token Bucket,",
    "signature": "TokenBucket",
    "example": "```ts\nconst bucket = new TokenBucket({ capacity: 10, refillRate: 2 });\nif (bucket.tryConsume(1)) {\n// Token granted!\n}\n```",
    "output": "..."
  },
  {
    "id": "leakybucket",
    "name": "LeakyBucket",
    "module": "Rate-limit",
    "description": "Returns current available tokens.",
    "signature": "LeakyBucket",
    "example": "LeakyBucket(...)",
    "output": "..."
  },
  {
    "id": "slidingwindowratelimiter",
    "name": "SlidingWindowRateLimiter",
    "module": "Rate-limit",
    "description": "Returns the current water level.",
    "signature": "SlidingWindowRateLimiter",
    "example": "```ts\nconst limiter = new SlidingWindowRateLimiter();\nif (limiter.isAllowed('user_123', 5, 60000)) {\n// Allow max 5 requests per 60 seconds\n}\n```",
    "output": "..."
  },
  {
    "id": "ratelimit",
    "name": "rateLimit",
    "module": "Rate-limit",
    "description": "Checks if an action is allowed under the rate limit window and records it.",
    "signature": "rateLimit<TArgs extends any[], TReturn>( fn: (...args: TArgs)",
    "example": "```ts\nconst fetchUser = rateLimit(async (id: string) => api.getUser(id), { limit: 5, intervalMs: 1000 });\n```",
    "output": "..."
  },
  {
    "id": "exponentialbackoff",
    "name": "ExponentialBackoff",
    "module": "Rate-limit",
    "description": "Calculates exponential backoff delay with optional random jitter.",
    "signature": "ExponentialBackoff",
    "example": "ExponentialBackoff(...)",
    "output": "..."
  },
  {
    "id": "createreactivestore",
    "name": "createReactiveStore",
    "module": "Reactive-store",
    "description": "OptiKit Reactive Store — Redux/Zustand-style immutable state management with slices,",
    "signature": "createReactiveStore<S, A extends StoreAction",
    "example": "createReactiveStore(...)",
    "output": "..."
  },
  {
    "id": "createaction",
    "name": "createAction",
    "module": "Reactive-store",
    "description": "Creates a typed action creator function.",
    "signature": "createAction<T",
    "example": "createAction(...)",
    "output": "..."
  },
  {
    "id": "createreducer",
    "name": "createReducer",
    "module": "Reactive-store",
    "description": "Creates a reducer from a handler map `{ [actionType]: (state, action) => nextState }`.",
    "signature": "createReducer<S>( initialState: S, handlers: Record<string, (state: S, action: StoreAction<unknown>)",
    "example": "createReducer(...)",
    "output": "..."
  },
  {
    "id": "createslice",
    "name": "createSlice",
    "module": "Reactive-store",
    "description": "Creates a slice with scoped action creators and a combined reducer.",
    "signature": "createSlice<S, R extends Record<string, (state: S, payload: never)",
    "example": "createSlice(...)",
    "output": "..."
  },
  {
    "id": "combinereducers",
    "name": "combineReducers",
    "module": "Reactive-store",
    "description": "Combines a map of slice reducers into a single root reducer.",
    "signature": "combineReducers<S extends Record<string, unknown>>( reducers",
    "example": "combineReducers(...)",
    "output": "..."
  },
  {
    "id": "createselector",
    "name": "createSelector",
    "module": "Reactive-store",
    "description": "Creates a memoized Reselect-style derived state selector.",
    "signature": "createSelector<S, R1, Out>( s1: (state: S)",
    "example": "createSelector(...)",
    "output": "..."
  },
  {
    "id": "createundoablestore",
    "name": "createUndoableStore",
    "module": "Reactive-store",
    "description": "Wraps a store with undo/redo history stacks.",
    "signature": "createUndoableStore<S>(initialState: S, maxHistory",
    "example": "createUndoableStore(...)",
    "output": "..."
  },
  {
    "id": "applymiddleware",
    "name": "applyMiddleware",
    "module": "Reactive-store",
    "description": "Applies middleware functions to a store's dispatch (standalone helper).",
    "signature": "applyMiddleware<S>(...middlewares: Middleware<S>[]): Middleware<S>[]",
    "example": "applyMiddleware(...)",
    "output": "..."
  },
  {
    "id": "loggermiddleware",
    "name": "loggerMiddleware",
    "module": "Reactive-store",
    "description": "Creates a logging middleware that records dispatched actions to a callback.",
    "signature": "loggerMiddleware<S>(log: (msg: string, action: StoreAction)",
    "example": "loggerMiddleware(...)",
    "output": "..."
  },
  {
    "id": "thunkmiddleware",
    "name": "thunkMiddleware",
    "module": "Reactive-store",
    "description": "Creates a thunk middleware supporting function actions `(dispatch, getState) => void`.",
    "signature": "thunkMiddleware<S>(): Middleware<S>",
    "example": "thunkMiddleware(...)",
    "output": "..."
  },
  {
    "id": "persistmiddleware",
    "name": "persistMiddleware",
    "module": "Reactive-store",
    "description": "Creates a persistence middleware that saves state on every action.",
    "signature": "persistMiddleware<S>(save: (state: S)",
    "example": "persistMiddleware(...)",
    "output": "..."
  },
  {
    "id": "bindactioncreators",
    "name": "bindActionCreators",
    "module": "Reactive-store",
    "description": "Binds an object of action creators directly to a store's `dispatch`.",
    "signature": "bindActionCreators< T extends Record<string, (...args: never[])",
    "example": "bindActionCreators(...)",
    "output": "..."
  },
  {
    "id": "createentityadapter",
    "name": "createEntityAdapter",
    "module": "Reactive-store",
    "description": "Creates a normalized entity adapter (`{ ids, entities }`).",
    "signature": "createEntityAdapter<T>(selectId: (entity: T)",
    "example": "createEntityAdapter(...)",
    "output": "..."
  },
  {
    "id": "selectallentities",
    "name": "selectAllEntities",
    "module": "Reactive-store",
    "description": "Selects all entities in insertion order from an EntityState.",
    "signature": "selectAllEntities<T>(state: EntityState<T>): T[]",
    "example": "selectAllEntities(...)",
    "output": "..."
  },
  {
    "id": "selectentitybyid",
    "name": "selectEntityById",
    "module": "Reactive-store",
    "description": "Selects a single entity by ID from an EntityState.",
    "signature": "selectEntityById<T>(state: EntityState<T>, id: string | number): T | undefined",
    "example": "selectEntityById(...)",
    "output": "..."
  },
  {
    "id": "upsertentity",
    "name": "upsertEntity",
    "module": "Reactive-store",
    "description": "Immutably inserts or updates an entity in an EntityState.",
    "signature": "upsertEntity<T>( state: EntityState<T>, entity: T, selectId: (entity: T)",
    "example": "upsertEntity(...)",
    "output": "..."
  },
  {
    "id": "removeentity",
    "name": "removeEntity",
    "module": "Reactive-store",
    "description": "Immutably removes an entity by ID from an EntityState.",
    "signature": "removeEntity<T>(state: EntityState<T>, id: string | number): EntityState<T>",
    "example": "removeEntity(...)",
    "output": "..."
  },
  {
    "id": "createeventsourcedstore",
    "name": "createEventSourcedStore",
    "module": "Reactive-store",
    "description": "Creates an event-sourced store that appends events and derives state via projection.",
    "signature": "createEventSourcedStore<S, E>( initialState: S, applyEvent: (state: S, event: E)",
    "example": "createEventSourcedStore(...)",
    "output": "..."
  },
  {
    "id": "replayevents",
    "name": "replayEvents",
    "module": "Reactive-store",
    "description": "Replays a sequence of domain events from an initial state.",
    "signature": "replayEvents<S, E>( initialState: S, events: readonly E[], applyEvent: (state: S, event: E)",
    "example": "replayEvents(...)",
    "output": "..."
  },
  {
    "id": "snapshotstore",
    "name": "snapshotStore",
    "module": "Reactive-store",
    "description": "Takes a JSON-cloned snapshot of a store's current state.",
    "signature": "snapshotStore<S>(store",
    "example": "snapshotStore(...)",
    "output": "..."
  },
  {
    "id": "subscribeselector",
    "name": "subscribeSelector",
    "module": "Reactive-store",
    "description": "Subscribes to a derived selector and only invokes `onChange` when the selected slice changes.",
    "signature": "subscribeSelector<S, T>( store: ReactiveStore<S>, selector: (state: S)",
    "example": "subscribeSelector(...)",
    "output": "..."
  },
  {
    "id": "batchdispatch",
    "name": "batchDispatch",
    "module": "Reactive-store",
    "description": "Dispatches multiple actions sequentially on a store.",
    "signature": "batchDispatch<S, A extends StoreAction>( store: ReactiveStore<S, A>, actions: readonly A[] ): void",
    "example": "batchDispatch(...)",
    "output": "..."
  },
  {
    "id": "resetstore",
    "name": "resetStore",
    "module": "Reactive-store",
    "description": "Dispatches a standard `@@RESET` action on a store.",
    "signature": "resetStore<S>(store: ReactiveStore<S>): void",
    "example": "resetStore(...)",
    "output": "..."
  },
  {
    "id": "regex",
    "name": "regex",
    "module": "Regex",
    "description": "A collection of common, standard regular expressions for validation.",
    "signature": "regex",
    "example": "regex(...)",
    "output": "..."
  },
  {
    "id": "ok",
    "name": "ok",
    "module": "Result",
    "description": "OptiKit Result & Option — Type-safe algebraic data types for explicit error handling",
    "signature": "ok<T>(value: T): Ok<T>",
    "example": "```ts\nconst res = ok(42);\n```",
    "output": "..."
  },
  {
    "id": "err",
    "name": "err",
    "module": "Result",
    "description": "Creates a failed `Err<E>` Result.",
    "signature": "err<E>(error: E): Err<E>",
    "example": "```ts\nconst res = err('Invalid input');\n```",
    "output": "..."
  },
  {
    "id": "isok",
    "name": "isOk",
    "module": "Result",
    "description": "Type guard checking if a Result is `Ok`.",
    "signature": "isOk<T, E>(result: Result<T, E>): result is Ok<T>",
    "example": "isOk(...)",
    "output": "..."
  },
  {
    "id": "iserr",
    "name": "isErr",
    "module": "Result",
    "description": "Type guard checking if a Result is `Err`.",
    "signature": "isErr<T, E>(result: Result<T, E>): result is Err<E>",
    "example": "isErr(...)",
    "output": "..."
  },
  {
    "id": "unwrap",
    "name": "unwrap",
    "module": "Result",
    "description": "Extracts the `Ok` value or throws the `Err` error.",
    "signature": "unwrap<T, E>(result: Result<T, E>): T",
    "example": "unwrap(...)",
    "output": "..."
  },
  {
    "id": "unwrapor",
    "name": "unwrapOr",
    "module": "Result",
    "description": "Extracts the `Ok` value or returns a fallback default.",
    "signature": "unwrapOr<T, E>(result: Result<T, E>, fallback: T): T",
    "example": "unwrapOr(...)",
    "output": "..."
  },
  {
    "id": "unwraporelse",
    "name": "unwrapOrElse",
    "module": "Result",
    "description": "Extracts the `Ok` value or computes a fallback from the error.",
    "signature": "unwrapOrElse<T, E>(result: Result<T, E>, fn: (error: E)",
    "example": "unwrapOrElse(...)",
    "output": "..."
  },
  {
    "id": "unwraperr",
    "name": "unwrapErr",
    "module": "Result",
    "description": "Extracts the `Err` error or throws if the Result is `Ok`.",
    "signature": "unwrapErr<T, E>(result: Result<T, E>): E",
    "example": "unwrapErr(...)",
    "output": "..."
  },
  {
    "id": "mapresult",
    "name": "mapResult",
    "module": "Result",
    "description": "Transforms the `Ok` value of a Result while preserving `Err`.",
    "signature": "mapResult<T, U, E>(result: Result<T, E>, fn: (value: T)",
    "example": "mapResult(...)",
    "output": "..."
  },
  {
    "id": "maperr",
    "name": "mapErr",
    "module": "Result",
    "description": "Transforms the `Err` error of a Result while preserving `Ok`.",
    "signature": "mapErr<T, E, F>(result: Result<T, E>, fn: (error: E)",
    "example": "mapErr(...)",
    "output": "..."
  },
  {
    "id": "andthen",
    "name": "andThen",
    "module": "Result",
    "description": "Chains a Result-returning function onto an `Ok` value (monadic bind).",
    "signature": "andThen<T, U, E>( result: Result<T, E>, fn: (value: T)",
    "example": "andThen(...)",
    "output": "..."
  },
  {
    "id": "orelse",
    "name": "orElse",
    "module": "Result",
    "description": "Recovers from an `Err` by applying a fallback Result-returning function.",
    "signature": "orElse<T, E, F>( result: Result<T, E>, fn: (error: E)",
    "example": "orElse(...)",
    "output": "..."
  },
  {
    "id": "matchresult",
    "name": "matchResult",
    "module": "Result",
    "description": "Pattern-matches on a Result, executing `onOk` or `onErr`.",
    "signature": "matchResult<T, E, R>( result: Result<T, E>, handlers",
    "example": "matchResult(...)",
    "output": "..."
  },
  {
    "id": "tryresult",
    "name": "tryResult",
    "module": "Result",
    "description": "Wraps a synchronous throwing function into a `Result<T, E>`.",
    "signature": "tryResult<T, E",
    "example": "tryResult(...)",
    "output": "..."
  },
  {
    "id": "tryresultasync",
    "name": "tryResultAsync",
    "module": "Result",
    "description": "Wraps an async promise or function into a `Promise<Result<T, E>>`.",
    "signature": "tryResultAsync<T, E",
    "example": "tryResultAsync(...)",
    "output": "..."
  },
  {
    "id": "combineresults",
    "name": "combineResults",
    "module": "Result",
    "description": "Combines an array of Results into a single Result of array (short-circuits on first `Err`).",
    "signature": "combineResults<T, E>(results: readonly Result<T, E>[]): Result<T[], E>",
    "example": "combineResults(...)",
    "output": "..."
  },
  {
    "id": "partitionresults",
    "name": "partitionResults",
    "module": "Result",
    "description": "Partitions an array of Results into `{ ok: T[]; err: E[] }`.",
    "signature": "partitionResults<T, E>( results: readonly Result<T, E>[] )",
    "example": "partitionResults(...)",
    "output": "..."
  },
  {
    "id": "someoption",
    "name": "someOption",
    "module": "Result",
    "description": "Creates a `Some<T>` Option.",
    "signature": "someOption<T>(value: T): Some<T>",
    "example": "someOption(...)",
    "output": "..."
  },
  {
    "id": "noneoption",
    "name": "noneOption",
    "module": "Result",
    "description": "Creates a `None` Option.",
    "signature": "noneOption(): None",
    "example": "noneOption(...)",
    "output": "..."
  },
  {
    "id": "issome",
    "name": "isSome",
    "module": "Result",
    "description": "Type guard checking if an Option is `Some`.",
    "signature": "isSome<T>(option: Option<T>): option is Some<T>",
    "example": "isSome(...)",
    "output": "..."
  },
  {
    "id": "isnone",
    "name": "isNone",
    "module": "Result",
    "description": "Type guard checking if an Option is `None`.",
    "signature": "isNone<T>(option: Option<T>): option is None",
    "example": "isNone(...)",
    "output": "..."
  },
  {
    "id": "fromnullable",
    "name": "fromNullable",
    "module": "Result",
    "description": "Converts a nullable value (`T | null | undefined`) into an `Option<T>`.",
    "signature": "fromNullable<T>(value: T | null | undefined): Option<T>",
    "example": "fromNullable(...)",
    "output": "..."
  },
  {
    "id": "mapoption",
    "name": "mapOption",
    "module": "Result",
    "description": "Maps a function over a `Some` value, preserving `None`.",
    "signature": "mapOption<T, U>(option: Option<T>, fn: (value: T)",
    "example": "mapOption(...)",
    "output": "..."
  },
  {
    "id": "flatmapoption",
    "name": "flatMapOption",
    "module": "Result",
    "description": "Flat-maps an Option-returning function over a `Some` value.",
    "signature": "flatMapOption<T, U>( option: Option<T>, fn: (value: T)",
    "example": "flatMapOption(...)",
    "output": "..."
  },
  {
    "id": "filteroption",
    "name": "filterOption",
    "module": "Result",
    "description": "Filters an Option with a predicate, returning `None` if it fails.",
    "signature": "filterOption<T>(option: Option<T>, predicate: (value: T)",
    "example": "filterOption(...)",
    "output": "..."
  },
  {
    "id": "unwrapoption",
    "name": "unwrapOption",
    "module": "Result",
    "description": "Extracts the value from `Some` or throws an Error on `None`.",
    "signature": "unwrapOption<T>(option: Option<T>): T",
    "example": "unwrapOption(...)",
    "output": "..."
  },
  {
    "id": "unwrapoptionor",
    "name": "unwrapOptionOr",
    "module": "Result",
    "description": "Extracts the value from `Some` or returns a fallback on `None`.",
    "signature": "unwrapOptionOr<T>(option: Option<T>, fallback: T): T",
    "example": "unwrapOptionOr(...)",
    "output": "..."
  },
  {
    "id": "matchoption",
    "name": "matchOption",
    "module": "Result",
    "description": "Pattern-matches on an Option, executing `some` or `none`.",
    "signature": "matchOption<T, R>( option: Option<T>, handlers",
    "example": "matchOption(...)",
    "output": "..."
  },
  {
    "id": "optiontoresult",
    "name": "optionToResult",
    "module": "Result",
    "description": "Converts an `Option<T>` to a `Result<T, E>` using the provided error on `None`.",
    "signature": "optionToResult<T, E>(option: Option<T>, error: E): Result<T, E>",
    "example": "optionToResult(...)",
    "output": "..."
  },
  {
    "id": "retrywithexponentialbackoff",
    "name": "retryWithExponentialBackoff",
    "module": "Retry",
    "description": "Retry Utilities",
    "signature": "retryWithExponentialBackoff<T>( fn: ()",
    "example": "retryWithExponentialBackoff(...)",
    "output": "..."
  },
  {
    "id": "createpriorityqueue",
    "name": "createPriorityQueue",
    "module": "Scheduler",
    "description": "OptiKit Scheduler & Concurrency Pro — Priority queues, task queues, circuit breakers,",
    "signature": "createPriorityQueue<T>(): SchedulerPriorityQueue<T>",
    "example": "createPriorityQueue(...)",
    "output": "..."
  },
  {
    "id": "createtaskqueue",
    "name": "createTaskQueue",
    "module": "Scheduler",
    "description": "Creates a concurrency-limited async Task Queue.",
    "signature": "createTaskQueue(concurrency",
    "example": "createTaskQueue(...)",
    "output": "..."
  },
  {
    "id": "createjobscheduler",
    "name": "createJobScheduler",
    "module": "Scheduler",
    "description": "Creates a controllable job scheduler for one-off and interval tasks.",
    "signature": "createJobScheduler()",
    "example": "createJobScheduler(...)",
    "output": "..."
  },
  {
    "id": "scheduleonce",
    "name": "scheduleOnce",
    "module": "Scheduler",
    "description": "Schedules a one-off callback and returns a cancel handle.",
    "signature": "scheduleOnce(delayMs: number, fn: ()",
    "example": "scheduleOnce(...)",
    "output": "..."
  },
  {
    "id": "scheduleinterval",
    "name": "scheduleInterval",
    "module": "Scheduler",
    "description": "Schedules a recurring interval callback and returns a cancel handle.",
    "signature": "scheduleInterval(intervalMs: number, fn: ()",
    "example": "scheduleInterval(...)",
    "output": "..."
  },
  {
    "id": "canceljob",
    "name": "cancelJob",
    "module": "Scheduler",
    "description": "Cancels a job by ID on a scheduler instance.",
    "signature": "cancelJob(scheduler: ReturnType<typeof createJobScheduler>, id: string): boolean",
    "example": "cancelJob(...)",
    "output": "..."
  },
  {
    "id": "pausescheduler",
    "name": "pauseScheduler",
    "module": "Scheduler",
    "description": "Pauses a scheduler instance.",
    "signature": "pauseScheduler(scheduler: ReturnType<typeof createJobScheduler>): void",
    "example": "pauseScheduler(...)",
    "output": "..."
  },
  {
    "id": "resumescheduler",
    "name": "resumeScheduler",
    "module": "Scheduler",
    "description": "Resumes a scheduler instance.",
    "signature": "resumeScheduler(scheduler: ReturnType<typeof createJobScheduler>): void",
    "example": "resumeScheduler(...)",
    "output": "..."
  },
  {
    "id": "createdeadletterqueue",
    "name": "createDeadLetterQueue",
    "module": "Scheduler",
    "description": "Creates a Dead-Letter Queue (DLQ) for capturing and replaying failed payloads.",
    "signature": "createDeadLetterQueue<T>()",
    "example": "createDeadLetterQueue(...)",
    "output": "..."
  },
  {
    "id": "createcircuitbreaker",
    "name": "createCircuitBreaker",
    "module": "Scheduler",
    "description": "Creates a Circuit Breaker protecting async calls from cascading failures.",
    "signature": "createCircuitBreaker(options",
    "example": "createCircuitBreaker(...)",
    "output": "..."
  },
  {
    "id": "createbulkhead",
    "name": "createBulkhead",
    "module": "Scheduler",
    "description": "Creates a Bulkhead isolator limiting concurrent executions and queue depth.",
    "signature": "createBulkhead(maxConcurrent: number, maxQueue",
    "example": "createBulkhead(...)",
    "output": "..."
  },
  {
    "id": "createsemaphore",
    "name": "createSemaphore",
    "module": "Scheduler",
    "description": "Creates a counting Semaphore for async resource pooling.",
    "signature": "createSemaphore(permits: number)",
    "example": "createSemaphore(...)",
    "output": "..."
  },
  {
    "id": "createmutex",
    "name": "createMutex",
    "module": "Scheduler",
    "description": "Creates a binary Mutex lock for mutual exclusion.",
    "signature": "createMutex()",
    "example": "createMutex(...)",
    "output": "..."
  },
  {
    "id": "createbarrier",
    "name": "createBarrier",
    "module": "Scheduler",
    "description": "Creates a reusable synchronization Barrier for `parties` async participants.",
    "signature": "createBarrier(parties: number)",
    "example": "createBarrier(...)",
    "output": "..."
  },
  {
    "id": "createcountdownlatch",
    "name": "createCountDownLatch",
    "module": "Scheduler",
    "description": "Creates a CountDownLatch that resolves once `countDown()` is called `count` times.",
    "signature": "createCountDownLatch(count: number)",
    "example": "createCountDownLatch(...)",
    "output": "..."
  },
  {
    "id": "deferpromise",
    "name": "deferPromise",
    "module": "Scheduler",
    "description": "Creates a deferred promise with externally exposed `resolve` and `reject`.",
    "signature": "deferPromise<T>()",
    "example": "deferPromise(...)",
    "output": "..."
  },
  {
    "id": "withtimeout",
    "name": "withTimeout",
    "module": "Scheduler",
    "description": "Wraps a promise with a timeout rejection after `ms` milliseconds.",
    "signature": "withTimeout<T>(promise: Promise<T>, ms: number, message",
    "example": "withTimeout(...)",
    "output": "..."
  },
  {
    "id": "timeoutpromise",
    "name": "timeoutPromise",
    "module": "Scheduler",
    "description": "Creates a promise that resolves after `ms` unless cancelled.",
    "signature": "timeoutPromise(ms: number): Promise<void>",
    "example": "timeoutPromise(...)",
    "output": "..."
  },
  {
    "id": "cancellablepromise",
    "name": "cancellablePromise",
    "module": "Scheduler",
    "description": "Wraps an async factory with cancellation support via AbortController-like handle.",
    "signature": "cancellablePromise<T>( executor: (isCancelled: ()",
    "example": "cancellablePromise(...)",
    "output": "..."
  },
  {
    "id": "coalescecalls",
    "name": "coalesceCalls",
    "module": "Scheduler",
    "description": "Coalesces concurrent calls with the same key into a single shared in-flight Promise.",
    "signature": "coalesceCalls<Args extends unknown[], R>( fn: (...args: Args)",
    "example": "coalesceCalls(...)",
    "output": "..."
  },
  {
    "id": "batchcalls",
    "name": "batchCalls",
    "module": "Scheduler",
    "description": "Batches individual async calls made within `windowMs` into a single bulk invocation.",
    "signature": "batchCalls<T, R>( batchFn: (items: T[])",
    "example": "batchCalls(...)",
    "output": "..."
  },
  {
    "id": "debounceasync",
    "name": "debounceAsync",
    "module": "Scheduler",
    "description": "Debounces an async function, resolving all callers in the window with the latest result.",
    "signature": "debounceAsync<Args extends unknown[], R>( fn: (...args: Args)",
    "example": "debounceAsync(...)",
    "output": "..."
  },
  {
    "id": "throttleasync",
    "name": "throttleAsync",
    "module": "Scheduler",
    "description": "Throttles an async function so it executes at most once per `intervalMs`.",
    "signature": "throttleAsync<Args extends unknown[], R>( fn: (...args: Args)",
    "example": "throttleAsync(...)",
    "output": "..."
  },
  {
    "id": "s",
    "name": "s",
    "module": "Schema-infer",
    "description": "OptiKit Schema Infer — Zero-dependency runtime schema validator with static TypeScript type inference.",
    "signature": "s",
    "example": "s(...)",
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
    "signature": "custom(fn: (val: any)",
    "example": "custom(...)",
    "output": "..."
  },
  {
    "id": "linearsearch",
    "name": "linearSearch",
    "module": "Search",
    "description": "Linear search: finds the index of the first matching element.",
    "signature": "linearSearch<T>(arr: T[], target: T, compare: CompareFn<T>",
    "example": "linearSearch(...)",
    "output": "..."
  },
  {
    "id": "binarysearch",
    "name": "binarySearch",
    "module": "Search",
    "description": "Binary search: efficiently finds the index of the target in a SORTED array.",
    "signature": "binarySearch<T>(arr: T[], target: T, compare: CompareFn<T>",
    "example": "binarySearch(...)",
    "output": "..."
  },
  {
    "id": "jumpsearch",
    "name": "jumpSearch",
    "module": "Search",
    "description": "Jump search: finds the index of the target in a SORTED array using block jumps.",
    "signature": "jumpSearch<T>(arr: T[], target: T, compare: CompareFn<T>",
    "example": "jumpSearch(...)",
    "output": "..."
  },
  {
    "id": "exponentialsearch",
    "name": "exponentialSearch",
    "module": "Search",
    "description": "Exponential search: finds the index of the target in a SORTED array.",
    "signature": "exponentialSearch<T>(arr: T[], target: T, compare: CompareFn<T>",
    "example": "exponentialSearch(...)",
    "output": "..."
  },
  {
    "id": "interpolationsearch",
    "name": "interpolationSearch",
    "module": "Search",
    "description": "Interpolation search: finds the index of a number in a uniformly distributed SORTED array.",
    "signature": "interpolationSearch(arr: number[], target: number): number",
    "example": "interpolationSearch(...)",
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
    "id": "unionofsets",
    "name": "unionOfSets",
    "module": "Set",
    "description": "Creates a new set containing elements present in either set A or set B.",
    "signature": "unionOfSets<T>(a: Set<T>, b: Set<T>): Set<T>",
    "example": "unionOfSets(...)",
    "output": "..."
  },
  {
    "id": "intersectionofsets",
    "name": "intersectionOfSets",
    "module": "Set",
    "description": "Creates a new set containing elements present in both set A and set B.",
    "signature": "intersectionOfSets<T>(a: Set<T>, b: Set<T>): Set<T>",
    "example": "intersectionOfSets(...)",
    "output": "..."
  },
  {
    "id": "differenceofsets",
    "name": "differenceOfSets",
    "module": "Set",
    "description": "Creates a new set containing elements present in set A but not in set B.",
    "signature": "differenceOfSets<T>(a: Set<T>, b: Set<T>): Set<T>",
    "example": "differenceOfSets(...)",
    "output": "..."
  },
  {
    "id": "setsymmetricdifference",
    "name": "setSymmetricDifference",
    "module": "Set",
    "description": "Creates a new set containing elements present in either set A or set B, but not both.",
    "signature": "setSymmetricDifference<T>(a: Set<T>, b: Set<T>): Set<T>",
    "example": "setSymmetricDifference(...)",
    "output": "..."
  },
  {
    "id": "issetsubset",
    "name": "isSetSubset",
    "module": "Set",
    "description": "Checks if set A is a subset of set B (all elements of A are in B).",
    "signature": "isSetSubset<T>(a: Set<T>, b: Set<T>): boolean",
    "example": "isSetSubset(...)",
    "output": "..."
  },
  {
    "id": "issetsuperset",
    "name": "isSetSuperset",
    "module": "Set",
    "description": "Checks if set A is a superset of set B (all elements of B are in A).",
    "signature": "isSetSuperset<T>(a: Set<T>, b: Set<T>): boolean",
    "example": "isSetSuperset(...)",
    "output": "..."
  },
  {
    "id": "isdisjoint",
    "name": "isDisjoint",
    "module": "Set",
    "description": "Checks if set A and set B have no elements in common.",
    "signature": "isDisjoint<T>(a: Set<T>, b: Set<T>): boolean",
    "example": "isDisjoint(...)",
    "output": "..."
  },
  {
    "id": "mapset",
    "name": "mapSet",
    "module": "Set",
    "description": "Maps over a set to produce a new set.",
    "signature": "mapSet<T, U>(set: Set<T>, mapper: (item: T)",
    "example": "mapSet(...)",
    "output": "..."
  },
  {
    "id": "filterset",
    "name": "filterSet",
    "module": "Set",
    "description": "Filters a set to produce a new set.",
    "signature": "filterSet<T>(set: Set<T>, predicate: (item: T)",
    "example": "filterSet(...)",
    "output": "..."
  },
  {
    "id": "cartesianproduct",
    "name": "cartesianProduct",
    "module": "Set",
    "description": "Creates the Cartesian product of two sets.",
    "signature": "cartesianProduct<T, U>(a: Set<T>, b: Set<U>): Set<[T, U]>",
    "example": "cartesianProduct(...)",
    "output": "..."
  },
  {
    "id": "batch",
    "name": "batch",
    "module": "Signals",
    "description": "OptiKit Signals — Zero-dependency, ultra-lightweight, and fine-grained reactive state primitive.",
    "signature": "batch<T>(fn: ()",
    "example": "```ts\nbatch(() => {\ncount.set(1);\ncount.set(2);\n});\n```",
    "output": "effects fire only once after the batch finishes"
  },
  {
    "id": "untrack",
    "name": "untrack",
    "module": "Signals",
    "description": "Runs a function without tracking any signal access as dependencies.",
    "signature": "untrack<T>(fn: ()",
    "example": "```ts\nconst value = untrack(() => mySignal.value);\n```",
    "output": "..."
  },
  {
    "id": "issignal",
    "name": "isSignal",
    "module": "Signals",
    "description": "Checks whether a given value is an OptiKit Signal.",
    "signature": "isSignal(val: unknown): val is Signal<any> | ReadonlySignal<any>",
    "example": "isSignal(...)",
    "output": "..."
  },
  {
    "id": "signal",
    "name": "signal",
    "module": "Signals",
    "description": "Creates a reactive signal holding a mutable state value.",
    "signature": "signal<T>(initialValue: T): Signal<T>",
    "example": "```ts\nconst count = signal(0);\ncount.value++; // or count.set(1)\n```",
    "output": "1"
  },
  {
    "id": "computed",
    "name": "computed",
    "module": "Signals",
    "description": "Creates a memoized computed signal derived from other signals.",
    "signature": "computed<T>(fn: ()",
    "example": "```ts\nconst count = signal(2);\nconst double = computed(() => count.value * 2);\nconsole.log(double.value);\n```",
    "output": "4"
  },
  {
    "id": "effect",
    "name": "effect",
    "module": "Signals",
    "description": "Creates a reactive effect that runs immediately and re-executes whenever",
    "signature": "effect(fn: EffectFn): ()",
    "example": "```ts\nconst count = signal(0);\nconst stop = effect(() => {\nconsole.log('Count changed:', count.value);\n});\ncount.value++; // logs \"Count changed: 1\"\nstop(); // cleans up effect\n```",
    "output": "..."
  },
  {
    "id": "bubblesort",
    "name": "bubbleSort",
    "module": "Sort",
    "description": "Bubble Sort algorithm.",
    "signature": "bubbleSort<T>(arr: T[], compare: CompareFn<T>",
    "example": "bubbleSort(...)",
    "output": "..."
  },
  {
    "id": "selectionsort",
    "name": "selectionSort",
    "module": "Sort",
    "description": "Selection Sort algorithm.",
    "signature": "selectionSort<T>(arr: T[], compare: CompareFn<T>",
    "example": "selectionSort(...)",
    "output": "..."
  },
  {
    "id": "insertionsort",
    "name": "insertionSort",
    "module": "Sort",
    "description": "Insertion Sort algorithm.",
    "signature": "insertionSort<T>(arr: T[], compare: CompareFn<T>",
    "example": "insertionSort(...)",
    "output": "..."
  },
  {
    "id": "mergesort",
    "name": "mergeSort",
    "module": "Sort",
    "description": "Merge Sort algorithm.",
    "signature": "mergeSort<T>(arr: T[], compare: CompareFn<T>",
    "example": "mergeSort(...)",
    "output": "..."
  },
  {
    "id": "quicksort",
    "name": "quickSort",
    "module": "Sort",
    "description": "Quick Sort algorithm.",
    "signature": "quickSort<T>(arr: T[], compare: CompareFn<T>",
    "example": "quickSort(...)",
    "output": "..."
  },
  {
    "id": "heapsort",
    "name": "heapSort",
    "module": "Sort",
    "description": "Heap Sort algorithm.",
    "signature": "heapSort<T>(arr: T[], compare: CompareFn<T>",
    "example": "heapSort(...)",
    "output": "..."
  },
  {
    "id": "issorted",
    "name": "isSorted",
    "module": "Sort",
    "description": "Check if array is sorted.",
    "signature": "isSorted<T>(arr: T[], compare: CompareFn<T>",
    "example": "isSorted(...)",
    "output": "..."
  },
  {
    "id": "createaabb",
    "name": "createAABB",
    "module": "Spatial",
    "description": "OptiKit Spatial — 2D Quadtree, AABB/OBB/Ray collisions, Geo (Haversine/Vincenty/Bearing),",
    "signature": "createAABB(minX: number, minY: number, maxX: number, maxY: number): AABB",
    "example": "createAABB(...)",
    "output": "..."
  },
  {
    "id": "aabbintersects",
    "name": "aabbIntersects",
    "module": "Spatial",
    "description": "Checks if two AABBs intersect.",
    "signature": "aabbIntersects(a: AABB, b: AABB): boolean",
    "example": "aabbIntersects(...)",
    "output": "..."
  },
  {
    "id": "aabbcontains",
    "name": "aabbContains",
    "module": "Spatial",
    "description": "Checks if an AABB contains a point or another AABB.",
    "signature": "aabbContains(box: AABB, target: Point2D | AABB): boolean",
    "example": "aabbContains(...)",
    "output": "..."
  },
  {
    "id": "aabbunion",
    "name": "aabbUnion",
    "module": "Spatial",
    "description": "Returns the smallest AABB enclosing both `a` and `b`.",
    "signature": "aabbUnion(a: AABB, b: AABB): AABB",
    "example": "aabbUnion(...)",
    "output": "..."
  },
  {
    "id": "aabbexpand",
    "name": "aabbExpand",
    "module": "Spatial",
    "description": "Expands an AABB uniformly by `margin`.",
    "signature": "aabbExpand(box: AABB, margin: number): AABB",
    "example": "aabbExpand(...)",
    "output": "..."
  },
  {
    "id": "createquadtree",
    "name": "createQuadtree",
    "module": "Spatial",
    "description": "Creates a 2D Quadtree for fast spatial range and nearest-neighbor queries.",
    "signature": "createQuadtree<T",
    "example": "createQuadtree(...)",
    "output": "..."
  },
  {
    "id": "quadtreeinsert",
    "name": "quadtreeInsert",
    "module": "Spatial",
    "description": "Inserts a point item into a Quadtree.",
    "signature": "quadtreeInsert<T>(node: QuadtreeNode<T>, item: QuadtreeItem<T>): boolean",
    "example": "quadtreeInsert(...)",
    "output": "..."
  },
  {
    "id": "quadtreequery",
    "name": "quadtreeQuery",
    "module": "Spatial",
    "description": "Queries all items inside `range` AABB from the Quadtree.",
    "signature": "quadtreeQuery<T>(node: QuadtreeNode<T>, range: AABB, found: QuadtreeItem<T>[]",
    "example": "quadtreeQuery(...)",
    "output": "..."
  },
  {
    "id": "quadtreenearest",
    "name": "quadtreeNearest",
    "module": "Spatial",
    "description": "Finds the nearest item in the Quadtree to `target` within optional `maxRadius`.",
    "signature": "quadtreeNearest<T>( node: QuadtreeNode<T>, target: Point2D, maxRadius",
    "example": "quadtreeNearest(...)",
    "output": "..."
  },
  {
    "id": "obbintersects",
    "name": "obbIntersects",
    "module": "Spatial",
    "description": "Checks if two 2D Oriented Bounding Boxes (OBB) intersect via Separating Axis Theorem.",
    "signature": "obbIntersects( a",
    "example": "obbIntersects(...)",
    "output": "..."
  },
  {
    "id": "circleintersectsaabb",
    "name": "circleIntersectsAABB",
    "module": "Spatial",
    "description": "Checks if a circle intersects an AABB.",
    "signature": "circleIntersectsAABB(cx: number, cy: number, radius: number, box: AABB): boolean",
    "example": "circleIntersectsAABB(...)",
    "output": "..."
  },
  {
    "id": "rayintersectsaabb",
    "name": "rayIntersectsAABB",
    "module": "Spatial",
    "description": "Checks if a 2D ray intersects an AABB (slab method), returning hit distance or `null`.",
    "signature": "rayIntersectsAABB( origin: Point2D, dir: Point2D, box: AABB ): number | null",
    "example": "rayIntersectsAABB(...)",
    "output": "..."
  },
  {
    "id": "rayintersectscircle",
    "name": "rayIntersectsCircle",
    "module": "Spatial",
    "description": "Checks if a 2D ray intersects a circle, returning hit distance or `null`.",
    "signature": "rayIntersectsCircle( origin: Point2D, dir: Point2D, center: Point2D, radius: number ): number | null",
    "example": "rayIntersectsCircle(...)",
    "output": "..."
  },
  {
    "id": "haversinedistance",
    "name": "haversineDistance",
    "module": "Spatial",
    "description": "Computes great-circle distance in meters using the Haversine formula.",
    "signature": "haversineDistance(a: GeoCoord, b: GeoCoord): number",
    "example": "haversineDistance(...)",
    "output": "..."
  },
  {
    "id": "vincentydistance",
    "name": "vincentyDistance",
    "module": "Spatial",
    "description": "Computes ellipsoidal distance in meters using Vincenty's inverse formula (WGS84).",
    "signature": "vincentyDistance(a: GeoCoord, b: GeoCoord): number",
    "example": "vincentyDistance(...)",
    "output": "..."
  },
  {
    "id": "geobearing",
    "name": "geoBearing",
    "module": "Spatial",
    "description": "Computes initial compass bearing in degrees `[0, 360)` from `a` to `b`.",
    "signature": "geoBearing(a: GeoCoord, b: GeoCoord): number",
    "example": "geoBearing(...)",
    "output": "..."
  },
  {
    "id": "geodestination",
    "name": "geoDestination",
    "module": "Spatial",
    "description": "Computes destination coordinate given start, bearing (degrees), and distance (meters).",
    "signature": "geoDestination(start: GeoCoord, bearingDeg: number, distanceM: number): GeoCoord",
    "example": "geoDestination(...)",
    "output": "..."
  },
  {
    "id": "geomidpoint",
    "name": "geoMidpoint",
    "module": "Spatial",
    "description": "Computes the geographic midpoint between two coordinates.",
    "signature": "geoMidpoint(a: GeoCoord, b: GeoCoord): GeoCoord",
    "example": "geoMidpoint(...)",
    "output": "..."
  },
  {
    "id": "geoboundingbox",
    "name": "geoBoundingBox",
    "module": "Spatial",
    "description": "Computes the bounding box around a list of geographic coordinates.",
    "signature": "geoBoundingBox(coords: readonly GeoCoord[])",
    "example": "geoBoundingBox(...)",
    "output": "..."
  },
  {
    "id": "spatialpointinpolygon",
    "name": "spatialPointInPolygon",
    "module": "Spatial",
    "description": "Ray-casting point-in-polygon check for 2D polygons.",
    "signature": "spatialPointInPolygon(point: Point2D, polygon: readonly Point2D[]): boolean",
    "example": "spatialPointInPolygon(...)",
    "output": "..."
  },
  {
    "id": "spatialpolygonarea",
    "name": "spatialPolygonArea",
    "module": "Spatial",
    "description": "Computes the unsigned area of a 2D polygon using the Shoelace formula.",
    "signature": "spatialPolygonArea(polygon: readonly Point2D[]): number",
    "example": "spatialPolygonArea(...)",
    "output": "..."
  },
  {
    "id": "spatialpolygoncentroid",
    "name": "spatialPolygonCentroid",
    "module": "Spatial",
    "description": "Computes the centroid of a 2D polygon.",
    "signature": "spatialPolygonCentroid(polygon: readonly Point2D[]): Point2D",
    "example": "spatialPolygonCentroid(...)",
    "output": "..."
  },
  {
    "id": "convexhull2d",
    "name": "convexHull2D",
    "module": "Spatial",
    "description": "Computes the 2D convex hull using Andrew's monotone chain algorithm.",
    "signature": "convexHull2D(points: readonly Point2D[]): Point2D[]",
    "example": "convexHull2D(...)",
    "output": "..."
  },
  {
    "id": "douglaspeucker",
    "name": "douglasPeucker",
    "module": "Spatial",
    "description": "Simplifies a 2D polyline using the Ramer-Douglas-Peucker algorithm.",
    "signature": "douglasPeucker(points: readonly Point2D[], epsilon: number): Point2D[]",
    "example": "douglasPeucker(...)",
    "output": "..."
  },
  {
    "id": "mortonencode",
    "name": "mortonEncode",
    "module": "Spatial",
    "description": "Encodes two 16-bit unsigned integers `(x, y)` into a 32-bit Morton Z-order code.",
    "signature": "mortonEncode(x: number, y: number): number",
    "example": "mortonEncode(...)",
    "output": "..."
  },
  {
    "id": "mortondecode",
    "name": "mortonDecode",
    "module": "Spatial",
    "description": "Decodes a 32-bit Morton Z-order code back into `{ x, y }`.",
    "signature": "mortonDecode(code: number): Point2D",
    "example": "mortonDecode(...)",
    "output": "..."
  },
  {
    "id": "createstatemachine",
    "name": "createStateMachine",
    "module": "State-machine",
    "description": "OptiKit State Machine — Typed finite state machines & statecharts with guards,",
    "signature": "createStateMachine<TContext, TEvent extends",
    "example": "createStateMachine(...)",
    "output": "..."
  },
  {
    "id": "guardtransition",
    "name": "guardTransition",
    "module": "State-machine",
    "description": "Creates a guarded transition object.",
    "signature": "guardTransition<TContext, TEvent extends",
    "example": "guardTransition(...)",
    "output": "..."
  },
  {
    "id": "withentry",
    "name": "withEntry",
    "module": "State-machine",
    "description": "Attaches an entry hook to a state node config.",
    "signature": "withEntry<TContext, TEvent extends",
    "example": "withEntry(...)",
    "output": "..."
  },
  {
    "id": "withexit",
    "name": "withExit",
    "module": "State-machine",
    "description": "Attaches an exit hook to a state node config.",
    "signature": "withExit<TContext, TEvent extends",
    "example": "withExit(...)",
    "output": "..."
  },
  {
    "id": "interpretmachine",
    "name": "interpretMachine",
    "module": "State-machine",
    "description": "Interprets and runs a state machine definition as a stateful instance.",
    "signature": "interpretMachine<TContext, TEvent extends",
    "example": "interpretMachine(...)",
    "output": "..."
  },
  {
    "id": "canmachinetransition",
    "name": "canMachineTransition",
    "module": "State-machine",
    "description": "Checks if a machine can transition on the given event type.",
    "signature": "canMachineTransition<TContext, TEvent extends",
    "example": "canMachineTransition(...)",
    "output": "..."
  },
  {
    "id": "getvalidevents",
    "name": "getValidEvents",
    "module": "State-machine",
    "description": "Returns all currently valid event names for a machine instance.",
    "signature": "getValidEvents<TContext, TEvent extends",
    "example": "getValidEvents(...)",
    "output": "..."
  },
  {
    "id": "isinstate",
    "name": "isInState",
    "module": "State-machine",
    "description": "Checks whether the machine is currently in the specified state.",
    "signature": "isInState<TContext, TEvent extends",
    "example": "isInState(...)",
    "output": "..."
  },
  {
    "id": "matchesstate",
    "name": "matchesState",
    "module": "State-machine",
    "description": "Checks whether the machine's current state matches any of the given states.",
    "signature": "matchesState<TContext, TEvent extends",
    "example": "matchesState(...)",
    "output": "..."
  },
  {
    "id": "assertvalidstate",
    "name": "assertValidState",
    "module": "State-machine",
    "description": "Asserts that a machine is in an expected state, throwing if not.",
    "signature": "assertValidState<TContext, TEvent extends",
    "example": "assertValidState(...)",
    "output": "..."
  },
  {
    "id": "serializemachine",
    "name": "serializeMachine",
    "module": "State-machine",
    "description": "Serializes a machine snapshot to a JSON string.",
    "signature": "serializeMachine<TContext, TEvent extends",
    "example": "serializeMachine(...)",
    "output": "..."
  },
  {
    "id": "restoremachine",
    "name": "restoreMachine",
    "module": "State-machine",
    "description": "Restores a machine instance from a serialized JSON snapshot.",
    "signature": "restoreMachine<TContext, TEvent extends",
    "example": "restoreMachine(...)",
    "output": "..."
  },
  {
    "id": "visualizemachine",
    "name": "visualizeMachine",
    "module": "State-machine",
    "description": "Generates a Mermaid `stateDiagram-v2` string from a machine definition.",
    "signature": "visualizeMachine<TContext, TEvent extends",
    "example": "visualizeMachine(...)",
    "output": "..."
  },
  {
    "id": "createtogglemachine",
    "name": "createToggleMachine",
    "module": "State-machine",
    "description": "Creates a simple two-state toggle machine (`off` <-> `on`).",
    "signature": "createToggleMachine(initial: 'on' | 'off'",
    "example": "createToggleMachine(...)",
    "output": "..."
  },
  {
    "id": "createasyncmachine",
    "name": "createAsyncMachine",
    "module": "State-machine",
    "description": "Creates a standard async request lifecycle machine (`idle` -> `loading` -> `success` | `error`).",
    "signature": "createAsyncMachine<TData",
    "example": "createAsyncMachine(...)",
    "output": "..."
  },
  {
    "id": "createstepmachine",
    "name": "createStepMachine",
    "module": "State-machine",
    "description": "Creates a linear multi-step wizard machine with `NEXT`, `PREV`, and `RESET`.",
    "signature": "createStepMachine(steps: readonly string[])",
    "example": "createStepMachine(...)",
    "output": "..."
  },
  {
    "id": "createretrymachine",
    "name": "createRetryMachine",
    "module": "State-machine",
    "description": "Creates a retry-aware machine that tracks attempt count up to `maxRetries`.",
    "signature": "createRetryMachine(maxRetries",
    "example": "createRetryMachine(...)",
    "output": "..."
  },
  {
    "id": "parallelstates",
    "name": "parallelStates",
    "module": "State-machine",
    "description": "Coordinates multiple independent state machine instances in parallel.",
    "signature": "parallelStates<T extends Record<string, StateMachineInstance<unknown,",
    "example": "parallelStates(...)",
    "output": "..."
  },
  {
    "id": "samplecovariance",
    "name": "sampleCovariance",
    "module": "Statistics-pro",
    "description": "OptiKit Statistics Pro — Correlation, regression, normalization, outlier detection,",
    "signature": "sampleCovariance(x: readonly number[], y: readonly number[]): number",
    "example": "sampleCovariance(...)",
    "output": "..."
  },
  {
    "id": "pearsoncorrelation",
    "name": "pearsonCorrelation",
    "module": "Statistics-pro",
    "description": "Computes Pearson product-moment correlation coefficient in `[-1, 1]`.",
    "signature": "pearsonCorrelation(x: readonly number[], y: readonly number[]): number",
    "example": "pearsonCorrelation(...)",
    "output": "..."
  },
  {
    "id": "spearmancorrelation",
    "name": "spearmanCorrelation",
    "module": "Statistics-pro",
    "description": "Computes Spearman's rank correlation coefficient.",
    "signature": "spearmanCorrelation(x: readonly number[], y: readonly number[]): number",
    "example": "spearmanCorrelation(...)",
    "output": "..."
  },
  {
    "id": "kendalltau",
    "name": "kendallTau",
    "module": "Statistics-pro",
    "description": "Computes Kendall's Tau-a rank correlation coefficient.",
    "signature": "kendallTau(x: readonly number[], y: readonly number[]): number",
    "example": "kendallTau(...)",
    "output": "..."
  },
  {
    "id": "linearregression",
    "name": "linearRegression",
    "module": "Statistics-pro",
    "description": "Fits a simple linear regression `y = slope * x + intercept` with `r2`.",
    "signature": "linearRegression( x: readonly number[], y: readonly number[] )",
    "example": "linearRegression(...)",
    "output": "..."
  },
  {
    "id": "polynomialregression",
    "name": "polynomialRegression",
    "module": "Statistics-pro",
    "description": "Fits a polynomial regression of `degree` using normal equations (Gaussian elimination).",
    "signature": "polynomialRegression( x: readonly number[], y: readonly number[], degree",
    "example": "polynomialRegression(...)",
    "output": "..."
  },
  {
    "id": "exponentialmovingaverage",
    "name": "exponentialMovingAverage",
    "module": "Statistics-pro",
    "description": "Computes Exponential Moving Average (EMA) over a series.",
    "signature": "exponentialMovingAverage(values: readonly number[], period: number): number[]",
    "example": "exponentialMovingAverage(...)",
    "output": "..."
  },
  {
    "id": "weightedmovingaverage",
    "name": "weightedMovingAverage",
    "module": "Statistics-pro",
    "description": "Computes Weighted Moving Average (WMA) over a series.",
    "signature": "weightedMovingAverage(values: readonly number[], period: number): number[]",
    "example": "weightedMovingAverage(...)",
    "output": "..."
  },
  {
    "id": "zscorevalue",
    "name": "zScoreValue",
    "module": "Statistics-pro",
    "description": "Computes the z-score of a single value given mean and standard deviation.",
    "signature": "zScoreValue(value: number, mean: number, stdDev: number): number",
    "example": "zScoreValue(...)",
    "output": "..."
  },
  {
    "id": "zscorestandardize",
    "name": "zScoreStandardize",
    "module": "Statistics-pro",
    "description": "Standardizes an array to zero mean and unit variance.",
    "signature": "zScoreStandardize(values: readonly number[]): number[]",
    "example": "zScoreStandardize(...)",
    "output": "..."
  },
  {
    "id": "minmaxnormalize",
    "name": "minMaxNormalize",
    "module": "Statistics-pro",
    "description": "Normalizes an array to `[0, 1]` using min-max scaling.",
    "signature": "minMaxNormalize(values: readonly number[]): number[]",
    "example": "minMaxNormalize(...)",
    "output": "..."
  },
  {
    "id": "robustscale",
    "name": "robustScale",
    "module": "Statistics-pro",
    "description": "Scales features using median and interquartile range (robust to outliers).",
    "signature": "robustScale(values: readonly number[]): number[]",
    "example": "robustScale(...)",
    "output": "..."
  },
  {
    "id": "iqroutliers",
    "name": "iqrOutliers",
    "module": "Statistics-pro",
    "description": "Detects outliers using Tukey's `1.5 * IQR` fence rule.",
    "signature": "iqrOutliers(values: readonly number[], factor",
    "example": "iqrOutliers(...)",
    "output": "..."
  },
  {
    "id": "confidenceintervalmean",
    "name": "confidenceIntervalMean",
    "module": "Statistics-pro",
    "description": "Computes an approximate normal confidence interval `[lower, upper]` for the sample mean.",
    "signature": "confidenceIntervalMean( values: readonly number[], zCritical",
    "example": "confidenceIntervalMean(...)",
    "output": "..."
  },
  {
    "id": "ttestonesample",
    "name": "tTestOneSample",
    "module": "Statistics-pro",
    "description": "Performs a one-sample t-test returning the t-statistic and degrees of freedom.",
    "signature": "tTestOneSample( values: readonly number[], populationMean: number )",
    "example": "tTestOneSample(...)",
    "output": "..."
  },
  {
    "id": "ttesttwosample",
    "name": "tTestTwoSample",
    "module": "Statistics-pro",
    "description": "Performs Welch's two-sample t-test returning the t-statistic and approximate df.",
    "signature": "tTestTwoSample( a: readonly number[], b: readonly number[] )",
    "example": "tTestTwoSample(...)",
    "output": "..."
  },
  {
    "id": "chisquaretest",
    "name": "chiSquareTest",
    "module": "Statistics-pro",
    "description": "Computes Pearson's Chi-Square goodness-of-fit statistic.",
    "signature": "chiSquareTest( observed: readonly number[], expected: readonly number[] )",
    "example": "chiSquareTest(...)",
    "output": "..."
  },
  {
    "id": "anovaoneway",
    "name": "anovaOneWay",
    "module": "Statistics-pro",
    "description": "Performs one-way ANOVA returning the F-statistic and between/within degrees of freedom.",
    "signature": "anovaOneWay(groups: readonly (readonly number[])[])",
    "example": "anovaOneWay(...)",
    "output": "..."
  },
  {
    "id": "normalpdf",
    "name": "normalPdf",
    "module": "Statistics-pro",
    "description": "Normal probability density function (PDF).",
    "signature": "normalPdf(x: number, mean",
    "example": "normalPdf(...)",
    "output": "..."
  },
  {
    "id": "normalcdf",
    "name": "normalCdf",
    "module": "Statistics-pro",
    "description": "Normal cumulative distribution function (CDF).",
    "signature": "normalCdf(x: number, mean",
    "example": "normalCdf(...)",
    "output": "..."
  },
  {
    "id": "normalinvcdf",
    "name": "normalInvCdf",
    "module": "Statistics-pro",
    "description": "Inverse standard normal CDF (Acklam's rational approximation).",
    "signature": "normalInvCdf(p: number): number",
    "example": "normalInvCdf(...)",
    "output": "..."
  },
  {
    "id": "poissonpmf",
    "name": "poissonPmf",
    "module": "Statistics-pro",
    "description": "Poisson probability mass function (PMF).",
    "signature": "poissonPmf(k: number, lambda: number): number",
    "example": "poissonPmf(...)",
    "output": "..."
  },
  {
    "id": "binomialpmf",
    "name": "binomialPmf",
    "module": "Statistics-pro",
    "description": "Binomial probability mass function (PMF).",
    "signature": "binomialPmf(k: number, n: number, p: number): number",
    "example": "binomialPmf(...)",
    "output": "..."
  },
  {
    "id": "exponentialpdf",
    "name": "exponentialPdf",
    "module": "Statistics-pro",
    "description": "Exponential probability density function (PDF).",
    "signature": "exponentialPdf(x: number, rate: number): number",
    "example": "exponentialPdf(...)",
    "output": "..."
  },
  {
    "id": "shannonentropy",
    "name": "shannonEntropy",
    "module": "Statistics-pro",
    "description": "Computes Shannon entropy (base 2) of a discrete probability distribution.",
    "signature": "shannonEntropy(probs: readonly number[]): number",
    "example": "shannonEntropy(...)",
    "output": "..."
  },
  {
    "id": "kldivergence",
    "name": "klDivergence",
    "module": "Statistics-pro",
    "description": "Computes Kullback-Leibler divergence `D_KL(P || Q)` in bits.",
    "signature": "klDivergence(p: readonly number[], q: readonly number[]): number",
    "example": "klDivergence(...)",
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
    "signature": "variance(nums: number[], population",
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
    "signature": "zScore(value: number, nums: number[], population",
    "example": "zScore(...)",
    "output": "..."
  },
  {
    "id": "covariance",
    "name": "covariance",
    "module": "Statistics",
    "description": "Calculates the covariance between two equally-sized arrays of numbers.",
    "signature": "covariance(nums1: number[], nums2: number[], population",
    "example": "covariance(...)",
    "output": "..."
  },
  {
    "id": "correlation",
    "name": "correlation",
    "module": "Statistics",
    "description": "Calculates the Pearson correlation coefficient between two arrays.",
    "signature": "correlation(nums1: number[], nums2: number[], population",
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
    "id": "safestorage",
    "name": "safeStorage",
    "module": "Storage",
    "description": "An isomorphic wrapper for LocalStorage and SessionStorage supporting JSON serialization,",
    "signature": "safeStorage",
    "example": "safeStorage(...)",
    "output": "..."
  },
  {
    "id": "createstore",
    "name": "createStore",
    "module": "Store",
    "description": "Store & State Management Module",
    "signature": "createStore<T extends Record<string, any>>(initialState: T): Store<T>",
    "example": "```ts\nconst store = createStore({ count: 0 });\nstore.setState({ count: 1 });\nstore.getState();\n```",
    "output": "{ count: 1 }"
  },
  {
    "id": "reversestring",
    "name": "reverseString",
    "module": "String-extended",
    "description": "Reverses a string.",
    "signature": "reverseString(str: string): string",
    "example": "reverseString(...)",
    "output": "..."
  },
  {
    "id": "isstringpalindrome",
    "name": "isStringPalindrome",
    "module": "String-extended",
    "description": "Checks if a string is a palindrome.",
    "signature": "isStringPalindrome(str: string): boolean",
    "example": "isStringPalindrome(...)",
    "output": "..."
  },
  {
    "id": "isanagram",
    "name": "isAnagram",
    "module": "String-extended",
    "description": "Checks if two strings are anagrams of each other.",
    "signature": "isAnagram(str1: string, str2: string): boolean",
    "example": "isAnagram(...)",
    "output": "..."
  },
  {
    "id": "countwords",
    "name": "countWords",
    "module": "String-extended",
    "description": "Counts the number of words in a string.",
    "signature": "countWords(str: string): number",
    "example": "countWords(...)",
    "output": "..."
  },
  {
    "id": "countlines",
    "name": "countLines",
    "module": "String-extended",
    "description": "Counts the number of lines in a string.",
    "signature": "countLines(str: string): number",
    "example": "countLines(...)",
    "output": "..."
  },
  {
    "id": "masktext",
    "name": "maskText",
    "module": "String-extended",
    "description": "Masks characters in a string, leaving a specified number of characters unmasked.",
    "signature": "maskText(str: string, maskChar",
    "example": "maskText(...)",
    "output": "..."
  },
  {
    "id": "padcenter",
    "name": "padCenter",
    "module": "String-extended",
    "description": "Pads a string on both sides to a specified length.",
    "signature": "padCenter(str: string, length: number, padChar",
    "example": "padCenter(...)",
    "output": "..."
  },
  {
    "id": "wraptext",
    "name": "wrapText",
    "module": "String-extended",
    "description": "Wraps text to a specified width.",
    "signature": "wrapText(str: string, width: number): string",
    "example": "wrapText(...)",
    "output": "..."
  },
  {
    "id": "tosnakecase",
    "name": "toSnakeCase",
    "module": "String-extended",
    "description": "Converts a string to snake_case.",
    "signature": "toSnakeCase(str: string): string",
    "example": "toSnakeCase(...)",
    "output": "..."
  },
  {
    "id": "tokebabcase",
    "name": "toKebabCase",
    "module": "String-extended",
    "description": "Converts a string to kebab-case.",
    "signature": "toKebabCase(str: string): string",
    "example": "toKebabCase(...)",
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
    "signature": "repeat(str: string, count: number, separator",
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
    "signature": "mask( str: string, maskChar",
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
    "id": "escaperegexp",
    "name": "escapeRegExp",
    "module": "String",
    "description": "Escapes special characters in a string for use in a regular expression.",
    "signature": "escapeRegExp(str: string): string",
    "example": "escapeRegExp(...)",
    "output": "..."
  },
  {
    "id": "createcounter",
    "name": "createCounter",
    "module": "Telemetry",
    "description": "OptiKit Telemetry — Metrics (Counter, Gauge, Histogram, Summary, Prometheus export),",
    "signature": "createCounter(name: string, initial",
    "example": "createCounter(...)",
    "output": "..."
  },
  {
    "id": "creategauge",
    "name": "createGauge",
    "module": "Telemetry",
    "description": "Creates a Gauge metric that can go up or down.",
    "signature": "createGauge(name: string, initial",
    "example": "createGauge(...)",
    "output": "..."
  },
  {
    "id": "createhistogram",
    "name": "createHistogram",
    "module": "Telemetry",
    "description": "Creates a bucketed Histogram metric.",
    "signature": "createHistogram( name: string, buckets: readonly number[]",
    "example": "createHistogram(...)",
    "output": "..."
  },
  {
    "id": "percentilefrombuckets",
    "name": "percentileFromBuckets",
    "module": "Telemetry",
    "description": "Estimates a quantile `p` (`0..1`) from a cumulative histogram bucket map.",
    "signature": "percentileFromBuckets( buckets: Record<string, number>, p: number ): number",
    "example": "percentileFromBuckets(...)",
    "output": "..."
  },
  {
    "id": "createsummary",
    "name": "createSummary",
    "module": "Telemetry",
    "description": "Creates a streaming Summary metric computing exact quantiles over a sliding window.",
    "signature": "createSummary(name: string, maxSamples",
    "example": "createSummary(...)",
    "output": "..."
  },
  {
    "id": "createmetricsregistry",
    "name": "createMetricsRegistry",
    "module": "Telemetry",
    "description": "Creates a central Metrics Registry.",
    "signature": "createMetricsRegistry(): MetricsRegistry",
    "example": "createMetricsRegistry(...)",
    "output": "..."
  },
  {
    "id": "exportprometheustext",
    "name": "exportPrometheusText",
    "module": "Telemetry",
    "description": "Formats all metrics in a registry to Prometheus exposition text format.",
    "signature": "exportPrometheusText(registry: MetricsRegistry): string",
    "example": "exportPrometheusText(...)",
    "output": "..."
  },
  {
    "id": "formattraceid",
    "name": "formatTraceId",
    "module": "Telemetry",
    "description": "Formats a random hex ID of `bytes` length (16 bytes = 32 hex chars for W3C traceId).",
    "signature": "formatTraceId(bytes",
    "example": "formatTraceId(...)",
    "output": "..."
  },
  {
    "id": "createspan",
    "name": "createSpan",
    "module": "Telemetry",
    "description": "Creates a distributed tracing Span.",
    "signature": "createSpan( name: string, traceId",
    "example": "createSpan(...)",
    "output": "..."
  },
  {
    "id": "starttrace",
    "name": "startTrace",
    "module": "Telemetry",
    "description": "Starts a new root trace and returns the root span + child-span factory.",
    "signature": "startTrace(rootName: string)",
    "example": "startTrace(...)",
    "output": "..."
  },
  {
    "id": "injecttracecontext",
    "name": "injectTraceContext",
    "module": "Telemetry",
    "description": "Injects a span into a W3C `traceparent` header map.",
    "signature": "injectTraceContext( span: TraceSpan, headers: Record<string, string>",
    "example": "injectTraceContext(...)",
    "output": "..."
  },
  {
    "id": "extracttracecontext",
    "name": "extractTraceContext",
    "module": "Telemetry",
    "description": "Extracts `traceId` and `spanId` from a W3C `traceparent` header.",
    "signature": "extractTraceContext( headers: Record<string, string | undefined> )",
    "example": "extractTraceContext(...)",
    "output": "..."
  },
  {
    "id": "createhealthcheck",
    "name": "createHealthCheck",
    "module": "Telemetry",
    "description": "Creates a named health check descriptor.",
    "signature": "createHealthCheck(name: string, check: HealthCheckFn)",
    "example": "createHealthCheck(...)",
    "output": "..."
  },
  {
    "id": "runhealthchecks",
    "name": "runHealthChecks",
    "module": "Telemetry",
    "description": "Runs multiple health checks concurrently and returns an aggregate status report.",
    "signature": "runHealthChecks( checks: readonly",
    "example": "runHealthChecks(...)",
    "output": "..."
  },
  {
    "id": "createprofiler",
    "name": "createProfiler",
    "module": "Telemetry",
    "description": "Creates a multi-mark performance profiler.",
    "signature": "createProfiler()",
    "example": "createProfiler(...)",
    "output": "..."
  },
  {
    "id": "measuresync",
    "name": "measureSync",
    "module": "Telemetry",
    "description": "Measures synchronous execution duration and returns `{ result, durationMs }`.",
    "signature": "measureSync<T>(fn: ()",
    "example": "measureSync(...)",
    "output": "..."
  },
  {
    "id": "measureasync",
    "name": "measureAsync",
    "module": "Telemetry",
    "description": "Measures asynchronous execution duration and returns `{ result, durationMs }`.",
    "signature": "measureAsync<T>(fn: ()",
    "example": "measureAsync(...)",
    "output": "..."
  },
  {
    "id": "createringlogbuffer",
    "name": "createRingLogBuffer",
    "module": "Telemetry",
    "description": "Creates a fixed-capacity ring buffer for in-memory structured logs.",
    "signature": "createRingLogBuffer<T",
    "example": "createRingLogBuffer(...)",
    "output": "..."
  },
  {
    "id": "createaudittrail",
    "name": "createAuditTrail",
    "module": "Telemetry",
    "description": "Creates an append-only Audit Trail recording actor, action, resource, and timestamp.",
    "signature": "createAuditTrail<TMeta",
    "example": "createAuditTrail(...)",
    "output": "..."
  },
  {
    "id": "redactfields",
    "name": "redactFields",
    "module": "Telemetry",
    "description": "Recursively redacts sensitive keys (e.g. `password`, `token`, `secret`) from an object.",
    "signature": "redactFields<T>( input: T, sensitiveKeys: readonly string[]",
    "example": "redactFields(...)",
    "output": "..."
  },
  {
    "id": "trackeventrate",
    "name": "trackEventRate",
    "module": "Telemetry",
    "description": "Tracks event timestamps to compute events-per-second over a sliding window.",
    "signature": "trackEventRate(windowMs",
    "example": "trackEventRate(...)",
    "output": "..."
  },
  {
    "id": "movingwindowcounter",
    "name": "movingWindowCounter",
    "module": "Telemetry",
    "description": "Creates a sliding-window counter returning event count in the last `windowMs`.",
    "signature": "movingWindowCounter(windowMs",
    "example": "movingWindowCounter(...)",
    "output": "..."
  },
  {
    "id": "createalertevaluator",
    "name": "createAlertEvaluator",
    "module": "Telemetry",
    "description": "Evaluates threshold alert rules against metric values.",
    "signature": "createAlertEvaluator(rules: readonly",
    "example": "createAlertEvaluator(...)",
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
    "signature": "compile( template: string ): (data: Record<string, any>)",
    "example": "compile(...)",
    "output": "..."
  },
  {
    "id": "levenshteindist",
    "name": "levenshteinDist",
    "module": "Text-pro",
    "description": "OptiKit Text Pro — String similarity metrics (Levenshtein, Damerau-Levenshtein,",
    "signature": "levenshteinDist(a: string, b: string): number",
    "example": "levenshteinDist(...)",
    "output": "..."
  },
  {
    "id": "dameraulevenshtein",
    "name": "damerauLevenshtein",
    "module": "Text-pro",
    "description": "Computes Optimal String Alignment (Damerau-Levenshtein) distance with transpositions.",
    "signature": "damerauLevenshtein(a: string, b: string): number",
    "example": "damerauLevenshtein(...)",
    "output": "..."
  },
  {
    "id": "jarowinkler",
    "name": "jaroWinkler",
    "module": "Text-pro",
    "description": "Computes Jaro-Winkler similarity in `[0, 1]`.",
    "signature": "jaroWinkler(s1: string, s2: string): number",
    "example": "jaroWinkler(...)",
    "output": "..."
  },
  {
    "id": "hammingdist",
    "name": "hammingDist",
    "module": "Text-pro",
    "description": "Computes Hamming distance between two equal-length strings.",
    "signature": "hammingDist(a: string, b: string): number",
    "example": "hammingDist(...)",
    "output": "..."
  },
  {
    "id": "sorensendice",
    "name": "sorensenDice",
    "module": "Text-pro",
    "description": "Computes Sorensen-Dice bigram similarity coefficient in `[0, 1]`.",
    "signature": "sorensenDice(a: string, b: string): number",
    "example": "sorensenDice(...)",
    "output": "..."
  },
  {
    "id": "soundexcode",
    "name": "soundexCode",
    "module": "Text-pro",
    "description": "Computes American Soundex phonetic code (e.g. `Robert` -> `R163`).",
    "signature": "soundexCode(word: string): string",
    "example": "soundexCode(...)",
    "output": "..."
  },
  {
    "id": "metaphone",
    "name": "metaphone",
    "module": "Text-pro",
    "description": "Computes simplified Metaphone phonetic key for English words.",
    "signature": "metaphone(word: string): string",
    "example": "metaphone(...)",
    "output": "..."
  },
  {
    "id": "tokenizewordspro",
    "name": "tokenizeWordsPro",
    "module": "Text-pro",
    "description": "Tokenizes text into alphanumeric words.",
    "signature": "tokenizeWordsPro(text: string): string[]",
    "example": "tokenizeWordsPro(...)",
    "output": "..."
  },
  {
    "id": "tokenizesentencespro",
    "name": "tokenizeSentencesPro",
    "module": "Text-pro",
    "description": "Splits text into trimmed sentences.",
    "signature": "tokenizeSentencesPro(text: string): string[]",
    "example": "tokenizeSentencesPro(...)",
    "output": "..."
  },
  {
    "id": "wordfrequency",
    "name": "wordFrequency",
    "module": "Text-pro",
    "description": "Computes a frequency map of words (case-insensitive).",
    "signature": "wordFrequency(text: string): Record<string, number>",
    "example": "wordFrequency(...)",
    "output": "..."
  },
  {
    "id": "readingtimeminutes",
    "name": "readingTimeMinutes",
    "module": "Text-pro",
    "description": "Estimates reading time in minutes given words-per-minute (default 200).",
    "signature": "readingTimeMinutes(text: string, wpm",
    "example": "readingTimeMinutes(...)",
    "output": "..."
  },
  {
    "id": "extracthashtagspro",
    "name": "extractHashtagsPro",
    "module": "Text-pro",
    "description": "Extracts `#hashtags` from text.",
    "signature": "extractHashtagsPro(text: string): string[]",
    "example": "extractHashtagsPro(...)",
    "output": "..."
  },
  {
    "id": "extractmentionspro",
    "name": "extractMentionsPro",
    "module": "Text-pro",
    "description": "Extracts `@mentions` from text (excluding email addresses).",
    "signature": "extractMentionsPro(text: string): string[]",
    "example": "extractMentionsPro(...)",
    "output": "..."
  },
  {
    "id": "extracturls",
    "name": "extractUrls",
    "module": "Text-pro",
    "description": "Extracts HTTP/HTTPS URLs from text.",
    "signature": "extractUrls(text: string): string[]",
    "example": "extractUrls(...)",
    "output": "..."
  },
  {
    "id": "extractemails",
    "name": "extractEmails",
    "module": "Text-pro",
    "description": "Extracts email addresses from text.",
    "signature": "extractEmails(text: string): string[]",
    "example": "extractEmails(...)",
    "output": "..."
  },
  {
    "id": "maskemail",
    "name": "maskEmail",
    "module": "Text-pro",
    "description": "Masks an email address (`alice@example.com` -> `a***e@example.com`).",
    "signature": "maskEmail(email: string): string",
    "example": "maskEmail(...)",
    "output": "..."
  },
  {
    "id": "maskphone",
    "name": "maskPhone",
    "module": "Text-pro",
    "description": "Masks a phone number, keeping only the last `visibleDigits` digits.",
    "signature": "maskPhone(phone: string, visibleDigits",
    "example": "maskPhone(...)",
    "output": "..."
  },
  {
    "id": "maskcard",
    "name": "maskCard",
    "module": "Text-pro",
    "description": "Masks a payment card number, keeping only the last 4 digits.",
    "signature": "maskCard(card: string): string",
    "example": "maskCard(...)",
    "output": "..."
  },
  {
    "id": "wraptextpro",
    "name": "wrapTextPro",
    "module": "Text-pro",
    "description": "Word-wraps text to a maximum line width.",
    "signature": "wrapTextPro(text: string, width",
    "example": "wrapTextPro(...)",
    "output": "..."
  },
  {
    "id": "indenttext",
    "name": "indentText",
    "module": "Text-pro",
    "description": "Indents every non-empty line of text by `spaces` spaces (or custom prefix).",
    "signature": "indentText(text: string, spaces",
    "example": "indentText(...)",
    "output": "..."
  },
  {
    "id": "dedenttext",
    "name": "dedentText",
    "module": "Text-pro",
    "description": "Removes common leading indentation from a multi-line string.",
    "signature": "dedentText(text: string): string",
    "example": "dedentText(...)",
    "output": "..."
  },
  {
    "id": "stripansi",
    "name": "stripAnsi",
    "module": "Text-pro",
    "description": "Strips ANSI terminal escape codes from a string.",
    "signature": "stripAnsi(text: string): string",
    "example": "stripAnsi(...)",
    "output": "..."
  },
  {
    "id": "highlightmatch",
    "name": "highlightMatch",
    "module": "Text-pro",
    "description": "Wraps matched substrings with `<mark>` (or custom tags) for search highlighting.",
    "signature": "highlightMatch(text: string, query: string, openTag",
    "example": "highlightMatch(...)",
    "output": "..."
  },
  {
    "id": "slugifyunicode",
    "name": "slugifyUnicode",
    "module": "Text-pro",
    "description": "Slugifies Unicode strings by normalizing diacritics (NFD) before ASCII cleanup.",
    "signature": "slugifyUnicode(text: string): string",
    "example": "slugifyUnicode(...)",
    "output": "..."
  },
  {
    "id": "cameltotitle",
    "name": "camelToTitle",
    "module": "Text-pro",
    "description": "Converts `camelCase` or `PascalCase` into `Title Case`.",
    "signature": "camelToTitle(text: string): string",
    "example": "camelToTitle(...)",
    "output": "..."
  },
  {
    "id": "truncatemiddlepro",
    "name": "truncateMiddlePro",
    "module": "Text-pro",
    "description": "Truncates a long string in the middle (`abcdef...wxyz`).",
    "signature": "truncateMiddlePro(text: string, maxLength: number, ellipsis",
    "example": "truncateMiddlePro(...)",
    "output": "..."
  },
  {
    "id": "pluralizeen",
    "name": "pluralizeEn",
    "module": "Text-pro",
    "description": "Basic English pluralization helper with irregulars and count support.",
    "signature": "pluralizeEn(word: string, count",
    "example": "pluralizeEn(...)",
    "output": "..."
  },
  {
    "id": "singularizeen",
    "name": "singularizeEn",
    "module": "Text-pro",
    "description": "Basic English singularization helper.",
    "signature": "singularizeEn(word: string): string",
    "example": "singularizeEn(...)",
    "output": "..."
  },
  {
    "id": "walktree",
    "name": "walkTree",
    "module": "Tree-extended",
    "description": "Walks a tree structure using depth-first search.",
    "signature": "walkTree<T>( tree: TreeNode<T>[], callback: (node: TreeNode<T>, depth: number, parent: TreeNode<T> | null)",
    "example": "walkTree(...)",
    "output": "..."
  },
  {
    "id": "findintree",
    "name": "findInTree",
    "module": "Tree-extended",
    "description": "Finds the first node in a tree that satisfies a predicate.",
    "signature": "findInTree<T>( tree: TreeNode<T>[], predicate: (node: TreeNode<T>)",
    "example": "findInTree(...)",
    "output": "..."
  },
  {
    "id": "maptree",
    "name": "mapTree",
    "module": "Tree-extended",
    "description": "Maps over a tree, creating a new tree with mapped values.",
    "signature": "mapTree<T, R>( tree: TreeNode<T>[], mapper: (node: TreeNode<T>)",
    "example": "mapTree(...)",
    "output": "..."
  },
  {
    "id": "filtertree",
    "name": "filterTree",
    "module": "Tree-extended",
    "description": "Filters nodes in a tree, retaining subtrees if their parent matches.",
    "signature": "filterTree<T>( tree: TreeNode<T>[], predicate: (node: TreeNode<T>)",
    "example": "filterTree(...)",
    "output": "..."
  },
  {
    "id": "flattentree",
    "name": "flattenTree",
    "module": "Tree-extended",
    "description": "Flattens a tree into a flat array of its nodes.",
    "signature": "flattenTree<T>(tree: TreeNode<T>[]): TreeNode<T>[]",
    "example": "flattenTree(...)",
    "output": "..."
  },
  {
    "id": "treedepth",
    "name": "treeDepth",
    "module": "Tree-extended",
    "description": "Gets the maximum depth of a tree.",
    "signature": "treeDepth<T>(tree: TreeNode<T>[]): number",
    "example": "treeDepth(...)",
    "output": "..."
  },
  {
    "id": "everyintree",
    "name": "everyInTree",
    "module": "Tree-extended",
    "description": "Checks if every node in a tree satisfies a predicate.",
    "signature": "everyInTree<T>( tree: TreeNode<T>[], predicate: (node: TreeNode<T>)",
    "example": "everyInTree(...)",
    "output": "..."
  },
  {
    "id": "someintree",
    "name": "someInTree",
    "module": "Tree-extended",
    "description": "Checks if some node in a tree satisfies a predicate.",
    "signature": "someInTree<T>( tree: TreeNode<T>[], predicate: (node: TreeNode<T>)",
    "example": "someInTree(...)",
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
    "id": "createtrie",
    "name": "createTrie",
    "module": "Trie",
    "description": "OptiKit Trie & Search Indexes — Prefix Trie, Inverted Index (TF-IDF / BM25),",
    "signature": "createTrie(): Trie",
    "example": "createTrie(...)",
    "output": "..."
  },
  {
    "id": "trieinsert",
    "name": "trieInsert",
    "module": "Trie",
    "description": "Inserts a word into the Trie.",
    "signature": "trieInsert(trie: Trie, word: string): void",
    "example": "trieInsert(...)",
    "output": "..."
  },
  {
    "id": "triesearch",
    "name": "trieSearch",
    "module": "Trie",
    "description": "Checks if an exact word exists in the Trie.",
    "signature": "trieSearch(trie: Trie, word: string): boolean",
    "example": "trieSearch(...)",
    "output": "..."
  },
  {
    "id": "triestartswith",
    "name": "trieStartsWith",
    "module": "Trie",
    "description": "Checks if any word in the Trie starts with `prefix`.",
    "signature": "trieStartsWith(trie: Trie, prefix: string): boolean",
    "example": "trieStartsWith(...)",
    "output": "..."
  },
  {
    "id": "triedelete",
    "name": "trieDelete",
    "module": "Trie",
    "description": "Deletes a word from the Trie if present, returning `true` if removed.",
    "signature": "trieDelete(trie: Trie, word: string): boolean",
    "example": "trieDelete(...)",
    "output": "..."
  },
  {
    "id": "trieautocomplete",
    "name": "trieAutocomplete",
    "module": "Trie",
    "description": "Returns up to `limit` autocomplete suggestions for `prefix`.",
    "signature": "trieAutocomplete(trie: Trie, prefix: string, limit",
    "example": "trieAutocomplete(...)",
    "output": "..."
  },
  {
    "id": "triecountprefix",
    "name": "trieCountPrefix",
    "module": "Trie",
    "description": "Counts how many words in the Trie share `prefix`.",
    "signature": "trieCountPrefix(trie: Trie, prefix: string): number",
    "example": "trieCountPrefix(...)",
    "output": "..."
  },
  {
    "id": "trielongestcommonprefix",
    "name": "trieLongestCommonPrefix",
    "module": "Trie",
    "description": "Finds the longest common prefix among all words in the Trie.",
    "signature": "trieLongestCommonPrefix(trie: Trie): string",
    "example": "trieLongestCommonPrefix(...)",
    "output": "..."
  },
  {
    "id": "trieallwords",
    "name": "trieAllWords",
    "module": "Trie",
    "description": "Returns all words stored in the Trie.",
    "signature": "trieAllWords(trie: Trie): string[]",
    "example": "trieAllWords(...)",
    "output": "..."
  },
  {
    "id": "triesize",
    "name": "trieSize",
    "module": "Trie",
    "description": "Returns the number of distinct words in the Trie.",
    "signature": "trieSize(trie: Trie): number",
    "example": "trieSize(...)",
    "output": "..."
  },
  {
    "id": "createinvertedindex",
    "name": "createInvertedIndex",
    "module": "Trie",
    "description": "Creates an empty in-memory Inverted Index.",
    "signature": "createInvertedIndex(): InvertedIndex",
    "example": "createInvertedIndex(...)",
    "output": "..."
  },
  {
    "id": "indexdocument",
    "name": "indexDocument",
    "module": "Trie",
    "description": "Indexes a document by `docId` and `text`.",
    "signature": "indexDocument(index: InvertedIndex, docId: string, text: string): void",
    "example": "indexDocument(...)",
    "output": "..."
  },
  {
    "id": "removedocument",
    "name": "removeDocument",
    "module": "Trie",
    "description": "Removes a document from the Inverted Index.",
    "signature": "removeDocument(index: InvertedIndex, docId: string): boolean",
    "example": "removeDocument(...)",
    "output": "..."
  },
  {
    "id": "bm25score",
    "name": "bm25Score",
    "module": "Trie",
    "description": "Computes BM25 relevance score for a query against a document in the index.",
    "signature": "bm25Score( index: InvertedIndex, docId: string, query: string, k1",
    "example": "bm25Score(...)",
    "output": "..."
  },
  {
    "id": "tfidfscore",
    "name": "tfIdfScore",
    "module": "Trie",
    "description": "Computes TF-IDF score for a query against a document in the index.",
    "signature": "tfIdfScore(index: InvertedIndex, docId: string, query: string): number",
    "example": "tfIdfScore(...)",
    "output": "..."
  },
  {
    "id": "searchindex",
    "name": "searchIndex",
    "module": "Trie",
    "description": "Searches the Inverted Index using BM25 ranking.",
    "signature": "searchIndex( index: InvertedIndex, query: string, limit",
    "example": "searchIndex(...)",
    "output": "..."
  },
  {
    "id": "createngramindex",
    "name": "createNGramIndex",
    "module": "Trie",
    "description": "Creates an N-gram fuzzy index for substring/typo-tolerant matching.",
    "signature": "createNGramIndex(words: readonly string[], n",
    "example": "createNGramIndex(...)",
    "output": "..."
  },
  {
    "id": "searchngram",
    "name": "searchNGram",
    "module": "Trie",
    "description": "Searches an N-gram index using Jaccard similarity.",
    "signature": "searchNGram( index: NGramIndex, query: string, minSimilarity",
    "example": "searchNGram(...)",
    "output": "..."
  },
  {
    "id": "createbloomfilter",
    "name": "createBloomFilter",
    "module": "Trie",
    "description": "Creates a probabilistic Bloom Filter with `bitSize` bits and `hashCount` hashes.",
    "signature": "createBloomFilter(bitSize",
    "example": "createBloomFilter(...)",
    "output": "..."
  },
  {
    "id": "bloomadd",
    "name": "bloomAdd",
    "module": "Trie",
    "description": "Adds an item to the Bloom Filter.",
    "signature": "bloomAdd(filter: BloomFilter, item: string): void",
    "example": "bloomAdd(...)",
    "output": "..."
  },
  {
    "id": "bloomhas",
    "name": "bloomHas",
    "module": "Trie",
    "description": "Checks if an item may be in the Bloom Filter (`false` = definitely not present).",
    "signature": "bloomHas(filter: BloomFilter, item: string): boolean",
    "example": "bloomHas(...)",
    "output": "..."
  },
  {
    "id": "bloomfalsepositiverate",
    "name": "bloomFalsePositiveRate",
    "module": "Trie",
    "description": "Estimates the current false-positive probability of the Bloom Filter.",
    "signature": "bloomFalsePositiveRate(filter: BloomFilter): number",
    "example": "bloomFalsePositiveRate(...)",
    "output": "..."
  },
  {
    "id": "isnil",
    "name": "isNil",
    "module": "Types",
    "description": "Checks if a value is null or undefined.",
    "signature": "isNil(val: any): val is null | undefined",
    "example": "isNil(...)",
    "output": "..."
  },
  {
    "id": "isobject",
    "name": "isObject",
    "module": "Types",
    "description": "Checks if a value is a plain object (excluding array, null, and other instances).",
    "signature": "isObject(val: any): val is Record<any, any>",
    "example": "isObject(...)",
    "output": "..."
  },
  {
    "id": "isfunction",
    "name": "isFunction",
    "module": "Types",
    "description": "Checks if a value is a function.",
    "signature": "isFunction(val: any): val is Function",
    "example": "isFunction(...)",
    "output": "..."
  },
  {
    "id": "isdate",
    "name": "isDate",
    "module": "Types",
    "description": "Checks if a value is a valid Date instance.",
    "signature": "isDate(val: any): val is Date",
    "example": "isDate(...)",
    "output": "..."
  },
  {
    "id": "isregexp",
    "name": "isRegExp",
    "module": "Types",
    "description": "Checks if a value is a regular expression.",
    "signature": "isRegExp(val: any): val is RegExp",
    "example": "isRegExp(...)",
    "output": "..."
  },
  {
    "id": "isstring",
    "name": "isString",
    "module": "Types",
    "description": "Checks if a value is a string.",
    "signature": "isString(val: any): val is string",
    "example": "isString(...)",
    "output": "..."
  },
  {
    "id": "isnumber",
    "name": "isNumber",
    "module": "Types",
    "description": "Checks if a value is a finite number (excludes NaN and Infinity).",
    "signature": "isNumber(val: any): val is number",
    "example": "isNumber(...)",
    "output": "..."
  },
  {
    "id": "isboolean",
    "name": "isBoolean",
    "module": "Types",
    "description": "Checks if a value is a boolean.",
    "signature": "isBoolean(val: any): val is boolean",
    "example": "isBoolean(...)",
    "output": "..."
  },
  {
    "id": "isarray",
    "name": "isArray",
    "module": "Types",
    "description": "Checks if a value is an array.",
    "signature": "isArray(val: any): val is any[]",
    "example": "isArray(...)",
    "output": "..."
  },
  {
    "id": "ispromise",
    "name": "isPromise",
    "module": "Types",
    "description": "Checks if a value is a Promise or thenable.",
    "signature": "isPromise(val: any): val is Promise<any>",
    "example": "isPromise(...)",
    "output": "..."
  },
  {
    "id": "ismap",
    "name": "isMap",
    "module": "Types",
    "description": "Checks if a value is a Map instance.",
    "signature": "isMap(val: any): val is Map<any, any>",
    "example": "isMap(...)",
    "output": "..."
  },
  {
    "id": "isset",
    "name": "isSet",
    "module": "Types",
    "description": "Checks if a value is a Set instance.",
    "signature": "isSet(val: any): val is Set<any>",
    "example": "isSet(...)",
    "output": "..."
  },
  {
    "id": "issymbol",
    "name": "isSymbol",
    "module": "Types",
    "description": "Checks if a value is a Symbol.",
    "signature": "isSymbol(val: any): val is symbol",
    "example": "isSymbol(...)",
    "output": "..."
  },
  {
    "id": "iserror",
    "name": "isError",
    "module": "Types",
    "description": "Checks if a value is an Error instance.",
    "signature": "isError(val: any): val is Error",
    "example": "isError(...)",
    "output": "..."
  },
  {
    "id": "isprimitive",
    "name": "isPrimitive",
    "module": "Types",
    "description": "Checks if a value is a JavaScript primitive (string, number, bigint, boolean, undefined, symbol, or null).",
    "signature": "isPrimitive(val: any): boolean",
    "example": "isPrimitive(...)",
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
  },
  {
    "id": "iscreditcardluhn",
    "name": "isCreditCardLuhn",
    "module": "Validation-pro",
    "description": "OptiKit Validation Pro — Financial, networking, identifier, format, and security",
    "signature": "isCreditCardLuhn(cardNumber: string): boolean",
    "example": "isCreditCardLuhn(...)",
    "output": "..."
  },
  {
    "id": "detectcardbrand",
    "name": "detectCardBrand",
    "module": "Validation-pro",
    "description": "Detects the card network brand (`visa`, `mastercard`, `amex`, `discover`, `unknown`).",
    "signature": "detectCardBrand( cardNumber: string ): 'visa' | 'mastercard' | 'amex' | 'discover' | 'unknown'",
    "example": "detectCardBrand(...)",
    "output": "..."
  },
  {
    "id": "isiban",
    "name": "isIban",
    "module": "Validation-pro",
    "description": "Validates an International Bank Account Number (IBAN) via mod-97 check.",
    "signature": "isIban(iban: string): boolean",
    "example": "isIban(...)",
    "output": "..."
  },
  {
    "id": "isbicswift",
    "name": "isBicSwift",
    "module": "Validation-pro",
    "description": "Validates a SWIFT/BIC bank identifier code (8 or 11 characters).",
    "signature": "isBicSwift(bic: string): boolean",
    "example": "isBicSwift(...)",
    "output": "..."
  },
  {
    "id": "isisbn10",
    "name": "isIsbn10",
    "module": "Validation-pro",
    "description": "Validates an ISBN-10 code with check digit.",
    "signature": "isIsbn10(isbn: string): boolean",
    "example": "isIsbn10(...)",
    "output": "..."
  },
  {
    "id": "isisbn13",
    "name": "isIsbn13",
    "module": "Validation-pro",
    "description": "Validates an ISBN-13 code with mod-10 check digit.",
    "signature": "isIsbn13(isbn: string): boolean",
    "example": "isIsbn13(...)",
    "output": "..."
  },
  {
    "id": "isissn",
    "name": "isIssn",
    "module": "Validation-pro",
    "description": "Validates an ISSN serial publication identifier.",
    "signature": "isIssn(issn: string): boolean",
    "example": "isIssn(...)",
    "output": "..."
  },
  {
    "id": "isean13",
    "name": "isEan13",
    "module": "Validation-pro",
    "description": "Validates an EAN-13 barcode check digit.",
    "signature": "isEan13(code: string): boolean",
    "example": "isEan13(...)",
    "output": "..."
  },
  {
    "id": "isupca",
    "name": "isUpcA",
    "module": "Validation-pro",
    "description": "Validates a UPC-A 12-digit barcode check digit.",
    "signature": "isUpcA(code: string): boolean",
    "example": "isUpcA(...)",
    "output": "..."
  },
  {
    "id": "isvin",
    "name": "isVin",
    "module": "Validation-pro",
    "description": "Validates a 17-character Vehicle Identification Number (VIN).",
    "signature": "isVin(vin: string): boolean",
    "example": "isVin(...)",
    "output": "..."
  },
  {
    "id": "ismacaddressstrict",
    "name": "isMacAddressStrict",
    "module": "Validation-pro",
    "description": "Validates a MAC address (colon, hyphen, or dot-separated).",
    "signature": "isMacAddressStrict(mac: string): boolean",
    "example": "isMacAddressStrict(...)",
    "output": "..."
  },
  {
    "id": "isipv4cidr",
    "name": "isIpv4Cidr",
    "module": "Validation-pro",
    "description": "Validates an IPv4 CIDR block (e.g. `192.168.1.0/24`).",
    "signature": "isIpv4Cidr(cidr: string): boolean",
    "example": "isIpv4Cidr(...)",
    "output": "..."
  },
  {
    "id": "isipv6",
    "name": "isIpv6",
    "module": "Validation-pro",
    "description": "Validates an IPv6 address (full or compressed `::` notation).",
    "signature": "isIpv6(ip: string): boolean",
    "example": "isIpv6(...)",
    "output": "..."
  },
  {
    "id": "ipincidr",
    "name": "ipInCidr",
    "module": "Validation-pro",
    "description": "Checks whether an IPv4 address falls inside an IPv4 CIDR range.",
    "signature": "ipInCidr(ip: string, cidr: string): boolean",
    "example": "ipInCidr(...)",
    "output": "..."
  },
  {
    "id": "iscronexpression",
    "name": "isCronExpression",
    "module": "Validation-pro",
    "description": "Validates a standard 5-field cron expression syntax.",
    "signature": "isCronExpression(expr: string): boolean",
    "example": "isCronExpression(...)",
    "output": "..."
  },
  {
    "id": "isjwtformat",
    "name": "isJwtFormat",
    "module": "Validation-pro",
    "description": "Validates structural JWT format (3 Base64URL segments).",
    "signature": "isJwtFormat(token: string): boolean",
    "example": "isJwtFormat(...)",
    "output": "..."
  },
  {
    "id": "issemverrange",
    "name": "isSemverRange",
    "module": "Validation-pro",
    "description": "Validates basic SemVer range syntax (`^1.2.3`, `~1.0.0`, `>=1.0.0`, `1.2.x`, `*`).",
    "signature": "isSemverRange(range: string): boolean",
    "example": "isSemverRange(...)",
    "output": "..."
  },
  {
    "id": "ismimetype",
    "name": "isMimeType",
    "module": "Validation-pro",
    "description": "Validates a MIME media type string (e.g. `application/json`).",
    "signature": "isMimeType(mime: string): boolean",
    "example": "isMimeType(...)",
    "output": "..."
  },
  {
    "id": "isdatauri",
    "name": "isDataUri",
    "module": "Validation-pro",
    "description": "Validates an RFC 2397 `data:` URI.",
    "signature": "isDataUri(uri: string): boolean",
    "example": "isDataUri(...)",
    "output": "..."
  },
  {
    "id": "isslugstrict",
    "name": "isSlugStrict",
    "module": "Validation-pro",
    "description": "Validates a URL-safe lowercase slug (`my-slug-123`).",
    "signature": "isSlugStrict(value: string): boolean",
    "example": "isSlugStrict(...)",
    "output": "..."
  },
  {
    "id": "passwordstrengthscore",
    "name": "passwordStrengthScore",
    "module": "Validation-pro",
    "description": "Computes a 0-4 password strength score based on length and character classes.",
    "signature": "passwordStrengthScore(password: string): 0 | 1 | 2 | 3 | 4",
    "example": "passwordStrengthScore(...)",
    "output": "..."
  },
  {
    "id": "isstrongpasswordstrict",
    "name": "isStrongPasswordStrict",
    "module": "Validation-pro",
    "description": "Checks if a password meets strict enterprise strength requirements (score >= 3 and length >= 8).",
    "signature": "isStrongPasswordStrict(password: string): boolean",
    "example": "isStrongPasswordStrict(...)",
    "output": "..."
  },
  {
    "id": "ise164phone",
    "name": "isE164Phone",
    "module": "Validation-pro",
    "description": "Validates an E.164 international phone number (`+14155552671`).",
    "signature": "isE164Phone(phone: string): boolean",
    "example": "isE164Phone(...)",
    "output": "..."
  },
  {
    "id": "isiso3166alpha2",
    "name": "isIso3166Alpha2",
    "module": "Validation-pro",
    "description": "Validates an ISO 3166-1 alpha-2 country code format (`US`, `IN`, `GB`).",
    "signature": "isIso3166Alpha2(code: string): boolean",
    "example": "isIso3166Alpha2(...)",
    "output": "..."
  },
  {
    "id": "isiso4217currency",
    "name": "isIso4217Currency",
    "module": "Validation-pro",
    "description": "Validates an ISO 4217 3-letter currency code format (`USD`, `EUR`, `INR`).",
    "signature": "isIso4217Currency(code: string): boolean",
    "example": "isIso4217Currency(...)",
    "output": "..."
  },
  {
    "id": "sanitizefilename",
    "name": "sanitizeFilename",
    "module": "Validation-pro",
    "description": "Sanitizes an arbitrary string into a safe cross-platform filename.",
    "signature": "sanitizeFilename(name: string, replacement",
    "example": "sanitizeFilename(...)",
    "output": "..."
  },
  {
    "id": "escaperegexpstr",
    "name": "escapeRegExpStr",
    "module": "Validation-pro",
    "description": "Escapes special RegExp metacharacters in a literal string.",
    "signature": "escapeRegExpStr(str: string): string",
    "example": "escapeRegExpStr(...)",
    "output": "..."
  },
  {
    "id": "stripcontrolchars",
    "name": "stripControlChars",
    "module": "Validation-pro",
    "description": "Strips ASCII control characters (`0x00-0x1F`, `0x7F`) from a string.",
    "signature": "stripControlChars(str: string): string",
    "example": "stripControlChars(...)",
    "output": "..."
  },
  {
    "id": "vecadd",
    "name": "vecAdd",
    "module": "Vector",
    "description": "Adds two vectors.",
    "signature": "vecAdd(a: Vec, b: Vec): Vec",
    "example": "vecAdd(...)",
    "output": "..."
  },
  {
    "id": "vecsub",
    "name": "vecSub",
    "module": "Vector",
    "description": "Subtracts vector b from vector a.",
    "signature": "vecSub(a: Vec, b: Vec): Vec",
    "example": "vecSub(...)",
    "output": "..."
  },
  {
    "id": "vecmul",
    "name": "vecMul",
    "module": "Vector",
    "description": "Multiplies a vector by a scalar or another vector.",
    "signature": "vecMul(a: Vec, b: Vec | number): Vec",
    "example": "vecMul(...)",
    "output": "..."
  },
  {
    "id": "vecdiv",
    "name": "vecDiv",
    "module": "Vector",
    "description": "Divides a vector by a scalar or another vector.",
    "signature": "vecDiv(a: Vec, b: Vec | number): Vec",
    "example": "vecDiv(...)",
    "output": "..."
  },
  {
    "id": "vecdot",
    "name": "vecDot",
    "module": "Vector",
    "description": "Calculates the dot product of two vectors.",
    "signature": "vecDot(a: Vec, b: Vec): number",
    "example": "vecDot(...)",
    "output": "..."
  },
  {
    "id": "veccross",
    "name": "vecCross",
    "module": "Vector",
    "description": "Calculates the cross product of two 3D vectors.",
    "signature": "vecCross(a: Vec3, b: Vec3): Vec3",
    "example": "vecCross(...)",
    "output": "..."
  },
  {
    "id": "vecmagsq",
    "name": "vecMagSq",
    "module": "Vector",
    "description": "Calculates the squared magnitude of a vector.",
    "signature": "vecMagSq(a: Vec): number",
    "example": "vecMagSq(...)",
    "output": "..."
  },
  {
    "id": "vecmag",
    "name": "vecMag",
    "module": "Vector",
    "description": "Calculates the magnitude (length) of a vector.",
    "signature": "vecMag(a: Vec): number",
    "example": "vecMag(...)",
    "output": "..."
  },
  {
    "id": "vecnormalize",
    "name": "vecNormalize",
    "module": "Vector",
    "description": "Normalizes a vector (makes its length 1).",
    "signature": "vecNormalize(a: Vec): Vec",
    "example": "vecNormalize(...)",
    "output": "..."
  },
  {
    "id": "vecdistsq",
    "name": "vecDistSq",
    "module": "Vector",
    "description": "Calculates the squared distance between two vectors.",
    "signature": "vecDistSq(a: Vec, b: Vec): number",
    "example": "vecDistSq(...)",
    "output": "..."
  },
  {
    "id": "vecdist",
    "name": "vecDist",
    "module": "Vector",
    "description": "Calculates the distance between two vectors.",
    "signature": "vecDist(a: Vec, b: Vec): number",
    "example": "vecDist(...)",
    "output": "..."
  },
  {
    "id": "veclerp",
    "name": "vecLerp",
    "module": "Vector",
    "description": "Linearly interpolates between two vectors.",
    "signature": "vecLerp(a: Vec, b: Vec, t: number): Vec",
    "example": "vecLerp(...)",
    "output": "..."
  },
  {
    "id": "vecangle",
    "name": "vecAngle",
    "module": "Vector",
    "description": "Calculates the angle between two vectors in radians.",
    "signature": "vecAngle(a: Vec, b: Vec): number",
    "example": "vecAngle(...)",
    "output": "..."
  },
  {
    "id": "vecproject",
    "name": "vecProject",
    "module": "Vector",
    "description": "Projects vector a onto vector b.",
    "signature": "vecProject(a: Vec, b: Vec): Vec",
    "example": "vecProject(...)",
    "output": "..."
  },
  {
    "id": "vecreflect",
    "name": "vecReflect",
    "module": "Vector",
    "description": "Reflects a vector around a normal.",
    "signature": "vecReflect(v: Vec, n: Vec): Vec",
    "example": "vecReflect(...)",
    "output": "..."
  },
  {
    "id": "evaluaterule",
    "name": "evaluateRule",
    "module": "Workflow-pro",
    "description": "OptiKit Workflow Pro — Rule Engine, Feature Flags & Rollouts, Safe Expression Evaluator,",
    "signature": "evaluateRule<TFact, TResult>( rule: WorkflowRule<TFact, TResult>, fact: TFact )",
    "example": "evaluateRule(...)",
    "output": "..."
  },
  {
    "id": "createruleengine",
    "name": "createRuleEngine",
    "module": "Workflow-pro",
    "description": "Creates a prioritized Rule Engine supporting `evaluateAll` and `evaluateFirst`.",
    "signature": "createRuleEngine<TFact, TResult",
    "example": "createRuleEngine(...)",
    "output": "..."
  },
  {
    "id": "evaluaterolloutpercent",
    "name": "evaluateRolloutPercent",
    "module": "Workflow-pro",
    "description": "Deterministically evaluates a percentage rollout (`0..100`) using FNV-1a hashing.",
    "signature": "evaluateRolloutPercent(key: string, percent: number): boolean",
    "example": "evaluateRolloutPercent(...)",
    "output": "..."
  },
  {
    "id": "isfeatureenabled",
    "name": "isFeatureEnabled",
    "module": "Workflow-pro",
    "description": "Evaluates whether a feature flag is enabled for an optional `userId`.",
    "signature": "isFeatureEnabled( flag: FeatureFlagConfig | undefined, flagName: string, userId?: string ): boolean",
    "example": "isFeatureEnabled(...)",
    "output": "..."
  },
  {
    "id": "createfeatureflagclient",
    "name": "createFeatureFlagClient",
    "module": "Workflow-pro",
    "description": "Creates a Feature Flag client from a flag configuration map.",
    "signature": "createFeatureFlagClient(initialFlags: Record<string, FeatureFlagConfig>)",
    "example": "createFeatureFlagClient(...)",
    "output": "..."
  },
  {
    "id": "evaluateexpression",
    "name": "evaluateExpression",
    "module": "Workflow-pro",
    "description": "Safely evaluates a numeric/boolean arithmetic expression without `eval()`.",
    "signature": "evaluateExpression( expr: string, vars: Record<string, number>",
    "example": "evaluateExpression(...)",
    "output": "..."
  },
  {
    "id": "createexpressionevaluator",
    "name": "createExpressionEvaluator",
    "module": "Workflow-pro",
    "description": "Creates a reusable Expression Evaluator bound to helper functions/constants.",
    "signature": "createExpressionEvaluator(defaults: Record<string, number>",
    "example": "createExpressionEvaluator(...)",
    "output": "..."
  },
  {
    "id": "parsefilterquery",
    "name": "parseFilterQuery",
    "module": "Workflow-pro",
    "description": "Parses a simple `key=val` / `key>val` space-separated filter query into clauses.",
    "signature": "parseFilterQuery(query: string): FilterClause[]",
    "example": "parseFilterQuery(...)",
    "output": "..."
  },
  {
    "id": "matchesfilterquery",
    "name": "matchesFilterQuery",
    "module": "Workflow-pro",
    "description": "Checks whether a record satisfies all filter clauses.",
    "signature": "matchesFilterQuery( record: Record<string, unknown>, clauses: readonly FilterClause[] ): boolean",
    "example": "matchesFilterQuery(...)",
    "output": "..."
  },
  {
    "id": "checkpermission",
    "name": "checkPermission",
    "module": "Workflow-pro",
    "description": "Checks RBAC permission against a list of policy rules (explicit `deny` overrides `allow`).",
    "signature": "checkPermission( policies: readonly PolicyRule[], role: string, action: string, resource: string ): boolean",
    "example": "checkPermission(...)",
    "output": "..."
  },
  {
    "id": "createpolicyenforcer",
    "name": "createPolicyEnforcer",
    "module": "Workflow-pro",
    "description": "Creates an RBAC Policy Enforcer instance.",
    "signature": "createPolicyEnforcer(initialPolicies: readonly PolicyRule[]",
    "example": "createPolicyEnforcer(...)",
    "output": "..."
  },
  {
    "id": "evaluatedecisiontable",
    "name": "evaluateDecisionTable",
    "module": "Workflow-pro",
    "description": "Evaluates a DMN-style Decision Table and returns matching row outputs.",
    "signature": "evaluateDecisionTable<TInput extends Record<string, unknown>, TOutput>( rows: readonly",
    "example": "evaluateDecisionTable(...)",
    "output": "..."
  },
  {
    "id": "createdecisiontable",
    "name": "createDecisionTable",
    "module": "Workflow-pro",
    "description": "Creates a reusable Decision Table evaluator.",
    "signature": "createDecisionTable<TInput extends Record<string, unknown>, TOutput>( rows: readonly",
    "example": "createDecisionTable(...)",
    "output": "..."
  },
  {
    "id": "createspecbuilder",
    "name": "createSpecBuilder",
    "module": "Workflow-pro",
    "description": "Creates a Specification predicate.",
    "signature": "createSpecBuilder<T>(predicate: Specification<T>): Specification<T>",
    "example": "createSpecBuilder(...)",
    "output": "..."
  },
  {
    "id": "andspec",
    "name": "andSpec",
    "module": "Workflow-pro",
    "description": "Combines specifications with logical AND.",
    "signature": "andSpec<T>(...specs: Specification<T>[]): Specification<T>",
    "example": "andSpec(...)",
    "output": "..."
  },
  {
    "id": "orspec",
    "name": "orSpec",
    "module": "Workflow-pro",
    "description": "Combines specifications with logical OR.",
    "signature": "orSpec<T>(...specs: Specification<T>[]): Specification<T>",
    "example": "orSpec(...)",
    "output": "..."
  },
  {
    "id": "notspec",
    "name": "notSpec",
    "module": "Workflow-pro",
    "description": "Negates a specification with logical NOT.",
    "signature": "notSpec<T>(spec: Specification<T>): Specification<T>",
    "example": "notSpec(...)",
    "output": "..."
  },
  {
    "id": "composeasyncmiddleware",
    "name": "composeAsyncMiddleware",
    "module": "Workflow-pro",
    "description": "Composes Koa-style async middleware functions into a single runner.",
    "signature": "composeAsyncMiddleware<TContext>( middlewares: readonly AsyncMiddleware<TContext>[] ): (ctx: TContext)",
    "example": "composeAsyncMiddleware(...)",
    "output": "..."
  },
  {
    "id": "createmiddlewarechain",
    "name": "createMiddlewareChain",
    "module": "Workflow-pro",
    "description": "Creates a mutable async middleware chain.",
    "signature": "createMiddlewareChain<TContext>()",
    "example": "createMiddlewareChain(...)",
    "output": "..."
  },
  {
    "id": "createpluginregistry",
    "name": "createPluginRegistry",
    "module": "Workflow-pro",
    "description": "Creates a typed Plugin Registry with hook execution.",
    "signature": "createPluginRegistry<THooks extends Record<string, (...args: never[])",
    "example": "createPluginRegistry(...)",
    "output": "..."
  },
  {
    "id": "registerplugin",
    "name": "registerPlugin",
    "module": "Workflow-pro",
    "description": "Registers a plugin into a plugin map.",
    "signature": "registerPlugin<THooks extends Record<string, (...args: never[])",
    "example": "registerPlugin(...)",
    "output": "..."
  },
  {
    "id": "executepluginhook",
    "name": "executePluginHook",
    "module": "Workflow-pro",
    "description": "Executes a named hook across all registered plugins, collecting return values.",
    "signature": "executePluginHook< THooks extends Record<string, (...args: never[])",
    "example": "executePluginHook(...)",
    "output": "..."
  }
];
