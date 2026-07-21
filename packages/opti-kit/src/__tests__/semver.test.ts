import { describe, it, expect } from "vitest";
import {
  semverParse,
  semverClean,
  semverIsValid,
  semverCompare,
  semverSatisfies
} from "../semver";

describe("semver module", () => {
  it("semverParse - parses standard semver", () => {
    expect(semverParse("1.2.3")).toEqual({
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: [],
      build: []
    });

    expect(semverParse("v0.3.0-alpha.1+build.123")).toEqual({
      major: 0,
      minor: 3,
      patch: 0,
      prerelease: ["alpha", "1"],
      build: ["build", "123"]
    });

    expect(semverParse("invalid")).toBeNull();
  });

  it("semverClean - cleans versions", () => {
    expect(semverClean("  v1.2.3-beta  ")).toBe("1.2.3-beta");
    expect(semverClean("invalid")).toBeNull();
  });

  it("semverIsValid - validates formats", () => {
    expect(semverIsValid("1.0.0")).toBe(true);
    expect(semverIsValid("1.0")).toBe(false);
  });

  it("semverCompare - compares versions correctly", () => {
    expect(semverCompare("1.0.0", "2.0.0")).toBe(-1);
    expect(semverCompare("2.1.0", "2.0.9")).toBe(1);
    expect(semverCompare("1.0.0", "1.0.0")).toBe(0);

    // Prerelease comparison
    expect(semverCompare("1.0.0-alpha", "1.0.0-alpha.1")).toBe(-1);
    expect(semverCompare("1.0.0-alpha.1", "1.0.0-alpha.beta")).toBe(-1);
    expect(semverCompare("1.0.0-alpha.beta", "1.0.0-beta")).toBe(-1);
    expect(semverCompare("1.0.0-beta", "1.0.0-beta.2")).toBe(-1);
    expect(semverCompare("1.0.0-beta.2", "1.0.0-beta.11")).toBe(-1);
    expect(semverCompare("1.0.0-beta.11", "1.0.0-rc.1")).toBe(-1);
    expect(semverCompare("1.0.0-rc.1", "1.0.0")).toBe(-1); // Release > prerelease
  });

  it("semverSatisfies - range evaluation", () => {
    // Caret ranges
    expect(semverSatisfies("1.2.4", "^1.2.3")).toBe(true);
    expect(semverSatisfies("2.0.0", "^1.2.3")).toBe(false);
    expect(semverSatisfies("0.2.3", "^0.2.1")).toBe(true);
    expect(semverSatisfies("0.3.0", "^0.2.1")).toBe(false);

    // Tilde ranges
    expect(semverSatisfies("1.2.5", "~1.2.3")).toBe(true);
    expect(semverSatisfies("1.3.0", "~1.2.3")).toBe(false);

    // Absolute operator ranges
    expect(semverSatisfies("1.5.0", ">=1.0.0 <2.0.0")).toBe(true);
    expect(semverSatisfies("2.0.0", ">=1.0.0 <2.0.0")).toBe(false);

    // OR ranges
    expect(semverSatisfies("2.5.0", "^1.0.0 || ^2.0.0")).toBe(true);
    expect(semverSatisfies("3.0.0", "^1.0.0 || ^2.0.0")).toBe(false);
  });
});
