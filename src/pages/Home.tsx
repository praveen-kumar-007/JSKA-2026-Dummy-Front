import React, { useState, useEffect } from 'react';
import Hero from '../components/ui/Hero';
import { Trophy, Users, Award, Zap, ExternalLink, Megaphone, Calendar, ArrowRight } from 'lucide-react';
import { MOCK_NEWS } from '../constants';
import type { NewsArticle } from '../types';
import type { Language } from '../translations';
import { translations } from '../translations';

interface HomeProps {
  lang: Language;
  onNavigate: (page: string) => void;
}

export const Home: React.FC<HomeProps> = ({ lang, onNavigate }) => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [isLoadingNews, setIsLoadingNews] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    setIsLoadingNews(true);
    // Simulating API call
    setTimeout(() => {
      setNews(MOCK_NEWS.slice(0, 3) as NewsArticle[]);
      setIsLoadingNews(false);
    }, 800);
  }, []);

  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <Hero onRegisterClick={() => onNavigate('register')} lang={lang} />
      
      {/* ----------------------------------------------------------------------- */}
      {/* NEW: FEATURED CHAMPIONSHIP ANNOUNCEMENT SECTION */}
      {/* ----------------------------------------------------------------------- */}
      <section className="relative py-16 bg-gradient-to-br from-red-900 to-blue-950 text-white overflow-hidden border-y-8 border-orange-500">
        <div className="absolute top-0 right-0 p-4 opacity-10">
           <Trophy size={400} />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            
            {/* Left Side: Poster Image */}
            <div className="w-full lg:w-1/3">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-pink-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                {/* IMPORTANT: Replace the src below with your actual uploaded image path.
                   Example: src="/assets/championship-poster.png"
                */}
                <img 
                  src="https://res.cloudinary.com/dcqo5qt7b/image/upload/v1766845990/Gemini_Generated_Image_eyfw6eyfw6eyfw6e_pldumt.png" 
                  alt="Dhanbad Kabaddi Championship 2026" 
                  className="relative rounded-2xl shadow-2xl w-full object-cover transform transition group-hover:scale-[1.02] border-4 border-white/20"
                />
              </div>
            </div>

            {/* Right Side: The Registration Focus */}
            <div className="w-full lg:w-2/3">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 rounded-full text-xs font-bold uppercase tracking-widest mb-6 animate-pulse">
                <Megaphone size={16} />
                {lang === 'hi' ? 'आगामी प्रतियोगिता' : 'Upcoming Championship'}
              </div>

              <h2 className="text-4xl md:text-5xl font-oswald font-bold mb-4 leading-tight">
                {lang === 'hi' 
                  ? 'इंटर स्कूल धनबाद कबड्डी चैंपियनशिप 2026' 
                  : 'Inter School Dhanbad Kabaddi Championship 2026'}
              </h2>
              
              <p className="text-xl text-blue-200 mb-8 font-light border-l-4 border-orange-500 pl-4">
                 {lang === 'hi' 
                  ? 'सब-जूनियर (अंडर-16) बालक एवं बालिका वर्ग' 
                  : 'Sub-Junior (Under-16) Boys & Girls Category'}
              </p>

              {/* Attractive Info Box */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Date Block */}
                  <div className="flex items-start gap-4">
                    <div className="bg-orange-500/20 p-3 rounded-lg text-orange-400">
                      <Calendar size={28} />
                    </div>
                    <div>
                      <h4 className="text-sm uppercase tracking-wider text-blue-300 font-bold mb-1">
                        {lang === 'hi' ? 'रजिस्ट्रेशन प्रारंभ' : 'Registration Starts'}
                      </h4>
                      <p className="text-2xl font-oswald font-bold text-white">5 Jan 2026</p>
                      <p className="text-xs text-blue-200 mt-1">
                        {lang === 'hi' ? '(ऑनलाइन और ऑफलाइन)' : '(Online & Offline)'}
                      </p>
                    </div>
                  </div>

                  {/* Format Block */}
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-500/20 p-3 rounded-lg text-blue-400">
                      <Trophy size={28} />
                    </div>
                    <div>
                      <h4 className="text-sm uppercase tracking-wider text-blue-300 font-bold mb-1">
                        {lang === 'hi' ? 'प्रतियोगिता प्रारूप' : 'Tournament Format'}
                      </h4>
                      <p className="text-lg font-bold text-white leading-tight">
                        {lang === 'hi' ? 'जनवरी में 2 रविवार' : '2 Sundays in Jan'}
                      </p>
                      <p className="text-xs text-blue-200 mt-1">
                        {lang === 'hi' ? 'उद्घाटन और समापन समारोह' : 'Opening & Closing Ceremony'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                   <p className="text-sm text-center italic text-blue-100">
                     {lang === 'hi' 
                       ? '"सभी स्कूल और क्लब अपनी टीमें तैयार रखें! रजिस्ट्रेशन लिंक जल्द ही सक्रिय होगा।"'
                       : '"Schools and Clubs, get your teams ready! Registration link activating soon."'}
                   </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => onNavigate('institution')}
                  className="bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-700 transition-all shadow-lg hover:shadow-orange-500/20 flex items-center justify-center gap-2 flex-1 group"
                >
                  <Award size={20} />
                  {lang === 'hi' ? 'संस्थान एफिलिएशन (Institution Affiliation)' : 'Institution Affiliation'}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-oswald font-bold text-blue-900 mb-4 uppercase tracking-wider">{t.features.title}</h2>
            <div className="w-24 h-1.5 bg-orange-500 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {t.features.items.map((feature, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-2xl transition-all border border-slate-100 group">
                <div className="mb-6 transform group-hover:scale-110 transition-transform">
                  {idx === 0 && <Trophy className="w-10 h-10 text-orange-500" />}
                  {idx === 1 && <Users className="w-10 h-10 text-orange-500" />}
                  {idx === 2 && <Zap className="w-10 h-10 text-orange-500" />}
                  {idx === 3 && <Award className="w-10 h-10 text-orange-500" />}
                </div>
                <h3 className="text-xl font-bold mb-4 text-blue-900">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News Preview Section */}
      <section className="py-20 bg-blue-900 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-oswald font-bold uppercase mb-2">{t.news.latest}</h2>
              <p className="text-blue-200">{t.news.curated}</p>
            </div>
            <button onClick={() => onNavigate('news')} className="mt-6 md:mt-0 text-orange-400 font-bold hover:text-white flex items-center group bg-white/5 px-6 py-2 rounded-full transition-all">
              {lang === 'hi' ? 'सभी खबरें देखें' : 'View All News'} <ExternalLink size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {isLoadingNews ? (
              [1,2,3].map(i => <div key={i} className="h-64 bg-blue-800/50 rounded-2xl animate-pulse"></div>)
            ) : (
              news.map((item, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/10 hover:bg-white/20 transition-all cursor-default group">
                  <span className="text-[10px] font-bold bg-orange-600 px-3 py-1 rounded mb-6 inline-block uppercase tracking-widest">{item.category}</span>
                  <h3 className="text-xl font-bold mb-4 line-clamp-2 group-hover:text-orange-400 transition-colors">{item.title}</h3>
                  <p className="text-sm text-blue-100 line-clamp-3 mb-6 font-light">{item.content}</p>
                  <span className="text-xs text-blue-300 font-mono">{item.date}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Institution Banner CTA */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 bg-orange-600 rounded-[3rem] p-16 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-5xl font-oswald font-bold mb-8 uppercase leading-tight">
              {lang === 'hi' ? 'अपने स्कूल या क्लब का प्रतिनिधित्व करें' : 'REPRESENT YOUR SCHOOL OR CLUB'}
            </h2>
            <p className="text-xl text-orange-50 font-light mb-12 max-w-3xl mx-auto">
              {lang === 'hi' 
                ? 'क्या आप एक स्कूल समन्वयक या क्लब सचिव हैं? आधिकारिक जिला लीग और परीक्षणों में भाग लेने के लिए DDKA के साथ अपना संस्थान पंजीकृत करें।'
                : 'Are you a school coordinator or club secretary? Register your institution with DDKA to participate in official district leagues and championships.'}
            </p>
            <button 
              onClick={() => onNavigate('institution')}
              className="bg-white text-orange-600 px-12 py-5 rounded-full font-bold text-xl hover:bg-blue-900 hover:text-white transition-all transform hover:scale-105 shadow-xl"
            >
              {t.nav.institution} Affiliation
            </button>
          </div>
          <Zap className="absolute top-10 right-10 w-48 h-48 text-white/5 -rotate-12" />
          <Trophy className="absolute bottom-[-20px] left-[-20px] w-64 h-64 text-white/5 rotate-12" />
        </div>
      </section>
    </div>
  );
};

export default Home;