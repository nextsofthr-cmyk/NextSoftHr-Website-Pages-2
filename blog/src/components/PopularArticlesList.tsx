import React from 'react';
import { Article } from '../types/blog';
import { ArrowRight, Clock, Flame } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface PopularArticlesListProps {
  articles: Article[];
  onSelectArticle: (slug: string) => void;
}

export const PopularArticlesList: React.FC<PopularArticlesListProps> = ({
  articles,
  onSelectArticle,
}) => {
  const { t } = useLanguage();

  // Sort articles by popularity rank or views
  const popularArticles = [...articles]
    .sort((a, b) => (a.popularRank || 99) - (b.popularRank || 99))
    .slice(0, 5);

  return (
    <section className="py-12 bg-white dark:bg-[#061528] border-b border-slate-200 dark:border-[#1E3656] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50/80 dark:bg-[#081B30] rounded-2xl p-6 sm:p-8 lg:p-10 border border-slate-200 dark:border-[#1E3656] transition-colors duration-300">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200 dark:border-[#1E3656]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#8EE000]/20 flex items-center justify-center text-slate-950 dark:text-[#8EE000] font-bold">
                <Flame className="w-4 h-4 text-[#0A3F7E] dark:text-[#8EE000]" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight font-heading">
                {t('popular.title', 'Popular This Month')}
              </h2>
            </div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
              {t('popular.subtitle', 'Most Read Executive Briefings')}
            </span>
          </div>


          {/* Numbered Editorial List */}
          <div className="space-y-4">
            {popularArticles.map((article, index) => {
              const rankStr = `0${index + 1}`;
              return (
                <div
                  key={article.id}
                  onClick={() => onSelectArticle(article.slug)}
                  className="group bg-white dark:bg-[#0B1E36] hover:bg-[#F8FAFC] dark:hover:bg-[#0E2442] rounded-xl p-4 sm:p-5 border border-slate-200/80 dark:border-[#1E3656] hover:border-[#0A3F7E]/30 dark:hover:border-[#8EE000]/40 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer relative overflow-hidden"
                >
                  {/* Subtle Lemon Green Left Accent Bar */}
                  <div className="absolute top-0 bottom-0 left-0 w-1 bg-transparent group-hover:bg-[#8EE000] transition-colors" />

                  <div className="flex items-start sm:items-center gap-4 pl-2">
                    {/* Editorial Number */}
                    <div className="text-2xl sm:text-3xl font-extrabold text-[#0A3F7E] dark:text-[#60A5FA] group-hover:text-[#8EE000] dark:group-hover:text-[#8EE000] transition-colors font-mono tabular-nums shrink-0">
                      {rankStr}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                        <span className="text-[#0A3F7E] dark:text-[#8EE000] font-bold">{article.category}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {article.readingTime}
                        </span>
                        <span>·</span>
                        <span className="font-mono text-slate-400 dark:text-slate-400">{article.views.toLocaleString()} views</span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#0A3F7E] dark:group-hover:text-[#60A5FA] transition-colors line-clamp-1 font-heading">
                        {article.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 self-end md:self-center shrink-0">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                      Read
                    </span>
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#122A4A] group-hover:bg-[#8EE000] group-hover:text-slate-950 flex items-center justify-center transition-all">
                      <ArrowRight className="w-4 h-4 text-slate-700 dark:text-slate-300 group-hover:text-slate-950 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
