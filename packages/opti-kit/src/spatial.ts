/**
 * OptiKit Spatial — 2D Quadtree, AABB/OBB/Ray collisions, Geo (Haversine/Vincenty/Bearing),
 * Convex Hull, Douglas-Peucker simplification, and Morton Z-order curve encoding.
 */

export interface Point2D {
  x: number;
  y: number;
}

export interface AABB {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

export interface GeoCoord {
  lat: number;
  lng: number;
}

export interface QuadtreeItem<T = unknown> extends Point2D {
  data?: T;
}

export interface QuadtreeNode<T = unknown> {
  bounds: AABB;
  capacity: number;
  items: QuadtreeItem<T>[];
  divided: boolean;
  nw?: QuadtreeNode<T>;
  ne?: QuadtreeNode<T>;
  sw?: QuadtreeNode<T>;
  se?: QuadtreeNode<T>;
}

/** Creates an axis-aligned bounding box (AABB). */
export function createAABB(minX: number, minY: number, maxX: number, maxY: number): AABB {
  return {
    minX: Math.min(minX, maxX),
    minY: Math.min(minY, maxY),
    maxX: Math.max(minX, maxX),
    maxY: Math.max(minY, maxY),
  };
}

/** Checks if two AABBs intersect. */
export function aabbIntersects(a: AABB, b: AABB): boolean {
  return a.minX <= b.maxX && a.maxX >= b.minX && a.minY <= b.maxY && a.maxY >= b.minY;
}

/** Checks if an AABB contains a point or another AABB. */
export function aabbContains(box: AABB, target: Point2D | AABB): boolean {
  if ('x' in target) {
    return target.x >= box.minX && target.x <= box.maxX && target.y >= box.minY && target.y <= box.maxY;
  }
  return (
    target.minX >= box.minX &&
    target.maxX <= box.maxX &&
    target.minY >= box.minY &&
    target.maxY <= box.maxY
  );
}

/** Returns the smallest AABB enclosing both `a` and `b`. */
export function aabbUnion(a: AABB, b: AABB): AABB {
  return {
    minX: Math.min(a.minX, b.minX),
    minY: Math.min(a.minY, b.minY),
    maxX: Math.max(a.maxX, b.maxX),
    maxY: Math.max(a.maxY, b.maxY),
  };
}

/** Expands an AABB uniformly by `margin`. */
export function aabbExpand(box: AABB, margin: number): AABB {
  return {
    minX: box.minX - margin,
    minY: box.minY - margin,
    maxX: box.maxX + margin,
    maxY: box.maxY + margin,
  };
}

/** Creates a 2D Quadtree for fast spatial range and nearest-neighbor queries. */
export function createQuadtree<T = unknown>(bounds: AABB, capacity = 4): QuadtreeNode<T> {
  return { bounds, capacity: Math.max(1, capacity), items: [], divided: false };
}

function subdivideQuadtree<T>(node: QuadtreeNode<T>): void {
  const { minX, minY, maxX, maxY } = node.bounds;
  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;
  node.nw = createQuadtree({ minX, minY: midY, maxX: midX, maxY }, node.capacity);
  node.ne = createQuadtree({ minX: midX, minY: midY, maxX, maxY }, node.capacity);
  node.sw = createQuadtree({ minX, minY, maxX: midX, maxY: midY }, node.capacity);
  node.se = createQuadtree({ minX: midX, minY, maxX, maxY: midY }, node.capacity);
  node.divided = true;
}

/** Inserts a point item into a Quadtree. */
export function quadtreeInsert<T>(node: QuadtreeNode<T>, item: QuadtreeItem<T>): boolean {
  if (!aabbContains(node.bounds, item)) return false;
  if (node.items.length < node.capacity && !node.divided) {
    node.items.push(item);
    return true;
  }
  if (!node.divided) subdivideQuadtree(node);
  return (
    quadtreeInsert(node.nw!, item) ||
    quadtreeInsert(node.ne!, item) ||
    quadtreeInsert(node.sw!, item) ||
    quadtreeInsert(node.se!, item)
  );
}

/** Queries all items inside `range` AABB from the Quadtree. */
export function quadtreeQuery<T>(node: QuadtreeNode<T>, range: AABB, found: QuadtreeItem<T>[] = []): QuadtreeItem<T>[] {
  if (!aabbIntersects(node.bounds, range)) return found;
  for (const item of node.items) {
    if (aabbContains(range, item)) found.push(item);
  }
  if (node.divided) {
    quadtreeQuery(node.nw!, range, found);
    quadtreeQuery(node.ne!, range, found);
    quadtreeQuery(node.sw!, range, found);
    quadtreeQuery(node.se!, range, found);
  }
  return found;
}

/** Finds the nearest item in the Quadtree to `target` within optional `maxRadius`. */
export function quadtreeNearest<T>(
  node: QuadtreeNode<T>,
  target: Point2D,
  maxRadius = Infinity
): QuadtreeItem<T> | null {
  const searchBox = Number.isFinite(maxRadius)
    ? createAABB(target.x - maxRadius, target.y - maxRadius, target.x + maxRadius, target.y + maxRadius)
    : node.bounds;
  const candidates = quadtreeQuery(node, searchBox);
  let best: QuadtreeItem<T> | null = null;
  let bestDistSq = maxRadius * maxRadius;
  for (const c of candidates) {
    const dx = c.x - target.x;
    const dy = c.y - target.y;
    const d2 = dx * dx + dy * dy;
    if (d2 <= bestDistSq) {
      bestDistSq = d2;
      best = c;
    }
  }
  return best;
}

/** Checks if two 2D Oriented Bounding Boxes (OBB) intersect via Separating Axis Theorem. */
export function obbIntersects(
  a: { cx: number; cy: number; halfW: number; halfH: number; angleRad: number },
  b: { cx: number; cy: number; halfW: number; halfH: number; angleRad: number }
): boolean {
  const getCorners = (o: typeof a): Point2D[] => {
    const cos = Math.cos(o.angleRad);
    const sin = Math.sin(o.angleRad);
    const dx1 = cos * o.halfW;
    const dy1 = sin * o.halfW;
    const dx2 = -sin * o.halfH;
    const dy2 = cos * o.halfH;
    return [
      { x: o.cx + dx1 + dx2, y: o.cy + dy1 + dy2 },
      { x: o.cx - dx1 + dx2, y: o.cy - dy1 + dy2 },
      { x: o.cx - dx1 - dx2, y: o.cy - dy1 - dy2 },
      { x: o.cx + dx1 - dx2, y: o.cy + dy1 - dy2 },
    ];
  };
  const polyA = getCorners(a);
  const polyB = getCorners(b);
  const axes = [
    { x: Math.cos(a.angleRad), y: Math.sin(a.angleRad) },
    { x: -Math.sin(a.angleRad), y: Math.cos(a.angleRad) },
    { x: Math.cos(b.angleRad), y: Math.sin(b.angleRad) },
    { x: -Math.sin(b.angleRad), y: Math.cos(b.angleRad) },
  ];
  for (const axis of axes) {
    const projA = polyA.map((p) => p.x * axis.x + p.y * axis.y);
    const projB = polyB.map((p) => p.x * axis.x + p.y * axis.y);
    if (Math.max(...projA) < Math.min(...projB) || Math.max(...projB) < Math.min(...projA)) {
      return false;
    }
  }
  return true;
}

/** Checks if a circle intersects an AABB. */
export function circleIntersectsAABB(cx: number, cy: number, radius: number, box: AABB): boolean {
  const closestX = Math.max(box.minX, Math.min(cx, box.maxX));
  const closestY = Math.max(box.minY, Math.min(cy, box.maxY));
  const dx = cx - closestX;
  const dy = cy - closestY;
  return dx * dx + dy * dy <= radius * radius;
}

/** Checks if a 2D ray intersects an AABB (slab method), returning hit distance or `null`. */
export function rayIntersectsAABB(
  origin: Point2D,
  dir: Point2D,
  box: AABB
): number | null {
  const invX = dir.x !== 0 ? 1 / dir.x : Infinity;
  const invY = dir.y !== 0 ? 1 / dir.y : Infinity;
  const t1 = (box.minX - origin.x) * invX;
  const t2 = (box.maxX - origin.x) * invX;
  const t3 = (box.minY - origin.y) * invY;
  const t4 = (box.maxY - origin.y) * invY;
  const tmin = Math.max(Math.min(t1, t2), Math.min(t3, t4));
  const tmax = Math.min(Math.max(t1, t2), Math.max(t3, t4));
  if (tmax < 0 || tmin > tmax) return null;
  return tmin >= 0 ? tmin : tmax;
}

/** Checks if a 2D ray intersects a circle, returning hit distance or `null`. */
export function rayIntersectsCircle(
  origin: Point2D,
  dir: Point2D,
  center: Point2D,
  radius: number
): number | null {
  const ox = origin.x - center.x;
  const oy = origin.y - center.y;
  const a = dir.x * dir.x + dir.y * dir.y;
  const b = 2 * (ox * dir.x + oy * dir.y);
  const c = ox * ox + oy * oy - radius * radius;
  const disc = b * b - 4 * a * c;
  if (disc < 0 || a === 0) return null;
  const sqrtD = Math.sqrt(disc);
  const t1 = (-b - sqrtD) / (2 * a);
  const t2 = (-b + sqrtD) / (2 * a);
  if (t1 >= 0) return t1;
  if (t2 >= 0) return t2;
  return null;
}

const EARTH_RADIUS_M = 6371000;
const toRad = (deg: number) => (deg * Math.PI) / 180;
const toDeg = (rad: number) => (rad * 180) / Math.PI;

/** Computes great-circle distance in meters using the Haversine formula. */
export function haversineDistance(a: GeoCoord, b: GeoCoord): number {
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_M * Math.asin(Math.sqrt(h));
}

/** Computes ellipsoidal distance in meters using Vincenty's inverse formula (WGS84). */
export function vincentyDistance(a: GeoCoord, b: GeoCoord): number {
  if (a.lat === b.lat && a.lng === b.lng) return 0;
  const semiMajor = 6378137;
  const f = 1 / 298.257223563;
  const semiMinor = (1 - f) * semiMajor;
  const U1 = Math.atan((1 - f) * Math.tan(toRad(a.lat)));
  const U2 = Math.atan((1 - f) * Math.tan(toRad(b.lat)));
  const L = toRad(b.lng - a.lng);
  let lambda = L;
  let sinSigma = 0, cosSigma = 0, sigma = 0, sinAlpha = 0, cosSqAlpha = 0, cos2SigmaM = 0;
  for (let iter = 0; iter < 100; iter++) {
    const sinLambda = Math.sin(lambda);
    const cosLambda = Math.cos(lambda);
    sinSigma = Math.sqrt(
      (Math.cos(U2) * sinLambda) ** 2 +
        (Math.cos(U1) * Math.sin(U2) - Math.sin(U1) * Math.cos(U2) * cosLambda) ** 2
    );
    if (sinSigma === 0) return 0;
    cosSigma = Math.sin(U1) * Math.sin(U2) + Math.cos(U1) * Math.cos(U2) * cosLambda;
    sigma = Math.atan2(sinSigma, cosSigma);
    sinAlpha = (Math.cos(U1) * Math.cos(U2) * sinLambda) / sinSigma;
    cosSqAlpha = 1 - sinAlpha * sinAlpha;
    cos2SigmaM = cosSqAlpha !== 0 ? cosSigma - (2 * Math.sin(U1) * Math.sin(U2)) / cosSqAlpha : 0;
    const C = (f / 16) * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));
    const prevLambda = lambda;
    lambda =
      L +
      (1 - C) *
        f *
        sinAlpha *
        (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));
    if (Math.abs(lambda - prevLambda) <= 1e-12) break;
  }
  const uSq = (cosSqAlpha * (semiMajor * semiMajor - semiMinor * semiMinor)) / (semiMinor * semiMinor);
  const A = 1 + (uSq / 16384) * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
  const B = (uSq / 1024) * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
  const deltaSigma =
    B *
    sinSigma *
    (cos2SigmaM +
      (B / 4) *
        (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) -
          (B / 6) * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma) * (-3 + 4 * cos2SigmaM * cos2SigmaM)));
  return semiMinor * A * (sigma - deltaSigma);
}

