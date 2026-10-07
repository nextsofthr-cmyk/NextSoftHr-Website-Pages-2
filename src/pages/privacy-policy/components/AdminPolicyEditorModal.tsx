import React, { useState } from 'react';
import { X, Check, Save, RotateCcw, Sliders } from 'lucide-react';
import { Translations } from '../translations';

interface AdminPolicyEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  lastUpdatedDate: string;
  version: string;
  onSave: (date: string, ver: string) => void;
  t: Translations;
}

export const AdminPolicyEditorModal: React.FC<AdminPolicyEditorModalProps> = ({
  isOpen,
  onClose,
  lastUpdatedDate,
  version,
  onSave,
  t,
}) => {
  const [dateVal, setDateVal] = useState(lastUpdatedDate);
  const [versionVal, setVersionVal] = useState(version);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(dateVal, versionVal);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  const handleResetDefaults = () => {
    setDateVal('September 24, 2026');
    setVersionVal('Version 2.4');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-editor-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <div className="relative w-full max-w-lg bg-white dark:bg-[#0c1527] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between bg-slate-50/80 dark:bg-[#090e1a]/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0F52BA] flex items-center justify-center text-white">
              <Sliders className="w-4 h-4 text-[#84CC16]" />
            </div>
            <div>
              <h3 id="admin-editor-title" className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                {t.adminModal.title}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {t.adminModal.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleApply} className="p-6 space-y-4">
          <div className="p-3 bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 rounded-lg text-xs text-slate-600 dark:text-slate-300">
            {t.adminModal.banner}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {t.adminModal.dateLabel}
            </label>
            <input
              type="text"
              value={dateVal}
              onChange={(e) => setDateVal(e.target.value)}
              placeholder="e.g. September 24, 2026"
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-[#080d19] border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:bg-white dark:focus:bg-[#0c1527] focus:border-[#0F52BA] outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {t.adminModal.versionLabel}
            </label>
            <input
              type="text"
              value={versionVal}
              onChange={(e) => setVersionVal(e.target.value)}
              placeholder="e.g. Version 2.4"
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-[#080d19] border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:bg-white dark:focus:bg-[#0c1527] focus:border-[#0F52BA] outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3 text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-[#080d19] p-3 rounded-lg border border-slate-200 dark:border-slate-800">
            <div>
              <span className="font-semibold text-slate-700 dark:text-slate-300 block">{t.adminModal.orgLabel}</span>
              <span>NextSoftHR Global Ltd.</span>
            </div>
            <div>
              <span className="font-semibold text-slate-700 dark:text-slate-300 block">{t.adminModal.hotlineLabel}</span>
              <span>+2349158482622</span>
            </div>
          </div>

          {savedSuccess && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 rounded-lg flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-300">
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{t.adminModal.savedNotice}</span>
            </div>
          )}

          <div className="pt-2 flex items-center justify-between">
            <button
              type="button"
              onClick={handleResetDefaults}
              className="px-3 py-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{t.adminModal.resetBtn}</span>
            </button>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                {t.adminModal.cancelBtn}
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-[#0F52BA] hover:bg-[#0A3982] rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{t.adminModal.applyBtn}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
