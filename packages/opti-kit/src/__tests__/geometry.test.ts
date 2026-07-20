import { describe, it, expect } from "vitest";
import {
  distance2D,
  distance3D,
  midpoint,
  angleBetween,
  rotatePoint,
  circleArea,
  circleCircumference,
  rectangleArea,
  triangleArea,
} from "../geometry";

describe("Geometry Module", () => {
  it("distance2D", () => {
    expect(distance2D(0, 0, 3, 4)).toBe(5);
  });

  it("distance3D", () => {
    expect(distance3D(0, 0, 0, 1, 2, 2)).toBe(3);
  });

  it("midpoint", () => {
    expect(midpoint(0, 0, 4, 4)).toEqual({ x: 2, y: 2 });
  });

  it("angleBetween", () => {
    expect(angleBetween(0, 0, 1, 1)).toBeCloseTo(Math.PI / 4);
    expect(angleBetween(0, 0, 0, 1)).toBeCloseTo(Math.PI / 2);
  });

  it("rotatePoint", () => {
    const pt = rotatePoint(1, 0, 0, 0, Math.PI / 2);
    expect(pt.x).toBeCloseTo(0);
    expect(pt.y).toBeCloseTo(1);
  });

  it("circleArea", () => {
    expect(circleArea(1)).toBeCloseTo(Math.PI);
    expect(circleArea(2)).toBeCloseTo(Math.PI * 4);
  });

  it("circleCircumference", () => {
    expect(circleCircumference(1)).toBeCloseTo(Math.PI * 2);
  });

  it("rectangleArea", () => {
    expect(rectangleArea(4, 5)).toBe(20);
  });

  it("triangleArea", () => {
    expect(triangleArea(4, 5)).toBe(10);
  });
});
