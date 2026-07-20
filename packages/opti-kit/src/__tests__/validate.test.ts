import { describe, it, expect } from "vitest";
import {
  isEmail,
  isUrl,
  isUuid,
  isPhone,
  isStrongPassword,
  isIP,
  isDateValid,
  isAlpha,
  isAlphanumeric,
  isNumeric,
  isHexColor,
  isBase64,
  isJSON,
  isJWT,
  isCreditCard,
  isMacAddress,
  isAscii,
  isBooleanString,
  isDataURI,
  isPort,
  isSemVer,
  isSlug,
  isHexadecimal,
  isMD5,
  isSHA256,
  isLatitude,
  isLongitude,
  isLatLong,
} from "../validate";

describe("validation utilities", () => {
  it("isEmail", () => {
    expect(isEmail("test@example.com")).toBe(true);
    expect(isEmail("user.name+tag@sub.domain.co")).toBe(true);
    expect(isEmail("invalid-email")).toBe(false);
    expect(isEmail("@missing-user.com")).toBe(false);
    expect(isEmail("user@")).toBe(false);
  });

  it("isUrl", () => {
    expect(isUrl("https://google.com")).toBe(true);
    expect(isUrl("http://localhost:3000/path?query=1")).toBe(true);
    expect(isUrl("ftp://file-server.net")).toBe(true);
    expect(isUrl("invalid-url")).toBe(false);
    expect(isUrl("google.com")).toBe(false); // missing protocol/scheme
  });

  it("isUuid", () => {
    expect(isUuid("123e4567-e89b-12d3-a456-426614174000")).toBe(true); // v1/v4 UUID
    expect(isUuid("123E4567-E89B-12D3-A456-426614174000")).toBe(true); // Uppercase check
    expect(isUuid("not-a-uuid")).toBe(false);
    expect(isUuid("123e4567-e89b-12d3-a456-42661417400")).toBe(false); // too short
  });

  it("isPhone", () => {
    expect(isPhone("+1 (555) 019-2834")).toBe(true);
    expect(isPhone("123-456-7890")).toBe(true);
    expect(isPhone("invalid-phone")).toBe(false);
  });

  it("isStrongPassword", () => {
    expect(isStrongPassword("P@ssw0rd123")).toBe(true);
    expect(isStrongPassword("weak")).toBe(false); // too short
    expect(isStrongPassword("password123")).toBe(false); // missing uppercase & special
  });

  it("isIP", () => {
    expect(isIP("192.168.1.1")).toBe(true);
    expect(isIP("2001:0db8:85a3:0000:0000:8a2e:0370:7334")).toBe(true);
    expect(isIP("invalid-ip")).toBe(false);
    expect(isIP("192.168.1.1", "6")).toBe(false);
  });

  it("isDateValid", () => {
    expect(isDateValid("2026-07-20T12:00:00Z")).toBe(true);
    expect(isDateValid("invalid-date")).toBe(false);
  });

  it("isAlpha / isAlphanumeric / isNumeric", () => {
    expect(isAlpha("abc")).toBe(true);
    expect(isAlpha("abc1")).toBe(false);
    expect(isAlphanumeric("abc1")).toBe(true);
    expect(isAlphanumeric("abc1!")).toBe(false);
    expect(isNumeric("123")).toBe(true);
    expect(isNumeric("123a")).toBe(false);
  });

  it("isHexColor", () => {
    expect(isHexColor("#fff")).toBe(true);
    expect(isHexColor("#ffffff")).toBe(true);
    expect(isHexColor("fff")).toBe(true);
    expect(isHexColor("#ffg")).toBe(false);
  });

  it("isBase64", () => {
    expect(isBase64("SGVsbG8gV29ybGQ=")).toBe(true);
    expect(isBase64("invalid base64!")).toBe(false);
  });

  it("isJSON", () => {
    expect(isJSON('{"a":1}')).toBe(true);
    expect(isJSON('{a:1}')).toBe(false);
  });

  it("isJWT", () => {
    expect(isJWT("eyJhbGciOiJIUzI1NiIsInR5cCI.eyJzdWIiOiIx.SflKxwRJSMeKKF2Q")).toBe(true);
    expect(isJWT("not-a-jwt")).toBe(false);
  });

  it("isCreditCard", () => {
    // Valid dummy credit card for Luhn check (4242424242424242)
    expect(isCreditCard("4242424242424242")).toBe(true);
    expect(isCreditCard("4242 4242 4242 4242")).toBe(true);
    expect(isCreditCard("4242424242424241")).toBe(false);
  });

  it("isMacAddress", () => {
    expect(isMacAddress("00:1B:44:11:3A:B7")).toBe(true);
    expect(isMacAddress("invalid")).toBe(false);
  });

  it("isAscii", () => {
    expect(isAscii("hello")).toBe(true);
    expect(isAscii("héllo")).toBe(false);
  });

  it("isBooleanString", () => {
    expect(isBooleanString("true")).toBe(true);
    expect(isBooleanString("0")).toBe(true);
    expect(isBooleanString("yes")).toBe(false);
  });

  it("isDataURI", () => {
    expect(isDataURI("data:text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D")).toBe(true);
    expect(isDataURI("not a data uri")).toBe(false);
  });

  it("isPort", () => {
    expect(isPort(80)).toBe(true);
    expect(isPort("8080")).toBe(true);
    expect(isPort(70000)).toBe(false);
    expect(isPort(-1)).toBe(false);
  });

  it("isSemVer and isSlug", () => {
    expect(isSemVer("1.0.0")).toBe(true);
    expect(isSemVer("1.0.0-alpha.1+build.123")).toBe(true);
    expect(isSemVer("1.0")).toBe(false);
    expect(isSlug("my-awesome-slug")).toBe(true);
    expect(isSlug("My-Slug")).toBe(false);
  });

  it("isHexadecimal, isMD5, isSHA256", () => {
    expect(isHexadecimal("0x1a2b3c")).toBe(true);
    expect(isHexadecimal("xyz")).toBe(false);
    expect(isMD5("5d41402abc4b2a76b9719d911017c592")).toBe(true);
    expect(isMD5("short")).toBe(false);
    expect(isSHA256("e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855")).toBe(true);
  });

  it("isLatitude, isLongitude, isLatLong", () => {
    expect(isLatitude(45.5)).toBe(true);
    expect(isLatitude(100)).toBe(false);
    expect(isLongitude(-120)).toBe(true);
    expect(isLongitude(200)).toBe(false);
    expect(isLatLong("40.7128, -74.0060")).toBe(true);
    expect(isLatLong("100, 200")).toBe(false);
  });
});
