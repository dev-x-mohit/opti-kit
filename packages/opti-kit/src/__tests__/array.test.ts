import { describe, it, expect } from "vitest";
import {
  chunk,
  unique,
  difference,
  intersection,
  groupBy,
  shuffle,
  sample,
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
});
