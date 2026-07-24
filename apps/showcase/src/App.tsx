import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { HomePage } from './pages/HomePage';
import { DocsPage } from './pages/DocsPage';
import { ModulesPage } from './pages/ModulesPage';
import { PlaygroundPage } from './pages/PlaygroundPage';

import { BenchmarksPage } from './pages/BenchmarksPage';
import { CommandPalette } from './components/ui/CommandPalette';
import { ModulesLayout } from './components/layout/ModulesLayout';
import { ModulesIndexPage } from './pages/ModulesIndexPage';
import { ModuleDetailPage } from './pages/ModuleDetailPage';

function App() {
  return (
    <div className="min-h-screen selection:bg-primary/30 flex flex-col bg-background text-text-main">
      <Navbar />
      <CommandPalette />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/modules" element={<ModulesLayout />}>
            <Route index element={<ModulesIndexPage />} />
            <Route path=":moduleId" element={<ModuleDetailPage />} />
          </Route>
          <Route path="/playground" element={<PlaygroundPage />} />
          <Route path="/benchmarks" element={<BenchmarksPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
