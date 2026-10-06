import React, { useState } from 'react';
import {
  AlertTriangle,
  Lightbulb,
  Cpu,
  Globe,
  ArrowDown,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { STORY_PHASES } from '../data/contentData';

export const OurStory: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(0);

  const getStageIcon = (iconName: string) => {
    switch (iconName) {
      case 'AlertTriangle':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'Lightbulb':
        return <Lightbulb className="w-5 h-5 text-[#84CC16]" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-blue-400" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-[#84CC16]" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-[#84CC16]" />;
    }
  };

  const stageImages = [
    {
      url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop',
      caption: 'The Reality: African founders navigating disconnected manual paperwork and complex multi-entity payrolls.',
    },
    {
      url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop',
      caption: 'The Innovation: Engineering a modern system reflecting African commercial real-world operations.',
    },
    {
      url: 'https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?q=80&w=800&auto=format&fit=crop',
      caption: 'The Technology: Building an integrated cloud ecosystem uniting payroll, attendance, and HR.',
    },
    {
      url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop',
      caption: 'The Global Horizon: Connecting enterprise teams across African capitals and worldwide branches.',
    },
  ];

  return (
    <section id="our-story" className="py-20 lg:py-28 bg-[#F8FAFC] dark:bg-[#06101E] border-b border-slate-200/80 dark:border-slate-800 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/50 text-xs font-bold text-[#0B3B73] dark:text-[#38BDF8]">
            <span className="w-2 h-2 rounded-full bg-[#84CC16]"></span>
            <span>Our Journey & Evolution</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2540] dark:text-white tracking-tight">
            Built for the Way Businesses Work Today
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            The story behind NextSofthr: how our commitment to solving African operational
            hurdles shaped a world-class platform for ambitious companies everywhere.
          </p>
        </div>

        {/* Interactive Story Progression */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Interactive Stages Timeline */}
          <div className="lg:col-span-7 space-y-4">
            {STORY_PHASES.map((phase, idx) => {
              const isSelected = activeStage === idx;
              return (
                <div
                  key={phase.stage}
                  onClick={() => setActiveStage(idx)}
                  className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 border ${
                    isSelected
                      ? 'bg-white dark:bg-[#0E2038] border-[#0B3B73] dark:border-blue-500 shadow-md ring-1 ring-[#0B3B73]/20 dark:ring-blue-500/30'
                      : 'bg-white/60 dark:bg-[#0A192F]/60 hover:bg-white dark:hover:bg-[#0E2038] border-slate-200 dark:border-slate-800/80'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                          isSelected
                            ? 'bg-[#0B3B73] dark:bg-blue-600 text-white shadow-sm'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {getStageIcon(phase.icon)}
                      </div>
                      <div>
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0B3B73] dark:text-[#84CC16]">
                          {phase.stage}
                        </span>
                        <h3 className="text-lg font-bold text-[#0A2540] dark:text-white">
                          {phase.title}
                        </h3>
                      </div>
                    </div>

                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        isSelected
                          ? 'bg-[#84CC16] text-[#0A2540]'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      Step 0{idx + 1}
                    </span>
                  </div>

                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {phase.description}
                  </p>

                  {/* Bullet points on active stage */}
                  {isSelected && (
                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                      {phase.bulletPoints.map((pt, pIdx) => (
                        <div key={pIdx} className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#84CC16] shrink-0" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {idx < STORY_PHASES.length - 1 && (
                    <div className="hidden lg:flex justify-center -mb-7 pt-4">
                      <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500">
                        <ArrowDown className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Visual Stage Showcase with Professional African Imagery */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="bg-white dark:bg-[#0E2038] rounded-2xl border border-slate-200 dark:border-blue-900/40 overflow-hidden shadow-xl transition-colors duration-300">
              <div className="relative h-72 sm:h-80 overflow-hidden">
                <img
                  src={stageImages[activeStage].url}
                  alt={stageImages[activeStage].caption}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540] via-transparent to-transparent"></div>
                <div className="absolute top-4 right-4 bg-[#0A2540]/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/20">
                  Phase 0{activeStage + 1} of 04
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs leading-snug font-medium">
                  {stageImages[activeStage].caption}
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#0B3B73] dark:text-[#38BDF8]">
                    Focus: {STORY_PHASES[activeStage].stage}
                  </span>
                  <span className="text-xs text-[#84CC16] font-bold bg-[#0A2540] dark:bg-[#050e18] px-2.5 py-0.5 rounded border border-blue-900/40">
                    African Roots • Global Standard
                  </span>
                </div>

                <h4 className="text-xl font-bold text-[#0A2540] dark:text-white">
                  {STORY_PHASES[activeStage].title}
                </h4>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  NextSofthr was engineered on the ground in Africa, resolving daily
                  complexities like multi-tier tax deductions, cash/bank salary splits,
                  and mobile workforces to create the most seamless enterprise system.
                </p>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex gap-1.5">
                    {STORY_PHASES.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        onClick={() => setActiveStage(dotIdx)}
                        className={`h-2 rounded-full transition-all ${
                          activeStage === dotIdx
                            ? 'w-6 bg-[#0B3B73] dark:bg-[#84CC16]'
                            : 'w-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'
                        }`}
                        aria-label={`Jump to stage ${dotIdx + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveStage((prev) => (prev + 1) % STORY_PHASES.length)}
                    className="text-xs font-bold text-[#0B3B73] dark:text-[#84CC16] hover:text-[#0A2540] dark:hover:text-white inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Next Milestone</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
