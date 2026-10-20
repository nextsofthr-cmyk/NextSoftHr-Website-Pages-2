import React, { useState } from 'react';
import { PARTNER_EVENTS } from '../data/partnerData';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Sparkles, 
  Video, 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';

interface EventsTrainingProps {
  onRegisterClick: (eventTitle: string) => void;
}

export const EventsTraining: React.FC<EventsTrainingProps> = ({ onRegisterClick }) => {
  const [activeType, setActiveType] = useState<string>('All');

  const filteredEvents = activeType === 'All' 
    ? PARTNER_EVENTS 
    : PARTNER_EVENTS.filter(e => e.type === activeType);

  return (
    <section id="events" className="py-24 bg-white dark:bg-[#051329] border-t border-slate-200 dark:border-blue-900/60 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/80 border border-blue-200 dark:border-blue-700/60 text-xs font-bold text-blue-800 dark:text-[#B8F010] mb-4">
            <Calendar className="w-3.5 h-3.5" />
            <span>PARTNER ACADEMY & CONFERENCES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Learn. Connect. Sell. Grow.
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Upskill your consulting practice, earn official NextSofthr partner credentials, and connect with top enterprise dealmakers across Africa and the global SaaS landscape.
          </p>
        </div>

        {/* Visual Training Environment Cards (Conference & Workshop Atmosphere) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-blue-800/80 group h-64 shadow-md dark:shadow-xl">
            <img
              src="https://templates.envytheme.com/timido/assets/images/about/about4.jpg"
              alt="African HR & Business Consultants in workshop"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[10px] font-black px-2 py-0.5 rounded bg-[#B8F010] text-[#040E1F] mb-1.5 inline-block">
                LIVE SESSIONS
              </span>
              <h4 className="text-base font-bold text-white mb-1">
                Consultant Sales Masterclasses
              </h4>
              <p className="text-xs text-slate-300">
                Interactive objection handling and executive pitch workshops.
              </p>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-blue-800/80 group h-64 shadow-md dark:shadow-xl">
            <img
              src="https://saaslyn-next.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcontact-thumb.3332d0fc.png&w=640&q=75"
              alt="Technology partners collaborating on SaaS"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[10px] font-black px-2 py-0.5 rounded bg-blue-600 text-white border border-blue-400 mb-1.5 inline-block font-bold">
                PRODUCT CERTIFICATION
              </span>
              <h4 className="text-base font-bold text-white mb-1">
                Technical Systems Enablement
              </h4>
              <p className="text-xs text-slate-300">
                Deep dive into biometrics, API integrations, and statutory rules.
              </p>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-blue-800/80 group h-64 shadow-md dark:shadow-xl">
            <img
              src="https://saaslyn-next.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fblog-thumb-3-2.60718b24.png&w=640&q=75"
              alt="African Business Conferences & Networking"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[10px] font-black px-2 py-0.5 rounded bg-[#B8F010] text-[#040E1F] mb-1.5 inline-block">
                ANNUAL SUMMIT
              </span>
              <h4 className="text-base font-bold text-white mb-1">
                NextSofthr Global Partner Summit
              </h4>
              <p className="text-xs text-slate-300">
                Network with C-level peers across Nigeria, Kenya, South Africa, and UK.
              </p>
            </div>
          </div>

        </div>

        {/* Schedule of Upcoming Events */}
        <div className="rounded-3xl bg-slate-50 dark:bg-[#030914] border border-slate-200 dark:border-blue-700/80 p-6 sm:p-8 shadow-md dark:shadow-2xl mb-12 transition-colors">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-blue-900/80 mb-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Upcoming Enablement Calendar</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">All sessions are free for registered and prospective NextSofthr partners.</p>
            </div>

            <div className="flex items-center gap-2">
              {['All', 'Conference', 'Certification', 'Workshop'].map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveType(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeType === t
                      ? 'bg-[#B8F010] text-[#040E1F] shadow-sm'
                      : 'bg-white dark:bg-blue-950 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-blue-800'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredEvents.map((evt) => (
              <div
                key={evt.id}
                className="p-5 rounded-2xl bg-white dark:bg-[#071D3E] border border-slate-200 dark:border-blue-800/80 hover:border-blue-500 dark:hover:border-[#B8F010] transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 shadow-sm"
              >
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-black px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-[#B8F010] border border-blue-200 dark:border-blue-800">
                      {evt.type}
                    </span>
                    <span className="text-xs text-slate-600 dark:text-blue-300 flex items-center gap-1 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-[#B8F010]" /> {evt.date}
                    </span>
                    <span className="text-xs text-slate-600 dark:text-blue-300 flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" /> {evt.time}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" /> {evt.location}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {evt.title}
                  </h4>

                  <p className="text-xs text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                    {evt.description}
                  </p>

                  <div className="text-xs text-slate-600 dark:text-blue-200 flex items-center gap-1.5 pt-1">
                    <User className="w-3.5 h-3.5 text-blue-600 dark:text-[#B8F010]" />
                    <span>Key Facilitator: <strong className="text-slate-900 dark:text-white">{evt.speaker}</strong> ({evt.speakerTitle})</span>
                  </div>
                </div>

                <div className="shrink-0 self-stretch lg:self-auto flex items-center justify-end">
                  <button
                    onClick={() => onRegisterClick(evt.title)}
                    className="w-full lg:w-auto px-5 py-2.5 rounded-xl bg-blue-50 dark:bg-blue-950 hover:bg-[#B8F010] text-blue-800 dark:text-[#B8F010] hover:text-[#040E1F] border border-blue-200 dark:border-blue-700 hover:border-[#B8F010] text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span>Reserve Seat</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
