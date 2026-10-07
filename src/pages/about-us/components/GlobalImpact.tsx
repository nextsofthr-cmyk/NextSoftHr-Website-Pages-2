import React from 'react';
import {
  Globe,
  ArrowRight,
  TrendingUp,
  MapPin,
  CheckCircle2,
  Building2,
  ShieldCheck
} from 'lucide-react';

interface GlobalImpactProps {
  onOpenDemo: () => void;
}

export const GlobalImpact: React.FC<GlobalImpactProps> = ({ onOpenDemo }) => {
  const globalCorridors = [
    {
      region: 'Africa',
      role: 'Foundational Anchor',
      hubs: 'Lagos • Nairobi • Johannesburg • Accra • Kigali',
      detail: 'Tailored statutory calculations, local tax regimes, and multi-branch operations.',
    },
    {
      region: 'Europe',
      role: 'Cross-Border Operations',
      hubs: 'London • Berlin • Paris',
      detail: 'Supporting European headquarters managing African branches and remote contractors.',
    },
    {
      region: 'Middle East',
      role: 'Trade & Logistics Bridge',
      hubs: 'Dubai • Riyadh • Doha',
      detail: 'Harmonizing workforce schedules between Gulf logistics hubs and African suppliers.',
    },
    {
      region: 'Asia',
      role: 'Manufacturing & Tech Hubs',
      hubs: 'Singapore • Tokyo • Mumbai',
      detail: 'Connecting multi-national supply chain teams and hardware technology partners.',
    },
    {
      region: 'North America',
      role: 'Enterprise & Diaspora',
      hubs: 'New York • Toronto • San Francisco',
      detail: 'Multi-currency corporate disbursements and international compliant payroll.',
    },
    {
      region: 'Global Markets',
      role: 'Every Modern Workplace',
      hubs: 'Worldwide Distributed Teams',
      detail: 'Any enterprise seeking unified HR, streamlined attendance, and transparent operations.',
    },
  ];

  return (
    <section id="global-impact" className="py-20 lg:py-28 bg-[#F8FAFC] dark:bg-[#071322] border-b border-slate-200/80 dark:border-slate-800 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/50 text-xs font-bold text-[#0B3B73] dark:text-[#38BDF8]">
            <span className="w-2 h-2 rounded-full bg-[#84CC16]"></span>
            <span>Worldwide Trajectory</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2540] dark:text-white tracking-tight">
            From Africa to the <span className="text-[#0B3B73] dark:text-[#38BDF8]">Global Business Community</span>
          </h2>

          <div className="p-6 bg-white dark:bg-[#0E2038] rounded-2xl border border-slate-200 dark:border-blue-900/40 shadow-sm max-w-2xl mx-auto">
            <p className="text-base sm:text-lg font-bold text-[#0A2540] dark:text-white leading-snug">
              “Our ambition is to help businesses everywhere simplify the way they manage people and operations.”
            </p>
          </div>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Starting from the fast-evolving commercial centers of Africa, NextSofthr is
            engineered to power cross-border enterprises across continents with seamless
            multi-currency and multi-jurisdiction technology.
          </p>
        </div>

        {/* Global Progression Flow Cards */}
        <div className="relative mb-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
            {globalCorridors.map((item, idx) => (
              <div
                key={item.region}
                className="bg-white dark:bg-[#0E2038] border border-slate-200/90 dark:border-blue-900/40 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-[#0B3B73]/40 dark:hover:border-blue-500 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-[#0B3B73] dark:text-[#38BDF8]">
                      Stage 0{idx + 1}
                    </span>
                    <Globe className="w-4 h-4 text-[#84CC16]" />
                  </div>

                  <h3 className="font-bold text-base text-[#0A2540] dark:text-white group-hover:text-[#0B3B73] dark:group-hover:text-[#84CC16] transition-colors">
                    {item.region}
                  </h3>

                  <div className="text-[11px] font-semibold text-[#84CC16] bg-[#0A2540] dark:bg-[#050e18] px-2 py-0.5 rounded mt-1.5 inline-block border border-blue-900/30">
                    {item.role}
                  </div>

                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-2">
                    {item.hubs}
                  </div>

                  <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    {item.detail}
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500">
                  <span>Connected Hub</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16]"></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* International Corporate Infrastructure Showcase */}
        <div className="bg-[#0A2540] dark:bg-[#06101E] rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-transparent dark:border-blue-900/40 flex flex-col md:flex-row items-center justify-between gap-8 transition-colors duration-300">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#84CC16]">
              Global Standard Compliance
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Scale Your Multi-Country Workforce with Confidence
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Whether you are an African enterprise expanding across West and East Africa or a global corporation managing talent across emerging markets, NextSofthr ensures data sovereignty, multi-currency processing, and auditable payroll records.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={onOpenDemo}
              className="bg-[#84CC16] hover:bg-[#74be12] text-[#0A2540] font-bold text-xs px-6 py-3.5 rounded-xl shadow transition-all cursor-pointer"
            >
              Explore Global Enterprise Features
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
