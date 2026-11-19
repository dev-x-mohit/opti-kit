import React, { useState } from 'react';
import { Check, Copy, ArrowRight, ShieldCheck, FileCode2, Scale, Terminal, Play, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { copyToClipboard } from '../lib/copyToClipboard';
import { InteractiveCanvasGrid } from '../components/ui/InteractiveCanvasGrid';

const installTabs = [
  { name: 'npm', cmd: 'npm install @dev_x_mohit/opti-kit' },
  { name: 'pnpm', cmd: 'pnpm add @dev_x_mohit/opti-kit' },
  { name: 'yarn', cmd: 'yarn add @dev_x_mohit/opti-kit' },
  { name: 'bun', cmd: 'bun add @dev_x_mohit/opti-kit' },
];

const interactiveChips = [
  {
    name: 'debounce',
    desc: 'Postpones execution until quiet window expires',
    snippet: "const debounced = debounce(fetchResults, 300);",
    output: "Function debounced (waits 300ms)",
  },
  {
    name: 'sha256',
    desc: 'Hardware-accelerated cryptographic SHA-256 digest',
    snippet: "await sha256('production-key-2026');",
    output: "'5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'",
  },
  {
    name: 'arrayToTree',
    desc: 'Transforms relational ID lists into recursive trees',
    snippet: "arrayToTree([{ id: 1, parentId: null }, { id: 2, parentId: 1 }]);",
    output: "[{ id: 1, children: [{ id: 2, children: [] }] }]",
  },
  {
    name: 'uuid',
    desc: 'Cryptographically secure RFC 4122 v4 token generator',
    snippet: "uuid();",
    output: "'f47ac10b-58cc-4372-a567-0e02b2c3d479'",
  },
  {
    name: 'signal',
    desc: 'Fine-grained reactive state primitive with dependency tracking',
    snippet: "const count = signal(0); const double = computed(() => count.value * 2);",
    output: "Signal { value: 0 } -> Computed { value: 0 }",
  },
];

export function HeroSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [selectedChip, setSelectedChip] = useState(interactiveChips[0]);

  const handleCopy = async () => {
    const success = await copyToClipboard(installTabs[activeTab].cmd);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <section className="relative overflow-hidden py-16 sm:py-24 border-b border-[var(--border)] bg-[var(--bg)]">
      {/* 2D Interactive Particle Grid Canvas */}
      <InteractiveCanvasGrid />

      {/* Subtle radial primary glow behind hero */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="h-[480px] w-[640px] rounded-full bg-[var(--primary)] opacity-[0.06] blur-[90px]" />
      </div>

      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 text-center">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 mb-6">
          <Badge variant="primary">
            <span className="font-mono">v1.2.1 Released</span>
            <span className="opacity-40">•</span>
            <span>Dual ESM + CJS</span>
          </Badge>
          <a
            href="https://socket.dev/npm/package/@dev_x_mohit/opti-kit"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex"
          >
            <Badge variant="success" icon={<ShieldCheck size={13} />}>
              Socket 100/100 Health
            </Badge>
          </a>
        </div>

        {/* Clear trustworthy headline */}
        <h1 className="mx-auto max-w-4xl text-3xl sm:text-5xl md:text-[56px] font-semibold tracking-[-0.02em] leading-[1.1] text-[var(--text)]">
          740+ utilities. 14 KB. <br className="hidden sm:inline" />
          <span className="text-[var(--primary)]">Zero dependencies.</span>
        </h1>

        {/* Concise subheadline */}
        <p className="mx-auto mt-5 max-w-[62ch] text-base sm:text-lg text-[var(--text-muted)] leading-relaxed font-normal">
          The ultra-lightweight, tree-shakeable utility engine for TypeScript and
          JavaScript. A modern drop-in replacement for Lodash, Ramda, and Moment with
          built-in MCP tool support for AI agents.
        </p>

        {/* Tabbed Install Command Box */}
        <div className="mx-auto mt-8 max-w-lg rounded-xl border border-[var(--border)] bg-[var(--surface)] p-2 shadow-xs transition-all hover:border-[var(--border-strong)]">
          <div className="flex items-center justify-between border-b border-[var(--border)]/60 pb-2 px-1">
            <div className="flex items-center gap-1">
              {installTabs.map((tab, idx) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(idx)}
                  className={`rounded-md px-2.5 py-1 text-xs font-mono transition-colors cursor-pointer ${
                    activeTab === idx
                      ? 'bg-[var(--primary-soft)] text-[var(--primary)] font-medium'
                      : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            <button
              onClick={handleCopy}
              aria-label={copied ? 'Command copied' : 'Copy install command'}
              className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] transition-colors cursor-pointer"
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

          <div className="flex items-center gap-3 px-3 py-2.5 font-mono text-xs sm:text-sm text-[var(--text)] select-all overflow-x-auto">
            <span className="text-[var(--text-faint)] select-none">$</span>
            <span className="whitespace-nowrap">{installTabs[activeTab].cmd}</span>
          </div>
        </div>

        {/* Primary and secondary CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <a href="#playground">
            <Button size="md" variant="primary">
              Open Interactive Playground <ArrowRight size={16} />
            </Button>
          </a>
          <a
            href="https://github.com/dev-x-mohit/opti-kit"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="md" variant="secondary">
              View on GitHub
            </Button>
          </a>
        </div>

        {/* Draggable 2D Chips with Interactive Live Preview */}
        <div className="mx-auto mt-10 max-w-2xl">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-faint)] mb-2">
            Try clicking or dragging pure function chips:
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {interactiveChips.map((chip) => {
              const isSelected = selectedChip.name === chip.name;
              return (
                <motion.button
                  key={chip.name}
                  drag
                  dragConstraints={{ left: -30, right: 30, top: -15, bottom: 15 }}
                  dragElastic={0.2}
                  onClick={() => setSelectedChip(chip)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-all cursor-grab active:cursor-grabbing ${
                    isSelected
                      ? 'border-[var(--primary)] bg-[var(--primary-soft)] text-[var(--primary)] shadow-xs'
                      : 'border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:border-[var(--border-strong)] hover:text-[var(--text)]'
                  }`}
                >
                  {chip.name}()
                </motion.button>
              );
            })}
          </div>

          {/* Interactive Live Snippet Box */}
          <AnimatePresence mode="wait">
            {selectedChip && (
              <motion.div
                key={selectedChip.name}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                className="mt-4 mx-auto max-w-lg rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 text-left font-mono text-xs shadow-xs"
              >
                <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]/60 text-[11px] text-[var(--text-faint)]">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[var(--primary)] animate-pulse" />
                    <span>opti.{selectedChip.name}</span>
                  </span>
                  <span>{selectedChip.desc}</span>
                </div>

                <div className="py-2 text-[var(--text)] overflow-x-auto whitespace-pre">
                  <span className="text-[var(--syntax-keyword)]">import</span>{' '}
                  <span className="text-[var(--syntax-punct)]">{'{'}</span>{' '}
                  <span className="text-[var(--primary)]">{selectedChip.name}</span>{' '}
                  <span className="text-[var(--syntax-punct)]">{'}'}</span>{' '}
                  <span className="text-[var(--syntax-keyword)]">from</span>{' '}
                  <span className="text-[var(--syntax-string)]">'@dev_x_mohit/opti-kit'</span>;
                  <br />
                  <span className="text-[var(--text-muted)]">{selectedChip.snippet}</span>
                </div>

                <div className="pt-2 border-t border-[var(--border)]/60 flex items-center justify-between text-[11px]">
                  <span className="text-[var(--success)] font-medium flex items-center gap-1">
                    <Check size={12} /> Output:
                  </span>
                  <span className="text-[var(--text-muted)] font-mono truncate max-w-xs">
                    {selectedChip.output}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Verifiable Trust Row */}
        <div className="mt-12 pt-8 border-t border-[var(--border)]/60 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-[var(--text-muted)]">
          <a
            href="https://www.npmjs.com/package/@dev_x_mohit/opti-kit"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-[var(--text)] transition-colors"
          >
            <span className="font-semibold text-[var(--text)]">npm</span> v1.2.1
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
