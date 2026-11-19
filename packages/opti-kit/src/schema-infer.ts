/**
 * OptiKit Schema Infer — Zero-dependency runtime schema validator with static TypeScript type inference.
 * Provides a lightweight, Zod-inspired builder pattern for structural validation and error paths.
 */

export interface ValidationError {
  path: string;
  message: string;
  received?: any;
}

export type SafeParseResult<T> =
  | { success: true; data: T }
  | { success: false; errors: ValidationError[] };

export abstract class BaseSchema<T = any> {
  protected _isOptional = false;
  protected _defaultValue?: T;

  public optional(): BaseSchema<T | undefined> {
    const clone = Object.create(this);
    clone._isOptional = true;
    return clone;
  }

  public default(val: T): BaseSchema<T> {
    const clone = Object.create(this);
    clone._defaultValue = val;
    return clone;
  }

  public abstract _validate(val: unknown, path: string): ValidationError[];

  public safeParse(data: unknown): SafeParseResult<T> {
    let target = data;
    if (target === undefined && this._defaultValue !== undefined) {
      target = this._defaultValue;
    }

    if (target === undefined && this._isOptional) {
      return { success: true, data: undefined as unknown as T };
    }

    const errors = this._validate(target, '');
    if (errors.length > 0) {
      return { success: false, errors };
    }
    return { success: true, data: target as T };
  }

  public parse(data: unknown): T {
    const res = this.safeParse(data);
    if (!res.success) {
      const msg = res.errors.map(e => `${e.path || 'root'}: ${e.message}`).join(', ');
      throw new Error(`Schema validation error: ${msg}`);
    }
    return res.data;
  }
}

export type Infer<S> = S extends BaseSchema<infer T> ? T : never;

export class StringSchema extends BaseSchema<string> {
  private _min?: number;
  private _max?: number;
  private _isEmail = false;

  public min(len: number, msg?: string): this {
    this._min = len;
    return this;
  }

  public max(len: number, msg?: string): this {
    this._max = len;
    return this;
  }

  public email(): this {
    this._isEmail = true;
    return this;
  }

  public _validate(val: unknown, path: string): ValidationError[] {
    const errs: ValidationError[] = [];
    if (typeof val !== 'string') {
      errs.push({ path, message: `Expected string, received ${typeof val}`, received: val });
      return errs;
    }

    if (this._min !== undefined && val.length < this._min) {
      errs.push({ path, message: `String length must be at least ${this._min}`, received: val });
    }
    if (this._max !== undefined && val.length > this._max) {
      errs.push({ path, message: `String length must not exceed ${this._max}`, received: val });
    }
    if (this._isEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      errs.push({ path, message: `Invalid email address format`, received: val });
    }

    return errs;
  }
}

export class NumberSchema extends BaseSchema<number> {
  private _min?: number;
  private _max?: number;
  private _isInt = false;

  public min(val: number): this {
    this._min = val;
    return this;
  }

  public max(val: number): this {
    this._max = val;
    return this;
  }

  public int(): this {
    this._isInt = true;
    return this;
  }

  public _validate(val: unknown, path: string): ValidationError[] {
    const errs: ValidationError[] = [];
    if (typeof val !== 'number' || isNaN(val)) {
      errs.push({ path, message: `Expected number, received ${typeof val}`, received: val });
      return errs;
    }

    if (this._isInt && !Number.isInteger(val)) {
      errs.push({ path, message: `Expected integer`, received: val });
    }
    if (this._min !== undefined && val < this._min) {
      errs.push({ path, message: `Number must be >= ${this._min}`, received: val });
    }
    if (this._max !== undefined && val > this._max) {
      errs.push({ path, message: `Number must be <= ${this._max}`, received: val });
    }

    return errs;
  }
}

export class BooleanSchema extends BaseSchema<boolean> {
  public _validate(val: unknown, path: string): ValidationError[] {
    if (typeof val !== 'boolean') {
      return [{ path, message: `Expected boolean, received ${typeof val}`, received: val }];
    }
    return [];
  }
}

export class ArraySchema<T> extends BaseSchema<T[]> {
  constructor(private _itemSchema: BaseSchema<T>) {
    super();
  }

  public _validate(val: unknown, path: string): ValidationError[] {
    if (!Array.isArray(val)) {
      return [{ path, message: `Expected array, received ${typeof val}`, received: val }];
    }

    const errs: ValidationError[] = [];
    for (let i = 0; i < val.length; i++) {
      const itemPath = path ? `${path}[${i}]` : `[${i}]`;
      errs.push(...this._itemSchema._validate(val[i], itemPath));
    }
    return errs;
  }
}

export class ObjectSchema<T extends Record<string, any>> extends BaseSchema<T> {
  constructor(private _shape: { [K in keyof T]: BaseSchema<T[K]> }) {
    super();
  }

  public _validate(val: unknown, path: string): ValidationError[] {
    if (typeof val !== 'object' || val === null || Array.isArray(val)) {
      return [{ path, message: `Expected object, received ${typeof val}`, received: val }];
    }

    const errs: ValidationError[] = [];
    const obj = val as Record<string, any>;

    for (const [key, schema] of Object.entries(this._shape)) {
      const fieldPath = path ? `${path}.${key}` : key;
      const fieldVal = obj[key];
      const parsed = (schema as BaseSchema).safeParse(fieldVal);
      if (!parsed.success) {
        errs.push(...parsed.errors.map(e => ({ ...e, path: e.path ? `${fieldPath}.${e.path}` : fieldPath })));
      } else if (parsed.data !== undefined) {
        obj[key] = parsed.data;
      }
    }

    return errs;
  }
}

export class EnumSchema<T extends string | number> extends BaseSchema<T> {
  constructor(private _values: readonly T[]) {
    super();
  }

  public _validate(val: unknown, path: string): ValidationError[] {
    if (!this._values.includes(val as T)) {
      return [{
        path,
        message: `Expected one of [${this._values.join(', ')}], received ${JSON.stringify(val)}`,
        received: val
      }];
    }
    return [];
  }
}

/**
 * OptiKit Schema Builder namespace.
 */
export const s = {
  string: () => new StringSchema(),
  number: () => new NumberSchema(),
  boolean: () => new BooleanSchema(),
  array: <T>(itemSchema: BaseSchema<T>) => new ArraySchema<T>(itemSchema),
  object: <T extends Record<string, any>>(shape: { [K in keyof T]: BaseSchema<T[K]> }) => new ObjectSchema<T>(shape),
  enum: <T extends string | number>(values: readonly T[]) => new EnumSchema<T>(values)
};
