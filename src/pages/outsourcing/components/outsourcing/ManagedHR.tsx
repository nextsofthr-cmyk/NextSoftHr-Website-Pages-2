import React, { useState } from 'react';
import { 
  Briefcase, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  ShieldCheck, 
  Cpu, 
  TrendingUp, 
  MessageSquare, 
  Award,
  Layers,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface ManagedHRProps {
  onOpenLeadModal: (service?: string) => void;
}

export const ManagedHR: React.FC<ManagedHRProps> = ({ onOpenLeadModal }) => {
  const [teamSize, setTeamSize] = useState<'growth' | 'midsize' | 'enterprise'>('midsize');

  const podConfigs = {
    growth: {
      label: 'Growth Pod (15 - 50 Staff)',
      hrbp: 'Dedicated Associate HRBP (Half-Time)',
      specialists: '1 Payroll Specialist + 1 Ops Coordinator',
      sla: '4-hour query response',
      deliverables: 'Monthly compliance audit, leave calendar sync, digital onboarding, bi-weekly advisory call'
    },
    midsize: {
      label: 'Scale-Up Pod (50 - 250 Staff)',
      hrbp: 'Senior HR Business Partner (Dedicated)',
      specialists: '1 Senior Payroll Accountant + 1 Talent Specialist + 1 HR Operations Lead',
      sla: '2-hour priority SLA',
      deliverables: 'Handbook drafting, quarterly performance review cycle, salary benchmarking, manager training, weekly steering'
    },
    enterprise: {
      label: 'Enterprise Pod (250+ Staff)',
      hrbp: 'Principal People Director & Legal Counsel',
      specialists: 'Full 5-Specialist Dedicated Delivery Unit (Payroll, ER, Compliance, Sourcing, Operations)',
      sla: '1-hour executive SLA + dedicated Slack/Teams bridge',
      deliverables: 'Multi-entity corporate governance, pan-African tax filing, executive compensation committee, union/labor relations'
    }
  };

  const managedServices = [
    { title: 'HR Administration', desc: 'Day-to-day employee documentation, letters, contracts, and personnel file compliance.' },
    { title: 'HR Policy Support', desc: 'Drafting and updating employee handbooks, remote work policies, and statutory compliance.' },
    { title: 'Employee Relations Support', desc: 'Conflict resolution, workplace investigations, mediation, and disciplinary hearings.' },
    { title: 'Performance Management', desc: 'KPI design, quarterly appraisals, 360 reviews, and underperformance improvement plans.' },
    { title: 'Workforce Planning', desc: 'Headcount forecasting, organizational design, skills gap analysis, and succession planning.' },
    { title: 'Executive HR Reporting', desc: 'Monthly board-ready workforce metrics: attrition, headcount, tenure, and labor costs.' },
    { title: 'Attendance & Leave Administration', desc: 'Overtime verification, maternity/paternity tracking, and leave entitlement reconciliation.' },
    { title: 'Employee Engagement & Culture', desc: 'Quarterly pulse surveys, engagement index tracking, and team culture initiatives.' },
    { title: 'HR Documentation & Templates', desc: 'Standardized letters, NDAs, warning notices, promotions, and exit documents.' },
    { title: 'Recruitment Coordination', desc: 'Liaising with hiring managers, job descriptions, ATS screening, and interview workflows.' },
    { title: 'Strategic HR Advisory', desc: 'C-suite advisory on labor law reforms, statutory wage changes, and organizational scaling.' },
    { title: 'HR Technology Administration', desc: 'Configuration, user permissions, workflow automation, and platform maintenance.' }
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0A1E4A] via-[#0F2D6B] to-[#0A1E4A] text-white pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-lime-400 uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Dedicated People Operations Unit</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            “A Complete HR Team, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 to-emerald-400">
              Powered by NextSofthr.”
            </span>
          </h1>

          <p className="text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Gain the strategic firepower of a high-performing People Department at a fraction of the overhead. Dedicated senior HR leaders, payroll accountants, and our enterprise SaaS platform — working as your internal team.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenLeadModal('Managed HR Solution')}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-lime-400 to-[#9AE616] hover:from-lime-300 hover:to-lime-400 text-slate-950 font-bold text-base rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <span>Build Your Managed HR Solution</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>
      </section>

      {/* Visual Operational Flow: Your Business -> NextSofthr HR Team -> NextSofthr Platform -> Employees & Managers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-12">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Operating Model</span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            How Managed HR Operates Seamlessly
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto">
            The modern operating architecture connecting executive leadership, specialized HR professionals, and daily team self-service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {/* Node 1 */}
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-md relative flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center font-bold text-sm mb-3">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900">Your Business</h3>
              <p className="text-xs text-slate-500 mt-1">
                Executive founders, directors, and operational heads set goals, approve budgets, and steer company culture.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 text-[11px] font-semibold text-blue-700">
              Strategic Intent & Leadership
            </div>
          </div>

          {/* Node 2 */}
          <div className="p-6 bg-[#0F2D6B] text-white rounded-2xl shadow-xl relative flex flex-col justify-between">
            <div className="absolute -top-2.5 right-4 bg-lime-400 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-full">
              Your Specialists
            </div>
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/10 text-lime-400 flex items-center justify-center font-bold text-sm mb-3">
                02
              </div>
              <h3 className="text-base font-bold text-white">NextSofthr HR Team</h3>
              <p className="text-xs text-slate-300 mt-1">
                Senior HR Business Partner, Payroll Specialist, and Compliance Counsel assigned specifically to your organization.
              </p>
            </div>
            <div className="pt-4 border-t border-white/10 text-[11px] font-semibold text-lime-300">
              Expert Execution & Advisory
            </div>
          </div>

          {/* Node 3 */}
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-md relative flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-lime-50 text-lime-700 flex items-center justify-center font-bold text-sm mb-3">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900">NextSofthr Platform</h3>
              <p className="text-xs text-slate-500 mt-1">
                Automated workflows, leave calendars, biometric attendance sync, audit logs, and AI copilot intelligence.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 text-[11px] font-semibold text-lime-700">
              Intelligent Cloud Engine
            </div>
          </div>

          {/* Node 4 */}
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-md relative flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm mb-3">
                04
              </div>
              <h3 className="text-base font-bold text-slate-900">Employees & Managers</h3>
              <p className="text-xs text-slate-500 mt-1">
                Employees access mobile payslips, request time-off, and receive dedicated HR care. Line managers approve with 1 click.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 text-[11px] font-semibold text-emerald-700">
              Empowered & Supported Team
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Managed HR Solution Pod Builder */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 rounded-2xl p-6 sm:p-10 border border-slate-200 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#0F2D6B] uppercase tracking-wider">Solution Customizer</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Configure Your Dedicated Managed HR Pod
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
              Select your team size to view the recommended dedicated staffing structure and delivery scope.
            </p>
          </div>

          {/* Toggle buttons */}
          <div className="flex justify-center">
            <div className="inline-flex p-1 bg-white rounded-xl border border-slate-200 shadow-2xs">
              <button
                onClick={() => setTeamSize('growth')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                  teamSize === 'growth' 
                    ? 'bg-[#0F2D6B] text-white shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                15 - 50 Employees
              </button>
              <button
                onClick={() => setTeamSize('midsize')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                  teamSize === 'midsize' 
                    ? 'bg-[#0F2D6B] text-white shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                50 - 250 Employees (Recommended)
              </button>
              <button
                onClick={() => setTeamSize('enterprise')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                  teamSize === 'enterprise' 
                    ? 'bg-[#0F2D6B] text-white shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                250+ Enterprise Scale
              </button>
            </div>
          </div>

          {/* Pod breakdown card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-md max-w-3xl mx-auto space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-blue-700 uppercase">Target Scale</span>
                <h4 className="text-lg font-bold text-slate-900">{podConfigs[teamSize].label}</h4>
              </div>
              <span className="text-xs font-mono bg-lime-100 text-lime-800 px-2.5 py-1 rounded-full font-semibold">
                {podConfigs[teamSize].sla}
              </span>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <span className="font-bold text-slate-900 w-36 shrink-0">Senior Leadership:</span>
                <span className="text-slate-700">{podConfigs[teamSize].hrbp}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-bold text-slate-900 w-36 shrink-0">Specialist Support:</span>
                <span className="text-slate-700">{podConfigs[teamSize].specialists}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-bold text-slate-900 w-36 shrink-0">Key Deliverables:</span>
                <span className="text-slate-700">{podConfigs[teamSize].deliverables}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">Includes NextSofthr Cloud Platform & ESS/MSS access</span>
              <button
                onClick={() => onOpenLeadModal(`Managed HR - ${podConfigs[teamSize].label}`)}
                className="px-5 py-2.5 bg-[#0F2D6B] hover:bg-[#0A1E4A] text-white font-semibold text-xs rounded-xl transition-colors shadow-sm flex items-center gap-1.5"
              >
                <span>Request Pod Proposal</span>
                <ArrowRight className="w-3.5 h-3.5 text-lime-400" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 12 Managed Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Full Operational Scope</span>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
            12 Essential Services Included in Managed HR
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {managedServices.map((svc) => (
            <div key={svc.title} className="p-5 bg-white rounded-xl border border-slate-200 hover:border-blue-400 transition-colors shadow-2xs space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-lime-500"></div>
                <h4 className="text-sm font-bold text-slate-900">{svc.title}</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{svc.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
