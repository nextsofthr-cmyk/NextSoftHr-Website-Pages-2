import React from 'react';

interface NextSoftHrLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dark' | 'light' | 'auto';
  showTagline?: boolean;
}

export const NextSoftHrLogo: React.FC<NextSoftHrLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'auto',
  showTagline = false,
}) => {
  const isExplicitLight = variant === 'light';

  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const getTextClass = () => {
    if (variant === 'light') return 'text-white';
    if (variant === 'dark') return 'text-[#0A3F7E]';
    return 'text-[#0A3F7E] dark:text-white transition-colors duration-200';
  };

  const getTaglineClass = () => {
    if (variant === 'light') return 'text-slate-300';
    if (variant === 'dark') return 'text-slate-500';
    return 'text-slate-500 dark:text-slate-400 transition-colors duration-200';
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Brand Icon: Deep Blue shield with Lemon-Green pulse loop */}
      <div
        className={`${iconSizes[size]} rounded-lg flex items-center justify-center shrink-0 shadow-sm transition-transform duration-200 group-hover:scale-105`}
        style={{
          background: isExplicitLight
            ? 'linear-gradient(135deg, #0A3F7E 0%, #051A33 100%)'
            : 'linear-gradient(135deg, #0A3F7E 0%, #082F60 100%)',
          border: '1px solid rgba(142, 224, 0, 0.35)',
        }}
      >
        <svg viewBox="0 0 32 32" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* N mark */}
          <path
            d="M8 22V10L16 22V10"
            stroke="#FFFFFF"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Lemon Green biometric node */}
          <path
            d="M20 22V12"
            stroke="#8EE000"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <circle cx="20" cy="8" r="2.2" fill="#8EE000" />
          <path
            d="M20 17H25"
            stroke="#8EE000"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className={`font-extrabold tracking-tight flex items-baseline ${sizeClasses[size]}`}>
          <span className={getTextClass()}>NextSoft</span>
          <span className="text-[#8EE000] ml-0.5 font-black">Hr</span>
        </div>
        {showTagline && (
          <span className={`text-[10px] font-medium tracking-wide uppercase ${getTaglineClass()}`}>
            Powering People. Driving Businesses.
          </span>
        )}
      </div>
    </div>
  );
};
