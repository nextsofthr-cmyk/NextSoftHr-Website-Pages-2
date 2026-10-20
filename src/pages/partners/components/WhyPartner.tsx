import React from 'react';
import { 
  Percent, 
  Layers, 
  Bot, 
  Megaphone, 
  GraduationCap, 
  HeartHandshake,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CardSlider } from './CardSlider';

interface WhyPartnerProps {
  onApplyClick: () => void;
}

export const WhyPartner: React.FC<WhyPartnerProps> = ({ onApplyClick }) => {
  const { strings, isRTL } = useLanguage();
  const w = strings.why;

  const cards = [
    {
      num: '01',
      title: w.card1Title,
      description: w.card1Desc,
      icon: Percent,
      highlight: w.card1Highlight,
    },
    {
      num: '02',
      title: w.card2Title,
      description: w.card2Desc,
      icon: Layers,
      highlight: w.card2Highlight,
    },
    {
      num: '03',
      title: w.card3Title,
      description: w.card3Desc,
      icon: Bot,
      highlight: w.card3Highlight,
    },
    {
      num: '04',
      title: w.card4Title,
      description: w.card4Desc,
      icon: Megaphone,
      highlight: w.card4Highlight,
    },
    {
      num: '05',
      title: w.card5Title,
      description: w.card5Desc,
      icon: GraduationCap,
      highlight: w.card5Highlight,
    },
    {
      num: '06',
      title: w.card6Title,
      description: w.card6Desc,
      icon: HeartHandshake,
      highlight: w.card6Highlight,
    },
  ];

  return (
    <section id="program" className="py-24 bg-white dark:bg-[#051329] relative overflow-hidden transition-colors duration-300">
      {/* Background radial accent */}
      <div className="absolute -top-40 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 left-0 w-96 h-96 bg-[#B8F010]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/60 border border-blue-200 dark:border-blue-700/60 text-xs font-bold text-blue-800 dark:text-[#B8F010] mb-4">
            <span>{w.tag}</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-5">
            {w.titleMain}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-slate-800 to-blue-900 dark:from-white dark:via-blue-100 dark:to-[#B8F010]">
              {w.titleGradient}
            </span>
          </h2>
          
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {w.subtitle}
          </p>
        </div>

        {/* 6 Feature Cards Slider (3 in a row on desktop) */}
        <div className="mb-14">
          <CardSlider
            id="why-partner-slider"
            ariaLabel="More Than a Partnership"
            items={cards}
            perView={{ base: 1, md: 2, lg: 3, xl: 3 }}
            renderItem={(card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.num}
                  className="group relative rounded-2xl bg-slate-50 dark:bg-gradient-to-b dark:from-[#071D3E] dark:to-[#040E1F] border border-slate-200/90 dark:border-blue-800/80 p-8 hover:border-[#8EBD07] dark:hover:border-[#B8F010]/70 transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-xl dark:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-blue-950/80 flex flex-col justify-between h-full"
                >
                  <div>
                    {/* Card Header: Number & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-2xl font-black text-slate-300 dark:text-blue-300/40 font-mono group-hover:text-blue-600 dark:group-hover:text-[#B8F010] transition-colors">
                        {card.num}
                      </span>
                      <div className="w-12 h-12 rounded-xl bg-white dark:bg-blue-950 border border-slate-200 dark:border-blue-700/70 flex items-center justify-center group-hover:border-[#B8F010] transition-colors shadow-sm">
                        <Icon className="w-6 h-6 text-blue-600 dark:text-[#B8F010] group-hover:scale-110 transition-transform" />
                      </div>
                    </div>

                    {/* Card Title & Description */}
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-100 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                      {card.description}
                    </p>
                  </div>

                  {/* Card Footer Pill */}
                  <div className="pt-4 border-t border-slate-200 dark:border-blue-900/60 flex items-center justify-between">
                    <span className="text-xs font-semibold text-blue-700 dark:text-[#B8F010]">
                      {card.highlight}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-blue-300 font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      NextSofthr Core
                    </span>
                  </div>
                </div>
              );
            }}
          />
        </div>

        {/* Section Action Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-blue-900 via-[#0B254A] to-blue-950 border border-blue-700/70 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="text-left">
            <h4 className="text-xl font-bold text-white mb-1">
              {w.bannerTitle}
            </h4>
            <p className="text-sm text-blue-200/90">
              {w.bannerSubtitle}
            </p>
          </div>
          <button
            onClick={onApplyClick}
            className="w-full md:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#B8F010] text-[#040E1F] font-extrabold text-sm hover:bg-[#CBFF1A] transition-all transform hover:-translate-y-0.5 shadow-md shadow-[#B8F010]/20"
          >
            <span>{w.bannerBtn}</span>
            <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
          </button>
        </div>

      </div>
    </section>
  );
};
