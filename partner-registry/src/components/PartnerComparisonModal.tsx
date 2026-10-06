import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Minus, 
  Star, 
  MapPin, 
  ShieldCheck, 
  Award, 
  ExternalLink, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Briefcase, 
  Layers, 
  Users, 
  Globe, 
  Mail, 
  Phone, 
  Sparkles,
  ArrowRight,
  Printer,
  ChevronDown
} from 'lucide-react';
import { Partner } from '../types';
import { PartnerCategoryBadge } from './PartnerCategoryBadge';
import { PartnerTierBadge, TopTierBadge, VerifiedBadge } from './PartnerTierBadge';

interface PartnerComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  comparedPartners: Partner[];
  allPartners: Partner[];
  onRemovePartner: (partnerId: string) => void;
  onAddPartner: (partner: Partner) => void;
  onClearAll: () => void;
  onViewProfile: (partner: Partner) => void;
  onContactPartner: (partner: Partner) => void;
}

export const PartnerComparisonModal: React.FC<PartnerComparisonModalProps> = ({
  isOpen,
  onClose,
  comparedPartners,
  allPartners,
  onRemovePartner,
  onAddPartner,
  onClearAll,
  onViewProfile,
  onContactPartner
}) => {
  const [selectedAddId, setSelectedAddId] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'compliance' | 'track-record'>('overview');

  if (!isOpen) return null;

  // Available partners to add (not currently in compared list)
  const availableToAdd = allPartners.filter(
    p => !comparedPartners.some(cp => cp.id === p.id)
  );

  // Collect all unique services across compared partners
  const allServices = Array.from(
    new Set(comparedPartners.flatMap(p => p.services))
  ).sort();

  // Collect all unique industries
  const allIndustries = Array.from(
    new Set(comparedPartners.flatMap(p => p.industries))
  ).sort();

  // Highlight highest values
  const maxExperience = Math.max(...comparedPartners.map(p => p.yearsExperience || 0));
  const maxImplementations = Math.max(...comparedPartners.map(p => p.numberOfImplementations || 0));
  const maxClients = Math.max(...comparedPartners.map(p => p.clientCount || 0));
  const maxRating = Math.max(...comparedPartners.map(p => p.rating || 0));

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex justify-center p-2 sm:p-4 md:p-6 animate-fadeIn">
      <div className="bg-white dark:bg-[#061124] w-full max-w-7xl rounded-2xl md:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto relative flex flex-col max-h-[94vh]">
        
        {/* Top Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-[#071938] via-[#0c2b64] to-[#123e8f] text-white relative shrink-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c8f526]/20 border border-[#c8f526] text-[#c8f526] text-xs font-black uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Side-by-Side Evaluation Matrix</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white flex items-center gap-2">
                <span>Partner Comparison</span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/20 text-slate-200">
                  {comparedPartners.length} of 4 Selected
                </span>
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-2xl">
                Compare verified implementation competencies, statutory payroll frameworks, client track records, and localized African jurisdictions.
              </p>
            </div>

            {/* Actions: Add Partner Dropdown & Close */}
            <div className="flex items-center gap-2.5 self-start md:self-center">
              {/* Add Partner Dropdown if < 4 */}
              {comparedPartners.length < 4 && availableToAdd.length > 0 && (
                <div className="relative">
                  <select
                    value={selectedAddId}
                    onChange={(e) => {
                      const p = allPartners.find(item => item.id === e.target.value);
                      if (p) {
                        onAddPartner(p);
                        setSelectedAddId('');
                      }
                    }}
                    className="appearance-none bg-blue-900/80 hover:bg-blue-800 border border-blue-600/80 text-white text-xs font-bold py-2 pl-3 pr-8 rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#c8f526] transition-all"
                  >
                    <option value="">+ Add Partner to Compare</option>
                    {availableToAdd.map(p => (
                      <option key={p.id} value={p.id} className="text-slate-900 bg-white">
                        {p.companyName} ({p.country})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-300 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              )}

              {/* Print / Save comparison */}
              <button
                type="button"
                onClick={handlePrint}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
                title="Print comparison table"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>

              {/* Clear All */}
              {comparedPartners.length > 0 && (
                <button
                  type="button"
                  onClick={onClearAll}
                  className="px-3 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-400/40 text-xs font-semibold transition-colors"
                >
                  Clear All
                </button>
              )}

              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors shrink-0"
                aria-label="Close comparison view"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Section Navigation Tabs */}
          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-blue-900/70 overflow-x-auto scrollbar-none text-xs">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'bg-[#c8f526] text-[#071938]'
                  : 'bg-white/10 hover:bg-white/15 text-slate-200'
              }`}
            >
              Key Metrics & Overview
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors whitespace-nowrap ${
                activeTab === 'services'
                  ? 'bg-[#c8f526] text-[#071938]'
                  : 'bg-white/10 hover:bg-white/15 text-slate-200'
              }`}
            >
              Services & Capabilities Matrix ({allServices.length})
            </button>
            <button
              onClick={() => setActiveTab('compliance')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors whitespace-nowrap ${
                activeTab === 'compliance'
                  ? 'bg-[#c8f526] text-[#071938]'
                  : 'bg-white/10 hover:bg-white/15 text-slate-200'
              }`}
            >
              Coverage & Compliance
            </button>
            <button
              onClick={() => setActiveTab('track-record')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors whitespace-nowrap ${
                activeTab === 'track-record'
                  ? 'bg-[#c8f526] text-[#071938]'
                  : 'bg-white/10 hover:bg-white/15 text-slate-200'
              }`}
            >
              Verified Track Record
            </button>
          </div>
        </div>

        {/* Comparison Content Container */}
        {comparedPartners.length === 0 ? (
          <div className="p-12 text-center my-auto">
            <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-[#c8f526] flex items-center justify-center mx-auto mb-4">
              <Layers className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#0c2b64] dark:text-white">No partners selected for comparison</h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Select 2 to 4 partners from the directory using the "Compare" checkbox on their cards to view them side-by-side.
            </p>
            <button
              onClick={onClose}
              className="mt-5 px-5 py-2.5 rounded-xl bg-[#0c2b64] text-white font-bold text-xs hover:bg-blue-800 transition-colors"
            >
              Return to Directory
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-auto bg-slate-50/50 dark:bg-[#061124]">
            <div className="min-w-[650px] md:min-w-[850px] p-4 sm:p-6">
              
              {/* Top Partner Summary Cards Grid */}
              <div 
                className="grid gap-4 mb-6"
                style={{
                  gridTemplateColumns: `220px repeat(${comparedPartners.length}, minmax(200px, 1fr))`
                }}
              >
                {/* Empty corner cell */}
                <div className="flex flex-col justify-end p-3">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Comparing {comparedPartners.length} Partners
                  </span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    Direct parameter diffing against certified NextSofthr standards.
                  </p>
                </div>

                {/* Partner Column Headers */}
                {comparedPartners.map((partner) => (
                  <div
                    key={partner.id}
                    className="bg-white dark:bg-[#0a1c3b] rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between"
                  >
                    {/* Remove button */}
                    <button
                      type="button"
                      onClick={() => onRemovePartner(partner.id)}
                      className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-slate-100 hover:bg-rose-50 text-slate-400 hover:text-rose-600 dark:bg-slate-800 dark:hover:bg-rose-950 dark:text-slate-300 dark:hover:text-rose-400 flex items-center justify-center transition-colors"
                      title={`Remove ${partner.companyName} from comparison`}
                      aria-label={`Remove ${partner.companyName}`}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>

                    <div>
                      {/* Logo & Verification */}
                      <div className="flex items-start gap-3 mb-2.5">
                        <div className="w-12 h-12 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-[#061227] overflow-hidden shrink-0 shadow-xs">
                          <img 
                            src={partner.logo} 
                            alt={partner.companyName} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 pr-6">
                          <h4 
                            onClick={() => onViewProfile(partner)}
                            className="text-sm font-black text-[#0c2b64] dark:text-white truncate cursor-pointer hover:text-blue-600 dark:hover:text-[#c8f526]"
                            title={partner.companyName}
                          >
                            {partner.companyName}
                          </h4>
                          <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                            <MapPin className="w-3 h-3 text-blue-600 dark:text-blue-400 shrink-0" />
                            <span className="truncate">{partner.city}, {partner.country}</span>
                          </div>
                        </div>
                      </div>

                      {/* Category Badge & Partner Level */}
                      <div className="flex flex-col gap-1.5 mb-3">
                        <PartnerCategoryBadge category={partner.partnerType} size="xs" />
                        
                        <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                          <PartnerTierBadge level={partner.partnerLevel} size="xs" showTooltip={true} />
                          {partner.isVerified && (
                            <VerifiedBadge size="xs" variant="solid" />
                          )}
                          {(partner.partnerLevel === 'Strategic Partner' || partner.partnerLevel === 'Premium Partner') && (
                            <TopTierBadge size="xs" />
                          )}
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-1 text-xs font-black text-amber-600 dark:text-amber-400 mb-3">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                        <span>{partner.rating}</span>
                        <span className="text-[11px] font-normal text-slate-400">
                          ({partner.reviewCount || 12} reviews)
                        </span>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="space-y-1.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onContactPartner(partner);
                        }}
                        className="w-full py-2 px-3 rounded-xl bg-[#c8f526] hover:bg-[#b5e01b] text-[#071938] font-black text-xs transition-colors shadow-xs"
                      >
                        Contact Firm
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onViewProfile(partner);
                        }}
                        className="w-full py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs transition-colors"
                      >
                        Full Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* TAB 1: OVERVIEW METRICS TABLE */}
              {activeTab === 'overview' && (
                <div className="bg-white dark:bg-[#0a1c3b] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs mb-6">
                  <div className="px-5 py-3.5 bg-slate-100/70 dark:bg-[#08152e] border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Core Track Record & Key Performance Indicators
                    </span>
                    <span className="text-[11px] text-[#c8f526] font-bold bg-[#071938] px-2 py-0.5 rounded-full">
                      ★ Highlighted = Best Metric
                    </span>
                  </div>

                  <table className="w-full text-xs">
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                      
                      {/* Row: Partner Level */}
                      <tr>
                        <td className="p-3.5 font-bold text-slate-700 dark:text-slate-300 w-[220px] bg-slate-50/50 dark:bg-[#081630]">
                          Accreditation Tier
                        </td>
                        {comparedPartners.map(p => (
                          <td key={p.id} className="p-3.5 text-slate-800 dark:text-slate-200 font-semibold">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/70 text-blue-900 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-bold">
                              <Award className="w-3.5 h-3.5 text-blue-600 dark:text-[#c8f526]" />
                              {p.partnerLevel}
                            </span>
                          </td>
                        ))}
                      </tr>

                      {/* Row: Experience */}
                      <tr>
                        <td className="p-3.5 font-bold text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-[#081630]">
                          Years Experience
                        </td>
                        {comparedPartners.map(p => {
                          const isBest = p.yearsExperience === maxExperience && maxExperience > 0;
                          return (
                            <td key={p.id} className="p-3.5">
                              <div className="flex items-center gap-2">
                                <span className={`text-sm font-black ${isBest ? 'text-blue-700 dark:text-[#c8f526]' : 'text-slate-800 dark:text-slate-200'}`}>
                                  {p.yearsExperience}+ Years
                                </span>
                                {isBest && (
                                  <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded bg-blue-100 dark:bg-[#c8f526]/20 text-blue-800 dark:text-[#c8f526] border border-blue-200 dark:border-[#c8f526]/40">
                                    Top Exp
                                  </span>
                                )}
                              </div>
                            </td>
                          );
                        })}
                      </tr>

                      {/* Row: Implementations */}
                      <tr>
                        <td className="p-3.5 font-bold text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-[#081630]">
                          NextSofthr Deployments
                        </td>
                        {comparedPartners.map(p => {
                          const isBest = p.numberOfImplementations === maxImplementations && maxImplementations > 0;
                          return (
                            <td key={p.id} className="p-3.5">
                              <div className="flex items-center gap-2">
                                <span className={`text-sm font-black ${isBest ? 'text-blue-700 dark:text-[#c8f526]' : 'text-slate-800 dark:text-slate-200'}`}>
                                  {p.numberOfImplementations}+ Projects
                                </span>
                                {isBest && (
                                  <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded bg-blue-100 dark:bg-[#c8f526]/20 text-blue-800 dark:text-[#c8f526] border border-blue-200 dark:border-[#c8f526]/40">
                                    Most Deployments
                                  </span>
                                )}
                              </div>
                            </td>
                          );
                        })}
                      </tr>

                      {/* Row: Active Clients */}
                      <tr>
                        <td className="p-3.5 font-bold text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-[#081630]">
                          Active Retained Clients
                        </td>
                        {comparedPartners.map(p => {
                          const isBest = p.clientCount === maxClients && maxClients > 0;
                          return (
                            <td key={p.id} className="p-3.5">
                              <div className="flex items-center gap-2">
                                <span className={`text-sm font-black ${isBest ? 'text-blue-700 dark:text-[#c8f526]' : 'text-slate-800 dark:text-slate-200'}`}>
                                  {p.clientCount || 20}+ Clients
                                </span>
                                {isBest && (
                                  <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded bg-blue-100 dark:bg-[#c8f526]/20 text-blue-800 dark:text-[#c8f526] border border-blue-200 dark:border-[#c8f526]/40">
                                    Largest Portfolio
                                  </span>
                                )}
                              </div>
                            </td>
                          );
                        })}
                      </tr>

                      {/* Row: Rating */}
                      <tr>
                        <td className="p-3.5 font-bold text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-[#081630]">
                          Client Satisfaction Rating
                        </td>
                        {comparedPartners.map(p => (
                          <td key={p.id} className="p-3.5">
                            <div className="flex items-center gap-1 text-sm font-black text-amber-600 dark:text-amber-400">
                              <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                              <span>{p.rating} / 5.0</span>
                            </div>
                          </td>
                        ))}
                      </tr>

                      {/* Row: Headquarters & Primary Hub */}
                      <tr>
                        <td className="p-3.5 font-bold text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-[#081630]">
                          Primary Regional Hub
                        </td>
                        {comparedPartners.map(p => (
                          <td key={p.id} className="p-3.5 text-slate-800 dark:text-slate-200 font-medium">
                            <div className="font-bold">{p.city}, {p.country}</div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                              {p.address}
                            </div>
                          </td>
                        ))}
                      </tr>

                      {/* Row: Target Business Sizes */}
                      <tr>
                        <td className="p-3.5 font-bold text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-[#081630]">
                          Target Business Sizes
                        </td>
                        {comparedPartners.map(p => (
                          <td key={p.id} className="p-3.5">
                            <div className="flex flex-wrap gap-1">
                              {p.businessSizesServed.map((size, idx) => (
                                <span 
                                  key={idx} 
                                  className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px] font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                                >
                                  {size}
                                </span>
                              ))}
                            </div>
                          </td>
                        ))}
                      </tr>

                      {/* Row: Summary Description */}
                      <tr>
                        <td className="p-3.5 font-bold text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-[#081630]">
                          Executive Profile
                        </td>
                        {comparedPartners.map(p => (
                          <td key={p.id} className="p-3.5 text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                            {p.description}
                          </td>
                        ))}
                      </tr>

                    </tbody>
                  </table>
                </div>
              )}

              {/* TAB 2: SERVICES & CAPABILITIES MATRIX */}
              {activeTab === 'services' && (
                <div className="bg-white dark:bg-[#0a1c3b] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs mb-6">
                  <div className="px-5 py-3.5 bg-slate-100/70 dark:bg-[#08152e] border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Service Offering & Functional Capabilities
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      Comparing {allServices.length} distinct service domains
                    </span>
                  </div>

                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-[#081630]">
                        <th className="p-3.5 text-left font-black text-slate-700 dark:text-slate-300 w-[220px]">
                          Service Domain
                        </th>
                        {comparedPartners.map(p => (
                          <th key={p.id} className="p-3.5 text-left font-bold text-[#0c2b64] dark:text-white">
                            {p.companyName}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                      {allServices.map((service) => (
                        <tr key={service} className="hover:bg-blue-50/30 dark:hover:bg-blue-950/20 transition-colors">
                          <td className="p-3.5 font-bold text-slate-700 dark:text-slate-300 bg-slate-50/30 dark:bg-[#081630]/60">
                            {service}
                          </td>
                          {comparedPartners.map(p => {
                            const hasService = p.services.includes(service);
                            return (
                              <td key={p.id} className="p-3.5">
                                {hasService ? (
                                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-[#c8f526] font-bold border border-emerald-200 dark:border-emerald-800/60 text-[11px]">
                                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                                    <span>Certified</span>
                                  </div>
                                ) : (
                                  <span className="inline-flex items-center gap-1 text-slate-400 dark:text-slate-600 text-xs">
                                    <Minus className="w-3.5 h-3.5" />
                                    <span>Not Listed</span>
                                  </span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* TAB 3: COVERAGE & COMPLIANCE */}
              {activeTab === 'compliance' && (
                <div className="bg-white dark:bg-[#0a1c3b] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs mb-6">
                  <div className="px-5 py-3.5 bg-slate-100/70 dark:bg-[#08152e] border-b border-slate-200 dark:border-slate-800">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Regional Jurisdiction & Statutory Compliance Alignment
                    </span>
                  </div>

                  <table className="w-full text-xs">
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                      
                      {/* Countries Covered */}
                      <tr>
                        <td className="p-3.5 font-bold text-slate-700 dark:text-slate-300 w-[220px] bg-slate-50/50 dark:bg-[#081630]">
                          Geographic Markets
                        </td>
                        {comparedPartners.map(p => (
                          <td key={p.id} className="p-3.5">
                            <div className="flex flex-wrap gap-1">
                              {p.countriesServed.map((c, idx) => (
                                <span 
                                  key={idx} 
                                  className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-200 text-[11px] font-semibold border border-blue-100 dark:border-blue-900/40"
                                >
                                  {c}
                                </span>
                              ))}
                            </div>
                          </td>
                        ))}
                      </tr>

                      {/* Working Languages */}
                      <tr>
                        <td className="p-3.5 font-bold text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-[#081630]">
                          Languages Supported
                        </td>
                        {comparedPartners.map(p => (
                          <td key={p.id} className="p-3.5 text-slate-800 dark:text-slate-200 font-semibold">
                            {p.languages.join(' • ')}
                          </td>
                        ))}
                      </tr>

                      {/* Industries */}
                      <tr>
                        <td className="p-3.5 font-bold text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-[#081630]">
                          Industry Verticals
                        </td>
                        {comparedPartners.map(p => (
                          <td key={p.id} className="p-3.5">
                            <div className="flex flex-wrap gap-1">
                              {p.industries.map((ind, idx) => (
                                <span 
                                  key={idx} 
                                  className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] border border-slate-200 dark:border-slate-700 font-medium"
                                >
                                  {ind}
                                </span>
                              ))}
                            </div>
                          </td>
                        ))}
                      </tr>

                      {/* Certifications */}
                      <tr>
                        <td className="p-3.5 font-bold text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-[#081630]">
                          Certified Accreditations
                        </td>
                        {comparedPartners.map(p => (
                          <td key={p.id} className="p-3.5">
                            <ul className="space-y-1">
                              {p.certifications.map((cert, idx) => (
                                <li key={idx} className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                                  <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-[#c8f526] shrink-0" />
                                  <span>{cert}</span>
                                </li>
                              ))}
                            </ul>
                          </td>
                        ))}
                      </tr>

                    </tbody>
                  </table>
                </div>
              )}

              {/* TAB 4: VERIFIED TRACK RECORD */}
              {activeTab === 'track-record' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {comparedPartners.map(p => (
                    <div 
                      key={p.id} 
                      className="bg-white dark:bg-[#0a1c3b] rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <img src={p.logo} alt="" className="w-8 h-8 rounded-lg object-cover border" />
                          <h4 className="font-black text-[#0c2b64] dark:text-white text-sm truncate">
                            {p.companyName}
                          </h4>
                        </div>

                        {/* Case Study */}
                        {p.caseStudies && p.caseStudies.length > 0 ? (
                          <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#061227] border border-slate-100 dark:border-slate-800 mb-3">
                            <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                              Featured Implementation Case Study
                            </div>
                            <h5 className="font-bold text-xs text-blue-900 dark:text-[#c8f526]">
                              {p.caseStudies[0].title}
                            </h5>
                            <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                              {p.caseStudies[0].result}
                            </p>
                            <div className="mt-2 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded w-fit">
                              {p.caseStudies[0].metric}
                            </div>
                          </div>
                        ) : null}

                        {/* Testimonial */}
                        {p.testimonials && p.testimonials.length > 0 ? (
                          <div className="p-3 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 text-[11px]">
                            <p className="italic text-slate-700 dark:text-slate-300">
                              "{p.testimonials[0].quote}"
                            </p>
                            <div className="mt-1.5 font-bold text-slate-900 dark:text-white">
                              {p.testimonials[0].author}
                            </div>
                            <div className="text-[10px] text-slate-500">
                              {p.testimonials[0].role}, {p.testimonials[0].company}
                            </div>
                          </div>
                        ) : null}
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onContactPartner(p);
                        }}
                        className="mt-4 w-full py-2 rounded-xl bg-[#0c2b64] text-white hover:bg-blue-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                      >
                        <span>Initiate Inquiry with {p.companyName}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Bottom Quick Contact Bar */}
              <div className="p-4 rounded-2xl bg-blue-900/10 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-[#c8f526] shrink-0" />
                  <span>All NextSofthr partners adhere to strict SLAs and data privacy benchmarks.</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl bg-white dark:bg-[#0a1c3b] border border-slate-300 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50"
                  >
                    Back to Registry
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
