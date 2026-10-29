import React from 'react';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  showLabel = false
}) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={toggleTheme}
        className="group relative inline-flex items-center justify-between p-1 rounded-xl bg-slate-100 hover:bg-slate-200/80 dark:bg-[#0B1120] dark:hover:bg-[#111A2E] border border-slate-200/90 dark:border-slate-800 dark:hover:border-lime-400/50 transition-all duration-300 cursor-pointer shadow-2xs focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-lime-400/50"
        title={isDark ? 'Switch to Light Mode' : 'Switch to Deep Navy Dark Mode (with Lemon Green Highlights)'}
        aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        {/* Sliding thumb pill */}
        <span
          className={`absolute top-1 bottom-1 w-6 rounded-lg transition-transform duration-300 ease-in-out shadow-xs ${
            isDark
              ? 'translate-x-7 bg-[#1E293B] border border-slate-700/80 shadow-lime-400/10'
              : 'translate-x-0 bg-white border border-slate-200/70 shadow-slate-300/40'
          }`}
          aria-hidden="true"
        />

        {/* Sun button zone */}
        <span
          className={`relative z-10 w-6 h-6 flex items-center justify-center transition-colors duration-250 ${
            !isDark ? 'text-amber-500' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Sun className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-45" />
        </span>

        {/* Moon button zone */}
        <span
          className={`relative z-10 w-6 h-6 flex items-center justify-center transition-colors duration-250 ${
            isDark ? 'text-lime-400' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Moon className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-rotate-12" />
        </span>

        {/* Subtle lemon green pulse indicator in dark mode */}
        {isDark && (
          <span 
            className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-lime-400 shadow-[0_0_8px_#a3e635] ring-2 ring-[#0B1120]" 
            title="Deep Navy & Lemon Green Active"
          />
        )}
      </button>

      {showLabel && (
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
          {isDark ? (
            <>
              <span className="text-lime-400 font-bold">Deep Navy</span>
              <span className="w-1.5 h-1.5 rounded-full bg-lime-400" />
            </>
          ) : (
            <span className="text-slate-600">Light Mode</span>
          )}
        </span>
      )}
    </div>
  );
};
