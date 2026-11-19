import React, { useState, useMemo } from 'react';
import { Scissors, Check, Sparkles, RotateCcw, Box } from 'lucide-react';
import { sampleTreeShakeFunctions, all67Modules, MONOLITHIC_COMPARISON_BYTES } from '../data/treeShakingData';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export function TreeShakingSection() {
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'fn-debounce',
    'fn-sha256',
    'fn-arrayToTree',
  ]);

  const toggleFunction = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedIds(sampleTreeShakeFunctions.map((f) => f.id));
  };

  const clearAll = () => {
    setSelectedIds([]);
  };

  // Active modules derived from selected functions
  const activeModules = useMemo(() => {
    const modules = new Set<string>();
    sampleTreeShakeFunctions.forEach((f) => {
      if (selectedIds.includes(f.id)) {
        modules.add(f.module);
      }
    });
    return modules;
  }, [selectedIds]);

  // Click on module tile toggles corresponding function
  const toggleModuleTile = (modName: string) => {
    const matchingFunctions = sampleTreeShakeFunctions.filter((f) => f.module === modName);
    if (matchingFunctions.length === 0) return;

    const allMatchingSelected = matchingFunctions.every((f) => selectedIds.includes(f.id));
    if (allMatchingSelected) {
      // Deselect them
      const matchIds = new Set(matchingFunctions.map((f) => f.id));
      setSelectedIds((prev) => prev.filter((id) => !matchIds.has(id)));
    } else {
      // Select them
      const newIds = new Set([...selectedIds, ...matchingFunctions.map((f) => f.id)]);
      setSelectedIds(Array.from(newIds));
    }
  };

  // Total bytes calculated
  const totalBytes = useMemo(() => {
    return sampleTreeShakeFunctions.reduce((acc, f) => {
      return selectedIds.includes(f.id) ? acc + f.sizeBytes : acc;
    }, 0);
  }, [selectedIds]);

  const totalKb = (totalBytes / 1024).toFixed(2);
  const percentageSaved = Math.max(
    0,
    Math.round(((MONOLITHIC_COMPARISON_BYTES - totalBytes) / MONOLITHIC_COMPARISON_BYTES) * 100)
  );

  return (
    <section id="tree-shaking" className="py-20 border-b border-[var(--border)] bg-[var(--bg)]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex mb-3">
            <Badge variant="primary" icon={<Scissors size={13} />}>
              sideEffects: false
            </Badge>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-[var(--text)]">
            Dead-Code Elimination in Action
          </h2>
          <p className="mt-3 max-w-[62ch] mx-auto text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
            Select utilities below or click directly on module tiles. Watch your production bundle size update live in real-time.
          </p>
        </div>

        {/* Live Size & Savings Meter Card */}
        <div className="max-w-4xl mx-auto rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 mb-8 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
            <div className="pt-2 md:pt-0">
              <span className="text-xs text-[var(--text-muted)] font-mono">Active Functions</span>
              <div className="text-3xl font-mono font-bold text-[var(--text)] mt-1">
                {selectedIds.length} <span className="text-sm font-sans text-[var(--text-faint)]">/ {sampleTreeShakeFunctions.length}</span>
              </div>
            </div>

            <div className="pt-4 md:pt-0">
              <span className="text-xs text-[var(--primary)] font-mono font-semibold">Bundled JS Footprint</span>
              <div className="text-3xl font-mono font-bold text-[var(--primary)] mt-1">
                {totalKb} KB <span className="text-sm font-sans text-[var(--text-faint)]">({totalBytes} B)</span>
              </div>
            </div>

            <div className="pt-4 md:pt-0">
              <span className="text-xs text-[var(--success)] font-mono font-semibold">Eliminated Dead Code</span>
              <div className="text-3xl font-mono font-bold text-[var(--success)] mt-1">
                {percentageSaved}% <span className="text-xs font-sans text-[var(--text-faint)]">saved</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main interactive grid: Left function picker / Right 67 module tiles */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Function Selector List */}
          <div className="lg:col-span-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text)]">
                Select Functions:
              </span>
              <div className="flex items-center gap-2 text-xs">
                <button
                  onClick={selectAll}
                  className="text-[var(--primary)] font-medium hover:underline cursor-pointer"
                >
                  Select All
                </button>
                <span className="text-[var(--text-faint)]">•</span>
                <button
                  onClick={clearAll}
                  className="text-[var(--text-muted)] hover:text-[var(--text)] cursor-pointer"
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
              {sampleTreeShakeFunctions.map((fn) => {
                const isSelected = selectedIds.includes(fn.id);
                return (
                  <div
                    key={fn.id}
                    onClick={() => toggleFunction(fn.id)}
                    className={`flex items-start gap-2.5 p-2 rounded-lg border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[var(--primary)] bg-[var(--primary-soft)] text-[var(--text)] shadow-xs'
                        : 'border-[var(--border)] bg-[var(--surface-2)]/50 text-[var(--text-muted)] hover:border-[var(--border-strong)]'
                    }`}
                  >
                    <div
                      className={`mt-0.5 h-4 w-4 rounded shrink-0 flex items-center justify-center border transition-all ${
                        isSelected
                          ? 'border-[var(--primary)] bg-[var(--primary)] text-white'
                          : 'border-[var(--border-strong)] bg-transparent'
                      }`}
                    >
                      {isSelected && <Check size={11} strokeWidth={3} />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-xs font-semibold text-[var(--text)] truncate">
                          {fn.name}()
                        </span>
                        <span className="font-mono text-[10px] text-[var(--text-faint)]">
                          ~{fn.sizeBytes} B
                        </span>
                      </div>
                      <p className="text-[11px] text-[var(--text-faint)] truncate mt-0.5">
                        {fn.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 67 Module Grid Visualization */}
          <div className="lg:col-span-7 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border)] mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text)]">
                  67 Modules Grid (Click any tile to toggle):
                </span>
                <span className="font-mono text-xs text-[var(--primary)] font-semibold">
                  {activeModules.size} active
                </span>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5">
                {all67Modules.map((modName) => {
                  const isActive = activeModules.has(modName);
                  return (
                    <button
                      key={modName}
                      onClick={() => toggleModuleTile(modName)}
                      title={`Module: ${modName} (Click to toggle)`}
                      className={`py-2 px-1 rounded-md text-center font-mono text-[10px] transition-all truncate border cursor-pointer ${
                        isActive
                          ? 'border-[var(--primary)] bg-[var(--primary)] text-white font-semibold shadow-xs scale-102'
                          : 'border-[var(--border)]/40 bg-[var(--surface-2)] text-[var(--text-faint)] opacity-60 hover:opacity-100 hover:border-[var(--border-strong)]'
                      }`}
                    >
                      {modName}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[var(--border)] flex items-center justify-between text-[11px] text-[var(--text-faint)]">
              <span>Unused modules produce 0 bytes in your final production build</span>
              <span className="font-mono text-[var(--primary)] font-semibold">ESM Tree-Shaking</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
