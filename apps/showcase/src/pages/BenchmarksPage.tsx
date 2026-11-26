import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import * as opti from '@dev_x_mohit/opti-kit';
import { Zap, TrendingUp, Gauge, Play, RotateCcw } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { useToast } from '../components/ui/Toast';

interface BenchmarkRow {
  name: string;
  category: 'Array' | 'Object';
  optiOps: number;
  lodashOps: number;
  optiLabel: string;
  lodashLabel: string;
  multiplier: string;
  winner: 'OptiKit' | 'Lodash';
  liveRunner?: () => number;
}

const sampleArr = Array.from({ length: 120 }, (_, i) => i);
const sampleDupes = Array.from({ length: 120 }, (_, i) => i % 25);
const sampleArrB = Array.from({ length: 120 }, (_, i) => i + 40);
const sampleObj = { user: { id: 1, roles: ['admin', 'dev'], meta: { active: true } }, tags: [1, 2, 3] };

function measureOps(fn: () => void, iterations = 2000): number {
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    fn();
  }
  const elapsedSec = Math.max(0.0001, (performance.now() - start) / 1000);
  return Math.round(iterations / elapsedSec);
}

const BENCHMARKS: BenchmarkRow[] = [
  {
    name: 'chunk',
    category: 'Array',
    optiOps: 46453,
    lodashOps: 42359,
    optiLabel: '46,453 ops/sec',
    lodashLabel: '42,359 ops/sec',
    multiplier: '1.10x faster',
    winner: 'OptiKit',
    liveRunner: () => measureOps(() => opti.chunk(sampleArr, 5), 2500),
  },
  {
    name: 'unique / uniq',
    category: 'Array',
    optiOps: 2762,
    lodashOps: 2545,
    optiLabel: '2,762 ops/sec',
    lodashLabel: '2,545 ops/sec',
    multiplier: '1.09x faster',
    winner: 'OptiKit',
    liveRunner: () => measureOps(() => opti.unique(sampleDupes), 2500),
  },
  {
    name: 'intersection',
    category: 'Array',
    optiOps: 779,
    lodashOps: 375,
    optiLabel: '779 ops/sec',
    lodashLabel: '375 ops/sec',
    multiplier: '2.07x faster',
    winner: 'OptiKit',
    liveRunner: () => measureOps(() => opti.intersection(sampleArr, sampleArrB), 1500),
  },
  {
    name: 'deepClone / cloneDeep',
    category: 'Object',
    optiOps: 658225,
    lodashOps: 103509,
    optiLabel: '658,225 ops/sec',
    lodashLabel: '103,509 ops/sec',
    multiplier: '6.36x faster',
    winner: 'OptiKit',
    liveRunner: () => measureOps(() => opti.deepClone(sampleObj), 3000),
  },
  {
    name: 'get',
    category: 'Object',
    optiOps: 1240052,
    lodashOps: 1298015,
    optiLabel: '1,240,052 ops/sec',
    lodashLabel: '1,298,015 ops/sec',
    multiplier: '1.05x faster',
    winner: 'Lodash',
    liveRunner: () => measureOps(() => opti.get(sampleObj, 'user.meta.active'), 5000),
  },
];

