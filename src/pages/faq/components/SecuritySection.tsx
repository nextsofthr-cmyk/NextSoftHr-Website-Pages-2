import React from 'react';
import { Shield, Lock, Cloud, KeyRound, FileCheck2, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const SecuritySection: React.FC = () => {
  const { t } = useLanguage();

  const securityPillars = [
    {
      icon: Shield,
      title: t('sec.p1.title', 'Shield Protection'),
      description: t('sec.p1.desc', 'AES-256 enterprise encryption at rest and TLS 1.3 in transit guarding every transaction.'),
    },
    {
      icon: Lock,
      title: t('sec.p2.title', 'Bank-Grade Lock'),
      description: t('sec.p2.desc', 'Compartmentalized employee databases with strict multi-factor authentication (MFA).'),
    },
    {
      icon: Cloud,
      title: t('sec.p3.title', 'Secure Cloud Infrastructure'),
      description: t('sec.p3.desc', 'Geographically redundant data centers with 99.99% uptime SLA and automated hourly snapshots.'),
    },
    {
      icon: KeyRound,
      title: t('sec.p4.title', 'Role-Based Access (RBAC)'),
      description: t('sec.p4.desc', 'Field-level permission controls ensuring sensitive payroll and personal records remain restricted.'),
    },
    {
      icon: FileCheck2,
      title: t('sec.p5.title', 'Immutable Audit Trail'),
      description: t('sec.p5.desc', 'Tamper-proof logging of every login, salary adjustment, export, and manager approval.'),
    },
  ];

  return (
    <section className="py-12 bg-white dark:bg-[#0B132B] border-t border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 mb-1">
            {t('sec.tag', 'Enterprise Trust & Governance')}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('sec.title', 'Security Engineered for Global Scale')}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
            {t('sec.subtitle', 'NextSoftHR is architected to exceed international data privacy standards and statutory audit mandates.')}
          </p>
        </div>

        {/* 5 Security Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {securityPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-5 rounded-xl bg-slate-50/70 dark:bg-[#0F1D3D] border border-slate-200/80 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-500/50 hover:bg-white dark:hover:bg-[#162752] transition-all duration-200 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-blue-100/80 dark:bg-[#162752] group-hover:bg-blue-700 text-blue-700 dark:text-blue-400 group-hover:text-white flex items-center justify-center transition-colors mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">{pillar.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{pillar.description}</p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-200/60 dark:border-slate-800 flex items-center gap-1 text-[11px] font-semibold text-lime-700 dark:text-lime-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400" />
                  <span>{t('sec.verified', 'Verified Architecture')}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
