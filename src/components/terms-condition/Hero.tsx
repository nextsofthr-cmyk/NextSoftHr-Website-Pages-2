import React from 'react';
import {
  FileText,
  Calendar,
  Clock,
  Printer,
  Search,
  Eye,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  SlidersHorizontal,
  Bookmark
} from 'lucide-react';
import { TERMS_LAST_UPDATED, TERMS_EFFECTIVE_DATE, TERMS_VERSION } from '../data/termsData';
import { useLanguage } from '../i18n/LanguageContext';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  summaryMode: boolean;
  onToggleSummaryMode: () => void;
  counselMode: boolean;
  onToggleCounselMode: () => void;
  totalMatches: number;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  summaryMode,
  onToggleSummaryMode,
  counselMode,
  onToggleCounselMode,
  totalMatches
}) => {
  const { t, metadata } = useLanguage();

  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-900/5 via-slate-50 to-white dark:from-blue-950/20 dark:via-[#0a0f1d] dark:to-[#070d18] pt-10 pb-12 sm:pt-14 sm:pb-16 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      {/* Background Subtle Geometric Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20 [mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_80%)]"
        aria-hidden="true"
      >
        <svg className="w-full h-full" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" className="text-slate-300 dark:text-slate-700" strokeWidth="0.7" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Breadcrumb & Metadata */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-5">
            {/* Small Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400" aria-label="Breadcrumb">
              <a href="https://www.nextsofthr.org" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {t.breadcrumbHome}
              </a>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
              <span className="text-slate-500 dark:text-slate-400">{t.breadcrumbLegal}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
              <span className="text-blue-700 dark:text-blue-400 font-semibold" aria-current="page">
                {t.breadcrumbCurrent}
              </span>
            </nav>

            {/* Main Heading */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                {t.heroTitle}
              </h1>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl font-normal leading-relaxed">
                {t.heroSubtitle}
              </p>
            </div>

            {/* Metadata Bar */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-xs text-slate-600 dark:text-slate-400">
              <div className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>{t.lastUpdated}: <strong className="text-slate-900 dark:text-slate-200 font-semibold">{metadata.lastUpdated}</strong></span>
              </div>
              <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">|</span>
              <div className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#84cc16]" />
                <span>{t.effectiveDate}: <strong className="text-slate-900 dark:text-slate-200 font-semibold">{metadata.effectiveDate}</strong></span>
              </div>
              <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">|</span>
              <div className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>{t.versionLabel}: <span className="font-mono font-medium text-slate-800 dark:text-slate-300">{metadata.version}</span></span>
              </div>
            </div>

            {/* Search and Interactive Utility Controls */}
            <div className="pt-3 max-w-2xl">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="w-full pl-10 pr-24 py-2.5 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent shadow-xs transition"
                  aria-label="Search within Terms & Conditions"
                />
                {searchQuery ? (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-1.5">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                      {totalMatches} {t.searchMatches}
                    </span>
                    <button
                      type="button"
                      onClick={() => onSearchChange('')}
                      className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs px-1 cursor-pointer"
                    >
                      {t.searchClear}
                    </button>
                  </div>
                ) : (
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-xs text-slate-400 dark:text-slate-500">
                    <span className="font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-[10px] text-slate-600 dark:text-slate-400 ml-1 border border-slate-200 dark:border-slate-700">
                      {t.searchPressCmdK}
                    </span>
                  </div>
                )}
              </div>

              {/* Utility Toggles */}
              <div className="flex flex-wrap items-center gap-2.5 mt-3 text-xs">
                {/* Plain-English Executive Summary Mode */}
                <button
                  type="button"
                  onClick={onToggleSummaryMode}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                    summaryMode
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                  title="Toggle plain-English executive summaries alongside legal clauses"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{t.toggleSummary} ({summaryMode ? t.toggleSummaryActive : t.toggleSummaryOff})</span>
                </button>

                {/* Legal Counsel Review Mode */}
                <button
                  type="button"
                  onClick={onToggleCounselMode}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                    counselMode
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                  title="Highlight jurisdiction placeholders and configurable clauses for legal audit"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>{t.toggleCounsel} ({counselMode ? t.toggleCounselOn : t.toggleCounselOff})</span>
                </button>

                {/* Print / Save PDF */}
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Print clean legal document or save to PDF"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                  <span>{t.printPdf}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Subtle Professional Abstract SaaS/HR Visual */}
          <div className="lg:col-span-5 xl:col-span-4 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              
              {/* Outer decorative ambient glows in Brand Blue & Lemon Green */}
              <div className="absolute -top-6 -left-6 w-44 h-44 bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-6 -right-6 w-44 h-44 bg-[#84cc16]/15 dark:bg-[#84cc16]/20 rounded-full blur-2xl pointer-events-none" />

              {/* Central Geometric Secure Digital Business Card */}
              <div className="relative bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-lg shadow-blue-900/5 dark:shadow-slate-950/40 transition-colors">
                
                {/* Header of Visual */}
                <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/70 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">{t.trustCenterTitle}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">{t.trustCenterSubtitle}</div>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#65a30d] dark:text-[#a3e635] bg-lime-50 dark:bg-lime-950/40 px-2 py-0.5 rounded-md border border-lime-200 dark:border-lime-800/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#84cc16] animate-pulse" />
                    {t.verifiedBadge}
                  </span>
                </div>

                {/* Abstract Geometric SVG Diagram */}
                <svg
                  viewBox="0 0 320 180"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-auto rounded-lg bg-slate-50/70 dark:bg-slate-950/80 border border-slate-100 dark:border-slate-800 p-2"
                >
                  {/* Subtle Node Connectors */}
                  <path d="M 60 40 L 160 90 L 260 40" stroke="#93c5fd" className="dark:opacity-40" strokeWidth="1.5" strokeDasharray="3 3" />
                  <path d="M 160 90 L 160 150" stroke="#84cc16" strokeWidth="1.5" strokeDasharray="3 3" />
                  <path d="M 60 140 L 160 150 L 260 140" stroke="#bfdbfe" className="dark:opacity-30" strokeWidth="1.5" />

                  {/* Node 1: HR & Workforce */}
                  <g transform="translate(40, 20)">
                    <rect width="40" height="40" rx="8" fill="#1d4ed8" />
                    <circle cx="20" cy="16" r="5" fill="#ffffff" />
                    <path d="M12 28 C12 23 15 22 20 22 C25 22 28 23 28 28" fill="#ffffff" />
                  </g>
                  <text x="60" y="70" textAnchor="middle" fill="currentColor" className="text-slate-700 dark:text-slate-300" fontSize="9" fontWeight="600">HR Core</text>

                  {/* Node 2: Global Payroll & Calculation */}
                  <g transform="translate(240, 20)">
                    <rect width="40" height="40" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1" />
                    <circle cx="20" cy="20" r="10" stroke="#84cc16" strokeWidth="2.5" />
                    <path d="M 20 15 L 20 25 M 17 18 L 23 18 M 17 22 L 23 22" stroke="#84cc16" strokeWidth="1.5" strokeLinecap="round" />
                  </g>
                  <text x="260" y="70" textAnchor="middle" fill="currentColor" className="text-slate-700 dark:text-slate-300" fontSize="9" fontWeight="600">Payroll</text>

                  {/* Central Node: NextSoftHR Enterprise Core */}
                  <g transform="translate(135, 65)">
                    <rect width="50" height="50" rx="12" fill="#1e40af" stroke="#84cc16" strokeWidth="2" />
                    <circle cx="25" cy="25" r="14" fill="#ffffff" />
                    <path d="M 19 25 L 23 29 L 31 20" stroke="#1d4ed8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                  <text x="160" y="126" textAnchor="middle" fill="currentColor" className="text-slate-900 dark:text-white" fontSize="10" fontWeight="700">NextSoftHR</text>

                  {/* Node 3: Compliance & Security */}
                  <g transform="translate(40, 120)">
                    <rect width="40" height="40" rx="8" fill="#f1f5f9" className="dark:fill-slate-800 dark:stroke-slate-700" stroke="#cbd5e1" strokeWidth="1" />
                    <path d="M 20 13 L 29 17 V 23 C 29 28 20 31 20 31 C 20 31 11 28 11 23 V 17 Z" fill="#1d4ed8" />
                  </g>
                  <text x="60" y="170" textAnchor="middle" fill="currentColor" className="text-slate-700 dark:text-slate-300" fontSize="9" fontWeight="600">Security</text>

                  {/* Node 4: Business & CRM */}
                  <g transform="translate(240, 120)">
                    <rect width="40" height="40" rx="8" fill="#f1f5f9" className="dark:fill-slate-800 dark:stroke-slate-700" stroke="#cbd5e1" strokeWidth="1" />
                    <rect x="14" y="14" width="12" height="12" rx="2" fill="#84cc16" />
                    <circle cx="26" cy="26" r="3" fill="#1d4ed8" />
                  </g>
                  <text x="260" y="170" textAnchor="middle" fill="currentColor" className="text-slate-700 dark:text-slate-300" fontSize="9" fontWeight="600">Operations</text>
                </svg>

                {/* Key Pillars Highlights */}
                <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px]">
                  <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#65a30d] dark:text-[#84cc16] shrink-0" />
                    <span>{t.pillarDataOwnership}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#65a30d] dark:text-[#84cc16] shrink-0" />
                    <span>{t.pillarSecurity}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#65a30d] dark:text-[#84cc16] shrink-0" />
                    <span>{t.pillarPrivacy}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#65a30d] dark:text-[#84cc16] shrink-0" />
                    <span>{t.pillarSubscriptions}</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
