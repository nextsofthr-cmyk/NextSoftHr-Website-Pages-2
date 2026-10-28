import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Building2,
  Server,
  AlertTriangle,
  UserCheck,
  Clock,
  Sparkles,
  SlidersHorizontal,
  CheckCircle,
  ArrowRight,
  History,
  FileSpreadsheet
} from 'lucide-react';
import { VERSION_HISTORY } from '../data/privacyContent';
import { PrivacyRequestForm } from './PrivacyRequestForm';
import { Translations } from '../translations';

interface PolicyContentProps {
  lastUpdatedDate: string;
  version: string;
  searchQuery: string;
  onOpenCookiesModal: () => void;
  onOpenPrivacyModal: () => void;
  t: Translations;
}

export const PolicyContent: React.FC<PolicyContentProps> = ({
  lastUpdatedDate,
  version,
  searchQuery,
  onOpenCookiesModal,
  onOpenPrivacyModal,
  t,
}) => {
  const [activeCategoryTab, setActiveCategoryTab] = useState(0);
  const [marketingEmail, setMarketingEmail] = useState('');
  const [optOutSuccess, setOptOutSuccess] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);

  // Helper to highlight matching text if searchQuery exists
  const highlightText = (text: string) => {
    if (!searchQuery.trim()) return text;
    const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === searchQuery.toLowerCase() ? (
        <mark key={i} className="bg-yellow-200 dark:bg-yellow-500/40 text-slate-900 dark:text-yellow-100 px-0.5 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const handleMarketingOptOut = (e: React.FormEvent) => {
    e.preventDefault();
    if (marketingEmail && marketingEmail.includes('@')) {
      setOptOutSuccess(true);
      setTimeout(() => {
        setOptOutSuccess(false);
        setMarketingEmail('');
      }, 4000);
    }
  };

  const currentCategory =
    t.policy.sec2.categories[activeCategoryTab] || t.policy.sec2.categories[0];

  return (
    <article className="space-y-12 sm:space-y-16 text-slate-700 dark:text-slate-300 leading-relaxed transition-colors duration-200">
      {/* SECTION 1: INTRODUCTION */}
      <section id="introduction" className="scroll-mt-28">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#0F52BA] dark:text-[#60A5FA] mb-1">
          <span>01</span>
          <span className="w-4 h-px bg-[#0F52BA]/40 dark:bg-[#60A5FA]/40" />
          <span>{t.policy.sec1.tag}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          {t.policy.sec1.title}
        </h2>

        <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300">
          <p>{highlightText(t.policy.sec1.p1)}</p>
          <p>{highlightText(t.policy.sec1.p2)}</p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
            {t.policy.sec1.scopes.map((scopeItem, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 bg-slate-50/80 dark:bg-[#080d19] p-2.5 rounded-lg border border-slate-200/70 dark:border-slate-800"
              >
                <CheckCircle className="w-4 h-4 text-[#84CC16] shrink-0 mt-0.5" />
                <span>{highlightText(scopeItem)}</span>
              </li>
            ))}
          </ul>

          <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/40 mt-4">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wide mb-1 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-[#0F52BA] dark:text-[#60A5FA]" />
              <span>{t.policy.sec1.boxTitle}</span>
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              {highlightText(t.policy.sec1.boxDesc)}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: INFORMATION WE COLLECT */}
      <section id="information-we-collect" className="scroll-mt-28">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#0F52BA] dark:text-[#60A5FA] mb-1">
          <span>02</span>
          <span className="w-4 h-px bg-[#0F52BA]/40 dark:bg-[#60A5FA]/40" />
          <span>{t.policy.sec2.tag}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          {t.policy.sec2.title}
        </h2>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-6">
          {highlightText(t.policy.sec2.intro)}
        </p>

        {/* Category Tabs for Scannability */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 dark:bg-[#080d19] rounded-lg mb-6">
          {t.policy.sec2.categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategoryTab(idx)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                activeCategoryTab === idx
                  ? 'bg-white dark:bg-[#0c1527] text-slate-900 dark:text-white shadow-2xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Category Detail Card */}
        <div className="bg-white dark:bg-[#0c1527] rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xs transition-colors">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0F52BA] dark:text-[#60A5FA] uppercase tracking-wider mb-1">
                <span>
                  {t.policy.sec2.categoryOf} {activeCategoryTab + 1} /{' '}
                  {t.policy.sec2.categories.length}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {currentCategory.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {currentCategory.desc}
              </p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-[#0F52BA] dark:text-[#60A5FA] flex items-center justify-center shrink-0">
              <Server className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200 mb-3">
              {t.policy.sec2.processedElements}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
              {currentCategory.items.map((item, i) => (
                <div key={i} className="flex items-start gap-2 p-2 rounded-md bg-slate-50 dark:bg-[#080d19]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#84CC16] mt-1.5 shrink-0" />
                  <span>{highlightText(item)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
          <FileSpreadsheet className="w-4 h-4 text-slate-400 dark:text-slate-500" />
          <span>{t.policy.sec2.adminNotice}</span>
        </div>
      </section>

      {/* SECTION 3: HOW WE USE YOUR INFORMATION */}
      <section id="how-we-use-information" className="scroll-mt-28">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#0F52BA] dark:text-[#60A5FA] mb-1">
          <span>03</span>
          <span className="w-4 h-px bg-[#0F52BA]/40 dark:bg-[#60A5FA]/40" />
          <span>{t.policy.sec3.tag}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          {t.policy.sec3.title}
        </h2>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-6">
          {highlightText(t.policy.sec3.intro)}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs sm:text-sm">
          {t.policy.sec3.purposes.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-lg border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0c1527] hover:border-blue-200 dark:hover:border-blue-900 transition-colors"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono font-bold text-[#0F52BA] dark:text-[#60A5FA] bg-blue-50 dark:bg-blue-950/60 px-1.5 py-0.5 rounded">
                  {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                </span>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">{item.title}</h4>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal pl-6">
                {highlightText(item.desc)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: COOKIES AND TRACKING TECHNOLOGIES */}
      <section id="cookies-tracking" className="scroll-mt-28">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#0F52BA] dark:text-[#60A5FA] mb-1">
          <span>04</span>
          <span className="w-4 h-px bg-[#0F52BA]/40 dark:bg-[#60A5FA]/40" />
          <span>{t.policy.sec4.tag}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          {t.policy.sec4.title}
        </h2>

        <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300">
          <p>{highlightText(t.policy.sec4.intro)}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2 text-xs">
            {t.policy.sec4.types.map((type, i) => (
              <div key={i} className="p-3.5 rounded-lg bg-slate-50 dark:bg-[#0c1527] border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">{type.title}</span>
                <p className="text-slate-500 dark:text-slate-400">{type.desc}</p>
              </div>
            ))}
            <div className="p-3.5 rounded-lg bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 flex flex-col justify-between">
              <div>
                <span className="font-bold text-[#0F52BA] dark:text-[#60A5FA] block mb-1">
                  {t.policy.sec4.manageTitle}
                </span>
                <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                  {t.policy.sec4.manageDesc}
                </p>
              </div>
              <button
                onClick={onOpenCookiesModal}
                className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0F52BA] text-white text-xs font-semibold rounded-md shadow-2xs hover:bg-[#0A3982] transition-colors cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>{t.policy.sec4.button}</span>
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 pt-2">
            {t.policy.sec4.browserNote}
          </p>
        </div>
      </section>

      {/* SECTION 5: DATA SHARING AND DISCLOSURE */}
      <section id="data-sharing" className="scroll-mt-28">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#0F52BA] dark:text-[#60A5FA] mb-1">
          <span>05</span>
          <span className="w-4 h-px bg-[#0F52BA]/40 dark:bg-[#60A5FA]/40" />
          <span>{t.policy.sec5.tag}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          {t.policy.sec5.title}
        </h2>

        <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300">
          <p>{highlightText(t.policy.sec5.intro)}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            {t.policy.sec5.entities.map((entity, i) => (
              <div key={i} className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1527]">
                <span className="font-bold text-slate-900 dark:text-white text-xs block mb-1">
                  {entity.title}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 leading-normal block">
                  {highlightText(entity.desc)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: DATA STORAGE AND SECURITY */}
      <section id="data-storage-security" className="scroll-mt-28">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#0F52BA] dark:text-[#60A5FA] mb-1">
          <span>06</span>
          <span className="w-4 h-px bg-[#0F52BA]/40 dark:bg-[#60A5FA]/40" />
          <span>{t.policy.sec6.tag}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          {t.policy.sec6.title}
        </h2>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-6">
          {highlightText(t.policy.sec6.intro)}
        </p>

        {/* 5 Security Pillars */}
        <div className="space-y-3">
          {t.policy.sec6.pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1527] shadow-2xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-md bg-blue-50 dark:bg-blue-950/60 text-[#0F52BA] dark:text-[#60A5FA] flex items-center justify-center font-bold text-xs">
                    0{idx + 1}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">{pillar.title}</h3>
                </div>
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  {t.policy.sec6.standardTag} {idx + 1}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">{pillar.summary}</p>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                {pillar.details.map((detail, dIdx) => (
                  <li key={dIdx} className="flex items-start gap-1.5 bg-slate-50 dark:bg-[#080d19] p-2 rounded">
                    <CheckCircle className="w-3.5 h-3.5 text-[#84CC16] shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3.5 bg-slate-50 dark:bg-[#080d19] border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-500 dark:text-slate-400">
          {t.policy.sec6.userResponsibility}
        </div>
      </section>

      {/* SECTION 7: DATA RETENTION */}
      <section id="data-retention" className="scroll-mt-28">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#0F52BA] dark:text-[#60A5FA] mb-1">
          <span>07</span>
          <span className="w-4 h-px bg-[#0F52BA]/40 dark:bg-[#60A5FA]/40" />
          <span>{t.policy.sec7.tag}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          {t.policy.sec7.title}
        </h2>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-6">
          {highlightText(t.policy.sec7.intro)}
        </p>

        {/* Structured Retention Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1527] shadow-2xs">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-[#080d19] border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                <th className="py-3 px-4 font-bold">{t.policy.sec7.table.thCategory}</th>
                <th className="py-3 px-4 font-bold">{t.policy.sec7.table.thPurpose}</th>
                <th className="py-3 px-4 font-bold">{t.policy.sec7.table.thRetention}</th>
                <th className="py-3 px-4 font-bold">{t.policy.sec7.table.thRationale}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-slate-600 dark:text-slate-300">
              {t.policy.sec7.rules.map((rule, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-[#0e192e] transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">{rule.category}</td>
                  <td className="py-3 px-4">{rule.purpose}</td>
                  <td className="py-3 px-4 font-mono text-[11px] text-[#0F52BA] dark:text-[#60A5FA]">
                    {rule.retentionPeriod}
                  </td>
                  <td className="py-3 px-4 text-slate-500 dark:text-slate-400">{rule.statutoryBasis}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
          {t.policy.sec7.expirationNote}
        </p>
      </section>

      {/* SECTION 8: YOUR PRIVACY RIGHTS */}
      <section id="your-privacy-rights" className="scroll-mt-28">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#0F52BA] dark:text-[#60A5FA] mb-1">
          <span>08</span>
          <span className="w-4 h-px bg-[#0F52BA]/40 dark:bg-[#60A5FA]/40" />
          <span>{t.policy.sec8.tag}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          {t.policy.sec8.title}
        </h2>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-6">
          {highlightText(t.policy.sec8.intro)}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {t.policy.sec8.rights.map((right, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1527] hover:border-[#84CC16] dark:hover:border-[#84CC16] transition-colors"
            >
              <span className="font-bold text-slate-900 dark:text-white block mb-1 text-xs">
                {right.name}
              </span>
              <p className="text-slate-500 dark:text-slate-400 leading-normal text-[11px]">{right.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA Box */}
        <div className="mt-6 p-5 rounded-xl bg-gradient-to-r from-blue-50 to-slate-50 dark:from-blue-950/30 dark:to-[#0c1527] border border-blue-200/80 dark:border-blue-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              {t.policy.sec8.ctaTitle}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              {t.policy.sec8.ctaDesc}
            </p>
          </div>
          <button
            onClick={onOpenPrivacyModal}
            className="px-4 py-2.5 bg-[#0F52BA] hover:bg-[#0A3982] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <span>{t.policy.sec8.ctaButton}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* SECTION 9: EMPLOYEE AND CUSTOMER DATA */}
      <section id="employee-customer-data" className="scroll-mt-28">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#0F52BA] dark:text-[#60A5FA] mb-1">
          <span>09</span>
          <span className="w-4 h-px bg-[#0F52BA]/40 dark:bg-[#60A5FA]/40" />
          <span>{t.policy.sec9.tag}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          {t.policy.sec9.title}
        </h2>

        <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300">
          <p>{highlightText(t.policy.sec9.intro)}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-white dark:bg-[#0c1527] border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-2 text-[#0F52BA] dark:text-[#60A5FA] font-bold text-sm">
                <Building2 className="w-5 h-5" />
                <span>{t.policy.sec9.processorTitle}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.policy.sec9.processorDesc}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-[#0c1527] border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-2 text-[#15803D] dark:text-[#4ade80] font-bold text-sm">
                <UserCheck className="w-5 h-5" />
                <span>{t.policy.sec9.controllerTitle}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.policy.sec9.controllerDesc}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong>{t.policy.sec9.employeeNoticeTitle}</strong> {t.policy.sec9.employeeNoticeDesc}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10: INTERNATIONAL DATA TRANSFERS */}
      <section id="international-transfers" className="scroll-mt-28">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#0F52BA] dark:text-[#60A5FA] mb-1">
          <span>10</span>
          <span className="w-4 h-px bg-[#0F52BA]/40 dark:bg-[#60A5FA]/40" />
          <span>{t.policy.sec10.tag}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          {t.policy.sec10.title}
        </h2>

        <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300">
          <p>{highlightText(t.policy.sec10.intro)}</p>
          <p>{highlightText(t.policy.sec10.p2)}</p>

          <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
            {t.policy.sec10.safeguards.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#84CC16] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SECTION 11: THIRD-PARTY SERVICES */}
      <section id="third-party-services" className="scroll-mt-28">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#0F52BA] dark:text-[#60A5FA] mb-1">
          <span>11</span>
          <span className="w-4 h-px bg-[#0F52BA]/40 dark:bg-[#60A5FA]/40" />
          <span>{t.policy.sec11.tag}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          {t.policy.sec11.title}
        </h2>

        <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300">
          <p>{highlightText(t.policy.sec11.intro)}</p>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {t.policy.sec11.p2}
          </p>
        </div>
      </section>

      {/* SECTION 12: CHILDREN'S PRIVACY */}
      <section id="childrens-privacy" className="scroll-mt-28">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#0F52BA] dark:text-[#60A5FA] mb-1">
          <span>12</span>
          <span className="w-4 h-px bg-[#0F52BA]/40 dark:bg-[#60A5FA]/40" />
          <span>{t.policy.sec12.tag}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          {t.policy.sec12.title}
        </h2>

        <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300">
          <p>{highlightText(t.policy.sec12.intro)}</p>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {t.policy.sec12.p2}
          </p>
        </div>
      </section>

      {/* SECTION 13: MARKETING COMMUNICATIONS */}
      <section id="marketing-communications" className="scroll-mt-28">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#0F52BA] dark:text-[#60A5FA] mb-1">
          <span>13</span>
          <span className="w-4 h-px bg-[#0F52BA]/40 dark:bg-[#60A5FA]/40" />
          <span>{t.policy.sec13.tag}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          {t.policy.sec13.title}
        </h2>

        <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300">
          <p>{highlightText(t.policy.sec13.intro)}</p>

          {/* Interactive Unsubscribe Box */}
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1527] shadow-2xs">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-1">
              {t.policy.sec13.boxTitle}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
              {t.policy.sec13.boxDesc}
            </p>

            <form onSubmit={handleMarketingOptOut} className="flex flex-col sm:flex-row gap-2 max-w-md">
              <input
                type="email"
                required
                value={marketingEmail}
                onChange={(e) => setMarketingEmail(e.target.value)}
                placeholder={t.policy.sec13.inputPlaceholder}
                className="px-3 py-2 text-xs bg-slate-50 dark:bg-[#080d19] border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:bg-white dark:focus:bg-[#0c1527] focus:border-[#0F52BA] outline-none flex-1"
              />
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 rounded-lg shadow-2xs transition-colors shrink-0 cursor-pointer"
              >
                {t.policy.sec13.optOutButton}
              </button>
            </form>

            {optOutSuccess && (
              <div className="mt-3 p-2 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 rounded-md text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{t.policy.sec13.optOutSuccess}</span>
              </div>
            )}

            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-3">
              {t.policy.sec13.transactionalNote}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 14: AI AND AUTOMATED PROCESSING */}
      <section id="ai-automated-processing" className="scroll-mt-28">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#0F52BA] dark:text-[#60A5FA] mb-1">
          <span>14</span>
          <span className="w-4 h-px bg-[#0F52BA]/40 dark:bg-[#60A5FA]/40" />
          <span>{t.policy.sec14.tag}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          {t.policy.sec14.title}
        </h2>

        <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300">
          <p>{highlightText(t.policy.sec14.intro)}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            {t.policy.sec14.features.map((feature, i) => (
              <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-[#080d19] border border-slate-200/80 dark:border-slate-800">
                <Sparkles className="w-3.5 h-3.5 text-[#4D7C0F] dark:text-[#84CC16] shrink-0" />
                <span className="text-slate-800 dark:text-slate-200 font-medium">{feature}</span>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/40 space-y-2 text-xs">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#0F52BA] dark:text-[#60A5FA]" />
              <span>{t.policy.sec14.governanceTitle}</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.policy.sec14.governanceDesc}
            </p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>{t.policy.sec14.hitlTitle}</strong> {t.policy.sec14.hitlDesc}
            </p>
            <p className="text-slate-500 dark:text-slate-400 text-[11px]">
              {t.policy.sec14.disclaimer}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 15: CHANGES TO THIS PRIVACY POLICY */}
      <section id="changes-to-policy" className="scroll-mt-28">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#0F52BA] dark:text-[#60A5FA] mb-1">
          <span>15</span>
          <span className="w-4 h-px bg-[#0F52BA]/40 dark:bg-[#60A5FA]/40" />
          <span>{t.policy.sec15.tag}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          {t.policy.sec15.title}
        </h2>

        <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300">
          <p>{highlightText(t.policy.sec15.intro)}</p>
          <p>{highlightText(t.policy.sec15.p2)}</p>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1527]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-800 dark:text-slate-200">
                <Clock className="w-4 h-4 text-[#0F52BA] dark:text-[#60A5FA]" />
                <span>
                  {t.policy.sec15.statusLabel}{' '}
                  <strong className="text-slate-900 dark:text-white">{version}</strong> (
                  {t.policy.sec15.effectiveLabel} {lastUpdatedDate})
                </span>
              </div>
              <button
                onClick={() => setShowVersionHistory(!showVersionHistory)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#0F52BA] dark:text-[#60A5FA] hover:underline cursor-pointer"
              >
                <History className="w-3.5 h-3.5" />
                <span>
                  {showVersionHistory
                    ? t.policy.sec15.hideHistory
                    : t.policy.sec15.viewHistory}
                </span>
              </button>
            </div>

            {showVersionHistory && (
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                {VERSION_HISTORY.map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 dark:bg-[#080d19] rounded-lg text-xs">
                    <div className="flex items-center justify-between font-semibold text-slate-900 dark:text-white mb-1">
                      <span>{item.version}</span>
                      <span className="text-slate-500 dark:text-slate-400 font-normal">{item.date}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300">{item.notes}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 16: CONTACT US */}
      <section id="contact-us" className="scroll-mt-28">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#0F52BA] dark:text-[#60A5FA] mb-1">
          <span>16</span>
          <span className="w-4 h-px bg-[#0F52BA]/40 dark:bg-[#60A5FA]/40" />
          <span>{t.policy.sec16.tag}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
          {t.policy.sec16.title}
        </h2>

        <div className="space-y-6 text-sm sm:text-base text-slate-600 dark:text-slate-300">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0F52BA] to-[#0A3982] text-white shadow-md">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
              {t.policy.sec16.bannerTitle}
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed max-w-xl">
              {t.policy.sec16.bannerDesc}
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/15 text-xs">
              <div className="space-y-1">
                <span className="text-blue-200 block text-[11px]">{t.policy.sec16.orgLabel}</span>
                <strong className="text-white font-semibold">NextSoftHR</strong>
              </div>
              <div className="space-y-1">
                <span className="text-blue-200 block text-[11px]">{t.policy.sec16.websiteLabel}</span>
                <a
                  href="https://www.nextsofthr.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#84CC16] hover:underline font-semibold block"
                >
                  www.nextsofthr.org
                </a>
              </div>
              <div className="space-y-1">
                <span className="text-blue-200 block text-[11px]">{t.policy.sec16.hotlineLabel}</span>
                <a
                  href="tel:+2349158482622"
                  className="text-white hover:text-[#84CC16] font-semibold block"
                >
                  +2349158482622
                </a>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="px-4 py-2 bg-white text-slate-900 text-xs font-semibold rounded-lg hover:bg-slate-100 transition-colors shadow-2xs inline-block"
              >
                {t.policy.sec16.contactBtn}
              </Link>
              <Link
                to="/about-us"
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg transition-colors border border-white/20 inline-block"
              >
                {t.policy.sec16.visitBtn}
              </Link>
            </div>
          </div>

          {/* Embedded Privacy Request Form Section */}
          <div className="pt-2">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              {t.policy.sec16.formTitle}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              {t.policy.sec16.formDesc}
            </p>
            <PrivacyRequestForm isInline={true} t={t} />
          </div>
        </div>
      </section>
    </article>
  );
};
