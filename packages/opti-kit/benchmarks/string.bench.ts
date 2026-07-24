import { bench, describe } from "vitest";
import * as opti from "../src/string";
import * as lodash from "lodash";

describe("String Module Benchmarks", () => {
  const text = "   Hello World, OptiKit is fast!   ";

  bench("slugify: opti vs lodash.kebabCase", () => {
    opti.slugify(text);
  });

  bench("slugify: lodash.kebabCase", () => {
    lodash.kebabCase(text);
  });

  bench("capitalize: opti", () => {
    opti.capitalize("hello world");
  });

  bench("capitalize: lodash", () => {
    lodash.capitalize("hello world");
  });

  bench("camelCase: opti", () => {
    opti.camelCase("Hello world test");
  });

  bench("camelCase: lodash", () => {
    lodash.camelCase("Hello world test");
  });
});
