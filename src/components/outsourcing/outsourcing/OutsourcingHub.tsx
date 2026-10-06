import React from 'react';
import { 
  CreditCard, 
  Users, 
  Briefcase, 
  Sparkles, 
  Layers, 
  Building2, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Globe2, 
  Zap,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { NavigationPage } from '../../types';

interface OutsourcingHubProps {
  onNavigate: (page: NavigationPage) => void;
  onOpenLeadModal: (service?: string) => void;
}

export const OutsourcingHub: React.FC<OutsourcingHubProps> = ({ onNavigate, onOpenLeadModal }) => {
  const serviceCards = [
    {
      id: 'outsourcing-payroll' as NavigationPage,
      title: 'Payroll Outsourcing',
      subtitle: 'Accurate, secure monthly payroll without administrative burden',
      description: 'End-to-end processing, allowances, bonuses, overtime, statutory PAYE, pension remittances, multi-currency payouts, and audit reconciliation.',
      icon: CreditCard,
      badge: 'Core Service',
      stats: '99.98% calculation accuracy',
      color: 'blue'
    },
    {
      id: 'outsourcing-hr-admin' as NavigationPage,
      title: 'HR Administration Outsourcing',
      subtitle: 'Focus on your people while we handle personnel files and policy workflows',
      description: 'Digital onboarding, personnel file management, official correspondence, leave approvals, attendance tracking, and workforce documentation.',
      icon: Users,
      badge: 'People Ops',
      stats: '100% digital onboarding',
      color: 'lime'
    },
    {
      id: 'outsourcing-managed-hr' as NavigationPage,
      title: 'Managed HR Services',
      subtitle: 'A complete HR team, powered by NextSofthr platform and specialists',
      description: 'Senior HR business partners, employee relations, disciplinary procedures, performance appraisals, workforce planning, and strategic guidance.',
      icon: Briefcase,
      badge: 'Dedicated Pod',
      stats: '1 dedicated HRBP assigned',
      color: 'purple'
    },
    {
      id: 'outsourcing-recruitment' as NavigationPage,
      title: 'Recruitment & Talent Outsourcing',
      subtitle: 'Find, screen, interview and onboard the right talent faster',
      description: 'Workforce planning, candidate sourcing, ATS candidate pipeline management, interview coordination, offer negotiation, and AI recruiter copilot.',
      icon: Sparkles,
      badge: 'Talent Sourcing',
      stats: '14-day average time-to-hire',
      color: 'amber'
    },
    {
      id: 'outsourcing-employee-admin' as NavigationPage,
      title: 'Employee Administration',
      subtitle: 'Centralized employee profiles and verified lifecycle records',
      description: 'Single source of truth for contracts, emergency contacts, qualifications, salary history, department allocations, and employee status tracking.',
      icon: Layers,
      badge: 'Data Integrity',
      stats: 'Zero misplaced records',
      color: 'emerald'
    },
    {
      id: 'multi-company' as NavigationPage,
      title: 'Enterprise Workforce Management',
      subtitle: 'Multi-entity corporate governance for parent companies and branches',
      description: 'Holding company consolidation, subsidiary segregation, multi-currency reporting, cross-border African payroll, and custom ERP integration.',
      icon: Building2,
      badge: 'Enterprise',
      stats: 'Multi-entity ready',
      color: 'indigo'
    }
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A1E4A] via-[#0F2D6B] to-[#0A1E4A] text-white pt-20 pb-24 px-4 sm:px-6 lg:px-8">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-500/20 blur-[130px] pointer-events-none rounded-full"></div>
        <div className="absolute top-1/3 right-10 w-[300px] h-[200px] bg-lime-400/15 blur-[100px] pointer-events-none rounded-full"></div>

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-lime-400 tracking-wide uppercase">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technology-Powered HR & Payroll Outsourcing Partner</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            “Your People. Our Expertise. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 via-lime-400 to-emerald-400">
              Smarter HR & Payroll.”
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Outsource critical HR and payroll operations to NextSofthr while keeping complete visibility and control through a modern, intelligent workforce management platform.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenLeadModal('Outsourcing Hub Consultation')}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-lime-400 to-[#9AE616] hover:from-lime-300 hover:to-lime-400 text-slate-950 font-bold text-base rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transform active:scale-95"
            >
              <span>Talk to an Outsourcing Expert</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('six-services-grid');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-7 py-3.5 bg-white/10 hover:bg-white/15 text-white font-medium text-base rounded-xl transition-colors border border-white/20 flex items-center justify-center gap-2"
            >
              <span>Explore Outsourcing Services</span>
            </button>
          </div>

          {/* Quick Credibility Stats */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto border-t border-white/10 text-left">
            <div className="p-3">
              <div className="text-2xl font-bold text-lime-400">99.98%</div>
              <div className="text-xs text-slate-300 mt-0.5">Payroll Processing Precision</div>
            </div>
            <div className="p-3">
              <div className="text-2xl font-bold text-lime-400">10+</div>
              <div className="text-xs text-slate-300 mt-0.5">African Tax Jurisdictions</div>
            </div>
            <div className="p-3">
              <div className="text-2xl font-bold text-lime-400">100%</div>
              <div className="text-xs text-slate-300 mt-0.5">Audit-Ready Reconciliations</div>
            </div>
            <div className="p-3">
              <div className="text-2xl font-bold text-lime-400">24/7</div>
              <div className="text-xs text-slate-300 mt-0.5">Real-Time Cloud Visibility</div>
            </div>
          </div>
        </div>
      </section>

      {/* The 6 Core Outsourcing Services */}
      <section id="six-services-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <div className="text-xs font-bold text-[#0F2D6B] dark:text-lime-400 uppercase tracking-wider">
            Comprehensive Service Ecosystem
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Six Specialized Outsourcing Service Lines
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Choose individual operational services or bundle them into an integrated enterprise solution tailored to your operational scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceCards.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={service.id}
                onClick={() => onNavigate(service.id)}
                className="group relative bg-white dark:bg-[#0B1A3D] rounded-2xl p-7 border border-slate-200 dark:border-blue-900/50 shadow-sm hover:shadow-xl dark:shadow-blue-950/40 hover:border-blue-300 dark:hover:border-lime-400 transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden"
              >
                {/* Top Corner Number & Subtle Accent */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-[#0F2D6B] dark:text-blue-300 flex items-center justify-center group-hover:bg-[#0F2D6B] dark:group-hover:bg-lime-400 group-hover:text-lime-300 dark:group-hover:text-slate-950 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold text-slate-400 font-mono">
                    0{index + 1}
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#0F2D6B] dark:group-hover:text-lime-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs font-medium text-blue-700 dark:text-blue-400">
                    {service.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-blue-900/40 flex items-center justify-between text-xs font-semibold text-[#0F2D6B] dark:text-lime-400 group-hover:text-blue-800 dark:group-hover:text-lime-300">
                  <span className="text-slate-500 dark:text-slate-400 font-normal">{service.stats}</span>
                  <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Explore Service <ArrowRight className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why Outsource to NextSofthr: Technology + Human Expertise */}
      <section className="bg-slate-100/70 dark:bg-[#07132F] py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200 dark:border-blue-950 transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-lime-400">
                The NextSofthr Difference
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Not Just a Software. Not Just an Agency. <br />
                <span className="text-[#0F2D6B] dark:text-blue-400">The Best of Both Worlds.</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Traditional outsourcing means losing control into a black box of emails and spreadsheets. Pure software leaves you to navigate complex African statutory tax brackets, penalties, and messy onboarding alone.
              </p>
              
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-lime-100 dark:bg-lime-950/70 text-lime-700 dark:text-lime-300 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Certified Human HR Specialists</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400">A dedicated senior HR business partner and payroll accountant who knows your team, company culture, and policies.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-lime-100 dark:bg-lime-950/70 text-lime-700 dark:text-lime-300 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Enterprise Cloud Platform Visibility</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Real-time web dashboards for clients, self-service portals for employees to download payslips, and approvals for line managers.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-lime-100 dark:bg-lime-950/70 text-lime-700 dark:text-lime-300 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Pan-African Regulatory Compliance</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Configured tax rules for Nigeria, Ghana, Kenya, South Africa, Rwanda, and beyond, supporting your compliance obligations.</p>
                  </div>
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={() => onOpenLeadModal('Strategic HR Partnership')}
                  className="px-6 py-3 bg-[#0F2D6B] dark:bg-blue-600 hover:bg-[#0A1E4A] dark:hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-all shadow-md flex items-center gap-2"
                >
                  <span>Schedule an Operations Scoping Call</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Visual Architecture Representation */}
            <div className="bg-white dark:bg-[#0B1A3D] rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-blue-900/50 shadow-xl space-y-6 transition-colors">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-blue-900/40">
                <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Operational Architecture</span>
                <span className="text-xs font-mono text-lime-700 dark:text-lime-300 font-semibold bg-lime-50 dark:bg-lime-950/60 border dark:border-lime-900/40 px-2 py-0.5 rounded">Always Synchronized</span>
              </div>

              {/* Flow boxes */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#06112C] border border-slate-200 dark:border-blue-900/40 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Input Layer</div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">Your Business & Employees</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Attendance, overtime, leave requests, salary changes</div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 flex items-center justify-center font-bold text-sm">
                    01
                  </div>
                </div>

                <div className="flex justify-center text-blue-600 dark:text-blue-400">
                  <ArrowRight className="w-5 h-5 rotate-90" />
                </div>

                <div className="p-4 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/40 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase">Processing & Advisory Engine</div>
                    <div className="text-sm font-bold text-[#0F2D6B] dark:text-blue-200">NextSofthr Certified HR & Payroll Pod</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">Gross-to-net calculations, statutory reviews, audit validation</div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#0F2D6B] text-lime-300 flex items-center justify-center font-bold text-sm">
                    02
                  </div>
                </div>

                <div className="flex justify-center text-blue-600 dark:text-blue-400">
                  <ArrowRight className="w-5 h-5 rotate-90" />
                </div>

                <div className="p-4 rounded-xl bg-lime-50/70 dark:bg-lime-950/30 border border-lime-300 dark:border-lime-900/40 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-lime-800 dark:text-lime-300 uppercase">Real-Time Delivery</div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">NextSofthr Cloud Platform & Portals</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">One-click client approvals, employee payslips, statutory filing packs</div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-lime-400 text-slate-950 flex items-center justify-center font-bold text-sm">
                    03
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
