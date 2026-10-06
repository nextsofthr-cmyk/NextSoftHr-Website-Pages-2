import React from 'react';
import { Sparkles, Bot, ArrowRight, ShieldCheck } from 'lucide-react';
import { Partner } from '../types';
import { AiPartnerMatchWidget } from './AiPartnerMatchWidget';

interface AiPartnerMatchSectionProps {
  partners: Partner[];
  onViewProfile: (partner: Partner) => void;
  onContactPartner: (partner: Partner) => void;
  onToggleCompare?: (partner: Partner) => void;
  comparedPartnerIds?: string[];
}

export const AiPartnerMatchSection: React.FC<AiPartnerMatchSectionProps> = ({
  partners,
  onViewProfile,
  onContactPartner,
  onToggleCompare,
  comparedPartnerIds
}) => {
  return (
    <section id="ai-partner-match" className="py-16 md:py-20 bg-slate-50 dark:bg-[#061124] border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#c8f526]/30 dark:bg-[#c8f526]/20 border border-[#c8f526] text-[#0c2b64] dark:text-[#c8f526] text-xs font-black uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#0c2b64] dark:text-[#c8f526]" />
            <span>GEMINI INTELLIGENT MATCHMAKING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0c2b64] dark:text-white tracking-tight">
            AI-Powered Partner Match Assistant
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Tell us about your headcount, geographical branches, statutory payroll requirements, and technical stack. Gemini analyzes the entire NextSofthr partner registry to recommend your optimal verified consulting partner.
          </p>
        </div>

        {/* Embedded Interactive Widget */}
        <div className="max-w-4xl mx-auto">
          <AiPartnerMatchWidget
            allPartners={partners}
            onViewProfile={onViewProfile}
            onContactPartner={onContactPartner}
            onToggleCompare={onToggleCompare}
            comparedPartnerIds={comparedPartnerIds}
            isOpen={true}
            isFloating={false}
          />
        </div>

      </div>
    </section>
  );
};
