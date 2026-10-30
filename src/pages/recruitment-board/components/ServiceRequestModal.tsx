import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, PhoneCall, Send, Building2 } from 'lucide-react';
import { RecruitmentService } from '../types';

interface ServiceRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: RecruitmentService | null;
}

export const ServiceRequestModal: React.FC<ServiceRequestModalProps> = ({
  isOpen,
  onClose,
  service
}) => {
  const [orgName, setOrgName] = useState('');
  const [contactName, setContactName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [openingsCount, setOpeningsCount] = useState('1 - 5 roles');
  const [timeframe, setTimeframe] = useState('Immediate (Next 30 days)');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div 
        className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#142B4A] dark:bg-slate-950 text-white px-6 py-4 flex items-center justify-between shrink-0 border-b border-slate-800/80">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-lime-400">
              NextSoftHR Talent Advisory
            </span>
            <h2 className="text-base font-bold text-white">
              {service ? `Request: ${service.title}` : 'Recruitment Advisory Consultation'}
            </h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-14 h-14 bg-lime-100 dark:bg-lime-950/70 text-lime-700 dark:text-lime-400 border border-lime-300 dark:border-lime-800 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Consultation Request Received</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
                A Senior Talent Partner will review your staffing requirements and contact you within 24 business hours with market intelligence and a customized service scope.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Discuss your recruitment objectives with our specialized search consultants. We provide tailored proposals for single C-suite searches, embedded RPO teams, and scalable contract workforce deployments.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-800 dark:text-slate-200 block mb-1">Company / Organization *</label>
                  <input
                    type="text"
                    required
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder="e.g. Dangote Cement Plc"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-800 dark:text-slate-200 block mb-1">Contact Person Name *</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Dr. Ngozi Achebe"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-800 dark:text-slate-200 block mb-1">Official Work Email *</label>
                  <input
                    type="email"
                    required
                    value={workEmail}
                    onChange={(e) => setWorkEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-800 dark:text-slate-200 block mb-1">Direct Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+234 802 000 0000"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-800 dark:text-slate-200 block mb-1">Projected Openings</label>
                  <select
                    value={openingsCount}
                    onChange={(e) => setOpeningsCount(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 text-xs"
                  >
                    <option value="1 - 5 roles">1 - 5 roles</option>
                    <option value="6 - 15 roles">6 - 15 roles</option>
                    <option value="16 - 50 roles">16 - 50 roles (RPO/Workforce)</option>
                    <option value="50+ roles">50+ roles (Enterprise Scale)</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-800 dark:text-slate-200 block mb-1">Hiring Timeline</label>
                  <select
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 text-xs"
                  >
                    <option value="Immediate (Next 30 days)">Immediate (Next 30 days)</option>
                    <option value="Q1 / Upcoming Quarter">Q1 / Upcoming Quarter</option>
                    <option value="Exploratory Consultation">Exploratory Consultation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-800 dark:text-slate-200 block mb-1">Brief Description of Talent Requirements</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Detail key positions, experience levels, locations, or confidential search guidelines..."
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 text-xs resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#142B4A] dark:bg-blue-600 hover:bg-[#1E3A5F] dark:hover:bg-blue-500 text-white font-bold rounded-xl shadow-md text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Advisory Request</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
