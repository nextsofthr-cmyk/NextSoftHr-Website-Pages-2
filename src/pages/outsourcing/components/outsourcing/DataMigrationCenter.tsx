import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Upload, 
  Database, 
  ShieldCheck, 
  Check, 
  RefreshCw,
  FileCheck
} from 'lucide-react';

interface DataMigrationCenterProps {
  onOpenLeadModal: (service?: string) => void;
}

export const DataMigrationCenter: React.FC<DataMigrationCenterProps> = ({ onOpenLeadModal }) => {
  const [validationState, setValidationState] = useState<'idle' | 'validating' | 'completed'>('completed');

  const migrationPipeline = [
    { step: '01', title: 'Export', desc: 'Secure extraction from legacy HRIS, Excel, CSV, or biometric SQL databases' },
    { step: '02', title: 'Validate', desc: 'Automated schema validation checking bank codes, tax IDs, and duplicate NINs' },
    { step: '03', title: 'Clean', desc: 'Data deduplication, formatting standardizations, and missing field alerts' },
    { step: '04', title: 'Import', desc: 'High-speed ingestion into encrypted NextSofthr cloud multi-tenant database' },
    { step: '05', title: 'Verify', desc: 'Parallel payroll calculation run with 100% historical penny-matching' },
    { step: '06', title: 'Go Live', desc: 'Seamless system handover without downtime or payroll interruption' }
  ];

  const validationResults = [
    { field: 'Tax Identification Numbers (TIN)', status: 'Valid', count: '142 / 142 records verified with Revenue Authority', isError: false },
    { field: 'Commercial Bank NUBAN Account Codes', status: 'Valid', count: '142 / 142 confirmed via Central Bank clearing directory', isError: false },
    { field: 'Pension Fund Custodian PINs', status: 'Attention', count: '2 records missing voluntary contribution flags (Flagged for HRBP review)', isError: true },
    { field: 'Leave Entitlement Accrual Balance', status: 'Valid', count: 'All unspent carryover days mapped to 2026 ledger', isError: false }
  ];

  const handleSimulateValidation = () => {
    setValidationState('validating');
    setTimeout(() => {
      setValidationState('completed');
    }, 800);
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0A1E4A] via-[#0F2D6B] to-[#0A1E4A] text-white pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-lime-400 uppercase tracking-wider">
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Zero-Downtime Data Ingestion</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            “Data Migration Center”
          </h1>

          <p className="text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Switching HR & payroll providers shouldn't mean losing historical data. Migrate seamlessly from messy Excel spreadsheets, legacy desktop software, or disparate cloud tools with zero downtime.
          </p>
        </div>
      </section>

      {/* Migration Process: Export -> Validate -> Clean -> Import -> Verify -> Go Live */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Flawless Data Transition</span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            The 6-Stage Migration Pipeline
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {migrationPipeline.map((p) => (
            <div key={p.step} className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="text-xs font-mono font-bold text-[#0F2D6B] bg-blue-50 px-2 py-0.5 rounded w-fit mb-2">
                {p.step}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">{p.title}</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Migration Simulator & Validation Reports */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
            <div>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Automated Pre-Flight Check</span>
              <h3 className="text-2xl font-bold text-slate-900">Sample Ingestion Validation Report</h3>
              <p className="text-xs text-slate-500">Dataset: 142 Employee Master Personnel Records from Legacy Excel</p>
            </div>

            <button
              onClick={handleSimulateValidation}
              className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-[#0F2D6B] text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${validationState === 'validating' ? 'animate-spin' : ''}`} />
              <span>Re-Run Data Schema Validation</span>
            </button>
          </div>

          {/* Report Results */}
          <div className="space-y-3">
            {validationResults.map((res, i) => (
              <div 
                key={i} 
                className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  res.isError ? 'bg-amber-50/70 border-amber-200' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="space-y-1">
                  <div className="text-xs font-bold text-slate-900">{res.field}</div>
                  <div className="text-[11px] text-slate-600">{res.count}</div>
                </div>

                <div className="flex items-center gap-2">
                  {res.isError ? (
                    <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> NextSofthr Specialist Resolving
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Verified
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-900">
            <span className="font-semibold">Ready for production cutover · 0 breaking schema errors</span>
            <button
              onClick={() => onOpenLeadModal('Data Migration Consultation')}
              className="px-4 py-2 bg-[#0F2D6B] text-white rounded-lg font-bold hover:bg-[#0A1E4A] transition-colors"
            >
              Schedule Migration Assessment
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
