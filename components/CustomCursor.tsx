import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState('');
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Performance-focused spring configuration
  const cursorSpringConfig = { stiffness: 450, damping: 40, mass: 0.5 };
  
  const cursorX = useSpring(mouseX, cursorSpringConfig);
  const cursorY = useSpring(mouseY, cursorSpringConfig);
  
  const magneticRef = useRef<{ x: number, y: number } | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        'ontouchstart' in window || 
        navigator.maxTouchPoints > 0 || 
        window.innerWidth < 1024 ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      );
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const moveMouse = (e: MouseEvent) => {
      // Use standard CSS variables for the hardware-accelerated "Precise Point"
      document.documentElement.style.setProperty('--x', e.clientX + 'px');
      document.documentElement.style.setProperty('--y', e.clientY + 'px');

      if (magneticRef.current) {
        mouseX.set(magneticRef.current.x);
        mouseY.set(magneticRef.current.y);
      } else {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [role="button"], .cursor-trigger');
      
      if (interactive) {
        setIsHovering(true);
        const text = interactive.getAttribute('data-cursor') || '';
        setHoverText(text);

        const rect = interactive.getBoundingClientRect();
        if (rect.width < 350) { // Limit magnetic effect to smaller elements
           magneticRef.current = {
             x: rect.left + rect.width / 2,
             y: rect.top + rect.height / 2
           };
        }
      } else {
        setIsHovering(false);
        setHoverText('');
        magneticRef.current = null;
      }
    };

    window.addEventListener('mousemove', moveMouse, { passive: true });
    window.addEventListener('mouseover', handleHover, { passive: true });
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('mouseover', handleHover);
    };
  }, [mouseX, mouseY]);

  if (isMobile) return null;

  return (
    <>
      {/* Consolidated Interactive Shell */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99998] mix-blend-difference flex items-center justify-center will-change-transform"
        style={{ 
          x: cursorX, 
          y: cursorY, 
          translateX: '-50%', 
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 140 : 24,
            height: isHovering ? 140 : 24,
            borderRadius: isHovering ? '30%' : '50%',
            rotate: isHovering ? 45 : 0,
            borderWidth: isHovering ? 1 : 2
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="border border-white/80 flex items-center justify-center overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {isHovering && hoverText && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-[10px] font-black tracking-[0.2em] uppercase text-white px-4 text-center leading-tight -rotate-45"
              >
                {hoverText}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Precise Point - Zero Latency Hardware Accelerated */}
      <div 
        className="fixed top-0 left-0 pointer-events-none z-[99999] mix-blend-difference flex items-center justify-center will-change-transform"
        style={{ 
          transform: `translate3d(var(--x), var(--y), 0)`,
        } as any}
      >
        <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]" />
      </div>
    </>
  );
};

export default CustomCursor;