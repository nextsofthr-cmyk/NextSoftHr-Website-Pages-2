import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  CreditCard,
  Check,
  Plus,
  Trash2,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Tag,
  Percent,
  Layers,
  Building2,
  User,
  Mail,
  Phone,
  Globe,
  FileText,
  Search,
  CheckCircle2,
  Lock,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  PartyPopper,
  Copy,
  CheckCheck,
  RotateCcw,
  Calendar,
} from 'lucide-react';
import {
  BillingCycle,
  CurrencyCode,
  PricingPlan,
  AddOnItem,
  SubscriptionCustomer,
  SubscriptionInvoice,
} from '../types';
import { PRICING_PLANS, ADD_ONS, CURRENCIES } from '../data/pricingData';
import {
  PAYMENT_GATEWAYS,
  PaymentGatewayItem,
  GatewayRegion,
  VALID_PROMO_CODES,
  PromoCodeItem,
} from '../data/paymentGateways';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { PaymentSimulationModal } from './PaymentSimulationModal';
import { InvoiceReceiptModal } from './InvoiceReceiptModal';
import { ConfettiEffect } from './ConfettiEffect';
import { CurrencyPickerModal } from './CurrencyPickerModal';

interface SubscriptionCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlanId?: string;
  initialBillingCycle?: BillingCycle;
  initialSelectedAddOns?: AddOnItem[];
  onUpdatePlan?: (planId: string) => void;
  onUpdateAddOns?: (addOnIds: string[]) => void;
  onUpdateBillingCycle?: (cycle: BillingCycle) => void;
  onClearAddOns?: () => void;
  pppFactor?: number;
  pppRegionName?: string;
}

