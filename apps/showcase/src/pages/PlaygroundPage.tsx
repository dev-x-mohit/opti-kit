import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import * as opti from '@dev_x_mohit/opti-kit';
import {
  Play, Code2, Terminal, RotateCcw, Copy, Check, Trash2, Sparkles, Clock, Share2, History,
} from 'lucide-react';
import { utilitiesData } from '../data/utilitiesData';
import { generateDummyArgs } from '../lib/moduleMeta';
import { copyToClipboard } from '../lib/copyToClipboard';
import { useToast } from '../components/ui/Toast';

const DRAFT_KEY = 'optikit-playground-draft';

interface RunHistoryItem {
  id: number;
  time: string;
  durationMs: number;
  error: boolean;
  code: string;
}

const DEFAULT_SNIPPET = `// Welcome to the OptiKit Scripting IDE!
// The 'opti' namespace is pre-loaded with all utilities.

const arr = [1, 2, 3, 4, 5, 6, 7];
const chunks = opti.chunk(arr, 3);
const shuffled = chunks.map(c => opti.shuffle(c));

console.log("Generated", chunks.length, "chunks");

return {
  originalLength: arr.length,
  chunkedResult: shuffled,
  uuid: opti.uuid()
};`;

const RECIPES: Array<{ label: string; code: string }> = [
  {
    label: 'Reactive Signals',
    code: `// Fine-grained reactive signals & computed values
const price = opti.signal(29);
const qty = opti.signal(3);
const total = opti.computed(() => price.value * qty.value);

console.log("Initial total:", total.value);
qty.value = 5;
console.log("Updated total:", total.value);

return { price: price.value, qty: qty.value, total: total.value };`,
  },
  {
    label: 'Deep Diff & Patch',
    code: `// Structural deep diff & RFC 6902 patch
const before = { user: { name: "Ada", role: "viewer" }, tags: ["ts", "js"] };
const after = { user: { name: "Ada", role: "admin" }, tags: ["ts", "js", "mcp"] };

const patch = opti.diff(before, after);
console.log("Diff operations:", patch.length);

return { before, after, patch };`,
  },
  {
    label: 'Crypto & Codecs',
    code: `// WebCrypto SHA-256 + UUID
const payload = "opti-kit-2026";
const digest = await opti.sha256(payload);
const token = opti.uuid();

console.log("SHA-256 computed");
return { payload, digest, token };`,
  },
  {
    label: 'Compression (RLE)',
    code: `// Zero-dependency RLE compression
const raw = "AAAAABBBBBCCCCCDDDDDDEEEEE";
const compressed = opti.rleEncode(raw);
const restored = opti.rleDecode(compressed);

return {
  rawLength: raw.length,
  compressed,
  compressedLength: compressed.length,
  roundTripMatch: raw === restored
};`,
  },
];

function encodeSnippet(str: string): string {
  try {
    const bytes = new TextEncoder().encode(str);
    let bin = '';
    bytes.forEach((b) => (bin += String.fromCharCode(b)));
    return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  } catch {
    return '';
  }
}

function decodeSnippet(encoded: string): string | null {
  try {
    const pad = encoded.replace(/-/g, '+').replace(/_/g, '/');
    const bin = atob(pad);
    const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  } catch {
    return null;
  }
}

