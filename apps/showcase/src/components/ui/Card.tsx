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
      className={`bg-surface border border-border rounded-xl p-6 shadow-sm ${hoverable ? 'hover:border-primary/30 transition-colors' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
