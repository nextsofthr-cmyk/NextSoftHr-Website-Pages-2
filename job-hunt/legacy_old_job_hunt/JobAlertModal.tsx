import React, { useState, useMemo } from 'react';
import { 
  X, 
  Bell, 
  Mail, 
  MapPin, 
  Search, 
  CheckCircle2, 
  Sliders, 
  Trash2, 
  Play, 
  Pause, 
  ExternalLink, 
  Eye, 
  Sparkles, 
  Check, 
  Send,
  SlidersHorizontal,
  DollarSign,
  Building2,
  HeartHandshake,
  ShieldCheck,
  Users,
  Scale,
  Clock,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Info,
  TrendingUp
} from 'lucide-react';
import { Job, JobAlert, Company } from '../types';
import { CountryLocationSelector } from './CountryLocationSelector';
import { matchJobLocation } from '../data/countries';
import { INITIAL_COMPANIES } from '../data/mockData';

export interface CompanySizeOption {
  id: string;
  label: string;
  range: string;
  description: string;
  example: string;
}

export const COMPANY_SIZE_OPTIONS: CompanySizeOption[] = [
  { 
    id: 'startup', 
    label: 'Startup & Seed', 
    range: '1 - 50 staff', 
    description: 'Agile teams, high autonomy & rapid impact',
    example: 'Seed-stage & boutique teams'
  },
  { 
    id: 'growth', 
    label: 'Growth Scale-up', 
    range: '51 - 250 staff', 
    description: 'Fast-scaling, proven product-market fit',
    example: 'NextSoftHR Internal, Series A-C'
  },
  { 
    id: 'enterprise', 
    label: 'Large Enterprise', 
    range: '251 - 1,000 staff', 
    description: 'Mature org structure, established market leaders',
    example: 'Paystack, Kuda Bank, Andela'
  },
  { 
    id: 'conglomerate', 
    label: 'Multinational', 
    range: '1,000+ staff', 
    description: 'Tier-1 institutions & Pan-African conglomerates',
    example: 'Sterling Tech, Interswitch, Dangote'
  }
];

export interface DiversityMetricOption {
  id: string;
  name: string;
  shortTag: string;
  description: string;
  icon: React.ElementType;
}

export const DIVERSITY_METRIC_OPTIONS: DiversityMetricOption[] = [
  {
    id: 'eeo_pledge',
    name: 'Equal Opportunity Employer',
    shortTag: 'EEO Certified',
    description: 'Verified non-discriminatory hiring and objective competency evaluations',
    icon: ShieldCheck
  },
  {
    id: 'female_leadership',
    name: 'Gender Diversity & Women in Tech',
    shortTag: 'Gender Balance',
    description: 'Active female executive leadership and equal career advancement pathways',
    icon: Users
  },
  {
    id: 'disability_accommodations',
    name: 'Neurodiversity & Accessibility',
    shortTag: 'Accessible Work',
    description: 'WCAG AA tooling, sensory-friendly pacing, and disability accommodations',
    icon: HeartHandshake
  },
  {
    id: 'pay_transparency',
    name: 'Salary Transparency & Equity',
    shortTag: 'Pay Equity',
    description: 'Public salary bands upfront, clear review rubrics, and bonus equity sharing',
    icon: Scale
  },
  {
    id: 'family_flexibility',
    name: 'Work-Life & Family Support',
    shortTag: 'Family Care',
    description: 'Generous paid parental leave, family HMO coverage, and wellness rest days',
    icon: Clock
  }
];

// Helper to extract maximum numeric compensation from salary range string
export function parseJobMaxSalary(rangeStr: string): number {
  if (!rangeStr) return 0;
  const cleaned = rangeStr.replace(/,/g, '');
  const matches = cleaned.match(/\d+(?:\.\d+)?/g);
  if (!matches || matches.length === 0) return 0;

  const nums = matches.map(m => {
    let val = parseFloat(m);
    if (rangeStr.toLowerCase().includes('k') && val < 1000) {
      val *= 1000;
    }
    return val;
  });

  return Math.max(...nums);
}

// Helper to categorize company size
export function getJobCompanySize(job: Job, companies: Company[]): 'startup' | 'growth' | 'enterprise' | 'conglomerate' {
  const comp = companies.find(c => c.id === job.companyId || c.name.toLowerCase() === job.companyName.toLowerCase());
  const countStr = comp?.employeeCount || '';

  if (job.posterType === 'individual' || job.recruiterSource === 'Individual / Founder') {
    return 'startup';
  }

  if (countStr.includes('15,000') || countStr.includes('2,500') || countStr.includes('1,200') || countStr.includes('1,000')) {
    return 'conglomerate';
  }
  if (countStr.includes('500') || countStr.includes('800') || countStr.includes('450')) {
    return 'enterprise';
  }
  if (countStr.includes('150') || countStr.includes('300') || countStr.includes('51')) {
    return 'growth';
  }
  if (countStr.includes('1-50') || countStr.includes('10') || countStr.includes('25')) {
    return 'startup';
  }

  if (job.recruiterSource === 'Executive Headhunter') return 'enterprise';
  return 'growth';
}

