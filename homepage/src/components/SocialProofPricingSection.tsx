import { 
  Star, Play, Sparkles 
} from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';
import { HrSavingsCalculator } from './HrSavingsCalculator';
import { GlobalImpactStats } from './GlobalImpactStats';

const AVATAR_COLORS = [
  'bg-blue-600 text-white',
  'bg-emerald-600 text-white',
  'bg-indigo-600 text-white',
  'bg-violet-600 text-white',
  'bg-amber-600 text-white',
  'bg-teal-600 text-white',
  'bg-rose-600 text-white',
  'bg-cyan-600 text-white',
];

interface SocialProofPricingProps {
  onOpenDemo: () => void;
  onOpenGetStarted: () => void;
  onOpenExpert: () => void;
}

export const SocialProofPricingSection = ({
  onOpenDemo,
  onOpenGetStarted,
  onOpenExpert
}: SocialProofPricingProps) => {

  const handleScrollToCalculator = () => {
    const el = document.getElementById('savings-calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Module 1: Social Proof & Testimonials */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="flex items-center justify-center gap-1.5 text-amber-500 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400" />
              ))}
              <span className="text-slate-900 dark:text-white font-extrabold text-sm ml-2">4.9 / 5.0</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Trusted by 1,200+ Forward-Thinking Companies.
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg mt-3 leading-relaxed">
              Discover how HR directors, business owners, CFOs, and people leaders worldwide modernize operations with NextSofthr.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 text-amber-400 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic mb-6">
                    “{t.quote}”
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs select-none shadow-xs border border-slate-200 dark:border-slate-700 shrink-0 ${
                      AVATAR_COLORS[idx % AVATAR_COLORS.length]
                    }`}
                    aria-label={t.author}
                  >
                    {t.author
                      .split(' ')
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join('')
                      .toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white">{t.author}</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{t.role}</p>
                    <p className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">{t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Module 2: Interactive Demo Video Showcase */}
        <div className="mb-24">
          <div className="max-w-5xl mx-auto bg-slate-900 rounded-3xl p-6 sm:p-12 border border-slate-800 text-white shadow-2xl relative overflow-hidden text-center">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-lime-400/20 text-lime-300 border border-lime-400/30 uppercase tracking-wider mb-3 inline-block">
              Interactive Product Tour
            </span>
            <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              See NextSofthr in Action.
            </h3>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mt-2 mb-8 leading-relaxed">
              Watch how quickly you can onboard a new hire, run multi-country payroll, and generate board-ready reports.
            </p>

            {/* Video preview container */}
            <div className="relative max-w-3xl mx-auto rounded-2xl overflow-hidden border border-slate-700 shadow-2xl group cursor-pointer" onClick={onOpenDemo}>
              <img
                src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80"
                alt="NextSofthr in Action"
                className="w-full h-72 sm:h-96 object-cover brightness-75 group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Play button overlay */}
              <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-blue-500 transition-all ring-4 ring-white/20">
                  <Play className="w-8 h-8 fill-white ml-1 text-white" />
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-md p-3 rounded-xl border border-white/10 flex items-center justify-between text-xs text-slate-300">
                <span>NextSofthr Enterprise Walkthrough (3 mins)</span>
                <span className="text-lime-400 font-bold">Click to Launch Full Demo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Module 3: Global Impact Statistics with Animated Counters */}
        <GlobalImpactStats
          onOpenDemo={onOpenDemo}
          onOpenGetStarted={onOpenGetStarted}
          onScrollToCalculator={handleScrollToCalculator}
        />

        {/* Module 4: Interactive HR Savings & ROI Calculator */}
        <HrSavingsCalculator
          onOpenGetStarted={onOpenGetStarted}
          onOpenDemo={onOpenDemo}
        />
      </div>
    </section>
  );
};
