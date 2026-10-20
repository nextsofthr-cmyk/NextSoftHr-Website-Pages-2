import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FinalCTAProps {
  onBookDemo: () => void;
  onTalkToSales: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onBookDemo, onTalkToSales }) => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-gradient-to-r from-[#1769E0] via-[#155fcb] to-[#0B1F3A] text-white relative overflow-hidden">
      {/* Decorative Accents */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#C8F000]/20 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#1769E0]/40 blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#C8F000]/40 text-[#C8F000] text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.finalCta.badge}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-display mb-6 leading-tight">
          {t.finalCta.title}
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-10 font-medium">
          {t.finalCta.subtitle}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto mb-10">
          <a
            href="https://demo.scriptmaster.store/login"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-extrabold text-base text-[#0B1F3A] bg-[#C8F000] hover:bg-[#bde300] shadow-xl shadow-black/20 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Try Live Demo</span>
            <ExternalLink className="w-4 h-4 text-[#0B1F3A]" />
          </a>

          <button
            onClick={onBookDemo}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base text-white bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>{t.finalCta.bookDemoBtn}</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>

          <button
            onClick={onTalkToSales}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base text-white bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-sm transition-all duration-200 cursor-pointer flex items-center justify-center"
          >
            <span>{t.finalCta.talkToSalesBtn}</span>
          </button>
        </div>

        {/* Micro guarantees */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-blue-100/90 font-medium">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#C8F000]" />
            {t.finalCta.noCardRequired}
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#C8F000]" />
            {t.hero.statCompliance}
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#C8F000]" />
            {t.finalCta.quickDeployment}
          </span>
        </div>

      </div>
    </section>
  );
};

