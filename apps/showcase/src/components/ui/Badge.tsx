import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'neutral';
  pill?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

export function Badge({
  children,
  variant = 'primary',
  pill = true,
  className = '',
  icon,
}: BadgeProps) {
  const variantStyles = {
    primary: 'bg-[var(--primary-soft)] text-[var(--primary)] border-transparent',
    success: 'bg-[var(--success-soft)] text-[var(--success)] border-transparent',
    neutral: 'bg-[var(--surface-2)] text-[var(--text-muted)] border-[var(--border)]',
  };

  const radius = pill ? 'rounded-full' : 'rounded-md';

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium border ${radius} ${variantStyles[variant]} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
