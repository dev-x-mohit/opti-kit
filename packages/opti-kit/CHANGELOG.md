# Changelog

All notable changes to `@dev_x_mohit/opti-kit` and the OptiKit Monorepo will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.3.0] - 2026-11-20

### 🚀 Major Highlights
- Added **11 new high-value isomorphic modules**: `signals`, `diff`, `fp`, `rate-limit`, `checksum`, `pipeline`, `observable`, `cron`, `codec`, `compression`, and `schema-infer`.
- Expanded total library to **80+ modules** and **770+ pure, zero-dependency functions**.
- Unit test suite expanded to **86 test files** and **592 passing tests** (100% pass rate).
- Agentic MCP Server (`@dev_x_mohit/opti-kit-mcp`) expanded to **29 deterministic tools** for AI agents.

### Added

#### 🌊 Reactive Streams & Rx-style Observables (`observable.ts`)
- `Observable<T>`: Cold reactive data stream with type-safe `.subscribe({ next, error, complete })` and `.pipe()`.
- `Subject<T>`: Multicast event stream acting as both Observer and Observable.
- `BehaviorSubject<T>`: State-retaining Subject that replays current value `.value` to new subscribers.
- Creation methods: `of<T>(...items)`, `from<T>(iterable | Promise)`, `interval(periodMs)`.
- Stream operators: `mapObservable`, `filterObservable`, `takeObservable`, `debounceTimeObservable`.

#### ⏰ Cron Expression Parser & Next-Occurrence Scheduler (`cron.ts`)
- `parseCron(expression)`: Parses 5-field cron syntax into integer sets with support for `*`, `*/step`, ranges `1-5`, lists `1,3`, month aliases, and day aliases.
- `isValidCron(expression)`: Syntax validator for cron schedules.
- `getNextCronDate(expression, fromDate?)`: Computes next exact calendar execution timestamp.
- `getNextCronDates(expression, count, fromDate?)`: Computes upcoming sequence of execution timestamps.
- `describeCron(expression)`: Translates cron expressions into human-readable English descriptions (e.g. "Every 15 minutes", "At 09:00 on Monday through Friday").

#### 🔠 Multi-Base Codecs & Short ID Generator (`codec.ts`)
- `encodeBase58(input)` & `decodeBase58(input)`: Bitcoin Base58 encoding without visual confusion characters (0, O, I, l).
- `encodeBase62(num)` & `decodeBase62(str)`: Alphanumeric base-62 encoding for short URLs and integer encoding.
- `encodeBase32(input)` & `decodeBase32(str)`: RFC 4648 Base32 implementation (standard for 2FA/TOTP authenticator secret keys).
- `generateShortId(length?, alphabet?)`: Cryptographically random, URL-friendly short identifier generator.
- `urlSafeBase64Encode(str)` & `urlSafeBase64Decode(str)`: RFC 4648 §5 URL-Safe Base64 encoding.

#### 🗜️ Zero-Dependency Data Compression (`compression.ts`)
- `compressLZW(text)` & `decompressLZW(codes)`: Lempel-Ziv-Welch dictionary text compression for URL payloads and local storage.
- `compressRLE(text)`: Run-Length Encoding string compressor.
- `deltaEncode(numbers)` & `deltaDecode(deltas)`: Numeric delta difference encoder for time-series and sensor telemetry reduction.

#### 📐 Runtime Schema Validator with Type Inference (`schema-infer.ts`)
- Zero-dependency Zod-inspired schema builder:
  - `s.string()` with `.min()`, `.max()`, `.email()`.
  - `s.number()` with `.min()`, `.max()`, `.int()`.
  - `s.boolean()`, `s.array(itemSchema)`, `s.object(shape)`, `s.enum(values)`.
  - `.optional()`, `.default(val)`.
- `.parse(data)` and `.safeParse(data)` returning typed `{ success: true, data } | { success: false, errors }` with exact property paths.
- Static TypeScript type extraction via `Infer<typeof MySchema>`.

#### ⚡ Reactive Fine-Grained Signals (`signals.ts`)
- `signal<T>(initialValue)`: Fine-grained reactive state container with `.value`, `.peek()`, `.set()`, `.update()`, and `.subscribe()`.
- `computed<T>(getter)`: Lazy-evaluated and memoized derived signal with automatic dependency tracking.
- `effect(fn)`: Auto-tracking side-effect runner with teardown/cleanup callback support and unsubscribe handle.
- `batch<T>(fn)`: Atomic transaction batching so listeners and subscribers fire only once after the batch block finishes.
- `untrack<T>(fn)`: Reads signal values without subscribing the surrounding computation or effect to updates.
- `isSignal(val)`: Type-guard utility for runtime signal detection.

#### 🔄 Deep Structural Diff & RFC 6902 JSON Patch (`diff.ts`)
- `diffObjects(original, updated)`: Recursive deep object diffing returning `added`, `removed`, and `updated` keys with old and new values.
- `patchObject(target, diff)`: Applies an `ObjectDiff` to reconstruct target state.
- `createJsonPatch(original, target)`: Produces RFC 6902 compliant JSON Patch operations (`add`, `remove`, `replace`, `move`, `copy`, `test`) using JSON Pointers (`/path/to/key`).
- `applyJsonPatch(doc, patch)`: Immutable, standards-compliant RFC 6902 JSON Patch applier.
- `diffArrays(arr1, arr2, comparator?)`: Array comparison identifying added, removed, and unchanged elements.
- `diffWords(text1, text2)`: Word-by-word diff engine classifying tokens as `added`, `removed`, or `unchanged`.

