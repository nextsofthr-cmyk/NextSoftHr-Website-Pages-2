import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  MapPin, 
  Globe, 
  Phone, 
  Mail, 
  Star, 
  Award, 
  Building, 
  Briefcase, 
  Calendar, 
  Users, 
  ShieldCheck, 
  Send, 
  ExternalLink,
  ChevronRight,
  MessageSquare,
  Sparkles,
  Layers,
  Clock,
  Coins
} from 'lucide-react';
import { Partner, PartnerEnquiry } from '../types';
import { PartnerCategoryBadge } from './PartnerCategoryBadge';
import { PartnerTierBadge, TopTierBadge, VerifiedBadge } from './PartnerTierBadge';
import { AvailabilityStatusBadge, getPartnerAvailability } from './AvailabilityStatusBadge';
import { useCurrency } from '../context/CurrencyContext';

interface PartnerProfileModalProps {
  partner: Partner | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitEnquiry: (enquiry: Omit<PartnerEnquiry, 'id' | 'createdAt'>) => void;
  isCompared?: boolean;
  onToggleCompare?: (partner: Partner) => void;
}

export const PartnerProfileModal: React.FC<PartnerProfileModalProps> = ({
  partner,
  isOpen,
  onClose,
  onSubmitEnquiry,
  isCompared = false,
  onToggleCompare
}) => {
  if (!isOpen || !partner) return null;

  const { formatCurrency, currentCurrency } = useCurrency();

  const getCompanyInitials = (name: string): string => {
    if (!name) return 'NS';
    const clean = name.replace(/[^a-zA-Z0-9\s]/g, '').trim();
    const words = clean.split(/\s+/).filter(Boolean);
    if (words.length === 0) return 'NS';
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  const getBudgetRange = (p: Partner) => {
    switch (p.partnerLevel) {
      case 'Strategic Partner':
        return { min: 12500, max: 50000, payrollVol: 1500000 };
      case 'Premium Partner':
        return { min: 7500, max: 30000, payrollVol: 750000 };
      case 'Professional Partner':
        return { min: 4000, max: 18000, payrollVol: 350000 };
      default:
        return { min: 2000, max: 10000, payrollVol: 150000 };
    }
  };

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    country: partner.country || 'Nigeria',
    businessSize: 'Medium Business (50-250 employees)',
    serviceNeeded: partner.services[0] || 'HR Implementation',
    message: `Hello ${partner.companyName}, we are interested in discussing NextSofthr implementation and consulting support for our organization.`
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitEnquiry({
      partnerId: partner.id,
      partnerName: partner.companyName,
      fullName: formData.fullName,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      country: formData.country,
      businessSize: formData.businessSize,
      serviceNeeded: formData.serviceNeeded,
      message: formData.message
    });
    setFormSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex justify-center p-2 sm:p-4 md:p-6 animate-fadeIn">
      
      {/* Modal Card */}
      <div className="bg-white dark:bg-[#061124] w-full max-w-5xl rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden my-auto border border-slate-200 dark:border-slate-800 relative transition-colors">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-md transition-colors shadow-lg"
          aria-label="Close profile"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 1. Cover Section */}
        <div className="relative h-40 sm:h-48 bg-gradient-to-r from-[#071938] via-[#0c2b64] to-[#124296] overflow-hidden">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#c8f526_1px,transparent_1px)] [background-size:14px_14px]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#071938] via-transparent to-transparent"></div>

          {/* Partner Level & Location Pills in Cover */}
          <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
            {partner.isVerified && (
              <VerifiedBadge size="sm" variant="solid" />
            )}
            <PartnerTierBadge level={partner.partnerLevel} size="sm" showTooltip={true} />
            {(partner.partnerLevel === 'Strategic Partner' || partner.partnerLevel === 'Premium Partner') && (
              <TopTierBadge size="sm" />
            )}
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white border border-white/30 backdrop-blur-sm">
              {partner.partnerLevel}
            </span>
            <AvailabilityStatusBadge status={getPartnerAvailability(partner)} size="sm" />
          </div>
        </div>

        {/* Header Content below Cover */}
        <div className="px-6 sm:px-8 pb-6 border-b border-slate-200 dark:border-slate-800 relative bg-white dark:bg-[#061124] transition-colors">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 -mt-14 sm:-mt-16">
            
            {/* Company Initials Avatar + Basic Info */}
            <div className="flex items-end gap-4">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-4 border-white dark:border-[#0a1c3b] bg-gradient-to-br from-[#0c2b64] via-[#0f357a] to-[#184ea8] text-[#c8f526] font-black text-3xl sm:text-4xl flex items-center justify-center shadow-xl shrink-0 select-none tracking-wider">
                <span>{getCompanyInitials(partner.companyName)}</span>
              </div>

              <div className="pt-2">
                <h2 className="text-xl sm:text-2xl font-black text-[#0c2b64] dark:text-white tracking-tight">
                  {partner.companyName}
                </h2>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-slate-600 dark:text-slate-400 mt-1.5">
                  <span className="flex items-center gap-1 font-semibold text-slate-800 dark:text-slate-200">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-[#c8f526]" />
                    <span>{partner.city}, {partner.country}</span>
                  </span>
                  <span>•</span>
                  <PartnerCategoryBadge category={partner.partnerType} size="xs" showTooltip={true} />
                  <span>•</span>
                  <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    <span>{partner.rating} ({partner.reviewCount} reviews)</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions Header */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <a
                href={partner.website}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-700 hover:border-blue-700 dark:hover:border-[#c8f526] text-slate-700 dark:text-slate-200 hover:text-blue-700 dark:hover:text-[#c8f526] flex items-center gap-1.5 transition-colors"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Visit Website</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="#enquiry-form"
                className="px-5 py-2 rounded-xl bg-[#c8f526] hover:bg-[#b5e01b] text-[#071938] font-bold text-xs shadow-md transition-colors flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Contact Partner</span>
              </a>
            </div>

          </div>

          {/* 4 Partner Key Statistics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0a1c3b] border border-slate-100 dark:border-slate-800 text-center">
              <div className="text-xl sm:text-2xl font-black text-[#0c2b64] dark:text-[#c8f526]">{partner.clientCount}+</div>
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Active Clients</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0a1c3b] border border-slate-100 dark:border-slate-800 text-center">
              <div className="text-xl sm:text-2xl font-black text-[#0c2b64] dark:text-[#c8f526]">{partner.numberOfImplementations}+</div>
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Implementations</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0a1c3b] border border-slate-100 dark:border-slate-800 text-center">
              <div className="text-xl sm:text-2xl font-black text-[#0c2b64] dark:text-[#c8f526]">{partner.yearsExperience}+ Years</div>
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Domain Experience</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0a1c3b] border border-slate-100 dark:border-slate-800 text-center">
              <div className="text-xl sm:text-2xl font-black text-[#0c2b64] dark:text-[#c8f526]">{partner.industries.length}+</div>
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Industries Served</div>
            </div>
          </div>

          {/* Engagement Budget & Practice Scope Banner */}
          <div className="mt-4 p-3.5 rounded-2xl bg-gradient-to-r from-blue-50/80 to-slate-50 dark:from-[#0c234b]/60 dark:to-[#0a1c3b] border border-blue-200/80 dark:border-blue-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#c8f526] text-[#071938] flex items-center justify-center font-black">
                <Coins className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                  <span>Engagement Budget & Practice Scope</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-[#c8f526] font-mono font-bold">
                    {currentCurrency.code} ({currentCurrency.symbol})
                  </span>
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Typical client rollout: <strong>{formatCurrency(getBudgetRange(partner).min)} – {formatCurrency(getBudgetRange(partner).max)}</strong>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="text-left sm:text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Est. Monthly Payroll Handled</span>
                <span className="text-xs font-black font-mono text-emerald-700 dark:text-[#c8f526]">
                  {formatCurrency(getBudgetRange(partner).payrollVol, { compact: true })} / mo
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Main Content (2-Column Grid) */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 max-h-[65vh] overflow-y-auto">
          
          {/* Left Column: Details, Services, Stories (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* About Partner */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">
                About the Partner
              </h4>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {partner.description}
              </p>
            </div>

            {/* Services Offered Cards */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">
                Services Offered
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {partner.services.map((service, idx) => (
                  <div 
                    key={idx} 
                    className="p-3 rounded-xl bg-blue-50/70 dark:bg-[#0a1c3b] border border-blue-100/80 dark:border-slate-800 flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#0c2b64] dark:text-[#c8f526] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-[#0c2b64] dark:text-white">{service}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">NextSofthr Certified Setup & Advisory</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Industries Served */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                Industries Served
              </h4>
              <div className="flex flex-wrap gap-2">
                {partner.industries.map((industry, idx) => (
                  <span 
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-[#0a1c3b] text-slate-800 dark:text-slate-200 text-xs font-medium border border-slate-200 dark:border-slate-800"
                  >
                    {industry}
                  </span>
                ))}
              </div>
            </div>

            {/* Geographic Coverage */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">
                Geographic Coverage & Physical Hub
              </h4>
              <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
                <p><strong>Primary Headquarters:</strong> {partner.address}</p>
                <p><strong>Countries Supported:</strong> {partner.countriesServed.join(', ')}</p>
                <p><strong>Working Languages:</strong> {partner.languages.join(', ')}</p>
              </div>
            </div>

            {/* Category Accreditation Badge Card */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                Accredited Partner Category
              </h4>
              <PartnerCategoryBadge category={partner.partnerType} variant="card" />
            </div>

            {/* Certifications */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                NextSofthr Certifications & Accreditations
              </h4>
              <div className="space-y-2">
                {partner.certifications.map((cert, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-950 dark:text-emerald-300 text-xs font-semibold">
                    <Award className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Client Success Stories & Testimonials */}
            {partner.caseStudies.length > 0 && (
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Featured Client Case Study
                </h4>
                {partner.caseStudies.map((cs, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/40 dark:from-[#0a1c3b] dark:to-[#071938] border border-slate-200 dark:border-slate-800 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-blue-900 dark:text-blue-300">{cs.clientName}</span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-[#c8f526] font-bold">{cs.metric}</span>
                    </div>
                    <h5 className="text-sm font-bold text-slate-900 dark:text-white">{cs.title}</h5>
                    <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                      <p><strong>Challenge:</strong> {cs.challenge}</p>
                      <p><strong>Solution:</strong> {cs.solution}</p>
                      <p><strong>Result:</strong> {cs.result}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {partner.testimonials.length > 0 && (
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                  Client Endorsement
                </h4>
                {partner.testimonials.map((test, idx) => (
                  <blockquote key={idx} className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs text-slate-700 dark:text-slate-300 italic relative">
                    "{test.quote}"
                    <div className="mt-2 not-italic font-bold text-slate-900 dark:text-white flex items-center justify-between">
                      <span>{test.author} — {test.role}</span>
                      <span className="text-slate-500 dark:text-slate-400 font-normal">{test.company}</span>
                    </div>
                  </blockquote>
                ))}
              </div>
            )}

          </div>

          {/* Right Column: Contact Enquiry Form (lg:col-span-5) */}
          <div className="lg:col-span-5" id="enquiry-form">
            <div className="sticky top-2 bg-[#071938] dark:bg-[#0a1c3b] text-white rounded-2xl p-5 sm:p-6 shadow-xl border border-blue-900 dark:border-slate-800">
              
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-4 h-4 text-[#c8f526]" />
                <h4 className="text-base font-bold text-white">
                  Enquire with {partner.companyName}
                </h4>
              </div>
              <p className="text-xs text-slate-300 mb-4">
                Fill in your company details to receive a direct consultation proposal for your NextSofthr implementation.
              </p>

              {formSubmitted ? (
                <div className="p-6 rounded-xl bg-blue-900/50 border border-[#c8f526] text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#c8f526] text-[#071938] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h5 className="text-base font-bold text-white">Enquiry Transmitted!</h5>
                  <p className="text-xs text-slate-300">
                    Your request has been forwarded directly to <strong>{partner.companyName}</strong> and copied to NextSofthr Ecosystem Concierge. A certified partner representative will reach out within 24 business hours.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="mt-2 text-xs font-bold text-[#c8f526] hover:underline"
                  >
                    Send another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  
                  {/* Full Name */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      placeholder="e.g. Babatunde Adeyemi"
                      className="w-full px-3 py-2 rounded-lg bg-[#0b214a] border border-blue-800 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#c8f526]"
                    />
                  </div>

                  {/* Company Name */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      placeholder="e.g. Zenith Agribusiness Ltd"
                      className="w-full px-3 py-2 rounded-lg bg-[#0b214a] border border-blue-800 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#c8f526]"
                    />
                  </div>

                  {/* Work Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="you@company.com"
                        className="w-full px-3 py-2 rounded-lg bg-[#0b214a] border border-blue-800 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#c8f526]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="+234 800 000 0000"
                        className="w-full px-3 py-2 rounded-lg bg-[#0b214a] border border-blue-800 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#c8f526]"
                      />
                    </div>
                  </div>

                  {/* Country & Business Size */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        Country
                      </label>
                      <input
                        type="text"
                        value={formData.country}
                        onChange={(e) => setFormData({...formData, country: e.target.value})}
                        className="w-full px-3 py-2 rounded-lg bg-[#0b214a] border border-blue-800 text-xs text-white focus:outline-none focus:border-[#c8f526]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        Business Size
                      </label>
                      <select
                        value={formData.businessSize}
                        onChange={(e) => setFormData({...formData, businessSize: e.target.value})}
                        className="w-full px-3 py-2 rounded-lg bg-[#0b214a] border border-blue-800 text-xs text-white focus:outline-none focus:border-[#c8f526]"
                      >
                        <option value="Micro Business (1-10 staff)">Micro Business (1-10 staff)</option>
                        <option value="Small Business (11-50 staff)">Small Business (11-50 staff)</option>
                        <option value="Medium Business (51-250 staff)">Medium Business (51-250 staff)</option>
                        <option value="Large Enterprise (251-1,000 staff)">Large Enterprise (251-1,000 staff)</option>
                        <option value="Multinational (1,000+ staff)">Multinational (1,000+ staff)</option>
                      </select>
                    </div>
                  </div>

                  {/* Primary Service Needed */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      What do you need help with?
                    </label>
                    <select
                      value={formData.serviceNeeded}
                      onChange={(e) => setFormData({...formData, serviceNeeded: e.target.value})}
                      className="w-full px-3 py-2 rounded-lg bg-[#0b214a] border border-blue-800 text-xs text-white focus:outline-none focus:border-[#c8f526]"
                    >
                      {partner.services.map((s, idx) => (
                        <option key={idx} value={s}>{s}</option>
                      ))}
                      <option value="General NextSofthr Consultation">General NextSofthr Consultation</option>
                      <option value="Custom Pricing & Migration Quote">Custom Pricing & Migration Quote</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Message / Project Scope
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-3 py-2 rounded-lg bg-[#0b214a] border border-blue-800 text-xs text-white focus:outline-none focus:border-[#c8f526]"
                    ></textarea>
                  </div>

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#c8f526] hover:bg-[#b5e01b] text-[#071938] font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Enquiry</span>
                  </button>

                  <p className="text-[10px] text-slate-400 text-center pt-1">
                    Direct routing to {partner.companyName} • NextSofthr Partner Guarantee
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
