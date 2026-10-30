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
  Zap,
  CheckSquare,
  Square,
  Share2,
  Copy,
  Mail,
  MessageSquare,
  ExternalLink,
  FileText,
  Users,
  Link as LinkIcon,
} from 'lucide-react';
import { AddOnItem, BillingCycle, CurrencyCode } from '../types';
import { PRICING_PLANS, ADD_ONS } from '../data/pricingData';
import { useCurrency } from '../context/CurrencyContext';

import { useLanguage } from '../context/LanguageContext';
interface FloatingCartWidgetProps {
  selectedPlanId: string;
  selectedAddOns: AddOnItem[];
  allAddOns?: AddOnItem[];
  billingCycle: BillingCycle;
  onOpenCheckout: () => void;
  onClearCart?: () => void;
  onRemoveAddOn?: (id: string) => void;
  onChangeBillingCycle?: (cycle: BillingCycle) => void;
  onSelectAllAddOns?: (selectAll: boolean) => void;
  pppFactor?: number;
  pppRegionId?: string;
}

export const FloatingCartWidget: React.FC<FloatingCartWidgetProps> = ({
  selectedPlanId,
  selectedAddOns,
  allAddOns = ADD_ONS,
  billingCycle,
  onOpenCheckout,
  onClearCart,
  onRemoveAddOn,
  onChangeBillingCycle,
  onSelectAllAddOns,
  pppFactor = 1.0,
  pppRegionId,
}) => {
  const { tx } = useLanguage();
  const { selectedCurrency, currencyConfig } = useCurrency();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [clearConfirming, setClearConfirming] = useState<boolean>(false);

  // Share Cart states
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);
  const [shareToast, setShareToast] = useState<string | null>(null);
  const [shareTab, setShareTab] = useState<'link' | 'summary'>('link');

  const plan = PRICING_PLANS.find((p) => p.id === selectedPlanId) || PRICING_PLANS[1];

  const totalAvailableCount = allAddOns.length;
  const isAllSelected = totalAvailableCount > 0 && selectedAddOns.length >= totalAvailableCount;

  // Duration multiplier: 1 for monthly, 12 for yearly
  const multiplier = billingCycle === 'yearly' ? 12 : 1;

  // Base monthly rate undiscounted (with PPP factor if active)
  const baseMonthlyPlanUSD = Math.round(plan.monthlyPrice * pppFactor * 100) / 100;
  const baseMonthlyAddOnsUSD = selectedAddOns.reduce((sum, item) => sum + (Math.round(item.monthlyPrice * pppFactor * 100) / 100), 0);
  const baseMonthlyTotalUSD = baseMonthlyPlanUSD + baseMonthlyAddOnsUSD;

  // Discounted monthly rate (yearly plan pricing includes ~20% discount, with PPP factor if active)
  const discountedMonthlyPlanUSD = Math.round(plan.yearlyPrice * pppFactor * 100) / 100;
  const discountedMonthlyAddOnsUSD = selectedAddOns.reduce((sum, item) => sum + (Math.round(item.yearlyPrice * pppFactor * 100) / 100), 0);
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

  // Generate Unique Shareable URL with complete query parameters
  const generateShareUrl = () => {
    if (typeof window === 'undefined') return '';
    try {
      const url = new URL(window.location.origin + window.location.pathname);
      url.searchParams.set('plan', selectedPlanId);
      url.searchParams.set('cycle', billingCycle);
      url.searchParams.set('currency', selectedCurrency);
      if (selectedAddOns.length > 0) {
        url.searchParams.set('addons', selectedAddOns.map((a) => a.id).join(','));
      }
      if (pppRegionId && pppRegionId !== 'global') {
        url.searchParams.set('ppp', pppRegionId);
      }
      return url.toString();
    } catch (e) {
      return window.location.href;
    }
  };

  // Generate Formatted Team Proposal Summary String for Slack / Teams / Email
  const generateSummaryString = () => {
    const shareUrl = generateShareUrl();
    const durationText =
      billingCycle === 'yearly'
        ? 'Yearly Billing (Qty: 12-Month Multiplier • 20% Bundle Discount Included)'
        : 'Monthly Billing (Qty: 1-Month Multiplier)';

    const modulesText =
      selectedAddOns.length > 0
        ? selectedAddOns
            .map(
              (item, i) =>
                `  ${i + 1}. ${item.name} [${item.unitText}] — ${currencyConfig.format(
                  (billingCycle === 'yearly' ? item.yearlyPrice : item.monthlyPrice) * multiplier
                )} (${currencyConfig.format(billingCycle === 'yearly' ? item.yearlyPrice : item.monthlyPrice)}/mo)`
            )
            .join('\n')
        : '  (No additional extension modules selected; Base plan only)';

    return `================================================
NextSoftHR Subscription Configuration Proposal
================================================
Company & Plan Specification:
• Base Plan: ${plan.name} Plan
• Allowance: ${plan.employeeAllowanceText}
• Billing Cycle: ${durationText}
• Currency: ${currencyConfig.code} (${currencyConfig.symbol})

Bundled Extension Modules (${selectedAddOns.length} module${selectedAddOns.length === 1 ? '' : 's'}):
${modulesText}

Financial Summary (Exclusive of VAT):
• Gross Base Total: ${currencyConfig.format(undiscountedSubtotalUSD)}
${billingCycle === 'yearly' ? `• 20% Annual Bundle Savings: -${currencyConfig.format(annualSavingsUSD)}\n` : ''}• Taxable Subtotal: ${currencyConfig.format(discountedSubtotalUSD)}
• Statutory VAT (7.5% Exclusive): +${currencyConfig.format(vatAmountUSD)}
------------------------------------------------
• Total Billed Today: ${currencyConfig.format(totalDueTodayUSD)}
• Effective Monthly Rate: ${currencyConfig.format(exactPricePerMonthUSD)}/mo (incl. VAT)
• 12-Month Annual Total: ${currencyConfig.format(exactPricePerYearUSD)}/yr (incl. VAT)
================================================
Direct Team Link to Review or Checkout:
${shareUrl}
================================================`;
  };

  // Copy helper with fallbacks and visual toast
  const copyToClipboard = async (text: string, type: 'link' | 'summary') => {
    let success = false;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        success = true;
      }
    } catch (e) {
      success = false;
    }

    if (!success) {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        success = true;
      } catch (err) {
        console.error('Clipboard copy fallback failed', err);
      }
    }

    if (type === 'link') {
      setCopiedLink(true);
      setShareToast(tx("Unique shareable cart link copied to clipboard!"));
      setTimeout(() => setCopiedLink(false), 2500);
    } else {
      setCopiedSummary(true);
      setShareToast(tx("Proposal summary copied! Ready to paste into Slack or Email."));
      setTimeout(() => setCopiedSummary(false), 2500);
    }

    setTimeout(() => {
      setShareToast(null);
    }, 3500);
  };

  const handleShareEmail = () => {
    const subject = encodeURIComponent(`NextSoftHR Subscription Configuration Proposal: ${plan.name} Plan`);
    const body = encodeURIComponent(generateSummaryString());
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleShareWhatsApp = () => {
    const shareUrl = generateShareUrl();
    const text = encodeURIComponent(
      `Hello team, here is our proposed NextSoftHR subscription configuration:\n\n• Plan: ${plan.name} (${billingCycle})\n• Total Due: ${currencyConfig.format(totalDueTodayUSD)}\n\nReview & checkout here:\n${shareUrl}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <aside
      id="floating-cart-bar"
      aria-label={tx("Subscription Shopping Cart")}
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
                  <span>{tx("Subscription Cart")}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#A3E635] text-slate-950 font-extrabold">
                    {selectedAddOns.length + 1}{' '}{tx("item")}{selectedAddOns.length > 0 ? 's' : ''}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">{tx("Multiplier: Qty")}{' '}{multiplier} ({billingCycle === 'yearly' ? tx("12 Months") : tx("1 Month")})
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Share Cart Header Button */}
              <button
                type="button"
                id="cart-drawer-header-share-btn"
                onClick={() => setIsShareModalOpen(true)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700/80 cursor-pointer shadow-xs"
                title={tx("Share subscription configuration with team")}
              >
                <Share2 className="w-3.5 h-3.5 text-[#A3E635]" />
                <span className="hidden xs:inline">{tx("Share")}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title={tx("Minimize Cart")}
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
                  <span>{tx("Duration & Quantity Multiplier")}</span>
                </span>
                <span className="text-[11px] font-mono font-bold text-[#0265DC] dark:text-[#A3E635]">{tx("Qty:")}{' '}{multiplier}{' '}{tx("× Month")}{multiplier > 1 ? 's' : ''}
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
                    <span>{tx("Monthly")}</span>
                    <span className="text-[10px] px-1 py-0.2 rounded bg-white/20 font-mono">{tx("Qty: 1")}</span>
                  </span>
                  <span className="text-[10px] opacity-80 font-normal">{tx("1 Month Multiplier (×1)")}</span>
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
                    <span>{tx("Yearly")}</span>
                    <span className="text-[10px] px-1 py-0.2 rounded bg-slate-900 text-[#A3E635] font-mono">{tx("Qty: 12")}</span>
                  </span>
                  <span className="text-[10px] text-emerald-700 dark:text-lime-300 font-semibold">{tx("12 Months (20% Discount)")}</span>
                </button>
              </div>

              {/* Move to Yearly 1-Click Bulk Action Button */}
              {billingCycle === 'monthly' ? (
                <div
                  id="bulk-move-to-yearly-banner"
                  className="p-3 rounded-xl bg-gradient-to-r from-lime-500/15 via-emerald-500/15 to-transparent border-2 border-lime-400 dark:border-lime-500/50 shadow-sm space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-900 dark:text-white">
                      <Sparkles className="w-3.5 h-3.5 text-[#65A30D] dark:text-[#A3E635]" />
                      <span>{tx("Bulk Move All to Yearly")}</span>
                    </div>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#A3E635] text-slate-950 uppercase tracking-wide">{tx("Save 20%")}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">{tx("Convert base plan and all")}{' '}{selectedAddOns.length > 0 ? selectedAddOns.length : ''}{' '}{tx("add-ons to annual billing (Qty 12) with instant 20% bundle discount in 1-click.")}</p>
                  <button
                    type="button"
                    id="cart-move-to-yearly-btn"
                    onClick={() => handleCycleChange('yearly')}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#A3E635] hover:bg-[#84CC16] text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-[0.98]"
                  >
                    <Zap className="w-4 h-4 fill-slate-950" />
                    <span>{tx("Move to Yearly (1-Click 20% Discount)")}</span>
                  </button>
                </div>
              ) : (
                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300/60 dark:border-emerald-800/60 flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{tx("Yearly 20% Discount Active (Qty 12 Multiplier)")}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCycleChange('monthly')}
                    className="text-[10px] text-slate-500 dark:text-slate-400 underline hover:text-slate-800 dark:hover:text-slate-200"
                  >{tx("Switch to Monthly")}</button>
                </div>
              )}
            </div>

            {/* Selected Items List */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <span>{tx("Selected Items in Cart (")}{selectedAddOns.length + 1})</span>
                {/* Clear Cart Button */}
                {selectedAddOns.length > 0 && onClearCart && (
                  <div>
                    {!clearConfirming ? (
                      <button
                        type="button"
                        id="cart-clear-all-trigger-btn"
                        onClick={() => setClearConfirming(true)}
                        className="text-rose-600 dark:text-rose-400 hover:text-rose-700 hover:underline flex items-center gap-1 text-[11px] font-semibold transition-colors"
                        title={tx("Clear all selected modules from cart")}
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>{tx("Clear Cart")}</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-1.5 animate-in fade-in">
                        <span className="text-[10px] text-rose-500 font-bold">{tx("Clear all?")}</span>
                        <button
                          type="button"
                          id="cart-clear-confirm-btn"
                          onClick={handleClear}
                          className="px-2 py-0.5 rounded bg-rose-600 text-white text-[10px] font-bold hover:bg-rose-700"
                        >{tx("Yes, Clear")}</button>
                        <button
                          type="button"
                          onClick={() => setClearConfirming(false)}
                          className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-[10px]"
                        >{tx("Cancel")}</button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Select All Checkbox & Toggle Section */}
              {onSelectAllAddOns && (
                <div
                  id="cart-select-all-box"
                  className="py-2 px-3 rounded-xl bg-slate-100 dark:bg-[#111C38] border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs"
                >
                  <label
                    htmlFor="cart-select-all-input"
                    className="flex items-center gap-2 cursor-pointer font-bold text-slate-800 dark:text-slate-200 select-none text-[11px]"
                  >
                    <input
                      type="checkbox"
                      id="cart-select-all-input"
                      checked={isAllSelected}
                      onChange={(e) => onSelectAllAddOns(e.target.checked)}
                      className="w-4 h-4 rounded text-[#0265DC] focus:ring-[#0265DC] border-slate-300 dark:border-slate-600 cursor-pointer accent-[#0265DC]"
                    />
                    <span>{tx("Select All Add-ons (")}{selectedAddOns.length}/{totalAvailableCount}{' '}{tx("bundled)")}</span>
                  </label>

                  <button
                    type="button"
                    id="cart-bulk-select-all-btn"
                    onClick={() => onSelectAllAddOns(!isAllSelected)}
                    className="text-[11px] font-bold text-[#0265DC] dark:text-blue-400 hover:underline px-1.5 py-0.5 rounded hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors"
                  >
                    {isAllSelected ? tx("Deselect All") : tx("Select All (Bundle)")}
                  </button>
                </div>
              )}

              {/* Base Plan Item */}
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#111C38] border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                <div className="min-w-0 pr-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-900 dark:text-white">
                      {plan.name}{' '}{tx("Plan")}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-blue-100 text-[#0265DC] dark:bg-blue-950 dark:text-blue-300 font-bold">{tx("Qty:")}{' '}{multiplier}{' '}{tx("mo")}</span>
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
                    {currencyConfig.format(billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice)}{tx("/mo")}</div>
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
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 shrink-0 font-bold">{tx("Qty:")}{' '}{multiplier}{' '}{tx("mo")}</span>
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
                              {currencyConfig.format(pricePerMo)}{tx("/mo")}</div>
                          </div>
                          {onRemoveAddOn && (
                            <button
                              type="button"
                              onClick={() => onRemoveAddOn(addon.id)}
                              className="p-1 rounded text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors"
                              title={tx("Remove {name} from cart", { name: addon.name })}
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
                <div className="p-3 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-center text-xs text-slate-500">{tx("No extra extension modules added yet. Select modules from the catalog to bundle.")}</div>
              )}
            </div>

            {/* Calculations Breakdown (Undiscounted, Multiplier, 20% Discount, 7.5% VAT) */}
            <div className="p-3 rounded-xl bg-slate-900 text-white space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>{tx("Gross Base (")}{multiplier}{' '}{tx("month")}{multiplier > 1 ? 's' : ''}):</span>
                <span className="font-mono">{currencyConfig.format(undiscountedSubtotalUSD)}</span>
              </div>

              {billingCycle === 'yearly' && (
                <div className="flex items-center justify-between text-[#A3E635] font-semibold">
                  <span className="flex items-center gap-1">
                    <Percent className="w-3.5 h-3.5" />
                    <span>{tx("20% Annual Discount Savings:")}</span>
                  </span>
                  <span className="font-mono">-{currencyConfig.format(annualSavingsUSD)}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-slate-300">
                <span>{tx("Net Taxable Subtotal:")}</span>
                <span className="font-mono font-bold">{currencyConfig.format(discountedSubtotalUSD)}</span>
              </div>

              {/* 7.5% Exclusive Statutory VAT */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200">
                <div>
                  <div className="font-bold text-white flex items-center gap-1">
                    <span>{tx("VAT (7.5% Exclusive)")}</span>
                    <span className="text-[10px] text-slate-400">{tx("Statutory")}</span>
                  </div>
                  <div className="text-[10px] text-slate-400">{tx("7.5% applicable tax")}</div>
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
                      <span>{tx("Exact Price Per Month:")}</span>
                    </span>
                    <span className="text-sm font-extrabold font-mono text-[#A3E635]">
                      {currencyConfig.format(exactPricePerMonthUSD)}
                      <span className="text-[10px] font-sans text-slate-300">{tx("/mo")}</span>
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400">{tx("* Inclusive of")}{' '}{billingCycle === 'yearly' ? tx("20% annual discount and ") : ''}{tx("7.5% exclusive VAT")}</div>
                </div>

                <div className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-950/80 to-slate-900 border border-emerald-500/40 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-emerald-300 flex items-center gap-1">
                      <span>{tx("Exact Price Per Year:")}</span>
                    </span>
                    <span className="text-sm font-extrabold font-mono text-[#A3E635]">
                      {currencyConfig.format(exactPricePerYearUSD)}
                      <span className="text-[10px] font-sans text-slate-300">{tx("/yr")}</span>
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400">{tx("* 12-month total inclusive of 20% discount and 7.5% exclusive VAT")}</div>
                </div>
              </div>

              {/* Total Due Today */}
              <div className="pt-2 border-t border-slate-800 flex items-baseline justify-between">
                <div>
                  <span className="text-xs font-bold text-white">{tx("Total Billed Today:")}</span>
                  <div className="text-[10px] text-slate-400">{tx("Qty")}{' '}{multiplier}{' '}{tx("month")}{multiplier > 1 ? 's' : ''}{' '}{tx("subscription")}</div>
                </div>
                <span className="text-lg font-extrabold font-mono text-[#A3E635]">
                  {currencyConfig.format(totalDueTodayUSD)}
                </span>
              </div>
            </div>

            {/* Team Collaboration & Share Cart Card in Drawer */}
            <div
              id="cart-drawer-team-share-box"
              className="p-3.5 rounded-xl bg-gradient-to-r from-slate-900 via-[#111C38] to-slate-900 border border-slate-800 text-white space-y-2.5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-lime-400/20 text-[#A3E635] flex items-center justify-center">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold text-white">{tx("Share Cart with Team")}</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold border border-slate-700">{tx("Collaborative Proposal")}</span>
              </div>

              <p className="text-[11px] text-slate-300 leading-relaxed">{tx("Need approval from finance or your leadership team? Generate a unique link or copy a formatted Slack/Email specification.")}</p>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  id="cart-quick-copy-url-btn"
                  onClick={() => copyToClipboard(generateShareUrl(), 'link')}
                  className="py-2 px-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-700 transition-colors cursor-pointer"
                  title={tx("Copy shareable link to clipboard")}
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-[#A3E635] stroke-[3]" /> : <LinkIcon className="w-3.5 h-3.5 text-blue-400" />}
                  <span>{copiedLink ? tx("Link Copied!") : tx("Copy Link")}</span>
                </button>

                <button
                  type="button"
                  id="cart-quick-copy-summary-btn"
                  onClick={() => copyToClipboard(generateSummaryString(), 'summary')}
                  className="py-2 px-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-700 transition-colors cursor-pointer"
                  title={tx("Copy formatted summary to clipboard")}
                >
                  {copiedSummary ? <Check className="w-3.5 h-3.5 text-[#A3E635] stroke-[3]" /> : <FileText className="w-3.5 h-3.5 text-emerald-400" />}
                  <span>{copiedSummary ? tx("Summary Copied!") : tx("Copy Summary")}</span>
                </button>
              </div>

              <button
                type="button"
                id="cart-drawer-open-share-modal-btn"
                onClick={() => setIsShareModalOpen(true)}
                className="w-full text-center text-[11px] text-[#A3E635] hover:underline font-semibold flex items-center justify-center gap-1 pt-0.5 cursor-pointer"
              >
                <span>{tx("View full sharing options (WhatsApp, Email & Previews)")}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Clear Cart Actions section */}
            {selectedAddOns.length > 0 && onClearCart && (
              <div className="pt-1 flex items-center justify-between text-xs">
                <button
                  type="button"
                  id="cart-drawer-clear-all-btn"
                  onClick={handleClear}
                  className="w-full py-2 px-3 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{tx("Clear All")}{' '}{selectedAddOns.length}{' '}{tx("Selected Add-on Modules")}</span>
                </button>
              </div>
            )}

            {/* Proceed to Checkout Button */}
            <button
              type="button"
              id="cart-drawer-checkout-btn"
              onClick={onOpenCheckout}
              className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-slate-950 bg-[#A3E635] hover:bg-[#84CC16] shadow-lg shadow-lime-500/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>{tx("Proceed to Regional & Global Checkout")}</span>
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
          className="flex items-center gap-2.5 min-w-0 text-left hover:opacity-90 transition-opacity focus:outline-none cursor-pointer"
          title={tx("Click to view quantity multiplier and exact monthly/yearly pricing")}
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
              <span className="text-[10px] font-mono text-[#A3E635] bg-slate-800 px-1.5 py-0.2 rounded border border-lime-500/30">{tx("Qty:")}{' '}{multiplier}{' '}{tx("mo")}</span>
              {selectedAddOns.length > 0 && (
                <span className="text-[10px] text-lime-400 bg-lime-950/80 px-1.5 py-0.2 rounded-full border border-lime-500/30 truncate">
                  +{selectedAddOns.length}{' '}{tx("module")}{selectedAddOns.length > 1 ? 's' : ''}
                </span>
              )}
            </div>
            <div className="text-[11px] text-slate-300 font-mono flex items-center gap-1.5 flex-wrap">
              <span className="text-[#A3E635] font-bold">
                {currencyConfig.format(exactPricePerMonthUSD)}{tx("/mo")}</span>
              <span className="text-[9px] text-slate-400 font-sans">
                ({currencyConfig.format(totalDueTodayUSD)}{' '}{tx("billed")}{' '}{billingCycle})
              </span>
            </div>
          </div>
        </button>

        <div className="flex items-center gap-1.5 shrink-0">
          {/* Quick Share Cart Button */}
          <button
            type="button"
            id="floating-cart-compact-share-btn"
            onClick={() => setIsShareModalOpen(true)}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title={tx("Share Cart Configuration with Team")}
            aria-label={tx("Share Cart")}
          >
            <Share2 className="w-4 h-4 text-[#A3E635]" />
          </button>

          {/* Quick Clear Button */}
          {selectedAddOns.length > 0 && onClearCart && (
            <button
              type="button"
              id="floating-cart-quick-clear-btn"
              onClick={handleClear}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
              title={tx("Clear all cart add-ons")}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}

          {/* Toggle Expand Details */}
          <button
            type="button"
            id="floating-cart-toggle-expand-btn"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors text-xs font-semibold flex items-center gap-0.5 cursor-pointer"
            title={tx("Expand Cart Breakdown")}
          >
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>

          {/* Checkout CTA */}
          <button
            id="floating-cart-checkout-btn"
            onClick={onOpenCheckout}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-[#A3E635] hover:bg-[#84CC16] shadow-sm flex items-center gap-1.5 shrink-0 transition-transform active:scale-95 cursor-pointer"
          >
            <span>{tx("Checkout")}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Share Cart Collaboration Modal */}
      {isShareModalOpen && (
        <div
          id="share-cart-modal-backdrop"
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsShareModalOpen(false);
          }}
        >
          <div
            id="share-cart-modal-card"
            className="w-full max-w-lg rounded-2xl bg-white dark:bg-[#0B132B] text-slate-900 dark:text-white border-2 border-lime-400 dark:border-lime-500/60 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#A3E635] text-slate-950 flex items-center justify-center font-bold shadow-xs">
                  <Share2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
                    <span>{tx("Share Cart Configuration")}</span>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#A3E635] text-slate-950 uppercase tracking-wide">{tx("Team Sync")}</span>
                  </h3>
                  <p className="text-xs text-slate-400">{tx("Collaborate with your team, finance department, or leadership")}</p>
                </div>
              </div>

              <button
                type="button"
                id="share-cart-modal-close-btn"
                onClick={() => setIsShareModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label={tx("Close Share Modal")}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
              {/* Active Cart Snapshot Banner */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#111C38] border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 text-xs">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 flex-wrap">
                    <span>{plan.name}{' '}{tx("Plan")}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-blue-100 text-[#0265DC] dark:bg-blue-950 dark:text-blue-300 font-bold">
                      {billingCycle === 'yearly' ? tx("Yearly (20% Off)") : tx("Monthly")}
                    </span>
                    {selectedAddOns.length > 0 && (
                      <span className="text-[10px] text-lime-600 dark:text-lime-400 font-semibold">
                        +{selectedAddOns.length}{' '}{tx("module")}{selectedAddOns.length > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{tx("Total Due:")}{' '}<span className="font-bold text-emerald-600 dark:text-emerald-400">{currencyConfig.format(totalDueTodayUSD)}</span> ({currencyConfig.format(exactPricePerMonthUSD)}{tx("/mo effective)")}</div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] uppercase font-bold text-slate-400">{tx("Currency")}</span>
                  <div className="font-bold font-mono text-slate-800 dark:text-slate-200">{currencyConfig.code}</div>
                </div>
              </div>

              {/* Tabs: Shareable Link vs Proposal Summary */}
              <div className="flex border-b border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  id="share-tab-link-btn"
                  onClick={() => setShareTab('link')}
                  className={`flex-1 py-2.5 text-xs font-bold border-b-2 flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    shareTab === 'link'
                      ? 'border-[#0265DC] text-[#0265DC] dark:text-blue-400 dark:border-blue-400'
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <LinkIcon className="w-3.5 h-3.5" />
                  <span>{tx("Unique Shareable URL")}</span>
                </button>
                <button
                  type="button"
                  id="share-tab-summary-btn"
                  onClick={() => setShareTab('summary')}
                  className={`flex-1 py-2.5 text-xs font-bold border-b-2 flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    shareTab === 'summary'
                      ? 'border-[#0265DC] text-[#0265DC] dark:text-blue-400 dark:border-blue-400'
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{tx("Proposal Summary (Slack / Email)")}</span>
                </button>
              </div>

              {/* Tab 1: Shareable URL */}
              {shareTab === 'link' && (
                <div className="space-y-3.5 animate-in fade-in duration-150">
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{tx("Anyone opening this unique URL will instantly load your selected")}{' '}<span className="font-semibold text-slate-900 dark:text-white">{plan.name}{' '}{tx("Plan")}</span>{tx(", billing cycle (")}{billingCycle}{tx("), currency (")}{currencyConfig.code}{tx("), and all")}{' '}<span className="font-semibold text-slate-900 dark:text-white">{selectedAddOns.length}{' '}{tx("selected add-on modules")}</span>.
                  </p>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{tx("Collaborative Cart Link")}</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={generateShareUrl()}
                        onFocus={(e) => e.target.select()}
                        className="flex-1 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 font-mono truncate focus:outline-none focus:ring-2 focus:ring-[#0265DC]"
                      />
                      <button
                        type="button"
                        id="share-modal-copy-link-btn"
                        onClick={() => copyToClipboard(generateShareUrl(), 'link')}
                        className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shrink-0 cursor-pointer ${
                          copiedLink
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#A3E635] hover:bg-[#84CC16] text-slate-950 shadow-xs'
                        }`}
                      >
                        {copiedLink ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedLink ? tx("Copied!") : tx("Copy Link")}</span>
                      </button>
                    </div>
                  </div>

                  {/* Direct Sharing Actions: WhatsApp & Email */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">{tx("Quick Share with Decision Makers")}</div>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        id="share-via-whatsapp-btn"
                        onClick={handleShareWhatsApp}
                        className="py-2.5 px-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-300/80 dark:border-emerald-700/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                      >
                        <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span>{tx("Send to WhatsApp")}</span>
                      </button>

                      <button
                        type="button"
                        id="share-via-email-btn"
                        onClick={handleShareEmail}
                        className="py-2.5 px-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-300/80 dark:border-blue-700/60 text-blue-800 dark:text-blue-300 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                      >
                        <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span>{tx("Email to Colleagues")}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Proposal Summary for Slack / Teams */}
              {shareTab === 'summary' && (
                <div className="space-y-3 animate-in fade-in duration-150">
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{tx("Copy a clean, pre-formatted proposal specification ready to paste directly into Slack channels, Microsoft Teams, finance review threads, or board approval memos.")}</p>

                  <div className="relative">
                    <textarea
                      readOnly
                      rows={8}
                      value={generateSummaryString()}
                      onFocus={(e) => e.target.select()}
                      className="w-full p-3 rounded-xl bg-slate-900 text-slate-200 border border-slate-700 font-mono text-[11px] leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-[#0265DC] select-all"
                    />
                  </div>

                  <button
                    type="button"
                    id="share-modal-copy-summary-btn"
                    onClick={() => copyToClipboard(generateSummaryString(), 'summary')}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      copiedSummary
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#A3E635] hover:bg-[#84CC16] text-slate-950 shadow-md shadow-lime-500/20'
                    }`}
                  >
                    {copiedSummary ? <Check className="w-4 h-4 stroke-[3]" /> : <FileText className="w-4 h-4" />}
                    <span>{copiedSummary ? tx("Summary Copied to Clipboard!") : tx("Copy Formatted Summary to Clipboard")}</span>
                  </button>
                </div>
              )}

              {/* Toast Feedback */}
              {shareToast && (
                <div className="p-2.5 rounded-xl bg-emerald-500 text-slate-950 text-xs font-extrabold flex items-center justify-center gap-1.5 animate-in fade-in zoom-in-95 shadow-md">
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>{shareToast}</span>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-slate-100 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#0265DC] dark:text-blue-400" />
                <span>{tx("Synchronized with active cart")}</span>
              </span>
              <button
                type="button"
                onClick={() => setIsShareModalOpen(false)}
                className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold border border-slate-300 dark:border-slate-700 transition-colors cursor-pointer"
              >{tx("Done")}</button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
