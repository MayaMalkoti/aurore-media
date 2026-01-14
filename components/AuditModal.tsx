
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Calendar, ArrowRight, Video, Zap, ShieldCheck } from 'lucide-react';

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuditModal: React.FC<AuditModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/95 backdrop-blur-xl"
          />

          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            className="relative w-full max-w-4xl bg-aurore-gray border border-white/10 shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors z-10"
            >
              <X size={20} />
            </button>

            {/* Re-introduced Cool Heading */}
            <div className="pt-16 pb-8 text-center border-b border-white/10">
              <span className="label-mini text-neon-purple mb-4 block tracking-[0.6em]">Choose Your Path</span>
              <h2 className="font-sans font-black text-4xl md:text-6xl uppercase tracking-tighter leading-none text-white">
                How should we <br/><span className="text-neon-gold">audit you?</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Option 1: Direct Email */}
              <div className="p-12 md:p-16 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between group hover:bg-white/[0.01] transition-colors">
                <div>
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-neon-purple mb-8 group-hover:bg-neon-purple group-hover:text-white transition-all">
                    <Mail size={18} />
                  </div>
                  <h3 className="font-sans font-black text-2xl uppercase tracking-tighter text-white mb-6">Direct <br/>Correspondence</h3>
                  <p className="text-[12px] text-white/40 uppercase font-bold tracking-widest leading-relaxed mb-12">
                    Send your social handle and biggest challenge. We reply with a custom video audit within 24h.
                  </p>
                </div>
                
                <a 
                  href="mailto:auroreltd234@gmail.com"
                  className="flex items-center justify-between border-t border-white/10 pt-10 hover:text-neon-purple transition-colors"
                >
                  <div className="flex flex-col">
                    <span className="label-mini text-[9px] text-white/20 mb-2">Recipient</span>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white transition-colors">
                      auroreltd234@gmail.com
                    </span>
                  </div>
                  <ArrowRight size={16} className="opacity-20 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                </a>
              </div>

              {/* Option 2: Direct Google Calendar */}
              <div className="p-12 md:p-16 flex flex-col justify-between bg-white/[0.02] group hover:bg-white/[0.04] transition-colors relative">
                <div className="absolute top-8 right-12 flex items-center gap-1.5 opacity-20">
                  <ShieldCheck size={12} className="text-neon-gold" />
                  <span className="text-[8px] font-black uppercase tracking-widest text-white">Secure</span>
                </div>

                <div>
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-neon-gold mb-8 group-hover:bg-neon-gold group-hover:text-black transition-all">
                    <Calendar size={18} />
                  </div>
                  <h3 className="font-sans font-black text-2xl uppercase tracking-tighter text-white mb-6">Schedule <br/>A Session</h3>
                  <p className="text-[12px] text-white/40 uppercase font-bold tracking-widest leading-relaxed mb-6">
                    Pick your date and time directly on our calendar. Secure your slot instantly for a 1-on-1 strategy session.
                  </p>
                  <div className="flex items-center gap-4 opacity-40 mb-12">
                    <div className="flex items-center gap-2 text-[9px] font-black uppercase text-white"><Video size={12} /> Zoom</div>
                    <div className="flex items-center gap-2 text-[9px] font-black uppercase text-white"><Zap size={12} /> Meet</div>
                  </div>
                </div>

                <a 
                  href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0l-vG5" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn h-14 bg-white text-black label-mini flex items-center justify-center gap-3 hover:bg-neon-gold hover:text-white transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Select Time Slot
                </a>
              </div>
            </div>

            {/* Microcopy */}
            <div className="p-6 border-t border-white/10 text-center">
              <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/10">
                Aurore Media // Personalized Strategy Sessions // No Pre-Booking Required
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuditModal;
