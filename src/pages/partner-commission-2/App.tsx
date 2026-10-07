import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { CalculatorView } from './components/Calculator';
import { ScheduleExplorer } from './components/ScheduleExplorer';
import { TierMatrix } from './components/TierMatrix';
import { LeadTracker } from './components/LeadTracker';
import { StatementGenerator } from './components/StatementGenerator';
import { DigitalAcceptance } from './components/DigitalAcceptance';
import { PrintDocument } from './components/PrintDocument';
import { 
  Building2, 
  Globe, 
  Phone, 
  FileText, 
  Award, 
  ShieldCheck, 
  DollarSign, 
  CheckCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('simulator');
  const [targetSectionId, setTargetSectionId] = useState<number | null>(null);
  const [isPrinting, setIsPrinting] = useState<boolean>(false);

  const navigateToSection = (id: number) => {
    setTargetSectionId(id);
    setActiveTab('schedule');
  };

  const handleSelectTierForCalc = (tierId: string) => {
    setActiveTab('simulator');
  };

  if (isPrinting) {
    return <PrintDocument onClose={() => setIsPrinting(false)} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-900 selection:text-white">
      {/* Top Main Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onPrint={() => setIsPrinting(true)} 
      />

      {/* Program Vital Metrics Ticker */}
      <div className="bg-slate-900/60 border-b border-slate-800/80 px-4 sm:px-8 py-2.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-slate-400">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <strong className="text-white font-mono">15%–40%</strong> Recurring Commission (Sec 3)
            </span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <strong className="text-white font-mono">90 Days</strong> Exclusive Lead Protection (Sec 24)
            </span>
            <span className="hidden md:inline text-slate-600">•</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <DollarSign className="w-3.5 h-3.5 text-amber-400" />
              <strong className="text-white font-mono">$100</strong> Min. Payout Threshold (Sec 34)
            </span>
            <span className="hidden lg:inline text-slate-600">•</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle className="w-3.5 h-3.5 text-indigo-400" />
              <strong className="text-white font-mono">100%</strong> Professional Services Retained (Sec 46)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateToSection(60)}
              className="text-cyan-400 hover:text-cyan-300 text-xs font-semibold flex items-center gap-1"
            >
              <span>Sign Schedule B (Sec 60)</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {activeTab === 'simulator' && (
          <CalculatorView onNavigateToSection={navigateToSection} />
        )}

        {activeTab === 'schedule' && (
          <ScheduleExplorer 
            targetSectionId={targetSectionId} 
            onClearTarget={() => setTargetSectionId(null)} 
          />
        )}

        {activeTab === 'tiers' && (
          <TierMatrix 
            onSelectTierForCalc={handleSelectTierForCalc}
            onNavigateToSection={navigateToSection}
          />
        )}

        {activeTab === 'leads' && (
          <LeadTracker onNavigateToSection={navigateToSection} />
        )}

        {activeTab === 'statements' && (
          <StatementGenerator onNavigateToSection={navigateToSection} />
        )}

        {activeTab === 'acceptance' && (
          <DigitalAcceptance onPrint={() => setIsPrinting(true)} />
        )}
      </main>

      {/* Official Corporate Footer */}
      <footer className="bg-slate-950 border-t border-slate-800/80 py-10 px-4 sm:px-6 lg:px-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-900">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold text-white">NextSoftHR</span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/60">
                  SCHEDULE B • VERSION 1.0
                </span>
              </div>
              <p className="text-slate-400 text-xs">
                Partner Commission & Revenue Share Schedule (Schedule B to Master Agreement)
              </p>
              <p className="text-slate-500 italic text-[11px]">
                "Powering People. Driving Businesses."
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-5 text-xs font-mono">
              <a 
                href="https://www.nextsofthr.org" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-400 transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span>www.nextsofthr.org</span>
              </a>
              <span className="text-slate-700">•</span>
              <a 
                href="tel:+2349158482622" 
                className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-400 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>+2349158482622</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <p>
              © 2026 NextSoftHR. All Rights Reserved. This Commission Schedule forms an integral legal part of the NextSoftHR Master Partner Agreement.
            </p>
            <div className="flex items-center gap-4">
              <button onClick={() => navigateToSection(62)} className="hover:text-cyan-400 transition-colors">
                Legal Notice (Sec 62)
              </button>
              <span>•</span>
              <button onClick={() => navigateToSection(59)} className="hover:text-cyan-400 transition-colors">
                Commercial Confidentiality (Sec 59)
              </button>
              <span>•</span>
              <button onClick={() => setIsPrinting(true)} className="hover:text-cyan-400 transition-colors">
                Print Official PDF
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
