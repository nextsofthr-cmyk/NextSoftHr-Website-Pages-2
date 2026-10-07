import React, { useState } from 'react';
import { 
  BarChart3, 
  ArrowRight, 
  Download, 
  TrendingUp, 
  Users, 
  CreditCard, 
  Calendar, 
  FileSpreadsheet, 
  PieChart,
  Check
} from 'lucide-react';
import { SAMPLE_PAYROLL_DATA } from '../../data/mockData';

interface AnalyticsReportingProps {
  onOpenLeadModal: (service?: string) => void;
}

export const AnalyticsReporting: React.FC<AnalyticsReportingProps> = ({ onOpenLeadModal }) => {
  const [activeTab, setActiveTab] = useState<'payroll' | 'hr' | 'outsourcing'>('payroll');
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const handleExport = (format: 'CSV' | 'Excel' | 'PDF') => {
    if (format === 'CSV') {
      // Real client-side CSV generation
      const headers = ['Employee Name', 'Role', 'Department', 'Gross Salary (NGN)', 'Net Pay (NGN)', 'Status'];
      const rows = SAMPLE_PAYROLL_DATA.map(r => [
        `"${r.employeeName}"`,
        `"${r.role}"`,
        `"${r.department}"`,
        r.grossSalary,
        r.netPay,
        r.status
      ]);
      const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `NextSofthr_Payroll_Report_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    setExportNotice(`Exported official ${format} workbook.`);
    setTimeout(() => setExportNotice(null), 3000);
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0A1E4A] via-[#0F2D6B] to-[#0A1E4A] text-white pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-lime-400 uppercase tracking-wider">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Executive Workforce Intelligence</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            “Analytics & Reporting”
          </h1>

          <p className="text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Gain executive clarity on labor spending, turnover risks, statutory tax schedules, and operational velocity with real-time consolidated analytics.
          </p>
        </div>
      </section>

      {/* Main Analytics Deck */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-8 space-y-6">
          {/* Header & Export Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
            {/* Tabs */}
            <div className="flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold text-slate-600">
              <button
                onClick={() => setActiveTab('payroll')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'payroll' ? 'bg-[#0F2D6B] text-white shadow-xs' : 'hover:text-slate-900'
                }`}
              >
                Payroll Analytics
              </button>
              <button
                onClick={() => setActiveTab('hr')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'hr' ? 'bg-[#0F2D6B] text-white shadow-xs' : 'hover:text-slate-900'
                }`}
              >
                HR & Headcount
              </button>
              <button
                onClick={() => setActiveTab('outsourcing')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'outsourcing' ? 'bg-[#0F2D6B] text-white shadow-xs' : 'hover:text-slate-900'
                }`}
              >
                Outsourcing SLA Metrics
              </button>
            </div>

            {/* Export buttons: PDF | Excel | CSV */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Export:</span>
              <button
                onClick={() => handleExport('CSV')}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                <Download className="w-3 h-3" />
                <span>CSV</span>
              </button>
              <button
                onClick={() => handleExport('Excel')}
                className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors border border-emerald-200"
              >
                <FileSpreadsheet className="w-3 h-3" />
                <span>Excel</span>
              </button>
              <button
                onClick={() => handleExport('PDF')}
                className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-[#0F2D6B] rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors border border-blue-200"
              >
                <Download className="w-3 h-3" />
                <span>PDF</span>
              </button>
            </div>
          </div>

          {exportNotice && (
            <div className="p-3 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-xl border border-emerald-200 flex items-center gap-2 animate-in fade-in">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{exportNotice}</span>
            </div>
          )}

          {/* Tab 1: Payroll Analytics */}
          {activeTab === 'payroll' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500 uppercase font-semibold">Total Gross Payroll</div>
                  <div className="text-2xl font-bold text-slate-900 mt-1">₦6,850,000</div>
                  <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">+2.4% vs last cycle</div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500 uppercase font-semibold">Statutory Remittances</div>
                  <div className="text-2xl font-bold text-blue-700 mt-1">₦1,167,000</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">PAYE, Pension & NHF</div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500 uppercase font-semibold">Employer Pension Levy</div>
                  <div className="text-2xl font-bold text-slate-900 mt-1">₦685,000</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">10% PenCom statutory</div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500 uppercase font-semibold">Disbursement Timeliness</div>
                  <div className="text-2xl font-bold text-emerald-600 mt-1">100.0%</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">25th of month value date</div>
                </div>
              </div>

              {/* Department Payroll Breakdown */}
              <div className="p-5 bg-slate-50/60 rounded-xl border border-slate-200 space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase">Departmental Payroll Distribution</h4>
                <div className="space-y-2 text-xs">
                  <div>
                    <div className="flex justify-between py-1">
                      <span className="font-semibold text-slate-800">Engineering & Tech (42%)</span>
                      <span className="font-mono font-bold text-slate-900">₦2,877,000</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#0F2D6B] h-full" style={{ width: '42%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between py-1">
                      <span className="font-semibold text-slate-800">Operations & Logistics (28%)</span>
                      <span className="font-mono font-bold text-slate-900">₦1,918,000</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full" style={{ width: '28%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between py-1">
                      <span className="font-semibold text-slate-800">Growth & Marketing (18%)</span>
                      <span className="font-mono font-bold text-slate-900">₦1,233,000</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-lime-500 h-full" style={{ width: '18%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between py-1">
                      <span className="font-semibold text-slate-800">People & Legal (12%)</span>
                      <span className="font-mono font-bold text-slate-900">₦822,000</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-purple-600 h-full" style={{ width: '12%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: HR & Headcount */}
          {activeTab === 'hr' && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-slate-500 uppercase font-semibold">Active Headcount</div>
                  <div className="text-2xl font-bold text-slate-900 mt-1">142 Employees</div>
                  <div className="text-slate-500 mt-0.5">3 regional branches</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-slate-500 uppercase font-semibold">Annualized Voluntary Turnover</div>
                  <div className="text-2xl font-bold text-emerald-600 mt-1">4.2%</div>
                  <div className="text-slate-500 mt-0.5">Benchmark: 8.5% industry avg</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-slate-500 uppercase font-semibold">Average Tenured Service</div>
                  <div className="text-2xl font-bold text-slate-900 mt-1">2.8 Years</div>
                  <div className="text-slate-500 mt-0.5">Strong retention health</div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Outsourcing SLA Metrics */}
          {activeTab === 'outsourcing' && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-slate-500 uppercase font-semibold">Average Payroll Processing Time</div>
                  <div className="text-2xl font-bold text-[#0F2D6B] mt-1">1.8 Days</div>
                  <div className="text-emerald-700 font-semibold mt-0.5">Well under 4-day SLA</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-slate-500 uppercase font-semibold">Support Ticket Resolution Rate</div>
                  <div className="text-2xl font-bold text-emerald-600 mt-1">99.4%</div>
                  <div className="text-slate-500 mt-0.5">First-contact resolution</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-slate-500 uppercase font-semibold">Client Net Promoter Score</div>
                  <div className="text-2xl font-bold text-slate-900 mt-1">+78 NPS</div>
                  <div className="text-slate-500 mt-0.5">Enterprise Outsourcing category</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
