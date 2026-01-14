
import React from 'react';
import { ArrowUpRight, Instagram, Linkedin, Twitter } from 'lucide-react';
import Logo from './Logo';
import FAQ from './FAQ';

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
    <footer className="bg-black pt-20 pb-16 px-6 md:px-12 border-t border-white/10 gpu">
      <div className="container mx-auto">
        
        {/* FAQ Section moved from Homepage to Footer start */}
        <div className="mb-32">
          <FAQ />
        </div>

        {/* Bottom Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-24">
            <div className="col-span-2 lg:col-span-3">
                <div className="font-sans font-black text-3xl tracking-tighter uppercase mb-8 text-white flex items-center gap-3">
                    <Logo size={32} />
                    AURORE<span className="text-neon-gold">.</span>
                </div>
                <p className="text-neutral-300 font-medium text-base max-w-xs mb-12 leading-relaxed">
                    A creative collective dedicated to turning attention into legacy. High-end social strategy and visual disruption.
                </p>
            </div>

            <div className="flex flex-col gap-4">
                <h4 className="text-[12px] font-bold uppercase tracking-[0.4em] text-white/30 mb-4">Nav</h4>
                {[
                  { label: 'Services', href: '#services' },
                  { label: 'Portfolio', href: '#portfolio' },
                  { label: 'About', href: '#about' },
                  { label: 'Contact', href: '#contact' }
                ].map(item => (
                    <button key={item.label} onClick={() => onNavigate(item.href)} className="text-sm font-bold uppercase tracking-widest text-white/70 hover:text-neon-gold transition-colors text-left">{item.label}</button>
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
                  onClick={() => onNavigate('/terms')} 
                  className="text-sm font-bold uppercase tracking-widest text-white/70 hover:text-neon-gold transition-colors text-left"
                >
                  Terms of Use
                </button>
                <button 
                  onClick={onOpenCookies} 
                  className="text-sm font-bold uppercase tracking-widest text-white/70 hover:text-neon-gold transition-colors text-left"
                >
                  Cookie Preferences
                </button>
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
