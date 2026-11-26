import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, X, Code2, CornerDownLeft, Copy, Check, Layers, Terminal,
  BookOpen, Gauge, Package, SunMoon,
} from 'lucide-react';
import { utilitiesData } from '../../data/utilitiesData';
import { TOTAL_UTILITIES_COUNT } from '../../lib/moduleMeta';
import { copyToClipboard } from '../../lib/copyToClipboard';
import { useToast } from './Toast';

export interface CommandPaletteProps {
  onSelectFunction?: (fnName: string) => void;
  onOpenBundle?: () => void;
  onToggleTheme?: () => void;
}

interface QuickAction {
  id: string;
  label: string;
  description: string;
  path?: string;
  action?: 'bundle' | 'theme';
  icon: React.ComponentType<{ size?: number | string }>;
}

const baseActions: QuickAction[] = [
  { id: 'route-modules', label: 'Browse All Modules', description: 'Explore all modules, categories, and live examples', path: '/modules', icon: Layers },
  { id: 'route-playground', label: 'Open Scripting IDE', description: 'Run multi-line TypeScript/JS snippets with live console', path: '/playground', icon: Terminal },
  { id: 'route-docs', label: 'Read Documentation', description: 'Installation, tree-shaking, safeStorage, and MCP setup', path: '/docs', icon: BookOpen },
  { id: 'route-benchmarks', label: 'View Benchmarks', description: 'Compare OptiKit vs Lodash & run live browser benchmarks', path: '/benchmarks', icon: Gauge },
  { id: 'action-bundle', label: 'Open Bundle Manifest', description: 'Calculate tree-shaken import footprint', action: 'bundle', icon: Package },
  { id: 'action-theme', label: 'Toggle Color Theme', description: 'Switch between light and dark developer themes', action: 'theme', icon: SunMoon },
];

