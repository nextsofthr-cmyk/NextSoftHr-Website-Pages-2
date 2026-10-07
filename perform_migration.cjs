const fs = require('fs');
const path = require('path');
const fsp = require('fs/promises');

const rootDir = process.cwd();
const srcDir = path.join(rootDir, 'src');
const pagesDir = path.join(srcDir, 'pages');

const PAGES_CONFIG = [
  {
    slug: 'homepage',
    sourceDir: 'homepage',
    title: 'Homepage',
    subtitle: 'Global HR, Payroll & Business Ecosystem',
    category: 'Core',
    path: '/',
    aliases: ['/homepage', '/home'],
    icon: 'Home',
    badge: 'Flagship'
  },
  {
    slug: 'about-us',
    sourceDir: 'about us',
    title: 'About Us (Overview)',
    subtitle: 'Our Story, Mission, Values & Global Impact',
    category: 'Company',
    path: '/about-us',
    aliases: ['/about'],
    icon: 'Building2',
    badge: 'Popular'
  },
  {
    slug: 'about-us-2',
    sourceDir: 'about-us-2',
    title: 'About Us (Enterprise)',
    subtitle: 'Platform Architecture & Enterprise Culture',
    category: 'Company',
    path: '/about-us-2',
    aliases: ['/company'],
    icon: 'Users',
    badge: 'Alternate'
  },
  {
    slug: 'services',
    sourceDir: 'services',
    title: 'Services & Solutions',
    subtitle: 'HR, Payroll, Tax Compliance & Operations',
    category: 'Solutions',
    path: '/services',
    aliases: ['/solutions'],
    icon: 'Briefcase',
    badge: 'Core Suite'
  },
  {
    slug: 'pricing',
    sourceDir: 'pricing',
    title: 'Pricing & Plans',
    subtitle: 'Transparent, Tiered Global Pricing Calculator',
    category: 'Solutions',
    path: '/pricing',
    aliases: ['/plans'],
    icon: 'CreditCard',
    badge: 'Plans'
  },
  {
    slug: 'outsourcing',
    sourceDir: 'outsourcing',
    title: 'Managed Outsourcing',
    subtitle: 'Smarter HR & Payroll Outsourcing Ecosystem',
    category: 'Solutions',
    path: '/outsourcing',
    aliases: ['/bpo'],
    icon: 'Globe2',
    badge: 'Managed'
  },
  {
    slug: 'training',
    sourceDir: 'training',
    title: 'Training Academy',
    subtitle: 'Master HR, Payroll, Compliance & Certifications',
    category: 'Solutions',
    path: '/training',
    aliases: ['/academy'],
    icon: 'GraduationCap',
    badge: 'Academy'
  },
  {
    slug: 'partners',
    sourceDir: 'partners',
    title: 'Channel Partner Program',
    subtitle: 'Earn Recurring Revenue as an Enterprise Partner',
    category: 'Partners',
    path: '/partners',
    aliases: ['/partner-program'],
    icon: 'Handshake',
    badge: 'Revenue'
  },
  {
    slug: 'partner-registry',
    sourceDir: 'partner-registry',
    title: 'Partner Registry & Directory',
    subtitle: 'Verified Global Partner & Consultant Directory',
    category: 'Partners',
    path: '/partner-registry',
    aliases: ['/directory'],
    icon: 'BookOpenCheck',
    badge: 'Verified'
  },
  {
    slug: 'partner-commission-1',
    sourceDir: 'partner-commission-1',
    title: 'Commission Schedule 1',
    subtitle: 'Partner Revenue Share & Commission Tier Matrix',
    category: 'Partners',
    path: '/partner-commission-1',
    aliases: ['/commission-schedule'],
    icon: 'Percent',
    badge: 'Financial'
  },
  {
    slug: 'partner-commission-2',
    sourceDir: 'partner-commission-2',
    title: 'Commission Share Hub 2',
    subtitle: 'Commission Calculations & Tiered Incentive Hub',
    category: 'Partners',
    path: '/partner-commission-2',
    aliases: ['/commission-hub'],
    icon: 'TrendingUp',
    badge: 'Financial'
  },
  {
    slug: 'partners-agreement',
    sourceDir: 'partners-agreement',
    title: 'Partner Legal Agreement',
    subtitle: 'Distributor, Reseller & Associate Legal Terms',
    category: 'Partners',
    path: '/partners-agreement',
    aliases: ['/partner-terms'],
    icon: 'FileCheck',
    badge: 'Legal'
  },
  {
    slug: 'blog',
    sourceDir: 'blog',
    title: 'Blog & HR Insights',
    subtitle: 'Articles, Thought Leadership & People Ops Trends',
    category: 'Resources',
    path: '/blog',
    aliases: ['/news', '/articles'],
    icon: 'Newspaper',
    badge: 'Updates'
  },
  {
    slug: 'contact',
    sourceDir: 'contact',
    title: 'Contact & Sales',
    subtitle: 'Book Live Demos, Get Support & Reach Our Teams',
    category: 'Support',
    path: '/contact',
    aliases: ['/support', '/help'],
    icon: 'Mail',
    badge: '24/7'
  },
  {
    slug: 'faq',
    sourceDir: 'faq',
    title: 'FAQ & Help Center',
    subtitle: 'Comprehensive Questions, Answers & Knowledge Base',
    category: 'Support',
    path: '/faq',
    aliases: ['/help-center'],
    icon: 'HelpCircle',
    badge: 'Q&A'
  },
  {
    slug: 'sign-in',
    sourceDir: 'sign-in',
    title: 'Enterprise Sign In',
    subtitle: 'Secure Multi-Tenant Authentication & Portal Access',
    category: 'Portal',
    path: '/sign-in',
    aliases: ['/login', '/auth'],
    icon: 'LogIn',
    badge: 'Secure'
  },
  {
    slug: 'privacy-policy',
    sourceDir: 'privacy-policy',
    title: 'Privacy Policy',
    subtitle: 'Global Data Protection, NDPR & GDPR Compliance',
    category: 'Legal',
    path: '/privacy-policy',
    aliases: ['/privacy'],
    icon: 'Shield',
    badge: 'Compliance'
  },
  {
    slug: 'refund-policy',
    sourceDir: 'refund-policy',
    title: 'Refund & Cancellation',
    subtitle: 'Subscription Terms, Billing & Refund Conditions',
    category: 'Legal',
    path: '/refund-policy',
    aliases: ['/refunds'],
    icon: 'Receipt',
    badge: 'Billing'
  },
  {
    slug: 'terms-conditions',
    sourceDir: 'terms & condition',
    title: 'Terms & Conditions',
    subtitle: 'Master SaaS Service Agreement & Usage Terms',
    category: 'Legal',
    path: '/terms-conditions',
    aliases: ['/terms'],
    icon: 'Scale',
    badge: 'Legal'
  }
];

