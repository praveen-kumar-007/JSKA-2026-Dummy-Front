import React, { useState, useEffect } from 'react';
import { Menu, X, Languages } from 'lucide-react';
import { translations } from '../../translations';
import type { Language } from '../../translations';

interface NavbarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  lang: Language;
  onLangChange: (lang: Language) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onPageChange, lang, onLangChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const t = translations[lang];

  // Desktop navigation items - simplified and professional
  const desktopNavItems = [
    { name: t.nav.home, id: 'home' },
    { name: t.nav.about, id: 'about' },
    { name: t.nav.gallery, id: 'gallery' },
    { name: t.nav.news, id: 'news' },
    {
      name: lang === 'hi' ? 'रजिस्टर' : 'Register',
      id: 'register',
      dropdown: [
        { name: lang === 'hi' ? 'प्लेयर रजिस्ट्रेशन' : 'Player Registration', id: 'register-player' },
        { name: lang === 'hi' ? 'टेक्निकल ऑफिशियल रजिस्ट्रेशन' : 'Technical Official Registration', id: 'technical-official-registration' },
      ]
    },
    {
      name: 'JSKA Hub',
      id: 'hub',
      dropdown: [
        { name: lang === 'hi' ? 'प्लेयर लॉगिन' : 'Player Login', id: 'player-login' },
        { name: t.nav.login, id: 'member-login' },
        { name: t.verification.navLabel, id: 'verification' },
      ]
    },
  ];

  // Mobile navigation items - simplified
  const mobileNavItems = [
    { name: t.nav.home, id: 'home' },
    { name: t.nav.about, id: 'about' },
    { name: t.nav.gallery, id: 'gallery' },
    { name: t.nav.news, id: 'news' },
    {
      name: lang === 'hi' ? 'रजिस्टर' : 'Register',
      id: 'register',
      dropdown: [
        { name: lang === 'hi' ? 'प्लेयर रजिस्ट्रेशन' : 'Player Registration', id: 'register-player' },
        { name: lang === 'hi' ? 'टेक्निकल ऑफिशियल रजिस्ट्रेशन' : 'Technical Official Registration', id: 'technical-official-registration' },
      ]
    },
    {
      name: 'JSKA Hub',
      id: 'hub',
      dropdown: [
        { name: lang === 'hi' ? 'प्लेयर लॉगिन' : 'Player Login', id: 'player-login' },
        { name: t.nav.login, id: 'member-login' },
        { name: t.verification.navLabel, id: 'verification' },
      ]
    },
  ];

  // Close mobile menu when page changes
  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
  }, [currentPage]);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
        setOpenDropdown(null);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (id: string) => {
    // Delegate navigation to parent (App) so React Router handles it as SPA
    onPageChange(id);
    setIsOpen(false);
    setOpenDropdown(null);
  };

  const toggleDropdown = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section - Minimal Professional */}
          <div
            className="flex items-center space-x-3 cursor-pointer shrink-0"
            onClick={() => handleNavClick('home')}
          >
            <img
              src={`${window.location.origin}/logo.png`}
              alt="JSKA Logo"
              className="h-9 w-9 object-contain rounded-md"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-oswald font-extrabold text-slate-900">JSKA</span>
              <span className="text-xs text-slate-500 hidden sm:block">{lang === 'hi' ? 'झारखंड कबड्डी संघ' : 'Jharkhand Kabaddi Association'}</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2 flex-1 justify-center max-w-5xl relative z-40">
            <div className="relative flex items-center space-x-1 xl:space-x-2 bg-gray-800/95 rounded-xl p-2 border border-gray-600 shadow-xl overflow-visible">
              {desktopNavItems.map((item) => (
                item.dropdown ? (
                  <div key={item.id} className="relative group flex-shrink-0">
                    <button
                      aria-haspopup="true"
                      title={item.name}
                      className={`relative px-2 xl:px-3 py-2 xl:py-2.5 rounded-lg text-sm xl:text-base font-bold transition-all duration-300 uppercase tracking-wider flex items-center gap-1 xl:gap-2 whitespace-nowrap border border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                        item.dropdown.some(sub => sub.id === currentPage)
                          ? 'bg-blue-600 text-white shadow-lg transform scale-105 border-blue-400/50'
                          : 'text-gray-200 hover:bg-blue-600/20 hover:text-white hover:shadow-lg hover:scale-105'
                      }`}
                    >
                      <span className="truncate max-w-16 xl:max-w-none">{item.name}</span>
                      <svg
                        className="w-3 h-3 xl:w-3.5 xl:h-3.5 transition-all duration-300 group-hover:rotate-180 group-hover:scale-110 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    {item.dropdown.some(sub => sub.id === currentPage) && (
                      <span className="absolute -bottom-3 left-2 right-2 h-0.5 rounded bg-gradient-to-r from-indigo-400 to-teal-400 block" aria-hidden="true" />
                    )}
                    </button>
                    <div className="absolute left-1/2 top-full mt-2 w-80 xl:w-96 bg-gray-800 border-2 border-gray-600 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 ease-out z-[100] transform -translate-x-1/2 translate-y-2 group-hover:translate-y-0 before:absolute before:-top-1.5 before:left-1/2 before:-translate-x-1/2 before:w-3 before:h-3 before:bg-gray-800 before:border-l before:border-t before:border-gray-600 before:rotate-45 before:rounded-tl-sm">
                      <div className="p-3 relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-black/20 rounded-2xl"></div>
                        <div className="relative grid gap-1">
                          {item.dropdown.map((sub, idx) => (
                            <button
                              key={sub.id}
                              onClick={() => handleNavClick(sub.id)}
                              className={`group/item w-full text-left p-2 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                                currentPage === sub.id
                                  ? 'bg-blue-600 text-white shadow-lg'
                                  : 'text-gray-200 hover:bg-blue-600/20 hover:text-white'
                              }`}
                              style={{ animationDelay: `${idx * 50}ms` }}
                            >
                              <div className="flex items-center gap-2.5">
                                <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                                  currentPage === sub.id
                                    ? 'bg-white shadow-lg'
                                    : 'bg-blue-500 group-hover/item:scale-125'
                                }`}></div>
                                <span className="truncate font-medium text-sm">{sub.name}</span>
                                {currentPage === sub.id && (
                                  <div className="ml-auto w-1.5 h-1.5 bg-slate-700 rounded-full animate-pulse"></div>
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    aria-current={currentPage === item.id ? 'page' : undefined}
                    title={item.name}
                    className={`relative px-2 xl:px-3 py-2 xl:py-2.5 rounded-lg text-sm xl:text-base font-bold transition-all duration-300 uppercase tracking-wider whitespace-nowrap flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                      currentPage === item.id
                        ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                        : 'text-gray-200 hover:bg-blue-600/20 hover:text-white hover:shadow-lg hover:scale-105'
                    }`}
                  >
                    <span className="truncate max-w-16 xl:max-w-none">{item.name}</span>
                    {currentPage === item.id && (
                      <span className="absolute -bottom-3 left-2 right-2 h-0.5 rounded bg-gradient-to-r from-indigo-400 to-teal-400" aria-hidden="true" />
                    )}
                  </button>
                )
              ))}
            </div>
          </div>

          {/* Desktop Language & Logos - Professional Layout */}
          <div className="hidden xl:flex items-center space-x-3 flex-shrink-0">
            {/* Partner Logos */}
            <div className="flex items-center space-x-2 bg-gray-700/95 rounded-2xl p-2 border border-gray-600 shadow-xl">
              <div className="relative group">
                <img
                  src="https://res.cloudinary.com/dmmll82la/image/upload/v1766683651/akfi-logo_sydpx7.png"
                  alt="AKFI Logo"
                  className="h-7 w-7 object-contain rounded-xl bg-white p-0.5 shadow-md group-hover:shadow-lg transition-all border border-gray-300"
                />
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                  AKFI Affiliated
                </div>
              </div>
            </div>

            {/* Register CTA (desktop) */}
            <button
              onClick={() => handleNavClick('register')}
              className="bg-gradient-to-r from-indigo-500 to-teal-500 text-white px-4 py-2 rounded-2xl font-bold text-sm uppercase tracking-wider shadow-2xl hover:shadow-2xl transition-all transform hover:scale-105 mr-2 flex items-center gap-2"
              title={lang === 'hi' ? 'रजिस्टर करें' : 'Register'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M12 2v20"></path>
                <path d="M5 7h14"></path>
              </svg>
              <span>{lang === 'hi' ? 'रजिस्टर करें' : 'Register'}</span>
            </button>

            {/* Language Switcher - Professional Design */}
            <button
              onClick={() => onLangChange(lang === 'en' ? 'hi' : 'en')}
              className="group relative bg-blue-600 text-white px-4 py-2 rounded-2xl font-bold text-sm uppercase tracking-wider shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 overflow-hidden"
              aria-label="Toggle language"
            >
              <div className="absolute inset-0 bg-blue-800 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative flex items-center gap-2">
                <Languages size={14} className="group-hover:rotate-12 transition-transform" />
                <span className="hidden lg:inline">{lang === 'en' ? 'हिन्दी' : 'English'}</span>
                <span className="lg:hidden">{lang === 'en' ? 'HI' : 'EN'}</span>
                <div className="w-2 h-2 bg-slate-700 rounded-full animate-pulse"></div>
              </div>
            </button>
          </div>

          {/* Mobile Menu Button - Compact Professional Design */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Language Switcher - Mobile */}
            <button
              onClick={() => onLangChange(lang === 'en' ? 'hi' : 'en')}
              className="bg-blue-600 text-white px-3 py-2 rounded-lg font-bold text-sm uppercase shadow-lg hover:shadow-xl transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              aria-label="Toggle language"
              title={lang === 'en' ? 'हिन्दी' : 'English'}
            >
              {lang === 'en' ? 'HI' : 'EN'}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              className="relative bg-blue-600 text-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              title={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Professional Design */}
      {isOpen && (
        <div id="mobile-menu" aria-hidden={!isOpen} className="lg:hidden bg-white/95 border-t border-slate-200 shadow-sm animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-4 pb-8 space-y-3 max-h-[calc(100vh-4rem)] overflow-y-auto" role="menu">
            {/* Mobile Partner Logos */}
            <div className="flex items-center justify-center space-x-4 py-4 border-b border-slate-200 mb-4">
              <div className="flex items-center space-x-2 rounded-md p-2">
                <img
                  src="https://res.cloudinary.com/dmmll82la/image/upload/v1766683651/akfi-logo_sydpx7.png"
                  alt="AKFI Logo"
                  className="h-10 w-10 object-contain rounded-md bg-white p-1"
                />
              </div>
            </div>

            {mobileNavItems.map((item, idx) => (
              <div key={item.id} className={`transform transition-all duration-300 ${idx % 2 === 0 ? 'animate-in slide-in-from-left-4' : 'animate-in slide-in-from-right-4'}`} style={{animationDelay: `${idx * 100}ms`}}>
                {item.dropdown ? (
                  <>
                    <button
                      className={`w-full text-left px-4 py-3 text-base font-semibold rounded-md flex items-center justify-between transition-colors ${
                        item.dropdown.some(sub => sub.id === currentPage)
                          ? 'bg-slate-100 text-blue-600'
                          : 'bg-white text-slate-800 hover:bg-slate-100'
                      }`}
                      onClick={() => toggleDropdown(item.id)}
                    >
                      <span className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          item.dropdown.some(sub => sub.id === currentPage) ? 'bg-white shadow-lg' : 'bg-blue-500'
                        }`}></div>
                        {item.name}
                      </span>
                      <svg
                        className={`w-5 h-5 transition-all duration-300 ${openDropdown === item.id ? 'rotate-180 scale-110' : 'hover:scale-110'}`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {openDropdown === item.id && (
                      <div className="mt-3 ml-8 space-y-2 animate-in slide-in-from-top-2 duration-500">
                      <div className="bg-gray-700/50 rounded-2xl p-3 border border-gray-600">
                        {item.dropdown.map((sub, subIdx) => (
                          <button
                            key={sub.id}
                            onClick={() => handleNavClick(sub.id)}
                            className={`block w-full text-left p-2.5 text-sm font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg mb-2 last:mb-0 ${
                              currentPage === sub.id
                                ? 'bg-blue-600 text-white shadow-xl'
                                : 'text-gray-200 hover:bg-blue-600/20 hover:text-white'
                              }`}
                              style={{ animationDelay: `${subIdx * 100}ms` }}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                  currentPage === sub.id
                                    ? 'bg-white shadow-lg'
                                    : 'bg-gradient-to-r from-blue-500 to-orange-500'
                                }`}></div>
                                <span className="truncate font-medium">{sub.name}</span>
                                {currentPage === sub.id && (
                                  <div className="ml-auto w-2 h-2 bg-slate-700 rounded-full animate-pulse"></div>
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left px-4 py-3 ${item.id === 'news' || item.id === 'gallery' ? 'text-sm' : 'text-base'} font-semibold rounded-md transition-colors ${
                      currentPage === item.id
                        ? 'bg-slate-100 text-blue-600'
                        : 'bg-white text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        currentPage === item.id ? 'bg-white' : 'bg-blue-500'
                      }`}></div>
                      {item.name}
                    </div>
                  </button>
                )}
              </div>
            ))}

            {/* Mobile CTA - Professional Design */}
            <div className="mt-8 pt-6 border-t border-gray-600">
              <div className="bg-blue-600 rounded-2xl p-6 text-white text-center shadow-xl">
                <h3 className="text-lg font-oswald font-bold mb-2">
                  {lang === 'hi' ? 'JSKA के साथ जुड़ें!' : 'Join JSKA!'}
                </h3>
                <p className="text-sm text-white/90 mb-4">
                  {lang === 'hi' ? 'अपना पंजीकरण शुरू करें' : 'Start your registration'}
                </p>
                <button
                  onClick={() => handleNavClick('register')}
                  className="bg-white text-blue-600 px-6 py-2 rounded-xl font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
                >
                  {lang === 'hi' ? 'रजिस्टर करें' : 'Register'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
