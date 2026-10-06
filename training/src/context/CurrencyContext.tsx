import React, { createContext, useContext, useEffect, useState } from 'react';
import { CurrencyCode } from '../types';

export interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  name: string;
  country: string;
  ratePerUSD: number;
  flag: string;
  prefix: boolean;
  decimals: number;
}

export const CURRENCY_REGISTRY: Record<CurrencyCode, CurrencyInfo> = {
  NGN: {
    code: 'NGN',
    symbol: '₦',
    name: 'Nigerian Naira',
    country: 'Nigeria',
    ratePerUSD: 1550,
    flag: '🇳🇬',
    prefix: true,
    decimals: 0,
  },
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    country: 'United States & Global',
    ratePerUSD: 1.0,
    flag: '🇺🇸',
    prefix: true,
    decimals: 0,
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    country: 'United Kingdom',
    ratePerUSD: 0.78,
    flag: '🇬🇧',
    prefix: true,
    decimals: 0,
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    country: 'European Union',
    ratePerUSD: 0.92,
    flag: '🇪🇺',
    prefix: true,
    decimals: 0,
  },
  KES: {
    code: 'KES',
    symbol: 'KSh',
    name: 'Kenyan Shilling',
    country: 'Kenya',
    ratePerUSD: 130,
    flag: '🇰🇪',
    prefix: true,
    decimals: 0,
  },
  ZAR: {
    code: 'ZAR',
    symbol: 'R',
    name: 'South African Rand',
    country: 'South Africa',
    ratePerUSD: 18.2,
    flag: '🇿🇦',
    prefix: true,
    decimals: 0,
  },
  GHS: {
    code: 'GHS',
    symbol: 'GH₵',
    name: 'Ghanaian Cedi',
    country: 'Ghana',
    ratePerUSD: 15.4,
    flag: '🇬🇭',
    prefix: true,
    decimals: 0,
  },
  MAD: {
    code: 'MAD',
    symbol: 'MAD',
    name: 'Moroccan Dirham',
    country: 'Morocco',
    ratePerUSD: 9.9,
    flag: '🇲🇦',
    prefix: false,
    decimals: 0,
  },
  XAF: {
    code: 'XAF',
    symbol: 'FCFA',
    name: 'Central African CFA',
    country: 'CEMAC Region',
    ratePerUSD: 605,
    flag: '🇨🇲',
    prefix: false,
    decimals: 0,
  },
  AED: {
    code: 'AED',
    symbol: 'AED',
    name: 'UAE Dirham',
    country: 'United Arab Emirates',
    ratePerUSD: 3.67,
    flag: '🇦🇪',
    prefix: true,
    decimals: 0,
  },
  UGX: {
    code: 'UGX',
    symbol: 'USh',
    name: 'Ugandan Shilling',
    country: 'Uganda',
    ratePerUSD: 3700,
    flag: '🇺🇬',
    prefix: true,
    decimals: 0,
  },
  TZS: {
    code: 'TZS',
    symbol: 'TSh',
    name: 'Tanzanian Shilling',
    country: 'Tanzania',
    ratePerUSD: 2650,
    flag: '🇹🇿',
    prefix: true,
    decimals: 0,
  },
  RWF: {
    code: 'RWF',
    symbol: 'RF',
    name: 'Rwandan Franc',
    country: 'Rwanda',
    ratePerUSD: 1380,
    flag: '🇷🇼',
    prefix: true,
    decimals: 0,
  },
  ZMW: {
    code: 'ZMW',
    symbol: 'ZK',
    name: 'Zambian Kwacha',
    country: 'Zambia',
    ratePerUSD: 26.5,
    flag: '🇿🇲',
    prefix: true,
    decimals: 0,
  },
  EGP: {
    code: 'EGP',
    symbol: 'E£',
    name: 'Egyptian Pound',
    country: 'Egypt',
    ratePerUSD: 48.5,
    flag: '🇪🇬',
    prefix: true,
    decimals: 0,
  },
  ZIP: {
    code: 'ZIP',
    symbol: 'ZIP',
    name: 'Zip Enterprise Credits',
    country: 'Corporate Tokens',
    ratePerUSD: 100,
    flag: '⚡',
    prefix: false,
    decimals: 0,
  },
};

