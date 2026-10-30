import React, { useState } from 'react';
import { Plus, Check, Sparkles, Layers, ArrowRight, ChevronDown } from 'lucide-react';
import { ADD_ONS, CURRENCIES } from '../data/pricingData';
import { BillingCycle, CurrencyCode, AddOnItem } from '../types';

const INITIAL_VISIBLE_ADDONS = 6;

interface AddOnsSectionProps {
  billingCycle: BillingCycle;
  selectedCurrency: CurrencyCode;
  onOpenBundleCheckout: (selectedAddOns: AddOnItem[], totalCost: number) => void;
}

export const AddOnsSection: React.FC<AddOnsSectionProps> = ({
  billingCycle,
  selectedCurrency,
  onOpenBundleCheckout,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false);
  const visibleAddOns = showAll ? ADD_ONS : ADD_ONS.slice(0, INITIAL_VISIBLE_ADDONS);
  const hasMore = ADD_ONS.length > INITIAL_VISIBLE_ADDONS;
  const currencyConfig = CURRENCIES[selectedCurrency] || CURRENCIES.USD;

  const toggleAddOn = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Calculate total of selected add-ons
  const selectedItems = ADD_ONS.filter((a) => selectedIds.includes(a.id));
  const totalUSD = selectedItems.reduce((acc, cur) => {
    return acc + (cur.isOneTime ? cur.monthlyPrice : billingCycle === 'yearly' ? cur.yearlyPrice : cur.monthlyPrice);
  }, 0);
  const totalNGN = selectedItems.reduce((acc, cur) => {
    return acc + (cur.fixedPriceNGN ?? (cur.isOneTime ? cur.monthlyPrice * 1550 : billingCycle === 'yearly' ? cur.yearlyPrice * 1550 : cur.monthlyPrice * 1550));
  }, 0);
  const formattedTotal = selectedCurrency === 'NGN' ? `₦${totalNGN.toLocaleString()}` : currencyConfig.format(totalUSD);

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
                  {selectedIds.length} Module{selectedIds.length > 1 ? 's' : ''} Selected
                </div>
                <div className="text-xs text-slate-300">
                  Total extra investment:{' '}
                  <span className="text-[#A3E635] font-bold font-mono">
                    {formattedTotal}
                  </span>
                  {billingCycle === 'yearly' && selectedCurrency !== 'NGN' ? ' (calculated total)' : ''}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedIds([])}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                Clear all
              </button>
              <button
                id="addons-checkout-btn"
                onClick={() => onOpenBundleCheckout(selectedItems, totalUSD)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-[#A3E635] hover:bg-[#84CC16] flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>Add to My Plan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Add-Ons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleAddOns.map((addon) => {
            const isSelected = selectedIds.includes(addon.id);
            const isOneTime = addon.isOneTime || addon.unitText === 'One Time';
            const priceUSD = isOneTime
              ? addon.monthlyPrice
              : billingCycle === 'yearly'
              ? addon.yearlyPrice
              : addon.monthlyPrice;
            const displayPrice =
              selectedCurrency === 'NGN' && addon.fixedPriceNGN
                ? `₦${addon.fixedPriceNGN.toLocaleString()}`
                : currencyConfig.format(priceUSD);

            return (
              <div
                key={addon.id}
                id={`addon-card-${addon.id}`}
                className={`p-6 rounded-2xl border transition-all duration-200 flex flex-col justify-between h-full ${
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
                      className={`p-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                        isSelected
                          ? 'bg-[#0265DC] text-white'
                          : 'bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-[#A3E635] hover:text-slate-950'
                      }`}
                      title={isSelected ? 'Remove Module' : 'Add Module'}
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
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-display text-lg font-bold text-slate-900 dark:text-white">{displayPrice}</span>
                      {isOneTime ? (
                        <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/70 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/60">
                          One Time
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">
                          / {addon.unitText}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => toggleAddOn(addon.id)}
                    className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                      isSelected
                        ? 'text-[#0265DC] dark:text-blue-300 font-bold bg-blue-100/70 dark:bg-blue-950/80'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {isSelected ? 'Selected' : '+ Add'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More / Show Less */}
        {hasMore && (
          <div className="mt-10 flex justify-center">
            <button
              id="addons-load-more-btn"
              type="button"
              onClick={() => setShowAll((v) => !v)}
              aria-expanded={showAll}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-[#0265DC] hover:bg-[#0153B5] shadow-md shadow-blue-600/20 transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <span>{showAll ? 'Show Fewer Modules' : `View All ${ADD_ONS.length} Modules`}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showAll ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
