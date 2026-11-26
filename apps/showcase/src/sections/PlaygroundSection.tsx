import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as opti from '@dev_x_mohit/opti-kit';
import {
  Play, RotateCcw, Copy, Check, ChevronRight, ChevronDown, Sliders, Hash,
  Activity, GitFork, DollarSign, Zap, Terminal, Plus, Search, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { copyToClipboard } from '../lib/copyToClipboard';

type DemoTab = 'async' | 'crypto' | 'nlp' | 'tree' | 'finance' | 'signal' | 'custom';

export function PlaygroundSection() {
  const [activeTab, setActiveTab] = useState<DemoTab>('async');
  const [copied, setCopied] = useState(false);

  // -------------------------------------------------------------
  // 1. ASYNC TIMELINE DEMO (Interactive 2D animated event track)
  // -------------------------------------------------------------
  const [clickCount, setClickCount] = useState(0);
  const [debouncedCount, setDebouncedCount] = useState(0);
  const [throttledCount, setThrottledCount] = useState(0);
  const [events, setEvents] = useState<Array<{ id: number; type: 'raw' | 'debounced' | 'throttled'; time: number }>>([]);
  const eventIdRef = useRef(0);

  const debouncedFn = useMemo(
    () =>
      opti.debounce(() => {
        setDebouncedCount((c) => c + 1);
        setEvents((prev) => [
          { id: ++eventIdRef.current, type: 'debounced', time: Date.now() },
          ...prev.slice(0, 19),
        ]);
      }, 500),
    []
  );

  const throttledFn = useMemo(
    () =>
      opti.throttle(() => {
        setThrottledCount((c) => c + 1);
        setEvents((prev) => [
          { id: ++eventIdRef.current, type: 'throttled', time: Date.now() },
          ...prev.slice(0, 19),
        ]);
      }, 500),
    []
  );

  const handleAsyncTrigger = () => {
    setClickCount((c) => c + 1);
    setEvents((prev) => [
      { id: ++eventIdRef.current, type: 'raw', time: Date.now() },
      ...prev.slice(0, 19),
    ]);
    debouncedFn();
    throttledFn();
  };

  const resetAsync = () => {
    setClickCount(0);
    setDebouncedCount(0);
    setThrottledCount(0);
    setEvents([]);
  };

  // -------------------------------------------------------------
  // 2. CRYPTO & TOKEN DEMO
  // -------------------------------------------------------------
  const [cryptoInput, setCryptoInput] = useState('ProductionPayload-2026');
  const [sha256Hash, setSha256Hash] = useState('');
  const [generatedUuid, setGeneratedUuid] = useState(opti.uuid());
  const [hashTimeMs, setHashTimeMs] = useState(0);

  useEffect(() => {
    let isCurrent = true;
    const start = performance.now();
    opti.sha256(cryptoInput).then((h: string) => {
      if (isCurrent) {
        setSha256Hash(h);
        setHashTimeMs(Number((performance.now() - start).toFixed(2)));
      }
    });
    return () => {
      isCurrent = false;
    };
  }, [cryptoInput]);

  // -------------------------------------------------------------
  // 3. NLP / SIMILARITY DEMO
  // -------------------------------------------------------------
  const [nlpStr1, setNlpStr1] = useState('kitten');
  const [nlpStr2, setNlpStr2] = useState('sitting');
  const [similarityResult, setSimilarityResult] = useState<{
    distance: number;
    soundex1: string;
    soundex2: string;
    matchPct: number;
    isSoundexMatch: boolean;
  }>({ distance: 3, soundex1: 'K350', soundex2: 'S352', matchPct: 57, isSoundexMatch: false });

  useEffect(() => {
    try {
      const distance = opti.levenshteinDistance(nlpStr1, nlpStr2);
      const soundex1 = opti.soundex(nlpStr1);
      const soundex2 = opti.soundex(nlpStr2);
      const maxLen = Math.max(nlpStr1.length, nlpStr2.length);
      const matchPct = maxLen === 0 ? 100 : Math.round((1 - distance / maxLen) * 100);
      setSimilarityResult({
        distance,
        soundex1,
        soundex2,
        matchPct,
        isSoundexMatch: soundex1 === soundex2,
      });
    } catch {
      // ignore
    }
  }, [nlpStr1, nlpStr2]);

  // -------------------------------------------------------------
  // 4. TREE DEMO (Expandable hierarchy)
  // -------------------------------------------------------------
  const [treeItems, setTreeItems] = useState([
    { id: '1', parentId: null, name: 'Root System' },
    { id: '2', parentId: '1', name: 'packages' },
    { id: '3', parentId: '2', name: 'opti-kit (core engine)' },
    { id: '4', parentId: '2', name: 'mcp-server (agent stdio)' },
    { id: '5', parentId: '1', name: 'apps' },
    { id: '6', parentId: '5', name: 'showcase (docs site)' },
    { id: '7', parentId: '3', name: '108 pure modules' },
  ]);
  const [treeSearch, setTreeSearch] = useState('');
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    '1': true,
    '2': true,
    '3': true,
    '5': true,
  });

  const hierarchicalTree = useMemo(() => {
    return opti.arrayToTree(treeItems);
  }, [treeItems]);

  const toggleNode = (id: string) => {
    setExpandedNodes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const addCustomNode = () => {
    const newId = String(treeItems.length + 1);
    setTreeItems((prev) => [
      ...prev,
      { id: newId, parentId: '2', name: `custom-package-${newId}` },
    ]);
    setExpandedNodes((prev) => ({ ...prev, '2': true }));
  };

  // -------------------------------------------------------------
  // 5. FINANCE DEMO (Interactive 2D Chart with scrubber)
  // -------------------------------------------------------------
  const [principal, setPrincipal] = useState(15000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(12);
  const [hoverYear, setHoverYear] = useState<number | null>(null);

  const compoundInterestValue = useMemo(() => {
    return opti.calculateCompoundInterest(principal, rate, years, 12);
  }, [principal, rate, years]);

  const monthlyPmtValue = useMemo(() => {
    const monthlyRate = rate / 100 / 12;
    const months = years * 12;
    return Math.abs(opti.calculatePMT(monthlyRate, months, principal));
  }, [principal, rate, years]);

  const chartData = useMemo(() => {
    const data: Array<{ year: number; balance: number; interest: number }> = [];
    for (let yr = 0; yr <= years; yr++) {
      const interest = opti.calculateCompoundInterest(principal, rate, yr, 12);
      data.push({ year: yr, balance: principal + interest, interest });
    }
    return data;
  }, [principal, rate, years]);

  // -------------------------------------------------------------
  // 6. SIGNAL REACTIVE GRAPH
  // -------------------------------------------------------------
  const [signalCount, setSignalCount] = useState(12);
  const [reactivePulse, setReactivePulse] = useState(false);
  const [signalHistory, setSignalHistory] = useState<string[]>([
    'Computed doubled = 24',
    'Computed isEven = true',
  ]);

  const handleSignalUpdate = (delta: number) => {
    const next = signalCount + delta;
    setSignalCount(next);
    setReactivePulse(true);
    setTimeout(() => setReactivePulse(false), 300);

    const doubled = next * 2;
    const isEven = next % 2 === 0;
    setSignalHistory((prev) => [
      `Computed doubled = ${doubled} (value was ${next})`,
      ...prev.slice(0, 4),
    ]);
  };

  // -------------------------------------------------------------
  // 7. CUSTOM CODE IDE
  // -------------------------------------------------------------
  const defaultCode = `// Call any of the 1,280+ utilities from @dev_x_mohit/opti-kit
const rawData = [45, 12, 89, 23, 67, 12, 90, 34];

const clean = opti.unique(rawData);
const sorted = opti.quickSort([...clean]);

return {
  originalLength: rawData.length,
  uniqueValues: clean,
  sortedAscending: sorted,
  mean: opti.mean(sorted),
  median: opti.median(sorted),
  stdDev: opti.standardDeviation(sorted),
  uuidToken: opti.uuid()
};`;

  const [customCode, setCustomCode] = useState(defaultCode);
  const [customOutput, setCustomOutput] = useState('');
  const [customError, setCustomError] = useState<string | null>(null);

  const runCustomCode = () => {
    setCustomError(null);
    try {
      const fn = new Function('opti', customCode);
      const res = fn(opti);
      setCustomOutput(JSON.stringify(res, null, 2));
    } catch (err: any) {
      setCustomError(err?.message || String(err));
    }
  };

  useEffect(() => {
    runCustomCode();
  }, []);

  const handleCopyCode = async (codeToCopy: string) => {
    const success = await copyToClipboard(codeToCopy);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  // Recursive tree renderer
  const renderTreeNodes = (nodes: any[], depth = 0) => {
    return nodes.map((node) => {
      const isExpanded = expandedNodes[node.id];
      const hasChildren = node.children && node.children.length > 0;
      const matchesSearch =
        treeSearch === '' || node.name.toLowerCase().includes(treeSearch.toLowerCase());

      if (!matchesSearch && !hasChildren) return null;

      return (
        <div key={node.id} style={{ paddingLeft: `${depth * 18}px` }} className="my-1">
          <div
            onClick={() => hasChildren && toggleNode(node.id)}
            className={`flex items-center gap-2 py-1.5 px-2.5 rounded-lg font-mono text-xs transition-all ${
              hasChildren
                ? 'cursor-pointer hover:bg-[var(--surface-2)] text-[var(--text)]'
                : 'text-[var(--text-muted)]'
            } ${matchesSearch && treeSearch ? 'bg-[var(--primary-soft)] text-[var(--primary)]' : ''}`}
          >
            {hasChildren ? (
              isExpanded ? (
                <ChevronDown size={14} className="text-[var(--primary)] shrink-0" />
              ) : (
                <ChevronRight size={14} className="text-[var(--text-faint)] shrink-0" />
              )
            ) : (
              <span className="w-3.5 text-center text-[var(--primary)]/60 text-xs shrink-0">↳</span>
            )}
            <span className={hasChildren ? 'font-semibold text-[var(--text)]' : ''}>{node.name}</span>
            <span className="text-[10px] text-[var(--text-faint)] ml-auto font-sans">
              id: {node.id}
            </span>
          </div>

          {hasChildren && isExpanded && (
            <div className="border-l border-[var(--border)] ml-3.5 pl-1.5">
              {renderTreeNodes(node.children, depth + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <section id="playground" className="py-20 border-b border-[var(--border)] bg-[var(--bg)]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex mb-3">
            <Badge variant="primary" icon={<Sparkles size={13} />}>
              Live In-Memory Sandbox
            </Badge>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-[var(--text)]">
            Interactive Function Studio
          </h2>
          <p className="mt-3 max-w-[62ch] mx-auto text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
            Test and visualize OptiKit algorithms in real-time. Zero network round-trips — all logic runs locally on pure JavaScript.
          </p>
        </div>

        {/* Demo Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mb-8 p-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] max-w-3xl mx-auto shadow-xs">
          {[
            { id: 'async', label: 'Debounce & Throttle', icon: <Activity size={14} /> },
            { id: 'crypto', label: 'Crypto & UUID', icon: <Hash size={14} /> },
            { id: 'nlp', label: 'Similarity & Soundex', icon: <Sliders size={14} /> },
            { id: 'tree', label: 'Array to Tree', icon: <GitFork size={14} /> },
            { id: 'finance', label: 'Finance Math', icon: <DollarSign size={14} /> },
            { id: 'signal', label: 'Signals & State', icon: <Zap size={14} /> },
            { id: 'custom', label: 'Custom Code IDE', icon: <Terminal size={14} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as DemoTab)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[var(--primary)] text-white shadow-xs'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Playground Main Card */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden shadow-xs">
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3 bg-[var(--surface-2)]">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--primary)] animate-pulse" />
              <span className="font-mono text-xs text-[var(--text-muted)]">
                optikit-studio/{activeTab}.ts
              </span>
            </div>

            <button
              onClick={() => handleCopyCode(customCode)}
              className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text)] px-2.5 py-1 rounded-md hover:bg-[var(--surface)] transition-colors cursor-pointer"
            >
              {copied ? <Check size={13} className="text-[var(--success)]" /> : <Copy size={13} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[var(--border)]">
            {/* LEFT SIDE: Controls & Interactive Inputs (5 cols) */}
            <div className="lg:col-span-6 p-6 space-y-6">
              {/* 1. ASYNC */}
              {activeTab === 'async' && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--text)]">
                      Event Rate-Limiting Demonstration
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
                      Click repeatedly. Notice that <strong>Debounce</strong> waits 500ms after the last burst to execute once, while <strong>Throttle</strong> fires smoothly at steady 500ms intervals.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button onClick={handleAsyncTrigger} size="md" variant="primary" className="shadow-md">
                      Fire Rapid Event! ({clickCount} clicks)
                    </Button>
                    <Button onClick={resetAsync} size="md" variant="secondary">
                      <RotateCcw size={14} /> Reset
                    </Button>
                  </div>

                  {/* Real-time 2D Visual Timeline Bar */}
                  <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4 space-y-3">
                    <div className="flex justify-between text-[11px] font-mono text-[var(--text-faint)]">
                      <span>Event Stream History</span>
                      <span>Left = Newest</span>
                    </div>

                    <div className="h-10 w-full rounded-lg bg-[var(--surface-2)] flex items-center px-3 gap-1.5 overflow-hidden border border-[var(--border)]/40">
                      {events.length === 0 ? (
                        <span className="text-[11px] text-[var(--text-faint)] italic">Click button to stream event pulses...</span>
                      ) : (
                        events.map((evt) => (
                          <div
                            key={evt.id}
                            title={`${evt.type} at ${new Date(evt.time).toLocaleTimeString()}`}
                            className={`h-6 w-2 rounded-full transition-all shrink-0 ${
                              evt.type === 'raw'
                                ? 'bg-[var(--text-faint)]/40'
                                : evt.type === 'debounced'
                                ? 'bg-[var(--primary)] ring-2 ring-[var(--primary)]/30'
                                : 'bg-[var(--success)] ring-2 ring-[var(--success)]/30'
                            }`}
                          />
                        ))
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-[10px] font-mono text-[var(--text-faint)]">
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-[var(--text-faint)]/50" /> Raw ({clickCount})
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-[var(--primary)]" /> Debounce ({debouncedCount})
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-[var(--success)]" /> Throttle ({throttledCount})
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. CRYPTO */}
              {activeTab === 'crypto' && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--text)]">Cryptographic & Token Engine</h3>
                    <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
                      Hardware-backed SHA-256 calculation and RFC 4122 v4 UUID generator.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[var(--text-muted)]">Input Text:</label>
                    <input
                      type="text"
                      value={cryptoInput}
                      onChange={(e) => setCryptoInput(e.target.value)}
                      className="w-full h-10 px-3.5 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-xs font-mono text-[var(--text)] focus:border-[var(--primary)] outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <Button onClick={() => setGeneratedUuid(opti.uuid())} size="sm" variant="secondary">
                      Regenerate UUID
                    </Button>
                    <span className="text-xs font-mono text-[var(--text-faint)]">
                      Hash latency: <strong className="text-[var(--success)]">{hashTimeMs} ms</strong>
                    </span>
                  </div>

                  <pre className="p-3.5 rounded-xl bg-[var(--bg)] border border-[var(--border)] font-mono text-xs text-[var(--text-muted)] overflow-x-auto leading-relaxed">
{`import { sha256, uuid } from '@dev_x_mohit/opti-kit';

const hash = await sha256('${cryptoInput}');
const id = uuid();`}
                  </pre>
                </div>
              )}

              {/* 3. NLP & SIMILARITY */}
              {activeTab === 'nlp' && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--text)]">String Similarity & Phonetics</h3>
                    <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
                      Levenshtein edit-distance and American Soundex phonetic encoding for fuzzy searches.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-[var(--text-muted)]">Word A:</label>
                      <input
                        type="text"
                        value={nlpStr1}
                        onChange={(e) => setNlpStr1(e.target.value)}
                        className="w-full h-10 px-3 mt-1 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-xs font-mono text-[var(--text)] focus:border-[var(--primary)] outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[var(--text-muted)]">Word B:</label>
                      <input
                        type="text"
                        value={nlpStr2}
                        onChange={(e) => setNlpStr2(e.target.value)}
                        className="w-full h-10 px-3 mt-1 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-xs font-mono text-[var(--text)] focus:border-[var(--primary)] outline-none"
                      />
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] flex items-center justify-between text-xs">
                    <span className="text-[var(--text-muted)]">Phonetic Soundex Match?</span>
                    <Badge variant={similarityResult.isSoundexMatch ? 'success' : 'neutral'}>
                      {similarityResult.isSoundexMatch ? 'Identical Sound (Match)' : 'Different Pronunciation'}
                    </Badge>
                  </div>
                </div>
              )}

              {/* 4. TREE */}
              {activeTab === 'tree' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--text)]">Relational Array to Nested Tree</h3>
                    <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
                      O(n) recursive transformation of flat database records into nested DOM trees.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                      <Search size={14} className="absolute left-3 top-3 text-[var(--text-faint)]" />
                      <input
                        type="text"
                        placeholder="Filter tree nodes..."
                        value={treeSearch}
                        onChange={(e) => setTreeSearch(e.target.value)}
                        className="w-full h-9 pl-9 pr-3 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-xs text-[var(--text)] outline-none focus:border-[var(--primary)]"
                      />
                    </div>
                    <Button onClick={addCustomNode} size="sm" variant="secondary">
                      <Plus size={13} /> Add Node
                    </Button>
                  </div>

                  <div className="text-[11px] font-mono text-[var(--text-faint)]">
                    Active relational records: {treeItems.length} items
                  </div>
                </div>
              )}

              {/* 5. FINANCE */}
              {activeTab === 'finance' && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--text)]">Compound Interest & PMT Engine</h3>
                    <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
                      Exact financial formulas for annuities, portfolio growth, and loan amortization.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-[var(--text)] mb-1">
                        <span>Principal:</span>
                        <span className="font-mono text-[var(--primary)]">${principal.toLocaleString()}</span>
                      </div>
                      <input
                        type="range"
                        min="2000"
                        max="100000"
                        step="1000"
                        value={principal}
                        onChange={(e) => setPrincipal(Number(e.target.value))}
                        className="w-full accent-[var(--primary)]"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold text-[var(--text)] mb-1">
                        <span>Annual Return:</span>
                        <span className="font-mono text-[var(--primary)]">{rate}%</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="20"
                        step="0.5"
                        value={rate}
                        onChange={(e) => setRate(Number(e.target.value))}
                        className="w-full accent-[var(--primary)]"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold text-[var(--text)] mb-1">
                        <span>Duration:</span>
                        <span className="font-mono text-[var(--primary)]">{years} Years</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="30"
                        step="1"
                        value={years}
                        onChange={(e) => setYears(Number(e.target.value))}
                        className="w-full accent-[var(--primary)]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 6. SIGNAL */}
              {activeTab === 'signal' && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--text)]">Fine-Grained Reactivity</h3>
                    <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
                      Zero-overhead dependency tracking graph: change the signal, and subscribers recompute instantly.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button onClick={() => handleSignalUpdate(-1)} size="sm" variant="secondary">
                      - Decrement
                    </Button>
                    <span className="font-mono text-base font-bold text-[var(--text)] px-4">
                      count = {signalCount}
                    </span>
                    <Button onClick={() => handleSignalUpdate(1)} size="sm" variant="primary">
                      + Increment
                    </Button>
                  </div>

                  {/* 2D Reactive Dependency Graph */}
                  <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] space-y-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-faint)]">
                      Reactive Dependency Tree:
                    </span>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                      <div className={`p-2.5 rounded-lg border transition-all ${reactivePulse ? 'border-[var(--primary)] bg-[var(--primary-soft)]' : 'border-[var(--border)] bg-[var(--surface)]'}`}>
                        <span className="text-[10px] text-[var(--text-faint)] block">Signal</span>
                        <span className="font-bold text-[var(--primary)]">{signalCount}</span>
                      </div>
                      <div className={`p-2.5 rounded-lg border transition-all ${reactivePulse ? 'border-[var(--primary)] bg-[var(--primary-soft)]' : 'border-[var(--border)] bg-[var(--surface)]'}`}>
                        <span className="text-[10px] text-[var(--text-faint)] block">Computed (x2)</span>
                        <span className="font-bold text-[var(--text)]">{signalCount * 2}</span>
                      </div>
                      <div className="p-2.5 rounded-lg border border-[var(--success)]/40 bg-[var(--success-soft)]">
                        <span className="text-[10px] text-[var(--success)] block">Effect</span>
                        <span className="font-bold text-[var(--success)]">Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 7. CUSTOM IDE */}
              {activeTab === 'custom' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-[var(--text)]">Arbitrary Code Runner</h3>
                      <p className="text-xs text-[var(--text-muted)]">
                        Object <code className="font-mono text-[var(--primary)]">opti</code> is globally exposed.
                      </p>
                    </div>
                    <Button onClick={runCustomCode} size="sm" variant="primary">
                      <Play size={13} /> Run
                    </Button>
                  </div>

                  <textarea
                    value={customCode}
                    onChange={(e) => setCustomCode(e.target.value)}
                    rows={12}
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] p-3 font-mono text-xs text-[var(--text)] outline-none focus:border-[var(--primary)] resize-y leading-relaxed"
                    spellCheck={false}
                  />
                </div>
              )}
            </div>

            {/* RIGHT SIDE: Dynamic Computed Outputs (6 cols) */}
            <div className="lg:col-span-6 p-6 bg-[var(--bg)]/40 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[var(--border)] mb-5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-faint)]">
                    Computed Output & Visualizations
                  </span>
                  <Badge variant="success" icon={<Zap size={11} />}>
                    Pure 2D
                  </Badge>
                </div>

                {/* ASYNC OUTPUT */}
                {activeTab === 'async' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="p-3 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
                        <span className="text-xs text-[var(--text-muted)]">Raw Clicks</span>
                        <div className="text-2xl font-mono font-bold text-[var(--text)] mt-1">{clickCount}</div>
                      </div>
                      <div className="p-3 rounded-xl border border-[var(--primary)]/30 bg-[var(--surface)]">
                        <span className="text-xs text-[var(--primary)] font-semibold">Debounced</span>
                        <div className="text-2xl font-mono font-bold text-[var(--primary)] mt-1">{debouncedCount}</div>
                      </div>
                      <div className="p-3 rounded-xl border border-[var(--success)]/30 bg-[var(--surface)]">
                        <span className="text-xs text-[var(--success)] font-semibold">Throttled</span>
                        <div className="text-2xl font-mono font-bold text-[var(--success)] mt-1">{throttledCount}</div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] font-mono text-xs space-y-2 min-h-[140px]">
                      <span className="text-[10px] text-[var(--text-faint)] uppercase block">Execution Log:</span>
                      {events.slice(0, 5).map((evt) => (
                        <div key={evt.id} className="flex justify-between items-center text-[11px]">
                          <span className={evt.type === 'debounced' ? 'text-[var(--primary)] font-semibold' : evt.type === 'throttled' ? 'text-[var(--success)] font-semibold' : 'text-[var(--text-faint)]'}>
                            [{evt.type.toUpperCase()}] handler executed
                          </span>
                          <span className="text-[var(--text-faint)]">{new Date(evt.time).toLocaleTimeString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CRYPTO OUTPUT */}
                {activeTab === 'crypto' && (
                  <div className="space-y-4 font-mono text-xs">
                    <div>
                      <span className="text-[var(--text-muted)] block mb-1.5 font-sans font-medium">
                        SHA-256 Digest (Hexadecimal 64-chars):
                      </span>
                      <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--primary)] break-all select-all font-semibold shadow-xs">
                        {sha256Hash || 'Computing...'}
                      </div>
                    </div>

                    <div>
                      <span className="text-[var(--text-muted)] block mb-1.5 font-sans font-medium">
                        RFC 4122 v4 UUID:
                      </span>
                      <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] select-all font-semibold">
                        {generatedUuid}
                      </div>
                    </div>
                  </div>
                )}

                {/* NLP OUTPUT */}
                {activeTab === 'nlp' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
                        <span className="text-xs text-[var(--text-muted)]">Levenshtein Edits</span>
                        <div className="text-3xl font-mono font-bold text-[var(--primary)] mt-1">
                          {similarityResult.distance}
                        </div>
                      </div>
                      <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
                        <span className="text-xs text-[var(--text-muted)]">Character Match</span>
                        <div className="text-3xl font-mono font-bold text-[var(--success)] mt-1">
                          {similarityResult.matchPct}%
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] font-mono text-xs space-y-2">
                      <div className="flex justify-between">
                        <span className="text-[var(--text-muted)]">Soundex("{nlpStr1}"):</span>
                        <span className="font-bold text-[var(--text)]">{similarityResult.soundex1}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--text-muted)]">Soundex("{nlpStr2}"):</span>
                        <span className="font-bold text-[var(--text)]">{similarityResult.soundex2}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* TREE OUTPUT */}
                {activeTab === 'tree' && (
                  <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 max-h-[320px] overflow-y-auto">
                    <div className="text-xs font-semibold text-[var(--text-muted)] mb-3">
                      Recursive Tree Hierarchy (Click parent to expand/collapse):
                    </div>
                    {renderTreeNodes(hierarchicalTree)}
                  </div>
                )}

                {/* FINANCE OUTPUT WITH INTERACTIVE 2D SVG CHART */}
                {activeTab === 'finance' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
                        <span className="text-xs text-[var(--text-muted)]">Total Interest Earned</span>
                        <div className="text-2xl font-mono font-bold text-[var(--success)] mt-1">
                          ${Math.round(compoundInterestValue).toLocaleString()}
                        </div>
                      </div>
                      <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
                        <span className="text-xs text-[var(--text-muted)]">Monthly PMT</span>
                        <div className="text-2xl font-mono font-bold text-[var(--primary)] mt-1">
                          ${monthlyPmtValue.toFixed(2)}
                        </div>
                      </div>
                    </div>

                    {/* Interactive 2D Chart */}
                    <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] space-y-2">
                      <div className="flex justify-between text-xs text-[var(--text-muted)]">
                        <span>Portfolio Trajectory</span>
                        <span className="font-mono text-[var(--text)] font-semibold">
                          ${Math.round(principal + compoundInterestValue).toLocaleString()}
                        </span>
                      </div>

                      <svg viewBox="0 0 400 130" className="w-full h-28 overflow-visible">
                        <defs>
                          <linearGradient id="financeGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>

                        {/* Area under curve */}
                        <polygon
                          fill="url(#financeGrad)"
                          points={`10,120 ${chartData
                            .map((pt, i) => {
                              const x = (i / years) * 380 + 10;
                              const minBal = principal;
                              const maxBal = chartData[chartData.length - 1].balance;
                              const y = 120 - ((pt.balance - minBal) / (maxBal - minBal || 1)) * 105;
                              return `${x},${y}`;
                            })
                            .join(' ')} 390,120`}
                        />

                        {/* Curve stroke */}
                        <polyline
                          fill="none"
                          stroke="var(--primary)"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          points={chartData
                            .map((pt, i) => {
                              const x = (i / years) * 380 + 10;
                              const minBal = principal;
                              const maxBal = chartData[chartData.length - 1].balance;
                              const y = 120 - ((pt.balance - minBal) / (maxBal - minBal || 1)) * 105;
                              return `${x},${y}`;
                            })
                            .join(' ')}
                        />
                      </svg>
                    </div>
                  </div>
                )}

                {/* SIGNAL OUTPUT */}
                {activeTab === 'signal' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] space-y-2 font-mono text-xs">
                      <span className="text-[10px] text-[var(--text-faint)] uppercase block">
                        Reactive Log (Effects):
                      </span>
                      {signalHistory.map((item, i) => (
                        <div key={i} className="text-[var(--text)] flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CUSTOM IDE OUTPUT */}
                {activeTab === 'custom' && (
                  <div className="font-mono text-xs">
                    {customError ? (
                      <div className="p-4 rounded-xl border border-[var(--danger)]/30 bg-[var(--danger)]/10 text-[var(--danger)]">
                        <strong>Error:</strong> {customError}
                      </div>
                    ) : (
                      <pre className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] overflow-x-auto max-h-72 leading-relaxed">
                        {customOutput || '// Running script...'}
                      </pre>
                    )}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-[var(--border)] text-[11px] text-[var(--text-faint)] flex items-center justify-between">
                <span>Verified in OptiKit isomorphic runtime</span>
                <span className="font-mono text-[var(--primary)]">100% Deterministic</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
