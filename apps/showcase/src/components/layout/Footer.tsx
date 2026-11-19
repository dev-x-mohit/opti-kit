import React from 'react';
import { ExternalLink, Heart } from 'lucide-react';
import { OptiKitLogo } from '../ui/OptiKitLogo';
import { GithubIcon } from '../ui/GithubIcon';

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--text-muted)]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
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

          {/* Links Col 1 */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs text-[var(--text)] uppercase tracking-wider font-mono">
              Product
            </h4>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:text-[var(--text)] transition-colors">Features</a></li>
              <li><a href="#playground" className="hover:text-[var(--text)] transition-colors">Playground</a></li>
              <li><a href="#compare" className="hover:text-[var(--text)] transition-colors">Bundle Benchmarks</a></li>
              <li><a href="#mcp" className="hover:text-[var(--text)] transition-colors">Agentic MCP</a></li>
              <li><a href="#tree-shaking" className="hover:text-[var(--text)] transition-colors">Tree-Shaking</a></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs text-[var(--text)] uppercase tracking-wider font-mono">
              Domains
            </h4>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:text-[var(--text)] transition-colors">Data & Collections</a></li>
              <li><a href="#features" className="hover:text-[var(--text)] transition-colors">Control Flow & Async</a></li>
              <li><a href="#features" className="hover:text-[var(--text)] transition-colors">Security & Validation</a></li>
              <li><a href="#features" className="hover:text-[var(--text)] transition-colors">Math, ML & Science</a></li>
              <li><a href="#features" className="hover:text-[var(--text)] transition-colors">Web & DOM</a></li>
            </ul>
          </div>

          {/* Links Col 3 */}
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
            © {new Date().getFullYear()} OptiKit Ecosystem. All claims verified.
          </p>
        </div>
      </div>
    </footer>
  );
}
