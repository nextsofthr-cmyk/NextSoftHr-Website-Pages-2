import React from 'react';
import { Bot, CreditCard, Users, Clock, ShieldCheck, HeartHandshake, Briefcase, TrendingUp } from 'lucide-react';

interface ArticleCardImageProps {
  category: string;
  title: string;
  slug?: string;
  size?: 'featured' | 'card' | 'thumbnail' | 'hero';
  className?: string;
}

export const ArticleCardImage: React.FC<ArticleCardImageProps> = ({
  category,
  title,
  size = 'card',
  className = '',
}) => {
  // Select icon and aesthetic accents according to category
  const getCategoryDetails = () => {
    switch (category.toLowerCase()) {
      case 'ai & technology':
      case 'ai':
        return {
          icon: Bot,
          gradient: 'from-[#072448] via-[#0A3F7E] to-[#04162B]',
          accentText: 'NextSoftHr AI Co-Pilot',
          badgeText: 'INTELLIGENT DECISION SUPPORT',
          subPattern: 'neural-matrix',
        };
      case 'payroll':
        return {
          icon: CreditCard,
          gradient: 'from-[#092B5A] via-[#0E4D94] to-[#061C3B]',
          accentText: 'Automated Gross-to-Net Engine',
          badgeText: 'PAYROLL ACCURACY & STATUTORY',
          subPattern: 'currency-flow',
        };
      case 'talent':
        return {
          icon: Users,
          gradient: 'from-[#0C3264] via-[#105AA8] to-[#082348]',
          accentText: 'Talent Acquisition Pipeline',
          badgeText: 'COMPETENCY SCORECARDS',
          subPattern: 'talent-funnel',
        };
      case 'workforce':
        return {
          icon: Clock,
          gradient: 'from-[#062042] via-[#0B4385] to-[#031124]',
          accentText: 'Real-Time Attendance Intelligence',
          badgeText: 'SHIFT OPTIMIZATION',
          subPattern: 'clock-grid',
        };
      case 'employee experience':
        return {
          icon: HeartHandshake,
          gradient: 'from-[#0A3F7E] via-[#0C4E9B] to-[#052144]',
          accentText: 'Employee Self-Service (ESS)',
          badgeText: 'CULTURE & RETENTION',
          subPattern: 'engagement-pulse',
        };
      case 'compliance':
        return {
          icon: ShieldCheck,
          gradient: 'from-[#051E3D] via-[#083569] to-[#020E1E]',
          accentText: 'Regulatory Defense & Audit Trail',
          badgeText: 'STATUTORY AUDIT READY',
          subPattern: 'shield-lock',
        };
      case 'business':
        return {
          icon: Briefcase,
          gradient: 'from-[#082E5C] via-[#0C4688] to-[#041A35]',
          accentText: 'ERP & Financial Synchronization',
          badgeText: 'EXECUTIVE INTELLIGENCE',
          subPattern: 'business-metric',
        };
      default:
        return {
          icon: TrendingUp,
          gradient: 'from-[#0A3F7E] via-[#0D4B91] to-[#051E3D]',
          accentText: 'Strategic People Operations',
          badgeText: 'WORKFORCE INSIGHT',
          subPattern: 'growth-wave',
        };
    }
  };

  const details = getCategoryDetails();
  const IconComponent = details.icon;

  const heightClasses = {
    hero: 'h-72 sm:h-96 lg:h-[420px]',
    featured: 'h-64 sm:h-80 lg:h-full min-h-[300px]',
    card: 'h-48 sm:h-52',
    thumbnail: 'h-24 w-28 shrink-0',
  };

  return (
    <div
      className={`relative w-full overflow-hidden bg-gradient-to-br ${details.gradient} text-white flex flex-col justify-between ${heightClasses[size]} ${className}`}
    >
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
        backgroundSize: '20px 20px',
      }} />

      {/* Subtle brand glow in Lemon Green */}
      <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#8EE000]/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-[#0A3F7E]/40 blur-2xl pointer-events-none" />

      {/* Top Banner / Category Indicator */}
      <div className="relative z-10 p-4 sm:p-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/15 text-[#8EE000]">
            <IconComponent className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-semibold tracking-wider uppercase text-slate-200">
            {details.badgeText}
          </span>
        </div>

        {/* Brand Accent Dot */}
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/25 backdrop-blur-sm border border-white/10">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8EE000] animate-pulse" />
          <span className="text-[10px] font-mono text-slate-300">NextSoftHr</span>
        </div>
      </div>

      {/* Center Visual Mockup & Graph Motif */}
      <div className="relative z-10 px-4 sm:px-6 flex-1 flex flex-col justify-center">
        {size !== 'thumbnail' && (
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3.5 border border-white/10 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-300 truncate max-w-[200px]">
                {details.accentText}
              </span>
              <span className="text-[10px] font-mono text-[#8EE000] bg-[#8EE000]/10 px-1.5 py-0.5 rounded">
                Verified Module
              </span>
            </div>

            {/* Synthetic Data Metrics Bar */}
            <div className="grid grid-cols-3 gap-2 pt-1 border-t border-white/10">
              <div>
                <div className="text-[10px] text-slate-400">Status</div>
                <div className="text-xs font-semibold text-white">Active · Real-Time</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400">Jurisdiction</div>
                <div className="text-xs font-semibold text-[#8EE000]">Pan-African & Global</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400">Fidelity</div>
                <div className="text-xs font-semibold text-white font-mono">99.98%</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Editorial Caption */}
      <div className="relative z-10 p-4 sm:p-5 bg-gradient-to-t from-black/60 to-transparent">
        <p className="text-xs text-slate-300 font-medium line-clamp-1">
          {title}
        </p>
      </div>
    </div>
  );
};
