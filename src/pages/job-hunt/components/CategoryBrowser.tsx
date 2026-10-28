import React from 'react';
import { 
  Laptop, 
  Landmark, 
  Users, 
  TrendingUp, 
  Cpu, 
  Activity, 
  GraduationCap, 
  FileText, 
  Factory, 
  Truck, 
  Coffee, 
  Headphones, 
  ArrowRight,
  Briefcase
} from 'lucide-react';
import { JobCategory } from '../types';

interface CategoryBrowserProps {
  categories: JobCategory[];
  onSelectCategory: (categoryName: string) => void;
}

export const CategoryBrowser: React.FC<CategoryBrowserProps> = ({
  categories,
  onSelectCategory
}) => {
  // Icon mapper
  const renderIcon = (name: string) => {
    const props = { className: 'w-6 h-6' };
    switch (name) {
      case 'Laptop': return <Laptop {...props} />;
      case 'Landmark': return <Landmark {...props} />;
      case 'Users': return <Users {...props} />;
      case 'TrendingUp': return <TrendingUp {...props} />;
      case 'Cpu': return <Cpu {...props} />;
      case 'Activity': return <Activity {...props} />;
      case 'GraduationCap': return <GraduationCap {...props} />;
      case 'FileText': return <FileText {...props} />;
      case 'Factory': return <Factory {...props} />;
      case 'Truck': return <Truck {...props} />;
      case 'Coffee': return <Coffee {...props} />;
      case 'Headphones': return <Headphones {...props} />;
      default: return <Briefcase {...props} />;
    }
  };

  return (
    <section className="py-20 bg-white dark:bg-[#0B1120] border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] dark:text-lime-400">
              Industry Sectors
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142B4A] dark:text-white tracking-tight mt-1">
              Find Opportunities in Your Industry
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              Explore specialized job vacancies and corporate talent demands across primary growth sectors.
            </p>
          </div>

          <button
            onClick={() => onSelectCategory('')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563EB] dark:text-blue-400 hover:text-[#1D4ED8] dark:hover:text-lime-400 transition-colors whitespace-nowrap self-start sm:self-auto cursor-pointer"
          >
            <span>Browse All Sectors</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 12 Category Tiles Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.name)}
              className="group p-5 bg-slate-50 dark:bg-[#0F172A] hover:bg-white dark:hover:bg-[#131D31] rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-blue-300 dark:hover:border-lime-400/40 hover:shadow-md dark:hover:shadow-black/60 transition-all duration-300 text-left flex flex-col justify-between cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#131D31] group-hover:bg-blue-50 dark:group-hover:bg-lime-950/30 border border-slate-200/80 dark:border-slate-700 group-hover:border-blue-200 dark:group-hover:border-lime-400/40 flex items-center justify-center text-[#142B4A] dark:text-blue-400 group-hover:text-[#2563EB] dark:group-hover:text-lime-400 transition-colors mb-4 shadow-2xs">
                {renderIcon(cat.iconName)}
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#2563EB] dark:group-hover:text-lime-400 transition-colors line-clamp-1">
                  {cat.name}
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 block tabular-nums group-hover:dark:text-slate-300">
                  {cat.jobCount} Active Roles
                </span>
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
