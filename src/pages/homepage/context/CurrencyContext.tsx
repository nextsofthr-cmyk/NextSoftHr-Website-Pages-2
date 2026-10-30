import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';

export type MajorCurrency = 'NGN' | 'USD' | 'KES' | 'EUR' | 'GBP';

export interface CurrencyDetails {
  code: MajorCurrency;
  name: string;
  symbol: string;
  flag: string;
  country: string;
  region: string;
  ratePerUSD: number; // 1 USD = X Currency Units
  decimals: number;
  formatLocale: string;
  clearingRail: string;
}

export const MAJOR_CURRENCIES: Record<MajorCurrency, CurrencyDetails> = {
  USD: {
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
    flag: '🇺🇸',
    country: 'United States',
    region: 'North America / Global',
    ratePerUSD: 1.0,
    decimals: 2,
    formatLocale: 'en-US',
    clearingRail: 'ACH & Fedwire Instant'
  },
  NGN: {
    code: 'NGN',
    name: 'Nigerian Naira',
    symbol: '₦',
    flag: '🇳🇬',
    country: 'Nigeria',
    region: 'West Africa (ECOWAS)',
    ratePerUSD: 1485.0,
    decimals: 0,
    formatLocale: 'en-NG',
    clearingRail: 'NIP Instant Interbank'
  },
  KES: {
    code: 'KES',
    name: 'Kenyan Shilling',
    symbol: 'KSh',
    flag: '🇰🇪',
    country: 'Kenya',
    region: 'East Africa (EAC)',
    ratePerUSD: 129.5,
    decimals: 0,
    formatLocale: 'en-KE',
    clearingRail: 'M-Pesa B2C & Pesalink'
  },
  EUR: {
    code: 'EUR',
    name: 'Euro',
    symbol: '€',
    flag: '🇪🇺',
    country: 'Eurozone',
    region: 'European Union',
    ratePerUSD: 0.92,
    decimals: 2,
    formatLocale: 'de-DE',
    clearingRail: 'SEPA Instant Credit'
  },
  GBP: {
    code: 'GBP',
    name: 'British Pound',
    symbol: '£',
    flag: '🇬🇧',
    country: 'United Kingdom',
    region: 'UK & Crown Dependencies',
    ratePerUSD: 0.77,
    decimals: 2,
    formatLocale: 'en-GB',
    clearingRail: 'Faster Payments Direct'
  }
};

export const MAJOR_CURRENCIES_LIST: CurrencyDetails[] = [
  MAJOR_CURRENCIES.USD,
  MAJOR_CURRENCIES.NGN,
  MAJOR_CURRENCIES.KES,
  MAJOR_CURRENCIES.EUR,
  MAJOR_CURRENCIES.GBP
];

export interface FormatOptions {
  showDecimals?: boolean;
  compact?: boolean;
  overrideCurrency?: MajorCurrency;
  includeCode?: boolean;
}

