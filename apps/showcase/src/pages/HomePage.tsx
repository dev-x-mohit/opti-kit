import React, { Suspense, lazy } from 'react';
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

// Lazy load centerpiece interactive playground for optimal initial page load performance
const PlaygroundSection = lazy(() =>
  import('../sections/PlaygroundSection').then((mod) => ({ default: mod.PlaygroundSection }))
);

export function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Stats Strip */}
        <StatsSection />

        {/* Interactive Playground (Lazy Loaded with Suspense) */}
        <Suspense fallback={<PlaygroundSkeleton />}>
          <PlaygroundSection />
        </Suspense>

        {/* Bundle-size Comparison */}
        <BundleComparisonSection />

        {/* Feature Domains (Bento Grid + Side Drawer) */}
        <FeatureDomainsSection
          onOpenSearch={() => {
            window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
          }}
        />

        {/* Migration (Before/After with highlights) */}
        <MigrationSection />

        {/* Agentic Compute (MCP) */}
        <AgenticMcpSection />

        {/* Runs Everywhere (Node, Browser, Edge, Marquee) */}
        <RunsEverywhereSection />

        {/* Tree-shaking Visualizer */}
        <TreeShakingSection />

        {/* Monorepo Architecture */}
        <MonorepoArchitectureSection />

        {/* Quick Start */}
        <QuickStartSection />

        {/* Security & Trust */}
        <SecurityTrustSection />

        {/* Final CTA */}
        <FinalCtaSection />
      </main>

      <Footer />
    </div>
  );
}
