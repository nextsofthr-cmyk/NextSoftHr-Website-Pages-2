import React from 'react';
import { Clock, CheckCircle2, Zap, HeartHandshake } from 'lucide-react';
import { STATS_ITEMS } from '../data/servicesData';
import { GrowthProjectionChart } from './GrowthProjectionChart';

const statIcons = [Clock, CheckCircle2, Zap, HeartHandshake];

export const StatsSection: React.FC = () => {
  return (
    <section id="stats" className="py-20 bg-[#0256C4] dark:bg-[#071D3A] border-y border-transparent dark:border-blue-900/60 text-white relative overflow-hidden transition-colors">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#84CC16]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0A2540]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] font-black uppercase tracking-widest text-[#0A2540] bg-[#84CC16] px-3 py-1 rounded-full shadow-xs">
            MEASURABLE OPERATIONAL IMPACT
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-3">
            Real Efficiency Gains for Your Enterprise
          </h2>
          <p className="text-sm text-blue-100/90 mt-2 max-w-xl mx-auto">
            Explore audited operational outcomes and interactive 12-month scaling projections across African enterprises.
          </p>
        </div>

        {/* 4 Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS_ITEMS.map((item, idx) => {
            const IconComp = statIcons[idx] || Zap;

            return (
              <div
                key={idx}
                className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 dark:border-white/10 hover:border-[#84CC16] hover:bg-white/15 transition-all duration-300 text-center flex flex-col items-center group"
              >
                <div className="w-12 h-12 rounded-xl bg-white/20 text-[#84CC16] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <IconComp className="w-6 h-6" />
                </div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#84CC16] tracking-tight mb-2">
                  {item.value}
                </div>
                <div className="text-base font-bold text-white mb-1.5">{item.label}</div>
                <p className="text-xs text-blue-100/80 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>

        {/* Interactive Growth Projection Dashboard with Recharts */}
        <GrowthProjectionChart />
      </div>
    </section>
  );
};

