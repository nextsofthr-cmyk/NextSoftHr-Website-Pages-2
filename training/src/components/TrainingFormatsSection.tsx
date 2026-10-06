import React from 'react';
import {
  Laptop,
  Video,
  Users2,
  MapPin,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

interface TrainingFormatsSectionProps {
  onSelectFormat: (format: string) => void;
  onOpenCorporate: () => void;
}

export const TrainingFormatsSection: React.FC<TrainingFormatsSectionProps> = ({
  onSelectFormat,
  onOpenCorporate,
}) => {
  const formats = [
    {
      id: 'self-paced',
      title: 'Self-Paced Learning',
      description: 'Learn anytime, anywhere at your own speed with 24/7 on-demand access to video lessons, templates, and assessments.',
      icon: Laptop,
      badge: 'Maximum Flexibility',
      features: [
        'On-demand HD video lectures',
        'Downloadable calculation models & toolkits',
        'Automated knowledge assessments',
        'Lifetime access to course updates',
      ],
      ctaText: 'Explore Online Courses',
      action: () => onSelectFormat('Self-Paced'),
      color: 'blue',
    },
    {
      id: 'live-instructor',
      title: 'Live Instructor-Led Training',
      description: 'Interactive virtual training delivered by experienced instructors with live case studies, real-time feedback, and cohort collaboration.',
      icon: Video,
      badge: 'Interactive Cohorts',
      features: [
        'Live weekend and evening virtual suites',
        'Direct Q&A with senior faculty',
        'Collaborative syndicate breakout rooms',
        'Recorded live sessions for review',
      ],
      ctaText: 'View Live Training',
      action: () => onSelectFormat('Live Instructor-Led'),
      color: 'lime',
    },
    {
      id: 'corporate',
      title: 'Corporate Training',
      description: 'Customized learning programs for organizations and teams. Upskill entire departments with curricula mapped to your company strategy.',
      icon: Users2,
      badge: 'B2B & Teams',
      features: [
        'Bespoke syllabus aligned to your SOPs',
        'Dedicated company cohort & private schedule',
        'Consolidated executive progress reports',
        'Bulk employee certification tracking',
      ],
      ctaText: 'Request Corporate Training',
      action: onOpenCorporate,
      color: 'blue',
    },
    {
      id: 'on-site',
      title: 'On-Site Training',
      description: 'Professional training delivered at your organization or selected venue. High-impact face-to-face workshops tailored to your operational realities.',
      icon: MapPin,
      badge: 'Executive Immersive',
      features: [
        'Facilitators deployed directly to your facility',
        'Hands-on physical workspace audits & labs',
        'Full training material kits provided',
        'Pre- and post-training impact assessments',
      ],
      ctaText: 'Request On-Site Training',
      action: onOpenCorporate,
      color: 'slate',
    },
  ];

  return (
    <section className="py-16 bg-slate-50 dark:bg-[#0B1120] border-b border-slate-200/70 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-50 dark:bg-blue-950/80 text-[#0F4C81] dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">
            Flexible Delivery
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] dark:text-white tracking-tight">
            Learn Your Way
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Tailor your education to your schedule, career goals, or organizational requirements.
          </p>
        </div>

        {/* 4 Large Format Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {formats.map((fmt) => {
            const Icon = fmt.icon;
            return (
              <div
                key={fmt.id}
                className="bg-white dark:bg-[#0F172A] rounded-xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-xs hover:shadow-md hover:border-[#0F4C81]/50 dark:hover:border-blue-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 text-[#0F4C81] dark:text-[#84CC16] flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {fmt.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                    {fmt.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                    {fmt.description}
                  </p>

                  {/* Features Bullet Points */}
                  <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800">
                    <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                      {fmt.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#65A30D] dark:text-[#84CC16] mt-0.5 flex-shrink-0" />
                          <span className="leading-tight">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card CTA */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={fmt.action}
                    className="w-full py-2.5 px-3 text-xs font-bold text-[#0F4C81] dark:text-blue-300 hover:text-white dark:hover:text-white bg-blue-50/70 dark:bg-slate-800/80 hover:bg-[#0F4C81] dark:hover:bg-blue-600 border border-blue-200/60 dark:border-slate-700 hover:border-transparent rounded-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>{fmt.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#65A30D] dark:text-[#84CC16]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
