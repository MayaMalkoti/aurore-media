
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { insights } from '../data/insights';

interface FuelProps {
  onNavigate: (path: string) => void;
}

const Fuel: React.FC<FuelProps> = ({ onNavigate }) => {
  return (
    <section id="resources" className="section-py bg-black border-t border-white/5">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-md">
            <span className="text-neon-gold font-sans font-black text-[12px] tracking-[0.4em] uppercase mb-6 block">05. INSIGHTS</span>
            <h2 className="font-sans font-black text-5xl md:text-7xl uppercase tracking-tighter leading-none mb-4 text-white">FUEL<span className="text-neon-gold">.</span></h2>
          </div>
          <p className="text-neutral-400 font-medium text-sm uppercase tracking-widest text-right mb-4">Essential reading for the digitally ambitious.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {insights.slice(0, 3).map((res) => (
            <div 
              key={res.id} 
              onClick={() => onNavigate(`/insights/${res.slug}`)}
              className="group bg-black p-10 hover:bg-neon-gold transition-all duration-500 cursor-pointer"
            >
              <div className="flex justify-between items-start mb-12">
                <span className="text-[12px] font-bold uppercase tracking-widest text-white/40 group-hover:text-black group-hover:opacity-100">{res.category}</span>
                <ArrowUpRight className="text-white/30 group-hover:text-black transition-all" size={20} />
              </div>
              <h3 className="font-sans font-black text-2xl uppercase tracking-tighter leading-tight text-white group-hover:text-black transition-colors">
                {res.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Fuel;
