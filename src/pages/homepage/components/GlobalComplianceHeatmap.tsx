import { useState, useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import { 
  ShieldCheck, Globe2, CheckCircle2, AlertCircle, FileCheck, 
  Sparkles, Filter, Info, ArrowUpRight, Scale, RefreshCw
} from 'lucide-react';

export interface ComplianceCell {
  regionId: string;
  regionName: string;
  country: string;
  flag: string;
  categoryKey: string;
  categoryLabel: string;
  score: number; // 0 - 100
  status: 'Full Automation' | 'Certified Direct' | 'Audit Guaranteed';
  statutoryAgencies: string[];
  keyLaw: string;
  penaltiesPrevented: string;
  filingCycle: string;
}

export interface RegionData {
  id: string;
  name: string;
  country: string;
  flag: string;
  continent: 'Africa' | 'Global';
  overallScore: number;
  totalEntities: string;
  localRail: string;
}

export const COMPLIANCE_DOMAINS = [
  { key: 'tax_paye', label: 'PAYE & Statutory Withholding' },
  { key: 'pension_social', label: 'Pensions & Social Funds' },
  { key: 'data_sovereignty', label: 'Data Privacy & Sovereignty' },
  { key: 'wage_protection', label: 'Wage Clearing & Banking' },
  { key: 'contractor_eor', label: 'Labor Law & EOR Parity' }
];

export const REGIONS: RegionData[] = [
  { id: 'ng', name: 'Nigeria', country: 'Nigeria', flag: '🇳🇬', continent: 'Africa', overallScore: 99.4, totalEntities: '1,420+ Co.', localRail: 'NIP / Remita / FIRS eTax' },
  { id: 'ke', name: 'Kenya', country: 'Kenya', flag: '🇰🇪', continent: 'Africa', overallScore: 99.1, totalEntities: '980+ Co.', localRail: 'Pesalink / M-Pesa / KRA iTax' },
  { id: 'za', name: 'South Africa', country: 'South Africa', flag: '🇿🇦', continent: 'Africa', overallScore: 98.8, totalEntities: '850+ Co.', localRail: 'BankservAfrica / SARS eFiling' },
  { id: 'gh', name: 'Ghana', country: 'Ghana', flag: '🇬🇭', continent: 'Africa', overallScore: 98.5, totalEntities: '620+ Co.', localRail: 'GhIPSS / GRA Tax / SSNIT Portal' },
  { id: 'rw', name: 'Rwanda', country: 'Rwanda', flag: '🇷🇼', continent: 'Africa', overallScore: 99.6, totalEntities: '440+ Co.', localRail: 'RIPPS / RRA E-Tax / RSSB' },
  { id: 'eg', name: 'Egypt', country: 'Egypt', flag: '🇪🇬', continent: 'Africa', overallScore: 97.9, totalEntities: '510+ Co.', localRail: 'InstaPay / ETA e-Receipt' },
  { id: 'uk_eu', name: 'UK & EU', country: 'United Kingdom / EU', flag: '🇬🇧🇪🇺', continent: 'Global', overallScore: 99.8, totalEntities: '1,890+ Co.', localRail: 'BACS / Faster Pay / SEPA' },
  { id: 'us_ca', name: 'US & Canada', country: 'USA / Canada', flag: '🇺🇸🇨🇦', continent: 'Global', overallScore: 99.7, totalEntities: '2,150+ Co.', localRail: 'ACH Direct / Fedwire / Interac' }
];

export const COMPLIANCE_MATRIX: ComplianceCell[] = [
  // Nigeria (ng)
  {
    regionId: 'ng',
    regionName: 'Nigeria',
    country: 'Nigeria',
    flag: '🇳🇬',
    categoryKey: 'tax_paye',
    categoryLabel: 'PAYE & Statutory Withholding',
    score: 100,
    status: 'Full Automation',
    statutoryAgencies: ['FIRS (Federal Inland Revenue)', 'State IRS (LIRS, OGIRS, etc.)', 'Industrial Training Fund (ITF)'],
    keyLaw: 'Finance Act 2023 / PITA Amendment',
    penaltiesPrevented: '10% late filing penalty + 21% compounding interest',
    filingCycle: 'Monthly before 10th'
  },
  {
    regionId: 'ng',
    regionName: 'Nigeria',
    country: 'Nigeria',
    flag: '🇳🇬',
    categoryKey: 'pension_social',
    categoryLabel: 'Pensions & Social Funds',
    score: 99,
    status: 'Certified Direct',
    statutoryAgencies: ['PenCom (Pension Commission)', 'NSITF (Employees Comp.)', 'NHF (National Housing Fund)'],
    keyLaw: 'Pension Reform Act (PRA 2014) - 8% Employee / 10% Employer',
    penaltiesPrevented: '2% monthly statutory surcharge on overdue remittance',
    filingCycle: 'Within 7 business days of salary disbursement'
  },
  {
    regionId: 'ng',
    regionName: 'Nigeria',
    country: 'Nigeria',
    flag: '🇳🇬',
    categoryKey: 'data_sovereignty',
    categoryLabel: 'Data Privacy & Sovereignty',
    score: 98,
    status: 'Audit Guaranteed',
    statutoryAgencies: ['NDPC (Nigeria Data Protection Commission)', 'NITDA Cloud Guidelines'],
    keyLaw: 'Nigeria Data Protection Act (NDPA 2023)',
    penaltiesPrevented: 'Up to ₦10M or 2% annual global gross turnover',
    filingCycle: 'Continuous monitoring + Annual audit'
  },
  {
    regionId: 'ng',
    regionName: 'Nigeria',
    country: 'Nigeria',
    flag: '🇳🇬',
    categoryKey: 'wage_protection',
    categoryLabel: 'Wage Clearing & Banking',
    score: 100,
    status: 'Full Automation',
    statutoryAgencies: ['Central Bank of Nigeria (CBN)', 'NIBSS (Instant Settlement)'],
    keyLaw: 'CBN Electronic Payments & Clearing Mandate',
    penaltiesPrevented: 'Zero failed payout holdbacks via 3-way instant retry',
    filingCycle: 'Instant automated salary clearing (< 60 sec)'
  },
  {
    regionId: 'ng',
    regionName: 'Nigeria',
    country: 'Nigeria',
    flag: '🇳🇬',
    categoryKey: 'contractor_eor',
    categoryLabel: 'Labor Law & EOR Parity',
    score: 99,
    status: 'Audit Guaranteed',
    statutoryAgencies: ['Federal Ministry of Labour & Employment', 'Industrial Court Directives'],
    keyLaw: 'Nigerian Labour Act Cap L1 LFN',
    penaltiesPrevented: 'Worker misclassification & severance backpay disputes',
    filingCycle: 'Bi-annual contract audit'
  },

  // Kenya (ke)
  {
    regionId: 'ke',
    regionName: 'Kenya',
    country: 'Kenya',
    flag: '🇰🇪',
    categoryKey: 'tax_paye',
    categoryLabel: 'PAYE & Statutory Withholding',
    score: 99,
    status: 'Full Automation',
    statutoryAgencies: ['KRA (Kenya Revenue Authority)', 'iTax Direct Connector'],
    keyLaw: 'Finance Act 2023 / Income Tax Act Cap 470',
    penaltiesPrevented: '5% of tax due or KSh 20,000 + 1% monthly late interest',
    filingCycle: 'Monthly on or before 9th'
  },
  {
    regionId: 'ke',
    regionName: 'Kenya',
    country: 'Kenya',
    flag: '🇰🇪',
    categoryKey: 'pension_social',
    categoryLabel: 'Pensions & Social Funds',
    score: 100,
    status: 'Full Automation',
    statutoryAgencies: ['NSSF (National Social Security Fund)', 'SHIF (Social Health Authority)', 'Affordable Housing Levy (AHL 1.5%)'],
    keyLaw: 'NSSF Act 2013 Tier I & II & SHIF Transition Act',
    penaltiesPrevented: '5% monthly compound penalty on outstanding contributions',
    filingCycle: 'Monthly before 9th'
  },
  {
    regionId: 'ke',
    regionName: 'Kenya',
    country: 'Kenya',
    flag: '🇰🇪',
    categoryKey: 'data_sovereignty',
    categoryLabel: 'Data Privacy & Sovereignty',
    score: 98,
    status: 'Audit Guaranteed',
    statutoryAgencies: ['ODPC (Office of the Data Protection Commissioner)'],
    keyLaw: 'Kenya Data Protection Act 2019',
    penaltiesPrevented: 'Up to KSh 5M or 1% annual turnover statutory fine',
    filingCycle: 'Annual statutory data audit & continuous encryption'
  },
  {
    regionId: 'ke',
    regionName: 'Kenya',
    country: 'Kenya',
    flag: '🇰🇪',
    categoryKey: 'wage_protection',
    categoryLabel: 'Wage Clearing & Banking',
    score: 100,
    status: 'Full Automation',
    statutoryAgencies: ['Central Bank of Kenya (CBK)', 'Safaricom M-Pesa B2C Rail', 'Pesalink Interbank'],
    keyLaw: 'National Payment System Act & Guidelines',
    penaltiesPrevented: 'Eliminates weekend clearing delays via 24/7 Mobile Money rails',
    filingCycle: 'Instant automated salary clearing (< 30 sec)'
  },
  {
    regionId: 'ke',
    regionName: 'Kenya',
    country: 'Kenya',
    flag: '🇰🇪',
    categoryKey: 'contractor_eor',
    categoryLabel: 'Labor Law & EOR Parity',
    score: 98,
    status: 'Audit Guaranteed',
    statutoryAgencies: ['Ministry of Labour and Social Protection'],
    keyLaw: 'Employment Act 2007 (Cap 226)',
    penaltiesPrevented: 'Unfair termination compensation (up to 12 months gross wages)',
    filingCycle: 'Quarterly compliance review'
  },

  // South Africa (za)
  {
    regionId: 'za',
    regionName: 'South Africa',
    country: 'South Africa',
    flag: '🇿🇦',
    categoryKey: 'tax_paye',
    categoryLabel: 'PAYE & Statutory Withholding',
    score: 99,
    status: 'Full Automation',
    statutoryAgencies: ['SARS (South African Revenue Service)', 'eFiling Direct Interface'],
    keyLaw: 'Income Tax Act 58 of 1962 / EMP201 & EMP501 Reconciliations',
    penaltiesPrevented: '10% late penalty + SARS prescribed interest rate',
    filingCycle: 'Monthly EMP201 before 7th'
  },
  {
    regionId: 'za',
    regionName: 'South Africa',
    country: 'South Africa',
    flag: '🇿🇦',
    categoryKey: 'pension_social',
    categoryLabel: 'Pensions & Social Funds',
    score: 98,
    status: 'Certified Direct',
    statutoryAgencies: ['UIF (Unemployment Insurance Fund)', 'Skills Development Levy (SDL)', 'Compensation Fund (COIDA)'],
    keyLaw: 'Unemployment Insurance Contributions Act 4 of 2002',
    penaltiesPrevented: '10% statutory surcharge + legal summons for non-declaration',
    filingCycle: 'Monthly with EMP201 bundle'
  },
  {
    regionId: 'za',
    regionName: 'South Africa',
    country: 'South Africa',
    flag: '🇿🇦',
    categoryKey: 'data_sovereignty',
    categoryLabel: 'Data Privacy & Sovereignty',
    score: 99,
    status: 'Audit Guaranteed',
    statutoryAgencies: ['Information Regulator South Africa'],
    keyLaw: 'Protection of Personal Information Act (POPIA)',
    penaltiesPrevented: 'Administrative fines up to R10 Million or imprisonment',
    filingCycle: 'Certified local South Africa cloud tenant & AES-256'
  },
  {
    regionId: 'za',
    regionName: 'South Africa',
    country: 'South Africa',
    flag: '🇿🇦',
    categoryKey: 'wage_protection',
    categoryLabel: 'Wage Clearing & Banking',
    score: 99,
    status: 'Full Automation',
    statutoryAgencies: ['South African Reserve Bank (SARB)', 'BankservAfrica / PayShap'],
    keyLaw: 'National Payment System Act (NPSA 78 of 1998)',
    penaltiesPrevented: 'Direct batch reconciliation prevents duplicate chargebacks',
    filingCycle: 'Same-day real-time electronic fund transfer'
  },
  {
    regionId: 'za',
    regionName: 'South Africa',
    country: 'South Africa',
    flag: '🇿🇦',
    categoryKey: 'contractor_eor',
    categoryLabel: 'Labor Law & EOR Parity',
    score: 98,
    status: 'Audit Guaranteed',
    statutoryAgencies: ['CCMA (Commission for Conciliation, Mediation and Arbitration)'],
    keyLaw: 'Basic Conditions of Employment Act (BCEA) & Labour Relations Act',
    penaltiesPrevented: 'CCMA reinstatement rulings & non-compliant overtime awards',
    filingCycle: 'Annual employment equity report'
  },

  // Ghana (gh)
  {
    regionId: 'gh',
    regionName: 'Ghana',
    country: 'Ghana',
    flag: '🇬🇭',
    categoryKey: 'tax_paye',
    categoryLabel: 'PAYE & Statutory Withholding',
    score: 98,
    status: 'Full Automation',
    statutoryAgencies: ['GRA (Ghana Revenue Authority)', 'taxpayer portal API'],
    keyLaw: 'Income Tax Act 2015 (Act 896)',
    penaltiesPrevented: 'GH¢500 initial fine + GH¢10 per day of continuous failure',
    filingCycle: 'Monthly on or before 15th'
  },
  {
    regionId: 'gh',
    regionName: 'Ghana',
    country: 'Ghana',
    flag: '🇬🇭',
    categoryKey: 'pension_social',
    categoryLabel: 'Pensions & Social Funds',
    score: 99,
    status: 'Full Automation',
    statutoryAgencies: ['SSNIT (Social Security and National Insurance Trust)', 'Tier 2 Custodian Trustees'],
    keyLaw: 'National Pensions Act 2008 (Act 766) - 13.5% First Tier / 5% Second Tier',
    penaltiesPrevented: '3% compounding monthly penalty on outstanding pension sum',
    filingCycle: 'Monthly by 14th of subsequent month'
  },
  {
    regionId: 'gh',
    regionName: 'Ghana',
    country: 'Ghana',
    flag: '🇬🇭',
    categoryKey: 'data_sovereignty',
    categoryLabel: 'Data Privacy & Sovereignty',
    score: 97,
    status: 'Audit Guaranteed',
    statutoryAgencies: ['Data Protection Commission (DPC Ghana)'],
    keyLaw: 'Data Protection Act 2012 (Act 843)',
    penaltiesPrevented: 'Financial penalties and license suspensions',
    filingCycle: 'Annual data controller certificate renewal'
  },
  {
    regionId: 'gh',
    regionName: 'Ghana',
    country: 'Ghana',
    flag: '🇬🇭',
    categoryKey: 'wage_protection',
    categoryLabel: 'Wage Clearing & Banking',
    score: 99,
    status: 'Full Automation',
    statutoryAgencies: ['Bank of Ghana (BoG)', 'GhIPSS Instant Pay (GIP) & Mobile Money'],
    keyLaw: 'Payment Systems and Services Act 2019 (Act 987)',
    penaltiesPrevented: 'Dual-rail routing avoids telecommunication downtime',
    filingCycle: 'Real-time multi-network mobile money & bank settlement'
  },
  {
    regionId: 'gh',
    regionName: 'Ghana',
    country: 'Ghana',
    flag: '🇬🇭',
    categoryKey: 'contractor_eor',
    categoryLabel: 'Labor Law & EOR Parity',
    score: 98,
    status: 'Audit Guaranteed',
    statutoryAgencies: ['National Labour Commission (NLC)'],
    keyLaw: 'Labour Act 2003 (Act 651)',
    penaltiesPrevented: 'Statutory redundancy payout disagreements',
    filingCycle: 'Quarterly contractor classification verification'
  },

  // Rwanda (rw)
  {
    regionId: 'rw',
    regionName: 'Rwanda',
    country: 'Rwanda',
    flag: '🇷🇼',
    categoryKey: 'tax_paye',
    categoryLabel: 'PAYE & Statutory Withholding',
    score: 100,
    status: 'Full Automation',
    statutoryAgencies: ['RRA (Rwanda Revenue Authority)', 'E-Tax Direct Integration'],
    keyLaw: 'Law Nº 027/2022 on Direct Taxes on Income',
    penaltiesPrevented: '20% to 50% non-declaration fine + late interest',
    filingCycle: 'Monthly on or before 15th'
  },
  {
    regionId: 'rw',
    regionName: 'Rwanda',
    country: 'Rwanda',
    flag: '🇷🇼',
    categoryKey: 'pension_social',
    categoryLabel: 'Pensions & Social Funds',
    score: 100,
    status: 'Full Automation',
    statutoryAgencies: ['RSSB (Rwanda Social Security Board)', 'Maternity Leave Benefits Scheme'],
    keyLaw: 'Law Nº 05/2015 governing Social Security in Rwanda (6% Pension + 0.6% Maternity)',
    penaltiesPrevented: '1.5% monthly late remittance penalty',
    filingCycle: 'Monthly on or before 15th'
  },
  {
    regionId: 'rw',
    regionName: 'Rwanda',
    country: 'Rwanda',
    flag: '🇷🇼',
    categoryKey: 'data_sovereignty',
    categoryLabel: 'Data Privacy & Sovereignty',
    score: 99,
    status: 'Audit Guaranteed',
    statutoryAgencies: ['National Cyber Security Authority (NCSA Rwanda)'],
    keyLaw: 'Law Nº 058/2021 on Personal Data Protection and Privacy',
    penaltiesPrevented: 'Administrative fines up to 5M RWF or 5% of turnover',
    filingCycle: 'Continuous monitoring & localized data residency'
  },
  {
    regionId: 'rw',
    regionName: 'Rwanda',
    country: 'Rwanda',
    flag: '🇷🇼',
    categoryKey: 'wage_protection',
    categoryLabel: 'Wage Clearing & Banking',
    score: 100,
    status: 'Full Automation',
    statutoryAgencies: ['National Bank of Rwanda (BNR)', 'RIPPS / MoMo Direct'],
    keyLaw: 'National Payment System Regulations',
    penaltiesPrevented: 'Instant transaction receipt generation prevents disputes',
    filingCycle: 'Direct instant clearing into commercial bank or MoMo'
  },
  {
    regionId: 'rw',
    regionName: 'Rwanda',
    country: 'Rwanda',
    flag: '🇷🇼',
    categoryKey: 'contractor_eor',
    categoryLabel: 'Labor Law & EOR Parity',
    score: 99,
    status: 'Audit Guaranteed',
    statutoryAgencies: ['MIFOTRA (Ministry of Public Service and Labour)'],
    keyLaw: 'Law Nº 66/2018 regulating Labor in Rwanda',
    penaltiesPrevented: 'Strict compliance with statutory leave & minimum wage standards',
    filingCycle: 'Annual labor compliance certificate'
  },

  // Egypt (eg)
  {
    regionId: 'eg',
    regionName: 'Egypt',
    country: 'Egypt',
    flag: '🇪🇬',
    categoryKey: 'tax_paye',
    categoryLabel: 'PAYE & Statutory Withholding',
    score: 98,
    status: 'Full Automation',
    statutoryAgencies: ['ETA (Egyptian Tax Authority)', 'Electronic Unified Payroll Tax System'],
    keyLaw: 'Unified Tax Procedures Law No. 206 of 2020',
    penaltiesPrevented: 'Up to 50,000 EGP late filing penalty + 2% per month interest',
    filingCycle: 'Monthly unified electronic payroll submission'
  },
  {
    regionId: 'eg',
    regionName: 'Egypt',
    country: 'Egypt',
    flag: '🇪🇬',
    categoryKey: 'pension_social',
    categoryLabel: 'Pensions & Social Funds',
    score: 97,
    status: 'Certified Direct',
    statutoryAgencies: ['NOSI (National Organization for Social Insurance)'],
    keyLaw: 'Social Insurance & Pensions Law No. 148 of 2019 (11% Employee / 18.75% Employer)',
    penaltiesPrevented: 'Late statutory interest at Central Bank lending rate + 2%',
    filingCycle: 'Monthly by 15th'
  },
  {
    regionId: 'eg',
    regionName: 'Egypt',
    country: 'Egypt',
    flag: '🇪🇬',
    categoryKey: 'data_sovereignty',
    categoryLabel: 'Data Privacy & Sovereignty',
    score: 97,
    status: 'Audit Guaranteed',
    statutoryAgencies: ['Data Protection Center (DPC Egypt)'],
    keyLaw: 'Data Protection Law No. 151 of 2020',
    penaltiesPrevented: 'Criminal and administrative fines up to 5M EGP',
    filingCycle: 'Local data sovereignty compliance'
  },
  {
    regionId: 'eg',
    regionName: 'Egypt',
    country: 'Egypt',
    flag: '🇪🇬',
    categoryKey: 'wage_protection',
    categoryLabel: 'Wage Clearing & Banking',
    score: 99,
    status: 'Full Automation',
    statutoryAgencies: ['Central Bank of Egypt (CBE)', 'InstaPay / National Clearing System'],
    keyLaw: 'Wages Protection System Directives',
    penaltiesPrevented: 'Guaranteed compliance with statutory minimum wages',
    filingCycle: 'Monthly automated digital bank payroll clearing'
  },
  {
    regionId: 'eg',
    regionName: 'Egypt',
    country: 'Egypt',
    flag: '🇪🇬',
    categoryKey: 'contractor_eor',
    categoryLabel: 'Labor Law & EOR Parity',
    score: 98,
    status: 'Audit Guaranteed',
    statutoryAgencies: ['Ministry of Manpower and Immigration'],
    keyLaw: 'Egyptian Labor Law No. 12 of 2003',
    penaltiesPrevented: 'Severance compensation and emergency fund disputes',
    filingCycle: 'Bi-annual audit'
  },

  // UK & EU (uk_eu)
  {
    regionId: 'uk_eu',
    regionName: 'UK & EU',
    country: 'United Kingdom & European Union',
    flag: '🇬🇧🇪🇺',
    categoryKey: 'tax_paye',
    categoryLabel: 'PAYE & Statutory Withholding',
    score: 100,
    status: 'Full Automation',
    statutoryAgencies: ['HMRC (Her Majesty’s Revenue & Customs)', 'EU National Tax Directorates'],
    keyLaw: 'Real Time Information (RTI) Full Payment Submissions (FPS)',
    penaltiesPrevented: '£100-£400 monthly automated HMRC RTI penalties',
    filingCycle: 'On or before employee payday (RTI real-time)'
  },
  {
    regionId: 'uk_eu',
    regionName: 'UK & EU',
    country: 'United Kingdom & European Union',
    flag: '🇬🇧🇪🇺',
    categoryKey: 'pension_social',
    categoryLabel: 'Pensions & Social Funds',
    score: 100,
    status: 'Full Automation',
    statutoryAgencies: ['The Pensions Regulator (TPR)', 'Nest / People’s Pension', 'National Social Security'],
    keyLaw: 'Pensions Act 2008 Workplace Pension Auto-Enrolment',
    penaltiesPrevented: 'Fixed £400 penalty + escalating daily fines up to £10,000/day',
    filingCycle: 'Monthly statutory deduction & declaration'
  },
  {
    regionId: 'uk_eu',
    regionName: 'UK & EU',
    country: 'United Kingdom & European Union',
    flag: '🇬🇧🇪🇺',
    categoryKey: 'data_sovereignty',
    categoryLabel: 'Data Privacy & Sovereignty',
    score: 100,
    status: 'Audit Guaranteed',
    statutoryAgencies: ['Information Commissioner’s Office (ICO)', 'EDPB (European Data Protection Board)'],
    keyLaw: 'General Data Protection Regulation (EU GDPR / UK GDPR)',
    penaltiesPrevented: 'Up to €20M or 4% of worldwide annual turnover',
    filingCycle: 'Continuous enterprise encryption & DPA documentation'
  },
  {
    regionId: 'uk_eu',
    regionName: 'UK & EU',
    country: 'United Kingdom & European Union',
    flag: '🇬🇧🇪🇺',
    categoryKey: 'wage_protection',
    categoryLabel: 'Wage Clearing & Banking',
    score: 100,
    status: 'Full Automation',
    statutoryAgencies: ['Bank of England', 'European Central Bank', 'SEPA / BACS Direct'],
    keyLaw: 'Payment Services Directive (PSD2 / Open Banking)',
    penaltiesPrevented: 'Eliminates cross-border settlement float and payment friction',
    filingCycle: 'Instant SEPA Credit (< 10 sec) & Faster Payments'
  },
  {
    regionId: 'uk_eu',
    regionName: 'UK & EU',
    country: 'United Kingdom & European Union',
    flag: '🇬🇧🇪🇺',
    categoryKey: 'contractor_eor',
    categoryLabel: 'Labor Law & EOR Parity',
    score: 99,
    status: 'Audit Guaranteed',
    statutoryAgencies: ['Department for Business and Trade / Employment Tribunals'],
    keyLaw: 'Off-Payroll Working Rules (IR35) & EU Directive on Transparent Working Conditions',
    penaltiesPrevented: 'Backdated PAYE & National Insurance liability for misclassified workers',
    filingCycle: 'Automated Status Determination Statements (SDS)'
  },

  // US & Canada (us_ca)
  {
    regionId: 'us_ca',
    regionName: 'US & Canada',
    country: 'United States & Canada',
    flag: '🇺🇸🇨🇦',
    categoryKey: 'tax_paye',
    categoryLabel: 'PAYE & Statutory Withholding',
    score: 100,
    status: 'Full Automation',
    statutoryAgencies: ['IRS (Internal Revenue Service)', '50 US State Departments of Revenue', 'CRA (Canada Revenue Agency)'],
    keyLaw: 'Federal Income Tax (FIT), FICA, FUTA, State Unemployment (SUTA), CRA T4',
    penaltiesPrevented: 'IRS failure-to-deposit penalty up to 15% of underpayment',
    filingCycle: 'Semi-weekly / Monthly deposit schedules + Quarterly 941'
  },
  {
    regionId: 'us_ca',
    regionName: 'US & Canada',
    country: 'United States & Canada',
    flag: '🇺🇸🇨🇦',
    categoryKey: 'pension_social',
    categoryLabel: 'Pensions & Social Funds',
    score: 99,
    status: 'Full Automation',
    statutoryAgencies: ['Social Security Administration (SSA)', 'Canada Pension Plan (CPP)', 'Employment Insurance (EI)'],
    keyLaw: 'ERISA Title I / Federal Insurance Contributions Act / CPP Act',
    penaltiesPrevented: 'Department of Labor audit fines & 10% late payment excise tax',
    filingCycle: 'Synchronized with each scheduled payroll run'
  },
  {
    regionId: 'us_ca',
    regionName: 'US & Canada',
    country: 'United States & Canada',
    flag: '🇺🇸🇨🇦',
    categoryKey: 'data_sovereignty',
    categoryLabel: 'Data Privacy & Sovereignty',
    score: 100,
    status: 'Audit Guaranteed',
    statutoryAgencies: ['Federal Trade Commission (FTC)', 'California Privacy Protection Agency (CPPA)'],
    keyLaw: 'SOC 2 Type II, HIPAA HITECH, CCPA/CPRA, PIPEDA (Canada)',
    penaltiesPrevented: 'Civil statutory penalties up to $7,500 per intentional violation',
    filingCycle: 'Continuous SOC 2 compliance monitoring'
  },
  {
    regionId: 'us_ca',
    regionName: 'US & Canada',
    country: 'United States & Canada',
    flag: '🇺🇸🇨🇦',
    categoryKey: 'wage_protection',
    categoryLabel: 'Wage Clearing & Banking',
    score: 100,
    status: 'Full Automation',
    statutoryAgencies: ['Federal Reserve Bank', 'Nacha (National Automated Clearing House Association)'],
    keyLaw: 'Fair Labor Standards Act (FLSA) & Nacha Operating Rules',
    penaltiesPrevented: 'Zero Nacha return fees via real-time balance pre-verification',
    filingCycle: 'Same-Day ACH / FedNow / Interac e-Transfer'
  },
  {
    regionId: 'us_ca',
    regionName: 'US & Canada',
    country: 'United States & Canada',
    flag: '🇺🇸🇨🇦',
    categoryKey: 'contractor_eor',
    categoryLabel: 'Labor Law & EOR Parity',
    score: 99,
    status: 'Audit Guaranteed',
    statutoryAgencies: ['US Department of Labor (Wage and Hour Division)'],
    keyLaw: 'DOL Independent Contractor Final Rule / California AB 5 (ABC Test)',
    penaltiesPrevented: 'Treble wage damages and statutory worker compensation claims',
    filingCycle: 'Annual 1099-NEC & W-2 automated generation & filing'
  }
];

interface GlobalComplianceHeatmapProps {
  onOpenDemo?: () => void;
}

export const GlobalComplianceHeatmap = ({ onOpenDemo }: GlobalComplianceHeatmapProps) => {
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Africa' | 'Global'>('All');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [selectedCell, setSelectedCell] = useState<ComplianceCell | null>(COMPLIANCE_MATRIX[0]);
  const [hoveredCell, setHoveredCell] = useState<ComplianceCell | null>(null);
  
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(900);

  // Measure container width for responsive SVG
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const width = entries[0].contentRect.width;
      if (width > 0) {
        setContainerWidth(width);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Filtered regions
  const filteredRegions = useMemo(() => {
    if (selectedFilter === 'All') return REGIONS;
    return REGIONS.filter(r => r.continent === selectedFilter);
  }, [selectedFilter]);

  // Filtered domains
  const activeDomains = useMemo(() => {
    if (selectedDomain === 'all') return COMPLIANCE_DOMAINS;
    return COMPLIANCE_DOMAINS.filter(d => d.key === selectedDomain);
  }, [selectedDomain]);

  // D3 Render logic
  useEffect(() => {
    if (!svgRef.current || filteredRegions.length === 0 || activeDomains.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Dimensions
    const margin = {
      top: 50,
      right: 20,
      bottom: 20,
      left: containerWidth < 640 ? 130 : 200
    };

    const width = Math.max(containerWidth, 600);
    const height = (activeDomains.length * 62) + margin.top + margin.bottom;

    svg.attr('viewBox', `0 0 ${width} ${height}`)
       .attr('width', '100%')
       .attr('height', height);

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // X Scale: Regions
    const xScale = d3.scaleBand()
      .domain(filteredRegions.map(r => r.id))
      .range([0, innerWidth])
      .padding(0.08);

    // Y Scale: Compliance Domains
    const yScale = d3.scaleBand()
      .domain(activeDomains.map(d => d.key))
      .range([0, innerHeight])
      .padding(0.12);

    // Color Interpolator: 95 - 100 coverage
    // 97 -> Soft emerald/teal, 100 -> Vivid lime/emerald
    const colorScale = d3.scaleLinear<string>()
      .domain([96, 98, 100])
      .range(['#065f46', '#059669', '#10b981'])
      .clamp(true);

    // Render Column Headers (Regions)
    const colHeaders = g.append('g').attr('class', 'col-headers');
    filteredRegions.forEach(region => {
      const x = (xScale(region.id) || 0) + xScale.bandwidth() / 2;
      
      const headerG = colHeaders.append('g')
        .attr('transform', `translate(${x}, -12)`)
        .attr('class', 'cursor-pointer select-none')
        .on('click', () => {
          const match = COMPLIANCE_MATRIX.find(c => c.regionId === region.id);
          if (match) setSelectedCell(match);
        });

      // Flag & country name
      headerG.append('text')
        .attr('text-anchor', 'middle')
        .attr('y', -16)
        .attr('font-size', '16px')
        .text(region.flag);

      headerG.append('text')
        .attr('text-anchor', 'middle')
        .attr('y', 0)
        .attr('fill', '#f1f5f9')
        .attr('font-size', containerWidth < 768 ? '10px' : '11px')
        .attr('font-weight', '700')
        .text(containerWidth < 640 ? region.name.slice(0, 5) : region.name);

      headerG.append('text')
        .attr('text-anchor', 'middle')
        .attr('y', 11)
        .attr('fill', '#34d399')
        .attr('font-size', '9px')
        .attr('font-family', 'monospace')
        .attr('font-weight', '700')
        .text(`${region.overallScore}%`);
    });

    // Render Row Headers (Regulatory Domains)
    const rowHeaders = g.append('g').attr('class', 'row-headers');
    activeDomains.forEach(domain => {
      const y = (yScale(domain.key) || 0) + yScale.bandwidth() / 2;

      const rowText = rowHeaders.append('text')
        .attr('x', -14)
        .attr('y', y + 4)
        .attr('text-anchor', 'end')
        .attr('fill', '#cbd5e1')
        .attr('font-size', containerWidth < 640 ? '10px' : '12px')
        .attr('font-weight', '600')
        .attr('class', 'cursor-pointer hover:fill-white')
        .text(domain.label);

      // Shorten text if small screen
      if (containerWidth < 640 && domain.label.length > 20) {
        rowText.text(domain.label.split('&')[0].trim());
      }
    });

    // Render Matrix Cells
    const cellsG = g.append('g').attr('class', 'matrix-cells');

    COMPLIANCE_MATRIX.forEach(cell => {
      // Only draw if region and domain are currently visible
      const isRegionVisible = filteredRegions.some(r => r.id === cell.regionId);
      const isDomainVisible = activeDomains.some(d => d.key === cell.categoryKey);
      if (!isRegionVisible || !isDomainVisible) return;

      const cellX = xScale(cell.regionId) || 0;
      const cellY = yScale(cell.categoryKey) || 0;
      const cellW = xScale.bandwidth();
      const cellH = yScale.bandwidth();

      const isSelected = selectedCell?.regionId === cell.regionId && selectedCell?.categoryKey === cell.categoryKey;
      const isHovered = hoveredCell?.regionId === cell.regionId && hoveredCell?.categoryKey === cell.categoryKey;

      const cellGroup = cellsG.append('g')
        .attr('transform', `translate(${cellX}, ${cellY})`)
        .attr('class', 'cursor-pointer')
        .on('mouseenter', () => setHoveredCell(cell))
        .on('mouseleave', () => setHoveredCell(null))
        .on('click', () => setSelectedCell(cell));

      // Background rect
      cellGroup.append('rect')
        .attr('width', cellW)
        .attr('height', cellH)
        .attr('rx', 8)
        .attr('fill', colorScale(cell.score))
        .attr('stroke', isSelected ? '#a7f3d0' : isHovered ? '#6ee7b7' : '#047857')
        .attr('stroke-width', isSelected ? 2.5 : isHovered ? 2 : 1)
        .attr('opacity', isSelected ? 1 : isHovered ? 0.95 : 0.85)
        .attr('filter', isSelected ? 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.5))' : 'none');

      // Score Text
      cellGroup.append('text')
        .attr('x', cellW / 2)
        .attr('y', cellH / 2 - 2)
        .attr('text-anchor', 'middle')
        .attr('fill', '#ffffff')
        .attr('font-size', cellW < 60 ? '11px' : '13px')
        .attr('font-weight', '800')
        .attr('font-family', 'monospace')
        .text(`${cell.score}%`);

      // Sub-label (Status indicator dot / label)
      cellGroup.append('text')
        .attr('x', cellW / 2)
        .attr('y', cellH / 2 + 12)
        .attr('text-anchor', 'middle')
        .attr('fill', '#ecfdf5')
        .attr('font-size', '8px')
        .attr('font-weight', '600')
        .attr('opacity', 0.9)
        .text(cellW < 70 ? '● Auto' : cell.score === 100 ? '100% Live' : 'Verified');
    });

  }, [filteredRegions, activeDomains, containerWidth, selectedCell, hoveredCell]);

  return (
    <div 
      ref={containerRef} 
      id="global-compliance-heatmap-section"
      className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden mb-16"
    >
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-slate-800 gap-4 relative z-10">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 uppercase tracking-wider flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>D3 Interactive Coverage Heatmap</span>
            </span>
            <span className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
              <RefreshCw className="w-3 h-3 text-emerald-400 animate-spin-slow" />
              <span>Regulatory Sync: Active (Sept 2026 Directives)</span>
            </span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-2">
            Pan-African & Global Regulatory Compliance Engine
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            NextSofthr maintains automated compliance engines mapped to statutory tax agencies, pension funds, wage clearing regulations, and data sovereignty laws across Africa and international hubs.
          </p>
        </div>

        {/* Region Continent Filters */}
        <div className="flex flex-wrap items-center gap-2 self-start lg:self-center">
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setSelectedFilter('All')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                selectedFilter === 'All'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Jurisdictions ({REGIONS.length})
            </button>
            <button
              onClick={() => setSelectedFilter('Africa')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                selectedFilter === 'Africa'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Africa Core (6)
            </button>
            <button
              onClick={() => setSelectedFilter('Global')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                selectedFilter === 'Global'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              UK, EU & Americas (2)
            </button>
          </div>

          {/* Domain Dropdown */}
          <select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            className="bg-slate-950 text-slate-300 text-xs font-semibold py-2 px-3 rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
          >
            <option value="all">All Regulatory Pillars</option>
            {COMPLIANCE_DOMAINS.map(d => (
              <option key={d.key} value={d.key}>
                {d.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Interactive D3 Visualization Canvas */}
      <div className="mt-6 bg-slate-950/80 rounded-2xl border border-slate-800/90 p-4 sm:p-6 overflow-x-auto">
        <div className="min-w-[600px]">
          <svg ref={svgRef} className="w-full select-none" />
        </div>

        {/* Heatmap Legend */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider">
              Automation Score:
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded bg-[#065f46] border border-emerald-700" />
              <span className="text-slate-400 text-[11px]">96% Certified Direct</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded bg-[#059669] border border-emerald-600" />
              <span className="text-slate-300 text-[11px]">98% Audit Guaranteed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded bg-[#10b981] border border-emerald-400" />
              <span className="text-emerald-300 font-bold text-[11px]">100% Fully Automated</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 flex items-center gap-1">
            <Info className="w-3.5 h-3.5 text-emerald-400" />
            <span>Click any cell to inspect statutory laws and penalty prevention details</span>
          </div>
        </div>
      </div>

      {/* Selected Cell Statutory Inspector Drawer */}
      {selectedCell && (
        <div className="mt-6 bg-gradient-to-r from-slate-950 to-slate-900 rounded-2xl border border-emerald-500/40 p-6 relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-800 gap-4">
            
            <div className="flex items-center gap-3">
              <div className="text-3xl">{selectedCell.flag}</div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-lg font-bold text-white">
                    {selectedCell.regionName} — {selectedCell.categoryLabel}
                  </h4>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {selectedCell.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Governing Framework: <span className="text-slate-200 font-semibold">{selectedCell.keyLaw}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
                  Jurisdiction Score
                </span>
                <span className="text-2xl font-black font-mono text-emerald-400">
                  {selectedCell.score}%
                </span>
              </div>
              <button
                onClick={onOpenDemo}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5"
              >
                <span>Run Compliance Audit</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* Detailed Inspector Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-xs">
            
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
              <span className="text-slate-400 uppercase text-[10px] font-bold block flex items-center gap-1 mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Integrated Statutory Agencies
              </span>
              <ul className="space-y-1 text-slate-200">
                {selectedCell.statutoryAgencies.map((agency, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{agency}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
              <span className="text-slate-400 uppercase text-[10px] font-bold block flex items-center gap-1 mb-2">
                <Scale className="w-3.5 h-3.5 text-lime-400" />
                Penalties Prevented
              </span>
              <p className="text-slate-200 leading-relaxed font-medium">
                {selectedCell.penaltiesPrevented}
              </p>
              <div className="mt-3 pt-2 border-t border-slate-800/80 text-[11px] text-emerald-400 font-mono">
                ✓ 100% On-Time Guarantee
              </div>
            </div>

            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
              <span className="text-slate-400 uppercase text-[10px] font-bold block flex items-center gap-1 mb-2">
                <FileCheck className="w-3.5 h-3.5 text-blue-400" />
                Filing Cycle & Settlement Rails
              </span>
              <p className="text-slate-200 leading-relaxed">
                {selectedCell.filingCycle}
              </p>
              <div className="mt-3 pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
                Cleared via: <span className="text-white font-semibold">{REGIONS.find(r => r.id === selectedCell.regionId)?.localRail}</span>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
