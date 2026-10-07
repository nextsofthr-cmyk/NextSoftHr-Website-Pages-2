import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Globe2, 
  MapPin, 
  ArrowRight, 
  Users, 
  ShieldCheck, 
  Sparkles,
  Layers,
  Plus,
  Minus,
  RotateCcw,
  Compass,
  Move,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Info
} from 'lucide-react';
import { COUNTRIES_DATA, CountryData } from '../data/countries';
import { useLanguage } from '../context/LanguageContext';

interface GlobalPartnerMapProps {
  onSelectCountry: (countryName: string) => void;
}

interface RegionPreset {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  flag: string;
  zoom: number;
  pan: { x: number; y: number };
  shortcut: string;
  isPrimary?: boolean;
}

const REGION_PRESETS: RegionPreset[] = [
  { 
    id: 'africa', 
    name: 'Africa', 
    shortName: 'Africa', 
    tagline: 'Pan-African Ecosystem (Nigeria, Kenya, SA...)',
    flag: '🌍', 
    zoom: 2.25, 
    pan: { x: 0, y: -7.5 },
    shortcut: '1',
    isPrimary: true
  },
  { 
    id: 'europe', 
    name: 'Europe', 
    shortName: 'Europe', 
    tagline: 'EMEA & UK Hubs (London, Manchester)',
    flag: '🇪🇺', 
    zoom: 2.5, 
    pan: { x: 4.5, y: 25.5 },
    shortcut: '2',
    isPrimary: true
  },
  { 
    id: 'north-america', 
    name: 'North America', 
    shortName: 'North America', 
    tagline: 'USA & Canada Multinational Networks',
    flag: '🌎', 
    zoom: 2.3, 
    pan: { x: 28.5, y: 16 },
    shortcut: '3',
    isPrimary: true
  },
  { 
    id: 'world', 
    name: 'Entire World', 
    shortName: 'World View', 
    tagline: '100% Global Partner Overview',
    flag: '🌐', 
    zoom: 1, 
    pan: { x: 0, y: 0 },
    shortcut: '0'
  },
  { 
    id: 'asia-mideast', 
    name: 'Middle East & Asia', 
    shortName: 'Asia & ME', 
    tagline: 'Dubai & India Enterprise Nodes',
    flag: '🌏', 
    zoom: 2.15, 
    pan: { x: -16, y: 11 },
    shortcut: '4'
  }
];

