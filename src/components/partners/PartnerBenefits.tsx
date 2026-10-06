import React from 'react';
import { 
  Zap, 
  BookOpen, 
  Share2, 
  DollarSign, 
  Users, 
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface PartnerBenefitsProps {
  onApplyClick: () => void;
}

export const PartnerBenefits: React.FC<PartnerBenefitsProps> = ({ onApplyClick }) => {
  const { strings, isRTL } = useLanguage();
  const bStrings = strings.benefits;

  const benefits = [
    {
      id: 'sell-faster',
      title: 'Sell Faster & Close Deals',
      description: 'Product demos, battlecards, and sales tools designed to accelerate enterprise sales cycles.',
      icon: Zap,
      points: ['Pre-configured demo environments', 'Battlecards & objection scripts', 'Customizable proposal decks']
    },
    {
      id: 'learn-more',
      title: 'Academy & Certification',
      description: 'Continuous product and HR technology training to position your team as certified industry authorities.',
      icon: BookOpen,
      points: ['Certified HR & Payroll Academy', 'Weekly technical masterclasses', 'Product roadmap sneak peeks']
    },
    {
      id: 'market-better',
      title: 'Co-Marketing & Growth',
      description: 'Regional campaign assets, promotional templates, and joint event sponsorship funds.',
      icon: Share2,
      points: ['Ready-to-post creatives', 'Co-branded event sponsorships', 'Joint press release templates']
    },
    {
      id: 'earn-recurring',
      title: 'Compounding Revenue Share',
      description: 'Build long-term recurring commission from active customer subscriptions across Africa and globally.',
      icon: DollarSign,
      points: ['Up to 40% monthly revenue share', 'Automated monthly bank payouts', 'No commission earnings cap']
    },
    {
      id: 'support-customers',
      title: 'Dedicated Customer Success',
      description: 'Onboarding and technical deployment resources to guarantee 98%+ client retention and satisfaction.',
      icon: Users,
      points: ['Dedicated customer success leads', 'Bulk data migration assistants', 'Regional payroll compliance desk']
    },
    {
      id: 'grow-business',
      title: 'Strategic Firm Growth',
      description: 'Expand your advisory portfolio with cutting-edge HR, payroll, and business management software.',
      icon: TrendingUp,
      points: ['Complementary advisory upsells', 'High-margin implementation fees', 'Access to exclusive enterprise RFPs']
    }
  ];

  return (
    <section id="benefits" className="py-24 bg-slate-50 dark:bg-[#051329] relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/60 border border-blue-200 dark:border-blue-700/60 text-xs font-bold text-blue-800 dark:text-[#B8F010] mb-4">
            <span>{bStrings.tag}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            {bStrings.title}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            {bStrings.subtitle}
          </p>
        </div>

        {/* 6 Premium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.id}
                className="group rounded-2xl bg-white dark:bg-gradient-to-b dark:from-[#071D3E] dark:to-[#040E1F] border border-slate-200/90 dark:border-blue-800/80 p-7 flex flex-col justify-between hover:border-blue-500 dark:hover:border-[#B8F010] transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-xl dark:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-blue-950/70"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-700/80 flex items-center justify-center mb-6 group-hover:border-[#B8F010] transition-colors shadow-sm">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-[#B8F010] group-hover:scale-110 transition-transform" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-200 transition-colors">
                    {b.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    {b.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-blue-900/60">
                    {b.points.map((pt, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-[#B8F010]" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-blue-900/60 flex items-center justify-between text-xs font-semibold text-blue-700 dark:text-[#B8F010]">
                  <span>Partner Enabler</span>
                  <span className="text-slate-400 group-hover:text-blue-600 dark:group-hover:text-white transition-colors">→</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <button
            onClick={onApplyClick}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#B8F010] text-[#040E1F] font-extrabold text-sm hover:bg-[#CBFF1A] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#B8F010]/20"
          >
            <span>{strings.nav.applyNow}</span>
            <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
          </button>
        </div>

      </div>
    </section>
  );
};