export const ALL_CURRENCIES: CurrencyInfo[] = Object.values(CURRENCY_REGISTRY);

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  currentCurrency: CurrencyInfo;
  availableCurrencies: CurrencyInfo[];
  convertFromUSD: (amountUSD: number) => number;
  formatAmount: (amountUSD: number, options?: { showCode?: boolean; customDecimals?: number }) => string;
  formatCoursePrice: (course: { priceUSD: number; priceNGN?: number }) => string;
  formatBundlePrice: (
    bundle: {
      bundlePriceUSD: number;
      bundlePriceNGN?: number;
      originalPriceUSD?: number;
      originalPriceNGN?: number;
    },
    useOriginal?: boolean
  ) => string;
  formatSessionPrice: (session: { priceUSD: number; priceNGN?: number }) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    try {
      const stored = localStorage.getItem('nextsofthr_currency') as CurrencyCode | null;
      if (stored && CURRENCY_REGISTRY[stored]) {
        return stored;
      }
      return 'NGN';
    } catch {
      return 'NGN';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('nextsofthr_currency', currency);
    } catch {
      // ignore storage limitations
    }
  }, [currency]);

  const currentCurrency = CURRENCY_REGISTRY[currency] || CURRENCY_REGISTRY.NGN;

  const setCurrency = (code: CurrencyCode) => {
    if (CURRENCY_REGISTRY[code]) {
      setCurrencyState(code);
    }
  };

  const convertFromUSD = (amountUSD: number): number => {
    const rate = currentCurrency.ratePerUSD;
    return Math.round(amountUSD * rate);
  };

  const formatAmount = (
    amountUSD: number,
    options?: { showCode?: boolean; customDecimals?: number }
  ): string => {
    const { prefix, symbol, code, decimals } = currentCurrency;
    const finalDecimals = options?.customDecimals ?? decimals;

    if (currency === 'USD') {
      const formatted = amountUSD.toLocaleString(undefined, {
        minimumFractionDigits: finalDecimals,
        maximumFractionDigits: finalDecimals,
      });
      return options?.showCode ? `$${formatted} USD` : `$${formatted}`;
    }

    const converted = convertFromUSD(amountUSD);
    const formatted = converted.toLocaleString(undefined, {
      minimumFractionDigits: finalDecimals,
      maximumFractionDigits: finalDecimals,
    });

    if (prefix) {
      return options?.showCode ? `${symbol}${formatted} ${code}` : `${symbol}${formatted}`;
    } else {
      return options?.showCode ? `${formatted} ${symbol} (${code})` : `${formatted} ${symbol}`;
    }
  };

  const formatCoursePrice = (course: { priceUSD: number; priceNGN?: number }): string => {
    if (currency === 'NGN' && course.priceNGN) {
      return `₦${course.priceNGN.toLocaleString()}`;
    }
    return formatAmount(course.priceUSD);
  };

  const formatBundlePrice = (
    bundle: {
      bundlePriceUSD: number;
      bundlePriceNGN?: number;
      originalPriceUSD?: number;
      originalPriceNGN?: number;
    },
    useOriginal = false
  ): string => {
    if (currency === 'NGN') {
      if (useOriginal && bundle.originalPriceNGN) {
        return `₦${bundle.originalPriceNGN.toLocaleString()}`;
      }
      if (!useOriginal && bundle.bundlePriceNGN) {
        return `₦${bundle.bundlePriceNGN.toLocaleString()}`;
      }
    }
    const usdVal = useOriginal ? bundle.originalPriceUSD || bundle.bundlePriceUSD : bundle.bundlePriceUSD;
    return formatAmount(usdVal);
  };

  const formatSessionPrice = (session: { priceUSD: number; priceNGN?: number }): string => {
    if (currency === 'NGN' && session.priceNGN) {
      return `₦${session.priceNGN.toLocaleString()}`;
    }
    return formatAmount(session.priceUSD);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        currentCurrency,
        availableCurrencies: ALL_CURRENCIES,
        convertFromUSD,
        formatAmount,
        formatCoursePrice,
        formatBundlePrice,
        formatSessionPrice,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
