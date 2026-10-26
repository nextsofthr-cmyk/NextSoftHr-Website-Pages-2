import React, { useState, useEffect, useRef } from 'react';
import { 
  Star, 
  Quote, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2
} from 'lucide-react';

export interface SignInTestimonial {
  id: string;
  quote: string;
  author: string;
  position: string;
  company: string;
  country: string;
  countryFlag: string;
  imageUrl: string;
  initials: string;
  verifiedBadge: string;
  rating: number;
}

export const SIGN_IN_TESTIMONIALS: SignInTestimonial[] = [
  {
    id: 'test-1',
    quote:
      'Our safari guides and lodge staff receive their salaries directly into their M-Pesa wallets on payday morning. Even in remote Maasai Mara camps, staff have immediate access to their digital payslips.',
    author: 'Daniel Kiprop',
    position: 'Director of Operations',
    company: 'SafariEco Expeditions & Lodges',
    country: 'Kenya',
    countryFlag: '🇰🇪',
    imageUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
    initials: 'DK',
    verifiedBadge: 'Verified Enterprise Client',
    rating: 5,
  },
  {
    id: 'test-2',
    quote:
      'Our medical technicians and mobile phlebotomists clock in on their smartphones from remote medical centers. The biometric GPS precision and automated overtime tracking save us over 200 management hours every month.',
    author: 'Marie-Claire Uwase',
    position: 'VP of Human Capital',
    company: 'Kigali Health Logistics',
    country: 'Rwanda',
    countryFlag: '🇷🇼',
    imageUrl:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop',
    initials: 'MCU',
    verifiedBadge: 'Verified Healthcare Network',
    rating: 5,
  },
  {
    id: 'test-3',
    quote:
      'NextSoftHr eliminated our multi-currency payroll nightmares across Lagos and London. We scaled our engineering headcount by over 500% without needing to hire a single additional payroll administrator.',
    author: 'Adebayo Adeleke',
    position: 'Chief Operating Officer',
    company: 'PayPulse Technologies',
    country: 'Nigeria & UK',
    countryFlag: '🇳🇬',
    imageUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop',
    initials: 'AA',
    verifiedBadge: 'Verified Fintech Enterprise',
    rating: 5,
  },
];

interface TestimonialSliderProps {
  variant?: 'dark' | 'adaptive';
  className?: string;
}

export const TestimonialSlider: React.FC<TestimonialSliderProps> = ({
  variant = 'dark',
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const testimonials = SIGN_IN_TESTIMONIALS;

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, testimonials.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
  };

  const current = testimonials[currentIndex];
  const isDarkVariant = variant === 'dark';

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`relative w-full rounded-2xl transition-all duration-300 ${
        isDarkVariant
          ? 'bg-white/[0.08] backdrop-blur-md border border-white/15 text-white shadow-xl'
          : 'bg-white dark:bg-[#0c1830] border border-slate-200/90 dark:border-slate-800 text-slate-900 dark:text-white shadow-lg'
      } ${className}`}
      aria-roledescription="carousel"
      aria-label="Customer Testimonial Slider"
    >
      {/* Ambient glow accent */}
      {isDarkVariant && (
        <div className="absolute top-0 right-10 w-48 h-20 bg-[#caff33]/10 rounded-full blur-2xl pointer-events-none" />
      )}

      <div className="p-4 sm:p-5 relative z-10">
        {/* Top Header: Star Rating & Slider Navigation Controls */}
        <div className="flex items-center justify-between pb-2.5 border-b border-white/10 dark:border-slate-800/80">
          <div className="flex items-center gap-1.5">
            <div className="flex items-center text-[#caff33]">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#caff33] stroke-none" />
              ))}
            </div>
            <span
              className={`text-[11px] font-semibold tracking-wide ml-1 ${
                isDarkVariant ? 'text-blue-200/90' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              5.0 Verified Review
            </span>
          </div>

          {/* Right Header Navigation Arrows */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                isDarkVariant
                  ? 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next testimonial"
              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                isDarkVariant
                  ? 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Testimonial Quote */}
        <div className="py-3">
          <div className="relative">
            <Quote
              className={`absolute -top-1 -left-0.5 w-5 h-5 opacity-20 ${
                isDarkVariant ? 'text-[#caff33]' : 'text-lime-600 dark:text-lime-400'
              }`}
            />
            <p
              className={`text-xs sm:text-[13px] font-normal leading-relaxed pl-5 italic transition-opacity duration-300 ${
                isDarkVariant ? 'text-blue-50/95' : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              “{current.quote}”
            </p>
          </div>
        </div>

        {/* Bottom Section: Author Photo Image, Name & Info (Downwards) + Pagination Dots */}
        <div className="pt-3 border-t border-white/10 dark:border-slate-800/80 flex items-center justify-between gap-3">
          {/* Author Avatar Image & Details */}
          <div className="flex items-center gap-3 min-w-0">
            {/* Author Portrait Image with fallback initials badge */}
            <div className="relative shrink-0">
              <img
                src={current.imageUrl}
                alt={current.author}
                className={`w-10 h-10 rounded-full object-cover shadow-md ring-2 ${
                  isDarkVariant ? 'ring-[#caff33]' : 'ring-lime-500'
                }`}
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement | null;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div
                style={{ display: 'none' }}
                className={`w-10 h-10 rounded-full items-center justify-center font-black text-xs tracking-wider shadow-md ring-2 ${
                  isDarkVariant
                    ? 'bg-gradient-to-br from-[#caff33] to-[#88c200] text-[#003366] ring-[#caff33]/50'
                    : 'bg-gradient-to-br from-[#003366] to-[#0056b3] text-[#caff33] ring-lime-400/30'
                }`}
                title={current.author}
              >
                {current.initials}
              </div>
              {/* Online / verified status dot */}
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-white dark:ring-slate-900" />
            </div>

            {/* Author Name, Title & Country */}
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs sm:text-sm font-bold truncate">
                  {current.author}
                </span>
                <span className="text-xs" title={current.country}>
                  {current.countryFlag}
                </span>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#caff33] shrink-0" />
              </div>
              <div
                className={`text-[11px] truncate ${
                  isDarkVariant ? 'text-blue-200/80' : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {current.position} • <span className="font-medium">{current.company}</span>
              </div>
            </div>
          </div>

          {/* 3 Pagination Dots */}
          <div className="flex items-center gap-1.5 shrink-0">
            {testimonials.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => setCurrentIndex(dotIdx)}
                aria-label={`Go to testimonial ${dotIdx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === dotIdx
                    ? 'w-5 bg-[#caff33]'
                    : isDarkVariant
                    ? 'w-1.5 bg-white/30 hover:bg-white/50'
                    : 'w-1.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;
