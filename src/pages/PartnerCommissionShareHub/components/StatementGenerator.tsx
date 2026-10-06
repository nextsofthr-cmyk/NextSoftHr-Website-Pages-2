import React, { useState } from 'react';
import { 
  Receipt, 
  Download, 
  Printer, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  Calendar, 
  ArrowRight,
  Send,
  FileCheck2
} from 'lucide-react';
import { SAMPLE_STATEMENTS } from '../data/scheduleData';

export const StatementGenerator: React.FC<{ onNavigateToSection: (id: number) => void }> = ({ onNavigateToSection }) => {
  const [statements, setStatements] = useState(SAMPLE_STATEMENTS);
  const [selectedPeriod, setSelectedPeriod] = useState('All');
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [disputeInvoice, setDisputeInvoice] = useState('');
  const [disputeAmount, setDisputeAmount] = useState('');
  const [disputeReason, setDisputeReason] = useState('');
  const [disputeSubmitted, setDisputeSubmitted] = useState(false);

  const filteredStatements = selectedPeriod === 'All' 
    ? statements 
    : statements.filter(s => s.period === selectedPeriod);

  const totalGrossRevenue = filteredStatements.reduce((a, b) => a + b.revenue, 0);
  const totalCommissionable = filteredStatements.reduce((a, b) => a + b.commissionableRevenue, 0);
  const totalRefundAdjustments = filteredStatements.reduce((a, b) => a + b.refundAdjustment, 0);
  const totalNetCommission = filteredStatements.reduce((a, b) => a + b.netCommission, 0);

  // Export CSV conforming to Section 39's 11 fields
  const exportCSV = () => {
    const headers = [
      'Customer',
      'Invoice',
      'Product',
      'Purchase Date',
      'Revenue ($)',
      'Commissionable Revenue ($)',
      'Commission Pct (%)',
      'Commission Amount ($)',
      'Refund Adjustment ($)',
      'Chargeback Adjustment ($)',
      'Net Commission ($)',
      'Payment Status'
    ];

    const rows = filteredStatements.map(s => [
      `"${s.customer}"`,
      `"${s.invoice}"`,
      `"${s.product}"`,
      s.purchaseDate,
      s.revenue,
      s.commissionableRevenue,
      s.commissionPct,
      s.commissionAmount,
      s.refundAdjustment,
      s.chargebackAdjustment,
      s.netCommission,
      `"${s.paymentStatus}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `NextSoftHR_Commission_Statement_${selectedPeriod}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDisputeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDisputeSubmitted(true);
    setTimeout(() => {
      setShowDisputeModal(false);
      setDisputeSubmitted(false);
      setDisputeInvoice('');
      setDisputeAmount('');
      setDisputeReason('');
    }, 2500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/60 rounded-2xl p-6 border border-slate-800 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 text-xs font-semibold mb-2">
              <Receipt className="w-3.5 h-3.5" />
              Section 39 • Official 11-Field Commission Statement
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Commission Statements & Audit Ledger
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Audit-ready statements featuring all 11 contractual fields specified under Schedule B Section 39, with automated refund deductions and $100 payout threshold tracking.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportCSV}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Export CSV (11 Fields)</span>
            </button>

            <button
              onClick={() => setShowDisputeModal(true)}
              className="px-3.5 py-2 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-800/80 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>Section 40 Dispute (30-Day Window)</span>
            </button>
          </div>
        </div>

        {/* Period Selector Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800/80 text-xs">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span className="text-slate-300 font-medium">Accounting Period:</span>
            {['All', 'August 2026', 'September 2026'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 py-1 rounded-lg transition-colors font-medium ${
                  selectedPeriod === period
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
                }`}
              >
                {period}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 text-slate-400">
            <span>Minimum Payout: <strong className="text-white font-mono">$100.00</strong> (Sec 34)</span>
            <span>•</span>
            <span>Frequency: <strong className="text-white">Monthly</strong> (Sec 35)</span>
          </div>
        </div>
      </div>

      {/* Aggregate Financial Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">
            Gross Billed Revenue
          </span>
          <span className="text-xl font-bold text-white font-mono mt-1 block">
            ${totalGrossRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
          <span className="text-[10px] text-slate-500">Collected from end clients</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">
            Commissionable Net Revenue
          </span>
          <span className="text-xl font-bold text-cyan-400 font-mono mt-1 block">
            ${totalCommissionable.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
          <span className="text-[10px] text-slate-500">Section 11 eligible base</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">
            Refund & Chargeback Offsets
          </span>
          <span className="text-xl font-bold text-red-400 font-mono mt-1 block">
            ${totalRefundAdjustments.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
          <span className="text-[10px] text-slate-500">Section 30 & 31 deductions</span>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-950/60 to-slate-900 border border-cyan-500/40">
          <span className="text-[11px] uppercase tracking-wider text-cyan-300 block font-bold">
            Total Net Commission Due
          </span>
          <span className="text-2xl font-black text-white font-mono mt-1 block">
            ${totalNetCommission.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
          <span className="text-[10px] text-emerald-400 font-medium">
            ✓ Exceeds $100 payout threshold
          </span>
        </div>
      </div>

      {/* 11-Field Table specified in Section 39 */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="p-5 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              Itemized Statement Schedule (Section 39 Specification)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              1. Customer • 2. Invoice • 3. Product • 4. Date • 5. Revenue • 6. Commissionable • 7. % • 8. Comm. Amt • 9. Refund • 10. Chargeback • 11. Net & Status
            </p>
          </div>

          <button
            onClick={() => onNavigateToSection(39)}
            className="text-xs text-cyan-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View Section 39 Text</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/70 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800 font-mono">
              <tr>
                <th className="py-3 px-3">#1 Customer</th>
                <th className="py-3 px-3">#2 Invoice</th>
                <th className="py-3 px-3">#3 Product & Module</th>
                <th className="py-3 px-3">#4 Date</th>
                <th className="py-3 px-3 text-right">#5 Gross</th>
                <th className="py-3 px-3 text-right">#6 Comm. Rev</th>
                <th className="py-3 px-3 text-center">#7 Rate</th>
                <th className="py-3 px-3 text-right">#8 Base Comm</th>
                <th className="py-3 px-3 text-right">#9-10 Adj</th>
                <th className="py-3 px-3 text-right">#11 Net Comm</th>
                <th className="py-3 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filteredStatements.map((stmt) => (
                <tr key={stmt.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-3">
                    <span className="font-semibold text-white block">{stmt.customer}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{stmt.id}</span>
                  </td>

                  <td className="py-3.5 px-3 font-mono text-cyan-400 font-medium">
                    {stmt.invoice}
                  </td>

                  <td className="py-3.5 px-3">
                    <span className="text-slate-200">{stmt.product}</span>
                  </td>

                  <td className="py-3.5 px-3 font-mono text-slate-400 whitespace-nowrap">
                    {stmt.purchaseDate}
                  </td>

                  <td className="py-3.5 px-3 text-right font-mono text-slate-300">
                    ${stmt.revenue.toLocaleString()}
                  </td>

                  <td className="py-3.5 px-3 text-right font-mono text-cyan-300 font-medium">
                    ${stmt.commissionableRevenue.toLocaleString()}
                  </td>

                  <td className="py-3.5 px-3 text-center font-mono font-bold text-white">
                    {stmt.commissionPct}%
                  </td>

                  <td className="py-3.5 px-3 text-right font-mono text-slate-300">
                    ${stmt.commissionAmount.toLocaleString()}
                  </td>

                  <td className="py-3.5 px-3 text-right font-mono">
                    {stmt.refundAdjustment < 0 ? (
                      <span className="text-red-400">${stmt.refundAdjustment}</span>
                    ) : (
                      <span className="text-slate-500">$0</span>
                    )}
                  </td>

                  <td className="py-3.5 px-3 text-right font-mono font-extrabold text-emerald-400">
                    ${stmt.netCommission.toLocaleString()}
                  </td>

                  <td className="py-3.5 px-3 text-right">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap ${
                      stmt.paymentStatus.startsWith('Paid')
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                    }`}>
                      {stmt.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dispute Modal (Section 40) */}
      {showDisputeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">
                  Section 40 Commission Dispute Form
                </h3>
              </div>
              <button
                onClick={() => setShowDisputeModal(false)}
                className="text-slate-400 hover:text-white text-xs font-mono"
              >
                ✕ Close
              </button>
            </div>

            {disputeSubmitted ? (
              <div className="p-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">Dispute Lodged Successfully</h4>
                <p className="text-xs text-slate-400">
                  Your formal dispute has been logged under Section 40 with NextSoftHR Partner Operations. Tracking ticket generated. A determination will be issued within 10 business days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleDisputeSubmit} className="space-y-3.5 text-xs">
                <div className="p-3 rounded-lg bg-amber-950/40 border border-amber-800/40 text-amber-200 text-[11px] leading-relaxed">
                  ⚠️ <strong>Section 40 Rule:</strong> Disputes must be submitted within <strong>30 days</strong> from the statement issue date. Required details: Customer, Invoice #, Partner ID, Transaction, Disputed Amount, Supporting proof.
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Invoice Number *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. INV-NX-8821"
                      value={disputeInvoice}
                      onChange={(e) => setDisputeInvoice(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white font-mono focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Disputed Amount ($) *</label>
                    <input
                      type="number"
                      step="1"
                      required
                      placeholder="e.g. 200"
                      value={disputeAmount}
                      onChange={(e) => setDisputeAmount(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white font-mono focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Reason for Dispute & Supporting Details *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe discrepancy (e.g., incorrect tier applied, uncredited add-on module, unapplied upgrade revenue per Section 15)..."
                    value={disputeReason}
                    onChange={(e) => setDisputeReason(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowDisputeModal(false)}
                    className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Formal Dispute (Sec 40)</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
