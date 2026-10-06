import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  showLabel = false,
}) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`relative inline-flex items-center justify-center p-2 rounded-xl transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#84CC16]/50 ${
        isDark
          ? 'bg-[#0E2038] text-[#84CC16] hover:bg-[#132A4A] border border-blue-800/40 shadow-inner'
          : 'bg-slate-100 text-slate-700 hover:text-[#0B3B73] hover:bg-slate-200 border border-slate-200 shadow-sm'
      } ${className}`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {/* Sun Icon */}
        <Sun
          className={`w-5 h-5 absolute transition-all duration-300 transform ${
            isDark
              ? 'opacity-0 rotate-90 scale-50 pointer-events-none'
              : 'opacity-100 rotate-0 scale-100 text-amber-500'
          }`}
        />
        {/* Moon Icon */}
        <Moon
          className={`w-4.5 h-4.5 absolute transition-all duration-300 transform ${
            isDark
              ? 'opacity-100 rotate-0 scale-100 text-[#84CC16]'
              : 'opacity-0 -rotate-90 scale-50 pointer-events-none text-slate-400'
          }`}
        />
      </div>

      {showLabel && (
        <span className="ml-2 text-xs font-semibold select-none">
          {isDark ? 'Dark' : 'Light'}
        </span>
      )}
    </button>
  );
};
