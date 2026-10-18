import React, { useState, useMemo } from 'react';
import { Plus, Download, Filter, Search, CheckCircle, Clock, AlertTriangle, ArrowUpRight, DollarSign } from 'lucide-react';
import { CommissionStatementItem } from '../types';

import { useCommissionLanguage } from '../context/LanguageContext';
interface StatementLedgerProps {
  statements: CommissionStatementItem[];
  onAddStatement: (stmt: CommissionStatementItem) => void;
  onJumpToSection: (sectionId: number) => void;
}

export const StatementLedger: React.FC<StatementLedgerProps> = ({
  statements,
  onAddStatement,
  onJumpToSection,
}) => {
  const { t } = useCommissionLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // New simulated transaction form state
  const [newCustomer, setNewCustomer] = useState('');
  const [newInvoice, setNewInvoice] = useState(`INV-2026-${Math.floor(1000 + Math.random() * 9000)}`);
  const [newProduct, setNewProduct] = useState('Core HR + Payroll + Time');
  const [newGross, setNewGross] = useState<number>(1500);
  const [newExclusions, setNewExclusions] = useState<number>(120);
  const [newRate, setNewRate] = useState<number>(30); // 30% Gold
  const [newRefund, setNewRefund] = useState<number>(0);

  // Filtered statements
  const filteredStatements = useMemo(() => {
    return statements.filter((stmt) => {
      const matchesStatus = statusFilter === 'All' || stmt.paymentStatus === statusFilter;
      if (!matchesStatus) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        stmt.customerName.toLowerCase().includes(q) ||
        stmt.invoiceNumber.toLowerCase().includes(q) ||
        stmt.product.toLowerCase().includes(q)
      );
    });
  }, [statements, searchQuery, statusFilter]);

  // Aggregate Metrics
  const metrics = useMemo(() => {
    let totalGross = 0;
    let totalNetCommission = 0;
    let totalPaid = 0;
    let totalScheduled = 0;
    let totalRolledForward = 0;

    statements.forEach((s) => {
      totalGross += s.grossRevenue;
      totalNetCommission += s.netCommission;
      if (s.paymentStatus === 'Paid') {
        totalPaid += s.netCommission;
      } else if (s.paymentStatus === 'Scheduled' || s.paymentStatus === 'Processing') {
        totalScheduled += s.netCommission;
      } else if (s.paymentStatus === 'Rolled Forward (< $100)') {
        totalRolledForward += s.netCommission;
      }
    });

    return { totalGross, totalNetCommission, totalPaid, totalScheduled, totalRolledForward };
  }, [statements]);

  const handleCreateTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomer) return;

    const commissionableRev = Math.max(0, newGross - newExclusions);
    const commRateDec = newRate / 100;
    const commAmt = commissionableRev * commRateDec;
    const netComm = Math.max(0, commAmt - newRefund);
    const status: CommissionStatementItem['paymentStatus'] =
      netComm < 100 ? 'Rolled Forward (< $100)' : 'Scheduled';

    const newItem: CommissionStatementItem = {
      id: `stmt-${Date.now()}`,
      customerName: newCustomer,
      invoiceNumber: newInvoice,
      product: newProduct,
      purchaseDate: new Date().toISOString().split('T')[0],
      grossRevenue: newGross,
      exclusions: newExclusions,
      commissionableRevenue: commissionableRev,
      commissionRate: commRateDec,
      commissionAmount: commAmt,
      refundAdjustment: -Math.abs(newRefund),
      netCommission: netComm,
      paymentStatus: status,
      payoutDate: status === 'Scheduled' ? 'Next Monthly Cycle' : undefined,
      referenceNotes: status === 'Rolled Forward (< $100)' ? 'Section 34 rollover rule' : 'Approved transaction'
    };

    onAddStatement(newItem);
    setShowAddModal(false);
    setNewCustomer('');
    setNewGross(1500);
    setNewExclusions(120);
    setNewRefund(0);
  };

  const exportCSV = () => {
    const headers = [
      'Customer',
      'Invoice #',
      'Product',
      'Purchase Date',
      'Gross Revenue ($)',
      'Exclusions ($)',
      'Commissionable Rev ($)',
      'Commission Rate (%)',
      'Gross Comm ($)',
      'Refund Adj ($)',
      'Net Commission ($)',
      'Payment Status',
      'Payout Date'
    ];

    const rows = statements.map((s) => [
      `"${s.customerName}"`,
      s.invoiceNumber,
      `"${s.product}"`,
      s.purchaseDate,
      s.grossRevenue.toFixed(2),
      s.exclusions.toFixed(2),
      s.commissionableRevenue.toFixed(2),
      `${(s.commissionRate * 100).toFixed(0)}%`,
      s.commissionAmount.toFixed(2),
      s.refundAdjustment.toFixed(2),
      s.netCommission.toFixed(2),
      `"${s.paymentStatus}"`,
      s.payoutDate || 'N/A'
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `NextSoftHR_Statement_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header & Section 39 Statement Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
              <span>Section 39 Mandated Schema</span>
              <span aria-hidden="true">·</span>
              <span>Section 34 Minimum Payout ($100 USD)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t('page.stmt.title')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
              {t('page.stmt.subtitle')}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Simulate Sale Entry</span>
            </button>
            <button
              onClick={exportCSV}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-md transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* 4 KPI Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-md">
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block mb-0.5">Total Attributed Gross</span>
            <div className="text-xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
              ${metrics.totalGross.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500">Total client billings</span>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-md">
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block mb-0.5">Total Net Commission</span>
            <div className="text-xl font-bold font-mono text-blue-700 dark:text-blue-300 tabular-nums">
              ${metrics.totalNetCommission.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500">After Section 11 deductions</span>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-md">
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block mb-0.5">Paid & Settled (Sec 35)</span>
            <div className="text-xl font-bold font-mono text-emerald-700 dark:text-emerald-300 tabular-nums">
              ${metrics.totalPaid.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Transferred to bank</span>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-md">
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block mb-0.5">Rolled Forward (Sec 34)</span>
            <div className="text-xl font-bold font-mono text-amber-700 dark:text-amber-300 tabular-nums">
              ${metrics.totalRolledForward.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <span className="text-[10px] text-amber-700 dark:text-amber-300">Sub-$100 threshold hold</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by customer name, invoice #, or module..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {['All', 'Paid', 'Scheduled', 'Processing', 'Rolled Forward (< $100)'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                statusFilter === status
                  ? 'bg-slate-900 dark:bg-cyan-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Section 39 Standardized Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-3">Customer & Product</th>
                <th className="py-3 px-3">Invoice & Date</th>
                <th className="py-3 px-3 text-right">Gross Rev</th>
                <th className="py-3 px-3 text-right">Exclusions</th>
                <th className="py-3 px-3 text-right">Commissionable</th>
                <th className="py-3 px-3 text-center">Rate</th>
                <th className="py-3 px-3 text-right">Gross Comm</th>
                <th className="py-3 px-3 text-right">Refund Adj</th>
                <th className="py-3 px-3 text-right font-bold text-slate-900 dark:text-white">Net Comm</th>
                <th className="py-3 px-3 text-center">Payment Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-slate-700 dark:text-slate-200">
              {filteredStatements.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-slate-400 dark:text-slate-500 font-sans">
                    No statements matching your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredStatements.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                    
                    {/* Customer & Product */}
                    <td className="py-3 px-3 font-sans">
                      <div className="font-semibold text-slate-900 dark:text-white">{item.customerName}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">{item.product}</div>
                    </td>

                    {/* Invoice & Date */}
                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-800 dark:text-slate-100">{item.invoiceNumber}</div>
                      <div className="text-[11px] text-slate-400 dark:text-slate-500">{item.purchaseDate}</div>
                    </td>

                    {/* Gross */}
                    <td className="py-3 px-3 text-right tabular-nums text-slate-900 dark:text-white font-semibold">
                      ${item.grossRevenue.toFixed(2)}
                    </td>

                    {/* Exclusions */}
                    <td className="py-3 px-3 text-right tabular-nums text-slate-500 dark:text-slate-400">
                      -${item.exclusions.toFixed(2)}
                    </td>

                    {/* Commissionable */}
                    <td className="py-3 px-3 text-right tabular-nums text-blue-700 dark:text-blue-300 font-semibold">
                      ${item.commissionableRevenue.toFixed(2)}
                    </td>

                    {/* Rate */}
                    <td className="py-3 px-3 text-center">
                      <span className="font-bold text-slate-800 dark:text-slate-100">
                        {(item.commissionRate * 100).toFixed(0)}%
                      </span>
                    </td>

                    {/* Gross Commission */}
                    <td className="py-3 px-3 text-right tabular-nums text-slate-800 dark:text-slate-100">
                      ${item.commissionAmount.toFixed(2)}
                    </td>

                    {/* Refund Adjustment */}
                    <td className={`py-3 px-3 text-right tabular-nums ${item.refundAdjustment < 0 ? 'text-rose-600 dark:text-rose-400 font-medium' : 'text-slate-400 dark:text-slate-500'}`}>
                      {item.refundAdjustment < 0 ? `-$${Math.abs(item.refundAdjustment).toFixed(2)}` : '$0.00'}
                    </td>

                    {/* Net Commission */}
                    <td className="py-3 px-3 text-right tabular-nums font-bold text-emerald-700 dark:text-emerald-300 text-sm">
                      ${item.netCommission.toFixed(2)}
                    </td>

                    {/* Payment Status (Section 34 & 35) */}
                    <td className="py-3 px-3 font-sans text-center">
                      <span className={`inline-block px-2 py-0.5 text-[11px] font-semibold rounded ${
                        item.paymentStatus === 'Paid'
                          ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30'
                          : item.paymentStatus === 'Scheduled'
                          ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30'
                          : item.paymentStatus === 'Processing'
                          ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700'
                      }`}>
                        {item.paymentStatus}
                      </span>
                      {item.payoutDate && (
                        <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">{item.payoutDate}</div>
                      )}
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Audit footer note */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-2">
          <span>
            Statements comply strictly with <strong>Section 39</strong> of the NextSoftHR Commission Schedule.
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onJumpToSection(34)}
              className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5"
            >
              § 34 Payout Threshold ($100) <ArrowUpRight className="w-3 h-3" />
            </button>
            <button
              onClick={() => onJumpToSection(39)}
              className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5"
            >
              § 39 Statement Schema <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Add Simulated Transaction Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 max-w-lg w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Simulate Attributed Sale Entry
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTransaction} className="space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-200 block mb-1">Customer / Organization Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Standard Chartered West Africa"
                  value={newCustomer}
                  onChange={(e) => setNewCustomer(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-200 block mb-1">Invoice Number</label>
                  <input
                    type="text"
                    required
                    value={newInvoice}
                    onChange={(e) => setNewInvoice(e.target.value)}
                    className="w-full px-3 py-2 font-mono border border-slate-300 dark:border-slate-700 rounded"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-200 block mb-1">Module / Package</label>
                  <input
                    type="text"
                    required
                    value={newProduct}
                    onChange={(e) => setNewProduct(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-200 block mb-1">Gross Revenue ($)</label>
                  <input
                    type="number"
                    min="10"
                    step="10"
                    required
                    value={newGross}
                    onChange={(e) => setNewGross(Number(e.target.value))}
                    className="w-full px-3 py-2 font-mono border border-slate-300 dark:border-slate-700 rounded"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-200 block mb-1">Exclusions ($)</label>
                  <input
                    type="number"
                    min="0"
                    step="5"
                    value={newExclusions}
                    onChange={(e) => setNewExclusions(Number(e.target.value))}
                    className="w-full px-3 py-2 font-mono border border-slate-300 dark:border-slate-700 rounded"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-200 block mb-1">Partner Tier Rate (%)</label>
                  <select
                    value={newRate}
                    onChange={(e) => setNewRate(Number(e.target.value))}
                    className="w-full px-3 py-2 font-mono border border-slate-300 dark:border-slate-700 rounded"
                  >
                    <option value={15}>15% (Bronze)</option>
                    <option value={20}>20% (Silver)</option>
                    <option value={30}>30% (Gold)</option>
                    <option value={40}>40% (Platinum)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-200 block mb-1">Refund / Adjustment Offset ($) (Sec 30)</label>
                <input
                  type="number"
                  min="0"
                  step="10"
                  value={newRefund}
                  onChange={(e) => setNewRefund(Number(e.target.value))}
                  className="w-full px-3 py-2 font-mono border border-slate-300 dark:border-slate-700 rounded"
                />
              </div>

              <div className="p-3 bg-blue-50/60 dark:bg-blue-500/10 rounded border border-blue-100 dark:border-blue-500/30 text-slate-700 dark:text-slate-200">
                <div className="flex justify-between font-semibold">
                  <span>Calculated Net Commission:</span>
                  <span className="font-mono text-emerald-700 dark:text-emerald-300 font-bold">
                    ${Math.max(0, (newGross - newExclusions) * (newRate / 100) - newRefund).toFixed(2)}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  {(newGross - newExclusions) * (newRate / 100) - newRefund < 100 ? (
                    <span className="text-amber-700 dark:text-amber-300">
                      Under $100 threshold — will automatically be tagged &lsquo;Rolled Forward&rsquo; per Section 34.
                    </span>
                  ) : (
                    <span className="text-emerald-700 dark:text-emerald-300">
                      Meets $100 threshold — scheduled for next monthly payout cycle.
                    </span>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
                >
                  Post to Ledger
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
