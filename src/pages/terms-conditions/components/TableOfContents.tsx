import React, { useState, useEffect } from 'react';
import {
  List,
  ChevronDown,
  ChevronUp,
  Search,
  ArrowUp,
  CheckCircle,
  FileCheck2,
  Layers,
  CreditCard,
  Lock,
  Scale
} from 'lucide-react';
import { TermSection } from '../data/termsData';
import { useLanguage } from '../i18n/LanguageContext';

// Scrollable panel that holds the terms document on desktop
export const TERMS_PANEL_ID = 'terms-conditions-content';

interface TableOfContentsProps {
  sections: TermSection[];
  activeId: string;
  onSelectSection: (id: string) => void;
  scrollProgress: number;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  sections,
  activeId,
  onSelectSection,
  scrollProgress
}) => {
  const { t } = useLanguage();
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const [filterText, setFilterText] = useState('');

  const filteredSections = sections.filter((sec) =>
    sec.title.toLowerCase().includes(filterText.toLowerCase()) ||
    sec.sectionNumber.includes(filterText) ||
    sec.category.toLowerCase().includes(filterText.toLowerCase())
  );

  const activeSection = sections.find((s) => s.id === activeId) || sections[0];

  const categoryIcons: Record<string, React.ReactNode> = {
    General: <FileCheck2 className="w-3.5 h-3.5" />,
    Modules: <Layers className="w-3.5 h-3.5" />,
    Commercial: <CreditCard className="w-3.5 h-3.5" />,
    'Data & Security': <Lock className="w-3.5 h-3.5" />,
    'Legal & Compliance': <Scale className="w-3.5 h-3.5" />
  };

  return (
    <>
      {/* Mobile Sticky Section Header Bar */}
      <div className="lg:hidden sticky top-[65px] z-30 bg-white/95 dark:bg-[#0a0f1d]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-2.5 shadow-xs no-print transition-colors">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setMobileExpanded(!mobileExpanded)}
            className="flex-1 flex items-center justify-between text-left py-1 px-3 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-800 dark:text-slate-200 transition"
            aria-expanded={mobileExpanded}
          >
            <div className="flex items-center gap-2 truncate">
              <span className="font-bold text-blue-600 dark:text-blue-400">{activeSection?.sectionNumber}</span>
              <span className="truncate">{activeSection?.title}</span>
            </div>
            {mobileExpanded ? (
              <ChevronUp className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0 ml-1" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0 ml-1" />
            )}
          </button>

          {/* Quick Progress indicator */}
          <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 shrink-0">
            {Math.round(scrollProgress)}%
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileExpanded && (
          <div className="mt-2 p-2 max-h-72 overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg space-y-1">
            <div className="p-1.5 pb-2">
              <input
                type="text"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                placeholder={t.filterSections}
                className="w-full text-xs px-2.5 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-md text-slate-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-blue-600"
              />
            </div>
            {filteredSections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => {
                  onSelectSection(section.id);
                  setMobileExpanded(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                  activeId === section.id
                    ? 'bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <span className="truncate">
                  <span className="text-slate-400 dark:text-slate-500 mr-2 font-mono">{section.sectionNumber}</span>
                  {section.title}
                </span>
                {activeId === section.id && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#84cc16] shrink-0" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Sticky Sidebar Navigation */}
      <aside className="hidden lg:block self-stretch z-20 w-72 xl:w-80 shrink-0 no-print" aria-label="Table of contents">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs p-4 overflow-hidden transition-colors h-full flex flex-col">
          
          {/* Header & Reading Progress */}
          <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <List className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  {t.onThisPage}
                </h2>
              </div>
              <span className="text-[11px] font-mono font-medium text-slate-500 dark:text-slate-400">
                {Math.round(scrollProgress)}{t.readProgress}
              </span>
            </div>

            {/* Reading progress bar */}
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-[#84cc16] transition-all duration-150 ease-out"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
          </div>

          {/* Quick filter in TOC */}
          <div className="my-2.5">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
              <input
                type="text"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                placeholder={t.filterSections}
                className="w-full pl-8 pr-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:ring-1 focus:ring-blue-600 focus:bg-white dark:focus:bg-slate-950"
              />
            </div>
          </div>

          {/* Nav List with Smooth Scrolling and active highlights */}
          <nav
            className="flex-1 min-h-0 overflow-y-auto no-scrollbar space-y-0.5"
            aria-label="Table of contents links"
          >
            {filteredSections.length === 0 ? (
              <p className="text-xs text-slate-400 dark:text-slate-500 text-center py-4">{t.noMatchingSections}</p>
            ) : (
              filteredSections.map((sec) => {
                const isActive = activeId === sec.id;
                return (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectSection(sec.id);
                    }}
                    className={`group flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-all ${
                      isActive
                        ? 'bg-blue-50/90 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold border-l-2 border-blue-600 dark:border-blue-400 pl-2'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span
                        className={`font-mono text-[11px] shrink-0 ${
                          isActive ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-400 dark:text-slate-500'
                        }`}
                      >
                        {sec.sectionNumber}
                      </span>
                      <span className="truncate group-hover:translate-x-0.5 transition-transform">
                        {sec.title}
                      </span>
                    </div>

                    {isActive && (
                      <span
                        className="w-2 h-2 rounded-full bg-[#84cc16] shrink-0 ml-1.5 drop-shadow-xs"
                        aria-hidden="true"
                      />
                    )}
                  </a>
                );
              })
            )}
          </nav>

          {/* Footer of TOC: Quick actions */}
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span>{t.totalClauses}</span>
            <button
              type="button"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1 font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors cursor-pointer"
            >
              <ArrowUp className="w-3 h-3" />
              <span>{t.backToTop}</span>
            </button>
          </div>

        </div>
      </aside>
    </>
  );
};
