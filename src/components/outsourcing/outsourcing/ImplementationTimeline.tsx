import React, { useState } from 'react';
import { 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Users, 
  FileCheck, 
  Database, 
  TestTube, 
  GraduationCap, 
  Rocket, 
  Headphones
} from 'lucide-react';

interface ImplementationTimelineProps {
  onOpenLeadModal: (service?: string) => void;
}

export const ImplementationTimeline: React.FC<ImplementationTimelineProps> = ({ onOpenLeadModal }) => {
  const [activePhase, setActivePhase] = useState(1);

  const phases = [
    {
      num: 1,
      title: 'Discovery & Requirements',
      duration: 'Week 1',
      icon: Users,
      summary: 'Stakeholder interviews, payroll policy review, entity structures & compliance objectives.',
      deliverables: ['Scoping Document', 'Statutory Authority Mapping', 'Entity Access Matrix']
    },
    {
      num: 2,
      title: 'Process Mapping',
      duration: 'Week 2',
      icon: FileCheck,
      summary: 'Mapping current approval chains, leave policies, overtime thresholds, and salary cycles.',
      deliverables: ['Standard Operating Procedure (SOP)', 'Workflow Approval Blueprint']
    },
    {
      num: 3,
      title: 'System Configuration',
      duration: 'Week 3',
      icon: Calendar,
      summary: 'Configuring NextSofthr cloud platform: tax bands, pension rates, branches & cost centers.',
      deliverables: ['Configured Cloud Tenant', 'Role Permission Schemes', 'Custom Letter Templates']
    },
    {
      num: 4,
      title: 'Data Migration',
      duration: 'Week 4',
      icon: Database,
      summary: 'Extracting historical employee records, leave balances, bank accounts & tax IDs into master schema.',
      deliverables: ['Data Validation Report', 'Discrepancy Resolution Log', 'Verified Master Files']
    },
    {
      num: 5,
      title: 'Testing & Parallel Run',
      duration: 'Week 5',
      icon: TestTube,
      summary: 'Simulated parallel payroll run compared penny-for-penny against historical payroll registers.',
      deliverables: ['Parallel Run Audit Certificate', 'Gross-to-Net Variance Sheet (0.00% Variance)']
    },
    {
      num: 6,
      title: 'User Training',
      duration: 'Week 6',
      icon: GraduationCap,
      summary: 'Live interactive training for HR admins, line managers on MSS, and employees on ESS payslip app.',
      deliverables: ['Video Walkthrough Guides', 'Quick Reference Cards', 'Manager Sign-Off Protocols']
    },
    {
      num: 7,
      title: 'Go-Live',
      duration: 'Cutover Day',
      icon: Rocket,
      summary: 'Official transition to NextSofthr outsourcing team. First live payroll processed with executive oversight.',
      deliverables: ['Live Payroll Run', 'Statutory Schedule Generation', 'Bank Payment Confirmation']
    },
    {
      num: 8,
      title: 'Ongoing Support & Optimization',
      duration: 'Continuous',
      icon: Headphones,
      summary: 'Monthly dedicated account management, regular labor law updates, and ongoing platform enhancements.',
      deliverables: ['Dedicated Specialist Pod', 'Monthly SLA Review', 'Quarterly Workforce Analytics']
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0A1E4A] via-[#0F2D6B] to-[#0A1E4A] text-white pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-lime-400 uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5" />
            <span>Structured Onboarding Methodology</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            “Outsourcing Implementation”
          </h1>

          <p className="text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Our structured 8-phase onboarding framework guarantees a seamless transition with zero disruption to employee paychecks, complete data integrity, and verified statutory compliance.
          </p>
        </div>
      </section>

      {/* 8-Phase Timeline (Horizontal on Desktop, Vertical on Mobile) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Predictable 8-Phase Roadmap</span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            From Scoping to Parallel Run & Go-Live
          </h2>
        </div>

        {/* Desktop Horizontal Stepper */}
        <div className="hidden lg:grid grid-cols-8 gap-2 bg-white rounded-2xl border border-slate-200 p-4 shadow-md mb-8">
          {phases.map((p) => {
            const isActive = activePhase === p.num;
            return (
              <button
                key={p.num}
                onClick={() => setActivePhase(p.num)}
                className={`p-3 rounded-xl text-left transition-all flex flex-col justify-between h-32 border ${
                  isActive
                    ? 'bg-blue-50/80 border-blue-600 shadow-sm'
                    : 'bg-slate-50/60 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    isActive ? 'bg-[#0F2D6B] text-lime-300' : 'bg-slate-200 text-slate-700'
                  }`}>
                    P0{p.num}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">{p.duration}</span>
                </div>
                <div className="text-xs font-bold text-slate-900 leading-tight">
                  {p.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Phase Detailed Callout */}
        {(() => {
          const current = phases.find(p => p.num === activePhase) || phases[0];
          const Icon = current.icon;
          return (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0F2D6B] flex items-center justify-center font-bold">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-lime-600 uppercase">Phase 0{current.num} · {current.duration}</div>
                    <h3 className="text-2xl font-bold text-slate-900">{current.title}</h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    disabled={activePhase === 1}
                    onClick={() => setActivePhase(prev => prev - 1)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-xs font-semibold rounded-lg"
                  >
                    Previous Phase
                  </button>
                  <button
                    disabled={activePhase === 8}
                    onClick={() => setActivePhase(prev => prev + 1)}
                    className="px-3 py-1.5 bg-[#0F2D6B] hover:bg-[#0A1E4A] disabled:opacity-40 text-white text-xs font-semibold rounded-lg"
                  >
                    Next Phase
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wider text-blue-700">
                    Phase Objectives & Activities
                  </h4>
                  <p className="text-slate-600 leading-relaxed text-sm">{current.summary}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wider text-blue-700">
                    Key Deliverables & Sign-Offs
                  </h4>
                  <div className="space-y-1.5">
                    {current.deliverables.map((item, i) => (
                      <div key={i} className="p-2 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-2 text-xs font-medium text-slate-800">
                        <CheckCircle2 className="w-3.5 h-3.5 text-lime-600 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Mobile Vertical Stepper */}
        <div className="lg:hidden space-y-3 mt-6">
          <h4 className="text-xs font-bold text-slate-900 uppercase">All 8 Implementation Phases</h4>
          {phases.map((p) => (
            <div 
              key={p.num} 
              onClick={() => setActivePhase(p.num)}
              className={`p-4 rounded-xl border text-xs cursor-pointer ${
                activePhase === p.num ? 'bg-blue-50 border-blue-600 font-bold' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex justify-between items-center">
                <span>Phase 0{p.num}: {p.title}</span>
                <span className="text-slate-500 font-mono text-[10px]">{p.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