// Helper to evaluate diversity and inclusion badges for a job
export function getJobDiversityBadges(job: Job, companies: Company[]): string[] {
  const comp = companies.find(c => c.id === job.companyId || c.name.toLowerCase() === job.companyName.toLowerCase());
  const allText = [
    job.title,
    job.description,
    ...(job.responsibilities || []),
    ...(job.requirements || []),
    ...(job.benefits || []),
    comp?.description || '',
    ...(comp?.perks || [])
  ].join(' ').toLowerCase();

  const badges: string[] = [];

  // 1. Equal Opportunity Employer: Verified employers, labor compliance, unbiased merit
  if (
    job.isVerified ||
    comp?.isVerified ||
    allText.includes('labour') ||
    allText.includes('compliance') ||
    allText.includes('cipm') ||
    allText.includes('shrm') ||
    allText.includes('equal') ||
    allText.includes('merit')
  ) {
    badges.push('eeo_pledge');
  }

  // 2. Gender Diversity & Women Leadership: NextSoftHR, Paystack, Interswitch, Moniepoint, Kuda
  if (
    allText.includes('women') ||
    allText.includes('female') ||
    allText.includes('gender') ||
    comp?.id === 'comp-1' ||
    comp?.id === 'comp-2' ||
    comp?.id === 'comp-4' ||
    comp?.id === 'comp-5' ||
    comp?.id === 'comp-7' ||
    comp?.id === 'comp-8'
  ) {
    badges.push('female_leadership');
  }

  // 3. Neurodiversity & Accessibility: WCAG AA, workstation budget, wellness days, remote-first
  if (
    allText.includes('wcag') ||
    allText.includes('accessibility') ||
    allText.includes('accessible') ||
    allText.includes('workstation') ||
    allText.includes('wellness') ||
    allText.includes('remote work') ||
    job.workArrangement === 'Remote'
  ) {
    badges.push('disability_accommodations');
  }

  // 4. Pay Transparency & Equity: Explicit transparent salary ranges, equity, profit-sharing
  if (
    job.salaryRange && 
    (job.salaryRange.includes('₦') || job.salaryRange.includes('$')) &&
    (allText.includes('bonus') || allText.includes('equity') || allText.includes('commission') || allText.includes('pension') || allText.includes('stock'))
  ) {
    badges.push('pay_transparency');
  }

  // 5. Work-Life & Family Support: Parental leave, family HMO, childcare, wellness break
  if (
    allText.includes('parental') ||
    allText.includes('family') ||
    allText.includes('dependant') ||
    allText.includes('hmo') ||
    allText.includes('childcare') ||
    allText.includes('wellness break') ||
    allText.includes('flexible')
  ) {
    badges.push('family_flexibility');
  }

  return badges;
}

interface JobAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobs: Job[];
  alerts: JobAlert[];
  companies?: Company[];
  onSaveAlert: (alert: Omit<JobAlert, 'id' | 'createdAt' | 'isActive'>) => void;
  onToggleAlertStatus: (alertId: string) => void;
  onDeleteAlert: (alertId: string) => void;
  initialKeyword?: string;
  initialLocation?: string;
  initialCategory?: string;
  initialEmail?: string;
  onSelectJob: (job: Job) => void;
}

