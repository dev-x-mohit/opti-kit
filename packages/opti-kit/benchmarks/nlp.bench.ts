import { bench, describe } from "vitest";
import * as opti from "../src/nlp";

describe("NLP Module Benchmarks", () => {
  const text = "OptiKit is incredibly fast at processing natural language!";

  bench("tokenizeWords", () => {
    opti.tokenizeWords(text);
  });

  bench("nlpLevenshteinDistance", () => {
    opti.nlpLevenshteinDistance("kitten", "sitting");
  });

  bench("soundex", () => {
    opti.soundex("Robert");
    opti.soundex("Rupert");
  });
});
