
import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <section id="about" className="py-40 px-6 border-t border-white/10 bg-black">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <div>
            <span className="text-neon-purple font-sans font-black text-[14px] tracking-[0.6em] uppercase mb-10 block">Manifesto</span>
            <h2 className="font-sans font-black text-6xl md:text-9xl uppercase tracking-tighter leading-[0.8] mb-12">
              You’re new. <br/><span className="stroke-text">Why should I</span> <br/><span className="text-neon-gold">trust you?</span>
            </h2>
          </div>

          <div className="space-y-16">
            <p className="text-3xl md:text-4xl font-sans font-bold leading-tight text-white">
              "Fair question. Most agencies hide behind fancy case studies from 5 years ago. <span className="text-neon-gold">We hide behind the work we do today.</span>"
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              {[
                { t: "Free Audit", d: "We provide real value before a single dollar is spent." },
                { t: "Sample Edit", d: "If we're a fit, we'll do one sample using your raw footage." },
                { t: "Direct Access", d: "No account managers. You talk to the people doing the work." },
                { t: "Portfolio Focused", d: "We're building our legacy, which means your growth is our growth." }
              ].map((item, i) => (
                <div key={i} className="p-10 bg-aurore-gray border border-white/10 group hover:border-neon-purple transition-all">
                  <h4 className="font-sans font-black uppercase text-base tracking-widest mb-6 text-neon-purple">{item.t}</h4>
                  <p className="text-[15px] font-bold opacity-60 group-hover:opacity-100 transition-opacity uppercase tracking-widest text-neutral-300 group-hover:text-white leading-relaxed">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