export const GlobalPartnerMap: React.FC<GlobalPartnerMapProps> = ({ onSelectCountry }) => {
  const { t } = useLanguage();

  const [selectedCountry, setSelectedCountry] = useState<CountryData>(
    COUNTRIES_DATA.find(c => c.id === 'nigeria') || COUNTRIES_DATA[0]
  );
  const [hoveredCountry, setHoveredCountry] = useState<CountryData | null>(null);

  // Zoom & Pan state
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [activeRegion, setActiveRegion] = useState<string>('world');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [hasDragged, setHasDragged] = useState<boolean>(false);
  const [a11yAnnouncement, setA11yAnnouncement] = useState<string>('Interactive world map loaded. Use Quick Zoom controls or +/- buttons to explore.');

  const dragStartRef = useRef<{ startX: number; startY: number; initPanX: number; initPanY: number } | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const active = hoveredCountry || selectedCountry;

  // Derive granular regional subgroup for the interactive popover label
  const getRegionalSubgroup = (c: CountryData): string => {
    if (['nigeria', 'ghana'].includes(c.id)) return 'West Africa Hub';
    if (['senegal', 'cote-divoire'].includes(c.id)) return 'Francophone West Africa';
    if (['kenya', 'uganda', 'tanzania', 'rwanda'].includes(c.id)) return 'East Africa Hub';
    if (['south-africa'].includes(c.id)) return 'Southern Africa Hub';
    if (['cameroon'].includes(c.id)) return 'Central Africa Hub';
    if (['egypt', 'morocco'].includes(c.id)) return 'North Africa / MENA';
    if (['uk'].includes(c.id)) return 'Europe / EMEA Hub';
    if (['usa', 'canada'].includes(c.id)) return 'North America Hub';
    if (['uae'].includes(c.id)) return 'Middle East (GCC)';
    if (['india'].includes(c.id)) return 'South Asia Hub';
    return c.region;
  };

  // Calculate total certified partners across the hovered regional subgroup
  const getSubregionTotalCertified = (c: CountryData): { regionName: string; total: number } => {
    const subgroup = getRegionalSubgroup(c);
    const matching = COUNTRIES_DATA.filter(item => getRegionalSubgroup(item) === subgroup);
    const total = matching.reduce((sum, item) => sum + item.partnerCount, 0);
    return { regionName: subgroup, total };
  };

  // Calculate region partner count
  const getRegionPartnerCount = (presetId: string): number => {
    if (presetId === 'world') {
      return COUNTRIES_DATA.reduce((acc, c) => acc + c.partnerCount, 0);
    }
    if (presetId === 'africa') {
      return COUNTRIES_DATA.filter(c => c.region === 'Africa').reduce((acc, c) => acc + c.partnerCount, 0);
    }
    if (presetId === 'europe') {
      return COUNTRIES_DATA.filter(c => c.id === 'uk').reduce((acc, c) => acc + c.partnerCount, 0);
    }
    if (presetId === 'north-america') {
      return COUNTRIES_DATA.filter(c => ['usa', 'canada'].includes(c.id)).reduce((acc, c) => acc + c.partnerCount, 0);
    }
    if (presetId === 'asia-mideast') {
      return COUNTRIES_DATA.filter(c => ['uae', 'india'].includes(c.id)).reduce((acc, c) => acc + c.partnerCount, 0);
    }
    return 0;
  };

  const clampPan = useCallback((newPanX: number, newPanY: number, currentZoom: number) => {
    if (currentZoom <= 1) return { x: 0, y: 0 };
    const maxPanX = (currentZoom - 1) * 45;
    const maxPanY = (currentZoom - 1) * 45;
    return {
      x: Math.max(-maxPanX, Math.min(maxPanX, newPanX)),
      y: Math.max(-maxPanY, Math.min(maxPanY, newPanY))
    };
  }, []);

  const handleCountryClick = (country: CountryData) => {
    if (hasDragged) return;
    setSelectedCountry(country);
    onSelectCountry(country.name);
    setA11yAnnouncement(`Selected ${country.name} with ${country.partnerCount} verified partners.`);
  };

  const handleQuickZoom = (preset: RegionPreset) => {
    setActiveRegion(preset.id);
    setZoom(preset.zoom);
    setPan(preset.pan);
    const count = getRegionPartnerCount(preset.id);
    setA11yAnnouncement(`Centered view on ${preset.name} at ${Math.round(preset.zoom * 100)}% zoom. ${count} verified partners in this region.`);
  };

  const handleZoomIn = () => {
    setZoom(prev => {
      const next = Math.min(3.5, Number((prev + 0.35).toFixed(2)));
      setPan(currentPan => clampPan(currentPan.x, currentPan.y, next));
      setA11yAnnouncement(`Zoomed in to ${Math.round(next * 100)}%`);
      return next;
    });
    setActiveRegion('custom');
  };

  const handleZoomOut = () => {
    setZoom(prev => {
      const next = Math.max(1, Number((prev - 0.35).toFixed(2)));
      if (next <= 1) {
        setPan({ x: 0, y: 0 });
        setActiveRegion('world');
        setA11yAnnouncement('Reset to 100% full world view');
      } else {
        setPan(currentPan => clampPan(currentPan.x, currentPan.y, next));
        setActiveRegion('custom');
        setA11yAnnouncement(`Zoomed out to ${Math.round(next * 100)}%`);
      }
      return next;
    });
  };

  const handleResetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setActiveRegion('world');
    setA11yAnnouncement('Reset map to 100% world view.');
  };

  // Directional step pan buttons (ideal for keyboard & click accessibility)
  const handleDirectionalPan = (direction: 'up' | 'down' | 'left' | 'right') => {
    if (zoom <= 1) {
      // If at 1x, nudge zoom slightly so user can navigate
      setZoom(1.35);
    }
    const step = 8;
    setPan(prev => {
      let newX = prev.x;
      let newY = prev.y;
      if (direction === 'up') newY += step;
      if (direction === 'down') newY -= step;
      if (direction === 'left') newX += step;
      if (direction === 'right') newX -= step;
      const clamped = clampPan(newX, newY, Math.max(zoom, 1.35));
      return clamped;
    });
    setActiveRegion('custom');
    setA11yAnnouncement(`Panned ${direction}`);
  };

  // Keyboard navigation on map container
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === '+' || e.key === '=') {
      e.preventDefault();
      handleZoomIn();
    } else if (e.key === '-' || e.key === '_') {
      e.preventDefault();
      handleZoomOut();
    } else if (e.key === '0') {
      e.preventDefault();
      handleResetZoom();
    } else if (e.key === '1') {
      e.preventDefault();
      handleQuickZoom(REGION_PRESETS[0]); // Africa
    } else if (e.key === '2') {
      e.preventDefault();
      handleQuickZoom(REGION_PRESETS[1]); // Europe
    } else if (e.key === '3') {
      e.preventDefault();
      handleQuickZoom(REGION_PRESETS[2]); // North America
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      handleDirectionalPan('up');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      handleDirectionalPan('down');
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handleDirectionalPan('left');
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleDirectionalPan('right');
    }
  };

  // Pointer drag to pan map when zoomed in
  const handlePointerDown = (e: React.PointerEvent) => {
    if (zoom <= 1) return;
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initPanX: pan.x,
      initPanY: pan.y
    };
    setHasDragged(false);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragStartRef.current || zoom <= 1) return;
    const container = mapContainerRef.current;
    if (!container) return;

    const dx = e.clientX - dragStartRef.current.startX;
    const dy = e.clientY - dragStartRef.current.startY;

    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
      if (!isDragging) setIsDragging(true);
      setHasDragged(true);

      const rect = container.getBoundingClientRect();
      const pctX = (dx / rect.width) * 100 / zoom;
      const pctY = (dy / rect.height) * 100 / zoom;

      const newPan = clampPan(dragStartRef.current.initPanX + pctX, dragStartRef.current.initPanY + pctY, zoom);
      setPan(newPan);
      setActiveRegion('custom');
    }
  };

  const handlePointerUp = () => {
    dragStartRef.current = null;
    setIsDragging(false);
  };

  return (
    <section 
      id="global-map" 
      aria-label="Interactive Global Partner Map"
      className="py-16 md:py-20 bg-[#071938] dark:bg-[#061124] text-white relative overflow-hidden border-b border-blue-900/50 dark:border-slate-800 transition-colors"
    >
      {/* Live Accessibility Screen Reader Announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {a11yAnnouncement}
      </div>
      
      {/* Background Decor */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#c8f526]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 dark:bg-blue-950/80 border border-[#c8f526]/30 text-[#c8f526] text-xs font-semibold uppercase tracking-wider mb-3">
            <Globe2 className="w-3.5 h-3.5" />
            <span>Interactive Partner Map</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            NextSofthr Partners Around the World
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 dark:text-slate-400">
            Navigate accredited local implementation consultancies, statutory payroll experts, and multi-country ERP specialists across <strong>Africa</strong>, <strong>Europe</strong>, and <strong>North America</strong>.
          </p>
        </div>

        {/* Map & Preview Card Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Stylized World Vector Map Container (lg:col-span-8) */}
          <div className="lg:col-span-8 bg-[#0b214a]/90 dark:bg-[#0a1c3b]/90 border border-blue-800/80 dark:border-slate-800 rounded-2xl md:rounded-3xl p-4 sm:p-6 shadow-2xl relative">
            
            {/* Quick Zoom & Regional Focus Panel (Accessible Navigation Hub) */}
            <div className="mb-4 pb-4 border-b border-blue-800/60 dark:border-slate-800">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-[#c8f526]/10 border border-[#c8f526]/30">
                    <Compass className="w-4 h-4 text-[#c8f526]" />
                  </div>
                  <div>
                    <div className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                      <span>Quick Zoom & Regional Focus</span>
                      <span className="text-[10px] text-slate-400 font-normal">Accessibility Controls</span>
                    </div>
                    <div className="text-[11px] text-slate-300">
                      Center and magnify key regions instantly
                    </div>
                  </div>
                </div>

                {/* Keyboard Shortcut Guidance Tooltip */}
                <div className="hidden md:flex items-center gap-1.5 text-[10px] text-slate-400 font-mono bg-blue-950/60 px-2.5 py-1 rounded-md border border-blue-900/60">
                  <span>Keys:</span>
                  <kbd className="px-1 bg-white/10 rounded text-slate-200">1</kbd>
                  <span>Africa</span>
                  <kbd className="px-1 bg-white/10 rounded text-slate-200">2</kbd>
                  <span>Europe</span>
                  <kbd className="px-1 bg-white/10 rounded text-slate-200">3</kbd>
                  <span>N. America</span>
                  <kbd className="px-1 bg-white/10 rounded text-slate-200">+/-</kbd>
                  <span>Zoom</span>
                </div>
              </div>

              {/* Major Region Buttons (Africa, Europe, North America prominently styled) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                {REGION_PRESETS.map((preset) => {
                  const isPresetActive = activeRegion === preset.id;
                  const count = getRegionPartnerCount(preset.id);
                  const isHighlightMajor = preset.isPrimary;

                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleQuickZoom(preset)}
                      aria-pressed={isPresetActive}
                      aria-label={`Quick zoom to ${preset.name}, containing ${count} certified partners. Hotkey ${preset.shortcut}`}
                      className={`relative p-2.5 rounded-xl text-left transition-all duration-200 cursor-pointer border flex flex-col justify-between ${
                        isPresetActive
                          ? 'bg-gradient-to-b from-[#c8f526] to-[#b3dd1d] text-[#071938] border-[#c8f526] shadow-lg shadow-[#c8f526]/20 font-bold scale-[1.02] ring-2 ring-[#c8f526]/40 z-10'
                          : isHighlightMajor
                            ? 'bg-blue-900/60 hover:bg-blue-800/80 text-white border-blue-700/80 hover:border-[#c8f526]/60 shadow-xs'
                            : 'bg-blue-950/50 hover:bg-blue-900/50 text-slate-300 hover:text-white border-blue-900/60'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 w-full">
                        <span className="text-xl leading-none">{preset.flag}</span>
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-black ${
                          isPresetActive 
                            ? 'bg-[#071938] text-[#c8f526]' 
                            : 'bg-white/10 text-slate-300'
                        }`}>
                          {count}
                        </span>
                      </div>

                      <div className="mt-2">
                        <div className="font-extrabold text-xs tracking-tight leading-tight truncate">
                          {preset.shortName}
                        </div>
                        <div className={`text-[9px] truncate mt-0.5 ${
                          isPresetActive ? 'text-[#071938]/80 font-medium' : 'text-slate-400'
                        }`}>
                          {preset.id === 'africa' && 'Pan-Africa Hub'}
                          {preset.id === 'europe' && 'EMEA & UK'}
                          {preset.id === 'north-america' && 'US & Canada'}
                          {preset.id === 'world' && '100% Globe'}
                          {preset.id === 'asia-mideast' && 'Gulf & Asia'}
                        </div>
                      </div>

                      {/* Hotkey Tag */}
                      <span className={`absolute bottom-1.5 right-1.5 text-[8px] font-mono opacity-60 hidden sm:inline ${
                        isPresetActive ? 'text-[#071938]' : 'text-slate-400'
                      }`}>
                        [{preset.shortcut}]
                      </span>
                    </button>
                  );
                })}
              </div>

            </div>

            {/* Legend & Instructions Ribbon */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3 text-xs">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-slate-300 font-medium text-[11px]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#c8f526] ring-2 ring-[#c8f526]/40 animate-pulse"></span>
                  <span>Certified Hub</span>
                </span>
                <span className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                  <span>Regional Expansion</span>
                </span>
              </div>
              <div className="text-[11px] text-[#c8f526] font-semibold flex items-center gap-1">
                <Info className="w-3 h-3 text-[#c8f526]" />
                <span>Click any pin or pill to inspect country specialists</span>
              </div>
            </div>

            {/* Stylized Vector SVG World Map with Interactive Zoom and Pan */}
            <div 
              ref={mapContainerRef}
              tabIndex={0}
              role="region"
              aria-label="World partner map viewport. Press + to zoom in, - to zoom out, 0 to reset, arrow keys to pan."
              onKeyDown={handleKeyDown}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className={`relative w-full aspect-[16/9] sm:aspect-[2/1] rounded-2xl overflow-hidden bg-[#071938] dark:bg-[#061227] border border-blue-900/80 dark:border-slate-800 flex items-center justify-center p-2 select-none touch-none focus:outline-none focus:ring-2 focus:ring-[#c8f526] focus:ring-offset-2 focus:ring-offset-[#071938] ${
                zoom > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'
              }`}
            >
              
              {/* Scalable & Pannable Inner Map Layer */}
              <div 
                className="relative w-full h-full will-change-transform"
                style={{
                  transform: `scale(${zoom}) translate(${pan.x}%, ${pan.y}%)`,
                  transformOrigin: '50% 50%',
                  transition: isDragging ? 'none' : 'transform 450ms cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {/* SVG Background Continents Outline */}
                <svg 
                  viewBox="0 0 1000 500" 
                  className="w-full h-full text-blue-950/90 fill-current opacity-85 pointer-events-none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* North America */}
                  <path d="M120 70 Q160 50 250 80 T300 160 T250 240 T180 260 T140 180 Z" fill="#0c2b64" opacity="0.8" />
                  <path d="M170 120 Q240 130 280 180 T240 230 T160 190 Z" fill="#133d85" opacity="0.7" />
                  
                  {/* South America */}
                  <path d="M260 270 Q320 280 340 360 T280 460 T240 380 Z" fill="#0c2b64" opacity="0.6" />
                  
                  {/* Europe */}
                  <path d="M440 80 Q510 70 540 130 T480 170 T430 130 Z" fill="#133d85" opacity="0.85" />
                  <circle cx="465" cy="140" r="18" fill="#1652f0" opacity="0.5" />
                  
                  {/* AFRICA - Prominently Featured & Detailed */}
                  <path 
                    d="M420 180 Q530 170 580 230 T590 320 T540 430 T470 410 T410 320 T390 240 Z" 
                    fill="#0e3477" 
                    stroke="#1c55b6"
                    strokeWidth="2.5"
                    className="filter drop-shadow-[0_0_15px_rgba(22,82,240,0.35)]"
                  />
                  
                  {/* Africa internal region accent rings */}
                  {/* West Africa Hub */}
                  <path d="M395 240 Q470 240 490 280 T440 310 T390 270 Z" fill="#134191" opacity="0.95" />
                  {/* East Africa Hub */}
                  <path d="M530 250 Q590 270 580 340 T520 350 Z" fill="#134191" opacity="0.95" />
                  {/* Southern Africa Hub */}
                  <path d="M470 370 Q540 370 530 430 T480 430 Z" fill="#134191" opacity="0.95" />

                  {/* Middle East */}
                  <path d="M580 170 Q640 180 650 240 T590 240 Z" fill="#133d85" opacity="0.75" />

                  {/* Asia / India */}
                  <path d="M660 140 Q770 120 830 200 T760 300 T670 260 Z" fill="#0c2b64" opacity="0.75" />
                  <path d="M680 210 Q720 220 715 280 T680 270 Z" fill="#133d85" opacity="0.85" />

                  {/* Subtle Grid Lat/Long Lines */}
                  <line x1="0" y1="250" x2="1000" y2="250" stroke="#1652f0" strokeWidth="0.6" strokeDasharray="4 6" opacity="0.3" />
                  <line x1="490" y1="0" x2="490" y2="500" stroke="#1652f0" strokeWidth="0.6" strokeDasharray="4 6" opacity="0.3" />
                </svg>

                {/* Interactive Glowing Partner Hub Location Markers with Popover Labels */}
                {COUNTRIES_DATA.map((country) => {
                  const isSelected = selectedCountry?.id === country.id;
                  const isHovered = hoveredCountry?.id === country.id;
                  const isNearTop = country.mapCoords.y < 35;
                  const isNearLeft = country.mapCoords.x < 30;
                  const isNearRight = country.mapCoords.x > 75;
                  const regionSubgroup = getRegionalSubgroup(country);
                  const subregionInfo = getSubregionTotalCertified(country);
                  
                  return (
                    <div
                      key={country.id}
                      style={{
                        left: `${country.mapCoords.x}%`,
                        top: `${country.mapCoords.y}%`
                      }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 group ${
                        isHovered ? 'z-50' : isSelected ? 'z-30' : 'z-20'
                      }`}
                      onMouseEnter={() => setHoveredCountry(country)}
                      onMouseLeave={() => setHoveredCountry(null)}
                    >
                      {/* Interactive Marker Pin Button */}
                      <button
                        type="button"
                        onClick={() => handleCountryClick(country)}
                        onFocus={() => setHoveredCountry(country)}
                        onBlur={() => setHoveredCountry(null)}
                        aria-label={`${country.name} in ${regionSubgroup}: ${country.partnerCount} verified certified partners.`}
                        className="relative flex items-center justify-center p-1 focus:outline-none cursor-pointer"
                      >
                        {/* Outer Glowing Beacon Pulse Halo Ring */}
                        <span className={`absolute -inset-3.5 rounded-full bg-[#c8f526] pointer-events-none transition-all duration-300 ${
                          isHovered 
                            ? 'opacity-70 scale-150 animate-ping' 
                            : isSelected
                              ? 'opacity-50 scale-125 animate-pulse'
                              : 'opacity-30 scale-100 group-hover:opacity-60 group-hover:scale-125'
                        }`} />

                        {/* Concentric Radial Glow Aura */}
                        <span className={`absolute -inset-1.5 rounded-full bg-[#c8f526] blur-[3px] pointer-events-none transition-all duration-300 ${
                          isHovered 
                            ? 'opacity-90 scale-125' 
                            : isSelected 
                              ? 'opacity-80 scale-110' 
                              : 'opacity-40 group-hover:opacity-80'
                        }`} />

                        {/* Core Glowing Pin Dot */}
                        <div className={`relative flex items-center justify-center rounded-full transition-all duration-300 ${
                          isHovered 
                            ? 'w-7 h-7 bg-[#c8f526] text-[#071938] font-black text-xs ring-4 ring-white shadow-[0_0_22px_rgba(200,245,38,1)] scale-125' 
                            : isSelected
                              ? 'w-6 h-6 bg-[#c8f526] text-[#071938] font-black text-xs ring-2 ring-white shadow-[0_0_16px_rgba(200,245,38,0.9)] scale-110'
                              : 'w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-tr from-[#0c2b64] to-blue-500 border-2 border-[#c8f526] text-white shadow-[0_0_10px_rgba(200,245,38,0.6)] group-hover:scale-110'
                        }`}>
                          {isHovered || isSelected ? (
                            <span className="text-[10px] font-black">{country.partnerCount}</span>
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#c8f526] animate-pulse" />
                          )}
                        </div>
                      </button>

                      {/* Compact Static Flag Label (Always visible underneath pin) */}
                      <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 px-1.5 py-0.5 rounded-md text-[10px] font-bold whitespace-nowrap transition-all pointer-events-none select-none ${
                        isHovered
                          ? 'bg-[#c8f526] text-[#071938] shadow-md scale-105 opacity-100 z-30 font-black'
                          : isSelected
                            ? 'bg-white text-blue-950 shadow-md opacity-100 z-20'
                            : 'bg-blue-950/90 text-slate-200 border border-blue-800/80 opacity-75 group-hover:opacity-100'
                      }`}>
                        <span className="mr-1">{country.flag}</span>
                        <span>{country.name}</span>
                        <span className="ml-1 text-[9px] font-mono opacity-80">({country.partnerCount})</span>
                      </div>

                      {/* Interactive Custom-Styled Tooltip Displaying Exact Certified Partner Count on Hover */}
                      {isHovered && (
                        <div 
                          role="tooltip"
                          aria-label={`Certified partner breakdown for ${country.name}`}
                          className={`absolute transition-all duration-200 z-50 pointer-events-auto ${
                            isNearTop ? 'top-full mt-6' : 'bottom-full mb-6'
                          } ${
                            isNearLeft 
                              ? 'left-0' 
                              : isNearRight 
                                ? 'right-0' 
                                : 'left-1/2 -translate-x-1/2'
                          }`}
                        >
                          <div className="bg-[#051329]/98 dark:bg-[#030b18]/98 border-2 border-[#c8f526] rounded-2xl p-4 shadow-[0_12px_40px_rgba(0,0,0,0.7),0_0_20px_rgba(200,245,38,0.25)] w-68 sm:w-76 text-left backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
                            
                            {/* Region Subgroup & Country Flag Header */}
                            <div className="flex items-center justify-between border-b border-blue-900/60 pb-2 mb-2.5">
                              <div className="flex items-center gap-2">
                                <span className="text-2xl leading-none">{country.flag}</span>
                                <div>
                                  <div className="text-xs font-black text-white tracking-tight leading-tight">
                                    {country.name}
                                  </div>
                                  <div className="text-[10px] text-[#c8f526] font-semibold">
                                    {regionSubgroup}
                                  </div>
                                </div>
                              </div>
                              <span className="text-[9px] uppercase font-bold text-slate-300 bg-blue-950/90 px-2 py-0.5 rounded border border-blue-800/80 font-mono">
                                {country.code}
                              </span>
                            </div>

                            {/* Exact Number of Certified Partners Stat Box */}
                            <div className="bg-gradient-to-br from-[#0c2b64]/90 via-[#071938] to-[#040e1f] border border-[#c8f526]/50 rounded-xl p-3 mb-2.5 shadow-inner">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex items-center gap-2.5">
                                  <div className="w-9 h-9 rounded-xl bg-[#c8f526] text-[#071938] flex items-center justify-center font-black shrink-0 shadow-sm">
                                    <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
                                  </div>
                                  <div>
                                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                                      Certified Capacity
                                    </div>
                                    <div className="text-sm font-black text-white leading-tight flex items-baseline gap-1">
                                      <span className="text-base sm:text-lg font-black text-[#c8f526] font-mono">
                                        {country.partnerCount}
                                      </span>
                                      <span>Certified {country.partnerCount === 1 ? 'Partner' : 'Partners'}</span>
                                    </div>
                                  </div>
                                </div>
                                <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded-full shrink-0">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                  <span>Vetted</span>
                                </span>
                              </div>

                              {/* Subregion certified total indicator */}
                              <div className="mt-2 pt-2 border-t border-blue-900/60 flex items-center justify-between text-[10px]">
                                <span className="text-slate-400">Regional Ecosystem:</span>
                                <span className="font-extrabold text-[#c8f526]">
                                  {subregionInfo.total} Certified in {subregionInfo.regionName}
                                </span>
                              </div>
                            </div>

                            {/* Primary Regional Hubs */}
                            <div className="text-[10px] text-slate-300 flex items-center gap-1.5 mb-1.5">
                              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                              <span className="truncate">
                                <strong className="text-slate-200">Hubs:</strong> {country.keyCities.slice(0, 3).join(', ')}
                              </span>
                            </div>

                            {/* Localized Statutory Compliance Specialties */}
                            <div className="text-[10px] text-slate-300 flex items-center gap-1.5 mb-3">
                              <Sparkles className="w-3 h-3 text-[#c8f526] shrink-0" />
                              <span className="truncate">
                                <strong className="text-slate-200">Specialty:</strong> {country.availableServices[0]}
                              </span>
                            </div>

                            {/* Interactive Click Action Button */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCountryClick(country);
                                const el = document.getElementById('directory');
                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                              }}
                              className="w-full py-2 px-3 rounded-xl bg-[#c8f526] hover:bg-[#b5e01b] text-[#071938] font-extrabold text-[11px] flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md transition-all cursor-pointer"
                            >
                              <span>View All {country.partnerCount} Certified Partners</span>
                              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                            </button>

                          </div>

                          {/* Seamless Caret Diamond pointing to location marker */}
                          <div className={`w-3.5 h-3.5 bg-[#051329] dark:bg-[#030b18] border-r-2 border-b-2 border-[#c8f526] transform rotate-45 mx-auto ${
                            isNearTop ? '-mt-2' : '-mt-2 relative z-10'
                          } ${
                            isNearLeft ? 'ml-6' : isNearRight ? 'mr-6' : ''
                          }`} />
                        </div>
                      )}

                    </div>
                  );
                })}

              </div>

              {/* Floating Manual Zoom Controls & Navigation Panel */}
              <div 
                className="absolute top-3 right-3 z-30 flex flex-col items-center bg-[#071938]/95 dark:bg-[#061124]/95 backdrop-blur-md border border-blue-800/80 dark:border-slate-700/80 rounded-2xl p-1.5 shadow-2xl"
                role="toolbar"
                aria-label="Map zoom and navigation controls"
              >
                {/* Zoom In Button */}
                <button
                  type="button"
                  id="map-zoom-in-btn"
                  onClick={handleZoomIn}
                  disabled={zoom >= 3.5}
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-200 hover:text-white hover:bg-blue-800/80 dark:hover:bg-slate-800 disabled:opacity-25 disabled:cursor-not-allowed transition-all cursor-pointer active:scale-90"
                  aria-label="Zoom in map (Press +)"
                  title="Zoom in (+)"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                </button>

                {/* Zoom Level Indicator */}
                <div 
                  className="text-[10px] font-black text-[#c8f526] px-1 py-1 select-none tracking-tight flex flex-col items-center"
                  title={`Current Zoom: ${Math.round(zoom * 100)}%`}
                >
                  <span>{Math.round(zoom * 100)}%</span>
                  {/* Visual mini-gauge */}
                  <div className="w-5 h-1 bg-blue-950 rounded-full mt-0.5 overflow-hidden">
                    <div 
                      className="h-full bg-[#c8f526] rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, ((zoom - 1) / 2.5) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Zoom Out Button */}
                <button
                  type="button"
                  id="map-zoom-out-btn"
                  onClick={handleZoomOut}
                  disabled={zoom <= 1}
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-200 hover:text-white hover:bg-blue-800/80 dark:hover:bg-slate-800 disabled:opacity-25 disabled:cursor-not-allowed transition-all cursor-pointer active:scale-90"
                  aria-label="Zoom out map (Press -)"
                  title="Zoom out (-)"
                >
                  <Minus className="w-4 h-4 stroke-[2.5]" />
                </button>

                {/* Reset to 100% World View */}
                {zoom > 1 && (
                  <button
                    type="button"
                    id="map-reset-zoom-btn"
                    onClick={handleResetZoom}
                    className="w-8 h-8 mt-1 border-t border-blue-800/60 dark:border-slate-800 rounded-xl flex items-center justify-center text-[#c8f526] hover:bg-blue-800/80 dark:hover:bg-slate-800 transition-all cursor-pointer active:scale-90"
                    aria-label="Reset map zoom to 100% World view (Press 0)"
                    title="Reset to 100% (0)"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Directional D-Pad Pan Controls (Accessible for users who cannot drag) */}
                {zoom > 1 && (
                  <div className="mt-1.5 pt-1.5 border-t border-blue-800/60 dark:border-slate-800 flex flex-col items-center">
                    <button
                      type="button"
                      onClick={() => handleDirectionalPan('up')}
                      aria-label="Pan map up"
                      title="Pan up (ArrowUp)"
                      className="p-1 rounded hover:bg-blue-800/60 text-slate-300 hover:text-white cursor-pointer"
                    >
                      <ChevronUp className="w-3 h-3" />
                    </button>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleDirectionalPan('left')}
                        aria-label="Pan map left"
                        title="Pan left (ArrowLeft)"
                        className="p-1 rounded hover:bg-blue-800/60 text-slate-300 hover:text-white cursor-pointer"
                      >
                        <ChevronLeft className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setPan({ x: 0, y: 0 })}
                        aria-label="Center pan"
                        title="Re-center pan"
                        className="w-3 h-3 rounded-full bg-blue-900 border border-blue-700 hover:border-[#c8f526] cursor-pointer"
                      />
                      <button
                        type="button"
                        onClick={() => handleDirectionalPan('right')}
                        aria-label="Pan map right"
                        title="Pan right (ArrowRight)"
                        className="p-1 rounded hover:bg-blue-800/60 text-slate-300 hover:text-white cursor-pointer"
                      >
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDirectionalPan('down')}
                      aria-label="Pan map down"
                      title="Pan down (ArrowDown)"
                      className="p-1 rounded hover:bg-blue-800/60 text-slate-300 hover:text-white cursor-pointer"
                    >
                      <ChevronDown className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>

              {/* Zoom & Active Focus Status Pill */}
              <div className="absolute bottom-3 left-3 z-30 pointer-events-none flex items-center gap-2">
                {zoom > 1 ? (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#071938]/95 dark:bg-[#061124]/95 border border-blue-800/90 text-xs text-slate-200 backdrop-blur-md shadow-lg">
                    <Move className="w-3.5 h-3.5 text-[#c8f526]" />
                    <span>Drag or use arrows to pan ({Math.round(zoom * 100)}%)</span>
                  </div>
                ) : (
                  <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#071938]/95 dark:bg-[#061124]/95 border border-blue-800/80 text-[11px] text-slate-300 backdrop-blur-md">
                    <Compass className="w-3.5 h-3.5 text-[#c8f526]" />
                    <span>Select a region above or click pins to inspect</span>
                  </div>
                )}
              </div>

            </div>

            {/* Quick Country Pills Carousel */}
            <div className="mt-4 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-[11px] uppercase font-bold text-slate-400 shrink-0 mr-1">Quick Select:</span>
              {COUNTRIES_DATA.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleCountryClick(c)}
                  onMouseEnter={() => setHoveredCountry(c)}
                  onMouseLeave={() => setHoveredCountry(null)}
                  onFocus={() => setHoveredCountry(c)}
                  onBlur={() => setHoveredCountry(null)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                    active.id === c.id
                      ? 'bg-[#c8f526] text-[#071938] font-bold shadow-sm'
                      : 'bg-blue-900/40 dark:bg-[#061227] text-slate-300 hover:bg-blue-800/60 dark:hover:bg-slate-800 border border-blue-800/60 dark:border-slate-700'
                  }`}
                >
                  <span>{c.flag}</span>
                  <span>{c.name}</span>
                  <span className="opacity-70 text-[10px]">({c.partnerCount})</span>
                </button>
              ))}
            </div>

          </div>

          {/* Detailed Selected Country Panel (lg:col-span-4) */}
          <div className="lg:col-span-4 bg-[#0b214a]/95 dark:bg-[#0a1c3b]/95 border border-blue-700/80 dark:border-slate-800 rounded-2xl md:rounded-3xl p-6 shadow-2xl relative flex flex-col justify-between">
            <div>
              {/* Flag + Country Name */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{active.flag}</span>
                  <div>
                    <span className="text-[11px] font-bold text-[#c8f526] uppercase tracking-wider">
                      {active.region} Partner Network
                    </span>
                    <h3 className="text-2xl font-black text-white">{active.name}</h3>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-[#c8f526]">{active.partnerCount}</div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Verified Partners</div>
                </div>
              </div>

              {/* Country summary */}
              <p className="mt-4 text-xs sm:text-sm text-slate-300 dark:text-slate-400 leading-relaxed">
                {active.description}
              </p>

              {/* Key hubs */}
              <div className="mt-4">
                <div className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-1.5">
                  Primary Business Hubs
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {active.keyCities.map((city) => (
                    <span key={city} className="px-2.5 py-0.5 rounded-md bg-[#071938] dark:bg-[#061227] border border-blue-800 dark:border-slate-700 text-xs text-slate-200">
                      {city}
                    </span>
                  ))}
                </div>
              </div>

              {/* Available Services */}
              <div className="mt-5">
                <div className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">
                  Specialized Services Available
                </div>
                <ul className="space-y-1.5">
                  {active.availableServices.map((service, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c8f526]"></span>
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA to auto-filter and view partners */}
            <div className="mt-6 pt-5 border-t border-blue-800/80 dark:border-slate-800">
              <button
                type="button"
                id="map-view-partners-cta"
                onClick={() => {
                  onSelectCountry(active.name);
                  const el = document.getElementById('directory');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-3 rounded-xl bg-[#c8f526] hover:bg-[#b5e01b] text-[#071938] font-bold text-sm flex items-center justify-center gap-2 shadow-md lemon-shadow transition-all cursor-pointer"
              >
                <span>View {active.name} Partners</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export const GlobalMapSection = GlobalPartnerMap;
