import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, FileText, Send, ShieldCheck } from 'lucide-react';
import { NextSoftLogo } from './NextSoftLogo';

interface RefundRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RefundRequestModal: React.FC<RefundRequestModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    accountEmail: '',
    invoiceNumber: '',
    transactionRef: '',
    paymentDate: '',
    amount: '',
    currency: 'USD',
    reasonCategory: 'Duplicate Payment',
    reasonExplanation: '',
  });

  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!formData.companyName.trim() || !formData.accountEmail.trim() || !formData.invoiceNumber.trim() || !formData.amount.trim()) {
      setValidationError('Please complete all mandatory fields marked with an asterisk (*).');
      return;
    }

    if (!formData.accountEmail.includes('@') || !formData.accountEmail.includes('.')) {
      setValidationError('Please enter a valid corporate email address.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedTicket = `NSHR-REF-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedTicket(generatedTicket);
      setIsSubmitting(false);
    }, 600);
  };

  const handleReset = () => {
    setSubmittedTicket(null);
    setFormData({
      companyName: '',
      accountEmail: '',
      invoiceNumber: '',
      transactionRef: '',
      paymentDate: '',
      amount: '',
      currency: 'USD',
      reasonCategory: 'Duplicate Payment',
      reasonExplanation: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-200">
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-[#131D31] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh] transition-colors"
        role="dialog"
        aria-modal="true"
        aria-labelledby="refund-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0F172A]">
          <div className="flex items-center gap-3">
            <NextSoftLogo size="sm" />
            <div className="h-4 w-px bg-slate-200 dark:bg-slate-700" />
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Billing Operations Desk
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Close refund dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto">
          {submittedTicket ? (
            <div className="text-center py-6 px-4">
              <div className="w-16 h-16 bg-[#84CC16]/20 rounded-full flex items-center justify-center mx-auto mb-4 text-[#4D7C0F] dark:text-[#84CC16]">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-[#0A3B7B] dark:text-white tracking-tight">
                Refund Claim Submitted Successfully
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-md mx-auto">
                Your refund inquiry has been logged into the NextSoftHR Billing Verification registry. Our finance desk will review the transaction logs within 48–72 business hours.
              </p>

              <div className="mt-6 p-4 bg-slate-50 dark:bg-[#0F172A] rounded-xl border border-slate-200/80 dark:border-slate-800 inline-block text-left max-w-md w-full">
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Claim Tracking Reference:</div>
                <div className="text-lg font-mono font-bold text-[#0A3B7B] dark:text-[#38BDF8] mt-0.5 tracking-wider">
                  {submittedTicket}
                </div>
                <div className="mt-3 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                  <div>Company: <span className="font-semibold text-slate-800 dark:text-slate-100">{formData.companyName}</span></div>
                  <div>Account: <span className="font-semibold text-slate-800 dark:text-slate-100">{formData.accountEmail}</span></div>
                  <div>Invoice: <span className="font-semibold text-slate-800 dark:text-slate-100">{formData.invoiceNumber}</span></div>
                  <div>Amount: <span className="font-semibold text-slate-800 dark:text-slate-100">{formData.currency} {formData.amount}</span></div>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#0A3B7B] hover:bg-[#1E40AF] text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  Done &amp; Close Window
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-5">
                <h2 id="refund-modal-title" className="text-xl font-bold text-[#0A3B7B] dark:text-white tracking-tight">
                  Submit a Refund Request
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  As described in Section 17, provide complete invoice and transaction details to ensure rapid audit by NextSoftHR Global Billing.
                </p>
              </div>

              {validationError && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 rounded-lg flex items-center gap-2 text-xs text-red-700 dark:text-red-300">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Customer / Company Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="e.g. Acme Logistics Global Ltd"
                      className="w-full px-3 py-2 text-sm bg-white dark:bg-[#0F172A] border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A3B7B] dark:focus:ring-[#38BDF8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Primary Account Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.accountEmail}
                      onChange={(e) => setFormData({ ...formData, accountEmail: e.target.value })}
                      placeholder="billing@yourcompany.com"
                      className="w-full px-3 py-2 text-sm bg-white dark:bg-[#0F172A] border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A3B7B] dark:focus:ring-[#38BDF8]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      NextSoftHR Invoice Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.invoiceNumber}
                      onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
                      placeholder="e.g. INV-2026-9042"
                      className="w-full px-3 py-2 text-sm bg-white dark:bg-[#0F172A] border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A3B7B] dark:focus:ring-[#38BDF8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Payment Transaction Reference / Gateway ID
                    </label>
                    <input
                      type="text"
                      value={formData.transactionRef}
                      onChange={(e) => setFormData({ ...formData, transactionRef: e.target.value })}
                      placeholder="e.g. TXN-99841284 / Card Auth code"
                      className="w-full px-3 py-2 text-sm bg-white dark:bg-[#0F172A] border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A3B7B] dark:focus:ring-[#38BDF8]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Date of Payment
                    </label>
                    <input
                      type="date"
                      value={formData.paymentDate}
                      onChange={(e) => setFormData({ ...formData, paymentDate: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-white dark:bg-[#0F172A] border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A3B7B] dark:focus:ring-[#38BDF8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Currency
                    </label>
                    <select
                      value={formData.currency}
                      onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-white dark:bg-[#0F172A] border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A3B7B] dark:focus:ring-[#38BDF8]"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="NGN">NGN (₦)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="CAD">CAD ($)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Amount Paid *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      placeholder="e.g. 450.00"
                      className="w-full px-3 py-2 text-sm bg-white dark:bg-[#0F172A] border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A3B7B] dark:focus:ring-[#38BDF8]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Primary Basis for Refund (Section 4 Eligibility)
                  </label>
                  <select
                    value={formData.reasonCategory}
                    onChange={(e) => setFormData({ ...formData, reasonCategory: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-white dark:bg-[#0F172A] border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A3B7B] dark:focus:ring-[#38BDF8]"
                  >
                    <option value="Duplicate Payment">Duplicate Payment / Gateway Multiple Debit</option>
                    <option value="NextSoftHR Billing Error">NextSoftHR System Calculation or Billing Discrepancy</option>
                    <option value="Post-Cancellation Charge">Charge Executed After Valid Timely Cancellation</option>
                    <option value="Technical Outage">Material Unresolved Service Interruption (&gt;48 hrs)</option>
                    <option value="Unauthorized Transaction">Verified Unauthorized or Fraudulent Card Use</option>
                    <option value="Statutory Right">Statutory Rescission / Consumer Right under Local Law</option>
                    <option value="Other">Other Specific Contractual Ground</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Detailed Reason &amp; Supporting Context *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.reasonExplanation}
                    onChange={(e) => setFormData({ ...formData, reasonExplanation: e.target.value })}
                    placeholder="Provide specific details regarding the transaction and reason for your claim..."
                    className="w-full px-3 py-2 text-sm bg-white dark:bg-[#0F172A] border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A3B7B] dark:focus:ring-[#38BDF8]"
                  />
                </div>

                <div className="p-3 bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-lg flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                    <span>Upload Bank Receipt / Invoice PDF (Optional)</span>
                  </div>
                  <span className="text-[11px] font-medium text-[#0A3B7B] dark:text-[#38BDF8] cursor-pointer hover:underline">
                    Attach File
                  </span>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-[#84CC16]" />
                    <span>Encrypted 256-bit SSL Transmission</span>
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
                        <span>Validating...</span>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5 text-[#84CC16]" />
                          <span>Submit Request</span>
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
