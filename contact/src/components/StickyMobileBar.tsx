import React from 'react';
import { Phone, ArrowRight } from 'lucide-react';
import { BRAND } from '../data/content';
import { useLanguage } from '../context/LanguageContext';

interface StickyMobileBarProps {
  onBookDemo: () => void;
  onTalkToSales: () => void;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({
  onBookDemo,
  onTalkToSales,
}) => {
  const { t } = useLanguage();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B1F3A]/95 backdrop-blur-lg border-t border-white/15 p-3 px-4 flex items-center justify-between gap-3 shadow-2xl">
      <a
        href={`tel:${BRAND.phoneRaw}`}
        className="flex items-center justify-center p-3 rounded-xl bg-white/10 text-[#C8F000] border border-white/20 hover:bg-white/20 shrink-0"
        aria-label="Call NextSofthr"
      >
        <Phone className="w-5 h-5" />
      </a>

      <button
        onClick={onTalkToSales}
        className="flex-1 py-3 px-2 rounded-xl text-xs font-bold text-white bg-white/10 border border-white/20 text-center truncate"
      >
        {t.mobileBar.talkToSales}
      </button>

      <button
        onClick={onBookDemo}
        className="flex-1 py-3 px-2 rounded-xl text-xs font-extrabold text-[#0B1F3A] bg-[#C8F000] hover:bg-[#bde300] text-center flex items-center justify-center gap-1 shadow-md truncate"
      >
        <span>{t.mobileBar.bookDemo}</span>
        <ArrowRight className="w-3.5 h-3.5 shrink-0" />
      </button>
    </div>
  );
};

