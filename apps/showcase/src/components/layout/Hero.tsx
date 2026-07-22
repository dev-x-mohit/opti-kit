import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import { 
  Terminal, Copy, Check, Sparkles, ArrowRight, Zap, 
  ShieldCheck, Layers, Cpu, Scale
} from 'lucide-react';

export function Hero() {
  const navigate = useNavigate();

  const [copiedInstall, setCopiedInstall] = useState(false);
  const [importedCount, setImportedCount] = useState<number>(3);

  const installCmd = "npm install @dev_x_mohit/opti-kit";

  const handleCopyInstall = async () => {
    try {
      await navigator.clipboard.writeText(installCmd);
      setCopiedInstall(true);
      setTimeout(() => setCopiedInstall(false), 2000);
    } catch {}
  };

  // Bundle Calculator Math
  const legacySizeKb = 520;
  const optiKbPerUtil = 0.35;
  const optiSizeKb = Number((importedCount * optiKbPerUtil).toFixed(2));
  const savingsPct = (((legacySizeKb - optiSizeKb) / legacySizeKb) * 100).toFixed(1);

  return (
    <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10"></div>

      {/* Ambient Gradient Glowing Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[550px] bg-gradient-to-b from-primary/20 via-accent/15 to-transparent blur-[140px] rounded-full pointer-events-none -z-10"></div>

      <div className="container mx-auto px-4 max-w-5xl text-center relative z-10 space-y-8">
        
        {/* Animated Pulsing Status Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#E7EDFF] dark:bg-primary/10 border border-[#C9D4FF]/60 dark:border-primary/30 text-[#4F8DFD] text-xs font-semibold shadow-sm backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4F8DFD] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4F8DFD]"></span>
          </span>
          <span>OptiKit v1.0.9 • 16 KB Gzip • 100/100 Security Score • 430 Utilities</span>

        </motion.div>

        {/* Centered Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-black dark:text-white leading-[1.1] max-w-4xl mx-auto"
        >
          The Zero-Dependency <br />
          <span className="text-gradient">
            Utility Engine
          </span> for JS & TS.
        </motion.h1>

        {/* Centered Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-base sm:text-xl text-black dark:text-muted max-w-3xl mx-auto leading-relaxed font-medium"
        >
          Say goodbye to monolithic legacy utilities like Lodash and Moment. OptiKit delivers 430 pure, zero-dependency utility functions natively built in TypeScript with perfect tree shaking.
        </motion.p>

        {/* Terminal Command Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="inline-flex items-center justify-between gap-3 bg-code-bg border border-border rounded-2xl p-2.5 pl-5 max-w-lg w-full shadow-lg"
        >
          <div className="flex items-center gap-3 font-mono text-xs sm:text-sm text-black dark:text-white font-semibold overflow-x-auto">
            <Terminal size={18} className="text-primary shrink-0" />
            <span>{installCmd}</span>
          </div>
          <button
            onClick={handleCopyInstall}
            className="p-2.5 rounded-xl bg-surface border border-border text-black dark:text-muted hover:text-primary transition-colors shrink-0"
            title="Copy command"
          >
            {copiedInstall ? <Check size={16} className="text-success" /> : <Copy size={16} />}
          </button>
        </motion.div>

        {/* Centered CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-1"
        >
          <Button variant="primary" className="w-full sm:w-auto px-8 py-3.5 text-sm flex items-center justify-center gap-2 shadow-xl shadow-primary/20 bg-gradient-to-r from-[#4F8DFD] via-[#6B6CF7] to-[#8B5CF6] text-white border-0 hover:opacity-95 font-semibold" onClick={() => navigate('/docs')}>
            Get Started <ArrowRight size={16} />
          </Button>
          <Button variant="outline" className="w-full sm:w-auto px-8 py-3.5 text-sm flex items-center justify-center gap-2 border-border text-black dark:text-white hover:bg-[#EEF2F8] dark:hover:bg-white/5 font-semibold" onClick={() => navigate('/modules')}>
            Explore 430 Utilities
          </Button>
        </motion.div>

        {/* Value Badges Row */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="pt-2 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs sm:text-sm text-black dark:text-muted font-bold"
        >
          <span className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-success" /> 0 External Dependencies</span>
          <span className="flex items-center gap-1.5"><Layers size={16} className="text-primary" /> Tree-Shakeable ESM</span>
          <span className="flex items-center gap-1.5"><Cpu size={16} className="text-accent" /> Strict TypeScript</span>
        </motion.div>

        {/* Live Tree-Shaken Bundle Calculator Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-3xl mx-auto pt-6"
        >
          <div className="bg-surface border border-border rounded-[24px] p-6 shadow-[0_10px_40px_rgba(15,23,42,0.05)] backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-left space-y-1 flex-1">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                <Scale size={15} /> Tree Shaking Bundle Calculator
              </div>
              <h4 className="text-sm font-semibold text-text-main">
                Importing <span className="text-primary font-mono">{importedCount} utilities</span> into your app:
              </h4>
              <div className="flex items-center gap-3 pt-1">
                <input 
                  type="range" 
                  min="1" 
                  max="15" 
                  value={importedCount} 
                  onChange={(e) => setImportedCount(Number(e.target.value))}
                  className="w-full max-w-xs accent-primary cursor-pointer"
                />
              </div>
            </div>

            <div className="flex items-center gap-6 text-center shrink-0">
              <div className="space-y-0.5">
                <span className="text-xs text-muted block">OptiKit Bundle</span>
                <span className="text-lg font-mono font-bold text-success">~{optiSizeKb} KB</span>
              </div>
              <div className="w-px h-8 bg-border"></div>
              <div className="space-y-0.5">
                <span className="text-xs text-muted block">Lodash / Legacy</span>
                <span className="text-lg font-mono font-bold text-red-400">~{legacySizeKb} KB</span>
              </div>
              <div className="w-px h-8 bg-border"></div>
              <div className="space-y-0.5">
                <span className="text-xs text-muted block">Bundle Savings</span>
                <span className="text-lg font-mono font-bold text-primary">-{savingsPct}%</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}




