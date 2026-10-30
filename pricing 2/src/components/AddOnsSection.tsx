import React, { useState } from 'react';
import { Plus, Check, Sparkles, Layers, ArrowRight } from 'lucide-react';
import { ADD_ONS, CURRENCIES } from '../data/pricingData';
import { BillingCycle, CurrencyCode, AddOnItem } from '../types';

interface AddOnsSectionProps {
  billingCycle: BillingCycle;
  selectedCurrency: CurrencyCode;
  selectedAddOnIds?: string[];
  onToggleAddOn?: (id: string) => void;
  onOpenBundleCheckout: (selectedAddOns: AddOnItem[], totalCost: number) => void;
}

export const AddOnsSection: React.FC<AddOnsSectionProps> = ({
  billingCycle,
  selectedCurrency,
  selectedAddOnIds: propSelectedIds,
  onToggleAddOn: propToggleAddOn,
  onOpenBundleCheckout,
}) => {
  const [localSelectedIds, setLocalSelectedIds] = useState<string[]>([]);
  const selectedIds = propSelectedIds !== undefined ? propSelectedIds : localSelectedIds;
  const currencyConfig = CURRENCIES[selectedCurrency] || CURRENCIES['NGN'];

  const toggleAddOn = (id: string) => {
    if (propToggleAddOn) {
      propToggleAddOn(id);
    } else {
      setLocalSelectedIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    }
  };

  const handleClearAll = () => {
    if (propToggleAddOn && propSelectedIds) {
      propSelectedIds.forEach((id) => propToggleAddOn(id));
    } else {
      setLocalSelectedIds([]);
    }
  };

  // Calculate total of selected add-ons
  const selectedItems = ADD_ONS.filter((a) => selectedIds.includes(a.id));
  const totalUSD = selectedItems.reduce((acc, cur) => {
    return acc + (billingCycle === 'yearly' ? cur.yearlyPrice : cur.monthlyPrice);
  }, 0);

  return (
    <section id="addons" className="py-20 bg-white dark:bg-[#0B132B] border-t border-slate-100 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#0265DC] dark:text-blue-300 text-xs font-bold mb-3 border border-blue-200/50 dark:border-blue-800/60">
            <Layers className="w-3.5 h-3.5" />
            <span>Modular Customization</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B132B] dark:text-white tracking-tight">
            Extend Your NextSofthr Platform
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Activate targeted modules as your requirements expand. Add specialized capabilities
            without moving to an entirely higher plan tier.
          </p>
        </div>

        {/* Dynamic Add-Ons Live Selection Bar (if any selected) */}
        {selectedIds.length > 0 && (
          <div className="mb-8 p-4 bg-slate-900 dark:bg-[#111C38] border border-transparent dark:border-slate-700 text-white rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-[#A3E635] text-slate-950 flex items-center justify-center font-bold text-sm">
                {selectedIds.length}
              </span>
              <div>
                <div className="text-sm font-bold">
                  {selectedIds.length} Add-on{selectedIds.length > 1 ? 's' : ''} Selected
                </div>
                <div className="text-xs text-slate-300">
                  Total extra investment:{' '}
                  <span className="text-[#A3E635] font-bold font-mono">
                    {currencyConfig.format(totalUSD)}
                  </span>
                  /mo {billingCycle === 'yearly' ? '(annual billing)' : ''}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleClearAll}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
              >
                Clear all
              </button>
              <button
                id="addons-checkout-btn"
                onClick={() => onOpenBundleCheckout(selectedItems, totalUSD)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-[#A3E635] hover:bg-[#84CC16] flex items-center gap-1.5 shadow-sm"
              >
                <span>Subscribe &amp; Checkout with Add-ons</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Add-Ons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ADD_ONS.map((addon) => {
            const isSelected = selectedIds.includes(addon.id);
            const priceUSD = billingCycle === 'yearly' ? addon.yearlyPrice : addon.monthlyPrice;
            const displayPrice = currencyConfig.format(priceUSD);

            return (
              <div
                key={addon.id}
                id={`addon-card-${addon.id}`}
                className={`p-6 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-blue-50/40 dark:bg-blue-950/30 border-[#0265DC] dark:border-blue-500 shadow-md ring-2 ring-blue-500/20'
                    : 'bg-[#F8FAFC] dark:bg-[#111C38] border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-[#162447] hover:shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-base font-bold text-slate-900 dark:text-white leading-snug">
                      {addon.name}
                    </h3>
                    <button
                      id={`toggle-addon-${addon.id}`}
                      onClick={() => toggleAddOn(addon.id)}
                      className={`p-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                        isSelected
                          ? 'bg-[#0265DC] text-white'
                          : 'bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-[#A3E635] hover:text-slate-950'
                      }`}
                      title={isSelected ? 'Remove Add-On' : 'Add to Plan'}
                    >
                      {isSelected ? <Check className="w-4 h-4 stroke-[3]" /> : <Plus className="w-4 h-4" />}
                    </button>
                  </div>

                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed min-h-[36px]">
                    {addon.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="font-display text-lg font-bold text-slate-900 dark:text-white">{displayPrice}</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 ml-1">/ {addon.unitText}</span>
                  </div>

                  <button
                    onClick={() => toggleAddOn(addon.id)}
                    className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors ${
                      isSelected
                        ? 'text-[#0265DC] dark:text-blue-300 font-bold bg-blue-100/70 dark:bg-blue-950/80'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {isSelected ? '✓ In Cart' : '+ Add to Cart'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
