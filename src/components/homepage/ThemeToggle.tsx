import { Sun, Moon, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
  variant?: 'segmented' | 'button';
}

export const ThemeToggle = ({ 
  className = '', 
  showLabel = false,
  variant = 'button' 
}: ThemeToggleProps) => {
  const { theme, toggleTheme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  if (variant === 'segmented') {
    return (
      <div 
        id="navbar-theme-segmented-switcher"
        role="group"
        aria-label="Theme selection"
        className={`inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs transition-colors duration-250 ${className}`}
      >
        <button
          type="button"
          onClick={() => setTheme('light')}
          aria-pressed={!isDark}
          title="Switch to light mode"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
            !isDark
              ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80 font-bold scale-[1.02]'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Sun className={`w-3.5 h-3.5 ${!isDark ? 'text-amber-500' : 'text-slate-400'}`} />
          <span className="text-[11px]">Light</span>
          {!isDark && <Check className="w-3 h-3 text-blue-600" />}
        </button>

        <button
          type="button"
          onClick={() => setTheme('dark')}
          aria-pressed={isDark}
          title="Switch to dark mode (Deep Navy & Charcoal palette)"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
            isDark
              ? 'bg-slate-800 text-white shadow-xs border border-slate-700/80 font-bold scale-[1.02]'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Moon className={`w-3.5 h-3.5 ${isDark ? 'text-sky-400' : 'text-slate-400'}`} />
          <span className="text-[11px]">Dark</span>
          {isDark && <Check className="w-3 h-3 text-lime-400" />}
        </button>
      </div>
    );
  }

  return (
    <button
      id="navbar-theme-toggle-btn"
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Dark mode enabled: Deep Navy / Charcoal (click for light mode)' : 'Light mode enabled (click for dark mode)'}
      className={`relative inline-flex items-center justify-center p-2 rounded-xl transition-all duration-300 border cursor-pointer ${
        isDark
          ? 'bg-slate-900 border-slate-700 text-amber-300 hover:bg-slate-800 hover:border-amber-400/50 shadow-inner'
          : 'bg-white border-slate-200 text-slate-700 hover:text-blue-600 hover:bg-slate-50 hover:border-blue-300 shadow-2xs'
      } ${className}`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-400 rotate-0 scale-100 transition-all duration-300" />
        ) : (
          <Moon className="w-4 h-4 text-slate-700 hover:text-blue-600 rotate-0 scale-100 transition-all duration-300" />
        )}
      </div>

      {showLabel && (
        <span className={`ml-2 text-xs font-semibold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
          {isDark ? 'Dark Theme' : 'Light Theme'}
        </span>
      )}
    </button>
  );
};
