import React, { useState } from 'react';
import { PolicySection } from '../data/policyData';
import { Link2, Check, AlertTriangle, Info, ShieldAlert, ArrowRight, FileCheck } from 'lucide-react';

interface PolicySectionCardProps {
  section: PolicySection;
  onActionClick: (actionType: string) => void;
}

export const PolicySectionCard: React.FC<PolicySectionCardProps> = ({ section, onActionClick }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    const url = `${window.location.origin}${window.location.pathname}#${section.id}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCalloutIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />;
      case 'important':
        return <ShieldAlert className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />;
      case 'notice':
        return <FileCheck className="w-5 h-5 text-[#0A3B7B] dark:text-[#38BDF8] shrink-0 mt-0.5" />;
      default:
        return <Info className="w-5 h-5 text-[#0A3B7B] dark:text-[#38BDF8] shrink-0 mt-0.5" />;
    }
  };

  const getCalloutClasses = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-amber-50/80 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/60 text-amber-950 dark:text-amber-200';
      case 'important':
        return 'bg-red-50/80 dark:bg-red-950/30 border-red-200 dark:border-red-900/60 text-red-950 dark:text-red-200';
      case 'notice':
        return 'bg-blue-50/80 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900/60 text-blue-950 dark:text-blue-200';
      default:
        return 'bg-slate-50 dark:bg-[#0F172A] border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-200';
    }
  };

  return (
    <article
      id={section.id}
      className="policy-section scroll-mt-24 bg-white dark:bg-[#131D31] rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors duration-200"
    >
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
        {/* Unboxed Metadata Discipline */}
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <span className="font-mono text-[#0A3B7B] dark:text-[#38BDF8] font-bold">
            SECTION {section.number < 10 ? `0${section.number}` : section.number}
          </span>
          <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
          <span>{section.category}</span>
          <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
          <span>NextSoftHR Global Standard</span>
        </div>

        {/* Copy Anchor Link Button */}
        <button
          type="button"
          onClick={handleCopyLink}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 hover:text-[#0A3B7B] dark:hover:text-[#38BDF8] transition-colors py-1 px-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
          title={`Copy link to Section ${section.number}`}
          aria-label={`Copy link to Section ${section.number}`}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#84CC16]" />
              <span className="text-[#84CC16] font-medium text-[11px]">Copied</span>
            </>
          ) : (
            <>
              <Link2 className="w-3.5 h-3.5" />
              <span className="text-[11px]">Copy Clause Link</span>
            </>
          )}
        </button>
      </div>

      {/* Section Title */}
      <h2 className="text-xl sm:text-2xl font-bold text-[#0A3B7B] dark:text-[#60A5FA] tracking-tight mb-2">
        {section.number}. {section.title}
      </h2>

      {/* Summary Kicker */}
      <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mb-6 italic">
        {section.summary}
      </p>

      {/* Lead Paragraphs */}
      <div className="space-y-4 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
        {section.content.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>

      {/* Subsections */}
      {section.subsections && section.subsections.length > 0 && (
        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-6">
          {section.subsections.map((sub, sIdx) => (
            <div key={sIdx} className="space-y-2">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[#84CC16] rounded-full inline-block" />
                <span>{sub.subtitle}</span>
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{sub.body}</p>

              {sub.bulletPoints && sub.bulletPoints.length > 0 && (
                <ul className="mt-3 space-y-2 pl-4 border-l-2 border-slate-200 dark:border-slate-700">
                  {sub.bulletPoints.map((point, pIdx) => (
                    <li key={pIdx} className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      <span className="text-[#0A3B7B] dark:text-[#38BDF8] font-bold mr-1.5">▪</span>
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Callout Banner (Warning, Important, Notice, Info) */}
      {section.callout && (
        <div
          className={`mt-6 p-4 rounded-xl border flex items-start gap-3.5 ${getCalloutClasses(
            section.callout.type
          )}`}
        >
          {getCalloutIcon(section.callout.type)}
          <div className="text-xs sm:text-sm leading-relaxed">
            {section.callout.title && (
              <div className="font-bold mb-1 tracking-tight">{section.callout.title}</div>
            )}
            <div>{section.callout.text}</div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {section.actions && section.actions.length > 0 && (
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-3">
          {section.actions.map((act, aIdx) => (
            <button
              key={aIdx}
              type="button"
              onClick={() => onActionClick(act.actionType)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0A3B7B] hover:bg-[#1E40AF] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all"
            >
              <span>{act.label}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#84CC16]" />
            </button>
          ))}
        </div>
      )}
    </article>
  );
};