#### 🧩 Data-Last Functional Programming Engine (`fp.ts`)
- `pipe(val, ...fns)`: Synchronous pipeline operator passing initial value through functions left-to-right.
- `flow(...fns)`: Left-to-right reusable function composition.
- `compose(...fns)`: Right-to-left function composition.
- `curry(fn)`: Multi-arity auto-currying.
- Curried data-last collection transforms: `map`, `filter`, `reduce`, `find`, `some`, `every`, `take`, `drop`, `compact`, `sortBy`, `groupBy`.
- Curried data-last object transforms: `prop`, `path`, `pick`, `omit`, `assoc`, `dissoc`, `when`, `unless`.
- Combinators: `identity`, `always`, `tap`.

#### ⏱️ Rate Limiting & Concurrency Control (`rate-limit.ts`)
- `TokenBucket`: Classic token bucket rate limiter supporting burst `capacity`, steady `refillRate`, `consume()`, `tryConsume()`, and `timeUntilTokens()`.
- `LeakyBucket`: Leaky bucket rate limiter with steady drain rate and overflow protection.
- `SlidingWindowRateLimiter`: In-memory sliding window log limiter for tracking per-key (IP, user ID) quotas.
- `rateLimit(fn, { limit, intervalMs })`: Wraps async functions with transparent queueing to respect rate limits.
- `ExponentialBackoff`: Configurable exponential backoff delay calculator with randomized jitter.

#### 🛡️ Hardware-Grade Fast Checksums (`checksum.ts`)
- `fastCrc32(input)`: IEEE 802.3 CRC-32 using a precomputed 256-element lookup table for blazing-fast data validation.
- `crc32Hex(input)`: Formats CRC32 as an 8-character lowercase hexadecimal string.
- `adler32(input)` & `adler32Hex(input)`: Standard Adler-32 checksum (RFC 1950 zlib algorithm).
- `fnv1a32(input)` & `fnv1a32Hex(input)`: 32-bit Fowler–Noll–Vo non-cryptographic hash.
- `fnv1a64(input)`: 64-bit FNV-1a hash using native `BigInt`.
- `murmur3(key, seed?)`: 32-bit MurmurHash3 implementation.

#### 🔀 Resilient Workflow Pipeline & Saga Engine (`pipeline.ts`)
- `createPipeline<TContext>()`: Multi-step async workflow orchestrator.
- Configurable per-step execution with `timeoutMs`, `retries`, and fallback handlers.
- Backward Saga compensation rollback: if any step fails, compensation handlers of previous completed steps execute in reverse order.
- Lifecycle hooks: `onStepStart`, `onStepEnd`, `onError`.

#### 🤖 Agentic MCP Server Expansion (`@dev_x_mohit/opti-kit-mcp`)
- Expanded from 21 to **29 registered MCP stdio tools**:
  - `opti_diff_objects`: Deep object comparison returning added, removed, and updated fields.
  - `opti_json_patch`: Generates or applies standard RFC 6902 JSON Patch arrays.
  - `opti_text_diff`: Word-by-word diff analysis for comparing code snippets or prompts.
  - `opti_checksum`: Fast deterministic calculations for CRC32, Adler32, FNV-1a (32/64-bit), and Murmur3.
  - `opti_rate_limit_calculator`: Calculates token bucket throughput, token feasibility, and wait times for API planning.
  - `opti_cron_schedule`: Evaluates cron expressions, computing next runs and human-readable English descriptions.
  - `opti_codecs`: Encodes/decodes Base58, Base62, Base32, URL-safe Base64, and generates short IDs.
  - `opti_compress_data`: Compresses/decompresses payloads using LZW, RLE, or Delta encoding.

### Changed
- Refactored `packages/opti-kit/src/store.ts` to seamlessly leverage `signals.ts` primitives under the hood while maintaining 100% backwards compatibility for `createStore`.
- Updated `packages/opti-kit/src/index.ts` to export all new modules and provide the dedicated `fp` namespace.
- Synchronized `apps/showcase/src/data/utilitiesData.ts` to index **735+ utilities across 72 modules**.
- Added *Signals, Diff & Reactive FP* domain to Showcase landing site.

---

## [1.2.0] - 2026-11-19

### Added
- **Expanded Modules**: Added massive Batch 2 and Batch 3 functional extensions (200+ utilities).
- **New Modules**: Added Set, Map, Sort, ML, NLP, Hash, Deep, FSM, Finance, Easing, etc.
- **Benchmarks**: Added comprehensive Vitest benchmarks suite comparing OptiKit vs Lodash and Ramda.
- **Model Context Protocol (MCP) Server**: Initial release of `@dev_x_mohit/opti-kit-mcp` with 21 registered stdio tools for AI agents (Claude Desktop, Cursor, Antigravity, Cline, Windsurf).
- **Showcase Application**: Full-fledged React 19 + Tailwind CSS v4 + Vite documentation and interactive playground site.

---

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
- Added 13 new utility modules: `guard`, `format`, `schema`, `browser`, `json`, `store`, `csv`, `log`, `ds`, `template`, `keyboard`, and `semver`.
- Reached 429 utilities and 418 unit tests.

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

## [1.0.0] - 2026-07-20

### Added
- Initial release of `@dev_x_mohit/opti-kit` utility monorepo.
- Ships core modules: `string`, `array`, `object`, `math`, `number`, `async`, `validate`, `date`, `dom`, `url`, `regex`, `tree`, `types`, `random`, `collection`.
- Dual CJS (`.js`) and ESM (`.mjs`) builds generated via `tsup`.
