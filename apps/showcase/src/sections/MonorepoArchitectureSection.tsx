import React from 'react';
import { Box, Layers, Cpu, ExternalLink, ArrowRight, GitFork } from 'lucide-react';
import { monorepoPackages, MonorepoPackage } from '../data/monorepoData';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export function MonorepoArchitectureSection() {
  return (
    <section className="py-20 border-b border-[var(--border)] bg-[var(--bg-subtle)]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex mb-3">
            <Badge variant="primary" icon={<GitFork size={13} />}>
              Monorepo Workspaces
            </Badge>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-[var(--text)]">
            Single Repository, Unified Quality
          </h2>
          <p className="mt-3 max-w-[62ch] mx-auto text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
            The OptiKit monorepo couples core deterministic logic with agentic MCP interfaces and real-time interactive documentation.
          </p>
        </div>

        {/* 2D Architecture Graph & Cards */}
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Visual 2D Connected Graph */}
          <div className="relative p-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              {monorepoPackages.map((pkg) => {
                const isCore = pkg.id === 'core';
                return (
                  <div
                    key={pkg.id}
                    className={`rounded-lg border p-5 transition-all flex flex-col justify-between ${
                      isCore
                        ? 'border-[var(--primary)] bg-[var(--primary-soft)]/20'
                        : 'border-[var(--border)] bg-[var(--surface-2)]/60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-[11px] text-[var(--text-faint)]">
                          {pkg.path}
                        </span>
                        {isCore && (
                          <Badge variant="primary" className="py-0 text-[10px]">
                            Core Engine
                          </Badge>
                        )}
                      </div>

                      <h3 className="font-mono text-sm font-bold text-[var(--text)]">
                        {pkg.name}
                      </h3>
                      <div className="text-xs font-semibold text-[var(--primary)] mt-0.5">
                        {pkg.role}
                      </div>

                      <p className="text-xs text-[var(--text-muted)] mt-3 leading-relaxed">
                        {pkg.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-[var(--border)] space-y-3">
                      <div className="text-[11px] font-mono text-[var(--text-faint)]">
                        {pkg.stats}
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {pkg.tech.map((t) => (
                          <span
                            key={t}
                            className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[var(--surface)] border border-[var(--border)] text-[var(--text-muted)]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-3 pt-1">
                        {pkg.links.map((link) => (
                          <a
                            key={link.label}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-[var(--primary)] hover:underline"
                          >
                            <span>{link.label}</span>
                            <ExternalLink size={11} />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Connecting lines explanation */}
            <div className="mt-6 pt-4 border-t border-[var(--border)] text-center text-xs text-[var(--text-faint)]">
              Both <code className="font-mono text-[var(--text)]">packages/mcp-server</code> and{' '}
              <code className="font-mono text-[var(--text)]">apps/showcase</code> consume{' '}
              <code className="font-mono text-[var(--primary)]">packages/opti-kit</code> directly as an internal workspace dependency.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
