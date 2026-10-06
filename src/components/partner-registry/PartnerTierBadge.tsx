import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  Info,
  Crown,
  Check
} from 'lucide-react';
import { PartnerLevel } from '../types';

export type PerformanceTier = 'Platinum' | 'Gold' | 'Silver' | 'Bronze';

export interface TierInfo {
  tier: PerformanceTier;
  label: string;
  percentage: number;
  emoji: string;
  isTopTier: boolean;
  bgGradient: string;
  borderClass: string;
  textClass: string;
  pillColor: string;
  glowClass: string;
  description: string;
  commissionNote: string;
  deliverables: string[];
}

export function getPartnerTierInfo(level: PartnerLevel | string): TierInfo {
  switch (level) {
    case 'Strategic Partner':
      return {
        tier: 'Platinum',
        label: 'Platinum',
        percentage: 40,
        emoji: '💎',
        isTopTier: true,
        bgGradient: 'from-slate-900 via-indigo-950 to-slate-900',
        borderClass: 'border-cyan-400/80 dark:border-cyan-400',
        textClass: 'text-cyan-200 dark:text-cyan-100',
        pillColor: 'bg-cyan-950/80 border-cyan-400/60 text-cyan-200 shadow-cyan-950/50',
        glowClass: 'shadow-[0_0_12px_rgba(34,211,238,0.25)]',
        description: 'Elite global consultancy delivering enterprise NextSofthr transformations.',
        commissionNote: '40% Partner Margin & Priority Global Enterprise Lead Allocation',
        deliverables: [
          '40% Revenue Share Margin',
          'Dedicated Solution Architect',
          'Direct Enterprise Lead Routing',
          'Custom Product Roadmap Input'
        ]
      };

    case 'Premium Partner':
      return {
        tier: 'Gold',
        label: 'Gold',
        percentage: 30,
        emoji: '🥇',
        isTopTier: true,
        bgGradient: 'from-amber-950 via-yellow-950 to-amber-900',
        borderClass: 'border-amber-400/90 dark:border-amber-300',
        textClass: 'text-amber-300 dark:text-amber-200',
        pillColor: 'bg-amber-950/80 border-amber-400/70 text-amber-200 shadow-amber-950/50',
        glowClass: 'shadow-[0_0_10px_rgba(251,191,36,0.22)]',
        description: 'High-performing regional consultancy with 30+ verified enterprise deployments.',
        commissionNote: '30% Partner Margin & Regional Priority Dispatch',
        deliverables: [
          '30% Revenue Share Margin',
          'Joint Marketing Development Funds',
          'Priority Regional Dispatch',
          'Tier-2 Dedicated Tech Support'
        ]
      };

    case 'Professional Partner':
      return {
        tier: 'Silver',
        label: 'Silver',
        percentage: 15,
        emoji: '🥈',
        isTopTier: false,
        bgGradient: 'from-slate-800 via-slate-900 to-slate-800',
        borderClass: 'border-slate-300/80 dark:border-slate-400',
        textClass: 'text-slate-200 dark:text-slate-100',
        pillColor: 'bg-slate-800/90 border-slate-300/60 text-slate-100 shadow-slate-950/40',
        glowClass: 'shadow-[0_0_8px_rgba(203,213,225,0.18)]',
        description: 'Certified consulting firm with 15+ implementations and verified customer satisfaction.',
        commissionNote: '15% Partner Margin & Partner Portal Portal Access',
        deliverables: [
          '15% Revenue Share Margin',
          'Certified Specialist Accreditation',
          'Partner Portal Lead Access',
          'Standard Support Channel'
        ]
      };

    case 'Certified Partner':
    case 'Registered Partner':
    default:
      return {
        tier: 'Bronze',
        label: 'Bronze',
        percentage: 20,
        emoji: '🥉',
        isTopTier: false,
        bgGradient: 'from-amber-950/80 via-orange-950/80 to-amber-950/80',
        borderClass: 'border-orange-500/70 dark:border-orange-400',
        textClass: 'text-orange-200 dark:text-orange-100',
        pillColor: 'bg-orange-950/80 border-orange-500/50 text-orange-200 shadow-orange-950/40',
        glowClass: 'shadow-[0_0_8px_rgba(249,115,22,0.18)]',
        description: 'Accredited specialist completing NextSofthr technical certification modules.',
        commissionNote: '20% Partner Margin & Fundamental Implementation Support',
        deliverables: [
          '20% Revenue Share Margin',
          'Technical Examination Certified',
          'Directory Listing & Registry Search',
          'Self-Service Sandbox Access'
        ]
      };
  }
}

// ==========================================
// 1. Performance Tier Status Badge (Platinum, Gold, Silver, Bronze)
// ==========================================
interface PartnerTierBadgeProps {
  level: PartnerLevel | string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showTooltip?: boolean;
  className?: string;
}

