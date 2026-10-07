import React from 'react';
import { Globe, Phone, FileCheck, Shield, ArrowRight, Printer, Share2 } from 'lucide-react';
import { NextSoftLogo } from './NextSoftLogo';
import { POLICY_META } from '../data/policyData';
import { SupportedLanguage, TRANSLATIONS } from '../data/translations';

interface HeroProps {
  onOpenSupportModal: () => void;
  onOpenPartnerModal: () => void;
  onPrintPolicy: () => void;
  currentLang: SupportedLanguage;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenSupportModal,
  onOpenPartnerModal,
  onPrintPolicy,
  currentLang,
}) => {
  const [copied, setCopied] = React.useState(false);
  const t = TRANSLATIONS[currentLang];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/60 to-white dark:from-[#0B1120] dark:via-[#0F172A] dark:to-[#0B1120] pt-10 pb-14 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      {/* Subtle Background Geometry */}
      <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20">
        <div className="absolute -top-24 right-0 w-96 h-96 bg-[#84CC16]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#0A3B7B]/10 dark:bg-[#38BDF8]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Official Document Metadata Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 mb-6 pb-4 border-b border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <a href="https://www.nextsofthr.org" className="hover:text-[#0A3B7B] dark:hover:text-[#38BDF8] transition-colors">
              {t.hero.breadcrumbHome}
            </a>
            <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">/</span>
            <span>{t.hero.breadcrumbLegal}</span>
            <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">/</span>
            <span className="font-semibold text-[#0A3B7B] dark:text-[#38BDF8]">{t.hero.breadcrumbCurrent}</span>
          </div>

          <div className="flex items-center gap-3">
            <span>{t.hero.effective} <strong className="text-slate-700 dark:text-slate-200 font-semibold">{POLICY_META.effectiveDate}</strong></span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <span>{t.hero.updated} <strong className="text-slate-700 dark:text-slate-200 font-semibold">{POLICY_META.lastUpdated}</strong></span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <span className="font-mono text-[11px] tabular-nums">{t.hero.versionPrefix}{POLICY_META.version.split(' ')[0]}</span>
          </div>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-8 space-y-6">
            {/* Trust Kicker */}
            <div className="flex items-center gap-2.5 text-xs font-semibold text-[#0A3B7B] dark:text-[#38BDF8]">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-[#84CC16] text-[#0A3B7B]">
                <Shield className="w-3.5 h-3.5 stroke-[2.5]" />
              </span>
              <span className="tracking-wide uppercase text-[11px]">{t.hero.trustKicker}</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A3B7B] dark:text-white tracking-tight leading-[1.15] text-balance">
              {t.hero.headline}
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl font-semibold text-slate-700 dark:text-slate-200 leading-snug max-w-2xl text-balance">
              {t.hero.subheadline}
            </p>

            {/* Supporting Text */}
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              {t.hero.supportingText}
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenSupportModal}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0A3B7B] hover:bg-[#1E40AF] text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <span>{t.hero.contactSupport}</span>
                <ArrowRight className="w-4 h-4 text-[#84CC16]" />
              </button>

              <button
                type="button"
                onClick={onOpenPartnerModal}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-[#131D31] text-[#0A3B7B] dark:text-[#60A5FA] border-2 border-[#0A3B7B]/20 dark:border-slate-700 text-sm font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-[#0A3B7B] dark:hover:border-slate-600 transition-all"
              >
                <span>{t.hero.contactPartnerTeam}</span>
              </button>

              <div className="flex items-center gap-1.5 ml-0 sm:ml-2">
                <button
                  type="button"
                  onClick={onPrintPolicy}
                  title={t.hero.printTooltip}
                  className="p-2.5 text-slate-600 dark:text-slate-300 hover:text-[#0A3B7B] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors border border-slate-200 dark:border-slate-700"
                  aria-label={t.hero.printTooltip}
                >
                  <Printer className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  title={t.hero.shareTooltip}
                  className="p-2.5 text-slate-600 dark:text-slate-300 hover:text-[#0A3B7B] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors border border-slate-200 dark:border-slate-700"
                  aria-label={t.hero.shareTooltip}
                >
                  <Share2 className="w-4 h-4" />
                </button>
                {copied && <span className="text-xs text-[#84CC16] font-medium">{t.hero.linkCopied}</span>}
              </div>
            </div>

            {/* Official Website & Contact Strip */}
            <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <a
                href="https://www.nextsofthr.org"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-bold text-[#0A3B7B] dark:text-[#38BDF8] hover:underline"
              >
                <Globe className="w-4 h-4 text-[#84CC16]" />
                <span>www.nextsofthr.org</span>
              </a>

              <a
                href="tel:+2349158482622"
                className="inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-[#0A3B7B] dark:hover:text-[#38BDF8]"
              >
                <Phone className="w-4 h-4 text-[#84CC16]" />
                <span className="font-mono tabular-nums">+2349158482622</span>
              </a>

              <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                <FileCheck className="w-4 h-4 text-[#84CC16]" />
                <span>{t.hero.complianceNote}</span>
              </div>
            </div>
          </div>

          {/* Right Highlight Box - Visual Identity & Scope Verification */}
          <div className="lg:col-span-4">
            <div className="bg-white dark:bg-[#131D31] rounded-2xl p-6 shadow-sm border border-slate-200/90 dark:border-slate-800 relative overflow-hidden transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#84CC16]/10 rounded-bl-full pointer-events-none" />
              
              <div className="flex items-center gap-3 mb-4">
                <NextSoftLogo size="md" showTagline />
              </div>

              <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-4">
                <div className="flex items-start justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="font-medium text-slate-500 dark:text-slate-400">{t.hero.cardJurisdiction}</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 text-right">{t.hero.cardJurisdictionVal}</span>
                </div>
                <div className="flex items-start justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="font-medium text-slate-500 dark:text-slate-400">{t.hero.cardScope}</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 text-right">{t.hero.cardScopeVal}</span>
                </div>
                <div className="flex items-start justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="font-medium text-slate-500 dark:text-slate-400">{t.hero.cardCurrency}</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 text-right">USD, NGN, GBP, EUR</span>
                </div>
                <div className="flex items-start justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="font-medium text-slate-500 dark:text-slate-400">{t.hero.cardSupportDesk}</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 text-right">billing@nextsofthr.org</span>
                </div>
                <div className="flex items-start justify-between py-1">
                  <span className="font-medium text-slate-500 dark:text-slate-400">{t.hero.cardHelpline}</span>
                  <span className="font-mono font-semibold text-[#0A3B7B] dark:text-[#38BDF8] text-right tabular-nums">+2349158482622</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-slate-50 dark:bg-[#0F172A] rounded-xl border border-slate-200/60 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300">
                <p className="leading-snug">
                  <strong>{t.hero.cardTip.split('?')[0]}?</strong>{t.hero.cardTip.includes('?') ? t.hero.cardTip.substring(t.hero.cardTip.indexOf('?') + 1) : t.hero.cardTip}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
