import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  CheckCircle2, 
  Sparkles, 
  Code2, 
  Box 
} from 'lucide-react';

export function Features() {
  const featureList = [
    {
      title: "Zero External Dependencies",
      desc: "100% standalone implementation. Protects your app from supply-chain risks and heavy node_modules bloat.",
      icon: Zap,
      gradient: "from-amber-500/20 to-yellow-500/10",
      tag: "Pure JS/TS"
    },
    {
      title: "100% Tree-Shakeable",
      desc: "Import individual functions like slugify or chunk. Unused utilities are stripped from your bundle automatically.",
      icon: Layers,
      gradient: "from-green-500/20 to-emerald-500/10",
      tag: "sideEffects: false"
    },
    {
      title: "Native TypeScript Declarations",
      desc: "Built ground-up in TypeScript. Auto-inferred return types, strict type guards, and zero external @types requirement.",
      icon: ShieldCheck,
      gradient: "from-blue-500/20 to-cyan-500/10",
      tag: "Auto-Generated DTS"
    },
    {
      title: "Isomorphic CJS + ESM Output",
      desc: "Pre-compiled dual distribution. Runs seamlessly in Browser DOM, Node.js, Deno, Bun, and Serverless environments.",
      icon: Cpu,
      gradient: "from-purple-500/20 to-accent/10",
      tag: "Universal Engine"
    },
    {
      title: "306 Passed Unit Tests",
      desc: "Comprehensive Vitest coverage guaranteeing edge-case handling across strings, arrays, objects, and math.",
      icon: CheckCircle2,
      gradient: "from-teal-500/20 to-emerald-500/10",
      tag: "100% Pass Rate"
    },
    {
      title: "Lightweight (~30 KB Bundle)",
      desc: "Ultra-compact footprint designed to replace heavy legacy packages like Lodash, Moment, and Ramda.",
      icon: Box,
      gradient: "from-rose-500/20 to-pink-500/10",
      tag: "Ultra Compact"
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="container mx-auto px-4 py-24 max-w-7xl border-t border-border/60">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
          <Sparkles size={13} /> Built for Performance
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-text-main tracking-tight">
          Engineered for Modern Web Architecture
        </h2>
        <p className="text-muted text-base md:text-lg">
          OptiKit brings enterprise-grade reliability, strict typing, and zero runtime overhead to your frontend and backend projects.
        </p>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {featureList.map((feat, i) => {
          const Icon = feat.icon;
          return (
            <motion.div 
              key={i} 
              variants={item} 
              className="bg-surface/50 border border-border/80 rounded-2xl p-6 hover:border-primary/40 hover:bg-surface transition-all shadow-lg group relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${feat.gradient} border border-border/60 text-primary group-hover:scale-105 transition-transform`}>
                    <Icon size={22} />
                  </div>
                  <span className="text-[11px] font-mono text-muted bg-background px-2.5 py-1 rounded-full border border-border">
                    {feat.tag}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-text-main mb-2 group-hover:text-primary transition-colors">{feat.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{feat.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

