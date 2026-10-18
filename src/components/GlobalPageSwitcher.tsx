import React, { useState, useEffect, useMemo, useTransition } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  Building2,
  Users,
  Briefcase,
  CreditCard,
  Globe2,
  GraduationCap,
  Handshake,
  BookOpenCheck,
  Percent,
  TrendingUp,
  FileCheck,
  Newspaper,
  Mail,
  HelpCircle,
  LogIn,
  Shield,
  Receipt,
  Scale,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Layers,
  Sparkles,
  Sun,
  Moon,
  ExternalLink,
  Compass
} from 'lucide-react';
import { PAGES_CONFIG, CATEGORIES, PageMeta } from '../data/pagesConfig';

const iconMap: Record<string, React.ElementType> = {
  Home,
  Building2,
  Users,
  Briefcase,
  CreditCard,
  Globe2,
  GraduationCap,
  Handshake,
  BookOpenCheck,
  Percent,
  TrendingUp,
  FileCheck,
  Newspaper,
  Mail,
  HelpCircle,
  LogIn,
  Shield,
  Receipt,
  Scale,
};

export const GlobalPageSwitcher: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [, startTransition] = useTransition();

  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return (
        document.documentElement.classList.contains('dark') ||
        localStorage.getItem('nextsofthr-theme') === 'dark'
      );
    }
    return false;
  });

  // Find current active page
  const currentPageIndex = useMemo(() => {
    const idx = PAGES_CONFIG.findIndex((p) => {
      if (p.path === location.pathname) return true;
      if (p.aliases && p.aliases.includes(location.pathname)) return true;
      if (location.pathname === '/' && p.slug === 'homepage') return true;
      return false;
    });
    return idx >= 0 ? idx : 0;
  }, [location.pathname]);

  const currentPage = PAGES_CONFIG[currentPageIndex];

  // Keyboard shortcut Ctrl+K / Cmd+K to toggle directory
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('nextsofthr-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('nextsofthr-theme', 'light');
    }
  };

  const handleNavigate = (path: string) => {
    setIsOpen(false);
    startTransition(() => {
      navigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  const goToPrev = () => {
    const prevIdx = (currentPageIndex - 1 + PAGES_CONFIG.length) % PAGES_CONFIG.length;
    handleNavigate(PAGES_CONFIG[prevIdx].path);
  };

  const goToNext = () => {
    const nextIdx = (currentPageIndex + 1) % PAGES_CONFIG.length;
    handleNavigate(PAGES_CONFIG[nextIdx].path);
  };

  const filteredPages = useMemo(() => {
    return PAGES_CONFIG.filter((page) => {
      const matchesCategory =
        activeCategory === 'All' || page.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        page.title.toLowerCase().includes(q) ||
        page.subtitle.toLowerCase().includes(q) ||
        page.description.toLowerCase().includes(q) ||
        page.slug.toLowerCase().includes(q) ||
        page.path.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <>
      {/* FLOATING ACTION DOCK / PILL */}
      <aside
        data-navigator="true"
        aria-label="Page navigation"
        className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-[9999] flex flex-col items-end gap-2 font-sans select-none max-w-[calc(100vw-1.5rem)] overflow-hidden"
      >
        {isMinimized ? (
          <button
            onClick={() => setIsMinimized(false)}
            title="Expand NextSoftHR Navigator (Ctrl+K)"
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-900/90 hover:bg-slate-900 text-white dark:bg-blue-600/95 dark:hover:bg-blue-600 shadow-2xl backdrop-blur-md border border-white/20 transition-all hover:scale-105 active:scale-95 group"
          >
            <Compass className="w-4 h-4 text-lime-400 group-hover:rotate-45 transition-transform" />
            <span className="text-xs font-semibold tracking-wide">
              {currentPage.title}
            </span>
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full text-lime-300">
              {currentPageIndex + 1}/19
            </span>
          </button>
        ) : (
          <div className="flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-2xl bg-slate-950/90 dark:bg-slate-900/95 text-white shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl border border-white/15 dark:border-slate-700/60 transition-all max-w-full overflow-hidden">
            {/* Prev Page Button */}
            <button
              onClick={goToPrev}
              title="Previous Page"
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 active:scale-90 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Central Directory Trigger Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-white/10 active:scale-98 transition-all group text-left"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-lime-300 shadow-md">
                <Layers className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white group-hover:text-lime-300 transition-colors">
                    {currentPage.title}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded bg-lime-400/20 text-lime-300 border border-lime-400/30">
                    {currentPage.badge || currentPage.category}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                  <span>Page {currentPageIndex + 1} of 19</span>
                  <span>•</span>
                  <span className="text-slate-300 font-mono">Ctrl+K</span>
                </div>
              </div>
            </button>

            {/* Next Page Button */}
            <button
              onClick={goToNext}
              title="Next Page"
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 active:scale-90 transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Quick Directory Modal Launcher */}
            <button
              onClick={() => setIsOpen(true)}
              className="px-2.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1 shadow-sm active:scale-95 transition-all"
            >
              <Compass className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">All Pages</span>
            </button>

            {/* Dark Mode Quick Toggle */}
            <button
              onClick={toggleTheme}
              title="Toggle Light/Dark Theme"
              className="p-2 rounded-xl text-slate-300 hover:text-amber-300 hover:bg-white/10 active:scale-90 transition-all"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Minimize Pill Button */}
            <button
              onClick={() => setIsMinimized(true)}
              title="Minimize Navigator"
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 active:scale-90 transition-all"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}
      </aside>

      {/* FULL-FEATURED PAGE DIRECTORY MODAL / PALETTE */}
      {isOpen && (
        <div
          data-navigator="true"
          className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-fade-in-up"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-4xl max-h-[90vh] bg-white dark:bg-[#0c182b] text-slate-900 dark:text-slate-100 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-fade-in-down"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-[#091322]">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-lime-300 shadow-md">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2 font-display">
                      NextSoftHR Unified App
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                        19 Pages Active
                      </span>
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Explore the entire NextSoftHR platform ecosystem in a single unified application.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors"
                    title="Toggle Theme"
                  >
                    {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Search Box */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search across all 19 pages (e.g., Payroll, Pricing, Outsourcing, Training, Partners, Sign In)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-700/80 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white text-xs"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pt-3 scrollbar-none text-xs">
                {CATEGORIES.map((cat) => {
                  const count =
                    cat === 'All'
                      ? PAGES_CONFIG.length
                      : PAGES_CONFIG.filter((p) => p.category === cat).length;
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`whitespace-nowrap px-3 py-1.5 rounded-xl font-medium transition-all ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-sm font-semibold'
                          : 'bg-slate-200/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                      }`}
                    >
                      {cat}{' '}
                      <span
                        className={`ml-1 text-[10px] px-1.5 py-0.2 rounded-full ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pages Grid */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {filteredPages.length === 0 ? (
                <div className="text-center py-16">
                  <Search className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600 mb-3" />
                  <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
                    No pages matched your search "{searchQuery}"
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('All');
                    }}
                    className="mt-3 text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {filteredPages.map((page, idx) => {
                    const IconComp = iconMap[page.iconName] || Layers;
                    const isCurrent =
                      page.path === location.pathname ||
                      (location.pathname === '/' && page.slug === 'homepage');

                    return (
                      <div
                        key={page.id}
                        onClick={() => handleNavigate(page.path)}
                        className={`group relative p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                          isCurrent
                            ? 'bg-gradient-to-br from-blue-50/80 to-indigo-50/40 dark:from-blue-950/40 dark:to-indigo-950/20 border-blue-400 dark:border-blue-500 shadow-md ring-2 ring-blue-500/20'
                            : 'bg-slate-50/60 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-800/80 border-slate-200/80 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-lg'
                        }`}
                      >
                        <div>
                          {/* Card Top Row */}
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                                  isCurrent
                                    ? 'bg-blue-600 text-lime-300 shadow-sm'
                                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:bg-blue-600 group-hover:text-white shadow-sm'
                                }`}
                              >
                                <IconComp className="w-4 h-4" />
                              </div>
                              <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                  {page.category}
                                </span>
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                  {page.title}
                                </h3>
                              </div>
                            </div>

                            {page.badge && (
                              <span
                                className={`text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                  isCurrent
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                                }`}
                              >
                                {page.badge}
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
                            {page.subtitle}
                          </p>
                        </div>

                        {/* Card Footer */}
                        <div className="pt-2 border-t border-slate-200/50 dark:border-slate-800/60 flex items-center justify-between text-[11px]">
                          <span className="font-mono text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {page.path}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1 font-semibold ${
                              isCurrent
                                ? 'text-blue-600 dark:text-blue-400 font-bold'
                                : 'text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                            }`}
                          >
                            {isCurrent ? (
                              'Currently Viewing'
                            ) : (
                              <>
                                View Page
                                <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                              </>
                            )}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Modal Bottom Status Bar */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-[#07111e] flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>All 19 Pages Extracted & Live</span>
              </div>
              <div className="flex items-center gap-4">
                <span>
                  Tip: Press <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px]">Esc</kbd> to close
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
