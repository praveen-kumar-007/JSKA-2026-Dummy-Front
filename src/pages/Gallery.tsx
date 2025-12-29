import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { Language } from '../translations';
import { translations } from '../translations';

// The complete list of your 60+ images
const GALLERY_IMAGES = [
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020628/WhatsApp_Image_2025-12-28_at_9.36.24_PM_xcs0pf.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020628/WhatsApp_Image_2025-12-28_at_9.36.23_PM_1_ouldtb.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020628/WhatsApp_Image_2025-12-28_at_9.36.23_PM_igfav4.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020628/WhatsApp_Image_2025-12-28_at_9.36.24_PM_1_fcfroo.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020628/WhatsApp_Image_2025-12-28_at_9.36.23_PM_2_o5bzhx.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020628/WhatsApp_Image_2025-12-28_at_9.36.22_PM_qtyypz.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020618/WhatsApp_Image_2025-12-28_at_9.36.20_PM_1_sat7nu.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020618/WhatsApp_Image_2025-12-28_at_9.36.20_PM_ahmkwy.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020618/WhatsApp_Image_2025-12-28_at_9.36.22_PM_1_ma63kg.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020617/WhatsApp_Image_2025-12-28_at_9.36.21_PM_waqfnk.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020617/WhatsApp_Image_2025-12-28_at_9.36.21_PM_1_jsv6i8.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020616/WhatsApp_Image_2025-12-28_at_9.36.18_PM_1_ljmepp.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020616/WhatsApp_Image_2025-12-28_at_9.36.19_PM_kwwmnp.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020616/WhatsApp_Image_2025-12-28_at_9.36.17_PM_kubsnz.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020616/WhatsApp_Image_2025-12-28_at_9.36.19_PM_1_qmykif.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020616/WhatsApp_Image_2025-12-28_at_9.36.17_PM_1_innzcy.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020616/WhatsApp_Image_2025-12-28_at_9.36.16_PM_gteuog.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020605/WhatsApp_Image_2025-12-28_at_9.36.16_PM_1_sie63y.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020604/WhatsApp_Image_2025-12-28_at_9.37.35_PM_xavthr.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020603/WhatsApp_Image_2025-12-28_at_9.36.15_PM_vdbojs.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020603/WhatsApp_Image_2025-12-28_at_9.36.15_PM_1_zwlegv.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020603/WhatsApp_Image_2025-12-28_at_9.36.05_PM_zzuamb.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020602/WhatsApp_Image_2025-12-28_at_9.37.34_PM_yuce6a.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020602/WhatsApp_Image_2025-12-28_at_9.36.04_PM_1_vrzl09.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020602/WhatsApp_Image_2025-12-28_at_9.37.35_PM_1_bypar5.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020601/WhatsApp_Image_2025-12-28_at_9.37.34_PM_1_sw4jre.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020590/WhatsApp_Image_2025-12-28_at_9.37.32_PM_1_kgojix.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020584/WhatsApp_Image_2025-12-28_at_9.37.31_PM_zngta3.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020581/WhatsApp_Image_2025-12-28_at_9.37.28_PM_wcyaii.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020583/WhatsApp_Image_2025-12-28_at_9.37.30_PM_mpxj6v.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020582/WhatsApp_Image_2025-12-28_at_9.37.29_PM_d7rewb.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020580/WhatsApp_Image_2025-12-28_at_9.37.27_PM_if3nsx.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020580/WhatsApp_Image_2025-12-28_at_9.37.27_PM_1_xz2sbj.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020580/WhatsApp_Image_2025-12-28_at_9.37.25_PM_c8k55g.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020559/WhatsApp_Image_2025-12-28_at_9.37.22_PM_g46eka.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020559/WhatsApp_Image_2025-12-28_at_9.37.24_PM_1_ygahci.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020559/WhatsApp_Image_2025-12-28_at_9.37.24_PM_hpn7if.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020559/WhatsApp_Image_2025-12-28_at_9.37.23_PM_1_wgkljd.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020558/WhatsApp_Image_2025-12-28_at_9.37.22_PM_1_j6h5cm.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020557/WhatsApp_Image_2025-12-28_at_9.37.17_PM_rvxdlu.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020556/WhatsApp_Image_2025-12-28_at_9.37.19_PM_1_czwr8t.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020556/WhatsApp_Image_2025-12-28_at_9.37.16_PM_bowjtm.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020556/WhatsApp_Image_2025-12-28_at_9.36.59_PM_sijegu.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020555/WhatsApp_Image_2025-12-28_at_9.37.01_PM_emd1r6.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020555/WhatsApp_Image_2025-12-28_at_9.37.00_PM_boupcf.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020554/WhatsApp_Image_2025-12-28_at_9.36.57_PM_vosq2a.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020555/WhatsApp_Image_2025-12-28_at_9.36.58_PM_bee8ag.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020555/WhatsApp_Image_2025-12-28_at_9.36.59_PM_1_ki4owl.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020554/WhatsApp_Image_2025-12-28_at_9.36.34_PM_j1vius.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020554/WhatsApp_Image_2025-12-28_at_9.36.57_PM_1_as9ym7.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020554/WhatsApp_Image_2025-12-28_at_9.36.56_PM_kjwen4.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020553/WhatsApp_Image_2025-12-28_at_9.36.40_PM_1_l29sbl.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020553/WhatsApp_Image_2025-12-28_at_9.36.36_PM_1_mlqrgz.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020553/WhatsApp_Image_2025-12-28_at_9.36.52_PM_nfbjs5.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020550/WhatsApp_Image_2025-12-28_at_9.36.44_PM_hpokc4.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020549/WhatsApp_Image_2025-12-28_at_9.36.44_PM_1_neo7te.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020549/WhatsApp_Image_2025-12-28_at_9.36.27_PM_nyyuvo.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020549/WhatsApp_Image_2025-12-28_at_9.36.43_PM_b9wmfl.jpg",
  "https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767020548/WhatsApp_Image_2025-12-28_at_9.36.26_PM_v58ic9.jpg"
];

