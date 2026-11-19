import React from 'react';
import { ShieldCheck, WifiOff, Lock, Award, ExternalLink, CheckCircle2 } from 'lucide-react';
import { securityPillars, trustBadges } from '../data/securityData';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export function SecurityTrustSection() {
  const getIcon = (name: string) => {
    switch (name) {
      case 'ShieldCheck': return <ShieldCheck size={20} className="text-[var(--success)]" />;
      case 'WifiOff': return <WifiOff size={20} className="text-[var(--success)]" />;
      case 'Lock': return <Lock size={20} className="text-[var(--success)]" />;
      case 'Award': return <Award size={20} className="text-[var(--success)]" />;
      default: return <ShieldCheck size={20} className="text-[var(--success)]" />;
    }
  };

  return (
    <section className="py-20 border-b border-[var(--border)] bg-[var(--bg-subtle)]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex mb-3">
            <Badge variant="success" icon={<ShieldCheck size={13} />}>
              Enterprise Security & Supply Chain Safety
            </Badge>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-[var(--text)]">
            Engineered for Zero Supply-Chain Risk
          </h2>
          <p className="mt-3 max-w-[62ch] mx-auto text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
            Open-source utility libraries should never be an attack surface. OptiKit enforces strict cryptographic and functional sandboxing.
          </p>
        </div>

        {/* 4 Security Cards with Success-Green Accents */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto mb-12">
          {securityPillars.map((pillar) => (
            <Card
              key={pillar.title}
              className="p-5 border-[var(--border)] hover:border-[var(--success)]/50 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg bg-[var(--success-soft)]">
                    {getIcon(pillar.icon)}
                  </div>
                  <span className="font-mono text-[10px] text-[var(--success)] px-2 py-0.5 rounded-full bg-[var(--success-soft)]">
                    Verified
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-[var(--text)]">
                  {pillar.title}
                </h3>
                <div className="text-xs font-medium text-[var(--success)] mt-0.5">
                  {pillar.tagline}
                </div>

                <p className="text-xs text-[var(--text-muted)] mt-2 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--border)] text-[10px] font-mono text-[var(--text-faint)]">
                {pillar.verificationBadge}
              </div>
            </Card>
          ))}
        </div>

        {/* Trust Badges Row */}
        <div className="max-w-4xl mx-auto rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-xs">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-faint)] mb-4 text-center">
            Verifiable Compliance & Repository Standards:
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {trustBadges.map((badge) => (
              <a
                key={badge.label}
                href={badge.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg border border-[var(--border)] bg-[var(--surface-2)]/50 hover:bg-[var(--surface-2)] hover:border-[var(--border-strong)] transition-colors group"
              >
                <div>
                  <span className="text-[10px] text-[var(--text-faint)] block uppercase font-mono">
                    {badge.label}
                  </span>
                  <span className="text-xs font-medium text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">
                    {badge.value}
                  </span>
                </div>
                <ExternalLink size={13} className="text-[var(--text-faint)] group-hover:text-[var(--text)] transition-colors" />
              </a>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-[var(--border)] text-center text-xs text-[var(--text-muted)]">
            Audited by{' '}
            <a
              href="https://socket.dev/npm/package/@dev_x_mohit/opti-kit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--primary)] font-medium hover:underline"
            >
              Socket Security Intelligence
            </a>{' '}
            with zero security alerts, zero license conflicts, and zero telemetry tracking.
          </div>
        </div>
      </div>
    </section>
  );
}
