import React, { useState, useEffect } from 'react';
import { 
  X, 
  CreditCard, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Building2, 
  Globe, 
  Lock, 
  ArrowRight, 
  Check, 
  Download, 
  Printer, 
  Smartphone, 
  Banknote, 
  Zap, 
  Clock,
  HelpCircle,
  Briefcase,
  Users,
  Target
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

export type PaymentRegion = 'west-africa' | 'east-africa' | 'south-africa' | 'other-africa' | 'global';
export type UserPersona = 'employer' | 'recruiter' | 'headhunter' | 'candidate';

export interface GatewayOption {
  id: string;
  name: string;
  region: PaymentRegion;
  logoText: string;
  badge?: string;
  methods: string[];
  currencies: string[];
  popularCountries: string;
  description: string;
}

export const REGIONAL_GATEWAYS: Record<PaymentRegion, GatewayOption[]> = {
  'west-africa': [
    {
      id: 'paystack-ng',
      name: 'Paystack',
      region: 'west-africa',
      logoText: 'Paystack',
      badge: 'Most Popular',
      methods: ['Debit / Credit Card', 'Bank Transfer', 'USSD (*737#, *894#)', 'Apple Pay'],
      currencies: ['NGN', 'GHS', 'USD'],
      popularCountries: 'Nigeria, Ghana',
      description: 'Instant automated settlements via Nigerian Inter-Bank Settlement System (NIBSS) and cards.'
    },
    {
      id: 'flutterwave-wa',
      name: 'Flutterwave Pay',
      region: 'west-africa',
      logoText: 'Flutterwave',
      badge: 'Pan-African Switch',
      methods: ['Card', 'Mobile Money', 'Direct Bank Debit', 'Barter'],
      currencies: ['NGN', 'GHS', 'XOF', 'USD', 'GBP'],
      popularCountries: 'Nigeria, Ghana, Senegal, Ivory Coast',
      description: 'Comprehensive multi-currency payment processing across ECOWAS with smart routing.'
    },
    {
      id: 'transactpay-wa',
      name: 'Transact Pay',
      region: 'west-africa',
      logoText: 'TransactPay',
      badge: 'Direct Corporate',
      methods: ['Direct Bank Clearing', 'Instant Corporate Wire', 'Virtual NUBAN Accounts'],
      currencies: ['NGN', 'GHS', 'USD'],
      popularCountries: 'Nigeria, West Africa',
      description: 'Specialized enterprise payment clearing and commercial treasury rails.'
    },
    {
      id: 'monnify',
      name: 'Monnify (Moniepoint)',
      region: 'west-africa',
      logoText: 'Monnify',
      badge: 'Lowest Transfer Fees',
      methods: ['Instant Account Transfer', 'Debit Cards', 'USSD Codes'],
      currencies: ['NGN'],
      popularCountries: 'Nigeria',
      description: 'Automated virtual bank accounts powered by Moniepoint MFB with sub-second verification.'
    }
  ],
  'east-africa': [
    {
      id: 'mpesa',
      name: 'M-Pesa (Safaricom)',
      region: 'east-africa',
      logoText: 'M-PESA',
      badge: 'East Africa Leader',
      methods: ['STK Push Prompt', 'Paybill Number', 'Lipa Na M-Pesa'],
      currencies: ['KES', 'TZS', 'UGX', 'USD'],
      popularCountries: 'Kenya, Tanzania, Uganda',
      description: 'Direct mobile wallet billing. Enter your Safaricom mobile number for an instant SIM prompt.'
    },
    {
      id: 'peach-payments-ea',
      name: 'Peach Payments',
      region: 'east-africa',
      logoText: 'Peach Payments',
      badge: 'Enterprise Gateway',
      methods: ['Visa / Mastercard', 'M-Pesa', 'EFT', '1Voucher'],
      currencies: ['KES', 'ZAR', 'USD'],
      popularCountries: 'Kenya, Rwanda, Mauritius',
      description: 'Seamless checkout orchestration and enterprise fraud protection for East & Southern Africa.'
    },
    {
      id: 'dpo-pay',
      name: 'DPO Pay (Network International)',
      region: 'east-africa',
      logoText: 'DPO Pay',
      badge: 'Cross-Border',
      methods: ['Cards', 'Airtel Money', 'MTN Mobile Money', 'M-Pesa'],
      currencies: ['KES', 'UGX', 'TZS', 'RWF', 'USD'],
      popularCountries: 'Kenya, Uganda, Tanzania, Rwanda',
      description: 'Multi-country mobile money and corporate card processing backed by Network International.'
    },
    {
      id: 'paystack-ea',
      name: 'Paystack (East Africa)',
      region: 'east-africa',
      logoText: 'Paystack EA',
      methods: ['M-Pesa', 'Local Visa / Mastercard', 'Bank Transfer'],
      currencies: ['KES', 'USD'],
      popularCountries: 'Kenya',
      description: 'Modern developer-friendly payment checkout for Kenyan Shilling and international cards.'
    }
  ],
  'south-africa': [
    {
      id: 'paystack-za',
      name: 'Paystack (South Africa)',
      region: 'south-africa',
      logoText: 'Paystack ZA',
      badge: 'Card & EFT',
      methods: ['ZAR Cards', 'Mastercard', 'Visa', 'Scan to Pay'],
      currencies: ['ZAR', 'USD'],
      popularCountries: 'South Africa',
      description: 'Fast, secure card payments processed in South African Rand (ZAR) with 3D Secure.'
    },
    {
      id: 'yoco',
      name: 'Yoco Payments',
      region: 'south-africa',
      logoText: 'Yoco',
      badge: 'SA Favorite',
      methods: ['Debit / Credit Card', 'Instant EFT', 'Apple Pay'],
      currencies: ['ZAR'],
      popularCountries: 'South Africa',
      description: 'South Africa’s premier payment platform with 99.9% uptime for local Visa and Mastercards.'
    },
    {
      id: 'pesapal-sa',
      name: 'Pesapal',
      region: 'south-africa',
      logoText: 'Pesapal',
      methods: ['Visa / Mastercard', 'Electronic Funds Transfer', 'Mobile Money'],
      currencies: ['ZAR', 'KES', 'USD'],
      popularCountries: 'South Africa, Zimbabwe, SADC',
      description: 'Regional payment infrastructure connecting Southern and Eastern African banking rails.'
    },
    {
      id: 'transactpay-sa',
      name: 'Transact Pay (South Africa)',
      region: 'south-africa',
      logoText: 'TransactPay SA',
      methods: ['Bank Automated Clearing', 'Corporate EFT', 'Debit Order'],
      currencies: ['ZAR'],
      popularCountries: 'South Africa',
      description: 'Direct integration with South African Reserve Bank (SARB) National Payment System.'
    },
    {
      id: 'ozow',
      name: 'Ozow (Instant EFT)',
      region: 'south-africa',
      logoText: 'Ozow',
      badge: 'Instant Bank EFT',
      methods: ['Capitec', 'FNB', 'Absa', 'Standard Bank', 'Nedbank', 'TymeBank', 'Investec'],
      currencies: ['ZAR'],
      popularCountries: 'South Africa',
      description: 'Zero card fees. Authorize directly from your South African bank app with instant confirmation.'
    }
  ],
  'other-africa': [
    {
      id: 'fedapay',
      name: 'FedaPay',
      region: 'other-africa',
      logoText: 'FedaPay',
      badge: 'Francophone WAEMU',
      methods: ['MTN Mobile Money', 'Moov Money', 'Visa / Mastercard'],
      currencies: ['XOF', 'USD'],
      popularCountries: 'Benin, Togo, Ivory Coast, Senegal',
      description: 'Leading mobile money aggregator for Francophone West Africa with instant SMS confirmations.'
    },
    {
      id: 'cinetpay',
      name: 'CinetPay',
      region: 'other-africa',
      logoText: 'CinetPay',
      badge: 'Central & West Africa',
      methods: ['Orange Money', 'MTN MoMo', 'Moov', 'Wave', 'Free Money'],
      currencies: ['XOF', 'XAF', 'GNF', 'USD'],
      popularCountries: 'Ivory Coast, Cameroon, Senegal, Mali, Guinea, DRC',
      description: 'Unified mobile money switch covering 10+ Francophone African countries seamlessly.'
    },
    {
      id: 'ligdicash',
      name: 'LigdiCash',
      region: 'other-africa',
      logoText: 'LigdiCash',
      methods: ['Orange Money Burkina', 'Moov Africa', 'Digital Wallets'],
      currencies: ['XOF'],
      popularCountries: 'Burkina Faso, Mali, Niger',
      description: 'Local digital wallet and payment gateway specialized in Sahelian and WAEMU markets.'
    },
    {
      id: 'payfort',
      name: 'Payfort (Amazon Payment Services)',
      region: 'other-africa',
      logoText: 'Payfort',
      badge: 'North Africa & MENA',
      methods: ['Meeza (Egypt)', 'Fawry', 'ValU Buy-Now-Pay-Later', 'Cards'],
      currencies: ['EGP', 'AED', 'USD'],
      popularCountries: 'Egypt, Morocco, UAE, Tunisia',
      description: 'Enterprise payment infrastructure powered by Amazon for North African currencies and Meeza cards.'
    },
    {
      id: 'paynow-zw',
      name: 'Paynow',
      region: 'other-africa',
      logoText: 'Paynow ZW',
      badge: 'Zimbabwe Hub',
      methods: ['EcoCash', 'OneMoney', 'Telecash', 'Zimswitch', 'Visa / Mastercard'],
      currencies: ['ZIP', 'USD'],
      popularCountries: 'Zimbabwe',
      description: 'Zimbabwe’s national payment switch accepting EcoCash and local RTGS / ZiG bank transfers.'
    }
  ],
  'global': [
    {
      id: 'stripe',
      name: 'Stripe',
      region: 'global',
      logoText: 'Stripe',
      badge: 'Global Standard',
      methods: ['Visa / Mastercard / Amex', 'Apple Pay', 'Google Pay', 'SEPA Direct Debit'],
      currencies: ['USD', 'EUR', 'GBP', 'CAD', 'AUD'],
      popularCountries: 'United States, United Kingdom, European Union, Canada',
      description: 'World-class payment platform supporting 135+ currencies with automated recurring billing.'
    },
    {
      id: 'razorpay',
      name: 'Razorpay',
      region: 'global',
      logoText: 'Razorpay',
      badge: 'Asia & Global',
      methods: ['International Cards', 'UPI Payments', 'NetBanking', 'Wallets'],
      currencies: ['USD', 'EUR', 'GBP', 'INR'],
      popularCountries: 'India, Singapore, Southeast Asia & Global',
      description: 'High-speed payment checkout with smart fallback routing and international card acceptance.'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      region: 'global',
      logoText: 'PayPal',
      badge: 'Trusted Global',
      methods: ['PayPal Balance', 'Linked Bank Account', 'Credit / Debit Cards'],
      currencies: ['USD', 'EUR', 'GBP', 'CAD', 'AUD'],
      popularCountries: 'Worldwide (200+ countries)',
      description: 'Pay securely with your PayPal account or credit card with comprehensive buyer protection.'
    },
    {
      id: 'mollie',
      name: 'Mollie',
      region: 'global',
      logoText: 'Mollie',
      badge: 'European Leader',
      methods: ['iDEAL (Netherlands)', 'Bancontact (Belgium)', 'Sofort / Klarna', 'SEPA Bank Transfer'],
      currencies: ['EUR', 'GBP', 'USD'],
      popularCountries: 'Netherlands, Belgium, Germany, France, EU',
      description: 'Europe’s fastest growing payment solution with localized European domestic payment schemes.'
    },
    {
      id: 'twocheckout',
      name: '2Checkout (Verifone)',
      region: 'global',
      logoText: '2Checkout',
      badge: 'Merchant of Record',
      methods: ['Global Cards', 'Direct Debit', 'Local Wire Transfers', 'PayPal'],
      currencies: ['USD', 'EUR', 'GBP', 'ZAR', 'NGN', 'KES'],
      popularCountries: 'Global Cross-Border (200+ countries)',
      description: 'Global monetization and sales tax/VAT compliance platform managing worldwide subscriptions.'
    }
  ]
};

// Pricing Tiers based on Persona
export const SUBSCRIPTION_TIERS = {
  candidate: [
    {
      id: 'cand-basic',
      name: 'Basic Talent',
      popular: false,
      monthlyPriceUSD: 0,
      annualDiscountPercent: 0,
      features: [
        '5 Job Applications / month',
        'Mock NLP Resume Parser & Data Extraction',
        'Standard Job Alerts (Weekly Email Digest)',
        'Public Job Board Access & Application Tracking',
        'Standard Verified Candidate Profile'
      ]
    },
    {
      id: 'cand-pro',
      name: 'Talent Pro',
      popular: true,
      monthlyPriceUSD: 12,
      annualDiscountPercent: 20,
      features: [
        'Unlimited Job Applications Across All 12 Categories',
        '🌟 Featured Candidate Badge on Recruiter Search & Heatmap',
        'AI Personalized Interview Prep Tailored to Active Applications',
        'Direct Real-Time Messaging with Recruiters & Hiring Managers',
        'AI Salary Negotiation & Real-Time Benchmark Simulator',
        'Verified Skill Credential Badges (CIPM, AWS, React, etc.)',
        'Instant Match Push & WhatsApp Job Alerts'
      ]
    },
    {
      id: 'cand-executive',
      name: 'Executive VIP Mandate',
      popular: false,
      monthlyPriceUSD: 35,
      annualDiscountPercent: 20,
      features: [
        'Everything in Talent Pro',
        '1-on-1 CV & LinkedIn Overhaul by NextSoftHR Senior HRBP',
        'Guaranteed Recruiter Interview Screening within 14 Days',
        'Direct C-Suite & Headhunter Referral Network Access',
        'Executive Search Placement Fee Coverage',
        'Priority Interview Calendar Rescheduling Support'
      ]
    }
  ],
  employer: [
    {
      id: 'emp-growth',
      name: 'Talent Growth',
      monthlyPriceUSD: 59,
      annualDiscountPercent: 20,
      features: [
        '5 Active Job Vacancies',
        'Direct Candidate Sourcing (50 InMails/mo)',
        'Verified Skills Badge Inspection',
        'Basic Candidate Dashboard Access',
        'Standard Email Support'
      ]
    },
    {
      id: 'emp-enterprise',
      name: 'Corporate Enterprise',
      popular: true,
      monthlyPriceUSD: 149,
      annualDiscountPercent: 20,
      features: [
        'Unlimited Active Job Vacancies',
        'Unlimited Talent Pool Sourcing & Direct Messaging',
        'AI Interview Scheduler & Feedback Analytics',
        'Automated ATS Integration & Candidate CSV Export',
        'Custom Company Showcase Profile & Diversity Radar',
        'Dedicated Talent Partner Account Manager'
      ]
    }
  ],
  recruiter: [
    {
      id: 'rec-starter',
      name: 'Agency Recruiter Suite',
      monthlyPriceUSD: 89,
      annualDiscountPercent: 20,
      features: [
        '15 Concurrent Client Talent Pipelines',
        'Full Talent Search Pool Access (Pan-African)',
        'Candidate Notes & Shortlist Bookmarking',
        'Recruiter Candidate Experience Insights Tab',
        'Multi-User Team Seat (Up to 3 recruiters)'
      ]
    },
    {
      id: 'rec-unlimited',
      name: 'Global Agency Scaler',
      popular: true,
      monthlyPriceUSD: 199,
      annualDiscountPercent: 20,
      features: [
        'Unlimited Client Vacancies & Multi-Org Hiring',
        'Priority Talent Match Delivery to WhatsApp & Slack',
        'White-Label Candidate Presentation Decks',
        'Direct Candidate Calendar Interop (Google/Outlook)',
        'Bulk CSV Export & Full API Access Keys',
        'Dedicated 24/7 Priority Support Desk'
      ]
    }
  ],
  headhunter: [
    {
      id: 'head-executive',
      name: 'Executive Search Pro',
      popular: true,
      monthlyPriceUSD: 249,
      annualDiscountPercent: 20,
      features: [
        'Stealth & Confidential C-Suite Vacancy Postings',
        'Passive Executive Talent Radar & Directory',
        'Compensation Benchmarking & Salary Heatmap Tool',
        'Pre-Vetted Board & Director Candidate Network',
        'White-Glove Executive Concierge & Talent Advisory'
      ]
    }
  ]
};

interface RegionalPaymentGatewayModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPersona?: UserPersona;
  initialPlanId?: string;
  onSubscriptionSuccess?: (planName: string, persona: UserPersona, gateway: string, txRef: string) => void;
  onToast?: (message: string) => void;
}

