import React, { useState } from 'react';
import { Terminal, Check, Copy, ArrowRight, Layers } from 'lucide-react';
import { quickStartTabs, installManagers } from '../data/quickStartData';
import { Badge } from '../components/ui/Badge';
import { CodeBlock } from '../components/ui/CodeBlock';
import { copyToClipboard } from '../lib/copyToClipboard';

export function QuickStartSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [activePkgManager, setActivePkgManager] = useState(0);
  const [copiedCmd, setCopiedCmd] = useState(false);

  const handleCopyCmd = async () => {
    const success = await copyToClipboard(installManagers[activePkgManager].cmd);
    if (success) {
      setCopiedCmd(true);
      setTimeout(() => setCopiedCmd(false), 1500);
    }
  };

  return (
    <section id="quick-start" className="py-20 border-b border-[var(--border)] bg-[var(--bg)]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex mb-3">
            <Badge variant="primary">Developer Guide</Badge>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-[var(--text)]">
            Production Ready in 3 Steps
          </h2>
          <p className="mt-3 max-w-[62ch] mx-auto text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
            Zero configuration files, zero runtime setups, and zero TypeScript declaration plugins required.
          </p>
        </div>

        {/* 3 Numbered Steps */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Step 1 */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--primary)] text-white text-xs font-mono font-bold">
                1
              </span>
              <h3 className="text-base font-semibold text-[var(--text)]">
                Install @dev_x_mohit/opti-kit
              </h3>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-lg border border-[var(--border)] bg-[var(--bg)]">
              <div className="flex items-center gap-2">
                {installManagers.map((m, idx) => (
                  <button
                    key={m.name}
                    onClick={() => setActivePkgManager(idx)}
                    className={`px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
                      activePkgManager === idx
                        ? 'bg-[var(--primary-soft)] text-[var(--primary)] font-semibold'
                        : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                    }`}
                  >
                    {m.name}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 flex-1 font-mono text-xs text-[var(--text)]">
                <span className="truncate">{installManagers[activePkgManager].cmd}</span>
                <button
                  onClick={handleCopyCmd}
                  className="flex items-center gap-1 text-xs text-[var(--text-muted)] hover:text-[var(--text)] cursor-pointer shrink-0"
                >
                  {copiedCmd ? <Check size={13} className="text-[var(--success)]" /> : <Copy size={13} />}
                  <span>{copiedCmd ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--primary)] text-white text-xs font-mono font-bold">
                  2
                </span>
                <h3 className="text-base font-semibold text-[var(--text)]">
                  Import Utilities Selectively
                </h3>
              </div>

              <div className="flex items-center gap-1 rounded-lg border border-[var(--border)] bg-[var(--surface-2)] p-1">
                {quickStartTabs.map((tab, idx) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(idx)}
                    className={`px-3 py-1 rounded-md text-xs font-mono transition-colors cursor-pointer ${
                      activeTab === idx
                        ? 'bg-[var(--primary)] text-white font-medium shadow-xs'
                        : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <CodeBlock
              code={quickStartTabs[activeTab].code}
              filename={quickStartTabs[activeTab].filename}
              language="typescript"
            />
          </div>

          {/* Step 3 */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-xs">
            <div className="flex items-center gap-3 mb-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--primary)] text-white text-xs font-mono font-bold">
                3
              </span>
              <h3 className="text-base font-semibold text-[var(--text)]">
                Build & Deploy Without Friction
              </h3>
            </div>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed pl-10">
              Run <code className="font-mono text-[var(--text)]">vite build</code>, <code className="font-mono text-[var(--text)]">next build</code>, or <code className="font-mono text-[var(--text)]">tsc</code>. Unused utilities are dropped automatically by your bundler's tree-shaking pass, leaving a tiny, stable footprint in your client bundle.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
