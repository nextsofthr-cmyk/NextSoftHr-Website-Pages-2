export type BadgeStyleVariant = 'crest' | 'shield' | 'hex' | 'compact';
export type BadgeTier = 'platinum' | 'gold' | 'silver' | 'bronze';

export interface PartnerBadgeOptions {
  partnerName: string;
  tier: BadgeTier;
  partnerId: string;
  year?: number | string;
  specialization?: string;
  region?: string;
  styleVariant?: BadgeStyleVariant;
  issueDate?: string;
  validThrough?: string;
  securityHash?: string;
  verifiedStatus?: string;
}

// Utility to escape XML characters
export function escapeXml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Deterministic short hash for partner ID
export function generateSecurityHash(partnerId: string, partnerName: string, tier: string): string {
  const combined = `${partnerId}-${partnerName}-${tier}-nextsofthr-official-auth`;
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).toUpperCase().padStart(8, '0');
  return `AUTH-NX-${hex}`;
}

// Color schemes and asset properties based on tier
interface TierTheme {
  primaryGradient: [string, string, string];
  accentColor: string;
  accentGlow: string;
  textColor: string;
  surfaceDark: string;
  surfaceMid: string;
  borderMetallic: string;
  label: string;
  subLabel: string;
  badgeEmoji: string;
  commission: string;
}

export const TIER_THEMES: Record<BadgeTier, TierTheme> = {
  platinum: {
    primaryGradient: ['#E0F2FE', '#38BDF8', '#0284C7'],
    accentColor: '#B8F010', // NextSofthr Signature Cyber Lime
    accentGlow: 'rgba(184, 240, 16, 0.45)',
    textColor: '#F8FAFC',
    surfaceDark: '#030B18',
    surfaceMid: '#071D3E',
    borderMetallic: '#7DD3FC',
    label: 'PLATINUM PARTNER',
    subLabel: 'STRATEGIC ENTERPRISE CHANNEL',
    badgeEmoji: '💎',
    commission: '40% Top Tier'
  },
  gold: {
    primaryGradient: ['#FEF08A', '#F59E0B', '#B45309'],
    accentColor: '#FDE047',
    accentGlow: 'rgba(253, 224, 71, 0.4)',
    textColor: '#FFFBEB',
    surfaceDark: '#120B02',
    surfaceMid: '#241403',
    borderMetallic: '#FCD34D',
    label: 'GOLD PARTNER',
    subLabel: 'PREMIER ADVISORY & SOLUTIONS',
    badgeEmoji: '🥇',
    commission: '30% Recurring'
  },
  silver: {
    primaryGradient: ['#FFFFFF', '#CBD5E1', '#64748B'],
    accentColor: '#93C5FD',
    accentGlow: 'rgba(147, 197, 253, 0.35)',
    textColor: '#F8FAFC',
    surfaceDark: '#080E1A',
    surfaceMid: '#142033',
    borderMetallic: '#E2E8F0',
    label: 'SILVER PARTNER',
    subLabel: 'ACCREDITED CONSULTING PARTNER',
    badgeEmoji: '🥈',
    commission: '20% Recurring'
  },
  bronze: {
    primaryGradient: ['#FED7AA', '#D97706', '#7C2D12'],
    accentColor: '#FB923C',
    accentGlow: 'rgba(251, 146, 60, 0.35)',
    textColor: '#FFF7ED',
    surfaceDark: '#140A05',
    surfaceMid: '#29140A',
    borderMetallic: '#FDBA74',
    label: 'BRONZE PARTNER',
    subLabel: 'CERTIFIED ASSOCIATE PARTNER',
    badgeEmoji: '🥉',
    commission: '15% Recurring'
  }
};

/**
 * 1. CREST / CIRCULAR MEDALLION BADGE SVG GENERATOR
 */
