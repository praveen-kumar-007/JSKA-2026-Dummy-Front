import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Users, Trophy, Target, Calendar, MapPin } from 'lucide-react';
import type { Language } from '../translations';

interface AboutProps {
  lang: Language;
  onNavigate: (page: string) => void;
}

const About: React.FC<AboutProps> = ({ lang, onNavigate: _ }) => {

  const leadership = [
    {
      name: 'Dr. Rajesh Kumar',
      position: 'President',
      image: '/api/placeholder/150/150',
      description: 'Leading JSKA with vision and dedication since 2015.'
    },
    {
      name: 'Mrs. Priya Sharma',
      position: 'Vice President',
      image: '/api/placeholder/150/150',
      description: 'Overseeing operations and development programs.'
    },
    {
      name: 'Mr. Amit Singh',
      position: 'Secretary',
      image: '/api/placeholder/150/150',
      description: 'Managing administrative affairs and coordination.'
    }
  ];

  const achievements = [
    {
      year: '2023',
      title: 'National Championship Winners',
      description: 'JSKA teams secured top positions in multiple national tournaments.'
    },
    {
      year: '2022',
      title: 'Youth Development Program',
      description: 'Launched comprehensive training programs for 500+ young athletes.'
    },
    {
      year: '2021',
      title: 'Infrastructure Development',
      description: 'Completed state-of-the-art training facilities and equipment upgrades.'
    },
    {
      year: '2020',
      title: 'Community Outreach',
      description: 'Organized free coaching camps reaching 1000+ participants.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>About JSKA - Jharkhand State Kabaddi Association</title>
        <meta name="description" content="Learn about Jharkhand State Kabaddi Association's history, leadership, and achievements in promoting Kabaddi in Jharkhand." />
        <meta name="keywords" content="JSKA, Kabaddi, Jharkhand, sports association, history, leadership" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {lang === 'hi' ? 'हमारे बारे में' : 'About JSKA'}
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                {lang === 'hi'
                  ? 'झारखंड राज्य कबड्डी संघ की यात्रा और उपलब्धियों का पता लगाएं'
                  : 'Discover the journey and achievements of Jharkhand State Kabaddi Association'
                }
              </p>
            </div>
          </div>
        </div>

        {/* History Section */}
        <div className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {lang === 'hi' ? 'हमारी कहानी' : 'Our Story'}
              </h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Calendar className="w-8 h-8 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {lang === 'hi' ? 'स्थापना' : 'Foundation'}
                    </h3>
                    <p className="text-gray-600">
                      {lang === 'hi'
                        ? 'झारखंड राज्य कबड्डी संघ 2010 में स्थापित किया गया था, जिसमें कबड्डी खेल को बढ़ावा देने और राज्य में इसकी पहुंच का विस्तार करने का लक्ष्य था।'
                        : 'Jharkhand State Kabaddi Association was established in 2010 with the goal of promoting Kabaddi and expanding its reach across the state.'
                      }
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Target className="w-8 h-8 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {lang === 'hi' ? 'विकास' : 'Growth'}
                    </h3>
                    <p className="text-gray-600">
                      {lang === 'hi'
                        ? 'पिछले एक दशक में, हमने पूरे राज्य में प्रशिक्षण शिविरों, प्रतियोगिताओं और युवा विकास कार्यक्रमों के माध्यम से खेल को लोकप्रिय बनाया है।'
                        : 'Over the past decade, we have popularized the sport through training camps, competitions, and youth development programs across the state.'
                      }
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="w-8 h-8 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {lang === 'hi' ? 'विस्तार' : 'Expansion'}
                    </h3>
                    <p className="text-gray-600">
                      {lang === 'hi'
                        ? 'आज, JSKA झारखंड के सभी जिलों में सक्रिय है और राष्ट्रीय स्तर पर कबड्डी को बढ़ावा देने में महत्वपूर्ण भूमिका निभा रहा है।'
                        : 'Today, JSKA is active in all districts of Jharkhand and plays a significant role in promoting Kabaddi at the national level.'
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  {lang === 'hi' ? 'महत्वपूर्ण आंकड़े' : 'Key Statistics'}
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">13+</div>
                    <div className="text-gray-600">
                      {lang === 'hi' ? 'साल' : 'Years'}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">24</div>
                    <div className="text-gray-600">
                      {lang === 'hi' ? 'जिले' : 'Districts'}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">1000+</div>
                    <div className="text-gray-600">
                      {lang === 'hi' ? 'खिलाड़ी' : 'Players'}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                    <div className="text-gray-600">
                      {lang === 'hi' ? 'प्रतियोगिताएं' : 'Tournaments'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Leadership Section */}
        <div className="py-16 bg-white px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {lang === 'hi' ? 'नेतृत्व' : 'Leadership'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {lang === 'hi'
                  ? 'JSKA के समर्पित नेताओं से मिलें जो खेल को आगे बढ़ाने के लिए काम कर रहे हैं'
                  : 'Meet the dedicated leaders of JSKA who are working to advance the sport'
                }
              </p>
              <div className="w-24 h-1 bg-blue-600 mx-auto mt-4"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {leadership.map((leader, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-12 h-12 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{leader.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{leader.position}</p>
                  <p className="text-gray-600 text-sm">{leader.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {lang === 'hi' ? 'उपलब्धियां' : 'Achievements'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {lang === 'hi'
                  ? 'हमारे निरंतर प्रयासों और समर्पण का परिणाम'
                  : 'The result of our continuous efforts and dedication'
                }
              </p>
              <div className="w-24 h-1 bg-blue-600 mx-auto mt-4"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {achievements.map((achievement, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Trophy className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                          {achievement.year}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {achievement.title}
                      </h3>
                      <p className="text-gray-600">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="py-16 bg-blue-900 text-white px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {lang === 'hi' ? 'हमारे साथ जुड़ें' : 'Join Us'}
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              {lang === 'hi'
                ? 'खो-खो के भविष्य को आकार देने में हमारी मदद करें और हमारे समुदाय का हिस्सा बनें'
                : 'Help shape the future of Kho-Kho and become part of our community'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                {lang === 'hi' ? 'सदस्य बनें' : 'Become a Member'}
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors">
                {lang === 'hi' ? 'हमसे संपर्क करें' : 'Contact Us'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
