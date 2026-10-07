import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { Theme } from '../hooks/useTheme';

interface ThemeToggleProps {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  onToggle: () => void;
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  resolvedTheme,
  onToggle,
  className = '',
  showLabel = false,
}) => {
  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={onToggle}
      className={`inline-flex items-center gap-2 p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-slate-200/80 dark:border-slate-700/80 bg-white/80 dark:bg-slate-800/80 shadow-xs ${className}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-4 h-4 text-[#84CC16] animate-in spin-in-90 duration-200" />
        ) : (
          <Moon className="w-4 h-4 text-[#0F52BA] animate-in spin-in-90 duration-200" />
        )}
      </div>
      {showLabel && (
        <span className="text-xs font-semibold whitespace-nowrap">
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </span>
      )}
    </button>
  );
};
