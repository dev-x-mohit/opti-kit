import React from 'react';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-surface/30 mt-24">
      <div className="container mx-auto px-4 py-8 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-muted">
          MIT License © {new Date().getFullYear()} Mohit Lakhara
        </div>
        <div className="flex items-center gap-6 text-sm text-muted">
          <a href="https://github.com/dev-x-mohit/opti-kit" className="hover:text-text-main transition-colors">GitHub</a>
          <a href="https://npmjs.com/package/@dev_x_mohit/opti-kit" className="hover:text-text-main transition-colors">NPM</a>
          <a href="https://opti-kit-showcase.vercel.app" className="hover:text-text-main transition-colors">Showcase</a>
        </div>
      </div>
    </footer>
  );
}
