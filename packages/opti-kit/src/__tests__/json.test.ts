import { describe, it, expect } from "vitest";
import {
  jsonClone,
  jsonFlatten,
  jsonUnflatten,
  jsonPath,
  jsonMerge,
  jsonDiff
} from "../json";

describe("json module", () => {
  it("jsonClone", () => {
    const obj = { a: 1, b: { c: [2, 3] } };
    const cloned = jsonClone(obj);
    expect(cloned).toEqual(obj);
    expect(cloned).not.toBe(obj);
    expect(cloned.b).not.toBe(obj.b);
    expect(cloned.b.c).not.toBe(obj.b.c);

    expect(jsonClone(null)).toBeNull();
    expect(jsonClone(undefined)).toBeUndefined();
  });

  it("jsonFlatten", () => {
    const obj = {
      name: "Mohit",
      age: 25,
      address: {
        city: "Jaipur",
        tags: ["home", "work"],
      },
      empty: [],
    };

    const flat = jsonFlatten(obj);
    expect(flat).toEqual({
      "name": "Mohit",
      "age": 25,
      "address.city": "Jaipur",
      "address.tags[0]": "home",
      "address.tags[1]": "work",
      "empty": [],
    });
  });

  it("jsonUnflatten", () => {
    const flat = {
      "name": "Mohit",
      "age": 25,
      "address.city": "Jaipur",
      "address.tags[0]": "home",
      "address.tags[1]": "work",
      "empty": [],
    };

    const unflat = jsonUnflatten(flat);
    expect(unflat).toEqual({
      name: "Mohit",
      age: 25,
      address: {
        city: "Jaipur",
        tags: ["home", "work"],
      },
      empty: [],
    });
  });

  it("jsonPath", () => {
    const obj = {
      users: [
        {
          name: "Mohit",
          contacts: {
            email: "mohit@example.com",
          },
        },
      ],
    };

    expect(jsonPath(obj, "users[0].name")).toBe("Mohit");
    expect(jsonPath(obj, "users[0].contacts.email")).toBe("mohit@example.com");
    expect(jsonPath(obj, "users[1].name", "fallback")).toBe("fallback");
    expect(jsonPath(obj, "users[0].nonexistent.prop")).toBeUndefined();
  });

  it("jsonMerge", () => {
    const target = {
      name: "Mohit",
      skills: ["js"],
      settings: {
        theme: "dark",
        fontSize: 14,
      },
    };

    const source = {
      skills: ["ts"],
      settings: {
        fontSize: 16,
      },
      role: "admin",
    };

    const merged = jsonMerge(target, source);
    expect(merged).toEqual({
      name: "Mohit",
      skills: ["js", "ts"],
      settings: {
        theme: "dark",
        fontSize: 16,
      },
      role: "admin",
    });
  });

  it("jsonDiff", () => {
    const obj1 = {
      name: "Mohit",
      age: 25,
      skills: ["js"],
    };

    const obj2 = {
      name: "Mohit",
      age: 26,
      skills: ["js", "ts"],
      role: "admin",
    };

    const diff = jsonDiff(obj1, obj2);
    expect(diff).toEqual({
      "age": { type: "update", oldValue: 25, newValue: 26 },
      "skills[1]": { type: "add", newValue: "ts" },
      "role": { type: "add", newValue: "admin" },
    });
  });
});
