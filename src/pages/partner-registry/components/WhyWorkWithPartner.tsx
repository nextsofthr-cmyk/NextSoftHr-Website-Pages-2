import React from 'react';
import { 
  MapPin, 
  Rocket, 
  Users, 
  Workflow, 
  Layers, 
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { WHY_WORK_WITH_PARTNER } from '../data/content';

interface WhyWorkWithPartnerProps {
  onFindPartnerClick: () => void;
}

export const WhyWorkWithPartner: React.FC<WhyWorkWithPartnerProps> = ({ onFindPartnerClick }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'MapPin': return <MapPin className="w-6 h-6 text-[#0c2b64] dark:text-[#c8f526]" />;
      case 'Rocket': return <Rocket className="w-6 h-6 text-[#0c2b64] dark:text-[#c8f526]" />;
      case 'Users': return <Users className="w-6 h-6 text-[#0c2b64] dark:text-[#c8f526]" />;
      case 'Workflow': return <Workflow className="w-6 h-6 text-[#0c2b64] dark:text-[#c8f526]" />;
      case 'Layers': return <Layers className="w-6 h-6 text-[#0c2b64] dark:text-[#c8f526]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-[#0c2b64] dark:text-[#c8f526]" />;
      default: return <CheckCircle2 className="w-6 h-6 text-[#0c2b64] dark:text-[#c8f526]" />;
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#f8fafc] dark:bg-[#061124] border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-[#0c2b64] dark:text-[#c8f526] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-700 dark:text-[#c8f526]" />
            <span>VALUE OF CERTIFIED EXPERTISE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0c2b64] dark:text-white tracking-tight">
            Why Work With a NextSofthr Partner?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Maximizing the ROI of your HR and payroll technology begins with seasoned local professionals who understand your specific tax codes, workforce culture, and business systems.
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_WORK_WITH_PARTNER.map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#0a1c3b] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-[#0c234b] border border-blue-200 dark:border-blue-800 flex items-center justify-center mb-4 group-hover:scale-105 group-hover:bg-[#c8f526]/20 group-hover:border-[#c8f526] transition-all">
                  {getIcon(item.icon)}
                </div>
                
                <h3 className="text-lg font-bold text-[#0c2b64] dark:text-white tracking-tight">
                  {item.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-blue-800 dark:text-[#c8f526] font-semibold">
                <span>Certified NextSofthr Delivery</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#c8f526]"></span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-12 text-center">
          <button
            onClick={onFindPartnerClick}
            className="px-6 py-3 rounded-xl bg-[#0c2b64] hover:bg-blue-800 dark:bg-blue-900/80 dark:hover:bg-blue-800 text-white font-bold text-xs sm:text-sm shadow-md transition-colors"
          >
            Find a Certified Partner in Your City
          </button>
        </div>

      </div>
    </section>
  );
};
