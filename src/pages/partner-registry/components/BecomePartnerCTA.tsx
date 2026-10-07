import React from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Award, 
  Megaphone, 
  Users, 
  Headphones, 
  Share2, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Coins
} from 'lucide-react';
import { PARTNER_BENEFITS } from '../data/content';
import { useCurrency } from '../context/CurrencyContext';

interface BecomePartnerCTAProps {
  onRegisterClick: () => void;
}

export const BecomePartnerCTA: React.FC<BecomePartnerCTAProps> = ({ onRegisterClick }) => {
  const { formatCurrency, currentCurrency } = useCurrency();
  const getIcon = (name: string) => {
    switch (name) {
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-[#071938]" />;
      case 'DollarSign': return <DollarSign className="w-5 h-5 text-[#071938]" />;
      case 'Award': return <Award className="w-5 h-5 text-[#071938]" />;
      case 'Megaphone': return <Megaphone className="w-5 h-5 text-[#071938]" />;
      case 'Users': return <Users className="w-5 h-5 text-[#071938]" />;
      case 'Headphones': return <Headphones className="w-5 h-5 text-[#071938]" />;
      case 'Share2': return <Share2 className="w-5 h-5 text-[#071938]" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-[#071938]" />;
      default: return <CheckCircle2 className="w-5 h-5 text-[#071938]" />;
    }
  };

  return (
    <section id="partner-benefits" className="py-16 md:py-24 bg-[#071938] text-white border-b border-blue-900 relative overflow-hidden">
      
      {/* Background decorations */}
      <div className="absolute -top-12 -right-12 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#c8f526]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Banner Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/90 border border-[#c8f526]/50 text-[#c8f526] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>GROW YOUR CONSULTANCY OR TECH FIRM</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Grow Your Business With NextSofthr
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Join our global partner network and expand your consulting, accounting, technology, or advisory practice with Africa's leading all-in-one HR & payroll engine.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onRegisterClick}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#c8f526] hover:bg-[#b5e01b] text-[#071938] font-bold text-sm shadow-xl lemon-shadow transition-all flex items-center justify-center gap-2"
            >
              <span>Become a Partner</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
            <a
              href="#registration"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-white/30 hover:border-white text-white font-semibold text-sm transition-colors text-center"
            >
              Learn More About Partnership
            </a>
          </div>

          {/* Live Practice Earning Potential Callout */}
          <div className="mt-8 max-w-2xl mx-auto p-4 rounded-2xl bg-blue-950/70 border border-blue-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#c8f526] text-[#071938] flex items-center justify-center shrink-0 font-black">
                <Coins className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-xs font-bold text-white flex items-center gap-1.5 justify-center sm:justify-start">
                  <span>Ecosystem Economics</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#c8f526]/20 text-[#c8f526] font-mono">
                    {currentCurrency.code}
                  </span>
                </span>
                <p className="text-xs text-slate-300 mt-0.5">
                  Avg. enterprise co-sell margin: <strong className="text-[#c8f526] font-mono">{formatCurrency(12000)}</strong> per deployment
                </p>
              </div>
            </div>

            <div className="text-center sm:text-right shrink-0">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Top-Tier Partner ARR</span>
              <span className="text-sm font-black font-mono text-[#c8f526]">
                {formatCurrency(96000, { compact: true })} / year
              </span>
            </div>
          </div>
        </div>

        {/* 8 Partner Benefits Grid (Prompt Section 19) */}
        <div>
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Why 240+ Firms Choose NextSofthr Partnership
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Comprehensive commercial, technical, and operational incentives built for agency growth.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PARTNER_BENEFITS.map((benefit, idx) => (
              <div
                key={idx}
                className="bg-[#0b214a] rounded-2xl border border-blue-800 p-5 flex flex-col justify-between hover:border-[#c8f526]/60 transition-all group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#c8f526] flex items-center justify-center mb-3.5 shadow-sm group-hover:scale-105 transition-transform">
                    {getIcon(benefit.icon)}
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-[#c8f526] transition-colors">
                    {benefit.title}
                  </h4>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-blue-900 flex items-center justify-between text-[11px] font-semibold text-slate-400">
                  <span>Partner Privilege</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c8f526]"></span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
