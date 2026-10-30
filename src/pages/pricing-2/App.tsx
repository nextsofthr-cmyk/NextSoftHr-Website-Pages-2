import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PricingHero } from './components/PricingHero';
import { BillingToggle } from './components/BillingToggle';
import { PricingCard } from './components/PricingCard';
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
import { SubscriptionCheckoutModal } from './components/SubscriptionCheckoutModal';
import { FloatingCartWidget } from './components/FloatingCartWidget';
import { CountryPricingToggle } from './components/CountryPricingToggle';
import { QuickStartWizardModal } from './components/QuickStartWizardModal';
import { PRICING_PLANS, ADD_ONS } from './data/pricingData';
import { PPP_REGIONS, getPPPRegionById, PPPRegion } from './data/pppPricing';
import { Share2, X, Check } from 'lucide-react';
import {
  BillingCycle,
  CurrencyCode,
  PricingPlan,
  IndustrySolution,
  AddOnItem,
  QuickStartCompanyData,
} from './types';
import { useLanguage } from './context/LanguageContext';
import { useCurrency } from './context/CurrencyContext';

// SessionStorage Keys for cart and plan configuration persistence
const STORAGE_KEY_PLAN = 'nextsofthr_cart_plan';
const STORAGE_KEY_ADDONS = 'nextsofthr_cart_addons';
const STORAGE_KEY_CYCLE = 'nextsofthr_billing_cycle';

