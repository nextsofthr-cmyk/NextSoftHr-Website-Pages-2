import React, { useState } from 'react';
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Building2, 
  Users, 
  Globe, 
  Calendar, 
  Mail, 
  Phone, 
  ShieldCheck,
  FileSpreadsheet
} from 'lucide-react';
import { SuccessCheckmark } from '../common/SuccessCheckmark';

interface QuotationWizardProps {
  onClose?: () => void;
}

export const QuotationWizard: React.FC<QuotationWizardProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    employees: '50-149 employees',
    companies: '1 company',
    branches: '2-4 branches',
    services: ['Payroll', 'HR administration', 'Leave', 'Employee self-service'],
    countries: ['Nigeria'],
    timeline: 'Within 30 days',
    name: '',
    companyName: '',
    email: '',
    phone: '',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState('');

  const servicesList = [
    'Payroll',
    'HR administration',
    'Recruitment',
    'Attendance',
    'Leave',
    'Employee self-service',
    'Managed HR',
    'HR reporting',
    'Compliance support'
  ];

  const countriesList = [
    'Nigeria',
    'Ghana',
    'Kenya',
    'South Africa',
    'Uganda',
    'Tanzania',
    'Rwanda',
    'Zambia',
    'Cameroon',
    'Senegal',
    'Côte d’Ivoire'
  ];

  const handleToggleService = (s: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(s)
        ? prev.services.filter(item => item !== s)
        : [...prev.services, s]
    }));
  };

  const handleToggleCountry = (c: string) => {
    setFormData(prev => ({
      ...prev,
      countries: prev.countries.includes(c)
        ? prev.countries.filter(item => item !== c)
        : [...prev.countries, c]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRefId(`NSHR-PROP-${Date.now().toString(36).toUpperCase()}`);
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden">
        {/* Progress Bar Header */}
        <div className="bg-[#0A1E4A] text-white p-6 sm:p-8">
          <div className="flex items-center justify-between text-xs text-lime-400 font-semibold uppercase tracking-wider mb-2">
            <span>Custom Outsourcing Configurator</span>
            <span>Step {currentStep} of 7</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Design Your Tailored Workforce Solution
          </h2>

          <div className="w-full bg-blue-950/70 h-2 rounded-full mt-4 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-lime-400 to-emerald-400 h-full transition-all duration-300"
              style={{ width: `${(currentStep / 7) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Wizard Form Body */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="py-6 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
              <SuccessCheckmark size={64} triggerConfetti={true} />
              
              <h3 className="text-2xl font-bold text-slate-900">
                Thank you. Our outsourcing team will review your requirements and contact you.
              </h3>
              
              <p className="text-sm text-slate-600 max-w-lg mx-auto">
                We have compiled your custom requirements for <strong>{formData.companyName || 'your organization'}</strong>. An Enterprise Outsourcing Director will deliver your tailored proposal and service level agreement within 2 business hours.
              </p>

              {/* Scope Breakdown */}
              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 text-left max-w-lg mx-auto text-xs space-y-2 font-mono">
                <div><span className="font-bold text-slate-900">Proposal Reference:</span> {refId}</div>
                <div><span className="font-bold text-slate-900">Workforce Scope:</span> {formData.employees} across {formData.companies}</div>
                <div><span className="font-bold text-slate-900">Services Included:</span> {formData.services.join(', ')}</div>
                <div><span className="font-bold text-slate-900">Jurisdictions:</span> {formData.countries.join(', ')}</div>
                <div><span className="font-bold text-slate-900">Target Timeline:</span> {formData.timeline}</div>
              </div>

              {onClose && (
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#0F2D6B] text-white rounded-xl text-xs font-semibold hover:bg-[#0A1E4A] transition-colors"
                >
                  Return to Ecosystem
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Step 1: Employees */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900">Step 1: How many employees in your organization?</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {['1 - 19 employees', '20 - 49 employees', '50 - 149 employees', '150 - 499 employees', '500 - 999 employees', '1,000+ enterprise'].map(opt => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setFormData({ ...formData, employees: opt })}
                        className={`p-4 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all ${
                          formData.employees === opt
                            ? 'bg-blue-50 border-blue-600 text-blue-900 shadow-xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{opt}</span>
                          {formData.employees === opt && <Check className="w-4 h-4 text-blue-600" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Companies */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900">Step 2: How many companies or legal entities?</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {['1 company', '2 - 3 companies', '4 - 10 subsidiaries', '10+ holding entities'].map(opt => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setFormData({ ...formData, companies: opt })}
                        className={`p-4 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all ${
                          formData.companies === opt
                            ? 'bg-blue-50 border-blue-600 text-blue-900 shadow-xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{opt}</span>
                          {formData.companies === opt && <Check className="w-4 h-4 text-blue-600" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Branches */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900">Step 3: How many branches or physical locations?</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {['Single office / headquarters', '2 - 4 branches', '5 - 15 regional sites', '15+ distributed locations / retail'].map(opt => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setFormData({ ...formData, branches: opt })}
                        className={`p-4 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all ${
                          formData.branches === opt
                            ? 'bg-blue-50 border-blue-600 text-blue-900 shadow-xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{opt}</span>
                          {formData.branches === opt && <Check className="w-4 h-4 text-blue-600" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Services */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">Step 4: Which services do you need?</h3>
                    <span className="text-xs text-slate-500 font-medium">Select all that apply</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {servicesList.map(svc => {
                      const isSelected = formData.services.includes(svc);
                      return (
                        <button
                          type="button"
                          key={svc}
                          onClick={() => handleToggleService(svc)}
                          className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all ${
                            isSelected
                              ? 'bg-blue-50 border-blue-600 text-blue-900 font-bold shadow-xs'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{svc}</span>
                            {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 5: Countries */}
              {currentStep === 5 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">Step 5: Country / Countries of operation?</h3>
                    <span className="text-xs text-slate-500 font-medium">Select all active markets</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {countriesList.map(c => {
                      const isSelected = formData.countries.includes(c);
                      return (
                        <button
                          type="button"
                          key={c}
                          onClick={() => handleToggleCountry(c)}
                          className={`p-3 rounded-xl border text-left text-xs transition-all ${
                            isSelected
                              ? 'bg-lime-50 border-lime-600 text-slate-950 font-bold shadow-xs'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{c}</span>
                            {isSelected && <span className="w-2 h-2 rounded-full bg-lime-600"></span>}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 6: Preferred Timeline */}
              {currentStep === 6 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900">Step 6: Preferred implementation timeline?</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {['Immediate (within 14 days)', 'Within 30 days', 'Next quarter (1 - 3 months)', 'Planning / Budgeting phase'].map(opt => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setFormData({ ...formData, timeline: opt })}
                        className={`p-4 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all ${
                          formData.timeline === opt
                            ? 'bg-blue-50 border-blue-600 text-blue-900 shadow-xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{opt}</span>
                          {formData.timeline === opt && <Check className="w-4 h-4 text-blue-600" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 7: Contact information */}
              {currentStep === 7 && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900">Step 7: Where should we send your custom proposal?</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Folake Adebayo"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Organization *</label>
                      <input
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="e.g. Zenith Global Ventures"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Work Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="folake@zenith.com"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Direct Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+234 802 345 6789"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Additional Notes</label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={e => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Any specific current software or legacy systems you are migrating from..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none resize-none"
                    ></textarea>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-gradient-to-r from-lime-400 to-[#9AE616] hover:from-lime-300 hover:to-lime-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <span>Request My Custom Proposal</span>
                      <ArrowRight className="w-4 h-4 text-slate-950" />
                    </button>
                  </div>
                </form>
              )}

              {/* Navigation Controls */}
              {currentStep < 7 && (
                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                  <button
                    type="button"
                    disabled={currentStep === 1}
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-30 transition-colors flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Previous
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(prev => prev + 1)}
                    className="px-6 py-2.5 bg-[#0F2D6B] hover:bg-[#0A1E4A] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Continue to Step {currentStep + 1}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-lime-400" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
