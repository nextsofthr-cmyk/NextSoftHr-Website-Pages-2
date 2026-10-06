import React from 'react';
import { FileEdit, UserCheck, GraduationCap, DollarSign, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HowItWorksProps {
  onApplyClick: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onApplyClick }) => {
  const { strings, isRTL } = useLanguage();
  const h = strings.how;

  const steps = [
    {
      step: '01',
      title: h.step1Title,
      description: h.step1Desc,
      icon: FileEdit,
      tag: 'Application',
    },
    {
      step: '02',
      title: h.step2Title,
      description: h.step2Desc,
      icon: UserCheck,
      tag: 'Onboarding',
    },
    {
      step: '03',
      title: h.step3Title,
      description: h.step3Desc,
      icon: GraduationCap,
      tag: 'Implementation',
    },
    {
      step: '04',
      title: h.step4Title,
      description: h.step4Desc,
      icon: DollarSign,
      tag: 'Payouts',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white dark:bg-[#051329] border-t border-slate-200 dark:border-blue-900/60 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/60 border border-blue-200 dark:border-blue-700/60 text-xs font-bold text-blue-800 dark:text-[#B8F010] mb-4">
            <span>{h.tag}</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            {h.title}
          </h2>
          
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            {h.subtitle}
          </p>
        </div>

        {/* 4 Steps Horizontal Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative mb-14">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="group relative rounded-2xl bg-slate-50 dark:bg-[#071D3E] border border-slate-200/90 dark:border-blue-800/80 p-7 flex flex-col justify-between hover:border-blue-500 dark:hover:border-[#B8F010] transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-xl dark:shadow-xl"
              >
                {/* Connecting Arrow for Desktop */}
                {index < steps.length - 1 && (
                  <div className={`hidden lg:flex absolute top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white dark:bg-[#040E1F] border border-blue-400 dark:border-[#B8F010] items-center justify-center shadow ${
                    isRTL ? '-left-3.5' : '-right-3.5'
                  }`}>
                    <ArrowRight className={`w-3.5 h-3.5 text-blue-600 dark:text-[#B8F010] ${isRTL ? 'rotate-180' : ''}`} />
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs font-black px-2.5 py-1 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-[#B8F010] border border-blue-200 dark:border-blue-800 tracking-wider">
                      STEP {item.step}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-white dark:bg-blue-950/80 border border-slate-200 dark:border-blue-700/60 flex items-center justify-center group-hover:border-[#B8F010] transition-colors shadow-sm">
                      <Icon className="w-6 h-6 text-blue-600 dark:text-[#B8F010] group-hover:scale-110 transition-transform" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-[#B8F010] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-blue-900/60 flex items-center gap-1.5 text-[11px] text-slate-600 dark:text-slate-300 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-[#B8F010]" />
                  <span>NextSofthr Partner OS</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action CTA */}
        <div className="text-center">
          <button
            onClick={onApplyClick}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#B8F010] text-[#040E1F] font-extrabold text-sm hover:bg-[#CBFF1A] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#B8F010]/20"
          >
            <span>{h.ctaBtn}</span>
            <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
          </button>
        </div>

      </div>
    </section>
  );
};
