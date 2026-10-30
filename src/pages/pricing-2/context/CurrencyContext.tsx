import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { CurrencyCode, CurrencyConfig } from '../types';
import {
  WORLD_CURRENCIES,
  ALL_WORLD_CURRENCIES_LIST,
  POPULAR_CURRENCIES_CODES,
  getCurrencyConfig,
  searchWorldCurrencies,
} from '../data/worldCurrencies';
import { useSafeCurrency } from '../../homepage/context/CurrencyContext';

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
  const globalCurrency = useSafeCurrency();

  const [selectedCurrency, setSelectedCurrencyState] = useState<CurrencyCode>(() => {
    if (typeof window !== 'undefined') {
      const globalSaved = localStorage.getItem('nextsoft_currency_preference') as CurrencyCode;
      if (globalSaved && WORLD_CURRENCIES[globalSaved]) {
        return globalSaved;
      }
      const saved = localStorage.getItem('nextsofthr-currency') as CurrencyCode;
      if (saved && WORLD_CURRENCIES[saved]) {
        return saved;
      }
    }
    if (globalCurrency?.currency && WORLD_CURRENCIES[globalCurrency.currency]) {
      return globalCurrency.currency;
    }
    return 'NGN';
  });

  useEffect(() => {
    if (globalCurrency?.currency && WORLD_CURRENCIES[globalCurrency.currency]) {
      setSelectedCurrencyState(globalCurrency.currency);
    }
  }, [globalCurrency?.currency]);

  useEffect(() => {
    const handleCustomChange = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail && WORLD_CURRENCIES[customEvent.detail.toUpperCase()]) {
        setSelectedCurrencyState(customEvent.detail.toUpperCase());
      }
    };
    window.addEventListener('nextsoft-currency-change', handleCustomChange);
    return () => window.removeEventListener('nextsoft-currency-change', handleCustomChange);
  }, []);

  const setSelectedCurrency = (curr: CurrencyCode) => {
    const uppercaseCode = curr.toUpperCase();
    if (WORLD_CURRENCIES[uppercaseCode]) {
      setSelectedCurrencyState(uppercaseCode);
      if (typeof window !== 'undefined') {
        localStorage.setItem('nextsofthr-currency', uppercaseCode);
        localStorage.setItem('nextsoft_currency_preference', uppercaseCode);
        window.dispatchEvent(new CustomEvent('nextsoft-currency-change', { detail: uppercaseCode }));
      }
      if (
        globalCurrency &&
        globalCurrency.currency !== uppercaseCode &&
        ['NGN', 'USD', 'KES', 'EUR', 'GBP'].includes(uppercaseCode)
      ) {
        globalCurrency.setCurrency(uppercaseCode as any);
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
