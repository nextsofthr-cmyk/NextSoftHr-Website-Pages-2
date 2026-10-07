import React from 'react';
import {
  Users,
  Clock,
  Award,
  CheckCircle,
  Building2,
} from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const trustItems = [
    {
      icon: Users,
      title: 'Expert-Led Training',
      description: 'Practical knowledge from experienced professionals.',
    },
    {
      icon: Clock,
      title: 'Flexible Learning',
      description: 'Learn online, live or at your own pace.',
    },
    {
      icon: Award,
      title: 'Professional Certificates',
      description: 'Earn certificates that demonstrate completed training.',
    },
    {
      icon: CheckCircle,
      title: 'Practical Skills',
      description: 'Learn skills that can be applied directly at work.',
    },
    {
      icon: Building2,
      title: 'Corporate Training',
      description: 'Upskill entire teams and organizations.',
    },
  ];

  return (
    <section className="bg-white dark:bg-[#0F172A] border-b border-slate-200/80 dark:border-slate-800 py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 dark:divide-slate-800">
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`flex items-start gap-3.5 ${
                  idx === 0 ? '' : 'pt-4 sm:pt-0 sm:pl-4 lg:pl-5'
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-blue-50/80 dark:bg-slate-800 text-[#0F4C81] dark:text-[#84CC16] flex items-center justify-center flex-shrink-0 border border-blue-100/80 dark:border-slate-700">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                    {item.title}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
