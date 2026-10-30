import React from 'react';
import { ArrowRight, Play, Sparkles, Shield, CheckCircle2 } from 'lucide-react';

interface FinalCTAProps {
  onOpenTrial: () => void;
  onOpenDemo: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenTrial, onOpenDemo }) => {
  return (
    <section id="final-cta" className="relative py-24 bg-[#0B132B] dark:bg-[#050A18] text-white overflow-hidden transition-colors duration-200">
      {/* Abstract Geometric & Glow Patterns */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0265DC]/25 dark:bg-[#0265DC]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#A3E635]/15 dark:bg-[#A3E635]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle accent border line on top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0265DC] via-[#A3E635] to-[#0265DC]" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#A3E635] text-xs font-semibold backdrop-blur-xs border border-white/10 mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Transform Your People Operations</span>
        </div>

        <h2
          id="final-cta-headline"
          className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight max-w-4xl mx-auto"
        >
          Your People. Your Payroll. Your Business.{' '}
          <span className="text-[#A3E635]">One Intelligent Platform.</span>
        </h2>

        <p className="mt-5 text-slate-300 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
          Join businesses using modern technology to simplify HR, payroll and everyday business
          management.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            id="final-start-trial-btn"
            onClick={onOpenTrial}
            className="px-8 py-4 rounded-xl font-bold text-slate-950 bg-[#A3E635] hover:bg-[#84CC16] shadow-xl shadow-lime-400/20 hover:scale-[1.02] transition-all duration-150 flex items-center gap-2 text-base"
          >
            <span>Start Free Trial</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            id="final-book-demo-btn"
            onClick={onOpenDemo}
            className="px-7 py-4 rounded-xl font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-xs transition-colors flex items-center gap-2 text-base"
          >
            <Play className="w-4 h-4 fill-current text-[#A3E635]" />
            <span>Book a Demo</span>
          </button>
        </div>

        {/* Reassurance points */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-slate-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#A3E635]" />
            <span>Instant workspace activation</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#A3E635]" />
            <span>Encrypted cloud storage</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#A3E635]" />
            <span>Global multi-currency support</span>
          </div>
        </div>
      </div>
    </section>
  );
};