interface CurrencyContextType {
  currency: MajorCurrency;
  setCurrency: (currency: MajorCurrency) => void;
  currencyInfo: CurrencyDetails;
  currencies: CurrencyDetails[];
  rates: Record<MajorCurrency, number>;
  convertFromUSD: (amountInUSD: number, targetCurrency?: MajorCurrency) => number;
  convertToUSD: (amountInCurrent: number, fromCurrency?: MajorCurrency) => number;
  convertBetween: (amount: number, from: MajorCurrency, to: MajorCurrency) => number;
  formatMoney: (amountInUSD: number, options?: FormatOptions) => string;
  formatRaw: (amountInCurrentCurrency: number, options?: FormatOptions) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const STORAGE_KEY = 'nextsoft_currency_preference';

export { CurrencyContext };

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrencyState] = useState<MajorCurrency>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as MajorCurrency | null;
      if (saved && MAJOR_CURRENCIES[saved]) {
        return saved;
      }
      const secondarySaved = localStorage.getItem('nextsofthr-currency') as MajorCurrency | null;
      if (secondarySaved && MAJOR_CURRENCIES[secondarySaved]) {
        return secondarySaved;
      }
    } catch {
      // LocalStorage access issues fallback to USD
    }
    return 'USD';
  });

  const setCurrency = (newCurrency: MajorCurrency) => {
    if (MAJOR_CURRENCIES[newCurrency]) {
      setCurrencyState(newCurrency);
      try {
        localStorage.setItem(STORAGE_KEY, newCurrency);
        localStorage.setItem('nextsofthr-currency', newCurrency);
        window.dispatchEvent(new CustomEvent('nextsoft-currency-change', { detail: newCurrency }));
      } catch {
        // Ignore storage errors
      }
    }
  };

  useEffect(() => {
    const handleCustomChange = (e: Event) => {
      const customEvent = e as CustomEvent<MajorCurrency>;
      if (customEvent.detail && MAJOR_CURRENCIES[customEvent.detail] && customEvent.detail !== currency) {
        setCurrencyState(customEvent.detail);
      }
    };
    const handleStorage = (e: StorageEvent) => {
      if (
        (e.key === STORAGE_KEY || e.key === 'nextsofthr-currency') &&
        e.newValue &&
        MAJOR_CURRENCIES[e.newValue as MajorCurrency]
      ) {
        setCurrencyState(e.newValue as MajorCurrency);
      }
    };
    window.addEventListener('nextsoft-currency-change', handleCustomChange);
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('nextsoft-currency-change', handleCustomChange);
      window.removeEventListener('storage', handleStorage);
    };
  }, [currency]);

  const currencyInfo = useMemo(() => MAJOR_CURRENCIES[currency], [currency]);

  const rates = useMemo(() => {
    const r: Record<MajorCurrency, number> = {
      USD: MAJOR_CURRENCIES.USD.ratePerUSD,
      NGN: MAJOR_CURRENCIES.NGN.ratePerUSD,
      KES: MAJOR_CURRENCIES.KES.ratePerUSD,
      EUR: MAJOR_CURRENCIES.EUR.ratePerUSD,
      GBP: MAJOR_CURRENCIES.GBP.ratePerUSD
    };
    return r;
  }, []);

  const convertFromUSD = (amountInUSD: number, targetCurrency?: MajorCurrency): number => {
    const target = targetCurrency || currency;
    const rate = MAJOR_CURRENCIES[target]?.ratePerUSD ?? 1;
    return amountInUSD * rate;
  };

  const convertToUSD = (amountInCurrent: number, fromCurrency?: MajorCurrency): number => {
    const from = fromCurrency || currency;
    const rate = MAJOR_CURRENCIES[from]?.ratePerUSD ?? 1;
    return rate > 0 ? amountInCurrent / rate : amountInCurrent;
  };

  const convertBetween = (amount: number, from: MajorCurrency, to: MajorCurrency): number => {
    if (from === to) return amount;
    const amountInUSD = convertToUSD(amount, from);
    return convertFromUSD(amountInUSD, to);
  };

  const formatRaw = (amount: number, options?: FormatOptions): string => {
    const targetCode = options?.overrideCurrency || currency;
    const info = MAJOR_CURRENCIES[targetCode] || MAJOR_CURRENCIES.USD;
    const isZeroDecimals = info.decimals === 0 && !options?.showDecimals;

    if (options?.compact) {
      const abs = Math.abs(amount);
      const sign = amount < 0 ? '-' : '';
      if (abs >= 1_000_000_000) {
        return `${sign}${info.symbol}${(abs / 1_000_000_000).toFixed(1)}B`;
      }
      if (abs >= 1_000_000) {
        return `${sign}${info.symbol}${(abs / 1_000_000).toFixed(1)}M`;
      }
      if (abs >= 1_000) {
        return `${sign}${info.symbol}${(abs / 1_000).toFixed(0)}K`;
      }
    }

    const minDec = isZeroDecimals ? 0 : options?.showDecimals ? info.decimals : 0;
    const maxDec = isZeroDecimals ? 0 : info.decimals;

    const formattedNum = Math.abs(amount).toLocaleString('en-US', {
      minimumFractionDigits: minDec,
      maximumFractionDigits: maxDec
    });

    const prefix = amount < 0 ? `-${info.symbol}` : info.symbol;
    const suffix = options?.includeCode ? ` ${info.code}` : '';
    return `${prefix}${formattedNum}${suffix}`;
  };

  const formatMoney = (amountInUSD: number, options?: FormatOptions): string => {
    const converted = convertFromUSD(amountInUSD, options?.overrideCurrency);
    return formatRaw(converted, options);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        currencyInfo,
        currencies: MAJOR_CURRENCIES_LIST,
        rates,
        convertFromUSD,
        convertToUSD,
        convertBetween,
        formatMoney,
        formatRaw
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

export const useSafeCurrency = (): CurrencyContextType | undefined => {
  return useContext(CurrencyContext);
};

