import React, { createContext, useContext, useState, useEffect } from 'react';
import { CurrencyCode, CurrencyConfig } from '../types';
import { CURRENCIES } from '../data/pricingData';

interface CurrencyContextType {
  selectedCurrency: CurrencyCode;
  setSelectedCurrency: (currency: CurrencyCode) => void;
  currencyConfig: CurrencyConfig;
  currencies: Record<CurrencyCode, CurrencyConfig>;
  allCurrencies: CurrencyConfig[];
  formatAmount: (amountInUSD: number) => string;
  convertAmount: (amountInUSD: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCurrency, setSelectedCurrencyState] = useState<CurrencyCode>(() => {
    if (typeof window !== 'undefined') {
      const globalSaved = localStorage.getItem('nextsoft_currency_preference') as CurrencyCode;
      if (globalSaved && CURRENCIES[globalSaved]) {
        return globalSaved;
      }
      const saved = localStorage.getItem('nextsofthr-currency') as CurrencyCode;
      if (saved && CURRENCIES[saved]) {
        return saved;
      }
    }
    return 'NGN';
  });

  useEffect(() => {
    const handleCustomChange = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail && CURRENCIES[customEvent.detail as CurrencyCode]) {
        setSelectedCurrencyState(customEvent.detail as CurrencyCode);
      }
    };
    const handleStorageChange = (e: StorageEvent) => {
      if (
        (e.key === 'nextsoft_currency_preference' || e.key === 'nextsofthr-currency') &&
        e.newValue &&
        CURRENCIES[e.newValue as CurrencyCode]
      ) {
        setSelectedCurrencyState(e.newValue as CurrencyCode);
      }
    };
    window.addEventListener('nextsoft-currency-change', handleCustomChange);
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('nextsoft-currency-change', handleCustomChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const setSelectedCurrency = (curr: CurrencyCode) => {
    if (CURRENCIES[curr]) {
      setSelectedCurrencyState(curr);
      if (typeof window !== 'undefined') {
        localStorage.setItem('nextsofthr-currency', curr);
        localStorage.setItem('nextsoft_currency_preference', curr);
        window.dispatchEvent(new CustomEvent('nextsoft-currency-change', { detail: curr }));
      }
    }
  };

  const currencyConfig = CURRENCIES[selectedCurrency] || CURRENCIES.USD;

  const formatAmount = (amountInUSD: number): string => {
    return currencyConfig.format(amountInUSD);
  };

  const convertAmount = (amountInUSD: number): number => {
    return Math.round(amountInUSD * currencyConfig.exchangeRate);
  };

  const value: CurrencyContextType = {
    selectedCurrency,
    setSelectedCurrency,
    currencyConfig,
    currencies: CURRENCIES,
    allCurrencies: Object.values(CURRENCIES),
    formatAmount,
    convertAmount,
  };

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
