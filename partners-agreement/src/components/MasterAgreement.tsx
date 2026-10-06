import React, { useState, useMemo } from 'react';
import { LEGAL_CLAUSES } from '../data/legalClauses';
import { LegalClause } from '../types/agreement';
import {
  Search,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Printer,
  Bookmark,
  ExternalLink,
  ShieldCheck,
  Scale,
  FileCheck2,
  Filter
} from 'lucide-react';

interface MasterAgreementProps {
  onOpenAcceptance: () => void;
  onOpenDocCenter: () => void;
}

export const MasterAgreement: React.FC<MasterAgreementProps> = ({
  onOpenAcceptance,
  onOpenDocCenter
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedClauses, setExpandedClauses] = useState<Set<number>>(new Set([1, 2, 5, 9, 13, 14, 18, 32, 47, 64, 76]));
  const [copiedClauseNumber, setCopiedClauseNumber] = useState<number | null>(null);

  const categories = useMemo(() => {
    const set = new Set<string>();
    LEGAL_CLAUSES.forEach((c) => set.add(c.category));
    return ['All', ...Array.from(set)];
  }, []);

  const filteredClauses = useMemo(() => {
    return LEGAL_CLAUSES.filter((clause) => {
      const matchesCategory = selectedCategory === 'All' || clause.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const matchNum = clause.number.toString() === q || `clause ${clause.number}`.includes(q);
      const matchTitle = clause.title.toLowerCase().includes(q);
      const matchText = clause.fullText.toLowerCase().includes(q);
      const matchSummary = clause.summary.toLowerCase().includes(q);

      return matchNum || matchTitle || matchText || matchSummary;
    });
  }, [searchQuery, selectedCategory]);

  const toggleClause = (num: number) => {
    setExpandedClauses((prev) => {
      const next = new Set(prev);
      if (next.has(num)) {
        next.delete(num);
      } else {
        next.add(num);
      }
      return next;
    });
  };

  const expandAll = () => {
    const allNums = new Set(filteredClauses.map((c) => c.number));
    setExpandedClauses(allNums);
  };

  const collapseAll = () => {
    setExpandedClauses(new Set());
  };

  const copyClauseText = (clause: LegalClause) => {
    const textToCopy = `NextSoftHR Partner Agreement - Clause ${clause.number}: ${clause.title}\n\n${clause.fullText}\n\n[Source: NextSoftHR Global Partner Agreement Portal - www.nextsofthr.org]`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedClauseNumber(clause.number);
    setTimeout(() => setCopiedClauseNumber(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="agreement-text" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Section Kicker */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-2">
              <span>Legal Repository</span>
              <span aria-hidden="true">/</span>
              <span>NextSoftHR Global Agreement</span>
              <span aria-hidden="true">/</span>
              <span className="text-blue-700 font-semibold">Version 1.0 (Current)</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
              Master Table of Contents & Agreement Text
            </h2>
            <p className="mt-1 text-sm text-slate-600 max-w-2xl">
              Complete, dynamic codification of all 81 original legal clauses governing NextSoftHR resellers, distributors, affiliates, and associates worldwide.
            </p>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Print Agreement</span>
            </button>
            <button
              onClick={onOpenAcceptance}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>Execute Agreement</span>
            </button>
          </div>
        </div>

        {/* Legal Counsel Advisory Notice */}
        <div className="mt-6 p-4 rounded-xl bg-amber-50/80 border border-amber-200 flex items-start gap-3">
          <Scale className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 leading-relaxed">
            <span className="font-bold block mb-0.5">Original Legal Drafting Notice:</span>
            All clauses herein feature original legal language developed exclusively for the NextSoftHR SaaS channel ecosystem. Referenced third-party structures serve solely as architectural points of comparison. This document must be reviewed by qualified legal counsel prior to formal execution.
          </div>
        </div>

        {/* Search & Filtering Bar */}
        <div className="mt-8 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by clause #, title, or keyword (e.g., 14, Lead, Payout)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-slate-900 placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Actions & Quick Jump Dropdown */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              <div className="text-xs text-slate-500 font-medium">
                Showing <span className="font-bold text-slate-900">{filteredClauses.length}</span> of 81 Clauses
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={expandAll}
                  className="px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  Expand All
                </button>
                <button
                  onClick={collapseAll}
                  className="px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  Collapse All
                </button>
              </div>
            </div>
          </div>

          {/* Category Filter Pills (Interactive Buttons) */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2">
            <span className="text-xs text-slate-400 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" />
              <span>Category:</span>
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 81 Clauses List */}
        <div className="mt-8 space-y-4">
          {filteredClauses.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-slate-50 border border-slate-200 text-slate-500">
              <BookOpen className="w-8 h-8 mx-auto text-slate-400 mb-3" />
              <h4 className="text-sm font-semibold text-slate-900">No Clauses Found</h4>
              <p className="text-xs mt-1">Try adjusting your search keyword or selected category filter.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="mt-4 px-4 py-2 text-xs font-semibold text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            filteredClauses.map((clause) => {
              const isExpanded = expandedClauses.has(clause.number);
              return (
                <div
                  key={clause.number}
                  id={`clause-${clause.number}`}
                  className={`rounded-2xl border transition-all ${
                    isExpanded
                      ? 'border-blue-300 bg-white shadow-sm ring-1 ring-blue-100'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  {/* Clause Header Bar */}
                  <div
                    onClick={() => toggleClause(clause.number)}
                    className="p-5 flex items-start justify-between gap-4 cursor-pointer select-none"
                  >
                    <div className="flex items-start gap-4">
                      {/* Clause Number Marker */}
                      <span className="shrink-0 w-9 h-9 rounded-xl bg-slate-100 text-slate-700 font-mono text-xs font-bold flex items-center justify-center border border-slate-200/80">
                        {clause.number}
                      </span>

                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono font-semibold text-blue-700">
                            Clause {clause.number}
                          </span>
                          <span aria-hidden="true" className="text-slate-300">·</span>
                          <span className="text-[11px] font-medium text-slate-500">
                            {clause.category}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-slate-900">
                          {clause.title}
                        </h3>
                        {!isExpanded && (
                          <p className="mt-1 text-xs text-slate-500 line-clamp-1">
                            {clause.summary}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-semibold text-slate-400 hidden sm:inline-block">
                        {isExpanded ? 'Collapse' : 'Expand'}
                      </span>
                      <div className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Legal Text & Analysis */}
                  {isExpanded && (
                    <div className="px-5 pb-6 pt-2 border-t border-slate-100 space-y-5">
                      {/* Summary & Key Takeaway Banner */}
                      <div className="grid md:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
                        <div>
                          <span className="font-bold text-slate-900 block mb-1">
                            Executive Summary:
                          </span>
                          <p className="text-slate-600 leading-relaxed">
                            {clause.summary}
                          </p>
                        </div>
                        <div>
                          <span className="font-bold text-blue-900 block mb-1">
                            Key Commercial Takeaway:
                          </span>
                          <p className="text-blue-800 leading-relaxed">
                            {clause.keyTakeaway}
                          </p>
                        </div>
                      </div>

                      {/* Official Legal Drafting Text */}
                      <div>
                        <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2">
                          Contractual Text (Binding Provision):
                        </span>
                        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs leading-relaxed whitespace-pre-line border border-slate-800 selection:bg-blue-600 selection:text-white">
                          {clause.fullText}
                        </div>
                      </div>

                      {/* Practical Operational Guidance */}
                      <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold block mb-0.5">Practical Operational Rule:</span>
                          <span className="text-emerald-900">{clause.practicalApplication}</span>
                        </div>
                      </div>

                      {/* Clause Action Buttons */}
                      <div className="flex items-center justify-between pt-2 text-xs">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            copyClauseText(clause);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold transition-colors cursor-pointer"
                        >
                          {copiedClauseNumber === clause.number ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-700">Clause Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-slate-500" />
                              <span>Copy Clause Citation</span>
                            </>
                          )}
                        </button>

                        <div className="flex items-center gap-4 text-slate-400 text-[11px]">
                          <span>Clause {clause.number} of 81</span>
                          <a
                            href={`#clause-${clause.number}`}
                            className="hover:text-blue-600"
                          >
                            #permalink
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
