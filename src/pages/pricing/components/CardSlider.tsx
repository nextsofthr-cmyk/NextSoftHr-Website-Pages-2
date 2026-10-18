import React, { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface PerView {
  base: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

interface CardSliderProps<T> {
  id: string;
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  perView: PerView;
  /** Accessible label for the carousel region. */
  ariaLabel?: string;
}

const BREAKPOINTS: Array<[keyof PerView, number]> = [
  ['xl', 1280],
  ['lg', 1024],
  ['md', 768],
  ['sm', 640],
];

const getPerView = (cfg: PerView): number => {
  if (typeof window === 'undefined') return cfg.base;
  const w = window.innerWidth;
  for (const [key, min] of BREAKPOINTS) {
    const v = cfg[key];
    if (v && w >= min) return v;
  }
  return cfg.base;
};

export function CardSlider<T>({ id, items, renderItem, perView, ariaLabel }: CardSliderProps<T>) {
  const [view, setView] = useState<number>(() => getPerView(perView));
  const [page, setPage] = useState(0);

  useEffect(() => {
    const onResize = () => setView(getPerView(perView));
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perView.base, perView.sm, perView.md, perView.lg, perView.xl]);

  const pageCount = Math.max(1, Math.ceil(items.length / view));

  // Keep the page in range when the number of visible items changes.
  useEffect(() => {
    setPage((p) => Math.min(p, pageCount - 1));
  }, [pageCount]);

  const goTo = useCallback(
    (p: number) => setPage(Math.max(0, Math.min(pageCount - 1, p))),
    [pageCount],
  );

  const atStart = page === 0;
  const atEnd = page >= pageCount - 1;

  const arrowClass =
    'w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-200 shadow-sm ' +
    'bg-white dark:bg-[#111C38] border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 ' +
    'hover:bg-[#0265DC] hover:border-[#0265DC] hover:text-white hover:scale-105 ' +
    'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white dark:disabled:hover:bg-[#111C38] ' +
    'disabled:hover:text-slate-700 dark:disabled:hover:text-slate-200 disabled:hover:scale-100 disabled:hover:border-slate-200';

  return (
    <div id={id} className="w-full" role="region" aria-roledescription="carousel" aria-label={ariaLabel}>
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${page * 100}%)` }}
        >
          {Array.from({ length: pageCount }).map((_, p) => (
            <div
              key={p}
              className="w-full shrink-0 grid gap-5 items-stretch p-1"
              style={{ gridTemplateColumns: `repeat(${view}, minmax(0, 1fr))` }}
              aria-hidden={p !== page}
            >
              {items.slice(p * view, p * view + view).map((item, i) => (
                <React.Fragment key={p * view + i}>{renderItem(item, p * view + i)}</React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Controls: arrow - pagination dots - arrow */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          id={`${id}-prev`}
          type="button"
          onClick={() => goTo(page - 1)}
          disabled={atStart}
          aria-label="Previous slide"
          className={arrowClass}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2" role="tablist" aria-label="Slider pagination">
          {Array.from({ length: pageCount }).map((_, p) => (
            <button
              key={p}
              id={`${id}-dot-${p}`}
              type="button"
              role="tab"
              aria-selected={p === page}
              aria-label={`Go to slide ${p + 1}`}
              onClick={() => goTo(p)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                p === page
                  ? 'w-8 bg-[#0265DC]'
                  : 'w-2.5 bg-slate-300 dark:bg-slate-600 hover:bg-[#0265DC]/60'
              }`}
            />
          ))}
        </div>

        <button
          id={`${id}-next`}
          type="button"
          onClick={() => goTo(page + 1)}
          disabled={atEnd}
          aria-label="Next slide"
          className={arrowClass}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
