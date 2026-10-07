export type EnquiryType =
  | 'HR Management'
  | 'Payroll'
  | 'Recruitment'
  | 'Employee Management'
  | 'Time & Attendance'
  | 'Leave Management'
  | 'Performance Management'
  | 'Business Management'
  | 'AI HR Assistant'
  | 'Enterprise Solutions'
  | 'Partnership'
  | 'Customer Support'
  | 'Other';

export interface ContactFormData {
  firstName: string;
  lastName: string;
  companyName: string;
  workEmail: string;
  phone: string;
  country: string;
  companySize: string;
  enquiryType: EnquiryType;
  message: string;
  agreeToContact: boolean;
  // Dynamic fields
  payrollEmployeesCount?: string;
  payrollCountries?: string[];
  payrollFrequency?: string;
  currentPayrollSystem?: string;
  hrEmployeesCount?: string;
  hrTeamSize?: string;
  currentHrSoftware?: string;
  mainHrChallenge?: string;
  enterpriseLocations?: string;
  enterpriseCountries?: string;
  currentErpSystem?: string;
}

export interface ContactOptionCard {
  id: string;
  title: string;
  headline: string;
  description: string;
  ctaText: string;
  enquiryType: EnquiryType;
  badge?: string;
}

export interface BusinessChallenge {
  id: string;
  question: string;
  solution: string;
  category: EnquiryType;
  iconName: string;
}

export interface NetworkNode {
  id: string;
  country: string;
  city: string;
  region: 'Africa' | 'Global';
  x: number; // percentage on coordinate canvas
  y: number;
  highlight?: boolean;
  activeUsersLabel: string;
}