export const JobAlertModal: React.FC<JobAlertModalProps> = ({
  isOpen,
  onClose,
  jobs,
  alerts,
  companies = INITIAL_COMPANIES,
  onSaveAlert,
  onToggleAlertStatus,
  onDeleteAlert,
  initialKeyword = '',
  initialLocation = '',
  initialCategory = '',
  initialEmail = '',
  onSelectJob
}) => {
  const [activeTab, setActiveTab] = useState<'create' | 'manage' | 'preview'>('create');
  
  // Standard Form states
  const [email, setEmail] = useState(initialEmail);
  const [keyword, setKeyword] = useState(initialKeyword);
  const [location, setLocation] = useState(initialLocation);
  const [category, setCategory] = useState(initialCategory);
  const [workArrangement, setWorkArrangement] = useState<'Any' | 'Remote' | 'Hybrid' | 'On-Site'>('Any');
  const [frequency, setFrequency] = useState<'instant' | 'daily' | 'weekly'>('instant');
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);
  const [testEmailSentToast, setTestEmailSentToast] = useState<string | null>(null);

  // SMART FILTERS states
  const [smartFiltersOpen, setSmartFiltersOpen] = useState(true);
  const [minSalary, setMinSalary] = useState<number>(0);
  const [salaryCurrency, setSalaryCurrency] = useState<'NGN' | 'USD'>('NGN');
  const [selectedCompanySizes, setSelectedCompanySizes] = useState<string[]>([]);
  const [selectedDiversityMetrics, setSelectedDiversityMetrics] = useState<string[]>([]);

  // Salary Trend Alert state (Requirement 2)
  const [salaryTrendAlert, setSalaryTrendAlert] = useState(true);
  const [targetRoleOrIndustry, setTargetRoleOrIndustry] = useState(initialKeyword || 'Senior HR Business Partner');
  const [salaryShiftThresholdPercent, setSalaryShiftThresholdPercent] = useState<number>(5);

  // Count active smart filters
  const activeSmartFilterCount = useMemo(() => {
    let count = 0;
    if (minSalary > 0) count++;
    if (selectedCompanySizes.length > 0) count += selectedCompanySizes.length;
    if (selectedDiversityMetrics.length > 0) count += selectedDiversityMetrics.length;
    if (salaryTrendAlert) count++;
    return count;
  }, [minSalary, selectedCompanySizes, selectedDiversityMetrics, salaryTrendAlert]);

  // Sync initial props when opened
  React.useEffect(() => {
    if (isOpen) {
      if (initialKeyword) setKeyword(initialKeyword);
      if (initialLocation) setLocation(initialLocation);
      if (initialCategory) setCategory(initialCategory);
      if (initialEmail && !email) setEmail(initialEmail);
      setIsSubmittedSuccess(false);
    }
  }, [isOpen, initialKeyword, initialLocation, initialCategory, initialEmail]);

  // Compute live matching jobs based on both basic criteria and SMART FILTERS
  const liveMatchingJobs = useMemo(() => {
    return jobs.filter(j => {
      const kw = keyword.trim().toLowerCase();
      const loc = location.trim().toLowerCase();
      const cat = category.trim().toLowerCase();

      // 1. Keyword match
      const matchesKeyword = !kw || 
        j.title.toLowerCase().includes(kw) || 
        j.description.toLowerCase().includes(kw) ||
        j.category.toLowerCase().includes(kw) ||
        j.requirements.some(r => r.toLowerCase().includes(kw));

      // 2. Location match
      const matchesLocation = !loc || matchJobLocation(j.location, loc);

      // 3. Category match
      const matchesCategory = !cat || j.category.toLowerCase() === cat;

      // 4. Work arrangement match
      const matchesArrangement = workArrangement === 'Any' || j.workArrangement === workArrangement;

      // 5. SMART FILTER: Minimum Salary Expectation
      let matchesSalary = true;
      if (minSalary > 0) {
        const jobMax = parseJobMaxSalary(j.salaryRange);
        if (salaryCurrency === 'NGN') {
          // If job currency is NGN, check threshold
          matchesSalary = jobMax >= minSalary;
        } else {
          // USD evaluation: if job is USD or has dollar numbers
          matchesSalary = jobMax >= minSalary;
        }
      }

      // 6. SMART FILTER: Preferred Company Size
      let matchesCompanySize = true;
      if (selectedCompanySizes.length > 0) {
        const jobSize = getJobCompanySize(j, companies);
        matchesCompanySize = selectedCompanySizes.includes(jobSize);
      }

      // 7. SMART FILTER: Diversity & Inclusion Metrics
      let matchesDiversity = true;
      if (selectedDiversityMetrics.length > 0) {
        const jobBadges = getJobDiversityBadges(j, companies);
        // Candidate receives vacancies matching the selected D&I metrics
        matchesDiversity = selectedDiversityMetrics.every(metricId => jobBadges.includes(metricId));
      }

      return matchesKeyword && 
             matchesLocation && 
             matchesCategory && 
             matchesArrangement && 
             matchesSalary && 
             matchesCompanySize && 
             matchesDiversity;
    });
  }, [
    jobs, 
    keyword, 
    location, 
    category, 
    workArrangement, 
    minSalary, 
    salaryCurrency, 
    selectedCompanySizes, 
    selectedDiversityMetrics, 
    companies
  ]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !keyword) return;

    onSaveAlert({
      email,
      keyword: keyword.trim(),
      location: location.trim(),
      category: category || undefined,
      workArrangement,
      frequency,
      matchCount: liveMatchingJobs.length,
      minSalary: minSalary > 0 ? minSalary : undefined,
      salaryCurrency: minSalary > 0 ? salaryCurrency : undefined,
      preferredCompanySizes: selectedCompanySizes.length > 0 ? selectedCompanySizes : undefined,
      diversityMetrics: selectedDiversityMetrics.length > 0 ? selectedDiversityMetrics : undefined,
      salaryTrendAlert,
      targetRoleOrIndustry: salaryTrendAlert ? (targetRoleOrIndustry || keyword || 'Target Role') : undefined,
      salaryShiftThresholdPercent: salaryTrendAlert ? salaryShiftThresholdPercent : 5,
      currentBenchmarkSalary: salaryCurrency === 'USD' ? '$7,500/mo' : '₦1,850,000/mo',
      lastMarketShiftPercent: 6.4
    });

    setIsSubmittedSuccess(true);
    setTimeout(() => {
      setIsSubmittedSuccess(false);
      setActiveTab('manage');
    }, 1800);
  };

  const handleSendTestEmail = (targetEmail: string, alertKeyword: string) => {
    setTestEmailSentToast(`Simulated alert dispatched to ${targetEmail}`);
    setTimeout(() => setTestEmailSentToast(null), 3500);
  };

  const handleToggleCompanySize = (sizeId: string) => {
    setSelectedCompanySizes(prev => 
      prev.includes(sizeId) ? prev.filter(s => s !== sizeId) : [...prev, sizeId]
    );
  };

  const handleToggleDiversityMetric = (metricId: string) => {
    setSelectedDiversityMetrics(prev => 
      prev.includes(metricId) ? prev.filter(m => m !== metricId) : [...prev, metricId]
    );
  };

  const handleResetSmartFilters = () => {
    setMinSalary(0);
    setSelectedCompanySizes([]);
    setSelectedDiversityMetrics([]);
  };

  const quickKeywords = ['Software Engineer', 'HR Business Partner', 'Product Designer', 'Data Analyst', 'Accountant', 'Logistics Lead'];

  // Salary preset buttons
  const ngnSalaryPresets = [
    { label: 'Any', value: 0 },
    { label: '₦800k+', value: 800000 },
    { label: '₦1.2M+', value: 1200000 },
    { label: '₦1.8M+', value: 1800000 },
    { label: '₦2.5M+', value: 2500000 },
    { label: '₦3.5M+', value: 3500000 }
  ];

  const usdSalaryPresets = [
    { label: 'Any', value: 0 },
    { label: '$35k+', value: 35000 },
    { label: '$60k+', value: 60000 },
    { label: '$90k+', value: 90000 },
    { label: '$120k+', value: 120000 },
    { label: '$150k+', value: 150000 }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div 
        className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="bg-[#142B4A] dark:bg-slate-950 text-white px-6 py-4 flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#2563EB] to-[#0F9D8A] flex items-center justify-center text-white shadow-md">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-lime-400">
                  Career Intelligence Dispatch
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  Free Service
                </span>
                {activeSmartFilterCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-lime-400/20 text-lime-300 border border-lime-400/40">
                    {activeSmartFilterCount} Smart Filters
                  </span>
                )}
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Subscribe to Job Alerts
              </h2>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation Strip */}
        <div className="bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 px-6 py-2.5 flex items-center gap-2 shrink-0 text-xs">
          <button
            onClick={() => setActiveTab('create')}
            className={`px-3.5 py-1.5 font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'create'
                ? 'bg-white dark:bg-slate-800 text-[#142B4A] dark:text-white shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Bell className="w-3.5 h-3.5 text-[#2563EB] dark:text-blue-400" />
            <span>Create Alert</span>
          </button>

          <button
            onClick={() => setActiveTab('manage')}
            className={`px-3.5 py-1.5 font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'manage'
                ? 'bg-white dark:bg-slate-800 text-[#142B4A] dark:text-white shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400" />
            <span>My Active Alerts ({alerts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('preview')}
            className={`px-3.5 py-1.5 font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'preview'
                ? 'bg-white dark:bg-slate-800 text-[#142B4A] dark:text-white shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400" />
            <span>Email Preview</span>
          </button>
        </div>

        {/* Toast / Notification feedback */}
        {testEmailSentToast && (
          <div className="bg-lime-50 dark:bg-lime-950/70 border-b border-lime-200 dark:border-lime-800 px-6 py-2.5 text-xs text-lime-800 dark:text-lime-200 flex items-center justify-between animate-in fade-in duration-150">
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-lime-600 dark:text-lime-400" />
              {testEmailSentToast}
            </span>
            <span className="text-[11px] text-lime-700 dark:text-lime-400 font-mono">Simulated 200 OK</span>
          </div>
        )}

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
          
          {/* TAB 1: CREATE JOB ALERT */}
          {activeTab === 'create' && (
            <div className="space-y-6">
              {isSubmittedSuccess ? (
                <div className="py-10 text-center space-y-3 bg-lime-50/50 dark:bg-lime-950/30 rounded-2xl border border-lime-200 dark:border-lime-800/60 p-6">
                  <div className="w-14 h-14 bg-lime-100 dark:bg-lime-950/80 text-lime-700 dark:text-lime-400 border border-lime-300 dark:border-lime-700 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Alert Subscription Activated!</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                    We've registered your preferences for <strong>"{keyword}"</strong> in <strong>"{location || 'All Locations'}"</strong>
                    {minSalary > 0 && ` with a minimum salary of ${salaryCurrency === 'NGN' ? '₦' : '$'}${minSalary.toLocaleString()}`}.
                    You'll receive notifications at <span className="font-semibold text-blue-600 dark:text-blue-400">{email}</span> whenever matching opportunities are published.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => setActiveTab('manage')}
                      className="px-4 py-2 bg-[#2563EB] text-white font-bold rounded-xl text-xs cursor-pointer"
                    >
                      View All Active Alerts
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="bg-blue-50/70 dark:bg-blue-950/40 p-4 rounded-2xl border border-blue-200/80 dark:border-blue-900/60 flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-[#2563EB] dark:text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-[#142B4A] dark:text-white text-xs">
                        Zero-Noise Automated Job Dispatch with Smart Criteria
                      </p>
                      <p className="text-slate-600 dark:text-slate-300 text-[11px] mt-0.5 leading-relaxed">
                        Specify your core roles and expand <strong>Smart Filters</strong> below to enforce minimum salary floors, preferred company sizes, and diversity & inclusion values. Receive only vacancies meeting your standards.
                      </p>
                    </div>
                  </div>

                  {/* Primary Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email Input */}
                    <div className="sm:col-span-2">
                      <label className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                        Your Notification Email *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-2.5" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. adewale.adebayo@gmail.com"
                          className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 text-xs"
                        />
                      </div>
                    </div>

                    {/* Keyword / Role Title */}
                    <div>
                      <label className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                        Job Title or Keywords *
                      </label>
                      <div className="relative">
                        <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          required
                          value={keyword}
                          onChange={(e) => setKeyword(e.target.value)}
                          placeholder="e.g. Software Engineer, HRBP..."
                          className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 text-xs"
                        />
                      </div>
                      
                      {/* Keyword quick chips */}
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {quickKeywords.slice(0, 4).map((kw) => (
                          <button
                            key={kw}
                            type="button"
                            onClick={() => setKeyword(kw)}
                            className="text-[10px] bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md transition-colors cursor-pointer"
                          >
                            + {kw}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Location */}
                    <div>
                      <label className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                        Preferred Location (Any Country in World)
                      </label>
                      <CountryLocationSelector
                        value={location}
                        onChange={setLocation}
                        placeholder="Select any country / remote / all locations"
                        variant="compact"
                        className="w-full"
                      />
                    </div>

                    {/* Work Arrangement */}
                    <div>
                      <label className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                        Work Arrangement
                      </label>
                      <select
                        value={workArrangement}
                        onChange={(e) => setWorkArrangement(e.target.value as any)}
                        className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 text-xs cursor-pointer"
                      >
                        <option value="Any">Any Arrangement (All)</option>
                        <option value="Remote">Remote Only</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="On-Site">On-Site Only</option>
                      </select>
                    </div>

                    {/* Alert Frequency */}
                    <div>
                      <label className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                        Dispatch Frequency
                      </label>
                      <select
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value as any)}
                        className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 text-xs cursor-pointer"
                      >
                        <option value="instant">Instant (Real-time as jobs are posted)</option>
                        <option value="daily">Daily Digest (Every morning at 8:00 AM)</option>
                        <option value="weekly">Weekly Roundup (Monday mornings)</option>
                      </select>
                    </div>
                  </div>

                  {/* ======================================================== */}
                  {/* SMART FILTERS SECTION (Collapsible & Highly Interactive) */}
                  {/* ======================================================== */}
                  <div className="rounded-2xl border border-blue-200 dark:border-blue-900/70 bg-gradient-to-b from-blue-50/40 via-white to-slate-50/50 dark:from-slate-900/90 dark:via-slate-900/60 dark:to-slate-950/80 shadow-xs overflow-hidden transition-all">
                    {/* Smart Filters Header Accordion */}
                    <div 
                      onClick={() => setSmartFiltersOpen(!smartFiltersOpen)}
                      className="px-4 py-3.5 flex items-center justify-between cursor-pointer hover:bg-blue-50/60 dark:hover:bg-slate-800/40 transition-colors border-b border-blue-100 dark:border-blue-900/50"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs">
                          <SlidersHorizontal className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 dark:text-white text-xs">
                              Smart Filters
                            </span>
                            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-blue-100 dark:bg-blue-900/60 text-[#2563EB] dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                              Precision Matching
                            </span>
                            {activeSmartFilterCount > 0 ? (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-lime-100 dark:bg-lime-950/80 text-lime-800 dark:text-lime-300 border border-lime-300 dark:border-lime-700">
                                {activeSmartFilterCount} active
                              </span>
                            ) : (
                              <span className="text-[10px] text-slate-400">Optional</span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            Minimum salary threshold, preferred company size, and diversity & inclusion values
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {activeSmartFilterCount > 0 && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleResetSmartFilters();
                            }}
                            className="text-[11px] text-slate-500 hover:text-red-600 dark:hover:text-red-400 flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                            title="Reset all smart filters"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Reset</span>
                          </button>
                        )}
                        <span className="text-slate-400 p-1">
                          {smartFiltersOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </span>
                      </div>
                    </div>

                    {/* Smart Filters Body */}
                    {smartFiltersOpen && (
                      <div className="p-4 sm:p-5 space-y-6 animate-in fade-in duration-150">
                        
                        {/* 1. MINIMUM SALARY EXPECTATION */}
                        <div className="space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                              <label className="font-bold text-slate-800 dark:text-slate-200 text-xs">
                                1. Minimum Salary Expectation
                              </label>
                            </div>
                            
                            {/* Currency Toggle */}
                            <div className="flex items-center gap-1.5 self-start sm:self-auto bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700 text-[10px]">
                              <button
                                type="button"
                                onClick={() => {
                                  setSalaryCurrency('NGN');
                                  setMinSalary(0);
                                }}
                                className={`px-2 py-0.5 rounded font-bold transition-colors cursor-pointer ${
                                  salaryCurrency === 'NGN'
                                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs'
                                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                                }`}
                              >
                                NGN (₦)
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setSalaryCurrency('USD');
                                  setMinSalary(0);
                                }}
                                className={`px-2 py-0.5 rounded font-bold transition-colors cursor-pointer ${
                                  salaryCurrency === 'USD'
                                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs'
                                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                                }`}
                              >
                                USD ($)
                              </button>
                            </div>
                          </div>

                          <div className="bg-slate-50/80 dark:bg-slate-800/40 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-700/80 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] text-slate-600 dark:text-slate-400">
                                Target Baseline:
                              </span>
                              <span className="font-extrabold text-sm text-[#2563EB] dark:text-blue-400 tabular-nums">
                                {minSalary > 0 
                                  ? `${salaryCurrency === 'NGN' ? '₦' : '$'}${minSalary.toLocaleString()} ${salaryCurrency === 'NGN' ? '/ month min' : '/ year min'}`
                                  : 'No minimum threshold (All compensation packages)'}
                              </span>
                            </div>

                            {/* Range slider */}
                            <input 
                              type="range"
                              min={0}
                              max={salaryCurrency === 'NGN' ? 4000000 : 150000}
                              step={salaryCurrency === 'NGN' ? 100000 : 5000}
                              value={minSalary}
                              onChange={(e) => setMinSalary(Number(e.target.value))}
                              className="w-full accent-[#2563EB] cursor-pointer"
                            />

                            {/* Preset Buttons */}
                            <div className="flex flex-wrap items-center gap-1.5 pt-1">
                              <span className="text-[10px] text-slate-500 mr-1">Quick Presets:</span>
                              {(salaryCurrency === 'NGN' ? ngnSalaryPresets : usdSalaryPresets).map((preset) => (
                                <button
                                  key={preset.label}
                                  type="button"
                                  onClick={() => setMinSalary(preset.value)}
                                  className={`px-2 py-0.8 rounded-md text-[10px] font-semibold transition-all cursor-pointer ${
                                    minSalary === preset.value
                                      ? 'bg-emerald-600 text-white shadow-2xs font-bold'
                                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-emerald-400'
                                  }`}
                                >
                                  {preset.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* 2. PREFERRED COMPANY SIZE */}
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                              <label className="font-bold text-slate-800 dark:text-slate-200 text-xs">
                                2. Preferred Company Scale
                              </label>
                            </div>
                            <span className="text-[10px] text-slate-500 dark:text-slate-400">
                              {selectedCompanySizes.length === 0 ? 'All sizes accepted' : `${selectedCompanySizes.length} selected`}
                            </span>
                          </div>

                          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                            Filter opportunities by headcount stage and operational footprint:
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {COMPANY_SIZE_OPTIONS.map((size) => {
                              const isSelected = selectedCompanySizes.includes(size.id);
                              return (
                                <button
                                  key={size.id}
                                  type="button"
                                  onClick={() => handleToggleCompanySize(size.id)}
                                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 relative ${
                                    isSelected
                                      ? 'bg-blue-50/80 dark:bg-blue-950/50 border-blue-400 dark:border-blue-700 shadow-2xs ring-1 ring-blue-500/30'
                                      : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600'
                                  }`}
                                >
                                  <div className={`w-4 h-4 mt-0.5 rounded flex items-center justify-center shrink-0 transition-colors ${
                                    isSelected 
                                      ? 'bg-blue-600 text-white' 
                                      : 'border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700'
                                  }`}>
                                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-1">
                                      <span className="font-bold text-slate-900 dark:text-white text-xs">
                                        {size.label}
                                      </span>
                                      <span className="text-[10px] font-mono font-semibold px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                                        {size.range}
                                      </span>
                                    </div>
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                                      {size.description}
                                    </p>
                                    <span className="text-[9px] text-blue-600 dark:text-blue-400 block mt-1">
                                      e.g. {size.example}
                                    </span>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* 3. DIVERSITY & INCLUSION METRICS */}
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <HeartHandshake className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                              <label className="font-bold text-slate-800 dark:text-slate-200 text-xs">
                                3. Diversity, Equity & Workplace Culture Metrics
                              </label>
                            </div>
                            <span className="text-[10px] text-slate-500 dark:text-slate-400">
                              {selectedDiversityMetrics.length === 0 ? 'All employers' : `${selectedDiversityMetrics.length} selected`}
                            </span>
                          </div>

                          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                            Select cultural commitments you require from prospective hiring organizations:
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {DIVERSITY_METRIC_OPTIONS.map((metric) => {
                              const isSelected = selectedDiversityMetrics.includes(metric.id);
                              const IconComponent = metric.icon;
                              return (
                                <button
                                  key={metric.id}
                                  type="button"
                                  onClick={() => handleToggleDiversityMetric(metric.id)}
                                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-2.5 ${
                                    isSelected
                                      ? 'bg-purple-50/80 dark:bg-purple-950/50 border-purple-400 dark:border-purple-700 shadow-2xs ring-1 ring-purple-500/30'
                                      : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600'
                                  }`}
                                >
                                  <div className={`w-4 h-4 mt-0.5 rounded flex items-center justify-center shrink-0 transition-colors ${
                                    isSelected 
                                      ? 'bg-purple-600 text-white' 
                                      : 'border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700'
                                  }`}>
                                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5">
                                      <IconComponent className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0" />
                                      <span className="font-bold text-slate-900 dark:text-white text-xs truncate">
                                        {metric.name}
                                      </span>
                                    </div>
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                                      {metric.description}
                                    </p>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                      </div>
                    )}
                  </div>

                  {/* 4. SALARY TREND ALERTS MODULE (Requirement 2) */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50/80 via-teal-50/50 to-blue-50/70 dark:from-slate-850 dark:via-emerald-950/20 dark:to-slate-850 border border-emerald-300 dark:border-emerald-800/80 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                          <TrendingUp className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 dark:text-white text-xs">
                              Subscribe to Salary Trend Alerts
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                              Benchmark Shift &gt; 5%
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5 leading-snug">
                            Get automated intelligence updates whenever the market benchmark for your role or industry shifts by more than 5%.
                          </p>
                        </div>
                      </div>

                      <label className="relative inline-flex items-center cursor-pointer shrink-0">
                        <input
                          type="checkbox"
                          checked={salaryTrendAlert}
                          onChange={(e) => setSalaryTrendAlert(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-300 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                      </label>
                    </div>

                    {salaryTrendAlert && (
                      <div className="pt-2 border-t border-emerald-200/80 dark:border-emerald-900/60 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs animate-in fade-in duration-150">
                        <div>
                          <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                            Target Role or Industry Benchmark
                          </label>
                          <input
                            type="text"
                            value={targetRoleOrIndustry}
                            onChange={(e) => setTargetRoleOrIndustry(e.target.value)}
                            placeholder="e.g. Senior HRBP, Backend Engineer, Fintech..."
                            className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-emerald-300 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 text-xs focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>

                        <div>
                          <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                            Shift Notification Sensitivity
                          </label>
                          <div className="flex items-center gap-1.5">
                            {[3, 5, 8, 10].map((pct) => (
                              <button
                                key={pct}
                                type="button"
                                onClick={() => setSalaryShiftThresholdPercent(pct)}
                                className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                                  salaryShiftThresholdPercent === pct
                                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:border-emerald-400'
                                }`}
                              >
                                &gt; {pct}% Shift
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Live Market Indicator */}
                        <div className="sm:col-span-2 p-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-emerald-200/60 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px]">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            <span className="text-slate-600 dark:text-slate-300">
                              Current Benchmark for <strong>{targetRoleOrIndustry || keyword || 'Target Role'}</strong>:
                            </span>
                            <strong className="text-emerald-700 dark:text-emerald-300 tabular-nums">
                              {salaryCurrency === 'USD' ? '$7,500/mo' : '₦1,850,000/mo'}
                            </strong>
                          </div>
                          <span className="text-emerald-700 dark:text-emerald-400 font-bold tabular-nums">
                            +6.4% Q-o-Q Market Shift (Threshold &gt; {salaryShiftThresholdPercent}% Met)
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Dynamic Match Preview Box */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-3">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                          Live Openings Preview:
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                          {liveMatchingJobs.length} {liveMatchingJobs.length === 1 ? 'opening matches' : 'openings match'}
                        </span>
                        {activeSmartFilterCount > 0 && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-lime-100 dark:bg-lime-950/80 text-lime-800 dark:text-lime-300 border border-lime-300 dark:border-lime-700">
                            Smart Filters Active
                          </span>
                        )}
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => setActiveTab('preview')}
                        className="text-[11px] text-[#2563EB] dark:text-blue-400 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview Email Alert</span>
                      </button>
                    </div>

                    {liveMatchingJobs.length > 0 ? (
                      <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                        {liveMatchingJobs.slice(0, 4).map((job) => {
                          const jobBadges = getJobDiversityBadges(job, companies);
                          const jobCompanySize = getJobCompanySize(job, companies);
                          return (
                            <div
                              key={job.id}
                              className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 group hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
                            >
                              <div className="space-y-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {job.title}
                                  </span>
                                  <span className="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 capitalize">
                                    {jobCompanySize} scale
                                  </span>
                                </div>
                                <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 flex-wrap">
                                  <span>{job.companyName}</span>
                                  <span>·</span>
                                  <span>{job.location}</span>
                                  <span>·</span>
                                  <strong className="text-emerald-700 dark:text-emerald-400">{job.salaryRange}</strong>
                                </div>

                                {/* Matched D&I badges */}
                                <div className="flex items-center gap-1 flex-wrap pt-0.5">
                                  {jobBadges.slice(0, 3).map((badgeId) => {
                                    const meta = DIVERSITY_METRIC_OPTIONS.find(m => m.id === badgeId);
                                    if (!meta) return null;
                                    return (
                                      <span 
                                        key={badgeId}
                                        className="text-[9px] font-medium px-1.5 py-0.2 rounded bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800"
                                      >
                                        ✓ {meta.shortTag}
                                      </span>
                                    );
                                  })}
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => {
                                  onClose();
                                  onSelectJob(job);
                                }}
                                className="px-2.5 py-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-slate-700 dark:text-slate-200 rounded-lg text-[11px] font-semibold transition-colors shrink-0 cursor-pointer self-start sm:self-center"
                              >
                                View Role
                              </button>
                            </div>
                          );
                        })}
                        {liveMatchingJobs.length > 4 && (
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center italic pt-1">
                            + {liveMatchingJobs.length - 4} more vacancies meeting your filters will be included in alerts
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="py-5 text-center space-y-2 bg-slate-100/60 dark:bg-slate-800/40 rounded-xl p-4">
                        <Info className="w-5 h-5 text-amber-500 mx-auto" />
                        <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                          No currently posted jobs match this exact combination of keyword and smart filters.
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                          Subscribing now will monitor the marketplace 24/7 and notify you the moment an employer publishes a role that passes your smart filters.
                        </p>
                        {activeSmartFilterCount > 0 && (
                          <button
                            type="button"
                            onClick={handleResetSmartFilters}
                            className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 underline hover:no-underline cursor-pointer"
                          >
                            Reset Smart Filters to broaden search
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Submit CTA */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={!email || !keyword}
                      className="w-full sm:flex-1 py-3 px-6 bg-[#2563EB] hover:bg-[#1D4ED8] disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-600 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Bell className="w-4 h-4" />
                      <span>
                        {activeSmartFilterCount > 0 
                          ? `Activate Smart Filtered Alert (${activeSmartFilterCount} filters)` 
                          : 'Activate Free Job Alerts'}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSendTestEmail(email || 'your-email@domain.com', keyword || 'All Roles')}
                      disabled={!email}
                      className="w-full sm:w-auto py-3 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-xl border border-slate-200 dark:border-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                    >
                      <Send className="w-3.5 h-3.5 text-[#2563EB] dark:text-blue-400" />
                      <span>Test Alert Now</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 2: MANAGE ACTIVE SUBSCRIPTIONS */}
          {activeTab === 'manage' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                    Your Subscribed Job Alerts
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">
                    Pause, resume, test, or remove any alert profile with smart filter preferences
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('create')}
                  className="px-3 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold rounded-xl text-xs flex items-center gap-1 shadow-2xs cursor-pointer"
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>+ New Alert</span>
                </button>
              </div>

              {alerts.length === 0 ? (
                <div className="py-12 text-center space-y-3 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                  <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#2563EB] dark:text-blue-400 flex items-center justify-center mx-auto">
                    <Bell className="w-6 h-6" />
                  </div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200 text-sm">No Active Job Alerts</p>
                  <p className="max-w-xs mx-auto text-xs text-slate-500 dark:text-slate-400">
                    Subscribe with your target keyword, minimum salary, and preferred company size to receive targeted updates.
                  </p>
                  <button
                    onClick={() => setActiveTab('create')}
                    className="px-4 py-2 bg-[#2563EB] text-white font-bold rounded-xl text-xs cursor-pointer"
                  >
                    Create Your First Alert
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-4 rounded-2xl border transition-all ${
                        alert.isActive
                          ? 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-2xs'
                          : 'bg-slate-50 dark:bg-slate-850 border-slate-200/60 dark:border-slate-800 opacity-75'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1.5 flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-slate-900 dark:text-white text-sm">
                              "{alert.keyword}"
                            </span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                              alert.isActive
                                ? 'bg-lime-50 dark:bg-lime-950/60 text-lime-800 dark:text-lime-300 border-lime-200 dark:border-lime-800'
                                : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-600'
                            }`}>
                              {alert.isActive ? 'Active & Monitoring' : 'Paused'}
                            </span>
                            <span className="px-2 py-0.5 rounded text-[10px] bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 capitalize">
                              {alert.frequency}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 text-slate-500 dark:text-slate-400 text-xs">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-slate-400" />
                              {alert.location || 'All Locations'}
                            </span>
                            <span>·</span>
                            <span className="flex items-center gap-1">
                              <Mail className="w-3.5 h-3.5 text-slate-400" />
                              {alert.email}
                            </span>
                            <span>·</span>
                            <span>Created {alert.createdAt}</span>
                          </div>

                          {/* SMART FILTER BADGES DISPLAY ON ALERT CARD */}
                          {(alert.minSalary || (alert.preferredCompanySizes && alert.preferredCompanySizes.length > 0) || (alert.diversityMetrics && alert.diversityMetrics.length > 0)) && (
                            <div className="flex items-center gap-1.5 flex-wrap pt-1 text-[10px]">
                              <span className="text-slate-400 font-semibold flex items-center gap-1">
                                <SlidersHorizontal className="w-3 h-3 text-[#2563EB]" />
                                Smart Filters:
                              </span>
                              
                              {/* Salary Badge */}
                              {alert.minSalary && alert.minSalary > 0 && (
                                <span className="px-2 py-0.5 rounded-md font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                                  <DollarSign className="w-2.5 h-2.5" />
                                  Min: {alert.salaryCurrency === 'USD' ? '$' : '₦'}{alert.minSalary.toLocaleString()}/mo
                                </span>
                              )}

                              {/* Company Size Badges */}
                              {alert.preferredCompanySizes && alert.preferredCompanySizes.map(sizeId => (
                                <span 
                                  key={sizeId}
                                  className="px-2 py-0.5 rounded-md font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 capitalize flex items-center gap-1"
                                >
                                  <Building2 className="w-2.5 h-2.5" />
                                  {sizeId}
                                </span>
                              ))}

                              {/* Diversity Badges */}
                              {alert.diversityMetrics && alert.diversityMetrics.map(dId => {
                                const opt = DIVERSITY_METRIC_OPTIONS.find(o => o.id === dId);
                                return (
                                  <span 
                                    key={dId}
                                    className="px-2 py-0.5 rounded-md font-semibold bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 flex items-center gap-1"
                                  >
                                    <HeartHandshake className="w-2.5 h-2.5" />
                                    {opt ? opt.shortTag : dId}
                                  </span>
                                );
                              })}
                            </div>
                          )}

                          {/* Salary Trend Alert Indicator on Active Alert Card */}
                          {(alert.salaryTrendAlert || alert.keyword.toLowerCase().includes('engineer') || alert.keyword.toLowerCase().includes('hr')) && (
                            <div className="mt-2 p-2 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-900/50 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                              <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300">
                                <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                                <span className="font-bold">Salary Trend Alert Active:</span>
                                <span>Notify when benchmark for {alert.targetRoleOrIndustry || alert.keyword} shifts by &gt; {alert.salaryShiftThresholdPercent || 5}%</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  setTestEmailSentToast(`Simulated Market Benchmark Shift Alert (+6.4% in ${alert.targetRoleOrIndustry || alert.keyword}) dispatched to ${alert.email}!`);
                                  setTimeout(() => setTestEmailSentToast(null), 3500);
                                }}
                                className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-white dark:bg-slate-800 px-2 py-0.5 rounded-md border border-emerald-300 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-slate-700 cursor-pointer"
                              >
                                Simulate &gt;5% Shift Alert
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                          <button
                            onClick={() => handleSendTestEmail(alert.email, alert.keyword)}
                            className="px-2.5 py-1.5 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 text-[#2563EB] dark:text-blue-400 rounded-lg text-xs font-semibold flex items-center gap-1 border border-blue-200 dark:border-blue-800 cursor-pointer"
                            title="Send simulated test email alert"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Test Dispatch</span>
                          </button>

                          <button
                            onClick={() => onToggleAlertStatus(alert.id)}
                            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                              alert.isActive
                                ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800 hover:bg-amber-100'
                                : 'bg-lime-50 dark:bg-lime-950/50 text-lime-800 dark:text-lime-300 border-lime-200 dark:border-lime-800 hover:bg-lime-100'
                            }`}
                            title={alert.isActive ? 'Pause notifications' : 'Resume notifications'}
                          >
                            {alert.isActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                          </button>

                          <button
                            onClick={() => onDeleteAlert(alert.id)}
                            className="p-2 rounded-lg bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/60 border border-red-200 dark:border-red-800 transition-colors cursor-pointer"
                            title="Delete this alert"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: EMAIL NOTIFICATION SIMULATOR / PREVIEW */}
          {activeTab === 'preview' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                    Interactive HTML Email Notification Preview
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">
                    This is the exact responsive branded notification delivered to candidate inboxes, tailored with your Smart Filters
                  </p>
                </div>
                <button
                  onClick={() => handleSendTestEmail(email || 'candidate@example.com', keyword || 'Lead Engineer')}
                  className="px-3.5 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold rounded-xl text-xs flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Test to My Inbox</span>
                </button>
              </div>

              {/* Email Envelope Container */}
              <div className="max-w-2xl mx-auto rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl overflow-hidden font-sans">
                {/* Email Client Header Bar */}
                <div className="bg-slate-100 dark:bg-slate-950 px-4 py-3 border-b border-slate-200 dark:border-slate-800 text-[11px] space-y-1 text-slate-600 dark:text-slate-400">
                  <div className="flex items-center justify-between">
                    <span><strong>From:</strong> NextSoftHR Careers &lt;alerts@nextsofthr.com&gt;</span>
                    <span className="font-mono text-[10px]">Today, 08:00 AM</span>
                  </div>
                  <div>
                    <span><strong>To:</strong> {email || 'candidate@domain.com'}</span>
                  </div>
                  <div className="text-slate-900 dark:text-slate-100 font-semibold pt-1">
                    <span>Subject: ⚡ {liveMatchingJobs.length > 0 ? liveMatchingJobs.length : 3} Verified "{keyword || 'Senior Lead'}" Roles Matching Your Preferences</span>
                  </div>
                </div>

                {/* Email Body */}
                <div className="p-6 space-y-5 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                  {/* Brand Wordmark */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#142B4A] dark:bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                        N
                      </div>
                      <span className="font-extrabold text-base text-[#142B4A] dark:text-white">
                        NextSoft<span className="text-[#2563EB] dark:text-blue-400">HR</span>
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">
                      Smart Career Alert Digest
                    </span>
                  </div>

                  {/* Intro greeting */}
                  <div>
                    <h4 className="font-extrabold text-[#142B4A] dark:text-white text-base">
                      New opportunities matching your smart criteria
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 text-xs mt-1 leading-relaxed">
                      Hello! Based on your active alert for <strong>"{keyword || 'Finance & Tech'}"</strong> in <strong>"{location || 'All Nigeria'}"</strong>, our enterprise recruitment marketplace matched the following vacancies:
                    </p>
                  </div>

                  {/* Smart Filters Verified Banner in Email */}
                  <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/60 flex items-start gap-2.5 text-[11px]">
                    <SlidersHorizontal className="w-4 h-4 text-[#2563EB] dark:text-blue-400 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <span className="font-bold text-[#142B4A] dark:text-blue-200 block">
                        Smart Filters Applied:
                      </span>
                      <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                        <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-semibold">
                          Min: {minSalary > 0 ? `${salaryCurrency === 'NGN' ? '₦' : '$'}${minSalary.toLocaleString()}/mo` : 'Market Baseline'}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-semibold">
                          Sizes: {selectedCompanySizes.length > 0 ? selectedCompanySizes.join(', ') : 'All Scales'}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 font-semibold">
                          D&I: {selectedDiversityMetrics.length > 0 ? `${selectedDiversityMetrics.length} Verified Values` : 'Inclusive Employers'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Salary Trend Alert Digest in Email Preview */}
                  {salaryTrendAlert && (
                    <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-slate-850 border border-emerald-300 dark:border-emerald-800 text-[11px] space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 font-bold text-emerald-900 dark:text-emerald-200">
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span>Market Benchmark Shift Alert Triggered (+6.4%)</span>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                          Exceeds {salaryShiftThresholdPercent}% Target
                        </span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 leading-snug">
                        The verified median benchmark for <strong>{targetRoleOrIndustry || keyword || 'Target Role'}</strong> shifted from <strong>{salaryCurrency === 'USD' ? '$7,050/mo' : '₦1,738,000/mo'}</strong> to <strong>{salaryCurrency === 'USD' ? '$7,500/mo' : '₦1,850,000/mo'}</strong> over the last quarter.
                      </p>
                    </div>
                  )}

                  {/* Job List Cards inside email */}
                  <div className="space-y-3">
                    {(liveMatchingJobs.length > 0 ? liveMatchingJobs.slice(0, 3) : jobs.slice(0, 3)).map((job) => {
                      const jobBadges = getJobDiversityBadges(job, companies);
                      const jobScale = getJobCompanySize(job, companies);
                      return (
                        <div 
                          key={job.id}
                          className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 space-y-2 hover:border-blue-400 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="font-bold text-[#142B4A] dark:text-white text-sm block">
                                  {job.title}
                                </span>
                                <span className="text-[9px] font-semibold uppercase px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                                  {jobScale}
                                </span>
                              </div>
                              <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                                {job.companyName} · {job.location} · {job.workArrangement}
                              </span>
                            </div>
                            <span className="font-extrabold text-[#2563EB] dark:text-blue-400 text-xs tabular-nums">
                              {job.salaryRange}
                            </span>
                          </div>

                          <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2">
                            {job.description}
                          </p>

                          {/* D&I tags inside email card */}
                          <div className="flex items-center gap-1 flex-wrap pt-1">
                            {jobBadges.slice(0, 3).map((badgeId) => {
                              const meta = DIVERSITY_METRIC_OPTIONS.find(m => m.id === badgeId);
                              if (!meta) return null;
                              return (
                                <span 
                                  key={badgeId}
                                  className="text-[9px] font-medium px-1.5 py-0.2 rounded bg-white dark:bg-slate-700 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800"
                                >
                                  ✓ {meta.shortTag}
                                </span>
                              );
                            })}
                          </div>

                          <div className="pt-2 flex items-center justify-between border-t border-slate-200/60 dark:border-slate-700/60 text-[11px]">
                            <span className="text-slate-500 dark:text-slate-400">
                              Source: {job.recruiterSource || 'Direct Employer'}
                            </span>
                            <button
                              onClick={() => {
                                onClose();
                                onSelectJob(job);
                              }}
                              className="text-[#2563EB] dark:text-blue-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              <span>View Specification & Apply</span>
                              <ExternalLink className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Email Footer */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-[10px] text-slate-400 space-y-1.5">
                    <p>
                      You received this email because you subscribed to NextSoftHR Smart Job Alerts for {email || 'your email'}.
                    </p>
                    <div className="flex items-center justify-center gap-3 text-slate-500 dark:text-slate-400">
                      <button onClick={() => setActiveTab('manage')} className="hover:underline cursor-pointer">
                        Manage Alert Preferences
                      </button>
                      <span>·</span>
                      <button onClick={() => onClose()} className="hover:underline cursor-pointer">
                        Unsubscribe
                      </button>
                      <span>·</span>
                      <span>NextSoftHR Nigeria Ltd, Victoria Island, Lagos</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Footer */}
        <div className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 px-6 py-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 shrink-0">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Real-time talent matching active with Smart Filter engine</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
