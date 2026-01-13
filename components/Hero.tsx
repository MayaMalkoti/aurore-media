import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden pt-20">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-aurore-dark z-0">
         <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/20 blur-[120px]" />
         <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-yellow-600/10 blur-[120px]" />
      </div>

      <div className="z-10 container mx-auto px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6"
        >
          <p className="text-yellow-500 uppercase tracking-[0.2em] text-sm md:text-base font-bold mb-4">
             — Attention is Currency
          </p>
        </motion.div>

        <motion.h1 
          className="font-serif text-5xl md:text-8xl lg:text-9xl leading-[0.9] md:leading-[0.85] tracking-tight mb-8 text-white mix-blend-difference"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          WEAPONIZE <br />
          <span className="italic font-light opacity-80">YOUR</span> SOCIALS<span className="text-yellow-500">.</span>
        </motion.h1>

        <motion.p 
          className="max-w-xl text-neutral-400 text-lg md:text-xl mb-12 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          We don’t manage socials. We ignite them. <br className="hidden md:block"/>
          Campaigns • Content • Design • Calendars
        </motion.p>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
        >
            <a 
            href="#contact" 
            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-white px-8 font-medium text-black transition-all duration-300 hover:bg-yellow-500 hover:text-black focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
            >
            <span className="mr-2">Build With Us</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
        </motion.div>
      </div>

      {/* Infinite Scroll/Marquee at bottom of Hero */}
      <div className="absolute bottom-0 w-full overflow-hidden whitespace-nowrap py-6 border-t border-white/5 bg-black/50 backdrop-blur-sm">
        <motion.div 
          className="inline-block"
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
           {[...Array(10)].map((_, i) => (
             <span key={i} className="mx-8 font-serif text-2xl text-neutral-500 italic">
               Design • Strategy • Execution • Growth • 
             </span>
           ))}
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-24 right-8 hidden md:block text-neutral-500"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ArrowDown size={24} />
      </motion.div>
    </section>
  );
};

export default Hero;