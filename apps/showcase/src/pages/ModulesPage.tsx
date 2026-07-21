import React, { useState, useMemo, useEffect } from 'react';
import { Search, Copy, Check, Play, ChevronRight, Menu, X, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { utilitiesData, UtilityMeta } from '../data/utilitiesData';
import { Card } from '../components/ui/Card';
import * as opti from '@dev_x_mohit/opti-kit';
import { useSearchParams } from 'react-router-dom';

export function ModulesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const setQuery = (val: string) => {
    if (val) {
      setSearchParams({ q: val }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  };

  const [selectedUtilityId, setSelectedUtilityId] = useState<string>(utilitiesData[0]?.id);
  const [copiedImport, setCopiedImport] = useState(false);
  const [copiedSignature, setCopiedSignature] = useState(false);
  const [copiedOutput, setCopiedOutput] = useState(false);
  const [inputArgs, setInputArgs] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});
  
  // Smart dummy argument generator based on signature and function name
  const generateDummyArgs = (signature: string, name: string): string => {
    const defaults: Record<string, string> = {
      chunk: '[1, 2, 3, 4, 5], 2',
      slugify: '"Hello World!"',
      delay: '1000',
      capitalize: '"hello world"',
      camelCase: '"hello-world"',
      kebabCase: '"helloWorld"',
      snakeCase: '"helloWorld"',
      truncate: '"Hello World", 5',
      clamp: '15, 0, 10',
      random: '1, 100',
      difference: '[1, 2, 3], [2, 4]',
      intersection: '[1, 2, 3], [2, 3, 4]',
      unique: '[1, 1, 2, 3, 3]',
      groupBy: '[{ type: "a" }, { type: "b" }, { type: "a" }], item => item.type',
      debounce: '() => console.log("debounce"), 1000',
      throttle: '() => console.log("throttle"), 1000',
      isEmail: '"test@example.com"',
      isUrl: '"https://example.com"',
      hexToRgb: '"#ff0000"',
      rgbToHex: '255, 0, 0',
      parseQuery: '"?foo=bar&baz=qux"',
      stringifyQuery: '{ foo: "bar", baz: "qux" }',
      cookieGet: '"session_id"',
      cookieSet: '"session_id", "12345", { days: 7 }',
      escapeHtml: '"<h1>Hello</h1>"',
      unescapeHtml: '"&lt;h1&gt;Hello&lt;/h1&gt;"',
    };

    if (defaults[name]) return defaults[name];

    if (signature.includes('(str: string') || signature.includes('(text: string')) return '"Hello World"';
    if (signature.includes('(arr: T[]') || signature.includes('(arr: any[]')) {
      if (signature.includes('size: number')) return '[1, 2, 3, 4], 2';
      return '[1, 2, 3]';
    }
    if (signature.includes('(num: number') || signature.includes('value: number')) {
      if (signature.includes('min: number, max: number')) return '5, 0, 10';
      return '42';
    }
    if (signature.includes('(obj: Record') || signature.includes('(obj: any')) return '{ a: 1, b: 2 }';
    if (signature.includes('Date')) return 'new Date()';

    return '/* enter arguments here */';
  };

  // Group by module
  const groupedUtilities = useMemo(() => {
    const groups: Record<string, UtilityMeta[]> = {};
    utilitiesData.forEach(u => {
      if (!groups[u.module]) groups[u.module] = [];
      groups[u.module].push(u);
    });
    return groups;
  }, []);

  // Category mappings for modules
  const moduleCategories: Record<string, string> = {
    String: 'Data',
    Array: 'Data',
    Object: 'Data',
    Collection: 'Data',
    Tree: 'Data',
    Math: 'Math & Science',
    Statistics: 'Math & Science',
    Geometry: 'Math & Science',
    Units: 'Math & Science',
    Number: 'Math & Science',
    Dom: 'Web',
    Storage: 'Web',
    Url: 'Web',
    Events: 'Web',
    Validate: 'Web',
    Async: 'Async & Logic',
    Crypto: 'Security & Encoders',
    Encoding: 'Security & Encoders',
    Functional: 'Async & Logic',
    Random: 'Utilities',
    Color: 'Utilities',
    Regex: 'Utilities',
    Types: 'Utilities',
    Cache: 'Utilities',
    Guard: 'Utilities',
    Format: 'Utilities',
    Schema: 'Utilities',
    Browser: 'Web',
    Json: 'Data',
    Store: 'Data',
    Csv: 'Data',
    Log: 'Utilities',
    Ds: 'Data',
    Template: 'Web',
    Keyboard: 'Web',
    Semver: 'Utilities',
  };

  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Data', 'Math & Science', 'Web', 'Async & Logic', 'Security & Encoders', 'Utilities'];

  const filteredGroups = useMemo(() => {
    let result: Record<string, UtilityMeta[]> = {};
    const lowerQ = query.toLowerCase();

    Object.keys(groupedUtilities).forEach(module => {
      // Category filter
      const categoryMatch = activeCategory === 'All' || moduleCategories[module] === activeCategory;
      if (!categoryMatch) return;

      // Text search filter
      if (!lowerQ) {
        result[module] = groupedUtilities[module];
      } else {
        const filtered = groupedUtilities[module].filter(u => 
          u.name.toLowerCase().includes(lowerQ) || u.description.toLowerCase().includes(lowerQ)
        );
        if (filtered.length > 0) result[module] = filtered;
      }
    });
    return result;
  }, [query, groupedUtilities, activeCategory]);

  const selectedUtility = useMemo(() => 
    utilitiesData.find(u => u.id === selectedUtilityId) || utilitiesData[0], 
  [selectedUtilityId]);

  // Set default input when utility changes
  useEffect(() => {
    if (selectedUtility) {
      const match = selectedUtility.example.match(/\((.*)\)$/);
      let defaultArgs = match && match[1] && match[1] !== '...' ? match[1] : generateDummyArgs(selectedUtility.signature, selectedUtility.name);
      setInputArgs(defaultArgs);
      setCopiedImport(false);
      setCopiedSignature(false);
      setCopiedOutput(false);
      
      // Auto expand selected module
      setExpandedModules(prev => ({ ...prev, [selectedUtility.module]: true }));
    }
  }, [selectedUtility]);

  const toggleModule = (module: string) => {
    setExpandedModules(prev => ({ ...prev, [module]: !prev[module] }));
  };

  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    Object.keys(groupedUtilities).forEach(m => allExpanded[m] = true);
    setExpandedModules(allExpanded);
  };

  const collapseAll = () => {
    const allCollapsed: Record<string, boolean> = {};
    if (selectedUtility) {
      allCollapsed[selectedUtility.module] = true;
    }
    setExpandedModules(allCollapsed);
  };

  const handleCopy = async (text: string, setter: (val: boolean) => void) => {
    try {
      await navigator.clipboard.writeText(text);
      setter(true);
      setTimeout(() => setter(false), 2000);
    } catch (err) {}
  };

  const evaluateLive = () => {
    if (!inputArgs.trim()) return 'Waiting for arguments...';
    try {
      const fn = new Function('opti', `return opti.${selectedUtility.name}(${inputArgs})`);
      const result = fn(opti);
      
      if (typeof result === 'undefined') return 'undefined';
      if (result === null) return 'null';
      if (typeof result === 'string') return `"${result}"`;
      if (typeof result === 'function') return '[Function]';
      if (result instanceof Promise) return '[Promise] (Async results not fully supported in sync playground)';
      
      return JSON.stringify(result, (_key, value) => {
        if (typeof value === 'function') return '[Function]';
        return value;
      }, 2);
    } catch (err: any) {
      return `Error: ${err.message}`;
    }
  };

  const evaluatedOutput = evaluateLive();
  const isError = evaluatedOutput.startsWith('Error');

  const SidebarContent = () => (
    <>
      {/* Sticky Header Controls */}
      <div className="sticky top-0 bg-background/95 backdrop-blur z-20 pb-4 pt-1 space-y-3">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-muted" />
          </div>
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 429+ utilities..." 
            className="w-full bg-surface border border-border rounded-lg py-2 pl-10 pr-4 text-sm text-text-main placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-sm"
          />
        </div>

        {/* Category Pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 custom-scrollbar text-xs">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap font-medium ${
                activeCategory === cat 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'bg-surface border border-border text-muted hover:text-text-main hover:bg-surface/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Action controls */}
        <div className="flex items-center justify-between text-xs text-muted px-1">
          <span>{Object.keys(filteredGroups).length} Modules</span>
          <div className="flex gap-2">
            <button 
              onClick={expandAll}
              className="hover:text-primary transition-colors underline-offset-2 hover:underline"
            >
              Expand all
            </button>
            <span>•</span>
            <button 
              onClick={collapseAll}
              className="hover:text-primary transition-colors underline-offset-2 hover:underline"
            >
              Collapse
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3 pt-1">
        {Object.keys(filteredGroups).length === 0 ? (
          <div className="text-center py-8 text-muted text-sm">No utilities match your search.</div>
        ) : (
          Object.keys(filteredGroups).sort().map(module => {
            const count = filteredGroups[module].length;
            const isExpanded = expandedModules[module] || !!query;
            return (
              <div key={module} className="bg-surface/30 border border-border/60 rounded-lg overflow-hidden transition-colors">
                <button 
                  onClick={() => toggleModule(module)}
                  className="w-full flex items-center justify-between text-xs font-bold text-text-main uppercase tracking-wider px-3 py-2.5 bg-surface/60 hover:bg-surface transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span>{module}</span>
                    <span className="px-1.5 py-0.5 text-[10px] font-mono font-normal bg-primary/10 text-primary rounded-full border border-primary/20">
                      {count}
                    </span>
                  </div>
                  <ChevronRight size={14} className={`text-muted transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {isExpanded && (
                    <motion.ul 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="p-1.5 space-y-0.5 overflow-hidden"
                    >
                      {filteredGroups[module].map(utility => {
                        const isActive = selectedUtilityId === utility.id;
                        return (
                          <li key={utility.id} className="relative">
                            {isActive && (
                              <motion.div
                                layoutId="activeModulePill"
                                className="absolute inset-0 bg-primary/10 rounded-md border border-primary/20"
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                              />
                            )}
                            <button
                              onClick={() => {
                                setSelectedUtilityId(utility.id);
                                setIsMobileMenuOpen(false);
                              }}
                              className={`relative z-10 w-full text-left px-2.5 py-1.5 rounded-md text-xs font-medium transition-all flex items-center justify-between group ${
                                isActive 
                                  ? 'text-primary font-semibold' 
                                  : 'text-text-main hover:text-primary hover:bg-surface'
                              }`}
                            >
                              <span className="truncate">{utility.name}</span>
                            </button>
                          </li>
                        );
                      })}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        )}
      </div>
    </>
  );


  return (
    <div className="container mx-auto px-4 max-w-[1500px] flex flex-col md:flex-row gap-8 h-[calc(100vh-64px)] overflow-hidden">
      
      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center justify-between bg-surface border border-border p-4 rounded-xl shadow-sm shrink-0">
        <span className="font-medium text-text-main">Modules Explorer</span>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-text-main p-1.5 bg-background border border-border rounded-md hover:bg-surface transition-colors">
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-surface border border-border rounded-xl px-4 py-6 shadow-xl shrink-0 max-h-[50vh] flex flex-col"
          >
            <SidebarContent />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-72 lg:w-80 flex-col h-full border-r border-border pr-4 pt-6 shrink-0 pb-4 overflow-y-auto custom-scrollbar">
        <SidebarContent />
      </aside>


      {/* Main Content */}
      <main className="flex-1 h-full pt-6 overflow-y-auto pb-24 pr-4 custom-scrollbar">
        {selectedUtility ? (
          <motion.div 
            key={selectedUtility.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl space-y-8"
          >
            {/* Header */}
            <div className="border-b border-border pb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2.5 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold border border-primary/20 shadow-sm">
                  {selectedUtility.module}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-text-main mb-4">{selectedUtility.name}</h1>
              <p className="text-lg text-muted leading-relaxed">
                {selectedUtility.description}
              </p>
            </div>

            {/* Information Architecture Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="flex flex-col border-primary/10 hover:border-primary/30 transition-colors shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-text-main uppercase tracking-wider flex items-center gap-2">
                    <Code2 size={16} className="text-primary" /> Import
                  </h3>
                  <button 
                    onClick={() => handleCopy(`import { ${selectedUtility.name} } from "@dev_x_mohit/opti-kit";`, setCopiedImport)}
                    className="flex items-center gap-1.5 text-xs font-medium text-muted hover:text-primary transition-colors bg-surface px-2 py-1 rounded-md border border-border"
                  >
                    {copiedImport ? <><Check size={14} className="text-success"/> Copied</> : <><Copy size={14}/> Copy</>}
                  </button>
                </div>
                <div className="bg-code-bg border border-border rounded-lg p-4 font-mono text-sm text-text-main shadow-inner flex-1 flex items-center">
                  <span>
                    <span className="text-accent">import</span> {'{'} <span className="text-primary">{selectedUtility.name}</span> {'}'} <span className="text-accent">from</span> "@dev_x_mohit/opti-kit";
                  </span>
                </div>
              </Card>

              <Card className="flex flex-col border-primary/10 hover:border-primary/30 transition-colors shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-text-main uppercase tracking-wider flex items-center gap-2">
                    <Code2 size={16} className="text-primary" /> Signature
                  </h3>
                  <button 
                    onClick={() => handleCopy(selectedUtility.signature, setCopiedSignature)}
                    className="flex items-center gap-1.5 text-xs font-medium text-muted hover:text-primary transition-colors bg-surface px-2 py-1 rounded-md border border-border"
                  >
                    {copiedSignature ? <><Check size={14} className="text-success"/> Copied</> : <><Copy size={14}/> Copy</>}
                  </button>
                </div>
                <div className="bg-code-bg border border-border rounded-lg p-4 font-mono text-sm text-primary shadow-inner flex-1 flex items-center whitespace-pre-wrap">
                  {selectedUtility.signature}
                </div>
              </Card>
            </div>

            {/* Live Playground */}
            <div className="pt-8 border-t border-border">
              <h2 className="text-2xl font-bold text-text-main mb-6 flex items-center gap-2">
                <Play size={20} className="text-primary" /> Live Evaluator
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input Card */}
                <Card className="flex flex-col border-primary/20 p-0 overflow-hidden shadow-lg group">
                  <div className="bg-surface/50 border-b border-border px-4 py-3 flex items-center justify-between transition-colors group-hover:bg-surface/80">
                    <span className="text-sm font-medium text-text-main">Arguments Input</span>
                    <span className="text-xs font-mono text-muted bg-background px-2 py-1 rounded border border-border shadow-sm">
                      opti.<span className="text-primary">{selectedUtility.name}</span>(...)
                    </span>
                  </div>
                  <div className="p-4 flex-1 flex flex-col bg-background relative">
                    <textarea 
                      value={inputArgs}
                      onChange={(e) => setInputArgs(e.target.value)}
                      rows={5}
                      spellCheck="false"
                      className="w-full flex-1 bg-code-bg border border-border rounded-md px-4 py-3 text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all font-mono text-sm shadow-inner resize-none leading-relaxed"
                      placeholder="e.g. 'Hello World' or [1, 2, 3], 2"
                    />
                  </div>
                </Card>

                {/* Output Card */}
                <div className="flex flex-col bg-code-bg border border-border rounded-xl shadow-lg overflow-hidden relative group">
                  <div className="bg-surface/80 border-b border-border px-4 py-3 flex items-center justify-between backdrop-blur-md">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                      </div>
                      <span className="text-sm font-mono text-text-main font-medium">Output</span>
                    </div>
                    
                    <button 
                      onClick={() => handleCopy(evaluatedOutput, setCopiedOutput)}
                      className="opacity-0 group-hover:opacity-100 flex items-center gap-1.5 text-xs font-medium text-muted hover:text-primary transition-all bg-background px-2 py-1 rounded-md border border-border"
                    >
                      {copiedOutput ? <><Check size={14} className="text-success"/> Copied</> : <><Copy size={14}/> Copy Result</>}
                    </button>
                  </div>
                  <div className="p-4 flex-1 overflow-auto bg-code-bg">
                    <pre className={`font-mono text-sm leading-relaxed ${isError ? 'text-red-400' : 'text-success'}`}>
                      {evaluatedOutput}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

          </motion.div>
        ) : null}
      </main>
    </div>
  );
}
