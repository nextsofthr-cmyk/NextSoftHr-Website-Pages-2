import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { GlobalPartnerMap } from './components/GlobalPartnerMap';
import { DirectorySection } from './components/DirectorySection';
import { PartnerLevelSystem } from './components/PartnerLevelSystem';
import { WhyWorkWithPartner } from './components/WhyWorkWithPartner';
import { AfricaFirstSection } from './components/AfricaFirstSection';
import { FeaturedPartners } from './components/FeaturedPartners';
import { PartnersByCountry } from './components/PartnersByCountry';
import { PartnersByService } from './components/PartnersByService';
import { PartnerSuccessStories } from './components/PartnerSuccessStories';
import { VideoSection } from './components/VideoSection';
import { BecomePartnerCTA } from './components/BecomePartnerCTA';
import { PartnerReferralSection } from './components/PartnerReferralSection';
import { PartnerRegistrationSection } from './components/PartnerRegistrationSection';
import { TrustSection } from './components/TrustSection';
import { FAQSection } from './components/FAQSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { PartnerProfileModal } from './components/PartnerProfileModal';
import { PartnerPortalModal } from './components/PartnerPortalModal';
import { AiPartnerMatchSection } from './components/AiPartnerMatchSection';
import { AiPartnerMatchWidget } from './components/AiPartnerMatchWidget';
import { FloatingAiMatchButton } from './components/FloatingAiMatchButton';
import { LiveChatWidget } from './components/LiveChatWidget';
import { Sparkles } from 'lucide-react';

import { MOCK_PARTNERS } from './data/partners';
import { Partner, FilterState, PartnerApplication, PartnerEnquiry } from './types';

