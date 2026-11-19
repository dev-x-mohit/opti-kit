export interface UtilityMeta {
  id: string;
  name: string;
  module: string;
  description: string;
  signature: string;
  example: string;
  output: string;
  benchmark?: {
    opti?: string;
    lodash?: string;
    multiplier: string | number;
    winner?: 'OptiKit' | 'Lodash';
    optikitOps?: number;
    lodashOps?: number;
  };
}

export const utilitiesData: UtilityMeta[] = [
  {
    "id": "chunk",
    "name": "chunk",
    "module": "Array",
    "description": "Splits an array into chunks of a specified size.",
    "signature": "chunk(...): T[][]",
    "example": "chunk(...)",
    "output": "..."
  },
  {
    "id": "unique",
    "name": "unique",
    "module": "Array",
    "description": "Returns a new array with unique values.",
    "signature": "unique(...): T[]",
    "example": "unique(...)",
    "output": "..."
  },
  {
    "id": "difference",
    "name": "difference",
    "module": "Array",
    "description": "Returns the elements in the first array that are not present in any of the other arrays.",
    "signature": "difference(...): T[]",
    "example": "difference(...)",
    "output": "..."
  },
  {
    "id": "intersection",
    "name": "intersection",
    "module": "Array",
    "description": "Returns the intersection of multiple arrays.",
    "signature": "intersection(...): T[]",
    "example": "intersection(...)",
    "output": "..."
  },
  {
    "id": "groupby",
    "name": "groupBy",
    "module": "Array",
    "description": "Groups array elements based on a key returned by the iterator function.",
    "signature": "groupBy(...): any",
    "example": "groupBy(...)",
    "output": "..."
  },
  {
    "id": "shuffle",
    "name": "shuffle",
    "module": "Array",
    "description": "Shuffles an array using the Fisher-Yates algorithm without modifying the original.",
    "signature": "shuffle(...): T[]",
    "example": "shuffle(...)",
    "output": "..."
  },
  {
    "id": "sample",
    "name": "sample",
    "module": "Array",
    "description": "Returns a random element from an array.",
    "signature": "sample(...): T | undefined",
    "example": "sample(...)",
    "output": "..."
  },
  {
    "id": "uniqueby",
    "name": "uniqueBy",
    "module": "Array",
    "description": "Returns a duplicate-free version of an array, based on a custom key or mapping function.",
    "signature": "uniqueBy(...): any",
    "example": "uniqueBy(...)",
    "output": "..."
  },
  {
    "id": "flatten",
    "name": "flatten",
    "module": "Array",
    "description": "Flattens an array of arrays by one level.",
    "signature": "flatten(...): T[]",
    "example": "flatten(...)",
    "output": "..."
  },
  {
    "id": "countby",
    "name": "countBy",
    "module": "Array",
    "description": "Creates an object composed of keys generated from the results of running each element of collection thru iteratee.",
    "signature": "countBy(...): any",
    "example": "countBy(...)",
    "output": "..."
  },
  {
    "id": "compact",
    "name": "compact",
    "module": "Array",
    "description": "Creates an array with all falsy values removed.",
    "signature": "compact(...): Exclude<T, false | null | 0 | \"\" | undefined>[]",
    "example": "compact(...)",
    "output": "..."
  },
  {
    "id": "drop",
    "name": "drop",
    "module": "Array",
    "description": "Creates a slice of array with n elements dropped from the beginning.",
    "signature": "drop(...): T[]",
    "example": "drop(...)",
    "output": "..."
  },
  {
    "id": "dropright",
    "name": "dropRight",
    "module": "Array",
    "description": "Creates a slice of array with n elements dropped from the end.",
    "signature": "dropRight(...): T[]",
    "example": "dropRight(...)",
    "output": "..."
  },
  {
    "id": "take",
    "name": "take",
    "module": "Array",
    "description": "Creates a slice of array with n elements taken from the beginning.",
    "signature": "take(...): T[]",
    "example": "take(...)",
    "output": "..."
  },
  {
    "id": "takeright",
    "name": "takeRight",
    "module": "Array",
    "description": "Creates a slice of array with n elements taken from the end.",
    "signature": "takeRight(...): T[]",
    "example": "takeRight(...)",
    "output": "..."
  },
  {
    "id": "initial",
    "name": "initial",
    "module": "Array",
    "description": "Gets all but the last element of array.",
    "signature": "initial(...): T[]",
    "example": "initial(...)",
    "output": "..."
  },
  {
    "id": "last",
    "name": "last",
    "module": "Array",
    "description": "Gets the last element of array.",
    "signature": "last(...): T | undefined",
    "example": "last(...)",
    "output": "..."
  },
  {
    "id": "first",
    "name": "first",
    "module": "Array",
    "description": "Gets the first element of array.",
    "signature": "first(...): T | undefined",
    "example": "first(...)",
    "output": "..."
  },
  {
    "id": "zip",
    "name": "zip",
    "module": "Array",
    "description": "Creates an array of grouped elements, the first of which contains the first elements of the given arrays.",
    "signature": "zip(...): [T1 | undefined, T2 | undefined][]",
    "example": "zip(...)",
    "output": "..."
  },
  {
    "id": "unzip",
    "name": "unzip",
    "module": "Array",
    "description": "Unzips an array of grouped elements into two arrays.",
    "signature": "unzip(...): [T1[], T2[]]",
    "example": "unzip(...)",
    "output": "..."
  },
  {
    "id": "union",
    "name": "union",
    "module": "Array",
    "description": "Creates an array of unique values, in order, from all given arrays.",
    "signature": "union(...): T[]",
    "example": "union(...)",
    "output": "..."
  },
  {
    "id": "partition",
    "name": "partition",
    "module": "Array",
    "description": "Splits an array into two groups: those that pass the predicate, and those that don't.",
    "signature": "partition(...): [T[], T[]]",
    "example": "partition(...)",
    "output": "..."
  },
  {
    "id": "without",
    "name": "without",
    "module": "Array",
    "description": "Creates an array excluding all given values.",
    "signature": "without(...): T[]",
    "example": "without(...)",
    "output": "..."
  },
  {
    "id": "reject",
    "name": "reject",
    "module": "Array",
    "description": "The opposite of filter; this method returns the elements of collection that predicate does not return truthy for.",
    "signature": "reject(...): T[]",
    "example": "reject(...)",
    "output": "..."
  },
  {
    "id": "keyby",
    "name": "keyBy",
    "module": "Array",
    "description": "Creates an object composed of keys generated from the results of running each element of array thru iteratee.",
    "signature": "keyBy(...): Record<string | number, T>",
    "example": "keyBy(...)",
    "output": "..."
  },
  {
    "id": "nth",
    "name": "nth",
    "module": "Array",
    "description": "Gets the element at index n of array. If n is negative, the nth element from the end is returned.",
    "signature": "nth(...): T | undefined",
    "example": "nth(...)",
    "output": "..."
  },
  {
    "id": "samplesize",
    "name": "sampleSize",
    "module": "Array",
    "description": "Gets n random elements at unique keys from array up to the size of array.",
    "signature": "sampleSize(...): T[]",
    "example": "sampleSize(...)",
    "output": "..."
  },
  {
    "id": "sortby",
    "name": "sortBy",
    "module": "Array",
    "description": "Sorts an array based on an iteratee. Returns a new sorted array.",
    "signature": "sortBy(...): T[]",
    "example": "sortBy(...)",
    "output": "..."
  },
  {
    "id": "range",
    "name": "range",
    "module": "Array",
    "description": "Creates an array of numbers progressing from start up to, but not including, end.",
    "signature": "range(...): number[]",
    "example": "range(...)",
    "output": "..."
  },
  {
    "id": "rotate",
    "name": "rotate",
    "module": "Array",
    "description": "Rotates array elements by an offset position. Positive rotates right, negative rotates left.",
    "signature": "rotate(...): T[]",
    "example": "rotate(...)",
    "output": "..."
  },
  {
    "id": "minby",
    "name": "minBy",
    "module": "Array",
    "description": "Finds the element in an array that produces the minimum value when passed to iteratee.",
    "signature": "minBy(...): T | undefined",
    "example": "minBy(...)",
    "output": "..."
  },
  {
    "id": "maxby",
    "name": "maxBy",
    "module": "Array",
    "description": "Finds the element in an array that produces the maximum value when passed to iteratee.",
    "signature": "maxBy(...): T | undefined",
    "example": "maxBy(...)",
    "output": "..."
  },
  {
    "id": "sumby",
    "name": "sumBy",
    "module": "Array",
    "description": "Computes the sum of values produced by iteratee for each element in the array.",
    "signature": "sumBy(...): number",
    "example": "sumBy(...)",
    "output": "..."
  },
  {
    "id": "meanby",
    "name": "meanBy",
    "module": "Array",
    "description": "Computes the mean (average) of values produced by iteratee for each element in the array.",
    "signature": "meanBy(...): number",
    "example": "meanBy(...)",
    "output": "..."
  },
  {
    "id": "move",
    "name": "move",
    "module": "Array",
    "description": "Moves an element from one index to another in a new array.",
    "signature": "move(...): T[]",
    "example": "move(...)",
    "output": "..."
  },
  {
    "id": "swap",
    "name": "swap",
    "module": "Array",
    "description": "Swaps two elements in an array at specified indices in a new array.",
    "signature": "swap(...): T[]",
    "example": "swap(...)",
    "output": "..."
  },
  {
    "id": "intersperse",
    "name": "intersperse",
    "module": "Array",
    "description": "Places a separator element between each element of an array.",
    "signature": "intersperse(...): T[]",
    "example": "intersperse(...)",
    "output": "..."
  },
  {
    "id": "scan",
    "name": "scan",
    "module": "Array",
    "description": "Returns cumulative accumulation values (running reduce history) for an array.",
    "signature": "scan(...): any",
    "example": "scan(...)",
    "output": "..."
  },
  {
    "id": "pluck",
    "name": "pluck",
    "module": "Array",
    "description": "Extracts a property value from each object in an array.",
    "signature": "pluck(...): T[K][]",
    "example": "pluck(...)",
    "output": "..."
  },
  {
    "id": "flatdeep",
    "name": "flatDeep",
    "module": "Array",
    "description": "Recursively flattens an array up to the specified depth (default: Infinity).",
    "signature": "flatDeep(...): T[]",
    "example": "flatDeep(...)",
    "output": "..."
  },
  {
    "id": "differenceby",
    "name": "differenceBy",
    "module": "Array",
    "description": "Creates an array of array values not included in the other given array using an iteratee.",
    "signature": "differenceBy(...): any",
    "example": "differenceBy(...)",
    "output": "..."
  },
  {
    "id": "intersectionby",
    "name": "intersectionBy",
    "module": "Array",
    "description": "Creates an array of unique values that are included in all given arrays using an iteratee.",
    "signature": "intersectionBy(...): any",
    "example": "intersectionBy(...)",
    "output": "..."
  },
  {
    "id": "xor",
    "name": "xor",
    "module": "Array",
    "description": "Creates an array of unique values that is the symmetric difference of the given arrays.",
    "signature": "xor(...): T[]",
    "example": "xor(...)",
    "output": "..."
  },
  {
    "id": "dropwhile",
    "name": "dropWhile",
    "module": "Array",
    "description": "Creates a slice of array excluding elements dropped from the beginning until predicate returns falsy.",
    "signature": "dropWhile(...): T[]",
    "example": "dropWhile(...)",
    "output": "..."
  },
  {
    "id": "takewhile",
    "name": "takeWhile",
    "module": "Array",
    "description": "Creates a slice of array with elements taken from the beginning until predicate returns falsy.",
    "signature": "takeWhile(...): T[]",
    "example": "takeWhile(...)",
    "output": "..."
  },
  {
    "id": "unionby",
    "name": "unionBy",
    "module": "Array",
    "description": "Creates an array of unique values, in order, from all given arrays using an iteratee.",
    "signature": "unionBy(...): T[]",
    "example": "unionBy(...)",
    "output": "..."
  },
  {
    "id": "unionwith",
    "name": "unionWith",
    "module": "Array",
    "description": "Creates an array of unique values, in order, from all given arrays using a comparator.",
    "signature": "unionWith(...): T[]",
    "example": "unionWith(...)",
    "output": "..."
  },
  {
    "id": "differencewith",
    "name": "differenceWith",
    "module": "Array",
    "description": "Creates an array of array values not included in the other given arrays using a comparator.",
    "signature": "differenceWith(...): T[]",
    "example": "differenceWith(...)",
    "output": "..."
  },
  {
    "id": "intersectionwith",
    "name": "intersectionWith",
    "module": "Array",
    "description": "Creates an array of unique values that are included in all given arrays using a comparator.",
    "signature": "intersectionWith(...): T[]",
    "example": "intersectionWith(...)",
    "output": "..."
  },
  {
    "id": "xorby",
    "name": "xorBy",
    "module": "Array",
    "description": "Creates an array of unique values that is the symmetric difference of the given arrays using an iteratee.",
    "signature": "xorBy(...): T[]",
    "example": "xorBy(...)",
    "output": "..."
  },
  {
    "id": "xorwith",
    "name": "xorWith",
    "module": "Array",
    "description": "Creates an array of unique values that is the symmetric difference of the given arrays using a comparator.",
    "signature": "xorWith(...): T[]",
    "example": "xorWith(...)",
    "output": "..."
  },
  {
    "id": "zipobject",
    "name": "zipObject",
    "module": "Array",
    "description": "This method is like Object.fromEntries except that it accepts two arrays, one of property identifiers and one of corresponding values.",
    "signature": "zipObject(...): Record<K, V>",
    "example": "zipObject(...)",
    "output": "..."
  },
  {
    "id": "pull",
    "name": "pull",
    "module": "Array",
    "description": "Removes all given values from array using strict equality.",
    "signature": "pull(...): T[]",
    "example": "pull(...)",
    "output": "..."
  },
  {
    "id": "pullall",
    "name": "pullAll",
    "module": "Array",
    "description": "This method is like pull except that it accepts an array of values to remove.",
    "signature": "pullAll(...): T[]",
    "example": "pullAll(...)",
    "output": "..."
  },
  {
    "id": "pullat",
    "name": "pullAt",
    "module": "Array",
    "description": "Removes elements from array corresponding to indexes and returns an array of remaining elements.",
    "signature": "pullAt(...): T[]",
    "example": "pullAt(...)",
    "output": "..."
  },
  {
    "id": "delay",
    "name": "delay",
    "module": "Async",
    "description": "Returns a promise that resolves after a specified duration in milliseconds.",
    "signature": "delay(...): Promise<void>",
    "example": "delay(...)",
    "output": "..."
  },
  {
    "id": "debounce",
    "name": "debounce",
    "module": "Async",
    "description": "Creates a debounced function that delays invoking the passed function until after `ms`",
    "signature": "debounce(...): any",
    "example": "debounce(...)",
    "output": "..."
  },
  {
    "id": "throttle",
    "name": "throttle",
    "module": "Async",
    "description": "Creates a throttled function that only invokes the passed function at most once per every",
    "signature": "throttle(...): any",
    "example": "throttle(...)",
    "output": "..."
  },
  {
    "id": "once",
    "name": "once",
    "module": "Async",
    "description": "Restricts a function call to only execute once. Subsequent calls return the first result.",
    "signature": "once(...): T",
    "example": "once(...)",
    "output": "..."
  },
  {
    "id": "retry",
    "name": "retry",
    "module": "Async",
    "description": "Retries a promise-returning function a specified number of times with a delay between failures.",
    "signature": "retry(...): any",
    "example": "retry(...)",
    "output": "..."
  },
  {
    "id": "timeout",
    "name": "timeout",
    "module": "Async",
    "description": "Returns a promise that rejects if the provided promise does not resolve within the specified timeout.",
    "signature": "timeout(...): Promise<T>",
    "example": "timeout(...)",
    "output": "..."
  },
  {
    "id": "defer",
    "name": "defer",
    "module": "Async",
    "description": "Creates a deferred object containing a promise and its resolve/reject methods.",
    "signature": "defer(...): any",
    "example": "defer(...)",
    "output": "..."
  },
  {
    "id": "sequence",
    "name": "sequence",
    "module": "Async",
    "description": "Executes an array of async functions in sequence.",
    "signature": "sequence(...): Promise<T[]>",
    "example": "sequence(...)",
    "output": "..."
  },
  {
    "id": "trycatchasync",
    "name": "tryCatchAsync",
    "module": "Async",
    "description": "Wraps an async function and returns a tuple [error, result], safely catching errors.",
    "signature": "tryCatchAsync(...): any",
    "example": "tryCatchAsync(...)",
    "output": "..."
  },
  {
    "id": "pmap",
    "name": "pMap",
    "module": "Async",
    "description": "Maps over an array concurrently.",
    "signature": "pMap(...): any",
    "example": "pMap(...)",
    "output": "..."
  },
  {
    "id": "pfilter",
    "name": "pFilter",
    "module": "Async",
    "description": "Filters an array concurrently.",
    "signature": "pFilter(...): any",
    "example": "pFilter(...)",
    "output": "..."
  },
  {
    "id": "everyasync",
    "name": "everyAsync",
    "module": "Async",
    "description": "Asynchronously checks if every element satisfies the condition (sequential execution).",
    "signature": "everyAsync(...): any",
    "example": "everyAsync(...)",
    "output": "..."
  },
  {
    "id": "someasync",
    "name": "someAsync",
    "module": "Async",
    "description": "Asynchronously checks if some element satisfies the condition (sequential execution).",
    "signature": "someAsync(...): any",
    "example": "someAsync(...)",
    "output": "..."
  },
  {
    "id": "preduce",
    "name": "pReduce",
    "module": "Async",
    "description": "Asynchronously reduces an iterable in order.",
    "signature": "pReduce(...): any",
    "example": "pReduce(...)",
    "output": "..."
  },
  {
    "id": "pprops",
    "name": "pProps",
    "module": "Async",
    "description": "Resolves an object whose values are promises into an object with resolved values.",
    "signature": "pProps(...): any",
    "example": "pProps(...)",
    "output": "..."
  },
  {
    "id": "waituntil",
    "name": "waitUntil",
    "module": "Async",
    "description": "Waits until a predicate function evaluates to true or times out.",
    "signature": "waitUntil(...): any",
    "example": "waitUntil(...)",
    "output": "..."
  },
  {
    "id": "sleep",
    "name": "sleep",
    "module": "Async",
    "description": "Alias for delay - returns a promise that resolves after `ms` milliseconds.",
    "signature": "sleep(...): Promise<void>",
    "example": "sleep(...)",
    "output": "..."
  },
  {
    "id": "asyncpool",
    "name": "asyncPool",
    "module": "Async",
    "description": "Runs an array of promise-returning functions with a specified concurrency limit.",
    "signature": "asyncPool(...): any",
    "example": "asyncPool(...)",
    "output": "..."
  },
  {
    "id": "retrywithbackoff",
    "name": "retryWithBackoff",
    "module": "Async",
    "description": "Retries an async function with exponential backoff on failure.",
    "signature": "retryWithBackoff(...): any",
    "example": "retryWithBackoff(...)",
    "output": "..."
  },
  {
    "id": "stringtouint8array",
    "name": "stringToUint8Array",
    "module": "Binary",
    "description": "Converts a string to a Uint8Array.",
    "signature": "stringToUint8Array(...): Uint8Array",
    "example": "stringToUint8Array(...)",
    "output": "..."
  },
  {
    "id": "uint8arraytostring",
    "name": "uint8ArrayToString",
    "module": "Binary",
    "description": "Converts a Uint8Array back to a string.",
    "signature": "uint8ArrayToString(...): string",
    "example": "uint8ArrayToString(...)",
    "output": "..."
  },
  {
    "id": "buffertohex",
    "name": "bufferToHex",
    "module": "Binary",
    "description": "Converts an ArrayBuffer to a Hex string.",
    "signature": "bufferToHex(...): string",
    "example": "bufferToHex(...)",
    "output": "..."
  },
  {
    "id": "hextobuffer",
    "name": "hexToBuffer",
    "module": "Binary",
    "description": "Converts a Hex string to a Uint8Array.",
    "signature": "hexToBuffer(...): Uint8Array",
    "example": "hexToBuffer(...)",
    "output": "..."
  },
  {
    "id": "concatuint8arrays",
    "name": "concatUint8Arrays",
    "module": "Binary",
    "description": "Concatenates multiple Uint8Arrays into one.",
    "signature": "concatUint8Arrays(...): Uint8Array",
    "example": "concatUint8Arrays(...)",
    "output": "..."
  },
  {
    "id": "areuint8arraysequal",
    "name": "areUint8ArraysEqual",
    "module": "Binary",
    "description": "Compares two Uint8Arrays for equality.",
    "signature": "areUint8ArraysEqual(...): boolean",
    "example": "areUint8ArraysEqual(...)",
    "output": "..."
  },
  {
    "id": "base64tobuffer",
    "name": "base64ToBuffer",
    "module": "Binary",
    "description": "Converts a base64 string to a Uint8Array.",
    "signature": "base64ToBuffer(...): Uint8Array",
    "example": "base64ToBuffer(...)",
    "output": "..."
  },
  {
    "id": "buffertobase64",
    "name": "bufferToBase64",
    "module": "Binary",
    "description": "Converts a Uint8Array to a base64 string.",
    "signature": "bufferToBase64(...): string",
    "example": "bufferToBase64(...)",
    "output": "..."
  },
  {
    "id": "setbit",
    "name": "setBit",
    "module": "Bit",
    "description": "Sets the bit at the given position.",
    "signature": "setBit(...): number",
    "example": "setBit(...)",
    "output": "..."
  },
  {
    "id": "clearbit",
    "name": "clearBit",
    "module": "Bit",
    "description": "Clears the bit at the given position.",
    "signature": "clearBit(...): number",
    "example": "clearBit(...)",
    "output": "..."
  },
  {
    "id": "togglebit",
    "name": "toggleBit",
    "module": "Bit",
    "description": "Toggles the bit at the given position.",
    "signature": "toggleBit(...): number",
    "example": "toggleBit(...)",
    "output": "..."
  },
  {
    "id": "checkbit",
    "name": "checkBit",
    "module": "Bit",
    "description": "Checks if the bit at the given position is set (1).",
    "signature": "checkBit(...): boolean",
    "example": "checkBit(...)",
    "output": "..."
  },
  {
    "id": "updatebit",
    "name": "updateBit",
    "module": "Bit",
    "description": "Updates the bit at the given position with the specified value (0 or 1).",
    "signature": "updateBit(...): number",
    "example": "updateBit(...)",
    "output": "..."
  },
  {
    "id": "countsetbits",
    "name": "countSetBits",
    "module": "Bit",
    "description": "Counts the number of set bits (1s) in a number (Brian Kernighan’s Algorithm).",
    "signature": "countSetBits(...): number",
    "example": "countSetBits(...)",
    "output": "..."
  },
  {
    "id": "ispoweroftwo",
    "name": "isPowerOfTwo",
    "module": "Bit",
    "description": "Checks if a number is a power of 2.",
    "signature": "isPowerOfTwo(...): boolean",
    "example": "isPowerOfTwo(...)",
    "output": "..."
  },
  {
    "id": "isolaterightmostbit",
    "name": "isolateRightmostBit",
    "module": "Bit",
    "description": "Isolates the rightmost 1-bit.",
    "signature": "isolateRightmostBit(...): number",
    "example": "isolateRightmostBit(...)",
    "output": "..."
  },
  {
    "id": "isolaterightmostzerobit",
    "name": "isolateRightmostZeroBit",
    "module": "Bit",
    "description": "Gets the rightmost 0-bit.",
    "signature": "isolateRightmostZeroBit(...): number",
    "example": "isolateRightmostZeroBit(...)",
    "output": "..."
  },
  {
    "id": "clearrightmostbit",
    "name": "clearRightmostBit",
    "module": "Bit",
    "description": "Clears the rightmost 1-bit.",
    "signature": "clearRightmostBit(...): number",
    "example": "clearRightmostBit(...)",
    "output": "..."
  },
  {
    "id": "flipbits",
    "name": "flipBits",
    "module": "Bit",
    "description": "Flips all bits.",
    "signature": "flipBits(...): number",
    "example": "flipBits(...)",
    "output": "..."
  },
  {
    "id": "isbrowser",
    "name": "isBrowser",
    "module": "Browser",
    "description": "Checks if the code is running in a browser environment.",
    "signature": "isBrowser(...): boolean",
    "example": "isBrowser(...)",
    "output": "..."
  },
  {
    "id": "isserver",
    "name": "isServer",
    "module": "Browser",
    "description": "Checks if the code is running in a server environment (e.g. Node.js, SSR).",
    "signature": "isServer(...): boolean",
    "example": "isServer(...)",
    "output": "..."
  },
  {
    "id": "ischrome",
    "name": "isChrome",
    "module": "Browser",
    "description": "Checks if the current browser is Google Chrome.",
    "signature": "isChrome(...): boolean",
    "example": "isChrome(...)",
    "output": "..."
  },
  {
    "id": "isfirefox",
    "name": "isFirefox",
    "module": "Browser",
    "description": "Checks if the current browser is Mozilla Firefox.",
    "signature": "isFirefox(...): boolean",
    "example": "isFirefox(...)",
    "output": "..."
  },
  {
    "id": "issafari",
    "name": "isSafari",
    "module": "Browser",
    "description": "Checks if the current browser is Apple Safari.",
    "signature": "isSafari(...): boolean",
    "example": "isSafari(...)",
    "output": "..."
  },
  {
    "id": "isedge",
    "name": "isEdge",
    "module": "Browser",
    "description": "Checks if the current browser is Microsoft Edge.",
    "signature": "isEdge(...): boolean",
    "example": "isEdge(...)",
    "output": "..."
  },
  {
    "id": "isios",
    "name": "isIOS",
    "module": "Browser",
    "description": "Checks if the current operating system is iOS.",
    "signature": "isIOS(...): boolean",
    "example": "isIOS(...)",
    "output": "..."
  },
  {
    "id": "isandroid",
    "name": "isAndroid",
    "module": "Browser",
    "description": "Checks if the current operating system is Android.",
    "signature": "isAndroid(...): boolean",
    "example": "isAndroid(...)",
    "output": "..."
  },
  {
    "id": "ismobile",
    "name": "isMobile",
    "module": "Browser",
    "description": "Checks if the device is a mobile device (phone or tablet).",
    "signature": "isMobile(...): boolean",
    "example": "isMobile(...)",
    "output": "..."
  },
  {
    "id": "isdesktop",
    "name": "isDesktop",
    "module": "Browser",
    "description": "Checks if the device is a desktop.",
    "signature": "isDesktop(...): boolean",
    "example": "isDesktop(...)",
    "output": "..."
  },
  {
    "id": "istouchdevice",
    "name": "isTouchDevice",
    "module": "Browser",
    "description": "Checks if the device supports touch interaction.",
    "signature": "isTouchDevice(...): boolean",
    "example": "isTouchDevice(...)",
    "output": "..."
  },
  {
    "id": "supportswebgl",
    "name": "supportsWebGL",
    "module": "Browser",
    "description": "Checks if the browser supports WebGL.",
    "signature": "supportsWebGL(...): boolean",
    "example": "supportsWebGL(...)",
    "output": "..."
  },
  {
    "id": "supportsserviceworker",
    "name": "supportsServiceWorker",
    "module": "Browser",
    "description": "Checks if the browser supports Service Workers.",
    "signature": "supportsServiceWorker(...): boolean",
    "example": "supportsServiceWorker(...)",
    "output": "..."
  },
  {
    "id": "getdevicepixelratio",
    "name": "getDevicePixelRatio",
    "module": "Browser",
    "description": "Returns the device pixel ratio (DPR). Falls back to 1 on the server.",
    "signature": "getDevicePixelRatio(...): number",
    "example": "getDevicePixelRatio(...)",
    "output": "..."
  },
  {
    "id": "getpreferredlanguage",
    "name": "getPreferredLanguage",
    "module": "Browser",
    "description": "Returns the preferred language code of the client. Falls back to \"en\" on the server.",
    "signature": "getPreferredLanguage(...): string",
    "example": "getPreferredLanguage(...)",
    "output": "..."
  },
  {
    "id": "isonline",
    "name": "isOnline",
    "module": "Browser",
    "description": "Checks if the client has an active internet connection. Falls back to true on the server.",
    "signature": "isOnline(...): boolean",
    "example": "isOnline(...)",
    "output": "..."
  },
  {
    "id": "formatbytesize",
    "name": "formatByteSize",
    "module": "Byte Size",
    "description": "Byte Size Utilities",
    "signature": "formatByteSize(...): string",
    "example": "formatByteSize(...)",
    "output": "..."
  },
  {
    "id": "parsebytes",
    "name": "parseBytes",
    "module": "Byte Size",
    "description": "Utility function",
    "signature": "parseBytes(...): number",
    "example": "parseBytes(...)",
    "output": "..."
  },
  {
    "id": "bytestokb",
    "name": "bytesToKb",
    "module": "Byte Size",
    "description": "Utility function",
    "signature": "bytesToKb(...): number",
    "example": "bytesToKb(...)",
    "output": "..."
  },
  {
    "id": "bytestomb",
    "name": "bytesToMb",
    "module": "Byte Size",
    "description": "Utility function",
    "signature": "bytesToMb(...): number",
    "example": "bytesToMb(...)",
    "output": "..."
  },
  {
    "id": "bytestogb",
    "name": "bytesToGb",
    "module": "Byte Size",
    "description": "Utility function",
    "signature": "bytesToGb(...): number",
    "example": "bytesToGb(...)",
    "output": "..."
  },
  {
    "id": "memoizewithttl",
    "name": "memoizeWithTTL",
    "module": "Cache",
    "description": "Memoizes a function, but invalidates the cache after TTL (time-to-live) milliseconds.",
    "signature": "memoizeWithTTL(...): any",
    "example": "memoizeWithTTL(...)",
    "output": "..."
  },
  {
    "id": "lrucache",
    "name": "LRUCache",
    "module": "Cache",
    "description": "A lightweight Least-Recently-Used (LRU) cache class.",
    "signature": "class LRUCache",
    "example": "new LRUCache()",
    "output": "..."
  },
  {
    "id": "fastcrc32",
    "name": "fastCrc32",
    "module": "Checksum",
    "description": "Computes standard IEEE 802.3 CRC-32 checksum (returns unsigned 32-bit number).",
    "signature": "fastCrc32(...): number",
    "example": "fastCrc32(...)",
    "output": "..."
  },
  {
    "id": "crc32hex",
    "name": "crc32Hex",
    "module": "Checksum",
    "description": "Computes CRC-32 and returns a formatted 8-character lowercase hexadecimal string.",
    "signature": "crc32Hex(...): string",
    "example": "crc32Hex(...)",
    "output": "..."
  },
  {
    "id": "adler32",
    "name": "adler32",
    "module": "Checksum",
    "description": "Computes Adler-32 checksum (used in zlib RFC 1950).",
    "signature": "adler32(...): number",
    "example": "adler32(...)",
    "output": "..."
  },
  {
    "id": "adler32hex",
    "name": "adler32Hex",
    "module": "Checksum",
    "description": "Computes Adler-32 and returns an 8-character hex string.",
    "signature": "adler32Hex(...): string",
    "example": "adler32Hex(...)",
    "output": "..."
  },
  {
    "id": "fnv1a32",
    "name": "fnv1a32",
    "module": "Checksum",
    "description": "Fowler–Noll–Vo 32-bit (FNV-1a) hash function.",
    "signature": "fnv1a32(...): number",
    "example": "fnv1a32(...)",
    "output": "..."
  },
  {
    "id": "fnv1a32hex",
    "name": "fnv1a32Hex",
    "module": "Checksum",
    "description": "Computes FNV-1a 32-bit and returns a hex string.",
    "signature": "fnv1a32Hex(...): string",
    "example": "fnv1a32Hex(...)",
    "output": "..."
  },
  {
    "id": "fnv1a64",
    "name": "fnv1a64",
    "module": "Checksum",
    "description": "Fowler–Noll–Vo 64-bit (FNV-1a) hash using native BigInt.",
    "signature": "fnv1a64(...): string",
    "example": "fnv1a64(...)",
    "output": "..."
  },
  {
    "id": "murmur3",
    "name": "murmur3",
    "module": "Checksum",
    "description": "MurmurHash3 32-bit implementation.",
    "signature": "murmur3(...): number",
    "example": "murmur3(...)",
    "output": "..."
  },
  {
    "id": "encodebase58",
    "name": "encodeBase58",
    "module": "Codec",
    "description": "Encodes an input string or Uint8Array to a Base58 string (Bitcoin alphabet).",
    "signature": "encodeBase58(...): string",
    "example": "encodeBase58(...)",
    "output": "..."
  },
  {
    "id": "decodebase58",
    "name": "decodeBase58",
    "module": "Codec",
    "description": "Decodes a Base58 string back to bytes or string.",
    "signature": "decodeBase58(...): string | Uint8Array",
    "example": "decodeBase58(...)",
    "output": "..."
  },
  {
    "id": "encodebase62",
    "name": "encodeBase62",
    "module": "Codec",
    "description": "Encodes an integer or BigInt to a Base62 string (alphanumeric [0-9a-zA-Z]).",
    "signature": "encodeBase62(...): string",
    "example": "encodeBase62(...)",
    "output": "..."
  },
  {
    "id": "decodebase62",
    "name": "decodeBase62",
    "module": "Codec",
    "description": "Decodes a Base62 string into a BigInt integer.",
    "signature": "decodeBase62(...): bigint",
    "example": "decodeBase62(...)",
    "output": "..."
  },
  {
    "id": "encodebase32",
    "name": "encodeBase32",
    "module": "Codec",
    "description": "Encodes input to RFC 4648 Base32 (used in 2FA/TOTP secret keys).",
    "signature": "encodeBase32(...): string",
    "example": "encodeBase32(...)",
    "output": "..."
  },
  {
    "id": "decodebase32",
    "name": "decodeBase32",
    "module": "Codec",
    "description": "Decodes an RFC 4648 Base32 string.",
    "signature": "decodeBase32(...): string | Uint8Array",
    "example": "decodeBase32(...)",
    "output": "..."
  },
  {
    "id": "generateshortid",
    "name": "generateShortId",
    "module": "Codec",
    "description": "Generates a cryptographically random, URL-friendly short identifier.",
    "signature": "generateShortId(...): string",
    "example": "generateShortId(...)",
    "output": "..."
  },
  {
    "id": "urlsafebase64encode",
    "name": "urlSafeBase64Encode",
    "module": "Codec",
    "description": "Encodes a string into URL-Safe Base64 (RFC 4648 §5).",
    "signature": "urlSafeBase64Encode(...): string",
    "example": "urlSafeBase64Encode(...)",
    "output": "..."
  },
  {
    "id": "urlsafebase64decode",
    "name": "urlSafeBase64Decode",
    "module": "Codec",
    "description": "Decodes a URL-Safe Base64 string.",
    "signature": "urlSafeBase64Decode(...): string",
    "example": "urlSafeBase64Decode(...)",
    "output": "..."
  },
  {
    "id": "invertmap",
    "name": "invertMap",
    "module": "Collection",
    "description": "Creates a new object composed of the inverted keys and values of the given object.",
    "signature": "invertMap(...): Record<string, string>",
    "example": "invertMap(...)",
    "output": "..."
  },
  {
    "id": "setunion",
    "name": "setUnion",
    "module": "Collection",
    "description": "Returns a new Set containing all elements present in either Set A or Set B.",
    "signature": "setUnion(...): Set<T>",
    "example": "setUnion(...)",
    "output": "..."
  },
  {
    "id": "setintersection",
    "name": "setIntersection",
    "module": "Collection",
    "description": "Returns a new Set containing all elements present in both Set A and Set B.",
    "signature": "setIntersection(...): Set<T>",
    "example": "setIntersection(...)",
    "output": "..."
  },
  {
    "id": "setdifference",
    "name": "setDifference",
    "module": "Collection",
    "description": "Returns a new Set containing all elements present in Set A but not in Set B.",
    "signature": "setDifference(...): Set<T>",
    "example": "setDifference(...)",
    "output": "..."
  },
  {
    "id": "symmetricdifference",
    "name": "symmetricDifference",
    "module": "Collection",
    "description": "Returns a new Set containing elements present in either set but not both.",
    "signature": "symmetricDifference(...): Set<T>",
    "example": "symmetricDifference(...)",
    "output": "..."
  },
  {
    "id": "mergemaps",
    "name": "mergeMaps",
    "module": "Collection",
    "description": "Merges two Maps into a new Map. Values from the second map overwrite the first.",
    "signature": "mergeMaps(...): Map<K, V>",
    "example": "mergeMaps(...)",
    "output": "..."
  },
  {
    "id": "frequencies",
    "name": "frequencies",
    "module": "Collection",
    "description": "Counts the frequency of each element in an array.",
    "signature": "frequencies(...): Map<T, number>",
    "example": "frequencies(...)",
    "output": "..."
  },
  {
    "id": "filtermap",
    "name": "filterMap",
    "module": "Collection",
    "description": "Maps and filters in a single pass. Returns only items where the callback does not return undefined.",
    "signature": "filterMap(...): R[]",
    "example": "filterMap(...)",
    "output": "..."
  },
  {
    "id": "maprecordvalues",
    "name": "mapRecordValues",
    "module": "Collection",
    "description": "Creates a new object with the same keys but with values transformed by the callback.",
    "signature": "mapRecordValues(...): any",
    "example": "mapRecordValues(...)",
    "output": "..."
  },
  {
    "id": "filterrecord",
    "name": "filterRecord",
    "module": "Collection",
    "description": "Creates a new object containing only the entries where the predicate returns true.",
    "signature": "filterRecord(...): any",
    "example": "filterRecord(...)",
    "output": "..."
  },
  {
    "id": "issubset",
    "name": "isSubset",
    "module": "Collection",
    "description": "Checks if a Set is a subset of another Set.",
    "signature": "isSubset(...): boolean",
    "example": "isSubset(...)",
    "output": "..."
  },
  {
    "id": "issuperset",
    "name": "isSuperset",
    "module": "Collection",
    "description": "Checks if a Set is a superset of another Set.",
    "signature": "isSuperset(...): boolean",
    "example": "isSuperset(...)",
    "output": "..."
  },
  {
    "id": "hextorgb",
    "name": "hexToRgb",
    "module": "Color Space",
    "description": "Converts Hex string to RGB object.",
    "signature": "hexToRgb(...): RGB | null",
    "example": "hexToRgb(...)",
    "output": "..."
  },
  {
    "id": "rgbtohex",
    "name": "rgbToHex",
    "module": "Color Space",
    "description": "Converts RGB object to Hex string.",
    "signature": "rgbToHex(...): string",
    "example": "rgbToHex(...)",
    "output": "..."
  },
  {
    "id": "rgbtohsl",
    "name": "rgbToHsl",
    "module": "Color Space",
    "description": "Converts RGB object to HSL object.",
    "signature": "rgbToHsl(...): HSL",
    "example": "rgbToHsl(...)",
    "output": "..."
  },
  {
    "id": "hsltorgb",
    "name": "hslToRgb",
    "module": "Color Space",
    "description": "Converts HSL object to RGB object.",
    "signature": "hslToRgb(...): RGB",
    "example": "hslToRgb(...)",
    "output": "..."
  },
  {
    "id": "rgbtohsv",
    "name": "rgbToHsv",
    "module": "Color Space",
    "description": "Converts RGB object to HSV object.",
    "signature": "rgbToHsv(...): HSV",
    "example": "rgbToHsv(...)",
    "output": "..."
  },
  {
    "id": "hsvtorgb",
    "name": "hsvToRgb",
    "module": "Color Space",
    "description": "Converts HSV object to RGB object.",
    "signature": "hsvToRgb(...): RGB",
    "example": "hsvToRgb(...)",
    "output": "..."
  },
  {
    "id": "luminance",
    "name": "luminance",
    "module": "Color Space",
    "description": "Calculates the relative luminance of a color.",
    "signature": "luminance(...): number",
    "example": "luminance(...)",
    "output": "..."
  },
  {
    "id": "contrast",
    "name": "contrast",
    "module": "Color Space",
    "description": "Calculates the contrast ratio between two colors.",
    "signature": "contrast(...): number",
    "example": "contrast(...)",
    "output": "..."
  },
  {
    "id": "isdark",
    "name": "isDark",
    "module": "Color Space",
    "description": "Checks if a color is perceived as dark.",
    "signature": "isDark(...): boolean",
    "example": "isDark(...)",
    "output": "..."
  },
  {
    "id": "hextorgb",
    "name": "hexToRgb",
    "module": "Color",
    "description": "Converts a hex color string to an RGB object. Returns null if invalid.",
    "signature": "hexToRgb(...): any",
    "example": "hexToRgb(...)",
    "output": "..."
  },
  {
    "id": "rgbtohex",
    "name": "rgbToHex",
    "module": "Color",
    "description": "Converts RGB integer components (0-255) to a Hex color string.",
    "signature": "rgbToHex(...): string",
    "example": "rgbToHex(...)",
    "output": "..."
  },
  {
    "id": "hsltorgb",
    "name": "hslToRgb",
    "module": "Color",
    "description": "Converts HSL values (h: 0-360, s: 0-100, l: 0-100) to an RGB object.",
    "signature": "hslToRgb(...): any",
    "example": "hslToRgb(...)",
    "output": "..."
  },
  {
    "id": "rgbtohsl",
    "name": "rgbToHsl",
    "module": "Color",
    "description": "Converts RGB components (0-255) to HSL values (h: 0-360, s: 0-100, l: 0-100).",
    "signature": "rgbToHsl(...): any",
    "example": "rgbToHsl(...)",
    "output": "..."
  },
  {
    "id": "hextohsl",
    "name": "hexToHsl",
    "module": "Color",
    "description": "Converts a hex color string to HSL values.",
    "signature": "hexToHsl(...): ",
    "example": "hexToHsl(...)",
    "output": "..."
  },
  {
    "id": "hsltohex",
    "name": "hslToHex",
    "module": "Color",
    "description": "Converts HSL values to a hex color string.",
    "signature": "hslToHex(...): string",
    "example": "hslToHex(...)",
    "output": "..."
  },
  {
    "id": "lighten",
    "name": "lighten",
    "module": "Color",
    "description": "Lightens a hex color by a given amount (0 to 1).",
    "signature": "lighten(...): string",
    "example": "lighten(...)",
    "output": "..."
  },
  {
    "id": "darken",
    "name": "darken",
    "module": "Color",
    "description": "Darkens a hex color by a given amount (0 to 1).",
    "signature": "darken(...): string",
    "example": "darken(...)",
    "output": "..."
  },
  {
    "id": "isvalidhex",
    "name": "isValidHex",
    "module": "Color",
    "description": "Validates whether a string is a valid hex color (3 or 6 characters, with or without #).",
    "signature": "isValidHex(...): boolean",
    "example": "isValidHex(...)",
    "output": "..."
  },
  {
    "id": "getcontrastratio",
    "name": "getContrastRatio",
    "module": "Color",
    "description": "Calculates the WCAG contrast ratio between two hex colors.",
    "signature": "getContrastRatio(...): number",
    "example": "getContrastRatio(...)",
    "output": "..."
  },
  {
    "id": "compresslzw",
    "name": "compressLZW",
    "module": "Compression",
    "description": "Compresses a text string using the Lempel-Ziv-Welch (LZW) algorithm.",
    "signature": "compressLZW(...): number[]",
    "example": "compressLZW(...)",
    "output": "..."
  },
  {
    "id": "decompresslzw",
    "name": "decompressLZW",
    "module": "Compression",
    "description": "Decompresses an LZW integer code array back into the original string.",
    "signature": "decompressLZW(...): string",
    "example": "decompressLZW(...)",
    "output": "..."
  },
  {
    "id": "compressrle",
    "name": "compressRLE",
    "module": "Compression",
    "description": "Run-Length Encoding (RLE) string compression.",
    "signature": "compressRLE(...): string",
    "example": "compressRLE(...)",
    "output": "..."
  },
  {
    "id": "deltaencode",
    "name": "deltaEncode",
    "module": "Compression",
    "description": "Delta encoding for numeric series. Converts absolute values to relative differences.",
    "signature": "deltaEncode(...): number[]",
    "example": "deltaEncode(...)",
    "output": "..."
  },
  {
    "id": "deltadecode",
    "name": "deltaDecode",
    "module": "Compression",
    "description": "Restores original numeric series from delta-encoded differences.",
    "signature": "deltaDecode(...): number[]",
    "example": "deltaDecode(...)",
    "output": "..."
  },
  {
    "id": "pmapseries",
    "name": "pMapSeries",
    "module": "Concurrency",
    "description": "Resolves promises sequentially.",
    "signature": "pMapSeries(...): any",
    "example": "pMapSeries(...)",
    "output": "..."
  },
  {
    "id": "pwaterfall",
    "name": "pWaterfall",
    "module": "Concurrency",
    "description": "Passes the result of each promise sequentially to the next.",
    "signature": "pWaterfall(...): any",
    "example": "pWaterfall(...)",
    "output": "..."
  },
  {
    "id": "mutex",
    "name": "Mutex",
    "module": "Concurrency",
    "description": "Promise-based mutex lock.",
    "signature": "class Mutex",
    "example": "new Mutex()",
    "output": "..."
  },
  {
    "id": "asyncqueue",
    "name": "AsyncQueue",
    "module": "Concurrency",
    "description": "Concurrency limited queue.",
    "signature": "class AsyncQueue",
    "example": "new AsyncQueue()",
    "output": "..."
  },
  {
    "id": "pwaitfor",
    "name": "pWaitFor",
    "module": "Concurrency",
    "description": "Returns a promise that resolves when a condition is met.",
    "signature": "pWaitFor(...): any",
    "example": "pWaitFor(...)",
    "output": "..."
  },
  {
    "id": "ptap",
    "name": "pTap",
    "module": "Concurrency",
    "description": "Taps into a promise chain without affecting its value.",
    "signature": "pTap(...): any",
    "example": "pTap(...)",
    "output": "..."
  },
  {
    "id": "presolveprops",
    "name": "pResolveProps",
    "module": "Concurrency",
    "description": "Resolves an object of promises.",
    "signature": "pResolveProps(...): any",
    "example": "pResolveProps(...)",
    "output": "..."
  },
  {
    "id": "isvalidcron",
    "name": "isValidCron",
    "module": "Cron",
    "description": "Validates whether a cron expression is syntactically valid (5 standard fields).",
    "signature": "isValidCron(...): boolean",
    "example": "isValidCron(...)",
    "output": "..."
  },
  {
    "id": "parsecron",
    "name": "parseCron",
    "module": "Cron",
    "description": "Parses a standard 5-part cron expression into integer arrays.",
    "signature": "parseCron(...): ParsedCron",
    "example": "parseCron(...)",
    "output": "..."
  },
  {
    "id": "getnextcrondate",
    "name": "getNextCronDate",
    "module": "Cron",
    "description": "Calculates the next occurrence Date matching the cron expression after a reference date.",
    "signature": "getNextCronDate(...): Date",
    "example": "getNextCronDate(...)",
    "output": "..."
  },
  {
    "id": "getnextcrondates",
    "name": "getNextCronDates",
    "module": "Cron",
    "description": "Returns the next N occurrence dates matching the cron expression.",
    "signature": "getNextCronDates(...): Date[]",
    "example": "getNextCronDates(...)",
    "output": "..."
  },
  {
    "id": "describecron",
    "name": "describeCron",
    "module": "Cron",
    "description": "Generates a human-friendly English description of a standard 5-part cron expression.",
    "signature": "describeCron(...): string",
    "example": "describeCron(...)",
    "output": "..."
  },
  {
    "id": "uuid",
    "name": "uuid",
    "module": "Crypto",
    "description": "Generates an RFC4122 v4 compliant UUID.",
    "signature": "uuid(...): string",
    "example": "uuid(...)",
    "output": "..."
  },
  {
    "id": "fnv1a",
    "name": "fnv1a",
    "module": "Crypto",
    "description": "Calculates a fast FNV-1a 32-bit non-cryptographic hash of a string.",
    "signature": "fnv1a(...): number",
    "example": "fnv1a(...)",
    "output": "..."
  },
  {
    "id": "generatetoken",
    "name": "generateToken",
    "module": "Crypto",
    "description": "Generates a cryptographically secure random token of a specified length (hexadecimal).",
    "signature": "generateToken(...): string",
    "example": "generateToken(...)",
    "output": "..."
  },
  {
    "id": "sha256",
    "name": "sha256",
    "module": "Crypto",
    "description": "Generates a SHA-256 hash of a string using Web Crypto API.",
    "signature": "sha256(...): Promise<string>",
    "example": "sha256(...)",
    "output": "..."
  },
  {
    "id": "sha1",
    "name": "sha1",
    "module": "Crypto",
    "description": "Generates a SHA-1 hash of a string using Web Crypto API.",
    "signature": "sha1(...): Promise<string>",
    "example": "sha1(...)",
    "output": "..."
  },
  {
    "id": "sha384",
    "name": "sha384",
    "module": "Crypto",
    "description": "Generates a SHA-384 hash of a string using Web Crypto API.",
    "signature": "sha384(...): Promise<string>",
    "example": "sha384(...)",
    "output": "..."
  },
  {
    "id": "sha512",
    "name": "sha512",
    "module": "Crypto",
    "description": "Generates a SHA-512 hash of a string using Web Crypto API.",
    "signature": "sha512(...): Promise<string>",
    "example": "sha512(...)",
    "output": "..."
  },
  {
    "id": "hmacsha256",
    "name": "hmacSha256",
    "module": "Crypto",
    "description": "Generates an HMAC-SHA-256 signature for a message and a secret key using Web Crypto API.",
    "signature": "hmacSha256(...): Promise<string>",
    "example": "hmacSha256(...)",
    "output": "..."
  },
  {
    "id": "randomint",
    "name": "randomInt",
    "module": "Crypto",
    "description": "Generates a cryptographically secure random integer between min and max (inclusive).",
    "signature": "randomInt(...): number",
    "example": "randomInt(...)",
    "output": "..."
  },
  {
    "id": "cyrb53",
    "name": "cyrb53",
    "module": "Crypto",
    "description": "Calculates a fast, 53-bit non-cryptographic string hash using the cyrb53 algorithm.",
    "signature": "cyrb53(...): number",
    "example": "cyrb53(...)",
    "output": "..."
  },
  {
    "id": "csvparse",
    "name": "csvParse",
    "module": "Csv",
    "description": "Parses a CSV/TSV string into an array of objects (if headers are present) or raw string arrays.",
    "signature": "csvParse(...): any",
    "example": "csvParse(...)",
    "output": "..."
  },
  {
    "id": "csvstringify",
    "name": "csvStringify",
    "module": "Csv",
    "description": "Stringifies an array of objects or an array of arrays into a CSV/TSV table.",
    "signature": "csvStringify(...): any",
    "example": "csvStringify(...)",
    "output": "..."
  },
  {
    "id": "isleapyear",
    "name": "isLeapYear",
    "module": "Date",
    "description": "Checks if a given year is a leap year.",
    "signature": "isLeapYear(...): boolean",
    "example": "isLeapYear(...)",
    "output": "..."
  },
  {
    "id": "daysinmonth",
    "name": "daysInMonth",
    "module": "Date",
    "description": "Returns the number of days in a given month (0-indexed: 0 = January, 11 = December).",
    "signature": "daysInMonth(...): number",
    "example": "daysInMonth(...)",
    "output": "..."
  },
  {
    "id": "diffindays",
    "name": "diffInDays",
    "module": "Date",
    "description": "Calculates the difference in days between two Date instances.",
    "signature": "diffInDays(...): number",
    "example": "diffInDays(...)",
    "output": "..."
  },
  {
    "id": "relativetime",
    "name": "relativeTime",
    "module": "Date",
    "description": "Formats a date relative to a base date (defaults to now) into a human-readable string.",
    "signature": "relativeTime(...): string",
    "example": "relativeTime(...)",
    "output": "..."
  },
  {
    "id": "isvaliddate",
    "name": "isValidDate",
    "module": "Date",
    "description": "Checks if a value is a valid Date object.",
    "signature": "isValidDate(...): boolean",
    "example": "isValidDate(...)",
    "output": "..."
  },
  {
    "id": "adddays",
    "name": "addDays",
    "module": "Date",
    "description": "Adds a specified number of days to a date.",
    "signature": "addDays(...): Date",
    "example": "addDays(...)",
    "output": "..."
  },
  {
    "id": "subdays",
    "name": "subDays",
    "module": "Date",
    "description": "Subtracts a specified number of days from a date.",
    "signature": "subDays(...): Date",
    "example": "subDays(...)",
    "output": "..."
  },
  {
    "id": "addmonths",
    "name": "addMonths",
    "module": "Date",
    "description": "Adds a specified number of months to a date.",
    "signature": "addMonths(...): Date",
    "example": "addMonths(...)",
    "output": "..."
  },
  {
    "id": "submonths",
    "name": "subMonths",
    "module": "Date",
    "description": "Subtracts a specified number of months from a date.",
    "signature": "subMonths(...): Date",
    "example": "subMonths(...)",
    "output": "..."
  },
  {
    "id": "addyears",
    "name": "addYears",
    "module": "Date",
    "description": "Adds a specified number of years to a date.",
    "signature": "addYears(...): Date",
    "example": "addYears(...)",
    "output": "..."
  },
  {
    "id": "subyears",
    "name": "subYears",
    "module": "Date",
    "description": "Subtracts a specified number of years from a date.",
    "signature": "subYears(...): Date",
    "example": "subYears(...)",
    "output": "..."
  },
  {
    "id": "isbefore",
    "name": "isBefore",
    "module": "Date",
    "description": "Checks if the first date is before the second date.",
    "signature": "isBefore(...): boolean",
    "example": "isBefore(...)",
    "output": "..."
  },
  {
    "id": "isafter",
    "name": "isAfter",
    "module": "Date",
    "description": "Checks if the first date is after the second date.",
    "signature": "isAfter(...): boolean",
    "example": "isAfter(...)",
    "output": "..."
  },
  {
    "id": "issameday",
    "name": "isSameDay",
    "module": "Date",
    "description": "Checks if two dates are on the same calendar day.",
    "signature": "isSameDay(...): boolean",
    "example": "isSameDay(...)",
    "output": "..."
  },
  {
    "id": "isweekend",
    "name": "isWeekend",
    "module": "Date",
    "description": "Checks if a date falls on a weekend (Saturday or Sunday).",
    "signature": "isWeekend(...): boolean",
    "example": "isWeekend(...)",
    "output": "..."
  },
  {
    "id": "startofday",
    "name": "startOfDay",
    "module": "Date",
    "description": "Returns a new date at the start of the given date's day (00:00:00.000).",
    "signature": "startOfDay(...): Date",
    "example": "startOfDay(...)",
    "output": "..."
  },
  {
    "id": "endofday",
    "name": "endOfDay",
    "module": "Date",
    "description": "Returns a new date at the end of the given date's day (23:59:59.999).",
    "signature": "endOfDay(...): Date",
    "example": "endOfDay(...)",
    "output": "..."
  },
  {
    "id": "startofmonth",
    "name": "startOfMonth",
    "module": "Date",
    "description": "Returns a new date at the start of the given date's month.",
    "signature": "startOfMonth(...): Date",
    "example": "startOfMonth(...)",
    "output": "..."
  },
  {
    "id": "endofmonth",
    "name": "endOfMonth",
    "module": "Date",
    "description": "Returns a new date at the end of the given date's month.",
    "signature": "endOfMonth(...): Date",
    "example": "endOfMonth(...)",
    "output": "..."
  },
  {
    "id": "formatdate",
    "name": "formatDate",
    "module": "Date",
    "description": "Simple wrapper for Intl.DateTimeFormat to format dates easily.",
    "signature": "formatDate(...): any",
    "example": "formatDate(...)",
    "output": "..."
  },
  {
    "id": "deepfreeze",
    "name": "deepFreeze",
    "module": "Deep",
    "description": "Deep Object Operations",
    "signature": "deepFreeze(...): Readonly<T>",
    "example": "deepFreeze(...)",
    "output": "..."
  },
  {
    "id": "deepseal",
    "name": "deepSeal",
    "module": "Deep",
    "description": "Utility function",
    "signature": "deepSeal(...): T",
    "example": "deepSeal(...)",
    "output": "..."
  },
  {
    "id": "flattendeepobject",
    "name": "flattenDeepObject",
    "module": "Deep",
    "description": "Utility function",
    "signature": "flattenDeepObject(...): Record<string, any>",
    "example": "flattenDeepObject(...)",
    "output": "..."
  },
  {
    "id": "unflattenobject",
    "name": "unflattenObject",
    "module": "Deep",
    "description": "Utility function",
    "signature": "unflattenObject(...): Record<string, any>",
    "example": "unflattenObject(...)",
    "output": "..."
  },
  {
    "id": "deepmapkeys",
    "name": "deepMapKeys",
    "module": "Deep",
    "description": "Utility function",
    "signature": "deepMapKeys(...): any",
    "example": "deepMapKeys(...)",
    "output": "..."
  },
  {
    "id": "deepmapvalues",
    "name": "deepMapValues",
    "module": "Deep",
    "description": "Utility function",
    "signature": "deepMapValues(...): any",
    "example": "deepMapValues(...)",
    "output": "..."
  },
  {
    "id": "deepdiff",
    "name": "deepDiff",
    "module": "Deep",
    "description": "Utility function",
    "signature": "deepDiff(...): Record<string, any>",
    "example": "deepDiff(...)",
    "output": "..."
  },
  {
    "id": "deepomit",
    "name": "deepOmit",
    "module": "Deep",
    "description": "Utility function",
    "signature": "deepOmit(...): any",
    "example": "deepOmit(...)",
    "output": "..."
  },
  {
    "id": "diffobjects",
    "name": "diffObjects",
    "module": "Diff",
    "description": "Recursively diffs two objects and returns added, removed, and updated fields.",
    "signature": "diffObjects(...): ObjectDiff",
    "example": "diffObjects(...)",
    "output": "..."
  },
  {
    "id": "patchobject",
    "name": "patchObject",
    "module": "Diff",
    "description": "Applies an ObjectDiff to a target object and returns the resulting object.",
    "signature": "patchObject(...): T",
    "example": "patchObject(...)",
    "output": "..."
  },
  {
    "id": "diffarrays",
    "name": "diffArrays",
    "module": "Diff",
    "description": "Compares two arrays and produces added, removed, and unchanged elements.",
    "signature": "diffArrays(...): ArrayDiff<T>",
    "example": "diffArrays(...)",
    "output": "..."
  },
  {
    "id": "createjsonpatch",
    "name": "createJsonPatch",
    "module": "Diff",
    "description": "Generates an RFC 6902 JSON Patch representing the changes from original to target.",
    "signature": "createJsonPatch(...): JsonPatchOperation[]",
    "example": "createJsonPatch(...)",
    "output": "..."
  },
  {
    "id": "applyjsonpatch",
    "name": "applyJsonPatch",
    "module": "Diff",
    "description": "Applies an RFC 6902 JSON Patch to a document and returns a new document.",
    "signature": "applyJsonPatch(...): T",
    "example": "applyJsonPatch(...)",
    "output": "..."
  },
  {
    "id": "diffwords",
    "name": "diffWords",
    "module": "Diff",
    "description": "Computes a word-by-word diff between two text strings.",
    "signature": "diffWords(...): TextDiffPart[]",
    "example": "diffWords(...)",
    "output": "..."
  },
  {
    "id": "copytoclipboard",
    "name": "copyToClipboard",
    "module": "Dom",
    "description": "Safe client-side clipboard writer. Returns true if successful, false otherwise.",
    "signature": "copyToClipboard(...): Promise<boolean>",
    "example": "copyToClipboard(...)",
    "output": "..."
  },
  {
    "id": "getqueryparams",
    "name": "getQueryParams",
    "module": "Dom",
    "description": "Returns a key-value record of query parameters from a URL or window.location.",
    "signature": "getQueryParams(...): Record<string, string>",
    "example": "getQueryParams(...)",
    "output": "..."
  },
  {
    "id": "scrolltotop",
    "name": "scrollToTop",
    "module": "Dom",
    "description": "Smoothly scrolls the window to the top.",
    "signature": "scrollToTop(...): void",
    "example": "scrollToTop(...)",
    "output": "..."
  },
  {
    "id": "getscrollposition",
    "name": "getScrollPosition",
    "module": "Dom",
    "description": "Gets the current scroll position of the window.",
    "signature": "getScrollPosition(...): ",
    "example": "getScrollPosition(...)",
    "output": "..."
  },
  {
    "id": "iselementvisible",
    "name": "isElementVisible",
    "module": "Dom",
    "description": "Checks if a given HTML element is currently visible within the viewport.",
    "signature": "isElementVisible(...): boolean",
    "example": "isElementVisible(...)",
    "output": "..."
  },
  {
    "id": "addclass",
    "name": "addClass",
    "module": "Dom",
    "description": "Safely adds a CSS class to an element.",
    "signature": "addClass(...): void",
    "example": "addClass(...)",
    "output": "..."
  },
  {
    "id": "removeclass",
    "name": "removeClass",
    "module": "Dom",
    "description": "Safely removes a CSS class from an element.",
    "signature": "removeClass(...): void",
    "example": "removeClass(...)",
    "output": "..."
  },
  {
    "id": "toggleclass",
    "name": "toggleClass",
    "module": "Dom",
    "description": "Safely toggles a CSS class on an element.",
    "signature": "toggleClass(...): void",
    "example": "toggleClass(...)",
    "output": "..."
  },
  {
    "id": "hasclass",
    "name": "hasClass",
    "module": "Dom",
    "description": "Checks if an element has a specific CSS class.",
    "signature": "hasClass(...): boolean",
    "example": "hasClass(...)",
    "output": "..."
  },
  {
    "id": "createelement",
    "name": "createElement",
    "module": "Dom",
    "description": "Creates a DOM element with optional attributes and text content.",
    "signature": "createElement(...): any",
    "example": "createElement(...)",
    "output": "..."
  },
  {
    "id": "removeelement",
    "name": "removeElement",
    "module": "Dom",
    "description": "Safely removes an element from the DOM.",
    "signature": "removeElement(...): void",
    "example": "removeElement(...)",
    "output": "..."
  },
  {
    "id": "setcookie",
    "name": "setCookie",
    "module": "Dom",
    "description": "Sets a cookie in the browser environment.",
    "signature": "setCookie(...): void",
    "example": "setCookie(...)",
    "output": "..."
  },
  {
    "id": "getcookie",
    "name": "getCookie",
    "module": "Dom",
    "description": "Gets a cookie value by name in the browser environment.",
    "signature": "getCookie(...): string | null",
    "example": "getCookie(...)",
    "output": "..."
  },
  {
    "id": "deletecookie",
    "name": "deleteCookie",
    "module": "Dom",
    "description": "Deletes a cookie by name in the browser environment.",
    "signature": "deleteCookie(...): void",
    "example": "deleteCookie(...)",
    "output": "..."
  },
  {
    "id": "stack",
    "name": "Stack",
    "module": "Ds",
    "description": "Standard LIFO (Last-In-First-Out) Stack.",
    "signature": "class Stack",
    "example": "new Stack()",
    "output": "..."
  },
  {
    "id": "queue",
    "name": "Queue",
    "module": "Ds",
    "description": "Standard FIFO (First-In-First-Out) Queue.",
    "signature": "class Queue",
    "example": "new Queue()",
    "output": "..."
  },
  {
    "id": "priorityqueue",
    "name": "PriorityQueue",
    "module": "Ds",
    "description": "Highly performant binary-heap-based Priority Queue.",
    "signature": "class PriorityQueue",
    "example": "new PriorityQueue()",
    "output": "..."
  },
  {
    "id": "bimap",
    "name": "BiMap",
    "module": "Ds",
    "description": "Bidirectional 1-to-1 Map mapping unique keys to unique values.",
    "signature": "class BiMap",
    "example": "new BiMap()",
    "output": "..."
  },
  {
    "id": "parseduration",
    "name": "parseDuration",
    "module": "Duration",
    "description": "Duration Utilities",
    "signature": "parseDuration(...): number",
    "example": "parseDuration(...)",
    "output": "..."
  },
  {
    "id": "formattimeduration",
    "name": "formatTimeDuration",
    "module": "Duration",
    "description": "Utility function",
    "signature": "formatTimeDuration(...): string",
    "example": "formatTimeDuration(...)",
    "output": "..."
  },
  {
    "id": "adddurations",
    "name": "addDurations",
    "module": "Duration",
    "description": "Utility function",
    "signature": "addDurations(...): string",
    "example": "addDurations(...)",
    "output": "..."
  },
  {
    "id": "subdurations",
    "name": "subDurations",
    "module": "Duration",
    "description": "Utility function",
    "signature": "subDurations(...): string",
    "example": "subDurations(...)",
    "output": "..."
  },
  {
    "id": "isdurationlonger",
    "name": "isDurationLonger",
    "module": "Duration",
    "description": "Utility function",
    "signature": "isDurationLonger(...): boolean",
    "example": "isDurationLonger(...)",
    "output": "..."
  },
  {
    "id": "isdurationshorter",
    "name": "isDurationShorter",
    "module": "Duration",
    "description": "Utility function",
    "signature": "isDurationShorter(...): boolean",
    "example": "isDurationShorter(...)",
    "output": "..."
  },
  {
    "id": "mstoticks",
    "name": "msToTicks",
    "module": "Duration",
    "description": "Utility function",
    "signature": "msToTicks(...): number",
    "example": "msToTicks(...)",
    "output": "..."
  },
  {
    "id": "tickstoms",
    "name": "ticksToMs",
    "module": "Duration",
    "description": "Utility function",
    "signature": "ticksToMs(...): number",
    "example": "ticksToMs(...)",
    "output": "..."
  },
  {
    "id": "linear",
    "name": "linear",
    "module": "Easing",
    "description": "Standard animation easing functions.",
    "signature": "linear(...): number",
    "example": "linear(...)",
    "output": "..."
  },
  {
    "id": "easeinquad",
    "name": "easeInQuad",
    "module": "Easing",
    "description": "Utility function",
    "signature": "easeInQuad(...): number",
    "example": "easeInQuad(...)",
    "output": "..."
  },
  {
    "id": "easeoutquad",
    "name": "easeOutQuad",
    "module": "Easing",
    "description": "Utility function",
    "signature": "easeOutQuad(...): number",
    "example": "easeOutQuad(...)",
    "output": "..."
  },
  {
    "id": "easeinoutquad",
    "name": "easeInOutQuad",
    "module": "Easing",
    "description": "Utility function",
    "signature": "easeInOutQuad(...): number",
    "example": "easeInOutQuad(...)",
    "output": "..."
  },
  {
    "id": "easeincubic",
    "name": "easeInCubic",
    "module": "Easing",
    "description": "Utility function",
    "signature": "easeInCubic(...): number",
    "example": "easeInCubic(...)",
    "output": "..."
  },
  {
    "id": "easeoutcubic",
    "name": "easeOutCubic",
    "module": "Easing",
    "description": "Utility function",
    "signature": "easeOutCubic(...): number",
    "example": "easeOutCubic(...)",
    "output": "..."
  },
  {
    "id": "easeinoutcubic",
    "name": "easeInOutCubic",
    "module": "Easing",
    "description": "Utility function",
    "signature": "easeInOutCubic(...): number",
    "example": "easeInOutCubic(...)",
    "output": "..."
  },
  {
    "id": "easeinquart",
    "name": "easeInQuart",
    "module": "Easing",
    "description": "Utility function",
    "signature": "easeInQuart(...): number",
    "example": "easeInQuart(...)",
    "output": "..."
  },
  {
    "id": "easeoutquart",
    "name": "easeOutQuart",
    "module": "Easing",
    "description": "Utility function",
    "signature": "easeOutQuart(...): number",
    "example": "easeOutQuart(...)",
    "output": "..."
  },
  {
    "id": "easeinoutquart",
    "name": "easeInOutQuart",
    "module": "Easing",
    "description": "Utility function",
    "signature": "easeInOutQuart(...): number",
    "example": "easeInOutQuart(...)",
    "output": "..."
  },
  {
    "id": "easeinquint",
    "name": "easeInQuint",
    "module": "Easing",
    "description": "Utility function",
    "signature": "easeInQuint(...): number",
    "example": "easeInQuint(...)",
    "output": "..."
  },
  {
    "id": "easeoutquint",
    "name": "easeOutQuint",
    "module": "Easing",
    "description": "Utility function",
    "signature": "easeOutQuint(...): number",
    "example": "easeOutQuint(...)",
    "output": "..."
  },
  {
    "id": "easeinoutquint",
    "name": "easeInOutQuint",
    "module": "Easing",
    "description": "Utility function",
    "signature": "easeInOutQuint(...): number",
    "example": "easeInOutQuint(...)",
    "output": "..."
  },
  {
    "id": "easeinsine",
    "name": "easeInSine",
    "module": "Easing",
    "description": "Utility function",
    "signature": "easeInSine(...): number",
    "example": "easeInSine(...)",
    "output": "..."
  },
  {
    "id": "easeoutsine",
    "name": "easeOutSine",
    "module": "Easing",
    "description": "Utility function",
    "signature": "easeOutSine(...): number",
    "example": "easeOutSine(...)",
    "output": "..."
  },
  {
    "id": "easeinoutsine",
    "name": "easeInOutSine",
    "module": "Easing",
    "description": "Utility function",
    "signature": "easeInOutSine(...): number",
    "example": "easeInOutSine(...)",
    "output": "..."
  },
  {
    "id": "easeinexpo",
    "name": "easeInExpo",
    "module": "Easing",
    "description": "Utility function",
    "signature": "easeInExpo(...): number",
    "example": "easeInExpo(...)",
    "output": "..."
  },
  {
    "id": "easeoutexpo",
    "name": "easeOutExpo",
    "module": "Easing",
    "description": "Utility function",
    "signature": "easeOutExpo(...): number",
    "example": "easeOutExpo(...)",
    "output": "..."
  },
  {
    "id": "easeinoutexpo",
    "name": "easeInOutExpo",
    "module": "Easing",
    "description": "Utility function",
    "signature": "easeInOutExpo(...): number",
    "example": "easeInOutExpo(...)",
    "output": "..."
  },
  {
    "id": "base64encode",
    "name": "base64Encode",
    "module": "Encoding",
    "description": "Encodes a string to Base64 format.",
    "signature": "base64Encode(...): string",
    "example": "base64Encode(...)",
    "output": "..."
  },
  {
    "id": "base64decode",
    "name": "base64Decode",
    "module": "Encoding",
    "description": "Decodes a Base64 string back to its original string format.",
    "signature": "base64Decode(...): string",
    "example": "base64Decode(...)",
    "output": "..."
  },
  {
    "id": "utf8encode",
    "name": "utf8Encode",
    "module": "Encoding",
    "description": "Encodes a string into a Uint8Array using UTF-8 encoding.",
    "signature": "utf8Encode(...): Uint8Array",
    "example": "utf8Encode(...)",
    "output": "..."
  },
  {
    "id": "utf8decode",
    "name": "utf8Decode",
    "module": "Encoding",
    "description": "Decodes a Uint8Array back into a string using UTF-8 decoding.",
    "signature": "utf8Decode(...): string",
    "example": "utf8Decode(...)",
    "output": "..."
  },
  {
    "id": "hexencode",
    "name": "hexEncode",
    "module": "Encoding",
    "description": "Encodes a string into a Hexadecimal format.",
    "signature": "hexEncode(...): string",
    "example": "hexEncode(...)",
    "output": "..."
  },
  {
    "id": "hexdecode",
    "name": "hexDecode",
    "module": "Encoding",
    "description": "Decodes a Hexadecimal string back into its original string format.",
    "signature": "hexDecode(...): string",
    "example": "hexDecode(...)",
    "output": "..."
  },
  {
    "id": "urlencode",
    "name": "urlEncode",
    "module": "Encoding",
    "description": "Safely encodes a URI component.",
    "signature": "urlEncode(...): string",
    "example": "urlEncode(...)",
    "output": "..."
  },
  {
    "id": "urldecode",
    "name": "urlDecode",
    "module": "Encoding",
    "description": "Safely decodes a URI component.",
    "signature": "urlDecode(...): string",
    "example": "urlDecode(...)",
    "output": "..."
  },
  {
    "id": "buffertohex",
    "name": "bufferToHex",
    "module": "Encoding",
    "description": "Converts a Uint8Array buffer into a hexadecimal string.",
    "signature": "bufferToHex(...): string",
    "example": "bufferToHex(...)",
    "output": "..."
  },
  {
    "id": "hextobuffer",
    "name": "hexToBuffer",
    "module": "Encoding",
    "description": "Converts a hexadecimal string into a Uint8Array buffer.",
    "signature": "hexToBuffer(...): Uint8Array",
    "example": "hexToBuffer(...)",
    "output": "..."
  },
  {
    "id": "codeerror",
    "name": "CodeError",
    "module": "Error",
    "description": "Custom Error class with a code property.",
    "signature": "class CodeError",
    "example": "new CodeError()",
    "output": "..."
  },
  {
    "id": "httperror",
    "name": "HttpError",
    "module": "Error",
    "description": "Custom Error class for HTTP errors.",
    "signature": "class HttpError",
    "example": "new HttpError()",
    "output": "..."
  },
  {
    "id": "normalizeerror",
    "name": "normalizeError",
    "module": "Error",
    "description": "Safely parses an unknown error into a standard Error object.",
    "signature": "normalizeError(...): Error",
    "example": "normalizeError(...)",
    "output": "..."
  },
  {
    "id": "geterrormessage",
    "name": "getErrorMessage",
    "module": "Error",
    "description": "Attempts to extract a user-friendly error message from an unknown error.",
    "signature": "getErrorMessage(...): string",
    "example": "getErrorMessage(...)",
    "output": "..."
  },
  {
    "id": "parsestacktrace",
    "name": "parseStackTrace",
    "module": "Error",
    "description": "Parses a stack trace string into an array of call site strings.",
    "signature": "parseStackTrace(...): string[]",
    "example": "parseStackTrace(...)",
    "output": "..."
  },
  {
    "id": "trycatch",
    "name": "tryCatch",
    "module": "Error",
    "description": "Wraps a function to catch synchronous exceptions and return them as a result tuple [error, result].",
    "signature": "tryCatch(...): [E | null, T | null]",
    "example": "tryCatch(...)",
    "output": "..."
  },
  {
    "id": "eventemitter",
    "name": "EventEmitter",
    "module": "Events",
    "description": "A lightweight, high-performance event emitter class for managing pub-sub events.",
    "signature": "class EventEmitter",
    "example": "new EventEmitter()",
    "output": "..."
  },
  {
    "id": "listen",
    "name": "listen",
    "module": "Events",
    "description": "Attaches an event listener to a target and returns a function to remove it.",
    "signature": "listen(...): any",
    "example": "listen(...)",
    "output": "..."
  },
  {
    "id": "listenonce",
    "name": "listenOnce",
    "module": "Events",
    "description": "Attaches a one-time event listener to a target. Returns a function to remove it early.",
    "signature": "listenOnce(...): any",
    "example": "listenOnce(...)",
    "output": "..."
  },
  {
    "id": "triggerevent",
    "name": "triggerEvent",
    "module": "Events",
    "description": "Triggers a custom event on a target with optional detail payload.",
    "signature": "triggerEvent(...): any",
    "example": "triggerEvent(...)",
    "output": "..."
  },
  {
    "id": "delegateevent",
    "name": "delegateEvent",
    "module": "Events",
    "description": "Attaches an event listener that delegates to a specific child selector.",
    "signature": "delegateEvent(...): any",
    "example": "delegateEvent(...)",
    "output": "..."
  },
  {
    "id": "waitforevent",
    "name": "waitForEvent",
    "module": "Events",
    "description": "Returns a promise that resolves when the specified event is fired on the target.",
    "signature": "waitForEvent(...): any",
    "example": "waitForEvent(...)",
    "output": "..."
  },
  {
    "id": "stopevent",
    "name": "stopEvent",
    "module": "Events",
    "description": "Prevents the default action and stops event propagation.",
    "signature": "stopEvent(...): void",
    "example": "stopEvent(...)",
    "output": "..."
  },
  {
    "id": "formatbytes",
    "name": "formatBytes",
    "module": "File",
    "description": "Formats a file size in bytes to a human-readable string.",
    "signature": "formatBytes(...): string",
    "example": "formatBytes(...)",
    "output": "..."
  },
  {
    "id": "getfileextension",
    "name": "getFileExtension",
    "module": "File",
    "description": "Extracts the extension from a file name.",
    "signature": "getFileExtension(...): string",
    "example": "getFileExtension(...)",
    "output": "..."
  },
  {
    "id": "getbasename",
    "name": "getBaseName",
    "module": "File",
    "description": "Gets the base name of a file (name without extension).",
    "signature": "getBaseName(...): string",
    "example": "getBaseName(...)",
    "output": "..."
  },
  {
    "id": "getmimetype",
    "name": "getMimeType",
    "module": "File",
    "description": "Attempts to guess the MIME type based on file extension.",
    "signature": "getMimeType(...): string | undefined",
    "example": "getMimeType(...)",
    "output": "..."
  },
  {
    "id": "isimage",
    "name": "isImage",
    "module": "File",
    "description": "Checks if a file name represents an image.",
    "signature": "isImage(...): boolean",
    "example": "isImage(...)",
    "output": "..."
  },
  {
    "id": "isvideo",
    "name": "isVideo",
    "module": "File",
    "description": "Checks if a file name represents a video.",
    "signature": "isVideo(...): boolean",
    "example": "isVideo(...)",
    "output": "..."
  },
  {
    "id": "isaudio",
    "name": "isAudio",
    "module": "File",
    "description": "Checks if a file name represents audio.",
    "signature": "isAudio(...): boolean",
    "example": "isAudio(...)",
    "output": "..."
  },
  {
    "id": "isdocument",
    "name": "isDocument",
    "module": "File",
    "description": "Checks if a file name represents a document.",
    "signature": "isDocument(...): boolean",
    "example": "isDocument(...)",
    "output": "..."
  },
  {
    "id": "readasdataurl",
    "name": "readAsDataURL",
    "module": "File",
    "description": "Reads a File or Blob as a Data URL. (Browser only)",
    "signature": "readAsDataURL(...): Promise<string>",
    "example": "readAsDataURL(...)",
    "output": "..."
  },
  {
    "id": "readastext",
    "name": "readAsText",
    "module": "File",
    "description": "Reads a File or Blob as Text. (Browser only)",
    "signature": "readAsText(...): Promise<string>",
    "example": "readAsText(...)",
    "output": "..."
  },
  {
    "id": "calculatesimpleinterest",
    "name": "calculateSimpleInterest",
    "module": "Finance",
    "description": "Financial Math Utilities",
    "signature": "calculateSimpleInterest(...): number",
    "example": "calculateSimpleInterest(...)",
    "output": "..."
  },
  {
    "id": "calculatecompoundinterest",
    "name": "calculateCompoundInterest",
    "module": "Finance",
    "description": "Utility function",
    "signature": "calculateCompoundInterest(...): number",
    "example": "calculateCompoundInterest(...)",
    "output": "..."
  },
  {
    "id": "calculatepmt",
    "name": "calculatePMT",
    "module": "Finance",
    "description": "Utility function",
    "signature": "calculatePMT(...): number",
    "example": "calculatePMT(...)",
    "output": "..."
  },
  {
    "id": "calculateroi",
    "name": "calculateROI",
    "module": "Finance",
    "description": "Utility function",
    "signature": "calculateROI(...): number",
    "example": "calculateROI(...)",
    "output": "..."
  },
  {
    "id": "calculatenpv",
    "name": "calculateNPV",
    "module": "Finance",
    "description": "Utility function",
    "signature": "calculateNPV(...): number",
    "example": "calculateNPV(...)",
    "output": "..."
  },
  {
    "id": "calculatecagr",
    "name": "calculateCAGR",
    "module": "Finance",
    "description": "Utility function",
    "signature": "calculateCAGR(...): number",
    "example": "calculateCAGR(...)",
    "output": "..."
  },
  {
    "id": "calculatemarkup",
    "name": "calculateMarkup",
    "module": "Finance",
    "description": "Utility function",
    "signature": "calculateMarkup(...): number",
    "example": "calculateMarkup(...)",
    "output": "..."
  },
  {
    "id": "calculatemargin",
    "name": "calculateMargin",
    "module": "Finance",
    "description": "Utility function",
    "signature": "calculateMargin(...): number",
    "example": "calculateMargin(...)",
    "output": "..."
  },
  {
    "id": "calculateamortization",
    "name": "calculateAmortization",
    "module": "Finance",
    "description": "Utility function",
    "signature": "calculateAmortization(...): ",
    "example": "calculateAmortization(...)",
    "output": "..."
  },
  {
    "id": "formatfinancecurrency",
    "name": "formatFinanceCurrency",
    "module": "Finance",
    "description": "Utility function",
    "signature": "formatFinanceCurrency(...): string",
    "example": "formatFinanceCurrency(...)",
    "output": "..."
  },
  {
    "id": "formatduration",
    "name": "formatDuration",
    "module": "Format",
    "description": "Formats a duration in milliseconds to a human-readable string.",
    "signature": "formatDuration(...): string",
    "example": "formatDuration(...)",
    "output": "..."
  },
  {
    "id": "formatphonenumber",
    "name": "formatPhoneNumber",
    "module": "Format",
    "description": "Formats a US phone number string.",
    "signature": "formatPhoneNumber(...): string",
    "example": "formatPhoneNumber(...)",
    "output": "..."
  },
  {
    "id": "formatcreditcardnumber",
    "name": "formatCreditCardNumber",
    "module": "Format",
    "description": "Formats a credit card number with spaces every 4 digits.",
    "signature": "formatCreditCardNumber(...): string",
    "example": "formatCreditCardNumber(...)",
    "output": "..."
  },
  {
    "id": "formatpercentage",
    "name": "formatPercentage",
    "module": "Format",
    "description": "Formats a number as a percentage string.",
    "signature": "formatPercentage(...): string",
    "example": "formatPercentage(...)",
    "output": "..."
  },
  {
    "id": "formatlistjoin",
    "name": "formatListJoin",
    "module": "Format",
    "description": "Joins an array of strings with a conjunction before the last item.",
    "signature": "formatListJoin(...): string",
    "example": "formatListJoin(...)",
    "output": "..."
  },
  {
    "id": "pluralize",
    "name": "pluralize",
    "module": "Format",
    "description": "Returns a count with a properly pluralized noun.",
    "signature": "pluralize(...): string",
    "example": "pluralize(...)",
    "output": "..."
  },
  {
    "id": "maskstring",
    "name": "maskString",
    "module": "Format",
    "description": "Masks a string, showing only the last N characters.",
    "signature": "maskString(...): string",
    "example": "maskString(...)",
    "output": "..."
  },
  {
    "id": "truncatemiddle",
    "name": "truncateMiddle",
    "module": "Format",
    "description": "Truncates a string in the middle, preserving the beginning and end.",
    "signature": "truncateMiddle(...): string",
    "example": "truncateMiddle(...)",
    "output": "..."
  },
  {
    "id": "formatwithseparator",
    "name": "formatWithSeparator",
    "module": "Format",
    "description": "Formats a number with a thousands separator.",
    "signature": "formatWithSeparator(...): string",
    "example": "formatWithSeparator(...)",
    "output": "..."
  },
  {
    "id": "statemachine",
    "name": "StateMachine",
    "module": "Fsm",
    "description": "Finite State Machine Utilities",
    "signature": "class StateMachine",
    "example": "new StateMachine()",
    "output": "..."
  },
  {
    "id": "createmachine",
    "name": "createMachine",
    "module": "Fsm",
    "description": "Utility function",
    "signature": "createMachine(...): StateMachine",
    "example": "createMachine(...)",
    "output": "..."
  },
  {
    "id": "transitionstate",
    "name": "transitionState",
    "module": "Fsm",
    "description": "Utility function",
    "signature": "transitionState(...): boolean",
    "example": "transitionState(...)",
    "output": "..."
  },
  {
    "id": "cantransition",
    "name": "canTransition",
    "module": "Fsm",
    "description": "Utility function",
    "signature": "canTransition(...): boolean",
    "example": "canTransition(...)",
    "output": "..."
  },
  {
    "id": "getmachinestate",
    "name": "getMachineState",
    "module": "Fsm",
    "description": "Utility function",
    "signature": "getMachineState(...): string",
    "example": "getMachineState(...)",
    "output": "..."
  },
  {
    "id": "getmachinehistory",
    "name": "getMachineHistory",
    "module": "Fsm",
    "description": "Utility function",
    "signature": "getMachineHistory(...): string[]",
    "example": "getMachineHistory(...)",
    "output": "..."
  },
  {
    "id": "identity",
    "name": "identity",
    "module": "Functional",
    "description": "Creates a function that returns its first argument.",
    "signature": "identity(...): T",
    "example": "identity(...)",
    "output": "..."
  },
  {
    "id": "flip",
    "name": "flip",
    "module": "Functional",
    "description": "Creates a function that invokes the provided function with its arguments reversed.",
    "signature": "flip(...): any",
    "example": "flip(...)",
    "output": "..."
  },
  {
    "id": "tap",
    "name": "tap",
    "module": "Functional",
    "description": "Invokes an interceptor function with a value, and then returns the value.",
    "signature": "tap(...): T",
    "example": "tap(...)",
    "output": "..."
  },
  {
    "id": "memoize",
    "name": "memoize",
    "module": "Functional",
    "description": "Creates a function that memoizes the result of a given function.",
    "signature": "memoize(...): any",
    "example": "memoize(...)",
    "output": "..."
  },
  {
    "id": "pipe",
    "name": "pipe",
    "module": "Functional",
    "description": "Performs left-to-right function composition.",
    "signature": "pipe(...): any",
    "example": "pipe(...)",
    "output": "..."
  },
  {
    "id": "compose",
    "name": "compose",
    "module": "Functional",
    "description": "Performs right-to-left function composition.",
    "signature": "compose(...): any",
    "example": "compose(...)",
    "output": "..."
  },
  {
    "id": "curry",
    "name": "curry",
    "module": "Functional",
    "description": "Creates a curried function.",
    "signature": "curry(...): any",
    "example": "curry(...)",
    "output": "..."
  },
  {
    "id": "partial",
    "name": "partial",
    "module": "Functional",
    "description": "Creates a function that invokes fn with partials prepended to the arguments it receives.",
    "signature": "partial(...): any",
    "example": "partial(...)",
    "output": "..."
  },
  {
    "id": "noop",
    "name": "noop",
    "module": "Functional",
    "description": "A no-operation function that does nothing.",
    "signature": "noop(...): void",
    "example": "noop(...)",
    "output": "..."
  },
  {
    "id": "constant",
    "name": "constant",
    "module": "Functional",
    "description": "Creates a function that always returns the same value.",
    "signature": "constant(...): () => T",
    "example": "constant(...)",
    "output": "..."
  },
  {
    "id": "not",
    "name": "not",
    "module": "Functional",
    "description": "Creates a function that negates the result of a predicate.",
    "signature": "not(...): any",
    "example": "not(...)",
    "output": "..."
  },
  {
    "id": "trampoline",
    "name": "trampoline",
    "module": "Functional",
    "description": "Trampoline for stack-safe recursion.",
    "signature": "trampoline(...): (...args: any[]) => T",
    "example": "trampoline(...)",
    "output": "..."
  },
  {
    "id": "juxt",
    "name": "juxt",
    "module": "Functional",
    "description": "Applies multiple functions to the same arguments and returns an array of results.",
    "signature": "juxt(...): any",
    "example": "juxt(...)",
    "output": "..."
  },
  {
    "id": "oncefn",
    "name": "onceFn",
    "module": "Functional",
    "description": "Creates a function that is restricted to being called only once.",
    "signature": "onceFn(...): T",
    "example": "onceFn(...)",
    "output": "..."
  },
  {
    "id": "distance2d",
    "name": "distance2D",
    "module": "Geometry",
    "description": "Calculates the Euclidean distance between two 2D points.",
    "signature": "distance2D(...): number",
    "example": "distance2D(...)",
    "output": "..."
  },
  {
    "id": "distance3d",
    "name": "distance3D",
    "module": "Geometry",
    "description": "Calculates the Euclidean distance between two 3D points.",
    "signature": "distance3D(...): number",
    "example": "distance3D(...)",
    "output": "..."
  },
  {
    "id": "midpoint",
    "name": "midpoint",
    "module": "Geometry",
    "description": "Calculates the midpoint between two 2D points.",
    "signature": "midpoint(...): ",
    "example": "midpoint(...)",
    "output": "..."
  },
  {
    "id": "anglebetween",
    "name": "angleBetween",
    "module": "Geometry",
    "description": "Calculates the angle in radians between two 2D points.",
    "signature": "angleBetween(...): number",
    "example": "angleBetween(...)",
    "output": "..."
  },
  {
    "id": "rotatepoint",
    "name": "rotatePoint",
    "module": "Geometry",
    "description": "Rotates a 2D point around an origin point by a given angle in radians.",
    "signature": "rotatePoint(...): any",
    "example": "rotatePoint(...)",
    "output": "..."
  },
  {
    "id": "circlearea",
    "name": "circleArea",
    "module": "Geometry",
    "description": "Calculates the area of a circle given its radius.",
    "signature": "circleArea(...): number",
    "example": "circleArea(...)",
    "output": "..."
  },
  {
    "id": "circlecircumference",
    "name": "circleCircumference",
    "module": "Geometry",
    "description": "Calculates the circumference of a circle given its radius.",
    "signature": "circleCircumference(...): number",
    "example": "circleCircumference(...)",
    "output": "..."
  },
  {
    "id": "rectanglearea",
    "name": "rectangleArea",
    "module": "Geometry",
    "description": "Calculates the area of a rectangle.",
    "signature": "rectangleArea(...): number",
    "example": "rectangleArea(...)",
    "output": "..."
  },
  {
    "id": "trianglearea",
    "name": "triangleArea",
    "module": "Geometry",
    "description": "Calculates the area of a triangle given its base and height.",
    "signature": "triangleArea(...): number",
    "example": "triangleArea(...)",
    "output": "..."
  },
  {
    "id": "bfs",
    "name": "bfs",
    "module": "Graph",
    "description": "Performs Breadth-First Search (BFS) on a graph.",
    "signature": "bfs(...): string[]",
    "example": "bfs(...)",
    "output": "..."
  },
  {
    "id": "dfs",
    "name": "dfs",
    "module": "Graph",
    "description": "Performs Depth-First Search (DFS) on a graph.",
    "signature": "dfs(...): string[]",
    "example": "dfs(...)",
    "output": "..."
  },
  {
    "id": "shortestpathbfs",
    "name": "shortestPathBFS",
    "module": "Graph",
    "description": "Finds the shortest path between two nodes using BFS (unweighted).",
    "signature": "shortestPathBFS(...): string[] | null",
    "example": "shortestPathBFS(...)",
    "output": "..."
  },
  {
    "id": "topologicalsort",
    "name": "topologicalSort",
    "module": "Graph",
    "description": "Performs a topological sort of a Directed Acyclic Graph (DAG).",
    "signature": "topologicalSort(...): string[]",
    "example": "topologicalSort(...)",
    "output": "..."
  },
  {
    "id": "addedge",
    "name": "addEdge",
    "module": "Graph",
    "description": "Adds an edge to an adjacency list.",
    "signature": "addEdge(...): any",
    "example": "addEdge(...)",
    "output": "..."
  },
  {
    "id": "hascycle",
    "name": "hasCycle",
    "module": "Graph",
    "description": "Detects if a directed graph contains a cycle.",
    "signature": "hasCycle(...): boolean",
    "example": "hasCycle(...)",
    "output": "..."
  },
  {
    "id": "safejsonparse",
    "name": "safeJsonParse",
    "module": "Guard",
    "description": "Safely parses a JSON string. Returns the parsed value or the fallback on failure.",
    "signature": "safeJsonParse(...): T | null",
    "example": "safeJsonParse(...)",
    "output": "..."
  },
  {
    "id": "safejsonstringify",
    "name": "safeJsonStringify",
    "module": "Guard",
    "description": "Safely stringifies a value to JSON. Handles circular references gracefully.",
    "signature": "safeJsonStringify(...): string",
    "example": "safeJsonStringify(...)",
    "output": "..."
  },
  {
    "id": "safeparseint",
    "name": "safeParseInt",
    "module": "Guard",
    "description": "Safely parses an integer. Returns the fallback (default 0) if parsing fails or produces NaN.",
    "signature": "safeParseInt(...): number",
    "example": "safeParseInt(...)",
    "output": "..."
  },
  {
    "id": "safeparsefloat",
    "name": "safeParseFloat",
    "module": "Guard",
    "description": "Safely parses a float. Returns the fallback (default 0) if parsing fails or produces NaN.",
    "signature": "safeParseFloat(...): number",
    "example": "safeParseFloat(...)",
    "output": "..."
  },
  {
    "id": "safeparsedate",
    "name": "safeParseDate",
    "module": "Guard",
    "description": "Safely parses a date string. Returns the fallback or null if parsing fails.",
    "signature": "safeParseDate(...): Date | null",
    "example": "safeParseDate(...)",
    "output": "..."
  },
  {
    "id": "coalesce",
    "name": "coalesce",
    "module": "Guard",
    "description": "Returns the first non-null and non-undefined value from the arguments.",
    "signature": "coalesce(...): T | undefined",
    "example": "coalesce(...)",
    "output": "..."
  },
  {
    "id": "attempt",
    "name": "attempt",
    "module": "Guard",
    "description": "Wraps a synchronous function call in a try/catch. Returns the fallback on failure.",
    "signature": "attempt(...): T | undefined",
    "example": "attempt(...)",
    "output": "..."
  },
  {
    "id": "attemptasync",
    "name": "attemptAsync",
    "module": "Guard",
    "description": "Wraps an asynchronous function call in a try/catch. Returns the fallback on failure.",
    "signature": "attemptAsync(...): Promise<T | undefined>",
    "example": "attemptAsync(...)",
    "output": "..."
  },
  {
    "id": "invariant",
    "name": "invariant",
    "module": "Guard",
    "description": "Asserts that a condition is true. Throws an error with the given message if not.",
    "signature": "invariant(...): asserts condition",
    "example": "invariant(...)",
    "output": "..."
  },
  {
    "id": "assertdefined",
    "name": "assertDefined",
    "module": "Guard",
    "description": "Asserts that a value is not null or undefined. Throws if it is.",
    "signature": "assertDefined(...): T",
    "example": "assertDefined(...)",
    "output": "..."
  },
  {
    "id": "assertnever",
    "name": "assertNever",
    "module": "Guard",
    "description": "Used for exhaustive checks in switch statements. Throws if called.",
    "signature": "assertNever(...): never",
    "example": "assertNever(...)",
    "output": "..."
  },
  {
    "id": "withdefault",
    "name": "withDefault",
    "module": "Guard",
    "description": "Returns the value if it is not null/undefined, otherwise returns the default value.",
    "signature": "withDefault(...): T",
    "example": "withDefault(...)",
    "output": "..."
  },
  {
    "id": "crc32",
    "name": "crc32",
    "module": "Hash",
    "description": "Hashing and Encoding Utilities",
    "signature": "crc32(...): number",
    "example": "crc32(...)",
    "output": "..."
  },
  {
    "id": "djb2",
    "name": "djb2",
    "module": "Hash",
    "description": "Utility function",
    "signature": "djb2(...): number",
    "example": "djb2(...)",
    "output": "..."
  },
  {
    "id": "sdbm",
    "name": "sdbm",
    "module": "Hash",
    "description": "Utility function",
    "signature": "sdbm(...): number",
    "example": "sdbm(...)",
    "output": "..."
  },
  {
    "id": "encodebase64",
    "name": "encodeBase64",
    "module": "Hash",
    "description": "Utility function",
    "signature": "encodeBase64(...): string",
    "example": "encodeBase64(...)",
    "output": "..."
  },
  {
    "id": "decodebase64",
    "name": "decodeBase64",
    "module": "Hash",
    "description": "Utility function",
    "signature": "decodeBase64(...): string",
    "example": "decodeBase64(...)",
    "output": "..."
  },
  {
    "id": "encodehex",
    "name": "encodeHex",
    "module": "Hash",
    "description": "Utility function",
    "signature": "encodeHex(...): string",
    "example": "encodeHex(...)",
    "output": "..."
  },
  {
    "id": "decodehex",
    "name": "decodeHex",
    "module": "Hash",
    "description": "Utility function",
    "signature": "decodeHex(...): string",
    "example": "decodeHex(...)",
    "output": "..."
  },
  {
    "id": "uuidv4",
    "name": "uuidV4",
    "module": "Hash",
    "description": "Utility function",
    "signature": "uuidV4(...): string",
    "example": "uuidV4(...)",
    "output": "..."
  },
  {
    "id": "generatenanoid",
    "name": "generateNanoId",
    "module": "Hash",
    "description": "Utility function",
    "signature": "generateNanoId(...): string",
    "example": "generateNanoId(...)",
    "output": "..."
  },
  {
    "id": "checksum",
    "name": "checksum",
    "module": "Hash",
    "description": "Utility function",
    "signature": "checksum(...): number",
    "example": "checksum(...)",
    "output": "..."
  },
  {
    "id": "encodehtmlentities",
    "name": "encodeHtmlEntities",
    "module": "Html Entities",
    "description": "Encodes special characters in a string to HTML entities.",
    "signature": "encodeHtmlEntities(...): string",
    "example": "encodeHtmlEntities(...)",
    "output": "..."
  },
  {
    "id": "decodehtmlentities",
    "name": "decodeHtmlEntities",
    "module": "Html Entities",
    "description": "Decodes HTML entities in a string back to characters.",
    "signature": "decodeHtmlEntities(...): string",
    "example": "decodeHtmlEntities(...)",
    "output": "..."
  },
  {
    "id": "striphtmltags",
    "name": "stripHtmlTags",
    "module": "Html Entities",
    "description": "Strips HTML tags from a string.",
    "signature": "stripHtmlTags(...): string",
    "example": "stripHtmlTags(...)",
    "output": "..."
  },
  {
    "id": "hashtmltags",
    "name": "hasHtmlTags",
    "module": "Html Entities",
    "description": "Checks if a string contains any HTML tags.",
    "signature": "hasHtmlTags(...): boolean",
    "example": "hasHtmlTags(...)",
    "output": "..."
  },
  {
    "id": "truncatehtml",
    "name": "truncateHtml",
    "module": "Html Entities",
    "description": "Truncates a string by character count while attempting to preserve whole HTML tags.",
    "signature": "truncateHtml(...): string",
    "example": "truncateHtml(...)",
    "output": "..."
  },
  {
    "id": "buildquerystring",
    "name": "buildQueryString",
    "module": "Http",
    "description": "Builds a query string from an object.",
    "signature": "buildQueryString(...): string",
    "example": "buildQueryString(...)",
    "output": "..."
  },
  {
    "id": "parsequerystring",
    "name": "parseQueryString",
    "module": "Http",
    "description": "Parses a query string into an object.",
    "signature": "parseQueryString(...): Record<string, string>",
    "example": "parseQueryString(...)",
    "output": "..."
  },
  {
    "id": "issuccessstatus",
    "name": "isSuccessStatus",
    "module": "Http",
    "description": "Checks if a HTTP status code represents a success (200-299).",
    "signature": "isSuccessStatus(...): boolean",
    "example": "isSuccessStatus(...)",
    "output": "..."
  },
  {
    "id": "iserrorstatus",
    "name": "isErrorStatus",
    "module": "Http",
    "description": "Checks if a HTTP status code represents a client or server error (400-599).",
    "signature": "isErrorStatus(...): boolean",
    "example": "isErrorStatus(...)",
    "output": "..."
  },
  {
    "id": "fetchwithtimeout",
    "name": "fetchWithTimeout",
    "module": "Http",
    "description": "Wrapper around fetch that adds timeout and query params support.",
    "signature": "fetchWithTimeout(...): Promise<Response>",
    "example": "fetchWithTimeout(...)",
    "output": "..."
  },
  {
    "id": "get",
    "name": "get",
    "module": "Http",
    "description": "Perform a GET request.",
    "signature": "get(...): Promise<Response>",
    "example": "get(...)",
    "output": "..."
  },
  {
    "id": "post",
    "name": "post",
    "module": "Http",
    "description": "Perform a POST request.",
    "signature": "post(...): Promise<Response>",
    "example": "post(...)",
    "output": "..."
  },
  {
    "id": "put",
    "name": "put",
    "module": "Http",
    "description": "Perform a PUT request.",
    "signature": "put(...): Promise<Response>",
    "example": "put(...)",
    "output": "..."
  },
  {
    "id": "patch",
    "name": "patch",
    "module": "Http",
    "description": "Perform a PATCH request.",
    "signature": "patch(...): Promise<Response>",
    "example": "patch(...)",
    "output": "..."
  },
  {
    "id": "del",
    "name": "del",
    "module": "Http",
    "description": "Perform a DELETE request.",
    "signature": "del(...): Promise<Response>",
    "example": "del(...)",
    "output": "..."
  },
  {
    "id": "applybrightness",
    "name": "applyBrightness",
    "module": "Image",
    "description": "Image Processing Primitives (for pixel arrays [r,g,b,a,...])",
    "signature": "applyBrightness(...): number[]",
    "example": "applyBrightness(...)",
    "output": "..."
  },
  {
    "id": "applycontrast",
    "name": "applyContrast",
    "module": "Image",
    "description": "Utility function",
    "signature": "applyContrast(...): number[]",
    "example": "applyContrast(...)",
    "output": "..."
  },
  {
    "id": "applygrayscale",
    "name": "applyGrayscale",
    "module": "Image",
    "description": "Utility function",
    "signature": "applyGrayscale(...): number[]",
    "example": "applyGrayscale(...)",
    "output": "..."
  },
  {
    "id": "applyinvert",
    "name": "applyInvert",
    "module": "Image",
    "description": "Utility function",
    "signature": "applyInvert(...): number[]",
    "example": "applyInvert(...)",
    "output": "..."
  },
  {
    "id": "applysepia",
    "name": "applySepia",
    "module": "Image",
    "description": "Utility function",
    "signature": "applySepia(...): number[]",
    "example": "applySepia(...)",
    "output": "..."
  },
  {
    "id": "applythreshold",
    "name": "applyThreshold",
    "module": "Image",
    "description": "Utility function",
    "signature": "applyThreshold(...): number[]",
    "example": "applyThreshold(...)",
    "output": "..."
  },
  {
    "id": "convolve2d",
    "name": "convolve2D",
    "module": "Image",
    "description": "Utility function",
    "signature": "convolve2D(...): number[][]",
    "example": "convolve2D(...)",
    "output": "..."
  },
  {
    "id": "rgbtohexarray",
    "name": "rgbToHexArray",
    "module": "Image",
    "description": "Utility function",
    "signature": "rgbToHexArray(...): string[]",
    "example": "rgbToHexArray(...)",
    "output": "..."
  },
  {
    "id": "formatcurrency",
    "name": "formatCurrency",
    "module": "Intl",
    "description": "Formats a number as a currency string.",
    "signature": "formatCurrency(...): any",
    "example": "formatCurrency(...)",
    "output": "..."
  },
  {
    "id": "formatnumber",
    "name": "formatNumber",
    "module": "Intl",
    "description": "Formats a number with locale-specific separators.",
    "signature": "formatNumber(...): any",
    "example": "formatNumber(...)",
    "output": "..."
  },
  {
    "id": "formatdatetime",
    "name": "formatDateTime",
    "module": "Intl",
    "description": "Formats a date using Intl.DateTimeFormat.",
    "signature": "formatDateTime(...): any",
    "example": "formatDateTime(...)",
    "output": "..."
  },
  {
    "id": "formatpercentage",
    "name": "formatPercentage",
    "module": "Intl",
    "description": "Formats a number as a percentage.",
    "signature": "formatPercentage(...): any",
    "example": "formatPercentage(...)",
    "output": "..."
  },
  {
    "id": "formatcompactnumber",
    "name": "formatCompactNumber",
    "module": "Intl",
    "description": "Formats a number as a compact unit (e.g., 1.2K, 3M).",
    "signature": "formatCompactNumber(...): any",
    "example": "formatCompactNumber(...)",
    "output": "..."
  },
  {
    "id": "getpluralrule",
    "name": "getPluralRule",
    "module": "Intl",
    "description": "Returns the plural rules for a specific number.",
    "signature": "getPluralRule(...): any",
    "example": "getPluralRule(...)",
    "output": "..."
  },
  {
    "id": "formatlist",
    "name": "formatList",
    "module": "Intl",
    "description": "Formats a list of strings with conjunctions (e.g., \"A, B, and C\").",
    "signature": "formatList(...): any",
    "example": "formatList(...)",
    "output": "..."
  },
  {
    "id": "formatrelativetime",
    "name": "formatRelativeTime",
    "module": "Intl",
    "description": "Formats a relative time (e.g., \"3 days ago\").",
    "signature": "formatRelativeTime(...): any",
    "example": "formatRelativeTime(...)",
    "output": "..."
  },
  {
    "id": "reduce",
    "name": "reduce",
    "module": "Iter",
    "description": "Reduces an iterable.",
    "signature": "reduce(...): U",
    "example": "reduce(...)",
    "output": "..."
  },
  {
    "id": "jsonclone",
    "name": "jsonClone",
    "module": "Json",
    "description": "Creates a fast JSON-based deep clone of a value.",
    "signature": "jsonClone(...): T",
    "example": "jsonClone(...)",
    "output": "..."
  },
  {
    "id": "jsonflatten",
    "name": "jsonFlatten",
    "module": "Json",
    "description": "Flattens a nested object or array into a single-level object with dot-notation and bracket-notation paths.",
    "signature": "jsonFlatten(...): Record<string, any>",
    "example": "jsonFlatten(...)",
    "output": "..."
  },
  {
    "id": "jsonunflatten",
    "name": "jsonUnflatten",
    "module": "Json",
    "description": "Reconstructs a flattened object (created by jsonFlatten) back into its nested structure.",
    "signature": "jsonUnflatten(...): any",
    "example": "jsonUnflatten(...)",
    "output": "..."
  },
  {
    "id": "jsonpath",
    "name": "jsonPath",
    "module": "Json",
    "description": "Queries nested values in an object using path strings (e.g. \"users[0].address.city\").",
    "signature": "jsonPath(...): any",
    "example": "jsonPath(...)",
    "output": "..."
  },
  {
    "id": "jsonmerge",
    "name": "jsonMerge",
    "module": "Json",
    "description": "Performs a deep merge of two JSON-serializable structures.",
    "signature": "jsonMerge(...): any",
    "example": "jsonMerge(...)",
    "output": "..."
  },
  {
    "id": "jsondiff",
    "name": "jsonDiff",
    "module": "Json",
    "description": "Computes structured differences between two JSON-serializable structures.",
    "signature": "jsonDiff(...): Record<string, JsonDiffEntry>",
    "example": "jsonDiff(...)",
    "output": "..."
  },
  {
    "id": "registershortcut",
    "name": "registerShortcut",
    "module": "Keyboard",
    "description": "Registers a global or target-specific keyboard shortcut listener.",
    "signature": "registerShortcut(...): any",
    "example": "registerShortcut(...)",
    "output": "..."
  },
  {
    "id": "iskeypressed",
    "name": "isKeyPressed",
    "module": "Keyboard",
    "description": "Checks if a specific keyboard key is currently pressed down.",
    "signature": "isKeyPressed(...): boolean",
    "example": "isKeyPressed(...)",
    "output": "..."
  },
  {
    "id": "ansi",
    "name": "ansi",
    "module": "Log",
    "description": "Utility function",
    "signature": "ansi(...)",
    "example": "ansi(...)",
    "output": "..."
  },
  {
    "id": "nocoloransi",
    "name": "noColorAnsi",
    "module": "Log",
    "description": "Utility function",
    "signature": "noColorAnsi(...)",
    "example": "noColorAnsi(...)",
    "output": "..."
  },
  {
    "id": "createlogger",
    "name": "createLogger",
    "module": "Log",
    "description": "Creates a customizable console logger with level-based filtering and optional color styling.",
    "signature": "createLogger(...): Logger",
    "example": "createLogger(...)",
    "output": "..."
  },
  {
    "id": "mapmapvalues",
    "name": "mapMapValues",
    "module": "Map",
    "description": "Maps over the values of a Map to produce a new Map with the same keys.",
    "signature": "mapMapValues(...): Map<K, R>",
    "example": "mapMapValues(...)",
    "output": "..."
  },
  {
    "id": "mapmapkeys",
    "name": "mapMapKeys",
    "module": "Map",
    "description": "Maps over the keys of a Map to produce a new Map with the same values.",
    "signature": "mapMapKeys(...): Map<R, V>",
    "example": "mapMapKeys(...)",
    "output": "..."
  },
  {
    "id": "filtermapentries",
    "name": "filterMapEntries",
    "module": "Map",
    "description": "Filters a Map to produce a new Map containing only entries that satisfy the predicate.",
    "signature": "filterMapEntries(...): Map<K, V>",
    "example": "filterMapEntries(...)",
    "output": "..."
  },
  {
    "id": "mergemultiplemaps",
    "name": "mergeMultipleMaps",
    "module": "Map",
    "description": "Merges multiple Maps into a single new Map. Later maps overwrite earlier ones for duplicate keys.",
    "signature": "mergeMultipleMaps(...): Map<K, V>",
    "example": "mergeMultipleMaps(...)",
    "output": "..."
  },
  {
    "id": "invertmapentries",
    "name": "invertMapEntries",
    "module": "Map",
    "description": "Inverts a Map by swapping its keys and values.",
    "signature": "invertMapEntries(...): Map<V, K>",
    "example": "invertMapEntries(...)",
    "output": "..."
  },
  {
    "id": "groupbytomap",
    "name": "groupByToMap",
    "module": "Map",
    "description": "Groups elements of an iterable into a Map based on a grouping function.",
    "signature": "groupByToMap(...): Map<K, T[]>",
    "example": "groupByToMap(...)",
    "output": "..."
  },
  {
    "id": "findinmap",
    "name": "findInMap",
    "module": "Map",
    "description": "Finds the first entry in a Map that satisfies the predicate.",
    "signature": "findInMap(...): [K, V] | undefined",
    "example": "findInMap(...)",
    "output": "..."
  },
  {
    "id": "everyinmap",
    "name": "everyInMap",
    "module": "Map",
    "description": "Checks if every entry in a Map satisfies the predicate.",
    "signature": "everyInMap(...): boolean",
    "example": "everyInMap(...)",
    "output": "..."
  },
  {
    "id": "someinmap",
    "name": "someInMap",
    "module": "Map",
    "description": "Checks if some entry in a Map satisfies the predicate.",
    "signature": "someInMap(...): boolean",
    "example": "someInMap(...)",
    "output": "..."
  },
  {
    "id": "objecttomap",
    "name": "objectToMap",
    "module": "Map",
    "description": "Converts an object to a Map.",
    "signature": "objectToMap(...): Map<string, V>",
    "example": "objectToMap(...)",
    "output": "..."
  },
  {
    "id": "maptoobject",
    "name": "mapToObject",
    "module": "Map",
    "description": "Converts a Map to an object.",
    "signature": "mapToObject(...): Record<string, V>",
    "example": "mapToObject(...)",
    "output": "..."
  },
  {
    "id": "clamp",
    "name": "clamp",
    "module": "Math",
    "description": "Clamps a number between a minimum and maximum value.",
    "signature": "clamp(...): number",
    "example": "clamp(...)",
    "output": "..."
  },
  {
    "id": "lerp",
    "name": "lerp",
    "module": "Math",
    "description": "Linearly interpolates between two numbers.",
    "signature": "lerp(...): number",
    "example": "lerp(...)",
    "output": "..."
  },
  {
    "id": "random",
    "name": "random",
    "module": "Math",
    "description": "Generates a random number in a given range.",
    "signature": "random(...): number",
    "example": "random(...)",
    "output": "..."
  },
  {
    "id": "round",
    "name": "round",
    "module": "Math",
    "description": "Rounds a number to a specified decimal precision.",
    "signature": "round(...): number",
    "example": "round(...)",
    "output": "..."
  },
  {
    "id": "sum",
    "name": "sum",
    "module": "Math",
    "description": "Returns the sum of an array of numbers.",
    "signature": "sum(...): number",
    "example": "sum(...)",
    "output": "..."
  },
  {
    "id": "mean",
    "name": "mean",
    "module": "Math",
    "description": "Returns the average (mean) of an array of numbers.",
    "signature": "mean(...): number",
    "example": "mean(...)",
    "output": "..."
  },
  {
    "id": "median",
    "name": "median",
    "module": "Math",
    "description": "Returns the median value of an array of numbers.",
    "signature": "median(...): number",
    "example": "median(...)",
    "output": "..."
  },
  {
    "id": "standarddeviation",
    "name": "standardDeviation",
    "module": "Math",
    "description": "Returns the standard deviation of an array of numbers.",
    "signature": "standardDeviation(...): number",
    "example": "standardDeviation(...)",
    "output": "..."
  },
  {
    "id": "percentage",
    "name": "percentage",
    "module": "Math",
    "description": "Calculates the percentage of a value relative to a total.",
    "signature": "percentage(...): any",
    "example": "percentage(...)",
    "output": "..."
  },
  {
    "id": "inrange",
    "name": "inRange",
    "module": "Math",
    "description": "Checks whether a number falls within a range [min, max].",
    "signature": "inRange(...): any",
    "example": "inRange(...)",
    "output": "..."
  },
  {
    "id": "max",
    "name": "max",
    "module": "Math",
    "description": "Computes the maximum value of array. If array is empty or falsey, undefined is returned.",
    "signature": "max(...): number | undefined",
    "example": "max(...)",
    "output": "..."
  },
  {
    "id": "min",
    "name": "min",
    "module": "Math",
    "description": "Computes the minimum value of array. If array is empty or falsey, undefined is returned.",
    "signature": "min(...): number | undefined",
    "example": "min(...)",
    "output": "..."
  },
  {
    "id": "add",
    "name": "add",
    "module": "Math",
    "description": "Adds two numbers.",
    "signature": "add(...): number",
    "example": "add(...)",
    "output": "..."
  },
  {
    "id": "subtract",
    "name": "subtract",
    "module": "Math",
    "description": "Subtracts subtrahend from minuend.",
    "signature": "subtract(...): number",
    "example": "subtract(...)",
    "output": "..."
  },
  {
    "id": "multiply",
    "name": "multiply",
    "module": "Math",
    "description": "Multiplies two numbers.",
    "signature": "multiply(...): number",
    "example": "multiply(...)",
    "output": "..."
  },
  {
    "id": "divide",
    "name": "divide",
    "module": "Math",
    "description": "Divides two numbers.",
    "signature": "divide(...): number",
    "example": "divide(...)",
    "output": "..."
  },
  {
    "id": "ceil",
    "name": "ceil",
    "module": "Math",
    "description": "Computes number rounded up to precision.",
    "signature": "ceil(...): number",
    "example": "ceil(...)",
    "output": "..."
  },
  {
    "id": "floor",
    "name": "floor",
    "module": "Math",
    "description": "Computes number rounded down to precision.",
    "signature": "floor(...): number",
    "example": "floor(...)",
    "output": "..."
  },
  {
    "id": "factorial",
    "name": "factorial",
    "module": "Math",
    "description": "Calculates the factorial of a non-negative integer n.",
    "signature": "factorial(...): number",
    "example": "factorial(...)",
    "output": "..."
  },
  {
    "id": "fibonacci",
    "name": "fibonacci",
    "module": "Math",
    "description": "Returns the nth Fibonacci number.",
    "signature": "fibonacci(...): number",
    "example": "fibonacci(...)",
    "output": "..."
  },
  {
    "id": "isprime",
    "name": "isPrime",
    "module": "Math",
    "description": "Checks if a number is a prime number.",
    "signature": "isPrime(...): boolean",
    "example": "isPrime(...)",
    "output": "..."
  },
  {
    "id": "maprange",
    "name": "mapRange",
    "module": "Math",
    "description": "Re-maps a number from one range to another.",
    "signature": "mapRange(...): any",
    "example": "mapRange(...)",
    "output": "..."
  },
  {
    "id": "distance",
    "name": "distance",
    "module": "Math",
    "description": "Calculates the Euclidean distance between two points in 2D or 3D space.",
    "signature": "distance(...): any",
    "example": "distance(...)",
    "output": "..."
  },
  {
    "id": "dotproduct",
    "name": "dotProduct",
    "module": "Math",
    "description": "Calculates the dot product of two vectors of equal length.",
    "signature": "dotProduct(...): number",
    "example": "dotProduct(...)",
    "output": "..."
  },
  {
    "id": "euclideandistance",
    "name": "euclideanDistance",
    "module": "Math",
    "description": "Calculates the Euclidean distance between two numeric vectors.",
    "signature": "euclideanDistance(...): number",
    "example": "euclideanDistance(...)",
    "output": "..."
  },
  {
    "id": "cosinesimilarity",
    "name": "cosineSimilarity",
    "module": "Math",
    "description": "Calculates the cosine similarity between two numeric vectors.",
    "signature": "cosineSimilarity(...): number",
    "example": "cosineSimilarity(...)",
    "output": "..."
  },
  {
    "id": "gcd",
    "name": "gcd",
    "module": "Math",
    "description": "Calculates the Greatest Common Divisor (GCD) of two integers using Euclid's algorithm.",
    "signature": "gcd(...): number",
    "example": "gcd(...)",
    "output": "..."
  },
  {
    "id": "lcm",
    "name": "lcm",
    "module": "Math",
    "description": "Calculates the Least Common Multiple (LCM) of two integers.",
    "signature": "lcm(...): number",
    "example": "lcm(...)",
    "output": "..."
  },
  {
    "id": "power",
    "name": "power",
    "module": "Math",
    "description": "Returns base raised to exponent power.",
    "signature": "power(...): number",
    "example": "power(...)",
    "output": "..."
  },
  {
    "id": "abs",
    "name": "abs",
    "module": "Math",
    "description": "Returns absolute value of a number.",
    "signature": "abs(...): number",
    "example": "abs(...)",
    "output": "..."
  },
  {
    "id": "sign",
    "name": "sign",
    "module": "Math",
    "description": "Returns 1 for positive, -1 for negative, 0 for zero.",
    "signature": "sign(...): number",
    "example": "sign(...)",
    "output": "..."
  },
  {
    "id": "hypot",
    "name": "hypot",
    "module": "Math",
    "description": "Calculates square root of sum of squares of arguments.",
    "signature": "hypot(...): number",
    "example": "hypot(...)",
    "output": "..."
  },
  {
    "id": "mat3identity",
    "name": "mat3Identity",
    "module": "Matrix",
    "description": "Creates an identity 3x3 matrix.",
    "signature": "mat3Identity(...): Mat3",
    "example": "mat3Identity(...)",
    "output": "..."
  },
  {
    "id": "mat4identity",
    "name": "mat4Identity",
    "module": "Matrix",
    "description": "Creates an identity 4x4 matrix.",
    "signature": "mat4Identity(...): Mat4",
    "example": "mat4Identity(...)",
    "output": "..."
  },
  {
    "id": "mat3mul",
    "name": "mat3Mul",
    "module": "Matrix",
    "description": "Multiplies two 3x3 matrices.",
    "signature": "mat3Mul(...): Mat3",
    "example": "mat3Mul(...)",
    "output": "..."
  },
  {
    "id": "mat4mul",
    "name": "mat4Mul",
    "module": "Matrix",
    "description": "Multiplies two 4x4 matrices.",
    "signature": "mat4Mul(...): Mat4",
    "example": "mat4Mul(...)",
    "output": "..."
  },
  {
    "id": "mat3transpose",
    "name": "mat3Transpose",
    "module": "Matrix",
    "description": "Transposes a 3x3 matrix.",
    "signature": "mat3Transpose(...): Mat3",
    "example": "mat3Transpose(...)",
    "output": "..."
  },
  {
    "id": "mat4transpose",
    "name": "mat4Transpose",
    "module": "Matrix",
    "description": "Transposes a 4x4 matrix.",
    "signature": "mat4Transpose(...): Mat4",
    "example": "mat4Transpose(...)",
    "output": "..."
  },
  {
    "id": "memoizesimple",
    "name": "memoizeSimple",
    "module": "Memoize",
    "description": "Memoizes a function that takes a single string or number argument.",
    "signature": "memoizeSimple(...): (arg: T) => R",
    "example": "memoizeSimple(...)",
    "output": "..."
  },
  {
    "id": "memoizewithresolver",
    "name": "memoizeWithResolver",
    "module": "Memoize",
    "description": "Memoizes a function taking any arguments using a custom resolver to generate the cache key.",
    "signature": "memoizeWithResolver(...): any",
    "example": "memoizeWithResolver(...)",
    "output": "..."
  },
  {
    "id": "memoizeasync",
    "name": "memoizeAsync",
    "module": "Memoize",
    "description": "Memoizes an asynchronous function.",
    "signature": "memoizeAsync(...): any",
    "example": "memoizeAsync(...)",
    "output": "..."
  },
  {
    "id": "memoizettl",
    "name": "memoizeTTL",
    "module": "Memoize",
    "description": "Creates a memoized function that clears its cache after a TTL (time to live).",
    "signature": "memoizeTTL(...): any",
    "example": "memoizeTTL(...)",
    "output": "..."
  },
  {
    "id": "memoizemax",
    "name": "memoizeMax",
    "module": "Memoize",
    "description": "Memoizes a function with a maximum cache size (LRU-like cache clearing).",
    "signature": "memoizeMax(...): any",
    "example": "memoizeMax(...)",
    "output": "..."
  },
  {
    "id": "withclearcache",
    "name": "withClearCache",
    "module": "Memoize",
    "description": "Extends a memoized function with a method to clear the cache manually.",
    "signature": "withClearCache(...): any",
    "example": "withClearCache(...)",
    "output": "..."
  },
  {
    "id": "sigmoid",
    "name": "sigmoid",
    "module": "Ml",
    "description": "Machine Learning and Statistics Utilities",
    "signature": "sigmoid(...): number",
    "example": "sigmoid(...)",
    "output": "..."
  },
  {
    "id": "relu",
    "name": "relu",
    "module": "Ml",
    "description": "Utility function",
    "signature": "relu(...): number",
    "example": "relu(...)",
    "output": "..."
  },
  {
    "id": "leakyrelu",
    "name": "leakyRelu",
    "module": "Ml",
    "description": "Utility function",
    "signature": "leakyRelu(...): number",
    "example": "leakyRelu(...)",
    "output": "..."
  },
  {
    "id": "tanh",
    "name": "tanh",
    "module": "Ml",
    "description": "Utility function",
    "signature": "tanh(...): number",
    "example": "tanh(...)",
    "output": "..."
  },
  {
    "id": "softmax",
    "name": "softmax",
    "module": "Ml",
    "description": "Utility function",
    "signature": "softmax(...): number[]",
    "example": "softmax(...)",
    "output": "..."
  },
  {
    "id": "minmaxscaler",
    "name": "minMaxScaler",
    "module": "Ml",
    "description": "Utility function",
    "signature": "minMaxScaler(...): number[]",
    "example": "minMaxScaler(...)",
    "output": "..."
  },
  {
    "id": "zscorenormalize",
    "name": "zScoreNormalize",
    "module": "Ml",
    "description": "Utility function",
    "signature": "zScoreNormalize(...): number[]",
    "example": "zScoreNormalize(...)",
    "output": "..."
  },
  {
    "id": "meansquarederror",
    "name": "meanSquaredError",
    "module": "Ml",
    "description": "Utility function",
    "signature": "meanSquaredError(...): number",
    "example": "meanSquaredError(...)",
    "output": "..."
  },
  {
    "id": "rootmeansquarederror",
    "name": "rootMeanSquaredError",
    "module": "Ml",
    "description": "Utility function",
    "signature": "rootMeanSquaredError(...): number",
    "example": "rootMeanSquaredError(...)",
    "output": "..."
  },
  {
    "id": "meanabsoluteerror",
    "name": "meanAbsoluteError",
    "module": "Ml",
    "description": "Utility function",
    "signature": "meanAbsoluteError(...): number",
    "example": "meanAbsoluteError(...)",
    "output": "..."
  },
  {
    "id": "mlcosinesimilarity",
    "name": "mlCosineSimilarity",
    "module": "Ml",
    "description": "Utility function",
    "signature": "mlCosineSimilarity(...): number",
    "example": "mlCosineSimilarity(...)",
    "output": "..."
  },
  {
    "id": "mleuclideandistance",
    "name": "mlEuclideanDistance",
    "module": "Ml",
    "description": "Utility function",
    "signature": "mlEuclideanDistance(...): number",
    "example": "mlEuclideanDistance(...)",
    "output": "..."
  },
  {
    "id": "tokenizewords",
    "name": "tokenizeWords",
    "module": "Nlp",
    "description": "Natural Language Processing Utilities",
    "signature": "tokenizeWords(...): string[]",
    "example": "tokenizeWords(...)",
    "output": "..."
  },
  {
    "id": "tokenizesentences",
    "name": "tokenizeSentences",
    "module": "Nlp",
    "description": "Utility function",
    "signature": "tokenizeSentences(...): string[]",
    "example": "tokenizeSentences(...)",
    "output": "..."
  },
  {
    "id": "removestopwords",
    "name": "removeStopWords",
    "module": "Nlp",
    "description": "Utility function",
    "signature": "removeStopWords(...): string[]",
    "example": "removeStopWords(...)",
    "output": "..."
  },
  {
    "id": "generatengrams",
    "name": "generateNGrams",
    "module": "Nlp",
    "description": "Utility function",
    "signature": "generateNGrams(...): string[][]",
    "example": "generateNGrams(...)",
    "output": "..."
  },
  {
    "id": "nlplevenshteindistance",
    "name": "nlpLevenshteinDistance",
    "module": "Nlp",
    "description": "Utility function",
    "signature": "nlpLevenshteinDistance(...): number",
    "example": "nlpLevenshteinDistance(...)",
    "output": "..."
  },
  {
    "id": "hammingdistance",
    "name": "hammingDistance",
    "module": "Nlp",
    "description": "Utility function",
    "signature": "hammingDistance(...): number",
    "example": "hammingDistance(...)",
    "output": "..."
  },
  {
    "id": "jaccardsimilarity",
    "name": "jaccardSimilarity",
    "module": "Nlp",
    "description": "Utility function",
    "signature": "jaccardSimilarity(...): number",
    "example": "jaccardSimilarity(...)",
    "output": "..."
  },
  {
    "id": "soundex",
    "name": "soundex",
    "module": "Nlp",
    "description": "Utility function",
    "signature": "soundex(...): string",
    "example": "soundex(...)",
    "output": "..."
  },
  {
    "id": "extracthashtags",
    "name": "extractHashtags",
    "module": "Nlp",
    "description": "Utility function",
    "signature": "extractHashtags(...): string[]",
    "example": "extractHashtags(...)",
    "output": "..."
  },
  {
    "id": "extractmentions",
    "name": "extractMentions",
    "module": "Nlp",
    "description": "Utility function",
    "signature": "extractMentions(...): string[]",
    "example": "extractMentions(...)",
    "output": "..."
  },
  {
    "id": "formatcurrency",
    "name": "formatCurrency",
    "module": "Number",
    "description": "Formats a number as a currency string.",
    "signature": "formatCurrency(...): any",
    "example": "formatCurrency(...)",
    "output": "..."
  },
  {
    "id": "formatbytes",
    "name": "formatBytes",
    "module": "Number",
    "description": "Formats bytes into a human-readable size string (e.g., \"10.5 KB\", \"2.4 MB\").",
    "signature": "formatBytes(...): string",
    "example": "formatBytes(...)",
    "output": "..."
  },
  {
    "id": "formatnumber",
    "name": "formatNumber",
    "module": "Number",
    "description": "Formats a number with locale-aware thousands separators and optional decimal places.",
    "signature": "formatNumber(...): any",
    "example": "formatNumber(...)",
    "output": "..."
  },
  {
    "id": "formatcompact",
    "name": "formatCompact",
    "module": "Number",
    "description": "Formats a number in compact notation (e.g. 1000 → \"1K\", 1_500_000 → \"1.5M\").",
    "signature": "formatCompact(...): any",
    "example": "formatCompact(...)",
    "output": "..."
  },
  {
    "id": "toordinal",
    "name": "toOrdinal",
    "module": "Number",
    "description": "Converts an integer to its ordinal string representation.",
    "signature": "toOrdinal(...): string",
    "example": "toOrdinal(...)",
    "output": "..."
  },
  {
    "id": "iseven",
    "name": "isEven",
    "module": "Number",
    "description": "Checks if a number is even.",
    "signature": "isEven(...): boolean",
    "example": "isEven(...)",
    "output": "..."
  },
  {
    "id": "isodd",
    "name": "isOdd",
    "module": "Number",
    "description": "Checks if a number is odd.",
    "signature": "isOdd(...): boolean",
    "example": "isOdd(...)",
    "output": "..."
  },
  {
    "id": "ispositive",
    "name": "isPositive",
    "module": "Number",
    "description": "Checks if a number is positive (greater than zero).",
    "signature": "isPositive(...): boolean",
    "example": "isPositive(...)",
    "output": "..."
  },
  {
    "id": "isnegative",
    "name": "isNegative",
    "module": "Number",
    "description": "Checks if a number is negative (less than zero).",
    "signature": "isNegative(...): boolean",
    "example": "isNegative(...)",
    "output": "..."
  },
  {
    "id": "isfloat",
    "name": "isFloat",
    "module": "Number",
    "description": "Checks if a value is a float (a number with a decimal part).",
    "signature": "isFloat(...): boolean",
    "example": "isFloat(...)",
    "output": "..."
  },
  {
    "id": "isinteger",
    "name": "isInteger",
    "module": "Number",
    "description": "Checks if a value is an integer.",
    "signature": "isInteger(...): boolean",
    "example": "isInteger(...)",
    "output": "..."
  },
  {
    "id": "parsenumber",
    "name": "parseNumber",
    "module": "Number",
    "description": "Parses a string to a number, returning a default value if NaN.",
    "signature": "parseNumber(...): number",
    "example": "parseNumber(...)",
    "output": "..."
  },
  {
    "id": "tosafeinteger",
    "name": "toSafeInteger",
    "module": "Number",
    "description": "Converts a value to a safe integer.",
    "signature": "toSafeInteger(...): number",
    "example": "toSafeInteger(...)",
    "output": "..."
  },
  {
    "id": "roundtonearest",
    "name": "roundToNearest",
    "module": "Number",
    "description": "Rounds a number to the nearest multiple of a given step.",
    "signature": "roundToNearest(...): number",
    "example": "roundToNearest(...)",
    "output": "..."
  },
  {
    "id": "topercentage",
    "name": "toPercentage",
    "module": "Number",
    "description": "Converts a number to a percentage string.",
    "signature": "toPercentage(...): string",
    "example": "toPercentage(...)",
    "output": "..."
  },
  {
    "id": "clampnumber",
    "name": "clampNumber",
    "module": "Number",
    "description": "Restricts a number between a minimum and maximum value.",
    "signature": "clampNumber(...): number",
    "example": "clampNumber(...)",
    "output": "..."
  },
  {
    "id": "isperfectsquare",
    "name": "isPerfectSquare",
    "module": "Number",
    "description": "Checks if a given number is a perfect square.",
    "signature": "isPerfectSquare(...): boolean",
    "example": "isPerfectSquare(...)",
    "output": "..."
  },
  {
    "id": "formatfilesize",
    "name": "formatFileSize",
    "module": "Number",
    "description": "Alias for formatBytes - Formats bytes into a human-readable size string.",
    "signature": "formatFileSize(...): string",
    "example": "formatFileSize(...)",
    "output": "..."
  },
  {
    "id": "pick",
    "name": "pick",
    "module": "Object",
    "description": "Creates a new object composed of the picked object properties.",
    "signature": "pick(...): any",
    "example": "pick(...)",
    "output": "..."
  },
  {
    "id": "omit",
    "name": "omit",
    "module": "Object",
    "description": "Creates a new object omitting specified keys.",
    "signature": "omit(...): any",
    "example": "omit(...)",
    "output": "..."
  },
  {
    "id": "get",
    "name": "get",
    "module": "Object",
    "description": "Safely gets a nested property value from an object using a dot-path string or array of keys.",
    "signature": "get(...): any",
    "example": "get(...)",
    "output": "..."
  },
  {
    "id": "deepclone",
    "name": "deepClone",
    "module": "Object",
    "description": "Creates a deep copy of a value (handles Dates, RegExps, Arrays, and Plain Objects).",
    "signature": "deepClone(...): T",
    "example": "deepClone(...)",
    "output": "..."
  },
  {
    "id": "deepmerge",
    "name": "deepMerge",
    "module": "Object",
    "description": "Deeply merges multiple source objects into a target object.",
    "signature": "deepMerge(...): any",
    "example": "deepMerge(...)",
    "output": "..."
  },
  {
    "id": "flattenobject",
    "name": "flattenObject",
    "module": "Object",
    "description": "Flattens a nested object into a single-level object with dot-path keys.",
    "signature": "flattenObject(...): any",
    "example": "flattenObject(...)",
    "output": "..."
  },
  {
    "id": "set",
    "name": "set",
    "module": "Object",
    "description": "Safely sets a nested value in an object using a dot-path string or array of keys.",
    "signature": "set(...): any",
    "example": "set(...)",
    "output": "..."
  },
  {
    "id": "unset",
    "name": "unset",
    "module": "Object",
    "description": "Removes the property at path of object.",
    "signature": "unset(...): boolean",
    "example": "unset(...)",
    "output": "..."
  },
  {
    "id": "mapkeys",
    "name": "mapKeys",
    "module": "Object",
    "description": "Creates a new object by mapping keys through a transform function.",
    "signature": "mapKeys(...): any",
    "example": "mapKeys(...)",
    "output": "..."
  },
  {
    "id": "mapvalues",
    "name": "mapValues",
    "module": "Object",
    "description": "Creates a new object by mapping values through a transform function.",
    "signature": "mapValues(...): any",
    "example": "mapValues(...)",
    "output": "..."
  },
  {
    "id": "has",
    "name": "has",
    "module": "Object",
    "description": "Checks if a path exists in an object.",
    "signature": "has(...): boolean",
    "example": "has(...)",
    "output": "..."
  },
  {
    "id": "isequal",
    "name": "isEqual",
    "module": "Object",
    "description": "Performs a deep comparison between two values to determine if they are equivalent.",
    "signature": "isEqual(...): boolean",
    "example": "isEqual(...)",
    "output": "..."
  },
  {
    "id": "size",
    "name": "size",
    "module": "Object",
    "description": "Gets the size of a collection (array, string, object).",
    "signature": "size(...): number",
    "example": "size(...)",
    "output": "..."
  },
  {
    "id": "invert",
    "name": "invert",
    "module": "Object",
    "description": "Creates an object composed of the inverted keys and values of object.",
    "signature": "invert(...): Record<string, string>",
    "example": "invert(...)",
    "output": "..."
  },
  {
    "id": "topairs",
    "name": "toPairs",
    "module": "Object",
    "description": "Creates an array of the own enumerable string keyed property key-value pairs of object.",
    "signature": "toPairs(...): [string, T][]",
    "example": "toPairs(...)",
    "output": "..."
  },
  {
    "id": "frompairs",
    "name": "fromPairs",
    "module": "Object",
    "description": "Creates an object from an array of key-value pairs.",
    "signature": "fromPairs(...): Record<string, T>",
    "example": "fromPairs(...)",
    "output": "..."
  },
  {
    "id": "clone",
    "name": "clone",
    "module": "Object",
    "description": "Creates a shallow clone of value.",
    "signature": "clone(...): T",
    "example": "clone(...)",
    "output": "..."
  },
  {
    "id": "pickby",
    "name": "pickBy",
    "module": "Object",
    "description": "Creates an object composed of the object properties predicate returns truthy for.",
    "signature": "pickBy(...): any",
    "example": "pickBy(...)",
    "output": "..."
  },
  {
    "id": "omitby",
    "name": "omitBy",
    "module": "Object",
    "description": "Creates an object composed of the object properties predicate does not return truthy for.",
    "signature": "omitBy(...): any",
    "example": "omitBy(...)",
    "output": "..."
  },
  {
    "id": "findkey",
    "name": "findKey",
    "module": "Object",
    "description": "Returns the key of the first element predicate returns truthy for.",
    "signature": "findKey(...): any",
    "example": "findKey(...)",
    "output": "..."
  },
  {
    "id": "findlastkey",
    "name": "findLastKey",
    "module": "Object",
    "description": "Returns the key of the last element predicate returns truthy for.",
    "signature": "findLastKey(...): any",
    "example": "findLastKey(...)",
    "output": "..."
  },
  {
    "id": "forown",
    "name": "forOwn",
    "module": "Object",
    "description": "Iterates over own enumerable string keyed properties of an object and invokes iteratee for each property.",
    "signature": "forOwn(...): any",
    "example": "forOwn(...)",
    "output": "..."
  },
  {
    "id": "invoke",
    "name": "invoke",
    "module": "Object",
    "description": "Invokes the method at path of object.",
    "signature": "invoke(...): any",
    "example": "invoke(...)",
    "output": "..."
  },
  {
    "id": "keys",
    "name": "keys",
    "module": "Object",
    "description": "Wrapper for Object.keys",
    "signature": "keys(...): string[]",
    "example": "keys(...)",
    "output": "..."
  },
  {
    "id": "values",
    "name": "values",
    "module": "Object",
    "description": "Wrapper for Object.values",
    "signature": "values(...): T[]",
    "example": "values(...)",
    "output": "..."
  },
  {
    "id": "entries",
    "name": "entries",
    "module": "Object",
    "description": "Wrapper for Object.entries",
    "signature": "entries(...): [string, T][]",
    "example": "entries(...)",
    "output": "..."
  },
  {
    "id": "fromentries",
    "name": "fromEntries",
    "module": "Object",
    "description": "Creates an object from an array of key-value pairs.",
    "signature": "fromEntries(...): any",
    "example": "fromEntries(...)",
    "output": "..."
  },
  {
    "id": "isempty",
    "name": "isEmpty",
    "module": "Object",
    "description": "Checks if a value is empty (empty object, array, string, map, set, or null/undefined).",
    "signature": "isEmpty(...): boolean",
    "example": "isEmpty(...)",
    "output": "..."
  },
  {
    "id": "defaults",
    "name": "defaults",
    "module": "Object",
    "description": "Assigns own and inherited enumerable string keyed properties of source objects to the destination object for all destination properties that resolve to undefined.",
    "signature": "defaults(...): any",
    "example": "defaults(...)",
    "output": "..."
  },
  {
    "id": "filterkeys",
    "name": "filterKeys",
    "module": "Object",
    "description": "Filters an object's properties based on key predicate.",
    "signature": "filterKeys(...): any",
    "example": "filterKeys(...)",
    "output": "..."
  },
  {
    "id": "filtervalues",
    "name": "filterValues",
    "module": "Object",
    "description": "Filters an object's properties based on value predicate.",
    "signature": "filterValues(...): any",
    "example": "filterValues(...)",
    "output": "..."
  },
  {
    "id": "compactobject",
    "name": "compactObject",
    "module": "Object",
    "description": "Removes null, undefined, and empty string values from an object.",
    "signature": "compactObject(...): Partial<T>",
    "example": "compactObject(...)",
    "output": "..."
  },
  {
    "id": "observable",
    "name": "Observable",
    "module": "Observable",
    "description": "Cold reactive data stream that pushes values to observers.",
    "signature": "class Observable",
    "example": "new Observable()",
    "output": "..."
  },
  {
    "id": "subject",
    "name": "Subject",
    "module": "Observable",
    "description": "Multicast reactive Subject that acts as both an Observer and an Observable.",
    "signature": "class Subject",
    "example": "new Subject()",
    "output": "..."
  },
  {
    "id": "behaviorsubject",
    "name": "BehaviorSubject",
    "module": "Observable",
    "description": "Subject variant that stores its current value and immediately emits it to new subscribers.",
    "signature": "class BehaviorSubject",
    "example": "new BehaviorSubject()",
    "output": "..."
  },
  {
    "id": "of",
    "name": "of",
    "module": "Observable",
    "description": "Creates an Observable that emits synchronous arguments sequentially and completes.",
    "signature": "of(...): Observable<T>",
    "example": "of(...)",
    "output": "..."
  },
  {
    "id": "from",
    "name": "from",
    "module": "Observable",
    "description": "Converts an Array, Iterable, or Promise into an Observable.",
    "signature": "from(...): Observable<T>",
    "example": "from(...)",
    "output": "..."
  },
  {
    "id": "interval",
    "name": "interval",
    "module": "Observable",
    "description": "Emits sequential integers at a specified millisecond interval.",
    "signature": "interval(...): Observable<number>",
    "example": "interval(...)",
    "output": "..."
  },
  {
    "id": "mapobservable",
    "name": "mapObservable",
    "module": "Observable",
    "description": "Transforms each emitted value using a projection function.",
    "signature": "mapObservable(...): OperatorFunction<T, R>",
    "example": "mapObservable(...)",
    "output": "..."
  },
  {
    "id": "filterobservable",
    "name": "filterObservable",
    "module": "Observable",
    "description": "Emits only values that satisfy the predicate.",
    "signature": "filterObservable(...): OperatorFunction<T, T>",
    "example": "filterObservable(...)",
    "output": "..."
  },
  {
    "id": "takeobservable",
    "name": "takeObservable",
    "module": "Observable",
    "description": "Emits only the first `count` values.",
    "signature": "takeObservable(...): OperatorFunction<T, T>",
    "example": "takeObservable(...)",
    "output": "..."
  },
  {
    "id": "debouncetimeobservable",
    "name": "debounceTimeObservable",
    "module": "Observable",
    "description": "Discards values that take place within `ms` milliseconds of another emission.",
    "signature": "debounceTimeObservable(...): OperatorFunction<T, T>",
    "example": "debounceTimeObservable(...)",
    "output": "..."
  },
  {
    "id": "sep",
    "name": "sep",
    "module": "Path",
    "description": "Utilities for cross-platform path manipulation.",
    "signature": "sep(...)",
    "example": "sep(...)",
    "output": "..."
  },
  {
    "id": "normalize",
    "name": "normalize",
    "module": "Path",
    "description": "Normalizes a path string, resolving '..' and '.'.",
    "signature": "normalize(...): string",
    "example": "normalize(...)",
    "output": "..."
  },
  {
    "id": "join",
    "name": "join",
    "module": "Path",
    "description": "Joins all given path segments together.",
    "signature": "join(...): string",
    "example": "join(...)",
    "output": "..."
  },
  {
    "id": "dirname",
    "name": "dirname",
    "module": "Path",
    "description": "Gets the directory name of a path.",
    "signature": "dirname(...): string",
    "example": "dirname(...)",
    "output": "..."
  },
  {
    "id": "basename",
    "name": "basename",
    "module": "Path",
    "description": "Gets the base name of a path.",
    "signature": "basename(...): string",
    "example": "basename(...)",
    "output": "..."
  },
  {
    "id": "extname",
    "name": "extname",
    "module": "Path",
    "description": "Gets the extension of a path.",
    "signature": "extname(...): string",
    "example": "extname(...)",
    "output": "..."
  },
  {
    "id": "isabsolute",
    "name": "isAbsolute",
    "module": "Path",
    "description": "Checks if a path is absolute.",
    "signature": "isAbsolute(...): boolean",
    "example": "isAbsolute(...)",
    "output": "..."
  },
  {
    "id": "measuretime",
    "name": "measureTime",
    "module": "Perf",
    "description": "Measures the execution time of a synchronous function.",
    "signature": "measureTime(...): [T, number]",
    "example": "measureTime(...)",
    "output": "..."
  },
  {
    "id": "measuretimeasync",
    "name": "measureTimeAsync",
    "module": "Perf",
    "description": "Measures the execution time of an asynchronous function.",
    "signature": "measureTimeAsync(...): Promise<[T, number]>",
    "example": "measureTimeAsync(...)",
    "output": "..."
  },
  {
    "id": "benchmark",
    "name": "benchmark",
    "module": "Perf",
    "description": "Benchmarks a function by running it multiple times and returning the average execution time.",
    "signature": "benchmark(...): number",
    "example": "benchmark(...)",
    "output": "..."
  },
  {
    "id": "benchmarkasync",
    "name": "benchmarkAsync",
    "module": "Perf",
    "description": "Benchmarks an asynchronous function.",
    "signature": "benchmarkAsync(...): Promise<number>",
    "example": "benchmarkAsync(...)",
    "output": "..."
  },
  {
    "id": "createfpscounter",
    "name": "createFPSCounter",
    "module": "Perf",
    "description": "Creates a FPS (Frames Per Second) counter.",
    "signature": "createFPSCounter(...): ",
    "example": "createFPSCounter(...)",
    "output": "..."
  },
  {
    "id": "mindelay",
    "name": "minDelay",
    "module": "Perf",
    "description": "Ensures a function takes at least a specified amount of time to execute.",
    "signature": "minDelay(...): Promise<T>",
    "example": "minDelay(...)",
    "output": "..."
  },
  {
    "id": "pipeline",
    "name": "Pipeline",
    "module": "Pipeline",
    "description": "OptiKit Pipeline — Resilient multi-step asynchronous workflow orchestrator",
    "signature": "class Pipeline",
    "example": "new Pipeline()",
    "output": "..."
  },
  {
    "id": "createpipeline",
    "name": "createPipeline",
    "module": "Pipeline",
    "description": "Creates a new resilient workflow pipeline.",
    "signature": "createPipeline(...): Pipeline<TContext>",
    "example": "createPipeline(...)",
    "output": "..."
  },
  {
    "id": "randomuuid",
    "name": "randomUUID",
    "module": "Random",
    "description": "Generates a random UUID (v4) using the native crypto API.",
    "signature": "randomUUID(...): string",
    "example": "randomUUID(...)",
    "output": "..."
  },
  {
    "id": "randomcolor",
    "name": "randomColor",
    "module": "Random",
    "description": "Generates a random hex color string.",
    "signature": "randomColor(...): string",
    "example": "randomColor(...)",
    "output": "..."
  },
  {
    "id": "randomboolean",
    "name": "randomBoolean",
    "module": "Random",
    "description": "Returns a random boolean value.",
    "signature": "randomBoolean(...): boolean",
    "example": "randomBoolean(...)",
    "output": "..."
  },
  {
    "id": "randomfloat",
    "name": "randomFloat",
    "module": "Random",
    "description": "Generates a random floating-point number between min and max (inclusive of min, exclusive of max).",
    "signature": "randomFloat(...): number",
    "example": "randomFloat(...)",
    "output": "..."
  },
  {
    "id": "randomitem",
    "name": "randomItem",
    "module": "Random",
    "description": "Returns a random item from an array.",
    "signature": "randomItem(...): T | undefined",
    "example": "randomItem(...)",
    "output": "..."
  },
  {
    "id": "randomintfast",
    "name": "randomIntFast",
    "module": "Random",
    "description": "Generates a random integer between min and max (inclusive) using Math.random (non-cryptographically secure).",
    "signature": "randomIntFast(...): number",
    "example": "randomIntFast(...)",
    "output": "..."
  },
  {
    "id": "randomstring",
    "name": "randomString",
    "module": "Random",
    "description": "Generates a random alphanumeric string of a given length.",
    "signature": "randomString(...): string",
    "example": "randomString(...)",
    "output": "..."
  },
  {
    "id": "randomsample",
    "name": "randomSample",
    "module": "Random",
    "description": "Returns N unique random items from an array (no repeats).",
    "signature": "randomSample(...): T[]",
    "example": "randomSample(...)",
    "output": "..."
  },
  {
    "id": "weightedrandom",
    "name": "weightedRandom",
    "module": "Random",
    "description": "Selects a random item from a weighted list.",
    "signature": "weightedRandom(...): T | undefined",
    "example": "weightedRandom(...)",
    "output": "..."
  },
  {
    "id": "tokenbucket",
    "name": "TokenBucket",
    "module": "Rate Limit",
    "description": "Token Bucket algorithm implementation for rate limiting bursts while enforcing average throughput.",
    "signature": "class TokenBucket",
    "example": "new TokenBucket()",
    "output": "..."
  },
  {
    "id": "leakybucket",
    "name": "LeakyBucket",
    "module": "Rate Limit",
    "description": "Leaky Bucket algorithm for smoothing out traffic bursts into a steady output rate.",
    "signature": "class LeakyBucket",
    "example": "new LeakyBucket()",
    "output": "..."
  },
  {
    "id": "slidingwindowratelimiter",
    "name": "SlidingWindowRateLimiter",
    "module": "Rate Limit",
    "description": "In-memory Sliding Window Log rate limiter for tracking key-based request limits (e.g., per IP or user ID).",
    "signature": "class SlidingWindowRateLimiter",
    "example": "new SlidingWindowRateLimiter()",
    "output": "..."
  },
  {
    "id": "ratelimit",
    "name": "rateLimit",
    "module": "Rate Limit",
    "description": "Wraps an async function with rate limiting. Calls exceeding the limit are queued",
    "signature": "rateLimit(...): any",
    "example": "rateLimit(...)",
    "output": "..."
  },
  {
    "id": "exponentialbackoff",
    "name": "ExponentialBackoff",
    "module": "Rate Limit",
    "description": "Calculates exponential backoff delay with optional random jitter.",
    "signature": "class ExponentialBackoff",
    "example": "new ExponentialBackoff()",
    "output": "..."
  },
  {
    "id": "regex",
    "name": "regex",
    "module": "Regex",
    "description": "A collection of common, standard regular expressions for validation.",
    "signature": "regex(...)",
    "example": "regex(...)",
    "output": "..."
  },
  {
    "id": "retrywithexponentialbackoff",
    "name": "retryWithExponentialBackoff",
    "module": "Retry",
    "description": "Retry Utilities",
    "signature": "retryWithExponentialBackoff(...): any",
    "example": "retryWithExponentialBackoff(...)",
    "output": "..."
  },
  {
    "id": "retrywithjitter",
    "name": "retryWithJitter",
    "module": "Retry",
    "description": "Utility function",
    "signature": "retryWithJitter(...): any",
    "example": "retryWithJitter(...)",
    "output": "..."
  },
  {
    "id": "exponentialbackoffdelay",
    "name": "exponentialBackoffDelay",
    "module": "Retry",
    "description": "Utility function",
    "signature": "exponentialBackoffDelay(...): number",
    "example": "exponentialBackoffDelay(...)",
    "output": "..."
  },
  {
    "id": "linearbackoffdelay",
    "name": "linearBackoffDelay",
    "module": "Retry",
    "description": "Utility function",
    "signature": "linearBackoffDelay(...): number",
    "example": "linearBackoffDelay(...)",
    "output": "..."
  },
  {
    "id": "isretryableerror",
    "name": "isRetryableError",
    "module": "Retry",
    "description": "Utility function",
    "signature": "isRetryableError(...): boolean",
    "example": "isRetryableError(...)",
    "output": "..."
  },
  {
    "id": "stringschema",
    "name": "StringSchema",
    "module": "Schema Infer",
    "description": "OptiKit Schema Infer — Zero-dependency runtime schema validator with static TypeScript type inference.",
    "signature": "class StringSchema",
    "example": "new StringSchema()",
    "output": "..."
  },
  {
    "id": "numberschema",
    "name": "NumberSchema",
    "module": "Schema Infer",
    "description": "Utility function",
    "signature": "class NumberSchema",
    "example": "new NumberSchema()",
    "output": "..."
  },
  {
    "id": "booleanschema",
    "name": "BooleanSchema",
    "module": "Schema Infer",
    "description": "Utility function",
    "signature": "class BooleanSchema",
    "example": "new BooleanSchema()",
    "output": "..."
  },
  {
    "id": "arrayschema",
    "name": "ArraySchema",
    "module": "Schema Infer",
    "description": "Utility function",
    "signature": "class ArraySchema",
    "example": "new ArraySchema()",
    "output": "..."
  },
  {
    "id": "objectschema",
    "name": "ObjectSchema",
    "module": "Schema Infer",
    "description": "Utility function",
    "signature": "class ObjectSchema",
    "example": "new ObjectSchema()",
    "output": "..."
  },
  {
    "id": "enumschema",
    "name": "EnumSchema",
    "module": "Schema Infer",
    "description": "Utility function",
    "signature": "class EnumSchema",
    "example": "new EnumSchema()",
    "output": "..."
  },
  {
    "id": "s",
    "name": "s",
    "module": "Schema Infer",
    "description": "OptiKit Schema Builder namespace.",
    "signature": "s(...)",
    "example": "s(...)",
    "output": "..."
  },
  {
    "id": "validate",
    "name": "validate",
    "module": "Schema",
    "description": "Validates a single value against an array of rules.",
    "signature": "validate(...): ValidationResult",
    "example": "validate(...)",
    "output": "..."
  },
  {
    "id": "isvalid",
    "name": "isValid",
    "module": "Schema",
    "description": "Checks if a value is valid against a list of rules (returns boolean).",
    "signature": "isValid(...): boolean",
    "example": "isValid(...)",
    "output": "..."
  },
  {
    "id": "validateobject",
    "name": "validateObject",
    "module": "Schema",
    "description": "Validates an object against a schema of fields and their rules.",
    "signature": "validateObject(...): any",
    "example": "validateObject(...)",
    "output": "..."
  },
  {
    "id": "required",
    "name": "required",
    "module": "Schema",
    "description": "Rule: Value must be present (not null, undefined, or empty string).",
    "signature": "required(...): Rule",
    "example": "required(...)",
    "output": "..."
  },
  {
    "id": "minlength",
    "name": "minLength",
    "module": "Schema",
    "description": "Rule: Value must have a minimum length (works for strings and arrays).",
    "signature": "minLength(...): Rule",
    "example": "minLength(...)",
    "output": "..."
  },
  {
    "id": "maxlength",
    "name": "maxLength",
    "module": "Schema",
    "description": "Rule: Value must have a maximum length (works for strings and arrays).",
    "signature": "maxLength(...): Rule",
    "example": "maxLength(...)",
    "output": "..."
  },
  {
    "id": "pattern",
    "name": "pattern",
    "module": "Schema",
    "description": "Rule: Value must match the regex pattern.",
    "signature": "pattern(...): Rule",
    "example": "pattern(...)",
    "output": "..."
  },
  {
    "id": "minvalue",
    "name": "minValue",
    "module": "Schema",
    "description": "Rule: Value must be >= limit.",
    "signature": "minValue(...): Rule",
    "example": "minValue(...)",
    "output": "..."
  },
  {
    "id": "maxvalue",
    "name": "maxValue",
    "module": "Schema",
    "description": "Rule: Value must be <= limit.",
    "signature": "maxValue(...): Rule",
    "example": "maxValue(...)",
    "output": "..."
  },
  {
    "id": "isin",
    "name": "isIn",
    "module": "Schema",
    "description": "Rule: Value must be one of the allowed values.",
    "signature": "isIn(...): Rule",
    "example": "isIn(...)",
    "output": "..."
  },
  {
    "id": "istype",
    "name": "isType",
    "module": "Schema",
    "description": "Rule: Value must match the expected type.",
    "signature": "isType(...): any",
    "example": "isType(...)",
    "output": "..."
  },
  {
    "id": "custom",
    "name": "custom",
    "module": "Schema",
    "description": "Rule: Value must satisfy a custom predicate.",
    "signature": "custom(...): Rule",
    "example": "custom(...)",
    "output": "..."
  },
  {
    "id": "linearsearch",
    "name": "linearSearch",
    "module": "Search",
    "description": "Linear search: finds the index of the first matching element.",
    "signature": "linearSearch(...): number",
    "example": "linearSearch(...)",
    "output": "..."
  },
  {
    "id": "binarysearch",
    "name": "binarySearch",
    "module": "Search",
    "description": "Binary search: efficiently finds the index of the target in a SORTED array.",
    "signature": "binarySearch(...): number",
    "example": "binarySearch(...)",
    "output": "..."
  },
  {
    "id": "jumpsearch",
    "name": "jumpSearch",
    "module": "Search",
    "description": "Jump search: finds the index of the target in a SORTED array using block jumps.",
    "signature": "jumpSearch(...): number",
    "example": "jumpSearch(...)",
    "output": "..."
  },
  {
    "id": "exponentialsearch",
    "name": "exponentialSearch",
    "module": "Search",
    "description": "Exponential search: finds the index of the target in a SORTED array.",
    "signature": "exponentialSearch(...): number",
    "example": "exponentialSearch(...)",
    "output": "..."
  },
  {
    "id": "interpolationsearch",
    "name": "interpolationSearch",
    "module": "Search",
    "description": "Interpolation search: finds the index of a number in a uniformly distributed SORTED array.",
    "signature": "interpolationSearch(...): number",
    "example": "interpolationSearch(...)",
    "output": "..."
  },
  {
    "id": "semverparse",
    "name": "semverParse",
    "module": "Semver",
    "description": "Parses a semantic version string into a SemVer object.",
    "signature": "semverParse(...): SemVer | null",
    "example": "semverParse(...)",
    "output": "..."
  },
  {
    "id": "semverclean",
    "name": "semverClean",
    "module": "Semver",
    "description": "Cleans the semantic version string, stripping leading \"v\" or whitespace.",
    "signature": "semverClean(...): string | null",
    "example": "semverClean(...)",
    "output": "..."
  },
  {
    "id": "semverisvalid",
    "name": "semverIsValid",
    "module": "Semver",
    "description": "Checks if a string is a valid SemVer format.",
    "signature": "semverIsValid(...): boolean",
    "example": "semverIsValid(...)",
    "output": "..."
  },
  {
    "id": "semvercompare",
    "name": "semverCompare",
    "module": "Semver",
    "description": "Compares two semantic version strings.",
    "signature": "semverCompare(...): number",
    "example": "semverCompare(...)",
    "output": "..."
  },
  {
    "id": "semversatisfies",
    "name": "semverSatisfies",
    "module": "Semver",
    "description": "Checks if a version satisfies a range expression (e.g. \"^1.2.3\", \">=1.0.0 <2.0.0\", \"~1.0.0 || ^2.0.0\").",
    "signature": "semverSatisfies(...): boolean",
    "example": "semverSatisfies(...)",
    "output": "..."
  },
  {
    "id": "unionofsets",
    "name": "unionOfSets",
    "module": "Set",
    "description": "Creates a new set containing elements present in either set A or set B.",
    "signature": "unionOfSets(...): Set<T>",
    "example": "unionOfSets(...)",
    "output": "..."
  },
  {
    "id": "intersectionofsets",
    "name": "intersectionOfSets",
    "module": "Set",
    "description": "Creates a new set containing elements present in both set A and set B.",
    "signature": "intersectionOfSets(...): Set<T>",
    "example": "intersectionOfSets(...)",
    "output": "..."
  },
  {
    "id": "differenceofsets",
    "name": "differenceOfSets",
    "module": "Set",
    "description": "Creates a new set containing elements present in set A but not in set B.",
    "signature": "differenceOfSets(...): Set<T>",
    "example": "differenceOfSets(...)",
    "output": "..."
  },
  {
    "id": "setsymmetricdifference",
    "name": "setSymmetricDifference",
    "module": "Set",
    "description": "Creates a new set containing elements present in either set A or set B, but not both.",
    "signature": "setSymmetricDifference(...): Set<T>",
    "example": "setSymmetricDifference(...)",
    "output": "..."
  },
  {
    "id": "issetsubset",
    "name": "isSetSubset",
    "module": "Set",
    "description": "Checks if set A is a subset of set B (all elements of A are in B).",
    "signature": "isSetSubset(...): boolean",
    "example": "isSetSubset(...)",
    "output": "..."
  },
  {
    "id": "issetsuperset",
    "name": "isSetSuperset",
    "module": "Set",
    "description": "Checks if set A is a superset of set B (all elements of B are in A).",
    "signature": "isSetSuperset(...): boolean",
    "example": "isSetSuperset(...)",
    "output": "..."
  },
  {
    "id": "isdisjoint",
    "name": "isDisjoint",
    "module": "Set",
    "description": "Checks if set A and set B have no elements in common.",
    "signature": "isDisjoint(...): boolean",
    "example": "isDisjoint(...)",
    "output": "..."
  },
  {
    "id": "mapset",
    "name": "mapSet",
    "module": "Set",
    "description": "Maps over a set to produce a new set.",
    "signature": "mapSet(...): Set<U>",
    "example": "mapSet(...)",
    "output": "..."
  },
  {
    "id": "filterset",
    "name": "filterSet",
    "module": "Set",
    "description": "Filters a set to produce a new set.",
    "signature": "filterSet(...): Set<T>",
    "example": "filterSet(...)",
    "output": "..."
  },
  {
    "id": "cartesianproduct",
    "name": "cartesianProduct",
    "module": "Set",
    "description": "Creates the Cartesian product of two sets.",
    "signature": "cartesianProduct(...): Set<[T, U]>",
    "example": "cartesianProduct(...)",
    "output": "..."
  },
  {
    "id": "batch",
    "name": "batch",
    "module": "Signals",
    "description": "Executes a callback within a batch transaction.",
    "signature": "batch(...): T",
    "example": "batch(...)",
    "output": "..."
  },
  {
    "id": "untrack",
    "name": "untrack",
    "module": "Signals",
    "description": "Runs a function without tracking any signal access as dependencies.",
    "signature": "untrack(...): T",
    "example": "untrack(...)",
    "output": "..."
  },
  {
    "id": "issignal",
    "name": "isSignal",
    "module": "Signals",
    "description": "Checks whether a given value is an OptiKit Signal.",
    "signature": "isSignal(...): val is Signal<any> | ReadonlySignal<any>",
    "example": "isSignal(...)",
    "output": "..."
  },
  {
    "id": "signal",
    "name": "signal",
    "module": "Signals",
    "description": "Creates a reactive signal holding a mutable state value.",
    "signature": "signal(...): Signal<T>",
    "example": "signal(...)",
    "output": "..."
  },
  {
    "id": "computed",
    "name": "computed",
    "module": "Signals",
    "description": "Creates a memoized computed signal derived from other signals.",
    "signature": "computed(...): ReadonlySignal<T>",
    "example": "computed(...)",
    "output": "..."
  },
  {
    "id": "effect",
    "name": "effect",
    "module": "Signals",
    "description": "Creates a reactive effect that runs immediately and re-executes whenever",
    "signature": "effect(...): () => void",
    "example": "effect(...)",
    "output": "..."
  },
  {
    "id": "bubblesort",
    "name": "bubbleSort",
    "module": "Sort",
    "description": "Bubble Sort algorithm.",
    "signature": "bubbleSort(...): T[]",
    "example": "bubbleSort(...)",
    "output": "..."
  },
  {
    "id": "selectionsort",
    "name": "selectionSort",
    "module": "Sort",
    "description": "Selection Sort algorithm.",
    "signature": "selectionSort(...): T[]",
    "example": "selectionSort(...)",
    "output": "..."
  },
  {
    "id": "insertionsort",
    "name": "insertionSort",
    "module": "Sort",
    "description": "Insertion Sort algorithm.",
    "signature": "insertionSort(...): T[]",
    "example": "insertionSort(...)",
    "output": "..."
  },
  {
    "id": "mergesort",
    "name": "mergeSort",
    "module": "Sort",
    "description": "Merge Sort algorithm.",
    "signature": "mergeSort(...): T[]",
    "example": "mergeSort(...)",
    "output": "..."
  },
  {
    "id": "quicksort",
    "name": "quickSort",
    "module": "Sort",
    "description": "Quick Sort algorithm.",
    "signature": "quickSort(...): T[]",
    "example": "quickSort(...)",
    "output": "..."
  },
  {
    "id": "heapsort",
    "name": "heapSort",
    "module": "Sort",
    "description": "Heap Sort algorithm.",
    "signature": "heapSort(...): T[]",
    "example": "heapSort(...)",
    "output": "..."
  },
  {
    "id": "issorted",
    "name": "isSorted",
    "module": "Sort",
    "description": "Check if array is sorted.",
    "signature": "isSorted(...): boolean",
    "example": "isSorted(...)",
    "output": "..."
  },
  {
    "id": "mode",
    "name": "mode",
    "module": "Statistics",
    "description": "Returns the most frequently occurring value(s) in an array.",
    "signature": "mode(...): number[]",
    "example": "mode(...)",
    "output": "..."
  },
  {
    "id": "variance",
    "name": "variance",
    "module": "Statistics",
    "description": "Calculates the variance of a dataset.",
    "signature": "variance(...): number",
    "example": "variance(...)",
    "output": "..."
  },
  {
    "id": "percentile",
    "name": "percentile",
    "module": "Statistics",
    "description": "Calculates the p-th percentile of an array of numbers.",
    "signature": "percentile(...): number",
    "example": "percentile(...)",
    "output": "..."
  },
  {
    "id": "quartiles",
    "name": "quartiles",
    "module": "Statistics",
    "description": "Returns the 1st (25%), 2nd (50%/median), and 3rd (75%) quartiles of an array.",
    "signature": "quartiles(...): ",
    "example": "quartiles(...)",
    "output": "..."
  },
  {
    "id": "zscore",
    "name": "zScore",
    "module": "Statistics",
    "description": "Calculates the z-score for a specific value given a dataset.",
    "signature": "zScore(...): number",
    "example": "zScore(...)",
    "output": "..."
  },
  {
    "id": "covariance",
    "name": "covariance",
    "module": "Statistics",
    "description": "Calculates the covariance between two equally-sized arrays of numbers.",
    "signature": "covariance(...): number",
    "example": "covariance(...)",
    "output": "..."
  },
  {
    "id": "correlation",
    "name": "correlation",
    "module": "Statistics",
    "description": "Calculates the Pearson correlation coefficient between two arrays.",
    "signature": "correlation(...): number",
    "example": "correlation(...)",
    "output": "..."
  },
  {
    "id": "skewness",
    "name": "skewness",
    "module": "Statistics",
    "description": "Calculates the skewness (asymmetry) of a dataset.",
    "signature": "skewness(...): number",
    "example": "skewness(...)",
    "output": "..."
  },
  {
    "id": "kurtosis",
    "name": "kurtosis",
    "module": "Statistics",
    "description": "Calculates the excess kurtosis (tailedness) of a dataset.",
    "signature": "kurtosis(...): number",
    "example": "kurtosis(...)",
    "output": "..."
  },
  {
    "id": "movingaverage",
    "name": "movingAverage",
    "module": "Statistics",
    "description": "Calculates the simple moving average of an array with a given window size.",
    "signature": "movingAverage(...): number[]",
    "example": "movingAverage(...)",
    "output": "..."
  },
  {
    "id": "weightedaverage",
    "name": "weightedAverage",
    "module": "Statistics",
    "description": "Calculates the weighted average of values with corresponding weights.",
    "signature": "weightedAverage(...): number",
    "example": "weightedAverage(...)",
    "output": "..."
  },
  {
    "id": "geometricmean",
    "name": "geometricMean",
    "module": "Statistics",
    "description": "Calculates the geometric mean of an array of positive numbers.",
    "signature": "geometricMean(...): number",
    "example": "geometricMean(...)",
    "output": "..."
  },
  {
    "id": "safestorage",
    "name": "safeStorage",
    "module": "Storage",
    "description": "An isomorphic wrapper for LocalStorage and SessionStorage supporting JSON serialization,",
    "signature": "safeStorage(...)",
    "example": "safeStorage(...)",
    "output": "..."
  },
  {
    "id": "createstore",
    "name": "createStore",
    "module": "Store",
    "description": "Creates a lightweight state store using a publish-subscribe model (Zustand style).",
    "signature": "createStore(...): Store<T>",
    "example": "createStore(...)",
    "output": "..."
  },
  {
    "id": "capitalize",
    "name": "capitalize",
    "module": "String",
    "description": "Capitalizes the first character of a string.",
    "signature": "capitalize(...): string",
    "example": "capitalize(...)",
    "output": "..."
  },
  {
    "id": "slugify",
    "name": "slugify",
    "module": "String",
    "description": "Converts a string into a URL-friendly slug with customization options.",
    "signature": "slugify(...): any",
    "example": "slugify(...)",
    "output": "..."
  },
  {
    "id": "truncate",
    "name": "truncate",
    "module": "String",
    "description": "Truncates a string to a specified length with customizable separator and suffix.",
    "signature": "truncate(...): any",
    "example": "truncate(...)",
    "output": "..."
  },
  {
    "id": "camelcase",
    "name": "camelCase",
    "module": "String",
    "description": "Converts a string to camelCase.",
    "signature": "camelCase(...): string",
    "example": "camelCase(...)",
    "output": "..."
  },
  {
    "id": "kebabcase",
    "name": "kebabCase",
    "module": "String",
    "description": "Converts a string to kebab-case.",
    "signature": "kebabCase(...): string",
    "example": "kebabCase(...)",
    "output": "..."
  },
  {
    "id": "snakecase",
    "name": "snakeCase",
    "module": "String",
    "description": "Converts a string to snake_case.",
    "signature": "snakeCase(...): string",
    "example": "snakeCase(...)",
    "output": "..."
  },
  {
    "id": "escapehtml",
    "name": "escapeHtml",
    "module": "String",
    "description": "Escapes HTML characters: &, <, >, \", and ' in a string.",
    "signature": "escapeHtml(...): string",
    "example": "escapeHtml(...)",
    "output": "..."
  },
  {
    "id": "unescapehtml",
    "name": "unescapeHtml",
    "module": "String",
    "description": "Unescapes HTML entities back to characters.",
    "signature": "unescapeHtml(...): string",
    "example": "unescapeHtml(...)",
    "output": "..."
  },
  {
    "id": "striphtml",
    "name": "stripHtml",
    "module": "String",
    "description": "Removes all HTML tags from a string.",
    "signature": "stripHtml(...): string",
    "example": "stripHtml(...)",
    "output": "..."
  },
  {
    "id": "wordcount",
    "name": "wordCount",
    "module": "String",
    "description": "Counts the number of words in a string.",
    "signature": "wordCount(...): number",
    "example": "wordCount(...)",
    "output": "..."
  },
  {
    "id": "pad",
    "name": "pad",
    "module": "String",
    "description": "Pads a string to a target length with a fill character.",
    "signature": "pad(...): any",
    "example": "pad(...)",
    "output": "..."
  },
  {
    "id": "repeat",
    "name": "repeat",
    "module": "String",
    "description": "Repeats a string a given number of times with an optional separator.",
    "signature": "repeat(...): string",
    "example": "repeat(...)",
    "output": "..."
  },
  {
    "id": "reversewords",
    "name": "reverseWords",
    "module": "String",
    "description": "Reverses the order of words in a string.",
    "signature": "reverseWords(...): string",
    "example": "reverseWords(...)",
    "output": "..."
  },
  {
    "id": "titlecase",
    "name": "titleCase",
    "module": "String",
    "description": "Converts a string to Title Case.",
    "signature": "titleCase(...): any",
    "example": "titleCase(...)",
    "output": "..."
  },
  {
    "id": "countoccurrences",
    "name": "countOccurrences",
    "module": "String",
    "description": "Counts how many times a substring appears in a string.",
    "signature": "countOccurrences(...): any",
    "example": "countOccurrences(...)",
    "output": "..."
  },
  {
    "id": "interpolate",
    "name": "interpolate",
    "module": "String",
    "description": "Interpolates template variables in a string using a data object.",
    "signature": "interpolate(...): any",
    "example": "interpolate(...)",
    "output": "..."
  },
  {
    "id": "pascalcase",
    "name": "pascalCase",
    "module": "String",
    "description": "Converts a string to PascalCase.",
    "signature": "pascalCase(...): string",
    "example": "pascalCase(...)",
    "output": "..."
  },
  {
    "id": "swapcase",
    "name": "swapCase",
    "module": "String",
    "description": "Swaps the casing of each character in a string.",
    "signature": "swapCase(...): string",
    "example": "swapCase(...)",
    "output": "..."
  },
  {
    "id": "trimall",
    "name": "trimAll",
    "module": "String",
    "description": "Removes all whitespace characters from a string.",
    "signature": "trimAll(...): string",
    "example": "trimAll(...)",
    "output": "..."
  },
  {
    "id": "chars",
    "name": "chars",
    "module": "String",
    "description": "Splits a string into an array of its characters.",
    "signature": "chars(...): string[]",
    "example": "chars(...)",
    "output": "..."
  },
  {
    "id": "chop",
    "name": "chop",
    "module": "String",
    "description": "Chops a string into pieces of a specific length.",
    "signature": "chop(...): string[]",
    "example": "chop(...)",
    "output": "..."
  },
  {
    "id": "endswithany",
    "name": "endsWithAny",
    "module": "String",
    "description": "Checks if a string ends with any of the provided suffixes.",
    "signature": "endsWithAny(...): boolean",
    "example": "endsWithAny(...)",
    "output": "..."
  },
  {
    "id": "startswithany",
    "name": "startsWithAny",
    "module": "String",
    "description": "Checks if a string starts with any of the provided prefixes.",
    "signature": "startsWithAny(...): boolean",
    "example": "startsWithAny(...)",
    "output": "..."
  },
  {
    "id": "insert",
    "name": "insert",
    "module": "String",
    "description": "Inserts a substring at a specific index.",
    "signature": "insert(...): string",
    "example": "insert(...)",
    "output": "..."
  },
  {
    "id": "reverse",
    "name": "reverse",
    "module": "String",
    "description": "Reverses the characters in a string.",
    "signature": "reverse(...): string",
    "example": "reverse(...)",
    "output": "..."
  },
  {
    "id": "mask",
    "name": "mask",
    "module": "String",
    "description": "Masks a string with a character, leaving some characters visible.",
    "signature": "mask(...): any",
    "example": "mask(...)",
    "output": "..."
  },
  {
    "id": "removenonwords",
    "name": "removeNonWords",
    "module": "String",
    "description": "Removes all non-word characters (everything except a-z, A-Z, 0-9, and _).",
    "signature": "removeNonWords(...): string",
    "example": "removeNonWords(...)",
    "output": "..."
  },
  {
    "id": "isblank",
    "name": "isBlank",
    "module": "String",
    "description": "Checks if a string is empty or contains only whitespace.",
    "signature": "isBlank(...): boolean",
    "example": "isBlank(...)",
    "output": "..."
  },
  {
    "id": "islower",
    "name": "isLower",
    "module": "String",
    "description": "Checks if a string is entirely lowercase.",
    "signature": "isLower(...): boolean",
    "example": "isLower(...)",
    "output": "..."
  },
  {
    "id": "isupper",
    "name": "isUpper",
    "module": "String",
    "description": "Checks if a string is entirely uppercase.",
    "signature": "isUpper(...): boolean",
    "example": "isUpper(...)",
    "output": "..."
  },
  {
    "id": "surround",
    "name": "surround",
    "module": "String",
    "description": "Surrounds a string with a prefix and suffix.",
    "signature": "surround(...): string",
    "example": "surround(...)",
    "output": "..."
  },
  {
    "id": "ispalindrome",
    "name": "isPalindrome",
    "module": "String",
    "description": "Checks if a string is a palindrome.",
    "signature": "isPalindrome(...): any",
    "example": "isPalindrome(...)",
    "output": "..."
  },
  {
    "id": "collapsewhitespace",
    "name": "collapseWhitespace",
    "module": "String",
    "description": "Collapses multiple consecutive whitespace characters into a single space and trims the result.",
    "signature": "collapseWhitespace(...): string",
    "example": "collapseWhitespace(...)",
    "output": "..."
  },
  {
    "id": "dotcase",
    "name": "dotCase",
    "module": "String",
    "description": "Converts a string to dot.case.",
    "signature": "dotCase(...): string",
    "example": "dotCase(...)",
    "output": "..."
  },
  {
    "id": "headercase",
    "name": "headerCase",
    "module": "String",
    "description": "Converts a string to Header-Case (Title-Kebab-Case).",
    "signature": "headerCase(...): string",
    "example": "headerCase(...)",
    "output": "..."
  },
  {
    "id": "ensureprefix",
    "name": "ensurePrefix",
    "module": "String",
    "description": "Ensures a string starts with the given prefix.",
    "signature": "ensurePrefix(...): string",
    "example": "ensurePrefix(...)",
    "output": "..."
  },
  {
    "id": "ensuresuffix",
    "name": "ensureSuffix",
    "module": "String",
    "description": "Ensures a string ends with the given suffix.",
    "signature": "ensureSuffix(...): string",
    "example": "ensureSuffix(...)",
    "output": "..."
  },
  {
    "id": "stripprefix",
    "name": "stripPrefix",
    "module": "String",
    "description": "Removes a prefix from the start of a string if present.",
    "signature": "stripPrefix(...): string",
    "example": "stripPrefix(...)",
    "output": "..."
  },
  {
    "id": "stripsuffix",
    "name": "stripSuffix",
    "module": "String",
    "description": "Removes a suffix from the end of a string if present.",
    "signature": "stripSuffix(...): string",
    "example": "stripSuffix(...)",
    "output": "..."
  },
  {
    "id": "lines",
    "name": "lines",
    "module": "String",
    "description": "Splits a multi-line string into an array of individual lines.",
    "signature": "lines(...): string[]",
    "example": "lines(...)",
    "output": "..."
  },
  {
    "id": "unlines",
    "name": "unlines",
    "module": "String",
    "description": "Joins an array of line strings into a single multi-line string.",
    "signature": "unlines(...): string",
    "example": "unlines(...)",
    "output": "..."
  },
  {
    "id": "levenshteindistance",
    "name": "levenshteinDistance",
    "module": "String",
    "description": "Computes the Levenshtein distance (edit distance) between two strings.",
    "signature": "levenshteinDistance(...): number",
    "example": "levenshteinDistance(...)",
    "output": "..."
  },
  {
    "id": "stringsimilarity",
    "name": "stringSimilarity",
    "module": "String",
    "description": "Calculates string similarity score between 0 and 1 using Levenshtein distance.",
    "signature": "stringSimilarity(...): number",
    "example": "stringSimilarity(...)",
    "output": "..."
  },
  {
    "id": "getfileextension",
    "name": "getFileExtension",
    "module": "String",
    "description": "Extracts the file extension from a filename or path.",
    "signature": "getFileExtension(...): string",
    "example": "getFileExtension(...)",
    "output": "..."
  },
  {
    "id": "getfilename",
    "name": "getFileName",
    "module": "String",
    "description": "Extracts the filename without its extension.",
    "signature": "getFileName(...): string",
    "example": "getFileName(...)",
    "output": "..."
  },
  {
    "id": "escaperegexp",
    "name": "escapeRegExp",
    "module": "String",
    "description": "Escapes special characters in a string for use in a regular expression.",
    "signature": "escapeRegExp(...): string",
    "example": "escapeRegExp(...)",
    "output": "..."
  },
  {
    "id": "render",
    "name": "render",
    "module": "Template",
    "description": "Renders a logic-less template string by interpolating data, loops, and conditionals.",
    "signature": "render(...): string",
    "example": "render(...)",
    "output": "..."
  },
  {
    "id": "compile",
    "name": "compile",
    "module": "Template",
    "description": "Pre-compiles a template string into a reusable rendering function for faster execution.",
    "signature": "compile(...): any",
    "example": "compile(...)",
    "output": "..."
  },
  {
    "id": "arraytotree",
    "name": "arrayToTree",
    "module": "Tree",
    "description": "Converts a flat array of items with parent-child relationships into a nested tree structure.",
    "signature": "arrayToTree(...): any",
    "example": "arrayToTree(...)",
    "output": "..."
  },
  {
    "id": "treetoarray",
    "name": "treeToArray",
    "module": "Tree",
    "description": "Flattens a nested tree structure back into a flat array of nodes.",
    "signature": "treeToArray(...): any",
    "example": "treeToArray(...)",
    "output": "..."
  },
  {
    "id": "celsiustofahrenheit",
    "name": "celsiusToFahrenheit",
    "module": "Units",
    "description": "Converts Celsius to Fahrenheit.",
    "signature": "celsiusToFahrenheit(...): number",
    "example": "celsiusToFahrenheit(...)",
    "output": "..."
  },
  {
    "id": "fahrenheittocelsius",
    "name": "fahrenheitToCelsius",
    "module": "Units",
    "description": "Converts Fahrenheit to Celsius.",
    "signature": "fahrenheitToCelsius(...): number",
    "example": "fahrenheitToCelsius(...)",
    "output": "..."
  },
  {
    "id": "milestokilometers",
    "name": "milesToKilometers",
    "module": "Units",
    "description": "Converts miles to kilometers.",
    "signature": "milesToKilometers(...): number",
    "example": "milesToKilometers(...)",
    "output": "..."
  },
  {
    "id": "kilometerstomiles",
    "name": "kilometersToMiles",
    "module": "Units",
    "description": "Converts kilometers to miles.",
    "signature": "kilometersToMiles(...): number",
    "example": "kilometersToMiles(...)",
    "output": "..."
  },
  {
    "id": "poundstokilograms",
    "name": "poundsToKilograms",
    "module": "Units",
    "description": "Converts pounds to kilograms.",
    "signature": "poundsToKilograms(...): number",
    "example": "poundsToKilograms(...)",
    "output": "..."
  },
  {
    "id": "kilogramstopounds",
    "name": "kilogramsToPounds",
    "module": "Units",
    "description": "Converts kilograms to pounds.",
    "signature": "kilogramsToPounds(...): number",
    "example": "kilogramsToPounds(...)",
    "output": "..."
  },
  {
    "id": "degreestoradians",
    "name": "degreesToRadians",
    "module": "Units",
    "description": "Converts degrees to radians.",
    "signature": "degreesToRadians(...): number",
    "example": "degreesToRadians(...)",
    "output": "..."
  },
  {
    "id": "radianstodegrees",
    "name": "radiansToDegrees",
    "module": "Units",
    "description": "Converts radians to degrees.",
    "signature": "radiansToDegrees(...): number",
    "example": "radiansToDegrees(...)",
    "output": "..."
  },
  {
    "id": "joinpaths",
    "name": "joinPaths",
    "module": "Url",
    "description": "Joins multiple path segments safely without creating duplicate forward slashes.",
    "signature": "joinPaths(...): string",
    "example": "joinPaths(...)",
    "output": "..."
  },
  {
    "id": "parseurl",
    "name": "parseUrl",
    "module": "Url",
    "description": "Parses a URL string into structured parts. Falls back gracefully for malformed strings.",
    "signature": "parseUrl(...): ",
    "example": "parseUrl(...)",
    "output": "..."
  },
  {
    "id": "stringifyquery",
    "name": "stringifyQuery",
    "module": "Url",
    "description": "Converts a key-value object into a URL query string (e.g. \"?a=1&b=2\").",
    "signature": "stringifyQuery(...): string",
    "example": "stringifyQuery(...)",
    "output": "..."
  },
  {
    "id": "buildurl",
    "name": "buildUrl",
    "module": "Url",
    "description": "Constructs a full URL string given a base URL and an object of query parameters.",
    "signature": "buildUrl(...): string",
    "example": "buildUrl(...)",
    "output": "..."
  },
  {
    "id": "isabsoluteurl",
    "name": "isAbsoluteUrl",
    "module": "Url",
    "description": "Checks whether a given string is an absolute URL (contains a protocol).",
    "signature": "isAbsoluteUrl(...): boolean",
    "example": "isAbsoluteUrl(...)",
    "output": "..."
  },
  {
    "id": "getbaseurl",
    "name": "getBaseUrl",
    "module": "Url",
    "description": "Extracts the base URL (protocol + host) from a full URL string.",
    "signature": "getBaseUrl(...): string",
    "example": "getBaseUrl(...)",
    "output": "..."
  },
  {
    "id": "removequery",
    "name": "removeQuery",
    "module": "Url",
    "description": "Removes all query parameters and hash fragments from a URL.",
    "signature": "removeQuery(...): string",
    "example": "removeQuery(...)",
    "output": "..."
  },
  {
    "id": "addqueryparam",
    "name": "addQueryParam",
    "module": "Url",
    "description": "Adds or updates query parameters in an existing URL string.",
    "signature": "addQueryParam(...): string",
    "example": "addQueryParam(...)",
    "output": "..."
  },
  {
    "id": "isemail",
    "name": "isEmail",
    "module": "Validate",
    "description": "Validates whether a string is a properly formatted email.",
    "signature": "isEmail(...): boolean",
    "example": "isEmail(...)",
    "output": "..."
  },
  {
    "id": "isurl",
    "name": "isUrl",
    "module": "Validate",
    "description": "Validates whether a string is a valid absolute URL.",
    "signature": "isUrl(...): boolean",
    "example": "isUrl(...)",
    "output": "..."
  },
  {
    "id": "isuuid",
    "name": "isUuid",
    "module": "Validate",
    "description": "Validates whether a string is a standard UUID (v1-v5).",
    "signature": "isUuid(...): boolean",
    "example": "isUuid(...)",
    "output": "..."
  },
  {
    "id": "isphone",
    "name": "isPhone",
    "module": "Validate",
    "description": "Validates whether a string is a valid standard phone number pattern.",
    "signature": "isPhone(...): boolean",
    "example": "isPhone(...)",
    "output": "..."
  },
  {
    "id": "isstrongpassword",
    "name": "isStrongPassword",
    "module": "Validate",
    "description": "Validates password strength (minimum 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char).",
    "signature": "isStrongPassword(...): boolean",
    "example": "isStrongPassword(...)",
    "output": "..."
  },
  {
    "id": "isip",
    "name": "isIP",
    "module": "Validate",
    "description": "Validates whether a string is a valid IPv4 or IPv6 address.",
    "signature": "isIP(...): boolean",
    "example": "isIP(...)",
    "output": "..."
  },
  {
    "id": "isdatevalid",
    "name": "isDateValid",
    "module": "Validate",
    "description": "Validates whether a string represents a valid, parseable calendar date.",
    "signature": "isDateValid(...): boolean",
    "example": "isDateValid(...)",
    "output": "..."
  },
  {
    "id": "isalpha",
    "name": "isAlpha",
    "module": "Validate",
    "description": "Validates whether a string contains only alphabetic characters.",
    "signature": "isAlpha(...): boolean",
    "example": "isAlpha(...)",
    "output": "..."
  },
  {
    "id": "isalphanumeric",
    "name": "isAlphanumeric",
    "module": "Validate",
    "description": "Validates whether a string contains only alphanumeric characters.",
    "signature": "isAlphanumeric(...): boolean",
    "example": "isAlphanumeric(...)",
    "output": "..."
  },
  {
    "id": "isnumeric",
    "name": "isNumeric",
    "module": "Validate",
    "description": "Validates whether a string contains only numbers.",
    "signature": "isNumeric(...): boolean",
    "example": "isNumeric(...)",
    "output": "..."
  },
  {
    "id": "ishexcolor",
    "name": "isHexColor",
    "module": "Validate",
    "description": "Validates whether a string is a valid Hex Color code.",
    "signature": "isHexColor(...): boolean",
    "example": "isHexColor(...)",
    "output": "..."
  },
  {
    "id": "isbase64",
    "name": "isBase64",
    "module": "Validate",
    "description": "Validates whether a string is valid Base64 encoding.",
    "signature": "isBase64(...): boolean",
    "example": "isBase64(...)",
    "output": "..."
  },
  {
    "id": "isjson",
    "name": "isJSON",
    "module": "Validate",
    "description": "Validates whether a string is valid JSON.",
    "signature": "isJSON(...): boolean",
    "example": "isJSON(...)",
    "output": "..."
  },
  {
    "id": "isjwt",
    "name": "isJWT",
    "module": "Validate",
    "description": "Validates whether a string is a valid JWT token.",
    "signature": "isJWT(...): boolean",
    "example": "isJWT(...)",
    "output": "..."
  },
  {
    "id": "iscreditcard",
    "name": "isCreditCard",
    "module": "Validate",
    "description": "Validates whether a string represents a valid Credit Card number using the Luhn algorithm.",
    "signature": "isCreditCard(...): boolean",
    "example": "isCreditCard(...)",
    "output": "..."
  },
  {
    "id": "ismacaddress",
    "name": "isMacAddress",
    "module": "Validate",
    "description": "Validates whether a string is a valid MAC address.",
    "signature": "isMacAddress(...): boolean",
    "example": "isMacAddress(...)",
    "output": "..."
  },
  {
    "id": "isascii",
    "name": "isAscii",
    "module": "Validate",
    "description": "Validates whether a string contains only ASCII characters.",
    "signature": "isAscii(...): boolean",
    "example": "isAscii(...)",
    "output": "..."
  },
  {
    "id": "isbooleanstring",
    "name": "isBooleanString",
    "module": "Validate",
    "description": "Validates whether a string represents a boolean (\"true\", \"false\", \"1\", \"0\").",
    "signature": "isBooleanString(...): boolean",
    "example": "isBooleanString(...)",
    "output": "..."
  },
  {
    "id": "isdatauri",
    "name": "isDataURI",
    "module": "Validate",
    "description": "Validates whether a string is a valid Data URI.",
    "signature": "isDataURI(...): boolean",
    "example": "isDataURI(...)",
    "output": "..."
  },
  {
    "id": "isport",
    "name": "isPort",
    "module": "Validate",
    "description": "Validates whether a value is a valid port number.",
    "signature": "isPort(...): boolean",
    "example": "isPort(...)",
    "output": "..."
  },
  {
    "id": "issemver",
    "name": "isSemVer",
    "module": "Validate",
    "description": "Validates whether a string is a Semantic Versioning (SemVer) string.",
    "signature": "isSemVer(...): boolean",
    "example": "isSemVer(...)",
    "output": "..."
  },
  {
    "id": "isslug",
    "name": "isSlug",
    "module": "Validate",
    "description": "Validates whether a string is a valid slug (kebab-case alphanumeric).",
    "signature": "isSlug(...): boolean",
    "example": "isSlug(...)",
    "output": "..."
  },
  {
    "id": "ishexadecimal",
    "name": "isHexadecimal",
    "module": "Validate",
    "description": "Validates whether a string is a hexadecimal value.",
    "signature": "isHexadecimal(...): boolean",
    "example": "isHexadecimal(...)",
    "output": "..."
  },
  {
    "id": "ismd5",
    "name": "isMD5",
    "module": "Validate",
    "description": "Validates whether a string is a valid MD5 hash.",
    "signature": "isMD5(...): boolean",
    "example": "isMD5(...)",
    "output": "..."
  },
  {
    "id": "issha256",
    "name": "isSHA256",
    "module": "Validate",
    "description": "Validates whether a string is a valid SHA256 hash.",
    "signature": "isSHA256(...): boolean",
    "example": "isSHA256(...)",
    "output": "..."
  },
  {
    "id": "islatitude",
    "name": "isLatitude",
    "module": "Validate",
    "description": "Validates whether a value is a valid latitude coordinate (-90 to 90).",
    "signature": "isLatitude(...): boolean",
    "example": "isLatitude(...)",
    "output": "..."
  },
  {
    "id": "islongitude",
    "name": "isLongitude",
    "module": "Validate",
    "description": "Validates whether a value is a valid longitude coordinate (-180 to 180).",
    "signature": "isLongitude(...): boolean",
    "example": "isLongitude(...)",
    "output": "..."
  },
  {
    "id": "islatlong",
    "name": "isLatLong",
    "module": "Validate",
    "description": "Validates whether a string is a valid \"lat,long\" or \"lat, long\" coordinate pair.",
    "signature": "isLatLong(...): boolean",
    "example": "isLatLong(...)",
    "output": "..."
  },
  {
    "id": "vecadd",
    "name": "vecAdd",
    "module": "Vector",
    "description": "Adds two vectors.",
    "signature": "vecAdd(...): Vec",
    "example": "vecAdd(...)",
    "output": "..."
  },
  {
    "id": "vecsub",
    "name": "vecSub",
    "module": "Vector",
    "description": "Subtracts vector b from vector a.",
    "signature": "vecSub(...): Vec",
    "example": "vecSub(...)",
    "output": "..."
  },
  {
    "id": "vecmul",
    "name": "vecMul",
    "module": "Vector",
    "description": "Multiplies a vector by a scalar or another vector.",
    "signature": "vecMul(...): Vec",
    "example": "vecMul(...)",
    "output": "..."
  },
  {
    "id": "vecdiv",
    "name": "vecDiv",
    "module": "Vector",
    "description": "Divides a vector by a scalar or another vector.",
    "signature": "vecDiv(...): Vec",
    "example": "vecDiv(...)",
    "output": "..."
  },
  {
    "id": "vecdot",
    "name": "vecDot",
    "module": "Vector",
    "description": "Calculates the dot product of two vectors.",
    "signature": "vecDot(...): number",
    "example": "vecDot(...)",
    "output": "..."
  },
  {
    "id": "veccross",
    "name": "vecCross",
    "module": "Vector",
    "description": "Calculates the cross product of two 3D vectors.",
    "signature": "vecCross(...): Vec3",
    "example": "vecCross(...)",
    "output": "..."
  },
  {
    "id": "vecmagsq",
    "name": "vecMagSq",
    "module": "Vector",
    "description": "Calculates the squared magnitude of a vector.",
    "signature": "vecMagSq(...): number",
    "example": "vecMagSq(...)",
    "output": "..."
  },
  {
    "id": "vecmag",
    "name": "vecMag",
    "module": "Vector",
    "description": "Calculates the magnitude (length) of a vector.",
    "signature": "vecMag(...): number",
    "example": "vecMag(...)",
    "output": "..."
  },
  {
    "id": "vecnormalize",
    "name": "vecNormalize",
    "module": "Vector",
    "description": "Normalizes a vector (makes its length 1).",
    "signature": "vecNormalize(...): Vec",
    "example": "vecNormalize(...)",
    "output": "..."
  },
  {
    "id": "vecdistsq",
    "name": "vecDistSq",
    "module": "Vector",
    "description": "Calculates the squared distance between two vectors.",
    "signature": "vecDistSq(...): number",
    "example": "vecDistSq(...)",
    "output": "..."
  },
  {
    "id": "vecdist",
    "name": "vecDist",
    "module": "Vector",
    "description": "Calculates the distance between two vectors.",
    "signature": "vecDist(...): number",
    "example": "vecDist(...)",
    "output": "..."
  },
  {
    "id": "veclerp",
    "name": "vecLerp",
    "module": "Vector",
    "description": "Linearly interpolates between two vectors.",
    "signature": "vecLerp(...): Vec",
    "example": "vecLerp(...)",
    "output": "..."
  },
  {
    "id": "vecangle",
    "name": "vecAngle",
    "module": "Vector",
    "description": "Calculates the angle between two vectors in radians.",
    "signature": "vecAngle(...): number",
    "example": "vecAngle(...)",
    "output": "..."
  },
  {
    "id": "vecproject",
    "name": "vecProject",
    "module": "Vector",
    "description": "Projects vector a onto vector b.",
    "signature": "vecProject(...): Vec",
    "example": "vecProject(...)",
    "output": "..."
  },
  {
    "id": "vecreflect",
    "name": "vecReflect",
    "module": "Vector",
    "description": "Reflects a vector around a normal.",
    "signature": "vecReflect(...): Vec",
    "example": "vecReflect(...)",
    "output": "..."
  }
];
