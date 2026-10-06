import React, { useState, useRef } from 'react';
import { CheckSquare, Square, PenTool, CheckCircle, Award, Printer, ArrowUpRight, ShieldCheck, RefreshCw } from 'lucide-react';
import { PartnerExecutionData, PartnerCategory, PartnerTier } from '../types';
import { SCHEDULE_METADATA } from '../data/scheduleData';

interface DigitalExecutionProps {
  executionData: PartnerExecutionData;
  onUpdateExecutionData: (data: PartnerExecutionData) => void;
  onJumpToSection: (sectionId: number) => void;
}

export const DigitalExecution: React.FC<DigitalExecutionProps> = ({
  executionData,
  onUpdateExecutionData,
  onJumpToSection,
}) => {
  const [formData, setFormData] = useState<PartnerExecutionData>(executionData);
  const [signatureMode, setSignatureMode] = useState<'draw' | 'type'>('type');
  const [typedSignature, setTypedSignature] = useState(executionData.authorizedRepName || 'Francis O. Erikefe');
  const [isSigned, setIsSigned] = useState(Boolean(executionData.signedTimestamp));
  const [showCertificate, setShowCertificate] = useState(false);

  // Canvas drawing ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);

  // Checkbox handlers
  const toggleCheckbox = (key: keyof PartnerExecutionData['termsAccepted']) => {
    setFormData((prev) => ({
      ...prev,
      termsAccepted: {
        ...prev.termsAccepted,
        [key]: !prev.termsAccepted[key],
      },
    }));
  };

  const allTermsChecked =
    formData.termsAccepted.readAndUnderstood &&
    formData.termsAccepted.acceptProvisions &&
    formData.termsAccepted.understandPaymentConditions &&
    formData.termsAccepted.termsInPartnerSchedule;

  // Canvas signature logic
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#1e3a8a'; // Deep navy signature ink
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleExecute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allTermsChecked) {
      alert('Please confirm all 4 mandatory acceptance checkboxes under Section 60.');
      return;
    }

    const timestamp = new Date().toISOString();
    const certCode = `NSHR-SCH-B-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}-EXEC`;

    const updated: PartnerExecutionData = {
      ...formData,
      signedTimestamp: timestamp,
      counterSignatory: {
        ...formData.counterSignatory,
        signed: true,
        signedDate: new Date().toISOString().split('T')[0],
        certificateId: certCode,
      },
    };

    onUpdateExecutionData(updated);
    setIsSigned(true);
    setShowCertificate(true);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
              <span>Schedule B Formal Execution</span>
              <span aria-hidden="true">·</span>
              <span className="text-blue-700 font-mono">Sections 60 & 61 Compliance</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Commercial Schedule E-Acceptance & Execution
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Complete the formal covenants, partner classification, and authorized representative digital signing to activate commercial commission eligibility.
            </p>
          </div>

          {isSigned && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowCertificate(!showCertificate)}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded transition-colors"
              >
                <Award className="w-4 h-4" />
                <span>{showCertificate ? 'View Execution Form' : 'View Executed Certificate'}</span>
              </button>
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Certificate</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Executed Certificate Display if completed */}
      {showCertificate && isSigned && (
        <div className="bg-white border-2 border-slate-800 rounded-lg p-8 space-y-6 shadow-md relative overflow-hidden">
          {/* Certificate Header */}
          <div className="text-center space-y-1 pb-6 border-b border-slate-200">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">
              OFFICIAL CERTIFICATE OF COMMERCIAL EXECUTION
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              NEXTSOFTHR SCHEDULE B COMMERCIAL ACCEPTANCE
            </h3>
            <p className="text-xs text-slate-500">
              Schedule B to the NextSoftHR Reseller, Partner, Distributor, Affiliate & Associate Agreement
            </p>
            <div className="pt-2 text-xs font-mono text-slate-400">
              Verification ID: <span className="font-bold text-slate-700">{formData.counterSignatory.certificateId}</span>
            </div>
          </div>

          {/* Certificate Body Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-slate-700 py-4">
            <div className="space-y-2">
              <div className="text-slate-400 font-semibold uppercase text-[10px]">Partner Profile</div>
              <div><strong className="text-slate-900">Partner Entity:</strong> {formData.partnerName}</div>
              <div><strong className="text-slate-900">Company Name:</strong> {formData.companyName}</div>
              <div><strong className="text-slate-900">Partner Category:</strong> {formData.partnerCategory}</div>
              <div><strong className="text-slate-900">Approved Tier:</strong> {formData.partnerTier} ({formData.commissionRate}%)</div>
            </div>

            <div className="space-y-2">
              <div className="text-slate-400 font-semibold uppercase text-[10px]">Territory & Validity</div>
              <div><strong className="text-slate-900">Assigned Territory:</strong> {formData.territory}</div>
              <div><strong className="text-slate-900">Effective Date:</strong> {formData.effectiveDate}</div>
              <div><strong className="text-slate-900">Signing Timestamp:</strong> {formData.signedTimestamp}</div>
              <div><strong className="text-slate-900">Document Version:</strong> {SCHEDULE_METADATA.version}</div>
            </div>
          </div>

          {/* Four Legal Affirmations */}
          <div className="p-4 bg-slate-50 rounded border border-slate-200 text-xs space-y-1.5 text-slate-700">
            <div className="font-bold text-slate-900 mb-1">Affirmed Legal Covenants (Section 60):</div>
            <div className="flex items-center gap-2 text-emerald-800">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Partner has read and understood the entire Schedule B terms and conditions.</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-800">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Partner accepts commission, payment, and attribution provisions applicable to its category.</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-800">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Partner acknowledges commissions remain subject to payment receipt, refunds, chargebacks, and anti-fraud rules.</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-800">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Partner acknowledges specific commercial percentages are recorded in the approved Schedule.</span>
            </div>
          </div>

          {/* Dual Signatures Block (Section 60 & 61) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 border-t border-slate-200 text-xs">
            {/* Partner Signatory */}
            <div className="space-y-2">
              <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block">
                For the Partner (Section 60)
              </span>
              <div className="p-3 bg-slate-50 rounded border border-slate-200 min-h-[70px] flex items-center justify-center font-serif text-xl italic text-blue-900">
                {typedSignature || formData.authorizedRepName}
              </div>
              <div><strong>Authorized Representative:</strong> {formData.authorizedRepName}</div>
              <div className="text-slate-500"><strong>Title:</strong> {formData.repTitle}</div>
              <div className="text-[11px] text-slate-400 font-mono">Date: {formData.effectiveDate}</div>
            </div>

            {/* NextSoftHR Signatory */}
            <div className="space-y-2">
              <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block">
                For NextSoftHR (Section 61)
              </span>
              <div className="p-3 bg-slate-50 rounded border border-slate-200 min-h-[70px] flex items-center justify-center font-serif text-xl italic text-slate-800">
                {formData.counterSignatory.name}
              </div>
              <div><strong>Authorized Officer:</strong> {formData.counterSignatory.name}</div>
              <div className="text-slate-500"><strong>Title:</strong> {formData.counterSignatory.title}</div>
              <div className="text-[11px] text-slate-400 font-mono">Date: {formData.counterSignatory.signedDate}</div>
            </div>
          </div>

          {/* Official Verification Seal Footer */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
            <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>NextSoftHR Cryptographically Logged Certificate</span>
            </div>
            <span>Support: +2349158482622 · www.nextsofthr.org</span>
          </div>
        </div>
      )}

      {/* Main Execution Form (Section 60) */}
      <form onSubmit={handleExecute} className="space-y-8">
        
        {/* Step 1: The Four Mandatory Covenants (Section 60 Checkboxes) */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              1. Section 60 Mandatory Affirmations
            </span>
            <button
              type="button"
              onClick={() => onJumpToSection(60)}
              className="text-xs text-blue-600 hover:underline flex items-center gap-1"
            >
              View § 60 Text <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            {[
              {
                key: 'readAndUnderstood' as const,
                label: 'I have read and understood this Commission & Revenue Share Schedule (Schedule B).'
              },
              {
                key: 'acceptProvisions' as const,
                label: 'I accept the commission, payment and attribution provisions applicable to my Partner category.'
              },
              {
                key: 'understandPaymentConditions' as const,
                label: 'I understand that commissions are subject to customer payment, refunds, chargebacks, attribution and applicable program rules.'
              },
              {
                key: 'termsInPartnerSchedule' as const,
                label: 'I understand that my specific commercial terms are contained in my Partner Schedule.'
              },
            ].map((item) => {
              const isChecked = formData.termsAccepted[item.key];
              return (
                <div
                  key={item.key}
                  onClick={() => toggleCheckbox(item.key)}
                  className={`p-3.5 border rounded-md cursor-pointer flex items-start gap-3 transition-colors ${
                    isChecked
                      ? 'border-blue-500 bg-blue-50/30'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}}
                    className="mt-0.5 rounded text-blue-600 focus:ring-0 cursor-pointer"
                  />
                  <span className="text-xs sm:text-sm font-medium text-slate-800 select-none leading-snug">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 2: Partner Profile Details */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block border-b border-slate-100 pb-3">
            2. Partner Profile & Commercial Parameters (Section 60)
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Partner Legal Name *</label>
              <input
                type="text"
                required
                value={formData.partnerName}
                onChange={(e) => setFormData({ ...formData, partnerName: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Company / Organization *</label>
              <input
                type="text"
                required
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Partner Category</label>
              <select
                value={formData.partnerCategory}
                onChange={(e) => setFormData({ ...formData, partnerCategory: e.target.value as PartnerCategory })}
                className="w-full px-3 py-2 border border-slate-300 rounded"
              >
                <option value="Reseller">Reseller (Margins & Direct Invoicing)</option>
                <option value="Referral Partner">Referral Partner (Lead Registration)</option>
                <option value="Distributor">Distributor (Network Overrides)</option>
                <option value="Affiliate">Affiliate (Tracking Links)</option>
                <option value="Associate">Associate (Strategic Co-Marketing)</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Approved Partner Tier</label>
              <select
                value={formData.partnerTier}
                onChange={(e) => {
                  const tier = e.target.value as PartnerTier;
                  const rateMap: Record<string, number> = {
                    'Bronze': 15,
                    'Silver': 20,
                    'Gold / Partner': 30,
                    'Platinum': 40,
                    'Custom Enterprise': 35
                  };
                  setFormData({
                    ...formData,
                    partnerTier: tier,
                    commissionRate: rateMap[tier] || 30
                  });
                }}
                className="w-full px-3 py-2 border border-slate-300 rounded"
              >
                <option value="Bronze">Bronze (15% Standard)</option>
                <option value="Silver">Silver (20% Standard)</option>
                <option value="Gold / Partner">Gold / Partner (30% Standard)</option>
                <option value="Platinum">Platinum (40% Standard)</option>
                <option value="Custom Enterprise">Custom Enterprise Terms</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Assigned Commission Rate (%)</label>
              <input
                type="number"
                min="5"
                max="50"
                value={formData.commissionRate}
                onChange={(e) => setFormData({ ...formData, commissionRate: Number(e.target.value) })}
                className="w-full px-3 py-2 font-mono font-bold border border-slate-300 rounded"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Authorized Territory *</label>
              <input
                type="text"
                required
                value={formData.territory}
                onChange={(e) => setFormData({ ...formData, territory: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Effective Date *</label>
              <input
                type="date"
                required
                value={formData.effectiveDate}
                onChange={(e) => setFormData({ ...formData, effectiveDate: e.target.value })}
                className="w-full px-3 py-2 font-mono border border-slate-300 rounded"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Authorized Representative Name *</label>
              <input
                type="text"
                required
                value={formData.authorizedRepName}
                onChange={(e) => {
                  setFormData({ ...formData, authorizedRepName: e.target.value });
                  setTypedSignature(e.target.value);
                }}
                className="w-full px-3 py-2 border border-slate-300 rounded"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-semibold text-slate-700 block mb-1">Corporate Title / Role *</label>
              <input
                type="text"
                required
                value={formData.repTitle}
                onChange={(e) => setFormData({ ...formData, repTitle: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded"
                placeholder="e.g. Chief Commercial Officer / Managing Director"
              />
            </div>
          </div>
        </div>

        {/* Step 3: Digital Signature Pad */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              3. Digital Signature Authorization (Section 60)
            </span>
            <div className="flex items-center gap-1 text-xs">
              <button
                type="button"
                onClick={() => setSignatureMode('type')}
                className={`px-2.5 py-1 rounded font-medium ${
                  signatureMode === 'type' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                Type Name
              </button>
              <button
                type="button"
                onClick={() => setSignatureMode('draw')}
                className={`px-2.5 py-1 rounded font-medium ${
                  signatureMode === 'draw' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                Draw Signature
              </button>
            </div>
          </div>

          {signatureMode === 'type' ? (
            <div className="space-y-3">
              <label className="text-xs text-slate-600 block">
                Type your full legal name as digital signature:
              </label>
              <input
                type="text"
                value={typedSignature}
                onChange={(e) => setTypedSignature(e.target.value)}
                className="w-full px-4 py-3 font-serif italic text-2xl border border-slate-300 rounded text-blue-900 bg-slate-50/50"
              />
              <span className="text-[11px] text-slate-400 block">
                By typing your name, you acknowledge this constitutes a legally binding electronic signature under applicable digital transaction legislation.
              </span>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="border border-slate-300 rounded-md overflow-hidden bg-slate-50/50 touch-none">
                <canvas
                  ref={canvasRef}
                  width={500}
                  height={150}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full h-36 cursor-crosshair block"
                />
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Sign within the box using your mouse or finger</span>
                <button
                  type="button"
                  onClick={clearCanvas}
                  className="text-slate-500 hover:text-slate-800 underline"
                >
                  Clear Signature
                </button>
              </div>
            </div>
          )}

          {/* NextSoftHR Counter-Signature Preview (Section 61) */}
          <div className="pt-4 border-t border-slate-100 text-xs">
            <span className="font-semibold text-slate-700 block mb-1">
              Countersigning Authority for NextSoftHR (Section 61):
            </span>
            <div className="p-3 bg-slate-50 rounded flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900">{formData.counterSignatory.name}</div>
                <div className="text-[11px] text-slate-500">{formData.counterSignatory.title}</div>
              </div>
              <div className="text-right">
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-semibold rounded text-[10px]">
                  Authorized Channel Signatory
                </span>
              </div>
            </div>
          </div>

          {/* Submission CTA */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <div className="text-xs text-slate-500">
              {!allTermsChecked ? (
                <span className="text-amber-700 font-medium">
                  Please accept all 4 Section 60 affirmations above to sign.
                </span>
              ) : (
                <span className="text-emerald-700 font-medium">
                  All legal requirements satisfied. Ready to formalize.
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={!allTermsChecked}
              className={`px-5 py-2.5 text-xs sm:text-sm font-bold text-white rounded-md transition-all shadow-xs ${
                allTermsChecked
                  ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                  : 'bg-slate-300 cursor-not-allowed'
              }`}
            >
              Sign & Execute Schedule B
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};
