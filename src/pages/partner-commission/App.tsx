import React, { useState } from 'react';
import { CheckCircle2, Globe, Phone } from 'lucide-react';
import { Header, TabType } from './components/Header';
import { CalculatorView } from './components/Calculator';
import { ScheduleExplorer } from './components/ScheduleExplorer';
import { TierMatrix } from './components/TierMatrix';
import { LeadRegistry } from './components/LeadRegistry';
import { StatementLedger } from './components/StatementLedger';
import { DisputeCenter } from './components/DisputeCenter';
import { DigitalExecution } from './components/DigitalExecution';
import { PrintDocument } from './components/PrintDocument';
import { useCommissionLanguage } from './context/LanguageContext';
import { useTheme } from '../homepage/context/ThemeContext';
import { GlobalHeader } from '../../components/GlobalHeader';
import { GlobalFooter } from '../../components/GlobalFooter';
import {
  INITIAL_STATEMENTS,
  INITIAL_LEADS,
  INITIAL_EXECUTION_DATA,
  INITIAL_DISPUTES,
} from './data/seedData';
import {
  CommissionStatementItem,
  RegisteredLead,
  PartnerExecutionData,
  DisputeRecord,
} from './types';

function PartnerCommissionPage() {
  const { t } = useCommissionLanguage();
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [targetSectionId, setTargetSectionId] = useState<number | null>(null);
  const [isPrinting, setIsPrinting] = useState(false);

  // App state seeded with realistic operational data
  const [statements, setStatements] = useState<CommissionStatementItem[]>(INITIAL_STATEMENTS);
  const [leads, setLeads] = useState<RegisteredLead[]>(INITIAL_LEADS);
  const [executionData, setExecutionData] = useState<PartnerExecutionData>(INITIAL_EXECUTION_DATA);
  const [disputes, setDisputes] = useState<DisputeRecord[]>(INITIAL_DISPUTES);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navigateToSection = (id: number) => {
    setTargetSectionId(id);
    scrollToSection('schedule');
  };

  const handleAddStatement = (newItem: CommissionStatementItem) => {
    setStatements((prev) => [newItem, ...prev]);
    showToast(`Invoice ${newItem.invoiceNumber} recorded on Partner Ledger.`);
  };

  const handleRegisterLead = (newLead: RegisteredLead) => {
    setLeads((prev) => [newLead, ...prev]);
    showToast(`Lead "${newLead.companyName}" locked under 90-day protection window.`);
  };

  const handleConvertLead = (lead: RegisteredLead, createdStatement: CommissionStatementItem) => {
    setLeads((prev) =>
      prev.map((l) =>
        l.id === lead.id ? { ...l, status: 'Converted to Customer', protectionDaysRemaining: 0 } : l
      )
    );
    setStatements((prev) => [createdStatement, ...prev]);
    showToast(`Opportunity "${lead.companyName}" successfully converted to customer sale!`);
    scrollToSection('statements');
  };

  const handleUpdateExecution = (data: PartnerExecutionData) => {
    setExecutionData(data);
    showToast('Schedule B Commercial Acceptance signed & cryptographically logged.');
  };

  const handleSubmitDispute = (dispute: DisputeRecord) => {
    setDisputes((prev) => [dispute, ...prev]);
    showToast(`Dispute for ${dispute.invoiceNumber} submitted for Section 40 investigation.`);
  };

  if (isPrinting) {
    return <PrintDocument onClose={() => setIsPrinting(false)} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors selection:bg-blue-100 selection:text-blue-900 dark:selection:bg-cyan-900 dark:selection:text-white">
      <GlobalHeader />
      <Header
        onPrint={() => setIsPrinting(true)}
        onScrollToSection={scrollToSection}
        onJumpToSection={navigateToSection}
      />

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 border border-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Single-Page Sequential Flow - All sections visible in sequence */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
        {/* 1. Commission Calculator & Earnings Simulator */}
        <section id="simulator" className="scroll-mt-24">
          <CalculatorView onNavigateToSection={navigateToSection} />
        </section>

        {/* 2. Contract Provisions & Schedule B Explorer */}
        <section id="schedule" className="scroll-mt-24 pt-8 border-t border-slate-200 dark:border-slate-800/80">
          <ScheduleExplorer
            targetSectionId={targetSectionId}
            onClearTarget={() => setTargetSectionId(null)}
            onNavigateTab={scrollToSection}
          />
        </section>

        {/* 3. Certified Partner Tiers & Performance Matrix */}
        <section id="tiers" className="scroll-mt-24 pt-8 border-t border-slate-200 dark:border-slate-800/80">
          <TierMatrix
            onSelectTierForCalc={() => scrollToSection('simulator')}
            onNavigateToSection={navigateToSection}
          />
        </section>

        {/* 4. Lead Registration & 90-Day Protection Window */}
        <section id="leads" className="scroll-mt-24 pt-8 border-t border-slate-200 dark:border-slate-800/80">
          <LeadRegistry
            leads={leads}
            onRegisterLead={handleRegisterLead}
            onConvertLead={handleConvertLead}
            onJumpToSection={navigateToSection}
          />
        </section>

        {/* 5. Monthly Partner Commission Statement Ledger */}
        <section id="statements" className="scroll-mt-24 pt-8 border-t border-slate-200 dark:border-slate-800/80">
          <StatementLedger
            statements={statements}
            onAddStatement={handleAddStatement}
            onJumpToSection={navigateToSection}
          />
        </section>

        {/* 6. Section 40 Commercial Dispute Center */}
        <section id="disputes" className="scroll-mt-24 pt-8 border-t border-slate-200 dark:border-slate-800/80">
          <DisputeCenter
            disputes={disputes}
            onSubmitDispute={handleSubmitDispute}
            onJumpToSection={navigateToSection}
          />
        </section>

        {/* 7. Schedule B Digital Execution & Signature */}
        <section id="acceptance" className="scroll-mt-24 pt-8 border-t border-slate-200 dark:border-slate-800/80">
          <DigitalExecution
            executionData={executionData}
            onUpdateExecutionData={handleUpdateExecution}
            onJumpToSection={navigateToSection}
          />
        </section>
      </main>

      <GlobalFooter />
    </div>
  );
}

export default function App() {
  return <PartnerCommissionPage />;
}
