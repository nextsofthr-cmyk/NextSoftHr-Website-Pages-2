import React from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  CreditCard, 
  Users, 
  Briefcase, 
  Sparkles, 
  Building2, 
  CheckCircle2, 
  Globe2, 
  Cpu, 
  TrendingUp, 
  Check, 
  Layers,
  Clock,
  Award,
  ChevronRight
} from 'lucide-react';
import { NavigationPage } from '../../types';

interface HomeViewProps {
  onNavigate: (page: NavigationPage) => void;
  onOpenLeadModal: (service?: string) => void;
  onOpenWizard: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenLeadModal,
  onOpenWizard
}) => {
  const caseStudies = [
    {
      company: 'Apex Global Logistics Ltd',
      sector: 'Supply Chain & Maritime Logistics',
      country: 'Nigeria (Lagos, Port Harcourt, Kano)',
      challenge: 'Managing overtime, multi-state PAYE compliance and manual paper payslips for 140+ field operatives across 3 regional transit hubs.',
      solution: 'NextSofthr full HR + Payroll Outsourcing with biometric clocking integration, mobile payslips, and monthly automated SIRS tax filings.',
      result: 'Reclaimed 65 monthly administrative hours and eliminated month-end payroll discrepancies.'
    },
    {
      company: 'Kifaru FinTech Solutions',
      sector: 'Pan-African Digital Banking',
      country: 'Kenya (Nairobi HQ) & Ghana',
      challenge: 'Scaling cross-border engineering teams while complying with Kenyan KRA Housing Levy & Ghanaian SSNIT Tier 1/2 requirements.',
      solution: 'NextSofthr Multi-Country African Payroll and Dedicated Managed HR pod providing senior HRBP leadership.',
      result: 'Accelerated technical onboarding by 60% with zero statutory filing penalties.'
    }
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#061537] via-[#0A1E4A] to-[#0F2D6B] text-white pt-24 pb-28 px-4 sm:px-6 lg:px-8">
        {/* Glow ambient meshes */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/20 blur-[140px] pointer-events-none rounded-full"></div>
        <div className="absolute top-1/3 right-10 w-[350px] h-[250px] bg-lime-400/15 blur-[120px] pointer-events-none rounded-full"></div>

        <div className="relative max-w-5xl mx-auto text-center space-y-7">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-lime-400 tracking-wide uppercase">
            <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse"></span>
            <span>Technology-Powered HR & Payroll Outsourcing Partner</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.12]">
            Your People. Our Expertise. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 via-lime-400 to-emerald-400">
              Smarter HR & Payroll.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Outsource critical HR and payroll operations to NextSofthr while keeping complete visibility and control through a modern, intelligent workforce management platform.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenLeadModal('General Outsourcing Inquiry')}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-lime-400 to-[#9AE616] hover:from-lime-300 hover:to-lime-400 text-slate-950 font-bold text-base rounded-xl transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 transform active:scale-95"
            >
              <span>Talk to an Outsourcing Expert</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>

            <button
              onClick={() => onNavigate('outsourcing-hub')}
              className="w-full sm:w-auto px-7 py-4 bg-white/10 hover:bg-white/15 text-white font-medium text-base rounded-xl transition-colors border border-white/20 flex items-center justify-center gap-2"
            >
              <span>Explore Outsourcing Services</span>
            </button>
          </div>

          {/* Social Proof Stats Bar */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-white/10 text-left">
            <div className="p-3">
              <div className="text-3xl font-extrabold text-lime-400 font-mono">480+</div>
              <div className="text-xs text-slate-300 mt-1 font-medium">Enterprise Clients Managed</div>
            </div>
            <div className="p-3">
              <div className="text-3xl font-extrabold text-lime-400 font-mono">10+</div>
              <div className="text-xs text-slate-300 mt-1 font-medium">African Tax Jurisdictions</div>
            </div>
            <div className="p-3">
              <div className="text-3xl font-extrabold text-lime-400 font-mono">99.98%</div>
              <div className="text-xs text-slate-300 mt-1 font-medium">Payroll Precision Accuracy</div>
            </div>
            <div className="p-3">
              <div className="text-3xl font-extrabold text-lime-400 font-mono">100%</div>
              <div className="text-xs text-slate-300 mt-1 font-medium">Audit-Ready Compliance</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Six Major Service Lines Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold text-blue-700 dark:text-lime-400 uppercase tracking-wider">
              Comprehensive Service Ecosystem
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Six Core Outsourcing Solutions
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl">
              Scalable workforce operations engineered for African and multinational businesses.
            </p>
          </div>

          <button
            onClick={() => onNavigate('outsourcing-hub')}
            className="text-xs font-bold text-[#0F2D6B] dark:text-lime-400 hover:text-blue-900 dark:hover:text-lime-300 flex items-center gap-1.5 shrink-0"
          >
            <span>View All Outsourcing Services</span>
            <ArrowRight className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Payroll */}
          <div 
            onClick={() => onNavigate('outsourcing-payroll')}
            className="group p-7 bg-white dark:bg-[#0B1A3D] rounded-2xl border border-slate-200 dark:border-blue-900/50 shadow-sm hover:shadow-xl dark:shadow-blue-950/40 hover:border-blue-400 dark:hover:border-lime-400 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-[#0F2D6B] dark:text-blue-300 flex items-center justify-center group-hover:bg-[#0F2D6B] dark:group-hover:bg-lime-400 group-hover:text-lime-400 dark:group-hover:text-slate-950 transition-colors">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#0F2D6B] dark:group-hover:text-lime-300 transition-colors">
                Payroll Outsourcing
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Accurate, secure monthly payroll processing, salary calculations, allowances, statutory PAYE, pension remittances, and digital payslips.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-100 dark:border-blue-900/40 flex items-center justify-between text-xs font-bold text-[#0F2D6B] dark:text-lime-400 mt-6">
              <span>View Payroll Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: HR Admin */}
          <div 
            onClick={() => onNavigate('outsourcing-hr-admin')}
            className="group p-7 bg-white dark:bg-[#0B1A3D] rounded-2xl border border-slate-200 dark:border-blue-900/50 shadow-sm hover:shadow-xl dark:shadow-blue-950/40 hover:border-lime-400 dark:hover:border-lime-400 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-lime-50 dark:bg-lime-950/60 text-lime-700 dark:text-lime-300 flex items-center justify-center group-hover:bg-[#0F2D6B] dark:group-hover:bg-lime-400 group-hover:text-lime-400 dark:group-hover:text-slate-950 transition-colors">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#0F2D6B] dark:group-hover:text-lime-300 transition-colors">
                HR Administration Outsourcing
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Digital onboarding, personnel file management, official HR letters, leave approvals, attendance records, and policy administration.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-100 dark:border-blue-900/40 flex items-center justify-between text-xs font-bold text-[#0F2D6B] dark:text-lime-400 mt-6">
              <span>Inspect Employee Lifecycle</span>
              <ArrowRight className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Managed HR */}
          <div 
            onClick={() => onNavigate('outsourcing-managed-hr')}
            className="group p-7 bg-white dark:bg-[#0B1A3D] rounded-2xl border border-slate-200 dark:border-blue-900/50 shadow-sm hover:shadow-xl dark:shadow-blue-950/40 hover:border-purple-400 dark:hover:border-lime-400 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 flex items-center justify-center group-hover:bg-[#0F2D6B] dark:group-hover:bg-lime-400 group-hover:text-lime-400 dark:group-hover:text-slate-950 transition-colors">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#0F2D6B] dark:group-hover:text-lime-300 transition-colors">
                Managed HR Services
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Your outsourced People Department. Dedicated senior HR business partners, employee relations, appraisals, and strategic steering.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-100 dark:border-blue-900/40 flex items-center justify-between text-xs font-bold text-[#0F2D6B] dark:text-lime-400 mt-6">
              <span>Build Managed HR Pod</span>
              <ArrowRight className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Recruitment */}
          <div 
            onClick={() => onNavigate('outsourcing-recruitment')}
            className="group p-7 bg-white dark:bg-[#0B1A3D] rounded-2xl border border-slate-200 dark:border-blue-900/50 shadow-sm hover:shadow-xl dark:shadow-blue-950/40 hover:border-amber-400 dark:hover:border-lime-400 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center group-hover:bg-[#0F2D6B] dark:group-hover:bg-lime-400 group-hover:text-lime-400 dark:group-hover:text-slate-950 transition-colors">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#0F2D6B] dark:group-hover:text-lime-300 transition-colors">
                Recruitment & Talent Outsourcing
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Find, hire, and onboard talent faster. Structured ATS pipeline, candidate screening, executive sourcing, and AI recruiter copilot.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-100 dark:border-blue-900/40 flex items-center justify-between text-xs font-bold text-[#0F2D6B] dark:text-lime-400 mt-6">
              <span>Explore ATS Pipeline</span>
              <ArrowRight className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 5: Employee Admin */}
          <div 
            onClick={() => onNavigate('outsourcing-employee-admin')}
            className="group p-7 bg-white dark:bg-[#0B1A3D] rounded-2xl border border-slate-200 dark:border-blue-900/50 shadow-sm hover:shadow-xl dark:shadow-blue-950/40 hover:border-emerald-400 dark:hover:border-lime-400 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center group-hover:bg-[#0F2D6B] dark:group-hover:bg-lime-400 group-hover:text-lime-400 dark:group-hover:text-slate-950 transition-colors">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#0F2D6B] dark:group-hover:text-lime-300 transition-colors">
                Employee Administration
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Single source of truth for contracts, emergency contacts, qualifications, department allocations, and employee status tracking.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-100 dark:border-blue-900/40 flex items-center justify-between text-xs font-bold text-[#0F2D6B] dark:text-lime-400 mt-6">
              <span>View Employee Master File</span>
              <ArrowRight className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 6: Enterprise Workforce */}
          <div 
            onClick={() => onNavigate('multi-company')}
            className="group p-7 bg-white dark:bg-[#0B1A3D] rounded-2xl border border-slate-200 dark:border-blue-900/50 shadow-sm hover:shadow-xl dark:shadow-blue-950/40 hover:border-indigo-400 dark:hover:border-lime-400 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 flex items-center justify-center group-hover:bg-[#0F2D6B] dark:group-hover:bg-lime-400 group-hover:text-lime-400 dark:group-hover:text-slate-950 transition-colors">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#0F2D6B] dark:group-hover:text-lime-300 transition-colors">
                Enterprise Workforce Management
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Multi-company holding structures, subsidiaries, regional branch hierarchies, and multi-currency consolidated workforce reporting.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-100 dark:border-blue-900/40 flex items-center justify-between text-xs font-bold text-[#0F2D6B] dark:text-lime-400 mt-6">
              <span>Simulate Hierarchy Tree</span>
              <ArrowRight className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Technology + Human HR Proposition */}
      <section className="bg-slate-100/70 dark:bg-[#07132F] py-20 px-4 sm:px-6 lg:px-8 border-y border-slate-200 dark:border-blue-950 transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-lime-400">
                Operating Philosophy
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Human HR Expertise. <br />
                <span className="text-[#0F2D6B] dark:text-blue-400">Powered by NextSofthr Cloud Technology.</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                We believe exceptional workforce management requires both world-class software and trusted human judgment. You are never handed off to an automated ticket queue or left to navigate regional tax audits alone.
              </p>

              <div className="space-y-3.5 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-lime-100 dark:bg-lime-950/70 text-lime-800 dark:text-lime-300 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Dedicated Account Specialist Pod</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Assigned senior payroll accountant and HRBP who knows your team, policies, and company culture.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-lime-100 dark:bg-lime-950/70 text-lime-800 dark:text-lime-300 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">24/7 Real-Time Cloud Visibility</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Client executives retain total visibility and final sign-off authority across all payroll cycles.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-lime-100 dark:bg-lime-950/70 text-lime-800 dark:text-lime-300 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Deep African Statutory Rulesets</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Pre-configured formulas for Nigeria PAYE & PenCom, Ghana SSNIT, Kenya KRA & NSSF, South Africa SARS/UIF, and more.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <button
                  onClick={() => onOpenLeadModal('Strategy Consultation')}
                  className="px-6 py-3 bg-[#0F2D6B] dark:bg-blue-600 hover:bg-[#0A1E4A] dark:hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
                >
                  <span>Talk to an Outsourcing Specialist</span>
                  <ArrowRight className="w-3.5 h-3.5 text-lime-400" />
                </button>
                <button
                  onClick={() => onNavigate('calculator')}
                  className="px-5 py-3 bg-white dark:bg-[#0B1A3D] hover:bg-slate-50 dark:hover:bg-[#122452] text-slate-800 dark:text-slate-200 font-semibold text-xs rounded-xl border border-slate-300 dark:border-blue-900/50 transition-colors"
                >
                  Calculate Your Needs
                </button>
              </div>
            </div>

            {/* Visual Dashboard Snippet */}
            <div className="bg-white dark:bg-[#0B1A3D] rounded-2xl border border-slate-200 dark:border-blue-900/50 shadow-xl p-6 sm:p-8 space-y-5 transition-colors">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-blue-900/40">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="text-xs font-mono text-slate-400 ml-2">NextSofthr Cloud Operating Console</span>
                </div>
                <span className="text-[10px] font-mono text-lime-700 dark:text-lime-300 bg-lime-50 dark:bg-lime-950/60 border dark:border-lime-900/40 px-2 py-0.5 rounded font-bold">Live Synced</span>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-[#06112C] rounded-xl border border-slate-200 dark:border-blue-900/40 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">Active Payroll Run</div>
                  <div className="text-xl font-bold text-slate-900 dark:text-white">Apex Global Logistics Ltd</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Cycle: September 2026 · 142 Employees</div>
                </div>
                <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold rounded-full border dark:border-emerald-800/40">
                  Approved & Disbursed
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/40 rounded-xl space-y-1">
                  <span className="text-blue-800 dark:text-blue-300 font-semibold">Net Salary Payout</span>
                  <div className="text-lg font-bold text-[#0F2D6B] dark:text-lime-400 font-mono">₦6,132,000</div>
                  <span className="text-[10px] text-blue-600 dark:text-blue-400">Disbursed via Commercial Clearing</span>
                </div>
                <div className="p-3 bg-lime-50/70 dark:bg-lime-950/30 border border-lime-300 dark:border-lime-900/40 rounded-xl space-y-1">
                  <span className="text-lime-900 dark:text-lime-300 font-semibold">Statutory Remittances</span>
                  <div className="text-lg font-bold text-lime-800 dark:text-lime-400 font-mono">₦1,167,000</div>
                  <span className="text-[10px] text-lime-700 dark:text-lime-400">FIRS, LIRS & PenCom Filed</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-[#06112C] rounded-xl border border-slate-200 dark:border-blue-900/40 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-lime-400" />
                  <span>Verified by Lead Specialist Oluwaseun Adeleke</span>
                </div>
                <button
                  onClick={() => onNavigate('outsourcing-payroll')}
                  className="text-xs font-bold text-blue-700 dark:text-lime-400 hover:underline"
                >
                  View Full Run
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Pan-African Coverage Map Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#0A1E4A] via-[#0F2D6B] to-[#12398C] rounded-3xl p-8 sm:p-12 text-white shadow-2xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-lime-400">
                Multi-Country Scaling
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Built for Africa. Designed to Scale Globally.
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Operating in Lagos, Nairobi, Accra, or Johannesburg? NextSofthr centralizes multi-currency payouts, statutory social security, and health funds into one synchronized view.
              </p>
            </div>

            <button
              onClick={() => onNavigate('multi-country')}
              className="px-6 py-3.5 bg-lime-400 hover:bg-lime-300 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 shrink-0"
            >
              <span>Explore African Tax Engines</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Interactive Flags Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 pt-4 border-t border-white/10 text-xs">
            {[
              { flag: '🇳🇬', country: 'Nigeria', cur: 'NGN (₦)' },
              { flag: '🇬🇭', country: 'Ghana', cur: 'GHS (₵)' },
              { flag: '🇰🇪', country: 'Kenya', cur: 'KES (KSh)' },
              { flag: '🇿🇦', country: 'South Africa', cur: 'ZAR (R)' },
              { flag: '🇺🇬', country: 'Uganda', cur: 'UGX (USh)' },
              { flag: '🇹🇿', country: 'Tanzania', cur: 'TZS (TSh)' },
              { flag: '🇷🇼', country: 'Rwanda', cur: 'RWF (FRw)' },
              { flag: '🇿🇲', country: 'Zambia', cur: 'ZMW (K)' }
            ].map(c => (
              <div 
                key={c.country}
                onClick={() => onNavigate('multi-country')}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-xl border border-white/10 transition-colors cursor-pointer text-center space-y-1"
              >
                <div className="text-2xl">{c.flag}</div>
                <div className="font-bold text-white text-[11px] truncate">{c.country}</div>
                <div className="text-[10px] text-lime-300 font-mono">{c.cur}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Verified Client Success Stories & Social Proof (Section 28) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-12">
          <span className="text-xs font-bold text-blue-700 dark:text-lime-400 uppercase tracking-wider">Proven Impact</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Trusted by High-Growth African Leaders
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Discover how leading organizations transformed their HR and payroll operations with NextSofthr.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((cs, idx) => (
            <div key={idx} className="bg-white dark:bg-[#0B1A3D] rounded-2xl border border-slate-200 dark:border-blue-900/50 p-8 shadow-sm hover:shadow-xl dark:shadow-blue-950/40 transition-all space-y-5 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-700 dark:text-lime-400 uppercase tracking-wider">{cs.sector}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">{cs.country}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{cs.company}</h3>
                
                <div className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 pt-2">
                  <div><strong className="text-slate-900 dark:text-white">Challenge: </strong>{cs.challenge}</div>
                  <div><strong className="text-slate-900 dark:text-white">NextSofthr Solution: </strong>{cs.solution}</div>
                </div>
              </div>

              <div className="p-4 bg-lime-50/70 dark:bg-lime-950/40 border border-lime-200 dark:border-lime-900/50 rounded-xl text-xs font-semibold text-slate-900 dark:text-lime-200 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-lime-700 dark:text-lime-400 shrink-0 mt-0.5" />
                <span>Result: {cs.result}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Outsourcing Packages Teaser & Custom Configurator Trigger */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-lime-400">
            Tailored Quotation Engine
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to Configure Your Custom Outsourcing Package?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Answer 7 quick questions about your workforce size, entities, and service needs. Receive an illustrative operational proposal tailored to your enterprise.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenWizard}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-lime-400 to-[#9AE616] hover:from-lime-300 hover:to-lime-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Launch 7-Step Quotation Wizard</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
            <button
              onClick={() => onOpenLeadModal('Executive Proposal')}
              className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white font-medium text-sm rounded-xl transition-colors border border-white/20"
            >
              Request Custom Proposal
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
