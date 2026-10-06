import React, { useState } from 'react';
import { 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  User, 
  FileText, 
  Award, 
  Clock, 
  CreditCard, 
  Phone, 
  Calendar, 
  ShieldCheck,
  Building,
  Briefcase
} from 'lucide-react';

interface EmployeeAdministrationProps {
  onOpenLeadModal: (service?: string) => void;
}

export const EmployeeAdministration: React.FC<EmployeeAdministrationProps> = ({ onOpenLeadModal }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'contracts' | 'history' | 'benefits' | 'records'>('profile');

  const employeeData = {
    name: 'Amara Okafor',
    empId: 'NS-2024-089',
    role: 'Lead Cloud Architect',
    department: 'Engineering & DevOps',
    location: 'Lagos Island Office, Nigeria',
    employmentType: 'Full-Time Permanent',
    joinDate: '15 March 2024',
    status: 'Active · Confirmed',
    email: 'amara.okafor@company.com',
    phone: '+234 803 456 7890',
    emergencyContact: 'Chinedu Okafor (Spouse) · +234 802 987 6543',
    qualifications: ['B.Sc Computer Science (Unilag, First Class)', 'AWS Certified Solutions Architect Professional', 'CKA Kubernetes Administrator'],
    salaryHistory: [
      { date: 'Jan 2026', amount: '₦1,850,000 / mo', reason: 'Annual Performance Review (+15%)' },
      { date: 'Jan 2025', amount: '₦1,600,000 / mo', reason: 'Merit Adjustment (+14%)' },
      { date: 'Mar 2024', amount: '₦1,400,000 / mo', reason: 'Initial Offer / Confirmation' }
    ],
    benefits: [
      'Gold HMO Health Insurance (Family Tier - Bupa/Hygeia)',
      'Statutory Pension (8% EE + 10% ER with Stanbic IBTC Pension)',
      'Quarterly Remote Ergonomics & Connectivity Allowance',
      'Life Insurance Coverage (3x Annual Gross Salary)'
    ],
    leaveBalance: '16.5 Days Remaining (Annual Leave)',
    attendanceRate: '98.4% On-Time Precision'
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0A1E4A] via-[#0F2D6B] to-[#0A1E4A] text-white pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-lime-400 uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Centralized Personnel Governance</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            “Keep Employee Administration <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 to-emerald-400">
              Organized From Day One.”
            </span>
          </h1>

          <p className="text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Consolidate fragmented personnel folders, physical contracts, and salary spreadsheets into a verified single source of truth managed and maintained by NextSofthr specialists.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenLeadModal('Employee Administration')}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-lime-400 to-[#9AE616] hover:from-lime-300 hover:to-lime-400 text-slate-950 font-bold text-base rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <span>Organize Your Employee Data</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>
      </section>

      {/* Centralized Employee Profile Interface */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
          {/* Top Profile Banner */}
          <div className="bg-slate-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-lime-400 to-blue-600 flex items-center justify-center text-slate-950 font-black text-2xl shadow-md">
                AO
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-bold text-white">{employeeData.name}</h3>
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-semibold">
                    {employeeData.status}
                  </span>
                </div>
                <div className="text-xs text-slate-300 mt-1 flex flex-wrap items-center gap-3">
                  <span>ID: <strong className="text-white font-mono">{employeeData.empId}</strong></span>
                  <span>·</span>
                  <span>{employeeData.role}</span>
                  <span>·</span>
                  <span>{employeeData.department}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => alert('Official Verified Employee Dossier exported.')}
                className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-semibold border border-white/20 transition-colors"
              >
                Export Full Dossier (PDF)
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-slate-200 bg-slate-50 px-6 overflow-x-auto text-xs font-bold text-slate-600">
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-3.5 px-4 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'profile' ? 'border-[#0F2D6B] text-[#0F2D6B]' : 'border-transparent hover:text-slate-900'
              }`}
            >
              Personal & Employment
            </button>
            <button
              onClick={() => setActiveTab('contracts')}
              className={`py-3.5 px-4 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'contracts' ? 'border-[#0F2D6B] text-[#0F2D6B]' : 'border-transparent hover:text-slate-900'
              }`}
            >
              Contracts & Documents
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`py-3.5 px-4 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'history' ? 'border-[#0F2D6B] text-[#0F2D6B]' : 'border-transparent hover:text-slate-900'
              }`}
            >
              Salary & Job History
            </button>
            <button
              onClick={() => setActiveTab('benefits')}
              className={`py-3.5 px-4 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'benefits' ? 'border-[#0F2D6B] text-[#0F2D6B]' : 'border-transparent hover:text-slate-900'
              }`}
            >
              Benefits & Entitlements
            </button>
            <button
              onClick={() => setActiveTab('records')}
              className={`py-3.5 px-4 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'records' ? 'border-[#0F2D6B] text-[#0F2D6B]' : 'border-transparent hover:text-slate-900'
              }`}
            >
              Leave & Attendance Stats
            </button>
          </div>

          {/* Tab Content Display */}
          <div className="p-6 sm:p-8">
            {activeTab === 'profile' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
                <div className="space-y-4 border border-slate-200 rounded-xl p-5 bg-slate-50/50">
                  <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wider text-[#0F2D6B]">
                    Employment Information
                  </h4>
                  <div className="space-y-2.5">
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Department:</span>
                      <strong className="text-slate-800">{employeeData.department}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Location / Branch:</span>
                      <strong className="text-slate-800">{employeeData.location}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Employment Nature:</span>
                      <strong className="text-slate-800">{employeeData.employmentType}</strong>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Date of Joining:</span>
                      <strong className="text-slate-800">{employeeData.joinDate}</strong>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 border border-slate-200 rounded-xl p-5 bg-slate-50/50">
                  <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wider text-[#0F2D6B]">
                    Contact & Emergency Details
                  </h4>
                  <div className="space-y-2.5">
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Work Email:</span>
                      <strong className="text-slate-800">{employeeData.email}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Direct Phone:</span>
                      <strong className="text-slate-800">{employeeData.phone}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Next of Kin / Contact:</span>
                      <strong className="text-slate-800">{employeeData.emergencyContact}</strong>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Verified KYC Documents:</span>
                      <span className="text-emerald-700 font-semibold">National ID (NIN) & Proof of Address Validated</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'contracts' && (
              <div className="space-y-3">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="text-sm font-bold text-slate-900">Full-Time Indeterminate Employment Contract</div>
                      <div className="text-xs text-slate-500">Signed 12 March 2024 · Verified E-Signature</div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                    Active & Compliant
                  </span>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="text-sm font-bold text-slate-900">Intellectual Property & Non-Disclosure Agreement (NDA)</div>
                      <div className="text-xs text-slate-500">Signed 12 March 2024 · NextSofthr Standard Master Agreement</div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                    Active
                  </span>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="text-sm font-bold text-slate-900">Staff Code of Conduct & Anti-Bribery Declaration</div>
                      <div className="text-xs text-slate-500">Annual re-affirmation completed Jan 2026</div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                    Renewed
                  </span>
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase">Compensation & Progression Timeline</h4>
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
                  {employeeData.salaryHistory.map((item, idx) => (
                    <div key={idx} className="p-4 flex items-center justify-between text-xs sm:text-sm">
                      <div>
                        <div className="font-bold text-slate-900">{item.amount}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{item.reason}</div>
                      </div>
                      <div className="text-xs font-mono text-slate-400 bg-white px-2 py-1 rounded border border-slate-200">
                        {item.date}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'benefits' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {employeeData.benefits.map((benefit, i) => (
                  <div key={i} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-lime-100 text-lime-700 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                      ✓
                    </div>
                    <span className="text-xs font-medium text-slate-800">{benefit}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'records' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 bg-blue-50 border border-blue-200 rounded-xl space-y-2">
                  <div className="text-xs font-bold text-blue-900 uppercase">Annual Leave Ledger</div>
                  <div className="text-2xl font-bold text-[#0F2D6B]">{employeeData.leaveBalance}</div>
                  <p className="text-xs text-blue-700">4.5 days taken in 2026 · Next accrual on 1st of next month</p>
                </div>

                <div className="p-5 bg-lime-50 border border-lime-300 rounded-xl space-y-2">
                  <div className="text-xs font-bold text-lime-900 uppercase">Attendance Consistency</div>
                  <div className="text-2xl font-bold text-lime-800">{employeeData.attendanceRate}</div>
                  <p className="text-xs text-lime-700">Synchronized via office biometric gate and mobile ESS</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