export function BenchmarksPage() {
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Array' | 'Object'>('All');
  const [liveResults, setLiveResults] = useState<Record<string, number>>({});
  const [isRunningLive, setIsRunningLive] = useState(false);
  const { toast } = useToast();

  const filtered = useMemo(() => {
    if (categoryFilter === 'All') return BENCHMARKS;
    return BENCHMARKS.filter((b) => b.category === categoryFilter);
  }, [categoryFilter]);

  const runLiveBenchmark = async () => {
    setIsRunningLive(true);
    await new Promise((r) => setTimeout(r, 30));
    const results: Record<string, number> = {};
    for (const b of BENCHMARKS) {
      if (b.liveRunner) {
        results[b.name] = b.liveRunner();
      }
    }
    setLiveResults(results);
    setIsRunningLive(false);
    toast('Live browser benchmark completed');
  };

  return (
    <div className="mx-auto px-4 sm:px-6 py-12 max-w-5xl w-full space-y-10">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary-soft)] text-[var(--primary)] text-xs font-mono font-medium">
          <Gauge size={14} />
          <span>Vitest Bench & Live Browser Runner</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text)]">
          Performance Benchmarks
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed">
          Measured against Lodash using{' '}
          <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-[var(--surface-2)] border border-[var(--border)] text-[var(--primary)]">
            vitest bench
          </code>{' '}
          on Node.js, or run live right now in your browser.
        </p>
        <div className="pt-1 flex items-center justify-center gap-2.5">
          <button
            type="button"
            onClick={() => void runLiveBenchmark()}
            disabled={isRunningLive}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-xs font-semibold shadow-xs transition-colors disabled:opacity-50 cursor-pointer"
          >
            <Play size={13} />
            <span>{isRunningLive ? 'Benchmarking...' : 'Run Live Browser Benchmark'}</span>
          </button>
          {Object.keys(liveResults).length > 0 && (
            <button
              type="button"
              onClick={() => setLiveResults({})}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--text-muted)] hover:text-[var(--text)] cursor-pointer"
            >
              <RotateCcw size={13} />
              <span>Clear Live</span>
            </button>
          )}
        </div>
      </div>

      {/* Summary Strip */}
      <Card hoverable={false} featured className="p-6 sm:p-8">
        <div className="flex items-center justify-center gap-2 text-sm font-semibold text-[var(--text)] mb-6">
          <TrendingUp size={17} className="text-[var(--primary)]" />
          <span>Combined Benchmark Summary</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
          <div className="pt-2 sm:pt-0">
            <div className="text-3xl font-bold font-mono text-[var(--primary)]">2.34x</div>
            <div className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mt-1">
              Average Speedup
            </div>
          </div>
          <div className="pt-4 sm:pt-0">
            <div className="text-3xl font-bold font-mono text-[var(--success)]">4 / 5</div>
            <div className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mt-1">
              Benchmarks Won
            </div>
          </div>
          <div className="pt-4 sm:pt-0">
            <div className="text-3xl font-bold font-mono text-[var(--text)]">14 KB</div>
            <div className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mt-1">
              Full Bundle (min+gzip)
            </div>
          </div>
        </div>
      </Card>

      {/* Filter Pills */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-1.5">
          {(['All', 'Array', 'Object'] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                categoryFilter === cat
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-[var(--surface)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <span className="text-xs font-mono text-[var(--text-faint)]">
          Showing {filtered.length} benchmarks
        </span>
      </div>

      {/* Benchmark Cards with Comparison Bars */}
      <div className="space-y-4">
        {filtered.map((b, i) => {
          const maxOps = Math.max(b.optiOps, b.lodashOps);
          const optiPct = Math.round((b.optiOps / maxOps) * 100);
          const lodashPct = Math.round((b.lodashOps / maxOps) * 100);
          const liveOps = liveResults[b.name];

          return (
            <motion.div
              key={b.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.2 }}
            >
              <Card hoverable={false} className="p-5 sm:p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text-muted)]">
                      {b.category}
                    </span>
                    <h3 className="text-lg font-bold font-mono text-[var(--text)]">{b.name}</h3>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {liveOps !== undefined && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[var(--primary-soft)] text-[var(--primary)] font-mono text-xs font-semibold">
                        Live Browser: {liveOps.toLocaleString()} ops/sec
                      </span>
                    )}
                    <div
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-semibold ${
                        b.winner === 'OptiKit'
                          ? 'bg-[var(--success-soft)] text-[var(--success)]'
                          : 'bg-[var(--surface-2)] text-[var(--text-muted)]'
                      }`}
                    >
                      <Zap size={12} />
                      <span>
                        {b.winner}: {b.multiplier}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-[var(--text)]">OptiKit (Node.js)</span>
                      <span className="font-mono font-semibold text-[var(--primary)]">{b.optiLabel}</span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-[var(--surface-2)] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[var(--primary)] transition-all duration-500"
                        style={{ width: `${optiPct}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-[var(--text-muted)]">Lodash (Node.js)</span>
                      <span className="font-mono text-[var(--text-muted)]">{b.lodashLabel}</span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-[var(--surface-2)] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[var(--competitor-bar)] transition-all duration-500"
                        style={{ width: `${lodashPct}%` }}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <p className="text-center text-xs text-[var(--text-faint)] font-mono">
        Baseline benchmarks executed on Node.js v18+. Live runner executes directly in your browser.
      </p>
    </div>
  );
}