export const RegionalPaymentGatewayModal: React.FC<RegionalPaymentGatewayModalProps> = ({
  isOpen,
  onClose,
  initialPersona = 'employer',
  initialPlanId,
  onSubscriptionSuccess,
  onToast
}) => {
  const { currentCurrency, convertAmount, formatCurrencyAmount } = useCurrency();

  const [selectedPersona, setSelectedPersona] = useState<UserPersona>(initialPersona);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [selectedPlanId, setSelectedPlanId] = useState<string>(() => {
    if (initialPlanId) return initialPlanId;
    const personaTiers = SUBSCRIPTION_TIERS[initialPersona] || SUBSCRIPTION_TIERS.employer;
    return personaTiers[0]?.id || 'emp-growth';
  });

  useEffect(() => {
    setSelectedPersona(initialPersona);
    const personaTiers = SUBSCRIPTION_TIERS[initialPersona] || SUBSCRIPTION_TIERS.employer;
    if (initialPlanId && personaTiers.some(t => t.id === initialPlanId)) {
      setSelectedPlanId(initialPlanId);
    } else {
      setSelectedPlanId(personaTiers[0]?.id || 'emp-growth');
    }
  }, [initialPersona, initialPlanId]);
  
  // Payment Gateway Selection
  const [selectedRegion, setSelectedRegion] = useState<PaymentRegion>('west-africa');
  const [selectedGatewayId, setSelectedGatewayId] = useState<string>('paystack-ng');
  
  // Form input details
  const [companyName, setCompanyName] = useState('Acme Africa Technologies Ltd');
  const [billingEmail, setBillingEmail] = useState('finance@acme-africa.tech');
  const [mpesaPhone, setMpesaPhone] = useState('+254 712 345 678');
  const [cardHolder, setCardHolder] = useState('Adaeze Okonkwo');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [selectedBank, setSelectedBank] = useState('Capitec Bank');

  // Checkout Processing States
  const [processingState, setProcessingState] = useState<'idle' | 'authenticating' | 'switch-handshake' | 'confirmed'>('idle');
  const [txReceipt, setTxReceipt] = useState<{
    reference: string;
    amountFormatted: string;
    gateway: string;
    planName: string;
    date: string;
    nextBillingDate: string;
  } | null>(null);

  if (!isOpen) return null;

  // Selected plan calculation
  const plansForPersona = SUBSCRIPTION_TIERS[selectedPersona];
  const activePlan = plansForPersona.find(p => p.id === selectedPlanId) || plansForPersona[0];

  const rawMonthlyPrice = activePlan ? activePlan.monthlyPriceUSD : 59;
  const calculatedPriceUSD = billingCycle === 'annual' 
    ? (rawMonthlyPrice * 0.80) 
    : rawMonthlyPrice;

  // Convert to user's localized active currency
  const localizedAmount = convertAmount(calculatedPriceUSD, 'USD', currentCurrency);
  const localizedAmountFormatted = formatCurrencyAmount(localizedAmount, currentCurrency);

  const gatewaysInRegion = REGIONAL_GATEWAYS[selectedRegion];
  const activeGateway = gatewaysInRegion.find(g => g.id === selectedGatewayId) || gatewaysInRegion[0];

  const handleRegionChange = (reg: PaymentRegion) => {
    setSelectedRegion(reg);
    const firstGateway = REGIONAL_GATEWAYS[reg][0];
    if (firstGateway) {
      setSelectedGatewayId(firstGateway.id);
    }
  };

  const handlePayNow = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessingState('authenticating');

    setTimeout(() => {
      setProcessingState('switch-handshake');

      setTimeout(() => {
        const generatedTxRef = `NX-${activeGateway.name.toUpperCase().slice(0, 3)}-${Date.now().toString().slice(-7)}`;
        const receipt = {
          reference: generatedTxRef,
          amountFormatted: localizedAmountFormatted,
          gateway: activeGateway.name,
          planName: activePlan.name,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        };

        setTxReceipt(receipt);
        setProcessingState('confirmed');

        if (onSubscriptionSuccess) {
          onSubscriptionSuccess(activePlan.name, selectedPersona, activeGateway.name, generatedTxRef);
        }
        if (onToast) {
          onToast(`✓ Payment approved via ${activeGateway.name}! Subscription activated for ${companyName}.`);
        }
      }, 900);
    }, 700);
  };

  const handlePrintReceipt = () => {
    window.print();
    if (onToast) onToast('Printing subscription tax invoice receipt...');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/80 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-5xl max-h-[95vh] flex flex-col overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-[#142B4A] dark:bg-[#070e1b] text-white px-6 py-4 flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-lime-500 text-slate-950 flex items-center justify-center font-bold shadow-md">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white">
                  Pan-African & Global Payment Gateways
                </h2>
                <span className="text-[10px] bg-lime-500 text-slate-950 font-black px-2 py-0.5 rounded-full">
                  Multi-Currency Billing
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Seamless local checkout across Nigeria, East Africa, South Africa, Francophone Africa, and Worldwide.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">

          {/* If Transaction Confirmed: Show Receipt View */}
          {processingState === 'confirmed' && txReceipt ? (
            <div className="max-w-xl mx-auto space-y-6 animate-in fade-in duration-200">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  Subscription Payment Successful!
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Your {selectedPersona === 'candidate' ? 'candidate' : 'corporate'} plan is active. A formal receipt and confirmation have been sent to <strong className="text-slate-800 dark:text-white">{billingEmail}</strong>.
                </p>
              </div>

              {/* Official Tax Invoice Card */}
              <div id="payment-receipt-print" className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-4 text-xs font-sans">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
                  <div>
                    <span className="font-extrabold text-sm text-[#142B4A] dark:text-white block">NextSoftHR Pan-African Talent Engine</span>
                    <span className="text-[10px] text-slate-400 font-mono">Invoice Reference: {txReceipt.reference}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    PAID / SETTLED
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-[11px]">
                  <div>
                    <span className="text-slate-400 block">{selectedPersona === 'candidate' ? 'Candidate Subscriber:' : 'Subscriber Organization:'}</span>
                    <strong className="text-slate-800 dark:text-white font-bold">{companyName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Billing Target Role:</span>
                    <strong className="text-slate-800 dark:text-white font-bold uppercase">{selectedPersona}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Payment Gateway Switch:</span>
                    <strong className="text-blue-600 dark:text-blue-400 font-bold">{txReceipt.gateway}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Transaction Date:</span>
                    <strong className="text-slate-800 dark:text-white font-bold">{txReceipt.date}</strong>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-800 dark:text-white block">{txReceipt.planName}</span>
                    <span className="text-[10px] text-slate-500">Next renewal date: {txReceipt.nextBillingDate}</span>
                  </div>
                  <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                    {txReceipt.amountFormatted}
                  </span>
                </div>

                <div className="pt-2 text-[10px] text-slate-400 flex items-center justify-between">
                  <span>VAT Status: 7.5% Included</span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-lime-600" />
                    <span>PCI-DSS Level 1 Encrypted Rails</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handlePrintReceipt}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs shadow-xs cursor-pointer"
                >
                  Return to Workspace
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* STEP 1: Select User Audience & Plan */}
              <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-blue-600" />
                      <span>1. Select Subscription Track & Tier</span>
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {selectedPersona === 'candidate'
                        ? 'Accelerate your career search with AI interview prep, verified skill badges, and direct recruiter messaging.'
                        : 'Tailored packages designed specifically for corporate employers, recruitment process agencies, and executive headhunters.'}
                    </p>
                  </div>

                  {/* Persona Switcher */}
                  <div className="flex items-center gap-1 p-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl overflow-x-auto">
                    {[
                      { id: 'candidate', label: '👤 Candidate Plans' },
                      { id: 'employer', label: '🏢 Employers' },
                      { id: 'recruiter', label: '🤝 Recruiters' },
                      { id: 'headhunter', label: '🎯 Headhunters' }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => {
                          setSelectedPersona(tab.id as any);
                          const firstPlan = SUBSCRIPTION_TIERS[tab.id as UserPersona][0];
                          if (firstPlan) setSelectedPlanId(firstPlan.id);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                          selectedPersona === tab.id
                            ? 'bg-[#142B4A] dark:bg-blue-600 text-white shadow-xs'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Billing Cycle Toggle */}
                <div className="flex items-center justify-end gap-2 text-xs">
                  <span className={`font-semibold ${billingCycle === 'monthly' ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>
                    Monthly
                  </span>
                  <button
                    type="button"
                    onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'annual' : 'monthly')}
                    className="w-10 h-5 rounded-full bg-blue-600 p-0.5 transition-colors cursor-pointer flex items-center"
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${billingCycle === 'annual' ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                  <span className={`font-semibold flex items-center gap-1 ${billingCycle === 'annual' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-500'}`}>
                    <span>Annual</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-extrabold">Save 20%</span>
                  </span>
                </div>

                {/* Plan Tier Cards */}
                <div className={`grid grid-cols-1 gap-3 ${plansForPersona.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
                  {plansForPersona.map((plan) => {
                    const isSelected = selectedPlanId === plan.id;
                    const isFree = plan.monthlyPriceUSD === 0;
                    const planPriceUSD = isFree ? 0 : (billingCycle === 'annual' ? plan.monthlyPriceUSD * 0.8 : plan.monthlyPriceUSD);
                    const planPriceLocal = isFree 
                      ? 'FREE' 
                      : formatCurrencyAmount(convertAmount(planPriceUSD, 'USD', currentCurrency), currentCurrency);

                    return (
                      <div
                        key={plan.id}
                        onClick={() => setSelectedPlanId(plan.id)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-3 relative flex flex-col justify-between ${
                          isSelected
                            ? 'bg-blue-50/60 dark:bg-blue-950/40 border-blue-500 ring-2 ring-blue-500/20 shadow-xs'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {plan.popular && (
                          <span className="absolute top-3 right-3 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-lime-400 text-slate-950">
                            Recommended
                          </span>
                        )}

                        <div>
                          <div className="flex items-center justify-between pr-20">
                            <div>
                              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                                {plan.name}
                              </h4>
                              <div className="flex items-baseline gap-1 mt-0.5">
                                <span className={`text-xl font-black ${isFree ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'}`}>
                                  {planPriceLocal}
                                </span>
                                {!isFree && <span className="text-[10px] text-slate-500">/ month</span>}
                                {isFree && <span className="text-[10px] text-slate-500">/ forever free</span>}
                              </div>
                            </div>
                          </div>

                          <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800 mt-2">
                            {plan.features.map((feat, i) => (
                              <li key={i} className="flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* STEP 2: Regional Payment Gateway Selector */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <Globe className="w-4 h-4 text-emerald-600" />
                    <span>2. Select Country / Region & Payment Gateway</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    NextSoftHR dynamically routes payments through verified national switches and international rails.
                  </p>
                </div>

                {/* Region Tabs */}
                <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-x-auto text-xs font-bold">
                  {[
                    { id: 'west-africa', label: '🇳🇬 Nigeria & West Africa' },
                    { id: 'east-africa', label: '🇰🇪 East Africa' },
                    { id: 'south-africa', label: '🇿🇦 South Africa' },
                    { id: 'other-africa', label: '🌍 Other African Countries' },
                    { id: 'global', label: '🌐 Global & International' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => handleRegionChange(tab.id as PaymentRegion)}
                      className={`px-3 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                        selectedRegion === tab.id
                          ? 'bg-[#142B4A] dark:bg-blue-600 text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Gateway Cards Grid for Active Region */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {gatewaysInRegion.map((gw) => {
                    const isSelected = selectedGatewayId === gw.id;

                    return (
                      <div
                        key={gw.id}
                        onClick={() => setSelectedGatewayId(gw.id)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 relative flex flex-col justify-between ${
                          isSelected
                            ? 'bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                        }`}
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="font-black text-sm text-slate-900 dark:text-white">
                              {gw.name}
                            </span>
                            {gw.badge && (
                              <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                                {gw.badge}
                              </span>
                            )}
                          </div>

                          <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                            {gw.description}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1 text-[10px]">
                          <div className="flex flex-wrap gap-1 text-slate-600 dark:text-slate-300">
                            {gw.methods.slice(0, 2).map((m, i) => (
                              <span key={i} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                                {m}
                              </span>
                            ))}
                            {gw.methods.length > 2 && (
                              <span className="px-1 py-0.5 text-slate-400">+{gw.methods.length - 2}</span>
                            )}
                          </div>
                          <span className="text-slate-400 block truncate">
                            📍 {gw.popularCountries}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* STEP 3: Payment Method Details Form */}
              <form onSubmit={handlePayNow} className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4 text-xs">
                <div>
                  <h4 className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>3. Billing Information & Checkout ({activeGateway.name})</span>
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Payment securely routed via {activeGateway.name} encrypted gateway.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      {selectedPersona === 'candidate' ? 'Candidate Full Name *' : 'Company / Organization *'}
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder={selectedPersona === 'candidate' ? 'e.g. Adaeze Okonkwo' : 'e.g. Acme Africa Technologies Ltd'}
                      required
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      {selectedPersona === 'candidate' ? 'Candidate Email (for Confirmations) *' : 'Billing Email (for Tax Invoices) *'}
                    </label>
                    <input
                      type="email"
                      value={billingEmail}
                      onChange={(e) => setBillingEmail(e.target.value)}
                      placeholder="e.g. adaeze@talentleader.org"
                      required
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                    />
                  </div>
                </div>

                {/* Gateway-specific custom input field */}
                {selectedGatewayId === 'mpesa' ? (
                  <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-1.5">
                    <label className="font-bold text-emerald-900 dark:text-emerald-300 block flex items-center gap-1.5">
                      <Smartphone className="w-4 h-4 text-emerald-600" />
                      <span>Safaricom M-Pesa Mobile Number for STK Push *</span>
                    </label>
                    <input
                      type="tel"
                      value={mpesaPhone}
                      onChange={(e) => setMpesaPhone(e.target.value)}
                      placeholder="+254 7XX XXX XXX"
                      className="w-full px-3 py-2 rounded-xl border border-emerald-300 dark:border-emerald-700 bg-white dark:bg-slate-900 text-xs font-mono"
                    />
                    <p className="text-[10px] text-emerald-700 dark:text-emerald-400">
                      You will receive an instant push notification on your phone asking you to enter your M-Pesa PIN.
                    </p>
                  </div>
                ) : selectedGatewayId === 'ozow' ? (
                  <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-1.5">
                    <label className="font-bold text-blue-900 dark:text-blue-300 block flex items-center gap-1.5">
                      <Banknote className="w-4 h-4 text-blue-600" />
                      <span>Select South African Bank for Instant EFT *</span>
                    </label>
                    <select
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-blue-300 dark:border-blue-700 bg-white dark:bg-slate-900 text-xs font-semibold"
                    >
                      <option value="Capitec Bank">Capitec Bank (Instant App Authorize)</option>
                      <option value="FNB / First National Bank">FNB / First National Bank</option>
                      <option value="Standard Bank">Standard Bank</option>
                      <option value="Absa Bank">Absa Bank</option>
                      <option value="Nedbank">Nedbank</option>
                      <option value="TymeBank">TymeBank</option>
                      <option value="Investec">Investec</option>
                    </select>
                  </div>
                ) : (
                  <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                        <CreditCard className="w-4 h-4 text-blue-500" />
                        <span>Card / Payment Channel Details</span>
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">3DS Secure Checkout</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        placeholder="Cardholder Name"
                        className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                      />
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="Card Number"
                        className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-mono"
                      />
                    </div>
                  </div>
                )}

                {/* Submit Checkout Bar */}
                <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Total Due ({billingCycle}):</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl font-black text-slate-900 dark:text-white">
                        {rawMonthlyPrice === 0 ? 'FREE (₦0)' : localizedAmountFormatted}
                      </span>
                      <span className="text-xs text-slate-400">({activePlan.name})</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={processingState !== 'idle'}
                    className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {processingState === 'authenticating' ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        <span>Authenticating with {activeGateway.name}...</span>
                      </>
                    ) : processingState === 'switch-handshake' ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        <span>Authorizing Clearing Switch...</span>
                      </>
                    ) : rawMonthlyPrice === 0 ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Activate {activePlan.name} (Free)</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5" />
                        <span>Pay {localizedAmountFormatted} via {activeGateway.name}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
