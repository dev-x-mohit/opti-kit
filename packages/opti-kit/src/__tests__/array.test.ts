import { describe, it, expect } from "vitest";
import {
  chunk,
  unique,
  difference,
  intersection,
  groupBy,
  shuffle,
  sample,
  uniqueBy,
  flatten,
  countBy,
  compact,
  drop,
  dropRight,
  take,
  takeRight,
  initial,
  last,
  first,
  zip,
  unzip,
  union,
  partition,
  without,
  reject,
  keyBy,
  nth,
  sampleSize,
  sortBy,
  range,
  rotate,
  minBy,
  maxBy,
  sumBy,
  meanBy,
  move,
  swap,
  intersperse,
  scan,
  pluck,
  flatDeep,
} from "../array";

describe("array utilities", () => {
  it("chunk", () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    expect(chunk([1, 2], 0)).toEqual([]);
    expect(chunk([], 2)).toEqual([]);
  });

  it("unique", () => {
    expect(unique([1, 2, 2, 3, 1])).toEqual([1, 2, 3]);
    expect(unique([])).toEqual([]);
  });

  it("difference", () => {
    expect(difference([1, 2, 3, 4], [2, 4])).toEqual([1, 3]);
    expect(difference([1, 2], [3], [1])).toEqual([2]);
    expect(difference([])).toEqual([]);
  });

  it("intersection", () => {
    expect(intersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3]);
    expect(intersection([1, 2], [2, 3], [2, 4])).toEqual([2]);
    expect(intersection([])).toEqual([]);
  });

  it("groupBy", () => {
    const list = [
      { id: 1, group: "A" },
      { id: 2, group: "B" },
      { id: 3, group: "A" },
    ];
    expect(groupBy(list, (item) => item.group)).toEqual({
      A: [
        { id: 1, group: "A" },
        { id: 3, group: "A" },
      ],
      B: [{ id: 2, group: "B" }],
    });
  });

  it("shuffle", () => {
    const arr = [1, 2, 3, 4, 5];
    const shuffled = shuffle(arr);
    expect(shuffled).toHaveLength(5);
    expect(shuffled).toEqual(expect.arrayContaining(arr));
    // The shuffled array should not be mutated in-place
    expect(shuffled).not.toBe(arr);
  });

  it("sample", () => {
    const arr = [10, 20, 30];
    const item = sample(arr);
    expect(arr).toContain(item);
    expect(sample([])).toBeUndefined();
  });

  it("uniqueBy", () => {
    const list = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
      { id: 1, name: "Charlie" },
    ];
    expect(uniqueBy(list, "id")).toEqual([
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ]);
    expect(uniqueBy(list, (x) => x.name.length)).toEqual([
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
      { id: 1, name: "Charlie" },
    ]);
  });

  it("flatten", () => {
    expect(flatten([[1, 2], [3, 4]])).toEqual([1, 2, 3, 4]);
    expect(flatten([])).toEqual([]);
  });

  it("countBy", () => {
    expect(countBy([6.1, 4.2, 6.3], Math.floor)).toEqual({ 4: 1, 6: 2 });
    expect(countBy(["one", "two", "three"], (x) => x.length)).toEqual({ 3: 2, 5: 1 });
  });

  it("compact", () => {
    expect(compact([0, 1, false, 2, "", 3, null, undefined])).toEqual([1, 2, 3]);
  });

  it("drop", () => {
    expect(drop([1, 2, 3])).toEqual([2, 3]);
    expect(drop([1, 2, 3], 2)).toEqual([3]);
    expect(drop([1, 2, 3], 5)).toEqual([]);
    expect(drop([1, 2, 3], 0)).toEqual([1, 2, 3]);
  });

  it("dropRight", () => {
    expect(dropRight([1, 2, 3])).toEqual([1, 2]);
    expect(dropRight([1, 2, 3], 2)).toEqual([1]);
    expect(dropRight([1, 2, 3], 5)).toEqual([]);
    expect(dropRight([1, 2, 3], 0)).toEqual([1, 2, 3]);
  });

  it("take", () => {
    expect(take([1, 2, 3])).toEqual([1]);
    expect(take([1, 2, 3], 2)).toEqual([1, 2]);
    expect(take([1, 2, 3], 5)).toEqual([1, 2, 3]);
    expect(take([1, 2, 3], 0)).toEqual([]);
  });

  it("takeRight", () => {
    expect(takeRight([1, 2, 3])).toEqual([3]);
    expect(takeRight([1, 2, 3], 2)).toEqual([2, 3]);
    expect(takeRight([1, 2, 3], 5)).toEqual([1, 2, 3]);
    expect(takeRight([1, 2, 3], 0)).toEqual([]);
  });

  it("initial", () => {
    expect(initial([1, 2, 3])).toEqual([1, 2]);
    expect(initial([1])).toEqual([]);
  });

  it("last", () => {
    expect(last([1, 2, 3])).toBe(3);
    expect(last([])).toBeUndefined();
  });

  it("first", () => {
    expect(first([1, 2, 3])).toBe(1);
    expect(first([])).toBeUndefined();
  });

  it("zip", () => {
    expect(zip(["a", "b"], [1, 2])).toEqual([["a", 1], ["b", 2]]);
    expect(zip(["a"], [1, 2])).toEqual([["a", 1], [undefined, 2]]);
  });

  it("unzip", () => {
    expect(unzip([["a", 1], ["b", 2]])).toEqual([["a", "b"], [1, 2]]);
  });

  it("union", () => {
    expect(union([2], [1, 2])).toEqual([2, 1]);
  });

  it("partition", () => {
    const users = [
      { user: "barney", age: 36, active: false },
      { user: "fred", age: 40, active: true },
      { user: "pebbles", age: 1, active: false },
    ];
    expect(partition(users, (o) => o.active)).toEqual([
      [{ user: "fred", age: 40, active: true }],
      [
        { user: "barney", age: 36, active: false },
        { user: "pebbles", age: 1, active: false },
      ],
    ]);
  });

  it("without", () => {
    expect(without([2, 1, 2, 3], 1, 2)).toEqual([3]);
  });

  it("reject", () => {
    expect(reject([1, 2, 3, 4], (n) => n % 2 === 0)).toEqual([1, 3]);
  });

  it("keyBy", () => {
    const array = [
      { dir: "left", code: 97 },
      { dir: "right", code: 100 },
    ];
    expect(keyBy(array, "dir")).toEqual({
      left: { dir: "left", code: 97 },
      right: { dir: "right", code: 100 },
    });
    expect(keyBy(array, (o) => String.fromCharCode(o.code))).toEqual({
      a: { dir: "left", code: 97 },
      d: { dir: "right", code: 100 },
    });
  });

  it("nth", () => {
    const array = ["a", "b", "c", "d"];
    expect(nth(array, 1)).toBe("b");
    expect(nth(array, -2)).toBe("c");
    expect(nth(array, 10)).toBeUndefined();
  });

  it("sampleSize", () => {
    const arr = [1, 2, 3];
    expect(sampleSize(arr, 2)).toHaveLength(2);
    expect(sampleSize(arr, 5)).toHaveLength(3);
    expect(sampleSize(arr, 0)).toHaveLength(0);
  });

  it("sortBy", () => {
    const users = [
      { user: "fred", age: 48 },
      { user: "barney", age: 36 },
      { user: "fred", age: 40 },
    ];
    expect(sortBy(users, (o) => o.age)).toEqual([
      { user: "barney", age: 36 },
      { user: "fred", age: 40 },
      { user: "fred", age: 48 },
    ]);
  });

  it("range", () => {
    expect(range(4)).toEqual([0, 1, 2, 3]);
    expect(range(1, 5)).toEqual([1, 2, 3, 4]);
    expect(range(0, 20, 5)).toEqual([0, 5, 10, 15]);
    expect(range(0, -4, -1)).toEqual([0, -1, -2, -3]);
  });

  it("rotate", () => {
    expect(rotate([1, 2, 3, 4], 1)).toEqual([4, 1, 2, 3]);
    expect(rotate([1, 2, 3, 4], -1)).toEqual([2, 3, 4, 1]);
    expect(rotate([], 2)).toEqual([]);
  });

  it("minBy and maxBy", () => {
    const items = [{ n: 1 }, { n: 5 }, { n: 3 }];
    expect(minBy(items, o => o.n)).toEqual({ n: 1 });
    expect(maxBy(items, o => o.n)).toEqual({ n: 5 });
    expect(minBy([], o => (o as any).n)).toBeUndefined();
  });

  it("sumBy and meanBy", () => {
    const items = [{ n: 2 }, { n: 4 }, { n: 6 }];
    expect(sumBy(items, o => o.n)).toBe(12);
    expect(meanBy(items, o => o.n)).toBe(4);
    expect(meanBy([], o => (o as any).n)).toBe(0);
  });

  it("move and swap", () => {
    expect(move(["a", "b", "c", "d"], 1, 3)).toEqual(["a", "c", "d", "b"]);
    expect(swap(["a", "b", "c"], 0, 2)).toEqual(["c", "b", "a"]);
  });

  it("intersperse", () => {
    expect(intersperse(["a", "b", "c"], "-")).toEqual(["a", "-", "b", "-", "c"]);
    expect(intersperse([], "-")).toEqual([]);
  });

  it("scan", () => {
    expect(scan([1, 2, 3, 4], (sum, n) => sum + n, 0)).toEqual([0, 1, 3, 6, 10]);
  });

  it("pluck", () => {
    const users = [{ name: "Alice", age: 25 }, { name: "Bob", age: 30 }];
    expect(pluck(users, "name")).toEqual(["Alice", "Bob"]);
  });

  it("flatDeep", () => {
    expect(flatDeep([1, [2, [3, [4]]]])).toEqual([1, 2, 3, 4]);
    expect(flatDeep([1, [2, [3]]], 1)).toEqual([1, 2, [3]]);
  });
});
