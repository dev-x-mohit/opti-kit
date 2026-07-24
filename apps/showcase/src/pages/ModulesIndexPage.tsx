import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Layers, ChevronRight } from 'lucide-react';
import { utilitiesData, UtilityMeta } from '../data/utilitiesData';

const moduleCategories: Record<string, string> = {
  String: 'Data',
  Array: 'Data',
  Crypto: 'Security & Encoders',
  Encoding: 'Security & Encoders',
  Validate: 'Security & Encoders',
  Hash: 'Security & Encoders',
  Binary: 'Security & Encoders',
  
  Math: 'Math & Science',
  Number: 'Math & Science',
  Statistics: 'Math & Science',
  Geometry: 'Math & Science',
  Units: 'Math & Science',
  ML: 'Math & Science',
  NLP: 'Math & Science',
  Finance: 'Math & Science',
  Matrix: 'Math & Science',
  Vector: 'Math & Science',
  Graph: 'Math & Science',
  
  Browser: 'Web',
  DOM: 'Web',
  URL: 'Web',
  Storage: 'Web',
  Keyboard: 'Web',
  Events: 'Web',
  'Html Entities': 'Web',
  Http: 'Web',
  
  Async: 'Async & Logic',
  Functional: 'Async & Logic',
  Store: 'Async & Logic',
  FSM: 'Async & Logic',
  Concurrency: 'Async & Logic',
  Memoize: 'Async & Logic',
  Retry: 'Async & Logic',
  
  Object: 'Data',
  Collection: 'Data',
  JSON: 'Data',
  CSV: 'Data',
  DS: 'Data',
  Tree: 'Data',
  Deep: 'Data',
  Map: 'Data',
  Set: 'Data',
  Iter: 'Data',
  Sort: 'Data',
  Search: 'Data',
  
  Random: 'Utilities',
  Color: 'Utilities',
  'Color Space': 'Utilities',
  Regex: 'Utilities',
  Types: 'Utilities',
  Cache: 'Utilities',
  Guard: 'Utilities',
  Format: 'Utilities',
  Schema: 'Utilities',
  Date: 'Utilities',
  Log: 'Utilities',
  Semver: 'Utilities',
  Bit: 'Utilities',
  Image: 'Utilities',
  Duration: 'Utilities',
  File: 'Utilities',
  Intl: 'Utilities',
  Path: 'Utilities',
  Perf: 'Utilities',
  Template: 'Utilities',
  'Byte Size': 'Utilities',
  Error: 'Utilities',
  Easing: 'Utilities',
};

const categories = ['All', 'Data', 'Math & Science', 'Web', 'Async & Logic', 'Security & Encoders', 'Utilities'];

