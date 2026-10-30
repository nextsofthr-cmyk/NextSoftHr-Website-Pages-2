import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSafeCurrency } from '../../homepage/context/CurrencyContext';

export interface CurrencyConfig {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  // Rate against base NGN (1 unit of this currency = X NGN)
  // e.g. 1 USD = 1550 NGN -> rateToNGN = 1550
  // e.g. 1 NGN = 1 NGN -> rateToNGN = 1
  rateToNGN: number;
}

export const SUPPORTED_CURRENCIES: CurrencyConfig[] = [
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', flag: '🇳🇬', rateToNGN: 1 },
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸', rateToNGN: 1550 },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧', rateToNGN: 1980 },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺', rateToNGN: 1680 },
  { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', flag: '🇰🇪', rateToNGN: 12.0 },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', flag: '🇿🇦', rateToNGN: 88.0 },
  { code: 'GHS', name: 'Ghanaian Cedi', symbol: '₵', flag: '🇬🇭', rateToNGN: 105.0 },
  { code: 'MAD', name: 'Moroccan Dirham', symbol: 'MAD', flag: '🇲🇦', rateToNGN: 156.0 },
  { code: 'XAF', name: 'Central African Franc', symbol: 'FCFA', flag: '🇨🇲', rateToNGN: 2.56 },
  { code: 'AED', name: 'UAE Dirham', symbol: 'AED', flag: '🇦🇪', rateToNGN: 422.0 },
  { code: 'UGX', name: 'Ugandan Shilling', symbol: 'USh', flag: '🇺🇬', rateToNGN: 0.42 },
  { code: 'TZS', name: 'Tanzanian Shilling', symbol: 'TSh', flag: '🇹🇿', rateToNGN: 0.60 },
  { code: 'RWF', name: 'Rwandan Franc', symbol: 'FRw', flag: '🇷🇼', rateToNGN: 1.15 },
  { code: 'ZMW', name: 'Zambian Kwacha', symbol: 'K', flag: '🇿🇲', rateToNGN: 58.0 },
  { code: 'EGP', name: 'Egyptian Pound', symbol: 'E£', flag: '🇪🇬', rateToNGN: 32.0 },
  { code: 'ZIP', name: 'Zimbabwean ZiG', symbol: 'ZiG', flag: '🇿🇼', rateToNGN: 55.0 },
];

interface CurrencyContextType {
  currency: CurrencyConfig;
  setCurrencyCode: (code: string) => void;
  convertFromNGN: (amountInNGN: number) => number;
  formatCurrency: (amountInNGN: number, options?: { compact?: boolean; decimals?: number }) => string;
  supportedCurrencies: CurrencyConfig[];
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const globalCurrency = useSafeCurrency();

  const [currency, setCurrency] = useState<CurrencyConfig>(() => {
    try {
      const globalSaved = localStorage.getItem('nextsoft_currency_preference');
      if (globalSaved) {
        const found = SUPPORTED_CURRENCIES.find(c => c.code === globalSaved);
        if (found) return found;
      }
      const secondarySaved = localStorage.getItem('nextsofthr-currency');
      if (secondarySaved) {
        const found = SUPPORTED_CURRENCIES.find(c => c.code === secondarySaved);
        if (found) return found;
      }
      const saved = localStorage.getItem('nextsoft_currency');
      if (saved) {
        const found = SUPPORTED_CURRENCIES.find(c => c.code === saved);
        if (found) return found;
      }
    } catch {
      // LocalStorage fallback
    }
    if (globalCurrency?.currency) {
      const found = SUPPORTED_CURRENCIES.find(c => c.code === globalCurrency.currency);
      if (found) return found;
    }
    return SUPPORTED_CURRENCIES[0]; // Default to NGN
  });

  // Automatically update when user selects currency in GlobalHeader
  useEffect(() => {
    if (globalCurrency?.currency) {
      const found = SUPPORTED_CURRENCIES.find(c => c.code === globalCurrency.currency);
      if (found && found.code !== currency.code) {
        setCurrency(found);
      }
    }
  }, [globalCurrency?.currency]);

  // Synchronize with custom events & storage across components/tabs
  useEffect(() => {
    const handleCustomChange = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        const found = SUPPORTED_CURRENCIES.find(c => c.code === customEvent.detail);
        if (found) {
          setCurrency(found);
        }
      }
    };
    const handleStorageChange = (e: StorageEvent) => {
      if (
        (e.key === 'nextsoft_currency_preference' || e.key === 'nextsofthr-currency' || e.key === 'nextsoft_currency') &&
        e.newValue
      ) {
        const found = SUPPORTED_CURRENCIES.find(c => c.code === e.newValue);
        if (found) {
          setCurrency(found);
        }
      }
    };
    window.addEventListener('nextsoft-currency-change', handleCustomChange);
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('nextsoft-currency-change', handleCustomChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const setCurrencyCode = (code: string) => {
    const found = SUPPORTED_CURRENCIES.find(c => c.code === code);
    if (found) {
      setCurrency(found);
      try {
        localStorage.setItem('nextsoft_currency', code);
        localStorage.setItem('nextsoft_currency_preference', code);
        localStorage.setItem('nextsofthr-currency', code);
        window.dispatchEvent(new CustomEvent('nextsoft-currency-change', { detail: code }));
      } catch {
        // Safe ignore
      }
    }
  };

  const convertFromNGN = (amountInNGN: number): number => {
    if (currency.code === 'NGN') return amountInNGN;
    return amountInNGN / currency.rateToNGN;
  };

  const formatCurrency = (
    amountInNGN: number, 
    options?: { compact?: boolean; decimals?: number }
  ): string => {
    const converted = convertFromNGN(amountInNGN);
    const { compact = false, decimals } = options || {};

    if (compact) {
      if (Math.abs(converted) >= 1_000_000_000) {
        return `${currency.symbol}${(converted / 1_000_000_000).toFixed(1)}B`;
      }
      if (Math.abs(converted) >= 1_000_000) {
        return `${currency.symbol}${(converted / 1_000_000).toFixed(1)}M`;
      }
      if (Math.abs(converted) >= 1_000) {
        return `${currency.symbol}${(converted / 1_000).toFixed(0)}K`;
      }
    }

    const defaultDecimals = currency.code === 'USD' || currency.code === 'EUR' || currency.code === 'GBP' ? 2 : 0;
    const resolvedDecimals = decimals !== undefined ? decimals : defaultDecimals;

    const formattedNumber = converted.toLocaleString(undefined, {
      minimumFractionDigits: resolvedDecimals,
      maximumFractionDigits: resolvedDecimals,
    });

    return `${currency.symbol}${formattedNumber}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrencyCode,
        convertFromNGN,
        formatCurrency,
        supportedCurrencies: SUPPORTED_CURRENCIES,
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
