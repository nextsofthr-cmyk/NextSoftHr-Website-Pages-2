/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TableOfContents, TOC_ENTRIES, POLICY_PANEL_ID } from './components/TableOfContents';
import { PolicyContent } from './components/PolicyContent';
import { TrustSection } from './components/TrustSection';
import { Footer } from './components/Footer';
import { CookiePreferencesModal } from './components/CookiePreferencesModal';
import { PrivacyRequestModal } from './components/PrivacyRequestForm';
import { AdminPolicyEditorModal } from './components/AdminPolicyEditorModal';
import { LiveChatWidget } from './components/LiveChatWidget';
import { useTheme } from './hooks/useTheme';
import { useLanguage } from './hooks/useLanguage';
import { getReadingLine, usePinnedScrollPanel } from '../../utils/scrollPanel';

export default function App() {
  const { theme, resolvedTheme, toggleTheme } = useTheme();
  const { language, setLanguage, t, options } = useLanguage();

  const [activeSection, setActiveSection] = useState('introduction');
  const [searchQuery, setSearchQuery] = useState('');
  const [lastUpdatedDate, setLastUpdatedDate] = useState('September 24, 2026');
  const [version, setVersion] = useState('Version 2.4');

  // Modals
  const [cookieModalOpen, setCookieModalOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  // Page scrolling drives the policy panel on desktop
  usePinnedScrollPanel(POLICY_PANEL_ID);

  // Scrollspy for the Table of Contents (content panel on desktop, window on mobile)
  useEffect(() => {
    const panel = document.getElementById(POLICY_PANEL_ID);

    const handleScroll = () => {
      const readingLine = getReadingLine(POLICY_PANEL_ID);

      for (let i = TOC_ENTRIES.length - 1; i >= 0; i--) {
        const item = TOC_ENTRIES[i];
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= readingLine) {
          setActiveSection(item.id);
          return;
        }
      }
      setActiveSection(TOC_ENTRIES[0].id);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    panel?.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      panel?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleAdminSave = (newDate: string, newVersion: string) => {
    setLastUpdatedDate(newDate);
    setVersion(newVersion);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#090e1a] text-slate-800 dark:text-slate-100 selection:bg-[#84CC16]/25 selection:text-blue-950 dark:selection:text-[#A3E635] font-sans transition-colors duration-200">
      {/* Top Header with Theme Toggle & Language Selector */}
      <Header
        theme={theme}
        resolvedTheme={resolvedTheme}
        onToggleTheme={toggleTheme}
        currentLanguage={language}
        onSelectLanguage={setLanguage}
        languageOptions={options}
        t={t}
        onOpenPrivacyModal={() => setPrivacyModalOpen(true)}
        onOpenAdminModal={() => setAdminModalOpen(true)}
      />

      {/* Hero Section */}
      <Hero
        lastUpdatedDate={lastUpdatedDate}
        version={version}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenCookiesModal={() => setCookieModalOpen(true)}
        onOpenPrivacyModal={() => setPrivacyModalOpen(true)}
        onOpenAdminModal={() => setAdminModalOpen(true)}
        t={t}
      />

      {/* Main Content Two-Column Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div data-scroll-track>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative lg:sticky lg:top-28 lg:h-[calc(100vh-8.5rem)] lg:grid-rows-[minmax(0,1fr)]">
          {/* Left Column: Table of Contents — its height sets the height of the row (3 cols on desktop) */}
          <div className="lg:col-span-4 xl:col-span-3 lg:h-full z-20">
            <TableOfContents
              activeId={activeSection}
              onSelect={(id) => setActiveSection(id)}
              t={t}
            />
          </div>

          {/* Right Column: 16 Detailed Policy Sections (8-9 cols on desktop), scrolls inside to match the sidebar height */}
          <div className="lg:col-span-8 xl:col-span-9 lg:self-stretch lg:relative">
            <div
              id={POLICY_PANEL_ID}
              className="lg:absolute lg:inset-0 lg:overflow-hidden bg-white dark:bg-[#0c1527] rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs transition-colors duration-200"
            >
              <div className="p-6 sm:p-10">
                <PolicyContent
                  lastUpdatedDate={lastUpdatedDate}
                  version={version}
                  searchQuery={searchQuery}
                  onOpenCookiesModal={() => setCookieModalOpen(true)}
                  onOpenPrivacyModal={() => setPrivacyModalOpen(true)}
                  t={t}
                />
              </div>
            </div>
          </div>
        </div>
        </div>
      </main>

      {/* Trust & Security Proof Section */}
      <TrustSection t={t} />

      {/* SaaS Global Footer with Language Selector */}
      <Footer
        onOpenCookiesModal={() => setCookieModalOpen(true)}
        onOpenPrivacyModal={() => setPrivacyModalOpen(true)}
        currentLanguage={language}
        onSelectLanguage={setLanguage}
        languageOptions={options}
        t={t}
      />

      {/* Interactive Modals */}
      <CookiePreferencesModal
        isOpen={cookieModalOpen}
        onClose={() => setCookieModalOpen(false)}
        t={t}
      />

      <PrivacyRequestModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
        t={t}
      />

      <AdminPolicyEditorModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        lastUpdatedDate={lastUpdatedDate}
        version={version}
        onSave={handleAdminSave}
        t={t}
      />

      {/* Floating Live Chat Support Widget */}
      <LiveChatWidget
        t={t}
        onOpenPrivacyModal={() => setPrivacyModalOpen(true)}
      />
    </div>
  );
}
