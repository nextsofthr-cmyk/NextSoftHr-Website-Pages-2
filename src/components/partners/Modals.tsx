import React, { useState } from 'react';
import { X, Lock, ExternalLink, CheckCircle2, Download, Calendar, Mail, Phone } from 'lucide-react';
import { ResourceItem } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface PortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToApply: () => void;
}

export const PortalModal: React.FC<PortalModalProps> = ({ isOpen, onClose, onGoToApply }) => {
  const { strings } = useLanguage();
  const m = strings.modals;
  const [partnerId, setPartnerId] = useState('NX-PTR-8832');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setTimeout(() => {
      setIsLoggingIn(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-[#071D3E] border-2 border-slate-300 dark:border-blue-600 shadow-2xl p-6 sm:p-8 text-slate-700 dark:text-slate-200 transition-colors">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 dark:bg-blue-950 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white border border-slate-200 dark:border-blue-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {!isSuccess ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-[#B8F010] flex items-center justify-center text-[#040E1F] font-black text-xs shadow-xs">
                NS
              </div>
              <span className="text-sm font-extrabold text-slate-900 dark:text-white">NextSofthr Partner Portal</span>
            </div>

            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1">
              Sign In to Your Partner Hub
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-6">
              Track your client deals, view verified commission remittances, and download customized marketing collaterals.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Partner ID or Authorized Email
                </label>
                <input
                  type="text"
                  required
                  value={partnerId}
                  onChange={(e) => setPartnerId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-blue-950 border border-slate-300 dark:border-blue-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-[#B8F010]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Security Passcode
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-blue-950 border border-slate-300 dark:border-blue-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-[#B8F010]"
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded accent-blue-600 dark:accent-[#B8F010]" />
                  <span>Remember this browser</span>
                </label>
                <span className="text-blue-700 dark:text-[#B8F010] cursor-pointer hover:underline">Forgot passcode?</span>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3 rounded-xl bg-[#B8F010] text-[#040E1F] font-extrabold text-xs hover:bg-[#CBFF1A] transition-all flex items-center justify-center gap-2 shadow"
              >
                {isLoggingIn ? (
                  <span>Authenticating Partner Profile...</span>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>Access Partner Dashboard (Simulated Demo)</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-blue-900 text-center">
              <span className="text-xs text-slate-500 dark:text-slate-400 block mb-2">Not an active partner yet?</span>
              <button
                onClick={() => {
                  onClose();
                  onGoToApply();
                }}
                className="text-xs font-bold text-blue-700 dark:text-[#B8F010] hover:underline"
              >
                Apply for NextSofthr Partnership &rarr;
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-4 space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#B8F010]/20 border border-[#B8F010] flex items-center justify-center mx-auto text-blue-700 dark:text-[#B8F010]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">Partner Session Active</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Logged in as <strong className="text-slate-900 dark:text-white">{partnerId}</strong> (Platinum Partner Level). Your deal pipeline and 40% commission tier are now synced.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-[#B8F010] text-[#040E1F] text-xs font-bold hover:bg-[#CBFF1A] transition-all shadow"
            >
              Continue to Portal View
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

interface EventModalProps {
  isOpen: boolean;
  eventTitle: string;
  onClose: () => void;
}

export const EventModal: React.FC<EventModalProps> = ({ isOpen, eventTitle, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [registered, setRegistered] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegistered(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-[#071D3E] border-2 border-slate-300 dark:border-blue-600 shadow-2xl p-6 sm:p-8 text-slate-700 dark:text-slate-200 transition-colors">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 dark:bg-blue-950 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white border border-slate-200 dark:border-blue-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {!registered ? (
          <div>
            <div className="flex items-center gap-2 mb-2 text-blue-700 dark:text-[#B8F010] text-xs font-bold">
              <Calendar className="w-4 h-4" />
              <span>RESERVE YOUR SEAT</span>
            </div>

            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">
              {eventTitle}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-6">
              Join NextSofthr leadership and fellow partners. A calendar invite with direct access link will be dispatched immediately.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Oduor"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-blue-950 border border-slate-300 dark:border-blue-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-[#B8F010]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Business Email</label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-blue-950 border border-slate-300 dark:border-blue-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-[#B8F010]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#B8F010] text-[#040E1F] font-extrabold text-xs hover:bg-[#CBFF1A] transition-all shadow"
              >
                Confirm Free Seat
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-4 space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#B8F010]/20 border border-[#B8F010] flex items-center justify-center mx-auto text-blue-700 dark:text-[#B8F010]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">Seat Confirmed!</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Thank you, <strong className="text-slate-900 dark:text-white">{name}</strong>. An email invitation has been dispatched to <strong className="text-blue-700 dark:text-[#B8F010]">{email}</strong>.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-[#B8F010] text-[#040E1F] text-xs font-bold hover:bg-[#CBFF1A] transition-all shadow"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
