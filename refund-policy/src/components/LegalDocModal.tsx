import React from 'react';
import { X, Shield, FileText } from 'lucide-react';
import { NextSoftLogo } from './NextSoftLogo';

interface LegalDocModalProps {
  type: 'terms' | 'privacy' | null;
  onClose: () => void;
}

export const LegalDocModal: React.FC<LegalDocModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div
        className="relative w-full max-w-3xl bg-white dark:bg-[#131D31] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh] transition-colors"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-[#0F172A]">
          <div className="flex items-center gap-3">
            <NextSoftLogo size="sm" />
            <div className="h-4 w-px bg-slate-200 dark:bg-slate-700" />
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200">
              {isPrivacy ? <Shield className="w-4 h-4 text-[#84CC16]" /> : <FileText className="w-4 h-4 text-[#0A3B7B] dark:text-[#38BDF8]" />}
              <span>{isPrivacy ? 'Global Privacy Policy Summary' : 'Master Terms & Conditions Summary'}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {isPrivacy ? (
            <>
              <h3 className="text-lg font-bold text-[#0A3B7B] dark:text-white">NextSoftHR Data Protection &amp; Retention Standards</h3>
              <p>
                NextSoftHR is committed to rigorous data security and regulatory compliance in accordance with the Nigeria Data Protection Act (NDPA), GDPR, and international data residency conventions.
              </p>
              <h4 className="font-semibold text-slate-800 dark:text-slate-100">Post-Cancellation Data Retention (Section 7 Governance)</h4>
              <p>
                Following account cancellation or subscription expiration, your organization enters a <strong>30-Day Data Export Grace Period</strong>. During this window, primary administrators retain full capability to download employee personnel archives, statutory tax ledgers, and audit files in structured CSV and PDF formats.
              </p>
              <h4 className="font-semibold text-slate-800 dark:text-slate-100">Definitive Scrubbing &amp; Erasure</h4>
              <p>
                On the 31st calendar day following subscription expiration, all active employee records, biometric hashes, and company directories are queued for cryptographic erasure from primary clusters. Encrypted cold backups are retained strictly for ninety (90) days to satisfy mandatory statutory audit obligations, after which automated overwriting completes the purge cycle.
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 pt-2">
                For complete data processing addenda (DPA) or inquiries, contact privacy@nextsofthr.org.
              </p>
            </>
          ) : (
            <>
              <h3 className="text-lg font-bold text-[#0A3B7B] dark:text-white">NextSoftHR Master Terms &amp; Conditions Summary</h3>
              <p>
                These Master Terms govern all commercial subscriptions, user authorizations, module licenses, and digital services delivered by NextSoftHR.
              </p>
              <h4 className="font-semibold text-slate-800 dark:text-slate-100">Service Availability &amp; Licensing</h4>
              <p>
                NextSoftHR grants non-exclusive, non-transferable, subscription-based SaaS access to our cloud infrastructure. Customers are responsible for safeguarding corporate administrative credentials and ensuring compliance with relevant employment and payroll laws.
              </p>
              <h4 className="font-semibold text-slate-800 dark:text-slate-100">Commercial Billing &amp; Invoicing</h4>
              <p>
                All fees are billed in advance according to the contracted billing frequency. Payment failure or recurring charge rejections may result in temporary account suspension after ten (10) business days notice.
              </p>
              <h4 className="font-semibold text-slate-800 dark:text-slate-100">Governing Law &amp; Dispute Resolution</h4>
              <p>
                These terms are governed by the laws of the Federal Republic of Nigeria. Any commercial dispute shall initially be subjected to good-faith mediation before submission to arbitration in accordance with the Arbitration and Mediation Act.
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 pt-2">
                Full legal documentation is available via your NextSoftHR enterprise agreement or by contacting legal@nextsofthr.org.
              </p>
            </>
          )}
        </div>

        <div className="px-6 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-[#0F172A] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#0A3B7B] hover:bg-[#1E40AF] text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Close Document View
          </button>
        </div>
      </div>
    </div>
  );
};