async function copyDir(src, dest) {
  await fsp.mkdir(dest, { recursive: true });
  const entries = await fsp.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fsp.copyFile(srcPath, destPath);
    }
  }
}

async function migrate() {
  console.log('Starting Clean Migration of all 19 pages...');

  // 1. Clean old pages directory if exists
  if (fs.existsSync(pagesDir)) {
    console.log('Removing old src/pages directory...');
    await fsp.rm(pagesDir, { recursive: true, force: true });
  }
  await fsp.mkdir(pagesDir, { recursive: true });

  // Clean old misplaced directories in src/ if any
  const oldComp = path.join(srcDir, 'components');
  if (fs.existsSync(oldComp)) {
    await fsp.rm(oldComp, { recursive: true, force: true });
  }
  const oldData = path.join(srcDir, 'data');
  if (fs.existsSync(oldData)) {
    await fsp.rm(oldData, { recursive: true, force: true });
  }
  const oldCtx = path.join(srcDir, 'context');
  if (fs.existsSync(oldCtx)) {
    await fsp.rm(oldCtx, { recursive: true, force: true });
  }

  // 2. Extract each page's src folder into src/pages/<slug>/
  for (const item of PAGES_CONFIG) {
    const sourceSrc = path.join(rootDir, item.sourceDir, 'src');
    const targetDir = path.join(pagesDir, item.slug);

    if (!fs.existsSync(sourceSrc)) {
      console.error(`ERROR: Source directory not found: ${sourceSrc}`);
      continue;
    }

    console.log(`Extracting [${item.sourceDir}] -> src/pages/${item.slug}...`);
    await copyDir(sourceSrc, targetDir);

    // Create re-export index.ts for convenient imports
    const indexTsPath = path.join(targetDir, 'index.ts');
    await fsp.writeFile(indexTsPath, `export { default } from './App';\n`, 'utf8');

    // Check if there is public assets in sourceDir that should be in public/
    const publicAssets = path.join(rootDir, item.sourceDir, 'public', 'assets');
    if (fs.existsSync(publicAssets)) {
      const targetPublicAssets = path.join(rootDir, 'public', 'assets');
      await copyDir(publicAssets, targetPublicAssets);
    }
  }

  // Copy contact assets to public if needed
  const contactImagesSrc = path.join(rootDir, 'contact', 'src', 'assets', 'images');
  if (fs.existsSync(contactImagesSrc)) {
    const publicImagesDest = path.join(rootDir, 'public', 'assets', 'images');
    await copyDir(contactImagesSrc, publicImagesDest);
  }

  console.log('All 19 pages successfully extracted and sandboxed!');
}

migrate().catch(console.error);
