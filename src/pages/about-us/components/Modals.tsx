import React, { useState } from 'react';
import {
  X,
  Calendar,
  CheckCircle2,
  Phone,
  Mail,
  Building,
  User,
  MessageSquare,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { BRAND } from '../data/contentData';
import {
  ALL_WORLD_COUNTRIES,
  ORGANIZATION_SIZE_OPTIONS,
  WORLD_COUNTRY_DIAL_CODES,
} from '../../../data/worldCountries';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledSegment?: string;
}

export const DemoModal: React.FC<DemoModalProps> = ({
  isOpen,
  onClose,
  prefilledSegment,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    dialCode: '+234',
    phone: '',
    company: '',
    employees: '1 – 25 Employees',
    country: 'Nigeria',
    date: '',
    notes: prefilledSegment ? `Interested in solutions for ${prefilledSegment}` : '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-[#0E2038] rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-blue-900/40 relative transition-colors duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0A2540] to-[#0B3B73] p-6 text-white flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-[#84CC16] uppercase tracking-wider">
              Tailored Walkthrough
            </div>
            <h3 className="text-xl font-bold">Book a NextSofthr Demo</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#84CC16]/20 border border-[#84CC16] text-[#65A30D] dark:text-[#84CC16] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-bold text-[#0A2540] dark:text-white">
              Demo Request Scheduled!
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-sm mx-auto">
              Thank you, <strong>{formData.fullName || 'there'}</strong>. Our implementation
              specialist will confirm your calendar invite and prepare a custom demonstration
              for {formData.company || 'your organization'}.
            </p>
            <div className="p-3 bg-slate-50 dark:bg-[#071322] rounded-xl text-xs text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-800">
              For urgent inquiries, call us directly at{' '}
              <a href={`tel:${BRAND.phone}`} className="text-[#0B3B73] dark:text-[#84CC16] font-bold underline">
                {BRAND.phoneDisplay}
              </a>
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="bg-[#0B3B73] dark:bg-blue-600 hover:bg-[#0A2540] dark:hover:bg-blue-700 text-white text-xs font-bold px-6 py-3 rounded-xl transition-colors cursor-pointer"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Amina Bello"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full pl-8 pr-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-[#071322] text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#0B3B73] dark:focus:border-[#84CC16]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                  Work Email *
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="amina@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-8 pr-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-[#071322] text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#0B3B73] dark:focus:border-[#84CC16]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                  Phone Number *
                </label>
                <div className="flex items-stretch border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-[#071322] overflow-hidden focus-within:border-[#0B3B73] dark:focus-within:border-[#84CC16]">
                  <select
                    aria-label="Country dialing code"
                    value={formData.dialCode}
                    onChange={(e) => setFormData({ ...formData, dialCode: e.target.value })}
                    className="w-32 px-2 py-2 text-xs font-semibold bg-slate-50 dark:bg-[#0A2540] border-r border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer truncate"
                  >
                    {WORLD_COUNTRY_DIAL_CODES.map((item) => (
                      <option key={`${item.country}-${item.dialCode}`} value={item.dialCode}>
                        {item.country} ({item.dialCode})
                      </option>
                    ))}
                  </select>
                  <div className="relative flex-1 min-w-0 flex items-center">
                    <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
                    <input
                      type="tel"
                      required
                      placeholder="803 123 4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-8 pr-2.5 py-2 text-xs bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                  Company Name *
                </label>
                <div className="relative">
                  <Building className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Acme Enterprises"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full pl-8 pr-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-[#071322] text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#0B3B73] dark:focus:border-[#84CC16]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                  Organization Size
                </label>
                <select
                  value={formData.employees}
                  onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-[#0B3B73] dark:focus:border-[#84CC16] bg-white dark:bg-[#071322] text-slate-900 dark:text-slate-100"
                >
                  {ORGANIZATION_SIZE_OPTIONS.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                  Primary Location
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-[#0B3B73] dark:focus:border-[#84CC16] bg-white dark:bg-[#071322] text-slate-900 dark:text-slate-100"
                >
                  {ALL_WORLD_COUNTRIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                Specific Interests or Questions
              </label>
              <textarea
                rows={2}
                placeholder="Tell us what challenges you'd like to address (e.g. multi-branch payroll, attendance)..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-[#071322] text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#0B3B73] dark:focus:border-[#84CC16]"
              ></textarea>
            </div>

            <div className="pt-2 space-y-2.5">
              <button
                type="submit"
                className="w-full py-3 bg-[#84CC16] hover:bg-[#74be12] text-[#0A2540] font-bold text-xs rounded-xl shadow transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Confirm Product Demo</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/2349158482622?text=Hello%20NextSofthr%20Team,%20I%20would%20like%20to%20book%20a%20live%20product%20demo.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl border border-emerald-200 dark:border-emerald-800/70 bg-emerald-50/80 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Chat with Us on WhatsApp for Instant Demo</span>
              </a>
            </div>

            <div className="text-center text-[10px] text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#65A30D] dark:text-[#84CC16]" />
              <span>Zero obligation • Free 30-minute tailored walkthrough</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-[#0E2038] rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-blue-900/40 relative transition-colors duration-300">
        <div className="bg-gradient-to-r from-[#0A2540] to-[#0B3B73] p-6 text-white flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-[#84CC16] uppercase tracking-wider">
              Get in Touch
            </div>
            <h3 className="text-xl font-bold">Talk to the NextSofthr Team</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#84CC16]/20 border border-[#84CC16] text-[#65A30D] dark:text-[#84CC16] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-[#0A2540] dark:text-white">Message Received!</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Our enterprise team in Lagos has received your inquiry. We typically reply within 2 business hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="bg-[#0B3B73] dark:bg-blue-600 text-white text-xs font-bold px-6 py-2.5 rounded-xl cursor-pointer hover:bg-[#0A2540] dark:hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="p-6 space-y-5">
            {/* Quick Contact Options */}
            <div className="space-y-2">
              <a
                href={`tel:${BRAND.phone}`}
                className="flex items-center justify-between p-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100/70 dark:hover:bg-blue-900/60 border border-blue-100 dark:border-blue-900/40 transition-colors text-[#0B3B73] dark:text-[#38BDF8]"
              >
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#65A30D] dark:text-[#84CC16]" />
                  <span className="text-xs font-bold">Direct Phone Call</span>
                </div>
                <span className="text-xs font-mono font-bold">{BRAND.phoneDisplay}</span>
              </a>

              <a
                href={`https://wa.me/2349158482622?text=Hello%20NextSofthr%20Team,%20I%20would%20like%20to%20learn%20more%20about%20your%20HR%20and%20Payroll%20platform.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100/70 dark:hover:bg-emerald-900/60 border border-emerald-100 dark:border-emerald-800/40 transition-colors text-emerald-900 dark:text-emerald-300"
              >
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-[#84CC16]" />
                  <span className="text-xs font-bold">WhatsApp Direct Message</span>
                </div>
                <span className="text-xs font-semibold">Chat Instantly &rarr;</span>
              </a>
            </div>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
              <span className="flex-shrink mx-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">
                Or Send a Quick Note
              </span>
              <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-[#071322] text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-[#0B3B73] dark:focus:border-[#84CC16]"
                />
              </div>

              <div>
                <input
                  type="email"
                  required
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-[#071322] text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-[#0B3B73] dark:focus:border-[#84CC16]"
                />
              </div>

              <div>
                <textarea
                  required
                  rows={3}
                  placeholder="How can we help your business today?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-[#071322] text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-[#0B3B73] dark:focus:border-[#84CC16]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#84CC16] hover:bg-[#74be12] text-[#0A2540] font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Send Message
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
