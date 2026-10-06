import React, { useState, useMemo } from 'react';
import { Search, Copy, Check, ArrowRight, BookOpen, ExternalLink, Filter } from 'lucide-react';
import { SCHEDULE_SECTIONS, SCHEDULE_METADATA, CHAPTERS, ScheduleSection } from '../data/scheduleData';

interface ScheduleViewerProps {
  onNavigateTab: (tab: 'calculator' | 'statements' | 'leads' | 'execution' | 'disputes') => void;
  targetSectionId?: number | null;
}

export const ScheduleViewer: React.FC<ScheduleViewerProps> = ({ onNavigateTab, targetSectionId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChapter, setSelectedChapter] = useState<string>('All Chapters');
  const [expandedSections, setExpandedSections] = useState<Record<number, boolean>>({});
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // Auto-scroll to target section if provided
  React.useEffect(() => {
    if (targetSectionId) {
      const el = document.getElementById(`section-${targetSectionId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setExpandedSections(prev => ({ ...prev, [targetSectionId]: true }));
      }
    }
  }, [targetSectionId]);

  const filteredSections = useMemo(() => {
    return SCHEDULE_SECTIONS.filter((sec) => {
      const matchesChapter = selectedChapter === 'All Chapters' || sec.chapter === selectedChapter;
      if (!matchesChapter) return false;

      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      const inTitle = sec.title.toLowerCase().includes(query);
      const inSummary = sec.summary.toLowerCase().includes(query);
      const inContent = sec.content.some((c) => c.toLowerCase().includes(query));
      const inId = sec.id.toString() === query || `section ${sec.id}`.includes(query);
      return inTitle || inSummary || inContent || inId;
    });
  }, [searchQuery, selectedChapter]);

  const handleCopySection = (sec: ScheduleSection) => {
    const textToCopy = `NEXTSOFTHR SCHEDULE B - SECTION ${sec.id}: ${sec.title}\n\nSummary:\n${sec.summary}\n\n${sec.content.join('\n\n')}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(sec.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleSection = (id: number) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const expandAll = () => {
    const allExpanded: Record<number, boolean> = {};
    SCHEDULE_SECTIONS.forEach((s) => {
      allExpanded[s.id] = true;
    });
    setExpandedSections(allExpanded);
  };

  const collapseAll = () => {
    setExpandedSections({});
  };

  return (
    <div className="space-y-8">
      {/* Document Header & Legal Identification */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8">
        <div className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 mb-2">
            <span>{SCHEDULE_METADATA.version}</span>
            <span aria-hidden="true">·</span>
            <span>Effective Date: {SCHEDULE_METADATA.effectiveDate}</span>
            <span aria-hidden="true">·</span>
            <span>Last Updated: {SCHEDULE_METADATA.lastUpdated}</span>
            <span aria-hidden="true">·</span>
            <span className="text-blue-700 font-mono">{SCHEDULE_METADATA.website}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-2">
            {SCHEDULE_METADATA.title}
          </h1>
          <p className="text-sm font-medium text-slate-600 mb-4">
            {SCHEDULE_METADATA.subtitle}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs text-slate-600">
            <div>
              <span className="text-slate-400 block mb-0.5">Corporate Headquarters</span>
              <span className="font-medium text-slate-800">NextSoftHR Group Ltd</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Commercial Channel Desk</span>
              <span className="font-mono text-slate-800">{SCHEDULE_METADATA.phone}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Program Motto</span>
              <span className="italic font-medium text-slate-800">“{SCHEDULE_METADATA.tagline}”</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Jump Bar & Fast Tools */}
      <div className="bg-slate-100/80 border border-slate-200/80 rounded-lg p-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-600 font-medium">
            <span className="text-slate-400 mr-1">Quick Jump:</span>
            <button
              onClick={() => {
                const el = document.getElementById('section-3');
                el?.scrollIntoView({ behavior: 'smooth' });
                setExpandedSections(p => ({ ...p, 3: true }));
              }}
              className="px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-200 rounded text-slate-700 transition-colors"
            >
              § 3 Standard Tiers
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('section-11');
                el?.scrollIntoView({ behavior: 'smooth' });
                setExpandedSections(p => ({ ...p, 11: true }));
              }}
              className="px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-200 rounded text-slate-700 transition-colors"
            >
              § 11 Net Revenue
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('section-18');
                el?.scrollIntoView({ behavior: 'smooth' });
                setExpandedSections(p => ({ ...p, 18: true }));
              }}
              className="px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-200 rounded text-slate-700 transition-colors"
            >
              § 18 Reseller Margin
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('section-23');
                el?.scrollIntoView({ behavior: 'smooth' });
                setExpandedSections(p => ({ ...p, 23: true }));
              }}
              className="px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-200 rounded text-slate-700 transition-colors"
            >
              § 23-24 Lead Protection
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('section-34');
                el?.scrollIntoView({ behavior: 'smooth' });
                setExpandedSections(p => ({ ...p, 34: true }));
              }}
              className="px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-200 rounded text-slate-700 transition-colors"
            >
              § 34 $100 Threshold
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('section-60');
                el?.scrollIntoView({ behavior: 'smooth' });
                setExpandedSections(p => ({ ...p, 60: true }));
              }}
              className="px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-200 rounded text-slate-700 transition-colors"
            >
              § 60 E-Acceptance
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={expandAll}
              className="text-slate-600 hover:text-slate-900 font-medium px-2 py-1 underline"
            >
              Expand All
            </button>
            <span className="text-slate-300">|</span>
            <button
              onClick={collapseAll}
              className="text-slate-600 hover:text-slate-900 font-medium px-2 py-1 underline"
            >
              Collapse All
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by section number, keyword (e.g. 'refund', 'reseller', '90 days', 'threshold')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-slate-900 placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>

        <div className="sm:w-72 relative">
          <select
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(e.target.value)}
            className="w-full py-2.5 px-3 text-xs sm:text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-slate-700"
          >
            {CHAPTERS.map((ch) => (
              <option key={ch} value={ch}>
                {ch}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count & Meta */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <div>
          Showing <span className="font-semibold text-slate-800">{filteredSections.length}</span> of 62 official sections
          {selectedChapter !== 'All Chapters' && <span> in <span className="font-medium text-slate-700">{selectedChapter}</span></span>}
        </div>
        {searchQuery && (
          <span className="italic">Filtering for query: &ldquo;{searchQuery}&rdquo;</span>
        )}
      </div>

      {/* Sections List */}
      <div className="space-y-4">
        {filteredSections.length === 0 ? (
          <div className="text-center py-16 bg-white border border-slate-200 rounded-lg p-8">
            <BookOpen className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-800">No matching sections found</p>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Try adjusting your search terms or select &ldquo;All Chapters&rdquo; from the dropdown.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedChapter('All Chapters');
              }}
              className="mt-4 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredSections.map((sec) => {
            const isExpanded = expandedSections[sec.id] ?? true;
            return (
              <article
                key={sec.id}
                id={`section-${sec.id}`}
                className="bg-white border border-slate-200 rounded-lg overflow-hidden transition-all duration-150 scroll-mt-24"
              >
                {/* Header */}
                <div className="p-4 sm:p-5 flex items-start justify-between gap-4 border-b border-slate-100 bg-slate-50/40">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                      <span className="font-bold text-blue-700">SECTION {sec.id}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-sans text-slate-500">{sec.chapter}</span>
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                      {sec.id}. {sec.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {sec.summary}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleCopySection(sec)}
                      title="Copy full section legal text"
                      className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors"
                    >
                      {copiedId === sec.id ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => toggleSection(sec.id)}
                      className="text-xs font-medium text-slate-500 hover:text-slate-800 px-2 py-1 rounded hover:bg-slate-100"
                    >
                      {isExpanded ? 'Collapse' : 'Expand'}
                    </button>
                  </div>
                </div>

                {/* Section Content */}
                {isExpanded && (
                  <div className="p-4 sm:p-6 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {sec.content.map((paragraph, idx) => (
                      <p key={idx} className="whitespace-pre-line">
                        {paragraph}
                      </p>
                    ))}

                    {/* Optional Tables (e.g. Standard Tiers Table in Section 3) */}
                    {sec.tables && (
                      <div className="mt-4 overflow-x-auto border border-slate-200 rounded-md">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                            <tr>
                              {sec.tables.headers.map((h, i) => (
                                <th key={i} className="py-2.5 px-3">
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
                            {sec.tables.rows.map((row, rIdx) => (
                              <tr key={rIdx} className="hover:bg-slate-50">
                                {row.map((cell, cIdx) => (
                                  <td
                                    key={cIdx}
                                    className={`py-2 px-3 ${cIdx === 1 ? 'font-bold text-blue-700' : ''}`}
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Contextual Action Deep-Links */}
                    {(sec.id === 3 || sec.id === 4 || sec.id === 5 || sec.id === 6 || sec.id === 7 || sec.id === 14 || sec.id === 18 || sec.id === 19 || sec.id === 20 || sec.id === 53 || sec.id === 54 || sec.id === 55) && (
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-500">Want to test this tier or margin in action?</span>
                        <button
                          onClick={() => onNavigateTab('calculator')}
                          className="inline-flex items-center gap-1 font-semibold text-blue-700 hover:text-blue-800"
                        >
                          Launch Commission Simulator
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    {(sec.id === 23 || sec.id === 24 || sec.id === 25) && (
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-500">Register a new client opportunity under Section 23</span>
                        <button
                          onClick={() => onNavigateTab('leads')}
                          className="inline-flex items-center gap-1 font-semibold text-blue-700 hover:text-blue-800"
                        >
                          Go to Lead Protection Desk
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    {(sec.id === 34 || sec.id === 35 || sec.id === 39) && (
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-500">Audit your monthly statement ledger under Section 39</span>
                        <button
                          onClick={() => onNavigateTab('statements')}
                          className="inline-flex items-center gap-1 font-semibold text-blue-700 hover:text-blue-800"
                        >
                          View Statements & Payouts
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    {(sec.id === 40) && (
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-500">Have a commercial discrepancy within the 30-day window?</span>
                        <button
                          onClick={() => onNavigateTab('disputes')}
                          className="inline-flex items-center gap-1 font-semibold text-blue-700 hover:text-blue-800"
                        >
                          Submit Dispute Claim
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    {(sec.id === 60 || sec.id === 61) && (
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-500">Formalize your commercial partnership agreement</span>
                        <button
                          onClick={() => onNavigateTab('execution')}
                          className="inline-flex items-center gap-1 font-semibold text-blue-700 hover:text-blue-800"
                        >
                          Sign Acceptance Form
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                  </div>
                )}
              </article>
            );
          })
        )}
      </div>

      {/* Legal Footer Notice matching Section 62 */}
      <div className="p-6 bg-slate-900 text-slate-300 rounded-lg text-xs leading-relaxed space-y-2">
        <p className="font-semibold text-white">Section 62 Final Legal Notice</p>
        <p>
          This Commission & Revenue Share Schedule forms part of the NextSoftHR Master Reseller, Partner, Distributor, Affiliate & Associate Agreement.
          Commercial rates, eligibility criteria, payment procedures, and program rules may vary by partner category, territory, product, and commercial arrangement.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-slate-400 border-t border-slate-800">
          <span>© 2026 NextSoftHR. All Rights Reserved.</span>
          <span>Official Channel Helpline: <span className="font-mono text-slate-200">{SCHEDULE_METADATA.phone}</span></span>
        </div>
      </div>
    </div>
  );
};
