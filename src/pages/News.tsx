import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Calendar, Tag, ChevronRight, X, Share2, Copy, Newspaper, TrendingUp, Clock, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const News = () => {
  const [news, setNews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalNews] = useState<any>(null);

  const fetchNews = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/news`);
      const result = await res.json();
      if (result.success) setNews(result.data);
    } catch (e) {}
    setIsLoading(false);
  };

  useEffect(() => { fetchNews(); }, []);

  return (
    <>
      <Helmet>
        <title>
          JSKA News & Updates | Jharkhand State Kabaddi Association
        </title>
        <meta
          name="description"
          content="Latest Kabaddi news, match updates, tournament announcements and results from Jharkhand State Kabaddi Association (JSKA) in Jharkhand."
        />
        <meta
          name="keywords"
          content="Kabaddi news Jharkhand, JSKA news, Jharkhand kabaddi results, Jharkhand kabaddi news, kabaddi tournaments jharkhand, jaan kabaddi news"
        />
      </Helmet>

      {/* Hero Section */}
      <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-orange-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-black/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          {/* Hero Content */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-800 font-semibold text-sm mb-6">
              <Newspaper size={16} />
              Latest Updates
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-tight">
              Kabaddi
              <span className="bg-gradient-to-r from-blue-600 via-orange-500 to-black bg-clip-text text-transparent"> News</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Stay informed with the latest Kabaddi news, tournament updates, championship results, and breaking stories from across Jharkhand
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-800 text-white">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{news.length}</p>
                  <p className="text-sm text-gray-600">Total Articles</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-900 rounded-2xl p-6 shadow-lg border border-orange-100 text-white">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 rounded-xl">
                  <Clock className="w-8 h-8 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">24/7</p>
                  <p className="text-sm text-gray-600">Updates</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-800 text-white">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-black/10 rounded-xl">
                  <Eye className="w-8 h-8 text-black" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">Live</p>
                  <p className="text-sm text-gray-600">Coverage</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* News Grid Section */}
      <div className="relative -mt-20 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Latest <span className="bg-gradient-to-r from-blue-600 via-orange-500 to-black bg-clip-text text-transparent">Stories</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover the most recent Kabaddi news, match results, and championship highlights from Jharkhand
              </p>
            </div>

            {/* News Cards Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-gray-50 rounded-2xl p-6 animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {news.map((item) => (
                  <article
                    key={item._id}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-orange-200"
                  >
                    {/* Featured Badge */}
                    {item.isHighlight && (
                      <div className="bg-gradient-to-r from-blue-600 to-orange-500 text-white px-4 py-2 text-sm font-semibold">
                        Featured Story
                      </div>
                    )}

                    {/* Image Section */}
                    {item.images && item.images.length > 0 && (
                      <div className="relative overflow-hidden">
                        <img
                          src={item.images[0]}
                          alt="news-img"
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    )}

                    {/* Content Section */}
                    <div className="p-6">
                      {/* Meta Information */}
                      <div className="flex items-center justify-between mb-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                          item.isHighlight
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          <Tag size={12} />
                          {item.category || 'News'}
                        </span>
                        <span className="flex items-center gap-1.5 text-gray-500 text-sm">
                          <Calendar size={14} />
                          {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                        {item.title}
                      </h3>

                      {/* Content Preview */}
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                        {item.content.length > 150 ? item.content.slice(0, 150) + '...' : item.content}
                      </p>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between">
                        <Link
                          to={`/news/${item._id}`}
                          className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors group/link"
                        >
                          Read More
                          <ChevronRight size={16} className="transition-transform group-hover/link:translate-x-1" />
                        </Link>

                        {/* Share Button */}
                        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                          <Share2 size={16} />
                        </button>
                      </div>

                      {/* Share Options (Hidden by default, shown on hover) */}
                      <div className="mt-4 pt-4 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex flex-wrap gap-2">
                          {(() => {
                            const sharePreviewUrl = `${API_URL}/api/news/share/${item._id}`;
                            return (
                              <>
                                <a
                                  href={`https://wa.me/?text=${encodeURIComponent(`${item.title} - ${sharePreviewUrl}`)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-green-50 text-green-700 hover:bg-green-100 text-xs font-medium transition-colors"
                                >
                                  WhatsApp
                                </a>
                                <a
                                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(sharePreviewUrl)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-medium transition-colors"
                                >
                                  Facebook
                                </a>
                                <button
                                  type="button"
                                  onClick={() => navigator.clipboard.writeText(sharePreviewUrl)}
                                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-50 text-gray-700 hover:bg-gray-100 text-xs font-medium transition-colors"
                                >
                                  <Copy size={12} />
                                  Copy
                                </button>
                              </>
                            );
                          })()}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Load More Button */}
            {news.length > 0 && (
              <div className="text-center mt-12">
                <button className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-orange-500 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Load More Stories
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal for full news */}
      {showModal && modalNews && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
              >
                <X size={24} />
              </button>
              <h2 className="text-2xl font-bold mb-4 text-gray-900 pr-8">{modalNews.title}</h2>
              <div className="flex gap-2 mb-4">
                {modalNews.images && modalNews.images.map((img: string, idx: number) => (
                  <img key={idx} src={img} alt="news-img" className="w-24 h-20 object-cover rounded-lg border" />
                ))}
              </div>
              <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {new Date(modalNews.createdAt).toLocaleDateString()}
                </span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
                  {modalNews.category}
                </span>
              </div>
              <div className="text-gray-700 whitespace-pre-line leading-relaxed">{modalNews.content}</div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};

export default News;
