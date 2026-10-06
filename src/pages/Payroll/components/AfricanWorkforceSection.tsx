import React from 'react';
import { Globe2, TrendingUp, Building2, ArrowRight, Users2, Laptop } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AfricanWorkforceSectionProps {
  onSelectTopic: (topic: string) => void;
  onReadPanAfricanInsight: () => void;
}

export const AfricanWorkforceSection: React.FC<AfricanWorkforceSectionProps> = ({
  onSelectTopic,
  onReadPanAfricanInsight,
}) => {
  const { t } = useLanguage();

  const pillars = [
    {
      title: 'African Workforce Transformation',
      desc: 'With 60% of the population under 25, the continent is leapfrogging legacy systems into cloud-native, mobile HR management.',
      stat: '60% < 25 yrs',
      tag: 'Demographic Dividend',
      icon: Users2,
    },
    {
      title: 'Payroll Modernization & AfCFTA',
      desc: 'Managing cross-border salaries, statutory remittances (PAYE, KRA, FIRS, GRA), and multi-currency payroll under single unified governance.',
      stat: '54 Countries',
      tag: 'Cross-Border',
      icon: TrendingUp,
    },
    {
      title: 'SME to Enterprise Scalability',
      desc: 'Democratizing enterprise-grade payroll, biometric clock-ins, and talent pipelines for 10-person startups to 5,000-person conglomerates.',
      stat: '85% SME Hubs',
      tag: 'Inclusive SaaS',
      icon: Building2,
    },
    {
      title: 'Remote & Hybrid Resilience',
      desc: 'Equipping knowledge workers with geofenced mobile time tracking, digital payslip access, and decentralized manager approvals.',
      stat: '3.4x Hybrid Rise',
      tag: 'Modern Workplace',
      icon: Laptop,
    },
  ];

  return (
    <section className="py-16 bg-[#072448] text-white relative overflow-hidden border-b border-slate-800">
      {/* Background Decorative Map Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #8EE000 1px, transparent 0)`,
        backgroundSize: '24px 24px',
      }} />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#8EE000]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block */}
        <div className="max-w-3xl mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-[#8EE000]">
            <Globe2 className="w-3.5 h-3.5" />
            <span>{t('africa.scope', 'Continental & Worldwide Scope')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white font-heading">
            {t('africa.title', 'The Future of Work in Africa and Beyond')}
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            {t('africa.subtitle', 'Explore workforce trends, HR technology, payroll transformation and business practices shaping organizations across Africa and global markets.')}
          </p>
        </div>

        {/* 4 Pillars Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#8EE000]/50 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between group shadow-sm"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#0A3F7E] text-[#8EE000] flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-[#8EE000] bg-[#8EE000]/10 px-2 py-0.5 rounded border border-[#8EE000]/30 font-semibold">
                      {item.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-[#8EE000] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed mt-2">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="text-xs font-mono font-bold text-slate-200">
                    {item.stat}
                  </div>
                  <button
                    onClick={() => onSelectTopic(item.title)}
                    className="text-xs text-slate-300 group-hover:text-white font-semibold flex items-center gap-1"
                  >
                    <span>{t('africa.readData', 'Read Data')}</span>
                    <ArrowRight className="w-3 h-3 text-[#8EE000] group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Spotlight Card */}
        <div className="bg-gradient-to-r from-[#0A3F7E]/90 to-[#051A33] border border-white/15 rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono font-bold text-[#8EE000] uppercase tracking-wider">
              {t('africa.spotlightKicker', 'Pan-African Case Study Spotlight')}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {t('africa.spotlightTitle', 'Managing Cross-Border Teams: Standardizing Payroll & Tax Across Nigeria, Kenya & Ghana')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t('africa.spotlightDesc', 'Read how multinational operators utilize NextSoftHr to consolidate local tax declarations, pension remittances, and attendance records into one auditable executive view.')}
            </p>
          </div>

          <button
            onClick={onReadPanAfricanInsight}
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold text-slate-950 bg-[#8EE000] hover:bg-[#9EF01A] shadow-md transition-all active:scale-[0.98] border border-[#7BC500]"
          >
            <span>{t('africa.spotlightBtn', 'Read Special Report')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
