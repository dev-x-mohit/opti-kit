import { describe, it, expect } from "vitest";
import {
  base64Encode,
  base64Decode,
  utf8Encode,
  utf8Decode,
  hexEncode,
  hexDecode,
  urlEncode,
  urlDecode,
  bufferToHex,
  hexToBuffer,
} from "../encoding";
import { escapeHtml, unescapeHtml } from "../string";


describe("Encoding Module", () => {
  const testString = "Hello, 🌍!";
  const testBase64 = "SGVsbG8sIPCfjI0h";
  const testHex = "48656c6c6f2c20f09f8c8d21";

  it("base64Encode and base64Decode", () => {
    const encoded = base64Encode(testString);
    expect(encoded).toBe(testBase64);
    const decoded = base64Decode(encoded);
    expect(decoded).toBe(testString);
  });

  it("utf8Encode and utf8Decode", () => {
    const encoded = utf8Encode(testString);
    expect(encoded).toBeInstanceOf(Uint8Array);
    const decoded = utf8Decode(encoded);
    expect(decoded).toBe(testString);
  });

  it("hexEncode and hexDecode", () => {
    const encoded = hexEncode(testString);
    expect(encoded).toBe(testHex);
    const decoded = hexDecode(encoded);
    expect(decoded).toBe(testString);
  });

  it("hexDecode throws on invalid length", () => {
    expect(() => hexDecode("123")).toThrow("Invalid hex string length");
  });

  it("urlEncode and urlDecode", () => {
    const original = "https://example.com/search?q=hello world";
    const encoded = urlEncode(original);
    expect(encoded).toBe("https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world");
    expect(urlDecode(encoded)).toBe(original);
  });

  it("urlDecode fallback for invalid encoded strings", () => {
    expect(urlDecode("%invalid")).toBe("%invalid");
  });

  it("escapeHtml and unescapeHtml", () => {
    const raw = '<div>Hello & "Welcome" to <OptiKit>\'s world!</div>';
    const escaped = escapeHtml(raw);
    expect(escaped).toBe("&lt;div&gt;Hello &amp; &quot;Welcome&quot; to &lt;OptiKit&gt;&#39;s world!&lt;/div&gt;");
    expect(unescapeHtml(escaped)).toBe(raw);
  });

  it("bufferToHex and hexToBuffer", () => {
    const bytes = new Uint8Array([255, 0, 127]);
    const hex = bufferToHex(bytes);
    expect(hex).toBe("ff007f");
    expect(hexToBuffer(hex)).toEqual(bytes);
  });
});
