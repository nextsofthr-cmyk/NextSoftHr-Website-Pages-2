import React from 'react';
import { Article } from '../types/blog';
import { X, Bookmark, Trash2, ArrowRight, Clock } from 'lucide-react';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedArticles: Article[];
  onSelectArticle: (slug: string) => void;
  onRemoveBookmark: (id: string) => void;
  onClearAll: () => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  bookmarkedArticles,
  onSelectArticle,
  onRemoveBookmark,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-[#0B1E36] h-full shadow-2xl flex flex-col justify-between border-l border-slate-200 dark:border-[#1E3656] animate-in slide-in-from-right duration-300 transition-colors">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-[#1E3656] flex items-center justify-between bg-slate-50 dark:bg-[#07192F]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#0A3F7E] text-[#8EE000] flex items-center justify-center">
              <Bookmark className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white font-heading">
                Saved Executive Insights
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                {bookmarkedArticles.length} article{bookmarkedArticles.length === 1 ? '' : 's'} in your reading list
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-[#122A4A] transition-colors"
            aria-label="Close bookmarks drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {bookmarkedArticles.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-[#07192F] flex items-center justify-center mx-auto text-slate-400">
                <Bookmark className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No saved insights yet</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                Click the bookmark icon on any article or insight card to build your executive reading queue.
              </p>
            </div>
          ) : (
            bookmarkedArticles.map((art) => (
              <div
                key={art.id}
                className="group p-3.5 bg-slate-50 dark:bg-[#07192F] hover:bg-white dark:hover:bg-[#0E2442] rounded-xl border border-slate-200 dark:border-[#1E3656] hover:border-[#0A3F7E]/40 dark:hover:border-[#8EE000]/40 hover:shadow-xs transition-all space-y-2 relative"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-bold text-[#0A3F7E] dark:text-[#8EE000] uppercase bg-[#0A3F7E]/10 dark:bg-[#8EE000]/15 px-2 py-0.5 rounded">
                    {art.category}
                  </span>
                  <button
                    onClick={() => onRemoveBookmark(art.id)}
                    className="text-slate-400 hover:text-red-500 p-1 rounded transition-colors"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h4
                  onClick={() => {
                    onSelectArticle(art.slug);
                    onClose();
                  }}
                  className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#0A3F7E] dark:group-hover:text-[#60A5FA] transition-colors cursor-pointer line-clamp-2 leading-snug"
                >
                  {art.title}
                </h4>

                <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-[#1E3656]">
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3" />
                    {art.readingTime}
                  </span>
                  <button
                    onClick={() => {
                      onSelectArticle(art.slug);
                      onClose();
                    }}
                    className="text-[#0A3F7E] dark:text-[#8EE000] font-bold hover:underline flex items-center gap-0.5"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-3 h-3 text-[#8EE000]" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {bookmarkedArticles.length > 0 && (
          <div className="p-4 border-t border-slate-200 dark:border-[#1E3656] bg-slate-50 dark:bg-[#07192F] flex items-center justify-between text-xs">
            <button
              onClick={onClearAll}
              className="text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 font-semibold"
            >
              Clear Reading List
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg font-bold text-slate-950 bg-[#8EE000] hover:bg-[#9EF01A] border border-[#7BC500]"
            >
              Done Reading
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
