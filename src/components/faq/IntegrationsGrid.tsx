import React from 'react';
import {
  FileSpreadsheet,
  Calculator,
  Briefcase,
  Fingerprint,
  MessageSquare,
  Layers,
  Mail,
  CreditCard,
  Wallet,
  DollarSign,
  ArrowRight
} from 'lucide-react';
import { INTEGRATION_PARTNERS } from '../data/faqData';
import { useLanguage } from '../context/LanguageContext';

interface IntegrationsGridProps {
  onOpenDemo: () => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  FileSpreadsheet,
  Calculator,
  Briefcase,
  Fingerprint,
  MessageSquare,
  Layers,
  Mail,
  CreditCard,
  Wallet,
  DollarSign,
};

export const IntegrationsGrid: React.FC<IntegrationsGridProps> = ({ onOpenDemo }) => {
  const { t } = useLanguage();

  return (
    <section id="integrations-section" className="py-12 bg-[#F8FAFC] dark:bg-[#080E1E] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 mb-1">
              {t('int.tag', 'Connected Ecosystem')}
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {t('int.title', 'Pre-Built Integrations for Your Tech Stack')}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-xl">
              {t('int.desc', 'Connect NextSoftHR with your preferred accounting systems, payment channels, biometric hardware, and collaboration apps.')}
            </p>
          </div>
          <button
            onClick={onOpenDemo}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors self-start md:self-auto"
          >
            <span>{t('int.customReq', 'Request custom ERP integration')}</span>
            <ArrowRight className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400" />
          </button>
        </div>

        {/* Clean Integration Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
          {INTEGRATION_PARTNERS.map((partner) => {
            const Icon = ICON_MAP[partner.icon] || Layers;
            return (
              <div
                key={partner.name}
                className="p-4 rounded-xl bg-white dark:bg-[#0F1D3D] border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:border-blue-400 dark:hover:border-blue-500/50 hover:shadow-xs transition-all duration-200 flex flex-col items-center text-center group"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-[#162752] group-hover:bg-blue-50 dark:group-hover:bg-blue-950/60 text-slate-700 dark:text-slate-200 group-hover:text-blue-700 dark:group-hover:text-blue-400 flex items-center justify-center transition-colors mb-2.5">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                  {partner.name}
                </div>
                <div className="text-[11px] text-slate-400 dark:text-slate-400 mt-0.5">
                  {partner.category}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
