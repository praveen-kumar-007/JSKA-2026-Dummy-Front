import React, { useState, useEffect, Suspense } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Page Components
import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import News from './pages/News';
import NewsArticle from './pages/NewsArticle';
import TermsConditions from './pages/TermsConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import KabaddiRules from './pages/KabaddiRules';
import AdminNewsUpload from './pages/AdminNewsUpload';
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'));
import AdminLogin from './pages/AdminLogin';
import AdminSignup from './pages/AdminSignup';
import PublicLogin from './pages/PublicLogin';
import Account from './pages/Account';
import AdminRegistrationDetails from './pages/AdminRegistrationDetails';
import PlayerIDCardPage from './pages/PlayerIDCardPage';
const AdminGalleryUpload = React.lazy(() => import('./pages/AdminGalleryUpload'));
const AdminContact = React.lazy(() => import('./pages/AdminContact'));
import Contact from './pages/Contact';
import OurGems from './pages/OurGems';
const AdminPlayersManagement = React.lazy(() => import('./pages/AdminPlayersManagement'));
const AdminRefereesManagement = React.lazy(() => import('./pages/AdminRefereesManagement'));
const AdminDonations = React.lazy(() => import('./pages/AdminDonations'));
import DonationReceipt from './pages/DonationReceipt';
import VerificationCenter from './pages/VerificationCenter';
import AffiliatedDistricts from './pages/AffiliatedDistricts';
const AdminTechnicalOfficialsManagement = React.lazy(() => import('./pages/AdminTechnicalOfficialsManagement'));
const AdminTechnicalOfficialDetails = React.lazy(() => import('./pages/AdminTechnicalOfficialDetails'));
const AdminManageAdmins = React.lazy(() => import('./pages/AdminManageAdmins'));
const AdminLoginAlerts = React.lazy(() => import('./pages/AdminLoginAlerts'));
const AdminUnifiedSearch = React.lazy(() => import('./pages/AdminUnifiedSearch'));
const AdminBulkEmail = React.lazy(() => import('./pages/AdminBulkEmail'));
const AdminRegistrations = React.lazy(() => import('./pages/AdminRegistrations'));

// Form Components
import RegisterForm from './components/forms/RegisterForm';
import TechnicalOfficialForm from './components/forms/TechnicalOfficialForm';

