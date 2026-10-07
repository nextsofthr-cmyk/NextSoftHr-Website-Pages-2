import React from 'react';
import { ArrowRight, Sparkles, Building2, CheckCircle2 } from 'lucide-react';

interface FinalCtaSectionProps {
  onExploreCourses: () => void;
  onRegisterNow: () => void;
  onRequestCorporate: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({
  onExploreCourses,
  onRegisterNow,
  onRequestCorporate,
}) => {
  return (
    <section className="py-20 bg-gradient-to-br from-[#0B2540] via-[#0F4C81] to-[#0A3358] text-white relative overflow-hidden">
      {/* Subtle brand geometry & subtle ambient accents: strict primary blue & lemon green */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-blue-500/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-lime-400/10 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        {/* Kicker */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-xs border border-white/20 text-lime-300 text-xs font-semibold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#84CC16]" />
          <span>NextSoftHR Academy · Powering People. Driving Businesses.</span>
        </div>

        {/* Main Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
          Invest in Skills.{' '}
          <span className="text-[#84CC16]">Empower Your People.</span>
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base text-blue-100 leading-relaxed max-w-3xl mx-auto mb-10">
          Whether you're starting your HR career, developing payroll expertise, leading a team or building organizational capability, NextSoftHR Training Academy gives you practical learning opportunities for today's workplace.
        </p>

        {/* 3 Prominent CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-12">
          <button
            onClick={onExploreCourses}
            className="px-6 py-3.5 text-xs sm:text-sm font-bold text-white bg-[#0F4C81] hover:bg-[#0B3C68] border border-blue-400/40 rounded-md shadow-sm transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Explore Courses</span>
            <ArrowRight className="w-4 h-4 text-[#84CC16]" />
          </button>

          <button
            onClick={onRegisterNow}
            className="px-6 py-3.5 text-xs sm:text-sm font-extrabold text-[#0F4C81] bg-[#84CC16] hover:bg-[#74b810] rounded-md shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <span>Register for Training</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F4C81]" />
          </button>

          <button
            onClick={onRequestCorporate}
            className="px-6 py-3.5 text-xs sm:text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-md transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Building2 className="w-4 h-4 text-blue-200" />
            <span>Request Corporate Training</span>
          </button>
        </div>

        {/* Confidence Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-8 text-xs text-blue-200 pt-6 border-t border-white/15">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#84CC16]" />
            <span>Verifiable Certificates</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#84CC16]" />
            <span>Accredited Senior Faculty</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#84CC16]" />
            <span>Enterprise Group Invoicing</span>
          </div>
        </div>

      </div>
    </section>
  );
};
