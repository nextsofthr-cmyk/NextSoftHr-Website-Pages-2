import { PPPRegion, CurrencyCode } from '../types';

export type { PPPRegion };

export const PPP_REGIONS: PPPRegion[] = [
  {
    id: 'global',
    name: 'Global Standard (North America & Europe)',
    shortLabel: 'Global Standard',
    flag: '🌍',
    currency: 'USD',
    discountPercent: 0,
    factor: 1.0,
    description: 'Standard baseline SaaS pricing for global markets.',
    badgeText: 'Standard International',
  },
  {
    id: 'india',
    name: 'India & South Asia',
    shortLabel: 'India',
    flag: '🇮🇳',
    currency: 'INR',
    discountPercent: 40,
    factor: 0.60,
    description: 'Purchasing Power Parity (PPP) adjusted rates for Indian businesses (40% localized discount).',
    badgeText: 'India PPP: 40% Off',
  },
  {
    id: 'brazil',
    name: 'Brazil & Latin America',
    shortLabel: 'Brazil',
    flag: '🇧🇷',
    currency: 'BRL',
    discountPercent: 30,
    factor: 0.70,
    description: 'Purchasing Power Parity (PPP) adjusted rates for Brazil and Latin America (30% localized discount).',
    badgeText: 'Brazil PPP: 30% Off',
  },
  {
    id: 'southeast-asia',
    name: 'Southeast Asia (ASEAN)',
    shortLabel: 'Southeast Asia',
    flag: '🌏',
    currency: 'IDR',
    discountPercent: 35,
    factor: 0.65,
    description: 'Purchasing Power Parity adjusted rates for Indonesia, Philippines, Vietnam & Southeast Asia (35% localized discount).',
    badgeText: 'SE Asia PPP: 35% Off',
  },
  {
    id: 'nigeria',
    name: 'Nigeria & West Africa',
    shortLabel: 'Nigeria (Baseline)',
    flag: '🇳🇬',
    currency: 'NGN',
    discountPercent: 30,
    factor: 0.70,
    description: 'Regional benchmark pricing for Nigerian enterprises and West African organizations.',
    badgeText: 'West Africa: Regional Benchmark',
  },
];

export const getPPPRegionById = (id: string): PPPRegion => {
  return PPP_REGIONS.find((r) => r.id === id) || PPP_REGIONS[0];
};

export const applyPPPFactor = (amountUSD: number, factor: number): number => {
  if (amountUSD <= 0) return 0;
  return Math.round(amountUSD * factor * 100) / 100;
};
