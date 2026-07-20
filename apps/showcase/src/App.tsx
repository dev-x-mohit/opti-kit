import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { HomePage } from './pages/HomePage';
import { DocsPage } from './pages/DocsPage';
import { ModulesPage } from './pages/ModulesPage';
import { PlaygroundPage } from './pages/PlaygroundPage';

function App() {
  return (
    <div className="min-h-screen selection:bg-primary/30 flex flex-col bg-background text-text-main">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/modules" element={<ModulesPage />} />
          <Route path="/playground" element={<PlaygroundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
