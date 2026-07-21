# Changelog

All notable changes to `@dev_x_mohit/opti-kit` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.9] - 2026-07-21

### Added
- Added `isPrimitive` type guard helper function to `types.ts`.

### Changed
- Rewrote the package `README.md` for a professional and modern look on NPM.

### Security
- Addressed security vulnerability and socket.dev alerts by removing the network-accessing `http` module and removing process environment (`process.env`) references from `log.ts`. The library is now 100% supply-chain safe with 0 dependencies, 0 network access, and 0 environment variable access.

---

## [1.0.8] - 2026-07-21

### Added
- Added 13 new utility modules: `guard`, `format`, `schema`, `browser`, `json`, `store`, `http` (subsequently deprecated in 1.0.9), `csv`, `log`, `ds`, `template`, `keyboard`, and `semver`.
- Reached 429 utilities and 418 unit tests.

---

## [1.0.7] - 2026-07-21

### Changed
- Internal repository maintenance update.

---

## [1.0.6] - 2026-07-20

### Added
- Verified 100/100 Security & Vulnerability score on Socket Security.
- Added Bundlephobia audit verification (14.0 KB Minified + Gzipped).
- Added `setCookie`, `getCookie`, `deleteCookie` helper functions to `dom.ts`.
- Added `getFileExtension`, `getFileName` helper functions to `string.ts`.
- Added `formatFileSize` helper function to `number.ts`.

### Changed
- Standardized 25 core isomorphic roadmap modules with zero external third-party dependencies.
- Re-exported functions to single canonical homes to resolve ambient DTS generator namespace collisions.
- Expanded total unit test suite to 306 passing test cases.

---

## [1.0.5] - 2026-07-20

### Added
- Added `safeStorage` isomorphic storage wrapper with automatic JSON serialization, error boundaries, and custom expiry timeouts.
- Added `EventEmitter` pub/sub class.

### Fixed
- Fixed TypeScript declaration generation (`.d.ts`) ambient Buffer type error when `@types/node` is not installed.
- Fixed `retry` async helper boundary condition.

---

## [1.0.4] - 2026-07-20

### Added
- Added `curry`, `partial`, and `noop` to `functional.ts`.
- Added `isAlpha`, `isAlphanumeric`, `isJWT`, `isLatLong` to `validate.ts`.

---

## [1.0.3] - 2026-07-20

### Added
- Added `color.ts` with `hexToRgb`, `rgbToHex`, `hslToRgb`, and `isHexColor`.
- Added `crypto.ts` with `uuid`, `randomUUID`, `fnv1a`, `cyrb53`, `sha256`, `sha384`, `sha512`, `sha1`, `hmacSha256`, `base64Encode`, `base64Decode`, `hexEncode`, `hexDecode`.

---

## [1.0.2] - 2026-07-20

### Added
- Added `statistics.ts` with `variance`, `standardDeviation`, `zScore`, `percentile`, `quartiles`, `covariance`, and `mode`.
- Added `geometry.ts` with `distance2D`, `distance3D`, `midpoint`, `angleBetween`, `rotatePoint`, `circleArea`, `circleCircumference`, `triangleArea`, `rectangleArea`.

---

## [1.0.1] - 2026-07-20

### Added
- Added `units.ts` with temperature (`celsiusToFahrenheit`), distance (`milesToKilometers`), weight (`poundsToKilograms`), and angle conversions (`degreesToRadians`).
- Added `cache.ts` with `LRUCache` and `memoizeWithTTL`.

---

## [1.0.0] - 2026-07-20

### Added
- Initial release of `@dev_x_mohit/opti-kit` utility monorepo.
- Ships core modules: `string`, `array`, `object`, `math`, `number`, `async`, `validate`, `date`, `dom`, `url`, `regex`, `tree`, `types`, `random`, `collection`.
- Dual CJS (`.js`) and ESM (`.mjs`) builds generated via `tsup`.
