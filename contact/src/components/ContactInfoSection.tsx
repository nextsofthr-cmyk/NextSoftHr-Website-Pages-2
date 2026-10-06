import React from 'react';
import { Phone, Globe, Briefcase, LifeBuoy, ArrowUpRight, ExternalLink } from 'lucide-react';
import { BRAND } from '../data/content';
import { useLanguage } from '../context/LanguageContext';

interface ContactInfoSectionProps {
  onTalkToSales: () => void;
  onGetSupport: () => void;
}

export const ContactInfoSection: React.FC<ContactInfoSectionProps> = ({
  onTalkToSales,
  onGetSupport,
}) => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-white dark:bg-[#081528] border-t border-slate-200/60 dark:border-white/10 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1769E0]/10 dark:bg-[#1769E0]/20 text-[#1769E0] dark:text-[#C8F000] text-xs font-bold uppercase tracking-wider mb-3">
            <span>{t.contactInfo.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] dark:text-white tracking-tight font-display mb-4">
            {t.contactInfo.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            {t.contactInfo.subtitle}
          </p>
        </div>

        {/* 4 Elegant Icon Cards with Blue Icons & Lemon-Green Accent Circles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Phone */}
          <div className="bg-[#F7FAFC] dark:bg-[#0E2038] rounded-2xl p-7 border border-slate-200/80 dark:border-white/10 hover:border-[#1769E0]/40 dark:hover:border-[#C8F000]/40 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              {/* Blue icon with lemon-green accent circle */}
              <div className="relative w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 flex items-center justify-center mb-6 shadow-xs">
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#C8F000] border-2 border-white dark:border-[#0E2038] flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0B1F3A]"></span>
                </div>
                <Phone className="w-6 h-6 text-[#1769E0] dark:text-[#C8F000]" />
              </div>

              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                {t.contactInfo.generalTitle}
              </div>
              <h3 className="text-lg font-extrabold text-[#0B1F3A] dark:text-white mb-2 font-mono">
                {BRAND.phone}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {t.contactInfo.hoursWeekday}
              </p>
            </div>

            <a
              href={`tel:${BRAND.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-bold text-[#0B1F3A] bg-[#C8F000] hover:bg-[#bde300] transition-colors"
            >
              <span>{t.nav.directCall}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 2: Website */}
          <div className="bg-[#F7FAFC] dark:bg-[#0E2038] rounded-2xl p-7 border border-slate-200/80 dark:border-white/10 hover:border-[#1769E0]/40 dark:hover:border-[#C8F000]/40 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              {/* Blue icon with lemon-green accent circle */}
              <div className="relative w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 flex items-center justify-center mb-6 shadow-xs">
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#C8F000] border-2 border-white dark:border-[#0E2038] flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0B1F3A]"></span>
                </div>
                <Globe className="w-6 h-6 text-[#1769E0] dark:text-[#C8F000]" />
              </div>

              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                {t.contactInfo.badge}
              </div>
              <h3 className="text-lg font-extrabold text-[#0B1F3A] dark:text-white mb-2">
                {BRAND.website}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {t.contactInfo.hubLondon}
              </p>
            </div>

            <a
              href={BRAND.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#1769E0] hover:bg-[#1253b3] transition-colors"
            >
              <span>{BRAND.website}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 3: Sales */}
          <div className="bg-[#F7FAFC] dark:bg-[#0E2038] rounded-2xl p-7 border border-slate-200/80 dark:border-white/10 hover:border-[#1769E0]/40 dark:hover:border-[#C8F000]/40 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              {/* Blue icon with lemon-green accent circle */}
              <div className="relative w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 flex items-center justify-center mb-6 shadow-xs">
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#C8F000] border-2 border-white dark:border-[#0E2038] flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0B1F3A]"></span>
                </div>
                <Briefcase className="w-6 h-6 text-[#1769E0] dark:text-[#C8F000]" />
              </div>

              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                {t.contactInfo.salesTitle}
              </div>
              <h3 className="text-lg font-extrabold text-[#0B1F3A] dark:text-white mb-2">
                {t.nav.talkToSales}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {t.contactInfo.responsePromise}
              </p>
            </div>

            <button
              onClick={onTalkToSales}
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-bold text-[#0B1F3A] dark:text-white bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-white/15 transition-colors cursor-pointer"
            >
              <span>{t.nav.talkToSales}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 4: Support */}
          <div className="bg-[#F7FAFC] dark:bg-[#0E2038] rounded-2xl p-7 border border-slate-200/80 dark:border-white/10 hover:border-[#1769E0]/40 dark:hover:border-[#C8F000]/40 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              {/* Blue icon with lemon-green accent circle */}
              <div className="relative w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 flex items-center justify-center mb-6 shadow-xs">
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#C8F000] border-2 border-white dark:border-[#0E2038] flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0B1F3A]"></span>
                </div>
                <LifeBuoy className="w-6 h-6 text-[#1769E0] dark:text-[#C8F000]" />
              </div>

              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                {t.contactInfo.supportTitle}
              </div>
              <h3 className="text-lg font-extrabold text-[#0B1F3A] dark:text-white mb-2">
                {t.contactOptions.cards.support.headline}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {t.contactOptions.cards.support.description}
              </p>
            </div>

            <button
              onClick={onGetSupport}
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-bold text-[#0B1F3A] dark:text-white bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-white/15 transition-colors cursor-pointer"
            >
              <span>{t.contactOptions.cards.support.cta}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

