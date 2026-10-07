import { useState } from 'react';
import { 
  ChevronDown, ArrowRight, Play, Shield, Globe, 
  Sparkles, CheckCircle2, Lock, Search, Mail, Coins 
} from 'lucide-react';
import { FAQ_ITEMS } from '../data/mockData';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSelector } from './LanguageSelector';
import { CurrencySelector } from './CurrencySelector';
import { useLanguage } from '../context/LanguageContext';

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
            <button
              id="final-get-started-cta"
              onClick={onOpenGetStarted}
              className="w-full sm:w-auto px-8 py-3.5 text-base font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 group hover:-translate-y-0.5"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4 text-lime-400 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              id="final-book-demo-cta"
              onClick={onOpenDemo}
              className="w-full sm:w-auto px-7 py-3.5 text-base font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 text-blue-600 fill-blue-600/20" />
              <span>Book a Demo</span>
            </button>

            <button
              id="final-expert-cta"
              onClick={onOpenExpert}
              className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-lime-400 hover:text-lime-300 transition-colors flex items-center justify-center gap-1.5"
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

      {/* Comprehensive Global Footer */}
      <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
            
            {/* Col 1: Brand */}
            <div className="col-span-2 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center font-extrabold text-white text-base shadow-sm ring-2 ring-lime-400">
                  N
                </div>
                <span className="font-display text-xl font-extrabold tracking-tight text-white">
                  Next<span className="text-lime-400">Soft</span><span className="text-blue-500">hr</span>
                </span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
                NextSofthr is the modern global HR, payroll and business management platform that helps companies streamline workforce operations, automate compliance, and empower employees worldwide.
              </p>
              <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                <Globe className="w-3.5 h-3.5 text-lime-400" />
                <span>Global HQ: London • New York • Singapore • Zurich</span>
              </div>
            </div>

            {/* Col 2: Platform Modules */}
            <div>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">Platform</h4>
              <ul className="space-y-2">
                <li><a href="#core-hr" className="hover:text-white transition-colors">Core HR</a></li>
                <li><a href="#attendance" className="hover:text-white transition-colors">Time & Attendance</a></li>
                <li><a href="#shifts" className="hover:text-white transition-colors">Shifts & Scheduling</a></li>
                <li><a href="#leave" className="hover:text-white transition-colors">Leave Management</a></li>
                <li><a href="#payroll" className="hover:text-white transition-colors">Global Payroll</a></li>
                <li><a href="#talent" className="hover:text-white transition-colors">Talent Acquisition</a></li>
                <li><a href="#business-ops" className="hover:text-white transition-colors">CRM & Finance</a></li>
                <li><a href="#ai-assistant" className="hover:text-white transition-colors">AI Assistant</a></li>
              </ul>
            </div>

            {/* Col 3: Solutions */}
            <div>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">Solutions</h4>
              <ul className="space-y-2">
                <li><a href="#global" className="hover:text-white transition-colors">Micro Businesses (1-9)</a></li>
                <li><a href="#global" className="hover:text-white transition-colors">Small Businesses (10-49)</a></li>
                <li><a href="#global" className="hover:text-white transition-colors">Mid-Sized (50-249)</a></li>
                <li><a href="#global" className="hover:text-white transition-colors">Enterprise (250+)</a></li>
                <li><a href="#global" className="hover:text-white transition-colors">Global & Remote Teams</a></li>
                <li><a href="#self-service" className="hover:text-white transition-colors">Employee Self-Service</a></li>
              </ul>
            </div>

            {/* Col 4: Services */}
            <div>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">Services</h4>
              <ul className="space-y-2">
                <li><a href="#services" className="hover:text-white transition-colors">Payroll Outsourcing</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">HR Administration</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Tax & Compliance Filing</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">HR Strategy Consulting</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Employee Handbooks</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Compensation Design</a></li>
              </ul>
            </div>

            {/* Col 5: Company & Security */}
            <div>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">Trust & Security</h4>
              <ul className="space-y-2">
                <li><a href="#security" className="hover:text-white transition-colors">Security Architecture</a></li>
                <li><a href="#security" className="hover:text-white transition-colors">GDPR & Privacy</a></li>
                <li><a href="#security" className="hover:text-white transition-colors">SOC 2 Compliance</a></li>
                <li><a href="#integrations" className="hover:text-white transition-colors">App Integrations</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">Knowledge Base</a></li>
                <li><a href="#savings-calculator" className="hover:text-lime-400 transition-colors">HR Savings Calculator</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing & Plans</a></li>
              </ul>
            </div>

          </div>

          {/* Currency, Theme Appearance & Language Selector in Footer */}
          <div className="pt-8 pb-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                  <Coins className="w-3.5 h-3.5 text-lime-400" />
                  <span>Currency:</span>
                </span>
                <CurrencySelector variant="footer" />
              </div>
              <div className="hidden sm:block h-4 w-px bg-slate-800" />
              <div className="flex items-center gap-2">
                <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-lime-400" />
                  <span>{dict.nav.language}:</span>
                </span>
                <LanguageSelector variant="footer" />
              </div>
              <div className="hidden sm:block h-4 w-px bg-slate-800" />
              <div className="flex items-center gap-2">
                <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-lime-400" />
                  <span>{dict.footer.themeAppearance}:</span>
                </span>
                <ThemeToggle variant="segmented" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-[11px]">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 ring-2 ring-lime-400"></span>
              <span>NextSofthr Palette: Deep Navy & Charcoal with Primary Blue & Lemon Green</span>
            </div>
          </div>

          {/* Trust Badges & Compliance Bar */}
          <div className="pt-6 pb-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-400">
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-1.5 text-slate-300">
                <Shield className="w-3.5 h-3.5 text-lime-400" /> ISO 27001 Certified
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <Lock className="w-3.5 h-3.5 text-lime-400" /> 256-Bit SSL Encrypted
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-lime-400" /> GDPR & Statutory Audit Ready
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-lime-400" /> SOC 2 Type II
              </span>
            </div>

            <div>
              © 2026 NextSofthr Inc. All rights reserved. Empowering organizations globally.
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
};
