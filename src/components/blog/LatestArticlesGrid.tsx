import React, { useState } from 'react';
import { Article } from '../types/blog';
import { ArticleCardImage } from './ArticleCardImage';
import { ArrowRight, Clock, Bookmark, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface LatestArticlesGridProps {
  articles: Article[];
  onSelectArticle: (slug: string) => void;
  bookmarkedIds: string[];
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
}

export const LatestArticlesGrid: React.FC<LatestArticlesGridProps> = ({
  articles,
  onSelectArticle,
  bookmarkedIds,
  onToggleBookmark,
}) => {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(articles.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentArticles = articles.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const element = document.getElementById('latest-insights-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="latest-insights-section" className="py-12 bg-white dark:bg-[#061528] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0A3F7E] dark:text-[#8EE000] mb-1">
              <span className="w-2 h-2 rounded-full bg-[#8EE000]" />
              <span>{t('latest.curated', 'Curated Knowledge')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight font-heading">
              {t('latest.title', 'Latest Insights')}
            </h2>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            {t('latest.page', 'Page')} {currentPage} {t('latest.of', 'of')} {totalPages} ({articles.length} articles)
          </div>
        </div>

        {/* Empty State */}
        {currentArticles.length === 0 ? (
          <div className="p-12 text-center bg-slate-50 dark:bg-[#0B1E36] rounded-2xl border border-dashed border-slate-300 dark:border-[#1E3656]">
            <p className="text-base font-semibold text-slate-700 dark:text-slate-300">
              {t('latest.noResults', 'No insights matched your active filters.')}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {t('latest.clearPrompt', 'Try clearing your keyword or selecting a different category.')}
            </p>
          </div>
        ) : (

          /* 3-Column Responsive Grid on Desktop */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentArticles.map((article) => {
              const isBookmarked = bookmarkedIds.includes(article.id);
              return (
                <article
                  key={article.id}
                  onClick={() => onSelectArticle(article.slug)}
                  className="group flex flex-col bg-slate-50/70 dark:bg-[#0B1E36] hover:bg-white dark:hover:bg-[#0E2442] rounded-2xl overflow-hidden border border-slate-200/90 dark:border-[#1E3656] shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  {/* Card Visual with Bookmark Toggle */}
                  <div className="relative overflow-hidden">
                    <div className="transform transition-transform duration-500 group-hover:scale-105">
                      <ArticleCardImage
                        category={article.category}
                        title={article.title}
                        size="card"
                      />
                    </div>

                    {/* Bookmark Button */}
                    <button
                      onClick={(e) => onToggleBookmark(article.id, e)}
                      className={`absolute top-3 right-3 z-10 p-2 rounded-lg backdrop-blur-md transition-all ${
                        isBookmarked
                          ? 'bg-[#8EE000] text-slate-950 shadow-sm'
                          : 'bg-black/40 text-white hover:bg-black/60'
                      }`}
                      title={isBookmarked ? 'Remove bookmark' : 'Bookmark this article'}
                      aria-label="Bookmark article"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
                    </button>

                    {/* Category Label Overlay */}
                    <div className="absolute bottom-3 left-3 z-10">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#0A3F7E] dark:bg-[#1E40AF] text-white shadow-xs">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                        <span>{article.publishedDate}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {article.readingTime}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#0A3F7E] dark:group-hover:text-[#60A5FA] transition-colors leading-snug line-clamp-2 font-heading">
                        {article.title}
                      </h3>

                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>

                    {/* Card Footer */}
                    <div className="pt-4 border-t border-slate-200/80 dark:border-[#1E3656] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#0A3F7E] text-white text-[10px] font-bold flex items-center justify-center">
                          {article.author.avatar}
                        </div>
                        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
                          {article.author.name}
                        </span>
                      </div>

                      <div className="inline-flex items-center gap-1 text-xs font-bold text-[#0A3F7E] dark:text-[#8EE000] group-hover:text-slate-950 dark:group-hover:text-white transition-colors">
                        <span>{t('latest.readMore', 'Read More')}</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-[#8EE000]" />
                      </div>

                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 pt-6 border-t border-slate-200 dark:border-[#1E3656] flex items-center justify-center gap-2">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-slate-200 dark:border-[#1E3656] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#0E2442] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }).map((_, i) => {
              const page = i + 1;
              const isActive = page === currentPage;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-9 h-9 rounded-lg text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#0A3F7E] dark:bg-[#2563EB] text-white shadow-xs'
                      : 'border border-slate-200 dark:border-[#1E3656] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#0E2442]'
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-slate-200 dark:border-[#1E3656] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#0E2442] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
