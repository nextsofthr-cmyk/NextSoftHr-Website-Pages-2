import React, { useState } from 'react';
import { PARTNER_CATEGORIES, PARTNER_TIERS } from '../data/partnerData';
import { PartnerCategoryItem, PartnerTier } from '../types';
import { 
  Users, 
  DollarSign, 
  Cpu, 
  Briefcase, 
  Search, 
  ArrowUpRight, 
  Sparkles,
  Award,
  Shield,
  Crown,
  Gem,
  CheckCircle2,
  TrendingUp,
  Zap,
  Layers,
  FileText,
  Calculator,
  ShieldCheck,
  UserCheck,
  UserPlus,
  Server,
  ShoppingBag,
  Network,
  Compass,
  GraduationCap,
  Shuffle,
  Building2,
  CreditCard,
  Globe2,
  Target,
  Handshake,
  ArrowRight,
  ChevronRight,
  SlidersHorizontal,
  Check
} from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';

interface PartnerCategoriesProps {
  onSelectCategory?: (categoryName: string) => void;
  onApplyCategory?: (categoryName: string) => void;
}

interface TierVisualMeta {
  tier: PartnerTier;
  label: string;
  shortLabel: string;
  commission: string;
  rate: number;
  icon: React.ComponentType<{ className?: string }>;
  badgeContainerClass: string;
  badgePillClass: string;
  glowHoverClass: string;
  accentTextClass: string;
  accentBorderClass: string;
  shimmerStyle: string;
  summary: string;
  perks: string[];
}

const TIER_META: Record<PartnerTier, TierVisualMeta> = {
  bronze: {
    tier: 'bronze',
    label: 'Bronze Partner',
    shortLabel: 'Bronze',
    commission: '15% Recurring',
    rate: 15,
    icon: Award,
    badgeContainerClass: 'from-amber-950/80 via-amber-900/60 to-amber-950/90 border-amber-600/60 text-amber-200',
    badgePillClass: 'bg-amber-900/50 border border-amber-600/60 text-amber-300',
    glowHoverClass: 'hover:shadow-[0_0_15px_rgba(217,119,6,0.4)] hover:border-amber-500',
    accentTextClass: 'text-amber-400',
    accentBorderClass: 'border-amber-600',
    shimmerStyle: 'after:via-amber-300/40',
    summary: 'Ideal for independent advisors and emerging consultants establishing client portfolios.',
    perks: [
      '15% recurring software commission',
      'Partner Portal access & tracking',
      'Standard sales presentation kit',
      'Digital certificate of partnership'
    ]
  },
  silver: {
    tier: 'silver',
    label: 'Silver Partner',
    shortLabel: 'Silver',
    commission: '20% Recurring',
    rate: 20,
    icon: Shield,
    badgeContainerClass: 'from-slate-800/90 via-slate-700/60 to-slate-800/90 border-slate-400/60 text-slate-100',
    badgePillClass: 'bg-slate-700/50 border border-slate-400/60 text-slate-200',
    glowHoverClass: 'hover:shadow-[0_0_15px_rgba(203,213,225,0.35)] hover:border-slate-300',
    accentTextClass: 'text-slate-200',
    accentBorderClass: 'border-slate-400',
    shimmerStyle: 'after:via-white/50',
    summary: 'Tailored for specialized consultancies and accounting practices scaling recurring client retainers.',
    perks: [
      '20% recurring software commission',
      'Advanced product enablement sessions',
      'Priority partner technical support',
      'Co-marketing & directory listing'
    ]
  },
  gold: {
    tier: 'gold',
    label: 'Gold Partner',
    shortLabel: 'Gold',
    commission: '30% Recurring',
    rate: 30,
    icon: Crown,
    badgeContainerClass: 'from-amber-900/70 via-yellow-700/50 to-amber-900/80 border-yellow-400/80 text-yellow-300',
    badgePillClass: 'bg-yellow-500/20 border border-yellow-400/80 text-yellow-300 shadow-[0_0_12px_rgba(234,179,8,0.3)]',
    glowHoverClass: 'hover:shadow-[0_0_22px_rgba(234,179,8,0.55)] hover:border-yellow-300',
    accentTextClass: 'text-yellow-300',
    accentBorderClass: 'border-yellow-400',
    shimmerStyle: 'after:via-yellow-200/70',
    summary: 'For established advisory firms and software resellers actively acquiring and driving enterprise rollouts.',
    perks: [
      '30% recurring software commission',
      'Dedicated Partner Growth Manager',
      'Joint go-to-market campaign funds',
      'Priority qualified lead distribution'
    ]
  },
  platinum: {
    tier: 'platinum',
    label: 'Platinum Partner',
    shortLabel: 'Platinum',
    commission: '40% Recurring',
    rate: 40,
    icon: Gem,
    badgeContainerClass: 'from-cyan-950/80 via-blue-900/60 to-purple-950/80 border-cyan-400/80 text-cyan-200',
    badgePillClass: 'bg-cyan-500/20 border border-cyan-400/80 text-cyan-200 shadow-[0_0_14px_rgba(56,189,248,0.35)]',
    glowHoverClass: 'hover:shadow-[0_0_24px_rgba(184,240,16,0.45)] hover:border-[#B8F010]',
    accentTextClass: 'text-[#B8F010]',
    accentBorderClass: 'border-cyan-400',
    shimmerStyle: 'after:via-cyan-100/70',
    summary: 'For strategic system integrators, IT conglomerates, and enterprise BPO outsourcing providers.',
    perks: [
      '40% recurring software commission',
      'Executive sponsorship & roadmap reviews',
      'API sandbox & custom integration support',
      'White-label portal configuration options'
    ]
  }
};

