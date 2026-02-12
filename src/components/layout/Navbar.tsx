import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { 
  Menu, X, ChevronDown, Home, Info, 
  Image as ImageIcon, Newspaper, UserPlus, LogIn, 
  ShieldCheck, Trophy, Users, Landmark, FileText, 
  UserCheck, Award, Globe, ChevronRight, Zap, Star
} from 'lucide-react';
import { translations } from '../../translations';
import type { Language } from '../../translations';

// --- Types ---
interface NavbarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  lang: Language;
  onLangChange: (lang: Language) => void;
}

interface NavItem {
  name: string;
  id: string;
  icon: React.ReactNode;
  description: string;
  dropdown?: { name: string; id: string; icon: React.ReactNode; desc: string }[];
}

// --- Configuration ---
const getNavConfig = (t: any, lang: Language): NavItem[] => [
  { 
    name: t.nav.home, id: 'home', icon: <Home size={18} />, 
    description: lang === 'hi' ? 'मुख्य पृष्ठ' : 'JSKA Digital Portal' 
  },
  {
    name: t.nav.about, id: 'about', icon: <Info size={18} />,
    description: lang === 'hi' ? 'हमारे बारे में' : 'History & Structure',
    dropdown: [
      { name: lang === 'hi' ? 'समिति' : 'Committee', id: 'committee', icon: <Users size={16} />, desc: 'Executive Board' },
      { name: lang === 'hi' ? 'इकाइयाँ' : 'Affiliated Units', id: 'units', icon: <Landmark size={16} />, desc: 'District Bodies' },
      { name: lang === 'hi' ? 'नियम' : 'Constitution', id: 'constitution', icon: <FileText size={16} />, desc: 'Rules & Bylaws' },
    ]
  },
  {
    name: lang === 'hi' ? 'पंजीकरण' : 'Join Us', id: 'register', icon: <UserPlus size={18} />,
    description: lang === 'hi' ? 'रजिस्टर करें' : 'Get Registered Today',
    dropdown: [
      { name: lang === 'hi' ? 'खिलाड़ी' : 'Player', id: 'register-player', icon: <UserCheck size={16} />, desc: 'For Upcoming Talent' },
      { name: lang === 'hi' ? 'ऑफिशियल' : 'Official', id: 'technical-official-registration', icon: <Award size={16} />, desc: 'Referees & Coaches' },
    ]
  },
  {
    name: 'JSKA Hub', id: 'hub', icon: <ShieldCheck size={18} />,
    description: lang === 'hi' ? 'सदस्य लॉगिन' : 'Secure Member Login',
    dropdown: [
      { name: lang === 'hi' ? 'प्लेयर लॉगिन' : 'Player Access', id: 'player-login', icon: <LogIn size={16} />, desc: 'Athlete Dashboard' },
      { name: t.nav.login, id: 'member-login', icon: <ShieldCheck size={16} />, desc: 'Officer Portal' },
      { name: t.verification.navLabel, id: 'verification', icon: <Star size={16} />, desc: 'Verify Certificates' },
    ]
  },
  { name: t.nav.gallery, id: 'gallery', icon: <ImageIcon size={18} />, description: 'Media' },
  { name: t.nav.news, id: 'news', icon: <Newspaper size={18} />, description: 'Updates' },
];

