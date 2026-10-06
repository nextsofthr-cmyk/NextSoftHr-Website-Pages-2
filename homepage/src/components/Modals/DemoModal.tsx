import { useState, type FormEvent } from 'react';
import { X, CheckCircle, Calendar, Clock, Building2, User, Mail, Globe, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenGetStarted?: () => void;
}

export const DemoModal = ({ isOpen, onClose, onOpenGetStarted }: DemoModalProps) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    companyName: '',
    companySize: '25-100 employees',
    country: 'United States',
    primaryInterest: 'All-in-One Suite (HR + Payroll + AI)',
    date: '2026-09-18',
    timeSlot: '14:00 EST'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
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
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 max-w-lg w-full overflow-hidden relative transition-colors">
        <button
          id="close-demo-modal-btn"
          onClick={handleReset}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors z-10"
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
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      required
                      type="text"
                      placeholder="e.g. Alex Morgan"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Work Email</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      required
                      type="email"
                      placeholder="alex@company.com"
                      value={formData.workEmail}
                      onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Company Name</label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      required
                      type="text"
                      placeholder="Acme Global Inc."
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Team Size</label>
                  <select
                    value={formData.companySize}
                    onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option>1 - 25 employees (Startup)</option>
                    <option>26 - 100 employees (Growing SME)</option>
                    <option>101 - 500 employees (Mid-Market)</option>
                    <option>500+ employees (Enterprise)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Primary Interest</label>
                  <select
                    value={formData.primaryInterest}
                    onChange={(e) => setFormData({ ...formData, primaryInterest: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option>All-in-One Suite (HR + Payroll + AI)</option>
                    <option>Automated Global Payroll</option>
                    <option>Time, Attendance & Shift Rosters</option>
                    <option>AI HR Assistant & Analytics</option>
                    <option>Fully Outsourced HR & Payroll</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Country / Jurisdiction</label>
                  <div className="relative">
                    <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="e.g. US / UK / Global"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
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
                className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 text-sm"
              >
                Confirm Product Demo
                <ArrowRight className="w-4 h-4" />
              </button>

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
                <span className="text-slate-400">Date & Time:</span>
                <span className="font-semibold">Friday, Sep 18, 2026 @ 14:00 EST</span>
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
              className="w-full bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition-colors"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
