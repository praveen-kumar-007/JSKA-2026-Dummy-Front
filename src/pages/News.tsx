import React, { useState, useEffect } from 'react';
import { Newspaper, Calendar, Tag, ChevronRight, Share2, Sparkles } from 'lucide-react';
import type { Language } from '../translations';
import { translations } from '../translations';

// --- Types Definition (Fixed ID issues) ---
export interface NewsItem {
  id: string; // Changed to string for better uniqueness
  title: string;
  date: string;
  category: string;
  content: string;
  isHighlight?: boolean; // Optional prop to style important news differently
}

interface NewsProps {
  lang: Language;
}

// --- Data Source ---
const NEWS_DATA: Record<Language, NewsItem[]> = {
  en: [
    {
      id: 'news-001',
      title: "Sub-Junior National Camp Selection",
      date: "10 Jan 2026",
      category: "Selection News",
      content: "Names for the state-level camp of Dhanbad players selected for the Sub-Junior National Kabaddi Competition. Location: Ranchi. Selected Girls: Muskan Gupta, Soni Kumari, Riya Kumari. Selected Boys: Nayan Kumar. (By: Mintu Thakur, Secretary DDKA).",
      isHighlight: true
    },
    {
      id: 'news-002',
      title: "Inter School Kabaddi Championship 2026",
      date: "Coming Soon",
      category: "Upcoming Event",
      content: "Get ready, Dhanbad District! The Inter School Dhanbad Kabaddi Championship 2026 is coming soon. Organized by DDKA. 'Le Panga!'",
      isHighlight: false
    }
  ],
  hi: [
    {
      id: 'news-001',
      title: "सब जूनियर नेशनल कैंप हेतु चयन",
      date: "10-01-2026",
      category: "चयन समाचार",
      content: "सब जूनियर नेशनल कबड्डी प्रतियोगिता में राज्य चयनित धनबाद के खिलाड़ियों के केम्प हेतु नाम। स्थान: रांची। बालिका वर्ग: 1) मुस्कान गुप्ता, 2) सोनी कुमारी, 3) रिया कुमारी। बालक वर्ग: 1) नयन कुमार। (मिंटू ठाकुर, सचिव, डी डी के ए)।",
      isHighlight: true
    },
    {
      id: 'news-002',
      title: "इंटर स्कूल कबड्डी चैंपियनशिप 2026",
      date: "जल्द आ रहा है",
      category: "आगामी कार्यक्रम",
      content: "तैयार हो जाइए! इंटर स्कूल धनबाद कबड्डी चैंपियनशिप 2026 जल्द आ रहा है। धनबाद जिला कबड्डी संघ (DDKA) द्वारा आयोजित। 'ले पंगा!'",
      isHighlight: false
    }
  ]
};

export const News: React.FC<NewsProps> = ({ lang }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const t = translations[lang];

  // Fetch Logic
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setNews(NEWS_DATA[lang] || NEWS_DATA['en']);
      setIsLoading(false);
    }, 600); // Slightly faster load for better UX
    return () => clearTimeout(timer);
  }, [lang]);

  return (
    <div className="relative py-24 overflow-hidden bg-slate-50">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-50 to-transparent pointer-events-none" />
      <div className="absolute top-20 right-0 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                <Sparkles size={12} /> {lang === 'en' ? 'Latest Updates' : 'ताज़ा ख़बर'}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-oswald font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600 leading-tight">
              {t.news.title}
            </h1>
            <p className="text-slate-500 mt-4 text-lg max-w-lg leading-relaxed">
              {t.news.subtitle}
            </p>
          </div>

          <button 
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => {
                setNews(NEWS_DATA[lang]);
                setIsLoading(false);
              }, 600);
            }}
            className="group relative px-6 py-3 bg-white border border-slate-200 rounded-full font-bold text-blue-900 shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center gap-2 overflow-hidden"
          >
            <div className="absolute inset-0 bg-blue-50 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <Newspaper size={18} className="relative z-10" />
            <span className="relative z-10">{t.news.refresh}</span>
          </button>
        </div>

        {/* Content Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 bg-white rounded-3xl shadow-sm border border-slate-100 animate-pulse p-6">
                <div className="h-4 bg-slate-100 rounded w-1/3 mb-6" />
                <div className="h-8 bg-slate-100 rounded w-3/4 mb-4" />
                <div className="h-4 bg-slate-100 rounded w-full mb-2" />
                <div className="h-4 bg-slate-100 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <article 
                key={item.id} // Using unique string ID
                className="group relative flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                {/* Card Top Border/Accent */}
                <div className={`h-1.5 w-full ${item.isHighlight ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-gradient-to-r from-blue-400 to-blue-600'}`} />

                <div className="p-8 flex flex-col h-full">
                  {/* Meta Data */}
                  <div className="flex justify-between items-start mb-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 ${
                      item.isHighlight 
                        ? 'bg-orange-50 text-orange-700' 
                        : 'bg-blue-50 text-blue-700'
                    }`}>
                      <Tag size={10} />
                      {item.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-400 text-xs font-medium bg-slate-50 px-2 py-1 rounded-lg">
                      <Calendar size={12} />
                      {item.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-800 mb-4 leading-snug group-hover:text-blue-700 transition-colors">
                    {item.title}
                  </h3>

                  {/* Content */}
                  <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow border-l-2 border-slate-100 pl-4">
                    {item.content}
                  </p>

                  {/* Footer Actions */}
                  <div className="mt-auto pt-6 border-t border-slate-50 flex justify-between items-center">
                    <button className="text-blue-900 font-bold text-sm flex items-center gap-1 group/btn hover:text-orange-600 transition-colors">
                      {t.news.readMore}
                      <ChevronRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                    </button>
                    
                    <button className="text-slate-300 hover:text-blue-600 transition-colors p-2 hover:bg-blue-50 rounded-full">
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default News;