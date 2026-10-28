import React, { useState } from 'react';
import { AcceptanceRecord, LeadRecord } from '../types/agreement';
import { ACADEMY_COURSES, INITIAL_LEADS, PARTNER_CATEGORIES, DOCUMENT_CENTER } from '../data/partnerData';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  DollarSign,
  Link as LinkIcon,
  GraduationCap,
  FolderDown,
  Headphones,
  Settings,
  ShieldCheck,
  TrendingUp,
  Clock,
  CheckCircle,
  Copy,
  Check,
  ExternalLink,
  Award,
  AlertCircle,
  Plus,
  Send,
  Building,
  HelpCircle,
  Sparkles
} from 'lucide-react';

interface PartnerPortalProps {
  acceptanceRecord: AcceptanceRecord | null;
  onOpenAcceptance: () => void;
  onBackToAgreement: () => void;
}

export const PartnerPortal: React.FC<PartnerPortalProps> = ({
  acceptanceRecord,
  onOpenAcceptance,
  onBackToAgreement
}) => {
  const [activeTab, setActiveTab] = useState<
    | 'dashboard'
    | 'leads'
    | 'customers'
    | 'commissions'
    | 'links'
    | 'academy'
    | 'marketing'
    | 'support'
    | 'profile'
  >('dashboard');

  const partnerId = acceptanceRecord?.partnerId || 'NSHR-PTR-3821';
  const partnerName = acceptanceRecord?.fullName || 'Emmanuel Balogun';
  const companyName = acceptanceRecord?.company || 'Balogun Advisory & Systems';
  const partnerCategory = acceptanceRecord?.partnerType || 'reseller';

  // Referral Link state
  const [customUtmCampaign, setCustomUtmCampaign] = useState('q4_workforce_campaign');
  const [customUtmSource, setCustomUtmSource] = useState('linkedin');
  const [copiedLink, setCopiedLink] = useState(false);

  // Academy certification progress state
  const [completedCourses, setCompletedCourses] = useState<Set<string>>(new Set(['crs-found-01']));

  // Support ticket form state
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketSuccess, setTicketSuccess] = useState(false);

  const baseReferralUrl = `https://app.nextsofthr.org/register?pid=${partnerId}&ref=${partnerCategory}`;
  const generatedUtmUrl = `${baseReferralUrl}&utm_source=${customUtmSource}&utm_campaign=${customUtmCampaign}&utm_medium=partner_referral`;

  const copyLink = () => {
    navigator.clipboard.writeText(generatedUtmUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const toggleCourseCompletion = (id: string) => {
    setCompletedCourses((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketSuccess(true);
    setTimeout(() => {
      setTicketSubject('');
      setTicketMessage('');
      setTicketSuccess(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#040E1F] text-slate-900 dark:text-slate-100 flex flex-col transition-colors">
      {/* Portal Top Bar */}
      <div className="bg-slate-900 dark:bg-[#030914] text-white border-b border-slate-800 dark:border-blue-900/60 px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToAgreement}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-semibold"
          >
            ← Back to Agreement
          </button>
          <span className="text-slate-600 dark:text-slate-600">|</span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white tracking-tight">NextSoftHR Partner Workspace</span>
            <span className="text-[10px] font-mono text-lime-400 bg-lime-950/80 border border-lime-800 px-1.5 py-0.5 rounded">
              Gold Tier (30%)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div>
            <span className="text-slate-400">Partner ID:</span>{' '}
            <span className="text-white font-bold">{partnerId}</span>
          </div>
          <div>
            <span className="text-slate-400">Organization:</span>{' '}
            <span className="text-slate-200">{companyName}</span>
          </div>
        </div>
      </div>

      {/* Main Workspace Layout with Sidebar & Content */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:px-6 lg:px-8 py-6 grid lg:grid-cols-12 gap-6 items-start">
        {/* Left Sidebar Navigation */}
        <aside className="lg:col-span-3 bg-white dark:bg-[#071D3E] rounded-2xl border border-slate-200 dark:border-blue-800/80 shadow-xs p-3 space-y-1">
          <div className="p-3 mb-2 border-b border-slate-100 dark:border-blue-900/60">
            <span className="text-xs font-bold text-slate-900 dark:text-white block">{companyName}</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 capitalize">{partnerCategory} Partner · Active</span>
          </div>

          {[
            { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
            { id: 'leads', label: 'Leads & Deal Protection', icon: Briefcase },
            { id: 'customers', label: 'Customer Subscriptions', icon: Users },
            { id: 'commissions', label: 'Commissions & Payouts', icon: DollarSign },
            { id: 'links', label: 'Referral Links & Cookies', icon: LinkIcon },
            { id: 'academy', label: 'NextSoftHR Academy', icon: GraduationCap },
            { id: 'marketing', label: 'Marketing & Asset Pack', icon: FolderDown },
            { id: 'support', label: 'Priority Support Desk', icon: Headphones },
            { id: 'profile', label: 'Partner Profile & Legal', icon: Settings }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer text-left ${
                  isActive
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-blue-900/40'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-4 mt-4 border-t border-slate-100 dark:border-blue-900/60 text-center">
            <span className="text-[11px] text-slate-400 block mb-2">Dedicated Channel Support</span>
            <a
              href="tel:+2349158482622"
              className="text-xs font-bold text-blue-700 dark:text-blue-400 hover:underline block"
            >
              +2349158482622
            </a>
          </div>
        </aside>

        {/* Right Main Content Area */}
        <main className="lg:col-span-9 bg-white dark:bg-[#071D3E] rounded-2xl border border-slate-200 dark:border-blue-800/80 shadow-xs p-6 sm:p-8 min-h-[620px]">
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Welcome banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-blue-900/60">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                    Welcome back, {partnerName}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Your NextSoftHR Gold Partner portal is active. 3 deals currently under exclusive lead protection.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('leads')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Register New Lead</span>
                </button>
              </div>

              {/* KPI Cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#040E1F] border border-slate-200 dark:border-blue-900/60">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block">Total Pipeline Value:</span>
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-white tabular-nums block mt-1">
                    $85,300
                  </span>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold block mt-1">
                    3 Protected Deals
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#040E1F] border border-slate-200 dark:border-blue-900/60">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block">Current Partner Tier:</span>
                  <span className="text-2xl font-extrabold text-blue-700 dark:text-blue-400 block mt-1">
                    Gold (30%)
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-1">
                    Next Tier: Platinum at 50 subs
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#040E1F] border border-slate-200 dark:border-blue-900/60">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block">Pending Next Payout:</span>
                  <span className="text-2xl font-extrabold text-lime-700 dark:text-lime-400 tabular-nums block mt-1">
                    $4,280.00
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-1">
                    Disburses: 15th of next month
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#040E1F] border border-slate-200 dark:border-blue-900/60">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block">YTD Commissions Earned:</span>
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-white tabular-nums block mt-1">
                    $18,450.00
                  </span>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold block mt-1">
                    100% On-Time Remittances
                  </span>
                </div>
              </div>

              {/* Recent Lead Protection Status */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Active Protected Pipeline
                  </h4>
                  <button
                    onClick={() => setActiveTab('leads')}
                    className="text-xs font-semibold text-blue-700 dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    View All Leads →
                  </button>
                </div>
                <div className="space-y-2">
                  {INITIAL_LEADS.map((lead) => (
                    <div
                      key={lead.id}
                      className="p-3.5 rounded-xl border border-slate-200 dark:border-blue-900/60 bg-white dark:bg-[#0A1A30] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 dark:text-white">{lead.company}</span>
                          <span className="text-[10px] font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 px-2 py-0.5 rounded">
                            {lead.status}
                          </span>
                        </div>
                        <span className="text-slate-500 dark:text-slate-400 block mt-0.5">
                          {lead.contactPerson} · Est. ARR: ${lead.estimatedOpportunityValue.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                        <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Protected to: {lead.protectionExpiryDate}</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* System Announcements */}
              <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/80 space-y-2 text-xs">
                <span className="font-bold text-blue-950 dark:text-blue-200 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Channel Announcement: Biometric Hardware Co-Sell Program Active</span>
                </span>
                <p className="text-blue-900 dark:text-blue-300 text-[11px] leading-relaxed">
                  NextSoftHR has released certified firmware integrations for ZKTeco and Anviz biometric attendance devices. Resellers can bundle hardware packages directly with software subscriptions for increased margins under Clause 18.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: LEADS & DEAL PROTECTION */}
          {activeTab === 'leads' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-blue-900/60">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Lead Registration & Deal Shield</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Every registered prospect receives 90 days of exclusive sales engagement.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#040E1F] border border-slate-200 dark:border-blue-900/60 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                <span className="font-bold text-slate-900 dark:text-white block">Lead Exclusivity Guarantee (Clause 14):</span>
                <p>
                  During the active 90-day window, our internal sales teams will not solicit this client, and competing partner registrations will be rejected. Request an extension when submitting formal RFP proposals.
                </p>
              </div>

              <div className="space-y-3">
                {INITIAL_LEADS.map((lead) => (
                  <div key={lead.id} className="p-4 rounded-xl border border-slate-200 dark:border-blue-900/60 bg-white dark:bg-[#0A1A30] space-y-3 text-xs">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-blue-700 dark:text-blue-400">{lead.id}</span>
                          <span className="font-bold text-slate-900 dark:text-white text-sm">{lead.company}</span>
                          <span className="text-[10px] font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/80">
                            {lead.status}
                          </span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 mt-1">{lead.contactPerson} ({lead.email} · {lead.phone})</p>
                      </div>

                      <div className="text-right">
                        <span className="font-bold text-slate-900 dark:text-white text-sm">${lead.estimatedOpportunityValue.toLocaleString()}</span>
                        <span className="block text-[11px] text-slate-400 dark:text-slate-500">{lead.estimatedEmployeeCount} employees</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-[#071D3E]/60 border border-slate-100 dark:border-blue-900/50 flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-300">
                      <span>Modules: {lead.productInterest}</span>
                      <span className="text-emerald-700 dark:text-emerald-400 font-medium">Protection valid through {lead.protectionExpiryDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: CUSTOMER SUBSCRIPTIONS */}
          {activeTab === 'customers' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-blue-900/60">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Active Customer Subscriptions</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Live client organizations managed under your partner commission code.</p>
                </div>
              </div>

              <div className="border border-slate-200 dark:border-blue-900/60 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 dark:bg-[#040E1F] border-b border-slate-200 dark:border-blue-900/60 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                    <tr>
                      <th className="p-3">Customer Tenant</th>
                      <th className="p-3">Plan / Seats</th>
                      <th className="p-3">Monthly Spend</th>
                      <th className="p-3">Partner Share (30%)</th>
                      <th className="p-3">Renewal Date</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-blue-900/40 bg-white dark:bg-[#071D3E]">
                    <tr>
                      <td className="p-3 font-bold text-slate-900 dark:text-white">Alpha Logistics Services</td>
                      <td className="p-3 text-slate-700 dark:text-slate-300">Enterprise Suite (240 seats)</td>
                      <td className="p-3 tabular-nums text-slate-900 dark:text-white">$960.00</td>
                      <td className="p-3 font-bold text-lime-700 dark:text-lime-400 tabular-nums">$288.00/mo</td>
                      <td className="p-3 text-slate-500 dark:text-slate-400">2027-04-15</td>
                      <td className="p-3"><span className="text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded font-semibold text-[10px]">Active</span></td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-900 dark:text-white">Zenith Healthcare Clinics</td>
                      <td className="p-3 text-slate-700 dark:text-slate-300">Payroll + HRIS (180 seats)</td>
                      <td className="p-3 tabular-nums text-slate-900 dark:text-white">$720.00</td>
                      <td className="p-3 font-bold text-lime-700 dark:text-lime-400 tabular-nums">$216.00/mo</td>
                      <td className="p-3 text-slate-500 dark:text-slate-400">2027-06-01</td>
                      <td className="p-3"><span className="text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded font-semibold text-[10px]">Active</span></td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-900 dark:text-white">Premier Agro Processors</td>
                      <td className="p-3 text-slate-700 dark:text-slate-300">Core HR + Attendance (520 seats)</td>
                      <td className="p-3 tabular-nums text-slate-900 dark:text-white">$1,560.00</td>
                      <td className="p-3 font-bold text-lime-700 dark:text-lime-400 tabular-nums">$468.00/mo</td>
                      <td className="p-3 text-slate-500 dark:text-slate-400">2027-08-20</td>
                      <td className="p-3"><span className="text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded font-semibold text-[10px]">Active</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: COMMISSIONS & PAYOUTS */}
          {activeTab === 'commissions' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-blue-900/60">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Commissions & Monthly Ledger</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Calculated on Commissionable Revenue actually received, disbursed monthly on the 15th.</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 text-xs font-mono">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#040E1F] border border-slate-200 dark:border-blue-900/60">
                  <span className="text-slate-400 block text-[11px]">Upcoming Payout (Oct 15):</span>
                  <span className="text-xl font-bold text-slate-900 dark:text-white block mt-1">$4,280.00</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#040E1F] border border-slate-200 dark:border-blue-900/60">
                  <span className="text-slate-400 block text-[11px]">Minimum Payout Threshold:</span>
                  <span className="text-xl font-bold text-slate-900 dark:text-white block mt-1">$100 USD (Met)</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#040E1F] border border-slate-200 dark:border-blue-900/60">
                  <span className="text-slate-400 block text-[11px]">Remittance Rail:</span>
                  <span className="text-xs font-bold text-blue-700 dark:text-blue-400 block mt-1">SWIFT / Direct Bank Transfer</span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Past Disbursement Statements</h4>
                <div className="border border-slate-200 dark:border-blue-900/60 rounded-xl overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 dark:bg-[#040E1F] border-b border-slate-200 dark:border-blue-900/60 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                      <tr>
                        <th className="p-3">Cycle Date</th>
                        <th className="p-3">Reference ID</th>
                        <th className="p-3">Gross Revenue</th>
                        <th className="p-3">Commission (30%)</th>
                        <th className="p-3">Tax Withholding</th>
                        <th className="p-3">Net Disbursed</th>
                        <th className="p-3">Receipt</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-blue-900/40 bg-white dark:bg-[#071D3E]">
                      <tr>
                        <td className="p-3 text-slate-700 dark:text-slate-300">2026-09-15</td>
                        <td className="p-3 font-mono text-slate-900 dark:text-white">PAY-2026-0914</td>
                        <td className="p-3 text-slate-900 dark:text-white">$14,200.00</td>
                        <td className="p-3 font-bold text-slate-900 dark:text-white">$4,260.00</td>
                        <td className="p-3 text-slate-500 dark:text-slate-400">$0.00 (Self-Assessed)</td>
                        <td className="p-3 font-bold text-lime-700 dark:text-lime-400">$4,260.00</td>
                        <td className="p-3"><button className="text-blue-700 dark:text-blue-400 hover:underline cursor-pointer">Download PDF</button></td>
                      </tr>
                      <tr>
                        <td className="p-3 text-slate-700 dark:text-slate-300">2026-08-15</td>
                        <td className="p-3 font-mono text-slate-900 dark:text-white">PAY-2026-0812</td>
                        <td className="p-3 text-slate-900 dark:text-white">$13,500.00</td>
                        <td className="p-3 font-bold text-slate-900 dark:text-white">$4,050.00</td>
                        <td className="p-3 text-slate-500 dark:text-slate-400">$0.00</td>
                        <td className="p-3 font-bold text-lime-700 dark:text-lime-400">$4,050.00</td>
                        <td className="p-3"><button className="text-blue-700 dark:text-blue-400 hover:underline cursor-pointer">Download PDF</button></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: REFERRAL LINKS & UTM TOOLS */}
          {activeTab === 'links' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-blue-900/60">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Affiliate Tracking & Referral Links</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Track inbound click-throughs, trial signups, and automated CRM conversion tags.</p>
                </div>
              </div>

              {/* Cookie Disclosure Notice (Prompt Requirement) */}
              <div className="p-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                <span className="font-bold block">Attribution & Cookie Tracking Rules (Clauses 16 & 17):</span>
                <p>
                  Default tracking cookie lifespan is ninety (90) calendar days. Attribution depends upon client-side cookies and may be affected by user deletion of cookies, browser privacy settings, or ad-blockers beyond NextSoftHR's control. Clicking a tracking link alone does not guarantee a commission without a converted paid subscription.
                </p>
              </div>

              {/* Link Generator */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#040E1F] border border-slate-200 dark:border-blue-900/60 space-y-4 text-xs">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Custom Campaign UTM Link Builder</h4>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Campaign Source (utm_source):</label>
                    <input
                      type="text"
                      value={customUtmSource}
                      onChange={(e) => setCustomUtmSource(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-[#0A1A30] border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-600 dark:focus:border-blue-400"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Campaign Name (utm_campaign):</label>
                    <input
                      type="text"
                      value={customUtmCampaign}
                      onChange={(e) => setCustomUtmCampaign(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-[#0A1A30] border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-600 dark:focus:border-blue-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Your Tracked Referral URL:</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={generatedUtmUrl}
                      className="w-full px-3 py-2.5 bg-white dark:bg-[#0A1A30] border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white font-mono text-xs select-all focus:outline-none"
                    />
                    <button
                      onClick={copyLink}
                      className="px-4 py-2.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors cursor-pointer shrink-0 flex items-center gap-1.5"
                    >
                      {copiedLink ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Link</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: NEXTSOFTHR ACADEMY & CERTIFICATIONS */}
          {activeTab === 'academy' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-blue-900/60">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">NextSoftHR Partner Academy</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Official accreditation tracks for sales, payroll algorithms, and enterprise implementation.</p>
                </div>
              </div>

              {/* 4 Certification Badges Display */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
                <div className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/50 text-blue-900 dark:text-blue-200 space-y-1">
                  <Award className="w-6 h-6 text-blue-700 dark:text-blue-400 mx-auto" />
                  <span className="font-bold block">Foundation</span>
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold block">Completed</span>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-blue-900/60 bg-white dark:bg-[#040E1F] text-slate-700 dark:text-slate-300 space-y-1">
                  <Award className="w-6 h-6 text-slate-400 mx-auto" />
                  <span className="font-bold block">Professional</span>
                  <span className="text-[10px] text-amber-700 dark:text-amber-400 font-semibold block">In Progress</span>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-blue-900/60 bg-white dark:bg-[#040E1F] text-slate-700 dark:text-slate-300 space-y-1">
                  <Award className="w-6 h-6 text-slate-400 mx-auto" />
                  <span className="font-bold block">Advanced</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 block">Locked</span>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-blue-900/60 bg-white dark:bg-[#040E1F] text-slate-700 dark:text-slate-300 space-y-1">
                  <Award className="w-6 h-6 text-slate-400 mx-auto" />
                  <span className="font-bold block">Implementation</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 block">Tier Requirement</span>
                </div>
              </div>

              {/* Course Catalog */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Available Curriculum Tracks</h4>
                {ACADEMY_COURSES.map((course) => {
                  const isDone = completedCourses.has(course.id);
                  return (
                    <div
                      key={course.id}
                      className="p-4 rounded-xl border border-slate-200 dark:border-blue-900/60 bg-white dark:bg-[#0A1A30] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 dark:text-white text-sm">{course.title}</span>
                          <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-blue-950/60 px-2 py-0.5 rounded">
                            {course.level}
                          </span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs">{course.description}</p>
                        <div className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-3 pt-1">
                          <span>Track: {course.category}</span>
                          <span>·</span>
                          <span>Duration: {course.duration} ({course.modulesCount} Modules)</span>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleCourseCompletion(course.id)}
                        className={`px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer shrink-0 transition-colors ${
                          isDone
                            ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800/80'
                            : 'bg-blue-700 text-white hover:bg-blue-800'
                        }`}
                      >
                        {isDone ? '✓ Certified (Passed)' : 'Launch Modules'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 7: MARKETING & ASSET PACK */}
          {activeTab === 'marketing' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-blue-900/60">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Brand Collateral & Sales Kit</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Official logos, pitch decks, and enterprise comparison matrices.</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-xs">
                <div className="p-5 rounded-2xl border border-slate-200 dark:border-blue-900/60 bg-slate-50 dark:bg-[#040E1F] space-y-3">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">NextSoftHR Official Brand Pack</h4>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Includes vector SVGs, PNG lockups in Blue and Lemon Green, Authorized Partner badges, and font guidelines.
                  </p>
                  <button
                    onClick={() => alert('Brand Asset Pack downloaded.')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg cursor-pointer"
                  >
                    <FolderDown className="w-3.5 h-3.5" />
                    <span>Download Logos (SVG/PNG)</span>
                  </button>
                </div>

                <div className="p-5 rounded-2xl border border-slate-200 dark:border-blue-900/60 bg-slate-50 dark:bg-[#040E1F] space-y-3">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Customer Presentation Deck</h4>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Customizable 24-slide PowerPoint and Keynote template showcasing NextSoftHR features, ROI calculators, and client proof.
                  </p>
                  <button
                    onClick={() => alert('Customer Presentation Deck downloaded.')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg cursor-pointer"
                  >
                    <FolderDown className="w-3.5 h-3.5" />
                    <span>Download Slide Deck (.PPTX)</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: SUPPORT TICKETS */}
          {activeTab === 'support' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-blue-900/60">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Priority Partner Helpdesk</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Gold Tier SLA: 4-hour expedited technical & deal escalation response.</p>
                </div>
              </div>

              {ticketSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-xs text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Support ticket submitted! Ticket reference #TK-9821 dispatched to partner desk.</span>
                </div>
              )}

              <form onSubmit={handleTicketSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Subject / Issue Summary:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Assistance with custom biometric API webhook configuration"
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0A1A30] border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-600 dark:focus:border-blue-400"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Detailed Inquiry:</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide customer tenant details, technical logs, or deal desk query..."
                    value={ticketMessage}
                    onChange={(e) => setTicketMessage(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0A1A30] border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-600 dark:focus:border-blue-400"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg cursor-pointer"
                >
                  Submit Priority Ticket
                </button>
              </form>
            </div>
          )}

          {/* TAB 9: PARTNER PROFILE & LEGAL */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-blue-900/60">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Partner Profile & Legal Schedules</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Corporate legal standing, execution certificate, and schedule parameters.</p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#040E1F] border border-slate-200 dark:border-blue-900/60 space-y-4 text-xs font-mono">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-slate-400 dark:text-slate-500 block text-[11px]">Legal Entity:</span>
                    <span className="text-slate-900 dark:text-white font-bold">{companyName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 dark:text-slate-500 block text-[11px]">Primary Contact:</span>
                    <span className="text-slate-900 dark:text-white">{partnerName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 dark:text-slate-500 block text-[11px]">Assigned Partner Category:</span>
                    <span className="text-slate-900 dark:text-white uppercase font-bold">{partnerCategory}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 dark:text-slate-500 block text-[11px]">Agreement Version:</span>
                    <span className="text-slate-900 dark:text-white">v1.0 (Clauses 1–81 Active)</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-blue-900/60 flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Execution Hash: {acceptanceRecord?.auditHash || 'SHA256:VERIFIED_MEMBER_KEY'}</span>
                  <button
                    onClick={onOpenAcceptance}
                    className="text-blue-700 dark:text-blue-400 font-bold hover:underline cursor-pointer"
                  >
                    View Official Certificate →
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
