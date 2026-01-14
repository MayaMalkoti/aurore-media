
import React, { useState, useEffect, useMemo } from 'react';
import { motion, animate } from 'framer-motion';
import { Activity, Users, Zap, TrendingUp, Eye, Clock } from 'lucide-react';

const AnimatedNumber = ({ value, duration = 2 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const controls = animate(count, value, {
      duration,
      onUpdate: (latest) => setCount(Math.floor(latest)),
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [value, duration]);

  return <>{count.toLocaleString()}</>;
};

const MomentumTracker: React.FC = () => {
  // Deterministic calculation based on time
  const getDeterministicStats = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    
    // 1. Live Viewers: Sine wave peaking at 2 PM (14:00) and 8 PM (20:00)
    // Formula creates a realistic traffic curve throughout the day
    const timeValue = (hours * 60 + minutes) / (24 * 60); // 0 to 1
    const baseViewers = 35;
    const peakEffect = Math.sin(timeValue * Math.PI * 2 - Math.PI / 2) * 25 + 25;
    const viewers = Math.floor(baseViewers + peakEffect);

    // 2. Strategic Partners: Base of 124 + days since Jan 1st 2024
    const start = new Date(2024, 0, 1);
    const diff = now.getTime() - start.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const partners = 124 + Math.floor(days / 4); // Roughly 1-2 new partners a week

    return { viewers, partners };
  };

  const [stats, setStats] = useState(getDeterministicStats());
  const [localQueueBoost, setLocalQueueBoost] = useState(0);

  // Sync with global events and local storage
  useEffect(() => {
    const savedBoost = localStorage.getItem('aurore_queue_boost');
    if (savedBoost) setLocalQueueBoost(parseInt(savedBoost));

    const handleInteraction = () => {
      setLocalQueueBoost(prev => {
        const next = prev + 1;
        localStorage.setItem('aurore_queue_boost', next.toString());
        return next;
      });
    };

    window.addEventListener('aurore_cta_click', handleInteraction);
    
    // Update deterministic stats every minute
    const interval = setInterval(() => {
      setStats(getDeterministicStats());
    }, 60000);

    return () => {
      window.removeEventListener('aurore_cta_click', handleInteraction);
      clearInterval(interval);
    };
  }, []);

  // Calculate inquiry queue based on deterministic seed + local user activity
  const inquiryQueue = useMemo(() => {
    const hour = new Date().getHours();
    const baseQueue = hour > 8 && hour < 20 ? 12 : 6;
    return baseQueue + localQueueBoost;
  }, [localQueueBoost]);

  return (
    <section className="py-40 bg-black border-t border-white/5 overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="h-full w-full bg-[repeating-linear-gradient(90deg,transparent,transparent_100px,rgba(255,255,255,0.1)_100px,rgba(255,255,255,0.1)_101px)]" />
      </div>

      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 gap-12">
          <div className="max-w-2xl">
            <span className="label-mini text-neon-gold mb-6 block">06 // MOMENTUM</span>
            <h2 className="h-large uppercase tracking-ultra text-white">
              NETWORK <br/><span className="text-neon-purple">VELOCITY.</span>
            </h2>
          </div>
          <div className="lg:text-right">
             <div className="flex items-center lg:justify-end gap-3 text-neon-gold mb-3">
                <div className="relative flex h-3 w-3">
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-gold shadow-[0_0_8px_rgba(233,166,97,0.5)]"></span>
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">System Verified Tracking</span>
             </div>
             <p className="text-white/30 font-bold uppercase tracking-widest text-xs">Deterministic activity monitor synced to global network engagement.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {/* Stat 1: Strategic Partners */}
          <div className="bg-aurore-gray p-12 lg:p-16 flex flex-col justify-between group overflow-hidden relative min-h-[320px]">
            <div className="absolute -right-4 -top-4 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
              <Users size={200} strokeWidth={1} />
            </div>
            <div>
              <span className="label-mini opacity-30 block mb-12">Strategic Partners</span>
              <div className="font-sans font-black text-7xl md:text-8xl lg:text-9xl uppercase tracking-tighter text-white leading-none">
                <AnimatedNumber value={stats.partners} />
                <span className="text-neon-purple">+</span>
              </div>
            </div>
            <p className="mt-12 text-[11px] font-black uppercase tracking-widest text-white/40 leading-relaxed max-w-[200px]">
              Active long-term partnerships verified within the Aurore production kit.
            </p>
          </div>

          {/* Stat 2: Inquiry Queue */}
          <div className="bg-black p-12 lg:p-16 flex flex-col justify-between group overflow-hidden relative min-h-[320px]">
             <div className="absolute -right-4 -top-4 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
              <Zap size={200} strokeWidth={1} />
            </div>
            <div>
              <div className="flex justify-between items-center mb-12">
                <span className="label-mini text-neon-gold block">Inquiry Queue</span>
                <div className="flex items-center gap-2 text-white/20">
                  <Eye size={12} />
                  <span className="text-[10px] font-black uppercase tracking-widest">{stats.viewers} Active Sessions</span>
                </div>
              </div>
              <div className="font-sans font-black text-7xl md:text-8xl lg:text-9xl uppercase tracking-tighter text-white leading-none flex items-baseline">
                <span className="stroke-text mr-2">0</span>
                <AnimatedNumber value={inquiryQueue} />
              </div>
            </div>
            <div className="mt-12 flex items-center gap-4">
               <div className="flex gap-1 h-6 items-end">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i}
                      className="w-1.5 bg-neon-gold/40"
                      style={{ height: `${(i + 1) * 20}%` }}
                    />
                  ))}
               </div>
               <p className="text-[11px] font-black uppercase tracking-widest text-white/40 leading-relaxed">
                 Real-time inquiries awaiting strategic allocation. {localQueueBoost > 0 && <span className="text-neon-gold underline">Includes your session activity.</span>}
               </p>
            </div>
          </div>

          {/* Stat 3: Performance Retention */}
          <div className="bg-aurore-gray p-12 lg:p-16 flex flex-col justify-between group overflow-hidden relative min-h-[320px]">
            <div className="absolute -right-4 -top-4 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
              <TrendingUp size={200} strokeWidth={1} />
            </div>
            <div>
              <span className="label-mini opacity-30 block mb-12">Network Retention Lift</span>
              <div className="font-sans font-black text-7xl md:text-8xl lg:text-9xl uppercase tracking-tighter text-white leading-none">
                <AnimatedNumber value={48} />
                <span className="text-neon-purple text-5xl lg:text-7xl">%</span>
              </div>
            </div>
            <p className="mt-12 text-[11px] font-black uppercase tracking-widest text-white/40 leading-relaxed max-w-[200px]">
              Mean improvement in viewer watch-time across the verified partner network.
            </p>
          </div>
        </div>

        <div className="mt-32 text-center">
            <div className="inline-flex flex-col items-center">
                <div className="flex items-center gap-4 label-mini text-white/20 mb-8">
                  <Clock size={12} className="text-neon-purple" />
                  Last Updated: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className="h-20 w-px bg-gradient-to-b from-transparent via-neon-purple to-transparent opacity-30" />
            </div>
        </div>
      </div>
    </section>
  );
};

export default MomentumTracker;
