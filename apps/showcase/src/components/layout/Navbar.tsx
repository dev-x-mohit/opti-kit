import React, { useEffect, useState, useRef } from 'react';
import { Code2, Package, Search, Sun, Moon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export function Navbar() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') || 
             (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return true;
  });

  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Focus search bar on '/' press
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearchEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = e.currentTarget.value;
      navigate(value ? `/modules?q=${encodeURIComponent(value)}` : '/modules');
      searchInputRef.current?.blur();
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/60 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-bold text-xl tracking-tight text-text-main">OptiKit</span>
          <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold ml-2 border border-primary/20">v1.0.6</span>

        </Link>
        
        <div className="flex-1 max-w-md mx-8 hidden md:block">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-muted group-focus-within:text-primary transition-colors" />
            </div>
            <input 
              ref={searchInputRef}
              type="text" 
              onKeyDown={handleSearchEnter}
              placeholder="Search utilities... (Press '/' to focus)" 
              className="w-full bg-surface border border-border rounded-md py-1.5 pl-10 pr-4 text-sm text-text-main placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/docs" className="text-sm font-medium text-muted hover:text-text-main transition-colors">Docs</Link>
          <Link to="/modules" className="text-sm font-medium text-muted hover:text-text-main transition-colors">Modules</Link>
          <Link to="/playground" className="text-sm font-medium text-muted hover:text-text-main transition-colors">Playground</Link>
          <a 
            href="https://mohitlakhara.vercel.app" 
            target="_blank" 
            rel="noreferrer" 
            className="text-sm font-medium text-muted hover:text-primary transition-colors flex items-center gap-1"
          >
            About
          </a>

          
          <div className="w-px h-4 bg-border mx-2"></div>
          
          <button 
            onClick={() => setIsDark(!isDark)} 
            className="text-muted hover:text-text-main transition-colors p-1"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <a href="https://github.com/dev-x-mohit/opti-kit" className="text-muted hover:text-text-main transition-colors">
            <Code2 size={20} />
          </a>
          <a href="https://npmjs.com/package/@dev_x_mohit/opti-kit" className="text-muted hover:text-text-main transition-colors">
            <Package size={20} />
          </a>
        </div>
      </div>
    </nav>
  );
}
