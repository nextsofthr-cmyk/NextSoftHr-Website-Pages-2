import React, { useState, useEffect } from 'react';
import { Gift, Sparkles, Clock, X, ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';

interface LimitedTrialBonusBannerProps {
  onClaimBonus: () => void;
}

export const LimitedTrialBonusBanner: React.FC<LimitedTrialBonusBannerProps> = ({ onClaimBonus }) => {
  const { language, tx } = useLanguage();
  const { formatAmount } = useCurrency();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ minutes: 14, seconds: 59 });

  // Countdown timer to enhance urgency
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        } else {
          return { minutes: 14, seconds: 59 }; // loop back
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Detect when user reaches the bottom of the page
  useEffect(() => {
    const handleScroll = () => {
      if (isDismissed) return;

      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;

      // Trigger when the user has scrolled to the bottom area (within 650px of bottom or >82% of total height)
      const distanceFromBottom = documentHeight - (scrollY + windowHeight);
      const isNearBottom = distanceFromBottom <= 650 || (scrollY + windowHeight) / documentHeight >= 0.82;

      setIsVisible(isNearBottom);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial position
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  if (!isVisible || isDismissed) return null;

  // Localized copy
  const content = {
    en: {
      badge: 'Limited-Time Trial Bonus',
      title: 'Unlock 30 Extra Days AI Copilot + Free Migration',
      valueBadge: `Worth ${formatAmount(450)} Free`,
      description: 'Activate your 14-day free trial today to automatically receive 30 days of complimentary AI Copilot intelligence plus white-glove employee data onboarding.',
      cta: 'Claim Bonus & Start Trial',
      expiresIn: 'Special bonus reserved for:',
      noCard: 'Zero card required • Instant activation',
    },
    fr: {
      badge: 'Bonus d’Essai à Durée Limitée',
      title: '30 jours d’IA Copilot offerts + Migration gratuite',
      valueBadge: `Valeur ${formatAmount(450)} Gratuite`,
      description: 'Activez votre essai gratuit de 14 jours aujourd’hui pour bénéficier automatiquement de 30 jours d’IA Copilot et de la migration complète de vos dossiers salariés.',
      cta: 'Réclamer le Bonus & Commencer',
      expiresIn: 'Offre réservée pendant :',
      noCard: 'Sans carte bancaire • Mise en service immédiate',
    },
    pt: {
      badge: 'Bónus de Teste por Tempo Limitado',
      title: '30 Dias de IA Copilot Grátis + Migração de Dados',
      valueBadge: `Valor de ${formatAmount(450)} Grátis`,
      description: 'Ative o seu teste gratuito de 14 dias hoje e receba automaticamente 30 dias de IA Copilot e suporte de migração de colaboradores sem custos.',
      cta: 'Reivindicar Bónus & Iniciar',
      expiresIn: 'Oferta especial reservada por:',
      noCard: 'Sem cartão de crédito • Acesso imediato',
    },
    es: {
      badge: 'Bono de Prueba por Tiempo Limitado',
      title: '30 Días de Copiloto IA Gratis + Migración Incluida',
      valueBadge: `Valor de ${formatAmount(450)} Gratis`,
      description: 'Active su prueba de 14 días hoy y reciba automáticamente 30 días de asistencia con Copiloto IA y migración asistida de datos de su nómina.',
      cta: 'Reclamar Bono e Iniciar Prueba',
      expiresIn: 'Oferta especial reservada durante:',
      noCard: 'Sin tarjeta requerida • Activación inmediata',
    },
  }[language] || {
    badge: 'Limited-Time Trial Bonus',
    title: 'Unlock 30 Extra Days AI Copilot + Free Migration',
    valueBadge: `Worth ${formatAmount(450)} Free`,
    description: 'Activate your 14-day free trial today to automatically receive 30 days of complimentary AI Copilot intelligence plus white-glove employee data onboarding.',
    cta: 'Claim Bonus & Start Trial',
    expiresIn: 'Special bonus reserved for:',
    noCard: 'Zero card required • Instant activation',
  };

  const formattedSeconds = timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds;

  return (
    <aside
      id="limited-trial-bonus-banner"
      role="region"
      aria-label={tx("Limited-time trial bonus offer")}
      className="fixed bottom-18 sm:bottom-6 left-3 right-3 sm:left-6 sm:right-auto sm:max-w-xl z-40 bg-slate-950/95 dark:bg-[#070D1E]/95 text-white backdrop-blur-md border border-lime-400/50 dark:border-lime-500/40 rounded-2xl shadow-2xl p-4 sm:p-4.5 animate-in slide-in-from-bottom-5 fade-in duration-300 transition-all"
    >
      {/* Background glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#A3E635]/15 rounded-full blur-2xl pointer-events-none" />

      {/* Top Header Bar */}
      <div className="flex items-center justify-between gap-3 mb-2 relative z-10">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#A3E635] text-slate-950 text-[11px] font-extrabold tracking-wide uppercase shadow-xs">
            <Gift className="w-3.5 h-3.5 fill-current" />
            <span>{tx(content.badge)}</span>
          </div>

          <span className="text-[10px] font-bold text-lime-400 bg-lime-950/80 px-2 py-0.5 rounded-full border border-lime-500/30">
            {content.valueBadge}
          </span>
        </div>

        <button
          onClick={handleDismiss}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          title={tx("Dismiss bonus banner")}
          aria-label={tx("Dismiss limited-time trial bonus banner")}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 space-y-1.5">
        <h4 className="font-display text-sm sm:text-base font-bold text-white tracking-tight leading-snug">
          {tx(content.title)}
        </h4>
        <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 sm:line-clamp-none">
          {tx(content.description)}
        </p>
      </div>

      {/* Bottom Action Row: Urgency Countdown & Primary Button */}
      <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2.5 relative z-10">
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Clock className="w-3.5 h-3.5 text-[#A3E635] animate-pulse" />
          <span className="text-[11px]">{content.expiresIn}</span>
          <span className="font-mono font-bold text-white bg-white/10 px-1.5 py-0.5 rounded text-[11px] border border-white/10">
            {timeLeft.minutes}:{formattedSeconds}
          </span>
        </div>

        <button
          id="claim-trial-bonus-btn"
          onClick={() => {
            onClaimBonus();
            setIsDismissed(true);
          }}
          className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-[#A3E635] hover:bg-[#84CC16] shadow-sm hover:shadow-md transition-all flex items-center gap-1.5 active:scale-[0.98]"
        >
          <span>{content.cta}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Assurance Note */}
      <div className="mt-1.5 text-[10px] text-slate-400 flex items-center gap-1.5">
        <ShieldCheck className="w-3 h-3 text-[#A3E635]" />
        <span>{content.noCard}</span>
      </div>
    </aside>
  );
};
