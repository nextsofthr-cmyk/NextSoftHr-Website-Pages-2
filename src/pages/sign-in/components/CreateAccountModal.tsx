import React, { useState } from 'react';
import { X, Building2, User, Mail, Globe, Check, Sparkles, Lock, Eye, EyeOff } from 'lucide-react';
import NextSofthrLogo from './NextSofthrLogo';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import { useToast } from './ToastNotification';

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
    fullName: '',
    workEmail: '',
    password: '',
    companyName: '',
    companySize: '11-50',
    country: 'Nigeria',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.workEmail.trim() || !formData.companyName.trim()) {
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
    if (formData.password && formData.password.length < 6) {
      const msg = 'Password must be at least 6 characters.';
      setError(msg);
      toast.error(msg, { title: 'Weak Password' });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(`Welcome to NextSofthr! Your workspace for ${formData.companyName} is ready.`, {
        title: 'Account Created',
      });
      onSuccess(formData.workEmail);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#0f1c33] rounded-2xl shadow-2xl border border-slate-100 dark:border-white/10 p-6 sm:p-8 overflow-hidden max-h-[92vh] overflow-y-auto transition-colors">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0056b3] via-[#004494] to-[#caff33]" />

        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:text-slate-400 dark:hover:text-white p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-between mb-4">
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

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
              Full Name *
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
              Work Email *
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

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
              Create Password *
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 dark:text-slate-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Create a strong workspace password"
                className="w-full pl-10 pr-10 py-2 text-sm rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-[#162542] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-[#0056b3] dark:focus:border-[#60a5fa] focus:ring-2 focus:ring-[#0056b3]/15 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {/* Visual Password Strength Meter in Lemon Green */}
            {formData.password.length > 0 && (
              <PasswordStrengthMeter password={formData.password} showDetails={true} />
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                Company Name *
              </label>
              <div className="relative">
                <Building2 className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 dark:text-slate-500" />
                <input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="e.g. Safari Logistics"
                  className="w-full pl-10 pr-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-[#162542] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-[#0056b3] dark:focus:border-[#60a5fa] focus:ring-2 focus:ring-[#0056b3]/15 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                Primary Country *
              </label>
              <div className="relative">
                <Globe className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 dark:text-slate-500" />
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#162542] text-slate-900 dark:text-white focus:border-[#0056b3] dark:focus:border-[#60a5fa] focus:ring-2 focus:ring-[#0056b3]/15 focus:outline-none"
                >
                  <option value="Nigeria">Nigeria 🇳🇬</option>
                  <option value="Kenya">Kenya 🇰🇪</option>
                  <option value="South Africa">South Africa 🇿🇦</option>
                  <option value="Ghana">Ghana 🇬🇭</option>
                  <option value="Rwanda">Rwanda 🇷🇼</option>
                  <option value="Egypt">Egypt 🇪🇬</option>
                  <option value="United Kingdom">United Kingdom 🇬🇧</option>
                  <option value="United States">United States 🇺🇸</option>
                  <option value="Other">Other Global Market 🌍</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
              Organization Size
            </label>
            <div className="grid grid-cols-4 gap-2">
              {['1-10', '11-50', '51-200', '201+'].map((size) => (
                <button
                  type="button"
                  key={size}
                  onClick={() => setFormData({ ...formData, companySize: size })}
                  className={`py-1.5 px-2 text-xs rounded-lg font-medium border text-center transition-all ${
                    formData.companySize === size
                      ? 'bg-[#0056b3] text-white border-[#0056b3] shadow-xs dark:bg-[#0056b3] dark:border-[#38bdf8]'
                      : 'bg-slate-50 dark:bg-[#162542] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-[#20345b]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

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
      </div>
    </div>
  );
};
export default CreateAccountModal;
