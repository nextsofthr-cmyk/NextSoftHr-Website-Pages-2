import React from 'react';
import { 
  ShieldCheck, 
  Cloud, 
  TrendingUp, 
  Globe2, 
  Building2, 
  GitFork, 
  Sparkles, 
  Smartphone,
  CheckCircle2
} from 'lucide-react';
import { TRUST_FEATURES } from '../data/content';

export const TrustSection: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-[#c8f526]" />;
      case 'Cloud': return <Cloud className="w-6 h-6 text-[#c8f526]" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-[#c8f526]" />;
      case 'Globe2': return <Globe2 className="w-6 h-6 text-[#c8f526]" />;
      case 'Building2': return <Building2 className="w-6 h-6 text-[#c8f526]" />;
      case 'GitFork': return <GitFork className="w-6 h-6 text-[#c8f526]" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-[#c8f526]" />;
      case 'Smartphone': return <Smartphone className="w-6 h-6 text-[#c8f526]" />;
      default: return <CheckCircle2 className="w-6 h-6 text-[#c8f526]" />;
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#071938] text-white border-b border-blue-900 relative overflow-hidden">
      
      {/* Subtle Glows */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/80 border border-[#c8f526]/40 text-[#c8f526] text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ENTERPRISE-GRADE TRUST & ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Built for Scale, Security & Resilience
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            NextSofthr pairs bank-grade cloud infrastructure with deep African statutory localization, giving partners and enterprises complete operational confidence.
          </p>
        </div>

        {/* 8 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TRUST_FEATURES.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#0b214a] rounded-2xl border border-blue-800 p-5 flex flex-col justify-between hover:border-blue-500 transition-colors group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-700/60 flex items-center justify-center mb-4 group-hover:bg-[#0c2b64] transition-colors">
                  {getIcon(item.icon)}
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-[#c8f526] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-blue-900/80 flex items-center gap-1.5 text-[11px] font-semibold text-[#c8f526]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>NextSofthr Core Standard</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
