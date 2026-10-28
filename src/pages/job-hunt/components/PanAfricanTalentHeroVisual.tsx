import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  MapPin, 
  Building2,
  Users,
  Camera,
  Check
} from 'lucide-react';

interface RealPhotoOption {
  id: string;
  label: string;
  roleTitle: string;
  url: string;
  fallbackUrl: string;
  attribution: string;
}

const REAL_AFRICAN_AMERICAN_PHOTOS: RealPhotoOption[] = [
  {
    id: 'team-collab',
    label: 'Enterprise Collaboration',
    roleTitle: 'Engineering & People Leadership Team',
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Wocintech_%28microsoft%29_-_136_%2825388863844%29.jpg',
    fallbackUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Wocintech_%28microsoft%29_-_181.jpg',
    attribution: 'WOCinTech Chat / CC BY 2.0'
  },
  {
    id: 'executive-lead',
    label: 'Executive Leadership',
    roleTitle: 'Senior HR & Strategy Director',
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Wocintech_%28microsoft%29_-_61_%2825926639341%29.jpg',
    fallbackUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Wocintech_%28microsoft%29_-_136_%2825388863844%29.jpg',
    attribution: 'WOCinTech Chat / CC BY 2.0'
  },
  {
    id: 'product-squad',
    label: 'Innovation Squad',
    roleTitle: 'Fintech & Systems Architects',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Wocintech_%28microsoft%29_-_70_%2825926649961%29.jpg',
    fallbackUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Wocintech_%28microsoft%29_-_61_%2825926639341%29.jpg',
    attribution: 'WOCinTech Chat / CC BY 2.0'
  }
];

export const PanAfricanTalentHeroVisual: React.FC = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const activePhoto = REAL_AFRICAN_AMERICAN_PHOTOS[selectedPhotoIndex];

  return (
    <div className="relative w-full max-w-lg lg:max-w-none mx-auto select-none">
      
      {/* Ambient backdrop glow */}
      <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 via-teal-500/15 to-indigo-600/20 dark:from-blue-500/25 dark:via-teal-500/20 dark:to-indigo-500/25 rounded-3xl blur-2xl -z-10" />

      {/* Main Container Card */}
      <div className="relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xl shadow-blue-900/10 dark:shadow-black/60 overflow-hidden group">
        
        {/* Decorative Top Accent Ribbon */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#2563EB] via-[#0F9D8A] to-[#142B4A]" />

        {/* Real Human Image Canvas */}
        <div className="relative aspect-[4/3] sm:aspect-[16/11] bg-slate-900 overflow-hidden">
          
          {/* Real Photographic Image of Black / African American Corporate Professionals */}
          <img
            src={imageError ? activePhoto.fallbackUrl : activePhoto.url}
            alt="Real African American and Pan-African business professionals collaborating in a modern enterprise office"
            referrerPolicy="no-referrer"
            onError={() => {
              if (!imageError) setImageError(true);
            }}
            className="w-full h-full object-cover object-center transform group-hover:scale-[1.03] transition-transform duration-700 ease-out"
          />

          {/* High-Grade Multi-Stop Gradient Overlays for Readability and Depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-slate-950/40 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 via-transparent to-slate-950/30 pointer-events-none" />

          {/* Floating Glassmorphism Badge 1 (Top Left): Verified Talent Network */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 p-2.5 sm:p-3 rounded-2xl bg-white/95 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/80 shadow-lg shadow-black/20 max-w-[215px] sm:max-w-[235px] animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-lime-100 dark:bg-lime-950/80 text-lime-700 dark:text-lime-400 flex items-center justify-center shrink-0 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="truncate">
                <span className="text-[10px] uppercase font-bold tracking-wider text-lime-700 dark:text-lime-400 block truncate">
                  Verified Pan-African & Global
                </span>
                <span className="text-xs font-extrabold text-[#142B4A] dark:text-white block truncate">
                  12,500+ Top Professionals
                </span>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-1.5 font-medium">
              <span>Lagos · Nairobi · US · Global</span>
              <span className="text-lime-700 dark:text-lime-400 font-bold">Vetted</span>
            </div>
          </div>

          {/* Floating Glassmorphism Badge 2 (Bottom Right): Match Accuracy */}
          <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 p-2.5 sm:p-3 rounded-2xl bg-white/95 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/80 shadow-lg shadow-black/20 max-w-[200px] sm:max-w-[220px] animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-black text-[#142B4A] dark:text-white block">
                  94% Match Accuracy
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                  AI & RPO Screening
                </span>
              </div>
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-[10px] font-semibold text-blue-600 dark:text-blue-400 border-t border-slate-100 dark:border-slate-800 pt-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
              <span>Average hire time: 7 days</span>
            </div>
          </div>

          {/* Floating Glassmorphism Badge 3 (Bottom Left): Corporate Endorsement */}
          <div className="hidden sm:flex absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20 items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md text-white text-[11px] font-semibold border border-white/15 shadow-md">
            <Building2 className="w-3.5 h-3.5 text-lime-400" />
            <span>450+ Enterprise Employers</span>
          </div>

          {/* Real Photo Role Caption (Center Bottom Overlay) */}
          <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-medium">
            <Camera className="w-3 h-3 text-blue-400" />
            <span>Real Professional Photography</span>
          </div>

        </div>

        {/* Interactive Real Photography Switcher Tabs */}
        <div className="p-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-2 text-xs">
          <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 hidden sm:inline">
            Real Talent View:
          </span>

          <div className="flex items-center gap-1.5 w-full sm:w-auto justify-between sm:justify-end">
            {REAL_AFRICAN_AMERICAN_PHOTOS.map((photo, index) => {
              const isSelected = selectedPhotoIndex === index;
              return (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => {
                    setSelectedPhotoIndex(index);
                    setImageError(false);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                    isSelected
                      ? 'bg-[#2563EB] text-white shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  <span>{photo.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Pan-African Footprint Strip */}
        <div className="bg-white dark:bg-slate-900 px-4 py-2.5 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400 font-medium overflow-x-auto gap-3">
          <div className="flex items-center gap-1.5 shrink-0 font-semibold text-[#142B4A] dark:text-white">
            <MapPin className="w-3.5 h-3.5 text-[#2563EB] dark:text-blue-400" />
            <span>Talent Network:</span>
          </div>
          <div className="flex items-center gap-3 shrink-0 text-slate-500 dark:text-slate-400">
            <span>🇳🇬 Lagos & Abuja</span>
            <span>·</span>
            <span>🇰🇪 Nairobi</span>
            <span>·</span>
            <span>🇬🇭 Accra</span>
            <span>·</span>
            <span>🇺🇸 US Diasporan Talent</span>
            <span>·</span>
            <span>🇿🇦 Johannesburg</span>
          </div>
        </div>

      </div>

    </div>
  );
};
