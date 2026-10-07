import React, { createContext, useContext, useState, useEffect } from 'react';

export type CurrencyCode =
  | 'USD'
  | 'NGN'
  | 'GBP'
  | 'EUR'
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
  | 'ZIP';

export interface CurrencyInfo {
  code: CurrencyCode;
  name: string;
  symbol: string;
  flag: string;
  region: string;
  ratePerUSD: number; // 1 USD = ratePerUSD in this currency
  decimals: number;
  symbolPosition: 'prefix' | 'suffix';
}

export const SUPPORTED_CURRENCIES: CurrencyInfo[] = [
  {
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
    flag: '🇺🇸',
    region: 'Global / Americas',
    ratePerUSD: 1.0,
    decimals: 2,
    symbolPosition: 'prefix',
  },
  {
    code: 'NGN',
    name: 'Nigerian Naira',
    symbol: '₦',
    flag: '🇳🇬',
    region: 'West Africa (Nigeria)',
    ratePerUSD: 1500.0,
    decimals: 0,
    symbolPosition: 'prefix',
  },
  {
    code: 'GBP',
    name: 'British Pound',
    symbol: '£',
    flag: '🇬🇧',
    region: 'United Kingdom / Europe',
    ratePerUSD: 0.79,
    decimals: 2,
    symbolPosition: 'prefix',
  },
  {
    code: 'EUR',
    name: 'Euro',
    symbol: '€',
    flag: '🇪🇺',
    region: 'European Union',
    ratePerUSD: 0.92,
    decimals: 2,
    symbolPosition: 'prefix',
  },
  {
    code: 'KES',
    name: 'Kenyan Shilling',
    symbol: 'KSh ',
    flag: '🇰🇪',
    region: 'East Africa (Kenya)',
    ratePerUSD: 130.0,
    decimals: 0,
    symbolPosition: 'prefix',
  },
  {
    code: 'ZAR',
    name: 'South African Rand',
    symbol: 'R ',
    flag: '🇿🇦',
    region: 'Southern Africa',
    ratePerUSD: 18.2,
    decimals: 2,
    symbolPosition: 'prefix',
  },
  {
    code: 'GHS',
    name: 'Ghanaian Cedi',
    symbol: 'GH₵ ',
    flag: '🇬🇭',
    region: 'West Africa (Ghana)',
    ratePerUSD: 15.6,
    decimals: 2,
    symbolPosition: 'prefix',
  },
  {
    code: 'MAD',
    name: 'Moroccan Dirham',
    symbol: 'MAD ',
    flag: '🇲🇦',
    region: 'North Africa (Morocco)',
    ratePerUSD: 9.9,
    decimals: 2,
    symbolPosition: 'prefix',
  },
  {
    code: 'XAF',
    name: 'Central African Franc (FCFA)',
    symbol: 'FCFA ',
    flag: '🇨🇲',
    region: 'Central & West Africa',
    ratePerUSD: 605.0,
    decimals: 0,
    symbolPosition: 'prefix',
  },
  {
    code: 'AED',
    name: 'UAE Dirham',
    symbol: 'AED ',
    flag: '🇦🇪',
    region: 'Middle East (UAE)',
    ratePerUSD: 3.67,
    decimals: 2,
    symbolPosition: 'prefix',
  },
  {
    code: 'UGX',
    name: 'Ugandan Shilling',
    symbol: 'USh ',
    flag: '🇺🇬',
    region: 'East Africa (Uganda)',
    ratePerUSD: 3720.0,
    decimals: 0,
    symbolPosition: 'prefix',
  },
  {
    code: 'TZS',
    name: 'Tanzanian Shilling',
    symbol: 'TSh ',
    flag: '🇹🇿',
    region: 'East Africa (Tanzania)',
    ratePerUSD: 2620.0,
    decimals: 0,
    symbolPosition: 'prefix',
  },
  {
    code: 'RWF',
    name: 'Rwandan Franc',
    symbol: 'FRw ',
    flag: '🇷🇼',
    region: 'East Africa (Rwanda)',
    ratePerUSD: 1350.0,
    decimals: 0,
    symbolPosition: 'prefix',
  },
  {
    code: 'ZMW',
    name: 'Zambian Kwacha',
    symbol: 'ZK ',
    flag: '🇿🇲',
    region: 'Southern Africa (Zambia)',
    ratePerUSD: 26.8,
    decimals: 2,
    symbolPosition: 'prefix',
  },
  {
    code: 'EGP',
    name: 'Egyptian Pound',
    symbol: 'E£ ',
    flag: '🇪🇬',
    region: 'North Africa (Egypt)',
    ratePerUSD: 48.6,
    decimals: 2,
    symbolPosition: 'prefix',
  },
  {
    code: 'ZIP',
    name: 'Zimbabwe Gold (ZiG)',
    symbol: 'ZiG ',
    flag: '🇿🇼',
    region: 'Southern Africa (Zimbabwe)',
    ratePerUSD: 14.2,
    decimals: 2,
    symbolPosition: 'prefix',
  },
];

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  currentCurrency: CurrencyInfo;
  supportedCurrencies: CurrencyInfo[];
  convertFromUSD: (amountInUSD: number) => number;
  convertFromNGN: (amountInNGN: number) => number;
  convert: (amount: number, from: CurrencyCode, to: CurrencyCode) => number;
  formatFromUSD: (
    amountInUSD: number,
    options?: { showCents?: boolean; compact?: boolean }
  ) => string;
  formatFromNGN: (
    amountInNGN: number,
    options?: { showCents?: boolean; compact?: boolean }
  ) => string;
  formatValue: (
    valueInCurrentCurrency: number,
    options?: { showCents?: boolean; compact?: boolean }
  ) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nextsofthr_currency') as CurrencyCode;
      if (saved && SUPPORTED_CURRENCIES.some((c) => c.code === saved)) {
        return saved;
      }
    }
    return 'USD';
  });

  const currentCurrency =
    SUPPORTED_CURRENCIES.find((c) => c.code === currency) || SUPPORTED_CURRENCIES[0];

  useEffect(() => {
    localStorage.setItem('nextsofthr_currency', currency);
  }, [currency]);

  const setCurrency = (code: CurrencyCode) => {
    if (SUPPORTED_CURRENCIES.some((c) => c.code === code)) {
      setCurrencyState(code);
    }
  };

  const convertFromUSD = (amountInUSD: number): number => {
    return amountInUSD * currentCurrency.ratePerUSD;
  };

  // 1500 NGN = 1 USD baseline
  const convertFromNGN = (amountInNGN: number): number => {
    const amountInUSD = amountInNGN / 1500.0;
    return convertFromUSD(amountInUSD);
  };

  const convert = (amount: number, from: CurrencyCode, to: CurrencyCode): number => {
    const fromInfo = SUPPORTED_CURRENCIES.find((c) => c.code === from) || SUPPORTED_CURRENCIES[0];
    const toInfo = SUPPORTED_CURRENCIES.find((c) => c.code === to) || SUPPORTED_CURRENCIES[0];
    const amountInUSD = amount / fromInfo.ratePerUSD;
    return amountInUSD * toInfo.ratePerUSD;
  };

  const formatValue = (
    val: number,
    options?: { showCents?: boolean; compact?: boolean }
  ): string => {
    const { showCents = false, compact = false } = options || {};

    let formattedNumber: string;

    if (compact) {
      if (Math.abs(val) >= 1_000_000) {
        formattedNumber = (val / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
      } else if (Math.abs(val) >= 1_000) {
        formattedNumber = (val / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
      } else {
        formattedNumber = val.toLocaleString(undefined, {
          maximumFractionDigits: showCents ? currentCurrency.decimals : 0,
        });
      }
    } else {
      formattedNumber = val.toLocaleString(undefined, {
        minimumFractionDigits: showCents ? currentCurrency.decimals : 0,
        maximumFractionDigits: showCents ? currentCurrency.decimals : 0,
      });
    }

    if (currentCurrency.symbolPosition === 'suffix') {
      return `${formattedNumber} ${currentCurrency.symbol}`;
    }
    return `${currentCurrency.symbol}${formattedNumber}`;
  };

  const formatFromUSD = (
    amountInUSD: number,
    options?: { showCents?: boolean; compact?: boolean }
  ): string => {
    const converted = convertFromUSD(amountInUSD);
    return formatValue(converted, options);
  };

  const formatFromNGN = (
    amountInNGN: number,
    options?: { showCents?: boolean; compact?: boolean }
  ): string => {
    const converted = convertFromNGN(amountInNGN);
    return formatValue(converted, options);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        currentCurrency,
        supportedCurrencies: SUPPORTED_CURRENCIES,
        convertFromUSD,
        convertFromNGN,
        convert,
        formatFromUSD,
        formatFromNGN,
        formatValue,
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
