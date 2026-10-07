import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Clock, 
  AlertCircle, 
  Plus, 
  CheckCircle, 
  HelpCircle, 
  Building, 
  UserCheck, 
  Calendar, 
  FileText,
  DollarSign,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface RegisteredLead {
  id: string;
  customerName: string;
  companyName: string;
  contactEmail: string;
  country: string;
  industry: string;
  productRequirement: string;
  expectedValue: number;
  expectedDate: string;
  registrationDate: string;
  protectionDaysRemaining: number;
  status: 'Protected' | 'Expiring Soon' | 'Released' | 'Converted';
}

const INITIAL_LEADS: RegisteredLead[] = [
  {
    id: 'LD-9021',
    customerName: 'Dr. Adebayo Lawal',
    companyName: 'Meridian Premier Health Group',
    contactEmail: 'a.lawal@meridianhealth.ng',
    country: 'Nigeria',
    industry: 'Healthcare & Hospitals',
    productRequirement: 'HR + Payroll + Attendance (350 Staff, 4 Locations)',
    expectedValue: 8400,
    expectedDate: '2026-11-15',
    registrationDate: '2026-09-12',
    protectionDaysRemaining: 72,
    status: 'Protected'
  },
  {
    id: 'LD-8944',
    customerName: 'Kofi Mensah',
    companyName: 'GoldCoast Logistics Ltd',
    contactEmail: 'kofi@goldcoastlogistics.com',
    country: 'Ghana',
    industry: 'Transport & Logistics',
    productRequirement: 'Core HR + Leave + ESS (120 Drivers & Staff)',
    expectedValue: 3600,
    expectedDate: '2026-10-20',
    registrationDate: '2026-08-01',
    protectionDaysRemaining: 30,
    status: 'Protected'
  },
  {
    id: 'LD-8812',
    customerName: 'Chiamaka Eze',
    companyName: 'Sahara Retail Superstores',
    contactEmail: 'ceze@sahararetail.com',
    country: 'Nigeria',
    industry: 'Retail & FMCG',
    productRequirement: 'Time & Attendance + Payroll (12 Branches)',
    expectedValue: 14500,
    expectedDate: '2026-10-05',
    registrationDate: '2026-07-08',
    protectionDaysRemaining: 6,
    status: 'Expiring Soon'
  }
];

