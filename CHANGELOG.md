# Monorepo Changelog

All notable changes across the **OptiKit Monorepo** (`@dev_x_mohit/opti-kit`, `@dev_x_mohit/opti-kit-mcp`, and `apps/showcase`) are documented here.

---

## [1.3.0] - 2026-11-20

### 📦 Core Library (`@dev_x_mohit/opti-kit`)
- **11 New Modules Added**: `signals`, `diff`, `fp`, `rate-limit`, `checksum`, `pipeline`, `observable`, `cron`, `codec`, `compression`, `schema-infer`.
- **Reactive Streams & Observables (`observable.ts`)**: `Observable<T>`, `Subject<T>`, `BehaviorSubject<T>`, `of`, `from`, `interval`, and stream operators (`mapObservable`, `filterObservable`, `takeObservable`, `debounceTimeObservable`).
- **Cron Parser & Scheduler (`cron.ts`)**: 5-field cron parsing, next run calculation (`getNextCronDate`, `getNextCronDates`), and English description translation (`describeCron`).
- **Multi-Base Codecs & Short ID Engine (`codec.ts`)**: Base58 (Bitcoin), Base62, Base32 (2FA/TOTP), URL-Safe Base64, and `generateShortId`.
- **Zero-Dependency Data Compression (`compression.ts`)**: LZW dictionary text compression, Run-Length Encoding (RLE), and numeric delta encoding/decoding.
- **Runtime Schema Validator & Type Inference (`schema-infer.ts`)**: Zod-inspired builder (`s.string()`, `s.number()`, `s.object()`, etc.) with `.safeParse()` path errors and `Infer<T>` type extraction.
- **Fine-Grained Signals (`signals.ts`)**: Zero-dependency reactive state primitive (`signal`, `computed`, `effect`, `batch`, `untrack`) with automated dependency tracking.
- **Deep Structural Diff & RFC 6902 JSON Patch (`diff.ts`)**: `diffObjects`, `patchObject`, `diffArrays`, `diffWords`, `createJsonPatch`, `applyJsonPatch`.
- **Data-Last Functional API (`fp.ts`)**: Composable `pipe`, `flow`, `curry`, plus curried array/object transforms.
- **Rate Limiting & Concurrency (`rate-limit.ts`)**: `TokenBucket`, `LeakyBucket`, `SlidingWindowRateLimiter`, async `rateLimit`, `ExponentialBackoff`.
- **Hardware-Grade Checksums (`checksum.ts`)**: Table-based `fastCrc32`, Adler-32, FNV-1a (32/64-bit), MurmurHash3.
- **Resilient Workflow Pipeline (`pipeline.ts`)**: Multi-step orchestrator with Saga backward compensation, timeouts, retries, and fallbacks.
- **Unit Test Suite**: **86 test files, 592 tests** with 100% pass rate.

### 🤖 Agentic MCP Server (`@dev_x_mohit/opti-kit-mcp`)
- Expanded to **29 registered MCP stdio tools** for AI agents (Claude Desktop, Cursor, Antigravity, Cline, Windsurf):
  - `opti_cron_schedule`: Evaluates cron schedules, returns upcoming execution dates, and plain-English translation.
  - `opti_codecs`: Encodes/decodes Base58, Base62, Base32, URL-safe Base64, and generates short IDs.
  - `opti_compress_data`: Runs LZW, RLE, or Delta compression on payloads.
  - `opti_diff_objects`: Deep object difference analysis.
  - `opti_json_patch`: RFC 6902 JSON Patch generation and application.
  - `opti_text_diff`: Word-by-word tokenized diffing.
  - `opti_checksum`: Fast deterministic checksums and hashes.
  - `opti_rate_limit_calculator`: Token bucket capacity, refill, and wait-time simulator.

### 🌐 Showcase Application (`apps/showcase`)
- Synchronized `utilitiesData.ts` indexing **771 utilities across 77 modules**.
- Added *Signals, Diff & Reactive FP* domain to [featureDomainsData.ts](file:///c:/Users/cosmo/OneDrive/Desktop/opti-kit/apps/showcase/src/data/featureDomainsData.ts).
- Upgraded Playground and MCP demos with live interactive testing.
- Production build verified (`npm run build:all` succeeded).

---

## [1.2.0] - 2026-11-19

- Monorepo restructuring with npm Workspaces (`packages/opti-kit`, `packages/mcp-server`, `apps/showcase`).
- Expanded utility coverage to 67 modules and 740+ functions.
- Initial release of `@dev_x_mohit/opti-kit-mcp` with 21 core tools.
- Production launch of [opti-kit-showcase.vercel.app](https://opti-kit-showcase.vercel.app).
