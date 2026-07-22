import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  children: React.ReactNode;
  className?: string;
}

export function Button({ variant = 'primary', children, className = "", ...props }: ButtonProps) {
  const baseStyles = "font-semibold px-6 py-3 rounded-xl transition-all inline-flex items-center justify-center";
  const variants = {
    primary: "bg-gradient-to-r from-[#4F8DFD] via-[#6B6CF7] to-[#8B5CF6] text-white shadow-lg shadow-primary/20 hover:opacity-95 active:scale-[0.98]",
    outline: "bg-surface hover:bg-[#EEF2F8] dark:hover:bg-white/5 text-[#1F2937] dark:text-white border border-border hover:border-primary/40 active:scale-[0.98]"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
