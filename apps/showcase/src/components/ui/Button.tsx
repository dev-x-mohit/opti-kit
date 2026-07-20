import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  children: React.ReactNode;
  className?: string;
}

export function Button({ variant = 'primary', children, className = "", ...props }: ButtonProps) {
  const baseStyles = "font-medium px-6 py-3 rounded-md transition-colors inline-flex items-center justify-center";
  const variants = {
    primary: "bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]",
    outline: "bg-surface hover:bg-surface/80 text-text-main border border-border"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
