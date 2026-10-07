import React, { useState } from 'react';
import { 
  Building, 
  MapPin, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  Quote,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { CASE_STUDIES, CaseStudyItem } from '../data/content';

interface PartnerSuccessStoriesProps {
  onFindPartnerClick: () => void;
}

export const PartnerSuccessStories: React.FC<PartnerSuccessStoriesProps> = ({ onFindPartnerClick }) => {
  return (
    <section className="py-16 md:py-24 bg-[#071938] text-white border-b border-blue-900 relative overflow-hidden">
      
      {/* Glow background */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/80 border border-[#c8f526]/40 text-[#c8f526] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>REAL BUSINESS IMPACT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Partner Success Stories
          </h2>
          <p className="mt-3 text-xs sm:text-base text-slate-300">
            Discover how certified NextSofthr partners help enterprises overcome payroll fragmentation, biometric attendance bottlenecks, and cross-border statutory compliance hurdles.
          </p>
        </div>

        {/* Featured Case Studies Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {CASE_STUDIES.slice(0, 3).map((study) => (
            <div
              key={study.id}
              className="bg-[#0b214a] rounded-2xl border border-blue-800 p-6 flex flex-col justify-between shadow-xl hover:border-blue-500 transition-all group"
            >
              <div>
                {/* Metric Callout */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-[#c8f526] text-[#071938]">
                    {study.keyMetric} {study.metricLabel}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#c8f526]" />
                    <span>{study.flag} {study.country}</span>
                  </span>
                </div>

                {/* Customer & Industry */}
                <h3 className="text-lg font-bold text-white group-hover:text-[#c8f526] transition-colors leading-snug">
                  {study.customerName}
                </h3>

                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-blue-300">
                  <span>{study.customerIndustry}</span>
                </div>

                {/* Partner Mention */}
                <div className="mt-3 text-xs font-medium text-slate-400">
                  Implemented by: <strong className="text-white">{study.partnerName}</strong>
                </div>

                {/* Challenge & Solution snippets */}
                <div className="mt-4 pt-3 border-t border-blue-900/60 space-y-2 text-xs text-slate-300">
                  <p>
                    <strong className="text-slate-200">Challenge:</strong> {study.challenge}
                  </p>
                  <p>
                    <strong className="text-slate-200">Solution:</strong> {study.solution}
                  </p>
                  <p className="text-[#c8f526] font-semibold">
                    <strong>Outcome:</strong> {study.result}
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-blue-900/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>Verified NextSofthr Case Study</span>
                <span className="text-[#c8f526] font-bold">100% Go-Live Success</span>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={onFindPartnerClick}
            className="px-6 py-3 rounded-xl bg-[#c8f526] hover:bg-[#b5e01b] text-[#071938] font-bold text-xs sm:text-sm shadow-md transition-colors"
          >
            Connect With a Partner for Your Organization
          </button>
        </div>

      </div>
    </section>
  );
};