function renderCrestBadgeSvg(opts: Required<PartnerBadgeOptions>, theme: TierTheme): string {
  const uid = `crest-${opts.partnerId.replace(/[^a-zA-Z0-9]/g, '')}-${Date.now().toString(36)}`;
  const pName = escapeXml(opts.partnerName.toUpperCase());
  const pId = escapeXml(opts.partnerId);
  const year = escapeXml(String(opts.year));
  const spec = escapeXml(opts.specialization.toUpperCase());
  const hash = escapeXml(opts.securityHash);

  // SVG Curved text path radii
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 540" width="540" height="540" role="img" aria-label="NextSofthr Certified ${theme.label} - ${pName}">
  <title>NextSofthr Official Certification Badge - ${pName} (${theme.label})</title>
  <desc>Verified Channel Partner Credentials for ${pName}, ID ${pId}, Certified ${year}</desc>
  <defs>
    <!-- Background Gradients -->
    <radialGradient id="${uid}-bgGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${theme.surfaceMid}" />
      <stop offset="75%" stop-color="${theme.surfaceDark}" />
      <stop offset="100%" stop-color="#020610" />
    </radialGradient>

    <!-- Metallic Edge Gradient -->
    <linearGradient id="${uid}-metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${theme.primaryGradient[0]}" />
      <stop offset="25%" stop-color="${theme.primaryGradient[1]}" />
      <stop offset="50%" stop-color="#FFFFFF" />
      <stop offset="75%" stop-color="${theme.primaryGradient[2]}" />
      <stop offset="100%" stop-color="${theme.primaryGradient[0]}" />
    </linearGradient>

    <linearGradient id="${uid}-accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${theme.accentColor}" />
      <stop offset="100%" stop-color="#FFFFFF" />
    </linearGradient>

    <!-- Filters for 3D metallic depth & glow -->
    <filter id="${uid}-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="rgba(0,0,0,0.65)" />
    </filter>

    <filter id="${uid}-glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>

    <!-- Text Paths for Circular Text -->
    <!-- Top Arc Path: Radius ~ 205 -->
    <path id="${uid}-topArc" d="M 65 270 A 205 205 0 0 1 475 270" fill="none" />
    <!-- Bottom Arc Path: Radius ~ 205 -->
    <path id="${uid}-bottomArc" d="M 475 270 A 205 205 0 0 1 65 270" fill="none" />
  </defs>

  <!-- Drop Shadow Wrapper -->
  <g filter="url(#${uid}-shadow)">
    <!-- Outer Starburst / Cog Rim (60 Teeth) -->
    <circle cx="270" cy="270" r="255" fill="${theme.surfaceDark}" stroke="url(#${uid}-metalGrad)" stroke-width="4" />
    
    <!-- Concentric Decorative Dots / Cog Beads -->
    <circle cx="270" cy="270" r="242" fill="none" stroke="url(#${uid}-metalGrad)" stroke-width="1.5" stroke-dasharray="3 7" opacity="0.85" />
    
    <!-- Outer Beveled Metallic Ring -->
    <circle cx="270" cy="270" r="232" fill="none" stroke="url(#${uid}-metalGrad)" stroke-width="8" />
    <circle cx="270" cy="270" r="226" fill="none" stroke="${theme.surfaceDark}" stroke-width="2" />
    
    <!-- Main Background Disc -->
    <circle cx="270" cy="270" r="224" fill="url(#${uid}-bgGrad)" />

    <!-- Subtle Tech Guilloche Pattern Lines -->
    <g opacity="0.15" stroke="url(#${uid}-metalGrad)" stroke-width="1" fill="none">
      <circle cx="270" cy="270" r="185" />
      <circle cx="270" cy="270" r="150" />
      <circle cx="270" cy="270" r="120" />
      <polygon points="270,120 374,180 374,300 270,360 166,300 166,180" />
      <polygon points="270,180 348,225 348,315 270,360 192,315 192,225" />
    </g>

    <!-- Inner Metallic Ring -->
    <circle cx="270" cy="270" r="172" fill="none" stroke="url(#${uid}-metalGrad)" stroke-width="3" />
    <circle cx="270" cy="270" r="166" fill="none" stroke="${theme.accentColor}" stroke-width="1" opacity="0.6" />

    <!-- Top Circular Text: NEXTSOFTHR CERTIFIED PARTNER -->
    <text fill="url(#${uid}-metalGrad)" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="900" letter-spacing="4" text-anchor="middle">
      <textPath href="#${uid}-topArc" startOffset="50%">
        ★ NEXTSOFTHR GLOBAL PARTNER NETWORK ★
      </textPath>
    </text>

    <!-- Bottom Circular Text: OFFICIAL CREDENTIAL & VERIFICATION -->
    <text fill="${theme.accentColor}" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="800" letter-spacing="3" text-anchor="middle">
      <textPath href="#${uid}-bottomArc" startOffset="50%">
        OFFICIAL VERIFICATION • ${hash}
      </textPath>
    </text>

    <!-- Center Heraldic Laurel Wreath Graphics -->
    <g fill="url(#${uid}-metalGrad)" opacity="0.75">
      <!-- Left Laurel Leaves -->
      <path d="M 148 270 C 145 240 165 210 185 190 C 182 205 180 220 178 240 C 165 245 152 255 148 270 Z" />
      <path d="M 152 300 C 150 275 168 250 188 235 C 185 250 182 265 178 280 C 168 285 158 292 152 300 Z" />
      <path d="M 165 330 C 162 308 178 288 198 278 C 192 292 188 305 182 320 C 174 322 168 326 165 330 Z" />
      <!-- Right Laurel Leaves (Mirrored) -->
      <path d="M 392 270 C 395 240 375 210 355 190 C 358 205 360 220 362 240 C 375 245 388 255 392 270 Z" />
      <path d="M 388 300 C 390 275 372 250 352 235 C 355 250 358 265 362 280 C 372 285 382 292 388 300 Z" />
      <path d="M 375 330 C 378 308 362 288 342 278 C 348 292 352 305 358 320 C 366 322 372 326 375 330 Z" />
    </g>

    <!-- Center Tier Emblem / Diamond / Crown -->
    <g transform="translate(270, 195)">
      <!-- Luminous Glow Behind Diamond -->
      <circle cx="0" cy="0" r="36" fill="${theme.accentGlow}" filter="url(#${uid}-glow)" />
      
      <!-- Tier Diamond Silhouette -->
      <polygon points="0,-24 22,-2 0,20 -22,-2" fill="url(#${uid}-metalGrad)" />
      <polygon points="0,-20 18,-2 0,16 -18,-2" fill="${theme.surfaceDark}" />
      <polygon points="0,-16 14,-2 0,12 -14,-2" fill="url(#${uid}-metalGrad)" />
      <!-- Center Star Glint -->
      <circle cx="0" cy="-2" r="4" fill="${theme.accentColor}" />
    </g>

    <!-- Center Partner Tier Ribbon Banner -->
    <g transform="translate(270, 255)">
      <!-- Ribbon Shadow & Base -->
      <rect x="-140" y="-18" width="280" height="36" rx="6" fill="${theme.surfaceDark}" stroke="url(#${uid}-metalGrad)" stroke-width="2.5" />
      
      <!-- Ribbon Ends / Notches -->
      <polygon points="-140,-12 -156,0 -140,12" fill="${theme.surfaceDark}" stroke="url(#${uid}-metalGrad)" stroke-width="2" />
      <polygon points="140,-12 156,0 140,12" fill="${theme.surfaceDark}" stroke="url(#${uid}-metalGrad)" stroke-width="2" />

      <!-- Tier Label -->
      <text x="0" y="6" fill="url(#${uid}-metalGrad)" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="900" letter-spacing="3" text-anchor="middle">
        ${theme.label}
      </text>
    </g>

    <!-- Center: Partner Organization Name -->
    <g transform="translate(270, 316)">
      <text x="0" y="0" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="800" text-anchor="middle" letter-spacing="0.5">
        ${pName}
      </text>
      <text x="0" y="20" fill="${theme.accentColor}" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700" text-anchor="middle" letter-spacing="1">
        ${spec}
      </text>
    </g>

    <!-- Divider Line with Diamond Notch -->
    <g transform="translate(270, 356)" stroke="url(#${uid}-metalGrad)" stroke-width="1.5">
      <line x1="-90" y1="0" x2="-15" y2="0" />
      <polygon points="0,-4 4,0 0,4 -4,0" fill="${theme.accentColor}" />
      <line x1="15" y1="0" x2="90" y2="0" />
    </g>

    <!-- Certification Info Footnote: Year & Partner ID -->
    <g transform="translate(270, 384)">
      <rect x="-85" y="-12" width="170" height="24" rx="12" fill="#040D1D" stroke="url(#${uid}-metalGrad)" stroke-width="1" />
      <text x="0" y="4" fill="#FFFFFF" font-family="ui-monospace, monospace" font-size="11" font-weight="700" text-anchor="middle" letter-spacing="1">
        ${pId} • CERTIFIED ${year}
      </text>
    </g>

    <!-- 5 Star Rating Quality Arc -->
    <g transform="translate(270, 424)" fill="url(#${uid}-metalGrad)">
      <polygon points="0,-8 2,-2 8,-2 3,2 5,8 0,4 -5,8 -3,2 -8,-2 -2,-2" transform="translate(-40, 0) scale(1.1)" />
      <polygon points="0,-8 2,-2 8,-2 3,2 5,8 0,4 -5,8 -3,2 -8,-2 -2,-2" transform="translate(-20, 0) scale(1.1)" />
      <polygon points="0,-8 2,-2 8,-2 3,2 5,8 0,4 -5,8 -3,2 -8,-2 -2,-2" transform="translate(0, 0) scale(1.3)" fill="${theme.accentColor}" />
      <polygon points="0,-8 2,-2 8,-2 3,2 5,8 0,4 -5,8 -3,2 -8,-2 -2,-2" transform="translate(20, 0) scale(1.1)" />
      <polygon points="0,-8 2,-2 8,-2 3,2 5,8 0,4 -5,8 -3,2 -8,-2 -2,-2" transform="translate(40, 0) scale(1.1)" />
    </g>
  </g>
</svg>`;
}

/**
 * 2. SHIELD / HERALDIC ENTERPRISE CYBER-SHIELD BADGE SVG GENERATOR
 */
function renderShieldBadgeSvg(opts: Required<PartnerBadgeOptions>, theme: TierTheme): string {
  const uid = `shield-${opts.partnerId.replace(/[^a-zA-Z0-9]/g, '')}-${Date.now().toString(36)}`;
  const pName = escapeXml(opts.partnerName.toUpperCase());
  const pId = escapeXml(opts.partnerId);
  const year = escapeXml(String(opts.year));
  const spec = escapeXml(opts.specialization.toUpperCase());
  const hash = escapeXml(opts.securityHash);
  const region = escapeXml(opts.region.toUpperCase());

  // Dynamic font sizing for shield typography to prevent any border collision
  const pNameFontSize = pName.length > 28 ? 13 : pName.length > 20 ? 15 : 17;
  const specFontSize = spec.length > 28 ? 9 : spec.length > 20 ? 10 : 11.5;

  // Shield Path coordinates: width 500, height 580
  // Top horizontal with chamfers: (50, 40) -> (450, 40)
  // Curves down to pointed tip at (250, 530)
  const shieldOuterPath = "M 80 40 L 420 40 C 460 40 470 70 470 120 C 470 340 370 460 250 530 C 130 460 30 340 30 120 C 30 70 40 40 80 40 Z";
  const shieldInnerPath = "M 90 54 L 410 54 C 445 54 454 80 454 125 C 454 330 360 442 250 510 C 140 442 46 330 46 125 C 46 80 55 54 90 54 Z";
  const shieldCorePath  = "M 102 70 L 398 70 C 428 70 436 94 436 132 C 436 318 348 424 250 488 C 152 424 64 318 64 132 C 64 94 72 70 102 70 Z";

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 580" width="500" height="580" role="img" aria-label="NextSofthr Certified ${theme.label} Enterprise Shield - ${pName}">
  <title>NextSofthr Enterprise Shield Certification - ${pName}</title>
  <defs>
    <!-- Background Gradients -->
    <linearGradient id="${uid}-shieldBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${theme.surfaceMid}" />
      <stop offset="50%" stop-color="${theme.surfaceDark}" />
      <stop offset="100%" stop-color="#020713" />
    </linearGradient>

    <!-- Metallic Edge Gradient -->
    <linearGradient id="${uid}-metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${theme.primaryGradient[0]}" />
      <stop offset="30%" stop-color="${theme.primaryGradient[1]}" />
      <stop offset="55%" stop-color="#FFFFFF" />
      <stop offset="80%" stop-color="${theme.primaryGradient[2]}" />
      <stop offset="100%" stop-color="${theme.primaryGradient[0]}" />
    </linearGradient>

    <!-- Specular Highlight Sheen -->
    <linearGradient id="${uid}-sheen" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.3)" />
      <stop offset="50%" stop-color="rgba(255,255,255,0.0)" />
      <stop offset="100%" stop-color="rgba(255,255,255,0.15)" />
    </linearGradient>

    <!-- Drop Shadow -->
    <filter id="${uid}-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="rgba(0,0,0,0.7)" />
    </filter>

    <filter id="${uid}-glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="10" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <g filter="url(#${uid}-shadow)">
    <!-- Outer Shield Bevel & Rim -->
    <path d="${shieldOuterPath}" fill="${theme.surfaceDark}" stroke="url(#${uid}-metalGrad)" stroke-width="5" />
    
    <!-- Inner Metallic Inset -->
    <path d="${shieldInnerPath}" fill="none" stroke="url(#${uid}-metalGrad)" stroke-width="2.5" opacity="0.85" />
    
    <!-- Core Shield Face -->
    <path d="${shieldCorePath}" fill="url(#${uid}-shieldBg)" stroke="rgba(255,255,255,0.15)" stroke-width="1" />

    <!-- Cyber Shield Geometry Grid / Hex Accent -->
    <g opacity="0.12" stroke="url(#${uid}-metalGrad)" stroke-width="1" fill="none">
      <line x1="250" y1="70" x2="250" y2="480" />
      <line x1="100" y1="200" x2="400" y2="200" />
      <line x1="80" y1="320" x2="420" y2="320" />
      <circle cx="250" cy="180" r="70" />
      <circle cx="250" cy="180" r="110" />
    </g>

    <!-- Top Header Ribbon / Header Eyebrow -->
    <g transform="translate(250, 95)">
      <rect x="-140" y="-14" width="280" height="28" rx="14" fill="#040D1D" stroke="url(#${uid}-metalGrad)" stroke-width="1" />
      <circle cx="-115" cy="0" r="4" fill="${theme.accentColor}" />
      <text x="0" y="4" fill="url(#${uid}-metalGrad)" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="900" letter-spacing="3" text-anchor="middle">
        NEXTSOFTHR CERTIFIED
      </text>
      <circle cx="115" cy="0" r="4" fill="${theme.accentColor}" />
    </g>

    <!-- Center Icon: Crown / Diamond with Glowing Aura -->
    <g transform="translate(250, 175)">
      <!-- Aura Glow -->
      <circle cx="0" cy="0" r="45" fill="${theme.accentGlow}" filter="url(#${uid}-glow)" />
      
      <!-- Tier Medallion Emblem -->
      <circle cx="0" cy="0" r="40" fill="${theme.surfaceDark}" stroke="url(#${uid}-metalGrad)" stroke-width="3" />
      <circle cx="0" cy="0" r="34" fill="none" stroke="${theme.accentColor}" stroke-width="1.5" stroke-dasharray="4 3" />
      
      <!-- Crown / Gem Vector -->
      <path d="M -18 8 L -14 -12 L -5 -3 L 0 -16 L 5 -3 L 14 -12 L 18 8 Z" fill="url(#${uid}-metalGrad)" stroke="${theme.surfaceDark}" stroke-width="1" />
      <circle cx="0" cy="4" r="3.5" fill="${theme.accentColor}" />
    </g>

    <!-- Tier Name Plaque -->
    <g transform="translate(250, 248)">
      <rect x="-160" y="-18" width="320" height="38" rx="6" fill="#020817" stroke="url(#${uid}-metalGrad)" stroke-width="2.5" />
      <!-- Subtle side highlights -->
      <line x1="-150" y1="1" x2="-120" y2="1" stroke="${theme.accentColor}" stroke-width="2" />
      <line x1="120" y1="1" x2="150" y2="1" stroke="${theme.accentColor}" stroke-width="2" />

      <text x="0" y="7" fill="url(#${uid}-metalGrad)" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="900" letter-spacing="3.5" text-anchor="middle">
        ${theme.label}
      </text>
    </g>

    <!-- Partner Full Business Name -->
    <g transform="translate(250, 310)">
      <text x="0" y="0" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-size="${pNameFontSize}" font-weight="800" text-anchor="middle" letter-spacing="0.5" ${pName.length > 24 ? 'textLength="300" lengthAdjust="spacingAndGlyphs"' : ''}>
        ${pName}
      </text>
      <text x="0" y="22" fill="${theme.accentColor}" font-family="system-ui, -apple-system, sans-serif" font-size="${specFontSize}" font-weight="700" text-anchor="middle" letter-spacing="1" ${spec.length > 24 ? 'textLength="260" lengthAdjust="spacingAndGlyphs"' : ''}>
        ${spec}
      </text>
      <text x="0" y="40" fill="#94A3B8" font-family="system-ui, -apple-system, sans-serif" font-size="10.5" font-weight="600" text-anchor="middle" letter-spacing="0.8">
        REGION: ${region}
      </text>
    </g>

    <!-- Security Micro-Bar & Hash -->
    <g transform="translate(250, 382)">
      <line x1="-110" y1="0" x2="110" y2="0" stroke="url(#${uid}-metalGrad)" stroke-width="1.5" />
      
      <!-- Security Barcode-like dashes -->
      <g stroke="url(#${uid}-metalGrad)" stroke-width="1.5" opacity="0.65">
        <line x1="-85" y1="-7" x2="-85" y2="7" />
        <line x1="-75" y1="-4" x2="-75" y2="4" />
        <line x1="-65" y1="-9" x2="-65" y2="9" />
        <line x1="65" y1="-9" x2="65" y2="9" />
        <line x1="75" y1="-4" x2="75" y2="4" />
        <line x1="85" y1="-7" x2="85" y2="7" />
      </g>

      <rect x="-65" y="-12" width="130" height="24" rx="4" fill="#040E1F" stroke="url(#${uid}-metalGrad)" stroke-width="1.5" />
      <text x="0" y="4" fill="#FFFFFF" font-family="ui-monospace, monospace" font-size="11.5" font-weight="800" text-anchor="middle">
        ${pId}
      </text>
    </g>

    <!-- Bottom Shield Tail: Cryptographic Verification Stamp (Inside Shield Bounds) -->
    <g transform="translate(250, 418)">
      <text x="0" y="0" fill="${theme.accentColor}" font-family="system-ui, -apple-system, sans-serif" font-size="8.5" font-weight="800" letter-spacing="1" textLength="145" lengthAdjust="spacingAndGlyphs" text-anchor="middle">
        VERIFIED CREDENTIAL
      </text>
      <text x="0" y="15" fill="${theme.accentColor}" font-family="system-ui, -apple-system, sans-serif" font-size="8.5" font-weight="800" letter-spacing="1" text-anchor="middle">
        VALID ${year}
      </text>
      <text x="0" y="31" fill="#64748B" font-family="ui-monospace, monospace" font-size="8" font-weight="600" text-anchor="middle" letter-spacing="0.5" textLength="105" lengthAdjust="spacingAndGlyphs">
        ${hash}
      </text>
      <!-- Bottom Apex Cyber Node -->
      <circle cx="0" cy="45" r="2.5" fill="${theme.accentColor}" filter="url(#${uid}-glow)" />
    </g>
  </g>
</svg>`;
}

