export type Mat3 = [
  number, number, number,
  number, number, number,
  number, number, number
];
export type Mat4 = [
  number, number, number, number,
  number, number, number, number,
  number, number, number, number,
  number, number, number, number
];

/**
 * Creates an identity 3x3 matrix.
 */
export function mat3Identity(): Mat3 {
  return [
    1, 0, 0,
    0, 1, 0,
    0, 0, 1
  ];
}

/**
 * Creates an identity 4x4 matrix.
 */
export function mat4Identity(): Mat4 {
  return [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ];
}

/**
 * Multiplies two 3x3 matrices.
 */
export function mat3Mul(a: Mat3, b: Mat3): Mat3 {
  const out = new Array(9) as unknown as Mat3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      out[i * 3 + j] =
        a[i * 3 + 0] * b[0 * 3 + j] +
        a[i * 3 + 1] * b[1 * 3 + j] +
        a[i * 3 + 2] * b[2 * 3 + j];
    }
  }
  return out;
}

/**
 * Multiplies two 4x4 matrices.
 */
export function mat4Mul(a: Mat4, b: Mat4): Mat4 {
  const out = new Array(16) as unknown as Mat4;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      out[i * 4 + j] =
        a[i * 4 + 0] * b[0 * 4 + j] +
        a[i * 4 + 1] * b[1 * 4 + j] +
        a[i * 4 + 2] * b[2 * 4 + j] +
        a[i * 4 + 3] * b[3 * 4 + j];
    }
  }
  return out;
}

/**
 * Transposes a 3x3 matrix.
 */
export function mat3Transpose(a: Mat3): Mat3 {
  return [
    a[0], a[3], a[6],
    a[1], a[4], a[7],
    a[2], a[5], a[8]
  ];
}

/**
 * Transposes a 4x4 matrix.
 */
export function mat4Transpose(a: Mat4): Mat4 {
  return [
    a[0], a[4], a[8], a[12],
    a[1], a[5], a[9], a[13],
    a[2], a[6], a[10], a[14],
    a[3], a[7], a[11], a[15]
  ];
}
