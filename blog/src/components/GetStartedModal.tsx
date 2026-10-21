import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, Lock } from 'lucide-react';
import { NextSoftHrLogo } from './NextSoftHrLogo';

interface GetStartedModalProps {
  onClose: () => void;
}

export const GetStartedModal: React.FC<GetStartedModalProps> = ({ onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState<'starter' | 'growth' | 'enterprise'>('growth');
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    workEmail: '',
    companyName: '',
    country: 'Nigeria',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = '/signup';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0B1E36] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-[#1E3656] relative overflow-hidden transition-colors duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-[#122A4A] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-4">
          <NextSoftHrLogo size="md" variant="auto" />
        </div>

        {isSuccess ? (
          <div className="text-center py-6 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-[#8EE000]/30 text-slate-950 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-[#0A3F7E] dark:text-[#8EE000]" />
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-heading">
              Welcome to NextSoftHr!
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Your 14-day full access workspace for <span className="font-semibold text-slate-900 dark:text-white">{formData.companyName}</span> has been initialized. Activation instructions have been dispatched to <span className="font-semibold text-slate-900 dark:text-white">{formData.workEmail}</span>.
            </p>

            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-[#8EE000] hover:bg-[#9EF01A] transition-all border border-[#7BC500]"
            >
              Continue to Dashboard
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white font-heading">
                Start Your 14-Day Free Trial
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                No credit card required. Full access to automated payroll, attendance, and employee self-service.
              </p>
            </div>

            {/* Plan Tier Selector */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              {[
                { id: 'starter', name: 'Starter', desc: '1 - 20 Staff' },
                { id: 'growth', name: 'Growth', desc: '20 - 150 Staff' },
                { id: 'enterprise', name: 'Enterprise', desc: '150+ Staff' },
              ].map((p) => {
                const isSelected = selectedPlan === p.id;
                return (
                  <button
                    type="button"
                    key={p.id}
                    onClick={() => setSelectedPlan(p.id as any)}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'bg-[#0A3F7E] dark:bg-[#2563EB] text-white border-[#0A3F7E] dark:border-[#2563EB] shadow-sm'
                        : 'bg-slate-50 dark:bg-[#07192F] border-slate-200 dark:border-[#1E3656] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#0E2442]'
                    }`}
                  >
                    <div className="text-xs font-bold">{p.name}</div>
                    <div className={`text-[10px] ${isSelected ? 'text-slate-200' : 'text-slate-400'}`}>
                      {p.desc}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Work Email Address
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
                  Company / Organization Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="e.g. Zenith Logistics"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-[#1E3656] bg-white dark:bg-[#07192F] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0A3F7E] dark:focus:ring-[#8EE000]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Primary Country / Tax Jurisdiction
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-[#1E3656] bg-white dark:bg-[#07192F] text-slate-900 dark:text-white"
                >
                  <option value="Nigeria">Nigeria (PAYE, NHF, NSITF, Pension)</option>
                  <option value="Ghana">Ghana (GRA, SSNIT, Tier 1/2/3)</option>
                  <option value="Kenya">Kenya (KRA, NSSF, NHIF)</option>
                  <option value="South Africa">South Africa (SARS, UIF, SDL)</option>
                  <option value="United Kingdom">United Kingdom (HMRC PAYE, NI)</option>
                  <option value="United States">United States (Federal & State W-2)</option>
                  <option value="Global">Other Global Jurisdiction</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl text-xs font-bold text-slate-950 bg-[#8EE000] hover:bg-[#9EF01A] transition-all flex items-center justify-center gap-2 shadow-md border border-[#7BC500]"
              >
                <span>Create Organization Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 pt-1">
              <Lock className="w-3 h-3 text-[#8EE000]" />
              <span>Enterprise SOC2 & NDPR compliant data encryption</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
