import { bench, describe } from "vitest";
import * as opti from "../src/ml";

describe("ML Module Benchmarks", () => {
  bench("sigmoid", () => {
    opti.sigmoid(0.5);
  });

  bench("relu", () => {
    opti.relu(-5);
    opti.relu(5);
  });

  bench("mlCosineSimilarity", () => {
    opti.mlCosineSimilarity([1, 2, 3], [4, 5, 6]);
  });
});