export default function App() {
  const { t, tx } = useLanguage();
  const { selectedCurrency, setSelectedCurrency } = useCurrency();

  // Billing Cycle State with sessionStorage persistence
  const [billingCycle, setBillingCycle] = useState<BillingCycle>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedCycle = sessionStorage.getItem(STORAGE_KEY_CYCLE);
        if (savedCycle === 'monthly' || savedCycle === 'yearly') {
          return savedCycle;
        }
      } catch (e) {
        // Fallback gracefully
      }
    }
    return 'yearly';
  });

  // Headcount state for interactive pricing card calculations
  const [headcount, setHeadcount] = useState<number>(25);

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
  const [selectedPlanForTrial, setSelectedPlanForTrial] = useState('Professional');
  const [trialEmployeeCount, setTrialEmployeeCount] = useState(50);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [salesModalOpen, setSalesModalOpen] = useState(false);
  const [securityModalOpen, setSecurityModalOpen] = useState(false);

  // Subscription & Cart State with sessionStorage persistence
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedPlan = sessionStorage.getItem(STORAGE_KEY_PLAN);
        if (savedPlan && PRICING_PLANS.some((p) => p.id === savedPlan)) {
          return savedPlan;
        }
      } catch (e) {
        // Fallback
      }
    }
    return 'professional';
  });

  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedAddOns = sessionStorage.getItem(STORAGE_KEY_ADDONS);
        if (savedAddOns) {
          const parsed = JSON.parse(savedAddOns);
          if (Array.isArray(parsed)) {
            const validIds = new Set(ADD_ONS.map((a) => a.id));
            return parsed.filter((id) => typeof id === 'string' && validIds.has(id));
          }
        }
      } catch (e) {
        // Fallback
      }
    }
    return [];
  });

  // Persist selected plan to sessionStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem(STORAGE_KEY_PLAN, selectedPlanForCheckout);
      } catch (e) {
        // Ignore quota/security errors
      }
    }
  }, [selectedPlanForCheckout]);

  // Persist selected add-on modules to sessionStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem(STORAGE_KEY_ADDONS, JSON.stringify(selectedAddOnIds));
      } catch (e) {
        // Ignore quota/security errors
      }
    }
  }, [selectedAddOnIds]);

  // Persist billing cycle preference to sessionStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem(STORAGE_KEY_CYCLE, billingCycle);
      } catch (e) {
        // Ignore quota/security errors
      }
    }
  }, [billingCycle]);

  // Notice banner when a shared cart is restored from URL params (holds the restored plan name)
  const [sharedCartNotice, setSharedCartNotice] = useState<string | null>(null);

  // Restore cart configuration from Shared URL parameters if present
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const urlPlan = searchParams.get('plan');
      const urlCycle = searchParams.get('cycle');
      const urlCurrency = searchParams.get('currency');
      const urlAddOns = searchParams.get('addons');
      const urlPPP = searchParams.get('ppp');

      let restoredSomething = false;

      if (urlPlan && PRICING_PLANS.some((p) => p.id === urlPlan)) {
        setSelectedPlanForCheckout(urlPlan);
        restoredSomething = true;
      }

      if (urlCycle === 'monthly' || urlCycle === 'yearly') {
        setBillingCycle(urlCycle);
        restoredSomething = true;
      }

      if (urlCurrency) {
        setSelectedCurrency(urlCurrency as CurrencyCode);
        restoredSomething = true;
      }

      if (urlAddOns) {
        const ids = urlAddOns.split(',').filter(Boolean);
        const validIds = new Set(ADD_ONS.map((a) => a.id));
        const filtered = ids.filter((id) => validIds.has(id));
        if (filtered.length > 0) {
          setSelectedAddOnIds(filtered);
          restoredSomething = true;
        }
      }

      if (urlPPP) {
        const region = PPP_REGIONS.find((r) => r.id === urlPPP);
        if (region) {
          setSelectedPPPRegionId(region.id);
          setIsPPPActive(region.id !== 'global');
          restoredSomething = true;
        }
      }

      if (restoredSomething) {
        const planObj = PRICING_PLANS.find((p) => p.id === urlPlan) || PRICING_PLANS[1];
        setSharedCartNotice(planObj.name);
        const timer = setTimeout(() => {
          setSharedCartNotice(null);
        }, 6000);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      // Gracefully ignore parsing errors
    }
  }, []);

  // Subscription Checkout Handlers
  const handleOpenCheckout = (planId?: string, addOns?: AddOnItem[]) => {
    if (planId) {
      setSelectedPlanForCheckout(planId);
    }
    if (addOns) {
      setSelectedAddOnIds(addOns.map((a) => a.id));
    }
    setCheckoutModalOpen(true);
  };

  const handleToggleAddOn = (id: string) => {
    setSelectedAddOnIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleClearCart = () => {
    setSelectedAddOnIds([]);
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem(STORAGE_KEY_ADDONS, JSON.stringify([]));
      } catch (e) {
        // Fallback
      }
    }
  };

  // Select All Add-ons in Cart Handler
  const handleSelectAllAddOns = (selectAll: boolean) => {
    if (selectAll) {
      const allIds = ADD_ONS.map((a) => a.id);
      setSelectedAddOnIds(allIds);
      if (typeof window !== 'undefined') {
        try {
          sessionStorage.setItem(STORAGE_KEY_ADDONS, JSON.stringify(allIds));
        } catch (e) {
          // Fallback
        }
      }
    } else {
      handleClearCart();
    }
  };

  // Purchasing Power Parity (Country-Specific Pricing Table) State
  const [isPPPActive, setIsPPPActive] = useState<boolean>(false);
  const [selectedPPPRegionId, setSelectedPPPRegionId] = useState<string>('india');

  const activePPPRegion = isPPPActive ? getPPPRegionById(selectedPPPRegionId) : getPPPRegionById('global');

  const handleSelectPPPRegion = (region: PPPRegion) => {
    setSelectedPPPRegionId(region.id);
    if (region.id !== 'global') {
      setIsPPPActive(true);
      setSelectedCurrency(region.currency);
    } else {
      setIsPPPActive(false);
    }
  };

  // Quick Start Wizard State
  const [quickStartModalOpen, setQuickStartModalOpen] = useState<boolean>(false);
  const [quickStartData, setQuickStartData] = useState<Partial<QuickStartCompanyData>>({
    companyName: 'Apex Global Innovations Ltd',
    adminName: 'Elena Rostova',
    adminEmail: 'elena@company.com',
    currency: selectedCurrency,
    selectedPlan: 'Professional Plan',
  });

  const handleStartQuickStart = (data: {
    companyName: string;
    fullName: string;
    workEmail: string;
    teamSize: string;
    plan: string;
    phone?: string;
  }) => {
    setQuickStartData({
      companyName: data.companyName || 'Apex Global Innovations Ltd',
      adminName: data.fullName || 'Elena Rostova',
      adminEmail: data.workEmail || 'elena@company.com',
      employeeSize: `${data.teamSize} staff`,
      selectedPlan: data.plan,
      adminPhone: data.phone,
      currency: selectedCurrency,
    });
    setTrialModalOpen(false);
    setQuickStartModalOpen(true);
  };

  // Handlers
  const handleOpenTrial = (planName: string = 'Professional', empCount: number = 50) => {
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
    handleOpenCheckout(selectedPlanForCheckout, items);
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
        onOpenCheckout={() => handleOpenCheckout()}
        cartItemCount={selectedAddOnIds.length + 1}
        onOpenQuickStart={() => setQuickStartModalOpen(true)}
      />

      <main className="flex-1 notranslate" translate="no">
        {/* 2. Hero Section */}
        <PricingHero
          selectedCurrency={selectedCurrency}
          onExplorePlans={scrollToPricing}
          onOpenDemo={handleOpenDemo}
          onOpenTrial={() => handleOpenTrial()}
          onOpenQuickStart={() => setQuickStartModalOpen(true)}
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

            {/* Country-Specific Pricing Table (Purchasing Power Parity Toggle) */}
            <CountryPricingToggle
              isPPPEnabled={isPPPActive}
              onTogglePPP={setIsPPPActive}
              selectedRegionId={selectedPPPRegionId}
              onSelectRegion={handleSelectPPPRegion}
            />

            {/* Billing Toggle (Monthly / Yearly) & Headcount Toolbar */}
            <BillingToggle
              billingCycle={billingCycle}
              onChangeBillingCycle={setBillingCycle}
              selectedCurrency={selectedCurrency}
              onChangeCurrency={setSelectedCurrency}
              headcount={headcount}
              onChangeHeadcount={setHeadcount}
            />

            {/* 4 Pricing Cards Grid */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              {PRICING_PLANS.map((plan) => (
                <PricingCard
                  key={plan.id}
                  plan={plan}
                  billingCycle={billingCycle}
                  selectedCurrency={selectedCurrency}
                  headcount={headcount}
                  onChangeHeadcount={setHeadcount}
                  onSelectPlan={handleSelectPlan}
                  onSubscribePlan={(p) => {
                    if (p.id === 'enterprise') {
                      handleOpenSales();
                    } else {
                      handleOpenCheckout(p.id);
                    }
                  }}
                  onOpenEnterpriseDemo={handleOpenDemo}
                  pppFactor={isPPPActive ? activePPPRegion.factor : 1.0}
                  pppBadgeText={isPPPActive ? activePPPRegion.badgeText : undefined}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 4. Interactive Employee-Based Pricing Calculator */}
        <PricingCalculator
          billingCycle={billingCycle}
          selectedCurrency={selectedCurrency}
          onGetStarted={handleCalculatorGetStarted}
          pppFactor={isPPPActive ? activePPPRegion.factor : 1.0}
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
          selectedAddOnIds={selectedAddOnIds}
          onToggleAddOn={handleToggleAddOn}
          onOpenBundleCheckout={handleAddOnsCheckout}
        />

        {/* 7. AI-Powered HR & Payroll Assistant Section */}
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

      {/* Overlays are translated by React; keep Google Translate's DOM rewriting out so prices and
          language switches re-render correctly. */}
      <div className="notranslate" translate="no">
        {/* Modals */}
        <TrialModal
          isOpen={trialModalOpen}
          onClose={() => setTrialModalOpen(false)}
          initialPlan={selectedPlanForTrial}
          employeeCount={trialEmployeeCount}
          onStartQuickStart={handleStartQuickStart}
        />

        {/* Quick Start Wizard Modal */}
        <QuickStartWizardModal
          isOpen={quickStartModalOpen}
          onClose={() => setQuickStartModalOpen(false)}
          initialData={quickStartData}
          onComplete={(data) => {
            // Log or trigger additional actions
          }}
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

        {/* Subscription Checkout Modal with 20 Regional & Global Gateways, VAT, Promo Codes & Receipt */}
        <SubscriptionCheckoutModal
          isOpen={checkoutModalOpen}
          onClose={() => setCheckoutModalOpen(false)}
          initialPlanId={selectedPlanForCheckout}
          initialBillingCycle={billingCycle}
          initialSelectedAddOns={ADD_ONS.filter((a) => selectedAddOnIds.includes(a.id))}
          onUpdatePlan={setSelectedPlanForCheckout}
          onUpdateAddOns={setSelectedAddOnIds}
          onUpdateBillingCycle={setBillingCycle}
          onClearAddOns={handleClearCart}
          pppFactor={isPPPActive ? activePPPRegion.factor : 1.0}
          pppRegionName={isPPPActive ? activePPPRegion.name : undefined}
        />

        {/* Floating Cart Widget (Appears whenever add-on modules are selected) */}
        {selectedAddOnIds.length > 0 && (
          <FloatingCartWidget
            selectedPlanId={selectedPlanForCheckout}
            selectedAddOns={ADD_ONS.filter((a) => selectedAddOnIds.includes(a.id))}
            billingCycle={billingCycle}
            onOpenCheckout={() => handleOpenCheckout()}
            onClearCart={handleClearCart}
            onRemoveAddOn={handleToggleAddOn}
            onChangeBillingCycle={setBillingCycle}
            onSelectAllAddOns={handleSelectAllAddOns}
            pppFactor={isPPPActive ? activePPPRegion.factor : 1.0}
            pppRegionId={isPPPActive ? activePPPRegion.id : 'global'}
          />
        )}

        {/* Shared Cart URL Notification Toast */}
        {sharedCartNotice && (
          <div
            id="shared-cart-loaded-banner"
            className="fixed top-20 right-4 z-50 p-3.5 rounded-2xl bg-slate-900 text-white border-2 border-lime-400 shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-4 duration-300 max-w-md text-xs font-medium"
          >
            <div className="w-8 h-8 rounded-xl bg-[#A3E635] text-slate-950 flex items-center justify-center font-bold shrink-0 shadow-xs">
              <Share2 className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="font-bold text-white flex items-center gap-1.5">
                <span>{tx('Shared Cart Restored')}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-lime-400 text-slate-950 font-extrabold uppercase">
                  {tx('Synchronized')}
                </span>
              </div>
              <div className="text-slate-300 text-[11px] mt-0.5">{tx('Loaded shared team configuration: {plan} plan with customized subscription settings.', { plan: tx(sharedCartNotice) })}</div>
            </div>
            <button
              type="button"
              onClick={() => setSharedCartNotice(null)}
              className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label={tx('Dismiss Notification')}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

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
          onClaimBonus={() => handleOpenTrial('Professional (With Limited Trial Bonus)')}
        />
      </div>
    </div>
  );
}
