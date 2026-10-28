import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GlobalPageSwitcher } from './components/GlobalPageSwitcher';
import { ScrollToTop } from './components/ScrollToTop';

// Lazy-loaded pages for optimal performance & code splitting
const Homepage = lazy(() => import('./pages/homepage/App'));
const AboutUs = lazy(() => import('./pages/about-us/App'));
const AboutUs2 = lazy(() => import('./pages/about-us-2/App'));
const Services = lazy(() => import('./pages/services/App'));
const Pricing = lazy(() => import('./pages/pricing/App'));
const Outsourcing = lazy(() => import('./pages/outsourcing/App'));
const OutsourcingPricing = lazy(() => import('./pages/outsourcing-pricing/App'));
const Training = lazy(() => import('./pages/training/App'));
const Partners = lazy(() => import('./pages/partners/App'));
const PartnerRegistry = lazy(() => import('./pages/partner-registry/App'));
const PartnerCommission = lazy(() => import('./pages/partner-commission/App'));
const PartnersAgreement = lazy(() => import('./pages/partners-agreement/App'));
const Blog = lazy(() => import('./pages/blog/App'));
const Contact = lazy(() => import('./pages/contact/App'));
const Faq = lazy(() => import('./pages/faq/App'));
const SignIn = lazy(() => import('./pages/sign-in/App'));
const PrivacyPolicy = lazy(() => import('./pages/privacy-policy/App'));
const RefundPolicy = lazy(() => import('./pages/refund-policy/App'));
const TermsConditions = lazy(() => import('./pages/terms-conditions/App'));
const JobHunt = lazy(() => import('./pages/job-hunt/JobHuntRoute'));

// Premium branded loading state
const PageLoadingFallback: React.FC = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#071322] text-slate-900 dark:text-white transition-colors">
    <div className="relative flex items-center justify-center mb-6">
      <div className="w-16 h-16 rounded-full border-4 border-blue-600/20 border-t-blue-600 animate-spin"></div>
      <div className="absolute w-8 h-8 rounded-full bg-lime-400 animate-pulse"></div>
    </div>
    <div className="text-center space-y-1 font-sans">
      <h3 className="text-base font-bold tracking-tight">NextSoftHR Platform</h3>
      <p className="text-xs text-slate-500 dark:text-slate-400">Loading experience...</p>
    </div>
  </div>
);

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class PageErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Page render error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-[#071322] text-slate-900 dark:text-white font-sans text-center">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center mb-4 text-2xl font-bold">
            !
          </div>
          <h2 className="text-xl font-bold mb-2">Something went wrong loading this section</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mb-6">
            {this.state.error?.message || 'An unexpected error occurred while rendering this page.'}
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                this.setState({ hasError: false });
                window.location.reload();
              }}
              className="px-4 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition-all cursor-pointer"
            >
              Reload Page
            </button>
            <a
              href="/"
              className="px-4 py-2 text-xs font-bold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl transition-all"
            >
              Return Home
            </a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

import { ThemeProvider } from './pages/homepage/context/ThemeContext';
import { LanguageProvider } from './pages/homepage/context/LanguageContext';
import { CurrencyProvider } from './pages/homepage/context/CurrencyContext';

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <CurrencyProvider>
          <Router>
            <ScrollToTop />
            <PageErrorBoundary>
              <Suspense fallback={<PageLoadingFallback />}>
                <div className="w-full max-w-full overflow-x-clip min-h-screen">
                  <Routes>
          {/* 1. Core Homepage */}
          <Route path="/" element={<Homepage />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />

          {/* 2 & 3. About Us Options */}
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/about" element={<Navigate to="/about-us" replace />} />
          <Route path="/about-us-2" element={<AboutUs2 />} />
          <Route path="/company" element={<Navigate to="/about-us-2" replace />} />

          {/* 4. Services */}
          <Route path="/services" element={<Services />} />
          <Route path="/solutions" element={<Navigate to="/services" replace />} />

          {/* 5. Pricing */}
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/plans" element={<Navigate to="/pricing" replace />} />
          <Route path="/cost" element={<Navigate to="/pricing" replace />} />

          {/* 6. Outsourcing */}
          <Route path="/outsourcing" element={<Outsourcing />} />
          <Route path="/bpo" element={<Navigate to="/outsourcing" replace />} />
          <Route path="/outsourcing-pricing" element={<OutsourcingPricing />} />
          <Route path="/outsourcing/pricing" element={<Navigate to="/outsourcing-pricing" replace />} />

          {/* 7. Training Academy */}
          <Route path="/training" element={<Training />} />
          <Route path="/academy" element={<Navigate to="/training" replace />} />
          <Route path="/courses" element={<Navigate to="/training" replace />} />

          {/* 8. Partners Program */}
          <Route path="/partners" element={<Partners />} />
          <Route path="/partner-program" element={<Navigate to="/partners" replace />} />

          {/* 9. Partner Registry */}
          <Route path="/partner-registry" element={<PartnerRegistry />} />
          <Route path="/directory" element={<Navigate to="/partner-registry" replace />} />

          {/* 10. Partner Commission (merged schedule + hub) */}
          <Route path="/partner-commission" element={<PartnerCommission />} />
          <Route path="/partner-commission-1" element={<Navigate to="/partner-commission" replace />} />
          <Route path="/partner-commission-2" element={<Navigate to="/partner-commission" replace />} />
          <Route path="/commission-schedule" element={<Navigate to="/partner-commission" replace />} />
          <Route path="/commission-hub" element={<Navigate to="/partner-commission" replace />} />

          {/* 12. Partner Agreement */}
          <Route path="/partners-agreement" element={<PartnersAgreement />} />
          <Route path="/partner-terms" element={<Navigate to="/partners-agreement" replace />} />

          {/* 13. Blog */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/news" element={<Navigate to="/blog" replace />} />
          <Route path="/articles" element={<Navigate to="/blog" replace />} />

          {/* Job Hunt & Recruitment Hub */}
          <Route path="/job-hunt" element={<JobHunt />} />
          <Route path="/jobs" element={<Navigate to="/job-hunt" replace />} />
          <Route path="/careers" element={<Navigate to="/job-hunt" replace />} />

          {/* 14. Contact */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/support" element={<Navigate to="/contact" replace />} />
          <Route path="/help" element={<Navigate to="/contact" replace />} />

          {/* 15. FAQ */}
          <Route path="/faq" element={<Faq />} />
          <Route path="/help-center" element={<Navigate to="/faq" replace />} />

          {/* 16. Sign In & Sign Up */}
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/login" element={<Navigate to="/sign-in" replace />} />
          <Route path="/auth" element={<Navigate to="/sign-in" replace />} />
          <Route path="/signup" element={<SignIn />} />
          <Route path="/sign-up" element={<SignIn />} />
          <Route path="/register" element={<SignIn />} />

          {/* 17. Privacy Policy */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/privacy" element={<Navigate to="/privacy-policy" replace />} />

          {/* 18. Refund Policy */}
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/refunds" element={<Navigate to="/refund-policy" replace />} />

          {/* 19. Terms & Conditions */}
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/terms" element={<Navigate to="/terms-conditions" replace />} />
          <Route path="/terms-condition" element={<Navigate to="/terms-conditions" replace />} />

          {/* Fallback to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </div>
              </Suspense>
            </PageErrorBoundary>

      {/* Omnipresent Page Switcher and Directory */}
      <GlobalPageSwitcher />
    </Router>
        </CurrencyProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