const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case 'Users': return Users;
    case 'DollarSign': return DollarSign;
    case 'Cpu': return Cpu;
    case 'Briefcase': return Briefcase;
    case 'Calculator': return Calculator;
    case 'FileText': return FileText;
    case 'ShieldCheck': return ShieldCheck;
    case 'TrendingUp': return TrendingUp;
    case 'Award': return Award;
    case 'UserCheck': return UserCheck;
    case 'UserPlus': return UserPlus;
    case 'Server': return Server;
    case 'ShoppingBag': return ShoppingBag;
    case 'Layers': return Layers;
    case 'Network': return Network;
    case 'Compass': return Compass;
    case 'GraduationCap': return GraduationCap;
    case 'Shuffle': return Shuffle;
    case 'Building2': return Building2;
    case 'Zap': return Zap;
    case 'CreditCard': return CreditCard;
    case 'Globe2': return Globe2;
    case 'Target': return Target;
    case 'Handshake': return Handshake;
    default: return Briefcase;
  }
};

export const PartnerCategories: React.FC<PartnerCategoriesProps> = ({ 
  onSelectCategory, 
  onApplyCategory 
}) => {
  const [activeGroup, setActiveGroup] = useState<string>('All');
  const [activeTierFilter, setActiveTierFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('hr-consultants');
  const [activeTierOverride, setActiveTierOverride] = useState<PartnerTier | null>(null);

  const groups = ['All', 'HR & People', 'Finance & Tax', 'Tech & IT', 'Consulting & Advisory'];
  const tierFilters = [
    { id: 'All', label: 'All Tiers' },
    { id: 'bronze', label: '🥉 Bronze (15%)' },
    { id: 'silver', label: '🥈 Silver (20%)' },
    { id: 'gold', label: '🥇 Gold (30%)' },
    { id: 'platinum', label: '💎 Platinum (40%)' }
  ];

  const handleApply = (categoryTitle: string) => {
    if (onApplyCategory) {
      onApplyCategory(categoryTitle);
    } else if (onSelectCategory) {
      onSelectCategory(categoryTitle);
    }
  };

  // Find currently selected category
  const selectedCategory: PartnerCategoryItem = 
    PARTNER_CATEGORIES.find((c) => c.id === selectedCategoryId) || PARTNER_CATEGORIES[0];

  // Effective tier for the spotlight (either manually toggled or category's native tier)
  const currentTier: PartnerTier = activeTierOverride || selectedCategory.tier || 'silver';
  const tierMeta = TIER_META[currentTier];
  const TierIcon = tierMeta.icon;

  // Filter logic
  const filteredCategories = PARTNER_CATEGORIES.filter((item) => {
    const matchesGroup = activeGroup === 'All' || item.group === activeGroup;
    const matchesTier = activeTierFilter === 'All' || item.tier === activeTierFilter;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.bestFit.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGroup && matchesTier && matchesSearch;
  });

  const handleSelectCategoryCard = (cat: PartnerCategoryItem) => {
    setSelectedCategoryId(cat.id);
    setActiveTierOverride(null); // Reset override to reflect category's specific tier
  };

  // Estimate earnings based on standard 25-account portfolio for spotlight
  const baseAccountAnnualRev = 2400; // $200/mo * 12
  const portfolioSize = 25;
  const totalSubAnnual = portfolioSize * baseAccountAnnualRev;
  const estimatedAnnualEarning = Math.round(totalSubAnnual * (tierMeta.rate / 100));

  const { strings } = useLanguage();
  const cat = strings.categories;

  return (
    <section id="categories" className="py-24 bg-slate-50 dark:bg-[#040E1F] border-t border-slate-200 dark:border-blue-900/60 relative overflow-hidden transition-colors duration-300">
      {/* Background Decorative Mesh */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#B8F010]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/60 border border-blue-200 dark:border-blue-700/60 text-xs font-bold text-blue-800 dark:text-[#B8F010] mb-4">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>{cat.tag}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            {cat.title}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            {cat.subtitle}
          </p>
        </div>

        {/* DYNAMIC PARTNER TIER SPOTLIGHT BANNER */}
        <div className="mb-14 rounded-2xl bg-white dark:bg-gradient-to-br dark:from-[#071D3E] dark:via-[#0A2652] dark:to-[#040E1F] border border-slate-200 dark:border-blue-700/70 p-6 sm:p-8 shadow-xl dark:shadow-2xl relative overflow-hidden transition-colors duration-300">
          
          {/* Subtle Glow Aura behind Tier Badge */}
          <div className="absolute -right-16 -top-16 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            
            {/* Left: Selected Category Details & Dynamic Tier Indicator */}
            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-slate-200 dark:border-blue-800">
                  {selectedCategory.group}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Selected Category:
                </span>
                <span className="text-xs font-bold text-slate-900 dark:text-white bg-blue-50 dark:bg-blue-900/60 px-2.5 py-1 rounded-md border border-blue-200 dark:border-blue-700/60">
                  {selectedCategory.title}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  Partner Path for <span className="text-blue-600 dark:text-[#B8F010]">{selectedCategory.title}</span>
                </h3>

                {/* Dynamic Tier Badge with CSS Shimmer Animation */}
                <div 
                  className={`shimmer-badge-container shimmer-badge-active group inline-flex items-center gap-2 px-4 py-2 rounded-xl border bg-gradient-to-r ${tierMeta.badgeContainerClass} ${tierMeta.glowHoverClass} shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer`}
                  title={`${tierMeta.label} - ${tierMeta.commission}`}
                >
                  <TierIcon className={`w-5 h-5 ${tierMeta.accentTextClass} animate-pulse`} />
                  <span className="text-xs font-black tracking-wider uppercase">
                    {tierMeta.label}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/40 border border-white/20 text-white">
                    {tierMeta.commission}
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                {tierMeta.summary} Ideal fit for <strong className="text-slate-900 dark:text-white">{selectedCategory.bestFit}</strong>.
              </p>

              {/* Unlocked Perks for this Tier */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {tierMeta.perks.map((perk, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-[#B8F010] shrink-0" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Tier Switcher & Projection Card */}
            <div className="lg:w-80 bg-slate-50 dark:bg-[#040E1F]/90 rounded-xl p-5 border border-slate-200 dark:border-blue-800/80 flex flex-col justify-between shadow-sm dark:shadow-xl transition-colors duration-300">
              <div>
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200 dark:border-blue-900/60">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600 dark:text-[#B8F010]" />
                    Explore Tier Progression:
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">Click to preview</span>
                </div>

                {/* 4 Interactive Tier Selector Pills */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {(['bronze', 'silver', 'gold', 'platinum'] as PartnerTier[]).map((t) => {
                    const meta = TIER_META[t];
                    const Icon = meta.icon;
                    const isActive = currentTier === t;

                    return (
                      <button
                        key={t}
                        onClick={() => setActiveTierOverride(t)}
                        className={`shimmer-badge-container flex items-center gap-1.5 p-2 rounded-lg text-xs font-bold transition-all text-left border ${
                          isActive 
                            ? `${meta.badgePillClass} ring-2 ring-blue-400/40`
                            : 'bg-white dark:bg-blue-950/60 border-slate-200 dark:border-blue-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-blue-300 dark:hover:border-blue-700'
                        }`}
                      >
                        <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? meta.accentTextClass : 'text-slate-400 dark:text-slate-500'}`} />
                        <div className="truncate">
                          <div className="text-[11px] leading-tight">{meta.shortLabel}</div>
                          <div className="text-[9px] font-normal opacity-80">{meta.rate}% Comm.</div>
                        </div>
                        {isActive && <Check className="w-3 h-3 text-emerald-600 dark:text-[#B8F010] ml-auto shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Dynamic Projected Annual Revenue for this Tier */}
                <div className="bg-white dark:bg-[#071D3E] rounded-lg p-3 border border-slate-200 dark:border-blue-800/70 mb-4 shadow-sm">
                  <div className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 mb-1">
                    Projected Annual Return (25 Clients)
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl sm:text-2xl font-black text-blue-700 dark:text-[#B8F010]">
                      ${estimatedAnnualEarning.toLocaleString()}
                    </span>
                    <span className="text-[11px] text-slate-600 dark:text-slate-300">/ yr recurring</span>
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-blue-200/70 mt-1">
                    Based on {tierMeta.rate}% commission on NextSofthr subscriptions
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleApply(selectedCategory.title)}
                className="w-full py-2.5 px-4 rounded-lg bg-[#B8F010] hover:bg-[#cbff1a] text-[#040E1F] font-extrabold text-xs transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
              >
                <span>Apply as {tierMeta.shortLabel} Partner</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="space-y-4 mb-8">
          
          {/* Top Row: Category Groups */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Category Group Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-200/80 dark:bg-[#071D3E] p-1.5 rounded-xl border border-slate-300 dark:border-blue-800/80">
              {groups.map((group) => (
                <button
                  key={group}
                  onClick={() => setActiveGroup(group)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeGroup === group
                      ? 'bg-[#B8F010] text-[#040E1F] shadow-sm'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-blue-900/50'
                  }`}
                >
                  {group}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search 24 partner types..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-white dark:bg-[#071D3E] border border-slate-300 dark:border-blue-800 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600 dark:focus:border-[#B8F010]"
              />
            </div>
          </div>

          {/* Bottom Row: Filter by Tier */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-200 dark:border-blue-900/40">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mr-1">
              Filter by Tier:
            </span>
            {tierFilters.map((tf) => (
              <button
                key={tf.id}
                onClick={() => setActiveTierFilter(tf.id)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all border ${
                  activeTierFilter === tf.id
                    ? 'bg-blue-600 text-white dark:bg-blue-900 dark:border-[#B8F010] dark:text-[#B8F010]'
                    : 'bg-white dark:bg-blue-950/60 border-slate-200 dark:border-blue-800/80 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-blue-700'
                }`}
              >
                {tf.label}
              </button>
            ))}
            <span className="ml-auto text-xs text-slate-500 dark:text-slate-400">
              Showing <strong className="text-slate-900 dark:text-white">{filteredCategories.length}</strong> of 24 categories
            </span>
          </div>

        </div>

        {/* Categories Grid (24 items total) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-12">
          {filteredCategories.map((cat) => {
            const catTier: PartnerTier = cat.tier || 'silver';
            const catTierMeta = TIER_META[catTier];
            const CatTierIcon = catTierMeta.icon;
            const CategoryIcon = getCategoryIcon(cat.iconName);
            const isSelected = selectedCategoryId === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => handleSelectCategoryCard(cat)}
                className={`card-gold-shimmer group rounded-xl p-5 flex flex-col justify-between transition-all duration-300 cursor-pointer relative ${
                  isSelected
                    ? 'bg-blue-50/80 dark:bg-[#0A2652] border-2 border-blue-600 dark:border-[#B8F010] shadow-md dark:shadow-[0_0_24px_rgba(184,240,16,0.22)] -translate-y-1'
                    : 'bg-white dark:bg-[#071D3E]/90 border border-slate-200/90 dark:border-blue-800/70 hover:border-blue-400 dark:hover:border-blue-600 hover:-translate-y-1 shadow-sm hover:shadow-xl dark:hover:shadow-blue-950/80'
                }`}
              >
                <div>
                  
                  {/* Top Bar: Group Tag & Visual Partner Tier Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-blue-950 text-slate-700 dark:text-blue-300 border border-slate-200 dark:border-blue-800 truncate max-w-[110px]">
                      {cat.group}
                    </span>

                    {/* Dynamic Visual Partner Tier Badge with CSS Shimmer Hover Animation */}
                    <div 
                      className={`shimmer-badge-container inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold border transition-all duration-300 ${catTierMeta.badgeContainerClass} ${catTierMeta.glowHoverClass}`}
                      title={`${catTierMeta.label} - ${catTierMeta.commission}`}
                    >
                      <CatTierIcon className={`w-3 h-3 ${catTierMeta.accentTextClass}`} />
                      <span>{catTierMeta.shortLabel}</span>
                      <span className="opacity-75 font-normal">({catTierMeta.rate}%)</span>
                    </div>
                  </div>

                  {/* Title & Icon Header */}
                  <div className="flex items-start gap-3 mb-2.5">
                    <div className={`p-2 rounded-lg shrink-0 transition-colors ${
                      isSelected 
                        ? 'bg-blue-100 text-blue-700 dark:bg-[#B8F010]/20 dark:text-[#B8F010]' 
                        : 'bg-slate-100 text-slate-700 dark:bg-blue-950 dark:text-blue-300 group-hover:bg-blue-50 dark:group-hover:bg-blue-900 group-hover:text-blue-600 dark:group-hover:text-[#B8F010]'
                    }`}>
                      <CategoryIcon className="w-4 h-4" />
                    </div>

                    <h3 className={`text-base font-bold leading-snug transition-colors ${
                      isSelected ? 'text-blue-700 dark:text-[#B8F010]' : 'text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-[#B8F010]'
                    }`}>
                      {cat.title}
                    </h3>
                  </div>
                  
                  {/* Description */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {cat.description}
                  </p>
                </div>

                <div>
                  {/* Category Best Fit */}
                  <div className="pt-3 border-t border-slate-200 dark:border-blue-900/60 mb-3">
                    <span className="text-[11px] text-slate-600 dark:text-blue-200/80 font-medium block truncate" title={cat.bestFit}>
                      <strong className="text-slate-500 dark:text-slate-400">Best fit:</strong> {cat.bestFit}
                    </span>
                  </div>

                  {/* Card Actions */}
                  <div className="flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectCategoryCard(cat);
                      }}
                      className={`text-[11px] font-semibold flex items-center gap-1 transition-colors ${
                        isSelected 
                          ? 'text-blue-700 dark:text-[#B8F010]' 
                          : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-[#B8F010]" />
                          <span>Active Tier</span>
                        </>
                      ) : (
                        <>
                          <span>Select & View Tier</span>
                          <ChevronRight className="w-3 h-3" />
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApply(cat.title);
                      }}
                      className="text-[11px] font-bold text-blue-700 dark:text-[#B8F010] hover:text-blue-800 dark:hover:text-[#cbff1a] hover:underline shrink-0 flex items-center gap-1"
                    >
                      Apply &rarr;
                    </button>
                  </div>
                </div>

                {/* Selected Ribbon Accent */}
                {isSelected && (
                  <div className="absolute -top-1.5 -right-1.5 bg-[#B8F010] text-[#040E1F] text-[9px] font-black uppercase px-2 py-0.5 rounded-full shadow-md">
                    Selected
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-12 bg-blue-950/40 rounded-xl border border-blue-900 mb-12">
            <p className="text-slate-400 text-sm">
              No partner category matches &ldquo;{searchQuery}&rdquo; in {activeTierFilter !== 'All' ? `${activeTierFilter} tier` : 'selected filters'}.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setActiveGroup('All'); setActiveTierFilter('All'); }}
              className="mt-2 text-xs text-[#B8F010] underline font-bold"
            >
              Reset all filters
            </button>
          </div>
        )}

        {/* Footnote on enterprise and boutique compatibility */}
        <div className="text-center bg-[#071D3E]/50 border border-blue-800/60 rounded-xl p-5 max-w-3xl mx-auto shadow-lg">
          <p className="text-xs text-blue-200">
            <strong className="text-white">Don’t see your exact job title or business structure?</strong> All organizations that consult, manage, or advise businesses on finance, people, software, or strategy can join the NextSofthr Partner Network and qualify for Bronze, Silver, Gold, or Platinum recurring revenue tiers.
          </p>
        </div>

      </div>
    </section>
  );
};