export const LeadTracker: React.FC<{ onNavigateToSection: (id: number) => void }> = ({ onNavigateToSection }) => {
  const [leads, setLeads] = useState<RegisteredLead[]>(INITIAL_LEADS);
  const [showModal, setShowModal] = useState(false);

  // Form states matching Section 23 mandatory requirements
  const [customerName, setCustomerName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [country, setCountry] = useState('Nigeria');
  const [industry, setIndustry] = useState('Financial Services');
  const [productRequirement, setProductRequirement] = useState('Core HR + Payroll Engine');
  const [expectedValue, setExpectedValue] = useState(4000);
  const [expectedDate, setExpectedDate] = useState('2026-11-30');

  // Duplicate checker test tool (Section 25)
  const [activeDuplicateTab, setActiveDuplicateTab] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !companyName) return;

    const newLead: RegisteredLead = {
      id: `LD-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName,
      companyName,
      contactEmail,
      country,
      industry,
      productRequirement,
      expectedValue,
      expectedDate,
      registrationDate: new Date().toISOString().split('T')[0],
      protectionDaysRemaining: 90, // Section 24 standard 90 days
      status: 'Protected'
    };

    setLeads([newLead, ...leads]);
    setShowModal(false);
    // Reset form
    setCustomerName('');
    setCompanyName('');
    setContactEmail('');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/60 rounded-2xl p-6 border border-slate-800 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 text-xs font-semibold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              Sections 23, 24 & 25 • Deal Protection & Pipeline
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Lead Registration & 90-Day Protection Hub
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Protect your prospects under Section 24's 90-day lead protection covenant. Maintain attribution priority and prevent lead conflict across channel partners.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-cyan-950/40 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Register New Opportunity</span>
            </button>
          </div>
        </div>
      </div>

      {/* Highlights & Policy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Section 24: 90-Day Protection
              </h4>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Registered opportunities enjoy 90 days of exclusive attribution. If not progressed, NextSoftHR may release to pipeline.
            </p>
            <button
              onClick={() => onNavigateToSection(24)}
              className="text-[11px] text-cyan-400 hover:underline mt-2 flex items-center gap-1"
            >
              View Section 24 <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 shrink-0">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Section 25: Duplicate Leads
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              When multiple partners submit the same account, priority goes to: 1) First registration, 2) Client confirmation, 3) Relationship, 4) Activity.
            </p>
            <button
              onClick={() => onNavigateToSection(25)}
              className="text-[11px] text-cyan-400 hover:underline mt-2 flex items-center gap-1"
            >
              View Section 25 <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Section 27 & 28: Integrity
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Self-referrals (buying for own company or family) and cookie-stuffing are strictly prohibited and result in commission reversal.
            </p>
            <button
              onClick={() => onNavigateToSection(27)}
              className="text-[11px] text-cyan-400 hover:underline mt-2 flex items-center gap-1"
            >
              View Section 27 & 28 <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Protected Pipeline Table */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              Active Registered Opportunities ({leads.length})
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Opportunities registered under Schedule B Section 23 with mandatory compliance fields
            </p>
          </div>

          <span className="text-xs font-mono text-cyan-400 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/80">
            Standard 90-Day Clock
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/70 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Deal ID & Customer</th>
                <th className="py-3 px-4">Requirement / Scope</th>
                <th className="py-3 px-4">Territory & Industry</th>
                <th className="py-3 px-4">Expected Value</th>
                <th className="py-3 px-4">Protection Clock (Sec 24)</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {leads.map((lead) => {
                const isExpiring = lead.protectionDaysRemaining <= 14;
                return (
                  <tr key={lead.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white">{lead.companyName}</div>
                      <div className="text-[11px] text-slate-400">{lead.customerName} • {lead.contactEmail}</div>
                      <span className="text-[10px] font-mono text-cyan-400 mt-0.5 inline-block">{lead.id}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="text-slate-200">{lead.productRequirement}</div>
                      <div className="text-[11px] text-slate-400">Reg: {lead.registrationDate}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="text-slate-200 font-medium">{lead.country}</span>
                      <div className="text-[11px] text-slate-400">{lead.industry}</div>
                    </td>

                    <td className="py-3.5 px-4 font-mono font-semibold text-cyan-300">
                      ${lead.expectedValue.toLocaleString()}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-slate-800 rounded-full h-2 overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              isExpiring ? 'bg-amber-400' : 'bg-cyan-500'
                            }`}
                            style={{ width: `${Math.max(5, (lead.protectionDaysRemaining / 90) * 100)}%` }}
                          />
                        </div>
                        <span className={`text-[11px] font-mono font-bold ${
                          isExpiring ? 'text-amber-400' : 'text-cyan-400'
                        }`}>
                          {lead.protectionDaysRemaining}d left
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500">of 90 days total</span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        lead.status === 'Protected'
                          ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-800'
                          : lead.status === 'Expiring Soon'
                          ? 'bg-amber-950/80 text-amber-300 border border-amber-800'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 25 Duplicate Priority Diagnostic Tool */}
      <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Section 25 Duplicate Lead Priority Hierarchy Diagnostic
            </h3>
          </div>
          <button
            onClick={() => setActiveDuplicateTab(!activeDuplicateTab)}
            className="text-xs text-cyan-400 hover:underline"
          >
            {activeDuplicateTab ? 'Hide Diagnostic' : 'Test Lead Conflict Scenario'}
          </button>
        </div>

        <p className="text-xs text-slate-400">
          Under Section 25, if two partners submit conflicting claims for the same prospective account, NextSoftHR Partner Operations evaluates priority in this exact sequence:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
          {[
            { step: '1', title: 'Valid First Registration', rule: 'Earliest complete submission in Portal with all Sec 23 fields.' },
            { step: '2', title: 'Customer Written Confirmation', rule: 'Direct confirmation from the client\'s decision maker.' },
            { step: '3', title: 'Existing Relationship', rule: 'Demonstrable active commercial services contract with client.' },
            { step: '4', title: 'Demonstrable Activity', rule: 'Logged demos, meetings, architectural sessions within 30 days.' },
            { step: '5', title: 'Partner Ops Determination', rule: 'Final administrative adjudication by NextSoftHR operations.' },
          ].map(h => (
            <div key={h.step} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-left">
              <span className="text-[10px] font-mono text-cyan-400 font-bold block mb-1">
                Priority Tier {h.step}
              </span>
              <h5 className="text-xs font-semibold text-white">{h.title}</h5>
              <p className="text-[11px] text-slate-400 mt-1 leading-snug">{h.rule}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Registration Modal conforming to Section 23 */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">
                  Section 23 Lead Registration Form
                </h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white text-xs font-mono"
              >
                ✕ Close
              </button>
            </div>

            <form onSubmit={handleRegister} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Customer / Contact Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tunde Balogun"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Company / Organization *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sterling Microfinance Ltd"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Contact Email / Phone *</label>
                  <input
                    type="text"
                    required
                    placeholder="tunde@sterling.ng"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Country / Territory *</label>
                  <input
                    type="text"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Industry Sector *</label>
                <input
                  type="text"
                  required
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Product Requirement & Seat Count *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Core HR, Payroll, ESS (150 Employees)"
                  value={productRequirement}
                  onChange={(e) => setProductRequirement(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Expected Purchase Value ($) *</label>
                  <input
                    type="number"
                    min="100"
                    required
                    value={expectedValue}
                    onChange={(e) => setExpectedValue(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white font-mono focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Expected Close Date *</label>
                  <input
                    type="date"
                    required
                    value={expectedDate}
                    onChange={(e) => setExpectedDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-800/40 text-[11px] text-cyan-200">
                🛡️ Submitting activates the <strong>90-Day Lead Protection Period</strong> under Section 24.
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Lock Opportunity (90 Days)</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
