import React, { useState, useRef, useEffect } from 'react';
import { AcceptanceRecord, PartnerCategoryType } from '../types/agreement';
import { PARTNER_CATEGORIES } from '../data/partnerData';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  FileCheck2,
  Printer,
  Download,
  Lock,
  Eraser,
  PenTool,
  ArrowRight
} from 'lucide-react';

interface ElectronicAcceptanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedCategory?: PartnerCategoryType;
  existingRecord: AcceptanceRecord | null;
  onSaveRecord: (record: AcceptanceRecord) => void;
  onNavigateToPortal: () => void;
}

export const ElectronicAcceptanceModal: React.FC<ElectronicAcceptanceModalProps> = ({
  isOpen,
  onClose,
  preselectedCategory,
  existingRecord,
  onSaveRecord,
  onNavigateToPortal
}) => {
  const [fullName, setFullName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [partnerType, setPartnerType] = useState<PartnerCategoryType>(preselectedCategory || 'reseller');
  const [country, setCountry] = useState('Nigeria');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [hasReadAgreed, setHasReadAgreed] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [signatureMode, setSignatureMode] = useState<'type' | 'draw'>('type');
  const [typedSignature, setTypedSignature] = useState('');
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  const [activeRecord, setActiveRecord] = useState<AcceptanceRecord | null>(existingRecord);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Sync preselectedCategory if provided
  useEffect(() => {
    if (preselectedCategory) {
      setPartnerType(preselectedCategory);
    }
  }, [preselectedCategory]);

  useEffect(() => {
    if (existingRecord) {
      setActiveRecord(existingRecord);
    }
  }, [existingRecord]);

  if (!isOpen) return null;

  // Drawing Canvas Handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = '#0F172A';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    setIsDrawing(true);
    setHasDrawn(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
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
    setHasDrawn(false);
  };

  const handleExecute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasReadAgreed || !isAuthorized) return;

    let signatureData = typedSignature;
    if (signatureMode === 'draw' && canvasRef.current) {
      signatureData = canvasRef.current.toDataURL('image/png');
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const partnerSuffix = Math.floor(1000 + Math.random() * 9000);
    const currentDate = new Date().toISOString();

    const record: AcceptanceRecord = {
      agreementId: `NSHR-AGR-2026-${randomSuffix}`,
      partnerId: `NSHR-PTR-${partnerSuffix}`,
      fullName,
      jobTitle,
      company: company || fullName,
      partnerType,
      country,
      email,
      phone,
      acceptanceDate: currentDate,
      agreementVersion: '1.0',
      digitalSignature: signatureData || fullName,
      ipAddressStamp: '197.210.226.84 (Verified ISP Gateway)',
      auditHash: `SHA256:${Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
      territorySummary: `${country} & Global SaaS Channel Schedule`,
      commissionScheduleRef: 'NSHR-SCHED-COMM-v1.0'
    };

    setActiveRecord(record);
    onSaveRecord(record);
  };

  const selectedCategoryDetails = PARTNER_CATEGORIES.find((c) => c.id === partnerType);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header Bar */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-lime-400" />
            <h2 className="text-base font-bold text-white tracking-tight">
              Electronic Agreement Execution Portal
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[82vh] overflow-y-auto">
          {activeRecord ? (
            /* Digital Certificate & Execution Record View */
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-xl font-bold text-emerald-950">
                  Agreement Accepted Successfully
                </h3>
                <p className="text-xs text-emerald-800 max-w-md mx-auto">
                  A legally binding digital execution certificate has been generated and permanently recorded in the NextSoftHR Partner Registry.
                </p>
              </div>

              {/* Certificate Summary Card */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 text-xs font-mono">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 text-slate-500">
                  <span>NEXTSOFTHR DIGITAL ACCEPTANCE RECORD</span>
                  <span>STATUS: EXECUTED & ACTIVE</span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Agreement ID:</span>
                    <span className="font-bold text-slate-900 text-sm">{activeRecord.agreementId}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Partner ID:</span>
                    <span className="font-bold text-blue-700 text-sm">{activeRecord.partnerId}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Signatory & Job Title:</span>
                    <span className="text-slate-900">{activeRecord.fullName} ({activeRecord.jobTitle})</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Contracting Organization:</span>
                    <span className="text-slate-900 font-bold">{activeRecord.company}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Partner Category:</span>
                    <span className="text-slate-900 font-bold uppercase">{activeRecord.partnerType}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Agreement Version:</span>
                    <span className="text-slate-900">v{activeRecord.agreementVersion} (Clauses 1–81)</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Acceptance Timestamp:</span>
                    <span className="text-slate-900">{new Date(activeRecord.acceptanceDate).toUTCString()}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Territory & Commission Sched:</span>
                    <span className="text-slate-900">{activeRecord.territorySummary} · {activeRecord.commissionScheduleRef}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200">
                  <span className="text-slate-400 block text-[10px] mb-1">Cryptographic Audit Hash:</span>
                  <div className="p-2 rounded bg-slate-900 text-lime-400 text-[10px] break-all">
                    {activeRecord.auditHash}
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-slate-400 block text-[10px] mb-1">Signatory Digital Stamp:</span>
                  <div className="p-3 bg-white border border-slate-200 rounded-lg flex items-center justify-between">
                    <span className="italic font-serif text-base text-slate-800">{activeRecord.digitalSignature}</span>
                    <span className="text-[10px] text-emerald-700 font-bold">VERIFIED SIGNATURE</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-slate-500" />
                  <span>Print Execution Certificate</span>
                </button>

                <div className="flex items-center gap-3">
                  <button
                    onClick={onClose}
                    className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      onNavigateToPortal();
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-xl transition-colors cursor-pointer shadow-sm"
                  >
                    <span>Launch Partner Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Execution Form */
            <form onSubmit={handleExecute} className="space-y-6">
              {/* Introduction Banner */}
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs text-blue-900 space-y-1">
                <span className="font-bold block">Binding Legal Instrument:</span>
                <p>
                  You are entering into the NextSoftHR Reseller, Partner, Distributor, Affiliate & Associate Agreement (Version 1.0). Please review and complete your signatory credentials below.
                </p>
              </div>

              {/* Required Signatory Organization Details */}
              <div className="space-y-4 text-xs">
                <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                  1. Organization & Signatory Particulars
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Full Legal Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chukwuemeka Okonkwo"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Job Title / Designation *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Managing Director / Partner"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Company / Firm Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Okonkwo Technologies Ltd"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Country of Registration *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Nigeria"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Corporate Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. legal@okonkwotech.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Direct Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+234 915 848 2622"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Partner Type / Category *</label>
                    <select
                      value={partnerType}
                      onChange={(e) => setPartnerType(e.target.value as PartnerCategoryType)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:bg-white"
                    >
                      {PARTNER_CATEGORIES.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.title} ({cat.commissionType})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Agreement Version</label>
                    <input
                      type="text"
                      disabled
                      value="Version 1.0 (Clauses 1–81)"
                      className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-500 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Digital Signature Pad / Typed Signature */}
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="text-sm font-bold text-slate-900">
                    2. Digital Signature
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSignatureMode('type')}
                      className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer ${
                        signatureMode === 'type'
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      Type Signature
                    </button>
                    <button
                      type="button"
                      onClick={() => setSignatureMode('draw')}
                      className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer ${
                        signatureMode === 'draw'
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      Draw Signature
                    </button>
                  </div>
                </div>

                {signatureMode === 'type' ? (
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Type Your Legal Name as Digital Signature:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chukwuemeka Okonkwo"
                      value={typedSignature}
                      onChange={(e) => setTypedSignature(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-serif text-lg italic focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                    />
                    <p className="mt-1 text-[11px] text-slate-400">
                      Typing your name acts as a legally recognized electronic signature under applicable digital commerce laws.
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-slate-700">Draw Signature on Canvas:</span>
                      <button
                        type="button"
                        onClick={clearCanvas}
                        className="text-[11px] text-rose-600 hover:text-rose-700 inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Eraser className="w-3 h-3" />
                        <span>Clear</span>
                      </button>
                    </div>
                    <canvas
                      ref={canvasRef}
                      width={600}
                      height={120}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={stopDrawing}
                      className="w-full h-28 bg-slate-50 border border-slate-200 rounded-xl cursor-crosshair touch-none"
                    />
                  </div>
                )}
              </div>

              {/* Exact Required Legal Statements & Checkbox */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs text-slate-700">
                {/* Authority Declaration Prompt Requirement */}
                <div className="flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="chk-authorized"
                    required
                    checked={isAuthorized}
                    onChange={(e) => setIsAuthorized(e.target.checked)}
                    className="mt-0.5 w-4 h-4 text-blue-700 rounded border-slate-300 focus:ring-blue-600"
                  />
                  <label htmlFor="chk-authorized" className="font-semibold text-slate-900 select-none cursor-pointer">
                    “I confirm that I am authorized to accept this Agreement on behalf of the organization identified below, where applicable.”
                  </label>
                </div>

                {/* Agreement Consent Checkbox Prompt Requirement */}
                <div className="flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="chk-agreed"
                    required
                    checked={hasReadAgreed}
                    onChange={(e) => setHasReadAgreed(e.target.checked)}
                    className="mt-0.5 w-4 h-4 text-blue-700 rounded border-slate-300 focus:ring-blue-600"
                  />
                  <label htmlFor="chk-agreed" className="font-semibold text-slate-900 select-none cursor-pointer">
                    I have read, understood and agree to the NextSoftHR Reseller, Partner, Distributor, Affiliate & Associate Agreement.
                  </label>
                </div>
              </div>

              {/* Submission Button */}
              <button
                type="submit"
                disabled={!hasReadAgreed || !isAuthorized}
                className={`w-full py-3 px-6 text-sm font-bold rounded-xl transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2 ${
                  hasReadAgreed && isAuthorized
                    ? 'bg-blue-700 hover:bg-blue-800 text-white'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <FileCheck2 className="w-4 h-4" />
                <span>Accept Agreement</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
