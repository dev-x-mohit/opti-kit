import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Layers, ChevronRight, Star, ArrowUpDown, Code2 } from 'lucide-react';
import { utilitiesData } from '../data/utilitiesData';
import {
  CATEGORIES,
  TOTAL_MODULES_COUNT,
  TOTAL_UTILITIES_COUNT,
  getModuleCategory,
} from '../lib/moduleMeta';
import { useFavorites } from '../hooks/useFavorites';

export function ModulesIndexPage() {
  const [activeTab, setActiveTab] = useState<'modules' | 'utils' | 'categories' | 'favorites'>('modules');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [utilSearchQuery, setUtilSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'count'>('name');
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  const moduleStats = useMemo(() => {
    const stats: Record<string, { count: number; name: string; category: string; description: string }> = {};
    utilitiesData.forEach((u) => {
      if (!stats[u.module]) {
        stats[u.module] = {
          name: u.module,
          count: 0,
          category: getModuleCategory(u.module),
          description: u.description,
        };
      }
      stats[u.module].count++;
    });
    return Object.values(stats);
  }, []);

  const filteredModules = useMemo(() => {
    const list = moduleStats.filter((mod) => {
      const matchCategory = activeCategory === 'All' || mod.category === activeCategory;
      const matchSearch = mod.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
    return list.sort((a, b) =>
      sortBy === 'count' ? b.count - a.count : a.name.localeCompare(b.name)
    );
  }, [activeCategory, searchQuery, moduleStats, sortBy]);

  const filteredUtils = useMemo(() => {
    if (!utilSearchQuery.trim()) return utilitiesData.slice(0, 120);
    const lowerQ = utilSearchQuery.toLowerCase().trim();
    return utilitiesData
      .filter(
        (u) =>
          u.name.toLowerCase().includes(lowerQ) ||
          u.description.toLowerCase().includes(lowerQ) ||
          u.module.toLowerCase().includes(lowerQ)
      )
      .slice(0, 120);
  }, [utilSearchQuery]);

  const favoriteUtils = useMemo(() => {
    return utilitiesData.filter((u) => favorites.includes(u.id));
  }, [favorites]);

  const categoryStats = useMemo(() => {
    const stats: Record<string, { modules: Set<string>; utils: number }> = {};
    CATEGORIES.forEach((c) => {
      if (c !== 'All') stats[c] = { modules: new Set(), utils: 0 };
    });

    utilitiesData.forEach((u) => {
      const cat = getModuleCategory(u.module);
      if (!stats[cat]) stats[cat] = { modules: new Set(), utils: 0 };
      stats[cat].modules.add(u.module);
      stats[cat].utils++;
    });

    return Object.entries(stats)
      .map(([name, data]) => ({
        name,
        moduleCount: data.modules.size,
        utilCount: data.utils,
      }))
      .filter((c) => c.moduleCount > 0);
  }, []);

  return (
    <div className="p-6 sm:p-10 max-w-6xl mx-auto">
      <div className="flex flex-col gap-7">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[var(--primary-soft)] text-[var(--primary)] text-xs font-mono font-medium mb-3">
              <span>{TOTAL_MODULES_COUNT} Modules</span>
              <span className="opacity-50">•</span>
              <span>{TOTAL_UTILITIES_COUNT} Utilities</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-[var(--text)]">
              API Directory
            </h1>
            <p className="text-[var(--text-muted)] text-sm sm:text-base mt-1.5 max-w-2xl">
              Explore tree-shakeable modules, inspect TypeScript signatures, and test functions live in the browser.
            </p>
          </div>
        </div>

        {/* Top Tabs */}
        <div className="flex border-b border-[var(--border)] gap-6 overflow-x-auto">
          {(
            [
              { id: 'modules', label: `Modules (${TOTAL_MODULES_COUNT})` },
              { id: 'utils', label: `Utilities (${TOTAL_UTILITIES_COUNT})` },
              { id: 'categories', label: 'Categories' },
              { id: 'favorites', label: `Saved (${favoriteUtils.length})` },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2.5 border-b-2 font-medium text-sm whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'border-[var(--primary)] text-[var(--primary)]'
                  : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'modules' && (
          <div className="flex flex-col gap-6">
            {/* Filters */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="flex flex-wrap gap-1.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      activeCategory === cat
                        ? 'bg-[var(--primary)] text-white shadow-xs'
                        : 'bg-[var(--surface)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--border-strong)]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 w-full lg:w-auto">
                <div className="relative flex-1 lg:w-60">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-faint)]" />
                  <input
                    type="text"
                    placeholder="Filter modules..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Filter modules"
                    className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-lg pl-9 pr-3 py-1.5 text-sm text-[var(--text)] placeholder-[var(--text-faint)] focus:outline-none focus:border-[var(--primary)]"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setSortBy((s) => (s === 'name' ? 'count' : 'name'))}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--border-strong)] transition-colors cursor-pointer shrink-0"
                  title="Toggle sort order"
                >
                  <ArrowUpDown size={13} />
                  <span>{sortBy === 'name' ? 'A–Z' : 'Most Utils'}</span>
                </button>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredModules.map((mod, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.015, 0.25), duration: 0.2 }}
                  key={mod.name}
                >
                  <Link
                    to={`/modules/${mod.name.toLowerCase()}`}
                    className="group flex flex-col h-full bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-2)]/60 rounded-xl p-5 transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="p-2 bg-[var(--primary-soft)] rounded-lg text-[var(--primary)] shrink-0">
                          <Layers size={16} />
                        </div>
                        <h3 className="font-semibold text-[var(--text)] text-base truncate">
                          {mod.name}
                        </h3>
                      </div>
                      <ChevronRight
                        size={16}
                        className="text-[var(--text-faint)] group-hover:text-[var(--primary)] group-hover:translate-x-0.5 transition-all shrink-0"
                      />
                    </div>

                    <p className="text-xs text-[var(--text-muted)] line-clamp-2 mb-4">
                      {mod.description}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-3 border-t border-[var(--border)]/60">
                      <span className="text-[11px] font-medium text-[var(--text-muted)] bg-[var(--surface-2)] px-2 py-0.5 rounded-md border border-[var(--border)]">
                        {mod.category}
                      </span>
                      <span className="text-[11px] font-mono font-semibold text-[var(--primary)] bg-[var(--primary-soft)] px-2 py-0.5 rounded-md">
                        {mod.count} utils
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {filteredModules.length === 0 && (
              <div className="py-16 text-center rounded-xl border border-dashed border-[var(--border)] bg-[var(--surface)]/40">
                <p className="text-sm text-[var(--text-muted)]">No modules found matching your criteria.</p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory('All');
                    setSearchQuery('');
                  }}
                  className="mt-3 text-xs font-medium text-[var(--primary)] hover:underline cursor-pointer"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'utils' && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="relative w-full sm:w-96">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-faint)]" />
                <input
                  type="text"
                  placeholder="Search utilities by name, module, or description..."
                  value={utilSearchQuery}
                  onChange={(e) => setUtilSearchQuery(e.target.value)}
                  aria-label="Search utilities"
                  className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-lg pl-9 pr-4 py-2 text-sm text-[var(--text)] placeholder-[var(--text-faint)] focus:outline-none focus:border-[var(--primary)]"
                />
              </div>
              <span className="text-xs font-mono text-[var(--text-faint)]">
                Showing {filteredUtils.length}
                {!utilSearchQuery.trim() && TOTAL_UTILITIES_COUNT > 120 ? ` of ${TOTAL_UTILITIES_COUNT}` : ''} utilities
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
              {filteredUtils.map((u) => {
                const fav = isFavorite(u.id);
                return (
                  <div
                    key={u.id}
                    className="flex items-start justify-between gap-3 bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-strong)] rounded-xl p-4 transition-colors group"
                  >
                    <Link
                      to={`/modules/${u.module.toLowerCase()}?u=${u.id}`}
                      className="flex-1 min-w-0"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Code2 size={14} className="text-[var(--primary)] shrink-0" />
                        <h3 className="font-semibold text-[var(--text)] font-mono text-sm group-hover:text-[var(--primary)] transition-colors truncate">
                          {u.name}
                        </h3>
                        <span className="text-[10px] font-mono font-medium text-[var(--text-muted)] bg-[var(--surface-2)] px-1.5 py-0.5 rounded border border-[var(--border)] shrink-0">
                          {u.module}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--text-muted)] line-clamp-2">{u.description}</p>
                    </Link>

                    <button
                      type="button"
                      onClick={() => toggleFavorite(u.id)}
                      aria-label={fav ? `Remove ${u.name} from saved` : `Save ${u.name}`}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer shrink-0 ${
                        fav
                          ? 'text-[var(--warning)] bg-[var(--surface-2)]'
                          : 'text-[var(--text-faint)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]'
                      }`}
                    >
                      <Star size={15} fill={fav ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                );
              })}
            </div>

            {filteredUtils.length === 0 && (
              <div className="py-16 text-center rounded-xl border border-dashed border-[var(--border)] bg-[var(--surface)]/40">
                <p className="text-sm text-[var(--text-muted)]">No utilities found matching "{utilSearchQuery}".</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryStats.map((cat) => (
              <button
                key={cat.name}
                type="button"
                onClick={() => {
                  setActiveCategory(cat.name);
                  setActiveTab('modules');
                }}
                className="flex flex-col text-left h-full bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-2)]/60 rounded-xl p-6 transition-all cursor-pointer group"
              >
                <h3 className="text-lg font-semibold text-[var(--text)] group-hover:text-[var(--primary)] transition-colors mb-4">
                  {cat.name}
                </h3>
                <div className="mt-auto flex items-center gap-5">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold font-mono text-[var(--primary)]">{cat.moduleCount}</span>
                    <span className="text-[11px] text-[var(--text-faint)] font-medium uppercase tracking-wider">Modules</span>
                  </div>
                  <div className="w-px h-8 bg-[var(--border)]" />
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold font-mono text-[var(--text)]">{cat.utilCount}</span>
                    <span className="text-[11px] text-[var(--text-faint)] font-medium uppercase tracking-wider">Utilities</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {activeTab === 'favorites' && (
          <div>
            {favoriteUtils.length === 0 ? (
              <div className="py-16 text-center rounded-xl border border-dashed border-[var(--border)] bg-[var(--surface)]/40 space-y-2">
                <Star size={24} className="mx-auto text-[var(--text-faint)]" />
                <p className="text-sm font-medium text-[var(--text)]">No saved utilities yet</p>
                <p className="text-xs text-[var(--text-muted)] max-w-md mx-auto">
                  Star any utility from the Utilities tab or a module detail page to keep your most-used functions one click away.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
                {favoriteUtils.map((u) => (
                  <div
                    key={u.id}
                    className="flex items-start justify-between gap-3 bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-strong)] rounded-xl p-4 transition-colors group"
                  >
                    <Link to={`/modules/${u.module.toLowerCase()}?u=${u.id}`} className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Code2 size={14} className="text-[var(--primary)] shrink-0" />
                        <h3 className="font-semibold text-[var(--text)] font-mono text-sm group-hover:text-[var(--primary)] truncate">
                          {u.name}
                        </h3>
                        <span className="text-[10px] font-mono text-[var(--text-muted)] bg-[var(--surface-2)] px-1.5 py-0.5 rounded border border-[var(--border)]">
                          {u.module}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--text-muted)] line-clamp-2">{u.description}</p>
                    </Link>
                    <button
                      type="button"
                      onClick={() => toggleFavorite(u.id)}
                      aria-label={`Remove ${u.name} from saved`}
                      className="p-1.5 rounded-lg text-[var(--warning)] bg-[var(--surface-2)] cursor-pointer shrink-0"
                    >
                      <Star size={15} fill="currentColor" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
