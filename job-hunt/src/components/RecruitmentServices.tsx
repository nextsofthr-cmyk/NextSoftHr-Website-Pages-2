import React from 'react';
import { 
  LayoutGrid, 
  Briefcase, 
  Award, 
  Layers, 
  Users2, 
  Workflow, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';
import { RecruitmentService } from '../types';

interface RecruitmentServicesProps {
  services: RecruitmentService[];
  onRequestService: (serviceId: string) => void;
}

export const RecruitmentServices: React.FC<RecruitmentServicesProps> = ({
  services,
  onRequestService
}) => {
  const getServiceIcon = (name: string) => {
    const props = { className: 'w-6 h-6' };
    switch (name) {
      case 'LayoutGrid': return <LayoutGrid {...props} />;
      case 'Briefcase': return <Briefcase {...props} />;
      case 'Award': return <Award {...props} />;
      case 'Layers': return <Layers {...props} />;
      case 'Users2': return <Users2 {...props} />;
      case 'Workflow': return <Workflow {...props} />;
      default: return <Briefcase {...props} />;
    }
  };

  return (
    <section id="services" className="py-24 bg-white dark:bg-[#0B1120] border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-lime-950/40 border border-teal-200/60 dark:border-lime-400/30 text-[#0F9D8A] dark:text-lime-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Recruitment & Talent Solutions</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#142B4A] dark:text-white tracking-tight" style={{ textWrap: 'balance' }}>
            More Than a Job Board. <br />
            <span className="text-[#2563EB] dark:text-blue-400">Your Complete Recruitment Partner.</span>
          </h2>
          
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
            Whether you need to fill one critical position, outsource your recruitment process, or build a workforce at scale, NextSoftHR connects you with the technology and professional support to move forward.
          </p>
        </div>

        {/* 6 Service Cards Bento / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv) => (
            <div
              key={srv.id}
              className="bg-slate-50/70 dark:bg-[#0F172A] hover:bg-white dark:hover:bg-[#131D31] rounded-2xl p-7 border border-slate-200/80 dark:border-slate-800 hover:border-blue-300 dark:hover:border-lime-400/40 hover:shadow-xl dark:hover:shadow-black/60 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header: Service Code + Badge */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#131D31] border border-slate-200/80 dark:border-slate-700 group-hover:bg-[#142B4A] dark:group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center text-[#142B4A] dark:text-blue-400 transition-all shadow-xs">
                    {getServiceIcon(srv.iconName)}
                  </div>
                  {srv.badge && (
                    <span className="text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-md bg-white dark:bg-[#131D31] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                      {srv.badge}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-mono font-bold text-[#2563EB] dark:text-lime-400">
                    Service {srv.code}
                  </span>
                  <h3 className="text-lg font-bold text-[#142B4A] dark:text-white group-hover:text-[#2563EB] dark:group-hover:text-blue-400 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {srv.subtitle}
                  </p>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 italic mt-2.5 pb-3 border-b border-slate-200/70 dark:border-slate-800">
                  Ideal for: {srv.targetAudience}
                </p>

                {/* Deliverables List */}
                <div className="mt-4 space-y-2">
                  {srv.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300 leading-snug">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0F9D8A] dark:text-lime-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-4 border-t border-slate-200/70 dark:border-slate-800">
                <button
                  onClick={() => onRequestService(srv.id)}
                  className="w-full py-2.5 px-4 bg-white dark:bg-[#131D31] group-hover:bg-[#142B4A] dark:group-hover:bg-blue-600 text-slate-800 dark:text-slate-200 group-hover:text-white border border-slate-200 dark:border-slate-700 group-hover:border-[#142B4A] dark:group-hover:border-blue-600 text-xs sm:text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <span>{srv.ctaLabel}</span>
                  <ArrowRight className="w-4 h-4 text-[#2563EB] dark:text-lime-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Clear Distinction Banner */}
        <div className="mt-14 p-5 rounded-2xl bg-blue-50/70 dark:bg-[#0F172A] border border-blue-200/70 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors duration-300">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 dark:bg-lime-400 text-white dark:text-slate-950 flex items-center justify-center shrink-0 font-bold">
              ℹ
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">Distinguishing Software vs. Human-Delivered Services</p>
              <p className="text-slate-600 dark:text-slate-400">Software ATS features provide self-service tooling. RPO, Executive Search, and Contract Staffing are high-touch consultative engagements with dedicated recruitment specialists.</p>
            </div>
          </div>
          <button
            onClick={() => onRequestService('srv-b')}
            className="px-4 py-2 bg-[#142B4A] dark:bg-blue-600 text-white rounded-lg font-semibold whitespace-nowrap hover:bg-[#1E3A5F] dark:hover:bg-blue-500 transition-colors shrink-0 cursor-pointer"
          >
            Schedule Briefing Call
          </button>
        </div>

      </div>
    </section>
  );
};
