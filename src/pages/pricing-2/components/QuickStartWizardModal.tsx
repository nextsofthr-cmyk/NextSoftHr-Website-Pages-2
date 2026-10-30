import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Building2,
  Users,
  Wallet,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Smartphone,
  MapPin,
  Clock,
  Mail,
  User,
  Phone,
  Briefcase,
  Check,
  Download,
  ExternalLink,
  Layers,
  Calendar,
  Zap,
} from 'lucide-react';
import { CurrencyCode, QuickStartCompanyData } from '../types';
import { CURRENCIES } from '../data/pricingData';
import { ConfettiEffect } from './ConfettiEffect';

interface QuickStartWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Partial<QuickStartCompanyData>;
  onComplete?: (data: QuickStartCompanyData) => void;
}

const DEFAULT_DEPARTMENTS = [
  'Human Resources',
  'Engineering & IT',
  'Finance & Accounting',
  'Operations',
  'Sales & Marketing',
  'Customer Support',
  'Legal & Compliance',
];

const INDUSTRIES = [
  'Technology & Software',
  'Financial Services & FinTech',
  'Healthcare & Pharmaceuticals',
  'Retail, Wholesale & E-commerce',
  'Manufacturing & Industrial',
  'Logistics, Supply Chain & Fleet',
  'Professional Consulting & Legal',
  'Hospitality, Tourism & Restaurants',
  'Education & EdTech',
  'Non-Profit & NGO',
];

