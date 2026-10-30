import React from 'react';
import {
  Users,
  Building2,
  Clock,
  CalendarCheck,
  Wallet,
  Smartphone,
  BarChart3,
  BellRing,
  ShieldCheck,
  MonitorSmartphone,
  Cloud,
  Sparkles,
} from 'lucide-react';
import { ESSENTIAL_FEATURES } from '../data/pricingData';
import { CardSlider } from './CardSlider';

const ESSENTIALS_PER_VIEW = { base: 1, sm: 2, lg: 4, xl: 4 };

const ICONS_MAP: Record<string, React.ElementType> = {
  Users,
  Building2,
  Clock,
  CalendarCheck,
  Wallet,
  Smartphone,
  BarChart3,
  BellRing,
  ShieldCheck,
  MonitorSmartphone,
  Cloud,
  Sparkles,
};

export const IncludedEssentials: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-white dark:bg-[#0B132B] border-t border-slate-100 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#0265DC] dark:text-blue-300 text-xs font-bold mb-3 border border-blue-200/50 dark:border-blue-800/60">
            <span>Unified Platform Foundation</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B132B] dark:text-white tracking-tight">
            Powerful Essentials Included Across NextSofthr
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Every subscription tier includes our robust core architecture, built to eliminate
            friction and maintain compliance from day one.
          </p>
        </div>

        {/* 12 Features Slider (4 per slide with bottom pagination & arrows only) */}
        <CardSlider
          id="essentials-slider"
          ariaLabel="Included essentials"
          items={ESSENTIAL_FEATURES}
          perView={ESSENTIALS_PER_VIEW}
          showSideArrows={false}
          renderItem={(item, idx) => {
            const Icon = ICONS_MAP[item.iconName] || Users;
            return (
              <div
                id={`essential-feature-${idx}`}
                className="p-5 rounded-2xl bg-[#F8FAFC] dark:bg-[#111C38] border border-slate-200/80 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all duration-200 group h-full flex flex-col justify-start"
              >
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#0B132B] border border-slate-200/80 dark:border-slate-700 flex items-center justify-center text-[#0265DC] dark:text-blue-400 group-hover:bg-[#0265DC] group-hover:text-white transition-colors shadow-xs mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display text-base font-bold text-slate-900 dark:text-white group-hover:text-[#0265DC] dark:group-hover:text-blue-300 transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed flex-1">
                  {item.description}
                </p>
              </div>
            );
          }}
        />
      </div>
    </section>
  );
};
