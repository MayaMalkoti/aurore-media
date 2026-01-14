
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const qas = [
  { q: "Do you guarantee virality?", a: "No. Anyone promising that is lying. We focus on quality, consistency, and strong fundamentals that give you a real shot." },
  { q: "What if I’m camera shy?", a: "We find formats that work for you. From high-end B-roll to text-based narratives, you don't always have to be the 'face'." },
  { q: "What do you need from me?", a: "Raw footage, your niche, and 15 minutes a week for alignment. We handle the rest." },
  { q: "How do we talk?", a: "Email for direct access + a shared tracker for visibility. No corporate friction." }
];

const FAQ: React.FC = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-32 px-6">
      <div className="container mx-auto max-w-4xl">
        <h2 className="font-sans font-black text-4xl md:text-7xl uppercase tracking-tighter text-center mb-24">FAQ<span className="text-neon-purple">.</span></h2>
        
        <div className="space-y-2">
          {qas.map((item, i) => (
            <div key={i} className="bg-aurore-gray border border-white/5 overflow-hidden">
              <button 
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full p-10 flex justify-between items-center text-left hover:bg-white/[0.02]"
              >
                <span className={`font-sans font-black text-xl uppercase tracking-tighter transition-colors ${open === i ? 'text-neon-purple' : 'opacity-40'}`}>
                  {item.q}
                </span>
                {open === i ? <Minus size={20} className="text-neon-purple" /> : <Plus size={20} className="opacity-20" />}
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-10 pb-10"
                  >
                    <p className="text-white/60 font-bold leading-relaxed text-lg">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
