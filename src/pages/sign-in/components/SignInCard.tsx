import React, { useState } from 'react';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  UserCheck,
  Check,
  X as XIcon,
  Fingerprint,
  ScanFace,
  Smartphone,
  CheckCircle,
  Laptop,
  Globe,
  ShieldAlert,
  Send,
  MailCheck,
  RefreshCw,
  QrCode,
} from 'lucide-react';
import { Translations } from '../data/translations';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import { validatePasswordRealtime } from '../utils/passwordValidation';
import SuccessCheckmark from './SuccessCheckmark';
import QrSignIn from './QrSignIn';
import {
  getDeviceSecurityProfile,
  trustCurrentDevice,
  forgetCurrentDevice,
  DeviceSecurityProfile,
} from '../utils/deviceSecurity';
import { useToast } from './ToastNotification';

interface SignInCardProps {
  t: Translations;
  onSuccessLogin: (email: string) => void;
  onForgotPassword: () => void;
  onCreateAccount: () => void;
}

export const SignInCard: React.FC<SignInCardProps> = ({
  t,
  onSuccessLogin,
  onForgotPassword,
  onCreateAccount,
}) => {
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [authMode, setAuthMode] = useState<'credentials' | 'qr'>('credentials');
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);
  const [isBiometricScanning, setIsBiometricScanning] = useState(false);
  const [biometricMethod, setBiometricMethod] = useState<'face' | 'fingerprint'>('face');
  const [biometricStatus, setBiometricStatus] = useState<'idle' | 'scanning' | 'success' | 'failed'>('idle');

  // Real-time password validation utility
  const passwordValidation = validatePasswordRealtime(password);

  // States
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  // Email format validation helper
  const getEmailErrorMessage = (value: string): string | null => {
    const trimmed = value.trim();
    if (!trimmed) {
      return 'Email address is required to access your workspace.';
    }
    // Professional RFC-compliant enterprise email check
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(trimmed)) {
      if (!trimmed.includes('@')) {
        return 'Please include an "@" in the email address.';
      }
      const parts = trimmed.split('@');
      if (!parts[1] || !parts[1].includes('.')) {
        return 'Please include a valid domain (e.g., company.com).';
      }
      return 'Please enter a valid work email address.';
    }
    return null;
  };

  // Password validation helper
  const getPasswordErrorMessage = (value: string): string | null => {
    if (!value) {
      return 'Password is required to sign in.';
    }
    if (value.length < 6) {
      return `Password must be at least 6 characters (currently ${value.length}).`;
    }
    return null;
  };

  // Unverified account state & Resend verification utility
  const [isUnverifiedAccount, setIsUnverifiedAccount] = useState(false);
  const [isResendingEmail, setIsResendingEmail] = useState(false);
  const [resendEmailSuccess, setResendEmailSuccess] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Device & Browser Security Recognition State
  const [deviceProfile, setDeviceProfile] = useState<DeviceSecurityProfile>(() => getDeviceSecurityProfile());
  const [isDeviceBannerDismissed, setIsDeviceBannerDismissed] = useState(false);
  const [showDeviceDetails, setShowDeviceDetails] = useState(false);

  const handleTrustDevice = () => {
    trustCurrentDevice();
    setDeviceProfile(getDeviceSecurityProfile());
    toast.success('This device is now trusted for 30 days. Future logins will require fewer verification steps.', {
      title: 'Device Verified',
    });
  };

  const handleSimulateNewDevice = () => {
    forgetCurrentDevice();
    setDeviceProfile(getDeviceSecurityProfile());
    setIsDeviceBannerDismissed(false);
    toast.info('Simulating unverified browser session. Adaptive security challenge will be requested upon sign in.', {
      title: 'Security Simulation',
    });
  };

  // Quick Demo Accounts to facilitate quick evaluation
  const handleQuickDemo = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setEmailTouched(true);
    setPasswordTouched(true);
    setEmailError(null);
    setPasswordError(null);
    setErrorMessage(null);
    setIsUnverifiedAccount(false);
    setResendEmailSuccess(false);
    toast.info(`Filled credentials for ${demoEmail}`, { duration: 3000 });
  };

  const handleResendVerificationEmail = () => {
    if (resendCooldown > 0 || isResendingEmail) return;
    setIsResendingEmail(true);
    setResendEmailSuccess(false);

    setTimeout(() => {
      setIsResendingEmail(false);
      setResendEmailSuccess(true);
      setResendCooldown(45);
      toast.success(`Verification link dispatched to ${email || 'your email'}. Please check your inbox.`, {
        title: 'Verification Link Sent',
      });

      const interval = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 900);
  };

  const handleBiometricAuth = () => {
    setIsBiometricScanning(true);
    setBiometricStatus('scanning');
    setErrorMessage(null);

    // Simulate WebAuthn / FaceID / TouchID scan sequence
    setTimeout(() => {
      setBiometricStatus('success');
      toast.success(
        biometricMethod === 'face'
          ? 'Face ID identity verified with hardware security key.'
          : 'Fingerprint matched with platform authenticator.',
        { title: 'Biometrics Authenticated' }
      );
      setTimeout(() => {
        setIsBiometricScanning(false);
        setIsSuccess(true);
        const resolvedEmail = email.trim() || 'executive.biometric@nextsofthr.com';
        setTimeout(() => {
          onSuccessLogin(resolvedEmail);
        }, 1600);
      }, 700);
    }, 1400);
  };

  const validateForm = () => {
    setEmailTouched(true);
    setPasswordTouched(true);

    const emailErr = getEmailErrorMessage(email);
    const passwordErr = getPasswordErrorMessage(password);

    setEmailError(emailErr);
    setPasswordError(passwordErr);
    setErrorMessage(null);

    if (emailErr || passwordErr) {
      toast.error('Please review the highlighted errors before continuing.', {
        title: 'Validation Notice',
      });
    }

    return !emailErr && !passwordErr;
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Check for unverified account simulation
    if (email.toLowerCase().includes('unverified') || email.toLowerCase().includes('pending')) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsUnverifiedAccount(true);
        const msg = 'Your account email has not been verified yet. Please check your inbox or resend verification.';
        setErrorMessage(msg);
        toast.error(msg, {
          title: 'Unverified Account',
          action: {
            label: 'Resend Email',
            onClick: handleResendVerificationEmail,
          },
        });
      }, 700);
      return;
    }

    if (email.toLowerCase().includes('wrong') || password === 'wrong123') {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsUnverifiedAccount(false);
        const msg = "We couldn't sign you in with those details. Please check your email and password and try again.";
        setErrorMessage(msg);
        toast.error(msg, {
          title: 'Sign In Failed',
        });
      }, 700);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      toast.success(`Welcome back! Authenticated as ${email}.`, {
        title: 'Sign In Successful',
      });
      setTimeout(() => {
        onSuccessLogin(email);
      }, 1600);
    }, 1100);
  };

  const handleSsoLogin = (provider: 'Google' | 'Microsoft' | 'LinkedIn') => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      toast.success(`Authenticated securely via ${provider} Workspace SSO.`, {
        title: 'Enterprise SSO Connected',
      });
      setTimeout(() => {
        onSuccessLogin(`${provider.toLowerCase()}.user@nextsofthr.org`);
      }, 1600);
    }, 1000);
  };

  // If successfully authenticated, render professional SuccessCheckmark component before redirecting
  if (isSuccess) {
    return (
      <SuccessCheckmark
        email={email.trim() || 'executive@nextsofthr.com'}
        roleName="HR & Payroll Directorate"
        onRedirectNow={() => onSuccessLogin(email.trim() || 'executive@nextsofthr.com')}
      />
    );
  }

  return (
    <div className="w-full max-w-[480px] mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out fill-mode-both">
      {/* Main Authentication Card */}
      <div className="relative bg-white dark:bg-[#0f1c33] rounded-2xl shadow-xl shadow-slate-200/60 dark:shadow-black/50 border border-slate-200/90 dark:border-white/10 p-6 sm:p-9 transition-colors">
        {/* Lemon green top accent indicator */}
        <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-[#0056b3] via-[#004494] to-[#caff33] rounded-t-full" />

        {/* Card Header */}
        <div className="mb-6 text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#0056b3] dark:text-[#38bdf8] text-[11px] font-semibold mb-2.5 border border-blue-100 dark:border-blue-900/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0056b3] dark:bg-[#caff33]"></span>
            <span>Enterprise Authentication</span>
          </div>

          <h2 className="text-2xl sm:text-[1.75rem] font-black text-[#0b1528] dark:text-white tracking-tight">
            {t.welcomeBack}
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            {authMode === 'qr'
              ? 'Scan with your enrolled NextSofthr mobile app for passwordless access.'
              : t.enterCredentials}
          </p>

          {/* Auth Method Tabs: Password vs QR Code */}
          <div className="mt-4 p-1 rounded-xl bg-slate-100 dark:bg-[#162542] border border-slate-200/80 dark:border-white/10 grid grid-cols-2 gap-1">
            <button
              type="button"
              onClick={() => setAuthMode('credentials')}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                authMode === 'credentials'
                  ? 'bg-white dark:bg-[#0056b3] text-[#0056b3] dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Password Login</span>
            </button>

            <button
              type="button"
              onClick={() => setAuthMode('qr')}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                authMode === 'qr'
                  ? 'bg-white dark:bg-[#0056b3] text-[#0056b3] dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <QrCode className="w-3.5 h-3.5 text-[#0056b3] dark:text-[#caff33]" />
              <div className="flex items-center gap-1.5">
                <span>Sign in with QR</span>
                <span className="px-1 py-0.2 rounded text-[9px] font-extrabold bg-[#caff33] text-[#003366] leading-none">
                  APP
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Quick Demo Credentials Pill Bar */}
        <div className="mb-4 p-2.5 rounded-xl bg-slate-50 dark:bg-[#15233e] border border-slate-200/80 dark:border-white/10 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 dark:text-slate-300">
            <UserCheck className="w-3.5 h-3.5 text-[#0056b3] dark:text-[#caff33]" />
            <span>Quick Demo Fill:</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => handleQuickDemo('amara.okonjo@payflow.ng', 'Enterprise2026!')}
              className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-white dark:bg-[#1f3052] hover:bg-blue-50 dark:hover:bg-[#283e6b] text-[#0056b3] dark:text-[#caff33] border border-slate-200 dark:border-white/10 transition-colors shadow-2xs cursor-pointer"
            >
              HR Director (NG)
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('kwame.mensah@safariholdings.co.ke', 'PayrollPro2026!')}
              className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-white dark:bg-[#1f3052] hover:bg-blue-50 dark:hover:bg-[#283e6b] text-[#0056b3] dark:text-[#caff33] border border-slate-200 dark:border-white/10 transition-colors shadow-2xs cursor-pointer"
            >
              Payroll Lead (KE)
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('unverified.user@company.com', 'PendingVerify123!')}
              className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-white dark:bg-[#1f3052] hover:bg-amber-50 dark:hover:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 transition-colors shadow-2xs cursor-pointer"
              title="Test login with unverified email account"
            >
              Unverified User
            </button>
          </div>
        </div>

        {/* Unrecognized or Suspicious Device / Browser Security Banner */}
        {!deviceProfile.isKnownDevice && !isDeviceBannerDismissed && (
          <div className="mb-4 p-3 rounded-xl bg-amber-50/90 dark:bg-amber-950/30 border border-amber-300/80 dark:border-amber-500/40 text-left animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-start gap-2.5">
              <div className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 shrink-0">
                <ShieldAlert className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs font-bold text-amber-950 dark:text-amber-200">
                      Unrecognized Device / Browser Detected
                    </span>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-200/80 dark:bg-amber-900/80 text-amber-900 dark:text-amber-200">
                      New Endpoint
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsDeviceBannerDismissed(true)}
                    className="text-amber-600 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-100 p-0.5 rounded cursor-pointer"
                    aria-label="Dismiss warning"
                  >
                    <XIcon className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="mt-1 text-[11px] text-amber-900/80 dark:text-amber-300/90 leading-relaxed">
                  You are accessing NextSofthr from an unrecognized workstation or location. For your protection, step-up verification may be required.
                </p>

                {/* Device metadata specs */}
                <div className="mt-2 p-2 rounded-lg bg-white/70 dark:bg-[#0c172a]/70 border border-amber-200/60 dark:border-amber-900/40 text-[10px] space-y-1 text-slate-700 dark:text-slate-300">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                      <Laptop className="w-3 h-3" /> System:
                    </span>
                    <span className="font-semibold">{deviceProfile.deviceName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                      <Globe className="w-3 h-3" /> Location / IP:
                    </span>
                    <span className="font-semibold text-slate-600 dark:text-slate-300">{deviceProfile.approxLocation}</span>
                  </div>
                </div>

                {/* Security Actions */}
                <div className="mt-2.5 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={handleTrustDevice}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold text-[#003366] bg-[#caff33] hover:bg-[#bbf022] active:bg-[#a6d81b] shadow-2xs transition-colors cursor-pointer"
                  >
                    <Check className="w-3 h-3 stroke-[3]" />
                    Trust this workstation
                  </button>
                  <span className="text-[10px] text-amber-800/80 dark:text-amber-400">
                    SAML & 2FA Enforced
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recognized Device Badge when verified */}
        {deviceProfile.isKnownDevice && (
          <div className="mb-4 px-3 py-2 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 flex items-center justify-between text-[11px] text-emerald-800 dark:text-emerald-300">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>
                <strong>Recognized Device:</strong> {deviceProfile.osName} • Trusted workstation
              </span>
            </div>
            <button
              type="button"
              onClick={handleSimulateNewDevice}
              className="text-[10px] text-emerald-700 dark:text-emerald-400 underline hover:text-emerald-900 dark:hover:text-emerald-200 cursor-pointer"
              title="Simulate accessing from a new or untrusted computer"
            >
              Test Alert
            </button>
          </div>
        )}

        {/* Error Notification Banner with 'Resend Verification Email' utility for unverified accounts */}
        {errorMessage && (
          <div className="mb-5 p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 flex flex-col gap-2.5 text-red-700 dark:text-red-300 text-xs animate-in fade-in duration-150">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600 dark:text-red-400 mt-0.5" />
              <div className="flex-1 font-medium">{errorMessage}</div>
            </div>

            {/* Unverified Account Action Utility */}
            {isUnverifiedAccount && (
              <div className="mt-1 pt-2.5 border-t border-red-200/80 dark:border-red-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-[11px] text-red-800 dark:text-red-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span>Account pending verification for <strong>{email}</strong></span>
                </div>

                {resendEmailSuccess ? (
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold animate-in fade-in">
                    <MailCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Verification email sent! Check inbox</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendVerificationEmail}
                    disabled={isResendingEmail || resendCooldown > 0}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0056b3] hover:bg-[#004494] active:bg-[#003366] text-white text-[11px] font-bold shadow-xs hover:shadow-[#0056b3]/25 transition-all disabled:opacity-60 cursor-pointer"
                  >
                    {isResendingEmail ? (
                      <>
                        <RefreshCw className="w-3 h-3 animate-spin text-white" />
                        <span>Dispatching link...</span>
                      </>
                    ) : resendCooldown > 0 ? (
                      <span>Resend again in {resendCooldown}s</span>
                    ) : (
                      <>
                        <Send className="w-3 h-3 text-[#caff33]" />
                        <span>Resend Verification Email</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Success Banner */}
        {isSuccess ? (
          <div className="py-8 text-center animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-[#f7fee7] dark:bg-[#caff33]/15 text-[#84b800] border-2 border-[#caff33] mx-auto flex items-center justify-center shadow-lg shadow-[#caff33]/20">
              <CheckCircle2 className="w-8 h-8 text-[#0056b3] dark:text-[#caff33]" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-[#0b1528] dark:text-white">
              Welcome back!
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
              Preparing your NextSofthr workspace...
            </p>
            <div className="mt-5 w-44 mx-auto bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div className="bg-gradient-to-r from-[#0056b3] to-[#caff33] h-full w-full animate-pulse" />
            </div>
          </div>
        ) : authMode === 'qr' ? (
          <QrSignIn
            onSuccessLogin={(email) => onSuccessLogin(email)}
            onSwitchToPassword={() => setAuthMode('credentials')}
          />
        ) : (
          <form onSubmit={handleSignIn} className="space-y-4" noValidate>
            {/* 6. Email Field */}
            <div>
              <label
                htmlFor="work-email"
                className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-1.5"
              >
                {t.workEmail}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                </div>
                <input
                  id="work-email"
                  name="username"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    const val = e.target.value;
                    setEmail(val);
                    if (emailTouched) {
                      setEmailError(getEmailErrorMessage(val));
                    } else if (emailError) {
                      setEmailError(null);
                    }
                    if (isUnverifiedAccount) setIsUnverifiedAccount(false);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  onBlur={() => {
                    setEmailTouched(true);
                    setEmailError(getEmailErrorMessage(email));
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSignIn(e);
                    }
                  }}
                  autoComplete="username"
                  placeholder={t.emailPlaceholder}
                  className={`w-full pl-10 pr-4 py-3 text-sm rounded-xl border bg-slate-50/50 dark:bg-[#162542] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all focus:bg-white dark:focus:bg-[#1a2d52] focus:outline-none focus:ring-2 ${
                    emailError
                      ? 'border-red-400 focus:border-red-500 focus:ring-red-400/25'
                      : 'border-slate-200 dark:border-white/10 focus:border-[#0056b3] dark:focus:border-[#60a5fa] focus:ring-[#0056b3]/20 dark:focus:ring-[#60a5fa]/25'
                  }`}
                />
              </div>
              {emailError && (
                <p className="mt-1.5 text-[11px] font-medium text-red-600 dark:text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {emailError}
                </p>
              )}
            </div>

            {/* 7. Password Field */}
            <div>
              <label
                htmlFor="password-input"
                className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-1.5"
              >
                {t.password}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                </div>
                <input
                  id="password-input"
                  name="current-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    const val = e.target.value;
                    setPassword(val);
                    if (passwordTouched) {
                      setPasswordError(getPasswordErrorMessage(val));
                    } else if (passwordError) {
                      setPasswordError(null);
                    }
                  }}
                  onBlur={() => {
                    setPasswordTouched(true);
                    setPasswordError(getPasswordErrorMessage(password));
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSignIn(e);
                    }
                  }}
                  autoComplete="current-password"
                  placeholder={t.passwordPlaceholder}
                  className={`w-full pl-10 pr-11 py-3 text-sm rounded-xl border bg-slate-50/50 dark:bg-[#162542] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all focus:bg-white dark:focus:bg-[#1a2d52] focus:outline-none focus:ring-2 ${
                    passwordError
                      ? 'border-red-400 focus:border-red-500 focus:ring-red-400/25'
                      : 'border-slate-200 dark:border-white/10 focus:border-[#0056b3] dark:focus:border-[#60a5fa] focus:ring-[#0056b3]/20 dark:focus:ring-[#60a5fa]/25'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 pl-2 flex items-center text-slate-400 hover:text-[#0056b3] dark:hover:text-[#caff33] focus:outline-none focus:text-[#0056b3] dark:focus:text-[#caff33] transition-colors duration-200 cursor-pointer group"
                  aria-label={showPassword ? 'Mask password' : 'Reveal password'}
                  title={showPassword ? 'Mask password' : 'Show password'}
                >
                  <span className="relative flex items-center justify-center w-5 h-5 rounded-md hover:bg-slate-100 dark:hover:bg-white/10 transition-all duration-200">
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-[#0056b3] dark:text-[#caff33] transition-all duration-300 transform scale-100 rotate-0 opacity-100 animate-in fade-in zoom-in-75" />
                    ) : (
                      <Eye className="w-4 h-4 text-slate-400 group-hover:text-[#0056b3] dark:group-hover:text-[#caff33] transition-all duration-300 transform scale-100 -rotate-12 opacity-90 group-hover:rotate-0" />
                    )}
                  </span>
                </button>
              </div>

              {/* Visual Password Strength Meter in Lemon Green */}
              {password.length > 0 && (
                <div className="mt-2 space-y-2">
                  <PasswordStrengthMeter password={password} showDetails={false} />

                  {/* Real-time Complexity & Minimum Length Requirements Feedback */}
                  <div className="p-2.5 rounded-xl bg-slate-50/90 dark:bg-[#15233e] border border-slate-200/70 dark:border-white/10 text-left animate-in fade-in duration-200">
                    <div className="flex items-center justify-between text-[11px] mb-1.5">
                      <span className="font-semibold text-slate-700 dark:text-slate-200">
                        Password Requirements
                      </span>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                          passwordValidation.rules.every((r) => r.isValid)
                            ? 'bg-[#caff33]/30 text-[#003366] dark:text-[#caff33]'
                            : 'bg-slate-200 dark:bg-slate-750 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {passwordValidation.rules.filter((r) => r.isValid).length} / {passwordValidation.rules.length} Met
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                      {passwordValidation.rules.map((rule) => (
                        <div
                          key={rule.id}
                          className={`flex items-center gap-1.5 transition-colors ${
                            rule.isValid
                              ? 'text-[#0056b3] dark:text-[#caff33] font-semibold'
                              : 'text-slate-400 dark:text-slate-500'
                          }`}
                        >
                          <span
                            className={`flex items-center justify-center w-3.5 h-3.5 rounded-full shrink-0 ${
                              rule.isValid
                                ? 'bg-[#caff33] text-[#003366] shadow-[0_0_6px_rgba(202,255,51,0.6)]'
                                : 'bg-slate-200 dark:bg-slate-700 text-slate-400'
                            }`}
                          >
                            {rule.isValid ? (
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            ) : (
                              <span className="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-500" />
                            )}
                          </span>
                          <span className="truncate">{rule.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Dynamic helper feedback tip */}
                    <div className="mt-2 pt-1.5 border-t border-slate-200/60 dark:border-white/10 text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0056b3] dark:bg-[#caff33]" />
                      <span>{passwordValidation.feedbackMessage}</span>
                    </div>
                  </div>
                </div>
              )}

              {passwordError && (
                <p className="mt-1.5 text-[11px] font-medium text-red-600 dark:text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {passwordError}
                </p>
              )}
            </div>

            {/* 8. Remember Me + Forgot Password Row */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-slate-600 dark:text-slate-300 font-medium hover:text-slate-900 dark:hover:text-white">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#0056b3] border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-[#0056b3] dark:focus:ring-[#caff33] focus:ring-offset-2 dark:focus:ring-offset-[#0f1c33] cursor-pointer accent-[#0056b3]"
                />
                <span>{t.rememberMe}</span>
              </label>

              <button
                type="button"
                onClick={onForgotPassword}
                className="text-xs font-semibold text-[#0056b3] dark:text-[#38bdf8] hover:text-[#003366] dark:hover:text-[#caff33] transition-colors hover:underline hover:decoration-[#caff33] decoration-2 underline-offset-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0056b3] dark:focus-visible:ring-[#caff33] rounded px-1 py-0.5"
              >
                {t.forgotPassword}
              </button>
            </div>

            {/* 9. Primary Sign-In Button */}
            <div className="pt-2 space-y-2.5">
              <button
                type="submit"
                disabled={isLoading || isBiometricScanning}
                className="group relative w-full flex items-center justify-center py-3.5 px-4 text-sm font-bold rounded-xl text-white bg-gradient-to-r from-[#0056b3] via-[#004b9c] to-[#003d80] hover:from-[#004b9c] hover:to-[#002f66] active:scale-[0.99] transition-all shadow-md shadow-[#0056b3]/25 cursor-pointer disabled:opacity-75 overflow-hidden focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#0056b3]/40 dark:focus-visible:ring-[#caff33]/60 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0f1c33]"
              >
                {/* Subtle lemon green accent line on button hover */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#caff33] opacity-0 group-hover:opacity-100 transition-opacity" />

                {isLoading ? (
                  <span className="flex items-center gap-2.5">
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>{t.signingIn}</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-2 tracking-wide">
                    <span>{t.signIn}</span>
                    <ArrowRight className="w-4 h-4 text-[#caff33] group-hover:translate-x-0.5 transition-transform" />
                  </span>
                )}
              </button>

              {/* Modern Biometric Authentication: FaceID & Fingerprint Passkey Toggle */}
              {biometricsEnabled && (
                <div className="pt-0.5">
                  <div className="group relative w-full flex items-center justify-between px-3.5 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-[#162542] hover:bg-white dark:hover:bg-[#1c2e50] hover:border-[#0056b3]/40 dark:hover:border-[#caff33]/40 transition-all shadow-2xs hover:shadow-sm">
                    <button
                      type="button"
                      onClick={handleBiometricAuth}
                      disabled={isBiometricScanning || isLoading}
                      className="flex items-center gap-2.5 text-left flex-1 min-w-0 py-0.5 cursor-pointer disabled:opacity-75 focus:outline-none"
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/70 text-[#0056b3] dark:text-[#caff33] border border-blue-100 dark:border-blue-900/50 group-hover:scale-105 transition-transform shrink-0">
                        {biometricMethod === 'face' ? (
                          <ScanFace className="w-4 h-4 stroke-[2.2]" />
                        ) : (
                          <Fingerprint className="w-4 h-4 stroke-[2.2]" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-[#0056b3] dark:group-hover:text-[#caff33] transition-colors truncate">
                            Sign in with {biometricMethod === 'face' ? 'Face ID' : 'Fingerprint'}
                          </span>
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#caff33]/20 dark:bg-[#caff33]/15 text-[#004494] dark:text-[#caff33] shrink-0">
                            Passkey
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                          Hardware-secured biometric login
                        </p>
                      </div>
                    </button>

                    {/* Biometric Toggle Switch between FaceID and Fingerprint */}
                    <div className="flex items-center gap-1 shrink-0 pl-2 border-l border-slate-200/80 dark:border-white/10">
                      <button
                        type="button"
                        onClick={() => setBiometricMethod('face')}
                        title="Use Face ID"
                        className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                          biometricMethod === 'face'
                            ? 'bg-[#0056b3] text-white shadow-2xs'
                            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-white/5'
                        }`}
                        aria-label="Select Face ID"
                      >
                        <ScanFace className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setBiometricMethod('fingerprint')}
                        title="Use Touch ID / Fingerprint"
                        className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                          biometricMethod === 'fingerprint'
                            ? 'bg-[#0056b3] text-white shadow-2xs'
                            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-white/5'
                        }`}
                        aria-label="Select Fingerprint"
                      >
                        <Fingerprint className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Security Trust Section directly below Login Button */}
            <div className="pt-2.5 pb-1">
              <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-[#15233e] border border-slate-200/70 dark:border-white/10 text-left transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-100">
                    <ShieldCheck className="w-4 h-4 text-[#0056b3] dark:text-[#caff33]" />
                    <span>🔒 {t.infoProtected}</span>
                  </div>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                    ENCRYPTED
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  {t.securityDesc}
                </p>

                {/* Subtle trust indicators grid */}
                <div className="mt-2.5 pt-2 border-t border-slate-200/60 dark:border-white/10 grid grid-cols-2 gap-2 text-[10px] font-semibold text-slate-600 dark:text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0056b3] dark:bg-[#38bdf8]"></span>
                    <span>Secure authentication</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#84b800] dark:bg-[#caff33]"></span>
                    <span>Protected account access</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0056b3] dark:bg-[#38bdf8]"></span>
                    <span>Role-based access (RBAC)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#84b800] dark:bg-[#caff33]"></span>
                    <span>Business data protection</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 10. Optional Social / SSO Login */}
            <div className="pt-3">
              <div className="relative flex items-center justify-center">
                <div className="border-t border-slate-200 dark:border-white/10 w-full" />
                <span className="bg-white dark:bg-[#0f1c33] px-3 text-[11px] uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 absolute">
                  {t.orContinueWith}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {/* Google SSO */}
                <button
                  type="button"
                  onClick={() => handleSsoLogin('Google')}
                  title="Sign in with Google Workspace"
                  className="group flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#172643] hover:bg-slate-50 dark:hover:bg-[#203254] text-slate-700 dark:text-slate-200 text-xs font-semibold shadow-2xs hover:border-[#4285F4]/40 hover:shadow-xs transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span className="truncate">Google</span>
                </button>

                {/* LinkedIn SSO */}
                <button
                  type="button"
                  onClick={() => handleSsoLogin('LinkedIn')}
                  title="Sign in with LinkedIn"
                  className="group flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#172643] hover:bg-slate-50 dark:hover:bg-[#203254] text-slate-700 dark:text-slate-200 text-xs font-semibold shadow-2xs hover:border-[#0A66C2]/40 hover:shadow-xs transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="#0A66C2">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                  <span className="truncate">LinkedIn</span>
                </button>

                {/* Microsoft SSO */}
                <button
                  type="button"
                  onClick={() => handleSsoLogin('Microsoft')}
                  title="Sign in with Microsoft 365 / Azure AD"
                  className="group flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#172643] hover:bg-slate-50 dark:hover:bg-[#203254] text-slate-700 dark:text-slate-200 text-xs font-semibold shadow-2xs hover:border-[#00a4ef]/40 hover:shadow-xs transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" viewBox="0 0 21 21">
                    <rect x="1" y="1" width="9" height="9" fill="#f25022" />
                    <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
                    <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
                    <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
                  </svg>
                  <span className="truncate">Microsoft</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* 11. Enable Biometric Authentication Toggle Switch & Method Selection */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-white/10">
          <div className="p-3 rounded-xl bg-slate-50/90 dark:bg-[#15233e] border border-slate-200/80 dark:border-white/10 text-left transition-all">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#0056b3]/10 dark:bg-[#0056b3]/25 text-[#0056b3] dark:text-[#caff33] shrink-0">
                  {biometricMethod === 'face' ? (
                    <ScanFace className="w-4 h-4" />
                  ) : (
                    <Fingerprint className="w-4 h-4" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                      Enable Biometric Authentication
                    </span>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#caff33]/30 dark:bg-[#caff33]/20 text-[#004494] dark:text-[#caff33]">
                      Passkey
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Allow Face ID or Fingerprint recognition for instant, passwordless sign-ins
                  </p>
                </div>
              </div>

              {/* Accessible Toggle Switch */}
              <button
                type="button"
                role="switch"
                aria-checked={biometricsEnabled}
                onClick={() => setBiometricsEnabled(!biometricsEnabled)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0056b3] dark:focus-visible:ring-[#caff33] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#15233e] ${
                  biometricsEnabled ? 'bg-[#0056b3] dark:bg-[#84b800]' : 'bg-slate-200 dark:bg-slate-700'
                }`}
                title={biometricsEnabled ? 'Disable Biometric Authentication' : 'Enable Biometric Authentication'}
                aria-label="Enable Biometric Authentication"
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    biometricsEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Sub-selector for Preferred Recognition Type when enabled */}
            {biometricsEnabled && (
              <div className="mt-3 pt-2.5 border-t border-slate-200/70 dark:border-white/10 flex items-center justify-between text-xs animate-in fade-in duration-200">
                <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
                  Preferred recognition type:
                </span>
                <div className="flex items-center gap-1.5 p-0.5 rounded-lg bg-slate-200/60 dark:bg-black/30 border border-slate-300/40 dark:border-white/5">
                  <button
                    type="button"
                    onClick={() => setBiometricMethod('face')}
                    className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                      biometricMethod === 'face'
                        ? 'bg-white dark:bg-[#0056b3] text-[#0056b3] dark:text-white shadow-xs font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <ScanFace className="w-3.5 h-3.5" />
                    <span>Face ID</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setBiometricMethod('fingerprint')}
                    className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                      biometricMethod === 'fingerprint'
                        ? 'bg-white dark:bg-[#0056b3] text-[#0056b3] dark:text-white shadow-xs font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Fingerprint className="w-3.5 h-3.5" />
                    <span>Fingerprint</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 12. Account Creation CTA */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-white/10 text-center">
          <p className="text-xs text-slate-600 dark:text-slate-400">
            {t.dontHaveAccount}{' '}
            <button
              type="button"
              onClick={onCreateAccount}
              className="font-bold text-[#0056b3] dark:text-[#38bdf8] hover:text-[#003366] dark:hover:text-[#caff33] hover:underline cursor-pointer"
            >
              {t.createAccount}
            </button>
          </p>

          <div className="mt-2.5">
            <button
              type="button"
              onClick={onCreateAccount}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f7fee7] dark:bg-[#caff33]/15 hover:bg-[#effdd1] dark:hover:bg-[#caff33]/25 text-[#003366] dark:text-[#caff33] text-xs font-bold border border-[#caff33] transition-all cursor-pointer shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#84b800] dark:text-[#caff33]" />
              <span>{t.startFreeTrial}</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">
                • 14 days full access
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 16. AI Positioning Card */}
      <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-blue-50/80 via-white to-blue-50/50 dark:from-[#13223f] dark:via-[#0f1c33] dark:to-[#13223f] border border-blue-100 dark:border-white/10 shadow-xs flex items-start gap-3 transition-colors">
        <div className="p-2 rounded-lg bg-[#0056b3]/10 dark:bg-[#0056b3]/25 text-[#0056b3] dark:text-[#38bdf8] shrink-0 mt-0.5">
          <Sparkles className="w-4 h-4 text-[#0056b3] dark:text-[#caff33]" />
        </div>
        <div className="text-left">
          <h4 className="text-xs font-bold text-[#003366] dark:text-blue-200 flex items-center gap-1.5">
            {t.aiTitle}
            <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold bg-[#caff33] text-[#003366]">
              NEXTSOFTHR AI
            </span>
          </h4>
          <p className="mt-0.5 text-[11px] text-slate-600 dark:text-slate-400 leading-normal">
            {t.aiDesc}
          </p>
        </div>
      </div>

      {/* Biometric Scan Simulation Modal Dialog */}
      {isBiometricScanning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-xs bg-white dark:bg-[#0f1c33] rounded-2xl shadow-2xl border border-slate-100 dark:border-white/10 p-6 text-center overflow-hidden">
            {/* Top brand accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0056b3] via-[#84b800] to-[#caff33]" />

            {/* Biometric Sensor Animation Ring */}
            <div className="relative mx-auto w-20 h-20 flex items-center justify-center mb-4">
              <div
                className={`absolute inset-0 rounded-full border-2 transition-all duration-700 ${
                  biometricStatus === 'success'
                    ? 'border-[#caff33] scale-105 bg-[#caff33]/15'
                    : 'border-[#0056b3] dark:border-[#caff33] animate-ping opacity-35'
                }`}
              />
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                  biometricStatus === 'success'
                    ? 'bg-[#caff33] text-[#003366] shadow-[0_0_20px_rgba(202,255,51,0.6)]'
                    : 'bg-blue-50 dark:bg-[#1a2d52] text-[#0056b3] dark:text-[#caff33] shadow-inner'
                }`}
              >
                {biometricStatus === 'success' ? (
                  <Check className="w-8 h-8 stroke-[3] animate-in zoom-in-50 duration-200" />
                ) : biometricMethod === 'face' ? (
                  <ScanFace className="w-8 h-8 stroke-[2] animate-pulse" />
                ) : (
                  <Fingerprint className="w-8 h-8 stroke-[2] animate-pulse" />
                )}
              </div>
            </div>

            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {biometricStatus === 'success'
                ? 'Biometric Verified!'
                : biometricMethod === 'face'
                ? 'Scanning Face ID...'
                : 'Touch Fingerprint Sensor'}
            </h3>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {biometricStatus === 'success'
                ? 'Access granted. Signing you in...'
                : 'Verifying NextSofthr secure passkey hardware credentials'}
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/10">
              <button
                type="button"
                onClick={() => {
                  setIsBiometricScanning(false);
                  setBiometricStatus('idle');
                }}
                className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                Cancel biometric login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default SignInCard;
