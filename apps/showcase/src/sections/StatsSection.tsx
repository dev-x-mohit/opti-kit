import React, { useState, useEffect, useRef } from 'react';
import { Info } from 'lucide-react';
import { statsData } from '../data/statsData';
import { Tooltip } from '../components/ui/Tooltip';

export function StatsSection() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0, 0]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 1200; // ms
          const startTime = performance.now();

          const update = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const ease = 1 - Math.pow(1 - progress, 3);

            setCounts(
              statsData.map((stat) => Math.round(stat.value * ease))
            );

            if (progress < 1) {
              requestAnimationFrame(update);
            }
          };

          requestAnimationFrame(update);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section
      ref={sectionRef}
      className="py-12 border-b border-[var(--border)] bg-[var(--bg-subtle)]"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]/60">
          {statsData.map((stat, idx) => (
            <div
              key={stat.id}
              className={`flex flex-col items-center text-center ${
                idx > 0 ? 'pt-4 sm:pt-0 sm:pl-6' : ''
              }`}
            >
              <div className="flex items-baseline gap-0.5 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[var(--text)] font-mono">
                <span>{hasAnimated ? counts[idx] : stat.value}</span>
                <span className="text-[var(--primary)] text-xl sm:text-2xl">{stat.suffix}</span>
              </div>

              <div className="mt-1 flex items-center gap-1.5 text-xs font-medium text-[var(--text-muted)]">
                <span>{stat.label}</span>
                <Tooltip content={`${stat.tooltip} (${stat.sourceText})`}>
                  <button
                    aria-label={`Measurement methodology for ${stat.label}`}
                    className="text-[var(--text-faint)] hover:text-[var(--text)] transition-colors p-0.5 cursor-pointer"
                  >
                    <Info size={12} />
                  </button>
                </Tooltip>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
