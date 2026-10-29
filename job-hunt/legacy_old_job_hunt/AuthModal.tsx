import React, { useState, useEffect } from 'react';
import { 
  X, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Building2, 
  UserCheck, 
  Users2, 
  Handshake, 
  Lock, 
  Mail, 
  ArrowRight, 
  Briefcase 
} from 'lucide-react';
import { UserRole } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode: 'login' | 'register';
  initialRole?: UserRole;
  onLoginSuccess: (user: { email: string; role: UserRole; name: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode,
  initialRole = 'job_seeker',
  onLoginSuccess
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companySize, setCompanySize] = useState('51-200');
  const [industry, setIndustry] = useState('Information Technology');
  const [specialization, setSpecialization] = useState('Executive Search & Headhunting');
  const [partnerType, setPartnerType] = useState('HR & Workforce Consultant');

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  useEffect(() => {
    setMode(initialMode);
    if (initialRole) setSelectedRole(initialRole);
    setErrorMsg('');
    setSuccessMsg('');
  }, [initialMode, initialRole, isOpen]);

  if (!isOpen) return null;

  const handleDemoLogin = (role: UserRole) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      let name = 'Candidate User';
      let emailAddr = 'candidate@example.com';
      if (role === 'employer') {
        name = 'Sterling HR Director';
        emailAddr = 'hr@sterling.ng';
      } else if (role === 'agency') {
        name = 'Apex Executive Search';
        emailAddr = 'partners@apexrecruitment.com';
      } else if (role === 'partner') {
        name = 'Pan-African HR Advisory';
        emailAddr = 'consulting@panafricanhr.com';
      }

      onLoginSuccess({
        name,
        email: emailAddr,
        role
      });
      onClose();
    }, 400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    
    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSuccessMsg(mode === 'login' ? 'Signed in successfully!' : 'Account registered successfully!');
      
      const userDisplayName = fullName || companyName || email.split('@')[0];
      
      setTimeout(() => {
        onLoginSuccess({
          email,
          role: selectedRole,
          name: userDisplayName
        });
        onClose();
      }, 700);
    }, 600);
  };

  const getRoleTitle = (role: UserRole) => {
    switch (role) {
      case 'job_seeker': return 'Job Seeker';
      case 'employer': return 'Employer / HR Team';
      case 'agency': return 'Recruiter / Agency';
      case 'partner': return 'Business Partner';
    }
  };

  const handleSocialAuth = (provider: 'linkedin' | 'gmail' | 'facebook') => {
    setSocialLoading(provider);
    setErrorMsg('');
    setSuccessMsg('');

    setTimeout(() => {
      setSocialLoading(null);
      let providerName = 'Google / Gmail';
      let userEmail = 'candidate.talent@gmail.com';
      let userName = fullName || 'Adaeze Okonkwo';

      if (provider === 'linkedin') {
        providerName = 'LinkedIn';
        userEmail = 'adaeze.okonkwo@linkedin.member.com';
        userName = fullName || 'Adaeze Okonkwo (CIPM)';
      } else if (provider === 'facebook') {
        providerName = 'Facebook';
        userEmail = 'user.candidate@facebook.com';
        userName = fullName || 'Adaeze Okonkwo';
      }

      if (selectedRole === 'employer') {
        userName = 'Sterling Talent Partner';
        userEmail = provider === 'gmail' ? 'hr.sterling.recruiting@gmail.com' : 'hr@sterling.talent';
      } else if (selectedRole === 'agency') {
        userName = 'Apex Recruitment Lead';
        userEmail = provider === 'gmail' ? 'apex.agency.talent@gmail.com' : 'lead@apex.recruiter';
      }

      setSuccessMsg(`Successfully authenticated via ${providerName}!`);
      setTimeout(() => {
        onLoginSuccess({
          name: userName,
          email: userEmail,
          role: selectedRole
        });
        onClose();
      }, 600);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 dark:bg-black/80 backdrop-blur-xs overflow-y-auto transition-colors duration-200">
      <div 
        className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/90 dark:border-slate-800 w-full max-w-4xl overflow-hidden grid grid-cols-1 md:grid-cols-12 relative animate-in fade-in zoom-in-95 duration-200 my-8 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Side: Brand & Role Selector (4 cols on desktop) */}
        <div className="md:col-span-5 bg-[#142B4A] dark:bg-[#070e1b] text-white p-6 sm:p-8 flex flex-col justify-between border-r border-slate-800">
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#2563EB] flex items-center justify-center font-bold text-white text-lg">
                N
              </div>
              <span className="text-xl font-bold tracking-tight">
                NextSoft<span className="text-[#2563EB]">HR</span>
              </span>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                {mode === 'login' ? 'Welcome Back' : 'Create Your Account'}
              </h3>
              <p className="text-slate-300 text-xs mt-1.5 leading-relaxed">
                One platform connecting verified talent, employers, recruitment process outsourcing (RPO), and agencies.
              </p>
            </div>

            {/* Role Switcher */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Select Your Role
              </span>
              <div className="space-y-1.5">
                {[
                  { id: 'job_seeker', label: 'Job Seeker', sub: 'Find jobs & track applications', icon: UserCheck },
                  { id: 'employer', label: 'Employer / HR Team', sub: 'Post vacancies & sync HRMS', icon: Building2 },
                  { id: 'agency', label: 'Recruiter & Agency', sub: 'Assignments & placement tools', icon: Users2 },
                  { id: 'partner', label: 'Business Partner', sub: 'Referrals & ecosystem growth', icon: Handshake }
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = selectedRole === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedRole(item.id as UserRole)}
                      className={`w-full p-2.5 rounded-xl text-left flex items-center gap-3 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#2563EB] text-white shadow-md'
                          : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <div className="truncate">
                        <span className="text-xs font-bold block">{item.label}</span>
                        <span className="text-[10px] text-slate-300/80 block">{item.sub}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Demo Switcher */}
          <div className="pt-6 border-t border-slate-700/80 mt-6">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2">
              Instant Demo Access:
            </span>
            <div className="grid grid-cols-2 gap-1.5 text-[10px]">
              <button
                type="button"
                onClick={() => handleDemoLogin('job_seeker')}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-200 text-center font-medium cursor-pointer"
              >
                Demo Seeker
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('employer')}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-200 text-center font-medium cursor-pointer"
              >
                Demo Employer
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('agency')}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-200 text-center font-medium cursor-pointer"
              >
                Demo Agency
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('partner')}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-200 text-center font-medium cursor-pointer"
              >
                Demo Partner
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Form Inputs (7 cols on desktop) */}
        <div className="md:col-span-7 p-6 sm:p-8 bg-white dark:bg-slate-900 flex flex-col justify-between transition-colors">
          <div>
            {/* Top Toggle: Sign In vs Register */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-5">
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => { setMode('login'); setErrorMsg(''); setSuccessMsg(''); }}
                  className={`text-sm font-bold pb-1 transition-colors cursor-pointer ${
                    mode === 'login'
                      ? 'text-[#2563EB] dark:text-blue-400 border-b-2 border-[#2563EB] dark:border-blue-400'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => { setMode('register'); setErrorMsg(''); setSuccessMsg(''); }}
                  className={`text-sm font-bold pb-1 transition-colors cursor-pointer ${
                    mode === 'register'
                      ? 'text-[#2563EB] dark:text-blue-400 border-b-2 border-[#2563EB] dark:border-blue-400'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  Register as {getRoleTitle(selectedRole)}
                </button>
              </div>

              <span className="text-[11px] font-semibold text-slate-500 hidden sm:inline">
                {selectedRole.replace('_', ' ')}
              </span>
            </div>

            {/* Social Authentication Options (LinkedIn, Gmail, Facebook) */}
            <div className="mb-5 space-y-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block text-center">
                {mode === 'login' ? 'Instant Sign In with' : 'Instant Sign Up with'}
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {/* LinkedIn */}
                <button
                  type="button"
                  onClick={() => handleSocialAuth('linkedin')}
                  disabled={!!socialLoading || isLoading}
                  className="w-full py-2 px-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-[#0A66C2] dark:text-blue-400 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer disabled:opacity-50"
                  title="Sign in with LinkedIn"
                >
                  {socialLoading === 'linkedin' ? (
                    <span className="inline-block w-4 h-4 border-2 border-[#0A66C2] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <svg className="w-4 h-4 shrink-0 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  )}
                  <span className="truncate">LinkedIn</span>
                </button>

                {/* Gmail / Google */}
                <button
                  type="button"
                  onClick={() => handleSocialAuth('gmail')}
                  disabled={!!socialLoading || isLoading}
                  className="w-full py-2 px-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer disabled:opacity-50"
                  title="Sign in with Google / Gmail"
                >
                  {socialLoading === 'gmail' ? (
                    <span className="inline-block w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                      <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                    </svg>
                  )}
                  <span className="truncate">Gmail / Google</span>
                </button>

                {/* Facebook */}
                <button
                  type="button"
                  onClick={() => handleSocialAuth('facebook')}
                  disabled={!!socialLoading || isLoading}
                  className="w-full py-2 px-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-[#1877F2] dark:text-blue-400 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer disabled:opacity-50"
                  title="Sign in with Facebook"
                >
                  {socialLoading === 'facebook' ? (
                    <span className="inline-block w-4 h-4 border-2 border-[#1877F2] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <svg className="w-4 h-4 shrink-0 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  )}
                  <span className="truncate">Facebook</span>
                </button>
              </div>

              {/* Divider */}
              <div className="relative flex items-center py-2">
                <div className="grow border-t border-slate-200 dark:border-slate-800"></div>
                <span className="shrink mx-3 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  or with email credentials
                </span>
                <div className="grow border-t border-slate-200 dark:border-slate-800"></div>
              </div>
            </div>

            {/* Error or Success feedback */}
            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                {errorMsg}
              </div>
            )}
            {successMsg && (
              <div className="mb-4 p-3 bg-lime-50 dark:bg-lime-950/60 border border-lime-200 dark:border-lime-800 text-lime-800 dark:text-lime-300 text-xs rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-lime-600 dark:text-lime-400" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              
              {/* Role-Specific Registration Fields */}
              {mode === 'register' && (
                <>
                  {selectedRole === 'job_seeker' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Full Name</label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Oluwaseun Adeleke"
                          className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 text-xs"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Phone Number</label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+234 800 000 0000"
                          className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 text-xs"
                        />
                      </div>
                    </div>
                  )}

                  {selectedRole === 'employer' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Company / Organization Name</label>
                        <input
                          type="text"
                          required
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="e.g. Sterling Tech Hub"
                          className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 text-xs"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Company Size</label>
                        <select
                          value={companySize}
                          onChange={(e) => setCompanySize(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 text-xs cursor-pointer"
                        >
                          <option value="1-50">1 - 50 employees</option>
                          <option value="51-200">51 - 200 employees</option>
                          <option value="201-1000">201 - 1,000 employees</option>
                          <option value="1000+">1,000+ employees</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {selectedRole === 'agency' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Recruitment Agency Name</label>
                        <input
                          type="text"
                          required
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="e.g. Apex Talent Consultants"
                          className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 text-xs"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Primary Specialization</label>
                        <select
                          value={specialization}
                          onChange={(e) => setSpecialization(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 text-xs cursor-pointer"
                        >
                          <option value="Executive Search & Headhunting">Executive Search & Headhunting</option>
                          <option value="IT & Software Staffing">IT & Software Staffing</option>
                          <option value="Finance & Accounting">Finance & Accounting</option>
                          <option value="General Corporate Staffing">General Corporate Staffing</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {selectedRole === 'partner' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Partner Organization / Practice</label>
                        <input
                          type="text"
                          required
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="e.g. West Africa HR Consult"
                          className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 text-xs"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Partner Program Track</label>
                        <select
                          value={partnerType}
                          onChange={(e) => setPartnerType(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 text-xs cursor-pointer"
                        >
                          <option value="HR & Workforce Consultant">HR & Workforce Consultant</option>
                          <option value="HRMS Software Integrator">HRMS Software Integrator</option>
                          <option value="Commercial Referral Partner">Commercial Referral Partner</option>
                        </select>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Email Address */}
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  {selectedRole === 'employer' ? 'Official Work Email' : 'Email Address'}
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={selectedRole === 'employer' ? 'name@company.com' : 'you@example.com'}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Password</label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setSuccessMsg('Password reset link has been dispatched to ' + (email || 'your email address') + '.')}
                      className="text-[11px] text-[#2563EB] dark:text-blue-400 hover:underline cursor-pointer"
                    >
                      Forgot Password?
                    </button>
                  )}
                </div>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter secure password"
                    className="w-full pl-9 pr-9 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me / Terms */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 dark:border-slate-700 text-[#2563EB] focus:ring-[#2563EB]"
                  />
                  <span>Keep me signed in</span>
                </label>
                
                {mode === 'register' && (
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">
                    Protected by NDPA & GDPR
                  </span>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {isLoading ? (
                    <span>Authenticating...</span>
                  ) : (
                    <>
                      <span>{mode === 'login' ? `Sign In as ${getRoleTitle(selectedRole)}` : `Create ${getRoleTitle(selectedRole)} Account`}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>

          {/* Bottom Footnote */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 text-center">
            {mode === 'login' ? (
              <p>
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className="text-[#2563EB] dark:text-blue-400 font-bold hover:underline cursor-pointer"
                >
                  Register here
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-[#2563EB] dark:text-blue-400 font-bold hover:underline cursor-pointer"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
