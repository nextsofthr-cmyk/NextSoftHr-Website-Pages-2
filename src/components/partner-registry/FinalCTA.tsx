import React from 'react';
import { Search, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface FinalCTAProps {
  onSearchClick: () => void;
  onBecomePartnerClick: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({
  onSearchClick,
  onBecomePartnerClick
}) => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-[#071938] to-[#040f24] text-white relative overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/80 border border-[#c8f526]/40 text-[#c8f526] text-xs font-bold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>START YOUR TRANSFORMATION TODAY</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
          Find the Right Expertise for Your <br />
          <span className="text-[#c8f526]">NextSofthr Journey</span>
        </h2>

        <p className="mt-5 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Connect with a certified partner today or apply to join our high-growth global ecosystem of trusted HR, payroll, and technology leaders.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onSearchClick}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#c8f526] hover:bg-[#b5e01b] text-[#071938] font-black text-sm sm:text-base shadow-xl lemon-shadow transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4 stroke-[2.5]" />
            <span>Search Partner Directory</span>
          </button>
          <button
            onClick={onBecomePartnerClick}
            className="w-full sm:w-auto px-8 py-4 rounded-xl border border-white/30 hover:border-[#c8f526] text-white hover:text-[#c8f526] font-bold text-sm sm:text-base transition-colors flex items-center justify-center gap-2"
          >
            <span>Become a Partner</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Trust proofs line */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#c8f526]" />
            <span>Free matching service</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#c8f526]" />
            <span>240+ Certified firms</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#c8f526]" />
            <span>Fast 24-hr partner introductions</span>
          </span>
        </div>

      </div>
    </section>
  );
};
