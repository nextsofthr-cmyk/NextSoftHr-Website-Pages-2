import React, { useState } from 'react';
import { Plus, Shield, Clock, CheckCircle2, AlertTriangle, ArrowUpRight, Search, Building2, Globe, Calendar } from 'lucide-react';
import { RegisteredLead, CommissionStatementItem } from '../types';
import { MODULE_CATALOG } from '../data/ledgerData';

import { useCommissionLanguage } from '../context/LanguageContext';
interface LeadRegistryProps {
  leads: RegisteredLead[];
  onRegisterLead: (lead: RegisteredLead) => void;
  onConvertLead: (lead: RegisteredLead, createdStatement: CommissionStatementItem) => void;
  onJumpToSection: (sectionId: number) => void;
}

export const LeadRegistry: React.FC<LeadRegistryProps> = ({
  leads,
  onRegisterLead,
  onConvertLead,
  onJumpToSection,
}) => {
  const { t } = useCommissionLanguage();
  const [showRegModal, setShowRegModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Form fields matching Section 23 exactly
  const [customerName, setCustomerName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [country, setCountry] = useState('Nigeria');
  const [industry, setIndustry] = useState('Financial Services');
  const [selectedModules, setSelectedModules] = useState<string[]>(['Core HR', 'Automated Payroll']);
  const [expectedValue, setExpectedValue] = useState<number>(3500);
  const [expectedCloseDate, setExpectedCloseDate] = useState('2026-05-15');

  // Duplicate warning detection (Section 25)
  const isDuplicate = leads.some(
    (l) =>
      companyName.trim() &&
      l.companyName.toLowerCase().trim() === companyName.toLowerCase().trim()
  );

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !companyName) return;

    const newLead: RegisteredLead = {
      id: `lead-${Date.now()}`,
      customerName,
      companyName,
      contactEmail,
      contactPhone,
      country,
      industry,
      selectedModules,
      expectedValue,
      expectedCloseDate,
      registeredDate: new Date().toISOString().split('T')[0],
      protectionDaysRemaining: 90, // Section 24 standard 90 days
      status: 'Protected Active',
      attributionNotes: 'Opportunity registered in compliance with Section 23 rules'
    };

    onRegisterLead(newLead);
    setShowRegModal(false);
    // Reset form
    setCustomerName('');
    setCompanyName('');
    setContactEmail('');
    setContactPhone('');
  };

  const handleConvertLead = (lead: RegisteredLead) => {
    // Generate corresponding Section 39 Statement item
    const commRate = 0.30; // Gold 30% default
    const exclusions = lead.expectedValue * 0.08;
    const commRev = lead.expectedValue - exclusions;
    const netComm = commRev * commRate;

    const statementItem: CommissionStatementItem = {
      id: `stmt-conv-${Date.now()}`,
      customerName: lead.companyName,
      invoiceNumber: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      product: lead.selectedModules.join(', '),
      purchaseDate: new Date().toISOString().split('T')[0],
      grossRevenue: lead.expectedValue,
      exclusions: exclusions,
      commissionableRevenue: commRev,
      commissionRate: commRate,
      commissionAmount: netComm,
      refundAdjustment: 0,
      netCommission: netComm,
      paymentStatus: 'Scheduled',
      payoutDate: 'Next Monthly Disbursement',
      referenceNotes: `Converted from Section 23 Lead #${lead.id}`
    };

    onConvertLead(lead, statementItem);
  };

  const filteredLeads = leads.filter((l) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      l.companyName.toLowerCase().includes(q) ||
      l.customerName.toLowerCase().includes(q) ||
      l.country.toLowerCase().includes(q) ||
      l.industry.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Lead Registration Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
              <span>Section 23 Lead Registration</span>
              <span aria-hidden="true">·</span>
              <span className="text-blue-700 dark:text-blue-300 font-mono">Section 24 (90-Day Protection Window)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t('page.leads.title')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
              {t('page.leads.subtitle')}
            </p>
          </div>

          <button
            onClick={() => setShowRegModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Register New Deal (§ 23)</span>
          </button>
        </div>

        {/* Protection Terms Callout */}
        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="flex items-start gap-2.5 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-md">
            <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-800 dark:text-slate-100 block">90-Day Protection Exclusivity</span>
              <span className="text-slate-500 dark:text-slate-400">
                Guaranteed commercial attribution window from initial portal timestamp (Section 24).
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-md">
            <Building2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-800 dark:text-slate-100 block">Conflict Hierarchy (Sec 58)</span>
              <span className="text-slate-500 dark:text-slate-400">
                First timestamped registration holds priority over subsequent claim filings.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-md">
            <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-800 dark:text-slate-100 block">Progression Requirement</span>
              <span className="text-slate-500 dark:text-slate-400">
                Opportunities must demonstrate active sales progression to retain protection status.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Search leads by company, contact, or country..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
          />
        </div>

        <div className="text-xs text-slate-500 dark:text-slate-400">
          Total Registered: <strong className="text-slate-800 dark:text-slate-100 font-mono">{leads.length}</strong>
        </div>
      </div>

      {/* Registered Opportunities Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-3">Company & Contact</th>
                <th className="py-3 px-3">Country & Industry</th>
                <th className="py-3 px-3">Required Modules</th>
                <th className="py-3 px-3 text-right">Expected ARR</th>
                <th className="py-3 px-3">Close Target</th>
                <th className="py-3 px-3">90-Day Protection Window</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-200">
              {filteredLeads.map((lead) => {
                const isConverted = lead.status === 'Converted to Customer';
                const isExpired = lead.protectionDaysRemaining === 0 && !isConverted;
                const percentRemaining = Math.max(0, Math.min(100, (lead.protectionDaysRemaining / 90) * 100));

                return (
                  <tr key={lead.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                    
                    {/* Company & Contact */}
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900 dark:text-white">{lead.companyName}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">{lead.customerName} · {lead.contactEmail}</div>
                    </td>

                    {/* Country & Industry */}
                    <td className="py-3 px-3">
                      <div className="font-medium text-slate-800 dark:text-slate-100">{lead.country}</div>
                      <div className="text-[11px] text-slate-400 dark:text-slate-500">{lead.industry}</div>
                    </td>

                    {/* Required Modules */}
                    <td className="py-3 px-3">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {lead.selectedModules.map((m, i) => (
                          <span key={i} className="text-[11px] text-slate-600 dark:text-slate-300">
                            {m}{i < lead.selectedModules.length - 1 ? ' · ' : ''}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Expected Value */}
                    <td className="py-3 px-3 text-right font-mono font-semibold text-slate-900 dark:text-white tabular-nums">
                      ${lead.expectedValue.toLocaleString()}
                    </td>

                    {/* Target Close */}
                    <td className="py-3 px-3 font-mono text-[11px] text-slate-600 dark:text-slate-300">
                      {lead.expectedCloseDate}
                    </td>

                    {/* 90-Day Protection Window */}
                    <td className="py-3 px-3 w-44">
                      {isConverted ? (
                        <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300 font-semibold text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Customer Won</span>
                        </div>
                      ) : isExpired ? (
                        <div className="text-rose-600 dark:text-rose-400 text-[11px] font-semibold">
                          Expired (Protection Released)
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <div className="flex justify-between text-[11px]">
                            <span className="font-mono font-bold text-blue-700 dark:text-blue-300">
                              {lead.protectionDaysRemaining} days left
                            </span>
                            <span className="text-slate-400 dark:text-slate-500">90d total</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${
                                lead.protectionDaysRemaining > 30 ? 'bg-blue-600' : 'bg-amber-500'
                              }`}
                              style={{ width: `${percentRemaining}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </td>

                    {/* Status */}
                    <td className="py-3 px-3 text-center">
                      <span className={`inline-block px-2 py-0.5 text-[11px] font-semibold rounded ${
                        isConverted
                          ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30'
                          : isExpired
                          ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-500/30'
                          : 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30'
                      }`}>
                        {lead.status}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-3 px-3 text-right">
                      {!isConverted && !isExpired && (
                        <button
                          onClick={() => handleConvertLead(lead)}
                          className="px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-500/10 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/30 rounded transition-colors"
                          title="Converts this protected lead to a paid customer transaction in the Statement Ledger"
                        >
                          Convert to Sale
                        </button>
                      )}
                      {isConverted && (
                        <span className="text-[11px] text-slate-400 dark:text-slate-500 italic">Invoiced</span>
                      )}
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>
            Complies with <strong>Section 23</strong> (Registration) and <strong>Section 24</strong> (90-Day Protection Period).
          </span>
          <button
            onClick={() => onJumpToSection(24)}
            className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5"
          >
            Review § 24 Terms <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Lead Registration Modal (Section 23) */}
      {showRegModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 max-w-lg w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Register Opportunity (Section 23)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Secures 90-day exclusive commercial attribution.
                </p>
              </div>
              <button
                onClick={() => setShowRegModal(false)}
                className="text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 text-sm"
              >
                ✕
              </button>
            </div>

            {isDuplicate && (
              <div className="p-3 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded text-xs text-amber-800 dark:text-amber-200 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
                <div>
                  <strong>Section 25 Duplicate Notice:</strong> A lead with company name &ldquo;{companyName}&rdquo; already exists in the system. Attribution hierarchy rules (Section 58) will apply to verify first legitimate submission.
                </div>
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-200 block mb-1">Company / Organization Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. TotalEnergies E&P"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded focus:ring-1 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-200 block mb-1">Key Contact Person *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mrs. Adeola Johnson"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded focus:ring-1 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-200 block mb-1">Contact Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="contact@company.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-200 block mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    placeholder="+234..."
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-200 block mb-1">Country</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded"
                  >
                    <option value="Nigeria">Nigeria</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Kenya">Kenya</option>
                    <option value="South Africa">South Africa</option>
                    <option value="Rwanda">Rwanda</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="Other">Other International</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-200 block mb-1">Industry</label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded"
                  >
                    <option value="Financial Services & Banking">Financial Services & Banking</option>
                    <option value="Energy, Oil & Gas">Energy, Oil & Gas</option>
                    <option value="Manufacturing & FMCG">Manufacturing & FMCG</option>
                    <option value="Healthcare & Pharma">Healthcare & Pharma</option>
                    <option value="Logistics & Supply Chain">Logistics & Supply Chain</option>
                    <option value="Public Sector & Education">Public Sector & Education</option>
                    <option value="Technology & Telecom">Technology & Telecom</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-200 block mb-1">Expected Deal ARR ($ USD)</label>
                  <input
                    type="number"
                    min="500"
                    step="250"
                    required
                    value={expectedValue}
                    onChange={(e) => setExpectedValue(Number(e.target.value))}
                    className="w-full px-3 py-2 font-mono border border-slate-300 dark:border-slate-700 rounded"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-200 block mb-1">Expected Purchase Date</label>
                  <input
                    type="date"
                    required
                    value={expectedCloseDate}
                    onChange={(e) => setExpectedCloseDate(e.target.value)}
                    className="w-full px-3 py-2 font-mono border border-slate-300 dark:border-slate-700 rounded"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowRegModal(false)}
                  className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
                >
                  Lock in 90-Day Protection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
