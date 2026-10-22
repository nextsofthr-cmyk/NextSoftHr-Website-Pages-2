import React from 'react';
import { Phone, Globe, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { BRAND } from '../data/content';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#08172C] text-slate-400 text-sm border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 5-Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12 pb-14 border-b border-white/10">
          
          {/* Brand & Overview Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2 space-y-4">
            <a href="/" className="flex items-center gap-3 group focus:outline-none">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-[#1769E0] text-white shadow-md">
                <span className="font-extrabold text-xl tracking-tight text-white font-display">N</span>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#C8F000] rounded-full ring-2 ring-[#08172C]"></span>
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white font-display">
                NextSofthr<span className="text-[#C8F000]">.</span>
              </span>
            </a>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              All – One – Modern HR, Payroll and Business Management Platform enabling organizations worldwide to manage their entire workforce from one unified and intelligent platform.
            </p>

            {/* Direct Contact Snapshot */}
            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-[#C8F000]" />
                <a href={`tel:${BRAND.phoneRaw}`} className="hover:text-white transition-colors font-mono">
                  {BRAND.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Globe className="w-3.5 h-3.5 text-[#C8F000]" />
                <a href={BRAND.websiteUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  {BRAND.website}
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-[#C8F000]" />
                <a href={`mailto:${BRAND.email}`} className="hover:text-white transition-colors">
                  {BRAND.email}
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-3">
              {[
                { name: 'LinkedIn', icon: 'in', href: 'https://linkedin.com' },
                { name: 'Facebook', icon: 'fb', href: 'https://facebook.com' },
                { name: 'Instagram', icon: 'ig', href: 'https://instagram.com' },
                { name: 'X', icon: '𝕏', href: 'https://x.com' },
                { name: 'YouTube', icon: 'yt', href: 'https://youtube.com' },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#1769E0] hover:text-white text-slate-300 flex items-center justify-center text-xs font-bold border border-white/10 transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* First Column: Products */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Products</h4>
            <ul className="space-y-2 text-xs">
              {[
                'HR Management',
                'Payroll',
                'Attendance',
                'Shift & Scheduling',
                'Leave & Time Off',
                'Recruitment & ATS',
                'Performance Mgt.',
                'Manager/Employee ESS',
                'WhatsApp',
                'Biometrics',
                'Letters & Offers',
                'AI Assistance',
                'Rest API'
              ].map((item) => (
                <li key={item}>
                  <a href="/services" className="hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Second Column: Business */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Business</h4>
            <ul className="space-y-2 text-xs">
              {[
                'CRM',
                'Finance',
                'Assets',
                'Expense',
                'Projects',
                'Payment',
                'Reports',
                'Analytics',
                'Solutions',
                'Small Business',
                'Medium Business',
                'Enterprises',
                'Industries',
              ].map((item) => (
                <li key={item}>
                  <a
                    href={item === 'Solutions' || item === 'Small Business' || item === 'Medium Business' || item === 'Enterprises' ? '/pricing' : '/services'}
                    className="hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Third Column: Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Company</h4>
            <ul className="space-y-2 text-xs">
              {[
                'About Us',
                'Contact Us',
                'Training',
                'Pricing',
                'Partners',
                'Partner Registry',
                'Career',
                'Resources',
                'Blog',
                'FAQ',
                'Documentation',
                'Help Center',
                'Product Updates',
              ].map((item) => {
                let href = `/${item.toLowerCase().replace(/ /g, '-')}`;
                if (item === 'Resources' || item === 'Blog' || item === 'Product Updates') href = '/blog';
                if (item === 'Help Center') href = '/contact';
                if (item === 'Documentation') href = '/faq';
                return (
                  <li key={item}>
                    <a href={href} className="hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © 2026 NextSofthr. All Rights Reserved.
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Cookie Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
