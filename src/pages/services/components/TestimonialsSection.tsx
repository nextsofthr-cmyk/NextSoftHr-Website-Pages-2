import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS_LIST } from '../data/servicesData';
import { CardSlider } from './CardSlider';

const getInitials = (name: string): string => {
  const clean = name.replace(/^(Engr\.|Dr\.|Prof\.|Chief|Mr\.|Mrs\.|Ms\.)\s+/i, '').trim();
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'NL';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const AVATAR_GRADIENTS = [
  'from-[#0256C4] to-[#0A2540]',
  'from-emerald-600 to-teal-900',
  'from-indigo-600 to-slate-900',
  'from-amber-600 to-orange-950',
  'from-cyan-600 to-blue-900',
  'from-purple-600 to-violet-950',
  'from-rose-600 to-slate-900',
];

const getAvatarGradient = (name: string): string => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_GRADIENTS.length;
  return AVATAR_GRADIENTS[index];
};

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-white dark:bg-[#0A2540] relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/80 text-[#0256C4] dark:text-[#84CC16] text-xs font-extrabold uppercase tracking-widest border border-blue-100 dark:border-blue-800 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16]" />
            AUTHENTIC CLIENT EXPERIENCES
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2540] dark:text-white tracking-tight">
            Trusted by Growing Businesses and HR Leaders
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300 mt-2">
            Hear directly from founders, people managers, and operations directors who transformed their workplace
            culture and compliance with NextSofthr.
          </p>
        </div>

        {/* 3-in-a-Row Testimonial Cards Slider */}
        <CardSlider
          id="testimonials-slider"
          items={TESTIMONIALS_LIST}
          perView={{ base: 1, sm: 1, md: 2, lg: 3, xl: 3 }}
          ariaLabel="Client testimonials slider"
          renderItem={(item) => (
            <div
              key={item.id}
              className="bg-[#F8FAFC] dark:bg-[#0D2644] rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-blue-800/80 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col justify-between h-full"
            >
              <div>
                {/* Rating Stars & Location */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-300 bg-white dark:bg-[#0A2540] px-2.5 py-1 rounded-full border border-slate-200 dark:border-blue-900 flex items-center gap-1.5">
                    <span>{item.countryFlag}</span>
                    <span>{item.country}</span>
                  </span>
                </div>

                {/* Quote */}
                <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed italic mb-6">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-slate-200/70 dark:border-blue-900/60 mt-auto">
                <div className="flex items-center gap-3.5 mb-2">
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${getAvatarGradient(item.author)} text-white font-black text-sm flex items-center justify-center border-2 border-white dark:border-blue-800 shadow-md tracking-wider shrink-0 select-none`}
                    aria-label={item.author}
                  >
                    {getInitials(item.author)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0A2540] dark:text-white">{item.author}</h4>
                    <p className="text-xs text-[#0256C4] dark:text-[#84CC16] font-medium">{item.position}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{item.company}</p>
                  </div>
                </div>
                <div className="text-[10px] text-emerald-700 dark:text-emerald-300 font-semibold flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded w-max border border-transparent dark:border-emerald-900">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span>{item.verifiedStatus}</span>
                </div>
              </div>
            </div>
          )}
        />
      </div>
    </section>
  );
};
