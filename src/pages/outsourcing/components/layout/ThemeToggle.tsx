import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface ThemeToggleProps {
  variant?: 'compact' | 'standard' | 'pill';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  variant = 'compact',
  className = '' 
}) => {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  if (variant === 'pill') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={`relative inline-flex items-center h-8 rounded-full p-1 w-15 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-lime-400 ${
          isDark ? 'bg-[#0B1A3D] border border-blue-900/60' : 'bg-slate-200 border border-slate-300'
        } ${className}`}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <span
          className={`transform transition-transform duration-300 ease-in-out flex items-center justify-center w-6 h-6 rounded-full shadow-sm ${
            isDark 
              ? 'translate-x-7 bg-lime-400 text-slate-950' 
              : 'translate-x-0 bg-white text-slate-800'
          }`}
        >
          {isDark ? (
            <Moon className="w-3.5 h-3.5" />
          ) : (
            <Sun className="w-3.5 h-3.5 text-amber-500" />
          )}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`flex items-center gap-1.5 transition-all duration-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-lime-400 ${
        variant === 'compact'
          ? 'py-1 px-2.5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/15'
          : 'py-2 px-2.5 bg-slate-100 hover:bg-slate-200/80 text-slate-700 dark:bg-[#0B1A3D] dark:hover:bg-[#122452] dark:text-slate-200 dark:border-blue-900/50 border border-slate-200 shadow-2xs'
      } ${className}`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <Moon className="w-3.5 h-3.5 text-lime-300 transition-transform duration-300 rotate-0 scale-100" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-amber-500 dark:text-slate-400 transition-transform duration-300 rotate-0 scale-100" />
        )}
      </div>
      <span className="hidden sm:inline text-[11px] font-medium">
        {isDark ? 'Dark' : 'Light'}
      </span>
    </button>
  );
};
