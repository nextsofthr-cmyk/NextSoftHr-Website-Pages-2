import { useState } from 'react';
import { 
  Building2, Users2, Building, Landmark, Globe, CheckCircle2, 
  ArrowRight, ShieldCheck, MapPin, Compass 
} from 'lucide-react';
import { BUSINESS_SEGMENTS, GLOBAL_LOCATIONS } from '../data/mockData';
import { GlobalComplianceMap } from './GlobalComplianceMap';

interface BusinessSizeGlobalProps {
  onOpenDemo: () => void;
  onOpenGetStarted: () => void;
}

export const BusinessSizeGlobalSection = ({ onOpenDemo, onOpenGetStarted }: BusinessSizeGlobalProps) => {
  const [selectedSegment, setSelectedSegment] = useState(BUSINESS_SEGMENTS[1]);
  const [selectedLocation, setSelectedLocation] = useState(GLOBAL_LOCATIONS[0]);

  const iconMap: Record<string, any> = {
    Building2,
    Users2,
    Building,
    Landmark
  };

  return (
    <section id="global" className="py-20 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section 1: Scalability for Any Business Size */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 uppercase tracking-wider mb-3 inline-block">
              Architected for Every Stage of Growth
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Tailored for Businesses of Any Scale.
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg mt-3 leading-relaxed">
              Whether you are paying your first 5 team members or orchestrating a global enterprise across 14 subsidiaries, NextSofthr adapts to your governance requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BUSINESS_SEGMENTS.map((seg) => {
              const IconComp = iconMap[seg.icon] || Building;
              const isSelected = selectedSegment.id === seg.id;
              return (
                <div
                  key={seg.id}
                  onClick={() => setSelectedSegment(seg)}
                  className={`bg-white dark:bg-slate-900 p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-blue-600 dark:border-blue-500 shadow-lg ring-2 ring-blue-600/20'
                      : 'border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {seg.range}
                      </span>
                      <div className={`p-2.5 rounded-xl ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
                      }`}>
                        <IconComp className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">
                      {seg.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                      {seg.desc}
                    </p>

                    <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-3">
                      {seg.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400 shrink-0" />
                          <span className="text-[11px] font-medium">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                    <a
                      href="/sign-in?mode=signup"
                      className="w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/20 cursor-pointer bg-blue-600 text-white hover:bg-blue-700"
                    >
                      <span>Start Free Trial</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>

                    <a
                      href="https://demo.scriptmaster.store/login"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 rounded-xl text-xs font-bold text-slate-900 bg-lime-400 hover:bg-lime-300 dark:bg-lime-400 dark:hover:bg-lime-300 dark:text-slate-950 transition-all flex items-center justify-center gap-1.5 shadow-xs hover:shadow-sm cursor-pointer group"
                    >
                      <span>Explore Demo</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-900 dark:text-slate-950 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Global Business Platform */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
          
          <div className="max-w-3xl mb-12">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-lime-400/20 text-lime-300 border border-lime-400/30 uppercase tracking-wider mb-3 inline-block">
              Worldwide Jurisdiction Engine
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Built for Modern Businesses Anywhere in the World.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
              Multi-currency disbursements, localized statutory tax filings, timezone-aware rosters, and multi-language employee portals — all configured out-of-the-box.
            </p>
          </div>

          {/* Interactive Global Network Map Visualization */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Locations List */}
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Active Operational Hubs (Click to preview localized rules):
              </span>
              {GLOBAL_LOCATIONS.map((loc) => {
                const isSelected = selectedLocation.city === loc.city;
                return (
                  <div
                    key={loc.city}
                    onClick={() => setSelectedLocation(loc)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-blue-900/60 border-lime-400 text-white shadow-md'
                        : 'bg-slate-800/60 border-slate-700/80 hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-950 flex items-center justify-center font-bold text-xs text-lime-400">
                        {loc.currency}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-white">{loc.city}, {loc.country}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{loc.regime}</div>
                      </div>
                    </div>

                    <div className="text-right text-xs">
                      <span className="font-bold text-lime-400 font-mono">{loc.users}</span>
                      <span className="text-[10px] text-slate-400 block">Employees</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Interactive Jurisdiction Details Cockpit */}
            <div className="lg:col-span-7 bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-5 h-5 text-lime-400" />
                  <div>
                    <h4 className="font-bold text-lg text-white">
                      {selectedLocation.city} Regional Entity
                    </h4>
                    <p className="text-xs text-slate-400">Compliant with {selectedLocation.country} Department of Labor</p>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-bold bg-lime-400/10 text-lime-300 border border-lime-400/30">
                  {selectedLocation.currency} Currency Vault
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Statutory Framework</span>
                  <span className="font-bold text-white text-sm">{selectedLocation.regime}</span>
                </div>
                <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Disbursement Rails</span>
                  <span className="font-bold text-lime-400 text-sm">SEPA / Swift / Local Clearing</span>
                </div>
                <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Local Leave Rules</span>
                  <span className="font-bold text-white text-sm">Auto-Accrued (Statutory)</span>
                </div>
                <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Tax Bracket Updates</span>
                  <span className="font-bold text-lime-400 text-sm">Autonomous Live Sync</span>
                </div>
              </div>

              <div className="p-4 bg-blue-950/60 rounded-2xl border border-blue-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-200">
                  <ShieldCheck className="w-4 h-4 text-lime-400 shrink-0" />
                  <span>Cross-border tax treaties and dual-residency rules audited automatically.</span>
                </div>
                <button
                  onClick={onOpenDemo}
                  className="font-bold text-lime-400 hover:underline shrink-0 ml-2"
                >
                  Configure Entity →
                </button>
              </div>
            </div>

          </div>

          {/* Interactive Global Compliance Partner SVG Map */}
          <GlobalComplianceMap onOpenDemo={onOpenDemo} />

        </div>

      </div>
    </section>
  );
};
