import React, { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface PerView {
  base: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

export interface CardSliderProps<T> {
  id: string;
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  perView: PerView;
  ariaLabel?: string;
  gapClassName?: string;
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

export function CardSlider<T>({
  id,
  items,
  renderItem,
  perView,
  ariaLabel,
  gapClassName = 'gap-6 lg:gap-8',
}: CardSliderProps<T>) {
  const [view, setView] = useState<number>(() => getPerView(perView));
  const [page, setPage] = useState(0);

  useEffect(() => {
    const onResize = () => setView(getPerView(perView));
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [perView]);

  const pageCount = Math.max(1, Math.ceil(items.length / view));

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
    'w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-200 shadow-sm cursor-pointer ' +
    'bg-white dark:bg-[#0E2038] border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 ' +
    'hover:bg-[#1769E0] hover:border-[#1769E0] hover:text-white hover:scale-105 ' +
    'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white dark:disabled:hover:bg-[#0E2038] ' +
    'disabled:hover:text-slate-700 dark:disabled:hover:text-slate-200 disabled:hover:scale-100 disabled:hover:border-slate-200 dark:disabled:hover:border-white/10';

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
              className={`w-full shrink-0 grid ${gapClassName} items-stretch py-2 px-1`}
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
      <div className="mt-10 flex items-center justify-center gap-4">
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
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                p === page
                  ? 'w-8 bg-[#1769E0] dark:bg-[#B8F010]'
                  : 'w-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-[#1769E0]/60'
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
