import React, { useState } from 'react';
import { ListFilter, ChevronDown, ChevronRight, BookmarkCheck, Clock } from 'lucide-react';
import { Translations } from '../translations';
import { scrollToSection } from '../../../utils/scrollPanel';

// Scrollable panel that holds the policy document on desktop
export const POLICY_PANEL_ID = 'privacy-policy-content';

export interface TocEntry {
  id: string;
  number: string;
  key: keyof Translations['toc']['items'];
}

export const TOC_ENTRIES: TocEntry[] = [
  { id: 'introduction', number: '01', key: 'introduction' },
  { id: 'information-we-collect', number: '02', key: 'informationWeCollect' },
  { id: 'how-we-use-information', number: '03', key: 'howWeUseInformation' },
  { id: 'cookies-tracking', number: '04', key: 'cookiesTracking' },
  { id: 'data-sharing', number: '05', key: 'dataSharing' },
  { id: 'data-storage-security', number: '06', key: 'dataStorageSecurity' },
  { id: 'data-retention', number: '07', key: 'dataRetention' },
  { id: 'your-privacy-rights', number: '08', key: 'yourPrivacyRights' },
  { id: 'employee-customer-data', number: '09', key: 'employeeCustomerData' },
  { id: 'international-transfers', number: '10', key: 'internationalTransfers' },
  { id: 'third-party-services', number: '11', key: 'thirdPartyServices' },
  { id: 'childrens-privacy', number: '12', key: 'childrensPrivacy' },
  { id: 'marketing-communications', number: '13', key: 'marketingCommunications' },
  { id: 'ai-automated-processing', number: '14', key: 'aiAutomatedProcessing' },
  { id: 'changes-to-policy', number: '15', key: 'changesToPolicy' },
  { id: 'contact-us', number: '16', key: 'contactUs' },
];

interface TableOfContentsProps {
  activeId: string;
  onSelect: (id: string) => void;
  t: Translations;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  activeId,
  onSelect,
  t,
}) => {
  const [mobileExpanded, setMobileExpanded] = useState(false);

  const activeEntry =
    TOC_ENTRIES.find((item) => item.id === activeId) || TOC_ENTRIES[0];

  const handleLinkClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    onSelect(id);
    setMobileExpanded(false);

    scrollToSection(id, POLICY_PANEL_ID, 120); // 120px accounts for sticky header on mobile
  };

  return (
    <>
      {/* MOBILE COLLAPSIBLE DROPDOWN */}
      <div id="mobile-toc-bar" className="lg:hidden sticky top-18 z-30 bg-white dark:bg-[#090e1a] border-b border-slate-200 dark:border-slate-800 px-4 py-3 shadow-2xs transition-colors">
        <button
          onClick={() => setMobileExpanded(!mobileExpanded)}
          className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-[#0c1527] border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-expanded={mobileExpanded}
          aria-label="Table of Contents menu"
        >
          <div className="flex items-center gap-2 truncate">
            <ListFilter className="w-4 h-4 text-[#0F52BA] dark:text-[#60A5FA] shrink-0" />
            <span className="text-slate-500 dark:text-slate-400 font-normal">
              {t.toc.section} {activeEntry.number}:
            </span>
            <span className="truncate text-slate-900 dark:text-white font-semibold">
              {t.toc.items[activeEntry.key]}
            </span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0 transition-transform duration-200 ${
              mobileExpanded ? 'rotate-180' : ''
            }`}
          />
        </button>

        {mobileExpanded && (
          <div className="mt-2 max-h-80 overflow-y-auto rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1527] shadow-lg p-2 space-y-1">
            {TOC_ENTRIES.map((entry) => {
              const isActive = entry.id === activeId;
              const title = t.toc.items[entry.key];
              return (
                <button
                  key={entry.id}
                  onClick={(e) => handleLinkClick(entry.id, e)}
                  className={`w-full text-left px-3 py-2 rounded-md text-xs font-medium flex items-center justify-between transition-colors ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-950/40 text-[#0F52BA] dark:text-[#60A5FA] font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2 truncate">
                    <span
                      className={`text-[10px] font-mono ${
                        isActive ? 'text-[#0F52BA] dark:text-[#60A5FA]' : 'text-slate-400 dark:text-slate-500'
                      }`}
                    >
                      {entry.number}.
                    </span>
                    <span className="truncate">{title}</span>
                  </span>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-[#0F52BA] dark:text-[#60A5FA]" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* DESKTOP STICKY SIDEBAR */}
      <aside
        id="table-of-contents-sidebar"
        aria-label="Privacy Policy Table of Contents"
        className="hidden lg:flex lg:flex-col h-full w-full bg-white dark:bg-[#0c1527] rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-2xs transition-colors duration-200"
      >
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-2">
            <BookmarkCheck className="w-4 h-4 text-[#0F52BA] dark:text-[#60A5FA]" />
            <h2 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {t.toc.title}
            </h2>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
            <Clock className="w-3 h-3 text-slate-400 dark:text-slate-500" />
            <span>{t.toc.readTime}</span>
          </div>
        </div>

        <nav className="mt-3 space-y-0.5 flex-1 min-h-0 overflow-y-auto no-scrollbar">
          {TOC_ENTRIES.map((entry) => {
            const isActive = entry.id === activeId;
            const title = t.toc.items[entry.key];
            return (
              <a
                key={entry.id}
                href={`#${entry.id}`}
                onClick={(e) => handleLinkClick(entry.id, e)}
                className={`group flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all relative ${
                  isActive
                    ? 'bg-blue-50/90 dark:bg-blue-950/40 text-[#0F52BA] dark:text-[#60A5FA] font-semibold border-l-3 border-[#84CC16] pl-2.5'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span
                    className={`font-mono text-[11px] ${
                      isActive ? 'text-[#0F52BA] dark:text-[#60A5FA] font-bold' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300'
                    }`}
                  >
                    {entry.number}
                  </span>
                  <span className="truncate">{title}</span>
                </div>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16] shrink-0" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Sidebar Help Card */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80">
          <div className="p-3 bg-slate-50 dark:bg-[#080d19] rounded-lg border border-slate-200/80 dark:border-slate-800">
            <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200">
              {t.toc.needAssistance}
            </div>
            <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
              {t.toc.assistanceText}
            </p>
            <a
              href="#contact-us"
              onClick={(e) => handleLinkClick('contact-us', e)}
              className="mt-2 inline-flex items-center text-[11px] font-semibold text-[#0F52BA] dark:text-[#60A5FA] hover:underline"
            >
              {t.toc.contactTeam}
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};
