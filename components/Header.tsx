
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Zap, Info, CreditCard, Lightbulb, Menu, X } from 'lucide-react';
import Logo from './Logo';
import { insights } from '../data/insights';

interface HeaderProps {
  onNavigate: (path: string) => void;
  currentPath: string;
  onOpenAudit: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPath, onOpenAudit }) => {
  const [scrolled, setScrolled] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  const navItems = [
    { name: 'Services', icon: <Zap size={14} />, id: 'services' },
    { name: 'About', icon: <Info size={14} />, id: 'about' },
    { name: 'Pricing', icon: <CreditCard size={14} />, id: 'pricing' },
  ];

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    if (currentPath !== '/') {
      onNavigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[500] transition-all duration-500 px-6 md:px-12 py-6 flex justify-between items-center ${
        scrolled 
          ? 'bg-black/90 backdrop-blur-xl border-b border-white/10 shadow-2xl' 
          : 'bg-black/40 backdrop-blur-sm'
      }`}
    >
      <button 
        onClick={() => { onNavigate('/'); setIsMobileMenuOpen(false); }} 
        className="flex items-center gap-4 group cursor-trigger z-[600]"
      >
        <Logo size={40} isHeaderLogo={true} />
        <div className="font-sans font-black text-xl tracking-tighter uppercase text-white">
          Aurore<span className="text-neon-purple group-hover:text-neon-gold transition-all duration-500">.</span>
        </div>
      </button>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex gap-10 items-center">
        {navItems.map(item => (
          <button 
            key={item.name} 
            onClick={() => handleNavClick(item.id)}
            className="text-[12px] font-black uppercase tracking-[0.2em] text-white/60 hover:text-white transition-all flex items-center gap-2 group/nav"
          >
            <span className="opacity-0 group-hover/nav:opacity-100 group-hover/nav:scale-110 transition-all text-neon-purple">
              {item.icon}
            </span>
            {item.name}
          </button>
        ))}
        
        <div className="relative" onMouseEnter={() => setShowInsights(true)} onMouseLeave={() => setShowInsights(false)}>
          <button 
            onClick={() => onNavigate('/insights')}
            className={`text-[12px] font-black uppercase tracking-[0.2em] flex items-center gap-2 transition-all group/insight ${currentPath.includes('insights') ? 'text-neon-purple' : 'text-white/60 hover:text-white'}`}
          >
            <Lightbulb size={14} className={currentPath.includes('insights') ? 'text-neon-purple' : 'text-neon-gold'} />
            Insights <ChevronDown size={12} className={`transition-transform duration-300 ${showInsights ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {showInsights && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full right-0 mt-4 w-72 bg-aurore-gray border border-white/10 p-2 shadow-2xl overflow-hidden"
              >
                <div className="flex flex-col">
                  <button onClick={() => onNavigate('/insights')} className="text-[11px] font-black uppercase tracking-widest text-white/30 hover:text-white p-4 border-b border-white/5 text-left transition-colors">View All Insights</button>
                  {insights.map(post => (
                    <button 
                      key={post.id}
                      onClick={() => onNavigate(`/insights/${post.slug}`)}
                      className="text-[12px] font-bold uppercase tracking-widest text-white/60 hover:text-neon-purple p-4 text-left transition-all hover:bg-white/5"
                    >
                      {post.title}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      <div className="flex items-center gap-4">
        <button 
          onClick={onOpenAudit}
          className="hidden md:flex h-12 px-8 bg-white text-black label-mini items-center justify-center hover:bg-neon-purple hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-white/5"
        >
          Free Audit
        </button>
        
        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-3 text-white z-[600]"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-black z-[550] flex flex-col pt-32 px-10"
          >
            <div className="flex flex-col gap-8">
              {navItems.map(item => (
                <button 
                  key={item.name}
                  onClick={() => handleNavClick(item.id)}
                  className="text-4xl font-black uppercase tracking-tighter text-left text-white border-b border-white/5 pb-4"
                >
                  {item.name}
                </button>
              ))}
              <button 
                onClick={() => { onNavigate('/insights'); setIsMobileMenuOpen(false); }}
                className="text-4xl font-black uppercase tracking-tighter text-left text-neon-gold border-b border-white/5 pb-4"
              >
                Insights
              </button>
              <button 
                onClick={() => { onOpenAudit(); setIsMobileMenuOpen(false); }}
                className="text-2xl font-black uppercase tracking-widest text-left text-neon-purple mt-8"
              >
                Get Free Audit →
              </button>
            </div>
            
            <div className="mt-auto mb-12">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
                Aurore Media // Attention is Currency
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
