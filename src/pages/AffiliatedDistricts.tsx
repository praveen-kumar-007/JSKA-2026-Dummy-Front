import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck, MapPin, Users, Award, Phone, Mail } from 'lucide-react';
import { translations } from '../translations';
import type { Language } from '../translations';

interface AffiliatedDistrictsProps {
  lang: Language;
}

const AffiliatedDistricts: React.FC<AffiliatedDistrictsProps> = ({ lang }) => {
  const [districts, setDistricts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const t = translations[lang];

  useEffect(() => {
    // Mock data for affiliated districts - in real app this would come from API
    const mockDistricts = [
      {
        _id: '1',
        instName: 'Ranchi District Kabaddi Association',
        instType: 'District Association',
        district: 'Ranchi',
        headName: 'Mr. Rajesh Kumar',
        secretaryName: 'Mrs. Priya Singh',
        officePhone: '+91-9876543210',
        email: 'ranchi@jska.org',
        instLogoUrl: '/api/placeholder/150/150',
        totalPlayers: 250,
        year: '2018',
        surfaceType: 'Synthetic',
        area: 5000,
        status: 'Active'
      },
      {
        _id: '2',
        instName: 'Dhanbad District Kabaddi Association',
        instType: 'District Association',
        district: 'Dhanbad',
        headName: 'Mr. Amit Sharma',
        secretaryName: 'Mrs. Sunita Gupta',
        officePhone: '+91-9876543211',
        email: 'dhanbad@jska.org',
        instLogoUrl: '/api/placeholder/150/150',
        totalPlayers: 180,
        year: '2019',
        surfaceType: 'Clay',
        area: 4000,
        status: 'Active'
      },
      {
        _id: '3',
        instName: 'Jamshedpur District Kabaddi Association',
        instType: 'District Association',
        district: 'Jamshedpur',
        headName: 'Mr. Vikash Tiwari',
        secretaryName: 'Mrs. Meera Patel',
        officePhone: '+91-9876543212',
        email: 'jamshedpur@jska.org',
        instLogoUrl: '/api/placeholder/150/150',
        totalPlayers: 220,
        year: '2017',
        surfaceType: 'Synthetic',
        area: 6000,
        status: 'Active'
      }
    ];

    setTimeout(() => {
      setDistricts(mockDistricts);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          {t.nav.affiliatedInstitutions} | Jharkhand State Kabaddi Association
        </title>
        <meta
          name="description"
          content="This is the official website of the Jharkhand State Kabaddi Association (JSKA). JSKA is affiliated to A.K.F.I. and the Jharkhand Olympic Association."
        />
        <meta
          name="keywords"
          content="JSKA, Jharkhand State Kabaddi Association, kabaddi districts jharkhand, official kabaddi association, district kabaddi associations"
        />
        {/* Structured data: ItemList of districts for better indexing */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Affiliated Districts - JSKA",
            "itemListElement": districts.map((district) => ({
              "@type": "Organization",
              "name": district.instName,
              "url": `${window.location?.origin || 'https://jharkhandkabaddiassociation.org'}/institution/${district._id}`,
              "logo": district.instLogoUrl || undefined
            }))
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-slate-50 pb-16">
        {/* Header Section */}
        <div className="relative overflow-hidden bg-teal-900 py-12 md:py-16 mb-8 md:mb-12">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center space-x-2 bg-teal-800/50 border border-teal-700 px-4 py-2 rounded-full mb-6">
              <ShieldCheck className="w-5 h-5 text-purple-400" />
              <span className="text-teal-100 text-sm font-bold uppercase tracking-wider">
                {t.nav.affiliated}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-oswald font-bold text-white mb-4 uppercase tracking-tight">
              {t.nav.affiliatedInstitutions}
            </h1>
            <div className="inline-block bg-purple-500 text-white px-6 py-2 rounded-lg font-bold text-lg mb-6 shadow-lg transform -rotate-1">
              {lang === 'hi' ? 'जिला रजिस्टर्ड' : 'Registered Districts'}
            </div>
            <p className="text-teal-100 max-w-2xl mx-auto text-lg">
              {lang === 'hi'
                ? 'यह JSKA की आधिकारिक वेबसाइट है। JSKA, A.K.F.I. और झारखंड ओलंपिक एसोसिएशन से संबद्ध है।'
                : 'This is the official website of the Jharkhand State Kabaddi Association (JSKA). JSKA is affiliated to A.K.F.I. and the Jharkhand Olympic Association.'}
            </p>
          </div>
        </div>

        {/* Districts Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {districts.map((district) => (
              <div
                key={district._id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
              >
                {/* District Header */}
                <div className="relative bg-gradient-to-r from-teal-600 to-royal-600 p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-slate-900 rounded-xl flex items-center justify-center text-white">
                      <ShieldCheck className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-lg leading-tight">
                        {district.instName}
                      </h3>
                      <p className="text-teal-100 text-sm mt-1">
                        {district.district} District
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      {district.status}
                    </span>
                  </div>
                </div>

                {/* District Details */}
                <div className="p-6">
                  {/* Leadership */}
                  <div className="mb-4">
                    <h4 className="text-gray-900 font-semibold mb-2 flex items-center">
                      <Award className="w-4 h-4 mr-2 text-teal-600" />
                      {lang === 'hi' ? 'नेतृत्व' : 'Leadership'}
                    </h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p><span className="font-medium">{lang === 'hi' ? 'अध्यक्ष:' : 'President:'}</span> {district.headName}</p>
                      <p><span className="font-medium">{lang === 'hi' ? 'सचिव:' : 'Secretary:'}</span> {district.secretaryName}</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="mb-4">
                    <h4 className="text-gray-900 font-semibold mb-2 flex items-center">
                      <Users className="w-4 h-4 mr-2 text-purple-600" />
                      {lang === 'hi' ? 'आँकड़े' : 'Statistics'}
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="bg-gray-50 p-2 rounded-lg text-center">
                        <div className="font-bold text-teal-600">{district.totalPlayers}</div>
                        <div className="text-gray-600">{lang === 'hi' ? 'खिलाड़ी' : 'Players'}</div>
                      </div>
                      <div className="bg-gray-50 p-2 rounded-lg text-center">
                        <div className="font-bold text-purple-600">{district.year}</div>
                        <div className="text-gray-600">{lang === 'hi' ? 'स्थापना' : 'Founded'}</div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="mb-4">
                    <h4 className="text-gray-900 font-semibold mb-2 flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-green-600" />
                      {lang === 'hi' ? 'संपर्क' : 'Contact'}
                    </h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p className="flex items-center">
                        <Phone className="w-3 h-3 mr-2 text-gray-400" />
                        {district.officePhone}
                      </p>
                      <p className="flex items-center">
                        <Mail className="w-3 h-3 mr-2 text-gray-400" />
                        {district.email}
                      </p>
                    </div>
                  </div>

                  {/* Facility Info */}
                  <div className="mb-4">
                    <h4 className="text-gray-900 font-semibold mb-2 flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-orange-600" />
                      {lang === 'hi' ? 'सुविधाएँ' : 'Facilities'}
                    </h4>
                    <div className="text-sm text-gray-600">
                      <p><span className="font-medium">{lang === 'hi' ? 'सतह:' : 'Surface:'}</span> {district.surfaceType}</p>
                      <p><span className="font-medium">{lang === 'hi' ? 'क्षेत्र:' : 'Area:'}</span> {district.area} {lang === 'hi' ? 'वर्ग फुट' : 'sq ft'}</p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="w-full bg-gradient-to-r from-teal-600 to-royal-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-teal-700 hover:to-royal-700 transition-all duration-300 transform hover:scale-105">
                    {lang === 'hi' ? 'विवरण देखें' : 'View Details'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="bg-gradient-to-r from-teal-600 to-royal-600 rounded-xl p-8 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {lang === 'hi' ? 'अपने जिले को संबद्ध करें' : 'Affiliate Your District'}
            </h2>
            <p className="text-teal-100 mb-6 max-w-2xl mx-auto">
              {lang === 'hi'
                ? 'अपने जिले को JSKA से संबद्ध करें और राज्य स्तर के कबड्डी टूर्नामेंट में भाग लें।'
                : 'Affiliate your district with JSKA and participate in state-level kabaddi tournaments.'}
            </p>
            <button className="bg-white text-teal-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors duration-300">
              {lang === 'hi' ? 'अभी आवेदन करें' : 'Apply Now'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AffiliatedDistricts;