import React from 'react';
import {
  Users,
  Clock,
  CalendarCheck,
  Banknote,
  UserCheck,
  Building2,
  PieChart,
  Briefcase,
  Smartphone,
  ShieldCheck,
  Workflow,
  Check,
  ArrowRight
} from 'lucide-react';
import { ModuleItem } from '../data/termsData';
import { useLanguage } from '../i18n/LanguageContext';

interface ModulesGridProps {
  modules: ModuleItem[];
}

export const ModulesGrid: React.FC<ModulesGridProps> = ({ modules }) => {
  const { t } = useLanguage();

  const getIcon = (iconName: string) => {
    const props = { className: 'w-4 h-4' };
    switch (iconName) {
      case 'Users':
        return <Users {...props} />;
      case 'Clock':
        return <Clock {...props} />;
      case 'CalendarCheck':
        return <CalendarCheck {...props} />;
      case 'Banknote':
        return <Banknote {...props} />;
      case 'UserCheck':
        return <UserCheck {...props} />;
      case 'Building2':
        return <Building2 {...props} />;
      case 'PieChart':
        return <PieChart {...props} />;
      case 'Briefcase':
        return <Briefcase {...props} />;
      case 'Smartphone':
        return <Smartphone {...props} />;
      case 'ShieldCheck':
        return <ShieldCheck {...props} />;
      case 'Workflow':
        return <Workflow {...props} />;
      default:
        return <Users {...props} />;
    }
  };

  return (
    <div className="my-6">
      <div className="mb-4">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white">{t.modulesScopeTitle}</h4>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {t.modulesScopeSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
        {modules.map((mod) => (
          <div
            key={mod.id}
            className="flex flex-col justify-between bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-600 rounded-xl p-4 shadow-2xs hover:shadow-xs transition-all group"
          >
            <div>
              {/* Header with Icon */}
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {getIcon(mod.iconName)}
                </div>
                <h5 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                  {mod.title}
                </h5>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                {mod.description}
              </p>
            </div>

            {/* Feature Tags */}
            <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 space-y-1">
              {mod.features.map((feat) => (
                <div key={feat} className="flex items-center gap-1.5 text-[11px] text-slate-600 dark:text-slate-300">
                  <Check className="w-3 h-3 text-[#65a30d] dark:text-[#84cc16] shrink-0" />
                  <span className="truncate">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
