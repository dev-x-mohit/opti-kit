import { bench, describe } from "vitest";
import { chunk, unique, intersection } from "../src/array";
import _ from "lodash";

describe("Array - chunk", () => {
  const arr = Array.from({ length: 10000 }, (_, i) => i);

  bench("opti-kit chunk", () => {
    chunk(arr, 100);
  });

  bench("lodash chunk", () => {
    _.chunk(arr, 100);
  });
});

describe("Array - unique", () => {
  const arr = Array.from({ length: 10000 }, () => Math.floor(Math.random() * 1000));

  bench("opti-kit unique", () => {
    unique(arr);
  });

  bench("lodash uniq", () => {
    _.uniq(arr);
  });
});

describe("Array - intersection", () => {
  const arr1 = Array.from({ length: 5000 }, () => Math.floor(Math.random() * 10000));
  const arr2 = Array.from({ length: 5000 }, () => Math.floor(Math.random() * 10000));
  const arr3 = Array.from({ length: 5000 }, () => Math.floor(Math.random() * 10000));

  bench("opti-kit intersection", () => {
    intersection(arr1, arr2, arr3);
  });

  bench("lodash intersection", () => {
    _.intersection(arr1, arr2, arr3);
  });
});
