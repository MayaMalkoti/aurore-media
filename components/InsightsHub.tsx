
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Clock, ArrowRight, Zap, BookOpen, Star, Calendar, Mail, AlertTriangle } from 'lucide-react';
import { insights } from '../data/insights';

interface InsightsHubProps {
  onNavigate: (slug: string) => void;
  onOpenAudit: () => void;
}

const InsightsHub: React.FC<InsightsHubProps> = ({ onNavigate, onOpenAudit }) => {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Growth' | 'Design' | 'Productivity'>('All');

  const filtered = useMemo(() => {
    return insights.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) || 
                            post.summary.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = activeFilter === 'All' || post.category === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [search, activeFilter]);

  const featuredPost = insights[0];

  const categories = [
    { name: 'Growth', tagline: 'Master the algorithm and retention.', chips: ['Retention', 'Hooks', 'Algorithms'] },
    { name: 'Design', tagline: 'Visual psychology that stops the scroll.', chips: ['Carousels', 'Hierarchy', 'Layouts'] },
    { name: 'Productivity', tagline: 'Build a repeatable content engine.', chips: ['Systems', 'Calendars', 'Batching'] }
  ];

  return (
    <div className="bg-black text-white">
      {/* 1. Hero Section */}
      <section className="pt-56 pb-28 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(176,38,255,0.1)_0%,transparent_70%)] pointer-events-none" />
        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            <span className="label-mini text-neon-gold mb-8 block tracking-[0.6em]">Aurore // Knowledge Hub</span>
            <h1 className="h-large uppercase tracking-ultra mb-12">INSIGHTS & <br/><span className="text-neon-purple">STRATEGY.</span></h1>
            <p className="text-2xl md:text-3xl text-white/60 font-medium leading-relaxed max-w-2xl mb-16">
              Research-backed guides to help you transition from vanity metrics to real, conversion-focused authority.
            </p>
            <div className="flex flex-wrap gap-8">
              <button 
                onClick={onOpenAudit}
                className="h-16 px-12 bg-white text-black label-mini flex items-center justify-center hover:bg-neon-purple hover:text-white transition-all transform hover:scale-105 shadow-2xl"
              >
                Get a Free Audit
              </button>
              <a href="#featured" className="h-16 px-12 border border-white/10 text-white label-mini flex items-center justify-center hover:bg-white/5 transition-all">
                Browse Content
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ... previous sections remain same ... */}
      <section id="featured" className="py-24 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-white/10 border border-white/10">
            <div 
              className="lg:col-span-8 bg-aurore-gray p-12 md:p-20 group cursor-pointer overflow-hidden relative"
              onClick={() => onNavigate(featuredPost.slug)}
            >
              <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-30 transition-opacity">
                <Star size={140} strokeWidth={1} />
              </div>
              <span className="label-mini text-neon-purple mb-10 block">Featured Article</span>
              <h2 className="font-sans font-black text-5xl md:text-7xl uppercase tracking-tighter leading-[0.9] mb-10 group-hover:text-neon-purple transition-colors">
                {featuredPost.title}
              </h2>
              <p className="text-2xl text-white/50 mb-14 line-clamp-2 leading-relaxed">{featuredPost.summary}</p>
              <div className="flex items-center gap-6 label-mini text-white">
                Read Featured Insight <ArrowRight size={20} className="group-hover:translate-x-4 transition-transform" />
              </div>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-px bg-white/10">
              {categories.map((cat, i) => (
                <div key={i} className="bg-black p-12 flex flex-col justify-center group hover:bg-white/[0.02] transition-colors">
                  <h3 className="label-mini text-neon-gold mb-4">{cat.name}</h3>
                  <p className="text-sm font-black uppercase text-white/50 mb-8 leading-tight">{cat.tagline}</p>
                  <div className="flex flex-wrap gap-3">
                    {cat.chips.map(chip => (
                      <span key={chip} className="text-[10px] font-black uppercase tracking-widest px-4 py-1.5 bg-white/5 border border-white/10 opacity-50 hover:opacity-100 hover:border-neon-purple transition-all cursor-default">
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-aurore-gray/40">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-10 justify-between items-start lg:items-center mb-20">
            <div className="flex flex-wrap gap-3">
              {['All', 'Growth', 'Design', 'Productivity'].map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f as any)}
                  className={`px-10 py-5 label-mini border transition-all ${
                    activeFilter === f 
                    ? 'bg-neon-purple border-neon-purple text-white shadow-[0_0_25px_rgba(176,38,255,0.4)]' 
                    : 'border-white/10 text-white/40 hover:border-white/30'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="relative w-full lg:w-[400px] group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-neon-purple transition-colors" size={20} />
              <input
                type="text"
                placeholder="Search topics..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-none py-5 pl-14 pr-6 text-base font-bold uppercase tracking-widest focus:outline-none focus:border-neon-purple transition-all"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
            <AnimatePresence mode='popLayout'>
              {filtered.map((post) => (
                <motion.div
                  layout
                  key={post.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -10 }}
                  className="bg-black p-12 md:p-14 flex flex-col group cursor-pointer hover:bg-neutral-900 transition-colors"
                  onClick={() => onNavigate(post.slug)}
                >
                  <div className="flex justify-between items-center mb-12">
                    <span className="text-[12px] font-black uppercase tracking-[0.3em] text-neon-gold">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-3 text-[12px] font-black uppercase text-white/30">
                      <Clock size={16} /> {post.readTime}
                    </div>
                  </div>
                  <h3 className="font-sans font-black text-3xl uppercase tracking-tighter leading-tight text-white mb-8 group-hover:text-neon-purple transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-lg font-medium text-white/50 leading-relaxed mb-12 line-clamp-3">
                    {post.summary}
                  </p>
                  <div className="mt-auto pt-10 border-t border-white/10 flex items-center justify-between text-white group-hover:text-neon-purple transition-colors">
                    <span className="label-mini">Read Full Insight</span>
                    <ArrowRight size={20} className="group-hover:translate-x-3 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ... and in the final CTA ... */}
      <section className="py-48 px-6 border-t border-white/5 bg-[radial-gradient(circle_at_bottom,rgba(176,38,255,0.08)_0%,transparent_50%)]">
        <div className="container mx-auto max-w-5xl text-center">
            <h2 className="font-sans font-black text-7xl md:text-[9vw] uppercase tracking-ultra leading-none mb-20">
              READY FOR <br/>A <span className="text-neon-purple">REAL AUDIT?</span>
            </h2>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-12">
               <button 
                 onClick={onOpenAudit}
                 className="h-20 px-16 bg-white text-black label-mini flex items-center justify-center transition-all transform hover:scale-[1.05] shadow-2xl shadow-white/10"
               >
                 Get a Free Audit
               </button>
               <a 
                 href="mailto:auroreltd234@gmail.com" 
                 className="flex items-center gap-5 label-mini text-white/70 hover:text-white transition-all text-lg"
               >
                 <Mail size={24} className="text-neon-purple" /> Email us at auroreltd234@gmail.com
               </a>
            </div>
            <div className="mt-20 flex items-center justify-center gap-5 text-red-500 text-[12px] font-black uppercase tracking-[0.4em]">
               <AlertTriangle size={18} className="animate-pulse" /> Limited slots weekly for free profile audits.
            </div>
        </div>
      </section>
    </div>
  );
};

export default InsightsHub;
