import { useState } from 'react';
import { 
  ChevronDown, ArrowRight, Play, Calendar, Shield, Globe, 
  Sparkles, CheckCircle2, Lock, Search, Mail, Coins 
} from 'lucide-react';
import { FAQ_ITEMS } from '../data/mockData';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSelector } from './LanguageSelector';
import { CurrencySelector } from './CurrencySelector';
import { useLanguage } from '../context/LanguageContext';
import { GlobalFooter } from '../../../src/components/GlobalFooter';

interface FaqAndFooterProps {
  onOpenDemo: () => void;
  onOpenGetStarted: () => void;
  onOpenExpert: () => void;
}

export const FaqAndFooter = ({
  onOpenDemo,
  onOpenGetStarted,
  onOpenExpert
}: FaqAndFooterProps) => {
  const { dict } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = FAQ_ITEMS.filter(
    (item) =>
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 uppercase tracking-wider mb-3 inline-block">
              {dict.faq.badge}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {dict.faq.headline}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2">
              {dict.faq.description}
            </p>

            {/* Quick Search */}
            <div className="mt-6 max-w-md mx-auto relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={dict.faq.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
              />
            </div>
          </div>

          {/* Accordion list */}
          <div className="space-y-3">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 dark:text-white"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3 bg-slate-50/50 dark:bg-slate-900/60">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Final Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-slate-900 to-blue-950 text-white relative overflow-hidden">
        
        {/* Glow background accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-lime-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lime-400/20 border border-lime-400/30 text-lime-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-lime-400" />
            Accelerate Your Workforce Transformation
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Ready to Modernize Your HR & Payroll?
          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
            Join hundreds of growing businesses and global companies using NextSofthr to manage their workforce with confidence.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 mt-8">
            <a
              id="final-get-started-cta"
              href="/signup"
              className="w-full sm:w-auto px-8 py-3.5 text-base font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 group hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 text-lime-400 group-hover:translate-x-1 transition-transform" />
            </a>

            <button
              id="final-book-demo-cta"
              onClick={onOpenDemo}
              className="w-full sm:w-auto px-7 py-3.5 text-base font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group hover:-translate-y-0.5 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-lime-400" />
              <span>Book a Demo</span>
            </button>

            <a
              id="final-explore-demo-cta"
              href="https://demo.scriptmaster.store/login"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 text-base font-bold text-slate-950 bg-[#84cc16] hover:bg-[#74be12] rounded-xl shadow-lg shadow-lime-500/25 transition-all flex items-center justify-center gap-2 group hover:-translate-y-0.5 cursor-pointer"
            >
              <Play className="w-4 h-4 text-slate-950 fill-current" />
              <span>Explore Free Demo</span>
              <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
            </a>

            <button
              id="final-expert-cta"
              onClick={onOpenExpert}
              className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-lime-400 hover:text-lime-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Talk to an HR & Payroll Expert</span>
              <span className="font-bold">→</span>
            </button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-lime-400" /> 14-Day Free Trial
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-lime-400" /> No Credit Card Required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-lime-400" /> White-Glove Data Migration
            </span>
          </div>
        </div>
      </section>

      {/* Global Unified Footer */}
      <GlobalFooter onOpenDemo={onOpenDemo} onOpenExpert={onOpenExpert} />
    </div>
  );
};
