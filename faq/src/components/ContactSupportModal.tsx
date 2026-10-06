import React, { useState } from 'react';
import { X, Headphones, Send, CheckCircle2, MessageSquare, ShieldCheck, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ContactSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactSupportModal: React.FC<ContactSupportModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'Technical Support',
    priority: 'Normal',
    message: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketId(`NS-${Math.floor(100000 + Math.random() * 900000)}`);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#0B132B] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors">
        
        {/* Header */}
        <div className="px-6 py-5 bg-linear-to-r from-blue-900 to-slate-900 text-white flex items-center justify-between border-b border-blue-950">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-lime-400 text-slate-950 flex items-center justify-center">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">{t('support.title', 'Contact NextSoftHR Support')}</h3>
              <p className="text-xs text-slate-300">{t('support.sub', 'Live 24/7 human technical & advisory assistance')}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-lime-100 dark:bg-lime-950/60 text-lime-700 dark:text-lime-400 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-lime-600 dark:text-lime-400" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white">{t('support.successTitle', 'Support Ticket Created')}</h4>
            <div className="inline-block px-3 py-1 rounded bg-slate-100 dark:bg-[#111F42] font-mono text-xs font-bold text-blue-700 dark:text-lime-400 border border-slate-200 dark:border-slate-700">
              Ticket #{ticketId}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-sm mx-auto">
              {t('support.successDesc', 'Thank you, {name}. Your ticket has been assigned to our senior engineering and advisory queue. A specialist will reply to {email} shortly.', { name: formData.name, email: formData.email })}
            </p>
            <div className="text-xs text-slate-400">
              {t('support.slaNotice', 'Average response time: under 15 minutes')}
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-colors"
            >
              {t('support.close', 'Done')}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t('support.name', 'Your Name')} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t('support.namePlaceholder', 'e.g. David Mensah')}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-[#111F42] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-blue-600 focus:bg-white dark:focus:bg-[#162752] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t('support.email', 'Work Email')} *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={t('support.emailPlaceholder', 'david@company.com')}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-[#111F42] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-blue-600 focus:bg-white dark:focus:bg-[#162752] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t('support.inquiryType', 'Inquiry Category')}
                </label>
                <select
                  value={formData.inquiryType}
                  onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-[#111F42] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:bg-white dark:focus:bg-[#162752] focus:outline-none"
                >
                  <option value="Technical Support">{t('support.typeTechnical', 'Technical Support')}</option>
                  <option value="Payroll Calculation Assistance">{t('support.typePayroll', 'Payroll Calculation Assistance')}</option>
                  <option value="Billing & Subscription">{t('support.typeBilling', 'Billing & Subscription')}</option>
                  <option value="Data Migration & Onboarding">{t('support.typeOnboarding', 'Data Migration & Onboarding')}</option>
                  <option value="Security & Compliance Query">{t('support.typeSecurity', 'Security & Compliance Query')}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t('support.priority', 'Priority Level')}
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-[#111F42] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:bg-white dark:focus:bg-[#162752] focus:outline-none"
                >
                  <option value="Normal">{t('support.priorityNormal', 'Normal (Standard assistance)')}</option>
                  <option value="High">{t('support.priorityHigh', 'High (Urgent operational issue)')}</option>
                  <option value="Urgent">{t('support.priorityUrgent', 'Urgent (System blocker / payroll cutoff)')}</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {t('support.message', 'Detailed Message')} *
              </label>
              <textarea
                rows={3}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder={t('support.messagePlaceholder', 'Describe your question or issue in detail...')}
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-[#111F42] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-blue-600 focus:bg-white dark:focus:bg-[#162752] focus:outline-none resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-lime-300" />
                <span>{t('support.submit', 'Submit Support Request')}</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400" />
              <span>Direct routing to NextSoftHR operations desk</span>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
