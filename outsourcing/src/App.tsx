/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { NavigationPage, PortalType } from './types';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { StickyMobileCTA } from './components/layout/StickyMobileCTA';
import { LeadModal } from './components/common/LeadModal';

// Views
import { HomeView } from './components/home/HomeView';
import { OutsourcingHub } from './components/outsourcing/OutsourcingHub';
import { PayrollOutsourcing } from './components/outsourcing/PayrollOutsourcing';
import { HRAdministration } from './components/outsourcing/HRAdministration';
import { ManagedHR } from './components/outsourcing/ManagedHR';
import { RecruitmentOutsourcing } from './components/outsourcing/RecruitmentOutsourcing';
import { EmployeeAdministration } from './components/outsourcing/EmployeeAdministration';
import { TimeAndAttendance } from './components/outsourcing/TimeAndAttendance';
import { LeaveManagement } from './components/outsourcing/LeaveManagement';
import { MultiCountryPayroll } from './components/outsourcing/MultiCountryPayroll';
import { EnterpriseHierarchy } from './components/outsourcing/EnterpriseHierarchy';
import { OutsourcingPackages } from './components/outsourcing/OutsourcingPackages';
import { QuotationWizard } from './components/outsourcing/QuotationWizard';
import { RoiCalculator } from './components/outsourcing/RoiCalculator';
import { ImplementationTimeline } from './components/outsourcing/ImplementationTimeline';
import { DataMigrationCenter } from './components/outsourcing/DataMigrationCenter';
import { IntegrationsDirectory } from './components/outsourcing/IntegrationsDirectory';
import { SecurityCenter } from './components/outsourcing/SecurityCenter';
import { ComplianceCenter } from './components/outsourcing/ComplianceCenter';
import { AnalyticsReporting } from './components/outsourcing/AnalyticsReporting';
import { PartnersSection } from './components/outsourcing/PartnersSection';
import { SupportDesk } from './components/outsourcing/SupportDesk';
import { AiAssistantCopilot } from './components/outsourcing/AiAssistantCopilot';
import { FloatingLiveChat } from './components/common/FloatingLiveChat';
import { PortalContainer } from './components/portals/PortalContainer';
import { CurrencyProvider } from './context/CurrencyContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  const [currentPage, setCurrentPage] = useState<NavigationPage>('home');
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [leadModalService, setLeadModalService] = useState('Payroll Outsourcing');
  const [wizardOpen, setWizardOpen] = useState(false);
  const [selectedPortal, setSelectedPortal] = useState<PortalType>('client-admin');
  const [floatingCopilotOpen, setFloatingCopilotOpen] = useState(false);

  const handleOpenLeadModal = (service: string = 'Payroll Outsourcing') => {
    setLeadModalService(service);
    setLeadModalOpen(true);
  };

  const handleNavigate = (page: NavigationPage) => {
    setCurrentPage(page);
    setWizardOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPortals = (portal: string = 'client-admin') => {
    setSelectedPortal(portal as PortalType);
    setCurrentPage('portals');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If viewing Portals, render full screen portal container
  if (currentPage === 'portals') {
    return (
      <ThemeProvider>
        <LanguageProvider>
          <CurrencyProvider>
            <div className="min-h-screen bg-slate-100/80 dark:bg-[#050E24] text-slate-900 dark:text-slate-100 transition-colors duration-300">
              <PortalContainer
                initialPortal={selectedPortal}
                onBackToSite={() => handleNavigate('home')}
              />
            </div>
          </CurrencyProvider>
        </LanguageProvider>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <LanguageProvider>
        <CurrencyProvider>
          <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#06112C] text-slate-900 dark:text-slate-100 selection:bg-lime-400 selection:text-slate-950 font-sans transition-colors duration-300">
      {/* Top Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenLeadModal={handleOpenLeadModal}
        onOpenPortals={handleOpenPortals}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Full-Screen Wizard Modal if active */}
        {wizardOpen && (
          <div className="bg-slate-100/90 dark:bg-[#050E24]/95 py-8 px-4">
            <div className="max-w-4xl mx-auto flex justify-end mb-2">
              <button
                onClick={() => setWizardOpen(false)}
                className="px-4 py-1.5 bg-white dark:bg-[#0B1A3D] border border-slate-200 dark:border-blue-900/50 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
              >
                ✕ Close Quotation Wizard
              </button>
            </div>
            <QuotationWizard onClose={() => setWizardOpen(false)} />
          </div>
        )}

        {!wizardOpen && (
          <>
            {currentPage === 'home' && (
              <HomeView
                onNavigate={handleNavigate}
                onOpenLeadModal={handleOpenLeadModal}
                onOpenWizard={() => setWizardOpen(true)}
              />
            )}

            {currentPage === 'outsourcing-hub' && (
              <OutsourcingHub
                onNavigate={handleNavigate}
                onOpenLeadModal={handleOpenLeadModal}
              />
            )}

            {currentPage === 'outsourcing-payroll' && (
              <PayrollOutsourcing onOpenLeadModal={handleOpenLeadModal} />
            )}

            {currentPage === 'outsourcing-hr-admin' && (
              <HRAdministration onOpenLeadModal={handleOpenLeadModal} />
            )}

            {currentPage === 'outsourcing-managed-hr' && (
              <ManagedHR onOpenLeadModal={handleOpenLeadModal} />
            )}

            {currentPage === 'outsourcing-recruitment' && (
              <RecruitmentOutsourcing onOpenLeadModal={handleOpenLeadModal} />
            )}

            {currentPage === 'outsourcing-employee-admin' && (
              <EmployeeAdministration onOpenLeadModal={handleOpenLeadModal} />
            )}

            {currentPage === 'outsourcing-time-attendance' && (
              <TimeAndAttendance onOpenLeadModal={handleOpenLeadModal} />
            )}

            {currentPage === 'outsourcing-leave' && (
              <LeaveManagement onOpenLeadModal={handleOpenLeadModal} />
            )}

            {currentPage === 'compliance' && (
              <ComplianceCenter onOpenLeadModal={handleOpenLeadModal} />
            )}

            {currentPage === 'multi-country' && (
              <MultiCountryPayroll onOpenLeadModal={handleOpenLeadModal} />
            )}

            {currentPage === 'multi-company' && (
              <EnterpriseHierarchy onOpenLeadModal={handleOpenLeadModal} />
            )}

            {currentPage === 'packages' && (
              <OutsourcingPackages
                onOpenLeadModal={handleOpenLeadModal}
                onOpenWizard={() => setWizardOpen(true)}
              />
            )}

            {currentPage === 'calculator' && (
              <RoiCalculator onOpenLeadModal={handleOpenLeadModal} />
            )}

            {currentPage === 'implementation' && (
              <ImplementationTimeline onOpenLeadModal={handleOpenLeadModal} />
            )}

            {currentPage === 'migration' && (
              <DataMigrationCenter onOpenLeadModal={handleOpenLeadModal} />
            )}

            {currentPage === 'integrations' && (
              <IntegrationsDirectory onOpenLeadModal={handleOpenLeadModal} />
            )}

            {currentPage === 'security' && (
              <SecurityCenter onOpenLeadModal={handleOpenLeadModal} />
            )}

            {currentPage === 'analytics' && (
              <AnalyticsReporting onOpenLeadModal={handleOpenLeadModal} />
            )}

            {currentPage === 'partners' && (
              <PartnersSection onOpenLeadModal={handleOpenLeadModal} />
            )}

            {currentPage === 'contact' && (
              <SupportDesk onOpenLeadModal={handleOpenLeadModal} />
            )}
          </>
        )}
      </main>

      {/* Global Floating Live Chat */}
      <FloatingLiveChat
        onOpenLeadModal={handleOpenLeadModal}
        onOpenWizard={() => { setWizardOpen(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        onOpenPortals={handleOpenPortals}
      />

      {/* Sticky Mobile CTA */}
      <StickyMobileCTA onOpenLeadModal={handleOpenLeadModal} />

      {/* Global Lead Capture Modal */}
      <LeadModal
        isOpen={leadModalOpen}
        onClose={() => setLeadModalOpen(false)}
        defaultService={leadModalService}
      />

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenLeadModal={handleOpenLeadModal}
      />
      </div>
        </CurrencyProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
