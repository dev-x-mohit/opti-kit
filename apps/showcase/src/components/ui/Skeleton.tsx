import React from 'react';

export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-[var(--surface-2)]/60 ${className}`}
    />
  );
}

export function PlaygroundSkeleton() {
  return (
    <section className="py-20 border-b border-[var(--border)] bg-[var(--bg)]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="text-center mb-10 space-y-3">
          <Skeleton className="h-6 w-32 mx-auto" />
          <Skeleton className="h-10 w-96 mx-auto" />
          <Skeleton className="h-5 w-80 mx-auto" />
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 h-[500px] flex gap-6">
          <div className="w-1/2 space-y-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="w-1/2 space-y-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
