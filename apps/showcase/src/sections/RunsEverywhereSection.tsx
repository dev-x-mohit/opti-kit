import React, { useState } from 'react';
import { Globe, CheckCircle2, Pause, Play } from 'lucide-react';
import { runtimesData, RuntimeItem } from '../data/runtimesData';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export function RunsEverywhereSection() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="py-20 border-b border-[var(--border)] bg-[var(--bg-subtle)]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex mb-3">
            <Badge variant="primary" icon={<Globe size={13} />}>
              Isomorphic Portability
            </Badge>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-[var(--text)]">
            Runs Everywhere JavaScript Executes
          </h2>
          <p className="mt-3 max-w-[62ch] mx-auto text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
            Zero reliance on Node-only internals or browser-only globals. Pure, predictable logic verified on all modern engines.
          </p>
        </div>

        {/* Desktop & Tablet Grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {runtimesData.map((rt) => (
            <Card key={rt.name} className="p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono text-[var(--text-faint)]">
                    {rt.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[var(--success)]">
                    <CheckCircle2 size={12} /> Verified
                  </span>
                </div>

                <h3 className="text-base font-semibold text-[var(--text)]">
                  {rt.name}
                </h3>
                <span className="inline-block mt-1 font-mono text-xs text-[var(--primary)] bg-[var(--primary-soft)] px-2 py-0.5 rounded">
                  {rt.version}
                </span>

                <p className="mt-3 text-xs text-[var(--text-muted)] leading-relaxed">
                  {rt.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--border)] text-[11px] font-mono text-[var(--text-faint)]">
                {rt.badge}
              </div>
            </Card>
          ))}
        </div>

        {/* Mobile Pausable Marquee / Scroll Strip */}
        <div className="sm:hidden space-y-4">
          <div className="flex items-center justify-between px-2 text-xs text-[var(--text-faint)]">
            <span>Supported Runtimes</span>
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="flex items-center gap-1 text-[var(--text-muted)] hover:text-[var(--text)]"
            >
              {isPaused ? <Play size={12} /> : <Pause size={12} />}
              <span>{isPaused ? 'Resume' : 'Pause'}</span>
            </button>
          </div>

          <div className="overflow-x-auto flex gap-4 pb-2 no-scrollbar">
            {runtimesData.map((rt) => (
              <div
                key={rt.name}
                className="w-72 shrink-0 p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-xs"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-mono text-[var(--text-faint)]">{rt.category}</span>
                  <CheckCircle2 size={12} className="text-[var(--success)]" />
                </div>
                <h4 className="text-sm font-semibold text-[var(--text)]">{rt.name}</h4>
                <div className="text-xs font-mono text-[var(--primary)] mt-1">{rt.version}</div>
                <p className="text-xs text-[var(--text-muted)] mt-2 leading-relaxed">{rt.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
