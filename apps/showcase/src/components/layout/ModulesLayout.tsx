import React, { useState, useMemo } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { utilitiesData } from '../../data/utilitiesData';
import { Layers, ChevronRight, Code2, Search, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ModulesLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarFilter, setSidebarFilter] = useState('');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const groupedUtilities = useMemo(() => {
    const groups: Record<string, typeof utilitiesData> = {};
    utilitiesData.forEach((u) => {
      if (!groups[u.module]) groups[u.module] = [];
      groups[u.module].push(u);
    });
    const sortedGroups: Record<string, typeof utilitiesData> = {};
    Object.keys(groups)
      .sort()
      .forEach((k) => {
        sortedGroups[k] = groups[k];
      });
    return sortedGroups;
  }, []);

  const filteredGroups = useMemo(() => {
    const q = sidebarFilter.trim().toLowerCase();
    if (!q) return Object.entries(groupedUtilities);
    return Object.entries(groupedUtilities).filter(([moduleName, utils]) => {
      if (moduleName.toLowerCase().includes(q)) return true;
      return utils.some((u) => u.name.toLowerCase().includes(q));
    });
  }, [groupedUtilities, sidebarFilter]);

  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    const match = location.pathname.match(/\/modules\/([^/]+)/);
    if (match) {
      const currentModule = Object.keys(groupedUtilities).find(
        (m) => m.toLowerCase() === match[1].toLowerCase()
      );
      if (currentModule) {
        initial[currentModule] = true;
      }
    }
    return initial;
  });

  const toggleModule = (module: string) => {
    setExpandedModules((prev) => ({ ...prev, [module]: !prev[module] }));
  };

  const renderSidebarBody = (onNavigateMobile?: () => void) => (
    <>
      <div className="p-3.5 border-b border-[var(--border)] space-y-2.5 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers size={16} className="text-[var(--primary)]" />
            <h2 className="font-semibold text-sm text-[var(--text)]">Modules</h2>
          </div>
          <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text-faint)]">
            {Object.keys(groupedUtilities).length}
          </span>
        </div>
        <div className="relative">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--text-faint)]" />
          <input
            type="text"
            value={sidebarFilter}
            onChange={(e) => setSidebarFilter(e.target.value)}
            placeholder="Filter modules or fns..."
            aria-label="Filter modules in sidebar"
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] pl-8 pr-7 py-1.5 text-xs text-[var(--text)] placeholder-[var(--text-faint)] focus:outline-none focus:border-[var(--primary)]"
          />
          {sidebarFilter && (
            <button
              type="button"
              onClick={() => setSidebarFilter('')}
              aria-label="Clear sidebar filter"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--text-faint)] hover:text-[var(--text)] cursor-pointer"
            >
              <X size={13} />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2.5 space-y-1">
        <NavLink
          to="/modules"
          end
          onClick={onNavigateMobile}
          className={({ isActive }) =>
            `flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              isActive
                ? 'bg-[var(--primary-soft)] text-[var(--primary)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]'
            }`
          }
        >
          <span>Directory Overview</span>
        </NavLink>

        {filteredGroups.map(([moduleName, utils]) => {
          const isExpanded = Boolean(expandedModules[moduleName]) || Boolean(sidebarFilter.trim());
          const isActiveModule = location.pathname.toLowerCase() === `/modules/${moduleName.toLowerCase()}`;

          return (
            <div key={moduleName} className="flex flex-col gap-0.5">
              <button
                type="button"
                onClick={() => {
                  toggleModule(moduleName);
                  if (!isExpanded) {
                    navigate(`/modules/${moduleName.toLowerCase()}`);
                    onNavigateMobile?.();
                  }
                }}
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                  isActiveModule
                    ? 'bg-[var(--primary-soft)] text-[var(--primary)] font-semibold'
                    : 'text-[var(--text-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="truncate">{moduleName}</span>
                  <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text-faint)]">
                    {utils.length}
                  </span>
                </div>
                <ChevronRight
                  size={13}
                  className={`shrink-0 transition-transform duration-150 ${isExpanded ? 'rotate-90' : ''}`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="pl-3 overflow-hidden space-y-0.5 border-l border-[var(--border)] ml-3 my-0.5"
                  >
                    {utils.map((utility) => {
                      const params = new URLSearchParams(location.search);
                      const isUtilityActive = isActiveModule && params.get('u') === utility.id;
                      const isDefaultActive = isActiveModule && !params.get('u') && utils[0].id === utility.id;
                      const isActive = isUtilityActive || isDefaultActive;

                      return (
                        <li key={utility.id}>
                          <NavLink
                            to={`/modules/${moduleName.toLowerCase()}?u=${utility.id}`}
                            onClick={onNavigateMobile}
                            className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs font-mono transition-colors ${
                              isActive
                                ? 'bg-[var(--primary-soft)] text-[var(--primary)] font-medium'
                                : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]'
                            }`}
                          >
                            <Code2 size={11} className="shrink-0 opacity-70" />
                            <span className="truncate">{utility.name}</span>
                          </NavLink>
                        </li>
                      );
                    })}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {filteredGroups.length === 0 && (
          <div className="px-3 py-6 text-center text-xs text-[var(--text-faint)]">
            No modules match "{sidebarFilter}"
          </div>
        )}
      </div>
    </>
  );

  return (
    <div className="min-h-[calc(100vh-60px)] w-full flex flex-col md:flex-row bg-[var(--bg)]">
      {/* Mobile Module Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-2.5 border-b border-[var(--border)] bg-[var(--surface)]">
        <span className="text-xs font-medium text-[var(--text-muted)] flex items-center gap-2">
          <Layers size={14} className="text-[var(--primary)]" />
          Browse Modules
        </span>
        <button
          type="button"
          onClick={() => setMobileDrawerOpen((v) => !v)}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-xs font-medium text-[var(--text)] cursor-pointer"
        >
          {mobileDrawerOpen ? <X size={14} /> : <Menu size={14} />}
          <span>{mobileDrawerOpen ? 'Close' : 'All Modules'}</span>
        </button>
      </div>

      {mobileDrawerOpen && (
        <div className="md:hidden border-b border-[var(--border)] bg-[var(--surface)] max-h-[60vh] flex flex-col">
          {renderSidebarBody(() => setMobileDrawerOpen(false))}
        </div>
      )}

      {/* Desktop Sticky Sidebar */}
      <aside className="w-72 border-r border-[var(--border)] bg-[var(--surface)]/60 hidden md:flex flex-col sticky top-[60px] h-[calc(100vh-60px)] shrink-0">
        {renderSidebarBody()}
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0">
        <Outlet />
      </main>
    </div>
  );
}
