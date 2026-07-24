import React, { useState } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { utilitiesData } from '../../data/utilitiesData';
import { Layers, ChevronRight, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ModulesLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Group utilities by module
  const groupedUtilities = React.useMemo(() => {
    const groups: Record<string, typeof utilitiesData> = {};
    utilitiesData.forEach(u => {
      if (!groups[u.module]) groups[u.module] = [];
      groups[u.module].push(u);
    });
    // Sort keys
    const sortedGroups: Record<string, typeof utilitiesData> = {};
    Object.keys(groups).sort().forEach(k => {
      sortedGroups[k] = groups[k];
    });
    return sortedGroups;
  }, []);

  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    // Auto-expand if we are currently on a module's route
    const match = location.pathname.match(/\/modules\/([^\/]+)/);
    if (match) {
      const currentModule = Object.keys(groupedUtilities).find(
        m => m.toLowerCase() === match[1].toLowerCase()
      );
      if (currentModule) {
        initial[currentModule] = true;
      }
    }
    return initial;
  });

  const toggleModule = (module: string) => {
    setExpandedModules(prev => ({ ...prev, [module]: !prev[module] }));
  };

  return (
    <div className="min-h-[calc(100vh-64px)] w-full flex bg-background">
      {/* Sticky Sidebar */}
      <aside className="w-72 border-r border-border bg-surface/50 hidden md:flex flex-col sticky top-16 h-[calc(100vh-64px)]">
        <div className="p-4 border-b border-border flex items-center gap-2 shrink-0">
          <Layers size={18} className="text-primary" />
          <h2 className="font-bold text-text-main">All Modules</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-3 custom-scrollbar space-y-2">
          <NavLink 
            to="/modules" 
            end
            className={({ isActive }) => `flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive ? 'bg-primary/10 text-primary' : 'text-text-main hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            Overview
          </NavLink>
          
          {Object.entries(groupedUtilities).map(([moduleName, utils]) => {
            const isExpanded = expandedModules[moduleName];
            // Check if this module is active
            const isActiveModule = location.pathname.toLowerCase().includes(`/modules/${moduleName.toLowerCase()}`);
            
            return (
              <div key={moduleName} className="flex flex-col gap-1">
                <button
                  onClick={() => {
                    toggleModule(moduleName);
                    if (!isExpanded) {
                        navigate(`/modules/${moduleName.toLowerCase()}`);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActiveModule ? 'bg-primary/10 text-primary font-semibold' : 'text-muted hover:bg-black/5 dark:hover:bg-white/5 hover:text-text-main'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{moduleName}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-background border border-border flex items-center justify-center">
                      {utils.length}
                    </span>
                  </div>
                  <ChevronRight size={14} className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {isExpanded && (
                    <motion.ul 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="pl-3 overflow-hidden space-y-1"
                    >
                      {utils.map(utility => {
                        // Check if this utility is active based on search param
                        const params = new URLSearchParams(location.search);
                        const isUtilityActive = isActiveModule && params.get('u') === utility.id;
                        // Or if no u param, but it's the first one
                        const isDefaultActive = isActiveModule && !params.get('u') && utils[0].id === utility.id;
                        const isActive = isUtilityActive || isDefaultActive;

                        return (
                          <li key={utility.id}>
                            <NavLink
                              to={`/modules/${moduleName.toLowerCase()}?u=${utility.id}`}
                              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-colors ${
                                isActive
                                  ? 'bg-primary/5 text-primary font-medium'
                                  : 'text-muted hover:text-text-main hover:bg-black/5 dark:hover:bg-white/5'
                              }`}
                            >
                              <Code2 size={12} className="shrink-0" />
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
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
