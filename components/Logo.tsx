import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  isHeaderLogo?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 48, showText = false, isHeaderLogo = false }) => {
  const { scrollYProgress } = useScroll();
  
  const springConfig = { stiffness: 45, damping: 25, restDelta: 0.001 };
  
  const scrollRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const sunRotate = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const waveX = useTransform(scrollYProgress, [0, 1], [-3, 3]);
  
  const smoothRotate = useSpring(scrollRotate, springConfig);
  const smoothSunRotate = useSpring(sunRotate, springConfig);
  const smoothWaveX = useSpring(waveX, springConfig);

  return (
    <div className={`flex items-center gap-4 gpu ${className}`}>
      <motion.div 
        className="relative"
        style={{ width: size, height: size }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <motion.svg 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_0_15px_rgba(233,166,97,0.3)]"
        >
          <motion.g style={isHeaderLogo ? { rotate: smoothRotate } : {}}>
            {/* Rays - Always visible Gold */}
            <path 
              d="M23 37C25 25 35 15 50 15C65 15 75 25 77 37" 
              stroke="#E9A661" 
              strokeWidth="3" 
              strokeLinecap="round" 
            />
            <motion.g style={{ rotate: smoothSunRotate, originX: '50px', originY: '50px' }}>
                <path d="M50 15V8" stroke="#E9A661" strokeWidth="3" strokeLinecap="round" />
                <path d="M70 20L75 15" stroke="#E9A661" strokeWidth="3" strokeLinecap="round" />
                <path d="M30 20L25 15" stroke="#E9A661" strokeWidth="3" strokeLinecap="round" />
                <path d="M80 35H87" stroke="#E9A661" strokeWidth="3" strokeLinecap="round" />
                <path d="M13 35H20" stroke="#E9A661" strokeWidth="3" strokeLinecap="round" />
            </motion.g>

            {/* Waves - High contrast white */}
            <motion.g style={{ x: smoothWaveX }}>
              <path 
                d="M25 45C35 38 50 38 60 45C70 52 85 52 95 45" 
                stroke="#FFFFFF" 
                strokeWidth="4" 
                strokeLinecap="round" 
              />
            </motion.g>
            <motion.g style={{ x: useTransform(smoothWaveX, v => -v) }}>
              <path 
                d="M15 60C25 53 40 53 50 60C60 67 75 67 85 60" 
                stroke="#FFFFFF" 
                strokeWidth="4" 
                strokeLinecap="round" 
              />
            </motion.g>
            
            {/* Bottom Details */}
            <path 
              d="M32 75C42 85 58 85 68 75" 
              stroke="#FFFFFF" 
              strokeWidth="4" 
              strokeLinecap="round" 
            />
            <path d="M48 78H52" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
          </motion.g>
        </motion.svg>
      </motion.div>
      
      {showText && (
        <div className="flex flex-col leading-none pointer-events-none">
          <span className="font-sans font-black text-xl tracking-tighter text-white uppercase">AURORE</span>
          <span className="font-sans font-black text-xl tracking-tighter text-[#E9A661] uppercase mt-0.5">MEDIA</span>
        </div>
      )}
    </div>
  );
};

export default Logo;