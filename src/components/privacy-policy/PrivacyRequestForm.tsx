import React, { useState } from 'react';
import {
  Send,
  CheckCircle2,
  Paperclip,
  X,
  FileText,
  AlertCircle,
  ShieldAlert
} from 'lucide-react';
import { PrivacyRequestPayload } from '../types/privacy';
import { Translations } from '../translations';

interface PrivacyRequestFormProps {
  initialType?: PrivacyRequestPayload['requestType'];
  onSuccess?: () => void;
  isInline?: boolean;
  t: Translations;
}

export const PrivacyRequestForm: React.FC<PrivacyRequestFormProps> = ({
  initialType = 'Access My Data',
  onSuccess,
  isInline = false,
  t,
}) => {
  const [formData, setFormData] = useState<PrivacyRequestPayload>({
    fullName: '',
    organization: '',
    email: '',
    requestType: initialType,
    message: '',
    attachmentName: '',
    consent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMsg('Attachment exceeds maximum 5MB size limit.');
        return;
      }
      setErrorMsg('');
      setFormData({ ...formData, attachmentName: file.name });
    }
  };

  const removeAttachment = () => {
    setFormData({ ...formData, attachmentName: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setErrorMsg('Please enter your full legal name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!formData.message.trim()) {
      setErrorMsg('Please describe your privacy request or inquiry.');
      return;
    }
    if (!formData.consent) {
      setErrorMsg('You must acknowledge identity verification and processing consent.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    // Simulate reliable network request
    setTimeout(() => {
      setIsSubmitting(false);
      const generatedId = `NS-PR-${Math.floor(100000 + Math.random() * 900000)}`;
      setTicketId(generatedId);
      setSubmitted(true);
      if (onSuccess) {
        onSuccess();
      }
    }, 700);
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      organization: '',
      email: '',
      requestType: 'Access My Data',
      message: '',
      attachmentName: '',
      consent: false,
    });
    setSubmitted(false);
    setTicketId('');
    setErrorMsg('');
  };

  if (submitted) {
    return (
      <div className={`p-6 sm:p-8 bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 rounded-xl text-center space-y-4 ${isInline ? 'my-4' : ''}`}>
        <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white">
            {t.requestForm.receivedTitle}
          </h4>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
            {t.requestForm.receivedDesc}
          </p>
        </div>

        <div className="inline-block px-4 py-2 bg-white dark:bg-[#0c1527] rounded-lg border border-emerald-200 dark:border-emerald-800 shadow-2xs text-xs font-mono text-slate-700 dark:text-slate-300">
          {t.requestForm.ticketRef} <strong className="text-emerald-700 dark:text-emerald-400 font-bold">{ticketId}</strong>
        </div>

        <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
          {t.requestForm.statutoryTime}
        </p>

        <div className="pt-2">
          <button
            onClick={resetForm}
            className="px-4 py-2 text-xs font-semibold text-[#0F52BA] dark:text-[#60A5FA] hover:bg-white dark:hover:bg-[#0c1527] rounded-lg border border-[#0F52BA]/30 transition-colors"
          >
            {t.requestForm.submitAnother}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-4 ${isInline ? 'bg-white dark:bg-[#0c1527] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs' : ''}`}
    >
      {errorMsg && (
        <div className="p-3 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-lg flex items-center gap-2 text-xs text-rose-700 dark:text-rose-400">
          <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            {t.requestForm.fullNameLabel} <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder={t.requestForm.fullNamePlaceholder}
            className="w-full px-3 py-2 text-xs bg-slate-50/70 dark:bg-[#080d19] border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-[#0c1527] focus:border-[#0F52BA] dark:focus:border-[#60A5FA] outline-none transition-all"
          />
        </div>

        {/* Business / Organization */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            {t.requestForm.orgLabel}
          </label>
          <input
            type="text"
            value={formData.organization}
            onChange={(e) =>
              setFormData({ ...formData, organization: e.target.value })
            }
            placeholder={t.requestForm.orgPlaceholder}
            className="w-full px-3 py-2 text-xs bg-slate-50/70 dark:bg-[#080d19] border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-[#0c1527] focus:border-[#0F52BA] dark:focus:border-[#60A5FA] outline-none transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Email Address */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            {t.requestForm.emailLabel} <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder={t.requestForm.emailPlaceholder}
            className="w-full px-3 py-2 text-xs bg-slate-50/70 dark:bg-[#080d19] border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-[#0c1527] focus:border-[#0F52BA] dark:focus:border-[#60A5FA] outline-none transition-all"
          />
        </div>

        {/* Request Type */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            {t.requestForm.typeLabel} <span className="text-rose-500">*</span>
          </label>
          <select
            value={formData.requestType}
            onChange={(e) =>
              setFormData({
                ...formData,
                requestType: e.target.value as PrivacyRequestPayload['requestType'],
              })
            }
            className="w-full px-3 py-2 text-xs bg-slate-50/70 dark:bg-[#080d19] border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:bg-white dark:focus:bg-[#0c1527] focus:border-[#0F52BA] dark:focus:border-[#60A5FA] outline-none transition-all"
          >
            <option value="Access My Data">{t.requestForm.types.access}</option>
            <option value="Correct My Data">{t.requestForm.types.correct}</option>
            <option value="Delete My Data">{t.requestForm.types.delete}</option>
            <option value="Privacy Question">{t.requestForm.types.question}</option>
            <option value="Data Security Concern">{t.requestForm.types.security}</option>
            <option value="Other">{t.requestForm.types.other}</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          {t.requestForm.messageLabel} <span className="text-rose-500">*</span>
        </label>
        <textarea
          rows={4}
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder={t.requestForm.messagePlaceholder}
          className="w-full px-3 py-2 text-xs bg-slate-50/70 dark:bg-[#080d19] border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-[#0c1527] focus:border-[#0F52BA] dark:focus:border-[#60A5FA] outline-none transition-all"
        />
      </div>

      {/* Attachment Simulator */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          {t.requestForm.attachLabel}
        </label>
        <div className="flex items-center gap-3">
          <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors">
            <Paperclip className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span>{t.requestForm.attachButton}</span>
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
              className="sr-only"
            />
          </label>
          {formData.attachmentName && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 text-xs bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-[#0F52BA] dark:text-[#60A5FA] rounded-md">
              <FileText className="w-3 h-3" />
              <span className="truncate max-w-[160px] font-mono text-[11px]">
                {formData.attachmentName}
              </span>
              <button
                type="button"
                onClick={removeAttachment}
                className="hover:text-rose-600 transition-colors"
                title="Remove attachment"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Consent Checkbox */}
      <div className="pt-1">
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.consent}
            onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 dark:border-slate-700 text-[#0F52BA] dark:text-[#60A5FA] focus:ring-[#0F52BA]"
          />
          <span className="text-[11px] text-slate-600 dark:text-slate-400 leading-normal">
            {t.requestForm.consentText}
          </span>
        </label>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-white bg-[#0F52BA] hover:bg-[#0A3982] active:scale-[0.99] rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
        >
          {isSubmitting ? (
            <span>{t.requestForm.submittingBtn}</span>
          ) : (
            <>
              <Send className="w-3.5 h-3.5" />
              <span>{t.requestForm.submitBtn}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

interface PrivacyRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: PrivacyRequestPayload['requestType'];
  t: Translations;
}

export const PrivacyRequestModal: React.FC<PrivacyRequestModalProps> = ({
  isOpen,
  onClose,
  defaultType,
  t,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <div className="relative w-full max-w-xl bg-white dark:bg-[#0c1527] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between bg-slate-50/80 dark:bg-[#090e1a]/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/50 flex items-center justify-center text-[#0F52BA] dark:text-[#60A5FA]">
              <ShieldAlert className="w-4 h-4 text-[#0F52BA] dark:text-[#60A5FA]" />
            </div>
            <div>
              <h3 id="privacy-modal-title" className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                {t.nav.privacyDesk}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {t.hero.badge}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[75vh] overflow-y-auto">
          <PrivacyRequestForm initialType={defaultType} onSuccess={() => {}} t={t} />
        </div>
      </div>
    </div>
  );
};
