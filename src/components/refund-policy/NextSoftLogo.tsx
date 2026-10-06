import React from 'react';

interface NextSoftLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon-only' | 'monochrome-white';
  showTagline?: boolean;
}

export const NextSoftLogo: React.FC<NextSoftLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'full',
  showTagline = false,
}) => {
  const sizeMap = {
    sm: { icon: 26, text: 'text-lg', badge: 'text-[9px] px-1.5 py-0.5' },
    md: { icon: 34, text: 'text-xl', badge: 'text-[10px] px-2 py-0.5' },
    lg: { icon: 44, text: 'text-2xl', badge: 'text-xs px-2.5 py-1' },
    xl: { icon: 56, text: 'text-3xl', badge: 'text-sm px-3 py-1' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Official Geometric Symbol: Interconnected Enterprise Blue Hexagon/Shield with Vibrant Lemon Node */}
      <svg
        width={currentSize.icon}
        height={currentSize.icon}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-200 hover:scale-105"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="nsBlueGrad" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0A3B7B" />
            <stop offset="100%" stopColor="#1E40AF" />
          </linearGradient>
          <linearGradient id="nsLemonGrad" x1="28" y1="6" x2="44" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#A3E635" />
            <stop offset="100%" stopColor="#65A30D" />
          </linearGradient>
          <linearGradient id="nsAccentGrad" x1="12" y1="20" x2="36" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0A3B7B" />
          </linearGradient>
        </defs>

        {/* Base Foundation Shield - Enterprise Blue */}
        <path
          d="M8 12C8 9.79086 9.79086 8 12 8H26L38 20V36C38 38.2091 36.2091 40 34 40H12C9.79086 40 8 38.2091 8 36V12Z"
          fill="url(#nsBlueGrad)"
        />

        {/* Dynamic Forward Chevron / N-Fold */}
        <path
          d="M16 16L24 24L16 32"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Interconnected Payroll/HR Node Bridge */}
        <path
          d="M24 24H34M34 24L28 18M34 24L28 30"
          stroke="url(#nsLemonGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Radiant Lemon Green Human/Tech Node */}
        <circle cx="36" cy="14" r="5" fill="#84CC16" />
        <circle cx="36" cy="14" r="2.5" fill="#FFFFFF" />
      </svg>

      {variant !== 'icon-only' && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 font-bold tracking-tight leading-none">
            <span
              className={`${currentSize.text} tracking-tight ${
                variant === 'monochrome-white' ? 'text-white' : 'text-[#0A3B7B] dark:text-white'
              }`}
            >
              NextSoft
            </span>
            <span
              className={`${currentSize.badge} font-black uppercase tracking-wider rounded-md ${
                variant === 'monochrome-white'
                  ? 'bg-white/20 text-[#84CC16] border border-white/30'
                  : 'bg-[#84CC16] text-[#0A3B7B] shadow-xs'
              }`}
            >
              HR
            </span>
          </div>
          {showTagline && (
            <span
              className={`text-[10px] tracking-wide font-medium mt-1 ${
                variant === 'monochrome-white' ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              Global HR, Payroll &amp; Business Platform
            </span>
          )}
        </div>
      )}
    </div>
  );
};
