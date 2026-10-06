import React, { useState } from 'react';
import { ThemeProvider } from '../../context/ThemeContext';
import { LanguageProvider } from '../../context/LanguageContext';
import { Header } from '../../components/about-us/Header';
import { Hero } from '../../components/about-us/Hero';
import { TrustIntro } from '../../components/about-us/TrustIntro';
import { OurStory } from '../../components/about-us/OurStory';
import { MissionVision } from '../../components/about-us/MissionVision';
import { CoreValues } from '../../components/about-us/CoreValues';
import { WhatWeBelieve } from '../../components/about-us/WhatWeBelieve';
import { OurPlatform } from '../../components/about-us/OurPlatform';
import { BuiltForAfrica } from '../../components/about-us/BuiltForAfrica';
import { WhoWeServe } from '../../components/about-us/WhoWeServe';
import { PeopleBehind } from '../../components/about-us/PeopleBehind';
import { CustomerCentric } from '../../components/about-us/CustomerCentric';
import { CustomerSuccessCarousel } from '../../components/about-us/CustomerSuccessCarousel';
import { AIFuture } from '../../components/about-us/AIFuture';
import { GlobalImpact } from '../../components/about-us/GlobalImpact';
import { WhyNextSofthr } from '../../components/about-us/WhyNextSofthr';
import { VideoStory } from '../../components/about-us/VideoStory';
import { CTASection } from '../../components/about-us/CTASection';
import { Footer } from '../../components/about-us/Footer';
import { DemoModal, ContactModal } from '../../components/about-us/Modals';
import { LiveChatWidget } from '../../components/about-us/LiveChatWidget';

export default function AboutUsPage() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}

function AppContent() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [prefilledIndustry, setPrefilledIndustry] = useState<string | undefined>(undefined);

  const handleOpenDemo = (industry?: string) => {
    setPrefilledIndustry(industry);
    setDemoModalOpen(true);
  };

  const handleOpenContact = () => {
    setContactModalOpen(true);
  };

  const handleOpenGetStarted = () => {
    // Scrolls to CTA or opens quick demo booking
    setPrefilledIndustry('General Onboarding');
    setDemoModalOpen(true);
  };

  const handleSelectModuleFromIntro = (moduleTitle: string) => {
    const platformEl = document.getElementById('platform');
    if (platformEl) {
      platformEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#071322] text-slate-900 dark:text-slate-100 font-['Plus_Jakarta_Sans',sans-serif] transition-colors duration-300">
      {/* 1. Sticky Navigation */}
      <Header
        onOpenDemo={() => handleOpenDemo()}
        onOpenContact={handleOpenContact}
        onOpenGetStarted={handleOpenGetStarted}
      />

      {/* Main Content Sections 2 through 18 */}
      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero
          onOpenGetStarted={handleOpenGetStarted}
          onOpenContact={handleOpenContact}
        />

        {/* 3. Trust & Company Introduction */}
        <TrustIntro onSelectModule={handleSelectModuleFromIntro} />

        {/* 4. Our Story Timeline */}
        <OurStory />

        {/* 5 & 6. Our Mission & Our Vision */}
        <MissionVision />

        {/* 7. Our Core Values */}
        <CoreValues />

        {/* 8. What We Believe */}
        <WhatWeBelieve />

        {/* 9. Our Platform Ecosystem */}
        <OurPlatform onOpenDemo={() => handleOpenDemo('Platform Modules')} />

        {/* 10. Built for Africa. Ready for the World. */}
        <BuiltForAfrica onOpenDemo={() => handleOpenDemo('Regional Compliance')} />

        {/* 11. Who We Serve */}
        <WhoWeServe onOpenDemo={(seg) => handleOpenDemo(seg)} />

        {/* 12. People Behind the Platform */}
        <PeopleBehind />

        {/* 13. Customer-Centric Approach */}
        <CustomerCentric onOpenContact={handleOpenContact} />

        {/* 14. Customer Success Carousel */}
        <CustomerSuccessCarousel onOpenDemo={(seg) => handleOpenDemo(seg)} />

        {/* 15. AI & The Future of Work */}
        <AIFuture />

        {/* 15. Global Impact */}
        <GlobalImpact onOpenDemo={() => handleOpenDemo('Global Enterprise')} />

        {/* 16. Why NextSofthr */}
        <WhyNextSofthr onOpenGetStarted={handleOpenGetStarted} />

        {/* 17. Video Story Showcase (Meet NextSofthr) */}
        <VideoStory />

        {/* 18. Conversion CTA Section */}
        <CTASection
          onOpenGetStarted={handleOpenGetStarted}
          onOpenDemo={() => handleOpenDemo()}
          onOpenContact={handleOpenContact}
        />
      </main>

      {/* 19. Multi-column Footer */}
      <Footer />

      {/* Interactive Modals */}
      <DemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        prefilledSegment={prefilledIndustry}
      />

      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />

      {/* Floating Live Chat & Support Agents Help Dialog */}
      <LiveChatWidget
        onOpenDemo={() => handleOpenDemo('Live Chat Inquiry')}
        onOpenContact={handleOpenContact}
      />
    </div>
  );
}
