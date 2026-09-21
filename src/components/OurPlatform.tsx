import React, { useState } from 'react';
import {
  Users,
  Clock,
  CalendarCheck,
  Wallet,
  Building2,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Layers
} from 'lucide-react';
import { PLATFORM_MODULES } from '../data/contentData';

interface OurPlatformProps {
  onOpenDemo: () => void;
}

export const OurPlatform: React.FC<OurPlatformProps> = ({ onOpenDemo }) => {
  const [selectedModuleId, setSelectedModuleId] = useState<string>('hr');

  const selectedModule =
    PLATFORM_MODULES.find((m) => m.id === selectedModuleId) || PLATFORM_MODULES[0];

  const getModuleIcon = (iconName: string, active: boolean) => {
    const iconClass = `w-6 h-6 ${active ? 'text-[#0A2540]' : 'text-[#0B3B73]'}`;
    switch (iconName) {
      case 'Users':
        return <Users className={iconClass} />;
      case 'Clock':
        return <Clock className={iconClass} />;
      case 'CalendarCheck':
        return <CalendarCheck className={iconClass} />;
      case 'Wallet':
        return <Wallet className={iconClass} />;
      case 'Building2':
        return <Building2 className={iconClass} />;
      case 'Sparkles':
        return <Sparkles className={iconClass} />;
      default:
        return <Layers className={iconClass} />;
    }
  };

  return (
    <section id="platform" className="py-20 lg:py-28 bg-[#F0F7FF]/50 border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-xs font-bold text-[#0B3B73]">
            <span className="w-2 h-2 rounded-full bg-[#84CC16]"></span>
            <span>The Unified NextSofthr Suite</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2540] tracking-tight">
            One Platform. Connected Business Management.
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Eliminate fragmented tools. Each module communicates natively with the NextSofthr
            central engine, ensuring synchronized employee data, zero duplicate data entry, and
            compliance across your organization.
          </p>
        </div>

        {/* Central Connected Ecosystem Graphic & Selector */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl mb-12">
          {/* Ecosystem Visual Hub */}
          <div className="mb-10 text-center">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-[#0A2540] text-white shadow-md border border-white/15">
              <div className="w-3 h-3 rounded-full bg-[#84CC16] animate-pulse"></div>
              <span className="font-extrabold text-sm sm:text-base tracking-tight">
                NextSofthr Central Intelligence Core
              </span>
              <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-slate-300">
                Single Source of Truth
              </span>
            </div>
          </div>

          {/* Module Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-8">
            {PLATFORM_MODULES.map((mod) => {
              const isSelected = mod.id === selectedModuleId;
              return (
                <button
                  key={mod.id}
                  onClick={() => setSelectedModuleId(mod.id)}
                  className={`p-4 rounded-2xl text-left transition-all duration-200 border flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-[#84CC16] border-[#74be12] text-[#0A2540] shadow-md ring-2 ring-[#0A2540]/20'
                      : 'bg-[#F8FAFC] hover:bg-white border-slate-200 text-slate-700 hover:border-blue-300'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-white/80 shadow-sm flex items-center justify-center mb-3">
                    {getModuleIcon(mod.iconName, isSelected)}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm leading-snug">
                      {mod.title}
                    </h3>
                    <p
                      className={`text-[11px] mt-1 line-clamp-2 leading-relaxed ${
                        isSelected ? 'text-[#0A2540]/80 font-medium' : 'text-slate-500'
                      }`}
                    >
                      {mod.shortDesc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Selected Module View */}
          <div className="bg-[#0A2540] rounded-2xl p-6 sm:p-8 text-white border border-slate-800">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Details */}
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#84CC16]/20 text-[#84CC16] text-xs font-bold">
                  <span>Active Module Inspection</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {selectedModule.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {selectedModule.fullDesc}
                </p>

                <div className="pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#84CC16] mb-3">
                    Core Capabilities & Automations:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedModule.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-[#84CC16] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-3">
                  <button
                    onClick={onOpenDemo}
                    className="inline-flex items-center gap-2 bg-[#84CC16] hover:bg-[#74be12] text-[#0A2540] font-bold text-xs px-5 py-2.5 rounded-lg transition-all cursor-pointer"
                  >
                    <span>Request Demo for {selectedModule.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs text-slate-400">
                    Included in standard NextSofthr tier
                  </span>
                </div>
              </div>

              {/* Right Visual Metrics Card */}
              <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md space-y-4">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Operational Impact Metric
                </div>

                <div className="p-4 bg-slate-900/80 rounded-xl border border-white/10">
                  <div className="text-xs text-slate-400">
                    {selectedModule.metricsPreview.label}
                  </div>
                  <div className="text-3xl font-extrabold text-[#84CC16] mt-1">
                    {selectedModule.metricsPreview.value}
                  </div>
                  <div className="text-xs text-slate-300 mt-1">
                    {selectedModule.metricsPreview.subtext}
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center justify-between py-1.5 border-b border-white/10">
                    <span>Integration with Payroll</span>
                    <span className="text-[#84CC16] font-bold">100% Native</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-white/10">
                    <span>Audit Trail Log</span>
                    <span className="text-white font-bold">Timestamped & Encrypted</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5">
                    <span>Mobile App Access</span>
                    <span className="text-white font-bold">iOS & Android Enabled</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
