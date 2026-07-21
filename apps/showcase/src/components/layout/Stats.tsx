import React from 'react';
import { motion } from 'framer-motion';

export function Stats() {
  const stats = [
    { label: "Modules", value: "37" },
    { label: "Utilities", value: "429+" },
    { label: "Size (Gzip)", value: "16 KB" },
    { label: "Security Score", value: "100/100" },
    { label: "Dependencies", value: "0" },
    { label: "Unit Tests", value: "418" },
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
    <section className="container mx-auto px-4 py-16 max-w-7xl">
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
      >
        {stats.map((stat, i) => (
          <motion.div key={i} variants={item} className="bg-surface border border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors">
            <div className="text-3xl font-bold text-text-main mb-1">{stat.value}</div>
            <div className="text-sm font-medium text-muted uppercase tracking-wider">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
