
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, BarChart3, Zap, Sparkles, Target, Settings2, Check, Lock, Undo2, Save } from 'lucide-react';
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
      const parsed = JSON.parse(saved);
      setPreferences(parsed);
      // Emit event for existing preference
      window.dispatchEvent(new CustomEvent('aurore_cookie_update', { detail: parsed }));
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
    
    // Dispatch event to gate script loading across the app
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
      {/* 1. Main Banner - Styled after the reference image (White card, high radius) */}
      <AnimatePresence>
        {showBanner && !showModal && (
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            className="fixed bottom-6 left-6 right-6 md:left-auto md:right-12 md:max-w-[480px] z-[500]"
          >
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)] relative overflow-hidden">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl" role="img" aria-label="cookie">🍪</span>
                <h3 className="font-sans font-black text-2xl tracking-tighter text-black uppercase">
                  Cookies, but keep it classy.
                </h3>
              </div>
              
              <p className="text-[15px] md:text-base text-gray-500 mb-8 leading-relaxed font-medium tracking-tight">
                We use cookies to keep the site running smooth, understand what’s working, and improve your experience. You control what’s on.
              </p>
              
              <div className="flex flex-col gap-3">
                <button 
                  onClick={handleAcceptAll}
                  className="w-full h-14 bg-neon-purple text-white font-black uppercase tracking-widest text-[11px] rounded-[1.25rem] hover:opacity-90 shadow-lg shadow-neon-purple/20 transition-all active:scale-[0.97]"
                >
                  ✅ Accept all
                </button>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={() => setShowModal(true)}
                    className="flex-1 h-14 bg-gray-100 text-gray-700 font-bold uppercase tracking-widest text-[11px] rounded-[1.25rem] hover:bg-gray-200 transition-all active:scale-[0.97]"
                  >
                    🧩 Customize
                  </button>
                  <button 
                    onClick={handleRejectAll}
                    className="flex-1 h-14 bg-gray-100 text-gray-700 font-bold uppercase tracking-widest text-[11px] rounded-[1.25rem] hover:bg-gray-200 transition-all active:scale-[0.97]"
                  >
                    🚫 Reject non-essential
                  </button>
                </div>
              </div>

              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 text-center mt-6">
                No selling your data. No weird tracking. Just better performance and better decisions.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Preferences Modal - Styled to match Aurore Media theme */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4 md:p-6 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => { setShowModal(false); if (onModalClose) onModalClose(); }} 
              className="fixed inset-0 bg-black/95 backdrop-blur-md" 
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-xl bg-aurore-gray border border-white/10 p-8 md:p-14 shadow-2xl rounded-[3rem] overflow-hidden my-auto"
            >
              <button 
                onClick={() => { setShowModal(false); if (onModalClose) onModalClose(); }} 
                className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors p-2"
              >
                <X size={20} />
              </button>

              <div className="mb-10">
                <span className="label-mini text-neon-gold mb-3 md:mb-4 block">Preference Center</span>
                <h2 className="font-sans font-black text-3xl uppercase tracking-tighter text-white flex items-center gap-3">
                   🧩 Cookie Preferences
                </h2>
                <p className="text-[13px] md:text-sm text-white/40 font-medium tracking-tight mt-3">
                  Choose what you’re comfortable with. Essential cookies stay on to make the site function.
                </p>
              </div>

              <div className="space-y-4 mb-10">
                {[
                  { id: 'essential', label: '🛡️ Essential (Always On)', desc: 'Keeps the site secure and working (navigation, forms, consent choice).', locked: true },
                  { id: 'analytics', label: '📈 Analytics', desc: 'Helps us understand which pages people read and what’s useful.' },
                  { id: 'performance', label: '⚡ Performance', desc: 'Helps pages load faster and keeps the site stable.' },
                  { id: 'personalization', label: '✨ Personalization', desc: 'Remembers preferences (if applicable).' },
                  { id: 'marketing', label: '🎯 Marketing', desc: 'Measures ads and supports retargeting. Default OFF.' }
                ].map((item) => (
                  <div key={item.id} className="p-6 bg-black/40 border border-white/5 rounded-[1.5rem] flex items-center justify-between gap-4 group hover:border-white/10 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h4 className="text-[14px] font-black uppercase tracking-wider text-white">
                          {item.label}
                        </h4>
                        {item.locked && (
                          <span className="text-[9px] px-2 py-0.5 border border-white/10 text-white/40 tracking-widest font-black uppercase rounded-full">Locked</span>
                        )}
                      </div>
                      <p className="text-[12px] text-white/30 font-medium tracking-tight mt-1 leading-snug">{item.desc}</p>
                    </div>
                    
                    <button 
                      onClick={() => togglePref(item.id as keyof CookiePreferences)} 
                      disabled={item.locked} 
                      className={`relative w-12 h-6 rounded-full transition-colors duration-300 shrink-0 ${
                        preferences[item.id as keyof CookiePreferences] ? 'bg-neon-purple' : 'bg-white/10'
                      } ${item.locked ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <motion.div 
                        animate={{ x: preferences[item.id as keyof CookiePreferences] ? 24 : 4 }} 
                        className="absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow-lg" 
                      />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-white/5">
                <button 
                  onClick={() => saveConsent(preferences)} 
                  className="flex-1 h-14 bg-white text-black label-mini flex items-center justify-center gap-2 rounded-2xl hover:bg-neon-purple hover:text-white transition-all transform hover:scale-[1.02]"
                >
                  <Save size={14} /> Save preferences
                </button>
                <button 
                  onClick={handleAcceptAll}
                  className="flex-1 h-14 border border-white/10 text-white label-mini flex items-center justify-center gap-2 rounded-2xl hover:bg-white/5 transition-all"
                >
                  ✅ Accept all
                </button>
                <button 
                  onClick={() => { setShowModal(false); if (onModalClose) onModalClose(); }}
                  className="flex-1 h-14 border border-white/10 text-white label-mini flex items-center justify-center gap-2 rounded-2xl hover:bg-white/5 transition-all"
                >
                  ↩️ Cancel
                </button>
              </div>

              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/10 text-center mt-8">
                You can change this anytime from “Cookie Preferences” in the footer.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CookieConsent;
