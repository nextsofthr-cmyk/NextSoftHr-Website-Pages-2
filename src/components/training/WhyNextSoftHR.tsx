import React from 'react';
import {
  Wrench,
  BookCheck,
  Cpu,
  Layers,
  TrendingUp,
  Target,
} from 'lucide-react';

export const WhyNextSoftHR: React.FC = () => {
  const reasons = [
    {
      icon: Wrench,
      title: 'Practical Learning',
      description: 'Training focused on real workplace applications, actual payroll reconciliations, grievance hearings, and policy templates you use on Monday.',
    },
    {
      icon: BookCheck,
      title: 'Modern Curriculum',
      description: 'Courses designed around modern HR, payroll and workforce practices—continually updated to reflect prevailing tax laws and labor reforms.',
    },
    {
      icon: Cpu,
      title: 'Technology-Driven',
      description: 'Connect human resource knowledge with modern HR technology, analytics dashboards, and intelligent workflow automation.',
    },
    {
      icon: Layers,
      title: 'Flexible Delivery',
      description: 'Self-paced on-demand, interactive virtual suites, live weekend cohorts, and custom on-site corporate training options.',
    },
    {
      icon: TrendingUp,
      title: 'Career Development',
      description: 'Build knowledge and validated credentials for rapid professional advancement, board readiness, and high-impact compensation.',
    },
    {
      icon: Target,
      title: 'Business-Focused',
      description: 'Training designed not merely for theory, but to measurably improve team retention, statutory audit defense, and company performance.',
    },
  ];

  return (
    <section className="py-16 bg-slate-50 dark:bg-[#0B1120] border-b border-slate-200/70 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-50 dark:bg-blue-950/80 text-[#0F4C81] dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">
            The NextSoftHR Difference
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] dark:text-white tracking-tight">
            Why Learn With NextSoftHR?
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Engineered by HR technology veterans and enterprise practitioners to bridge the gap between classroom theory and real workplace execution.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-[#0F172A] rounded-xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:shadow-md hover:border-[#0F4C81]/40 dark:hover:border-blue-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-lg bg-blue-50 dark:bg-slate-800 text-[#0F4C81] dark:text-[#84CC16] flex items-center justify-center mb-4 border border-blue-100/80 dark:border-slate-700">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 text-[11px] font-semibold text-[#65A30D] dark:text-[#84CC16]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16]" />
                  <span>Enterprise Ready Standard</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
