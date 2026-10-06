import React from 'react';
import { 
  Users, 
  CreditCard, 
  Rocket, 
  Calculator, 
  Briefcase, 
  Building, 
  Layers, 
  Cpu, 
  GraduationCap, 
  Workflow, 
  Sliders, 
  Headphones,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { SERVICE_CATEGORIES } from '../data/countries';

interface PartnersByServiceProps {
  onSelectService: (serviceName: string) => void;
}

export const PartnersByService: React.FC<PartnersByServiceProps> = ({ onSelectService }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Users': return <Users className="w-5 h-5 text-blue-900 dark:text-[#c8f526]" />;
      case 'CreditCard': return <CreditCard className="w-5 h-5 text-blue-900 dark:text-[#c8f526]" />;
      case 'Rocket': return <Rocket className="w-5 h-5 text-blue-900 dark:text-[#c8f526]" />;
      case 'Calculator': return <Calculator className="w-5 h-5 text-blue-900 dark:text-[#c8f526]" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-blue-900 dark:text-[#c8f526]" />;
      case 'Building': return <Building className="w-5 h-5 text-blue-900 dark:text-[#c8f526]" />;
      case 'Layers': return <Layers className="w-5 h-5 text-blue-900 dark:text-[#c8f526]" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-blue-900 dark:text-[#c8f526]" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-blue-900 dark:text-[#c8f526]" />;
      case 'Workflow': return <Workflow className="w-5 h-5 text-blue-900 dark:text-[#c8f526]" />;
      case 'Sliders': return <Sliders className="w-5 h-5 text-blue-900 dark:text-[#c8f526]" />;
      case 'Headphones': return <Headphones className="w-5 h-5 text-blue-900 dark:text-[#c8f526]" />;
      default: return <Sparkles className="w-5 h-5 text-blue-900 dark:text-[#c8f526]" />;
    }
  };

  const handleServiceClick = (name: string) => {
    onSelectService(name);
    const el = document.getElementById('directory');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-16 md:py-24 bg-white dark:bg-[#061124] border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c8f526]/30 dark:bg-[#c8f526]/20 border border-[#c8f526] text-[#0c2b64] dark:text-[#c8f526] text-xs font-black uppercase tracking-wider mb-3">
            <Workflow className="w-3.5 h-3.5" />
            <span>SPECIALIZED CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0c2b64] dark:text-white tracking-tight">
            Find Partners by Expertise
          </h2>
          <p className="mt-3 text-xs sm:text-base text-slate-600 dark:text-slate-400">
            From complete enterprise ERP integrations and payroll compliance audits to shift scheduling setups, discover specialists tailored to your specific organizational needs.
          </p>
        </div>

        {/* 12 Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {SERVICE_CATEGORIES.map((service) => (
            <div
              key={service.id}
              onClick={() => handleServiceClick(service.title)}
              className="p-5 rounded-2xl bg-slate-50 dark:bg-[#0a1c3b] hover:bg-white dark:hover:bg-[#0c234b] border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#061227] border border-slate-200 dark:border-slate-700 group-hover:bg-[#c8f526] group-hover:border-[#b5e01b] flex items-center justify-center mb-3.5 shadow-xs transition-colors">
                  {getIcon(service.icon)}
                </div>

                <h3 className="text-sm font-bold text-[#0c2b64] dark:text-white group-hover:text-blue-700 dark:group-hover:text-[#c8f526] transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-blue-900 dark:text-[#c8f526] group-hover:text-blue-600 dark:group-hover:text-lime-300">
                <span>Find Partners</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
