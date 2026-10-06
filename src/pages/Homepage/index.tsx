/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ThemeProvider } from '../../context/ThemeContext';
import { LanguageProvider } from '../../context/LanguageContext';
import { CurrencyProvider } from '../../context/CurrencyContext';
import { Navbar } from '../../components/homepage/Navbar';
import { Hero } from '../../components/homepage/Hero';
import { AiAssistantSection } from '../../components/homepage/AiAssistantSection';
import { ProblemSection } from '../../components/homepage/ProblemSection';
import { ComparisonSection } from '../../components/homepage/ComparisonSection';
import { CoreHrSection } from '../../components/homepage/CoreHrSection';
import { TimeAttendanceSection } from '../../components/homepage/TimeAttendanceSection';
import { ShiftScheduleSection } from '../../components/homepage/ShiftScheduleSection';
import { LeaveManagementSection } from '../../components/homepage/LeaveManagementSection';
import { PayrollSection } from '../../components/homepage/PayrollSection';
import { TalentAcquisitionSection } from '../../components/homepage/TalentAcquisitionSection';
import { BusinessOpsSection } from '../../components/homepage/BusinessOpsSection';
import { SelfServiceSection } from '../../components/homepage/SelfServiceSection';
import { OutsourcingConsultingSection } from '../../components/homepage/OutsourcingConsultingSection';
import { BusinessSizeGlobalSection } from '../../components/homepage/BusinessSizeGlobalSection';
import { AnalyticsSecurityIntegrations } from '../../components/homepage/AnalyticsSecurityIntegrations';
import { CustomerSuccessStories } from '../../components/homepage/CustomerSuccessStories';
import { SocialProofPricingSection } from '../../components/homepage/SocialProofPricingSection';
import { FaqAndFooter } from '../../components/homepage/FaqAndFooter';

import { DemoModal } from '../../components/homepage/Modals/DemoModal';
import { GetStartedModal } from '../../components/homepage/Modals/GetStartedModal';
import { ExpertModal } from '../../components/homepage/Modals/ExpertModal';
import { PayslipModal } from '../../components/homepage/Modals/PayslipModal';
import { LiveChatWidget } from '../../components/homepage/LiveChatWidget';

export default function HomepagePage() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [getStartedOpen, setGetStartedOpen] = useState(false);
  const [expertOpen, setExpertOpen] = useState(false);
  const [payslipOpen, setPayslipOpen] = useState(false);

  const openDemo = () => setDemoOpen(true);
  const openGetStarted = () => setGetStartedOpen(true);
  const openExpert = () => setExpertOpen(true);
  const openPayslip = () => setPayslipOpen(true);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <CurrencyProvider>
          <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-lime-400 selection:text-slate-900 antialiased transition-colors duration-300">
          {/* Sticky Primary Navigation */}
          <Navbar
            onOpenDemo={openDemo}
            onOpenGetStarted={openGetStarted}
            onOpenExpert={openExpert}
          />

      {/* Main Page Sections */}
      <main>
        {/* 1. Hero Section */}
        <Hero
          onOpenDemo={openDemo}
          onOpenGetStarted={openGetStarted}
          onOpenExpert={openExpert}
          onOpenPayslip={openPayslip}
        />

        {/* 2. Conversational AI Assistant & 12 AI Capabilities */}
        <AiAssistantSection
          onOpenDemo={openDemo}
          onOpenPayslip={openPayslip}
        />

        {/* 3. The Problem: 8 HR Challenges */}
        <ProblemSection
          onOpenGetStarted={openGetStarted}
        />

        {/* 4. Comparison: Traditional HR vs NextSofthr */}
        <ComparisonSection
          onOpenDemo={openDemo}
          onOpenGetStarted={openGetStarted}
        />

        {/* 5. Core HR Module */}
        <CoreHrSection
          onOpenDemo={openDemo}
        />

        {/* 6. Time & Attendance Module */}
        <TimeAttendanceSection
          onOpenDemo={openDemo}
        />

        {/* 7. Shift & Schedule Management Module */}
        <ShiftScheduleSection
          onOpenDemo={openDemo}
        />

        {/* 8. Leave Management Module */}
        <LeaveManagementSection
          onOpenDemo={openDemo}
        />

        {/* 9. Global Payroll Architecture */}
        <PayrollSection
          onOpenDemo={openDemo}
          onOpenPayslip={openPayslip}
        />

        {/* 10. Talent Acquisition & ATS */}
        <TalentAcquisitionSection
          onOpenDemo={openDemo}
        />

        {/* 11. Business Operations: CRM, Finance & Projects */}
        <BusinessOpsSection
          onOpenDemo={openDemo}
        />

        {/* 12. Employee & Manager Self-Service (ESS / MSS) */}
        <SelfServiceSection
          onOpenDemo={openDemo}
          onOpenPayslip={openPayslip}
        />

        {/* 13. Managed Outsourcing & Consulting Services */}
        <OutsourcingConsultingSection
          onOpenExpert={openExpert}
          onOpenDemo={openDemo}
        />

        {/* 14. Tailored for Business Size & Global Business Hubs */}
        <BusinessSizeGlobalSection
          onOpenDemo={openDemo}
          onOpenGetStarted={openGetStarted}
        />

        {/* 15. Workforce Analytics, Bank-Grade Security & Integrations */}
        <AnalyticsSecurityIntegrations
          onOpenDemo={openDemo}
        />

        {/* 15.5 Customer Success Stories (Responsive Carousel) */}
        <CustomerSuccessStories
          onOpenDemo={openDemo}
          onOpenGetStarted={openGetStarted}
        />

        {/* 16. Testimonials, Demo Video & Transparent Pricing */}
        <SocialProofPricingSection
          onOpenDemo={openDemo}
          onOpenGetStarted={openGetStarted}
          onOpenExpert={openExpert}
        />

        {/* 17. FAQs, Final High-Conversion CTA & Global Footer */}
        <FaqAndFooter
          onOpenDemo={openDemo}
          onOpenGetStarted={openGetStarted}
          onOpenExpert={openExpert}
        />
      </main>

      {/* Conversion & Simulation Modals */}
      <DemoModal
        isOpen={demoOpen}
        onClose={() => setDemoOpen(false)}
        onOpenGetStarted={openGetStarted}
      />

      <GetStartedModal
        isOpen={getStartedOpen}
        onClose={() => setGetStartedOpen(false)}
        onOpenDemo={openDemo}
      />

      <ExpertModal
        isOpen={expertOpen}
        onClose={() => setExpertOpen(false)}
      />

      <PayslipModal
        isOpen={payslipOpen}
        onClose={() => setPayslipOpen(false)}
      />

      {/* Floating 'Live Chat' Action Button & Support Help Dialog */}
      <LiveChatWidget />
      </div>
        </CurrencyProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

