
import React from 'react';
import { motion, Variants } from 'framer-motion';

interface HeroProps {
  onOpenAudit: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenAudit }) => {
  const itemVars: Variants = {
    initial: { y: 20, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    }
  };

  const handleAuditClick = () => {
    window.dispatchEvent(new CustomEvent('aurore_cta_click'));
    onOpenAudit();
  };

  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-end pb-12 md:pb-24 overflow-hidden bg-black">
      <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 pointer-events-none opacity-5">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="border-r border-white/20 h-full last:border-0" />
        ))}
      </div>

      <div className="container z-10 relative">
        <motion.div 
          initial="initial"
          animate="animate"
          className="max-w-screen-2xl mx-auto"
        >
          <motion.div variants={itemVars} className="mb-10 md:mb-16 lg:mb-24">
             <span className="label-mini text-white/30 block mb-4 md:mb-6">
                Creative Direction // Content Audit // Social Legacy
             </span>
             <h1 className="h-massive text-white">
               ATTENTION <br />
               <span className="stroke-text">IS THE ONLY</span> <br />
               <span className="text-neon-gold">CURRENCY.</span>
             </h1>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-end pt-8 md:pt-12 border-t border-white/10">
            <motion.div variants={itemVars} className="lg:col-span-7">
              <p className="text-lg md:text-xl lg:text-3xl text-neutral-400 font-medium leading-tight tracking-tighter max-w-2xl">
                We transform stale social presence into high-conversion digital assets. Your content should be an <span className="text-white underline underline-offset-8 decoration-neon-purple decoration-2">investment</span>, not an expense.
              </p>
            </motion.div>
            
            <motion.div variants={itemVars} className="lg:col-span-5 flex flex-col sm:flex-row gap-4 lg:justify-end">
              <button 
                onClick={handleAuditClick}
                className="h-14 md:h-16 px-10 md:px-12 bg-white text-black label-mini flex items-center justify-center transition-all hover:bg-neon-purple hover:text-white active:scale-95 shadow-lg"
              >
                Request Audit
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
