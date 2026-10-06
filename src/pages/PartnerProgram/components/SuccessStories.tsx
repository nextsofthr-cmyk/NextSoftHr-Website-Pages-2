import React from 'react';
import { TESTIMONIALS } from '../data/partnerData';
import { Star, Quote, Award, TrendingUp, Sparkles, Download, CheckCircle2 } from 'lucide-react';
import { PartnerBadge } from './PartnerBadge';
import { PartnerBadgeOptions, downloadPartnerBadgeSvg } from '../utils/badgeGenerator';

interface SuccessStoriesProps {
  onOpenBadgeModal?: (options?: PartnerBadgeOptions) => void;
}

export const SuccessStories: React.FC<SuccessStoriesProps> = ({ onOpenBadgeModal }) => {
  // Map testimonial IDs to official partner badge configurations
  const getBadgeForTestimonial = (testimonialId: string): PartnerBadgeOptions => {
    switch (testimonialId) {
      case 'test-1':
        return {
          partnerName: 'Apex People Advisory',
          tier: 'platinum',
          partnerId: 'NX-PTR-9104',
          year: 2026,
          specialization: 'Statutory Payroll & Organizational Design',
          region: 'Nigeria & West Africa',
          styleVariant: 'crest'
        };
      case 'test-2':
        return {
          partnerName: 'Nairobi Chartered Accountants & Tax Advisory',
          tier: 'gold',
          partnerId: 'NX-PTR-6340',
          year: 2026,
          specialization: 'Tax Compliance, KRA Deductions & Audit',
          region: 'Kenya & East Africa',
          styleVariant: 'crest'
        };
      case 'test-3':
        return {
          partnerName: 'Accra Cloud Solutions Ltd',
          tier: 'gold',
          partnerId: 'NX-PTR-5219',
          year: 2026,
          specialization: 'System Integration & Enterprise Cloud Rollouts',
          region: 'Ghana & West Africa',
          styleVariant: 'hex'
        };
      case 'test-4':
      default:
        return {
          partnerName: 'Vanguard Workforce Strategies',
          tier: 'platinum',
          partnerId: 'NX-PTR-7721',
          year: 2026,
          specialization: 'Strategic Labor Planning & Executive Advisory',
          region: 'South Africa & SADC',
          styleVariant: 'shield'
        };
    }
  };

  return (
    <section id="stories" className="py-24 bg-slate-50 dark:bg-[#040E1F] border-t border-slate-200 dark:border-blue-900/60 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/60 border border-blue-200 dark:border-blue-700/60 text-xs font-bold text-blue-800 dark:text-[#B8F010] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PARTNER PROVEN IMPACT</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Partners Growing With <span className="text-blue-600 dark:text-[#B8F010]">NextSofthr</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Hear from consulting leaders, chartered accountants, and system integrators who turned their business relationships into thriving recurring revenue channels.
          </p>
        </div>

        {/* 4 Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {TESTIMONIALS.map((t) => {
            const badge = getBadgeForTestimonial(t.id);

            return (
              <div
                key={t.id}
                className="group relative rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#071D3E] dark:to-[#040E1F] border border-slate-200/90 dark:border-blue-800/80 p-8 hover:border-blue-500 dark:hover:border-[#B8F010] transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-xl dark:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-blue-950/70 flex flex-col justify-between"
              >
                <div>
                  {/* Header with Quote Icon, Partner Level Badge & Interactive SVG Credential */}
                  <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                      <Quote className="w-8 h-8 text-blue-600/30 dark:text-[#B8F010]/40 group-hover:text-blue-600 dark:group-hover:text-[#B8F010] transition-colors" />
                      <div className="flex gap-1 text-amber-400 dark:text-[#B8F010]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Interactive Mini Certification Badge */}
                      <button
                        onClick={() => onOpenBadgeModal && onOpenBadgeModal(badge)}
                        className="px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-900/80 hover:bg-blue-100 dark:hover:bg-blue-800 text-blue-800 dark:text-[#B8F010] border border-blue-200 dark:border-[#B8F010]/30 text-[11px] font-bold flex items-center gap-1.5 transition-all shadow-xs"
                        title={`Click to view & download official SVG certification badge for ${badge.partnerName}`}
                      >
                        <Award className="w-3.5 h-3.5 text-[#B8F010]" />
                        <span>{t.partnerLevel} SVG Badge</span>
                      </button>

                      <button
                        onClick={() => downloadPartnerBadgeSvg(badge)}
                        className="p-1 rounded-full bg-slate-100 dark:bg-blue-950 hover:bg-slate-200 dark:hover:bg-blue-900 text-slate-600 dark:text-slate-300 transition-colors"
                        title="Download SVG vector badge"
                      >
                        <Download className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Testimonial Quote */}
                  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed italic mb-8">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                {/* Partner Profile Footer with Mini SVG Avatar Badge */}
                <div className="pt-6 border-t border-slate-200 dark:border-blue-900/80 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="relative cursor-pointer" onClick={() => onOpenBadgeModal && onOpenBadgeModal(badge)}>
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-blue-600 group-hover:border-[#B8F010] transition-colors shadow-sm"
                      />
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#B8F010] border-2 border-[#040E1F] flex items-center justify-center text-[8px] font-black text-[#040E1F]">
                        ✓
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-[#B8F010] transition-colors">
                        {t.name}
                      </h4>
                      <p className="text-xs text-blue-700 dark:text-blue-200 font-medium">
                        {t.role}, {t.company}
                      </p>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                        {t.flag} {t.country} • <span className="font-mono text-[10px] text-slate-600 dark:text-blue-300">{badge.partnerId}</span>
                      </span>
                    </div>
                  </div>

                  <div className="hidden sm:flex flex-col text-right">
                    <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">Impact</span>
                    <span className="text-xs font-bold text-blue-700 dark:text-[#B8F010] font-mono">{t.stats}</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Official Certification Badge Studio Banner */}
        <div className="mb-12 p-6 rounded-3xl bg-gradient-to-r from-blue-900/40 via-[#071D3E] to-blue-900/40 border border-blue-700/60 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#B8F010] text-[#040E1F] flex items-center justify-center shrink-0 shadow-lg font-black text-xl">
              🎖️
            </div>
            <div>
              <h4 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Unique Visual Partner Certification Badges (SVG & PNG)</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-black bg-[#B8F010] text-[#040E1F]">
                  TOP-TIER EXCLUSIVE
                </span>
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
                All top-tier partners (Gold 30% & Platinum 40%) receive cryptographically authorized, dynamic SVG certification badges in 4 distinctive architectures: Crest Medallion, Cyber Shield, Tech Hexagon, and Signature Banner.
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenBadgeModal && onOpenBadgeModal()}
            className="px-5 py-2.5 rounded-xl bg-[#B8F010] text-[#040E1F] text-xs font-extrabold hover:bg-[#CBFF1A] transition-all flex items-center gap-2 shrink-0 shadow"
          >
            <Sparkles className="w-4 h-4" />
            <span>Open Badge Studio & Customizer</span>
          </button>
        </div>

        {/* Aggregate Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-white dark:bg-[#030914] border border-slate-200 dark:border-blue-800/80 text-center shadow-sm dark:shadow-xl transition-colors">
          <div>
            <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">98.4%</span>
            <span className="text-xs text-slate-600 dark:text-blue-300 block mt-1 font-medium">Client Retention Rate</span>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-black text-blue-700 dark:text-[#B8F010] font-mono">40%</span>
            <span className="text-xs text-slate-600 dark:text-blue-300 block mt-1 font-medium">Top Recurring Tier</span>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">24-48h</span>
            <span className="text-xs text-slate-600 dark:text-blue-300 block mt-1 font-medium">Average Onboarding</span>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-black text-blue-700 dark:text-[#B8F010] font-mono">100%</span>
            <span className="text-xs text-slate-600 dark:text-blue-300 block mt-1 font-medium">Free Partner Program</span>
          </div>
        </div>

      </div>
    </section>
  );
};
