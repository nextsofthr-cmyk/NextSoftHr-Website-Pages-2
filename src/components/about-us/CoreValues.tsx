import React from 'react';
import {
  HeartHandshake,
  Zap,
  Sliders,
  ShieldCheck,
  Users2,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { CORE_VALUES } from '../data/contentData';

export const CoreValues: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-[#0B3B73] dark:text-[#38BDF8]" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-[#84CC16]" />;
      case 'Sliders':
        return <Sliders className="w-6 h-6 text-[#0B3B73] dark:text-[#38BDF8]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#84CC16]" />;
      case 'Users2':
        return <Users2 className="w-6 h-6 text-[#0B3B73] dark:text-[#38BDF8]" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-[#84CC16]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#0B3B73] dark:text-[#38BDF8]" />;
    }
  };

  return (
    <section id="values" className="py-20 lg:py-28 bg-[#F8FAFC] dark:bg-[#06101E] border-b border-slate-200/80 dark:border-slate-800 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/50 text-xs font-bold text-[#0B3B73] dark:text-[#38BDF8]">
            <span className="w-2 h-2 rounded-full bg-[#84CC16]"></span>
            <span>Our Principles</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2540] dark:text-white tracking-tight">
            The Values That Guide Us
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            Every feature we ship, every customer support conversation we hold, and every
            architectural decision we make is anchored in these six foundational tenets.
          </p>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CORE_VALUES.map((val) => (
            <div
              key={val.number}
              className="bg-white dark:bg-[#0E2038] border border-slate-200/80 dark:border-blue-900/40 hover:border-[#0B3B73]/40 dark:hover:border-blue-500 rounded-2xl p-7 transition-all duration-300 hover:shadow-xl group relative overflow-hidden flex flex-col justify-between"
            >
              {/* Subtle accent line on top */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#84CC16] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-[#162D4E] border border-blue-100/60 dark:border-blue-800/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getIcon(val.iconName)}
                  </div>
                  <span className="font-mono text-2xl font-extrabold text-slate-300 dark:text-slate-600 group-hover:text-[#84CC16] transition-colors">
                    {val.number}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#0A2540] dark:text-white mb-3 group-hover:text-[#0B3B73] dark:group-hover:text-[#84CC16] transition-colors">
                  {val.title}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {val.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs font-semibold text-[#0B3B73] dark:text-[#38BDF8]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16]"></span>
                <span>NextSofthr Standard</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
