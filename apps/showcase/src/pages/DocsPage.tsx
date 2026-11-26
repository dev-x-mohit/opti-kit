import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, Check, Copy, Terminal, Zap, ShieldCheck, Cpu, Box,
  Sparkles, BookOpen, Layers, Globe, Server, CheckCircle2, Bot,
} from 'lucide-react';
import { CodeBlock } from '../components/ui/CodeBlock';
import { Card } from '../components/ui/Card';
import { TOTAL_MODULES_COUNT, TOTAL_UTILITIES_COUNT } from '../lib/moduleMeta';
import { copyToClipboard } from '../lib/copyToClipboard';

const tocItems = [
  { id: 'getting-started', label: 'Overview' },
  { id: 'installation', label: 'Installation' },
  { id: 'quick-start', label: 'Quick Start' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'tree-shaking', label: 'Tree Shaking' },
  { id: 'isomorphic-storage', label: 'Safe Storage' },
  { id: 'mcp-server', label: 'MCP Server' },
  { id: 'environments', label: 'Environments' },
];

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

  const treeShakingCode = `// Legacy monolithic libraries import everything:
// import _ from "lodash";

// OptiKit imports ONLY what you use:
import { debounce } from "@dev_x_mohit/opti-kit";

// Or import directly from a subpath module:
import { debounce } from "@dev_x_mohit/opti-kit/async";`;

  const safeStorageCode = `import { safeStorage } from "@dev_x_mohit/opti-kit";

// Isomorphic storage with automatic JSON serialization & 1-hour expiration
safeStorage.setItem("user_session", { id: "usr_99", role: "admin" }, 3600000);

// Auto-parses JSON, returns null if expired or SSR environment
const session = safeStorage.getItem("user_session");`;

  const mcpConfigCode = `{
  "mcpServers": {
    "opti-kit": {
      "command": "npx",
      "args": ["-y", "@dev_x_mohit/opti-kit-mcp"]
    }
  }
}`;

  const navSections = [
    {
      group: 'Getting Started',
      items: [
        { id: 'getting-started', label: 'Overview', icon: BookOpen },
        { id: 'installation', label: 'Installation', icon: Terminal },
        { id: 'quick-start', label: 'Quick Start', icon: Zap },
      ],
    },
    {
      group: 'Core Concepts',
      items: [
        { id: 'architecture', label: 'Architecture', icon: Cpu },
        { id: 'tree-shaking', label: 'Tree Shaking', icon: Layers },
        { id: 'isomorphic-storage', label: 'Safe Storage', icon: Box },
        { id: 'mcp-server', label: 'MCP Server', icon: Bot },
        { id: 'environments', label: 'Environments', icon: Globe },
      ],
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const allIds = tocItems.map((item) => item.id);
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

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 84;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setActiveTab(id);
    setIsMobileMenuOpen(false);
  };

  const handleCopyPkg = async () => {
    const ok = await copyToClipboard(installCommands[pkgManager]);
    if (ok) {
      setCopiedPkg(true);
      setTimeout(() => setCopiedPkg(false), 1800);
    }
  };

  const SidebarContent = () => (
    <div className="space-y-6">
      {navSections.map((sec, idx) => (
        <div key={idx}>
          <h4 className="font-mono font-semibold mb-2 uppercase tracking-wider text-[11px] px-2 text-[var(--text-faint)]">
            {sec.group}
          </h4>
          <ul className="space-y-1">
            {sec.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-2.5 cursor-pointer ${
                      isActive
                        ? 'bg-[var(--primary-soft)] text-[var(--primary)] font-semibold'
                        : 'text-[var(--text-muted)] hover:bg-[var(--surface)] hover:text-[var(--text)]'
                    }`}
                  >
                    <Icon size={15} className={isActive ? 'text-[var(--primary)]' : 'text-[var(--text-faint)]'} />
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
    <div className="mx-auto px-4 sm:px-6 max-w-[1320px] w-full flex flex-col md:flex-row gap-8 min-h-[calc(100vh-60px)] pb-16">
      {/* Mobile Header Bar */}
      <div className="md:hidden flex items-center justify-between bg-[var(--surface)] border border-[var(--border)] p-3.5 rounded-xl mt-4">
        <span className="font-medium text-sm text-[var(--text)] flex items-center gap-2">
          <BookOpen size={16} className="text-[var(--primary)]" /> Documentation
        </span>
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle documentation menu"
          className="text-[var(--text)] p-1.5 bg-[var(--bg)] border border-[var(--border)] rounded-md cursor-pointer"
        >
          {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-[var(--surface)] border border-[var(--border)] rounded-xl px-4 py-5"
          >
            <SidebarContent />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Navigation Sidebar (Left) */}
      <aside className="hidden md:flex w-60 lg:w-64 flex-col h-[calc(100vh-60px)] sticky top-[60px] border-r border-[var(--border)] pr-5 pt-8 shrink-0 pb-4 overflow-y-auto">
        <SidebarContent />
      </aside>

      {/* Main Documentation Content (Center) */}
      <main className="flex-1 max-w-3xl pt-8 space-y-14 min-w-0">
        {/* Section 1: Overview */}
        <section id="getting-started" className="scroll-mt-24 border-b border-[var(--border)] pb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-1 bg-[var(--primary-soft)] text-[var(--primary)] rounded-full text-xs font-mono font-medium inline-flex items-center gap-1.5">
              <Sparkles size={13} /> Documentation
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text)] tracking-tight mb-4">
            Getting Started with OptiKit
          </h1>
          <p className="text-base text-[var(--text-muted)] leading-relaxed mb-6 prose-readable">
            OptiKit is a zero-dependency, ultra-lightweight, and fully tree-shakeable utility library engineered for modern TypeScript and JavaScript applications. It ships {TOTAL_MODULES_COUNT} modules and {TOTAL_UTILITIES_COUNT} utilities in a dual CJS/ESM package.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card hoverable={false} className="p-4">
              <div className="flex items-center gap-2 text-[var(--primary)] font-semibold text-sm mb-1.5">
                <ShieldCheck size={16} /> 0 Dependencies
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Pure standard Web APIs and JavaScript. No transitive dependency vulnerabilities.
              </p>
            </Card>
            <Card hoverable={false} className="p-4">
              <div className="flex items-center gap-2 text-[var(--primary)] font-semibold text-sm mb-1.5">
                <Layers size={16} /> Tree-Shakeable
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Side-effect free ESM builds ensure bundlers strip all unimported functions.
              </p>
            </Card>
            <Card hoverable={false} className="p-4">
              <div className="flex items-center gap-2 text-[var(--primary)] font-semibold text-sm mb-1.5">
                <Cpu size={16} /> 100% Type-Safe
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Natively authored in strict TypeScript with complete `.d.ts` declarations.
              </p>
            </Card>
          </div>
        </section>

        {/* Section 2: Installation */}
        <section id="installation" className="scroll-mt-24 border-b border-[var(--border)] pb-10">
          <h2 className="text-2xl font-bold text-[var(--text)] mb-3 flex items-center gap-2">
            <Terminal className="text-[var(--primary)]" size={22} /> Installation
          </h2>
          <p className="text-[var(--text-muted)] text-sm sm:text-base mb-5">
            Install <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-[var(--surface-2)] border border-[var(--border)]">@dev_x_mohit/opti-kit</code> using your preferred package manager:
          </p>

          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden">
            <div className="bg-[var(--surface-2)]/70 border-b border-[var(--border)] px-4 py-2 flex items-center justify-between">
              <div className="flex gap-1">
                {(['npm', 'pnpm', 'yarn', 'bun'] as const).map((mgr) => (
                  <button
                    key={mgr}
                    type="button"
                    onClick={() => setPkgManager(mgr)}
                    className={`px-3 py-1 rounded-md text-xs font-mono transition-colors cursor-pointer ${
                      pkgManager === mgr
                        ? 'bg-[var(--primary)] text-white font-semibold'
                        : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface)]'
                    }`}
                  >
                    {mgr}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={handleCopyPkg}
                className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text)] bg-[var(--surface)] px-2.5 py-1 rounded-md border border-[var(--border)] transition-colors font-medium cursor-pointer"
              >
                {copiedPkg ? (
                  <>
                    <Check size={13} className="text-[var(--success)]" /> Copied
                  </>
                ) : (
                  <>
                    <Copy size={13} /> Copy
                  </>
                )}
              </button>
            </div>
            <div className="p-4 font-mono text-sm text-[var(--text)] overflow-x-auto bg-[var(--bg-subtle)]">
              <span className="text-[var(--text-faint)]">$</span>{' '}
              <span className="text-[var(--primary)]">{installCommands[pkgManager]}</span>
            </div>
          </div>
        </section>

        {/* Section 3: Quick Start */}
        <section id="quick-start" className="scroll-mt-24 border-b border-[var(--border)] pb-10">
          <h2 className="text-2xl font-bold text-[var(--text)] mb-3 flex items-center gap-2">
            <Zap className="text-[var(--primary)]" size={22} /> Quick Start
          </h2>
          <p className="text-[var(--text-muted)] text-sm sm:text-base mb-5">
            OptiKit exports pure functions directly from the root package. Import only what you need:
          </p>
          <CodeBlock code={usageNamedCode} language="typescript" filename="example.ts" />
        </section>

        {/* Section 4: Architecture */}
        <section id="architecture" className="scroll-mt-24 border-b border-[var(--border)] pb-10">
          <h2 className="text-2xl font-bold text-[var(--text)] mb-3 flex items-center gap-2">
            <Cpu className="text-[var(--primary)]" size={22} /> Architecture & Features
          </h2>
          <p className="text-[var(--text-muted)] text-sm sm:text-base mb-5">
            OptiKit follows strict design principles to ensure maximum performance across modern toolchains.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card hoverable={false} className="p-5 space-y-2">
              <h3 className="text-sm font-semibold text-[var(--text)] flex items-center gap-2">
                <Box size={16} className="text-[var(--primary)]" /> Dual CJS & ESM Builds
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Bundled with tsup, OptiKit delivers both standard ES Modules (`.mjs`) and CommonJS (`.js`) with complete type declarations.
              </p>
            </Card>
            <Card hoverable={false} className="p-5 space-y-2">
              <h3 className="text-sm font-semibold text-[var(--text)] flex items-center gap-2">
                <ShieldCheck size={16} className="text-[var(--primary)]" /> Pure & Side-Effect Free
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Configured with `"sideEffects": false` in `package.json`. Bundlers like Vite, Rollup, and Webpack safely prune unused code.
              </p>
            </Card>
          </div>
        </section>

        {/* Section 5: Tree Shaking */}
        <section id="tree-shaking" className="scroll-mt-24 border-b border-[var(--border)] pb-10">
          <h2 className="text-2xl font-bold text-[var(--text)] mb-3 flex items-center gap-2">
            <Layers className="text-[var(--primary)]" size={22} /> Optimal Tree Shaking
          </h2>
          <p className="text-[var(--text-muted)] text-sm sm:text-base mb-5">
            Only the functions you actually import enter your production bundle—whether you import from the root or via module subpaths:
          </p>
          <CodeBlock code={treeShakingCode} language="typescript" filename="tree-shaking.ts" />
        </section>

        {/* Section 6: Isomorphic Safe Storage */}
        <section id="isomorphic-storage" className="scroll-mt-24 border-b border-[var(--border)] pb-10">
          <h2 className="text-2xl font-bold text-[var(--text)] mb-3 flex items-center gap-2">
            <Box className="text-[var(--primary)]" size={22} /> Isomorphic Safe Storage
          </h2>
          <p className="text-[var(--text-muted)] text-sm sm:text-base mb-5">
            `safeStorage` provides a zero-throw, SSR-safe wrapper over Web Storage with built-in JSON serialization and TTL expiration:
          </p>
          <CodeBlock code={safeStorageCode} language="typescript" filename="storage.ts" />
        </section>

        {/* Section 7: MCP Server */}
        <section id="mcp-server" className="scroll-mt-24 border-b border-[var(--border)] pb-10">
          <h2 className="text-2xl font-bold text-[var(--text)] mb-3 flex items-center gap-2">
            <Bot className="text-[var(--primary)]" size={22} /> Agentic MCP Server
          </h2>
          <p className="text-[var(--text-muted)] text-sm sm:text-base mb-5">
            Run `@dev_x_mohit/opti-kit-mcp` as a local stdio Model Context Protocol server to give AI agents 29 deterministic compute tools (deep diff, RFC 6902 patch, checksums, cron, codecs, compression, and more):
          </p>
          <CodeBlock code={mcpConfigCode} language="json" filename="mcp-config.json" />
        </section>

        {/* Section 8: Environment Matrix */}
        <section id="environments" className="scroll-mt-24 pb-4">
          <h2 className="text-2xl font-bold text-[var(--text)] mb-3 flex items-center gap-2">
            <Globe className="text-[var(--primary)]" size={22} /> Environment Compatibility
          </h2>
          <p className="text-[var(--text-muted)] text-sm sm:text-base mb-5">
            Verified across modern JavaScript runtimes:
          </p>

          <div className="overflow-x-auto border border-[var(--border)] rounded-xl bg-[var(--surface)]">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-[var(--surface-2)]/70 border-b border-[var(--border)] text-[11px] uppercase tracking-wider text-[var(--text-faint)] font-mono">
                  <th className="p-3.5">Environment</th>
                  <th className="p-3.5">Support</th>
                  <th className="p-3.5">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]/60 text-xs">
                <tr className="hover:bg-[var(--surface-2)]/40 transition-colors">
                  <td className="p-3.5 font-semibold text-[var(--text)]">
                    <span className="inline-flex items-center gap-2"><Globe size={15} className="text-[var(--primary)]" /> Modern Browsers</span>
                  </td>
                  <td className="p-3.5 text-[var(--success)] font-mono font-medium">
                    <span className="inline-flex items-center gap-1.5"><CheckCircle2 size={14} /> Full Support</span>
                  </td>
                  <td className="p-3.5 text-[var(--text-muted)]">Chrome, Firefox, Safari, Edge</td>
                </tr>
                <tr className="hover:bg-[var(--surface-2)]/40 transition-colors">
                  <td className="p-3.5 font-semibold text-[var(--text)]">
                    <span className="inline-flex items-center gap-2"><Server size={15} className="text-[var(--primary)]" /> Node.js</span>
                  </td>
                  <td className="p-3.5 text-[var(--success)] font-mono font-medium">
                    <span className="inline-flex items-center gap-1.5"><CheckCircle2 size={14} /> Full Support</span>
                  </td>
                  <td className="p-3.5 text-[var(--text-muted)]">Node.js 18.x, 20.x, 22.x, 24.x</td>
                </tr>
                <tr className="hover:bg-[var(--surface-2)]/40 transition-colors">
                  <td className="p-3.5 font-semibold text-[var(--text)]">
                    <span className="inline-flex items-center gap-2"><Zap size={15} className="text-[var(--primary)]" /> Bun, Deno & Edge</span>
                  </td>
                  <td className="p-3.5 text-[var(--success)] font-mono font-medium">
                    <span className="inline-flex items-center gap-1.5"><CheckCircle2 size={14} /> Full Support</span>
                  </td>
                  <td className="p-3.5 text-[var(--text-muted)]">Native ESM & Web Standards</td>
                </tr>
                <tr className="hover:bg-[var(--surface-2)]/40 transition-colors">
                  <td className="p-3.5 font-semibold text-[var(--text)]">
                    <span className="inline-flex items-center gap-2"><Layers size={15} className="text-[var(--primary)]" /> Next.js / SSR</span>
                  </td>
                  <td className="p-3.5 text-[var(--success)] font-mono font-medium">
                    <span className="inline-flex items-center gap-1.5"><CheckCircle2 size={14} /> Safe Hydration</span>
                  </td>
                  <td className="p-3.5 text-[var(--text-muted)]">Zero window/document errors on server render</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Right Table of Contents (Desktop Sticky TOC) */}
      <aside className="hidden lg:block w-52 pt-8 shrink-0">
        <div className="sticky top-20 border-l border-[var(--border)] pl-4 space-y-3">
          <h4 className="font-mono font-semibold text-[11px] uppercase tracking-wider text-[var(--text-faint)]">
            On this page
          </h4>
          <ul className="space-y-2 text-xs">
            {tocItems.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left transition-colors cursor-pointer ${
                    activeTab === item.id
                      ? 'text-[var(--primary)] font-semibold border-l-2 border-[var(--primary)] -ml-[17px] pl-4'
                      : 'text-[var(--text-muted)] hover:text-[var(--text)]'
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
