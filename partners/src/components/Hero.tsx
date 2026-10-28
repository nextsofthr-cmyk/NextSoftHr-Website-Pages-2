import React from 'react';
import { ArrowRight, Sparkles, TrendingUp, Users, ShieldCheck, DollarSign, CheckCircle2, ChevronRight, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onApplyClick: () => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onApplyClick, onExploreClick }) => {
  const { strings, isRTL } = useLanguage();
  const h = strings.hero;

  return (
    <section id="hero" className="relative pt-32 pb-20 lg:pt-36 lg:pb-28 overflow-hidden bg-gradient-to-b from-blue-50/50 via-slate-100 to-white dark:from-[#040E1F] dark:via-[#071D3E] dark:to-[#040E1F] transition-colors duration-300">
      {/* Subtle Background Glows & Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-blue-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-[#B8F010]/5 rounded-full blur-[120px]" />
        <div 
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(#B8F010 1px, transparent 1px), radial-gradient(#2563eb 1px, transparent 1px)`,
            backgroundSize: '36px 36px',
            backgroundPosition: '0 0, 18px 18px'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Messaging & CTAs */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col items-start text-left">
            {/* Top Eyebrow Tag with Floating Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/90 border border-blue-200 dark:border-[#B8F010]/30 shadow-inner mb-6 animate-float">
              <span className="flex h-2 w-2 rounded-full bg-[#B8F010] animate-ping" />
              <span className="text-xs font-semibold text-blue-900 dark:text-blue-200">
                {h.badge}
              </span>
              <span className="text-slate-400">|</span>
              <span className="text-xs font-bold text-blue-800 dark:text-[#B8F010]">
                {h.commissionBadge}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl xl:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15] mb-6">
              {h.titlePart1} <span className="text-blue-600 dark:text-white">{h.titleBrand}</span>.<br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-slate-800 to-blue-900 dark:from-blue-200 dark:via-white dark:to-blue-300">
                {h.titlePart2}
              </span><br />
              <span className="text-[#8EBD07] dark:text-[#B8F010] underline decoration-[#B8F010]/30 underline-offset-8">
                {h.titlePart3}
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300/90 max-w-2xl leading-relaxed mb-8">
              {h.subtitle}
            </p>

            {/* Hero CTAs - Single Straight Line Row */}
            <div className="flex flex-row items-center gap-2 sm:gap-2.5 xl:gap-3 overflow-x-auto no-scrollbar sm:overflow-visible flex-nowrap w-full mb-10 pb-1">
              <button
                id="hero-become-partner-btn"
                onClick={onApplyClick}
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl bg-[#B8F010] text-[#040E1F] font-extrabold text-xs sm:text-sm hover:bg-[#CBFF1A] transition-all transform hover:-translate-y-0.5 shadow-md shadow-[#B8F010]/20 group whitespace-nowrap shrink-0"
              >
                <span>{h.ctaApply}</span>
                <ArrowRight className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#040E1F] transition-transform ${isRTL ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`} />
              </button>

              <button
                id="hero-explore-btn"
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2.5 rounded-xl bg-white dark:bg-blue-950/70 text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white font-bold text-xs sm:text-sm border border-slate-300 dark:border-blue-700/60 hover:border-blue-500 transition-all hover:bg-slate-50 dark:hover:bg-blue-900/50 shadow-sm whitespace-nowrap shrink-0"
              >
                <span>{h.ctaExplore}</span>
                <ChevronRight className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-300 ${isRTL ? 'rotate-180' : ''}`} />
              </button>

              <a
                href="/partners-registry"
                id="hero-explore-partner-registry-btn"
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2.5 rounded-xl bg-blue-600/10 dark:bg-blue-900/40 text-blue-700 dark:text-[#B8F010] hover:bg-blue-600/20 dark:hover:bg-blue-900/60 font-bold text-xs sm:text-sm border border-blue-300 dark:border-blue-600/60 transition-all shadow-sm group hover:-translate-y-0.5 whitespace-nowrap shrink-0"
              >
                <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 dark:text-[#B8F010] transition-transform group-hover:scale-110" />
                <span>Explore Partner Registry</span>
              </a>
            </div>

            {/* Trust Highlights Strip Under CTAs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-200 dark:border-blue-900/60 w-full">
              <div className="flex flex-col">
                <span className="text-2xl font-black text-blue-700 dark:text-[#B8F010]">{h.stat1Value}</span>
                <span className="text-xs text-slate-500 dark:text-blue-200/80 font-medium">{h.stat1Label}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-slate-900 dark:text-white">{h.stat2Value}</span>
                <span className="text-xs text-slate-500 dark:text-blue-200/80 font-medium">{h.stat2Label}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-slate-900 dark:text-white">{h.stat3Value}</span>
                <span className="text-xs text-slate-500 dark:text-blue-200/80 font-medium">{h.stat3Label}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-blue-700 dark:text-[#B8F010]">{h.stat4Value}</span>
                <span className="text-xs text-slate-500 dark:text-blue-200/80 font-medium">{h.stat4Label}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual — African & Global Business Environment & Dashboard */}
          <div className="lg:col-span-6 xl:col-span-5 relative">
            {/* The Floating Value Badge */}
            <div className="absolute -top-4 -left-4 sm:-left-6 z-30 bg-white dark:bg-[#071D3E]/95 border border-[#8EBD07] dark:border-[#B8F010] px-4 py-2.5 rounded-xl shadow-xl backdrop-blur-md flex items-center gap-2.5 animate-float">
              <div className="w-7 h-7 rounded-lg bg-[#B8F010]/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-blue-700 dark:text-[#B8F010]" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-blue-200 font-bold">{h.philosophyTitle}</p>
                <p className="text-sm font-extrabold text-blue-800 dark:text-[#B8F010]">{h.philosophyValue}</p>
              </div>
            </div>

            {/* Main Interactive Presentation Card */}
            <div className="relative rounded-2xl bg-white dark:bg-gradient-to-br dark:from-[#0B254A] dark:via-[#071D3E] dark:to-[#040E1F] border border-slate-200 dark:border-blue-700/60 p-5 shadow-2xl overflow-hidden transition-colors duration-300">
              
              {/* Collaborative Business Atmosphere Header */}
              <div className="relative rounded-xl overflow-hidden mb-4 border border-slate-200 dark:border-blue-800/80 group">
                <img
                  src="https://templates.envytheme.com/timido/assets/images/testimonials.jpg"
                  alt="African HR & Business Advisory Consultants collaborating on NextSofthr"
                  className="w-full h-52 object-cover object-center filter contrast-105 brightness-95 group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/40 to-transparent" />
                
                {/* Visual Label Tag */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#B8F010]" />
                    <span className="text-xs font-semibold text-white drop-shadow-md">
                      {h.photoTag}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-900/80 text-blue-200 border border-blue-700">
                    {h.photoHubs}
                  </span>
                </div>
              </div>

              {/* Animated Lemon-Green Flow Architecture */}
              <div className="mb-4 bg-slate-50 dark:bg-[#040E1F]/90 rounded-xl p-3 border border-slate-200 dark:border-blue-800/50">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 dark:text-blue-200 mb-2">
                  <span className="text-slate-500 dark:text-slate-400">{h.valueCycleTag}</span>
                  <span className="text-blue-700 dark:text-[#B8F010] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B8F010] animate-ping" />
                    {h.valueCycleSub}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-1 relative items-center text-center">
                  <div className="p-2 rounded-lg bg-white dark:bg-blue-950/80 border border-slate-200 dark:border-blue-800/70 flex flex-col items-center shadow-sm">
                    <Users className="w-4 h-4 text-blue-600 dark:text-blue-300 mb-1" />
                    <span className="text-[11px] font-bold text-slate-800 dark:text-white">{h.stepPartnership}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className={`text-blue-600 dark:text-[#B8F010] font-bold text-base animate-pulse ${isRTL ? 'rotate-180' : ''}`}>➔</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white dark:bg-blue-950/80 border border-slate-200 dark:border-blue-800/70 flex flex-col items-center shadow-sm">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-[#B8F010] mb-1" />
                    <span className="text-[11px] font-bold text-slate-800 dark:text-white">{h.stepCustomers}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className={`text-blue-600 dark:text-[#B8F010] font-bold text-base animate-pulse ${isRTL ? 'rotate-180' : ''}`}>➔</span>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-1 relative items-center text-center mt-2">
                  <div className="p-2 rounded-lg bg-white dark:bg-blue-950/80 border border-slate-200 dark:border-blue-800/70 flex flex-col items-center shadow-sm">
                    <DollarSign className="w-4 h-4 text-blue-600 dark:text-[#B8F010] mb-1" />
                    <span className="text-[11px] font-bold text-slate-800 dark:text-white">{h.stepRevenue}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className={`text-blue-600 dark:text-[#B8F010] font-bold text-base animate-pulse ${isRTL ? 'rotate-180' : ''}`}>➔</span>
                  </div>
                  <div className="p-2 rounded-lg bg-blue-50 dark:bg-[#B8F010]/15 border border-blue-200 dark:border-[#B8F010]/40 flex flex-col items-center shadow-sm">
                    <TrendingUp className="w-4 h-4 text-blue-700 dark:text-[#B8F010] mb-1" />
                    <span className="text-[11px] font-bold text-blue-700 dark:text-[#B8F010]">{h.stepGrowth}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="text-xs text-blue-700 dark:text-[#B8F010] font-mono font-bold">40%</span>
                  </div>
                </div>
              </div>

              {/* Mini NextSofthr Dashboard UI Preview */}
              <div className="bg-[#030914] rounded-xl p-3 border border-blue-700/60 shadow-inner">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-blue-900/60">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    <span className="text-xs font-bold text-white">{h.dashHubTitle}</span>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#B8F010]/20 text-[#B8F010]">
                    {h.dashSyncBadge}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-left">
                  <div className="p-2 rounded bg-blue-950/60 border border-blue-900/50">
                    <span className="text-[10px] text-blue-300 block">{h.dashPayRun}</span>
                    <span className="text-xs font-bold text-white">{h.dashPayRunValue}</span>
                    <span className="text-[9px] text-[#B8F010] block font-medium">{h.dashPayRunNote}</span>
                  </div>
                  <div className="p-2 rounded bg-blue-950/60 border border-blue-900/50">
                    <span className="text-[10px] text-blue-300 block">{h.dashAiInsights}</span>
                    <span className="text-xs font-bold text-white">{h.dashAiValue}</span>
                    <span className="text-[9px] text-blue-400 block font-medium">{h.dashAiNote}</span>
                  </div>
                  <div className="p-2 rounded bg-blue-950/60 border border-[#B8F010]/30">
                    <span className="text-[10px] text-[#B8F010] block">{h.dashPartnerShare}</span>
                    <span className="text-xs font-extrabold text-[#B8F010]">{h.dashPartnerValue}</span>
                    <span className="text-[9px] text-slate-300 block font-medium">{h.dashPartnerNote}</span>
                  </div>
                </div>
              </div>

              {/* Bottom live indicator */}
              <div className="mt-3 flex items-center justify-between text-[11px] text-blue-300/80 px-1">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B8F010]" />
                  <span>{h.dashFooterText}</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
