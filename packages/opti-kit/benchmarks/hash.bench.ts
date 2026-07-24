import { bench, describe } from "vitest";
import * as opti from "../src/hash";

describe("Hash Module Benchmarks", () => {
  const text = "OptiKit hashing is fast and lightweight!";

  bench("djb2 hashing", () => {
    opti.djb2(text);
  });

  bench("crc32 hashing", () => {
    opti.crc32(text);
  });

  bench("base64 encoding", () => {
    opti.encodeBase64(text);
  });
});
