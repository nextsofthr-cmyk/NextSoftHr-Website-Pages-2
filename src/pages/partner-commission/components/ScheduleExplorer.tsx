import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Copy, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink, 
  Tag, 
  Bookmark, 
  Layers,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { SCHEDULE_SECTIONS, CATEGORIES, ScheduleSection } from '../data/scheduleData';
import { useCommissionLanguage } from '../context/LanguageContext';
import type { TabType } from './Header';

interface ScheduleExplorerProps {
  targetSectionId?: number | null;
  onClearTarget?: () => void;
  onNavigateTab?: (tab: TabType) => void;
}

// Sections that link straight to the related interactive tool
const SECTION_ACTIONS: { ids: number[]; tab: TabType; promptKey: string; ctaKey: string }[] = [
  { ids: [3, 4, 5, 6, 7, 14, 18, 19, 20, 53, 54, 55], tab: 'simulator', promptKey: 'sched.action_calc_prompt', ctaKey: 'sched.action_calc_cta' },
  { ids: [23, 24, 25], tab: 'leads', promptKey: 'sched.action_leads_prompt', ctaKey: 'sched.action_leads_cta' },
  { ids: [34, 35, 39], tab: 'statements', promptKey: 'sched.action_stmt_prompt', ctaKey: 'sched.action_stmt_cta' },
  { ids: [40], tab: 'disputes', promptKey: 'sched.action_dispute_prompt', ctaKey: 'sched.action_dispute_cta' },
  { ids: [60, 61], tab: 'acceptance', promptKey: 'sched.action_sign_prompt', ctaKey: 'sched.action_sign_cta' },
];

