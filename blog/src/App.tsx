import React, { useState, useEffect, useMemo } from 'react';
import { MOCK_ARTICLES } from './data/mockArticles';
import { Article, IndustryInsightItem } from './types/blog';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturedInsight } from './components/FeaturedInsight';
import { CategoryFilter } from './components/CategoryFilter';
import { SearchAndFilters } from './components/SearchAndFilters';
import { LatestArticlesGrid } from './components/LatestArticlesGrid';
import { AfricanWorkforceSection } from './components/AfricanWorkforceSection';
import { AiInsightsInteractive } from './components/AiInsightsInteractive';
import { IndustryInsights } from './components/IndustryInsights';
import { PopularArticlesList } from './components/PopularArticlesList';
import { ResourcesHub } from './components/ResourcesHub';
import { NewsletterSection } from './components/NewsletterSection';
import { NextSoftHrConversionCta } from './components/NextSoftHrConversionCta';
import { BlogDetailsPage } from './components/BlogDetailsPage';
import { Footer } from './components/Footer';
import { BookDemoModal } from './components/BookDemoModal';
import { GetStartedModal } from './components/GetStartedModal';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { CmsAdminModal } from './components/CmsAdminModal';
import { SeoSitemapModal } from './components/SeoSitemapModal';
import { LiveChatWidget } from './components/LiveChatWidget';

