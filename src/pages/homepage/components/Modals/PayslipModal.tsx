import { useState, useEffect } from 'react';
import { X, Printer, ShieldCheck, QrCode, CheckCircle2, DollarSign } from 'lucide-react';
import { useCurrency, MajorCurrency } from '../../context/CurrencyContext';

interface PayslipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PayslipModal = ({ isOpen, onClose }: PayslipModalProps) => {
  const { currency: globalCurrency, formatMoney } = useCurrency();
  const [currency, setCurrency] = useState<MajorCurrency>(globalCurrency);

  useEffect(() => {
    if (isOpen) {
      setCurrency(globalCurrency);
    }
  }, [isOpen, globalCurrency]);

  if (!isOpen) return null;

  const fmt = (amount: number) => {
    return formatMoney(amount, { showDecimals: true, overrideCurrency: currency });
  };

  return (
    <div id="payslip-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 max-w-2xl w-full overflow-hidden relative max-h-[90vh] flex flex-col transition-colors">
        {/* Header bar */}
        <div className="bg-slate-900 text-white p-4 px-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-lime-400">
              NX
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-sm text-white">NextSofthr Digital Payslip</h4>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-lime-400/20 text-lime-300 border border-lime-400/30">
                  Tax Verified
                </span>
              </div>
              <p className="text-xs text-slate-400">Pay Period: Sep 01 – Sep 30, 2026 • Disbursed</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-slate-800 rounded-lg p-0.5 text-xs font-semibold">
              {(['USD', 'NGN', 'KES', 'EUR', 'GBP'] as const).map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`px-2 py-1 rounded-md transition-colors cursor-pointer ${currency === curr ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
                >
                  {curr}
                </button>
              ))}
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Payslip Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-800 dark:text-slate-200 text-sm">
          {/* Employee & Employer meta */}
          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-200 dark:border-slate-800 text-xs">
            <div>
              <span className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block mb-1">Employee Details</span>
              <p className="font-bold text-slate-900 dark:text-white text-sm">Sofia Rodriguez</p>
              <p className="text-slate-600 dark:text-slate-400">ID: <span className="font-mono text-slate-700 dark:text-slate-300 font-semibold">NX-2849</span> • Senior Product Designer</p>
              <p className="text-slate-600 dark:text-slate-400">Department: Product & Engineering</p>
              <p className="text-slate-600 dark:text-slate-400">Tax Residence: UK & International Remote</p>
            </div>
            <div className="text-right">
              <span className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block mb-1">Payment Method</span>
              <p className="font-bold text-slate-900 dark:text-white">Direct Deposit / Faster Payments</p>
              <p className="text-slate-600 dark:text-slate-400">Bank: Barclays International</p>
              <p className="text-slate-600 dark:text-slate-400">Account: •••• 9104</p>
              <p className="text-lime-700 dark:text-lime-400 font-semibold flex items-center justify-end gap-1 mt-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400" /> Settled & Reconciled
              </p>
            </div>
          </div>

          {/* Earnings & Deductions Tables */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Earnings */}
            <div className="bg-slate-50 dark:bg-slate-800/70 p-4 rounded-xl border border-slate-200 dark:border-slate-700/80">
              <div className="flex items-center justify-between mb-3">
                <h5 className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">Gross Earnings</h5>
                <DollarSign className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700/80">
                  <span className="text-slate-600 dark:text-slate-400">Base Salary</span>
                  <span className="font-bold text-slate-900 dark:text-white">{fmt(6500.00)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700/80">
                  <span className="text-slate-600 dark:text-slate-400">Remote Workspace Allowance</span>
                  <span className="font-bold text-slate-900 dark:text-white">{fmt(350.00)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700/80">
                  <span className="text-slate-600 dark:text-slate-400">Q3 Performance Bonus</span>
                  <span className="font-bold text-slate-900 dark:text-white">{fmt(750.00)}</span>
                </div>
                <div className="flex justify-between py-1 text-blue-700 dark:text-blue-400 font-extrabold pt-2">
                  <span>Total Gross</span>
                  <span>{fmt(7600.00)}</span>
                </div>
              </div>
            </div>

            {/* Deductions & Taxes */}
            <div className="bg-slate-50 dark:bg-slate-800/70 p-4 rounded-xl border border-slate-200 dark:border-slate-700/80">
              <div className="flex items-center justify-between mb-3">
                <h5 className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">Statutory Deductions & Taxes</h5>
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700/80">
                  <span className="text-slate-600 dark:text-slate-400">PAYE Income Tax</span>
                  <span className="font-bold text-rose-600 dark:text-rose-400">-{fmt(1280.00)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700/80">
                  <span className="text-slate-600 dark:text-slate-400">National Social Insurance</span>
                  <span className="font-bold text-rose-600 dark:text-rose-400">-{fmt(380.00)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700/80">
                  <span className="text-slate-600 dark:text-slate-400">Employee Pension (5%)</span>
                  <span className="font-bold text-rose-600 dark:text-rose-400">-{fmt(325.00)}</span>
                </div>
                <div className="flex justify-between py-1 text-rose-700 dark:text-rose-400 font-extrabold pt-2">
                  <span>Total Deductions</span>
                  <span>-{fmt(1985.00)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Employer Contributions & Net Pay Callout */}
          <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-blue-900/50">
            <div>
              <span className="text-xs font-semibold text-blue-200 uppercase tracking-wider block">Net Take-Home Pay</span>
              <div className="text-3xl font-extrabold text-lime-400 mt-0.5">
                {fmt(5615.00)}
              </div>
              <p className="text-[11px] text-slate-300 mt-1">
                Employer matched pension: {fmt(455.00)} • Private health insurance covered 100%
              </p>
            </div>

            <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10 text-xs">
              <QrCode className="w-10 h-10 text-lime-300" />
              <div>
                <p className="font-mono text-[10px] text-slate-300">NX-HASH: 8f92-a10c-99f2</p>
                <p className="text-[11px] text-lime-300 font-semibold">Cryptographically Signed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs">
          <div className="text-slate-500 dark:text-slate-400">
            Automated by NextSofthr Global Payroll Engine v4.2
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
