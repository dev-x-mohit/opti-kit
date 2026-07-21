# OptiKit

> **The Zero-Dependency, Ultra-Lightweight Utility Engine for Modern JavaScript & TypeScript.**

[![NPM Version](https://img.shields.io/npm/v/@dev_x_mohit/opti-kit?style=flat-square&color=a855f7)](https://www.npmjs.com/package/@dev_x_mohit/opti-kit)
[![Socket Security](https://img.shields.io/badge/Socket%20Security-100%2F100-success?style=flat-square)](https://socket.dev/npm/package/@dev_x_mohit/opti-kit)
[![Bundlephobia Size](https://img.shields.io/badge/Minified%20%2B%20Gzip-14%20KB-blue?style=flat-square)](https://bundlephobia.com/package/@dev_x_mohit/opti-kit)
[![Dependencies](https://img.shields.io/badge/Dependencies-0-brightgreen?style=flat-square)](https://www.npmjs.com/package/@dev_x_mohit/opti-kit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

OptiKit is a zero-dependency, ultra-lightweight, and fully tree-shakeable JavaScript/TypeScript utility engine designed to replace legacy monolithic packages like Lodash, Moment, and Ramda. Built natively in TypeScript, it ships **38 hand-optimized modules** containing **434+ functions** in both ES Modules (`.mjs`) and CommonJS (`.js`) formats.

---

## Key Highlights

- ⚡ **16.0 KB Minified + Gzipped**
- 🛡️ **100/100 Security & Vulnerability Score** (Socket Security Verified)
- 📦 **0 External Dependencies** — Immune to supply-chain attacks
- 🌳 **100% Tree-Shakeable** — Ships with `"sideEffects": false`
- 🎯 **434+ Isomorphic Utilities** across 38 dedicated domain modules
- 🧪 **426 Unit Tests** with 100% passing test coverage

---

## Installation

```bash
# npm
npm install @dev_x_mohit/opti-kit

# pnpm
pnpm add @dev_x_mohit/opti-kit

# yarn
yarn add @dev_x_mohit/opti-kit

# bun
bun add @dev_x_mohit/opti-kit
```

---

## 38 Modules Overview

| Module | Utilities Count | Description |
| :--- | :--- | :--- |
| **`string`** | 45 utils | `slugify`, `truncate`, `capitalize`, `escapeHtml`, `interpolate`, `titleCase`, `levenshteinDistance` |
| **`array`** | 40 utils | `chunk`, `unique`, `groupBy`, `partition`, `shuffle`, `intersection`, `difference`, `zip` |
| **`math`** | 32 utils | `clamp`, `lerp`, `mean`, `median`, `standardDeviation`, `factorial`, `isPrime`, `gcd`, `lcm` |
| **`object`** | 31 utils | `deepClone`, `deepMerge`, `flattenObject`, `pick`, `omit`, `get`, `set`, `compactObject` |
| **`validate`** | 28 utils | `isEmail`, `isUrl`, `isUuid`, `isIP`, `isSemVer`, `isCreditCard`, `isJWT`, `isStrongPassword` |
| **`date`** | 20 utils | `relativeTime`, `formatDate`, `isLeapYear`, `addDays`, `subMonths`, `diffInDays`, `daysInMonth` |
| **`async`** | 19 utils | `debounce`, `throttle`, `retry`, `retryWithBackoff`, `delay`, `asyncPool`, `pMap`, `timeout` |
| **`number`** | 18 utils | `formatCurrency`, `formatCompact` (1K/1M), `toOrdinal`, `formatFileSize`, `roundToNearest` |
| **`crypto`** | 10 utils | `uuid`, `fnv1a`, `cyrb53`, `sha256`, `sha384`, `sha512`, `hmacSha256`, `generateToken` |
| **`color`** | 10 utils | `hexToRgb`, `rgbToHex`, `hslToRgb`, `rgbToHsl`, `hexToHsl`, `lighten`, `darken`, `getContrastRatio` |
| **`storage`** | 1 obj | `safeStorage` (Isomorphic localStorage/sessionStorage wrapper with JSON & expiry) |
| **`events`** | 7 utils | `EventEmitter` (Pub/Sub pattern), `listen`, `listenOnce`, `delegateEvent`, `waitForEvent` |
| **`dom`** | 14 utils | `copyToClipboard`, `setCookie`, `getCookie`, `deleteCookie`, `createElement`, `scrollToTop` |
| **`url`** | 8 utils | `joinPaths`, `parseUrl`, `stringifyQuery`, `buildUrl`, `isAbsoluteUrl` |
| **`functional`** | 14 utils | `curry`, `partial`, `pipe`, `compose`, `onceFn`, `memoize`, `constant`, `not`, `trampoline` |
| **`types`** | 14 utils | `isNil`, `isObject`, `isFunction`, `isDate`, `isRegExp`, `isString`, `isNumber`, `isPromise` |
| **`units`** | 8 utils | `celsiusToFahrenheit`, `fahrenheitToCelsius`, `milesToKilometers`, `poundsToKilograms` |
| **`geometry`** | 9 utils | `distance2D`, `distance3D`, `midpoint`, `angleBetween`, `rotatePoint`, `circleArea` |
| **`statistics`** | 12 utils | `variance`, `standardDeviation`, `zScore`, `percentile`, `covariance`, `correlation`, `skewness` |
| **`cache`** | 2 utils | `LRUCache`, `memoizeWithTTL` |
| **`regex`** | 1 obj | Pre-compiled regex patterns & validation generators |
| **`tree`** | 2 utils | `arrayToTree`, `treeToArray` hierarchical traversals |
| **`collection`** | 12 utils | `countBy`, `keyBy`, `sortBy`, `symmetricDifference`, `mergeMaps`, `frequencies`, `filterMap` |
| **`random`** | 9 utils | `randomUUID`, `randomColor`, `randomBoolean`, `randomFloat`, `randomItem`, `randomIntFast` |
| **`encoding`** | 8 utils | `utf8Encode`, `utf8Decode`, `hexEncode`, `hexDecode`, `base64Encode`, `base64Decode` |
| **`guard`** | 12 utils | `safeJsonParse`, `safeJsonStringify`, `safeParseInt`, `attempt`, `invariant`, `assertDefined` |
| **`format`** | 9 utils | `formatDuration`, `formatPhoneNumber`, `formatCreditCardNumber`, `formatPercentage`, `pluralize` |
| **`schema`** | 12 utils | Lightweight rule validation runner (`validateObject`, `required`, `minLength`, `minValue`) |
| **`browser`** | 16 utils | SSR-safe browser feature and environment checks (`isBrowser`, `isChrome`, `isMobile`) |
| **`json`** | 6 utils | Deep JSON utilities (`jsonClone`, `jsonFlatten`, `jsonUnflatten`, `jsonPath`, `jsonMerge`, `jsonDiff`) |
| **`store`** | 4 utils | Ultra-lightweight reactive primitives (`signal`, `computed`, `effect`, `createStore`) |
| **`http`** | 5 utils | Isomorphic network fetch wrappers (`fetchJson`, `fetchWithTimeout`, `fetchWithRetry`) |
| **`csv`** | 2 utils | Table processing utilities (`csvParse`, `csvStringify`) |
| **`log`** | 2 utils | Custom level-based ANSI loggers (`createLogger`, `ansi`) |
| **`ds`** | 4 classes | Advanced standard data structures (`Stack`, `Queue`, `PriorityQueue`, `BiMap`) |
| **`template`** | 2 utils | Isomorphic logic-less micro template engine (`render`, `compile`) |
| **`keyboard`** | 2 utils | Isomorphic hotkeys listener and key press state checking (`registerShortcut`, `isKeyPressed`) |
| **`semver`** | 5 utils | SemVer 2.0 parser, validator, comparator, and range checker (`semverCompare`, `semverSatisfies`) |


---

## Code Examples

### 1. String Casing & Formatting
```typescript
import { slugify, truncate, escapeHtml } from '@dev_x_mohit/opti-kit';

slugify('OptiKit Zero Dependency!'); // "optikit-zero-dependency"
truncate('Building high performance web apps', 18); // "Building high..."
escapeHtml('<h1>Hello World</h1>'); // "&lt;h1&gt;Hello World&lt;/h1&gt;"
```

### 2. Array & Object Operations
```typescript
import { chunk, unique, groupBy, deepClone, deepMerge } from '@dev_x_mohit/opti-kit';

chunk([1, 2, 3, 4, 5, 6], 2); // [[1, 2], [3, 4], [5, 6]]
unique([1, 1, 2, 3, 3]); // [1, 2, 3]
groupBy([{ r: 'admin' }, { r: 'user' }, { r: 'admin' }], i => i.r); // { admin: [...], user: [...] }

const merged = deepMerge({ a: 1 }, { b: 2 }); // { a: 1, b: 2 }
```

### 3. Isomorphic `safeStorage` Wrapper
```typescript
import { safeStorage } from '@dev_x_mohit/opti-kit';

// Zero-throw wrapper: works in Next.js/React SSR without window errors!
// Supports native object JSON parsing and custom millisecond expiration times:
safeStorage.setItem('user_session', { id: 'usr_99', role: 'admin' }, 60000); // 1 minute expiration
const session = safeStorage.getItem('user_session'); // { id: 'usr_99', role: 'admin' }
```

### 4. Async Retry & Debounce
```typescript
import { delay, retry, debounce } from '@dev_x_mohit/opti-kit';

await delay(500); // sleep 500ms

// Automatically retry failed API calls 3 times with exponential backoff
const data = await retry(async () => fetchApiData(), 3, 500);

// Debounce expensive handlers
const onSearch = debounce((query) => executeSearch(query), 300);
```

---

## Version Release History

- **`v1.0.6`**: Verified 100/100 Socket Security & 14.0 KB Gzip Bundlephobia audit. Added cookie helpers (`setCookie`, `getCookie`, `deleteCookie`) and file helpers (`getFileExtension`, `getFileName`, `formatFileSize`).
- **`v1.0.5`**: Added `safeStorage` isomorphic wrapper and `EventEmitter`. Fixed DTS ambient `Buffer` type declaration generator errors.
- **`v1.0.4`**: Added functional programming helpers (`curry`, `partial`, `noop`) and extended string/validation functions.
- **`v1.0.3`**: Added `color` and `crypto` modules (`uuid`, `randomUUID`, `fnv1a`, `cyrb53`, `sha256`, `sha512`).
- **`v1.0.2`**: Added `statistics` and `geometry` modules.
- **`v1.0.1`**: Added `units` and `cache` (`LRUCache`, `memoizeWithTTL`) modules.
- **`v1.0.0`**: Initial release of `@dev_x_mohit/opti-kit` utility monorepo.

---


## Interactive Showcase & Documentation

- 🌐 **Interactive Live Sandbox**: [opti-kit-showcase.vercel.app](https://opti-kit-showcase.vercel.app)
- 👨‍💻 **Developer Portfolio**: [mohitlakhara.vercel.app](https://mohitlakhara.vercel.app)
- 📦 **NPM Package**: [npmjs.com/package/@dev_x_mohit/opti-kit](https://www.npmjs.com/package/@dev_x_mohit/opti-kit)
- 🛡️ **Socket Security Audit**: [socket.dev/npm/package/@dev_x_mohit/opti-kit](https://socket.dev/npm/package/@dev_x_mohit/opti-kit)
- ⚡ **Bundlephobia Audit**: [bundlephobia.com/package/@dev_x_mohit/opti-kit](https://bundlephobia.com/package/@dev_x_mohit/opti-kit)

---

## License

MIT © [Mohit Lakhara](https://mohitlakhara.vercel.app)


