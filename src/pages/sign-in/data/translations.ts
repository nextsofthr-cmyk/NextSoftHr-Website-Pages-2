export type LanguageKey = 'en' | 'fr' | 'pt' | 'ar' | 'es';

export interface Translations {
  welcomeBack: string;
  signInToAccount: string;
  enterCredentials: string;
  workEmail: string;
  emailPlaceholder: string;
  password: string;
  passwordPlaceholder: string;
  rememberMe: string;
  forgotPassword: string;
  signIn: string;
  signingIn: string;
  orContinueWith: string;
  google: string;
  microsoft: string;
  linkedin: string;
  dontHaveAccount: string;
  createAccount: string;
  startFreeTrial: string;
  infoProtected: string;
  securityDesc: string;
  aiTitle: string;
  aiDesc: string;
  brandHeadline: string;
  brandSupporting: string;
  features: string[];
  allRightsReserved: string;
  privacy: string;
  terms: string;
  security: string;
  helpCenter: string;
  contactSupport: string;
}

export const translations: Record<LanguageKey, Translations> = {
  en: {
    welcomeBack: 'Welcome Back',
    signInToAccount: 'Sign in to your NextSofthr account',
    enterCredentials: 'Enter your work email and password to access your workspace.',
    workEmail: 'Work Email',
    emailPlaceholder: 'you@company.com',
    password: 'Password',
    passwordPlaceholder: 'Enter your password',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password?',
    signIn: 'Sign In',
    signingIn: 'Signing you in...',
    orContinueWith: 'Or continue with',
    google: 'Continue with Google',
    microsoft: 'Continue with Microsoft',
    linkedin: 'Continue with LinkedIn',
    dontHaveAccount: "Don't have a NextSofthr account?",
    createAccount: 'Create an account',
    startFreeTrial: 'Start your free trial',
    infoProtected: 'Your information is protected',
    securityDesc: 'NextSofthr uses modern security practices to help protect your business and employee information.',
    aiTitle: 'Your intelligent workplace starts here.',
    aiDesc: 'Access AI-powered HR and payroll assistance, employee insights and smarter business workflows.',
    brandHeadline: 'Welcome Back to Smarter Business Management.',
    brandSupporting: 'Manage your people, payroll and business operations from one powerful platform.',
    features: [
      'HR Management',
      'Payroll & Compliance',
      'Time & Attendance',
      'Leave Management',
      'Employee Management',
      'Business Management',
      'AI-Powered Assistance',
    ],
    allRightsReserved: 'All rights reserved.',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    security: 'Security',
    helpCenter: 'Help Center',
    contactSupport: 'Contact Support',
  },
  fr: {
    welcomeBack: 'Bon retour',
    signInToAccount: 'Connectez-vous à votre compte NextSofthr',
    enterCredentials: 'Saisissez votre e-mail professionnel et votre mot de passe pour accéder à votre espace de travail.',
    workEmail: 'E-mail professionnel',
    emailPlaceholder: 'vous@entreprise.com',
    password: 'Mot de passe',
    passwordPlaceholder: 'Entrez votre mot de passe',
    rememberMe: 'Se souvenir de moi',
    forgotPassword: 'Mot de passe oublié ?',
    signIn: 'Se connecter',
    signingIn: 'Connexion en cours...',
    orContinueWith: 'Ou continuer avec',
    google: 'Continuer avec Google',
    microsoft: 'Continuer avec Microsoft',
    linkedin: 'Continuer avec LinkedIn',
    dontHaveAccount: "Vous n'avez pas de compte NextSofthr ?",
    createAccount: 'Créer un compte',
    startFreeTrial: 'Commencer votre essai gratuit',
    infoProtected: 'Vos informations sont protégées',
    securityDesc: 'NextSofthr applique des protocoles de sécurité avancés pour protéger votre entreprise et vos collaborateurs.',
    aiTitle: 'Votre espace de travail intelligent commence ici.',
    aiDesc: 'Accédez à une assistance RH & paie propulsée par l’IA, des analyses d’équipe et des flux automatisés.',
    brandHeadline: 'Le pilotage d’entreprise intelligent en Afrique et dans le monde.',
    brandSupporting: 'Gérez vos collaborateurs, la paie et vos opérations sur une plateforme tout-en-un.',
    features: [
      'Gestion RH complète',
      'Paie & Conformité légale',
      'Temps & Présence',
      'Gestion des congés',
      'Dossiers employés',
      'Pilotage d’entreprise',
      'Assistance IA intégrée',
    ],
    allRightsReserved: 'Tous droits réservés.',
    privacy: 'Politique de confidentialité',
    terms: 'Conditions d’utilisation',
    security: 'Sécurité',
    helpCenter: 'Centre d’aide',
    contactSupport: 'Assistance client',
  },
  pt: {
    welcomeBack: 'Bem-vindo de volta',
    signInToAccount: 'Acesse sua conta NextSofthr',
    enterCredentials: 'Insira seu e-mail corporativo e senha para acessar seu espaço de trabalho.',
    workEmail: 'E-mail Corporativo',
    emailPlaceholder: 'voce@empresa.com',
    password: 'Senha',
    passwordPlaceholder: 'Digite sua senha',
    rememberMe: 'Lembrar de mim',
    forgotPassword: 'Esqueceu a senha?',
    signIn: 'Entrar',
    signingIn: 'Entrando...',
    orContinueWith: 'Ou continue com',
    google: 'Continuar com Google',
    microsoft: 'Continuar com Microsoft',
    linkedin: 'Continuar com LinkedIn',
    dontHaveAccount: 'Não tem uma conta NextSofthr?',
    createAccount: 'Criar uma conta',
    startFreeTrial: 'Iniciar teste grátis',
    infoProtected: 'Suas informações estão protegidas',
    securityDesc: 'A NextSofthr utiliza práticas modernas de segurança para proteger os dados da sua empresa e funcionários.',
    aiTitle: 'Seu ambiente de trabalho inteligente começa aqui.',
    aiDesc: 'Acesse assistência com IA para RH e folha, insights de equipe e fluxos inteligentes.',
    brandHeadline: 'Gestão Empresarial Inteligente e Simplificada.',
    brandSupporting: 'Gerencie pessoas, folha de pagamento e operações em uma única plataforma.',
    features: [
      'Gestão de RH',
      'Folha & Conformidade',
      'Ponto e Frequência',
      'Gestão de Férias e Licenças',
      'Gestão de Colaboradores',
      'Gestão Empresarial',
      'Assistência com Inteligência Artificial',
    ],
    allRightsReserved: 'Todos os direitos reservados.',
    privacy: 'Política de Privacidade',
    terms: 'Termos de Serviço',
    security: 'Segurança',
    helpCenter: 'Central de Ajuda',
    contactSupport: 'Suporte',
  },
  ar: {
    welcomeBack: 'مرحباً بك مجدداً',
    signInToAccount: 'تسجيل الدخول إلى حسابك في NextSofthr',
    enterCredentials: 'أدخل بريدك الإلكتروني المهني وكلمة المرور للوصول إلى مساحة عملك.',
    workEmail: 'البريد الإلكتروني للعمل',
    emailPlaceholder: 'you@company.com',
    password: 'كلمة المرور',
    passwordPlaceholder: 'أدخل كلمة المرور',
    rememberMe: 'تذكرني',
    forgotPassword: 'نسيت كلمة المرور؟',
    signIn: 'تسجيل الدخول',
    signingIn: 'جارٍ تسجيل الدخول...',
    orContinueWith: 'أو المتابعة باستخدام',
    google: 'المتابعة مع Google',
    microsoft: 'المتابعة مع Microsoft',
    linkedin: 'المتابعة مع LinkedIn',
    dontHaveAccount: 'ليس لديك حساب NextSofthr؟',
    createAccount: 'إنشاء حساب جديد',
    startFreeTrial: 'ابدأ تجربتك المجانية',
    infoProtected: 'معلوماتك محمية بأعلى معايير الأمان',
    securityDesc: 'تعتمد NextSofthr أحدث الممارسات الأمنية لحماية بيانات أعمالك وموظفيك.',
    aiTitle: 'مكان عملك الذكي يبدأ من هنا.',
    aiDesc: 'استفد من مساعد الذكاء الاصطناعي للموارد البشرية والرواتب ورؤى فرق العمل المتقدمة.',
    brandHeadline: 'مرحباً بك مجدداً في إدارة الأعمال الأكثر ذكاءً.',
    brandSupporting: 'إدارة شؤون الموظفين والرواتب وعمليات الأعمال من منصة موحدة فائقة القوة.',
    features: [
      'إدارة الموارد البشرية',
      'الرواتب والامتثال القانوني',
      'الحضور والانصراف',
      'إدارة الإجازات',
      'ملفات الموظفين',
      'إدارة الأعمال الشاملة',
      'مساعد الذكاء الاصطناعي',
    ],
    allRightsReserved: 'جميع الحقوق محفوظة.',
    privacy: 'سياسة الخصوصية',
    terms: 'شروط الخدمة',
    security: 'الأمان',
    helpCenter: 'مركز المساعدة',
    contactSupport: 'الدعم الفني',
  },
  es: {
    welcomeBack: 'Bienvenido de nuevo',
    signInToAccount: 'Inicia sesión en tu cuenta NextSofthr',
    enterCredentials: 'Ingresa tu correo corporativo y contraseña para acceder a tu espacio de trabajo.',
    workEmail: 'Correo Corporativo',
    emailPlaceholder: 'tu@empresa.com',
    password: 'Contraseña',
    passwordPlaceholder: 'Ingresa tu contraseña',
    rememberMe: 'Recordarme',
    forgotPassword: '¿Olvidaste tu contraseña?',
    signIn: 'Iniciar Sesión',
    signingIn: 'Iniciando sesión...',
    orContinueWith: 'O continuar con',
    google: 'Continuar con Google',
    microsoft: 'Continuar con Microsoft',
    linkedin: 'Continuar con LinkedIn',
    dontHaveAccount: '¿No tienes una cuenta en NextSofthr?',
    createAccount: 'Crear una cuenta',
    startFreeTrial: 'Comienza tu prueba gratuita',
    infoProtected: 'Tu información está protegida',
    securityDesc: 'NextSofthr utiliza prácticas modernas de seguridad para proteger los datos de tu empresa y empleados.',
    aiTitle: 'Tu espacio laboral inteligente comienza aquí.',
    aiDesc: 'Accede a asistencia de RRHH y nómina impulsada por IA, métricas de equipo y flujos de trabajo.',
    brandHeadline: 'Bienvenido a la gestión empresarial inteligente.',
    brandSupporting: 'Gestiona personas, nómina y operaciones comerciales desde una sola plataforma.',
    features: [
      'Gestión de Recursos Humanos',
      'Nómina y Cumplimiento Legal',
      'Control de Asistencia',
      'Gestión de Permisos y Vacaciones',
      'Expedientes de Empleados',
      'Gestión Empresarial',
      'Asistencia con Inteligencia Artificial',
    ],
    allRightsReserved: 'Todos los derechos reservados.',
    privacy: 'Política de Privacidad',
    terms: 'Términos de Servicio',
    security: 'Seguridad',
    helpCenter: 'Centro de Ayuda',
    contactSupport: 'Contacto y Soporte',
  },
};