export function CommandPalette({ onSelectFunction, onOpenBundle, onToggleTheme }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedName, setCopiedName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 40);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const filteredActions = useMemo(() => {
    if (!query.trim()) return baseActions;
    const lower = query.toLowerCase().trim();
    return baseActions.filter(
      (r) =>
        r.label.toLowerCase().includes(lower) ||
        r.description.toLowerCase().includes(lower)
    );
  }, [query]);

  const filteredUtils = useMemo(() => {
    if (!query.trim()) {
      return utilitiesData.slice(0, 8);
    }
    const lower = query.toLowerCase().trim();
    return utilitiesData
      .filter(
        (u) =>
          u.name.toLowerCase().includes(lower) ||
          u.module.toLowerCase().includes(lower) ||
          u.description.toLowerCase().includes(lower)
      )
      .slice(0, 15);
  }, [query]);

  const totalItems = filteredActions.length + filteredUtils.length;

  const handleSelectUtil = (item: (typeof utilitiesData)[0]) => {
    if (onSelectFunction) {
      onSelectFunction(item.name);
    } else {
      navigate(`/modules/${item.module.toLowerCase()}?u=${item.id}`);
    }
    setIsOpen(false);
  };

  const handleSelectAction = (act: QuickAction) => {
    if (act.path) {
      navigate(act.path);
    } else if (act.action === 'bundle') {
      onOpenBundle?.();
    } else if (act.action === 'theme') {
      onToggleTheme?.();
    }
    setIsOpen(false);
  };

  const handleCopy = async (e: React.MouseEvent, text: string, name: string) => {
    e.stopPropagation();
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedName(name);
      toast(`Copied import for ${name}`);
      setTimeout(() => setCopiedName(null), 1500);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (totalItems === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % totalItems);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + totalItems) % totalItems);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex < filteredActions.length) {
        handleSelectAction(filteredActions[selectedIndex]);
      } else {
        const util = filteredUtils[selectedIndex - filteredActions.length];
        if (util) handleSelectUtil(util);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command search palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 px-4 bg-black/60 backdrop-blur-xs transition-opacity duration-150"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex items-center border-b border-[var(--border)] px-4 py-3">
          <Search size={18} className="text-[var(--text-muted)] shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder={`Search ${TOTAL_UTILITIES_COUNT} functions, actions, or pages...`}
            className="w-full bg-transparent text-sm text-[var(--text)] placeholder-[var(--text-faint)] outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-[var(--text-muted)] hover:text-[var(--text)] p-1 mr-2 cursor-pointer"
              aria-label="Clear query"
            >
              <X size={16} />
            </button>
          )}
          <span className="font-mono text-[10px] text-[var(--text-faint)] border border-[var(--border)] px-1.5 py-0.5 rounded">
            ESC
          </span>
        </div>

        <div className="max-h-96 overflow-y-auto p-2 space-y-2">
          {totalItems === 0 ? (
            <div className="py-8 text-center text-sm text-[var(--text-muted)]">
              No matching utility or action found for "{query}".
            </div>
          ) : (
            <>
              {filteredActions.length > 0 && (
                <div>
                  <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-[var(--text-faint)]">
                    Actions & Pages
                  </div>
                  <div className="space-y-0.5">
                    {filteredActions.map((act, idx) => {
                      const Icon = act.icon;
                      const isSelected = idx === selectedIndex;
                      return (
                        <button
                          key={act.id}
                          type="button"
                          onClick={() => handleSelectAction(act)}
                          onMouseEnter={() => setSelectedIndex(idx)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-[var(--surface-2)] text-[var(--text)]'
                              : 'text-[var(--text-muted)] hover:bg-[var(--surface-2)]/50'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div
                              className={`p-1.5 rounded-md shrink-0 ${
                                isSelected
                                  ? 'bg-[var(--primary-soft)] text-[var(--primary)]'
                                  : 'bg-[var(--surface-2)] text-[var(--text-muted)]'
                              }`}
                            >
                              <Icon size={15} />
                            </div>
                            <div className="min-w-0">
                              <div className="text-sm font-medium text-[var(--text)] truncate">
                                {act.label}
                              </div>
                              <div className="text-xs text-[var(--text-muted)] truncate">
                                {act.description}
                              </div>
                            </div>
                          </div>
                          {isSelected && (
                            <CornerDownLeft size={14} className="text-[var(--primary)] shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {filteredUtils.length > 0 && (
                <div>
                  <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-[var(--text-faint)]">
                    Utilities
                  </div>
                  <div className="space-y-0.5">
                    {filteredUtils.map((item, uIdx) => {
                      const globalIdx = filteredActions.length + uIdx;
                      const isSelected = globalIdx === selectedIndex;
                      return (
                        <div
                          key={`${item.module}-${item.id}`}
                          onClick={() => handleSelectUtil(item)}
                          onMouseEnter={() => setSelectedIndex(globalIdx)}
                          className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
                            isSelected ? 'bg-[var(--surface-2)] text-[var(--text)]' : 'text-[var(--text-muted)]'
                          }`}
                        >
                          <div className="flex items-start gap-3 min-w-0 pr-2">
                            <div
                              className={`mt-0.5 p-1.5 rounded-md shrink-0 ${
                                isSelected
                                  ? 'bg-[var(--primary-soft)] text-[var(--primary)]'
                                  : 'bg-[var(--surface-2)] text-[var(--text-muted)]'
                              }`}
                            >
                              <Code2 size={15} />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-sm font-semibold text-[var(--text)] truncate">
                                  {item.name}
                                </span>
                                <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text-faint)]">
                                  {item.module}
                                </span>
                              </div>
                              <p className="text-xs text-[var(--text-muted)] truncate max-w-md mt-0.5">
                                {item.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={(e) =>
                                handleCopy(
                                  e,
                                  `import { ${item.name} } from '@dev_x_mohit/opti-kit';`,
                                  item.name
                                )
                              }
                              title="Copy import statement"
                              aria-label={`Copy import for ${item.name}`}
                              className="p-1.5 rounded text-[var(--text-faint)] hover:text-[var(--text)] hover:bg-[var(--surface)] transition-colors cursor-pointer"
                            >
                              {copiedName === item.name ? (
                                <Check size={14} className="text-[var(--success)]" />
                              ) : (
                                <Copy size={14} />
                              )}
                            </button>
                            {isSelected && (
                              <CornerDownLeft size={14} className="text-[var(--primary)]" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-[var(--border)] px-4 py-2 text-[11px] text-[var(--text-faint)] bg-[var(--surface-2)]/50">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="font-mono bg-[var(--surface)] px-1.5 py-0.5 rounded border border-[var(--border)]">↑↓</kbd> Navigate
            </span>
            <span>
              <kbd className="font-mono bg-[var(--surface)] px-1.5 py-0.5 rounded border border-[var(--border)]">↵</kbd> Open
            </span>
          </div>
          <span>{TOTAL_UTILITIES_COUNT} verified utilities indexed</span>
        </div>
      </div>
    </div>
  );
}
