export interface ChangelogSection {
  category: 'Core Library' | 'Pro Modules' | 'MCP Server' | 'Showcase';
  items: {
    title: string;
    module?: string;
    detail: string;
  }[];
}

export interface ChangelogRelease {
  version: string;
  date: string;
  tag: 'Latest' | 'Feature' | 'Foundation';
  headline: string;
  summary: string;
  metrics: string[];
  sections: ChangelogSection[];
}

export const changelogData: ChangelogRelease[] = [
  {
    version: '1.4.0',
    date: '2026-11-26',
    tag: 'Latest',
    headline: '535+ new pro-level utilities across 22 specialized modules',
    summary:
      "We've expanded OptiKit from 740+ to 1,280+ exported utilities while keeping runtime dependencies at zero. Every new module ships with strict TypeScript types, full CJS/ESM bundles, and unit tests.",
    metrics: [
      '1,280+ total utilities',
      '108 isomorphic modules',
      '108 test files • 641 tests passing',
      '0 runtime dependencies',
    ],
    sections: [
      {
        category: 'Pro Modules',
        items: [
          {
            title: 'Algebraic Error Handling & Optics',
            module: 'result',
            detail:
              'Added Result<T, E> and Option<T> in result.ts plus immutable Lenses, Prisms, Isos, and Traversals in lens.ts.',
          },
          {
            title: 'State Machines, DI & Workflows',
            module: 'state-machine',
            detail:
              'Added guarded finite state machines with Mermaid export (state-machine.ts), an IoC DI container with scopes (di.ts), and rule engines, feature flags, RBAC policies, and middleware chains (workflow-pro.ts).',
          },
          {
            title: 'Query Engine, Parsers & Intervals',
            module: 'query',
            detail:
              'Added SQL-like joins, window functions, and pivots (query.ts), monadic parser combinators (parser.ts), and sweep-line interval algebra (interval.ts).',
          },
          {
            title: 'Search Indexes & Spatial Geometry',
            module: 'trie',
            detail:
              'Added Prefix Tries, BM25/TF-IDF inverted indexes, and Bloom filters (trie.ts), alongside 2D Quadtrees, Haversine/Vincenty geo math, convex hulls, and Morton codes (spatial.ts).',
          },
          {
            title: 'Pure Crypto, Codecs & Concurrency',
            module: 'crypto-pro',
            detail:
              'Added pure-JS HMAC-SHA256, PBKDF2, HKDF, TOTP/HOTP, JWT parsing, PKCE, SipHash, and xxHash32 (crypto-pro.ts), Varint/TLV/LEB128 codecs (encoding-pro.ts), and circuit breakers, semaphores, mutexes, and call coalescing (scheduler.ts).',
          },
          {
            title: 'Telemetry, Validation & Text Processing',
            module: 'telemetry',
            detail:
              'Added Prometheus metrics, W3C tracing, health checks, and field redaction (telemetry.ts), Luhn/IBAN/ISBN/CIDR/IPv6 validators (validation-pro.ts), and Levenshtein, Jaro-Winkler, Soundex, and PII masking (text-pro.ts).',
          },
          {
            title: 'Reactive Store, Graphs, Statistics, Finance, Color & Dates',
            module: 'reactive-store',
            detail:
              'Added Redux-style slices, entity adapters, and event sourcing (reactive-store.ts), Dijkstra/A*/MaxFlow/PageRank (graph-pro.ts), regressions, t-tests, and ANOVA (statistics-pro.ts), NPV/IRR/Black-Scholes/VaR (finance-pro.ts), OKLab/OKLCH/APCA contrast (color-pro.ts), and ISO 8601 durations and business-day math (datetime-pro.ts).',
          },
        ],
      },
      {
        category: 'Showcase',
        items: [
          {
            title: 'Live Stats & Humanized Copy',
            detail:
              'Updated all showcase metrics to 1,280+ functions across 108 modules, added a dedicated Changelog route, and ran copy through li-human checks.',
          },
        ],
      },
    ],
  },
  {
    version: '1.3.0',
    date: '2026-11-20',
    tag: 'Feature',
    headline: 'Reactive signals, JSON Patch, streams, and 29 MCP tools',
    summary:
      'Introduced fine-grained reactive primitives, RFC 6902 JSON Patch diffing, Zod-style schema inference, and expanded the stdio MCP server for AI coding agents.',
    metrics: [
      '11 new reactive & codec modules',
      '29 registered MCP tools',
      '86 test files • 592 tests passing',
    ],
    sections: [
      {
        category: 'Core Library',
        items: [
          {
            title: 'Signals & Reactive Streams',
            module: 'signals',
            detail:
              'Built zero-dependency signal, computed, effect, batch, and untrack primitives alongside Observable, Subject, and BehaviorSubject.',
          },
          {
            title: 'Structural Diffing & Data-Last FP',
            module: 'diff',
            detail:
              'Added diffObjects, diffArrays, RFC 6902 createJsonPatch/applyJsonPatch, and a composable data-last fp namespace.',
          },
          {
            title: 'Cron, Codecs, Compression & Schema Inference',
            module: 'cron',
            detail:
              'Added 5-field cron scheduling, Base58/62/32 codecs, LZW/RLE/Delta compression, token-bucket rate limiting, and Zod-inspired runtime schema validation.',
          },
        ],
      },
      {
        category: 'MCP Server',
        items: [
          {
            title: 'Expanded Agentic Tooling',
            detail:
              'Added 8 new MCP tools including opti_cron_schedule, opti_codecs, opti_compress_data, opti_diff_objects, opti_json_patch, and opti_rate_limit_calculator.',
          },
        ],
      },
    ],
  },
  {
    version: '1.2.0',
    date: '2026-11-19',
    tag: 'Foundation',
    headline: 'Monorepo launch & 67 foundational modules',
    summary:
      'Restructured OptiKit into an npm workspace monorepo pairing the zero-dependency core package with the MCP server and interactive showcase app.',
    metrics: [
      '740+ core functions',
      '67 foundational modules',
      '21 initial MCP tools',
    ],
    sections: [
      {
        category: 'Core Library',
        items: [
          {
            title: 'Isomorphic Foundation',
            detail:
              'Organized String, Array, Object, Math, Async, Date, Crypto, Validation, Tree, Graph, ML, and Web/DOM helpers into clean, tree-shakeable entry points.',
          },
        ],
      },
      {
        category: 'Showcase',
        items: [
          {
            title: 'Interactive Documentation Launch',
            detail:
              'Shipped the showcase web app with Cmd+K search, live TypeScript playground, and Bundlephobia comparisons.',
          },
        ],
      },
    ],
  },
];
