import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { BRAND, NAV_LINKS } from '../data/contentData';

interface HeaderProps {
  onOpenDemo: () => void;
  onOpenContact: () => void;
  onOpenGetStarted: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenDemo,
  onOpenContact,
  onOpenGetStarted,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Utility Announcement Bar */}
      <div className="bg-[#0A2540] text-slate-300 text-xs py-2 px-4 border-b border-blue-900/40 relative z-50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-[#84CC16]/20 text-[#84CC16] px-2 py-0.5 rounded-full font-semibold text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5" />
              Pan-African & Global Ready
            </span>
            <span className="hidden sm:inline text-slate-400">
              HR, Multi-Currency Payroll & Business Operations
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${BRAND.phone}`}
              className="inline-flex items-center gap-1.5 hover:text-[#84CC16] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#84CC16]" />
              <span className="font-medium">{BRAND.phoneDisplay}</span>
            </a>
            <span className="text-slate-600">|</span>
            <button
              onClick={onOpenContact}
              className="hover:text-white transition-colors"
            >
              Support & Inquiries
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-100 py-3.5'
            : 'bg-white border-b border-slate-100 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#hero" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0B3B73] to-[#0A2540] flex items-center justify-center shadow-md shadow-blue-950/10 border border-blue-800/20 group-hover:scale-105 transition-transform">
              <span className="text-white font-extrabold text-xl tracking-tight">N</span>
              <span className="w-2 h-2 rounded-full bg-[#84CC16] -ml-1 -mt-3 ring-2 ring-white"></span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold tracking-tight text-[#0A2540] flex items-center">
                Next<span className="text-[#0B3B73]">Softhr</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider -mt-1">
                HR • Payroll • Operations
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  link.isCurrent
                    ? 'text-[#0B3B73] font-semibold bg-blue-50/80'
                    : 'text-slate-600 hover:text-[#0B3B73] hover:bg-slate-50'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onOpenDemo}
              className="text-sm font-semibold text-[#0A2540] hover:text-[#0B3B73] px-3.5 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Sign In
            </button>

            <button
              onClick={onOpenGetStarted}
              className="inline-flex items-center justify-center gap-2 bg-[#84CC16] hover:bg-[#74be12] text-[#0A2540] text-sm font-bold px-5 py-2.5 rounded-lg shadow-sm hover:shadow transition-all group cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl">
            <div className="grid grid-cols-2 gap-2 pt-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium ${
                    link.isCurrent
                      ? 'text-[#0B3B73] font-bold bg-blue-50'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDemo();
                }}
                className="w-full text-center py-2.5 rounded-lg text-sm font-semibold text-[#0A2540] bg-slate-100"
              >
                Sign In / Book Demo
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenGetStarted();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold bg-[#84CC16] text-[#0A2540] shadow"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
