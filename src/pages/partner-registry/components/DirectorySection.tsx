import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  RotateCcw, 
  LayoutGrid, 
  List, 
  ChevronDown, 
  X, 
  Check, 
  MapPin, 
  Building, 
  Briefcase, 
  Award,
  Layers,
  Sparkles,
  ArrowUpDown,
  CheckCircle2,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { Partner, FilterState } from '../types';
import { COUNTRIES_DATA } from '../data/countries';
import { PartnerCard } from './PartnerCard';
import { PartnerCategoryBadge } from './PartnerCategoryBadge';
import { CategoryStandardsModal } from './CategoryStandardsModal';
import { PartnerTierBadge, TopTierBadge, VerifiedBadge } from './PartnerTierBadge';
import { TierTrustModal } from './TierTrustModal';
import { PartnerComparisonModal } from './PartnerComparisonModal';
import { PartnerComparisonDock } from './PartnerComparisonDock';
import { AvailabilityStatusBadge, getPartnerAvailability } from './AvailabilityStatusBadge';
import { useLanguage } from '../context/LanguageContext';

interface DirectorySectionProps {
  partners: Partner[];
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onViewProfile: (partner: Partner) => void;
  onContactPartner: (partner: Partner) => void;
}

export const DirectorySection: React.FC<DirectorySectionProps> = ({
  partners,
  filters,
  onFilterChange,
  onViewProfile,
  onContactPartner
}) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { t } = useLanguage();
  const [isCategoryStandardsOpen, setIsCategoryStandardsOpen] = useState(false);
  const [isTierTrustOpen, setIsTierTrustOpen] = useState(false);
  const [comparedPartnerIds, setComparedPartnerIds] = useState<string[]>([]);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const asideRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const [sidebarHeight, setSidebarHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const updateHeight = () => {
      if (window.innerWidth >= 1024 && asideRef.current) {
        const h = asideRef.current.offsetHeight;
        if (h > 0) {
          setSidebarHeight(h);
        }
      } else {
        setSidebarHeight(undefined);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);

    let observer: ResizeObserver | null = null;
    if (asideRef.current && typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(() => {
        updateHeight();
      });
      observer.observe(asideRef.current);
    }

    return () => {
      window.removeEventListener('resize', updateHeight);
      if (observer) observer.disconnect();
    };
  }, [filters]);

  const handleToggleCompare = (partner: Partner) => {
    setComparedPartnerIds(prev => {
      if (prev.includes(partner.id)) {
        return prev.filter(id => id !== partner.id);
      }
      if (prev.length >= 4) {
        return prev;
      }
      return [...prev, partner.id];
    });
  };

  const handleRemoveCompare = (partnerId: string) => {
    setComparedPartnerIds(prev => prev.filter(id => id !== partnerId));
  };

  const handleClearCompare = () => {
    setComparedPartnerIds([]);
  };

  const comparedPartners = partners.filter(p => comparedPartnerIds.includes(p.id));

  // Filter option lists
  const partnerTypes = [
    'Implementation Partner',
    'HR Consultant',
    'Payroll Specialist',
    'Accounting Firm',
    'Technology Partner',
    'System Integrator',
    'Software Consultant',
    'Business Consultant',
    'HR Technology Consultant',
    'Training Partner'
  ];

  const industries = [
    'Manufacturing',
    'Retail',
    'Financial Services',
    'Technology',
    'Agriculture',
    'Logistics',
    'Hospitality',
    'Healthcare',
    'Education',
    'NGOs',
    'Construction',
    'Professional Services'
  ];

  const services = [
    'HR Implementation',
    'HR Consulting',
    'HR Outsourcing',
    'Payroll (PAYE/Pension/NSITF)',
    'Payroll Outsourcing',
    'Payroll Implementation',
    'Payroll Consulting',
    'Shift & Attendance Scheduling',
    'Accounting & Finance',
    'Data Migration',
    'Compliance Support',
    'Company Incorporation',
    'Returns & Filing',
    'System Integration',
    'Training & Development',
    'Employee Training',
    'Customization',
    'Technical Support',
    'Business Process Consulting'
  ];

  const businessSizes = [
    'Micro Business',
    'Small Business',
    'Medium Business',
    'Large Enterprise',
    'Multinational'
  ];

  const partnerLevels = [
    'Strategic Partner',
    'Premium Partner',
    'Professional Partner',
    'Certified Partner',
    'Registered Partner'
  ];

  // Derive dynamic cities based on selected country
  const currentCountryObj = COUNTRIES_DATA.find(c => c.name === filters.country);
  const availableCities = currentCountryObj ? currentCountryObj.keyCities : [];

  // Filter and sort logic
  const filteredPartners = useMemo(() => {
    return partners.filter((p) => {
      // Text Search
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matchesName = p.companyName.toLowerCase().includes(q);
        const matchesCountry = p.country.toLowerCase().includes(q);
        const matchesCity = p.city.toLowerCase().includes(q);
        const matchesType = p.partnerType.toLowerCase().includes(q);
        const matchesService = p.services.some(s => s.toLowerCase().includes(q));
        const matchesIndustry = p.industries.some(i => i.toLowerCase().includes(q));
        if (!matchesName && !matchesCountry && !matchesCity && !matchesType && !matchesService && !matchesIndustry) {
          return false;
        }
      }

      // Country
      if (filters.country && p.country.toLowerCase() !== filters.country.toLowerCase()) {
        return false;
      }

      // City
      if (filters.city && p.city.toLowerCase() !== filters.city.toLowerCase()) {
        return false;
      }

      // Partner Type
      if (filters.partnerType && p.partnerType !== filters.partnerType) {
        return false;
      }

      // Industry
      if (filters.industry && !p.industries.includes(filters.industry)) {
        return false;
      }

      // Service
      if (filters.service && !p.services.includes(filters.service)) {
        return false;
      }

      // Business Size
      if (filters.businessSize && !p.businessSizesServed.includes(filters.businessSize as any)) {
        return false;
      }

      // Partner Level
      if (filters.partnerLevel && p.partnerLevel !== filters.partnerLevel) {
        return false;
      }

      // Availability Status
      if (filters.availabilityStatus) {
        const pStatus = getPartnerAvailability(p);
        if (pStatus !== filters.availabilityStatus) {
          return false;
        }
      }

      // Verified Only
      if (filters.verifiedOnly && !p.isVerified) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'implementations') {
        return b.numberOfImplementations - a.numberOfImplementations;
      }
      if (filters.sortBy === 'experience') {
        return b.yearsExperience - a.yearsExperience;
      }
      if (filters.sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (filters.sortBy === 'level') {
        const levelWeight: Record<string, number> = {
          'Strategic Partner': 5,
          'Premium Partner': 4,
          'Professional Partner': 3,
          'Certified Partner': 2,
          'Registered Partner': 1
        };
        return (levelWeight[b.partnerLevel] || 0) - (levelWeight[a.partnerLevel] || 0);
      }
      // Default: recommended (featured first, then rating)
      if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;
      return b.rating - a.rating;
    });
  }, [partners, filters]);

  // Paginated partners
  const paginatedPartners = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPartners.slice(start, start + itemsPerPage);
  }, [filteredPartners, currentPage]);

  const totalPages = Math.ceil(filteredPartners.length / itemsPerPage);

  const handleResetFilters = () => {
    onFilterChange({
      searchQuery: '',
      country: '',
      city: '',
      partnerType: '',
      industry: '',
      businessSize: '',
      service: '',
      partnerLevel: '',
      availabilityStatus: '',
      verifiedOnly: false,
      sortBy: 'recommended'
    });
    setCurrentPage(1);
  };

  const activeFilterCount = [
    filters.country,
    filters.city,
    filters.partnerType,
    filters.industry,
    filters.businessSize,
    filters.service,
    filters.partnerLevel,
    filters.availabilityStatus,
    filters.verifiedOnly
  ].filter(Boolean).length;

  return (
    <section id="directory" className="py-16 md:py-24 bg-[#f8fafc] dark:bg-[#061124] border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/70 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-[#0c2b64] dark:text-[#c8f526] text-xs font-bold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5 text-[#0c2b64] dark:text-[#c8f526]" />
            <span>GLOBAL PARTNER REGISTRY & DIRECTORY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0c2b64] dark:text-white tracking-tight">
            {t('directory.title', undefined, 'Find the Right Partner for Your Business')}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            {t('directory.subtitle', undefined, 'Browse vetted solution providers, payroll specialists, and HR tech consultancies.')}
          </p>
        </div>

        {/* Top Control Bar: Search Input, View Mode, Sorting, Mobile Filter Button */}
        <div className="bg-white dark:bg-[#0a1c3b] rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Quick Search */}
          <div className="relative w-full md:w-80 lg:w-96">
            <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => {
                onFilterChange({ ...filters, searchQuery: e.target.value });
                setCurrentPage(1);
              }}
              placeholder={t('directory.search_label', undefined, 'Search partners or keywords...')}
              className="w-full pl-9 pr-8 py-2 bg-slate-50 dark:bg-[#061227] border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-700 dark:focus:border-[#c8f526]"
            />
            {filters.searchQuery && (
              <button 
                onClick={() => onFilterChange({ ...filters, searchQuery: '' })}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Center Info: Count of matching partners */}
          <div className="text-xs text-slate-600 dark:text-slate-400 font-medium text-center md:text-left">
            {t('directory.showing_results', { count: filteredPartners.length }, `Showing ${filteredPartners.length} certified partners`)}
            {filters.country && <span> in <strong className="text-blue-800 dark:text-blue-400">{filters.country}</strong></span>}
          </div>

          {/* Right Controls: Sort Dropdown & View Mode Switcher & Mobile Filter Trigger */}
          <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
            
            {/* Mobile Filter Drawer Button */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="md:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-[#061227] border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-blue-700 dark:text-[#c8f526]" />
              <span>{t('directory.filters', undefined, 'Filters')} {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
            </button>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-400 hidden sm:inline">Sort:</span>
              <select
                value={filters.sortBy}
                onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value as any })}
                className="px-2.5 py-1.5 rounded-xl bg-slate-50 dark:bg-[#061227] border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:border-blue-700 dark:focus:border-[#c8f526]"
              >
                <option value="recommended">Recommended</option>
                <option value="level">Partner Level</option>
                <option value="implementations">Most Implementations</option>
                <option value="experience">Most Experienced</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-100 dark:bg-[#061227] border border-slate-200 dark:border-slate-800 rounded-xl p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-[#0c2b64] shadow-xs text-blue-800 dark:text-[#c8f526]' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}
                title="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-[#0c2b64] shadow-xs text-blue-800 dark:text-[#c8f526]' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}
                title="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>



          </div>

        </div>

        {/* Partner Categories Quick Badge Ribbon */}
        <div className="bg-white dark:bg-[#0a1c3b] rounded-2xl border border-slate-200 dark:border-slate-800 p-3.5 mb-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2 shrink-0">
            <Award className="w-4 h-4 text-[#0c2b64] dark:text-[#c8f526]" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Partner Categories:
            </span>
          </div>
          
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none flex-1">
            <button
              type="button"
              onClick={() => {
                onFilterChange({ ...filters, partnerType: '' });
                setCurrentPage(1);
              }}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors border ${
                !filters.partnerType
                  ? 'bg-[#0c2b64] dark:bg-[#c8f526] text-white dark:text-[#071938] border-transparent font-bold shadow-xs'
                  : 'bg-slate-100 dark:bg-[#061227] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
              }`}
            >
              All Categories
            </button>
            {partnerTypes.map((type) => {
              const isActive = filters.partnerType === type;
              return (
                <div key={type} className="shrink-0">
                  <PartnerCategoryBadge 
                    category={type}
                    size="xs"
                    interactive={true}
                    onClick={() => {
                      onFilterChange({ ...filters, partnerType: isActive ? '' : type });
                      setCurrentPage(1);
                    }}
                    className={isActive ? 'ring-2 ring-blue-700 dark:ring-[#c8f526] font-black scale-105 shadow-sm' : 'opacity-85 hover:opacity-100'}
                  />
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setIsCategoryStandardsOpen(true)}
            className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 dark:text-[#c8f526] hover:underline shrink-0 whitespace-nowrap pl-2 border-l border-slate-200 dark:border-slate-800 cursor-pointer"
          >
            <span>All Badges & Standards</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Current Availability Status Filter Ribbon */}
        <div className="bg-white dark:bg-[#0a1c3b] rounded-2xl border border-slate-200 dark:border-slate-800 p-3 mb-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Availability Status:
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none flex-1">
            {[
              { value: '', label: 'All Availability' },
              { value: 'Accepting New Clients', label: '🟢 Accepting New Clients' },
              { value: 'Currently Booked', label: '⚪ Currently Booked' }
            ].map((opt) => {
              const isSelected = (filters.availabilityStatus || '') === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onFilterChange({ ...filters, availabilityStatus: opt.value });
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                    isSelected
                      ? 'bg-[#0c2b64] text-white dark:bg-[#c8f526] dark:text-[#071938] border-transparent font-black shadow-xs ring-2 ring-blue-500/20'
                      : 'bg-slate-50 dark:bg-[#061227] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          <div className="text-[11px] text-slate-400 dark:text-slate-500 hidden lg:block">
            Filter by partner engagement capacity
          </div>
        </div>

        {/* Performance Tiers & Trust Status Ribbon */}
        <div className="bg-gradient-to-r from-slate-900 via-[#071938] to-slate-900 text-white rounded-2xl p-3.5 mb-6 shadow-md border border-cyan-500/30 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-[#c8f526] text-[#071938] flex items-center justify-center font-black">
              <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-1.5">
                <span>Vetted Performance Tiers:</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-400/20 text-cyan-300 font-mono">Verified Trust</span>
              </span>
              <p className="text-[11px] text-slate-300">
                Audited platform margins, deployment SLAs, and certifications
              </p>
            </div>
          </div>

          {/* Quick Tier Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none flex-1 lg:justify-center">
            {/* All Tiers */}
            <button
              type="button"
              onClick={() => {
                onFilterChange({ ...filters, partnerLevel: '', verifiedOnly: false });
                setCurrentPage(1);
              }}
              className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all shrink-0 ${
                !filters.partnerLevel && !filters.verifiedOnly
                  ? 'bg-[#c8f526] text-[#071938] shadow-sm'
                  : 'bg-white/10 hover:bg-white/20 text-slate-200'
              }`}
            >
              All Tiers
            </button>

            {/* Platinum 40% */}
            <button
              type="button"
              onClick={() => {
                onFilterChange({ 
                  ...filters, 
                  partnerLevel: filters.partnerLevel === 'Strategic Partner' ? '' : 'Strategic Partner' 
                });
                setCurrentPage(1);
              }}
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold transition-all shrink-0 border ${
                filters.partnerLevel === 'Strategic Partner'
                  ? 'bg-cyan-400 text-slate-950 border-cyan-300 ring-2 ring-cyan-400 shadow-md scale-105'
                  : 'bg-slate-800/80 border-cyan-400/50 text-cyan-200 hover:border-cyan-300'
              }`}
            >
              <span>💎</span>
              <span>Platinum 40%</span>
            </button>

            {/* Gold 30% */}
            <button
              type="button"
              onClick={() => {
                onFilterChange({ 
                  ...filters, 
                  partnerLevel: filters.partnerLevel === 'Premium Partner' ? '' : 'Premium Partner' 
                });
                setCurrentPage(1);
              }}
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold transition-all shrink-0 border ${
                filters.partnerLevel === 'Premium Partner'
                  ? 'bg-amber-400 text-slate-950 border-amber-300 ring-2 ring-amber-400 shadow-md scale-105'
                  : 'bg-slate-800/80 border-amber-400/50 text-amber-200 hover:border-amber-300'
              }`}
            >
              <span>🥇</span>
              <span>Gold 30%</span>
            </button>

            {/* Silver 15% */}
            <button
              type="button"
              onClick={() => {
                onFilterChange({ 
                  ...filters, 
                  partnerLevel: filters.partnerLevel === 'Professional Partner' ? '' : 'Professional Partner' 
                });
                setCurrentPage(1);
              }}
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold transition-all shrink-0 border ${
                filters.partnerLevel === 'Professional Partner'
                  ? 'bg-slate-200 text-slate-950 border-white ring-2 ring-slate-200 shadow-md scale-105'
                  : 'bg-slate-800/80 border-slate-400/50 text-slate-200 hover:border-slate-300'
              }`}
            >
              <span>🥈</span>
              <span>Silver 15%</span>
            </button>

            {/* Bronze 20% */}
            <button
              type="button"
              onClick={() => {
                onFilterChange({ 
                  ...filters, 
                  partnerLevel: filters.partnerLevel === 'Certified Partner' ? '' : 'Certified Partner' 
                });
                setCurrentPage(1);
              }}
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold transition-all shrink-0 border ${
                filters.partnerLevel === 'Certified Partner'
                  ? 'bg-orange-400 text-slate-950 border-orange-300 ring-2 ring-orange-400 shadow-md scale-105'
                  : 'bg-slate-800/80 border-orange-400/50 text-orange-200 hover:border-orange-300'
              }`}
            >
              <span>🥉</span>
              <span>Bronze 20%</span>
            </button>

            {/* Verified Only Toggle */}
            <button
              type="button"
              onClick={() => {
                onFilterChange({ ...filters, verifiedOnly: !filters.verifiedOnly });
                setCurrentPage(1);
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all shrink-0 border ${
                filters.verifiedOnly
                  ? 'bg-[#c8f526] text-[#071938] border-[#c8f526] font-black shadow-sm'
                  : 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300 hover:border-emerald-400'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Verified Only</span>
            </button>
          </div>

          {/* Guide Link Button */}
          <button
            type="button"
            onClick={() => setIsTierTrustOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors shrink-0 cursor-pointer self-start lg:self-auto"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#c8f526]" />
            <span>Tier Trust Standards</span>
            <ChevronRight className="w-3 h-3 text-[#c8f526]" />
          </button>
        </div>

        {/* Active Filter Pills Bar */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Active Filters:</span>
            
            {filters.country && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-[#0d234d] border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-200 font-semibold">
                Country: {filters.country}
                <button onClick={() => onFilterChange({ ...filters, country: '', city: '' })}><X className="w-3 h-3 hover:text-red-500" /></button>
              </span>
            )}

            {filters.city && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-[#0d234d] border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-200 font-semibold">
                City: {filters.city}
                <button onClick={() => onFilterChange({ ...filters, city: '' })}><X className="w-3 h-3 hover:text-red-500" /></button>
              </span>
            )}

            {filters.partnerType && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-[#0d234d] border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-200 font-semibold">
                Type: {filters.partnerType}
                <button onClick={() => onFilterChange({ ...filters, partnerType: '' })}><X className="w-3 h-3 hover:text-red-500" /></button>
              </span>
            )}

            {filters.industry && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-[#0d234d] border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-200 font-semibold">
                Industry: {filters.industry}
                <button onClick={() => onFilterChange({ ...filters, industry: '' })}><X className="w-3 h-3 hover:text-red-500" /></button>
              </span>
            )}

            {filters.service && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-[#0d234d] border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-200 font-semibold">
                Service: {filters.service}
                <button onClick={() => onFilterChange({ ...filters, service: '' })}><X className="w-3 h-3 hover:text-red-500" /></button>
              </span>
            )}

            {filters.partnerLevel && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-[#0d234d] border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-200 font-semibold">
                Level: {filters.partnerLevel}
                <button onClick={() => onFilterChange({ ...filters, partnerLevel: '' })}><X className="w-3 h-3 hover:text-red-500" /></button>
              </span>
            )}

            {filters.availabilityStatus && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 font-bold">
                Availability: {filters.availabilityStatus}
                <button onClick={() => onFilterChange({ ...filters, availabilityStatus: '' })}><X className="w-3 h-3 hover:text-red-500" /></button>
              </span>
            )}

            <button
              onClick={handleResetFilters}
              className="text-xs font-bold text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 flex items-center gap-1 ml-2 underline"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset All</span>
            </button>
          </div>
        )}

        {/* Main Grid: Filters Sidebar + Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Desktop Filter Sidebar (lg:col-span-3) - Stays stationary */}
          <aside ref={asideRef} className="hidden lg:block lg:col-span-3 lg:sticky lg:top-24 self-start bg-white dark:bg-[#0a1c3b] rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-6">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 font-black text-sm text-[#0c2b64] dark:text-white">
                <Filter className="w-4 h-4 text-blue-700 dark:text-[#c8f526]" />
                <span>Filter Registry</span>
              </div>
              {activeFilterCount > 0 && (
                <button 
                  onClick={handleResetFilters}
                  className="text-[11px] font-bold text-red-600 dark:text-red-400 hover:underline"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Country Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Country
              </label>
              <select
                value={filters.country}
                onChange={(e) => {
                  onFilterChange({ ...filters, country: e.target.value, city: '' });
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#061227] border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-700 dark:focus:border-[#c8f526]"
              >
                <option value="">All Countries</option>
                <optgroup label="Africa">
                  {COUNTRIES_DATA.filter(c => c.region === 'Africa').map(c => (
                    <option key={c.id} value={c.name}>{c.flag} {c.name}</option>
                  ))}
                </optgroup>
                <optgroup label="International">
                  {COUNTRIES_DATA.filter(c => c.region === 'International').map(c => (
                    <option key={c.id} value={c.name}>{c.flag} {c.name}</option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* City Filter (Dynamic) */}
            {availableCities.length > 0 && (
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  City in {filters.country}
                </label>
                <select
                  value={filters.city}
                  onChange={(e) => {
                    onFilterChange({ ...filters, city: e.target.value });
                    setCurrentPage(1);
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#061227] border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-700 dark:focus:border-[#c8f526]"
                >
                  <option value="">All Cities</option>
                  {availableCities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Partner Level Filter */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Partner Level & Tier
                </label>
                <button
                  type="button"
                  onClick={() => setIsTierTrustOpen(true)}
                  className="text-[10px] text-blue-700 dark:text-[#c8f526] hover:underline font-bold"
                >
                  Guide
                </button>
              </div>
              <div className="space-y-1.5">
                {partnerLevels.map((lvl) => {
                  const getTierBadgeShort = (l: string) => {
                    if (l === 'Strategic Partner') return { label: 'Platinum', pct: '40%', emoji: '💎' };
                    if (l === 'Premium Partner') return { label: 'Gold', pct: '30%', emoji: '🥇' };
                    if (l === 'Professional Partner') return { label: 'Silver', pct: '15%', emoji: '🥈' };
                    if (l === 'Certified Partner') return { label: 'Bronze', pct: '20%', emoji: '🥉' };
                    return null;
                  };
                  const tb = getTierBadgeShort(lvl);

                  return (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => {
                        onFilterChange({
                          ...filters,
                          partnerLevel: filters.partnerLevel === lvl ? '' : lvl
                        });
                        setCurrentPage(1);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-colors ${
                        filters.partnerLevel === lvl
                          ? 'bg-[#c8f526]/30 dark:bg-[#c8f526]/20 text-[#0c2b64] dark:text-[#c8f526] font-bold border border-[#c8f526]'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 min-w-0">
                        {tb && <span className="text-xs">{tb.emoji}</span>}
                        <span className="truncate">{lvl}</span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        {tb && (
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold">
                            {tb.pct}
                          </span>
                        )}
                        {filters.partnerLevel === lvl && <Check className="w-3.5 h-3.5 text-[#0c2b64] dark:text-[#c8f526]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Availability Status Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Availability Status
              </label>
              <div className="space-y-1.5">
                {[
                  { value: '', label: 'All Availability' },
                  { value: 'Accepting New Clients', label: '🟢 Accepting New Clients' },
                  { value: 'Currently Booked', label: '⚪ Currently Booked' }
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onFilterChange({ ...filters, availabilityStatus: opt.value });
                      setCurrentPage(1);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
                      (filters.availabilityStatus || '') === opt.value
                        ? 'bg-blue-50 dark:bg-blue-950/80 text-blue-900 dark:text-[#c8f526] font-bold border border-blue-200 dark:border-blue-800'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-transparent'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {(filters.availabilityStatus || '') === opt.value && (
                      <Check className="w-3.5 h-3.5 text-blue-700 dark:text-[#c8f526]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Partner Type Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Partner Type
              </label>
              <select
                value={filters.partnerType}
                onChange={(e) => {
                  onFilterChange({ ...filters, partnerType: e.target.value });
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#061227] border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-700 dark:focus:border-[#c8f526]"
              >
                <option value="">All Types</option>
                {partnerTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Industry Expertise Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Industry Expertise
              </label>
              <select
                value={filters.industry}
                onChange={(e) => {
                  onFilterChange({ ...filters, industry: e.target.value });
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#061227] border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-700 dark:focus:border-[#c8f526]"
              >
                <option value="">All Industries</option>
                {industries.map((ind) => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </div>

            {/* Service Category Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Service Required
              </label>
              <select
                value={filters.service}
                onChange={(e) => {
                  onFilterChange({ ...filters, service: e.target.value });
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#061227] border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-700 dark:focus:border-[#c8f526]"
              >
                <option value="">All Services</option>
                {services.map((srv) => (
                  <option key={srv} value={srv}>{srv}</option>
                ))}
              </select>
            </div>

            {/* Business Size */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Target Business Size
              </label>
              <select
                value={filters.businessSize}
                onChange={(e) => {
                  onFilterChange({ ...filters, businessSize: e.target.value });
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#061227] border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-700 dark:focus:border-[#c8f526]"
              >
                <option value="">Any Company Size</option>
                {businessSizes.map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>

            {/* Verified Only Toggle */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Verified Only</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.verifiedOnly}
                  onChange={(e) => onFilterChange({ ...filters, verifiedOnly: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0c2b64] dark:peer-checked:bg-[#c8f526] dark:peer-checked:after:border-slate-900"></div>
              </label>
            </div>

          </aside>

          {/* Results Grid / List (lg:col-span-9) - Right-hand side scrolls and aligns equal with left sidebar */}
          <main 
            ref={mainRef}
            style={sidebarHeight ? { height: `${sidebarHeight}px`, maxHeight: `${sidebarHeight}px`, scrollbarWidth: 'none', msOverflowStyle: 'none' } : { scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            className="lg:col-span-9 self-start min-w-0 lg:overflow-y-auto pr-0 sm:pr-1 pb-5 scrollbar-none no-scrollbar"
          >
            {filteredPartners.length === 0 ? (
              <div className="bg-white dark:bg-[#0a1c3b] rounded-3xl border border-slate-200 dark:border-slate-800 p-12 text-center shadow-sm">
                <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-800 dark:text-[#c8f526] flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#0c2b64] dark:text-white">No partners match these criteria</h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                  Try broadening your filters or clearing location and service constraints to discover certified NextSofthr partners.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-5 px-5 py-2.5 rounded-xl bg-[#0c2b64] text-white font-bold text-xs hover:bg-blue-800 transition-colors inline-flex items-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            ) : (
              <div>
                <div className={viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
                  : 'space-y-4'
                }>
                  {paginatedPartners.map((partner) => (
                    <PartnerCard
                      key={partner.id}
                      partner={partner}
                      viewMode={viewMode}
                      onViewProfile={onViewProfile}
                      onContactPartner={onContactPartner}
                      isCompared={comparedPartnerIds.includes(partner.id)}
                      onToggleCompare={handleToggleCompare}
                    />
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="mt-10 flex items-center justify-center gap-2">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => {
                        setCurrentPage(prev => Math.max(prev - 1, 1));
                        mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-[#0a1c3b] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setCurrentPage(i + 1);
                          mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`w-9 h-9 rounded-xl text-xs font-bold transition-colors ${
                          currentPage === i + 1
                            ? 'bg-[#0c2b64] text-white shadow-sm dark:bg-[#c8f526] dark:text-[#071938]'
                            : 'bg-white dark:bg-[#0a1c3b] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}

                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => {
                        setCurrentPage(prev => Math.min(prev + 1, totalPages));
                        mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-[#0a1c3b] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            )}
          </main>

        </div>

      </div>

      {/* Mobile Filters Slide-Out Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setMobileFiltersOpen(false)}
          ></div>

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-sm bg-white dark:bg-[#0a1c3b] border-l border-slate-200 dark:border-slate-800 p-6 shadow-2xl overflow-y-auto space-y-6 text-slate-900 dark:text-slate-100">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 font-black text-base text-[#0c2b64] dark:text-white">
                  <SlidersHorizontal className="w-5 h-5 text-blue-700 dark:text-[#c8f526]" />
                  <span>Filter Registry</span>
                </div>
                <button 
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Country */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-2">
                  Country
                </label>
                <select
                  value={filters.country}
                  onChange={(e) => onFilterChange({ ...filters, country: e.target.value, city: '' })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#061227] border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100"
                >
                  <option value="">All Countries</option>
                  {COUNTRIES_DATA.map(c => (
                    <option key={c.id} value={c.name}>{c.flag} {c.name}</option>
                  ))}
                </select>
              </div>

              {/* Partner Level */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                    Partner Level & Tier
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileFiltersOpen(false);
                      setIsTierTrustOpen(true);
                    }}
                    className="text-[11px] text-blue-700 dark:text-[#c8f526] font-bold underline"
                  >
                    Tier Guide
                  </button>
                </div>
                <div className="space-y-1.5">
                  {partnerLevels.map(lvl => {
                    const getTierBadgeShort = (l: string) => {
                      if (l === 'Strategic Partner') return { label: 'Platinum', pct: '40%', emoji: '💎' };
                      if (l === 'Premium Partner') return { label: 'Gold', pct: '30%', emoji: '🥇' };
                      if (l === 'Professional Partner') return { label: 'Silver', pct: '15%', emoji: '🥈' };
                      if (l === 'Certified Partner') return { label: 'Bronze', pct: '20%', emoji: '🥉' };
                      return null;
                    };
                    const tb = getTierBadgeShort(lvl);

                    return (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => onFilterChange({
                          ...filters,
                          partnerLevel: filters.partnerLevel === lvl ? '' : lvl
                        })}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs ${
                          filters.partnerLevel === lvl
                            ? 'bg-[#c8f526]/30 dark:bg-[#c8f526]/20 text-[#0c2b64] dark:text-[#c8f526] font-bold border border-[#c8f526]'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 min-w-0">
                          {tb && <span>{tb.emoji}</span>}
                          <span className="truncate">{lvl}</span>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          {tb && (
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold">
                              {tb.pct}
                            </span>
                          )}
                          {filters.partnerLevel === lvl && <Check className="w-4 h-4 text-[#0c2b64] dark:text-[#c8f526]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Availability Status */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-2">
                  Availability Status
                </label>
                <div className="space-y-1.5">
                  {[
                    { value: '', label: 'All Availability' },
                    { value: 'Accepting New Clients', label: '🟢 Accepting New Clients' },
                    { value: 'Currently Booked', label: '⚪ Currently Booked' }
                  ].map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => onFilterChange({
                        ...filters,
                        availabilityStatus: opt.value
                      })}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs ${
                        (filters.availabilityStatus || '') === opt.value
                          ? 'bg-blue-50 dark:bg-blue-950/80 text-blue-900 dark:text-[#c8f526] font-bold border border-blue-200 dark:border-blue-800'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                      }`}
                    >
                      <span>{opt.label}</span>
                      {(filters.availabilityStatus || '') === opt.value && <Check className="w-4 h-4 text-blue-700 dark:text-[#c8f526]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Industry */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-2">
                  Industry
                </label>
                <select
                  value={filters.industry}
                  onChange={(e) => onFilterChange({ ...filters, industry: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#061227] border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100"
                >
                  <option value="">All Industries</option>
                  {industries.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>

              {/* Service */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-2">
                  Service
                </label>
                <select
                  value={filters.service}
                  onChange={(e) => onFilterChange({ ...filters, service: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#061227] border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100"
                >
                  <option value="">All Services</option>
                  {services.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>


              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                <button
                  onClick={handleResetFilters}
                  className="w-1/2 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-1/2 py-2.5 rounded-xl bg-[#0c2b64] dark:bg-[#c8f526] text-white dark:text-[#071938] text-xs font-bold shadow-md"
                >
                  Apply Filters
                </button>
              </div>

            </div>
          </div>
        </div>
      )}



      {/* Partner Category Accreditation Standards Modal */}
      <CategoryStandardsModal
        isOpen={isCategoryStandardsOpen}
        onClose={() => setIsCategoryStandardsOpen(false)}
        onSelectCategory={(category) => {
          onFilterChange({ ...filters, partnerType: category });
          setCurrentPage(1);
        }}
        activeCategory={filters.partnerType}
      />

      {/* Tier & Trust Standards Modal */}
      <TierTrustModal
        isOpen={isTierTrustOpen}
        onClose={() => setIsTierTrustOpen(false)}
        onSelectTier={(tierLevel) => {
          onFilterChange({ ...filters, partnerLevel: tierLevel });
          setCurrentPage(1);
        }}
      />

      {/* Floating Comparison Drawer */}
      <PartnerComparisonDock
        comparedPartners={comparedPartners}
        onOpenComparison={() => setIsComparisonModalOpen(true)}
        onRemovePartner={handleRemoveCompare}
        onClearAll={handleClearCompare}
      />

      {/* Side-by-Side Comparison Modal */}
      <PartnerComparisonModal
        isOpen={isComparisonModalOpen}
        onClose={() => setIsComparisonModalOpen(false)}
        comparedPartners={comparedPartners}
        allPartners={partners}
        onRemovePartner={handleRemoveCompare}
        onAddPartner={(p) => handleToggleCompare(p)}
        onClearAll={handleClearCompare}
        onViewProfile={onViewProfile}
        onContactPartner={onContactPartner}
      />
    </section>
  );
};
