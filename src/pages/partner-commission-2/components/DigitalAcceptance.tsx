import React, { useState, useRef } from 'react';
import { 
  CheckCircle2, 
  FileCheck, 
  Printer, 
  Building2, 
  ShieldCheck, 
  Calendar, 
  Award, 
  PenTool, 
  RotateCcw,
  Globe,
  Phone,
  Sparkles,
  Download
} from 'lucide-react';
import { PARTNER_TIERS } from '../data/scheduleData';

export const DigitalAcceptance: React.FC<{ onPrint: () => void }> = ({ onPrint }) => {
  // Section 60 Checklist Checkboxes
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);

  // Partner Form State
  const [partnerName, setPartnerName] = useState('Francis Erikefe');
  const [company, setCompany] = useState('NextGen Enterprise Tech Solutions Ltd');
  const [partnerCategory, setPartnerCategory] = useState('Reseller & Implementation Partner');
  const [partnerTier, setPartnerTier] = useState('Gold / Partner');
  const [commissionRate, setCommissionRate] = useState('30%');
  const [territory, setTerritory] = useState('Nigeria & West Africa');
  const [effectiveDate, setEffectiveDate] = useState('2026-10-01');
  const [authorizedRep, setAuthorizedRep] = useState('Francis Erikefe (Managing Director)');
  
  // Signature style
  const [sigType, setSigType] = useState<'typed' | 'drawn'>('typed');
  const [typedSignature, setTypedSignature] = useState('Francis Erikefe');
  const [signatureCanvasDrawn, setSignatureCanvasDrawn] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Status
  const [isSigned, setIsSigned] = useState(false);

  const allChecksConfirmed = check1 && check2 && check3 && check4;

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.strokeStyle = '#06B6D4'; // cyan
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.stroke();
    setSignatureCanvasDrawn(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignatureCanvasDrawn(false);
  };

  const handleExecute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allChecksConfirmed) return;
    setIsSigned(true);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/60 rounded-2xl p-6 border border-slate-800 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 text-xs font-semibold mb-2">
              <FileCheck className="w-3.5 h-3.5" />
              Sections 60, 61 & 62 • Digital Execution & Acceptance
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Schedule B Official Agreement Execution
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Complete the digital signing block for Schedule B of the NextSoftHR Master Reseller, Partner, Distributor & Affiliate Agreement.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {isSigned && (
              <button
                onClick={onPrint}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-cyan-950/40 transition-all"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Download Executed Certificate</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form and declarations column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={handleExecute} className="space-y-6">
            {/* Section 60 Checklist Declarations */}
            <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Section 60: Partner Declarations (Mandatory)
                </h3>
              </div>
              <p className="text-xs text-slate-400">
                The Partner must confirm each statutory condition prior to formal Schedule B countersignature:
              </p>

              <div className="space-y-3 pt-1">
                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors text-xs text-slate-200">
                  <input
                    type="checkbox"
                    checked={check1}
                    onChange={(e) => setCheck1(e.target.checked)}
                    className="mt-0.5 rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-0 w-4 h-4"
                  />
                  <span>
                    <strong>Declaration 1:</strong> I have read and understood this Commission & Revenue Share Schedule (Schedule B v1.0).
                  </span>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors text-xs text-slate-200">
                  <input
                    type="checkbox"
                    checked={check2}
                    onChange={(e) => setCheck2(e.target.checked)}
                    className="mt-0.5 rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-0 w-4 h-4"
                  />
                  <span>
                    <strong>Declaration 2:</strong> I accept the commission, payment, and attribution provisions applicable to my Partner category.
                  </span>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors text-xs text-slate-200">
                  <input
                    type="checkbox"
                    checked={check3}
                    onChange={(e) => setCheck3(e.target.checked)}
                    className="mt-0.5 rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-0 w-4 h-4"
                  />
                  <span>
                    <strong>Declaration 3:</strong> I understand that commissions are subject to customer payment, refunds, chargebacks, attribution, and program rules.
                  </span>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors text-xs text-slate-200">
                  <input
                    type="checkbox"
                    checked={check4}
                    onChange={(e) => setCheck4(e.target.checked)}
                    className="mt-0.5 rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-0 w-4 h-4"
                  />
                  <span>
                    <strong>Declaration 4:</strong> I understand that my specific commercial terms are contained in my Partner Schedule.
                  </span>
                </label>
              </div>
            </div>

            {/* Partner Particulars */}
            <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Partner Particulars (Section 60 Schedule Block)
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Partner Name *</label>
                  <input
                    type="text"
                    required
                    value={partnerName}
                    onChange={(e) => setPartnerName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Company / Organization *</label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Partner Category *</label>
                  <select
                    value={partnerCategory}
                    onChange={(e) => setPartnerCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="Reseller & Implementation Partner">Reseller & Implementation Partner</option>
                    <option value="Authorized Distributor">Authorized Distributor</option>
                    <option value="Referral Partner">Referral Partner</option>
                    <option value="Affiliate Partner">Affiliate Partner</option>
                    <option value="Outsourcing & BPO Partner">Outsourcing & BPO Partner</option>
                    <option value="Strategic Alliance Partner">Strategic Alliance Partner</option>
                    <option value="Channel Associate">Channel Associate</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Partner Tier *</label>
                  <select
                    value={partnerTier}
                    onChange={(e) => {
                      setPartnerTier(e.target.value);
                      if (e.target.value === 'Bronze') setCommissionRate('15%');
                      if (e.target.value === 'Silver') setCommissionRate('20%');
                      if (e.target.value === 'Gold / Partner') setCommissionRate('30%');
                      if (e.target.value === 'Platinum') setCommissionRate('40%');
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="Bronze">Bronze (15% Standard)</option>
                    <option value="Silver">Silver (20% Standard)</option>
                    <option value="Gold / Partner">Gold / Partner (30% Standard)</option>
                    <option value="Platinum">Platinum (40% Standard)</option>
                    <option value="Special Custom">Special Custom (Sec 48)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Assigned Commission Rate *</label>
                  <input
                    type="text"
                    required
                    value={commissionRate}
                    onChange={(e) => setCommissionRate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white font-mono focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Territory / Region *</label>
                  <input
                    type="text"
                    required
                    value={territory}
                    onChange={(e) => setTerritory(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Effective Date *</label>
                  <input
                    type="date"
                    required
                    value={effectiveDate}
                    onChange={(e) => setEffectiveDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Authorized Representative *</label>
                  <input
                    type="text"
                    required
                    value={authorizedRep}
                    onChange={(e) => setAuthorizedRep(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Signature Block */}
            <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <PenTool className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Digital Execution Block
                  </h3>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setSigType('typed')}
                    className={`px-2.5 py-1 rounded-lg ${sigType === 'typed' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400'}`}
                  >
                    Type Signature
                  </button>
                  <button
                    type="button"
                    onClick={() => setSigType('drawn')}
                    className={`px-2.5 py-1 rounded-lg ${sigType === 'drawn' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400'}`}
                  >
                    Draw Signature
                  </button>
                </div>
              </div>

              {sigType === 'typed' ? (
                <div>
                  <label className="block text-slate-300 text-xs font-medium mb-1">
                    Typed Legal Signature Representation
                  </label>
                  <input
                    type="text"
                    value={typedSignature}
                    onChange={(e) => setTypedSignature(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-cyan-300 font-mono text-base italic focus:border-cyan-400 focus:outline-none"
                  />
                  <div className="mt-3 p-3 rounded-lg bg-slate-950 border border-slate-800 font-serif italic text-cyan-300 text-xl tracking-wider select-none">
                    {typedSignature || 'Your Signature'}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-400">Draw signature below:</span>
                    <button
                      type="button"
                      onClick={clearCanvas}
                      className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" /> Clear
                    </button>
                  </div>
                  <canvas
                    ref={canvasRef}
                    width={450}
                    height={120}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    className="w-full h-28 rounded-xl bg-slate-950 border border-slate-700 cursor-crosshair"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={!allChecksConfirmed}
                className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
                  allChecksConfirmed
                    ? 'bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white cursor-pointer shadow-cyan-950/50'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
                }`}
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>
                  {isSigned ? 'Update Signed Execution' : 'Execute & Counter-Sign Schedule B'}
                </span>
              </button>

              {!allChecksConfirmed && (
                <p className="text-center text-[11px] text-amber-400/90">
                  Please review and check all 4 Section 60 declarations above to enable execution.
                </p>
              )}
            </div>
          </form>
        </div>

        {/* Counter-Signed Certificate Preview Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 rounded-2xl p-6 sm:p-7 border border-cyan-500/40 shadow-2xl shadow-cyan-950/20 space-y-6 relative overflow-hidden">
            {/* Watermark badge */}
            <div className="absolute top-4 right-4 text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
              {isSigned ? 'OFFICIALLY EXECUTED' : 'PENDING SIGNATURE'}
            </div>

            <div className="border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-cyan-400 mb-1">
                <Building2 className="w-5 h-5" />
                <span className="font-extrabold tracking-tight text-white text-base">NextSoftHR</span>
              </div>
              <h4 className="text-xs uppercase tracking-wider text-slate-300 font-bold">
                Schedule B Commercial Execution Certificate
              </h4>
              <p className="text-[11px] text-slate-400 italic">
                Schedule B to Master Reseller & Partner Agreement
              </p>
            </div>

            {/* Summary Details */}
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Partner Entity:</span>
                <span className="font-semibold text-white text-right">{company}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Authorized Lead:</span>
                <span className="text-white text-right">{partnerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Partner Category:</span>
                <span className="text-white text-right">{partnerCategory}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Tier / Recurring Rate:</span>
                <span className="font-mono font-bold text-cyan-400">{partnerTier} ({commissionRate})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Territory:</span>
                <span className="text-white text-right">{territory}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Effective Date:</span>
                <span className="font-mono text-white">{effectiveDate}</span>
              </div>
            </div>

            {/* Signatures Dual Block */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              {/* Partner Signature */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  Partner Authorized Signatory (Sec 60)
                </span>
                <div className="mt-2 font-serif text-lg text-cyan-300 italic">
                  {typedSignature || partnerName}
                </div>
                <div className="text-[10px] text-slate-400 mt-1">
                  Representative: {authorizedRep}
                </div>
                <div className="text-[10px] text-slate-500 font-mono">
                  Timestamp: {effectiveDate} • Verified via NextSoftHR Portal
                </div>
              </div>

              {/* NextSoftHR Acceptance (Section 61) */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-cyan-400 block tracking-wider">
                    For NextSoftHR (Section 61 Acceptance)
                  </span>
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="mt-2 font-serif text-lg text-white italic">
                  NextSoftHR Authorized Corporate Seal
                </div>
                <div className="text-[10px] text-slate-300 mt-1">
                  Title: Director of Global Channel Operations & Strategic Alliances
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                  Web: www.nextsofthr.org • Phone: +2349158482622
                </div>
              </div>
            </div>

            {/* Section 62 Legal Notice */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[10px] text-slate-400 leading-relaxed">
              <strong>Section 62 Notice:</strong> This Commission Schedule forms part of the Master Agreement. Commercial rates, eligibility, and program rules remain subject to jurisdictional compliance. © 2026 NextSoftHR. All Rights Reserved.
            </div>

            {isSigned && (
              <button
                type="button"
                onClick={onPrint}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-colors"
              >
                <Printer className="w-4 h-4 text-cyan-400" />
                <span>Print Official PDF Certificate</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
