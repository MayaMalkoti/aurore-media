import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { BlogPost } from '../types';

const resources: BlogPost[] = [
    { id: '1', title: 'Why your Instagram isn’t growing (and why it’s not the algorithm’s fault).', category: 'Growth' },
    { id: '2', title: '5 Carousel Tricks That Make People Swipe Instead of Scroll.', category: 'Design' },
    { id: '3', title: 'The Content Calendar Template Your Competitors Don’t Have.', category: 'Productivity' },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-black pt-24 pb-12 px-6 border-t border-white/10">
      <div className="container mx-auto">
        
        {/* Resources Section */}
        <div id="resources" className="mb-24">
             <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-6">
                <div>
                    <span className="text-yellow-500 font-mono mb-2 block">06. RESOURCE HUB</span>
                    <h2 className="font-serif text-4xl">Free Stuff.</h2>
                </div>
                <p className="text-neutral-500 italic mt-4 md:mt-0">Because we're nice like that. Useful ammo.</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {resources.map((res) => (
                    <div key={res.id} className="group cursor-pointer">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-xs font-mono border border-white/20 px-2 py-1 rounded text-neutral-400">{res.category}</span>
                            <ArrowUpRight className="text-neutral-600 group-hover:text-yellow-500 transition-colors" size={18} />
                        </div>
                        <h3 className="font-serif text-xl leading-snug group-hover:underline decoration-yellow-500 underline-offset-4 transition-all">
                            {res.title}
                        </h3>
                    </div>
                ))}
             </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-2">
                <div className="font-serif font-bold text-3xl tracking-tighter mb-6">
                    AURORE<span className="text-yellow-500">.</span>
                </div>
                <p className="text-neutral-400 max-w-sm mb-6">
                    Join the movement. Aurore Media is where brands stop posting & start performing.
                </p>
                <div className="flex gap-4">
                     {['Insta', 'LinkedIn', 'YouTube', 'Newsletter'].map(social => (
                         <a key={social} href="#" className="text-sm font-bold uppercase hover:text-yellow-500 transition-colors">{social}</a>
                     ))}
                </div>
            </div>

            <div>
                <h4 className="font-mono text-sm text-neutral-500 mb-6">SITEMAP</h4>
                <ul className="space-y-2">
                    {['Services', 'Portfolio', 'About', 'Contact'].map(item => (
                        <li key={item}><a href={`#${item.toLowerCase()}`} className="text-neutral-300 hover:text-white transition-colors">{item}</a></li>
                    ))}
                </ul>
            </div>

            <div>
                <h4 className="font-mono text-sm text-neutral-500 mb-6">LOCATION</h4>
                <p className="text-neutral-300">New Delhi, India</p>
                <p className="text-neutral-300">Vancouver, Canada</p>
            </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-xs text-neutral-600">
            <p>© {new Date().getFullYear()} Aurore Media.</p>
            <p className="flex items-center gap-2 mt-2 md:mt-0">
                <span className="text-yellow-500">⚡</span> Attention is Currency.
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;