export function ModulesIndexPage() {
  const [activeTab, setActiveTab] = useState<'modules' | 'utils' | 'categories'>('modules');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [utilSearchQuery, setUtilSearchQuery] = useState('');

  const moduleStats = useMemo(() => {
    const stats: Record<string, { count: number; name: string; category: string; description: string }> = {};
    utilitiesData.forEach((u) => {
      if (!stats[u.module]) {
        stats[u.module] = {
          name: u.module,
          count: 0,
          category: moduleCategories[u.module] || 'Utilities',
          description: u.description
        };
      }
      stats[u.module].count++;
    });
    return Object.values(stats).sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const filteredModules = useMemo(() => {
    return moduleStats.filter((mod) => {
      const matchCategory = activeCategory === 'All' || mod.category === activeCategory;
      const matchSearch = mod.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery, moduleStats]);

  const filteredUtils = useMemo(() => {
    if (!utilSearchQuery) return utilitiesData.slice(0, 100); // Limit initial render for performance
    const lowerQ = utilSearchQuery.toLowerCase();
    return utilitiesData.filter(u => 
      u.name.toLowerCase().includes(lowerQ) || 
      u.description.toLowerCase().includes(lowerQ) ||
      u.module.toLowerCase().includes(lowerQ)
    ).slice(0, 100);
  }, [utilSearchQuery]);

  const categoryStats = useMemo(() => {
    const stats: Record<string, { modules: Set<string>, utils: number }> = {};
    categories.forEach(c => {
      if (c !== 'All') stats[c] = { modules: new Set(), utils: 0 };
    });
    
    utilitiesData.forEach(u => {
      const cat = moduleCategories[u.module] || 'Utilities';
      if (!stats[cat]) stats[cat] = { modules: new Set(), utils: 0 };
      stats[cat].modules.add(u.module);
      stats[cat].utils++;
    });

    return Object.entries(stats).map(([name, data]) => ({
      name,
      moduleCount: data.modules.size,
      utilCount: data.utils
    })).filter(c => c.moduleCount > 0);
  }, []);

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-text-main mb-2">Directory</h1>
          <p className="text-muted text-lg max-w-2xl">
            Explore 67 hand-optimized modules and over 680 utilities. 
          </p>
        </div>

        {/* Top Tabs */}
        <div className="flex border-b border-border gap-6">
          <button 
            onClick={() => setActiveTab('modules')} 
            className={`pb-2 border-b-2 font-medium text-sm transition-colors ${activeTab === 'modules' ? 'border-primary text-primary' : 'border-transparent text-muted hover:text-text-main hover:border-border'}`}
          >
            Modules
          </button>
          <button 
            onClick={() => setActiveTab('utils')} 
            className={`pb-2 border-b-2 font-medium text-sm transition-colors ${activeTab === 'utils' ? 'border-primary text-primary' : 'border-transparent text-muted hover:text-text-main hover:border-border'}`}
          >
            Utilities
          </button>
          <button 
            onClick={() => setActiveTab('categories')} 
            className={`pb-2 border-b-2 font-medium text-sm transition-colors ${activeTab === 'categories' ? 'border-primary text-primary' : 'border-transparent text-muted hover:text-text-main hover:border-border'}`}
          >
            Categories
          </button>
        </div>

        {activeTab === 'modules' && (
          <div className="flex flex-col gap-6">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                      activeCategory === cat 
                        ? 'bg-primary text-white shadow-md shadow-primary/20' 
                        : 'bg-surface border border-border text-muted hover:text-text-main hover:border-primary/30'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
                <input 
                  type="text"
                  placeholder="Filter modules..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-surface border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredModules.map((mod, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03, duration: 0.3 }}
                  key={mod.name}
                >
                  <Link 
                    to={`/modules/${mod.name.toLowerCase()}`}
                    className="group flex flex-col h-full bg-surface border border-border hover:border-primary/40 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                          <Layers size={18} />
                        </div>
                        <h3 className="font-bold text-text-main text-lg">{mod.name}</h3>
                      </div>
                      <ChevronRight size={18} className="text-muted group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                    
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/50">
                      <span className="text-xs font-semibold text-muted bg-black/5 dark:bg-white/5 px-2 py-1 rounded-md">
                        {mod.category}
                      </span>
                      <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-2 py-1 rounded-md">
                        {mod.count} utils
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            
            {filteredModules.length === 0 && (
              <div className="py-20 text-center">
                <p className="text-muted">No modules found matching your criteria.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'utils' && (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
                <input 
                  type="text"
                  placeholder="Search utilities by name or description..."
                  value={utilSearchQuery}
                  onChange={e => setUtilSearchQuery(e.target.value)}
                  className="w-full bg-surface border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <span className="text-sm text-muted hidden sm:block">
                Showing {filteredUtils.length} {filteredUtils.length === 100 && !utilSearchQuery ? '(Top 100) ' : ''}utilities
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredUtils.map((u, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (i % 10) * 0.02, duration: 0.2 }}
                  key={u.id}
                >
                  <Link 
                    to={`/modules/${u.module.toLowerCase()}?u=${u.id}`}
                    className="flex flex-col h-full bg-surface border border-border hover:border-primary/40 rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-text-main font-mono text-sm group-hover:text-primary transition-colors">{u.name}</h3>
                      <span className="text-[10px] font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded border border-primary/20">
                        {u.module}
                      </span>
                    </div>
                    <p className="text-xs text-muted line-clamp-2 mt-1">{u.description}</p>
                  </Link>
                </motion.div>
              ))}
            </div>

            {filteredUtils.length === 0 && (
              <div className="py-20 text-center">
                <p className="text-muted">No utilities found matching "{utilSearchQuery}".</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryStats.map((cat, i) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                key={cat.name}
              >
                <div 
                  onClick={() => {
                    setActiveCategory(cat.name);
                    setActiveTab('modules');
                  }}
                  className="flex flex-col h-full bg-surface border border-border hover:border-primary/40 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                >
                  <h3 className="text-xl font-bold text-text-main group-hover:text-primary transition-colors mb-4">{cat.name}</h3>
                  <div className="mt-auto flex items-center gap-4">
                    <div className="flex flex-col">
                      <span className="text-2xl font-black text-primary">{cat.moduleCount}</span>
                      <span className="text-xs text-muted font-medium uppercase tracking-wider">Modules</span>
                    </div>
                    <div className="w-px h-8 bg-border"></div>
                    <div className="flex flex-col">
                      <span className="text-2xl font-black text-text-main">{cat.utilCount}</span>
                      <span className="text-xs text-muted font-medium uppercase tracking-wider">Utilities</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
