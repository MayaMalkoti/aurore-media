
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Calendar, ArrowRight, Video, Zap, ShieldCheck, ChevronDown, ExternalLink, AlertCircle } from 'lucide-react';

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EMAIL = 'auroreltd234@gmail.com';
// Public Google Calendar booking link - copied from Google Calendar → Booking pages → Copy link
const GOOGLE_BOOKING_LINK = 'https://calendar.app.google/ezjxjxCqoBbqaghx8';
const MAILTO_LINK = `mailto:${EMAIL}?subject=Audit%20Request%20-%20Aurore%20Media&body=Hi%20Aurore%20Media%2C%0A%0AI%20want%20a%20content%20audit.%20Here%27s%20my%20Instagram%20handle%3A%20%0A%0AWhat%20I%20need%20help%20with%3A%20%0A%0AThanks!`;

const AuditModal: React.FC<AuditModalProps> = ({ isOpen, onClose }) => {
  const [showEmbed, setShowEmbed] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [embedError, setEmbedError] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-6 lg:p-12">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl"
          />

          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            className="relative w-full max-w-5xl bg-aurore-gray border border-white/10 shadow-2xl overflow-y-auto max-h-[90vh] scrollbar-hide flex flex-col"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 md:top-8 md:right-8 text-white/40 hover:text-white transition-colors z-30 p-2"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {/* Header Section */}
            <div className="pt-12 pb-8 md:pt-16 md:pb-10 text-center border-b border-white/10 px-6 shrink-0">
              <span className="label-mini text-neon-purple mb-3 md:mb-4 block tracking-[0.4em] md:tracking-[0.6em]">Audit Strategy</span>
              <h2 className="font-sans font-black text-2xl md:text-5xl lg:text-6xl uppercase tracking-tighter leading-none text-white">
                How should we <br/><span className="text-neon-gold">audit you?</span>
              </h2>
              <p className="text-[11px] md:text-sm font-bold uppercase tracking-widest text-white/30 mt-4">
                Pick the option that’s easiest. Either way, we’ll tell you what to fix first.
              </p>
            </div>

            <div className="flex-grow">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Card 1: Direct Correspondence */}
                <div className="p-8 md:p-12 lg:p-16 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between group hover:bg-white/[0.01] transition-colors min-h-[400px]">
                  <div>
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center text-neon-purple mb-6 group-hover:bg-neon-purple group-hover:text-white transition-all">
                      <Mail size={18} />
                    </div>
                    <h3 className="font-sans font-black text-xl md:text-2xl uppercase tracking-tighter text-white mb-4">Direct <br />Correspondence</h3>
                    <p className="text-[12px] md:text-sm text-white/40 font-bold tracking-tight leading-relaxed mb-8">
                      Send your queries by email. Best if you want a detailed response.
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    <a 
                      href={MAILTO_LINK}
                      className="h-14 md:h-16 bg-white text-black label-mini flex items-center justify-center gap-3 hover:bg-neon-purple hover:text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] w-full"
                    >
                      Email Us
                    </a>
                    <div className="text-center">
                      <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20">Expect reply in 24-48h</span>
                    </div>
                  </div>
                </div>

                {/* Card 2: Schedule a Meeting */}
                <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-between bg-white/[0.02] group hover:bg-white/[0.04] transition-colors relative min-h-[400px]">
                  <div className="absolute top-6 right-8 flex items-center gap-1.5 opacity-20">
                    <ShieldCheck size={12} className="text-neon-gold" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-white">Secure</span>
                  </div>

                  <div>
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center text-neon-gold mb-6 group-hover:bg-neon-gold group-hover:text-black transition-all">
                      <Calendar size={18} />
                    </div>
                    <h3 className="font-sans font-black text-xl md:text-2xl uppercase tracking-tighter text-white mb-4">Schedule <br />A Meeting</h3>
                    <p className="text-[12px] md:text-sm text-white/40 font-bold tracking-tight leading-relaxed mb-8">
                      Book a short call. Best if you want clarity fast.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <a 
                      href={GOOGLE_BOOKING_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-14 md:h-16 bg-neon-gold text-black label-mini flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all transform hover:scale-[1.02] active:scale-[0.98] w-full shadow-lg shadow-neon-gold/10"
                    >
                      Book on Google Calendar
                    </a>
                    <div className="text-center">
                      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/20">
                        If the embed doesn’t load on your device, this booking link will always work.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Optional Embed Section (Crash-Proof) */}
              <div className="border-t border-white/10">
                <button 
                  onClick={() => setShowEmbed(!showEmbed)}
                  className="w-full py-6 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors group"
                >
                  <ChevronDown size={14} className={`transition-transform duration-300 ${showEmbed ? 'rotate-180' : ''}`} />
                  {showEmbed ? 'Hide Booking Widget' : 'Show Booking Widget'}
                </button>

                <AnimatePresence>
                  {showEmbed && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-black/40"
                    >
                      <div className="p-4 md:p-8">
                        {isClient && !embedError ? (
                          <div className="relative w-full aspect-[4/3] min-h-[720px] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                            <iframe 
                              src={GOOGLE_BOOKING_LINK}
                              className="w-full h-full"
                              loading="lazy"
                              onError={() => setEmbedError(true)}
                              title="Google Appointment Schedule"
                              style={{ border: 0 }}
                            />
                            <div className="absolute bottom-4 right-4 pointer-events-none opacity-20 text-[8px] uppercase font-black text-white tracking-widest">
                              Google Secure Booking
                            </div>
                          </div>
                        ) : (
                          <div className="p-12 text-center border border-dashed border-white/10 rounded-xl">
                            <AlertCircle size={32} className="mx-auto text-neon-gold mb-4 opacity-50" />
                            <p className="text-[12px] font-black uppercase tracking-widest text-white/60 mb-6">
                              The booking widget is unavailable on this device. <br />Please use the direct link below.
                            </p>
                            <a 
                              href={GOOGLE_BOOKING_LINK}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 label-mini text-neon-gold hover:text-white transition-colors"
                            >
                              Open Booking Page <ExternalLink size={14} />
                            </a>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="p-4 md:p-6 border-t border-white/10 text-center shrink-0">
              <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/10">
                Aurore Media // Professional Content Audits
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuditModal;
