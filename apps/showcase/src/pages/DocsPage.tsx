import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, Menu, X, Check, Copy, Terminal, 
  Zap, ShieldCheck, Cpu, Box, Sparkles, BookOpen, Layers, 
  Globe, Server, CheckCircle2, AlertCircle
} from 'lucide-react';
import { CodeBlock } from '../components/ui/CodeBlock';
import { Card } from '../components/ui/Card';

export function DocsPage() {
  const [activeTab, setActiveTab] = useState('getting-started');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [pkgManager, setPkgManager] = useState<'npm' | 'pnpm' | 'yarn' | 'bun'>('npm');
  const [copiedPkg, setCopiedPkg] = useState(false);

  const installCommands = {
    npm: 'npm install @dev_x_mohit/opti-kit',
    pnpm: 'pnpm add @dev_x_mohit/opti-kit',
    yarn: 'yarn add @dev_x_mohit/opti-kit',
    bun: 'bun add @dev_x_mohit/opti-kit',
  };

  const usageNamedCode = `import { slugify, chunk, clamp, isEmail } from "@dev_x_mohit/opti-kit";

// String utility
const slug = slugify("OptiKit Modern Utils!");
// → "optikit-modern-utils"

// Array utility
const groups = chunk([1, 2, 3, 4, 5, 6], 2);
// → [[1, 2], [3, 4], [5, 6]]

// Math utility
const clamped = clamp(15, 0, 10);
// → 10

// Validation
const valid = isEmail("user@example.com");
// → true`;

  const treeShakingCode = `// ❌ Legacy monolithic libraries import everything:
// import _ from "lodash"; 

// ✅ OptiKit imports ONLY what you use:
import { debounce } from "@dev_x_mohit/opti-kit";

// Your final bundle includes ONLY the debounce code (~300 bytes gzip)!`;

  const safeStorageCode = `import { safeStorage } from "@dev_x_mohit/opti-kit";

// Isomorphic storage with automatic JSON serialization & 1-hour expiration
safeStorage.setItem("user_session", { id: "usr_99", role: "admin" }, 3600000);

// Auto-parses JSON, returns null if expired or SSR environment
const session = safeStorage.getItem("user_session");`;

  const navSections = [
    {
      group: 'Getting Started',
      items: [
        { id: 'getting-started', label: 'Overview', icon: BookOpen },
        { id: 'installation', label: 'Installation', icon: Terminal },
        { id: 'quick-start', label: 'Quick Start', icon: Zap },
      ]
    },
    {
      group: 'Core Concepts',
      items: [
        { id: 'architecture', label: 'Architecture', icon: Cpu },
        { id: 'tree-shaking', label: 'Tree Shaking', icon: Layers },
        { id: 'isomorphic-storage', label: 'Safe Storage', icon: Box },
        { id: 'environments', label: 'Environments', icon: Globe },
      ]
    }
  ];

  const tocItems = [
    { id: 'getting-started', label: 'Overview' },
    { id: 'installation', label: 'Installation' },
    { id: 'quick-start', label: 'Quick Start' },
    { id: 'architecture', label: 'Architecture & Features' },
    { id: 'tree-shaking', label: 'Tree Shaking' },
    { id: 'isomorphic-storage', label: 'Isomorphic Safe Storage' },
    { id: 'environments', label: 'Environment Matrix' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const allIds = tocItems.map(item => item.id);
      let currentSection = allIds[0];
      
      for (const id of allIds) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 140) {
            currentSection = id;
          }
        }
      }
      setActiveTab(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setActiveTab(id);
    setIsMobileMenuOpen(false);
  };

  const handleCopyPkg = async () => {
    try {
      await navigator.clipboard.writeText(installCommands[pkgManager]);
      setCopiedPkg(true);
      setTimeout(() => setCopiedPkg(false), 2000);
    } catch {}
  };

  const SidebarContent = () => (
    <div className="space-y-6">
      {navSections.map((sec, idx) => (
        <div key={idx}>
          <h4 className="font-semibold text-text-main mb-2.5 uppercase tracking-wider text-[11px] px-2 text-muted/80 flex items-center gap-1.5">
            {sec.group}
          </h4>
          <ul className="space-y-1">
            {sec.items.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <li key={item.id}>
                  <button 
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-2.5 ${
                      isActive 
                        ? 'bg-primary/10 text-primary font-semibold shadow-sm border border-primary/20' 
                        : 'text-text-main hover:bg-surface hover:text-primary'
                    }`}
                  >
                    <Icon size={15} className={isActive ? 'text-primary' : 'text-muted'} />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto px-4 max-w-[1500px] flex flex-col md:flex-row gap-8 min-h-[calc(100vh-64px)] pb-12">
      
      {/* Mobile Header Bar */}
      <div className="md:hidden flex items-center justify-between bg-surface border border-border p-4 rounded-xl shadow-sm shrink-0 mt-4">
        <span className="font-medium text-text-main flex items-center gap-2">
          <BookOpen size={18} className="text-primary" /> Documentation
        </span>
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
            className="md:hidden overflow-hidden bg-surface border border-border rounded-xl px-4 py-6 shadow-xl shrink-0 flex flex-col"
          >
            <SidebarContent />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Navigation Sidebar (Left) */}
      <aside className="hidden md:flex w-64 lg:w-72 flex-col h-[calc(100vh-64px)] sticky top-16 border-r border-border pr-6 pt-6 shrink-0 pb-4 overflow-y-auto custom-scrollbar">
        <SidebarContent />
      </aside>

      {/* Main Documentation Content (Center) */}
      <main className="flex-1 max-w-4xl pt-6 pr-0 lg:pr-6 space-y-16">
        
        {/* Section 1: Overview */}
        <section id="getting-started" className="scroll-mt-24 border-b border-border/60 pb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold border border-primary/20 shadow-sm flex items-center gap-1.5">
              <Sparkles size={13} /> Official Documentation
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-text-main tracking-tight mb-4 leading-tight">
            Getting Started with OptiKit
          </h1>
          <p className="text-lg text-muted leading-relaxed mb-6">
            OptiKit is a zero-dependency, ultra-lightweight, and fully tree-shakeable utility library engineered for modern TypeScript and JavaScript applications. Designed to replace legacy monoliths like Lodash, it ships 37 modules and 429+ utilities in a dual CJS/ESM package.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="bg-surface/50 border-primary/20 p-4">
              <div className="flex items-center gap-2 text-primary font-bold text-sm mb-1">
                <ShieldCheck size={16} /> 0 Dependencies
              </div>
              <p className="text-xs text-muted">Pure standard Web APIs and JavaScript math. No transitive dependency vulnerabilities.</p>
            </Card>
            <Card className="bg-surface/50 border-primary/20 p-4">
              <div className="flex items-center gap-2 text-primary font-bold text-sm mb-1">
                <Layers size={16} /> Tree-Shakeable
              </div>
              <p className="text-xs text-muted">Modern ESM side-effect free builds guarantee bundlers strip unimported functions.</p>
            </Card>
            <Card className="bg-surface/50 border-primary/20 p-4">
              <div className="flex items-center gap-2 text-primary font-bold text-sm mb-1">
                <Cpu size={16} /> 100% Type-Safe
              </div>
              <p className="text-xs text-muted">Natively built in TypeScript with full strict generics and complete `.d.ts` declarations.</p>
            </Card>
          </div>
        </section>

        {/* Section 2: Installation */}
        <section id="installation" className="scroll-mt-24 border-b border-border/60 pb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-text-main mb-3 flex items-center gap-2">
            <Terminal className="text-primary" size={24} /> Installation
          </h2>
          <p className="text-muted text-base mb-6">
            Install `@dev_x_mohit/opti-kit` into your project using your preferred package manager:
          </p>

          {/* Interactive Package Manager Tabs */}
          <div className="bg-code-bg border border-border rounded-xl overflow-hidden shadow-lg">
            <div className="bg-surface/80 border-b border-border px-4 py-2.5 flex items-center justify-between">
              <div className="flex gap-1">
                {(['npm', 'pnpm', 'yarn', 'bun'] as const).map(mgr => (
                  <button
                    key={mgr}
                    onClick={() => setPkgManager(mgr)}
                    className={`px-3 py-1 rounded-md text-xs font-mono transition-all ${
                      pkgManager === mgr 
                        ? 'bg-primary text-white font-semibold shadow-sm' 
                        : 'text-muted hover:text-text-main hover:bg-surface'
                    }`}
                  >
                    {mgr}
                  </button>
                ))}
              </div>
              <button
                onClick={handleCopyPkg}
                className="flex items-center gap-1.5 text-xs text-muted hover:text-primary bg-background px-2.5 py-1 rounded-md border border-border transition-colors font-medium"
              >
                {copiedPkg ? <><Check size={14} className="text-success" /> Copied</> : <><Copy size={14} /> Copy</>}
              </button>
            </div>
            <div className="p-4 font-mono text-sm text-text-main overflow-x-auto">
              <span className="text-muted">$</span> <span className="text-primary">{installCommands[pkgManager]}</span>
            </div>
          </div>
        </section>

        {/* Section 3: Quick Start */}
        <section id="quick-start" className="scroll-mt-24 border-b border-border/60 pb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-text-main mb-3 flex items-center gap-2">
            <Zap className="text-primary" size={24} /> Quick Start
          </h2>
          <p className="text-muted text-base mb-6">
            OptiKit exports pure functions directly from the root package. Import only what you need:
          </p>

          <CodeBlock code={usageNamedCode} language="typescript" />
        </section>

        {/* Section 4: Architecture */}
        <section id="architecture" className="scroll-mt-24 border-b border-border/60 pb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-text-main mb-3 flex items-center gap-2">
            <Cpu className="text-primary" size={24} /> Architecture & Features
          </h2>
          <p className="text-muted text-base mb-6">
            OptiKit follows strict design principles to ensure maximum performance and seamless integration across modern toolchains.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-5 border-primary/20 space-y-2">
              <h3 className="text-base font-bold text-text-main flex items-center gap-2">
                <Box size={18} className="text-primary" /> Dual CJS & ESM Builds
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                Bundled with `tsup`, OptiKit delivers both standard ES Modules (`dist/index.mjs`) and CommonJS (`dist/index.js`) with complete source maps.
              </p>
            </Card>

            <Card className="p-5 border-primary/20 space-y-2">
              <h3 className="text-base font-bold text-text-main flex items-center gap-2">
                <ShieldCheck size={18} className="text-primary" /> Pure & Side-Effect Free
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                Configured with `"sideEffects": false` in `package.json`. Bundlers like Webpack, Vite, and Rollup can safely prune unused code.
              </p>
            </Card>
          </div>
        </section>

        {/* Section 5: Tree Shaking */}
        <section id="tree-shaking" className="scroll-mt-24 border-b border-border/60 pb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-text-main mb-3 flex items-center gap-2">
            <Layers className="text-primary" size={24} /> Optimal Tree Shaking
          </h2>
          <p className="text-muted text-base mb-6">
            Unlike legacy utility packages that pull in hundreds of kilobytes of unused dependencies, OptiKit's modular design ensures that only the code you actually import enters your final JavaScript bundle:
          </p>

          <CodeBlock code={treeShakingCode} language="typescript" />
        </section>

        {/* Section 6: Isomorphic Safe Storage */}
        <section id="isomorphic-storage" className="scroll-mt-24 border-b border-border/60 pb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-text-main mb-3 flex items-center gap-2">
            <Box className="text-primary" size={24} /> Isomorphic Safe Storage
          </h2>
          <p className="text-muted text-base mb-6">
            OptiKit provides `safeStorage`, a zero-throw, isomorphic wrapper over `localStorage` and `sessionStorage` with built-in JSON parsing, expiry timers, and graceful SSR fallback:
          </p>

          <CodeBlock code={safeStorageCode} language="typescript" />
        </section>

        {/* Section 7: Environment Matrix */}
        <section id="environments" className="scroll-mt-24 pb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-text-main mb-3 flex items-center gap-2">
            <Globe className="text-primary" size={24} /> Environment Compatibility Matrix
          </h2>
          <p className="text-muted text-base mb-6">
            OptiKit is tested and verified across all modern JavaScript runtimes:
          </p>

          <div className="overflow-x-auto border border-border rounded-xl shadow-md">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-surface border-b border-border text-xs uppercase tracking-wider text-muted font-semibold">
                  <th className="p-3.5">Environment</th>
                  <th className="p-3.5">Support Level</th>
                  <th className="p-3.5">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 font-mono text-xs">
                <tr className="hover:bg-surface/40 transition-colors">
                  <td className="p-3.5 font-bold text-text-main flex items-center gap-2">
                    <Globe size={16} className="text-primary" /> Modern Browsers
                  </td>
                  <td className="p-3.5 text-success font-semibold flex items-center gap-1.5">
                    <CheckCircle2 size={15} /> 100% Full Support
                  </td>
                  <td className="p-3.5 text-muted font-sans">Chrome, Firefox, Safari, Edge</td>
                </tr>
                <tr className="hover:bg-surface/40 transition-colors">
                  <td className="p-3.5 font-bold text-text-main flex items-center gap-2">
                    <Server size={16} className="text-primary" /> Node.js
                  </td>
                  <td className="p-3.5 text-success font-semibold flex items-center gap-1.5">
                    <CheckCircle2 size={15} /> 100% Full Support
                  </td>
                  <td className="p-3.5 text-muted font-sans">Node.js 18.x, 20.x, 22.x, 24.x</td>
                </tr>
                <tr className="hover:bg-surface/40 transition-colors">
                  <td className="p-3.5 font-bold text-text-main flex items-center gap-2">
                    <Zap size={16} className="text-primary" /> Bun & Deno
                  </td>
                  <td className="p-3.5 text-success font-semibold flex items-center gap-1.5">
                    <CheckCircle2 size={15} /> 100% Full Support
                  </td>
                  <td className="p-3.5 text-muted font-sans">Native ESM import compatibility</td>
                </tr>
                <tr className="hover:bg-surface/40 transition-colors">
                  <td className="p-3.5 font-bold text-text-main flex items-center gap-2">
                    <Layers size={16} className="text-primary" /> Next.js / SSR
                  </td>
                  <td className="p-3.5 text-success font-semibold flex items-center gap-1.5">
                    <CheckCircle2 size={15} /> Safe Hydration
                  </td>
                  <td className="p-3.5 text-muted font-sans">Zero window/document errors during server render</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </main>

      {/* Right Table of Contents (Desktop Sticky TOC) */}
      <aside className="hidden lg:block w-56 pt-6 shrink-0">
        <div className="sticky top-20 border-l border-border pl-4 space-y-3">
          <h4 className="font-semibold text-text-main text-xs uppercase tracking-wider text-muted">
            On this page
          </h4>
          <ul className="space-y-2 text-xs">
            {tocItems.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left transition-colors ${
                    activeTab === item.id 
                      ? 'text-primary font-semibold border-l-2 border-primary -ml-[18px] pl-4' 
                      : 'text-muted hover:text-text-main'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

    </div>
  );
}