export function PlaygroundPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();

  const [code, setCode] = useState<string>(() => {
    const shared = searchParams.get('s');
    if (shared) {
      const decoded = decodeSnippet(shared);
      if (decoded) return decoded;
    }
    if (typeof window === 'undefined') return DEFAULT_SNIPPET;
    try {
      return localStorage.getItem(DRAFT_KEY) || DEFAULT_SNIPPET;
    } catch {
      return DEFAULT_SNIPPET;
    }
  });

  const [selectedFunc, setSelectedFunc] = useState('');
  const [output, setOutput] = useState('');
  const [hasError, setHasError] = useState(false);
  const [durationMs, setDurationMs] = useState<number | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [copiedOutput, setCopiedOutput] = useState(false);
  const [history, setHistory] = useState<RunHistoryItem[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_KEY, code);
    } catch {
      // Ignore storage quota errors
    }
  }, [code]);

  const generateSnippet = (name: string, signature: string) => {
    const val = (opti as Record<string, unknown>)[name];
    const isClass = typeof val === 'function' && /^[A-Z]/.test(name);
    const isObject = typeof val === 'object' && val !== null;

    if (isClass) {
      return `// Testing class opti.${name}\nconst instance = new opti.${name}();\n\nconsole.log("Instance created:", instance);\nreturn instance;`;
    }
    if (isObject) {
      return `// Testing object opti.${name}\nconsole.log("Keys:", Object.keys(opti.${name}));\nreturn opti.${name};`;
    }
    if (name === 'delay') {
      return `console.log("Waiting 400ms...");\nawait opti.delay(400);\nconsole.log("Done!");\nreturn true;`;
    }
    if (name === 'debounce' || name === 'throttle') {
      return `let count = 0;\nconst fn = opti.${name}(() => {\n  count++;\n  console.log("Fired! Count:", count);\n}, 100);\n\nfn(); fn(); fn();\nawait new Promise(r => setTimeout(r, 150));\nreturn { finalCount: count };`;
    }

    const args = generateDummyArgs(signature, name);
    return `// Testing opti.${name}\nconst result = opti.${name}(${args});\n\nconsole.log("Result:", result);\nreturn result;`;
  };

  const handleSelectUtility = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedFunc(val);
    if (!val) {
      setCode(DEFAULT_SNIPPET);
      return;
    }
    const meta = utilitiesData.find((u) => u.id === val);
    if (meta) {
      setCode(generateSnippet(meta.name, meta.signature));
      setOutput('');
      setHasError(false);
      setDurationMs(null);
    }
  };

  const executeCode = useCallback(async () => {
    setIsExecuting(true);
    setHasError(false);
    setOutput('Executing...');

    await new Promise((r) => setTimeout(r, 20));
    const start = performance.now();

    try {
      const logs: string[] = [];
      const fn = new Function(
        'opti',
        'consoleLogs',
        `
        const console = {
          log: (...args) => consoleLogs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')),
          warn: (...args) => consoleLogs.push('[warn] ' + args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')),
          error: (...args) => consoleLogs.push('[error] ' + args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '))
        };
        return (async () => {
          ${code}
        })();
      `
      );

      const result = await fn(opti, logs);
      const elapsed = Number((performance.now() - start).toFixed(2));
      setDurationMs(elapsed);

      const prefix = logs.length > 0 ? logs.join('\n') + '\n\n' : '';
      if (result === undefined) {
        setOutput(prefix + 'Executed successfully (no return value).');
      } else {
        setOutput(prefix + JSON.stringify(result, null, 2));
      }

      setHistory((prev) => [
        {
          id: Date.now(),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          durationMs: elapsed,
          error: false,
          code,
        },
        ...prev.slice(0, 4),
      ]);
    } catch (err: unknown) {
      const elapsed = Number((performance.now() - start).toFixed(2));
      setDurationMs(elapsed);
      setHasError(true);
      setOutput(`Error: ${err instanceof Error ? err.message : String(err)}`);
      setHistory((prev) => [
        {
          id: Date.now(),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          durationMs: elapsed,
          error: true,
          code,
        },
        ...prev.slice(0, 4),
      ]);
    } finally {
      setIsExecuting(false);
    }
  }, [code]);

  const handleCopyOutput = async () => {
    if (!output) return;
    const ok = await copyToClipboard(output);
    if (ok) {
      setCopiedOutput(true);
      toast('Output copied to clipboard');
      setTimeout(() => setCopiedOutput(false), 1600);
    }
  };

  const handleShareSnippet = async () => {
    const encoded = encodeSnippet(code);
    if (!encoded) return;
    setSearchParams({ s: encoded });
    const url = `${window.location.origin}/playground?s=${encoded}`;
    const ok = await copyToClipboard(url);
    if (ok) toast('Shareable snippet URL copied');
  };

  return (
    <div className="min-h-[calc(100vh-60px)] md:h-[calc(100vh-60px)] w-full flex flex-col bg-[var(--bg)]">
      {/* Top Recipe & Utility Bar */}
      <div className="border-b border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--text-muted)] mr-1">
            <Sparkles size={13} className="text-[var(--primary)]" />
            Recipes:
          </span>
          {RECIPES.map((recipe) => (
            <button
              key={recipe.label}
              type="button"
              onClick={() => {
                setSelectedFunc('');
                setCode(recipe.code);
                setOutput('');
                setHasError(false);
                setDurationMs(null);
              }}
              className="px-2.5 py-1 rounded-md text-xs font-medium border border-[var(--border)] bg-[var(--bg)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--border-strong)] transition-colors cursor-pointer"
            >
              {recipe.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedFunc}
            onChange={handleSelectUtility}
            aria-label="Load utility example"
            className="flex-1 sm:w-52 bg-[var(--bg)] border border-[var(--border)] rounded-lg px-3 py-1.5 text-xs text-[var(--text)] focus:outline-none focus:border-[var(--primary)] cursor-pointer"
          >
            <option value="">Load any utility...</option>
            {utilitiesData.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.module})
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={handleShareSnippet}
            title="Copy shareable snippet URL"
            aria-label="Share snippet URL"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--border-strong)] transition-colors cursor-pointer"
          >
            <Share2 size={13} />
            <span className="hidden sm:inline">Share</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedFunc('');
              setCode(DEFAULT_SNIPPET);
              setOutput('');
              setHasError(false);
              setDurationMs(null);
            }}
            title="Reset editor"
            aria-label="Reset editor"
            className="p-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors cursor-pointer"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Split Workspace */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0">
        {/* Left Pane - Editor */}
        <div className="flex-1 flex flex-col border-b md:border-b-0 md:border-r border-[var(--border)] min-h-[300px]">
          <div className="bg-[var(--surface-2)]/50 border-b border-[var(--border)] px-4 py-2.5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text)]">
              <Code2 size={15} className="text-[var(--primary)]" />
              <span>Script Editor</span>
              <span className="hidden lg:inline font-normal text-[var(--text-faint)] ml-2">
                <kbd className="font-mono bg-[var(--surface)] px-1.5 py-0.5 rounded border border-[var(--border)] text-[10px]">
                  ⌘/Ctrl + Enter
                </kbd>{' '}
                to run
              </span>
            </div>
            <button
              type="button"
              onClick={() => void executeCode()}
              disabled={isExecuting}
              className="inline-flex items-center gap-1.5 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-colors disabled:opacity-50 cursor-pointer"
            >
              <Play size={13} />
              <span>{isExecuting ? 'Running...' : 'Run Script'}</span>
            </button>
          </div>

          <div className="flex-1 relative bg-[var(--bg-subtle)] overflow-hidden">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              aria-label="JavaScript playground editor"
              className="w-full h-full min-h-[260px] bg-transparent text-[var(--text)] p-4 font-mono text-xs sm:text-sm leading-relaxed focus:outline-none resize-none"
              style={{ tabSize: 2 }}
              onKeyDown={(e) => {
                if (e.key === 'Tab') {
                  e.preventDefault();
                  const start = e.currentTarget.selectionStart;
                  const end = e.currentTarget.selectionEnd;
                  const newCode = code.substring(0, start) + '  ' + code.substring(end);
                  setCode(newCode);
                  setTimeout(() => {
                    (e.target as HTMLTextAreaElement).selectionStart =
                      (e.target as HTMLTextAreaElement).selectionEnd = start + 2;
                  }, 0);
                }
                if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                  e.preventDefault();
                  void executeCode();
                }
              }}
            />
          </div>
        </div>

        {/* Right Pane - Console Output & Run History */}
        <div className="flex-1 flex flex-col min-h-[240px] bg-[var(--surface)]">
          <div className="bg-[var(--surface-2)]/50 border-b border-[var(--border)] px-4 py-2.5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text)]">
              <Terminal size={15} className={hasError ? 'text-[var(--danger)]' : 'text-[var(--success)]'} />
              <span>Console Output</span>
              {durationMs !== null && (
                <span className="inline-flex items-center gap-1 font-mono text-[11px] font-normal px-1.5 py-0.5 rounded bg-[var(--surface)] border border-[var(--border)] text-[var(--text-faint)]">
                  <Clock size={11} />
                  {durationMs}ms
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              {output && (
                <>
                  <button
                    type="button"
                    onClick={handleCopyOutput}
                    aria-label="Copy console output"
                    className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface)] transition-colors cursor-pointer"
                  >
                    {copiedOutput ? <Check size={13} className="text-[var(--success)]" /> : <Copy size={13} />}
                    <span>{copiedOutput ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setOutput('');
                      setHasError(false);
                      setDurationMs(null);
                    }}
                    aria-label="Clear console output"
                    className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface)] transition-colors cursor-pointer"
                  >
                    <Trash2 size={13} />
                    <span>Clear</span>
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="flex-1 p-4 overflow-auto">
            <pre
              className={`font-mono text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words ${
                hasError
                  ? 'text-[var(--danger)]'
                  : output
                  ? 'text-[var(--syntax-string)]'
                  : 'text-[var(--text-faint)]'
              }`}
            >
              {output || '// Click "Run Script" or press Cmd/Ctrl + Enter to execute...'}
            </pre>
          </div>

          {history.length > 0 && (
            <div className="border-t border-[var(--border)] bg-[var(--bg-subtle)] px-4 py-2 flex items-center gap-2 overflow-x-auto shrink-0">
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[var(--text-faint)] shrink-0">
                <History size={12} /> Runs:
              </span>
              {history.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setCode(item.code);
                    toast('Restored script from run history', 'info');
                  }}
                  className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-strong)] text-[11px] font-mono text-[var(--text-muted)] hover:text-[var(--text)] shrink-0 cursor-pointer"
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      item.error ? 'bg-[var(--danger)]' : 'bg-[var(--success)]'
                    }`}
                  />
                  <span>{item.time}</span>
                  <span className="text-[var(--text-faint)]">({item.durationMs}ms)</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
