import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useParams, Link, useSearchParams, useNavigate } from 'react-router-dom';
import {
  ChevronRight, Copy, Check, Play, RotateCcw, Star, Terminal, ArrowUpRight, Package,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { utilitiesData } from '../data/utilitiesData';
import * as opti from '@dev_x_mohit/opti-kit';
import { Card } from '../components/ui/Card';
import { generateDummyArgs } from '../lib/moduleMeta';
import { useFavorites } from '../hooks/useFavorites';
import { useBundleCart } from '../hooks/useBundleCart';
import { useToast } from '../components/ui/Toast';
import { copyToClipboard } from '../lib/copyToClipboard';

export function ModuleDetailPage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { hasItem, toggleItem } = useBundleCart();
  const { toast } = useToast();

  const moduleUtils = useMemo(() => {
    if (!moduleId) return [];
    return utilitiesData.filter((u) => u.module.toLowerCase() === moduleId.toLowerCase());
  }, [moduleId]);

  const actualModuleName = moduleUtils.length > 0 ? moduleUtils[0].module : moduleId || '';

  const [selectedUtilityId, setSelectedUtilityId] = useState<string>(() => {
    const u = searchParams.get('u');
    if (u && moduleUtils.some((modU) => modU.id === u)) return u;
    return moduleUtils[0]?.id || '';
  });

  useEffect(() => {
    const u = searchParams.get('u');
    if (u && moduleUtils.some((modU) => modU.id === u)) {
      setSelectedUtilityId(u);
    } else if (moduleUtils.length > 0 && !moduleUtils.some((modU) => modU.id === selectedUtilityId)) {
      setSelectedUtilityId(moduleUtils[0].id);
    }
  }, [searchParams, moduleUtils, selectedUtilityId]);

  const selectedUtility = useMemo(
    () => moduleUtils.find((u) => u.id === selectedUtilityId) || moduleUtils[0],
    [selectedUtilityId, moduleUtils]
  );

  const [importMode, setImportMode] = useState<'esm' | 'subpath' | 'cjs'>('esm');
  const [copiedImport, setCopiedImport] = useState(false);
  const [copiedSignature, setCopiedSignature] = useState(false);
  const [copiedOutput, setCopiedOutput] = useState(false);
  const [inputArgs, setInputArgs] = useState('');
  const [evalResult, setEvalResult] = useState<{ output: string; error: boolean; durationMs: number | null }>({
    output: '',
    error: false,
    durationMs: null,
  });

  const buildDefaultCode = useCallback((utility: (typeof utilitiesData)[0]) => {
    const val = (opti as Record<string, unknown>)[utility.name];
    const isClass = typeof val === 'function' && /^[A-Z]/.test(utility.name);
    const isObject = typeof val === 'object' && val !== null;

    if (isClass) {
      return `const instance = new opti.${utility.name}();\nreturn instance;`;
    }
    if (isObject) {
      return `return opti.${utility.name};`;
    }
    const match = utility.example.match(/\((.*)\)$/);
    const defaultArgs =
      match && match[1] && match[1] !== '...'
        ? match[1]
        : generateDummyArgs(utility.signature, utility.name);
    return `opti.${utility.name}(${defaultArgs})`;
  }, []);

  const runCode = useCallback(async (source: string) => {
    const start = performance.now();
    try {
      let codeToRun = source.trim();
      const needsReturn =
        !codeToRun.includes('return ') &&
        !codeToRun.startsWith('const ') &&
        !codeToRun.startsWith('let ');
      if (needsReturn) {
        codeToRun = `return ${codeToRun}`;
      }

      const logs: string[] = [];
      const fn = new Function(
        'opti',
        'consoleLogs',
        `const console = { log: (...args) => consoleLogs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')) };
         return (async () => { ${codeToRun} })();`
      );
      const result = await fn(opti, logs);
      const durationMs = Number((performance.now() - start).toFixed(2));

      const prefix = logs.length > 0 ? logs.join('\n') + '\n\n' : '';
      let formatted = '';
      if (result === undefined) formatted = 'undefined';
      else if (result === null) formatted = 'null';
      else if (typeof result === 'function') formatted = '[Function]';
      else formatted = JSON.stringify(result, null, 2);

      setEvalResult({ output: prefix + formatted, error: false, durationMs });
    } catch (e: unknown) {
      const durationMs = Number((performance.now() - start).toFixed(2));
      setEvalResult({
        output: e instanceof Error ? e.message : String(e),
        error: true,
        durationMs,
      });
    }
  }, []);

  useEffect(() => {
    if (selectedUtility) {
      const defaultCode = buildDefaultCode(selectedUtility);
      setInputArgs(defaultCode);
      setCopiedImport(false);
      setCopiedSignature(false);
      setCopiedOutput(false);
      void runCode(defaultCode);
    }
  }, [selectedUtility, buildDefaultCode, runCode]);

  const handleCopy = async (text: string, setter: (val: boolean) => void, label = 'Copied to clipboard') => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setter(true);
      toast(label);
      setTimeout(() => setter(false), 1800);
    }
  };

  const importStatement = useMemo(() => {
    if (!selectedUtility) return '';
    const subModule = selectedUtility.module.toLowerCase().replace(/\s+/g, '-');
    if (importMode === 'subpath') {
      return `import { ${selectedUtility.name} } from '@dev_x_mohit/opti-kit/${subModule}';`;
    }
    if (importMode === 'cjs') {
      return `const { ${selectedUtility.name} } = require('@dev_x_mohit/opti-kit');`;
    }
    return `import { ${selectedUtility.name} } from '@dev_x_mohit/opti-kit';`;
  }, [selectedUtility, importMode]);

  const handleOpenInIde = () => {
    if (!selectedUtility) return;
    const snippet = `// Exploring opti.${selectedUtility.name}\nconst result = ${inputArgs.trim()};\nconsole.log(result);\nreturn result;`;
    try {
      localStorage.setItem('optikit-playground-draft', snippet);
    } catch {
      // Ignore storage error
    }
    navigate('/playground');
  };

  if (moduleUtils.length === 0) {
    return (
      <div className="p-10 max-w-4xl mx-auto text-center space-y-4">
        <p className="text-[var(--text-muted)]">Module "{moduleId}" was not found.</p>
        <Link to="/modules" className="text-sm font-medium text-[var(--primary)] hover:underline inline-block">
          Back to Modules Directory
        </Link>
      </div>
    );
  }

  const fav = selectedUtility ? isFavorite(selectedUtility.id) : false;
  const inBundle = selectedUtility ? hasItem(selectedUtility.name) : false;

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto flex flex-col gap-6">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
        <Link to="/modules" className="hover:text-[var(--text)] transition-colors">
          Modules
        </Link>
        <ChevronRight size={13} />
        <Link
          to={`/modules/${actualModuleName.toLowerCase()}`}
          className="hover:text-[var(--text)] transition-colors"
        >
          {actualModuleName}
        </Link>
        {selectedUtility && (
          <>
            <ChevronRight size={13} />
            <span className="font-mono font-semibold text-[var(--text)]">{selectedUtility.name}</span>
          </>
        )}
      </nav>

      {/* Module Header & Utility Quick-Switcher */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text)] tracking-tight">
              {actualModuleName}
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
              {moduleUtils.length} {moduleUtils.length === 1 ? 'utility' : 'utilities'} in this module
            </p>
          </div>
          {selectedUtility && (
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  toggleItem(selectedUtility.name);
                  toast(
                    inBundle
                      ? `Removed ${selectedUtility.name} from Bundle`
                      : `Added ${selectedUtility.name} to Bundle`
                  );
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                  inBundle
                    ? 'border-[var(--primary)]/50 bg-[var(--primary-soft)] text-[var(--primary)]'
                    : 'border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)]'
                }`}
              >
                <Package size={14} />
                <span>{inBundle ? 'In Bundle' : '+ Bundle'}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  toggleFavorite(selectedUtility.id);
                  toast(fav ? `Removed ${selectedUtility.name} from Saved` : `Saved ${selectedUtility.name}`);
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                  fav
                    ? 'border-[var(--warning)]/40 bg-[var(--surface-2)] text-[var(--warning)]'
                    : 'border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)]'
                }`}
              >
                <Star size={14} fill={fav ? 'currentColor' : 'none'} />
                <span>{fav ? 'Saved' : 'Save'}</span>
              </button>
              <button
                type="button"
                onClick={handleOpenInIde}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--border-strong)] transition-colors cursor-pointer"
              >
                <Terminal size={14} />
                <span>Open in IDE</span>
                <ArrowUpRight size={12} />
              </button>
            </div>
          )}
        </div>

        {/* Function Quick-Switcher Pills */}
        {moduleUtils.length > 1 && (
          <div className="flex flex-wrap gap-1.5 pb-1">
            {moduleUtils.map((u) => {
              const active = selectedUtility?.id === u.id;
              return (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => {
                    setSelectedUtilityId(u.id);
                    setSearchParams({ u: u.id });
                  }}
                  className={`px-2.5 py-1 rounded-md font-mono text-xs transition-colors cursor-pointer ${
                    active
                      ? 'bg-[var(--primary)] text-white font-medium'
                      : 'bg-[var(--surface)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--border-strong)]'
                  }`}
                >
                  {u.name}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Selected Utility Details & Runner */}
      {selectedUtility && (
        <motion.div
          key={selectedUtility.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          className="flex flex-col gap-5"
        >
          <Card hoverable={false} className="p-5 sm:p-6 space-y-5">
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-bold font-mono text-[var(--primary)]">
                  {selectedUtility.name}
                </h2>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[var(--primary-soft)] text-[var(--primary)]">
                  {selectedUtility.module}
                </span>
              </div>
              <p className="text-sm text-[var(--text-muted)] mt-2 leading-relaxed">
                {selectedUtility.description}
              </p>
            </div>

            {/* Import Block with ESM / Subpath / CJS tabs */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-faint)]">
                  Import
                </span>
                <div className="flex items-center gap-1">
                  {(['esm', 'subpath', 'cjs'] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setImportMode(mode)}
                      className={`px-2 py-0.5 rounded text-[11px] font-mono uppercase transition-colors cursor-pointer ${
                        importMode === mode
                          ? 'bg-[var(--primary-soft)] text-[var(--primary)] font-semibold'
                          : 'text-[var(--text-faint)] hover:text-[var(--text)]'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
              <div className="relative flex items-center justify-between gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] px-3.5 py-2.5 font-mono text-xs sm:text-sm text-[var(--syntax-string)] overflow-x-auto">
                <code className="whitespace-pre">{importStatement}</code>
                <button
                  type="button"
                  onClick={() => handleCopy(importStatement, setCopiedImport)}
                  aria-label="Copy import statement"
                  className="p-1.5 rounded-md bg-[var(--surface)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors shrink-0 cursor-pointer"
                >
                  {copiedImport ? <Check size={14} className="text-[var(--success)]" /> : <Copy size={14} />}
                </button>
              </div>
            </div>

            {/* Signature */}
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-faint)] mb-1.5">
                TypeScript Signature
              </div>
              <div className="relative flex items-center justify-between gap-2 rounded-lg border border-[var(--border)] bg-[var(--primary-soft)] px-3.5 py-2.5 font-mono text-xs sm:text-sm text-[var(--primary)] overflow-x-auto">
                <code className="whitespace-pre">{selectedUtility.signature}</code>
                <button
                  type="button"
                  onClick={() => handleCopy(selectedUtility.signature, setCopiedSignature)}
                  aria-label="Copy TypeScript signature"
                  className="p-1.5 rounded-md bg-[var(--surface)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors shrink-0 cursor-pointer"
                >
                  {copiedSignature ? <Check size={14} className="text-[var(--success)]" /> : <Copy size={14} />}
                </button>
              </div>
            </div>
          </Card>

          {/* Interactive Live Runner */}
          <Card hoverable={false} className="overflow-hidden">
            <div className="px-4 py-3 border-b border-[var(--border)] bg-[var(--surface-2)]/60 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Play size={15} className="text-[var(--primary)]" />
                <h3 className="text-sm font-semibold text-[var(--text)]">Live Runner</h3>
                {evalResult.durationMs !== null && (
                  <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-[var(--surface)] border border-[var(--border)] text-[var(--text-faint)]">
                    {evalResult.durationMs}ms
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const def = buildDefaultCode(selectedUtility);
                    setInputArgs(def);
                    void runCode(def);
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface)] transition-colors cursor-pointer"
                >
                  <RotateCcw size={13} />
                  <span>Reset</span>
                </button>
                <button
                  type="button"
                  onClick={() => void runCode(inputArgs)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-xs font-medium transition-colors cursor-pointer"
                >
                  <Play size={12} />
                  <span>Run</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
              <div className="p-4 bg-[var(--bg-subtle)] flex flex-col min-h-[180px]">
                <div className="text-[11px] font-mono text-[var(--text-faint)] mb-2 flex items-center justify-between">
                  <span>// Input Expression</span>
                  <span>⌘/Ctrl + Enter</span>
                </div>
                <textarea
                  value={inputArgs}
                  onChange={(e) => setInputArgs(e.target.value)}
                  onKeyDown={(e) => {
                    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                      e.preventDefault();
                      void runCode(inputArgs);
                    }
                  }}
                  aria-label="Live runner input expression"
                  className="w-full flex-1 bg-transparent border-none resize-none focus:outline-none font-mono text-xs sm:text-sm text-[var(--text)] leading-relaxed"
                  spellCheck={false}
                />
              </div>

              <div className="p-4 bg-[var(--surface)] relative flex flex-col min-h-[180px]">
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[11px] font-mono ${
                      evalResult.error ? 'text-[var(--danger)]' : 'text-[var(--success)]'
                    }`}
                  >
                    {evalResult.error ? '// Error' : '// Output'}
                  </span>
                  {!evalResult.error && evalResult.output && (
                    <button
                      type="button"
                      onClick={() => handleCopy(evalResult.output, setCopiedOutput)}
                      aria-label="Copy output"
                      className="p-1 rounded border border-[var(--border)] bg-[var(--surface-2)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors cursor-pointer"
                    >
                      {copiedOutput ? <Check size={13} className="text-[var(--success)]" /> : <Copy size={13} />}
                    </button>
                  )}
                </div>
                <pre
                  className={`font-mono text-xs sm:text-sm flex-1 whitespace-pre-wrap break-words ${
                    evalResult.error ? 'text-[var(--danger)]' : 'text-[var(--text)]'
                  }`}
                >
                  {evalResult.output}
                </pre>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
