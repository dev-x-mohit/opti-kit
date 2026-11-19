import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X, Code2, ArrowRight, CornerDownLeft, Copy, Check } from 'lucide-react';
import { utilitiesData } from '../../data/utilitiesData';
import { copyToClipboard } from '../../lib/copyToClipboard';

export interface CommandPaletteProps {
  onSelectFunction?: (fnName: string) => void;
}

export function CommandPalette({ onSelectFunction }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedName, setCopiedName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
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
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const filteredResults = useMemo(() => {
    if (!query.trim()) {
      return utilitiesData.slice(0, 10);
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

  const handleSelect = (item: (typeof utilitiesData)[0]) => {
    if (onSelectFunction) {
      onSelectFunction(item.name);
    }
    setIsOpen(false);
  };

  const handleCopy = async (e: React.MouseEvent, text: string, name: string) => {
    e.stopPropagation();
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedName(name);
      setTimeout(() => setCopiedName(null), 1500);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (filteredResults.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredResults.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredResults.length) % filteredResults.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSelect(filteredResults[selectedIndex]);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command search palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-xs transition-opacity duration-150"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
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
            placeholder="Search 740+ functions, modules, algorithms... (e.g. debounce, sha256, tree)"
            className="w-full bg-transparent text-sm text-[var(--text)] placeholder-[var(--text-faint)] outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[var(--text-muted)] hover:text-[var(--text)] p-1 mr-2"
              aria-label="Clear query"
            >
              <X size={16} />
            </button>
          )}
          <span className="font-mono text-[10px] text-[var(--text-faint)] border border-[var(--border)] px-1.5 py-0.5 rounded">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-[var(--border)]/30">
          {filteredResults.length === 0 ? (
            <div className="py-8 text-center text-sm text-[var(--text-muted)]">
              No matching utility found for "{query}".
            </div>
          ) : (
            filteredResults.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={`${item.module}-${item.name}`}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                    isSelected ? 'bg-[var(--surface-2)] text-[var(--text)]' : 'text-[var(--text-muted)]'
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0 pr-2">
                    <div
                      className={`mt-0.5 p-1.5 rounded-md shrink-0 ${
                        isSelected ? 'bg-[var(--primary-soft)] text-[var(--primary)]' : 'bg-[var(--surface-2)] text-[var(--text-muted)]'
                      }`}
                    >
                      <Code2 size={16} />
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
                      onClick={(e) =>
                        handleCopy(
                          e,
                          `import { ${item.name} } from '@dev_x_mohit/opti-kit';`,
                          item.name
                        )
                      }
                      title="Copy import statement"
                      className="p-1 rounded text-[var(--text-faint)] hover:text-[var(--text)] hover:bg-[var(--surface)] transition-colors"
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
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between border-t border-[var(--border)] px-4 py-2 text-[11px] text-[var(--text-faint)] bg-[var(--surface-2)]/50">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="font-mono bg-[var(--surface)] px-1.5 py-0.5 rounded border border-[var(--border)]">↑↓</kbd> Navigate
            </span>
            <span>
              <kbd className="font-mono bg-[var(--surface)] px-1.5 py-0.5 rounded border border-[var(--border)]">↵</kbd> Select
            </span>
          </div>
          <span>740+ verified utilities indexed</span>
        </div>
      </div>
    </div>
  );
}
