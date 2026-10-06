import React, { useState, useEffect } from 'react';
import {
  Plus,
  Minus,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Share2,
  ThumbsUp,
  ThumbsDown,
  MessageSquareText,
  Search,
  ExternalLink,
  Link2,
  Check,
  Mail
} from 'lucide-react';
import { FAQCategory, FAQItem } from '../data/faqData';
import { useLanguage } from '../context/LanguageContext';
import { useFAQSearchTracker } from '../hooks/useFAQSearchTracker';

interface FAQAccordionProps {
  categories: FAQCategory[];
  searchQuery: string;
  activeCategoryId: string;
  onOpenPricing: () => void;
  onOpenSupport: () => void;
  onOpenDemo: () => void;
  onOpenAI: (initialPrompt?: string) => void;
  onSelectCategory: (id: string) => void;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  categories,
  searchQuery,
  activeCategoryId,
  onOpenPricing,
  onOpenSupport,
  onOpenDemo,
  onOpenAI,
  onSelectCategory,
}) => {
  const { t, language } = useLanguage();
  // Store expanded item IDs
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'gs-1': true, // Open first question by default
    'pay-1': true,
    'ai-1': true,
  });

  const [feedbackVotes, setFeedbackVotes] = useState<Record<string, 'yes' | 'no'>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedLinkId, setCopiedLinkId] = useState<string | null>(null);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleFeedback = (item: FAQItem, categoryTitle: string, vote: 'yes' | 'no') => {
    setFeedbackVotes((prev) => ({
      ...prev,
      [item.id]: vote,
    }));

    // Log feedback to the browser console as requested
    console.log('[NextSoftHR FAQ Feedback] Was this helpful?:', {
      faqId: item.id,
      question: item.question,
      category: categoryTitle,
      helpful: vote === 'yes',
      vote: vote,
      timestamp: new Date().toISOString(),
    });
  };

  const handleShare = (item: FAQItem) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${item.question}\n\n${item.answer}\n\n— NextSoftHR (www.nextsofthr.org)`);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  // Copy direct URL hash (e.g. #question-id) to the clipboard
  const handleCopyLink = async (itemId: string) => {
    const hash = `#${itemId}`;

    // Update browser URL hash/history without unexpected scroll jumps
    try {
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, '', hash);
      } else {
        window.location.hash = hash;
      }
    } catch {
      // Ignore if sandbox prevents history replacement
    }

    // Copy direct URL hash string to clipboard
    let copied = false;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(hash);
        copied = true;
      }
    } catch (err) {
      console.warn('Clipboard writeText failed, using fallback:', err);
    }

    if (!copied) {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = hash;
        textarea.style.position = 'fixed';
        textarea.style.left = '-999999px';
        textarea.style.top = '-999999px';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        copied = true;
      } catch (err) {
        console.error('Fallback clipboard copy failed:', err);
      }
    }

    setCopiedLinkId(itemId);
    setTimeout(() => {
      setCopiedLinkId((prev) => (prev === itemId ? null : prev));
    }, 2000);
  };

  // Pre-populate email subject and body with the question and direct link for email sharing
  const getEmailShareUrl = (item: FAQItem) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
    const directLink = `${origin}${pathname}#${item.id}`;

    const subject = encodeURIComponent(`NextSoftHR FAQ: ${item.question}`);
    const body = encodeURIComponent(
      `Hi,\n\nI thought this answer from the NextSoftHR Knowledge Base would be helpful:\n\n` +
      `Question: ${item.question}\n\n` +
      `Answer:\n${item.answer}\n\n` +
      `Direct Link:\n${directLink}\n\n` +
      `— NextSoftHR Support Center (https://www.nextsofthr.org)`
    );

    return `mailto:?subject=${subject}&body=${body}`;
  };

  // Auto-expand and smooth scroll when URL contains a direct question hash (e.g., #gs-1 or #question-id)
  useEffect(() => {
    const handleHashNavigation = () => {
      const rawHash = window.location.hash;
      if (!rawHash) return;
      const targetId = rawHash.replace(/^#(faq-)?/, '');
      if (!targetId) return;

      const targetCategory = categories.find((cat) =>
        cat.questions.some((q) => q.id === targetId || `faq-${q.id}` === targetId)
      );

      if (targetCategory) {
        if (activeCategoryId !== 'all' && activeCategoryId !== targetCategory.id) {
          onSelectCategory('all');
        }

        setOpenItems((prev) => ({
          ...prev,
          [targetId]: true,
        }));

        setHighlightedId(targetId);
        setTimeout(() => {
          setHighlightedId((prev) => (prev === targetId ? null : prev));
        }, 3000);

        setTimeout(() => {
          const el = document.getElementById(targetId) || document.getElementById(`faq-${targetId}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 150);
      }
    };

    handleHashNavigation();
    window.addEventListener('hashchange', handleHashNavigation);
    return () => window.removeEventListener('hashchange', handleHashNavigation);
  }, [categories, activeCategoryId, onSelectCategory]);

  // Filter categories and questions
  const query = searchQuery.toLowerCase().trim();

  const filteredCategories = categories
    .map((category) => {
      // If a specific category is selected (not 'all'), filter out others
      if (activeCategoryId !== 'all' && category.id !== activeCategoryId) {
        return null;
      }

      if (!query) {
        return category;
      }

      // Filter questions within category
      const matchingQuestions = category.questions.filter((q) => {
        const matchesQuestion = q.question.toLowerCase().includes(query);
        const matchesAnswer = q.answer.toLowerCase().includes(query);
        const matchesTags = q.tags?.some((t) => t.toLowerCase().includes(query));
        const matchesCategory = category.title.toLowerCase().includes(query);

        // Special handling requested by user:
        // "When a user enters: 'payroll' Show relevant questions from: Payroll, Time & Attendance, Leave, Employee Self-Service, Pricing"
        // "When a user searches: 'AI' Show all AI-related questions."
        return matchesQuestion || matchesAnswer || matchesTags || matchesCategory;
      });

      if (matchingQuestions.length === 0) {
        return null;
      }

      return {
        ...category,
        questions: matchingQuestions,
      };
    })
    .filter((cat): cat is FAQCategory => cat !== null);

  const totalFilteredQuestions = filteredCategories.reduce(
    (acc, cat) => acc + cat.questions.length,
    0
  );

  // Track search queries in the FAQ section and log to console to identify user pain points
  useFAQSearchTracker({
    searchQuery,
    resultCount: totalFilteredQuestions,
    activeCategoryId,
    language,
    debounceMs: 600,
  });

  return (
    <div id="faq-main" className="py-12 bg-[#F8FAFC] dark:bg-[#080E1E] transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Search status header if searching */}
        {query && (
          <div className="mb-8 p-4 bg-white dark:bg-[#0F1D3D] rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                {t('faq.searchResults', 'Search Results')}
              </div>
              <div className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                {t('faq.found', 'Found')} {totalFilteredQuestions} {t('faq.answersFor', 'answers for')} &ldquo;{searchQuery}&rdquo;
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAI(searchQuery)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 dark:text-lime-300 bg-blue-50 dark:bg-[#111F42] hover:bg-blue-100 dark:hover:bg-[#162752] rounded-lg border border-blue-200 dark:border-blue-500/30 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400" />
                <span>{t('faq.askAiAbout', 'Ask AI About This')}</span>
              </button>
              <button
                onClick={() => onSelectCategory('all')}
                className="text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white underline"
              >
                {t('faq.clearFilters', 'Clear Filters')}
              </button>
            </div>
          </div>
        )}

        {/* Empty State: user searched and found 0 results */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-16 px-4 bg-white dark:bg-[#0F1D3D] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm max-w-2xl mx-auto">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-50 dark:bg-[#111F42] text-blue-700 dark:text-blue-400 flex items-center justify-center mb-4">
              <Search className="w-7 h-7 text-blue-700 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              {t('faq.noResultsTitle', "We couldn't find an answer to that question.")}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-6 leading-relaxed">
              {t('faq.noResultsDesc', 'Ask our AI Assistant or contact the NextSoftHR support team. Our solution advisors are ready to assist you right away.')}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => onOpenAI(searchQuery)}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-lg transition-colors shadow-xs"
              >
                <Sparkles className="w-4 h-4 text-lime-300" />
                <span>{t('faq.askAi', 'Ask AI')}</span>
              </button>
              <button
                onClick={onOpenSupport}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-[#111F42] hover:bg-slate-200 dark:hover:bg-[#162752] rounded-lg transition-colors"
              >
                <span>{t('faq.contactSupport', 'Contact Support')}</span>
              </button>
            </div>
          </div>
        )}

        {/* Categories and Accordion Lists */}
        <div id="faq-accordion-list" className="space-y-12">
          {filteredCategories.map((cat) => {
            const isAICat = cat.id === 'ai-assistant';

            return (
              <section
                key={cat.id}
                id={`category-${cat.id}`}
                className={`scroll-mt-24 rounded-2xl p-6 sm:p-8 transition-all ${
                  isAICat
                    ? 'bg-linear-to-b from-slate-900 to-blue-950 dark:from-[#0B1528] dark:to-[#0A1226] text-white shadow-xl border border-blue-900/60 dark:border-blue-800/60'
                    : 'bg-white dark:bg-[#0F1D3D] border border-slate-200/90 dark:border-slate-800 shadow-2xs'
                }`}
              >
                {/* Category Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span
                        className={`text-xs font-bold uppercase tracking-wider ${
                          isAICat ? 'text-lime-400' : 'text-blue-700 dark:text-blue-400'
                        }`}
                      >
                        {t('faq.module', 'Module')}
                      </span>
                      <span className={isAICat ? 'text-slate-600' : 'text-slate-300 dark:text-slate-600'}>·</span>
                      <span
                        className={`text-xs font-semibold tabular-nums ${
                          isAICat ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {cat.questions.length} {t('faq.questions', 'Questions')}
                      </span>
                    </div>
                    <h2
                      className={`text-2xl font-bold tracking-tight ${
                        isAICat ? 'text-white' : 'text-slate-900 dark:text-white'
                      }`}
                    >
                      {t(`cat.${cat.id}`, cat.title)}
                    </h2>
                    <p
                      className={`text-sm mt-1 max-w-2xl ${
                        isAICat ? 'text-slate-300' : 'text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {t(`cat.${cat.id}.desc`, cat.shortDescription)}
                    </p>
                  </div>

                  {/* Section-Specific CTAs */}
                  {cat.ctaText && (
                    <div className="shrink-0">
                      {cat.ctaAction === 'pricing' && (
                        <button
                          onClick={onOpenPricing}
                          className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-[#111F42] hover:bg-blue-100 dark:hover:bg-[#162752] rounded-lg border border-blue-200 dark:border-blue-500/30 transition-colors"
                        >
                          <span>{t('faq.viewPricing', cat.ctaText)}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400" />
                        </button>
                      )}
                      {cat.ctaAction === 'support' && (
                        <button
                          onClick={onOpenSupport}
                          className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-[#111F42] hover:bg-blue-100 dark:hover:bg-[#162752] rounded-lg border border-blue-200 dark:border-blue-500/30 transition-colors"
                        >
                          <span>{t('faq.talkSupport', cat.ctaText)}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400" />
                        </button>
                      )}
                      {cat.ctaAction === 'outsourcing' && (
                        <button
                          onClick={onOpenDemo}
                          className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-[#111F42] hover:bg-blue-100 dark:hover:bg-[#162752] rounded-lg border border-blue-200 dark:border-blue-500/30 transition-colors"
                        >
                          <span>{t('faq.requestOutsourcing', cat.ctaText)}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400" />
                        </button>
                      )}
                      {cat.ctaAction === 'ai' && (
                        <button
                          onClick={() => onOpenAI()}
                          className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-950 bg-lime-400 hover:bg-lime-300 rounded-lg transition-colors shadow-xs"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>{t('faq.askNextSoftAI', cat.ctaText)}</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* AI Visual Callout Card if AI Category */}
                {isAICat && (
                  <div className="mb-6 p-4 rounded-xl bg-blue-900/40 dark:bg-blue-950/80 border border-blue-700/40 dark:border-blue-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-lime-400 text-slate-950 flex items-center justify-center shrink-0">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">{t('faq.aiCalloutTitle', 'Ask NextSoftHR AI Visual Callout')}</div>
                        <div className="text-xs text-slate-300">
                          {t('faq.aiCalloutDesc', 'Experience live intelligence — ask about any employee policy, payroll tax formula, or leave rule right now.')}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => onOpenAI('How does NextSoftHR protect employee payroll data?')}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-lime-400 hover:bg-lime-300 rounded-lg transition-colors shrink-0"
                    >
                      <span>{t('faq.askAiNow', 'Ask AI Now')}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )}

                {/* Accordion Questions List */}
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {cat.questions.map((item) => {
                    const isOpen = !!openItems[item.id];

                    return (
                      <div
                        key={item.id}
                        id={item.id}
                        data-faq-id={item.id}
                        className={`transition-all py-4 sm:py-5 first:pt-0 last:pb-0 scroll-mt-28 ${
                          highlightedId === item.id
                            ? 'bg-blue-50/80 dark:bg-blue-900/40 ring-2 ring-blue-500 dark:ring-blue-400 rounded-xl px-4 sm:px-6 my-2 shadow-sm'
                            : isOpen && !isAICat
                            ? 'bg-blue-50/20 dark:bg-blue-950/30 -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-xl'
                            : ''
                        }`}
                      >
                        {/* Question Row Header with Question Title, Copy Link Button, and Expand/Collapse Toggle */}
                        <div className="flex items-start justify-between gap-3 group">
                          <button
                            type="button"
                            onClick={() => toggleItem(item.id)}
                            aria-expanded={isOpen}
                            className="flex-1 text-left focus-visible:outline-2 focus-visible:outline-blue-600 rounded-lg py-1 transition-colors"
                          >
                            <span
                              className={`text-base sm:text-lg font-semibold tracking-tight transition-colors leading-snug ${
                                isOpen
                                  ? isAICat
                                    ? 'text-lime-300 font-bold'
                                    : 'text-blue-700 dark:text-blue-400 font-bold'
                                  : isAICat
                                  ? 'text-slate-100 group-hover:text-lime-300'
                                  : 'text-slate-900 dark:text-slate-100 group-hover:text-blue-700 dark:group-hover:text-blue-400'
                              }`}
                            >
                              {item.question}
                            </span>
                          </button>

                          <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
                            {/* 'Copy link' button for each individual FAQ question */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCopyLink(item.id);
                              }}
                              aria-label={`Copy link to question: ${item.question}`}
                              title={copiedLinkId === item.id ? 'Copied link to clipboard!' : 'Copy direct link to this question'}
                              data-action="copy-link"
                              data-question-id={item.id}
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg transition-all border ${
                                copiedLinkId === item.id
                                  ? 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700 shadow-2xs'
                                  : isAICat
                                  ? 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border-slate-700'
                                  : 'bg-slate-50 dark:bg-[#162752] hover:bg-blue-50 dark:hover:bg-blue-900/40 text-slate-600 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-300 border-slate-200 dark:border-slate-700'
                              }`}
                            >
                              {copiedLinkId === item.id ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                                  <span className="font-semibold text-emerald-700 dark:text-emerald-300">
                                    {t('faq.linkCopied', 'Copied!')}
                                  </span>
                                </>
                              ) : (
                                <>
                                  <Link2 className="w-3.5 h-3.5 text-slate-400 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                                  <span>{t('faq.copyLink', 'Copy link')}</span>
                                </>
                              )}
                            </button>

                            {/* Expand / Collapse Button */}
                            <button
                              type="button"
                              onClick={() => toggleItem(item.id)}
                              aria-label={isOpen ? 'Collapse answer' : 'Expand answer'}
                              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 ${
                                isOpen
                                  ? isAICat
                                    ? 'bg-lime-400 text-slate-950 rotate-180'
                                    : 'bg-blue-700 dark:bg-blue-600 text-white'
                                  : isAICat
                                  ? 'bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-white'
                                  : 'bg-slate-100 dark:bg-[#162752] text-slate-500 dark:text-slate-300 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/60 group-hover:text-blue-700 dark:group-hover:text-blue-300'
                              }`}
                            >
                              {isOpen ? (
                                <Minus className="w-4 h-4" />
                              ) : (
                                <Plus className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Open State Answer */}
                        {isOpen && (
                          <div className="mt-3.5 pr-6 sm:pr-10 text-sm sm:text-base leading-relaxed animate-in fade-in-50 duration-150">
                            <p
                              className={`${
                                isAICat ? 'text-slate-200' : 'text-slate-600 dark:text-slate-300'
                              }`}
                            >
                              {item.answer}
                            </p>

                            {/* Tags and Context Metadata with 'Was this helpful?' widget */}
                            <div className="mt-4 pt-3 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-slate-100 dark:border-slate-800">
                              <div
                                className={`flex items-center gap-1.5 ${
                                  isAICat ? 'text-slate-400' : 'text-slate-500 dark:text-slate-400'
                                }`}
                              >
                                <span className="font-semibold">{t('faq.tags', 'Tags:')}</span>
                                <span>{item.tags?.join(' · ') || 'General HR'}</span>
                              </div>

                              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                {/* 'Was this helpful?' Thumbs Up / Down feedback widget */}
                                <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-[#111F42] px-2.5 py-1 rounded-lg border border-slate-200/80 dark:border-slate-700/70">
                                  <span
                                    className={`text-[11px] font-medium mr-1 ${
                                      isAICat ? 'text-slate-300' : 'text-slate-600 dark:text-slate-300'
                                    }`}
                                  >
                                    {t('faq.wasHelpful', 'Was this helpful?')}
                                  </span>
                                  
                                  <button
                                    type="button"
                                    onClick={() => handleFeedback(item, cat.title, 'yes')}
                                    className={`p-1 rounded-md flex items-center gap-1 transition-all ${
                                      feedbackVotes[item.id] === 'yes'
                                        ? 'bg-lime-500/20 text-lime-700 dark:text-lime-400 font-semibold ring-1 ring-lime-500/40'
                                        : isAICat
                                        ? 'text-slate-400 hover:text-lime-300 hover:bg-white/10'
                                        : 'text-slate-500 dark:text-slate-400 hover:text-blue-700 dark:hover:text-lime-300 hover:bg-slate-200/70 dark:hover:bg-[#162752]'
                                    }`}
                                    title="Yes, this answer was helpful"
                                    aria-label="Yes, this was helpful"
                                  >
                                    <ThumbsUp className="w-3.5 h-3.5" />
                                    <span className="text-[10px]">{t('faq.yes', 'Yes')}</span>
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => handleFeedback(item, cat.title, 'no')}
                                    className={`p-1 rounded-md flex items-center gap-1 transition-all ${
                                      feedbackVotes[item.id] === 'no'
                                        ? 'bg-red-500/15 text-red-600 dark:text-red-400 font-semibold ring-1 ring-red-500/30'
                                        : isAICat
                                        ? 'text-slate-400 hover:text-red-300 hover:bg-white/10'
                                        : 'text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-slate-200/70 dark:hover:bg-[#162752]'
                                    }`}
                                    title="No, this answer was not helpful"
                                    aria-label="No, this was not helpful"
                                  >
                                    <ThumbsDown className="w-3.5 h-3.5" />
                                    <span className="text-[10px]">{t('faq.no', 'No')}</span>
                                  </button>

                                  {feedbackVotes[item.id] && (
                                    <span className="text-[10px] text-lime-600 dark:text-lime-400 font-medium ml-1 animate-in fade-in duration-150">
                                      {t('faq.thanksFeedback', 'Thanks!')}
                                    </span>
                                  )}
                                </div>

                                {/* Copy Link Button in expanded view */}
                                <button
                                  type="button"
                                  onClick={() => handleCopyLink(item.id)}
                                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                                    copiedLinkId === item.id
                                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/60'
                                      : isAICat
                                      ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                                      : 'text-slate-600 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-slate-100 dark:hover:bg-[#162752]'
                                  }`}
                                  title="Copy direct URL hash link"
                                >
                                  {copiedLinkId === item.id ? (
                                    <>
                                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                                      <span className="font-semibold text-emerald-700 dark:text-emerald-300">{t('faq.linkCopied', 'Copied Link')}</span>
                                    </>
                                  ) : (
                                    <>
                                      <Link2 className="w-3.5 h-3.5" />
                                      <span>{t('faq.copyLink', 'Copy link')}</span>
                                    </>
                                  )}
                                </button>

                                {/* Share via Email option */}
                                <a
                                  href={getEmailShareUrl(item)}
                                  aria-label={`Share via Email: ${item.question}`}
                                  title="Share via Email"
                                  data-action="share-email"
                                  data-question-id={item.id}
                                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                                    isAICat
                                      ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                                      : 'text-slate-600 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-slate-100 dark:hover:bg-[#162752]'
                                  }`}
                                >
                                  <Mail className="w-3.5 h-3.5" />
                                  <span>{t('faq.shareEmail', 'Share via Email')}</span>
                                </a>

                                {/* Share Full Answer Text */}
                                <button
                                  type="button"
                                  onClick={() => handleShare(item)}
                                  className={`flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                                    isAICat ? 'text-slate-400' : 'text-slate-500 dark:text-slate-400'
                                  }`}
                                  title="Copy full answer text to clipboard"
                                >
                                  <Share2 className="w-3.5 h-3.5" />
                                  <span>{copiedId === item.id ? t('faq.copied', 'Copied text') : t('faq.share', 'Share')}</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

      </div>
    </div>
  );
};
