import React, { useState } from 'react';
import { X, Building2, User, Mail, Globe, Phone, Sparkles, Lock, Eye, EyeOff } from 'lucide-react';
import NextSofthrLogo from './NextSofthrLogo';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import { useToast } from './ToastNotification';
import {
  ALL_WORLD_COUNTRIES,
  MODAL_PLAN_OPTIONS,
  ORGANIZATION_SIZE_OPTIONS,
  PRIMARY_BUSINESS_INDUSTRY_OPTIONS,
} from '../../../data/worldCountries';

interface CreateAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (email: string) => void;
}

export const CreateAccountModal: React.FC<CreateAccountModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    selectedPlan: 'Growth',
    fullName: '',
    workEmail: '',
    phone: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    webAddress: '',
    primaryIndustry: '1 Location (Single Store)',
    companySize: '1 – 25 Employees',
    country: 'Nigeria',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpStep, setOtpStep] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.fullName.trim() ||
      !formData.workEmail.trim() ||
      !formData.phone.trim() ||
      !formData.companyName.trim() ||
      !formData.webAddress.trim()
    ) {
      const msg = 'Please fill out all required fields.';
      setError(msg);
      toast.error(msg, { title: 'Required Fields Missing' });
      return;
    }
    if (!formData.workEmail.includes('@')) {
      const msg = 'Please enter a valid work email address.';
      setError(msg);
      toast.error(msg, { title: 'Invalid Email' });
      return;
    }
    if (formData.password.length < 6) {
      const msg = 'Password must be at least 6 characters.';
      setError(msg);
      toast.error(msg, { title: 'Weak Password' });
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      const msg = 'Passwords do not match. Please confirm your password.';
      setError(msg);
      toast.error(msg, { title: 'Password Mismatch' });
      return;
    }

    setError('');
    setOtpStep(true);
  };

  const handleOtpSuccess = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(
        `Welcome to NextSofthr! Your ${formData.selectedPlan} workspace (${formData.webAddress}.scriptmaster.store) is ready.`,
        {
          title: 'Account Created',
        }
      );
      onSuccess(formData.workEmail);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-[840px] bg-white dark:bg-[#0f1c33] rounded-3xl shadow-2xl border border-slate-100 dark:border-white/10 p-6 sm:p-8 md:p-10 overflow-hidden max-h-[92vh] overflow-y-auto transition-colors">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0056b3] via-[#004494] to-[#caff33]" />

        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:text-slate-400 dark:hover:text-white p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {otpStep ? (
          <div className="py-2">
            <TwoStepVerification
              embedded
              onVerifySuccess={handleOtpSuccess}
              onBack={() => setOtpStep(false)}
              backLabel="Back to Sign In"
            />
          </div>
        ) : (
        <>
        <div className="flex items-center justify-between mb-4 pr-8">
          <NextSofthrLogo size="sm" showTagline={false} />
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#caff33]/30 text-[#003366] dark:text-[#caff33] text-xs font-bold border border-[#caff33]/80">
            <Sparkles className="w-3 h-3 text-[#0056b3] dark:text-[#caff33]" />
            14-Day Free Trial
          </span>
        </div>

        <h3 className="text-xl font-bold text-[#0b1528] dark:text-white tracking-tight">
          Create your NextSofthr workspace
        </h3>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Get full access to African payroll compliance, HR management, time-tracking and AI insights. No credit card required.
        </p>

        {error && (
          <div className="mt-3 p-2.5 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-xs font-medium text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* 1. Selected Plan (3x3 Grid from Image 1) */}
          <div>
            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
              Selected Plan
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {MODAL_PLAN_OPTIONS.map((plan) => {
                const isSelected = formData.selectedPlan === plan.name;
                return (
                  <button
                    type="button"
                    key={plan.id}
                    onClick={() => setFormData({ ...formData, selectedPlan: plan.name })}
                    className={`py-2.5 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50/90 dark:bg-[#0056b3]/30 border-[#0056b3] dark:border-[#38bdf8] ring-2 ring-[#0056b3]/20 shadow-xs'
                        : 'bg-white dark:bg-[#162542] border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
                    }`}
                  >
                    <div
                      className={`text-xs font-bold ${
                        isSelected ? 'text-[#0056b3] dark:text-white' : 'text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      {plan.name}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">
                      {plan.priceLabel}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Full Name & Work Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 dark:text-slate-500" />
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Oluwaseun Adeleke"
                  className="w-full pl-10 pr-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-[#162542] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-[#0056b3] dark:focus:border-[#60a5fa] focus:ring-2 focus:ring-[#0056b3]/15 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                Work Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 dark:text-slate-500" />
                <input
                  type="email"
                  required
                  value={formData.workEmail}
                  onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                  placeholder="you@company.com"
                  className="w-full pl-10 pr-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-[#162542] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-[#0056b3] dark:focus:border-[#60a5fa] focus:ring-2 focus:ring-[#0056b3]/15 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Phone Number & Company Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 dark:text-slate-500" />
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+234 800 000 0000"
                  className="w-full pl-10 pr-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-[#162542] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-[#0056b3] dark:focus:border-[#60a5fa] focus:ring-2 focus:ring-[#0056b3]/15 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                Company Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Building2 className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 dark:text-slate-500" />
                <input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={(e) => {
                    const name = e.target.value;
                    const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '');
                    setFormData({
                      ...formData,
                      companyName: name,
                      webAddress: formData.webAddress || slug,
                    });
                  }}
                  placeholder="e.g. Acme Corporation"
                  className="w-full pl-10 pr-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-[#162542] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-[#0056b3] dark:focus:border-[#60a5fa] focus:ring-2 focus:ring-[#0056b3]/15 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Row 3: Web address * & Country * */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                Web address <span className="text-red-500">*</span>
              </label>
              <div className="flex items-stretch rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-[#162542] overflow-hidden focus-within:border-[#0056b3] dark:focus-within:border-[#60a5fa] focus-within:ring-2 focus-within:ring-[#0056b3]/15">
                <input
                  type="text"
                  required
                  value={formData.webAddress}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      webAddress: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''),
                    })
                  }
                  placeholder="acme"
                  className="flex-1 min-w-0 px-3.5 py-2.5 text-sm bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none"
                />
                <span className="px-3.5 py-2.5 bg-slate-100 dark:bg-[#0d182c] border-l border-slate-200 dark:border-white/10 text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center whitespace-nowrap">
                  .scriptmaster.store
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                Country <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Globe className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#162542] text-slate-900 dark:text-white focus:border-[#0056b3] dark:focus:border-[#60a5fa] focus:ring-2 focus:ring-[#0056b3]/15 focus:outline-none"
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
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                Primary Business Industry
              </label>
              <select
                value={formData.primaryIndustry}
                onChange={(e) => setFormData({ ...formData, primaryIndustry: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#162542] text-slate-900 dark:text-white focus:border-[#0056b3] dark:focus:border-[#60a5fa] focus:ring-2 focus:ring-[#0056b3]/15 focus:outline-none"
              >
                {PRIMARY_BUSINESS_INDUSTRY_OPTIONS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                Organization Size
              </label>
              <select
                value={formData.companySize}
                onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#162542] text-slate-900 dark:text-white focus:border-[#0056b3] dark:focus:border-[#60a5fa] focus:ring-2 focus:ring-[#0056b3]/15 focus:outline-none"
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
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 dark:text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Create password"
                  className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-[#162542] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-[#0056b3] dark:focus:border-[#60a5fa] focus:ring-2 focus:ring-[#0056b3]/15 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 dark:text-slate-500" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Confirm password"
                  className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-[#162542] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-[#0056b3] dark:focus:border-[#60a5fa] focus:ring-2 focus:ring-[#0056b3]/15 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {formData.password.length > 0 && (
            <PasswordStrengthMeter password={formData.password} showDetails={true} />
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center py-2.5 px-4 text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-[#0056b3] to-[#004494] hover:from-[#004494] hover:to-[#003366] active:scale-[0.99] transition-all shadow-md shadow-[#0056b3]/25 cursor-pointer disabled:opacity-75"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Setting up workspace...
                </span>
              ) : (
                'Start 14-Day Free Trial'
              )}
            </button>
          </div>
        </form>

        <p className="mt-3 text-[11px] text-center text-slate-400 dark:text-slate-500">
          By signing up, you agree to the NextSofthr Terms of Service and Privacy Policy.
        </p>
        </>
        )}
      </div>
    </div>
  );
};
export default CreateAccountModal;
