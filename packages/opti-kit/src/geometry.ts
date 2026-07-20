/**
 * Calculates the Euclidean distance between two 2D points.
 */
export function distance2D(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

/**
 * Calculates the Euclidean distance between two 3D points.
 */
export function distance3D(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): number {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2));
}

/**
 * Calculates the midpoint between two 2D points.
 */
export function midpoint(x1: number, y1: number, x2: number, y2: number): { x: number; y: number } {
  return { x: (x1 + x2) / 2, y: (y1 + y2) / 2 };
}

/**
 * Calculates the angle in radians between two 2D points.
 */
export function angleBetween(x1: number, y1: number, x2: number, y2: number): number {
  return Math.atan2(y2 - y1, x2 - x1);
}

/**
 * Rotates a 2D point around an origin point by a given angle in radians.
 */
export function rotatePoint(
  px: number,
  py: number,
  cx: number,
  cy: number,
  angleRadians: number
): { x: number; y: number } {
  const cos = Math.cos(angleRadians);
  const sin = Math.sin(angleRadians);
  const nx = (cos * (px - cx)) - (sin * (py - cy)) + cx;
  const ny = (sin * (px - cx)) + (cos * (py - cy)) + cy;
  return { x: nx, y: ny };
}

/**
 * Calculates the area of a circle given its radius.
 */
export function circleArea(radius: number): number {
  return Math.PI * radius * radius;
}

/**
 * Calculates the circumference of a circle given its radius.
 */
export function circleCircumference(radius: number): number {
  return 2 * Math.PI * radius;
}

/**
 * Calculates the area of a rectangle.
 */
export function rectangleArea(width: number, height: number): number {
  return width * height;
}

/**
 * Calculates the area of a triangle given its base and height.
 */
export function triangleArea(base: number, height: number): number {
  return (base * height) / 2;
}
