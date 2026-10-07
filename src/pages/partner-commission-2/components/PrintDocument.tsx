import React from 'react';
import { Building2, Globe, Phone, Printer, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { SCHEDULE_SECTIONS, PARTNER_TIERS } from '../data/scheduleData';

interface PrintDocumentProps {
  onClose: () => void;
}

export const PrintDocument: React.FC<PrintDocumentProps> = ({ onClose }) => {
  return (
    <div className="min-h-screen bg-white text-slate-900 p-6 sm:p-12 font-sans selection:bg-slate-200">
      {/* Non-printed header controls */}
      <div className="max-w-4xl mx-auto mb-8 flex items-center justify-between print:hidden bg-slate-900 text-white p-4 rounded-xl shadow-lg">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-cyan-400" />
          <span>Return to Interactive Hub</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400">Print or Save as PDF (Format: A4 / Letter)</span>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Official Legal Document Layout */}
      <div className="max-w-4xl mx-auto space-y-8 bg-white text-slate-900 leading-relaxed text-sm">
        {/* Document Header */}
        <div className="border-b-2 border-slate-900 pb-6 space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-black tracking-tight text-slate-950 uppercase">
              NextSoftHR
            </h1>
            <span className="text-xs font-mono font-semibold px-2 py-1 rounded bg-slate-100 border border-slate-300">
              Schedule Version: 1.0
            </span>
          </div>

          <h2 className="text-xl font-bold tracking-tight text-slate-800">
            PARTNER COMMISSION & REVENUE SHARE SCHEDULE
          </h2>
          <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
            Schedule B to the NextSoftHR Reseller, Partner, Distributor, Affiliate & Associate Agreement
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-600 font-mono">
            <span>Website: <strong>www.nextsofthr.org</strong></span>
            <span>•</span>
            <span>Phone: <strong>+2349158482622</strong></span>
            <span>•</span>
            <span className="italic">Tagline: "Powering People. Driving Businesses."</span>
          </div>

          <div className="pt-1 flex items-center gap-6 text-xs text-slate-500 font-mono">
            <span>Effective Date: <strong>1st October 2026</strong></span>
            <span>•</span>
            <span>Last Updated: <strong>October 2026</strong></span>
          </div>
        </div>

        {/* Executive Summary Table of Tiers */}
        <div className="p-4 rounded border border-slate-300 bg-slate-50 space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Summary: NextSoftHR Standard Partner Tiers (Section 3 & 14)
          </h3>
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            {PARTNER_TIERS.map(t => (
              <div key={t.id} className="p-2 border border-slate-200 rounded bg-white">
                <div className="font-bold text-slate-900">{t.name}</div>
                <div className="text-base font-black font-mono text-slate-900">{t.rate}%</div>
                <div className="text-[10px] text-slate-500">Recurring Comm.</div>
              </div>
            ))}
          </div>
        </div>

        {/* 62 Sections Print Loop */}
        <div className="space-y-6">
          {SCHEDULE_SECTIONS.map((sec) => (
            <div key={sec.id} className="border-t border-slate-200 pt-4 break-inside-avoid">
              <div className="flex items-baseline justify-between mb-1.5">
                <h3 className="text-base font-extrabold text-slate-900">
                  {sec.title}
                </h3>
                <span className="text-[10px] uppercase font-mono text-slate-500 tracking-wider">
                  {sec.category}
                </span>
              </div>
              <div className="text-xs text-slate-800 leading-relaxed whitespace-pre-line font-serif">
                {sec.fullContent}
              </div>
            </div>
          ))}
        </div>

        {/* Signature & Execution Block from Section 60 & 61 */}
        <div className="border-t-2 border-slate-900 pt-6 space-y-6 break-inside-avoid">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Partner Signature */}
            <div className="border border-slate-300 p-4 rounded bg-slate-50 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-2">
                60. PARTNER ACCEPTANCE
              </h4>
              <p className="text-[11px] text-slate-600">
                The Partner confirms having read, understood, and accepted all commission, attribution, payment threshold ($100), and lead protection provisions of this Schedule B.
              </p>
              <div className="space-y-2 text-xs pt-2">
                <div>Partner Name: __________________________________________</div>
                <div>Company: _______________________________________________</div>
                <div>Partner Category: ________________________________________</div>
                <div>Partner Tier: ____________________________________________</div>
                <div>Commission Rate: _________________________________________</div>
                <div>Territory: _______________________________________________</div>
                <div>Effective Date: __________________________________________</div>
                <div>Authorized Signatory: ____________________________________</div>
                <div>Signature: ______________________ Date: __________________</div>
              </div>
            </div>

            {/* NextSoftHR Signature */}
            <div className="border border-slate-300 p-4 rounded bg-slate-50 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-2">
                61. NEXTSOFTHR ACCEPTANCE
              </h4>
              <p className="text-[11px] text-slate-600">
                Executed by NextSoftHR Authorized Channel Operations & Strategic Alliances Directorate.
              </p>
              <div className="space-y-2 text-xs pt-2">
                <div>Authorized Representative: Channel Operations Directorate</div>
                <div>Name: Engr. F. Erikefe</div>
                <div>Title: Director of Global Channel Partnerships</div>
                <div>Corporate Entity: NextSoftHR Technologies Ltd</div>
                <div>Contact: www.nextsofthr.org | +2349158482622</div>
                <div>Tagline: "Powering People. Driving Businesses."</div>
                <div>Signature: ______________________ Date: __________________</div>
              </div>
            </div>
          </div>

          {/* Section 62 Legal notice */}
          <div className="text-[10px] text-slate-500 border-t border-slate-200 pt-4 text-center font-mono">
            This Commission & Revenue Share Schedule forms part of the NextSoftHR Partner Agreement. © 2026 NextSoftHR. All Rights Reserved.
          </div>
        </div>
      </div>
    </div>
  );
};
