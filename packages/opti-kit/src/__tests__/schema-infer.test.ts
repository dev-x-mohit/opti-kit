import { describe, it, expect } from 'vitest';
import { s, type Infer } from '../schema-infer';

describe('Schema Infer & Runtime Validator', () => {
  it('should validate primitive schemas', () => {
    const stringSchema = s.string().min(3).max(10);
    expect(stringSchema.safeParse('hello').success).toBe(true);
    expect(stringSchema.safeParse('hi').success).toBe(false);
    expect(stringSchema.safeParse('way-too-long-string').success).toBe(false);

    const emailSchema = s.string().email();
    expect(emailSchema.safeParse('dev@optikit.com').success).toBe(true);
    expect(emailSchema.safeParse('not-an-email').success).toBe(false);

    const intSchema = s.number().int().min(0);
    expect(intSchema.safeParse(42).success).toBe(true);
    expect(intSchema.safeParse(3.14).success).toBe(false);
    expect(intSchema.safeParse(-5).success).toBe(false);
  });

  it('should validate structured object schemas and nested fields', () => {
    const UserSchema = s.object({
      id: s.number().int(),
      name: s.string().min(1),
      email: s.string().email(),
      role: s.enum(['admin', 'user', 'guest'] as const),
      isActive: s.boolean()
    });

    type User = Infer<typeof UserSchema>;

    const validUser: User = {
      id: 1,
      name: 'Alice',
      email: 'alice@example.com',
      role: 'admin',
      isActive: true
    };

    const res = UserSchema.safeParse(validUser);
    expect(res.success).toBe(true);

    const invalidUser = {
      id: 1.5,
      name: '',
      email: 'invalid-email',
      role: 'superadmin',
      isActive: 'yes'
    };

    const failRes = UserSchema.safeParse(invalidUser);
    expect(failRes.success).toBe(false);
    if (!failRes.success) {
      expect(failRes.errors.length).toBeGreaterThan(0);
      const paths = failRes.errors.map(e => e.path);
      expect(paths).toContain('id');
      expect(paths).toContain('name');
      expect(paths).toContain('email');
      expect(paths).toContain('role');
      expect(paths).toContain('isActive');
    }
  });

  it('should support default values and optional fields', () => {
    const ConfigSchema = s.object({
      port: s.number().default(8080),
      tag: s.string().optional()
    });

    const parsed = ConfigSchema.parse({});
    expect(parsed.port).toBe(8080);
    expect(parsed.tag).toBeUndefined();
  });

  it('should validate array items', () => {
    const tagsSchema = s.array(s.string().min(2));
    expect(tagsSchema.safeParse(['ts', 'js', 'mcp']).success).toBe(true);
    expect(tagsSchema.safeParse(['a']).success).toBe(false);
  });
});
