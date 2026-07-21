export interface SemVer {
  major: number;
  minor: number;
  patch: number;
  prerelease: string[];
  build: string[];
}

const semverRegex =
  /^v?(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;

/**
 * Parses a semantic version string into a SemVer object.
 * Returns null if the version is invalid.
 */
export function semverParse(version: string): SemVer | null {
  const match = version.trim().match(semverRegex);
  if (!match) return null;

  return {
    major: parseInt(match[1], 10),
    minor: parseInt(match[2], 10),
    patch: parseInt(match[3], 10),
    prerelease: match[4] ? match[4].split(".") : [],
    build: match[5] ? match[5].split(".") : [],
  };
}

/**
 * Cleans the semantic version string, stripping leading "v" or whitespace.
 * Returns null if the version is invalid.
 */
export function semverClean(version: string): string | null {
  const parsed = semverParse(version);
  if (!parsed) return null;

  let cleaned = `${parsed.major}.${parsed.minor}.${parsed.patch}`;
  if (parsed.prerelease.length > 0) {
    cleaned += `-${parsed.prerelease.join(".")}`;
  }
  if (parsed.build.length > 0) {
    cleaned += `+${parsed.build.join(".")}`;
  }
  return cleaned;
}

/**
 * Checks if a string is a valid SemVer format.
 */
export function semverIsValid(version: string): boolean {
  return semverParse(version) !== null;
}

function comparePrerelease(p1: string[], p2: string[]): number {
  if (p1.length === 0 && p2.length === 0) return 0;
  // Release takes precedence over prerelease
  if (p1.length === 0) return 1;
  if (p2.length === 0) return -1;

  const len = Math.max(p1.length, p2.length);
  for (let i = 0; i < len; i++) {
    const id1 = p1[i];
    const id2 = p2[i];

    if (id1 === undefined) return -1;
    if (id2 === undefined) return 1;
    if (id1 === id2) continue;

    const n1 = parseInt(id1, 10);
    const n2 = parseInt(id2, 10);
    const isN1 = !isNaN(n1) && String(n1) === id1;
    const isN2 = !isNaN(n2) && String(n2) === id2;

    if (isN1 && isN2) {
      return n1 - n2;
    }
    if (isN1) return -1;
    if (isN2) return 1;

    return id1 < id2 ? -1 : 1;
  }
  return 0;
}

/**
 * Compares two semantic version strings.
 * Returns -1 if v1 < v2, 1 if v1 > v2, and 0 if they are equal.
 */
export function semverCompare(v1: string, v2: string): number {
  const parsed1 = semverParse(v1);
  const parsed2 = semverParse(v2);

  if (!parsed1 || !parsed2) {
    throw new Error(`Invalid semver comparison: v1=${v1}, v2=${v2}`);
  }

  if (parsed1.major !== parsed2.major) {
    return parsed1.major < parsed2.major ? -1 : 1;
  }
  if (parsed1.minor !== parsed2.minor) {
    return parsed1.minor < parsed2.minor ? -1 : 1;
  }
  if (parsed1.patch !== parsed2.patch) {
    return parsed1.patch < parsed2.patch ? -1 : 1;
  }

  const cmp = comparePrerelease(parsed1.prerelease, parsed2.prerelease);
  return cmp < 0 ? -1 : cmp > 0 ? 1 : 0;
}

/**
 * Checks if a version satisfies a range expression (e.g. "^1.2.3", ">=1.0.0 <2.0.0", "~1.0.0 || ^2.0.0").
 */
export function semverSatisfies(version: string, range: string): boolean {
  const parsedVer = semverParse(version);
  if (!parsedVer) return false;

  const orParts = range.split("||").map((p) => p.trim());

  return orParts.some((part) => {
    const andParts = part.split(/\s+/).map((p) => p.trim());
    return andParts.every((cond) => {
      if (cond === "*" || cond === "" || cond === "x") return true;

      // Handle caret ranges (e.g. ^1.2.3)
      if (cond.startsWith("^")) {
        const target = cond.slice(1);
        const parsedTarget = semverParse(target);
        if (!parsedTarget) return false;

        const baseCmp = semverCompare(version, target);
        if (baseCmp < 0) return false;

        if (parsedTarget.major > 0) {
          return parsedVer.major === parsedTarget.major;
        } else if (parsedTarget.minor > 0) {
          return (
            parsedVer.major === 0 && parsedVer.minor === parsedTarget.minor
          );
        } else {
          return semverCompare(version, target) === 0;
        }
      }

      // Handle tilde ranges (e.g. ~1.2.3)
      if (cond.startsWith("~")) {
        const target = cond.slice(1);
        const parsedTarget = semverParse(target);
        if (!parsedTarget) return false;

        const baseCmp = semverCompare(version, target);
        if (baseCmp < 0) return false;

        return (
          parsedVer.major === parsedTarget.major &&
          parsedVer.minor === parsedTarget.minor
        );
      }

      // Handle standard operators: >=, <=, >, <, =
      const match = cond.match(/^(>=|<=|>|<|=)?\s*(.*)$/);
      if (!match) return false;
      const op = match[1] || "=";
      const compVersion = match[2];

      const cmp = semverCompare(version, compVersion);
      if (op === "=") return cmp === 0;
      if (op === ">=") return cmp >= 0;
      if (op === "<=") return cmp <= 0;
      if (op === ">") return cmp > 0;
      if (op === "<") return cmp < 0;

      return false;
    });
  });
}
