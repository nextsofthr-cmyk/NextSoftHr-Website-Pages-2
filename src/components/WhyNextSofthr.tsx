import React from 'react';
import {
  Layers,
  TrendingUp,
  Smile,
  Zap,
  Sparkles,
  Globe,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { WHY_CHOOSE_US } from '../data/contentData';

interface WhyNextSofthrProps {
  onOpenGetStarted: () => void;
}

export const WhyNextSofthr: React.FC<WhyNextSofthrProps> = ({ onOpenGetStarted }) => {
  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers':
        return <Layers className="w-6 h-6 text-[#0B3B73]" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-[#84CC16]" />;
      case 'Smile':
        return <Smile className="w-6 h-6 text-[#0B3B73]" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-[#84CC16]" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[#0B3B73]" />;
      case 'Globe':
        return <Globe className="w-6 h-6 text-[#84CC16]" />;
      default:
        return <Layers className="w-6 h-6 text-[#0B3B73]" />;
    }
  };

  return (
    <section id="why-choose-us" className="py-20 lg:py-28 bg-white border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-[#0B3B73]">
            <span className="w-2 h-2 rounded-full bg-[#84CC16]"></span>
            <span>Competitive Differentiators</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2540] tracking-tight">
            Why Businesses Choose NextSofthr
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Organizations choose NextSofthr when they outgrow disconnected tools and seek an
            enterprise-grade platform that understands local operational nuances and global ambition.
          </p>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_US.map((item, idx) => (
            <div
              key={item.title}
              className="bg-[#F8FAFC] border border-slate-200/80 hover:border-[#0B3B73]/40 rounded-2xl p-7 transition-all duration-300 hover:shadow-xl group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getFeatureIcon(item.icon)}
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#0A2540] mb-2.5 group-hover:text-[#0B3B73] transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200/60">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200/60">
                  <CheckCircle2 className="w-4 h-4 text-[#84CC16] shrink-0" />
                  <span>{item.benefit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA trigger */}
        <div className="mt-14 text-center">
          <button
            onClick={onOpenGetStarted}
            className="inline-flex items-center gap-2 bg-[#84CC16] hover:bg-[#74be12] text-[#0A2540] font-extrabold px-8 py-4 rounded-xl text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <span>Experience the NextSofthr Difference</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
