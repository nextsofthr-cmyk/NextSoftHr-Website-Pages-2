import { useState, type FormEvent } from 'react';
import { X, CheckCircle, Headphones, Briefcase, Phone, Mail, User, Building2, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ExpertModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'general' | 'outsourcing';
}

export const ExpertModal = ({ isOpen, onClose, defaultMode = 'general' }: ExpertModalProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [mode, setMode] = useState<'general' | 'outsourcing'>(defaultMode);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    headcount: '50-200',
    notes: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    try {
      confetti({ particleCount: 70, spread: 60 });
    } catch {}
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div id="expert-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 max-w-lg w-full overflow-hidden relative transition-colors">
        <button
          id="close-expert-modal"
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 text-xs font-bold rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 flex items-center gap-1.5">
                <Headphones className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400" />
                Senior HR & Payroll Specialists
              </span>
            </div>

            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {mode === 'outsourcing' ? 'Explore HR & Payroll Outsourcing' : 'Talk to an HR & Payroll Expert'}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 mb-5">
              Discuss your workforce challenges, multi-country compliance, or evaluate fully managed payroll with our advisory team.
            </p>

            <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 mb-5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setMode('general')}
                className={`flex-1 py-2 rounded-lg transition-all ${
                  mode === 'general' 
                    ? 'bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-sm font-bold' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Software & Advisory
              </button>
              <button
                type="button"
                onClick={() => setMode('outsourcing')}
                className={`flex-1 py-2 rounded-lg transition-all ${
                  mode === 'outsourcing' 
                    ? 'bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-sm font-bold' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Fully Managed Outsourcing
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Your Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      required
                      type="text"
                      placeholder="e.g. Marcus Sterling"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                      placeholder="marcus@enterprise.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      placeholder="+1 (555) 019-2834"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Company & Headcount</label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      required
                      type="text"
                      placeholder="Acme Corp (~120 people)"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">How can our specialists assist you?</label>
                <textarea
                  rows={2}
                  placeholder="e.g. We are expanding to 3 countries and need compliant payroll processing and leave management..."
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="w-full p-2.5 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                />
              </div>

              <button
                id="submit-expert-consult-btn"
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 text-sm"
              >
                <Send className="w-4 h-4 text-lime-400" />
                Request Expert Consultation
              </button>

              <div className="text-center text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2">
                <Briefcase className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400" />
                <span>Direct access to certified HR consultants & payroll managers</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="p-8 text-center space-y-4 animate-fadeIn">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto ring-8 ring-blue-50 dark:ring-blue-900/30">
              <CheckCircle className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Consultation Confirmed</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm max-w-sm mx-auto">
              Thank you, <strong>{form.name || 'Friend'}</strong>. A dedicated NextSofthr HR & Payroll Solutions Director will reach out to <strong>{form.email || 'your email'}</strong> within 2 business hours.
            </p>
            <button
              onClick={handleClose}
              className="w-full bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-semibold py-2.5 px-4 rounded-xl text-sm"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
