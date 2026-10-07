import React, { useState } from 'react';
import { NETWORK_NODES } from '../data/content';
import { Globe, MapPin, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { NetworkNode } from '../types';
import { useLanguage } from '../context/LanguageContext';

export const GlobalPresenceMap: React.FC = () => {
  const { t } = useLanguage();
  const [selectedNode, setSelectedNode] = useState<NetworkNode>(NETWORK_NODES[0]); // default Nigeria
  const [filterRegion, setFilterRegion] = useState<'All' | 'Africa' | 'Global'>('All');

  const filteredNodes = NETWORK_NODES.filter((n) =>
    filterRegion === 'All' ? true : n.region === filterRegion
  );

  return (
    <section id="global-presence" className="py-24 bg-[#0B1F3A] text-white relative overflow-hidden">
      {/* Subtle Glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#1769E0]/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#C8F000]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#C8F000]/30 text-[#C8F000] text-xs font-bold uppercase tracking-wider mb-4">
            <Globe className="w-3.5 h-3.5" />
            <span>{t.global.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display mb-4">
            {t.global.title}
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            {t.global.subtitle}
          </p>

          {/* Region Tabs */}
          <div className="mt-8 inline-flex p-1 rounded-xl bg-white/10 border border-white/10">
            {(['All', 'Africa', 'Global'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterRegion(tab)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  filterRegion === tab
                    ? 'bg-[#C8F000] text-[#0B1F3A] shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {tab === 'All' ? t.global.allHubs : tab === 'Africa' ? t.global.africanHubs : t.global.globalHubs}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Stylized Network Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Map & Network Canvas */}
          <div className="lg:col-span-8 bg-[#0E274A] border border-white/15 rounded-3xl p-6 sm:p-8 relative shadow-2xl overflow-hidden min-h-[440px] flex flex-col justify-between">
            
            {/* Background SVG Grid & Stylized Africa/Global Map Beams */}
            <svg
              className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
              viewBox="0 0 800 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient id="meshGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#1769E0" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#0B1F3A" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="800" height="500" fill="url(#meshGradient)" />
              
              {/* Stylized continent contours */}
              <circle cx="400" cy="270" r="180" stroke="#1769E0" strokeWidth="1" strokeDasharray="3 6" opacity="0.4" />
              <circle cx="400" cy="270" r="120" stroke="#C8F000" strokeWidth="1" strokeDasharray="2 8" opacity="0.3" />

              {/* Animated Connection Lines from African Core (NG, KE, ZA) to UK, US, UAE */}
              <line x1="368" y1="260" x2="360" y2="140" stroke="#C8F000" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
              <line x1="368" y1="260" x2="184" y2="170" stroke="#1769E0" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
              <line x1="464" y1="285" x2="496" y2="215" stroke="#C8F000" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
              <line x1="368" y1="260" x2="464" y2="285" stroke="#C8F000" strokeWidth="2" opacity="0.7" />
              <line x1="368" y1="260" x2="424" y2="390" stroke="#1769E0" strokeWidth="1.5" opacity="0.7" />
              <line x1="464" y1="285" x2="424" y2="390" stroke="#1769E0" strokeWidth="1.5" opacity="0.7" />
            </svg>

            {/* Top Toolbar inside Canvas */}
            <div className="relative z-10 flex items-center justify-between text-xs text-slate-300 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C8F000] animate-pulse"></span>
                <span className="font-semibold text-white">Live Multi-Market Compliance Topology</span>
              </div>
              <span className="text-[11px] text-[#C8F000] font-mono">Real-time Statutory Engines Active</span>
            </div>

            {/* Nodes Visual Cloud */}
            <div className="relative z-10 py-8 min-h-[300px]">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {filteredNodes.map((node) => {
                  const isSelected = selectedNode.id === node.id;
                  return (
                    <button
                      key={node.id}
                      onClick={() => setSelectedNode(node)}
                      className={`p-3 rounded-xl text-left transition-all duration-200 cursor-pointer flex flex-col justify-between border ${
                        isSelected
                          ? 'bg-[#1769E0] text-white border-[#C8F000] shadow-lg shadow-[#1769E0]/50 scale-102'
                          : 'bg-white/5 hover:bg-white/10 text-slate-200 border-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
                          {node.region}
                        </span>
                        <span
                          className={`w-2 h-2 rounded-full ${
                            node.highlight ? 'bg-[#C8F000]' : 'bg-white/60'
                          }`}
                        ></span>
                      </div>

                      <div className="font-extrabold text-sm tracking-tight text-white mb-0.5">
                        {node.country}
                      </div>

                      <div className="text-[11px] text-slate-300 truncate">
                        {node.city}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Status Bar */}
            <div className="relative z-10 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C8F000]" />
                <span>Multi-currency payroll support: NGN, KES, GHS, ZAR, RWF, USD, GBP, AED</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">Click any country to inspect compliance</span>
            </div>

          </div>

          {/* Right Column: Selected Node Deep Dive */}
          <div className="lg:col-span-4 bg-white/5 border border-white/15 rounded-3xl p-7 flex flex-col justify-between backdrop-blur-md">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase bg-[#C8F000] text-[#0B1F3A]">
                  Active Corridor
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Region: {selectedNode.region}
                </span>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#1769E0] flex items-center justify-center text-[#C8F000]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-white font-display">
                    {selectedNode.country}
                  </h3>
                  <p className="text-xs text-slate-300 font-medium">{selectedNode.city}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-6">
                <div className="text-xs font-bold text-[#C8F000] mb-1 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Statutory Capabilities</span>
                </div>
                <p className="text-sm text-slate-200 font-medium">
                  {selectedNode.activeUsersLabel}
                </p>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C8F000] shrink-0 mt-0.5" />
                  <span>Automated localized tax brackets &amp; employee remittances</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C8F000] shrink-0 mt-0.5" />
                  <span>Public holiday calendars &amp; country labor law leave rules</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C8F000] shrink-0 mt-0.5" />
                  <span>Direct corporate bank account integrations &amp; pay slips</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-white/10 text-center">
              <span className="text-xs text-slate-400">
                Operating multi-country entities? We consolidate all in a single dashboard.
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
