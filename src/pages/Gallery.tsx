import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import type { Language } from '../translations';
import { X, ChevronLeft, ChevronRight, Download, Share2, Heart, Eye } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface GalleryProps {
  lang: Language;
}

export const Gallery: React.FC<GalleryProps> = ({ lang }) => {
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [likedImages, setLikedImages] = useState<Set<number>>(new Set());
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch gallery images from backend with loading state
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${API_URL}/api/gallery`);
        const result = await res.json();
        if (result.success && Array.isArray(result.data)) {
          // Sanitize URLs on the client as a safety net (trim, remove newlines, upgrade http -> https)
          setGalleryImages(result.data.map((img: any) => {
            let url = (img.url || '').replace(/[\r\n\t]+/g, '').trim();
            if (url.startsWith('http://')) url = url.replace(/^http:\/\//i, 'https://');
            if (url.startsWith('//')) url = 'https:' + url;
            return url;
          }));
        } else {
          setGalleryImages([]);
        }
      } catch (e) {
        setGalleryImages([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, []);

  const closeModal = () => {
    setSelectedIndex(null);
    setIsZoomed(false);
  };

  const showNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev !== null && prev < galleryImages.length - 1 ? prev + 1 : 0));
    setIsZoomed(false);
  }, [selectedIndex, galleryImages.length]);

  const showPrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : galleryImages.length - 1));
    setIsZoomed(false);
  }, [selectedIndex, galleryImages.length]);

  const toggleLike = (index: number) => {
    setLikedImages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };
    if (selectedIndex !== null) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [selectedIndex, showNext, showPrev]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && e.target === modalRef.current) {
      if (isZoomed) {
        setIsZoomed(false);
      } else {
        closeModal();
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>
          {lang === 'hi'
            ? 'JSKA फोटो गैलरी | झारखंड कबड्डी तस्वीरें'
            : 'JSKA Kabaddi Gallery | Jharkhand Kabaddi Photos' }
        </title>
        <meta
          name="description"
          content={
            lang === 'hi'
              ? 'झारखंड राज्य कबड्डी संघ (JSKA) द्वारा आयोजित कबड्डी मैचों, खिलाड़ियों और प्रतियोगिताओं की फोटो गैलरी।'
              : 'Photo gallery of Kabaddi matches, players and championships organised by Jharkhand State Kabaddi Association (JSKA) in Jharkhand.'
          }
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-orange-500/10 to-black/10"></div>
          <div className="absolute top-20 left-20 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-orange-400/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-black/10 rounded-full blur-3xl"></div>

          <div className="relative max-w-7xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 border border-slate-800 rounded-full text-white font-bold text-sm uppercase tracking-wider mb-8 shadow-lg">
              <Eye className="w-5 h-5" />
              {lang === 'hi' ? 'फोटो गैलरी' : 'Photo Gallery'}
            </div>

            <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-blue-600 via-orange-500 to-black bg-clip-text text-transparent mb-8 leading-tight">
              {lang === 'hi' ? 'JSKA गैलरी' : 'JSKA Gallery'}
            </h1>

            <div className="w-32 h-2 bg-gradient-to-r from-blue-400 to-orange-400 mx-auto rounded-full shadow-lg mb-8"></div>

            <p className="text-2xl text-gray-700 font-light max-w-4xl mx-auto leading-relaxed">
              {lang === 'hi' ? 'कबड्डी के क्षणों को कैद करना • उपलब्धियों को साझा करना • यादों को जीवंत रखना' : 'Capturing Kabaddi Moments • Sharing Achievements • Keeping Memories Alive'}
            </p>
          </div>
        </section>

        {/* Gallery Grid - Modern Masonry Style */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-300 rounded-2xl aspect-square"></div>
                  </div>
                ))}
              </div>
            ) : galleryImages.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Eye className="w-12 h-12 text-rose-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {lang === 'hi' ? 'कोई फोटो नहीं मिली' : 'No Photos Found'}
                </h3>
                <p className="text-gray-600">
                  {lang === 'hi' ? 'फिलहाल कोई गैलरी इमेज उपलब्ध नहीं है।' : 'No gallery images available at the moment.'}
                </p>
              </div>
            ) : (
              <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
                {galleryImages.map((image, index) => (
                  <div
                    key={index}
                    className="group relative break-inside-avoid mb-6 cursor-pointer transform hover:scale-105 transition-all duration-300"
                    onClick={() => setSelectedIndex(index)}
                  >
                    <div className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
                      <img
                        src={image}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleLike(index);
                                }}
                                className={`p-2 rounded-full border transition-all ${
                                  likedImages.has(index)
                                    ? 'bg-red-500/20 border-red-400 text-red-400'
                                    : 'bg-slate-900 border-slate-800 text-white hover:bg-slate-800' 
                                }`}
                              >
                                <Heart
                                  className={`w-5 h-5 ${likedImages.has(index) ? 'fill-current' : ''}`}
                                />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Share functionality
                                }}
                                className="p-2 rounded-full bg-slate-900 border border-slate-800 text-white hover:bg-slate-800 transition-all"
                              >
                                <Share2 className="w-5 h-5" />
                              </button>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                // Download functionality
                              }}
                              className="p-2 rounded-full bg-slate-900 border border-slate-800 text-white hover:bg-slate-800 transition-all"
                            >
                              <Download className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Gallery Stats */}
        <section className="py-16 bg-gradient-to-r from-blue-50 via-orange-50 to-black/5">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-orange-500 to-black bg-clip-text text-transparent mb-4">
                {lang === 'hi' ? 'गैलरी आँकड़े' : 'Gallery Stats'}
              </h2>
              <p className="text-gray-600">
                {lang === 'hi' ? 'हमारे संग्रह में कैद किए गए क्षणों का एक झलक' : 'A glimpse of the moments captured in our collection'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Eye className="w-10 h-10 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{galleryImages.length}</div>
                <div className="text-gray-600">
                  {lang === 'hi' ? 'कुल फोटो' : 'Total Photos'}
                </div>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{likedImages.size}</div>
                <div className="text-gray-600">
                  {lang === 'hi' ? 'पसंद किए गए' : 'Liked Images'}
                </div>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-black rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Share2 className="w-10 h-10 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">∞</div>
                <div className="text-gray-600">
                  {lang === 'hi' ? 'साझा किए गए' : 'Shared Moments'}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Modal */}
      {selectedIndex !== null && (
        <div
          ref={modalRef}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 z-10 p-3 bg-slate-900 rounded-full text-white hover:bg-slate-800 transition-all"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={showPrev}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-slate-900 rounded-full text-white hover:bg-slate-800 transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={showNext}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-slate-900 rounded-full text-white hover:bg-slate-800 transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="relative max-w-full max-h-full flex items-center justify-center">
            <img
              src={galleryImages[selectedIndex]}
              alt="Full screen view"
              className={`
                transition-all duration-500 ease-in-out select-none
                ${isZoomed
                  ? 'max-w-none h-auto min-h-screen md:min-h-full object-cover scale-100'
                  : 'max-w-full max-h-[90vh] md:max-h-full object-contain'
                }
              `}
              onClick={() => setIsZoomed(!isZoomed)}
            />

            {!isZoomed && (
              <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none md:hidden animate-pulse">
                <span className="text-white/70 text-xs bg-slate-800/60 px-3 py-1 rounded-full">
                  {lang === 'hi' ? 'ज़ूम करने के लिए टैप करें' : 'Tap to zoom'}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;