
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, ArrowLeft, Settings2 } from 'lucide-react';

interface CookiesPageProps {
  onBack: () => void;
  onOpenPreferences: () => void;
}

const CookiesPage: React.FC<CookiesPageProps> = ({ onBack, onOpenPreferences }) => {
  return (
    <div className="bg-black min-h-screen pt-48 pb-32 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <button 
            onClick={onBack}
            className="flex items-center gap-2 label-mini text-white/40 hover:text-neon-purple transition-colors mb-12"
          >
            <ArrowLeft size={14} /> Back
          </button>

          <span className="label-mini text-neon-gold mb-6 block">Legal // Compliance</span>
          <h1 className="h-large uppercase tracking-ultra mb-16 text-white">
            Cookie <br/><span className="text-neon-purple">Policy.</span>
          </h1>

          <div className="prose prose-invert max-w-none space-y-16">
            <section>
              <p className="text-2xl font-bold text-white/60 leading-relaxed mb-8">
                At Aurore Media, we use cookies to keep our website working smoothly and to understand how we can improve it. You can accept, reject, or customize non-essential cookies anytime.
              </p>
              <button 
                onClick={onOpenPreferences}
                className="h-14 px-10 bg-white text-black label-mini flex items-center justify-center gap-3 hover:bg-neon-purple hover:text-white transition-all transform hover:scale-[1.02]"
              >
                <Settings2 size={16} /> Open Cookie Preferences
              </button>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-16 border-t border-white/10">
              <div className="space-y-6">
                <h2 className="font-sans font-black text-2xl uppercase tracking-tighter text-white flex items-center gap-3">
                  <Shield size={20} className="text-neon-purple" /> What are cookies?
                </h2>
                <p className="text-white/40 font-bold uppercase tracking-widest text-[13px] leading-relaxed">
                  Cookies are small text files stored on your device that help websites remember your visits and preferences. They allow us to provide a better browsing experience.
                </p>
              </div>

              <div className="space-y-6">
                <h2 className="font-sans font-black text-2xl uppercase tracking-tighter text-white flex items-center gap-3">
                  <Lock size={20} className="text-neon-purple" /> Types of cookies we use
                </h2>
                <ul className="space-y-4">
                  {[
                    { t: 'Essential', d: 'Required for site security and core functionality.' },
                    { t: 'Analytics', d: 'Helps us understand usage to improve the website.' },
                    { t: 'Performance', d: 'Improves load speed and stability.' },
                    { t: 'Personalization', d: 'Remembers your preferences and history.' },
                    { t: 'Marketing', d: 'Ads measurement and retargeting (if enabled).' }
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-neon-gold font-black text-[12px] uppercase">[{item.t}]</span>
                      <span className="text-white/40 text-[12px] font-bold uppercase tracking-widest">{item.d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <section className="pt-16 border-t border-white/10">
              <h2 className="font-sans font-black text-2xl uppercase tracking-tighter text-white mb-8">Your Choices</h2>
              <p className="text-white/40 font-bold uppercase tracking-widest text-[13px] leading-relaxed mb-8">
                You have full control over your cookie settings. Beyond our built-in controls, you can also manage cookies through your browser settings to block or delete cookies across all websites.
              </p>
              <div className="p-8 bg-aurore-gray border border-white/10">
                <p className="text-[11px] font-black uppercase tracking-[0.3em] text-white/30 mb-2">Updates + Last Updated</p>
                <p className="text-sm font-black text-white uppercase tracking-widest">May 2024</p>
                
                <p className="text-[11px] font-black uppercase tracking-[0.3em] text-white/30 mt-8 mb-2">Contact</p>
                <a href="mailto:privacy@aurore.media" className="text-sm font-black text-neon-gold uppercase tracking-widest hover:text-white transition-colors">
                  privacy@aurore.media
                </a>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CookiesPage;
