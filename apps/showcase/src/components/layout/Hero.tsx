import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Check, Copy, Terminal, ShieldCheck, Zap } from 'lucide-react';

export function Hero() {
  const navigate = useNavigate();
  const [activeCodeTab, setActiveCodeTab] = useState<'string' | 'array' | 'async' | 'crypto' | 'object'>('string');
  const [packageManager, setPackageManager] = useState<'npm' | 'pnpm' | 'yarn' | 'bun'>('npm');
  const [copiedInstall, setCopiedInstall] = useState(false);

  const installCommands = {
    npm: 'npm install @dev_x_mohit/opti-kit',
    pnpm: 'pnpm add @dev_x_mohit/opti-kit',
    yarn: 'yarn add @dev_x_mohit/opti-kit',
    bun: 'bun add @dev_x_mohit/opti-kit',
  };

  const codeSnippets = {
    string: `import { slugify, interpolate, mask } from "@dev_x_mohit/opti-kit";\n\nslugify("Modern TS Library 🚀"); // → "modern-ts-library"\ninterpolate("Hello {{name}}!", { name: "Mohit" }); // → "Hello Mohit!"\nmask("4532123456789012"); // → "4532************9012"`,
    array: `import { chunk, groupBy, uniqueBy } from "@dev_x_mohit/opti-kit";\n\nchunk([1, 2, 3, 4, 5], 2); // → [[1, 2], [3, 4], [5]]\ngroupBy([{ r: "admin" }, { r: "user" }], u => u.r);\nuniqueBy([{ id: 1 }, { id: 1 }], x => x.id); // → [{ id: 1 }]`,
    async: `import { retryWithBackoff, pMap, waitUntil } from "@dev_x_mohit/opti-kit";\n\n// Retry async tasks with exponential backoff\nconst data = await retryWithBackoff(() => fetchApi(), {\n  retries: 3,\n  initialDelayMs: 200\n});\n\n// Concurrent async mapper\nawait pMap([1, 2, 3], async (id) => loadUser(id));`,
    crypto: `import { sha256, uuid, generateToken } from "@dev_x_mohit/opti-kit";\n\nuuid(); // → "f47ac10b-58cc-4372-a567-0e02b2c3d479"\nsha256("opti-kit"); // → "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"\ngenerateToken(16); // → "a8f9c2d1b7e6f4a3"`,
    object: `import { deepMerge, pick, flattenObject } from "@dev_x_mohit/opti-kit";\n\ndeepMerge({ a: { b: 1 } }, { a: { c: 2 } }); // → { a: { b: 1, c: 2 } }\npick({ name: "Mohit", age: 25 }, ["name"]); // → { name: "Mohit" }\nflattenObject({ user: { name: "Mohit" } }); // → { "user.name": "Mohit" }`
  };

  const handleCopyInstall = async () => {
    try {
      await navigator.clipboard.writeText(installCommands[packageManager]);
      setCopiedInstall(true);
      setTimeout(() => setCopiedInstall(false), 2000);
    } catch {}
  };

  return (
    <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-primary/20 via-accent/10 to-transparent blur-[140px] rounded-full pointer-events-none -z-10" />
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Top Release Pill */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-primary/20 text-xs font-medium text-text-main shadow-lg backdrop-blur hover:border-primary/40 transition-all cursor-pointer" onClick={() => navigate('/modules')}>
            <span className="flex h-2 w-2 rounded-full bg-success animate-pulse" />
            <span className="text-primary font-semibold">v1.0.6 Released</span>

            <span className="text-muted">•</span>
            <span className="text-muted">25 Modules • 328+ Utilities</span>
            <Sparkles size={13} className="text-accent" />
          </div>
        </motion.div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-text-main leading-[1.15]"
          >
            The Next-Gen Utility Engine <br />
            for <span className="bg-gradient-to-r from-primary via-accent to-purple-400 bg-clip-text text-transparent">TypeScript & JavaScript</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-xl text-muted max-w-2xl mx-auto leading-relaxed"
          >
            Zero dependencies. 100% tree-shakeable. Isomorphic CJS & ESM. <br className="hidden md:inline" />
            Designed to replace bloated legacy helpers with pure, lightning-fast utilities.
          </motion.p>

          {/* Call to Actions & Installer Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="pt-2 flex flex-col items-center gap-6"
          >
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button variant="primary" className="px-8 py-3.5 text-sm font-semibold shadow-lg shadow-primary/20 flex items-center gap-2 group" onClick={() => navigate('/docs')}>
                Get Started <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="px-8 py-3.5 text-sm font-semibold border-border hover:bg-surface flex items-center gap-2" onClick={() => navigate('/modules')}>
                Explore 328+ Utilities
              </Button>
            </div>

            {/* Quick Install Selector */}
            <div className="w-full max-w-xl bg-surface/80 backdrop-blur border border-border rounded-xl p-2.5 shadow-xl flex flex-col sm:flex-row items-center gap-3">
              <div className="flex bg-background border border-border rounded-lg p-1 text-xs font-mono shrink-0">
                {(['npm', 'pnpm', 'yarn', 'bun'] as const).map(pm => (
                  <button
                    key={pm}
                    onClick={() => setPackageManager(pm)}
                    className={`px-2.5 py-1 rounded transition-colors ${packageManager === pm ? 'bg-primary text-white font-semibold shadow' : 'text-muted hover:text-text-main'}`}
                  >
                    {pm}
                  </button>
                ))}
              </div>
              <div className="flex-1 font-mono text-xs text-text-main truncate text-center sm:text-left px-2">
                {installCommands[packageManager]}
              </div>
              <button
                onClick={handleCopyInstall}
                className="px-3 py-1.5 bg-background hover:bg-surface border border-border rounded-lg text-xs font-medium text-muted hover:text-primary transition-all flex items-center gap-1.5 shrink-0"
              >
                {copiedInstall ? <><Check size={14} className="text-success" /> Copied</> : <><Copy size={14} /> Copy</>}
              </button>
            </div>
          </motion.div>

        </div>

        {/* Interactive Studio IDE Preview Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 max-w-5xl mx-auto"
        >
          <div className="rounded-2xl bg-[#0f141c] border border-border/80 shadow-2xl overflow-hidden relative group">
            {/* Ambient Backlight Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-accent/20 to-purple-500/30 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity -z-10" />

            {/* Editor Window Header */}
            <div className="bg-[#161c28] border-b border-border/60 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                
                {/* Editor File Selector Tabs */}
                <div className="flex items-center gap-1 overflow-x-auto">
                  {[
                    { id: 'string', file: 'string.ts', label: 'String' },
                    { id: 'array', file: 'array.ts', label: 'Array' },
                    { id: 'async', file: 'async.ts', label: 'Async' },
                    { id: 'crypto', file: 'crypto.ts', label: 'Crypto' },
                    { id: 'object', file: 'object.ts', label: 'Object' },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveCodeTab(tab.id as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all ${
                        activeCodeTab === tab.id 
                          ? 'bg-[#0f141c] text-primary font-semibold border border-primary/30 shadow-inner' 
                          : 'text-muted hover:text-text-main hover:bg-[#1f2736]'
                      }`}
                    >
                      <span className="text-[10px] font-bold text-accent">TS</span>
                      <span>{tab.file}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Status Actions */}
              <div className="flex items-center gap-3">
                <span className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-success bg-success/10 px-2.5 py-1 rounded-full border border-success/20">
                  <Zap size={12} /> Live Engine • 0.2ms
                </span>

                <button
                  onClick={() => navigate('/playground')}
                  className="text-xs font-medium text-text-main hover:text-primary transition-colors flex items-center gap-1 bg-surface border border-border px-2.5 py-1 rounded-md"
                >
                  <ArrowRight size={13} /> Open Playground
                </button>
              </div>
            </div>

            {/* Split Editor & Console Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-border/60 bg-[#0f141c]">
              
              {/* Left Code Editor Pane */}
              <div className="lg:col-span-7 p-6 font-mono text-xs md:text-sm leading-relaxed overflow-x-auto text-text-main flex gap-4">
                <div className="text-muted/40 select-none text-right font-mono text-xs space-y-1">
                  <div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div><div>7</div>
                </div>
                <div className="flex-1">
                  <pre className="whitespace-pre text-gray-200">
                    {codeSnippets[activeCodeTab]}
                  </pre>
                </div>
              </div>

              {/* Right Interactive Console Output Pane */}
              <div className="lg:col-span-5 bg-[#121824] p-6 flex flex-col justify-between border-t lg:border-t-0 border-border/60 font-mono text-xs">
                <div>
                  <div className="flex items-center justify-between text-muted text-[11px] uppercase tracking-wider mb-4 pb-2 border-b border-border/40">
                    <span className="flex items-center gap-1.5 text-primary">
                      <Terminal size={13} /> Console Output
                    </span>
                    <span className="text-success font-semibold">STATUS: OK</span>
                  </div>

                  <div className="space-y-3">
                    {activeCodeTab === 'string' && (
                      <>
                        <div className="p-2.5 rounded bg-[#0b0f17] border border-border/40">
                          <span className="text-muted text-[11px]">slugify("Modern TS Library 🚀")</span>
                          <div className="text-success mt-1">"modern-ts-library"</div>
                        </div>
                        <div className="p-2.5 rounded bg-[#0b0f17] border border-border/40">
                          <span className="text-muted text-[11px]">{'interpolate("Hello {{name}}!", ...)'}</span>

                          <div className="text-success mt-1">"Hello Mohit!"</div>
                        </div>
                        <div className="p-2.5 rounded bg-[#0b0f17] border border-border/40">
                          <span className="text-muted text-[11px]">mask("4532123456789012")</span>
                          <div className="text-success mt-1">"4532************9012"</div>
                        </div>
                      </>
                    )}

                    {activeCodeTab === 'array' && (
                      <>
                        <div className="p-2.5 rounded bg-[#0b0f17] border border-border/40">
                          <span className="text-muted text-[11px]">chunk([1, 2, 3, 4, 5], 2)</span>
                          <div className="text-success mt-1">[[1, 2], [3, 4], [5]]</div>
                        </div>
                        <div className="p-2.5 rounded bg-[#0b0f17] border border-border/40">
                          <span className="text-muted text-[11px]">uniqueBy([{'{'} id: 1 {'}'}, ...], x =&gt; x.id)</span>
                          <div className="text-success mt-1">[{'{'} "id": 1 {'}'}]</div>
                        </div>
                      </>
                    )}

                    {activeCodeTab === 'async' && (
                      <>
                        <div className="p-2.5 rounded bg-[#0b0f17] border border-border/40">
                          <span className="text-muted text-[11px]">retryWithBackoff(fn, retries: 3)</span>
                          <div className="text-success mt-1">⚡ Resolved in 204ms (Attempt 1)</div>
                        </div>
                        <div className="p-2.5 rounded bg-[#0b0f17] border border-border/40">
                          <span className="text-muted text-[11px]">pMap([1, 2, 3], async loadUser)</span>
                          <div className="text-success mt-1">✓ 3 promises resolved in parallel</div>
                        </div>
                      </>
                    )}

                    {activeCodeTab === 'crypto' && (
                      <>
                        <div className="p-2.5 rounded bg-[#0b0f17] border border-border/40">
                          <span className="text-muted text-[11px]">uuid()</span>
                          <div className="text-success mt-1">"f47ac10b-58cc-4372-a567-0e02b2c3d479"</div>
                        </div>
                        <div className="p-2.5 rounded bg-[#0b0f17] border border-border/40">
                          <span className="text-muted text-[11px]">sha256("opti-kit")</span>
                          <div className="text-success mt-1 truncate">"e3b0c44298fc1c149afbf4c8996fb92..."</div>
                        </div>
                      </>
                    )}

                    {activeCodeTab === 'object' && (
                      <>
                        <div className="p-2.5 rounded bg-[#0b0f17] border border-border/40">
                          <span className="text-muted text-[11px]">deepMerge(a, b)</span>
                          <div className="text-success mt-1">{'{'} "a": {'{'} "b": 1, "c": 2 {'}'} {'}'}</div>
                        </div>
                        <div className="p-2.5 rounded bg-[#0b0f17] border border-border/40">
                          <span className="text-muted text-[11px]">flattenObject(obj)</span>
                          <div className="text-success mt-1">{'{'} "user.name": "Mohit" {'}'}</div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-border/40 flex items-center justify-between text-[10px] text-muted">
                  <span>Zero runtime dependencies</span>
                  <span>Pure TypeScript Native</span>
                </div>
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}