export default function App() {
  // Global filter state
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    country: '',
    city: '',
    partnerType: '',
    industry: '',
    businessSize: '',
    service: '',
    partnerLevel: '',
    verifiedOnly: false,
    sortBy: 'recommended'
  });

  // Modal states
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isPortalModalOpen, setIsPortalModalOpen] = useState(false);
  const [isAiMatchModalOpen, setIsAiMatchModalOpen] = useState(false);

  // Theme state: dark mode with localStorage support and system preference fallback
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nextsofthr_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('nextsofthr_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('nextsofthr_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  // Application and Enquiry logs
  const [applications, setApplications] = useState<PartnerApplication[]>([
    {
      id: 'app-001',
      companyName: 'Lakeshore Advisory Partners',
      contactPerson: 'Adewale Coker',
      email: 'a.coker@lakeshoreadv.ng',
      phone: '+234 803 219 9840',
      country: 'Nigeria',
      city: 'Lagos',
      partnerType: 'HR Consultant',
      website: 'https://lakeshoreadv.ng',
      numberOfEmployees: '11-50',
      servicesOffered: ['HR Consulting', 'Payroll Implementation', 'Compliance Support'],
      motivation: 'We manage over 40 SME clients looking for a cloud HR and biometric shift platform.',
      status: 'In Review',
      createdAt: new Date().toISOString()
    }
  ]);

  const [enquiries, setEnquiries] = useState<PartnerEnquiry[]>([
    {
      id: 'enq-001',
      partnerId: 'next-hr-solutions',
      partnerName: 'NextHR Solutions Ltd',
      fullName: 'Amina Yusuf',
      company: 'Kano Agro Allied Foods',
      email: 'amina.yusuf@kanoagro.ng',
      phone: '+234 812 555 0192',
      country: 'Nigeria',
      businessSize: 'Medium Business (51-250 staff)',
      serviceNeeded: 'Biometric Attendance & Shift Scheduling',
      message: 'We require a factory-wide biometric clocking integration across 2 manufacturing plants.',
      createdAt: new Date().toISOString()
    }
  ]);

  // Handler from Hero Search
  const handleHeroSearch = (searchData: {
    query: string;
    country: string;
    city: string;
    industry: string;
    partnerType: string;
  }) => {
    setFilters(prev => ({
      ...prev,
      searchQuery: searchData.query,
      country: searchData.country,
      city: searchData.city,
      industry: searchData.industry,
      partnerType: searchData.partnerType
    }));
  };

  // Profile modal triggers
  const handleViewProfile = (partner: Partner) => {
    setSelectedPartner(partner);
    setIsProfileModalOpen(true);
  };

  const handleContactPartner = (partner: Partner) => {
    setSelectedPartner(partner);
    setIsProfileModalOpen(true);
  };

  // Submission handlers
  const handleEnquirySubmit = (newEnquiry: Omit<PartnerEnquiry, 'id' | 'createdAt'>) => {
    const created: PartnerEnquiry = {
      ...newEnquiry,
      id: `enq-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setEnquiries(prev => [created, ...prev]);
  };

  const handleApplicationSubmit = (newApp: Omit<PartnerApplication, 'id' | 'status' | 'createdAt'>) => {
    const created: PartnerApplication = {
      ...newApp,
      id: `app-${Date.now()}`,
      status: 'Pending Verification',
      createdAt: new Date().toISOString()
    };
    setApplications(prev => [created, ...prev]);
  };

  const scrollToDirectory = () => {
    const el = document.getElementById('directory');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToRegistration = () => {
    const el = document.getElementById('registration');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#061124] text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-[#c8f526] selection:text-[#071938] transition-colors duration-300">
      
      {/* 1. Global Navigation Bar */}
      <Navbar
        onSelectCountry={(country) => {
          setFilters(prev => ({ ...prev, country, city: '' }));
          scrollToDirectory();
        }}
        onBecomePartnerClick={scrollToRegistration}
        onPartnerPortalClick={() => setIsPortalModalOpen(true)}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        onOpenAiMatch={() => setIsAiMatchModalOpen(true)}
      />

      {/* 2. Hero Section with Search Interface */}
      <Hero
        onSearch={handleHeroSearch}
        onBecomePartnerClick={scrollToRegistration}
        onOpenAiMatch={() => setIsAiMatchModalOpen(true)}
      />

      {/* 3. Interactive Global Partner Map */}
      <GlobalPartnerMap
        onSelectCountry={(country) => {
          setFilters(prev => ({ ...prev, country, city: '' }));
          scrollToDirectory();
        }}
      />

      {/* 3.5. AI-Powered Partner Match Assistant */}
      <AiPartnerMatchSection
        partners={MOCK_PARTNERS}
        onViewProfile={handleViewProfile}
        onContactPartner={handleContactPartner}
      />

      {/* 4. Partner Directory Search & Cards */}
      <DirectorySection
        partners={MOCK_PARTNERS}
        filters={filters}
        onFilterChange={setFilters}
        onViewProfile={handleViewProfile}
        onContactPartner={handleContactPartner}
      />

      {/* 5. Partner Level System (Advancement Tiers) */}
      <PartnerLevelSystem
        onApplyClick={scrollToRegistration}
      />

      {/* 6. Why Work With a NextSofthr Partner? */}
      <WhyWorkWithPartner
        onFindPartnerClick={scrollToDirectory}
      />

      {/* 7. Africa-First Global Network */}
      <AfricaFirstSection
        onExploreHubsClick={scrollToDirectory}
      />

      {/* 8. Featured Partners */}
      <FeaturedPartners
        partners={MOCK_PARTNERS}
        onViewProfile={handleViewProfile}
        onViewAllClick={scrollToDirectory}
      />

      {/* 9. Partners by Country Directory */}
      <PartnersByCountry
        onSelectCountry={(country) => {
          setFilters(prev => ({ ...prev, country, city: '' }));
          scrollToDirectory();
        }}
      />

      {/* 10. Partners by Service Directory */}
      <PartnersByService
        onSelectService={(service) => {
          setFilters(prev => ({ ...prev, service }));
          scrollToDirectory();
        }}
      />

      {/* 11. Partner Success Stories */}
      <PartnerSuccessStories
        onFindPartnerClick={scrollToDirectory}
      />

      {/* 12. Video Spotlight Section */}
      <VideoSection />

      {/* 13. Become a Partner CTA & 8 Partner Benefits */}
      <BecomePartnerCTA
        onRegisterClick={scrollToRegistration}
      />

      {/* 13.5. Partner Referral & Rewards Program */}
      <PartnerReferralSection />

      {/* 14. Partner Registration Application Intake Section */}
      <PartnerRegistrationSection
        onApplicationSubmit={handleApplicationSubmit}
      />

      {/* 15. Trust, Architecture & Security Section */}
      <TrustSection />

      {/* 16. Frequently Asked Questions (FAQ Accordion) */}
      <FAQSection />

      {/* 17. Final Call to Action */}
      <FinalCTA
        onSearchClick={scrollToDirectory}
        onBecomePartnerClick={scrollToRegistration}
      />

      {/* 18. Global Footer */}
      <Footer
        onSelectCountry={(country) => {
          setFilters(prev => ({ ...prev, country, city: '' }));
          scrollToDirectory();
        }}
        onOpenPartnerPortal={() => setIsPortalModalOpen(true)}
      />

      {/* Floating Bottom-Right Action Cluster: Live Support Chat & AI Partner Match */}
      <div className="fixed bottom-6 right-4 sm:right-6 z-40 flex items-center gap-2 sm:gap-3">
        {/* Floating AI Partner Match Launcher Button with Robust Custom Tooltip */}
        <FloatingAiMatchButton onClick={() => setIsAiMatchModalOpen(true)} />

        {/* Floating Live Chat Icon & Support Help Dialog */}
        <LiveChatWidget
          allPartners={MOCK_PARTNERS}
          onOpenDirectory={scrollToDirectory}
          onOpenRegistration={scrollToRegistration}
          onOpenAiMatch={() => setIsAiMatchModalOpen(true)}
        />
      </div>

      {/* Floating AI Partner Match Modal */}
      {isAiMatchModalOpen && (
        <AiPartnerMatchWidget
          allPartners={MOCK_PARTNERS}
          onViewProfile={handleViewProfile}
          onContactPartner={handleContactPartner}
          isOpen={isAiMatchModalOpen}
          onClose={() => setIsAiMatchModalOpen(false)}
          isFloating={true}
        />
      )}

      {/* Modals */}
      <PartnerProfileModal
        partner={selectedPartner}
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onSubmitEnquiry={handleEnquirySubmit}
      />

      <PartnerPortalModal
        isOpen={isPortalModalOpen}
        onClose={() => setIsPortalModalOpen(false)}
        applications={applications}
        enquiries={enquiries}
      />

    </div>
  );
}
