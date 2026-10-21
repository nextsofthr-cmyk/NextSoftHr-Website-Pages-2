import React, { useState, useEffect } from 'react';
import { Article } from '../types/blog';
import { ArticleCardImage } from './ArticleCardImage';
import { BLOG_CATEGORIES } from '../data/categories';
import {
  Clock,
  Calendar,
  Bookmark,
  Check,
  ArrowLeft,
  ArrowRight,
  Search,
  CheckCircle2,
  Mail,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Volume2,
  ShieldCheck,
  Send,
  Linkedin,
  Twitter,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface BlogDetailsPageProps {
  article: Article;
  allArticles: Article[];
  onNavigateBack: () => void;
  onSelectArticle: (slug: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onOpenBookDemo: () => void;
  onOpenGetStarted: () => void;
}

export const BlogDetailsPage: React.FC<BlogDetailsPageProps> = ({
  article,
  allArticles,
  onNavigateBack,
  onSelectArticle,
  isBookmarked,
  onToggleBookmark,
  onOpenBookDemo,
  onOpenGetStarted,
}) => {
  const { t } = useLanguage();
  const [scrollProgress, setScrollProgress] = useState(0);

  const [activeSectionId, setActiveSectionId] = useState<string>(article.sections[0]?.id || '');
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [sidebarSearch, setSidebarSearch] = useState('');
  const [sidebarEmail, setSidebarEmail] = useState('');
  const [sidebarSubscribed, setSidebarSubscribed] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Scroll progress listener and active section tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = windowHeight > 0 ? (totalScroll / windowHeight) * 100 : 0;
      setScrollProgress(progress);

      // Section spy
      const sectionElements = article.sections.map((s) => document.getElementById(s.id));
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160) {
            setActiveSectionId(article.sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSectionId(id);
      setIsMobileTocOpen(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleShare = (platform: 'linkedin' | 'x' | 'whatsapp' | 'facebook') => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(article.title);
    let shareUrl = '';

    if (platform === 'linkedin') {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    } else if (platform === 'x') {
      shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
    } else if (platform === 'whatsapp') {
      shareUrl = `https://api.whatsapp.com/send?text=${title}%20${url}`;
    } else if (platform === 'facebook') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    }
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  // Find 3 related articles
  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id && (a.category === article.category || a.tags.some((t) => article.tags.includes(t))))
    .slice(0, 3);

  // Popular articles for sidebar
  const popularSidebarArticles = allArticles
    .filter((a) => a.id !== article.id)
    .sort((a, b) => (a.popularRank || 99) - (b.popularRank || 99))
    .slice(0, 4);

  return (
    <div className="bg-white dark:bg-[#061528] min-h-screen transition-colors duration-300">
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-100 dark:bg-[#0E2442]">
        <div
          className="h-full bg-[#8EE000] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Article Header & Metadata */}
      <div className="pt-8 pb-10 bg-slate-50 dark:bg-[#07192F] border-b border-slate-200 dark:border-[#1E3656] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6 overflow-x-auto whitespace-nowrap">
            <button
              onClick={onNavigateBack}
              className="hover:text-[#0A3F7E] dark:hover:text-[#8EE000] flex items-center gap-1 font-medium transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t('details.back', 'Back to All Insights')}</span>
            </button>
            <span>/</span>
            <span>Blog</span>
            <span>/</span>
            <span className="font-semibold text-[#0A3F7E] dark:text-[#8EE000]">{article.category}</span>
            <span>/</span>
            <span className="text-slate-400 dark:text-slate-400 truncate max-w-xs">{article.title}</span>
          </nav>

          {/* Category & Badge */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-md text-xs font-bold bg-[#0A3F7E] dark:bg-[#1E40AF] text-white">
              {article.category} · {article.subcategory}
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-300 bg-white dark:bg-[#0B1E36] px-2.5 py-0.5 rounded border border-slate-200 dark:border-[#1E3656]">
              {t('details.verified', 'Verified Executive Analysis')}
            </span>
          </div>

          {/* Article Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight max-w-4xl font-heading mb-5">
            {article.title}
          </h1>

          {/* Short Lead Summary */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mb-8">
            {article.summary}
          </p>

          {/* Author Metadata & Action Ribbon */}
          <div className="pt-6 border-t border-slate-200/80 dark:border-[#1E3656] flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Author Profile */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#0A3F7E] text-white flex items-center justify-center font-bold text-sm ring-2 ring-[#8EE000]/60 shrink-0">
                {article.author.avatar}
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">{article.author.name}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{article.author.role}</div>
                <div className="flex items-center gap-2 text-[11px] text-slate-400 dark:text-slate-400 mt-0.5">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {t('details.published', 'Published on')} {article.publishedDate}
                  </span>
                  <span>·</span>
                  <span>{t('details.updated', 'Updated on')} {article.lastUpdatedDate}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readingTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions: Social Sharing & Bookmarking & Audio Toggle */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Audio Listen Simulation */}
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  isPlayingAudio
                    ? 'bg-[#8EE000]/20 text-slate-950 dark:text-[#8EE000] border-[#8EE000]'
                    : 'bg-white dark:bg-[#0B1E36] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-[#1E3656] hover:bg-slate-100 dark:hover:bg-[#0E2442]'
                }`}
              >
                <Volume2 className={`w-3.5 h-3.5 ${isPlayingAudio ? 'text-[#0A3F7E] dark:text-[#8EE000] animate-pulse' : 'text-slate-500 dark:text-slate-400'}`} />
                <span>{isPlayingAudio ? t('details.listening', 'Playing audio overview...') : `${t('details.listen', 'Listen')} • 6 min`}</span>
              </button>


              {/* Bookmark Toggle */}
              <button
                onClick={(e) => onToggleBookmark(article.id, e)}
                className={`p-2 rounded-xl border transition-all ${
                  isBookmarked
                    ? 'bg-[#8EE000] text-slate-950 border-[#7BC500]'
                    : 'bg-white dark:bg-[#0B1E36] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-[#1E3656] hover:bg-slate-100 dark:hover:bg-[#0E2442]'
                }`}
                title={isBookmarked ? 'Article Bookmarked' : 'Bookmark this article'}
                aria-label="Bookmark article"
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>

              {/* Social Share Buttons */}
              <div className="flex items-center gap-1 bg-white dark:bg-[#0B1E36] p-1 rounded-xl border border-slate-200 dark:border-[#1E3656] shadow-xs">
                <button
                  onClick={() => handleShare('linkedin')}
                  className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-[#0A3F7E] dark:hover:text-[#8EE000] hover:bg-slate-50 dark:hover:bg-[#0E2442] transition-colors"
                  title="Share on LinkedIn"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('x')}
                  className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-[#0A3F7E] dark:hover:text-[#8EE000] hover:bg-slate-50 dark:hover:bg-[#0E2442] transition-colors"
                  title="Share on X"
                  aria-label="Share on X"
                >
                  <Twitter className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('whatsapp')}
                  className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-emerald-600 hover:bg-slate-50 dark:hover:bg-[#0E2442] transition-colors"
                  title="Share on WhatsApp"
                  aria-label="Share on WhatsApp"
                >
                  <Send className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCopyLink}
                  className="px-2.5 py-1 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-[#0A3F7E] dark:hover:text-[#8EE000] hover:bg-slate-50 dark:hover:bg-[#0E2442] rounded-lg transition-colors flex items-center gap-1"
                  title="Copy link to clipboard"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-[#8EE000]" />
                      <span className="text-emerald-700 dark:text-[#8EE000] text-[11px]">{t('details.copied', 'Copied!')}</span>
                    </>
                  ) : (
                    <span>{t('details.copyLink', 'Copy Link')}</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Large Responsive Article Hero Visual */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200 dark:border-[#1E3656]">
          <ArticleCardImage
            category={article.category}
            title={article.title}
            imageUrl={article.imageUrl}
            size="hero"
          />
        </div>
      </div>

      {/* Main Content Area (70% Article / 30% Sidebar) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile Collapsible Table of Contents */}
        <div className="lg:hidden mb-8 bg-slate-50 dark:bg-[#0B1E36] rounded-2xl border border-slate-200 dark:border-[#1E3656] p-4">
          <button
            onClick={() => setIsMobileTocOpen(!isMobileTocOpen)}
            className="w-full flex items-center justify-between text-sm font-bold text-slate-900 dark:text-white"
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#8EE000]" />
              {t('details.toc', 'Table of Contents')} ({article.sections.length} sections)
            </span>
            {isMobileTocOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {isMobileTocOpen && (
            <div className="mt-3 pt-3 border-t border-slate-200 dark:border-[#1E3656] space-y-1.5 text-xs">
              {article.sections.map((sec, idx) => (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className={`w-full text-left py-1.5 px-2 rounded-lg transition-colors ${
                    activeSectionId === sec.id
                      ? 'bg-[#0A3F7E] dark:bg-[#2563EB] text-white font-bold'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#122A4A]'
                  }`}
                >
                  {idx + 1}. {sec.title}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Article Content (70% ~ 8 cols) */}
          <main className="lg:col-span-8">
            {/* Key Takeaways Box */}
            {article.keyTakeaways && article.keyTakeaways.length > 0 && (
              <div className="mb-10 p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#0A3F7E]/5 to-[#8EE000]/10 dark:from-[#0A3F7E]/20 dark:to-[#8EE000]/15 border border-[#0A3F7E]/20 dark:border-[#1E3656] shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0A3F7E] dark:text-[#8EE000] mb-3 font-mono">
                  <Sparkles className="w-4 h-4 text-[#8EE000]" />
                  <span>{t('details.takeaways', 'Executive Key Takeaways')}</span>
                </div>
                <ul className="space-y-2.5 text-sm text-slate-700 dark:text-slate-300">
                  {article.keyTakeaways.map((takeaway, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#8EE000] mt-0.5 shrink-0" />
                      <span className="leading-snug">{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}


            {/* Sections Flow */}
            <div className="space-y-12 text-slate-800 dark:text-slate-200 leading-relaxed font-sans text-base sm:text-lg">
              {article.sections.map((section, idx) => (
                <section key={section.id} id={section.id} className="scroll-mt-24 space-y-5">
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight font-heading border-b border-slate-100 dark:border-[#1E3656] pb-3 flex items-center gap-2.5">
                    <span className="text-[#0A3F7E] dark:text-[#60A5FA] font-mono text-xl sm:text-2xl font-bold">
                      0{idx + 1}.
                    </span>
                    <span>{section.title}</span>
                  </h2>

                  {/* Paragraphs with elegant drop cap on very first paragraph of article */}
                  {section.content.map((p, pIdx) => {
                    const isFirstParagraph = idx === 0 && pIdx === 0;
                    return (
                      <p
                        key={pIdx}
                        className={`text-slate-700 dark:text-slate-300 leading-relaxed ${
                          isFirstParagraph
                            ? 'first-letter:text-5xl first-letter:font-extrabold first-letter:text-[#0A3F7E] dark:first-letter:text-[#8EE000] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none'
                            : ''
                        }`}
                      >
                        {p}
                      </p>
                    );
                  })}

                  {/* Subsections if present */}
                  {section.subsections && section.subsections.length > 0 && (
                    <div className="pt-2 space-y-6">
                      {section.subsections.map((sub, sIdx) => (
                        <div key={sIdx} className="bg-slate-50 dark:bg-[#0B1E36] p-5 rounded-2xl border border-slate-200/80 dark:border-[#1E3656] space-y-2">
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
                            {sub.title}
                          </h3>
                          {sub.content.map((sp, spIdx) => (
                            <p key={spIdx} className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                              {sp}
                            </p>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Editorial Callout Box */}
                  {section.callout && (
                    <div className="my-6 p-5 sm:p-6 rounded-2xl bg-[#051A33] text-white border-l-4 border-[#8EE000] shadow-md space-y-2">
                      <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#8EE000]">
                        {section.callout.title}
                      </div>
                      <p className="text-sm sm:text-base text-slate-200 leading-relaxed italic">
                        &ldquo;{section.callout.text}&rdquo;
                      </p>
                    </div>
                  )}

                  {/* Structured Table */}
                  {section.table && (
                    <div className="my-6 overflow-x-auto rounded-2xl border border-slate-200 dark:border-[#1E3656] shadow-xs">
                      <table className="w-full text-left text-xs sm:text-sm">
                        <thead className="bg-[#0A3F7E] dark:bg-[#072448] text-white font-mono text-xs uppercase tracking-wider">
                          <tr>
                            {section.table.headers.map((h, hi) => (
                              <th key={hi} className="p-3.5 sm:p-4 font-bold border-b border-white/10">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-[#1E3656] bg-white dark:bg-[#0B1E36]">
                          {section.table.rows.map((row, ri) => (
                            <tr key={ri} className="hover:bg-slate-50 dark:hover:bg-[#0E2442] transition-colors">
                              {row.map((cell, ci) => (
                                <td
                                  key={ci}
                                  className={`p-3.5 sm:p-4 text-xs sm:text-sm ${
                                    ci === 0 ? 'font-bold text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300'
                                  }`}
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Checklist */}
                  {section.checklist && (
                    <div className="my-6 bg-slate-50 dark:bg-[#0B1E36] p-5 rounded-2xl border border-slate-200 dark:border-[#1E3656] space-y-2">
                      <div className="text-xs font-bold text-slate-900 dark:text-white font-mono uppercase tracking-wider mb-2">
                        {t('details.checklist', 'Operational Checklist')}
                      </div>
                      <div className="space-y-2">
                        {section.checklist.map((item, ci) => (
                          <div key={ci} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-[#8EE000] mt-0.5 shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* Author Profile Box ("About the Author") */}
            <div className="mt-14 p-6 sm:p-8 bg-slate-50 dark:bg-[#0B1E36] rounded-2xl border border-slate-200 dark:border-[#1E3656] shadow-sm space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#0A3F7E] dark:text-[#8EE000] font-mono">
                {t('details.aboutAuthor', 'About the Author')}
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <div className="w-16 h-16 rounded-full bg-[#0A3F7E] text-white flex items-center justify-center font-bold text-lg ring-4 ring-[#8EE000]/40 shrink-0">
                  {article.author.avatar}
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="text-lg font-bold text-slate-900 dark:text-white">{article.author.name}</div>
                  <div className="text-xs text-[#0A3F7E] dark:text-[#8EE000] font-semibold">{article.author.role}</div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {article.author.bio}
                  </p>
                  <div className="pt-2 flex items-center gap-3 text-xs">
                    {article.author.linkedin && (
                      <a
                        href={article.author.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0A3F7E] dark:text-[#8EE000] font-bold hover:underline flex items-center gap-1"
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                        <span>LinkedIn Profile</span>
                      </a>
                    )}
                    <span className="text-slate-300 dark:text-slate-400">·</span>
                    <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                      {article.author.articleCount} {t('details.publishedArticles', 'Published Articles')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contextual Bottom Article CTA */}
            <div className="mt-10 p-8 rounded-3xl bg-gradient-to-br from-[#0A3F7E] to-[#051A33] text-white space-y-4 shadow-xl">
              <div className="inline-block text-xs font-mono font-bold text-[#8EE000] uppercase tracking-wider">
                {t('details.nextStep', 'Take the Next Step Toward Smarter HR')}
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white font-heading">
                {t('details.nextStepTitle', 'Discover How NextSoftHr Powers Modern Workplaces')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-xl">
                {t('details.nextStepDesc', 'Discover how NextSoftHr can help your organization manage people, payroll and workforce operations from one platform.')}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="https://demo.scriptmaster.store/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl text-xs font-bold text-slate-950 bg-[#8EE000] hover:bg-[#9EF01A] transition-all flex items-center gap-1.5 shadow-md border border-[#7BC500]"
                >
                  <span>Explore Live Demo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="/signup"
                  className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all flex items-center justify-center cursor-pointer"
                >
                  <span>{t('nav.getStarted', 'Get Started')}</span>
                </a>
                <button
                  onClick={onOpenBookDemo}
                  className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
                >
                  <span>{t('nav.bookDemo', 'Book a Demo')}</span>
                </button>
              </div>
            </div>

          </main>

          {/* Sticky Desktop Sidebar (30% ~ 4 cols) */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Sticky Table of Contents */}
            <div className="sticky top-24 space-y-6">
              <div className="bg-slate-50 dark:bg-[#0B1E36] rounded-2xl border border-slate-200 dark:border-[#1E3656] p-5 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0A3F7E] dark:text-[#8EE000] mb-3 font-mono">
                  <span className="w-2 h-2 rounded-full bg-[#8EE000]" />
                  <span>{t('details.toc', 'Table of Contents')}</span>
                </div>
                <nav className="space-y-1 text-xs">
                  {article.sections.map((sec, i) => {
                    const isActive = activeSectionId === sec.id;
                    return (
                      <button
                        key={sec.id}
                        onClick={() => scrollToSection(sec.id)}
                        className={`w-full text-left py-1.5 px-2.5 rounded-lg transition-all flex items-center justify-between ${
                          isActive
                            ? 'bg-[#0A3F7E] dark:bg-[#2563EB] text-white font-bold shadow-xs'
                            : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#0E2442]'
                        }`}
                      >
                        <span className="truncate pr-2">
                          0{i + 1}. {sec.title}
                        </span>
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#8EE000] shrink-0" />}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Sidebar Search */}
              <div className="bg-white dark:bg-[#0B1E36] rounded-2xl border border-slate-200 dark:border-[#1E3656] p-5 shadow-xs space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white font-mono">
                  {t('details.sidebarSearch', 'Search Articles')}
                </h4>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={sidebarSearch}
                    onChange={(e) => setSidebarSearch(e.target.value)}
                    placeholder={t('details.sidebarSearch', 'Search articles...')}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-[#1E3656] bg-white dark:bg-[#07192F] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0A3F7E] dark:focus:ring-[#8EE000]"
                  />
                </div>
              </div>

              {/* Categories Widget */}
              <div className="bg-white dark:bg-[#0B1E36] rounded-2xl border border-slate-200 dark:border-[#1E3656] p-5 shadow-xs space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white font-mono">
                  {t('cat.hrManagement', 'Categories')}
                </h4>
                <div className="space-y-1.5 text-xs">
                  {BLOG_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={onNavigateBack}
                      className="w-full flex items-center justify-between py-1 px-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-[#0A3F7E] dark:hover:text-[#8EE000] hover:bg-slate-50 dark:hover:bg-[#0E2442] transition-colors"
                    >
                      <span>{cat.name}</span>
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-100 dark:bg-[#122A4A] px-1.5 py-0.5 rounded">
                        {cat.articleCount}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Posts Widget */}
              <div className="bg-white dark:bg-[#0B1E36] rounded-2xl border border-slate-200 dark:border-[#1E3656] p-5 shadow-xs space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white font-mono">
                  {t('details.sidebarPopular', 'Popular Articles')}
                </h4>
                <div className="space-y-3">
                  {popularSidebarArticles.map((pop) => (
                    <div
                      key={pop.id}
                      onClick={() => onSelectArticle(pop.slug)}
                      className="group cursor-pointer space-y-1 pb-3 border-b border-slate-100 dark:border-[#1E3656] last:border-0 last:pb-0"
                    >
                      <span className="text-[10px] font-bold text-[#0A3F7E] dark:text-[#8EE000] uppercase">
                        {pop.category}
                      </span>
                      <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-[#0A3F7E] dark:group-hover:text-[#60A5FA] transition-colors line-clamp-2">
                        {pop.title}
                      </h5>
                      <span className="text-[10px] text-slate-400 dark:text-slate-400 font-mono">
                        {pop.readingTime}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Newsletter Widget */}
              <div className="bg-[#051A33] text-white rounded-2xl p-5 border border-slate-800 dark:border-[#1E3656] shadow-md space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#8EE000]">
                  <Mail className="w-3.5 h-3.5" />
                  <span>{t('details.sidebarNewsletter', 'Weekly Executive Dispatch')}</span>
                </div>
                <p className="text-xs text-slate-300">
                  {t('newsletter.subtitle', 'Get the latest HR, payroll, workforce technology and business-management insights delivered directly to your inbox.')}
                </p>
                {sidebarSubscribed ? (
                  <div className="p-3 bg-white/10 rounded-xl text-center text-xs font-semibold text-[#8EE000]">
                    ✓ {t('newsletter.success', 'Subscribed!')}
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (sidebarEmail) setSidebarSubscribed(true);
                    }}
                    className="space-y-2"
                  >
                    <input
                      type="email"
                      required
                      value={sidebarEmail}
                      onChange={(e) => setSidebarEmail(e.target.value)}
                      placeholder={t('newsletter.emailLabel', 'Your corporate email')}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8EE000]"
                    />
                    <button
                      type="submit"
                      className="w-full py-2.5 text-xs font-bold text-slate-950 bg-[#8EE000] hover:bg-[#9EF01A] rounded-xl transition-all border border-[#7BC500]"
                    >
                      {t('newsletter.subscribe', 'Subscribe')}
                    </button>
                  </form>
                )}
              </div>

              {/* Product CTA Banner */}
              <div className="bg-gradient-to-br from-[#0A3F7E] to-[#041E3D] text-white rounded-2xl p-6 border border-white/10 shadow-lg text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#8EE000] text-slate-950 flex items-center justify-center mx-auto font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white font-heading">
                  {t('details.sidebarCta', 'Transform Your HR Operations')}
                </h4>
                <p className="text-xs text-slate-300">
                  {t('cta.subtitle', 'Manage HR, payroll, attendance, talent, finance and business operations from one intelligent platform.')}
                </p>
                <a
                  href="/signup"
                  className="block w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-950 bg-[#8EE000] hover:bg-[#9EF01A] transition-all border border-[#7BC500] text-center cursor-pointer"
                >
                  {t('nav.getStarted', 'Get Started')}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Related Articles ("You May Also Like") */}
      {relatedArticles.length > 0 && (
        <section className="py-16 bg-slate-50 dark:bg-[#07192F] border-t border-slate-200 dark:border-[#1E3656] transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8EE000]" />
                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight font-heading">
                  {t('details.youMayLike', 'You May Also Like')}
                </h3>
              </div>
              <button
                onClick={onNavigateBack}
                className="text-xs font-bold text-[#0A3F7E] dark:text-[#8EE000] hover:underline flex items-center gap-1"
              >
                <span>{t('details.viewAll', 'View All Articles')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectArticle(rel.slug)}
                  className="group bg-white dark:bg-[#0B1E36] rounded-2xl overflow-hidden border border-slate-200 dark:border-[#1E3656] hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative">
                    <ArticleCardImage category={rel.category} title={rel.title} imageUrl={rel.imageUrl} size="card" />
                    <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded text-[10px] font-bold bg-[#0A3F7E] dark:bg-[#1E40AF] text-white">
                      {rel.category}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <div className="text-[11px] text-slate-400 dark:text-slate-400 font-mono">{rel.publishedDate}</div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#0A3F7E] dark:group-hover:text-[#60A5FA] transition-colors line-clamp-2">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                        {rel.excerpt}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-[#1E3656] flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">{rel.author.name}</span>
                      <span className="text-[#0A3F7E] dark:text-[#8EE000] font-bold flex items-center gap-1">
                        {t('popular.read', 'Read')}
                        <ArrowRight className="w-3 h-3 text-[#8EE000]" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
};
