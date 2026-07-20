import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Menu, X } from 'lucide-react';
import { CodeBlock } from '../components/ui/CodeBlock';

export function DocsPage() {
  const [activeTab, setActiveTab] = useState('getting-started');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const installCode = `npm install @dev_x_mohit/opti-kit`;
  
  const usageCode = `import { slugify } from "@dev_x_mohit/opti-kit";\n\n// Outputs: "hello-world"\nslugify("Hello World");`;

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['getting-started', 'installation', 'usage', 'tree-shaking'];
      let currentSection = 'getting-started';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 120) {
            currentSection = section;
          }
        }
      }
      setActiveTab(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setActiveTab(id);
    setIsMobileMenuOpen(false);
  };

  const SidebarContent = () => (
    <>
      <div className="mb-8">
        <h4 className="font-semibold text-text-main mb-3 uppercase tracking-wider text-xs">Overview</h4>
        <ul className="space-y-2 text-sm">
          {[
            { id: 'getting-started', label: 'Getting Started' },
            { id: 'installation', label: 'Installation' },
            { id: 'usage', label: 'Usage' },
            { id: 'tree-shaking', label: 'Tree Shaking' }
          ].map(item => (
            <li key={item.id}>
              <button 
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left px-3 py-1.5 rounded-md transition-colors ${activeTab === item.id ? 'bg-primary/10 text-primary font-medium' : 'text-muted hover:text-text-main hover:bg-surface'}`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-semibold text-text-main mb-3 uppercase tracking-wider text-xs">Environments</h4>
        <ul className="space-y-2 text-sm">
          <li>
            <button className="block w-full text-left px-3 py-1.5 rounded-md text-muted hover:text-text-main hover:bg-surface transition-colors">
              Browser
            </button>
          </li>
          <li>
            <button className="block w-full text-left px-3 py-1.5 rounded-md text-muted hover:text-text-main hover:bg-surface transition-colors">
              Node.js
            </button>
          </li>
        </ul>
      </div>
    </>
  );

  return (
    <div className="container mx-auto px-4 max-w-[1500px] flex flex-col md:flex-row gap-8 h-[calc(100vh-64px)] overflow-hidden">
      
      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center justify-between bg-surface border border-border p-4 rounded-xl shadow-sm shrink-0">
        <span className="font-medium text-text-main">Documentation</span>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-text-main p-1.5 bg-background border border-border rounded-md hover:bg-surface transition-colors">
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-surface border border-border rounded-xl px-4 py-6 shadow-xl shrink-0 max-h-[50vh] flex flex-col custom-scrollbar"
          >
            <SidebarContent />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-72 lg:w-80 flex-col h-full border-r border-border pr-4 pt-6 shrink-0 pb-4 overflow-y-auto custom-scrollbar">
        <SidebarContent />
      </aside>


      {/* Main Content */}
      <main className="flex-1 h-full pt-6 overflow-y-auto pb-24 pr-4 custom-scrollbar">
        <div className="mb-12">
          <h1 id="getting-started" className="text-4xl font-bold text-text-main mb-6 pt-4 scroll-mt-24">Getting Started</h1>
          <p className="text-muted text-lg mb-8 leading-relaxed">
            OptiKit is a zero-dependency, ultra-lightweight utility library designed to replace bloated legacy libraries like Lodash and Moment. Built natively in TypeScript, it guarantees type safety and perfect tree-shaking right out of the box.
          </p>

          <h2 id="installation" className="text-2xl font-semibold text-text-main mt-16 mb-4 border-b border-border pb-2 pt-4 scroll-mt-24">Installation</h2>
          <p className="text-muted mb-4">Install OptiKit using your favorite package manager:</p>
          <CodeBlock code={installCode} language="bash" />

          <h2 id="usage" className="text-2xl font-semibold text-text-main mt-16 mb-4 border-b border-border pb-2 pt-4 scroll-mt-24">Usage</h2>
          <p className="text-muted mb-4">OptiKit provides modular exports. You can import exactly what you need without bloating your bundle:</p>
          <CodeBlock code={usageCode} language="typescript" />

          <h2 id="tree-shaking" className="text-2xl font-semibold text-text-main mt-16 mb-4 border-b border-border pb-2 pt-4 scroll-mt-24">Tree Shaking</h2>
          <p className="text-muted leading-relaxed mb-4">
            Because OptiKit is distributed with both CommonJS and standard ES Modules (ESM), modern bundlers like Vite, Webpack, and Rollup will automatically remove any functions you don't use from your final production bundle.
          </p>
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between pt-8 border-t border-border mt-16">
          <button className="flex flex-col text-left group">
            <span className="text-xs text-muted font-medium mb-1 uppercase tracking-wider">Previous</span>
            <span className="text-text-main font-medium flex items-center gap-2 group-hover:text-primary transition-colors">
              <ArrowLeft size={16} /> Introduction
            </span>
          </button>
          <button className="flex flex-col text-right group">
            <span className="text-xs text-muted font-medium mb-1 uppercase tracking-wider">Next</span>
            <span className="text-text-main font-medium flex items-center gap-2 group-hover:text-primary transition-colors">
              Installation <ArrowRight size={16} />
            </span>
          </button>
        </div>
      </main>
    </div>
  );
}
