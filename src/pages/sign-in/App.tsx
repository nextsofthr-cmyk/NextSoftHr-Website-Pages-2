import React, { useState, useEffect } from 'react';
import NextSofthrLogo from './components/NextSofthrLogo';
import BrandExperience from './components/BrandExperience';
import SignInCard from './components/SignInCard';
import LanguageSelector from './components/LanguageSelector';
import ConnectionStatus from './components/ConnectionStatus';
import LiveChatSupport from './components/LiveChatSupport';
import ThemeToggle from './components/ThemeToggle';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import CreateAccountModal from './components/CreateAccountModal';
import LegalModal, { LegalModalType } from './components/LegalModal';
import DashboardPreview from './components/DashboardPreview';
import Footer from './components/Footer';
import SessionTimeoutToast from './components/SessionTimeoutToast';
import { translations, LanguageKey } from './data/translations';
import { useDeviceIdentifier } from './hooks/useDeviceIdentifier';
import { ToastProvider } from './components/ToastNotification';

function SignInContent() {
  const [currentLang, setCurrentLang] = useState<LanguageKey>('en');
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Hook identifying browser and device (e.g. 'Chrome on macOS') for security transparency
  const deviceInfo = useDeviceIdentifier();

  // Theme State with system / persistence check
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('nextsofthr-theme');
      if (savedTheme) return savedTheme === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('nextsofthr-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('nextsofthr-theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  // Modal dialog states
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isCreateAccountOpen, setIsCreateAccountOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      return (
        url.searchParams.get('mode') === 'signup' ||
        url.pathname.includes('signup') ||
        url.pathname.includes('sign-up') ||
        url.pathname.includes('register')
      );
    }
    return false;
  });
  const [legalModalType, setLegalModalType] = useState<LegalModalType>(null);

  const t = translations[currentLang] || translations.en;
  const isRtl = currentLang === 'ar';

  // If user signed in successfully, render the live enterprise NextSofthr dashboard
  if (userEmail) {
    return (
      <DashboardPreview
        userEmail={userEmail}
        onSignOut={() => setUserEmail(null)}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />
    );
  }

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="min-h-screen w-full bg-slate-50 dark:bg-[#08101e] flex flex-col antialiased text-[#0b1528] dark:text-slate-100 selection:bg-[#caff33] selection:text-[#003366] relative transition-colors duration-200"
    >
      {/* Mobile Top Brand Header (Shown only on small screens < lg) */}
      <header className="lg:hidden w-full bg-gradient-to-r from-[#002244] via-[#003366] to-[#004494] text-white px-4 sm:px-5 py-3.5 border-b border-white/10 flex items-center justify-between shadow-md animate-fade-in-down">
        <NextSofthrLogo variant="light" size="sm" showTagline={false} />
        <div className="flex items-center gap-2">
          {/* Theme Toggle on mobile header */}
          <ThemeToggle isDark={isDark} onToggle={toggleTheme} variant="dark" />
          {/* Visual Connection Status Indicator for Mobile Navbar */}
          <ConnectionStatus variant="dark" />
          <LanguageSelector
            currentLang={currentLang}
            onLanguageChange={setCurrentLang}
            variant="dark"
          />
        </div>
      </header>

      {/* Main Split-Screen Container */}
      <div className="flex-1 flex flex-col lg:flex-row w-full min-h-[calc(100vh-60px)] lg:min-h-screen">
        {/* Left Side: Brand Experience (50% on desktop) - Step 1 in Desktop Entrance Sequence */}
        <section className="hidden lg:block lg:w-1/2 relative shrink-0 animate-fade-in-left">
          <BrandExperience t={t} />
        </section>

        {/* Right Side: Sign In Panel (50% on desktop) - Step 2 & 3 in Staggered Sequence */}
        <section className="lg:w-1/2 flex-1 flex flex-col justify-between bg-gradient-to-b from-[#f0f7ff]/70 via-white to-slate-50 dark:from-[#0a1222] dark:via-[#0c1628] dark:to-[#08101e] p-4 sm:p-8 lg:px-8 lg:pt-6 lg:pb-8 overflow-y-auto transition-colors duration-200">
          {/* Centered Sign In Card - Step 3 in Sequence */}
          <div className="pt-2 pb-4 sm:pb-6 flex flex-col items-center justify-start animate-fade-in-up animation-delay-200">
            <SignInCard
              t={t}
              onSuccessLogin={(email) => setUserEmail(email)}
              onForgotPassword={() => setIsForgotPasswordOpen(true)}
              onCreateAccount={() => setIsCreateAccountOpen(true)}
            />
          </div>

          {/* Footer Component with 'Recently Accessed From' security transparency - Step 4 */}
          <div className="w-full pt-6 animate-fade-in-up animation-delay-300">
            <Footer
              t={t}
              onOpenLegal={(type) => setLegalModalType(type)}
              deviceInfo={deviceInfo}
            />
          </div>
        </section>
      </div>

      {/* Floating Live Chat Icon at Bottom-Right */}
      <LiveChatSupport onOpenHelpCenter={() => setLegalModalType('help')} />

      {/* Session Inactivity Timeout Toast */}
      <SessionTimeoutToast
        warningDurationSeconds={120}
        idleTimeoutSeconds={45}
        autoDemo={true}
      />

      {/* Modals & Dialogs */}
      <ForgotPasswordModal
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
      />

      <CreateAccountModal
        isOpen={isCreateAccountOpen}
        onClose={() => setIsCreateAccountOpen(false)}
        onSuccess={(email) => {
          setUserEmail(email);
        }}
      />

      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <SignInContent />
    </ToastProvider>
  );
}
