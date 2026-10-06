import { useEffect, useRef, useState, useCallback } from 'react';

export interface SearchEvent {
  id: string;
  query: string;
  resultCount: number;
  hasResults: boolean;
  activeCategoryId: string;
  language: string;
  timestamp: string;
  sessionIndex: number;
  isZeroResult: boolean;
  isLowResult: boolean;
  painPointCategory: PainPointCategory;
  source: 'typing' | 'popular_chip' | 'enter_key' | 'programmatic';
}

export type PainPointCategory =
  | 'UNANSWERED_QUERY'
  | 'PAYROLL_TAX'
  | 'COMPLIANCE_LEGAL'
  | 'INTEGRATION_API'
  | 'ATTENDANCE_LEAVE'
  | 'PRICING_BILLING'
  | 'SECURITY_ACCESS'
  | 'GENERAL_HR';

export interface UseFAQSearchTrackerOptions {
  searchQuery: string;
  resultCount?: number;
  activeCategoryId?: string;
  language?: string;
  debounceMs?: number;
  minQueryLength?: number;
  enabled?: boolean;
}

export interface PainPointReport {
  totalSearches: number;
  zeroResultCount: number;
  zeroResultQueries: Array<{ query: string; count: number; lastSearched: string }>;
  topSearches: Array<{ query: string; count: number; avgResults: number }>;
  categoriesWithPainPoints: Record<string, number>;
}

// Global in-memory log across component remounts
const globalSearchHistory: SearchEvent[] = [];
let globalSearchCounter = 0;
const SESSION_ID = 'faq_session_' + Math.random().toString(36).substring(2, 9);

function categorizePainPoint(query: string, resultCount: number): PainPointCategory {
  if (resultCount === 0) return 'UNANSWERED_QUERY';

  const q = query.toLowerCase();
  if (q.includes('pay') || q.includes('tax') || q.includes('salary') || q.includes('deduct') || q.includes('ohada') || q.includes('pension')) {
    return 'PAYROLL_TAX';
  }
  if (q.includes('law') || q.includes('legal') || q.includes('audit') || q.includes('gdpr') || q.includes('statutory') || q.includes('compliance')) {
    return 'COMPLIANCE_LEGAL';
  }
  if (q.includes('api') || q.includes('webhook') || q.includes('slack') || q.includes('quickbook') || q.includes('sap') || q.includes('integra')) {
    return 'INTEGRATION_API';
  }
  if (q.includes('leave') || q.includes('attend') || q.includes('clock') || q.includes('geofenc') || q.includes('shift') || q.includes('holiday')) {
    return 'ATTENDANCE_LEAVE';
  }
  if (q.includes('cost') || q.includes('price') || q.includes('plan') || q.includes('bill') || q.includes('tier') || q.includes('invoice') || q.includes('per user')) {
    return 'PRICING_BILLING';
  }
  if (q.includes('security') || q.includes('2fa') || q.includes('sso') || q.includes('role') || q.includes('permiss') || q.includes('mfa')) {
    return 'SECURITY_ACCESS';
  }
  return 'GENERAL_HR';
}

function generatePainPointReport(events: SearchEvent[]): PainPointReport {
  const zeroResults = events.filter((e) => e.isZeroResult);
  
  // Aggregate zero result queries
  const zeroMap = new Map<string, { count: number; lastSearched: string }>();
  zeroResults.forEach((e) => {
    const existing = zeroMap.get(e.query) || { count: 0, lastSearched: e.timestamp };
    zeroMap.set(e.query, {
      count: existing.count + 1,
      lastSearched: e.timestamp,
    });
  });

  // Aggregate all queries
  const queryMap = new Map<string, { count: number; totalResults: number }>();
  events.forEach((e) => {
    const existing = queryMap.get(e.query) || { count: 0, totalResults: 0 };
    queryMap.set(e.query, {
      count: existing.count + 1,
      totalResults: existing.totalResults + e.resultCount,
    });
  });

  const categoriesMap: Record<string, number> = {};
  events.forEach((e) => {
    if (e.isZeroResult || e.isLowResult) {
      categoriesMap[e.painPointCategory] = (categoriesMap[e.painPointCategory] || 0) + 1;
    }
  });

  return {
    totalSearches: events.length,
    zeroResultCount: zeroResults.length,
    zeroResultQueries: Array.from(zeroMap.entries())
      .map(([query, data]) => ({ query, ...data }))
      .sort((a, b) => b.count - a.count),
    topSearches: Array.from(queryMap.entries())
      .map(([query, data]) => ({
        query,
        count: data.count,
        avgResults: Math.round(data.totalResults / data.count),
      }))
      .sort((a, b) => b.count - a.count),
    categoriesWithPainPoints: categoriesMap,
  };
}

/**
 * Custom hook to track user search queries in the NextSoftHR FAQ section.
 * Automatically debounces search inputs, categorizes potential friction points,
 * flags zero-result searches (unmet user queries), and logs rich metrics to the browser console.
 */
