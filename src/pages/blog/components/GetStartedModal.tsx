import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, Lock, User, Mail, Phone, Building2, Globe, Eye, EyeOff } from 'lucide-react';
import { NextSoftHrLogo } from './NextSoftHrLogo';
import {
  ALL_WORLD_COUNTRIES,
  MODAL_PLAN_OPTIONS,
  ORGANIZATION_SIZE_OPTIONS,
  PRIMARY_BUSINESS_INDUSTRY_OPTIONS,
} from '../../../data/worldCountries';

interface GetStartedModalProps {
  onClose: () => void;
}

export const GetStartedModal: React.FC<GetStartedModalProps> = ({ onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState<string>('Growth');
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    phone: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    webAddress: '',
    primaryIndustry: '1 Location (Single Store)',
    country: 'Nigeria',
    organizationSize: '1 – 25 Employees',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please confirm your password.');
      return;
    }
    setError('');
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0B1E36] rounded-3xl max-w-[840px] w-full p-6 sm:p-8 md:p-10 shadow-2xl border border-slate-200 dark:border-[#1E3656] relative max-h-[92vh] overflow-y-auto transition-colors duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-[#122A4A] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-4">
          <NextSoftHrLogo size="md" variant="auto" />
        </div>

        {isSuccess ? (
          <div className="text-center py-6 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-[#8EE000]/30 text-slate-950 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-[#0A3F7E] dark:text-[#8EE000]" />
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-heading">
              Welcome to NextSoftHr!
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Your 14-day full access workspace for{' '}
              <span className="font-semibold text-slate-900 dark:text-white">{formData.companyName}</span> (
              <span className="font-mono">{formData.webAddress || 'acme'}.scriptmaster.store</span>) has been initialized.
              Activation instructions have been dispatched to{' '}
              <span className="font-semibold text-slate-900 dark:text-white">{formData.workEmail}</span>.
            </p>

            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-[#8EE000] hover:bg-[#9EF01A] transition-all border border-[#7BC500] cursor-pointer"
            >
              Continue to Dashboard
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white font-heading">
                Start Your 14-Day Free Trial
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                No credit card required. Full access to automated payroll, attendance, and employee self-service.
              </p>
            </div>

            {error && (
              <div className="p-2.5 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-xs font-medium text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            {/* 1. Selected Plan (3x3 Grid) */}
            <div>
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                Selected Plan
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {MODAL_PLAN_OPTIONS.map((p) => {
                  const isSelected = selectedPlan === p.name;
                  return (
                    <button
                      type="button"
                      key={p.id}
                      onClick={() => setSelectedPlan(p.name)}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#0A3F7E] dark:bg-[#2563EB] text-white border-[#0A3F7E] dark:border-[#2563EB] shadow-sm'
                          : 'bg-slate-50 dark:bg-[#07192F] border-slate-200 dark:border-[#1E3656] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#0E2442]'
                      }`}
                    >
                      <div className="text-xs font-bold">{p.name}</div>
                      <div className={`text-[10px] mt-0.5 leading-tight ${isSelected ? 'text-slate-200' : 'text-slate-400'}`}>
                        {p.priceLabel}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Jane Doe"
                    className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-[#1E3656] bg-white dark:bg-[#07192F] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0A3F7E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Work Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={formData.workEmail}
                    onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-[#1E3656] bg-white dark:bg-[#07192F] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0A3F7E]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+234 800 000 0000"
                    className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-[#1E3656] bg-white dark:bg-[#07192F] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0A3F7E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Company / Organization Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Building2 className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
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
                    placeholder="e.g. Zenith Logistics"
                    className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-[#1E3656] bg-white dark:bg-[#07192F] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0A3F7E]"
                  />
                </div>
              </div>
            </div>

            {/* Row 3: Web address * & Country * */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Web address <span className="text-red-500">*</span>
                </label>
                <div className="flex items-stretch rounded-xl border border-slate-300 dark:border-[#1E3656] bg-white dark:bg-[#07192F] overflow-hidden focus-within:ring-2 focus-within:ring-[#0A3F7E]">
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
                    className="flex-1 min-w-0 px-3 py-2 text-xs bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
                  />
                  <span className="px-3 py-2 bg-slate-100 dark:bg-[#051224] border-l border-slate-300 dark:border-[#1E3656] text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center whitespace-nowrap">
                    .scriptmaster.store
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Country <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Globe className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-[#1E3656] bg-white dark:bg-[#07192F] text-slate-900 dark:text-white"
                  >
                    {ALL_WORLD_COUNTRIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Row 4: Primary Business Industry & Organization Size */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Primary Business Industry
                </label>
                <select
                  value={formData.primaryIndustry}
                  onChange={(e) => setFormData({ ...formData, primaryIndustry: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-[#1E3656] bg-white dark:bg-[#07192F] text-slate-900 dark:text-white"
                >
                  {PRIMARY_BUSINESS_INDUSTRY_OPTIONS.map((ind) => (
                    <option key={ind} value={ind}>
                      {ind}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Organization Size
                </label>
                <select
                  value={formData.organizationSize}
                  onChange={(e) => setFormData({ ...formData, organizationSize: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-[#1E3656] bg-white dark:bg-[#07192F] text-slate-900 dark:text-white"
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
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Create password"
                    className="w-full pl-8 pr-8 py-2 text-xs rounded-xl border border-slate-300 dark:border-[#1E3656] bg-white dark:bg-[#07192F] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0A3F7E]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="Confirm password"
                    className="w-full pl-8 pr-8 py-2 text-xs rounded-xl border border-slate-300 dark:border-[#1E3656] bg-white dark:bg-[#07192F] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0A3F7E]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl text-xs font-bold text-slate-950 bg-[#8EE000] hover:bg-[#9EF01A] transition-all flex items-center justify-center gap-2 shadow-md border border-[#7BC500] cursor-pointer"
              >
                <span>Create Organization Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 pt-1">
              <Lock className="w-3 h-3 text-[#8EE000]" />
              <span>Enterprise SOC2 &amp; NDPR compliant data encryption</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
