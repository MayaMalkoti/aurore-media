
import React from 'react';
import { motion } from 'framer-motion';

interface PortfolioProps {
  onOpenAudit: () => void;
}

const demos = [
  { id: 1, title: 'Short-Form Edit', label: 'Pacing Demo', img: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=60&w=600' },
  { id: 2, title: 'Product Reel', label: 'Style Demo', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=60&w=600' },
  { id: 3, title: 'Talking-Head', label: 'Hook Demo', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=60&w=600' },
  { id: 4, title: 'Cinematic B-Roll', label: 'Atmosphere', img: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=60&w=600' },
  { id: 5, title: 'Color + Caption', label: 'Split Screen', img: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&q=60&w=600' },
  { id: 6, title: 'UGC Style', label: 'Natural Edit', img: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=60&w=600' },
];

const Portfolio: React.FC<PortfolioProps> = ({ onOpenAudit }) => {
  return (
    <section id="portfolio" className="py-32 dark:bg-black bg-white px-6 md:px-12 border-t dark:border-white/5 border-black/5 gpu">
      <div className="container mx-auto">
        <div className="mb-32 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-xl"
          >
            <span className="label-mini text-neon-gold mb-6 block">02. SELECTION</span>
            <h2 className="h-large uppercase tracking-ultra text-white">PORTFOLIO <br/>IN PROGRESS<span className="text-neon-gold">.</span></h2>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-xs lg:text-right"
          >
             <p className="text-neutral-400 font-medium text-xs uppercase tracking-widest mb-6">
                We’re building our public portfolio. These style demos show what we produce daily.
             </p>
             <button 
               onClick={onOpenAudit}
               data-cursor="CLICK"
               className="label-mini text-neon-gold border-b border-neon-gold inline-block pb-1 cursor-pointer hover:opacity-70 transition-opacity"
             >
                Request a free sample edit
             </button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {demos.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group relative aspect-square overflow-hidden gpu cursor-trigger"
              data-cursor="VIEW DEMO"
            >
               <img 
                 src={item.img} 
                 loading="lazy"
                 decoding="async"
                 className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105 img-reveal" 
                 alt={item.title} 
               />
               <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-10 flex flex-col justify-end pointer-events-none">
                  <span className="label-mini text-neon-gold mb-3">{item.label}</span>
                  <h3 className="text-white text-2xl font-black uppercase tracking-tighter">{item.title}</h3>
               </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
