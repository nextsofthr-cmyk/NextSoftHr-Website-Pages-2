import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  ShieldCheck,
  CheckCircle2,
  Smartphone,
  CreditCard,
  Building2,
  ArrowRight,
  Copy,
  Clock,
  ExternalLink,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { PaymentGatewayItem } from '../data/paymentGateways';
import { CurrencyCode, SubscriptionInvoice } from '../types';
import { CURRENCIES } from '../data/pricingData';

interface PaymentSimulationModalProps {
  isOpen: boolean;
  onClose: () => void;
  gateway: PaymentGatewayItem;
  totalUSD: number;
  currency: CurrencyCode;
  customer: {
    fullName: string;
    companyName: string;
    email: string;
    phone: string;
    country: string;
    taxId?: string;
  };
  onSuccess: (paymentReference: string, paymentMethodDetails: string) => void;
}

export const PaymentSimulationModal: React.FC<PaymentSimulationModalProps> = ({
  isOpen,
  onClose,
  gateway,
  totalUSD,
  currency,
  customer,
  onSuccess,
}) => {
  const currencyConfig = CURRENCIES[currency] || CURRENCIES['NGN'];
  const formattedTotal = currencyConfig.format(totalUSD);

  const [simulatedTab, setSimulatedTab] = useState<'card' | 'transfer' | 'momo' | 'eft'>('card');
  const [phoneInput, setPhoneInput] = useState(customer.phone || '0712345678');
  const [selectedBank, setSelectedBank] = useState('Capitec Pay');
  const [selectedMomoOperator, setSelectedMomoOperator] = useState('Orange Money');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'input' | 'processing' | 'approved'>('input');
  const [stkPushed, setStkPushed] = useState(false);
  const [virtualAccountCopied, setVirtualAccountCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStep('input');
      setIsProcessing(false);
      setStkPushed(false);
      // Auto-set tab based on gateway type
      if (gateway.id === 'mpesa' || gateway.type === 'mobile_money') {
        setSimulatedTab('momo');
      } else if (gateway.id === 'ozow' || gateway.type === 'instant_eft') {
        setSimulatedTab('eft');
      } else if (gateway.id === 'monnify' || gateway.id === 'transactpay') {
        setSimulatedTab('transfer');
      } else {
        setSimulatedTab('card');
      }
    }
  }, [isOpen, gateway]);

  if (!isOpen) return null;

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setStep('processing');

    setTimeout(() => {
      setStep('approved');
      setTimeout(() => {
        const ref = `${gateway.id.toUpperCase().slice(0, 4)}-${Math.floor(100000 + Math.random() * 900000)}`;
        const methodDesc =
          simulatedTab === 'momo'
            ? `Mobile Money (${gateway.name} - ${phoneInput})`
            : simulatedTab === 'eft'
            ? `Instant EFT (${selectedBank})`
            : simulatedTab === 'transfer'
            ? `Virtual Bank Transfer (${gateway.name})`
            : `Debit/Credit Card via ${gateway.name}`;
        onSuccess(ref, methodDesc);
      }, 1000);
    }, 1800);
  };

  return (
    <div
      id="payment-simulation-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="bg-white dark:bg-[#0E1730] rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden relative transition-colors">
        {/* Gateway Brand Header */}
        <div
          className="px-6 py-4 flex items-center justify-between text-white relative"
          style={{ backgroundColor: gateway.brandColor || '#0265DC' }}
        >
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">{gateway.flag}</span>
            <div>
              <div className="flex items-center gap-1.5 font-bold text-base leading-tight">
                <span>{gateway.name}</span>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-black/20 text-white">
                  Secured 256-Bit
                </span>
              </div>
              <p className="text-[11px] text-white/90 truncate max-w-[220px]">
                {gateway.tagline}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-white/80 hover:text-white hover:bg-black/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Amount to Pay Banner */}
        <div className="px-6 py-3.5 bg-slate-50 dark:bg-[#091024] border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400">Total Subscription Due:</span>
            <div className="text-xl font-extrabold text-slate-900 dark:text-white font-display">
              {formattedTotal}
            </div>
          </div>
          <div className="text-right text-[11px] text-slate-500 font-mono">
            <div>Customer: {customer.fullName}</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-semibold">{currency} Local Billing</div>
          </div>
        </div>

        {/* Gateway Interactive Content */}
        <div className="p-6">
          {step === 'processing' ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full border-4 border-[#0265DC] border-t-transparent animate-spin mx-auto" />
              <h4 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                Connecting to {gateway.name}...
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                Authorizing encrypted transaction with financial switch. Please do not close or refresh this window.
              </p>
            </div>
          ) : step === 'approved' ? (
            <div className="py-10 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto animate-in zoom-in duration-200">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                Payment Authorized!
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Generating your official tax invoice and payment receipt...
              </p>
            </div>
          ) : (
            <div>
              {/* Method Tabs if gateway supports multiple types */}
              <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800/80 p-1 mb-5 text-xs font-semibold">
                {gateway.type === 'card' && (
                  <button
                    onClick={() => setSimulatedTab('card')}
                    className={`flex-1 py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1 ${
                      simulatedTab === 'card'
                        ? 'bg-white dark:bg-[#0E1730] text-slate-900 dark:text-white shadow-xs font-bold'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Card</span>
                  </button>
                )}

                {(gateway.region === 'west-africa' || gateway.id === 'monnify' || gateway.id === 'transactpay') && (
                  <button
                    onClick={() => setSimulatedTab('transfer')}
                    className={`flex-1 py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1 ${
                      simulatedTab === 'transfer'
                        ? 'bg-white dark:bg-[#0E1730] text-slate-900 dark:text-white shadow-xs font-bold'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Bank Transfer</span>
                  </button>
                )}

                {(gateway.type === 'mobile_money' || gateway.id === 'mpesa' || gateway.region === 'east-africa' || gateway.region === 'other-africa') && (
                  <button
                    onClick={() => setSimulatedTab('momo')}
                    className={`flex-1 py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1 ${
                      simulatedTab === 'momo'
                        ? 'bg-white dark:bg-[#0E1730] text-slate-900 dark:text-white shadow-xs font-bold'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Mobile Money</span>
                  </button>
                )}

                {(gateway.id === 'ozow' || gateway.id === 'transactpay-sa') && (
                  <button
                    onClick={() => setSimulatedTab('eft')}
                    className={`flex-1 py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1 ${
                      simulatedTab === 'eft'
                        ? 'bg-white dark:bg-[#0E1730] text-slate-900 dark:text-white shadow-xs font-bold'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Instant EFT</span>
                  </button>
                )}
              </div>

              {/* Tab 1: Card Simulation */}
              {simulatedTab === 'card' && (
                <div className="space-y-3.5 text-xs">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                      Card Number
                    </label>
                    <div className="relative">
                      <CreditCard className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        readOnly
                        value="5399 •••• •••• 4242"
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 font-mono text-slate-800 dark:text-slate-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                        Expires
                      </label>
                      <input
                        type="text"
                        readOnly
                        value="12 / 28"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 font-mono text-slate-800 dark:text-slate-200 text-center"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                        CVV / CVC
                      </label>
                      <input
                        type="password"
                        readOnly
                        value="•••"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 font-mono text-slate-800 dark:text-slate-200 text-center"
                      />
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 text-[11px] text-slate-600 dark:text-slate-300 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#0265DC] shrink-0" />
                    <span>3D Secure verification active. Card authorization via {gateway.name} token switch.</span>
                  </div>
                </div>
              )}

              {/* Tab 2: Bank Transfer (Monnify / TransactPay / Paystack Transfer) */}
              {simulatedTab === 'transfer' && (
                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200">
                    <div className="flex items-center gap-1.5 font-bold mb-1">
                      <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                      <span>Dynamic Virtual Account (Expires in 15:00)</span>
                    </div>
                    <p className="text-[11px] text-amber-800 dark:text-amber-300">
                      Transfer exactly <strong className="font-mono">{formattedTotal}</strong> to the generated account below. It will automatically reconcile in real-time.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Bank Name:</span>
                      <span className="font-bold text-slate-900 dark:text-white">Wema Bank / NextSofthr Checkout</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Account Number:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-extrabold text-base text-slate-900 dark:text-white">
                          9928104821
                        </span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText('9928104821');
                            setVirtualAccountCopied(true);
                            setTimeout(() => setVirtualAccountCopied(false), 2000);
                          }}
                          className="p-1 rounded text-slate-500 hover:text-slate-900 dark:hover:text-white"
                          title="Copy account number"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Beneficiary:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">NextSofthr Subscriptions</span>
                    </div>
                  </div>
                  {virtualAccountCopied && (
                    <div className="text-[11px] text-emerald-600 dark:text-emerald-400 text-center font-semibold">
                      ✓ Account number copied to clipboard!
                    </div>
                  )}
                </div>
              )}

              {/* Tab 3: Mobile Money / M-Pesa STK Push / CinetPay / FedaPay */}
              {simulatedTab === 'momo' && (
                <div className="space-y-3.5 text-xs">
                  {gateway.id === 'mpesa' ? (
                    <div>
                      <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 mb-3">
                        <div className="font-bold flex items-center gap-1.5 mb-1">
                          <Smartphone className="w-4 h-4 text-emerald-600" />
                          <span>Lipa Na M-Pesa Online (STK Push)</span>
                        </div>
                        <p className="text-[11px] leading-relaxed">
                          A direct PIN prompt will be sent to your Safaricom line. Enter your secret M-Pesa PIN to complete payment.
                        </p>
                      </div>

                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                        Safaricom Phone Number
                      </label>
                      <div className="relative">
                        <Smartphone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={phoneInput}
                          onChange={(e) => setPhoneInput(e.target.value)}
                          placeholder="e.g. 0712 345 678"
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                        Select Mobile Money Operator
                      </label>
                      <select
                        value={selectedMomoOperator}
                        onChange={(e) => setSelectedMomoOperator(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white mb-3"
                      >
                        <option value="Orange Money">Orange Money</option>
                        <option value="MTN MoMo">MTN Mobile Money (MoMo)</option>
                        <option value="Moov Money">Moov Africa Money</option>
                        <option value="Wave">Wave Mobile Money</option>
                        <option value="Airtel Money">Airtel Money</option>
                        <option value="EcoCash">EcoCash (Zimbabwe)</option>
                      </select>

                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                        Mobile Wallet Number
                      </label>
                      <div className="relative">
                        <Smartphone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={phoneInput}
                          onChange={(e) => setPhoneInput(e.target.value)}
                          placeholder="+225 07 12 34 56"
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                        />
                      </div>
                    </div>
                  )}

                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-[11px] text-slate-500">
                    Prompt dispatched via {gateway.name} merchant channel with zero surcharge.
                  </div>
                </div>
              )}

              {/* Tab 4: Instant EFT (Ozow / Peach / Yoco) */}
              {simulatedTab === 'eft' && (
                <div className="space-y-3 text-xs">
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    Select Your South African Bank
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Capitec Pay', 'FNB / RMB', 'ABSA Bank', 'Standard Bank', 'Nedbank', 'TymeBank'].map(
                      (bank) => (
                        <button
                          key={bank}
                          type="button"
                          onClick={() => setSelectedBank(bank)}
                          className={`p-2.5 rounded-xl border text-left font-semibold transition-all ${
                            selectedBank === bank
                              ? 'border-[#0265DC] bg-blue-50 dark:bg-blue-950/60 text-[#0265DC] dark:text-blue-300 shadow-xs ring-1 ring-blue-500/30'
                              : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5 text-slate-400" />
                            <span className="truncate">{bank}</span>
                          </div>
                        </button>
                      )
                    )}
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-[11px] text-slate-500">
                    Instant EFT via {gateway.name}. Requires approval on your mobile banking app.
                  </div>
                </div>
              )}

              {/* Action Button */}
              <button
                id="execute-simulated-payment-btn"
                type="button"
                onClick={handleSimulatePayment}
                className="w-full mt-6 py-3 px-4 rounded-xl font-bold text-sm text-slate-950 bg-[#A3E635] hover:bg-[#84CC16] shadow-md shadow-lime-500/20 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
              >
                <span>Authorize &amp; Pay {formattedTotal}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="mt-3 flex items-center justify-center gap-1 text-[11px] text-slate-400">
                <Lock className="w-3 h-3" />
                <span>Simulated Secure Gateway Sandbox • PCI-DSS Level 1 Compliant</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