/** Computes initial compass bearing in degrees `[0, 360)` from `a` to `b`. */
export function geoBearing(a: GeoCoord, b: GeoCoord): number {
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const dLng = toRad(b.lng - a.lng);
  const y = Math.sin(dLng) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
  return (toDeg(Math.atan2(y, x)) + 360) % 360;
}

/** Computes destination coordinate given start, bearing (degrees), and distance (meters). */
export function geoDestination(start: GeoCoord, bearingDeg: number, distanceM: number): GeoCoord {
  const angDist = distanceM / EARTH_RADIUS_M;
  const brng = toRad(bearingDeg);
  const lat1 = toRad(start.lat);
  const lng1 = toRad(start.lng);
  const lat2 = Math.asin(
    Math.sin(lat1) * Math.cos(angDist) + Math.cos(lat1) * Math.sin(angDist) * Math.cos(brng)
  );
  const lng2 =
    lng1 +
    Math.atan2(
      Math.sin(brng) * Math.sin(angDist) * Math.cos(lat1),
      Math.cos(angDist) - Math.sin(lat1) * Math.sin(lat2)
    );
  return { lat: toDeg(lat2), lng: toDeg(lng2) };
}

/** Computes the geographic midpoint between two coordinates. */
export function geoMidpoint(a: GeoCoord, b: GeoCoord): GeoCoord {
  const lat1 = toRad(a.lat);
  const lng1 = toRad(a.lng);
  const lat2 = toRad(b.lat);
  const dLng = toRad(b.lng - a.lng);
  const bx = Math.cos(lat2) * Math.cos(dLng);
  const by = Math.cos(lat2) * Math.sin(dLng);
  const lat3 = Math.atan2(
    Math.sin(lat1) + Math.sin(lat2),
    Math.sqrt((Math.cos(lat1) + bx) ** 2 + by ** 2)
  );
  const lng3 = lng1 + Math.atan2(by, Math.cos(lat1) + bx);
  return { lat: toDeg(lat3), lng: toDeg(lng3) };
}

