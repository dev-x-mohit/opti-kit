import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Command, X, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { utilitiesData } from '../../data/utilitiesData';

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const filteredResults = React.useMemo(() => {
    if (!query) return [];
    const lowerQ = query.toLowerCase();
    
    // Exact match for module name gets priority, otherwise match utility name/desc
    const matches = utilitiesData.filter(u => 
      u.name.toLowerCase().includes(lowerQ) || 
      u.module.toLowerCase().includes(lowerQ) ||
      u.description.toLowerCase().includes(lowerQ)
    );
    
    // Sort logic: module exact match > name exact match > name includes > desc includes
    return matches.sort((a, b) => {
      const aMod = a.module.toLowerCase() === lowerQ ? 1 : 0;
      const bMod = b.module.toLowerCase() === lowerQ ? 1 : 0;
      if (aMod !== bMod) return bMod - aMod;
      
      const aName = a.name.toLowerCase() === lowerQ ? 1 : 0;
      const bName = b.name.toLowerCase() === lowerQ ? 1 : 0;
      if (aName !== bName) return bName - aName;
      
      return 0;
    }).slice(0, 15); // Show max 15 results
  }, [query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = (result: typeof utilitiesData[0]) => {
    setIsOpen(false);
    navigate(`/modules/${result.module.toLowerCase()}?u=${result.id}`);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, filteredResults.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && filteredResults.length > 0) {
      e.preventDefault();
      handleSelect(filteredResults[selectedIndex]);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-x-0 top-[10%] max-w-2xl mx-auto z-[101] p-4 sm:p-0"
          >
            <div className="bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[70vh]">
              <div className="flex items-center px-4 py-3 border-b border-border gap-3">
                <Search size={18} className="text-muted shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Search modules or utilities (e.g. 'chunk', 'array', 'isEmail')..."
                  className="flex-1 bg-transparent border-none focus:outline-none text-text-main text-base sm:text-lg placeholder:text-muted"
                />
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-md text-muted transition-colors shrink-0"
                >
                  <X size={18} />
                </button>
              </div>

              {query && filteredResults.length > 0 && (
                <div className="overflow-y-auto p-2 custom-scrollbar">
                  {filteredResults.map((result, idx) => (
                    <div
                      key={result.id}
                      onClick={() => handleSelect(result)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-start justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                        idx === selectedIndex 
                          ? 'bg-primary/10 border border-primary/20' 
                          : 'hover:bg-black/5 dark:hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <div className="flex flex-col gap-1 overflow-hidden">
                        <div className="flex items-center gap-2">
                          <Code2 size={16} className={idx === selectedIndex ? 'text-primary' : 'text-muted'} />
                          <span className={`font-semibold font-mono ${idx === selectedIndex ? 'text-primary' : 'text-text-main'}`}>
                            {result.name}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-surface border border-border text-[10px] font-bold text-muted uppercase tracking-wider">
                            {result.module}
                          </span>
                        </div>
                        <p className="text-xs text-muted truncate pr-4">{result.description}</p>
                      </div>
                      <div className="hidden sm:block shrink-0">
                        <span className="text-xs text-muted opacity-50 font-mono">Jump</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {query && filteredResults.length === 0 && (
                <div className="p-12 text-center text-muted">
                  <p>No results found for "{query}".</p>
                </div>
              )}

              {!query && (
                <div className="p-8 text-center text-muted border-t border-border bg-black/5 dark:bg-white/5 flex flex-col items-center gap-2">
                  <Command size={24} className="opacity-50" />
                  <p className="text-sm">Start typing to search all 740+ utilities</p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
