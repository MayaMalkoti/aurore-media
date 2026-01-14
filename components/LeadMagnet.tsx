
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuizOption } from '../types';
// Added Zap to imports
import { ArrowRight, Check, Mail, AlertTriangle, Zap } from 'lucide-react';

interface LeadMagnetProps {
  onOpenAudit: () => void;
}

const LeadMagnet: React.FC<LeadMagnetProps> = ({ onOpenAudit }) => {
  const [selectedOption, setSelectedOption] = useState<QuizOption | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => { setFormSubmitted(true); }, 800);
  };

  return (
    <section id="contact" className="py-40 dark:bg-black bg-white px-6 md:px-12 border-t dark:border-white/5 border-black/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(176,38,255,0.05)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
                <span className="text-[#E9A661] font-sans font-black text-[13px] tracking-[0.5em] uppercase mb-10 block">07. CONVERSION</span>
                <h2 className="font-sans font-black text-6xl md:text-[8vw] uppercase tracking-ultra leading-[0.8] mb-14">
                  WANT A <br/>
                  <span className="text-neon-purple neon-glow-purple">BRUTALLY HONEST</span><br/>
                  CONTENT AUDIT?
                </h2>
                <div className="space-y-8 mb-16">
                  <p className="text-neutral-500 font-bold text-xl md:text-2xl leading-relaxed max-w-lg">
                    We’ll tell you what’s broken, what to fix first, and what plan makes sense. No pressure. No fluff.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-10">
                   <button 
                     onClick={onOpenAudit}
                     className="h-14 md:h-16 px-8 md:px-12 bg-white text-black border border-white/20 label-mini flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-[0.98] hover:bg-neon-purple hover:text-white"
                   >
                      <Zap size={16} /> Get Audit Now
                   </button>
                   <a 
                     href="mailto:auroreltd234@gmail.com" 
                     className="h-14 md:h-16 px-8 md:px-12 border border-white/20 text-white label-mini flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-[0.98] hover:bg-white/5"
                   >
                      <Mail size={16} /> Email Us
                   </a>
                </div>
            </motion.div>

            <div className="bg-neutral-50 dark:bg-neutral-900/60 p-10 md:p-20 border dark:border-white/5 border-black/10 relative overflow-hidden neon-box-purple">
                <AnimatePresence mode="wait">
                    {!selectedOption ? (
                        <motion.div 
                            key="audit-quiz"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-5"
                        >
                            <p className="text-[13px] font-black uppercase tracking-[0.4em] opacity-40 mb-10">Select your main challenge</p>
                            {Object.values(QuizOption).map((option) => (
                                <button
                                    key={option}
                                    onClick={() => setSelectedOption(option)}
                                    className="w-full text-left p-8 flex justify-between items-center group bg-transparent border-b dark:border-white/5 border-black/10 hover:border-neon-purple/50 transition-all duration-500"
                                >
                                    <span className="font-sans font-black text-base md:text-lg uppercase tracking-widest opacity-40 group-hover:opacity-100 group-hover:text-neon-purple transition-all">{option}</span>
                                    <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all text-neon-purple" />
                                </button>
                            ))}
                        </motion.div>
                    ) : !formSubmitted ? (
                        <motion.form 
                            key="audit-form"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-12"
                            onSubmit={handleSubmit}
                        >
                            <div className="flex items-center justify-between border-b dark:border-white/5 border-black/10 pb-10">
                                <div>
                                  <span className="text-[12px] font-black uppercase tracking-widest opacity-30 block mb-2">Audit Focus:</span>
                                  <span className="text-base font-black uppercase text-neon-purple neon-glow-purple">{selectedOption}</span>
                                </div>
                                <button type="button" onClick={() => setSelectedOption(null)} className="text-[12px] font-black uppercase underline opacity-30 hover:opacity-100 transition-opacity">Reset</button>
                            </div>

                            <div className="space-y-10">
                                <div className="group">
                                  <input required type="text" className="w-full bg-transparent border-b dark:border-white/5 border-black/10 py-5 focus:outline-none focus:border-neon-purple transition-colors dark:text-white text-black font-sans text-2xl placeholder:opacity-15 uppercase font-black tracking-tighter" placeholder="Full Name" />
                                </div>
                                <div className="group">
                                  <input required type="email" className="w-full bg-transparent border-b dark:border-white/5 border-black/10 py-5 focus:outline-none focus:border-neon-purple transition-colors dark:text-white text-black font-sans text-2xl placeholder:opacity-15 uppercase font-black tracking-tighter" placeholder="Email Address" />
                                </div>
                                <div className="group">
                                  <input required type="text" className="w-full bg-transparent border-b dark:border-white/5 border-black/10 py-5 focus:outline-none focus:border-neon-purple transition-colors dark:text-white text-black font-sans text-2xl placeholder:opacity-15 uppercase font-black tracking-tighter" placeholder="Instagram / Handle" />
                                </div>
                            </div>

                            <button 
                                type="submit"
                                className="w-full h-14 md:h-16 bg-neon-purple text-white label-mini flex items-center justify-center transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-neon-purple/30"
                            >
                                Get My Free Audit
                            </button>
                        </motion.form>
                    ) : (
                        <motion.div 
                            key="audit-success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-20"
                        >
                            <div className="flex justify-center mb-12">
                                <div className="w-32 h-32 rounded-full border-4 border-neon-purple flex items-center justify-center text-neon-purple shadow-[0_0_30px_rgba(176,38,255,0.4)]">
                                  <Check size={64} strokeWidth={4} />
                                </div>
                            </div>
                            <h3 className="font-sans font-black text-6xl uppercase tracking-ultra mb-6 leading-none">RECEIVED<span className="text-neon-purple">.</span></h3>
                            <p className="text-neutral-500 font-bold text-xl leading-relaxed">We’ll review your profile + reach out within 24 hours.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
      </div>
    </section>
  );
};

export default LeadMagnet;
