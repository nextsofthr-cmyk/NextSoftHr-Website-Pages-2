import React from 'react';
import { Printer, PhoneCall, ShieldCheck } from 'lucide-react';
import { SCHEDULE_METADATA } from '../data/scheduleData';

interface HeaderProps {
  activeTab: 'schedule' | 'calculator' | 'statements' | 'leads' | 'execution' | 'disputes';
  setActiveTab: (tab: 'schedule' | 'calculator' | 'statements' | 'leads' | 'execution' | 'disputes') => void;
  onPrint: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onPrint }) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Zone 1: Single clean text element wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('schedule')}
              className="text-left text-slate-900 font-extrabold text-xl tracking-tight hover:opacity-90 transition-opacity"
            >
              NextSoft<span className="text-blue-600">HR</span>
            </button>
            <span className="hidden sm:inline-block text-xs font-semibold text-slate-400">/</span>
            <span className="hidden sm:inline-block text-xs font-medium text-slate-600">
              Schedule B Commercial Terms
            </span>
          </div>

          {/* Zone 2: 4-6 clean text navigation links (single line, no pill badges) */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <button
              onClick={() => setActiveTab('schedule')}
              className={`px-3 py-2 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 ${
                activeTab === 'schedule'
                  ? 'border-blue-600 text-blue-700'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              Contract Text (1–62)
            </button>

            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-3 py-2 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 ${
                activeTab === 'calculator'
                  ? 'border-blue-600 text-blue-700'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              Commission Simulator
            </button>

            <button
              onClick={() => setActiveTab('statements')}
              className={`px-3 py-2 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 ${
                activeTab === 'statements'
                  ? 'border-blue-600 text-blue-700'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              Statements & Ledger
            </button>

            <button
              onClick={() => setActiveTab('leads')}
              className={`px-3 py-2 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 ${
                activeTab === 'leads'
                  ? 'border-blue-600 text-blue-700'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              Lead Protection (90 Days)
            </button>

            <button
              onClick={() => setActiveTab('execution')}
              className={`px-3 py-2 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 ${
                activeTab === 'execution'
                  ? 'border-blue-600 text-blue-700'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              E-Acceptance Sign-Off
            </button>

            <button
              onClick={() => setActiveTab('disputes')}
              className={`px-3 py-2 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 ${
                activeTab === 'disputes'
                  ? 'border-blue-600 text-blue-700'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              Dispute Filing
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onPrint}
              title="Print official Schedule B document"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 transition-colors whitespace-nowrap shadow-xs"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Print Schedule</span>
            </button>

            <a
              href={`tel:${SCHEDULE_METADATA.phone}`}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-blue-700 border border-slate-200 rounded hover:bg-slate-50 transition-colors whitespace-nowrap"
            >
              <PhoneCall className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-mono tabular-nums">{SCHEDULE_METADATA.phone}</span>
            </a>
          </div>

        </div>

        {/* Mobile Navigation bar */}
        <div className="md:hidden flex items-center overflow-x-auto py-2 border-t border-slate-100 gap-2 no-scrollbar">
          {[
            { id: 'schedule', label: 'Contract' },
            { id: 'calculator', label: 'Simulator' },
            { id: 'statements', label: 'Statements' },
            { id: 'leads', label: 'Lead Registry' },
            { id: 'execution', label: 'Sign-Off' },
            { id: 'disputes', label: 'Disputes' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1 text-xs font-medium rounded whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
