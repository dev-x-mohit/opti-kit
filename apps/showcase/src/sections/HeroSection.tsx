import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as opti from '@dev_x_mohit/opti-kit';
import {
  Check, Copy, ArrowRight, ShieldCheck, FileCode2, Scale, Terminal,
  Sparkles, Layers, ArrowUpRight, Zap,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { copyToClipboard } from '../lib/copyToClipboard';
import { InteractiveCanvasGrid } from '../components/ui/InteractiveCanvasGrid';
import { TOTAL_MODULES_COUNT, TOTAL_UTILITIES_COUNT } from '../lib/moduleMeta';
import { useToast } from '../components/ui/Toast';

const installTabs = [
  { name: 'npm', cmd: 'npm install @dev_x_mohit/opti-kit' },
  { name: 'pnpm', cmd: 'pnpm add @dev_x_mohit/opti-kit' },
  { name: 'yarn', cmd: 'yarn add @dev_x_mohit/opti-kit' },
  { name: 'bun', cmd: 'bun add @dev_x_mohit/opti-kit' },
];

interface HeroChip {
  name: string;
  module: string;
  id: string;
  size: string;
  desc: string;
  snippet: string;
  run: () => Promise<string> | string;
}

const interactiveChips: HeroChip[] = [
  {
    name: 'sha256',
    module: 'crypto',
    id: 'sha256',
    size: '~210 B',
    desc: 'WebCrypto SHA-256 digest',
    snippet: "await sha256('opti-kit-2026');",
    run: async () => {
      const hash = await opti.sha256('opti-kit-2026');
      return JSON.stringify(hash);
    },
  },
  {
    name: 'chunk',
    module: 'array',
    id: 'chunk',
    size: '~140 B',
    desc: 'Deterministic array partitioning',
    snippet: 'chunk([1, 2, 3, 4, 5, 6], 2);',
    run: () => JSON.stringify(opti.chunk([1, 2, 3, 4, 5, 6], 2)),
  },
  {
    name: 'uuid',
    module: 'random',
    id: 'uuid',
    size: '~165 B',
    desc: 'RFC 4122 v4 CSPRNG token',
    snippet: 'uuid();',
    run: () => JSON.stringify(opti.uuid()),
  },
  {
    name: 'slugify',
    module: 'string',
    id: 'slugify',
    size: '~150 B',
    desc: 'URL-safe unicode slugifier',
    snippet: "slugify('OptiKit v1.4 - Zero Deps!');",
    run: () => JSON.stringify(opti.slugify('OptiKit v1.4 - Zero Deps!')),
  },
  {
    name: 'signal',
    module: 'signals',
    id: 'signal',
    size: '~240 B',
    desc: 'Fine-grained reactive state',
    snippet: 'const count = signal(21); computed(() => count.value * 2).value;',
    run: () => {
      const count = opti.signal(21);
      const doubled = opti.computed(() => count.value * 2);
      return JSON.stringify({ count: count.value, doubled: doubled.value });
    },
  },
];

export function HeroSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [selectedChip, setSelectedChip] = useState<HeroChip>(interactiveChips[0]);
  const [liveOutput, setLiveOutput] = useState<string>('');
  const [execMs, setExecMs] = useState<number>(0);
  const { toast } = useToast();

  useEffect(() => {
    let active = true;
    const execute = async () => {
      const start = performance.now();
      const out = await selectedChip.run();
      if (active) {
        setLiveOutput(out);
        setExecMs(Number((performance.now() - start).toFixed(2)));
      }
    };
    void execute();
    return () => {
      active = false;
    };
  }, [selectedChip]);

  const handleCopy = async () => {
    const success = await copyToClipboard(installTabs[activeTab].cmd);
    if (success) {
      setCopied(true);
      toast(`Copied ${installTabs[activeTab].name} install command`);
      setTimeout(() => setCopied(false), 1600);
    }
  };

  return (
    <section className="relative overflow-hidden py-14 sm:py-20 lg:py-24 border-b border-[var(--border)] bg-[var(--bg)]">
      {/* Subtle 2D Interactive Grid */}
      <InteractiveCanvasGrid />

      {/* Layered Oil-Slick Radial Glows */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-24 left-1/4 h-[440px] w-[580px] rounded-full bg-[var(--primary)] opacity-[0.09] blur-[110px]" />
        <div className="absolute bottom-0 right-1/5 h-[320px] w-[420px] rounded-full bg-[var(--success)] opacity-[0.06] blur-[100px]" />
      </div>

      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Editorial Value Prop & Install */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            {/* Eyebrow Pills */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border-strong)] bg-[var(--surface)]/80 backdrop-blur-md text-xs font-mono text-[var(--text)] shadow-xs">
                <span className="h-2 w-2 rounded-full bg-[var(--success)] animate-pulse" />
                <span>v1.4.0</span>
                <span className="text-[var(--text-faint)]">•</span>
                <span className="text-[var(--primary)]">{TOTAL_MODULES_COUNT} Modules</span>
              </span>

              <a
                href="https://socket.dev/npm/package/@dev_x_mohit/opti-kit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--success-soft)] text-[var(--success)] text-xs font-medium hover:opacity-90 transition-opacity"
              >
                <ShieldCheck size={13} />
                <span>Socket 100/100</span>
              </a>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-[58px] font-bold tracking-[-0.03em] leading-[1.06] text-[var(--text)]">
              {TOTAL_UTILITIES_COUNT} utilities. 14 KB.{' '}
              <span className="block mt-1 bg-gradient-to-r from-[var(--primary)] via-[#7AA2FF] to-[var(--success)] bg-clip-text text-transparent">
                Zero dependencies.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="mx-auto lg:mx-0 max-w-[56ch] text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
              It's a fast, tree-shakeable TypeScript utility engine with zero runtime dependencies. Swap out Lodash, Ramda, and Moment for one lightweight package, plus an MCP server for AI coding agents.
            </p>

            {/* Sleek Install Terminal */}
            <div className="mx-auto lg:mx-0 max-w-lg rounded-xl border border-[var(--border-strong)] bg-[var(--surface)]/90 backdrop-blur-md p-1.5 shadow-sm">
              <div className="flex items-center justify-between border-b border-[var(--border)]/70 pb-1.5 px-1.5">
                <div className="flex items-center gap-1">
                  {installTabs.map((tab, idx) => (
                    <button
                      key={tab.name}
                      type="button"
                      onClick={() => setActiveTab(idx)}
                      className={`rounded-md px-2.5 py-1 text-xs font-mono transition-colors cursor-pointer ${
                        activeTab === idx
                          ? 'bg-[var(--primary-soft)] text-[var(--primary)] font-semibold'
                          : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                      }`}
                    >
                      {tab.name}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleCopy}
                  aria-label={copied ? 'Command copied' : 'Copy install command'}
                  className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check size={13} className="text-[var(--success)]" />
                      <span className="text-[var(--success)] font-medium">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2.5 px-3 py-2.5 font-mono text-xs sm:text-sm text-[var(--text)] select-all overflow-x-auto">
                <span className="text-[var(--primary)] select-none">$</span>
                <span className="whitespace-nowrap">{installTabs[activeTab].cmd}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
              <Link to="/modules">
                <Button size="md" variant="primary">
                  <Layers size={15} />
                  <span>Explore {TOTAL_UTILITIES_COUNT} Utilities</span>
                  <ArrowRight size={15} />
                </Button>
              </Link>
              <Link to="/playground">
                <Button size="md" variant="secondary">
                  <Terminal size={15} />
                  <span>Open Scripting IDE</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Oil-Slick Interactive Live Kernel Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)]/95 backdrop-blur-xl shadow-2xl overflow-hidden">
              {/* Subtle top accent line */}
              <div className="h-[2px] w-full bg-gradient-to-r from-[var(--primary)] via-[#7AA2FF] to-[var(--success)]" />

              {/* Window Chrome */}
              <div className="px-4 py-3 border-b border-[var(--border)] bg-[var(--surface-2)]/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[var(--danger)]/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[var(--warning)]/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[var(--success)]/70" />
                  </div>
                  <span className="ml-2 font-mono text-[11px] text-[var(--text-muted)]">
                    live-kernel.ts
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] px-2 py-0.5 rounded bg-[var(--primary-soft)] text-[var(--primary)] font-semibold">
                    <Zap size={10} />
                    {selectedChip.size} gzip
                  </span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[var(--surface)] border border-[var(--border)] text-[var(--text-faint)]">
                    {execMs}ms
                  </span>
                </div>
              </div>

              {/* Function Selector Chips */}
              <div className="px-4 pt-3.5 pb-2.5 border-b border-[var(--border)]/60 flex flex-wrap gap-1.5 bg-[var(--bg-subtle)]/50">
                {interactiveChips.map((chip) => {
                  const isSelected = selectedChip.name === chip.name;
                  return (
                    <button
                      key={chip.name}
                      type="button"
                      onClick={() => setSelectedChip(chip)}
                      className={`px-2.5 py-1 rounded-md font-mono text-xs transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[var(--primary)] text-white shadow-xs font-medium'
                          : 'bg-[var(--surface)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--border-strong)]'
                      }`}
                    >
                      {chip.name}()
                    </button>
                  );
                })}
              </div>

              {/* Live Code & Real Output */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedChip.name}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.14 }}
                  className="p-4 space-y-4 font-mono text-xs"
                >
                  <div className="flex items-center justify-between text-[11px] text-[var(--text-faint)]">
                    <span className="inline-flex items-center gap-1.5">
                      <Sparkles size={12} className="text-[var(--primary)]" />
                      {selectedChip.desc}
                    </span>
                    <Link
                      to={`/modules/${selectedChip.module}?u=${selectedChip.id}`}
                      className="inline-flex items-center gap-1 text-[var(--primary)] hover:underline"
                    >
                      <span>Docs</span>
                      <ArrowUpRight size={11} />
                    </Link>
                  </div>

                  <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] p-3.5 overflow-x-auto leading-relaxed">
                    <div>
                      <span className="text-[var(--syntax-keyword)]">import</span>{' '}
                      <span className="text-[var(--syntax-punct)]">{'{'}</span>{' '}
                      <span className="text-[var(--primary)] font-semibold">{selectedChip.name}</span>{' '}
                      <span className="text-[var(--syntax-punct)]">{'}'}</span>{' '}
                      <span className="text-[var(--syntax-keyword)]">from</span>{' '}
                      <span className="text-[var(--syntax-string)]">'@dev_x_mohit/opti-kit'</span>;
                    </div>
                    <div className="mt-2 text-[var(--text)]">{selectedChip.snippet}</div>
                  </div>

                  <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-2)]/50 p-3.5 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="inline-flex items-center gap-1.5 text-[var(--success)] font-medium">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
                        Live Output
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          void (async () => {
                            const start = performance.now();
                            const out = await selectedChip.run();
                            setLiveOutput(out);
                            setExecMs(Number((performance.now() - start).toFixed(2)));
                            toast(`Re-ran opti.${selectedChip.name}()`);
                          })();
                        }}
                        className="text-[var(--text-faint)] hover:text-[var(--text)] transition-colors cursor-pointer"
                      >
                        Re-run ↻
                      </button>
                    </div>
                    <pre className="text-[var(--syntax-string)] whitespace-pre-wrap break-all leading-relaxed">
                      {liveOutput || '...'}
                    </pre>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Verifiable Trust Row */}
        <div className="mt-14 pt-7 border-t border-[var(--border)]/60 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-[var(--text-muted)]">
          <a
            href="https://www.npmjs.com/package/@dev_x_mohit/opti-kit"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-[var(--text)] transition-colors"
          >
            <span className="font-semibold text-[var(--text)]">npm</span> v1.4.0
          </a>
          <span className="text-[var(--border-strong)]">•</span>
          <a
            href="https://bundlephobia.com/package/@dev_x_mohit/opti-kit"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-[var(--text)] transition-colors"
          >
            <span className="font-semibold text-[var(--text)]">14 KB</span> min+gzip
          </a>
          <span className="text-[var(--border-strong)]">•</span>
          <a
            href="https://github.com/dev-x-mohit/opti-kit/blob/main/LICENSE"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-[var(--text)] transition-colors"
          >
            <Scale size={13} /> MIT License
          </a>
          <span className="text-[var(--border-strong)]">•</span>
          <span className="flex items-center gap-1.5">
            <FileCode2 size={13} /> 100% TypeScript
          </span>
          <span className="text-[var(--border-strong)]">•</span>
          <a
            href="https://socket.dev/npm/package/@dev_x_mohit/opti-kit"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[var(--success)] font-medium hover:underline"
          >
            <ShieldCheck size={13} /> Socket 100/100
          </a>
        </div>
      </div>
    </section>
  );
}
