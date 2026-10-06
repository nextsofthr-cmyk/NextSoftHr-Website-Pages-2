import React, { useState } from 'react';
import { LEARNING_PATHS } from '../data/academyData';
import { LearningPath } from '../types';
import {
  GraduationCap,
  Clock,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';

interface LearningPathsSectionProps {
  onStartPath: (path: LearningPath) => void;
}

export const LearningPathsSection: React.FC<LearningPathsSectionProps> = ({
  onStartPath,
}) => {
  const [activePathId, setActivePathId] = useState(LEARNING_PATHS[0].id);

  const selectedPath =
    LEARNING_PATHS.find((p) => p.id === activePathId) || LEARNING_PATHS[0];

  return (
    <section id="learning-paths" className="py-16 bg-white dark:bg-[#0F172A] border-b border-slate-200/70 dark:border-slate-800 scroll-mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-50 dark:bg-blue-950/80 text-[#0F4C81] dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">
            Structured Progression
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] dark:text-white tracking-tight">
            Choose Your Learning Path
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Progress systematically from operational basics to strategic executive impact with interconnected masterclasses.
          </p>
        </div>

        {/* Path Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {LEARNING_PATHS.map((path) => {
            const isSelected = path.id === activePathId;
            return (
              <button
                key={path.id}
                onClick={() => setActivePathId(path.id)}
                className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#0F4C81] dark:bg-blue-900 text-white border-[#0F4C81] dark:border-blue-600 shadow-md'
                    : 'bg-slate-50 dark:bg-slate-800/70 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      isSelected
                        ? 'bg-blue-800 dark:bg-blue-950 text-lime-300'
                        : 'bg-slate-200/80 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {path.badge}
                  </span>
                  <GraduationCap
                    className={`w-4 h-4 ${
                      isSelected ? 'text-[#84CC16]' : 'text-slate-400'
                    }`}
                  />
                </div>
                <h3
                  className={`text-sm font-bold leading-tight ${
                    isSelected ? 'text-white' : 'text-slate-900 dark:text-white'
                  }`}
                >
                  {path.title}
                </h3>
                <p
                  className={`text-xs mt-1 line-clamp-2 ${
                    isSelected ? 'text-slate-200' : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {path.targetRole}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Path Visual Progression Canvas */}
        <div className="bg-slate-50/70 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 transition-colors">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-xs font-bold text-[#65A30D] dark:text-[#84CC16] uppercase tracking-wider">
                {selectedPath.badge}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] dark:text-white mt-0.5">
                {selectedPath.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
                {selectedPath.description}
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="bg-white dark:bg-slate-800 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 dark:text-slate-500 block text-[10px] uppercase font-bold">Total Depth</span>
                <span className="font-bold text-[#0F4C81] dark:text-blue-300">{selectedPath.totalDuration}</span>
              </div>
              <div className="bg-white dark:bg-slate-800 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 dark:text-slate-500 block text-[10px] uppercase font-bold">Credential</span>
                <span className="font-bold text-[#65A30D] dark:text-[#84CC16]">Specialist Diploma</span>
              </div>
            </div>
          </div>

          {/* Connected Steps Progression Line */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {selectedPath.steps.map((step, idx) => {
              const isLast = idx === selectedPath.steps.length - 1;
              return (
                <div key={idx} className="relative flex flex-col">
                  {/* Step Container */}
                  <div className="bg-white dark:bg-slate-800/90 rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-2xs h-full flex flex-col justify-between relative z-10 group hover:border-[#0F4C81] dark:hover:border-blue-400 transition-all">
                    <div>
                      {/* Step Number Tag */}
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-950 text-[#0F4C81] dark:text-blue-300 text-xs font-extrabold flex items-center justify-center border border-blue-200 dark:border-blue-800">
                          {step.order}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500">
                          {step.duration}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#0F4C81] dark:group-hover:text-[#84CC16] transition-colors leading-snug">
                        {step.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-700/80 flex items-center gap-1 text-[11px] font-medium text-[#65A30D] dark:text-[#84CC16]">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Stage {step.order} Milestone</span>
                    </div>
                  </div>

                  {/* Desktop Step Arrow Connector (hide on last item) */}
                  {!isLast && (
                    <div className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 z-20 text-[#0F4C81] dark:text-blue-400 bg-white dark:bg-slate-800 rounded-full p-0.5 shadow-2xs border border-slate-200 dark:border-slate-700">
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Action Footer */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
              <span className="w-2 h-2 rounded-full bg-[#84CC16]" />
              <span>Includes cohort mentoring, practical templates, and capstone project review.</span>
            </div>

            <button
              onClick={() => onStartPath(selectedPath)}
              className="w-full sm:w-auto px-6 py-3 text-xs font-bold text-white bg-[#0F4C81] hover:bg-[#0B3C68] dark:bg-blue-600 dark:hover:bg-blue-700 rounded-md shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Start Your Learning Path</span>
              <ArrowRight className="w-4 h-4 text-[#84CC16]" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
