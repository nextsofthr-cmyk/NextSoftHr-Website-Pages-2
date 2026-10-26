import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TableOfContents, TERMS_PANEL_ID } from './components/TableOfContents';
import { TermsContent } from './components/TermsContent';
import { ContactCTA } from './components/ContactCTA';
import { Footer } from './components/Footer';
import { PrivacyModal } from './components/PrivacyModal';
import { ContactModal } from './components/ContactModal';
import { LiveChatWidget } from './components/LiveChatWidget';
import { TERMS_SECTIONS } from './data/termsData';
import { useLanguage, LanguageProvider } from './i18n/LanguageContext';
import { ArrowUp, ChevronRight, ShieldCheck, Scale, Search, Check } from 'lucide-react';
import { isPanelScrolling, scrollToSection, usePinnedScrollPanel } from '../../utils/scrollPanel';

function TermsContentPage() {
  const { t, sections } = useLanguage();
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nextsofthr_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [summaryMode, setSummaryMode] = useState(false);
  const [counselMode, setCounselMode] = useState(false);
  const [activeId, setActiveId] = useState(TERMS_SECTIONS[0].id);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Modals
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  // Sync theme with document element and localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('nextsofthr_theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Page scrolling drives the terms panel on desktop
  usePinnedScrollPanel(TERMS_PANEL_ID);

  // Scroll listener for reading progress & back-to-top
  useEffect(() => {
    const panel = document.getElementById(TERMS_PANEL_ID);

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      // Reading progress follows the content panel on desktop, the window on mobile
      const scroller = isPanelScrolling(panel) ? panel : document.documentElement;
      const scrollable = scroller.scrollHeight - scroller.clientHeight;
      const scroll = scrollable > 0 ? (scroller.scrollTop / scrollable) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, scroll)));
      setShowBackToTop(totalScroll > 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    panel?.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      panel?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // IntersectionObserver to observe sections and highlight the current one in the TOC
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -65% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    TERMS_SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Keyboard shortcut: Ctrl/Cmd + K to search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector<HTMLInputElement>(
          'input[aria-label="Search within Terms & Conditions"]'
        );
        searchInput?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter sections if search is entered
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return sections;
    const q = searchQuery.toLowerCase();
    return sections.filter(
      (sec) =>
        sec.title.toLowerCase().includes(q) ||
        sec.paragraphs.some((p) => p.toLowerCase().includes(q)) ||
        sec.summary.toLowerCase().includes(q) ||
        (sec.bulletPoints && sec.bulletPoints.some((b) => b.toLowerCase().includes(q))) ||
        (sec.definitions &&
          sec.definitions.some(
            (d) => d.term.toLowerCase().includes(q) || d.definition.toLowerCase().includes(q)
          ))
    );
  }, [searchQuery, sections]);

  const handleSelectSection = (id: string) => {
    setActiveId(id);
    scrollToSection(id, TERMS_PANEL_ID, 112);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] dark:bg-[#070d18] text-slate-800 dark:text-slate-100 transition-colors duration-200 antialiased">
      {/* Sticky Header */}
      <Header
        onContactClick={() => setContactModalOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Hero Section */}
      <Hero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        summaryMode={summaryMode}
        onToggleSummaryMode={() => setSummaryMode(!summaryMode)}
        counselMode={counselMode}
        onToggleCounselMode={() => setCounselMode(!counselMode)}
        totalMatches={filteredSections.length}
      />

      {/* Main Content Area: Two-Column Desktop Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        
        {/* Notice Banner if filtered */}
        {searchQuery && (
          <div className="mb-8 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/60 text-xs text-blue-900 dark:text-blue-200 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>
                {t.searchBannerShowing} <strong>{filteredSections.length}</strong> {t.searchBannerOf} {sections.length} {t.searchBannerMatching} &ldquo;{searchQuery}&rdquo;
              </span>
            </div>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-blue-700 dark:text-blue-300 font-semibold hover:underline cursor-pointer"
            >
              {t.clearSearchFilter}
            </button>
          </div>
        )}

        <div data-scroll-track>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start lg:sticky lg:top-28 lg:h-[calc(100vh-8.5rem)]">
          
          {/* Left Column: Sticky "On This Page" Navigation */}
          <TableOfContents
            sections={sections}
            activeId={activeId}
            onSelectSection={handleSelectSection}
            scrollProgress={scrollProgress}
          />

          {/* Right Column: Complete Terms & Conditions Document, page scroll moves it inside a panel matching the sidebar height */}
          <div className="flex-1 w-full min-w-0 lg:self-stretch lg:relative">
          <div id={TERMS_PANEL_ID} className="lg:absolute lg:inset-0 lg:overflow-hidden">
          <div>
            {filteredSections.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Clauses Found</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                  No terms matched your query &ldquo;{searchQuery}&rdquo;. Try searching for general terms like &ldquo;payroll&rdquo;, &ldquo;data&rdquo;, &ldquo;termination&rdquo;, or &ldquo;liability&rdquo;.
                </p>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition cursor-pointer"
                >
                  {t.clearSearchFilter}
                </button>
              </div>
            ) : (
              <TermsContent
                sections={filteredSections}
                searchQuery={searchQuery}
                summaryMode={summaryMode}
                counselMode={counselMode}
                onOpenPrivacy={() => setPrivacyModalOpen(true)}
                onOpenContact={() => setContactModalOpen(true)}
              />
            )}

            {/* Bottom Contact CTA */}
            <ContactCTA onOpenContact={() => setContactModalOpen(true)} />
          </div>
          </div>
          </div>

        </div>
        </div>
      </main>

      {/* Floating Back to Top Button (positioned neatly above the Live Chat button) */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-22 right-6 z-40 p-2.5 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 no-print cursor-pointer active:scale-95"
          title={t.floatingBackToTop}
          aria-label={t.floatingBackToTop}
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Floating Live Chat Widget */}
      <LiveChatWidget
        onSelectSection={handleSelectSection}
        onOpenPrivacy={() => setPrivacyModalOpen(true)}
        onOpenContact={() => setContactModalOpen(true)}
      />

      {/* Premium Multi-Column SaaS Footer */}
      <Footer
        onOpenPrivacy={() => setPrivacyModalOpen(true)}
        onOpenContact={() => setContactModalOpen(true)}
      />

      {/* Modals */}
      <PrivacyModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
      />

      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <TermsContentPage />
    </LanguageProvider>
  );
}
