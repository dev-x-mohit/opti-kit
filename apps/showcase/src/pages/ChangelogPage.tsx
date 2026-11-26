import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { History, ArrowRight, Tag, Layers, CheckCircle2 } from 'lucide-react';
import { changelogData, ChangelogSection } from '../data/changelogData';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { Footer } from '../components/layout/Footer';

const categoryFilters = ['All', 'Pro Modules', 'Core Library', 'MCP Server', 'Showcase'] as const;

export function ChangelogPage() {
  const [selectedCategory, setSelectedCategory] = useState<(typeof categoryFilters)[number]>('All');

  const filterSections = (sections: ChangelogSection[]) => {
    if (selectedCategory === 'All') return sections;
    return sections.filter((s) => s.category === selectedCategory);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)]">
      <main className="flex-1 py-14 sm:py-20">
        <div className="mx-auto max-w-[960px] px-4 sm:px-6">
          {/* Header */}
          <div className="mb-10 space-y-4">
            <div className="inline-flex">
              <Badge variant="primary" icon={<History size={13} />}>
                Release History
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.02em] text-[var(--text)]">
              Changelog
            </h1>
            <p className="max-w-2xl text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
              Every release across <code className="font-mono text-[var(--primary)]">@dev_x_mohit/opti-kit</code>, the MCP server, and the showcase app. See what changed, what was added, and how the test suite grew.
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {categoryFilters.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer border ${
                      active
                        ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                        : 'bg-[var(--surface)] text-[var(--text-muted)] border-[var(--border)] hover:text-[var(--text)] hover:border-[var(--border-strong)]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Timeline */}
          <div className="relative space-y-10 before:hidden sm:before:block before:absolute before:left-[15px] before:top-4 before:bottom-4 before:w-px before:bg-[var(--border)]">
            {changelogData.map((release) => {
              const visibleSections = filterSections(release.sections);
              if (visibleSections.length === 0) return null;

              return (
                <article key={release.version} className="relative sm:pl-12">
                  {/* Timeline Node */}
                  <div className="hidden sm:flex absolute left-0 top-1.5 h-8 w-8 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--surface)] text-[var(--primary)] shadow-xs">
                    <Tag size={14} />
                  </div>

                  <Card className="p-6 sm:p-8 space-y-6">
                    {/* Release Header */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--border)]">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xl sm:text-2xl font-bold text-[var(--text)]">
                          v{release.version}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold ${
                            release.tag === 'Latest'
                              ? 'bg-[var(--success-soft)] text-[var(--success)]'
                              : 'bg-[var(--primary-soft)] text-[var(--primary)]'
                          }`}
                        >
                          {release.tag}
                        </span>
                      </div>
                      <time className="font-mono text-xs text-[var(--text-faint)]">
                        {release.date}
                      </time>
                    </div>

                    {/* Summary */}
                    <div className="space-y-2">
                      <h2 className="text-lg sm:text-xl font-semibold text-[var(--text)]">
                        {release.headline}
                      </h2>
                      <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                        {release.summary}
                      </p>
                    </div>

                    {/* Release Metrics */}
                    <div className="flex flex-wrap gap-2">
                      {release.metrics.map((metric) => (
                        <span
                          key={metric}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--surface-2)] border border-[var(--border)] font-mono text-[11px] text-[var(--text-muted)]"
                        >
                          <CheckCircle2 size={12} className="text-[var(--success)]" />
                          {metric}
                        </span>
                      ))}
                    </div>

                    {/* Sections */}
                    <div className="space-y-5 pt-2">
                      {visibleSections.map((sec) => (
                        <div key={sec.category} className="space-y-3">
                          <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-faint)] flex items-center gap-1.5">
                            <Layers size={12} className="text-[var(--primary)]" />
                            <span>{sec.category}</span>
                          </h3>
                          <ul className="space-y-3">
                            {sec.items.map((item) => (
                              <li
                                key={item.title}
                                className="rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] p-4 space-y-1.5"
                              >
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <span className="font-semibold text-sm text-[var(--text)]">
                                    {item.title}
                                  </span>
                                  {item.module && (
                                    <Link
                                      to={`/modules/${item.module}`}
                                      className="inline-flex items-center gap-1 font-mono text-xs text-[var(--primary)] hover:underline"
                                    >
                                      <span>Explore {item.module}</span>
                                      <ArrowRight size={12} />
                                    </Link>
                                  )}
                                </div>
                                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                                  {item.detail}
                                </p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </Card>
                </article>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
