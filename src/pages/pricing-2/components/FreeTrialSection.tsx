import React from 'react';
import { ArrowRight, Play, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FreeTrialSectionProps {
  onOpenTrial: () => void;
  onOpenDemo: () => void;
}

export const FreeTrialSection: React.FC<FreeTrialSectionProps> = ({
  onOpenTrial,
  onOpenDemo,
}) => {
  const { tx } = useLanguage();
  return (
    <section id="free-trial" className="py-20 bg-white dark:bg-[#0B132B] border-t border-slate-100 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-tr from-[#0265DC] via-[#004DB3] to-[#0B132B] p-8 sm:p-14 text-white relative overflow-hidden shadow-2xl">
          {/* Subtle Accent Glows */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#A3E635]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#A3E635] text-xs font-semibold backdrop-blur-xs border border-white/10 mb-5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{tx('Get Started in Under 5 Minutes')}</span>
            </div>

            <h2
              id="trial-headline"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight"
            >
              {tx('Start Managing Your Workforce Smarter Today')}
            </h2>

            <p className="mt-4 text-slate-200 text-base sm:text-lg leading-relaxed">
              {tx('Experience NextSofthr before you commit. Start your free trial and discover a simpler way to manage HR, payroll and business operations.')}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                id="trial-section-start-btn"
                onClick={onOpenTrial}
                className="px-7 py-3.5 rounded-xl font-bold text-slate-950 bg-[#A3E635] hover:bg-[#84CC16] shadow-lg shadow-lime-500/20 hover:scale-[1.02] transition-all duration-150 flex items-center gap-2"
              >
                <span>{tx('Start Free Trial')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="trial-section-demo-btn"
                onClick={onOpenDemo}
                className="px-6 py-3.5 rounded-xl font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-xs transition-colors flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-current text-[#A3E635]" />
                <span>{tx('Book a Demo')}</span>
              </button>
            </div>

            {/* Trust Messaging */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-slate-300 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#A3E635]" />
                <span>{tx('No complicated setup')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#A3E635]" />
                <span>{tx('Easy onboarding')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#A3E635]" />
                <span>{tx('Scalable as you grow')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
