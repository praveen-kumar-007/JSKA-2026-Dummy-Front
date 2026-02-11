import React, { useState } from 'react';
import { Phone, MapPin, Mail, Youtube, Instagram, Twitter, Facebook } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CONTACT_INFO, SOCIAL_LINKS } from '../../constants';
import { translations } from '../../translations';
import type { Language } from '../../translations';
import FooterContactForm from './FooterContactForm';

interface FooterProps {
  lang: Language;
}

const Footer: React.FC<FooterProps> = ({ lang }) => {
  const [akfiTapCount, setAkfiTapCount] = useState(0);
  const go = useNavigate();
  const t = translations[lang];
  const footer = t.footer;

  const handleAkfiTap = () => {
    setAkfiTapCount(prev => prev + 1);
    if (akfiTapCount >= 4) {
      window.open('https://www.akfi.in/', '_blank');
      setAkfiTapCount(0);
    }
  };

  return (
    <footer className="bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
        <div className="absolute top-10 left-10 w-2 h-2 bg-slate-700 rounded-full"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-slate-700 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-slate-700 rounded-full"></div>
        <div className="absolute bottom-10 right-1/3 w-1 h-1 bg-slate-700 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-orange-500 rounded-2xl blur opacity-50"></div>
                  <img
                    src="/logo.png"
                    alt="JSKA Logo"
                    className="relative h-16 w-16 rounded-2xl bg-white p-2 shadow-xl"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
                    JSKA
                  </h3>
                  <p className="text-sm text-slate-300">
                    {lang === 'hi' ? 'झारखंड राज्य कबड्डी संघ' : 'Jharkhand State Kabaddi Association'}
                  </p>
                </div>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                {lang === 'hi'
                  ? 'झारखंड राज्य कबड्डी संघ (JSKA) कबड्डी खेल को बढ़ावा देने और राज्य में कबड्डी की संस्कृति को विकसित करने के लिए समर्पित है।'
                  : 'Jharkhand State Kabaddi Association (JSKA) is dedicated to promoting kabaddi and developing kabaddi culture across the state.'
                }
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6 border-l-4 border-blue-500 pl-4">{footer.quickLinks}</h4>
              <ul className="space-y-3">
                <li><button onClick={() => go('/')} className="hover:text-blue-400 transition-colors">{t.nav.home}</button></li>
                <li><button onClick={() => go('/about')} className="hover:text-blue-400 transition-colors">{t.nav.about}</button></li>
                <li><button onClick={() => go('/news')} className="hover:text-blue-400 transition-colors">{t.nav.news}</button></li>
                <li><button onClick={() => go('/gallery')} className="hover:text-blue-400 transition-colors">{t.nav.gallery}</button></li>
                <li><button onClick={() => go('/contact')} className="hover:text-blue-400 transition-colors">{footer.contact}</button></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-6 border-l-4 border-orange-500 pl-4">{lang === 'hi' ? 'सेवाएं' : 'Services'}</h4>
              <ul className="space-y-3">
                <li><button onClick={() => go('/players')} className="hover:text-orange-400 transition-colors">{t.nav.players}</button></li>
                <li><button onClick={() => go('/referees')} className="hover:text-orange-400 transition-colors">{t.nav.referees}</button></li>
                <li><button onClick={() => go('/champions')} className="hover:text-orange-400 transition-colors">{t.nav.champions}</button></li>
                <li><button onClick={() => go('/technical-officials')} className="hover:text-orange-400 transition-colors">{t.nav.technicalOfficials}</button></li>
              </ul>
            </div>

            {/* Portal & Legal */}
            <div>
              <h4 className="text-lg font-semibold mb-6 border-l-4 border-blue-500 pl-4">{lang === 'hi' ? 'पोर्टल एवं विधिक' : 'Portal & Legal'}</h4>
              <ul className="space-y-3">
                <li><button onClick={() => go('/verification')} className="text-orange-500 font-semibold transition-colors">{t.verification.navLabel}</button></li>
                <li><button onClick={() => go('/login')} className="hover:text-orange-400 transition-colors">{t.nav.login}</button></li>
                <li><button onClick={() => go('/contact')} className="hover:text-orange-400 transition-colors">{footer.contact}</button></li>
                <li><button onClick={() => go('/terms-conditions')} className="hover:text-orange-400 transition-colors">{lang === 'hi' ? 'नियम एवं शर्तें' : 'Terms & Conditions'}</button></li>
                <li><button onClick={() => go('/privacy-policy')} className="hover:text-orange-400 transition-colors">{lang === 'hi' ? 'प्राइवेसी पॉलिसी' : 'Privacy Policy'}</button></li>
              </ul>

            </div>
          </div>
        </div>

        {/* Contact & Donate Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10 pb-8 border-t border-white/5 pt-8">
          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-l-4 border-orange-500 pl-4">{footer.contact}</h3>
            <ul className="space-y-5 mb-6">
              <li className="flex items-start space-x-4 text-gray-400 text-sm">
                <MapPin size={20} className="text-orange-500 shrink-0" />
                <span>{CONTACT_INFO.address}</span>
              </li>
              <li className="flex items-center space-x-4 text-gray-400 text-sm">
                <Phone size={20} className="text-orange-500 shrink-0" />
                <span>{CONTACT_INFO.phone}</span>
              </li>
              <li className="flex items-center space-x-4 text-gray-400 text-sm">
                <Mail size={20} className="text-orange-500 shrink-0" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="underline hover:text-orange-400 break-all">{CONTACT_INFO.email}</a>
              </li>
            </ul>
            <FooterContactForm />
          </div>

          {/* Affiliation logos & Donate CTA */}
          <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-slate-50/6 rounded-xl border border-white/8 text-left">
            <div className="flex flex-col md:flex-row items-center gap-6 mb-6 w-full">
              <div className="flex items-center gap-5">
                <img
                  src="https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767429051/WhatsApp_Image_2026-01-03_at_1.57.17_PM_qg7rs3.jpg"
                  alt="Jharkhand State Kabaddi Association"
                  className="h-20 w-20 opacity-90 rounded-full bg-white p-1 shadow-lg"
                />
                <img
                  src="https://res.cloudinary.com/dmmll82la/image/upload/v1766683651/akfi-logo_sydpx7.png"
                  alt="AKFI"
                  className="h-20 w-20 opacity-90 rounded-full bg-white p-1 cursor-pointer select-none shadow-lg hover:scale-105 transition-transform"
                  onClick={handleAkfiTap}
                />
              </div>

              <div className="text-left ml-2">
                <p className="text-sm text-slate-200 font-medium">{translations[lang].affiliation.line1}</p>
                <p className="text-xs text-slate-400 mt-1">{translations[lang].affiliation.line2}</p>
              </div>
            </div>"
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-[11px] uppercase tracking-[0.25em] mb-2 font-semibold">
                {lang === 'hi' ? 'सोशल मीडिया पर जुड़ें' : 'Connect on Social Media'}
              </p>
              <div className="flex items-center justify-center md:justify-start gap-2.5">
                <a
                  href={SOCIAL_LINKS.youtube}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="JSKA YouTube Channel"
                  className="relative group p-1.5 sm:p-2 rounded-full bg-slate-900 border border-slate-800 shadow-sm overflow-hidden transition-all hover:shadow-md hover:border-red-500/70 active:scale-95 text-white"
                >
                  <span className="absolute inset-0 bg-gradient-to-tr from-red-600/25 via-transparent to-orange-500/25 opacity-60 group-hover:opacity-100 blur-md transition-opacity" />
                  <span className="relative flex items-center justify-center w-7 h-7 rounded-full bg-slate-950/90 group-hover:bg-black/90 transition-colors">
                    <Youtube className="w-3 h-3 text-red-400 group-hover:text-red-300 transition-colors" />
                  </span>
                </a>
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="JSKA Instagram"
                  className="relative group p-1.5 sm:p-2 rounded-full bg-slate-900 border border-slate-800 shadow-sm overflow-hidden transition-all hover:shadow-md hover:border-pink-500/70 active:scale-95 text-white"
                >
                  <span className="absolute inset-0 bg-gradient-to-tr from-pink-500/35 via-orange-500/25 to-yellow-400/25 opacity-60 group-hover:opacity-100 transition-opacity" />
                  <span className="relative flex items-center justify-center w-7 h-7 rounded-full bg-slate-950/90 group-hover:bg-black/90 transition-colors">
                    <Instagram className="w-3 h-3 text-pink-400 group-hover:text-pink-300 transition-colors" />
                  </span>
                </a>
                <a
                  href={SOCIAL_LINKS.x}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="JSKA X (Twitter)"
                  className="relative group p-1.5 sm:p-2 rounded-full bg-slate-900 border border-slate-800 shadow-sm overflow-hidden transition-all hover:shadow-md hover:border-blue-400/70 active:scale-95 text-white"
                >
                  <span className="absolute inset-0 bg-gradient-to-tr from-blue-500/30 via-slate-500/25 to-white/15 opacity-60 group-hover:opacity-100 transition-opacity" />
                  <span className="relative flex items-center justify-center w-7 h-7 rounded-full bg-slate-950/90 group-hover:bg-black/90 transition-colors">
                    <Twitter className="w-3 h-3 text-blue-400 group-hover:text-blue-300 transition-colors" />
                  </span>
                </a>
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="JSKA Facebook Page"
                  className="relative group p-1.5 sm:p-2 rounded-full bg-slate-900 border border-slate-800 shadow-sm overflow-hidden transition-all hover:shadow-md hover:border-blue-600/70 active:scale-95 text-white"
                >
                  <span className="absolute inset-0 bg-gradient-to-tr from-blue-600/35 via-blue-500/30 to-white/15 opacity-60 group-hover:opacity-100 transition-opacity" />
                  <span className="relative flex items-center justify-center w-7 h-7 rounded-full bg-slate-950/90 group-hover:bg-black/90 transition-colors">
                    <Facebook className="w-3 h-3 text-blue-400 group-hover:text-blue-300 transition-colors" />
                  </span>
                </a>
              </div>
            </div>
            <p className="text-gray-500 text-xs text-center md:text-right">
              © {new Date().getFullYear()} JSKA. {lang === 'hi' ? 'सर्वाधिकार सुरक्षित।' : 'ALL RIGHTS RESERVED.'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
