import React from 'react';
import { ArrowRight, Phone, Sparkles, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FinalCtaProps {
  onApplyClick: () => void;
  onContactClick: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onApplyClick, onContactClick }) => {
  const { strings, isRTL } = useLanguage();
  const cta = strings.finalCta;

  return (
    <section id="final-cta" className="py-24 bg-slate-100 dark:bg-[#040E1F] relative overflow-hidden transition-colors duration-300">
      {/* Background Subtle Highlights */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-blue-600/10 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="rounded-3xl bg-gradient-to-br from-blue-900 via-[#071D3E] to-[#040E1F] dark:from-[#071D3E] dark:via-[#0B254A] dark:to-[#040E1F] border-2 border-blue-600/80 dark:border-blue-700/80 p-8 sm:p-12 lg:p-16 shadow-2xl overflow-hidden relative">
          
          {/* Subtle Accent Glow */}
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#B8F010]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Messaging & CTAs */}
            <div className="lg:col-span-7 text-left space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-[#B8F010]/40 text-xs font-bold text-[#B8F010]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{cta.tag}</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                {cta.title}
              </h2>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-xl">
                {cta.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  id="final-become-partner-btn"
                  onClick={onApplyClick}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#B8F010] text-[#040E1F] font-black text-base hover:bg-[#CBFF1A] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#B8F010]/20 group"
                >
                  <span>{cta.btnApply}</span>
                  <ArrowRight className={`w-5 h-5 text-[#040E1F] ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'} transition-transform`} />
                </button>

                <a
                  href="tel:+2349158482622"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-blue-950 hover:bg-blue-900 text-white font-bold text-base border border-blue-700 hover:border-blue-500 transition-all shadow-sm"
                >
                  <Phone className="w-4 h-4 text-[#B8F010]" />
                  <span>{strings.nav.hotlineTitle}</span>
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4 text-xs text-blue-200">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#B8F010]" />
                  <span>{cta.guarantee1}</span>
                </span>
                <span>•</span>
                <span>{cta.guarantee2}</span>
                <span>•</span>
                <span>{cta.guarantee3}</span>
              </div>
            </div>

            {/* Right Column: Team collaborating */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border-2 border-blue-600/80 dark:border-blue-700/80 shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80"
                  alt="African and Global professional team collaborating in a modern tech office"
                  className="w-full h-80 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040E1F] via-transparent to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#040E1F]/90 backdrop-blur-md border border-blue-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#B8F010] animate-ping" />
                    <span className="text-xs font-bold text-white">NextSofthr Partner Ecosystem</span>
                  </div>
                  <span className="text-[11px] text-[#B8F010] font-mono font-bold">15% - 40%</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
