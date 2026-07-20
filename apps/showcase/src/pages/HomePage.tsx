import React, { useState } from 'react';
import { Hero } from '../components/layout/Hero';
import { Stats } from '../components/layout/Stats';
import { Features } from '../components/layout/Features';
import { Footer } from '../components/layout/Footer';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Type, 
  Calculator, 
  Zap, 
  Shield, 
  Globe, 
  ArrowRight,
  Check,
  X,
  Sparkles,
  Copy,
  Terminal
} from 'lucide-react';

export function HomePage() {
  const navigate = useNavigate();
  const [copiedInstall, setCopiedInstall] = useState(false);

  const domainCategories = [
    {
      title: "Data Manipulation",
      desc: "High-performance tools for text, lists, and deep objects.",
      icon: Type,
      color: "from-blue-500/20 to-indigo-500/10",
      modules: [
        { name: "String", count: "45 utils", sample: "slugify, truncate, mask, interpolate" },
        { name: "Array", count: "40 utils", sample: "chunk, groupBy, uniqueBy, shuffle" },
        { name: "Object", count: "31 utils", sample: "deepMerge, pick, omit, flattenObject" },
        { name: "Collection", count: "4 utils", sample: "mapKeys, filterKeys, mergeMaps" },
        { name: "Tree", count: "2 utils", sample: "arrayToTree, treeToArray" },
      ]
    },
    {
      title: "Math & Science Engine",
      desc: "Precise mathematical, statistical, geometric, and unit conversions.",
      icon: Calculator,
      color: "from-purple-500/20 to-accent/10",
      modules: [
        { name: "Math", count: "32 utils", sample: "clamp, lerp, cosineSimilarity, gcd" },
        { name: "Number", count: "18 utils", sample: "formatCurrency, formatCompact, isPrime" },
        { name: "Statistics", count: "6 utils", sample: "median, variance, standardDeviation" },
        { name: "Geometry", count: "9 utils", sample: "distance2D, angleBetween, circleArea" },
        { name: "Units", count: "8 utils", sample: "celsiusToFahrenheit, milesToKilometers" },
      ]
    },
    {
      title: "Async & Flow Control",
      desc: "Concurrency limiters, retry policies, and promise utilities.",
      icon: Zap,
      color: "from-amber-500/20 to-orange-500/10",
      modules: [
        { name: "Async", count: "19 utils", sample: "retryWithBackoff, pMap, debounce" },
        { name: "Functional", count: "9 utils", sample: "pipe, compose, memoize, tap" },
        { name: "Events", count: "6 utils", sample: "EventEmitter, PubSub, eventBus" },
        { name: "Cache", count: "1 util", sample: "createLRUCache" },
      ]
    },
    {
      title: "Security & Encoders",
      desc: "Hashing, encoding, token generation, and data validations.",
      icon: Shield,
      color: "from-emerald-500/20 to-teal-500/10",
      modules: [
        { name: "Crypto", count: "10 utils", sample: "sha256, uuid, generateToken, fnv1a" },
        { name: "Encoding", count: "10 utils", sample: "base64Encode, hexEncode, utf8Decode" },
        { name: "Validate", count: "28 utils", sample: "isEmail, isStrongPassword, isJWT" },
      ]
    },
    {
      title: "Web & Isomorphic Helpers",
      desc: "Safe client DOM, storage, URL parsing, and type guards.",
      icon: Globe,
      color: "from-cyan-500/20 to-blue-500/10",
      modules: [
        { name: "DOM", count: "14 utils", sample: "copyToClipboard, setCookie, scrollToTop" },
        { name: "Storage", count: "1 util", sample: "safeStorage (11 methods)" },
        { name: "Url", count: "8 utils", sample: "buildUrl, stringifyQuery, parseUrl" },
        { name: "Date", count: "20 utils", sample: "relativeTime, addDays, isSameDay" },
        { name: "Regex", count: "5 utils", sample: "escapeRegExp, extractMatches" },
        { name: "Color", count: "3 utils", sample: "hexToRgb, rgbToHex, rgbToHsl" },
        { name: "Types", count: "5 utils", sample: "isNil, isObject, isDate" },
      ]
    }
  ];

  const comparison = [
    { feature: "Zero External Dependencies", opti: true, lodash: false, moment: false },
    { feature: "Full Native Tree-Shaking", opti: true, lodash: "Partial", moment: false },
    { feature: "Native TypeScript Types", opti: true, lodash: "External @types", moment: "External" },
    { feature: "Isomorphic CJS + ESM Dual", opti: true, lodash: false, moment: false },
    { feature: "Modern Async & Promise Utils", opti: true, lodash: false, moment: false },
    { feature: "Bundle Size Overhead", opti: "~30 KB (Tree-shakeable)", lodash: "~70 KB", moment: "~230 KB" },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("npm install @dev_x_mohit/opti-kit");
      setCopiedInstall(true);
      setTimeout(() => setCopiedInstall(false), 2000);
    } catch {}
  };

  return (
    <>
      <Hero />
      <Stats />
      
      {/* 25 Modules Overview Grid */}
      <section className="container mx-auto px-4 py-20 max-w-7xl border-t border-border/60">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
            <Sparkles size={13} /> Complete Ecosystem
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-text-main tracking-tight">
            Modular Domain Architecture
          </h2>
          <p className="text-muted text-base md:text-lg">
            25 domain-focused modules containing 328+ pure, zero-dependency utilities built for maximum tree-shaking performance.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {domainCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="bg-surface/50 border border-border/80 rounded-2xl p-6 hover:border-primary/40 transition-all flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${cat.color} border border-border/60 text-primary`}>
                      <Icon size={22} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-text-main">{cat.title}</h3>
                      <span className="text-xs text-muted font-mono">{cat.modules.length} modules</span>
                    </div>
                  </div>

                  <p className="text-xs text-muted mb-6 leading-relaxed">
                    {cat.desc}
                  </p>

                  <div className="space-y-2 mb-6">
                    {cat.modules.map(mod => (
                      <div 
                        key={mod.name} 
                        onClick={() => navigate(`/modules?q=${mod.name}`)}
                        className="p-2.5 rounded-lg bg-background/60 border border-border/40 hover:border-primary/40 hover:bg-surface transition-all cursor-pointer flex items-center justify-between group/mod"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-xs text-text-main group-hover/mod:text-primary transition-colors">{mod.name}</span>
                            <span className="text-[10px] font-mono text-muted bg-surface px-1.5 py-0.5 rounded border border-border">{mod.count}</span>
                          </div>
                          <div className="text-[11px] font-mono text-muted/80 truncate max-w-[200px] mt-0.5">{mod.sample}</div>
                        </div>
                        <ArrowRight size={13} className="text-muted opacity-0 group-hover/mod:opacity-100 group-hover/mod:text-primary transition-all" />
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => navigate('/modules')}
                  className="w-full py-2.5 border border-border hover:border-primary/40 rounded-xl text-xs font-semibold text-text-main hover:text-primary hover:bg-surface transition-all flex items-center justify-center gap-1.5"
                >
                  Explore All Utilities <ArrowRight size={13} />
                </button>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Comparison Section */}
      <section className="container mx-auto px-4 py-20 max-w-7xl border-t border-border/60">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-extrabold text-text-main tracking-tight">
            Why Modern Developers Choose OptiKit
          </h2>
          <p className="text-muted text-base md:text-lg">
            Say goodbye to bloated legacy libraries and outdated type definitions.
          </p>
        </div>

        <div className="overflow-x-auto bg-surface/50 border border-border/80 rounded-2xl shadow-xl">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface border-b border-border text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="p-4 pl-6">Feature</th>
                <th className="p-4 text-primary font-bold">OptiKit</th>
                <th className="p-4 text-muted">Lodash</th>
                <th className="p-4 text-muted">Moment.js</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-text-main">
              {comparison.map((item, i) => (
                <tr key={i} className="hover:bg-surface/40 transition-colors">
                  <td className="p-4 pl-6 font-medium">{item.feature}</td>
                  <td className="p-4 text-primary font-semibold">
                    {typeof item.opti === 'boolean' ? (
                      item.opti ? <Check size={18} className="text-success" /> : <X size={18} className="text-red-400" />
                    ) : item.opti}
                  </td>
                  <td className="p-4 text-muted">
                    {typeof item.lodash === 'boolean' ? (
                      item.lodash ? <Check size={18} className="text-success" /> : <X size={18} className="text-red-400" />
                    ) : item.lodash}
                  </td>
                  <td className="p-4 text-muted">
                    {typeof item.moment === 'boolean' ? (
                      item.moment ? <Check size={18} className="text-success" /> : <X size={18} className="text-red-400" />
                    ) : item.moment}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="bg-gradient-to-r from-surface via-background to-surface border border-primary/20 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          <div className="space-y-3 text-center md:text-left">
            <h3 className="text-2xl md:text-4xl font-extrabold text-text-main">Ready to optimize your codebase?</h3>
            <p className="text-muted text-base max-w-xl">Zero dependencies. Instant install. Tree-shakeable TypeScript utilities.</p>
          </div>
          <div className="bg-code-bg border border-border rounded-xl px-5 py-4 flex items-center gap-4 font-mono text-sm w-full md:w-auto shadow-inner justify-between">
            <div className="flex items-center gap-2">
              <Terminal size={16} className="text-primary shrink-0" />
              <span className="text-text-main">npm install @dev_x_mohit/opti-kit</span>
            </div>
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 bg-background border border-border hover:border-primary/40 rounded-lg text-xs font-sans text-muted hover:text-primary transition-all flex items-center gap-1.5 shrink-0"
            >
              {copiedInstall ? <><Check size={14} className="text-success" /> Copied</> : <><Copy size={14} /> Copy</>}
            </button>
          </div>
        </div>
      </section>

      <Features />
      <Footer />
    </>
  );
}