/**
 * 3. HEX / TECH CLOUD CYBER HEXAGON BADGE SVG GENERATOR
 */
function renderHexBadgeSvg(opts: Required<PartnerBadgeOptions>, theme: TierTheme): string {
  const uid = `hex-${opts.partnerId.replace(/[^a-zA-Z0-9]/g, '')}-${Date.now().toString(36)}`;
  const pName = escapeXml(opts.partnerName.toUpperCase());
  const pId = escapeXml(opts.partnerId);
  const year = escapeXml(String(opts.year));
  const spec = escapeXml(opts.specialization.toUpperCase());
  const hash = escapeXml(opts.securityHash);

  // Dynamic font sizing for company name & specialization to guarantee zero overflow
  const pNameFontSize = pName.length > 26 ? 12.5 : pName.length > 20 ? 14 : 15.5;
  const specFontSize = spec.length > 26 ? 10 : 11;
  const tierFontSize = theme.label.length > 16 ? 15 : 17;

  // Hexagon with vertical symmetry: center 250, 270, radius ~240
  // Top vertex (250, 25), (465, 149), (465, 391), (250, 515), (35, 391), (35, 149)
  const hexOuterPoints = "250,25 465,149 465,391 250,515 35,391 35,149";
  const hexInnerPoints = "250,42 448,157 448,383 250,498 52,383 52,157";
  const hexCorePoints  = "250,58 432,165 432,375 250,482 68,375 68,165";

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 540" width="500" height="540" style="width: 100%; height: auto; max-width: 100%; display: block;" role="img" aria-label="NextSofthr Certified ${theme.label} Tech Hexagon - ${pName}">
  <title>NextSofthr Cloud Partner Certification - ${pName}</title>
  <defs>
    <radialGradient id="${uid}-hexBg" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="${theme.surfaceMid}" />
      <stop offset="65%" stop-color="${theme.surfaceDark}" />
      <stop offset="100%" stop-color="#010610" />
    </radialGradient>

    <linearGradient id="${uid}-metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${theme.primaryGradient[0]}" />
      <stop offset="35%" stop-color="${theme.primaryGradient[1]}" />
      <stop offset="60%" stop-color="#FFFFFF" />
      <stop offset="85%" stop-color="${theme.primaryGradient[2]}" />
      <stop offset="100%" stop-color="${theme.primaryGradient[0]}" />
    </linearGradient>

    <filter id="${uid}-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="18" flood-color="rgba(0,0,0,0.75)" />
    </filter>

    <filter id="${uid}-glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <g filter="url(#${uid}-shadow)">
    <!-- Outer Cyber Hexagon -->
    <polygon points="${hexOuterPoints}" fill="${theme.surfaceDark}" stroke="url(#${uid}-metalGrad)" stroke-width="4.5" />
    <polygon points="${hexInnerPoints}" fill="none" stroke="${theme.accentColor}" stroke-width="1.5" stroke-dasharray="6 6" opacity="0.7" />
    <polygon points="${hexCorePoints}" fill="url(#${uid}-hexBg)" stroke="rgba(255,255,255,0.12)" stroke-width="1.5" />

    <!-- Cyber Circuit Traces & Micro Nodes -->
    <g opacity="0.18" stroke="url(#${uid}-metalGrad)" stroke-width="1" fill="none">
      <line x1="250" y1="58" x2="250" y2="482" />
      <line x1="68" y1="270" x2="432" y2="270" />
      <circle cx="250" cy="270" r="140" />
      <circle cx="250" cy="270" r="90" />
    </g>

    <!-- Top Status Beacon -->
    <g transform="translate(250, 98)">
      <rect x="-95" y="-12" width="190" height="24" rx="12" fill="#040F22" stroke="url(#${uid}-metalGrad)" stroke-width="1" />
      <circle cx="-75" cy="0" r="3" fill="${theme.accentColor}" filter="url(#${uid}-glow)" />
      <text x="8" y="3.5" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-size="9" font-weight="900" letter-spacing="1.5" text-anchor="middle">
        ACTIVE VERIFIED NODE
      </text>
    </g>

    <!-- Center Icon: Cloud / Chip Engine -->
    <g transform="translate(250, 168)">
      <circle cx="0" cy="0" r="38" fill="${theme.accentGlow}" filter="url(#${uid}-glow)" />
      <polygon points="0,-26 22,-13 22,13 0,26 -22,13 -22,-13" fill="${theme.surfaceDark}" stroke="url(#${uid}-metalGrad)" stroke-width="2.5" />
      <!-- Stylized Cloud / Server Core -->
      <path d="M -11 5 C -14 5 -16 2 -16 0 C -16 -3 -14 -5 -11 -5 C -11 -8 -8 -11 -4 -11 C -1 -11 2 -8 3 -5 C 5 -5 7 -3 7 -1 C 7 2 5 5 2 5 Z" fill="url(#${uid}-metalGrad)" />
      <circle cx="0" cy="1" r="2.5" fill="${theme.accentColor}" />
    </g>

    <!-- Tier Plaque Banner -->
    <g transform="translate(250, 235)">
      <rect x="-140" y="-17" width="280" height="34" rx="6" fill="#020714" stroke="url(#${uid}-metalGrad)" stroke-width="2" />
      <text x="0" y="5.5" fill="url(#${uid}-metalGrad)" font-family="system-ui, -apple-system, sans-serif" font-size="${tierFontSize}" font-weight="900" letter-spacing="2" text-anchor="middle">
        ${theme.label}
      </text>
    </g>

    <!-- Partner Business Identity (Secure Central Placement) -->
    <g transform="translate(250, 298)">
      <text x="0" y="0" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-size="${pNameFontSize}" font-weight="800" text-anchor="middle" letter-spacing="0.4">
        ${pName}
      </text>
      <text x="0" y="20" fill="${theme.accentColor}" font-family="system-ui, -apple-system, sans-serif" font-size="${specFontSize}" font-weight="700" text-anchor="middle" letter-spacing="0.8">
        ${spec}
      </text>
      <text x="0" y="38" fill="#94A3B8" font-family="system-ui, -apple-system, sans-serif" font-size="9.5" font-weight="600" text-anchor="middle" letter-spacing="0.8">
        NEXTSOFTHR CLOUD ECOSYSTEM
      </text>
    </g>

    <!-- ID & Security Seal (Y=368, Inside Hex Core Width) -->
    <g transform="translate(250, 368)">
      <line x1="-110" y1="0" x2="-68" y2="0" stroke="url(#${uid}-metalGrad)" stroke-width="1.5" />
      <rect x="-65" y="-11" width="130" height="22" rx="4" fill="#040F22" stroke="url(#${uid}-metalGrad)" stroke-width="1" />
      <text x="0" y="3.5" fill="#FFFFFF" font-family="ui-monospace, monospace" font-size="10.5" font-weight="800" text-anchor="middle">
        ${pId} • ${year}
      </text>
      <line x1="68" y1="0" x2="110" y2="0" stroke="url(#${uid}-metalGrad)" stroke-width="1.5" />
    </g>

    <!-- Bottom Cryptographic Ledger Proof (Inside Hexagon, Zero Overflow) -->
    <g transform="translate(250, 404)">
      <text x="0" y="0" fill="${theme.accentColor}" font-family="ui-monospace, monospace" font-size="9.5" font-weight="700" text-anchor="middle" letter-spacing="1">
        ${hash}
      </text>
      <text x="0" y="15" fill="#64748B" font-family="system-ui, -apple-system, sans-serif" font-size="7" font-weight="700" text-anchor="middle" letter-spacing="0.5" textLength="190" lengthAdjust="spacingAndGlyphs">
        SECURE CLOUD CERTIFICATION PROTOCOL
      </text>
      <!-- Apex Cyber Indicator -->
      <circle cx="0" cy="28" r="3" fill="${theme.accentColor}" filter="url(#${uid}-glow)" />
    </g>
  </g>
</svg>`;
}

/**
 * 4. COMPACT / HORIZONTAL SIGNATURE BADGE SVG GENERATOR
 * Ideal for email signatures, websites footers, proposals, invoices
 */
function renderCompactBadgeSvg(opts: Required<PartnerBadgeOptions>, theme: TierTheme): string {
  const uid = `compact-${opts.partnerId.replace(/[^a-zA-Z0-9]/g, '')}-${Date.now().toString(36)}`;
  const pName = escapeXml(opts.partnerName.toUpperCase());
  const pId = escapeXml(opts.partnerId);
  const year = escapeXml(String(opts.year));
  const spec = escapeXml(opts.specialization.toUpperCase());
  const hash = escapeXml(opts.securityHash);

  const pNameFontSize = pName.length > 28 ? 11 : pName.length > 20 ? 12 : 13;
  const specFontSize = spec.length > 28 ? 8.5 : 9.5;
  const tierFontSize = theme.label.length > 16 ? 14 : 16;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 180" width="640" height="180" style="width: 100%; height: auto; max-width: 100%; display: block;" role="img" aria-label="NextSofthr Certified ${theme.label} Banner - ${pName}">
  <title>NextSofthr Certified Partner Banner - ${pName}</title>
  <defs>
    <linearGradient id="${uid}-bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${theme.surfaceMid}" />
      <stop offset="60%" stop-color="${theme.surfaceDark}" />
      <stop offset="100%" stop-color="#020610" />
    </linearGradient>

    <linearGradient id="${uid}-metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${theme.primaryGradient[0]}" />
      <stop offset="35%" stop-color="${theme.primaryGradient[1]}" />
      <stop offset="65%" stop-color="#FFFFFF" />
      <stop offset="90%" stop-color="${theme.primaryGradient[2]}" />
      <stop offset="100%" stop-color="${theme.primaryGradient[0]}" />
    </linearGradient>

    <filter id="${uid}-shadow" x="-10%" y="-20%" width="120%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="rgba(0,0,0,0.6)" />
    </filter>

    <filter id="${uid}-glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <g filter="url(#${uid}-shadow)">
    <!-- Container Card -->
    <rect x="8" y="8" width="624" height="164" rx="14" fill="url(#${uid}-bgGrad)" stroke="url(#${uid}-metalGrad)" stroke-width="2.5" />
    
    <!-- Accent Left Glow Border -->
    <rect x="8" y="8" width="5" height="164" rx="2.5" fill="${theme.accentColor}" />

    <!-- Left Mini Crest Seal -->
    <g transform="translate(75, 90)">
      <circle cx="0" cy="0" r="46" fill="${theme.surfaceDark}" stroke="url(#${uid}-metalGrad)" stroke-width="2.5" />
      <circle cx="0" cy="0" r="40" fill="none" stroke="${theme.accentColor}" stroke-width="1.2" stroke-dasharray="3 3" opacity="0.8" />
      <circle cx="0" cy="32" r="32" fill="url(#${uid}-bgGrad)" stroke="url(#${uid}-metalGrad)" stroke-width="1.2" />
      <polygon points="0,-13 13,0 0,13 -13,0" fill="url(#${uid}-metalGrad)" />
      <circle cx="0" cy="0" r="3.5" fill="${theme.accentColor}" filter="url(#${uid}-glow)" />

      <!-- Seal Mini Ribbon -->
      <rect x="-28" y="19" width="56" height="13" rx="3" fill="#040E1F" stroke="url(#${uid}-metalGrad)" stroke-width="1" />
      <text x="0" y="28.5" fill="url(#${uid}-metalGrad)" font-family="system-ui, -apple-system, sans-serif" font-size="8" font-weight="900" letter-spacing="1" text-anchor="middle">
        ${year}
      </text>
    </g>

    <!-- Middle Information Hierarchy -->
    <g transform="translate(138, 38)">
      <!-- Eyebrow Organization Title -->
      <text x="0" y="0" fill="url(#${uid}-metalGrad)" font-family="system-ui, -apple-system, sans-serif" font-size="8.8" font-weight="900" letter-spacing="1.2" textLength="320" lengthAdjust="spacing">
        NEXTSOFTHR CERTIFIED PARTNER PROGRAM
      </text>

      <!-- Tier Title Plaque -->
      <text x="0" y="23" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-size="${tierFontSize}" font-weight="900" letter-spacing="1.2">
        ${theme.label}
      </text>

      <!-- Partner Org Name -->
      <text x="0" y="45" fill="${theme.accentColor}" font-family="system-ui, -apple-system, sans-serif" font-size="${pNameFontSize}" font-weight="800" letter-spacing="0.3">
        ${pName}
      </text>

      <!-- Specialization -->
      <text x="0" y="65" fill="#94A3B8" font-family="system-ui, -apple-system, sans-serif" font-size="${specFontSize}" font-weight="600" letter-spacing="0.3">
        ${spec}
      </text>

      <!-- Subtitle Credential -->
      <text x="0" y="83" fill="#64748B" font-family="system-ui, -apple-system, sans-serif" font-size="8" font-weight="600" letter-spacing="0.6">
        OFFICIAL VERIFIED CREDENTIAL • ${year}
      </text>
    </g>

    <!-- Right-Hand Verification Stamp -->
    <g transform="translate(555, 90)">
      <rect x="-59" y="-35" width="118" height="70" rx="10" fill="#030914" stroke="url(#${uid}-metalGrad)" stroke-width="1.5" />
      <circle cx="-42" cy="-14" r="3" fill="${theme.accentColor}" filter="url(#${uid}-glow)" />
      <text x="0" y="-11" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-size="8.5" font-weight="800" letter-spacing="0.5" text-anchor="middle">
        VERIFIED ACTIVE
      </text>
      <text x="0" y="8" fill="url(#${uid}-metalGrad)" font-family="ui-monospace, monospace" font-size="10.5" font-weight="800" text-anchor="middle">
        ${pId}
      </text>
      <text x="0" y="23" fill="#94A3B8" font-family="ui-monospace, monospace" font-size="7.5" text-anchor="middle">
        ${hash}
      </text>
    </g>
  </g>
</svg>`;
}

/**
 * Master Generator Function
 * Generates dynamic SVG string based on partner tier, name, ID, and selected style
 */
export function generatePartnerBadgeSvg(options: PartnerBadgeOptions): string {
  const fullOpts: Required<PartnerBadgeOptions> = {
    partnerName: options.partnerName || 'Pan-African HR Advisory Ltd',
    tier: options.tier || 'platinum',
    partnerId: options.partnerId || 'NX-PTR-8832',
    year: options.year || 2026,
    specialization: options.specialization || 'Enterprise Cloud HR & Payroll',
    region: options.region || 'West Africa & Global Operations',
    styleVariant: options.styleVariant || 'crest',
    issueDate: options.issueDate || 'January 2026',
    validThrough: options.validThrough || 'December 2027',
    securityHash: options.securityHash || generateSecurityHash(options.partnerId || 'NX-PTR-8832', options.partnerName || 'Partner', options.tier || 'platinum'),
    verifiedStatus: options.verifiedStatus || 'Active Certified'
  };

  const theme = TIER_THEMES[fullOpts.tier] || TIER_THEMES.platinum;

  switch (fullOpts.styleVariant) {
    case 'shield':
      return renderShieldBadgeSvg(fullOpts, theme);
    case 'hex':
      return renderHexBadgeSvg(fullOpts, theme);
    case 'compact':
      return renderCompactBadgeSvg(fullOpts, theme);
    case 'crest':
    default:
      return renderCrestBadgeSvg(fullOpts, theme);
  }
}

/**
 * Triggers instant native .svg file download in the browser
 */
export function downloadPartnerBadgeSvg(options: PartnerBadgeOptions, customFilename?: string): void {
  const svgString = generatePartnerBadgeSvg(options);
  const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const safeName = (options.partnerName || 'partner')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  const filename = customFilename || `nextsofthr-${options.tier || 'platinum'}-badge-${safeName}.svg`;

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Converts dynamic SVG to crisp Retina High-Res PNG and downloads it
 */
export function downloadPartnerBadgePng(
  options: PartnerBadgeOptions, 
  customFilename?: string, 
  scale: number = 2
): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const svgString = generatePartnerBadgeSvg(options);
      const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);

      const img = new Image();
      img.onload = () => {
        const width = img.naturalWidth || 540;
        const height = img.naturalHeight || 540;

        const canvas = document.createElement('canvas');
        canvas.width = width * scale;
        canvas.height = height * scale;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get 2D canvas context'));
          return;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.scale(scale, scale);
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((pngBlob) => {
          if (!pngBlob) {
            reject(new Error('Failed to generate PNG blob'));
            return;
          }

          const pngUrl = URL.createObjectURL(pngBlob);
          const safeName = (options.partnerName || 'partner')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
          const filename = customFilename || `nextsofthr-${options.tier || 'platinum'}-badge-${safeName}-highres.png`;

          const link = document.createElement('a');
          link.href = pngUrl;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          URL.revokeObjectURL(pngUrl);
          URL.revokeObjectURL(url);
          resolve();
        }, 'image/png', 1.0);
      };

      img.onerror = (err) => {
        URL.revokeObjectURL(url);
        reject(err);
      };

      img.src = url;
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Generates ready-to-copy HTML / Markdown embed snippet for websites & signatures
 */
export function generatePartnerBadgeEmbedCode(options: PartnerBadgeOptions): string {
  const pName = escapeXml(options.partnerName || 'Certified Partner');
  const pId = escapeXml(options.partnerId || 'NX-PTR-8832');
  const tier = (options.tier || 'platinum').toUpperCase();
  const verifyUrl = `https://nextsofthr.com/partners/verify?id=${encodeURIComponent(options.partnerId || 'NX-PTR-8832')}`;

  return `<!-- NextSofthr Official ${tier} Partner Badge -->
<a href="${verifyUrl}" target="_blank" rel="noopener noreferrer" title="Verify ${pName} as NextSofthr ${tier} Partner">
  <img src="https://cdn.nextsofthr.com/badges/${encodeURIComponent(options.partnerId || 'NX-PTR-8832')}-${(options.styleVariant || 'crest')}.svg" 
       alt="NextSofthr Certified ${tier} Partner - ${pName}" 
       width="${options.styleVariant === 'compact' ? 320 : 180}" 
       height="${options.styleVariant === 'compact' ? 90 : 180}" 
       style="display: inline-block; vertical-align: middle;" />
</a>`;
}

/**
 * Top-tier presets for our verified partner leaders
 */
export const TOP_TIER_PARTNER_PRESETS: PartnerBadgeOptions[] = [
  {
    partnerName: 'Pan-African HR Advisory Ltd',
    tier: 'platinum',
    partnerId: 'NX-PTR-8832',
    year: 2026,
    specialization: 'Enterprise Cloud HR & Payroll',
    region: 'Lagos & Nairobi • West & East Africa',
    styleVariant: 'crest'
  },
  {
    partnerName: 'Apex People Advisory',
    tier: 'platinum',
    partnerId: 'NX-PTR-9104',
    year: 2026,
    specialization: 'Statutory Payroll & Organizational Design',
    region: 'Nigeria & West Africa',
    styleVariant: 'shield'
  },
  {
    partnerName: 'Vanguard Workforce Strategies',
    tier: 'platinum',
    partnerId: 'NX-PTR-7721',
    year: 2026,
    specialization: 'Strategic Labor Planning & Executive Advisory',
    region: 'South Africa & SADC',
    styleVariant: 'crest'
  },
  {
    partnerName: 'Nairobi Chartered Accountants & Tax Advisory',
    tier: 'gold',
    partnerId: 'NX-PTR-6340',
    year: 2026,
    specialization: 'Tax Compliance, KRA Deductions & Audit',
    region: 'Kenya & East Africa',
    styleVariant: 'crest'
  },
  {
    partnerName: 'Accra Cloud Solutions Ltd',
    tier: 'gold',
    partnerId: 'NX-PTR-5219',
    year: 2026,
    specialization: 'System Integration & Enterprise Cloud Rollouts',
    region: 'Ghana & West Africa',
    styleVariant: 'hex'
  }
];
