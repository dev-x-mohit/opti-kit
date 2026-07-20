import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Layers, Cpu, Box, Zap, Globe, Repeat, CheckCircle2 } from 'lucide-react';
import { Card } from '../ui/Card';

export function Features() {
  const featureList = [
    {
      icon: ShieldCheck,
      title: "Zero Dependencies",
      description: "0 external third-party packages. Immune to transitive dependency vulnerabilities and supply-chain attacks."
    },
    {
      icon: Layers,
      title: "Tree-Shakeable ESM",
      description: "Ships with 'sideEffects: false'. Modern bundlers prune unused functions automatically from your production build."
    },
    {
      icon: Cpu,
      title: "100% Native TypeScript",
      description: "Built strictly in TypeScript with full type safety, deep generics, auto-complete, and zero '@types' packages needed."
    },
    {
      icon: Repeat,
      title: "Dual Package Export",
      description: "Dual CJS and ESM format built via tsup. Works out of the box in legacy Node.js and modern ES Modules."
    },
    {
      icon: Box,
      title: "Isomorphic Safe Storage",
      description: "Includes zero-throw `safeStorage` wrapper for localStorage & sessionStorage with JSON parsing & expiration timers."
    },
    {
      icon: Globe,
      title: "Cross-Platform Verified",
      description: "Fully tested and operational across Browsers, Node.js 18-24, Bun, Deno, and Next.js / React SSR hydration."
    }
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
    <section className="container mx-auto px-4 py-20 max-w-7xl">
      <div className="text-center mb-16 space-y-3">
        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold border border-primary/20 shadow-sm inline-flex items-center gap-1.5">
          <Zap size={13} /> Built for Speed & Precision
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-text-main tracking-tight">Why Engineering Teams Choose OptiKit</h2>
        <p className="text-muted max-w-2xl mx-auto text-base">
          A modern utility suite engineered to solve everyday developer problems with zero bloat and absolute reliability.
        </p>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {featureList.map((feat, i) => {
          const Icon = feat.icon;
          return (
            <motion.div key={i} variants={item}>
              <Card className="p-6 h-full flex flex-col justify-between border-primary/15 hover:border-primary/40 transition-colors shadow-md group">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-text-main">{feat.title}</h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">{feat.description}</p>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

