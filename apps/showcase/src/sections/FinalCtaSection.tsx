import React, { useState } from 'react';
import { ArrowRight, Check, Copy, ExternalLink } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { GithubIcon } from '../components/ui/GithubIcon';
import { copyToClipboard } from '../lib/copyToClipboard';

export function FinalCtaSection() {
  const [copied, setCopied] = useState(false);
  const installCmd = 'npm install @dev_x_mohit/opti-kit';

  const handleCopy = async () => {
    const success = await copyToClipboard(installCmd);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <section className="relative overflow-hidden py-24 border-b border-[var(--border)] bg-[var(--bg)]">
      {/* Subtle radial primary glow (max 8% opacity) */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="h-[360px] w-[500px] rounded-full bg-[var(--primary)] opacity-[0.06] blur-[80px]" />
      </div>

      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 text-center">
        <div className="inline-flex mb-4">
          <Badge variant="primary">Production Stability</Badge>
        </div>

        <h2 className="mx-auto max-w-2xl text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.02em] text-[var(--text)]">
          Ship less code. Get more done.
        </h2>

        <p className="mx-auto mt-4 max-w-[56ch] text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
          You get 1,280+ pure TypeScript utilities, a 14 KB core footprint, and zero dependencies ready for production.
        </p>

        {/* Copyable install command box */}
        <div className="mx-auto mt-8 flex max-w-md items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--surface)] p-2 shadow-xs">
          <div className="flex items-center gap-2 pl-3 font-mono text-xs sm:text-sm text-[var(--text)] select-all truncate">
            <span className="text-[var(--text-faint)] select-none">$</span>
            <span className="truncate">{installCmd}</span>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-lg bg-[var(--surface-2)] px-3 py-1.5 text-xs text-[var(--text)] hover:bg-[var(--border)] transition-colors cursor-pointer shrink-0 ml-2"
          >
            {copied ? (
              <>
                <Check size={13} className="text-[var(--success)]" />
                <span className="text-[var(--success)] font-medium">Copied</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="#playground">
            <Button size="md" variant="primary">
              Launch Playground <ArrowRight size={15} />
            </Button>
          </a>
          <a
            href="https://github.com/dev-x-mohit/opti-kit"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="md" variant="secondary">
              <GithubIcon size={15} /> Star on GitHub
            </Button>
          </a>
          <a
            href="https://www.npmjs.com/package/@dev_x_mohit/opti-kit"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="md" variant="secondary">
              <ExternalLink size={15} /> View npm
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
