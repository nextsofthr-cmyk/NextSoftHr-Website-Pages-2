import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  Building, 
  User, 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  Briefcase, 
  Users, 
  Sparkles,
  ShieldCheck,
  Award
} from 'lucide-react';
import { COUNTRIES_DATA } from '../data/countries';
import { PartnerApplication } from '../types';
import { PartnerCategoryBadge } from './PartnerCategoryBadge';
import { useCurrency } from '../context/CurrencyContext';

interface PartnerRegistrationSectionProps {
  onApplicationSubmit: (application: Omit<PartnerApplication, 'id' | 'status' | 'createdAt'>) => void;
}

export const PartnerRegistrationSection: React.FC<PartnerRegistrationSectionProps> = ({
  onApplicationSubmit
}) => {
  const { formatCurrency, currentCurrency } = useCurrency();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    country: 'Nigeria',
    city: '',
    partnerType: 'HR Consultant',
    website: '',
    numberOfEmployees: '11-50',
    servicesOffered: ['HR Implementation', 'Payroll Consulting'],
    motivation: ''
  });

  const availableServices = [
    'HR Implementation',
    'Payroll Implementation',
    'HR Consulting',
    'Payroll Consulting',
    'Employee Training',
    'Data Migration',
    'System Integration',
    'Customization',
    'HR Outsourcing',
    'Accounting / Bookkeeping',
    'Technical Support'
  ];

  const handleCheckboxChange = (service: string) => {
    if (formData.servicesOffered.includes(service)) {
      setFormData({
        ...formData,
        servicesOffered: formData.servicesOffered.filter(s => s !== service)
      });
    } else {
      setFormData({
        ...formData,
        servicesOffered: [...formData.servicesOffered, service]
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApplicationSubmit(formData);
    setSubmitted(true);
  };

  return (
    <section id="registration" className="py-16 md:py-24 bg-white dark:bg-[#061124] border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c8f526]/30 dark:bg-[#c8f526]/20 border border-[#c8f526] text-[#0c2b64] dark:text-[#c8f526] text-xs font-black uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>PARTNER ONBOARDING & REGISTRY APPLICATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0c2b64] dark:text-white tracking-tight">
            Ready to Join the NextSofthr Partner Network?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Apply to become a certified NextSofthr partner and scale your consulting, payroll, or IT business across Africa and global diaspora markets.
          </p>
        </div>

        {/* Application Card */}
        <div className="bg-[#f8fafc] dark:bg-[#0a1c3b] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden transition-colors">
          
          {/* Form Header Banner */}
          <div className="bg-[#0c2b64] dark:bg-[#071938] text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-blue-900/60 dark:border-slate-800">
            <div>
              <span className="text-[11px] font-bold text-[#c8f526] uppercase tracking-wider">
                Official Partner Intake
              </span>
              <h3 className="text-xl font-black text-white mt-1">
                New Partner Credential Application
              </h3>
              <p className="text-xs text-blue-200 mt-0.5">
                Our Partner Enablement Council reviews applications within 48 business hours.
              </p>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/80 dark:bg-blue-950/80 border border-blue-700 dark:border-blue-800 text-xs text-slate-200 shrink-0">
              <ShieldCheck className="w-4 h-4 text-[#c8f526]" />
              <span>NextSofthr Vetting Guaranteed</span>
            </div>
          </div>

          {/* Form Body */}
          <div className="p-6 sm:p-10">
            {submitted ? (
              <div className="text-center py-12 px-4 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#c8f526] text-[#071938] flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
                </div>
                <h4 className="text-2xl font-black text-[#0c2b64] dark:text-white">Application Received!</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
                  Thank you, <strong>{formData.contactPerson}</strong>. Your partner credential application for <strong>{formData.companyName}</strong> has been logged.
                </p>
                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-xs text-blue-950 dark:text-blue-200 max-w-md mx-auto text-left space-y-1">
                  <p className="font-bold text-[#0c2b64] dark:text-[#c8f526]">Next Steps in your verification process:</p>
                  <p>1. Partner Operations review & background verification (24 hrs)</p>
                  <p>2. Video onboarding call & NextSofthr Product Certification Voucher</p>
                  <p>3. Inclusion in public Global Partner Registry directory & partner portal access</p>
                </div>
                <div className="pt-4">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-[#0c2b64] dark:bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs transition-colors"
                  >
                    Submit Another Application
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Row 1: Company & Contact Person */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Company / Consultancy Name *
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                      <input
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                        placeholder="e.g. AfriConsult Payroll Group Ltd"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#061227] border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-700 dark:focus:border-[#c8f526]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Contact Person (Full Name) *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                      <input
                        type="text"
                        required
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                        placeholder="e.g. Olumide Johnson"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#061227] border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-700 dark:focus:border-[#c8f526]"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Work Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="contact@africonsult.com"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#061227] border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-700 dark:focus:border-[#c8f526]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Phone Number (WhatsApp preferred) *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="+234 915 848 2622"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#061227] border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-700 dark:focus:border-[#c8f526]"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 3: Country & City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Country of Operation *
                    </label>
                    <div className="relative">
                      <select
                        value={formData.country}
                        onChange={(e) => setFormData({...formData, country: e.target.value})}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#061227] border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-700 dark:focus:border-[#c8f526]"
                      >
                        {COUNTRIES_DATA.map(c => (
                          <option key={c.id} value={c.name}>{c.flag} {c.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      City / Headquarters Hub *
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                        placeholder="e.g. Lagos, Nairobi, Accra..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#061227] border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-700 dark:focus:border-[#c8f526]"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 4: Partner Type & Company Website */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Partner Type *
                    </label>
                    <select
                      value={formData.partnerType}
                      onChange={(e) => setFormData({...formData, partnerType: e.target.value})}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#061227] border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-700 dark:focus:border-[#c8f526]"
                    >
                      <option value="HR Consultant">HR Consultant</option>
                      <option value="Implementation Partner">Implementation Partner</option>
                      <option value="Payroll Specialist">Payroll Specialist / Consultant</option>
                      <option value="Accounting Firm">Accounting Firm</option>
                      <option value="Technology Partner">Technology Partner / IT Company</option>
                      <option value="System Integrator">System Integrator</option>
                      <option value="Business Consultant">Business Consultant</option>
                      <option value="Training Partner">Training Partner</option>
                    </select>
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Badge Tier:</span>
                      <PartnerCategoryBadge category={formData.partnerType} size="xs" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Company Website URL
                    </label>
                    <div className="relative">
                      <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData({...formData, website: e.target.value})}
                        placeholder="https://yourcompany.com"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#061227] border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-700 dark:focus:border-[#c8f526]"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 5: Number of Employees */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Team Size / Full-time Consultants
                  </label>
                  <select
                    value={formData.numberOfEmployees}
                    onChange={(e) => setFormData({...formData, numberOfEmployees: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#061227] border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-700 dark:focus:border-[#c8f526]"
                  >
                    <option value="1-5">Solo Practitioner / Small Agency (1-5 staff)</option>
                    <option value="6-10">6 - 10 staff</option>
                    <option value="11-50">11 - 50 staff</option>
                    <option value="51-200">51 - 200 staff</option>
                    <option value="200+">200+ Enterprise consultancy</option>
                  </select>
                </div>

                {/* Services Offered (Checkboxes) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Services You Intend to Deliver with NextSofthr (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {availableServices.map((service) => (
                      <label 
                        key={service}
                        className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                          formData.servicesOffered.includes(service)
                            ? 'bg-blue-50 dark:bg-blue-950/80 border-blue-500 dark:border-[#c8f526] text-blue-950 dark:text-[#c8f526] font-semibold'
                            : 'bg-white dark:bg-[#061227] border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#0c234b]'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.servicesOffered.includes(service)}
                          onChange={() => handleCheckboxChange(service)}
                          className="rounded text-blue-800 focus:ring-blue-600 w-3.5 h-3.5"
                        />
                        <span>{service}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Motivation / Why partner */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Why do you want to partner with NextSofthr? *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.motivation}
                    onChange={(e) => setFormData({...formData, motivation: e.target.value})}
                    placeholder="Briefly describe your current client base, HR/payroll practice, and how NextSofthr fits into your growth roadmap..."
                    className="w-full p-3 rounded-xl bg-white dark:bg-[#061227] border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-700 dark:focus:border-[#c8f526]"
                  ></textarea>
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#c8f526] hover:bg-[#b5e01b] text-[#071938] font-black text-sm shadow-lg lemon-shadow transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 stroke-[2.5]" />
                    <span>Apply to Become a Partner</span>
                  </button>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center mt-2.5">
                    By submitting, you agree to receive onboarding communications from NextSofthr Ecosystem Concierge.
                  </p>
                </div>

              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
