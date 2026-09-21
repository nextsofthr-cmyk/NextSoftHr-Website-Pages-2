import React from 'react';
import {
  Users,
  CheckCircle2,
  Code2,
  ShieldCheck,
  Headphones,
  Briefcase,
  Layers,
  Sparkles
} from 'lucide-react';
import { TEAM_PILLARS } from '../data/contentData';

export const PeopleBehind: React.FC = () => {
  const specializedTeams = [
    {
      title: 'Product Teams & Systems Architects',
      description: 'Designing workflows rooted in African operational realities with modern cloud resilience and bank-grade data security.',
      icon: Layers,
    },
    {
      title: 'Software Engineers & Mobile Developers',
      description: 'Engineering responsive web apps, geo-fenced attendance punch systems, and low-latency synchronization engines.',
      icon: Code2,
    },
    {
      title: 'HR Specialists & Labor Advisors',
      description: 'Ensuring deep adherence to statutory labor codes, employee welfare practices, and compliant documentation standards.',
      icon: Users,
    },
    {
      title: 'Payroll Professionals & Tax Analysts',
      description: 'Validating penny-accurate payroll calculations, PAYE tax brackets, pension deductions, and state tax remittance schedules.',
      icon: ShieldCheck,
    },
    {
      title: 'Customer Success & Implementation Leads',
      description: 'Providing dedicated local onboarding, data migration from legacy spreadsheets, and round-the-clock client support.',
      icon: Headphones,
    },
    {
      title: 'Business Consultants & Technology Partners',
      description: 'Guiding corporate digital transformations, ERP integrations, and enterprise operational governance across continents.',
      icon: Briefcase,
    },
  ];

  return (
    <section id="people" className="py-20 lg:py-28 bg-white border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-[#0B3B73]">
            <span className="w-2 h-2 rounded-full bg-[#84CC16]"></span>
            <span>Human-Centered Engineering</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2540] tracking-tight">
            Technology Powered by People
          </h2>

          <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-100/80 max-w-2xl mx-auto">
            <p className="text-base sm:text-lg font-bold text-[#0A2540] leading-snug">
              “Behind every great platform is a team committed to solving real business problems.”
            </p>
          </div>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            NextSofthr brings together software engineers, African payroll specialists,
            HR practitioners, and customer success managers who care deeply about building
            stronger, more transparent workplaces.
          </p>
        </div>

        {/* Authentic Professional Photographs Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {TEAM_PILLARS.map((pillar) => (
            <div
              key={pillar.role}
              className="bg-[#F8FAFC] border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={pillar.image}
                    alt={pillar.role}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540] via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-bold text-[#84CC16] uppercase tracking-wider">
                      {pillar.focus}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="font-bold text-base text-[#0A2540] group-hover:text-[#0B3B73] transition-colors">
                    {pillar.role}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pillar.mission}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-slate-200/80">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Core Competencies:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {pillar.keySkills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[10px] font-semibold bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 6 Collaborative Disciplines Grid */}
        <div className="bg-[#0A2540] rounded-3xl p-6 sm:p-10 text-white shadow-xl">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <span className="text-xs font-bold text-[#84CC16] uppercase tracking-wider">
              Cross-Functional Excellence
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              The Specialized Disciplines Behind NextSofthr
            </h3>
            <p className="text-xs text-slate-300">
              A united culture valuing deep African domain expertise, strict regulatory compliance, and world-class product craftsmanship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specializedTeams.map((team) => {
              const Icon = team.icon;
              return (
                <div
                  key={team.title}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#84CC16]/20 border border-[#84CC16]/40 flex items-center justify-center mb-3 text-[#84CC16]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-white mb-1.5">{team.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {team.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
