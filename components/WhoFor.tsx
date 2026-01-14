
import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const WhoFor: React.FC = () => {
  return (
    <section id="contact" className="py-32 dark:bg-black bg-white px-6 md:px-12 border-t dark:border-white/5 border-black/5">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#E9A661] font-sans font-black text-[10px] tracking-[0.4em] uppercase mb-8 block">02. AUDIENCE</span>
            <h2 className="font-sans font-black text-5xl md:text-7xl uppercase tracking-tighter leading-none mb-12">
              PERFECT <br/>
              IF YOU'RE<span className="text-[#E9A661]">...</span>
            </h2>
            <ul className="space-y-6">
              {[
                "A creator trying to post consistently but don’t have time to edit",
                "A new brand needing a clean content system",
                "A local business wanting better online presence",
                "Someone who knows they should post… but keeps procrastinating"
              ].map((item, i) => (
                <li key={i} className="flex gap-4 items-start group">
                  <div className="mt-1 w-5 h-5 rounded-full bg-[#E9A661]/10 flex items-center justify-center text-[#E9A661]">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <p className="text-lg font-medium opacity-60 group-hover:opacity-100 transition-opacity">{item}</p>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-neutral-50 dark:bg-neutral-900/50 p-12 border dark:border-white/5 border-black/5"
          >
            <h3 className="font-sans font-black text-2xl uppercase tracking-tighter mb-8 opacity-40">NOT A FIT IF...</h3>
            <div className="flex gap-4 items-start text-neutral-500">
               <div className="mt-1 w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                 <X size={12} strokeWidth={3} />
               </div>
               <p className="text-lg font-medium leading-relaxed italic">
                 "You want overnight viral miracles without putting in consistent effort."
               </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhoFor;
