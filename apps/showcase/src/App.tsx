import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { HomePage } from './pages/HomePage';
import { DocsPage } from './pages/DocsPage';
import { ModulesLayout } from './components/layout/ModulesLayout';
import { ModulesIndexPage } from './pages/ModulesIndexPage';
import { ModuleDetailPage } from './pages/ModuleDetailPage';
import { PlaygroundPage } from './pages/PlaygroundPage';
import { BenchmarksPage } from './pages/BenchmarksPage';
import { useTheme } from './hooks/useTheme';

export function App() {
  const { isDark, toggleTheme } = useTheme();

  const handleOpenSearch = () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text)] transition-colors duration-200">
      {/* 1. Navbar */}
      <Navbar
        isDark={isDark}
        toggleTheme={toggleTheme}
        onOpenSearch={handleOpenSearch}
      />

      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/modules" element={<ModulesLayout />}>
          <Route index element={<ModulesIndexPage />} />
          <Route path=":moduleId" element={<ModuleDetailPage />} />
        </Route>
        <Route path="/playground" element={<PlaygroundPage />} />
        <Route path="/benchmarks" element={<BenchmarksPage />} />
      </Routes>
    </div>
  );
}

export default App;