/** Computes the bounding box around a list of geographic coordinates. */
export function geoBoundingBox(coords: readonly GeoCoord[]): {
  minLat: number;
  minLng: number;
  maxLat: number;
  maxLng: number;
} {
  let minLat = Infinity, minLng = Infinity, maxLat = -Infinity, maxLng = -Infinity;
  for (const c of coords) {
    if (c.lat < minLat) minLat = c.lat;
    if (c.lat > maxLat) maxLat = c.lat;
    if (c.lng < minLng) minLng = c.lng;
    if (c.lng > maxLng) maxLng = c.lng;
  }
  return { minLat, minLng, maxLat, maxLng };
}

/** Ray-casting point-in-polygon check for 2D polygons. */
export function spatialPointInPolygon(point: Point2D, polygon: readonly Point2D[]): boolean {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x, yi = polygon[i].y;
    const xj = polygon[j].x, yj = polygon[j].y;
    const intersect =
      yi > point.y !== yj > point.y &&
      point.x < ((xj - xi) * (point.y - yi)) / (yj - yi || 1e-12) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

/** Computes the unsigned area of a 2D polygon using the Shoelace formula. */
export function spatialPolygonArea(polygon: readonly Point2D[]): number {
  let sum = 0;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    sum += polygon[j].x * polygon[i].y - polygon[i].x * polygon[j].y;
  }
  return Math.abs(sum) / 2;
}

