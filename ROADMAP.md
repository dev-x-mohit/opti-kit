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

*All foundational modules are now strictly tested and zero-dependency.*

---

## v1.2.0 — Completed Milestone

- **Expanded Modules**: Added massive Batch 2 and Batch 3 functional extensions (200+ utilities).
- **New Modules**: Added Set, Map, Sort, ML, NLP, Hash, Deep, FSM, Finance, Easing, etc.
- **Benchmarks**: Added comprehensive Vitest benchmarks.
- **Infrastructure**: Achieved 100/100 Socket.dev score, published with npm provenance.

---

## v1.3.0 — Current Priorities

Priority: Infrastructure improvements and advanced functional programming concepts.

### 1. Package Exports
- [ ] Add `exports` map for per-module imports (`@dev_x_mohit/opti-kit/string`).
- [ ] Ensure `tsup` generates individual chunk bundles optimally.

### 2. Lodash Parity & Functional
- [x] Add `vitest bench` comparisons vs Lodash and Ramda.
- [ ] Data-last Functional API (`fp.ts`).

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
