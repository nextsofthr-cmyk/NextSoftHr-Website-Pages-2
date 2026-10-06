import React from 'react';
import { UserCheck, Laptop, Compass, Coins, Cpu, Building2, ArrowRight } from 'lucide-react';
import { EnquiryType } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface WhyContactSectionProps {
  onSelectOption: (enquiryType: EnquiryType, note?: string) => void;
}

export const WhyContactSection: React.FC<WhyContactSectionProps> = ({ onSelectOption }) => {
  const { t } = useLanguage();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'UserCheck':
        return <UserCheck className="w-6 h-6 text-[#1769E0]" />;
      case 'Laptop':
        return <Laptop className="w-6 h-6 text-[#1769E0]" />;
      case 'Compass':
        return <Compass className="w-6 h-6 text-[#1769E0]" />;
      case 'Coins':
        return <Coins className="w-6 h-6 text-[#1769E0]" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-[#1769E0]" />;
      case 'Building2':
      default:
        return <Building2 className="w-6 h-6 text-[#1769E0]" />;
    }
  };

  const benefits = [
    {
      id: 'consultation',
      title: t.whyContact.items.consultation.title,
      description: t.whyContact.items.consultation.description,
      iconName: 'UserCheck',
      enquiryType: 'HR Management' as EnquiryType,
    },
    {
      id: 'demo',
      title: t.whyContact.items.demo.title,
      description: t.whyContact.items.demo.description,
      iconName: 'Laptop',
      enquiryType: 'HR Management' as EnquiryType,
    },
    {
      id: 'implementation',
      title: t.whyContact.items.implementation.title,
      description: t.whyContact.items.implementation.description,
      iconName: 'Compass',
      enquiryType: 'HR Management' as EnquiryType,
    },
    {
      id: 'payroll',
      title: t.whyContact.items.payroll.title,
      description: t.whyContact.items.payroll.description,
      iconName: 'Coins',
      enquiryType: 'Payroll' as EnquiryType,
    },
    {
      id: 'technology',
      title: t.whyContact.items.technology.title,
      description: t.whyContact.items.technology.description,
      iconName: 'Cpu',
      enquiryType: 'AI HR Assistant' as EnquiryType,
    },
    {
      id: 'enterprise',
      title: t.whyContact.items.enterprise.title,
      description: t.whyContact.items.enterprise.description,
      iconName: 'Building2',
      enquiryType: 'Enterprise Solutions' as EnquiryType,
    },
  ];

  return (
    <section id="why-contact" className="py-20 bg-white dark:bg-[#081528] relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1769E0]/10 dark:bg-[#1769E0]/20 text-[#1769E0] dark:text-[#C8F000] text-xs font-bold uppercase tracking-wider mb-3">
            <span>{t.whyContact.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] dark:text-white tracking-tight font-display mb-4">
            {t.whyContact.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            {t.whyContact.subtitle}
          </p>
        </div>

        {/* 6 Benefit Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              onClick={() => onSelectOption(benefit.enquiryType, `I would like to schedule a ${benefit.title}.`)}
              className="group bg-[#F7FAFC] hover:bg-white dark:bg-[#0E2038] dark:hover:bg-[#142d4f] rounded-2xl p-7 border border-slate-200/80 dark:border-white/10 hover:border-[#1769E0]/40 dark:hover:border-[#C8F000]/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 group-hover:bg-[#1769E0]/10 dark:group-hover:bg-[#1769E0]/30 border border-slate-200 dark:border-white/10 group-hover:border-[#1769E0]/30 flex items-center justify-center mb-5 shadow-xs transition-colors">
                  {getIcon(benefit.iconName)}
                </div>

                <h3 className="text-lg font-extrabold text-[#0B1F3A] dark:text-white mb-2 group-hover:text-[#1769E0] dark:group-hover:text-[#C8F000] transition-colors">
                  {benefit.title}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {benefit.description}
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-200/60 dark:border-white/10 flex items-center gap-2 text-xs font-bold text-[#1769E0] dark:text-[#C8F000] group-hover:text-[#0B1F3A] dark:group-hover:text-white">
                <span>{t.contactOptions.cards.demo.cta}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

