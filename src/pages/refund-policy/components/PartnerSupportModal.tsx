import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, Send, Handshake } from 'lucide-react';
import { NextSoftLogo } from './NextSoftLogo';

interface PartnerSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PartnerSupportModal: React.FC<PartnerSupportModalProps> = ({ isOpen, onClose }) => {
  const [partnerData, setPartnerData] = useState({
    partnerOrg: '',
    partnerId: '',
    partnerCategory: 'Reseller',
    contactName: '',
    contactEmail: '',
    clientName: '',
    inquiryType: 'Commission Review & Reconciliation',
    details: '',
  });

  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!partnerData.partnerOrg.trim() || !partnerData.contactEmail.trim() || !partnerData.details.trim()) {
      setErrorMsg('Please complete all required fields (*).');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const generated = `NSHR-PRT-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedTicket(generated);
      setIsSubmitting(false);
    }, 600);
  };

  const handleReset = () => {
    setSubmittedTicket(null);
    setPartnerData({
      partnerOrg: '',
      partnerId: '',
      partnerCategory: 'Reseller',
      contactName: '',
      contactEmail: '',
      clientName: '',
      inquiryType: 'Commission Review & Reconciliation',
      details: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-200">
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-[#131D31] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh] transition-colors"
        role="dialog"
        aria-modal="true"
        aria-labelledby="partner-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0F172A]">
          <div className="flex items-center gap-3">
            <NextSoftLogo size="sm" />
            <div className="h-4 w-px bg-slate-200 dark:bg-slate-700" />
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Channel &amp; Partner Desk
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">
          {submittedTicket ? (
            <div className="text-center py-6 px-4">
              <div className="w-16 h-16 bg-[#0A3B7B]/10 dark:bg-[#38BDF8]/15 rounded-full flex items-center justify-center mx-auto mb-4 text-[#0A3B7B]">
                <CheckCircle2 className="w-10 h-10 text-[#84CC16]" />
              </div>
              <h3 className="text-2xl font-bold text-[#0A3B7B] dark:text-white tracking-tight">
                Partner Inquiry Dispatched
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-md mx-auto">
                Your request has been routed to NextSoftHR Global Channel Operations. A dedicated Partner Account Director will review your file and respond within one (1) business day.
              </p>

              <div className="mt-6 p-4 bg-slate-50 dark:bg-[#0F172A] rounded-xl border border-slate-200/80 dark:border-slate-800 inline-block text-left max-w-md w-full">
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Partner Docket Number:</div>
                <div className="text-lg font-mono font-bold text-[#0A3B7B] dark:text-[#38BDF8] mt-0.5 tracking-wider">
                  {submittedTicket}
                </div>
                <div className="mt-3 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                  <div>Organization: <span className="font-semibold text-slate-800 dark:text-slate-100">{partnerData.partnerOrg}</span></div>
                  <div>Category: <span className="font-semibold text-slate-800 dark:text-slate-100">{partnerData.partnerCategory}</span></div>
                  <div>Inquiry: <span className="font-semibold text-slate-800 dark:text-slate-100">{partnerData.inquiryType}</span></div>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-[#0A3B7B] hover:bg-[#1E40AF] text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  Return to Policy
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-5">
                <h2 id="partner-modal-title" className="text-xl font-bold text-[#0A3B7B] dark:text-white tracking-tight">
                  Contact NextSoftHR Partner Team
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Specialized support for Authorized Resellers, Master Distributors, Affiliates, and Accounting/HR Alliances (Sections 11–14 &amp; 18).
                </p>
              </div>

              {errorMsg && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 rounded-lg flex items-center gap-2 text-xs text-red-700 dark:text-red-300">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Partner Organization Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={partnerData.partnerOrg}
                      onChange={(e) => setPartnerData({ ...partnerData, partnerOrg: e.target.value })}
                      placeholder="e.g. Apex HR Solutions Ltd"
                      className="w-full px-3 py-2 text-sm bg-white dark:bg-[#0F172A] border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A3B7B] dark:focus:ring-[#38BDF8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Partner / Reseller ID (If known)
                    </label>
                    <input
                      type="text"
                      value={partnerData.partnerId}
                      onChange={(e) => setPartnerData({ ...partnerData, partnerId: e.target.value })}
                      placeholder="e.g. NSHR-VAR-8120"
                      className="w-full px-3 py-2 text-sm bg-white dark:bg-[#0F172A] border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A3B7B] dark:focus:ring-[#38BDF8]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Partner Category
                    </label>
                    <select
                      value={partnerData.partnerCategory}
                      onChange={(e) => setPartnerData({ ...partnerData, partnerCategory: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-white dark:bg-[#0F172A] border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A3B7B] dark:focus:ring-[#38BDF8]"
                    >
                      <option value="Reseller">Authorized Reseller (VAR)</option>
                      <option value="Distributor">Master Wholesale Distributor</option>
                      <option value="Affiliate">Affiliate / Referral Partner</option>
                      <option value="Accounting/HR">Accounting / HR Consulting Partner</option>
                      <option value="Technology">Technology / API Integration Partner</option>
                      <option value="Channel Associate">Authorized Business Associate</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Inquiry Nature
                    </label>
                    <select
                      value={partnerData.inquiryType}
                      onChange={(e) => setPartnerData({ ...partnerData, inquiryType: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-white dark:bg-[#0F172A] border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A3B7B] dark:focus:ring-[#38BDF8]"
                    >
                      <option value="Commission Review & Reconciliation">Commission Review &amp; Reconciliation</option>
                      <option value="Client Refund Coordination">Client Refund Request Coordination</option>
                      <option value="License Reallocation">Unused License Rollover / Reallocation</option>
                      <option value="Chargeback Clawback Review">Chargeback / Clawback Inquiry</option>
                      <option value="Contract & Margin Terms">Contract Terms or Margin Adjustment</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Contact Person Name
                    </label>
                    <input
                      type="text"
                      value={partnerData.contactName}
                      onChange={(e) => setPartnerData({ ...partnerData, contactName: e.target.value })}
                      placeholder="e.g. Oluwaseun Adeleke"
                      className="w-full px-3 py-2 text-sm bg-white dark:bg-[#0F172A] border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A3B7B] dark:focus:ring-[#38BDF8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Corporate Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={partnerData.contactEmail}
                      onChange={(e) => setPartnerData({ ...partnerData, contactEmail: e.target.value })}
                      placeholder="partner@yourfirm.com"
                      className="w-full px-3 py-2 text-sm bg-white dark:bg-[#0F172A] border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A3B7B] dark:focus:ring-[#38BDF8]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Associated Client Account / Invoice ID (Optional)
                  </label>
                  <input
                    type="text"
                    value={partnerData.clientName}
                    onChange={(e) => setPartnerData({ ...partnerData, clientName: e.target.value })}
                    placeholder="e.g. Zenith Tech Ltd / INV-2026-8810"
                    className="w-full px-3 py-2 text-sm bg-white dark:bg-[#0F172A] border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A3B7B] dark:focus:ring-[#38BDF8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Specific Inquiry or Adjustment Details *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={partnerData.details}
                    onChange={(e) => setPartnerData({ ...partnerData, details: e.target.value })}
                    placeholder="Provide relevant transaction references, commission line items, or customer details..."
                    className="w-full px-3 py-2 text-sm bg-white dark:bg-[#0F172A] border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A3B7B] dark:focus:ring-[#38BDF8]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                    <Handshake className="w-4 h-4 text-[#0A3B7B] dark:text-[#38BDF8]" />
                    <span>Direct Channel Operations Queue</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 px-5 py-2 bg-[#0A3B7B] hover:bg-[#1E40AF] text-white text-xs font-semibold rounded-lg transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Transmitting...</span>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5 text-[#84CC16]" />
                          <span>Dispatch to Partner Desk</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
