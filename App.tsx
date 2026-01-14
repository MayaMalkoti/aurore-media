
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import WhoFor from './components/WhoFor';
import About from './components/About';
import Process from './components/Process';
import Pricing from './components/Pricing';
import MomentumTracker from './components/MomentumTracker';
import Fuel from './components/Fuel';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import InsightsHub from './components/InsightsHub';
import InsightArticle from './components/InsightArticle';
import MobileStickyBar from './components/MobileStickyBar';
import AuditModal from './components/AuditModal';
import PricingInquiryModal from './components/PricingInquiryModal';
import CookieConsent from './components/CookieConsent';
import CookiesPage from './components/CookiesPage';
import TermsPage from './components/TermsPage';
import { insights } from './data/insights';
import { CookiePreferences } from './types';

function App() {
  const [currentPath, setCurrentPath] = useState('/');
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [isCookieModalForced, setIsCookieModalForced] = useState(false);
  const [consent, setConsent] = useState<CookiePreferences | null>(null);

  // High-performance navigation handler with hash support
  const handleNavigate = useCallback((path: string) => {
    // If navigating to a hash on the current page, handle it locally
    if (path.startsWith('#') && currentPath === '/') {
      const el = document.getElementById(path.replace('#', ''));
      el?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    // Reset scroll for new page loads
    if (!path.includes('#')) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }

    // Clean paths for the internal router
    const cleanPath = path.split('#')[0] || '/';
    setCurrentPath(cleanPath);

    // If there's a hash, we'll handle scrolling in a useEffect once the route resolves
    if (path.includes('#')) {
      const hash = path.split('#')[1];
      // We give it a moment to render the homepage
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [currentPath]);

  // Initial deep link support on refresh
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && currentPath === '/') {
      setTimeout(() => {
        const el = document.getElementById(hash.replace('#', ''));
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  }, []);

  // Script Gating Implementation
  useEffect(() => {
    const handleCookieUpdate = (event: any) => {
      const prefs = event.detail as CookiePreferences;
      setConsent(prefs);
    };

    window.addEventListener('aurore_cookie_update', handleCookieUpdate);
    return () => window.removeEventListener('aurore_cookie_update', handleCookieUpdate);
  }, []);

  const openAudit = () => setIsAuditModalOpen(true);
  const openPricingInquiry = () => setIsPricingModalOpen(true);

  const activeArticle = useMemo(() => {
    if (!currentPath.startsWith('/insights/')) return null;
    const slug = currentPath.replace('/insights/', '');
    return insights.find(p => p.slug === slug);
  }, [currentPath]);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-neon-purple selection:text-white antialiased overflow-x-hidden">
      <CustomCursor />
      
      {/* Modals & Consent */}
      <AuditModal isOpen={isAuditModalOpen} onClose={() => setIsAuditModalOpen(false)} />
      <PricingInquiryModal isOpen={isPricingModalOpen} onClose={() => setIsPricingModalOpen(false)} />
      <CookieConsent 
        forceOpenModal={isCookieModalForced} 
        onModalClose={() => setIsCookieModalForced(false)} 
      />

      <Header 
        onNavigate={handleNavigate} 
        currentPath={currentPath} 
        onOpenAudit={openAudit} 
        onOpenCookies={() => setIsCookieModalForced(true)}
      />
      
      <main className="gpu relative">
        <AnimatePresence mode="wait">
          {currentPath === '/' ? (
            <motion.div 
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <Hero onOpenAudit={openAudit} />
              <Services onNavigate={handleNavigate} />
              <Portfolio onOpenAudit={openAudit} />
              <WhoFor />
              <About />
              <Process />
              <Pricing onOpenInquiry={openPricingInquiry} />
              <MomentumTracker />
              <Fuel onNavigate={handleNavigate} />
            </motion.div>
          ) : currentPath === '/insights' ? (
            <motion.div 
              key="hub"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <InsightsHub 
                onNavigate={(slug) => handleNavigate(`/insights/${slug}`)} 
                onOpenAudit={openAudit}
              />
            </motion.div>
          ) : currentPath === '/cookies' ? (
            <motion.div 
              key="cookies"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <CookiesPage 
                onBack={() => handleNavigate('/')} 
                onOpenPreferences={() => setIsCookieModalForced(true)}
              />
            </motion.div>
          ) : currentPath === '/terms' ? (
            <motion.div 
              key="terms"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <TermsPage 
                onBack={() => handleNavigate('/')} 
                onContact={() => { handleNavigate('/'); setTimeout(openAudit, 200); }}
              />
            </motion.div>
          ) : activeArticle ? (
            <motion.div 
              key={activeArticle.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <InsightArticle 
                post={activeArticle} 
                onBack={() => handleNavigate('/insights')}
                onNavigate={(slug) => handleNavigate(`/insights/${slug}`)}
                onOpenAudit={openAudit}
              />
            </motion.div>
          ) : (
            <div className="pt-40 text-center">
              <h1 className="h-large">404</h1>
              <button onClick={() => handleNavigate('/')} className="label-mini text-neon-purple mt-8">Back Home</button>
            </div>
          )}
        </AnimatePresence>
      </main>
      
      <Footer 
        onNavigate={handleNavigate} 
        onOpenCookies={() => setIsCookieModalForced(true)} 
      />
      <MobileStickyBar onOpenAudit={openAudit} />
    </div>
  );
}

export default App;
