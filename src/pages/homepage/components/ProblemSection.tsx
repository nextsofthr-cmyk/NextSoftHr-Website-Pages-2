import { 
  AlertTriangle, FolderSync, Clock, CalendarX, UserX, 
  EyeOff, Layers, ShieldAlert, ArrowDown, CheckCircle2 
} from 'lucide-react';
import { PAIN_POINTS } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

interface ProblemSectionProps {
  onOpenGetStarted: () => void;
}

export const ProblemSection = ({ onOpenGetStarted }: ProblemSectionProps) => {
  const { dict } = useLanguage();
  const iconMap: Record<string, any> = {
    AlertTriangle,
    FolderSync,
    Clock,
    CalendarX,
    UserX,
    EyeOff,
    Layers,
    ShieldX: ShieldAlert
  };

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800/80 transition-colors relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-50 dark:bg-rose-950/80 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-900/60 uppercase tracking-wider mb-3 inline-block">
            {dict.problem.badge}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {dict.problem.headline}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg mt-4 leading-relaxed">
            {dict.problem.description}
          </p>
        </div>

        {/* 8 Pain Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PAIN_POINTS.map((pain) => {
            const IconComp = iconMap[pain.icon] || AlertTriangle;
            return (
              <div
                key={pain.num}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-rose-300 dark:hover:border-rose-700/60 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                      PAIN POINT {pain.num}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-colors">
                      <IconComp className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2 leading-snug">
                    {pain.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {pain.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-baseline justify-between text-xs">
                  <span className="font-bold text-rose-600 dark:text-rose-400 text-sm font-mono">{pain.metric}</span>
                  <span className="text-slate-400 dark:text-slate-500 text-[11px] truncate max-w-[140px]">{pain.metricLabel}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* The Transition Bridge: NextSofthr brings everything together */}
        <div className="mt-16 text-center max-w-2xl mx-auto">
          <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-4 animate-bounce">
            <ArrowDown className="w-6 h-6" />
          </div>

          <div className="inline-block p-1 bg-gradient-to-r from-blue-600 via-lime-500 to-blue-600 rounded-3xl shadow-xl">
            <div className="bg-slate-900 dark:bg-slate-950 text-white px-8 py-6 rounded-[22px] flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-left">
                <span className="text-lime-400 text-xs font-bold uppercase tracking-wider block mb-1">
                  {dict.problem.bridgeBadge}
                </span>
                <h3 className="text-2xl font-extrabold text-white tracking-tight">
                  {dict.problem.bridgeHeadline}
                </h3>
                <p className="text-xs text-slate-300 dark:text-slate-400 mt-1 max-w-md">
                  {dict.problem.bridgeDesc}
                </p>
              </div>

              <button
                id="problem-bridge-cta"
                onClick={onOpenGetStarted}
                className="shrink-0 px-6 py-3 bg-lime-400 hover:bg-lime-300 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-md hover:scale-105 cursor-pointer"
              >
                {dict.problem.bridgeCta}
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
