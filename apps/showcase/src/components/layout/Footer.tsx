import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { OptiKitLogo } from '../ui/OptiKitLogo';
import { GithubIcon } from '../ui/GithubIcon';

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--text-muted)]">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <OptiKitLogo size={28} showVersion />
            <p className="max-w-sm text-xs text-[var(--text-faint)] leading-relaxed">
              The zero-dependency, ultra-lightweight, and fully tree-shakeable utility engine for modern JavaScript and TypeScript applications.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://github.com/dev-x-mohit/opti-kit"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors p-1"
                aria-label="OptiKit GitHub"
              >
                <GithubIcon size={17} />
              </a>
              <a
                href="https://www.npmjs.com/package/@dev_x_mohit/opti-kit"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
              >
                npm package
              </a>
              <a
                href="https://socket.dev/npm/package/@dev_x_mohit/opti-kit"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-[var(--success-soft)] text-[var(--success)] transition-colors"
              >
                100/100 Health
              </a>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs text-[var(--text)] uppercase tracking-wider font-mono">
              Product
            </h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-[var(--text)] transition-colors">Overview</Link></li>
              <li><Link to="/modules" className="hover:text-[var(--text)] transition-colors">Modules Directory</Link></li>
              <li><Link to="/playground" className="hover:text-[var(--text)] transition-colors">Scripting IDE</Link></li>
              <li><Link to="/docs" className="hover:text-[var(--text)] transition-colors">Documentation</Link></li>
              <li><Link to="/benchmarks" className="hover:text-[var(--text)] transition-colors">Benchmarks</Link></li>
              <li><Link to="/changelog" className="hover:text-[var(--text)] transition-colors">Changelog</Link></li>
            </ul>
          </div>

          {/* Domains */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs text-[var(--text)] uppercase tracking-wider font-mono">
              Popular Modules
            </h4>
            <ul className="space-y-2">
              <li><Link to="/modules/array" className="hover:text-[var(--text)] transition-colors">Array & Collections</Link></li>
              <li><Link to="/modules/async" className="hover:text-[var(--text)] transition-colors">Async & Control Flow</Link></li>
              <li><Link to="/modules/crypto" className="hover:text-[var(--text)] transition-colors">Crypto & Security</Link></li>
              <li><Link to="/modules/signals" className="hover:text-[var(--text)] transition-colors">Reactive Signals</Link></li>
              <li><Link to="/modules/diff" className="hover:text-[var(--text)] transition-colors">Deep Diff & Patch</Link></li>
            </ul>
          </div>

          {/* Ecosystem */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs text-[var(--text)] uppercase tracking-wider font-mono">
              Ecosystem
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.npmjs.com/package/@dev_x_mohit/opti-kit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-[var(--text)] transition-colors"
                >
                  <span>@dev_x_mohit/opti-kit</span>
                  <ExternalLink size={11} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.npmjs.com/package/@dev_x_mohit/opti-kit-mcp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-[var(--text)] transition-colors"
                >
                  <span>@dev_x_mohit/opti-kit-mcp</span>
                  <ExternalLink size={11} />
                </a>
              </li>
              <li>
                <a
                  href="https://bundlephobia.com/package/@dev_x_mohit/opti-kit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-[var(--text)] transition-colors"
                >
                  <span>Bundlephobia Report</span>
                  <ExternalLink size={11} />
                </a>
              </li>
              <li>
                <a
                  href="https://socket.dev/npm/package/@dev_x_mohit/opti-kit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-[var(--text)] transition-colors"
                >
                  <span>Socket Security Score</span>
                  <ExternalLink size={11} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Attribution Bar */}
        <div className="pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--text-faint)]">
          <p>
            Designed and built by{' '}
            <a
              href="https://github.com/dev-x-mohit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text)] font-medium hover:underline"
            >
              Mohit Lakhara (@dev_x_mohit)
            </a>
            . Released under the{' '}
            <a
              href="https://github.com/dev-x-mohit/opti-kit/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text)] hover:underline"
            >
              MIT License
            </a>
            .
          </p>

          <p className="font-mono text-[11px]">
            © {new Date().getFullYear()} OptiKit Ecosystem.
          </p>
        </div>
      </div>
    </footer>
  );
}