export const SubscriptionCheckoutModal: React.FC<SubscriptionCheckoutModalProps> = ({
  isOpen,
  onClose,
  initialPlanId = 'professional',
  initialBillingCycle = 'yearly',
  initialSelectedAddOns = [],
  onUpdatePlan,
  onUpdateAddOns,
  onUpdateBillingCycle,
  onClearAddOns,
  pppFactor = 1.0,
  pppRegionName,
}) => {
  const { t, language } = useLanguage();
  const { selectedCurrency, currencyConfig, setSelectedCurrency } = useCurrency();
  const [showCurrencyPicker, setShowCurrencyPicker] = useState<boolean>(false);

  // Selected Plan State
  const [selectedPlanId, setSelectedPlanId] = useState<string>(initialPlanId);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>(initialBillingCycle);

  // Selected Add-ons State
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>(() =>
    initialSelectedAddOns.map((a) => a.id)
  );
  const [showAddOnsPicker, setShowAddOnsPicker] = useState<boolean>(false);

  // Promo Code State
  const [promoInput, setPromoInput] = useState<string>('');
  const [appliedPromo, setAppliedPromo] = useState<PromoCodeItem | null>(null);
  const [promoError, setPromoError] = useState<string>('');
  const [promoSuccess, setPromoSuccess] = useState<string>('');

  // Gateway Selector State
  const [selectedRegion, setSelectedRegion] = useState<GatewayRegion>('all');
  const [gatewaySearch, setGatewaySearch] = useState<string>('');
  const [selectedGatewayId, setSelectedGatewayId] = useState<string>('paystack');

  // Customer Form State
  const [customer, setCustomer] = useState<SubscriptionCustomer>({
    fullName: 'Adeola Johnson',
    companyName: 'Apex Logistics & Tech Ltd',
    email: 'finance@apexlogistics.africa',
    phone: '+234 803 249 1842',
    country: 'Nigeria',
    address: 'Plot 14 Victoria Island, Lagos',
    taxId: 'TIN-89210492-001',
  });

  // Modal sub-states
  const [showPaymentSimulation, setShowPaymentSimulation] = useState<boolean>(false);
  const [generatedInvoice, setGeneratedInvoice] = useState<SubscriptionInvoice | null>(null);
  const [showReceiptModal, setShowReceiptModal] = useState<boolean>(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState<boolean>(false);
  const [confettiTrigger, setConfettiTrigger] = useState<number>(0);
  const [copiedRef, setCopiedRef] = useState<boolean>(false);
  const [workspaceLaunched, setWorkspaceLaunched] = useState<boolean>(false);

  // Synchronize initial props
  useEffect(() => {
    if (isOpen) {
      if (initialPlanId) setSelectedPlanId(initialPlanId);
      if (initialBillingCycle) setBillingCycle(initialBillingCycle);
      if (initialSelectedAddOns && initialSelectedAddOns.length > 0) {
        setSelectedAddOnIds(initialSelectedAddOns.map((a) => a.id));
      }
      setIsPaymentSuccess(false);
      setWorkspaceLaunched(false);
      setCopiedRef(false);

      // Automatically select best regional gateway tab based on selected currency
      if (['NGN', 'GHS'].includes(selectedCurrency)) {
        setSelectedRegion('west-africa');
        setSelectedGatewayId('paystack');
      } else if (['KES', 'UGX', 'TZS', 'RWF', 'ETB'].includes(selectedCurrency)) {
        setSelectedRegion('east-africa');
        setSelectedGatewayId('mpesa');
      } else if (['ZAR', 'ZMW', 'ZIP', 'NAD', 'BWP', 'SZL', 'LSL'].includes(selectedCurrency)) {
        setSelectedRegion('south-africa');
        setSelectedGatewayId('ozow');
      } else if (['XAF', 'XOF', 'MAD', 'EGP', 'DZD', 'TND', 'CDF', 'GNF'].includes(selectedCurrency)) {
        setSelectedRegion('other-africa');
        setSelectedGatewayId('fedapay');
      } else {
        setSelectedRegion('global');
        setSelectedGatewayId('stripe');
      }
    }
  }, [isOpen, initialPlanId, initialBillingCycle, initialSelectedAddOns, selectedCurrency]);

  // Handler for changing currency directly in checkout
  const handleCurrencyChange = (newCode: CurrencyCode) => {
    setSelectedCurrency(newCode);
    if (['NGN', 'GHS'].includes(newCode)) {
      setSelectedRegion('west-africa');
      setSelectedGatewayId('paystack');
    } else if (['KES', 'UGX', 'TZS', 'RWF', 'ETB'].includes(newCode)) {
      setSelectedRegion('east-africa');
      setSelectedGatewayId('mpesa');
    } else if (['ZAR', 'ZMW', 'ZIP', 'NAD', 'BWP', 'SZL', 'LSL'].includes(newCode)) {
      setSelectedRegion('south-africa');
      setSelectedGatewayId('ozow');
    } else if (['XAF', 'XOF', 'MAD', 'EGP', 'DZD', 'TND', 'CDF', 'GNF'].includes(newCode)) {
      setSelectedRegion('other-africa');
      setSelectedGatewayId('fedapay');
    } else {
      setSelectedRegion('global');
      setSelectedGatewayId('stripe');
    }
  };

  if (!isOpen) return null;

  // Selected Plan Object
  const currentPlan =
    PRICING_PLANS.find((p) => p.id === selectedPlanId) || PRICING_PLANS[1]; // default Professional

  // Selected Add-ons Objects
  const selectedAddOns = ADD_ONS.filter((addon) => selectedAddOnIds.includes(addon.id));

  // Handlers for plan, cycle, and add-ons that also notify parent for persistence
  const handleSelectPlan = (planId: string) => {
    setSelectedPlanId(planId);
    onUpdatePlan?.(planId);
  };

  const handleSelectCycle = (cycle: BillingCycle) => {
    setBillingCycle(cycle);
    onUpdateBillingCycle?.(cycle);
  };

  // Toggle Add-on
  const toggleAddOn = (addonId: string) => {
    setSelectedAddOnIds((prev) => {
      const next = prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId];
      onUpdateAddOns?.(next);
      return next;
    });
  };

  // Clear all add-on items from cart
  const handleClearAllAddOns = () => {
    setSelectedAddOnIds([]);
    onUpdateAddOns?.([]);
    onClearAddOns?.();
  };

  // Calculations with Quantity Multiplier effect (1 for monthly, 12 for yearly)
  const multiplier = billingCycle === 'yearly' ? 12 : 1;

  // Base monthly rates undiscounted (with PPP factor if active)
  const baseMonthlyPlanUSD = Math.round(currentPlan.monthlyPrice * pppFactor * 100) / 100;
  const baseMonthlyAddOnsUSD = selectedAddOns.reduce((acc, item) => acc + (Math.round(item.monthlyPrice * pppFactor * 100) / 100), 0);
  const baseMonthlyTotalUSD = baseMonthlyPlanUSD + baseMonthlyAddOnsUSD;

  // Effective monthly rates (yearly plan includes 20% discount, with PPP factor if active)
  const effectiveMonthlyPlanUSD =
    Math.round((billingCycle === 'yearly' ? currentPlan.yearlyPrice : currentPlan.monthlyPrice) * pppFactor * 100) / 100;
  const effectiveMonthlyAddOnsUSD = selectedAddOns.reduce(
    (acc, item) => acc + (Math.round((billingCycle === 'yearly' ? item.yearlyPrice : item.monthlyPrice) * pppFactor * 100) / 100),
    0
  );
  const effectiveMonthlyTotalUSD = effectiveMonthlyPlanUSD + effectiveMonthlyAddOnsUSD;

  // Subtotals with duration multiplier applied
  const planPriceUSD = effectiveMonthlyPlanUSD * multiplier;
  const addOnsTotalUSD = effectiveMonthlyAddOnsUSD * multiplier;
  const grossSubtotalUSD = planPriceUSD + addOnsTotalUSD;

  // Undiscounted total for annual savings display
  const grossUndiscountedSubtotalUSD = baseMonthlyTotalUSD * multiplier;
  const annualSavingsUSD =
    billingCycle === 'yearly' ? Math.max(0, grossUndiscountedSubtotalUSD - grossSubtotalUSD) : 0;

  // Promo discount calculation
  let discountAmountUSD = 0;
  if (appliedPromo) {
    discountAmountUSD = (grossSubtotalUSD * appliedPromo.discountPercent) / 100;
  }

  const taxableSubtotalUSD = Math.max(0, grossSubtotalUSD - discountAmountUSD);
  const vatRate = 0.075; // 7.5% Exclusive Statutory VAT
  const vatAmountUSD = taxableSubtotalUSD * vatRate;
  const totalAmountUSD = taxableSubtotalUSD + vatAmountUSD;

  // EXACT price customer is paying per month (inclusive of 20% discount & 7.5% VAT)
  const exactPricePerMonthUSD = (taxableSubtotalUSD / multiplier) * (1 + vatRate);

  // EXACT price customer is paying per year (inclusive of 20% discount & 7.5% VAT)
  const exactPricePerYearUSD = exactPricePerMonthUSD * 12;

  // Selected Gateway Object
  const currentGateway =
    PAYMENT_GATEWAYS.find((g) => g.id === selectedGatewayId) || PAYMENT_GATEWAYS[0];

  // Apply Promo
  const handleApplyPromo = (codeToApply?: string) => {
    const code = (codeToApply || promoInput).trim().toUpperCase();
    setPromoError('');
    setPromoSuccess('');

    if (!code) {
      setPromoError('Please enter a promotion code.');
      return;
    }

    const matchedPromo = VALID_PROMO_CODES.find((p) => p.code === code);
    if (matchedPromo) {
      setAppliedPromo(matchedPromo);
      setPromoSuccess(`Promo code "${matchedPromo.code}" applied! You save ${matchedPromo.discountPercent}%.`);
      setPromoInput('');
    } else {
      setPromoError('Invalid coupon code. Try NEXTSOFT20 or PANAFRICA10.');
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoSuccess('');
    setPromoError('');
  };

  // Filter Gateways
  const filteredGateways = PAYMENT_GATEWAYS.filter((g) => {
    if (selectedRegion !== 'all' && g.region !== selectedRegion) {
      return false;
    }
    if (!gatewaySearch.trim()) return true;
    const q = gatewaySearch.toLowerCase();
    return (
      g.name.toLowerCase().includes(q) ||
      g.tagline.toLowerCase().includes(q) ||
      g.regionLabel.toLowerCase().includes(q) ||
      g.countries.some((c) => c.toLowerCase().includes(q)) ||
      g.supportedMethods.some((m) => m.toLowerCase().includes(q))
    );
  });

  // Build Invoice Data Object
  const createInvoiceObject = (status: 'PAID' | 'PENDING', ref: string, methodDetails: string): SubscriptionInvoice => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    const dueDate = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    return {
      invoiceNumber: `INV-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      receiptNumber: `RCT-NXT-${Math.floor(100000 + Math.random() * 900000)}`,
      date: formattedDate,
      dueDate: dueDate,
      customer: customer,
      planId: currentPlan.id,
      planName: currentPlan.name,
      billingCycle: billingCycle,
      planPriceUSD: planPriceUSD,
      selectedAddOns: selectedAddOns,
      addOnsTotalUSD: addOnsTotalUSD,
      subtotalUSD: grossSubtotalUSD,
      promoCode: appliedPromo?.code,
      discountPercent: appliedPromo?.discountPercent,
      discountAmountUSD: discountAmountUSD,
      taxableSubtotalUSD: taxableSubtotalUSD,
      vatRate: vatRate,
      vatAmountUSD: vatAmountUSD,
      totalUSD: totalAmountUSD,
      currency: selectedCurrency,
      currencyRate: currencyConfig.exchangeRate,
      totalFormatted: currencyConfig.format(totalAmountUSD),
      gatewayId: currentGateway.id,
      gatewayName: currentGateway.name,
      paymentMethod: methodDetails,
      paymentReference: ref,
      status: status,
    };
  };

  // Launch Simulation
  const handleProceedToPayment = () => {
    setShowPaymentSimulation(true);
  };

  // Generate Pro-Forma Invoice without paying
  const handleGenerateProForma = () => {
    const inv = createInvoiceObject('PENDING', 'PROFORMA-UNPAID', 'Pro-Forma Tax Invoice');
    setGeneratedInvoice(inv);
    setShowReceiptModal(true);
  };

  // Successful payment from simulation
  const handlePaymentSuccess = (paymentReference: string, paymentMethodDetails: string) => {
    setShowPaymentSimulation(false);
    const inv = createInvoiceObject('PAID', paymentReference, paymentMethodDetails);
    setGeneratedInvoice(inv);
    setIsPaymentSuccess(true);
    setConfettiTrigger((c) => c + 1);
  };

  const handleCopyRef = (refText: string) => {
    navigator.clipboard.writeText(refText);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2200);
  };

  const handleResetForNewCheckout = () => {
    setIsPaymentSuccess(false);
    setWorkspaceLaunched(false);
  };

  const handleCloseModal = () => {
    setIsPaymentSuccess(false);
    setWorkspaceLaunched(false);
    onClose();
  };

  return (
    <>
      <div
        id="subscription-checkout-modal"
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto"
      >
        <div className="bg-white dark:bg-[#0B132B] rounded-3xl max-w-5xl w-full my-4 shadow-2xl border border-slate-200 dark:border-slate-800 relative flex flex-col max-h-[94vh] overflow-hidden transition-colors">
          {/* Header */}
          <div className="px-5 sm:px-8 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-[#111C38] shrink-0">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-md transition-all ${
                  isPaymentSuccess
                    ? 'bg-gradient-to-tr from-emerald-500 to-[#A3E635] text-slate-950 shadow-emerald-500/20'
                    : 'bg-gradient-to-tr from-[#0265DC] to-[#004DB3] text-white shadow-blue-500/20'
                }`}
              >
                {isPaymentSuccess ? (
                  <Sparkles className="w-5 h-5 text-slate-950" />
                ) : (
                  <CreditCard className="w-5 h-5" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                    {isPaymentSuccess
                      ? 'Subscription Activated Successfully!'
                      : 'NextSofthr Subscription Checkout'}
                  </h3>
                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                      isPaymentSuccess
                        ? 'bg-emerald-500 text-white'
                        : 'bg-[#A3E635] text-slate-950'
                    }`}
                  >
                    {isPaymentSuccess ? '✓ Confirmed' : 'Instant Setup'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {isPaymentSuccess
                    ? 'Official Tax Invoice & Cloud Workspace Provisioning'
                    : 'Select payment gateways across Nigeria, West Africa, East Africa, South Africa & Global'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Currency Picker Quick Button in Header */}
              <button
                type="button"
                id="checkout-currency-header-pill"
                onClick={() => setShowCurrencyPicker(true)}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors shadow-xs"
                title="Select Payment Currency (160+ World Currencies)"
              >
                <span className="text-base leading-none">{currencyConfig.flag}</span>
                <span className="font-bold">{selectedCurrency}</span>
                <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">({currencyConfig.symbol})</span>
                <Globe className="w-3.5 h-3.5 text-blue-500 ml-0.5" />
              </button>

              <button
                onClick={handleCloseModal}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Body: Either Success Celebration or 2-Column Form */}
          {isPaymentSuccess && generatedInvoice ? (
            <div className="flex-1 overflow-y-auto p-5 sm:p-8 flex flex-col items-center justify-center text-center relative bg-gradient-to-b from-white via-slate-50 to-slate-100/60 dark:from-[#0B132B] dark:via-[#0E1838] dark:to-[#070D1E]">
              {/* Confetti Explosion Canvas */}
              <ConfettiEffect key={confettiTrigger} active={true} />

              {/* Animated Success Badge with Glowing Concentric Rings */}
              <div className="relative mb-5 flex items-center justify-center mt-2">
                <div className="absolute -inset-4 rounded-full bg-emerald-500/20 animate-ping opacity-60" />
                <div className="absolute -inset-2 rounded-full bg-[#A3E635]/30 animate-pulse" />
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-[#A3E635] flex items-center justify-center text-slate-950 shadow-2xl shadow-emerald-500/30 z-10 transform hover:scale-105 transition-transform duration-300">
                  <Check className="w-10 h-10 stroke-[3.5] text-slate-950" />
                </div>
                <div className="absolute -top-2 -right-3 p-1.5 rounded-full bg-amber-400 text-slate-950 shadow-md animate-bounce">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="absolute -bottom-1 -left-2 p-1.5 rounded-full bg-blue-500 text-white shadow-md animate-pulse">
                  <PartyPopper className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Celebration Headlines */}
              <div className="space-y-1.5 max-w-xl mx-auto mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-extrabold uppercase tracking-wider mb-1 border border-emerald-300 dark:border-emerald-800 shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Payment Verified &amp; Activated</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  Subscription Live &amp; Operational! 🎉
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Congratulations! Your NextSofthr enterprise subscription for{' '}
                  <strong className="text-slate-900 dark:text-white font-bold">
                    {customer.companyName || customer.fullName}
                  </strong>{' '}
                  has been confirmed with instant cloud provisioning.
                </p>
              </div>

              {/* Transaction & Plan Summary Card */}
              <div className="w-full max-w-2xl bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 sm:p-6 mb-6 text-left shadow-lg">
                {/* Row 1: Amount & Gateway info */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4 border-b border-slate-200 dark:border-slate-700/80">
                  <div>
                    <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      Amount Paid
                    </div>
                    <div className="text-xl sm:text-2xl font-black font-display text-slate-900 dark:text-white mt-0.5">
                      {generatedInvoice.totalFormatted}
                    </div>
                    <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Full Settlement Confirmed</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      Processed Through
                    </div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      {generatedInvoice.gatewayName}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate mt-0.5">
                      {generatedInvoice.paymentMethod}
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      Transaction Reference
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <code className="text-xs font-mono font-bold text-[#0265DC] dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-900 truncate">
                        {generatedInvoice.paymentReference}
                      </code>
                      <button
                        type="button"
                        onClick={() => handleCopyRef(generatedInvoice.paymentReference)}
                        className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        title="Copy Reference"
                      >
                        {copiedRef ? (
                          <CheckCheck className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Receipt: {generatedInvoice.receiptNumber}
                    </div>
                  </div>
                </div>

                {/* Row 2: Activated Plan & Add-ons */}
                <div className="pt-4 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-xs text-slate-500">Subscribed Tier:</span>
                      <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span>{generatedInvoice.planName} Plan</span>
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#A3E635] text-slate-950 uppercase">
                          {generatedInvoice.billingCycle} Cycle
                        </span>
                        {generatedInvoice.discountPercent && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-[#0265DC] dark:bg-blue-950 dark:text-blue-300">
                            {generatedInvoice.discountPercent}% Off Applied
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-slate-500 text-left sm:text-right">
                      <div>Includes 7.5% Exclusive VAT</div>
                      <div className="text-slate-700 dark:text-slate-300 font-semibold">
                        Tax: {currencyConfig.format(generatedInvoice.vatAmountUSD)} (TIN: 24891048-0001)
                      </div>
                    </div>
                  </div>

                  {/* Add-ons list if any */}
                  {generatedInvoice.selectedAddOns.length > 0 ? (
                    <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                        Activated Modules ({generatedInvoice.selectedAddOns.length})
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {generatedInvoice.selectedAddOns.map((addon) => (
                          <span
                            key={addon.id}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                          >
                            <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                            <span>{addon.name}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="pt-2 text-xs text-slate-500 flex items-center gap-1.5 border-t border-slate-200 dark:border-slate-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Full NextSofthr Core Suite Activated: Automated PAYE, Direct Bank Payroll, and Employee Self-Service.</span>
                    </div>
                  )}

                  {/* Workspace notification if clicked */}
                  {workspaceLaunched && (
                    <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-xs text-[#0265DC] dark:text-blue-300 flex items-center gap-2 animate-in fade-in">
                      <Sparkles className="w-4 h-4 shrink-0 text-amber-500" />
                      <span>
                        Workspace setup email dispatched to <strong>{customer.email}</strong>. Provisioning automated employee sync...
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-xl">
                <button
                  id="view-official-receipt-btn"
                  type="button"
                  onClick={() => setShowReceiptModal(true)}
                  className="w-full sm:w-auto flex-1 py-3.5 px-5 rounded-xl font-bold text-sm text-white bg-[#0265DC] hover:bg-[#004DB3] shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  <FileText className="w-4 h-4" />
                  <span>View &amp; Print Official Tax Receipt</span>
                </button>

                <button
                  id="pop-more-confetti-btn"
                  type="button"
                  onClick={() => setConfettiTrigger((c) => c + 1)}
                  className="w-full sm:w-auto py-3.5 px-4 rounded-xl font-bold text-sm text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center gap-2 transition-all shadow-xs active:scale-[0.98]"
                  title="Celebration Cannon"
                >
                  <PartyPopper className="w-4 h-4 text-pink-500" />
                  <span>🎉 Pop Confetti</span>
                </button>

                <button
                  id="launch-workspace-btn"
                  type="button"
                  onClick={() => setWorkspaceLaunched(true)}
                  className="w-full sm:w-auto py-3.5 px-4 rounded-xl font-bold text-sm text-slate-950 bg-[#A3E635] hover:bg-[#84CC16] shadow-md shadow-lime-500/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  <span>Launch Workspace</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-400">
                <button
                  type="button"
                  onClick={handleResetForNewCheckout}
                  className="hover:text-slate-700 dark:hover:text-slate-200 underline underline-offset-4 flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Configure Another Plan</span>
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="hover:text-slate-700 dark:hover:text-slate-200 underline underline-offset-4"
                >
                  Return to Pricing Page
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 text-slate-800 dark:text-slate-100">
              {/* Left Column (7 cols): Plan, Add-ons, Customer Info, Gateway Selection */}
              <div className="lg:col-span-7 space-y-6">
              {/* 1. Plan & Billing Cycle Selection */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] dark:bg-[#111C38] border border-slate-200/80 dark:border-slate-800 space-y-3.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Step 1: Base Subscription Plan
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-100 text-[#0265DC] dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                      Multiplier: Qty {multiplier} ({billingCycle === 'yearly' ? '12 Months' : '1 Month'})
                    </span>
                  </div>
                  {/* Billing cycle toggle */}
                  <div className="flex items-center gap-1 bg-white dark:bg-[#070D1E] p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs shrink-0">
                    <button
                      type="button"
                      id="checkout-toggle-monthly-btn"
                      onClick={() => handleSelectCycle('monthly')}
                      className={`px-2.5 py-1 rounded-lg transition-colors font-semibold flex items-center gap-1 ${
                        billingCycle === 'monthly'
                          ? 'bg-[#0265DC] text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <span>Monthly</span>
                      <span className="text-[10px] font-mono opacity-80">(Qty: 1)</span>
                    </button>
                    <button
                      type="button"
                      id="checkout-toggle-yearly-btn"
                      onClick={() => handleSelectCycle('yearly')}
                      className={`px-2.5 py-1 rounded-lg transition-colors font-semibold flex items-center gap-1 ${
                        billingCycle === 'yearly'
                          ? 'bg-[#A3E635] text-slate-950 font-bold shadow-xs'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <span>Annual</span>
                      <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-slate-900 text-[#A3E635]">
                        Qty: 12
                      </span>
                      <span className="text-[9px] bg-emerald-600 text-white px-1 py-0.2 rounded font-sans">
                        -20%
                      </span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {PRICING_PLANS.map((plan) => {
                    const isSelected = selectedPlanId === plan.id;
                    const price = billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
                    return (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => handleSelectPlan(plan.id)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'border-[#0265DC] bg-white dark:bg-[#162447] shadow-md ring-2 ring-blue-500/20'
                            : 'border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-600'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-900 dark:text-white truncate">
                            {plan.name}
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#0265DC] dark:text-blue-400" />}
                        </div>
                        <div className="text-sm font-extrabold font-display text-slate-900 dark:text-white mt-1">
                          {plan.id === 'enterprise' ? 'Custom' : currencyConfig.format(price)}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                          {plan.employeeAllowanceText}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Extra / Extend Modules Section */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] dark:bg-[#111C38] border border-slate-200/80 dark:border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Step 2: Extension Modules &amp; Add-ons
                    </span>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                      Extend NextSofthr capabilities with tailored modules below the base price
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#0265DC] dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-900">
                      {selectedAddOnIds.length} Selected
                    </span>
                    {selectedAddOnIds.length > 0 && (
                      <button
                        type="button"
                        id="checkout-step2-clear-cart-btn"
                        onClick={handleClearAllAddOns}
                        className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:text-rose-700 hover:bg-rose-100 dark:hover:bg-rose-950/60 flex items-center gap-1 transition-colors px-2 py-1 rounded-lg border border-rose-300 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/30"
                        title="Clear all selected modules from cart"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Clear Cart Items</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Currently selected modules list */}
                {selectedAddOns.length > 0 && (
                  <div className="space-y-1.5">
                    {selectedAddOns.map((addon) => {
                      const price = billingCycle === 'yearly' ? addon.yearlyPrice : addon.monthlyPrice;
                      return (
                        <div
                          key={addon.id}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-[#070D1E] border border-blue-200 dark:border-blue-900 text-xs shadow-xs"
                        >
                          <div className="min-w-0 pr-2">
                            <span className="font-bold text-slate-900 dark:text-white">{addon.name}</span>
                            <span className="text-slate-500 dark:text-slate-400 ml-1.5 text-[11px]">
                              ({addon.unitText})
                            </span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="font-mono font-bold text-slate-900 dark:text-white">
                              +{currencyConfig.format(price)}
                            </span>
                            <button
                              type="button"
                              onClick={() => toggleAddOn(addon.id)}
                              className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                              title="Remove Add-on"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Toggle Add More Modules Picker */}
                <div>
                  <button
                    type="button"
                    onClick={() => setShowAddOnsPicker(!showAddOnsPicker)}
                    className="w-full py-2 px-3 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-xs font-semibold text-[#0265DC] dark:text-blue-300 hover:bg-white dark:hover:bg-slate-800 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{showAddOnsPicker ? 'Hide Extra Module Catalog' : '+ Add / Customize Extra Modules'}</span>
                    {showAddOnsPicker ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {showAddOnsPicker && (
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-52 overflow-y-auto p-1 animate-in fade-in duration-150">
                      {ADD_ONS.map((addon) => {
                        const isSelected = selectedAddOnIds.includes(addon.id);
                        const price = billingCycle === 'yearly' ? addon.yearlyPrice : addon.monthlyPrice;
                        return (
                          <div
                            key={addon.id}
                            onClick={() => toggleAddOn(addon.id)}
                            className={`p-2.5 rounded-xl border cursor-pointer text-xs transition-all ${
                              isSelected
                                ? 'bg-blue-50 dark:bg-blue-950/60 border-[#0265DC] font-medium'
                                : 'bg-white dark:bg-[#070D1E] border-slate-200 dark:border-slate-800 hover:border-slate-300'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-1.5">
                              <span className="font-semibold text-slate-900 dark:text-white line-clamp-1">
                                {addon.name}
                              </span>
                              <div
                                className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 text-white ${
                                  isSelected ? 'bg-[#0265DC]' : 'border border-slate-300 dark:border-slate-600'
                                }`}
                              >
                                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-[11px] mt-1 text-slate-500 dark:text-slate-400">
                              <span>{currencyConfig.format(price)}/mo</span>
                              <span className="truncate max-w-[100px]">{addon.unitText}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* 3. Customer Billing Details Form */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] dark:bg-[#111C38] border border-slate-200/80 dark:border-slate-800 space-y-3.5">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Step 3: Customer Billing Information
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={customer.fullName}
                        onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                        className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#070D1E] text-slate-900 dark:text-white"
                        placeholder="e.g. Adeola Johnson"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                      Company / Organization Name
                    </label>
                    <div className="relative">
                      <Building2 className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={customer.companyName}
                        onChange={(e) => setCustomer({ ...customer, companyName: e.target.value })}
                        className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#070D1E] text-slate-900 dark:text-white"
                        placeholder="e.g. Apex Logistics Ltd"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                      Billing Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={customer.email}
                        onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                        className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#070D1E] text-slate-900 dark:text-white"
                        placeholder="finance@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                      Phone Number (for SMS &amp; Mobile Pay)
                    </label>
                    <div className="relative">
                      <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        value={customer.phone}
                        onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                        className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#070D1E] text-slate-900 dark:text-white"
                        placeholder="+234 803 249 1842"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                      Country
                    </label>
                    <div className="relative">
                      <Globe className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={customer.country}
                        onChange={(e) => setCustomer({ ...customer, country: e.target.value })}
                        className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#070D1E] text-slate-900 dark:text-white"
                        placeholder="Nigeria, Kenya, South Africa, UK..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                      Tax Identification Number (TIN / VAT ID)
                    </label>
                    <div className="relative">
                      <FileText className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={customer.taxId || ''}
                        onChange={(e) => setCustomer({ ...customer, taxId: e.target.value })}
                        className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#070D1E] text-slate-900 dark:text-white"
                        placeholder="Optional tax / TIN number"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. Payment Gateway Selector by Region */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] dark:bg-[#111C38] border border-slate-200/80 dark:border-slate-800 space-y-3.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Step 4: Select Payment Gateway by Country / Region
                    </span>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                      Pay easily via cards, bank transfer, USSD, M-Pesa, Instant EFT &amp; mobile wallets
                    </p>
                  </div>
                  {/* Gateway Search */}
                  <div className="relative w-full sm:w-48">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={gatewaySearch}
                      onChange={(e) => setGatewaySearch(e.target.value)}
                      placeholder="Search gateway..."
                      className="w-full pl-8 pr-2 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#070D1E] text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Region Tabs */}
                <div className="flex flex-wrap gap-1.5 border-b border-slate-200 dark:border-slate-700 pb-2.5 text-xs">
                  {[
                    { id: 'all', label: 'All Gateways (20)' },
                    { id: 'west-africa', label: '🇳🇬 West Africa' },
                    { id: 'east-africa', label: '🇰🇪 East Africa' },
                    { id: 'south-africa', label: '🇿🇦 South Africa' },
                    { id: 'other-africa', label: '🌍 Other African' },
                    { id: 'global', label: '🌐 Global' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setSelectedRegion(tab.id as GatewayRegion)}
                      className={`px-2.5 py-1 rounded-lg transition-colors font-semibold text-xs ${
                        selectedRegion === tab.id
                          ? 'bg-[#0265DC] text-white shadow-xs'
                          : 'bg-white dark:bg-[#070D1E] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Gateway Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-64 overflow-y-auto pr-1">
                  {filteredGateways.map((g) => {
                    const isSelected = selectedGatewayId === g.id;
                    return (
                      <div
                        key={g.id}
                        id={`gateway-select-${g.id}`}
                        onClick={() => setSelectedGatewayId(g.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'bg-blue-50/70 dark:bg-blue-950/60 border-[#0265DC] shadow-md ring-2 ring-blue-500/20'
                            : 'bg-white dark:bg-[#070D1E] border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900 dark:text-white">
                              <span className="text-base">{g.flag}</span>
                              <span>{g.name}</span>
                              {g.popular && (
                                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#A3E635] text-slate-950 font-bold">
                                  Popular
                                </span>
                              )}
                            </div>
                            <div
                              className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                isSelected
                                  ? 'border-[#0265DC] bg-[#0265DC] text-white'
                                  : 'border-slate-300 dark:border-slate-600'
                              }`}
                            >
                              {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                            </div>
                          </div>

                          <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mb-1.5">
                            {g.tagline}
                          </div>

                          <div className="text-[10px] text-slate-600 dark:text-slate-300 line-clamp-1">
                            Methods: {g.supportedMethods.slice(0, 2).join(', ')}
                          </div>
                        </div>

                        <div className="mt-2 pt-1.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                          <span>{g.regionLabel}</span>
                          <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                            {g.settlementTime}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column (5 cols): Order Summary, Promo Code, 7.5% VAT, and Checkout CTA */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-5 rounded-2xl bg-slate-900 dark:bg-[#111C38] text-white border border-slate-800 shadow-xl space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#A3E635]/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-sm uppercase tracking-wider text-slate-300">
                      Order Summary
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowCurrencyPicker(true)}
                    className="text-xs font-mono font-bold text-[#A3E635] bg-lime-950/80 hover:bg-lime-900 px-2 py-0.5 rounded-md border border-lime-500/30 flex items-center gap-1 transition-colors"
                    title="Change payment currency"
                  >
                    <span>{currencyConfig.flag}</span>
                    <span>{selectedCurrency} Invoicing</span>
                    <Globe className="w-3 h-3 text-[#A3E635]" />
                  </button>
                </div>

                {/* Prominent Payment Currency Selector Card */}
                <div className="p-3 rounded-xl bg-slate-800/90 border border-slate-700/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5 text-blue-400" />
                      <span>Payment Currency</span>
                    </span>
                    {selectedCurrency === 'NGN' ? (
                      <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                        ★ Default Currency
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleCurrencyChange('NGN')}
                        className="text-[10px] text-emerald-400 hover:underline font-semibold"
                      >
                        Reset to ₦ NGN
                      </button>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-2xl shrink-0">{currencyConfig.flag}</span>
                      <div className="min-w-0">
                        <div className="font-bold text-white text-xs sm:text-sm flex items-center gap-1.5 truncate">
                          <span>{currencyConfig.name}</span>
                          <span className="text-xs font-mono text-[#A3E635]">({currencyConfig.code})</span>
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">
                          Rate: 1 USD ≈ {currencyConfig.format(1)}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      id="order-summary-change-currency-btn"
                      onClick={() => setShowCurrencyPicker(true)}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-[#0265DC] hover:bg-[#004DB3] text-white shrink-0 shadow-xs flex items-center gap-1 transition-all active:scale-95"
                    >
                      <span>Change</span>
                      <ChevronDown className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Plan Line Item */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-bold text-white text-sm flex items-center gap-1.5">
                        <span>{currentPlan.name} Plan</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-blue-900/80 text-blue-300 border border-blue-700">
                          Qty: {multiplier} mo
                        </span>
                      </div>
                      <div className="text-slate-400 text-[11px] capitalize">
                        {billingCycle} billing cycle ({currencyConfig.format(effectiveMonthlyPlanUSD)}/mo × {multiplier})
                      </div>
                    </div>
                    <div className="font-mono font-bold text-right text-sm">
                      {currencyConfig.format(planPriceUSD)}
                    </div>
                  </div>

                  {/* Add-ons Subtotal Line */}
                  {selectedAddOns.length > 0 && (
                    <div className="pt-2 border-t border-slate-800">
                      <div className="flex items-center justify-between text-slate-300 font-semibold mb-1">
                        <span className="flex items-center gap-1.5">
                          <span>{selectedAddOns.length} Extension Module(s):</span>
                          <span className="text-[10px] font-mono text-lime-400">
                            (Qty: {multiplier} mo each)
                          </span>
                        </span>
                        <span className="font-mono">{currencyConfig.format(addOnsTotalUSD)}</span>
                      </div>
                      <div className="space-y-1 pl-2 border-l border-slate-700 text-[11px] text-slate-400">
                        {selectedAddOns.map((a) => {
                          const unitPrice = billingCycle === 'yearly' ? a.yearlyPrice : a.monthlyPrice;
                          const lineTotal = unitPrice * multiplier;
                          return (
                            <div key={a.id} className="flex justify-between items-center">
                              <span className="truncate max-w-[170px]">{a.name}</span>
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono">
                                  +{currencyConfig.format(lineTotal)}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => toggleAddOn(a.id)}
                                  className="text-slate-500 hover:text-rose-400 p-0.5"
                                  title="Remove module"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Clear cart modules link */}
                      <div className="pt-1 text-right">
                        <button
                          type="button"
                          id="summary-clear-cart-addons-btn"
                          onClick={handleClearAllAddOns}
                          className="text-[10px] text-rose-400 hover:text-rose-300 hover:underline inline-flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Clear all {selectedAddOns.length} cart add-ons</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Subtotal breakdowns with multiplier & 20% discount */}
                  <div className="pt-2 border-t border-slate-800 space-y-1">
                    <div className="flex justify-between text-slate-300 font-medium">
                      <span>Gross Base ({multiplier} month{multiplier > 1 ? 's' : ''}):</span>
                      <span className="font-mono">{currencyConfig.format(grossUndiscountedSubtotalUSD)}</span>
                    </div>

                    {billingCycle === 'yearly' && (
                      <div className="flex justify-between text-[#A3E635] font-semibold">
                        <span className="flex items-center gap-1">
                          <Percent className="w-3.5 h-3.5" />
                          <span>20% Annual Discount Savings:</span>
                        </span>
                        <span className="font-mono">-{currencyConfig.format(annualSavingsUSD)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Promo Code Input & Apply Section */}
                <div className="pt-3 border-t border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <Tag className="w-3.5 h-3.5 text-[#A3E635]" />
                      <span>Promotion Code &amp; Discount</span>
                    </span>
                    {appliedPromo && (
                      <button
                        type="button"
                        onClick={handleRemovePromo}
                        className="text-[11px] text-rose-400 hover:underline"
                      >
                        Remove Coupon
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                      placeholder="e.g. NEXTSOFT20"
                      className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 font-mono focus:outline-none focus:border-[#A3E635]"
                    />
                    <button
                      type="button"
                      onClick={() => handleApplyPromo()}
                      className="px-3.5 py-1.5 rounded-xl bg-[#A3E635] text-slate-950 font-bold text-xs hover:bg-[#84CC16] transition-colors shrink-0"
                    >
                      Apply
                    </button>
                  </div>

                  {/* Clickable suggested promo chips */}
                  <div className="flex flex-wrap gap-1.5 text-[10px]">
                    <span className="text-slate-400">Try codes:</span>
                    {VALID_PROMO_CODES.slice(0, 3).map((p) => (
                      <button
                        key={p.code}
                        type="button"
                        onClick={() => handleApplyPromo(p.code)}
                        className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[#A3E635] font-mono border border-slate-700 transition-colors"
                      >
                        {p.code} (-{p.discountPercent}%)
                      </button>
                    ))}
                  </div>

                  {promoError && (
                    <div className="text-[11px] text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{promoError}</span>
                    </div>
                  )}

                  {appliedPromo && (
                    <div className="p-2.5 rounded-xl bg-lime-950/60 border border-lime-500/40 text-xs text-[#A3E635] space-y-1">
                      <div className="flex items-center justify-between font-bold">
                        <span>Coupon {appliedPromo.code} Applied:</span>
                        <span>-{appliedPromo.discountPercent}% Off</span>
                      </div>
                      <div className="flex items-center justify-between text-white font-semibold">
                        <span>Total Amount Saved:</span>
                        <span className="font-mono text-[#A3E635]">
                          {currencyConfig.format(discountAmountUSD)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* 7.5% Exclusive VAT & Final Totals Section */}
                <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
                  {discountAmountUSD > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Promo Discount Applied:</span>
                      <span className="font-mono font-bold">-{currencyConfig.format(discountAmountUSD)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-300">
                    <span>Net Taxable Subtotal:</span>
                    <span className="font-mono font-semibold">{currencyConfig.format(taxableSubtotalUSD)}</span>
                  </div>

                  {/* 7.5% Exclusive VAT Section as Requested */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
                    <div>
                      <div className="font-bold text-white flex items-center gap-1">
                        <span>VAT (7.5% Exclusive Rate)</span>
                        <span className="text-[10px] text-slate-400 font-normal">Statutory</span>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Calculated on net taxable subscription
                      </div>
                    </div>
                    <div className="font-mono font-bold text-white text-sm">
                      +{currencyConfig.format(vatAmountUSD)}
                    </div>
                  </div>

                  {/* Dual Exact Price Display: Customers paying per month and per year */}
                  <div className="pt-2 space-y-2">
                    <div className="p-2.5 rounded-xl bg-blue-950/80 border border-blue-500/40 text-xs space-y-1">
                      <div className="flex items-center justify-between font-bold">
                        <span className="text-blue-300 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-blue-400" />
                          <span>Exact Price Per Month:</span>
                        </span>
                        <span className="font-mono text-sm text-[#A3E635]">
                          {currencyConfig.format(exactPricePerMonthUSD)}
                          <span className="text-[10px] font-sans text-slate-300">/mo</span>
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        * All-inclusive rate ({billingCycle === 'yearly' ? 'includes 20% annual discount & ' : ''}7.5% statutory VAT)
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-xs space-y-1">
                      <div className="flex items-center justify-between font-bold">
                        <span className="text-emerald-300 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Exact Price Per Year:</span>
                        </span>
                        <span className="font-mono text-sm text-[#A3E635]">
                          {currencyConfig.format(exactPricePerYearUSD)}
                          <span className="text-[10px] font-sans text-slate-300">/yr</span>
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        * 12-month all-inclusive rate (20% discount &amp; 7.5% VAT included)
                      </div>
                    </div>
                  </div>

                  {/* Final Total Line */}
                  <div className="pt-3 border-t-2 border-slate-700 flex items-baseline justify-between">
                    <div>
                      <div className="text-sm font-extrabold text-white">
                        Total Amount Due (Qty {multiplier} mo{multiplier > 1 ? 's' : ''}):
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Includes 7.5% VAT • Invoiced via {currentGateway.name}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl sm:text-2xl font-extrabold font-display text-[#A3E635]">
                        {currencyConfig.format(totalAmountUSD)}
                      </div>
                      <div className="text-[10px] font-mono text-slate-400">
                        ≈ ${totalAmountUSD.toFixed(2)} USD
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Action Buttons */}
                <div className="space-y-2 pt-2">
                  <button
                    id="checkout-pay-now-btn"
                    type="button"
                    onClick={handleProceedToPayment}
                    className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-slate-950 bg-[#A3E635] hover:bg-[#84CC16] shadow-lg shadow-lime-500/20 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
                  >
                    <span>Proceed to Pay with {currentGateway.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    id="checkout-proforma-invoice-btn"
                    type="button"
                    onClick={handleGenerateProForma}
                    className="w-full py-2.5 px-3 rounded-xl font-semibold text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Generate Pro-Forma Tax Invoice / Quote</span>
                  </button>
                </div>

                <div className="pt-2 text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Instant Receipt generated immediately upon payment confirmation.</span>
                </div>
              </div>
            </div>
          </div>
          )}
        </div>
      </div>

      {/* Gateway Simulation Modal */}
      <PaymentSimulationModal
        isOpen={showPaymentSimulation}
        onClose={() => setShowPaymentSimulation(false)}
        gateway={currentGateway}
        totalUSD={totalAmountUSD}
        currency={selectedCurrency}
        customer={customer}
        onSuccess={handlePaymentSuccess}
      />

      {/* Invoice & Receipt Modal */}
      <InvoiceReceiptModal
        isOpen={showReceiptModal}
        onClose={() => setShowReceiptModal(false)}
        invoice={generatedInvoice}
        onOpenWorkspace={() => {
          setShowReceiptModal(false);
          onClose();
        }}
      />

      {/* World Currencies Selector Modal */}
      <CurrencyPickerModal
        isOpen={showCurrencyPicker}
        onClose={() => setShowCurrencyPicker(false)}
        selectedCurrency={selectedCurrency}
        onSelectCurrency={handleCurrencyChange}
        title="Select Payment Currency"
        subtitle="Choose from all 160+ world currencies. Defaults to Nigerian Naira (₦)."
      />
    </>
  );
};
