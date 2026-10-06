import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const NewsletterSection: React.FC = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
  };

  const benefits = [
    'HR insights',
    'Payroll updates',
    'AI trends',
    'Workforce strategies',
    'Product updates',
  ];

  return (
    <section className="py-16 bg-[#0A3F7E] text-white relative overflow-hidden border-b border-[#082F60]">
      {/* Background Subtle Wave Accents */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
        backgroundSize: '24px 24px',
      }} />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-[#8EE000]/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-[#051A33] rounded-3xl p-8 sm:p-12 lg:p-16 border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Column (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#8EE000]">
                <Mail className="w-3.5 h-3.5" />
                <span>{t('newsletter.kicker', 'NextSoftHr Weekly Executive Dispatch')}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-heading">
                {t('newsletter.title', 'Stay Ahead of the Future of Work')}
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                {t('newsletter.subtitle', 'Get the latest HR, payroll, workforce technology and business-management insights delivered directly to your inbox.')}
              </p>


              {/* Benefits Checklist */}
              <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-200">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#8EE000] shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Form Column (5 cols) */}
            <div className="lg:col-span-5">
              {isSubscribed ? (
                <div className="bg-white/10 border border-[#8EE000]/40 rounded-2xl p-6 text-center space-y-2 animate-in fade-in duration-300">
                  <div className="w-12 h-12 rounded-full bg-[#8EE000] text-slate-950 flex items-center justify-center mx-auto font-bold">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white">You&apos;re Subscribed!</h3>
                  <p className="text-xs text-slate-300">
                    We&apos;ve sent a confirmation email to <span className="text-[#8EE000] font-mono">{email}</span>. Expect your first briefing this Thursday.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 bg-white/5 p-6 rounded-2xl border border-white/10">
                  <div className="space-y-1.5">
                    <label htmlFor="newsletter-email" className="block text-xs font-bold text-slate-200 font-mono">
                      {t('newsletter.emailLabel', 'Corporate Work Email')}
                    </label>
                    <input
                      id="newsletter-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('newsletter.emailLabel', 'Enter your corporate email')}
                      className="w-full px-4 py-3 text-sm rounded-xl bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8EE000] shadow-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl text-xs font-bold text-slate-950 bg-[#8EE000] hover:bg-[#9EF01A] transition-all flex items-center justify-center gap-2 shadow-md active:scale-[0.98] border border-[#7BC500]"
                  >
                    <span>{t('newsletter.subscribe', 'Subscribe to Insights')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-[11px] text-slate-400 text-center">
                    {t('newsletter.zeroSpam', 'Zero spam. Unsubscribe at any time with a single click.')}
                  </p>

                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
