import React from 'react';
import { Code2, Package, Globe, ExternalLink } from 'lucide-react';


export function Footer() {
  return (
    <footer className="border-t border-border/80 bg-surface/30 mt-24">
      <div className="container mx-auto px-4 py-12 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
          <div className="flex items-center gap-2 font-bold text-text-main text-lg">
            <span>OptiKit</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">v1.0.6</span>

          </div>
          <p className="text-xs text-muted">
            MIT License © {new Date().getFullYear()} Mohit Lakhara. Built with passion for open-source TypeScript.
          </p>
        </div>

        <div className="flex items-center gap-6 text-xs font-medium text-muted">
          <a 
            href="https://github.com/dev-x-mohit/opti-kit" 
            target="_blank" 
            rel="noreferrer" 
            className="flex items-center gap-1.5 hover:text-primary transition-colors"
          >
            <Code2 size={15} /> GitHub

          </a>
          <a 
            href="https://npmjs.com/package/@dev_x_mohit/opti-kit" 
            target="_blank" 
            rel="noreferrer" 
            className="flex items-center gap-1.5 hover:text-primary transition-colors"
          >
            <Package size={15} /> NPM
          </a>
          <a 
            href="https://mohitlakhara.vercel.app" 
            target="_blank" 
            rel="noreferrer" 
            className="flex items-center gap-1.5 hover:text-primary transition-colors"
          >
            <Globe size={15} /> Developer <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </footer>
  );
}

