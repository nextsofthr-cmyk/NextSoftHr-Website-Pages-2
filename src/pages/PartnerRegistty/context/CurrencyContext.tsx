import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CurrencyConfig {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  rateAgainstUSD: number; // 1 USD = X Currency
  decimals: number;
  locale: string;
  region: string;
}

export const SUPPORTED_CURRENCIES: Record<string, CurrencyConfig> = {
  USD: {
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
    flag: '🇺🇸',
    rateAgainstUSD: 1.0,
    decimals: 2,
    locale: 'en-US',
    region: 'Global'
  },
  NGN: {
    code: 'NGN',
    name: 'Nigerian Naira',
    symbol: '₦',
    flag: '🇳🇬',
    rateAgainstUSD: 1550.0,
    decimals: 0,
    locale: 'en-NG',
    region: 'West Africa'
  },
  GBP: {
    code: 'GBP',
    name: 'British Pound',
    symbol: '£',
    flag: '🇬🇧',
    rateAgainstUSD: 0.78,
    decimals: 2,
    locale: 'en-GB',
    region: 'Europe'
  },
  EUR: {
    code: 'EUR',
    name: 'Euro',
    symbol: '€',
    flag: '🇪🇺',
    rateAgainstUSD: 0.92,
    decimals: 2,
    locale: 'de-DE',
    region: 'Europe'
  },
  KES: {
    code: 'KES',
    name: 'Kenyan Shilling',
    symbol: 'KSh',
    flag: '🇰🇪',
    rateAgainstUSD: 129.5,
    decimals: 0,
    locale: 'en-KE',
    region: 'East Africa'
  },
  ZAR: {
    code: 'ZAR',
    name: 'South African Rand',
    symbol: 'R',
    flag: '🇿🇦',
    rateAgainstUSD: 18.25,
    decimals: 2,
    locale: 'en-ZA',
    region: 'Southern Africa'
  },
  GHS: {
    code: 'GHS',
    name: 'Ghanaian Cedi',
    symbol: 'GH₵',
    flag: '🇬🇭',
    rateAgainstUSD: 15.65,
    decimals: 2,
    locale: 'en-GH',
    region: 'West Africa'
  },
  MAD: {
    code: 'MAD',
    name: 'Moroccan Dirham',
    symbol: 'MAD',
    flag: '🇲🇦',
    rateAgainstUSD: 9.85,
    decimals: 2,
    locale: 'fr-MA',
    region: 'North Africa'
  },
  XAF: {
    code: 'XAF',
    name: 'Central African Franc',
    symbol: 'FCFA',
    flag: '🇨🇲',
    rateAgainstUSD: 605.0,
    decimals: 0,
    locale: 'fr-CM',
    region: 'Central Africa'
  },
  AED: {
    code: 'AED',
    name: 'UAE Dirham',
    symbol: 'AED',
    flag: '🇦🇪',
    rateAgainstUSD: 3.6725,
    decimals: 2,
    locale: 'ar-AE',
    region: 'Middle East'
  },
  UGX: {
    code: 'UGX',
    name: 'Ugandan Shilling',
    symbol: 'USh',
    flag: '🇺🇬',
    rateAgainstUSD: 3680.0,
    decimals: 0,
    locale: 'en-UG',
    region: 'East Africa'
  },
  TZS: {
    code: 'TZS',
    name: 'Tanzanian Shilling',
    symbol: 'TSh',
    flag: '🇹🇿',
    rateAgainstUSD: 2620.0,
    decimals: 0,
    locale: 'sw-TZ',
    region: 'East Africa'
  },
  RWF: {
    code: 'RWF',
    name: 'Rwandan Franc',
    symbol: 'FRw',
    flag: '🇷🇼',
    rateAgainstUSD: 1380.0,
    decimals: 0,
    locale: 'rw-RW',
    region: 'East Africa'
  },
  ZMW: {
    code: 'ZMW',
    name: 'Zambian Kwacha',
    symbol: 'ZK',
    flag: '🇿🇲',
    rateAgainstUSD: 26.5,
    decimals: 2,
    locale: 'en-ZM',
    region: 'Southern Africa'
  },
  EGP: {
    code: 'EGP',
    name: 'Egyptian Pound',
    symbol: 'E£',
    flag: '🇪🇬',
    rateAgainstUSD: 48.6,
    decimals: 2,
    locale: 'ar-EG',
    region: 'North Africa'
  },
  ZIP: {
    code: 'ZIP',
    name: 'Zimbabwe Gold (ZiG)',
    symbol: 'ZiG',
    flag: '🇿🇼',
    rateAgainstUSD: 25.8,
    decimals: 2,
    locale: 'en-ZW',
    region: 'Southern Africa'
  }
};

interface CurrencyContextType {
  currentCurrency: CurrencyConfig;
  setCurrency: (code: string) => void;
  currencies: CurrencyConfig[];
  convertFromUSD: (amountInUSD: number) => number;
  formatCurrency: (amountInUSD: number, options?: { compact?: boolean; hideDecimals?: boolean }) => string;
  formatRawAmount: (amountInCurrentCurrency: number, options?: { compact?: boolean }) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'nextsofthr_active_currency';

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currencyCode, setCurrencyCode] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved && SUPPORTED_CURRENCIES[saved]) {
        return saved;
      }
    }
    return 'USD';
  });

  const currentCurrency = SUPPORTED_CURRENCIES[currencyCode] || SUPPORTED_CURRENCIES.USD;

  const setCurrency = (code: string) => {
    if (SUPPORTED_CURRENCIES[code]) {
      setCurrencyCode(code);
      if (typeof window !== 'undefined') {
        localStorage.setItem(LOCAL_STORAGE_KEY, code);
      }
    }
  };

  const convertFromUSD = (amountInUSD: number): number => {
    return amountInUSD * currentCurrency.rateAgainstUSD;
  };

  const formatCurrency = (
    amountInUSD: number,
    options?: { compact?: boolean; hideDecimals?: boolean }
  ): string => {
    const converted = convertFromUSD(amountInUSD);
    return formatRawAmount(converted, options);
  };

  const formatRawAmount = (
    amount: number,
    options?: { compact?: boolean; hideDecimals?: boolean }
  ): string => {
    const { compact = false, hideDecimals = false } = options || {};

    if (compact) {
      if (amount >= 1_000_000_000) {
        return `${currentCurrency.symbol} ${(amount / 1_000_000_000).toFixed(1)}B`;
      }
      if (amount >= 1_000_000) {
        return `${currentCurrency.symbol} ${(amount / 1_000_000).toFixed(1)}M`;
      }
      if (amount >= 1_000) {
        return `${currentCurrency.symbol} ${(amount / 1_000).toFixed(0)}k`;
      }
    }

    const decimalsToUse = hideDecimals || currentCurrency.decimals === 0 ? 0 : currentCurrency.decimals;

    try {
      const formattedNum = new Intl.NumberFormat(currentCurrency.locale, {
        minimumFractionDigits: decimalsToUse,
        maximumFractionDigits: decimalsToUse
      }).format(amount);

      return `${currentCurrency.symbol} ${formattedNum}`;
    } catch {
      return `${currentCurrency.symbol} ${amount.toLocaleString()}`;
    }
  };

  return (
    <CurrencyContext.Provider
      value={{
        currentCurrency,
        setCurrency,
        currencies: Object.values(SUPPORTED_CURRENCIES),
        convertFromUSD,
        formatCurrency,
        formatRawAmount
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
