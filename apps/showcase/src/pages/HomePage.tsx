import React, { Suspense, lazy, useState } from 'react';
import { HeroSection } from '../sections/HeroSection';
import { StatsSection } from '../sections/StatsSection';
import { BundleComparisonSection } from '../sections/BundleComparisonSection';
import { FeatureDomainsSection } from '../sections/FeatureDomainsSection';
import { MigrationSection } from '../sections/MigrationSection';
import { AgenticMcpSection } from '../sections/AgenticMcpSection';
import { RunsEverywhereSection } from '../sections/RunsEverywhereSection';
import { TreeShakingSection } from '../sections/TreeShakingSection';
import { MonorepoArchitectureSection } from '../sections/MonorepoArchitectureSection';
import { QuickStartSection } from '../sections/QuickStartSection';
import { SecurityTrustSection } from '../sections/SecurityTrustSection';
import { FinalCtaSection } from '../sections/FinalCtaSection';
import { Footer } from '../components/layout/Footer';
import { PlaygroundSkeleton } from '../components/ui/Skeleton';
import { CommandPalette } from '../components/ui/CommandPalette';

// Lazy load centerpiece interactive playground for optimal initial page load performance
const PlaygroundSection = lazy(() =>
  import('../sections/PlaygroundSection').then((mod) => ({ default: mod.PlaygroundSection }))
);

export function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Skip to main content accessibility link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[var(--primary)] text-white rounded-lg font-medium shadow-md"
      >
        Skip to main content
      </a>

      {/* Global Cmd+K Search Command Palette */}
      <CommandPalette />

      <main id="main-content" className="flex-1">
        {/* 2. Hero Section */}
        <HeroSection />

        {/* 3. Stats Strip */}
        <StatsSection />

        {/* 4. Interactive Playground (Lazy Loaded with Suspense) */}
        <Suspense fallback={<PlaygroundSkeleton />}>
          <PlaygroundSection />
        </Suspense>

        {/* 5. Bundle-size Comparison */}
        <BundleComparisonSection />

        {/* 6. Feature Domains (Bento Grid + Side Drawer) */}
        <FeatureDomainsSection onOpenSearch={() => {
          window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
        }} />

        {/* 7. Migration (Before/After with highlights) */}
        <MigrationSection />

        {/* 8. Agentic Compute (MCP) */}
        <AgenticMcpSection />

        {/* 9. Runs Everywhere (Node, Browser, Edge, Marquee) */}
        <RunsEverywhereSection />

        {/* 10. Tree-shaking Visualizer */}
        <TreeShakingSection />

        {/* 11. Monorepo Architecture */}
        <MonorepoArchitectureSection />

        {/* 12. Quick Start */}
        <QuickStartSection />

        {/* 13. Security & Trust */}
        <SecurityTrustSection />

        {/* 14. Final CTA */}
        <FinalCtaSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
