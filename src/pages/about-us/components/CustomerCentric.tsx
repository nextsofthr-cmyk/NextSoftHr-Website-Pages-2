import React from 'react';
import {
  MessageSquareHeart,
  TrendingUp,
  GraduationCap,
  Sparkles,
  Headphones,
  CheckCircle2,
  RefreshCw,
  ArrowRight
} from 'lucide-react';

interface CustomerCentricProps {
  onOpenContact: () => void;
}

export const CustomerCentric: React.FC<CustomerCentricProps> = ({ onOpenContact }) => {
  const pillars = [
    {
      title: 'Customer Feedback',
      desc: 'Active listening sessions and user group forums across Nigerian, Kenyan, and Ghanaian business communities.',
      icon: MessageSquareHeart,
    },
    {
      title: 'Product Improvement',
      desc: 'Bi-weekly release cycles addressing specific local statutory amendments, banking file updates, and user requests.',
      icon: TrendingUp,
    },
    {
      title: 'Structured Training',
      desc: 'Live interactive walkthroughs for HR teams, payroll accountants, branch managers, and field staff.',
      icon: GraduationCap,
    },
    {
      title: 'Guided Onboarding',
      desc: 'White-glove data migration from historical Excel sheets or legacy software with zero payroll disruption.',
      icon: Sparkles,
    },
    {
      title: 'Human Support',
      desc: 'Responsive in-app chat, dedicated account managers, and direct phone assistance (+2349158482622).',
      icon: Headphones,
    },
    {
      title: 'Continuous Innovation',
      desc: 'Constantly introducing practical AI automation, geo-tracking intelligence, and multi-currency advancements.',
      icon: RefreshCw,
    },
  ];

  return (
    <section id="customer-centric" className="py-20 lg:py-28 bg-[#F8FAFC] dark:bg-[#06101E] border-b border-slate-200/80 dark:border-slate-800 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Authentic African HR Consultant Helping Client Team */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-blue-900/40 group">
              <img
                src="https://automation-saas-tailwind.pixels71.workers.dev/images/ns-avatar-12.jpg"
                alt="African HR consultant guiding a business team in modern conference room"
                className="w-full h-full object-cover min-h-[420px] max-h-[540px] group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540] via-[#0A2540]/30 to-transparent"></div>

              {/* Floating Testimonial / In-Field Interaction Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 dark:bg-[#0E2038]/95 backdrop-blur-md rounded-2xl p-5 border border-slate-200 dark:border-blue-900/50 shadow-xl transition-colors duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-full bg-[#0B3B73] dark:bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                    NS
                  </div>
                  <div>
                    <div className="font-bold text-xs text-[#0A2540] dark:text-white">
                      Hands-On Implementation & Partnership
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      On-site & virtual deployment for enterprise clients
                    </div>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 italic">
                  “We walk alongside our clients from day one—configuring shifts, verifying tax formulas, and ensuring every staff member is confident using the platform.”
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Customer-Centric Narrative & 6 Focus Pillars */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/50 text-xs font-bold text-[#0B3B73] dark:text-[#38BDF8]">
              <span className="w-2 h-2 rounded-full bg-[#84CC16]"></span>
              <span>Our Partnership Model</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A2540] dark:text-white tracking-tight leading-tight">
              We Build With Businesses, <br className="hidden sm:inline" />
              <span className="text-[#0B3B73] dark:text-[#38BDF8]">Not Just For Them</span>
            </h2>

            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              NextSofthr continuously focuses on understanding actual customer workflows,
              operational bottlenecks, and regulatory realities when developing every
              feature. We view our clients as co-architects of our platform.
            </p>

            {/* 6 Key Engagement Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="p-4 bg-white dark:bg-[#0E2038] rounded-xl border border-slate-200/80 dark:border-blue-900/40 shadow-sm hover:border-[#0B3B73]/30 dark:hover:border-blue-500 transition-all group"
                  >
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-[#162D4E] flex items-center justify-center text-[#0B3B73] dark:text-[#38BDF8] group-hover:bg-[#84CC16] group-hover:text-[#0A2540] dark:group-hover:text-[#0A2540] transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-xs text-[#0A2540] dark:text-white">
                        {pillar.title}
                      </h3>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed pl-9">
                      {pillar.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={onOpenContact}
                className="inline-flex items-center gap-2 bg-[#0B3B73] dark:bg-blue-600 hover:bg-[#0A2540] dark:hover:bg-blue-700 text-white text-xs font-bold px-5 py-3 rounded-xl shadow transition-all cursor-pointer"
              >
                <span>Talk to an Implementation Specialist</span>
                <ArrowRight className="w-4 h-4 text-[#84CC16]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
