import React, { useState } from 'react';
import { ECOSYSTEM_MODULES } from '../data/partnerData';
import { 
  Building, 
  Users, 
  DollarSign, 
  Clock, 
  Calendar, 
  CalendarDays, 
  UserPlus, 
  BarChart3, 
  Smartphone, 
  Briefcase, 
  Bot, 
  Sparkles, 
  PieChart, 
  Layers, 
  FileCheck, 
  Bell,
  CheckCircle2,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { EcosystemModule } from '../types';
import { useLanguage } from '../context/LanguageContext';

export const ProductEcosystem: React.FC = () => {
  const { strings } = useLanguage();
  const eco = strings.ecosystem;
  const [selectedModule, setSelectedModule] = useState<EcosystemModule>(ECOSYSTEM_MODULES[2]); // Default to Payroll Automation

  // Map icon strings to Lucide components
  const getIcon = (name: string) => {
    switch (name) {
      case 'Building': return Building;
      case 'Users': return Users;
      case 'DollarSign': return DollarSign;
      case 'Clock': return Clock;
      case 'Calendar': return Calendar;
      case 'CalendarDays': return CalendarDays;
      case 'UserPlus': return UserPlus;
      case 'BarChart3': return BarChart3;
      case 'Smartphone': return Smartphone;
      case 'Briefcase': return Briefcase;
      case 'Bot': return Bot;
      case 'Sparkles': return Sparkles;
      case 'PieChart': return PieChart;
      case 'Layers': return Layers;
      case 'FileCheck': return FileCheck;
      case 'Bell': return Bell;
      default: return Layers;
    }
  };

  return (
    <section id="ecosystem" className="py-24 bg-slate-100/90 dark:bg-[#040E1F] border-t border-slate-200 dark:border-blue-900/60 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/60 border border-blue-200 dark:border-blue-700/60 text-xs font-bold text-blue-800 dark:text-[#B8F010] mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>{eco.tag}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            {eco.title}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            {eco.subtitle}
          </p>
        </div>

        {/* Interactive Hub-and-Spoke Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left / Center Grid of Modules (16 Nodes) */}
          <div className="lg:col-span-8 bg-white dark:bg-[#030914] rounded-3xl border-2 border-slate-200 dark:border-blue-800/80 p-6 sm:p-8 shadow-sm dark:shadow-2xl relative overflow-hidden transition-colors duration-300">
            
            {/* Animated Connection Glow Lines in Background */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <line x1="50%" y1="50%" x2="20%" y2="20%" stroke="#B8F010" strokeWidth="2" strokeDasharray="6 6" />
                <line x1="50%" y1="50%" x2="80%" y2="20%" stroke="#2563eb" strokeWidth="2" strokeDasharray="6 6" />
                <line x1="50%" y1="50%" x2="20%" y2="80%" stroke="#2563eb" strokeWidth="2" strokeDasharray="6 6" />
                <line x1="50%" y1="50%" x2="80%" y2="80%" stroke="#B8F010" strokeWidth="2" strokeDasharray="6 6" />
              </svg>
            </div>

            {/* Central Brand Core Indicator */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200 dark:border-blue-900/80">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0E356A] to-[#071D3E] border border-[#B8F010] flex items-center justify-center font-black text-[#B8F010] text-sm shadow">
                  NS
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">NEXTSOFTHR INTELLIGENT CORE</h4>
                  <span className="text-[11px] text-blue-700 dark:text-[#B8F010] font-medium">Unified Real-Time Database • 16 Integrated Modules</span>
                </div>
              </div>

              <span className="text-xs text-slate-500 dark:text-blue-300 hidden sm:inline-block">Click any module to inspect</span>
            </div>

            {/* 16 Clickable Module Chips Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {ECOSYSTEM_MODULES.map((mod) => {
                const IconComponent = getIcon(mod.icon);
                const isSelected = selectedModule.id === mod.id;
                return (
                  <button
                    key={mod.id}
                    onClick={() => setSelectedModule(mod)}
                    className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between h-28 relative group ${
                      isSelected
                        ? 'bg-blue-50 dark:bg-blue-900/90 border-blue-600 dark:border-[#B8F010] shadow-md dark:shadow-lg dark:shadow-[#B8F010]/15 -translate-y-1'
                        : 'bg-slate-50 dark:bg-[#071D3E]/80 border-slate-200 dark:border-blue-800/80 hover:border-blue-400 dark:hover:border-blue-600 hover:bg-white dark:hover:bg-[#0B254A]'
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#B8F010] animate-ping" />
                    )}

                    <div className="flex items-center justify-between">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isSelected ? 'bg-[#B8F010] text-[#040E1F]' : 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-[#B8F010] group-hover:bg-blue-100 dark:group-hover:bg-blue-900'
                      }`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] uppercase font-bold text-slate-400">
                        {mod.category}
                      </span>
                    </div>

                    <div>
                      <span className={`text-xs font-bold block truncate ${
                        isSelected ? 'text-blue-700 dark:text-white' : 'text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-white'
                      }`}>
                        {mod.name}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Subtle bottom legend */}
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-blue-900/70 flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-[#B8F010]" />
                Lemon Green = AI & Core Financial Engines
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                Royal Blue = Workforce & Analytics Engines
              </span>
            </div>

          </div>

          {/* Right Selected Module Deep Dive Card */}
          <div className="lg:col-span-4 rounded-3xl bg-white dark:bg-[#071D3E] border border-slate-200 dark:border-blue-700/80 p-7 shadow-lg dark:shadow-2xl sticky top-28 transition-colors duration-300">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-blue-800">
              <span className="text-xs font-bold px-2.5 py-1 rounded bg-[#B8F010]/20 text-[#071D3E] dark:text-[#B8F010] border border-[#B8F010]/40 uppercase tracking-wider">
                Module Details
              </span>
              <span className="text-xs text-blue-600 dark:text-blue-300 font-semibold">Ready to demo</span>
            </div>

            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
              {selectedModule.name}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              {selectedModule.description}
            </p>

            <div className="space-y-3 mb-6">
              <span className="text-xs uppercase font-bold text-slate-700 dark:text-blue-200 tracking-wider block">
                Key Customer Selling Points:
              </span>
              {selectedModule.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs text-slate-800 dark:text-slate-200 p-2.5 rounded-lg bg-slate-50 dark:bg-blue-950/60 border border-slate-200 dark:border-blue-900 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-[#B8F010] shrink-0" />
                  <span className="font-medium">{feat}</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-blue-950 border border-slate-200 dark:border-blue-800 text-xs text-slate-700 dark:text-blue-200 space-y-1 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Client Deployment:</span>
                <span className="font-bold text-slate-900 dark:text-white">Immediate Cloud Sync</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Statutory Ready:</span>
                <span className="font-bold text-blue-700 dark:text-[#B8F010]">100% African Tax Compliant</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Partner Upsell:</span>
                <span className="font-bold text-slate-900 dark:text-white">Full Access Included</span>
              </div>
            </div>

            <div className="text-center">
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                All 16 modules are included in client bundles — maximizing your recurring commission per client.
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