/** Computes the centroid of a 2D polygon. */
export function spatialPolygonCentroid(polygon: readonly Point2D[]): Point2D {
  if (polygon.length === 0) return { x: 0, y: 0 };
  let areaSum = 0, cx = 0, cy = 0;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const cross = polygon[j].x * polygon[i].y - polygon[i].x * polygon[j].y;
    areaSum += cross;
    cx += (polygon[j].x + polygon[i].x) * cross;
    cy += (polygon[j].y + polygon[i].y) * cross;
  }
  if (Math.abs(areaSum) < 1e-12) return { x: polygon[0].x, y: polygon[0].y };
  return { x: cx / (3 * areaSum), y: cy / (3 * areaSum) };
}

/** Computes the 2D convex hull using Andrew's monotone chain algorithm. */
export function convexHull2D(points: readonly Point2D[]): Point2D[] {
  if (points.length <= 2) return [...points];
  const pts = [...points].sort((a, b) => a.x - b.x || a.y - b.y);
  const cross = (o: Point2D, a: Point2D, b: Point2D) =>
    (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
  const lower: Point2D[] = [];
  for (const p of pts) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) {
      lower.pop();
    }
    lower.push(p);
  }
  const upper: Point2D[] = [];
  for (let i = pts.length - 1; i >= 0; i--) {
    const p = pts[i];
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) {
      upper.pop();
    }
    upper.push(p);
  }
  lower.pop();
  upper.pop();
  return lower.concat(upper);
}

