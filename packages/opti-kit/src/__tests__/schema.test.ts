import { describe, it, expect } from "vitest";
import {
  validate,
  isValid,
  validateObject,
  required,
  minLength,
  maxLength,
  pattern,
  minValue,
  maxValue,
  isIn,
  isType,
  custom
} from "../schema";

describe("schema", () => {
  it("validate and isValid", () => {
    const rules = [required("Required field"), minValue(10)];
    expect(validate(null, rules)).toEqual({
      valid: false,
      errors: ["Required field"],
    });
    expect(validate(5, rules)).toEqual({
      valid: false,
      errors: ["Value must be at least 10"],
    });
    expect(validate(12, rules)).toEqual({
      valid: true,
      errors: [],
    });

    expect(isValid(12, rules)).toBe(true);
    expect(isValid(5, rules)).toBe(false);
  });

  it("validateObject", () => {
    const userSchema = {
      username: [required(), minLength(3)],
      age: [isType("number"), minValue(18)],
      role: [isIn(["admin", "user"])],
    };

    const validUser = {
      username: "mohit",
      age: 25,
      role: "admin",
    };

    const invalidUser = {
      username: "mo",
      age: 15,
      role: "guest",
    };

    expect(validateObject(validUser, userSchema)).toEqual({
      valid: true,
      errors: {},
    });

    expect(validateObject(invalidUser, userSchema)).toEqual({
      valid: false,
      errors: {
        username: ["Minimum length is 3"],
        age: ["Value must be at least 18"],
        role: ["Value is not allowed"],
      },
    });
  });

  it("required", () => {
    const rule = required("custom message");
    expect(rule(null)).toBe("custom message");
    expect(rule(undefined)).toBe("custom message");
    expect(rule("")).toBe("custom message");
    expect(rule("ok")).toBeNull();
    expect(rule(0)).toBeNull();
  });

  it("minLength and maxLength", () => {
    const minRule = minLength(5);
    const maxRule = maxLength(5);
    expect(minRule("abcd")).toBe("Minimum length is 5");
    expect(minRule("abcde")).toBeNull();
    expect(maxRule("abcdef")).toBe("Maximum length is 5");
    expect(maxRule("abcde")).toBeNull();
  });

  it("pattern", () => {
    const rule = pattern(/^\d+$/);
    expect(rule("123")).toBeNull();
    expect(rule("abc")).toBe("Value format is invalid");
  });

  it("min and max", () => {
    const minRule = minValue(10);
    const maxRule = maxValue(10);
    expect(minRule(9)).toBe("Value must be at least 10");
    expect(minRule(10)).toBeNull();
    expect(maxRule(11)).toBe("Value must be at most 10");
    expect(maxRule(10)).toBeNull();
  });

  it("isIn", () => {
    const rule = isIn([1, 2, 3]);
    expect(rule(2)).toBeNull();
    expect(rule(4)).toBe("Value is not allowed");
  });

  it("isType", () => {
    expect(isType("string")("hello")).toBeNull();
    expect(isType("string")(123)).toBe("Value must be of type string");
    expect(isType("array")([1, 2])).toBeNull();
    expect(isType("object")({})).toBeNull();
    expect(isType("object")([])).toBe("Value must be of type object");
  });

  it("custom", () => {
    const rule = custom((x) => x % 2 === 0, "Must be even");
    expect(rule(4)).toBeNull();
    expect(rule(5)).toBe("Must be even");
  });
});
