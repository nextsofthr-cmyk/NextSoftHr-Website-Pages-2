import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Bot, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Zap, 
  Target, 
  X,
  Building,
  Globe2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FloatingAiMatchButtonProps {
  onClick: () => void;
}

export const FloatingAiMatchButton: React.FC<FloatingAiMatchButtonProps> = ({ onClick }) => {
  const { t } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isVisible = (isHovered || isFocused) && !isDismissed;

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsHovered(true);
    setIsDismissed(false);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsDismissed(true);
      setIsHovered(false);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div 
      className="relative flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Robust Custom Tooltip Component */}
      {isVisible && (
        <div
          id="ai-match-tooltip"
          role="tooltip"
          aria-hidden={!isVisible}
          className="absolute bottom-full right-0 mb-3 w-80 sm:w-88 max-w-[calc(100vw-2rem)] bg-[#051329] dark:bg-[#030b18] text-white rounded-2xl p-4 shadow-2xl border-2 border-[#c8f526] z-50 animate-in fade-in zoom-in-95 duration-200 backdrop-blur-xl select-none"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Header Row */}
          <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-blue-900/60">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#c8f526] text-[#071938] flex items-center justify-center font-bold shadow-sm">
                <Sparkles className="w-4 h-4 fill-[#071938]" />
              </div>
              <div>
                <div className="text-xs font-black tracking-tight text-white flex items-center gap-1.5">
                  <span>AI Partner Match</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-[#c8f526]/20 text-[#c8f526] text-[9px] font-mono font-black uppercase">
                    Gemini AI
                  </span>
                </div>
                <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Intelligent Matching Engine</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsDismissed(true);
                setIsHovered(false);
              }}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              title="Dismiss tooltip"
              aria-label="Dismiss tooltip"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Summary Description */}
          <p className="text-[11px] text-slate-300 leading-relaxed">
            Need the right implementation partner? Tell us your headcount, country, and modules (e.g. <em>Nigerian PAYE</em>, <em>Biometric shifts</em>, <em>ERP sync</em>).
          </p>

          {/* 3 Core Highlights */}
          <div className="mt-3 space-y-2 bg-blue-950/50 dark:bg-black/30 p-2.5 rounded-xl border border-blue-900/60">
            <div className="flex items-start gap-2 text-[11px] text-slate-200">
              <Target className="w-3.5 h-3.5 text-[#c8f526] shrink-0 mt-0.5" />
              <span><strong>Instant Compatibility Scoring:</strong> Analyzes 240+ verified partners to surface your top 3 matches.</span>
            </div>
            <div className="flex items-start gap-2 text-[11px] text-slate-200">
              <ShieldCheck className="w-3.5 h-3.5 text-[#c8f526] shrink-0 mt-0.5" />
              <span><strong>Statutory Law Alignment:</strong> Matches consultancies certified in your local labor & tax codes.</span>
            </div>
            <div className="flex items-start gap-2 text-[11px] text-slate-200">
              <Zap className="w-3.5 h-3.5 text-[#c8f526] shrink-0 mt-0.5" />
              <span><strong>Zero Guesswork:</strong> Tailored budget estimates and direct introduction in seconds.</span>
            </div>
          </div>

          {/* Footer Call-To-Action Cue */}
          <div className="mt-3 pt-2 border-t border-blue-900/60 flex items-center justify-between text-[10px]">
            <span className="text-[#c8f526] font-bold flex items-center gap-1">
              <span>Click to start AI match</span>
              <ArrowRight className="w-3 h-3" />
            </span>
            <span className="text-slate-400 font-mono">Free • 100% Confidential</span>
          </div>

          {/* Caret / Arrow pointer pointing to button */}
          <div className="absolute top-full right-6 -mt-1.5 w-3 h-3 bg-[#051329] dark:bg-[#030b18] border-r-2 border-b-2 border-[#c8f526] transform rotate-45"></div>
        </div>
      )}

      {/* Floating AI Partner Match Launcher Button */}
      <button
        type="button"
        id="floating-ai-partner-match-btn"
        onClick={onClick}
        onFocus={() => {
          setIsFocused(true);
          setIsDismissed(false);
        }}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
        aria-describedby="ai-match-tooltip"
        aria-label="Launch AI Partner Match Assistant. Hover or focus for quick summary."
        className={`relative flex items-center gap-2 px-3 sm:px-4 py-3 rounded-full text-white font-extrabold text-xs shadow-2xl transition-all duration-300 transform active:scale-95 group cursor-pointer backdrop-blur-md ${
          isVisible 
            ? 'bg-gradient-to-r from-blue-900 to-[#0c2b64] border-2 border-[#c8f526] ring-4 ring-[#c8f526]/20 scale-105 shadow-blue-950/50' 
            : 'bg-[#071938]/95 dark:bg-[#0c2b64]/95 hover:bg-[#0c2b64] border border-blue-800/80 hover:border-[#c8f526] hover:scale-105'
        }`}
      >
        <div className="w-5 h-5 rounded-full bg-[#c8f526] text-[#071938] flex items-center justify-center font-bold shrink-0">
          <Sparkles className="w-3 h-3 fill-[#071938] animate-pulse" />
        </div>
        <span className="font-black tracking-tight hidden sm:inline-block">AI Match</span>
        <span className="px-1.5 py-0.2 rounded-full bg-[#c8f526]/20 text-[#c8f526] text-[9px] font-mono font-bold hidden sm:inline-block">
          Gemini
        </span>

        {/* Pulse indicator dot */}
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c8f526] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#c8f526]"></span>
        </span>
      </button>
    </div>
  );
};
