import React, { createContext, useContext, useState, useEffect } from 'react';

export type SupportedCurrency = 
  | 'NGN' 
  | 'USD' 
  | 'GBP' 
  | 'KES' 
  | 'ZAR' 
  | 'GHS' 
  | 'MAD' 
  | 'XAF' 
  | 'AED' 
  | 'UGX' 
  | 'TZS' 
  | 'RWF' 
  | 'ZMW' 
  | 'EGP' 
  | 'ZIP' 
  | 'EUR';

export interface CurrencyConfig {
  code: SupportedCurrency;
  symbol: string;
  name: string;
  country: string;
  flag: string;
  ratePerUSD: number; // 1 USD = X in this currency
  formatDecimals: number;
}

export const SUPPORTED_CURRENCIES: Record<SupportedCurrency, CurrencyConfig> = {
  NGN: {
    code: 'NGN',
    symbol: '₦',
    name: 'Nigerian Naira',
    country: 'Nigeria',
    flag: '🇳🇬',
    ratePerUSD: 1480,
    formatDecimals: 0
  },
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    country: 'United States',
    flag: '🇺🇸',
    ratePerUSD: 1.0,
    formatDecimals: 0
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    country: 'United Kingdom',
    flag: '🇬🇧',
    ratePerUSD: 0.78,
    formatDecimals: 0
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    country: 'European Union',
    flag: '🇪🇺',
    ratePerUSD: 0.92,
    formatDecimals: 0
  },
  KES: {
    code: 'KES',
    symbol: 'KSh',
    name: 'Kenyan Shilling',
    country: 'Kenya',
    flag: '🇰🇪',
    ratePerUSD: 129.5,
    formatDecimals: 0
  },
  ZAR: {
    code: 'ZAR',
    symbol: 'R',
    name: 'South African Rand',
    country: 'South Africa',
    flag: '🇿🇦',
    ratePerUSD: 18.2,
    formatDecimals: 0
  },
  GHS: {
    code: 'GHS',
    symbol: 'GH₵',
    name: 'Ghanaian Cedi',
    country: 'Ghana',
    flag: '🇬🇭',
    ratePerUSD: 15.6,
    formatDecimals: 0
  },
  MAD: {
    code: 'MAD',
    symbol: 'MAD',
    name: 'Moroccan Dirham',
    country: 'Morocco',
    flag: '🇲🇦',
    ratePerUSD: 9.9,
    formatDecimals: 0
  },
  XAF: {
    code: 'XAF',
    symbol: 'FCFA',
    name: 'Central African CFA Franc',
    country: 'Central Africa (CEMAC)',
    flag: '🇨🇲',
    ratePerUSD: 605,
    formatDecimals: 0
  },
  AED: {
    code: 'AED',
    symbol: 'AED',
    name: 'UAE Dirham',
    country: 'United Arab Emirates',
    flag: '🇦🇪',
    ratePerUSD: 3.67,
    formatDecimals: 0
  },
  UGX: {
    code: 'UGX',
    symbol: 'USh',
    name: 'Ugandan Shilling',
    country: 'Uganda',
    flag: '🇺🇬',
    ratePerUSD: 3700,
    formatDecimals: 0
  },
  TZS: {
    code: 'TZS',
    symbol: 'TSh',
    name: 'Tanzanian Shilling',
    country: 'Tanzania',
    flag: '🇹🇿',
    ratePerUSD: 2650,
    formatDecimals: 0
  },
  RWF: {
    code: 'RWF',
    symbol: 'RWF',
    name: 'Rwandan Franc',
    country: 'Rwanda',
    flag: '🇷🇼',
    ratePerUSD: 1380,
    formatDecimals: 0
  },
  ZMW: {
    code: 'ZMW',
    symbol: 'ZK',
    name: 'Zambian Kwacha',
    country: 'Zambia',
    flag: '🇿🇲',
    ratePerUSD: 27.4,
    formatDecimals: 0
  },
  EGP: {
    code: 'EGP',
    symbol: 'E£',
    name: 'Egyptian Pound',
    country: 'Egypt',
    flag: '🇪🇬',
    ratePerUSD: 48.5,
    formatDecimals: 0
  },
  ZIP: {
    code: 'ZIP',
    symbol: 'ZiG',
    name: 'Zimbabwe Gold',
    country: 'Zimbabwe',
    flag: '🇿🇼',
    ratePerUSD: 26.8,
    formatDecimals: 0
  }
};

