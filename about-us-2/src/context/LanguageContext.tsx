import React, { createContext, useContext, useEffect, useState } from 'react';

export interface LanguageOption {
  code: string;
  name: string;
  localName: string;
  flag: string;
  region: string;
  currencyExample: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  {
    code: 'en',
    name: 'English',
    localName: 'English',
    flag: '🇬🇧',
    region: 'Pan-African & Global (NG, GH, KE, ZA)',
    currencyExample: 'NGN, KES, GHS, USD'
  },
  {
    code: 'fr',
    name: 'French',
    localName: 'Français',
    flag: '🇫🇷',
    region: 'Afrique Francophone (CI, SN, CM, CD, RW)',
    currencyExample: 'XOF, XAF, CDF, USD'
  },
  {
    code: 'sw',
    name: 'Swahili',
    localName: 'Kiswahili',
    flag: '🇰🇪',
    region: 'Afrika Mashariki (KE, TZ, UG, RW)',
    currencyExample: 'KES, TZS, UGX, RWF'
  },
  {
    code: 'pt',
    name: 'Portuguese',
    localName: 'Português',
    flag: '🇦🇴',
    region: 'África Lusófona (AO, MZ, CV)',
    currencyExample: 'AOA, MZN, USD'
  },
  {
    code: 'ar',
    name: 'Arabic',
    localName: 'العربية',
    flag: '🇪🇬',
    region: 'North Africa & Sahel (EG, MA, TN, SD)',
    currencyExample: 'EGP, MAD, TND, USD'
  },
  {
    code: 'ha',
    name: 'Hausa',
    localName: 'Harshen Hausa',
    flag: '🇳🇬',
    region: 'West Africa & Sahel (NG, NE, GH)',
    currencyExample: 'NGN, XOF'
  }
];

export interface HeaderTranslations {
  announcementBadge: string;
  announcementSub: string;
  supportLink: string;
  signIn: string;
  getStarted: string;
  navLinks: { [key: string]: string };
}

const TRANSLATIONS: Record<string, HeaderTranslations> = {
  en: {
    announcementBadge: 'Pan-African & Global Ready',
    announcementSub: 'HR, Multi-Currency Payroll & Business Operations',
    supportLink: 'Support & Inquiries',
    signIn: 'Sign In',
    getStarted: 'Get Started',
    navLinks: {
      Home: 'Home',
      Features: 'Features',
      Solutions: 'Solutions',
      Pricing: 'Pricing',
      'About Us': 'About Us',
      Resources: 'Resources',
      Partners: 'Partners',
      Contact: 'Contact'
    }
  },
  fr: {
    announcementBadge: 'Prêt pour l’Afrique et l’International',
    announcementSub: 'RH, Paie multi-devises et Gestion d’entreprise',
    supportLink: 'Support & Demandes',
    signIn: 'Connexion',
    getStarted: 'Commencer',
    navLinks: {
      Home: 'Accueil',
      Features: 'Fonctionnalités',
      Solutions: 'Solutions',
      Pricing: 'Tarification',
      'About Us': 'À Propos',
      Resources: 'Ressources',
      Partners: 'Partenaires',
      Contact: 'Contact'
    }
  },
  sw: {
    announcementBadge: 'Tayari kwa Afrika na Ulimwengu',
    announcementSub: 'Rasilimali Watu, Mishahara na Usimamizi wa Biashara',
    supportLink: 'Usaidizi na Maswali',
    signIn: 'Ingia',
    getStarted: 'Anza Sasa',
    navLinks: {
      Home: 'Nyumbani',
      Features: 'Vipengele',
      Solutions: 'Suluhu',
      Pricing: 'Bei',
      'About Us': 'Kuhusu Sisi',
      Resources: 'Rasilimali',
      Partners: 'Washirika',
      Contact: 'Wasiliana'
    }
  },
  pt: {
    announcementBadge: 'Pronto para África e o Mundo',
    announcementSub: 'RH, Folha de Pagamento Multi-Moeda e Operações',
    supportLink: 'Suporte e Dúvidas',
    signIn: 'Entrar',
    getStarted: 'Começar Agora',
    navLinks: {
      Home: 'Início',
      Features: 'Funcionalidades',
      Solutions: 'Soluções',
      Pricing: 'Preços',
      'About Us': 'Sobre Nós',
      Resources: 'Recursos',
      Partners: 'Parceiros',
      Contact: 'Contacto'
    }
  },
  ar: {
    announcementBadge: 'جاهز لأفريقيا والعالم',
    announcementSub: 'الموارد البشرية وكشوف الرواتب والعمليات التجارية',
    supportLink: 'الدعم والاستفسارات',
    signIn: 'تسجيل الدخول',
    getStarted: 'ابدأ الآن',
    navLinks: {
      Home: 'الرئيسية',
      Features: 'الميزات',
      Solutions: 'الحلول',
      Pricing: 'الأسعار',
      'About Us': 'من نحن',
      Resources: 'الموارد',
      Partners: 'الشركاء',
      Contact: 'اتصل بنا'
    }
  },
  ha: {
    announcementBadge: 'Shirye don Afirka da Duniya',
    announcementSub: 'Kula da Ma’aikata, Biyan Albashi & Gudanar da Kasuwanci',
    supportLink: 'Tallafi & Tambayoyi',
    signIn: 'Shiga',
    getStarted: 'Fara Yanzu',
    navLinks: {
      Home: 'Farko',
      Features: 'Siffofi',
      Solutions: 'Hanyoyi',
      Pricing: 'Farashi',
      'About Us': 'Game da Mu',
      Resources: 'Albarkatu',
      Partners: 'Abokan Hulɗa',
      Contact: 'Tuntube Mu'
    }
  }
};

interface LanguageContextType {
  currentLanguage: LanguageOption;
  setLanguage: (code: string) => void;
  translations: HeaderTranslations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [langCode, setLangCode] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nextsofthr-language');
      if (saved && SUPPORTED_LANGUAGES.some((l) => l.code === saved)) {
        return saved;
      }
      // Check browser language
      const browserLang = navigator.language?.slice(0, 2).toLowerCase();
      if (browserLang && SUPPORTED_LANGUAGES.some((l) => l.code === browserLang)) {
        return browserLang;
      }
    }
    return 'en';
  });

  const currentLanguage =
    SUPPORTED_LANGUAGES.find((l) => l.code === langCode) || SUPPORTED_LANGUAGES[0];

  const translations = TRANSLATIONS[currentLanguage.code] || TRANSLATIONS.en;

  const setLanguage = (code: string) => {
    if (SUPPORTED_LANGUAGES.some((l) => l.code === code)) {
      setLangCode(code);
      localStorage.setItem('nextsofthr-language', code);
      // If Arabic, optionally set dir attribute or html lang
      if (code === 'ar') {
        document.documentElement.setAttribute('lang', 'ar');
      } else {
        document.documentElement.setAttribute('lang', code);
      }
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute('lang', currentLanguage.code);
  }, [currentLanguage]);

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