export const PartnerTierBadge: React.FC<PartnerTierBadgeProps> = ({
  level,
  size = 'sm',
  showTooltip = false,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const info = getPartnerTierInfo(level);

  const sizeClasses = {
    xs: 'text-[10px] px-2 py-0.5 gap-1',
    sm: 'text-[11px] px-2.5 py-0.5 gap-1.5',
    md: 'text-xs px-3 py-1 gap-1.5',
    lg: 'text-sm px-3.5 py-1.5 gap-2'
  }[size];

  return (
    <div 
      className="relative inline-flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span
        className={`inline-flex items-center font-extrabold rounded-full border shadow-sm transition-all duration-200 select-none ${info.pillColor} ${info.glowClass} ${sizeClasses} ${className}`}
      >
        <span className="text-xs sm:text-sm leading-none shrink-0" role="img" aria-label={info.label}>
          {info.emoji}
        </span>
        <span className="tracking-tight whitespace-nowrap">
          {info.label} <span className="opacity-90">{info.percentage}%</span>
        </span>
      </span>

      {/* Tooltip on hover */}
      {showTooltip && isHovered && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-64 p-3 bg-slate-900/95 dark:bg-[#071938]/95 backdrop-blur-md text-white rounded-xl border border-slate-700 shadow-xl text-left pointer-events-none animate-fadeIn">
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-xs font-black text-cyan-300 flex items-center gap-1">
              <span>{info.emoji}</span>
              <span>{info.label} Tier ({info.percentage}%)</span>
            </span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/10 font-mono">
              {level}
            </span>
          </div>
          <p className="text-[11px] text-slate-300 leading-snug">
            {info.description}
          </p>
          <div className="mt-2 pt-1.5 border-t border-slate-800 text-[10px] text-emerald-400 font-medium">
            ✓ {info.commissionNote}
          </div>
        </div>
      )}
    </div>
  );
};

// ==========================================
// 2. Visual Top-Tier Status Badge
// ==========================================
interface TopTierBadgeProps {
  size?: 'xs' | 'sm' | 'md';
  pulse?: boolean;
  className?: string;
}

export const TopTierBadge: React.FC<TopTierBadgeProps> = ({
  size = 'xs',
  pulse = true,
  className = ''
}) => {
  const sizeClasses = {
    xs: 'text-[9px] px-2 py-0.5 gap-1',
    sm: 'text-[10px] px-2.5 py-0.5 gap-1',
    md: 'text-xs px-3 py-1 gap-1.5'
  }[size];

  return (
    <span
      className={`inline-flex items-center font-black uppercase tracking-wider rounded-full bg-gradient-to-r from-[#c8f526] via-emerald-400 to-[#c8f526] text-[#071938] border border-white/40 shadow-sm shadow-[#c8f526]/20 select-none ${sizeClasses} ${className}`}
      title="Top-Tier Partner: High-performing firm with highest customer satisfaction and deployment velocity"
    >
      <Sparkles className={`w-3 h-3 text-[#071938] ${pulse ? 'animate-pulse' : ''}`} />
      <span>Top-Tier</span>
    </span>
  );
};

// ==========================================
// 3. Visual Verified Status Badge
// ==========================================
interface VerifiedBadgeProps {
  size?: 'xs' | 'sm' | 'md';
  showLabel?: boolean;
  variant?: 'solid' | 'outline' | 'pill';
  className?: string;
}

export const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({
  size = 'xs',
  showLabel = true,
  variant = 'solid',
  className = ''
}) => {
  const [showTip, setShowTip] = useState(false);

  const sizeClasses = {
    xs: 'text-[10px] px-2 py-0.5 gap-1',
    sm: 'text-[11px] px-2.5 py-0.5 gap-1.5',
    md: 'text-xs px-3 py-1 gap-1.5'
  }[size];

  const variantClasses = {
    solid: 'bg-[#c8f526] text-[#071938] font-black border border-[#b5e01b] shadow-xs',
    outline: 'bg-[#c8f526]/15 dark:bg-[#c8f526]/20 text-[#071938] dark:text-[#c8f526] border border-[#c8f526]/80 font-bold',
    pill: 'bg-emerald-600 text-white font-extrabold border border-emerald-500 shadow-sm'
  }[variant];

  return (
    <div 
      className="relative inline-flex items-center"
      onMouseEnter={() => setShowTip(true)}
      onMouseLeave={() => setShowTip(false)}
    >
      <span
        className={`inline-flex items-center rounded-full select-none ${variantClasses} ${sizeClasses} ${className}`}
      >
        <ShieldCheck className="w-3.5 h-3.5 text-[#071938] dark:text-current shrink-0 stroke-[2.5]" />
        {showLabel && <span>Verified</span>}
      </span>

      {/* Tooltip on hover */}
      {showTip && (
        <div className="absolute bottom-full left-0 mb-2 z-50 w-56 p-2.5 bg-slate-900 text-white text-left rounded-xl border border-slate-700 shadow-2xl pointer-events-none animate-fadeIn">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#c8f526] mb-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>NextSofthr Verified Firm</span>
          </div>
          <p className="text-[10px] text-slate-300 leading-snug">
            Legal identity confirmed, ISO/data security reviewed, and certified NextSofthr consultants verified on staff.
          </p>
        </div>
      )}
    </div>
  );
};
