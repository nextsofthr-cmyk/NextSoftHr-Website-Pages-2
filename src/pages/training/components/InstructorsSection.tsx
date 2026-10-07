import React from 'react';
import { INSTRUCTORS } from '../data/academyData';
import { Award, BookOpen, Briefcase } from 'lucide-react';

interface InstructorsSectionProps {
  onSelectCourseByName: (courseName: string) => void;
}

export const InstructorsSection: React.FC<InstructorsSectionProps> = ({
  onSelectCourseByName,
}) => {
  return (
    <section className="py-16 bg-white dark:bg-[#0F172A] border-b border-slate-200/70 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-50 dark:bg-blue-950/80 text-[#0F4C81] dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">
            Executive Faculty
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] dark:text-white tracking-tight">
            Learn From Experienced Professionals
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Our instructors are seasoned HR practitioners, chartered tax specialists, and workforce researchers with hands-on corporate leadership experience.
          </p>
        </div>

        {/* 4 Instructors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {INSTRUCTORS.map((inst) => (
            <div
              key={inst.id}
              className="bg-slate-50/60 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/80 overflow-hidden shadow-2xs hover:shadow-md hover:border-[#0F4C81]/40 dark:hover:border-blue-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Photo & Experience Badge */}
                <div className="relative h-60 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={inst.photo}
                    alt={inst.name}
                    className="w-full h-full object-cover object-top hover:scale-103 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-[#0F4C81] dark:bg-blue-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xs">
                    {inst.yearsExperience}+ Years Exp
                  </div>
                </div>

                {/* Info Container */}
                <div className="p-5">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                    {inst.name}
                  </h3>
                  <div className="text-xs font-semibold text-[#0F4C81] dark:text-[#84CC16] mt-1">
                    {inst.role}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
                    {inst.organization}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                    {inst.bio}
                  </p>

                  {/* Courses Taught */}
                  <div className="mt-4 pt-3.5 border-t border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1.5">
                      Lead Instructor In:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {inst.coursesTaught.map((cName, idx) => (
                        <button
                          key={idx}
                          onClick={() => onSelectCourseByName(cName)}
                          className="text-[11px] font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-[#0F4C81] dark:hover:text-[#84CC16] border border-slate-200 dark:border-slate-700 rounded px-2 py-0.5 text-left transition-colors cursor-pointer"
                        >
                          {cName}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="pt-2 text-[11px] text-[#65A30D] dark:text-[#84CC16] font-semibold flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>Certified NextSoftHR Faculty</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
