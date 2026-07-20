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
  stripHtml,
  wordCount,
  pascalCase,
  swapCase,
  trimAll,
  chars,
  chop,
  endsWithAny,
  startsWithAny,
  insert,
  reverse,
  mask,
  removeNonWords,
  isBlank,
  isAlpha,
  isAlphanumeric,
  isLower,
  isUpper,
  surround,
  isPalindrome,
  collapseWhitespace,
  dotCase,
  headerCase,
  ensurePrefix,
  ensureSuffix,
  stripPrefix,
  stripSuffix,
  lines,
  unlines,
  levenshteinDistance,
  stringSimilarity,
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
    expect(slugify("Hello World!", { lower: false })).toBe("Hello-World");
    expect(slugify("Hello World!", { replacement: "_" })).toBe("hello_world");
  });

  it("truncate", () => {
    expect(truncate("hello world", 8)).toBe("hello...");
    expect(truncate("hello", 10)).toBe("hello");
    expect(truncate("", 5)).toBe("");
    expect(truncate("hello world", 10, { separator: " " })).toBe("hello...");
    expect(truncate("hello-world-test", 15, { separator: /-/ })).toBe("hello-world...");
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

  it("stripHtml", () => {
    expect(stripHtml("<p>Hello <b>world</b>!</p>")).toBe("Hello world!");
    expect(stripHtml("")).toBe("");
  });

  it("wordCount", () => {
    expect(wordCount("Hello world, this is Optikit!")).toBe(5);
    expect(wordCount("")).toBe(0);
  });

  it("pascalCase", () => {
    expect(pascalCase("hello world")).toBe("HelloWorld");
    expect(pascalCase("hello-world")).toBe("HelloWorld");
    expect(pascalCase("")).toBe("");
  });

  it("swapCase", () => {
    expect(swapCase("Hello World!")).toBe("hELLO wORLD!");
    expect(swapCase("")).toBe("");
  });

  it("trimAll", () => {
    expect(trimAll("  a b  c ")).toBe("abc");
    expect(trimAll("")).toBe("");
  });

  it("chars", () => {
    expect(chars("hello")).toEqual(["h", "e", "l", "l", "o"]);
    expect(chars("")).toEqual([]);
  });

  it("chop", () => {
    expect(chop("hello", 2)).toEqual(["he", "ll", "o"]);
    expect(chop("hello", 0)).toEqual([]);
    expect(chop("", 2)).toEqual([]);
  });

  it("endsWithAny", () => {
    expect(endsWithAny("file.txt", [".jpg", ".txt"])).toBe(true);
    expect(endsWithAny("file.png", [".jpg", ".txt"])).toBe(false);
  });

  it("startsWithAny", () => {
    expect(startsWithAny("https://example.com", ["http://", "https://"])).toBe(true);
    expect(startsWithAny("ftp://example.com", ["http://", "https://"])).toBe(false);
  });

  it("insert", () => {
    expect(insert("hello world", 6, "beautiful ")).toBe("hello beautiful world");
    expect(insert("abc", -1, "z")).toBe("zabc"); // index clamped to 0
    expect(insert("abc", 10, "z")).toBe("abcz"); // index clamped to length
  });

  it("reverse", () => {
    expect(reverse("hello")).toBe("olleh");
    expect(reverse("")).toBe("");
  });

  it("mask", () => {
    expect(mask("1234567890", "*", 2, 2)).toBe("12******90");
    expect(mask("123", "*", 2, 2)).toBe("123"); // not long enough to mask
  });

  it("removeNonWords", () => {
    expect(removeNonWords("hello world! 123 @#")).toBe("helloworld123");
  });

  it("isBlank", () => {
    expect(isBlank("")).toBe(true);
    expect(isBlank("   ")).toBe(true);
    expect(isBlank("a")).toBe(false);
  });

  it("isAlpha", () => {
    expect(isAlpha("abc")).toBe(true);
    expect(isAlpha("abc1")).toBe(false);
    expect(isAlpha("")).toBe(false);
  });

  it("isAlphanumeric", () => {
    expect(isAlphanumeric("abc1")).toBe(true);
    expect(isAlphanumeric("abc1!")).toBe(false);
  });

  it("isLower", () => {
    expect(isLower("abc")).toBe(true);
    expect(isLower("aBc")).toBe(false);
  });

  it("isUpper", () => {
    expect(isUpper("ABC")).toBe(true);
    expect(isUpper("aBc")).toBe(false);
  });

  it("surround", () => {
    expect(surround("hello", "'")).toBe("'hello'");
  });

  it("isPalindrome", () => {
    expect(isPalindrome("racecar")).toBe(true);
    expect(isPalindrome("hello")).toBe(false);
    expect(isPalindrome("RaceCar", { ignoreCase: true })).toBe(true);
    expect(isPalindrome("A man, a plan, a canal: Panama", { ignoreCase: true, ignoreNonAlphanumeric: true })).toBe(true);
  });

  it("collapseWhitespace", () => {
    expect(collapseWhitespace("  hello   \n\t world  ")).toBe("hello world");
    expect(collapseWhitespace("")).toBe("");
  });

  it("dotCase", () => {
    expect(dotCase("hello world")).toBe("hello.world");
    expect(dotCase("helloWorld")).toBe("hello.world");
  });

  it("headerCase", () => {
    expect(headerCase("hello world")).toBe("Hello-World");
    expect(headerCase("helloWorld")).toBe("Hello-World");
  });

  it("ensurePrefix and ensureSuffix", () => {
    expect(ensurePrefix("domain.com", "https://")).toBe("https://domain.com");
    expect(ensurePrefix("https://domain.com", "https://")).toBe("https://domain.com");
    expect(ensureSuffix("folder", "/")).toBe("folder/");
    expect(ensureSuffix("folder/", "/")).toBe("folder/");
  });

  it("stripPrefix and stripSuffix", () => {
    expect(stripPrefix("https://domain.com", "https://")).toBe("domain.com");
    expect(stripPrefix("domain.com", "https://")).toBe("domain.com");
    expect(stripSuffix("file.txt", ".txt")).toBe("file");
    expect(stripSuffix("file.txt", ".doc")).toBe("file.txt");
  });

  it("lines and unlines", () => {
    expect(lines("a\nb\r\nc")).toEqual(["a", "b", "c"]);
    expect(unlines(["a", "b", "c"])).toBe("a\nb\nc");
  });

  it("levenshteinDistance and stringSimilarity", () => {
    expect(levenshteinDistance("kitten", "sitting")).toBe(3);
    expect(levenshteinDistance("", "")).toBe(0);
    expect(stringSimilarity("hello", "hello")).toBe(1);
    expect(stringSimilarity("hello", "world")).toBe(0.2);
  });
});

