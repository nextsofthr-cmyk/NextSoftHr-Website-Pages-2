import React, { useState } from 'react';
import { Article, ArticleStatus } from '../types/blog';
import { BLOG_CATEGORIES } from '../data/categories';
import { AUTHORS } from '../data/mockArticles';
import { X, Plus, Sparkles, Eye, Globe } from 'lucide-react';

interface CmsAdminModalProps {
  articles: Article[];
  onClose: () => void;
  onSaveArticle: (article: Article) => void;
  onDeleteArticle: (id: string) => void;
}

export const CmsAdminModal: React.FC<CmsAdminModalProps> = ({
  articles,
  onClose,
  onSaveArticle,
}) => {
  const [activeTab, setActiveTab] = useState<'articles' | 'new' | 'seo-preview'>('articles');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(articles[0] || null);

  // New Article Form State
  const [formData, setFormData] = useState<Partial<Article>>({
    title: '',
    category: 'HR Management',
    subcategory: 'HR strategy',
    excerpt: '',
    summary: '',
    status: 'Published',
    readingTime: '5 min read',
    tags: ['HR Strategy', 'Enterprise'],
    metaTitle: '',
    metaDescription: '',
    canonicalUrl: '',
    keyTakeaways: ['Key finding 1', 'Key finding 2'],
  });

  const statuses: ArticleStatus[] = ['Draft', 'Review', 'Scheduled', 'Published', 'Archived'];

  const handleCreateNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const newArticle: Article = {
      id: `art-${Date.now()}`,
      slug,
      title: formData.title || 'Untitled Article',
      excerpt: formData.excerpt || 'Brief overview of workplace insight.',
      summary: formData.summary || formData.excerpt || '',
      category: formData.category || 'HR Management',
      subcategory: formData.subcategory || 'HR strategy',
      author: AUTHORS.editorial,
      publishedDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      lastUpdatedDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readingTime: formData.readingTime || '5 min read',
      views: 120,
      tags: formData.tags || ['Workforce'],
      status: (formData.status as ArticleStatus) || 'Published',
      metaTitle: formData.metaTitle || `${formData.title} | NextSoftHr`,
      metaDescription: formData.metaDescription || formData.excerpt || '',
      canonicalUrl: `https://www.nextsofthr.org/blog/${slug}`,
      coverGradient: {
        from: '#0A3F7E',
        to: '#051A33',
        accent: '#8EE000',
      },
      keyTakeaways: formData.keyTakeaways || ['Strategic implementation note.'],
      sections: [
        {
          id: 'overview',
          title: 'Strategic Overview',
          content: [
            formData.summary || 'Detailed executive insight on modern workforce systems.',
            'Further empirical analysis demonstrating the strategic integration with NextSoftHr.',
          ],
        },
      ],
    };

    onSaveArticle(newArticle);
    setSelectedArticle(newArticle);
    setActiveTab('articles');
  };

  const currentPreview = selectedArticle || articles[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0B1E36] rounded-3xl max-w-5xl w-full h-[90vh] shadow-2xl border border-slate-200 dark:border-[#1E3656] flex flex-col overflow-hidden transition-colors duration-300">
        {/* Modal Header */}
        <div className="bg-[#051A33] px-6 py-4 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#8EE000] text-slate-950 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold flex items-center gap-2">
                <span>NextSoftHr Editorial CMS Studio</span>
                <span className="text-[10px] font-mono text-[#8EE000] bg-[#8EE000]/15 px-2 py-0.5 rounded border border-[#8EE000]/30">
                  Headless CMS Architecture
                </span>
              </div>
              <div className="text-[11px] text-slate-400">Content Pipeline, Workflow Governance & SEO Inspector</div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close CMS modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CMS Sub-Navbar */}
        <div className="bg-slate-50 dark:bg-[#07192F] px-6 py-2.5 border-b border-slate-200 dark:border-[#1E3656] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('articles')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                activeTab === 'articles'
                  ? 'bg-[#0A3F7E] dark:bg-[#2563EB] text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#122A4A]'
              }`}
            >
              All Articles ({articles.length})
            </button>
            <button
              onClick={() => setActiveTab('new')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors flex items-center gap-1 ${
                activeTab === 'new'
                  ? 'bg-[#0A3F7E] dark:bg-[#2563EB] text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#122A4A]'
              }`}
            >
              <Plus className="w-3.5 h-3.5 text-[#8EE000]" />
              <span>Compose Insight</span>
            </button>
            <button
              onClick={() => setActiveTab('seo-preview')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors flex items-center gap-1 ${
                activeTab === 'seo-preview'
                  ? 'bg-[#0A3F7E] dark:bg-[#2563EB] text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#122A4A]'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-[#8EE000]" />
              <span>SEO & Social Card Inspector</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
            <span>Workflow: Draft → Review → Scheduled → Published → Archived</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'articles' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider font-mono">
                  Managed Editorial Posts
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">Live Production Index</span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-[#1E3656]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 dark:bg-[#07192F] text-slate-700 dark:text-slate-300 font-mono text-[11px] uppercase">
                    <tr>
                      <th className="p-3">Title & Category</th>
                      <th className="p-3">Author</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Pub Date</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-[#1E3656]">
                    {articles.map((art) => (
                      <tr key={art.id} className="hover:bg-slate-50 dark:hover:bg-[#0E2442] transition-colors">
                        <td className="p-3 font-medium text-slate-900 dark:text-white max-w-xs">
                          <div className="font-bold truncate">{art.title}</div>
                          <div className="text-[11px] text-[#0A3F7E] dark:text-[#8EE000] font-semibold">{art.category}</div>
                        </td>
                        <td className="p-3 text-slate-600 dark:text-slate-300">{art.author.name}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                              art.status === 'Published'
                                ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-[#8EE000]'
                                : art.status === 'Draft'
                                ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                                : 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300'
                            }`}
                          >
                            {art.status}
                          </span>
                        </td>
                        <td className="p-3 text-slate-500 dark:text-slate-400 font-mono text-[11px]">{art.publishedDate}</td>
                        <td className="p-3 text-right space-x-2">
                          <button
                            onClick={() => {
                              setSelectedArticle(art);
                              setActiveTab('seo-preview');
                            }}
                            className="p-1 text-slate-500 hover:text-[#0A3F7E] dark:hover:text-[#8EE000]"
                            title="Inspect SEO & Schema"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'new' && (
            <form onSubmit={handleCreateNew} className="space-y-4 max-w-2xl mx-auto">
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                Compose New NextSoftHr Editorial Article
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Article Title
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Navigating Statutory Tax Tables Across African Tech Hubs"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 dark:border-[#1E3656] bg-white dark:bg-[#07192F] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0A3F7E] dark:focus:ring-[#8EE000]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Primary Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 dark:border-[#1E3656] bg-white dark:bg-[#07192F] text-slate-900 dark:text-white"
                  >
                    {BLOG_CATEGORIES.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Publication Status Workflow
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as ArticleStatus })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 dark:border-[#1E3656] bg-white dark:bg-[#07192F] text-slate-900 dark:text-white"
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Excerpt / Lead Deck
                  </label>
                  <textarea
                    rows={2}
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="Concise 2-sentence summary for card previews..."
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 dark:border-[#1E3656] bg-white dark:bg-[#07192F] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0A3F7E] dark:focus:ring-[#8EE000]"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('articles')}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#122A4A] rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-slate-950 bg-[#8EE000] hover:bg-[#9EF01A] rounded-lg shadow-xs border border-[#7BC500]"
                >
                  Publish to Platform
                </button>
              </div>
            </form>
          )}

          {activeTab === 'seo-preview' && currentPreview && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white font-heading">
                    SEO & Social Graph Inspector
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Inspecting: <span className="font-semibold text-[#0A3F7E] dark:text-[#8EE000]">{currentPreview.title}</span>
                  </p>
                </div>
                <select
                  value={currentPreview.id}
                  onChange={(e) => {
                    const found = articles.find((a) => a.id === e.target.value);
                    if (found) setSelectedArticle(found);
                  }}
                  className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-[#1E3656] bg-white dark:bg-[#07192F] text-slate-900 dark:text-white"
                >
                  {articles.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Google SERP Preview */}
              <div className="bg-slate-50 dark:bg-[#07192F] p-5 rounded-2xl border border-slate-200 dark:border-[#1E3656] space-y-2">
                <div className="text-[11px] font-mono font-bold uppercase text-slate-400 dark:text-slate-400">
                  Google Search Snippet Simulation (Desktop SERP)
                </div>
                <div className="bg-white dark:bg-[#0B1E36] p-4 rounded-xl border border-slate-200 dark:border-[#1E3656] max-w-2xl space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                    <span className="w-4 h-4 rounded-full bg-[#0A3F7E] text-[10px] text-white flex items-center justify-center font-bold">N</span>
                    <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">https://www.nextsofthr.org &gt; blog &gt; {currentPreview.slug}</span>
                  </div>
                  <div className="text-base text-[#1a0dab] dark:text-[#60A5FA] font-medium hover:underline cursor-pointer">
                    {currentPreview.metaTitle}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                    {currentPreview.metaDescription}
                  </p>
                </div>
              </div>

              {/* Open Graph Social Card Preview */}
              <div className="bg-slate-50 dark:bg-[#07192F] p-5 rounded-2xl border border-slate-200 dark:border-[#1E3656] space-y-2">
                <div className="text-[11px] font-mono font-bold uppercase text-slate-400 dark:text-slate-400">
                  Open Graph (LinkedIn & X Card Preview)
                </div>
                <div className="bg-white dark:bg-[#0B1E36] rounded-xl border border-slate-200 dark:border-[#1E3656] overflow-hidden max-w-md shadow-xs">
                  <div className="h-40 bg-gradient-to-r from-[#0A3F7E] to-[#051A33] p-4 text-white flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase bg-white/20 px-2 py-0.5 rounded text-[#8EE000]">
                        {currentPreview.category}
                      </span>
                      <span className="text-[10px] font-mono text-slate-300">nextsofthr.org</span>
                    </div>
                    <div className="font-black text-sm text-white line-clamp-2">
                      {currentPreview.title}
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-[#07192F] border-t border-slate-200 dark:border-[#1E3656] space-y-0.5">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">nextsofthr.org</div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white truncate">{currentPreview.metaTitle}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{currentPreview.metaDescription}</div>
                  </div>
                </div>
              </div>

              {/* JSON-LD Schema Snippet */}
              <div className="bg-slate-900 dark:bg-[#051424] text-slate-200 p-4 rounded-2xl font-mono text-[11px] space-y-1 overflow-x-auto border border-slate-800 dark:border-[#1E3656]">
                <div className="text-[#8EE000] font-bold">// Schema.org Article Structured Data (JSON-LD)</div>
                <pre>{JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Article",
                  "headline": currentPreview.title,
                  "description": currentPreview.metaDescription,
                  "author": {
                    "@type": "Person",
                    "name": currentPreview.author.name
                  },
                  "publisher": {
                    "@type": "Organization",
                    "name": "NextSoftHr",
                    "url": "https://www.nextsofthr.org"
                  },
                  "datePublished": currentPreview.publishedDate,
                  "mainEntityOfPage": currentPreview.canonicalUrl
                }, null, 2)}</pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
