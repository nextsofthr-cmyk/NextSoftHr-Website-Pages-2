import React from 'react';
import { X, ShieldCheck, Lock, Globe, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import { NextSoftHRLogo } from './NextSoftHRLogo';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
    >
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60">
          <div className="flex items-center gap-3">
            <NextSoftHRLogo size="sm" variant="auto" />
            <div className="h-4 w-px bg-slate-300 dark:bg-slate-700" />
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Privacy &amp; Data Protection Brief</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <div>
            <h3 id="privacy-modal-title" className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              NextSoftHR Global Privacy Governance
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Applicable across all NextSoftHR cloud regions, customer tenancies, and mobile endpoints.
            </p>
          </div>

          <div className="bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 rounded-xl p-4 text-xs space-y-2">
            <div className="font-bold text-blue-900 dark:text-blue-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-700 dark:text-blue-400" />
              <span>Data Controller vs. Data Processor Division</span>
            </div>
            <p className="text-blue-950/80 dark:text-blue-200/90 leading-relaxed">
              When utilizing NextSoftHR to manage your workforce, <strong>Customer is the Data Controller</strong> (determining purpose and categories of employee data), and <strong>NextSoftHR is the Data Processor</strong> acting strictly on documented customer instructions.
            </p>
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-1.5 bg-slate-50/50 dark:bg-slate-950/40">
              <div className="font-bold text-slate-900 dark:text-white text-xs flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#65a30d] dark:text-[#84cc16]" />
                <span>Zero Unauthorized Data Monetization</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                NextSoftHR never sells, rents, or trades customer or employee personal data to third-party ad brokers or external marketers under any circumstances.
              </p>
            </div>

            <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-1.5 bg-slate-50/50 dark:bg-slate-950/40">
              <div className="font-bold text-slate-900 dark:text-white text-xs flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Cross-Border Compliance</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Structured to support EU/UK GDPR, California CCPA/CPRA, and global data transfer frameworks through standard contractual clauses (SCCs) and standardized DPAs.
              </p>
            </div>

            <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-1.5 bg-slate-50/50 dark:bg-slate-950/40">
              <div className="font-bold text-slate-900 dark:text-white text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#65a30d] dark:text-[#84cc16]" />
                <span>Employee Subject Rights</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Built-in administrative tools to assist Customers with handling data subject access requests (DSARs), rectifications, exports, and right-to-be-forgotten deletion workflows.
              </p>
            </div>

            <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-1.5 bg-slate-50/50 dark:bg-slate-950/40">
              <div className="font-bold text-slate-900 dark:text-white text-xs flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Sub-Processor Transparency</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                NextSoftHR enforces strict vendor risk management with cloud hosting providers and transactional service vendors under binding confidentiality and data security terms.
              </p>
            </div>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-800 pt-4 text-xs text-slate-500 dark:text-slate-400">
            To execute a signed Data Processing Addendum (DPA) or submit a privacy inquiry to our Data Protection Officer, please write to{' '}
            <a href="mailto:dpo@nextsofthr.org" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              dpo@nextsofthr.org
            </a>.
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-2xs"
          >
            Close Summary
          </button>
        </div>

      </div>
    </div>
  );
};
