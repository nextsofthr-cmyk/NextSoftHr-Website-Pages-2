import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";

// Auto-generated Routes
import AboutUsPage from "./pages/AboutUs/index";
import AboutUs2Page from "./pages/AboutUs2/index";
import BlogPage from "./pages/Blog/index";
import ContactPage from "./pages/Contact/index";
import FaqPage from "./pages/Faq/index";
import HomepagePage from "./pages/Homepage/index";
import OutsourcingPage from "./pages/Outsourcing/index";
import PartnerCommission1Page from "./pages/PartnerCommission1/index";
import PartnerCommission2Page from "./pages/PartnerCommission2/index";
import PartnerRegistryPage from "./pages/PartnerRegistry/index";
import PartnersPage from "./pages/Partners/index";
import PartnersAgreementPage from "./pages/PartnersAgreement/index";
import PricingPage from "./pages/Pricing/index";
import PrivacyPolicyPage from "./pages/PrivacyPolicy/index";
import RefundPolicyPage from "./pages/RefundPolicy/index";
import ServicesPage from "./pages/Services/index";
import SignInPage from "./pages/SignIn/index";
import TermsConditionPage from "./pages/TermsCondition/index";
import TrainingPage from "./pages/Training/index";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/about-us" />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/about-us-2" element={<AboutUs2Page />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/homepage" element={<HomepagePage />} />
          <Route path="/outsourcing" element={<OutsourcingPage />} />
          <Route path="/partner-commission-1" element={<PartnerCommission1Page />} />
          <Route path="/partner-commission-2" element={<PartnerCommission2Page />} />
          <Route path="/partner-registry" element={<PartnerRegistryPage />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/partners-agreement" element={<PartnersAgreementPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/refund-policy" element={<RefundPolicyPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/terms-condition" element={<TermsConditionPage />} />
          <Route path="/training" element={<TrainingPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}