// Types & Icons
import type { Language } from './translations'; 
import { Phone } from 'lucide-react';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  
  // Admin Auth State - Checks session storage on load
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    sessionStorage.getItem('isAdminAuthenticated') === 'true'
  );

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handlePageChange = (pageId: string) => {
    // Map logical page IDs to actual route paths
    switch (pageId) {
      case 'home':
        navigate('/');
        return;
      case 'register-player':
      case 'register':
        navigate('/register');
        return;
      case 'technical-official-registration':
        navigate('/technical-official-registration');
        return;
      case 'player-login':
      case 'member-login':
        navigate('/login');
        return;
      case 'units':
        // 'Affiliated Units' in nav -> AffiliatedDistricts page
        navigate('/affiliated-districts');
        return;
      case 'committee':
      case 'constitution':
        // these are subsections of About — navigate to About (frontend may scroll to anchor)
        navigate('/about');
        return;
      default:
        // default behavior: navigate to /<id> (works for gallery, news, etc.)
        navigate(`/${pageId}`);
    }
  };

  const getCurrentPageId = () => {
    // return the first path segment so nested routes (e.g. /news/123) still mark the parent nav active
    const path = location.pathname.substring(1).split('/')[0];
    return path === '' ? 'home' : path;
  };

  const isAdminPage = location.pathname === '/admin-portal-access';

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden font-sans">
      <Navbar 
        currentPage={getCurrentPageId()} 
        onPageChange={handlePageChange} 
        lang={lang} 
        onLangChange={setLang} 
      />
      
      <main className="flex-grow">
        <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home lang={lang} onNavigate={handlePageChange} />} />
          <Route path="/about" element={<About lang={lang} onNavigate={handlePageChange} />} />
          <Route path="/gallery" element={<Gallery lang={lang} />} />
          <Route path="/affiliated-districts" element={<AffiliatedDistricts lang={lang} />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsArticle />} />
          <Route path="/verification" element={<VerificationCenter lang={lang} />} />
          <Route path="/donation/:id" element={<DonationReceipt />} />
          <Route path="/terms-conditions" element={<TermsConditions lang={lang} />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy lang={lang} />} />
          <Route path="/kabaddi-rules" element={<KabaddiRules lang={lang} />} />
          <Route path="/hall-of-fame" element={<OurGems lang={lang} />} />
          {/* Admin Gallery Upload Route (protected) */}
          <Route path="/admin/gallery" element={
            isAuthenticated ? <AdminGalleryUpload /> : <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />
          } />
            {/* Admin Contact Messages (protected) */}
            <Route path="/admin/contact" element={
              isAuthenticated ? <AdminContact /> : <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />
            } />
          {/* Admin Players Management (protected) */}
          <Route path="/admin/players" element={
            isAuthenticated ? <AdminPlayersManagement /> : <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />
          } />
          {/* Admin Referees Management (protected) */}
          <Route path="/admin/referees" element={
            isAuthenticated ? <AdminRefereesManagement /> : <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />
          } />
          {/* Admin Registrations (protected) */}
          <Route path="/admin/registrations" element={
            isAuthenticated ? <AdminRegistrations /> : <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />
          } />
          {/* Admin Bulk Email (protected) */}
          <Route path="/admin/bulk-email" element={
            isAuthenticated ? <AdminBulkEmail /> : <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />
          } />
          {/* Admin Donations Management (protected) */}
          <Route path="/admin/donations" element={
            isAuthenticated ? <AdminDonations /> : <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />
          } />
          {/* Admin Technical Officials Management (protected) */}
          <Route path="/admin/technical-officials" element={
            isAuthenticated ? <AdminTechnicalOfficialsManagement /> : <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />
          } />
          <Route path="/admin/technical-officials/:id" element={
            isAuthenticated ? <AdminTechnicalOfficialDetails /> : <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />
          } />
          {/* Unified Admin Search (protected) */}
          <Route path="/admin/unified-search" element={
            isAuthenticated ? <AdminUnifiedSearch /> : <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />
          } />
          {/* Admin News Upload Route (protected) */}
          <Route path="/admin-news-upload" element={
            isAuthenticated ? <AdminNewsUpload /> : <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />
          } />

          {/* Superadmin: Manage Admins */}
          <Route path="/admin/manage-admins" element={
            isAuthenticated ? <AdminManageAdmins /> : <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />
          } />
          <Route path="/admin/login-alerts" element={
            isAuthenticated ? <AdminLoginAlerts /> : <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />
          } />
          
          {/* Admin Route with Auth Check */}
          <Route path="/admin-portal-access" element={
            isAuthenticated ? (
              <AdminDashboard 
                lang={lang} 
                onLogout={() => setIsAuthenticated(false)}
              />
            ) : (
              <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />
            )
          } />
          <Route path="/admin-secure-setup-dkka2024" element={<AdminSignup />} />

          {/* Public Member Login */}
          <Route path="/login" element={<PublicLogin />} />
          <Route path="/account" element={<Account />} />
          
          <Route path="/register" element={
            <>
              <Helmet>
                <title>
                  {lang === 'hi'
                    ? 'खिलाड़ी पंजीकरण | झारखंड राज्य कबड्डी संघ (JSKA)'
                    : 'Player Registration | Jharkhand State Kabaddi Association (JSKA)'}
                </title>
                {/* Canonical and JSON-LD to help indexing & rich results */}
                <link rel="canonical" href={`${window.location?.origin || 'https://jharkhandkabaddiassociation.org'}/register`} />
                <meta
                  name="description"
                  content={
                    lang === 'hi'
                      ? 'झारखंड राज्य कबड्डी संघ (JSKA) के लिए ऑनलाइन खिलाड़ी पंजीकरण फ़ॉर्म – झारखंड के खिलाड़ियों के लिए।'
                      : 'Online player registration form for Jharkhand State Kabaddi Association (JSKA) – for Kabaddi players from Jharkhand.'
                  }
                />
                <meta
                  name="keywords"
                  content="player registration jharkhand kabaddi, JSKA player registration, kabaddi registration jharkhand, kabaddi jharkhand player form, jaan kabaddi registration"
                />
                <script type="application/ld+json">
                  {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebPage",
                    "name": lang === 'hi' ? 'खिलाड़ी पंजीकरण' : 'Player Registration',
                    "url": `${window.location?.origin || 'https://jharkhandkabaddiassociation.org'}/register`,
                    "description": lang === 'hi' ? 'झारखंड राज्य कबड्डी संघ (JSKA) के लिए ऑनलाइन खिलाड़ी पंजीकरण फ़ॉर्म' : 'Online player registration form for JSKA'
                  })}
                </script>
              </Helmet>
              <div className="py-20 bg-slate-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-4">
                  <RegisterForm lang={lang} />
                </div>
              </div>
            </>
          } />

          <Route path="/institution" element={
            <>
              <Helmet>
                <title>
                  {lang === 'hi'
                    ? 'संस्थान एफिलिएशन | झारखंड राज्य कबड्डी संघ (JSKA)'
                    : 'Institution Affiliation | Jharkhand State Kabaddi Association (JSKA)'}
                </title>
                <link rel="canonical" href={`${window.location?.origin || 'https://jharkhandkabaddiassociation.org'}/institution`} />
                <meta
                  name="description"
                  content={
                    lang === 'hi'
                      ? 'स्कूल, कॉलेज और क्लबों के लिए JSKA संस्थान एफिलिएशन पंजीकरण – झारखंड राज्य कबड्डी संघ से जुड़ने के लिए ऑनलाइन फ़ॉर्म।'
                      : 'Institution affiliation registration for schools, colleges and clubs with Jharkhand State Kabaddi Association (JSKA) in Jharkhand.'
                  }
                />
                <meta
                  name="keywords"
                  content="institution affiliation jharkhand kabaddi, JSKA institution registration, kabaddi school affiliation jharkhand, kabaddi club registration jharkhand, kabaddi association of jharkhand, jaan kabaddi school affiliation"
                />
                <script type="application/ld+json">
                  {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": "Jharkhand State Kabaddi Association",
                    "url": `${window.location?.origin || 'https://jharkhandkabaddiassociation.org'}/institution`,
                    "description": lang === 'hi' ? 'JSKA संस्थान एफिलिएशन पंजीकरण' : 'Institution affiliation registration with JSKA',
                    "sameAs": [
                      `${window.location?.origin || 'https://jharkhandkabaddiassociation.org'}`
                    ]
                  })}
                </script>
              </Helmet>
              <div className="py-20 bg-slate-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-4">
                  {/* Institution form removed - institute affiliation no longer supported */}
                </div>
              </div>
            </>
          } />

          <Route path="/technical-official-registration" element={
            <>
              <Helmet>
                <title>
                  {lang === 'hi'
                    ? 'टेक्निकल ऑफिशियल पंजीकरण | JSKA'
                    : 'Technical Official Registration | JSKA Kabaddi Jharkhand'}
                </title>
                <meta
                  name="description"
                  content={
                    lang === 'hi'
                      ? 'झारखंड राज्य कबड्डी संघ (JSKA) के लिए टेक्निकल ऑफिशियल / रेफरी पंजीकरण फ़ॉर्म – झारखंड के इच्छुक अधिकारियों के लिए।'
                      : 'Technical official / referee registration form for Jharkhand State Kabaddi Association (JSKA) – for Kabaddi officials from Jharkhand.'
                  }
                />
                <meta
                  name="keywords"
                  content="technical official registration jharkhand kabaddi, kabaddi referees jharkhand, JSKA technical officials, kabaddi jharkhand referees, jaan kabaddi referee registration"
                />
              </Helmet>
              <div className="py-20 bg-slate-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-4">
                  <TechnicalOfficialForm lang={lang} />
                </div>
              </div>
            </>
          } />

          <Route path="/contact" element={<Contact lang={lang} />} />

          {/* Admin registration details (protected) */}
          <Route path="/admin/registration/:id" element={
            isAuthenticated ? <AdminRegistrationDetails /> : <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />
          } />

          <Route path="/id-card/:idNo" element={<PlayerIDCardPage />} />
          {/* Public institution details for SEO */}
          <Route path="*" element={<Home lang={lang} onNavigate={handlePageChange} />} />
        </Routes>
        </Suspense>
      </main>

      {!isAdminPage && <Footer lang={lang} />}

      {!isAdminPage && (
        <div className="fixed bottom-8 right-8 z-40">
          <a 
            href="tel:+91 9123163206" 
            className="bg-purple-600 hover:bg-purple-700 text-white p-5 rounded-full shadow-2xl shadow-black-effect transition-all transform hover:scale-110 active:scale-95 group flex items-center justify-center"
            title="Contact Support"
          >
            <Phone size={28} className="group-hover:rotate-12 transition-transform" />
          </a>
        </div>
      )}
    </div>
  );
};

export default App;
