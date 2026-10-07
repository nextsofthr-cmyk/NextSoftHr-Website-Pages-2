import React from 'react';
import { 
  X, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  Star, 
  ArrowRight,
  TrendingUp,
  Percent,
  Check
} from 'lucide-react';
import { PartnerTierBadge, TopTierBadge, VerifiedBadge, getPartnerTierInfo } from './PartnerTierBadge';

interface TierTrustModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTier?: (tierLevel: string) => void;
}

export const TierTrustModal: React.FC<TierTrustModalProps> = ({
  isOpen,
  onClose,
  onSelectTier
}) => {
  if (!isOpen) return null;

  const tiers = [
    {
      level: 'Strategic Partner',
      title: 'Platinum 40% Tier',
      emoji: '💎',
      percentage: '40%',
      colorBadge: 'from-slate-900 via-indigo-950 to-slate-900',
      borderColor: 'border-cyan-400',
      requirements: '50+ Enterprise Deployments, Multi-Country Capability, ISO 27001 / Security Certified',
      privileges: '40% Margin Tier, Direct Executive Routing, Dedicated Solution Architect, Advisory Board',
      isTopTier: true
    },
    {
      level: 'Premium Partner',
      title: 'Gold 30% Tier',
      emoji: '🥇',
      percentage: '30%',
      colorBadge: 'from-amber-950 via-yellow-950 to-amber-900',
      borderColor: 'border-amber-400',
      requirements: '30+ Certified Implementations, 8+ Accredited Specialists, High Net Promoter Score (4.8+)',
      privileges: '30% Margin Tier, Co-op Marketing Funds, Regional Lead Dispatch, Priority SLA',
      isTopTier: true
    },
    {
      level: 'Professional Partner',
      title: 'Silver 15% Tier',
      emoji: '🥈',
      percentage: '15%',
      colorBadge: 'from-slate-800 via-slate-900 to-slate-800',
      borderColor: 'border-slate-300',
      requirements: '15+ Verified Customer Setups, 4+ Certified Implementation Consultants',
      privileges: '15% Margin Tier, Direct Directory Referral Inquiries, Partner Portal Access',
      isTopTier: false
    },
    {
      level: 'Certified Partner',
      title: 'Bronze 20% Tier',
      emoji: '🥉',
      percentage: '20%',
      colorBadge: 'from-amber-950/80 via-orange-950/80 to-amber-950/80',
      borderColor: 'border-orange-500',
      requirements: 'Technical Exam Passed, Legal Business Incorporation Verified, 2+ Certified Practitioners',
      privileges: '20% Margin Tier, Sandbox Environment, Certified Partner Badge, Global Registry Listing',
      isTopTier: false
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex justify-center p-3 sm:p-5 md:p-8 animate-fadeIn">
      <div className="bg-white dark:bg-[#071938] w-full max-w-4xl rounded-2xl md:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto relative flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#071938] via-[#0c2b64] to-[#123e8f] text-white relative shrink-0">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c8f526]/20 border border-[#c8f526] text-[#c8f526] text-xs font-black uppercase tracking-wider mb-2">
                <Award className="w-3.5 h-3.5" />
                <span>NextSofthr Accreditation Framework</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Partner Tiers & Verification Trust Standards
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-xl">
                How NextSofthr vets, ranks, and audits consulting firms across the pan-African and international ecosystem.
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors shrink-0"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Verified Partner Guarantee Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border border-emerald-200 dark:border-emerald-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#c8f526] text-[#071938] flex items-center justify-center shrink-0 shadow-md">
                <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-[#0c2b64] dark:text-white">
                    What Does the 'Verified' Status Mean?
                  </h4>
                  <VerifiedBadge size="xs" variant="solid" />
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  Every firm marked with the <strong className="text-[#071938] dark:text-[#c8f526]">Verified</strong> badge has submitted proof of legal business incorporation, verified direct tax authority registrations (e.g. FIRS, KRA, SARS, GRA), and carries verified NextSofthr certified consultants on staff.
                </p>
              </div>
            </div>
          </div>

          {/* 4 Tiers Comparison Cards */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-black uppercase tracking-wider text-slate-800 dark:text-white flex items-center gap-2">
                <Percent className="w-4 h-4 text-blue-600 dark:text-[#c8f526]" />
                <span>Performance Tiers & Revenue Share Margins</span>
              </h4>
              <span className="text-xs text-slate-500">Click any tier to filter registry</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tiers.map((t) => (
                <div 
                  key={t.level}
                  onClick={() => {
                    if (onSelectTier) {
                      onSelectTier(t.level);
                      onClose();
                    }
                  }}
                  className={`p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer hover:shadow-lg relative group ${
                    t.isTopTier 
                      ? 'bg-gradient-to-b from-blue-50/60 to-white dark:from-[#0a1c3b] dark:to-[#071938] border-blue-400 dark:border-blue-600/70 hover:border-[#c8f526]'
                      : 'bg-white dark:bg-[#0a1c3b] border-slate-200 dark:border-slate-800 hover:border-blue-400'
                  }`}
                >
                  {/* Top Header */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <PartnerTierBadge level={t.level} size="md" />
                      {t.isTopTier && <TopTierBadge size="xs" />}
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      {t.level}
                    </span>
                  </div>

                  <h5 className="text-base font-bold text-[#0c2b64] dark:text-white group-hover:text-blue-600 dark:group-hover:text-[#c8f526] transition-colors">
                    {t.title}
                  </h5>

                  {/* Requirements */}
                  <div className="mt-3 text-xs space-y-1.5">
                    <div>
                      <span className="font-bold text-slate-500 dark:text-slate-400 text-[11px] uppercase tracking-wider block">
                        Vetting Benchmark:
                      </span>
                      <p className="text-slate-700 dark:text-slate-200 text-xs">
                        {t.requirements}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                      <span className="font-bold text-slate-500 dark:text-slate-400 text-[11px] uppercase tracking-wider block">
                        Privileges:
                      </span>
                      <p className="text-emerald-700 dark:text-[#c8f526] font-medium text-xs">
                        {t.privileges}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-blue-700 dark:text-[#c8f526] font-bold">
                    <span>Filter Directory for {t.level}s</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-[#061124] border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Tiers audited semi-annually based on verified platform deployments.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#0c2b64] text-white font-bold hover:bg-blue-800 transition-colors"
          >
            Got It
          </button>
        </div>

      </div>
    </div>
  );
};