export const ScheduleExplorer: React.FC<ScheduleExplorerProps> = ({
  targetSectionId,
  onClearTarget,
  onNavigateTab
}) => {
  const { t } = useCommissionLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Sections');
  const [expandedSections, setExpandedSections] = useState<Record<number, boolean>>({});
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);
  const [onlyBookmarks, setOnlyBookmarks] = useState(false);

  const sectionRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // Auto-scroll and expand target section if navigated from another tab
  useEffect(() => {
    if (targetSectionId) {
      setExpandedSections(prev => ({ ...prev, [targetSectionId]: true }));
      setSelectedCategory('All Sections');
      setSearchQuery('');
      setTimeout(() => {
        const el = sectionRefs.current[targetSectionId];
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
      if (onClearTarget) onClearTarget();
    }
  }, [targetSectionId]);

  // Filter sections
  const filteredSections = useMemo(() => {
    return SCHEDULE_SECTIONS.filter((sec) => {
      if (onlyBookmarks && !bookmarkedIds.includes(sec.id)) return false;
      if (selectedCategory !== 'All Sections' && sec.category !== selectedCategory) return false;
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const matchTitle = sec.title.toLowerCase().includes(q);
      const matchContent = sec.fullContent.toLowerCase().includes(q);
      const matchTags = sec.tags.some(t => t.toLowerCase().includes(q));
      const matchBadge = sec.highlightBadge?.toLowerCase().includes(q);

      return matchTitle || matchContent || matchTags || matchBadge;
    });
  }, [searchQuery, selectedCategory, bookmarkedIds, onlyBookmarks]);

  const toggleExpand = (id: number) => {
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const all: Record<number, boolean> = {};
    SCHEDULE_SECTIONS.forEach(s => { all[s.id] = true; });
    setExpandedSections(all);
  };

  const collapseAll = () => {
    setExpandedSections({});
  };

  const copySectionText = (sec: ScheduleSection) => {
    const textToCopy = `${sec.title}\n\n${sec.fullContent}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(sec.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleBookmark = (id: number) => {
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-white dark:from-slate-900 via-white dark:via-slate-900 to-indigo-50 dark:to-indigo-950/60 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-200 dark:border-cyan-800/60 text-cyan-600 dark:text-cyan-400 text-xs font-semibold mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              {t('sched.badge')}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {t('sched.title')}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              {t('sched.subtitle')}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={expandAll}
              className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium border border-slate-300 dark:border-slate-700 transition-colors cursor-pointer"
            >
              {t('sched.expand_all')}
            </button>
            <button
              onClick={collapseAll}
              className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium border border-slate-300 dark:border-slate-700 transition-colors cursor-pointer"
            >
              {t('sched.collapse_all')}
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-500 dark:text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder={t('sched.search_placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                {t('sched.clear')}
              </button>
            )}
          </div>

          <div className="md:col-span-4 flex gap-2">
            <div className="relative flex-1">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-cyan-400"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setOnlyBookmarks(!onlyBookmarks)}
              className={`px-3 py-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-colors ${
                onlyBookmarks
                  ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/40'
                  : 'bg-slate-100 dark:bg-slate-800/90 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
              title="Show only bookmarked sections"
            >
              <Bookmark className={`w-3.5 h-3.5 ${onlyBookmarks ? 'fill-amber-400 text-amber-700 dark:text-amber-400' : ''}`} />
              <span className="hidden sm:inline font-mono">({bookmarkedIds.length})</span>
            </button>
          </div>
        </div>

        {/* Quick Clause Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5 items-center text-xs text-slate-500 dark:text-slate-400">
          <span className="text-[11px] font-medium text-slate-500 mr-1">{t('sched.popular')}</span>
          {[
            { label: 'Standard Tiers (Sec 3)', id: 3 },
            { label: 'Exclusions (Sec 11)', id: 11 },
            { label: 'Reseller Margin (Sec 18)', id: 18 },
            { label: 'Distributor Override (Sec 20)', id: 20 },
            { label: '90-Day Protection (Sec 24)', id: 24 },
            { label: 'Duplicate Leads (Sec 25)', id: 25 },
            { label: '$100 Threshold (Sec 34)', id: 34 },
            { label: '11 Statement Fields (Sec 39)', id: 39 },
            { label: '30-Day Disputes (Sec 40)', id: 40 },
            { label: 'Post-Termination (Sec 45)', id: 45 },
            { label: 'Attribution Hierarchy (Sec 58)', id: 58 },
            { label: 'Acceptance (Sec 60)', id: 60 }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => {
                setExpandedSections(prev => ({ ...prev, [item.id]: true }));
                const el = sectionRefs.current[item.id];
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-cyan-50 dark:hover:bg-cyan-950 hover:text-cyan-700 dark:hover:text-cyan-300 hover:border-cyan-200 dark:hover:border-cyan-800 border border-slate-300 dark:border-slate-700/80 text-[11px] text-slate-600 dark:text-slate-300 transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
        <span>
          {t('sched.showing')} <strong>{filteredSections.length}</strong> / {SCHEDULE_SECTIONS.length} {t('sched.sections')}
          {selectedCategory !== 'All Sections' && ` · "${selectedCategory}"`}
          {searchQuery && ` · "${searchQuery}"`}
        </span>
        <span className="text-slate-500 hidden sm:inline">
          {t('sched.collapsed_hint')}
        </span>
      </div>

      {/* Sections Accordion List */}
      <div className="space-y-3.5">
        {filteredSections.map((sec) => {
          const isExpanded = expandedSections[sec.id] ?? false;
          const isBookmarked = bookmarkedIds.includes(sec.id);

          return (
            <div
              key={sec.id}
              ref={(el) => { sectionRefs.current[sec.id] = el; }}
              className={`rounded-xl border transition-all duration-200 ${
                isExpanded 
                  ? 'bg-white dark:bg-slate-900 border-cyan-500/40 shadow-lg shadow-cyan-200/40 dark:shadow-cyan-950/20' 
                  : 'bg-white dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-900/90 border-slate-200 dark:border-slate-800'
              }`}
            >
              {/* Header Bar */}
              <div
                onClick={() => toggleExpand(sec.id)}
                className="p-4 sm:p-5 flex items-start sm:items-center justify-between gap-4 cursor-pointer select-none"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-wide">
                      {sec.title}
                    </span>

                    {sec.highlightBadge && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cyan-50 dark:bg-cyan-950 border border-cyan-200 dark:border-cyan-800/80 text-cyan-700 dark:text-cyan-300">
                        {sec.highlightBadge}
                      </span>
                    )}

                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium">
                      {sec.category}
                    </span>
                  </div>

                  <p className={`text-xs text-slate-600 dark:text-slate-300 ${isExpanded ? '' : 'line-clamp-2'}`}>
                    {sec.summary}
                  </p>

                  {!isExpanded && (
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleExpand(sec.id); }}
                      aria-expanded={false}
                      className="inline-flex items-center gap-1 pt-0.5 text-xs font-semibold text-blue-600 dark:text-cyan-400 hover:text-blue-700 dark:hover:text-cyan-300 cursor-pointer"
                    >
                      {t('sched.see_more')}
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => toggleBookmark(sec.id)}
                    className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-amber-700 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title={isBookmarked ? 'Remove bookmark' : 'Bookmark section'}
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400 text-amber-700 dark:text-amber-400' : ''}`} />
                  </button>

                  <button
                    onClick={() => copySectionText(sec)}
                    className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Copy section legal text"
                  >
                    {copiedId === sec.id ? (
                      <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>

                  <button
                    onClick={() => toggleExpand(sec.id)}
                    aria-expanded={isExpanded}
                    aria-label={isExpanded ? t('sched.see_less') : t('sched.see_more')}
                    className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Expanded Body Content */}
              {isExpanded && (
                <div className="px-4 pb-5 sm:px-6 sm:pb-6 pt-1 border-t border-slate-200 dark:border-slate-800/80 space-y-4">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-sans leading-relaxed whitespace-pre-line selection:bg-cyan-100 dark:selection:bg-cyan-900 selection:text-slate-900 dark:selection:text-white">
                    {sec.fullContent}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <Tag className="w-3 h-3 text-slate-500" />
                    {sec.tags.map((tag) => (
                      <span
                        key={tag}
                        onClick={() => setSearchQuery(tag)}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 hover:text-cyan-700 dark:hover:text-cyan-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer font-mono"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {onNavigateTab && SECTION_ACTIONS.filter((a) => a.ids.includes(sec.id)).map((action) => (
                    <div
                      key={action.tab}
                      className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs"
                    >
                      <span className="text-slate-500 dark:text-slate-400">{t(action.promptKey)}</span>
                      <button
                        onClick={() => onNavigateTab(action.tab)}
                        className="inline-flex items-center gap-1 font-semibold text-blue-600 dark:text-cyan-400 hover:text-blue-700 dark:hover:text-cyan-300 cursor-pointer"
                      >
                        {t(action.ctaKey)}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={() => toggleExpand(sec.id)}
                    aria-expanded={true}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-cyan-400 hover:text-blue-700 dark:hover:text-cyan-300 cursor-pointer"
                  >
                    {t('sched.see_less')}
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {filteredSections.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-slate-900/40 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 p-8">
            <BookOpen className="w-10 h-10 text-slate-400 dark:text-slate-600 mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">{t('sched.no_results')}</p>
            <p className="text-xs text-slate-500 mt-1">
              {t('sched.no_results_hint')}
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All Sections'); setOnlyBookmarks(false); }}
              className="mt-4 px-3.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-cyan-600 dark:text-cyan-400 transition-colors"
            >
              {t('sched.reset')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
