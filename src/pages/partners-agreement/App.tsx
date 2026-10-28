import React, { useState, useEffect } from 'react';
import { AcceptanceRecord, PartnerCategoryType } from './types/agreement';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProgramOverview } from './components/ProgramOverview';
import { PartnerCategories } from './components/PartnerCategories';
import { PartnerTiers } from './components/PartnerTiers';
import { MasterAgreement } from './components/MasterAgreement';
import { TerritoryConfigurator } from './components/TerritoryConfigurator';
import { LeadRegistrationSimulator } from './components/LeadRegistrationSimulator';
import { PartnerDocumentCenter } from './components/PartnerDocumentCenter';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { ElectronicAcceptanceModal } from './components/ElectronicAcceptanceModal';
import { PartnerPortal } from './components/PartnerPortal';

export default function App() {
  const [activeView, setActiveView] = useState<'agreement' | 'portal'>('agreement');
  const [isAcceptanceOpen, setIsAcceptanceOpen] = useState(false);
  const [preselectedCategory, setPreselectedCategory] = useState<PartnerCategoryType>('reseller');
  const [acceptanceRecord, setAcceptanceRecord] = useState<AcceptanceRecord | null>(null);

  // Load existing acceptance record from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem('nextsofthr_acceptance_record');
      if (saved) {
        setAcceptanceRecord(JSON.parse(saved));
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const handleSaveRecord = (record: AcceptanceRecord) => {
    setAcceptanceRecord(record);
    try {
      localStorage.setItem('nextsofthr_acceptance_record', JSON.stringify(record));
    } catch {
      // Ignore storage errors
    }
  };

  const handleSelectCategoryForAcceptance = (categoryId: PartnerCategoryType) => {
    setPreselectedCategory(categoryId);
    setIsAcceptanceOpen(true);
  };

  const handleScrollToSection = (sectionId: string) => {
    setActiveView('agreement');
    setTimeout(() => {
      const elem = document.getElementById(sectionId);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#040E1F] text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Top Header */}
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenAcceptance={() => setIsAcceptanceOpen(true)}
        acceptanceRecord={acceptanceRecord}
        onOpenDocCenter={() => handleScrollToSection('documents')}
      />

      {/* Main View Router */}
      {activeView === 'portal' ? (
        <div className="flex-1">
          <PartnerPortal
            acceptanceRecord={acceptanceRecord}
            onOpenAcceptance={() => setIsAcceptanceOpen(true)}
            onBackToAgreement={() => setActiveView('agreement')}
          />
        </div>
      ) : (
        <main className="flex-1">
          {/* 1. Hero Section */}
          <HeroSection
            onOpenAcceptance={() => setIsAcceptanceOpen(true)}
            onOpenLogin={() => setActiveView('portal')}
            onOpenDocCenter={() => handleScrollToSection('documents')}
            onScrollToTiers={() => handleScrollToSection('tiers')}
          />

          {/* 2. Partner Program Overview (14 Capabilities) */}
          <ProgramOverview />

          {/* 3. Partner Types (12 Categories) */}
          <PartnerCategories
            onSelectCategoryForAcceptance={handleSelectCategoryForAcceptance}
          />

          {/* 4. Partner Levels & Recurring Commission Calculator */}
          <PartnerTiers />

          {/* 5. Master Table of Contents & Agreement Text (81 Clauses) */}
          <MasterAgreement
            onOpenAcceptance={() => setIsAcceptanceOpen(true)}
            onOpenDocCenter={() => handleScrollToSection('documents')}
          />

          {/* 6. Territory Schedule & Multi-Jurisdiction Schedule */}
          <TerritoryConfigurator />

          {/* 7. Lead Registration & 90-Day Protection Simulator */}
          <LeadRegistrationSimulator />

          {/* 8. Partner Document Center & Version Control (11 Documents) */}
          <PartnerDocumentCenter
            acceptanceRecord={acceptanceRecord}
            onOpenAcceptance={() => setIsAcceptanceOpen(true)}
          />

          {/* 9. Comprehensive 24-Question FAQ */}
          <FAQSection />
        </main>
      )}

      {/* Footer */}
      <Footer
        onOpenDocCenter={() => handleScrollToSection('documents')}
        onOpenAcceptance={() => setIsAcceptanceOpen(true)}
        onOpenLogin={() => setActiveView('portal')}
      />

      {/* Electronic Acceptance & Execution Modal */}
      <ElectronicAcceptanceModal
        isOpen={isAcceptanceOpen}
        onClose={() => setIsAcceptanceOpen(false)}
        preselectedCategory={preselectedCategory}
        existingRecord={acceptanceRecord}
        onSaveRecord={handleSaveRecord}
        onNavigateToPortal={() => {
          setActiveView('portal');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
