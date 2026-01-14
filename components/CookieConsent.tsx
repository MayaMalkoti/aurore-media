
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, BarChart3, Zap, Sparkles, Target, Settings2, Check } from 'lucide-react';
import { CookiePreferences } from '../types';

const STORAGE_KEY = 'aurore_cookie_consent';

const DEFAULT_PREFERENCES: CookiePreferences = {
  essential: true,
  analytics: false,
  performance: false,
  personalization: false,
  marketing: false,
};

interface CookieConsentProps {
  forceOpenModal?: boolean;
  onModalClose?: () => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ forceOpenModal, onModalClose }) => {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_PREFERENCES);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      setShowBanner(true);
    } else {
      setPreferences(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (forceOpenModal) {
      setShowModal(true);
      setShowBanner(false);
    }
  }, [forceOpenModal]);

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    setPreferences(prefs);
    setShowBanner(false);
    setShowModal(false);
    if (onModalClose) onModalClose();
    // Dispatch event for analytics scripts
    window.dispatchEvent(new CustomEvent('aurore_cookie_update', { detail: prefs }));
  };

  const handleAcceptAll = () => {
    saveConsent({
      essential: true,
      analytics: true,
      performance: true,
      personalization: true,
      marketing: true,
    });
  };

  const handleRejectAll = () => {
    saveConsent({
      ...DEFAULT_PREFERENCES,
      essential: true,
    });
  };

  const togglePref = (key: keyof CookiePreferences) => {
    if (key === 'essential') return;
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      {/* Banner */}
      <AnimatePresence>
        {showBanner && !showModal && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-6 right-6 md:left-auto md:right-12 md:max-w-md z-[500]"
          >
            <div className="bg-aurore-gray/95 backdrop-blur-xl border border-white/10 p-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-neon-purple shadow-[0_0_15px_rgba(176,38,255,0.5)]" />
              
              <h3 className="font-sans font-black text-xl uppercase tracking-tighter text-white mb-4 flex items-center gap-2">
                🍪 Cookies, but make it respectful.
              </h3>
              <p className="text-sm text-white/50 mb-8 leading-relaxed font-medium">
                We use a few cookies to keep the site smooth, understand what’s working, and improve your experience. You’re in control.
              </p>
              
              <div className="flex flex-col gap-3 mb-6">
                <button
                  onClick={handleAcceptAll}
                  className="w-full h-12 bg-white text-black label-mini flex items-center justify-center hover:bg-neon-purple hover:text-white transition-all transform hover:scale-[1.02]"
                >
                  ✅ Accept all
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setShowModal(true)}
                    className="h-12 border border-white/10 text-white label-mini flex items-center justify-center hover:bg-white/5 transition-all"
                  >
                    🛠️ Customize
                  </button>
                  <button
                    onClick={handleRejectAll}
                    className="h-12 border border-white/10 text-white label-mini flex items-center justify-center hover:bg-white/5 transition-all"
                  >
                    🚫 Reject
                  </button>
                </div>
              </div>

              <p className="text-[9px] font-black uppercase tracking-widest text-white/20 text-center">
                No creepy tracking. No selling your data. Ever.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preferences Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[1001] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowModal(false);
                if (onModalClose) onModalClose();
              }}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-xl bg-aurore-gray border border-white/10 p-10 md:p-14 shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => {
                  setShowModal(false);
                  if (onModalClose) onModalClose();
                }}
                className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="mb-10">
                <span className="label-mini text-neon-gold mb-4 block">Privacy Preferences</span>
                <h2 className="font-sans font-black text-3xl uppercase tracking-tighter text-white">
                  Cookie Settings
                </h2>
              </div>

              <div className="space-y-4 mb-12">
                {[
                  { id: 'essential', label: 'Essential', icon: <ShieldCheck size={20} />, desc: 'Required for site security and core functionality.' },
                  { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={20} />, desc: 'Helps us understand usage to improve the website.' },
                  { id: 'performance', label: 'Performance', icon: <Zap size={20} />, desc: 'Improves load speed and stability.' },
                  { id: 'personalization', label: 'Personalization', icon: <Sparkles size={20} />, desc: 'Remembers your preferences and history.' },
                  { id: 'marketing', label: 'Marketing', icon: <Target size={20} />, desc: 'Ads measurement and limited retargeting.' }
                ].map((item) => (
                  <div 
                    key={item.id}
                    className="p-6 bg-black/40 border border-white/5 flex items-center justify-between gap-6 group hover:border-white/10 transition-all"
                  >
                    <div className="flex items-center gap-5">
                      <div className={`transition-colors ${preferences[item.id as keyof CookiePreferences] ? 'text-neon-purple' : 'text-white/20'}`}>
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-[14px] font-black uppercase tracking-wider text-white flex items-center gap-2">
                          {item.label}
                          {item.id === 'essential' && <span className="text-[9px] px-2 py-0.5 border border-white/10 text-white/40 tracking-widest">Fixed</span>}
                        </h4>
                        <p className="text-[13px] text-white/40 font-medium tracking-tight mt-1 leading-tight">{item.desc}</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => togglePref(item.id as keyof CookiePreferences)}
                      disabled={item.id === 'essential'}
                      className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                        preferences[item.id as keyof CookiePreferences] ? 'bg-neon-purple' : 'bg-white/5'
                      } ${item.id === 'essential' ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <motion.div
                        animate={{ x: preferences[item.id as keyof CookiePreferences] ? 24 : 4 }}
                        className="absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow-lg"
                      />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={() => saveConsent(preferences)}
                className="w-full h-14 bg-white text-black label-mini flex items-center justify-center hover:bg-neon-purple hover:text-white transition-all transform hover:scale-[1.02]"
              >
                Save My Choices
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CookieConsent;
