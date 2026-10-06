import { PartnerReferral, RewardRedemptionItem, PartnerRewardAccount } from '../types';

export const INITIAL_REWARD_ACCOUNT: PartnerRewardAccount = {
  partnerId: 'next-hr-solutions',
  partnerName: 'NextHR Solutions Ltd',
  partnerLevel: 'Strategic Partner',
  totalPointsEarned: 3850,
  availableBalance: 2150,
  redeemedPoints: 1700,
  tierMultiplier: 1.4, // Strategic partner gets 40% points boost
  referralCount: 9,
  successfulConversions: 7
};

export const INITIAL_REFERRALS: PartnerReferral[] = [
  {
    id: 'ref-101',
    referringPartnerId: 'next-hr-solutions',
    referringPartnerName: 'NextHR Solutions Ltd',
    candidateName: 'Zainab Logistics & Haulage Ltd',
    candidateType: 'business_client',
    contactPerson: 'Babatunde Olatunji',
    email: 'b.olatunji@zainabhaulage.ng',
    phone: '+234 802 341 9912',
    country: 'Nigeria',
    city: 'Lagos',
    estimatedSeats: '250 - 500 Staff',
    notes: 'Multi-branch logistics depot requiring biometric attendance and payroll automation across 4 hubs.',
    status: 'rewards_paid',
    pointsAwarded: 700,
    potentialPoints: 700,
    cashValueUSD: 700,
    createdAt: '2026-08-14T10:30:00Z',
    updatedAt: '2026-09-02T14:15:00Z'
  },
  {
    id: 'ref-102',
    referringPartnerId: 'next-hr-solutions',
    referringPartnerName: 'NextHR Solutions Ltd',
    candidateName: 'Kestrel Talent Advisory Partners',
    candidateType: 'consultant_partner',
    contactPerson: 'David Mwangi',
    email: 'david@kestreladvisory.ke',
    phone: '+254 712 908 433',
    country: 'Kenya',
    city: 'Nairobi',
    estimatedSeats: 'HR Consulting & Outsourcing Firm',
    notes: 'Boutique consultancy managing 28 SME clients looking to resell NextSofthr KRA payroll suite.',
    status: 'won_activated',
    pointsAwarded: 500,
    potentialPoints: 500,
    cashValueUSD: 500,
    createdAt: '2026-08-28T09:00:00Z',
    updatedAt: '2026-09-18T11:20:00Z'
  },
  {
    id: 'ref-103',
    referringPartnerId: 'next-hr-solutions',
    referringPartnerName: 'NextHR Solutions Ltd',
    candidateName: 'Atlantic Maritime Engineering',
    candidateType: 'business_client',
    contactPerson: 'Kwame Mensah',
    email: 'kwame.mensah@atlanticmaritime.com.gh',
    phone: '+233 24 551 8904',
    country: 'Ghana',
    city: 'Tema',
    estimatedSeats: '100 - 250 Staff',
    notes: 'Requires shift roistering, offshore crew timesheets, and SSNIT tax compliance.',
    status: 'demo_scheduled',
    pointsAwarded: 100,
    potentialPoints: 600,
    cashValueUSD: 100,
    createdAt: '2026-09-15T15:45:00Z',
    updatedAt: '2026-09-24T16:30:00Z'
  },
  {
    id: 'ref-104',
    referringPartnerId: 'next-hr-solutions',
    referringPartnerName: 'NextHR Solutions Ltd',
    candidateName: 'Horizon Health Hospital Network',
    candidateType: 'business_client',
    contactPerson: 'Dr. Thandiwe Sithole',
    email: 't.sithole@horizonhealth.co.za',
    phone: '+27 11 884 2190',
    country: 'South Africa',
    city: 'Johannesburg',
    estimatedSeats: '500+ Staff (Enterprise)',
    notes: 'Healthcare shift scheduling and SARS PAYE consolidation for 3 clinic locations.',
    status: 'contacted',
    pointsAwarded: 50,
    potentialPoints: 850,
    cashValueUSD: 50,
    createdAt: '2026-09-22T08:15:00Z',
    updatedAt: '2026-09-26T10:00:00Z'
  },
  {
    id: 'ref-105',
    referringPartnerId: 'next-hr-solutions',
    referringPartnerName: 'NextHR Solutions Ltd',
    candidateName: 'Kigali FinTech Associates',
    candidateType: 'consultant_partner',
    contactPerson: 'Jean-Paul Habimana',
    email: 'jp.habimana@kigalifintech.rw',
    phone: '+250 788 123 456',
    country: 'Rwanda',
    city: 'Kigali',
    estimatedSeats: 'Cloud Integration Practice',
    notes: 'Accounting and ERP developers wanting to build automated banking connectors for Rwanda banks.',
    status: 'submitted',
    pointsAwarded: 50,
    potentialPoints: 450,
    cashValueUSD: 50,
    createdAt: '2026-09-29T11:00:00Z',
    updatedAt: '2026-09-29T11:00:00Z'
  }
];

export const REWARD_REDEMPTION_ITEMS: RewardRedemptionItem[] = [
  {
    id: 'rew-wire-500',
    title: 'Direct Bank Wire / Cash Commission',
    pointsCost: 500,
    category: 'cash',
    description: 'Instant conversion of points to direct cash payout via SWIFT, NIP, or M-Pesa. 1 point = $1 USD.',
    iconName: 'Banknote',
    badge: 'Most Popular'
  },
  {
    id: 'rew-cert-voucher',
    title: 'NextSofthr Certified Specialist Exam',
    pointsCost: 150,
    category: 'certification',
    description: 'Complimentary official certification exam voucher for your team engineers and payroll managers.',
    iconName: 'Award',
    badge: '100% Off Exam'
  },
  {
    id: 'rew-sandbox-ent',
    title: 'Dedicated Enterprise Sandbox (12 Months)',
    pointsCost: 400,
    category: 'software',
    description: 'Full unthrottled NextSofthr multi-tenant environment with preloaded African tax tables and custom API keys.',
    iconName: 'Server',
    badge: '$600 Value'
  },
  {
    id: 'rew-directory-sponsor',
    title: 'Featured Partner Directory Banner (3 Months)',
    pointsCost: 750,
    category: 'sponsorship',
    description: 'Top-tier pinned placement on NextSofthr Partner Registry homepage for your primary country market.',
    iconName: 'Sparkles',
    badge: 'High Visibility'
  },
  {
    id: 'rew-summit-vip',
    title: 'VIP Pass: Pan-African Partner Summit',
    pointsCost: 2000,
    category: 'event',
    description: 'All-access VIP ticket including gala dinner, keynote stage briefing, and executive networking suite in Kigali.',
    iconName: 'Crown',
    badge: 'VIP Exclusive'
  },
  {
    id: 'rew-biometric-terminal',
    title: 'Biometric Time-Clock Demo Terminal Kit',
    pointsCost: 950,
    category: 'software',
    description: 'Hardware facial/fingerprint scanner pre-integrated with NextSofthr for client on-site demonstrations.',
    iconName: 'Cpu',
    badge: 'Hardware Kit'
  }
];

export const MONTHLY_POINTS_HISTORY = [
  { month: 'Apr', points: 400, referrals: 1 },
  { month: 'May', points: 650, referrals: 2 },
  { month: 'Jun', points: 850, referrals: 2 },
  { month: 'Jul', points: 700, referrals: 1 },
  { month: 'Aug', points: 1200, referrals: 3 },
  { month: 'Sep', points: 950, referrals: 2 }
];
