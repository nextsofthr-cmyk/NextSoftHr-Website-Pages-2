import { Shield, Headphones, Briefcase, Award, CheckCircle2, ArrowRight, PhoneCall, Sparkles } from 'lucide-react';
import { OUTSOURCING_SERVICES_LIST, CONSULTING_SERVICES_LIST } from '../data/mockData';

interface OutsourcingConsultingProps {
  onOpenExpert: () => void;
  onOpenDemo: () => void;
}

export const OutsourcingConsultingSection = ({ onOpenExpert, onOpenDemo }: OutsourcingConsultingProps) => {
  return (
    <section id="services" className="py-20 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-lime-100 dark:bg-lime-950/80 text-lime-800 dark:text-lime-300 border border-lime-300 dark:border-lime-800 uppercase tracking-wider mb-3 inline-block">
            Software + Managed Services & Advisory
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            More Than Software. A Trusted Strategic Partner.
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg mt-3 leading-relaxed">
            Whether you need fully managed payroll outsourcing or bespoke organizational restructuring consulting, our certified global HR practitioners act as an extension of your leadership team.
          </p>
        </div>

        {/* 2 Big Column Cards: Managed Outsourcing vs Strategic Consulting */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
          
          {/* Card 1: Managed Payroll & HR Outsourcing */}
          <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 flex flex-col justify-between hover:border-blue-300 dark:hover:border-blue-700 transition-all group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">
                  Managed HR & Payroll Services
                </span>
                <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center">
                  <Headphones className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
                Focus on Your Business. Let Us Handle HR & Payroll.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                Offload complex calculations, multi-country tax filings, pension disbursements, and worker inquiries to dedicated NextSofthr account specialists.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {OUTSOURCING_SERVICES_LIST.map((srv, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800/80 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span className="font-medium text-[11px]">{srv}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <Shield className="w-4 h-4 text-lime-600 dark:text-lime-400" />
                <span>100% Tax Indemnity Guarantee</span>
              </div>
              <button
                onClick={onOpenExpert}
                className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <span>Request Outsourcing Proposal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: Strategic HR & Organizational Consulting */}
          <div className="bg-slate-900 dark:bg-slate-900/90 text-white rounded-3xl border border-slate-800 p-6 sm:p-8 flex flex-col justify-between hover:border-lime-400/60 transition-all relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-lime-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-lime-400 uppercase tracking-wider">
                  Strategic Human Capital Advisory
                </span>
                <div className="w-10 h-10 rounded-2xl bg-lime-400 text-slate-950 flex items-center justify-center font-bold">
                  <Award className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-2xl font-extrabold text-white mb-2">
                Expert Advice for Your People & Organization.
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                Partner with senior HR strategists to engineer competitive compensation frameworks, design compliant employee handbooks, and optimize workforce productivity.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {CONSULTING_SERVICES_LIST.map((srv, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-slate-200 bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/80">
                    <Sparkles className="w-3.5 h-3.5 text-lime-400 shrink-0" />
                    <span className="font-medium text-[11px]">{srv}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <PhoneCall className="w-4 h-4 text-lime-400" />
                <span>Confidential Executive Advisory</span>
              </div>
              <button
                id="consulting-expert-btn"
                onClick={onOpenExpert}
                className="w-full sm:w-auto px-5 py-2.5 bg-lime-400 hover:bg-lime-300 text-slate-950 font-bold text-xs rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <span>Talk to an HR & Payroll Expert</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
