# OptiKit

> **The Zero-Dependency, Ultra-Lightweight Utility Engine for Modern JavaScript & TypeScript.**

[![NPM Version](https://img.shields.io/npm/v/@dev_x_mohit/opti-kit?style=flat-square&color=a855f7)](https://www.npmjs.com/package/@dev_x_mohit/opti-kit)
[![Socket Security](https://img.shields.io/badge/Socket%20Security-100%2F100-success?style=flat-square)](https://socket.dev/npm/package/@dev_x_mohit/opti-kit)
[![Bundlephobia Size](https://img.shields.io/badge/Minified%20%2B%20Gzip-16%20KB-blue?style=flat-square)](https://bundlephobia.com/package/@dev_x_mohit/opti-kit)
[![Dependencies](https://img.shields.io/badge/Dependencies-0-brightgreen?style=flat-square)](https://www.npmjs.com/package/@dev_x_mohit/opti-kit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

OptiKit is a modern, zero-dependency utility engine designed as a drop-in replacement for legacy, monolithic libraries like Lodash, Rambda, and Moment. Natively built in TypeScript, it packages **37 hand-optimized modules** containing **430 utility functions**. 

Every export is designed with standard ESM + CJS compatibility, full TypeScript declarations, side-effects-free tree-shaking, and 100% passing test coverage.

---

## ⚡ Key Highlights

*   🌳 **100% Tree-Shakeable:** Structured with `"sideEffects": false` so your bundle only includes the functions you actually import.
*   🛡️ **Supply-Chain Immune:** 0 external dependencies, 0 network access, and 0 environment variable access. Safe for security-critical applications.
*   🌐 **Isomorphic & Universal:** Fully compatible with Node.js (>=18), modern browsers, Cloudflare Workers, Vercel Serverless, Bun, and Deno.
*   ⚡ **Ultra-Lightweight:** The entire engine of 37 modules and 430 utilities takes only **16.0 KB minified + gzipped**.
*   🧪 **Production-Grade Reliability:** Covered by 419 unit tests with 100% test coverage.

---

## 📦 Installation

Install the package via your preferred package manager:

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

## 📂 Categorized Modules (37 Modules)

Rather than dumping a monolithic API, OptiKit organizes its 430 utilities into dedicated, clean domains:

### 🗃️ Data & Collections
*   **`string`** (45 utils) — Modern string manipulations: `slugify`, `truncate`, `escapeHtml`, `titleCase`.
*   **`array`** (40 utils) — Safe list processing: `chunk`, `unique`, `groupBy`, `partition`, `intersection`.
*   **`object`** (31 utils) — Deep manipulations: `deepClone`, `deepMerge`, `flattenObject`, `pick`, `omit`.
*   **`collection`** (12 utils) — Aggregations: `countBy`, `keyBy`, `sortBy`, `symmetricDifference`.
*   **`tree`** (2 utils) — Hierarchical traversals: `arrayToTree`, `treeToArray`.
*   **`json`** (6 utils) — Deep JSON operations: `jsonClone`, `jsonFlatten`, `jsonUnflatten`, `jsonPath`, `jsonMerge`, `jsonDiff`.
*   **`csv`** (2 utils) — Micro CSV parsers: `csvParse`, `csvStringify`.
*   **`ds`** (4 classes) — Optimized structures: `Stack`, `Queue`, `PriorityQueue`, `BiMap`.

### ⚙️ Logic & Control Flow
*   **`async`** (19 utils) — Concurrency control: `debounce`, `throttle`, `retry`, `delay`, `asyncPool`, `timeout`.
*   **`functional`** (14 utils) — FP primitives: `curry`, `partial`, `pipe`, `compose`, `onceFn`.
*   **`events`** (7 utils) — Pub/Sub emitter: `EventEmitter`, `listen`, `listenOnce`, `delegateEvent`.
*   **`store`** (4 utils) — Micro reactive signals: `signal`, `computed`, `effect`, `createStore`.
*   **`cache`** (2 utils) — TTL caching: `LRUCache`, `memoizeWithTTL`.
*   **`guard`** (12 utils) — Safe parse boundaries: `safeJsonParse`, `safeParseInt`, `invariant`, `attempt`.

### 🛡️ Security & Parsers
*   **`crypto`** (10 utils) — Cryptographic utilities: `uuid`, `sha256`, `sha512`, `hmacSha256`, `generateToken`.
*   **`encoding`** (8 utils) — Fast converters: `utf8Encode`, `utf8Decode`, `hexEncode`, `base64Encode`.
*   **`validate`** (28 utils) — Robust format checks: `isEmail`, `isUrl`, `isUuid`, `isCreditCard`, `isJWT`.
*   **`semver`** (5 utils) — SemVer parser/validator: `semverCompare`, `semverSatisfies`.
*   **`regex`** (1 obj) — Pre-compiled patterns.

### 🌐 Web & Dom
*   **`dom`** (14 utils) — Browser interaction: `copyToClipboard`, `setCookie`, `getCookie`, `createElement`.
*   **`storage`** (1 obj) — SSR-safe storage: `safeStorage` (LocalStorage/SessionStorage with JSON + expiry).
*   **`browser`** (16 utils) — Environment checks: `isBrowser`, `isChrome`, `isMobile`, `isTouchDevice`.
*   **`keyboard`** (2 utils) — Hotkey event handlers: `registerShortcut`, `isKeyPressed`.
*   **`url`** (8 utils) — Safe URL parser & builder: `joinPaths`, `parseUrl`, `buildUrl`.

### 🧮 Math & Science
*   **`math`** (32 utils) — Math operations: `clamp`, `lerp`, `mean`, `median`, `factorial`, `isPrime`, `gcd`.
*   **`statistics`** (12 utils) — Data science math: `variance`, `standardDeviation`, `covariance`, `correlation`.
*   **`geometry`** (9 utils) — Coord geometry: `distance2D`, `midpoint`, `rotatePoint`, `circleArea`.
*   **`units`** (8 utils) — Converter helper: `celsiusToFahrenheit`, `milesToKilometers`.
*   **`color`** (10 utils) — Color convert & contrasts: `hexToRgb`, `rgbToHex`, `rgbToHsl`, `lighten`, `darken`.

### 🛠️ Common Utilities
*   **`types`** (16 utils) — Precise runtime check: `isNil`, `isObject`, `isPromise`, `isDate`.
*   **`format`** (9 utils) — Format helpers: `formatDuration`, `formatPhoneNumber`, `pluralize`.
*   **`schema`** (12 utils) — Simple rule runner: `validateObject`, `required`, `minLength`.
*   **`date`** (20 utils) — Iso-time: `relativeTime`, `formatDate`, `diffInDays`, `addDays`.
*   **`template`** (2 utils) — Simple template engine: `render`, `compile`.
*   **`log`** (2 utils) — Colored ANSI logger: `createLogger`, `ansi`.

---

## 🚀 Code Examples

### 1. Reactive Store (`store`)
Create ultra-lightweight reactive states in just 4 lines of code:
```typescript
import { signal, computed, effect } from '@dev_x_mohit/opti-kit';

const count = signal(0);
const doubleCount = computed(() => count.value * 2);

effect(() => console.log(`Count is: ${count.value}, Double is: ${doubleCount.value}`));
// Log: Count is: 0, Double is: 0

count.value = 5;
// Log: Count is: 5, Double is: 10
```

### 2. Zero-Throw Storage (`storage`)
Work with storage in Next.js / SSR environments without window checks or throwing errors:
```typescript
import { safeStorage } from '@dev_x_mohit/opti-kit';

// Saves with native JSON serialization and an optional 1-minute expiration timer
safeStorage.setItem('session', { userId: 'usr_88', role: 'editor' }, 60000);

// Safely retrieves and parses the object; returns null if expired or missing
const session = safeStorage.getItem('session'); 
```

### 3. Concurrency Pool (`async`)
Limit concurrency when executing large batches of async tasks:
```typescript
import { asyncPool } from '@dev_x_mohit/opti-kit';

const urls = ['/api/1', '/api/2', '/api/3', '/api/4'];
const fetchTask = async (url: string) => fetch(url).then(r => r.json());

// Executes fetch tasks, processing a maximum of 2 requests concurrently
const results = await asyncPool(2, urls, fetchTask);
```

### 4. Deep Merge & Object Flattening (`object`)
```typescript
import { deepMerge, flattenObject } from '@dev_x_mohit/opti-kit';

const merged = deepMerge({ a: { b: 1 } }, { a: { c: 2 } }); 
// { a: { b: 1, c: 2 } }

const flat = flattenObject({ user: { address: { city: 'NYC' } } });
// { 'user.address.city': 'NYC' }
```

---

## 🌐 Showcase & Interactive Sandbox

*   🌐 **Interactive Live Showcase:** [opti-kit-showcase.vercel.app](https://opti-kit-showcase.vercel.app)
*   🛡️ **Socket Security Audit:** [socket.dev/npm/package/@dev_x_mohit/opti-kit](https://socket.dev/npm/package/@dev_x_mohit/opti-kit)
*   ⚡ **Bundlephobia Audit:** [bundlephobia.com/package/@dev_x_mohit/opti-kit](https://bundlephobia.com/package/@dev_x_mohit/opti-kit)

---

## 📄 License

MIT © [Mohit Lakhara](https://mohitlakhara.vercel.app)
