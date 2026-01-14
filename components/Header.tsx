
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Zap, Info, CreditCard, Lightbulb, Menu, X, ArrowUpRight } from 'lucide-react';
import Logo from './Logo';
import { insights } from '../data/insights';

interface NavItem {
  label: string;
  href: string;
  type: 'section' | 'page' | 'action';
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/', type: 'page' },
  { label: 'Services', href: '#services', type: 'section' },
  { label: 'Work', href: '#portfolio', type: 'section' },
  { label: 'About', href: '#about', type: 'section' },
  { label: 'Pricing', href: '#pricing', type: 'section' },
  { label: 'Insights', href: '/insights', type: 'page' },
];

interface HeaderProps {
  onNavigate: (path: string) => void;
  currentPath: string;
  onOpenAudit: () => void;
  onOpenCookies?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPath, onOpenAudit, onOpenCookies }) => {
  const [scrolled, setScrolled] = useState(false);
  const [showInsightsDropdown, setShowInsightsDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  // Handle scroll detection for background blur
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Section Observer for highlighting active section
  useEffect(() => {
    if (currentPath !== '/') {
      setActiveSection('');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.5, rootMargin: '-100px 0px -40% 0px' }
    );

    NAV_ITEMS.filter(item => item.type === 'section').forEach((item) => {
      const el = document.getElementById(item.href.replace('#', ''));
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [currentPath]);

  // Accessibility: Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isMobileMenuOpen]);

  const handleNavClick = useCallback((item: NavItem) => {
    setIsMobileMenuOpen(false);
    
    if (item.type === 'page') {
      onNavigate(item.href);
      return;
    }

    if (item.type === 'section') {
      const sectionId = item.href.replace('#', '');
      
      if (currentPath === '/') {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Cross-page section navigation: Go home first, then scroll
        onNavigate(`/${item.href}`);
      }
    }
  }, [currentPath, onNavigate]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[500] transition-all duration-500 px-4 md:px-8 xl:px-12 py-3 md:py-5 flex justify-between items-center ${
        scrolled 
          ? 'bg-black/90 backdrop-blur-xl border-b border-white/10 shadow-xl' 
          : 'bg-black/30 backdrop-blur-sm'
      }`}
    >
      {/* Logo */}
      <button 
        onClick={() => { handleNavClick(NAV_ITEMS[0]); }} 
        className="flex items-center gap-2 md:gap-3 group cursor-trigger z-[600]"
        aria-label="Aurore Home"
      >
        <Logo size={window.innerWidth < 640 ? 32 : 40} isHeaderLogo={true} />
        <div className="font-sans font-black text-lg md:text-xl tracking-tighter uppercase text-white">
          Aurore<span className="text-neon-purple group-hover:text-neon-gold transition-all duration-500">.</span>
        </div>
      </button>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex gap-4 xl:gap-8 items-center bg-white/5 border border-white/10 px-6 py-2 rounded-full backdrop-blur-md">
        {NAV_ITEMS.map((item) => {
          const isActive = item.type === 'page' 
            ? currentPath === item.href || (item.href !== '/' && currentPath.startsWith(item.href))
            : activeSection === item.href && currentPath === '/';

          return (
            <button 
              key={item.label} 
              onClick={() => handleNavClick(item)}
              className={`text-[11px] xl:text-[12px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-2 group/nav px-2 py-1 ${
                isActive ? 'text-neon-purple' : 'text-white/40 hover:text-white'
              }`}
            >
              <span className={`w-1 h-1 rounded-full bg-neon-purple transition-all ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-3 md:gap-4">
        <button 
          onClick={onOpenAudit}
          className="hidden md:flex h-10 px-6 bg-white text-black label-mini items-center justify-center hover:bg-neon-purple hover:text-white transition-all transform hover:scale-[1.02] active:scale-95"
        >
          Free Audit
        </button>
        
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-white z-[600] active:scale-90 transition-transform"
          aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
            className="fixed inset-0 bg-black z-[550] flex flex-col pt-24 px-8 md:px-16 overflow-y-auto"
          >
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
              <div className="w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,white_20px,white_21px)]" />
            </div>

            <div className="flex flex-col gap-4 md:gap-6 relative z-10">
              <span className="label-mini text-white/20 mb-4 block">Navigation</span>
              {NAV_ITEMS.map((item, idx) => (
                <button 
                  key={item.label}
                  onClick={() => handleNavClick(item)}
                  className="group flex items-end justify-between border-b border-white/5 pb-4 transition-all"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="text-[10px] font-black text-neon-gold opacity-30">0{idx + 1}</span>
                    <span className={`text-4xl md:text-6xl font-black uppercase tracking-tighter text-left transition-all ${
                      currentPath === item.href ? 'text-neon-purple' : 'text-white hover:text-neon-purple'
                    }`}>
                      {item.label}
                    </span>
                  </div>
                  <ArrowUpRight size={24} className="opacity-0 group-hover:opacity-100 transition-all text-neon-purple" />
                </button>
              ))}
              
              <div className="mt-12 flex flex-col gap-6">
                <button 
                  onClick={() => { onOpenAudit(); setIsMobileMenuOpen(false); }}
                  className="w-full h-16 bg-white text-black font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 active:scale-95 transition-transform"
                >
                  Request Free Audit <Zap size={16} />
                </button>
                <button 
                  onClick={() => { if(onOpenCookies) onOpenCookies(); setIsMobileMenuOpen(false); }}
                  className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 hover:text-white transition-colors"
                >
                  Cookie Preferences
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
