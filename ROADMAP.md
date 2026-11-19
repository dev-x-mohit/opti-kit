# OptiKit Roadmap

> **Current state: v1.2.0 — 38 modules, 740+ utilities, 470+ unit tests**

## Module Status

| Module | Status |
| :--- | :--- |
| String | ✅ Complete |
| Array | ✅ Complete |
| Math | ✅ Complete |
| Object | ✅ Complete |
| Validate | ✅ Complete |
| Date | ✅ Complete |
| Async | ✅ Complete |
| Number | ✅ Complete |
| DOM | ✅ Complete |
| Crypto | ✅ Complete |
| Encoding | ✅ Complete |
| Functional | ✅ Complete |
| Geometry | ✅ Complete |
| URL | ✅ Complete |
| Units | ✅ Complete |
| Events | ✅ Complete |
| Statistics | ✅ Complete |
| Types | ✅ Complete |
| Random | ✅ Complete |
| Collection | ✅ Complete |
| Color | ✅ Complete |
| Cache | ✅ Complete |
| Tree | ✅ Complete |
| Regex | ✅ Complete |
| Storage | ✅ Complete |
| Browser | ✅ Complete |
| Format | ✅ Complete |
| Schema | ✅ Complete |
| JSON | ✅ Complete |
| Set | ✅ Complete |
| Map | ✅ Complete |
| Sort | ✅ Complete |
| Search | ✅ Complete |
| ML | ✅ Complete |
| NLP | ✅ Complete |
| Hash | ✅ Complete |
| Deep | ✅ Complete |
| Image | ✅ Complete |
| Finance | ✅ Complete |
| Signals | ✅ Complete |
| Diff & Patch | ✅ Complete |
| FP (Data-Last) | ✅ Complete |
| Rate Limit | ✅ Complete |
| Checksum | ✅ Complete |
| Pipeline | ✅ Complete |
| Observable (Reactive Streams) | ✅ Complete |
| Cron Parser & Scheduler | ✅ Complete |
| Multi-Base Codecs | ✅ Complete |
| Data Compression | ✅ Complete |
| Schema Inference & Validation | ✅ Complete |

*All foundational and advanced reactive/functional modules are strictly tested and zero-dependency.*

---

## v1.2.0 & v1.3.0 — Completed Milestones

- **Data-last Functional API (`fp.ts`)**: Built composable `pipe`, `flow`, `curry`, `map`, `filter`, `reduce`, `sortBy`, `groupBy`, `prop`, `path`, `pick`, `omit`, `assoc`, `dissoc`.
- **Fine-Grained Signals (`signals.ts`)**: Pure zero-dependency reactive primitives (`signal`, `computed`, `effect`, `batch`, `untrack`) with lazy memoization and clean disposal.
- **Deep Diff & Patch (`diff.ts`)**: Recursive `diffObjects`, `patchObject`, `diffArrays`, `diffWords`, and full RFC 6902 `createJsonPatch` / `applyJsonPatch`.
- **Reactive Streams & Observables (`observable.ts`)**: Zero-dependency `Observable`, `Subject`, `BehaviorSubject`, and stream pipeline operators (`map`, `filter`, `take`, `debounceTime`).
- **Cron Parser & Scheduler (`cron.ts`)**: 5-field cron parsing, next occurrence date calculator (`getNextCronDate`), and plain-English translation (`describeCron`).
- **Multi-Base Codecs (`codec.ts`)**: Bitcoin Base58, Base62, RFC 4648 Base32, URL-safe Base64, and collision-resistant `generateShortId`.
- **Data Compression (`compression.ts`)**: LZW dictionary compression, Run-Length Encoding (RLE), and Delta numeric encoding.
- **Runtime Schema Validator (`schema-infer.ts`)**: Zod-inspired builder (`s.string()`, `s.number()`, `s.object()`, `s.array()`) with `.safeParse()` path reporting and static `Infer<T>` type extraction.
- **Rate Limiting & Concurrency (`rate-limit.ts`)**: Token Bucket, Leaky Bucket, Sliding Window Log limiter, async `rateLimit`, and exponential backoff.
- **Checksums & Non-crypto Hashes (`checksum.ts`)**: High-speed table-lookup IEEE 802.3 `fastCrc32`, Adler-32, FNV-1a (32/64-bit), and MurmurHash3.
- **Resilient Pipelines (`pipeline.ts`)**: Multi-step orchestrator with timeouts, retries, step compensation (Saga pattern rollback), and lifecycle hooks.
- **Agentic MCP Server Expansion**: Expanded stdio MCP tool definitions to 29 tools for AI agents.
- **Full Test Suite Passing**: 86 test files, 592 unit tests with 100% pass rate.

---

## v1.3.0 — Current Priorities

Priority: Infrastructure improvements and advanced functional programming concepts.

### 1. Package Exports
- [ ] Add `exports` map for per-module imports (`@dev_x_mohit/opti-kit/string`).
- [ ] Ensure `tsup` generates individual chunk bundles optimally.

### 2. Lodash Parity & Functional
- [x] Add `vitest bench` comparisons vs Lodash and Ramda.
- [x] Data-last Functional API (`fp.ts`).

### 3. API Documentation
- [x] Generate API documentation from JSDoc using TypeDoc.
- [x] Deploy docs site / integrate with the showcase.

---

## Long-term Vision

| Milestone | Target |
| :--- | :--- |
| v1.2 | Huge Expansion (740+ utils), Benchmarks suite, Auto-generated Docs |
| v1.3 | Full Lodash Parity (100%), Data-last Functional API (`fp.ts`), Rx-style Observables |
| v2.0 | Full ecosystem maturity, framework-specific bindings (React/Vue/Svelte adapters) |

**Philosophy**: Depth over breadth. Every function must be genuinely useful, well-tested, and zero-dependency. No filler utilities.
