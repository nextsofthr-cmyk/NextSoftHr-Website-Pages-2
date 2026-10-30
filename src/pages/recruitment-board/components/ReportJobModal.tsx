import React, { useState } from 'react';
import { 
  X, 
  Flag, 
  AlertTriangle, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  HelpCircle,
  Send,
  Building2
} from 'lucide-react';
import { Job } from '../types';

interface ReportJobModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
  onReportSubmitted: (jobId: string, reason: string, details: string, caseId: string) => void;
  onToast?: (message: string) => void;
}

export const REPORT_REASONS = [
  {
    id: 'scam',
    title: 'Suspicious / Fraudulent / Requesting Fees',
    desc: 'The poster is asking for money, registration fees, gift cards, or personal banking credentials.'
  },
  {
    id: 'misleading',
    title: 'Misleading Job Details or Inaccurate Salary',
    desc: 'The role responsibilities, compensation figures, or work location are deceptive or bait-and-switch.'
  },
  {
    id: 'expired',
    title: 'Closed, Expired, or Ghost Opening',
    desc: 'The position has already been filled, expired, or the company is no longer actively hiring.'
  },
  {
    id: 'discrimination',
    title: 'Discriminatory or Inappropriate Content',
    desc: 'The posting contains unlawful bias, discriminatory restrictions, or offensive language.'
  },
  {
    id: 'impersonation',
    title: 'Company Impersonation / Unauthorized Recruiter',
    desc: 'The poster is falsely representing the employer without legitimate authorization.'
  },
  {
    id: 'other',
    title: 'Other Policy Violation',
    desc: 'Other non-compliant, duplicate, or abusive job posting issues.'
  }
];

export const ReportJobModal: React.FC<ReportJobModalProps> = ({
  job,
  isOpen,
  onClose,
  onReportSubmitted,
  onToast
}) => {
  const [selectedReason, setSelectedReason] = useState<string>('scam');
  const [details, setDetails] = useState('');
  const [reporterEmail, setReporterEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [caseId, setCaseId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReason) return;

    setIsSubmitting(true);
    const generatedCaseId = `NJ-TR-${Math.floor(100000 + Math.random() * 900000)}`;
    setCaseId(generatedCaseId);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      onReportSubmitted(job.id, selectedReason, details, generatedCaseId);
      if (onToast) {
        onToast(`🚩 Job report lodged successfully. Reference: ${generatedCaseId}`);
      }
    }, 600);
  };

  return (
    <div 
      className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-slate-900/80 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-red-50 dark:bg-red-950/40 border-b border-red-100 dark:border-red-900/40 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-xs shrink-0">
              <Flag className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <span>Report Job Vacancy</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/80 text-red-800 dark:text-red-200 font-bold">
                  Trust & Safety
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                NextSoftHR Pan-African Marketplace Integrity
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-white dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-4 animate-in fade-in">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-black text-slate-900 dark:text-white">
                  Report Lodged for Review
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
                  Thank you for keeping our marketplace safe. Our compliance officers will audit <strong className="text-slate-800 dark:text-slate-200">{job.title}</strong> at <strong className="text-slate-800 dark:text-slate-200">{job.companyName}</strong> within 24 hours.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 inline-block text-xs font-mono">
                <span className="text-slate-400">Case Ticket:</span> <strong className="text-blue-600 dark:text-blue-400 font-bold">{caseId}</strong>
              </div>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2.5 bg-[#142B4A] dark:bg-blue-600 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-xs"
                >
                  Return to Job Details
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Job Reference Banner */}
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center font-bold text-xs text-slate-800 dark:text-slate-200 shrink-0">
                  {job.companyInitials}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {job.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {job.companyName} · {job.location} · {job.recruiterSource || 'Direct Employer'}
                  </p>
                </div>
              </div>

              {/* Reason Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Select the reason for reporting this vacancy:
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {REPORT_REASONS.map((r) => {
                    const isSelected = selectedReason === r.id;
                    return (
                      <label
                        key={r.id}
                        className={`block p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-red-50/70 dark:bg-red-950/40 border-red-300 dark:border-red-800 ring-1 ring-red-400/30'
                            : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <input
                            type="radio"
                            name="reportReason"
                            value={r.id}
                            checked={isSelected}
                            onChange={() => setSelectedReason(r.id)}
                            className="mt-0.5 accent-red-600 shrink-0"
                          />
                          <div className="space-y-0.5">
                            <span className="font-bold text-slate-900 dark:text-white block">
                              {r.title}
                            </span>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight block">
                              {r.desc}
                            </span>
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Additional Context */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Additional Details or Evidence (Optional):
                </label>
                <textarea
                  rows={3}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Provide specific details e.g., 'Recruiter demanded a ₦5,000 interview processing fee via Telegram' or 'Company confirmed role is closed'."
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                />
              </div>

              {/* Optional Contact for Case Resolution */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block">
                  Email for investigation updates (Optional):
                </label>
                <input
                  type="email"
                  value={reporterEmail}
                  onChange={(e) => setReporterEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400"
                />
              </div>

              {/* Footer Note & Actions */}
              <div className="pt-2 flex items-center justify-between gap-3">
                <div className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-slate-400 shrink-0" />
                  <span>Reports are 100% confidential.</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-3.5 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Report</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
