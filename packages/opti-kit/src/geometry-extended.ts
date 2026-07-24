export interface Point { x: number; y: number }
export interface Polygon { points: Point[] }
export interface Circle { center: Point; radius: number }
export interface Rect { x: number; y: number; width: number; height: number }
export interface Line { start: Point; end: Point }

/**
 * Calculates the area of a polygon.
 */
export function polygonArea(polygon: Polygon): number {
  const pts = polygon.points;
  let area = 0;
  for (let i = 0; i < pts.length; i++) {
    const j = (i + 1) % pts.length;
    area += pts[i].x * pts[j].y;
    area -= pts[j].x * pts[i].y;
  }
  return Math.abs(area / 2);
}

/**
 * Checks if a point is inside a polygon using ray casting.
 */
export function pointInPolygon(point: Point, polygon: Polygon): boolean {
  const { x, y } = point;
  const pts = polygon.points;
  let inside = false;
  
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const xi = pts[i].x, yi = pts[i].y;
    const xj = pts[j].x, yj = pts[j].y;
    
    const intersect = ((yi > y) !== (yj > y)) &&
      (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

/**
 * Checks if a point is inside a circle.
 */
export function pointInCircle(point: Point, circle: Circle): boolean {
  const dx = point.x - circle.center.x;
  const dy = point.y - circle.center.y;
  return dx * dx + dy * dy <= circle.radius * circle.radius;
}

/**
 * Checks if a point is inside a rectangle.
 */
export function pointInRect(point: Point, rect: Rect): boolean {
  return point.x >= rect.x && point.x <= rect.x + rect.width &&
         point.y >= rect.y && point.y <= rect.y + rect.height;
}

/**
 * Checks if two rectangles intersect.
 */
export function rectIntersect(r1: Rect, r2: Rect): boolean {
  return !(r2.x > r1.x + r1.width ||
           r2.x + r2.width < r1.x ||
           r2.y > r1.y + r1.height ||
           r2.y + r2.height < r1.y);
}

/**
 * Checks if two circles intersect.
 */
export function circleIntersect(c1: Circle, c2: Circle): boolean {
  const dx = c1.center.x - c2.center.x;
  const dy = c1.center.y - c2.center.y;
  const distanceSq = dx * dx + dy * dy;
  const radiusSum = c1.radius + c2.radius;
  return distanceSq <= radiusSum * radiusSum;
}

/**
 * Gets the bounding box of a polygon.
 */
export function polygonBoundingBox(polygon: Polygon): Rect {
  if (polygon.points.length === 0) return { x: 0, y: 0, width: 0, height: 0 };
  let minX = polygon.points[0].x;
  let minY = polygon.points[0].y;
  let maxX = polygon.points[0].x;
  let maxY = polygon.points[0].y;
  
  for (const p of polygon.points) {
    if (p.x < minX) minX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.x > maxX) maxX = p.x;
    if (p.y > maxY) maxY = p.y;
  }
  
  return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
}

/**
 * Computes a point on a quadratic Bezier curve.
 */
export function bezierQuadratic(p0: Point, p1: Point, p2: Point, t: number): Point {
  const mt = 1 - t;
  const mt2 = mt * mt;
  const t2 = t * t;
  
  return {
    x: mt2 * p0.x + 2 * mt * t * p1.x + t2 * p2.x,
    y: mt2 * p0.y + 2 * mt * t * p1.y + t2 * p2.y
  };
}

/**
 * Computes a point on a cubic Bezier curve.
 */
export function bezierCubic(p0: Point, p1: Point, p2: Point, p3: Point, t: number): Point {
  const mt = 1 - t;
  const mt2 = mt * mt;
  const mt3 = mt2 * mt;
  const t2 = t * t;
  const t3 = t2 * t;
  
  return {
    x: mt3 * p0.x + 3 * mt2 * t * p1.x + 3 * mt * t2 * p2.x + t3 * p3.x,
    y: mt3 * p0.y + 3 * mt2 * t * p1.y + 3 * mt * t2 * p2.y + t3 * p3.y
  };
}