export default function App() {
  const [articles, setArticles] = useState<Article[]>(MOCK_ARTICLES);
  const [currentRoute, setCurrentRoute] = useState<string>('/blog');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);

  // Theme state: 'light' or 'dark'
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('nextsofthr_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    } catch {}
    return 'light';
  });

  // Apply dark class to document root element
  useEffect(() => {
    try {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('nextsofthr_theme', theme);
    } catch {}
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Bookmarking with local state
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('nextsofthr_bookmarks');
      return saved ? JSON.parse(saved) : ['art-1', 'art-3'];
    } catch {
      return ['art-1', 'art-3'];
    }
  });

  // Modals state
  const [isBookDemoOpen, setIsBookDemoOpen] = useState(false);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isCmsAdminOpen, setIsCmsAdminOpen] = useState(false);
  const [isSitemapOpen, setIsSitemapOpen] = useState(false);

  // Sync bookmarks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nextsofthr_bookmarks', JSON.stringify(bookmarkedIds));
    } catch {}
  }, [bookmarkedIds]);

  // Handle URL history state & deep linking
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path && path.startsWith('/blog/')) {
        setCurrentRoute(path);
      } else {
        setCurrentRoute('/blog');
      }
    };

    window.addEventListener('popstate', handlePopState);

    // Initial check from path if exists
    const path = window.location.pathname;
    if (path && path.startsWith('/blog/') && path !== '/blog') {
      setCurrentRoute(path);
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (route: string) => {
    if (route.startsWith('category:')) {
      const catSlug = route.replace('category:', '');
      const catMap: Record<string, string> = {
        'hr-management': 'HR Management',
        payroll: 'Payroll',
        workforce: 'Workforce',
        talent: 'Talent',
        business: 'Business',
        'employee-experience': 'Employee Experience',
        'ai-technology': 'AI & Technology',
        compliance: 'Compliance',
      };
      const foundName = catMap[catSlug] || 'HR Management';
      setSelectedCategory(foundName);
      setSelectedSubcategory(null);
      setCurrentRoute('/blog');
      window.history.pushState({}, '', '/blog');
      const element = document.getElementById('latest-insights-section');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (route.startsWith('#')) {
      setCurrentRoute('/blog');
      window.history.pushState({}, '', '/blog');
      const id = route.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    setCurrentRoute(route);
    window.history.pushState({}, '', route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArticle = (slug: string) => {
    navigateTo(`/blog/${slug}`);
  };

  const handleToggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleRemoveBookmark = (id: string) => {
    setBookmarkedIds((prev) => prev.filter((item) => item !== id));
  };

  const handleClearAllBookmarks = () => {
    setBookmarkedIds([]);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedTag(null);
    setSelectedAuthor(null);
    setSelectedCategory(null);
    setSelectedSubcategory(null);
  };

  const handleSelectIndustry = (industry: IndustryInsightItem) => {
    setSelectedCategory(industry.recommendedCategory);
    setSelectedSubcategory(null);
    const element = document.getElementById('latest-insights-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Find active article for details view
  const activeArticleSlug = currentRoute.startsWith('/blog/') && currentRoute !== '/blog'
    ? currentRoute.replace('/blog/', '')
    : null;

  const currentArticle = useMemo(() => {
    if (!activeArticleSlug) return null;
    return articles.find((a) => a.slug === activeArticleSlug) || articles[0];
  }, [activeArticleSlug, articles]);

  // Featured article
  const featuredArticle = useMemo(() => {
    return articles.find((a) => a.featured) || articles[0];
  }, [articles]);

  // Filtered articles list
  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      // Category match
      if (selectedCategory && art.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
      // Subcategory match
      if (selectedSubcategory && art.subcategory.toLowerCase() !== selectedSubcategory.toLowerCase()) {
        return false;
      }
      // Tag match
      if (selectedTag && !art.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase())) {
        return false;
      }
      // Author match
      if (selectedAuthor && art.author.name.toLowerCase() !== selectedAuthor.toLowerCase()) {
        return false;
      }
      // Search query keyword match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = art.title.toLowerCase().includes(q);
        const inExcerpt = art.excerpt.toLowerCase().includes(q);
        const inCategory = art.category.toLowerCase().includes(q);
        const inTags = art.tags.some((t) => t.toLowerCase().includes(q));
        if (!inTitle && !inExcerpt && !inCategory && !inTags) {
          return false;
        }
      }
      return true;
    });
  }, [articles, selectedCategory, selectedSubcategory, selectedTag, selectedAuthor, searchQuery]);

  // Bookmarked articles objects
  const bookmarkedArticlesList = useMemo(() => {
    return articles.filter((a) => bookmarkedIds.includes(a.id));
  }, [articles, bookmarkedIds]);

  // CMS Handlers
  const handleSaveArticle = (newArticle: Article) => {
    setArticles((prev) => [newArticle, ...prev]);
  };

  const handleDeleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#061528] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Sticky Global Navigation */}
      <Navbar
        currentView={currentRoute}
        onNavigate={navigateTo}
        onOpenBookDemo={() => setIsBookDemoOpen(true)}
        onOpenGetStarted={() => setIsGetStartedOpen(true)}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenCmsAdmin={() => setIsCmsAdminOpen(true)}
        bookmarkedCount={bookmarkedIds.length}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Router */}
      <div className="flex-1">
        {currentArticle && activeArticleSlug ? (
          /* BLOG DETAILS PAGE: /blog/{article-slug} */
          <BlogDetailsPage
            article={currentArticle}
            allArticles={articles}
            onNavigateBack={() => navigateTo('/blog')}
            onSelectArticle={handleSelectArticle}
            isBookmarked={bookmarkedIds.includes(currentArticle.id)}
            onToggleBookmark={handleToggleBookmark}
            onOpenBookDemo={() => setIsBookDemoOpen(true)}
            onOpenGetStarted={() => setIsGetStartedOpen(true)}
          />
        ) : (
          /* BLOG LANDING PAGE: /blog */
          <main>
            {/* 1. Hero Section */}
            <HeroSection
              onExploreInsights={() => {
                const el = document.getElementById('latest-insights-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onExploreNextSoftHr={() => setIsGetStartedOpen(true)}
              onOpenBookDemo={() => setIsBookDemoOpen(true)}
            />

            {/* 2. Featured Insight */}
            <FeaturedInsight
              article={featuredArticle}
              onSelectArticle={handleSelectArticle}
              isBookmarked={bookmarkedIds.includes(featuredArticle.id)}
              onToggleBookmark={handleToggleBookmark}
            />

            {/* 3. Blog Categories Filter Bar */}
            <CategoryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              selectedSubcategory={selectedSubcategory}
              onSelectSubcategory={setSelectedSubcategory}
            />

            {/* 4. Prominent Search & Tags Interface */}
            <SearchAndFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedTag={selectedTag}
              onSelectTag={setSelectedTag}
              selectedAuthor={selectedAuthor}
              onSelectAuthor={setSelectedAuthor}
              onResetFilters={handleResetFilters}
              totalResults={filteredArticles.length}
            />

            {/* 5. Latest Insights 3-Column Grid with Pagination */}
            <LatestArticlesGrid
              articles={filteredArticles}
              onSelectArticle={handleSelectArticle}
              bookmarkedIds={bookmarkedIds}
              onToggleBookmark={handleToggleBookmark}
            />

            {/* 6. African & Global Workforce Insights */}
            <AfricanWorkforceSection
              onSelectTopic={(topic) => {
                setSearchQuery(topic.split(' ')[0] || '');
                const el = document.getElementById('latest-insights-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onReadPanAfricanInsight={() =>
                handleSelectArticle('the-future-of-work-in-africa-and-beyond')
              }
            />

            {/* 7. AI-Powered HR Showcase */}
            <AiInsightsInteractive
              onExploreAi={() =>
                handleSelectArticle('how-ai-is-transforming-modern-human-resource-management')
              }
            />

            {/* 8. Industry Insights (15 Sectors) */}
            <IndustryInsights onSelectIndustry={handleSelectIndustry} />

            {/* 9. Popular Articles This Month */}
            <PopularArticlesList
              articles={articles}
              onSelectArticle={handleSelectArticle}
            />

            {/* 10. Resources Hub */}
            <ResourcesHub />

            {/* 11. Premium Newsletter Section */}
            <NewsletterSection />

            {/* 12. NextSoftHr Conversion CTA with Platform Mockup */}
            <NextSoftHrConversionCta
              onOpenGetStarted={() => setIsGetStartedOpen(true)}
              onOpenBookDemo={() => setIsBookDemoOpen(true)}
            />
          </main>
        )}
      </div>

      {/* Global SaaS Footer */}
      <Footer
        onNavigate={navigateTo}
        onOpenBookDemo={() => setIsBookDemoOpen(true)}
        onOpenGetStarted={() => setIsGetStartedOpen(true)}
        onOpenSitemap={() => setIsSitemapOpen(true)}
      />

      {/* Interactive Modals & Drawers */}
      {isBookDemoOpen && <BookDemoModal onClose={() => setIsBookDemoOpen(false)} />}
      {isGetStartedOpen && <GetStartedModal onClose={() => setIsGetStartedOpen(false)} />}
      {isBookmarksOpen && (
        <BookmarksDrawer
          isOpen={isBookmarksOpen}
          onClose={() => setIsBookmarksOpen(false)}
          bookmarkedArticles={bookmarkedArticlesList}
          onSelectArticle={handleSelectArticle}
          onRemoveBookmark={handleRemoveBookmark}
          onClearAll={handleClearAllBookmarks}
        />
      )}
      {isCmsAdminOpen && (
        <CmsAdminModal
          articles={articles}
          onClose={() => setIsCmsAdminOpen(false)}
          onSaveArticle={handleSaveArticle}
          onDeleteArticle={handleDeleteArticle}
        />
      )}
      {isSitemapOpen && (
        <SeoSitemapModal
          articles={articles}
          onClose={() => setIsSitemapOpen(false)}
        />
      )}

      {/* Floating Live Chat & Help Dialog */}
      <LiveChatWidget
        onOpenBookDemo={() => setIsBookDemoOpen(true)}
        onOpenGetStarted={() => setIsGetStartedOpen(true)}
      />
    </div>
  );
}
