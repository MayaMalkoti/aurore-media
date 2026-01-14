
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Mail, ArrowDown } from 'lucide-react';

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

  return (
    <section className="relative min-h-screen flex flex-col justify-end px-6 md:px-12 pb-24 overflow-hidden bg-black">
      {/* Structural Grid Background */}
      <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-12 pointer-events-none opacity-10">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="border-r border-white/20 h-full last:border-0" />
        ))}
      </div>

      <div className="container mx-auto z-10">
        <motion.div 
          initial="initial"
          animate="animate"
          className="max-w-screen-2xl"
        >
          <motion.div variants={itemVars} className="mb-24">
             <span className="text-[12px] font-black uppercase tracking-[0.6em] text-white/30 block mb-6">
                Creative Direction / Content Audit / Social Legacy
             </span>
             <h1 className="font-sans font-black h-massive tracking-ultra uppercase text-white leading-[0.8]">
               ATTENTION <br />
               <span className="stroke-text">IS THE ONLY</span> <br />
               <span className="text-neon-gold">CURRENCY.</span>
             </h1>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end pt-12 border-t border-white/10">
            <motion.div variants={itemVars} className="lg:col-span-7">
              <p className="text-2xl md:text-3xl text-neutral-400 font-medium leading-tight tracking-tighter max-w-3xl">
                We transform stale social presence into high-conversion digital assets. Your content should be an <span className="text-white underline decoration-neon-purple underline-offset-8 decoration-2">investment</span>, not an expense.
              </p>
            </motion.div>
            
            <motion.div variants={itemVars} className="lg:col-span-5 flex flex-col sm:flex-row gap-4 lg:justify-end">
              <button 
                onClick={onOpenAudit}
                className="h-16 px-12 bg-white text-black label-mini flex items-center justify-center transition-all hover:bg-neon-purple hover:text-white"
              >
                Request Audit
              </button>
              <a 
                href="mailto:auroreltd234@gmail.com" 
                className="h-16 px-12 border border-white/10 text-white label-mini flex items-center justify-center gap-3 hover:bg-white/5 transition-all"
              >
                Inquire
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
