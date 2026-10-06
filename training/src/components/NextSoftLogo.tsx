import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'white';
  showSubtitle?: boolean;
}

export const NextSoftLogo: React.FC<LogoProps> = ({
  className = '',
  variant = 'dark',
  showSubtitle = true,
}) => {
  const isWhite = variant === 'white';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Brand Icon: Dynamic geometric monogram with Primary Blue and Lemon Green */}
      <div className="relative flex-shrink-0 w-9 h-9 rounded-lg bg-[#0F4C81] flex items-center justify-center shadow-xs">
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-white"
        >
          {/* Stylized N path */}
          <path
            d="M7 23V9h4.5l6.5 9.5V9H22v14h-4.5L11 13.5V23H7z"
            fill="currentColor"
          />
        </svg>
        {/* Distinctive Lemon Green Brand Dot */}
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#84CC16] border-2 border-white dark:border-slate-900 shadow-xs" />
      </div>

      <div className="flex flex-col">
        <div className="flex items-center tracking-tight leading-none">
          <span
            className={`font-extrabold text-xl ${
              isWhite ? 'text-white' : 'text-[#0F4C81] dark:text-white'
            }`}
          >
            NextSoft
          </span>
          <span
            className={`font-extrabold text-xl ml-0.5 ${
              isWhite ? 'text-[#84CC16]' : 'text-[#65A30D] dark:text-[#84CC16]'
            }`}
          >
            HR
          </span>
        </div>
        {showSubtitle && (
          <span
            className={`text-[9px] font-bold tracking-[0.2em] uppercase mt-0.5 ${
              isWhite ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            Training Academy
          </span>
        )}
      </div>
    </div>
  );
};
