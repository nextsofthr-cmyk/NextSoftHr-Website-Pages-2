import React, { useState } from 'react';
import { PortalType } from '../../types';
import { EmployeePortal } from './EmployeePortal';
import { ManagerPortal } from './ManagerPortal';
import { ClientPortal } from './ClientPortal';
import { AdminOpsConsole } from './AdminOpsConsole';
import { Building2, User, Users, Cpu, ArrowLeft } from 'lucide-react';
import { ThemeToggle } from '../layout/ThemeToggle';
import { CurrencySelector } from '../layout/CurrencySelector';

interface PortalContainerProps {
  initialPortal?: PortalType;
  onBackToSite: () => void;
}

export const PortalContainer: React.FC<PortalContainerProps> = ({
  initialPortal = 'client-admin',
  onBackToSite
}) => {
  const [activePortal, setActivePortal] = useState<PortalType>(initialPortal);

  return (
    <div className="min-h-screen bg-slate-100/70 dark:bg-[#050E24] pb-20 pt-6 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      {/* Top Portal Switcher Bar */}
      <div className="max-w-7xl mx-auto mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-[#0B1A3D] p-3 sm:p-4 rounded-2xl border border-slate-200 dark:border-blue-900/50 shadow-sm transition-colors">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToSite}
            className="p-2 hover:bg-slate-100 dark:hover:bg-blue-950/60 rounded-xl text-slate-600 dark:text-slate-300 transition-colors flex items-center gap-1.5 text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Website</span>
          </button>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Live Portal Environment
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Controls: Currency & Theme */}
          <div className="flex items-center gap-2">
            <CurrencySelector variant="light" />
            <ThemeToggle variant="standard" />
          </div>

          {/* 4 Interactive Portal Switchers */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-[#06112C] rounded-xl overflow-x-auto text-xs font-bold border dark:border-blue-900/40">
            <button
              onClick={() => setActivePortal('client-admin')}
              className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activePortal === 'client-admin'
                  ? 'bg-[#0F2D6B] dark:bg-lime-400 text-white dark:text-slate-950 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Client Admin</span>
            </button>

            <button
              onClick={() => setActivePortal('employee-ess')}
              className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activePortal === 'employee-ess'
                  ? 'bg-[#0F2D6B] dark:bg-lime-400 text-white dark:text-slate-950 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Employee (ESS)</span>
            </button>

            <button
              onClick={() => setActivePortal('manager-mss')}
              className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activePortal === 'manager-mss'
                  ? 'bg-[#0F2D6B] dark:bg-lime-400 text-white dark:text-slate-950 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Manager (MSS)</span>
            </button>

            <button
              onClick={() => setActivePortal('outsourcing-specialist')}
              className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activePortal === 'outsourcing-specialist'
                  ? 'bg-[#0F2D6B] dark:bg-lime-400 text-white dark:text-slate-950 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Ops Console</span>
            </button>
          </div>
        </div>
      </div>

      {/* Active Portal Renderer */}
      {activePortal === 'client-admin' && <ClientPortal />}
      {activePortal === 'employee-ess' && <EmployeePortal />}
      {activePortal === 'manager-mss' && <ManagerPortal />}
      {activePortal === 'outsourcing-specialist' && <AdminOpsConsole />}
    </div>
  );
};
