import React, { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle2, ShieldCheck, X, Lock, Eye, EyeOff, KeyRound } from 'lucide-react';
import NextSofthrLogo from './NextSofthrLogo';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import { useToast } from './ToastNotification';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultEmail?: string;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  onClose,
  defaultEmail = '',
}) => {
  const toast = useToast();
  const [step, setStep] = useState<'request' | 'reset' | 'success'>('request');
  const [email, setEmail] = useState(defaultEmail);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      const msg = 'Email field is required.';
      setError(msg);
      toast.error(msg, { title: 'Required Field' });
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      const msg = 'Please enter a valid work email address.';
      setError(msg);
      toast.error(msg, { title: 'Invalid Email' });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.info(`Recovery security code verified for ${email}. Set your new password.`, {
        title: 'Identity Confirmed',
      });
      // Advance to simulated secure reset step to let user set new password with strength meter
      setStep('reset');
    }, 1000);
  };

  const handlePasswordResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!newPassword) {
      const msg = 'Please enter a new password.';
      setError(msg);
      toast.error(msg, { title: 'Password Required' });
      return;
    }

    if (newPassword.length < 6) {
      const msg = 'Password must be at least 6 characters.';
      setError(msg);
      toast.error(msg, { title: 'Weak Password' });
      return;
    }

    if (newPassword !== confirmPassword) {
      const msg = 'Passwords do not match.';
      setError(msg);
      toast.error(msg, { title: 'Password Mismatch' });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Your workspace password was successfully reset. You can now log in.', {
        title: 'Password Updated',
      });
      setStep('success');
    }, 1100);
  };

  const handleReset = () => {
    setStep('request');
    setEmail('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-[#0f1c33] rounded-2xl shadow-2xl border border-slate-100 dark:border-white/10 p-6 sm:p-8 overflow-hidden transition-colors">
        {/* Subtle top brand accent line in SaaS Blue and Lemon Green */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0056b3] via-[#004494] to-[#caff33]" />

        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:text-slate-400 dark:hover:text-white p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-5">
          <NextSofthrLogo size="sm" showTagline={false} />
        </div>

        {step === 'request' && (
          <div>
            <h3 className="text-xl font-bold text-[#0b1528] dark:text-white tracking-tight">
              Reset your password
            </h3>
            <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Enter your verified NextSofthr work email address, and we’ll initiate a secure password reset sequence.
            </p>

            <form onSubmit={handleRequestSubmit} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                  Work Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="you@company.com"
                    className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border bg-slate-50/50 dark:bg-[#162542] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all focus:outline-none focus:bg-white dark:focus:bg-[#1a2d52] ${
                      error
                        ? 'border-red-400 focus:ring-2 focus:ring-red-400/20'
                        : 'border-slate-200 dark:border-white/10 focus:border-[#0056b3] dark:focus:border-[#60a5fa] focus:ring-3 focus:ring-[#0056b3]/15'
                    }`}
                  />
                </div>
                {error && (
                  <p className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">
                    {error}
                  </p>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center py-2.5 px-4 text-sm font-semibold rounded-xl text-white bg-[#0056b3] hover:bg-[#004494] active:bg-[#003366] transition-all shadow-md shadow-[#0056b3]/25 disabled:opacity-70 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Verifying account...
                    </span>
                  ) : (
                    'Continue to Password Reset'
                  )}
                </button>
              </div>
            </form>

            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-[#0056b3] dark:text-[#38bdf8] hover:underline font-medium"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Sign In
              </button>

              <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0056b3] dark:text-[#caff33]" />
                Encrypted recovery
              </span>
            </div>
          </div>
        )}

        {step === 'reset' && (
          <div>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#0056b3] dark:text-[#38bdf8] text-[11px] font-semibold mb-2 border border-blue-100 dark:border-blue-900/60">
              <KeyRound className="w-3 h-3 text-[#0056b3] dark:text-[#caff33]" />
              <span>Step 2: Set New Password</span>
            </div>

            <h3 className="text-xl font-bold text-[#0b1528] dark:text-white tracking-tight">
              Create new workspace password
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Set a strong enterprise password for <strong className="text-slate-800 dark:text-slate-200">{email}</strong>.
            </p>

            <form onSubmit={handlePasswordResetSubmit} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400 dark:text-slate-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="Enter new password"
                    className="w-full pl-10 pr-10 py-2 text-sm rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-[#162542] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#0056b3] dark:focus:border-[#60a5fa] focus:ring-2 focus:ring-[#0056b3]/15"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Lemon Green Segmented Progress Bar */}
                {newPassword.length > 0 && (
                  <PasswordStrengthMeter password={newPassword} showDetails={true} />
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400 dark:text-slate-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="Re-enter password to confirm"
                    className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-[#162542] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#0056b3] dark:focus:border-[#60a5fa] focus:ring-2 focus:ring-[#0056b3]/15"
                  />
                </div>
              </div>

              {error && (
                <p className="text-xs font-medium text-red-600 dark:text-red-400">
                  {error}
                </p>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center py-2.5 px-4 text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-[#0056b3] to-[#004494] hover:from-[#004494] hover:to-[#003366] transition-all shadow-md shadow-[#0056b3]/25 disabled:opacity-70 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Updating password...
                    </span>
                  ) : (
                    'Save New Password'
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center py-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="mt-3 text-lg font-bold text-slate-900 dark:text-white">
              Password successfully updated!
            </h4>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Your NextSofthr account credentials for <strong className="text-slate-900 dark:text-white font-semibold">{email}</strong> have been secured. You can now sign in with your new password.
            </p>

            <div className="mt-6">
              <button
                type="button"
                onClick={handleReset}
                className="w-full py-2.5 px-4 text-sm font-semibold rounded-xl text-white bg-[#0056b3] hover:bg-[#004494] transition-all cursor-pointer"
              >
                Return to Sign In
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ForgotPasswordModal;
