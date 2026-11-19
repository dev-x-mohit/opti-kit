import React, { useState, useEffect } from 'react';
import { Sun, Moon, Search, ExternalLink } from 'lucide-react';
import { OptiKitLogo } from '../ui/OptiKitLogo';
import { GithubIcon } from '../ui/GithubIcon';
import { Button } from '../ui/Button';
import { useScrollSpy } from '../../hooks/useScrollSpy';

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
  onOpenSearch: () => void;
}

const navLinks = [
  { id: 'features', label: 'Features', href: '#features' },
  { id: 'playground', label: 'Playground', href: '#playground' },
  { id: 'compare', label: 'Compare', href: '#compare' },
  { id: 'mcp', label: 'MCP', href: '#mcp' },
  { id: 'tree-shaking', label: 'Tree-Shaking', href: '#tree-shaking' },
  { id: 'docs', label: 'Docs', href: '#quick-start' },
];

export function Navbar({ isDark, toggleTheme, onOpenSearch }: NavbarProps) {
  const [hasScrolled, setHasScrolled] = useState(false);
  const activeId = useScrollSpy(['features', 'playground', 'compare', 'mcp', 'tree-shaking', 'quick-start'], 120);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        hasScrolled
          ? 'bg-[var(--bg)]/85 backdrop-blur-md border-b border-[var(--border)] shadow-xs'
          : 'bg-[var(--bg)]/85 backdrop-blur-md border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 sm:px-6">
        {/* Wordmark logo */}
        <a href="#" className="flex items-center gap-2" aria-label="OptiKit Home">
          <OptiKitLogo size={30} showVersion />
        </a>

        {/* Center navigation with scroll-spy active indicator */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = activeId === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`relative px-3 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-[var(--text)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[var(--primary)] rounded-full transition-all" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick search button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--border-strong)] transition-colors text-xs cursor-pointer"
            aria-label="Search utilities (Press Cmd+K)"
          >
            <Search size={14} />
            <span className="hidden sm:inline">Search</span>
            <kbd className="font-mono text-[10px] px-1 py-0.5 rounded bg-[var(--surface-2)] border border-[var(--border)]">
              ⌘K
            </kbd>
          </button>

          {/* GitHub link with star count badge */}
          <a
            href="https://github.com/dev-x-mohit/opti-kit"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View OptiKit on GitHub"
            className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] transition-colors inline-flex items-center"
          >
            <GithubIcon size={18} />
          </a>

          {/* NPM link */}
          <a
            href="https://www.npmjs.com/package/@dev_x_mohit/opti-kit"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View OptiKit on npm"
            className="hidden sm:inline-flex p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] transition-colors"
          >
            <span className="font-mono text-xs font-semibold px-1 rounded bg-[var(--surface-2)] border border-[var(--border)]">
              npm
            </span>
          </a>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] transition-colors cursor-pointer"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Primary CTA */}
          <a href="#quick-start">
            <Button size="sm" variant="primary">
              Get Started
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
}
