import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Sparkles, 
  Building, 
  User, 
  CheckSquare, 
  Award,
  Send,
  PhoneCall
} from 'lucide-react';
import { ApplicationFormData } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ApplicationFormProps {
  initialPartnerType?: string;
  onSuccess?: () => void;
}

export const ApplicationForm: React.FC<ApplicationFormProps> = ({ initialPartnerType = 'HR Consultant' }) => {
  const { strings, isRTL } = useLanguage();
  const a = strings.apply;
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [applicationRef, setApplicationRef] = useState<string>('');

  const [formData, setFormData] = useState<ApplicationFormData>({
    fullName: '',
    email: '',
    phone: '',
    country: 'Nigeria',
    city: 'Lagos',
    companyName: '',
    website: '',
    businessType: 'Consulting Firm',
    yearsInBusiness: '3-5 years',
    numberOfEmployees: '10-25',
    countriesServed: 'Nigeria & West Africa',
    partnerType: initialPartnerType,
    partnershipInterests: ['Referral Partner', 'Consulting Partner'],
    notes: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const partnerTypeOptions = [
    'HR Consultant',
    'Accountant',
    'Accounting Firm',
    'Payroll Consultant',
    'Tax Consultant',
    'Audit Firm',
    'IT Company',
    'Technology Company',
    'Software Reseller',
    'Business Consultant',
    'Recruitment Agency',
    'Outsourcing Company',
    'Business Advisor',
    'Other'
  ];

  const interestOptions = [
    'Referral Partner',
    'Reseller Partner',
    'Consulting Partner',
    'Technology Partner',
    'Strategic Partner',
    'Implementation Partner'
  ];

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => {
      const exists = prev.partnershipInterests.includes(interest);
      return {
        ...prev,
        partnershipInterests: exists
          ? prev.partnershipInterests.filter(i => i !== interest)
          : [...prev.partnershipInterests, interest]
      };
    });
  };

  const validateStep = (step: number) => {
    const newErrors: { [key: string]: string } = {};

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
      if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'Valid business email is required';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!formData.country.trim()) newErrors.country = 'Country is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
    } else if (step === 2) {
      if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    } else if (step === 4) {
      if (formData.partnershipInterests.length === 0) {
        newErrors.interests = 'Please select at least one partnership interest';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(4)) {
      const randomCode = 'NX-PTR-' + Math.floor(100000 + Math.random() * 900000);
      setApplicationRef(randomCode);
      setIsSubmitted(true);
    }
  };

  return (
    <section id="apply" className="py-24 bg-gradient-to-b from-slate-100 via-white to-slate-100 dark:from-[#040E1F] dark:via-[#071D3E] dark:to-[#040E1F] relative transition-colors duration-300">
      {/* Glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 dark:bg-[#B8F010]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-[#B8F010]/40 text-xs font-bold text-blue-800 dark:text-[#B8F010] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{a.tag}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            {a.title}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            {a.subtitle}
          </p>
        </div>

        {/* Application Card Container */}
        <div className="rounded-3xl bg-white dark:bg-[#030914] border-2 border-slate-200 dark:border-blue-700/80 shadow-xl dark:shadow-2xl p-6 sm:p-10 relative overflow-hidden transition-colors">
          
          {!isSubmitted ? (
            <div>
              {/* Multi-Step Progress Tracker */}
              <div className="mb-8">
                <div className="grid grid-cols-4 gap-2 text-center text-xs font-bold mb-3">
                  {[
                    { step: 1, label: 'Personal Info' },
                    { step: 2, label: 'Business Info' },
                    { step: 3, label: 'Partner Profile' },
                    { step: 4, label: 'Interest & Submit' }
                  ].map((s) => (
                    <div
                      key={s.step}
                      className={`cursor-pointer transition-colors ${
                        currentStep >= s.step ? 'text-blue-700 dark:text-[#B8F010]' : 'text-slate-400 dark:text-slate-500'
                      }`}
                      onClick={() => {
                        if (s.step < currentStep) setCurrentStep(s.step);
                      }}
                    >
                      <span className="hidden sm:inline">Step {s.step}: </span>
                      <span>{s.label}</span>
                    </div>
                  ))}
                </div>

                {/* Progress Bar */}
                <div className="h-2 bg-slate-100 dark:bg-blue-950 rounded-full overflow-hidden border border-slate-200 dark:border-blue-900">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 to-[#B8F010] transition-all duration-300"
                    style={{ width: `${(currentStep / 4) * 100}%` }}
                  />
                </div>
              </div>

              {/* Form Element */}
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* STEP 1: PERSONAL INFORMATION */}
                {currentStep === 1 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="pb-2 border-b border-slate-200 dark:border-blue-900 flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                      <User className="w-4 h-4 text-blue-600 dark:text-[#B8F010]" />
                      <span>Step 1 — Personal Information</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Babatunde Adeyemi"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#071D3E] border text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-600 dark:focus:border-[#B8F010] shadow-xs ${
                            errors.fullName ? 'border-red-500' : 'border-slate-300 dark:border-blue-800'
                          }`}
                        />
                        {errors.fullName && <p className="text-[11px] text-red-500 dark:text-red-400 mt-1">{errors.fullName}</p>}
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="name@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#071D3E] border text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-600 dark:focus:border-[#B8F010] shadow-xs ${
                            errors.email ? 'border-red-500' : 'border-slate-300 dark:border-blue-800'
                          }`}
                        />
                        {errors.email && <p className="text-[11px] text-red-500 dark:text-red-400 mt-1">{errors.email}</p>}
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                          Phone Number (WhatsApp preferred) *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+234..."
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#071D3E] border text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-600 dark:focus:border-[#B8F010] shadow-xs ${
                            errors.phone ? 'border-red-500' : 'border-slate-300 dark:border-blue-800'
                          }`}
                        />
                        {errors.phone && <p className="text-[11px] text-red-500 dark:text-red-400 mt-1">{errors.phone}</p>}
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                            Country *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Nigeria, Kenya, UK..."
                            value={formData.country}
                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            className="w-full px-3 py-3 rounded-xl bg-slate-50 dark:bg-[#071D3E] border border-slate-300 dark:border-blue-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-600 dark:focus:border-[#B8F010] shadow-xs"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                            City *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Lagos, Nairobi..."
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            className="w-full px-3 py-3 rounded-xl bg-slate-50 dark:bg-[#071D3E] border border-slate-300 dark:border-blue-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-600 dark:focus:border-[#B8F010] shadow-xs"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: BUSINESS INFORMATION */}
                {currentStep === 2 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="pb-2 border-b border-slate-200 dark:border-blue-900 flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                      <Building className="w-4 h-4 text-blue-600 dark:text-[#B8F010]" />
                      <span>Step 2 — Business Information</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                          Company / Organization Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Apex Advisory & Associates"
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#071D3E] border text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-600 dark:focus:border-[#B8F010] shadow-xs ${
                            errors.companyName ? 'border-red-500' : 'border-slate-300 dark:border-blue-800'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                          Website / LinkedIn Page
                        </label>
                        <input
                          type="text"
                          placeholder="www.yourcompany.com"
                          value={formData.website}
                          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#071D3E] border border-slate-300 dark:border-blue-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-600 dark:focus:border-[#B8F010] shadow-xs"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                          Years in Business
                        </label>
                        <select
                          value={formData.yearsInBusiness}
                          onChange={(e) => setFormData({ ...formData, yearsInBusiness: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#071D3E] border border-slate-300 dark:border-blue-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-[#B8F010] shadow-xs"
                        >
                          <option value="Less than 1 year">Less than 1 year</option>
                          <option value="1-3 years">1 - 3 years</option>
                          <option value="3-5 years">3 - 5 years</option>
                          <option value="5-10 years">5 - 10 years</option>
                          <option value="10+ years">10+ years</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                          Number of Employees in Your Practice
                        </label>
                        <select
                          value={formData.numberOfEmployees}
                          onChange={(e) => setFormData({ ...formData, numberOfEmployees: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#071D3E] border border-slate-300 dark:border-blue-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-[#B8F010] shadow-xs"
                        >
                          <option value="1-5">1 - 5 (Solo / Boutique)</option>
                          <option value="6-20">6 - 20</option>
                          <option value="21-50">21 - 50</option>
                          <option value="50+">50+ (Mid-Tier / Enterprise)</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                          Countries Served by Your Practice
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Nigeria, Ghana, Kenya, UK clients..."
                          value={formData.countriesServed}
                          onChange={(e) => setFormData({ ...formData, countriesServed: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#071D3E] border border-slate-300 dark:border-blue-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-600 dark:focus:border-[#B8F010] shadow-xs"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: PARTNERSHIP PROFILE */}
                {currentStep === 3 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="pb-2 border-b border-slate-200 dark:border-blue-900 flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                      <Award className="w-4 h-4 text-blue-600 dark:text-[#B8F010]" />
                      <span>Step 3 — Partnership Profile</span>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-2">
                        Select Your Partner Type *
                      </label>
                      <select
                        value={formData.partnerType}
                        onChange={(e) => setFormData({ ...formData, partnerType: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-[#071D3E] border-2 border-slate-300 dark:border-blue-700 text-sm text-slate-900 dark:text-white font-medium focus:outline-none focus:border-blue-600 dark:focus:border-[#B8F010] shadow-xs"
                      >
                        {partnerTypeOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-white dark:bg-[#071D3E] text-slate-900 dark:text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                        Selected: <strong className="text-blue-700 dark:text-[#B8F010]">{formData.partnerType}</strong>. Our partner onboarding will be tailored to this profile.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 mt-4">
                      <span className="text-xs font-bold text-slate-900 dark:text-white block mb-1">What this means for your firm:</span>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        As a {formData.partnerType}, you receive pre-configured client presentation decks, regional compliance rulebooks, and direct access to our partner solutions engineers.
                      </p>
                    </div>
                  </div>
                )}

                {/* STEP 4: PARTNERSHIP INTEREST & SUBMIT */}
                {currentStep === 4 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="pb-2 border-b border-slate-200 dark:border-blue-900 flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                      <CheckSquare className="w-4 h-4 text-blue-600 dark:text-[#B8F010]" />
                      <span>Step 4 — Partnership Interest</span>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-3">
                        Which Partnership Models Interest You? (Select all that apply) *
                      </label>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {interestOptions.map((interest) => {
                          const isChecked = formData.partnershipInterests.includes(interest);
                          return (
                            <div
                              key={interest}
                              onClick={() => handleInterestToggle(interest)}
                              className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                                isChecked
                                  ? 'bg-blue-50 dark:bg-blue-900/80 border-blue-600 dark:border-[#B8F010] shadow-sm'
                                  : 'bg-slate-50 dark:bg-[#071D3E] border-slate-200 dark:border-blue-800 hover:border-slate-300 dark:hover:border-blue-700'
                              }`}
                            >
                              <div className={`w-5 h-5 rounded flex items-center justify-center ${
                                isChecked ? 'bg-[#B8F010] text-[#040E1F]' : 'border border-slate-300 dark:border-slate-500 bg-white dark:bg-blue-950'
                              }`}>
                                {isChecked && <CheckCircle2 className="w-4 h-4" />}
                              </div>
                              <span className="text-xs font-bold text-slate-900 dark:text-white">{interest}</span>
                            </div>
                          );
                        })}
                      </div>
                      {errors.interests && <p className="text-xs text-red-500 dark:text-red-400 mt-2">{errors.interests}</p>}
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                        Additional Notes or Client Referral Volume (Optional)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Tell us about the number of corporate clients you plan to introduce..."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#071D3E] border border-slate-300 dark:border-blue-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-600 dark:focus:border-[#B8F010] shadow-xs"
                      />
                    </div>
                  </div>
                )}

                {/* Form Controls / Buttons */}
                <div className="pt-6 border-t border-slate-200 dark:border-blue-900/80 flex items-center justify-between gap-4">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-5 py-3 rounded-xl bg-slate-100 dark:bg-[#071D3E] hover:bg-slate-200 dark:hover:bg-blue-900 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-blue-800 text-xs font-bold transition-all flex items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Previous</span>
                    </button>
                  ) : <div />}

                  {currentStep < 4 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-6 py-3 rounded-xl bg-[#B8F010] text-[#040E1F] text-xs font-extrabold hover:bg-[#CBFF1A] transition-all flex items-center gap-2 shadow"
                    >
                      <span>Continue to Step {currentStep + 1}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      id="submit-partner-application-btn"
                      className="px-8 py-3.5 rounded-xl bg-[#B8F010] text-[#040E1F] text-sm font-black hover:bg-[#CBFF1A] transition-all flex items-center gap-2 shadow-lg shadow-[#B8F010]/20 transform hover:-translate-y-0.5"
                    >
                      <Send className="w-4 h-4" />
                      <span>Apply to Become a Partner</span>
                    </button>
                  )}
                </div>

                {/* Trust Note */}
                <div className="pt-2 text-center text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-[#B8F010]" />
                  <span>Our partnership team will review your application and contact you with the next steps.</span>
                </div>

              </form>
            </div>
          ) : (
            /* Submission Success Celebration State */
            <div className="text-center py-10 space-y-6 animate-in zoom-in-95 duration-200">
              <div className="w-20 h-20 rounded-full bg-[#B8F010]/20 border-2 border-[#B8F010] flex items-center justify-center mx-auto text-blue-700 dark:text-[#B8F010]">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-800 dark:text-[#B8F010] border border-blue-200 dark:border-blue-800">
                  APPLICATION RECEIVED • REF: {applicationRef}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  Welcome to the NextSofthr Partner Network!
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-slate-900 dark:text-white">{formData.fullName}</strong>. Your partner application for <strong className="text-blue-700 dark:text-[#B8F010]">{formData.companyName || 'your organization'}</strong> as a <strong className="text-slate-900 dark:text-white">{formData.partnerType}</strong> has been logged into our global partner registry.
                </p>
              </div>

              <div className="max-w-md mx-auto p-4 rounded-xl bg-slate-50 dark:bg-blue-950/80 border border-slate-200 dark:border-blue-800 text-left text-xs text-slate-700 dark:text-slate-300 space-y-2 shadow-xs">
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-[#B8F010]" />
                  <span>Immediate Next Steps:</span>
                </div>
                <p>1. Our Partner Operations team will review your profile within 24 to 48 hours.</p>
                <p>2. You will receive an invitation to schedule an onboarding & sandbox access call.</p>
                <p>3. Your dedicated Partner Manager will dispatch your co-branded sales kit.</p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="tel:+2349158482622"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-900 dark:hover:bg-blue-800 text-white text-xs font-bold transition-all border border-blue-500 dark:border-blue-700 shadow-sm"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#B8F010]" />
                  <span>Call Partner Desk (+234 915 848 2622)</span>
                </a>

                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setCurrentStep(1);
                  }}
                  className="text-xs text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white underline"
                >
                  Submit Another Application
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
