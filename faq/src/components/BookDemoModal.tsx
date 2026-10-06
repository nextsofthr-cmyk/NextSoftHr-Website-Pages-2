import React, { useState } from 'react';
import { X, Calendar, CheckCircle2, Building, Mail, User, Globe, ArrowRight, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface BookDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookDemoModal: React.FC<BookDemoModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    employees: '21-100',
    country: 'Nigeria',
    primaryInterest: 'Comprehensive HR & Automated Payroll',
    preferredDate: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#0B132B] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors">
        
        {/* Header */}
        <div className="px-6 py-5 bg-linear-to-r from-blue-900 to-slate-900 text-white flex items-center justify-between border-b border-blue-950">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-lime-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-lime-300">
                {t('demo.badge', 'NextSoftHR Demonstration')}
              </span>
            </div>
            <h3 className="text-lg font-bold">{t('demo.title', 'Schedule Your 1-on-1 Product Demo')}</h3>
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
            <h4 className="text-xl font-bold text-slate-900 dark:text-white">{t('demo.successTitle', 'Demo Session Requested!')}</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-sm mx-auto">
              {t('demo.successDesc', 'Thank you, {name}. A NextSoftHR solutions architect has reserved your demonstration and sent a calendar invite to {email}.', { name: formData.fullName, email: formData.email })}
            </p>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#111F42] border border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4 text-lime-600 dark:text-lime-400" />
              <span>{t('demo.calendarInvite', 'Google Calendar & Outlook invite delivered')}</span>
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-colors"
            >
              {t('demo.close', 'Close Window')}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t('demo.fullName', 'Full Name')} *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder={t('demo.fullNamePlaceholder', 'e.g. Sarah Jenkins')}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 dark:bg-[#111F42] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-blue-600 focus:bg-white dark:focus:bg-[#162752] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t('demo.workEmail', 'Work Email')} *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t('demo.workEmailPlaceholder', 'name@company.com')}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 dark:bg-[#111F42] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-blue-600 focus:bg-white dark:focus:bg-[#162752] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t('demo.companyName', 'Company Name')} *
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder={t('demo.companyPlaceholder', 'Acme Global Ltd')}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 dark:bg-[#111F42] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-blue-600 focus:bg-white dark:focus:bg-[#162752] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t('demo.orgSize', 'Organization Size')}
                </label>
                <select
                  value={formData.employees}
                  onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-[#111F42] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:bg-white dark:focus:bg-[#162752] focus:outline-none"
                >
                  <option value="1-20">1 - 20 employees (Micro)</option>
                  <option value="21-100">21 - 100 employees (Small)</option>
                  <option value="101-500">101 - 500 employees (Medium)</option>
                  <option value="500+">500+ employees (Enterprise)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {t('demo.primaryInterest', 'Primary Area of Interest')}
              </label>
              <select
                value={formData.primaryInterest}
                onChange={(e) => setFormData({ ...formData, primaryInterest: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-[#111F42] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:bg-white dark:focus:bg-[#162752] focus:outline-none"
              >
                <option value="Comprehensive HR & Automated Payroll">{t('demo.interestAll', 'Comprehensive HR & Automated Payroll')}</option>
                <option value="Statutory Multi-Country Payroll">{t('demo.interestPayroll', 'Statutory Multi-Country Payroll')}</option>
                <option value="Time, Attendance & Shift Scheduling">{t('demo.interestTime', 'Time, Attendance & Shift Scheduling')}</option>
                <option value="Payroll Outsourcing & HR Advisory">{t('demo.interestOutsourcing', 'Payroll Outsourcing & HR Advisory')}</option>
              </select>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>{t('demo.submit', 'Confirm Demo Reservation')}</span>
                <ArrowRight className="w-4 h-4 text-lime-300" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400" />
              <span>Zero commitment · No credit card required · NDA protected</span>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
