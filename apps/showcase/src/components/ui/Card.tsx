import React, { useState } from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  featured?: boolean;
  hoverable?: boolean;
  spotlight?: boolean;
}

export function Card({
  children,
  className = '',
  featured = false,
  hoverable = true,
  spotlight = true,
  onMouseMove,
  ...props
}: CardProps) {
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (spotlight) {
      const rect = e.currentTarget.getBoundingClientRect();
      setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
    onMouseMove?.(e);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => spotlight && setCoords(null)}
      className={`group/card relative rounded-xl border border-[var(--border)] bg-[var(--surface)] transition-all duration-200 overflow-hidden ${
        featured ? 'border-t-2 border-t-[var(--primary)]' : ''
      } ${
        hoverable
          ? 'hover:bg-[var(--surface-2)]/70 hover:border-[var(--border-strong)] hover:-translate-y-[1px] hover:shadow-sm'
          : ''
      } ${className}`}
      {...props}
    >
      {spotlight && coords && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(320px circle at ${coords.x}px ${coords.y}px, var(--primary-soft), transparent 70%)`,
          }}
        />
      )}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
