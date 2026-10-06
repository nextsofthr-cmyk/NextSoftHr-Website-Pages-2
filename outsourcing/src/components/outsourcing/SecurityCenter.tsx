import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  EyeOff, 
  Server, 
  RefreshCw, 
  UserCheck, 
  Check, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

interface SecurityCenterProps {
  onOpenLeadModal: (service?: string) => void;
}

export const SecurityCenter: React.FC<SecurityCenterProps> = ({ onOpenLeadModal }) => {
  const [twoFactorEnforced, setTwoFactorEnforced] = useState(true);
  const [sessionTimeoutMinutes, setSessionTimeoutMinutes] = useState(15);
  const [ipRestricted, setIpRestricted] = useState(true);

  const securityMatrix = [
    {
      feature: 'Role-Based Access Control (RBAC)',
      desc: 'Strict least-privilege matrix segregating Employee ESS, Manager MSS, Client Executive, and Outsourcing Specialist access.',
      status: 'Enforced'
    },
    {
      feature: 'Mandatory Two-Factor Authentication (2FA)',
      desc: 'TOTP authenticator app verification required for all payroll approvals and salary modifications.',
      status: 'Active'
    },
    {
      feature: '256-Bit AES Encryption At Rest & TLS 1.3 In Transit',
      desc: 'All employee contracts, payslips, bank accounts, and personal identifiers encrypted with rotating keys.',
      status: 'Active'
    },
    {
      feature: 'Cryptographic Audit Trails',
      desc: 'Every read, write, export, and status update recorded with immutable actor timestamps and IP addresses.',
      status: 'Active'
    },
    {
      feature: 'Geographic Redundancy & Automated Daily Backups',
      desc: 'Point-in-time database snapshots replicated across multiple tier-4 cloud facilities with 99.99% availability.',
      status: 'Operational'
    },
    {
      feature: 'Granular Salary Privacy Masking',
      desc: 'Line managers can view attendance and performance without ever exposing underlying compensation or loan figures.',
      status: 'Enforced'
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0A1E4A] via-[#0F2D6B] to-[#0A1E4A] text-white pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-lime-400 uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5" />
            <span>Bank-Grade Data Protection</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            “Enterprise Security Center”
          </h1>

          <p className="text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Your payroll records and employee personal data represent your company's most sensitive assets. NextSofthr enforces defense-in-depth security at every architectural layer.
          </p>
        </div>
      </section>

      {/* Visual Security Controls Dashboard */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
            <div>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Tenant Security Posture</span>
              <h3 className="text-2xl font-bold text-slate-900">Configurable Security Controls</h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
              <ShieldCheck className="w-4 h-4" />
              <span>ISO 27001 & NDPR Certified Architecture</span>
            </div>
          </div>

          {/* Interactive Controls Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-900">Enforce Mandatory 2FA</div>
                <div className="text-[11px] text-slate-500">Require TOTP authenticator</div>
              </div>
              <button
                onClick={() => setTwoFactorEnforced(!twoFactorEnforced)}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  twoFactorEnforced ? 'bg-[#0F2D6B]' : 'bg-slate-300'
                }`}
              >
                <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                  twoFactorEnforced ? 'right-1' : 'left-1'
                }`}></span>
              </button>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-900">Session Idle Timeout</div>
                <div className="text-[11px] text-slate-500">Auto logout on inactivity</div>
              </div>
              <select
                value={sessionTimeoutMinutes}
                onChange={e => setSessionTimeoutMinutes(Number(e.target.value))}
                className="text-xs font-bold bg-white border border-slate-300 rounded-lg px-2 py-1"
              >
                <option value={15}>15 Minutes</option>
                <option value={30}>30 Minutes</option>
                <option value={60}>60 Minutes</option>
              </select>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-900">IP Whitelisting</div>
                <div className="text-[11px] text-slate-500">Restrict payroll admin to office VPN</div>
              </div>
              <button
                onClick={() => setIpRestricted(!ipRestricted)}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  ipRestricted ? 'bg-[#0F2D6B]' : 'bg-slate-300'
                }`}
              >
                <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                  ipRestricted ? 'right-1' : 'left-1'
                }`}></span>
              </button>
            </div>
          </div>

          {/* Security Matrix */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-900 uppercase">Architecture & Threat Defenses</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {securityMatrix.map((item, i) => (
                <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{item.feature}</span>
                    <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
