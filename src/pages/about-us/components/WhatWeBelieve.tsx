import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  Layers,
  FileSpreadsheet,
  Clock,
  AlertCircle,
  ShieldCheck,
  Check,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { BELIEFS } from '../data/contentData';

export const WhatWeBelieve: React.FC = () => {
  const [viewState, setViewState] = useState<'disconnected' | 'connected'>('connected');

  return (
    <section id="what-we-believe" className="py-20 lg:py-28 bg-white dark:bg-[#071322] border-b border-slate-200/80 dark:border-slate-800 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Large Typography */}
        <div className="max-w-4xl mx-auto text-center space-y-5 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/50 text-xs font-bold text-[#0B3B73] dark:text-[#38BDF8]">
            <span className="w-2 h-2 rounded-full bg-[#84CC16]"></span>
            <span>Our Technology Philosophy</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2540] dark:text-white tracking-tight leading-tight">
            Technology Should Work For People —{' '}
            <span className="text-[#0B3B73] dark:text-[#38BDF8]">Not The Other Way Around</span>
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            We believe enterprise software should liberate human capability, not trap teams in
            bureaucratic forms, repetitive math, and siloed administrative chores.
          </p>
        </div>

        {/* Interactive Disconnected vs. Connected Transformation Showcase */}
        <div className="mb-20 bg-[#0A2540] dark:bg-[#06101E] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden border border-transparent dark:border-blue-900/40 transition-colors duration-300">
          {/* Header & Mode Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 dark:border-slate-800">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#84CC16]">
                Interactive Architecture Simulation
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">
                The NextSofthr Transformation
              </h3>
            </div>

            <div className="flex items-center bg-white/10 dark:bg-slate-900/80 p-1 rounded-xl border border-white/15 dark:border-slate-800">
              <button
                onClick={() => setViewState('disconnected')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewState === 'disconnected'
                    ? 'bg-red-500/80 text-white shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                The Old Reality: Disconnected Chaos
              </button>
              <button
                onClick={() => setViewState('connected')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewState === 'connected'
                    ? 'bg-[#84CC16] text-[#0A2540] shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                The NextSofthr Reality: One Platform
              </button>
            </div>
          </div>

          {/* Visualization Canvas */}
          <div className="py-8">
            {viewState === 'disconnected' ? (
              /* Disconnected Chaos State */
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
                <div className="bg-red-950/30 border border-red-800/40 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
                    <FileSpreadsheet className="w-5 h-5" />
                    <span>Spreadsheet Sprawl</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Over 12 disparate Excel files for salary, allowances, pension, and PAYE tax brackets. Broken macros and version control nightmares.
                  </p>
                  <div className="flex items-center gap-1 text-[11px] text-red-300 font-semibold pt-2">
                    <XCircle className="w-3.5 h-3.5 text-red-400" /> High risk of tax formula errors
                  </div>
                </div>

                <div className="bg-red-950/30 border border-red-800/40 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
                    <Clock className="w-5 h-5" />
                    <span>Isolated Paper & Biometrics</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Fingerprint punch data trapped in branch hardware. Paper leave request slips signed manually and lost during audit season.
                  </p>
                  <div className="flex items-center gap-1 text-[11px] text-red-300 font-semibold pt-2">
                    <XCircle className="w-3.5 h-3.5 text-red-400" /> 4 to 6 days wasted every month
                  </div>
                </div>

                <div className="bg-red-950/30 border border-red-800/40 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
                    <AlertCircle className="w-5 h-5" />
                    <span>Executive Blindspots</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Leadership has no instant view of actual workforce costs across Lagos, Abuja, Nairobi, or Accra branches until finance closes books weeks later.
                  </p>
                  <div className="flex items-center gap-1 text-[11px] text-red-300 font-semibold pt-2">
                    <XCircle className="w-3.5 h-3.5 text-red-400" /> Zero real-time visibility
                  </div>
                </div>
              </div>
            ) : (
              /* NextSofthr Unified Connected State */
              <div className="animate-fadeIn space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-white/10 dark:bg-[#0E2038] border border-[#84CC16]/40 rounded-2xl p-4 text-center">
                    <div className="w-10 h-10 mx-auto rounded-xl bg-[#84CC16]/20 flex items-center justify-center text-[#84CC16] mb-2">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div className="text-xs font-bold text-white">Unified Core</div>
                    <div className="text-[11px] text-slate-300 mt-1">Single employee record database</div>
                  </div>

                  <div className="bg-white/10 dark:bg-[#0E2038] border border-[#84CC16]/40 rounded-2xl p-4 text-center">
                    <div className="w-10 h-10 mx-auto rounded-xl bg-[#84CC16]/20 flex items-center justify-center text-[#84CC16] mb-2">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div className="text-xs font-bold text-white">Auto Tax & Pension</div>
                    <div className="text-[11px] text-slate-300 mt-1">Statutory calculations guaranteed</div>
                  </div>

                  <div className="bg-white/10 dark:bg-[#0E2038] border border-[#84CC16]/40 rounded-2xl p-4 text-center">
                    <div className="w-10 h-10 mx-auto rounded-xl bg-[#84CC16]/20 flex items-center justify-center text-[#84CC16] mb-2">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div className="text-xs font-bold text-white">Live Time & Shifts</div>
                    <div className="text-[11px] text-slate-300 mt-1">Direct sync into monthly pay run</div>
                  </div>

                  <div className="bg-white/10 dark:bg-[#0E2038] border border-[#84CC16]/40 rounded-2xl p-4 text-center">
                    <div className="w-10 h-10 mx-auto rounded-xl bg-[#84CC16]/20 flex items-center justify-center text-[#84CC16] mb-2">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div className="text-xs font-bold text-white">AI Co-Pilot</div>
                    <div className="text-[11px] text-slate-300 mt-1">Natural language variance audits</div>
                  </div>
                </div>

                <div className="bg-[#84CC16]/10 border border-[#84CC16]/30 rounded-2xl p-4 text-center text-xs text-slate-200">
                  <span className="font-bold text-[#84CC16]">The Result: </span>
                  Every attendance punch, leave application, compensation change, and branch requisition connects
                  seamlessly to the central NextSofthr ledger without manual copy-pasting.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 7 Core Belief Statements */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BELIEFS.map((belief, idx) => (
            <div
              key={belief.title}
              className="bg-[#F8FAFC] dark:bg-[#0E2038] border border-slate-200/80 dark:border-blue-900/40 hover:border-blue-300 dark:hover:border-blue-500 rounded-2xl p-6 transition-all hover:bg-white dark:hover:bg-[#132A4A] hover:shadow-md group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100/80 dark:bg-blue-950 flex items-center justify-center text-[#0B3B73] dark:text-[#38BDF8] font-bold text-xs group-hover:bg-[#84CC16] group-hover:text-[#0A2540] dark:group-hover:text-[#0A2540] transition-colors">
                  0{idx + 1}
                </div>
                <h3 className="text-base font-bold text-[#0A2540] dark:text-white group-hover:text-[#0B3B73] dark:group-hover:text-[#84CC16] transition-colors">
                  {belief.title}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-11">
                {belief.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
