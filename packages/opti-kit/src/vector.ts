export type Vec2 = [number, number];
export type Vec3 = [number, number, number];
export type Vec = Vec2 | Vec3 | number[];

/**
 * Adds two vectors.
 */
export function vecAdd(a: Vec, b: Vec): Vec {
  return a.map((val, i) => val + (b[i] || 0)) as Vec;
}

/**
 * Subtracts vector b from vector a.
 */
export function vecSub(a: Vec, b: Vec): Vec {
  return a.map((val, i) => val - (b[i] || 0)) as Vec;
}

/**
 * Multiplies a vector by a scalar or another vector.
 */
export function vecMul(a: Vec, b: Vec | number): Vec {
  if (typeof b === 'number') {
    return a.map(val => val * b) as Vec;
  }
  return a.map((val, i) => val * (b[i] || 1)) as Vec;
}

/**
 * Divides a vector by a scalar or another vector.
 */
export function vecDiv(a: Vec, b: Vec | number): Vec {
  if (typeof b === 'number') {
    return a.map(val => val / b) as Vec;
  }
  return a.map((val, i) => val / (b[i] || 1)) as Vec;
}

/**
 * Calculates the dot product of two vectors.
 */
export function vecDot(a: Vec, b: Vec): number {
  return a.reduce((sum, val, i) => sum + val * (b[i] || 0), 0);
}

/**
 * Calculates the cross product of two 3D vectors.
 */
export function vecCross(a: Vec3, b: Vec3): Vec3 {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0]
  ];
}

/**
 * Calculates the squared magnitude of a vector.
 */
export function vecMagSq(a: Vec): number {
  return vecDot(a, a);
}

/**
 * Calculates the magnitude (length) of a vector.
 */
export function vecMag(a: Vec): number {
  return Math.sqrt(vecMagSq(a));
}

/**
 * Normalizes a vector (makes its length 1).
 */
export function vecNormalize(a: Vec): Vec {
  const mag = vecMag(a);
  if (mag === 0) return a.map(() => 0) as Vec;
  return vecDiv(a, mag);
}

/**
 * Calculates the squared distance between two vectors.
 */
export function vecDistSq(a: Vec, b: Vec): number {
  return vecMagSq(vecSub(a, b));
}

/**
 * Calculates the distance between two vectors.
 */
export function vecDist(a: Vec, b: Vec): number {
  return Math.sqrt(vecDistSq(a, b));
}

/**
 * Linearly interpolates between two vectors.
 */
export function vecLerp(a: Vec, b: Vec, t: number): Vec {
  return vecAdd(a, vecMul(vecSub(b, a), t));
}

/**
 * Calculates the angle between two vectors in radians.
 */
export function vecAngle(a: Vec, b: Vec): number {
  const magA = vecMag(a);
  const magB = vecMag(b);
  if (magA === 0 || magB === 0) return 0;
  const cosine = vecDot(a, b) / (magA * magB);
  return Math.acos(Math.max(-1, Math.min(1, cosine)));
}

/**
 * Projects vector a onto vector b.
 */
export function vecProject(a: Vec, b: Vec): Vec {
  const scalar = vecDot(a, b) / vecMagSq(b);
  return vecMul(b, scalar);
}

/**
 * Reflects a vector around a normal.
 */
export function vecReflect(v: Vec, n: Vec): Vec {
  const normalizedNormal = vecNormalize(n);
  const dot = vecDot(v, normalizedNormal);
  return vecSub(v, vecMul(normalizedNormal, 2 * dot));
}
