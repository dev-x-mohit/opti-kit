import { describe, it, expect } from 'vitest';
import {
  createAABB, aabbIntersects, aabbContains, aabbUnion, aabbExpand,
  createQuadtree, quadtreeInsert, quadtreeQuery, quadtreeNearest,
  obbIntersects, circleIntersectsAABB, rayIntersectsAABB, rayIntersectsCircle,
  haversineDistance, vincentyDistance, geoBearing, geoDestination, geoMidpoint,
  geoBoundingBox, spatialPointInPolygon, spatialPolygonArea, spatialPolygonCentroid,
  convexHull2D, douglasPeucker, mortonEncode, mortonDecode,
} from '../spatial';

describe('Spatial & Geo Utilities', () => {
  it('handles AABB, Quadtree, OBB, circle, and ray collisions', () => {
    const a = createAABB(0, 0, 10, 10);
    const b = createAABB(5, 5, 15, 15);
    expect(aabbIntersects(a, b)).toBe(true);
    expect(aabbContains(a, { x: 5, y: 5 })).toBe(true);
    expect(aabbUnion(a, b)).toEqual({ minX: 0, minY: 0, maxX: 15, maxY: 15 });
    expect(aabbExpand(a, 2)).toEqual({ minX: -2, minY: -2, maxX: 12, maxY: 12 });

    const qt = createQuadtree<string>(createAABB(0, 0, 100, 100), 2);
    quadtreeInsert(qt, { x: 10, y: 10, data: 'A' });
    quadtreeInsert(qt, { x: 20, y: 20, data: 'B' });
    quadtreeInsert(qt, { x: 80, y: 80, data: 'C' });
    expect(quadtreeQuery(qt, createAABB(0, 0, 30, 30)).length).toBe(2);
    expect(quadtreeNearest(qt, { x: 12, y: 12 })?.data).toBe('A');

    expect(
      obbIntersects(
        { cx: 0, cy: 0, halfW: 2, halfH: 2, angleRad: 0 },
        { cx: 3, cy: 0, halfW: 2, halfH: 2, angleRad: Math.PI / 4 }
      )
    ).toBe(true);
    expect(circleIntersectsAABB(11, 5, 2, a)).toBe(true);
    expect(rayIntersectsAABB({ x: -5, y: 5 }, { x: 1, y: 0 }, a)).toBe(5);
    expect(rayIntersectsCircle({ x: -5, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 0 }, 2)).toBe(3);
  });

  it('handles geo calculations, polygons, convex hull, simplification, and morton codes', () => {
    const nyc = { lat: 40.7128, lng: -74.006 };
    const ldn = { lat: 51.5074, lng: -0.1278 };
    const dHav = haversineDistance(nyc, ldn);
    const dVin = vincentyDistance(nyc, ldn);
    expect(dHav).toBeGreaterThan(5_500_000);
    expect(Math.abs(dHav - dVin)).toBeLessThan(30_000);
    expect(geoBearing(nyc, ldn)).toBeGreaterThan(40);
    const dest = geoDestination(nyc, 90, 1000);
    expect(dest.lng).toBeGreaterThan(nyc.lng);
    expect(geoMidpoint(nyc, ldn).lat).toBeGreaterThan(45);
    expect(geoBoundingBox([nyc, ldn]).maxLat).toBe(51.5074);

    const square = [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 10 }, { x: 0, y: 10 }];
    expect(spatialPointInPolygon({ x: 5, y: 5 }, square)).toBe(true);
    expect(spatialPolygonArea(square)).toBe(100);
    expect(spatialPolygonCentroid(square)).toEqual({ x: 5, y: 5 });

    const hull = convexHull2D([...square, { x: 5, y: 5 }, { x: 3, y: 4 }]);
    expect(hull.length).toBe(4);
    expect(douglasPeucker([{ x: 0, y: 0 }, { x: 5, y: 0.1 }, { x: 10, y: 0 }], 0.5).length).toBe(2);

    const code = mortonEncode(42, 99);
    expect(mortonDecode(code)).toEqual({ x: 42, y: 99 });
  });
});
