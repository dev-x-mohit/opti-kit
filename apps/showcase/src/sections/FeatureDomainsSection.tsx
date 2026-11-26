import React, { useState } from 'react';
import { Layers, ArrowRight, X, Copy, Check, Code2, Search, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { featureDomainsData, DomainCategory, FunctionDetail } from '../data/featureDomainsData';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { CodeBlock } from '../components/ui/CodeBlock';
import { copyToClipboard } from '../lib/copyToClipboard';

interface FeatureDomainsProps {
  onOpenSearch: () => void;
}

export function FeatureDomainsSection({ onOpenSearch }: FeatureDomainsProps) {
  const [selectedFunction, setSelectedFunction] = useState<FunctionDetail | null>(null);
  const [copiedSignature, setCopiedSignature] = useState(false);

  const handleCopySig = async (sig: string) => {
    const success = await copyToClipboard(sig);
    if (success) {
      setCopiedSignature(true);
      setTimeout(() => setCopiedSignature(false), 1500);
    }
  };

  return (
    <section id="features" className="py-20 border-b border-[var(--border)] bg-[var(--bg)]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex mb-3">
              <Badge variant="primary" icon={<Layers size={13} />}>
                Architectural Foundations
              </Badge>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-[var(--text)]">
              5 Core Utility Domains
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[var(--text-muted)] max-w-xl">
              Every helper is modular and written from scratch in TypeScript, with zero external dependencies.
            </p>
          </div>

          <button
            onClick={onOpenSearch}
            className="self-start md:self-auto flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--primary)] transition-all cursor-pointer shadow-xs"
          >
            <Search size={14} />
            <span>Search all 1,280+ functions</span>
            <kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[var(--surface-2)] border border-[var(--border)]">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureDomainsData.map((domain, idx) => {
            const isFeatured = idx === 0 || idx === 1;

            return (
              <motion.div
                key={domain.id}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.15 }}
                className={idx === 0 ? 'lg:col-span-2' : ''}
              >
                <Card
                  featured={isFeatured}
                  className="p-6 h-full flex flex-col justify-between shadow-xs transition-shadow hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[var(--primary-soft)] text-[var(--primary)]">
                        {domain.functionCount} functions
                      </span>
                      <span className="text-[11px] font-mono text-[var(--text-faint)]">
                        domain 0{idx + 1}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold text-[var(--text)]">
                      {domain.title}
                    </h3>
                    <p className="text-xs font-medium text-[var(--primary)] mt-0.5">
                      {domain.tagline}
                    </p>
                    <p className="text-xs text-[var(--text-muted)] mt-2 leading-relaxed">
                      {domain.description}
                    </p>

                    {/* Function Chips */}
                    <div className="mt-5">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-faint)] mb-2 flex items-center gap-1.5">
                        <Sparkles size={11} className="text-[var(--primary)]" />
                        <span>Interactive Signature Drawer:</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {domain.functions.map((fn) => (
                          <button
                            key={fn.name}
                            onClick={() => setSelectedFunction(fn)}
                            className="px-2.5 py-1 text-xs font-mono rounded-md border border-[var(--border)] bg-[var(--surface-2)] text-[var(--text)] hover:border-[var(--primary)] hover:bg-[var(--primary-soft)] hover:text-[var(--primary)] transition-all cursor-pointer"
                          >
                            {fn.name}()
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Snippet Preview */}
                  <div className="mt-6 pt-4 border-t border-[var(--border)]">
                    <pre className="p-3.5 rounded-lg bg-[var(--bg)] border border-[var(--border)] font-mono text-[11px] text-[var(--text-muted)] overflow-x-auto leading-relaxed">
                      {domain.highlightCode}
                    </pre>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Side Drawer for Function Details */}
        <AnimatePresence>
          {selectedFunction && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity"
              onClick={() => setSelectedFunction(null)}
            >
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="w-full max-w-lg h-full bg-[var(--surface)] border-l border-[var(--border-strong)] p-6 overflow-y-auto shadow-2xl flex flex-col justify-between"
                onClick={(e) => e.stopPropagation()}
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-[var(--border)]">
                    <div className="flex items-center gap-2">
                      <Code2 size={18} className="text-[var(--primary)]" />
                      <span className="font-mono text-base font-semibold text-[var(--text)]">
                        {selectedFunction.name}
                      </span>
                    </div>
                    <button
                      onClick={() => setSelectedFunction(null)}
                      className="p-1.5 rounded-md text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] transition-colors cursor-pointer"
                      aria-label="Close drawer"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="mt-6 space-y-5">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-[var(--text-faint)] block mb-1">
                        TypeScript Signature
                      </label>
                      <div className="flex items-center justify-between p-3 rounded-lg border border-[var(--border)] bg-[var(--bg)] font-mono text-xs text-[var(--primary)] overflow-x-auto">
                        <span>{selectedFunction.signature}</span>
                        <button
                          onClick={() => handleCopySig(selectedFunction.signature)}
                          className="ml-2 text-[var(--text-muted)] hover:text-[var(--text)] shrink-0 cursor-pointer"
                          title="Copy signature"
                        >
                          {copiedSignature ? (
                            <Check size={14} className="text-[var(--success)]" />
                          ) : (
                            <Copy size={14} />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-[var(--text-faint)] block mb-1">
                        Description
                      </label>
                      <p className="text-xs text-[var(--text)] leading-relaxed bg-[var(--surface-2)] p-3 rounded-lg border border-[var(--border)]">
                        {selectedFunction.description}
                      </p>
                    </div>

                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-[var(--text-faint)] block mb-1">
                        Executable Code Example
                      </label>
                      <CodeBlock code={selectedFunction.example} filename={`${selectedFunction.name}.ts`} />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[var(--border)] flex justify-between items-center text-xs text-[var(--text-faint)]">
                  <span>Returns: <code className="font-mono text-[var(--text)] font-semibold">{selectedFunction.returnType}</code></span>
                  <button
                    onClick={() => setSelectedFunction(null)}
                    className="px-3 py-1.5 rounded-lg border border-[var(--border)] text-[var(--text)] hover:bg-[var(--surface-2)] transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
