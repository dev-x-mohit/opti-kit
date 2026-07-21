export type Rule = (val: any) => string | null;

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export interface ObjectValidationResult {
  valid: boolean;
  errors: Record<string, string[]>;
}

/**
 * Validates a single value against an array of rules.
 */
export function validate(val: any, rules: Rule[]): ValidationResult {
  const errors: string[] = [];
  for (const rule of rules) {
    const err = rule(val);
    if (err !== null) {
      errors.push(err);
    }
  }
  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Checks if a value is valid against a list of rules (returns boolean).
 */
export function isValid(val: any, rules: Rule[]): boolean {
  return validate(val, rules).valid;
}

/**
 * Validates an object against a schema of fields and their rules.
 */
export function validateObject(
  obj: Record<string, any>,
  schema: Record<string, Rule[]>
): ObjectValidationResult {
  const errors: Record<string, string[]> = {};
  let valid = true;

  for (const [key, rules] of Object.entries(schema)) {
    const val = obj ? obj[key] : undefined;
    const result = validate(val, rules);
    if (!result.valid) {
      errors[key] = result.errors;
      valid = false;
    }
  }

  return {
    valid,
    errors,
  };
}

/**
 * Rule: Value must be present (not null, undefined, or empty string).
 */
export function required(msg?: string): Rule {
  return (val) => {
    if (val === null || val === undefined || val === "") {
      return msg || "Value is required";
    }
    return null;
  };
}

/**
 * Rule: Value must have a minimum length (works for strings and arrays).
 */
export function minLength(len: number, msg?: string): Rule {
  return (val) => {
    if (val === null || val === undefined) return null; // Let 'required' handle null/undefined
    if (typeof val.length === "number" && val.length < len) {
      return msg || `Minimum length is ${len}`;
    }
    return null;
  };
}

/**
 * Rule: Value must have a maximum length (works for strings and arrays).
 */
export function maxLength(len: number, msg?: string): Rule {
  return (val) => {
    if (val === null || val === undefined) return null;
    if (typeof val.length === "number" && val.length > len) {
      return msg || `Maximum length is ${len}`;
    }
    return null;
  };
}

/**
 * Rule: Value must match the regex pattern.
 */
export function pattern(regex: RegExp, msg?: string): Rule {
  return (val) => {
    if (val === null || val === undefined || val === "") return null;
    if (typeof val === "string" && !regex.test(val)) {
      return msg || "Value format is invalid";
    }
    return null;
  };
}

/**
 * Rule: Value must be >= limit.
 */
export function minValue(limit: number, msg?: string): Rule {
  return (val) => {
    if (val === null || val === undefined || val === "") return null;
    if (typeof val === "number" && val < limit) {
      return msg || `Value must be at least ${limit}`;
    }
    return null;
  };
}

/**
 * Rule: Value must be <= limit.
 */
export function maxValue(limit: number, msg?: string): Rule {
  return (val) => {
    if (val === null || val === undefined || val === "") return null;
    if (typeof val === "number" && val > limit) {
      return msg || `Value must be at most ${limit}`;
    }
    return null;
  };
}

/**
 * Rule: Value must be one of the allowed values.
 */
export function isIn(allowed: any[], msg?: string): Rule {
  return (val) => {
    if (val === null || val === undefined) return null;
    if (!allowed.includes(val)) {
      return msg || "Value is not allowed";
    }
    return null;
  };
}

/**
 * Rule: Value must match the expected type.
 */
export function isType(
  expected: "string" | "number" | "boolean" | "object" | "array" | "function",
  msg?: string
): Rule {
  return (val) => {
    if (val === null || val === undefined) return null;
    let ok = false;
    if (expected === "array") {
      ok = Array.isArray(val);
    } else if (expected === "object") {
      ok = typeof val === "object" && val !== null && !Array.isArray(val);
    } else {
      ok = typeof val === expected;
    }
    return ok ? null : msg || `Value must be of type ${expected}`;
  };
}

/**
 * Rule: Value must satisfy a custom predicate.
 */
export function custom(fn: (val: any) => boolean, msg?: string): Rule {
  return (val) => {
    if (val === null || val === undefined) return null;
    return fn(val) ? null : msg || "Value failed custom validation";
  };
}
