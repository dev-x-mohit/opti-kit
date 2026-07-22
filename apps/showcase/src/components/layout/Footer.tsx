import React from 'react';

import { OptiKitLogo } from '../ui/OptiKitLogo';

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/60 mt-24 backdrop-blur-md">
      <div className="container mx-auto px-4 py-8 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <OptiKitLogo size={28} />
          <span className="text-sm text-muted">MIT License © {new Date().getFullYear()} Mohit Lakhara</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-muted">
          <a href="https://github.com/dev-x-mohit/opti-kit" className="hover:text-text-main transition-colors font-medium">GitHub</a>
          <a href="https://npmjs.com/package/@dev_x_mohit/opti-kit" className="hover:text-text-main transition-colors font-medium">NPM</a>
          <a href="https://opti-kit-showcase.vercel.app" className="hover:text-text-main transition-colors font-medium">Showcase</a>
        </div>
      </div>
    </footer>
  );
}
