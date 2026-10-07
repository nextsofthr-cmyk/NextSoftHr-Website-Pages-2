import React, { useState } from 'react';
import {
  Users,
  CreditCard,
  Clock,
  CalendarDays,
  CalendarCheck,
  TrendingUp,
  UserPlus,
  Smartphone,
  Briefcase,
  Sparkles,
  BarChart3,
  Headphones,
  ArrowRight,
  Check,
  Search,
} from 'lucide-react';
import { ServiceItem } from '../types';
import { SERVICES_LIST } from '../data/servicesData';

interface ServicesGridProps {
  onSelectService: (service: ServiceItem) => void;
}

// Map service numbers to Lucide icons
const iconMap: Record<string, React.FC<{ className?: string }>> = {
  '01': Users,
  '02': CreditCard,
  '03': Clock,
  '04': CalendarDays,
  '05': CalendarCheck,
  '06': TrendingUp,
  '07': UserPlus,
  '08': Smartphone,
  '09': Briefcase,
  '10': Sparkles,
  '11': BarChart3,
  '12': Headphones,
};

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onSelectService }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All 12 Services' },
    { id: 'core-hr', label: 'Core HR & People' },
    { id: 'payroll', label: 'Payroll & Taxes' },
    { id: 'workforce', label: 'Workforce & Shifts' },
    { id: 'growth-ai', label: 'AI, Growth & Analytics' },
  ];

  const filteredServices = SERVICES_LIST.filter((service) => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.features.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="services" className="py-20 bg-white dark:bg-[#07182E] relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Section 7: Services Introduction) */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/80 text-[#0256C4] dark:text-[#84CC16] text-xs font-extrabold uppercase tracking-widest border border-blue-100 dark:border-blue-800 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16]" />
            OUR SERVICES
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2540] dark:text-white tracking-tight mb-4">
            Everything You Need to Run a Modern Workforce
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            From employee management and payroll to attendance, leave, performance and business administration,
            NextSofthr brings essential workforce services together in one powerful platform.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12 bg-slate-50 dark:bg-[#0A2540] p-3 sm:p-4 rounded-2xl border border-slate-200/80 dark:border-blue-900/60">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  selectedCategory === category.id
                    ? 'bg-[#0256C4] text-white shadow-md shadow-blue-500/20'
                    : 'bg-white dark:bg-[#0D2644] text-slate-700 dark:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-blue-900/50 border border-slate-200/60 dark:border-blue-800'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services, features..."
              className="w-full pl-10 pr-4 py-2 rounded-xl text-xs sm:text-sm bg-white dark:bg-[#0D2644] border border-slate-200 dark:border-blue-800 focus:outline-none focus:ring-2 focus:ring-[#0256C4] focus:border-transparent text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Services Grid (Section 8: 3-column responsive layout inspired by Timido Style 03) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => {
            const IconComp = iconMap[service.number] || Users;

            return (
              <div
                key={service.id}
                className="group relative bg-[#F8FAFC] dark:bg-[#0A2540] hover:bg-white dark:hover:bg-[#0D2644] rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-blue-900/60 hover:border-[#0256C4]/30 dark:hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top header row: Number and Icon */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    {/* Big Number badge like Timido reference */}
                    <div className="flex items-center gap-2">
                      <span className="text-2xl sm:text-3xl font-black font-mono text-slate-300 dark:text-blue-950 group-hover:text-[#0256C4] dark:group-hover:text-blue-400 transition-colors">
                        {service.number}
                      </span>
                      {service.badge && (
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950 text-[#0256C4] dark:text-[#84CC16] border border-blue-100 dark:border-blue-800 group-hover:bg-[#84CC16]/20 group-hover:text-[#0A2540] dark:group-hover:text-[#84CC16] transition-colors">
                          {service.badge}
                        </span>
                      )}
                    </div>

                    {/* Service Icon inside rounded square */}
                    <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#07182E] group-hover:bg-[#0256C4] text-[#0256C4] dark:text-blue-300 group-hover:text-white border border-slate-200 dark:border-blue-800 group-hover:border-transparent shadow-xs flex items-center justify-center transition-all duration-200 group-hover:scale-105">
                      <IconComp className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-bold text-[#0A2540] dark:text-white group-hover:text-[#0256C4] dark:group-hover:text-[#84CC16] transition-colors mb-1.5">
                    {service.title}
                  </h3>
                  <div className="text-xs font-semibold text-[#84CC16] mb-3">
                    {service.subtitle}
                  </div>

                  {/* Short Description */}
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 line-clamp-3">
                    {service.description}
                  </p>

                  {/* Feature Bullets (clean checklist with custom checkmark) */}
                  <div className="space-y-2 mb-6 pt-4 border-t border-slate-200/60 dark:border-blue-900/60">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Key Capabilities:
                    </div>
                    {service.features.slice(0, 5).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-200">
                        <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                    {service.features.length > 5 && (
                      <div className="text-[11px] text-[#0256C4] dark:text-[#84CC16] font-semibold pl-6">
                        + {service.features.length - 5} more features included
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Card CTA */}
                <div className="pt-4 border-t border-slate-200/60 dark:border-blue-900/60 mt-auto">
                  <button
                    onClick={() => onSelectService(service)}
                    className="w-full inline-flex items-center justify-between text-sm font-bold text-[#0256C4] dark:text-blue-300 group-hover:text-[#0A2540] dark:group-hover:text-white py-2 px-3 rounded-xl group-hover:bg-blue-50/80 dark:group-hover:bg-blue-900/50 transition-all duration-200 cursor-pointer"
                  >
                    <span>{service.ctaText}</span>
                    <div className="w-7 h-7 rounded-lg bg-blue-100/70 dark:bg-blue-900/60 group-hover:bg-[#84CC16] text-[#0256C4] dark:text-blue-300 group-hover:text-[#0A2540] flex items-center justify-center transition-colors">
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom helper callout */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-900 to-[#0A2540] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#84CC16]/20 text-[#84CC16] text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#84CC16]" /> Need a Custom Architecture?
            </div>
            <h4 className="text-xl sm:text-2xl font-bold">
              Looking for a custom multi-country HR &amp; Payroll package?
            </h4>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Our African HR implementation consultants can tailor custom statutory modules, biometric hardware links,
              and localized currency payouts to your exact corporate structure.
            </p>
          </div>
          <button
            onClick={() => onSelectService(SERVICES_LIST[11])}
            className="shrink-0 px-6 py-3.5 rounded-xl bg-[#84CC16] hover:bg-[#73b612] text-[#0A2540] font-black text-sm shadow-md transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span>Talk to an Expert</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
