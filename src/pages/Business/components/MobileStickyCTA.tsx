import React, { useState, useEffect } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface MobileStickyCTAProps {
  onOpenTrial: () => void;
  onOpenDemo: () => void;
}

export const MobileStickyCTA: React.FC<MobileStickyCTAProps> = ({
  onOpenTrial,
  onOpenDemo,
}) => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show only after scrolling past the first 450px of the page
      setIsVisible(window.scrollY > 450);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      id="mobile-sticky-cta-bar"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0B132B]/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-4 py-3 shadow-2xl flex items-center justify-between gap-3 animate-in slide-in-from-bottom-3 duration-200 transition-colors"
    >
      <button
        id="mobile-sticky-demo-btn"
        onClick={onOpenDemo}
        className="flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold text-[#0265DC] dark:text-blue-300 bg-blue-50 dark:bg-blue-950/80 border border-blue-200/80 dark:border-blue-800/80 text-center"
      >
        {t.common.bookDemo}
      </button>

      <button
        id="mobile-sticky-trial-btn"
        onClick={onOpenTrial}
        className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold text-slate-950 bg-[#A3E635] hover:bg-[#84CC16] shadow-md shadow-lime-500/20 text-center flex items-center justify-center gap-1.5"
      >
        <span>{t.common.startFreeTrial}</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
