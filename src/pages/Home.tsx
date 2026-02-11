import React, { useEffect, useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Trophy, Users, Award, Zap, Megaphone, Calendar, ArrowRight, Activity, Star, Target, Shield, Flame, Play, BarChart3, TrendingUp, Heart, ChevronRight, ChevronLeft } from 'lucide-react';
import type { Language } from '../translations';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface HomeProps {
  lang: Language;
  onNavigate: (page: string) => void;
}

export const Home: React.FC<HomeProps> = ({ lang, onNavigate }) => {
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [heroImageIndex, setHeroImageIndex] = useState(0);

  // Hero background images from public folder
  const heroImages = [
    '/Home - Jharkhand State Kabaddi Association (JSKA)_files/1.jpeg',
    '/Home - Jharkhand State Kabaddi Association (JSKA)_files/2.jpeg',
    '/Home - Jharkhand State Kabaddi Association (JSKA)_files/3.jpeg',
    '/Home - Jharkhand State Kabaddi Association (JSKA)_files/4.jpeg',
    '/Home - Jharkhand State Kabaddi Association (JSKA)_files/5.jpeg',
    '/Home - Jharkhand State Kabaddi Association (JSKA)_files/6.jpeg',
    '/Home - Jharkhand State Kabaddi Association (JSKA)_files/7.jpeg',
    '/Home - Jharkhand State Kabaddi Association (JSKA)_files/9.jpeg'
  ];

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

  // Auto-scroll hero images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll gallery images every 3 seconds
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

  useEffect(() => {
    // Component initialization if needed
  }, []);

  return (
    <>
      <Helmet>
        <title>
          {lang === 'hi'
            ? 'झारखंड राज्य कबड्डी संघ (JSKA) | आधिकारिक वेबसाइट'
            : 'Jharkhand State Kabaddi Association (JSKA) | Kabaddi in Jharkhand' }
        </title>
        <meta
          name="description"
          content={
            lang === 'hi'
              ? 'झारखंड राज्य कबड्डी संघ (JSKA) की आधिकारिक वेबसाइट – झारखंड में कबड्डी की खबरें, टूर्नामेंट, पंजीकरण और प्रशिक्षण की पूरी जानकारी।'
              : 'Official website of Jharkhand State Kabaddi Association (JSKA) – news, tournaments, registrations and Kabaddi development programs in Jharkhand.'
          }
        />
        <meta
          name="keywords"
          content="Jharkhand State Kabaddi Association, JSKA, Jharkhand Kabaddi Association, Kabaddi Jharkhand, Kabaddi in Jharkhand, Jharkhand Kabaddi, Jharkhand kabaddi association, jaan kabaddi, jan kabaddi, kabaddi jharkhand"
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
        {/* Attractive Hero Section */}
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Images Carousel */}
          <div className="absolute inset-0">
            {heroImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  index === heroImageIndex
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-105'
                }`}
              >
                <img
                  src={image}
                  alt={`JSKA Hero Background ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
              </div>
            ))}
          </div>

          {/* Hero Navigation Arrows */}
          <button
            onClick={() => setHeroImageIndex((prevIndex) =>
              prevIndex === 0 ? heroImages.length - 1 : prevIndex - 1
            )}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-slate-900 hover:bg-slate-800 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-10"
            aria-label="Previous hero image"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => setHeroImageIndex((prevIndex) =>
              prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
            )}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-slate-900 hover:bg-slate-800 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-10"
            aria-label="Next hero image"
          >
            <ChevronRight size={24} />
          </button>

          {/* Hero Image Indicators */}
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setHeroImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === heroImageIndex
                    ? 'bg-white scale-125'
                    : 'bg-slate-800 hover:bg-slate-700' 
                }`}
                aria-label={`Go to hero image ${index + 1}`}
              />
            ))}
          </div>

          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
          </div>

          {/* Main Content */}
          <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
            {/* Logo/Brand */}
            <div className="mb-8">
              <div className="inline-block p-4 bg-slate-900 rounded-2xl border border-slate-800 text-white">
                <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-white via-blue-100 to-royal-200 bg-clip-text text-transparent">
                  JSKA
                </h1>
                <p className="text-blue-200 text-lg font-medium mt-2">
                  {lang === 'hi' ? 'झारखंड राज्य कबड्डी संघ' : 'Jharkhand State Kabaddi Association'}
                </p>
              </div>
            </div>

            {/* Main Headline */}
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
              {lang === 'hi'
                ? 'कबड्डी की शक्ति, झारखंड की पहचान'
                : 'Power of Kabaddi, Pride of Jharkhand'
              }
            </h2>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
              {lang === 'hi'
                ? 'झारखंड में कबड्डी खेल को बढ़ावा देने, खिलाड़ियों को सर्वोत्तम प्रशिक्षण प्रदान करने और राष्ट्रीय तथा अंतर्राष्ट्रीय स्तर पर उत्कृष्टता प्राप्त करने के लिए समर्पित'
                : 'Dedicated to promoting Kabaddi in Jharkhand, providing the best training to players, and achieving excellence at national and international levels'
              }
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <button
                onClick={() => onNavigate('register')}
                className="group relative overflow-hidden bg-gradient-to-r from-orange-500 to-red-600 text-white px-12 py-5 rounded-2xl font-bold text-xl hover:from-orange-600 hover:to-red-700 transition-all shadow-2xl hover:shadow-orange-500/25 transform hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Trophy className="w-7 h-7" />
                  {lang === 'hi' ? 'अभी जुड़ें' : 'Join Now'}
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform"/>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </button>

              <button
                onClick={() => onNavigate('about')}
                className="group bg-slate-900 border-2 border-slate-800 text-white px-12 py-5 rounded-2xl font-bold text-xl hover:bg-slate-800 transition-all shadow-xl flex items-center gap-3"
              >
                <Activity className="w-7 h-7" />
                {lang === 'hi' ? 'हमारे बारे में जानें' : 'Learn More'}
              </button>
            </div>

            {/* Stats Preview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 text-white">
                <div className="text-3xl md:text-4xl font-black text-royal-500 mb-2">1200+</div>
                <div className="text-white/80 text-sm font-medium">
                  {lang === 'hi' ? 'पंजीकृत खिलाड़ी' : 'Players'}
                </div>
              </div>
              <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 text-white">
                <div className="text-3xl md:text-4xl font-black text-royal-500 mb-2">50+</div>
                <div className="text-white/80 text-sm font-medium">
                  {lang === 'hi' ? 'संबद्ध क्लब' : 'Clubs'}
                </div>
              </div>
              <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 text-white">
                <div className="text-3xl md:text-4xl font-black text-royal-500 mb-2">12</div>
                <div className="text-white/80 text-sm font-medium">
                  {lang === 'hi' ? 'राज्य खिताब' : 'Titles'}
                </div>
              </div>
              <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 text-white">
                <div className="text-3xl md:text-4xl font-black text-royal-500 mb-2">24/7</div>
                <div className="text-white/80 text-sm font-medium">
                  {lang === 'hi' ? 'सहायता' : 'Support'}
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-slate-700 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Mission & Vision Section */}
        <div className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Mission */}
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-600 p-4 rounded-2xl mr-4">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800">
                    {lang === 'hi' ? 'हमारा मिशन' : 'Our Mission'}
                  </h3>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {lang === 'hi'
                    ? 'झारखंड में कबड्डी खेल को बढ़ावा देना, खिलाड़ियों को सर्वोत्तम प्रशिक्षण प्रदान करना और राष्ट्रीय तथा अंतर्राष्ट्रीय स्तर पर उत्कृष्टता प्राप्त करना।'
                    : 'To promote Kabaddi in Jharkhand, provide the best training to players, and achieve excellence at national and international levels.'
                  }
                </p>
              </div>

              {/* Vision */}
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="flex items-center mb-6">
                  <div className="bg-purple-600 p-4 rounded-2xl mr-4">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800">
                    {lang === 'hi' ? 'हमारा विजन' : 'Our Vision'}
                  </h3>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {lang === 'hi'
                    ? 'झारखंड को कबड्डी का केंद्र बनाना, जहां हर युवा कबड्डी के माध्यम से अपना सपना पूरा कर सके और राज्य को खेल के क्षेत्र में नया मानक स्थापित कर सके।'
                    : 'To make Jharkhand the center of Kabaddi, where every youth can fulfill their dreams through Kabaddi and establish new standards for the state in sports.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-20 bg-gradient-to-r from-royal-500 to-black">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                {lang === 'hi' ? 'हमारे आंकड़े' : 'Our Impact'}
              </h2>
              <p className="text-xl text-blue-100">
                {lang === 'hi' ? 'संख्याओं में हमारी यात्रा' : 'Our journey in numbers'}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: <Users className="w-8 h-8" />, value: '1200+', label: lang === 'hi' ? 'पंजीकृत खिलाड़ी' : 'Registered Players' },
                { icon: <Award className="w-8 h-8" />, value: '50+', label: lang === 'hi' ? 'क्लब और जिला संबद्धता' : 'Club & District Affiliations' },
                { icon: <Trophy className="w-8 h-8" />, value: '12', label: lang === 'hi' ? 'राज्य खिताब' : 'State Titles' },
                { icon: <Zap className="w-8 h-8" />, value: '24/7', label: lang === 'hi' ? 'सहायता' : 'Support' }
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="bg-slate-900 text-white rounded-2xl p-6 mb-4 shadow-black-effect group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105">
                    <div className="text-white mb-2 flex justify-center">
                      {stat.icon}
                    </div>
                    <div className="text-4xl font-black text-royal-500 mb-1">{stat.value}</div>
                  </div>
                  <p className="text-white/80 font-semibold">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">
                {lang === 'hi' ? 'हमारे मूल्य' : 'Our Values'}
              </h2>
              <p className="text-xl text-gray-600">
                {lang === 'hi' ? 'जो हमें परिभाषित करता है' : 'What defines us'}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Heart className="w-12 h-12" />,
                  title: lang === 'hi' ? 'समर्पण' : 'Dedication',
                  description: lang === 'hi' ? 'खेल के प्रति पूर्ण समर्पण और लगन' : 'Complete dedication and commitment to the sport'
                },
                {
                  icon: <Users className="w-12 h-12" />,
                  title: lang === 'hi' ? 'टीमवर्क' : 'Teamwork',
                  description: lang === 'hi' ? 'सहयोग और सामूहिक प्रयास में विश्वास' : 'Belief in collaboration and collective effort'
                },
                {
                  icon: <Award className="w-12 h-12" />,
                  title: lang === 'hi' ? 'उत्कृष्टता' : 'Excellence',
                  description: lang === 'hi' ? 'हर क्षेत्र में सर्वोत्तम प्रदर्शन' : 'Best performance in every field'
                }
              ].map((value, index) => (
                <div key={index} className="text-center group">
                  <div className="bg-gradient-to-br from-blue-500 to-royal-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-110">
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modern Stats Dashboard */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-orange-500/5 to-black/5"></div>
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 right-4 w-20 h-20 bg-orange-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-20 h-20 bg-black/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-600 via-orange-500 to-black bg-clip-text text-transparent mb-6">
                {lang === 'hi' ? 'लाइव आंकड़े' : 'LIVE STATISTICS'}
              </h2>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                {lang === 'hi' ? 'JSKA की प्रगति और उपलब्धियों का एक झलक' : 'A glimpse of JSKA\'s progress and achievements'}
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-orange-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                <div className="relative bg-white rounded-xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-6 shadow-lg">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-black text-gray-800 mb-2">15,000+</div>
                  <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    {lang === 'hi' ? 'पंजीकृत खिलाड़ी' : 'REGISTERED PLAYERS'}
                  </div>
                  <div className="mt-4 flex items-center text-blue-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">+12% this month</span>
                  </div>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                <div className="relative bg-white rounded-xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl mb-6 shadow-lg">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-black text-gray-800 mb-2">500+</div>
                  <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    {lang === 'hi' ? 'क्लब और जिला संबद्धता' : 'CLUB & DISTRICT AFFILIATIONS'}
                  </div>
                  <div className="mt-4 flex items-center text-orange-600">
                    <BarChart3 className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">Growing network</span>
                  </div>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-black to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                <div className="relative bg-white rounded-xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-black to-gray-800 rounded-2xl mb-6 shadow-lg">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-black text-gray-800 mb-2">200+</div>
                  <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    {lang === 'hi' ? 'टूर्नामेंट आयोजित' : 'TOURNAMENTS ORGANIZED'}
                  </div>
                  <div className="mt-4 flex items-center text-black">
                    <Award className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">Record breaking</span>
                  </div>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-black rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                <div className="relative bg-white rounded-xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl mb-6 shadow-lg">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-black text-gray-800 mb-2">50+</div>
                  <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    {lang === 'hi' ? 'राष्ट्रीय खिलाड़ी' : 'NATIONAL PLAYERS'}
                  </div>
                  <div className="mt-4 flex items-center text-orange-600">
                    <Zap className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">Elite athletes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Championship Announcement - Modern Card Design */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left Side */}
                <div className="p-12 lg:p-16">
                  <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-orange-500 text-white rounded-full text-sm font-bold uppercase tracking-wider mb-8 shadow-lg">
                    <Flame className="w-5 h-5" />
                    {lang === 'hi' ? 'ग्रैंड चैंपियनशिप 2026' : 'GRAND CHAMPIONSHIP 2026'}
                  </div>

                  <h2 className="text-5xl lg:text-6xl font-black mb-8 leading-tight">
                    <span className="bg-gradient-to-r from-blue-600 via-orange-500 to-black bg-clip-text text-transparent">
                      {lang === 'hi' ? 'झारखंड स्टेट' : 'JHARKHAND STATE'}
                    </span>
                    <br />
                    <span className="text-gray-800">
                      {lang === 'hi' ? 'कबड्डी लीग' : 'KABADDI LEAGUE'}
                    </span>
                  </h2>

                  <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                    {lang === 'hi'
                      ? 'सभी उम्र वर्गों के लिए प्रीमियर कबड्डी प्रतियोगिता – स्कूल, कॉलेज और क्लब टीमें शामिल हों!'
                      : 'Premier Kabaddi Competition for all age groups – Schools, Colleges and Club teams join now!'}
                  </p>

                  {/* Info Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-blue-500 p-3 rounded-xl">
                          <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-blue-900 mb-1">
                            {lang === 'hi' ? 'रजिस्ट्रेशन शुरू' : 'Registration Opens'}
                          </h4>
                          <p className="text-3xl font-black text-blue-700">15 Feb 2026</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl border border-orange-200">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-orange-500 p-3 rounded-xl">
                          <Target className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-orange-900 mb-1">
                            {lang === 'hi' ? 'इवेंट डेट' : 'Event Date'}
                          </h4>
                          <p className="text-xl font-bold text-orange-700">
                            {lang === 'hi' ? 'मार्च-अप्रैल 2026' : 'March-April 2026'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => onNavigate('register')}
                      className="bg-gradient-to-r from-blue-600 to-orange-500 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-orange-600 transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 group transform hover:scale-105"
                    >
                      <Trophy className="w-6 h-6" />
                      {lang === 'hi' ? 'अभी रजिस्टर करें' : 'Register Now'}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
                    </button>

                    <button
                      onClick={() => onNavigate('news')}
                      className="bg-white border-2 border-gray-300 text-gray-700 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                    >
                      <Megaphone className="w-6 h-6" />
                      {lang === 'hi' ? 'अपडेट देखें' : 'View Updates'}
                    </button>
                  </div>
                </div>

                {/* Right Side - Interactive Visual */}
                <div className="relative bg-gradient-to-br from-blue-600 via-orange-500 to-black p-12 lg:p-16 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-slate-900 rounded-3xl mb-8 shadow-2xl">
                      <Trophy className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-3xl font-black mb-6">
                      {lang === 'hi' ? 'JSKA ग्रैंड लीग 2026' : 'JSKA GRAND LEAGUE 2026'}
                    </h3>
                    <div className="space-y-4 text-left max-w-xs mx-auto">
                      <div className="flex items-center gap-3 bg-slate-900 rounded-xl p-3 text-white">
                        <div className="w-3 h-3 bg-slate-700 rounded-full"></div>
                        <span className="font-medium">{lang === 'hi' ? 'सभी उम्र वर्ग' : 'All Age Groups'}</span>
                      </div>
                      <div className="flex items-center gap-3 bg-slate-900 rounded-xl p-3 text-white">
                        <div className="w-3 h-3 bg-slate-700 rounded-full"></div>
                        <span className="font-medium">{lang === 'hi' ? 'प्रोफेशनल रेफरी' : 'Professional Referees'}</span>
                      </div>
                      <div className="flex items-center gap-3 bg-slate-900 rounded-xl p-3 text-white">
                        <div className="w-3 h-3 bg-slate-700 rounded-full"></div>
                        <span className="font-medium">{lang === 'hi' ? 'लाइव स्ट्रीमिंग' : 'Live Streaming'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute top-8 right-8 w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center animate-pulse">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute bottom-8 left-8 w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center animate-bounce">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - Modern Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-600 via-orange-500 to-black bg-clip-text text-transparent mb-6">
                {lang === 'hi' ? 'JSKA की विशेषताएं' : 'JSKA FEATURES'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {lang === 'hi' ? 'आधुनिक तकनीक और पारंपरिक खेल भावना का अनोखा संगम' : 'A unique blend of modern technology and traditional sports spirit'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature Cards with different styles */}
              <div className="group relative bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-3xl border border-blue-200 hover:shadow-2xl transition-all transform hover:-translate-y-4 hover:rotate-1">
                <div className="absolute top-4 right-4 w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center opacity-20 group-hover:opacity-100 transition-opacity">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl mb-6 shadow-xl">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-black text-blue-900 mb-4">
                  {lang === 'hi' ? 'डिजिटल पंजीकरण' : 'Digital Registration'}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {lang === 'hi' ? 'ऑनलाइन पंजीकरण प्रणाली के साथ आसानी से रजिस्टर करें और ट्रैक करें' : 'Register and track easily with our online registration system'}
                </p>
                <div className="flex items-center text-blue-600 font-bold group-hover:text-blue-700">
                  <span>{lang === 'hi' ? 'और जानें' : 'Learn More'}</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>

              <div className="group relative bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-3xl border border-orange-200 hover:shadow-2xl transition-all transform hover:-translate-y-4 hover:-rotate-1">
                <div className="absolute top-4 right-4 w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center opacity-20 group-hover:opacity-100 transition-opacity">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl mb-6 shadow-xl">
                  <Activity className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-black text-orange-900 mb-4">
                  {lang === 'hi' ? 'लाइव स्ट्रीमिंग' : 'Live Streaming'}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {lang === 'hi' ? 'हमारे सभी प्रमुख मैचों को लाइव देखें कहीं भी, कभी भी' : 'Watch all our major matches live from anywhere, anytime'}
                </p>
                <div className="flex items-center text-orange-600 font-bold group-hover:text-orange-700">
                  <span>{lang === 'hi' ? 'स्ट्रीम देखें' : 'Watch Stream'}</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>

              <div className="group relative bg-gradient-to-br from-black to-gray-100 p-8 rounded-3xl border border-gray-300 hover:shadow-2xl transition-all transform hover:-translate-y-4 hover:rotate-1 md:col-span-2 lg:col-span-1">
                <div className="absolute top-4 right-4 w-12 h-12 bg-black rounded-2xl flex items-center justify-center opacity-20 group-hover:opacity-100 transition-opacity">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-black to-gray-800 rounded-3xl mb-6 shadow-xl">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">
                  {lang === 'hi' ? 'प्रोफेशनल कोचिंग' : 'Professional Coaching'}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {lang === 'hi' ? 'अनुभवी कोचों से प्रशिक्षण प्राप्त करें और अपना कौशल बढ़ाएं' : 'Get training from experienced coaches and enhance your skills'}
                </p>
                <div className="flex items-center text-black font-bold group-hover:text-gray-700">
                  <span>{lang === 'hi' ? 'कोचिंग प्राप्त करें' : 'Get Coaching'}</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <div className="py-20 bg-gray-900 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                {lang === 'hi' ? 'गैलरी' : 'Gallery'}
              </h2>
              <p className="text-xl text-gray-300">
                {lang === 'hi' ? 'हमारे खेल के क्षणों को देखें' : 'Witness our sporting moments'}
              </p>
            </div>

            {/* Gallery Carousel */}
            <div className="relative max-w-6xl mx-auto">
              <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  </div>
                ))}

                {/* Fallback for no images */}
                {galleryImages.length === 0 && !isLoading && (
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Activity className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-xl">{lang === 'hi' ? 'कोई छवि नहीं मिली' : 'No images found'}</p>
                    </div>
                  </div>
                )}

                {/* Loading state */}
                {isLoading && (
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
                  </div>
                )}
              </div>

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
                          : 'bg-slate-700 hover:bg-slate-800'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Gallery Link */}
            <div className="text-center mt-12">
              <button
                onClick={() => onNavigate('gallery')}
                className="bg-gradient-to-r from-blue-600 to-royal-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-royal-700 transition-all shadow-xl hover:shadow-blue-500/25 flex items-center justify-center gap-3 mx-auto group transform hover:scale-105"
              >
                <Activity className="w-6 h-6" />
                {lang === 'hi' ? 'सभी गैलरी देखें' : 'View Full Gallery'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
              </button>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-r from-black via-gray-900 to-black text-white relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 via-orange-500/20 to-black/20"></div>
            <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-4xl mx-auto text-center px-4">
            <h2 className="text-4xl md:text-6xl font-black mb-8">
              {lang === 'hi' ? 'अपनी यात्रा शुरू करें' : 'Start Your Journey'}
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              {lang === 'hi' ? 'JSKA के साथ जुड़ें और कबड्डी के रोमांचक दुनिया में कदम रखें' : 'Join JSKA and step into the exciting world of Kabaddi'}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => onNavigate('register')}
                className="bg-gradient-to-r from-blue-600 to-orange-500 text-white px-12 py-6 rounded-2xl font-bold text-xl hover:from-blue-700 hover:to-orange-600 transition-all shadow-2xl hover:shadow-blue-500/25 flex items-center justify-center gap-3 group transform hover:scale-105"
              >
                <Trophy className="w-7 h-7" />
                {lang === 'hi' ? 'अभी शुरू करें' : 'Get Started'}
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform"/>
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="bg-slate-900 border-2 border-slate-800 text-white px-12 py-6 rounded-2xl font-bold text-xl hover:bg-slate-800 transition-all shadow-xl flex items-center justify-center gap-3"
              >
                <Users className="w-7 h-7" />
                {lang === 'hi' ? 'हमारे बारे में' : 'About Us'}
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
