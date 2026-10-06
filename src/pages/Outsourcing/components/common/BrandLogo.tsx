import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ 
  className = '', 
  variant = 'dark',
  size = 'md'
}) => {
  const isDark = variant === 'dark';
  const sizeClasses = {
    sm: 'h-7 text-lg',
    md: 'h-9 text-xl',
    lg: 'h-11 text-2xl',
  }[size];

  return (
    <div className={`flex items-center gap-2.5 font-bold tracking-tight select-none ${className}`}>
      {/* Precision Geometric SVG Logomark */}
      <div className="relative flex items-center justify-center shrink-0">
        <svg 
          width={size === 'sm' ? 28 : size === 'lg' ? 40 : 34} 
          height={size === 'sm' ? 28 : size === 'lg' ? 40 : 34} 
          viewBox="0 0 40 40" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 hover:scale-105"
        >
          {/* Base rounded square with deep brand navy gradient */}
          <rect width="40" height="40" rx="10" fill="#0A1E4A" />
          
          {/* Left Wing in Corporate Blue */}
          <path 
            d="M10 29V11L18 21.5V29H10Z" 
            fill="#1D4ED8" 
          />
          
          {/* Diagonal Bridge in Electric Blue */}
          <path 
            d="M18 21.5L24 11H30V29H24V18L18 26.5V21.5Z" 
            fill="#3B82F6" 
          />
          
          {/* Accent Node in Signature NextSofthr Lemon Green */}
          <circle cx="30" cy="11" r="4.5" fill="#84CC16" />
          <path 
            d="M11 29H18L24 21L21 17L11 29Z" 
            fill="#A3E635" 
            fillOpacity="0.85" 
          />
        </svg>
      </div>

      {/* Brand Wordmark */}
      <div className={`flex items-baseline ${sizeClasses}`}>
        <span className={isDark ? 'text-slate-900 dark:text-white font-extrabold tracking-tight transition-colors' : 'text-white font-extrabold tracking-tight'}>
          Next
        </span>
        <span className="text-[#0F2D6B] dark:text-blue-400 font-black transition-colors">
          Soft
        </span>
        <span className="text-[#84CC16] font-bold ml-0.5">
          hr
        </span>
      </div>
    </div>
  );
};
