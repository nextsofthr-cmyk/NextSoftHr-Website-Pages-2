import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PricingHero } from './components/PricingHero';
import { BillingToggle } from './components/BillingToggle';
import { PricingCard } from './components/PricingCard';
import { CardSlider } from './components/CardSlider';
import { PricingCalculator } from './components/PricingCalculator';
import { FeatureComparison } from './components/FeatureComparison';
import { AISection } from './components/AISection';
import { IncludedEssentials } from './components/IncludedEssentials';
import { BusinessScale } from './components/BusinessScale';
import { GlobalSupport } from './components/GlobalSupport';
import { SecuritySection } from './components/SecuritySection';
import { Testimonials } from './components/Testimonials';
import { IndustrySolutions } from './components/IndustrySolutions';
import { AddOnsSection } from './components/AddOnsSection';
import { FreeTrialSection } from './components/FreeTrialSection';
import { FAQSection } from './components/FAQSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { TrialModal, DemoModal, ContactSalesModal, SecurityModal } from './components/Modals';
import { MobileStickyCTA } from './components/MobileStickyCTA';
import { LiveChatWidget } from './components/LiveChatWidget';
import { LimitedTrialBonusBanner } from './components/LimitedTrialBonusBanner';
import { PRICING_PLANS } from './data/pricingData';
import { BillingCycle, CurrencyCode, PricingPlan, IndustrySolution, AddOnItem } from './types';
import { useLanguage } from './context/LanguageContext';
import { useCurrency } from './context/CurrencyContext';

