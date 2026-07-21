import React, { useState } from 'react';
import { Hero } from '../components/layout/Hero';
import { Stats } from '../components/layout/Stats';
import { Features } from '../components/layout/Features';
import { Footer } from '../components/layout/Footer';
import { Card } from '../components/ui/Card';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, Check, Copy, Sparkles, Layers, ShieldCheck, 
  Cpu, Code2, CheckCircle2, XCircle, ArrowUpRight
} from 'lucide-react';

export function HomePage() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText('npm install @dev_x_mohit/opti-kit');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const moduleCategories = [
    { title: "String", count: "45 utils", desc: "Slugify, truncate, pad, interpolate, titleCase, HTML escaping & similarity" },
    { title: "Array", count: "40 utils", desc: "Chunk, unique, groupBy, partition, shuffle, sample, zip & diffing" },
    { title: "Math", count: "32 utils", desc: "Clamp, lerp, mean, median, stdDev, factorial, distance & vector ops" },
    { title: "Object", count: "31 utils", desc: "DeepClone, deepMerge, flatten, pick, omit, mapKeys & path getters" },
    { title: "Validation", count: "28 utils", desc: "isEmail, isUrl, isUuid, isPhone, isIP, isSemVer, isCreditCard & JWT" },
    { title: "Date", count: "20 utils", desc: "Relative time, formatters, add/sub days, leap year & quarter queries" },
    { title: "Async", count: "19 utils", desc: "Debounce, throttle, retry, delay, asyncPool, pMap & retryWithBackoff" },
    { title: "Number", count: "18 utils", desc: "Currency, compact format (1K/1M), ordinal, byte formatting & isPrime" },
  ];

  const comparison = [
    { feature: "Bundle Impact", opti: "~30 KB (Tree-shakeable)", legacy: "500 KB+ (Lodash/Moment)" },
    { feature: "Dependencies", opti: "0 Dependencies", legacy: "Dozens of transitive packages" },
    { feature: "TypeScript", opti: "100% Native TypeScript", legacy: "Requires @types patches" },
    { feature: "Module Formats", opti: "Native ESM & CommonJS", legacy: "Inconsistent CJS/ESM" },
    { feature: "Hydration & SSR", opti: "Zero Window Errors", legacy: "Requires SSR workarounds" },
  ];

  return (
    <div className="space-y-8">
      <Hero />
      <Stats />

      {/* Categories Showcase Section */}
      <section className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="text-center mb-12 space-y-3">
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold border border-primary/20 shadow-sm inline-flex items-center gap-1.5">
            <Layers size={13} /> 37 Hand-Crafted Modules
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-main tracking-tight">Explore the Utility Ecosystem</h2>
          <p className="text-muted max-w-2xl mx-auto text-base">
            Every module is isolated, side-effect free, and fully type-checked.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {moduleCategories.map((cat, i) => (
            <Card 
              key={i} 
              onClick={() => navigate(`/modules?q=${cat.title.toLowerCase()}`)}
              className="p-5 cursor-pointer border-primary/15 hover:border-primary/50 transition-all hover:-translate-y-1 shadow-sm group"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-text-main group-hover:text-primary transition-colors flex items-center gap-1">
                  {cat.title} <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <span className="text-[11px] font-mono font-semibold px-2 py-0.5 bg-primary/10 text-primary rounded-full border border-primary/20">
                  {cat.count}
                </span>
              </div>
              <p className="text-xs text-muted leading-relaxed">{cat.desc}</p>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <button 
            onClick={() => navigate('/modules')}
            className="text-xs sm:text-sm font-semibold text-primary hover:text-accent transition-colors inline-flex items-center gap-1.5 underline-offset-4 hover:underline"
          >
            View all 37 modules & 430 utilities <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* Comparison Section: OptiKit vs Legacy Monoliths */}
      <section className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center mb-14 space-y-3">
          <span className="px-3.5 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold border border-primary/20 shadow-sm inline-flex items-center gap-1.5">
            <Cpu size={14} /> Performance & Security Audit
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-main tracking-tight">OptiKit vs Legacy Monoliths</h2>
          <p className="text-muted max-w-2xl mx-auto text-base">
            See how OptiKit outperforms traditional utility libraries like Lodash, Moment, and Ramda across bundle impact, security, and developer experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Bundle Impact */}
          <Card className="p-6 border-primary/20 hover:border-primary/50 transition-all shadow-md space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-muted uppercase tracking-wider">Bundle Footprint</span>
                <span className="px-2 py-0.5 rounded-full bg-success/10 text-success text-xs font-mono font-semibold">99.8% Smaller</span>
              </div>
              
              <div className="space-y-2">
                <div className="bg-surface/80 p-3 rounded-xl border border-primary/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-success shrink-0" />
                    <span className="text-sm font-semibold text-text-main">OptiKit</span>
                  </div>
                  <span className="font-mono text-sm font-bold text-success">14 KB Gzip</span>
                </div>
                <div className="bg-surface/30 p-3 rounded-xl border border-border flex items-center justify-between opacity-80">
                  <div className="flex items-center gap-2">
                    <XCircle size={16} className="text-red-400 shrink-0" />
                    <span className="text-sm font-medium text-muted">Lodash / Moment</span>
                  </div>
                  <span className="font-mono text-sm font-bold text-red-400">520+ KB</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              OptiKit imports only the code you use, keeping your production bundle lightning fast.
            </p>
          </Card>

          {/* Card 2: Supply Chain Security */}
          <Card className="p-6 border-primary/20 hover:border-primary/50 transition-all shadow-md space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-muted uppercase tracking-wider">Security Rating</span>
                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-mono font-semibold">Socket Verified</span>
              </div>
              
              <div className="space-y-2">
                <div className="bg-surface/80 p-3 rounded-xl border border-primary/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-success shrink-0" />
                    <span className="text-sm font-semibold text-text-main">OptiKit</span>
                  </div>
                  <span className="font-mono text-sm font-bold text-success">100 / 100 Score</span>
                </div>
                <div className="bg-surface/30 p-3 rounded-xl border border-border flex items-center justify-between opacity-80">
                  <div className="flex items-center gap-2">
                    <XCircle size={16} className="text-red-400 shrink-0" />
                    <span className="text-sm font-medium text-muted">Legacy Utilities</span>
                  </div>
                  <span className="font-mono text-sm font-bold text-muted">Transitive Risk</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              0 external dependencies means zero supply-chain vulnerabilities and total security peace of mind.
            </p>
          </Card>

          {/* Card 3: Native TypeScript */}
          <Card className="p-6 border-primary/20 hover:border-primary/50 transition-all shadow-md space-y-5 flex flex-col justify-between md:col-span-2 lg:col-span-1">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-muted uppercase tracking-wider">Type System</span>
                <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-mono font-semibold">Native TS</span>
              </div>
              
              <div className="space-y-2">
                <div className="bg-surface/80 p-3 rounded-xl border border-primary/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-success shrink-0" />
                    <span className="text-sm font-semibold text-text-main">OptiKit</span>
                  </div>
                  <span className="font-mono text-sm font-bold text-success">Strict Types & Generics</span>
                </div>
                <div className="bg-surface/30 p-3 rounded-xl border border-border flex items-center justify-between opacity-80">
                  <div className="flex items-center gap-2">
                    <XCircle size={16} className="text-red-400 shrink-0" />
                    <span className="text-sm font-medium text-muted">Legacy Packages</span>
                  </div>
                  <span className="font-mono text-sm font-bold text-muted">Requires @types</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Built natively in TypeScript with complete `.d.ts` declaration maps for flawless editor auto-complete.
            </p>
          </Card>

        </div>
      </section>


      <Features />

      {/* CTA Installation Banner */}
      <section className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="relative rounded-3xl bg-gradient-to-r from-surface via-surface to-background border border-primary/30 p-8 sm:p-12 overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>
          
          <div className="space-y-3 text-center lg:text-left relative z-10">
            <div className="inline-flex items-center gap-1.5 text-primary text-xs font-semibold uppercase tracking-wider">
              <Sparkles size={14} /> Ready to Upgrade?
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-text-main">Build Faster with OptiKit</h3>
            <p className="text-muted text-sm sm:text-base max-w-xl">
              Install the zero-dependency utility suite today and start shipping smaller, faster bundles.
            </p>
          </div>

          <div className="relative z-10 w-full lg:w-auto flex flex-col sm:flex-row items-center gap-3">
            <div className="bg-code-bg border border-border rounded-xl px-5 py-3.5 flex items-center justify-between gap-4 font-mono text-xs sm:text-sm text-text-main shadow-inner w-full sm:w-auto">
              <span>npm install @dev_x_mohit/opti-kit</span>
              <button 
                onClick={handleCopy}
                className="text-muted hover:text-primary transition-colors"
                title="Copy command"
              >
                {copied ? <Check size={16} className="text-success" /> : <Copy size={16} />}
              </button>
            </div>
            
            <button
              onClick={() => navigate('/docs')}
              className="px-6 py-3.5 rounded-xl bg-primary text-white font-semibold text-xs sm:text-sm hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25 whitespace-nowrap w-full sm:w-auto flex items-center justify-center gap-2"
            >
              Get Started <ArrowRight size={16} />
            </button>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}

