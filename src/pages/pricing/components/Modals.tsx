import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Calendar,
  Lock,
  ArrowRight,
  Server,
  Building,
  Mail,
  User,
  Phone,
} from 'lucide-react';
import { PricingPlan } from '../types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TrialModalProps extends ModalProps {
  initialPlan?: string;
  employeeCount?: number;
}

export const TrialModal: React.FC<TrialModalProps> = ({
  isOpen,
  onClose,
  initialPlan = 'Professional',
  employeeCount = 50,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    companyName: '',
    phone: '',
    plan: initialPlan,
    teamSize: employeeCount.toString(),
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0B132B] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative overflow-hidden transition-colors">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-14 h-14 rounded-2xl bg-lime-100 dark:bg-lime-950/60 text-[#65A30D] dark:text-[#A3E635] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Workspace Ready!</h3>
            <p className="mt-2 text-slate-600 dark:text-slate-300 text-sm leading-relaxed max-w-sm mx-auto">
              We have dispatched your instant trial activation link to{' '}
              <strong className="text-slate-900 dark:text-white">{formData.workEmail || 'your email'}</strong>. Your
              NextSofthr instance has been pre-configured for {formData.plan}.
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2.5 rounded-xl font-bold text-slate-950 bg-[#A3E635] hover:bg-[#84CC16] text-sm"
            >
              Continue to Dashboard
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#0265DC] dark:text-blue-300 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#65A30D] dark:text-[#A3E635]" />
              <span>Instant Access • No Card Required</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-[#0B132B] dark:text-white">
              Start Your Free Trial
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Selected Plan:{' '}
              <span className="font-bold text-[#0265DC] dark:text-blue-300">{formData.plan}</span>
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    required
                    type="text"
                    placeholder="e.g. Elena Rostova"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111C38] text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0265DC]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Work Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    required
                    type="email"
                    placeholder="elena@company.com"
                    value={formData.workEmail}
                    onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111C38] text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0265DC]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Company Name
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Acme Corp"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111C38] text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0265DC]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Team Size
                  </label>
                  <select
                    value={formData.teamSize}
                    onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#0265DC] bg-white dark:bg-[#111C38] text-slate-900 dark:text-white"
                  >
                    <option value="10">10 – 30 staff</option>
                    <option value="50">30 – 100 staff</option>
                    <option value="250">100 – 500 staff</option>
                    <option value="1000">500+ staff</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3.5 rounded-xl font-bold text-slate-950 bg-[#A3E635] hover:bg-[#84CC16] shadow-md shadow-lime-500/20 text-sm transition-all flex items-center justify-center gap-2"
              >
                <span>Activate Free Trial</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500 mt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Your company data is strictly private &amp; encrypted</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export const DemoModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [focusArea, setFocusArea] = useState('All-in-One Platform');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0B132B] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative overflow-hidden transition-colors">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-[#0265DC] dark:text-blue-300 flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8" />
            </div>
            <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Demo Scheduled!</h3>
            <p className="mt-2 text-slate-600 dark:text-slate-300 text-sm leading-relaxed max-w-sm mx-auto">
              A NextSofthr workforce solutions architect will connect with you to demonstrate{' '}
              <strong className="text-slate-900 dark:text-white">{focusArea}</strong> tailored to your team.
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2.5 rounded-xl font-bold text-white bg-[#0265DC] hover:bg-[#004DB3] text-sm"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#0265DC] dark:text-blue-300 uppercase tracking-wider mb-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>30-Minute Personalized Walkthrough</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-[#0B132B] dark:text-white">
              Book a Live Demo
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Explore how NextSofthr streamlines payroll, shifts, and HR operations for your specific
              industry.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="mt-6 space-y-3.5"
            >
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Work Email
                </label>
                <input
                  required
                  type="email"
                  placeholder="name@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111C38] text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0265DC]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Primary Interest / Focus Area
                </label>
                <select
                  value={focusArea}
                  onChange={(e) => setFocusArea(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#0265DC] bg-white dark:bg-[#111C38] text-slate-900 dark:text-white"
                >
                  <option value="All-in-One Platform">All-in-One Platform (HR + Payroll + Attendance)</option>
                  <option value="Advanced Payroll & Multi-Tax">Advanced Payroll &amp; Multi-Tax Rules</option>
                  <option value="Attendance & Shift Scheduling">Attendance &amp; Shift Scheduling</option>
                  <option value="AI HR & Payroll Copilot">AI HR &amp; Payroll Copilot</option>
                  <option value="Multi-Company & Global Teams">Multi-Company &amp; Global Teams</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Phone / WhatsApp (Optional)
                </label>
                <input
                  type="tel"
                  placeholder="+234..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111C38] text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0265DC]"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3.5 rounded-xl font-bold text-white bg-[#0265DC] hover:bg-[#004DB3] shadow-md shadow-blue-500/20 text-sm transition-all flex items-center justify-center gap-2"
              >
                <span>Schedule Walkthrough</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export const ContactSalesModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0B132B] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative overflow-hidden transition-colors">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-[#0265DC] dark:text-blue-300 flex items-center justify-center mx-auto mb-4">
              <Building className="w-8 h-8" />
            </div>
            <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Inquiry Received</h3>
            <p className="mt-2 text-slate-600 dark:text-slate-300 text-sm leading-relaxed max-w-sm mx-auto">
              Our Enterprise Solutions Director will review your multi-entity requirements and contact
              you directly.
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2.5 rounded-xl font-bold text-white bg-[#0265DC] hover:bg-[#004DB3] text-sm"
            >
              Close
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#0265DC] dark:text-blue-300 uppercase tracking-wider mb-1">
              <Building className="w-3.5 h-3.5" />
              <span>Enterprise &amp; Custom Deployments</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-[#0B132B] dark:text-white">
              Contact Enterprise Sales
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Direct line: <a href="tel:+2349158482622" className="text-[#0265DC] dark:text-blue-300 font-bold">+2349158482622</a>
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="mt-6 space-y-3.5"
            >
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Work Email
                </label>
                <input
                  required
                  type="email"
                  placeholder="director@enterprise.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111C38] text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0265DC]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Approximate Total Workforce Count
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. 1,500 employees across 4 subsidiaries"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111C38] text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0265DC]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Special Requirements (SSO, Multi-Country, Custom SLA)
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe any custom integrations, data migration needs, or compliance policies..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111C38] text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0265DC]"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3.5 rounded-xl font-bold text-white bg-slate-900 dark:bg-[#0265DC] hover:bg-slate-800 dark:hover:bg-[#004DB3] text-sm transition-all"
              >
                Submit Enterprise Request
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export const SecurityModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0B132B] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative max-h-[90vh] overflow-y-auto transition-colors">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-bold text-[#0265DC] dark:text-blue-300 uppercase tracking-wider mb-1">
          <ShieldCheck className="w-4 h-4 text-[#65A30D] dark:text-[#A3E635]" />
          <span>Security Architecture &amp; Governance</span>
        </div>
        <h3 className="font-display text-2xl font-bold text-[#0B132B] dark:text-white">
          Enterprise Protection Standards
        </h3>

        <div className="mt-6 space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#111C38] border border-slate-200 dark:border-slate-800">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Data Encryption at Rest and Transit</h4>
            <p>
              All workforce databases, employee identity numbers, and bank account numbers are
              encrypted at rest using military-grade AES-256 encryption. Network communications are
              enforced over TLS 1.3 with automated certificate rotation.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#111C38] border border-slate-200 dark:border-slate-800">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Role-Based Access Control (RBAC)</h4>
            <p>
              Strict internal isolation ensures that department supervisors only view team member
              timesheets without salary visibility. Full payroll calculations and disbursements
              require designated finance authorizations.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#111C38] border border-slate-200 dark:border-slate-800">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Immutable Audit Logging</h4>
            <p>
              Every salary modification, attendance adjustment, leave approval, and user authentication
              event generates an unalterable audit log timestamped with IP address and user credentials.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#111C38] border border-slate-200 dark:border-slate-800">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Disaster Recovery &amp; Geo-Redundancy</h4>
            <p>
              Automated snapshot backups are scheduled continuously across geo-distributed cloud
              clusters, maintaining a target Recovery Point Objective (RPO) under 15 minutes.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
