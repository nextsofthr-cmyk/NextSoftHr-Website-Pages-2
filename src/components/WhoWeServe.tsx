import React, { useState } from 'react';
import {
  Store,
  Briefcase,
  Building,
  Landmark,
  Rocket,
  Globe2,
  FileText,
  ShoppingBag,
  Laptop,
  Coins,
  Factory,
  Hotel,
  Truck,
  Stethoscope,
  GraduationCap,
  HandHeart,
  Search,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { WHO_WE_SERVE_LIST } from '../data/contentData';

interface WhoWeServeProps {
  onOpenDemo: (segmentName?: string) => void;
}

export const WhoWeServe: React.FC<WhoWeServeProps> = ({ onOpenDemo }) => {
  const [filter, setFilter] = useState<'all' | 'size' | 'industry'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getIndustryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Store':
        return <Store className="w-5 h-5 text-[#0B3B73]" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-[#0B3B73]" />;
      case 'Building':
        return <Building className="w-5 h-5 text-[#0B3B73]" />;
      case 'Landmark':
        return <Landmark className="w-5 h-5 text-[#0B3B73]" />;
      case 'Rocket':
        return <Rocket className="w-5 h-5 text-[#84CC16]" />;
      case 'Globe2':
        return <Globe2 className="w-5 h-5 text-[#0B3B73]" />;
      case 'FileText':
        return <FileText className="w-5 h-5 text-[#0B3B73]" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-5 h-5 text-[#0B3B73]" />;
      case 'Laptop':
        return <Laptop className="w-5 h-5 text-[#84CC16]" />;
      case 'Coins':
        return <Coins className="w-5 h-5 text-[#0B3B73]" />;
      case 'Factory':
        return <Factory className="w-5 h-5 text-[#0B3B73]" />;
      case 'Hotel':
        return <Hotel className="w-5 h-5 text-[#0B3B73]" />;
      case 'Truck':
        return <Truck className="w-5 h-5 text-[#0B3B73]" />;
      case 'Stethoscope':
        return <Stethoscope className="w-5 h-5 text-[#84CC16]" />;
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-[#0B3B73]" />;
      case 'HandHeart':
        return <HandHeart className="w-5 h-5 text-[#84CC16]" />;
      default:
        return <Briefcase className="w-5 h-5 text-[#0B3B73]" />;
    }
  };

  const filteredItems = WHO_WE_SERVE_LIST.filter((item) => {
    const matchesFilter = filter === 'all' || item.category === filter;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section id="who-we-serve" className="py-20 lg:py-28 bg-[#F8FAFC] border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-[#0B3B73]">
            <span className="w-2 h-2 rounded-full bg-[#84CC16]"></span>
            <span>Versatile Across Sectors & Scales</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2540] tracking-tight">
            Designed for Businesses of Every Size
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            From sole entrepreneurs employing their first 3 staff members to regional
            conglomerates with 5,000 workers across Africa and global offices.
          </p>
        </div>

        {/* Controls: Category Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
          {/* Tab Filters */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-[#0B3B73] text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              All Sectors & Sizes (16)
            </button>
            <button
              onClick={() => setFilter('size')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filter === 'size'
                  ? 'bg-[#0B3B73] text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              By Organization Size (6)
            </button>
            <button
              onClick={() => setFilter('industry')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filter === 'industry'
                  ? 'bg-[#0B3B73] text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              By Industry Vertical (10)
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search your business type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0B3B73] focus:bg-white"
            />
          </div>
        </div>

        {/* 16-Card Industry & Size Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200/80 hover:border-[#0B3B73]/40 rounded-2xl p-5 transition-all duration-300 hover:shadow-lg flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getIndustryIcon(item.iconName)}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    {item.highlight}
                  </span>
                </div>

                <h3 className="font-bold text-base text-[#0A2540] mb-2 group-hover:text-[#0B3B73] transition-colors">
                  {item.name}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] font-semibold text-slate-500">
                  {item.category === 'size' ? 'Workforce Tier' : 'Industry Vertical'}
                </span>
                <button
                  onClick={() => onOpenDemo(item.name)}
                  className="text-[#0B3B73] hover:text-[#0A2540] font-bold inline-flex items-center gap-1 group-hover:underline cursor-pointer text-xs"
                >
                  <span>See Solution</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#84CC16]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
