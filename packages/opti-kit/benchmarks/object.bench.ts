import { bench, describe } from "vitest";
import { deepClone, get, set } from "../src/object";
import _ from "lodash";

describe("Object - deepClone", () => {
  const obj = {
    a: 1,
    b: { c: 2, d: [3, 4, { e: 5 }] },
    f: "test",
    g: new Date(),
    h: /abc/g,
  };

  bench("opti-kit deepClone", () => {
    deepClone(obj);
  });

  bench("lodash cloneDeep", () => {
    _.cloneDeep(obj);
  });
});

describe("Object - get", () => {
  const obj = {
    user: {
      profile: {
        name: "John Doe",
        age: 30,
        address: { city: "New York", zip: "10001" },
      },
    },
  };

  bench("opti-kit get", () => {
    get(obj, "user.profile.address.city");
  });

  bench("lodash get", () => {
    _.get(obj, "user.profile.address.city");
  });
});
