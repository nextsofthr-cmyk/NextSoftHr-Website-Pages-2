import React from 'react';
import { Article } from '../types/blog';
import { ArticleCardImage } from './ArticleCardImage';
import { ArrowRight, Clock, Bookmark } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CardSlider } from './CardSlider';

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
            ({articles.length} {t('latest.articlesCount', 'articles')})
          </div>
        </div>

        {/* Empty State */}
        {articles.length === 0 ? (
          <div className="p-12 text-center bg-slate-50 dark:bg-[#0B1E36] rounded-2xl border border-dashed border-slate-300 dark:border-[#1E3656]">
            <p className="text-base font-semibold text-slate-700 dark:text-slate-300">
              {t('latest.noResults', 'No insights matched your active filters.')}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {t('latest.clearPrompt', 'Try clearing your keyword or selecting a different category.')}
            </p>
          </div>
        ) : (
          /* 3-in-a-row Card Slider */
          <CardSlider
            id="latest-insights-slider"
            ariaLabel="Latest Insights"
            items={articles}
            perView={{ base: 1, md: 2, lg: 3, xl: 3 }}
            renderItem={(article) => {
              const isBookmarked = bookmarkedIds.includes(article.id);
              return (
                <article
                  key={article.id}
                  onClick={() => onSelectArticle(article.slug)}
                  className="group flex flex-col bg-slate-50/70 dark:bg-[#0B1E36] hover:bg-white dark:hover:bg-[#0E2442] rounded-2xl overflow-hidden border border-slate-200/90 dark:border-[#1E3656] shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer h-full"
                >
                  {/* Card Visual with Bookmark Toggle */}
                  <div className="relative overflow-hidden">
                    <div className="transform transition-transform duration-500 group-hover:scale-105">
                      <ArticleCardImage
                        category={article.category}
                        title={article.title}
                        imageUrl={article.imageUrl}
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
            }}
          />
        )}
      </div>
    </section>
  );
};
