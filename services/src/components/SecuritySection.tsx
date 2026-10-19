import React from 'react';
import {
  ShieldCheck,
  Lock,
  KeyRound,
  FileCheck2,
  Database,
  RefreshCw,
  Server,
  EyeOff,
  CheckCircle2,
} from 'lucide-react';
import { SECURITY_ITEMS } from '../data/servicesData';
import { ComplianceCertification } from './ComplianceCertification';
import { CardSlider } from './CardSlider';

const securityIcons = [
  Lock,
  KeyRound,
  FileCheck2,
  ShieldCheck,
  KeyRound,
  RefreshCw,
  Server,
  EyeOff,
];

export const SecuritySection: React.FC = () => {
  return (
    <section id="security" className="py-20 bg-slate-50 dark:bg-[#07182E] border-t border-slate-200/80 dark:border-blue-900/60 relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/70 dark:bg-blue-950/80 text-[#0256C4] dark:text-[#84CC16] text-xs font-extrabold uppercase tracking-widest border border-blue-200 dark:border-blue-800 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16]" />
            DATA SOVEREIGNTY &amp; GOVERNANCE
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2540] dark:text-white tracking-tight mb-4">
            Your Workforce Data Deserves Serious Protection
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            From payroll account numbers to confidential performance appraisals, NextSofthr is engineered with
            defense-in-depth security, strict encryption, and African data privacy compliance.
          </p>
        </div>

        {/* 8 Security Cards Slider: 4 in a row on desktop */}
        <CardSlider
          id="security-slider"
          items={SECURITY_ITEMS}
          perView={{ base: 1, sm: 2, lg: 4, xl: 4 }}
          ariaLabel="Security features slider"
          renderItem={(item, idx) => {
            const IconComp = securityIcons[idx] || ShieldCheck;

            return (
              <div
                key={idx}
                className="bg-white dark:bg-[#0A2540] rounded-2xl p-6 border border-slate-200/80 dark:border-blue-900/60 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-md transition-all duration-200 flex flex-col justify-between h-full"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/60 text-[#0256C4] dark:text-blue-300 flex items-center justify-center mb-4">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#0A2540] dark:text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          }}
        />

        {/* Trust Badges Ribbon */}
        <div className="mt-12 p-6 rounded-2xl bg-white dark:bg-[#0A2540] border border-slate-200 dark:border-blue-900/60 flex flex-wrap items-center justify-around gap-6 text-xs text-slate-600 dark:text-slate-300 font-semibold">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#84CC16]" />
            <span>Encrypted at Rest &amp; Transit (AES-256 / TLS 1.3)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#84CC16]" />
            <span>Granular Role-Based Permissions (RBAC)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#84CC16]" />
            <span>Full Tamper-Evident System Audit Trails</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#84CC16]" />
            <span>Daily Automated Snapshots &amp; Redundancy</span>
          </div>
        </div>

        {/* Prominent Compliance Certification Badges (ISO 27001, NDPR, GDPR) */}
        <ComplianceCertification />
      </div>
    </section>
  );
};
