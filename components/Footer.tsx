
import React from 'react';
import { ArrowUpRight, Instagram, Linkedin, Twitter } from 'lucide-react';
import { insights } from '../data/insights';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenCookies?: () => void;
}

const socialLinks = [
  { name: 'Instagram', url: 'https://www.instagram.com/aurore_media', icon: <Instagram size={14} /> },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/aurore-media', icon: <Linkedin size={14} /> },
  { name: 'X', url: 'https://x.com/AuroreMedia', icon: <Twitter size={14} /> }
];

const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenCookies }) => {
  return (
    <footer className="bg-black pt-32 pb-16 px-6 md:px-12 border-t border-white/10 gpu">
      <div className="container mx-auto">
        
        {/* Resources Section */}
        <div id="resources" className="mb-32">
             <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                <div className="max-w-md">
                    <span className="text-neon-gold font-sans font-black text-[12px] tracking-[0.4em] uppercase mb-6 block">05. INSIGHTS</span>
                    <h2 className="font-sans font-black text-5xl md:text-7xl uppercase tracking-tighter leading-none mb-4 text-white">FUEL<span className="text-neon-gold">.</span></h2>
                </div>
                <p className="text-neutral-400 font-medium text-sm uppercase tracking-widest text-right mb-4">Essential reading for the digitally ambitious.</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
                {insights.map((res) => (
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

        {/* Bottom Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-24">
            <div className="col-span-2 lg:col-span-3">
                <div className="font-sans font-black text-3xl tracking-tighter uppercase mb-8 text-white">
                    AURORE<span className="text-neon-gold">.</span>
                </div>
                <p className="text-neutral-300 font-medium text-base max-w-xs mb-12 leading-relaxed">
                    A creative collective dedicated to turning attention into legacy. High-end social strategy and visual disruption.
                </p>
            </div>

            <div className="flex flex-col gap-4">
                <h4 className="text-[12px] font-bold uppercase tracking-[0.4em] text-white/30 mb-4">Nav</h4>
                {['Services', 'Portfolio', 'About', 'Contact'].map(item => (
                    <button key={item} onClick={() => onNavigate('/')} className="text-sm font-bold uppercase tracking-widest text-white/70 hover:text-neon-gold transition-colors text-left">{item}</button>
                ))}
            </div>

            <div className="flex flex-col gap-4">
                <h4 className="text-[12px] font-bold uppercase tracking-[0.4em] text-white/30 mb-4">Social</h4>
                {socialLinks.map(link => (
                    <a 
                      key={link.name} 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-sm font-bold uppercase tracking-widest text-white/70 hover:text-neon-gold transition-all flex items-center gap-2 group/social"
                    >
                      <span className="opacity-50 group-hover/social:opacity-100 transition-opacity">
                        {link.icon}
                      </span>
                      {link.name}
                    </a>
                ))}
            </div>

            <div className="flex flex-col gap-4">
                <h4 className="text-[12px] font-bold uppercase tracking-[0.4em] text-white/30 mb-4">Legal</h4>
                <button 
                  onClick={() => onNavigate('/cookies')} 
                  className="text-sm font-bold uppercase tracking-widest text-white/70 hover:text-neon-gold transition-colors text-left"
                >
                  Cookie Policy
                </button>
                <button 
                  onClick={onOpenCookies} 
                  className="text-sm font-bold uppercase tracking-widest text-white/70 hover:text-neon-gold transition-colors text-left"
                >
                  Cookie Preferences
                </button>
                <a href="#" className="text-sm font-bold uppercase tracking-widest text-white/70 hover:text-neon-gold transition-colors">Terms of Use</a>
            </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 text-[12px] font-bold uppercase tracking-[0.2em] text-white/50">
            <p>© {new Date().getFullYear()} Aurore Media Studio. All rights reserved.</p>
            <p className="flex items-center gap-2 mt-4 md:mt-0">
                Crafted for the bold. <span className="text-neon-gold animate-pulse">⚡</span>
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
