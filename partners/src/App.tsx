import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { WhyPartner } from './components/WhyPartner';
import { PartnerCategories } from './components/PartnerCategories';
import { CommissionTiers } from './components/CommissionTiers';
import { HowItWorks } from './components/HowItWorks';
import { PartnerPortalPreview } from './components/PartnerPortalPreview';
import { PartnerBenefits } from './components/PartnerBenefits';
import { ProductEcosystem } from './components/ProductEcosystem';
import { AiStorySection } from './components/AiStorySection';
import { GlobalNetworkMap } from './components/GlobalNetworkMap';
import { SuccessStories } from './components/SuccessStories';
import { EventsTraining } from './components/EventsTraining';
import { ResourceCentre } from './components/ResourceCentre';
import { FaqSection } from './components/FaqSection';
import { ApplicationForm } from './components/ApplicationForm';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { PortalModal, EventModal } from './components/Modals';
import { PartnerBadgeModal } from './components/PartnerBadgeModal';
import { FloatingAiAssistant } from './components/FloatingAiAssistant';
import { LiveChatWidget } from './components/LiveChatWidget';
import { ResourceItem } from './types';
import { PartnerBadgeOptions } from './utils/badgeGenerator';
import { CheckCircle2, Download, Globe } from 'lucide-react';
import { useLanguage } from './context/LanguageContext';

