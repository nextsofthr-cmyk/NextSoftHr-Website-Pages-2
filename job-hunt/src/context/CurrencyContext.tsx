import React, { createContext, useContext, useState, useMemo } from 'react';
import { CurrencyCode, CurrencyConfig } from '../types';
import {
  WORLD_CURRENCIES,
  ALL_WORLD_CURRENCIES_LIST,
  POPULAR_CURRENCIES_CODES,
  getCurrencyConfig,
  searchWorldCurrencies,
} from '../data/worldCurrencies';

interface CurrencyContextType {
  selectedCurrency: CurrencyCode;
  setSelectedCurrency: (currency: CurrencyCode) => void;
  currencyConfig: CurrencyConfig;
  currencies: Record<string, CurrencyConfig>;
  allCurrencies: CurrencyConfig[];
  popularCurrencies: CurrencyConfig[];
  searchCurrencies: (query: string) => CurrencyConfig[];
  formatAmount: (amountInUSD: number) => string;
  convertAmount: (amountInUSD: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCurrency, setSelectedCurrencyState] = useState<CurrencyCode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nextsofthr-currency') as CurrencyCode;
      if (saved && WORLD_CURRENCIES[saved]) {
        return saved;
      }
    }
    // Default to Nigerian Naira as requested
    return 'NGN';
  });

  const setSelectedCurrency = (curr: CurrencyCode) => {
    const uppercaseCode = curr.toUpperCase();
    if (WORLD_CURRENCIES[uppercaseCode]) {
      setSelectedCurrencyState(uppercaseCode);
      if (typeof window !== 'undefined') {
        localStorage.setItem('nextsofthr-currency', uppercaseCode);
      }
    }
  };

  const currencyConfig = getCurrencyConfig(selectedCurrency);

  const formatAmount = (amountInUSD: number): string => {
    return currencyConfig.format(amountInUSD);
  };

  const convertAmount = (amountInUSD: number): number => {
    return Math.round(amountInUSD * currencyConfig.exchangeRate);
  };

  const popularCurrenciesList = useMemo(() => {
    return POPULAR_CURRENCIES_CODES.map((code) => WORLD_CURRENCIES[code]).filter(Boolean);
  }, []);

  const value: CurrencyContextType = {
    selectedCurrency,
    setSelectedCurrency,
    currencyConfig,
    currencies: WORLD_CURRENCIES,
    allCurrencies: ALL_WORLD_CURRENCIES_LIST,
    popularCurrencies: popularCurrenciesList,
    searchCurrencies: searchWorldCurrencies,
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
