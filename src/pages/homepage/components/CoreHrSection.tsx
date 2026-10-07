import { useState } from 'react';
import { 
  Users, FileText, Network, ShieldCheck, BookCheck, Repeat, 
  UserPlus, UserMinus, Target, BarChart4, CheckCircle2, ArrowRight,
  Layers, BadgeCheck, Search, Building
} from 'lucide-react';
import { CORE_HR_FEATURES } from '../data/mockData';

interface CoreHrSectionProps {
  onOpenDemo: () => void;
}

export const CoreHrSection = ({ onOpenDemo }: CoreHrSectionProps) => {
  const [activeFeature, setActiveFeature] = useState(CORE_HR_FEATURES[0]);

  const iconMap: Record<string, any> = {
    Users,
    FileText,
    Network,
    ShieldCheck,
    BookCheck,
    Repeat,
    UserPlus,
    UserMinus,
    Target,
    BarChart4
  };

  return (
    <section id="core-hr" className="py-20 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 uppercase tracking-wider mb-3 inline-block">
              Core Workforce Infrastructure
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Everything You Need to Manage Your Workforce.
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg mt-3 leading-relaxed">
              Consolidate every stage of the employee lifecycle into a single, intuitive source of truth with automated compliance and intelligent organizational structures.
            </p>
          </div>

          <button
            onClick={onOpenDemo}
            className="self-start lg:self-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-md flex items-center gap-2"
          >
            <span>Explore Core HR Demo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Interactive Feature Visual Split Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          
          {/* Left Column: Interactive Feature Selector Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CORE_HR_FEATURES.map((feat) => {
              const Icon = iconMap[feat.icon] || Users;
              const isSelected = activeFeature.id === feat.id;
              return (
                <button
                  key={feat.id}
                  onClick={() => setActiveFeature(feat)}
                  className={`p-4 rounded-2xl text-left transition-all border ${
                    isSelected
                      ? 'bg-white dark:bg-slate-900 border-blue-600 dark:border-blue-500 shadow-md ring-2 ring-blue-600/20'
                      : 'bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-xl transition-colors ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-xs text-slate-900 dark:text-white leading-tight">
                      {feat.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {feat.desc}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: Live Interactive Profile & Org Preview */}
          <div className="lg:col-span-6 sticky top-24">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xl overflow-hidden p-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-lime-400 p-0.5">
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80" 
                      alt="HR Consultant & Executive" 
                      className="w-full h-full object-cover rounded-[14px]"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-extrabold text-base text-slate-900 dark:text-white">Dr. Elena Rostova</h4>
                      <BadgeCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Staff AI Scientist • Emp ID: NX-1049</p>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-bold bg-lime-100 dark:bg-lime-950/80 text-lime-800 dark:text-lime-300 border border-lime-300 dark:border-lime-800">
                  Full-Time Permanent
                </span>
              </div>

              {/* Dynamic content reflecting selected feature */}
              <div className="space-y-4">
                <div className="p-4 bg-blue-50/60 dark:bg-blue-950/40 rounded-2xl border border-blue-100 dark:border-blue-900/50">
                  <span className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider block mb-1">
                    Focused Capability: {activeFeature.title}
                  </span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {activeFeature.desc}
                  </p>
                </div>

                {/* Simulated Org / Profile Details */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-100 dark:border-slate-700/80">
                    <span className="text-slate-400 dark:text-slate-500 block text-[10px] uppercase font-semibold">Department</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">Product & Research</span>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-100 dark:border-slate-700/80">
                    <span className="text-slate-400 dark:text-slate-500 block text-[10px] uppercase font-semibold">Reports To</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">VP of AI Systems</span>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-100 dark:border-slate-700/80">
                    <span className="text-slate-400 dark:text-slate-500 block text-[10px] uppercase font-semibold">Work Location</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">Zurich HQ (Hybrid)</span>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-100 dark:border-slate-700/80">
                    <span className="text-slate-400 dark:text-slate-500 block text-[10px] uppercase font-semibold">Document Vault</span>
                    <span className="font-bold text-lime-700 dark:text-lime-400 text-sm">7/7 Verified</span>
                  </div>
                </div>

                {/* Audit & Policy sign-off status */}
                <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-100 dark:border-slate-700/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-lime-600 dark:text-lime-400" />
                    <span className="text-slate-700 dark:text-slate-300 font-medium">2026 Global Code of Conduct Signed</span>
                  </div>
                  <span className="font-mono text-[11px] text-slate-400 dark:text-slate-500">Timestamp: 09/01/26</span>
                </div>

                {/* Consultant imagery snippet */}
                <div className="pt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    Multi-tier Department Trees Supported
                  </span>
                  <span className="text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer">
                    View Org Chart Preview →
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