/** Simplifies a 2D polyline using the Ramer-Douglas-Peucker algorithm. */
export function douglasPeucker(points: readonly Point2D[], epsilon: number): Point2D[] {
  if (points.length <= 2) return [...points];
  const first = points[0];
  const last = points[points.length - 1];
  const perpDist = (p: Point2D) => {
    const dx = last.x - first.x;
    const dy = last.y - first.y;
    const lenSq = dx * dx + dy * dy;
    if (lenSq === 0) return Math.hypot(p.x - first.x, p.y - first.y);
    return Math.abs(dy * p.x - dx * p.y + last.x * first.y - last.y * first.x) / Math.sqrt(lenSq);
  };
  let maxDist = 0;
  let index = 0;
  for (let i = 1; i < points.length - 1; i++) {
    const d = perpDist(points[i]);
    if (d > maxDist) {
      maxDist = d;
      index = i;
    }
  }
  if (maxDist > epsilon) {
    const left = douglasPeucker(points.slice(0, index + 1), epsilon);
    const right = douglasPeucker(points.slice(index), epsilon);
    return left.slice(0, -1).concat(right);
  }
  return [first, last];
}

/** Encodes two 16-bit unsigned integers `(x, y)` into a 32-bit Morton Z-order code. */
export function mortonEncode(x: number, y: number): number {
  const part1By1 = (n: number) => {
    let v = n & 0xffff;
    v = (v | (v << 8)) & 0x00ff00ff;
    v = (v | (v << 4)) & 0x0f0f0f0f;
    v = (v | (v << 2)) & 0x33333333;
    v = (v | (v << 1)) & 0x55555555;
    return v;
  };
  return (part1By1(x) | (part1By1(y) << 1)) >>> 0;
}

/** Decodes a 32-bit Morton Z-order code back into `{ x, y }`. */
export function mortonDecode(code: number): Point2D {
  const compact1By1 = (n: number) => {
    let v = n & 0x55555555;
    v = (v | (v >> 1)) & 0x33333333;
    v = (v | (v >> 2)) & 0x0f0f0f0f;
    v = (v | (v >> 4)) & 0x00ff00ff;
    v = (v | (v >> 8)) & 0x0000ffff;
    return v;
  };
  return { x: compact1By1(code), y: compact1By1(code >>> 1) };
}