export function useFAQSearchTracker({
  searchQuery,
  resultCount = 0,
  activeCategoryId = 'all',
  language = 'en',
  debounceMs = 650,
  minQueryLength = 2,
  enabled = true,
}: UseFAQSearchTrackerOptions) {
  const [history, setHistory] = useState<SearchEvent[]>(() => [...globalSearchHistory]);
  const lastLoggedQueryRef = useRef<string>('');
  const lastLoggedCategoryRef = useRef<string>('');
  const lastLoggedCountRef = useRef<number>(-1);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Core logging logic
  const logSearchEvent = useCallback(
    (
      queryToLog: string,
      matches: number,
      catId: string,
      lang: string,
      source: SearchEvent['source'] = 'typing'
    ) => {
      const trimmed = queryToLog.trim();
      if (!trimmed || trimmed.length < minQueryLength) {
        return;
      }

      // Avoid duplicate logs if identical query and matches were just logged
      if (
        trimmed.toLowerCase() === lastLoggedQueryRef.current.toLowerCase() &&
        catId === lastLoggedCategoryRef.current &&
        matches === lastLoggedCountRef.current
      ) {
        return;
      }

      lastLoggedQueryRef.current = trimmed;
      lastLoggedCategoryRef.current = catId;
      lastLoggedCountRef.current = matches;

      globalSearchCounter += 1;
      const isZero = matches === 0;
      const isLow = matches > 0 && matches <= 2;
      const painPointCategory = categorizePainPoint(trimmed, matches);

      const event: SearchEvent = {
        id: `search_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        query: trimmed,
        resultCount: matches,
        hasResults: matches > 0,
        activeCategoryId: catId,
        language: lang,
        timestamp: new Date().toISOString(),
        sessionIndex: globalSearchCounter,
        isZeroResult: isZero,
        isLowResult: isLow,
        painPointCategory,
        source,
      };

      globalSearchHistory.push(event);
      setHistory((prev) => [...prev, event]);

      // 1. Structured Console Output
      if (isZero) {
        console.groupCollapsed(
          `%c⚠️ [FAQ Pain Point Alert] Zero results for: "${trimmed}"`,
          'color: #dc2626; font-weight: bold; background: #fee2e2; padding: 2px 6px; border-radius: 4px;'
        );
        console.warn('User searched for content that does not exist in the FAQ knowledge base:', {
          query: trimmed,
          resultCount: 0,
          categoryFilter: catId,
          language: lang,
          painPointType: 'UNANSWERED_USER_QUERY',
          suggestedRemedy: 'Add an FAQ article or tag existing questions with this keyword to eliminate friction.',
          sessionId: SESSION_ID,
          timestamp: event.timestamp,
        });
        console.groupEnd();
      } else {
        console.groupCollapsed(
          `%c🔍 [FAQ Search Tracker] Query: "${trimmed}" (${matches} answer${matches === 1 ? '' : 's'})`,
          'color: #2563eb; font-weight: bold; background: #eff6ff; padding: 2px 6px; border-radius: 4px;'
        );
        console.log('Search Analytics Payload:', {
          query: trimmed,
          resultCount: matches,
          categoryFilter: catId,
          language: lang,
          source,
          painPointCategory,
          isLowResult: isLow,
          sessionIndex: globalSearchCounter,
          timestamp: event.timestamp,
        });
        console.groupEnd();
      }

      // 2. Also output a single-line log for easy filtering in console search filter
      console.log(
        `[FAQ Search Analytics] Query="${trimmed}" | Results=${matches} | Cat=${catId} | Lang=${lang}${
          isZero ? ' | 🚨 ZERO_RESULTS_PAIN_POINT' : ''
        }`
      );
    },
    [minQueryLength]
  );

  // Manual/instant trigger (e.g. user hits Enter or clicks a popular search chip)
  const trackSearch = useCallback(
    (
      explicitQuery?: string,
      explicitResultCount?: number,
      source: SearchEvent['source'] = 'popular_chip'
    ) => {
      const q = explicitQuery !== undefined ? explicitQuery : searchQuery;
      const count = explicitResultCount !== undefined ? explicitResultCount : resultCount;
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      logSearchEvent(q, count, activeCategoryId, language, source);
    },
    [searchQuery, resultCount, activeCategoryId, language, logSearchEvent]
  );

  // Automatic debounced tracking on query change
  useEffect(() => {
    if (!enabled) return;

    const trimmed = searchQuery.trim();
    if (!trimmed || trimmed.length < minQueryLength) {
      return;
    }

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      logSearchEvent(trimmed, resultCount, activeCategoryId, language, 'typing');
    }, debounceMs);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchQuery, resultCount, activeCategoryId, language, debounceMs, minQueryLength, enabled, logSearchEvent]);

  // Expose global devtools helper on window for product/support team analysis
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as unknown as { __FAQ_SEARCH_ANALYTICS__: unknown }).__FAQ_SEARCH_ANALYTICS__ = {
        getSearchHistory: () => [...globalSearchHistory],
        getZeroResultQueries: () => globalSearchHistory.filter((e) => e.isZeroResult),
        getPainPoints: () => generatePainPointReport(globalSearchHistory),
        printSummary: () => {
          const report = generatePainPointReport(globalSearchHistory);
          console.group('%c📊 NextSoftHR FAQ Search Analytics Summary', 'color: #10b981; font-weight: bold; font-size: 13px;');
          console.log(`Total searches tracked this session: ${report.totalSearches}`);
          console.log(`Zero-result searches (pain points): ${report.zeroResultCount}`);
          if (report.zeroResultQueries.length > 0) {
            console.log('Top Unmet Queries (Users found 0 answers):');
            console.table(report.zeroResultQueries);
          }
          if (report.topSearches.length > 0) {
            console.log('Most Common Searches:');
            console.table(report.topSearches);
          }
          console.groupEnd();
          return report;
        },
        clearHistory: () => {
          globalSearchHistory.length = 0;
          setHistory([]);
          console.log('[FAQ Search Analytics] History cleared.');
        },
      };
    }
  }, []);

  const clearHistory = useCallback(() => {
    globalSearchHistory.length = 0;
    setHistory([]);
  }, []);

  const painPointsReport = generatePainPointReport(history);

  return {
    trackSearch,
    searchHistory: history,
    zeroResultQueries: history.filter((e) => e.isZeroResult),
    painPointsReport,
    clearHistory,
  };
}
