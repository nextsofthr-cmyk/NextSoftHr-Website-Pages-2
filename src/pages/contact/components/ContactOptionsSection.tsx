import React from 'react';
import { ArrowRight, Briefcase, Calendar, LifeBuoy, Handshake, Building2, HelpCircle } from 'lucide-react';
import { EnquiryType } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { CardSlider } from './CardSlider';

interface ContactOptionsSectionProps {
  onSelectOption: (enquiryType: EnquiryType, focusMessage?: string) => void;
}

export const ContactOptionsSection: React.FC<ContactOptionsSectionProps> = ({ onSelectOption }) => {
  const { t } = useLanguage();

  const getIcon = (id: string) => {
    switch (id) {
      case 'sales':
        return <Briefcase className="w-6 h-6 text-[#1769E0]" />;
      case 'demo':
        return <Calendar className="w-6 h-6 text-[#1769E0]" />;
      case 'support':
        return <LifeBuoy className="w-6 h-6 text-[#1769E0]" />;
      case 'partnerships':
        return <Handshake className="w-6 h-6 text-[#1769E0]" />;
      case 'enterprise':
        return <Building2 className="w-6 h-6 text-[#1769E0]" />;
      case 'general':
      default:
        return <HelpCircle className="w-6 h-6 text-[#1769E0]" />;
    }
  };

  const cardItems: Array<{
    id: string;
    title: string;
    headline: string;
    description: string;
    ctaText: string;
    enquiryType: EnquiryType;
    badge?: string;
  }> = [
    {
      id: 'sales',
      title: t.contactOptions.cards.sales.title,
      headline: t.contactOptions.cards.sales.headline,
      description: t.contactOptions.cards.sales.description,
      ctaText: t.contactOptions.cards.sales.cta,
      enquiryType: 'HR Management',
      badge: t.contactOptions.cards.sales.badge,
    },
    {
      id: 'demo',
      title: t.contactOptions.cards.demo.title,
      headline: t.contactOptions.cards.demo.headline,
      description: t.contactOptions.cards.demo.description,
      ctaText: t.contactOptions.cards.demo.cta,
      enquiryType: 'HR Management',
      badge: t.contactOptions.cards.demo.badge,
    },
    {
      id: 'support',
      title: t.contactOptions.cards.support.title,
      headline: t.contactOptions.cards.support.headline,
      description: t.contactOptions.cards.support.description,
      ctaText: t.contactOptions.cards.support.cta,
      enquiryType: 'Customer Support',
    },
    {
      id: 'partnerships',
      title: t.contactOptions.cards.partnerships.title,
      headline: t.contactOptions.cards.partnerships.headline,
      description: t.contactOptions.cards.partnerships.description,
      ctaText: t.contactOptions.cards.partnerships.cta,
      enquiryType: 'Partnership',
    },
    {
      id: 'enterprise',
      title: t.contactOptions.cards.enterprise.title,
      headline: t.contactOptions.cards.enterprise.headline,
      description: t.contactOptions.cards.enterprise.description,
      ctaText: t.contactOptions.cards.enterprise.cta,
      enquiryType: 'Enterprise Solutions',
      badge: t.contactOptions.cards.enterprise.badge,
    },
    {
      id: 'general',
      title: t.contactOptions.cards.general.title,
      headline: t.contactOptions.cards.general.headline,
      description: t.contactOptions.cards.general.description,
      ctaText: t.contactOptions.cards.general.cta,
      enquiryType: 'Other',
    },
  ];

  return (
    <section id="contact-options" className="py-20 bg-white dark:bg-[#081528] relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1769E0]/10 dark:bg-[#1769E0]/20 text-[#1769E0] dark:text-[#C8F000] text-xs font-bold uppercase tracking-wider mb-3">
            <span>{t.contactOptions.sectionBadge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] dark:text-white tracking-tight font-display mb-4">
            {t.contactOptions.sectionTitle}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            {t.contactOptions.sectionSubtitle}
          </p>
        </div>

        {/* 6 Interactive Cards Slider (3 in a row on desktop) */}
        <CardSlider
          id="contact-options-slider"
          ariaLabel="Contact options"
          items={cardItems}
          perView={{ base: 1, md: 2, lg: 3, xl: 3 }}
          renderItem={(card) => (
            <div
              key={card.id}
              className="group relative bg-[#F7FAFC] hover:bg-white dark:bg-[#0E2038] dark:hover:bg-[#142d4f] rounded-2xl p-7 border border-slate-200/80 dark:border-white/10 hover:border-[#1769E0]/50 dark:hover:border-[#C8F000]/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer h-full"
              onClick={() => onSelectOption(card.enquiryType, `Hello NextSofthr Team, I am reaching out regarding ${card.headline}.`)}
            >
              <div>
                {/* Top Row: Icon and Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 group-hover:bg-[#1769E0]/10 dark:group-hover:bg-[#1769E0]/30 border border-slate-200 dark:border-white/10 group-hover:border-[#1769E0]/30 flex items-center justify-center shadow-xs transition-colors duration-200">
                    {getIcon(card.id)}
                  </div>
                  {card.badge && (
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#C8F000]/30 dark:bg-[#C8F000]/20 text-[#0B1F3A] dark:text-[#C8F000] border border-[#C8F000]/60">
                      {card.badge}
                    </span>
                  )}
                </div>

                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-1">
                  {card.title}
                </div>
                <h3 className="text-xl font-extrabold text-[#0B1F3A] dark:text-white tracking-tight mb-2 group-hover:text-[#1769E0] dark:group-hover:text-[#C8F000] transition-colors">
                  {card.headline}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  {card.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between text-sm font-bold text-[#1769E0] dark:text-[#C8F000] group-hover:text-[#0B1F3A] dark:group-hover:text-white">
                <span>{card.ctaText}</span>
                <div className="w-8 h-8 rounded-full bg-[#1769E0]/10 dark:bg-white/10 group-hover:bg-[#C8F000] flex items-center justify-center transition-colors">
                  <ArrowRight className="w-4 h-4 text-[#1769E0] dark:text-[#C8F000] group-hover:text-[#0B1F3A] transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </div>
          )}
        />

      </div>
    </section>
  );
};

