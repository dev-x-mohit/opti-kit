import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sun, Moon, Search, Menu, X, Terminal, BookOpen, Layers, Gauge, Home, Package, History } from 'lucide-react';
import { OptiKitLogo } from '../ui/OptiKitLogo';
import { GithubIcon } from '../ui/GithubIcon';
import { Button } from '../ui/Button';
import { useBundleCart } from '../../hooks/useBundleCart';

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
  onOpenSearch: () => void;
  onOpenBundle: () => void;
}

const routeLinks = [
  { to: '/', label: 'Overview', icon: Home, end: true },
  { to: '/modules', label: 'Modules', icon: Layers, end: false },
  { to: '/playground', label: 'Playground', icon: Terminal, end: false },
  { to: '/docs', label: 'Docs', icon: BookOpen, end: false },
  { to: '/benchmarks', label: 'Benchmarks', icon: Gauge, end: false },
  { to: '/changelog', label: 'Changelog', icon: History, end: false },
];

export function Navbar({ isDark, toggleTheme, onOpenSearch, onOpenBundle }: NavbarProps) {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { items: bundleItems } = useBundleCart();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 12);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        hasScrolled || mobileOpen
          ? 'bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--border)] shadow-xs'
          : 'bg-[var(--bg)]/80 backdrop-blur-md border-b border-[var(--border)]/50'
      }`}
    >
      <div className="mx-auto flex h-15 max-w-[1320px] items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="OptiKit Home">
          <OptiKitLogo size={28} showVersion />
        </Link>

        {/* Desktop Route Navigation with Framer Motion pill */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {routeLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `relative px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-[var(--text)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-lg bg-[var(--surface-2)] border border-[var(--border)]/70"
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--border-strong)] transition-colors text-xs cursor-pointer"
            aria-label="Search utilities (Cmd+K)"
          >
            <Search size={14} />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline font-mono text-[10px] px-1.5 py-0.5 rounded bg-[var(--surface-2)] border border-[var(--border)]">
              ⌘K
            </kbd>
          </button>

          {/* Bundle Estimator Trigger */}
          <button
            type="button"
            onClick={onOpenBundle}
            aria-label="Open tree-shaking bundle manifest"
            className="relative inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--border-strong)] transition-colors text-xs cursor-pointer"
          >
            <Package size={14} className="text-[var(--primary)]" />
            <span className="hidden lg:inline">Bundle</span>
            {bundleItems.length > 0 && (
              <span className="font-mono text-[10px] font-semibold px-1.5 py-0.2 rounded-full bg-[var(--primary-soft)] text-[var(--primary)]">
                {bundleItems.length}
              </span>
            )}
          </button>

          <a
            href="https://github.com/dev-x-mohit/opti-kit"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View OptiKit on GitHub"
            className="hidden sm:inline-flex p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] transition-colors items-center"
          >
            <GithubIcon size={17} />
          </a>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] transition-colors cursor-pointer"
          >
            {isDark ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <Link to="/docs" className="hidden sm:inline-flex">
            <Button size="sm" variant="primary">
              Get Started
            </Button>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="md:hidden p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] transition-colors cursor-pointer"
          >
            {mobileOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--bg)] px-4 py-3 space-y-1">
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {routeLinks.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[var(--primary-soft)] text-[var(--primary)]'
                        : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface)]'
                    }`
                  }
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          <div className="pt-2 mt-2 border-t border-[var(--border)] flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/dev-x-mohit/opti-kit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)]"
              >
                <GithubIcon size={14} />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.npmjs.com/package/@dev_x_mohit/opti-kit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-mono font-medium border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)]"
              >
                npm
              </a>
            </div>
            <Link to="/docs">
              <Button size="sm" variant="primary">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
