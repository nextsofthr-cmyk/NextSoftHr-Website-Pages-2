/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { VideoIntroSection } from './components/VideoIntroSection';
import { ServicesGrid } from './components/ServicesGrid';
import { InteractiveExplorer } from './components/InteractiveExplorer';
import { HowItWorks } from './components/HowItWorks';
import { WhyNextSofthr } from './components/WhyNextSofthr';
import { BusinessSizeSection } from './components/BusinessSizeSection';
import { IndustriesSection } from './components/IndustriesSection';
import { AISection } from './components/AISection';
import { CareerPathingVisualizer } from './components/CareerPathingVisualizer';
import { IntegrationSection } from './components/IntegrationSection';
import { SecuritySection } from './components/SecuritySection';
import { ClientSpotlight } from './components/ClientSpotlight';
import { TestimonialsSection } from './components/TestimonialsSection';
import { StatsSection } from './components/StatsSection';
import { HRSavingsCalculator } from './components/HRSavingsCalculator';
import { FAQSection } from './components/FAQSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { LiveChatWidget } from './components/LiveChatWidget';
import { WhatsAppFAB } from './components/WhatsAppFAB';
import { ScrollToTop } from './components/ScrollToTop';
import { ServiceModal, IndustryModal, DemoModal, GetStartedModal } from './components/Modals';
import { ThemeProvider } from './context/ThemeContext';
import { ServiceItem, IndustryItem } from './types';

function ServicesContent() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [getStartedModalOpen, setGetStartedModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryItem | null>(null);

  const handleOpenDemo = () => setDemoModalOpen(true);
  const handleCloseDemo = () => setDemoModalOpen(false);

  const handleOpenGetStarted = () => setGetStartedModalOpen(true);
  const handleCloseGetStarted = () => setGetStartedModalOpen(false);

  const handleSelectService = (service: ServiceItem) => setSelectedService(service);
  const handleCloseServiceModal = () => setSelectedService(null);

  const handleSelectIndustry = (industry: IndustryItem) => setSelectedIndustry(industry);
  const handleCloseIndustryModal = () => setSelectedIndustry(null);

  return (
    <div className="min-h-screen bg-white dark:bg-[#07182E] font-sans text-slate-800 dark:text-slate-100 antialiased selection:bg-[#84CC16]/30 selection:text-[#0A2540] transition-colors duration-200">
      {/* 1. Sticky Navigation Bar with Logo, Links, & CTAs */}
      <Navbar onOpenDemo={handleOpenDemo} onOpenGetStarted={handleOpenGetStarted} />

      <main>
        {/* 2. Hero Section with Headline, African Business Team Imagery & Interactive Floating Cards */}
        <Hero onOpenDemo={handleOpenDemo} onOpenGetStarted={handleOpenGetStarted} />

        {/* 3. Section 6: Trust Bar & Social Proof */}
        <TrustBar />

        {/* Video Introduction Masterclass featuring Pan-African Workforce Strategist */}
        <VideoIntroSection onOpenDemo={handleOpenDemo} onOpenGetStarted={handleOpenGetStarted} />

        {/* 4. Sections 7 & 8: Services Introduction & 12-Card Services Grid (Timido Style 03) */}
        <ServicesGrid onSelectService={handleSelectService} />

        {/* 5. Section 9: Interactive Service Explorer (8 Tabs with Dynamic Mockups & African Photos) */}
        <InteractiveExplorer onOpenDemo={handleOpenDemo} onOpenGetStarted={handleOpenGetStarted} />

        {/* 6. Section 10: How NextSofthr Works (5-Step Implementation Roadmap) */}
        <HowItWorks onOpenDemo={handleOpenDemo} />

        {/* 7. Section 11: Why NextSofthr (Split Screen with African HR Image & 7 Core Pillars) */}
        <WhyNextSofthr onOpenDemo={handleOpenDemo} onOpenGetStarted={handleOpenGetStarted} />

        {/* 8. Section 12: Business Size Adaptability (Micro, Small, Medium, Enterprise with Photos) */}
        <BusinessSizeSection onOpenDemo={handleOpenDemo} onOpenGetStarted={handleOpenGetStarted} />

        {/* 9. Section 13: 15 African Industry Solution Cards */}
        <IndustriesSection onSelectIndustry={handleSelectIndustry} />

        {/* 10. Section 14: Meet Your AI HR Assistant (Interactive Prompts & Verified Syntheses) */}
        <AISection onOpenDemo={handleOpenDemo} onOpenGetStarted={handleOpenGetStarted} />

        {/* 11. Career Pathing & Performance Management Visualizer */}
        <CareerPathingVisualizer
          onOpenDemo={handleOpenDemo}
          onOpenGetStarted={handleOpenGetStarted}
        />

        {/* 12. Section 15: Integration Hub & Business Ecosystem */}
        <IntegrationSection onOpenDemo={handleOpenDemo} />

        {/* 12. Section 16: Security, Compliance & Data Governance */}
        <SecuritySection />

        {/* 13. Client Spotlight Carousel: African Executive Video & Testimonial Spotlights */}
        <ClientSpotlight
          onOpenDemo={handleOpenDemo}
          onOpenGetStarted={handleOpenGetStarted}
        />

        {/* 14. Section 17: Testimonials from African Business Leaders & HR Directors */}
        <TestimonialsSection />

        {/* 14. Section 18: Measurable Operational Impact Band (Blue & Lemon Green) */}
        <StatsSection />

        {/* 15. HR Savings & Financial ROI Interactive Calculator */}
        <HRSavingsCalculator
          onOpenDemo={handleOpenDemo}
          onOpenGetStarted={handleOpenGetStarted}
        />

        {/* 16. Section 19: Frequently Asked Questions (12 Questions with Accordion & Search) */}
        <FAQSection onOpenDemo={handleOpenDemo} onOpenGetStarted={handleOpenGetStarted} />

        {/* 16. Section 20: Final Conversion CTA Section */}
        <FinalCTA onOpenDemo={handleOpenDemo} onOpenGetStarted={handleOpenGetStarted} />
      </main>

      {/* 17. Section 21: Full SaaS Footer with African Focus Note & Copyright */}
      <Footer />

      {/* Interactive Overlay Modals */}
      <ServiceModal
        service={selectedService}
        onClose={handleCloseServiceModal}
        onBookDemo={handleOpenDemo}
      />

      <IndustryModal
        industry={selectedIndustry}
        onClose={handleCloseIndustryModal}
        onBookDemo={handleOpenDemo}
      />

      <DemoModal isOpen={demoModalOpen} onClose={handleCloseDemo} />

      <GetStartedModal
        isOpen={getStartedModalOpen}
        onClose={handleCloseGetStarted}
        onOpenDemo={handleOpenDemo}
      />

      {/* Floating Action Button: WhatsApp Sales & Inquiry Desk */}
      <WhatsAppFAB
        phoneNumber="2349158482622"
        displayPhone="+234 915 848 2622"
      />

      {/* Floating Live Chat & Support Agent Help Dialog */}
      <LiveChatWidget
        onOpenDemo={handleOpenDemo}
        onOpenGetStarted={handleOpenGetStarted}
      />

      {/* Dynamic Scroll to Top Navigation Button */}
      <ScrollToTop />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ServicesContent />
    </ThemeProvider>
  );
}
