import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategoryNav } from './components/CategoryNav';
import { FAQAccordion } from './components/FAQAccordion';
import { InstantAnswerBanner } from './components/InstantAnswerBanner';
import { SecuritySection } from './components/SecuritySection';
import { IntegrationsGrid } from './components/IntegrationsGrid';
import { StillHaveQuestions } from './components/StillHaveQuestions';
import { Footer } from './components/Footer';
import { AIAssistantModal } from './components/AIAssistantModal';
import { BookDemoModal } from './components/BookDemoModal';
import { ContactSupportModal } from './components/ContactSupportModal';
import { PricingModal } from './components/PricingModal';
import { LiveChatWidget } from './components/LiveChatWidget';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { FAQ_CATEGORIES } from './data/faqData';
import { Sparkles } from 'lucide-react';

function AppContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryId, setActiveCategoryId] = useState('all');

  // Modal States
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiInitialPrompt, setAiInitialPrompt] = useState('');
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [pricingModalOpen, setPricingModalOpen] = useState(false);

  const totalQuestions = FAQ_CATEGORIES.reduce((acc, cat) => acc + cat.questions.length, 0);

  const handleOpenAI = (prompt?: string) => {
    setAiInitialPrompt(prompt || '');
    setAiModalOpen(true);
  };

  const handleSelectCategory = (categoryId: string) => {
    setActiveCategoryId(categoryId);
    if (categoryId !== 'all') {
      const el = document.getElementById(`category-${categoryId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#080E1E] text-slate-900 dark:text-slate-100 transition-colors duration-200 selection:bg-blue-600 selection:text-white">
      {/* Sticky SaaS Navbar */}
      <Navbar
        onOpenDemo={() => setDemoModalOpen(true)}
        onOpenSupport={() => setSupportModalOpen(true)}
        onOpenAI={() => handleOpenAI()}
        onOpenPricing={() => setPricingModalOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section with Search and SaaS Preview */}
        <HeroSection
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSelectQuery={(term) => setSearchQuery(term)}
          totalQuestions={totalQuestions}
          totalCategories={FAQ_CATEGORIES.length}
          onOpenAI={() => handleOpenAI()}
        />

        {/* Categories Bar / Grid */}
        <CategoryNav
          categories={FAQ_CATEGORIES}
          activeCategoryId={activeCategoryId}
          onSelectCategory={handleSelectCategory}
        />

        {/* Instant Answer Visual Callout Banner */}
        <InstantAnswerBanner onOpenAI={() => handleOpenAI()} />

        {/* Master FAQ Accordion & Category Sections */}
        <FAQAccordion
          categories={FAQ_CATEGORIES}
          searchQuery={searchQuery}
          activeCategoryId={activeCategoryId}
          onOpenPricing={() => setPricingModalOpen(true)}
          onOpenSupport={() => setSupportModalOpen(true)}
          onOpenDemo={() => setDemoModalOpen(true)}
          onOpenAI={handleOpenAI}
          onSelectCategory={setActiveCategoryId}
        />

        {/* Security & Compliance Trust Elements */}
        <SecuritySection />

        {/* Integration Ecosystem Grid */}
        <IntegrationsGrid onOpenDemo={() => setDemoModalOpen(true)} />

        {/* Still Have Questions CTA */}
        <StillHaveQuestions
          onOpenDemo={() => setDemoModalOpen(true)}
          onOpenSupport={() => setSupportModalOpen(true)}
        />
      </main>

      {/* Comprehensive Enterprise Footer */}
      <Footer
        onOpenDemo={() => setDemoModalOpen(true)}
        onOpenSupport={() => setSupportModalOpen(true)}
        onOpenPricing={() => setPricingModalOpen(true)}
      />

      {/* Floating Mobile 'Ask AI' Button (positioned on bottom-left) */}
      <div className="sm:hidden fixed bottom-5 left-5 z-40">
        <button
          onClick={() => handleOpenAI()}
          className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-slate-900/95 dark:bg-[#111F42]/95 backdrop-blur-xs text-white font-bold text-xs shadow-xl border border-blue-900/80 dark:border-blue-500/40 hover:bg-slate-800 dark:hover:bg-[#162752] transition-transform active:scale-95"
          aria-label="Ask NextSoftHR AI"
        >
          <div className="w-4 h-4 rounded-full bg-lime-400 text-slate-950 flex items-center justify-center">
            <Sparkles className="w-2.5 h-2.5" />
          </div>
          <span>Ask AI</span>
        </button>
      </div>

      {/* Floating Live Chat Widget at Bottom-Right */}
      <LiveChatWidget
        onOpenDemo={() => setDemoModalOpen(true)}
        onOpenSupport={() => setSupportModalOpen(true)}
        onOpenAI={handleOpenAI}
      />

      {/* Interactive Modals */}
      <AIAssistantModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        initialPrompt={aiInitialPrompt}
        onOpenDemo={() => setDemoModalOpen(true)}
      />

      <BookDemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
      />

      <ContactSupportModal
        isOpen={supportModalOpen}
        onClose={() => setSupportModalOpen(false)}
      />

      <PricingModal
        isOpen={pricingModalOpen}
        onClose={() => setPricingModalOpen(false)}
        onOpenDemo={() => setDemoModalOpen(true)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}
