import { bench, describe } from "vitest";
import * as opti from "../src/deep";
import lodash from "lodash";

describe("Deep Module Benchmarks", () => {
  const obj = { a: { b: { c: 1 } }, d: [1, 2, { e: 3 }] };

  bench("flattenDeepObject: opti", () => {
    opti.flattenDeepObject(obj);
  });
});
