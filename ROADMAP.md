# OptiKit Roadmap

> **Current state: v1.1.0 — 38 modules, 450+ utilities, 420+ unit tests**

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

*All foundational modules are now strictly tested and zero-dependency.*

---

## v1.1.0 — Completed Milestone

- **Expanded Modules**: Added extensive functions to `Collection`, `Random`, `Types`, `Color`, `Statistics`, and `Functional` modules.
- **New Modules**: Implemented `Browser Detection`, `Promise Utils` (in Async), `Format`, `JSON Utils`, and `Schema Validation`.
- **Infrastructure**: Achieved 100/100 Socket.dev score, published with npm provenance.

---

## v1.2.0 — Current Priorities

Priority: Infrastructure improvements and advanced functional programming concepts.

### 1. Package Exports
- [ ] Add `exports` map for per-module imports (`@dev_x_mohit/opti-kit/string`).
- [ ] Ensure `tsup` generates individual chunk bundles optimally.

### 2. Benchmarks & Lodash Parity
- [x] Add `vitest bench` comparisons vs Lodash and Ramda.
- [x] Incorporate benchmark results and combined stats into the showcase site.
- [x] Create comprehensive Lodash functionality mapping (`lodash_comparison.md`).
- [x] Implement highest-priority missing Lodash array functions (`dropWhile`, `unionBy`, `xorWith`, etc.).

### 3. API Documentation
- [ ] Generate API documentation from JSDoc using TypeDoc.
- [ ] Deploy docs site / integrate with the showcase.

---

## Long-term Vision

| Milestone | Target |
| :--- | :--- |
| v1.2 | Per-module exports, Benchmarks suite, Initial Lodash Parity, Auto-generated Docs |
| v1.3 | Full Lodash Parity (100%), Data-last Functional API (`fp.ts`), Rx-style Observables |
| v2.0 | Full ecosystem maturity, framework-specific bindings (React/Vue/Svelte adapters) |

**Philosophy**: Depth over breadth. Every function must be genuinely useful, well-tested, and zero-dependency. No filler utilities.
