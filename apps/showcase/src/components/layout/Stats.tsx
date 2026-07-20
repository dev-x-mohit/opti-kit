import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Box, Cpu, ShieldCheck, CheckCircle2, Zap } from 'lucide-react';

export function Stats() {
  const stats = [
    { label: "Handcrafted Modules", value: "25", icon: Layers, sub: "Isomorphic domain coverage" },
    { label: "Pure Utilities", value: "328+", icon: Box, sub: "Zero-dependency functions" },
    { label: "Unit Tests Passed", value: "306", icon: CheckCircle2, sub: "100% test suite pass rate" },
    { label: "Dependencies", value: "0", icon: Zap, sub: "Pure JS/TS implementation" },
    { label: "TypeScript Native", value: "100%", icon: ShieldCheck, sub: "Auto-generated DTS types" },
    { label: "ESM Dual Bundle", value: "~30 KB", icon: Cpu, sub: "Full tree-shaking support" },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="container mx-auto px-4 py-12 max-w-7xl">
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
      >
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={i} 
              variants={item} 
              className="bg-surface/60 border border-border/80 rounded-xl p-5 hover:border-primary/40 hover:bg-surface transition-all shadow-md group relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-black text-text-main group-hover:text-primary transition-colors">{stat.value}</span>
                <Icon size={18} className="text-primary/70 group-hover:text-primary transition-colors" />
              </div>
              <div className="text-xs font-semibold text-text-main mb-1">{stat.label}</div>
              <div className="text-[11px] text-muted leading-tight">{stat.sub}</div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

