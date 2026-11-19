import React, { useState } from 'react';
import { ExternalLink, Layers, CheckCircle2, AlertCircle } from 'lucide-react';
import { bundleComparisonData, bundleMethodology } from '../data/bundleComparisonData';
import { Badge } from '../components/ui/Badge';

export function BundleComparisonSection() {
  const [mode, setMode] = useState<'full' | 'single'>('full');

  const maxGzip = mode === 'full' ? 75 : 75; // Normalize scale up to 75 KB

  return (
    <section id="compare" className="py-20 border-b border-[var(--border)] bg-[var(--bg-subtle)]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex mb-3">
            <Badge variant="primary">Verifiable Benchmarks</Badge>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-[var(--text)]">
            Bundle Impact & Dependency Footprint
          </h2>
          <p className="mt-3 max-w-[62ch] mx-auto text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
            Real production weights measured minified and gzip-compressed. Backed by public Bundlephobia statistics.
          </p>
        </div>

        {/* Toggle between Full Library and Single Import */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border border-[var(--border)] bg-[var(--surface)] p-1">
            <button
              onClick={() => setMode('full')}
              className={`px-4 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                mode === 'full'
                  ? 'bg-[var(--primary)] text-white shadow-xs'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              Full Library (All Modules)
            </button>
            <button
              onClick={() => setMode('single')}
              className={`px-4 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                mode === 'single'
                  ? 'bg-[var(--primary)] text-white shadow-xs'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              Single Import (Tree-Shaken)
            </button>
          </div>
        </div>

        {/* Comparison Bars */}
        <div className="max-w-3xl mx-auto space-y-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-xs">
          <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-[var(--text-faint)] pb-2 border-b border-[var(--border)]">
            <span>Package Name</span>
            <span>{mode === 'full' ? 'Total Min + Gzip' : 'Single Method Footprint'}</span>
          </div>

          <div className="space-y-4">
            {bundleComparisonData.map((lib) => {
              const value = mode === 'full' ? lib.fullGzipKb : lib.singleImportGzipKb;
              const barPercent = Math.max((value / maxGzip) * 100, 3);

              return (
                <div key={lib.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <div className="flex items-center gap-2">
                      <span className={`font-semibold ${lib.isOptiKit ? 'text-[var(--primary)]' : 'text-[var(--text)]'}`}>
                        {lib.name}
                      </span>
                      <span className="text-xs text-[var(--text-faint)] font-mono">
                        v{lib.version}
                      </span>
                      {lib.isOptiKit && (
                        <Badge variant="primary" className="py-0.5 text-[10px]">
                          0.3 KB Single
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-semibold text-[var(--text)]">
                        {value.toFixed(1)} KB
                      </span>
                      <a
                        href={lib.bundlephobiaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--text-faint)] hover:text-[var(--text)] transition-colors"
                        title={`Verify ${lib.name} on Bundlephobia`}
                      >
                        <ExternalLink size={13} />
                      </a>
                    </div>
                  </div>

                  {/* Horizontal Bar */}
                  <div className="h-3 w-full rounded-full bg-[var(--surface-2)] overflow-hidden border border-[var(--border)]/40">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        lib.isOptiKit
                          ? 'bg-[var(--primary)]'
                          : lib.isHeaviest
                          ? 'bg-[var(--danger)]/80'
                          : 'bg-[var(--competitor-bar)]'
                      }`}
                      style={{ width: `${barPercent}%` }}
                    />
                  </div>

                  <p className="text-[11px] text-[var(--text-muted)]">{lib.notes}</p>
                </div>
              );
            })}
          </div>

          {/* Dependencies Count Comparison Grid */}
          <div className="mt-8 pt-6 border-t border-[var(--border)]">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-faint)] mb-3">
              Runtime Dependency Overhead:
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              {bundleComparisonData.map((lib) => (
                <div
                  key={lib.name}
                  className={`p-3 rounded-lg border ${
                    lib.isOptiKit
                      ? 'border-[var(--success)]/40 bg-[var(--success-soft)]'
                      : 'border-[var(--border)] bg-[var(--surface-2)]'
                  }`}
                >
                  <span className="text-xs text-[var(--text-muted)] block truncate">{lib.name}</span>
                  <div
                    className={`text-lg font-mono font-bold mt-0.5 ${
                      lib.isOptiKit ? 'text-[var(--success)]' : 'text-[var(--text)]'
                    }`}
                  >
                    {lib.dependencyCount} deps
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Honest Methodology Footnote */}
          <div className="mt-6 pt-4 border-t border-[var(--border)]/60 text-xs text-[var(--text-faint)] flex items-start gap-2">
            <CheckCircle2 size={14} className="text-[var(--primary)] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Methodology:</strong> {bundleMethodology.footnote}{' '}
              <a
                href="https://bundlephobia.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[var(--text)]"
              >
                Inspect data on Bundlephobia
              </a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
