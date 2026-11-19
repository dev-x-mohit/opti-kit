import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  featured?: boolean;
  hoverable?: boolean;
}

export function Card({
  children,
  className = '',
  featured = false,
  hoverable = true,
  ...props
}: CardProps) {
  return (
    <div
      className={`relative rounded-xl border border-[var(--border)] bg-[var(--surface)] transition-all duration-200 ${
        featured ? 'border-t-2 border-t-[var(--primary)]' : ''
      } ${
        hoverable ? 'hover:bg-[var(--surface-2)] hover:border-[var(--border-strong)] hover:-translate-y-[1px]' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
