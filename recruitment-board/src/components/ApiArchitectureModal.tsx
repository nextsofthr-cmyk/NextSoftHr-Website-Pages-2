import React, { useState } from 'react';
import { X, Code2, Server, ShieldCheck, Database, CheckCircle2, Copy, Check } from 'lucide-react';
import { TECHNICAL_INTEGRATION_SPECS } from '../data/mockData';

interface ApiArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiArchitectureModal: React.FC<ApiArchitectureModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'endpoints' | 'rbac' | 'hrms-sync'>('endpoints');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleCopyEndpoint = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div 
        className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#142B4A] dark:bg-slate-950 text-white px-6 py-4 flex items-center justify-between shrink-0 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2563EB] flex items-center justify-center text-white">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-lime-600 dark:text-lime-400">
                Deliverable 9 & 10 Technical Architecture
              </span>
              <h2 className="text-base font-bold text-white">
                NextSoftHR Backend Endpoints & Enterprise HRMS Integration Specs
              </h2>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Strip */}
        <div className="bg-slate-100 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 px-6 py-2.5 flex items-center gap-2 text-xs">
          <button
            onClick={() => setActiveTab('endpoints')}
            className={`px-3 py-1.5 font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'endpoints' ? 'bg-white dark:bg-slate-800 text-[#142B4A] dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Required API Endpoints
          </button>
          <button
            onClick={() => setActiveTab('rbac')}
            className={`px-3 py-1.5 font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'rbac' ? 'bg-white dark:bg-slate-800 text-[#142B4A] dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Role & Account Permissions (RBAC)
          </button>
          <button
            onClick={() => setActiveTab('hrms-sync')}
            className={`px-3 py-1.5 font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'hrms-sync' ? 'bg-white dark:bg-slate-800 text-[#142B4A] dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Core HRMS & Payroll Sync Architecture
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs">
          
          {activeTab === 'endpoints' && (
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900/60 rounded-xl text-slate-700 dark:text-slate-300">
                <p className="font-semibold text-slate-900 dark:text-white">Integration Gateway Overview:</p>
                <p className="mt-0.5">The NextSoftHR Job Board interacts with the backend service layer via secure RESTful JSON APIs and GraphQL subscriptions with OAuth 2.0 Bearer tokens and webhook events.</p>
              </div>

              <div className="space-y-3">
                {TECHNICAL_INTEGRATION_SPECS.endpoints.map((ep, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2 font-mono text-xs">
                        <span className={`px-2 py-0.5 rounded font-bold ${ep.method === 'POST' ? 'bg-lime-100 dark:bg-lime-950/80 text-lime-800 dark:text-lime-300 border border-lime-300 dark:border-lime-800' : 'bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-800'}`}>
                          {ep.method}
                        </span>
                        <span className="font-bold text-slate-900 dark:text-white">{ep.path}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">{ep.auth}</span>
                        <button
                          onClick={() => handleCopyEndpoint(ep.path, idx)}
                          className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                          title="Copy path"
                        >
                          {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-xs">{ep.description}</p>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                      Authorized Roles: {ep.roles.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'rbac' && (
            <div className="space-y-4">
              <p className="text-slate-600 dark:text-slate-300">
                The NextSoftHR platform enforces Role-Based Access Control (RBAC) to ensure strict segregation of duties across candidates, direct employers, outsourcing agents, and affiliates.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden text-xs">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-bold border-b border-slate-200 dark:border-slate-700">
                    <tr>
                      <th className="p-3">User Role</th>
                      <th className="p-3">Candidate Resumes</th>
                      <th className="p-3">Post Vacancies</th>
                      <th className="p-3">ATS Scorecards</th>
                      <th className="p-3">HRMS Payroll Sync</th>
                      <th className="p-3">Referral Ledger</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    <tr className="dark:bg-slate-900">
                      <td className="p-3 font-semibold text-slate-900 dark:text-white">Job Seeker</td>
                      <td className="p-3 text-lime-700 dark:text-lime-400 font-medium">Own profile only</td>
                      <td className="p-3 text-slate-400 dark:text-slate-500">No</td>
                      <td className="p-3 text-slate-400 dark:text-slate-500">No</td>
                      <td className="p-3 text-slate-400 dark:text-slate-500">No</td>
                      <td className="p-3 text-slate-400 dark:text-slate-500">No</td>
                    </tr>
                    <tr className="dark:bg-slate-900/60">
                      <td className="p-3 font-semibold text-slate-900 dark:text-white">Employer / HR Team</td>
                      <td className="p-3 text-lime-700 dark:text-lime-400 font-medium">Own applicants</td>
                      <td className="p-3 text-lime-700 dark:text-lime-400 font-medium">Yes (Full)</td>
                      <td className="p-3 text-lime-700 dark:text-lime-400 font-medium">Yes</td>
                      <td className="p-3 text-lime-700 dark:text-lime-400 font-medium">Yes (With subscription)</td>
                      <td className="p-3 text-slate-400 dark:text-slate-500">No</td>
                    </tr>
                    <tr className="dark:bg-slate-900">
                      <td className="p-3 font-semibold text-slate-900 dark:text-white">Recruitment Agency</td>
                      <td className="p-3 text-lime-700 dark:text-lime-400 font-medium">Agency pool & clients</td>
                      <td className="p-3 text-lime-700 dark:text-lime-400 font-medium">Client briefs</td>
                      <td className="p-3 text-lime-700 dark:text-lime-400 font-medium">Client pipeline</td>
                      <td className="p-3 text-slate-400 dark:text-slate-500">Placement report only</td>
                      <td className="p-3 text-slate-400 dark:text-slate-500">No</td>
                    </tr>
                    <tr className="dark:bg-slate-900/60">
                      <td className="p-3 font-semibold text-slate-900 dark:text-white">Business Partner</td>
                      <td className="p-3 text-slate-400 dark:text-slate-500">No</td>
                      <td className="p-3 text-slate-400 dark:text-slate-500">No</td>
                      <td className="p-3 text-slate-400 dark:text-slate-500">No</td>
                      <td className="p-3 text-slate-400 dark:text-slate-500">No</td>
                      <td className="p-3 text-lime-700 dark:text-lime-400 font-medium">Yes (Full commission)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'hrms-sync' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900 dark:bg-black/70 text-slate-200 border border-transparent dark:border-slate-800 font-mono text-[11px] leading-relaxed overflow-x-auto">
                <span className="text-lime-400">// NextSoftHR One-Click Onboarding Webhook Payload</span><br/>
                &#123;<br/>
                &nbsp;&nbsp;"event": "recruitment.candidate.hired",<br/>
                &nbsp;&nbsp;"candidate_id": "cand_892341",<br/>
                &nbsp;&nbsp;"vacancy_id": "job-1",<br/>
                &nbsp;&nbsp;"job_title": "Senior HR Business Partner",<br/>
                &nbsp;&nbsp;"salary_agreed_gross_ngn": 1850000,<br/>
                &nbsp;&nbsp;"hire_date": "2026-11-01",<br/>
                &nbsp;&nbsp;"target_hrms_company_id": "comp_nextsoft_ng",<br/>
                &nbsp;&nbsp;"actions": [<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;"generate_staff_id",<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;"setup_paye_tax_ledger",<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;"dispatch_onboarding_portal_invite"<br/>
                &nbsp;&nbsp;]<br/>
                &#125;
              </div>

              <div className="text-slate-600 dark:text-slate-300 space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-xs">Lifecycle Integration Architecture:</h4>
                <p>1. Candidate applies on NextSoftHR Marketplace → Profile stored in isolated candidate database.</p>
                <p>2. Employer or RPO team conducts interviews and issues offer letter through the ATS pipeline.</p>
                <p>3. Once candidate accepts, the employer hits "Sync to NextSoftHR Core" which triggers the webhook above.</p>
                <p>4. The employee profile is automatically generated in NextSoftHR Core HRMS, populating payroll with PAYE, pension, and leave balances with zero manual double-entry.</p>
              </div>
            </div>
          )}

        </div>

        <div className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 px-6 py-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Version: {TECHNICAL_INTEGRATION_SPECS.version}</span>
          <button onClick={onClose} className="px-4 py-1.5 bg-[#142B4A] dark:bg-blue-600 hover:bg-[#1E3A5F] dark:hover:bg-blue-500 text-white rounded-lg font-semibold transition-colors cursor-pointer">
            Close Architecture Docs
          </button>
        </div>
      </div>
    </div>
  );
};
