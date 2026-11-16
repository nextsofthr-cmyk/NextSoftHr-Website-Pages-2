import { useState, type FormEvent } from 'react';
import { X, CheckCircle, Shield, Building2, User, Mail, Phone, Lock, Eye, EyeOff, Globe, Sparkles, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TwoStepVerification } from '../../../../components/TwoStepVerification';
import {
  ALL_WORLD_COUNTRIES,
  MODAL_PLAN_OPTIONS,
  ORGANIZATION_SIZE_OPTIONS,
  PRIMARY_BUSINESS_INDUSTRY_OPTIONS,
} from '../../../../data/worldCountries';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDemo?: () => void;
}

export const GetStartedModal = ({ isOpen, onClose }: GetStartedModalProps) => {
  const [step, setStep] = useState<'details' | 'otp' | 'success'>('details');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    selectedPlan: 'Growth',
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    company: '',
    webAddress: '',
    primaryIndustry: '1 Location (Single Store)',
    country: 'Nigeria',
    size: '1 – 25 Employees',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match. Please confirm your password.');
      return;
    }
    setError('');
    setStep('otp');
  };

  const handleOtpVerified = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.55 },
      });
    } catch {
      // safe fallback
    }
    setStep('success');
  };

  const handleClose = () => {
    setStep('details');
    setError('');
    onClose();
  };

  return (
    <div id="get-started-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 max-w-[840px] w-full overflow-hidden max-h-[92vh] overflow-y-auto relative transition-colors">
        <button
          id="close-get-started-modal"
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors z-10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'details' ? (
          <div className="p-6 sm:p-8 md:p-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full bg-lime-100 dark:bg-lime-950/80 text-lime-800 dark:text-lime-300 border border-lime-300 dark:border-lime-800 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-lime-700 dark:text-lime-400" />
              14-Day Free All-Access Trial • Instant Setup
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Start with NextSofthr
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 mb-6">
              Create your intelligent workforce operating system in 60 seconds. No credit card required.
            </p>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-xs font-medium text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* 1. Selected Plan (3x3 Grid) */}
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                  Selected Plan
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {MODAL_PLAN_OPTIONS.map((plan) => {
                    const isSelected = form.selectedPlan === plan.name;
                    return (
                      <button
                        type="button"
                        key={plan.id}
                        onClick={() => setForm({ ...form, selectedPlan: plan.name })}
                        className={`py-3 px-3 rounded-2xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-blue-50/90 dark:bg-blue-950/60 border-blue-600 dark:border-blue-400 ring-2 ring-blue-600/20 shadow-xs'
                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                        }`}
                      >
                        <div className={`text-xs sm:text-sm font-bold ${isSelected ? 'text-blue-600 dark:text-white' : 'text-slate-800 dark:text-slate-200'}`}>
                          {plan.name}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">
                          {plan.priceLabel}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 1: Full Name & Work Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      required
                      type="text"
                      placeholder="Jane Doe"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Work Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      required
                      type="email"
                      placeholder="jane@company.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Phone Number & Company Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      required
                      type="tel"
                      placeholder="+234 800 000 0000"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      required
                      type="text"
                      placeholder="My Organization"
                      value={form.company}
                      onChange={(e) => {
                        const company = e.target.value;
                        const slug = company.toLowerCase().replace(/[^a-z0-9]/g, '');
                        setForm({ ...form, company, webAddress: form.webAddress || slug });
                      }}
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: Web address * & Country * */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Web address <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-stretch rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden focus-within:ring-2 focus-within:ring-blue-600">
                    <input
                      required
                      type="text"
                      placeholder="acme"
                      value={form.webAddress}
                      onChange={(e) =>
                        setForm({ ...form, webAddress: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })
                      }
                      className="flex-1 min-w-0 px-3.5 py-2.5 text-sm bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
                    />
                    <span className="px-3.5 py-2.5 bg-slate-100 dark:bg-slate-950 border-l border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center whitespace-nowrap">
                      .scriptmaster.store
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                    <select
                      value={form.country}
                      onChange={(e) => setForm({ ...form, country: e.target.value })}
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
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

              {/* Row 4: Primary Business Industry & Organization Size (Spacious 2-Column Row) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Primary Business Industry
                  </label>
                  <select
                    value={form.primaryIndustry}
                    onChange={(e) => setForm({ ...form, primaryIndustry: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                    Organization Size
                  </label>
                  <select
                    value={form.size}
                    onChange={(e) => setForm({ ...form, size: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      required
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create password"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      required
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm password"
                      value={form.confirmPassword}
                      onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                      className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-blue-50/70 dark:bg-blue-950/40 rounded-xl border border-blue-100 dark:border-blue-900/50 flex items-start gap-2.5 text-xs text-blue-800 dark:text-blue-300">
                <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span>
                  Includes <strong>AI HR &amp; Payroll Assistant</strong>, unlimited employee records, automated payroll simulator, and mobile ESS preview.
                </span>
              </div>

              <button
                id="submit-get-started-btn"
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                Launch NextSofthr Workspace
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : step === 'otp' ? (
          <div className="p-4 sm:p-6 bg-[#f4f7fb] dark:bg-[#08101e]">
            <TwoStepVerification
              embedded
              onVerifySuccess={handleOtpVerified}
              onBack={() => setStep('details')}
              backLabel="Back to Sign In"
            />
          </div>
        ) : (
          <div className="p-8 text-center space-y-4 animate-fadeIn">
            <div className="w-16 h-16 bg-lime-100 dark:bg-lime-950/80 text-lime-700 dark:text-lime-400 rounded-full flex items-center justify-center mx-auto ring-8 ring-lime-50 dark:ring-lime-900/30">
              <CheckCircle className="w-10 h-10 text-lime-600 dark:text-lime-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Your Workspace is Live!</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm max-w-sm mx-auto">
              Welcome aboard, <strong>{form.name || 'Team Leader'}</strong>! We provisioned your demo instance at{' '}
              <strong>{form.webAddress || 'company'}.scriptmaster.store</strong>.
            </p>
            <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl text-left text-xs space-y-2 border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between text-slate-700 dark:text-slate-300">
                <span className="text-slate-400 dark:text-slate-500">Selected Plan:</span>
                <span className="font-semibold text-blue-700 dark:text-blue-400">{form.selectedPlan} (14-Day Free Trial)</span>
              </div>
              <div className="flex justify-between text-slate-700 dark:text-slate-300">
                <span className="text-slate-400 dark:text-slate-500">Admin Email:</span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">{form.email || 'admin@nextsofthr.com'}</span>
              </div>
              <div className="flex justify-between text-slate-700 dark:text-slate-300">
                <span className="text-slate-400 dark:text-slate-500">Organization Size:</span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">{form.size}</span>
              </div>
            </div>
            <button
              id="close-get-started-success"
              onClick={handleClose}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition-colors shadow-md cursor-pointer"
            >
              Explore NextSofthr Platform
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