export default function App() {
  const { t } = useLanguage();
  const { selectedCurrency, setSelectedCurrency } = useCurrency();
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('yearly');

  // Theme State: 'light' | 'dark'
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('nextsofthr-theme');
      if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme;
      }
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('nextsofthr-theme', theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Modal States
  const [trialModalOpen, setTrialModalOpen] = useState(false);
  const [selectedPlanForTrial, setSelectedPlanForTrial] = useState('Pay As You Scale');
  const [trialEmployeeCount, setTrialEmployeeCount] = useState(50);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [salesModalOpen, setSalesModalOpen] = useState(false);
  const [securityModalOpen, setSecurityModalOpen] = useState(false);

  // Handlers
  const handleOpenTrial = (planName: string = 'Pay As You Scale', empCount: number = 50) => {
    setSelectedPlanForTrial(planName);
    setTrialEmployeeCount(empCount);
    setTrialModalOpen(true);
  };

  const handleOpenDemo = () => {
    setDemoModalOpen(true);
  };

  const handleOpenSales = () => {
    setSalesModalOpen(true);
  };

  const handleSelectPlan = (plan: PricingPlan) => {
    if (plan.id === 'enterprise') {
      handleOpenSales();
    } else {
      handleOpenTrial(plan.name);
    }
  };

  const handleCalculatorGetStarted = (planName: string, empCount: number) => {
    if (planName === 'Enterprise') {
      handleOpenSales();
    } else {
      handleOpenTrial(planName, empCount);
    }
  };

  const handleExploreIndustry = (industry: IndustrySolution) => {
    handleOpenDemo();
  };

  const handleAddOnsCheckout = (items: AddOnItem[], total: number) => {
    handleOpenTrial(`Pay As You Scale + ${items.length} Add-on(s)`);
  };

  const scrollToPricing = () => {
    const el = document.getElementById('pricing-plans');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#070D1E] text-[#0F172A] dark:text-slate-100 font-sans antialiased flex flex-col selection:bg-[#A3E635] selection:text-[#0F172A] transition-colors duration-200">
      {/* 1. Header Navigation */}
      <Header
        onOpenTrial={() => handleOpenTrial()}
        onOpenDemo={handleOpenDemo}
        selectedCurrency={selectedCurrency}
        onSelectCurrency={setSelectedCurrency}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <PricingHero
          selectedCurrency={selectedCurrency}
          onExplorePlans={scrollToPricing}
          onOpenDemo={handleOpenDemo}
          onOpenTrial={() => handleOpenTrial()}
        />

        {/* 3. Pricing Cards Section */}
        <section id="pricing-plans" className="pt-10 pb-20 bg-white dark:bg-[#0B132B] relative transition-colors duration-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Subtitle */}
            <div className="text-center max-w-2xl mx-auto mb-4">
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0B132B] dark:text-white">
                {t.plans.sectionTitle}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">
                {t.plans.sectionSubtitle}
              </p>
            </div>

            {/* Billing Toggle (Monthly / Yearly) */}
            <BillingToggle
              billingCycle={billingCycle}
              onChangeBillingCycle={setBillingCycle}
              selectedCurrency={selectedCurrency}
              onChangeCurrency={setSelectedCurrency}
            />

            {/* 3 in a row Sliding Pricing Cards */}
            <div className="mt-8">
              <CardSlider
                id="pricing-plans-slider"
                ariaLabel="NextSofthr pricing plans"
                items={PRICING_PLANS}
                perView={{ base: 1, md: 2, lg: 3, xl: 3 }}
                stepMode="item"
                gap={24}
                renderItem={(plan) => (
                  <div className="h-full flex-1 flex flex-col self-stretch">
                    <PricingCard
                      plan={plan}
                      billingCycle={billingCycle}
                      selectedCurrency={selectedCurrency}
                      onSelectPlan={handleSelectPlan}
                      onOpenEnterpriseDemo={handleOpenDemo}
                    />
                  </div>
                )}
              />
            </div>
          </div>
        </section>

        {/* 4. Interactive Employee-Based Pricing Calculator */}
        <PricingCalculator
          billingCycle={billingCycle}
          selectedCurrency={selectedCurrency}
          onGetStarted={handleCalculatorGetStarted}
        />

        {/* 5. Comprehensive Feature Comparison Table */}
        <FeatureComparison
          onSelectPlan={(planName) => {
            if (planName === 'Enterprise') handleOpenSales();
            else handleOpenTrial(planName);
          }}
        />

        {/* 6. Extend Your NextSofthr Platform (Add-ons & Modules) */}
        <AddOnsSection
          billingCycle={billingCycle}
          selectedCurrency={selectedCurrency}
          onOpenBundleCheckout={handleAddOnsCheckout}
        />

        {/* 7. AI-Powered HR & Payroll Assistant Section (Experience the Built-in AI HR & Payroll Copilot) */}
        <AISection />

        {/* 8. What's Included in Every Plan */}
        <IncludedEssentials />

        {/* 9. Business Scale Section */}
        <BusinessScale
          onSelectPlan={(planName) => {
            if (planName === 'Enterprise') handleOpenSales();
            else handleOpenTrial(planName);
          }}
        />

        {/* 10. Global Business Support */}
        <GlobalSupport />

        {/* 11. Security & Trust Section */}
        <SecuritySection onLearnMoreSecurity={() => setSecurityModalOpen(true)} />

        {/* 12. Customer Success & Social Proof */}
        <Testimonials />

        {/* 13. Industry Solutions */}
        <IndustrySolutions onExploreIndustry={handleExploreIndustry} />

        {/* 14. Free Trial Conversion Section */}
        <FreeTrialSection
          onOpenTrial={() => handleOpenTrial()}
          onOpenDemo={handleOpenDemo}
        />

        {/* 15. FAQ Section (All 20 Questions) */}
        <FAQSection />

        {/* 16. Final Full-Width CTA */}
        <FinalCTA
          onOpenTrial={() => handleOpenTrial()}
          onOpenDemo={handleOpenDemo}
        />
      </main>

      {/* 17. Comprehensive Footer */}
      <Footer />

      {/* Modals */}
      <TrialModal
        isOpen={trialModalOpen}
        onClose={() => setTrialModalOpen(false)}
        initialPlan={selectedPlanForTrial}
        employeeCount={trialEmployeeCount}
      />

      <DemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
      />

      <ContactSalesModal
        isOpen={salesModalOpen}
        onClose={() => setSalesModalOpen(false)}
      />

      <SecurityModal
        isOpen={securityModalOpen}
        onClose={() => setSecurityModalOpen(false)}
      />

      {/* Mobile Sticky CTA Bar */}
      <MobileStickyCTA
        onOpenTrial={() => handleOpenTrial()}
        onOpenDemo={handleOpenDemo}
      />

      {/* Floating Live Chat Action Widget to Contact Support Agents */}
      <LiveChatWidget
        selectedCurrency={selectedCurrency}
        onOpenTrial={() => handleOpenTrial()}
        onOpenDemo={handleOpenDemo}
      />

      {/* Subtle Limited Time Trial Bonus Banner triggering at page bottom */}
      <LimitedTrialBonusBanner
        onClaimBonus={() => handleOpenTrial('Pay As You Scale (With Limited Trial Bonus)')}
      />
    </div>
  );
}
