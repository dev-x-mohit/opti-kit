import React from 'react';

interface OptiKitLogoProps {
  size?: number;
  showVersion?: boolean;
  version?: string;
  className?: string;
}

export function OptiKitLogo({ 
  size = 36, 
  showVersion = false, 
  version = "v1.0.6",
  className = "" 
}: OptiKitLogoProps) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <div className="relative flex items-center justify-center transition-transform hover:scale-105" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="optikit-hex-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4F8DFD" />
              <stop offset="50%" stopColor="#6B6CF7" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
          {/* Perfectly Centered Rounded Hexagon Icon */}
          <path
            d="M 20 2.5 
               C 20.7 2.5 21.4 2.9 21.8 3.6 
               L 34.3 10.8 
               C 35 11.2 35.5 12 35.5 12.9 
               L 35.5 27.1 
               C 35.5 28 35 28.8 34.3 29.2 
               L 21.8 36.4 
               C 21.4 37.1 20.7 37.5 20 37.5 
               C 19.3 37.5 18.6 37.1 18.2 36.4 
               L 5.7 29.2 
               C 5 28.8 4.5 28 4.5 27.1 
               L 4.5 12.9 
               C 4.5 12 5 11.2 5.7 10.8 
               L 18.2 3.6 
               C 18.6 2.9 19.3 2.5 20 2.5 Z"
            stroke="url(#optikit-hex-gradient)"
            strokeWidth="2.5"
            strokeLinejoin="round"
            fill="var(--surface)"
          />

          {/* Perfectly Centered Code Symbol </> Vector Paths */}
          <g stroke="var(--text-main)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="stroke-black dark:stroke-white">
            {/* Left Bracket < */}
            <path d="M 14.5 15 L 10.5 20 L 14.5 25" />
            {/* Forward Slash / */}
            <path d="M 21.5 14 L 18.5 26" />
            {/* Right Bracket > */}
            <path d="M 25.5 15 L 29.5 20 L 25.5 25" />
          </g>
        </svg>
      </div>

      <div className="flex items-center gap-2">
        <span className="font-bold text-xl tracking-tight text-black dark:text-white font-sans">
          Opti<span className="text-gradient">Kit</span>
        </span>
        {showVersion && (
          <span className="px-2 py-0.5 rounded-full bg-[#E7EDFF] dark:bg-primary/10 text-[#4F8DFD] text-xs font-semibold border border-[#C9D4FF]/40 dark:border-primary/20">
            {version}
          </span>
        )}
      </div>
    </div>
  );
}
