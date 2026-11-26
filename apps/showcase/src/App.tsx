import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { CommandPalette } from './components/ui/CommandPalette';
import { ToastProvider } from './components/ui/Toast';
import { BundleDrawer } from './components/ui/BundleDrawer';
import { HomePage } from './pages/HomePage';
import { DocsPage } from './pages/DocsPage';
import { ModulesLayout } from './components/layout/ModulesLayout';
import { ModulesIndexPage } from './pages/ModulesIndexPage';
import { ModuleDetailPage } from './pages/ModuleDetailPage';
import { PlaygroundPage } from './pages/PlaygroundPage';
import { BenchmarksPage } from './pages/BenchmarksPage';
import { ChangelogPage } from './pages/ChangelogPage';
import { useTheme } from './hooks/useTheme';

export function App() {
  const { isDark, toggleTheme } = useTheme();
  const [bundleOpen, setBundleOpen] = useState(false);

  const handleOpenSearch = () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
  };

  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text)] transition-colors duration-200">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[var(--primary)] text-white rounded-lg font-medium shadow-md"
        >
          Skip to main content
        </a>

        <Navbar
          isDark={isDark}
          toggleTheme={toggleTheme}
          onOpenSearch={handleOpenSearch}
          onOpenBundle={() => setBundleOpen(true)}
        />

        {/* Global Cmd/Ctrl+K Command Palette */}
        <CommandPalette
          onOpenBundle={() => setBundleOpen(true)}
          onToggleTheme={toggleTheme}
        />

        {/* Slide-over Tree-Shaking Bundle Estimator */}
        <BundleDrawer isOpen={bundleOpen} onClose={() => setBundleOpen(false)} />

        <div id="main-content" className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/modules" element={<ModulesLayout />}>
              <Route index element={<ModulesIndexPage />} />
              <Route path=":moduleId" element={<ModuleDetailPage />} />
            </Route>
            <Route path="/playground" element={<PlaygroundPage />} />
            <Route path="/benchmarks" element={<BenchmarksPage />} />
            <Route path="/changelog" element={<ChangelogPage />} />
          </Routes>
        </div>
      </div>
    </ToastProvider>
  );
}

export default App;
