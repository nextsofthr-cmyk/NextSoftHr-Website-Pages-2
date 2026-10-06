export type NavigationPage = 
  | 'home'
  | 'outsourcing-hub'
  | 'outsourcing-payroll'
  | 'outsourcing-hr-admin'
  | 'outsourcing-managed-hr'
  | 'outsourcing-recruitment'
  | 'outsourcing-employee-admin'
  | 'outsourcing-time-attendance'
  | 'outsourcing-leave'
  | 'compliance'
  | 'multi-country'
  | 'multi-company'
  | 'packages'
  | 'calculator'
  | 'implementation'
  | 'migration'
  | 'integrations'
  | 'security'
  | 'analytics'
  | 'partners'
  | 'portals'
  | 'contact';

export type PortalType = 'client-admin' | 'employee-ess' | 'manager-mss' | 'outsourcing-specialist';

export interface CountryConfig {
  id: string;
  name: string;
  currency: string;
  flag: string;
  statutoryBodies: string[];
  payeRules: string;
  pensionRules: string;
  additionalLevies: string[];
  activeClients: number;
  statutoryFilingDay: string;
  supportedCities: string[];
}

export interface PayrollRecord {
  id: string;
  employeeName: string;
  role: string;
  department: string;
  grossSalary: number;
  allowances: number;
  overtime: number;
  deductions: number;
  taxPAYE: number;
  pensionEmployee: number;
  pensionEmployer: number;
  netPay: number;
  currency: string;
  status: 'Approved' | 'Review Required' | 'Calculated' | 'Disbursed';
  payslipRef: string;
}

export interface LeaveRequest {
  id: string;
  employeeName: string;
  type: 'Annual' | 'Sick' | 'Maternity' | 'Paternity' | 'Compassionate' | 'Casual';
  startDate: string;
  endDate: string;
  days: number;
  status: 'Approved' | 'Pending Review' | 'Rejected';
  reason: string;
}

export interface JobCandidate {
  id: string;
  name: string;
  jobTitle: string;
  stage: 'Applied' | 'Screening' | 'Shortlisted' | 'Interview' | 'Offer' | 'Hired' | 'Onboarding';
  experienceYears: number;
  appliedDate: string;
  rating: number;
  matchScore: number;
  keySkills: string[];
}

export interface SupportTicket {
  id: string;
  title: string;
  client: string;
  category: 'Payroll Inquiry' | 'Statutory Tax' | 'Employee Onboarding' | 'Leave Policy' | 'System Access';
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'New' | 'Assigned' | 'In Progress' | 'Waiting' | 'Resolved' | 'Closed';
  assignedTo: string;
  createdAt: string;
  slaTarget: string;
}

export interface ComplianceTask {
  id: string;
  title: string;
  country: string;
  authority: string;
  dueDate: string;
  status: 'Upcoming' | 'Ready to File' | 'Submitted' | 'Acknowledged';
  riskLevel: 'Low' | 'Medium' | 'High';
  documentsReady: boolean;
}
