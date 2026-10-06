import React from 'react';
import { Check, ArrowRight, ShieldCheck, Sparkles, Building2, CreditCard, Users, Briefcase } from 'lucide-react';
import { SERVICE_PACKAGES } from '../../data/mockData';
import { useCurrency } from '../../context/CurrencyContext';

interface OutsourcingPackagesProps {
  onOpenLeadModal: (service?: string) => void;
  onOpenWizard: () => void;
}

export const OutsourcingPackages: React.FC<OutsourcingPackagesProps> = ({ 
  onOpenLeadModal,
  onOpenWizard
}) => {
  const { formatCurrency, currency } = useCurrency();

  return (
    <div className="space-y-16 pb-16">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0A1E4A] via-[#0F2D6B] to-[#0A1E4A] text-white pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-lime-400 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Configurable Outsourcing Solutions</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            “Flexible Outsourcing Packages <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 to-emerald-400">
              Built for Every Stage of Scale.”
            </span>
          </h1>

          <p className="text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Choose the operational model that matches your current priorities. Outsource payroll processing, employee administration, or your entire People department.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenWizard}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-lime-400 to-[#9AE616] hover:from-lime-300 hover:to-lime-400 text-slate-950 font-bold text-base rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <span>Build My Outsourcing Package</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>
      </section>

      {/* 5 Configurable Packages Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-12">
          <span className="text-xs font-bold text-blue-700 dark:text-lime-400 uppercase tracking-wider">Modular Delivery</span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Select Your Outsourcing Model
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            From focused payroll processing to comprehensive Managed HR with dedicated HRBPs. Prices dynamically converted to {currency.code} ({currency.symbol}).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICE_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative bg-white dark:bg-[#0B1A3D] rounded-2xl p-7 border transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl dark:shadow-blue-950/40 ${
                pkg.highlight
                  ? 'border-2 border-lime-500 shadow-lg ring-4 ring-lime-500/10'
                  : 'border-slate-200 dark:border-blue-900/50 hover:border-blue-300 dark:hover:border-lime-400'
              }`}
            >
              {pkg.badge && (
                <div className="absolute -top-3 right-6 bg-lime-400 text-slate-950 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                  {pkg.badge}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{pkg.name}</h3>
                  <p className="text-xs text-blue-700 dark:text-lime-400 font-medium mt-0.5">{pkg.tagline}</p>
                </div>

                {pkg.startingPriceNGN && (
                  <div className="p-3 bg-slate-50 dark:bg-[#06112C] rounded-xl border border-slate-100 dark:border-blue-900/40 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Estimated Base</span>
                      <span className="text-lg font-black text-slate-900 dark:text-lime-300 font-mono">
                        {formatCurrency(pkg.startingPriceNGN)}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-normal"> / month</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border dark:border-blue-800/40 px-2 py-0.5 rounded-full">
                      {currency.code}
                    </span>
                  </div>
                )}

                <div className="p-3 bg-slate-50/70 dark:bg-[#071433] rounded-xl text-xs text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-blue-900/30">
                  <span className="font-semibold text-slate-900 dark:text-white">Best for: </span>
                  {pkg.target}
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-blue-900/40 space-y-2.5">
                  <span className="text-[11px] font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider">Key Inclusions:</span>
                  <div className="space-y-2">
                    {pkg.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                        <div className="w-4 h-4 rounded-full bg-lime-100 dark:bg-lime-950/80 text-lime-700 dark:text-lime-400 flex items-center justify-center shrink-0 mt-0.5 border dark:border-lime-900/50">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-blue-900/40">
                <button
                  onClick={() => onOpenLeadModal(`Package: ${pkg.name}`)}
                  className={`w-full py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
                    pkg.highlight
                      ? 'bg-lime-400 hover:bg-lime-300 text-slate-950 shadow-md'
                      : 'bg-[#0F2D6B] dark:bg-blue-600 hover:bg-[#0A1E4A] dark:hover:bg-blue-700 text-white shadow-sm'
                  }`}
                >
                  <span>Select {pkg.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
