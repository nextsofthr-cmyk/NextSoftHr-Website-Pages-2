import React, { useState } from 'react';
import { ShieldCheck, UserCheck, ArrowUpRight, Menu, X, FileText, CheckCircle2 } from 'lucide-react';
import { AcceptanceRecord } from '../types/agreement';

interface HeaderProps {
  activeView: 'agreement' | 'portal';
  setActiveView: (view: 'agreement' | 'portal') => void;
  onOpenAcceptance: () => void;
  acceptanceRecord: AcceptanceRecord | null;
  onOpenDocCenter: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  setActiveView,
  onOpenAcceptance,
  acceptanceRecord,
  onOpenDocCenter
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveView('agreement');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-1.5 focus:outline-none"
            >
              <span>NextSoft</span>
              <span className="text-blue-700">HR</span>
              <span className="h-2 w-2 rounded-full bg-lime-500 inline-block"></span>
            </a>
            <span className="hidden sm:inline-block text-xs text-slate-400 font-medium border-l border-slate-200 pl-3">
              Partner Agreement Portal
            </span>
          </div>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a
              href="#overview"
              onClick={() => setActiveView('agreement')}
              className="hover:text-blue-700 transition-colors"
            >
              Overview
            </a>
            <a
              href="#categories"
              onClick={() => setActiveView('agreement')}
              className="hover:text-blue-700 transition-colors"
            >
              Partner Types
            </a>
            <a
              href="#agreement-text"
              onClick={() => setActiveView('agreement')}
              className="hover:text-blue-700 transition-colors"
            >
              Master Clauses (81)
            </a>
            <a
              href="#tiers"
              onClick={() => setActiveView('agreement')}
              className="hover:text-blue-700 transition-colors"
            >
              Tiers & Commission
            </a>
            <button
              onClick={() => {
                setActiveView('agreement');
                onOpenDocCenter();
              }}
              className="hover:text-blue-700 transition-colors focus:outline-none cursor-pointer"
            >
              Document Center
            </button>
            <a
              href="#faq"
              onClick={() => setActiveView('agreement')}
              className="hover:text-blue-700 transition-colors"
            >
              FAQ
            </a>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            {activeView === 'agreement' ? (
              <button
                onClick={() => setActiveView('portal')}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-blue-700 hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              >
                Partner Login
              </button>
            ) : (
              <button
                onClick={() => setActiveView('agreement')}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-blue-700 hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              >
                Back to Agreement
              </button>
            )}

            {acceptanceRecord ? (
              <button
                onClick={onOpenAcceptance}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-300 rounded-lg hover:bg-emerald-100 transition-colors whitespace-nowrap cursor-pointer shadow-sm"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Signed: {acceptanceRecord.partnerId}</span>
              </button>
            ) : (
              <button
                onClick={onOpenAcceptance}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors whitespace-nowrap shadow-sm cursor-pointer"
              >
                <span>Accept Agreement</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation tray */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-2">
          <a
            href="#overview"
            onClick={() => {
              setActiveView('agreement');
              setMobileMenuOpen(false);
            }}
            className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Overview
          </a>
          <a
            href="#categories"
            onClick={() => {
              setActiveView('agreement');
              setMobileMenuOpen(false);
            }}
            className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Partner Types
          </a>
          <a
            href="#agreement-text"
            onClick={() => {
              setActiveView('agreement');
              setMobileMenuOpen(false);
            }}
            className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Master Clauses (81)
          </a>
          <a
            href="#tiers"
            onClick={() => {
              setActiveView('agreement');
              setMobileMenuOpen(false);
            }}
            className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Tiers & Commission
          </a>
          <button
            onClick={() => {
              setActiveView('agreement');
              setMobileMenuOpen(false);
              onOpenDocCenter();
            }}
            className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Document Center
          </button>
          <a
            href="#faq"
            onClick={() => {
              setActiveView('agreement');
              setMobileMenuOpen(false);
            }}
            className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            FAQ
          </a>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setActiveView(activeView === 'agreement' ? 'portal' : 'agreement');
                setMobileMenuOpen(false);
              }}
              className="w-full text-center px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg"
            >
              {activeView === 'agreement' ? 'Open Partner Portal' : 'View Master Agreement'}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAcceptance();
              }}
              className="w-full text-center px-4 py-2 text-xs font-semibold text-white bg-blue-700 rounded-lg"
            >
              {acceptanceRecord ? 'View Certificate' : 'Accept Agreement'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
