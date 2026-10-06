import { useState, type FormEvent } from 'react';
import { X, CheckCircle, Shield, Building2, User, Mail, Sparkles, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDemo?: () => void;
}

export const GetStartedModal = ({ isOpen, onClose, onOpenDemo }: GetStartedModalProps) => {
  const [step, setStep] = useState<'details' | 'success'>('details');
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    country: 'United States',
    size: '10-50'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.55 }
      });
    } catch {
      // safe fallback
    }
    setStep('success');
  };

  const handleClose = () => {
    setStep('details');
    onClose();
  };

  return (
    <div id="get-started-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 max-w-lg w-full overflow-hidden relative transition-colors">
        <button
          id="close-get-started-modal"
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'details' ? (
          <div className="p-6 md:p-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full bg-lime-100 dark:bg-lime-950/80 text-lime-800 dark:text-lime-300 border border-lime-300 dark:border-lime-800 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-lime-700 dark:text-lime-400" />
              14-Day Free All-Access Trial • Instant Setup
            </div>

            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Start with NextSofthr
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 mb-6">
              Create your intelligent workforce operating system in 60 seconds. No credit card required.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Your Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    required
                    type="text"
                    placeholder="Jane Doe"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                    placeholder="jane@company.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Company Name</label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      required
                      type="text"
                      placeholder="My Organization"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Employee Count</label>
                  <select
                    value={form.size}
                    onChange={(e) => setForm({ ...form, size: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="1-10">1 - 10 (Startup)</option>
                    <option value="10-50">11 - 50 (Small Business)</option>
                    <option value="51-200">51 - 200 (Medium Business)</option>
                    <option value="201-500">201 - 500 (Mid-Market)</option>
                    <option value="500+">500+ (Enterprise)</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-blue-50/70 dark:bg-blue-950/40 rounded-xl border border-blue-100 dark:border-blue-900/50 flex items-start gap-2.5 text-xs text-blue-800 dark:text-blue-300">
                <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span>
                  Includes <strong>AI HR & Payroll Assistant</strong>, unlimited employee records, automated payroll simulator, and mobile ESS preview.
                </span>
              </div>

              <button
                id="submit-get-started-btn"
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 text-sm"
              >
                Launch NextSofthr Workspace
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="p-8 text-center space-y-4 animate-fadeIn">
            <div className="w-16 h-16 bg-lime-100 dark:bg-lime-950/80 text-lime-700 dark:text-lime-400 rounded-full flex items-center justify-center mx-auto ring-8 ring-lime-50 dark:ring-lime-900/30">
              <CheckCircle className="w-10 h-10 text-lime-600 dark:text-lime-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Your Workspace is Live!</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm max-w-sm mx-auto">
              Welcome aboard, <strong>{form.name || 'Team Leader'}</strong>! We provisioned your demo instance at <strong>{form.company ? form.company.toLowerCase().replace(/\s+/g, '-') : 'company'}.nextsofthr.com</strong>.
            </p>
            <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl text-left text-xs space-y-2 border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between text-slate-700 dark:text-slate-300">
                <span className="text-slate-400 dark:text-slate-500">Plan:</span>
                <span className="font-semibold text-blue-700 dark:text-blue-400">14-Day Enterprise Growth Trial</span>
              </div>
              <div className="flex justify-between text-slate-700 dark:text-slate-300">
                <span className="text-slate-400 dark:text-slate-500">Admin Email:</span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">{form.email || 'admin@nextsofthr.com'}</span>
              </div>
              <div className="flex justify-between text-slate-700 dark:text-slate-300">
                <span className="text-slate-400 dark:text-slate-500">AI Assistant:</span>
                <span className="font-semibold text-lime-700 dark:text-lime-400">Activated (Unlimited)</span>
              </div>
            </div>
            <button
              id="close-get-started-success"
              onClick={handleClose}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition-colors shadow-md"
            >
              Explore NextSofthr Platform
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
