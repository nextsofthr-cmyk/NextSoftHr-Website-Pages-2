import { useState, type FormEvent } from 'react';
import { X, CheckCircle, Calendar, Clock, Building2, User, Mail, Globe, Phone, MessageCircle, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  ALL_WORLD_COUNTRIES,
  ORGANIZATION_SIZE_OPTIONS,
  WORLD_COUNTRY_DIAL_CODES,
} from '../../../../data/worldCountries';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenGetStarted?: () => void;
}

export const DemoModal = ({ isOpen, onClose }: DemoModalProps) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    dialCode: '+234',
    phone: '',
    companyName: '',
    companySize: '1 – 25 Employees',
    country: 'Nigeria',
    primaryInterest: 'All-in-One Suite (HR + Payroll + AI)',
    date: '2026-09-18',
    timeSlot: '14:00 EST',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // safe fallback
    }
    setStep('success');
  };

  const handleReset = () => {
    setStep('form');
    onClose();
  };

  return (
    <div id="demo-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 max-w-2xl w-full overflow-hidden max-h-[92vh] overflow-y-auto relative transition-colors">
        <button
          id="close-demo-modal-btn"
          onClick={handleReset}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors z-10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                Live 1-on-1 Product Tour
              </span>
              <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-lime-100 dark:bg-lime-950/80 text-lime-900 dark:text-lime-300 border border-lime-300 dark:border-lime-800">
                30 Minutes
              </span>
            </div>

            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Book a Personalized Demo
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 mb-6">
              See NextSofthr configured specifically for your team size, local labor laws, and payroll requirements.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      required
                      type="text"
                      placeholder="e.g. Alex Morgan"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Work Email *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      required
                      type="email"
                      placeholder="alex@company.com"
                      value={formData.workEmail}
                      onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>
              </div>

              {/* Phone Number with Country Dialing Code Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Phone Number *
                </label>
                <div className="flex items-stretch rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden focus-within:ring-2 focus-within:ring-blue-600">
                  <select
                    aria-label="Country dialing code"
                    value={formData.dialCode}
                    onChange={(e) => setFormData({ ...formData, dialCode: e.target.value })}
                    className="w-44 sm:w-52 px-3 py-2.5 text-xs sm:text-sm font-semibold bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer truncate"
                  >
                    {WORLD_COUNTRY_DIAL_CODES.map((item) => (
                      <option key={`${item.country}-${item.dialCode}`} value={item.dialCode}>
                        {item.country} ({item.dialCode})
                      </option>
                    ))}
                  </select>
                  <div className="relative flex-1 min-w-0 flex items-center">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                    <input
                      required
                      type="tel"
                      placeholder="803 123 4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Company Name *</label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      required
                      type="text"
                      placeholder="Acme Global Inc."
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Organization Size</label>
                  <select
                    value={formData.companySize}
                    onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    {ORGANIZATION_SIZE_OPTIONS.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Primary Interest</label>
                  <select
                    value={formData.primaryInterest}
                    onChange={(e) => setFormData({ ...formData, primaryInterest: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option>All-in-One Suite (HR + Payroll + AI)</option>
                    <option>Automated Global Payroll</option>
                    <option>Time, Attendance &amp; Shift Rosters</option>
                    <option>AI HR Assistant &amp; Analytics</option>
                    <option>Fully Outsourced HR &amp; Payroll</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Country / Jurisdiction</label>
                  <div className="relative">
                    <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                    <select
                      value={formData.country}
                      onChange={(e) => {
                        const selectedCountry = e.target.value;
                        const matchedDial = WORLD_COUNTRY_DIAL_CODES.find((d) => d.country === selectedCountry);
                        setFormData({
                          ...formData,
                          country: selectedCountry,
                          dialCode: matchedDial ? matchedDial.dialCode : formData.dialCode,
                        });
                      }}
                      className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      {ALL_WORLD_COUNTRIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Earliest Available: <strong>Sep 18, 2026</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-lime-600 dark:text-lime-400" />
                  <span>Slot: <strong>14:00 EST / 19:00 UTC</strong></span>
                </div>
              </div>

              <button
                id="submit-demo-booking-btn"
                type="submit"
                className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                <span>Confirm Product Demo</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* WhatsApp Direct Link Below Confirm Product Demo */}
              <a
                id="demo-whatsapp-direct-link"
                href="https://wa.me/2349158482622?text=Hello%20NextSofthr%20Team%2C%20I%20would%20like%20to%20book%20a%20live%20product%20demo."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl border border-emerald-200 dark:border-emerald-800/70 bg-emerald-50/80 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 fill-current" />
                <span>Chat with Us on WhatsApp for Instant Demo</span>
              </a>

              <p className="text-center text-xs text-slate-400">
                No credit card required • Tailored session with an HR Systems Architect
              </p>
            </form>
          </div>
        ) : (
          <div className="p-8 text-center space-y-4 animate-fadeIn">
            <div className="w-16 h-16 bg-lime-100 dark:bg-lime-950/80 text-lime-600 dark:text-lime-400 rounded-full flex items-center justify-center mx-auto ring-8 ring-lime-50 dark:ring-lime-900/30">
              <CheckCircle className="w-10 h-10 text-lime-600 dark:text-lime-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Demo Scheduled!</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-sm mx-auto">
              We've reserved your slot for <strong>NextSofthr Live Tour</strong>. A calendar invite and prep guide have been sent to <strong>{formData.workEmail || 'your email'}</strong>.
            </p>
            <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl text-left text-xs space-y-2 border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between text-slate-700 dark:text-slate-300">
                <span className="text-slate-400">Phone:</span>
                <span className="font-semibold">{formData.dialCode} {formData.phone}</span>
              </div>
              <div className="flex justify-between text-slate-700 dark:text-slate-300">
                <span className="text-slate-400">Focus Module:</span>
                <span className="font-semibold">{formData.primaryInterest}</span>
              </div>
              <div className="flex justify-between text-slate-700 dark:text-slate-300">
                <span className="text-slate-400">Host:</span>
                <span className="font-semibold text-blue-600 dark:text-blue-400">David M., Lead Solutions Specialist</span>
              </div>
            </div>
            <button
              id="close-success-demo-btn"
              onClick={handleReset}
              className="w-full bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
