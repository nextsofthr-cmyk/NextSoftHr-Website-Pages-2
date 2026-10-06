import React, { useState } from 'react';
import { Course, TrainingFormat } from '../types';
import { COURSES } from '../data/academyData';
import confetti from 'canvas-confetti';
import {
  X,
  CheckCircle2,
  Lock,
  CreditCard,
  Building,
  User,
  Mail,
  Phone,
  Globe,
  Briefcase,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
} from 'lucide-react';

import { useCurrency } from '../context/CurrencyContext';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedCourse?: Course | null;
  currency?: string;
  onRegistrationSuccess: (enrolledCourseId: string) => void;
  onOpenLearnerPortal: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  preSelectedCourse,
  onRegistrationSuccess,
  onOpenLearnerPortal,
}) => {
  const { formatCoursePrice, currentCurrency } = useCurrency();
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [selectedCourseId, setSelectedCourseId] = useState<string>(
    preSelectedCourse ? preSelectedCourse.id : COURSES[0].id
  );
  const [selectedFormat, setSelectedFormat] = useState<TrainingFormat>(
    preSelectedCourse ? preSelectedCourse.format : 'Self-Paced'
  );

  // Form Fields
  const [fullName, setFullName] = useState('Chidinma Osuagwu');
  const [email, setEmail] = useState('chidinma.o@finbridge.africa');
  const [phone, setPhone] = useState('+234 803 456 7890');
  const [country, setCountry] = useState('Nigeria');
  const [organization, setOrganization] = useState('FinBridge Africa');
  const [jobTitle, setJobTitle] = useState('Senior HR Officer');

  // Account creation fields
  const [password, setPassword] = useState('••••••••••••');
  const [experienceLevel, setExperienceLevel] = useState('Mid-level (3-5 years)');

  // Payment fields
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank_transfer' | 'paystack' | 'corporate_invoice'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedRegId, setGeneratedRegId] = useState('NSHR-REG-849201');

  if (!isOpen) return null;

  const currentCourse = COURSES.find((c) => c.id === selectedCourseId) || COURSES[0];

  const formatPrice = (course: Course) => formatCoursePrice(course);

  const handleNextStep = () => {
    if (step < 4) {
      setStep((step + 1) as any);
    } else if (step === 4) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setStep(5);
        onRegistrationSuccess(currentCourse.id);
        try {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.6 },
          });
        } catch {
          // ignore if canvas-confetti issues
        }
      }, 1000);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep((step - 1) as any);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white dark:bg-[#0F172A] rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Top Header */}
        <div className="bg-[#0F4C81] dark:bg-blue-950 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1 text-xs text-lime-300 font-bold uppercase tracking-wider">
            <GraduationCap className="w-4 h-4" />
            <span>NextSoftHR Training Academy Registration</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            {step === 5 ? 'Enrollment Confirmed!' : 'Student Admission & Enrollment'}
          </h3>

          {/* Stepper Dots (1 to 5) */}
          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/20">
            {['Course', 'Learner Info', 'Account', 'Payment', 'Confirmed'].map((label, idx) => {
              const currentDot = idx + 1;
              const isPast = currentDot < step;
              const isCurrent = currentDot === step;
              return (
                <div key={idx} className="flex-1">
                  <div
                    className={`h-1.5 rounded-full transition-all ${
                      isCurrent
                        ? 'bg-[#84CC16]'
                        : isPast
                        ? 'bg-blue-300'
                        : 'bg-white/20'
                    }`}
                  />
                  <span className="text-[10px] hidden sm:block mt-1 font-medium text-blue-100">
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Body: Flow Steps */}
        <div className="p-6 sm:p-8">
          
          {/* STEP 1: COURSE SELECTION */}
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                Step 1: Confirm Course & Format
              </h4>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Selected Course
                </label>
                <select
                  value={selectedCourseId}
                  onChange={(e) => setSelectedCourseId(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
                >
                  {COURSES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title} — {c.category} ({formatPrice(c)})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Preferred Training Format
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {(['Self-Paced', 'Live Instructor-Led', 'Corporate', 'On-Site'] as TrainingFormat[]).map(
                    (fmt) => (
                      <button
                        key={fmt}
                        type="button"
                        onClick={() => setSelectedFormat(fmt)}
                        className={`p-3 rounded-lg border text-left text-xs font-bold transition-all cursor-pointer ${
                          selectedFormat === fmt
                            ? 'bg-blue-50 dark:bg-blue-950 border-[#0F4C81] dark:border-blue-500 text-[#0F4C81] dark:text-[#84CC16]'
                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750'
                        }`}
                      >
                        {fmt}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Standard Tuition Fee:</span>
                  <div className="text-lg font-extrabold text-[#0F4C81] dark:text-[#84CC16]">
                    {formatPrice(currentCourse)}
                  </div>
                </div>
                <span className="text-xs text-[#65A30D] dark:text-[#84CC16] font-semibold bg-lime-50 dark:bg-lime-950 px-2.5 py-1 rounded border border-lime-200 dark:border-lime-800">
                  Full Certification Included
                </span>
              </div>
            </div>
          )}

          {/* STEP 2: LEARNER INFORMATION */}
          {step === 2 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                Step 2: Learner Information
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      placeholder="e.g. Chidinma Osuagwu"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Work Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="e.g. chidinma@company.com"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      placeholder="+234 800 000 0000"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Country
                  </label>
                  <div className="relative">
                    <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="e.g. Nigeria, Ghana, Kenya"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Organization / Company
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      placeholder="e.g. FinBridge Africa"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Job Title
                  </label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      placeholder="e.g. Senior HR Officer"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: ACCOUNT CREATION */}
          {step === 3 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                Step 3: Learning Portal Access Credentials
              </h4>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Portal Login Email
                </label>
                <input
                  type="text"
                  disabled
                  value={email}
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs text-slate-500 dark:text-slate-400 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Create Student Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter secure password"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Current Professional Experience
                </label>
                <select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs text-slate-800 dark:text-slate-200"
                >
                  <option value="Entry Level (0-2 years)">Entry Level (0-2 years)</option>
                  <option value="Mid-level (3-5 years)">Mid-level (3-5 years)</option>
                  <option value="Senior Level (6-10 years)">Senior Level (6-10 years)</option>
                  <option value="Executive / Director (10+ years)">Executive / Director (10+ years)</option>
                </select>
              </div>

              <div className="p-3 bg-blue-50/70 dark:bg-blue-950/70 border border-blue-200/60 dark:border-blue-800/60 rounded-lg text-xs text-slate-600 dark:text-slate-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0F4C81] dark:text-[#84CC16] flex-shrink-0" />
                <span>Single sign-on access to all future NextSoftHR Academy courses and certifications.</span>
              </div>
            </div>
          )}

          {/* STEP 4: PAYMENT */}
          {step === 4 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                Step 4: Secure Tuition Settlement
              </h4>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Due for: {currentCourse.title}</div>
                  <div className="text-2xl font-extrabold text-[#0F4C81] dark:text-[#84CC16]">
                    {formatPrice(currentCourse)}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-[#65A30D] dark:text-[#84CC16] font-bold">
                  <Lock className="w-3.5 h-3.5" />
                  <span>256-Bit SSL Encrypted</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Select Payment Method
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { id: 'card', name: 'Credit/Debit Card', subtitle: 'Visa, Mastercard, Verve' },
                    { id: 'bank_transfer', name: 'Direct Bank Transfer', subtitle: 'Instant account funding' },
                    { id: 'paystack', name: 'Paystack / Flutterwave', subtitle: 'Pan-African & Global gateway' },
                    { id: 'corporate_invoice', name: 'Company Invoice', subtitle: 'Net-30 Enterprise billing' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id as any)}
                      className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                        paymentMethod === m.id
                          ? 'bg-blue-50 dark:bg-blue-950 border-[#0F4C81] dark:border-blue-500 text-[#0F4C81] dark:text-[#84CC16]'
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750'
                      }`}
                    >
                      <div className="text-xs font-bold">{m.name}</div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">{m.subtitle}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment preview info */}
              <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs text-slate-600 dark:text-slate-300 space-y-1">
                <div className="flex justify-between">
                  <span>Student Name:</span>
                  <span className="font-semibold text-slate-800 dark:text-white">{fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Access Grant:</span>
                  <span className="font-semibold text-[#65A30D] dark:text-[#84CC16]">Instant Lifetime Access</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: CONFIRMATION / WELCOME */}
          {step === 5 && (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-lime-100 dark:bg-lime-950 text-[#65A30D] dark:text-[#84CC16] flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="inline-block px-3 py-1 rounded bg-blue-50 dark:bg-blue-950 text-[#0F4C81] dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
                Registration Verified
              </div>

              <h3 className="text-2xl font-extrabold text-[#0F172A] dark:text-white">
                Welcome to NextSoftHR Training Academy!
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                Congratulations, <strong className="text-slate-900 dark:text-white">{fullName}</strong>. Your enrollment in{' '}
                <strong className="text-[#0F4C81] dark:text-[#84CC16]">{currentCourse.title}</strong> has been successfully processed.
              </p>

              {/* Receipt Summary Card */}
              <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                  <span className="text-slate-500 dark:text-slate-400">Student ID / Reg No:</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-white">{generatedRegId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Course Access:</span>
                  <span className="font-bold text-[#65A30D] dark:text-[#84CC16]">Active Now (Instant)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Training Format:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedFormat}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Amount Paid:</span>
                  <span className="font-bold text-[#0F4C81] dark:text-[#84CC16]">{formatPrice(currentCourse)}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => {
                    onClose();
                    onOpenLearnerPortal();
                  }}
                  className="w-full sm:w-auto px-6 py-3 text-xs font-bold text-white bg-[#0F4C81] hover:bg-[#0B3C68] dark:bg-blue-600 dark:hover:bg-blue-700 rounded-md shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <GraduationCap className="w-4 h-4 text-[#84CC16]" />
                  <span>Launch My Learning Portal</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors cursor-pointer"
                >
                  Close & Continue Browsing
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls (Steps 1 to 4) */}
        {step < 5 && (
          <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={handleNextStep}
              disabled={isProcessing}
              className="px-6 py-2.5 text-xs font-bold text-white bg-[#0F4C81] hover:bg-[#0B3C68] dark:bg-blue-600 dark:hover:bg-blue-700 disabled:opacity-50 rounded-md shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>
                {isProcessing
                  ? 'Processing Settlement...'
                  : step === 4
                  ? 'Complete Enrollment & Pay'
                  : 'Continue to Next Step'}
              </span>
              {!isProcessing && <ArrowRight className="w-3.5 h-3.5 text-[#84CC16]" />}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