export const CURRENCY_LIST = Object.values(SUPPORTED_CURRENCIES);

interface CurrencyContextType {
  currentCurrency: SupportedCurrency;
  currencyConfig: CurrencyConfig;
  setCurrency: (currency: SupportedCurrency) => void;
  convertAmount: (amount: number, fromCurrency: string, toCurrency?: SupportedCurrency) => number;
  formatCurrencyAmount: (amount: number, currencyCode?: SupportedCurrency) => string;
  formatAmount: (amount: number, currencyCode?: SupportedCurrency) => string;
  convertAndFormatSalary: (salaryRangeStr: string, sourceCurrency?: string) => string;
  convertAndFormatPrice: (priceStr: string, sourceCurrency?: string) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Helper to deduce source currency from string if not explicitly supplied
export function detectCurrencyCode(str: string, fallback: string = 'NGN'): SupportedCurrency {
  const s = str.toUpperCase();
  if (s.includes('₦') || s.includes('NGN') || s.includes('NAIRA')) return 'NGN';
  if (s.includes('GH₵') || s.includes('GHS') || s.includes('CEDI')) return 'GHS';
  if (s.includes('KSH') || s.includes('KES')) return 'KES';
  if (s.includes('R ') || s.includes('ZAR') || s.includes('RAND')) return 'ZAR';
  if (s.includes('£') || s.includes('GBP')) return 'GBP';
  if (s.includes('€') || s.includes('EUR')) return 'EUR';
  if (s.includes('AED') || s.includes('DIRHAM')) return 'AED';
  if (s.includes('FCFA') || s.includes('XAF')) return 'XAF';
  if (s.includes('MAD')) return 'MAD';
  if (s.includes('USH') || s.includes('UGX')) return 'UGX';
  if (s.includes('TSH') || s.includes('TZS')) return 'TZS';
  if (s.includes('RWF')) return 'RWF';
  if (s.includes('ZK') || s.includes('ZMW')) return 'ZMW';
  if (s.includes('E£') || s.includes('EGP')) return 'EGP';
  if (s.includes('ZIG') || s.includes('ZIP') || s.includes('ZWL')) return 'ZIP';
  if (s.includes('$') || s.includes('USD')) return 'USD';
  
  const cleanFallback = fallback.toUpperCase() as SupportedCurrency;
  return SUPPORTED_CURRENCIES[cleanFallback] ? cleanFallback : 'NGN';
}

function roundToSensibleScale(num: number): number {
  if (num > 1000000) {
    // Round to nearest 10,000 or 50,000
    return Math.round(num / 10000) * 10000;
  }
  if (num > 100000) {
    return Math.round(num / 1000) * 1000;
  }
  if (num > 10000) {
    return Math.round(num / 100) * 100;
  }
  if (num > 1000) {
    return Math.round(num / 10) * 10;
  }
  return Math.round(num);
}

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentCurrency, setCurrentCurrencyState] = useState<SupportedCurrency>(() => {
    const saved = localStorage.getItem('nextsoft_currency') as SupportedCurrency;
    return SUPPORTED_CURRENCIES[saved] ? saved : 'NGN';
  });

  const setCurrency = (code: SupportedCurrency) => {
    if (SUPPORTED_CURRENCIES[code]) {
      setCurrentCurrencyState(code);
      localStorage.setItem('nextsoft_currency', code);
    }
  };

  const currencyConfig = SUPPORTED_CURRENCIES[currentCurrency] || SUPPORTED_CURRENCIES.NGN;

  // Convert raw amount between currencies
  const convertAmount = (amount: number, fromCurrency: string, toCurrency?: SupportedCurrency): number => {
    const sourceCode = detectCurrencyCode(fromCurrency, fromCurrency);
    const targetCode = toCurrency || currentCurrency;

    const sourceRate = SUPPORTED_CURRENCIES[sourceCode]?.ratePerUSD || 1.0;
    const targetRate = SUPPORTED_CURRENCIES[targetCode]?.ratePerUSD || 1.0;

    // Convert to USD base first, then to target
    const inUSD = amount / sourceRate;
    return inUSD * targetRate;
  };

  // Format a pure numeric amount in given or active currency
  const formatCurrencyAmount = (amount: number, currencyCode?: SupportedCurrency): string => {
    const config = SUPPORTED_CURRENCIES[currencyCode || currentCurrency] || currencyConfig;
    const rounded = roundToSensibleScale(amount);
    return `${config.symbol} ${rounded.toLocaleString()}`;
  };

  // Convert an entire salary string like "₦1,200,000 - ₦1,850,000" or "$4,500 - $7,000 / month"
  const convertAndFormatSalary = (salaryRangeStr: string, sourceCurrency?: string): string => {
    if (!salaryRangeStr || salaryRangeStr.toLowerCase().includes('negotiable') || salaryRangeStr.toLowerCase().includes('competitive')) {
      return salaryRangeStr;
    }

    const sourceCode = detectCurrencyCode(salaryRangeStr, sourceCurrency || 'NGN');
    const targetConfig = currencyConfig;

    // If source currency matches current active currency, return with cleaned styling
    if (sourceCode === currentCurrency) {
      return salaryRangeStr;
    }

    // Extract suffix e.g. "/ month", "/ year", "+ Uncapped Commission", etc.
    let suffix = '';
    const lower = salaryRangeStr.toLowerCase();
    if (lower.includes('/ month') || lower.includes('/ mo')) suffix = ' / month';
    else if (lower.includes('/ year') || lower.includes('/ yr') || lower.includes('per annum')) suffix = ' / year';
    else if (lower.includes('+ commission') || lower.includes('+ uncapped')) suffix = ' + Commission';

    // Extract all numbers
    const cleanMatches = salaryRangeStr.match(/[\d,]+(?:\.\d+)?/g);
    if (!cleanMatches || cleanMatches.length === 0) {
      return salaryRangeStr;
    }

    const numbers = cleanMatches
      .map(m => parseFloat(m.replace(/,/g, '')))
      .filter(n => !isNaN(n) && n > 0);

    if (numbers.length === 0) return salaryRangeStr;

    if (numbers.length === 1) {
      const converted = convertAmount(numbers[0], sourceCode, currentCurrency);
      const rounded = roundToSensibleScale(converted);
      return `${targetConfig.symbol} ${rounded.toLocaleString()}${suffix}`;
    }

    const min = Math.min(...numbers);
    const max = Math.max(...numbers);

    const convertedMin = roundToSensibleScale(convertAmount(min, sourceCode, currentCurrency));
    const convertedMax = roundToSensibleScale(convertAmount(max, sourceCode, currentCurrency));

    return `${targetConfig.symbol} ${convertedMin.toLocaleString()} - ${targetConfig.symbol} ${convertedMax.toLocaleString()}${suffix}`;
  };

  // Convert plan pricing e.g. "₦45,000" or "₦180,000" or "Custom Engagement"
  const convertAndFormatPrice = (priceStr: string, sourceCurrency: string = 'NGN'): string => {
    if (!priceStr || priceStr.toLowerCase().includes('custom') || priceStr.toLowerCase().includes('free')) {
      return priceStr;
    }

    const sourceCode = detectCurrencyCode(priceStr, sourceCurrency);
    if (sourceCode === currentCurrency) {
      return priceStr;
    }

    const cleanMatches = priceStr.match(/[\d,]+(?:\.\d+)?/g);
    if (!cleanMatches || cleanMatches.length === 0) {
      return priceStr;
    }

    const num = parseFloat(cleanMatches[0].replace(/,/g, ''));
    if (isNaN(num)) return priceStr;

    const converted = convertAmount(num, sourceCode, currentCurrency);
    const rounded = roundToSensibleScale(converted);

    return `${currencyConfig.symbol} ${rounded.toLocaleString()}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currentCurrency,
        currencyConfig,
        setCurrency,
        convertAmount,
        formatCurrencyAmount,
        formatAmount: formatCurrencyAmount,
        convertAndFormatSalary,
        convertAndFormatPrice
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