export default function App() {
  const [selectedPartnerCategory, setSelectedPartnerCategory] = useState<string>('HR Consultant');
  const [isPortalModalOpen, setIsPortalModalOpen] = useState<boolean>(false);
  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState<boolean>(false);
  const [activeBadgeOptions, setActiveBadgeOptions] = useState<PartnerBadgeOptions | undefined>(undefined);
  const [activeEventTitle, setActiveEventTitle] = useState<string | null>(null);
  const [downloadNotification, setDownloadNotification] = useState<string | null>(null);
  const [langToast, setLangToast] = useState<{ name: string; region: string; flag: string } | null>(null);
  
  const { language, currentLanguage, isRTL } = useLanguage();
  const prevLangRef = React.useRef(language);

  React.useEffect(() => {
    if (prevLangRef.current !== language) {
      setLangToast({
        name: currentLanguage.nativeName,
        region: currentLanguage.regionFocus,
        flag: currentLanguage.flag,
      });
      const timer = setTimeout(() => {
        setLangToast(null);
      }, 3500);
      prevLangRef.current = language;
      return () => clearTimeout(timer);
    }
  }, [language, currentLanguage]);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplyClick = (category?: string) => {
    if (category) {
      setSelectedPartnerCategory(category);
    }
    scrollToSection('apply');
  };

  const handleSelectCategory = (category: string) => {
    setSelectedPartnerCategory(category);
    scrollToSection('categories');
  };

  const handleDownloadResource = (resource: ResourceItem) => {
    setDownloadNotification(`"${resource.title}" (.${resource.format.toLowerCase()}) ready for download.`);
    setTimeout(() => {
      setDownloadNotification(null);
    }, 4000);
  };

  const handleEventRegister = (title: string) => {
    setActiveEventTitle(title);
  };

  const handleOpenBadgeModal = (options?: PartnerBadgeOptions) => {
    setActiveBadgeOptions(options);
    setIsBadgeModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#040E1F] text-slate-900 dark:text-slate-100 font-sans selection:bg-[#B8F010] selection:text-[#040E1F] transition-colors duration-300">
      
      {/* Persistent Sticky Navbar */}
      <Navbar
        onApplyClick={() => handleApplyClick()}
        onPortalClick={() => setIsPortalModalOpen(true)}
      />

      <main>
        {/* Section 2: Hero */}
        <Hero
          onApplyClick={() => handleApplyClick()}
          onExploreBenefits={() => scrollToSection('benefits')}
        />

        {/* Section 3: Trust Strip */}
        <TrustStrip />

        {/* Section 4: Why Partner With NextSofthr */}
        <WhyPartner onApplyClick={() => handleApplyClick()} />

        {/* Section 5: Partner Categories & Profiles */}
        <PartnerCategories 
          onApplyCategory={(cat) => handleApplyClick(cat)}
          onSelectCategory={(cat) => handleSelectCategory(cat)}
        />

        {/* Section 6: Commission & Revenue Share Tiers */}
        <CommissionTiers 
          onApplyClick={() => handleApplyClick()} 
          onOpenBadgeModal={handleOpenBadgeModal}
        />

        {/* Section 7: How the Partner Program Works */}
        <HowItWorks onApplyClick={() => handleApplyClick()} />

        {/* Section 8: Partner Dashboard / Portal Preview */}
        <PartnerPortalPreview 
          onAccessPortal={() => setIsPortalModalOpen(true)} 
          onOpenBadgeModal={handleOpenBadgeModal}
        />

        {/* Section 9: Partner Benefits */}
        <PartnerBenefits onApplyClick={() => handleApplyClick()} />

        {/* Section 10: NextSofthr Product Ecosystem */}
        <ProductEcosystem />

        {/* Section 11: AI-Powered Partnership Story */}
        <AiStorySection />

        {/* Section 12: Africa + Global Partner Network */}
        <GlobalNetworkMap />

        {/* Section 13: Partner Success Stories */}
        <SuccessStories onOpenBadgeModal={handleOpenBadgeModal} />

        {/* Section 14: Partner Events & Training */}
        <EventsTraining onRegisterClick={handleEventRegister} />

        {/* Section 15: Partner Resource Centre */}
        <ResourceCentre onDownloadResource={handleDownloadResource} />

        {/* Section 16: FAQ Section */}
        <FaqSection onContactClick={() => scrollToSection('apply')} />

        {/* Section 17: High-Conversion Partner Application Form */}
        <ApplicationForm initialPartnerType={selectedPartnerCategory} />

        {/* Section 18: Final Closing CTA */}
        <FinalCta
          onApplyClick={() => handleApplyClick()}
          onContactClick={() => scrollToSection('apply')}
        />
      </main>

      {/* Section 19: Footer */}
      <Footer
        onApplyClick={() => handleApplyClick()}
        onPortalClick={() => setIsPortalModalOpen(true)}
      />

      {/* Modals & Overlay Alerts */}
      <PortalModal
        isOpen={isPortalModalOpen}
        onClose={() => setIsPortalModalOpen(false)}
        onGoToApply={() => handleApplyClick()}
      />

      {/* Partner Certification Badge Studio & Verifier Modal */}
      <PartnerBadgeModal
        isOpen={isBadgeModalOpen}
        onClose={() => setIsBadgeModalOpen(false)}
        initialOptions={activeBadgeOptions}
      />

      {activeEventTitle && (
        <EventModal
          isOpen={!!activeEventTitle}
          eventTitle={activeEventTitle}
          onClose={() => setActiveEventTitle(null)}
        />
      )}

      {/* Floating AI Partner Selection Assistant */}
      <FloatingAiAssistant
        onSelectCategory={handleSelectCategory}
        onApplyWithCategory={handleApplyClick}
        selectedCategory={selectedPartnerCategory}
      />

      {/* Floating Live Chat & Support Help Dialog */}
      <LiveChatWidget onGoToApply={() => handleApplyClick()} />

      {/* Toast Notification for Downloads */}
      {downloadNotification && (
        <div className="fixed bottom-24 right-6 z-40 bg-[#071D3E] border-2 border-[#B8F010] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-200">
          <div className="w-8 h-8 rounded-full bg-[#B8F010] text-[#040E1F] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="text-xs">
            <span className="font-bold text-[#B8F010] block">Resource Access Granted</span>
            <span className="text-slate-300">{downloadNotification}</span>
          </div>
        </div>
      )}

      {/* Toast Notification for Language Switch */}
      {langToast && (
        <div className={`fixed bottom-24 ${isRTL ? 'left-6' : 'right-6'} z-40 bg-white dark:bg-[#071D3E] border-2 border-blue-500 dark:border-[#B8F010] text-slate-900 dark:text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3.5 animate-in slide-in-from-bottom-5 duration-200`}>
          <div className="text-2xl shrink-0">
            {langToast.flag}
          </div>
          <div className="text-xs">
            <span className="font-bold text-blue-700 dark:text-[#B8F010] block flex items-center gap-1.5">
              <span>{langToast.name}</span>
              <span className="text-[10px] font-normal px-1.5 py-0.2 rounded bg-blue-100 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300 uppercase">
                Active Locale
              </span>
            </span>
            <span className="text-slate-600 dark:text-slate-300 font-medium">{langToast.region}</span>
          </div>
        </div>
      )}

    </div>
  );
}
