import React from 'react';
import { 
  HeartHandshake, 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  Coins, 
  Award, 
  Users, 
  ShieldCheck,
  TrendingUp
} from 'lucide-react';

interface PartnersSectionProps {
  onOpenLeadModal: (service?: string) => void;
}

export const PartnersSection: React.FC<PartnersSectionProps> = ({ onOpenLeadModal }) => {
  const partnerTiers = [
    {
      title: 'Accounting & CPA Firms',
      desc: 'Offer managed gross-to-net payroll and statutory compliance to your corporate audit and tax advisory clients without hiring payroll staff.',
      perks: ['Dedicated Partner Portal', 'Wholesale Revenue Share / Margins', 'Co-Branded Client Payslips']
    },
    {
      title: 'Independent HR Consultants',
      desc: 'Supercharge your advisory practice with NextSofthr enterprise cloud platform. You handle strategy; we execute operational payroll & contracts.',
      perks: ['Platform Access For Your Clients', 'Referral Commissions', 'Executive Reporting Decks']
    },
    {
      title: 'Staffing & Recruitment Agencies',
      desc: 'Provide Employer of Record (EOR) and managed payroll services for your placed permanent and contingent talent across Africa.',
      perks: ['Turnkey Contractor Payouts', 'Statutory Tax Shielding', 'Multi-Country Cross Border Rails']
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0A1E4A] via-[#0F2D6B] to-[#0A1E4A] text-white pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-lime-400 uppercase tracking-wider">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>NextSofthr Partner Ecosystem</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            “Partner With NextSofthr <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 to-emerald-400">
              to Deliver Smarter HR Services.”
            </span>
          </h1>

          <p className="text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Expand your firm's service offerings. Join accounting practices, HR consultancies, and staffing agencies scaling their recurring revenues with NextSofthr.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenLeadModal('Partner Program Application')}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-lime-400 to-[#9AE616] hover:from-lime-300 hover:to-lime-400 text-slate-950 font-bold text-base rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <span>Become a Partner</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>
      </section>

      {/* Partner Profiles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {partnerTiers.map((tier, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-xl transition-all space-y-5 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-slate-900">{tier.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{tier.desc}</p>
                
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <span className="text-xs font-bold text-[#0F2D6B] uppercase tracking-wider">Partner Benefits:</span>
                  {tier.perks.map((p, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-lime-600 shrink-0" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onOpenLeadModal(`Partner: ${tier.title}`)}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Apply as {tier.title}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
