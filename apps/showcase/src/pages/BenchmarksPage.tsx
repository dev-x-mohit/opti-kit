import React from 'react';
import { motion } from 'framer-motion';
import { Zap, TrendingUp, Cpu, Server } from 'lucide-react';
import { Card } from '../components/ui/Card';

export function BenchmarksPage() {
  const benchmarks = [
    { name: 'chunk', category: 'Array', opti: '46,453 ops/sec', lodash: '42,359 ops/sec', multiplier: '1.10x faster', winner: 'OptiKit' },
    { name: 'unique / uniq', category: 'Array', opti: '2,762 ops/sec', lodash: '2,545 ops/sec', multiplier: '1.09x faster', winner: 'OptiKit' },
    { name: 'intersection', category: 'Array', opti: '779 ops/sec', lodash: '375 ops/sec', multiplier: '2.07x faster', winner: 'OptiKit' },
    { name: 'deepClone / cloneDeep', category: 'Object', opti: '658,225 ops/sec', lodash: '103,509 ops/sec', multiplier: '6.36x faster', winner: 'OptiKit' },
    { name: 'get', category: 'Object', opti: '1,240,052 ops/sec', lodash: '1,298,015 ops/sec', multiplier: '1.05x faster', winner: 'Lodash' }
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-6"
        >
          <Zap size={32} className="text-primary" />
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-text-main">Blazing Fast Performance</h1>
        <p className="text-xl text-muted max-w-2xl mx-auto leading-relaxed">
          OptiKit is built for speed and zero-dependency efficiency. See how it compares against industry standards like Lodash using <code className="text-primary bg-primary/10 px-1 py-0.5 rounded">vitest bench</code>.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <Card className="p-8 text-center bg-gradient-to-br from-primary/10 to-surface border-primary/20">
          <h2 className="text-2xl font-bold text-text-main mb-4 flex items-center justify-center gap-2">
            <TrendingUp className="text-primary" /> Combined Stats
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">2.34x</div>
              <div className="text-sm font-medium text-muted uppercase tracking-wide">Average Faster</div>
            </div>
            <div className="hidden md:block w-px h-16 bg-border"></div>
            <div>
              <div className="text-4xl font-bold text-success mb-2">4/5</div>
              <div className="text-sm font-medium text-muted uppercase tracking-wide">Benchmarks Won</div>
            </div>
            <div className="hidden md:block w-px h-16 bg-border"></div>
            <div>
              <div className="text-4xl font-bold text-text-main mb-2">~1.9M</div>
              <div className="text-sm font-medium text-muted uppercase tracking-wide">Avg Ops/sec</div>
            </div>
          </div>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 mb-12">
        {benchmarks.map((b, i) => (
          <motion.div
            key={b.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="flex flex-col md:flex-row items-center justify-between p-6">
              <div className="mb-4 md:mb-0">
                <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-1 block">{b.category}</span>
                <h3 className="text-xl font-bold text-text-main font-mono">{b.name}</h3>
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 w-full md:w-auto">
                <div className="text-center">
                  <div className="text-sm text-muted mb-1">OptiKit</div>
                  <div className={`font-mono font-semibold ${b.winner === 'OptiKit' ? 'text-success' : 'text-text-main'}`}>{b.opti}</div>
                </div>
                
                <div className="text-center">
                  <div className="text-sm text-muted mb-1">Lodash</div>
                  <div className={`font-mono font-semibold ${b.winner === 'Lodash' ? 'text-success' : 'text-text-main'}`}>{b.lodash}</div>
                </div>
                
                <div className="bg-surface border border-border px-4 py-2 rounded-lg text-center min-w-[120px]">
                  <div className="text-xs text-muted mb-1 font-medium">Result</div>
                  <div className="text-primary font-bold">{b.multiplier}</div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      
      <div className="text-center text-sm text-muted">
        <p>Benchmarks run on Node.js v18+. Operations per second (higher is better).</p>
      </div>
    </div>
  );
}
