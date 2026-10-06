import React, { useState } from 'react';
import {
  Compass,
  Sliders,
  Link2,
  Cpu,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Clock,
} from 'lucide-react';
import { PROCESS_STEPS } from '../data/servicesData';

interface HowItWorksProps {
  onOpenDemo: () => void;
}

const stepIcons = [Compass, Sliders, Link2, Cpu, TrendingUp];

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenDemo }) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  return (
    <section id="how-it-works" className="py-20 bg-white dark:bg-[#0A2540] relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/80 text-[#0256C4] dark:text-[#84CC16] text-xs font-extrabold uppercase tracking-widest border border-blue-100 dark:border-blue-800 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16]" />
            5-STEP ONBOARDING ROADMAP
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2540] dark:text-white tracking-tight mb-4">
            Simple Setup. Powerful Results.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Our structured African implementation methodology guarantees rapid go-live without disrupting your active
            payroll cycles or losing historical records.
          </p>
        </div>

        {/* Desktop Horizontal Timeline (Steps 01 - 05) */}
        <div className="hidden lg:block relative mb-12">
          {/* Connecting Track Line */}
          <div className="absolute top-1/2 -translate-y-1/2 left-8 right-8 h-1 bg-slate-200 dark:bg-blue-900/60 z-0">
            <div
              className="h-full bg-gradient-to-r from-[#0256C4] to-[#84CC16] transition-all duration-500"
              style={{ width: `${(activeStepIndex / (PROCESS_STEPS.length - 1)) * 100}%` }}
            />
          </div>

          <div className="grid grid-cols-5 gap-4 relative z-10">
            {PROCESS_STEPS.map((step, idx) => {
              const IconComp = stepIcons[idx] || Compass;
              const isSelected = activeStepIndex === idx;
              const isPassed = idx <= activeStepIndex;

              return (
                <button
                  key={step.number}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`text-left p-5 rounded-2xl transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-white dark:bg-[#0D2644] shadow-xl shadow-blue-500/10 border-2 border-[#0256C4] dark:border-[#84CC16] scale-103'
                      : 'bg-slate-50 dark:bg-[#07182E] hover:bg-white dark:hover:bg-[#0D2644] border border-slate-200 dark:border-blue-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-2xl font-mono font-black ${
                        isSelected ? 'text-[#0256C4] dark:text-[#84CC16]' : 'text-slate-400 dark:text-blue-900'
                      }`}
                    >
                      {step.number}
                    </span>
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-[#0256C4] text-white'
                          : isPassed
                          ? 'bg-blue-50 dark:bg-blue-950 text-[#0256C4] dark:text-blue-300'
                          : 'bg-white dark:bg-[#0A2540] text-slate-400 border border-slate-200 dark:border-blue-900'
                      }`}
                    >
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>

                  <h4 className="text-base font-bold text-[#0A2540] dark:text-white mb-1">{step.title}</h4>
                  <div className="text-[11px] font-semibold text-[#84CC16] uppercase tracking-wider mb-2">
                    {step.subtitle}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-300 line-clamp-3 mb-3">{step.description}</p>

                  <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    <Clock className="w-3 h-3 text-[#0256C4] dark:text-blue-400" />
                    <span>{step.timeframe}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Step Detailed Card */}
        <div className="bg-[#0A2540] dark:bg-[#07182E] text-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl border border-transparent dark:border-blue-900 relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#0256C4]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-[#84CC16]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-[#84CC16] text-[#0A2540] font-black text-xs">
                  STEP {PROCESS_STEPS[activeStepIndex].number} OF 05
                </span>
                <span className="text-slate-300 text-xs font-semibold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#84CC16]" /> Estimated: {PROCESS_STEPS[activeStepIndex].timeframe}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {PROCESS_STEPS[activeStepIndex].number} — {PROCESS_STEPS[activeStepIndex].title}:{' '}
                <span className="text-[#84CC16]">{PROCESS_STEPS[activeStepIndex].subtitle}</span>
              </h3>

              <p className="text-base text-slate-200 leading-relaxed max-w-3xl">
                {PROCESS_STEPS[activeStepIndex].description}
              </p>

              <div className="pt-3">
                <div className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2.5">
                  Key Milestones &amp; Deliverables:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {PROCESS_STEPS[activeStepIndex].deliverables.map((item, i) => (
                    <div
                      key={i}
                      className="bg-slate-800/80 dark:bg-[#0D2644] p-3 rounded-xl border border-slate-700/60 dark:border-blue-900/60 text-xs text-slate-200 flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4 text-[#84CC16] shrink-0" />
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-center items-start lg:items-end gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-700/80 dark:border-blue-900/60">
              <button
                onClick={onOpenDemo}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#0256C4] hover:bg-[#024bb0] text-white font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Custom Timeline</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-xs text-slate-400 text-center lg:text-right">
                Dedicated local Customer Success Manager assigned to your account.
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Vertical Timeline for smaller screens */}
        <div className="lg:hidden space-y-4">
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.number}
              onClick={() => setActiveStepIndex(idx)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                activeStepIndex === idx
                  ? 'bg-blue-50/80 dark:bg-[#0D2644] border-[#0256C4] dark:border-[#84CC16] shadow-md'
                  : 'bg-slate-50 dark:bg-[#07182E] border-slate-200 dark:border-blue-900/60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono font-black text-xl text-[#0256C4] dark:text-[#84CC16]">{step.number}</span>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{step.timeframe}</span>
              </div>
              <h4 className="text-base font-bold text-[#0A2540] dark:text-white">{step.title}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
