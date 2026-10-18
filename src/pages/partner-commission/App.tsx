import React, { useState, useEffect } from 'react';
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
import { LanguageProvider } from '../homepage/context/LanguageContext';
import { useCommissionLanguage } from './context/LanguageContext';
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

const THEME_KEY = 'nextsofthr-theme';

function getInitialDarkMode(): boolean {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark') return true;
    if (saved === 'light') return false;
  } catch {
    // storage unavailable, fall through to system preference
  }
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches;
}

function PartnerCommissionPage() {
  const { t } = useCommissionLanguage();
  const [activeTab, setActiveTab] = useState<TabType>('simulator');
  const [targetSectionId, setTargetSectionId] = useState<number | null>(null);
  const [isPrinting, setIsPrinting] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(getInitialDarkMode);

  // App state seeded with realistic operational data
  const [statements, setStatements] = useState<CommissionStatementItem[]>(INITIAL_STATEMENTS);
  const [leads, setLeads] = useState<RegisteredLead[]>(INITIAL_LEADS);
  const [executionData, setExecutionData] = useState<PartnerExecutionData>(INITIAL_EXECUTION_DATA);
  const [disputes, setDisputes] = useState<DisputeRecord[]>(INITIAL_DISPUTES);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    try {
      localStorage.setItem(THEME_KEY, isDarkMode ? 'dark' : 'light');
    } catch {
      // ignore storage failures
    }
  }, [isDarkMode]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const navigateToSection = (id: number) => {
    setTargetSectionId(id);
    setActiveTab('schedule');
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
    setActiveTab('statements');
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
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDarkMode={isDarkMode}
        toggleTheme={() => setIsDarkMode((d) => !d)}
        onPrint={() => setIsPrinting(true)}
        onJumpToSection={navigateToSection}
      />

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 border border-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {activeTab === 'simulator' && <CalculatorView onNavigateToSection={navigateToSection} />}

        {activeTab === 'schedule' && (
          <ScheduleExplorer
            targetSectionId={targetSectionId}
            onClearTarget={() => setTargetSectionId(null)}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'tiers' && (
          <TierMatrix
            onSelectTierForCalc={() => setActiveTab('simulator')}
            onNavigateToSection={navigateToSection}
          />
        )}

        {activeTab === 'leads' && (
          <LeadRegistry
            leads={leads}
            onRegisterLead={handleRegisterLead}
            onConvertLead={handleConvertLead}
            onJumpToSection={navigateToSection}
          />
        )}

        {activeTab === 'statements' && (
          <StatementLedger
            statements={statements}
            onAddStatement={handleAddStatement}
            onJumpToSection={navigateToSection}
          />
        )}

        {activeTab === 'disputes' && (
          <DisputeCenter
            disputes={disputes}
            onSubmitDispute={handleSubmitDispute}
            onJumpToSection={navigateToSection}
          />
        )}

        {activeTab === 'acceptance' && (
          <DigitalExecution
            executionData={executionData}
            onUpdateExecutionData={handleUpdateExecution}
            onJumpToSection={navigateToSection}
          />
        )}
      </main>

      <GlobalFooter />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <PartnerCommissionPage />
    </LanguageProvider>
  );
}
