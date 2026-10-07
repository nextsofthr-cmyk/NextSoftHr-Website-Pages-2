import React from 'react';
import { Article } from '../types/blog';
import { ArticleCardImage } from './ArticleCardImage';
import { ArrowRight, Clock, Bookmark, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FeaturedInsightProps {
  article: Article;
  onSelectArticle: (slug: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
}

export const FeaturedInsight: React.FC<FeaturedInsightProps> = ({
  article,
  onSelectArticle,
  isBookmarked,
  onToggleBookmark,
}) => {
  const { t } = useLanguage();

  return (
    <section className="py-12 bg-white dark:bg-[#061528] border-b border-slate-200 dark:border-[#1E3656] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8EE000]" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight font-heading">
              {t('featured.title', 'Featured Insight')}
            </h2>
          </div>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
            {t('featured.kicker', "Editor's Strategic Pick")}
          </span>
        </div>

        {/* Large Editorial Card with subtle zoom & elevation */}
        <div className="group relative rounded-2xl overflow-hidden bg-slate-50 dark:bg-[#0B1E36] border border-slate-200 dark:border-[#1E3656] shadow-sm hover:shadow-xl transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Visual Canvas (7 Cols) */}
            <div className="lg:col-span-7 relative overflow-hidden min-h-[300px] lg:min-h-[440px]">
              <div className="w-full h-full transform transition-transform duration-500 group-hover:scale-105">
                <ArticleCardImage
                  category={article.category}
                  title={article.title}
                  size="featured"
                  className="h-full"
                />
              </div>

              {/* Bookmark Toggle on top of visual */}
              <button
                onClick={(e) => onToggleBookmark(article.id, e)}
                className={`absolute top-4 right-4 z-20 p-2.5 rounded-xl backdrop-blur-md transition-all ${
                  isBookmarked
                    ? 'bg-[#8EE000] text-slate-950 shadow-md'
                    : 'bg-black/40 text-white hover:bg-black/60'
                }`}
                title={isBookmarked ? 'Remove bookmark' : 'Bookmark this article'}
                aria-label="Bookmark article"
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Editorial Content (5 Cols) */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white dark:bg-[#0B1E36] transition-colors duration-300">
              <div className="space-y-4">
                {/* Category & Kicker */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0A3F7E] dark:text-[#8EE000] bg-[#0A3F7E]/10 dark:bg-[#8EE000]/15 px-3 py-1 rounded-md">
                    {article.category} · {article.subcategory}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-[#8EE000] bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                    <Sparkles className="w-3 h-3 text-[#8EE000]" />
                    <span>{t('featured.deepDive', 'Deep Dive')}</span>
                  </div>
                </div>

                {/* Article Title */}
                <h3
                  onClick={() => onSelectArticle(article.slug)}
                  className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white group-hover:text-[#0A3F7E] dark:group-hover:text-[#8EE000] transition-colors cursor-pointer leading-snug font-heading"
                >
                  {article.title}
                </h3>

                {/* Short Summary */}
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                  {article.summary}
                </p>

                {/* Key Takeaways preview pill list */}
                <div className="pt-2 border-t border-slate-100 dark:border-[#1E3656]">
                  <div className="text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider mb-2 font-mono">
                    {t('featured.takeaways', 'Executive Takeaways')}
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    {article.keyTakeaways.slice(0, 2).map((takeaway, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8EE000] mt-1.5 shrink-0" />
                        <span className="line-clamp-1">{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Author & Read Time Footer */}
              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-[#1E3656] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0A3F7E] text-white flex items-center justify-center font-bold text-xs ring-2 ring-[#8EE000]/40">
                    {article.author.avatar}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{article.author.name}</div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                      <span>{article.publishedDate}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readingTime}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Read Article CTA Button */}
                <button
                  onClick={() => onSelectArticle(article.slug)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-[#8EE000] hover:bg-[#9EF01A] transition-all group-hover:translate-x-0.5 shadow-xs border border-[#7BC500]"
                >
                  <span>{t('featured.readArticle', 'Read Article')}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
