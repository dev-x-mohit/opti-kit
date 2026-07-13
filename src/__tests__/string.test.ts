import { describe, it, expect } from "vitest";
import {
  capitalize,
  slugify,
  truncate,
  camelCase,
  kebabCase,
  snakeCase,
  escapeHtml,
  unescapeHtml,
} from "../string";

describe("string utilities", () => {
  it("capitalize", () => {
    expect(capitalize("hello")).toBe("Hello");
    expect(capitalize("")).toBe("");
  });

  it("slugify", () => {
    expect(slugify("Hello World!")).toBe("hello-world");
    expect(slugify("---test---")).toBe("test");
    expect(slugify("")).toBe("");
  });

  it("truncate", () => {
    expect(truncate("hello world", 8)).toBe("hello...");
    expect(truncate("hello", 10)).toBe("hello");
    expect(truncate("", 5)).toBe("");
  });

  it("camelCase", () => {
    expect(camelCase("hello world")).toBe("helloWorld");
    expect(camelCase("hello-world")).toBe("helloWorld");
    expect(camelCase("hello_world")).toBe("helloWorld");
    expect(camelCase("HelloWorld")).toBe("helloWorld");
    expect(camelCase("")).toBe("");
  });

  it("kebabCase", () => {
    expect(kebabCase("hello world")).toBe("hello-world");
    expect(kebabCase("helloWorld")).toBe("hello-world");
    expect(kebabCase("hello_world")).toBe("hello-world");
    expect(kebabCase("")).toBe("");
  });

  it("snakeCase", () => {
    expect(snakeCase("hello world")).toBe("hello_world");
    expect(snakeCase("helloWorld")).toBe("hello_world");
    expect(snakeCase("hello-world")).toBe("hello_world");
    expect(snakeCase("")).toBe("");
  });

  it("escapeHtml", () => {
    expect(escapeHtml("<script>alert('hello')&</script>")).toBe(
      "&lt;script&gt;alert(&#39;hello&#39;)&amp;&lt;/script&gt;"
    );
    expect(escapeHtml("")).toBe("");
  });

  it("unescapeHtml", () => {
    expect(
      unescapeHtml("&lt;script&gt;alert(&#39;hello&#39;)&amp;&lt;/script&gt;")
    ).toBe("<script>alert('hello')&</script>");
    expect(unescapeHtml("")).toBe("");
  });
});
