import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronRight, 
  ChevronDown, 
  CreditCard, 
  Users, 
  Briefcase, 
  Sparkles, 
  Layers, 
  Building2, 
  Home, 
  Check, 
  Compass,
  ArrowUpRight,
  TrendingUp,
  Clock,
  CalendarCheck,
  Globe2
} from 'lucide-react';
import { NavigationPage } from '../../types';

export interface OutsourcingSubHeaderProps {
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
  onOpenLeadModal?: (service?: string) => void;
}

export const SIX_CORE_SOLUTIONS: {
  id: NavigationPage;
  title: string;
  shortTitle: string;
  icon: React.ComponentType<{ className?: string }>;
  tagline: string;
}[] = [
  {
    id: 'outsourcing-payroll',
    title: 'Payroll Outsourcing',
    shortTitle: 'Payroll',
    icon: CreditCard,
    tagline: 'Gross-to-net calculations, tax PAYE, statutory deductions & digital payslips'
  },
  {
    id: 'outsourcing-hr-admin',
    title: 'HR Administration Outsourcing',
    shortTitle: 'HR Admin',
    icon: Users,
    tagline: 'Personnel records, onboarding, official letters & policy workflows'
  },
  {
    id: 'outsourcing-managed-hr',
    title: 'Managed HR Services',
    shortTitle: 'Managed HR',
    icon: Briefcase,
    tagline: 'Dedicated HR business partners, employee relations & strategic steering'
  },
  {
    id: 'outsourcing-recruitment',
    title: 'Recruitment & Talent Outsourcing',
    shortTitle: 'Recruitment',
    icon: Sparkles,
    tagline: 'End-to-end talent sourcing, ATS pipeline tracking & AI recruiter tools'
  },
  {
    id: 'outsourcing-employee-admin',
    title: 'Employee Administration',
    shortTitle: 'Employee Admin',
    icon: Layers,
    tagline: 'Centralized master profiles, verified records, contracts & credentials'
  },
  {
    id: 'multi-company',
    title: 'Enterprise Workforce Management',
    shortTitle: 'Enterprise Hierarchy',
    icon: Building2,
    tagline: 'Multi-entity corporate governance, regional branches & consolidated reporting'
  },
  {
    id: 'analytics',
    title: 'Analytics & Reporting',
    shortTitle: 'Analytics',
    icon: TrendingUp,
    tagline: 'Labor spending visibility, turnover risk & real-time consolidated analytics'
  },
  {
    id: 'outsourcing-time-attendance',
    title: 'Time & Attendance',
    shortTitle: 'Time & Attendance',
    icon: Clock,
    tagline: 'Automate clock-in, eliminate buddy punching and manual registers'
  },
  {
    id: 'outsourcing-leave',
    title: 'Leave & Time-Off Mgt.',
    shortTitle: 'Leave & Time-Off',
    icon: CalendarCheck,
    tagline: 'Simplify leave requests, approval calendars and eliminate disputes'
  },
  {
    id: 'multi-country',
    title: 'Multi-Country African Payroll',
    shortTitle: 'Multi-Country',
    icon: Globe2,
    tagline: 'Run multi-entity, multi-currency payroll & tax compliance across Africa'
  }
];

export const PAGE_TITLES: Record<string, string> = {
  'home': 'Outsourcing Overview',
  'outsourcing-hub': 'All Outsourcing Solutions Hub',
  'outsourcing-payroll': 'Payroll Outsourcing',
  'outsourcing-hr-admin': 'HR Administration Outsourcing',
  'outsourcing-managed-hr': 'Managed HR Services',
  'outsourcing-recruitment': 'Recruitment & Talent Outsourcing',
  'outsourcing-employee-admin': 'Employee Administration',
  'outsourcing-time-attendance': 'Time & Attendance Outsourcing',
  'outsourcing-leave': 'Leave Management Outsourcing',
  'compliance': 'African Compliance Center',
  'multi-country': 'Multi-Country Payroll',
  'multi-company': 'Enterprise Workforce Management',
  'packages': 'Outsourcing Service Packages',
  'calculator': 'Outsourcing ROI Calculator',
  'implementation': 'Implementation Timeline',
  'migration': 'Data Migration Center',
  'integrations': 'Integrations Directory',
  'security': 'Security & Data Protection',
  'analytics': 'Workforce Analytics & Reporting',
  'partners': 'Outsourcing Partners Program',
  'contact': 'Support Desk & Consultation'
};

