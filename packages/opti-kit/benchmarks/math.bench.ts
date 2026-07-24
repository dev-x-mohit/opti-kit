import { bench, describe } from "vitest";
import * as opti from "../src/math";
import * as lodash from "lodash";

describe("Math Module Benchmarks", () => {
  const arr = Array.from({ length: 1000 }, (_, i) => i);

  bench("sum: opti", () => {
    opti.sum(arr);
  });

  bench("sum: lodash", () => {
    lodash.sum(arr);
  });

  bench("clamp: opti", () => {
    opti.clamp(150, 0, 100);
  });

  bench("clamp: lodash", () => {
    lodash.clamp(150, 0, 100);
  });
});
