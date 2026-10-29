import React from 'react';
import { X, Clock, User, BookOpen, Share2, ArrowLeft } from 'lucide-react';
import { Article } from '../types';

interface ArticleModalProps {
  article: Article | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  isOpen,
  onClose
}) => {
  if (!isOpen || !article) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div 
        className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between shrink-0">
          <span className="text-xs font-mono font-bold text-[#2563EB] dark:text-blue-400 uppercase">
            {article.category}
          </span>
          <button onClick={onClose} className="p-1.5 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto space-y-5">
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#142B4A] dark:text-white tracking-tight leading-snug">
            {article.title}
          </h1>

          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 pb-3 border-b border-slate-100 dark:border-slate-800">
            <span>By <strong className="text-slate-700 dark:text-slate-200">{article.author}</strong> ({article.authorRole})</span>
            <span>·</span>
            <span>{article.publishedDate}</span>
            <span>·</span>
            <span>{article.readTime}</span>
          </div>

          <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-4">
            <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm">
              {article.excerpt}
            </p>
            <p>
              {article.content}
            </p>
            <p>
              Key takeaways for professionals in African and emerging tech markets include regular recalibration of functional deliverables, continuous investment in industry-accredited certifications (e.g. CIPM, SHRM, ACA, CFA, AWS), and maintaining transparent dialogue regarding performance milestones and compensation expectations.
            </p>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
              <strong className="text-slate-800 dark:text-white">Need hiring or career guidance?</strong> NextSoftHR's talent advisory team provides confidential executive career mapping and organizational design consultations.
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex gap-1.5">
              {article.tags.map(t => (
                <span key={t} className="text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-transparent dark:border-slate-700 px-2.5 py-0.5 rounded">
                  #{t}
                </span>
              ))}
            </div>
            <button onClick={onClose} className="text-xs text-[#2563EB] dark:text-blue-400 font-bold hover:underline cursor-pointer">
              Close Reader
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
