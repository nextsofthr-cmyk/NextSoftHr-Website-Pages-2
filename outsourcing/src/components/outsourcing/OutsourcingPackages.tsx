import React from 'react';
import { Check, ArrowRight, ShieldCheck, Sparkles, Building2, CreditCard, Users, Briefcase } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import { OutsourcingPricingTable } from './OutsourcingPricingTable';

interface OutsourcingPackagesProps {
  onOpenLeadModal: (service?: string) => void;
  onOpenWizard: () => void;
}

export const OutsourcingPackages: React.FC<OutsourcingPackagesProps> = ({ 
  onOpenLeadModal,
  onOpenWizard
}) => {
  const { formatCurrency, currency } = useCurrency();

  const handleSelectTablePlan = (planName: string, billingCycle: 'Monthly' | 'Yearly', estimatedEmployees?: number) => {
    const empText = estimatedEmployees && estimatedEmployees > 1 ? ` for ${estimatedEmployees} employees` : '';
    onOpenLeadModal(`Outsourcing Plan: ${planName} (${billingCycle}${empText})`);
  };

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
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-lime-400 to-[#9AE616] hover:from-lime-300 hover:to-lime-400 text-slate-950 font-bold text-base rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Build My Outsourcing Package</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>
      </section>

      {/* Main Pricing Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <OutsourcingPricingTable
          onSelectPlan={handleSelectTablePlan}
          onOpenDemo={onOpenWizard}
        />
      </section>
    </div>
  );
};
