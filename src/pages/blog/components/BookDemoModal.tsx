import React, { useState } from 'react';
import { X, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';

interface BookDemoModalProps {
  onClose: () => void;
}

export const BookDemoModal: React.FC<BookDemoModalProps> = ({ onClose }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    companyName: '',
    phone: '',
    companySize: '25 - 100',
    modules: ['Automated Payroll', 'Time & Attendance'],
  });

  const availableModules = [
    'HR Management',
    'Automated Payroll',
    'Time & Attendance',
    'Talent Acquisition',
    'Employee Self-Service',
    'Workforce Analytics & AI',
  ];

  const handleModuleToggle = (mod: string) => {
    setFormData((prev) => ({
      ...prev,
      modules: prev.modules.includes(mod)
        ? prev.modules.filter((m) => m !== mod)
        : [...prev.modules, mod],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0B1E36] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-[#1E3656] relative overflow-hidden transition-colors duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-[#122A4A] transition-colors"
          aria-label="Close Book Demo Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'success' ? (
          <div className="text-center py-6 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-[#8EE000]/30 text-slate-950 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-[#0A3F7E] dark:text-[#8EE000]" />
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-heading">
              Demo Reserved Successfully!
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
              Thank you, <span className="font-semibold text-slate-900 dark:text-white">{formData.fullName}</span>. A NextSoftHr Enterprise Solutions Specialist has been assigned to schedule a tailored session for <span className="font-semibold text-slate-900 dark:text-white">{formData.companyName}</span>.
            </p>

            <div className="p-4 bg-slate-50 dark:bg-[#07192F] rounded-2xl border border-slate-200 dark:border-[#1E3656] text-xs text-slate-600 dark:text-slate-300 space-y-1.5 max-w-sm mx-auto text-left">
              <div><strong>Meeting Confirmation sent to:</strong> {formData.workEmail}</div>
              <div><strong>Selected Modules:</strong> {formData.modules.join(', ')}</div>
              <div><strong>Platform Scope:</strong> Pan-African & Global Multi-Entity</div>
            </div>

            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-[#8EE000] hover:bg-[#9EF01A] transition-all border border-[#7BC500]"
            >
              Return to Platform
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A3F7E] dark:text-[#8EE000] bg-[#0A3F7E]/10 dark:bg-[#8EE000]/15 px-2.5 py-0.5 rounded-md mb-2">
                <Calendar className="w-3.5 h-3.5 text-[#8EE000]" />
                <span>Executive Platform Walkthrough</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white font-heading">
                Book a Personalized Demo
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                See how NextSoftHr automates payroll, attendance, and talent operations for your exact organization size.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. David Adeleke"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-[#1E3656] bg-white dark:bg-[#07192F] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0A3F7E] dark:focus:ring-[#8EE000]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Work Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.workEmail}
                  onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-[#1E3656] bg-white dark:bg-[#07192F] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0A3F7E] dark:focus:ring-[#8EE000]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="e.g. Apex Industrial Ltd"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-[#1E3656] bg-white dark:bg-[#07192F] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0A3F7E] dark:focus:ring-[#8EE000]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Workforce Size
                </label>
                <select
                  value={formData.companySize}
                  onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-[#1E3656] bg-white dark:bg-[#07192F] text-slate-900 dark:text-white"
                >
                  <option value="1 - 25">1 - 25 Employees (Small Business)</option>
                  <option value="25 - 100">25 - 100 Employees (Growing Firm)</option>
                  <option value="100 - 500">100 - 500 Employees (Mid-Market)</option>
                  <option value="500+">500+ Employees (Enterprise)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Modules to Include in Demo:
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {availableModules.map((mod) => {
                  const isChecked = formData.modules.includes(mod);
                  return (
                    <button
                      type="button"
                      key={mod}
                      onClick={() => handleModuleToggle(mod)}
                      className={`p-2 rounded-lg border text-left flex items-center justify-between transition-colors ${
                        isChecked
                          ? 'bg-[#0A3F7E]/10 dark:bg-[#8EE000]/15 border-[#0A3F7E] dark:border-[#8EE000] text-[#0A3F7E] dark:text-[#8EE000] font-semibold'
                          : 'bg-slate-50 dark:bg-[#07192F] border-slate-200 dark:border-[#1E3656] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#0E2442]'
                      }`}
                    >
                      <span className="truncate pr-1">{mod}</span>
                      {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-[#8EE000] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl text-xs font-bold text-slate-950 bg-[#8EE000] hover:bg-[#9EF01A] transition-all flex items-center justify-center gap-2 shadow-md border border-[#7BC500]"
            >
              <span>Schedule Product Walkthrough</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
