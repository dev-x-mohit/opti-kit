import { describe, it, expect } from "vitest";
import { render, compile } from "../template";

describe("template module", () => {
  it("interpolates variables", () => {
    const tmpl = "Hello {{user.profile.firstName}} {{user.profile.lastName}}!";
    const data = {
      user: {
        profile: {
          firstName: "Mohit",
          lastName: "Lakhara"
        }
      }
    };
    expect(render(tmpl, data)).toBe("Hello Mohit Lakhara!");
  });

  it("handles conditionals", () => {
    const tmpl = "Welcome{{#if user.isAdmin}} Admin{{/if}}!";
    expect(render(tmpl, { user: { isAdmin: true } })).toBe("Welcome Admin!");
    expect(render(tmpl, { user: { isAdmin: false } })).toBe("Welcome!");
  });

  it("handles loops with objects", () => {
    const tmpl = "Users: {{#each users}}{{name}} ({{@index}}), {{/each}}";
    const data = {
      users: [{ name: "Mohit" }, { name: "John" }]
    };
    expect(render(tmpl, data)).toBe("Users: Mohit (0), John (1), ");
  });

  it("handles loops with primitives using this", () => {
    const tmpl = "Tags: {{#each tags}}{{this}} ({{@index}}), {{/each}}";
    const data = {
      tags: ["js", "ts"]
    };
    expect(render(tmpl, data)).toBe("Tags: js (0), ts (1), ");
  });

  it("compiles template for reuse", () => {
    const fn = compile("Hello {{name}}!");
    expect(fn({ name: "Mohit" })).toBe("Hello Mohit!");
    expect(fn({ name: "John" })).toBe("Hello John!");
  });
});
