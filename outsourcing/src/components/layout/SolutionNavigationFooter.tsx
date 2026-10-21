import React from 'react';
import { ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react';
import { NavigationPage } from '../../types';
import { SIX_CORE_SOLUTIONS } from './OutsourcingSubHeader';

export interface SolutionNavigationFooterProps {
  currentSolutionId?: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
  onOpenLeadModal?: (service?: string) => void;
}

export const SolutionNavigationFooter: React.FC<SolutionNavigationFooterProps> = ({
  currentSolutionId,
  onNavigate,
  onOpenLeadModal
}) => {
  const otherSolutions = SIX_CORE_SOLUTIONS.filter(s => s.id !== currentSolutionId);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      <div className="bg-gradient-to-br from-slate-900 via-[#0A1E4A] to-[#0F2D6B] text-white rounded-3xl p-6 sm:p-10 border border-blue-800/40 shadow-2xl space-y-8 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-lime-400/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Top Header Row with Return Button */}
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-400/15 border border-lime-400/30 text-lime-400 text-xs font-bold uppercase tracking-wider">
              <span>NextSoftHR Integrated Services</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Looking for More or Ready to Return?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Seamlessly switch between our Six Core Outsourcing Solutions or return to the main Outsourcing overview anytime.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* Primary Return to Outsourcing Home Button */}
            <button
              onClick={() => {
                onNavigate('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-lime-400 hover:bg-lime-300 text-slate-950 font-black text-sm rounded-xl transition-all shadow-lg hover:shadow-lime-400/20 hover:-translate-x-0.5 cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Return to Main Outsourcing Page</span>
            </button>

            {/* Scroll back to top of current page */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 bg-white/10 hover:bg-white/15 text-white font-semibold text-sm rounded-xl border border-white/15 transition-all cursor-pointer"
              title="Scroll to Top of Page"
            >
              <ArrowUp className="w-4 h-4 text-lime-400" />
              <span className="hidden sm:inline">Top</span>
            </button>
          </div>
        </div>

        {/* Other Core Solutions Grid */}
        <div className="relative space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Explore Our Other Core Outsourcing Solutions
            </span>
            <button
              onClick={() => {
                onNavigate('outsourcing-hub');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-bold text-lime-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All Services Hub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherSolutions.map((sol) => {
              const IconComp = sol.icon;
              return (
                <div
                  key={sol.id}
                  onClick={() => {
                    onNavigate(sol.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-lime-400/50 transition-all cursor-pointer group flex items-start gap-3.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/10 text-lime-400 flex items-center justify-center shrink-0 group-hover:bg-lime-400 group-hover:text-slate-950 transition-colors">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-white group-hover:text-lime-300 transition-colors truncate">
                      {sol.title}
                    </h4>
                    <p className="text-xs text-slate-300 line-clamp-2 mt-1 leading-relaxed">
                      {sol.tagline}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-lime-400 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
