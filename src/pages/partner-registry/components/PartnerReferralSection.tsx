import React, { useState } from 'react';
import { 
  Gift, 
  Users, 
  Building2, 
  Award, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Copy, 
  Check, 
  Share2, 
  DollarSign, 
  Sparkles, 
  Coins, 
  TrendingUp, 
  BarChart3, 
  ChevronRight, 
  ExternalLink, 
  Filter, 
  HelpCircle, 
  Send, 
  ShieldCheck, 
  Banknote, 
  Server, 
  Crown, 
  Cpu, 
  Layers,
  Percent,
  X
} from 'lucide-react';
import { 
  PartnerReferral, 
  RewardRedemptionItem, 
  PartnerRewardAccount, 
  ReferralType, 
  ReferralStatus 
} from '../types';
import { 
  INITIAL_REWARD_ACCOUNT, 
  INITIAL_REFERRALS, 
  REWARD_REDEMPTION_ITEMS, 
  MONTHLY_POINTS_HISTORY 
} from '../data/referrals';
import { COUNTRIES_DATA } from '../data/countries';
import { useCurrency } from '../context/CurrencyContext';
import { useLanguage } from '../context/LanguageContext';

export const PartnerReferralSection: React.FC = () => {
  const { formatCurrency } = useCurrency();
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'submit' | 'store'>('dashboard');
  const [account, setAccount] = useState<PartnerRewardAccount>(INITIAL_REWARD_ACCOUNT);
  const [referrals, setReferrals] = useState<PartnerReferral[]>(INITIAL_REFERRALS);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedReward, setSelectedReward] = useState<RewardRedemptionItem | null>(null);
  const [redemptionSuccess, setRedemptionSuccess] = useState<string | null>(null);
  const [formSuccessMessage, setFormSuccessMessage] = useState<string | null>(null);

  // Referral submission form state
  const [candidateType, setCandidateType] = useState<ReferralType>('business_client');
  const [formData, setFormData] = useState({
    referringPartnerName: account.partnerName,
    candidateName: '',
    contactPerson: '',
    email: '',
    phone: '',
    country: 'Nigeria',
    city: 'Lagos',
    estimatedSeats: '100 - 250 Staff',
    notes: ''
  });

  const referralCode = `NST-${account.partnerId.toUpperCase().slice(0, 6)}-2026`;
  const referralUrl = `https://nextsofthr.org/partner-network?ref=${referralCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleReferralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.candidateName || !formData.email || !formData.contactPerson) return;

    const potential = candidateType === 'business_client' ? 700 : 500;
    const initialAward = 50; // 50 submission bonus points

    const newReferral: PartnerReferral = {
      id: `ref-${Date.now()}`,
      referringPartnerId: account.partnerId,
      referringPartnerName: formData.referringPartnerName,
      candidateName: formData.candidateName,
      candidateType,
      contactPerson: formData.contactPerson,
      email: formData.email,
      phone: formData.phone,
      country: formData.country,
      city: formData.city,
      estimatedSeats: formData.estimatedSeats,
      notes: formData.notes,
      status: 'submitted',
      pointsAwarded: initialAward,
      potentialPoints: potential,
      cashValueUSD: initialAward,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setReferrals(prev => [newReferral, ...prev]);

    // Update account points with immediate submission credit
    setAccount(prev => ({
      ...prev,
      totalPointsEarned: prev.totalPointsEarned + initialAward,
      availableBalance: prev.availableBalance + initialAward,
      referralCount: prev.referralCount + 1
    }));

    setFormSuccessMessage(`Referral for "${formData.candidateName}" has been successfully logged! We have credited 50 submission points to your balance.`);
    
    // Reset form
    setFormData({
      referringPartnerName: account.partnerName,
      candidateName: '',
      contactPerson: '',
      email: '',
      phone: '',
      country: 'Nigeria',
      city: 'Lagos',
      estimatedSeats: '100 - 250 Staff',
      notes: ''
    });

    setTimeout(() => {
      setFormSuccessMessage(null);
      setActiveTab('dashboard');
    }, 3500);
  };

  const handleClaimReward = (reward: RewardRedemptionItem) => {
    if (account.availableBalance < reward.pointsCost) return;

    setAccount(prev => ({
      ...prev,
      availableBalance: prev.availableBalance - reward.pointsCost,
      redeemedPoints: prev.redeemedPoints + reward.pointsCost
    }));

    setRedemptionSuccess(`Congratulations! You redeemed "${reward.title}" for ${reward.pointsCost} points. Redemption code: NST-RWD-${Math.floor(100000 + Math.random() * 900000)}.`);
    setSelectedReward(null);
  };

  const getStatusBadge = (status: ReferralStatus) => {
    switch (status) {
      case 'rewards_paid':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
            <span>Rewards Paid</span>
          </span>
        );
      case 'won_activated':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30">
            <Sparkles className="w-3 h-3 text-blue-500" />
            <span>Won & Subscribed</span>
          </span>
        );
      case 'demo_scheduled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
            <Clock className="w-3 h-3 text-amber-500" />
            <span>Demo Scheduled</span>
          </span>
        );
      case 'contacted':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30">
            <Send className="w-3 h-3 text-indigo-500" />
            <span>Contacted</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-500/15 text-slate-600 dark:text-slate-400 border border-slate-500/30">
            <Clock className="w-3 h-3 text-slate-400" />
            <span>In Review</span>
          </span>
        );
    }
  };

  const filteredReferrals = referrals.filter(ref => {
    if (filterStatus === 'all') return true;
    return ref.status === filterStatus;
  });

  const nextMilestonePoints = 5000;
  const progressPercent = Math.min(100, Math.round((account.totalPointsEarned / nextMilestonePoints) * 100));

  return (
    <section 
      id="referrals" 
      className="py-16 md:py-24 bg-slate-50 dark:bg-[#061124] transition-colors relative overflow-hidden border-b border-slate-200 dark:border-slate-800"
    >
      {/* Background Ambience */}
      <div className="absolute top-10 left-1/3 w-[500px] h-[500px] bg-blue-600/5 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#c8f526]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-[#0c2b64] dark:text-[#c8f526] text-xs font-bold uppercase tracking-wider mb-3">
            <Gift className="w-3.5 h-3.5 text-[#0c2b64] dark:text-[#c8f526]" />
            <span>Partner Referral & Rewards Program</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0c2b64] dark:text-white tracking-tight">
            Grow the Ecosystem & Earn Generous Rewards
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Existing NextSofthr partners earn <strong className="text-blue-900 dark:text-[#c8f526]">up to 1,000 points ($1,000 USD)</strong> plus lifetime recurring commission for every business or consulting practice referred and activated.
          </p>
        </div>

        {/* Global Navigation Tabs (Dashboard, Submit Referral, Rewards Store) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <button
            type="button"
            onClick={() => setActiveTab('dashboard')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shadow-xs ${
              activeTab === 'dashboard'
                ? 'bg-[#0c2b64] text-white ring-2 ring-blue-500/20 shadow-md'
                : 'bg-white dark:bg-[#0a1c3b] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-[#c8f526]" />
            <span>Rewards Dashboard</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('submit')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shadow-xs ${
              activeTab === 'submit'
                ? 'bg-[#c8f526] text-[#071938] font-black ring-2 ring-[#c8f526]/40 shadow-md'
                : 'bg-white dark:bg-[#0a1c3b] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Submit a Referral</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('store')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shadow-xs ${
              activeTab === 'store'
                ? 'bg-[#0c2b64] text-white ring-2 ring-blue-500/20 shadow-md'
                : 'bg-white dark:bg-[#0a1c3b] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
          >
            <Coins className="w-4 h-4 text-amber-400" />
            <span>Rewards Catalog</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-500/20 text-amber-600 dark:text-amber-400 font-extrabold">
              {account.availableBalance} pts
            </span>
          </button>
        </div>

        {/* Global Toast Success Announcement */}
        {redemptionSuccess && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 flex items-center justify-between text-xs sm:text-sm shadow-md animate-fade-in">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              <span>{redemptionSuccess}</span>
            </div>
            <button
              onClick={() => setRedemptionSuccess(null)}
              className="p-1 rounded-lg hover:bg-emerald-200 dark:hover:bg-emerald-900 text-emerald-700 dark:text-emerald-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ----------------- TAB 1: REWARDS DASHBOARD ----------------- */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fade-in">
            
            {/* Top Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Card 1: Available Points Balance */}
              <div className="bg-white dark:bg-[#0a1c3b] rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm relative overflow-hidden group">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Redeemable Balance
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                    <Coins className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-3xl font-black text-[#0c2b64] dark:text-[#c8f526]">
                    {account.availableBalance.toLocaleString()}
                  </span>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Points</span>
                </div>
                <div className="mt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <span>≈ {formatCurrency(account.availableBalance)} USD Value</span>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveTab('store')}
                    className="text-xs font-bold text-blue-700 dark:text-[#c8f526] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Redeem Catalog</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <span className="text-[10px] text-slate-400">1 pt = $1 USD</span>
                </div>
              </div>

              {/* Card 2: Total Lifetime Points */}
              <div className="bg-white dark:bg-[#0a1c3b] rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Lifetime Points Earned
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-[#c8f526] flex items-center justify-center">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-3xl font-black text-slate-900 dark:text-white">
                    {account.totalPointsEarned.toLocaleString()}
                  </span>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Points</span>
                </div>
                <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  <strong className="text-blue-600 dark:text-blue-400">{account.redeemedPoints} pts</strong> successfully cashed out
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                  <span>Partner Tier Status</span>
                  <span className="font-bold text-[#0c2b64] dark:text-[#c8f526]">{account.partnerLevel}</span>
                </div>
              </div>

              {/* Card 3: Active Referrals & Win Rate */}
              <div className="bg-white dark:bg-[#0a1c3b] rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Referral Pipeline
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-3xl font-black text-slate-900 dark:text-white">
                    {account.referralCount}
                  </span>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Referred</span>
                </div>
                <div className="mt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  {account.successfulConversions} of {account.referralCount} Deals Activated
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                  <span>Win Rate</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {Math.round((account.successfulConversions / account.referralCount) * 100)}% Conversion
                  </span>
                </div>
              </div>

              {/* Card 4: Tier Multiplier & Boost */}
              <div className="bg-gradient-to-br from-[#0c2b64] via-blue-900 to-[#123e8f] text-white rounded-2xl p-5 shadow-md flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#c8f526]">
                      Tier Commission Boost
                    </span>
                    <Crown className="w-4 h-4 text-[#c8f526]" />
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl font-black text-white">
                      {account.tierMultiplier}x
                    </span>
                    <span className="text-xs font-bold text-blue-200">Points Multiplier</span>
                  </div>
                  <p className="mt-2 text-[11px] text-blue-100 leading-snug">
                    As a <strong>{account.partnerLevel}</strong>, your firm earns +40% bonus rewards on all business client contracts.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-blue-800/80 text-[10px] text-blue-200 flex items-center justify-between">
                  <span>Recurring Share:</span>
                  <span className="text-[#c8f526] font-bold">10% Lifetime Margin</span>
                </div>
              </div>

            </div>

            {/* Middle Section: Milestone Meter & Points Visualizer */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Milestone Progress Card (lg:col-span-7) */}
              <div className="lg:col-span-7 bg-white dark:bg-[#0a1c3b] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <span className="text-xs font-bold text-blue-700 dark:text-[#c8f526] uppercase tracking-wider">
                        Partner Milestone Tracker
                      </span>
                      <h3 className="text-lg font-black text-slate-900 dark:text-white mt-1">
                        Road to 5,000 Points: Executive Summit Pass & VIP Sandbox
                      </h3>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                      <Crown className="w-6 h-6" />
                    </div>
                  </div>

                  <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Accumulate 5,000 lifetime points to unlock an all-expenses-paid VIP Delegate Pass to the <strong>Pan-African NextSofthr Summit in Kigali</strong>, plus a free dedicated 12-month enterprise integration sandbox.
                  </p>

                  {/* Progress Bar Gauge */}
                  <div className="mt-5">
                    <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                      <span className="text-slate-700 dark:text-slate-300">
                        {account.totalPointsEarned.toLocaleString()} / {nextMilestonePoints.toLocaleString()} Points
                      </span>
                      <span className="text-blue-700 dark:text-[#c8f526] font-extrabold">
                        {progressPercent}% Complete
                      </span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-[#061227] border border-slate-200 dark:border-slate-800 overflow-hidden p-0.5">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-[#c8f526] transition-all duration-700"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                      <span>Baseline Tier (0 pts)</span>
                      <span>Next Level ({nextMilestonePoints - account.totalPointsEarned} pts remaining)</span>
                    </div>
                  </div>
                </div>

                {/* Quick Share Link Box */}
                <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Your Firm's Unique Referral Tracking Link:
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={referralUrl}
                      className="flex-1 px-3 py-2 text-xs font-mono rounded-xl bg-slate-50 dark:bg-[#061227] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 select-all"
                    />
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="px-4 py-2 rounded-xl bg-[#0c2b64] hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                    >
                      {copiedLink ? <Check className="w-3.5 h-3.5 text-[#c8f526]" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Monthly Points Visualizer Graph (lg:col-span-5) */}
              <div className="lg:col-span-5 bg-white dark:bg-[#0a1c3b] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-blue-700 dark:text-[#c8f526] uppercase tracking-wider">
                        Performance History
                      </span>
                      <h3 className="text-lg font-black text-slate-900 dark:text-white mt-1">
                        Monthly Rewards Generated
                      </h3>
                    </div>
                    <span className="text-[11px] font-bold text-slate-400 bg-slate-100 dark:bg-[#061227] px-2 py-0.5 rounded-md">
                      Last 6 Months
                    </span>
                  </div>

                  {/* Tailwind Bar Chart */}
                  <div className="mt-6 flex items-end justify-between gap-3 h-40 pt-4 px-2 border-b border-slate-100 dark:border-slate-800">
                    {MONTHLY_POINTS_HISTORY.map((item, idx) => {
                      const maxPoints = 1450;
                      const heightPercent = Math.round((item.points / maxPoints) * 100);
                      const isHigh = item.points >= 1000;

                      return (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                          {/* Hover tooltip */}
                          <div className="text-[10px] font-bold text-slate-600 dark:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
                            {item.points}
                          </div>
                          <div className="w-full max-w-[28px] h-32 bg-slate-100 dark:bg-[#061227] rounded-lg overflow-hidden flex items-end p-0.5">
                            <div 
                              className={`w-full rounded-md transition-all duration-500 ${
                                isHigh 
                                  ? 'bg-gradient-to-t from-[#0c2b64] to-[#c8f526]' 
                                  : 'bg-gradient-to-t from-blue-700 to-indigo-500'
                              } group-hover:brightness-110`}
                              style={{ height: `${heightPercent}%` }}
                            />
                          </div>
                          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                            {item.month}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Point Allocation Legend */}
                <div className="mt-4 pt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0c2b64] dark:bg-[#c8f526]"></span>
                    <span>Client Referrals (70%)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                    <span>Consultant Onboarding (30%)</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Section: Active Referral Tracker Table */}
            <div className="bg-white dark:bg-[#0a1c3b] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              
              {/* Table Header Controls */}
              <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    Referral Pipeline & Status Log
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Track the progress of your referred prospects and credited points
                  </p>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                  {['all', 'rewards_paid', 'won_activated', 'demo_scheduled', 'submitted'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setFilterStatus(st)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                        filterStatus === st
                          ? 'bg-[#0c2b64] text-white'
                          : 'bg-slate-100 dark:bg-[#061227] text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                      }`}
                    >
                      {st === 'all' && 'All Referrals'}
                      {st === 'rewards_paid' && 'Paid Out'}
                      {st === 'won_activated' && 'Won Deals'}
                      {st === 'demo_scheduled' && 'In Demo'}
                      {st === 'submitted' && 'Under Review'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Table Data */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-[#061227] border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      <th className="py-3 px-4">Candidate / Business</th>
                      <th className="py-3 px-4">Type</th>
                      <th className="py-3 px-4">Contact Person</th>
                      <th className="py-3 px-4">Country & Market</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Points Earned</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                    {filteredReferrals.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900 dark:text-white">
                            {item.candidateName}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400">
                            Scope: {item.estimatedSeats}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                            item.candidateType === 'business_client'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                              : 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                          }`}>
                            {item.candidateType === 'business_client' ? 'Client Enterprise' : 'Consulting Partner'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300">
                          <div>{item.contactPerson}</div>
                          <div className="text-[11px] text-slate-400">{item.email}</div>
                        </td>
                        <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300 font-medium">
                          {item.country} {item.city && `(${item.city})`}
                        </td>
                        <td className="py-3.5 px-4">
                          {getStatusBadge(item.status)}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="font-black text-sm text-[#0c2b64] dark:text-[#c8f526]">
                            +{item.pointsAwarded} pts
                          </div>
                          <div className="text-[10px] text-slate-400">
                            Potential: {item.potentialPoints} pts
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>

          </div>
        )}

        {/* ----------------- TAB 2: SUBMIT A REFERRAL ----------------- */}
        {activeTab === 'submit' && (
          <div className="max-w-3xl mx-auto bg-white dark:bg-[#0a1c3b] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl animate-fade-in">
            
            {formSuccessMessage && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 text-sm flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>{formSuccessMessage}</span>
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Submit a Business or Consultant Referral
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Introduce a prospective enterprise client or fellow technology consultancy. You receive <strong>50 points immediately upon review</strong>, and up to <strong>1,000 points + 10% lifetime revenue margin</strong> once they activate!
              </p>
            </div>

            <form onSubmit={handleReferralSubmit} className="space-y-6">
              
              {/* Candidate Type Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  What kind of partner or client are you referring?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setCandidateType('business_client')}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      candidateType === 'business_client'
                        ? 'bg-blue-50/80 dark:bg-blue-950/80 border-blue-600 dark:border-[#c8f526] ring-2 ring-blue-500/20'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Building2 className={`w-5 h-5 ${candidateType === 'business_client' ? 'text-blue-700 dark:text-[#c8f526]' : 'text-slate-400'}`} />
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                        Up to 850 pts
                      </span>
                    </div>
                    <div className="mt-2.5 font-bold text-sm text-slate-900 dark:text-white">
                      Business Client Enterprise
                    </div>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-snug">
                      A company looking for NextSofthr HR, biometric attendance, or payroll software.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCandidateType('consultant_partner')}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      candidateType === 'consultant_partner'
                        ? 'bg-blue-50/80 dark:bg-blue-950/80 border-blue-600 dark:border-[#c8f526] ring-2 ring-blue-500/20'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Users className={`w-5 h-5 ${candidateType === 'consultant_partner' ? 'text-blue-700 dark:text-[#c8f526]' : 'text-slate-400'}`} />
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                        Up to 500 pts
                      </span>
                    </div>
                    <div className="mt-2.5 font-bold text-sm text-slate-900 dark:text-white">
                      Consultant / Implementation Firm
                    </div>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-snug">
                      An HR advisory, accounting firm, or ERP integrator who wants to resell NextSofthr.
                    </p>
                  </button>
                </div>
              </div>

              {/* Form Input Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Candidate Company / Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sterling Logistics Ltd"
                    value={formData.candidateName}
                    onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#061227] border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-700 dark:focus:border-[#c8f526]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Decision Maker / Contact Person *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Ngozi Okoye"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#061227] border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-700 dark:focus:border-[#c8f526]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Official Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. n.okoye@sterlinglogistics.ng"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#061227] border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-700 dark:focus:border-[#c8f526]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Direct Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +234 803 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#061227] border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-700 dark:focus:border-[#c8f526]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Country
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#061227] border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-700 dark:focus:border-[#c8f526]"
                  >
                    {COUNTRIES_DATA.map((c) => (
                      <option key={c.id} value={c.name}>{c.flag} {c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Estimated Staff Size / Project Scale
                  </label>
                  <select
                    value={formData.estimatedSeats}
                    onChange={(e) => setFormData({ ...formData, estimatedSeats: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#061227] border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-700 dark:focus:border-[#c8f526]"
                  >
                    <option value="25 - 50 Staff">25 - 50 Staff (Growth Business)</option>
                    <option value="51 - 250 Staff">51 - 250 Staff (Mid-Market SME)</option>
                    <option value="251 - 1,000 Staff">251 - 1,000 Staff (Large Enterprise)</option>
                    <option value="1,000+ Staff">1,000+ Staff (Multinational)</option>
                    <option value="Consulting Practice">Consulting / Technology Firm</option>
                  </select>
                </div>

              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Introduction Notes / Key Needs (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Share details on their payroll challenges, biometric clocking needs, or why they are interested in NextSofthr..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#061227] border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-700 dark:focus:border-[#c8f526]"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Submitting gives your partner account an instant <strong className="text-emerald-600 dark:text-emerald-400">+50 points</strong> credit.
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#c8f526] hover:bg-[#b5e01b] text-[#071938] font-bold text-sm shadow-md lemon-shadow transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Referral</span>
                </button>
              </div>

            </form>

          </div>
        )}

        {/* ----------------- TAB 3: REWARDS REDEMPTION STORE ----------------- */}
        {activeTab === 'store' && (
          <div className="space-y-8 animate-fade-in">
            
            {/* Top Balance Banner */}
            <div className="bg-gradient-to-r from-[#0c2b64] via-blue-900 to-[#123e8f] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#c8f526] text-xs font-bold mb-2">
                  <Coins className="w-3.5 h-3.5" />
                  <span>Partner Rewards Store</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black">
                  Redeem Points for Cash, Certifications & Growth Vouchers
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-blue-100 max-w-xl">
                  Points never expire. Convert your accrued referral credits directly into wire payouts, exam vouchers, or high-visibility directory placement.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center shrink-0">
                <div className="text-xs uppercase font-bold text-blue-200">Your Current Balance</div>
                <div className="text-3xl font-black text-[#c8f526] mt-0.5">
                  {account.availableBalance.toLocaleString()} pts
                </div>
                <div className="text-xs text-emerald-300 font-semibold mt-0.5">
                  ≈ {formatCurrency(account.availableBalance)} USD Value
                </div>
              </div>
            </div>

            {/* Catalog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {REWARD_REDEMPTION_ITEMS.map((item) => {
                const canAfford = account.availableBalance >= item.pointsCost;

                return (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-[#0a1c3b] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-[#c8f526] border border-blue-200 dark:border-blue-900/60 flex items-center justify-center">
                          {item.iconName === 'Banknote' && <Banknote className="w-5 h-5" />}
                          {item.iconName === 'Award' && <Award className="w-5 h-5" />}
                          {item.iconName === 'Server' && <Server className="w-5 h-5" />}
                          {item.iconName === 'Sparkles' && <Sparkles className="w-5 h-5" />}
                          {item.iconName === 'Crown' && <Crown className="w-5 h-5" />}
                          {item.iconName === 'Cpu' && <Cpu className="w-5 h-5" />}
                        </div>

                        {item.badge && (
                          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                            {item.badge}
                          </span>
                        )}
                      </div>

                      <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                        {item.title}
                      </h4>
                      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="text-base font-black text-[#0c2b64] dark:text-[#c8f526]">
                          {item.pointsCost} Points
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {formatCurrency(item.pointsCost)} USD value
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleClaimReward(item)}
                        disabled={!canAfford}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                          canAfford
                            ? 'bg-[#c8f526] hover:bg-[#b5e01b] text-[#071938] shadow-sm'
                            : 'bg-slate-100 dark:bg-[#061227] text-slate-400 dark:text-slate-600 cursor-not-allowed'
                        }`}
                      >
                        <Gift className="w-3.5 h-3.5" />
                        <span>{canAfford ? 'Redeem Now' : 'Need More Pts'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
