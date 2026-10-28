import React, { useState } from 'react';
import { INITIAL_LEADS } from '../data/partnerData';
import { LeadRecord } from '../types/agreement';
import {
  ShieldAlert,
  Clock,
  CheckCircle,
  AlertTriangle,
  Building,
  User,
  Mail,
  Phone,
  Briefcase,
  DollarSign,
  Plus,
  Send,
  Calendar,
  Lock
} from 'lucide-react';

export const LeadRegistrationSimulator: React.FC = () => {
  const [leads, setLeads] = useState<LeadRecord[]>(INITIAL_LEADS);
  const [selectedLead, setSelectedLead] = useState<LeadRecord>(leads[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  // Form fields
  const [formData, setFormData] = useState({
    prospectName: '',
    company: '',
    contactPerson: '',
    email: '',
    phone: '',
    country: 'Nigeria',
    industry: 'Financial Services',
    estimatedEmployeeCount: 150,
    productInterest: 'Full Suite (Payroll + HRIS + Attendance)',
    estimatedOpportunityValue: 8500,
    expectedPurchaseTimeframe: '30 - 60 Days'
  });

  const [collisionWarning, setCollisionWarning] = useState<string | null>(null);

  const handleCompanyChange = (val: string) => {
    setFormData({ ...formData, company: val });
    const normalized = val.toLowerCase().trim();
    if (normalized.includes('apex') || normalized.includes('meridian') || normalized.includes('vanguard')) {
      setCollisionWarning('CRM Notice: Similar prospect detected in registry. First-to-register priority under Clause 14 will apply.');
    } else {
      setCollisionWarning(null);
    }
  };

  const handleSubmitLead = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newLead: LeadRecord = {
        id: `LEAD-${Math.floor(1000 + Math.random() * 9000)}`,
        prospectName: formData.prospectName || formData.company,
        company: formData.company,
        contactPerson: formData.contactPerson,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        industry: formData.industry,
        estimatedEmployeeCount: Number(formData.estimatedEmployeeCount),
        productInterest: formData.productInterest,
        estimatedOpportunityValue: Number(formData.estimatedOpportunityValue),
        expectedPurchaseTimeframe: formData.expectedPurchaseTimeframe,
        status: 'Protected',
        submissionDate: new Date().toISOString().split('T')[0],
        protectionExpiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        notes: 'Submitted via portal. Automated CRM validation passed. 90-day lead protection granted.'
      };

      setLeads([newLead, ...leads]);
      setSelectedLead(newLead);
      setIsSubmitting(false);
      setSubmissionSuccess(true);
      setTimeout(() => setSubmissionSuccess(false), 4000);

      // Reset form
      setFormData({
        prospectName: '',
        company: '',
        contactPerson: '',
        email: '',
        phone: '',
        country: 'Nigeria',
        industry: 'Technology & SaaS',
        estimatedEmployeeCount: 100,
        productInterest: 'Full Suite (Payroll + HRIS)',
        estimatedOpportunityValue: 5000,
        expectedPurchaseTimeframe: '30 - 60 Days'
      });
      setCollisionWarning(null);
    }, 600);
  };

  const statusColors: Record<LeadRecord['status'], string> = {
    Submitted: 'text-slate-700 bg-slate-100 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
    'Under Review': 'text-amber-800 bg-amber-50 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/60',
    Approved: 'text-blue-800 bg-blue-50 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800/60',
    Protected: 'text-emerald-800 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/60',
    Contacted: 'text-purple-800 bg-purple-50 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800/60',
    Qualified: 'text-indigo-800 bg-indigo-50 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800/60',
    Opportunity: 'text-cyan-800 bg-cyan-50 border-cyan-200 dark:bg-cyan-950/40 dark:text-cyan-300 dark:border-cyan-800/60',
    Won: 'text-lime-900 bg-lime-100 border-lime-300 font-bold dark:bg-lime-950/60 dark:text-lime-300 dark:border-lime-700/60',
    Lost: 'text-rose-800 bg-rose-50 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800/60',
    Rejected: 'text-red-800 bg-red-50 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800/60',
    Expired: 'text-zinc-600 bg-zinc-100 border-zinc-300 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
  };

  return (
    <section id="lead-registration" className="py-20 bg-white dark:bg-[#040E1F] border-b border-slate-200 dark:border-blue-900/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-400 mb-2">
            <span>Opportunity Governance</span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
            <span>Clauses 13 & 14</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
            Lead Registration & 90-Day Protection Engine
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Register your prospective customer accounts to secure immediate attribution and a guaranteed 90-day exclusive sales window. Our automated CRM checks protect your investment of time and relationship equity.
          </p>
        </div>

        {/* Lead Protection Exceptions Disclosure Box */}
        <div className="mt-8 p-5 rounded-2xl bg-slate-900 dark:bg-[#030914] text-slate-200 border border-slate-800 dark:border-blue-900/70 space-y-3">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-lime-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-white">
              Rules of Lead Protection & Forfeiture Exceptions (Clause 14.3)
            </span>
          </div>
          <p className="text-xs text-slate-300">
            Lead protection grants a 90-day exclusive engagement shield, extendable by 30 days upon active procurement progress. Protection does not apply or will be revoked where:
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 text-[11px] text-slate-300">
            <div className="p-2 rounded bg-slate-800 dark:bg-blue-950/40 border border-slate-700/60 dark:border-blue-800/60">
              <span className="font-semibold text-white block mb-0.5">1. Existing Customer</span>
              <span>Account is already active in NextSoftHR within past 12 months.</span>
            </div>
            <div className="p-2 rounded bg-slate-800 dark:bg-blue-950/40 border border-slate-700/60 dark:border-blue-800/60">
              <span className="font-semibold text-white block mb-0.5">2. Prior Registration</span>
              <span>Another partner registered the account prior in time.</span>
            </div>
            <div className="p-2 rounded bg-slate-800 dark:bg-blue-950/40 border border-slate-700/60 dark:border-blue-800/60">
              <span className="font-semibold text-white block mb-0.5">3. Inbound Refusal</span>
              <span>Prospect contacts NextSoftHR directly and declines partner representation.</span>
            </div>
            <div className="p-2 rounded bg-slate-800 dark:bg-blue-950/40 border border-slate-700/60 dark:border-blue-800/60">
              <span className="font-semibold text-white block mb-0.5">4. Inactivity</span>
              <span>Partner fails to demonstrate active pursuit for 21+ consecutive days.</span>
            </div>
          </div>
        </div>

        {/* Two-Column Interactive Workspace */}
        <div className="mt-10 grid lg:grid-cols-12 gap-8 items-start">
          {/* Form Column */}
          <div className="lg:col-span-6 bg-slate-50 dark:bg-[#071D3E] p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-blue-800/80 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-blue-900/60 mb-5">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-blue-700 dark:text-blue-400" />
                <span>Submit Lead for Validation</span>
              </h3>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">All 11 Fields Required</span>
            </div>

            {submissionSuccess && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-xs text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Lead registered successfully! Protected status generated for 90 days.</span>
              </div>
            )}

            {collisionWarning && (
              <div className="mb-4 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 text-xs text-amber-900 dark:text-amber-200 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>{collisionWarning}</span>
              </div>
            )}

            <form onSubmit={handleSubmitLead} className="space-y-4 text-xs">
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Company / Organization *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sterling Translog Ltd"
                    value={formData.company}
                    onChange={(e) => handleCompanyChange(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-[#0A1A30] border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-600 dark:focus:border-blue-400"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Prospect / Brand Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Sterling Logistics"
                    value={formData.prospectName}
                    onChange={(e) => setFormData({ ...formData, prospectName: e.target.value })}
                    className="w-full px-3 py-2 bg-white dark:bg-[#0A1A30] border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-600 dark:focus:border-blue-400"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Contact Person & Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Amina Bello, Head of HR"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="w-full px-3 py-2 bg-white dark:bg-[#0A1A30] border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-600 dark:focus:border-blue-400"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Corporate Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. amina.b@sterling.example"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-white dark:bg-[#0A1A30] border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-600 dark:focus:border-blue-400"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Direct Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+234 802 000 0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-white dark:bg-[#0A1A30] border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-600 dark:focus:border-blue-400"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Country *</label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-3 py-2 bg-white dark:bg-[#0A1A30] border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-600 dark:focus:border-blue-400"
                  >
                    <option value="Nigeria" className="bg-white dark:bg-[#071D3E] text-slate-900 dark:text-white">Nigeria</option>
                    <option value="Ghana" className="bg-white dark:bg-[#071D3E] text-slate-900 dark:text-white">Ghana</option>
                    <option value="Kenya" className="bg-white dark:bg-[#071D3E] text-slate-900 dark:text-white">Kenya</option>
                    <option value="United Kingdom" className="bg-white dark:bg-[#071D3E] text-slate-900 dark:text-white">United Kingdom</option>
                    <option value="United States" className="bg-white dark:bg-[#071D3E] text-slate-900 dark:text-white">United States</option>
                    <option value="United Arab Emirates" className="bg-white dark:bg-[#071D3E] text-slate-900 dark:text-white">United Arab Emirates</option>
                    <option value="South Africa" className="bg-white dark:bg-[#071D3E] text-slate-900 dark:text-white">South Africa</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Industry Vertical</label>
                  <select
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full px-3 py-2 bg-white dark:bg-[#0A1A30] border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-600 dark:focus:border-blue-400"
                  >
                    <option value="Financial Services" className="bg-white dark:bg-[#071D3E] text-slate-900 dark:text-white">Financial Services & Banking</option>
                    <option value="Manufacturing & Industrial" className="bg-white dark:bg-[#071D3E] text-slate-900 dark:text-white">Manufacturing & Industrial</option>
                    <option value="Logistics & Supply Chain" className="bg-white dark:bg-[#071D3E] text-slate-900 dark:text-white">Logistics & Supply Chain</option>
                    <option value="Healthcare & Hospitals" className="bg-white dark:bg-[#071D3E] text-slate-900 dark:text-white">Healthcare & Hospitals</option>
                    <option value="Retail & Multi-Branch" className="bg-white dark:bg-[#071D3E] text-slate-900 dark:text-white">Retail & Multi-Branch</option>
                    <option value="Technology & SaaS" className="bg-white dark:bg-[#071D3E] text-slate-900 dark:text-white">Technology & SaaS</option>
                    <option value="Education & Universities" className="bg-white dark:bg-[#071D3E] text-slate-900 dark:text-white">Education & Universities</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Employee Headcount</label>
                  <input
                    type="number"
                    min="5"
                    max="10000"
                    value={formData.estimatedEmployeeCount}
                    onChange={(e) => setFormData({ ...formData, estimatedEmployeeCount: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-white dark:bg-[#0A1A30] border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-600 dark:focus:border-blue-400"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Product Scope / Modules</label>
                  <input
                    type="text"
                    value={formData.productInterest}
                    onChange={(e) => setFormData({ ...formData, productInterest: e.target.value })}
                    className="w-full px-3 py-2 bg-white dark:bg-[#0A1A30] border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-600 dark:focus:border-blue-400"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Est. Opportunity Value (USD $)</label>
                  <input
                    type="number"
                    min="500"
                    step="500"
                    value={formData.estimatedOpportunityValue}
                    onChange={(e) => setFormData({ ...formData, estimatedOpportunityValue: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-white dark:bg-[#0A1A30] border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-600 dark:focus:border-blue-400"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Expected Purchase Timeframe</label>
                <select
                  value={formData.expectedPurchaseTimeframe}
                  onChange={(e) => setFormData({ ...formData, expectedPurchaseTimeframe: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-[#0A1A30] border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-600 dark:focus:border-blue-400"
                >
                  <option value="Immediate (< 30 Days)" className="bg-white dark:bg-[#071D3E] text-slate-900 dark:text-white">Immediate (&lt; 30 Days)</option>
                  <option value="30 - 60 Days" className="bg-white dark:bg-[#071D3E] text-slate-900 dark:text-white">30 - 60 Days</option>
                  <option value="60 - 90 Days" className="bg-white dark:bg-[#071D3E] text-slate-900 dark:text-white">60 - 90 Days</option>
                  <option value="90+ Days (Budget Planning)" className="bg-white dark:bg-[#071D3E] text-slate-900 dark:text-white">90+ Days (Budget Planning)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-2.5 px-4 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Validating Lead Against Registry...' : 'Submit & Register Lead'}</span>
              </button>
            </form>
          </div>

          {/* Active Leads Pipeline Registry */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-blue-900/60">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Partner Lead Registry ({leads.length})
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400">Live Simulation</span>
            </div>

            <div className="space-y-3 max-h-[560px] overflow-y-auto pr-1">
              {leads.map((lead) => {
                const isSelected = selectedLead.id === lead.id;
                return (
                  <div
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-blue-500 bg-white dark:bg-[#071D3E] shadow-sm ring-1 ring-blue-200 dark:ring-blue-500/40'
                        : 'border-slate-200 dark:border-blue-900/60 bg-white dark:bg-[#071D3E]/70 hover:border-slate-300 dark:hover:border-blue-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">{lead.id}</span>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${statusColors[lead.status]}`}>
                            {lead.status}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">{lead.company}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{lead.contactPerson} · {lead.country}</p>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold text-blue-700 dark:text-blue-400 tabular-nums">
                          ${lead.estimatedOpportunityValue.toLocaleString()}
                        </span>
                        <span className="block text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                          {lead.estimatedEmployeeCount} employees
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-blue-900/50 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-medium">
                        <Clock className="w-3 h-3" />
                        <span>Protected until: {lead.protectionExpiryDate}</span>
                      </div>
                      <span className="text-slate-400 dark:text-slate-500">{lead.expectedPurchaseTimeframe}</span>
                    </div>

                    {isSelected && lead.notes && (
                      <p className="mt-2 text-[11px] text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-blue-950/40 p-2 rounded border border-slate-100 dark:border-blue-900/60 italic">
                        {lead.notes}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
