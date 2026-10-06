import React from 'react';
import {
  ShieldCheck,
  Lock,
  Search,
  Printer,
  SlidersHorizontal,
  ChevronRight,
  Database,
  Users,
  Globe2,
  Calendar,
  Sparkles,
  FileCheck
} from 'lucide-react';
import { Translations } from '../translations';

interface HeroProps {
  lastUpdatedDate: string;
  version: string;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenCookiesModal: () => void;
  onOpenPrivacyModal: () => void;
  onOpenAdminModal: () => void;
  t: Translations;
}

export const Hero: React.FC<HeroProps> = ({
  lastUpdatedDate,
  version,
  searchQuery,
  onSearchChange,
  onOpenCookiesModal,
  onOpenPrivacyModal,
  onOpenAdminModal,
  t,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F0F6FF] via-[#F8FAFC] to-[#F8FAFC] dark:from-[#080d19] dark:via-[#090e1a] dark:to-[#090e1a] border-b border-slate-200/70 dark:border-slate-800/80 pt-10 pb-12 sm:pt-14 sm:pb-16 transition-colors duration-200">
      {/* Background architectural accents */}
      <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20">
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#0F52BA]/10 dark:bg-[#0F52BA]/20 blur-3xl" />
        <div className="absolute top-12 right-10 w-72 h-72 rounded-full bg-[#84CC16]/15 dark:bg-[#84CC16]/10 blur-3xl" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(rgba(15, 82, 186, 0.08) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center text-xs font-medium text-slate-500 dark:text-slate-400">
          <a
            href="https://www.nextsofthr.org"
            className="hover:text-[#0F52BA] dark:hover:text-[#60A5FA] transition-colors"
          >
            Home
          </a>
          <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-slate-400 dark:text-slate-600" />
          <span className="text-[#0F52BA] dark:text-[#60A5FA] font-semibold">{t.hero.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading, Supporting text, Metadata & Actions */}
          <div className="lg:col-span-7">
            {/* Security Brand Icon & Micro Badge */}
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-white dark:bg-[#0c1527] border border-blue-100 dark:border-slate-800 shadow-2xs text-xs font-medium text-slate-700 dark:text-slate-300">
              <span className="flex h-2 w-2 rounded-full bg-[#84CC16]" />
              <ShieldCheck className="w-3.5 h-3.5 text-[#0F52BA] dark:text-[#60A5FA]" />
              <span>{t.hero.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              {t.hero.title}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              {t.hero.subtitle}
            </p>

            {/* Last Updated & Version Metadata */}
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-1.5 bg-white/90 dark:bg-[#0c1527]/90 px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-800">
                <Calendar className="w-3.5 h-3.5 text-[#0F52BA] dark:text-[#60A5FA]" />
                <span>
                  {t.hero.lastUpdated}{' '}
                  <strong className="text-slate-900 dark:text-white font-semibold">{lastUpdatedDate}</strong>
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/90 dark:bg-[#0c1527]/90 px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-800">
                <FileCheck className="w-3.5 h-3.5 text-[#84CC16]" />
                <span className="font-medium text-slate-700 dark:text-slate-300">{version}</span>
              </div>
              <button
                onClick={onOpenAdminModal}
                className="text-xs text-slate-500 hover:text-[#0F52BA] dark:text-slate-400 dark:hover:text-[#60A5FA] underline underline-offset-2 transition-colors cursor-pointer"
                title="Edit date and legal parameters"
              >
                {t.hero.updateNotice}
              </button>
            </div>

            {/* Real-Time Policy Search Input */}
            <div className="mt-7 max-w-xl">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder={t.hero.searchPlaceholder}
                  className="w-full pl-10 pr-24 py-2.5 bg-white dark:bg-[#0c1527] border border-slate-300 dark:border-slate-800 focus:border-[#0F52BA] dark:focus:border-[#60A5FA] focus:ring-2 focus:ring-[#0F52BA]/20 rounded-lg text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-2xs outline-none transition-all"
                  aria-label="Search within privacy policy"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="absolute right-2 px-2 py-1 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded"
                  >
                    {t.hero.clear}
                  </button>
                )}
              </div>
            </div>

            {/* Quick Action Toolbar */}
            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <button
                onClick={onOpenCookiesModal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-[#0c1527] hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-md shadow-2xs transition-colors"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#0F52BA] dark:text-[#60A5FA]" />
                <span>{t.hero.cookiePrefs}</span>
              </button>
              <button
                onClick={onOpenPrivacyModal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#0F52BA] dark:text-[#93C5FD] bg-blue-50/80 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/50 border border-blue-200/60 dark:border-blue-900/50 rounded-md shadow-2xs transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#84CC16]" />
                <span>{t.hero.requestAssistance}</span>
              </button>
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-[#0c1527] hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-md shadow-2xs transition-colors"
                title="Print or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                <span>{t.hero.printPdf}</span>
              </button>
            </div>
          </div>

          {/* Right Column: High-Aesthetic SaaS Security & Data Privacy Illustration */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-white/90 dark:bg-[#0c1527]/90 backdrop-blur-sm border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 shadow-sm relative overflow-hidden transition-colors">
              {/* Top Accent Gradient Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0F52BA] via-[#2563EB] to-[#84CC16]" />

              {/* Header inside visual card */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-md bg-[#0F52BA] flex items-center justify-center text-white">
                    <Lock className="w-3.5 h-3.5 text-[#84CC16]" />
                  </div>
                  <div>
                    <h2 className="text-xs font-bold text-slate-900 dark:text-white leading-none">
                      {t.hero.governanceCore}
                    </h2>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">{t.hero.globalArch}</span>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-[#15803D] dark:text-[#4ade80] bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/60">
                  {t.hero.activeShield}
                </span>
              </div>

              {/* Graphic Flow Layout */}
              <div className="py-5 space-y-3">
                {/* Flow Node 1: Workforce & Payroll */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-[#080d19] border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <Users className="w-4 h-4 text-[#0F52BA] dark:text-[#60A5FA]" />
                    <div>
                      <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                        {t.hero.workforceIdentity}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        {t.hero.workforceSub}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-white dark:bg-[#0c1527] px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800">
                    RBAC Tier 1
                  </span>
                </div>

                {/* Encryption Bridge visual */}
                <div className="flex items-center justify-center -my-1 text-slate-400">
                  <div className="flex items-center gap-1 text-[10px] font-mono text-[#0F52BA] dark:text-[#60A5FA]">
                    <span className="h-2 w-0.5 bg-[#0F52BA] dark:bg-[#60A5FA]" />
                    <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-950/40 rounded text-slate-600 dark:text-slate-300 font-sans text-[10px]">
                      {t.hero.encryptionBridge}
                    </span>
                    <span className="h-2 w-0.5 bg-[#84CC16]" />
                  </div>
                </div>

                {/* Flow Node 2: Multi-Tenant Cloud Infrastructure */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50/40 dark:bg-blue-950/20 border border-blue-100/80 dark:border-blue-900/40">
                  <div className="flex items-center gap-2.5">
                    <Database className="w-4 h-4 text-[#0F52BA] dark:text-[#60A5FA]" />
                    <div>
                      <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                        {t.hero.cloudVault}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        {t.hero.cloudVaultSub}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-[#0F52BA] dark:text-[#60A5FA] bg-white dark:bg-[#0c1527] px-2 py-0.5 rounded border border-blue-200 dark:border-blue-900/60">
                    Encrypted
                  </span>
                </div>

                {/* Flow Node 3: AI & Privacy Engine */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#84CC16]/10 dark:bg-[#84CC16]/5 border border-[#84CC16]/30 dark:border-[#84CC16]/20">
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-[#4D7C0F] dark:text-[#84CC16]" />
                    <div>
                      <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                        {t.hero.aiEngine}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        {t.hero.aiEngineSub}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-[#3F6212] dark:text-[#84CC16] bg-white dark:bg-[#0c1527] px-2 py-0.5 rounded border border-[#84CC16]/40 dark:border-[#84CC16]/30">
                    {t.hero.governedBadge}
                  </span>
                </div>
              </div>

              {/* Bottom footer strip inside card */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <Globe2 className="w-3 h-3 text-slate-400" />
                  <span>{t.hero.footerRegion}</span>
                </span>
                <span className="text-[#0F52BA] dark:text-[#60A5FA] font-semibold">{t.hero.structuredArticles}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
