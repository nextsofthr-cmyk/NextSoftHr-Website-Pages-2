import React from 'react';
import { 
  CheckCircle2, 
  MapPin, 
  Award, 
  Briefcase, 
  Layers, 
  Globe, 
  ExternalLink, 
  Star,
  Clock,
  Send,
  Sparkles
} from 'lucide-react';
import { Partner } from '../types';
import { PartnerCategoryBadge } from './PartnerCategoryBadge';
import { PartnerTierBadge, TopTierBadge, VerifiedBadge } from './PartnerTierBadge';
import { AvailabilityStatusBadge, getPartnerAvailability } from './AvailabilityStatusBadge';
import { useCurrency } from '../context/CurrencyContext';
import { useLanguage } from '../context/LanguageContext';

interface PartnerCardProps {
  partner: Partner;
  onViewProfile: (partner: Partner) => void;
  onContactPartner: (partner: Partner) => void;
  viewMode?: 'grid' | 'list';
  isCompared?: boolean;
  onToggleCompare?: (partner: Partner) => void;
}

export const PartnerCard: React.FC<PartnerCardProps> = ({
  partner,
  onViewProfile,
  onContactPartner,
  viewMode = 'grid',
  isCompared = false,
  onToggleCompare
}) => {
  const { formatCurrency } = useCurrency();
  const { t } = useLanguage();

  const getStartingBudgetUSD = (p: Partner) => {
    switch (p.partnerLevel) {
      case 'Strategic Partner':
        return 12500;
      case 'Premium Partner':
        return 7500;
      case 'Professional Partner':
        return 4000;
      default:
        return 2000;
    }
  };

  // Determine level badge styling
  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'Strategic Partner':
        return 'bg-[#c8f526] text-[#071938] font-bold border-[#b5e01b]';
      case 'Premium Partner':
        return 'bg-[#c8f526]/20 dark:bg-[#c8f526]/15 text-[#0c2b64] dark:text-[#c8f526] font-semibold border-[#c8f526]';
      case 'Professional Partner':
        return 'bg-blue-100 dark:bg-blue-950/80 text-blue-900 dark:text-blue-200 font-semibold border-blue-300 dark:border-blue-800';
      case 'Certified Partner':
        return 'bg-sky-50 dark:bg-sky-950/70 text-sky-800 dark:text-sky-300 border-sky-200 dark:border-sky-800';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  if (viewMode === 'list') {
    return (
      <div className={`bg-white dark:bg-[#0a1c3b] rounded-2xl border ${
        isCompared 
          ? 'border-blue-600 dark:border-[#c8f526] ring-2 ring-blue-500/30 dark:ring-[#c8f526]/30 shadow-md' 
          : 'border-slate-200 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/70 shadow-sm'
      } p-5 hover:shadow-lg transition-all duration-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 group`}>
        
        {/* Left Info & Logo */}
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-[#061227] relative">
            <img 
              src={partner.logo} 
              alt={partner.companyName} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 
                onClick={() => onViewProfile(partner)}
                className="text-lg font-bold text-[#0c2b64] dark:text-white hover:text-[#1652f0] dark:hover:text-[#c8f526] cursor-pointer transition-colors"
              >
                {partner.companyName}
              </h3>
              
              {/* Visual Verified Badge */}
              {partner.isVerified && (
                <VerifiedBadge size="xs" variant="solid" />
              )}

              {/* Performance Tier Status Badge (Platinum 40%, Gold 🥇 30%, Silver 🥈 15%, Bronze 🥉 20%) */}
              <PartnerTierBadge level={partner.partnerLevel} size="xs" showTooltip={true} />

              {/* Visual Top-Tier Status Badge */}
              {(partner.partnerLevel === 'Strategic Partner' || partner.partnerLevel === 'Premium Partner') && (
                <TopTierBadge size="xs" />
              )}

              {/* Partner Level */}
              <span className={`inline-flex items-center text-[10px] px-2.5 py-0.5 rounded-full border ${getLevelBadge(partner.partnerLevel)}`}>
                {partner.partnerLevel}
              </span>

              {/* Current Availability Status Indicator */}
              <AvailabilityStatusBadge status={getPartnerAvailability(partner)} size="xs" />
            </div>

            {/* Location & Partner Category */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400 mt-1.5">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span className="font-medium text-slate-700 dark:text-slate-300">{partner.city}, {partner.country}</span>
              </span>
              <span>•</span>
              <PartnerCategoryBadge category={partner.partnerType} size="xs" />
              <span>•</span>
              <span>{partner.yearsExperience}+ Years Exp</span>
              <span>•</span>
              <span>{partner.numberOfImplementations}+ Projects</span>
              <span>•</span>
              <span className="font-bold font-mono text-emerald-700 dark:text-[#c8f526]">
                From {formatCurrency(getStartingBudgetUSD(partner), { compact: true })}
              </span>
            </div>

            {/* Services & Industries */}
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {partner.services.slice(0, 3).map((s, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/80 border border-blue-100 dark:border-blue-900/60 text-blue-800 dark:text-blue-200 text-[11px] font-medium">
                  {s}
                </span>
              ))}
              {partner.services.length > 3 && (
                <span className="px-1.5 py-0.5 text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                  +{partner.services.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
          {onToggleCompare && (
            <button
              type="button"
              onClick={() => onToggleCompare(partner)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                isCompared
                  ? 'bg-[#c8f526] text-[#071938] border-[#c8f526] shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-500'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{isCompared ? t('card.compared', undefined, 'Compared') : t('card.compare', undefined, 'Compare')}</span>
            </button>
          )}
          <button
            onClick={() => onContactPartner(partner)}
            className="flex-1 md:flex-none px-4 py-2 rounded-xl text-xs font-semibold border border-blue-900 dark:border-slate-600 text-blue-900 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800/60 transition-colors"
          >
            {t('card.contact_partner', undefined, 'Contact Partner')}
          </button>
          <button
            onClick={() => onViewProfile(partner)}
            className="flex-1 md:flex-none px-5 py-2 rounded-xl text-xs font-bold bg-[#0c2b64] text-white hover:bg-blue-800 dark:bg-blue-900/80 dark:hover:bg-blue-800 shadow-sm transition-colors"
          >
            {t('card.view_profile', undefined, 'View Profile')}
          </button>
        </div>

      </div>
    );
  }

  // Grid View (Default)
  return (
    <div className={`bg-white dark:bg-[#0a1c3b] rounded-2xl border ${
      isCompared 
        ? 'border-blue-600 dark:border-[#c8f526] ring-2 ring-blue-500/30 dark:ring-[#c8f526]/30 shadow-md' 
        : 'border-slate-200 dark:border-slate-800 hover:border-blue-400/80 dark:hover:border-blue-500/70 shadow-sm'
    } hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group`}>
      
      {/* Top Banner / Cover */}
      <div className="relative h-28 bg-gradient-to-r from-[#0c2b64] to-[#123e8f] overflow-hidden">
        <img 
          src={partner.coverImage} 
          alt="" 
          className="w-full h-full object-cover opacity-25 group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Floating Top Left: Verified NextSofthr Partner Badge, Top-Tier Badge & Compare Toggle */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10 flex-wrap max-w-[70%]">
          {partner.isVerified && (
            <VerifiedBadge size="xs" variant="solid" />
          )}

          {/* Visual Top-Tier Status Badge for high-performing partners */}
          {(partner.partnerLevel === 'Strategic Partner' || partner.partnerLevel === 'Premium Partner') && (
            <TopTierBadge size="xs" />
          )}

          {onToggleCompare && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleCompare(partner);
              }}
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold transition-all shadow-sm ${
                isCompared
                  ? 'bg-blue-600 text-white ring-2 ring-white scale-105'
                  : 'bg-slate-900/80 hover:bg-slate-900 text-slate-200 hover:text-[#c8f526] border border-white/20 backdrop-blur-sm'
              }`}
              title={isCompared ? 'Remove from comparison' : 'Compare partner side-by-side'}
            >
              <Layers className="w-3 h-3" />
              <span>{isCompared ? 'Compared' : '+ Compare'}</span>
            </button>
          )}
        </div>

        {/* Floating Top Right: Performance Tier Badge (Platinum 40%, Gold 🥇 30%, Silver 🥈 15%, Bronze 🥉 20%) */}
        <div className="absolute top-2.5 right-2.5 z-10">
          <PartnerTierBadge level={partner.partnerLevel} size="xs" showTooltip={true} />
        </div>

        {/* Logo overlapping banner */}
        <div className="absolute -bottom-5 left-5 w-14 h-14 rounded-xl border-2 border-white dark:border-[#0a1c3b] bg-white dark:bg-[#0a1c3b] shadow-md overflow-hidden">
          <img 
            src={partner.logo} 
            alt={partner.companyName} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Real-Time Availability Status Indicator Badge on Banner */}
        <div className="absolute bottom-2 right-3 z-10 shadow-sm">
          <AvailabilityStatusBadge status={getPartnerAvailability(partner)} size="xs" />
        </div>
      </div>

      {/* Card Body */}
      <div className="pt-7 px-5 pb-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Company Name & Rating */}
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <h3 
                onClick={() => onViewProfile(partner)}
                className="text-base font-bold text-[#0c2b64] dark:text-white hover:text-[#1652f0] dark:hover:text-[#c8f526] cursor-pointer line-clamp-1 transition-colors"
                title={partner.companyName}
              >
                {partner.companyName}
              </h3>
              <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                <AvailabilityStatusBadge status={getPartnerAvailability(partner)} size="xs" />
                <PartnerCategoryBadge category={partner.partnerType} size="xs" />
                <span className={`inline-flex items-center text-[10px] px-2 py-0.5 rounded-full border shadow-2xs ${getLevelBadge(partner.partnerLevel)}`}>
                  {partner.partnerLevel}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 px-1.5 py-0.5 rounded text-[11px] font-bold text-amber-900 dark:text-amber-300 shrink-0">
              <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
              <span>{partner.rating}</span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 mt-2.5">
            <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
            <span className="font-medium text-slate-700 dark:text-slate-300">{partner.city}, {partner.country}</span>
          </div>

          {/* Tagline / Snippet */}
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-2 leading-relaxed">
            {partner.tagline || partner.description}
          </p>

          {/* Key Stats Bar: Experience, Projects & Starting Engagement Budget */}
          <div className="grid grid-cols-3 gap-1.5 mt-4 p-2 rounded-xl bg-slate-50 dark:bg-[#061227] border border-slate-100 dark:border-slate-800 text-center">
            <div>
              <div className="text-xs font-bold text-[#0c2b64] dark:text-[#c8f526]">{partner.yearsExperience}+ Yrs</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">{t('card.years_exp', undefined, 'Experience')}</div>
            </div>
            <div className="border-l border-slate-200 dark:border-slate-800">
              <div className="text-xs font-bold text-[#0c2b64] dark:text-[#c8f526]">{partner.numberOfImplementations}+</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">{t('card.projects', undefined, 'Rollouts')}</div>
            </div>
            <div className="border-l border-slate-200 dark:border-slate-800">
              <div className="text-xs font-black font-mono text-emerald-700 dark:text-[#c8f526]">
                {formatCurrency(getStartingBudgetUSD(partner), { compact: true })}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">{t('card.starting_from', undefined, 'Starting fee')}</div>
            </div>
          </div>

          {/* Expertise / Services */}
          <div className="mt-4">
            <div className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-400 tracking-wider mb-1.5">
              Core Expertise
            </div>
            <div className="flex flex-wrap gap-1">
              {partner.services.slice(0, 3).map((service, idx) => (
                <span 
                  key={idx} 
                  className="px-2 py-0.5 rounded bg-blue-50/80 dark:bg-blue-950/80 border border-blue-100 dark:border-blue-900/60 text-blue-900 dark:text-blue-200 text-[11px] font-medium"
                >
                  {service}
                </span>
              ))}
              {partner.services.length > 3 && (
                <span className="px-1.5 py-0.5 text-[10px] text-slate-400 dark:text-slate-500 font-semibold self-center">
                  +{partner.services.length - 3}
                </span>
              )}
            </div>
          </div>

          {/* Industries */}
          <div className="mt-3">
            <div className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-400 tracking-wider mb-1.5">
              Industries Served
            </div>
            <div className="text-xs text-slate-700 dark:text-slate-300 font-medium truncate">
              {partner.industries.slice(0, 3).join(' • ')}
            </div>
          </div>

          {/* Languages */}
          <div className="mt-2.5 text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <span className="font-semibold text-slate-600 dark:text-slate-300">Languages:</span>
            <span>{partner.languages.join(', ')}</span>
          </div>
        </div>

        {/* Card CTAs */}
        <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
          <button
            type="button"
            onClick={() => onContactPartner(partner)}
            className="flex-1 py-2 px-3 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-blue-900 dark:hover:border-blue-400 text-blue-950 dark:text-slate-200 font-semibold text-xs transition-colors text-center hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer"
          >
            {t('card.contact_partner', undefined, 'Contact Partner')}
          </button>
          <button
            type="button"
            onClick={() => onViewProfile(partner)}
            className="flex-1 py-2 px-3 rounded-xl bg-[#0c2b64] hover:bg-blue-800 dark:bg-blue-900/90 dark:hover:bg-blue-800 text-white font-bold text-xs shadow-sm transition-colors text-center cursor-pointer"
          >
            {t('card.view_profile', undefined, 'View Profile')}
          </button>
        </div>

      </div>

    </div>
  );
};
