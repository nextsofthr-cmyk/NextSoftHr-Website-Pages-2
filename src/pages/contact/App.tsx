import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ContactOptionsSection } from './components/ContactOptionsSection';
import { MainContactForm } from './components/MainContactForm';
import { ContactInfoSection } from './components/ContactInfoSection';
import { GlobalPresenceMap } from './components/GlobalPresenceMap';
import { WhyContactSection } from './components/WhyContactSection';
import { AIAssistantWidget } from './components/AIAssistantWidget';
import { BusinessChallengesSection } from './components/BusinessChallengesSection';
import { VideoModalSection } from './components/VideoModalSection';
import { FAQSection } from './components/FAQSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { StickyMobileBar } from './components/StickyMobileBar';
import { LiveChatBubble } from './components/LiveChatBubble';
import { EnquiryType } from './types';

export default function App() {
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryType>('HR Management');
  const [initialMessage, setInitialMessage] = useState<string>('');

  const scrollToForm = () => {
    const el = document.getElementById('contact-form');
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handleSelectOption = (enquiryType: EnquiryType, focusMessage?: string) => {
    setSelectedEnquiry(enquiryType);
    if (focusMessage) {
      setInitialMessage(focusMessage);
    }
    scrollToForm();
  };

  const handleTalkToTeam = () => {
    setSelectedEnquiry('HR Management');
    setInitialMessage("Hello NextSofthr Team, I would like to speak with an advisor about modernizing our workforce processes.");
    scrollToForm();
  };

  const handleBookDemo = () => {
    setSelectedEnquiry('HR Management');
    setInitialMessage("Hello NextSofthr Team, I would like to schedule a personalized live product demonstration for our business.");
    scrollToForm();
  };

  const handleTalkToSales = () => {
    setSelectedEnquiry('Enterprise Solutions');
    setInitialMessage("Hello NextSofthr Team, I'd like to discuss pricing, licenses, and deployment options with your commercial sales specialists.");
    scrollToForm();
  };

  const handleGetSupport = () => {
    setSelectedEnquiry('Customer Support');
    setInitialMessage("Hello NextSofthr Support, I am an existing user and require assistance with our account/payroll.");
    scrollToForm();
  };

  const handleApplyAIRec = (category: EnquiryType, note: string) => {
    setSelectedEnquiry(category);
    setInitialMessage(`Guided by NextSofthr AI Assistant: ${note}`);
    scrollToForm();
  };

  const handleSelectChallenge = (category: EnquiryType, challengeText: string) => {
    setSelectedEnquiry(category);
    setInitialMessage(`We are looking to solve this operational bottleneck: ${challengeText}. Please share how NextSofthr addresses this.`);
    scrollToForm();
  };

  return (
    <div className="min-h-screen bg-[#F7FAFC] dark:bg-[#071322] text-[#0B1F3A] dark:text-slate-100 flex flex-col selection:bg-[#C8F000] selection:text-[#0B1F3A] transition-colors duration-300">
      {/* Sticky Navigation */}
      <Navbar
        onSelectOption={(optionKey) => {
          if (optionKey === 'demo') handleBookDemo();
          else if (optionKey === 'sales') handleTalkToSales();
          else handleTalkToTeam();
        }}
      />

      <main className="flex-grow">
        {/* Section 2 & 3: Hero Section & Visual */}
        <HeroSection
          onTalkToTeam={handleTalkToTeam}
          onBookDemo={handleBookDemo}
        />

        {/* Section 4: Contact Options (6 Interactive Cards) */}
        <ContactOptionsSection
          onSelectOption={handleSelectOption}
        />

        {/* Section 5 & 6: Main Contact Form & Smart Progressive Disclosure */}
        <MainContactForm
          selectedEnquiry={selectedEnquiry}
          onEnquiryChange={setSelectedEnquiry}
          initialMessage={initialMessage}
        />

        {/* Section 7: Contact Information Section */}
        <ContactInfoSection
          onTalkToSales={handleTalkToSales}
          onGetSupport={handleGetSupport}
        />

        {/* Section 8: Africa + Global Presence Network */}
        <GlobalPresenceMap />

        {/* Section 9: Why Contact NextSofthr? (6 Benefits) */}
        <WhyContactSection
          onSelectOption={handleSelectOption}
        />

        {/* Section 10: AI Assisted Contact Experience */}
        <AIAssistantWidget
          onApplyRecommendation={handleApplyAIRec}
        />

        {/* Section 11: Business Challenge Section */}
        <BusinessChallengesSection
          onSelectChallenge={handleSelectChallenge}
        />

        {/* Section 12: Video Showcase Section */}
        <VideoModalSection
          onScheduleWalkthrough={handleBookDemo}
        />

        {/* Section 13: FAQ Section */}
        <FAQSection
          onAskQuestion={handleTalkToTeam}
        />

        {/* Section 14: Final CTA */}
        <FinalCTA
          onBookDemo={handleBookDemo}
          onTalkToSales={handleTalkToSales}
        />
      </main>

      {/* Section 15: Footer */}
      <Footer />

      {/* Section 17: Sticky Mobile Conversion Bar */}
      <StickyMobileBar
        onBookDemo={handleBookDemo}
        onTalkToSales={handleTalkToSales}
      />

      {/* Floating Live Chat Bubble with Real-time Engagement Modal */}
      <LiveChatBubble
        onOpenDemo={handleBookDemo}
        onOpenSales={handleTalkToSales}
      />
    </div>
  );
}
