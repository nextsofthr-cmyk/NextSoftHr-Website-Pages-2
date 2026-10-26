import React from 'react';
import { 
  Building2, 
  Phone, 
  Globe, 
  FileText, 
  Calculator, 
  ShieldCheck, 
  Receipt, 
  Award, 
  CheckCircle2, 
  Printer,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onPrint: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onPrint }) => {
  const navItems = [
    { id: 'simulator', label: 'Commission Simulator', icon: Calculator, badge: 'Interactive' },
    { id: 'schedule', label: 'Schedule B (62 Sections)', icon: FileText, badge: 'Full Text' },
    { id: 'tiers', label: 'Tiers & Qualifications', icon: Award, badge: '15% - 40%' },
    { id: 'leads', label: 'Lead Protection (90 Days)', icon: ShieldCheck, badge: 'Sec 23-25' },
    { id: 'statements', label: 'Commission Statements', icon: Receipt, badge: 'Sec 39' },
    { id: 'acceptance', label: 'Digital Sign-Off', icon: CheckCircle2, badge: 'Sec 60-62' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 shadow-2xl print:hidden">
      {/* Top corporate sub-bar */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border-b border-slate-800/50 text-xs text-slate-300 py-1.5 px-4 sm:px-8 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-cyan-400 font-semibold tracking-wide">
            <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            NEXTSOFTHR CHANNEL PROGRAM
          </span>
          <span className="hidden md:inline-block text-slate-500">|</span>
          <span className="hidden md:inline-block text-slate-400 italic">
            "Powering People. Driving Businesses."
          </span>
          <span className="hidden lg:inline-block text-slate-500">|</span>
          <span className="hidden lg:inline-block text-slate-400">
            Schedule B: Commission & Revenue Share Schedule (v1.0)
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <a 
            href="https://www.nextsofthr.org" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-400 transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>www.nextsofthr.org</span>
          </a>
          <span className="text-slate-600">•</span>
          <a 
            href="tel:+2349158482622" 
            className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-400 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-cyan-400" />
            <span>+2349158482622</span>
          </a>
        </div>
      </div>

      {/* Main navigation row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand identity */}
        <div 
          onClick={() => setActiveTab('simulator')} 
          className="cursor-pointer flex items-center gap-3.5 group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 p-0.5 shadow-lg shadow-cyan-900/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Building2 className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                Next<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Soft</span>HR
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 uppercase tracking-wider">
                Schedule B
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Partner Commission & Revenue Share Schedule</p>
          </div>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onPrint}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 text-xs font-semibold shadow-sm transition-all active:scale-95"
            title="Print or Save Schedule B as Official PDF"
          >
            <Printer className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Print / Export Official Schedule</span>
          </button>
        </div>
      </div>

      {/* Tabs bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/60 overflow-x-auto scrollbar-none">
        <nav className="flex space-x-1 sm:space-x-2 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-600/20 to-blue-600/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-950'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                    isActive 
                      ? 'bg-cyan-500/20 text-cyan-300' 
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
