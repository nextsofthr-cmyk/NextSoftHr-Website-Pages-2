import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeSwitcherProps {
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  className = '',
  showLabel = false,
  size = 'md',
}) => {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      {/* Prominent Dual-State Toggle Switch Pill */}
      <button
        onClick={toggleTheme}
        type="button"
        role="switch"
        aria-checked={isDark}
        id="navbar-theme-toggle-switch"
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode (Brand Dark Blue)'}
        title={isDark ? 'Click to switch to Light Mode' : 'Click to switch to Dark Mode'}
        className={`group relative inline-flex items-center rounded-full p-1 transition-all duration-300 cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-[#84CC16] focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#0A2540] ${
          isDark
            ? 'bg-[#071D3A] border border-blue-700/80 shadow-inner shadow-black/40'
            : 'bg-slate-200/90 border border-slate-300/90 shadow-inner shadow-slate-300/40'
        } ${
          size === 'sm'
            ? 'w-14 h-7'
            : size === 'lg'
            ? 'w-22 h-10'
            : 'w-18 h-8 sm:w-20 sm:h-9'
        }`}
      >
        {/* Track Icons: Sun on left, Moon on right */}
        <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none text-xs">
          {/* Sun icon on track */}
          <span
            className={`transition-opacity duration-200 ${
              isDark ? 'opacity-40 text-slate-400' : 'opacity-0'
            }`}
          >
            <Sun className="w-3.5 h-3.5 text-amber-500" />
          </span>

          {/* Moon icon on track */}
          <span
            className={`transition-opacity duration-200 ${
              isDark ? 'opacity-0' : 'opacity-40 text-slate-600'
            }`}
          >
            <Moon className="w-3.5 h-3.5 text-blue-800" />
          </span>
        </div>

        {/* Sliding Thumb Knob */}
        <div
          className={`relative z-10 flex items-center justify-center rounded-full shadow-md transition-all duration-300 transform ${
            size === 'sm'
              ? 'w-5 h-5'
              : size === 'lg'
              ? 'w-8 h-8'
              : 'w-6 h-6 sm:w-7 sm:h-7'
          } ${
            isDark
              ? 'translate-x-7 sm:translate-x-9 bg-gradient-to-br from-[#0256C4] to-[#0A2540] text-amber-300 border border-blue-400/40 shadow-blue-900/60'
              : 'translate-x-0 bg-white text-amber-500 border border-slate-200 shadow-slate-400/40'
          }`}
        >
          {isDark ? (
            <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-300/20 text-amber-300 transition-transform duration-300 group-hover:-rotate-12" />
          ) : (
            <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 transition-transform duration-300 group-hover:rotate-45" />
          )}
        </div>
      </button>

      {/* Optional Label / Indicator Badge */}
      {showLabel && (
        <span
          onClick={toggleTheme}
          className="text-xs font-bold text-slate-700 dark:text-slate-200 cursor-pointer select-none hidden md:inline-flex items-center gap-1.5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16]" />
          <span>{isDark ? 'Dark Mode' : 'Light Mode'}</span>
        </span>
      )}
    </div>
  );
};
