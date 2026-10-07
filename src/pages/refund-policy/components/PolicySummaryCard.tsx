import React, { useState } from 'react';
import { Users, Store, Network, Handshake, Share2, ArrowRight, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { SupportedLanguage, TRANSLATIONS } from '../data/translations';

type PolicyCategory = 'Customers' | 'Resellers' | 'Distributors' | 'Partners' | 'Affiliates';

interface PolicySummaryCardProps {
  currentLang?: SupportedLanguage;
}

export const PolicySummaryCard: React.FC<PolicySummaryCardProps> = ({ currentLang = 'en' }) => {
  const [activeCategory, setActiveCategory] = useState<PolicyCategory>('Customers');
  const t = TRANSLATIONS[currentLang];
  const catData = t.summaryCard.categories[activeCategory];

  const categoryList: { key: PolicyCategory; label: string; icon: React.FC<{ className?: string }> }[] = [
    { key: 'Customers', label: currentLang === 'fr' ? 'Clients' : currentLang === 'pt' ? 'Clientes' : currentLang === 'es' ? 'Clientes' : 'Customers', icon: Users },
    { key: 'Resellers', label: currentLang === 'fr' ? 'Revendeurs' : currentLang === 'pt' ? 'Revendedores' : currentLang === 'es' ? 'Distribuidores' : 'Resellers', icon: Store },
    { key: 'Distributors', label: currentLang === 'fr' ? 'Grossistes' : currentLang === 'pt' ? 'Distribuidores' : currentLang === 'es' ? 'Mayoristas' : 'Distributors', icon: Network },
    { key: 'Partners', label: currentLang === 'fr' ? 'Partenaires' : currentLang === 'pt' ? 'Parceiros' : currentLang === 'es' ? 'Socios' : 'Partners', icon: Handshake },
    { key: 'Affiliates', label: currentLang === 'fr' ? 'Affiliés' : currentLang === 'pt' ? 'Afiliados' : currentLang === 'es' ? 'Afiliados' : 'Affiliates', icon: Share2 },
  ];

  const keySectionsMap: Record<PolicyCategory, { id: string; number: number; title: string }[]> = {
    Customers: [
      { id: 'section-2', number: 2, title: currentLang === 'fr' ? 'Remboursements Abonnements' : currentLang === 'pt' ? 'Reembolsos de Assinaturas' : currentLang === 'es' ? 'Reembolsos de Suscripciones' : 'Customer Subscription Refunds' },
      { id: 'section-3', number: 3, title: currentLang === 'fr' ? 'Période d\'Essai Gratuit' : currentLang === 'pt' ? 'Política de Teste Gratuito' : currentLang === 'es' ? 'Política de Prueba Gratuita' : 'Free Trial Policy' },
      { id: 'section-4', number: 4, title: currentLang === 'fr' ? 'Critères d\'Éligibilité' : currentLang === 'pt' ? 'Critérios de Elegibilidade' : currentLang === 'es' ? 'Criterios de Elegibilidad' : 'Refund Eligibility Criteria' },
      { id: 'section-6', number: 6, title: currentLang === 'fr' ? 'Procédure d\'Annulation (6 Étapes)' : currentLang === 'pt' ? 'Procedimento de Cancelamento (6 Passos)' : currentLang === 'es' ? 'Procedimiento de Cancelación (6 Pasos)' : 'Cancellation Policy (6 Steps)' },
      { id: 'section-8', number: 8, title: currentLang === 'fr' ? 'Modules Complémentaires' : currentLang === 'pt' ? 'Módulos Adicionais' : currentLang === 'es' ? 'Módulos Adicionales' : 'Add-On Module Refunds' },
      { id: 'section-17', number: 17, title: currentLang === 'fr' ? 'Demander un Remboursement' : currentLang === 'pt' ? 'Como Pedir um Reembolso' : currentLang === 'es' ? 'Cómo Solicitar un Reembolso' : 'How to Request a Refund' },
    ],
    Resellers: [
      { id: 'section-11', number: 11, title: currentLang === 'fr' ? 'Politique Revendeurs (VAR)' : currentLang === 'pt' ? 'Política de Revenda' : currentLang === 'es' ? 'Política para Distribuidores' : 'Reseller Refund Policy' },
      { id: 'section-14', number: 14, title: currentLang === 'fr' ? 'Annulation de Commissions' : currentLang === 'pt' ? 'Reversão de Comissões' : currentLang === 'es' ? 'Reversión de Comisiones' : 'Commission Reversals & Clawbacks' },
      { id: 'section-16', number: 16, title: currentLang === 'fr' ? 'Modalités de Règlement' : currentLang === 'pt' ? 'Método de Reembolso e Liquidação' : currentLang === 'es' ? 'Método y Plazo de Reembolso' : 'Refund Method & Settlement' },
      { id: 'section-18', number: 18, title: currentLang === 'fr' ? 'Circuit Partenaires' : currentLang === 'pt' ? 'Processo de Parceiros' : currentLang === 'es' ? 'Trámite de Socios' : 'Partner Refund Request Process' },
    ],
    Distributors: [
      { id: 'section-12', number: 12, title: currentLang === 'fr' ? 'Politique Distributeurs Grossistes' : currentLang === 'pt' ? 'Política de Distribuidores' : currentLang === 'es' ? 'Política para Mayoristas' : 'Distributor Refund Policy' },
      { id: 'section-14', number: 14, title: currentLang === 'fr' ? 'Annulation de Commissions' : currentLang === 'pt' ? 'Reversão de Comissões' : currentLang === 'es' ? 'Reversión de Comisiones' : 'Commission Reversals' },
      { id: 'section-18', number: 18, title: currentLang === 'fr' ? 'Circuit Partenaires' : currentLang === 'pt' ? 'Processo de Parceiros' : currentLang === 'es' ? 'Trámite de Socios' : 'Partner Refund Request Process' },
      { id: 'section-25', number: 25, title: currentLang === 'fr' ? 'Hiérarchie Contractuelle' : currentLang === 'pt' ? 'Hierarquia de Contratos' : currentLang === 'es' ? 'Jerarquía de Contratos' : 'Governing Contract Hierarchy' },
    ],
    Partners: [
      { id: 'section-13', number: 13, title: currentLang === 'fr' ? 'Politique Partenaires & Conseil' : currentLang === 'pt' ? 'Termos de Parceiros e Consultoria' : currentLang === 'es' ? 'Política para Socios y Consultores' : 'Partner & Affiliate Policy' },
      { id: 'section-14', number: 14, title: currentLang === 'fr' ? 'Annulation de Commissions' : currentLang === 'pt' ? 'Reversão de Comissões' : currentLang === 'es' ? 'Reversión de Comisiones' : 'Commission Reversals' },
      { id: 'section-18', number: 18, title: currentLang === 'fr' ? 'Circuit Partenaires' : currentLang === 'pt' ? 'Processo de Parceiros' : currentLang === 'es' ? 'Trámite de Socios' : 'Partner Refund Workflow' },
      { id: 'section-25', number: 25, title: currentLang === 'fr' ? 'Hiérarchie Contractuelle' : currentLang === 'pt' ? 'Hierarquia Contratual' : currentLang === 'es' ? 'Jerarquía Legal' : 'Governing Agreement Precedence' },
    ],
    Affiliates: [
      { id: 'section-13', number: 13, title: currentLang === 'fr' ? 'Conditions d\'Affiliation' : currentLang === 'pt' ? 'Termos de Afiliados' : currentLang === 'es' ? 'Términos para Afiliados' : 'Partner & Affiliate Terms' },
      { id: 'section-14', number: 14, title: currentLang === 'fr' ? 'Annulation de Commissions' : currentLang === 'pt' ? 'Reversão de Comissões' : currentLang === 'es' ? 'Reversión de Comisiones' : 'Commission Reversals' },
      { id: 'section-18', number: 18, title: currentLang === 'fr' ? 'Circuit Partenaires' : currentLang === 'pt' ? 'Processo de Parceiros' : currentLang === 'es' ? 'Trámite de Socios' : 'Channel Dispute Resolution' },
      { id: 'section-20', number: 20, title: currentLang === 'fr' ? 'Règles Anti-Fraude & Abus' : currentLang === 'pt' ? 'Fraude e Utilização Abusiva' : currentLang === 'es' ? 'Prevención de Fraude y Abuso' : 'Fraud, Abuse & Misuse Rules' },
    ],
  };

  return (
    <div id="policy-summary" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-12 relative z-10">
      <div className="bg-white dark:bg-[#131D31] rounded-2xl shadow-lg border border-slate-200/90 dark:border-slate-800 overflow-hidden transition-colors duration-200">
        {/* Top Interactive Selector Tabs */}
        <div className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-[#0F172A] px-4 sm:px-6 pt-3">
          <div className="flex items-center justify-between pb-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {t.summaryCard.header}
            </span>
            <span className="hidden sm:inline-block text-[11px] text-[#0A3B7B] dark:text-[#38BDF8] font-semibold">
              {t.summaryCard.subHeader}
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-3 no-scrollbar">
            {categoryList.map((item) => {
              const Icon = item.icon;
              const isActive = activeCategory === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setActiveCategory(item.key)}
                  className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-[#0A3B7B] dark:bg-[#1E40AF] text-white shadow-sm'
                      : 'bg-white dark:bg-[#1E293B] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/70 dark:border-slate-700'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#84CC16]' : 'text-slate-400 dark:text-slate-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Category Content Card */}
        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 7 Cols: Category Highlights */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#0A3B7B] dark:text-[#38BDF8] tracking-wide uppercase">
                  {catData.badge}
                </span>
                <span className="text-slate-300 dark:text-slate-600">·</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {currentLang === 'fr' ? 'Directives Commerciales' : currentLang === 'pt' ? 'Diretrizes Comerciais' : currentLang === 'es' ? 'Pautas Comerciales' : 'Commercial Guidelines'}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-[#0A3B7B] dark:text-white tracking-tight">
                {catData.title}
              </h2>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {catData.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 bg-slate-50 dark:bg-[#0F172A] rounded-xl border border-slate-200/70 dark:border-slate-800">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                    <Clock className="w-3.5 h-3.5 text-[#0A3B7B] dark:text-[#38BDF8]" />
                    <span>{t.summaryCard.refundWindow}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {catData.refundWindow}
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 dark:bg-[#0F172A] rounded-xl border border-slate-200/70 dark:border-slate-800">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#84CC16]" />
                    <span>{t.summaryCard.cancellationProcedure}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {catData.cancellationRule}
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-amber-50/70 dark:bg-amber-950/30 rounded-xl border border-amber-200/80 dark:border-amber-900/50">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 dark:text-amber-200 mb-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>{t.summaryCard.financialNotice}</span>
                </div>
                <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                  {catData.financialImpact}
                </p>
              </div>
            </div>

            {/* Right 5 Cols: Quick Jump Links to Specific Sections */}
            <div className="lg:col-span-5 bg-slate-50/90 dark:bg-[#0F172A] rounded-xl p-5 border border-slate-200 dark:border-slate-800">
              <div className="text-xs font-bold uppercase tracking-wider text-[#0A3B7B] dark:text-[#38BDF8] mb-3 flex items-center justify-between">
                <span>{t.summaryCard.governingClauses}</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">{t.summaryCard.directJump}</span>
              </div>

              <div className="space-y-2">
                {keySectionsMap[activeCategory].map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="group flex items-center justify-between p-2.5 bg-white dark:bg-[#131D31] hover:bg-slate-100/90 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200 hover:text-[#0A3B7B] dark:hover:text-[#38BDF8] transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-slate-100 dark:bg-[#1E293B] text-slate-600 dark:text-slate-300 font-mono text-[10px] font-bold group-hover:bg-[#0A3B7B] dark:group-hover:bg-[#38BDF8] group-hover:text-white dark:group-hover:text-slate-900 transition-colors">
                        {sec.number}
                      </span>
                      <span className="font-semibold">{sec.title}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#84CC16] group-hover:translate-x-0.5 transition-all" />
                  </a>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-center">
                <a
                  href="#overview"
                  className="text-xs font-bold text-[#0A3B7B] dark:text-[#38BDF8] hover:text-[#1E40AF] dark:hover:text-[#60A5FA] inline-flex items-center gap-1"
                >
                  <span>{t.summaryCard.readFullPolicy}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
