import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Calendar,
  Clock,
  Phone,
  Building,
  Mail,
  User,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Users,
  CreditCard,
  Layers,
} from 'lucide-react';
import { ServiceItem, IndustryItem } from '../types';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onBookDemo: () => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose, onBookDemo }) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0A2540] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-blue-900 p-6 sm:p-8 relative transition-colors">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-[#0D2644] hover:bg-slate-200 dark:hover:bg-blue-900 text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl font-mono font-black text-[#0256C4] dark:text-[#84CC16] bg-blue-50 dark:bg-blue-950 px-3 py-1 rounded-xl border border-transparent dark:border-blue-800">
            {service.number}
          </span>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#84CC16]">
              {service.subtitle}
            </span>
            <h3 className="text-2xl font-extrabold text-[#0A2540] dark:text-white">{service.title}</h3>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
          {service.description}
        </p>

        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Core Features &amp; Modules Included
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {service.features.map((feat, i) => (
              <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-[#0D2644] p-2.5 rounded-xl border border-slate-200/70 dark:border-blue-900/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-blue-50/80 dark:bg-blue-950/60 border border-blue-200/70 dark:border-blue-900 mb-6 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#0256C4] dark:text-[#84CC16] shrink-0 mt-0.5" />
          <div className="text-xs text-blue-900 dark:text-slate-200 leading-relaxed">
            <span className="font-bold block text-sm mb-0.5 text-[#0A2540] dark:text-white">Pan-African Enterprise Architecture</span>
            NextSofthr ensures this module is pre-configured with local labor laws, automated tax brackets, and
            flexible approval hierarchies matching your organizational chart.
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-blue-900/60">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-semibold text-sm transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onBookDemo();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#0256C4] hover:bg-[#024bb0] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Book Live Demonstration</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

interface IndustryModalProps {
  industry: IndustryItem | null;
  onClose: () => void;
  onBookDemo: () => void;
}

export const IndustryModal: React.FC<IndustryModalProps> = ({ industry, onClose, onBookDemo }) => {
  if (!industry) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0A2540] rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-blue-900 p-6 sm:p-8 relative transition-colors">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-[#0D2644] hover:bg-slate-200 dark:hover:bg-blue-900 text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative h-48 rounded-2xl overflow-hidden mb-5 -mx-2 sm:-mx-4 -mt-2 sm:-mt-4">
          <img src={industry.imageUrl} alt={industry.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540] via-transparent to-transparent flex items-end p-4 text-white">
            <div>
              <span className="text-xs font-bold text-[#84CC16] uppercase tracking-wider">Industry Blueprint</span>
              <h3 className="text-2xl font-extrabold">{industry.name}</h3>
            </div>
          </div>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 mb-5 leading-relaxed">{industry.description}</p>

        <div className="space-y-2 mb-6">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Sector Tailored Features:</div>
          {industry.features.map((feat, i) => (
            <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-[#0D2644] p-2.5 rounded-lg border border-slate-200/80 dark:border-blue-900/60">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="font-medium">{feat}</span>
            </div>
          ))}
        </div>

        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-800 dark:text-emerald-300 font-semibold mb-6">
          Benchmark Metric: {industry.stat}
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-blue-900/60">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onBookDemo();
            }}
            className="px-6 py-2.5 rounded-xl bg-[#0256C4] hover:bg-[#024bb0] text-white font-bold text-sm shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <span>Request Solution Demo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    phone: '+234',
    companyName: '',
    employeeCount: '25-100 employees',
    country: 'Nigeria',
    primaryInterest: 'Full HR & Payroll Suite',
    preferredDate: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0A2540] rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-blue-900 p-6 sm:p-8 relative transition-colors">
        <button
          onClick={() => {
            setSubmitted(false);
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-[#0D2644] hover:bg-slate-200 dark:hover:bg-blue-900 text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-extrabold text-[#0A2540] dark:text-white">Demo Request Confirmed!</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
              Thank you, <span className="font-semibold text-slate-900 dark:text-white">{formData.fullName}</span>. An African solutions
              consultant has been assigned to <span className="font-semibold text-slate-900 dark:text-white">{formData.companyName}</span>.
              We will contact you at <span className="font-semibold text-slate-900 dark:text-white">{formData.phone}</span> / {formData.workEmail} shortly.
            </p>
            <div className="p-4 bg-blue-50 dark:bg-blue-950/80 rounded-2xl text-xs text-[#0256C4] dark:text-[#84CC16] font-medium max-w-sm mx-auto border border-transparent dark:border-blue-800">
              Direct telephone inquiries: <span className="font-bold">+234 915 848 2622</span>
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl bg-[#0256C4] text-white font-bold text-sm shadow-md cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#0256C4] dark:text-[#84CC16] uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-[#84CC16]" /> VIP Consultation &amp; Live Tour
            </div>
            <h3 className="text-2xl font-extrabold text-[#0A2540] dark:text-white">Book a Live NextSofthr Demo</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-300 mt-1 mb-6">
              Experience automated payroll, attendance syncing, and the AI HR Assistant customized for your team.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      required
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Amara Okafor"
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-blue-800 bg-white dark:bg-[#07182E] text-slate-900 dark:text-white focus:ring-2 focus:ring-[#0256C4] dark:focus:ring-[#84CC16] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Work Email *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      required
                      type="email"
                      value={formData.workEmail}
                      onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                      placeholder="amara@company.com"
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-blue-800 bg-white dark:bg-[#07182E] text-slate-900 dark:text-white focus:ring-2 focus:ring-[#0256C4] dark:focus:ring-[#84CC16] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Company Name *</label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      required
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="NextSoft Logistics Ltd"
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-blue-800 bg-white dark:bg-[#07182E] text-slate-900 dark:text-white focus:ring-2 focus:ring-[#0256C4] dark:focus:ring-[#84CC16] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Phone Number *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+234 915 848 2622"
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-blue-800 bg-white dark:bg-[#07182E] text-slate-900 dark:text-white focus:ring-2 focus:ring-[#0256C4] dark:focus:ring-[#84CC16] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Team Size</label>
                  <select
                    value={formData.employeeCount}
                    onChange={(e) => setFormData({ ...formData, employeeCount: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-blue-800 focus:ring-2 focus:ring-[#0256C4] dark:focus:ring-[#84CC16] focus:outline-none bg-white dark:bg-[#07182E] text-slate-900 dark:text-white"
                  >
                    <option>1-20 employees</option>
                    <option>21-100 employees</option>
                    <option>101-500 employees</option>
                    <option>500+ enterprise employees</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Primary Country Hub</label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-blue-800 focus:ring-2 focus:ring-[#0256C4] dark:focus:ring-[#84CC16] focus:outline-none bg-white dark:bg-[#07182E] text-slate-900 dark:text-white"
                  >
                    <option>Nigeria 🇳🇬</option>
                    <option>Ghana 🇬🇭</option>
                    <option>Kenya 🇰🇪</option>
                    <option>South Africa 🇿🇦</option>
                    <option>Rwanda 🇷🇼</option>
                    <option>Other / Multi-Country 🌍</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Area of Greatest Interest</label>
                <select
                  value={formData.primaryInterest}
                  onChange={(e) => setFormData({ ...formData, primaryInterest: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-blue-800 focus:ring-2 focus:ring-[#0256C4] dark:focus:ring-[#84CC16] focus:outline-none bg-white dark:bg-[#07182E] text-slate-900 dark:text-white"
                >
                  <option>Full HR &amp; Payroll Suite</option>
                  <option>Payroll &amp; Statutory Tax Automation</option>
                  <option>Time, Attendance &amp; Shift Rostering</option>
                  <option>AI HR Assistant &amp; Analytics</option>
                  <option>Custom Multi-Branch Implementation</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#0256C4] hover:bg-[#024bb0] text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Confirm Live Demo Request</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[11px] text-slate-400 dark:text-slate-400 text-center">
                Need urgent onboarding? Call <span className="text-slate-700 dark:text-slate-200 font-bold">+234 915 848 2622</span>.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDemo: () => void;
}

export const GetStartedModal: React.FC<GetStartedModalProps> = ({ isOpen, onClose, onOpenDemo }) => {
  const [created, setCreated] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    workEmail: '',
    country: 'Nigeria',
    password: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCreated(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0A2540] rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 dark:border-blue-900 p-6 sm:p-8 relative transition-colors">
        <button
          onClick={() => {
            setCreated(false);
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-[#0D2644] hover:bg-slate-200 dark:hover:bg-blue-900 text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {created ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-extrabold text-[#0A2540] dark:text-white">Workspace Provisioned!</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Your NextSofthr instance for <span className="font-bold text-slate-900 dark:text-white">{formData.businessName}</span> has been initialized.
              Check {formData.workEmail} for your activation link and company dashboard credentials.
            </p>
            <div className="p-3 bg-slate-50 dark:bg-[#0D2644] rounded-xl border border-slate-200 dark:border-blue-900 text-xs text-slate-600 dark:text-slate-300">
              Includes 14 days of unrestricted access to all 12 HR modules and the AI Assistant.
            </div>
            <button
              onClick={() => {
                setCreated(false);
                onClose();
              }}
              className="w-full py-3 rounded-xl bg-[#0256C4] text-white font-bold text-sm cursor-pointer"
            >
              Enter NextSofthr Console
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#84CC16] uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-[#84CC16]" /> Free 14-Day Full Access
            </div>
            <h3 className="text-2xl font-extrabold text-[#0A2540] dark:text-white">Start Free with NextSofthr</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-5">
              No credit card required. Setup takes less than 2 minutes.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Company / Organization Name *</label>
                <input
                  required
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  placeholder="e.g. Apex Global Logistics"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-blue-800 bg-white dark:bg-[#07182E] text-slate-900 dark:text-white focus:ring-2 focus:ring-[#0256C4] dark:focus:ring-[#84CC16] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Work Email Address *</label>
                <input
                  required
                  type="email"
                  value={formData.workEmail}
                  onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                  placeholder="you@company.com"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-blue-800 bg-white dark:bg-[#07182E] text-slate-900 dark:text-white focus:ring-2 focus:ring-[#0256C4] dark:focus:ring-[#84CC16] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Primary Country of Operation</label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-blue-800 focus:ring-2 focus:ring-[#0256C4] dark:focus:ring-[#84CC16] focus:outline-none bg-white dark:bg-[#07182E] text-slate-900 dark:text-white"
                >
                  <option>Nigeria (NGN ₦)</option>
                  <option>Ghana (GHS ₵)</option>
                  <option>Kenya (KES KSh)</option>
                  <option>South Africa (ZAR R)</option>
                  <option>Rwanda (RWF RF)</option>
                  <option>United States / International (USD $)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Create Admin Password *</label>
                <input
                  required
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••••••"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-blue-800 bg-white dark:bg-[#07182E] text-slate-900 dark:text-white focus:ring-2 focus:ring-[#0256C4] dark:focus:ring-[#84CC16] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#0256C4] hover:bg-[#024bb0] text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Launch Your Free Workspace</span>
                <ArrowRight className="w-4 h-4 text-[#84CC16]" />
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenDemo();
                  }}
                  className="text-xs text-[#0256C4] dark:text-[#84CC16] font-semibold hover:underline cursor-pointer"
                >
                  Need personalized help? Book a guided tour instead →
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
