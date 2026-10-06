import { X, Check, ArrowRight, Sparkles } from 'lucide-react';
import { COMPARISON_DATA } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

interface ComparisonSectionProps {
  onOpenDemo: () => void;
  onOpenGetStarted: () => void;
}

export const ComparisonSection = ({ onOpenDemo, onOpenGetStarted }: ComparisonSectionProps) => {
  const { dict } = useLanguage();
  return (
    <section className="py-20 bg-white dark:bg-slate-950 border-y border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 uppercase tracking-wider mb-3 inline-block">
            {dict.comparison.badge}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {dict.comparison.headline}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg mt-4 leading-relaxed">
            {dict.comparison.description}
          </p>
        </div>

        {/* Side-by-Side Comparison Container */}
        <div className="max-w-5xl mx-auto bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg">
          
          {/* Table Header */}
          <div className="grid grid-cols-12 bg-slate-900 dark:bg-slate-950 text-white p-4 sm:p-6 border-b border-slate-800 text-sm font-bold">
            <div className="col-span-4 sm:col-span-3 text-slate-300">
              {dict.comparison.colDomain}
            </div>
            <div className="col-span-4 sm:col-span-4 text-rose-400 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-rose-500/20 flex items-center justify-center text-xs">✕</span>
              <span>{dict.comparison.colTraditional}</span>
            </div>
            <div className="col-span-4 sm:col-span-5 text-lime-400 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-lime-400/20 flex items-center justify-center text-xs">✓</span>
              <span>{dict.comparison.colNextsoft}</span>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {COMPARISON_DATA.map((row, idx) => (
              <div 
                key={idx}
                className="grid grid-cols-12 p-4 sm:p-5 items-center text-xs sm:text-sm hover:bg-white dark:hover:bg-slate-800/60 transition-colors"
              >
                {/* Domain */}
                <div className="col-span-4 sm:col-span-3 font-bold text-slate-900 dark:text-white pr-2">
                  {row.feature}
                </div>

                {/* Traditional */}
                <div className="col-span-4 sm:col-span-4 text-slate-500 dark:text-slate-400 pr-3 flex items-start gap-2">
                  <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span className="leading-snug">{row.traditional}</span>
                </div>

                {/* NextSofthr */}
                <div className="col-span-4 sm:col-span-5 text-slate-900 dark:text-slate-200 font-medium flex items-start gap-2 bg-lime-50/60 dark:bg-lime-950/20 p-2.5 rounded-xl border border-lime-200/60 dark:border-lime-900/40">
                  <Check className="w-4 h-4 text-lime-600 dark:text-lime-400 shrink-0 mt-0.5 stroke-[2.5]" />
                  <span className="leading-snug text-slate-800 dark:text-slate-200">{row.nextsoft}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Comparison Footer CTA */}
          <div className="p-6 bg-slate-900 dark:bg-slate-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-lime-400 text-slate-950">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">{dict.comparison.footerTitle}</h4>
                <p className="text-xs text-slate-400">{dict.comparison.footerSubtitle}</p>
              </div>
            </div>

            <div className="flex gap-2.5 w-full sm:w-auto">
              <button
                onClick={onOpenDemo}
                className="flex-1 sm:flex-initial px-4 py-2 text-xs font-bold text-slate-300 hover:text-white border border-slate-700 rounded-xl transition-colors cursor-pointer"
              >
                {dict.comparison.liveDemo}
              </button>
              <button
                onClick={onOpenGetStarted}
                className="flex-1 sm:flex-initial px-5 py-2 text-xs font-bold text-slate-950 bg-lime-400 hover:bg-lime-300 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
              >
                <span>{dict.comparison.switchCta}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