export const QuickStartWizardModal: React.FC<QuickStartWizardModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onComplete,
}) => {
  const [step, setStep] = useState<number>(1);
  const totalSteps = 5;

  const [companyData, setCompanyData] = useState<QuickStartCompanyData>({
    companyName: initialData?.companyName || 'Apex Technologies Ltd',
    tradingName: initialData?.tradingName || 'ApexTech',
    industry: initialData?.industry || 'Technology & Software',
    country: initialData?.country || 'Nigeria',
    currency: (initialData?.currency as CurrencyCode) || 'NGN',
    employeeSize: initialData?.employeeSize || '30 – 100 staff',
    website: initialData?.website || 'https://apextech.io',
    payFrequency: initialData?.payFrequency || 'Monthly',
    payDay: initialData?.payDay || '25th of month',
    statutoryPension: initialData?.statutoryPension ?? true,
    statutoryTax: initialData?.statutoryTax ?? true,
    statutoryHealth: initialData?.statutoryHealth ?? true,
    departments: initialData?.departments || ['Human Resources', 'Engineering & IT', 'Finance & Accounting', 'Operations'],
    adminName: initialData?.adminName || 'Adeola Johnson',
    adminEmail: initialData?.adminEmail || 'adeola@apextech.io',
    adminPhone: initialData?.adminPhone || '+234 803 249 1842',
    adminRole: initialData?.adminRole || 'VP of People & Culture',
    enableGPSAttendance: initialData?.enableGPSAttendance ?? true,
    enableMobileESS: initialData?.enableMobileESS ?? true,
    enableWhatsAppAlerts: initialData?.enableWhatsAppAlerts ?? true,
    enableMultiTierApproval: initialData?.enableMultiTierApproval ?? true,
    selectedPlan: initialData?.selectedPlan || 'Professional Plan',
  });

  // Provisioning animation state for Step 5
  const [isProvisioning, setIsProvisioning] = useState<boolean>(false);
  const [provisionProgress, setProvisionProgress] = useState<number>(0);
  const [provisionStepText, setProvisionStepText] = useState<string>('Initializing workspace...');
  const [isReady, setIsReady] = useState<boolean>(false);
  const [confettiTrigger, setConfettiTrigger] = useState<number>(0);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const toggleDepartment = (dept: string) => {
    setCompanyData((prev) => ({
      ...prev,
      departments: prev.departments.includes(dept)
        ? prev.departments.filter((d) => d !== dept)
        : [...prev.departments, dept],
    }));
  };

  const handleLaunchProvisioning = () => {
    setIsProvisioning(true);
    setProvisionProgress(15);
    setProvisionStepText('Creating enterprise tenant and PostgreSQL schema...');

    setTimeout(() => {
      setProvisionProgress(45);
      setProvisionStepText('Configuring PAYE, pension rules & automated payroll cycles...');
    }, 900);

    setTimeout(() => {
      setProvisionProgress(75);
      setProvisionStepText('Provisioning GPS geofencing & employee self-service portals...');
    }, 1800);

    setTimeout(() => {
      setProvisionProgress(100);
      setProvisionStepText('NextSofthr Workspace successfully provisioned!');
      setIsProvisioning(false);
      setIsReady(true);
      setConfettiTrigger((c) => c + 1);
      onComplete?.(companyData);
    }, 2700);
  };

  const handleDownloadConfig = () => {
    const jsonStr = JSON.stringify(
      {
        ...companyData,
        setupCompletedAt: new Date().toISOString(),
        workspaceTenantId: `NSHR-${Math.floor(100000 + Math.random() * 900000)}`,
        status: 'ACTIVE_TRIAL',
      },
      null,
      2
    );
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${companyData.companyName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_nextsofthr_setup.json`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div
      id="quick-start-wizard-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <ConfettiEffect trigger={confettiTrigger} />

      <div
        id="quick-start-wizard-modal"
        className="bg-white dark:bg-[#0B132B] rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
      >
        {/* Modal Top Header */}
        <div className="p-4 sm:p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#A3E635] text-slate-950 flex items-center justify-center font-black shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 uppercase tracking-wider">
                  Quick Start Wizard
                </span>
                <span className="text-xs text-slate-400">Step {step} of {totalSteps}</span>
              </div>
              <h2 className="font-display text-lg sm:text-xl font-extrabold text-white">
                Set Up Your Company Profile
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Close setup wizard"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar Indicator */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 shrink-0">
          <div
            className="bg-gradient-to-r from-[#0265DC] to-[#A3E635] h-1.5 transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>

        {/* Step Tabs Sub-navigation */}
        <div className="hidden sm:flex items-center justify-between px-6 py-2 bg-slate-50 dark:bg-[#070D1E] border-b border-slate-200 dark:border-slate-800/80 text-[11px] font-semibold text-slate-500 dark:text-slate-400 shrink-0">
          <span className={step === 1 ? 'text-[#0265DC] dark:text-[#A3E635] font-bold' : ''}>1. Profile</span>
          <span>•</span>
          <span className={step === 2 ? 'text-[#0265DC] dark:text-[#A3E635] font-bold' : ''}>2. Payroll &amp; Tax</span>
          <span>•</span>
          <span className={step === 3 ? 'text-[#0265DC] dark:text-[#A3E635] font-bold' : ''}>3. Departments &amp; Admin</span>
          <span>•</span>
          <span className={step === 4 ? 'text-[#0265DC] dark:text-[#A3E635] font-bold' : ''}>4. Key Modules</span>
          <span>•</span>
          <span className={step === 5 ? 'text-[#0265DC] dark:text-[#A3E635] font-bold' : ''}>5. Launch</span>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5 text-slate-900 dark:text-slate-100">
          {/* STEP 1: Company Profile */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0265DC] dark:text-blue-400 uppercase tracking-wider">
                <Building2 className="w-4 h-4" />
                <span>Organization Identity &amp; Location</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Company Registered Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={companyData.companyName}
                    onChange={(e) => setCompanyData({ ...companyData, companyName: e.target.value })}
                    placeholder="e.g. Apex Global Innovations Ltd"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111C38] text-sm focus:outline-none focus:ring-2 focus:ring-[#0265DC]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Trading / Brand Name
                  </label>
                  <input
                    type="text"
                    value={companyData.tradingName}
                    onChange={(e) => setCompanyData({ ...companyData, tradingName: e.target.value })}
                    placeholder="e.g. ApexTech"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111C38] text-sm focus:outline-none focus:ring-2 focus:ring-[#0265DC]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Primary Industry *
                  </label>
                  <select
                    value={companyData.industry}
                    onChange={(e) => setCompanyData({ ...companyData, industry: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111C38] text-sm focus:outline-none focus:ring-2 focus:ring-[#0265DC]"
                  >
                    {INDUSTRIES.map((ind) => (
                      <option key={ind} value={ind}>
                        {ind}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Team Size / Headcount *
                  </label>
                  <select
                    value={companyData.employeeSize}
                    onChange={(e) => setCompanyData({ ...companyData, employeeSize: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111C38] text-sm focus:outline-none focus:ring-2 focus:ring-[#0265DC]"
                  >
                    <option value="1 – 15 staff">1 – 15 staff (Starter)</option>
                    <option value="30 – 100 staff">30 – 100 staff (Professional)</option>
                    <option value="100 – 500 staff">100 – 500 staff (Business)</option>
                    <option value="500+ staff">500+ staff (Enterprise)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Operational Headquarters Country
                  </label>
                  <input
                    type="text"
                    value={companyData.country}
                    onChange={(e) => setCompanyData({ ...companyData, country: e.target.value })}
                    placeholder="e.g. Nigeria, India, United States"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111C38] text-sm focus:outline-none focus:ring-2 focus:ring-[#0265DC]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Operating Currency *
                  </label>
                  <select
                    value={companyData.currency}
                    onChange={(e) => setCompanyData({ ...companyData, currency: e.target.value as CurrencyCode })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111C38] text-sm focus:outline-none focus:ring-2 focus:ring-[#0265DC]"
                  >
                    {Object.keys(CURRENCIES).map((c) => {
                      const item = CURRENCIES[c];
                      if (!item) return null;
                      return (
                        <option key={c} value={c}>
                          {item.flag || '🌍'} {c} ({item.symbol}) - {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Company Website URL
                </label>
                <input
                  type="text"
                  value={companyData.website}
                  onChange={(e) => setCompanyData({ ...companyData, website: e.target.value })}
                  placeholder="https://yourcompany.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111C38] text-sm focus:outline-none focus:ring-2 focus:ring-[#0265DC]"
                />
              </div>
            </div>
          )}

          {/* STEP 2: Payroll Schedule & Statutory Rules */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0265DC] dark:text-blue-400 uppercase tracking-wider">
                <Wallet className="w-4 h-4" />
                <span>Payroll Frequency &amp; Statutory Compliance</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Pay Cycle Frequency
                  </label>
                  <select
                    value={companyData.payFrequency}
                    onChange={(e) =>
                      setCompanyData({
                        ...companyData,
                        payFrequency: e.target.value as 'Monthly' | 'Bi-weekly' | 'Weekly',
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111C38] text-sm focus:outline-none focus:ring-2 focus:ring-[#0265DC]"
                  >
                    <option value="Monthly">Monthly (Standard)</option>
                    <option value="Bi-weekly">Bi-weekly (Every 2 weeks)</option>
                    <option value="Weekly">Weekly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Scheduled Pay Day
                  </label>
                  <select
                    value={companyData.payDay}
                    onChange={(e) => setCompanyData({ ...companyData, payDay: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111C38] text-sm focus:outline-none focus:ring-2 focus:ring-[#0265DC]"
                  >
                    <option value="25th of month">25th of each month</option>
                    <option value="28th of month">28th of each month</option>
                    <option value="Last working day">Last working business day</option>
                    <option value="1st of next month">1st of following month</option>
                  </select>
                </div>
              </div>

              {/* Statutory Rules Checkboxes */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#111C38] border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#0265DC]" />
                  <span>Statutory Deductions &amp; Automations</span>
                </div>

                <div className="space-y-2.5">
                  <label className="flex items-start gap-2.5 cursor-pointer text-xs">
                    <input
                      type="checkbox"
                      checked={companyData.statutoryTax}
                      onChange={(e) => setCompanyData({ ...companyData, statutoryTax: e.target.checked })}
                      className="w-4 h-4 mt-0.5 rounded text-[#0265DC] focus:ring-[#0265DC] accent-[#0265DC]"
                    />
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white">
                        Automated PAYE / Personal Income Tax Calculation
                      </span>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Applies consolidated relief allowances and brackets automatically.
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-2.5 cursor-pointer text-xs">
                    <input
                      type="checkbox"
                      checked={companyData.statutoryPension}
                      onChange={(e) => setCompanyData({ ...companyData, statutoryPension: e.target.checked })}
                      className="w-4 h-4 mt-0.5 rounded text-[#0265DC] focus:ring-[#0265DC] accent-[#0265DC]"
                    />
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white">
                        Statutory Pension Contribution (8% Employee / 10% Employer)
                      </span>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Generates scheduled remittance schedules for Pension Fund Administrators (PFAs).
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-2.5 cursor-pointer text-xs">
                    <input
                      type="checkbox"
                      checked={companyData.statutoryHealth}
                      onChange={(e) => setCompanyData({ ...companyData, statutoryHealth: e.target.checked })}
                      className="w-4 h-4 mt-0.5 rounded text-[#0265DC] focus:ring-[#0265DC] accent-[#0265DC]"
                    />
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white">
                        Health Insurance (NHIS / HMO) &amp; Housing Fund Deductions
                      </span>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Enables employee medical benefit allowances and statutory employer subsidies.
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Departments & Primary HR Admin */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0265DC] dark:text-blue-400 uppercase tracking-wider">
                <Users className="w-4 h-4" />
                <span>Departments &amp; Primary Administrator</span>
              </div>

              {/* Department Multi-Select */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Select Initial Departments to Provision ({companyData.departments.length} selected):
                </label>
                <div className="flex flex-wrap gap-2">
                  {DEFAULT_DEPARTMENTS.map((dept) => {
                    const isSelected = companyData.departments.includes(dept);
                    return (
                      <button
                        key={dept}
                        type="button"
                        onClick={() => toggleDepartment(dept)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                          isSelected
                            ? 'bg-[#0265DC] text-white shadow-xs'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                        <span>{dept}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Primary Admin Details */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#111C38] border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-[#0265DC]" />
                  <span>Primary HR Super-Administrator</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={companyData.adminName}
                      onChange={(e) => setCompanyData({ ...companyData, adminName: e.target.value })}
                      placeholder="e.g. Adeola Johnson"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#070D1E] text-xs focus:ring-1 focus:ring-[#0265DC]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Official Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={companyData.adminEmail}
                      onChange={(e) => setCompanyData({ ...companyData, adminEmail: e.target.value })}
                      placeholder="adeola@company.com"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#070D1E] text-xs focus:ring-1 focus:ring-[#0265DC]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={companyData.adminPhone}
                      onChange={(e) => setCompanyData({ ...companyData, adminPhone: e.target.value })}
                      placeholder="+234 803 249 1842"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#070D1E] text-xs focus:ring-1 focus:ring-[#0265DC]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Role / Designation
                    </label>
                    <input
                      type="text"
                      value={companyData.adminRole}
                      onChange={(e) => setCompanyData({ ...companyData, adminRole: e.target.value })}
                      placeholder="e.g. Head of People"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#070D1E] text-xs focus:ring-1 focus:ring-[#0265DC]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Key Modules Activation */}
          {step === 4 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0265DC] dark:text-blue-400 uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                <span>Default Feature Activations</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() =>
                    setCompanyData({ ...companyData, enableGPSAttendance: !companyData.enableGPSAttendance })
                  }
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    companyData.enableGPSAttendance
                      ? 'bg-blue-50/70 dark:bg-blue-950/40 border-[#0265DC] ring-1 ring-[#0265DC]'
                      : 'bg-white dark:bg-[#111C38] border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <MapPin className="w-4 h-4 text-[#0265DC]" />
                    <span className="text-xs font-bold">{companyData.enableGPSAttendance ? 'Active' : 'Disabled'}</span>
                  </div>
                  <div className="font-bold text-xs">GPS &amp; Geofenced Clock-in</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Ensures staff clock in only within authorized office or field coordinates.
                  </div>
                </div>

                <div
                  onClick={() => setCompanyData({ ...companyData, enableMobileESS: !companyData.enableMobileESS })}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    companyData.enableMobileESS
                      ? 'bg-lime-50/70 dark:bg-lime-950/40 border-[#84CC16] ring-1 ring-[#84CC16]'
                      : 'bg-white dark:bg-[#111C38] border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <Smartphone className="w-4 h-4 text-emerald-600 dark:text-[#A3E635]" />
                    <span className="text-xs font-bold">{companyData.enableMobileESS ? 'Active' : 'Disabled'}</span>
                  </div>
                  <div className="font-bold text-xs">Employee Self-Service (ESS)</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Staff view payslips, request leave, and update bank details on mobile.
                  </div>
                </div>

                <div
                  onClick={() =>
                    setCompanyData({ ...companyData, enableWhatsAppAlerts: !companyData.enableWhatsAppAlerts })
                  }
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    companyData.enableWhatsAppAlerts
                      ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-500 ring-1 ring-emerald-500'
                      : 'bg-white dark:bg-[#111C38] border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <Zap className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold">{companyData.enableWhatsAppAlerts ? 'Active' : 'Disabled'}</span>
                  </div>
                  <div className="font-bold text-xs">Automated WhatsApp &amp; SMS Alerts</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Instant alerts for payroll disbursement, leave approvals &amp; announcements.
                  </div>
                </div>

                <div
                  onClick={() =>
                    setCompanyData({
                      ...companyData,
                      enableMultiTierApproval: !companyData.enableMultiTierApproval,
                    })
                  }
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    companyData.enableMultiTierApproval
                      ? 'bg-purple-50/70 dark:bg-purple-950/40 border-purple-500 ring-1 ring-purple-500'
                      : 'bg-white dark:bg-[#111C38] border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <ShieldCheck className="w-4 h-4 text-purple-600" />
                    <span className="text-xs font-bold">
                      {companyData.enableMultiTierApproval ? 'Active' : 'Disabled'}
                    </span>
                  </div>
                  <div className="font-bold text-xs">Multi-Tier Approval Hierarchy</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Team leads review first, then HR Manager, followed by Finance.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Launch & Workspace Confirmation */}
          {step === 5 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {!isReady ? (
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0265DC] dark:text-blue-400 uppercase tracking-wider mb-2">
                    <CheckCircle2 className="w-4 h-4 text-[#A3E635]" />
                    <span>Review Configuration &amp; Launch</span>
                  </div>

                  {/* Summary Card */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#111C38] border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
                    <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-200 dark:border-slate-700">
                      <div>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">Organization:</span>
                        <div className="font-bold text-slate-900 dark:text-white truncate">
                          {companyData.companyName}
                        </div>
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">Industry &amp; Size:</span>
                        <div className="font-bold text-slate-900 dark:text-white truncate">
                          {companyData.industry} • {companyData.employeeSize}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-200 dark:border-slate-700">
                      <div>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">Operating Currency &amp; HQ:</span>
                        <div className="font-bold text-slate-900 dark:text-white">
                          {companyData.currency} ({companyData.country})
                        </div>
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">Payroll Cycle:</span>
                        <div className="font-bold text-slate-900 dark:text-white">
                          {companyData.payFrequency} on {companyData.payDay}
                        </div>
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">Primary Administrator:</span>
                      <div className="font-bold text-slate-900 dark:text-white">
                        {companyData.adminName} ({companyData.adminEmail}) • {companyData.adminRole}
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">Active Departments ({companyData.departments.length}):</span>
                      <div className="text-[11px] text-slate-700 dark:text-slate-300 font-medium">
                        {companyData.departments.join(', ')}
                      </div>
                    </div>
                  </div>

                  {isProvisioning ? (
                    <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-[#A3E635] border-t-transparent rounded-full animate-spin" />
                        <span className="text-xs font-bold">{provisionStepText}</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2">
                        <div
                          className="bg-[#A3E635] h-2 rounded-full transition-all duration-500"
                          style={{ width: `${provisionProgress}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      id="launch-workspace-btn"
                      onClick={handleLaunchProvisioning}
                      className="w-full py-3.5 px-4 rounded-2xl bg-[#A3E635] hover:bg-[#84CC16] text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-lime-500/20 transition-all active:scale-[0.98]"
                    >
                      <Zap className="w-4 h-4 fill-slate-950" />
                      <span>Provision &amp; Launch NextSofthr Workspace</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ) : (
                /* Ready State */
                <div className="text-center py-4 space-y-4">
                  <div className="w-16 h-16 rounded-3xl bg-lime-100 dark:bg-lime-950 text-[#65A30D] dark:text-[#A3E635] flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-black text-slate-900 dark:text-white">
                      Company Profile Ready!
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto mt-1 leading-relaxed">
                      Your organization profile for <strong className="text-slate-900 dark:text-white">{companyData.companyName}</strong> has been configured with local payroll compliance, GPS geofencing, and employee self-service.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#111C38] border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs max-w-md mx-auto">
                    <div className="text-left">
                      <div className="font-bold text-slate-900 dark:text-white">Tenant ID: NSHR-72491</div>
                      <div className="text-[11px] text-slate-500">Admin: {companyData.adminEmail}</div>
                    </div>
                    <button
                      type="button"
                      id="download-config-btn"
                      onClick={handleDownloadConfig}
                      className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{downloadSuccess ? 'Downloaded!' : 'Export Config'}</span>
                    </button>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 py-3 px-4 rounded-xl bg-[#0265DC] hover:bg-[#004DB3] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-md"
                    >
                      <span>Enter Workspace Dashboard</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer with Back & Next Navigation */}
        {!isReady && (
          <div className="p-4 bg-slate-50 dark:bg-[#070D1E] border-t border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
            {step > 1 ? (
              <button
                type="button"
                id="wizard-back-btn"
                onClick={handleBack}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {step < totalSteps && (
              <button
                type="button"
                id="wizard-next-btn"
                onClick={handleNext}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-[#A3E635] hover:bg-[#84CC16] flex items-center gap-1.5 shadow-sm transition-all"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
