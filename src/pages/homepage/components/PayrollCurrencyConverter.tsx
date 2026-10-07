import { useState, useMemo, useEffect } from 'react';
import { 
  ArrowRightLeft, Globe, ShieldCheck, Clock, Zap, 
  CheckCircle2, Sparkles, ArrowRight, Coins, RefreshCw 
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

interface CurrencyInfo {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  country: string;
  ratePerUSD: number; // 1 USD = X Currency Units
  decimals: number;
  clearingRail: string;
  payoutSpeed: string;
  statutoryAgency: string;
}

export const SUPPORTED_CURRENCIES: Record<string, CurrencyInfo> = {
  USD: {
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
    flag: '🇺🇸',
    country: 'United States',
    ratePerUSD: 1.0,
    decimals: 2,
    clearingRail: 'ACH / Fedwire Direct',
    payoutSpeed: 'Same-Day / Instant',
    statutoryAgency: 'IRS W-2 / 1099 Automated'
  },
  NGN: {
    code: 'NGN',
    name: 'Nigerian Naira',
    symbol: '₦',
    flag: '🇳🇬',
    country: 'Nigeria',
    ratePerUSD: 1485.0,
    decimals: 2,
    clearingRail: 'NIP Instant Interbank / Direct Pay',
    payoutSpeed: 'Instant (< 60s)',
    statutoryAgency: 'FIRS / State PAYE & PenCom 8%'
  },
  KES: {
    code: 'KES',
    name: 'Kenyan Shilling',
    symbol: 'KSh',
    flag: '🇰🇪',
    country: 'Kenya',
    ratePerUSD: 129.5,
    decimals: 2,
    clearingRail: 'M-Pesa B2C & Pesalink Interbank',
    payoutSpeed: 'Instant (< 30s)',
    statutoryAgency: 'KRA iTax, NSSF & SHIF/NHIF'
  },
  ZAR: {
    code: 'ZAR',
    name: 'South African Rand',
    symbol: 'R',
    flag: '🇿🇦',
    country: 'South Africa',
    ratePerUSD: 18.25,
    decimals: 2,
    clearingRail: 'BankservAfrica EFT / PayShap',
    payoutSpeed: 'Same-Day Real-Time',
    statutoryAgency: 'SARS eFiling & UIF Remittance'
  },
  GHS: {
    code: 'GHS',
    name: 'Ghanaian Cedi',
    symbol: 'GH₵',
    flag: '🇬🇭',
    country: 'Ghana',
    ratePerUSD: 15.4,
    decimals: 2,
    clearingRail: 'GhIPSS Instant Pay / MTN Mobile Money',
    payoutSpeed: 'Instant (< 90s)',
    statutoryAgency: 'GRA Income Tax & SSNIT Tier 1 & 2'
  },
  RWF: {
    code: 'RWF',
    name: 'Rwandan Franc',
    symbol: 'RF',
    flag: '🇷🇼',
    country: 'Rwanda',
    ratePerUSD: 1380.0,
    decimals: 0,
    clearingRail: 'Rwanda RIPPS / MoMo Pay',
    payoutSpeed: 'Instant Settlement',
    statutoryAgency: 'RRA PAYE, RSSB Pension & Maternity'
  },
  EGP: {
    code: 'EGP',
    name: 'Egyptian Pound',
    symbol: 'E£',
    flag: '🇪🇬',
    country: 'Egypt',
    ratePerUSD: 48.6,
    decimals: 2,
    clearingRail: 'InstaPay / CBE National Clearing',
    payoutSpeed: 'Instant Real-Time',
    statutoryAgency: 'ETA Tax Authority & NOSI Social Ins.'
  },
  GBP: {
    code: 'GBP',
    name: 'British Pound',
    symbol: '£',
    flag: '🇬🇧',
    country: 'United Kingdom',
    ratePerUSD: 0.77,
    decimals: 2,
    clearingRail: 'Faster Payments / BACS Direct',
    payoutSpeed: 'Instant / Same-Day',
    statutoryAgency: 'HMRC Real Time Information (RTI)'
  },
  EUR: {
    code: 'EUR',
    name: 'Euro',
    symbol: '€',
    flag: '🇪🇺',
    country: 'European Union',
    ratePerUSD: 0.92,
    decimals: 2,
    clearingRail: 'SEPA Instant Credit Transfer',
    payoutSpeed: 'Instant (< 10s)',
    statutoryAgency: 'Pan-EU Statutory Payroll Directive'
  },
  CAD: {
    code: 'CAD',
    name: 'Canadian Dollar',
    symbol: 'CA$',
    flag: '🇨🇦',
    country: 'Canada',
    ratePerUSD: 1.36,
    decimals: 2,
    clearingRail: 'Interac Direct / Lynx Automated',
    payoutSpeed: 'Same-Day Clearing',
    statutoryAgency: 'CRA T4 & CPP/EI Deductions'
  }
};

const POPULAR_CORRIDORS = [
  { label: '🇺🇸 USD → 🇳🇬 NGN', from: 'USD', to: 'NGN', note: 'Nigeria Tech Talent' },
  { label: '🇬🇧 GBP → 🇰🇪 KES', from: 'GBP', to: 'KES', note: 'Kenya Operations' },
  { label: '🇪🇺 EUR → 🇿🇦 ZAR', from: 'EUR', to: 'ZAR', note: 'South Africa Hub' },
  { label: '🇺🇸 USD → 🇬🇭 GHS', from: 'USD', to: 'GHS', note: 'Ghana Commerce' },
  { label: '🇺🇸 USD → 🇷🇼 RWF', from: 'USD', to: 'RWF', note: 'Rwanda Innovation' }
];

const PRESET_AMOUNTS = [1200, 3500, 7500, 15000];

interface PayrollCurrencyConverterProps {
  onOpenDemo: () => void;
}

export const PayrollCurrencyConverter = ({ onOpenDemo }: PayrollCurrencyConverterProps) => {
  const { currency: globalCurrency } = useCurrency();
  const [sourceCode, setSourceCode] = useState<string>('USD');
  const [destCode, setDestCode] = useState<string>('NGN');
  const [amount, setAmount] = useState<number>(3500);
  const [isSwapping, setIsSwapping] = useState<boolean>(false);

  useEffect(() => {
    if (globalCurrency === 'USD') {
      setSourceCode('USD');
      setDestCode('NGN');
    } else if (globalCurrency === 'NGN') {
      setSourceCode('USD');
      setDestCode('NGN');
    } else if (globalCurrency === 'KES') {
      setSourceCode('USD');
      setDestCode('KES');
    } else if (globalCurrency === 'EUR') {
      setSourceCode('EUR');
      setDestCode('NGN');
    } else if (globalCurrency === 'GBP') {
      setSourceCode('GBP');
      setDestCode('KES');
    }
  }, [globalCurrency]);

  const source = SUPPORTED_CURRENCIES[sourceCode] || SUPPORTED_CURRENCIES['USD'];
  const dest = SUPPORTED_CURRENCIES[destCode] || SUPPORTED_CURRENCIES['NGN'];

  // Calculate Exchange Rate: 1 Source = ? Destination
  const exchangeRate = useMemo(() => {
    // dest.ratePerUSD / source.ratePerUSD
    return dest.ratePerUSD / source.ratePerUSD;
  }, [source, dest]);

  const convertedAmount = useMemo(() => {
    return amount * exchangeRate;
  }, [amount, exchangeRate]);

  // Estimated traditional bank fee vs NextSofthr FX rail
  const traditionalBankSpread = useMemo(() => {
    return Math.round(amount * 0.038); // typical 3.8% hidden markup
  }, [amount]);

  const nextsoftFee = useMemo(() => {
    return Math.round(amount * 0.0035); // transparent 0.35% institutional spread
  }, [amount]);

  const estimatedSavings = useMemo(() => {
    return Math.max(0, traditionalBankSpread - nextsoftFee);
  }, [traditionalBankSpread, nextsoftFee]);

  const handleSwap = () => {
    setIsSwapping(true);
    setTimeout(() => {
      setSourceCode(destCode);
      setDestCode(sourceCode);
      setIsSwapping(false);
    }, 150);
  };

  const handleSelectCorridor = (from: string, to: string) => {
    setSourceCode(from);
    setDestCode(to);
  };

  return (
    <div className="max-w-5xl mx-auto bg-slate-800/90 rounded-3xl border border-slate-700/80 shadow-2xl p-6 sm:p-8 backdrop-blur-md mb-16 relative overflow-hidden" id="cross-border-payroll-converter">
      {/* Subtle Glow Accent */}
      <div className="absolute -top-24 -right-24 w-60 h-60 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-slate-700/80 gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <Coins className="w-4 h-4" />
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Cross-Border Multi-Currency Payroll Converter
            </h3>
            <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
              Live Mid-Market Rails
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1.5 max-w-2xl leading-relaxed">
            Preview how NextSofthr eliminates foreign exchange volatility and retail bank markups when paying remote teams, contractors, and international subsidiaries across Africa and global markets.
          </p>
        </div>

        {/* Guaranteed Rate Lock Tag */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-slate-300 shrink-0 self-start lg:self-center">
          <Clock className="w-3.5 h-3.5 text-lime-400" />
          <span>72-Hour Guaranteed Rate Lock</span>
        </div>
      </div>

      {/* Popular Corridor Shortcuts */}
      <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
          <Zap className="w-3 h-3 text-amber-400" /> Key Corridors:
        </span>
        {POPULAR_CORRIDORS.map((corridor, idx) => {
          const isActive = sourceCode === corridor.from && destCode === corridor.to;
          return (
            <button
              key={idx}
              onClick={() => handleSelectCorridor(corridor.from, corridor.to)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border shrink-0 flex items-center gap-1.5 ${
                isActive
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-sm'
                  : 'bg-slate-900/60 border-slate-700/60 text-slate-300 hover:border-slate-600 hover:text-white'
              }`}
            >
              <span>{corridor.label}</span>
              <span className="text-[10px] text-slate-400 font-normal">({corridor.note})</span>
            </button>
          );
        })}
      </div>

      {/* Converter Grid: Controls & Live Conversion Result */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-stretch">
        
        {/* Left Column: Interactive Input & Selectors */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4 bg-slate-900/50 p-5 sm:p-6 rounded-2xl border border-slate-700/70">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Payroll Disbursement Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold font-mono text-sm">
                {source.symbol}
              </span>
              <input
                id="payroll-currency-amount-input"
                type="number"
                min="100"
                step="50"
                value={amount || ''}
                onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
                className="w-full pl-9 pr-16 py-3 bg-slate-950 text-white font-mono text-lg font-bold rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all shadow-inner"
                placeholder="3,500"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                {source.code}
              </span>
            </div>

            {/* Quick Preset Buttons */}
            <div className="flex items-center gap-2 mt-2.5">
              <span className="text-[10px] font-semibold text-slate-400">Presets:</span>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_AMOUNTS.map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setAmount(val)}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                      amount === val
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {source.symbol}{val.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Currencies Dropdowns / Selectors with Swap */}
          <div className="grid grid-cols-1 sm:grid-cols-11 gap-3 items-center pt-2">
            
            {/* Source Currency */}
            <div className="sm:col-span-5">
              <label className="block text-[11px] font-bold text-slate-400 mb-1">
                Disbursing From (Company HQ)
              </label>
              <div className="relative">
                <select
                  id="source-currency-select"
                  value={sourceCode}
                  onChange={(e) => setSourceCode(e.target.value)}
                  className="w-full bg-slate-950 text-white text-xs font-semibold py-2.5 pl-3 pr-8 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none cursor-pointer"
                >
                  {Object.values(SUPPORTED_CURRENCIES).map((cur) => (
                    <option key={cur.code} value={cur.code} className="bg-slate-900 text-white">
                      {cur.flag} {cur.code} - {cur.name} ({cur.symbol})
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                  ▼
                </div>
              </div>
              <div className="text-[10px] text-slate-400 mt-1 truncate">
                {source.country} • {source.symbol}
              </div>
            </div>

            {/* Swap Button */}
            <div className="sm:col-span-1 flex justify-center py-1 sm:py-0">
              <button
                type="button"
                id="currency-swap-btn"
                onClick={handleSwap}
                aria-label="Swap currencies"
                className={`p-2.5 rounded-xl bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white border border-slate-700 transition-all duration-200 shadow-sm ${
                  isSwapping ? 'rotate-180 scale-95' : ''
                }`}
                title="Swap source and destination currencies"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </button>
            </div>

            {/* Destination Currency */}
            <div className="sm:col-span-5">
              <label className="block text-[11px] font-bold text-slate-400 mb-1">
                Receiving In (Employee / Hub)
              </label>
              <div className="relative">
                <select
                  id="dest-currency-select"
                  value={destCode}
                  onChange={(e) => setDestCode(e.target.value)}
                  className="w-full bg-slate-950 text-white text-xs font-semibold py-2.5 pl-3 pr-8 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none cursor-pointer"
                >
                  {Object.values(SUPPORTED_CURRENCIES).map((cur) => (
                    <option key={cur.code} value={cur.code} className="bg-slate-900 text-white">
                      {cur.flag} {cur.code} - {cur.name} ({cur.symbol})
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                  ▼
                </div>
              </div>
              <div className="text-[10px] text-slate-400 mt-1 truncate">
                {dest.country} • {dest.symbol}
              </div>
            </div>

          </div>

          {/* Benchmark Exchange Rate Note */}
          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center justify-between text-xs text-slate-300">
            <span className="flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5 text-emerald-400 animate-spin-slow" />
              <span className="text-slate-400">Mid-Market Benchmark:</span>
            </span>
            <span className="font-mono font-bold text-emerald-300">
              1 {source.code} = {exchangeRate < 1 ? exchangeRate.toFixed(4) : exchangeRate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {dest.code}
            </span>
          </div>

        </div>

        {/* Right Column: Live Disbursement Calculation & Rails Summary */}
        <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-5">
          
          <div>
            {/* Top Stat Card */}
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>Calculated Net Employee Payout</span>
                  <span className="text-emerald-400 font-bold">({dest.code})</span>
                </span>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-emerald-400 font-mono mt-1 tracking-tight flex items-baseline gap-1">
                  <span>{dest.symbol}</span>
                  <span>
                    {convertedAmount.toLocaleString(undefined, {
                      minimumFractionDigits: dest.decimals,
                      maximumFractionDigits: dest.decimals
                    })}
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Equivalent to <span className="text-white font-mono font-semibold">{source.symbol}{amount.toLocaleString()} {source.code}</span> at real-time institutional clearing rate.
                </div>
              </div>

              <div className="text-2xl" title={dest.country}>
                {dest.flag}
              </div>
            </div>

            {/* Local Rails & Statutory Detail */}
            <div className="mt-5 space-y-2.5 pt-4 border-t border-slate-800 text-xs">
              
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" /> Payment Rail & Clearing:
                </span>
                <span className="font-semibold text-slate-200 text-right">
                  {dest.clearingRail}
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-400" /> Settlement Speed:
                </span>
                <span className="font-semibold text-emerald-400">
                  {dest.payoutSpeed}
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-lime-400" /> Compliance & Statutory Link:
                </span>
                <span className="font-semibold text-slate-200 text-right">
                  {dest.statutoryAgency}
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" /> FX Spread vs Retail Banks:
                </span>
                <span className="font-semibold text-lime-300">
                  Save ~${estimatedSavings.toLocaleString()} on this transfer
                </span>
              </div>

            </div>
          </div>

          {/* Bottom CTA Row */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Multi-currency batching for 14+ African & global currencies</span>
            </div>

            <button
              id="test-cross-border-payroll-btn"
              type="button"
              onClick={onOpenDemo}
              className="w-full sm:w-auto px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-lg flex items-center justify-center gap-1.5 shrink-0"
            >
              <span>Test Cross-Border Batch</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
