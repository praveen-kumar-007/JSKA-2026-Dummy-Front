import React, { useState, useEffect, useCallback } from 'react';
import { Trophy, ChevronRight, ChevronLeft } from 'lucide-react';
// 1. Import the runtime data (translations)
import { translations } from '../../translations';

// 2. Import the TypeScript label (Language)
import type { Language } from '../../translations';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface HeroProps {
  onRegisterClick: () => void;
  onScheduleClick: () => void;
  lang: Language;
}

const Hero: React.FC<HeroProps> = ({ onRegisterClick, onScheduleClick, lang }) => {
  const t = translations[lang].hero;
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch gallery images from backend
  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${API_URL}/api/gallery`);
        const result = await res.json();
        if (result.success && Array.isArray(result.data)) {
          setGalleryImages(result.data.map((img: any) => img.url));
        }
      } catch (error) {
        console.error('Failed to fetch gallery images:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, []);

  // Auto-scroll images every 3 seconds
  useEffect(() => {
    if (galleryImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [galleryImages.length]);

  const goToPrevious = useCallback(() => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
    );
  }, [galleryImages.length]);

  const goToNext = useCallback(() => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
    );
  }, [galleryImages.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentImageIndex(index);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Image Carousel Background */}
      <div className="absolute inset-0">
        {galleryImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentImageIndex
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-105'
            }`}
          >
            <img
              src={image}
              alt={`Gallery ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
          </div>
        ))}
      </div>

      {/* Fallback gradient if no images */}
      {galleryImages.length === 0 && !isLoading && (
        <div className="w-full h-full bg-gradient-to-br from-slate-950 via-royal-900 to-black"></div>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="w-full h-full bg-gradient-to-br from-slate-950 via-purple-900 to-black flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
        </div>
      )}

      {/* Navigation Arrows */}
      {galleryImages.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-slate-900 hover:bg-slate-800 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-slate-900 hover:bg-slate-800 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-10"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Image Indicators */}
      {galleryImages.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {galleryImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? 'bg-white scale-125'
                  : 'bg-slate-800 hover:bg-slate-700' 
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Content Overlay */}
      <div className="relative z-10 flex-grow max-w-7xl mx-auto px-4 w-full flex flex-col justify-center pt-24 pb-16 lg:pt-32 lg:pb-48">
        <div className="max-w-5xl">
          {/* Top Badge */}
          <div className="inline-flex items-center space-x-3 bg-slate-900 border border-slate-800 px-5 py-2.5 rounded-full mb-6 lg:mb-10 group">
            <div className="bg-purple-600 p-1.5 rounded-full animate-pulse shadow-[0_0_15px_rgba(234,88,12,0.5)]">
              <Trophy size={16} className="text-white" />
            </div>
            <span className="text-xs font-black uppercase tracking-[0.2em] text-purple-500">{t.badge}</span>
          </div>

          <h2 className="text-xl md:text-3xl font-bold text-white/70 mb-4 lg:mb-6 tracking-tight uppercase flex items-center gap-4">
             <span className="h-px w-12 bg-purple-600"></span>
             State League 2026
          </h2>

          <h1 className="text-5xl sm:text-8xl md:text-[10rem] font-black mb-6 lg:mb-10 leading-[0.85] uppercase tracking-tighter text-white">
            {t.title} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-500 via-royal-400 to-white drop-shadow-2xl">
              {t.subtitle}
            </span>
          </h1>

          {/* Advanced Affiliation Glass Card */}
          <div className="mb-8 lg:mb-16 relative group max-w-4xl">
            <div className="absolute -inset-1 bg-gradient-to-r from-royal-600/20 to-teal-600/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative bg-slate-900 border border-slate-800 p-5 lg:p-8 rounded-3xl shadow-2xl overflow-hidden">
              {/* Inner Glow */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-8 relative z-10">
                {[
                  { text: 'Affiliated To - JHARKHAND STATE KABADDI ASSOCIATION', label: lang === 'hi' ? 'संबद्धता' : 'Affiliation', color: 'bg-purple-500' },
                  { text: 'Registered with 1860 Govt. of Jharkhand', label: lang === 'hi' ? 'पंजीकरण' : 'Registration', color: 'bg-purple-500' },
                  { text: 'Affiliated for - A.K.F.I. & Jharkhand Olympic Association', label: lang === 'hi' ? 'मान्यता' : 'Recognition', color: 'bg-purple-500' }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col space-y-3 group/item">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${item.color} shadow-[0_0_10px_rgba(249,115,22,0.8)] animate-pulse`}></div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-purple-400/80">{item.label}</span>
                    </div>
                    <p className="text-[11px] md:text-xs font-bold uppercase tracking-wider text-white leading-snug group-hover/item:text-purple-400 transition-colors">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <button
              onClick={onRegisterClick}
              className="relative overflow-hidden bg-purple-600 hover:bg-purple-500 text-white px-14 py-7 rounded-2xl font-black text-2xl uppercase tracking-tighter transition-all group shadow-black-effect active:scale-95 transform hover:-translate-y-1"
            >
              <span className="relative z-10 flex items-center justify-center">
                {t.ctaPrimary}
                <ChevronRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" strokeWidth={3} />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>

            <button
              onClick={onScheduleClick}
              className="bg-royal-600 hover:bg-royal-700 text-white px-14 py-7 rounded-2xl font-black text-2xl uppercase tracking-tighter transition-all active:scale-95 transform hover:-translate-y-1 shadow-black-effect"
            >
              {t.ctaSecondary}
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overlay - Desktop */}
      <div className="hidden lg:block bg-slate-950 border-t border-slate-800 w-full mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-12 flex items-center justify-between">
          <div className="flex items-center space-x-12 border-r border-white/10 pr-20">
            <div className="relative group">
              <div className="absolute -inset-2 bg-white rounded-full blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
              <img src="https://res.cloudinary.com/dmmll82la/image/upload/v1766683651/akfi-logo_sydpx7.png" alt="AKFI" className="h-24 w-24 rounded-full bg-white p-1.5 relative" />
            </div>
          </div>
          <div className="flex-1 grid grid-cols-4 gap-16 text-white text-center pl-20">
            {[
              { val: '50+', label: t.stats.clubs },
              { val: '1200+', label: t.stats.players },
              { val: '12', label: t.stats.titles },
              { val: '24/7', label: t.stats.support }
            ].map((stat, i) => (
              <div key={i} className="group cursor-default">
                <p className="text-6xl font-black tracking-tighter text-white group-hover:text-purple-500 transition-colors duration-300">{stat.val}</p>
                <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-black mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