interface GalleryProps {
  lang: Language;
}

export const Gallery: React.FC<GalleryProps> = ({ lang }) => {
  const t = translations[lang];
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const closeModal = () => {
    setSelectedIndex(null);
    setIsZoomed(false);
  };

  const showNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev !== null && prev < GALLERY_IMAGES.length - 1 ? prev + 1 : 0));
    setIsZoomed(false);
  }, [selectedIndex]);

  const showPrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : GALLERY_IMAGES.length - 1));
    setIsZoomed(false);
  }, [selectedIndex]);

  // Handle keyboard navigation and body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };

    if (selectedIndex !== null) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [selectedIndex, showNext, showPrev]);

  // Handle clicking outside the image to close zoom/modal
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && e.target === modalRef.current) {
        if(isZoomed) {
            setIsZoomed(false);
        } else {
            closeModal();
        }
    }
  };

  return (
    <div className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-3 md:px-6">
        
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl md:text-5xl font-oswald font-bold text-blue-900 mb-4 uppercase tracking-wide">{t.nav.gallery}</h1>
          <div className="w-20 h-1 bg-orange-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
            {lang === 'hi' 
              ? 'धनबाद के कबड्डी सितारों की तीव्रता और जुनून को कैद करना।' 
              : "Capturing the intensity and passion of Dhanbad's kabaddi stars from recent district championships."}
          </p>
        </div>

        {/* PERFECTLY ARRANGED RESPONSIVE GRID 
          - grid-cols-2: Standard mobile (2 per row)
          - sm:grid-cols-3: Larger mobile/small tablet (3 per row)
          - md:grid-cols-4: Tablet/Small laptop
          - lg:grid-cols-5: Desktop
          - xl:grid-cols-6: Large Desktop
          - gap-2 md:gap-4: Tighter spacing on mobile
        */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          {GALLERY_IMAGES.map((url, index) => (
            <div 
              key={index} 
              onClick={() => setSelectedIndex(index)}
              // aspect-square ensures perfectly uniform tiles
              className="aspect-square group relative overflow-hidden rounded-xl shadow-sm bg-slate-200 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <img 
                src={url} 
                alt={`Kabaddi moment ${index + 1}`} 
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              {/* Attractive Hover Overlay */}
              <div className="absolute inset-0 bg-blue-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                <div className="bg-white/90 p-3 rounded-full shadow-lg transform scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Screen Lightbox / Modal */}
      {selectedIndex !== null && (
        <div 
          ref={modalRef}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 animate-in fade-in duration-300"
          onClick={handleBackdropClick}
        >
          {/* Toolbar (Close & Counter) */}
          <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-[110] bg-gradient-to-b from-black/60 to-transparent">
             <div className="text-white/90 font-medium text-sm px-4 py-2 bg-black/40 rounded-full backdrop-blur-md">
                {selectedIndex + 1} / {GALLERY_IMAGES.length}
             </div>
              <button 
                onClick={closeModal}
                className="p-2 bg-black/40 rounded-full text-white/90 hover:bg-white/20 hover:text-white transition-colors backdrop-blur-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
          </div>

          {/* Navigation Arrows (Hidden on small mobiles for cleaner view) */}
          <button onClick={showPrev} className="absolute left-2 md:left-6 z-[110] p-3 text-white/70 hover:text-white transition-colors hidden sm:block bg-black/20 hover:bg-black/40 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button onClick={showNext} className="absolute right-2 md:right-6 z-[110] p-3 text-white/70 hover:text-white transition-colors hidden sm:block bg-black/20 hover:bg-black/40 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Main Image Container - Handles Zoom Logic */}
          <div 
            className={`
              w-full h-full flex items-center justify-center p-0 md:p-8
              ${isZoomed ? 'overflow-auto cursor-grab active:cursor-grabbing' : 'overflow-hidden cursor-zoom-in'}
            `}
            onClick={(e) => {
              e.stopPropagation();
              setIsZoomed(!isZoomed);
            }}
          >
            <img 
              src={GALLERY_IMAGES[selectedIndex]} 
              alt="Full screen view"
              className={`
                transition-all duration-500 ease-in-out select-none
                ${isZoomed 
                  ? 'max-w-none h-auto min-h-screen md:min-h-full object-cover scale-100' // Zoomed state
                  : 'max-w-full max-h-[90vh] md:max-h-full object-contain' // Fit state
                }
              `}
            />
          </div>
           {/* Mobile Tap Hint */}
          {!isZoomed && (
            <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none md:hidden animate-pulse">
                 <span className="text-white/70 text-xs bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">Tap to zoom</span>
            </div>
           )}
        </div>
      )}
    </div>
  );
};

export default Gallery;