import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { ThemeProvider } from "../pages/AboutUs/context/ThemeContext";
import { LanguageProvider } from "../pages/AboutUs/context/LanguageContext";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { DemoModal, ContactModal } from "./Modals";
import { LiveChatWidget } from "../pages/AboutUs/components/LiveChatWidget";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [prefilledIndustry, setPrefilledIndustry] = useState<
    string | undefined
  >(undefined);

  const location = useLocation();
  // Don't show layout on SecureAccess since it's a login page
  const isAuthPage = location.pathname.includes("/secure-access");

  const handleOpenDemo = (industry?: string) => {
    setPrefilledIndustry(industry);
    setDemoModalOpen(true);
  };

  const handleOpenContact = () => {
    setContactModalOpen(true);
  };

  const handleOpenGetStarted = () => {
    setPrefilledIndustry("General Onboarding");
    setDemoModalOpen(true);
  };

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen flex flex-col bg-white dark:bg-[#071322] text-slate-900 dark:text-slate-100 font-['Plus_Jakarta_Sans',sans-serif] transition-colors duration-300">
          <Header
            onOpenDemo={() => handleOpenDemo()}
            onOpenContact={handleOpenContact}
            onOpenGetStarted={handleOpenGetStarted}
          />

          <main className="flex-1">{children}</main>

          <Footer />

          <DemoModal
            isOpen={demoModalOpen}
            onClose={() => setDemoModalOpen(false)}
            prefilledSegment={prefilledIndustry}
          />
          <ContactModal
            isOpen={contactModalOpen}
            onClose={() => setContactModalOpen(false)}
          />
          <LiveChatWidget
            onOpenDemo={() => handleOpenDemo("Live Chat Inquiry")}
            onOpenContact={handleOpenContact}
          />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
};
