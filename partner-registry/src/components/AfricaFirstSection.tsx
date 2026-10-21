import React from "react";
import {
  Globe2,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  Building2,
  MapPin,
} from "lucide-react";

interface AfricaFirstSectionProps {
  onExploreHubsClick: () => void;
}

export const AfricaFirstSection: React.FC<AfricaFirstSectionProps> = ({
  onExploreHubsClick,
}) => {
  return (
    <section className="py-16 md:py-24 bg-[#071938] text-white relative overflow-hidden border-b border-blue-900">
      {/* Background radial blurs */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#c8f526]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column (lg:col-span-6) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/80 border border-[#c8f526]/40 text-[#c8f526] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PAN-AFRICAN ROOTS • GLOBAL CAPABILITY</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.15]">
              Built in Africa. <br />
              <span className="text-[#c8f526]">Connected to the World.</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              NextSofthr was conceived to solve the distinct complexities of
              operating businesses across the African continent — multi-currency
              payroll, varied statutory tax regimes, biometric shift rosters for
              factories and agriculture, and multi-branch operations.
            </p>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Today, our certified partner ecosystem connects dynamic
              enterprises across Lagos, Nairobi, Johannesburg, Accra, Kigali,
              and Cairo with global trade and diaspora hubs in London, Atlanta,
              Toronto, and Dubai.
            </p>

            {/* 3 Pillars */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-blue-950/60 border border-blue-900/80">
                <CheckCircle2 className="w-5 h-5 text-[#c8f526] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Native Statutory Intelligence
                  </h4>
                  <p className="text-xs text-slate-300">
                    Out-of-the-box support for Nigerian PAYE/Pension/NSITF,
                    Kenyan KRA/NSSF, South African SARS, Ghanaian GRA/SSNIT, and
                    OHADA labor codes.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-blue-950/60 border border-blue-900/80">
                <CheckCircle2 className="w-5 h-5 text-[#c8f526] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Cross-Border Multi-Currency
                  </h4>
                  <p className="text-xs text-slate-300">
                    Consolidated headquarters visibility with local currency
                    dispatches in NGN, KES, GHS, ZAR, RWF, EGP, USD, and GBP.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-blue-950/60 border border-blue-900/80">
                <CheckCircle2 className="w-5 h-5 text-[#c8f526] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Certified Local Implementation Partners
                  </h4>
                  <p className="text-xs text-slate-300">
                    On-the-ground support with consultants who speak your local
                    languages and understand your regulatory ecosystem.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onExploreHubsClick}
                className="px-6 py-3 rounded-xl bg-[#c8f526] hover:bg-[#b5e01b] text-[#071938] font-bold text-xs sm:text-sm shadow-md transition-colors"
              >
                Explore Partners Across Africa & Worldwide
              </button>
            </div>
          </div>

          {/* Right Visual Column: Showcase Mosaic with Authentic Business Imagery (lg:col-span-6) */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden border border-blue-800 shadow-xl relative aspect-[4/5] group">
                  <img
                    src="https://img.freepik.com/free-photo/african-man-black-suit-international-partners_1157-
45546.jpg?size=626&amp;ext=jpg&amp;ga=GA1.1.233311484.1695720566&amp;semt=ais"
                    alt="African HR Director conducting strategic executive planning"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071938] via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3 text-xs">
                    <span className="font-bold text-[#c8f526] block">
                      Lagos, Nigeria
                    </span>
                    <span className="text-slate-200 text-[11px]">
                      NextHR Solutions Advisory Session
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#0b214a] border border-blue-800 text-center">
                  <div className="text-2xl sm:text-3xl font-black text-[#c8f526]">
                    14+
                  </div>
                  <div className="text-xs text-slate-300 font-semibold">
                    African Tax Jurisdictions Built-In
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-6">
                <div className="p-4 rounded-2xl bg-[#0b214a] border border-blue-800 text-center">
                  <div className="text-2xl sm:text-3xl font-black text-white">
                    450k+
                  </div>
                  <div className="text-xs text-slate-300 font-semibold">
                    Pay Slips Processed Monthly
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden border border-blue-800 shadow-xl relative aspect-[4/5] group">
                  <img
                    src="https://img.freepik.com/premium-photo/team-young-african-people-office-work-table-with-laptop-
with-handshake_219728-4720.jpg?size=626&amp;ext=jpg&amp;ga=GA1.1.233311484.1695720566&amp;semt=ais"
                    alt="African technology and software developers collaborating in modern tech hub"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071938] via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3 text-xs">
                    <span className="font-bold text-[#c8f526] block">
                      Nairobi, Kenya
                    </span>
                    <span className="text-slate-200 text-[11px]">
                      AfriPay Systems Implementation Team
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
