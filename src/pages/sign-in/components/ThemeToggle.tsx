import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useToast } from './ToastNotification';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
  className?: string;
  variant?: 'light' | 'dark' | 'auto';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  isDark,
  onToggle,
  className = '',
  variant = 'auto',
}) => {
  const toast = useToast();

  const handleToggle = () => {
    onToggle();
    toast.info(!isDark ? 'Switched to Deep Navy theme' : 'Switched to Clean Light theme', {
      duration: 2500,
    });
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to Light theme' : 'Switch to Dark theme (Deep Navy)'}
      className={`group relative inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition-all duration-200 cursor-pointer shadow-xs ${
        isDark
          ? 'bg-[#1b2a47] hover:bg-[#233559] text-blue-100 border-white/15'
          : variant === 'dark'
          ? 'bg-white/10 hover:bg-white/20 text-white border-white/20'
          : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200/90'
      } ${className}`}
    >
      {isDark ? (
        <>
          <Sun className="w-3.5 h-3.5 text-[#caff33] transition-transform duration-300 group-hover:rotate-45" />
          <span className="hidden sm:inline text-[11px] font-medium text-slate-200">Light</span>
        </>
      ) : (
        <>
          <Moon className="w-3.5 h-3.5 text-[#0056b3] transition-transform duration-300 group-hover:-rotate-12" />
          <span className="hidden sm:inline text-[11px] font-medium text-slate-600">Dark</span>
        </>
      )}
    </button>
  );
};

export default ThemeToggle;
