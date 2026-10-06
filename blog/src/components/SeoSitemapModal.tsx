import React, { useState } from 'react';
import { Article } from '../types/blog';
import { X, Rss, Check, Copy } from 'lucide-react';

interface SeoSitemapModalProps {
  articles: Article[];
  onClose: () => void;
}

export const SeoSitemapModal: React.FC<SeoSitemapModalProps> = ({ articles, onClose }) => {
  const [activeTab, setActiveTab] = useState<'sitemap' | 'rss'>('sitemap');
  const [isCopied, setIsCopied] = useState(false);

  const xmlSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.nextsofthr.org/blog</loc>
    <lastmod>2026-09-26</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
${articles
  .map(
    (a) => `  <url>
    <loc>https://www.nextsofthr.org/blog/${a.slug}</loc>
    <lastmod>2026-09-26</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>NextSoftHr Workforce &amp; Payroll Insights</title>
  <link>https://www.nextsofthr.org/blog</link>
  <description>Practical HR, payroll, workforce and business-management insights from NextSoftHr.</description>
  <language>en-us</language>
  <lastBuildDate>Sat, 26 Sep 2026 09:00:00 GMT</lastBuildDate>
${articles
  .map(
    (a) => `  <item>
    <title><![CDATA[${a.title}]]></title>
    <link>https://www.nextsofthr.org/blog/${a.slug}</link>
    <description><![CDATA[${a.excerpt}]]></description>
    <category>${a.category}</category>
    <author>${a.author.name}</author>
    <guid>https://www.nextsofthr.org/blog/${a.slug}</guid>
    <pubDate>${a.publishedDate} 08:00:00 GMT</pubDate>
  </item>`
  )
  .join('\n')}
</channel>
</rss>`;

  const currentContent = activeTab === 'sitemap' ? xmlSitemap : rssFeed;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentContent);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0B1E36] rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-[#1E3656] relative flex flex-col max-h-[85vh] transition-colors duration-300">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-[#1E3656]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0A3F7E] text-[#8EE000] flex items-center justify-center">
              <Rss className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                NextSoftHr Syndication &amp; SEO Architecture
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                W3C XML 1.0 &amp; RSS 2.0 Compliant Feeds
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-[#122A4A]"
            aria-label="Close SEO modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-between pt-4 pb-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('sitemap')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'sitemap'
                  ? 'bg-[#0A3F7E] dark:bg-[#2563EB] text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-[#07192F] text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#0E2442]'
              }`}
            >
              XML Sitemap (/sitemap.xml)
            </button>
            <button
              onClick={() => setActiveTab('rss')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'rss'
                  ? 'bg-[#0A3F7E] dark:bg-[#2563EB] text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-[#07192F] text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#0E2442]'
              }`}
            >
              RSS Feed (/blog/rss.xml)
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#0A3F7E] dark:text-[#8EE000] hover:bg-[#0A3F7E]/10 dark:hover:bg-[#8EE000]/10 border border-[#0A3F7E]/30 dark:border-[#8EE000]/30 flex items-center gap-1.5 transition-colors"
          >
            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-[#8EE000]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{isCopied ? 'Copied' : 'Copy Feed Code'}</span>
          </button>
        </div>

        {/* Code Content Box */}
        <div className="flex-1 overflow-y-auto bg-slate-900 dark:bg-[#061528] text-slate-200 p-4 rounded-2xl font-mono text-[11px] leading-relaxed my-3 border border-slate-800 dark:border-[#1E3656]">
          <pre>{currentContent}</pre>
        </div>

        <div className="pt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Automatically synchronizes whenever articles are published via CMS</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-[#8EE000] hover:bg-[#9EF01A] border border-[#7BC500]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
