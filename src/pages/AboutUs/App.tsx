import React, { useState } from "react";
import { Hero } from "./components/Hero";
import { TrustIntro } from "./components/TrustIntro";
import { OurStory } from "./components/OurStory";
import { MissionVision } from "./components/MissionVision";
import { CoreValues } from "./components/CoreValues";
import { WhatWeBelieve } from "./components/WhatWeBelieve";
import { OurPlatform } from "./components/OurPlatform";
import { BuiltForAfrica } from "./components/BuiltForAfrica";
import { WhoWeServe } from "./components/WhoWeServe";
import { PeopleBehind } from "./components/PeopleBehind";
import { CustomerCentric } from "./components/CustomerCentric";
import { CustomerSuccessCarousel } from "./components/CustomerSuccessCarousel";
import { AIFuture } from "./components/AIFuture";
import { GlobalImpact } from "./components/GlobalImpact";
import { WhyNextSofthr } from "./components/WhyNextSofthr";
import { VideoStory } from "./components/VideoStory";
import { CTASection } from "./components/CTASection";

export default function App() {
  return <AppContent />;
}

function AppContent() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [prefilledIndustry, setPrefilledIndustry] = useState<
    string | undefined
  >(undefined);

  const handleOpenDemo = (industry?: string) => {
    setPrefilledIndustry(industry);
    setDemoModalOpen(true);
  };

  const handleOpenContact = () => {
    setContactModalOpen(true);
  };

  const handleOpenGetStarted = () => {
    // Scrolls to CTA or opens quick demo booking
    setPrefilledIndustry("General Onboarding");
    setDemoModalOpen(true);
  };

  const handleSelectModuleFromIntro = (moduleTitle: string) => {
    const platformEl = document.getElementById("platform");
    if (platformEl) {
      platformEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col">
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
        <OurPlatform onOpenDemo={() => handleOpenDemo("Platform Modules")} />

        {/* 10. Built for Africa. Ready for the World. */}
        <BuiltForAfrica
          onOpenDemo={() => handleOpenDemo("Regional Compliance")}
        />

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
        <GlobalImpact onOpenDemo={() => handleOpenDemo("Global Enterprise")} />

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
    </div>
  );
}
