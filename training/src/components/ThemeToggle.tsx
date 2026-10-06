import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  showLabel = false,
  size = 'md',
}) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const sizeClasses =
    size === 'sm'
      ? 'p-1.5 text-xs'
      : size === 'lg'
      ? 'px-3 py-2 text-sm'
      : 'p-2 text-xs';

  const iconSizes =
    size === 'sm'
      ? 'w-3.5 h-3.5'
      : size === 'lg'
      ? 'w-4.5 h-4.5'
      : 'w-4 h-4';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode (currently ${theme})`}
      title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
      className={`group relative inline-flex items-center justify-center gap-2 rounded-lg border transition-all duration-200 cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-[#0F4C81] dark:focus:ring-[#84CC16] ${
        isDark
          ? 'bg-slate-800/90 border-slate-700 text-amber-300 hover:bg-slate-700 hover:border-slate-600 shadow-2xs'
          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300 shadow-2xs'
      } ${sizeClasses} ${className}`}
    >
      <span className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
        {isDark ? (
          <Sun className={`${iconSizes} transition-transform duration-300 group-hover:rotate-45 text-amber-400`} />
        ) : (
          <Moon className={`${iconSizes} transition-transform duration-300 group-hover:-rotate-12 text-slate-600`} />
        )}
      </span>

      {showLabel && (
        <span className="font-semibold text-xs tracking-tight text-slate-700 dark:text-slate-200">
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </span>
      )}
    </button>
  );
};
