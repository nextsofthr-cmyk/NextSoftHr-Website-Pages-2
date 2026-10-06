import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'auto';
  size?: 'sm' | 'md' | 'lg';
}

export const NextSoftHRLogo: React.FC<LogoProps> = ({
  className = '',
  variant = 'auto',
  size = 'md'
}) => {
  const sizeMap = {
    sm: { icon: 28, text: 'text-lg', badge: 'text-[9px] px-1.5 py-0.5' },
    md: { icon: 34, text: 'text-xl', badge: 'text-[10px] px-1.5 py-0.5' },
    lg: { icon: 42, text: 'text-2xl', badge: 'text-[11px] px-2 py-0.5' }
  };

  const currentSize = sizeMap[size];

  const textColor =
    variant === 'light'
      ? 'text-white'
      : variant === 'dark'
      ? 'text-slate-900'
      : 'text-slate-900 dark:text-white';

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Official NextSoftHR Mark: Professional Blue + Lemon Green Hexagonal Node & Flow */}
      <svg
        width={currentSize.icon}
        height={currentSize.icon}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-xs"
        aria-hidden="true"
      >
        <rect width="40" height="40" rx="10" fill="#1d4ed8" />
        {/* Subtle grid pattern */}
        <path
          d="M0 20H40M20 0V40"
          stroke="#3b82f6"
          strokeWidth="0.8"
          strokeOpacity="0.3"
        />
        {/* Modern forward 'N' + intertwined HR node loop */}
        <path
          d="M12 28V12L24 28V12"
          stroke="#ffffff"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Lemon green accent dynamic node loop */}
        <path
          d="M21 16C23.5 13.5 27 13.5 29 16C31 18.5 30.5 22.5 28 25"
          stroke="#84cc16"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        {/* Lemon green active indicator dot */}
        <circle cx="28.5" cy="14.5" r="2.8" fill="#84cc16" />
        <circle cx="12" cy="12" r="2" fill="#84cc16" />
      </svg>

      {/* Typography */}
      <div className="flex items-baseline leading-none tracking-tight">
        <span className={`font-extrabold tracking-tight ${textColor} ${currentSize.text}`}>
          NextSoft
        </span>
        <span className="font-black text-blue-600 dark:text-blue-400 ml-0.5 text-inherit">
          HR
        </span>
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#84cc16] ml-1 self-center" />
      </div>
    </div>
  );
};
