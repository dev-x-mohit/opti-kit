import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Package, X, Copy, Trash2, Terminal, Sparkles } from 'lucide-react';
import { useBundleCart } from '../../hooks/useBundleCart';
import { useToast } from './Toast';
import { copyToClipboard } from '../../lib/copyToClipboard';

interface BundleDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BundleDrawer({ isOpen, onClose }: BundleDrawerProps) {
  const { items, removeItem, clearItems, estimatedBytes, legacyBaselineBytes } = useBundleCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const importLine =
    items.length > 0
      ? `import { ${items.join(', ')} } from '@dev_x_mohit/opti-kit';`
      : `// Add utilities from the Modules directory`;

  const savingsPct =
    legacyBaselineBytes > 0
      ? Math.max(0, Math.min(99.9, ((legacyBaselineBytes - estimatedBytes) / legacyBaselineBytes) * 100)).toFixed(1)
      : '0';

  const handleCopyImport = async () => {
    if (items.length === 0) return;
    const ok = await copyToClipboard(importLine);
    if (ok) toast('Tree-shaken import copied to clipboard');
  };

  const handleOpenInIde = () => {
    if (items.length === 0) return;
    const snippet = `// Custom Bundle Manifest (${items.length} utilities)\n// ${importLine}\n\nconsole.log("Loaded:", ${JSON.stringify(items)});\nreturn { utilities: ${JSON.stringify(items)}, estimatedGzipBytes: ${estimatedBytes} };`;
    try {
      localStorage.setItem('optikit-playground-draft', snippet);
    } catch {
      // Ignore storage error
    }
    onClose();
    navigate('/playground');
    toast('Loaded bundle manifest into Scripting IDE', 'info');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/55 backdrop-blur-xs"
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Tree-Shaking Bundle Estimator"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="relative z-10 w-full max-w-md bg-[var(--surface)] border-l border-[var(--border)] h-full flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-[var(--border)] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-[var(--primary-soft)] text-[var(--primary)]">
                  <Package size={17} />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-[var(--text)]">
                    Bundle Manifest
                  </h2>
                  <p className="text-[11px] text-[var(--text-muted)]">
                    Live tree-shaken footprint estimator
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close bundle drawer"
                className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] cursor-pointer"
              >
                <X size={17} />
              </button>
            </div>

            {/* Footprint Summary */}
            <div className="p-5 border-b border-[var(--border)] bg-[var(--bg-subtle)] space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-faint)]">
                    Estimated Min + Gzip
                  </div>
                  <div className="text-2xl font-bold font-mono text-[var(--primary)] mt-0.5">
                    {estimatedBytes < 1024
                      ? `${estimatedBytes} B`
                      : `${(estimatedBytes / 1024).toFixed(2)} KB`}
                  </div>
                </div>
                {items.length > 0 && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[var(--success-soft)] text-[var(--success)] font-mono text-xs font-semibold">
                    <Sparkles size={12} />
                    {savingsPct}% smaller
                  </span>
                )}
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] text-[var(--text-muted)]">
                  <span>OptiKit (tree-shaken)</span>
                  <span className="font-mono">{estimatedBytes} B</span>
                </div>
                <div className="h-2 rounded-full bg-[var(--surface-2)] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[var(--primary)] transition-all duration-300"
                    style={{
                      width:
                        items.length === 0
                          ? '0%'
                          : `${Math.max(3, Math.min(100, (estimatedBytes / legacyBaselineBytes) * 100))}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-[var(--text-faint)]">
                  <span>Legacy monolithic bundle</span>
                  <span className="font-mono">71.6 KB</span>
                </div>
              </div>
            </div>

            {/* Selected Utilities */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[var(--text)]">
                  Selected Utilities ({items.length})
                </span>
                {items.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      clearItems();
                      toast('Cleared bundle manifest', 'info');
                    }}
                    className="inline-flex items-center gap-1 text-xs text-[var(--text-faint)] hover:text-[var(--danger)] transition-colors cursor-pointer"
                  >
                    <Trash2 size={12} />
                    <span>Clear all</span>
                  </button>
                )}
              </div>

              {items.length === 0 ? (
                <div className="py-12 text-center rounded-xl border border-dashed border-[var(--border)] bg-[var(--bg-subtle)]/50 px-4">
                  <Package size={24} className="mx-auto text-[var(--text-faint)] mb-2" />
                  <p className="text-xs font-medium text-[var(--text)]">Your bundle manifest is empty</p>
                  <p className="text-[11px] text-[var(--text-muted)] mt-1">
                    Click "+ Bundle" on any utility in Modules to calculate your exact tree-shaken import size.
                  </p>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {items.map((name) => (
                    <span
                      key={name}
                      className="inline-flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 rounded-lg border border-[var(--border)] bg-[var(--bg)] font-mono text-xs text-[var(--text)]"
                    >
                      <span>{name}</span>
                      <button
                        type="button"
                        onClick={() => removeItem(name)}
                        aria-label={`Remove ${name} from bundle`}
                        className="p-0.5 rounded text-[var(--text-faint)] hover:text-[var(--danger)] cursor-pointer"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Generated Import */}
              <div className="space-y-1.5 pt-2">
                <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-faint)]">
                  Generated Import
                </div>
                <pre className="p-3 rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] font-mono text-xs text-[var(--syntax-string)] whitespace-pre-wrap break-all">
                  {importLine}
                </pre>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-[var(--border)] bg-[var(--surface-2)]/40 flex items-center gap-2.5">
              <button
                type="button"
                onClick={handleCopyImport}
                disabled={items.length === 0}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-xs font-semibold transition-colors disabled:opacity-40 cursor-pointer"
              >
                <Copy size={13} />
                <span>Copy Import</span>
              </button>
              <button
                type="button"
                onClick={handleOpenInIde}
                disabled={items.length === 0}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] hover:bg-[var(--surface-2)] text-[var(--text)] text-xs font-medium transition-colors disabled:opacity-40 cursor-pointer"
              >
                <Terminal size={13} />
                <span>Test in IDE</span>
              </button>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
