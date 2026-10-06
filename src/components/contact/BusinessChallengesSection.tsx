import React from 'react';
import { Clock, FolderKanban, ScanFace, FileCheck, Network, BarChart3, ArrowRight } from 'lucide-react';
import { EnquiryType } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface BusinessChallengesSectionProps {
  onSelectChallenge: (category: EnquiryType, challengeText: string) => void;
}

export const BusinessChallengesSection: React.FC<BusinessChallengesSectionProps> = ({
  onSelectChallenge,
}) => {
  const { t } = useLanguage();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Clock':
        return <Clock className="w-5 h-5 text-[#1769E0]" />;
      case 'FolderKanban':
        return <FolderKanban className="w-5 h-5 text-[#1769E0]" />;
      case 'ScanFace':
        return <ScanFace className="w-5 h-5 text-[#1769E0]" />;
      case 'FileCheck':
        return <FileCheck className="w-5 h-5 text-[#1769E0]" />;
      case 'Network':
        return <Network className="w-5 h-5 text-[#1769E0]" />;
      case 'BarChart3':
      default:
        return <BarChart3 className="w-5 h-5 text-[#1769E0]" />;
    }
  };

  const challengeItems = [
    {
      id: 'c1',
      question: t.challenges.items.c1.question,
      solution: t.challenges.items.c1.solution,
      category: 'HR Management' as EnquiryType,
      iconName: 'FolderKanban',
    },
    {
      id: 'c2',
      question: t.challenges.items.c2.question,
      solution: t.challenges.items.c2.solution,
      category: 'Payroll' as EnquiryType,
      iconName: 'Clock',
    },
    {
      id: 'c3',
      question: t.challenges.items.c3.question,
      solution: t.challenges.items.c3.solution,
      category: 'Time & Attendance' as EnquiryType,
      iconName: 'ScanFace',
    },
    {
      id: 'c4',
      question: t.challenges.items.c4.question,
      solution: t.challenges.items.c4.solution,
      category: 'Leave Management' as EnquiryType,
      iconName: 'FileCheck',
    },
    {
      id: 'c5',
      question: t.challenges.items.c5.question,
      solution: t.challenges.items.c5.solution,
      category: 'Performance Management' as EnquiryType,
      iconName: 'BarChart3',
    },
    {
      id: 'c6',
      question: t.challenges.items.c6.question,
      solution: t.challenges.items.c6.solution,
      category: 'Enterprise Solutions' as EnquiryType,
      iconName: 'Network',
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-[#081528] border-t border-slate-200/70 dark:border-white/10 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1769E0]/10 dark:bg-[#1769E0]/20 text-[#1769E0] dark:text-[#C8F000] text-xs font-bold uppercase tracking-wider mb-3">
            <span>{t.challenges.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] dark:text-white tracking-tight font-display mb-4">
            {t.challenges.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            {t.challenges.subtitle}
          </p>
        </div>

        {/* 6 Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challengeItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectChallenge(item.category, `Challenge: ${item.question}`)}
              className="group p-6 rounded-2xl bg-[#F7FAFC] hover:bg-[#0B1F3A] dark:bg-[#0E2038] dark:hover:bg-[#132c4e] border border-slate-200 dark:border-white/10 hover:border-[#C8F000]/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 group-hover:bg-white/10 flex items-center justify-center mb-4 transition-colors">
                  {getIcon(item.iconName)}
                </div>

                <h3 className="text-base font-bold text-slate-700 dark:text-slate-200 group-hover:text-slate-200 mb-2 transition-colors">
                  {item.question}
                </h3>

                <p className="text-xl font-extrabold text-[#1769E0] dark:text-[#C8F000] group-hover:text-[#C8F000] tracking-tight font-display transition-colors">
                  {item.solution}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-slate-200 dark:border-white/10 group-hover:border-white/10 flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 group-hover:text-white transition-colors">
                <span>{t.challenges.solveWithNextSofthr}</span>
                <div className="w-7 h-7 rounded-full bg-slate-200/60 dark:bg-white/10 group-hover:bg-[#C8F000] flex items-center justify-center transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-700 dark:text-slate-200 group-hover:text-[#0B1F3A] transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

