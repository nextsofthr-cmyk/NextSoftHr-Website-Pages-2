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
      const saved = localStorage.getItem('nextsofthr-currency') as CurrencyCode;
      if (saved && CURRENCIES[saved]) {
        return saved;
      }
    }
    return 'USD';
  });

  const setSelectedCurrency = (curr: CurrencyCode) => {
    if (CURRENCIES[curr]) {
      setSelectedCurrencyState(curr);
      if (typeof window !== 'undefined') {
        localStorage.setItem('nextsofthr-currency', curr);
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
