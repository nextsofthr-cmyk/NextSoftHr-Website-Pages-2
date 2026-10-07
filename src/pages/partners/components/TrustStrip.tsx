import React from 'react';
import { DollarSign, Globe, Cpu, Headphones } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const TrustStrip: React.FC = () => {
  const { strings } = useLanguage();
  const t = strings.trust;

  const trustBenefits = [
    {
      id: 'benefit-recurring',
      title: t.card1Title,
      description: t.card1Desc,
      icon: DollarSign,
      stat: t.card1Stat,
    },
    {
      id: 'benefit-global',
      title: t.card2Title,
      description: t.card2Desc,
      icon: Globe,
      stat: t.card2Stat,
    },
    {
      id: 'benefit-platform',
      title: t.card3Title,
      description: t.card3Desc,
      icon: Cpu,
      stat: t.card3Stat,
    },
    {
      id: 'benefit-support',
      title: t.card4Title,
      description: t.card4Desc,
      icon: Headphones,
      stat: t.card4Stat,
    },
  ];

  return (
    <section id="trust-strip" className="relative py-12 bg-slate-100/90 dark:bg-[#040E1F] border-y border-slate-200 dark:border-blue-900/60 z-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustBenefits.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                id={item.id}
                className="group relative rounded-2xl bg-white dark:bg-[#071D3E] border border-slate-200/90 dark:border-blue-800/80 p-6 hover:border-[#8EBD07] dark:hover:border-[#B8F010]/60 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-xl dark:shadow-md dark:hover:shadow-blue-950/50"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/90 border border-blue-200 dark:border-blue-700/60 flex items-center justify-center group-hover:border-[#B8F010] transition-colors">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-[#B8F010] group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-900/80 text-blue-700 dark:text-[#B8F010] border border-blue-200 dark:border-blue-700/50">
                    {item.stat}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-[#B8F010] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
