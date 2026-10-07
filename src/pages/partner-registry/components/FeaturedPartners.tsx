import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2, Star, MapPin, Award } from 'lucide-react';
import { Partner } from '../types';
import { PartnerCategoryBadge } from './PartnerCategoryBadge';
import { PartnerTierBadge, TopTierBadge, VerifiedBadge } from './PartnerTierBadge';

interface FeaturedPartnersProps {
  partners: Partner[];
  onViewProfile: (partner: Partner) => void;
  onViewAllClick: () => void;
}

export const FeaturedPartners: React.FC<FeaturedPartnersProps> = ({
  partners,
  onViewProfile,
  onViewAllClick
}) => {
  const featured = partners.filter(p => p.isFeatured).slice(0, 4);

  return (
    <section className="py-16 md:py-20 bg-white dark:bg-[#061124] border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Title and "View All Partners" link */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c8f526]/30 dark:bg-[#c8f526]/20 border border-[#c8f526] text-[#0c2b64] dark:text-[#c8f526] text-xs font-black uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PREMIER ECOSYSTEM LEADERS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0c2b64] dark:text-white tracking-tight">
              Featured NextSofthr Partners
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Recognized Strategic and Premium partners with demonstrated excellence in high-scale implementations.
            </p>
          </div>

          <button
            onClick={onViewAllClick}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0c2b64] dark:text-[#c8f526] hover:text-blue-700 dark:hover:text-lime-300 group shrink-0"
          >
            <span>View All Partners</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#0c2b64] dark:text-[#c8f526]" />
          </button>
        </div>

        {/* 4 Featured Partner Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((partner) => (
            <div
              key={partner.id}
              className="bg-[#f8fafc] dark:bg-[#0a1c3b] rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 p-5 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Logo and Tier */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-14 h-14 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#061227] shadow-xs shrink-0">
                    <img src={partner.logo} alt={partner.companyName} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <PartnerTierBadge level={partner.partnerLevel} size="xs" showTooltip={true} />
                    {(partner.partnerLevel === 'Strategic Partner' || partner.partnerLevel === 'Premium Partner') && (
                      <TopTierBadge size="xs" />
                    )}
                  </div>
                </div>

                {/* Name & Verification */}
                <div className="flex items-center gap-1.5 mb-1">
                  <h3 
                    onClick={() => onViewProfile(partner)}
                    className="text-base font-bold text-[#0c2b64] dark:text-white hover:text-blue-600 dark:hover:text-[#c8f526] cursor-pointer line-clamp-1 transition-colors"
                  >
                    {partner.companyName}
                  </h3>
                </div>

                {/* Category Badge & Verification */}
                <div className="flex flex-wrap items-center gap-1.5 mb-2">
                  <PartnerCategoryBadge category={partner.partnerType} size="xs" />
                  {partner.isVerified && (
                    <VerifiedBadge size="xs" variant="solid" />
                  )}
                </div>

                {/* Country / City */}
                <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span className="dark:text-slate-300">{partner.city}, {partner.country}</span>
                </div>

                {/* Services */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {partner.services.slice(0, 2).map((s, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/80 border border-blue-100 dark:border-blue-900/60 text-blue-800 dark:text-blue-200 text-[10px] font-medium">
                      {s}
                    </span>
                  ))}
                  {partner.services.length > 2 && (
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium self-center">
                      +{partner.services.length - 2}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onViewProfile(partner)}
                className="w-full py-2 rounded-xl bg-white dark:bg-[#061227] border border-slate-200 dark:border-slate-700 hover:bg-[#0c2b64] hover:text-white dark:hover:bg-blue-900 text-[#0c2b64] dark:text-slate-200 font-bold text-xs shadow-xs transition-colors text-center"
              >
                View Profile
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
