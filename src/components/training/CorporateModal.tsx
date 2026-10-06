import React, { useState } from 'react';
import { BRAND_INFO } from '../data/academyData';
import {
  X,
  Building2,
  User,
  Mail,
  Phone,
  Users,
  Calendar,
  MapPin,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

interface CorporateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CorporateModal: React.FC<CorporateModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form fields matching Section 25
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [employeeCount, setEmployeeCount] = useState('11-50 employees');
  const [trainingTopic, setTrainingTopic] = useState('Payroll Administration & Compliance');
  const [preferredDelivery, setPreferredDelivery] = useState('Live Virtual Suites');
  const [preferredDate, setPreferredDate] = useState('2026-11-01');
  const [location, setLocation] = useState('Lagos, Nigeria (Hybrid)');
  const [trainingRequirements, setTrainingRequirements] = useState('');
  const [additionalMessage, setAdditionalMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white dark:bg-[#0F172A] rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#0F4C81] dark:bg-blue-950 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1 text-xs text-lime-300 font-bold uppercase tracking-wider">
            <Building2 className="w-4 h-4" />
            <span>NextSoftHR Enterprise Training Solutions</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            Request Corporate Workforce Training
          </h3>
          <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-lg">
            Empower your teams with customized HR, payroll, and management curricula mapped to your operational needs.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-lime-100 dark:bg-lime-950 text-[#65A30D] dark:text-[#84CC16] flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h4 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Corporate Request Received!
              </h4>

              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-slate-800 dark:text-white">{contactName || 'Corporate Partner'}</strong>. A NextSoftHR enterprise training specialist has been assigned to <strong className="text-[#0F4C81] dark:text-[#84CC16]">{companyName || 'your organization'}</strong> and will send a detailed tailored proposal within 24 hours.
              </p>

              <div className="p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto text-left space-y-1">
                <div><strong>Topic:</strong> {trainingTopic}</div>
                <div><strong>Target Cohort Size:</strong> {employeeCount}</div>
                <div><strong>Delivery Format:</strong> {preferredDelivery}</div>
                <div><strong>Primary Contact:</strong> {email || BRAND_INFO.email}</div>
              </div>

              <div className="pt-4 flex items-center justify-center gap-3">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 text-xs font-bold text-white bg-[#0F4C81] hover:bg-[#0B3C68] dark:bg-blue-600 dark:hover:bg-blue-700 rounded-md transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Company Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Company Name *
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Zenith Holdings Ltd"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
                    />
                  </div>
                </div>

                {/* Contact Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Contact Person Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Adeola Williams"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Corporate Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="adeola@company.com"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Phone / Mobile *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+234 800 000 0000"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
                    />
                  </div>
                </div>

                {/* Number of Employees */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Number of Employees to Train *
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <select
                      value={employeeCount}
                      onChange={(e) => setEmployeeCount(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
                    >
                      <option value="5-10 employees">5-10 employees</option>
                      <option value="11-50 employees">11-50 employees (Standard Cohort)</option>
                      <option value="51-150 employees">51-150 employees (Multi-Cohort)</option>
                      <option value="150+ employees">150+ employees (Enterprise-wide)</option>
                    </select>
                  </div>
                </div>

                {/* Training Topic */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Primary Training Topic *
                  </label>
                  <select
                    value={trainingTopic}
                    onChange={(e) => setTrainingTopic(e.target.value)}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
                  >
                    <option value="Payroll Administration & Compliance">Payroll Administration & Compliance</option>
                    <option value="HR Fundamentals & Strategic HR">HR Fundamentals & Strategic HR</option>
                    <option value="Executive Leadership & People Management">Executive Leadership & People Management</option>
                    <option value="HR Analytics & People Dashboards">HR Analytics & People Dashboards</option>
                    <option value="AI for HR & Workforce Automation">AI for HR & Workforce Automation</option>
                    <option value="Time & Attendance / Roster Governance">Time & Attendance / Roster Governance</option>
                    <option value="Custom Multi-Faculty Program">Custom Multi-Faculty Program</option>
                  </select>
                </div>

                {/* Preferred Delivery */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Preferred Delivery Format
                  </label>
                  <select
                    value={preferredDelivery}
                    onChange={(e) => setPreferredDelivery(e.target.value)}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
                  >
                    <option value="Live Virtual Suites">Live Virtual Suites (Interactive)</option>
                    <option value="On-Site at Company Facility">On-Site at Company Facility</option>
                    <option value="Selected Conference Venue">Selected Conference Venue</option>
                    <option value="Hybrid (Self-paced + Live Executive Workshop)">Hybrid (Self-paced + Live Workshop)</option>
                  </select>
                </div>

                {/* Preferred Date */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Preferred Start Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
                    />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Location / City / Country
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Lagos, Abuja, Port Harcourt, Accra, Nairobi, London"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
                  />
                </div>
              </div>

              {/* Training Requirements */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Specific Training Requirements & Objectives
                </label>
                <textarea
                  rows={2}
                  value={trainingRequirements}
                  onChange={(e) => setTrainingRequirements(e.target.value)}
                  placeholder="Outline any key operational pain points or specific software/tax requirements you need covered..."
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
                />
              </div>

              {/* Additional Message */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Additional Message or Questions
                </label>
                <textarea
                  rows={2}
                  value={additionalMessage}
                  onChange={(e) => setAdditionalMessage(e.target.value)}
                  placeholder="Any other details, billing preferences or timeline notes..."
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  Direct Line: <strong className="text-slate-800 dark:text-slate-200">{BRAND_INFO.phoneDisplay}</strong>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 text-xs font-bold text-white bg-[#0F4C81] hover:bg-[#0B3C68] dark:bg-blue-600 dark:hover:bg-blue-700 rounded-md shadow-xs transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Sending Request...' : 'Request Corporate Training'}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#84CC16]" />
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
