import React from 'react';
import { motion } from 'framer-motion';
import { PortfolioItem } from '../types';

const projects: PortfolioItem[] = [
  {
    id: 'cafe-brew',
    client: 'The Daily Grind',
    image: 'https://picsum.photos/seed/coffee/600/800',
    problem: 'Great coffee, zero brand presence.',
    strategy: 'Caffeine-drip campaign + scroll-stopping reels.',
    execution: 'Mockups of edgy posts.',
    result: 'From 0 → 5,000 reach.'
  },
  {
    id: 'tech-startup',
    client: 'Neon Systems',
    image: 'https://picsum.photos/seed/tech/600/800',
    problem: 'Confusing product, bored audience.',
    strategy: 'Simplified explainers + meme marketing.',
    execution: 'Clean, high-contrast carousels.',
    result: '300% Engagement increase.'
  },
  {
    id: 'fashion-brand',
    client: 'Velvet threads',
    image: 'https://picsum.photos/seed/fashion/600/800',
    problem: 'Lost in the feed clutter.',
    strategy: 'Visual ASM and lifestyle branding.',
    execution: 'Cinematic reels.',
    result: 'Sold out launch collection.'
  },
  {
    id: 'fitness-coach',
    client: 'Iron Will',
    image: 'https://picsum.photos/seed/gym/600/800',
    problem: 'Generic fitness advice.',
    strategy: 'Personality-driven content.',
    execution: 'Raw, unpolished vlogs.',
    result: 'Doubled lead intake.'
  }
];

const Portfolio: React.FC = () => {
  return (
    <section id="portfolio" className="py-24 bg-black px-6">
      <div className="container mx-auto">
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="text-yellow-500 font-mono mb-2 block">03. PORTFOLIO</span>
          <h2 className="font-serif text-5xl md:text-7xl mb-4">Concept Projects</h2>
          <p className="text-neutral-500">Proof of skill. No fluff.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`group cursor-pointer ${index % 2 !== 0 ? 'md:mt-24' : ''}`} // Staggered layout effect
            >
              <div className="relative overflow-hidden aspect-[3/4] mb-6">
                <img 
                  src={project.image} 
                  alt={project.client} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center p-8 text-center">
                    <p className="text-yellow-500 font-bold uppercase text-xs tracking-widest mb-2">The Strategy</p>
                    <p className="font-serif text-xl italic mb-4">"{project.strategy}"</p>
                    <div className="h-[1px] w-12 bg-white mx-auto mb-4"></div>
                    <p className="text-sm font-sans">{project.result}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-baseline border-b border-neutral-800 pb-4 group-hover:border-yellow-500 transition-colors">
                <h3 className="text-2xl font-serif">{project.client}</h3>
                <span className="text-xs font-mono text-neutral-500 group-hover:text-white">VIEW CASE</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;