// --- Sub-Component: Unique High-End Language Toggle ---
const LanguageDial: React.FC<{ lang: Language; onChange: (l: Language) => void }> = ({ lang, onChange }) => (
  <div className="relative flex items-center bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-inner group">
    <motion.div
      layoutId="activeTab"
      className="absolute h-[34px] w-[60px] bg-white rounded-xl shadow-lg border border-orange-200 z-0"
      animate={{ x: lang === 'en' ? 0 : 66 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    />
    <button
      onClick={() => onChange('en')}
      className={`relative z-10 w-[60px] h-[34px] text-[10px] font-black tracking-widest transition-colors duration-300 ${lang === 'en' ? 'text-orange-600' : 'text-slate-400'}`}
    >
      ENG
    </button>
    <button
      onClick={() => onChange('hi')}
      className={`relative z-10 w-[60px] h-[34px] text-[10px] font-black tracking-widest transition-colors duration-300 ${lang === 'hi' ? 'text-orange-600' : 'text-slate-400'}`}
    >
      हिन्दी
    </button>
  </div>
);

// --- Main Component ---
const Navbar: React.FC<NavbarProps> = ({ currentPage, onPageChange, lang, onLangChange }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const t = translations[lang];
  const navItems = useMemo(() => getNavConfig(t, lang), [t, lang]);

  // Scroll Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    onPageChange(id);
    setIsMobileOpen(false);
    setMobileExpanded(null);
  };

  return (
    <>
      {/* Header Spacer - Prevents content from going under the fixed navbar */}
      <div className="h-[70px] md:h-[110px] w-full" />

      <header className="fixed top-0 left-0 right-0 z-[100] font-oswald selection:bg-orange-100">
        <motion.div className="h-1 bg-orange-500 origin-left z-[110]" style={{ scaleX }} />

        {/* TOP BAR: Official Info */}
        <div className={`hidden lg:flex bg-[#0f172a] text-white overflow-hidden transition-all duration-500 ${scrolled ? 'h-0' : 'h-10'}`}>
          <div className="max-w-7xl mx-auto px-8 w-full flex justify-between items-center text-[10px] font-black tracking-[0.2em] uppercase">
            <div className="flex items-center space-x-8">
              <span className="flex items-center gap-2 text-orange-400"><Trophy size={14} /> Affiliated to AKFI India</span>
              <span className="flex items-center gap-2 text-green-400"><Zap size={14} className="animate-pulse" /> Digital Registration Active</span>
            </div>
            <div className="flex items-center space-x-6">
              <span className="opacity-70">Recognition: MYAS, Government of India</span>
              <div className="h-4 w-px bg-white/10" />
              <div className="flex items-center gap-2">
                <Globe size={14} className="text-orange-400" />
                <span>Ranchi HQ</span>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN NAV: White Surface */}
        <nav className={`transition-all duration-500 bg-white ${scrolled ? 'py-1 shadow-2xl' : 'py-3 md:py-5 border-b border-slate-50'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              
              {/* BRANDING: Crystal Clear Logo & Single Line Fluid Typography */}
              <div 
                className="flex items-center space-x-3 md:space-x-5 cursor-pointer shrink-0 transition-all active:scale-95 group"
                onClick={() => handleNavClick('home')}
              >
                <img src="/logo.png" alt="JSKA" className="h-12 w-12 md:h-16 md:w-16 object-contain" />
                <div className="flex flex-col border-l-2 border-slate-100 pl-3 md:pl-5 py-0.5">
                  <span className="text-2xl md:text-3xl font-black text-[#0f172a] leading-none tracking-tighter">
                    JSKA<span className="text-orange-600">.</span>
                  </span>
                  <span className="text-[clamp(8.5px,2.5vw,11.5px)] font-black text-slate-500 uppercase tracking-tight md:tracking-[0.15em] mt-1.5 block whitespace-nowrap overflow-hidden">
                    {lang === 'hi' ? 'झारखंड राज्य कबड्डी संघ' : 'Jharkhand State Kabaddi Association'}
                  </span>
                </div>
              </div>

              {/* DESKTOP MENU: Bento-Style Dropdowns */}
              <div className="hidden lg:flex items-center space-x-1">
                {navItems.map((item) => (
                  <div 
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => setHoveredNav(item.id)}
                    onMouseLeave={() => setHoveredNav(null)}
                  >
                    <button
                      onClick={() => !item.dropdown && handleNavClick(item.id)}
                      className={`px-4 py-2.5 rounded-xl text-[13px] font-black tracking-tight transition-all flex items-center gap-2 ${
                        currentPage === item.id || item.dropdown?.some(sub => sub.id === currentPage)
                        ? 'text-orange-600 bg-orange-50'
                        : 'text-slate-700 hover:text-orange-600 hover:bg-slate-50'
                      }`}
                    >
                      {item.name}
                      {item.dropdown && <ChevronDown size={14} className={`transition-transform duration-300 ${hoveredNav === item.id ? 'rotate-180' : ''}`} />}
                    </button>

                    <AnimatePresence>
                      {item.dropdown && hoveredNav === item.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute left-0 mt-3 w-80 bg-white border border-slate-100 shadow-[0_30px_60px_rgba(0,0,0,0.12)] rounded-[24px] overflow-hidden p-3 z-[200]"
                        >
                          <div className="px-3 py-2 border-b border-slate-50 mb-2">
                             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.description}</span>
                          </div>
                          <div className="grid gap-2">
                            {item.dropdown.map((sub) => (
                              <button
                                key={sub.id}
                                onClick={() => handleNavClick(sub.id)}
                                className={`w-full flex items-center gap-4 p-3.5 rounded-2xl transition-all group ${
                                  currentPage === sub.id ? 'bg-orange-600 text-white shadow-lg shadow-orange-200' : 'hover:bg-slate-50 text-slate-700 hover:text-orange-600'
                                }`}
                              >
                                <div className={`p-2 rounded-xl transition-colors ${currentPage === sub.id ? 'bg-white/20' : 'bg-slate-100 group-hover:bg-orange-100'}`}>
                                  {sub.icon}
                                </div>
                                <div className="flex flex-col items-start text-left leading-tight">
                                  <span className="text-[13px] font-black uppercase tracking-tight">{sub.name}</span>
                                  <span className={`text-[10px] mt-1 font-bold ${currentPage === sub.id ? 'text-white/70' : 'text-slate-400'}`}>{sub.desc}</span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* ACTION AREA: AKFI Badge & Premium Switcher */}
              <div className="hidden lg:flex items-center space-x-6 shrink-0">
                <LanguageDial lang={lang} onChange={onLangChange} />

                <div className="bg-[#0f172a] text-white p-2 pr-6 rounded-[20px] flex items-center gap-4 border border-slate-800 shadow-xl group hover:border-orange-500/50 transition-all cursor-default overflow-hidden relative">
                  <div className="bg-white p-1 rounded-xl shadow-inner relative z-10 group-hover:rotate-6 transition-transform">
                    <img src="/akfi-logo_sydpx7.png" alt="AKFI" className="h-8 w-8 object-contain" />
                  </div>
                  <div className="flex flex-col relative z-10">
                    <span className="text-[10px] font-black text-orange-400 uppercase tracking-[0.2em] leading-none">Affiliated</span>
                    <span className="text-[13px] font-black text-white tracking-widest mt-1 uppercase leading-none">AKFI INDIA</span>
                  </div>
                  <div className="absolute top-0 right-0 p-1 opacity-10 group-hover:opacity-20 transition-opacity">
                    <ShieldCheck size={40} className="text-white" />
                  </div>
                </div>
              </div>

              {/* MOBILE TRIGGER */}
              <div className="lg:hidden flex items-center gap-4">
                 <button onClick={() => onLangChange(lang === 'en' ? 'hi' : 'en')} className="font-black text-[11px] text-orange-600 bg-orange-50 px-3 py-2 rounded-xl active:scale-90 transition-transform">
                   {lang === 'en' ? 'HI' : 'EN'}
                 </button>
                 <button 
                  onClick={() => setIsMobileOpen(true)} 
                  className="w-12 h-12 bg-[#0f172a] text-white flex items-center justify-center rounded-2xl shadow-xl active:scale-90 transition-all"
                 >
                   <Menu size={24} />
                 </button>
              </div>
            </div>
          </div>
        </nav>

        {/* MOBILE SIDEBAR: High-End Sheet */}
        <AnimatePresence>
          {isMobileOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm lg:hidden z-[120]" 
                onClick={() => setIsMobileOpen(false)} 
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[340px] bg-white z-[130] shadow-2xl lg:hidden flex flex-col"
              >
                <div className="p-6 flex items-center justify-between border-b border-slate-50">
                  <div className="flex items-center gap-3">
                    <img src="/logo.png" alt="Logo" className="h-10 w-10" />
                    <span className="font-black text-[#0f172a] tracking-tighter">JSKA MENU</span>
                  </div>
                  <button onClick={() => setIsMobileOpen(false)} className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                    <X size={20} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto px-5 py-8 space-y-4">
                  {/* AKFI Card Mobile */}
                  <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-[24px] p-6 mb-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 opacity-10"><Trophy size={40} className="text-white" /></div>
                    <div className="flex items-center gap-4 relative z-10">
                      <div className="bg-white p-2 rounded-xl shadow-lg">
                        <img src="/akfi-logo_sydpx7.png" alt="AKFI" className="h-10 w-10 object-contain" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest leading-none mb-1">Affiliated Unit</span>
                        <span className="text-[13px] font-black text-white leading-tight uppercase tracking-tight">Amateur Kabaddi Federation of India</span>
                      </div>
                    </div>
                  </div>

                  {navItems.map((item) => (
                    <div key={item.id} className="space-y-2">
                      <button
                        onClick={() => item.dropdown ? setMobileExpanded(mobileExpanded === item.id ? null : item.id) : handleNavClick(item.id)}
                        className={`w-full flex items-center justify-between p-4 rounded-2xl font-black text-[15px] tracking-tight transition-all ${
                          currentPage === item.id ? 'bg-orange-600 text-white shadow-lg' : 'bg-slate-50 text-slate-900'
                        }`}
                      >
                        <span className="flex items-center gap-4">
                          {React.cloneElement(item.icon as React.ReactElement, { size: 18 })}
                          {item.name}
                        </span>
                        {item.dropdown && <ChevronRight size={18} className={`transition-transform duration-300 ${mobileExpanded === item.id ? 'rotate-90' : ''}`} />}
                      </button>

                      {/* Mobile Dropdown (Accordion) */}
                      <AnimatePresence>
                        {item.dropdown && mobileExpanded === item.id && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }} 
                            animate={{ height: 'auto', opacity: 1 }} 
                            exit={{ height: 0, opacity: 0 }} 
                            className="overflow-hidden"
                          >
                            <div className="ml-6 border-l-2 border-slate-100 pl-4 py-2 space-y-2">
                              {item.dropdown.map(sub => (
                                <button
                                  key={sub.id}
                                  onClick={() => handleNavClick(sub.id)}
                                  className={`w-full text-left p-3.5 rounded-xl text-[14px] font-bold transition-all ${
                                    currentPage === sub.id ? 'text-orange-600 bg-orange-50' : 'text-slate-500 active:text-slate-900'
                                  }`}
                                >
                                  {sub.name}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

                {/* MOBILE FOOTER */}
                <div className="p-6 border-t border-slate-50 bg-slate-50/50 space-y-4">
                  <button 
                    onClick={() => handleNavClick('member-login')}
                    className="w-full py-4 bg-[#0f172a] text-white rounded-[20px] font-black text-[12px] tracking-[0.2em] uppercase shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-3"
                  >
                    <ShieldCheck size={18} className="text-orange-400" />
                    Secure Member Login
                  </button>
                  <p className="text-[9px] text-center text-slate-400 font-bold uppercase tracking-tighter opacity-70">
                    © Jharkhand State Kabaddi Association
                  </p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>


    </>
  );
};

export default Navbar;