export const OutsourcingSubHeader: React.FC<OutsourcingSubHeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenLeadModal
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentTitle = PAGE_TITLES[currentPage] || 'Outsourcing Solution';
  const isCoreSolution = SIX_CORE_SOLUTIONS.some(s => s.id === currentPage);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="sticky top-0 z-30 bg-white/95 dark:bg-[#07132F]/95 backdrop-blur-md border-b border-slate-200/90 dark:border-blue-900/60 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-3">
        {/* Left: Breadcrumbs navigation */}
        <div className="flex items-center gap-2 min-w-0">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 sm:gap-2 text-xs text-slate-500 dark:text-slate-400 min-w-0 overflow-x-auto no-scrollbar py-0.5">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-[#0F2D6B] dark:hover:text-lime-400 font-semibold transition-colors flex items-center gap-1 shrink-0 text-slate-700 dark:text-slate-300 hover:underline cursor-pointer"
              title="Return to Main Outsourcing Overview"
            >
              <Home className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
              <span>Outsourcing</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            
            {isCoreSolution ? (
              <>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#0F2D6B] dark:hover:text-lime-400 font-medium transition-colors shrink-0 hover:underline cursor-pointer"
                  title="View Six Core Solutions"
                >
                  Six Core Solutions
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </>
            ) : (
              <>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#0F2D6B] dark:hover:text-lime-400 font-medium transition-colors shrink-0 hover:underline cursor-pointer"
                >
                  Services
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </>
            )}

            <span className="font-bold text-slate-900 dark:text-white truncate">
              {currentTitle}
            </span>
          </nav>
        </div>

        {/* Right: Solutions Switcher Dropdown & Lead CTA */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Six Core Solutions Dropdown Switcher */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-blue-950/70 dark:hover:bg-blue-900/60 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-blue-900/50 text-xs font-semibold transition-all cursor-pointer"
              aria-expanded={dropdownOpen}
              title="Switch between the Six Core Outsourcing Solutions"
            >
              <Compass className="w-3.5 h-3.5 text-[#0F2D6B] dark:text-lime-400 shrink-0" />
              <span className="hidden sm:inline">Six Core Solutions</span>
              <span className="sm:hidden">Solutions</span>
              <ChevronDown className={`w-3 h-3 text-slate-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white dark:bg-[#0B1A3D] rounded-2xl shadow-2xl border border-slate-200 dark:border-blue-900/60 py-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3.5 py-2 border-b border-slate-100 dark:border-blue-900/40 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Six Core Outsourcing Solutions
                  </span>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      onNavigate('home');
                    }}
                    className="text-[11px] font-bold text-blue-600 dark:text-lime-400 hover:underline cursor-pointer"
                  >
                    Main Overview
                  </button>
                </div>

                <div className="py-1">
                  {SIX_CORE_SOLUTIONS.map((solution) => {
                    const isActive = currentPage === solution.id;
                    const IconComponent = solution.icon;
                    return (
                      <button
                        key={solution.id}
                        onClick={() => {
                          setDropdownOpen(false);
                          onNavigate(solution.id);
                        }}
                        className={`w-full px-3.5 py-2 text-left flex items-start gap-3 transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-blue-50 dark:bg-blue-950/80 text-[#0F2D6B] dark:text-lime-400'
                            : 'hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-200'
                        }`}
                      >
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                          isActive 
                            ? 'bg-[#0F2D6B] dark:bg-lime-400 text-lime-400 dark:text-slate-950'
                            : 'bg-slate-100 dark:bg-blue-900/40 text-slate-600 dark:text-slate-300'
                        }`}>
                          <IconComponent className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold leading-tight truncate">
                              {solution.title}
                            </span>
                            {isActive && <Check className="w-3 h-3 text-blue-600 dark:text-lime-400 shrink-0 ml-1" />}
                          </div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                            {solution.tagline}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="px-3.5 pt-2 mt-1 border-t border-slate-100 dark:border-blue-900/40 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      onNavigate('outsourcing-hub');
                    }}
                    className="text-[11px] font-bold text-slate-700 dark:text-slate-300 hover:text-[#0F2D6B] dark:hover:text-lime-400 flex items-center gap-1 cursor-pointer"
                  >
                    <span>View All Services Hub</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>

                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      onNavigate('home');
                    }}
                    className="text-[11px] font-bold text-[#0F2D6B] dark:text-lime-400 hover:underline cursor-pointer"
                  >
                    ← Back to Home
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Consultation CTA Button */}
          {onOpenLeadModal && (
            <button
              onClick={() => onOpenLeadModal(currentTitle)}
              className="hidden lg:inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-lime-400 hover:bg-lime-300 text-slate-950 text-xs font-bold transition-all shadow-2xs hover:shadow-sm cursor-pointer shrink-0"
            >
              <span>Get Proposal</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
