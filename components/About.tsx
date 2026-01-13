import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Globe, MapPin, TrendingUp } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-aurore-dark text-white overflow-hidden relative">
        {/* Decorative huge text */}
        <div className="absolute top-0 right-0 opacity-5 pointer-events-none">
            <h1 className="text-[20vw] font-serif leading-none stroke-text">CHAOS</h1>
        </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-yellow-500 font-mono mb-4 block">04. ABOUT US</span>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-8">
              We’re not your typical ‘social media agency’ — we’re that friend who roasts your feed and then fixes it.
            </h2>
            <p className="text-neutral-400 text-lg mb-6 font-light">
              At Aurore Media, we mix strategy, design, and caffeine until your brand stops being invisible and starts owning attention.
            </p>
            
            <div className="space-y-4 mb-8">
               <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <p className="font-serif italic">Attention is currency.</p>
               </div>
               <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <p className="font-serif italic">Consistency beats “posting when you feel like it.”</p>
               </div>
               <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <p className="font-serif italic">A good reel is better than a bad billboard.</p>
               </div>
            </div>
          </motion.div>

          <div className="bg-neutral-900/50 p-8 border border-white/5 backdrop-blur-sm rounded-lg">
             <h3 className="font-serif text-3xl mb-6 text-white border-b border-white/10 pb-4">Meet the Squad</h3>
             
             <div className="mb-8">
                <div className="flex items-center gap-2 mb-2">
                    <Zap className="text-yellow-500" size={20} />
                    <h4 className="font-bold text-xl">Divyansh</h4>
                </div>
                <p className="text-sm text-neutral-400 uppercase tracking-wider mb-2">Chief Chaos Officer</p>
                <p className="text-neutral-300 italic">"Turns random ideas into scroll-stopping campaigns."</p>
             </div>

             <div>
                <div className="flex items-center gap-2 mb-2">
                    <Globe className="text-yellow-500" size={20} />
                    <h4 className="font-bold text-xl">The Team</h4>
                </div>
                <p className="text-sm text-neutral-400 uppercase tracking-wider mb-2">a.k.a The Meme Lords</p>
                <p className="text-neutral-300 italic">Designers, writers, storytellers, content engineers.</p>
             </div>
          </div>

        </div>

        {/* Why Us Grid */}
        <motion.div 
            id="why-us"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-32"
        >
            <div className="text-center mb-16">
                 <h3 className="font-serif text-4xl mb-4">Why Us?</h3>
                 <p className="text-neutral-500">Forget the “10+ years of experience” nonsense.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { icon: <Zap />, title: "All-in-one", desc: "Strategy + Design + Execution." },
                    { icon: <TrendingUp />, title: "Conversion First", desc: "We don't do 'pretty posts', we do content that converts." },
                    { icon: <MapPin />, title: "Global Vibe", desc: "Delhi hustle, Vancouver polish." },
                    { icon: <Globe />, title: "Brand Growth", desc: "We grow your brand, not just your feed." },
                ].map((item, i) => (
                    <div key={i} className="p-6 border border-white/10 hover:border-yellow-500 transition-colors bg-neutral-900/30 text-center flex flex-col items-center">
                        <div className="text-yellow-500 mb-4">{item.icon}</div>
                        <h4 className="font-bold mb-2 font-serif text-xl">{item.title}</h4>
                        <p className="text-sm text-neutral-400">{item.desc}</p>
                    </div>
                ))}
            </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;