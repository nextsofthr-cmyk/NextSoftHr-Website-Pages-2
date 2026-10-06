import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Building, 
  CheckCircle2, 
  Award, 
  TrendingUp, 
  Users, 
  Mail, 
  FileText, 
  Clock, 
  Sparkles,
  ShieldCheck,
  Send,
  Coins
} from 'lucide-react';
import { PartnerApplication, PartnerEnquiry } from '../types';
import { useCurrency } from '../context/CurrencyContext';

interface PartnerPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  applications: PartnerApplication[];
  enquiries: PartnerEnquiry[];
}

export const PartnerPortalModal: React.FC<PartnerPortalModalProps> = ({
  isOpen,
  onClose,
  applications,
  enquiries
}) => {
  if (!isOpen) return null;

  const { formatCurrency, currentCurrency } = useCurrency();
  const [activeTab, setActiveTab] = useState<'login' | 'applications' | 'leads'>('login');
  const [email, setEmail] = useState('');
  const [partnerKey, setPartnerKey] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setActiveTab('leads');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#061124] w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden relative animate-fadeIn transition-colors">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="bg-[#071938] text-white p-6 border-b border-blue-900">
          <div className="flex items-center gap-2 text-[#c8f526] text-xs font-bold uppercase tracking-wider mb-1">
            <Lock className="w-3.5 h-3.5" />
            <span>NextSofthr Partner Workspace</span>
          </div>
          <h3 className="text-xl font-black text-white">
            Partner Portal & Registry Console
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Manage your certified profile, access client leads routed from the public registry, and track enablement milestones.
          </p>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-blue-900/60 text-xs">
            <button
              onClick={() => setActiveTab('login')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                activeTab === 'login'
                  ? 'bg-[#c8f526] text-[#071938]'
                  : 'text-slate-300 hover:text-white bg-blue-900/40'
              }`}
            >
              {isLoggedIn ? 'Partner Account' : 'Partner Sign In'}
            </button>
            <button
              onClick={() => setActiveTab('leads')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                activeTab === 'leads'
                  ? 'bg-[#c8f526] text-[#071938]'
                  : 'text-slate-300 hover:text-white bg-blue-900/40'
              }`}
            >
              Registry Inquiries & Leads ({enquiries.length})
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                activeTab === 'applications'
                  ? 'bg-[#c8f526] text-[#071938]'
                  : 'text-slate-300 hover:text-white bg-blue-900/40'
              }`}
            >
              Partner Applications Queue ({applications.length})
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          
          {/* TAB 1: LOGIN / ACCOUNT */}
          {activeTab === 'login' && (
            <div>
              {!isLoggedIn ? (
                <form onSubmit={handleLogin} className="max-w-md mx-auto space-y-4 py-4">
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-[#c8f526] flex items-center justify-center mx-auto mb-2 font-black text-lg">
                      NS
                    </div>
                    <h4 className="text-base font-bold text-[#0c2b64] dark:text-white">Sign in to Partner Hub</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Access your practice dashboard and client inquiries</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Partner Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="partner@yourfirm.com"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0a1c3b] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-blue-700 dark:focus:border-[#c8f526]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Partner Access Code / Password</label>
                    <input
                      type="password"
                      required
                      value={partnerKey}
                      onChange={(e) => setPartnerKey(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0a1c3b] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-blue-700 dark:focus:border-[#c8f526]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#0c2b64] dark:bg-blue-600 text-white font-bold text-xs hover:bg-blue-800 dark:hover:bg-blue-700 transition-colors shadow-sm"
                  >
                    Enter Partner Portal
                  </button>

                  <p className="text-[11px] text-slate-400 text-center">
                    Demo Mode: enter any email & password to test the portal workspace.
                  </p>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                        ✓
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-emerald-950 dark:text-emerald-300">Active Certified Partner Session</h4>
                        <p className="text-xs text-emerald-800 dark:text-emerald-400">Verified status: <strong>Strategic Partner (Tier 05)</strong></p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsLoggedIn(false)}
                      className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400"
                    >
                      Sign Out
                    </button>
                  </div>

                  <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-[#0c234b]/60 border border-blue-200 dark:border-blue-900/60 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-blue-950 dark:text-blue-200 font-medium">
                      <Coins className="w-4 h-4 text-blue-700 dark:text-[#c8f526]" />
                      <span>Practice Revenue Currency: <strong>{currentCurrency.name} ({currentCurrency.code})</strong></span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      1 USD = {currentCurrency.rateAgainstUSD} {currentCurrency.code}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0a1c3b] border border-slate-200 dark:border-slate-800">
                      <div className="text-base sm:text-lg font-black font-mono text-[#0c2b64] dark:text-[#c8f526]">
                        {formatCurrency(248000, { compact: true })}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">Total Closed ARR</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0a1c3b] border border-slate-200 dark:border-slate-800">
                      <div className="text-base sm:text-lg font-black font-mono text-blue-700 dark:text-blue-300">
                        {formatCurrency(94500, { compact: true })}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">Active Pipeline</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0a1c3b] border border-slate-200 dark:border-slate-800">
                      <div className="text-base sm:text-lg font-black font-mono text-emerald-600 dark:text-emerald-400">
                        {formatCurrency(99200, { compact: true })}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">Accrued 40% Margin</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0a1c3b] border border-slate-200 dark:border-slate-800">
                      <div className="text-base sm:text-lg font-black font-mono text-[#0c2b64] dark:text-white">
                        {formatCurrency(18500, { compact: true })}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">Avg Deal Size</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0a1c3b] border border-slate-200 dark:border-slate-800">
                      <div className="text-lg font-black text-[#0c2b64] dark:text-[#c8f526]">18</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">Registry Views Today</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0a1c3b] border border-slate-200 dark:border-slate-800">
                      <div className="text-lg font-black text-[#0c2b64] dark:text-[#c8f526]">{enquiries.length}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">Total Leads Received</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0a1c3b] border border-slate-200 dark:border-slate-800">
                      <div className="text-lg font-black text-emerald-600 dark:text-emerald-400">Active</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">Co-Selling Status</div>
                    </div>
                  </div>

                  {/* Referral Program Hub Callout */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-blue-900/60 to-[#0c2b64] border border-[#c8f526]/40 text-white flex items-center justify-between gap-4 shadow-sm">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-[#c8f526] uppercase tracking-wider">Referral Rewards Program</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#c8f526] text-[#071938] font-bold">2,150 pts</span>
                      </div>
                      <p className="text-xs text-blue-100 mt-1">
                        Earn up to $1,000 USD (1,000 pts) per referred client deal. Points redeemable for bank wire transfers or exam vouchers.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        const el = document.getElementById('referrals');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-3.5 py-2 rounded-lg bg-[#c8f526] hover:bg-[#b5e01b] text-[#071938] font-bold text-xs shrink-0 cursor-pointer shadow-sm transition-all"
                    >
                      Open Rewards Dashboard
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: LEADS & INQUIRIES */}
          {activeTab === 'leads' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#0c2b64] dark:text-white">Client Enquiries from Directory</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Organizations who requested consultation directly via your card</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-900 dark:text-[#c8f526]">
                  {enquiries.length} Active Leads
                </span>
              </div>

              {enquiries.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-xs">
                  No enquiries received yet. When users submit the "Contact Partner" form on any partner card, they will appear here in real time.
                </div>
              ) : (
                <div className="space-y-3">
                  {enquiries.map((enq) => (
                    <div key={enq.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0a1c3b] space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold text-[#0c2b64] dark:text-white">{enq.fullName}</span>
                          <span className="text-xs text-slate-500 dark:text-slate-400"> ({enq.company})</span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-900 dark:text-[#c8f526] font-semibold">
                          Target Partner: {enq.partnerName}
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-300 space-y-0.5">
                        <p><strong>Email:</strong> {enq.email} | <strong>Phone:</strong> {enq.phone}</p>
                        <p><strong>Country:</strong> {enq.country} | <strong>Business Size:</strong> {enq.businessSize}</p>
                        <p><strong>Service:</strong> {enq.serviceNeeded}</p>
                        <p className="mt-1 italic bg-white dark:bg-[#061227] p-2 rounded border border-slate-200 dark:border-slate-700">"{enq.message}"</p>
                      </div>
                      <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 dark:border-slate-800 text-[11px]">
                        <span className="text-slate-500">Estimated Project Scope:</span>
                        <span className="font-mono font-bold text-emerald-700 dark:text-[#c8f526]">
                          {formatCurrency(12500)} ({currentCurrency.code})
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: APPLICATIONS */}
          {activeTab === 'applications' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#0c2b64] dark:text-white">Incoming Partner Applications</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Firms that have applied via the "Become a Partner" form</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#c8f526] text-[#071938]">
                  {applications.length} Submitted
                </span>
              </div>

              {applications.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-xs">
                  No partner applications submitted during this session.
                </div>
              ) : (
                <div className="space-y-3">
                  {applications.map((app) => (
                    <div key={app.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0a1c3b] space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm font-bold text-[#0c2b64] dark:text-white">{app.companyName}</span>
                          <span className="text-xs text-slate-500 dark:text-slate-400"> • {app.country}, {app.city}</span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 font-bold border border-transparent dark:border-amber-900/50">
                          {app.status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-300">
                        <p><strong>Contact:</strong> {app.contactPerson} ({app.email} / {app.phone})</p>
                        <p><strong>Type:</strong> {app.partnerType} • <strong>Size:</strong> {app.numberOfEmployees} employees</p>
                        <p><strong>Services:</strong> {app.servicesOffered.join(', ')}</p>
                        <p className="mt-1 italic bg-white dark:bg-[#061227] p-2 rounded border border-slate-200 dark:border-slate-700">"{app.motivation}"</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
