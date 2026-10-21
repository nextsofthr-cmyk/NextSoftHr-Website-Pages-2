import React, { useState } from 'react';
import { 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  UserPlus, 
  UserCheck, 
  Award, 
  HeartHandshake, 
  LogOut,
  FolderOpen,
  MailCheck,
  CalendarCheck,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { NavigationPage } from '../../types';
import { SolutionNavigationFooter } from '../layout/SolutionNavigationFooter';

interface HRAdministrationProps {
  onOpenLeadModal: (service?: string) => void;
  onNavigate?: (page: NavigationPage) => void;
  onBack?: () => void;
}

export const HRAdministration: React.FC<HRAdministrationProps> = ({ 
  onOpenLeadModal,
  onNavigate,
  onBack
}) => {
  const [activeStage, setActiveStage] = useState<'recruit' | 'onboard' | 'manage' | 'develop' | 'retain' | 'offboard'>('onboard');

  const lifecycleStages = [
    {
      id: 'recruit' as const,
      name: 'Recruit',
      icon: UserPlus,
      summary: 'Candidate sourcing, screening, background checks & job offers',
      tasks: [
        'Job description drafting & requisition sign-offs',
        'Applicant CV parsing & candidate shortlisting',
        'Reference & academic credential verification',
        'Digital offer letters with e-signature tracking'
      ],
      documents: ['Offer Letter Template', 'Candidate Evaluation Rubric', 'KYC Consent Form'],
      nextsoftBenefit: 'Cut recruitment cycle time by 40% with automated screening workflows.'
    },
    {
      id: 'onboard' as const,
      name: 'Onboard',
      icon: UserCheck,
      summary: 'Day-one readiness, digital document collection & compliance setup',
      tasks: [
        'Digital personnel file creation in NextSofthr platform',
        'Statutory ID capture (NIN, SSNIT, KRA PIN, Tax ID, Pension PIN)',
        'Company handbook & code of conduct acknowledgment',
        'Emergency contact & next-of-kin documentation verification'
      ],
      documents: ['Employment Contract', 'Confidentiality NDA', 'Direct Deposit Form', 'Employee Handbook'],
      nextsoftBenefit: 'New hires onboard themselves digitally before day one without paperwork friction.'
    },
    {
      id: 'manage' as const,
      name: 'Manage',
      icon: CalendarCheck,
      summary: 'Daily workforce operations, attendance, leave & HR correspondence',
      tasks: [
        'Leave requests & statutory maternity/paternity tracking',
        'Time & attendance record reconciliation for payroll',
        'Issuance of official HR letters (visa, bank, promotions)',
        'Employee grievance logging & policy guidance'
      ],
      documents: ['Leave Policy Guide', 'Standard HR Request Templates', 'Attendance Exception Log'],
      nextsoftBenefit: 'Direct manager self-service relieves leadership of repetitive clerical tickets.'
    },
    {
      id: 'develop' as const,
      name: 'Develop',
      icon: Award,
      summary: 'Performance appraisals, training documentation & skill tracking',
      tasks: [
        'Probation period review reminders (90 & 180 days)',
        'Annual & quarterly KPI appraisal distribution',
        'Training certification records & skills registry',
        'Internal mobility & role transition documentation'
      ],
      documents: ['Performance Appraisal Form', 'Probation Sign-Off Template', 'Training Log'],
      nextsoftBenefit: 'Clear performance milestones tied directly to salary review schedules.'
    },
    {
      id: 'retain' as const,
      name: 'Retain',
      icon: HeartHandshake,
      summary: 'Employee engagement, compensation reviews & wellness benefits',
      tasks: [
        'Quarterly pulse engagement survey administration',
        'Benefits & HMO health insurance administration',
        'Work anniversary & milestone recognitions',
        'Workforce retention analytics & turnover risk tracking'
      ],
      documents: ['Benefits Guide', 'Engagement Survey Questionnaire', 'Salary Review Notice'],
      nextsoftBenefit: 'Proactive turnover signals help management address dissatisfaction early.'
    },
    {
      id: 'offboard' as const,
      name: 'Offboard',
      icon: LogOut,
      summary: 'Compliant exit workflows, asset recovery & final entitlements',
      tasks: [
        'Resignation or termination notice period tracking',
        'Final salary, leave encashment & gratuity calculation',
        'IT asset return & company property sign-off',
        'Comprehensive exit interview administration & report'
      ],
      documents: ['Exit Clearance Form', 'Final Settlement Voucher', 'Experience Certificate'],
      nextsoftBenefit: 'Protects the enterprise from legal claims and statutory severance disputes.'
    }
  ];

  const currentLifecycle = lifecycleStages.find(s => s.id === activeStage)!;

  const hrAdminServices = [
    'Employee records & personnel files',
    'Employee documentation archiving',
    'Onboarding administration',
    'Offboarding & exit administration',
    'Leave policy administration',
    'Attendance administration',
    'Employee HR requests processing',
    'Official HR correspondence & letters',
    'Employee master data management',
    'Company policy administration',
    'Quarterly HR metrics reporting',
    'Workforce compliance documentation',
    'Dedicated employee support desk'
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#0A1E4A] via-[#0F2D6B] to-[#0A1E4A] text-white pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-lime-400 uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            <span>Operational People Operations</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            “Outsource HR Administration. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 to-emerald-400">
              Focus on Your People and Growth.”
            </span>
          </h1>

          <p className="text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Free your leadership from the endless cycle of contracts, leave reconciliations, employee letters, and filing cabinets. NextSofthr handles the operational heavy lifting with cloud precision and human care.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenLeadModal('HR Administration Outsourcing')}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-lime-400 to-[#9AE616] hover:from-lime-300 hover:to-lime-400 text-slate-950 font-bold text-base rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <span>Outsource HR Administration</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Employee Lifecycle: Recruit -> Onboard -> Manage -> Develop -> Retain -> Offboard */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Complete Employee Journey</span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Interactive Employee Lifecycle Administration
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto">
            Click through each phase below to see how NextSofthr manages documentation, approvals, and compliance from hiring to retirement.
          </p>
        </div>

        {/* Lifecycle Stage Switcher Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 p-1.5 bg-slate-100/80 rounded-2xl border border-slate-200 mb-8">
          {lifecycleStages.map((stage) => {
            const Icon = stage.icon;
            const isActive = activeStage === stage.id;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStage(stage.id)}
                className={`py-3 px-3 rounded-xl text-left transition-all flex flex-col items-center sm:items-start gap-1.5 ${
                  isActive 
                    ? 'bg-white shadow-md text-[#0F2D6B] font-bold border-b-2 border-lime-500' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 font-medium'
                }`}
              >
                <div className={`p-2 rounded-lg ${isActive ? 'bg-blue-50 text-[#0F2D6B]' : 'bg-slate-200/60 text-slate-600'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-xs sm:text-sm">{stage.name}</div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Panel */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-lime-600 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-lime-500"></span>
                Phase: {currentLifecycle.name} Lifecycle Operations
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">
                {currentLifecycle.name} Management
              </h3>
              <p className="text-sm text-slate-600 mt-0.5">{currentLifecycle.summary}</p>
            </div>

            <button
              onClick={() => onOpenLeadModal(`HR Admin - ${currentLifecycle.name}`)}
              className="px-4 py-2.5 bg-blue-50 hover:bg-blue-100 text-[#0F2D6B] font-semibold text-xs rounded-xl transition-colors shrink-0"
            >
              Get Checklist for {currentLifecycle.name}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Core Admin Tasks */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>NextSofthr Operational Responsibilities</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {currentLifecycle.tasks.map((task, i) => (
                  <div key={i} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0F2D6B] shrink-0 mt-1.5"></span>
                    <span>{task}</span>
                  </div>
                ))}
              </div>

              {/* NextSofthr Value Proposition */}
              <div className="p-4 bg-lime-50/70 border border-lime-200 rounded-xl mt-4 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-lime-700 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-900">NextSofthr Outsourcing Advantage</div>
                  <div className="text-xs text-slate-700 mt-0.5">{currentLifecycle.nextsoftBenefit}</div>
                </div>
              </div>
            </div>

            {/* Standard Documents & Templates Managed */}
            <div className="bg-slate-50/80 p-5 rounded-xl border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Managed Documentation</span>
              </h4>
              <p className="text-xs text-slate-500">
                All templates drafted, updated according to local labor laws, and signed electronically.
              </p>
              <div className="space-y-2 pt-2">
                {currentLifecycle.documents.map((doc, idx) => (
                  <div key={idx} className="p-2.5 bg-white rounded-lg border border-slate-200 text-xs font-medium text-slate-800 flex items-center justify-between">
                    <span className="truncate">{doc}</span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-mono">Digital</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scope of HR Administration Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-10 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-lime-400 uppercase tracking-wider">Deliverables</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Complete Scope of HR Administration Outsourcing
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
              Our specialists run every facet of everyday personnel administration with zero overhead for your business.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {hrAdminServices.map((service) => (
              <div key={service} className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3 text-xs font-medium text-slate-200">
                <div className="w-4 h-4 rounded-full bg-lime-400 text-slate-950 flex items-center justify-center shrink-0 text-[10px] font-bold">
                  ✓
                </div>
                <span>{service}</span>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => onOpenLeadModal('HR Admin Proposal')}
              className="px-8 py-3.5 bg-lime-400 hover:bg-lime-300 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Request HR Administration Proposal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Explore Other Outsourcing Solutions & Return Home */}
      {onNavigate && (
        <SolutionNavigationFooter
          currentSolutionId="outsourcing-hr-admin"
          onNavigate={onNavigate}
          onOpenLeadModal={onOpenLeadModal}
        />
      )}
    </div>
  );
};
