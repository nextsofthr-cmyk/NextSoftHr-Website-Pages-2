import React, { useState, useEffect } from 'react';
import NextSofthrLogo from '../../components/sign-in/NextSofthrLogo';
import BrandExperience from '../../components/sign-in/BrandExperience';
import SignInCard from '../../components/sign-in/SignInCard';
import LanguageSelector from '../../components/sign-in/LanguageSelector';
import ConnectionStatus from '../../components/sign-in/ConnectionStatus';
import LiveChatSupport from '../../components/sign-in/LiveChatSupport';
import ThemeToggle from '../../components/sign-in/ThemeToggle';
import ForgotPasswordModal from '../../components/sign-in/ForgotPasswordModal';
import CreateAccountModal from '../../components/sign-in/CreateAccountModal';
import LegalModal, { LegalModalType } from '../../components/sign-in/LegalModal';
import DashboardPreview from '../../components/sign-in/DashboardPreview';
import Footer from '../../components/sign-in/Footer';
import SessionTimeoutToast from '../../components/sign-in/SessionTimeoutToast';
import { translations, LanguageKey } from '../../data/sign-in/translations';
import { HelpCircle, Sparkles } from 'lucide-react';
import { useDeviceIdentifier } from './hooks/useDeviceIdentifier';

export default function SignInPage() {
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
  const [isCreateAccountOpen, setIsCreateAccountOpen] = useState(false);
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
        {/* Left Side: Brand Experience (~46% on desktop) - Step 1 in Desktop Entrance Sequence */}
        <section className="hidden lg:block lg:w-[46%] xl:w-[45%] relative shrink-0 animate-fade-in-left">
          <BrandExperience t={t} />
        </section>

        {/* Right Side: Sign In Panel (~54% on desktop) - Step 2 & 3 in Staggered Sequence */}
        <section className="flex-1 flex flex-col justify-between bg-gradient-to-b from-[#f0f7ff]/70 via-white to-slate-50 dark:from-[#0a1222] dark:via-[#0c1628] dark:to-[#08101e] p-4 sm:p-8 lg:p-12 overflow-y-auto transition-colors duration-200">
          {/* Top Utilities Bar (Theme Toggle, Connection Status, Language Selector & Support Link) - Step 2 */}
          <div className="w-full max-w-[540px] mx-auto flex items-center justify-between pb-4 animate-fade-in-down animation-delay-100">
            <div className="lg:hidden flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#84b800] dark:bg-[#caff33]"></span>
              <span>People. Payroll. Simplified.</span>
            </div>

            <div className="hidden lg:flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <a
                href="https://www.nextsofthr.org"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#0056b3] dark:hover:text-[#caff33] transition-colors"
              >
                www.nextsofthr.org
              </a>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <span className="text-[#0056b3] dark:text-[#38bdf8] font-medium">Enterprise Portal</span>
            </div>

            <div className="flex items-center gap-2.5">
              {/* Theme Toggle */}
              <ThemeToggle isDark={isDark} onToggle={toggleTheme} />

              {/* Visual Connection Status Indicator for Desktop Navbar */}
              <ConnectionStatus variant="auto" />

              <button
                type="button"
                onClick={() => setLegalModalType('help')}
                className="hidden sm:inline-flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-[#0056b3] dark:hover:text-[#caff33] transition-colors cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Help</span>
              </button>

              <LanguageSelector
                currentLang={currentLang}
                onLanguageChange={setCurrentLang}
                variant="light"
              />
            </div>
          </div>

          {/* Centered Sign In Card - Step 3 in Sequence */}
          <div className="my-auto py-4 sm:py-6 flex flex-col items-center justify-center animate-fade-in-up animation-delay-200">
            {/* Badge on tablet/mobile within main column */}
            <div className="lg:hidden mb-6 text-center">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#f7fee7] dark:bg-[#caff33]/15 text-[#003366] dark:text-[#caff33] text-xs font-bold border border-[#caff33] mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#0056b3] dark:text-[#caff33]" />
                Built for Africa • Ready for the World
              </span>
            </div>

            <SignInCard
              t={t}
              onSuccessLogin={(email) => setUserEmail(email)}
              onForgotPassword={() => setIsForgotPasswordOpen(true)}
              onCreateAccount={() => setIsCreateAccountOpen(true)}
            />
          </div>

          {/* Footer Component with 'Recently Accessed From' security transparency - Step 4 */}
          <div className="w-full max-w-[540px] mx-auto pt-6 animate-fade-in-up animation-delay-300">
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
