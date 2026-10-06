import React, { useState } from 'react';
import {
  Users,
  CreditCard,
  Clock,
  CalendarCheck,
  TrendingUp,
  UserPlus,
  Sparkles,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  TrendingDown,
  ShieldCheck,
} from 'lucide-react';
import { EXPLORER_TABS } from '../data/servicesData';
import { ExplorerTab } from '../types';

interface InteractiveExplorerProps {
  onOpenDemo: () => void;
  onOpenGetStarted: () => void;
}

const tabIcons: Record<string, React.FC<{ className?: string }>> = {
  hr: Users,
  payroll: CreditCard,
  attendance: Clock,
  leave: CalendarCheck,
  performance: TrendingUp,
  recruitment: UserPlus,
  ai: Sparkles,
  analytics: BarChart3,
};

export const InteractiveExplorer: React.FC<InteractiveExplorerProps> = ({ onOpenDemo, onOpenGetStarted }) => {
  const [activeTabId, setActiveTabId] = useState<string>('hr');

  const currentTab: ExplorerTab =
    EXPLORER_TABS.find((tab) => tab.id === activeTabId) || EXPLORER_TABS[0];

  return (
    <section id="explorer" className="py-20 bg-[#F1F5F9]/60 dark:bg-[#0A2540] border-y border-slate-200/80 dark:border-blue-900/60 relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/70 dark:bg-blue-950/80 text-[#0256C4] dark:text-[#84CC16] text-xs font-extrabold uppercase tracking-widest border border-blue-200 dark:border-blue-800 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#84CC16]" />
            INTERACTIVE SUITE DEMO
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2540] dark:text-white tracking-tight mb-4">
            One Platform. Every Workforce Service.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Click across the core functional modules below to preview how NextSofthr unites people, payroll,
            attendance, and strategic decision-making.
          </p>
        </div>

        {/* Horizontal Tabs Bar */}
        <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {EXPLORER_TABS.map((tab) => {
            const IconComp = tabIcons[tab.id] || Users;
            const isActive = tab.id === activeTabId;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#0256C4] text-white shadow-lg shadow-blue-600/20 scale-102 ring-2 ring-blue-400/50'
                    : 'bg-white dark:bg-[#0D2644] text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-blue-900/50 border border-slate-200 dark:border-blue-800 hover:text-[#0256C4] dark:hover:text-[#84CC16]'
                }`}
              >
                <IconComp className={`w-4 h-4 ${isActive ? 'text-[#84CC16]' : 'text-slate-500 dark:text-slate-400'}`} />
                <span>{tab.label}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16] animate-pulse" />}
              </button>
            );
          })}
        </div>

        {/* Dynamic Display Area (Split Layout: Left Content & Right Interactive Mockup + Image) */}
        <div className="bg-white dark:bg-[#07182E] rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 dark:border-blue-900/60 shadow-xl shadow-slate-900/5 transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Description, Features & CTA */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 dark:bg-blue-950 text-[#0256C4] dark:text-[#84CC16] text-xs font-bold border border-blue-100 dark:border-blue-800">
                <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16]" />
                {currentTab.badge}
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0A2540] dark:text-white tracking-tight leading-snug">
                {currentTab.title}
              </h3>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {currentTab.description}
              </p>

              {/* Feature Checklist */}
              <div className="space-y-2.5 pt-2">
                {currentTab.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 stroke-[2.5]" />
                    </div>
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Key Impact Metric Pill */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0D2644] border border-slate-200 dark:border-blue-800/80 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-300 font-semibold">{currentTab.metricLabel}</div>
                  <div className="text-xl sm:text-2xl font-black text-[#0A2540] dark:text-white">{currentTab.metricValue}</div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                    {currentTab.metricChange}
                  </span>
                </div>
              </div>

              {/* CTA Action */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={onOpenGetStarted}
                  className="px-6 py-3 rounded-xl bg-[#0256C4] hover:bg-[#024bb0] text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 group cursor-pointer"
                >
                  <span>Experience {currentTab.label}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={onOpenDemo}
                  className="px-5 py-3 rounded-xl bg-white dark:bg-[#0D2644] hover:bg-slate-50 dark:hover:bg-blue-900/60 text-slate-800 dark:text-slate-200 font-semibold text-sm border border-slate-300 dark:border-blue-700 transition-colors cursor-pointer"
                >
                  Book Live Tour
                </button>
              </div>
            </div>

            {/* Right Column: Combined African Professional Photo + NextSofthr Live UI Mockup */}
            <div className="lg:col-span-7 space-y-4">
              {/* Authentic African Professional Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-md border border-slate-200 dark:border-blue-900 group h-52 sm:h-64">
                <img
                  src={currentTab.imageUrl}
                  alt={currentTab.imageAlt}
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent flex items-end p-4 sm:p-5">
                  <div className="text-white">
                    <span className="text-[11px] font-bold text-[#84CC16] uppercase tracking-wider block">
                      African Enterprise Operations
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-slate-100">{currentTab.imageAlt}</p>
                  </div>
                </div>
              </div>

              {/* Modern NextSofthr Interactive Dashboard Card */}
              <div className="bg-slate-900 dark:bg-[#051528] rounded-2xl p-4 sm:p-6 text-white shadow-xl border border-slate-800 dark:border-blue-900/80">
                <div className="flex items-center justify-between border-b border-slate-800 dark:border-blue-900/60 pb-3 mb-4">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#84CC16]" />
                      {currentTab.mockupData.heading}
                    </h4>
                    <span className="text-xs text-slate-400 font-medium">
                      {currentTab.mockupData.subheading}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-blue-950 text-blue-300 border border-blue-800">
                    Live NextSofthr Node
                  </span>
                </div>

                {/* Dashboard Stats Row */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {currentTab.mockupData.stats.map((stat, idx) => (
                    <div key={idx} className="bg-slate-800/80 dark:bg-[#0A2540] p-2.5 sm:p-3 rounded-xl border border-slate-700/60 dark:border-blue-900/60">
                      <div className="text-[11px] text-slate-400 truncate">{stat.label}</div>
                      <div className="text-base sm:text-lg font-bold text-white mt-0.5">{stat.value}</div>
                      {stat.trend && (
                        <div className="text-[10px] text-[#84CC16] font-semibold truncate mt-0.5">
                          {stat.trend}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Recent Items Stream */}
                <div className="space-y-2">
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Recent Verified Activity:
                  </div>
                  {currentTab.mockupData.recentItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800/50 dark:bg-[#0D2644]/70 hover:bg-slate-800 dark:hover:bg-[#0D2644] border border-slate-700/40 dark:border-blue-900/60 text-xs transition-colors"
                    >
                      <div className="min-w-0 pr-2">
                        <div className="font-semibold text-slate-200 truncate">{item.title}</div>
                        <div className="text-[11px] text-slate-400 truncate">{item.meta}</div>
                      </div>
                      <span
                        className={`shrink-0 px-2 py-0.5 rounded text-[10px] font-bold ${
                          item.statusType === 'success'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : item.statusType === 'warning'
                            ? 'bg-amber-950 text-amber-300 border border-amber-800'
                            : 'bg-blue-950 text-blue-300 border border-blue-800'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
