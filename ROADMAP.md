# OptiKit Roadmap

> **Current state: v1.0.8 — 37 modules, 429 utilities, 418 unit tests**

## Module Status

| Module | Functions | Tests | Status |
| :--- | :---: | :---: | :--- |
| String | 45 | 35 | ✅ Complete |
| Array | 40 | 37 | ✅ Complete |
| Math | 32 | 23 | ✅ Complete |
| Object | 31 | 22 | ✅ Complete |
| Validate | 28 | 21 | ✅ Complete |
| Date | 20 | 14 | ✅ Complete |
| Async | 19 | 17 | ✅ Complete |
| Number | 18 | 18 | ✅ Complete |
| DOM | 14 | 11 | ✅ Complete |
| Crypto | 10 | 10 | ✅ Complete |
| Encoding | 10 | 8 | ✅ Complete |
| Functional | 9 | 10 | ✅ Complete |
| Geometry | 9 | 9 | ✅ Complete |
| URL | 8 | 9 | ✅ Complete |
| Units | 8 | 8 | ✅ Complete |
| Events | 7 | 10 | ✅ Complete |
| Statistics | 6 | 6 | ✅ Complete |
| Types | 5 | 5 | ✅ Complete |
| Random | 5 | 5 | ✅ Complete |
| Collection | 4 | 4 | ✅ Complete |
| Color | 3 | 3 | ✅ Complete |
| Cache | 2 | 4 | ✅ Complete |
| Tree | 2 | 2 | ✅ Complete |
| Regex | 1 obj | 16 | ✅ Complete |
| Storage | 1 obj | 10 | ✅ Complete |
| **Total** | **335** | **317** | |

---

## v1.1 — Deepen Existing Modules

Priority: Expand thin modules to at least 8–10 functions each before adding new modules.

### Collection (4 → 12)
Add: `countBy`, `keyBy`, `sortBy`, `sample`, `sampleSize`, `intersperse`, `mapKeys`, `filterKeys`

### Random (5 → 10)
Add: `randomInt`, `randomString`, `randomDate`, `randomPassword`, `randomElement`

### Types (5 → 12)
Add: `isString`, `isNumber`, `isBoolean`, `isArray`, `isPromise`, `isEmpty`, `isEqual`

### Color (3 → 8)
Add: `rgbToHsl`, `lighten`, `darken`, `isValidColor`, `randomHexColor`

### Statistics (6 → 12)
Add: `correlation`, `skewness`, `kurtosis`, `movingAverage`, `weightedAverage`, `geometricMean`

### Functional (9 → 14)
Add: `constant`, `thunk`, `lazy`, `once`, `trampoline`

---

## v1.2 — New Utility Modules

### Browser Detection (NEW)
`isChrome`, `isFirefox`, `isSafari`, `isEdge`, `isIOS`, `isAndroid`, `isMobile`, `isDesktop`, `isTouchDevice`, `supportsWebGL`, `supportsServiceWorker`, `getDevicePixelRatio`

### Promise Utils (NEW)
`pAll`, `pSettle`, `pFilter`, `pMap`, `pSome`, `pAny`, `pDelay`, `pTimeout`, `pRetry`, `pQueue`

### Format (NEW)
`formatBytes`, `formatDuration`, `formatPhoneNumber`, `formatCreditCard`, `formatPercentage`, `formatListJoin`, `pluralize`, `mask`

---

## v1.3 — Advanced Modules

### JSON Utils (NEW)
`jsonDiff`, `jsonPatch`, `jsonPath`, `jsonFlatten`, `jsonUnflatten`, `safeJsonParse`, `safeJsonStringify`, `jsonMerge`

### Schema Validation (NEW)
Lightweight schema validator: `createSchema`, `validateSchema`, `isRequired`, `isOptional`, `isMinLength`, `isMaxLength`, `isPattern`, `isEnum`

---

## Infrastructure Goals

- [ ] Publish with npm provenance (v1.0.8)
- [ ] Socket.dev score ≥ 95
- [ ] Add `exports` map for per-module imports (`@dev_x_mohit/opti-kit/string`)
- [ ] Generate API documentation from JSDoc
- [ ] Add benchmarks (vs Lodash, Ramda) to showcase site
- [ ] Reach 400+ utilities by v1.2
- [ ] Reach 500+ utilities by v1.3

---

## Long-term Vision

| Milestone | Target |
| :--- | :--- |
| v1.1 | 380+ utilities, all modules ≥ 8 functions |
| v1.2 | 430+ utilities, 3 new modules |
| v1.3 | 500+ utilities, schema validation |
| v2.0 | Per-module tree-shakeable imports, full API docs site |

**Philosophy**: Depth over breadth. Every function must be genuinely useful, well-tested, and zero-dependency. No filler utilities.
