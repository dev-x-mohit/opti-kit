import React, { useState } from 'react';
import { ArrowLeftRight, Check, X, Sparkles, Sliders } from 'lucide-react';
import { migrationData, MigrationItem } from '../data/migrationData';
import { Badge } from '../components/ui/Badge';

export function MigrationSection() {
  const [selectedLib, setSelectedLib] = useState<'Lodash' | 'Ramda' | 'Moment'>('Lodash');
  const [splitRatio, setSplitRatio] = useState<number>(50); // 10 to 90

  const activeMigration = migrationData.find((m) => m.library === selectedLib) || migrationData[0];

  return (
    <section className="py-20 border-b border-[var(--border)] bg-[var(--bg-subtle)]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex mb-3">
            <Badge variant="primary" icon={<ArrowLeftRight size={13} />}>
              Drop-In Modernization
            </Badge>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-[var(--text)]">
            Effortless Migration Paths
          </h2>
          <p className="mt-3 max-w-[62ch] mx-auto text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
            Replace legacy heavy monoliths in minutes with equivalent modern functional APIs and automatic tree-shaking.
          </p>
        </div>

        {/* Library Selector Tabs */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-xl border border-[var(--border)] bg-[var(--surface)] p-1.5 shadow-xs">
            {(['Lodash', 'Ramda', 'Moment'] as const).map((lib) => (
              <button
                key={lib}
                onClick={() => setSelectedLib(lib)}
                className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  selectedLib === lib
                    ? 'bg-[var(--primary)] text-white shadow-xs'
                    : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]'
                }`}
              >
                From {lib}
              </button>
            ))}
          </div>
        </div>

        {/* Savings Badge */}
        <div className="text-center mb-8">
          <Badge variant="success" icon={<Sparkles size={13} />}>
            {activeMigration.savings}
          </Badge>
        </div>

        {/* Comparison Code Block Container */}
        <div className="max-w-4xl mx-auto rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-xs overflow-hidden">
          {/* Header Row */}
          <div className="grid grid-cols-2 border-b border-[var(--border)] bg-[var(--surface-2)] text-xs font-mono font-medium text-[var(--text-muted)]">
            <div className="px-4 py-3 border-r border-[var(--border)] flex items-center justify-between">
              <span className="text-[var(--danger)] flex items-center gap-1.5 font-semibold">
                <X size={14} /> {activeMigration.before.title}
              </span>
              <span className="text-[10px] text-[var(--text-faint)]">Legacy Code</span>
            </div>
            <div className="px-4 py-3 flex items-center justify-between">
              <span className="text-[var(--success)] flex items-center gap-1.5 font-semibold">
                <Check size={14} /> {activeMigration.after.title}
              </span>
              <span className="text-[10px] font-semibold text-[var(--primary)]">
                OptiKit Modern
              </span>
            </div>
          </div>

          {/* Code Panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border)] font-mono text-xs overflow-x-auto">
            {/* Before Panel */}
            <div className="p-4 space-y-1.5 bg-[var(--bg)]/40">
              {activeMigration.before.code.map((line, idx) => {
                const isRemoved = activeMigration.before.removedLines.includes(idx + 1);
                return (
                  <div
                    key={idx}
                    className={`px-2 py-0.5 rounded leading-relaxed flex items-start gap-3 transition-colors ${
                      isRemoved
                        ? 'bg-[var(--danger)]/10 text-[var(--danger)] border-l-2 border-[var(--danger)]'
                        : 'text-[var(--text-muted)]'
                    }`}
                  >
                    <span className="select-none text-[var(--text-faint)] text-[10px] w-4 text-right shrink-0">
                      {idx + 1}
                    </span>
                    <span className="whitespace-pre">{line || ' '}</span>
                  </div>
                );
              })}
            </div>

            {/* After Panel */}
            <div className="p-4 space-y-1.5 bg-[var(--bg)]/40">
              {activeMigration.after.code.map((line, idx) => {
                const isAdded = activeMigration.after.addedLines.includes(idx + 1);
                return (
                  <div
                    key={idx}
                    className={`px-2 py-0.5 rounded leading-relaxed flex items-start gap-3 transition-colors ${
                      isAdded
                        ? 'bg-[var(--success)]/10 text-[var(--success)] border-l-2 border-[var(--success)] font-medium'
                        : 'text-[var(--text)]'
                    }`}
                  >
                    <span className="select-none text-[var(--text-faint)] text-[10px] w-4 text-right shrink-0">
                      {idx + 1}
                    </span>
                    <span className="whitespace-pre">{line || ' '}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Split Ratio Controller */}
          <div className="border-t border-[var(--border)] px-4 py-3 bg-[var(--surface-2)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--text-faint)]">
            <span className="text-[var(--text-muted)]">{activeMigration.description}</span>
            <span className="font-mono text-[11px] text-[var(--primary)] font-semibold shrink-0">
              Drop-In Drop-Out Compatible
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
