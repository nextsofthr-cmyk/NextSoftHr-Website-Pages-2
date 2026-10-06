import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  DollarSign, 
  TrendingUp, 
  FileText, 
  Award, 
  Headphones, 
  Bell, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Briefcase,
  Layers,
  Sparkles,
  ArrowUpRight,
  Download,
  Copy,
  Check,
  Image as ImageIcon
} from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';
import { PartnerBadge } from './PartnerBadge';
import { 
  PartnerBadgeOptions, 
  downloadPartnerBadgeSvg, 
  downloadPartnerBadgePng,
  generatePartnerBadgeEmbedCode 
} from '../utils/badgeGenerator';

interface PartnerPortalPreviewProps {
  onAccessPortal: () => void;
  onOpenBadgeModal?: (options?: PartnerBadgeOptions) => void;
}

export const PartnerPortalPreview: React.FC<PartnerPortalPreviewProps> = ({ 
  onAccessPortal,
  onOpenBadgeModal 
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'pipeline' | 'payouts' | 'resources' | 'badges'>('overview');
  const [copiedEmbed, setCopiedEmbed] = useState<boolean>(false);
  const [isDownloadingPng, setIsDownloadingPng] = useState<boolean>(false);

  const { strings } = useLanguage();
  const p = strings.portal;

  const portalPartnerBadge: PartnerBadgeOptions = {
    partnerName: 'Pan-African HR Advisory Ltd',
    tier: 'platinum',
    partnerId: 'NX-PTR-8832',
    year: 2026,
    specialization: 'Enterprise Cloud HR & Payroll',
    region: 'Lagos & Nairobi • West Africa',
    styleVariant: 'crest'
  };

  const handleCopyEmbed = (badge: PartnerBadgeOptions) => {
    const code = generatePartnerBadgeEmbedCode(badge);
    navigator.clipboard.writeText(code);
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 2500);
  };

  return (
    <section id="portal" className="py-24 bg-slate-50 dark:bg-[#040E1F] border-t border-slate-200 dark:border-blue-900/60 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/80 border border-blue-200 dark:border-blue-700/60 text-xs font-bold text-blue-800 dark:text-[#B8F010] mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>{p.tag}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            {p.title}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            {p.subtitle}
          </p>
        </div>

        {/* Dashboard Frame Mockup */}
        <div className="rounded-3xl bg-white dark:bg-[#030914] border-2 border-slate-200 dark:border-blue-700/70 shadow-xl dark:shadow-2xl overflow-hidden transition-colors duration-300">
          
          {/* Top Window Bar */}
          <div className="bg-slate-100 dark:bg-[#071D3E] px-6 py-4 border-b border-slate-200 dark:border-blue-800 flex flex-wrap items-center justify-between gap-4 transition-colors">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-blue-500/80" />
                <span className="w-3 h-3 rounded-full bg-[#B8F010]" />
                <span className="w-3 h-3 rounded-full bg-blue-400/80" />
              </div>
              <span className="text-xs font-bold text-slate-900 dark:text-white tracking-wider flex items-center gap-1.5 ml-2">
                <span className="text-blue-600 dark:text-[#B8F010]">NextSofthr</span> Partner Hub • app.nextsofthr.org/partners
              </span>
            </div>

            {/* Portal Action Buttons */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white dark:bg-blue-950 border border-slate-300 dark:border-blue-800 text-[11px] text-slate-700 dark:text-blue-200 shadow-sm">
                <Bell className="w-3 h-3 text-blue-600 dark:text-[#B8F010]" />
                <span>2 New Payouts Processed</span>
              </div>

              <button
                id="portal-demo-trigger-btn"
                onClick={onAccessPortal}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#B8F010] text-[#040E1F] text-xs font-bold hover:bg-[#CBFF1A] transition-all shadow"
              >
                <span>Access Partner Portal</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Interactive Navigation Tabs inside Mockup */}
          <div className="bg-slate-50 dark:bg-[#051329] px-6 py-2.5 border-b border-slate-200 dark:border-blue-900/60 flex items-center gap-4 overflow-x-auto transition-colors">
            <button
              onClick={() => setActiveTab('overview')}
              className={`text-xs font-bold py-1.5 px-3 rounded-md transition-all ${
                activeTab === 'overview'
                  ? 'bg-blue-600 text-white dark:bg-blue-800 dark:text-white border border-blue-600 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Executive Overview
            </button>
            <button
              onClick={() => setActiveTab('pipeline')}
              className={`text-xs font-bold py-1.5 px-3 rounded-md transition-all ${
                activeTab === 'pipeline'
                  ? 'bg-blue-600 text-white dark:bg-blue-800 dark:text-white border border-blue-600 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Sales Pipeline & Referrals (18)
            </button>
            <button
              onClick={() => setActiveTab('payouts')}
              className={`text-xs font-bold py-1.5 px-3 rounded-md transition-all ${
                activeTab === 'payouts'
                  ? 'bg-blue-600 text-white dark:bg-blue-800 dark:text-white border border-blue-600 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Commission History
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`text-xs font-bold py-1.5 px-3 rounded-md transition-all ${
                activeTab === 'resources'
                  ? 'bg-blue-600 text-white dark:bg-blue-800 dark:text-white border border-blue-600 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Marketing & Support
            </button>
            <button
              onClick={() => setActiveTab('badges')}
              className={`text-xs font-bold py-1.5 px-3 rounded-md transition-all flex items-center gap-1.5 ${
                activeTab === 'badges'
                  ? 'bg-[#B8F010] text-[#040E1F] font-black shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Official Badges & SVG Studio</span>
            </button>
          </div>

          {/* Main Portal Viewport */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Top Partner Profile Bar */}
            <div className="rounded-2xl bg-gradient-to-r from-blue-50 via-slate-50 to-blue-50 dark:from-[#071D3E] dark:via-[#0B254A] dark:to-[#071D3E] p-5 border border-slate-200 dark:border-blue-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-colors">
              <div className="flex items-center gap-4">
                {/* Dynamic SVG Certification Badge Miniature */}
                <div 
                  onClick={() => onOpenBadgeModal && onOpenBadgeModal(portalPartnerBadge)}
                  className="relative group cursor-pointer shrink-0"
                  title="Click to view and download full-resolution SVG Partner Certification Badge"
                >
                  <PartnerBadge 
                    options={portalPartnerBadge} 
                    size="sm" 
                    showControls={false}
                    className="filter drop-shadow-md group-hover:scale-105 transition-transform" 
                  />
                  <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded bg-[#B8F010] text-[#040E1F] text-[8px] font-black shadow">
                    SVG
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">Pan-African HR Advisory Ltd</h4>
                    <span className="px-2 py-0.5 rounded text-[10px] font-black bg-[#B8F010] text-[#040E1F]">
                      PLATINUM PARTNER
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-blue-200">
                    Partner ID: <span className="font-mono text-slate-900 dark:text-white">NX-PTR-8832</span> • Lagos & Nairobi • Active Since Jan 2025
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-stretch md:self-auto justify-end flex-wrap">
                <button
                  onClick={() => onOpenBadgeModal && onOpenBadgeModal(portalPartnerBadge)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/90 border border-blue-200 dark:border-[#B8F010]/40 text-blue-900 dark:text-[#B8F010] text-xs font-bold hover:bg-blue-100 dark:hover:bg-blue-800 transition-all shadow-xs"
                >
                  <Award className="w-3.5 h-3.5 text-[#B8F010]" />
                  <span>Download SVG Badge</span>
                </button>

                <div className="px-3.5 py-1.5 rounded-lg bg-white dark:bg-blue-950 border border-slate-200 dark:border-blue-800 text-right shadow-sm">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">Commission Rate</span>
                  <span className="text-sm font-black text-blue-700 dark:text-[#B8F010]">40% Recurring</span>
                </div>
                <div className="px-3.5 py-1.5 rounded-lg bg-white dark:bg-blue-950 border border-slate-200 dark:border-blue-800 text-right shadow-sm">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">Account Status</span>
                  <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">Verified & Active</span>
                </div>
              </div>
            </div>

            {/* TAB 1: EXECUTIVE OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                {/* 6 High-Impact Metric Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#071D3E] border border-slate-200 dark:border-blue-800/80 shadow-sm">
                    <span className="text-[11px] text-slate-500 dark:text-blue-300 block mb-1">Total Customers</span>
                    <span className="text-2xl font-black text-slate-900 dark:text-white">46</span>
                    <span className="text-[10px] text-blue-600 dark:text-[#B8F010] block mt-1 font-semibold">+4 this month</span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#071D3E] border border-slate-200 dark:border-blue-800/80 shadow-sm">
                    <span className="text-[11px] text-slate-500 dark:text-blue-300 block mb-1">Active Subscriptions</span>
                    <span className="text-2xl font-black text-slate-900 dark:text-white">44</span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block mt-1 font-semibold">95.6% Retention</span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#071D3E] border border-slate-200 dark:border-blue-800/80 shadow-sm">
                    <span className="text-[11px] text-slate-500 dark:text-blue-300 block mb-1">Monthly Recurring</span>
                    <span className="text-2xl font-black text-blue-700 dark:text-[#B8F010] font-mono">₦6.84M</span>
                    <span className="text-[10px] text-slate-500 dark:text-blue-200 block mt-1">Client Gross MRR</span>
                  </div>

                  <div className="p-4 rounded-xl bg-blue-50/80 dark:bg-[#071D3E] border border-blue-300 dark:border-[#B8F010]/50 shadow-sm">
                    <span className="text-[11px] text-blue-800 dark:text-[#B8F010] block mb-1 font-bold">Commission Earned</span>
                    <span className="text-2xl font-black text-blue-800 dark:text-[#B8F010] font-mono">₦2.73M</span>
                    <span className="text-[10px] text-slate-600 dark:text-slate-300 block mt-1 font-medium">Current 30 days (40%)</span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#071D3E] border border-slate-200 dark:border-blue-800/80 shadow-sm">
                    <span className="text-[11px] text-slate-500 dark:text-blue-300 block mb-1">Pending Payout</span>
                    <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">₦840,000</span>
                    <span className="text-[10px] text-amber-600 dark:text-amber-300 block mt-1 font-semibold">Due next cycle</span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#071D3E] border border-slate-200 dark:border-blue-800/80 shadow-sm">
                    <span className="text-[11px] text-slate-500 dark:text-blue-300 block mb-1">Lead Conversion</span>
                    <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">38.2%</span>
                    <span className="text-[10px] text-blue-600 dark:text-[#B8F010] block mt-1 font-semibold">Top 5% Partner</span>
                  </div>
                </div>

                {/* Sub-grid: Pipeline summary & Announcements */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Pipeline Quick Table */}
                  <div className="lg:col-span-8 rounded-2xl bg-slate-50 dark:bg-[#071D3E] border border-slate-200 dark:border-blue-800/80 p-5 shadow-sm">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-blue-900">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-blue-600 dark:text-[#B8F010]" />
                        <h5 className="text-sm font-bold text-slate-900 dark:text-white">Recent Customer Referrals & Status</h5>
                      </div>
                      <span className="text-xs text-slate-500 dark:text-blue-300">Updated 10m ago</span>
                    </div>

                    <div className="space-y-2.5">
                      {[
                        { client: 'Sahara Logistics Plc', staff: 185, stage: 'Live Subscription', mrr: '₦222,000', comm: '₦88,800/mo', status: 'Paying' },
                        { client: 'Apex Fintech West Africa', staff: 94, stage: 'Contract Signed', mrr: '₦112,800', comm: '₦45,120/mo', status: 'Onboarding' },
                        { client: 'Horizon Retail Superstores', staff: 320, stage: 'Product Demo Completed', mrr: '₦384,000', comm: '₦153,600/mo', status: 'In Evaluation' },
                        { client: 'Kilimanjaro Health Group', staff: 140, stage: 'Live Subscription', mrr: '₦168,000', comm: '₦67,200/mo', status: 'Paying' },
                      ].map((lead, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-white dark:bg-blue-950/60 border border-slate-200 dark:border-blue-900 flex items-center justify-between text-xs shadow-xs">
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white block">{lead.client}</span>
                            <span className="text-[10px] text-slate-500 dark:text-slate-400">{lead.staff} Employees • {lead.stage}</span>
                          </div>
                          <div className="text-right">
                            <span className="font-mono font-bold text-blue-700 dark:text-[#B8F010] block">{lead.comm}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-semibold">{lead.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Partner Announcements & Support Desk */}
                  <div className="lg:col-span-4 rounded-2xl bg-slate-50 dark:bg-[#071D3E] border border-slate-200 dark:border-blue-800/80 p-5 flex flex-col justify-between shadow-sm">
                    <div>
                      <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-200 dark:border-blue-900">
                        <Sparkles className="w-4 h-4 text-blue-600 dark:text-[#B8F010]" />
                        <h5 className="text-sm font-bold text-slate-900 dark:text-white">Partner Announcements</h5>
                      </div>

                      <div className="space-y-3 text-xs">
                        <div className="p-2.5 rounded-lg bg-white dark:bg-blue-950 border border-slate-200 dark:border-blue-900 shadow-xs">
                          <span className="text-[10px] font-bold text-blue-700 dark:text-[#B8F010] block mb-0.5">NEW RELEASE</span>
                          <p className="text-slate-700 dark:text-slate-200">AI Payroll Assistant v2.4 launched with Nigerian & Kenyan statutory automatic auto-tax reconciliations.</p>
                        </div>
                        <div className="p-2.5 rounded-lg bg-white dark:bg-blue-950 border border-slate-200 dark:border-blue-900 shadow-xs">
                          <span className="text-[10px] font-bold text-blue-700 dark:text-blue-300 block mb-0.5">Q2 INCENTIVE</span>
                          <p className="text-slate-700 dark:text-slate-200">Top 3 partners acquiring over 10 enterprise deals receive $5,000 co-marketing grants.</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200 dark:border-blue-900 mt-4 flex items-center justify-between">
                      <span className="text-xs text-slate-500 dark:text-slate-400">Dedicated Support Desk</span>
                      <span className="text-xs font-bold text-blue-700 dark:text-[#B8F010] flex items-center gap-1 cursor-pointer">
                        Priority Queue &rarr;
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* TAB 2: PIPELINE */}
            {activeTab === 'pipeline' && (
              <div className="p-6 bg-slate-50 dark:bg-[#071D3E] rounded-2xl border border-slate-200 dark:border-blue-800 animate-in fade-in duration-200">
                <h5 className="text-base font-bold text-slate-900 dark:text-white mb-2">Deal Pipeline & Referral Engine</h5>
                <p className="text-xs text-slate-600 dark:text-slate-300 mb-6">
                  Generate unique trackable invitation links or submit direct corporate introductions to our partner desk.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-white dark:bg-blue-950 border border-slate-200 dark:border-blue-900 shadow-xs">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">Active Deals in Evaluation</span>
                    <span className="text-xl font-bold text-slate-900 dark:text-white">7 Prospects (920 Employees)</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white dark:bg-blue-950 border border-slate-200 dark:border-blue-900 shadow-xs">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">Trial Approvals</span>
                    <span className="text-xl font-bold text-slate-900 dark:text-white">3 Organizations</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white dark:bg-blue-950 border border-slate-200 dark:border-blue-900 shadow-xs">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">Projected Added Commission</span>
                    <span className="text-xl font-bold text-blue-700 dark:text-[#B8F010]">₦440,000 / month</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-blue-950 border border-slate-200 dark:border-blue-800">
                  <span className="text-xs text-slate-700 dark:text-slate-300">Your Unique Tracking Link: <code className="text-blue-700 dark:text-[#B8F010] font-mono">nextsofthr.org/signup?ref=pan-african-hr</code></span>
                  <button className="text-xs font-bold text-white bg-blue-600 dark:bg-blue-900 dark:text-[#B8F010] px-3 py-1 rounded">Copy Link</button>
                </div>
              </div>
            )}

            {/* TAB 3: PAYOUTS */}
            {activeTab === 'payouts' && (
              <div className="p-6 bg-slate-50 dark:bg-[#071D3E] rounded-2xl border border-slate-200 dark:border-blue-800 animate-in fade-in duration-200">
                <h5 className="text-base font-bold text-slate-900 dark:text-white mb-2">Commission Ledger & Payout Records</h5>
                <p className="text-xs text-slate-600 dark:text-slate-300 mb-6">
                  Full audit transparency with downloadable monthly remittals and tax certificates.
                </p>

                <div className="space-y-2 text-xs">
                  <div className="grid grid-cols-5 p-3 rounded-lg bg-slate-200 dark:bg-blue-950 text-slate-700 dark:text-slate-400 font-bold">
                    <span>Month</span>
                    <span>Referred MRR</span>
                    <span>Tier Share</span>
                    <span>Payout Amount</span>
                    <span>Status</span>
                  </div>
                  {[
                    { month: 'March 2026', mrr: '₦6,840,000', tier: '40% (Platinum)', amt: '₦2,736,000', status: 'Disbursed (Direct Bank)' },
                    { month: 'February 2026', mrr: '₦6,200,000', tier: '40% (Platinum)', amt: '₦2,480,000', status: 'Disbursed' },
                    { month: 'January 2026', mrr: '₦5,400,000', tier: '40% (Platinum)', amt: '₦2,160,000', status: 'Disbursed' },
                    { month: 'December 2025', mrr: '₦4,800,000', tier: '30% (Gold)', amt: '₦1,440,000', status: 'Disbursed' },
                  ].map((row, i) => (
                    <div key={i} className="grid grid-cols-5 p-3 rounded-lg bg-white dark:bg-blue-950/60 border border-slate-200 dark:border-blue-900 text-slate-900 dark:text-white items-center">
                      <span className="font-semibold">{row.month}</span>
                      <span className="text-slate-600 dark:text-slate-300 font-mono">{row.mrr}</span>
                      <span className="text-blue-700 dark:text-[#B8F010] font-bold">{row.tier}</span>
                      <span className="font-mono font-bold text-slate-900 dark:text-white">{row.amt}</span>
                      <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> {row.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: RESOURCES */}
            {activeTab === 'resources' && (
              <div className="p-6 bg-slate-50 dark:bg-[#071D3E] rounded-2xl border border-slate-200 dark:border-blue-800 animate-in fade-in duration-200">
                <h5 className="text-base font-bold text-slate-900 dark:text-white mb-2">Partner Enablement & Support Tickets</h5>
                <p className="text-xs text-slate-600 dark:text-slate-300 mb-6">
                  Download certified materials or connect with our Partner Solutions Architect.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white dark:bg-blue-950 border border-slate-200 dark:border-blue-900 shadow-xs">
                    <span className="text-xs font-bold text-slate-900 dark:text-white block mb-1">Open a Joint Demo Request</span>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">Request a NextSofthr solutions engineer to co-host your client demonstration.</p>
                    <button className="text-xs font-bold text-blue-700 dark:text-[#B8F010] px-3 py-1.5 rounded bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-800">Book Joint Demo</button>
                  </div>
                  <div className="p-4 rounded-xl bg-white dark:bg-blue-950 border border-slate-200 dark:border-blue-900 shadow-xs">
                    <span className="text-xs font-bold text-slate-900 dark:text-white block mb-1">Co-Branded Sales Assets</span>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">Generate proposals featuring your company logo alongside NextSofthr certification.</p>
                    <button className="text-xs font-bold text-blue-700 dark:text-[#B8F010] px-3 py-1.5 rounded bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-800">Open Asset Studio</button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: CERTIFICATION BADGES & SVG ASSETS */}
            {activeTab === 'badges' && (
              <div className="p-6 bg-slate-50 dark:bg-[#071D3E] rounded-2xl border border-slate-200 dark:border-blue-800 animate-in fade-in duration-200 space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-blue-900">
                  <div>
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-blue-600 dark:text-[#B8F010]" />
                      <h5 className="text-base font-bold text-slate-900 dark:text-white">
                        Official Partner Certification Badges (Dynamic Vector SVG)
                      </h5>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                      Lossless scalable vector assets and high-res PNGs verified for <span className="font-bold text-blue-700 dark:text-[#B8F010]">{portalPartnerBadge.partnerName}</span>
                    </p>
                  </div>

                  <button
                    onClick={() => onOpenBadgeModal && onOpenBadgeModal(portalPartnerBadge)}
                    className="px-4 py-2 rounded-xl bg-[#B8F010] text-[#040E1F] text-xs font-black hover:bg-[#CBFF1A] transition-all flex items-center gap-2 shadow"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Launch Badge Studio</span>
                  </button>
                </div>

                {/* 4 Dynamic SVG Badge Architecture Showcase Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { style: 'crest' as const, label: 'Official Crest Seal', desc: 'Prestige circular medallion' },
                    { style: 'shield' as const, label: 'Heraldic Cyber Shield', desc: 'Enterprise trust emblem' },
                    { style: 'hex' as const, label: 'Tech Cloud Hexagon', desc: 'AI & cloud node aesthetic' },
                    { style: 'compact' as const, label: 'Signature Banner', desc: 'Email footer & proposals' },
                  ].map((item, idx) => {
                    const badgeConfig: PartnerBadgeOptions = {
                      ...portalPartnerBadge,
                      styleVariant: item.style
                    };

                    return (
                      <div 
                        key={idx}
                        className="rounded-2xl bg-white dark:bg-[#030914] border border-slate-200 dark:border-blue-900/80 p-4 flex flex-col justify-between items-center text-center shadow-xs hover:border-blue-500 dark:hover:border-[#B8F010] transition-all group"
                      >
                        <div className="w-full mb-3">
                          <span className="text-xs font-bold text-slate-900 dark:text-white block">{item.label}</span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400">{item.desc}</span>
                        </div>

                        {/* Interactive Dynamic SVG Badge */}
                        <div className="py-2 w-full flex items-center justify-center">
                          <PartnerBadge
                            options={badgeConfig}
                            size="md"
                            showControls={false}
                            onOpenModal={() => onOpenBadgeModal && onOpenBadgeModal(badgeConfig)}
                            className="cursor-pointer"
                          />
                        </div>

                        {/* Direct Download Action Strip */}
                        <div className="w-full pt-3 mt-3 border-t border-slate-100 dark:border-blue-900/60 flex items-center justify-center gap-2">
                          <button
                            onClick={() => downloadPartnerBadgeSvg(badgeConfig)}
                            className="px-2.5 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/80 hover:bg-blue-100 dark:hover:bg-blue-800 text-blue-700 dark:text-[#B8F010] text-[11px] font-bold flex items-center gap-1 transition-colors"
                            title="Download SVG vector file"
                          >
                            <Download className="w-3 h-3" />
                            <span>SVG</span>
                          </button>

                          <button
                            onClick={() => downloadPartnerBadgePng(badgeConfig, undefined, 2)}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-blue-950 hover:bg-slate-200 dark:hover:bg-blue-900 text-slate-700 dark:text-slate-200 text-[11px] font-bold flex items-center gap-1 transition-colors"
                            title="Download High-Res 2x PNG"
                          >
                            <ImageIcon className="w-3 h-3" />
                            <span>PNG</span>
                          </button>

                          <button
                            onClick={() => handleCopyEmbed(badgeConfig)}
                            className="p-1.5 rounded-lg bg-slate-100 dark:bg-blue-950 hover:bg-slate-200 dark:hover:bg-blue-900 text-slate-700 dark:text-slate-200 transition-colors"
                            title="Copy embed HTML snippet"
                          >
                            {copiedEmbed ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Footer Security Verification Note */}
                <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-[#B8F010] shrink-0" />
                    <span>All dynamic badges include cryptographic validation hashes linked to your active partner ID.</span>
                  </div>
                  <button
                    onClick={() => onOpenBadgeModal && onOpenBadgeModal(portalPartnerBadge)}
                    className="font-bold text-blue-700 dark:text-[#B8F010] hover:underline shrink-0"
                  >
                    View Official Certificate &rarr;
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Bottom Card Footer with Portal Access CTA */}
          <div className="bg-slate-100 dark:bg-[#071D3E] px-6 py-4 border-t border-slate-200 dark:border-blue-800 flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors">
            <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-blue-200">
              <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-[#B8F010]" />
              <span>Full Role-Based Access Control (RBAC) & Multi-Admin Security</span>
            </div>

            <button
              onClick={onAccessPortal}
              className="px-6 py-2.5 rounded-xl bg-[#B8F010] text-[#040E1F] text-xs font-extrabold hover:bg-[#CBFF1A] transition-all flex items-center gap-2 shadow"
            >
              <span>Access Partner Portal</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
