import React from 'react';
import {
  Server,
  UserCheck,
  Lock,
  KeyRound,
  FileText,
  Fingerprint,
  DatabaseBackup,
  EyeOff,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { SECURITY_FEATURES } from '../data/pricingData';
import { CardSlider } from './CardSlider';

const SECURITY_PER_VIEW = { base: 1, sm: 2, lg: 4 };

const ICONS_MAP: Record<string, React.ElementType> = {
  Server,
  UserCheck,
  Lock,
  KeyRound,
  FileText,
  Fingerprint,
  DatabaseBackup,
  EyeOff,
};

interface SecuritySectionProps {
  onLearnMoreSecurity: () => void;
}

export const SecuritySection: React.FC<SecuritySectionProps> = ({ onLearnMoreSecurity }) => {
  return (
    <section id="security" className="py-20 bg-[#F8FAFC] dark:bg-[#070D1E] border-t border-slate-200/80 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 dark:bg-slate-800 text-[#A3E635] text-xs font-bold mb-3 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#A3E635]" />
            <span>Security &amp; Privacy First</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B132B] dark:text-white tracking-tight">
            Your Workforce Data Deserves Enterprise-Grade Protection
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            We employ rigorous architectural defenses, end-to-end encryption, and role-based guards to
            safeguard employee salaries, personal data, and business records.
          </p>
        </div>

        {/* 8 Security Cards Slider */}
        <CardSlider
          id="security-slider"
          ariaLabel="Security features"
          items={SECURITY_FEATURES}
          perView={SECURITY_PER_VIEW}
          renderItem={(item, idx) => {
            const Icon = ICONS_MAP[item.iconName] || ShieldCheck;
            return (
              <div
                id={`security-card-${idx}`}
                className="bg-white dark:bg-[#0B132B] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 hover:border-[#0265DC] dark:hover:border-blue-500 hover:shadow-md transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-[#162447] border border-blue-100 dark:border-blue-900/50 flex items-center justify-center text-[#0265DC] dark:text-blue-400 group-hover:bg-[#0265DC] group-hover:text-white transition-colors mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display text-base font-bold text-slate-900 dark:text-white group-hover:text-[#0265DC] dark:group-hover:text-blue-300 transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          }}
        />

        {/* Security & Privacy Banner */}
        <div className="mt-10 bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-slate-900 to-[#0265DC] flex items-center justify-center text-[#A3E635] shrink-0 shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white">
                Security &amp; Privacy Architecture
              </div>
              <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-0.5">
                Review our comprehensive data isolation standards, disaster recovery protocols, and
                access control specifications.
              </div>
            </div>
          </div>

          <button
            id="security-learn-more-btn"
            onClick={onLearnMoreSecurity}
            className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-[#0265DC] dark:text-blue-300 bg-blue-50 dark:bg-blue-950/80 hover:bg-blue-100 dark:hover:bg-blue-900/80 border border-blue-200/80 dark:border-blue-800/80 transition-colors flex items-center gap-2 shrink-0"
          >
            <span>Learn More</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
