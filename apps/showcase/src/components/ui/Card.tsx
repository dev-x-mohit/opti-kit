import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface CardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export function Card({ children, className = "", hoverable = false, ...props }: CardProps) {
  return (
    <motion.div 
      className={`bg-surface border border-border rounded-[24px] p-6 shadow-[0_10px_40px_rgba(15,23,42,0.05)] transition-all duration-300 ${hoverable ? 'hover:border-primary/40 hover:shadow-[0_15px_50px_rgba(79,141,253,0.12)] hover:-translate-y-0.5' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
