/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from '../../components/refund-policy/Navbar';
import { Hero } from '../../components/refund-policy/Hero';
import { PolicySummaryCard } from '../../components/refund-policy/PolicySummaryCard';
import { TableOfContents } from '../../components/refund-policy/TableOfContents';
import { PolicySectionCard } from '../../components/refund-policy/PolicySectionCard';
import { FaqSection } from '../../components/refund-policy/FaqSection';
import { ContactSection } from '../../components/refund-policy/ContactSection';
import { Footer } from '../../components/refund-policy/Footer';
import { RefundRequestModal } from '../../components/refund-policy/RefundRequestModal';
import { PartnerSupportModal } from '../../components/refund-policy/PartnerSupportModal';
import { LegalDocModal } from '../../components/refund-policy/LegalDocModal';
import { POLICY_SECTIONS, POLICY_META } from '../../data/refund-policy/policyData';
import { NextSoftLogo } from '../../components/refund-policy/NextSoftLogo';
import { LiveSupportChat } from '../../components/refund-policy/LiveSupportChat';
import { SupportedLanguage, TRANSLATIONS } from '../../data/refund-policy/translations';
import { ArrowUp, FileText } from 'lucide-react';

export default function RefundPolicyPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeSectionId, setActiveSectionId] = useState('section-1');
  const [refundModalOpen, setRefundModalOpen] = useState(false);
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [legalDocType, setLegalDocType] = useState<'terms' | 'privacy' | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Multi-Language state supporting English, French, Portuguese, Spanish
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('nextsoft_lang');
      if (savedLang === 'fr' || savedLang === 'pt' || savedLang === 'es' || savedLang === 'en') {
        return savedLang;
      }
      // Check browser language
      const browserLang = navigator.language.slice(0, 2);
      if (browserLang === 'fr' || browserLang === 'pt' || browserLang === 'es') {
        return browserLang;
      }
    }
    return 'en';
  });

  const handleSelectLang = (lang: SupportedLanguage) => {
    setCurrentLang(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('nextsoft_lang', lang);
    }
  };

  const t = TRANSLATIONS[currentLang];

  // Theme toggle state with system preference & localStorage sync
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Scrollspy & Back to Top listener
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      // Find current section in view
      const scrollPosition = window.scrollY + 200;
      for (const section of POLICY_SECTIONS) {
        const element = document.getElementById(section.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSectionId(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleActionClick = (actionType: string) => {
    if (actionType === 'refund-modal') {
      setRefundModalOpen(true);
    } else if (actionType === 'partner-modal') {
      setPartnerModalOpen(true);
    } else if (actionType === 'support-modal') {
      const contactEl = document.getElementById('contact-desk');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (actionType === 'privacy-link') {
      setLegalDocType('privacy');
    } else if (actionType === 'terms-link') {
      setLegalDocType('terms');
    }
  };

  const filteredSections = POLICY_SECTIONS.filter((sec) => {
    const matchesCategory = selectedCategory === 'All' || sec.category === selectedCategory;
    const matchesQuery =
      searchQuery.trim() === '' ||
      sec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sec.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sec.content.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0B1120] text-slate-800 dark:text-slate-100 transition-colors duration-200">
      {/* Print-Only Header */}
      <div className="hidden print-header p-8 border-b-2 border-slate-900 mb-8">
        <div className="flex items-center justify-between">
          <NextSoftLogo size="lg" showTagline />
          <div className="text-right text-xs text-slate-600 space-y-0.5">
            <div className="font-bold text-slate-900 text-sm">Official Commercial Policy Document</div>
            <div>www.nextsofthr.org | +2349158482622</div>
            <div>Effective: {POLICY_META.effectiveDate} | Version: {POLICY_META.version}</div>
          </div>
        </div>
      </div>

      {/* Top Navbar with Language Selector & Theme Toggle */}
      <Navbar
        onOpenRefundModal={() => setRefundModalOpen(true)}
        onOpenPartnerModal={() => setPartnerModalOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
        currentLang={currentLang}
        onSelectLang={handleSelectLang}
      />

      {/* Hero Section */}
      <Hero
        onOpenSupportModal={() => {
          const contactEl = document.getElementById('contact-desk');
          if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenPartnerModal={() => setPartnerModalOpen(true)}
        onPrintPolicy={handlePrint}
        currentLang={currentLang}
      />

      {/* Top Interactive Policy Summary Card */}
      <PolicySummaryCard currentLang={currentLang} />

      {/* Main 2-Column Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Anchor Targets for Nav Links */}
        <div id="overview" className="scroll-mt-24" />
        <div id="customer-policy" className="scroll-mt-24" />
        <div id="partner-policy" className="scroll-mt-24" />
        <div id="commercial-terms" className="scroll-mt-24" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Content: 25 Detailed Policy Sections */}
          <div className="lg:col-span-8 space-y-8">
            {/* Filter Status Feedback */}
            {(searchQuery.trim() !== '' || selectedCategory !== 'All') && (
              <div className="p-4 bg-slate-50 dark:bg-[#131D31] border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 transition-colors">
                <div>
                  {currentLang === 'fr' ? (
                    <>Affichage de <strong>{filteredSections.length}</strong> clauses sur 25</>
                  ) : currentLang === 'pt' ? (
                    <>A mostrar <strong>{filteredSections.length}</strong> de 25 cláusulas</>
                  ) : currentLang === 'es' ? (
                    <>Mostrando <strong>{filteredSections.length}</strong> de 25 cláusulas</>
                  ) : (
                    <>Showing <strong>{filteredSections.length}</strong> of 25 clauses</>
                  )}
                  {selectedCategory !== 'All' && <span> · <strong>{selectedCategory}</strong></span>}
                  {searchQuery && <span> · &ldquo;<strong>{searchQuery}</strong>&rdquo;</span>}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="text-xs font-semibold text-[#0A3B7B] dark:text-[#38BDF8] hover:underline"
                >
                  {currentLang === 'fr' ? 'Réinitialiser' : currentLang === 'pt' ? 'Redefinir' : currentLang === 'es' ? 'Restablecer' : 'Reset Filters'}
                </button>
              </div>
            )}

            {filteredSections.length === 0 ? (
              <div className="p-12 text-center bg-slate-50 dark:bg-[#131D31] border border-slate-200 dark:border-slate-800 rounded-2xl transition-colors">
                <FileText className="w-12 h-12 text-slate-400 dark:text-slate-500 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                  {currentLang === 'fr' ? 'Aucune Clause Trouvée' : currentLang === 'pt' ? 'Nenhuma Cláusula Encontrada' : currentLang === 'es' ? 'No se Encontraron Cláusulas' : 'No Clauses Found'}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
                  {t.tableOfContents.noClausesMatch}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="mt-4 px-4 py-2 bg-[#0A3B7B] hover:bg-[#1E40AF] text-white text-xs font-semibold rounded-lg"
                >
                  {currentLang === 'fr' ? 'Voir Toutes les 25 Clauses' : currentLang === 'pt' ? 'Ver Todas as 25 Cláusulas' : currentLang === 'es' ? 'Ver las 25 Cláusulas' : 'View All 25 Clauses'}
                </button>
              </div>
            ) : (
              filteredSections.map((section) => (
                <PolicySectionCard
                  key={section.id}
                  section={section}
                  onActionClick={handleActionClick}
                />
              ))
            )}
          </div>

          {/* Sticky Sidebar: Table of Contents & Interactive Search */}
          <div className="hidden lg:block lg:col-span-4 sticky top-24">
            <TableOfContents
              activeSectionId={activeSectionId}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onPrintPolicy={handlePrint}
              currentLang={currentLang}
            />
          </div>
        </div>
      </main>

      {/* Interactive FAQ Section with all 15 questions */}
      <FaqSection currentLang={currentLang} />

      {/* Support / Contact Section */}
      <ContactSection
        onOpenSupportModal={() => {
          const contactEl = document.getElementById('contact-desk');
          if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenPartnerModal={() => setPartnerModalOpen(true)}
        currentLang={currentLang}
      />

      {/* Footer */}
      <Footer
        onOpenTermsModal={() => setLegalDocType('terms')}
        onOpenPrivacyModal={() => setLegalDocType('privacy')}
        onOpenRefundModal={() => setRefundModalOpen(true)}
        onOpenPartnerModal={() => setPartnerModalOpen(true)}
        currentLang={currentLang}
      />

      {/* Floating Back to Top Button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-22 right-6 z-30 p-2.5 bg-white dark:bg-[#1E293B] text-[#0A3B7B] dark:text-[#38BDF8] border border-slate-200 dark:border-slate-700 rounded-full shadow-md hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-[#0A3B7B] dark:hover:border-slate-600 transition-all focus:outline-none focus:ring-2 focus:ring-[#84CC16]"
          aria-label="Back to top"
          title="Back to top"
        >
          <ArrowUp className="w-4 h-4 text-[#84CC16]" />
        </button>
      )}

      {/* Floating Live Chat Support Desk */}
      <LiveSupportChat
        onOpenRefundModal={() => setRefundModalOpen(true)}
        onOpenPartnerModal={() => setPartnerModalOpen(true)}
        currentLang={currentLang}
      />

      {/* Interactive Modals */}
      <RefundRequestModal
        isOpen={refundModalOpen}
        onClose={() => setRefundModalOpen(false)}
      />

      <PartnerSupportModal
        isOpen={partnerModalOpen}
        onClose={() => setPartnerModalOpen(false)}
      />

      <LegalDocModal
        type={legalDocType}
        onClose={() => setLegalDocType(null)}
      />
    </div>
  );
}
