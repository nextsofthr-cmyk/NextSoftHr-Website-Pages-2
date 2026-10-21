import React, { useState } from 'react';
import { 
  Building2, 
  ArrowRight, 
  ChevronRight, 
  Users, 
  MapPin, 
  Briefcase, 
  ShieldCheck, 
  Layers, 
  Check
} from 'lucide-react';
import { NavigationPage } from '../../types';
import { SolutionNavigationFooter } from '../layout/SolutionNavigationFooter';

interface EnterpriseHierarchyProps {
  onOpenLeadModal: (service?: string) => void;
  onNavigate?: (page: NavigationPage) => void;
  onBack?: () => void;
}

export const EnterpriseHierarchy: React.FC<EnterpriseHierarchyProps> = ({ 
  onOpenLeadModal,
  onNavigate,
  onBack
}) => {
  const [selectedGroup, setSelectedGroup] = useState('Atlas Group International');
  const [selectedCompany, setSelectedCompany] = useState('Atlas FinTech Nigeria Ltd');
  const [selectedBranch, setSelectedBranch] = useState('Lagos Tech Center (VI)');
  const [selectedDept, setSelectedDept] = useState('Cloud Infrastructure & DevOps');

  const groups = [
    {
      name: 'Atlas Group International',
      companies: [
        {
          name: 'Atlas FinTech Nigeria Ltd',
          branches: [
            {
              name: 'Lagos Tech Center (VI)',
              departments: ['Cloud Infrastructure & DevOps', 'Product Management', 'Compliance & Risk'],
              headcount: 142
            },
            {
              name: 'Abuja Government Liaison Office',
              departments: ['Public Sector Growth', 'Regulatory Affairs'],
              headcount: 24
            }
          ]
        },
        {
          name: 'Atlas Digital Kenya Ltd',
          branches: [
            {
              name: 'Nairobi Innovation Hub',
              departments: ['East Africa Growth', 'Payment Engineering', 'Customer Success'],
              headcount: 86
            }
          ]
        },
        {
          name: 'Atlas Logistics Ghana Ltd',
          branches: [
            {
              name: 'Accra Port Operations',
              departments: ['Fleet Operations', 'Maritime Logistics'],
              headcount: 62
            }
          ]
        }
      ]
    }
  ];

  const currentGroup = groups[0];
  const currentCompany = currentGroup.companies.find(c => c.name === selectedCompany) || currentGroup.companies[0];
  const currentBranch = currentCompany.branches.find(b => b.name === selectedBranch) || currentCompany.branches[0];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0A1E4A] via-[#0F2D6B] to-[#0A1E4A] text-white pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-lime-400 uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>Multi-Company & Entity Governance</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            “One Workforce Platform. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 to-emerald-400">
              Multiple Businesses.”
            </span>
          </h1>

          <p className="text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Manage parent companies, regional subsidiaries, branches, and cost centers from a single unified outsourcing control center. Segregate data and payroll policies while keeping group-level reporting.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenLeadModal('Enterprise Multi-Company')}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-lime-400 to-[#9AE616] hover:from-lime-300 hover:to-lime-400 text-slate-950 font-bold text-base rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <span>Scope Your Multi-Entity Structure</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>
      </section>

      {/* Enterprise Organization Selector: Group -> Company -> Branch -> Department -> Employee */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Hierarchy Simulator</span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Enterprise Organization Navigator
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto">
            Experience how NextSofthr lets conglomerate executives drill down from Holding Group to subsidiary branches and teams in seconds.
          </p>
        </div>

        {/* Step-by-step breadcrumb selector */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-500 uppercase tracking-wider text-[11px]">Level:</span>
            <span className="px-2.5 py-1 bg-[#0F2D6B] text-white rounded-lg">{selectedGroup}</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <span className="px-2.5 py-1 bg-blue-100 text-blue-900 rounded-lg">{selectedCompany}</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <span className="px-2.5 py-1 bg-lime-100 text-lime-900 rounded-lg">{selectedBranch}</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <span className="px-2.5 py-1 bg-purple-100 text-purple-900 rounded-lg">{selectedDept}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1: Select Subsidiary */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-900 uppercase">1. Subsidiary Entities</span>
              <div className="space-y-2">
                {currentGroup.companies.map(comp => (
                  <button
                    key={comp.name}
                    onClick={() => {
                      setSelectedCompany(comp.name);
                      setSelectedBranch(comp.branches[0].name);
                      setSelectedDept(comp.branches[0].departments[0]);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all ${
                      selectedCompany === comp.name
                        ? 'bg-blue-50 border-blue-600 font-bold text-blue-900 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-bold text-sm">{comp.name}</div>
                    <div className="text-slate-500 mt-1">{comp.branches.length} Operating Branches</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Select Branch / Office */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-900 uppercase">2. Branches & Locations</span>
              <div className="space-y-2">
                {currentCompany.branches.map(branch => (
                  <button
                    key={branch.name}
                    onClick={() => {
                      setSelectedBranch(branch.name);
                      setSelectedDept(branch.departments[0]);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all ${
                      selectedBranch === branch.name
                        ? 'bg-lime-50 border-lime-600 font-bold text-slate-900 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-bold text-sm">{branch.name}</div>
                    <div className="text-slate-500 mt-1">{branch.headcount} Team Members</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Select Department */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-900 uppercase">3. Functional Departments</span>
              <div className="space-y-2">
                {currentBranch.departments.map(dept => (
                  <button
                    key={dept}
                    onClick={() => setSelectedDept(dept)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all ${
                      selectedDept === dept
                        ? 'bg-purple-50 border-purple-600 font-bold text-purple-900 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-bold text-sm">{dept}</div>
                    <div className="text-slate-500 mt-1">Cost Center: CC-{(dept.length * 14).toString().padStart(4, '0')}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Other Outsourcing Solutions & Return Home */}
      {onNavigate && (
        <SolutionNavigationFooter
          currentSolutionId="multi-company"
          onNavigate={onNavigate}
          onOpenLeadModal={onOpenLeadModal}
        />
      )}
    </div>
  );
};
