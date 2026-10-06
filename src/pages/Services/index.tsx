/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from '../../components/services/Navbar';
import { Hero } from '../../components/services/Hero';
import { TrustBar } from '../../components/services/TrustBar';
import { VideoIntroSection } from '../../components/services/VideoIntroSection';
import { ServicesGrid } from '../../components/services/ServicesGrid';
import { InteractiveExplorer } from '../../components/services/InteractiveExplorer';
import { HowItWorks } from '../../components/services/HowItWorks';
import { WhyNextSofthr } from '../../components/services/WhyNextSofthr';
import { BusinessSizeSection } from '../../components/services/BusinessSizeSection';
import { IndustriesSection } from '../../components/services/IndustriesSection';
import { AISection } from '../../components/services/AISection';
import { CareerPathingVisualizer } from '../../components/services/CareerPathingVisualizer';
import { IntegrationSection } from '../../components/services/IntegrationSection';
import { SecuritySection } from '../../components/services/SecuritySection';
import { ClientSpotlight } from '../../components/services/ClientSpotlight';
import { TestimonialsSection } from '../../components/services/TestimonialsSection';
import { StatsSection } from '../../components/services/StatsSection';
import { HRSavingsCalculator } from '../../components/services/HRSavingsCalculator';
import { FAQSection } from '../../components/services/FAQSection';
import { FinalCTA } from '../../components/services/FinalCTA';
import { Footer } from '../../components/services/Footer';
import { LiveChatWidget } from '../../components/services/LiveChatWidget';
import { WhatsAppFAB } from '../../components/services/WhatsAppFAB';
import { ScrollToTop } from '../../components/services/ScrollToTop';
import { ServiceModal, IndustryModal, DemoModal, GetStartedModal } from '../../components/services/Modals';
import { ServiceItem, IndustryItem } from './types';

export default function ServicesPage() {
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
