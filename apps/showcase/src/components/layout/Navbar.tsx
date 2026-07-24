import React, { useEffect, useState, useRef } from 'react';
import { Code2, Package, Search, Sun, Moon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { OptiKitLogo } from '../ui/OptiKitLogo';

export function Navbar() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const dispatchCmdK = () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/80 backdrop-blur-xl transition-colors">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
        <Link to="/" className="flex items-center">
          <OptiKitLogo showVersion size={34} />
        </Link>

        
        <div className="flex-1 max-w-md mx-8 hidden md:block">
          <button 
            onClick={dispatchCmdK}
            className="w-full bg-surface border border-border hover:border-primary/50 hover:bg-surface-hover transition-all rounded-md py-1.5 pl-3 pr-2 flex items-center justify-between text-sm text-muted group"
          >
            <div className="flex items-center gap-2">
              <Search size={16} className="group-hover:text-primary transition-colors" />
              <span>Search modules or utilities...</span>
            </div>
            <div className="flex items-center gap-1 font-mono text-[10px] opacity-70 bg-background px-1.5 py-0.5 rounded border border-border">
              <span>⌘</span><span>K</span>
            </div>
          </button>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/docs" className="text-sm font-semibold text-black dark:text-muted hover:text-primary transition-colors">Docs</Link>
          <a href="/api/index.html" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-black dark:text-muted hover:text-primary transition-colors">API</a>
          <Link to="/modules" className="text-sm font-semibold text-black dark:text-muted hover:text-primary transition-colors">Modules</Link>
          <Link to="/playground" className="text-sm font-semibold text-black dark:text-muted hover:text-primary transition-colors">Playground</Link>
          <Link to="/benchmarks" className="text-sm font-semibold text-black dark:text-muted hover:text-primary transition-colors">Benchmarks</Link>
          
          <div className="w-px h-4 bg-border mx-2"></div>
          
          <button 
            onClick={toggleTheme} 
            className="text-black dark:text-muted hover:text-primary transition-colors p-1"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <a href="https://github.com/dev-x-mohit/opti-kit" className="text-black dark:text-muted hover:text-primary transition-colors">
            <Code2 size={20} />
          </a>
          <a href="https://npmjs.com/package/@dev_x_mohit/opti-kit" className="text-black dark:text-muted hover:text-primary transition-colors">
            <Package size={20} />
          </a>
        </div>
      </div>
    </nav>
  );
}
