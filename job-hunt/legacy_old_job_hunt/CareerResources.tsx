import React from 'react';
import { 
  Clock, 
  ArrowRight 
} from 'lucide-react';
import { Article } from '../types';

interface CareerResourcesProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const CareerResources: React.FC<CareerResourcesProps> = ({
  articles,
  onSelectArticle
}) => {
  return (
    <section id="resources" className="py-20 bg-[#F8FAFC] dark:bg-[#090D16] border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] dark:text-lime-400">
              Talent & HR Insights
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142B4A] dark:text-white tracking-tight mt-1">
              Resources to Help You Grow
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 max-w-xl">
              Practical guides on interview excellence, compensation benchmarking, and organizational scaling from NextSoftHR talent specialists.
            </p>
          </div>

          <button
            onClick={() => onSelectArticle(articles[0])}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563EB] dark:text-blue-400 hover:text-[#1D4ED8] dark:hover:text-lime-400 transition-colors whitespace-nowrap self-start sm:self-auto cursor-pointer"
          >
            <span>View All Resources</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article) => (
            <article
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 hover:border-blue-300 dark:hover:border-lime-400/40 hover:shadow-lg dark:hover:shadow-black/60 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Visual Header / Category Indicator */}
                <div className="h-32 rounded-xl bg-gradient-to-br from-[#142B4A] to-slate-800 dark:from-[#0B1120] dark:to-[#131D31] p-4 flex flex-col justify-between text-white relative overflow-hidden mb-4 border border-slate-700/50 dark:border-slate-800">
                  <div className="flex items-center justify-between text-[11px] font-semibold">
                    <span className="text-blue-300 dark:text-lime-400 font-mono">{article.category}</span>
                    <span className="flex items-center gap-1 text-slate-300 dark:text-slate-400 text-[10px]">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>

                  <div className="text-xs font-bold text-slate-200 line-clamp-2">
                    {article.tags.join(' · ')}
                  </div>
                </div>

                <h3 className="text-sm font-bold text-[#142B4A] dark:text-white group-hover:text-[#2563EB] dark:group-hover:text-blue-400 transition-colors leading-snug line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              {/* Footer */}
              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>{article.publishedDate}</span>
                <span className="text-[#2563EB] dark:text-blue-400 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
