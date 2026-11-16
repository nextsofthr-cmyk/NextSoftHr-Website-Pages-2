import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Calendar,
  Lock,
  ArrowRight,
  Building,
  Mail,
  User,
  Phone,
  Globe,
  Eye,
  EyeOff,
  MessageCircle,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TwoStepVerification } from '../../../components/TwoStepVerification';
import {
  ALL_WORLD_COUNTRIES,
  MODAL_PLAN_OPTIONS,
  ORGANIZATION_SIZE_OPTIONS,
  PRIMARY_BUSINESS_INDUSTRY_OPTIONS,
  WORLD_COUNTRY_DIAL_CODES,
} from '../../../data/worldCountries';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TrialModalProps extends ModalProps {
  initialPlan?: string;
  employeeCount?: number;
  onStartQuickStart?: (data: {
    companyName: string;
    fullName: string;
    workEmail: string;
    teamSize: string;
    plan: string;
    phone?: string;
  }) => void;
}

export const TrialModal: React.FC<TrialModalProps> = ({
  isOpen,
  onClose,
  initialPlan = 'Growth',
  onStartQuickStart,
}) => {
  const { tx } = useLanguage();
  const [step, setStep] = useState<'form' | 'otp' | 'submitted'>('form');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    companyName: '',
    webAddress: '',
    phone: '',
    password: '',
    confirmPassword: '',
    plan: initialPlan,
    primaryIndustry: '1 Location (Single Store)',
    country: 'Nigeria',
    teamSize: '1 – 25 Employees',
  });

  useEffect(() => {
    if (initialPlan) {
      const matched = MODAL_PLAN_OPTIONS.find(
        (p) => p.name.toLowerCase() === initialPlan.toLowerCase()
      );
      setFormData((prev) => ({
        ...prev,
        plan: matched ? matched.name : initialPlan,
      }));
    }
  }, [initialPlan]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError(tx('Passwords do not match. Please confirm your password.'));
      return;
    }
    setError('');
    setStep('otp');
  };

  const handleLaunchQuickStart = () => {
    onClose();
    if (onStartQuickStart) {
      onStartQuickStart(formData);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0B132B] rounded-3xl max-w-[840px] w-full p-6 sm:p-8 md:p-10 shadow-2xl border border-slate-200 dark:border-slate-800 relative max-h-[92vh] overflow-y-auto transition-colors">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'submitted' ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-2xl bg-lime-100 dark:bg-lime-950/60 text-[#65A30D] dark:text-[#A3E635] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
              {tx('Workspace Ready!')}
            </h3>
            <p className="mt-2 text-slate-600 dark:text-slate-300 text-sm leading-relaxed max-w-sm mx-auto">
              {tx('We have dispatched your instant trial activation link to')}{' '}
              <strong className="text-slate-900 dark:text-white">
                {formData.workEmail || tx('your email')}
              </strong>{' '}
              ({formData.webAddress || 'acme'}.scriptmaster.store).
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-2 justify-center">
              <button
                type="button"
                id="trial-start-wizard-btn"
                onClick={handleLaunchQuickStart}
                className="px-5 py-2.5 rounded-xl font-bold text-slate-950 bg-[#A3E635] hover:bg-[#84CC16] text-sm flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Sparkles className="w-4 h-4 fill-slate-950" />
                <span>{tx('Configure Company Profile (Quick Start)')}</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm cursor-pointer"
              >
                {tx('Close')}
              </button>
            </div>
          </div>
        ) : step === 'otp' ? (
          <div className="py-2">
            <TwoStepVerification
              embedded
              onVerifySuccess={() => setStep('submitted')}
              onBack={() => setStep('form')}
              backLabel={tx('Back to Sign In')}
            />
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#0265DC] dark:text-blue-300 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#65A30D] dark:text-[#A3E635]" />
              <span>{tx('Instant Access • No Card Required')}</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-[#0B132B] dark:text-white">
              {tx('Start Your Free Trial')}
            </h3>

            {error && (
              <div className="mt-3 p-2.5 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-xs font-medium text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              {/* 1. Selected Plan (3x3 Grid from Image 1) */}
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                  {tx('Selected Plan')}
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {MODAL_PLAN_OPTIONS.map((p) => {
                    const isSelected = formData.plan.toLowerCase() === p.name.toLowerCase();
                    return (
                      <button
                        type="button"
                        key={p.id}
                        onClick={() => setFormData({ ...formData, plan: p.name })}
                        className={`py-2.5 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-blue-50/90 dark:bg-blue-950/60 border-[#0265DC] dark:border-blue-400 ring-2 ring-[#0265DC]/20 shadow-xs'
                            : 'bg-white dark:bg-[#111C38] border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                        }`}
                      >
                        <div
                          className={`text-xs font-bold ${
                            isSelected ? 'text-[#0265DC] dark:text-white' : 'text-slate-800 dark:text-slate-200'
                          }`}
                        >
                          {p.name}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">
                          {p.priceLabel}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Full Name & Work Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {tx('Full Name')} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      required
                      type="text"
                      placeholder={tx('e.g. Elena Rostova')}
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111C38] text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0265DC]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {tx('Work Email')} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      required
                      type="email"
                      placeholder={tx('elena@company.com')}
                      value={formData.workEmail}
                      onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111C38] text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0265DC]"
                    />
                  </div>
                </div>
              </div>

              {/* Phone Number & Company Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {tx('Phone Number')} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      required
                      type="tel"
                      placeholder="+234 800 000 0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111C38] text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0265DC]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {tx('Company Name')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    placeholder={tx('Acme Corp')}
                    value={formData.companyName}
                    onChange={(e) => {
                      const companyName = e.target.value;
                      const slug = companyName.toLowerCase().replace(/[^a-z0-9]/g, '');
                      setFormData({
                        ...formData,
                        companyName,
                        webAddress: formData.webAddress || slug,
                      });
                    }}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111C38] text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0265DC]"
                  />
                </div>
              </div>

              {/* Row 3: Web address * & Country * */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    {tx('Web address')} <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-stretch rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111C38] overflow-hidden focus-within:ring-2 focus-within:ring-[#0265DC]">
                    <input
                      required
                      type="text"
                      placeholder="acme"
                      value={formData.webAddress}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          webAddress: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''),
                        })
                      }
                      className="flex-1 min-w-0 px-3.5 py-2.5 text-sm bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
                    />
                    <span className="px-3.5 py-2.5 bg-slate-100 dark:bg-[#070D1E] border-l border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center whitespace-nowrap">
                      .scriptmaster.store
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    {tx('Country')} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#0265DC] bg-white dark:bg-[#111C38] text-slate-900 dark:text-white"
                    >
                      {ALL_WORLD_COUNTRIES.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Row 4: Primary Business Industry & Organization Size (Spacious 2-Column Row) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    {tx('Primary Business Industry')}
                  </label>
                  <select
                    value={formData.primaryIndustry}
                    onChange={(e) => setFormData({ ...formData, primaryIndustry: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#0265DC] bg-white dark:bg-[#111C38] text-slate-900 dark:text-white"
                  >
                    {PRIMARY_BUSINESS_INDUSTRY_OPTIONS.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    {tx('Organization Size')}
                  </label>
                  <select
                    value={formData.teamSize}
                    onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#0265DC] bg-white dark:bg-[#111C38] text-slate-900 dark:text-white"
                  >
                    {ORGANIZATION_SIZE_OPTIONS.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 5: Password & Confirm Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    {tx('Password')} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      required
                      type={showPassword ? 'text' : 'password'}
                      placeholder={tx('Create password')}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111C38] text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0265DC]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    {tx('Confirm Password')} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      required
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder={tx('Confirm password')}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111C38] text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0265DC]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3.5 rounded-xl font-bold text-slate-950 bg-[#A3E635] hover:bg-[#84CC16] shadow-md shadow-lime-500/20 text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{tx('Activate Free Trial')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500 mt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{tx('Your company data is strictly private & encrypted')}</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export const DemoModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { tx } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [focusArea, setFocusArea] = useState('All-in-One Platform');
  const [dialCode, setDialCode] = useState('+234');
  const [phone, setPhone] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0B132B] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative overflow-hidden transition-colors">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-[#0265DC] dark:text-blue-300 flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8" />
            </div>
            <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white">{tx("Demo Scheduled!")}</h3>
            <p className="mt-2 text-slate-600 dark:text-slate-300 text-sm leading-relaxed max-w-sm mx-auto">{tx("A NextSofthr workforce solutions architect will connect with you to demonstrate")}{' '}
              <strong className="text-slate-900 dark:text-white">{focusArea}</strong>{' '}{tx("tailored to your team.")}</p>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2.5 rounded-xl font-bold text-white bg-[#0265DC] hover:bg-[#004DB3] text-sm cursor-pointer"
            >{tx("Done")}</button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#0265DC] dark:text-blue-300 uppercase tracking-wider mb-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{tx("30-Minute Personalized Walkthrough")}</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-[#0B132B] dark:text-white">{tx("Book a Live Demo")}</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">{tx("Explore how NextSofthr streamlines payroll, shifts, and HR operations for your specific industry.")}</p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="mt-6 space-y-3.5"
            >
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{tx("Work Email")}</label>
                <input
                  required
                  type="email"
                  placeholder={tx("name@company.com")}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111C38] text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0265DC]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{tx("Primary Interest / Focus Area")}</label>
                <select
                  value={focusArea}
                  onChange={(e) => setFocusArea(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#0265DC] bg-white dark:bg-[#111C38] text-slate-900 dark:text-white"
                >
                  <option value="All-in-One Platform">{tx("All-in-One Platform (HR + Payroll + Attendance)")}</option>
                  <option value="Advanced Payroll & Multi-Tax">{tx("Advanced Payroll & Multi-Tax Rules")}</option>
                  <option value="Attendance & Shift Scheduling">{tx("Attendance & Shift Scheduling")}</option>
                  <option value="AI HR & Payroll Copilot">{tx("AI HR & Payroll Copilot")}</option>
                  <option value="Multi-Company & Global Teams">{tx("Multi-Company & Global Teams")}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{tx("Phone Number")}</label>
                <div className="flex items-stretch rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111C38] overflow-hidden focus-within:ring-2 focus-within:ring-[#0265DC]">
                  <select
                    aria-label="Country dialing code"
                    value={dialCode}
                    onChange={(e) => setDialCode(e.target.value)}
                    className="w-40 sm:w-48 px-2.5 py-2.5 text-xs font-semibold bg-slate-50 dark:bg-[#070D1E] border-r border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer truncate"
                  >
                    {WORLD_COUNTRY_DIAL_CODES.map((item) => (
                      <option key={`${item.country}-${item.dialCode}`} value={item.dialCode}>
                        {item.country} ({item.dialCode})
                      </option>
                    ))}
                  </select>
                  <div className="relative flex-1 min-w-0 flex items-center">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                    <input
                      required
                      type="tel"
                      placeholder="803 123 4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3.5 rounded-xl font-bold text-white bg-[#0265DC] hover:bg-[#004DB3] shadow-md shadow-blue-500/20 text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{tx("Confirm Product Demo")}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/2349158482622?text=Hello%20NextSofthr%20Team%2C%20I%20would%20like%20to%20book%20a%20live%20product%20demo."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl border border-emerald-200 dark:border-emerald-800/70 bg-emerald-50/80 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 fill-current" />
                <span>{tx("Chat with Us on WhatsApp for Instant Demo")}</span>
              </a>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export const ContactSalesModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { tx } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0B132B] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative overflow-hidden transition-colors">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-[#0265DC] dark:text-blue-300 flex items-center justify-center mx-auto mb-4">
              <Building className="w-8 h-8" />
            </div>
            <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white">{tx("Inquiry Received")}</h3>
            <p className="mt-2 text-slate-600 dark:text-slate-300 text-sm leading-relaxed max-w-sm mx-auto">{tx("Our Enterprise Solutions Director will review your multi-entity requirements and contact you directly.")}</p>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2.5 rounded-xl font-bold text-white bg-[#0265DC] hover:bg-[#004DB3] text-sm"
            >{tx("Close")}</button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#0265DC] dark:text-blue-300 uppercase tracking-wider mb-1">
              <Building className="w-3.5 h-3.5" />
              <span>{tx("Enterprise & Custom Deployments")}</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-[#0B132B] dark:text-white">{tx("Contact Enterprise Sales")}</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">{tx("Direct line:")}{' '}<a href="tel:+2349158482622" className="text-[#0265DC] dark:text-blue-300 font-bold">+2349158482622</a>
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="mt-6 space-y-3.5"
            >
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{tx("Work Email")}</label>
                <input
                  required
                  type="email"
                  placeholder={tx("director@enterprise.com")}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111C38] text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0265DC]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{tx("Approximate Total Workforce Count")}</label>
                <input
                  required
                  type="text"
                  placeholder={tx("e.g. 1,500 employees across 4 subsidiaries")}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111C38] text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0265DC]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{tx("Special Requirements (SSO, Multi-Country, Custom SLA)")}</label>
                <textarea
                  rows={3}
                  placeholder={tx("Describe any custom integrations, data migration needs, or compliance policies...")}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111C38] text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0265DC]"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3.5 rounded-xl font-bold text-white bg-slate-900 dark:bg-[#0265DC] hover:bg-slate-800 dark:hover:bg-[#004DB3] text-sm transition-all"
              >{tx("Submit Enterprise Request")}</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export const SecurityModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { tx } = useLanguage();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0B132B] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative max-h-[90vh] overflow-y-auto transition-colors">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-bold text-[#0265DC] dark:text-blue-300 uppercase tracking-wider mb-1">
          <ShieldCheck className="w-4 h-4 text-[#65A30D] dark:text-[#A3E635]" />
          <span>{tx("Security Architecture & Governance")}</span>
        </div>
        <h3 className="font-display text-2xl font-bold text-[#0B132B] dark:text-white">{tx("Enterprise Protection Standards")}</h3>

        <div className="mt-6 space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#111C38] border border-slate-200 dark:border-slate-800">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{tx("Data Encryption at Rest and Transit")}</h4>
            <p>{tx("All workforce databases, employee identity numbers, and bank account numbers are encrypted at rest using military-grade AES-256 encryption. Network communications are enforced over TLS 1.3 with automated certificate rotation.")}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#111C38] border border-slate-200 dark:border-slate-800">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{tx("Role-Based Access Control (RBAC)")}</h4>
            <p>{tx("Strict internal isolation ensures that department supervisors only view team member timesheets without salary visibility. Full payroll calculations and disbursements require designated finance authorizations.")}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#111C38] border border-slate-200 dark:border-slate-800">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{tx("Immutable Audit Logging")}</h4>
            <p>{tx("Every salary modification, attendance adjustment, leave approval, and user authentication event generates an unalterable audit log timestamped with IP address and user credentials.")}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#111C38] border border-slate-200 dark:border-slate-800">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{tx("Disaster Recovery & Geo-Redundancy")}</h4>
            <p>{tx("Automated snapshot backups are scheduled continuously across geo-distributed cloud clusters, maintaining a target Recovery Point Objective (RPO) under 15 minutes.")}</p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >{tx("Close")}</button>
        </div>
      </div>
    </div>
  );
};
