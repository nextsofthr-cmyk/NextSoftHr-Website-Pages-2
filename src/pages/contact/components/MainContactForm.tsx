import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  ArrowUp,
  ArrowUpRight,
  CheckCircle2, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Building, 
  Globe, 
  Users, 
  Sparkles, 
  RefreshCw,
  Clock,
  Layers,
  Copy,
  Check
} from 'lucide-react';
import { COUNTRIES, COMPANY_SIZES, ENQUIRY_TYPES, BRAND, REGIONAL_EMAILS } from '../data/content';
import { ContactFormData, EnquiryType } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface MainContactFormProps {
  selectedEnquiry: EnquiryType;
  onEnquiryChange: (type: EnquiryType) => void;
  initialMessage?: string;
}

export const MainContactForm: React.FC<MainContactFormProps> = ({
  selectedEnquiry,
  onEnquiryChange,
  initialMessage = '',
}) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    companyName: '',
    workEmail: '',
    phone: '',
    country: 'Nigeria',
    companySize: '11–50',
    enquiryType: selectedEnquiry,
    message: initialMessage,
    agreeToContact: true,
    // Payroll dynamic fields
    payrollEmployeesCount: '',
    payrollCountries: ['Nigeria'],
    payrollFrequency: 'Monthly',
    currentPayrollSystem: 'Excel / Spreadsheets',
    // HR dynamic fields
    hrEmployeesCount: '',
    hrTeamSize: 'Solo HR / Founder',
    currentHrSoftware: '',
    mainHrChallenge: 'Scattered employee records & manual files',
    // Enterprise dynamic fields
    enterpriseLocations: '2–5 branches',
    enterpriseCountries: 'Multiple African Countries',
    currentErpSystem: 'None / Moving from legacy',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<ContactFormData | null>(null);
  const [referenceId, setReferenceId] = useState<string>('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const handleCopyEmail = (e: React.MouseEvent, email: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => {
      setCopiedEmail((curr) => (curr === email ? null : curr));
    }, 2000);
  };

  // Sync when prop changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      enquiryType: selectedEnquiry,
    }));
  }, [selectedEnquiry]);

  useEffect(() => {
    if (initialMessage) {
      setFormData((prev) => ({
        ...prev,
        message: initialMessage,
      }));
    }
  }, [initialMessage]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationError) setValidationError(null);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, agreeToContact: e.target.checked }));
  };

  const handleEnquirySelect = (type: EnquiryType) => {
    setFormData((prev) => ({ ...prev, enquiryType: type }));
    onEnquiryChange(type);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate required fields
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setValidationError('Please enter your full first and last name.');
      return;
    }
    if (!formData.workEmail.trim() || !formData.workEmail.includes('@')) {
      setValidationError('Please provide a valid work email address.');
      return;
    }
    if (!formData.companyName.trim()) {
      setValidationError('Please enter your business or company name.');
      return;
    }
    if (!formData.phone.trim()) {
      setValidationError('Please enter a reachable contact phone number.');
      return;
    }
    if (!formData.agreeToContact) {
      setValidationError('Please confirm consent to be contacted regarding your enquiry.');
      return;
    }

    setIsSubmitting(true);
    setValidationError(null);

    // Simulate reliable submission
    setTimeout(() => {
      const generatedRef = `NSH-${Date.now().toString().slice(-6)}`;
      setReferenceId(generatedRef);
      setIsSubmitting(false);
      setIsSubmitted(true);
      setSubmittedData({ ...formData });

      // Smoothly bring the confirmation message into view if needed
      const formCard = document.getElementById('contact-form-card');
      if (formCard) {
        formCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 900);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setSubmittedData(null);
    setReferenceId('');
    setFormData({
      firstName: '',
      lastName: '',
      companyName: '',
      workEmail: '',
      phone: '',
      country: 'Nigeria',
      companySize: '11–50',
      enquiryType: 'HR Management',
      message: '',
      agreeToContact: true,
      payrollEmployeesCount: '',
      payrollCountries: ['Nigeria'],
      payrollFrequency: 'Monthly',
      currentPayrollSystem: 'Excel / Spreadsheets',
      hrEmployeesCount: '',
      hrTeamSize: 'Solo HR / Founder',
      currentHrSoftware: '',
      mainHrChallenge: 'Scattered employee records & manual files',
      enterpriseLocations: '2–5 branches',
      enterpriseCountries: 'Multiple African Countries',
      currentErpSystem: 'None / Moving from legacy',
    });
  };

  return (
    <section id="contact-form" className="py-20 bg-[#F7FAFC] dark:bg-[#071322] relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Column: Context, Regional Specialist Desks, Advisory Guarantee */}
          <div className="flex flex-col h-full">
            <div className="bg-white dark:bg-[#0D1F38] rounded-3xl p-6 sm:p-8 lg:p-9 border border-slate-200/90 dark:border-white/10 shadow-xl relative overflow-hidden transition-all duration-300 h-full flex flex-col justify-between space-y-6">
              
              {/* Top Accent Gradient Bar matching right card */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#C8F000] via-[#1769E0] to-[#C8F000]"></div>

              {/* Header Content */}
              <div className="space-y-3 pt-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1769E0]/10 dark:bg-[#1769E0]/20 text-[#1769E0] dark:text-[#C8F000] text-xs font-bold uppercase tracking-wider">
                  <span>{t.form.badge}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1F3A] dark:text-white tracking-tight font-display">
                  {t.form.title}
                </h2>
                <p className="text-base sm:text-lg font-semibold text-[#1769E0] dark:text-[#C8F000]">
                  {t.form.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {BRAND.responseTimeStatement}
                </p>
              </div>

              {/* 6 Regional & Specialist Email Desks */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#1769E0] dark:text-[#C8F000]" />
                    <span>Specialist Regional Inboxes</span>
                  </h4>
                  <span className="text-[11px] font-semibold text-[#1769E0] dark:text-[#C8F000]">Direct Routing</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {REGIONAL_EMAILS.map((desk) => (
                    <div
                      key={desk.email}
                      className="group flex flex-col justify-between p-3 rounded-xl bg-[#F7FAFC] dark:bg-[#071322] hover:bg-slate-50 dark:hover:bg-[#0e2444] border border-slate-200/80 dark:border-white/10 hover:border-[#1769E0]/50 dark:hover:border-[#C8F000]/50 shadow-xs hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-center justify-between gap-1.5 mb-1.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wide bg-[#1769E0]/10 dark:bg-[#1769E0]/20 text-[#1769E0] dark:text-[#C8F000]">
                          {desk.badge}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={(e) => handleCopyEmail(e, desk.email)}
                            title={`Copy ${desk.email}`}
                            className="p-1 rounded hover:bg-slate-200 dark:hover:bg-white/10 text-slate-400 hover:text-[#1769E0] dark:hover:text-[#C8F000] transition-colors cursor-pointer"
                          >
                            {copiedEmail === desk.email ? (
                              <Check className="w-3 h-3 text-emerald-500" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                          <a
                            href={`mailto:${desk.email}`}
                            title={`Send email to ${desk.email}`}
                            className="p-1 rounded hover:bg-slate-200 dark:hover:bg-white/10 text-slate-400 hover:text-[#1769E0] dark:hover:text-[#C8F000] transition-colors"
                          >
                            <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </a>
                        </div>
                      </div>

                      <div>
                        <div className="text-xs font-bold text-[#0B1F3A] dark:text-white group-hover:text-[#1769E0] dark:group-hover:text-[#C8F000] transition-colors leading-tight">
                          {desk.title}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                          {desk.region}
                        </div>
                      </div>

                      <div className="mt-2 pt-2 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between text-xs">
                        <a
                          href={`mailto:${desk.email}`}
                          className="font-mono text-[11px] font-semibold text-[#1769E0] dark:text-slate-200 hover:underline transition-colors truncate"
                        >
                          {desk.email}
                        </a>
                        <span className="text-[10px] font-bold text-slate-400 group-hover:text-[#1769E0] dark:group-hover:text-[#C8F000]">
                          Email &rarr;
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Telephone / WhatsApp Hotline */}
              <div className="space-y-2">
                <a
                  href={`tel:${BRAND.phoneRaw}`}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#F7FAFC] dark:bg-[#071322] hover:bg-slate-100 dark:hover:bg-[#0e2444] border border-slate-200/80 dark:border-white/10 hover:border-[#1769E0]/40 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#1769E0]/10 flex items-center justify-center text-[#1769E0] dark:text-[#C8F000]">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Direct Telephone &amp; Hotline</div>
                      <div className="text-sm font-bold text-[#0B1F3A] dark:text-white font-mono">{BRAND.phone}</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#0B1F3A] bg-[#C8F000] hover:bg-[#b8dd00] px-3 py-1.5 rounded-lg transition-colors">
                    Call Direct
                  </span>
                </a>
              </div>

              {/* Response Time & Operational Hours Card */}
              <div className="p-4 rounded-2xl bg-[#F7FAFC] dark:bg-[#071322] border border-slate-200/80 dark:border-white/10 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#C8F000]/30 text-[#0B1F3A] dark:text-[#C8F000] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0B1F3A] dark:text-white uppercase tracking-wider">{t.form.sidebar.hoursTitle}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                      {t.form.sidebar.hoursSubtitle}
                    </p>
                  </div>
                </div>

                <div className="pt-2.5 border-t border-slate-200/60 dark:border-white/10 grid grid-cols-2 gap-2 text-[11px]">
                  <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1769E0] dark:text-[#C8F000] shrink-0" />
                    <span className="truncate">{t.hero.statCompliance}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1769E0] dark:text-[#C8F000] shrink-0" />
                    <span className="truncate">{t.hero.statPayroll}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1769E0] dark:text-[#C8F000] shrink-0" />
                    <span className="truncate">{t.hero.statScaling}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1769E0] dark:text-[#C8F000] shrink-0" />
                    <span className="truncate">{t.form.sidebar.securityTitle}</span>
                  </div>
                </div>
              </div>

              {/* Trust Microcopy Footer */}
              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-white/5">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{t.form.sidebar.securitySubtitle}</span>
                </span>
                <span className="font-semibold text-[#1769E0] dark:text-[#C8F000]">ISO &amp; NDPR</span>
              </div>

            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="flex flex-col h-full">
            <div id="contact-form-card" className="bg-white dark:bg-[#0D1F38] rounded-3xl p-6 sm:p-8 lg:p-9 border border-slate-200/90 dark:border-white/10 shadow-xl relative overflow-hidden transition-all duration-300 h-full flex flex-col justify-between">
              
              {/* Lemon Green Accent Bar at Top */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#1769E0] via-[#C8F000] to-[#1769E0]"></div>

              {isSubmitted ? (
                /* SUCCESS STATE: Replaces the form with a 'Thank you' confirmation message and clear CTA to return to the top */
                <div className="py-6 sm:py-8 px-2 sm:px-4 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
                  {/* Glowing Success Badge */}
                  <div className="relative inline-flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#C8F000]/25 via-[#1769E0]/15 to-[#C8F000]/30 border-2 border-[#C8F000] mx-auto flex items-center justify-center shadow-lg shadow-[#C8F000]/15">
                      <CheckCircle2 className="w-10 h-10 text-[#0B1F3A] dark:text-[#C8F000]" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#1769E0] text-white flex items-center justify-center text-xs shadow-md">
                      <Sparkles className="w-3.5 h-3.5 text-[#C8F000]" />
                    </div>
                  </div>

                  {/* Thank You Confirmation Header */}
                  <div className="space-y-3 max-w-lg mx-auto">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-300 text-xs font-semibold tracking-wide uppercase">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Request Successfully Processed</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] dark:text-white font-display tracking-tight">
                      {t.form.fields.successTitle}
                    </h3>

                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                      {t.form.fields.successMessage}
                    </p>
                  </div>

                  {/* Submission Summary Card */}
                  {submittedData && (
                    <div className="p-5 rounded-2xl bg-[#F7FAFC] dark:bg-[#09172A] border border-slate-200 dark:border-white/10 text-left max-w-lg mx-auto text-xs text-slate-600 dark:text-slate-300 space-y-2.5 shadow-sm">
                      <div className="flex items-center justify-between pb-2.5 border-b border-slate-200 dark:border-white/10">
                        <span className="font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-[#1769E0] dark:text-[#C8F000]" />
                          <span>Confirmation Reference</span>
                        </span>
                        <span className="font-mono font-bold text-xs px-2.5 py-0.5 rounded-md bg-[#1769E0]/10 dark:bg-[#C8F000]/10 text-[#1769E0] dark:text-[#C8F000]">
                          #{referenceId || 'NSH-VERIFIED'}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-slate-600 dark:text-slate-300">
                        <div>
                          <span className="text-slate-400 block text-[11px] uppercase tracking-wider">{t.form.fields.firstName} / {t.form.fields.lastName}</span>
                          <span className="font-bold text-[#0B1F3A] dark:text-white text-sm">{submittedData.firstName} {submittedData.lastName}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[11px] uppercase tracking-wider">{t.form.fields.companyName}</span>
                          <span className="font-bold text-[#0B1F3A] dark:text-white text-sm">{submittedData.companyName} ({submittedData.companySize})</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[11px] uppercase tracking-wider">{t.form.fields.workEmail}</span>
                          <span className="font-medium text-[#0B1F3A] dark:text-white">{submittedData.workEmail}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[11px] uppercase tracking-wider">{t.form.fields.phone}</span>
                          <span className="font-medium text-[#0B1F3A] dark:text-white">{submittedData.phone}</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-200/70 dark:border-white/5 flex items-center justify-between">
                        <span className="text-slate-400">{t.form.fields.enquiryType}:</span>
                        <span className="font-bold text-[#1769E0] dark:text-[#C8F000]">{submittedData.enquiryType}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">{t.form.fields.country}:</span>
                        <span className="font-bold text-[#0B1F3A] dark:text-white">{submittedData.country}</span>
                      </div>
                    </div>
                  )}

                  {/* Response Timeline & Next Steps */}
                  <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 text-left max-w-lg mx-auto text-xs text-slate-600 dark:text-slate-300 space-y-2">
                    <div className="font-bold text-[#0B1F3A] dark:text-white flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#1769E0] dark:text-[#C8F000]" />
                      <span>Next Steps &amp; Advisory Timeline</span>
                    </div>
                    <div className="space-y-1.5 text-slate-600 dark:text-slate-300">
                      <div className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">1</span>
                        <span>Confirmation receipt dispatched to your work email.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</span>
                        <span>Our regional workforce advisor is reviewing your specifications.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">3</span>
                        <span>Direct response or consultation scheduling within 2–4 business hours.</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons: Clear Call-To-Action to return to the top of the page */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-sm text-[#0B1F3A] bg-[#C8F000] hover:bg-[#b8dd00] shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                    >
                      <ArrowUp className="w-4 h-4 text-[#0B1F3A]" />
                      <span>{t.form.fields.returnToTop}</span>
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 border border-slate-200 dark:border-white/10 transition-colors cursor-pointer"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>{t.form.fields.resetButton}</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* MAIN FORM */
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Validation Error Alert */}
                  {validationError && (
                    <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-300 text-xs font-medium flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                      <span>{validationError}</span>
                    </div>
                  )}

                  {/* Row 1: First Name & Last Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0B1F3A] dark:text-slate-200 uppercase tracking-wider mb-1.5">
                        {t.form.fields.firstName} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder={t.form.fields.firstNamePlaceholder}
                        className="w-full px-4 py-3 rounded-xl bg-[#F7FAFC] dark:bg-[#071322] border border-slate-200 dark:border-white/10 focus:bg-white dark:focus:bg-[#0c1c30] focus:border-[#1769E0] dark:focus:border-[#C8F000] focus:ring-2 focus:ring-[#C8F000]/50 outline-none text-sm text-[#0B1F3A] dark:text-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0B1F3A] dark:text-slate-200 uppercase tracking-wider mb-1.5">
                        {t.form.fields.lastName} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder={t.form.fields.lastNamePlaceholder}
                        className="w-full px-4 py-3 rounded-xl bg-[#F7FAFC] dark:bg-[#071322] border border-slate-200 dark:border-white/10 focus:bg-white dark:focus:bg-[#0c1c30] focus:border-[#1769E0] dark:focus:border-[#C8F000] focus:ring-2 focus:ring-[#C8F000]/50 outline-none text-sm text-[#0B1F3A] dark:text-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 2: Business/Company Name & Work Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0B1F3A] dark:text-slate-200 uppercase tracking-wider mb-1.5">
                        {t.form.fields.companyName} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="companyName"
                          required
                          value={formData.companyName}
                          onChange={handleInputChange}
                          placeholder={t.form.fields.companyNamePlaceholder}
                          className="w-full pl-4 pr-9 py-3 rounded-xl bg-[#F7FAFC] dark:bg-[#071322] border border-slate-200 dark:border-white/10 focus:bg-white dark:focus:bg-[#0c1c30] focus:border-[#1769E0] dark:focus:border-[#C8F000] focus:ring-2 focus:ring-[#C8F000]/50 outline-none text-sm text-[#0B1F3A] dark:text-white transition-all"
                        />
                        <Building className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0B1F3A] dark:text-slate-200 uppercase tracking-wider mb-1.5">
                        {t.form.fields.workEmail} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="workEmail"
                          required
                          value={formData.workEmail}
                          onChange={handleInputChange}
                          placeholder={t.form.fields.workEmailPlaceholder}
                          className="w-full pl-4 pr-9 py-3 rounded-xl bg-[#F7FAFC] dark:bg-[#071322] border border-slate-200 dark:border-white/10 focus:bg-white dark:focus:bg-[#0c1c30] focus:border-[#1769E0] dark:focus:border-[#C8F000] focus:ring-2 focus:ring-[#C8F000]/50 outline-none text-sm text-[#0B1F3A] dark:text-white transition-all"
                        />
                        <Mail className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Phone Number & Country */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0B1F3A] dark:text-slate-200 uppercase tracking-wider mb-1.5">
                        {t.form.fields.phone} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder={t.form.fields.phonePlaceholder}
                          className="w-full pl-4 pr-9 py-3 rounded-xl bg-[#F7FAFC] dark:bg-[#071322] border border-slate-200 dark:border-white/10 focus:bg-white dark:focus:bg-[#0c1c30] focus:border-[#1769E0] dark:focus:border-[#C8F000] focus:ring-2 focus:ring-[#C8F000]/50 outline-none text-sm text-[#0B1F3A] dark:text-white transition-all"
                        />
                        <Phone className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0B1F3A] dark:text-slate-200 uppercase tracking-wider mb-1.5">
                        {t.form.fields.country} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full pl-4 pr-9 py-3 rounded-xl bg-[#F7FAFC] dark:bg-[#071322] border border-slate-200 dark:border-white/10 focus:bg-white dark:focus:bg-[#0c1c30] focus:border-[#1769E0] dark:focus:border-[#C8F000] focus:ring-2 focus:ring-[#C8F000]/50 outline-none text-sm text-[#0B1F3A] dark:text-white transition-all appearance-none cursor-pointer"
                        >
                          {COUNTRIES.map((c) => (
                            <option key={c} value={c} className="text-[#0B1F3A]">
                              {c}
                            </option>
                          ))}
                        </select>
                        <Globe className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Row 4: Company Size & What Can We Help You With? */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0B1F3A] dark:text-slate-200 uppercase tracking-wider mb-1.5">
                        {t.form.fields.companySize} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          name="companySize"
                          value={formData.companySize}
                          onChange={handleInputChange}
                          className="w-full pl-4 pr-9 py-3 rounded-xl bg-[#F7FAFC] dark:bg-[#071322] border border-slate-200 dark:border-white/10 focus:bg-white dark:focus:bg-[#0c1c30] focus:border-[#1769E0] dark:focus:border-[#C8F000] focus:ring-2 focus:ring-[#C8F000]/50 outline-none text-sm text-[#0B1F3A] dark:text-white transition-all appearance-none cursor-pointer"
                        >
                          {COMPANY_SIZES.map((size) => (
                            <option key={size} value={size} className="text-[#0B1F3A]">
                              {size} {t.form.fields.companySizePlaceholder}
                            </option>
                          ))}
                        </select>
                        <Users className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0B1F3A] dark:text-slate-200 uppercase tracking-wider mb-1.5">
                        {t.form.fields.enquiryType} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          name="enquiryType"
                          value={formData.enquiryType}
                          onChange={(e) => handleEnquirySelect(e.target.value as EnquiryType)}
                          className="w-full pl-4 pr-9 py-3 rounded-xl bg-[#F7FAFC] dark:bg-[#071322] border border-slate-200 dark:border-white/10 focus:bg-white dark:focus:bg-[#0c1c30] focus:border-[#1769E0] dark:focus:border-[#C8F000] focus:ring-2 focus:ring-[#C8F000]/50 outline-none text-sm font-semibold text-[#1769E0] dark:text-[#C8F000] transition-all appearance-none cursor-pointer"
                        >
                          {ENQUIRY_TYPES.map((type) => (
                            <option key={type} value={type} className="text-[#0B1F3A]">
                              {type}
                            </option>
                          ))}
                        </select>
                        <Layers className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* SMART PROGRESSIVE DISCLOSURE */}
                  
                  {/* Dynamic Questions for: PAYROLL */}
                  {formData.enquiryType === 'Payroll' && (
                    <div className="p-4 sm:p-5 rounded-2xl bg-[#F0F6FF] dark:bg-[#07172C] border border-[#1769E0]/20 dark:border-[#1769E0]/40 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1769E0] dark:text-[#C8F000]">
                        <Sparkles className="w-4 h-4 text-[#1769E0] dark:text-[#C8F000]" />
                        <span>{t.form.dynamic.payrollTitle}</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                            {t.form.dynamic.payrollCount}
                          </label>
                          <input
                            type="text"
                            name="payrollEmployeesCount"
                            value={formData.payrollEmployeesCount || ''}
                            onChange={handleInputChange}
                            placeholder="e.g. 85"
                            className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#0A1A30] border border-slate-300 dark:border-white/10 text-xs text-[#0B1F3A] dark:text-white focus:border-[#1769E0] outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                            {t.form.dynamic.payrollFrequency}
                          </label>
                          <select
                            name="payrollFrequency"
                            value={formData.payrollFrequency}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#0A1A30] border border-slate-300 dark:border-white/10 text-xs text-[#0B1F3A] dark:text-white focus:border-[#1769E0] outline-none cursor-pointer"
                          >
                            <option value="Monthly" className="text-[#0B1F3A]">{t.form.dynamic.payrollFrequencyMonthly}</option>
                            <option value="Bi-weekly" className="text-[#0B1F3A]">{t.form.dynamic.payrollFrequencyBiWeekly}</option>
                            <option value="Weekly" className="text-[#0B1F3A]">{t.form.dynamic.payrollFrequencyWeekly}</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                            {t.form.dynamic.payrollCountries}
                          </label>
                          <input
                            type="text"
                            name="payrollCountries"
                            value={formData.payrollCountries?.join(', ') || ''}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                payrollCountries: e.target.value.split(',').map((s) => s.trim()),
                              }))
                            }
                            placeholder="e.g. Nigeria, Ghana, Kenya, Sénégal"
                            className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#0A1A30] border border-slate-300 dark:border-white/10 text-xs text-[#0B1F3A] dark:text-white focus:border-[#1769E0] outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                            {t.form.dynamic.currentSystem}
                          </label>
                          <select
                            name="currentPayrollSystem"
                            value={formData.currentPayrollSystem}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#0A1A30] border border-slate-300 dark:border-white/10 text-xs text-[#0B1F3A] dark:text-white focus:border-[#1769E0] outline-none cursor-pointer"
                          >
                            <option value="Excel / Spreadsheets" className="text-[#0B1F3A]">Excel / Spreadsheets</option>
                            <option value="Legacy Desktop ERP" className="text-[#0B1F3A]">Legacy Software</option>
                            <option value="Local African Payroll" className="text-[#0B1F3A]">Local Software Provider</option>
                            <option value="Bank Portal Direct" className="text-[#0B1F3A]">Bank Portal Direct</option>
                            <option value="Manual / Other" className="text-[#0B1F3A]">Manual / Other</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Dynamic Questions for: HR MANAGEMENT */}
                  {formData.enquiryType === 'HR Management' && (
                    <div className="p-4 sm:p-5 rounded-2xl bg-[#F0F6FF] dark:bg-[#07172C] border border-[#1769E0]/20 dark:border-[#1769E0]/40 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1769E0] dark:text-[#C8F000]">
                        <Sparkles className="w-4 h-4 text-[#1769E0] dark:text-[#C8F000]" />
                        <span>{t.form.dynamic.hrTitle}</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                            {t.form.dynamic.hrEmployeesCount}
                          </label>
                          <input
                            type="text"
                            name="hrEmployeesCount"
                            value={formData.hrEmployeesCount || ''}
                            onChange={handleInputChange}
                            placeholder="e.g. 140"
                            className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#0A1A30] border border-slate-300 dark:border-white/10 text-xs text-[#0B1F3A] dark:text-white focus:border-[#1769E0] outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                            {t.form.dynamic.hrTeamSize}
                          </label>
                          <select
                            name="hrTeamSize"
                            value={formData.hrTeamSize}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#0A1A30] border border-slate-300 dark:border-white/10 text-xs text-[#0B1F3A] dark:text-white focus:border-[#1769E0] outline-none cursor-pointer"
                          >
                            <option value="Solo HR / Founder" className="text-[#0B1F3A]">Solo HR / Founder</option>
                            <option value="2–5 HR Members" className="text-[#0B1F3A]">2–5 HR Members</option>
                            <option value="6–10 HR Members" className="text-[#0B1F3A]">6–10 HR Members</option>
                            <option value="10+ HR Department" className="text-[#0B1F3A]">10+ HR Department</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                            Current HR System
                          </label>
                          <input
                            type="text"
                            name="currentHrSoftware"
                            value={formData.currentHrSoftware || ''}
                            onChange={handleInputChange}
                            placeholder="e.g. None / Google Drive"
                            className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#0A1A30] border border-slate-300 dark:border-white/10 text-xs text-[#0B1F3A] dark:text-white focus:border-[#1769E0] outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                            {t.form.dynamic.mainChallenge}
                          </label>
                          <select
                            name="mainHrChallenge"
                            value={formData.mainHrChallenge}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#0A1A30] border border-slate-300 dark:border-white/10 text-xs text-[#0B1F3A] dark:text-white focus:border-[#1769E0] outline-none cursor-pointer"
                          >
                            <option value="Scattered employee records" className="text-[#0B1F3A]">Scattered employee records &amp; files</option>
                            <option value="Manual onboarding & contracts" className="text-[#0B1F3A]">Manual onboarding &amp; contracts</option>
                            <option value="Leave tracking disputes" className="text-[#0B1F3A]">Leave tracking &amp; disputes</option>
                            <option value="Performance appraisals & KPIs" className="text-[#0B1F3A]">Performance appraisals &amp; KPIs</option>
                            <option value="Multi-branch visibility" className="text-[#0B1F3A]">Multi-branch / remote visibility</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Dynamic Questions for: ENTERPRISE SOLUTIONS */}
                  {formData.enquiryType === 'Enterprise Solutions' && (
                    <div className="p-4 sm:p-5 rounded-2xl bg-[#0B1F3A] text-white space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C8F000]">
                        <Building className="w-4 h-4 text-[#C8F000]" />
                        <span>{t.form.dynamic.enterpriseTitle}</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">
                            {t.form.dynamic.locationsCount}
                          </label>
                          <input
                            type="text"
                            name="enterpriseLocations"
                            value={formData.enterpriseLocations}
                            onChange={handleInputChange}
                            placeholder="e.g. 8 branches"
                            className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-xs text-white placeholder:text-slate-400 focus:border-[#C8F000] outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">
                            {t.form.dynamic.operatingCountries}
                          </label>
                          <input
                            type="text"
                            name="enterpriseCountries"
                            value={formData.enterpriseCountries}
                            onChange={handleInputChange}
                            placeholder="e.g. Nigeria, Ghana, UK, Kenya"
                            className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-xs text-white placeholder:text-slate-400 focus:border-[#C8F000] outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          {t.form.dynamic.currentErp}
                        </label>
                        <select
                          name="currentErpSystem"
                          value={formData.currentErpSystem}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-xs text-white focus:border-[#C8F000] outline-none cursor-pointer"
                        >
                          <option value="None / Moving from legacy" className="text-[#0B1F3A]">None / Moving from legacy</option>
                          <option value="QuickBooks" className="text-[#0B1F3A]">QuickBooks</option>
                          <option value="FreshBooks" className="text-[#0B1F3A]">FreshBooks</option>
                          <option value="ZohoBooks" className="text-[#0B1F3A]">ZohoBooks</option>
                          <option value="Sage 50" className="text-[#0B1F3A]">Sage 50</option>
                          <option value="Sage X3" className="text-[#0B1F3A]">Sage X3</option>
                          <option value="Sage Pastel 200" className="text-[#0B1F3A]">Sage Pastel 200</option>
                          <option value="Sage 300" className="text-[#0B1F3A]">Sage 300</option>
                          <option value="Tally" className="text-[#0B1F3A]">Tally</option>
                          <option value="SAP / SuccessFactors" className="text-[#0B1F3A]">SAP / SuccessFactors</option>
                          <option value="Oracle NetSuite / Fusion" className="text-[#0B1F3A]">Oracle NetSuite / Fusion</option>
                          <option value="Microsoft Dynamics 365" className="text-[#0B1F3A]">Microsoft Dynamics 365</option>
                          <option value="Workday" className="text-[#0B1F3A]">Workday</option>
                          <option value="Custom In-house API" className="text-[#0B1F3A]">Custom In-house Database / API</option>
                          <option value="Others" className="text-[#0B1F3A]">Others</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Message Field (Large Textarea) */}
                  <div>
                    <label className="block text-xs font-bold text-[#0B1F3A] dark:text-slate-200 uppercase tracking-wider mb-1.5">
                      {t.form.fields.message}
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={t.form.fields.messagePlaceholder}
                      className="w-full px-4 py-3 rounded-xl bg-[#F7FAFC] dark:bg-[#071322] border border-slate-200 dark:border-white/10 focus:bg-white dark:focus:bg-[#0c1c30] focus:border-[#1769E0] dark:focus:border-[#C8F000] focus:ring-2 focus:ring-[#C8F000]/50 outline-none text-sm text-[#0B1F3A] dark:text-white transition-all resize-y"
                    ></textarea>
                  </div>

                  {/* Agreement Checkbox */}
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="agreeToContact"
                      checked={formData.agreeToContact}
                      onChange={handleCheckboxChange}
                      className="mt-1 w-4 h-4 rounded text-[#1769E0] focus:ring-[#C8F000] border-slate-300 cursor-pointer"
                    />
                    <label htmlFor="agreeToContact" className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed cursor-pointer select-none">
                      {t.form.fields.agreeToTerms}
                    </label>
                  </div>

                  {/* Submit CTA Button with Lemon Green hover animation */}
                  <button
                    type="submit"
                    id="submit-contact-form"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-xl font-bold text-base text-white bg-[#1769E0] hover:bg-[#0B1F3A] hover:text-[#C8F000] shadow-lg shadow-[#1769E0]/25 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-75"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        <span>{t.form.fields.submittingButton}</span>
                      </>
                    ) : (
                      <>
                        <span>{t.form.fields.submitButton}</span>
                        <ArrowRight className="w-5 h-5 text-[#C8F000] transition-transform duration-200 group-hover:translate-x-1.5" />
                      </>
                    )}
                  </button>

                  <div className="text-center">
                    <span className="text-[11px] text-slate-400">
                      {t.form.sidebar.securitySubtitle}
                    </span>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
