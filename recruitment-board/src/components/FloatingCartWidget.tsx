import React, { useState } from 'react';
import {
  ShoppingCart,
  ArrowRight,
  Sparkles,
  Check,
  Plus,
  Trash2,
  X,
  ChevronUp,
  ChevronDown,
  Layers,
  Percent,
  Calendar,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';
import { AddOnItem, BillingCycle, CurrencyCode } from '../types';
import { PRICING_PLANS } from '../data/pricingData';
import { useCurrency } from '../context/CurrencyContext';

interface FloatingCartWidgetProps {
  selectedPlanId: string;
  selectedAddOns: AddOnItem[];
  billingCycle: BillingCycle;
  onOpenCheckout: () => void;
  onClearCart?: () => void;
  onRemoveAddOn?: (id: string) => void;
  onChangeBillingCycle?: (cycle: BillingCycle) => void;
}

export const FloatingCartWidget: React.FC<FloatingCartWidgetProps> = ({
  selectedPlanId,
  selectedAddOns,
  billingCycle,
  onOpenCheckout,
  onClearCart,
  onRemoveAddOn,
  onChangeBillingCycle,
}) => {
  const { selectedCurrency, currencyConfig } = useCurrency();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [clearConfirming, setClearConfirming] = useState<boolean>(false);

  const plan = PRICING_PLANS.find((p) => p.id === selectedPlanId) || PRICING_PLANS[1];

  // Duration multiplier: 1 for monthly, 12 for yearly
  const multiplier = billingCycle === 'yearly' ? 12 : 1;

  // Base monthly rate undiscounted
  const baseMonthlyPlanUSD = plan.monthlyPrice;
  const baseMonthlyAddOnsUSD = selectedAddOns.reduce((sum, item) => sum + item.monthlyPrice, 0);
  const baseMonthlyTotalUSD = baseMonthlyPlanUSD + baseMonthlyAddOnsUSD;

  // Discounted monthly rate (yearly plan pricing includes ~20% discount)
  const discountedMonthlyPlanUSD = plan.yearlyPrice;
  const discountedMonthlyAddOnsUSD = selectedAddOns.reduce((sum, item) => sum + item.yearlyPrice, 0);
  const discountedMonthlyTotalUSD = discountedMonthlyPlanUSD + discountedMonthlyAddOnsUSD;

  // Subtotal before tax based on selected cycle and multiplier
  // For monthly: 1 month @ monthly rate
  // For yearly: 12 months @ discounted annual rate
  const undiscountedSubtotalUSD = baseMonthlyTotalUSD * multiplier;
  const discountedSubtotalUSD = (billingCycle === 'yearly' ? discountedMonthlyTotalUSD : baseMonthlyTotalUSD) * multiplier;
  
  // 20% annual discount saved
  const annualSavingsUSD = billingCycle === 'yearly' ? Math.max(0, undiscountedSubtotalUSD - discountedSubtotalUSD) : 0;
  const savingsPercent = 20;

  // 7.5% Statutory Exclusive VAT
  const vatRate = 0.075;
  const vatAmountUSD = discountedSubtotalUSD * vatRate;

  // Total Billed Today
  const totalDueTodayUSD = discountedSubtotalUSD + vatAmountUSD;

  // EXACT price customer is paying per month (inclusive of 20% discount & 7.5% VAT)
  const exactPricePerMonthUSD = (discountedSubtotalUSD / multiplier) * (1 + vatRate);

  // EXACT price customer is paying per year (inclusive of 20% discount & 7.5% VAT)
  const exactPricePerYearUSD = exactPricePerMonthUSD * 12;

  const handleClear = () => {
    if (onClearCart) {
      onClearCart();
      setIsExpanded(false);
      setClearConfirming(false);
    }
  };

  const handleCycleChange = (cycle: BillingCycle) => {
    if (onChangeBillingCycle) {
      onChangeBillingCycle(cycle);
    }
  };

  return (
    <aside
      id="floating-cart-bar"
      aria-label="Subscription Shopping Cart"
      className="fixed bottom-20 sm:bottom-6 right-3 sm:right-6 z-40 max-w-sm sm:max-w-md w-full animate-in slide-in-from-bottom-4 duration-300 pointer-events-auto font-sans"
    >
      {/* Expanded Cart Details Drawer Modal */}
      {isExpanded && (
        <div
          id="floating-cart-drawer"
          className="mb-3 rounded-2xl bg-white dark:bg-[#0B132B] text-slate-900 dark:text-white border-2 border-[#A3E635] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        >
          {/* Drawer Header */}
          <div className="p-3.5 sm:p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#A3E635] text-slate-950 flex items-center justify-center font-bold text-sm shadow-xs">
                <ShoppingCart className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <span>Subscription Cart</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#A3E635] text-slate-950 font-extrabold">
                    {selectedAddOns.length + 1} item{selectedAddOns.length > 0 ? 's' : ''}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Multiplier: Qty {multiplier} ({billingCycle === 'yearly' ? '12 Months' : '1 Month'})
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Minimize Cart"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-4 space-y-4 max-h-[75vh] overflow-y-auto">
            {/* Quantity Multiplier Toggle: 1 for Monthly, 12 for Yearly */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#111C38] border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#0265DC] dark:text-blue-400" />
                  <span>Duration &amp; Quantity Multiplier</span>
                </span>
                <span className="text-[11px] font-mono font-bold text-[#0265DC] dark:text-[#A3E635]">
                  Qty: {multiplier} × Month{multiplier > 1 ? 's' : ''}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  id="cart-cycle-monthly-btn"
                  onClick={() => handleCycleChange('monthly')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold flex flex-col items-center justify-center transition-all ${
                    billingCycle === 'monthly'
                      ? 'bg-[#0265DC] text-white shadow-md ring-2 ring-blue-500/30'
                      : 'bg-white dark:bg-[#070D1E] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <span>Monthly</span>
                    <span className="text-[10px] px-1 py-0.2 rounded bg-white/20 font-mono">
                      Qty: 1
                    </span>
                  </span>
                  <span className="text-[10px] opacity-80 font-normal">
                    1 Month Multiplier (×1)
                  </span>
                </button>

                <button
                  type="button"
                  id="cart-cycle-yearly-btn"
                  onClick={() => handleCycleChange('yearly')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold flex flex-col items-center justify-center transition-all ${
                    billingCycle === 'yearly'
                      ? 'bg-[#A3E635] text-slate-950 shadow-md ring-2 ring-lime-500/30'
                      : 'bg-white dark:bg-[#070D1E] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <span>Yearly</span>
                    <span className="text-[10px] px-1 py-0.2 rounded bg-slate-900 text-[#A3E635] font-mono">
                      Qty: 12
                    </span>
                  </span>
                  <span className="text-[10px] text-emerald-700 dark:text-lime-300 font-semibold">
                    12 Months (20% Discount)
                  </span>
                </button>
              </div>
            </div>

            {/* Selected Items List */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <span>Selected Items in Cart ({selectedAddOns.length + 1})</span>
                {/* Clear Cart Button */}
                {selectedAddOns.length > 0 && onClearCart && (
                  <div>
                    {!clearConfirming ? (
                      <button
                        type="button"
                        id="cart-clear-all-trigger-btn"
                        onClick={() => setClearConfirming(true)}
                        className="text-rose-600 dark:text-rose-400 hover:text-rose-700 hover:underline flex items-center gap-1 text-[11px] font-semibold transition-colors"
                        title="Clear all selected modules from cart"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Clear Cart</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-1.5 animate-in fade-in">
                        <span className="text-[10px] text-rose-500 font-bold">Clear all?</span>
                        <button
                          type="button"
                          id="cart-clear-confirm-btn"
                          onClick={handleClear}
                          className="px-2 py-0.5 rounded bg-rose-600 text-white text-[10px] font-bold hover:bg-rose-700"
                        >
                          Yes, Clear
                        </button>
                        <button
                          type="button"
                          onClick={() => setClearConfirming(false)}
                          className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-[10px]"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Base Plan Item */}
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#111C38] border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                <div className="min-w-0 pr-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-900 dark:text-white">
                      {plan.name} Plan
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-blue-100 text-[#0265DC] dark:bg-blue-950 dark:text-blue-300 font-bold">
                      Qty: {multiplier} mo
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">
                    {plan.employeeAllowanceText}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-mono font-bold text-slate-900 dark:text-white">
                    {currencyConfig.format(
                      (billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice) * multiplier
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {currencyConfig.format(billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice)}/mo
                  </div>
                </div>
              </div>

              {/* Selected Add-on Modules */}
              {selectedAddOns.length > 0 ? (
                <div className="space-y-1.5">
                  {selectedAddOns.map((addon) => {
                    const pricePerMo = billingCycle === 'yearly' ? addon.yearlyPrice : addon.monthlyPrice;
                    const priceTotal = pricePerMo * multiplier;
                    return (
                      <div
                        key={addon.id}
                        className="p-2.5 rounded-xl bg-lime-50/60 dark:bg-lime-950/20 border border-lime-300/60 dark:border-lime-900/60 flex items-center justify-between text-xs"
                      >
                        <div className="min-w-0 pr-2">
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-slate-900 dark:text-white truncate">
                              {addon.name}
                            </span>
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 shrink-0 font-bold">
                              Qty: {multiplier} mo
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                            {addon.unitText}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <div className="text-right">
                            <div className="font-mono font-bold text-slate-900 dark:text-white">
                              +{currencyConfig.format(priceTotal)}
                            </div>
                            <div className="text-[10px] text-slate-400">
                              {currencyConfig.format(pricePerMo)}/mo
                            </div>
                          </div>
                          {onRemoveAddOn && (
                            <button
                              type="button"
                              onClick={() => onRemoveAddOn(addon.id)}
                              className="p-1 rounded text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors"
                              title={`Remove ${addon.name} from cart`}
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-3 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-center text-xs text-slate-500">
                  No extra extension modules added yet. Select modules from the catalog to bundle.
                </div>
              )}
            </div>

            {/* Calculations Breakdown (Undiscounted, Multiplier, 20% Discount, 7.5% VAT) */}
            <div className="p-3 rounded-xl bg-slate-900 text-white space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>Gross Base ({multiplier} month{multiplier > 1 ? 's' : ''}):</span>
                <span className="font-mono">{currencyConfig.format(undiscountedSubtotalUSD)}</span>
              </div>

              {billingCycle === 'yearly' && (
                <div className="flex items-center justify-between text-[#A3E635] font-semibold">
                  <span className="flex items-center gap-1">
                    <Percent className="w-3.5 h-3.5" />
                    <span>20% Annual Discount Savings:</span>
                  </span>
                  <span className="font-mono">-{currencyConfig.format(annualSavingsUSD)}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-slate-300">
                <span>Net Taxable Subtotal:</span>
                <span className="font-mono font-bold">{currencyConfig.format(discountedSubtotalUSD)}</span>
              </div>

              {/* 7.5% Exclusive Statutory VAT */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200">
                <div>
                  <div className="font-bold text-white flex items-center gap-1">
                    <span>VAT (7.5% Exclusive)</span>
                    <span className="text-[10px] text-slate-400">Statutory</span>
                  </div>
                  <div className="text-[10px] text-slate-400">
                    7.5% applicable tax
                  </div>
                </div>
                <div className="font-mono font-bold text-white">
                  +{currencyConfig.format(vatAmountUSD)}
                </div>
              </div>

              {/* Exact Prices Highlight Box (Per Month & Per Year inclusive of 20% discount & VAT) */}
              <div className="mt-3 pt-3 border-t border-slate-800 space-y-2">
                <div className="p-2.5 rounded-xl bg-gradient-to-r from-blue-950/80 to-slate-900 border border-blue-500/40 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-blue-300 flex items-center gap-1">
                      <span>Exact Price Per Month:</span>
                    </span>
                    <span className="text-sm font-extrabold font-mono text-[#A3E635]">
                      {currencyConfig.format(exactPricePerMonthUSD)}
                      <span className="text-[10px] font-sans text-slate-300">/mo</span>
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400">
                    * Inclusive of {billingCycle === 'yearly' ? '20% annual discount and ' : ''}7.5% exclusive VAT
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-950/80 to-slate-900 border border-emerald-500/40 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-emerald-300 flex items-center gap-1">
                      <span>Exact Price Per Year:</span>
                    </span>
                    <span className="text-sm font-extrabold font-mono text-[#A3E635]">
                      {currencyConfig.format(exactPricePerYearUSD)}
                      <span className="text-[10px] font-sans text-slate-300">/yr</span>
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400">
                    * 12-month total inclusive of 20% discount and 7.5% exclusive VAT
                  </div>
                </div>
              </div>

              {/* Total Due Today */}
              <div className="pt-2 border-t border-slate-800 flex items-baseline justify-between">
                <div>
                  <span className="text-xs font-bold text-white">Total Billed Today:</span>
                  <div className="text-[10px] text-slate-400">
                    Qty {multiplier} month{multiplier > 1 ? 's' : ''} subscription
                  </div>
                </div>
                <span className="text-lg font-extrabold font-mono text-[#A3E635]">
                  {currencyConfig.format(totalDueTodayUSD)}
                </span>
              </div>
            </div>

            {/* Clear Cart Actions section */}
            {selectedAddOns.length > 0 && onClearCart && (
              <div className="pt-1 flex items-center justify-between text-xs">
                <button
                  type="button"
                  id="cart-drawer-clear-all-btn"
                  onClick={handleClear}
                  className="w-full py-2 px-3 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All {selectedAddOns.length} Selected Add-on Modules</span>
                </button>
              </div>
            )}

            {/* Proceed to Checkout Button */}
            <button
              type="button"
              id="cart-drawer-checkout-btn"
              onClick={onOpenCheckout}
              className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-slate-950 bg-[#A3E635] hover:bg-[#84CC16] shadow-lg shadow-lime-500/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <span>Proceed to Regional &amp; Global Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Bottom Bar (Compact View) */}
      <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-900/95 dark:bg-[#070D1E]/95 text-white backdrop-blur-md border-2 border-lime-400/60 shadow-2xl flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2.5 min-w-0 text-left hover:opacity-90 transition-opacity focus:outline-none"
          title="Click to view quantity multiplier and exact monthly/yearly pricing"
        >
          <div className="w-9 h-9 rounded-xl bg-[#A3E635] text-slate-950 flex items-center justify-center font-bold text-sm shrink-0 shadow-xs relative">
            <ShoppingCart className="w-4 h-4" />
            {selectedAddOns.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-rose-500 text-white font-extrabold text-[9px] flex items-center justify-center ring-2 ring-slate-900">
                {selectedAddOns.length}
              </span>
            )}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-xs font-bold truncate">
              <span className="text-white">{plan.name}</span>
              <span className="text-[10px] font-mono text-[#A3E635] bg-slate-800 px-1.5 py-0.2 rounded border border-lime-500/30">
                Qty: {multiplier} mo
              </span>
              {selectedAddOns.length > 0 && (
                <span className="text-[10px] text-lime-400 bg-lime-950/80 px-1.5 py-0.2 rounded-full border border-lime-500/30 truncate">
                  +{selectedAddOns.length} module{selectedAddOns.length > 1 ? 's' : ''}
                </span>
              )}
            </div>
            <div className="text-[11px] text-slate-300 font-mono flex items-center gap-1.5 flex-wrap">
              <span className="text-[#A3E635] font-bold">
                {currencyConfig.format(exactPricePerMonthUSD)}/mo
              </span>
              <span className="text-[9px] text-slate-400 font-sans">
                ({currencyConfig.format(totalDueTodayUSD)} billed {billingCycle})
              </span>
            </div>
          </div>
        </button>

        <div className="flex items-center gap-1.5 shrink-0">
          {/* Quick Clear Button */}
          {selectedAddOns.length > 0 && onClearCart && (
            <button
              type="button"
              id="floating-cart-quick-clear-btn"
              onClick={handleClear}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
              title="Clear all cart add-ons"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}

          {/* Toggle Expand Details */}
          <button
            type="button"
            id="floating-cart-toggle-expand-btn"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors text-xs font-semibold flex items-center gap-0.5"
            title="Expand Cart Breakdown"
          >
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>

          {/* Checkout CTA */}
          <button
            id="floating-cart-checkout-btn"
            onClick={onOpenCheckout}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-[#A3E635] hover:bg-[#84CC16] shadow-sm flex items-center gap-1.5 shrink-0 transition-transform active:scale-95"
          >
            <span>Checkout</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
