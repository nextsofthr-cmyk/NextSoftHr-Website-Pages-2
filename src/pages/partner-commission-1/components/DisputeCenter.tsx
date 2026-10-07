import React, { useState } from 'react';
import { AlertCircle, Plus, FileText, CheckCircle2, Clock, ArrowUpRight, Scale } from 'lucide-react';
import { DisputeRecord } from '../types';

interface DisputeCenterProps {
  disputes: DisputeRecord[];
  onSubmitDispute: (dispute: DisputeRecord) => void;
  onJumpToSection: (sectionId: number) => void;
}

export const DisputeCenter: React.FC<DisputeCenterProps> = ({
  disputes,
  onSubmitDispute,
  onJumpToSection,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState('INV-2026-0932');
  const [customerName, setCustomerName] = useState('Meridian Capital Partners');
  const [partnerId, setPartnerId] = useState('PTR-8821');
  const [disputedAmount, setDisputedAmount] = useState<number>(180);
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason || !invoiceNumber) return;

    const newRecord: DisputeRecord = {
      id: `dsp-${Date.now()}`,
      invoiceNumber,
      customerName,
      partnerId,
      disputedAmount,
      submissionDate: new Date().toISOString().split('T')[0],
      reason,
      status: 'Under Investigation',
      investigationNotes: 'Submitted to NextSoftHR Channel Operations audit team.'
    };

    onSubmitDispute(newRecord);
    setShowModal(false);
    setReason('');
  };

  return (
    <div className="space-y-6">
      {/* Dispute Center Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
              <span>Section 40 Commercial Disputes</span>
              <span aria-hidden="true">·</span>
              <span className="text-blue-700 font-mono">Strict 30-Day Audit Window</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Commission Dispute & Reconciliation Center
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Per Section 40, partners may submit commercial reconciliation claims within 30 days of statement publication. All determinations are investigated by NextSoftHR Channel Operations.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>File New Dispute (§ 40)</span>
          </button>
        </div>

        {/* 30-Day Rules Card */}
        <div className="mt-6 pt-6 border-t border-slate-100 p-4 bg-amber-50/60 rounded-md border border-amber-200 text-xs text-amber-900 space-y-1">
          <div className="flex items-center gap-2 font-bold">
            <Clock className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Mandatory 30-Day Dispute Timeline (Section 40)</span>
          </div>
          <p className="text-amber-800 leading-relaxed">
            Claims must be filed within thirty (30) days from statement publication. Submissions must specify customer name, invoice reference, disputed delta, and documented evidence (e.g. proof of attribution or tier modification approval).
          </p>
        </div>
      </div>

      {/* Disputes History Table */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Filed Reconciliation Claims ({disputes.length})
          </span>
          <button
            onClick={() => onJumpToSection(40)}
            className="text-xs text-blue-600 hover:underline flex items-center gap-1"
          >
            View § 40 Procedure <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-3">Invoice & Customer</th>
                <th className="py-3 px-3">Filing Date</th>
                <th className="py-3 px-3 text-right">Disputed Amount</th>
                <th className="py-3 px-3">Partner Statement & Cause</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-3">Investigation Outcome</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {disputes.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50/80">
                  <td className="py-3 px-3">
                    <div className="font-bold text-slate-900">{d.invoiceNumber}</div>
                    <div className="text-[11px] text-slate-500">{d.customerName}</div>
                  </td>
                  <td className="py-3 px-3 font-mono text-[11px] text-slate-600">
                    {d.submissionDate}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-slate-900 tabular-nums">
                    ${d.disputedAmount.toFixed(2)}
                  </td>
                  <td className="py-3 px-3 max-w-xs text-slate-600">
                    {d.reason}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className={`inline-block px-2 py-0.5 text-[11px] font-semibold rounded ${
                      d.status.includes('Resolved')
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {d.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-[11px] text-slate-500 max-w-xs">
                    {d.investigationNotes || 'Under active administrative audit.'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Dispute Modal (Section 40) */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-lg border border-slate-200 max-w-lg w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  File Commercial Dispute (Section 40)
                </h3>
                <p className="text-xs text-slate-500">
                  Ensure submission occurs within the 30-day window.
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-700 text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Invoice Reference *</label>
                  <input
                    type="text"
                    required
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    className="w-full px-3 py-2 font-mono border border-slate-300 rounded"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Customer Name *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Partner ID *</label>
                  <input
                    type="text"
                    required
                    value={partnerId}
                    onChange={(e) => setPartnerId(e.target.value)}
                    className="w-full px-3 py-2 font-mono border border-slate-300 rounded"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Disputed Delta Amount ($) *</label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    required
                    value={disputedAmount}
                    onChange={(e) => setDisputedAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 font-mono border border-slate-300 rounded"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Cause of Dispute & Supporting Evidence *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Detail the calculation error, attribution discrepancy, or unapplied promotional tier..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
                >
                  Submit Dispute (§ 40)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
