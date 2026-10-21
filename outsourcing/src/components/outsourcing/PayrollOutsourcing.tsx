import React, { useState } from 'react';
import { 
  CreditCard, 
  CheckCircle, 
  ArrowRight, 
  ShieldCheck, 
  FileText, 
  Download, 
  TrendingUp, 
  Eye, 
  Check, 
  Clock, 
  AlertCircle,
  FileSpreadsheet,
  Building
} from 'lucide-react';
import { SAMPLE_PAYROLL_DATA } from '../../data/mockData';
import { PayrollRecord, NavigationPage } from '../../types';
import { useCurrency } from '../../context/CurrencyContext';
import { SolutionNavigationFooter } from '../layout/SolutionNavigationFooter';

interface PayrollOutsourcingProps {
  onOpenLeadModal: (service?: string) => void;
  onNavigate?: (page: NavigationPage) => void;
  onBack?: () => void;
}

export const PayrollOutsourcing: React.FC<PayrollOutsourcingProps> = ({ 
  onOpenLeadModal,
  onNavigate,
  onBack
}) => {
  const { formatCurrency, currency } = useCurrency();
  const [selectedRecord, setSelectedRecord] = useState<PayrollRecord>(SAMPLE_PAYROLL_DATA[0]);
  const [showPayslipModal, setShowPayslipModal] = useState(false);
  const [batchStatus, setBatchStatus] = useState<'Pending Approval' | 'Approved' | 'Disbursed'>('Pending Approval');

  // Aggregated totals
  const totalGross = SAMPLE_PAYROLL_DATA.reduce((acc, curr) => acc + curr.grossSalary, 0);
  const totalNet = SAMPLE_PAYROLL_DATA.reduce((acc, curr) => acc + curr.netPay, 0);
  const totalTax = SAMPLE_PAYROLL_DATA.reduce((acc, curr) => acc + curr.taxPAYE, 0);
  const totalPension = SAMPLE_PAYROLL_DATA.reduce((acc, curr) => acc + curr.pensionEmployee + curr.pensionEmployer, 0);
  const totalEmployerCost = totalGross + SAMPLE_PAYROLL_DATA.reduce((acc, curr) => acc + curr.pensionEmployer, 0);

  const workflowSteps = [
    { number: '01', title: 'Employee Data', desc: 'New hires, contract terms & bank details' },
    { number: '02', title: 'Attendance', desc: 'Hours, overtime, approved leaves & shifts' },
    { number: '03', title: 'Calculation', desc: 'Gross-to-net, tax bands, allowances & loans' },
    { number: '04', title: 'Review', desc: 'Specialist quality checks & variance audit' },
    { number: '05', title: 'Approval', desc: 'Client executive 1-click cloud sign-off' },
    { number: '06', title: 'Payslips', desc: 'Encrypted PDF & Employee Self-Service' },
    { number: '07', title: 'Reports', desc: 'Statutory schedules & general ledger export' }
  ];

  const servicesList = [
    'Employee payroll setup',
    'Monthly payroll processing',
    'Salary calculations',
    'Allowances & perks',
    'Deductions & advances',
    'Performance bonuses',
    'Sales commissions',
    'Overtime calculations',
    'Staff loans & recovery',
    'Automated payslip generation',
    'Payroll approval workflows',
    'Comprehensive payroll reports',
    'Monthly payroll reconciliation',
    'Statutory deduction management',
    'Historical payroll records',
    'Year-end payroll reporting & P60s',
    'Direct employee payroll support'
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#0A1E4A] via-[#0F2D6B] to-[#0A1E4A] text-white pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-lime-400 uppercase tracking-wider">
            <CreditCard className="w-3.5 h-3.5" />
            <span>Dedicated Payroll Outsourcing</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            “Accurate, Secure Payroll Without the Administrative Burden.”
          </h1>

          <p className="text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Eliminate month-end payroll stress. Outsource payroll processing to NextSofthr certified specialists while maintaining real-time visibility and approval authority through our modern workforce platform.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenLeadModal('Payroll Outsourcing')}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-lime-400 to-[#9AE616] hover:from-lime-300 hover:to-lime-400 text-slate-950 font-bold text-base rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <span>Outsource Your Payroll</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('interactive-payroll-console');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white font-medium text-base rounded-xl transition-colors border border-white/20"
            >
              View Visual Payroll Console
            </button>
          </div>
        </div>
      </section>

      {/* Visual Payroll Workflow */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-bold text-blue-700 dark:text-lime-400 uppercase tracking-wider">Flawless Month-End Execution</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            The NextSofthr End-to-End Payroll Workflow
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            A battle-tested 7-stage pipeline ensuring zero calculation errors and strict compliance with local African statutory rules.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {workflowSteps.map((step, idx) => (
            <div 
              key={step.number}
              className="relative p-4 rounded-xl bg-white dark:bg-[#0B1A3D] border border-slate-200 dark:border-blue-900/50 shadow-sm hover:border-lime-400 dark:hover:border-lime-400 transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-[#0F2D6B] dark:text-lime-400 bg-blue-50 dark:bg-blue-950/80 px-2 py-0.5 rounded border dark:border-blue-800/40">
                  {step.number}
                </span>
                {idx < 6 && (
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 hidden lg:block" />
                )}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{step.title}</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-tight">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Visual Payroll Dashboard */}
      <section id="interactive-payroll-console" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-[#0B1A3D] rounded-2xl border border-slate-200 dark:border-blue-900/50 shadow-xl overflow-hidden transition-colors">
          {/* Dashboard Header Bar */}
          <div className="bg-[#0A1E4A] dark:bg-[#050D24] text-white p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-blue-900/40">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-lime-400 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-lime-400"></span>
                Live Client Payroll Dashboard · Cycle: September 2026
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                Apex Technologies West Africa · Payroll Summary
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <span className={`text-xs px-3 py-1 rounded-full font-semibold border ${
                batchStatus === 'Approved' 
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' 
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
              }`}>
                {batchStatus}
              </span>

              {batchStatus !== 'Approved' && (
                <button
                  onClick={() => setBatchStatus('Approved')}
                  className="px-4 py-2 bg-lime-400 hover:bg-lime-300 text-slate-950 font-bold text-xs rounded-xl transition-all shadow flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Sign Off & Approve Batch</span>
                </button>
              )}
            </div>
          </div>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-blue-900/40 bg-slate-50/70 dark:bg-[#06112C] border-b border-slate-200 dark:border-blue-900/40 p-4 sm:p-6">
            <div className="p-2 sm:p-3">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Gross Payroll</span>
              <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1 font-mono">
                {formatCurrency(totalGross)}
              </div>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">5 Employees in sample</span>
            </div>

            <div className="p-2 sm:p-3">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Net Salary Payout</span>
              <div className="text-lg sm:text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1 font-mono">
                {formatCurrency(totalNet)}
              </div>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">Direct Bank Advice</span>
            </div>

            <div className="p-2 sm:p-3">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Allowances</span>
              <div className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-200 mt-1 font-mono">
                {formatCurrency(1000000)}
              </div>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">Housing & Transport</span>
            </div>

            <div className="p-2 sm:p-3">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Statutory Tax (PAYE)</span>
              <div className="text-lg sm:text-xl font-bold text-blue-700 dark:text-blue-400 mt-1 font-mono">
                {formatCurrency(totalTax)}
              </div>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">FIRS/SIRS Form H1</span>
            </div>

            <div className="p-2 sm:p-3">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Pension (Both)</span>
              <div className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-200 mt-1 font-mono">
                {formatCurrency(totalPension)}
              </div>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">8% EE + 10% ER</span>
            </div>

            <div className="p-2 sm:p-3">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Employer Cost</span>
              <div className="text-lg sm:text-xl font-bold text-[#0F2D6B] dark:text-lime-400 mt-1 font-mono">
                {formatCurrency(totalEmployerCost)}
              </div>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">CTC Consolidated</span>
            </div>
          </div>

          {/* Interactive Employee Payroll Table */}
          <div className="p-6 overflow-x-auto">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Detailed Employee Payroll Register (Click any row to inspect & view payslip)
              </h4>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600 dark:text-lime-400" />
                <span>Export ready: Excel, CSV, PDF</span>
              </div>
            </div>

            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-100/70 dark:bg-[#071433] text-slate-700 dark:text-slate-300 font-semibold uppercase text-[11px]">
                <tr>
                  <th className="py-3 px-4 rounded-l-lg">Employee / Role</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4 text-right">Gross Salary</th>
                  <th className="py-3 px-4 text-right">Allowances</th>
                  <th className="py-3 px-4 text-right">Tax (PAYE)</th>
                  <th className="py-3 px-4 text-right">Pension (EE)</th>
                  <th className="py-3 px-4 text-right font-bold text-emerald-700 dark:text-lime-400">Net Pay</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right rounded-r-lg">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-blue-900/30">
                {SAMPLE_PAYROLL_DATA.map((record) => {
                  const isSelected = selectedRecord.id === record.id;
                  return (
                    <tr 
                      key={record.id}
                      onClick={() => setSelectedRecord(record)}
                      className={`hover:bg-blue-50/50 dark:hover:bg-blue-950/40 cursor-pointer transition-colors ${
                        isSelected ? 'bg-blue-50/70 dark:bg-blue-950/60 font-medium' : ''
                      }`}
                    >
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900 dark:text-white">{record.employeeName}</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">{record.role}</div>
                      </td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{record.department}</td>
                      <td className="py-3 px-4 text-right font-mono font-medium text-slate-900 dark:text-slate-100">{formatCurrency(record.grossSalary)}</td>
                      <td className="py-3 px-4 text-right font-mono text-slate-600 dark:text-slate-400">{formatCurrency(record.allowances)}</td>
                      <td className="py-3 px-4 text-right font-mono text-blue-700 dark:text-blue-300">{formatCurrency(record.taxPAYE)}</td>
                      <td className="py-3 px-4 text-right font-mono text-slate-600 dark:text-slate-400">{formatCurrency(record.pensionEmployee)}</td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-emerald-600 dark:text-lime-400">{formatCurrency(record.netPay)}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                          record.status === 'Approved' 
                            ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border dark:border-emerald-800/40' 
                            : 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border dark:border-amber-800/40'
                        }`}>
                          {record.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRecord(record);
                            setShowPayslipModal(true);
                          }}
                          className="px-2.5 py-1 text-xs font-semibold text-[#0F2D6B] dark:text-lime-300 hover:text-blue-900 bg-white dark:bg-[#06112C] hover:bg-slate-100 dark:hover:bg-blue-900/50 border border-slate-200 dark:border-blue-900/50 rounded-lg shadow-2xs inline-flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3 text-lime-600 dark:text-lime-400" />
                          <span>Payslip</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Payslip Modal Simulation */}
      {showPayslipModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#0B1A3D] rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-blue-900/50 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-4 border-b border-slate-200 dark:border-blue-900/40">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500">Official Payslip Voucher</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">NextSofthr Payroll Slip</h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">Ref: {selectedRecord.payslipRef} · Month: September 2026</span>
              </div>
              <button 
                onClick={() => setShowPayslipModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-4">
              <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 dark:bg-[#06112C] p-3 rounded-xl border border-slate-200 dark:border-blue-900/40">
                <div><span className="text-slate-500 dark:text-slate-400">Employee Name:</span> <strong className="text-slate-900 dark:text-white">{selectedRecord.employeeName}</strong></div>
                <div><span className="text-slate-500 dark:text-slate-400">Designation:</span> <strong className="text-slate-900 dark:text-white">{selectedRecord.role}</strong></div>
                <div><span className="text-slate-500 dark:text-slate-400">Department:</span> <strong className="text-slate-900 dark:text-white">{selectedRecord.department}</strong></div>
                <div><span className="text-slate-500 dark:text-slate-400">Payment Status:</span> <strong className="text-emerald-700 dark:text-emerald-400">Verified & Approved</strong></div>
              </div>

              {/* Earnings & Deductions Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="border border-slate-200 dark:border-blue-900/40 bg-white dark:bg-[#071433] rounded-xl p-3 space-y-2">
                  <div className="font-bold text-slate-900 dark:text-white pb-1 border-b border-slate-100 dark:border-blue-900/30 uppercase text-[10px] tracking-wider text-emerald-700 dark:text-lime-400">
                    Earnings
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Basic Salary:</span>
                    <span className="font-mono text-slate-900 dark:text-slate-200">{formatCurrency(selectedRecord.grossSalary - selectedRecord.allowances)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Housing Allowance:</span>
                    <span className="font-mono text-slate-900 dark:text-slate-200">{formatCurrency(selectedRecord.allowances * 0.6)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Transport Allowance:</span>
                    <span className="font-mono text-slate-900 dark:text-slate-200">{formatCurrency(selectedRecord.allowances * 0.4)}</span>
                  </div>
                  <div className="flex justify-between font-bold pt-1 border-t border-slate-100 dark:border-blue-900/30">
                    <span className="text-slate-900 dark:text-white">Total Gross:</span>
                    <span className="font-mono text-slate-900 dark:text-white">{formatCurrency(selectedRecord.grossSalary)}</span>
                  </div>
                </div>

                <div className="border border-slate-200 dark:border-blue-900/40 bg-white dark:bg-[#071433] rounded-xl p-3 space-y-2">
                  <div className="font-bold text-slate-900 dark:text-white pb-1 border-b border-slate-100 dark:border-blue-900/30 uppercase text-[10px] tracking-wider text-rose-700 dark:text-rose-400">
                    Deductions & Statutory
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">PAYE Income Tax:</span>
                    <span className="font-mono text-rose-600 dark:text-rose-400">{formatCurrency(selectedRecord.taxPAYE)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Pension (EE 8%):</span>
                    <span className="font-mono text-rose-600 dark:text-rose-400">{formatCurrency(selectedRecord.pensionEmployee)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Voluntary / Loans:</span>
                    <span className="font-mono text-rose-600 dark:text-rose-400">{formatCurrency(selectedRecord.deductions)}</span>
                  </div>
                  <div className="flex justify-between font-bold pt-1 border-t border-slate-100 dark:border-blue-900/30">
                    <span className="text-slate-900 dark:text-white">Total Deductions:</span>
                    <span className="font-mono text-rose-700 dark:text-rose-400">
                      {formatCurrency(selectedRecord.taxPAYE + selectedRecord.pensionEmployee + selectedRecord.deductions)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Net Pay Banner */}
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-xs text-emerald-800 dark:text-emerald-300 font-medium">Net Take-Home Pay (Bank Credited)</div>
                  <div className="text-2xl font-black text-emerald-700 dark:text-lime-400 font-mono">
                    {formatCurrency(selectedRecord.netPay)}
                  </div>
                </div>
                <div className="text-right text-[10px] text-slate-500 dark:text-slate-400">
                  <div>Employer Pension (10%): {formatCurrency(selectedRecord.pensionEmployer)}</div>
                  <div className="text-emerald-700 dark:text-emerald-400 font-medium">Auto-dispatched via NextSofthr ESS</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-blue-900/40 flex items-center justify-between">
              <button
                onClick={() => {
                  const btn = document.getElementById('dl-payslip-btn');
                  if (btn) {
                    btn.innerText = 'PDF Downloaded ✓';
                    setTimeout(() => {
                      if (btn) btn.innerText = 'Download Signed PDF';
                    }, 2500);
                  }
                }}
                id="dl-payslip-btn"
                className="px-4 py-2 bg-slate-100 dark:bg-blue-950/80 hover:bg-slate-200 dark:hover:bg-blue-900/60 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border dark:border-blue-900/40"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Signed PDF</span>
              </button>
              <button
                onClick={() => setShowPayslipModal(false)}
                className="px-5 py-2 bg-[#0F2D6B] dark:bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-[#0A1E4A] dark:hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Complete Services Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 dark:bg-[#071330] rounded-2xl p-8 sm:p-10 border border-slate-200 dark:border-blue-900/40 space-y-8 transition-colors">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-blue-700 dark:text-lime-400 uppercase tracking-wider">Scope of Work</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Included in NextSofthr Payroll Outsourcing
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
              Everything required to operate compliant, audit-ready payroll month after month.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {servicesList.map((svc) => (
              <div 
                key={svc}
                className="p-3.5 bg-white dark:bg-[#0B1A3D] rounded-xl border border-slate-200 dark:border-blue-900/40 flex items-center gap-3 shadow-2xs"
              >
                <div className="w-5 h-5 rounded-full bg-lime-100 dark:bg-lime-950/80 text-lime-700 dark:text-lime-400 flex items-center justify-center shrink-0 border dark:border-lime-900/50">
                  <Check className="w-3 h-3" />
                </div>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">{svc}</span>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => onOpenLeadModal('Payroll Outsourcing Quote')}
              className="px-8 py-3.5 bg-[#0F2D6B] dark:bg-blue-600 hover:bg-[#0A1E4A] dark:hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Outsource Your Payroll Today</span>
              <ArrowRight className="w-4 h-4 text-lime-400" />
            </button>
          </div>
        </div>
      </section>

      {/* Explore Other Outsourcing Solutions & Return Home */}
      {onNavigate && (
        <SolutionNavigationFooter
          currentSolutionId="outsourcing-payroll"
          onNavigate={onNavigate}
          onOpenLeadModal={onOpenLeadModal}
        />
      )}
    </div>
  );
};
